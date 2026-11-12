/* ============================================================
   generator/dev_apt_en_check.js — v1.0 (12-Nov-2026) · runtime-जाँच (upload नहीं होती; पन्ने इसे नहीं बुलाते)
   काम: पूरी 120-प्रश्न परीक्षा को नक़ली DOM पर English में चलाना, और हिंदी से मिलाना।
   हर आयु-पट्टी (10-13, 14-17, 18+) पर दोनों भाषाओं में वही दबाव-क्रम चलता है। जाँचें:
     E1  English सफ़र 120/120, जमा, नतीजा
     E2  परदे पर आया हर पाठ (HTML tag और चित्र हटाकर): देवनागरी शून्य
     E3  English टुकड़े उतरे; हिंदी पन्ने पर एक भी English फ़ाइल नहीं माँगी गई
     E4  भाषा से चुनाव और गिनती नहीं बदलती: वही प्रश्न-क्रम, वही शीर्ष समूह-क्रम, वही उद्यम-क्रम (हिंदी = English)
     E5  चित्रों (SVG) के भीतर देवनागरी: शून्य (इंजन का AX() तालिका से बदलता है)
     E6  बिना बैज/भुगतान: द्वार-कार्ड English में, परीक्षा बंद, Login-कड़ी मौजूद (₹100 का बटन भुगतान-फ़ाइल login जाँचकर बाद में दिखाती है)
   चलाना: node generator/dev_apt_en_check.js   (repo की जड़ से)
   ============================================================ */
"use strict";
var fs = require("fs");
var DEV = /[\u0900-\u097F]/;
var YEAR = new Date().getFullYear();
function run(lang, yob) {
  var files = { "/assets/apt_sets/broad.js": "assets/apt_sets/broad.js", "/assets/udyam_data.js": "assets/udyam_data.js", "/assets/apt_sets_en/broad.js": "assets/apt_sets_en/broad.js" };
  for (var m = 1; m <= 24; m++) { var nm = "mg" + (m < 10 ? "0" + m : m) + ".js"; files["/assets/apt_sets/" + nm] = "assets/apt_sets/" + nm; files["/assets/apt_sets_en/" + nm] = "assets/apt_sets_en/" + nm; }
  var st = {}, asked = [], screens = [];
  st["acs_apt_gate_v1"] = JSON.stringify({ until: Date.now() + 86400000, role: "jobseeker" });
  global.localStorage = { getItem: function (k) { return st[k] || null; }, setItem: function (k, v) { st[k] = v; }, removeItem: function (k) { delete st[k]; } };
  global.window = { APT_POOL: [], scrollTo: function () {}, scrollY: 0 };
  if (lang !== "hi") global.window.APT_LANG = lang;
  global.confirm = function () { return true; };
  global.alert = function (t) { throw new Error("alert: " + t); };
  var lastIntervalFn = null;
  global.setInterval = function (fn) { lastIntervalFn = fn; return {}; };
  global.clearInterval = function () { lastIntervalFn = null; };
  var ev = function (f) { (0, eval)(fs.readFileSync(f, "utf8")); };
  ev("assets/aptitude_data.js"); ev("assets/apt_strings.js"); ev("assets/mg_names.js"); ev("assets/aptitude_art.js");
  if (lang !== "hi") { ev("assets/apt_" + lang + ".js"); ev("assets/apt_session_" + lang + ".js"); }
  var reg = {}, boxS = { offsetTop: 0, _q: {} }, _html = "";
  Object.defineProperty(boxS, "innerHTML", { get: function () { return _html; }, set: function (v) { _html = v; reg = {}; screens.push(v); } });
  function stubsFor(attr) { var out = [], re = new RegExp(attr + '="(-?\\d+)"', "g"), mm; while ((mm = re.exec(boxS.innerHTML))) { (function (val) { out.push({ getAttribute: function () { return val; } }); })(mm[1]); } return out; }
  boxS.querySelectorAll = function (sel) { var attr = sel.replace(/[\[\]]/g, ""); var arr = stubsFor(attr); boxS._q[attr] = arr; return arr; };
  global.document = { hidden: false,
    getElementById: function (id) { if (id === "apt-sess-box") return boxS; if (boxS.innerHTML.indexOf('id="' + id + '"') < 0) return null; if (!reg[id]) reg[id] = {}; return reg[id]; },
    createElement: function () { return {}; },
    head: { appendChild: function (sc) { asked.push(sc.src); var fp = files[sc.src]; if (!fp || !fs.existsSync(fp)) { if (sc.onerror) sc.onerror(); return; }
      var code = fs.readFileSync(fp, "utf8"); if (fp.indexOf("udyam") >= 0) code += "\n;window.ALL_SECTORS = ALL_SECTORS;"; (0, eval)(code); if (sc.onload) sc.onload(); } } };
  (0, eval)(fs.readFileSync("assets/apt-session.js", "utf8"));
  if (boxS.innerHTML.indexOf('id="apt-go"') < 0) throw new Error(lang + ": शुरुआत-कार्ड नहीं बना");
  reg["apt-yob"] = { value: yob }; document.getElementById("apt-go"); reg["apt-go"].onclick();
  var guard = 0, clicked = 0, order = [];
  while (guard++ < 4000) {
    if (boxS.innerHTML.indexOf('id="apt-lock"') >= 0) break;
    if (boxS.innerHTML.indexOf('id="apt-next"') >= 0) { var ticks = 0; while (ticks++ < 35 && !(reg["apt-next"] && typeof reg["apt-next"].onclick === "function")) { if (lastIntervalFn) lastIntervalFn(); }
      if (!(reg["apt-next"] && typeof reg["apt-next"].onclick === "function")) throw new Error(lang + ": कथा के बाद आगे-बटन सक्रिय नहीं"); reg["apt-next"].onclick(); continue; }
    var pool = (boxS._q["data-v11"] || []).concat(boxS._q["data-v"] || [], boxS._q["data-i"] || []);
    var withClick = pool.filter(function (b) { return typeof b.onclick === "function"; });
    if (!withClick.length) { if (reg["apt-skiporgo"] && typeof reg["apt-skiporgo"].onclick === "function") { reg["apt-skiporgo"].onclick(); continue; } throw new Error(lang + ": session अटका (क़दम " + guard + ")"); }
    try { var Sx = JSON.parse(st["acs_apt_sess_v1"]); if (Sx.cur && Sx.cur.queue && Sx.cur.queue[0] && order[order.length - 1] !== Sx.cur.queue[0]) order.push(Sx.cur.queue[0]); } catch (e) {}
    withClick[clicked % 3 === 0 ? 0 : withClick.length - 1].onclick(); clicked++;
  }
  if (boxS.innerHTML.indexOf('id="apt-lock"') < 0) throw new Error(lang + ": 120 के बाद जमा-कार्ड नहीं आया");
  var got = Object.keys(JSON.parse(st["acs_apt_sess_v1"]).cur.ans).length;
  reg["apt-lock"].onclick();
  var S2 = JSON.parse(st["acs_apt_sess_v1"]);
  if (!S2.attempts.length || !S2.prev) throw new Error(lang + ": नतीजा/lock दर्ज नहीं");
  return { got: got, screens: screens, asked: asked, order: order, prev: S2.prev, result: boxS.innerHTML };
}
function visible(html) { return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<"); }
var fails = [], bands = [["10-13", YEAR - 11], ["14-17", YEAR - 15], ["18+", YEAR - 30]], svgDev = {};
bands.forEach(function (b) {
  var H = run("hi", b[1]), E = run("en", b[1]);
  if (E.got !== 120) fails.push("E1 " + b[0] + ": English जवाब " + E.got + "/120");
  if (H.got !== 120) fails.push("E1 " + b[0] + ": हिंदी जवाब " + H.got + "/120");
  var leak = []; E.screens.forEach(function (h) { var v = visible(h); if (DEV.test(v)) { var mm = v.match(/[^\s]*[\u0900-\u097F][^\n]{0,60}/); leak.push(mm ? mm[0].trim() : "?"); } });
  var uniq = {}; leak.forEach(function (x) { uniq[x] = 1; });
  if (leak.length) fails.push("E2 " + b[0] + ": परदे पर देवनागरी " + leak.length + " बार; नमूने: " + Object.keys(uniq).slice(0, 5).join(" ‖ "));
  E.screens.forEach(function (h) { (h.match(/<svg[\s\S]*?<\/svg>/g) || []).forEach(function (s) { if (DEV.test(s)) { var t = (s.match(/>([^<]*[\u0900-\u097F][^<]*)</) || [])[1] || "?"; svgDev[t.trim()] = (svgDev[t.trim()] || 0) + 1; } }); });
  var enAsked = E.asked.filter(function (u) { return u.indexOf("/assets/apt_sets_en/") === 0; }).length, hiAskedEn = H.asked.filter(function (u) { return u.indexOf("_en") > -1; }).length;
  if (!enAsked) fails.push("E3 " + b[0] + ": English टुकड़े नहीं उतरे"); if (hiAskedEn) fails.push("E3 " + b[0] + ": हिंदी पन्ने ने English फ़ाइल माँगी (" + hiAskedEn + ")");
  if (JSON.stringify(H.order) !== JSON.stringify(E.order)) fails.push("E4 " + b[0] + ": प्रश्न-क्रम भाषा से बदला");
  if (JSON.stringify(H.prev.udy.map(function (u) { return [u.n, u.s]; })) !== JSON.stringify(E.prev.udy.map(function (u) { return [u.n, u.s]; }))) fails.push("E4 " + b[0] + ": उद्यम-क्रम/अंक भाषा से बदले");
  if (H.prev.mg.length !== E.prev.mg.length) fails.push("E4 " + b[0] + ": शीर्ष-समूह गिनती बदली");
  if (!DEV.test(visible(H.result))) fails.push("हिंदी " + b[0] + ": हिंदी नतीजे में हिंदी नहीं (इंजन बिगड़ा?)");
  console.log("आयु " + b[0] + " | हिंदी " + H.got + "/120 · English " + E.got + "/120 | परदे " + E.screens.length + " · देवनागरी-रिसाव " + leak.length + " | English टुकड़े माँगे " + enAsked + " · हिंदी ने English माँगा " + hiAskedEn + " | प्रश्न-क्रम बराबर " + (JSON.stringify(H.order) === JSON.stringify(E.order)) + " (" + E.order.length + ") | शीर्ष: " + E.prev.mg.join(", ") + " | उद्यम: " + E.prev.udy.slice(0, 3).map(function (u) { return u.nm; }).join("; "));
});
/* E6: बिना बैज/भुगतान के English पन्ना: द्वार-कार्ड English में दिखे, परीक्षा न खुले */
(function () {
  var st = {}; global.localStorage = { getItem: function (k) { return st[k] || null; }, setItem: function (k, v) { st[k] = v; }, removeItem: function (k) { delete st[k]; } };
  global.window = { APT_POOL: [], scrollTo: function () {}, scrollY: 0, APT_LANG: "en" };
  var ev = function (f) { (0, eval)(fs.readFileSync(f, "utf8")); };
  ev("assets/aptitude_data.js"); ev("assets/apt_strings.js"); ev("assets/mg_names.js"); ev("assets/aptitude_art.js"); ev("assets/apt_en.js"); ev("assets/apt_session_en.js");
  var boxG = { innerHTML: "" };
  global.document = { getElementById: function (id) { return id === "apt-sess-box" ? boxG : null; }, createElement: function () { return {}; }, head: { appendChild: function () {} } };
  (0, eval)(fs.readFileSync("assets/apt-session.js", "utf8"));
  var v = visible(boxG.innerHTML);
  if (boxG.innerHTML.indexOf('id="apt-go"') >= 0) fails.push("E6: बिना बैज English परीक्षा खुल गई");
  if (DEV.test(v)) fails.push("E6: द्वार-कार्ड में देवनागरी: " + (v.match(/[^\s]*[\u0900-\u097F][^\n]{0,50}/) || ["?"])[0]);
  if (boxG.innerHTML.indexOf("Login / Dashboard") < 0) fails.push("E6: द्वार-कार्ड में Login / Dashboard की कड़ी नहीं");
  console.log("E6 बिना बैज: द्वार-कार्ड English में · परीक्षा बंद · Login-कड़ी " + (boxG.innerHTML.indexOf("Login / Dashboard") >= 0 ? "है" : "नहीं") + " | " + v.replace(/\s+/g, " ").trim().slice(0, 150));
})();
var sk = Object.keys(svgDev);
console.log("E5 चित्रों (SVG) के भीतर देवनागरी: " + sk.length + " अलग पाठ" + (sk.length ? " · " + sk.slice(0, 8).join(" ‖ ") : ""));
if (sk.length) fails.push("E5: चित्रों के भीतर देवनागरी बची (" + sk.join(" ‖ ") + ")");
if (fails.length) { fails.forEach(function (f) { console.log("  ⛔ " + f); }); console.log("⛔ dev_apt_en_check: " + fails.length + " fail"); process.exit(1); }
console.log("🏁 dev_apt_en_check v1.0 : सब पास");
