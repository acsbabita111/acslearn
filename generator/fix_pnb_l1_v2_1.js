/* generator/fix_pnb_l1_v2_1.js — एक-बार मरम्मत (09-Oct-2026)
   काम: kkb_pnb_data.js (L1) को परिवार-ढाँचे (मास्टर-दर्पण v6.3-क6) पर लाना —
   (1) week = {n, title, hi, days, test} — n व hi जुड़े, test-खाना (5 ब्लॉक) जुड़ा
   (2) day = {title, items} — फालतू day.n हटा
   (3) हर item का hi-स्तंभ = English-मास्टर का hi (सिर्फ़ "अंग्रेज़ी"→lang.label छूट)
   (4) हर item की दिशा (S/L) = मास्टर की दिशा (123 बेमेल बंद)
   item[0] (Shahmukhi) व item[1] (देवनागरी-उच्चारण) byte-अछूते रहते हैं। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
function load(rel, key) { global.window = {}; delete require.cache[require.resolve(path.join(ROOT, rel))]; require(path.join(ROOT, rel)); return global.window[key]; }

const EN = load("assets/kkb_data.js", "KKB_DATA");
const P  = load("assets/kkb_pnb_data.js", "KKB_DATA");
const LABEL = P.lang.label; /* पश्चिमी पंजाबी */

/* 5 साप्ताहिक test-ब्लॉक — ur-साँचे का पंजाबी-रूप; हर पंक्ति pnb-कोर्स की स्थापित शब्दावली से */
const TESTS = [
 { target: "अपनी मोबाइल कंपनी का customer care",
   goal: "IVR में पंजाबी चुनिए, अपना परिचय दीजिए और बैलेंस पूछिए।",
   lines: [
    ["سلام۔", "सलाम।"],
    ["میرا ناں ___ اے۔", "मेरा नां ___ ऐ।"],
    ["میرا بیلنس کنا اے؟", "मेरा बैलेंस किन्ना ऐ?"],
    ["مہربانی کر کے ہولی بولو۔", "मेहरबानी कर के होली बोलो।"],
    ["مہربانی کر کے دبارہ آکھو۔", "मेहरबानी कर के दुबारा आखो।"],
    ["شکریہ۔", "शुक्रिया।"]
   ] },
 { target: "अपनी मोबाइल कंपनी का customer care",
   goal: "रीचार्ज प्लान और उसकी कीमत पूछिए।",
   lines: [
    ["سلام، مینوں ری چارج کروانا اے۔", "सलाम, मैनूं रीचार्ज करवाणा ऐ।"],
    ["اک مہینے دا ری چارج کنے دا اے؟", "इक महीने दा रीचार्ज किन्ने दा ऐ?"],
    ["سستا پلان اے؟", "सस्ता प्लान ऐ?"],
    ["مہربانی کر کے دبارہ آکھو۔", "मेहरबानी कर के दुबारा आखो।"],
    ["ٹھیک اے، شکریہ۔", "ठीक ऐ, शुक्रिया।"]
   ] },
 { target: "मोबाइल कंपनी या internet कंपनी का customer care",
   goal: "एक मुश्किल बताइए और हल समझिए।",
   lines: [
    ["سلام، اک مشکل اے۔", "सलाम, इक मुश्किल ऐ।"],
    ["میرا انٹرنیٹ کم نہیں کر رہیا۔", "मेरा इंटरनेट कम्म नहीं कर रहिआ।"],
    ["میں کیہ کراں؟", "मैं कीह करां?"],
    ["مہربانی کر کے دبارہ سمجھاؤ۔", "मेहरबानी कर के दुबारा समझाओ।"],
    ["ٹھیک اے، میں کر لواں گا۔", "ठीक ऐ, मैं कर लवांगा।"],
    ["شکریہ۔", "शुक्रिया।"]
   ] },
 { target: "अपने बैंक का customer care",
   goal: "बैलेंस पूछिए या ATM कार्ड की मुश्किल बताइए।",
   lines: [
    ["سلام، مینوں اپنا بیلنس جاننا اے۔", "सलाम, मैनूं अपणा बैलेंस जाणना ऐ।"],
    ["میرا کارڈ کم نہیں کر رہیا۔", "मेरा कार्ड कम्म नहीं कर रहिआ।"],
    ["مہربانی کر کے میرا اکاؤنٹ ویکھو۔", "मेहरबानी कर के मेरा अकाउंट वेखो।"],
    ["نمبر دبارہ آکھو۔", "नंबर दुबारा आखो।"],
    ["مدد لئی شکریہ۔", "मदद लई शुक्रिया।"]
   ] },
 { target: "कोई भी customer care (मोबाइल, बैंक या online shopping)",
   goal: "पूरी बातचीत पंजाबी में: सलाम, अपना नाम, मुश्किल, दोहराने की गुज़ारिश, शुक्रिया।",
   lines: [
    ["سلام۔ میں ___ آں۔", "सलाम। मैं ___ आं।"],
    ["میں پٹنہ توں فون کر رہیا آں۔", "मैं पटना तों फ़ोन कर रहिआ आं।"],
    ["میرے ___ وچ مشکل اے۔", "मेरे ___ विच मुश्किल ऐ।"],
    ["کیہ تسی مینوں سن رہے او؟", "कीह तुसी मैनूं सुन रहे ओ?"],
    ["نمبر دبارہ آکھو۔", "नंबर दुबारा आखो।"],
    ["نہیں، بس اینا ای۔ شکریہ۔", "नहीं, बस एना ई। शुक्रिया।"]
   ] }
];

/* पहरा: गिनती-मिलान */
if (EN.weeks.length !== 5 || P.weeks.length !== 5) { console.error("⛔ सप्ताह-गिनती बेमेल"); process.exit(1); }

let touched0 = 0, dirFix = 0, hiFix = 0;
const weeks = P.weeks.map((W, wi) => {
  const WE = EN.weeks[wi];
  if (W.days.length !== WE.days.length) { console.error("⛔ सप्ताह-" + (wi + 1) + " दिन-गिनती बेमेल"); process.exit(1); }
  const days = W.days.map((D, di) => {
    const DE = WE.days[di];
    if (D.title !== DE.title) { console.error("⛔ दिन-शीर्षक बेमेल w" + (wi + 1) + "d" + (di + 1)); process.exit(1); }
    if (D.items.length !== DE.items.length) { console.error("⛔ item-गिनती बेमेल w" + (wi + 1) + "d" + (di + 1)); process.exit(1); }
    const items = D.items.map((it, ii) => {
      const a = DE.items[ii];
      const hi = a[2].replace(/अंग्रेज़ी/g, LABEL);
      if (hi !== it[2]) hiFix++;
      if (a[3] !== it[3]) dirFix++;
      if (it[0] !== D.items[ii][0]) touched0++;
      return [it[0], it[1], hi, a[3]];
    });
    return { title: D.title, items: items };
  });
  return { n: wi + 1, title: WE.hi, hi: WE.hi, days: days, test: TESTS[wi] };
});

const OUT = {
  module: P.module, version: "2.1", lang: P.lang, brand: P.brand, sub: P.sub, help: P.help,
  testShort: P.testShort, testStep1: P.testStep1, testStep2: P.testStep2, check1: P.check1,
  weeks: weeks, status_note: P.status_note
};

const header = "// kkb_pnb_data.js v2.1 — पश्चिमी पंजाबी (Shahmukhi) L1, 500 वाक्य\n" +
 "// v2.1 (09-Oct-2026): परिवार-ढाँचा मरम्मत — week{n,title,hi,test} + day{title,items} + hi/दिशा मास्टर-दर्पण; item[0]/[1] byte-अछूते\n";
fs.writeFileSync(path.join(ROOT, "assets/kkb_pnb_data.js"), header + "window.KKB_DATA = " + JSON.stringify(OUT, null, 1) + ";\n");
console.log("✅ लिखा: assets/kkb_pnb_data.js v2.1 | hi-सुधार:", hiFix, "| दिशा-सुधार:", dirFix, "| item[0] छेड़े:", touched0, "(0 होना चाहिए)");
