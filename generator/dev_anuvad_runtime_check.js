/* ============================================================
   generator/dev_anuvad_runtime_check.js — v1.1 (09-Nov-2026: en पूरी-झाड़ू 26-क़दम जुड़ी)
   काम-अनुवाद-1 का runtime-यंत्र (नक़ली-DOM, असली node से):
   जाँच-अ (A/B): पुराना इंजन बनाम नया इंजन, हिंदी-रास्ते पर —
     द्वार-कार्ड (नया + जारी), scale/pick/pair/story प्रश्न,
     कथा-कार्ड, नतीजा — हर स्क्रीन का innerHTML byte-हूबहू हो।
   जाँच-ब (en): नया इंजन + apt_strings.js + apt_en.js overlay —
     हर स्क्रीन बने, और rendered HTML में Devanagari शून्य हो
     (SVG-चित्रों के भीतर का पाठ भी गिना जाता है)।
   चलाना: node generator/dev_anuvad_runtime_check.js \
          <पुराना-इंजन> <नया-इंजन> <assets-folder>
   fail-closed: कोई भी बेमेल = exit 1, कोई देय नहीं।
   ============================================================ */
"use strict";
var fs = require("fs");
var path = require("path");

var OLD_ENGINE = process.argv[2];
var NEW_ENGINE = process.argv[3];
var ASSETS = process.argv[4];
if (!OLD_ENGINE || !NEW_ENGINE || !ASSETS) {
  console.error("उपयोग: node dev_anuvad_runtime_check.js <old.js> <new.js> <assets-dir>");
  process.exit(1);
}

/* ---------- नक़ली browser ---------- */
function makeEl(id) {
  var el = {
    id: id || "", innerHTML: "", _cls: {}, style: {},
    classList: {
      add: function (c) { el._cls[c] = 1; },
      remove: function (c) { delete el._cls[c]; },
      contains: function (c) { return !!el._cls[c]; }
    },
    scrollTop: 0,
    getElementsByClassName: function () { return []; },
    setAttribute: function (k, v) { el["_attr_" + k] = String(v); },
    getAttribute: function (k) { return el["_attr_" + k] != null ? el["_attr_" + k] : null; },
    scrollIntoView: function () {},
    onclick: null, disabled: false, href: ""
  };
  return el;
}
function makeWin(state) {
  var box = makeEl("apt-box");
  var reg = { "apt-box": box };
  var store = {};
  if (state) store["acs_apt_v1"] = JSON.stringify(state);
  var doc = {
    body: makeEl("body"),
    referrer: "",
    createElement: function () { return makeEl(""); },
    getElementById: function (id) {
      if (id === "apt-box") return box;
      /* हर render पर ताज़ा DOM: innerHTML बदलते ही बटन-register ख़ाली (test-harness नियम v4.6) */
      if (!reg[id]) reg[id] = makeEl(id);
      return reg[id];
    },
    querySelector: function () { return null; }
  };
  /* innerHTML-setter पैटर्न: नया HTML = पुराने बटन object नहीं */
  Object.defineProperty(box, "innerHTML", {
    get: function () { return box._h || ""; },
    set: function (v) { box._h = v; reg = { "apt-box": box }; }
  });
  var win = {
    location: { search: "", hash: "", hostname: "acslearn.com", pathname: "/aptitude-test.html" },
    sessionStorage: { getItem: function () { return null; }, setItem: function () {} },
    localStorage: {
      getItem: function (k) { return store[k] != null ? store[k] : null; },
      setItem: function (k, v) { store[k] = String(v); },
      removeItem: function (k) { delete store[k]; }
    },
    scrollTo: function () {},
    document: doc, box: box, reg: function (id) { return reg[id]; }
  };
  return win;
}
function bootEngine(enginePath, win, lang, extraAssets) {
  var code = "";
  code += fs.readFileSync(path.join(ASSETS, "aptitude_data.js"), "utf8") + "\n";
  code += fs.readFileSync(path.join(ASSETS, "aptitude_art.js"), "utf8") + "\n";
  code += fs.readFileSync(path.join(ASSETS, "mg_names.js"), "utf8") + "\n";
  (extraAssets || []).forEach(function (f) { code += fs.readFileSync(f, "utf8") + "\n"; });
  if (lang) code += 'window.APT_LANG="' + lang + '";\n';
  code += fs.readFileSync(enginePath, "utf8");
  var sandbox = "(function(window,document,location,localStorage,sessionStorage,navigator){" + code + "\n})";
  /* eslint-disable no-eval */
  eval(sandbox)(win, win.document, win.location, win.localStorage, win.sessionStorage, {});
  return win;
}
function click(win, id) {
  var el = win.reg(id) || win.document.getElementById(id);
  if (!el || typeof el.onclick !== "function") return false;
  el.onclick.call(el);
  return true;
}
function clickOpt(win, cls, idx, attr, val) {
  /* render के बाद option-बटन onclick getElementsByClassName से बँधते हैं —
     नक़ली-DOM में वे register नहीं होते; सीधी state-लिखाई से नहीं,
     बल्कि answers पहले से state में देकर जाँचते हैं। */
  return false;
}

/* ---------- जाँच-ढाँचा ---------- */
var fails = 0;
function ok(name, cond, detail) {
  if (cond) { console.log("  ✅ " + name); }
  else { fails++; console.log("  ❌ " + name + (detail ? " :: " + detail : "")); }
}
function snap(enginePath, state, lang, extras) {
  var win = makeWin(state);
  bootEngine(enginePath, win, lang, extras);
  return win;
}
var STR_FILE = path.join(ASSETS, "apt_strings.js");
var EN_FILE = path.join(ASSETS, "apt_en.js");

/* हालत-नमूने: हर प्रश्न-प्रकार + कथा + नतीजा */
var STATES = [
  { name: "gate-नया", st: null, after: null },
  { name: "gate-जारी (pos=5)", st: { pos: 5, ans: { q001: { v: 4 } }, done: false, started: 1 }, after: null },
  { name: "scale q001 (pos=0, खुला)", st: { pos: 0, ans: {}, done: false, started: 1 }, open: true },
  { name: "pick q004 (pos=3, आधा-जवाब)", st: { pos: 3, ans: { q004: { first: 1, last: null } }, done: false, started: 1 }, open: true },
  { name: "pair q008 (pos=7, जवाब)", st: { pos: 7, ans: { q008: { v: 0 } }, done: false, started: 1 }, open: true },
  { name: "story q010 (pos=9, जवाब)", st: { pos: 9, ans: { q010: { v: 2 } }, done: false, started: 1 }, open: true },
  { name: "कथा-विराम (pos=10)", st: { pos: 10, ans: {}, done: false, started: 1 }, open: true },
  { name: "नतीजा", st: { pos: 99, ans: { q001: { v: 4 }, q002: { v: 2 }, q004: { first: 0, last: 2 }, q008: { v: 1 }, q010: { v: 0 } }, done: true, doneAt: "9/11/2026", started: 1 }, open: false }
];
function renderOf(enginePath, spec, lang, extras) {
  var win = snap(enginePath, spec.st, lang, extras);
  if (spec.open) click(win, "apt-open"); /* gate से टेस्ट खोलना (st.pos बना रहता है) */
  return win.box.innerHTML;
}

console.log("— जाँच-अ: A/B byte-मिलान (हिंदी-रास्ता, पुराना बनाम नया) —");
STATES.forEach(function (spec) {
  var a = renderOf(OLD_ENGINE, spec, null, []);
  var b = renderOf(NEW_ENGINE, spec, null, [STR_FILE]);
  ok("hi A/B :: " + spec.name, a === b && a.length > 0,
    a === b ? "" : "लंबाई " + a.length + " बनाम " + b.length);
});

console.log("— जाँच-ब: en-रास्ता (नया इंजन + overlay) —");
var devRe = /[\u0900-\u097F]/;
STATES.forEach(function (spec) {
  var h;
  try { h = renderOf(NEW_ENGINE, spec, "en", [STR_FILE, EN_FILE]); }
  catch (e) { ok("en render :: " + spec.name, false, e.message); return; }
  var vis = h.replace(/<svg[\s\S]*?<\/svg>/g, function (sv) { return sv; });
  ok("en render बना :: " + spec.name, h.length > 0);
  ok("en Devanagari शून्य :: " + spec.name, !devRe.test(h),
    devRe.test(h) ? ("पहला: " + (h.match(/[\u0900-\u097F][^<]{0,40}/) || [""])[0]) : "");
});

/* जाँच-स: en पूरी झलक-झाड़ू — flow के सब 26 क़दम (24 प्रश्न + 2 कथाएँ)
   एक-एक render करके हर स्क्रीन पर Devanagari-शून्य (sampling-gap बंद) */
(function () {
  var leak = [], fail = 0;
  for (var p = 0; p < 26; p++) {
    var h;
    try { h = renderOf(NEW_ENGINE, { st: { pos: p, ans: {}, done: false, started: 1 }, open: true }, "en", [STR_FILE, EN_FILE]); }
    catch (e) { fail++; continue; }
    if (!h || !h.length) { fail++; continue; }
    if (devRe.test(h)) leak.push("pos=" + p);
  }
  ok("en पूरी-झाड़ू: 26/26 क़दम बने", fail === 0, fail + " क़दम गिरे");
  ok("en पूरी-झाड़ू: Devanagari शून्य (26 क़दम)", leak.length === 0, leak.join(","));
})();

/* en overlay बिना strings के गिरे नहीं (fail-safe): सिर्फ़ strings, overlay नहीं */
(function () {
  var h = renderOf(NEW_ENGINE, STATES[0], "en", [STR_FILE]);
  ok("en बिना-overlay fail-safe (hi strings पर गिरता है, ख़ाली नहीं)", h.length > 0);
})();

console.log(fails === 0 ? "\n🏁 runtime-यंत्र: सब जाँचें पास" : "\n⛔ FAIL: " + fails + " जाँचें गिरीं");
process.exit(fails === 0 ? 0 : 1);
