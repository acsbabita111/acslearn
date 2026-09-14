/* build_lipi_pages.js v1.0 · 14-Sep-2026 — लिपि-परिचय workbook (script primer) generator · परत-4
   पाठक: 18+ वयस्क, 5वीं तक हिंदी, किसी भाषा की लिपि से पहली बार परिचय — KKB बोलने-कोर्स से पहले का कदम।
   स्रोत: (1) root _TEMPLATE.html (universal navbar/menu/footer/मूल-भाषा) — कोई पन्ना हाथ से नहीं
          (2) generator/data/lipi/<script>_base.js — लिपि का आधार (अक्षर, देवनागरी नाम/आवाज़, लिखने का तरीका, उलझन-जोड़ी, अंक)
          (3) generator/data/lipi/glyphs_<script>.json — Noto (SIL-OFL) से निकाले glyph-outline → tracing (बिंदुदार) SVG, चार-रेखा कॉपी
          (4) assets/kkb2_<code>_data.js + kkb_<code>_data.js — उदाहरण-शब्द उसी भाषा के असली कोर्स से (tw शब्दकोश), न मिले तो base-fallback
   निकास: /courses/hi/bhasha/<slug>/lipi/index.html (web) — 🖨️ बटन = browser-print → A4 PDF (print-CSS; repo पर कोई PDF नहीं — 130 भाषा × PDF का वज़न शून्य)
   नियम: कक्षा-6 भाषा · ≥16px · गोल-bracket · मूल भाषा: हिंदी · मूल→अंग्रेज़ी→बाक़ी (data भाषा-वार) · SVG रेखा-चित्र (AI-फ़ोटो कभी नहीं) · check-robot fail = पेज नहीं बनता
   नई भाषा जोड़ना = LIPI_LANGS में एक पंक्ति (+ उस लिपि का base/glyph, अगर नई लिपि हो)। */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");
const VER = "1.0";

/* ---- 10-menu links.js से (एकमात्र घर) — build_specials का ही नुस्ख़ा ---- */
function loadMenu() {
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m => '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>").join("\n");
const MENU_FALLBACK_JS = '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};}</scr' + 'ipt>';
const GEN_NOTE = "<!-- ⚠️ generator से बना (build_lipi_pages.js v" + VER + ") — हाथ से न बदलें। स्रोत: _TEMPLATE.html + generator/data/lipi/* + assets/kkb*_data.js -->";

/* ---- भाषा-सूची (नई भाषा = एक पंक्ति) ----
   code = KKB कोड · slug = /courses/hi/bhasha/<slug>/ · script = base/glyph फ़ाइल · extra = भाषा-विशेष अतिरिक्त अक्षर [glyph, देवनागरी-नाम, आवाज़, नोट]
   pj = courses_data कोड (कड़ी-जोड़ हेतु) */
const LIPI_LANGS = [
  { code: "en", slug: "english", hi: "अंग्रेज़ी", en: "English", script: "latin", pj: "PJ018", tts: "en-IN", extra: [] }
];

/* ---- भाषा का असली कोर्स-शब्दकोश (tw) पढ़ो → अक्षर-वार उदाहरण ---- */
function loadKKB(code) {
  const box = {}; const words = [];
  for (const f of [code === "en" ? "kkb2_data.js" : "kkb2_" + code + "_data.js", code === "en" ? "kkb_data.js" : "kkb_" + code + "_data.js"]) {
    const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) continue;
    const w = {}; try { new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {}); } catch (e) { continue; }
    const D = w.KKB2_DATA || w.KKB_DATA; if (!D || !D.weeks) continue;
    D.weeks.forEach(wk => (wk.days || []).forEach(d => (d.tw || []).forEach(t => { if (t[0] && t[1] && t[2]) words.push([String(t[0]).trim(), String(t[1]).trim(), String(t[2]).trim()]); })));
  }
  return words;
}
function pickWords(letter, words, fallback) {
  /* पहले base के चुने-हुए आसान शब्द (शुरुआती के लिए छोटे), फिर कोर्स-शब्दकोश के छोटे-से-छोटे शब्द — कुल 2 */
  const seen = new Set(); const out = [];
  for (const f of (fallback || [])) { if (!seen.has(f[0].toLowerCase())) { seen.add(f[0].toLowerCase()); out.push(f); } }
  words = words.slice().sort((a, b) => a[0].length - b[0].length);
  for (const w of words) {
    const first = w[0].charAt(0);
    if (first.toLowerCase() === letter.toLowerCase() && /^[\p{L}][\p{L}'-]*$/u.test(w[0]) && w[0].length <= 12 && !seen.has(w[0].toLowerCase())) { seen.add(w[0].toLowerCase()); out.push(w); if (out.length === 2) break; }
  }
  return out.slice(0, 2);
}

/* ---- glyph → SVG (चार-रेखा कॉपी में) ---- */
function glyphSVG(G, ch, mode, size) {
  /* mode: solid (उदाहरण) · dotted (tracing) · faint (हल्का नक़ल-नमूना) · लौटाता है एक SVG; चार रेखाएँ हमेशा */
  const g = G.glyphs[ch]; if (!g) return "";
  const upm = G.upm, asc = G.asc, desc = G.desc, xh = G.xHeight, cap = G.capHeight;
  const H = asc - desc; const w = Math.max(g.w, 400);
  const scale = size / H; const W = Math.round((w + 200) * scale), Hh = Math.round(H * scale);
  const y = v => (asc - v) * scale; /* font-y (ऊपर +) → svg-y */
  const lines = [[y(cap), "l-top"], [y(xh), "l-mid"], [y(0), "l-base"], [y(desc), "l-bot"]];
  const guides = lines.map(l => '<line x1="0" x2="' + W + '" y1="' + l[0].toFixed(1) + '" y2="' + l[0].toFixed(1) + '" class="' + l[1] + '"/>').join("");
  const tr = "translate(" + (100 * scale).toFixed(1) + "," + (asc * scale).toFixed(1) + ") scale(" + scale.toFixed(4) + ",-" + scale.toFixed(4) + ")";
  const cls = mode === "dotted" ? "g-dot" : (mode === "faint" ? "g-faint" : "g-solid");
  return '<svg class="lipi-g ' + cls + '" viewBox="0 0 ' + W + " " + Hh + '" width="' + W + '" height="' + Hh + '" aria-hidden="true">' + guides + '<path d="' + g.d + '" transform="' + tr + '" vector-effect="non-scaling-stroke"/></svg>';
}
function traceRow(G, ch, n, size) { /* पहला solid-हल्का नमूना + n बिंदुदार + ख़ाली कॉपी */
  let s = glyphSVG(G, ch, "faint", size);
  for (let i = 0; i < n; i++) s += glyphSVG(G, ch, "dotted", size);
  return '<div class="lipi-trace">' + s + '<div class="lipi-blank" style="height:' + size + 'px"></div></div>';
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---- page content ---- */
function buildContent(L, B, G, words) {
  const letters = B.letters.map(x => Object.assign({}, x, { shabd: pickWords(x.u, words, x.shabd) }));
  const extra = (L.extra || []).map(e => ({ u: e[0], l: e[0], naam: e[1], aawaz: e[2], likho: e[3] || "", dhyan: "", shabd: pickWords(e[0], words, []), isExtra: true }));
  const all = letters.concat(extra);
  let h = "";
  h += '<article class="lipi-wrap">';
  h += '<header class="lipi-head"><p class="lipi-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="/courses/hi/bhasha/' + L.slug + '/">' + L.hi + ' बोलने का कोर्स</a> › लिपि-परिचय</p>';
  h += '<h1>' + L.hi + ' की लिपि पहली बार — अक्षर, आवाज़, लिखना (' + L.en + ' Alphabet Workbook)</h1>';
  h += '<p class="lipi-lead">पहली बार ' + L.hi + ' के अक्षर देख रहे हो? बस तीन काम: अक्षर देखो → 🔊 नाम सुनो → बिंदुओं पर कलम फेरो। रोज़ 2 अक्षर। 15 दिन में पूरी वर्णमाला। फिर <a href="/courses/hi/bhasha/' + L.slug + '/workbook/">लिखो-workbook</a> (वाक्य लिखने की किताब)।</p>';
  h += '<div class="lipi-actions"><button type="button" class="lipi-btn" onclick="window.print()">🖨️ छापें / PDF बनाएँ</button><a class="lipi-btn lipi-btn2" href="/courses/hi/bhasha/' + L.slug + '/">🗣️ आगे: बोलने का कोर्स</a></div>';
  h += '<p class="lipi-note">मूल भाषा: हिंदी · अक्षरों का रूप Noto Sans (खुला फ़ॉन्ट, SIL लाइसेंस) से · छपाई A4 · लिखने का अभ्यास काग़ज़ पर ही सबसे अच्छा होता है।</p></header>';

  /* 1. परिचय */
  h += '<section class="lipi-sec"><h2>1. यह लिपि क्या है</h2>' + B.parichay.map(p => "<p>" + esc(p) + "</p>").join("") + '</section>';

  /* 2. चार रेखाएँ */
  h += '<section class="lipi-sec"><h2>2. चार रेखाओं की कॉपी — अक्षर कहाँ बैठते हैं</h2><p>हिंदी की कॉपी में एक रेखा होती है (शिरोरेखा)। यहाँ चार रेखाएँ हैं: ' + B.copy_rekha.map((r, i) => (i + 1) + ". " + esc(r)).join(" · ") + '। बड़े अक्षर ऊपर की रेखा से आधार-रेखा तक; छोटे अक्षर ज़्यादातर बीच की रेखा से आधार-रेखा तक।</p>';
  h += '<div class="lipi-row">' + glyphSVG(G, "b", "solid", 110) + glyphSVG(G, "a", "solid", 110) + glyphSVG(G, "g", "solid", 110) + '</div>';
  h += '<p><b>छोटे अक्षरों के तीन कद:</b> बीच तक — ' + esc(B.aakar.beech) + ' · ऊपर तक — ' + esc(B.aakar.upar) + ' · नीचे पूँछ — ' + esc(B.aakar.niche) + '</p></section>';

  /* 3. पूरी वर्णमाला एक नज़र */
  h += '<section class="lipi-sec"><h2>3. पूरी वर्णमाला एक नज़र में (' + all.length + ' अक्षर)</h2><p>हर डिब्बे पर 🔊 दबाओ — नाम सुनो, साथ बोलो। स्वर (लाल): ' + B.swar.join(" ") + '।</p><div class="lipi-grid">';
  all.forEach(x => { h += '<button type="button" class="lipi-cell' + (B.swar.indexOf(x.u) >= 0 ? " swar" : "") + '" onclick="lipiSay(this)" data-say="' + esc(x.u) + '"><span class="big">' + esc(x.u) + (x.l !== x.u ? ' ' + esc(x.l) : '') + '</span><span class="nm">' + esc(x.naam) + '</span><span class="aw">' + esc(x.aawaz) + '</span></button>'; });
  h += '</div></section>';

  /* 4. हर अक्षर — कार्ड + tracing */
  h += '<section class="lipi-sec"><h2>4. एक-एक अक्षर — देखो, सुनो, लिखो</h2><p>हर अक्षर के लिए: बड़ा रूप, छोटा रूप, नाम, आवाज़, दो असली शब्द (इसी भाषा के बोलने-कोर्स से), और लिखने का तरीका। बिंदुओं पर कलम फेरो, फिर ख़ाली जगह में ख़ुद लिखो।</p>';
  all.forEach((x, i) => {
    h += '<div class="lipi-card" id="l-' + esc(x.u) + '"><div class="lipi-card-top"><div class="lipi-show">' + glyphSVG(G, x.u, "solid", 120) + (x.l !== x.u ? glyphSVG(G, x.l, "solid", 120) : "") + '</div>';
    h += '<div class="lipi-info"><div class="lipi-n">' + (i + 1) + '. <b>' + esc(x.u) + '</b>' + (x.l !== x.u ? ' <b>' + esc(x.l) + '</b>' : '') + ' — नाम: <b>' + esc(x.naam) + '</b> · आवाज़: <b>' + esc(x.aawaz) + '</b> <button type="button" class="lipi-sp" onclick="lipiSay(this)" data-say="' + esc(x.u) + '">🔊</button></div>';
    if (x.aawaz_udaharan) h += '<p class="lipi-p lipi-small">जैसे: ' + esc(x.aawaz_udaharan) + '</p>';
    h += '<p class="lipi-p"><b>लिखो:</b> ' + esc(x.likho) + '</p>';
    if (x.dhyan) h += '<p class="lipi-p lipi-dhyan">⚠️ ध्यान: ' + esc(x.dhyan) + '</p>';
    if (x.shabd.length) h += '<div class="lipi-words">' + x.shabd.map(w => '<button type="button" class="lipi-word" onclick="lipiSay(this)" data-say="' + esc(w[0]) + '"><span class="w">' + esc(w[0]) + '</span><span class="d">' + esc(w[1]) + '</span><span class="m">' + esc(w[2]) + '</span></button>').join("") + '</div>';
    h += '</div></div>';
    h += '<p class="lipi-tl">बड़ा ' + esc(x.u) + ' — बिंदुओं पर कलम फेरो, फिर ख़ुद लिखो</p>' + traceRow(G, x.u, 5, 100);
    if (x.l !== x.u) h += '<p class="lipi-tl">छोटा ' + esc(x.l) + '</p>' + traceRow(G, x.l, 5, 100);
    h += '</div>';
  });
  h += '</section>';

  /* 5. अंक */
  if (B.ank) {
    h += '<section class="lipi-sec"><h2>5. अंक 0–9 — पहले दिन से चाहिए (दाम, मोबाइल, बस)</h2><div class="lipi-grid">' + B.ank.map(a => '<button type="button" class="lipi-cell" onclick="lipiSay(this)" data-say="' + esc(a[0]) + '"><span class="big">' + esc(a[0]) + '</span><span class="nm">' + esc(a[1]) + '</span><span class="aw">' + esc(a[2]) + '</span></button>').join("") + '</div>';
    h += '<div class="lipi-row lipi-anktrace">' + B.ank.map(a => traceRow(G, a[0], 3, 70)).join("") + '</div></section>';
  }

  /* 6. उलझन-जोड़ियाँ */
  h += '<section class="lipi-sec"><h2>6. जो अक्षर आपस में उलझते हैं — जोड़ी में देखो</h2><p>इन्हें साथ-साथ लिखो, फ़र्क़ आँख में बैठ जाएगा।</p><div class="lipi-pairs">' + B.uljhan.map(p => '<div class="lipi-pair">' + (G.glyphs[p[0]] ? glyphSVG(G, p[0], "solid", 90) : '<span class="big">' + esc(p[0]) + '</span>') + '<span class="vs">बनाम</span>' + (G.glyphs[p[1]] ? glyphSVG(G, p[1], "solid", 90) : '<span class="big">' + esc(p[1]) + '</span>') + '</div>').join("") + '</div></section>';

  /* 7. अभ्यास */
  const shuffled = letters.map(x => x.u).sort(() => 0.5 - Math.random()).slice(0, 12);
  h += '<section class="lipi-sec"><h2>7. अभ्यास (काग़ज़ पर या मन में)</h2>';
  h += '<h3>क) बड़े अक्षर का छोटा रूप लिखो</h3><div class="lipi-ex">' + shuffled.map(u => '<span class="lipi-exi">' + esc(u) + ' → <span class="lipi-box"></span></span>').join("") + '</div>';
  h += '<h3>ख) पहली आवाज़ पहचानो — यह शब्द किस अक्षर से शुरू होता है?</h3><div class="lipi-ex">' + letters.filter(x => x.shabd.length).slice(0, 12).map(x => '<span class="lipi-exi">' + esc(x.shabd[0][0]) + ' (' + esc(x.shabd[0][2]) + ') → <span class="lipi-box"></span></span>').join("") + '</div>';
  h += '<h3>ग) यह शब्द पढ़ो — अक्षर-अक्षर, फिर पूरा</h3><div class="lipi-ex">' + letters.filter(x => x.shabd.length > 1).slice(0, 10).map(x => '<span class="lipi-exi"><b>' + esc(x.shabd[1][0]) + '</b> = ' + x.shabd[1][0].split("").map(c => esc(c)).join(" · ") + ' → ' + esc(x.shabd[1][1]) + ' (' + esc(x.shabd[1][2]) + ')</span>').join("") + '</div>';
  h += '<h3>घ) अपना नाम और गाँव इस लिपि में लिखो</h3><p>पहले हिंदी में बोलो, फिर हर आवाज़ का अक्षर चुनो। जैसे: राम = R-a-m, सीता = S-i-t-a, खगड़िया = K-h-a-g-a-r-i-a। नीचे 3 बार लिखो।</p><div class="lipi-blank" style="height:84px"></div><div class="lipi-blank" style="height:84px"></div><div class="lipi-blank" style="height:84px"></div>';
  h += '<h3>ङ) 15 दिन की योजना</h3><p>दिन 1–13: रोज़ 2 अक्षर (देखो → सुनो → 5 बार लिखो → 2 शब्द बोलो)। दिन 14: अंक 0–9 + उलझन-जोड़ियाँ। दिन 15: पूरी वर्णमाला बिना देखे लिखो। फिर सीधे <a href="/courses/hi/bhasha/' + L.slug + '/">' + L.hi + ' बोलने का कोर्स</a> — दिन 1 से।</p>';
  h += '<p class="lipi-note">यह workbook मुफ़्त है; प्रमाणपत्र इसका नहीं — प्रमाणपत्र बोलने-कोर्स की परीक्षा से मिलता है। सामग्री NIPUN-भारत के "अक्षर = चिह्न + नाम + आवाज़" सिद्धांत पर आधारित/प्रेरित है — यह NCERT/सरकारी पाठ्यक्रम नहीं है।</p></section>';
  h += '</article>';
  return { html: h, count: all.length };
}

/* ---- check-robot (जन्म से) ---- */
function visibleText(html) { return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function check(name, content, B, count) {
  const holes = []; const vis = visibleText(content);
  if (/[\[\]]/.test(vis)) holes.push("square bracket");
  (content.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => { const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) holes.push("font " + n + "px"); });
  if (count < B.letters.length) holes.push("अक्षर-गिनती " + count + " < " + B.letters.length);
  if (!/मूल भाषा: हिंदी/.test(content)) holes.push("मूल-भाषा निशान नहीं");
  const dots = (content.match(/class="lipi-g g-dot"/g) || []).length; if (dots < B.letters.length * 5) holes.push("tracing-SVG कम: " + dots);
  B.letters.forEach(x => { if (!x.naam || !x.aawaz || !x.likho) holes.push("अक्षर " + x.u + " data अधूरा"); });
  if (holes.length) throw new Error("❌ " + name + " check-robot fail: " + holes.join(" · "));
}

/* ---- build ---- */
function build(L) {
  const B = require(path.join(__dirname, "data", "lipi", L.script + "_base.js"));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "lipi", "glyphs_" + L.script + ".json"), "utf8"));
  const words = loadKKB(L.code);
  const out = "courses/hi/bhasha/" + L.slug + "/lipi/index.html";
  const { html, count } = buildContent(L, B, G, words);
  check(out, html, B, count);
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E); if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page = TPL.slice(0, a + S.length) + "\n" + html + "\n" + TPL.slice(b);
  const title = L.hi + " की वर्णमाला पहली बार — अक्षर, आवाज़, लिखने का अभ्यास (" + L.en + " Alphabet Workbook, मुफ़्त, छपने-योग्य) | अप्लाइड कंप्यूटर स्कूल";
  const desc = "5वीं तक हिंदी पढ़े वयस्क के लिए " + L.hi + " की लिपि का पहला परिचय — " + count + " अक्षर, देवनागरी में नाम और आवाज़, बिंदुदार लिखाई-अभ्यास, अंक, उलझन-जोड़ियाँ, 15-दिन योजना। मुफ़्त, A4 पर छापने योग्य।";
  const url = "https://acslearn.com/courses/hi/bhasha/" + L.slug + "/lipi/";
  const ld = JSON.stringify([{ "@context": "https://schema.org", "@type": "LearningResource", "name": L.hi + " वर्णमाला workbook (" + L.en + " Alphabet Workbook)", "description": desc, "inLanguage": "hi", "learningResourceType": "Workbook", "educationalLevel": "Beginner", "isAccessibleForFree": true, "url": url, "provider": { "@type": "Organization", "name": "Applied Computer School", "url": "https://acslearn.com/" }, "isPartOf": { "@type": "Course", "name": "ACS Certificate in Spoken " + L.en, "url": "https://acslearn.com/courses/hi/bhasha/" + L.slug + "/" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" }, { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" }, { "@type": "ListItem", "position": 3, "name": L.hi + " बोलने का कोर्स", "item": "https://acslearn.com/courses/hi/bhasha/" + L.slug + "/" }, { "@type": "ListItem", "position": 4, "name": "लिपि-परिचय", "item": url }] }]);
  page = page.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(title) + "</title>\n<meta name=\"description\" content=\"" + esc(desc) + "\">\n<meta name=\"robots\" content=\"index, follow\">\n<link rel=\"canonical\" href=\"" + url + "\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:url\" content=\"" + url + "\">\n<meta property=\"og:title\" content=\"" + esc(title) + "\">\n<meta property=\"og:description\" content=\"" + esc(desc) + "\">\n<meta property=\"og:image\" content=\"https://acslearn.com/logo.png\">\n<meta property=\"og:locale\" content=\"hi_IN\">\n<script type=\"application/ld+json\">" + ld + "</scr" + "ipt>");
  page = page.replace("</head>", '<link rel="stylesheet" href="/assets/lipi.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + '\n<script>window.LIPI_TTS="' + L.tts + '";</scr' + 'ipt>\n<script src="/assets/lipi.js" defer></scr' + 'ipt>\n</body>');
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  fs.mkdirSync(path.dirname(path.join(ROOT, out)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, out), page, "utf8");
  console.log("✅ लिपि-परिचय → /" + out + " · अक्षर " + count + " · कोर्स-शब्द " + words.length + " में से चुने");
}
const only = process.argv[2];
LIPI_LANGS.filter(l => !only || l.code === only).forEach(build);
console.log("🏁 build_lipi_pages v" + VER + " — " + LIPI_LANGS.length + " भाषा");
