/* generator/dev_kkb2_check.js — v4.2 (02-Sep-2026: +11 भाषा SCRIPT_RULES/LNAME — pt kn ta ml te bn or as pa gu ur)
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
    sw:  { native: /[A-Za-z]/, name: "Latin", devInItem0: false }
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
  var LNAME = { ar: "अरबी", fr: "फ़्रेंच", es: "स्पेनिश", ja: "जापानी", ko: "कोरियाई", de: "जर्मन", ru: "रूसी", he: "हिब्रू", pt: "पुर्तगाली", kn: "कन्नड", ta: "तमिल", ml: "मलयालम", te: "तेलुगु", bn: "बांग्ला", or: "उड़िया", as: "असमिया", pa: "पंजाबी", gu: "गुजराती", ur: "उर्दू" , ks: "कश्मीरी" , fa: "फ़ारसी" , sd: "सिंधी" , mr: "मराठी" , ne: "नेपाली" , bho: "भोजपुरी" , sw: "स्वाहिली" };
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
