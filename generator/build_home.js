/* ============================================================
   build_home.js v1.3 (परत-4, 12-Nov-2026) : होम-पेज (हिंदी / और English /en/) का हीरो, खोज-बॉक्स, "6 कदम"
   क्या करता है (हर बार वही नतीजा; दोबारा चलाने पर कुछ नहीं बदलता):
   1) <main>…</main> का पूरा हिस्सा generator/data/home_strings.js के पाठ से बनाता है।
   2) <title>, meta description, og:title (हिंदी में og:description भी) वहीं के पाठ से।
   3) /assets/home.css और /assets/home-search.js की कड़ी जोड़ता है। हर कड़ी में फ़ाइल की छाप (?v=…) रहती है,
      ताकि फ़ाइल बदले तो फ़ोन पुरानी प्रति न दिखाए (ये असेट cache-first हैं)।
   बाक़ी <head> (hreflang, schema, canonical) और header/footer को यह नहीं छूता।
   v1.1 (Founder, 12-Nov): (क) हर कदम के ऊपर उसका रेखा-चित्र (नीचे ART : हल्का SVG, कोई फ़ोटो नहीं; चित्र के नीचे
   पाठ हमेशा रहता है)। (ख) SEO-शब्द पहरा: home_strings.js की seoWords सूची का हर शब्द पेज में होना ज़रूरी है;
   एक भी शब्द छूटे तो यह generator रुक जाता है (पेज बनता ही नहीं)।
   ध्यान: 43 भाषा-होम अभी पुराने रूप में हैं; वे generator/data/mirror_home_src_v1.html से बनते हैं
   (build_mirror_homes.js)। उनका नया रूप अगले दौर में, home_strings.js में अनुवाद जुड़ने पर।
   v1.2 (12-Nov): शीर्षक-क्रम (heading order)। होम पर h1 और h2 के बाद सीधे footer का h5 आता था : बीच के स्तर छूटते
   थे, इसलिए PageSpeed का Accessibility 98 पर रुका था। footer के h5 को aria-level="3" दिया (tag और शैली वही),
   ताकि क्रम 1 → 2 → 3 → 4 बने। यह सिर्फ़ इन दो होम-पेजों पर है; साझा साँचा (बाक़ी सब पेज) नहीं छुआ।
   v1.3 (12-Nov): भाषा-होम भी नए रूप में। जिन भाषाओं का पाठ data/home_strings_mirror.js में है, उनका होम
   build_mirror_homes.js बनाते समय यहीं के transformMirror से गुज़रता है (वही <main>, वही खोज, वही 6 कदम)।
   उन पेजों में चारों दरवाज़े और सुनहरी पट्टी का पाठ पुराने भाषा-होम से ही लिया जाता है (दोबारा अनुवाद नहीं);
   विवरण = नया वाक्य + "Applied Computer School (ACS)." (छोटा, ताकि खोज-नतीजे में कटे नहीं)। पुराने विवरण के शब्द
   ("130 भाषाएँ", "गाँव से ग्लोबल साउथ तक") पेज की ऊपर की पट्टी, नीचे के हिस्से और og:description में बने रहते हैं।
   क्रम: build_sitemap.js → build_search_index.js → build_home.js → build_mirror_homes.js → build_sitemap.js।
   चलाना: node generator/build_home.js [--check]
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, ".."), S = require("./data/home_strings.js");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ver = rel => crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, rel)).toString("latin1").replace(/\r\n/g, "\n"), "latin1").digest("hex").slice(0, 8);
/* छह कदमों के रेखा-चित्र (भाषा से स्वतंत्र)। रंग ACS के ही: गहरा नीला रेखा, सुनहरा और हरा उभार। */
const SV = (inner) => '<svg viewBox="0 0 120 90" aria-hidden="true" focusable="false" fill="none" stroke="#0B1F3A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
const ART = [
  /* 1 दिशा-सूचक (रुचि) */ SV('<circle cx="60" cy="45" r="32"/><path d="M60 13v7M60 70v7M28 45h7M85 45h7"/><path d="M60 24l9 21H51z" fill="#F9A825" stroke="#F9A825"/><path d="M60 66l9-21H51z"/><circle cx="60" cy="45" r="3" fill="#0B1F3A"/>'),
  /* 2 औज़ार (हुनर) */ SV('<circle cx="44" cy="46" r="15"/><circle cx="44" cy="46" r="5" fill="#F9A825" stroke="#F9A825"/><path d="M44 24v7M44 61v7M22 46h7M59 46h7M28.5 30.5l5 5M54.5 56.5l5 5M28.5 61.5l5-5M54.5 35.5l5-5"/><path d="M72 68l24-24" stroke="#2E7D32" stroke-width="6"/><path d="M92 30a9 9 0 1 0 12 12l-7-1-4-4z" stroke="#2E7D32"/>'),
  /* 3 बोल-गुब्बारे (भाषा) */ SV('<path d="M14 14h50a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H36l-12 10V50h-10a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><path d="M62 38h44a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-6v9l-11-9H62a6 6 0 0 1-6-6V56" stroke="#2E7D32"/><text x="39" y="42" text-anchor="middle" font-size="26" font-weight="800" fill="#0B1F3A" stroke="none">अ</text><text x="86" y="63" text-anchor="middle" font-size="22" font-weight="800" fill="#2E7D32" stroke="none">A</text>'),
  /* 4 प्रमाणपत्र */ SV('<rect x="20" y="12" width="80" height="54" rx="6"/><path d="M34 28h52M34 40h36M34 52h22"/><circle cx="84" cy="58" r="11" fill="#F9A825" stroke="#F9A825"/><path d="M78 67l-4 15 10-6 10 6-4-15" stroke="#F9A825"/><path d="M79 58l4 4 7-8" stroke="#0B1F3A"/>'),
  /* 5 जाल और काम का थैला (नेटवर्क) */ SV('<path d="M22 24L60 12 98 24M22 24l14 40M98 24L84 64" stroke="#2E7D32" stroke-dasharray="2 7"/><circle cx="22" cy="24" r="9"/><circle cx="60" cy="12" r="9" fill="#F9A825" stroke="#F9A825"/><circle cx="98" cy="24" r="9"/><rect x="36" y="48" width="48" height="32" rx="5"/><path d="M50 48v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6M36 62h48"/>'),
  /* 6 भोंपू (कहानी सुनाओ) */ SV('<path d="M24 36l42-18v54L24 54z"/><path d="M24 36h-6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h6M32 57l4 18h10l-4-15"/><path d="M78 34q8 11 0 22M88 26q14 19 0 38" stroke="#F9A825"/><path d="M102 20l2 5 5 1-4 3 1 5-4-3-5 3 2-5-4-3 5-1z" fill="#2E7D32" stroke="#2E7D32" stroke-width="1.5"/>')
];
/* कदम-3 के चित्र का अक्षर: देवनागरी वाले पेजों (और पहले से live English होम) पर "अ" और "A";
   बाक़ी भाषा-होम पर देवनागरी नहीं आनी चाहिए, इसलिए वहाँ "A" और "Z"। */
const DEVA_PAGES = { hi: 1, en: 1, mr: 1, ne: 1 };
function art(i, code) { return (i === 2 && !DEVA_PAGES[code]) ? ART[2].replace(">A</text>", ">Z</text>").replace(">अ</text>", ">A</text>") : ART[i]; }
function main(T, code) {
  const wa = "https://wa.me/?text=" + encodeURIComponent(T.share);
  return '<main>\n<section class="hero">\n  <div class="hero-in">\n' +
    '    <span class="pill">' + esc(T.pill) + '</span>\n' +
    '    <h1 class="title">' + esc(T.h1a) + '<br><span class="g">' + esc(T.h1b) + '</span></h1>\n\n' +
    '    <div class="khoj" role="search">\n' +
    '      <form id="khojForm" action="' + T.allUrl + '" autocomplete="off" data-lang="' + code + '" data-career="' + T.testUrl + '" data-idx="/assets/search_index.json?v=' + ver("assets/search_index.json") + '">\n' +
    '        <input id="khojIn" type="search" name="q" inputmode="search" enterkeyhint="search" aria-label="' + esc(T.sAria) + '" placeholder="' + esc(T.sPh) + '">\n' +
    '        <button type="submit">' + esc(T.sBtn) + '</button>\n      </form>\n' +
    '      <p class="jaise">' + esc(T.sEg) + '</p>\n' +
    '      <div class="khoj-res" id="khojRes" aria-live="polite" data-b="' + esc(T.kind.b) + '" data-h="' + esc(T.kind.h) + '" data-u="' + esc(T.kind.u) + '" data-k="' + esc(T.kind.k) +
      '" data-none="' + esc(T.none) + '" data-fail="' + esc(T.fail) + '" data-all-url="' + T.allUrl + '" data-all-label="' + esc(T.allLabel) + '" data-test-url="' + T.testUrl + '" data-test-label="' + esc(T.startA) + '"></div>\n' +
    '    </div>\n' +
    '    <p class="shuru">' + esc(T.startQ) + ' <a href="' + T.testUrl + '">' + esc(T.startA) + '</a></p>\n\n' +
    '    <div class="cta-row">\n' + T.doors.map(d => '      <a class="btn btn-green' + d[1] + '" href="' + d[0] + '">' + esc(d[2]) + '</a>\n').join("") + '    </div>\n\n' +
    '  </div>\n</section>\n\n' +
    '<section class="rasta" aria-labelledby="rastaH">\n  <div class="rasta-in">\n' +
    '    <h2 id="rastaH">' + esc(T.pathH) + '</h2>\n' + (T.pathSub ? '    <p class="sub">' + esc(T.pathSub) + '</p>\n' : '') + '    <ol>\n' +
    T.steps.map((s, i) => '      <li><span class="num">' + (i + 1) + '</span>' + art(i, code) + '<b>' + esc(s[0]) + '</b><p>' + esc(s[1]) + '</p><a href="' + (s[3] === "WA" ? wa : s[3]) + '">' + esc(s[2]) + '</a></li>\n').join("") +
    '    </ol>\n    <p class="sach">' + esc(T.truth) + '</p>\n  </div>\n</section>\n</main>';
}
function once(s, re, rep, what) { const n = (s.match(new RegExp(re.source, re.flags.replace("g", "") + "g")) || []).length; if (n !== 1) throw new Error("build_home: " + what + " ठीक 1 बार चाहिए, मिला " + n); return s.replace(re, () => rep); }
function page(code) {
  const T = S[code], f = path.join(ROOT, T.out); let s = fs.readFileSync(f, "utf8");
  const nl = s.indexOf("\r\n") > -1 ? "\r\n" : "\n"; s = s.replace(/\r\n/g, "\n");
  s = transformT(code, s, T);
  return { f, s: nl === "\n" ? s : s.replace(/\n/g, nl), rel: T.out };
}
/* भाषा-होम: सूची वाली 38 पंक्तियों से वही खाँचा बनाओ जो हिंदी/English का है */
const MS = require("./data/home_strings_mirror.js");
const EMO = ["🧭", "🛠️", "🗣️", "🏆", "🤝", "📣"];
const unesc = t => String(t).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
function mirrorT(code, html) {
  const a = MS[code]; if (!a || a.length !== 38) throw new Error("home_strings_mirror (" + code + "): 38 पंक्तियाँ चाहिए");
  const pill = (html.match(/<span class="pill">([\s\S]*?)<\/span>/) || [])[1];
  const row = (html.match(/<div class="cta-row">([\s\S]*?)<\/div>/) || [, ""])[1];
  const doors = [...row.matchAll(/<a class="btn btn-(?:white|green)( stack)?" href="([^"]+)">([\s\S]*?)<\/a>/g)].map(m => [m[2], m[1] || "", unesc(m[3])]);
  if (!pill || doors.length !== 4) throw new Error("build_home (" + code + "): भाषा-होम में पट्टी या चार दरवाज़े नहीं मिले");
  const test = doors[0][0], hrefs = [test, "/hunar.html", "/bhasha.html", "/career-kit.html", "/hi/network.html", "WA"];
  if (!fs.existsSync(path.join(ROOT, test.replace(/^\//, "")))) throw new Error("build_home (" + code + "): करियर-पेज नहीं मिला: " + test);
  return { title: a[0], desc: a[1] + " Applied Computer School (ACS).", ogdesc: null, pill: unesc(pill), h1a: a[2], h1b: a[3], sAria: a[4], sPh: a[5], sBtn: "🔍 " + a[6], sEg: a[7],
    kind: { b: a[8], h: a[9], u: a[10], k: a[11] }, none: a[12], fail: a[13], allLabel: a[14], allUrl: "/courses/hi/", startQ: a[15], startA: a[16], testUrl: test, doors,
    pathH: a[17], pathSub: "", steps: [0, 1, 2, 3, 4, 5].map(i => [EMO[i] + " " + a[18 + i * 3], a[19 + i * 3], a[20 + i * 3], hrefs[i]]),
    share: a[36] + ": https://acslearn.com/" + code + "/", truth: a[37], seoWords: ["ACS"] };
}
function transformT(code, s, T) {
  let mainHtml = main(T, code);
  if (/<html[^>]* dir="rtl"/.test(s)) {   /* दाएँ-से-बाएँ वाली भाषा: Latin टुकड़े (ACS, DCA, welding…) अपनी दिशा में रहें */
    mainHtml = mainHtml.replace(/>([^<]+)</g, (m, t) => ">" + t.replace(/[A-Za-z][A-Za-z0-9 ,.\-]*[A-Za-z0-9]/g, x => '<bdi dir="ltr">' + x + "</bdi>") + "<");
  }
  s = once(s, /<main>[\s\S]*?<\/main>/, mainHtml, "<main>");
  s = once(s, /<title>[\s\S]*?<\/title>/, "<title>" + esc(T.title) + "</title>", "<title>");
  s = once(s, /<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + esc(T.desc) + '" />', "description");
  s = once(s, /<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="' + esc(T.title) + '" />', "og:title");
  if (T.ogdesc) s = once(s, /<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="' + esc(T.ogdesc) + '" />', "og:description");
  const CSS = '<link rel="stylesheet" href="/assets/home.css?v=' + ver("assets/home.css") + '"><!-- build_home -->';
  const JS = '<script src="/assets/home-search.js?v=' + ver("assets/home-search.js") + '" defer></script><!-- build_home -->';
  s = s.replace(/\n<link rel="stylesheet" href="\/assets\/home\.css[^\n]*<!-- build_home -->/, "").replace(/\n<script src="\/assets\/home-search\.js[^\n]*<!-- build_home -->/, "");
  s = once(s, /<link rel="stylesheet" href="\/acs-style\.css">/, '<link rel="stylesheet" href="/acs-style.css">\n' + CSS, "acs-style.css कड़ी");
  s = once(s, /<script src="\/assets\/acs-universal\.js"><\/script>/, '<script src="/assets/acs-universal.js"></script>\n' + JS, "acs-universal.js कड़ी");
  s = once(s, /<h5 id="acsFootName"(?: aria-level="\d")?>/, '<h5 id="acsFootName" aria-level="3">', "footer का h5");
  { /* शीर्षक-क्रम पहरा: नीचे की ओर कोई स्तर न छूटे */
    const lv = [...s.matchAll(/<h([1-6])\b([^>]*)>/g)].map(m => { const a = m[2].match(/aria-level="(\d)"/); return a ? +a[1] : +m[1]; });
    if (lv[0] !== 1) throw new Error("build_home (" + code + "): पहला शीर्षक h1 नहीं");
    for (let i = 1; i < lv.length; i++) if (lv[i] > lv[i - 1] + 1) throw new Error("build_home (" + code + "): शीर्षक-क्रम में स्तर छूटा: " + lv.join(" → "));
  }
  if (/—/.test(main(T, code)) && code === "hi") throw new Error("build_home: हिंदी होम में लंबी रेखा");
  if (T.steps.length !== ART.length) throw new Error("build_home: कदम " + T.steps.length + " पर चित्र " + ART.length);
  /* SEO-शब्द पहरा: सूची का हर शब्द पेज के पाठ (title + description + दिखने वाला पाठ) में होना चाहिए */
  const hay = (s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ") + " " + T.title + " " + T.desc).toLowerCase().replace(/\s+/g, " ");
  const lost = (T.seoWords || []).filter(w => hay.indexOf(String(w).toLowerCase()) < 0);
  if (lost.length) throw new Error("build_home (" + code + "): SEO-शब्द पेज से ग़ायब: " + lost.join(" · "));
  return s;
}
function run(opt) {
  opt = opt || {}; const pend = [];
  for (const code of Object.keys(S)) { const p = page(code); if (fs.readFileSync(p.f, "utf8") !== p.s) { pend.push(p.rel); if (!opt.check) fs.writeFileSync(p.f, p.s, "utf8"); } }
  return pend;
}
module.exports = { run, hasMirror: c => !!MS[c], transformMirror: (code, s) => transformT(code, s, mirrorT(code, s)) };
if (require.main === module) {
  const chk = process.argv.includes("--check"), pend = run({ check: chk });
  if (chk) { if (pend.length) { console.log("❌ होम बासी है: " + pend.join(", ") + " : चलाएँ node generator/build_home.js"); process.exit(1); } console.log("🏁 होम-पेज generator से मेल खाते हैं"); }
  else console.log("🏁 build_home v1.3 : " + Object.keys(S).length + " होम (" + (pend.length ? "बदले: " + pend.join(", ") : "कोई बदलाव नहीं") + ")");
}
