/* sudhar_de_uchcharan.js v1.0 · 24-Nov-2026 : जर्मन कोर्स (स्तर-1 और स्तर-2) का देवनागरी-उच्चारण विक्षनरी के उच्चारण से, एक ही यंत्र से।
   Founder (24-Nov-2026): "क्या जर्मन कोर्स की देवनागरी विक्षनरी के उच्चारण से दोबारा बनाऊँ? - हाँ"।
   कमी: पुरानी देवनागरी हाथ से और कई रीतियों में थी (gut = गुत पर Arbeiter = आर्बाइटर; Freund = फ़्रोइन्त, freut = फ़्रोएत;
        ü कहीं उ, कहीं यु, कहीं यू; ö = ॉ; ich = इष़; Deutsch = दोयच)।
   काम: हर जर्मन पाठ की देवनागरी generator/dhvani_yantra/de.js से दोबारा (IPA: generator/data/lipi/dhvani/de_ipa.js)।
        बदलता सिर्फ़ देवनागरी वाला खाना। जर्मन वाक्य, हिंदी अर्थ, क्रम, ड्रिल: कुछ नहीं बदलता (नीचे का पहरा मशीन से जाँचता है)।
   कहाँ-कहाँ: वाक्य (items) · शब्द-कार्ड (tw) · हफ़्ते की परीक्षा-पंक्तियाँ · मदद-वाक्य (help), दोनों स्तर।
   चित्र-पुस्तक (generator/data/chitra/chitra_de.js): 120 शब्दों की देवनागरी इसी यंत्र से; अक्षर D, T, Ü और बारहखड़ी d, t कोर्स की रीति में।
   नाम, संक्षेप, अंग्रेज़ी और भारतीय शब्द: नीचे NAAM (भारत के नाम हिंदी की तरह: Bihar = बिहार; संक्षेप अक्षरों में: UPI = यूपीआई)।
   जोड़-चिह्न वाले शब्द (Online-Prüfung): हर भाग अलग, बीच में "-"।  विराम: "." → "।"; बाक़ी चिह्न वैसे ही।
   चलाना: node generator/sudhar_de_uchcharan.js            (सिर्फ़ रिपोर्ट)
           node generator/sudhar_de_uchcharan.js --write    (फ़ाइलें बदलो)     --log = हर बदलाव की पंक्ति
   दोबारा चलाने पर 0 बदलाव। बिना --write: robot की तरह (कोई अंतर = exit 1)। */
"use strict";
const fs = require("fs"), path = require("path");
const Y = require(path.join(__dirname, "dhvani_yantra", "de.js"));
const ROOT = path.join(__dirname, "..");
const WRITE = process.argv.includes("--write"), LOG = process.argv.includes("--log");

/* नाम, संक्षेप, अंग्रेज़ी और भारतीय शब्द: इनका उच्चारण जर्मन कोश से नहीं */
const NAAM = {
  Ram: "राम", Ramesh: "रमेश", Suresh: "सुरेश", Kumar: "कुमार", Ahmad: "अहमद", Bihar: "बिहार", Patna: "पटना", Delhi: "दिल्ली", Khagaria: "खगड़िया",
  Hindi: "हिन्दी", Kannada: "कन्नड़", Chhath: "छठ", Holi: "होली", Aadhaar: "आधार", Dubai: "दुबई", Roti: "रोटी", Thali: "थाली", Lassi: "लस्सी",
  WhatsApp: "व्हाट्सऐप", eMigrate: "ई-माइग्रेट", Madad: "मदद", Live: "लाइव",
  UPI: "यूपीआई", SIM: "ज़िम" /* विक्षनरी: SIM-Karte = ˈzɪmˌkaʁtə */, IMEI: "आईएमईआई", IRCTC: "आईआरसीटीसी", ITI: "आईटीआई", UTS: "यूटीएस",
  please: "प्लीज़", repeat: "रिपीट"
};
function devWord(t) {
  if (NAAM[t] !== undefined) return NAAM[t];
  const d = Y.word(t);
  if (d == null) throw new Error("शब्द का उच्चारण नहीं मिला (de_ipa, HAATH या NAAM में जोड़ो): " + t);
  return d;
}
function devTok(t) {
  if (NAAM[t] !== undefined) return NAAM[t];
  if (t.indexOf("-") > 0) return t.split("-").map(devWord).join("-"); /* हर भाग अलग (Check-in = चेक-इन), जैसा ऊपर लिखा है */
  return devWord(t);
}
/* पूरा जर्मन पाठ → देवनागरी (शब्द यंत्र से, अंक और विराम वैसे ही, "." = "।") */
function dev(s) {
  return String(s).replace(/[A-Za-zÄÖÜäöüßéÉ]+(?:-[A-Za-zÄÖÜäöüßéÉ]+)*|\.{3}|\./g, m => m === "..." ? "…" : m === "." ? "।" : devTok(m));
}

const FILES = [["assets/kkb_de_data.js", "KKB_DATA"], ["assets/kkb2_de_data.js", "KKB2_DATA"]];
let total = 0; const log = []; const perF = {};
const VTXT = " · 24-Nov-2026: देवनागरी उच्चारण विक्षनरी के IPA से, एक यंत्र से (generator/dhvani_yantra/de.js) · पहले: ";
const out = FILES.map(([rel, key]) => {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const w = {}; new Function("window", "self", "module", src + ";")(w, w, {});
  const D = w[key];
  let n = 0;
  const set = (o, k, v, at) => { if (o[k] !== v) { log.push(rel.slice(7, 12) + " · " + at + "\n  जर्मन: " + (o === D ? "" : o[0]) + "\n  पहले: " + o[k] + "\n  अब  : " + v); o[k] = v; n++; } };
  D.weeks.forEach((wk, wi) => {
    wk.days.forEach((d, di) => {
      (d.items || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " दिन " + (di + 1) + " वाक्य " + (ii + 1)));
      (d.tw || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " दिन " + (di + 1) + " शब्द-कार्ड " + (ii + 1)));
    });
    ((wk.test && wk.test.lines) || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " परीक्षा-पंक्ति " + (ii + 1)));
  });
  (D.help || []).forEach((h, hi) => set(h, 1, dev(h[0]), "मदद " + (hi + 1)));
  const VNOTE = (key === "KKB_DATA" ? "1.1" : "2.1") + VTXT;   /* स्तर-1 1.0 → 1.1 · स्तर-2 2.0 → 2.1 */
  if (String(D.version).indexOf(VTXT) < 0) set(D, "version", VNOTE + D.version, "version");
  perF[rel] = n; total += n;
  return { rel, src, D, key };
});
/* पहरा: जर्मन और हिंदी अछूते (हर देवनागरी-उच्चारण खाना ख़ाली करके पहले-बाद मिलाओ) */
function skeleton(D) {
  const C = JSON.parse(JSON.stringify(D));
  C.weeks.forEach(wk => { wk.days.forEach(d => { (d.items || []).forEach(it => it[1] = ""); (d.tw || []).forEach(it => it[1] = ""); });
    ((wk.test && wk.test.lines) || []).forEach(it => it[1] = ""); });
  (C.help || []).forEach(h => { h[1] = ""; });
  C.version = String(C.version).split(" · पहले: ").pop();
  return JSON.stringify(C);
}
FILES.forEach(([rel, key], i) => {
  const w = {}; new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, rel), "utf8") + ";")(w, w, {});
  if (skeleton(w[key]) !== skeleton(out[i].D)) throw new Error("पहरा: " + rel + " में देवनागरी के सिवा कुछ और बदल जाता। कुछ नहीं लिखा।");
});
/* चित्र-पुस्तक (generator/data/chitra/chitra_de.js): शब्दों की देवनागरी इसी यंत्र से, और अक्षर D, T, Ü कोर्स की रीति में
   (Founder 24-Nov-2026: t = ट, d = ड, ü = यू; अक्षर-तालिका generator/data/lipi/latin_letter_tables.js जैसी)। */
const CHREL = "generator/data/chitra/chitra_de.js", CHNOTE = "/* 24-Nov-2026: शब्दों की देवनागरी कोर्स वाले यंत्र से (generator/dhvani_yantra/de.js, विक्षनरी IPA); अक्षर D = ड, T = ट, Ü = यू (Founder: हाँ) */\n";
const chSrc = fs.readFileSync(path.join(ROOT, CHREL), "utf8");
const CHD = JSON.parse(JSON.stringify(require(path.join(ROOT, CHREL))));
let chN = 0;
const chSet = (o, k, v, at) => { if (o[k] !== v) { log.push("चित्र · " + at + "\n  पहले: " + o[k] + "\n  अब  : " + v); o[k] = v; chN++; } };
CHD.words.forEach((x, i) => chSet(x, "p", dev(x.w), "अक्षर-शब्द " + (i + 1) + " " + x.w));
CHD.shared.forEach((x, i) => chSet(x, "p", dev(x.w), "100 चीज़ें " + (i + 1) + " " + x.w));
const AKSHAR = { D: ["ड", "नाम: डे"], T: ["ट", "नाम: टे"], "Ü": ["यू", "होंठ गोल करके ई · नाम: यू-उमलाउट"] };
CHD.akshar.groups.forEach(g => g.items.forEach(it => { if (AKSHAR[it.L]) { chSet(it, "p", AKSHAR[it.L][0], "अक्षर " + it.L); chSet(it, "n", AKSHAR[it.L][1], "अक्षर " + it.L + " नाम"); } }));
CHD.barakhadi.cons.forEach(c => { if (c[0] === "d") chSet(c, 1, "ड", "बारहखड़ी d"); if (c[0] === "t") chSet(c, 1, "ट", "बारहखड़ी t"); });
function chSkel(D) {
  const C = JSON.parse(JSON.stringify(D));
  C.words.concat(C.shared).forEach(x => { x.p = ""; });
  C.akshar.groups.forEach(g => g.items.forEach(it => { if (AKSHAR[it.L]) { it.p = ""; it.n = ""; } }));
  C.barakhadi.cons.forEach(c => { if (c[0] === "d" || c[0] === "t") c[1] = ""; });
  return JSON.stringify(C);
}
if (chSkel(require(path.join(ROOT, CHREL))) !== chSkel(CHD)) throw new Error("पहरा: चित्र-पुस्तक में देवनागरी के सिवा कुछ और बदल जाता। कुछ नहीं लिखा।");
perF["chitra/chitra_de.js"] = chN;   /* k.slice(7) = chitra_de.js */ total += chN;
console.log("बदले खाने: " + total + " (" + Object.keys(perF).map(k => k.slice(7) + " " + perF[k]).join(" · ") + ") · जर्मन वाक्य और हिंदी अर्थ: अछूते (मशीन से जाँचा)");
if (LOG) console.log(log.join("\n"));
/* पहरा (robot): बिना --write चलाने पर कोई भी खाना यंत्र से अलग मिले तो fail। 0 = हर छपी देवनागरी यंत्र जैसी। */
if (!WRITE && total) { console.log("⛔ " + total + " खाने यंत्र से अलग: पहले --write चलाओ, फिर पन्ने दोबारा बनाओ"); process.exitCode = 1; } else if (!WRITE) console.log("🏁 हर छपी जर्मन देवनागरी यंत्र (dhvani_yantra/de.js) जैसी");
if (WRITE && chN) {
  const i = chSrc.indexOf("module.exports = ");
  const head = chSrc.slice(0, i).indexOf(CHNOTE) < 0 ? chSrc.slice(0, i) + CHNOTE : chSrc.slice(0, i);
  fs.writeFileSync(path.join(ROOT, CHREL), head + "module.exports = " + JSON.stringify(CHD, null, 1) + ";\n"); console.log("✅ लिखा: " + CHREL);
}
if (WRITE && total) out.forEach(({ rel, src, D, key }) => {
  const m = src.match(new RegExp("window\\." + key + "\\s*=\\s*"));
  const s2 = src.slice(0, m.index) + m[0] + JSON.stringify(D, null, 1) + ";\n";
  if (s2 !== src) { fs.writeFileSync(path.join(ROOT, rel), s2); console.log("✅ लिखा: " + rel); }
});
module.exports = { dev: dev, NAAM: NAAM };
