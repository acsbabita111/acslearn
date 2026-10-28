/* build_lipi_pages.js v2.0 · 29-Oct-2026 (v1.0: 14-Sep-2026) — लिपि-परिचय workbook (script primer) generator · परत-4
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
const VER = "2.0";

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
/* v2.0: English की पंक्ति यहीं (रास्ता byte-frozen — नीचे हर जगह L.code==="en" का gate);
   बाक़ी 196 Latin भाषाएँ generator/data/lipi/lipi_langs_latin.js से (परत-3)। नई भाषा = वहाँ एक पंक्ति। */
const EN_ROW = { code: "en", slug: "english", hi: "अंग्रेज़ी", en: "English", script: "latin", pj: "PJ018", tts: "en-IN", extra: [] };
const LATIN_LANGS = require(path.join(__dirname, "data", "lipi", "lipi_langs_latin.js"));
const EXTRA_DICT = require(path.join(__dirname, "data", "lipi", "latin_extra_dict.js"));
const MARKS = LATIN_LANGS.MARKS || {};
const LIPI_LANGS = [EN_ROW].concat(LATIN_LANGS.map(x => Object.assign({ script: "latin" }, x)));


/* ===== v2.0 helpers — non-en भाषाओं का आधार-विस्तार (en रास्ता अछूता) ===== */
function upperOf(G, ch) { const u = ch.toUpperCase(); if (u === ch || u.length !== 1 || !G.glyphs[u]) return null; return u; }
const DEVA_FIRST = /^(?:[\u0905-\u0914\u090D\u0911]|[\u0915-\u0939\u0958-\u095F]\u093C?(?:\u094D[\u0915-\u0939\u0958-\u095F]\u093C?)*)/; /* स्वर अ-औ ऍ ऑ · व्यंजन(+नुक़्ता) · संयुक्त */
function firstSound(dev) { const m = String(dev).trim().match(DEVA_FIRST); return m ? m[0] : ""; }
function deriveAawaz(letter, words) {
  /* इसी कोर्स के tw-शब्दों से: letter से शुरू शब्दों के देवनागरी-उच्चारण की पहली ध्वनि गिनकर top-2 */
  const cnt = {};
  for (const w of words) { if (w[0].charAt(0).toLowerCase() === letter.toLowerCase()) { const s = firstSound(w[1]); if (s) cnt[s] = (cnt[s] || 0) + 1; } }
  const top = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).slice(0, 2);
  return top.join(" / ");
}
function expandLang(L, B, G, words) {
  /* लौटाता है {letters, extras, all, swar, ankRows, ankNote} — en पर हूबहू v1.0 व्यवहार */
  if (L.code === "en") {
    const letters = B.letters;
    return { letters: letters, extras: [], rup: [], swar: B.swar, aakar: B.aakar, ank: B.ank, ankNote: "" };
  }
  const useSet = {}; (L.use || []).forEach(u => useSet[u] = 1);
  const letters = B.letters.filter(x => useSet[x.u]).map(x => {
    const y = Object.assign({}, x);
    const aw = deriveAawaz(x.u, words);
    y.aawaz = aw || "बटन दबाकर सुनो";
    y.aawaz_udaharan = "";       /* अंग्रेज़ी उदाहरण non-en में नहीं — शब्द-कार्ड ख़ुद उदाहरण हैं */
    if (x.u === "E" || x.u === "Q" || x.u === "X") y.dhyan = ""; /* अंग्रेज़ी-विशेष ध्यान-पंक्तियाँ */
    return y;
  });
  const extras = (L.extra || []).map(ch => {
    const up = upperOf(G, ch);
    const d = EXTRA_DICT[ch] || { naam: ch, likho: "" };
    const aw = deriveAawaz(ch, words);
    return { u: up || ch, l: ch, naam: d.naam, aawaz: aw || "बटन दबाकर सुनो", aawaz_udaharan: "", likho: d.likho, dhyan: "", isExtra: true };
  });
  const rup = (L.rup || []).map(r => { const d = EXTRA_DICT[r[0]] || { naam: r[0], likho: "" }; return { l: r[0], u: upperOf(G, r[0]) || r[0], mark: r[1], naam: d.naam, likho: d.likho }; });
  const swar = B.swar.filter(s => useSet[s]);
  const lowers = {}; letters.forEach(x => lowers[x.l] = 1);
  const aakar = { beech: B.aakar.beech.split(" ").filter(c => lowers[c]).join(" "), upar: B.aakar.upar.split(" ").filter(c => lowers[c]).join(" "), niche: B.aakar.niche.split(" ").filter(c => lowers[c]).join(" ") };
  /* अंक: कोर्स-शब्दों से गिनती-शब्द खोजो (हिंदी-अर्थ से) — न मिले तो digit + हिंदी नाम, ईमानदार पंक्ति */
  const NUM = { "शून्य": "0", "ज़ीरो": "0", "एक": "1", "दो": "2", "तीन": "3", "चार": "4", "पाँच": "5", "पांच": "5", "छह": "6", "छः": "6", "सात": "7", "आठ": "8", "नौ": "9" };
  const HINAME = ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ"];
  const found = {};
  for (const w of words) { const d = NUM[String(w[2]).trim()]; if (d && !found[d]) found[d] = w; }
  let miss = 0;
  const ank = "0123456789".split("").map(d => { const w = found[d]; if (w) return [d, String(w[1]).trim(), HINAME[+d]]; miss++; return [d, HINAME[+d], "हिंदी नाम"]; });
  const ankNote = miss ? "जिन अंकों का " + L.hi + " नाम इस कोर्स के वाक्यों में दर्ज नहीं मिला, वहाँ हिंदी नाम ही दिखाया है — अंक का रूप दुनिया-भर में यही है।" : "";
  return { letters: letters, extras: extras, rup: rup, swar: swar, aakar: aakar, ank: ank, ankNote: ankNote };
}
function makeParichay(L, X) {
  const n = X.letters.length + X.extras.length;
  const p = [];
  p.push("यह " + L.hi + " भाषा की लिखाई का पहला परिचय है। " + L.hi + " रोमन (Latin) लिपि में लिखी जाती है — वही लिपि जिससे अंग्रेज़ी लिखी जाती है।");
  if (X.extras.length) p.push("यहाँ " + n + " अक्षर-कार्ड हैं। इनमें " + X.letters.length + " आम रोमन अक्षर हैं और " + X.extras.length + " ख़ास अक्षर हैं, जो अंग्रेज़ी में नहीं होते (जैसे " + X.extras.slice(0, 3).map(e => e.l).join(", ") + ")।");
  else if (X.letters.length < 26) p.push("अंग्रेज़ी के 26 अक्षरों में से " + L.hi + " के अपने शब्दों में " + X.letters.length + " अक्षर काम आते हैं — यहाँ वही दिए हैं।");
  else p.push(L.hi + " में वही 26 अक्षर काम आते हैं जो अंग्रेज़ी में — हर अक्षर के दो रूप: बड़ा (A) और छोटा (a)।");
  if (X.rup.length) p.push("इसके अलावा " + X.rup.length + " रूप ऐसे हैं जिनमें किसी स्वर के ऊपर या नीचे छोटा चिह्न लगता है (जैसे " + X.rup.slice(0, 3).map(r => r.l).join(", ") + ")। ये खंड 4-ख में चिह्न के हिसाब से दिए हैं। किसी भाषा की सरकारी वर्णमाला में कौन-सा रूप अलग अक्षर गिना जाता है, यह भाषा-दर-भाषा अलग होता है।");
  p.push("यह बाएँ से दाएँ लिखी जाती है — हिंदी की तरह ही। पर ऊपर की रेखा (शिरोरेखा) नहीं होती।");
  p.push("अक्षरों के नाम यहाँ भारत में प्रचलित अंग्रेज़ी-ढंग से दिए हैं (ए, बी, सी)। " + L.hi + " बोलने वाले इन्हें अपने ढंग से भी पुकार सकते हैं — असली काम की चीज़ अक्षर की आवाज़ है, जो शब्दों से आती है।");
  p.push("हर अक्षर की आवाज़ नीचे इसी कोर्स के असली " + L.hi + " शब्दों से दिखाई है" + (X.swar.length ? " — स्वर: " + X.swar.join(" ") + "।" : "।"));
  return p;
}

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
  /* v2.0: पहले base-fallback (सिर्फ़ en देता है), फिर कोर्स-शब्द जो letter से शुरू हों;
     non-en में शुरू-शब्द न मिलें तो दूसरा pass — letter *भीतर* रखने वाले शब्द (within-निशान के साथ)। */
  const seen = new Set(); const out = [];
  for (const f of (fallback || [])) { if (!seen.has(f[0].toLowerCase())) { seen.add(f[0].toLowerCase()); out.push(f); } }
  const sorted = words.slice().sort((a, b) => a[0].length - b[0].length);
  const okWord = w => /^[\p{L}][\p{L}\p{M}'ʼʻꞌ -]*$/u.test(w[0]) && w[0].length <= 18 && w[0].split(' ').length <= 3; /* v2.0: वियतनामी जैसी भाषाओं के शब्द कई अक्षर-खंडों (space) में — 3 खंड तक मान्य */
  for (const w of sorted) {
    if (w[0].charAt(0).toLowerCase() === letter.toLowerCase() && okWord(w) && !seen.has(w[0].toLowerCase())) { seen.add(w[0].toLowerCase()); out.push(w); if (out.length >= 2) break; }
  }
  out.nStart = Math.min(out.length, 2); /* letter से शुरू होने वाले कितने (fallback समेत) */
  if (out.length < 2) {
    for (const w of sorted) {
      if (w[0].toLowerCase().indexOf(letter.toLowerCase()) > 0 && okWord(w) && !seen.has(w[0].toLowerCase())) { seen.add(w[0].toLowerCase()); out.push(w); if (out.length >= 2) break; }
    }
  }
  const res = out.slice(0, 2); res.nStart = out.nStart; return res;
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

function regBox(L, where) {
  /* v2.0 ब्रांड-नियम (27-Oct): हर कोर्स-पन्ने पर कई जगह छात्र-रजिस्ट्रेशन की अपील + कड़ी। en पन्ना byte-frozen है, इसलिए सिर्फ़ non-en। */
  if (L.code === "en") return "";
  const t = where === "top" ? "यह लिपि-परिचय मुफ़्त है, और " + L.hi + " बोलने का पूरा कोर्स भी मुफ़्त है।"
    : where === "mid" ? "अक्षर पहचान लिए? अब " + L.hi + " बोलना सीखिए और परीक्षा देकर प्रमाणपत्र लीजिए।"
    : "आपने पूरी वर्णमाला देख ली। अगला कदम है रजिस्ट्रेशन — इससे आपकी पढ़ाई और परीक्षा का हिसाब आपके नाम से रहता है।";
  return '<div class="lipi-reg" style="background:#F5F7FA;color:#0B1F3A;border:2px solid #2E7D32;border-radius:12px;padding:12px 14px;margin:14px 0;font-size:18px;line-height:1.7">📝 <b>' + esc(t) + '</b> रजिस्ट्रेशन मुफ़्त है। <a href="/join.html" style="color:#2E7D32;font-weight:800">मुफ़्त रजिस्ट्रेशन करें →</a></div>';
}
/* ---- page content ---- */
function buildContent(L, B, G, words) {
  /* v2.0: en = हूबहू v1.0 स्रोत (B.letters पूरा + base-shabd fallback); non-en = expandLang से subset+extras, fallback शून्य */
  const X = expandLang(L, B, G, words);
  const letters = X.letters.map(x => Object.assign({}, x, { shabd: pickWords(x.u, words, L.code === "en" ? x.shabd : []) }));
  const extra = X.extras.map(e => Object.assign({}, e, { shabd: pickWords(e.l, words, []) }));
  const all = letters.concat(extra);
  const parichay = L.code === "en" ? B.parichay : makeParichay(L, X);
  const swar = X.swar, aakar = X.aakar, ank = X.ank;
  const rup = (X.rup || []).map(r => Object.assign({}, r, { shabd: pickWords(r.l, words, []) }));
  const rupGroups = []; rup.forEach(r => { let g = rupGroups.find(x => x.mark === r.mark); if (!g) { g = { mark: r.mark, items: [] }; rupGroups.push(g); } g.items.push(r); });
  const daysLetters = Math.ceil(all.length / 2), dayRup = rupGroups.length, dayAnk = daysLetters + dayRup + 1, dayFull = dayAnk + 1;
  let h = "";
  h += '<article class="lipi-wrap">';
  h += '<header class="lipi-head"><p class="lipi-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="/courses/hi/bhasha/' + L.slug + '/">' + L.hi + ' बोलने का कोर्स</a> › लिपि-परिचय</p>';
  h += '<h1>' + L.hi + ' की लिपि पहली बार — अक्षर, आवाज़, लिखना (' + L.en + ' Alphabet Workbook)</h1>';
  h += '<p class="lipi-lead">पहली बार ' + L.hi + ' के अक्षर देख रहे हो? बस तीन काम: अक्षर देखो → 🔊 नाम सुनो → बिंदुओं पर कलम फेरो। रोज़ 2 अक्षर। ' + dayFull + ' दिन में पूरी वर्णमाला। फिर <a href="/courses/hi/bhasha/' + L.slug + '/workbook/">लिखो-workbook</a> (वाक्य लिखने की किताब)।</p>';
  h += '<div class="lipi-actions"><button type="button" class="lipi-btn" onclick="window.print()">🖨️ छापें / PDF बनाएँ</button><a class="lipi-btn lipi-btn2" href="/courses/hi/bhasha/' + L.slug + '/">🗣️ आगे: बोलने का कोर्स</a></div>';
  h += (L.code === "en" ? '<p class="lipi-note">मूल भाषा: हिंदी · अक्षरों का रूप Noto Sans (खुला फ़ॉन्ट, SIL लाइसेंस) से · छपाई A4 · लिखने का अभ्यास काग़ज़ पर ही सबसे अच्छा होता है।</p>'
    : '<p class="lipi-note">मूल भाषा: हिंदी।</p><p class="lipi-note">अक्षरों का रूप Noto Sans नाम के खुले फ़ॉन्ट (SIL लाइसेंस) से लिया गया है।</p><p class="lipi-note">वर्णमाला-स्रोत: ' + esc(L.src || '') + '।</p><p class="lipi-note">यह पन्ना A4 काग़ज़ पर छप सकता है। लिखने का अभ्यास काग़ज़ पर ही सबसे अच्छा होता है।</p>') + '</header>' + regBox(L, "top");

  /* 1. परिचय */
  h += '<section class="lipi-sec"><h2>1. यह लिपि क्या है</h2>' + parichay.map(p => "<p>" + esc(p) + "</p>").join("") + '</section>';

  /* 2. चार रेखाएँ */
  h += '<section class="lipi-sec"><h2>2. चार रेखाओं की कॉपी — अक्षर कहाँ बैठते हैं</h2><p>हिंदी की कॉपी में एक रेखा होती है (शिरोरेखा)। यहाँ चार रेखाएँ हैं: ' + B.copy_rekha.map((r, i) => (i + 1) + ". " + esc(r)).join(" · ") + '। बड़े अक्षर ऊपर की रेखा से आधार-रेखा तक; छोटे अक्षर ज़्यादातर बीच की रेखा से आधार-रेखा तक।</p>';
  const demo = [aakar.upar.split(" ")[0] || "b", aakar.beech.split(" ")[0] || "a", aakar.niche.split(" ")[0] || letters[0].l];
  h += '<div class="lipi-row">' + demo.map(c => glyphSVG(G, c, "solid", 110)).join("") + '</div>';
  h += '<p><b>छोटे अक्षरों के तीन कद:</b>' + (aakar.beech ? ' बीच तक — ' + esc(aakar.beech) : '') + (aakar.upar ? ' · ऊपर तक — ' + esc(aakar.upar) : '') + (aakar.niche ? ' · नीचे पूँछ — ' + esc(aakar.niche) : '') + '</p></section>';

  /* 3. पूरी वर्णमाला एक नज़र */
  h += '<section class="lipi-sec"><h2>3. पूरी वर्णमाला एक नज़र में (' + all.length + ' अक्षर)</h2><p>हर डिब्बे पर 🔊 दबाओ — नाम सुनो, साथ बोलो। स्वर (लाल): ' + (swar.length ? swar.join(" ") : "—") + '।</p><div class="lipi-grid">';
  all.forEach(x => { h += '<button type="button" class="lipi-cell' + (swar.indexOf(x.u) >= 0 ? " swar" : "") + '" onclick="lipiSay(this)" data-say="' + esc(x.u) + '"><span class="big">' + esc(x.u) + (x.l !== x.u ? ' ' + esc(x.l) : '') + '</span><span class="nm">' + esc(x.naam) + '</span><span class="aw">' + esc(x.aawaz) + '</span></button>'; });
  h += '</div>' + (rup.length ? '<p class="lipi-p">चिह्न लगे ' + rup.length + ' रूप नीचे खंड 4-ख में हैं। पहले ऊपर के अक्षर पक्के करो, फिर चिह्न सीखो।</p>' : '') + '</section>';

  /* 4. हर अक्षर — कार्ड + tracing */
  h += '<section class="lipi-sec"><h2>4. एक-एक अक्षर — देखो, सुनो, लिखो</h2><p>हर अक्षर के लिए: बड़ा रूप, छोटा रूप, नाम, आवाज़, दो असली शब्द (इसी भाषा के बोलने-कोर्स से), और लिखने का तरीका। बिंदुओं पर कलम फेरो, फिर ख़ाली जगह में ख़ुद लिखो।</p>';
  all.forEach((x, i) => {
    h += '<div class="lipi-card" id="l-' + esc(x.u) + '"><div class="lipi-card-top"><div class="lipi-show">' + glyphSVG(G, x.u, "solid", 120) + (x.l !== x.u ? glyphSVG(G, x.l, "solid", 120) : "") + '</div>';
    h += '<div class="lipi-info"><div class="lipi-n">' + (i + 1) + '. <b>' + esc(x.u) + '</b>' + (x.l !== x.u ? ' <b>' + esc(x.l) + '</b>' : '') + ' — नाम: <b>' + esc(x.naam) + '</b> · आवाज़: <b>' + esc(x.aawaz) + '</b> <button type="button" class="lipi-sp" onclick="lipiSay(this)" data-say="' + esc(x.u) + '">🔊</button></div>';
    if (x.aawaz_udaharan) h += '<p class="lipi-p lipi-small">जैसे: ' + esc(x.aawaz_udaharan) + '</p>';
    h += '<p class="lipi-p"><b>लिखो:</b> ' + esc(x.likho) + '</p>';
    if (x.dhyan) h += '<p class="lipi-p lipi-dhyan">⚠️ ध्यान: ' + esc(x.dhyan) + '</p>';
    if (x.shabd.length) h += (x.shabd.nStart === 0 ? '<p class="lipi-p lipi-small">इस अक्षर से शुरू होने वाला शब्द कोर्स में कम है — यह अक्षर इन शब्दों के <b>भीतर</b> दिखता है:</p>' : '') + '<div class="lipi-words">' + x.shabd.map(w => '<button type="button" class="lipi-word" onclick="lipiSay(this)" data-say="' + esc(w[0]) + '"><span class="w">' + esc(w[0]) + '</span><span class="d">' + esc(w[1]) + '</span><span class="m">' + esc(w[2]) + '</span></button>').join("") + '</div>';
    else h += '<p class="lipi-p lipi-rare">यह अक्षर ' + esc(L.hi) + ' के रोज़ के शब्दों में कम आता है — इस कोर्स के 2,150 वाक्यों में इससे बना शब्द दर्ज नहीं। पहचान भर काफ़ी है।</p>';
    h += '</div></div>';
    h += '<p class="lipi-tl">बड़ा ' + esc(x.u) + ' — बिंदुओं पर कलम फेरो, फिर ख़ुद लिखो</p>' + traceRow(G, x.u, 5, 100);
    if (x.l !== x.u) h += '<p class="lipi-tl">छोटा ' + esc(x.l) + '</p>' + traceRow(G, x.l, 5, 100);
    h += '</div>';
  });
  h += '</section>';
  if (rup.length) {
    h += '<section class="lipi-sec"><h2>4-ख. चिह्न लगे रूप — एक चिह्न, कई स्वर</h2><p>कुछ स्वरों के ऊपर या नीचे छोटा चिह्न लगता है। यह चिह्न बताता है कि आवाज़ ऊँची, नीची, लंबी या बदली हुई बोलनी है। अक्षर वही रहता है, इसलिए यहाँ एक-एक चिह्न के हिसाब से सीखो — रोज़ एक चिह्न।</p>';
    rupGroups.forEach((g, gi) => {
      h += '<h3>' + (gi + 1) + ') चिह्न: ' + esc(MARKS[g.mark] || "छोटा चिह्न") + ' — ' + g.items.map(r => esc(r.l)).join(" ") + '</h3><div class="lipi-rups">';
      g.items.forEach(r => {
        h += '<div class="lipi-rup" id="r-' + esc(r.l) + '"><div class="lipi-n"><b>' + esc(r.u) + (r.u !== r.l ? ' ' + esc(r.l) : '') + '</b> — ' + esc(r.naam) + ' <button type="button" class="lipi-sp" onclick="lipiSay(this)" data-say="' + esc(r.l) + '">🔊</button></div>';
        if (r.shabd.length) h += '<div class="lipi-words">' + r.shabd.slice(0, 1).map(w => '<button type="button" class="lipi-word" onclick="lipiSay(this)" data-say="' + esc(w[0]) + '"><span class="w">' + esc(w[0]) + '</span><span class="d">' + esc(w[1]) + '</span><span class="m">' + esc(w[2]) + '</span></button>').join("") + '</div>';
        else h += '<p class="lipi-p lipi-rare">यह रूप इस कोर्स के वाक्यों में किसी छोटे शब्द में दर्ज नहीं मिला। पहचान भर काफ़ी है।</p>';
        h += traceRow(G, r.l, 3, 80) + '</div>';
      });
      h += '</div>';
    });
    h += '</section>';
  }
  h += regBox(L, "mid");

  /* 5. अंक */
  if (ank) {
    h += '<section class="lipi-sec"><h2>5. अंक 0–9 — पहले दिन से चाहिए (दाम, मोबाइल, बस)</h2><div class="lipi-grid">' + ank.map(a => '<button type="button" class="lipi-cell" onclick="lipiSay(this)" data-say="' + esc(a[0]) + '"><span class="big">' + esc(a[0]) + '</span><span class="nm">' + esc(a[1]) + '</span><span class="aw">' + esc(a[2]) + '</span></button>').join("") + '</div>';
    if (X.ankNote) h += '<p class="lipi-p lipi-small">' + esc(X.ankNote) + '</p>';
    h += '<div class="lipi-row lipi-anktrace">' + ank.map(a => traceRow(G, a[0], 3, 70)).join("") + '</div></section>';
  }

  /* 6. उलझन-जोड़ियाँ */
  const inPage = c => /[0-9]/.test(c) || all.some(x => x.u === c || x.l === c);
  const uljhan = B.uljhan.filter(p => inPage(p[0]) && inPage(p[1]));
  h += '<section class="lipi-sec"><h2>6. जो अक्षर आपस में उलझते हैं — जोड़ी में देखो</h2><p>इन्हें साथ-साथ लिखो, फ़र्क़ आँख में बैठ जाएगा।</p><div class="lipi-pairs">' + uljhan.map(p => '<div class="lipi-pair">' + (G.glyphs[p[0]] ? glyphSVG(G, p[0], "solid", 90) : '<span class="big">' + esc(p[0]) + '</span>') + '<span class="vs">बनाम</span>' + (G.glyphs[p[1]] ? glyphSVG(G, p[1], "solid", 90) : '<span class="big">' + esc(p[1]) + '</span>') + '</div>').join("") + '</div></section>';

  /* 7. अभ्यास */
  const shuffled = letters.map(x => x.u).sort(() => 0.5 - Math.random()).slice(0, 12);
  h += '<section class="lipi-sec"><h2>7. अभ्यास (काग़ज़ पर या मन में)</h2>';
  h += '<h3>क) बड़े अक्षर का छोटा रूप लिखो</h3><div class="lipi-ex">' + shuffled.map(u => '<span class="lipi-exi">' + esc(u) + ' → <span class="lipi-box"></span></span>').join("") + '</div>';
  h += '<h3>ख) पहली आवाज़ पहचानो — यह शब्द किस अक्षर से शुरू होता है?</h3><div class="lipi-ex">' + letters.filter(x => x.shabd.length && x.shabd.nStart >= 1).slice(0, 12).map(x => '<span class="lipi-exi">' + esc(x.shabd[0][0]) + ' (' + esc(x.shabd[0][2]) + ') → <span class="lipi-box"></span></span>').join("") + '</div>';
  h += '<h3>ग) यह शब्द पढ़ो — अक्षर-अक्षर, फिर पूरा</h3><div class="lipi-ex">' + letters.filter(x => x.shabd.length > 1).slice(0, 10).map(x => '<span class="lipi-exi"><b>' + esc(x.shabd[1][0]) + '</b> = ' + x.shabd[1][0].split("").map(c => esc(c)).join(" · ") + ' → ' + esc(x.shabd[1][1]) + ' (' + esc(x.shabd[1][2]) + ')</span>').join("") + '</div>';
  const canWrite = w => w.split("").every(c => all.some(x => x.u === c || x.l === c));
  const samples = [["राम", "R-a-m"], ["सीता", "S-i-t-a"], ["खगड़िया", "K-h-a-g-a-r-i-a"]].filter(s => canWrite(s[1].replace(/-/g, "").toLowerCase()));
  h += '<h3>घ) अपना नाम और गाँव इस लिपि में लिखो</h3><p>पहले हिंदी में बोलो, फिर हर आवाज़ का अक्षर चुनो।' + (samples.length ? ' जैसे: ' + samples.map(s => s[0] + ' = ' + s[1]).join(', ') + '।' : '') + ' नीचे 3 बार लिखो।</p>' + '<div class="lipi-blank" style="height:84px"></div><div class="lipi-blank" style="height:84px"></div><div class="lipi-blank" style="height:84px"></div>';
  if (L.code === "en") {
    h += '<h3>ङ) ' + dayFull + ' दिन की योजना</h3><p>दिन 1–' + daysLetters + ': रोज़ 2 अक्षर (देखो → सुनो → 5 बार लिखो → 2 शब्द बोलो)।' + (dayRup ? ' दिन ' + (daysLetters + 1) + (dayRup > 1 ? '–' + (daysLetters + dayRup) : '') + ': रोज़ एक चिह्न और उसके सब रूप।' : '') + ' दिन ' + dayAnk + ': अंक 0–9 + उलझन-जोड़ियाँ। दिन ' + dayFull + ': पूरी वर्णमाला बिना देखे लिखो। फिर सीधे <a href="/courses/hi/bhasha/' + L.slug + '/">' + L.hi + ' बोलने का कोर्स</a> — दिन 1 से।</p>';
  } else {
    /* v2.0 पूरा-वाक्य नियम: एक पंक्ति = एक बात (सूची) */
    const plan = ["दिन 1 से " + daysLetters + " तक: रोज़ 2 अक्षर सीखो — देखो, सुनो, 5 बार लिखो, और 2 शब्द बोलो।"];
    if (dayRup) plan.push(dayRup > 1 ? "दिन " + (daysLetters + 1) + " से " + (daysLetters + dayRup) + " तक: रोज़ एक चिह्न और उसके सब रूप सीखो।" : "दिन " + (daysLetters + 1) + ": चिह्न लगे सब रूप सीखो।");
    plan.push("दिन " + dayAnk + ": अंक 0 से 9 तक और उलझन वाली जोड़ियाँ दोहराओ।");
    plan.push("दिन " + dayFull + ": पूरी वर्णमाला बिना देखे लिखो।");
    h += '<h3>ङ) ' + dayFull + ' दिन की योजना</h3><ul class="lipi-plan">' + plan.map(x => '<li>' + esc(x) + '</li>').join("") + '</ul><p>इसके बाद सीधे <a href="/courses/hi/bhasha/' + L.slug + '/">' + L.hi + ' बोलने का कोर्स</a> दिन 1 से शुरू करो।</p>';
  }
  h += '<p class="lipi-note">यह workbook मुफ़्त है; प्रमाणपत्र इसका नहीं — प्रमाणपत्र बोलने-कोर्स की परीक्षा से मिलता है। सामग्री NIPUN-भारत के "अक्षर = चिह्न + नाम + आवाज़" सिद्धांत पर आधारित/प्रेरित है — यह NCERT/सरकारी पाठ्यक्रम नहीं है।</p>' + regBox(L, "end") + '</section>';
  h += '</article>';
  return { html: h, count: all.length, letters: letters, extras: extra, rup: rup };
}

/* ---- check-robot (जन्म से) ---- */
function visibleText(html) { return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function check(name, content, R) {
  /* v2.0: R = buildContent की वापसी — subset-भाषाओं में गिनती उसी से; rare-पंक्ति वाले अक्षर शब्द-जाँच में मान्य */
  const holes = []; const vis = visibleText(content);
  if (/[\[\]]/.test(vis)) holes.push("square bracket");
  (content.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => { const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) holes.push("font " + n + "px"); });
  const allL = R.letters.concat(R.extras || []);
  if (R.count !== allL.length) holes.push("अक्षर-गिनती " + R.count + " ≠ " + allL.length);
  if (!/मूल भाषा: हिंदी/.test(content)) holes.push("मूल-भाषा निशान नहीं");
  const dots = (content.match(/class="lipi-g g-dot"/g) || []).length; if (dots < allL.length * 5) holes.push("tracing-SVG कम: " + dots);
  allL.forEach(x => { if (!x.naam || !x.aawaz || !(x.likho || x.isExtra)) holes.push("अक्षर " + x.u + " data अधूरा"); });
  (R.rup || []).forEach(r => { if (content.indexOf('id="r-' + r.l + '"') < 0) holes.push("चिह्न-रूप " + r.l + " नहीं"); if (!r.naam) holes.push("चिह्न-रूप " + r.l + " नाम नहीं"); });
  if (holes.length) throw new Error("❌ " + name + " check-robot fail: " + holes.join(" · "));
}

/* ---- build ---- */
function build(L) {
  const B = require(path.join(__dirname, "data", "lipi", L.script + "_base.js"));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "lipi", "glyphs_" + L.script + ".json"), "utf8"));
  const words = loadKKB(L.code);
  const out = "courses/hi/bhasha/" + L.slug + "/lipi/index.html";
  const R = buildContent(L, B, G, words);
  const html = R.html, count = R.count;
  check(out, html, R);
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
/* v2.0: robot/दूसरे यंत्र require से पढ़ें (regex-eval ख़त्म); build सिर्फ़ सीधे चलाने पर */
module.exports = { LIPI_LANGS: LIPI_LANGS, expandLang: expandLang, loadKKB: loadKKB };
if (require.main === module) {
  const only = process.argv[2];
  /* नियम-2 (byte-बराबरी): en का live-पन्ना कभी दोबारा नहीं बनता (अभ्यास-शफ़ल random है) — सिर्फ़ साफ़ माँग (node ... en) पर */
  LIPI_LANGS.filter(l => (only ? l.code === only : l.code !== "en")).forEach(build);
  console.log("🏁 build_lipi_pages v" + VER + " — सूची में " + LIPI_LANGS.length + " भाषा (en समेत)");
}
