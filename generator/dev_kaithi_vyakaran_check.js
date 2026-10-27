/* generator/dev_kaithi_vyakaran_check.js — v1.2 (27-Oct-2026) — + reg-परत/पेंदा-footer/पेज-नंबर — + ब्रांड-परत जाँच
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
/* ब्रांड-परत v2.0 (Founder-आदेश: हर सार्वजनिक PDF में brand अनिवार्य) */
var pu = fs.readFileSync(R + "_pustika.html", "utf8");
ok((pu.match(/data:image\/png;base64,/g) || []).length >= 15, "पुस्तिका: logo/QR base64 कम (cover+12 header+back)");
ok((pu.match(/class="tiranga"/g) || []).length >= 12, "पुस्तिका: तिरंगा-पट्टी हर पेज नहीं");
ok((pu.match(/wa\.me\/919431210092/g) || []).length >= 12, "पुस्तिका: WhatsApp-footer हर पेज नहीं");
ok(pu.indexOf("From Village to World") > -1 && pu.indexOf("130 भाषा") > -1, "पुस्तिका: mission/130-पंक्ति नहीं");
var ch = fs.readFileSync(R + "_chart.html", "utf8");
ok((ch.match(/data:image\/png;base64,/g) || []).length >= 2, "चार्ट: logo+QR नहीं");
ok(ch.indexOf('class="tiranga"') > -1 && ch.indexOf("wa.me/919431210092") > -1, "चार्ट: तिरंगा/WhatsApp नहीं");
/* रजिस्ट्रेशन-परत + पेंदा-footer + पेज-नंबर (v2.1 Founder-आदेश) */
ok((pu.match(/join\.html/g) || []).length >= 15, "पुस्तिका: join-कड़ी हर footer+reg-पेज नहीं");
ok(pu.indexOf("आगे की राह") > -1, "पुस्तिका: रजिस्ट्रेशन-पेज नहीं");
ok(pu.indexOf("margin-top:auto") > -1 && pu.indexOf("min-height:252mm") > -1, "पुस्तिका: footer पेंदा-नियम नहीं");
var nums = (pu.match(/class="pg-no">(\d+)</g) || []).map(function (x) { return +x.replace(/\D/g, ""); });
ok(nums.length === 13 && nums[0] === 2 && nums[12] === 14 && nums.every(function (v, i) { return v === i + 2; }), "पेज-नंबर क्रम टूटा: " + nums.join(","));
ok(ch.indexOf("join.html") > -1, "चार्ट: join-कड़ी नहीं");
var les = fs.readFileSync("courses/hi/kaithi-lipi/kth-001-kaithi-kya-hai-bihar-ki-purani-lipi.html", "utf8");
ok(les.indexOf("lsn-reg") > -1 && les.indexOf("/join.html") > -1, "पाठ-पेज: reg-पट्टी नहीं");
var idx2 = fs.readFileSync("courses/hi/kaithi-lipi/index.html", "utf8");
ok(idx2.indexOf("/join.html") > -1, "landing: reg-बटन नहीं");
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
