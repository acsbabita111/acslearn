/* generator/dev_kkb2_check.js — v1.0 (30-Aug-2026)
   KKB स्तर-2 (A2) का स्थायी check-robot। चलाना: node generator/dev_kkb2_check.js (repo-रूट से)
   जाँचें: (1) data v2.0-FINAL — 1,650 वाक्य · A=308 · schema · listen×13 · dialog×13 · [ ] शून्य
   (2) इंजन-boot नक़ली-DOM पर — home में 13 सप्ताह-कार्ड + ⭐ बटन render हों */
"use strict";
var fs = require("fs");
global.window = {};
eval(fs.readFileSync("assets/kkb2_data.js", "utf8"));
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
if (html.indexOf("सप्ताह-13") < 0) { console.log("⛔ home में सप्ताह-13 नहीं"); fail++; }
if (html.indexOf("ज़रूर-बोलो अभ्यास (308") < 0) { console.log("⛔ ⭐-बटन/A-गिनती नहीं"); fail++; }
if (html.indexOf("kkb2-week") < 0) { console.log("⛔ सप्ताह-कार्ड नहीं"); fail++; }
console.log("इंजन-boot: home render " + (html.length > 500 ? "✅" : "⛔") + " (" + html.length + " chars)");
/* गहरे दृश्य */
function shot(args, mustHave, naam) {
  try { global.window.kkb2Go.apply(null, args); } catch (e) { console.log("⛔ " + naam + " त्रुटि: " + e.message); fail++; return; }
  var h2 = root._h || "";
  for (var m = 0; m < mustHave.length; m++) if (h2.indexOf(mustHave[m]) < 0) { console.log("⛔ " + naam + " में नहीं: " + mustHave[m]); fail++; }
  console.log(naam + " render ✅ (" + h2.length + " chars)");
}
shot(["d", 0, 0], ["ACS-GSU-000501", "लक्ष्य-शब्द", "मैंने बोला", "🎧"], "दिन-1");
shot(["lis", 0, 0], ["सुनो-जवाब जाँच", "बोलने-अभ्यास", "दिन पूरा हुआ"], "🎧-जाँच");
shot(["dlg", 0], ["संवाद", "🔊"], "🗣️-संवाद");
shot(["t", 0], ["wa.me", "सहारा-पंक्तियाँ"], "📞-टेस्ट");
shot(["must"], ["ज़रूर-बोलो", "सप्ताह-1"], "⭐-अभ्यास");
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
var missing = [];
var PJC = global.PRIVATE_JOB_COURSES || [];
if (!PJC.length) { console.log("⛔ सूची-guard: courses_data पढ़ी नहीं गई (सूची ख़ाली)"); process.exit(1); } /* झूठे-पास पर स्थायी ताला */
PJC.forEach(function (c) {
  if (c.mg === 11 && /^PJ/.test(c.id) && page.indexOf("'" + c.id + "'") < 0) missing.push(c.id);
});
if (missing.length) { console.log("⛔ कोर्स-सूची से छूटी भाषाएँ: " + missing.join(",")); process.exit(1); }
console.log("सूची-guard: सब भाषा-कोर्स कोर्स-सूची पेज में दर्ज ✅");
console.log("🏁🏁 dev_kkb2_check: सब जाँचें पास");
