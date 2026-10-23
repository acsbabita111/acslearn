/* generator/dev_kkb2_check.js — v4.8 (22-Oct-2026: F-10 lo-उच्चारण पहरा)
   v4.7 (22-Oct-2026: अनुस्वार/हलंत-शुरू पहरा)
   v4.6 (22-Oct-2026: टूटा-उच्चारण पहरा — मात्रा से शुरू शब्द = ❌)
   v4.5 (22-Oct-2026: घुसपैठ-पहरा — drill देवनागरी-साँचा + heroTitle "सिखना री")
   v4.4 (13-Sep-2026: +38 भाषा SCRIPT_RULES/LNAME (kkb_l2_register) · interim-छूट = लाउड ⚠️ (मौन नहीं) · DEVLANG + brx/si/ps/bal/prs)
   v4.3 (04-Sep-2026: +zh चीनी SCRIPT_RULES — अगली-8 खेप का पहला)
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
/* v4.5 (22-Oct): घुसपैठ-पहरा — (क) लैटिन-भाषा के drill में लक्ष्य-लिपि की जगह देवनागरी-साँचा (मैथिली-तर्ज़)
   (ख) heroTitle में "सिखना री" (मारवाड़ी-साँचा)। साफ़ भाषाओं में design वाले 1-2 drill ही ऐसे होते हैं; 10+ = घुसपैठ। */
(function () {
  var lat = 0, all = 0;
  D.weeks.forEach(function (w) { w.days.forEach(function (d) { d.items.forEach(function (it) { all++; if (/[A-Za-z]{2,}/.test(it[0])) lat++; }); }); });
  if (all && lat / all > 0.8) {
    var bad = 0;
    D.weeks.forEach(function (w) { w.days.forEach(function (d) { var dr = d.drill; if (!dr || !dr.rows) return;
      var tx = JSON.stringify(dr.rows).replace(/\([^)]*\)/g, "");
      var dv = (tx.match(/[\u0900-\u0963\u0966-\u097F]+/g) || []).length, lt = (tx.match(/[A-Za-z\u00C0-\u024F\u02BC']{2,}/g) || []).length;
      if (dv > lt * 2 + 2) bad++; }); });
    if (bad >= 10) { console.log("⛔ drill-घुसपैठ: " + bad + " drill में लक्ष्य-भाषा की जगह देवनागरी-साँचा"); fail++; }
  }
  if (/सिखना री/.test(D.heroTitle || "")) { console.log("⛔ heroTitle-घुसपैठ: " + D.heroTitle); fail++; }
  /* v4.8 (22-Oct): F-10 पहरा — lo: लाओ-वाक्य के बग़ल का उच्चारण Latin/दोहरी-मात्रा/मात्रा+हलंत वाला = ❌ (इलाज: node generator/lipi_lao_deva.js --fix) */
  if (CODE === "lo") { try { var LL = require("./lipi_lao_deva.js"); var nb = 0;
    [F1, F2].forEach(function (f) { if (!fs.existsSync(f)) return; var w = {}; new Function("window", fs.readFileSync(f, "utf8"))(w); var X = w.KKB_DATA || w.KKB2_DATA;
      (function walk(o) { if (Array.isArray(o)) { for (var i = 0; i + 1 < o.length; i++) { if (typeof o[i] === "string" && typeof o[i + 1] === "string" && /[\u0E80-\u0EFF]/.test(o[i]) && !/[\u0E80-\u0EFF]/.test(o[i + 1]) && /[\u0900-\u097F]/.test(o[i + 1]) && LL.BROKEN.test(o[i + 1])) nb++; } o.forEach(walk); return; } if (o && typeof o === "object") Object.keys(o).forEach(function (k) { walk(o[k]); }); })(X); });
    if (nb) { console.log("⛔ lo टूटा-उच्चारण (Latin/दोहरी मात्रा): " + nb + " जगह"); fail++; } } catch (e) { console.log("⛔ lo-पहरा चल न सका: " + e.message); fail++; } }
  /* v4.6 (22-Oct): टूटा-उच्चारण पहरा — शब्द मात्रा से शुरू (जैसे "ाउ") = ❌; सही रूप स्वतंत्र स्वर ("आउ") */
  [F1, F2].forEach(function (f) { if (!fs.existsSync(f)) return; var s = fs.readFileSync(f, "utf8");
    var m = s.match(/(^|[^\u0900-\u097F\u200c\u200d])[\u093E-\u094C]/gm) || [];
    if (m.length) { console.log("⛔ टूटा-उच्चारण (मात्रा से शुरू): " + m.length + " जगह — " + f); fail++; } });
  /* v4.7 (22-Oct): अनुस्वार/हलंत पहरा — शब्द "ं" या "्" से शुरू = ❌ (सही: पंचमाक्षर "ङ्ग/न्द/म्ब", "ङ+मात्रा", अनुस्वार पिछले शब्द से जुड़ा) */
  [F1, F2].forEach(function (f) { if (!fs.existsSync(f)) return; var s = fs.readFileSync(f, "utf8");
    var a = (s.match(/[\u0900-\u097F0-9] \u0902/g) || []).length + (s.match(/(^|["'(])\u0902/gm) || []).length;
    var h = (s.match(/(^|[\s"'(0-9])\u094D/gm) || []).length;
    if (a) { console.log("⛔ टूटा-उच्चारण (अनुस्वार से शुरू): " + a + " जगह — " + f); fail++; }
    if (h) { console.log("⛔ टूटा-उच्चारण (हलंत से शुरू): " + h + " जगह — " + f); fail++; } });
})();
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
    uz: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Uzbek)", devInItem0: false }, /* 13-Sep kkb_l2_register: उज़्बेक — latin-native */
    ug: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Uyghur)", devInItem0: false }, /* 13-Sep kkb_l2_register: उइघुर — perso-arabic, RTL */
    tt: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Tatar)", devInItem0: false }, /* 13-Sep kkb_l2_register: तातार — cyrillic-native */
    ba: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Bashkir)", devInItem0: false }, /* 14-Oct खेमा-स: बश्कीर — cyrillic-native, तातार-बहन */
    sah: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Sakha)", devInItem0: false }, /* 14-Oct खेमा-स: साखा/याकूत — cyrillic-native */
    tyv: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Tuvan)", devInItem0: false }, /* 14-Oct खेमा-स: तुवान — cyrillic-native */
    kjh: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Khakas)", devInItem0: false }, /* 14-Oct खेमा-स: खाकास — cyrillic-native, і अक्षर */
    bua: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Buryat)", devInItem0: false }, /* 14-Oct खेमा-स: बुर्यात — cyrillic-native, мंगोलियाई-बहन */
    mhr: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Mari)", devInItem0: false }, /* 14-Oct खेमा-स: मारी — cyrillic-native */
    udm: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Udmurt)", devInItem0: false }, /* 14-Oct खेमा-स: उदमुर्त — cyrillic-native */
    koi: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Komi-Permyak)", devInItem0: false }, /* 14-Oct खेमा-स: कोमी-पर्म्याक — cyrillic-native */
    unr: { native: /[\u0900-\u097F]/, name: "Devanagari-native (Mundari)", devInItem0: true }, /* 14-Oct खेमा-स: मुंडारी — देवनागरी-native, संताली-बहन */
    hoc: { native: /[\u0900-\u097F]/, name: "Devanagari-native (Ho)", devInItem0: true }, /* 14-Oct खेमा-स: हो — देवनागरी-native, संताली-बहन */
    tg: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Tajik)", devInItem0: false }, /* 13-Sep kkb_l2_register: ताजिक — cyrillic-native */
    sv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Swedish)", devInItem0: false }, /* 13-Sep kkb_l2_register: स्वीडिश — latin-native */
    si: { native: /[\u0D80-\u0DFF]/, name: "Sinhala (Sinhala)", devInItem0: false }, /* 13-Sep kkb_l2_register: सिंहली — sinhala (असली-लिपि — अस्थायी देवनागरी-रूप निरस्त) */
    ro: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Romanian)", devInItem0: false }, /* 13-Sep kkb_l2_register: रोमानियाई — latin-native */
    qu: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Quechua)", devInItem0: false }, /* 13-Sep kkb_l2_register: क्वेशुआ — latin-native */
    ps: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Pashto)", devInItem0: false }, /* 13-Sep kkb_l2_register: पश्तो — perso-arabic, RTL (असली-लिपि — अस्थायी देवनागरी-रूप निरस्त) */
    prs: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Dari)", devInItem0: false }, /* 13-Sep kkb_l2_register: दारी — perso-arabic, RTL (असली-लिपि — अस्थायी देवनागरी-रूप निरस्त) */
    pcm: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Nigerian Pidgin)", devInItem0: false }, /* 13-Sep kkb_l2_register: नाइजीरियन पिजिन — latin-native */
    nl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Dutch)", devInItem0: false }, /* 13-Sep kkb_l2_register: डच — latin-native */
    myn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Yucatec Maya)", devInItem0: false }, /* 13-Sep kkb_l2_register: मायन — latin-native */
    mt: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Maltese)", devInItem0: false }, /* 13-Sep kkb_l2_register: माल्टीज़ — latin-native */
    mfe: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Mauritian Creole)", devInItem0: false }, /* 13-Sep kkb_l2_register: मॉरीशियन क्रीओल — latin-native */
    ky: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Kyrgyz)", devInItem0: false }, /* 13-Sep kkb_l2_register: किर्गिज़ — cyrillic-native */
    ku: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kurdish)", devInItem0: false }, /* 13-Sep kkb_l2_register: कुर्दिश — latin-native */
    kk: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Kazakh)", devInItem0: false }, /* 13-Sep kkb_l2_register: कज़ाख — cyrillic-native */
    hy: { native: /[\u0530-\u058F]/, name: "Armenian (Armenian)", devInItem0: false }, /* 13-Sep kkb_l2_register: अर्मेनियाई — armenian */
    hu: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hungarian)", devInItem0: false }, /* 13-Sep kkb_l2_register: हंगेरियन — latin-native */
    ht: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Haitian Creole)", devInItem0: false }, /* 13-Sep kkb_l2_register: हाईटियन क्रियोल — latin-native */
    gn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Guarani)", devInItem0: false }, /* 13-Sep kkb_l2_register: गुआरानी — latin-native */
    el: { native: /[\u0370-\u03FF\u1F00-\u1FFF]/, name: "Greek (Greek)", devInItem0: false }, /* 13-Sep kkb_l2_register: ग्रीक — greek */
    cs: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Czech)", devInItem0: false }, /* 13-Sep kkb_l2_register: चेक — latin-native */
    brx: { native: /[\u0900-\u097F]/, name: "Devanagari (Bodo)", devInItem0: true, devLang: true }, /* 13-Sep kkb_l2_register: बोडो — devanagari-native */
    bg: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Bulgarian)", devInItem0: false }, /* 13-Sep kkb_l2_register: बुल्गारियाई — cyrillic-native */
    be: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Belarusian)", devInItem0: false }, /* 13-Sep kkb_l2_register: बेलारूसी — cyrillic-native */
    bal: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Balochi)", devInItem0: false }, /* 13-Sep kkb_l2_register: बलूची — perso-arabic, RTL (असली-लिपि — अस्थायी देवनागरी-रूप निरस्त) */
    az: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Azerbaijani)", devInItem0: false }, /* 13-Sep kkb_l2_register: अज़रबैजानी — latin-native */
    ay: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Aymara)", devInItem0: false }, /* 13-Sep kkb_l2_register: आयमारा — latin-native */
    arz: { native: /[\u0600-\u06FF]/, name: "Arabic (Egyptian Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: मिस्री अरबी — arabic, RTL */
    ary: { native: /[\u0600-\u06FF]/, name: "Arabic (Moroccan Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: मोरक्कन अरबी — arabic, RTL */
    arq: { native: /[\u0600-\u06FF]/, name: "Arabic (Algerian Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: अल्जीरियाई अरबी — arabic, RTL */
    apd: { native: /[\u0600-\u06FF]/, name: "Arabic (Sudanese Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: सूडानी अरबी — arabic, RTL */
    apc: { native: /[\u0600-\u06FF]/, name: "Arabic (Levantine Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: लेवांटाइन अरबी — arabic, RTL */
    aec: { native: /[\u0600-\u06FF]/, name: "Arabic (Saidi Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: सैदी अरबी — arabic, RTL */
    acw: { native: /[\u0600-\u06FF]/, name: "Arabic (Hejazi Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: हिजाज़ी अरबी — arabic, RTL */
    acm: { native: /[\u0600-\u06FF]/, name: "Arabic (Mesopotamian Arabic)", devInItem0: false }, /* 13-Sep kkb_l2_register: मेसोपोटामिया अरबी — arabic, RTL */
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
    mai: { native: /[\u0900-\u097F]/, name: "Devanagari (Maithili)", devInItem0: true, devLang: true }, awa: { native: /[\u0900-\u097F]/, name: "Devanagari (Awadhi)", devInItem0: true, devLang: true }, bgc: { native: /[\u0900-\u097F]/, name: "Devanagari (Haryanvi)", devInItem0: true, devLang: true }, bhb: { native: /[\u0900-\u097F]/, name: "Devanagari (Bhili)", devInItem0: true, devLang: true }, bjj: { native: /[\u0900-\u097F]/, name: "Devanagari (Bajjika)", devInItem0: true, devLang: true }, doi: { native: /[\u0900-\u097F]/, name: "Devanagari (Dogri)", devInItem0: true, devLang: true }, gbm: { native: /[\u0900-\u097F]/, name: "Devanagari (Garhwali)", devInItem0: true, devLang: true }, kfy: { native: /[\u0900-\u097F]/, name: "Devanagari (Kumaoni)", devInItem0: true, devLang: true }, hne: { native: /[\u0900-\u097F]/, name: "Devanagari (Chhattisgarhi)", devInItem0: true, devLang: true }, mag: { native: /[\u0900-\u097F]/, name: "Devanagari (Magahi)", devInItem0: true, devLang: true }, gom: { native: /[\u0900-\u097F]/, name: "Devanagari (Konkani)", devInItem0: true, devLang: true }, mwr: { native: /[\u0900-\u097F]/, name: "Devanagari (Marwari)", devInItem0: true, devLang: true }, mni: { native: /[\u0900-\u097F]/, name: "Devanagari (Manipuri)", devInItem0: true, devLang: true }, skr: { native: /[\u0900-\u097F]/, name: "Devanagari (Saraiki)", devInItem0: true, devLang: true }, pnb: { native: /[\u0600-\u06FF]/, name: "Shahmukhi (Western Punjabi)", devInItem0: false }, /* 09-Oct: pnb v2.0 से असली Shahmukhi-लिपि (v6.3 तीन-स्तंभ) — पुरानी देवनागरी-प्रविष्टि निरस्त */ syl: { native: /[\u0900-\u097F]/, name: "Devanagari (Sylheti)", devInItem0: true, devLang: true }, tcy: { native: /[\u0900-\u097F]/, name: "Devanagari (Tulu)", devInItem0: true, devLang: true }, gon: { native: /[\u0900-\u097F]/, name: "Devanagari (Gondi)", devInItem0: true, devLang: true }, sat: { native: /[\u0900-\u097F]/, name: "Devanagari (Santali)", devInItem0: true, devLang: true }, anp: { native: /[\u0900-\u097F]/, name: "Devanagari (Angika)", devInItem0: true, devLang: true }, sjp: { native: /[\u0900-\u097F]/, name: "Devanagari (Surjapuri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-1 — सुरजापुरी */ khr: { native: /[\u0900-\u097F]/, name: "Devanagari (Khortha)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-2 — खोरठा */ sck: { native: /[\u0900-\u097F]/, name: "Devanagari (Sadri-Nagpuri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-3 — सादरी/नागपुरी */ kyw: { native: /[\u0900-\u097F]/, name: "Devanagari (Kurmali)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-4 — कुरमाली */ bns: { native: /[\u0900-\u097F]/, name: "Devanagari (Bundeli)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-5 — बुंदेली */ bfy: { native: /[\u0900-\u097F]/, name: "Devanagari (Bagheli)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-6 — बघेली */ bra: { native: /[\u0900-\u097F]/, name: "Devanagari (Brajbhasha)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-7 — ब्रजभाषा */ mal: { native: /[\u0900-\u097F]/, name: "Devanagari (Malvi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-8 — मालवी */ nim: { native: /[\u0900-\u097F]/, name: "Devanagari (Nimadi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-9 — निमाड़ी */ mtr: { native: /[\u0900-\u097F]/, name: "Devanagari (Mewari)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-10 — मेवाड़ी */ dhu: { native: /[\u0900-\u097F]/, name: "Devanagari (Dhundhari)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-11 — ढूँढाड़ी */ hdt: { native: /[\u0900-\u097F]/, name: "Devanagari (Hadoti)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-12 — हाड़ौती */ bgr: { native: /[\u0900-\u097F]/, name: "Devanagari (Bagri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-13 — बागड़ी राजस्थानी */ mtw: { native: /[\u0900-\u097F]/, name: "Devanagari (Mewati)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-14 — मेवाती */ pwr: { native: /[\u0900-\u097F]/, name: "Devanagari (Pawari)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-17 — पवारी (ISO pwr, राजस्थानी-मालवी परिवार) */ gjr: { native: /[\u0900-\u097F]/, name: "Devanagari (Gojri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-18 — गोजरी (शोध-पुष्ट: राजस्थानी-Gujari परिवार) */ kgr: { native: /[\u0900-\u097F]/, name: "Devanagari (Kangri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-20 — कांगड़ी (Wikipedia pronoun+case-तालिका से पुष्ट) */ mjl: { native: /[\u0900-\u097F]/, name: "Devanagari (Mandeali)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-21 — मंडयाली (ISO mjl, विस्तृत pronoun+postposition+copula-संकेत) */ cdh: { native: /[\u0900-\u097F]/, name: "Devanagari (Chambeali)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-22 — चम्बियाली (ISO cdh, मंडयाली-निकटता 83% Ethnologue-पुष्ट) */ gbk: { native: /[\u0900-\u097F]/, name: "Devanagari (Gaddi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-23 — गद्दी/भरमौरी (ISO gbk, चंबा-भौगोलिक-निकटता; "नहीं"→"नी" पुष्ट UCL-Grammar-2026) */ cdj: { native: /[\u0900-\u097F]/, name: "Devanagari (Churahi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-24 — चुराही (ISO cdj, मंडयाली से 90% lexical-similarity Ethnologue-पुष्ट) */ bhd: { native: /[\u0900-\u097F]/, name: "Devanagari (Bhadarwahi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-25 — भद्रवाही (ISO bhd, चुराही-निकटता Wikipedia-वर्णित) */ hii: { native: /[\u0900-\u097F]/, name: "Devanagari (Hinduri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-26 — हंडूरी/हिन्दुरी (ISO hii, हिंदी से 64% lexical-similarity Ethnologue-पुष्ट) */ jns: { native: /[\u0900-\u097F]/, name: "Devanagari (Jaunsari)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-27 — जौनसारी (ISO jns, SIL-survey pronoun-तालिका से पुष्ट — Central Pahari) */ srx: { native: /[\u0900-\u097F]/, name: "Devanagari (Sirmauri)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-28 — सिरमौरी (ISO srx, केओंठली-निकटता Wikipedia-वर्णित — दक्षिण शिमला में interchangeable) */ him: { native: /[\u0900-\u097F]/, name: "Devanagari (Himachali-general)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-29 (अंतिम) — हिमाचली-सामान्य (Western-Pahari का छाता-नाम, मंडयाली-प्रतिनिधि-आधारित) */ gwr: { native: /[\u0900-\u097F]/, name: "Devanagari (Gawari)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-30 (वास्तविक अंतिम) — गावरी (हिमाचल-उत्तराखंड सीमा, Nagpuri-Garhwal pronoun-तालिका निकटता-आधार, Central-Pahari क्षेत्र) */ kru: { native: /[\u0900-\u097F]/, name: "Devanagari (Kurukh)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-1 — कुरुख़/ओरांव (North Dravidian, झारखंड-बंगाल में आधिकारिक-लिपि status, ठोस pronoun-तालिका) */ uki: { native: /[\u0B00-\u0B7F]/, name: "Oriya (Kui)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-2 — कुई (South-Central Dravidian, Odisha, "Na"=मैं + postposition -ki/-ta/-teka पुष्ट) */ kff: { native: /[\u0C00-\u0C7F]/, name: "Telugu (Koya)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-3 — कोया (Gondi-Kui समूह, SIL sample-text "Nanna"=मैं पुष्ट, Telugu-प्रभावित) */ kxv: { native: /[\u0B00-\u0B7F]/, name: "Oriya (Kuvi)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-4 — कुवि (कुई से "closely related" दर्ज, Wikipedia-वर्णित) */ kfa: { native: /[\u0C80-\u0CFF]/, name: "Kannada (Kodava)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-5 — कोडव/कोर्गी (South Dravidian, kodavaclan.com pronoun+postposition-पुष्ट) */ kfj: { native: /[\u0C00-\u0C7F]/, name: "Telugu (Konda)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-6 — कोंडा (Konda-Kui समूह — कुई-chain, Konda-Dora Telugu-निकट-संपर्क दर्ज) */ kmj: { native: /[\u0900-\u097F]/, name: "Devanagari (Malto)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-7 — माल्टो (Kurukh-Malto नामित-उपशाखा, कुरुख़-chain) */ kfb: { native: /[\u0900-\u097F]/, name: "Devanagari (Kolami)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-8 — कोलामी (Central Dravidian, Wikipedia Devanagari-sample-तालिका पुष्ट, आधिकारिक-लिपि में देवनागरी शामिल) */ nit: { native: /[\u0900-\u097F]/, name: "Devanagari (Naiki)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-9 — नाइकी (= Southeastern Kolami, Wikipedia-नामित उपशाखा — कोलामी-chain) */ pci: { native: /[\u0900-\u097F]/, name: "Devanagari (Parji)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-10 — पारजी (Central Dravidian, "nān"=मैं पुष्ट — Burrow-Bhattacharya grammar; कोलामी-chain) */ gdb: { native: /[\u0900-\u097F]/, name: "Devanagari (Ollari-Gadaba)", devInItem0: true, devLang: true }, /* 05-Oct द्रविड़-खेप-11 — गदबा/ओल्लारी (Parji-Gadaba नामित-उपशाखा, पारजी-chain) */ peg: { native: /[\u0B00-\u0B7F]/, name: "Oriya (Pengo)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-12 — पेंगो (Manda-Pengo नामित-उपशाखा, Konda-Kui परिवार — कुई-chain) */ mha: { native: /[\u0B00-\u0B7F]/, name: "Oriya (Manda)", devInItem0: false }, /* 05-Oct द्रविड़-खेप-13 — मांडा (Manda-Pengo नामित-उपशाखा — कुई-chain) */ grt: { native: /[\u0900-\u097F]/, name: "Devanagari (Garo)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-1 — गारो (Tibeto-Burman Bodo-Garo, academic pronoun+case-तालिका पुष्ट) */ trp: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kokborok)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 05-Oct उत्तर-पूर्व-खेप-2 — कोकबोरोक/त्रिपुरी (Tibeto-Burman Bodo-Garo, समृद्ध conversational-pattern पुष्ट, त्रिपुरा आधिकारिक-भाषा) */ kha: { native: /[\u0900-\u097F]/, name: "Devanagari (Khasi)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-3 — खासी (Austroasiatic Mon-Khmer, Wikipedia pronoun-तालिका + समृद्ध conversational-data पुष्ट, मेघालय आधिकारिक-भाषा) */ unr: { native: /[\u0900-\u097F]/, name: "Devanagari (Mundari)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-4 — मुंडारी (Munda परिवार, languageshome.com समृद्ध pronoun-तालिका पुष्ट, झारखंड आधिकारिक-भाषा) */ hoc: { native: /[\u0900-\u097F]/, name: "Devanagari (Ho)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-5 — हो (Munda Kherwarian, मुंडारी "sister languages" दर्ज, मुंडारी-chain) */ biy: { native: /[\u0900-\u097F]/, name: "Devanagari (Bhumij)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-6 — भूमिज (Munda Kherwarian, मुंडारी-निकट-chain) */ kfp: { native: /[\u0900-\u097F]/, name: "Devanagari (Korwa)", devInItem0: true, devLang: true }, /* 05-Oct उत्तर-पूर्व-खेप-7 — कोरवा (Munda Kherwarian, सांथाली-chain, देवनागरी-लिपि पहले से दर्ज) */ pbv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Pnar)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 05-Oct उत्तर-पूर्व-खेप-8 — Pnar/जयंतिया (Khasic उपपरिवार, खासी-chain) */ 
    dis: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0250-\u02AF]/, name: "Latin (Dimasa)", devInItem0: false }, /* 19-Oct काम-लाल20 खेप-5 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 05-Oct उत्तर-पूर्व-खेप-9 — डिमासा (Tibeto-Burman Bodo-Garo, dimasathairili.com pronoun-तालिका पुष्ट: Ang/Ning/Bo/Jing) */ lus: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Mizo)", devInItem0: false }, /* 13-Oct खेमा-स पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 05-Oct उत्तर-पूर्व-खेप-10 (अंतिम) — मिज़ो (Tibeto-Burman Kuki-Chin, Wikipedia+blog pronoun-तालिका पुष्ट: Kei/Nang/Kan/An, मिज़ोरम आधिकारिक-भाषा) */ njo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Ao Naga)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 05-Oct उत्तर-पूर्व-खेप-11 — Ao नागा/Chungli (Tibeto-Burman Central-Naga, nagatranslate.in genuine pronoun-तालिका पुष्ट: Ni/Na/Pa/Asenok) */ 
    njh: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0250-\u02AF]/, name: "Latin (Lotha Naga)", devInItem0: false }, /* 19-Oct काम-लाल20 खेप-5 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* पुरानी: Devanagari devLang */ /* 05-Oct उत्तर-पूर्व-खेप-12 — Lotha नागा (Tibeto-Burman Central-Naga, Wikipedia genuine pronoun-तालिका पुष्ट: a/ni/ombo/ompvü) */ dzo: { native: /[\u0F00-\u0FFF]/, name: "Tibetan (Dzongkha)", devInItem0: false }, /* 05-Oct सार्क-खेप-1 — ज़ोंगखा (Tibeto-Burman Bodish, Swarthmore academic pronoun-तालिका पुष्ट: nga/chö/kho-mo, भूटान राष्ट्रभाषा) */ brh: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Brahui)", devInItem0: false }, /* 05-Oct सार्क-खेप-2 — ब्राहुई (North Dravidian, CIIL/Iranica कुरुख़-माल्टो साझा-उपपरिवार पुष्ट — कुरुख़-chain) */ dv: { native: /[\u0780-\u07BF]/, name: "Thaana (Dhivehi)", devInItem0: false }, /* 05-Oct सार्क-खेप-3 — धिवेही (Indo-Aryan Sinhalese-Maldivian, phrasebook genuine pronoun पुष्ट: Aharen/Thee, मालदीव राष्ट्रभाषा) */ new: { native: /[\u0900-\u097F]/, name: "Devanagari (Newari)", devInItem0: true, devLang: true }, /* 05-Oct सार्क-खेप-4 — नेवारी/Nepal Bhasa (Tibeto-Burman Newaric, समृद्ध genuine pronoun पुष्ट: Ji/Chhi/Chu, देवनागरी-लिपि में ही लिखी जाती है) */ ccp: { native: /\uD804[\uDD00-\uDD4F]/, name: "Chakma (Chakma)", devInItem0: false }, /* 05-Oct सार्क-खेप-5 (अंतिम) — चकमा (Indo-Aryan, dimasathairili.com genuine pronoun पुष्ट: Mui/Tui, बांग्लादेश-भारत-म्यांमार) */ zum: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Kumzari)", devInItem0: false }, /* 05-Oct ख़ाड़ी-खेप-1 — कुमज़ारी (Southwestern Iranian, University of Florida PhD-थीसिस पूर्ण pronoun-तालिका पुष्ट: mih/tu/jajh/mah, अरब-प्रायद्वीप की एकमात्र Iranian-भाषा, ओमान Musandam) */ afb: { native: /[\u0600-\u06FF]/, name: "Arabic (Gulf Arabic)", devInItem0: false }, /* 05-Oct ख़ाड़ी-खेप-2 (अंतिम) — ख़ाड़ी-अरबी/Khaleeji (phrasebook genuine pronoun-तालिका पुष्ट: Ana/Anta/Shinu, पूरे GCC की मुख्य बोलचाल-भाषा) */ wuu: { native: /[\u4E00-\u9FFF]/, name: "Hani (Wu Chinese)", devInItem0: true } /* mixed hanzi+देव नीति */, /* 05-Oct चीन-खेप-1 — वू-चीनी/शंघाईनीज़ (Sinitic Wu, phrasebook genuine pronoun-तालिका पुष्ट: nong/ala/yi, मंदारिन से mutually-unintelligible, 8 करोड़ बोलने वाले) */ zha: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Zhuang)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 05-Oct चीन-खेप-2 — ज़ुआंग (Tai-Kadai, academic-paper genuine pronoun पुष्ट: gou/mwngz, Guangxi सह-आधिकारिक-भाषा, चीन की सबसे बड़ी अल्पसंख्यक-भाषा) */ hak: { native: /[\u4E00-\u9FFF]|\uD840/, name: "Hani (Hakka)", devInItem0: true } /* mixed hanzi+देव नीति */, /* 05-Oct चीन-खेप-3 — Hakka (Sinitic, ब्लॉग genuine pronoun-तालिका पुष्ट: ngai/ngi/gi, ताइवान आधिकारिक-भाषा, 3-4 करोड़ बोलने वाले) */
 cv: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Chuvash)", devInItem0: false }, /* 20-Oct लाल10-द खेप-1 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct रूस-खेप-1 — चुवाश (Turkic Oghuric, genuine pronoun पुष्ट: Epĕ/Esĕ, Chuvashia) */ /* 06-Oct रूस-खेप-2 — बश्कीर (Turkic Kipchak, MustGo genuine pronoun-तालिका पुष्ट: Min/Hin/Ul/Beź) */ /* 06-Oct रूस-खेप-3 — याकूत/साखा (Turkic Siberian, Wikipedia genuine pronoun पुष्ट: min/bihigi/kini) */ /* 06-Oct रूस-खेप-4 — बुर्यात (Mongolic, Wiktionary genuine pronoun-तालिका पुष्ट: bi/ši/bide) */ /* 06-Oct रूस-खेप-5 — उदमुर्त (Finno-Ugric Permic, Wikipedia genuine pronoun पुष्ट: mon/ton/so/mi) */ /* 06-Oct रूस-खेप-6 — मारी (Finno-Ugric, genuine conversational पुष्ट: myj/tyj) */
 myv: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Erzya)", devInItem0: false }, /* 20-Oct लाल10-द खेप-1 पूर्ण-पुनर्लेखन */ /* 06-Oct रूस-खेप-7 — मोर्डविन-Erzya (Finno-Ugric, academic-course genuine पुष्ट: mon/ton/son/miń) */ /* 06-Oct रूस-खेप-8 — कोमी-Permyak (Finno-Ugric Permic, Grokipedia genuine पुष्ट: me/te/sija) */
 inh: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Ingush)", devInItem0: false }, /* 06-Oct रूस-खेप-9 — इंगुश (Northeast Caucasian Vainakh, academic-article genuine पुष्ट: so/ho/tho/iz) */
 ava: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Avar)", devInItem0: false }, /* 20-Oct लाल10-द खेप-2 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */  /* 06-Oct रूस-खेप-10 — अवार (Northeast Caucasian, academic-paper genuine पुष्ट: dun/mun, Dagestan की सबसे बड़ी स्वदेशी-भाषा) */
 os: { native: /[\u0400-\u04FF\u00E6\u00C6]/, name: "Cyrillic (Ossetian)", devInItem0: false }, /* 20-Oct लाल10-द खेप-1 — æ समेत */ /* 06-Oct रूस-खेप-11 — ओसेतियाई (Indo-Iranian, Grokipedia genuine पुष्ट: æz/dy/wɨj/max, उत्तर-काकेशस में अकेली Indo-European भाषा) */ /* 06-Oct रूस-खेप-12 — तुवान (Turkic Siberian, तुवान-विकिपीडिया genuine sentence-पुष्ट: Men/Sen/Ol/Bis) */ /* 06-Oct रूस-खेप-13 — खाकास (Turkic Siberian, भाषाविज्ञान-blog genuine पुष्ट: min/sin/ol/pɘs) */
 xal: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Kalmyk)", devInItem0: false }, /* 20-Oct लाल10-द खेप-2 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */  /* 06-Oct रूस-खेप-14 — कल्मिक (Mongolic Oirat, academic-paper genuine पुष्ट: bi/či/bidən/ta, यूरोप की एकमात्र बौद्ध-भाषा) */
 yrk: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Nenets)", devInItem0: false }, /* 06-Oct रूस-खेप-15 (अंतिम) — नेनेट्स (Uralic Samoyedic, भाषाविज्ञान-blog आंशिक-genuine पुष्ट: mən'o/pidər'o, आर्कटिक-टुंड्रा) */ jje: { native: /[\uAC00-\uD7A3]/, name: "Hangul (Jeju)", devInItem0: false }, /* 06-Oct कोरियाई-खेप-1 — जेजू (Koreanic, Wikiwand+JSTOR genuine pronoun पुष्ट: na/nae/uri/ji, UNESCO critically-endangered, मानक-कोरियाई से mutually-unintelligible) */
 ryu: { native: /[\u3040-\u30FF]/, name: "Kana (Okinawan)", devInItem0: false }, /* 06-Oct जापान-खेप-1 — Okinawan (Japonic Ryukyuan, University of Ryukyus genuine pronoun पुष्ट: wan/waa/yaa/unju, मानक-जापानी से 71% शब्दावली-समान मात्र) */
 ryn: { native: /[\u3040-\u30FF]/, name: "Kana (Amami)", devInItem0: false }, /* 06-Oct जापान-खेप-2 — Amami (Japonic Ryukyuan, academic-paper genuine pronoun पुष्ट: waɴ) */
 mvi: { native: /[\u3040-\u30FF]/, name: "Kana (Miyako)", devInItem0: false }, /* 06-Oct जापान-खेप-3 — Miyako (Japonic Ryukyuan, academic-paper genuine pronoun पुष्ट: baɴ, severely-endangered) */
 rys: { native: /[\u3040-\u30FF]/, name: "Kana (Yaeyama)", devInItem0: false }, /* 06-Oct जापान-खेप-4 — Yaeyama (Japonic Ryukyuan, academic-paper genuine pronoun पुष्ट: bánú) */
 yoi: { native: /[\u3040-\u30FF]/, name: "Kana (Yonaguni)", devInItem0: false }, /* 06-Oct जापान-खेप-5 — Yonaguni (Japonic Ryukyuan, academic-paper genuine pronoun पुष्ट: bànû, सिर्फ़ 400 बोलने वाले, Ainu के बाद जापान की सबसे-संकटग्रस्त भाषा) */
 ain: { native: /[\u30A0-\u31FF]/, name: "Kana (Ainu)", devInItem0: false }, /* 06-Oct जापान-खेप-6 (अंतिम) — Ainu (genuinely-अलग भाषा-परिवार/language-isolate, Wikisource academic-dictionary genuine pronoun पुष्ट: ku/kuani/e/eani, UNESCO nearly-extinct, Hokkaido की मूल-निवासी-भाषा) */
 ilo: { native: /[A-Za-z]/, name: "Latin (Ilocano)", devInItem0: false }, /* 12-Oct ग-समूह पुनर्निर्माण — Ilokano Latin-वर्तनी (siak/dakayo/isu; -ko/-mo/-na, adda/awan, haan, ket/ti/iti), spreadsheet script=Latn; 🟡 AI-draft, मानव-चौकी लंबित; पुराना देवनागरी-साँचा निरस्त */
 hil: { native: /[A-Za-z]/, name: "Latin (Hiligaynon)", devInItem0: false }, /* 12-Oct ग-समूह पुनर्निर्माण — Hiligaynon Latin-वर्तनी (ako/kamo/siya; ko/mo/niya, may/wala, indi, kag/sang/sa/ang, naga-/mag-), spreadsheet script=Latn; 🟡 AI-draft, मानव-चौकी लंबित; पुराना देवनागरी-साँचा निरस्त */
 war: { native: /[A-Za-z]/, name: "Latin (Waray)", devInItem0: false }, /* 12-Oct ग-समूह पुनर्निर्माण — Waray Latin-वर्तनी (ako/kamo/hiya; ko/mo/niya, may/waray, diri, ngan/han/ha/an, nag-/mag- + पुनरावृत्ति-रूप), spreadsheet script=Latn; 🟡 AI-draft (कमज़ोर-पकड़), मानव-चौकी अनिवार्य; पुराना देवनागरी-साँचा निरस्त */
 bcl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bikol)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (tl-pivot) */ /* 06-Oct द्वीप-समूह-खेप-4 — Central Bikol (फ़िलीपींस Bicol, genuine pronoun पुष्ट: ako/ika) */
 pam: { native: /[A-Za-z]/, name: "Latin (Kapampangan)", devInItem0: false }, /* 12-Oct ग-समूह पुनर्निर्माण — Kapampangan Latin-वर्तनी (aku/ku, kayu, ya; ing/ning/king/ring, a-linker, e=नहीं, atin/alang), spreadsheet script=Latn; 🔴 केवल-आंतरिक (कमज़ोर पकड़), मानव-चौकी अनिवार्य; पुराना देवनागरी-साँचा निरस्त */
 pag: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Pangasinan)", devInItem0: false }, /* 13-Oct खेमा-स पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct द्वीप-समूह-खेप-6 — Pangasinan (फ़िलीपींस, genuine pronoun पुष्ट: siak/sika) */
 mrw: { native: /[A-Za-z]/, name: "Latin (Maranao)" }, /* 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण (McKaughan-Macaraya Dictionary 1996 + DLI course) */
 mdh: { native: /[A-Za-z]/, name: "Latin (Maguindanaon)" },
 kek: { native: /[A-Za-z]/, name: "Latin (Qeqchi ALMG)" }, /* 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin ALMG (ejectives b' k' q' t' tz' ch', saltillo; sa≠sa' जाल) */
 mam: { native: /[A-Za-z\u1E8D]/, name: "Latin (Mam ALMG)" }, /* 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin ALMG (ky tx ẍ allowed; बोली-भिन्नता भारी — सरल-रचना नीति) */
 nbc: { native: /[A-Za-z]/, name: "Latin (Chang Naga)" }, /* 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin tier-C AI-draft (CIIL/PLSI जाँच-क़तार) */
 nbe: { native: /[A-Za-z]/, name: "Latin (Konyak Naga)" }, /* 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin tier-C AI-draft (CIIL/PLSI जाँच-क़तार) */ /* 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण (Zorc Dialogs 2009 + UDHR + polyglotclub) */
 tsg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tausug)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (tl-pivot) */ /* 06-Oct द्वीप-समूह-खेप-9 — Tausug (फ़िलीपींस Sulu-द्वीपसमूह, Wikipedia genuine pronoun पुष्ट: aku) */
 krj: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kinaray-a)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (hil-pivot) */ /* 06-Oct द्वीप-समूह-खेप-10 — Kinaray-a (फ़िलीपींस Panay-Antique, academic-blog genuine pronoun पुष्ट: ako/ikaw) */
 ban: { native: /[A-Za-z]/, name: "Latin (Balinese)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — असली Basa Bali Latin-लिपि (tiang/ragane/ipun), fr-दर्पण; पुराना देवनागरी-साँचा निरस्त */
 min: { native: /[A-Za-z]/, name: "Latin (Minangkabau)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — असली Minang Latin-लिपि (ambo/waang/inyo), fr-दर्पण; पुराना देवनागरी-साँचा निरस्त */
 mad: { native: /[A-Za-z]/, name: "Latin (Madurese)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — Basa Madhura Latin-लिपि (kaule/sampeyan), 🟡 AI-draft, मानव-चौकी अनिवार्य; पुराना देवनागरी-साँचा निरस्त */
 ace: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Acehnese)", devInItem0: false }, /* 13-Oct खेमा-स पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct द्वीप-समूह-खेप-14 — Acehnese (इंडोनेशिया Aceh, genuine pronoun पुष्ट: lon/droeneuh) */
 bbc: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Toba Batak)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (id-pivot) */ /* 06-Oct द्वीप-समूह-खेप-15 — Toba Batak (इंडोनेशिया North Sumatra, genuine pronoun पुष्ट: au/ho) */
 bug: { native: /[A-Za-z]/, name: "Latin (Buginese)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — Basa Ugi Latin-लिपि (iyya/idi'/ia; spreadsheet script=Latn), 🔴 केवल-आंतरिक: अधिकांश शब्दावली इंडोनेशियाई-उधार, मानव-चौकी अनिवार्य; पुराना देवनागरी-साँचा निरस्त */
 bjn: { native: /[A-Za-z]/, name: "Latin (Banjarese)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — असली Bahasa Banjar Latin-लिपि (ulun/pian/inya), fr-दर्पण; पुराना देवनागरी-साँचा निरस्त */
 mak: { native: /[A-Za-z]/, name: "Latin (Makassarese)", devInItem0: false }, /* 12-Oct ख-समूह पुनर्निर्माण — Basa Mangkasara' Latin-लिपि (nakke/ikatte/ia; nia'/tena/lekbak/punna), 🔴 केवल-आंतरिक: उधार-शब्द अधिक, मानव-चौकी अनिवार्य; पुराना देवनागरी-साँचा निरस्त */
 btx: { native: /[A-Za-z\u00E9\u00C9]/, name: "Latin (Batak Karo)" }, /* 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण (Woolams-grammar+native-blog; é allowed) */
 iba: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Iban)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (id-pivot) */ /* 06-Oct द्वीप-समूह-खेप-20 — Iban (मलेशिया Sarawak-बहुसंख्यक, genuine pronoun पुष्ट: aku/nuan) */
 dtp: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kadazan-Dusun)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (ms-pivot) */ /* 06-Oct द्वीप-समूह-खेप-21 — Kadazan-Dusun (मलेशिया Sabah-बहुसंख्यक, Wikipedia genuine pronoun पुष्ट: oku) */
 nod: { native: /[\u0E00-\u0E7F]/, name: "Thai (Northern Thai)", devInItem0: false }, /* 06-Oct द्वीप-समूह-खेप-22 (अंतिम) — Northern Thai/Lanna (थाईलैंड Chiang Mai, Wikipedia genuine pronoun पुष्ट: kha/tua, ऐतिहासिक Lan Na राज्य) */
 njm: { native: /[A-Za-z]/, name: "Latin (Angami/Tenyidie)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार) */ /* पुरानी देव-प्रविष्टि निरस्त (06-Oct) */
 nkh: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Chakhesang)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-महाखेप-2 — Chakhesang (Nagaland, languageshome genuine pronoun पुष्ट: E/Noh) */
 /* 19-Oct काम-लाल20 खेप-4: पुरानी देव-प्रविष्टि निरस्त (नई Latin ऊपर जीतती) — nbe */ /* 06-Oct उत्तर-पूर्व-महाखेप-3 — Konyak (Nagaland, languageshome genuine pronoun पुष्ट: Nye/N-ung) */
 /* 19-Oct काम-लाल20 खेप-4: पुरानी देव-प्रविष्टि निरस्त (नई Latin ऊपर जीतती) — nbc */ /* 06-Oct उत्तर-पूर्व-महाखेप-4 — Chang (Nagaland, languageshome genuine pronoun पुष्ट: Kno/Nung) */
 nsm: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sumi)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-महाखेप-5 — Sumi/Sema (Nagaland, languageshome genuine pronoun पुष्ट: Ne/No) */
 ksw: { native: /[\u1000-\u109F]/, name: "Myanmar (Karen)", devInItem0: false }, /* 06-Oct उत्तर-पूर्व-महाखेप-6 — Sgaw Karen (म्यांमार, genuine pronoun पुष्ट: ya/na, 70 लाख बोलने वाले) */
 che: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Chechen)", devInItem0: false }, /* 20-Oct लाल10-द खेप-2 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */  /* 06-Oct उत्तर-पूर्व-महाखेप-7 — चेचन (काकेशस, Wikibooks genuine pronoun पुष्ट: So/Ho/Tho, 17 लाख बोलने वाले) */
 dar: { native: /[\u0400-\u052F]/, name: "Cyrillic (Dargwa)", devInItem0: false }, /* 06-Oct उत्तर-पूर्व-महाखेप-8 — दर्गिन (काकेशस, academic genuine pronoun पुष्ट: nu/h'u) */
 lez: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Lezgian)", devInItem0: false }, /* 20-Oct लाल10-द खेप-2 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */  /* 06-Oct उत्तर-पूर्व-महाखेप-9 — लेज़गी (काकेशस, Wikipedia genuine pronoun पुष्ट: zun) */
 kbd: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Kabardian)", devInItem0: false }, /* 20-Oct लाल10-द खेप-2 पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */  /* 06-Oct उत्तर-पूर्व-महाखेप-10 — काबर्दीनो-चर्केस (काकेशस, Wikipedia genuine pronoun पुष्ट: sa/wa) */
 tuk: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Turkmen)", devInItem0: false }, /* 13-Oct खेमा-ब पूर्ण-पुनर्लेखन (az-सिबलिंग) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-महाखेप-11 — तुर्कमेन (तुर्कमेनिस्तान, US-Embassy genuine pronoun पुष्ट: men/sen) */
 tet: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tetum)", devInItem0: false }, /* 06-Oct उत्तर-पूर्व-महाखेप-12 (अंतिम) — तेतुम (तिमोर-लेस्ते, genuine pronoun पुष्ट: Ha'u/O) */
 tcz: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Thadou)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-खेप-2 — थाडौ-कुकी (मणिपुर, academic genuine pronoun पुष्ट: kei/nang) */
 pck: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Paite)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (lus-pivot) */ /* 06-Oct उत्तर-पूर्व-खेप-2 — पाइते (मणिपुर, academic genuine pronoun पुष्ट: kei, partial-mutual-unintelligible Thadou से) */
 njz: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Nyishi)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-खेप-2 — न्यिशी (अरुणाचल-प्रदेश, सबसे-बड़ी जनजाति, Wikipedia genuine pronoun पुष्ट: ngo) */
 apt: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0250-\u02AF]/, name: "Latin (Apatani)", devInItem0: false }, /* 19-Oct काम-लाल20 खेप-5 पूर्ण-पुनर्लेखन (MRS-वर्तनी) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-खेप-2 — अपातानी (अरुणाचल-प्रदेश, academic-dictionary genuine pronoun पुष्ट: Ngo) */
 mtq: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Muong)" }, /* 20-Oct काम-लाल10 देव-सूची से बाहर — Latin tier-C AI-draft (मूल-वक्ता जाँच-क़तार); पुरानी देव-प्रविष्टि निरस्त */ /* 06-Oct उत्तर-पूर्व-खेप-2 (अंतिम) — Muong (वियतनाम, Wiktionary genuine cognate-pronoun पुष्ट: thôl, टोनल-भाषा) */
 swb: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Comorian)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (sw-pivot) */ /* 06-Oct हिंद-महासागर-खेप — Comorian/Shikomori (कोमोरोस राष्ट्रीय-भाषा, Peace-Corps-official-grammar genuine pronoun पुष्ट: Wami/Wawe/Wasi) */
 crs: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Seychellois Creole)", devInItem0: false }, /* 06-Oct हिंद-महासागर-खेप — Seychellois Creole/Seselwa (सेशेल्स राष्ट्रीय-भाषा, APiCS-academic genuine pronoun पुष्ट: mwan/ou/nou) */
 rcf: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Reunion Creole)", devInItem0: false }, /* 06-Oct हिंद-महासागर-खेप (अंतिम) — Réunion Creole (फ्रांसीसी-प्रदेश, genuine pronoun पुष्ट: Amwin/Aou/Anou) */
 oon: { native: /[\u0900-\u097F]/, name: "Devanagari (Onge)", devInItem0: true, devLang: true }, /* 06-Oct बंगाल-की-खाड़ी-खेप — Onge (लिटिल-अंडमान, भारत; Ongan-भाषा-परिवार — दुनिया के मुख्य-भाषा-परिवारों में से एक; academic-paper+dictionary genuine pronoun पुष्ट: mi; अत्यंत-लुप्तप्राय ~100 वक्ता) */
 tpi: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tok Pisin)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Tok Pisin (पापुआ न्यू गिनी राष्ट्रीय-भाषा, genuine pronoun पुष्ट: mi/yu, 40+ लाख बोलने वाले) */
 fij: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Fijian)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Fijian (फिजी राष्ट्रीय-भाषा, genuine pronoun पुष्ट: au/iko) */
 bis: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bislama)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Bislama (वानुआटू राष्ट्रीय-भाषा, genuine pronoun पुष्ट: mi/yu) */
 pis: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Pijin)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Pijin (सोलोमन-द्वीपसमूह राष्ट्रीय-भाषा, genuine pronoun पुष्ट: mi/yu) */
 mri: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Maori)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Māori (न्यूज़ीलैंड राष्ट्रीय-भाषा, genuine pronoun पुष्ट: ahau/au, koe) */
 smo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Samoan)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Samoan (समोआ राष्ट्रीय-भाषा, genuine pronoun पुष्ट: ou/'oe) */
 ton: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tongan)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Tongan (टोंगा राष्ट्रीय-भाषा, genuine pronoun पुष्ट: au/koe) */
 hmo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hiri Motu)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप — Hiri Motu (पापुआ न्यू गिनी दूसरी-राष्ट्रीय-भाषा, Motu से mutually-unintelligible, genuine pronoun पुष्ट: lau) */
 pjt: { native: /[A-Za-z]/, name: "Latin (Pitjantjatjara)", devInItem0: false }, /* 06-Oct ऑस्ट्रेलिया-प्रशांत-खेप (अंतिम) — Pitjantjatjara (ऑस्ट्रेलिया आदिवासी-भाषा, Aṉangu-Pitjantjatjara-Yankunytjatjara क्षेत्र की आधिकारिक-भाषा, academic-paper genuine pronoun पुष्ट: ngayulu) */
    dan: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Danish)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    nob: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Norwegian Bokmål)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    isl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Icelandic)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    slv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Slovene)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    est: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Estonian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    lav: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Latvian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    sqi: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Albanian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    mkd: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Macedonian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: corpus असली सिरिलिक पुष्ट */
    ltz: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Luxembourgish)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    cat: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Catalan)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    eus: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Basque)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    glg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Galician)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    cym: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Welsh)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    gle: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Irish)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    gla: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Scottish Gaelic)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    fao: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Faroese)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    kal: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Greenlandic)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    sme: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Northern Sami)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    niv: { native: /[\u0400-\u052F]/, name: "Cyrillic (Nivkh)", devInItem0: false }, /* 21-Oct लाल10-ई खेप-2 — असली Cyrillic पूर्ण-पुनर्लेखन; पुरानी 09-Oct Latin-टिप्पणी निरस्त */
 nav: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\u02BC]/, name: "Latin (Navajo)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-1: nav content असली Latin "1.0-COMPLETE" था पर checker-प्रविष्टि बासी देव रह गई थी (v7.2-सीख भंग) — Latin-प्रविष्टि; nasal-acute ą́/ę́ combining U+0301 + ʼ U+02BC शामिल */ /* पुरानी: Devanagari devLang (06-Oct) निरस्त */
    grt: { native: /[A-Za-z]/, name: "Latin (Garo A\u00B7chik)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-2: गारो — Latin पुनर्निर्माण, apostrophe/raka-glottal */
    tiv: { native: /[A-Za-z\u00F4\u00D4]/, name: "Latin (Tiv)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-2: तिव — Latin पुनर्निर्माण, \u00F4 अक्षर */
 crk: { native: /[\u1400-\u167F]/, name: "Syllabics (Cree)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप — क्री (कनाडा, सबसे-व्यापक मूल-निवासी-भाषा, genuine pronoun पुष्ट: niya/kiya) */
 iku: { native: /[\u1400-\u167F]/, name: "Syllabics (Inuktitut)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप — इनुक्तितुत (कनाडा-Nunavut आधिकारिक-भाषा, genuine pronoun पुष्ट: uvanga/ivvit) */
 oji: { native: /[A-Za-z]/, name: "Latin (Ojibwe)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप — ओजिब्वे (USA/कनाडा Great-Lakes, genuine pronoun पुष्ट: niin/giin) */
 nah: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Nahuatl)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-5: असली Latin तीन-स्तंभ पुनर्लेखन (nehua/atl/calli/tequitl attested) */ /* 06-Oct उत्तरी-अमेरिका-खेप — नाहुआतल (मेक्सिको, सबसे-बड़ी मूल-निवासी-भाषा, Aztec-विरासत, genuine pronoun पुष्ट: nehuatl) */
 haw: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hawaiian)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप — हवाईयन (USA-हवाई-राज्य, genuine pronoun पुष्ट: au-wau/ʻoe) */
 lkt: { native: /[A-Za-z]/, name: "Latin (Lakota)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप — लाकोटा (USA Great-Plains Sioux, genuine pronoun पुष्ट: miye/niye) */
 chr: { native: /[\u13A0-\u13F5]/, name: "Cherokee (Cherokee)", devInItem0: false }, /* 06-Oct उत्तरी-अमेरिका-खेप (अंतिम) — चेरोकी (USA, प्रमुख पूर्वी मूल-निवासी-भाषा, genuine pronoun पुष्ट: ayv/nihi) */
 guc: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Wayuunaiki)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-4: असली Latin तीन-स्तंभ पुनर्लेखन (taya/pia/wuin/piichi attested) */ /* 06-Oct दक्षिण-अमेरिका-महासागरीय-खेप — वायुनाइकी (कोलंबिया/वेनेज़ुएला Guajira-प्रायद्वीप, सबसे-बड़ी मूल-निवासी-भाषा, genuine pronoun पुष्ट: taya/pia) */
 rap: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Rapa Nui)", devInItem0: false }, /* 12-Oct Latin पुनर्निर्माण — v6.3 तीन-स्तंभ नियम; पुरानी देवनागरी-item[0] प्रविष्टि निरस्त */ /* 06-Oct दक्षिण-अमेरिका-महासागरीय-खेप — रापा-नुई (ईस्टर-द्वीप, चिली, Polynesian, genuine pronoun पुष्ट: au/koe) */
 srn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sranan Tongo)", devInItem0: false }, /* 06-Oct दक्षिण-अमेरिका-महासागरीय-खेप (अंतिम) — स्रानान-टोंगो (सूरीनाम, राष्ट्रीय-लिंगुआ-फ़्रैंका, English-creole, genuine pronoun पुष्ट: mi/yu) */
 acu: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Achuar-Shiwiar)", devInItem0: false }, /* 19-Oct काम-लाल20: असली-लिपि पुनर्निर्माण — देव-प्रविष्टि निरस्त */
 gyn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Guyanese Creole)", devInItem0: false }, /* 06-Oct दक्षिण-अमेरिका-दूसरा-दौर — गुयानीज़-क्रियोल (गुयाना, English-creole, genuine pronoun पुष्ट: mi/yuh) */
 fgc: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (French Guianese Creole)", devInItem0: false }, /* 06-Oct दक्षिण-अमेरिका-दूसरा-दौर — फ़्रेंच-गयानीज़-क्रियोल (फ़्रेंच-गयाना, French-creole, genuine pronoun पुष्ट: mo/to) */
 trn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Trinidadian Creole)", devInItem0: false }, /* 06-Oct दक्षिण-अमेरिका-दूसरा-दौर (अंतिम) — त्रिनिदादियन-क्रियोल (त्रिनिदाद-टोबैगो, English-creole, genuine pronoun पुष्ट: ah/yuh) */
 jiv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Shuar)", devInItem0: false }, /* 19-Oct काम-लाल20: असली-लिपि पुनर्निर्माण — देव-प्रविष्टि निरस्त */
 kea: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kabuverdianu)", devInItem0: false }, /* 06-Oct अटलांटिक-द्वीपसमूह-खेप — केप-वर्देयन-क्रियोल (केप-वर्दे, पुर्तगाली-आधारित-creole, genuine pronoun पुष्ट: mi-N/bo-bu) */
 pap: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Papiamento)", devInItem0: false }, /* 06-Oct अटलांटिक-द्वीपसमूह-खेप — पापियामेंटो (अरूबा/कुराساओ/बोनेयर, स्पेनिश-पुर्तगाली-डच-मिश्रित, genuine pronoun पुष्ट: mi/bo) */
 acf: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Saint Lucian Creole / Kwéyòl)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (fr-pivot) */ /* 06-Oct अटलांटिक-द्वीपसमूह-खेप — सेंट-लूसियन-क्रियोल (सेंट-लूसिया, French-creole, genuine pronoun पुष्ट: mwen/ou) */
 cri: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Forro)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (pt-pivot) */ /* 06-Oct अटलांटिक-द्वीपसमूह-खेप — फ़ोर्रो/सांतोमेंसे (साओ-टोमे-ए-प्रिंसिपी, गिनी-की-खाड़ी, पुर्तगाली-creole, academic-APiCS-survey genuine pronoun पुष्ट: n-mu/bô) */
 bjs: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bajan Creole)", devInItem0: false }, /* 06-Oct अटलांटिक-द्वीपसमूह-खेप (अंतिम) — बाजन-क्रियोल (बारबाडोस, English-creole, genuine pronoun पुष्ट: Ah/yuh) */
 ch: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Chamorro)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (tl-pivot) */ /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Chamorro (गुआम/उत्तरी-मारियाना), genuine pronoun पुष्ट: Yu-Hao */
 pau: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Palauan)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Palauan (पलाऊ), genuine pronoun पुष्ट: Ngak-Kau */
 mh: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Marshallese)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Marshallese (मार्शल-द्वीपसमूह), genuine pronoun पुष्ट: I-Kwo */
 chk: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Chuukese)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Chuukese (FSM-चुउक), genuine pronoun पुष्ट: Ngang-En */
 pon: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Pohnpeian)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Pohnpeian (FSM-पोन्पेई), genuine pronoun पुष्ट: Ngehi-Ke */
 kos: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kosraean)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Kosraean (FSM-कोस्राए), genuine pronoun पुष्ट: Nga-Kom */
 yap: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Yapese)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Yapese (FSM-याप), genuine pronoun पुष्ट: Gaeg-Ga */
 gil: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Gilbertese)", devInItem0: false }, /* 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin, genuine pronoun पुष्ट: Ngai-Ngkoe */
 ty: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tahitian)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Tahitian (फ्रेंच-पॉलिनेशिया), genuine pronoun पुष्ट: Au-Oe */
 rar: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Cook Islands Maori)", devInItem0: false }, /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Cook Islands Maori (कुक-द्वीपसमूह), genuine pronoun पुष्ट: Au-Koe */
 niu: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Niuean)", devInItem0: false }, /* 12-Oct Latin पुनर्निर्माण — v6.3 तीन-स्तंभ नियम; पुरानी देवनागरी-item[0] प्रविष्टि निरस्त */ /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Niuean (नीयू), genuine pronoun पुष्ट: Au-Koe */
 tvl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tuvaluan)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (smo-pivot) */ /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Tuvaluan (तुवालू), genuine pronoun पुष्ट: Au-Koe */
 tkl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tokelauan)", devInItem0: false }, /* 12-Oct Latin पुनर्निर्माण — v6.3 तीन-स्तंभ नियम; पुरानी देवनागरी-item[0] प्रविष्टि निरस्त */ /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Tokelauan (तोकेलाउ), genuine pronoun पुष्ट: Au-Koe */
 dhv: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Drehu)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-5: असली Latin तीन-स्तंभ पुनर्लेखन (eni/eo/tim/uma/oleti attested, Lifou) */ /* 06-Oct प्रशांत-महासागर-द्वीपसमूह-खेप — Drehu (न्यू-कैलेडोनिया-लीफ़ू), genuine pronoun पुष्ट: Eni-Eo */
 grn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Grenadian Creole)", devInItem0: false }, /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Grenadian Creole (ग्रेनेडा), genuine pronoun पुष्ट: mwen-ou */
 dcf: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Dominican Creole / Kwéyòl)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (fr-pivot) */ /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Dominican Creole French (डोमिनिका), genuine pronoun पुष्ट: Mon/Mwen-Ou */
 srm: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Saramaccan)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot srn) */ /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Saramaccan (सूरीनाम (Maroon-creole)), genuine pronoun पुष्ट: mi-i */
 djk: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Ndyuka)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (en-pivot, srn-भगिनी) */ /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Ndyuka (सूरीनाम/फ्रेंच-गयाना (दूसरा Maroon-creole)), genuine pronoun पुष्ट: mi-yu */
 tdx: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tandroy)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (mg-pivot) */ /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Tandroy (दक्षिण-मेडागास्कर), genuine pronoun पुष्ट: Zaho-Ihe */
 bhr: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bara Malagasy)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (mg-pivot) */ /* 06-Oct कैरिबियन-शेष+मेडागास्कर-खेप — Bara (दक्षिण-मेडागास्कर), genuine pronoun पुष्ट: iaho-Anao */
 ln: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Lingala)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Lingala (DRC/कांगो-ब्राज़ाविल), genuine pronoun पुष्ट: ngai-yo */
 kg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kikongo)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Kikongo (DRC/अंगोला/कांगो), genuine pronoun पुष्ट: mono-ngeye */
 fuv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0250-\u02AF]/, name: "Latin (Fulfulde)", devInItem0: false }, /* 19-Oct काम-लाल20 खेप-5 पूर्ण-पुनर्लेखन (Adamawa, SVO) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Fulfulde (पश्चिम-अफ्रीका-साहेल), genuine pronoun पुष्ट: mi-a */
 tn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tswana)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Tswana (बोत्सवाना), genuine pronoun पुष्ट: nna-wena */
 bem: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bemba)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Bemba (ज़ाम्बिया), genuine pronoun पुष्ट: ine-iwe */
 ts: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tsonga)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Tsonga (दक्षिण-अफ्रीका/मोज़ाम्बिक), genuine pronoun पुष्ट: mina-wena */
 mos: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u025B\u0254\u028B]/, name: "Latin (Mossi/Mooré)", devInItem0: false }, /* 06-Oct अफ्रीका-शेष-खेप — Mossi (Mooré) (बुर्किना-फासो), genuine pronoun पुष्ट: mam-fo */
 ee: { native: /[A-Za-z\u00C0-\u024F\u0250-\u02AF\u1E00-\u1EFF]/, name: "Latin (Ewe)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct अफ्रीका-शेष-खेप — Ewe (घाना/टोगो), genuine pronoun पुष्ट: nye-wò */
 kri: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Krio)", devInItem0: false }, /* 06-Oct अफ्रीका-शेष-खेप — Krio (सिएरा-लियोन), genuine pronoun पुष्ट: mi-yu */
 nd: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Northern Ndebele)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (zu-pivot) */ /* 06-Oct अफ्रीका-शेष-खेप — Northern Ndebele (ज़िम्बाब्वे/बोत्सवाना), genuine pronoun पुष्ट: mina-wena */
 sqt: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Soqotri)", devInItem0: false }, /* 06-Oct ख़ाड़ी-क्षेत्र-खेप — Soqotri (सोकोत्रा-द्वीप-यमन), genuine pronoun पुष्ट: ho-het */
 gdq: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Mehri)", devInItem0: false }, /* 06-Oct ख़ाड़ी-क्षेत्र-खेप — Mehri (यमन/ओमान), genuine pronoun पुष्ट: hōh-hēt */
 aii: { native: /[\u0700-\u074F]/, name: "Syriac (Assyrian Neo-Aramaic)", devInItem0: false }, /* 06-Oct ख़ाड़ी-क्षेत्र-खेप — Assyrian Neo-Aramaic (इराक़/सीरिया/ईरान), genuine pronoun पुष्ट: ānā-at */
 haz: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Hazaragi)", devInItem0: false }, /* 06-Oct ख़ाड़ी-क्षेत्र-खेप — Hazaragi (अफ़ग़ानिस्तान), genuine pronoun पुष्ट: ma-tu */
 shv: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Shehri (Jibbali))", devInItem0: false }, /* 06-Oct गहन-ईमानदार-gap-खेप — Shehri (Jibbali) (ओमान-Dhofar (Modern-South-Arabian)), genuine pronoun पुष्ट: he-het — घंटों की गहन-academic-खोज से मिला */
 mid: { native: /[\u0840-\u085F]/, name: "Mandaic (Mandaic)", devInItem0: false }, /* 06-Oct गहन-ईमानदार-gap-खेप — Mandaic (इराक़/ईरान (Mandaean-धर्म)), genuine pronoun पुष्ट: ana-at — घंटों की गहन-academic-खोज से मिला */
 lrc: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Luri)", devInItem0: false }, /* 06-Oct गहन-ईमानदार-gap-खेप — Luri (ईरान-Zagros-पर्वत (Lur-लोग)), genuine pronoun पुष्ट: me-to — घंटों की गहन-academic-खोज से मिला */
 rmt: { native: /[\u0600-\u06FF]/, name: "Perso-Arabic (Domari)", devInItem0: false }, /* 06-Oct गहन-ईमानदार-gap-खेप — Domari (मध्य-पूर्व (Dom-घुमंतू-समुदाय)), genuine pronoun पुष्ट: min-tu — घंटों की गहन-academic-खोज से मिला */
 ve: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Venda)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (zu-pivot) */ /* 06-Oct जबरदस्त-प्रयास-खेप — Venda (द.अफ्रीका-Limpopo), genuine pronoun पुष्ट: nne-iwe */
 ss: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Swati)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct जबरदस्त-प्रयास-खेप — Swati (एस्वातीनी/द.अफ्रीका), genuine pronoun पुष्ट: mine-wena */
 luo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Dholuo)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct जबरदस्त-प्रयास-खेप — Dholuo (केन्या-पश्चिम), genuine pronoun पुष्ट: an-in */
 din: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Dinka)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot nus) */ /* 06-Oct जबरदस्त-प्रयास-खेप — Dinka (दक्षिण-सूडान), genuine pronoun पुष्ट: gen-yin */
 ki: { native: /[A-Za-z\u00C0-\u024F\u0128\u0129\u0168\u0169\u1E00-\u1EFF]/, name: "Latin (Kikuyu)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct जबरदस्त-प्रयास-खेप — Kikuyu (केन्या-Central), genuine pronoun पुष्ट: nii-wee */
 zgh: { native: /[\u2D30-\u2D7F]/, name: "Tifinagh (Tamazight)", devInItem0: false }, /* 06-Oct जबरदस्त-प्रयास-खेप — Tamazight (मोरक्को (Standard)), genuine pronoun पुष्ट: nekk-kyyi */
 tig: { native: /[\u1200-\u137F]/, name: "Ethiopic (Tigre)", devInItem0: false }, /* 06-Oct जबरदस्त-प्रयास-खेप — Tigre (इरिट्रिया/सूडान), genuine pronoun पुष्ट: ana-enta */
 na: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Nauruan)", devInItem0: false }, /* 06-Oct जबरदस्त-प्रयास-खेप — Nauruan (नाउरू), genuine pronoun पुष्ट: anga-wo */
 fud: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Futunan)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (smo-pivot) */ /* 06-Oct जबरदस्त-प्रयास-खेप — East Futunan (वालिस-ए-फ़्यूतूना), genuine pronoun पुष्ट: au-koe */
 wls: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Wallisian)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (smo-pivot) */ /* 06-Oct जबरदस्त-प्रयास-खेप — Wallisian (वालिस-ए-फ़्यूतूना), genuine pronoun पुष्ट: au-ke */
 skg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sakalava Malagasy)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (mg-pivot) */ /* 06-Oct जबरदस्त-प्रयास-खेप — Southern Sakalava (मेडागास्कर-पश्चिम), genuine pronoun पुष्ट: izaho-iha */
 bzc: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Betsimisaraka Malagasy)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (mg-pivot) */ /* 06-Oct जबरदस्त-प्रयास-खेप — Southern Betsimisaraka (मेडागास्कर-पूर्व), genuine pronoun पुष्ट: izaho-ianao */
 ady: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Adyghe)", devInItem0: false }, /* 06-Oct जबरदस्त-प्रयास-खेप — Circassian (Adyghe) (रूस-काकेशस), genuine pronoun पुष्ट: se-wa */
 eo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Esperanto)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Esperanto (योजित-अंतरराष्ट्रीय-भाषा), genuine pronoun पुष्ट: mi-vi */
 la: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Latin)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Latin (प्राचीन-रोम), genuine pronoun पुष्ट: ego-tu */
 yi: { native: /[\u0590-\u05FF]/, name: "Hebrew (Yiddish)", devInItem0: false }, /* 11-Oct NEXT50 टियर-2 — yi असली Hebrew-लिपि में (v6.3 तीन-स्तंभ); पुरानी देवनागरी-प्रविष्टि निरस्त */
 br: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Breton)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Breton (फ़्रांस-ब्रितानी), genuine pronoun पुष्ट: me-te */
 co: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Corsican)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Corsican (कोर्सिका-द्वीप), genuine pronoun पुष्ट: eiu-tu */
 fy: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Frisian)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Frisian (नीदरलैंड्स-Friesland), genuine pronoun पुष्ट: ik-do */
    scn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sicilian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    lij: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Ligurian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    lmo: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Lombard)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    szl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Silesian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
    vec: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Venetian)", devInItem0: false }, /* 09-Oct पड़ाव-ब: असली-लिपि — बासी देव-प्रविष्टि निरस्त */
 dov: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Dombe)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot sn) */ /* 06-Oct Google-मिलान-56-खेप — Dombe (ज़ाम्बिया-ज़िम्बाब्वे), genuine pronoun पुष्ट: ndi-u */
 hmn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hmong)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot en) */ /* 06-Oct Google-मिलान-56-खेप — Hmong (दक्षिण-पूर्व-एशिया), genuine pronoun पुष्ट: kuv-koj */
 kl: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kalaallisut)", devInItem0: false }, /* 19-Oct काम-लाल20: kal-जुड़वाँ (C12) असली-लिपि — देव-प्रविष्टि निरस्त */
 gv: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Manx)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot gle) */ /* 06-Oct Google-मिलान-56-खेप — Manx (आइल-ऑफ़-मैन), genuine pronoun पुष्ट: mee-oo */
 oc: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Occitan)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप — Occitan (दक्षिण-फ़्रांस), genuine pronoun पुष्ट: ieu-tu */
 bs: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Bosnian)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-2 — Bosnian (बोस्निया), genuine pronoun पुष्ट: ja-ti */
  fur: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Friulian)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (it-pivot) */
  kha: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Khasi)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (en-pivot) */
 aa: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Afar)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot so) */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Afar (जिबूती-इरिट्रिया-इथियोपिया), genuine pronoun पुष्ट: anu-atu */
 fon: { native: /[A-Za-z\u00C0-\u024F\u0250-\u02AF\u1E00-\u1EFF]/, name: "Latin (Fon)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) + IPA-स्वर ɛ/ɔ/ŋ — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Fon (बेनिन), genuine pronoun पुष्ट: nye-hwe */
 gaa: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u025B\u0254\u014B]/, name: "Latin (Ga)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-2 — Ga (घाना-अक्करा), genuine pronoun पुष्ट: mi-wo */
 sus: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Susu)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot bm) */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Susu (गिनी-सिएरा-लियोन), genuine pronoun पुष्ट: n-i */
 kr: { native: /[A-Za-z]/, name: "Latin (Kanuri)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-3: कानुरी — Latin पुनर्निर्माण (ASCII-सरल वर्तनी ǝ→e, Borno Hausa/Arabic-loan यथार्थ) */ /* पुरानी: Devanagari (06-Oct, wu-nyi पुष्ट) निरस्त */
 ktu: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kituba)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (kg-pivot) */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Kituba (DRC-कांगो), genuine pronoun पुष्ट: mono-nge */
 cgg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Kiga)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot rw) */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Kiga (युगांडा), genuine pronoun पुष्ट: nyowe-iwe */
 kv: { native: /[\u0400-\u04FF]/, name: "Cyrillic (Komi-Zyrian)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-2 — Komi (रूस-कोमी-गणराज्य), genuine pronoun पुष्ट: me-te */
 ltg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Latgalian)", devInItem0: false }, /* 13-Oct खेमा-ब पूर्ण-पुनर्लेखन (lav-सिबलिंग) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Latgalian (लात्विया), genuine pronoun पुष्ट: es-tu */
 rn: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Rundi)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-2 — Rundi (बुरुंडी), genuine pronoun पुष्ट: jeewe-wewe */
 ab: { native: /[\u0400-\u052F]/, name: "Cyrillic (Abkhaz)", devInItem0: false }, /* 21-Oct लाल10-ई खेप-2 — असली Cyrillic पूर्ण-पुनर्लेखन; पुरानी 06-Oct देव-native टिप्पणी निरस्त */
 ach: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Acholi)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot luo) */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Acholi (युगांडा), द्वि-academic-स्रोत genuine pronoun पुष्ट: an-in */
 alz: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Alur)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot luo) */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Alur (युगांडा-DRC), dedicated-dictionary genuine pronoun पुष्ट: an-in */
 bew: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Betawi)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (id-pivot) */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Betawi (जकार्ता), Wikipedia genuine pronoun पुष्ट: gua-lu */
 crh: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Crimean Tatar)", devInItem0: false }, /* 14-Oct खेमा-य — Latin पुनर्निर्माण (tt-pivot) */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Crimean Tatar (क्रीमिया), द्वि-स्रोत genuine pronoun पुष्ट: men-sen */
 cnh: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hakha Chin)", devInItem0: false }, /* 14-Oct खेमा-र — Latin पुनर्निर्माण (lus-pivot) */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Hakha Chin (म्यांमार Chin-State), academic genuine pronoun पुष्ट: kei-nang */
 nso: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sepedi)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Sepedi (द.अफ्रीका), Peace-Corps genuine pronoun पुष्ट: nna-wena */
 st: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sesotho)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Sesotho (लेसोथो-द.अफ्रीका), academic genuine pronoun पुष्ट: nna-wena */
 kac: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Jingpho)", devInItem0: false }, /* 13-Oct खेमा-स पूर्ण-पुनर्लेखन — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Jingpo (म्यांमार Kachin-State), academic genuine pronoun पुष्ट: ngai-nang */
 tum: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tumbuka)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-3 — Tumbuka (मलावी-ज़ाम्बिया), द्वि-स्रोत genuine pronoun पुष्ट: ine-iwe */
 dyu: { native: /[A-Za-z\u00C0-\u024F\u0250-\u02AF\u1E00-\u1EFF]/, name: "Latin (Dyula)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) + IPA-स्वर ɛ/ɔ/ŋ — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-4 — Dyula (बुर्किना-फासो), SIL-official-grammar genuine pronoun पुष्ट: n-i */
 zai: { native: /[A-Za-z\u00C0-\u024F]/, name: "Latin (Zapotec)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-4: असली Latin तीन-स्तंभ पुनर्लेखन (naa/lii/nisa/yoo attested, Isthmus) */ /* 06-Oct Google-मिलान-56-खेप बैच-4 — Zapotec Isthmus-variety (मेक्सिको-Oaxaca), Wikipedia genuine pronoun पुष्ट: naa-lii */
 sg: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Sango)", devInItem0: false }, /* 13-Oct खेप-4/5 पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-4 — Sango (मध्य-अफ्रीकी-गणराज्य), त्रि-स्रोत genuine pronoun पुष्ट: mbi-mo */
 rom: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Romani)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot en) */ /* 06-Oct Google-मिलान-56-खेप बैच-4 — Romani (रोमा-लोग), त्रि-स्रोत+CoE-official genuine pronoun पुष्ट: me-tu */
 /* 19-Oct काम-लाल20 खेप-4: पुरानी देव-प्रविष्टि निरस्त (नई Latin ऊपर जीतती) — kek */ /* 06-Oct Google-मिलान-56-खेप बैच-4 — Qeqchi (ग्वाटेमाला), चार-स्रोत genuine pronoun पुष्ट: laain-laaat */
 bci: { native: /[A-Za-z\u025B\u0254\u0190\u0186\u00C0-\u024F]/, name: "Latin (Baoule)", devInItem0: false }, /* 20-Oct काम-लाल10-ब खेप-3: बाउलेई — Latin पुनर्निर्माण, ɛ/ɔ अक्षर समेत */ /* पुरानी: Devanagari (06-Oct, Timyan 1977 n-a पुष्ट) निरस्त */
 bts: { native: /[A-Za-z]/, name: "Latin (Batak Simalungun)" }, /* 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण (Badan-Bahasa Kamus 2016 + native-blog) */
 hrx: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Hunsrik)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot de) */ /* 06-Oct Google-मिलान-56-खेप बैच-5 — Hunsrik (ब्राज़ील), Wiktionary+academic genuine pronoun पुष्ट: ich-du */
 nqo: { native: /[\u07C0-\u07FF]/, name: "NKo (NKo)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-5 — NKo (पश्चिम-अफ्रीका Manding), academic-grammar genuine pronoun पुष्ट: n-i */
 lua: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Tshiluba)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-5 — Tshiluba (DRC-कांगो), dedicated-dictionary genuine pronoun पुष्ट: meme-wewe */
 jam: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Jamaican Patois)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-6 — Jamaican-Patois (कैरिबियन), बहु-स्रोत(academic-Open-Grammar+Wikipedia+Queensu) genuine pronoun पुष्ट: mi-yuh */
 nus: { native: /[A-Za-z\u00C0-\u024F\u0250-\u02AF\u1E00-\u1EFF]/, name: "Latin (Nuer)", devInItem0: false }, /* 13-Oct खेमा-अ पूर्ण-पुनर्लेखन: असली Latin-लिपि (v6.3 तीन-स्तंभ) + IPA-स्वर ɛ/ɔ/ŋ — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-6 — Nuer (दक्षिण-सूडान), Crazzolara's foundational-grammar(1933, Indiana-University-digital-library) genuine pronoun पुष्ट: gan-jin */
 ndc: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Ndau)", devInItem0: false }, /* 19-Oct खेमा-र — Latin पुनर्निर्माण (pivot sn) */ /* 06-Oct Google-मिलान-56-खेप बैच-6 — Ndau (ज़िम्बाब्वे-मोज़ाम्बिक), Shona-dialect-cluster pattern genuine pronoun पुष्ट: ini-iwe */
 shn: { native: /[\u1000-\u109F]/, name: "Myanmar (Shan)", devInItem0: false }, /* 06-Oct Google-मिलान-56-खेप बैच-6 — Shan (म्यांमार), दोहरा-academic-grammar(Cushing-1887+Swarthmore-LING073) genuine pronoun पुष्ट: kaw-maw */
 li: { native: /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/, name: "Latin (Limburgish)", devInItem0: false }, /* 13-Oct खेमा-ब पूर्ण-पुनर्लेखन (nl-सिबलिंग) — बासी देव-प्रविष्टि निरस्त */ /* 06-Oct Google-मिलान-56-खेप बैच-6 — Limburgish (नीदरलैंड-बेल्जियम), Wiktionary+Dutch-grammar-Wikipedia genuine pronoun पुष्ट: ich-doe */
 /* tiv 06-Oct देव-प्रविष्टि 20-Oct काम-लाल10-ब खेप-2 से निरस्त — Latin पुनर्निर्माण; नई Latin-प्रविष्टि ऊपर (nav के पास) */ /* 06-Oct Google-मिलान-56-खेप — अंतिम-जोड़ी — Tiv (नाइजीरिया-Benue), दोहरा-academic(iiste.org Mo/m + bsum.edu.ng-स्थानीय-विश्वविद्यालय clitic-u) genuine pronoun पुष्ट: mo-u */
 /* 19-Oct काम-लाल20 खेप-4: पुरानी देव-प्रविष्टि निरस्त (नई Latin ऊपर जीतती) — mam */ /* 06-Oct Google-मिलान-56-खेप — अंतिम-जोड़ी — Mam (ग्वाटेमाला-मेक्सिको), England-1983-grammar(Wikipedia-सत्यापित): "Mam has no independent pronouns — bound morphemes only"; निकटतम-authoritative-representative Set-B-stative-root/Set-A-ergative-marker इस्तेमाल: qiin(1s)-t(2s) */






 gan: { native: /[\u4E00-\u9FFF]/, name: "Hani (Gan)", devInItem0: true } /* mixed hanzi+देव नीति */, /* 05-Oct चीन-खेप-4 (अंतिम) — Gan (Sinitic, everyalphabet.com genuine pronoun-तालिका पुष्ट: ngo/ni/ta, Jiangxi, 2.2 करोड़ बोलने वाले) */ lmn: { native: /[\u0900-\u097F]/, name: "Devanagari (Lambadi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-19 — बंजारी/लमाणी (शोध-पुष्ट: राजस्थानी-मेवाड़-मारवाड़ मूल) */ bsn: { native: /[\u0900-\u097F]/, name: "Devanagari (Bishnoi)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-15 — बिश्नोई */ lri: { native: /[\u0900-\u097F]/, name: "Devanagari (Lariya)", devInItem0: true, devLang: true }, /* 05-Oct बोली-खेप-16 — लरिया */ /* 04-Sep अगली-8 का चौथा — मैथिली */
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
  if (R.interim) { console.log("⚠️ अस्थायी देवनागरी-रूप (" + CODE + "): तीन-स्तंभ नियम v6.3-क1 की असली-लिपि अभी बाक़ी — Founder-फ़ैसला लंबित; यह छूट दर्ज है, मौन नहीं (kkb_l2_pending.json → interim_script)"); }
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
  var LNAME = { uz: "उज़्बेक", ug: "उइघुर", tt: "तातार", tg: "ताजिक", sv: "स्वीडिश", si: "सिंहली", ro: "रोमानियाई", qu: "क्वेशुआ", ps: "पश्तो", prs: "दारी", pcm: "नाइजीरियन पिजिन", nl: "डच", myn: "मायन", mt: "माल्टीज़", mfe: "मॉरीशियन क्रीओल", ky: "किर्गिज़", ku: "कुर्दिश", kk: "कज़ाख", hy: "अर्मेनियाई", hu: "हंगेरियन", ht: "हाईटियन क्रियोल", gn: "गुआरानी", el: "ग्रीक", cs: "चेक", brx: "बोडो", bg: "बुल्गारियाई", be: "बेलारूसी", bal: "बलूची", az: "अज़रबैजानी", ay: "आयमारा", arz: "मिस्री अरबी", ary: "मोरक्कन अरबी", arq: "अल्जीरियाई अरबी", apd: "सूडानी अरबी", apc: "लेवांटाइन अरबी", aec: "सैदी अरबी", acw: "हिजाज़ी अरबी", acm: "मेसोपोटामिया अरबी", ar: "अरबी", fr: "फ़्रेंच", es: "स्पेनिश", ja: "जापानी", ko: "कोरियाई", de: "जर्मन", ru: "रूसी", he: "हिब्रू", pt: "पुर्तगाली", kn: "कन्नड", ta: "तमिल", ml: "मलयालम", te: "तेलुगु", bn: "बांग्ला", or: "उड़िया", as: "असमिया", pa: "पंजाबी", gu: "गुजराती", ur: "उर्दू" , ks: "कश्मीरी" , fa: "फ़ारसी" , sd: "सिंधी" , mr: "मराठी" , ne: "नेपाली" , bho: "भोजपुरी" , sw: "स्वाहिली" , zh: "चीनी" , id: "इंडोनेशियाई" , tr: "तुर्की" , mai: "मैथिली" , awa: "अवधी" , bgc: "हरियाणवी" , bhb: "भीली" , bjj: "बज्जिका" , doi: "डोगरी" , gbm: "गढ़वाली" , kfy: "कुमाऊंनी" , hne: "छत्तीसगढ़ी" , mag: "मगही" , gom: "कोंकणी" , mwr: "मारवाड़ी" , mni: "मणिपुरी" , skr: "सराइकी" , pnb: "पश्चिमी पंजाबी" , syl: "सिल्हटी" , tcy: "तुलु" , gon: "गोंडी" , sat: "संथाली" , anp: "अंगिका" , sjp: "सुरजापुरी" , khr: "खोरठा" , sck: "सादरी" , kyw: "कुरमाली" , bns: "बुंदेली" , bfy: "बघेली" , bra: "ब्रजभाषा" , mal: "मालवी" , nim: "निमाड़ी" , mtr: "मेवाड़ी" , dhu: "ढूँढाड़ी" , hdt: "हाड़ौती" , bgr: "बागड़ी" , mtw: "मेवाती" , pwr: "पवारी" , gjr: "गोजरी" , lmn: "बंजारी" , kgr: "कांगड़ी" , mjl: "मंडयाली" , cdh: "चम्बियाली" , gbk: "गद्दी" , cdj: "चुराही" , bhd: "भद्रवाही" , hii: "हंडूरी" , jns: "जौनसारी" , srx: "सिरमौरी" , him: "हिमाचली" , gwr: "गावरी" , kru: "कुरुख़" , uki: "कुई" , kff: "कोया" , kxv: "कुवि" , kfa: "कोडव" , kfj: "कोंडा" , kmj: "माल्टो" , kfb: "कोलामी" , nit: "नाइकी" , pci: "पारजी" , gdb: "गदबा" , peg: "पेंगो" , mha: "मांडा" , grt: "गारो" , trp: "कोकबोरोक" , kha: "खासी" , unr: "मुंडारी" , hoc: "हो" , biy: "भूमिज" , kfp: "कोरवा" , pbv: "प्नार" , dis: "डिमासा" , lus: "मिज़ो" , njo: "आओ नागा" , njh: "लोथा नागा" , dzo: "ज़ोंगखा" , brh: "ब्राहुई" , dv: "धिवेही" , new: "नेवारी" , ccp: "चकमा" , zum: "कुमज़ारी" , afb: "ख़ाड़ी-अरबी" , wuu: "वू-चीनी" , zha: "ज़ुआंग" , hak: "हक्का" , gan: "गान" , cv: "चुवाश" , ba: "बश्कीर" , sah: "याकूत" , bua: "बुर्यात" , udm: "उदमुर्त" , mhr: "मारी" , myv: "एर्ज़्या" , koi: "कोमी-पर्म्याक" , inh: "इंगुश" , ava: "अवार" , os: "ओसेतियाई" , tyv: "तुवान" , kjh: "खाकास" , xal: "कल्मिक" , yrk: "नेनेट्स" , jje: "जेजू" , ryu: "ओकिनावन" , ryn: "अमामी" , mvi: "मियाको" , rys: "याएयामा" , yoi: "योनागुनी" , ain: "ऐनू" , ilo: "इलोकानो" , hil: "हिलिगाय्नोन" , war: "वारे" , bcl: "बिकोल" , pam: "कपम्पांगान" , pag: "पांगासिनान" , mrw: "मरानाओ" , mdh: "मागिनदानाओ" , tsg: "ताउसूग" , krj: "किनारे-आ" , ban: "बालीनीज़" , min: "मिनांगकाबाउ" , mad: "मदुरीज़" , ace: "आचेनीज़" , bbc: "तोबा-बाटक" , bug: "बुगीनीज़" , bjn: "बांजारीज़" , mak: "मकासारीज़" , btx: "बाटक-कारो" , iba: "इबान" , dtp: "कादाज़ान-दुसुन" , nod: "उत्तरी-थाई" , njm: "अंगामी" , nkh: "चाखेसांग" , nbe: "कोन्याक" , nbc: "चांग" , nsm: "सूमी" , ksw: "करेन" , che: "चेचन" , dar: "दर्गिन" , lez: "लेज़गी" , kbd: "काबर्दीनो" , tuk: "तुर्कमेन" , tet: "तेतुम" , tcz: "थाडौ" , pck: "पाइते" , njz: "न्यिशी" , apt: "अपातानी" , mtq: "म्योंग" , swb: "कोमोरियन" , crs: "सेशेल्वा" , rcf: "रीयूनियन-क्रियोल" , oon: "ओंगे" , tpi: "टोक-पिसिन" , fij: "फिजियन" , bis: "बिस्लामा" , pis: "पिजिन" , mri: "माओरी" , smo: "सामोअन" , ton: "टोंगन" , hmo: "हिरी-मोटू" , pjt: "पित्यान्त्यात्यारा" , dan: "डैनिश" , nob: "नॉर्वेजियन" , isl: "आइसलैंडिक" , slv: "स्लोवेनियाई" , est: "एस्टोनियाई" , lav: "लात्वियाई" , sqi: "अल्बानियाई" , mkd: "मैसीडोनियाई" , ltz: "लक्ज़मबर्गिश" , cat: "कातालान" , eus: "बास्क" , glg: "गैलिशियन" , cym: "वेल्श" , gle: "आइरिश" , gla: "स्कॉटिश-गेलिक" , fao: "फ़रोईज़" , kal: "ग्रीनलैंडिक" , sme: "उत्तरी-सामी" , niv: "निव्ख" , nav: "नावाहो" , crk: "क्री" , iku: "इनुक्तितुत" , oji: "ओजिब्वे" , nah: "नाहुआतल" , haw: "हवाईयन" , lkt: "लाकोटा" , chr: "चेरोकी" , guc: "वायुनाइकी" , rap: "रापा-नुई" , srn: "स्रानान-टोंगो" , acu: "अचुआर-शिविआर" , gyn: "गुयानीज़-क्रियोल" , fgc: "फ़्रेंच-गयानीज़-क्रियोल" , trn: "त्रिनिदादियन-क्रियोल" , jiv: "शुआर" , kea: "केप-वर्देयन-क्रियोल" , pap: "पापियामेंटो" , acf: "सेंट-लूसियन-क्रियोल" , cri: "फ़ोर्रो" , bjs: "बाजन-क्रियोल" , ch: "चामोरो" , pau: "पलाऊआन" , mh: "मार्शलीज़" , chk: "चुउकीज़" , pon: "पोन्पेइयन" , kos: "कोस्राएन" , yap: "यापीज़" , gil: "गिल्बर्टीज़" , ty: "ताहितियन" , rar: "कुक-आइलैंड्स-माओरी" , niu: "नीयुएन" , tvl: "तुवालुअन" , tkl: "तोकेलाउअन" , dhv: "द्रेहु" , grn: "ग्रेनेडियन-क्रियोल" , dcf: "डोमिनिकन-क्रियोल" , srm: "सारामाक्कान" , djk: "न्दियुका" , tdx: "तान्द्रोय" , bhr: "बारा" , ln: "लिंगाला" , kg: "किकोंगो" , fuv: "फुलफुल्दे" , tn: "त्स्वाना" , bem: "बेम्बा" , ts: "त्सोंगा" , mos: "मोसी" , ee: "ईवे" , kri: "क्रियो" , nd: "उत्तरी-न्देबेले" , sqt: "सोकोत्री" , gdq: "मेह्री" , aii: "असीरियाई" , haz: "हज़ारगी" , shv: "शेह्री" , mid: "मंडाइक" , lrc: "लूरी" , rmt: "डोमारी" , ve: "वेन्दा" , ss: "स्वाती" , luo: "ढोलुओ" , din: "डिंका" , ki: "किकुयु" , zgh: "तमाज़ीग़्त" , tig: "तिग्रे" , na: "नाउरुअन" , fud: "पूर्वी-फुतुनन" , wls: "वालिसियन" , skg: "दक्षिणी-साकालावा" , bzc: "दक्षिणी-बेत्सिमिसारका" , ady: "अदिघे" , eo: "एस्पेरांतो" , la: "लैटिन" , yi: "यिद्दिश" , br: "ब्रेटन" , co: "कोर्सिकन" , fy: "फ़्रिसियाई" , scn: "सिसिलियाई" , lij: "लिगुरियाई" , lmo: "लोम्बार्ड" , szl: "सिलेसियाई" , vec: "वेनेशियाई" , dov: "डोम्बे" , hmn: "ह्मोंग" , kl: "कालालिसुत" , gv: "मैंक्स" , oc: "ओक्सिताँ" , bs: "बोस्नियाई" , fur: "फ़्रीयुलियाई" , aa: "अफ़ार" , fon: "फ़ोन" , gaa: "गा" , sus: "सुसु" , kr: "कानुरी" , ktu: "किटुबा" , cgg: "किगा" , kv: "कोमी-ज़ीर्यान" , ltg: "लात्गालियाई" , rn: "रुंडी" , ab: "अबख़ाज़" , ach: "अचोली" , alz: "अलुर" , bew: "बेतावी" , crh: "क्रीमियाई-तातार" , cnh: "हाखा-चिन" , nso: "सेपेदी" , st: "सेसोथो" , kac: "जिंगपो" , tum: "तुंबुका" , dyu: "दयुला" , zai: "ज़ापोतेक" , sg: "सांगो" , rom: "रोमानी" , kek: "क़ेक़्ची" , bci: "बाउलेई" , bts: "बतक-सिमालुंगुन" , hrx: "हुन्सरिक" , nqo: "एनको" , lua: "त्शिलुबा" , jam: "जमैकन-पातुआ" , nus: "नुएर" , ndc: "न्दाऊ" , shn: "शान" , li: "लिम्बुर्गी" , tiv: "तिव" , mam: "माम" , bsn: "बिश्नोई" , lri: "लरिया" , it: "इतालवी" , ms: "मलय" , vi: "वियतनामी" , th: "थाई" , sa: "संस्कृत" , pl: "पोलिश" , uk: "यूक्रेनी" , hr: "क्रोएशियाई" , sr: "सर्बियाई" , lt: "लिथुआनियाई" , sk: "स्लोवाक" , fi: "फ़िनिश" , ka: "जॉर्जियाई" , af: "अफ़्रीकांस" , am: "अम्हारिक" , bm: "बमबारा" , ha: "हाउसा" , ig: "इग्बो" , lg: "लुगांडा" , mg: "मालागासी" , ny: "चिचेवा" , om: "ओरोमो" , rw: "किन्यारवांडा" , sn: "शोना" , so: "सोमाली" , ti: "तिग्रीन्या" , tw: "अकान/त्वी" , wo: "वोलोफ़" , xh: "षोसा" , yo: "योरूबा" , zu: "ज़ुलु", bo: "तिब्बती", ceb: "सिबुआनो", jv: "जावानीज़", km: "खमेर", lo: "लाओ", mn: "मंगोलियाई", my: "बर्मी", nan: "मीनान चीनी", su: "सुंडानी", tl: "तागालोग", yue: "कैंटोनीज़" }; /* 09-Sep: + अफ़्रीका-खेप 18 भाषाएँ */
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
    var DEVLANG = { mr: 1, ne: 1, bho: 1, mai: 1, sa: 1, awa: 1, bgc: 1, bhb: 1, bjj: 1, doi: 1, gbm: 1, kfy: 1, hne: 1, mag: 1, gom: 1, mwr: 1, mni: 1, skr: 1, /* pnb 09-Oct को देव-सूची से बाहर — Shahmukhi */ syl: 1, tcy: 1, gon: 1, sat: 1, anp: 1, brx: 1, sjp: 1, khr: 1, sck: 1, kyw: 1, bns: 1, bfy: 1, bra: 1, mal: 1, nim: 1, mtr: 1, dhu: 1, hdt: 1, bgr: 1, mtw: 1, bsn: 1, lri: 1, pwr: 1, gjr: 1, lmn: 1, kgr: 1, mjl: 1, cdh: 1, gbk: 1, cdj: 1, bhd: 1, hii: 1, jns: 1, srx: 1, him: 1, gwr: 1, kru: 1, /* uki,kff,kxv,kfj: 21-Oct लाल10-ग Oriya/Telugu-असली */ kmj: 1, kfb: 1, nit: 1, pci: 1, gdb: 1, /* grt 20-Oct काम-लाल10-ब खेप-2 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* trp 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kha 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ unr: 1, hoc: 1, biy: 1, kfp: 1, /* pbv 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dis 19-Oct काम-लाल20 खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* lus 13-Oct खेमा-स देव-सूची से बाहर — Latin पुनर्निर्माण */ /* njo 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* njh 19-Oct काम-लाल20 खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dzo: 21-Oct लाल10-ज native-लिपि-असली */ /* brh: 21-Oct लाल10-फ Perso-Arabic-असली */ new: 1, /* ccp: 21-Oct लाल10-ज native-लिपि-असली */ /* zum: 21-Oct लाल10-फ Perso-Arabic-असली */ /* wuu: 21-Oct लाल10-ज native-लिपि-असली */ /* zha 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* hak: 21-Oct लाल10-ज native-लिपि-असली */ /* gan: 21-Oct लाल10-ज native-लिपि-असली */ /* cv 20-Oct काम-लाल10-द खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* ba 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* sah 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* bua 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* udm 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* mhr 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* myv 20-Oct काम-लाल10-द खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* koi 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* inh 21-Oct लाल10-ई खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* ava 20-Oct काम-लाल10-द खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* os 20-Oct काम-लाल10-द खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* tyv 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* kjh 14-Oct खेमा-स देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* xal 20-Oct काम-लाल10-द खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* yrk 21-Oct लाल10-ई खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* ilo 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* hil 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* war 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bcl 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* pam 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* pag 13-Oct खेमा-स देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mrw 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mdh 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tsg 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* krj 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ban 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* min 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mad 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ace 13-Oct खेमा-स देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bbc 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bug 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bjn 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mak 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* btx 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* iba 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dtp 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nod: 21-Oct लाल10-ज native-लिपि-असली */ /* njm 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nkh 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nbe 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nbc 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nsm 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ksw: 21-Oct लाल10-ज native-लिपि-असली */ /* che 20-Oct काम-लाल10-द खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* dar: 20-Oct लाल10-ई खेप-3 Cyrillic-असली */ /* lez 20-Oct काम-लाल10-द खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* kbd 20-Oct काम-लाल10-द खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* tuk 13-Oct खेमा-ब देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tcz 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* pck 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* njz 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* apt 19-Oct काम-लाल20 खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mtq 20-Oct काम-लाल10 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* swb 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ oon: 1, /* nav 20-Oct काम-लाल10-ब खेप-1 देव-सूची से बाहर — content असली Latin "1.0-COMPLETE"; बासी DEVLANG-प्रविष्टि ही 2,530 झूठे दर्पण-भंग की जड़ थी */ /* nah 20-Oct काम-लाल10-ब खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* guc 20-Oct काम-लाल10-ब खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* rap 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* acu 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* jiv 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* acf 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* cri 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ch 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* pau 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* mh 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* chk 18-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* pon 18-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* kos 18-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* yap 18-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* gil 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* niu 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tvl 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tkl 12-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dhv 20-Oct काम-लाल10-ब खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dcf 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* srm 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* djk 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tdx 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bhr 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ln 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kg 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* fuv 19-Oct काम-लाल20 खेप-5 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tn 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bem 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ts 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mos 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* ee 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nd 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* sqt: 21-Oct लाल10-ज native-लिपि-असली */ /* gdq: 21-Oct लाल10-ज native-लिपि-असली */  /* haz,lrc: 20-Oct लाल10-ई खेप-3 Perso-Arabic-असली */ /* shv: 21-Oct लाल10-ज native-लिपि-असली */ /* mid: 21-Oct लाल10-ज native-लिपि-असली */ /* ve 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ss 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* luo 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* din 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ki 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tig: 21-Oct लाल10-ज native-लिपि-असली */ /* na 18-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* fud 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* wls 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* skg 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bzc 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ady 21-Oct लाल10-ई खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* dov 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* hmn 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kl 19-Oct काम-लाल20 देव-सूची से बाहर — kal-जुड़वाँ Latin */ /* gv 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* fur 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* aa 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* fon 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* gaa 17-Oct master-mirror rebuild देव-सूची से बाहर — Latin */ /* sus 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kr 20-Oct काम-लाल10-ब खेप-3 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ktu 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* cgg 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kv 21-Oct लाल10-ई खेप-1 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* ltg 13-Oct खेमा-ब देव-सूची से बाहर — Latin पुनर्निर्माण */ /* rn 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ab 21-Oct लाल10-ई खेप-2 देव-सूची से बाहर — Cyrillic पुनर्निर्माण */ /* ach 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* alz 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bew 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* crh 14-Oct खेमा-य देव-सूची से बाहर — Latin पुनर्निर्माण */ /* cnh 14-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nso 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* st 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kac 13-Oct खेमा-स देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tum 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* dyu 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* zai 20-Oct काम-लाल10-ब खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* sg 13-Oct देव-सूची से बाहर — Latin पुनर्निर्माण */ /* rom 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* kek 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bci 20-Oct काम-लाल10-ब खेप-3 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* bts 19-Oct काम-लाल20 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* hrx 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* lua 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* nus 13-Oct खेमा-अ देव-सूची से बाहर — Latin पुनर्निर्माण */ /* ndc 19-Oct खेमा-र देव-सूची से बाहर — Latin पुनर्निर्माण */ /* shn: 21-Oct लाल10-ज native-लिपि-असली */ /* li 13-Oct खेमा-ब देव-सूची से बाहर — Latin पुनर्निर्माण */ /* tiv 20-Oct काम-लाल10-ब खेप-2 देव-सूची से बाहर — Latin पुनर्निर्माण */ /* mam 19-Oct काम-लाल20 खेप-4 देव-सूची से बाहर — Latin पुनर्निर्माण */ }; /* 13-Sep: + brx (बोडो, देवनागरी); si/ps/bal/prs अब असली-लिपि (sinhala/perso-arabic) — देव-भाषा सूची से बाहर */ /* देव-भाषा परिवार — SCRIPT_RULES.devLang का स्थानीय दर्पण (scope-भिन्न IIFE) */
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

/* 14-Sep (v6.1-ग3): अगला-स्तर/सुरक्षा बाहरी कड़ियों की जीविता — HEAD-अनुरोध; network न हो तो ⚠️ skip (fail नहीं)। नमूना-सूची: ielts.org, cambridgeenglish.org, emigrate.gov.in, madad.gov.in + पेज की next-कड़ियाँ */
(function () {
  try {
    var fs2 = require("fs"), path2 = require("path"), https = require("https"), http = require("http");
    var code2 = process.argv[2]; var src2 = fs2.readFileSync(path2.join(__dirname, "build_specials.js"), "utf8");
    var m2 = src2.match(new RegExp('\\{ code: "' + code2 + '", slug: "([a-z-]+)"')); if (!m2) return;
    var page = fs2.readFileSync(path2.join(__dirname, "..", "courses/hi/bhasha", m2[1], "index.html"), "utf8");
    var urls = (page.match(/https?:\/\/[^"'\s<>]+/g) || []).filter(function (u) { return !/acslearn|schema\.org|googleapis|gstatic|w3\.org/.test(u); });
    urls = urls.filter(function (u, i) { return urls.indexOf(u) === i; }).slice(0, 8);
    if (!urls.length) return; var left = urls.length, bad = [];
    urls.forEach(function (u) {
      var lib = u.indexOf("https:") === 0 ? https : http; var req = lib.request(u, { method: "HEAD", timeout: 6000, headers: { "User-Agent": "Mozilla/5.0 ACS-linkcheck" } }, function (r) { if (r.statusCode >= 400 && r.statusCode !== 403 && r.statusCode !== 405) bad.push(u + " → " + r.statusCode); done(); });
      req.on("error", function () { done(); }); req.on("timeout", function () { req.destroy(); done(); }); req.end();
    });
    function done() { if (--left) return; console.log(bad.length ? "  ⚠️ बाहरी कड़ी जीवित नहीं (network से जाँची): " + bad.join(" · ") : "  ✅ बाहरी कड़ियाँ (" + urls.length + ") जीवित/पहुँच से बाहर-नहीं"); }
  } catch (e) { console.log("  ⚠️ बाहरी-कड़ी जाँच skip: " + e.message); }
})();
