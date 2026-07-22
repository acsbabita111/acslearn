/* ============================================================
   build_udyam_intro_pages.js — उद्यम-परिचय पेजों का generator (परत-4)
   v1.0 · 22-Jul-2026 (काम-4क — नमूना: सिर्फ़ n=116 वेल्डिंग/इस्पात-संरचना)
   ------------------------------------------------------------
   लोहे का नियम: कोई परिचय-पेज हाथ से न बने — सिर्फ़ यह script (परत-4)।
   स्रोत: /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट)
        + generator/data/udyam_intro_data.js (परत-3 — MG_INTRO + UDYAM_INTRO)
   चलाना: repo-रूट से → node generator/build_udyam_intro_pages.js
   नतीजा: /udyam/[slug].html (SEO-नामकरण नियम — v2.4-क8 का url-नियम इसी से भरेगा)

   check-robot (fail = पेज नहीं बनेगा):
   1. शब्द-गिनती 3800 से 4200 के बीच (Founder-नियम 22-Jul दूसरा दौर: "कोई कमी नहीं रखेंगे" —
      बाज़ार-आँकड़े · सुरक्षा-आँकड़े · माँग-संख्या · मिलते-जुलते धंधे — चार नए data-सेक्शन जुड़े)
   2. ≥ 2 रेखा-चित्र (svg) अनिवार्य (पहले ≥1 था — अब L-सीढ़ी + कम-से-कम 1 डेटा-चार्ट)
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं
   5. हर बाहरी कड़ी (Wikipedia/बड़े-नाम/शोध-स्रोत) के पास "बाहरी site" verify-नोट अनिवार्य
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { MG_INTRO, UDYAM_INTRO } = require(path.join(__dirname, "data", "udyam_intro_data.js"));

const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");
const STAMP = "22-Jul-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_udyam_intro_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: generator/data/udyam_intro_data.js में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- menu (links.js से — build_course_pages.js जैसा पैटर्न) ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU = loadMenu();
const MENU_HTML = MENU.map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

/* ---------- सहायक ---------- */
function visibleText(html){
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function wordCount(html){
  const t = visibleText(html);
  return t ? t.split(" ").length : 0;
}

const SEC_LABELS = [
  ["parichay", "परिचय"],
  ["outlook", "2026 का नज़ारा (Outlook)"],
  ["bazar", "बाज़ार-आँकड़े (Market Size व Growth)"],
  ["trends", "रुझान (Trends)"],
  ["leaders", "बड़े नाम (Leaders — Global व India)"],
  ["lscale", "L1 से L15 — निवेश-सीढ़ी"],
  ["milte", "मिलते-जुलते धंधे (तुलना)"],
  ["yogyata", "योग्यता"],
  ["asafal", "असफलता के कारण"],
  ["suraksha", "सुरक्षा-आँकड़े (दुनिया-भर की रिपोर्ट से)"],
  ["safalta", "सफलता के सूत्र"],
  ["maang", "माँग-संख्या (कितनी नौकरियाँ/मौक़े)"],
  ["yojana", "सरकारी योजनाएँ"],
  ["gyan", "ज्ञान-स्रोत"],
  ["tour", "इंडस्ट्रियल टूर (Industrial Tour)"],
  ["sandesh", "ACS का संदेश"]
];

/* ---------- check-robot ---------- */
function checkRobot(bodyHtml){
  const holes = [];
  const words = wordCount(bodyHtml);
  if (words < 3800) holes.push("शब्द-गिनती " + words + " (< 3800)");
  if (words > 4200) holes.push("शब्द-गिनती " + words + " (> 4200)");
  const svgCount = (bodyHtml.match(/<svg[\s>]/g) || []).length;
  if (svgCount < 2) holes.push("रेखा-चित्र (svg) सिर्फ़ " + svgCount + " (< 2 चाहिए)");
  const vis = visibleText(bodyHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const small = bodyHtml.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font-size " + n + "px (< 16px): " + m.trim());
  }
  /* बाहरी कड़ी (target=_blank) के पास verify-नोट अनिवार्य — प्रति-कड़ी नहीं, पेज-स्तर पर कम-से-कम एक बार */
  const extLinks = (bodyHtml.match(/target="_blank"/g) || []).length;
  if (extLinks > 0 && !/बाहरी site/.test(bodyHtml)) holes.push("बाहरी-कड़ी पर verify-नोट (\"बाहरी site\") नहीं मिला");
  return { words, holes };
}

/* ---------- पेज-body बनाना ---------- */
function buildBody(n, udy){
  const mg = MG_INTRO[udy.mg] || null;
  const secsHtml = SEC_LABELS.map(([key, label]) => {
    const html = udy.parts[key];
    if (!html) return "";
    return '<section class="udy-sec">\n<h2>' + label + "</h2>\n" + html + "\n</section>";
  }).join("\n\n");

  const mgBlock = mg
    ? '<section class="udy-sec udy-mg">\n<h2>यह किस बड़े समूह (Master Group) में आता है</h2>\n' +
      "<p><b>" + mg.name + "</b></p>\n" + mg.body + "\n</section>\n\n"
    : "";

  return '\n<article class="lsn-wrap udy-wrap">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/udyam/">उद्यम</a> › ' + udy.title_hi + "</p>\n" +
    "<h1>" + udy.title_hi + "</h1>\n" +
    '<p class="lsn-meta">उद्यम-सूची क्रमांक ' + n + " · " + udy.title_note + " · मुफ़्त परिचय, बिना login</p>\n" +
    "</header>\n\n" +
    mgBlock + secsHtml + "\n\n" +
    '<section class="udy-sec udy-demand">\n<h2>यह कोर्स पसंद है?</h2>\n' +
    "<p>अगर यह परिचय आपको उपयोगी लगा तो हमें लिखें — हम इस उद्यम पर और content बढ़ाएँगे।</p>\n" +
    '<p><a class="lsn-vidbtn" href="https://wa.me/919431210092?text=' +
      encodeURIComponent("मुझे " + udy.title_hi.replace(/\(.*?\)/g, "").trim() + " (n" + n + ") के बारे में और जानकारी चाहिए") +
      '" target="_blank" rel="noopener">💬 WhatsApp पर लिखें</a></p>\n</section>\n\n' +
    '<nav class="lsn-nav"><a class="lsn-navbtn" href="/udyam/">← सब उद्यम</a></nav>\n' +
    "</article>\n";
}

/* ---------- मुख्य पेज-निर्माण ---------- */
function buildPage(n, udy){
  const body = buildBody(n, udy);
  const { words, holes } = checkRobot(body);
  if (holes.length){
    console.error("❌ उद्यम n" + n + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }

  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");

  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);

  const canonical = "https://acslearn.com/udyam/" + udy.slug + ".html";
  const metaDesc = udy.title_hi + " — परिचय, बाज़ार, कमाई-सीढ़ी, योग्यता व सरकारी योजनाएँ, सरल हिंदी में, ACS पर मुफ़्त।";
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + udy.title_hi + " — पूरी जानकारी | ACS</title>\n" +
    '<meta name="description" content="' + metaDesc + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');

  const ld = { "@context": "https://schema.org", "@type": "Article",
    "headline": udy.title_hi, "description": metaDesc, "inLanguage": "hi", "url": canonical,
    "publisher": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com" } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
    { "@type": "ListItem", "position": 2, "name": "उद्यम", "item": "https://acslearn.com/udyam/" },
    { "@type": "ListItem", "position": 3, "name": udy.title_hi, "item": canonical } ] };

  page = page.replace("</head>",
    '<meta property="og:title" content="' + udy.title_hi + '">\n' +
    '<meta property="og:description" content="' + metaDesc + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    '<script type="application/ld+json">' + JSON.stringify(ld) + "</scr" + "ipt>\n" +
    '<script type="application/ld+json">' + JSON.stringify(bc) + "</scr" + "ipt>\n" +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n' +
    "<style>.udy-svg-wrap{margin:14px 0;max-width:340px}.udy-sec h2{font-size:22px}" +
    ".udy-cmptbl{width:100%;border-collapse:collapse;margin:14px 0;font-size:17px}" +
    ".udy-cmptbl th,.udy-cmptbl td{border:1px solid #CBD5E1;padding:8px 10px;text-align:left}" +
    ".udy-cmptbl th{background:#0B1F3A;color:#F5F7FA}" +
    ".udy-note{background:#FFF8E1;border-left:4px solid #F9A825;padding:10px 14px;font-size:17px;margin:12px 0}" +
    ".udy-maplink{color:#2E7D32;font-weight:700;text-decoration:none}</style>\n</head>");
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return { page, words };
}

/* ---------- चलाना ---------- */
const outDir = path.join(ROOT, "udyam");
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
Object.keys(UDYAM_INTRO).forEach(nStr => {
  const n = parseInt(nStr, 10);
  const udy = UDYAM_INTRO[nStr];
  const built = buildPage(n, udy);
  if (!built){ fail++; return; }
  const f = udy.slug + ".html";
  fs.writeFileSync(path.join(outDir, f), built.page, "utf8");
  console.log("✅ n" + n + " → udyam/" + f + " (" + built.words + " शब्द)");
  ok++;
});

console.log("\n— नतीजा: " + ok + " पेज बने · " + fail + " fail —");
if (fail) process.exit(1);
