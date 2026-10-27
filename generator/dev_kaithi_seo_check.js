/* dev_kaithi_seo_check.js v1.0 · 27-Oct-2026 — "कैथी लिपि" कोर्स के हर पन्ने का SEO-robot (आधार: dev_pl0_seo_check v1.0; इस कोर्स में workbook नहीं — फ़ैसला #6) (Founder-नियम 26-Oct: हर पन्ने पर Google के लिए सब कुछ पहले से)
   साइट-स्तर की sitemap/hreflang-अखंडता = dev_seo_check.js (office पर, पूरे repo में); यह robot पन्ने-स्तर की हर बात जाँचता है:
   html lang="hi" · ठीक एक h1 · title 15-70 अक्षर · description 50-165 · canonical = सही पूरा पता · robots index ·
   og (title, description, type, url, image, image:width/height, locale, site_name) · twitter (card, title, description, image) ·
   hreflang hi + x-default (दोनों = canonical) · JSON-LD सब पार्स हों · पाठ: LearningResource(+image, isPartOf Course@id) + BreadcrumbList ·
   मुख्य पन्ना: Course(offers price 0, hasCourseInstance, provider) + FAQPage (दिखने वाले सवालों जितने) + BreadcrumbList ·
   हर svg पर role="img" + aria-label · हर img पर alt · og-छवि फ़ाइल repo में (1200×630 PNG) · title-दोहराव शून्य */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const { KTH_COURSE: C } = require("./data/kaithi_lessons_data.js");
const BASE = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/";
const DIR = path.join(ROOT, "courses", C.lang, C.slug);
let fails = 0; const bad = (f, m) => { fails++; if (fails <= 60) console.log("⛔ " + f + ": " + m); };
const meta = (h, attr, name) => { const m = h.match(new RegExp('<meta ' + attr + '="' + name + '" content="([^"]*)"')); return m ? m[1] : null; };
const dec = s => String(s).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const og = path.join(ROOT, "assets/og/" + C.slug + ".png");
if (!fs.existsSync(og)) bad("assets", "og-छवि नहीं"); else { const b = fs.readFileSync(og); if (b.readUInt32BE(16) !== 1200 || b.readUInt32BE(20) !== 630) bad("assets", "og-छवि 1200×630 नहीं"); }
const pages = fs.readdirSync(DIR).filter(f => f.endsWith(".html")).map(f => [f, BASE + (f === "index.html" ? "" : f)]);
const titles = new Map();
for (const [f, url] of pages) {
  const h = fs.readFileSync(path.join(DIR, f), "utf8"); const head = h.slice(0, h.indexOf("</head>"));
  if (!/<html[^>]*lang="hi"/.test(h)) bad(f, 'html lang="hi" नहीं');
  const h1 = (h.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) bad(f, "h1 " + h1 + " (ठीक एक चाहिए)");
  const t = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1]; const tl = t ? dec(t).length : 0;
  if (!t || tl < 15 || tl > 70) bad(f, "title " + tl + " अक्षर (15-70)"); else { if (titles.has(t)) bad(f, "title दोहराव: " + titles.get(t)); titles.set(t, f); }
  const d = meta(head, "name", "description"); if (!d || dec(d).length < 50 || dec(d).length > 165) bad(f, "description " + (d ? dec(d).length : 0) + " अक्षर (50-165)");
  const can = (head.match(/<link rel="canonical" href="([^"]+)">/) || [])[1]; if (can !== url) bad(f, "canonical " + can + " ≠ " + url);
  if (!/<meta name="robots" content="index, follow/.test(head)) bad(f, "robots index नहीं");
  for (const k of ["og:title", "og:description", "og:type", "og:url", "og:image", "og:image:width", "og:image:height", "og:locale", "og:site_name"]) if (!meta(head, "property", k)) bad(f, k + " नहीं");
  if (meta(head, "property", "og:url") !== url) bad(f, "og:url ≠ canonical");
  if (meta(head, "property", "og:image") !== "https://acslearn.com/assets/og/" + C.slug + ".png") bad(f, "og:image कोर्स-छवि नहीं");
  for (const k of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!meta(head, "name", k)) bad(f, k + " नहीं");
  for (const hl of ["hi", "x-default"]) { const m = head.match(new RegExp('<link rel="alternate" hreflang="' + hl + '" href="([^"]+)">')); if (!m || m[1] !== url) bad(f, "hreflang " + hl + " नहीं/≠ canonical"); }
  const lds = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => { try { return JSON.parse(m[1]); } catch (e) { bad(f, "JSON-LD पार्स नहीं"); return null; } }).filter(Boolean);
  const flat = lds.flatMap(o => o["@graph"] ? o["@graph"] : [o]); const types = flat.map(o => o["@type"]);
  if (f === "index.html") {
    for (const ty of ["Course", "FAQPage", "BreadcrumbList"]) if (!types.includes(ty)) bad(f, ty + " schema नहीं");
    const co = flat.find(o => o["@type"] === "Course") || {};
    if (!co.offers || co.offers.price !== 0 || !co.hasCourseInstance || !co.provider || !co.description) bad(f, "Course schema अधूरा (offers/hasCourseInstance/provider/description)");
    const fq = flat.find(o => o["@type"] === "FAQPage"); const vis = (h.match(/<details class="ld-faq">/g) || []).length;
    if (!fq || fq.mainEntity.length !== vis || vis < 5) bad(f, "FAQ schema " + (fq ? fq.mainEntity.length : 0) + " ≠ दिखने वाले सवाल " + vis);
  } else {
    if (!types.includes("LearningResource") || !types.includes("BreadcrumbList")) bad(f, "LearningResource/BreadcrumbList नहीं");
    const lr = flat.find(o => o["@type"] === "LearningResource") || {};
    if (!lr.image || !lr.isPartOf || !lr.isPartOf["@id"]) bad(f, "LearningResource में image/isPartOf@id नहीं");
  }
  /* अर्थ वाला चित्र = role="img" + विवरण; सजावटी चिह्न = aria-hidden="true" (सुलभता-मानक) */
  for (const m of h.matchAll(/<svg\b([^>]*)>/g)) if (!/aria-hidden="true"/.test(m[1]) && (!/role="img"/.test(m[1]) || !/aria-label="[^"]{8,}"/.test(m[1]))) { bad(f, "svg पर न role=img+aria-label, न aria-hidden"); break; }
  for (const m of h.matchAll(/<img\b([^>]*)>/g)) if (!/\balt="/.test(m[1])) { bad(f, "img पर alt नहीं"); break; }
}
console.log("—".repeat(50)); console.log("SEO जाँचे पन्ने: " + pages.length + " (पाठ " + (pages.length - 1) + " + मुख्य) · अनोखे title: " + titles.size);
if (fails) { console.log("⛔ FAIL — " + fails + " होल"); process.exit(1); }
console.log("🏁 dev_kaithi_seo_check v1.0 — सब पास");
