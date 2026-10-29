/* build_bolo_shabd.js v1.0 · 29-Oct-2026 — Founder-नियम (29-Oct): 7-कदम राह के दो नए कदम, सभी 416 भाषाओं में
   (4) बोलो-वर्कबुक — हर हफ़्ते की बोलने-योग्य मोबाइल-पुस्तक (छपने-योग्य भी): /courses/hi/bhasha/<slug>/bolo-workbook/
   (6) शब्दकोश — कोर्स के सब शब्द-कार्ड: /courses/hi/bhasha/<slug>/shabdkosh/
   पन्ना हल्का खोल है; वाक्य/शब्द उसी भाषा की कोर्स-data (assets/kkb*_data.js) से assets/bolo-wb.js दिखाता है (एक चीज़ = एक जगह).
   हर कार्ड: 🔊 सुनो + 🎙️ बोलो (assets/acs-bolo.js) · एक पंक्ति में 2 कार्ड · अकेला बीच में · 3D रंगीन. चलाओ: node generator/build_bolo_shabd.js [slug] */
const fs = require("fs"), path = require("path"); const ROOT = path.join(__dirname, ".."); const VER = "1.0";
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function loadMenu() { const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8"); const box = {}; new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box); return box.__L.menu; }
const MENU_HTML = loadMenu().map(m => '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>").join("\n");
const MENU_FALLBACK_JS = '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};}</scr' + 'ipt>';
function langs() {
  const out = []; const base = path.join(ROOT, "courses/hi/bhasha");
  for (const slug of fs.readdirSync(base).sort()) {
    const f = path.join(base, slug, "index.html"); if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, "utf8"); const m2 = s.match(/\/assets\/(kkb2(?:_[a-z0-9]+)?_data\.js)/), m1 = s.match(/\/assets\/(kkb(?:_[a-z0-9]+)?_data\.js)/);
    if (!m2 || !m1) continue;
    const w = {}; new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, "assets", m2[1]), "utf8") + ";")(w, w, {});
    const D = w.KKB2_DATA; if (!D || !D.lang) continue;
    out.push({ slug, l1: m1[1], l2: m2[1], code: D.lang.code, hi: D.lang.label, tts: D.lang.tts, sr: D.lang.sr || D.lang.tts });
  }
  return out;
}
function regBox(L, t) { return '<div class="acs-reg" style="background:#F5F7FA;color:#0B1F3A;border:2px solid #2E7D32;border-radius:12px;padding:12px 14px;margin:14px auto;max-width:900px;font-size:18px;line-height:1.7">📝 <b>' + esc(t) + '</b> रजिस्ट्रेशन मुफ़्त है। <a href="/join.html" style="color:#2E7D32;font-weight:800">मुफ़्त रजिस्ट्रेशन करें →</a></div>'; }
function page(L, mode) {
  const sub = mode === "bolo" ? "bolo-workbook" : "shabdkosh", out = "courses/hi/bhasha/" + L.slug + "/" + sub + "/index.html", url = "https://acslearn.com/courses/hi/bhasha/" + L.slug + "/" + sub + "/";
  const T = mode === "bolo" ? { h: "🎙️ " + L.hi + " बोलो-वर्कबुक", s: "हर हफ़्ते के वाक्य — सुनो, साथ बोलो, फिर माइक पर बोलकर जाँचो। मोबाइल पर पढ़ो, या छापकर अभ्यास करो।",
      title: L.hi + " बोलो-वर्कबुक — हर हफ़्ते के वाक्य सुनो और बोलो (मुफ़्त, छपने-योग्य) | अप्लाइड कंप्यूटर स्कूल", desc: L.hi + " बोलने का अभ्यास — 90-दिन कोर्स के हर हफ़्ते के वाक्य, देवनागरी उच्चारण और हिंदी अर्थ के साथ; हर वाक्य पर 🔊 सुनो और 🎙️ बोलो।" }
    : { h: "📖 " + L.hi + " शब्दकोश", s: "कोर्स के सब शब्द एक जगह — शब्द, देवनागरी उच्चारण और हिंदी अर्थ; हर शब्द पर सुनो और बोलो।",
      title: L.hi + " शब्दकोश — हिंदी अर्थ और देवनागरी उच्चारण के साथ (मुफ़्त) | अप्लाइड कंप्यूटर स्कूल", desc: L.hi + " के रोज़ काम आने वाले शब्द — देवनागरी उच्चारण, हिंदी अर्थ, खोज, और हर शब्द पर 🔊 सुनो व 🎙️ बोलो।" };
  let h = '<div class="bw-wrap"><nav class="bw-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="/courses/hi/bhasha/' + L.slug + '/">' + esc(L.hi) + ' बोलने का कोर्स</a> › ' + (mode === "bolo" ? "बोलो-वर्कबुक" : "शब्दकोश") + '</nav>';
  h += '<header class="bw-hero"><h1>' + esc(T.h) + '</h1><p>' + esc(T.s) + '</p><p class="bw-note">मूल भाषा: हिंदी।</p><button class="bw-print" onclick="window.print()">🖨️ छापें / PDF</button></header>';
  h += regBox(L, "यह मुफ़्त है, और " + L.hi + " बोलने का पूरा कोर्स भी मुफ़्त है।");
  h += '<div id="bw-app" data-mode="' + mode + '" data-l1="/assets/' + L.l1 + '" data-l2="/assets/' + L.l2 + '" data-tts="' + esc(L.tts) + '" data-sr="' + esc(L.sr) + '" data-name="' + esc(L.hi) + '"><p class="bw-load">पन्ना खुल रहा है… (इंटरनेट धीमा हो तो थोड़ा रुकिए)</p></div>';
  h += regBox(L, "अगला कदम रजिस्ट्रेशन है — इससे आपकी पढ़ाई और परीक्षा का हिसाब आपके नाम से रहता है।");
  h += '<p class="bw-note">वाक्य और शब्द इसी भाषा के ACS 90-दिन कोर्स से हैं। 🟡 भाषा संवर्धन समिति की जाँच का स्वागत। बोलो-अभ्यास: आवाज़ सिर्फ़ browser की आवाज़-सेवा तक जाती है — ACS सहेजता नहीं।</p></div>';
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->"; const a = TPL.indexOf(S), b = TPL.indexOf(E);
  let p = TPL.slice(0, a + S.length) + "\n" + h + "\n" + TPL.slice(b);
  const ld = JSON.stringify([{ "@context": "https://schema.org", "@type": "LearningResource", "name": T.h.replace(/^\S+\s/, ""), "description": T.desc, "inLanguage": "hi", "isAccessibleForFree": true, "url": url, "provider": { "@type": "Organization", "name": "Applied Computer School", "url": "https://acslearn.com/" } }]);
  p = p.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(T.title) + "</title>\n<meta name=\"description\" content=\"" + esc(T.desc) + "\">\n<meta name=\"robots\" content=\"index, follow\">\n<link rel=\"canonical\" href=\"" + url + "\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:url\" content=\"" + url + "\">\n<meta property=\"og:title\" content=\"" + esc(T.title) + "\">\n<meta property=\"og:description\" content=\"" + esc(T.desc) + "\">\n<meta property=\"og:image\" content=\"https://acslearn.com/logo.png\">\n<meta property=\"og:locale\" content=\"hi_IN\">\n<script type=\"application/ld+json\">" + ld + "</scr" + "ipt>");
  p = p.replace("</head>", '<link rel="stylesheet" href="/assets/bolo-wb.css">\n</head>');
  p = p.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  p = p.replace("</body>", MENU_FALLBACK_JS + '\n<script src="/assets/acs-bolo.js" defer></scr' + 'ipt>\n<script src="/assets/bolo-wb.js" defer></scr' + 'ipt>\n</body>');
  p = p.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_bolo_shabd.js v" + VER + ") — हाथ से न बदलें। स्रोत: _TEMPLATE.html + assets/" + L.l1 + " + assets/" + L.l2 + " -->");
  const vis = h.replace(/<[^>]+>/g, " "); if (/[\[\]]/.test(vis)) throw new Error(out + ": square bracket");
  if ((p.match(/href="\/join\.html"/g) || []).length < 2) throw new Error(out + ": रजिस्ट्रेशन-अपील नहीं");
  fs.mkdirSync(path.dirname(path.join(ROOT, out)), { recursive: true }); fs.writeFileSync(path.join(ROOT, out), p, "utf8");
}
module.exports = { langs };
if (require.main === module) { const only = process.argv[2]; const LS = langs().filter(l => !only || l.slug === only); LS.forEach(L => { page(L, "bolo"); page(L, "shabd"); }); console.log("🏁 build_bolo_shabd v" + VER + " — " + LS.length + " भाषाएँ × 2 पन्ने"); }
