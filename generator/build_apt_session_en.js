/* ============================================================
   generator/build_apt_session_en.js — v1.1 (12-Nov-2026) · परत-4
   काम: पूरी परीक्षा के इंजन (/assets/apt-session.js) और भुगतान की फ़ाइल (/assets/apt-pay.js) के हर L('हिंदी वाक्यांश') के लिए English तालिका
   /assets/apt_session_en.js बनाना। स्रोत: generator/data/aptitude/en/apt_en_session_strings.js।
   fail-closed (एक भी दोष = फ़ाइल नहीं लिखी जाती):
     - इंजन के अनोखे वाक्यांशों की गिनती = स्रोत के जोड़ों की गिनती, उसी क्रम में
     - हर जोड़े का हिंदी लंगर उसी क्रम के इंजन-वाक्यांश में मिले (English ग़लत वाक्यांश पर न लगे)
     - HTML के tag (id, class, href समेत) हिंदी और English में हूबहू वही, उसी क्रम में
     - English में देवनागरी शून्य · आगे/पीछे की ख़ाली जगह का होना/न होना वही (जोड़ते समय शब्द न चिपकें)
     - चित्र-भंडार (SVG) के भीतर का हर हिंदी पाठ स्रोत के art-जोड़ों में हो
   चलाना: node generator/build_apt_session_en.js [--check]
   ============================================================ */
"use strict";
var fs = require("fs"), path = require("path");
var ROOT = path.resolve(__dirname, "..");
var ENGINE = path.join(ROOT, "assets/apt-session.js");
var SRC = require(path.join(ROOT, "generator/data/aptitude/en/apt_en_session_strings.js"));
var OUT = path.join(ROOT, "assets/apt_session_" + SRC.lang + ".js");
var CHECK_ONLY = process.argv.indexOf("--check") > -1;
var DEV = /[\u0900-\u097F]/;
var PAY = path.join(ROOT, "assets/apt-pay.js");
function phrases(file) {
  var code = fs.readFileSync(file, "utf8"), re = /\bL\(('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\)/g, m, seen = {}, keys = [];
  while ((m = re.exec(code))) { var v = (0, eval)(m[1]); if (!DEV.test(v)) continue; if (!seen[v]) { seen[v] = 1; keys.push(v); } }
  return keys;
}
var fails = [], map = {};
var tags = function (s) { return (s.match(/<[^>]+>/g) || []).join(""); };
var keys = phrases(ENGINE), payKeys = phrases(PAY);
if (keys.length !== SRC.pairs.length) fails.push("गिनती: इंजन " + keys.length + " / स्रोत " + SRC.pairs.length);
if (payKeys.length !== (SRC.payPairs || []).length) fails.push("गिनती: भुगतान-फ़ाइल " + payKeys.length + " / स्रोत " + (SRC.payPairs || []).length);
payKeys.forEach(function (k, i) {
  var p = (SRC.payPairs || [])[i]; if (!p) return;
  if (k.indexOf(p[0]) < 0) fails.push("भुगतान #" + (i + 1) + " लंगर \"" + p[0] + "\" इस वाक्यांश में नहीं: " + k.slice(0, 60));
  if (tags(k) !== tags(p[1])) fails.push("भुगतान #" + (i + 1) + " HTML tag अलग");
  if (DEV.test(p[1])) fails.push("भुगतान #" + (i + 1) + " English में देवनागरी");
  if (/\s$/.test(k) !== /\s$/.test(p[1])) fails.push("भुगतान #" + (i + 1) + " पीछे की ख़ाली जगह अलग");
  map[k] = p[1];
});
keys.forEach(function (k, i) {
  var p = SRC.pairs[i]; if (!p) return;
  if (Object.prototype.hasOwnProperty.call(map, k) && map[k] !== p[1]) fails.push("#" + (i + 1) + " वही हिंदी वाक्यांश दोनों फ़ाइलों में, पर English अलग: " + k.slice(0, 40));
  if (k.indexOf(p[0]) < 0) fails.push("#" + (i + 1) + " लंगर \"" + p[0] + "\" इस वाक्यांश में नहीं: " + k.slice(0, 60));
  if (tags(k) !== tags(p[1])) fails.push("#" + (i + 1) + " HTML tag अलग: " + k.slice(0, 50));
  if (DEV.test(p[1])) fails.push("#" + (i + 1) + " English में देवनागरी");
  if (/^\s/.test(k) !== /^\s/.test(p[1]) && !/^[:.]/.test(p[1])) fails.push("#" + (i + 1) + " आगे की ख़ाली जगह अलग: " + k.slice(0, 40));
  if (/\s$/.test(k) !== /\s$/.test(p[1])) fails.push("#" + (i + 1) + " पीछे की ख़ाली जगह अलग: " + k.slice(0, 40));
  map[k] = p[1];
});
/* चित्र-भंडार (aptitude_art.js) के SVG में जितने देवनागरी पाठ हैं, सबका जोड़ स्रोत के art में हो */
var artCode = fs.readFileSync(path.join(ROOT, "assets/aptitude_art.js"), "utf8"), am, artRe = />([^<>]*[\u0900-\u097F][^<>]*)</g, artSeen = {};
while ((am = artRe.exec(artCode))) { var ak = am[1].replace(/^\s+|\s+$/g, ""); if (!artSeen[ak]) { artSeen[ak] = 1; if (!(SRC.art && Object.prototype.hasOwnProperty.call(SRC.art, ak))) fails.push("चित्र का पाठ \"" + ak + "\" स्रोत के art में नहीं"); else if (DEV.test(SRC.art[ak])) fails.push("चित्र का English \"" + ak + "\" में देवनागरी"); } }
console.log("build_apt_session_en v1.1 : इंजन के वाक्यांश " + keys.length + " / " + SRC.pairs.length + " · भुगतान-फ़ाइल " + payKeys.length + " / " + (SRC.payPairs || []).length + " · दोष " + fails.length);
if (fails.length) { fails.slice(0, 25).forEach(function (f) { console.log("  ⛔ " + f); }); console.log("⛔ फ़ाइल नहीं लिखी गई।"); process.exit(1); }
if (CHECK_ONLY) { console.log("🏁 जाँच पास (--check)"); process.exit(0); }
map["@dateLocale"] = SRC.dateLocale;
Object.keys(SRC.art || {}).forEach(function (k) { map["@art:" + k] = SRC.art[k]; });
var body = "/* /assets/apt_session_" + SRC.lang + ".js : पूरी परीक्षा के इंजन के वाक्यांश, English (generator-निर्मित: build_apt_session_en.js v1.1)\n" +
  "   स्रोत: generator/data/aptitude/en/apt_en_session_strings.js · मूल भाषा: हिंदी · हाथ से न बदलें */\n" +
  "window.APT_SX=window.APT_SX||{};window.APT_SX." + SRC.lang + "=" + JSON.stringify(map) + ";\n";
fs.writeFileSync(OUT, body);
console.log("🏁 लिखा: " + path.relative(ROOT, OUT) + " (" + Buffer.byteLength(body) + " बाइट)");
