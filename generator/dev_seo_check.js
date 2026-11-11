/* ============================================================
   dev_seo_check.js v1.3.1 — SEO-जीविता robot (v1.0: 04-Oct-2026 · v1.1/v1.2: 11-Nov-2026)
   जाँचें:
   1) hreflang-लक्ष्य जीविता: हर *.html के हर hreflang-href का पथ repo में
      असली फ़ाइल हो (…/ → index.html) — मरे पते पर hreflang = मरी कड़ी (निषिद्ध)।
   2) sitemap-अखंडता: रूट sitemap.xml = sitemapindex; हर खंड-फ़ाइल मौजूद;
      हर <loc> की फ़ाइल repo में जीवित; खंडों के बीच दोहराव = 0।
   3) robots.txt में Sitemap-पंक्ति।
   v1.1 (11-Nov-2026, SEO-ऑडिट के सुधार) की नई जाँचें:
   4) sitemap का हर पता "खोज-योग्य" हो: noindex नहीं, पता-बदली पर्ची (redirect) नहीं,
      और उसका canonical ख़ुद वही पता हो।
   5) उल्टी जाँच: साइट का हर खोज-योग्य पेज (noindex नहीं, redirect नहीं, canonical ख़ुद पर)
      sitemap में ज़रूर हो। यही जाँच bhasha.html जैसे छूटे hub-पेज पकड़ती है।
      साथ में: हर पेज पर canonical या noindex में से एक ज़रूर हो।
   6) भाषा-सूची का मिलान: courses_data.js की भाषा-कोर्स सूची = sitemap के भाषा-कोर्स
      मुखपृष्ठ = bhasha.html की गिनती। जुड़वाँ कोर्स (data/seo_twins.js) इस गिनती से बाहर।
   7) भाषा-परिवार के title/description lib_seo_meta.js से हूबहू मेल खाएँ
      (title 80 अक्षर तक, description 160 तक) और हर पेज पर पढ़ने-योग्य schema हो।
   8) बदलाव-तारीख़ (lastmod): सही रूप, भविष्य की नहीं, और बही-खाते से मेल।
   v1.2 (11-Nov-2026, ChatGPT की 8,602-पेज जाँच के बाद) की नई जाँचें : sitemap के हर पेज पर:
   9) सिर की सफ़ाई: <title> के भीतर कोई HTML tag नहीं; description मौजूद और ख़ाली नहीं;
      description / og:title / og:description के attribute में कच्चा उद्धरण-चिह्न (") नहीं।
   10) ख़ाली-पेज पहरा: जिस पेज के description में "जल्द उपलब्ध" है, वह sitemap में नहीं।
   11) दोहरा पेज: दो पतों का पूरा पाठ हूबहू एक नहीं।
   12) दोहरा शीर्षक या दोहरा description नहीं।
   v1.3 (12-Nov-2026): 13) हुनर-कोर्स के पाठ-पेज: description "और / या / के / में…" जैसे अधूरे शब्द पर ख़त्म नहीं;
       पाठ से बना description पूरे वाक्य पर ख़त्म (v1.3.1 से यह सचमुच जाँचा जाता है) और 70 से 160 अक्षर का;
       schema का description = meta description।
   चलाना: node generator/dev_seo_check.js   → सब पास तो 🏁
   नियम: sitemap/hreflang छूने वाले हर दौर में upload से पहले 🏁 अनिवार्य।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
let fails = 0;
function FAIL(msg) { fails++; console.log("❌ " + msg); }

function urlPathToFile(u) {
  let p = u.replace(/^https:\/\/acslearn\.com/, "");
  if (p === "" || p === "/") p = "/index.html";
  if (p.endsWith("/")) p += "index.html";
  return path.join(ROOT, p.replace(/^\//, ""));
}

/* ---- जाँच-1: hreflang-लक्ष्य ---- */
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    if (f === ".git" || f === "node_modules") continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}
const htmls = walk(ROOT, []);
let hrefTotal = 0, hrefPages = 0;
for (const f of htmls) {
  const s = fs.readFileSync(f, "utf8");
  const ms = [...s.matchAll(/<link[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/g)];
  if (!ms.length) continue;
  hrefPages++;
  for (const m of ms) {
    hrefTotal++;
    const tgt = m[2];
    if (!/^https:\/\/acslearn\.com/.test(tgt)) { FAIL("बाहरी/सापेक्ष hreflang: " + tgt + " ← " + path.relative(ROOT, f)); continue; }
    if (!fs.existsSync(urlPathToFile(tgt)))
      FAIL("मरा hreflang-लक्ष्य: " + tgt + " ← " + path.relative(ROOT, f));
  }
}
console.log("जाँच-1 hreflang: " + hrefPages + " पेज, " + hrefTotal + " कड़ियाँ जाँचीं");

/* ---- जाँच-2: sitemap-अखंडता ---- */
const idx = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
if (!idx.includes("<sitemapindex")) FAIL("sitemap.xml sitemapindex नहीं है");
const kids = [...idx.matchAll(/<loc>https:\/\/acslearn\.com\/(sitemap-[a-z]+\.xml)<\/loc>/g)].map(m => m[1]);
if (kids.length < 2) FAIL("sitemapindex में खंड-फ़ाइलें नहीं मिलीं");
const seen = new Map(); let urlTotal = 0, deadLoc = 0;
for (const k of kids) {
  const kp = path.join(ROOT, k);
  if (!fs.existsSync(kp)) { FAIL("खंड-फ़ाइल ग़ायब: " + k); continue; }
  const xs = fs.readFileSync(kp, "utf8");
  const locs = [...xs.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const u of locs) {
    urlTotal++;
    if (seen.has(u)) FAIL("खंडों में दोहराव: " + u + " (" + seen.get(u) + " + " + k + ")");
    seen.set(u, k);
    if (!fs.existsSync(urlPathToFile(u))) { deadLoc++; if (deadLoc <= 10) FAIL("sitemap में मरा URL: " + u); }
  }
  console.log("  " + k + " — " + locs.length + " URL");
}
if (deadLoc > 10) FAIL("…कुल मरे sitemap-URL: " + deadLoc);
console.log("जाँच-2 sitemap: " + kids.length + " खंड, कुल " + urlTotal + " URL");

/* ---- जाँच-3: robots.txt ---- */
const rb = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (!rb.includes("Sitemap: https://acslearn.com/sitemap.xml")) FAIL("robots.txt में Sitemap-पंक्ति नहीं");
console.log("जाँच-3 robots.txt: Sitemap-पंक्ति ✅");

/* ================= v1.1 की नई जाँचें ================= */
const BASE = "https://acslearn.com";
const SKIP_TOP = new Set([".git", "node_modules", "generator", "matrix"]); /* generator/matrix साइट पर प्रकाशित नहीं होते (_config.yml) */
function pageInfo(f) {
  const h = fs.readFileSync(f, "utf8").slice(0, 30000);
  const rb = (h.match(/<meta[^>]*name=["']robots["'][^>]*>/i) || [""])[0];
  return { noindex: /noindex/i.test(rb), refresh: /http-equiv=["']refresh["']/i.test(h),
           canon: (h.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] || "" };
}
function fileToUrl(f) {
  const rel = "/" + path.relative(ROOT, f).split(path.sep).join("/");
  if (rel === "/index.html") return BASE + "/";
  return BASE + (rel.endsWith("/index.html") ? rel.slice(0, -10) : rel);
}
const SM = new Set(seen.keys());

/* ---- जाँच-4: sitemap का हर पता खोज-योग्य ---- */
let bad4 = 0;
for (const u of SM) {
  const f = urlPathToFile(u); if (!fs.existsSync(f)) continue;
  const p = pageInfo(f); let why = "";
  if (p.noindex) why = "noindex"; else if (p.refresh) why = "redirect-पर्ची"; else if (p.canon && p.canon !== u) why = "canonical किसी और पते पर (" + p.canon + ")";
  if (why) { bad4++; if (bad4 <= 10) FAIL("sitemap में ग़लत पता (" + why + "): " + u); }
}
if (bad4 > 10) FAIL("…sitemap में कुल ग़लत पते: " + bad4);
console.log("जाँच-4 sitemap-पते खोज-योग्य: " + (SM.size - bad4) + "/" + SM.size);

/* ---- जाँच-5: हर खोज-योग्य पेज sitemap में ---- */
let miss5 = 0, nocan = 0, indexable = 0;
for (const f of htmls) {
  const top = path.relative(ROOT, f).split(path.sep)[0];
  if (SKIP_TOP.has(top) || path.basename(f)[0] === "_") continue;
  const p = pageInfo(f);
  if (p.noindex || p.refresh) continue;
  const u = fileToUrl(f);
  if (!p.canon) { nocan++; if (nocan <= 10) FAIL("पेज पर न canonical है, न noindex: " + path.relative(ROOT, f)); continue; }
  if (p.canon !== u) continue; /* असली पता कहीं और : sitemap में नहीं आना चाहिए */
  indexable++;
  if (!SM.has(u)) { miss5++; if (miss5 <= 10) FAIL("खोज-योग्य पेज sitemap से बाहर: " + u); }
}
if (miss5 > 10) FAIL("…sitemap से बाहर कुल खोज-योग्य पेज: " + miss5);
console.log("जाँच-5 उल्टी जाँच: खोज-योग्य पेज " + indexable + ", sitemap से बाहर " + miss5 + ", बिना-canonical " + nocan);

/* ---- जाँच-6: भाषा-सूची का मिलान ---- */
{
  const TW = require("./data/seo_twins.js");
  const cd = fs.readFileSync(path.join(ROOT, "assets/courses_data.js"), "utf8");
  const reg = new Set([...cd.matchAll(/"url": *"\/courses\/hi\/bhasha\/([^"\/]+)\/"/g)].map(m => m[1]));
  const smRoots = new Set([...SM].map(u => (u.match(/^https:\/\/acslearn\.com\/courses\/hi\/bhasha\/([^\/]+)\/$/) || [])[1]).filter(Boolean));
  const dirs = fs.readdirSync(path.join(ROOT, "courses/hi/bhasha")).filter(d => fs.existsSync(path.join(ROOT, "courses/hi/bhasha", d, "index.html")) && !pageInfo(path.join(ROOT, "courses/hi/bhasha", d, "index.html")).refresh);
  for (const d of reg) if (!smRoots.has(d)) FAIL("भाषा-कोर्स सूची में है पर sitemap में नहीं: " + d);
  for (const d of smRoots) if (!reg.has(d)) FAIL("भाषा-कोर्स sitemap में है पर courses_data.js में नहीं: " + d);
  for (const d of dirs) if (!reg.has(d) && !TW[d]) FAIL("भाषा-कोर्स का folder है, पर न सूची में है न जुड़वाँ-सूची में: " + d);
  for (const t of Object.keys(TW)) { if (reg.has(t)) FAIL("जुड़वाँ कोर्स सूची में भी दर्ज है: " + t); if (!reg.has(TW[t])) FAIL("जुड़वाँ का मुख्य कोर्स सूची में नहीं: " + TW[t]); }
  const bh = fs.readFileSync(path.join(ROOT, "bhasha.html"), "utf8");
  const shown = +((bh.match(/id="bhCount">(\d+)</) || [])[1] || 0);
  if (shown !== reg.size) FAIL("bhasha.html की गिनती " + shown + " ≠ सूची " + reg.size);
  console.log("जाँच-6 भाषा-सूची: courses_data " + reg.size + " = sitemap " + smRoots.size + " = bhasha.html " + shown + " · जुड़वाँ " + Object.keys(TW).length);
}

/* ---- जाँच-7: भाषा-परिवार के title/description + schema ---- */
{
  const SEO = require("./lib_seo_meta.js");
  let pend = [];
  try { pend = require("./build_seo_meta.js").run({ check: true }).pending; } catch (e) { FAIL("SEO-परत: " + e.message); }
  if (pend.length) FAIL("SEO-परत लंबित: " + pend.length + " पेज lib_seo_meta.js से मेल नहीं खाते (जैसे " + pend.slice(0, 3).join(", ") + ") : चलाएँ node generator/build_seo_meta.js");
  let n = 0, long = 0, nold = 0, badld = 0;
  for (const u of SM) {
    if (u.indexOf(BASE + "/courses/hi/bhasha/") !== 0) continue;
    const f = urlPathToFile(u), k = SEO.typeOf(path.relative(ROOT, f)); if (!k) continue;
    n++;
    const h = fs.readFileSync(f, "utf8");
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1], d = (h.match(/<meta name="description" content="([^"]*)"/) || [, ""])[1];
    if (SEO.len(t) > SEO.T_MAX || SEO.len(d) > SEO.D_MAX || !t || !d) { long++; if (long <= 5) FAIL("title/description सीमा से बाहर: " + u); }
    const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (!lds.length) { nold++; if (nold <= 5) FAIL("schema (JSON-LD) नहीं: " + u); }
    for (const m of lds) { try { JSON.parse(m[1]); } catch (e) { badld++; if (badld <= 5) FAIL("schema पढ़ा नहीं गया: " + u); } }
  }
  console.log("जाँच-7 भाषा-परिवार: " + n + " पेज · सीमा-बाहर " + long + " · बिना-schema " + nold + " · टूटा-schema " + badld + " · lib से बेमेल " + pend.length);
}

/* ---- जाँच-8: lastmod (बदलाव-तारीख़) ---- */
{
  const lf = path.join(__dirname, "data", "sitemap_ledger.json");
  const L = fs.existsSync(lf) ? JSON.parse(fs.readFileSync(lf, "utf8")) : null;
  if (!L) FAIL("बही-खाता नहीं मिला: generator/data/sitemap_ledger.json");
  const now = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
  let nlm = 0, bad = 0;
  for (const k of kids) {
    const xs = fs.existsSync(path.join(ROOT, k)) ? fs.readFileSync(path.join(ROOT, k), "utf8") : "";
    for (const m of xs.matchAll(/<url><loc>https:\/\/acslearn\.com([^<]*)<\/loc>(?:<lastmod>([^<]*)<\/lastmod>)?<\/url>/g)) {
      const d = m[2] || "";
      if (d) { nlm++; if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d > now) { bad++; if (bad <= 5) FAIL("lastmod ग़लत: " + m[1] + " " + d); } }
      if (L && (!L[m[1]] || L[m[1]][1] !== d)) { bad++; if (bad <= 5) FAIL("lastmod बही-खाते से बेमेल: " + m[1]); }
    }
  }
  const LN = L ? Object.keys(L).filter(k => k[0] !== "#").length : 0;
  if (L && LN !== SM.size) FAIL("बही-खाते के पते " + LN + " ≠ sitemap " + SM.size + " : चलाएँ node generator/build_sitemap.js");
  for (const k of kids) { const m = idx.match(new RegExp("/" + k.replace(/\./g, "\\.") + "</loc><lastmod>([^<]*)</lastmod>")); if (L && (!L["#" + k] || !m || L["#" + k][1] !== m[1])) { bad++; FAIL("sitemap.xml में खंड-तारीख़ बही-खाते से बेमेल: " + k); } }
  console.log("जाँच-8 lastmod: तारीख़ वाले पते " + nlm + " · दोष " + bad);
}

/* ================= v1.2 की नई जाँचें (9-12) ================= */
{
  const crypto = require("crypto");
  const tol = sel => new RegExp("<meta " + sel + ' content="([\\s\\S]*?)"\\s*/?>(?=\\s*<)');
  const TOL = { "description": tol('name="description"'), "og:title": tol('property="og:title"'), "og:description": tol('property="og:description"') };
  const Tm = new Map(), Dm = new Map(), Bm = new Map();
  let c9 = 0, c10 = 0;
  const bad9 = (u, why) => { c9++; if (c9 <= 10) FAIL("सिर की गड़बड़ी (" + why + "): " + u); };
  for (const u of SM) {
    const f = urlPathToFile(u); if (!fs.existsSync(f)) continue;
    const h = fs.readFileSync(f, "utf8"), hd = h.slice(0, h.indexOf("</head>") > 0 ? h.indexOf("</head>") : 30000);
    const t = (hd.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1];
    if (!t.trim()) bad9(u, "title ख़ाली"); else if (/<[a-zA-Z\/]/.test(t)) bad9(u, "title के भीतर HTML tag");
    let d = "";
    for (const k of Object.keys(TOL)) {
      const m = hd.match(TOL[k]);
      if (!m) { if (k === "description") bad9(u, "description नहीं"); continue; }
      if (/"/.test(m[1])) bad9(u, k + " में कच्चा उद्धरण-चिह्न");
      else if (/<[a-zA-Z\/]/.test(m[1])) bad9(u, k + " के भीतर HTML tag");
      else if (k === "description") { d = m[1]; if (!d.trim()) bad9(u, "description ख़ाली"); }
    }
    if (/जल्द उपलब्ध/.test(d)) { c10++; if (c10 <= 5) FAIL("ख़ाली-पेज sitemap में (description में \"जल्द उपलब्ध\"): " + u); }
    (Tm.get(t) || Tm.set(t, []).get(t)).push(u);
    if (d) (Dm.get(d) || Dm.set(d, []).get(d)).push(u);
    const bi = h.search(/<h1[\s>]/);
    if (bi > 0) { const body = h.slice(bi).replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "); if (body.length > 400) { const k = crypto.createHash("sha1").update(body).digest("hex"); (Bm.get(k) || Bm.set(k, []).get(k)).push(u); } }
  }
  if (c9 > 10) FAIL("…सिर की कुल गड़बड़ियाँ: " + c9);
  const dup = (M, label) => { let n = 0; for (const [k, us] of M) if (us.length > 1) { n++; if (n <= 5) FAIL(label + " (" + us.length + " पेज): " + us.slice(0, 3).join("  ")); } return n; };
  const nB = dup(Bm, "दोहरा पेज : पूरा पाठ हूबहू एक"), nT = dup(Tm, "दोहरा शीर्षक"), nD = dup(Dm, "दोहरा description");
  console.log("जाँच-9 सिर की सफ़ाई: दोष " + c9 + " · जाँच-10 ख़ाली-पेज: " + c10 + " · जाँच-11 दोहरे पेज: " + nB + " · जाँच-12 दोहरे शीर्षक " + nT + ", दोहरे description " + nD);
}

/* ================= v1.3 की जाँच-13: हुनर-पाठों के description की गुणवत्ता ================= */
{
  const HN = require("./lib_seo_hunar.js");
  const RE = /<meta name="description" content="([\s\S]*?)"\s*\/?>(?=\s*<)/;
  let n = 0, dangle = 0, cutMid = 0, ld = 0, derived = 0, notSent = 0;
  for (const u of SM) {
    const f = urlPathToFile(u), rel = path.relative(ROOT, f).split(path.sep).join("/");
    if (!HN.familyOf(rel) || /\/index\.html$/.test(rel) || !fs.existsSync(f)) continue;
    const h = fs.readFileSync(f, "utf8"), m = h.match(RE); if (!m) continue;
    const d = HN.unesc(m[1]); n++;
    if (HN.DANGLE.test(d)) { dangle++; if (dangle <= 5) FAIL("description अधूरे शब्द पर ख़त्म: " + u); }
    if (d === HN.expected(h, rel)) {     /* यंत्र से बना (या data/seo_desc_overrides.js वाला) description */
      derived++; const L = HN.len(d);
      if (L > HN.D_MAX || L < HN.D_MIN) { cutMid++; if (cutMid <= 5) FAIL("पाठ से बना description सीमा से बाहर (" + L + " अक्षर; चाहिए " + HN.D_MIN + "-" + HN.D_MAX + "): " + u); }
      if (!HN.SENT_END.test(d)) { notSent++; if (notSent <= 5) FAIL("पाठ से बना description पूरे वाक्य पर ख़त्म नहीं: " + u + " : इसे generator/data/seo_desc_overrides.js में हाथ से लिखें"); }
    }
    for (const b of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { const j = JSON.parse(b[1]); for (const x of (Array.isArray(j) ? j : (j["@graph"] || [j]))) if (x && x["@type"] === "LearningResource" && x.description !== d) { ld++; if (ld <= 5) FAIL("schema का description meta से अलग: " + u); } } catch (e) {} }
  }
  console.log("जाँच-13 हुनर-पाठ: " + n + " पेज · पाठ से बने " + derived + " · अधूरे शब्द पर ख़त्म " + dangle + " · सीमा-बाहर " + cutMid + " · अधूरे वाक्य " + notSent + " · schema-बेमेल " + ld);
}

if (fails) { console.log("\n❌ कुल विफल: " + fails + " — upload निषिद्ध"); process.exit(1); }
console.log("\n🏁 dev_seo_check v1.3.1 — तेरहों जाँचें पास");
