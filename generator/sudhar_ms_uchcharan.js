/* sudhar_ms_uchcharan.js v1.0 · 23-Nov-2026 : मलय कोर्स (स्तर-1 और स्तर-2) का देवनागरी-उच्चारण एक ही यंत्र से (data-स्तर; हाथ से नहीं)
   कमी (स्वतंत्र ऑडिट MS-01): स्तर-2 की देवनागरी दूसरे और बेतरतीब ढंग से लिखी थी। स्तर-2 के 9,215 मिलान-योग्य शब्दों में से
        सिर्फ़ 1,993 (21.6%) स्तर-1 की रीति से मिलते थे (lima = लीमा, orang = ओरांग, dengan = देंगान)।
   काम: हर मलय पाठ का देवनागरी रूप generator/dhvani_yantra/ms.js से दोबारा बनता है, स्तर-1 की वही रीति जिससे स्तर-1 छपा है।
        बदलता सिर्फ़ देवनागरी वाला हिस्सा। मलय वाक्य, हिंदी अर्थ, क्रम, ड्रिल: कुछ नहीं बदलता (script ख़ुद मिलाकर जाँचती है)।
   कहाँ-कहाँ: स्तर-2 के शब्द-कार्ड (tw) · वाक्य (items) · हफ़्ते की परीक्षा-पंक्तियाँ · सुनो-बोलो (listen) और बातचीत (dialog) के कोष्ठक
              · मदद-वाक्य (help) · स्तर-1 के वाक्य और परीक्षा-पंक्तियाँ (वहाँ नाम, संक्षेप और अंग्रेज़ी शब्द बदलते हैं, और यंत्र v1.2 से
              belok, semak: इनकी आवाज़ विक्षनरी के उच्चारण से तय हुई)।
   नाम और संक्षेप: नीचे NAAM तालिका (भारत के नाम हिंदी की तरह: Patna = पटना; संक्षेप अक्षरों में: ATM = एटीएम)।
   विराम: "." → "।"; बाक़ी चिह्न वैसे ही।
   चलाना: node generator/sudhar_ms_uchcharan.js            (सिर्फ़ रिपोर्ट)
           node generator/sudhar_ms_uchcharan.js --write    (फ़ाइलें बदलो)     --log = हर बदलाव की पंक्ति
   दोबारा चलाने पर 0 बदलाव। */
"use strict";
const fs = require("fs"), path = require("path");
const Y = require(path.join(__dirname, "dhvani_yantra", "ms.js"));
const ROOT = path.join(__dirname, "..");
const WRITE = process.argv.includes("--write"), LOG = process.argv.includes("--log");

/* नाम, संक्षेप, अंग्रेज़ी और भारतीय शब्द: इनका उच्चारण मलय-रीति से नहीं बनता */
const NAAM = {
  Ram: "राम", Ramesh: "रमेश", Suresh: "सुरेश", Kumar: "कुमार", Bihar: "बिहार", Patna: "पटना", Delhi: "दिल्ली", Khagaria: "खगड़िया",
  Hindi: "हिन्दी", Kannada: "कन्नड़", Chhath: "छठ", Holi: "होली", Aadhaar: "आधार", Kisan: "किसान", Dubai: "दुबई",
  WhatsApp: "व्हाट्सऐप", eMigrate: "ई-माइग्रेट", eShram: "ई-श्रम", MADAD: "मदद",
  UPI: "यूपीआई", ATM: "एटीएम", PIN: "पिन", SIM: "सिम", AC: "एसी", AI: "एआई", OTP: "ओटीपी", ESI: "ईएसआई", KWSP: "केडब्ल्यूएसपी",
  PNR: "पीएनआर", TT: "टीटी", UTS: "यूटीएस", ITI: "आईटीआई", IRCTC: "आईआरसीटीसी", IMEI: "आईएमईआई", A: "ए", S: "एस",
  "yūpīāī": "यूपीआई"
};
/* छोटे अक्षरों में भी यही (वाक्य के बीच) */
const NAAM_L = { okay: "ओके", overtime: "ओवरटाइम", rupee: "रुपी", gulab: "गुलाब", jamun: "जामुन", gutka: "गुटखा", lassi: "लस्सी", thali: "थाली",
  mistri: "मिस्त्री", dal: "दाल", sweater: "स्वेटर", ram: "राम", bihar: "बिहार", patna: "पटना", delhi: "दिल्ली", hindi: "हिन्दी", kumar: "कुमार" };

function devWord(t) {
  if (NAAM[t] !== undefined) return NAAM[t];
  const l = t.toLowerCase();
  if (NAAM_L[l] !== undefined) return NAAM_L[l];
  return Y.word(l);
}
/* पूरा मलय पाठ → देवनागरी (शब्द यंत्र से, विराम वैसे ही, "." = "।") */
function dev(s) {
  return s.replace(/[A-Za-zūīāéÉ]+|\.{3}|\./g, m => m === "..." ? "…" : m === "." ? "।" : devWord(m));
}

const FILES = [["assets/kkb_ms_data.js", "KKB_DATA"], ["assets/kkb2_ms_data.js", "KKB2_DATA"]];
let total = 0; const log = []; const perF = {};
const out = FILES.map(([rel, key]) => {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const w = {}; new Function("window", "self", "module", src + ";")(w, w, {});
  const D = w[key], before = JSON.stringify(D);
  let n = 0;
  const set = (o, k, v, at) => { if (o[k] !== v) { log.push(rel.slice(7, 11) + " · " + at + "\n  पहले: " + o[k] + "\n  अब  : " + v); o[k] = v; n++; } };
  D.weeks.forEach((wk, wi) => {
    wk.days.forEach((d, di) => {
      (d.items || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " दिन " + (di + 1) + " वाक्य " + (ii + 1)));
      (d.tw || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " दिन " + (di + 1) + " शब्द-कार्ड " + (ii + 1)));
    });
    ((wk.test && wk.test.lines) || []).forEach((it, ii) => set(it, 1, dev(it[0]), "हफ़्ता " + (wi + 1) + " परीक्षा-पंक्ति " + (ii + 1)));
    /* listen/dialog: "(सुनो) Malay पाठ (देवनागरी)" : कोष्ठक का देवनागरी हिस्सा दोबारा */
    const kosh = s => s.replace(/^((?:\((?:सुनो|बोलो)\) )?)(.*?) \(([^()]*[ऀ-ॿ][^()]*)\)$/, (m0, pre, ms) => pre + ms + " (" + dev(ms) + ")");
    (wk.listen || []).forEach((pr, pi) => pr.forEach((s, si) => set(pr, si, kosh(s), "हफ़्ता " + (wi + 1) + " सुनो-बोलो " + (pi + 1))));
    (wk.dialog || []).forEach((pr, pi) => set(pr, 1, kosh(pr[1]), "हफ़्ता " + (wi + 1) + " बातचीत " + (pi + 1)));
  });
  /* मदद-वाक्य */
  if (key === "KKB2_DATA") (D.help || []).forEach((h, hi) => {
    const m = h[0].match(/^(.*?) \(([^()]*)\)$/); if (!m) throw new Error("help का रूप बदला: " + h[0]);
    set(h, 0, m[1] + " (" + dev(m[1]) + ")", "मदद " + (hi + 1)); set(h, 1, dev(m[1].replace(/\?$/, ".")), "मदद " + (hi + 1) + " (बोलने वाला)");
  });
  if (key === "KKB_DATA") {
    const H = ["Tolong cakap perlahan-lahan.", "Cakap sekali lagi."];
    (D.help || []).forEach((h, hi) => { set(h, 0, dev(H[hi]), "मदद " + (hi + 1)); set(h, 1, dev(H[hi]), "मदद " + (hi + 1) + " (बोलने वाला)"); });
    const fix = (k, a, b) => { if (D[k].indexOf(a) >= 0) set(D, k, D[k].split(a).join(b), k); };
    fix("testStep2", "सलामत् दातांग", dev("Selamat datang")); fix("testStep2", "चाकाप् प्रलाहान्-लाहान्", dev("cakap perlahan-lahan")); fix("check1", "सलामत् दातांग", dev("Selamat datang"));
  }
  /* संस्करण-नोट (सिर्फ़ जानकारी; कोई पन्ना इसे पढ़कर कुछ नहीं बदलता) */
  const VNOTE = key === "KKB_DATA" ? "1.1 · 23-Nov-2026: e की दो आवाज़ें (26 शब्द, जावी वर्तनी और विक्षनरी से; इनमें 24 पहले चढ़ चुके) और नाम/संक्षेप हिंदी रूप में (पटना, एटीएम) · पहले: "
                                   : "1.1 · 23-Nov-2026: देवनागरी उच्चारण स्तर-1 वाले यंत्र से (generator/dhvani_yantra/ms.js) · पहले: ";
  if (String(D.version).indexOf("1.1 · 23-Nov-2026") !== 0) set(D, "version", VNOTE + D.version, "version");
  perF[rel] = n; total += n;
  return { rel, src, D, key };
});
/* मलय और हिंदी अछूते: हर string से देवनागरी-उच्चारण हटाकर पहले-बाद मिलाओ */
function skeleton(D) {
  const C = JSON.parse(JSON.stringify(D));
  C.weeks.forEach(wk => { wk.days.forEach(d => { (d.items || []).forEach(it => it[1] = ""); (d.tw || []).forEach(it => it[1] = ""); });
    ((wk.test && wk.test.lines) || []).forEach(it => it[1] = "");
    const k = s => s.replace(/ \([^()]*[ऀ-ॿ][^()]*\)$/, " ()");
    (wk.listen || []).forEach(pr => pr.forEach((s, i) => pr[i] = k(s))); (wk.dialog || []).forEach(pr => pr[1] = k(pr[1])); });
  (C.help || []).forEach(h => { h[0] = h[0].replace(/ \([^()]*\)$/, " ()").replace(/^[ऀ-ॿ\s।.,?-]+$/, ""); h[1] = ""; });
  ["testStep2", "check1"].forEach(k => { if (C[k]) C[k] = C[k].replace(/[ऀ-ॿ्]+/g, "#"); });
  C.version = String(C.version).replace(/^1\.1 · 23-Nov-2026: .*? · पहले: /, "");
  return JSON.stringify(C);
}
FILES.forEach(([rel, key], i) => {
  const w = {}; new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, rel), "utf8") + ";")(w, w, {});
  if (skeleton(w[key]) !== skeleton(out[i].D)) throw new Error("पहरा: " + rel + " में देवनागरी के सिवा कुछ और बदल जाता। कुछ नहीं लिखा।");
});
console.log("बदले खाने: " + total + " (" + Object.keys(perF).map(k => k.slice(7) + " " + perF[k]).join(" · ") + ") · मलय वाक्य और हिंदी अर्थ: अछूते (मशीन से जाँचा)");
if (LOG) console.log(log.join("\n"));
if (WRITE && total) out.forEach(({ rel, src, D, key }) => {
  const m = src.match(new RegExp("window\\." + key + "\\s*=\\s*"));
  const s2 = src.slice(0, m.index) + m[0] + JSON.stringify(D, null, 1) + ";\n";
  if (s2 !== src) { fs.writeFileSync(path.join(ROOT, rel), s2); console.log("✅ लिखा: " + rel); }
});
module.exports = { dev: dev, NAAM: NAAM, NAAM_L: NAAM_L };
