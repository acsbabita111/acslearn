/* generator/fgc/build.js v1.1 · 22-Nov-2026 — फ़्रेंच-गयानीज़-क्रियोल (fgc, PJ320) कोर्स का data-यंत्र (परत-4)
   काम: generator/fgc/texts/ के क्रियोल पाठ से ये फ़ाइलें भरता है (ढाँचा और हिंदी-स्तंभ जस-के-तस रहते हैं):
     assets/kkb_fgc_data.js · assets/kkb2_fgc_data.js        (वाक्य + देवनागरी उच्चारण)
     generator/data/lipi/fgc_shabdkosh.js                    (हाथ-gloss शब्दकोश: हर शब्द-रूप का अर्थ)
     generator/data/vyakaran/vyakaran_fgc.js                 (व्याकरण: उदाहरण कोर्स के असली वाक्य)
     generator/data/chitra/chitra_fgc.js                     (चित्र-पुस्तक: अक्षर, अक्षर-शब्द, 100 चीज़ें)
   उच्चारण हाथ से नहीं लिखा जाता: translit.js के नियम से बनता है।
   पहरे (एक भी टूटे तो कुछ नहीं लिखा जाता): वाक्य-गिनती, क्रम, उच्चारण-नियम, भाषा-पहरे, शब्द-अर्थ सूची बंद।
   चलाना (repo-रूट से): node generator/fgc/build.js
   इसके बाद पन्ने: build_vyakaran.js fgc · build_chitra_pustak.js fgc · build_lipi_pages.js fgc · build_workbook.js fgc · build_kkb_bank.js fgc */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", ".."), HERE = __dirname;
const T = require("./translit.js"), LEX = require("./lex.js"), OVER = require("./overrides.js"), CW = require("./chitra_words.js");
const NAME = "फ़्रेंच-गयानीज़-क्रियोल", VERDATE = "22-Nov-2026";
const WEEKS = { 1: [100, 100, 100, 100, 100], 2: [100, 100, 100, 100, 150, 150, 150, 150, 150, 150, 150, 50, 150] };
const E = []; const bad = m => E.push(m);
function load(f) { const w = {}; new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, f), "utf8") + ";")(w, w, {}); return w[Object.keys(w)[0]]; }

/* ---------- 1) पाठ पढ़ना + गिनती/क्रम ---------- */
const txt = {}, oth = {}, lines = [];
function readKV(f) { return fs.readFileSync(path.join(HERE, "texts", f), "utf8").split("\n").filter(Boolean).map(l => { const i = l.indexOf("|"); if (i < 0) { bad(f + ": '|' नहीं: " + l); return ["", ""]; } return [l.slice(0, i), l.slice(i + 1)]; }); }
for (const L of [1, 2]) WEEKS[L].forEach((need, wi) => {
  const k = "L" + L + "w" + (wi + 1), rows = readKV(k + ".txt");
  if (rows.length !== need) bad(k + ": वाक्य " + rows.length + " ≠ " + need);
  rows.forEach(([n, t], i) => { if (String(i + 1) !== n) bad(k + ": क्रम टूटा, पंक्ति " + (i + 1) + " पर " + n); txt[k + "#" + n] = t; lines.push({ f: k + ".txt", k: n, t, main: true }); });
  readKV(k + ".other.txt").forEach(([kk, t]) => { oth[k + kk] = t; lines.push({ f: k + ".other.txt", k: kk, t }); });
});
readKV("help.txt").forEach(([kk, t]) => { oth[kk] = t; lines.push({ f: "help.txt", k: kk, t }); });

/* ---------- 2) भाषा-पहरे ---------- */
const A = "a-zéèòà", NAS = /(n|m|gn|ng)$/i;
lines.forEach(x => {
  const where = " | " + x.f + " " + x.k + " | " + x.t;
  try { T.line(x.t); } catch (e) { bad("उच्चारण-नियम: " + e.message + where); }
  (x.t.match(/[A-Za-zéèòà0-9]+-(yan|ya|an|a)(?![A-Za-zéèòà])/g) || []).forEach(m => {
    const b = m.slice(0, m.lastIndexOf("-")), s = m.slice(m.lastIndexOf("-") + 1);
    if (/^(S|dé|venn|trant|dousman|roun|anvan|lésé|katréven)$/i.test(b)) return;
    const nas = NAS.test(b);
    if (nas && (s === "a" || s === "ya")) bad("n या m के बाद -an/-yan चाहिए: " + m + where);
    if (!nas && (s === "an" || s === "yan")) bad("यहाँ -a/-ya चाहिए: " + m + where);
  });
  if (new RegExp("(^|[^" + A + "])ka (savé|konnèt|lé|gen|pouvé|divèt|bizwen|kontan)(?![" + A + "])", "i").test(x.t)) bad("स्थिति-क्रिया के साथ ka नहीं लगता" + where);
  if (new RegExp("(^|[^" + A + "])(ka|ké|té) pa(?![" + A + "])", "i").test(x.t)) bad("pa हमेशा ka/ké/té से पहले" + where);
  (x.t.toLowerCase().match(/[a-zéèòà]+/g) || []).forEach(w => { if (/[bcdfgjklmnpstvz]w$/.test(w)) bad("शब्द व्यंजन+w पर ख़त्म (पुरानी r→w ग़लती): " + w + where); });
  if (/  |\s[.,!?]|[’`]|—/.test(x.t)) bad("ख़ाली-स्थान / चिह्न (लंबी रेखा वर्जित)" + where);
  if (x.main && !/^['(]?[A-ZÉÈÒ0-9]/.test(x.t)) bad("वाक्य बड़े अक्षर से शुरू नहीं" + where);
  if (x.main && !/[.!?]$/.test(x.t)) bad("वाक्य के अंत में चिह्न नहीं" + where);
});

/* ---------- 3) शब्द-अर्थ सूची बंद ---------- */
const ov = {}; Object.keys(OVER).forEach(k => ov[k.toLowerCase()] = OVER[k]);
const seenTok = new Set();
lines.forEach(x => (x.t.toLowerCase().match(/[a-zéèòà0-9]+/g) || []).forEach(w => { if (!/^\d+$/.test(w) && !ov[w]) seenTok.add(w); }));
const noGloss = [...seenTok].filter(w => !LEX[w]), extra = Object.keys(LEX).filter(k => !seenTok.has(k));
if (noGloss.length) bad("lex.js में अर्थ नहीं: " + noGloss.join(" "));
if (extra.length) bad("lex.js में फ़ालतू शब्द (कोर्स में नहीं): " + extra.join(" "));
if (E.length) { console.log("⛔ generator/fgc/build.js रुका (" + E.length + " दोष) — कुछ नहीं लिखा:\n  " + E.slice(0, 40).join("\n  ")); process.exit(1); }

/* ---------- 4) data-फ़ाइलें भरना (ढाँचा = मौजूदा फ़ाइल; सिर्फ़ क्रियोल और उच्चारण बदलते हैं) ---------- */
const F1 = load("assets/kkb_fgc_data.js"), F2 = load("assets/kkb2_fgc_data.js");
const PRE = /^\((सुनो|बोलो)\)\s*/; const need = k => { if (oth[k] === undefined) throw new Error("पंक्ति नहीं: " + k); return oth[k]; };
const ALL = []; let nItems = 0;
[[F1, 1], [F2, 2]].forEach(([F, L]) => {
  if (F.weeks.length !== WEEKS[L].length) throw new Error("स्तर-" + L + " के हफ़्ते " + F.weeks.length);
  (F.help || []).forEach((h, i) => { const t = need("L" + L + "help" + i); h[0] = t; h[1] = T.line(t); });
  F.weeks.forEach((w, wi) => { const P = "L" + L + "w" + (wi + 1); let n = 0;
    w.days.forEach((d, di) => {
      d.items.forEach(it => { n++; const t = txt[P + "#" + n]; if (!t) throw new Error("वाक्य नहीं: " + P + "#" + n); it[0] = t; it[1] = T.line(t); ALL.push(it); nItems++; });
      (d.tw || []).forEach((t, i) => { const x = need(P + "d" + (di + 1) + "tw" + i); t[0] = x; t[1] = T.line(x); });
      if (d.drill) (d.drill.rows || []).forEach((r, ri) => r.forEach((c, ci) => { r[ci] = need(P + "d" + (di + 1) + "dr" + ri + "_" + ci); }));
    });
    if (n !== WEEKS[L][wi]) throw new Error(P + ": ढाँचे में " + n + " वाक्य");
    (w.test && w.test.lines || []).forEach((l, i) => { const t = need(P + "test" + i); l[0] = t; l[1] = T.line(t); });
    (w.listen || []).forEach((l, i) => { l[0] = (PRE.exec(l[0]) || [""])[0] + need(P + "lisQ" + i); l[1] = (PRE.exec(l[1]) || [""])[0] + need(P + "lisA" + i); });
    (w.dialog || []).forEach((l, i) => { l[1] = need(P + "dlg" + i); });
  });
});
if (nItems !== 2150) throw new Error("कुल वाक्य 2150 नहीं: " + nItems);
/* ड्रिल-निर्देश जिनमें इस भाषा के शब्द आते हैं (बाक़ी मास्टर जैसे ही) */
const DH = {
  "1.1": "जोड़ी बदलो — Mo से To, फिर Li: वाक्य वही, रूप बदले।", "1.2": "जगह बताओ — annan / asou / pròch ké / dèyè सही खाने में बैठाओ।",
  "1.5": "दो छोटे वाक्य जोड़ो — pas या kidonk लगाकर एक बनाओ।", "2.1": "क्रम बताओ — prémyé / aprésa / dèyèsa से वाक्य जोड़ो।",
  "2.3": "डॉक्टर से बात — शरीर के हिस्से का नाम लेकर ka fè mo mal लगाओ।", "2.4": "तुलना — pi … pasé / mwens … pasé लगाकर दो मौसम-वाक्य जोड़ो।",
  "2.5": "फ़ोन-वाक्य — souplé + अनुरोध जोड़कर विनम्र बनाओ।", "3.3": "गाँव-वाक्य — nou + क्रिया लगाकर 3 सामूहिक-वाक्य बनाओ।",
  "3.4": "त्योहार-कहानी — prémyé से शुरू कर 4 वाक्य क्रम में बोलो।", "3.5": "भावना-वाक्य — Mo ka santi mo + भावना लगाकर 3 वाक्य बनाओ।",
  "4.2": "समय बोलो — घड़ी के 5 अलग समय क्रियोल में बोलो।", "5.4": "औज़ार-सूची — 5 औज़ारों के नाम क्रियोल में बताओ।"
};
F2.weeks.forEach((w, wi) => w.days.forEach((d, di) => { const k = (wi + 1) + "." + (di + 1); if (DH[k]) d.drill.hi = DH[k]; }));
const DISC = "यह पाठ Claude AI ने गयानी क्रियोल के छपे स्रोतों (फ़्रांस शिक्षा-मंत्रालय का गयानी-क्रियोल पाठ्यक्रम, APICS) के नियमों से लिखा है। native-भाषी से अभी सत्यापित नहीं। विशेषज्ञ-समीक्षा बाक़ी।";
const VER = k => "3.1 (" + VERDATE + "): पूर्ण-पुनर्लेखन, स्रोत-आधारित नियम + स्रोत-मिलान सुधार + नियम-यंत्र उच्चारण (AI-draft: मूल-वक्ता/समिति-जाँच बाक़ी); गिनती मशीन से देखें (" + k + ")";
F1.version = VER("dev_kkb_check"); F2.version = VER("dev_kkb2_check"); F1.ai_disclaimer = F2.ai_disclaimer = DISC;
F1.sub = "Kréyòl gwiyanè (" + NAME + ") for Work — French Guiana (फ़्रेंच गयाना)";
F1.weeks.forEach(w => { w.title = w.hi; w.test.target = w.test.target.replace(/French-भाषी/g, NAME + "-भाषी"); });
const HERO = "Annou palé kréyòl gwiyanè!";
F2.module = HERO + " — " + NAME + " बोलने का प्रमाणपत्र कोर्स (स्तर-2)"; F2.heroTitle = HERO;
const head = (lv, k) => "/* ACS काम की भाषा — " + NAME + " (fgc) स्तर-" + lv + " data | v3.1 (" + VERDATE + ")\n   पूर्ण-पुनर्लेखन: गयानी क्रियोल के छपे स्रोतों के नियमों से (फ़्रांस शिक्षा-मंत्रालय पाठ्यक्रम, APICS) — AI-draft (🟡), मूल-वक्ता जाँच बाक़ी;\n   हिंदी-स्तंभ English मास्टर से हूबहू (भाषा-नाम छूट)। उच्चारण नियम-यंत्र से। स्रोत: generator/fgc/ (हाथ से न बदलें)। गिनती मशीन से देखें (" + k + ")। */\n";
const W = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, "utf8");
W("assets/kkb_fgc_data.js", head(1, "dev_kkb_check") + "window.KKB_DATA = " + JSON.stringify(F1) + ";\n");
W("assets/kkb2_fgc_data.js", head(2, "dev_kkb2_check") + "window.KKB2_DATA = " + JSON.stringify(F2) + ";\n");

/* ---------- 5) शब्दकोश (हाथ-gloss) ---------- */
const COMP = { "venn-senk": "पच्चीस", "venn-dé": "बाईस", "katréven-kenz": "पंचानबे", "dousman-dousman": "धीरे-धीरे", "roun-ròt": "एक-दूसरे", "lésé-pasé": "गेट पास", "dé-trwa": "दो-तीन", "s-kat": "एस-चार", "anvan-apré": "पहले-बाद" };
const clean = s => String(s).replace(/[.,?!"'।;:()_،؟۔!—–᱾᱿]/g, "").trim();   /* build_workbook.js वाला ही */
function gloss(k) { if (COMP[k]) return COMP[k]; if (LEX[k]) return LEX[k]; if (ov[k]) return ov[k];
  const m = /^(.+)-(yan|ya|an|a)$/.exec(k); if (m) { const b = gloss(m[1]); if (b) return b; }
  if (k.indexOf("-") > 0) { const p = k.split("-").map(gloss); if (p.every(Boolean)) return p.join("-"); } return ""; }
const kosh = {}, miss = [];
[F1, F2].forEach(X => X.weeks.forEach(w => w.days.forEach(d => {
  d.items.forEach(it => clean(it[0]).split(/\s+/).filter(Boolean).forEach(wd => { const k = wd.toLowerCase(); if (kosh[k] !== undefined || /^\d+$/.test(k)) return; const g = gloss(k); if (!g) miss.push(k); kosh[k] = g; }));
  (d.tw || []).forEach(t => { const k = String(t[0]).trim().toLowerCase(); if (kosh[k] === undefined) kosh[k] = String(t[2]); });
})));
if (miss.length) throw new Error("शब्दकोश में बिना अर्थ: " + miss.join(" "));
W("generator/data/lipi/fgc_shabdkosh.js", "/* " + NAME + " (fgc) शब्दकोश v3.1 (" + VERDATE + ") — हाथ-gloss: हर शब्द का अर्थ हाथ से लिखा (शब्द-सीध से नहीं);\n   स्रोत: generator/fgc/lex.js (यह फ़ाइल generator/fgc/build.js बनाता है)। AI-draft: मूल-वक्ता/समिति-जाँच बाक़ी। गिनती मशीन से देखें (dev_kkb_kachra_audit) */\nconst FGC_SHABDKOSH={\n" + Object.keys(kosh).map(k => JSON.stringify(k) + ":" + JSON.stringify(kosh[k]) + ",\n").join("") + "};\nif(typeof module!==\"undefined\")module.exports=FGC_SHABDKOSH;\n");

/* ---------- 6) व्याकरण (उदाहरण = कोर्स के असली वाक्य; कोड यंत्र से) ---------- */
const code = s => { const i = ALL.findIndex(it => it[0] === s); if (i < 0) throw new Error("व्याकरण का उदाहरण कोर्स में नहीं: " + s); return "s" + String(i + 1).padStart(4, "0"); };
const ex = arr => arr.map(([s, hl]) => { if (s.indexOf(hl) < 0) throw new Error("'" + hl + "' वाक्य में नहीं: " + s); return { code: code(s), hl }; });
const VK = require("./vyakaran_lessons.js");
const VD = { version: "2.0", book: "ACS-VK1",
  lang: { code: "fgc", hi: NAME, en: NAME, tts: "fgc", asr: "fgc", cover: { native_title: "Mo prémyé gramè", book_words: ["mo", "ou"] }, slug: "frenchguianesecreole", glottocode: "guia1246" },
  lessons: VK.map((g, i) => Object.assign({ n: i + 1 }, g, { ex: ex(g.ex) })),
  grambank: { db: "WALS", source: NAME + " Grambank में नहीं; WALS (Language_ID gfr, Guianese French Creole) में इसके वाक्य-गुण दर्ज नहीं: नियम फ़्रांस के शिक्षा-मंत्रालय के गयानी-क्रियोल पाठ्यक्रम और APICS (Guyanais) से मिलाकर लिखे; उदाहरण इसी कोर्स के असली वाक्य; AI-मसौदा, भाषा संवर्धन समिति (मूल-वक्ता) की जाँच बाक़ी", claims: [] } };
W("generator/data/vyakaran/vyakaran_fgc.js", "/* vyakaran_fgc.js — \"मेरा पहला " + NAME + " व्याकरण\" · परत-3 · v2.1 · " + VERDATE + " · स्रोत: generator/fgc/vyakaran_lessons.js (यह फ़ाइल generator/fgc/build.js बनाता है) · नियम स्रोत-आधारित AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */\nmodule.exports = " + JSON.stringify(VD, null, 1) + ";\n");

/* ---------- 7) चित्र-पुस्तक ---------- */
const P = w => T.line(w);
if (CW.length !== 100) throw new Error("चित्र-पुस्तक की चीज़ें 100 नहीं: " + CW.length);
const shared = CW.map(([hi, w, img]) => ({ hi, w, p: P(w), img })); const imgOf = {}, wOf = {}; CW.forEach(([hi, w, img]) => { imgOf[hi] = img; wOf[hi] = w; });
const V = [["A", "आ"], ["É", "ए"], ["È", "ऐ"], ["I", "इ"], ["O", "ओ"], ["Ò", "ऑ"], ["ou", "उ"]];
const NS = [["an", "आं"], ["en", "ऐं"], ["on", "ओं"]];
const C = [["B", "ब"], ["ch", "श"], ["D", "द"], ["dj", "ज"], ["F", "फ़"], ["G", "ग"], ["gn", "न्य"], ["H", "ह"], ["J", "झ़"], ["K", "क"], ["L", "ल"], ["M", "म"], ["N", "न"], ["P", "प"], ["R", "र"], ["S", "स"], ["T", "त"], ["tch", "च"], ["V", "व"], ["W", "व"], ["Y", "य"], ["Z", "ज़"]];
const itA = a => a.map(([L, p]) => ({ L, p, n: L.length > 1 ? "अक्षर-जोड़ा" : "", say: L.toLowerCase() }));   /* अक्षर-जोड़े छोटे अक्षरों में: कार्ड से बाहर नहीं निकलते */
const nAk = V.length + NS.length + C.length;
const WD = [["A", "विमान", "start"], ["B", "केला", "start"], ["ch", "बिल्ली", "start"], ["D", "पानी", "start"], ["É", "स्कूल", "mid"], ["È", "कुर्सी", "mid"], ["F", "फूल", "start"], ["G", "केक", "start"], ["gn", "पहाड़", "mid"],
  ["I", "किताब", "mid"], ["J", "संतरा", "mid"], ["K", "घर", "start"], ["L", "चाँद", "start"], ["M", "माँ", "start"], ["N", "नाक", "start"], ["O", "बाल्टी", "mid"], ["Ò", "मुर्गा", "mid"], ["ou", "चावल", "mid"], ["P", "पिता", "start"],
  ["R", "चूहा", "start"], ["S", "सूरज", "start"], ["T", "ट्रेन", "start"], ["tch", "दिल", "start"], ["V", "गिलास", "start"], ["W", "आँख", "start"], ["Y", "ट्रक", "mid"], ["Z", "तारा", "start"], ["an", "बत्ती", "mid"], ["en", "कुत्ता", "mid"], ["on", "पुल", "mid"]];
const words = WD.map(([L, hi, pos]) => { if (!wOf[hi]) throw new Error("चित्र-शब्द नहीं: " + hi); return { L, w: wOf[hi], p: P(wOf[hi]), m: hi, img: imgOf[hi], pos }; });
const CD = { version: "3.1", book: "ACS-CP1", lang: { code: "fgc", hi: NAME, en: "French Guianese Creole", tts: "fgc", slug: "frenchguianesecreole" },
  akshar: { title: NAME + ": " + nAk + " अक्षर और अक्षर-जोड़े", required: nAk, src: "फ़्रेंच गयाना (दक्षिण अमेरिका) की बोली: रोमन अक्षरों में, जैसा बोलो वैसा लिखो; mo = मैं, ou = आप",
    groups: [{ g: "स्वर: " + V.length, items: itA(V) }, { g: "नाक से बोले जाने वाले स्वर: " + NS.length + " (n के बाद स्वर न हो तब)", items: itA(NS) }, { g: "व्यंजन: " + C.length + " (ch = श, tch = च, dj = ज, gn = न्य)", items: itA(C) }] },
  barakhadi: { title: "सिलाब: गयानी क्रियोल बारहखड़ी", note: "हर व्यंजन के साथ स्वर जुड़कर शब्दांश बनता है: ठीक हिंदी की बारहखड़ी जैसा। एक रूप दबाओ, उसकी आवाज़ सुनो।",
    cons: [["b", "ब"], ["ch", "श"], ["d", "द"], ["dj", "ज"], ["f", "फ़"], ["g", "ग"], ["j", "झ़"], ["k", "क"], ["l", "ल"], ["m", "म"], ["n", "न"], ["p", "प"], ["r", "र"], ["s", "स"], ["t", "त"], ["tch", "च"], ["v", "व"], ["w", "व"], ["y", "य"], ["z", "ज़"]],
    signs: [["a", "ा", "a"], ["é", "े", "é"], ["è", "ै", "è"], ["i", "ि", "i"], ["o", "ो", "o"], ["ò", "ॉ", "ò"], ["ou", "ु", "ou"]] },
  words, wordNote: "dj और H से बना चित्र-शब्द यहाँ नहीं। É, È, I, O, Ò, ou, J, Y, gn, an, en, on के शब्द में अक्षर बीच में आता है।",
  shared, srcNote: NAME + " शब्द: कोर्स वाली ही वर्तनी में; AI-मसौदा: भाषा संवर्धन समिति (मूल-वक्ता) की जाँच बाक़ी" };
W("generator/data/chitra/chitra_fgc.js", "/* chitra_fgc.js — \"मेरी पहली " + NAME + " पोथी\" (ACS-CP1-fgc) · परत-3 · v3.1 · " + VERDATE + " · स्रोत: generator/fgc/chitra_words.js (यह फ़ाइल generator/fgc/build.js बनाता है) · शब्द कोर्स वाली वर्तनी में, उच्चारण नियम-यंत्र से */\nmodule.exports = " + JSON.stringify(CD, null, 1) + ";\n");
console.log("🏁 generator/fgc/build.js v1.1: वाक्य " + nItems + " · बाक़ी पंक्तियाँ " + Object.keys(oth).length + " · शब्द " + seenTok.size + " (सब का अर्थ दर्ज) · शब्दकोश " + Object.keys(kosh).length + " रूप · व्याकरण-उदाहरण " + VD.lessons.reduce((s, g) => s + g.ex.length, 0) + " · पहरे पास");
