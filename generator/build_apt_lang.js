/* ============================================================
   generator/build_apt_lang.js : v2.0.1 (14-Nov-2026, खेप 5-ख: एक संकेत-संदेश सुधरा; v2.0 14-Nov-2026; v1.0 12-Nov-2026) · परत-4
   काम: एक नई भाषा के करियर टेस्ट का repo-हिस्सा बनाना (हिंदी और English को छोड़कर बाक़ी 28 भाषाओं के लिए एक ही यंत्र)।
   चलाना: node generator/build_apt_lang.js <भाषा-कोड> [--check]
     --check = कुछ नहीं लिखता; देखता है कि repo की फ़ाइलें वही हैं जो यह यंत्र आज बनाएगा (ताज़गी-जाँच)।
   v2.0 क्यों: 13-Nov-2026 से पूरा प्रश्न-भंडार server पर है (Founder का नियम: फीस से जुड़ा content repo पर नहीं)।
     इसलिए यह यंत्र अब प्रश्न-टुकड़े नहीं बनाता, और repo में किसी भाषा का भंडार मिले तो रुक जाता है।
     भंडार का स्रोत-पाठ और उसका यंत्र server-पैकेज में हैं (bank-src/, build_apt_bank.js); वे GitHub पर नहीं आते।
   स्रोत (हाथ से लिखे जाते हैं; सब generator/data/aptitude/<कोड>/ में):
     preview.txt         झलक के 48 प्रश्न (id|पाठ|विकल्प…) और 4 कथाएँ (id|शीर्षक|पाठ)। झलक मुफ़्त है, इसलिए repo पर है।
     udyam.txt           951 उद्यमों के नाम (संख्या|नाम): नतीजे पर दिखते हैं
     strings.js          छोटी तालिकाएँ: ui (झलक के बटन/संदेश), mg (24 समूह-नाम), session + pay (पूरी परीक्षा और भुगतान के वाक्यांश),
                         art (चित्रों के भीतर का अक्षर), page + pageAttr (पन्ने के वाक्य), notice (सिर्फ़ उन भाषाओं में जिन पर "AI-अनुवाद" पट्टी है)
     glossary_map.json   तय शब्दावली (झलक पर यहाँ लगती है; पूरे भंडार पर server-यंत्र यही फ़ाइल लगाता है)
   बनता है (हाथ से कभी न बदलें):
     assets/apt_<कोड>.js · assets/apt_session_<कोड>.js · assets/apt_udyam_<कोड>.js · <कोड>/aptitude-test.html
   fail-closed: किसी भी चरण में एक भी दोष = कोई फ़ाइल नहीं लिखी जाती।
   पन्ने का ढाँचा (मेन्यू, फ़ुटर, ब्रांड-पंक्तियाँ) उसी भाषा के live करियर-पन्ने की तालिका (generator/career_<कोड>_strings.js) से आता है:
     site भर एक ही शब्दावली रहे, और हर भाषा में सिर्फ़ परीक्षा-पन्ने के अपने वाक्य लिखने पड़ें।
   ============================================================ */
"use strict";
var fs = require("fs"), path = require("path");
var ROOT = path.resolve(__dirname, "..");
var LANGS = require("./lib_apt_langs.js");
var BANK = { NONASCII_DIGIT: /[\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F]/, digits: function (s) { return String(s).match(/\d+/g) || []; } };
var code = (process.argv[2] || "").trim(), CHECK_ONLY = process.argv.indexOf("--check") > -1;
if (!code || !LANGS.L[code] || code === "hi" || code === "en") { console.log("उपयोग: node generator/build_apt_lang.js <भाषा-कोड> [--check]   (30 की सूची का कोड; hi और en के अपने generator हैं)"); process.exit(1); }
var DIR = path.join(ROOT, "generator/data/aptitude", code), INFO = LANGS.L[code], DEVA = INFO.script === "Deva";
/* Latin में रहने वाले नाम: ब्रांड (brand-Latin नियम, Addendum v7.9) और द्वार-कार्ड के बटन का नाम, जो इंजन में Latin ही है */
var BRANDS = ["Applied Computer School", "Login / Dashboard", "FFGPMTrust", "ffgpmt.org", "ISO 9001:2015", "acslearn.com/verify", "acslearn.com", "ACS", "WhatsApp", "Razorpay", "RIASEC"];
var fails = [], outs = {}, notes = [];
function bad(stage, m) { fails.push(stage + ": " + m); }
function P(f) { return path.join(ROOT, f); }
function need(f) { var p = path.join(DIR, f); if (!fs.existsSync(p)) { bad("स्रोत", f + " नहीं मिली (" + path.relative(ROOT, p) + ")"); return null; } return p; }
/* strip: HTML tag हटाकर सिर्फ़ दिखने वाला पाठ। कुछ वाक्यांश अधूरे tag पर ख़त्म होते हैं (जैसे <a href="…?text= , जिसके आगे इंजन पता जोड़ता है);
   वह अधूरा टुकड़ा भी tag ही है, पाठ नहीं। */
function tail(s) { return (String(s).match(/<[^>]*$/) || [""])[0]; }
function strip(html) { return String(html).replace(/<[^>]*$/, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " "); }
function tags(s) { return (String(s).match(/<[^>]+>/g) || []).join("") + tail(s); }
/* एक पाठ की जाँच: ख़ाली नहीं · लिपि-नियम · हिंदी के अंक मौजूद · अंक ASCII · (देवनागरी भाषा में) हिंदी जैसा का तैसा नहीं */
function textFail(target, hindi, o) {
  o = o || {}; var t = strip(target);
  if (!o.mayBeEmpty && !t.trim()) return "ख़ाली";
  var sf = LANGS.scriptFail(code, t, BRANDS.concat(o.allow || [])); if (sf) return sf;
  if (BANK.NONASCII_DIGIT.test(t)) return "अंक ASCII (0-9) में चाहिए";
  if (hindi != null) {
    var td = BANK.digits(t), miss = BANK.digits(strip(hindi)).filter(function (d) { return td.indexOf(d) < 0; });
    if (miss.length) return "हिंदी का अंक " + miss[0] + " यहाँ नहीं";
    if (DEVA && strip(hindi).trim() === t.trim() && /[\u0900-\u097F]{3}/.test(t) && t.trim().split(/\s+/).length > 2 && !o.sameOk) return "पाठ हिंदी जैसा का तैसा";
  }
  return null;
}
var S = need("strings.js"); S = S ? (delete require.cache[require.resolve(S)], require(S)) : null;
if (S && S.lang !== code) bad("स्रोत", "strings.js में lang \"" + S.lang + "\" है, चाहिए \"" + code + "\"");

/* ================= चरण 1: पहरा (v2.0): repo में किसी भाषा का प्रश्न-भंडार नहीं होना चाहिए ================= */
(function () {
  var st = "पहरा";
  fs.readdirSync(P("assets")).forEach(function (d) { if (/^apt_sets(_[a-z]{2,3})?$/.test(d)) bad(st, "assets/" + d + " repo में है (प्रश्न-भंडार सिर्फ़ server पर रहता है)"); });
  var root = P("generator/data/aptitude");
  fs.readdirSync(root).forEach(function (d) { if (fs.existsSync(path.join(root, d, "bank"))) bad(st, "generator/data/aptitude/" + d + "/bank repo में है (भंडार का स्रोत-पाठ server-पैकेज में रहता है)"); });
  if (fs.existsSync(path.join(root, "session_subset.json"))) bad(st, "generator/data/aptitude/session_subset.json repo में है (यह भंडार की सूची है; server-पैकेज में रहती है)");
})();

/* ================= चरण 2: झलक (48 प्रश्न + 4 कथाएँ + बटन/संदेश + समूह-नाम) ================= */
(function () {
  var pf = need("preview.txt"); if (!pf || !S) return;
  global.window = {}; ["aptitude_data.js", "mg_names.js", "apt_strings.js"].forEach(function (f) { (0, eval)(fs.readFileSync(P("assets/" + f), "utf8")); });
  var D = global.window.APT_DATA, HUI = global.window.APT_STR.hi, st = "झलक";
  var hiQ = D.questions.filter(function (q) { return q.layer === 1; }), rows = {}, kOut = {}, qOut = {};
  fs.readFileSync(pf, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).forEach(function (ln) { if (!ln.trim() || ln.charAt(0) === "#") return; var p = ln.split("|").map(function (x) { return x.trim(); }); if (rows[p[0]]) bad(st, p[0] + " दो बार"); rows[p[0]] = p.slice(1); });
  if (hiQ.length !== 48) bad(st, "हिंदी झलक-भंडार 48 नहीं: " + hiQ.length);
  hiQ.forEach(function (q) {
    var r = rows[q.id]; if (!r) { bad(st, q.id + " नहीं लिखा"); return; }
    var hp = [q.text].concat((q.opts || []).map(function (o) { return o.label; }));
    if (r.length !== hp.length) { bad(st, q.id + ": खाने " + r.length + ", हिंदी में " + hp.length); return; }
    r.forEach(function (s, i) { var f = textFail(s, hp[i]); if (f) bad(st, q.id + (i ? " विकल्प-" + i : "") + ": " + f); });
    qOut[q.id] = r.length > 1 ? { text: r[0], opts: r.slice(1) } : { text: r[0] }; delete rows[q.id];
  });
  (D.stories || []).forEach(function (k) {
    var r = rows[k.id]; if (!r || r.length !== 2) { bad(st, "कथा " + k.id + " नहीं/अधूरी (id|शीर्षक|पाठ)"); return; }
    [[r[0], k.title], [r[1], k.text]].forEach(function (x) { var f = textFail(x[0], x[1]); if (f) bad(st, "कथा " + k.id + ": " + f); });
    kOut[k.id] = { title: r[0], text: r[1] }; delete rows[k.id];
  });
  Object.keys(rows).forEach(function (id) { bad(st, id + ": यह id हिंदी झलक में नहीं (बासी पंक्ति)"); });
  /* तय शब्दावली (v2.0: झलक पर यहाँ; पूरे भंडार पर server-यंत्र build_apt_bank.js यही नक़्शा लगाता है)।
     हिंदी पाठ में शब्द किसी शब्द की शुरुआत पर आए, तो इस भाषा के पाठ में need में से कोई एक होना चाहिए। छूट की कुंजी: "preview q12 text" या "preview q12 opt2"। */
  var gf = need("glossary_map.json");
  if (gf) {
    var G = JSON.parse(fs.readFileSync(gf, "utf8")), EXC = G.exceptions || {}, gUsed = {}, gN = 0;
    var gTest = function (where, h, t) { gN++; (G.rules || []).forEach(function (r) {
      if (!new RegExp("(^|[^\\u0900-\\u0963\\u0966-\\u097F])" + r.hi).test(h)) return;
      if (r.need.some(function (w) { return String(t).indexOf(w) >= 0; })) return;
      if (EXC[where]) { gUsed[where] = 1; return; }
      bad("शब्दावली", where + ": हिंदी में \"" + r.hi + "\" है, यहाँ \"" + r.need.join("\" या \"") + "\" नहीं"); }); };
    hiQ.forEach(function (q) { var t = qOut[q.id]; if (!t) return;
      gTest("preview " + q.id + " text", q.text, t.text);
      (q.opts || []).forEach(function (o, i) { gTest("preview " + q.id + " opt" + (i + 1), o.label || o.t || o.text || "", (t.opts || [])[i]); }); });
    Object.keys(EXC).forEach(function (k) { if (/^preview /.test(k) && !gUsed[k]) bad("शब्दावली", "बासी छूट (अब ज़रूरत नहीं): " + k); });
    notes.push("शब्दावली (झलक) " + gN + " पाठ");
  }
  var ui = S.ui || {}, mg = S.mg || {};
  Object.keys(HUI).forEach(function (k) {
    if (ui[k] == null) { bad(st, "ui." + k + " नहीं"); return; }
    if (k === "dateLocale") { if (ui[k] !== LANGS.dateLocaleOf(code)) bad(st, "ui.dateLocale \"" + ui[k] + "\" ≠ रजिस्टर \"" + LANGS.dateLocaleOf(code) + "\""); return; }
    var hv = [].concat(HUI[k]), tv = [].concat(ui[k]); if (hv.length !== tv.length) { bad(st, "ui." + k + " की गिनती " + tv.length + " ≠ " + hv.length); return; }
    tv.forEach(function (s, i) { var f = textFail(s, hv[i], { mayBeEmpty: k === "resumeFrom" || k === "resumePre", allow: ["Badge", "certificate-PDF"] }); if (f) bad(st, "ui." + k + ": " + f); if (/^\s/.test(hv[i]) !== /^\s/.test(s) && k !== "resumeFrom") bad(st, "ui." + k + ": आगे की ख़ाली जगह हिंदी से अलग"); });
  });
  Object.keys(ui).forEach(function (k) { if (HUI[k] == null) bad(st, "ui." + k + ": हिंदी में यह कुंजी नहीं (बासी)"); });
  for (var m = 1; m <= 24; m++) { if (!mg[m]) bad(st, "समूह-नाम " + m + " नहीं"); else { var f = textFail(mg[m], null); if (f) bad(st, "समूह-नाम " + m + ": " + f); } }
  outs["assets/apt_" + code + ".js"] = "/* ============================================================\n   /assets/apt_" + code + ".js : झलक की भाषा-परत, " + INFO.hi + " (generator-निर्मित: build_apt_lang.js v2.0)\n" +
    "   स्रोत: generator/data/aptitude/" + code + "/ (preview.txt + strings.js) · मूल भाषा: हिंदी · हाथ से न बदलें\n   ============================================================ */\n" +
    "window.APT_STR = window.APT_STR || {};\nwindow.APT_STR." + code + " = " + JSON.stringify(ui, null, 1) + ";\n" +
    "window.APT_TR = {\n lang: " + JSON.stringify(code) + ",\n mg: " + JSON.stringify(mg, null, 1) + ",\n q: " + JSON.stringify(qOut, null, 1) + ",\n k: " + JSON.stringify(kOut, null, 1) + "\n};\n";
  notes.push("झलक 48 + कथाएँ 4 + ui " + Object.keys(ui).length + " + समूह 24");
})();

/* ================= चरण 3: उद्यमों के नाम ================= */
(function () {
  var uf = need("udyam.txt"); if (!uf) return;
  var SEC = new Function(fs.readFileSync(P("assets/udyam_data.js"), "utf8") + "\n;return ALL_SECTORS;")(), st = "उद्यम-नाम";
  var rows = {}, seen = {};
  fs.readFileSync(uf, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).forEach(function (ln) { if (!ln.trim() || ln.charAt(0) === "#") return; var i = ln.indexOf("|"), n = ln.slice(0, i).trim(), v = ln.slice(i + 1).trim(); if (rows[n]) bad(st, n + " दो बार"); rows[n] = v; });
  SEC.forEach(function (u) {
    var v = rows[u.n]; if (!v) { bad(st, "उद्यम " + u.n + " का नाम नहीं"); return; }
    var f = textFail(v, null); if (f) bad(st, "उद्यम " + u.n + ": " + f);
    if (/[<>|]/.test(v)) bad(st, "उद्यम " + u.n + ": नाम में < > | नहीं चल सकते");
    /* हिंदी नाम के अंक (चौकोर कोष्ठक के बाहर वाले) इस भाषा के नाम में भी हों (जैसे "3D", "5G") */
    BANK.digits(String(u.name).replace(/\[[^\]]*\]?/g, "")).forEach(function (d) { if (v.indexOf(d) < 0) bad(st, "उद्यम " + u.n + ": हिंदी नाम का अंक " + d + " यहाँ नहीं"); });
    if (seen[v]) bad(st, "उद्यम " + u.n + " और " + seen[v] + " का नाम हूबहू एक: " + v); seen[v] = u.n; delete rows[u.n];
  });
  Object.keys(rows).forEach(function (n) { bad(st, "संख्या " + n + ": ऐसा उद्यम सूची में नहीं (बासी)"); });
  var map = {}; Object.keys(seen).forEach(function (v) { map[seen[v]] = v; });
  outs["assets/apt_udyam_" + code + ".js"] = "/* /assets/apt_udyam_" + code + ".js : 951 उद्यमों के नाम, " + INFO.hi + " (generator-निर्मित: build_apt_lang.js v2.0)\n" +
    "   स्रोत: generator/data/aptitude/" + code + "/udyam.txt · मूल: /assets/udyam_data.js (हिंदी) · हाथ से न बदलें */\n" +
    "window.APT_UDN={lang:" + JSON.stringify(code) + ",n:" + JSON.stringify(map) + "};\n";
  notes.push("उद्यम-नाम " + SEC.length);
})();

/* ================= चरण 4: पूरी परीक्षा और भुगतान के वाक्यांश ================= */
(function () {
  if (!S) return; var st = "वाक्यांश", DEVRE = /[\u0900-\u097F]/;
  function phrases(file) { var c = fs.readFileSync(P(file), "utf8"), re = /\bL\(('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\)/g, m, seen = {}, keys = []; while ((m = re.exec(c))) { var v = (0, eval)(m[1]); if (!DEVRE.test(v)) continue; if (!seen[v]) { seen[v] = 1; keys.push(v); } } return keys; }
  var EN = require(P("generator/data/aptitude/en/apt_en_session_strings.js"));
  var keys = phrases("assets/apt-session.js"), payKeys = phrases("assets/apt-pay.js"), map = {};
  var T = S.session || [], TP = S.pay || [];
  if (keys.length !== EN.pairs.length) bad(st, "इंजन के वाक्यांश " + keys.length + " ≠ English स्रोत " + EN.pairs.length + " (पहले English तालिका ठीक कीजिए)");
  if (T.length !== keys.length) bad(st, "session की गिनती " + T.length + " ≠ इंजन " + keys.length);
  if (TP.length !== payKeys.length) bad(st, "pay की गिनती " + TP.length + " ≠ भुगतान-फ़ाइल " + payKeys.length);
  function one(k, t, i, label, anchor) {
    if (t == null) return;
    if (anchor && k.indexOf(anchor) < 0) bad(st, label + (i + 1) + ": English स्रोत का लंगर \"" + anchor + "\" इस वाक्यांश में नहीं (क्रम बिगड़ा)");
    if (tags(k) !== tags(t)) bad(st, label + (i + 1) + ": HTML tag हिंदी से अलग: " + strip(k).trim().slice(0, 40));
    if (/\s$/.test(k) !== /\s$/.test(t)) bad(st, label + (i + 1) + ": पीछे की ख़ाली जगह अलग: " + strip(k).trim().slice(0, 40));
    if (/^\s/.test(k) !== /^\s/.test(t) && !/^[:.।،。]/.test(t)) bad(st, label + (i + 1) + ": आगे की ख़ाली जगह अलग: " + strip(k).trim().slice(0, 40));
    var f = textFail(t, k, { mayBeEmpty: !strip(k).replace(/[^\u0900-\u097F]/g, "").length || strip(k).trim().length < 4, sameOk: strip(k).trim().split(/\s+/).length < 3 }); if (f) bad(st, label + (i + 1) + ": " + f + " | " + strip(k).trim().slice(0, 40));
    if (Object.prototype.hasOwnProperty.call(map, k) && map[k] !== t) bad(st, label + (i + 1) + ": वही हिंदी वाक्यांश दो जगह, पर अनुवाद अलग");
    map[k] = t;
  }
  payKeys.forEach(function (k, i) { one(k, TP[i], i, "pay#", (EN.payPairs[i] || [])[0]); });
  keys.forEach(function (k, i) { one(k, T[i], i, "session#", (EN.pairs[i] || [])[0]); });
  /* चित्रों (SVG) के भीतर के हर देवनागरी पाठ का जोड़ art में हो */
  var artCode = fs.readFileSync(P("assets/aptitude_art.js"), "utf8"), am, artRe = />([^<>]*[\u0900-\u097F][^<>]*)</g, artSeen = {};
  while ((am = artRe.exec(artCode))) { var ak = am[1].replace(/^\s+|\s+$/g, ""); if (artSeen[ak]) continue; artSeen[ak] = 1;
    if (!(S.art && Object.prototype.hasOwnProperty.call(S.art, ak))) bad(st, "चित्र का पाठ \"" + ak + "\" art में नहीं"); else { var af = DEVA ? null : LANGS.scriptFail(code, S.art[ak]); if (af) bad(st, "चित्र का पाठ \"" + ak + "\": " + af); } }
  map["@dateLocale"] = LANGS.dateLocaleOf(code);
  Object.keys(S.art || {}).forEach(function (k) { map["@art:" + k] = S.art[k]; });
  /* पता एक जगह से: इंजन (apt-session.js v2.11) यहीं से पढ़ता है कि इस भाषा के उद्यम-नाम कहाँ रखे हैं।
     (v2.0: "@sets" हटा; प्रश्न अब server से आते हैं, repo की किसी फ़ाइल से नहीं।) */
  map["@udyam"] = "/assets/apt_udyam_" + code + ".js";
  outs["assets/apt_session_" + code + ".js"] = "/* /assets/apt_session_" + code + ".js : पूरी परीक्षा के इंजन के वाक्यांश, " + INFO.hi + " (generator-निर्मित: build_apt_lang.js v2.0)\n" +
    "   स्रोत: generator/data/aptitude/" + code + "/strings.js · मूल भाषा: हिंदी · हाथ से न बदलें */\n" +
    "window.APT_SX=window.APT_SX||{};window.APT_SX." + code + "=" + JSON.stringify(map) + ";\n";
  notes.push("वाक्यांश " + keys.length + " + भुगतान " + payKeys.length);
})();

/* ================= चरण 5: पन्ना ================= */
(function () {
  if (!S) return; var st = "पन्ना";
  var cf = P("generator/career_" + code + "_strings.js"); if (!fs.existsSync(cf)) { bad(st, "करियर-तालिका नहीं: generator/career_" + code + "_strings.js"); return; }
  var CS = require(cf), CT = CS.T || CS.EN, CAT = CS.ATTR_T || CS.ATTR_EN, META = Object.assign({ locale: "en_US", dir: "ltr", fontRepl: "", styleInject: "" }, CS.META || {});
  var hi = fs.readFileSync(P("aptitude-test.html"), "utf8").replace(/\r\n/g, "\n"), car = fs.readFileSync(P("career.html"), "utf8").replace(/\r\n/g, "\n");
  function count(h, n) { return h.split(n).length - 1; }
  function nodes(h) { var re = />([^<>]*[\u0900-\u097F][^<>]*)</g, m, seen = {}, o = []; while ((m = re.exec(h))) { if (m[1].trim() && !seen[m[1]]) { seen[m[1]] = 1; o.push(m[1]); } } return o; }
  function attrs(h) { var re = /(aria-label|alt|content|title|placeholder)="([^"]*[\u0900-\u097F][^"]*)"/g, m, seen = {}, o = []; while ((m = re.exec(h))) { if (!seen[m[2]]) { seen[m[2]] = 1; o.push(m[2]); } } return o; }
  var cn = nodes(car), ca = attrs(car);
  if (cn.length !== CT.length || ca.length !== CAT.length) { bad(st, "करियर-तालिका हिंदी करियर-पन्ने से मेल नहीं खाती (खंड " + cn.length + "/" + CT.length + ", गुण " + ca.length + "/" + CAT.length + ")"); return; }
  var shellN = {}, shellA = {}; cn.forEach(function (x, i) { shellN[x] = CT[i]; }); ca.forEach(function (x, i) { shellA[x] = CAT[i]; });
  /* hreflang: हिंदी स्रोत-पन्ने पर ठीक वही पंक्तियाँ हों जो रजिस्टर की LIVE सूची से बनती हैं (पहले build_apt_hreflang.js चलता है) */
  var HL = LANGS.hreflangLines(), have = hi.match(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g) || [];
  if (LANGS.LIVE.indexOf(code) < 0) bad(st, "यह भाषा रजिस्टर की LIVE सूची में नहीं (generator/lib_apt_langs.js)");
  if (have.join("\n") !== HL.join("\n")) bad(st, "हिंदी पन्ने की hreflang पंक्तियाँ रजिस्टर से अलग हैं (पहले: node generator/build_specials.js, जो हिंदी पन्ना दोबारा बनाता है)");
  var an = nodes(hi), aa = attrs(hi), PG = S.page || [], PA = S.pageAttr || [], pi = 0, ai = 0, tr = {}, trA = {}, newText = [];
  an.forEach(function (x) { if (Object.prototype.hasOwnProperty.call(shellN, x)) { tr[x] = shellN[x]; return; }
    var t = PG[pi++]; if (t == null) { bad(st, "page[" + (pi - 1) + "] नहीं: " + x.slice(0, 50)); return; }
    var f = textFail(t, x, { allow: ["Aptitude Test"] }); if (f) bad(st, "page[" + (pi - 1) + "]: " + f + " | " + x.slice(0, 40)); tr[x] = t; newText.push(t); });
  if (PG.length !== pi) bad(st, "page में " + PG.length + " वाक्य, चाहिए " + pi);
  aa.forEach(function (x) { if (Object.prototype.hasOwnProperty.call(shellA, x)) { trA[x] = shellA[x]; return; } if (tr[x] != null) { trA[x] = tr[x]; return; }
    var t = PA[ai++]; if (t == null) { bad(st, "pageAttr[" + (ai - 1) + "] नहीं: " + x.slice(0, 50)); return; }
    var f = textFail(t, x); if (f) bad(st, "pageAttr[" + (ai - 1) + "]: " + f); if (/["<>]/.test(t)) bad(st, "pageAttr[" + (ai - 1) + "] में \" < > नहीं चल सकते"); trA[x] = t; newText.push(t); });
  if (PA.length !== ai) bad(st, "pageAttr में " + PA.length + " वाक्य, चाहिए " + ai);
  if (fails.length) return;
  var out = hi, rtl = META.dir === "rtl";
  /* दाएँ-से-बाएँ भाषा: Latin/अंक के टुकड़े <bdi dir="ltr"> में (फ़ोन-नंबर, ब्रांड, दाम उलटे न दिखें) */
  var BDI = /[A-Za-z0-9](?:[A-Za-z0-9\u20b9$@.,:+%\/'&#;-]|(?: )(?=[A-Za-z0-9\u20b9$]))*[A-Za-z0-9%.\u20b9$]|[A-Za-z0-9\u20b9$]/g;
  an.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (x, idx) {
    var t = tr[x]; if (rtl && t.indexOf("<") < 0 && x !== an[0]) t = t.replace(BDI, function (r) { return '<bdi dir="ltr">' + r + "</bdi>"; });
    var from = ">" + x + "<"; if (count(out, from) < 1) { bad(st, "खंड नहीं मिला: " + x.slice(0, 50)); return; } out = out.split(from).join(">" + t + "<"); });
  aa.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (x) { var from = '="' + x + '"'; if (count(out, from) < 1) { bad(st, "गुण नहीं मिला: " + x.slice(0, 50)); return; } out = out.split(from).join('="' + trA[x] + '"'); });
  function one(from, to, label, n) { var c = count(out, from); if (c !== (n || 1)) { bad(st, label + ": " + c + " बार मिला, चाहिए " + (n || 1)); return; } out = out.split(from).join(to); }
  var url = LANGS.pageUrl(code);
  one('<html lang="hi">', '<html lang="' + code + '"' + (rtl ? ' dir="rtl"' : "") + ">", "lang");
  one('<link rel="canonical" href="https://acslearn.com/aptitude-test.html">', '<link rel="canonical" href="' + url + '">', "canonical");
  one('<meta property="og:url" content="https://acslearn.com/aptitude-test.html">', '<meta property="og:url" content="' + url + '">', "og:url");
  one('<meta property="og:locale" content="hi_IN">', '<meta property="og:locale" content="' + META.locale + '">', "og:locale");
  if (!DEVA) one("&family=Noto+Sans+Devanagari:wght@400;600;700;800;900", META.fontRepl || "", "फ़ॉन्ट");
  var css = (META.styleInject || "") + (rtl ? "html[dir=rtl] #apt-cancel{margin-left:0!important;margin-right:8px}" : "");
  if (css) one("</title>", "</title>\n<style>" + css + "</style>", "styleInject");
  one('href="/career.html"', 'href="/' + code + '/career.html"', "करियर-कड़ी", 2);
  one('href="/"', 'href="/' + code + '/"', "होम-कड़ी", 2);
  one('<script src="/assets/apt_strings.js"></script>\n<script src="/assets/aptitude-test.js" defer></script>\n<script src="/assets/apt-session.js" defer></script>\n<script type="module" src="/assets/apt-pay.js"></script>',
    '<script>window.APT_LANG="' + code + '";</script>\n<script src="/assets/apt_strings.js"></script>\n<script src="/assets/apt_' + code + '.js"></script>\n<script src="/assets/apt_session_' + code + '.js"></script>\n<script src="/assets/aptitude-test.js" defer></script>\n<script src="/assets/apt-session.js" defer></script>\n<script type="module" src="/assets/apt-pay.js"></script>', "scripts");
  one("<!-- परत 1: CONFIG + LINKS -->", "<!-- layer 1: CONFIG + LINKS -->", "टिप्पणी");
  if (LANGS.NOTICE.indexOf(code) >= 0) {
    if (!S.notice) bad(st, "notice नहीं (इस भाषा के पन्ने पर \"AI-अनुवाद, समिति-जाँच बाक़ी\" पट्टी अनिवार्य है)");
    else { var nf = textFail(S.notice, null, { allow: ["AI"] }); if (nf) bad(st, "notice: " + nf);
      one('<div class="apl-sec" id="apt-jhalak-sec">', '<p class="apl-small" id="apt-ai-note" style="text-align:center;background:#FFF8E1;border:2px solid #F9A825;border-radius:10px;padding:10px;margin:14px 0;color:#0B1F3A;font-weight:700">' + S.notice + '</p><div class="apl-sec" id="apt-jhalak-sec">', "AI-पट्टी"); newText.push(S.notice); }
  } else if (S.notice) bad(st, "notice दिया है पर यह भाषा रजिस्टर की NOTICE सूची में नहीं");
  out = out.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- generator: build_apt_lang.js (lang=" + code + ", source = /aptitude-test.html hi + generator/data/aptitude/" + code + "/strings.js + career_" + code + "_strings.js shell) : do not edit by hand -->");
  /* ---- पूरी-राज्य जाँच ---- */
  var vis = out.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  var texts = vis.split(/<[^>]+>/).map(function (s) { return s.trim(); }).filter(Boolean);
  if (!DEVA) { var leak = texts.filter(function (s) { return /[\u0900-\u0963\u0966-\u097F]/.test(s); }); if (leak.length) bad(st, "दिखने वाले पाठ में देवनागरी: " + leak.slice(0, 3).join(" | ").slice(0, 120));
    var al = vis.match(/(?:aria-label|alt|title|placeholder|content)="[^"]*[\u0900-\u0963\u0966-\u097F][^"]*"/g) || []; if (al.length) bad(st, "गुणों में देवनागरी: " + al.join(" | ").slice(0, 120)); }
  else an.forEach(function (x) { if (x.trim().split(/\s+/).length > 2 && count(out, ">" + x + "<") > 0 && tr[x] !== x) bad(st, "हिंदी खंड बचा: " + x.slice(0, 40)); });
  var hre = out.match(/hreflang="[^"]+"/g) || [], uq = {}; hre.forEach(function (h) { uq[h] = 1; });
  if (hre.length !== HL.length || Object.keys(uq).length !== HL.length) bad(st, "hreflang raw=" + hre.length + " unique=" + Object.keys(uq).length + " (चाहिए " + HL.length + ")");
  if (count(out, 'hreflang="' + code + '" href="' + url + '"') !== 1) bad(st, "hreflang में अपनी भाषा की पंक्ति नहीं");
  var order = ['window.APT_LANG="' + code + '"', "/assets/apt_strings.js", "/assets/apt_" + code + ".js", "/assets/apt_session_" + code + ".js", "/assets/aptitude-test.js", "/assets/apt-session.js", "/assets/apt-pay.js"], last = -1;
  order.forEach(function (x) { var k = out.indexOf(x); if (k < 0 || k < last) bad(st, "scripts का क्रम ग़लत: " + x); last = k; });
  newText.forEach(function (t) { if (t.indexOf("\u2014") >= 0) bad(st, "नए पाठ में लंबी रेखा (—)"); });
  outs[code + "/aptitude-test.html"] = out;
  notes.push("पन्ना: ढाँचे से " + (an.length - pi) + " खंड, नए " + pi + " · hreflang " + HL.length);
})();

/* ================= नतीजा ================= */
console.log("build_apt_lang v2.0 : " + code + " (" + INFO.hi + ") · " + notes.join(" · ") + " · दोष " + fails.length);
if (fails.length) { fails.slice(0, 40).forEach(function (f) { console.log("  ⛔ " + f); }); if (fails.length > 40) console.log("  … और " + (fails.length - 40)); console.log("⛔ कोई फ़ाइल नहीं लिखी गई।"); process.exit(1); }
var files = Object.keys(outs).sort();
if (CHECK_ONLY) {
  /* तुलना पंक्ति-अंत (Windows का CRLF) की परवाह किए बिना: office के laptop पर git फ़ाइलों के पंक्ति-अंत बदल सकता है */
  var stale = files.filter(function (f) { return !fs.existsSync(P(f)) || fs.readFileSync(P(f), "utf8").replace(/\r\n/g, "\n") !== outs[f]; });
  if (stale.length) { console.log("⛔ --check: " + stale.length + " फ़ाइलें ताज़ा नहीं: " + stale.slice(0, 6).join(", ")); process.exit(1); }
  console.log("🏁 जाँच पास (--check: " + files.length + " फ़ाइलें ताज़ा हैं)"); process.exit(0);
}
var bytes = 0; files.forEach(function (f) { fs.mkdirSync(path.dirname(P(f)), { recursive: true }); fs.writeFileSync(P(f), outs[f]); bytes += Buffer.byteLength(outs[f]); });
console.log("🏁 लिखा: " + files.length + " फ़ाइलें · " + bytes + " बाइट");
