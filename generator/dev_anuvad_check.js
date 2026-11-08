/* ============================================================
   generator/dev_anuvad_check.js — v1.0 (09-Nov-2026) · fail-closed
   काम-अनुवाद-1 का अनुवाद-robot : हिंदी-मूल बनाम लक्ष्य-भाषा data।
   जाँचें:
   1. कुंजी 1:1 : लक्ष्य के q-id हूबहू हिंदी भंडार (q001 से q048,
      layer-1) के बराबर : न कम, न ज़्यादा; बासी-कुंजी रिपोर्ट।
   2. विकल्प-गिनती : हर pick/pair/story में opts की गिनती हिंदी
      जितनी ही; scale में opts कभी नहीं।
   3. ढाँचा-ताला : लक्ष्य-फ़ाइल में सिर्फ़ text/opts/title आएँ :
      mg, udy, band, img, pts वहाँ दिखे तो FAIL (एक चीज़ = एक जगह)।
   4. लिपि-रिसाव : लक्ष्य-पाठ में देवनागरी शून्य (छूट-सूची ALLOWED,
      अभी ख़ाली; ₹ व अंक देवनागरी नहीं हैं)।
   5. संख्या-मिलान : हिंदी पाठ के अंक (24, 100, 120, 125…) लक्ष्य
      में भी मौजूद हों।
   6. डैश-नियम : नए लक्ष्य-पाठ में लंबी रेखा (—) वर्जित।
   7. कथाएँ : चारों id (k_panchar, k_bagiya, k_sabun, k_naav) का
      title + text अनिवार्य।
   8. UI-strings : लक्ष्य ui-कुंजियाँ hi-block (apt_strings.js) से
      1:1; mg-नाम 1 से 24 तक सब भरें।
   9. ख़ाली-पाठ : कोई text/opt/title/ui ख़ाली या सिर्फ़ space नहीं।
   चलाना: node generator/dev_anuvad_check.js <assets-dir> <en-data-dir>
   (<assets-dir> में aptitude_data.js, mg_names.js, apt_strings.js;
    <en-data-dir> में apt_en_questions.js, apt_en_strings.js।)
   fail-closed: कोई भी जाँच गिरी = exit 1 : देय/upload निषिद्ध।
   ============================================================ */
"use strict";
var fs = require("fs");
var path = require("path");

var ALLOWED_DEVANAGARI = []; /* लक्ष्य-पाठ में छूट-प्राप्त देवनागरी टुकड़े : अभी कोई नहीं */
var DEV_RE = /[\u0900-\u097F]/;
var DASH = "\u2014"; /* — */

function loadHi(assetsDir) {
  var w = { window: {} };
  global.window = {};
  delete require.cache[require.resolve(path.join(assetsDir, "aptitude_data.js"))];
  require(path.join(assetsDir, "aptitude_data.js"));
  require(path.join(assetsDir, "mg_names.js"));
  require(path.join(assetsDir, "apt_strings.js"));
  var out = { D: global.window.APT_DATA, MG: global.window.MG_NAMES, STR: global.window.APT_STR };
  return out;
}
function digitsOf(s) {
  var m = String(s).match(/\d+/g) || [];
  var seen = {}, out = [];
  m.forEach(function (d) { if (!seen[d]) { seen[d] = 1; out.push(d); } });
  return out;
}
function devLeak(s) {
  var t = String(s);
  ALLOWED_DEVANAGARI.forEach(function (a) { t = t.split(a).join(""); });
  return DEV_RE.test(t);
}

/* ---------- मुख्य जाँच (module-रूप में भी उपलब्ध : builder इसी को बुलाता है) ---------- */
function validate(assetsDir, enDir, log) {
  log = log || function () {};
  var fails = [];
  function bad(m) { fails.push(m); log("  ❌ " + m); }
  function ok(m) { log("  ✅ " + m); }

  var hi = loadHi(assetsDir);
  var Q = require(path.join(enDir, "apt_en_questions.js"));
  var U = require(path.join(enDir, "apt_en_strings.js"));

  /* झलक-भंडार = layer-1 के 48 प्रश्न */
  var hiQ = (hi.D.questions || []).filter(function (q) { return q.layer === 1; });
  if (hiQ.length !== 48) bad("हिंदी layer-1 भंडार 48 नहीं: " + hiQ.length); else ok("हिंदी layer-1 भंडार = 48");

  /* 1. कुंजी 1:1 + बासी-कुंजी */
  var hiIds = {}, enIds = Object.keys(Q.q || {});
  hiQ.forEach(function (q) { hiIds[q.id] = q; });
  var missing = hiQ.filter(function (q) { return !Q.q[q.id]; }).map(function (q) { return q.id; });
  var stale = enIds.filter(function (id) { return !hiIds[id]; });
  if (missing.length) bad("लक्ष्य में छूटे प्रश्न: " + missing.join(",")); else ok("48/48 प्रश्न-कुंजी मौजूद");
  if (stale.length) bad("बासी-कुंजी (हिंदी में नहीं): " + stale.join(",")); else ok("बासी-कुंजी शून्य");

  /* 2 से 6 : हर प्रश्न */
  var optBad = [], structBad = [], leak = [], numBad = [], dashBad = [], emptyBad = [];
  hiQ.forEach(function (q) {
    var t = Q.q[q.id]; if (!t) return;
    Object.keys(t).forEach(function (k) {
      if (k !== "text" && k !== "opts") structBad.push(q.id + "." + k);
    });
    if (!t.text || !String(t.text).trim()) emptyBad.push(q.id + ".text");
    if (q.opts) {
      if (!t.opts || t.opts.length !== q.opts.length) optBad.push(q.id + " (" + (t.opts ? t.opts.length : 0) + "/" + q.opts.length + ")");
      (t.opts || []).forEach(function (o, i) { if (!o || !String(o).trim()) emptyBad.push(q.id + ".opts[" + i + "]"); });
    } else if (t.opts) optBad.push(q.id + " (scale में opts)");
    var all = [t.text].concat(t.opts || []);
    all.forEach(function (s) {
      if (devLeak(s)) leak.push(q.id);
      if (String(s).indexOf(DASH) >= 0) dashBad.push(q.id);
    });
    var hiAll = [q.text].concat((q.opts || []).map(function (o) { return o.label; })).join(" ");
    var enAll = all.join(" ");
    digitsOf(hiAll).forEach(function (d) { if (enAll.indexOf(d) < 0) numBad.push(q.id + ":" + d); });
  });
  function rep(name, arr) { if (arr.length) bad(name + ": " + arr.slice(0, 8).join(", ") + (arr.length > 8 ? " +" + (arr.length - 8) : "")); else ok(name + " : शून्य दोष"); }
  rep("विकल्प-गिनती बेमेल", optBad);
  rep("ढाँचा-ताला भंग (text/opts के सिवा खाना)", structBad);
  rep("देवनागरी-रिसाव (प्रश्न)", leak);
  rep("संख्या-बेमेल", numBad);
  rep("डैश-नियम भंग (प्रश्न)", dashBad);
  rep("ख़ाली-पाठ", emptyBad);

  /* 7. कथाएँ */
  var kIds = (hi.D.stories || []).map(function (k) { return k.id; });
  var kMiss = kIds.filter(function (id) { return !(Q.k && Q.k[id] && Q.k[id].title && Q.k[id].text); });
  var kStale = Object.keys(Q.k || {}).filter(function (id) { return kIds.indexOf(id) < 0; });
  var kLeak = [], kDash = [];
  kIds.forEach(function (id) {
    var t = Q.k && Q.k[id]; if (!t) return;
    [t.title, t.text].forEach(function (s) {
      if (devLeak(s)) kLeak.push(id);
      if (String(s).indexOf(DASH) >= 0) kDash.push(id);
    });
  });
  rep("कथा छूटी/अधूरी", kMiss); rep("कथा बासी-कुंजी", kStale);
  rep("देवनागरी-रिसाव (कथा)", kLeak); rep("डैश-नियम भंग (कथा)", kDash);

  /* 8. UI-strings + mg */
  var hiUI = (hi.STR && hi.STR.hi) || {};
  var uiMiss = Object.keys(hiUI).filter(function (k) { return !(U.ui && U.ui[k] != null); });
  var uiStale = Object.keys(U.ui || {}).filter(function (k) { return hiUI[k] == null; });
  rep("UI-कुंजी छूटी", uiMiss); rep("UI बासी-कुंजी", uiStale);
  var uiLeak = [], uiDash = [], uiEmpty = [];
  Object.keys(U.ui || {}).forEach(function (k) {
    var v = U.ui[k];
    var list = Array.isArray(v) ? v : [v];
    list.forEach(function (s) {
      if (k !== "dateLocale" && devLeak(s)) uiLeak.push(k);
      if (String(s).indexOf(DASH) >= 0) uiDash.push(k);
      if (k !== "resumeFrom" && (s == null || !String(s).trim())) uiEmpty.push(k);
    });
  });
  if (U.ui && U.ui.faces && U.ui.faces.length !== 5) bad("faces 5 नहीं: " + U.ui.faces.length); else ok("faces = 5");
  rep("देवनागरी-रिसाव (UI)", uiLeak); rep("डैश-नियम भंग (UI)", uiDash); rep("ख़ाली UI-पाठ", uiEmpty);
  var mgMiss = [];
  for (var m = 1; m <= 24; m++) if (!(U.mg && U.mg[m] && String(U.mg[m]).trim())) mgMiss.push(m);
  rep("MG-नाम छूटे (1 से 24)", mgMiss);
  var mgLeak = [];
  for (m = 1; m <= 24; m++) if (U.mg && U.mg[m] && devLeak(U.mg[m])) mgLeak.push(m);
  rep("देवनागरी-रिसाव (MG)", mgLeak);
  /* "950 उद्यम" नियम: enterprise शब्द अनिवार्य, industries/sectors वर्जित */
  var udy = (U.ui && U.ui.btnUdyam) || "";
  if (/industr|sector/i.test(udy)) bad('btnUdyam में "industries/sectors" वर्जित: ' + udy);
  else if (!/enterprise/i.test(udy)) bad('btnUdyam में "enterprise" शब्द चाहिए: ' + udy);
  else ok('"950 उद्यम" अनुवाद-नियम पास (enterprise opportunities)');

  return fails;
}

module.exports = { validate: validate };

if (require.main === module) {
  var assetsDir = path.resolve(process.argv[2] || "assets");
  var enDir = path.resolve(process.argv[3] || "generator/data/aptitude/en");
  console.log("dev_anuvad_check v1.0 : " + assetsDir + " बनाम " + enDir);
  var fails = validate(assetsDir, enDir, console.log);
  if (fails.length) { console.log("\n⛔ FAIL : " + fails.length + " दोष : देय निषिद्ध।"); process.exit(1); }
  console.log("\n🏁 dev_anuvad_check : सब जाँचें पास");
}
