/* ============================================================
   build_mirror_homes.js v1.1 (09-Nov-2026) — परत-4 GENERATOR
   v1.0 + ChatGPT-ऑडिट सुधार:
   • भाषा-सूची का एक घर: data (MIRROR_HOME) — ORDER उसी से व्युत्पन्न;
     universal.js की runtime-तालिका data से मिलान-assert (बेमेल = FAIL)
   • exact-state fail-closed: पहले से पैच मिले तो पूरा-राज्य verify, वरना FAIL
   • प्रति-भाषा सही font (Google Fonts) + :root --font override
   • RTL (ar/ur): Latin/अंक bdi dir="ltr" बाड़ · ur में Nastaliq line-height
   • en og:description: 950+ enterprises → enterprise opportunities
   • universal v2.2: साझा ACS_LANG_HOMES तालिका + mirror-mode + isHome सुधार
   चलाना: node generator/build_mirror_homes.js  (repo-रूट से) — दोबारा चलाने
   पर byte-बदलाव शून्य (idempotent) और पूरा-राज्य verify।
   v1.3 (10-Nov-2026, Founder-फ़ैसला): हर भाषा-होम का 🧭 बटन उसी भाषा के career-पेज
   पर (en → /en/career.html, ar → /ar/career.html …); data-खाना btn1href से बदला जा सके।
   v1.2 (10-Nov-2026): live के बराबर किया — (1) करियर-बटन data-खाना; (2) universal/sw की जाँच
   "इतना या नया"; (3) sitemap नहीं लिखता (घर: build_sitemap.js)।
   जाँच: generator/dev_sync_check.js — live पर दोबारा चलाने से बदलाव शून्य।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const M = require("./data/mirror_home_strings.js");
const ORDER = Object.keys(M);                 // एकमात्र स्रोत: data
const ALL = ["hi","en"].concat(ORDER);
const RTL = ORDER.filter(c => M[c].dir === "rtl");

function read(p){ return fs.readFileSync(path.join(ROOT,p), "utf8"); }
function write(p, s){ fs.mkdirSync(path.dirname(path.join(ROOT,p)), {recursive:true}); fs.writeFileSync(path.join(ROOT,p), s, "utf8"); }
function count(h, n){ return h.split(n).length - 1; }
function R(s, o, nw, n, tag){ n = n||1; const c = count(s,o);
  if (c !== n) throw new Error("R-fail ["+tag+"]: "+c+"≠"+n+" :: "+o.slice(0,60));
  return s.split(o).join(nw); }
function A(cond, tag){ if(!cond) throw new Error("verify-fail ["+tag+"]"); }

function hrefURL(c){ return c === "hi" ? "https://acslearn.com/" : "https://acslearn.com/"+c+"/"; }
const HREF_BLOCK = ALL.map(c => '<link rel="alternate" hreflang="'+c+'" href="'+hrefURL(c)+'" />').join("\n")
  + '\n<link rel="alternate" hreflang="x-default" href="https://acslearn.com/" />';
function verifyHreflang(s, tag){
  const got = new Set((s.match(/hreflang="[^"]+" href="[^"]+"/g)||[]));
  A(got.size === 16, tag+"-16");
  ALL.forEach(c => A(got.has('hreflang="'+c+'" href="'+hrefURL(c)+'"'), tag+"-"+c));
  A(got.has('hreflang="x-default" href="https://acslearn.com/"'), tag+"-xd");
}
const EN_OGDESC_OLD = 'Always-free online learning in 130 languages, from village to the Global South. Free courses · 950+ enterprises.';
const EN_OGDESC_NEW = 'Always-free online learning in 130 languages, from village to the Global South. Free courses · 950+ enterprise opportunities.';

/* ---------- 1) /en/: og:locale + og:description + hreflang ---------- */
let en = read("en/index.html");
if (en.indexOf('hreflang="x-default"') === -1) {
  en = R(en, '<meta property="og:locale" content="hi_IN" />', '<meta property="og:locale" content="en_US" />', 1, "en-loc");
  en = R(en, EN_OGDESC_OLD, EN_OGDESC_NEW, 1, "en-ogdesc");
  en = R(en, '<link rel="canonical" href="https://acslearn.com/en/" />',
            '<link rel="canonical" href="https://acslearn.com/en/" />\n'+HREF_BLOCK, 1, "en-href");
  write("en/index.html", en);
  console.log("en: og:locale + og:desc(उद्यम-अवसर) + hreflang ✅");
} else {
  verifyHreflang(en, "en"); A(count(en,'content="en_US"')===1, "en-loc");
  A(count(en, EN_OGDESC_NEW)===1 && count(en, EN_OGDESC_OLD)===0, "en-ogdesc");
  console.log("en: पूर्व-पैच verify ✅");
}

/* ---------- 1-ख) करियर-बटन नियम (Founder, 10-Nov-2026): हर भाषा-होम का 🧭 बटन
   उसी भाषा के career-पेज पर — /hi/ → /कोड/ (पता-नियम v1.1)। English: /en/career.html।
   पहले English-बटन /en/aptitude-test.html पर था (काम-अनुवाद-1 का सीधा पेज-बदलाव, किसी
   generator में दर्ज नहीं) — अब यहीं दर्ज। /en/aptitude-test.html हर career-पेज से जुड़ा रहता है। */
const BTN1_OLD = 'class="btn btn-white" href="/en/aptitude-test.html">';
const BTN1_EN  = 'class="btn btn-white" href="/en/career.html">';
A(fs.existsSync(path.join(ROOT, "en/career.html")), "en-career-file");
en = read("en/index.html");
if (count(en, BTN1_OLD) === 1) {
  en = R(en, BTN1_OLD, BTN1_EN, 1, "en-btn1");
  write("en/index.html", en); console.log("en: 🧭 बटन → /en/career.html ✅");
} else { A(count(en, BTN1_EN) === 1, "en-btn1-verify"); console.log("en: 🧭 बटन /en/career.html verify ✅"); }

/* ---------- 2) root (hi): सिर्फ़ hreflang ---------- */
let hi = read("index.html");
if (hi.indexOf('hreflang="x-default"') === -1) {
  hi = R(hi, '<link rel="canonical" href="https://acslearn.com/" />',
            '<link rel="canonical" href="https://acslearn.com/" />\n'+HREF_BLOCK, 1, "hi-href");
  write("index.html", hi); console.log("root(hi): hreflang ✅ · बाक़ी byte-अछूता");
} else { verifyHreflang(hi, "hi"); console.log("root: पूर्व-पैच verify ✅"); }

/* ---------- 3) 13 भाषा-पेज ---------- */
const SRC = read("en/index.html");
const FONT_LINK_OLD = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap" rel="stylesheet">';
function fontLink(T){
  if (T.gfam === "KEEP") return FONT_LINK_OLD;
  if (T.gfam === "LATIN")
    return '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">';
  const w = (T.gfam === "Noto+Nastaliq+Urdu") ? "400;700" : "400;600;700;800;900";
  return '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family='+T.gfam+':wght@'+w+'&display=swap" rel="stylesheet">';
}
function fontStyle(code, T){
  const lh = (code === "ur") ? ";--lh:2.1" : "";
  return '<style>/* भाषा-font v1.1 */ :root{--font:\''+T.font+'\',\'Inter\',sans-serif'+lh+'} .acs-drawer h4{letter-spacing:0}</style>';
}
function bdi(t){ return '<bdi dir="ltr">'+t+'</bdi>'; }
ORDER.forEach(function(code){
  const T = M[code];
  let certline = T.certline, warn = T.warn;
  if (T.dir === "rtl") {
    certline = certline.split("ISO 9001:2015").join(bdi("ISO 9001:2015")).split("ffgpmt.org").join(bdi("ffgpmt.org"));
    warn = warn.split("Razorpay").join(bdi("Razorpay"));
  }
  let s = SRC;
  s = R(s, '<html lang="en">', T.dir==="rtl" ? '<html lang="'+code+'" dir="rtl">' : '<html lang="'+code+'">', 1, code+"-lang");
  s = R(s, '<title>Applied Computer School — ACS</title>',
          '<title>Applied Computer School (ACS) · '+T.ttail+'</title>', 1, code+"-title");
  s = R(s, '<meta name="description" content="Applied Computer School (ACS) — always-free online learning in 130 languages, from village to the Global South. Courses, skills and certificates on your phone." />',
          '<meta name="description" content="'+T.desc+'" />', 1, code+"-desc");
  s = R(s, '<meta property="og:title" content="Applied Computer School — ACS" />',
          '<meta property="og:title" content="Applied Computer School (ACS) · '+T.ttail+'" />', 1, code+"-ogt");
  s = R(s, '<meta property="og:description" content="'+EN_OGDESC_NEW+'" />',
          '<meta property="og:description" content="'+T.ogdesc+'" />', 1, code+"-ogd");
  s = R(s, '<link rel="canonical" href="https://acslearn.com/en/" />',
          '<link rel="canonical" href="https://acslearn.com/'+code+'/" />', 1, code+"-canon");
  s = R(s, '<meta property="og:url" content="https://acslearn.com/en/" />',
          '<meta property="og:url" content="https://acslearn.com/'+code+'/" />', 1, code+"-ogu");
  s = R(s, '<meta property="og:locale" content="en_US" />',
          '<meta property="og:locale" content="'+T.locale+'" />', 1, code+"-ogl");
  s = R(s, FONT_LINK_OLD, fontLink(T), 1, code+"-font");
  s = R(s, '<link rel="stylesheet" href="/acs-style.css">',
          '<link rel="stylesheet" href="/acs-style.css">\n'+fontStyle(code, T), 1, code+"-fstyle");
  s = R(s, '<span class="pill">✨ For a Bright Future</span>', '<span class="pill">'+T.pill+'</span>', 1, code+"-pill");
  s = R(s, '<span class="g">Join Now!</span>', '<span class="g">'+T.join+'</span>', 1, code+"-join");
  /* v1.3 (10-Nov, Founder-फ़ैसला): 🧭 बटन = उसी भाषा का career-पेज (/कोड/career.html);
     data-खाना btn1href हो तो वही। फ़ाइल न हो = रुको (मरा बटन कभी नहीं)। */
  const b1 = T.btn1href || ("/" + code + "/career.html");
  A(fs.existsSync(path.join(ROOT, b1.replace(/^\//, ""))), code + "-b1-file");
  s = R(s, BTN1_EN, 'class="btn btn-white" href="' + b1 + '">', 1, code+"-b1h");
  s = R(s, '>🧭 Choose Your Career!<', '>'+T.btn1+'<', 1, code+"-b1");
  s = R(s, '>🗣️ Learn a New Language!<', '>'+T.btn2+'<', 1, code+"-b2");
  s = R(s, '>🛠️ Learn a New Skill!<', '>'+T.btn3+'<', 1, code+"-b3");
  s = R(s, '>🏭 Start Your Enterprise!<', '>'+T.btn4+'<', 1, code+"-b4");
  s = R(s, '>In 130 languages, from village to the Global South!<', '>'+T.tagline+'<', 1, code+"-tag");
  s = R(s, '>Original language: Hindi<', '>'+T.orig+'<', 1, code+"-orig");
  s = R(s, '<span id="acsBtnLang">Language</span>', '<span id="acsBtnLang">'+T.btnLang+'</span>', 1, code+"-bl");
  s = R(s, '<span id="acsBtnMenu">Menu</span>', '<span id="acsBtnMenu">'+T.btnMenu+'</span>', 1, code+"-bm");
  s = R(s, '<h4 id="acsDrawerTitle">Menu</h4>', '<h4 id="acsDrawerTitle">'+T.drawer+'</h4>', 1, code+"-dr");
  s = R(s, '>From village to the Global South in 130 languages — mobile-friendly course content!<', '>'+T.foottag+'<', 1, code+"-ft");
  s = R(s, '>📜 Certificate Issuing Body<', '>'+T.fbcert+'<', 1, code+"-fc");
  s = R(s, '>Certification: ISO 9001:2015 · Website: ffgpmt.org<', '>'+certline+'<', 1, code+"-cl");
  s = R(s, '>📞 Contact<', '>'+T.fbcontact+'<', 1, code+"-fo");
  s = R(s, '>⚠️ Payments only via the official Razorpay link.<', '>'+warn+'<', 1, code+"-w");
  s = R(s, '</span> Login / Dashboard</a>', '</span> '+T.login+'</a>', 1, code+"-lg");
  if (T.dir === "rtl") { /* bdi-बाड़: Latin/अंक टुकड़े अपनी दिशा में */
    s = R(s, '<span class="name" id="acsName">Applied Computer School™</span>',
            '<span class="name" id="acsName">'+bdi("Applied Computer School™")+'</span>', 1, code+"-bdi1");
    s = R(s, '>Applied Computer School<br>', '>'+bdi("Applied Computer School")+'<br>', 1, code+"-bdi2");
    s = R(s, '<h5 id="acsFootName">Applied Computer School™</h5>',
            '<h5 id="acsFootName">'+bdi("Applied Computer School™")+'</h5>', 1, code+"-bdi3");
    s = R(s, '<span id="acsCopy">Applied Computer School™</span>',
            '<span id="acsCopy">'+bdi("Applied Computer School™")+'</span>', 1, code+"-bdi4");
    s = R(s, '>+91-9431210092</a>', '>'+bdi("+91-9431210092")+'</a>', 1, code+"-bdi5");
    s = R(s, '>info@ffgpmt.org</a>', '>'+bdi("info@ffgpmt.org")+'</a>', 1, code+"-bdi6");
    s = R(s, '>📍 ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar — 851201<',
            '>📍 '+bdi("ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar — 851201")+'<', 1, code+"-bdi7");
    s = R(s, '>Freedom Fighter Gangadhar Prasad Memorial Trust (FFGPMTrust)<',
            '>'+bdi("Freedom Fighter Gangadhar Prasad Memorial Trust (FFGPMTrust)")+'<', 1, code+"-bdi8");
    s = R(s, '</span> • acslearn.com</div>', '</span> • '+bdi("acslearn.com")+'</div>', 1, code+"-bdi9");
  }
  write(code+"/index.html", s);
  console.log("/"+code+"/ ✅ "+(T.dir==="rtl"?"(RTL+bdi)":"")+" font:"+T.font);
});

/* ---------- 4) acs-universal.js v2.1 → v2.2 ---------- */
const TABLE = 'var ACS_LANG_HOMES = {en:1,' + ORDER.map(c=>c+":1").join(",") + '}; /* v5_26 टॉप-15 (hi=मूल root) — runtime भाषा-घर तालिका; data-स्रोत = generator/data/mirror_home_strings.js (generator मिलान-assert करता है) */';
let U = read("assets/acs-universal.js");
if (U.indexOf("ACS_LANG_HOMES") === -1) {
  U = R(U, 'acs-universal.js v2.1 — header + menu + footer का एक दिमाग़',
          'acs-universal.js v2.2 — header + menu + footer का एक दिमाग़ (09-Nov: mirror-mode + भाषा-होम isHome)', 1, "u-ver");
  U = R(U, 'function acsUniversalInit(){', TABLE + '\nfunction acsUniversalInit(){', 1, "u-table");
  U = R(U, 'var lang = (location.pathname||"").indexOf("/en/")===0 ? "en" : "hi";',
          'var seg0 = ((location.pathname||"").split("/")[1]||"");\n  var lang = seg0==="en" ? "en" : (ACS_LANG_HOMES[seg0] ? "mirror" : "hi");\n  /* mirror-mode: पेज का baked अनुवाद ही सच — यह script उस पाठ को कभी न लिखे */', 1, "u-lang");
  U = R(U, '}[lang];', '}[lang==="mirror" ? "en" : lang];', 1, "u-str");
  U = R(U, 'var o=C.org||{};', 'var o=C.org||{};\n    if(lang!=="mirror"){ /* mirror-पेजों पर baked अनुवाद अछूता */', 1, "u-so");
  U = R(U, 'setTxt("acsWarn",STR.warn);', 'setTxt("acsWarn",STR.warn);\n    } /* mirror-skip बंद */', 1, "u-sc");
  U = R(U, 'var items = (L.build ? L.build(lang) : (L.menu||[]));',
          'var mlang = (lang==="mirror") ? "en" : lang;\n    var items = (L.build ? L.build(mlang) : (L.menu||[]));', 1, "u-menu");
  U = R(U,
   "lgl.innerHTML='<a href=\"/refund.html\">💳 रिफंड (Refund) नीति</a> · <a href=\"/privacy.html\">🔒 निजता (Privacy) नीति</a> · <a href=\"/terms.html\">📜 नियम व शर्तें (Terms)</a>';",
   "lgl.innerHTML = (lang===\"hi\")\n        ? '<a href=\"/refund.html\">💳 रिफंड (Refund) नीति</a> · <a href=\"/privacy.html\">🔒 निजता (Privacy) नीति</a> · <a href=\"/terms.html\">📜 नियम व शर्तें (Terms)</a>'\n        : '<a href=\"/refund.html\">💳 Refund Policy</a> · <a href=\"/privacy.html\">🔒 Privacy Policy</a> · <a href=\"/terms.html\">📜 Terms</a>';",
   1, "u-legal");
  U = R(U,
   "lg2.innerHTML='<span class=\"e\">'+(login.icon||\"🔑\")+'</span> '+((login.label&&(login.label[lang]||login.label.hi))||\"Login / Dashboard\"); }",
   "if(lang!==\"mirror\"){ lg2.innerHTML='<span class=\"e\">'+(login.icon||\"🔑\")+'</span> '+((login.label&&(login.label[lang]||login.label.hi))||\"Login / Dashboard\"); } }",
   1, "u-login");
  U = R(U, 'var isHome = (P === "/" || P === "/index.html");',
          'var segH = (P.split("/")[1]||"");\n  var isHome = (P === "/" || P === "/index.html" || (ACS_LANG_HOMES[segH] && (P === "/"+segH+"/" || P === "/"+segH+"/index.html")));', 1, "u-ishome");
  write("assets/acs-universal.js", U);
  console.log("universal v2.2 ✅ (mirror-mode + isHome भाषा-होम)");
} else {
  A(count(U, TABLE)===1, "u-table-exact");
  ["ACS_LANG_HOMES[seg0]","mirror-skip बंद","var mlang","Refund Policy</a>",
   'if(lang!=="mirror"){ lg2.innerHTML','ACS_LANG_HOMES[segH]'].forEach((m,i)=>A(U.indexOf(m)>-1, "u-verify-"+i));
  /* v1.2: universal का संस्करण v2.2 या नया (v2.3 = runtime-i18n दौर) — "ठीक v2.2" वाली पुरानी जाँच हर नए दौर पर गिरती थी */
  { const uv = U.match(/v2\.(\d+)/); A(uv && +uv[1] >= 2, "u-verify-ver"); }
  console.log("universal: पूर्व-पैच पूरा-राज्य verify ✅");
}
/* runtime-तालिका = data (एक चीज़ = एक जगह का पहरा) */
const tm = read("assets/acs-universal.js").match(/var ACS_LANG_HOMES = \{([^}]+)\}/);
A(!!tm, "u-table-read");
const tkeys = tm[1].split(",").map(x=>x.split(":")[0].trim()).sort().join(",");
A(tkeys === ["en"].concat(ORDER).sort().join(","), "u-table==data");
console.log("universal-तालिका == data-कुंजियाँ ✅");

/* ---------- 5) sw: v823 या नया (v1.2: बाद के दौरों ने sw आगे बढ़ाया — पीछे कभी नहीं) ---------- */
{ const SW = read("sw.js"); const mv = SW.match(/CACHE_VERSION = 'v(\d+)'/);
  A(mv && +mv[1] >= 823, "sw-ver"); console.log("sw: v" + mv[1] + " (≥ v823) verify ✅"); }

/* ---------- 6) sitemap (v1.2): यह generator sitemap नहीं लिखता — एकमात्र घर build_sitemap.js
   (वह भाषा-होम इसी data की कुंजियों से जोड़ता है)। यहाँ सिर्फ़ सूचना-जाँच, रोक नहीं। ---------- */
{ const SM = read("sitemap-core.xml");
  const miss = ORDER.filter(c => count(SM, "<loc>https://acslearn.com/"+c+"/</loc>") !== 1);
  console.log(miss.length ? "⚠️ sitemap में भाषा-होम नहीं: " + miss.join(",") + " — अब चलाएँ: node generator/build_sitemap.js"
                          : "sitemap: 13/13 भाषा-होम मौजूद ✅ (घर: build_sitemap.js)"); }
console.log("🏁 build_mirror_homes v1.3 पूर्ण");
