/* generator/fix_pnb_l2_v2_1.js — एक-बार मरम्मत (09-Oct-2026)
   काम: kkb2_pnb_data.js (L2) को परिवार-ढाँचे (मास्टर-दर्पण v6.3-क6) पर लाना —
   (1) week = {n, title, hi, pace, days, test, listen, dialog} — n/hi/pace जुड़े
   (2) 13 साप्ताहिक test-ब्लॉक जुड़े (81 पंक्तियाँ): 70 सीधे pnb-भंडार की उसी
       EN-स्थिति से उठीं, 11 corpus-पुष्ट शब्दावली से हाथ-लिखीं
   (3) हर item का hi = मास्टर-hi (अंग्रेज़ी→"पश्चिमी पंजाबी"), दिशा = मास्टर-दिशा
   (4) item[1] (उच्चारण) से Perso-Arabic विराम (؟/۔/،) की सफ़ाई — अक्षर मिले तो FAIL
   item[0] (Shahmukhi) byte-अछूता; listen/dialog/tw का भंडारण-रूप यथावत (⚠️-छूट)। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
function load(rel, key) { global.window = {}; delete require.cache[require.resolve(path.join(ROOT, rel))]; require(path.join(ROOT, rel)); return global.window[key]; }

const EN1 = load("assets/kkb_data.js", "KKB_DATA");
const EN2 = load("assets/kkb2_data.js", "KKB2_DATA");
const P1  = load("assets/kkb_pnb_data.js", "KKB_DATA");
const P   = load("assets/kkb2_pnb_data.js", "KKB2_DATA");
const LABEL = "पश्चिमी पंजाबी";

/* EN-वाक्य → उसी स्थिति का pnb item (test-पंक्ति भंडार-लुकअप) */
function norm(s){ return String(s).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, " ").trim(); }
const MAP = {};
function add(enD, pD){ enD.weeks.forEach((w, wi) => w.days.forEach((d, di) => d.items.forEach((a, ii) => {
  const b = pD.weeks[wi].days[di].items[ii]; if (!b) return; const k = norm(a[0]); if (!MAP[k]) MAP[k] = [b[0], b[1]];
}))); }
add(EN1, P1); add(EN2, P);

/* 11 छूटी पंक्तियों के हाथ-लिखे pnb-रूप (हर शब्द corpus-पुष्ट) */
const HAND = {
 [norm("Yesterday I worked for ten hours.")]: ["میں کل دس گھنٹے کم کیتا۔", "मैं कल्ल दस घंटे कम्म कीता।"],
 [norm("I always wake up at five.")]: ["میں ہمیشہ پنج وجے اُٹھناں آں۔", "मैं हमेशा पंज वजे उठनां आं।"],
 [norm("How is your health?")]: ["تہاڈی طبیعت کیویں اے؟", "तुहाडी तबीअत कीवें ऐ?"],
 [norm("Take your medicine on time.")]: ["اپنی دوائی ویلے سر لؤ۔", "अपणी दवाई वेले सर लओ।"],
 [norm("I am a welder, I have five years of experience.")]: ["میں ویلڈر آں، مینوں پنج ورھیاں دا تجربہ اے۔", "मैं वेल्डर आं, मैनूं पंज वर्हियां दा तजरबा ऐ।"],
 [norm("Check the message on your phone.")]: ["اپنے فون تے سندیشہ ویکھو۔", "अपणे फ़ोन ते संदेशा वेखो।"],
 [norm("Three months ago English was a wall for me.")]: ["تن مہینے پہلاں پنجابی میرے لئی اک کندھ سی۔", "तिन्न महीने पहलां पंजाबी मेरे लई इक्क कंध सी।"],
 [norm("I learned thirty sentences every day.")]: ["میں روز تیہ فقرے سکھے۔", "मैं रोज़ तीह फ़िकरे सिखे।"],
 [norm("I gave a phone interview in English.")]: ["میں پنجابی وچ فون انٹرویو دتا۔", "मैं पंजाबी विच फ़ोन इंटरव्यू दित्ता।"],
 [norm("I learned the visa interview answers.")]: ["میں ویزا انٹرویو دے جواب سکھے۔", "मैं वीज़ा इंटरव्यू दे जवाब सिखे।"]
};

let fromCorpus = 0, fromHand = 0;
function pnbTest(enTest){
  const lines = enTest.lines.map(l => {
    const k = norm(l[0]);
    if (MAP[k]) { fromCorpus++; return [MAP[k][0], MAP[k][1]]; }
    if (HAND[k]) { fromHand++; return HAND[k].slice(); }
    console.error("⛔ test-पंक्ति का pnb-रूप नहीं: " + l[0]); process.exit(1);
  });
  const swap = s => String(s).replace(/English/g, "पंजाबी").replace(/अंग्रेज़ी/g, "पंजाबी");
  return { target: swap(enTest.target), goal: swap(enTest.goal), lines: lines };
}

/* पहरे */
if (EN2.weeks.length !== 13 || P.weeks.length !== 13) { console.error("⛔ सप्ताह-गिनती"); process.exit(1); }

let dirFix = 0, hiFix = 0, punctFix = 0, touched0 = 0;
const weeks = P.weeks.map((W, wi) => {
  const WE = EN2.weeks[wi];
  if (W.days.length !== WE.days.length) { console.error("⛔ w" + (wi + 1) + " दिन-गिनती"); process.exit(1); }
  const days = W.days.map((D, di) => {
    const DE = WE.days[di];
    if (D.items.length !== DE.items.length) { console.error("⛔ w" + (wi + 1) + "d" + (di + 1) + " item-गिनती"); process.exit(1); }
    const items = D.items.map((it, ii) => {
      const a = DE.items[ii];
      const hi = a[2].replace(/अंग्रेज़ी/g, LABEL);
      if (hi !== it[2]) hiFix++;
      if (a[3] !== it[3]) dirFix++;
      let pron = String(it[1]);
      if (/[\u0600-\u06FF]/.test(pron)) {
        const cleaned = pron.replace(/\u061F/g, "?").replace(/\u06D4/g, "।").replace(/\u060C/g, ",");
        if (/[\u0600-\u06FF]/.test(cleaned)) { console.error("⛔ उच्चारण में Perso-Arabic अक्षर w" + (wi + 1) + "d" + (di + 1) + "#" + ii + ": " + pron); process.exit(1); }
        pron = cleaned; punctFix++;
      }
      if (it[0] !== D.items[ii][0]) touched0++;
      const out = [it[0], pron, hi, a[3]];
      return out;
    });
    const nd = { title: DE.title.replace(/अंग्रेज़ी/g, LABEL), items: items };
    if (D.tw) nd.tw = D.tw; /* tw यथावत */
    return nd;
  });
  return { n: wi + 1, title: WE.hi.replace(/अंग्रेज़ी/g, LABEL), hi: WE.hi.replace(/अंग्रेज़ी/g, LABEL), pace: WE.pace,
           days: days, test: pnbTest(WE.test), listen: W.listen || [], dialog: W.dialog || [] };
});

const OUT = { module: P.module, version: "2.1", lang: P.lang, brand: P.brand, sub: P.sub,
              testGoalHi: P.testGoalHi, weeks: weeks, status_note: P.status_note };

const header = "// kkb2_pnb_data.js v2.1 — पश्चिमी पंजाबी (Shahmukhi) L2, 1650 वाक्य + tw/listen/dialog/test\n" +
 "// v2.1 (09-Oct-2026): परिवार-ढाँचा मरम्मत — week{n,title,hi,pace,test} + 13 test-ब्लॉक (81 पंक्तियाँ) +\n" +
 "// hi/दिशा मास्टर-दर्पण + उच्चारण-खाने की Perso-Arabic विराम-सफ़ाई; item[0] byte-अछूता\n";
fs.writeFileSync(path.join(ROOT, "assets/kkb2_pnb_data.js"), header + "window.KKB2_DATA = " + JSON.stringify(OUT, null, 1) + ";\n");
console.log("✅ लिखा: kkb2_pnb_data.js v2.1 | hi-सुधार:", hiFix, "| दिशा-सुधार:", dirFix, "| विराम-सफ़ाई:", punctFix,
            "| test-पंक्तियाँ: भंडार", fromCorpus, "+ हाथ", fromHand, "= ", fromCorpus + fromHand, "| item[0] छेड़े:", touched0);
