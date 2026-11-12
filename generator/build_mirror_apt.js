/* ============================================================
   generator/build_mirror_apt.js — v1.0 (09-Nov-2026) · परत-4
   काम: हिंदी /aptitude-test.html (build_specials v2.2 से बना) को
   अदला-बदली तालिका (apt_en_page_strings.js) से English दर्पण-पेज
   /en/aptitude-test.html में बदलना : 13-भाषा-होम (build_mirror_homes)
   वाली सिद्ध विधि।
   fail-closed नियम:
   1. हर जोड़ा exact-state गिनती-assert से : बेमेल = FAIL, कुछ नहीं लिखा।
   2. अंत में पूरी-राज्य जाँच : दिखने वाले पाठ + attributes में
      देवनागरी शून्य · hreflang raw = unique = 3 · lang="en" ·
      canonical/og:url = /en/ पता · APT_LANG + apt_en.js मौजूद ·
      apt-session.js/apt-pay.js अनुपस्थित · नए पाठ में लंबी रेखा (—)
      सिर्फ़ reused-पंक्तियों में।
   चलाना: node generator/build_mirror_apt.js <hi-page> <data-file> <out-file>
   ============================================================ */
"use strict";
var fs = require("fs");
var path = require("path");

var hiPage = process.argv[2];
var dataFile = process.argv[3];
var outFile = process.argv[4];
if (!hiPage || !dataFile || !outFile) {
  console.error("उपयोग: node build_mirror_apt.js <hi-page> <data-file> <out-file>");
  process.exit(1);
}
var T = require(path.resolve(dataFile));
var src = fs.readFileSync(hiPage, "utf8").replace(/\r\n/g, "\n"); /* v1.1: Windows की CRLF checkout पर भी वही नतीजा */
var fails = 0;
function bad(m) { fails++; console.log("  ❌ " + m); }
function ok(m) { console.log("  ✅ " + m); }

/* ---- 1. अदला-बदली (गिनती-assert) ---- */
var out = src;
T.pairs.forEach(function (p, i) {
  var oldS = p[0], newS = p[1], want = p[2];
  var parts = out.split(oldS);
  if (parts.length !== want + 1) {
    bad("जोड़ा-" + (i + 1) + " गिनती " + want + " नहीं, मिली " + (parts.length - 1) + " : " + oldS.slice(0, 60));
    return;
  }
  out = parts.join(newS);
});

/* generator-निशान */
out = out.replace("<!DOCTYPE html>",
  "<!DOCTYPE html>\n<!-- generator-निर्मित: build_mirror_apt.js v1.1 · स्रोत = /aptitude-test.html (hi) ·\n     data = generator/data/aptitude/en/apt_en_page_strings.js · हाथ से न बदलें (परत-4) -->");

/* ---- 2. पूरी-राज्य जाँच ---- */
var visible = out.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<!--[\s\S]*?-->/g, "");
var texts = visible.split(/<[^>]+>/).map(function (s) { return s.trim(); }).filter(Boolean);
var leak = texts.filter(function (s) { return /[\u0900-\u097F]/.test(s); });
if (leak.length) bad("दिखने वाले पाठ में देवनागरी: " + leak.length + " : " + leak.slice(0, 3).join(" | ").slice(0, 120));
else ok("दिखने वाला पाठ: देवनागरी शून्य (" + texts.length + " खंड)");

var attrLeak = (visible.match(/(?:aria-label|alt|title|placeholder)="[^"]*[\u0900-\u097F][^"]*"/g) || []);
if (attrLeak.length) bad("attribute-देवनागरी: " + attrLeak.join(" | ").slice(0, 120));
else ok("attributes (aria/alt/title): देवनागरी शून्य");

var hre = out.match(/hreflang="[^"]+"/g) || [];
var uniq = {}; hre.forEach(function (h) { uniq[h] = 1; });
if (hre.length !== T.hreflangExpected || Object.keys(uniq).length !== T.hreflangExpected)
  bad("hreflang raw=" + hre.length + " unique=" + Object.keys(uniq).length + " (चाहिए " + T.hreflangExpected + ")");
else ok("hreflang raw = unique = " + T.hreflangExpected);

function has(s, m) { if (out.indexOf(s) < 0) bad(m + " अनुपस्थित: " + s.slice(0, 60)); else ok(m); }
function hasNot(s, m) { if (out.indexOf(s) >= 0) bad(m + " अब भी मौजूद: " + s.slice(0, 60)); else ok(m); }
has('<html lang="en">', 'lang="en"');
has('<link rel="canonical" href="' + T.canonical + '">', "canonical = /en/ पता");
has('<meta property="og:url" content="' + T.canonical + '">', "og:url = /en/ पता");
has('<meta property="og:locale" content="en_US">', "og:locale en_US");
has('window.APT_LANG="en"', "APT_LANG=en");
has('/assets/apt_en.js', "apt_en.js overlay");
has('/assets/apt_strings.js', "apt_strings.js");
/* v1.1 (12-Nov-2026): पूरी परीक्षा अब इस पन्ने पर भी; पहले ये तीनों "नहीं होने चाहिए" थे */
has('/assets/apt_session_en.js', "apt_session_en.js (इंजन की English तालिका)");
has('/assets/apt-session.js', "apt-session.js (पूरी परीक्षा का इंजन)");
has('/assets/apt-pay.js', "apt-pay.js (भुगतान)");
has('id="apt-sess-box"', "apt-sess-box (पूरी परीक्षा का डिब्बा)");
hasNot("available in Hindi only", "पुराना \"सिर्फ़ हिंदी में\" कार्ड");
hasNot('href="/aptitude-test.html#apt-full"', "हिंदी पूरी-परीक्षा की कड़ी");
(function () { var o = ['window.APT_LANG="en"', '/assets/apt_strings.js', '/assets/apt_en.js', '/assets/apt_session_en.js', '/assets/aptitude-test.js', '/assets/apt-session.js', '/assets/apt-pay.js'], last = -1, okOrder = true;
  o.forEach(function (x) { var k = out.indexOf(x); if (k < 0 || k < last) okOrder = false; last = k; });
  if (!okOrder) bad("scripts का क्रम ग़लत (तालिकाएँ इंजन से पहले चाहिए)"); else ok("scripts का क्रम: भाषा-निशान → तालिकाएँ → इंजन → भुगतान"); })();

/* डैश-नियम: नए (reused नहीं) जोड़ों के नए-पाठ में — वर्जित */
var dashBad = [];
T.pairs.forEach(function (p, i) {
  if (!p[3] && String(p[1]).indexOf("\u2014") >= 0) dashBad.push(i + 1);
});
if (dashBad.length) bad("डैश-नियम भंग (नए पाठ, जोड़ा): " + dashBad.join(","));
else ok("डैश-नियम: नए पाठ में लंबी रेखा शून्य");

if (fails) { console.log("⛔ FAIL : " + fails + " दोष : फ़ाइल नहीं लिखी गई।"); process.exit(1); }
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out);
console.log("🏁 लिखा: " + outFile + " (" + fs.statSync(outFile).size + " bytes)");
