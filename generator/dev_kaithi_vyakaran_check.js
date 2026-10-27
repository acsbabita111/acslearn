/* generator/dev_kaithi_vyakaran_check.js — v1.0 (27-Oct-2026)
   कैथी व्याकरण-पुस्तिका/चार्ट + sitemap + landing-कड़ी का fail-closed robot।
   चलाना: node generator/dev_kaithi_vyakaran_check.js  (repo-रूट से; PDF /home/claude/kaithi/release में) */
"use strict";
var fs = require("fs"); var fail = 0;
function ok(c, m) { if (!c) { console.log("⛔ " + m); fail++; } }
var R = "/home/claude/kaithi/release/";
["kaithi-vyakaran-pustika.pdf", "kaithi-varnamala-chart.pdf"].forEach(function (f) {
  ok(fs.existsSync(R + f) && fs.statSync(R + f).size > 50000, "PDF ग़ायब/छोटा: " + f);
});
["_pustika.html", "_chart.html"].forEach(function (f) {
  var h = fs.readFileSync(R + f, "utf8");
  ok(!/[\[\]]/.test(h.replace(/<[^>]+>/g, "")), f + " में square-bracket");
  var glyphs = (h.match(/[\u{11080}-\u{110CF}]/gu) || []).length;
  ok(glyphs > (f === "_chart.html" ? 60 : 400), f + " में कैथी-glyph कम: " + glyphs);
  ok(h.indexOf("NotoSansKaithi") === -1 ? h.indexOf("Kaithi") > -1 : true, f + " फ़ॉन्ट-घोषणा");
});
/* sitemap */
var sm = fs.readFileSync("sitemap-hunar.xml", "utf8");
ok((sm.match(/kaithi-lipi\//g) || []).length === 34, "sitemap-hunar में कैथी 34 नहीं");
ok(fs.readFileSync("sitemap.xml", "utf8").indexOf("sitemap-hunar.xml") > -1, "sitemap-index में hunar नहीं");
/* landing की 📘 कड़ियाँ */
var idx = fs.readFileSync("courses/hi/kaithi-lipi/index.html", "utf8");
ok((idx.match(/workbook-kaithi\//g) || []).length === 2, "landing में 2 release-कड़ियाँ नहीं");
ok(idx.indexOf("kaithi-vyakaran-pustika.pdf") > -1 && idx.indexOf("kaithi-varnamala-chart.pdf") > -1, "PDF-नाम कड़ी-बेमेल");
if (fail) { console.log("⛔ " + fail + " दोष"); process.exit(1); }
console.log("🏁 vyakaran-robot: 2 PDF · glyph-भराव · sitemap 34/34 · landing-कड़ियाँ 2/2 — सब पास");
