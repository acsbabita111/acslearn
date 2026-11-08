/* ============================================================
   generator/build_apt_en.js — v1.0 (09-Nov-2026) · परत-4
   काम: generator/data/aptitude/en/ के दो स्रोत (प्रश्न + strings)
   को जाँचकर एक runtime-फ़ाइल /assets/apt_en.js में बदलना।
   fail-closed: पहले dev_anuvad_check का validate() चलता है :
   एक भी दोष = कोई फ़ाइल नहीं लिखी जाती (लोहे का नियम)।
   runtime-फ़ाइल सिर्फ़ /en/ पन्ना load करता है : हिंदी पन्ने पर
   इसका कोई असर नहीं। ES5 ही।
   चलाना: node generator/build_apt_en.js <assets-dir> <en-data-dir> <out-file>
   ============================================================ */
"use strict";
var fs = require("fs");
var path = require("path");
var check = require("./dev_anuvad_check.js");

var assetsDir = path.resolve(process.argv[2] || "assets");
var enDir = path.resolve(process.argv[3] || "generator/data/aptitude/en");
var outFile = path.resolve(process.argv[4] || path.join(assetsDir, "apt_en.js"));

console.log("build_apt_en v1.0 : जाँच पहले (fail-closed)");
var fails = check.validate(assetsDir, enDir, console.log);
if (fails.length) {
  console.log("⛔ " + fails.length + " दोष : फ़ाइल नहीं लिखी गई।");
  process.exit(1);
}

var Q = require(path.join(enDir, "apt_en_questions.js"));
var U = require(path.join(enDir, "apt_en_strings.js"));

var out = "";
out += "/* ============================================================\n";
out += "   /assets/apt_en.js — English overlay v1.0 (generator-निर्मित)\n";
out += "   स्रोत: generator/data/aptitude/en/ (हाथ से न बदलें : परत-4)\n";
out += "   builder: generator/build_apt_en.js · जाँच: dev_anuvad_check v1.0\n";
out += "   मूल भाषा: हिंदी · Original language: Hindi\n";
out += "   ============================================================ */\n";
out += "window.APT_STR = window.APT_STR || {};\n";
out += "window.APT_STR.en = " + JSON.stringify(U.ui, null, 1) + ";\n";
out += "window.APT_TR = {\n lang: \"en\",\n";
out += " mg: " + JSON.stringify(U.mg, null, 1) + ",\n";
/* प्रश्न: id-keyed, opts सीधा array */
var qOut = {};
Object.keys(Q.q).sort().forEach(function (id) {
  var t = Q.q[id];
  qOut[id] = t.opts ? { text: t.text, opts: t.opts } : { text: t.text };
});
out += " q: " + JSON.stringify(qOut, null, 1) + ",\n";
out += " k: " + JSON.stringify(Q.k, null, 1) + "\n};\n";

fs.writeFileSync(outFile, out);
console.log("🏁 लिखा: " + outFile + " (" + fs.statSync(outFile).size + " bytes)");
