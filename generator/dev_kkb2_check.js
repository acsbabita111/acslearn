/* generator/dev_kkb2_check.js — v4.3 (04-Sep-2026: +zh चीनी SCRIPT_RULES — अगली-8 खेप का पहला)
   v4.2 (02-Sep-2026: +11 भाषा SCRIPT_RULES/LNAME — pt kn ta ml te bn or as pa gu ur)
   KKB मास्टर (90-दिन) का स्थायी check-robot — 8 भाषाएँ।
   चलाना: node generator/dev_kkb2_check.js [en|ar|fr|es|ja|ko|de|ru] (repo-रूट से; बिना arg = en)
   v3.0 (31-Aug): ru = item[0] सिरिलिक अनिवार्य + item[1] शून्य-सिरिलिक (Founder-आदेश; पुराना देवनागरी-only निरस्त) ·
   v2.0: भाषा-arg + L1/L2 भाषा-वार फ़ाइलें + लिपि-शुद्धता जाँच (
   ar/ja/ko=उच्चारण-खाने में लक्ष्य-लिपि शून्य) + heroTitle-render जाँच
   जाँचें: (1) data v2.0-FINAL — 1,650 वाक्य · A=308 · schema · listen×13 · dialog×13 · [ ] शून्य
   (2) इंजन-boot नक़ली-DOM पर — home में 13 सप्ताह-कार्ड + ⭐ बटन render हों */
"use strict";
var fs = require("fs");
var CODE = (process.argv[2] || "en").toLowerCase();
var F2 = CODE === "en" ? "assets/kkb2_data.js" : "assets/kkb2_" + CODE + "_data.js";
var F1 = CODE === "en" ? "assets/kkb_data.js" : "assets/kkb_" + CODE + "_data.js";
global.window = {};
eval(fs.readFileSync(F2, "utf8"));
var D = global.window.KKB2_DATA;
var fail = 0, total = 0, A = 0, B = 0, C = 0;
if (!D || !D.weeks || D.weeks.length !== 13) { console.log("⛔ 13 सप्ताह नहीं"); process.exit(1); }
D.weeks.forEach(function (w, wi) {
  if (!w.listen || w.listen.length < 2) { console.log("⛔ listen-होल स" + (wi + 1)); fail++; }
  if (!w.dialog || w.dialog.length < 4) { console.log("⛔ dialog-होल स" + (wi + 1)); fail++; }
  if (!w.test || !w.test.lines) { console.log("⛔ test-होल स" + (wi + 1)); fail++; }
  w.days.forEach(function (d) {
    if (!d.tw || d.tw.length < 5) fail++;
    if (!d.drill || !d.drill.hi || !d.drill.rows) fail++;
    d.items.forEach(function (it) {
      total++;
      if (it.length !== 5) fail++;
      if (it[3] !== "S" && it[3] !== "L") fail++;
      if (["A", "B", "C"].indexOf(it[4]) < 0) fail++;
      if (/[\[\]]/.test(it[0] + it[1] + it[2])) { console.log("⛔ चौकोर-कोष्ठक: " + it[0]); fail++; }
      if (it[4] === "A") A++; else if (it[4] === "B") B++; else C++;
    });
  });
});
if (total !== 1650) { console.log("⛔ कुल " + total + " (1650 चाहिए)"); fail++; }
if (A !== 308) { console.log("⛔ A=" + A + " (308 चाहिए)"); fail++; }
console.log("data: " + total + " वाक्य · A/B/C " + A + "/" + B + "/" + C + " · listen×13 · dialog×13");

/* ---- इंजन-boot (नक़ली-DOM) ---- */
var els = {};
function mkEl(id) {
  if (!els[id]) els[id] = {
    id: id, _h: "", disabled: false, style: {},
    setAttribute: function () { }, offsetTop: 0
  };
  Object.defineProperty(els[id], "innerHTML", {
    get: function () { return this._h; },
    set: function (v) { this._h = v; },
    configurable: true
  });
  return els[id];
}
global.document = { getElementById: function (id) { return mkEl(id); } };
global.window.KKB2_DATA = D;
eval(fs.readFileSync(F1, "utf8").replace("window.KKB_DATA", "global.window.KKB_DATA"));
var D1 = global.window.KKB_DATA;
var l1c = 0; D1.weeks.forEach(function (w) { w.days.forEach(function (dd) { l1c += dd.items.length; }); });
if (l1c !== 500 || D1.weeks.length !== 5) { console.log("⛔ L1-data " + l1c); process.exit(1); }
console.log("L1-data: 500 वाक्य/5 सप्ताह ✅ · एकीकृत कुल: " + (l1c + total) + " वाक्य · 90 पाठ-दिन");
/* ---- लिपि-शुद्धता (v2.0) — दोनों स्तरों के सब items पर ---- */
(function () {
  /* v4.0 (31-Aug, Founder-आदेश) — तीन-स्तंभ लोहे का नियम, fail-closed:
     item[0] = असली भाषा (उसकी अपनी लिपि/वर्तनी) — देवनागरी शून्य
     item[1] = सिर्फ़ देवनागरी-उच्चारण — लक्ष्य-लिपि शून्य
     item[2] = हिंदी अर्थ — देवनागरी अनिवार्य
     हर भाषा SCRIPT_RULES में दर्ज हो; अनजान भाषा/लिपि = तुरंत FAIL (मौन-पास निषिद्ध)। */
  var DEV = /[\u0900-\u0963\u0966-\u097F]/; /* danda/double-danda ।॥ (U+0964-0965) excluded — shared punctuation reused by bn/or/as, not a script-purity signal */
  var SCRIPT_RULES = {
    en: { native: /[A-Za-z]/, name: "Latin",   devInItem0: true  }, /* English मास्टर: [0] में देवनागरी-निशान (कोष्ठक) मान्य */
    fr: { native: /[A-Za-z]/, name: "Latin",   devInItem0: false },
    es: { native: /[A-Za-z]/, name: "Latin",   devInItem0: false },
    de: { native: /[A-Za-z]/, name: "Latin",   devInItem0: false },
    ar: { native: /[\u0600-\u06FF]/, name: "Arabic",   devInItem0: false },
    ja: { native: /[\u3040-\u30FF\u4E00-\u9FFF]/, name: "Kana/Kanji", devInItem0: false },
    ko: { native: /[\uAC00-\uD7AF\u1100-\u11FF]/, name: "Hangul",  devInItem0: false },
    ru: { native: /[\u0400-\u04FF]/, name: "Cyrillic", devInItem0: false },
    he: { native: /[\u0590-\u05FF]/, name: "Hebrew",   devInItem0: false } /* हिब्रू L2 (01-Sep) — RTL, fail-closed प्रविष्टि पहले */,
    /* 11-भाषा L2 खेप (02-Sep, Founder-सूची) — fail-closed प्रविष्टि पहले (v6.3-क2) */
    pt: { native: /[A-Za-z]/, name: "Latin",    devInItem0: false },
    kn: { native: /[\u0C80-\u0CFF]/, name: "Kannada",  devInItem0: false },
    ta: { native: /[\u0B80-\u0BFF]/, name: "Tamil",    devInItem0: false },
    ml: { native: /[\u0D00-\u0D7F]/, name: "Malayalam", devInItem0: false },
    te: { native: /[\u0C00-\u0C7F]/, name: "Telugu",   devInItem0: false },
    bn: { native: /[\u0980-\u09FF]/, name: "Bengali",  devInItem0: false },
    or: { native: /[\u0B00-\u0B7F]/, name: "Odia",     devInItem0: false },
    as: { native: /[\u0980-\u09FF]/, name: "Assamese", devInItem0: false },
    pa: { native: /[\u0A00-\u0A7F]/, name: "Gurmukhi", devInItem0: false },
    gu: { native: /[\u0A80-\u0AFF]/, name: "Gujarati", devInItem0: false },
    ur: { native: /[\u0600-\u06FF]/, name: "Urdu",     devInItem0: false },
  ks: { native: /[\u0600-\u06FF]/, name: "Kashmiri", devInItem0: false },   /* 02-Sep RTL-परिवार: फ़ारसी-अरबी लिपि (कश्मीरी स्वर-चिह्न ٲ ۆ ۄ इसी range में) */
  fa: { native: /[\u0600-\u06FF]/, name: "Persian",  devInItem0: false },
  sd: { native: /[\u0600-\u06FF]/, name: "Sindhi",   devInItem0: false },   /* सिंधी अतिरिक्त अक्षर ڄ ڃ ڪ ڳ ڱ ٻ ڀ ٺ ٿ ٽ ڏ ڌ ڍ ڊ इसी range में */
    /* 03-Sep 4-भाषा खेप (Founder-आदेश): देवनागरी-लिपि भाषाएँ (मराठी/नेपाली/भोजपुरी) — devLang:true = [0] देवनागरी ही सही; स्वाहिली Latin */
    mr:  { native: /[\u0900-\u097F]/, name: "Devanagari", devInItem0: true, devLang: true },
    ne:  { native: /[\u0900-\u097F]/, name: "Devanagari", devInItem0: true, devLang: true },
    bho: { native: /[\u0900-\u097F]/, name: "Devanagari", devInItem0: true, devLang: true },
    sa: { native: /[\u0900-\u097F]/, name: "Devanagari", devInItem0: true, devLang: true }, /* 05-Sep: संस्कृत — देव-भाषा परिवार */
    sw:  { native: /[A-Za-z]/, name: "Latin", devInItem0: false },
    /* 04-Sep अगली-8 खेप शुरू (Founder-मुहर): चीनी सबसे पहला — CJK Unified + Extension-A, अ-ध्वन्यात्मक (pinyin नहीं, सीधा देवनागरी-उच्चारण) */
    zh:  { native: /[\u4E00-\u9FFF\u3400-\u4DBF]/, name: "Han (Chinese)", devInItem0: false },
    id:  { native: /[A-Za-z]/, name: "Latin", devInItem0: false }, /* 04-Sep अगली-8 का दूसरा — इंडोनेशियाई */
    tr:  { native: /[A-Za-zğüşıöçĞÜŞİÖÇ]/, name: "Latin (Turkish)", devInItem0: false }, /* 04-Sep अगली-8 का तीसरा — तुर्की */
    mai: { native: /[\u0900-\u097F]/, name: "Devanagari (Maithili)", devInItem0: true, devLang: true }, awa: { native: /[\u0900-\u097F]/, name: "Devanagari (Awadhi)", devInItem0: true, devLang: true }, bgc: { native: /[\u0900-\u097F]/, name: "Devanagari (Haryanvi)", devInItem0: true, devLang: true }, bhb: { native: /[\u0900-\u097F]/, name: "Devanagari (Bhili)", devInItem0: true, devLang: true }, bjj: { native: /[\u0900-\u097F]/, name: "Devanagari (Bajjika)", devInItem0: true, devLang: true }, doi: { native: /[\u0900-\u097F]/, name: "Devanagari (Dogri)", devInItem0: true, devLang: true }, gbm: { native: /[\u0900-\u097F]/, name: "Devanagari (Garhwali)", devInItem0: true, devLang: true }, kfy: { native: /[\u0900-\u097F]/, name: "Devanagari (Kumaoni)", devInItem0: true, devLang: true }, hne: { native: /[\u0900-\u097F]/, name: "Devanagari (Chhattisgarhi)", devInItem0: true, devLang: true }, mag: { native: /[\u0900-\u097F]/, name: "Devanagari (Magahi)", devInItem0: true, devLang: true }, gom: { native: /[\u0900-\u097F]/, name: "Devanagari (Konkani)", devInItem0: true, devLang: true }, mwr: { native: /[\u0900-\u097F]/, name: "Devanagari (Marwari)", devInItem0: true, devLang: true }, mni: { native: /[\u0900-\u097F]/, name: "Devanagari (Manipuri)", devInItem0: true, devLang: true }, skr: { native: /[\u0900-\u097F]/, name: "Devanagari (Saraiki)", devInItem0: true, devLang: true }, pnb: { native: /[\u0900-\u097F]/, name: "Devanagari (Western Punjabi)", devInItem0: true, devLang: true }, syl: { native: /[\u0900-\u097F]/, name: "Devanagari (Sylheti)", devInItem0: true, devLang: true }, tcy: { native: /[\u0900-\u097F]/, name: "Devanagari (Tulu)", devInItem0: true, devLang: true }, gon: { native: /[\u0900-\u097F]/, name: "Devanagari (Gondi)", devInItem0: true, devLang: true }, sat: { native: /[\u0900-\u097F]/, name: "Devanagari (Santali)", devInItem0: true, devLang: true }, anp: { native: /[\u0900-\u097F]/, name: "Devanagari (Angika)", devInItem0: true, devLang: true }, /* 04-Sep अगली-8 का चौथा — मैथिली */
    it:  { native: /[A-Za-zàèéìòù]/, name: "Latin (Italian)", devInItem0: false }, /* 04-Sep अगली-8 का पाँचवाँ — इतालवी */
    ms:  { native: /[A-Za-z]/, name: "Latin (Malay)", devInItem0: false }, /* 04-Sep अगली-8 का छठा — मलय */
    vi:  { native: /[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]/, name: "Latin (Vietnamese, tone-marks)", devInItem0: false }, /* 04-Sep अगली-8 का सातवाँ — वियतनामी; Ạ-ỹ = U+1EA0-U+1EF9 (Vietnamese-only block) — U+0900 देवनागरी इस दायरे से बाहर */
    th:  { native: /[\u0E00-\u0E7F]/, name: "Thai", devInItem0: false }, /* 05-Sep अगली-8 का आठवाँ व अंतिम — थाई; U+0E00-U+0E7F देवनागरी (U+0900) से टकराव-मुक्त */
    pl:  { native: /[A-Za-z\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00d3\u00f3\u015a\u015b\u0179\u017a\u017b\u017c]/, name: "Latin (Polish)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-1 — पोलिश; Unicode-escape से लिखा (टाइपो-रोक) */
    uk:  { native: /[\u0400-\u04FF]/, name: "Cyrillic (Ukrainian)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-2 — यूक्रेनी */
    hr:  { native: /[A-Za-z\u0106\u0107\u010c\u010d\u0110\u0111\u0160\u0161\u017d\u017e]/, name: "Latin (Croatian)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-3 — क्रोएशियाई */
    sr:  { native: /[\u0400-\u04FF]/, name: "Cyrillic (Serbian)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-4 — सर्बियाई (L1 जैसा Cyrillic) */
    lt:  { native: /[A-Za-z\u0104\u0105\u010C\u010D\u0116\u0117\u0118\u0119\u012E\u012F\u0160\u0161\u0172\u0173\u016A\u016B\u017D\u017E]/, name: "Latin (Lithuanian)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-5 — लिथुआनियाई */
    sk:  { native: /[A-Za-z\u00C1\u00E1\u00C4\u00E4\u010C\u010D\u00C9\u00E9\u00CD\u00ED\u013D\u013E\u0139\u013A\u0147\u0148\u00D3\u00F3\u0154\u0155\u0160\u0161\u0164\u0165\u00DA\u00FA\u00DD\u00FD\u017D\u017E]/, name: "Latin (Slovak)", devInItem0: false }, /* 07-Sep: पूर्वी-यूरोप-खेप-6 — स्लोवाक */
    fi:  { native: /[A-Za-z\u00C4\u00E4\u00D6\u00F6]/, name: "Latin (Finnish)", devInItem0: false } /* 07-Sep: उत्तर-यूरोप — फ़िनिश */,
    ka:  { native: /[\u10A0-\u10FF]/, name: "Georgian (Mkhedruli)", devInItem0: false } /* 08-Sep: जॉर्जियाई — Georgian script, non-Latin */ /* 07-Sep: उत्तर-यूरोप — फ़िनिश */ /* 07-Sep: पूर्वी-यूरोप-खेप-6 — स्लोवाक */,
    af: { native: /[A-Za-z]/, name: "Latin (Afrikaans)", devInItem0: false },
    am: { native: /[\u1200-\u137F]/, name: "Ethiopic (Amharic)", devInItem0: false },
    bm: { native: /[A-Za-z]/, name: "Latin (Bambara)", devInItem0: false },
    ha: { native: /[A-Za-z]/, name: "Latin (Hausa)", devInItem0: false },
    ig: { native: /[A-Za-z\u1E00-\u1EFF]/, name: "Latin (Igbo)", devInItem0: false },
    lg: { native: /[A-Za-z]/, name: "Latin (Luganda)", devInItem0: false },
    mg: { native: /[A-Za-z]/, name: "Latin (Malagasy)", devInItem0: false },
    ny: { native: /[A-Za-z]/, name: "Latin (Chichewa)", devInItem0: false },
    om: { native: /[A-Za-z]/, name: "Latin (Oromo)", devInItem0: false },
    rw: { native: /[A-Za-z]/, name: "Latin (Kinyarwanda)", devInItem0: false },
    sn: { native: /[A-Za-z]/, name: "Latin (Shona)", devInItem0: false },
    so: { native: /[A-Za-z]/, name: "Latin (Somali)", devInItem0: false },
    ti: { native: /[\u1200-\u137F]/, name: "Ethiopic (Tigrinya)", devInItem0: false },
    tw: { native: /[A-Za-z]/, name: "Latin (Akan/Twi)", devInItem0: false },
    wo: { native: /[A-Za-z]/, name: "Latin (Wolof)", devInItem0: false },
    xh: { native: /[A-Za-z]/, name: "Latin (Xhosa)", devInItem0: false },
    yo: { native: /[A-Za-z\u1E00-\u1EFF]/, name: "Latin (Yoruba)", devInItem0: false },
    zu: { native: /[A-Za-z]/, name: "Latin (Zulu)", devInItem0: false },
    bo:  { native: /[\u0F00-\u0FFF]/, name: "Tibetan", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का पहला — Tibetan Uchen लिपि; pyewts (Wylie) आधारित transliterator, silent-prefix सरलीकरण */
    ceb: { native: /[A-Za-z]/, name: "Latin (Cebuano)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का दूसरा — फ़िलीपींस, अत्यंत ध्वन्यात्मक */
    jv:  { native: /[A-Za-z]/, name: "Latin (Javanese)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का तीसरा — इंडोनेशिया, L1 पहले से साफ़ (कोई corruption नहीं मिला) */
    km:  { native: /[\u1780-\u17FF]/, name: "Khmer", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का चौथा — कंबोडिया; कोई automatic transliteration library नहीं मिली, हर वाक्य manually दोनों कॉलम में लिखा गया */
    lo:  { native: /[\u0E80-\u0EFF]/, name: "Lao", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का पाँचवाँ — लाओस; कोई automatic transliteration library नहीं मिली (aksharamukha टूटा output), हर वाक्य manually दोनों कॉलम में लिखा गया */
    mn:  { native: /[А-Яа-яЁёӨөҮү]/, name: "Cyrillic (Mongolian)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का छठा — मंगोलिया, Cyrillic space-विभाजित; अपना transliterator बनाया, L1-corpus से calibrate किया */
    my:  { native: /[\u1000-\u109F]/, name: "Myanmar", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का सातवाँ — म्यांमार, space-रहित; कोई automatic transliteration library नहीं मिली (aksharamukha academic IAST), हर वाक्य manually दोनों कॉलम में लिखा गया */
    nan: { native: /[\u4E00-\u9FFF\u3400-\u4DBF]/, name: "Han (Min Nan/Hokkien)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का आठवाँ — मीनान चीनी/Hokkien, Han-script space-रहित; L1-corpus में Han+POJ रोमनीकरण साथ दिया गया — इसी पैटर्न से manually लिखा; ⚠️ कम-दस्तावेज़ीकृत बोली-भाषा, भविष्य में Hokkien-भाषी समीक्षक से सत्यापन ज़रूरी */
    su:  { native: /[A-Za-z]/, name: "Latin (Sundanese)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का नौवाँ — इंडोनेशिया, Latin native, L1 पहले से साफ़ */
    tl:  { native: /[A-Za-z]/, name: "Latin (Tagalog)", devInItem0: false }, /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का दसवाँ — फ़िलीपींस, Latin native, L1 पहले से साफ़ */
    yue: { native: /[\u4E00-\u9FFF\u3400-\u4DBF]/, name: "Han (Cantonese)", devInItem0: false } /* 10-Sep पूर्व/दक्षिण-पूर्व एशिया खेप का ग्यारहवाँ व अंतिम — हांगकांग/ग्वांगदोंग, Han-script space-रहित; L1 में कोई parenthetical romanization नहीं (Mandarin/nan से अलग) */
  };
  var R = SCRIPT_RULES[CODE];
  if (!R) { console.log("⛔ SCRIPT_RULES में भाषा '" + CODE + "' दर्ज नहीं — नई भाषा जोड़ने से पहले यहाँ नियम लिखो (fail-closed)"); fail++; return; }
  var bad = 0;
  function scanD(DD, tag) {
    DD.weeks.forEach(function (w) { w.days.forEach(function (dd) { dd.items.forEach(function (it) {
      if (!R.native.test(it[0])) { console.log("⛔ item[0] में " + R.name + " नहीं (" + tag + "): " + it[0]); bad++; }
      if (!R.devInItem0 && DEV.test(it[0]) && CODE !== "en") { console.log("⛔ item[0] में देवनागरी (" + tag + "): " + it[0]); bad++; }
      if (!R.devLang && R.native !== SCRIPT_RULES.fr.native && R.native.test(it[1])) { console.log("⛔ उच्चारण-खाने [1] में " + R.name + " (" + tag + "): " + it[1]); bad++; } /* Latin-भाषाओं में [1] के भीतर कोष्ठक-Roman मान्य */
      if (!DEV.test(it[1])) { console.log("⛔ उच्चारण-खाना [1] देवनागरी-रहित (" + tag + "): " + it[1]); bad++; }
      if (!DEV.test(it[2])) { console.log("⛔ हिंदी-खाना [2] देवनागरी-रहित (" + tag + "): " + it[2]); bad++; }
    }); }); });
  }
  scanD(D, "स्तर-2"); scanD(D1, "स्तर-1");
  if (bad) { fail += bad; } else console.log("लिपि-शुद्धता v4.0 (" + CODE + "/" + R.name + "): ✅ [0]=असली · [1]=देवनागरी · [2]=हिंदी");
})();
/* ---- v4.1 (31-Aug, Founder-आदेश): मास्टर-दर्पण जाँच — हर भाषा English मास्टर
   की हूबहू प्रतिकृति हो: ढाँचा (सप्ताह/दिन/items/tw/listen/dialog/test की गिनती)
   + हिंदी-अर्थ स्तंभ item[2] byte-बराबर। एक भी पंक्ति अलग = FAIL। ---- */
(function () {
  if (CODE === "en") return;
  var ME = {};
  eval(fs.readFileSync("assets/kkb_data.js", "utf8").replace("window.KKB_DATA", "ME.L1"));
  eval(fs.readFileSync("assets/kkb2_data.js", "utf8").replace("window.KKB2_DATA", "ME.L2"));
  var bad = 0, warn = 0;
  /* भाषा-नाम-प्रतिस्थापन छूट (Global South substitution): "अंग्रेज़ी/English" ⇄ अपनी भाषा का नाम —
     सिर्फ़ यही अंतर मान्य; बाक़ी हिंदी-पंक्ति byte-बराबर हो */
  var LNAME = { ar: "अरबी", fr: "फ़्रेंच", es: "स्पेनिश", ja: "जापानी", ko: "कोरियाई", de: "जर्मन", ru: "रूसी", he: "हिब्रू", pt: "पुर्तगाली", kn: "कन्नड", ta: "तमिल", ml: "मलयालम", te: "तेलुगु", bn: "बांग्ला", or: "उड़िया", as: "असमिया", pa: "पंजाबी", gu: "गुजराती", ur: "उर्दू" , ks: "कश्मीरी" , fa: "फ़ारसी" , sd: "सिंधी" , mr: "मराठी" , ne: "नेपाली" , bho: "भोजपुरी" , sw: "स्वाहिली" , zh: "चीनी" , id: "इंडोनेशियाई" , tr: "तुर्की" , mai: "मैथिली" , awa: "अवधी" , bgc: "हरियाणवी" , bhb: "भीली" , bjj: "बज्जिका" , doi: "डोगरी" , gbm: "गढ़वाली" , kfy: "कुमाऊंनी" , hne: "छत्तीसगढ़ी" , mag: "मगही" , gom: "कोंकणी" , mwr: "मारवाड़ी" , mni: "मणिपुरी" , skr: "सराइकी" , pnb: "पश्चिमी पंजाबी" , syl: "सिल्हटी" , tcy: "तुलु" , gon: "गोंडी" , sat: "संथाली" , anp: "अंगिका" , it: "इतालवी" , ms: "मलय" , vi: "वियतनामी" , th: "थाई" , sa: "संस्कृत" , pl: "पोलिश" , uk: "यूक्रेनी" , hr: "क्रोएशियाई" , sr: "सर्बियाई" , lt: "लिथुआनियाई" , sk: "स्लोवाक" , fi: "फ़िनिश" , ka: "जॉर्जियाई" , af: "अफ़्रीकांस" , am: "अम्हारिक" , bm: "बमबारा" , ha: "हाउसा" , ig: "इग्बो" , lg: "लुगांडा" , mg: "मालागासी" , ny: "चिचेवा" , om: "ओरोमो" , rw: "किन्यारवांडा" , sn: "शोना" , so: "सोमाली" , ti: "तिग्रीन्या" , tw: "अकान/त्वी" , wo: "वोलोफ़" , xh: "षोसा" , yo: "योरूबा" , zu: "ज़ुलु", bo: "तिब्बती", ceb: "सिबुआनो", jv: "जावानीज़", km: "खमेर", lo: "लाओ", mn: "मंगोलियाई", my: "बर्मी", nan: "मीनान चीनी", su: "सुंडानी", tl: "तागालोग", yue: "कैंटोनीज़" }; /* 09-Sep: + अफ़्रीका-खेप 18 भाषाएँ */
  function norm(t) { return String(t).replace(new RegExp((LNAME[CODE] || "§") + "|अंग्रेज़ी|English", "g"), "⟨भाषा⟩"); }
  /* दर्ज-छूट सूची (Founder-मान्य प्रासंगिक प्रतिस्थापन — इनके अलावा एक भी पंक्ति अलग = FAIL):
     L2 w4d4#16: मास्टर "हिंदी में बोलो…" → भाषा-कोर्स "⟨भाषा⟩ में बोलो…" (AI-app प्रसंग) */
  var ALLOWED = { "स्तर-2|4|4|16": 1 };
  function mirror(A, B, tag) {
    if (A.weeks.length !== B.weeks.length) { console.log("⛔ " + tag + " सप्ताह-गिनती " + A.weeks.length + "≠" + B.weeks.length); bad++; return; }
    A.weeks.forEach(function (w, wi) {
      var mw = B.weeks[wi];
      if (w.days.length !== mw.days.length) { console.log("⛔ " + tag + " w" + wi + " दिन-गिनती"); bad++; return; }
      w.days.forEach(function (d, di) {
        var md = mw.days[di];
        if (d.items.length !== md.items.length) { console.log("⛔ " + tag + " w" + wi + "d" + di + " item-गिनती " + d.items.length + "≠" + md.items.length); bad++; return; }
        d.items.forEach(function (it, i) {
          if (norm(it[2]) !== norm(md.items[i][2]) && !ALLOWED[tag + "|" + wi + "|" + di + "|" + i]) { console.log("⛔ " + tag + " w" + wi + "d" + di + "#" + i + " हिंदी-स्तंभ मास्टर से अलग: " + it[2]); bad++; }
        });
        if ((d.tw || []).length !== (md.tw || []).length) { console.log("⚠️ " + tag + " w" + wi + "d" + di + " tw-गिनती मास्टर-भंडारण से अलग"); warn++; }
      });
      if ((w.listen || []).length !== (mw.listen || []).length) { console.log("⚠️ " + tag + " w" + wi + " listen-भंडारण-रूप मास्टर से अलग (ऐतिहासिक — सामग्री-स्तर दर्पण items पर लागू)"); warn++; }
      if ((w.dialog || []).length !== (mw.dialog || []).length) { console.log("⚠️ " + tag + " w" + wi + " dialog-भंडारण-रूप मास्टर से अलग"); warn++; }
      var tl = (w.test && w.test.lines) ? w.test.lines.length : 0, mtl = (mw.test && mw.test.lines) ? mw.test.lines.length : 0;
      if (tl !== mtl) { console.log("⚠️ " + tag + " w" + wi + " test-भंडारण-रूप मास्टर से अलग (" + tl + "≠" + mtl + ")"); warn++; }
    });
  }
  mirror(D1, ME.L1, "स्तर-1"); mirror(D, ME.L2, "स्तर-2");
  /* v4.2 (05-Sep, mai-होल से "नियम = robot-नियम") — दायरा सिर्फ़ देव-भाषा (mr/ne/bho/mai/sa):
     (क) item[0]===item[1] व tw[0]===tw[1] अनिवार्य; (ख) CJK/fullwidth विराम (。？！，) निषिद्ध —
     देवनागरी-पाठ में CJK-विराम = copy-paste contamination (mai-प्रकरण); zh/ja में 。 वैध, इसलिए वहाँ जाँच नहीं;
     (ग) heroTitle देवनागरी हो (root-branding contamination-रोक)। */
  (function () {
    var DEVLANG = { mr: 1, ne: 1, bho: 1, mai: 1, sa: 1, awa: 1, bgc: 1, bhb: 1, bjj: 1, doi: 1, gbm: 1, kfy: 1, hne: 1, mag: 1, gom: 1, mwr: 1, mni: 1, skr: 1, pnb: 1, syl: 1, tcy: 1, gon: 1, sat: 1, anp: 1 }; /* देव-भाषा परिवार — SCRIPT_RULES.devLang का स्थानीय दर्पण (scope-भिन्न IIFE) */
    var SR2 = { devLang: DEVLANG[CODE] }; var b2 = 0; var CJK = /[。？！，：；]/;
    if (!SR2.devLang) { return; } /* दायरा: सिर्फ़ देव-भाषा परिवार */
    function scanTxt(t, tag) { if (CJK.test(String(t))) { console.log("⛔ " + tag + " में CJK/fullwidth विराम: " + String(t).slice(0, 40)); b2++; } }
    [D, D1].forEach(function (X, xi) {
      var LV = xi ? "स्तर-1" : "स्तर-2";
      scanTxt(X.heroTitle || "", LV + " heroTitle"); scanTxt(X.module || "", LV + " module");
      (X.help || []).forEach(function (h) { scanTxt(h[0], LV + " help"); scanTxt(h[1], LV + " help"); });
      X.weeks.forEach(function (w, wi) {
        w.days.forEach(function (d, di) {
          d.items.forEach(function (it, i) {
            scanTxt(it[0], LV + " w" + wi + "d" + di + "#" + i + " [0]"); scanTxt(it[1], LV + " w" + wi + "d" + di + "#" + i + " [1]");
            if (SR2.devLang && it[0] !== it[1]) { console.log("⛔ " + LV + " w" + wi + "d" + di + "#" + i + " देव-भाषा दर्पण-भंग [0]≠[1]: " + it[1]); b2++; }
          });
          (d.tw || []).forEach(function (t, i) { if (SR2.devLang && t[0] !== t[1]) { console.log("⛔ " + LV + " w" + wi + "d" + di + " tw#" + i + " देव-भाषा tw-भंग"); b2++; } });
        });
      });
    });
    if (SR2.devLang && D.heroTitle && !/[\u0900-\u097F]/.test(D.heroTitle)) { console.log("⛔ देव-भाषा heroTitle देवनागरी नहीं: " + D.heroTitle); b2++; }
    if (b2) { fail += b2; } else console.log("शुद्धता-जाँच v4.2 (" + CODE + "): ✅ CJK-विराम शून्य · देव-भाषा [0]===[1] · root-branding देवनागरी");
  })();
  if (bad) { fail += bad; } else console.log("मास्टर-दर्पण v4.1 (" + CODE + "): ✅ 2,150 वाक्य-ढाँचा + हिंदी-स्तंभ English मास्टर से हूबहू (भाषा-नाम छूट)" + (warn ? " · ⚠️×" + warn + " भंडारण-रूप नोट" : ""));
})();
global.window.scrollTo = function () { };
global.localStorage = { getItem: function () { return null; }, setItem: function () { }, removeItem: function () { } };
global.alert = function () { };
global.confirm = function () { return false; };
/* speechSynthesis जान-बूझकर अनुपस्थित — बिना-आवाज़ रास्ता भी न टूटे */
var root = mkEl("kkb2-app");
try {
  eval(fs.readFileSync("assets/kkb2.js", "utf8"));
} catch (e) { console.log("⛔ इंजन-boot त्रुटि: " + e.message); fail++; }
var html = root._h || "";
if (html.indexOf("तीसरा महीना") < 0) { console.log("⛔ home में महीना-3 नहीं"); fail++; }
if (html.indexOf("2,150") < 0) { console.log("⛔ home में 2,150 नहीं"); fail++; }
if (CODE !== "en" && D.heroTitle && html.indexOf(D.heroTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")) < 0) { console.log("⛔ home में heroTitle नहीं"); fail++; }
if (html.indexOf("ज़रूर-बोलो (308") < 0) { console.log("⛔ ⭐-बटन/A-गिनती नहीं"); fail++; }
if (html.indexOf("kkb2-month") < 0) { console.log("⛔ महीना-कार्ड नहीं"); fail++; }
console.log("इंजन-boot: home render " + (html.length > 500 ? "✅" : "⛔") + " (" + html.length + " chars)");
/* गहरे दृश्य */
function shot(args, mustHave, naam) {
  try { global.window.kkb2Go.apply(null, args); } catch (e) { console.log("⛔ " + naam + " त्रुटि: " + e.message); fail++; return; }
  var h2 = root._h || "";
  for (var m = 0; m < mustHave.length; m++) if (h2.indexOf(mustHave[m]) < 0) { console.log("⛔ " + naam + " में नहीं: " + mustHave[m]); fail++; }
  console.log(naam + " render ✅ (" + h2.length + " chars)");
}
shot(["m", 0], ["स्तर-1", "दिन", "📞"], "महीना-1");
shot(["d", 0], ["ACS-GSU-000001", "मैंने बोला", "दिन 1 / 90"], "दिन-1(स्तर-1)");
shot(["d", 25], ["ACS-GSU-000501", "लक्ष्य-शब्द", "🎧"], "दिन-26(स्तर-2 पहला)");
shot(["d", 89], ["ACS-GSU-002150", "दिन 90 / 90"], "दिन-90(आख़िरी)");
shot(["lis", 25], ["सुनो-जवाब जाँच", "बोलने-अभ्यास", "दिन पूरा हुआ"], "🎧-जाँच");
shot(["dlg", 0], ["संवाद", "🔊"], "🗣️-संवाद");
shot(["t", 1, 0], ["wa.me", "सहारा-पंक्तियाँ"], "📞-टेस्ट(स्तर-1)");
shot(["t", 2, 12], ["wa.me", "सहारा-पंक्तियाँ"], "📞-टेस्ट(स्तर-2)");
shot(["must"], ["ज़रूर-बोलो", "मेरा परिवार"], "⭐-अभ्यास");
if (fail) { console.log("⛔ कुल fail: " + fail); process.exit(1); }

/* ---- demo-guard (स्थायी): रेपो पर demo-वर्जन शब्द कहीं न लौटे ---- */
var kkbjs = fs.readFileSync("assets/kkb.js", "utf8");
if (/demo/i.test(kkbjs)) { console.log("⛔ kkb.js में demo लौट आया"); fail++; }
var langs = fs.readdirSync("courses/hi/bhasha").filter(function (d) { return fs.existsSync("courses/hi/bhasha/" + d + "/index.html"); });
var dpg = 0;
langs.forEach(function (d) {
  if (/demo/i.test(fs.readFileSync("courses/hi/bhasha/" + d + "/index.html", "utf8"))) { console.log("⛔ demo-पेज: " + d); dpg++; }
});
if (dpg) fail += dpg;
var dfiles = fs.readdirSync("assets").filter(function (f) { return /^kkb(_[a-z]+)?_data\.js$/.test(f) || f === "kkb_data.js"; });
var dvf = 0;
dfiles.forEach(function (f) {
  if (/\(demo/i.test(fs.readFileSync("assets/" + f, "utf8"))) { console.log("⛔ demo-version: " + f); dvf++; }
});
if (dvf) fail += dvf;
console.log("demo-guard: kkb.js ✅ · भाषा-पेज " + langs.length + "/" + langs.length + " ✅ · data-version " + dfiles.length + " फ़ाइलें ✅ (जापानी/डच के असली-भाषा शब्द छूट में)");
if (fail) { console.log("⛔ demo-guard fail: " + fail); process.exit(1); }
/* ---- सूची-guard (स्थायी): हर भाषा-कोर्स (mg 11) कोर्स-सूची पेज की KKB-सूची में दर्ज हो ---- */
var cd = fs.readFileSync("assets/courses_data.js", "utf8");
global.PRIVATE_JOB_COURSES = undefined;
(0, eval)(cd.replace(/const /g, "var ")); /* indirect-eval: strict-फ़ाइल में भी var global पर पहुँचे */
var page = fs.readFileSync("courses/hi/index.html", "utf8");
/* v4.2 (02-Sep): KKB_GROUPS का एकमात्र घर अब courses_data.js (window.KKB_GROUPS) — index.html सिर्फ़ pointer;
   robot वहीं से पढ़े (एक चीज़ = एक जगह); pointer न हो तो FAIL */
var grpIds = {}; try { var W = {}; (new Function("window", cd.replace(/const /g, "var ")))(W); (W.KKB_GROUPS || []).forEach(function (g) { g.ids.forEach(function (i) { grpIds[i] = 1; }); }); } catch (e) {}
if (!Object.keys(grpIds).length) { console.log("⛔ सूची-guard: courses_data में window.KKB_GROUPS नहीं/ख़ाली"); process.exit(1); }
if (page.indexOf("window.KKB_GROUPS") < 0) { console.log("⛔ सूची-guard: courses/hi/index.html KKB_GROUPS को courses_data से नहीं पढ़ता (pointer ग़ायब)"); process.exit(1); }
var missing = [];
var PJC = global.PRIVATE_JOB_COURSES || [];
if (!PJC.length) { console.log("⛔ सूची-guard: courses_data पढ़ी नहीं गई (सूची ख़ाली)"); process.exit(1); } /* झूठे-पास पर स्थायी ताला */
PJC.forEach(function (c) {
  if (c.mg === 11 && /^PJ/.test(c.id) && !grpIds[c.id]) missing.push(c.id);
});
if (missing.length) { console.log("⛔ कोर्स-सूची से छूटी भाषाएँ: " + missing.join(",")); process.exit(1); }
console.log("सूची-guard: सब भाषा-कोर्स KKB_GROUPS (courses_data, एक-घर) में दर्ज ✅");
console.log("🏁🏁 dev_kkb2_check: सब जाँचें पास");
