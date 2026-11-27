/* generator/patch_badge_ek_dar.js : v1.0 (27-Nov-2026) : खेप "एक दर"
   Founder का फ़ैसला (27-Nov-2026): "₹300 की एक ही दर रहेगी" और "पुरानी दर निरस्त"।
   यह यंत्र हाथ से रखे जाने वाले हिंदी मूल पन्नों में बैज की पुरानी तीन दरें (एरिया/गाँव ₹300, ज़िला-मुख्यालय/क़स्बा ₹600, महानगर ₹1000)
   हटाकर एक दर लिखता है: "₹300 · हर जगह एक ही दर"। दायरा:
     8 नियम-पत्र: center, workshop, teacher, ustad, counselor, employer, vendor, finance-mitra (बैज वाला एक नियम + संस्करण की पट्टी)
     रजिस्ट्रेशन गाइड: 2 पंक्तियाँ
   सिर्फ़ दर बदलती है। "वैकल्पिक", "अनिवार्य", उम्र-fee, नवीनीकरण और वापसी के शब्द जस के तस रहते हैं (वे नियम अलग खेप में, Founder के फ़ैसले के बाद)।
   विद्यार्थी का नियम-पत्र (rules-consent-learner.html) इस यंत्र के दायरे में नहीं: उसका संस्करण server जाँचता है,
     इसलिए वह तब बदलेगा, जब उसका नया संस्करण और server की फ़ाइल साथ बदलें।
   संस्करण: दर बदली है, इसलिए हर बदले पत्र का संस्करण एक क़दम बढ़ता है (जो "मसौदा" है, वह मसौदा ही रहता है)।
   सटीक-हाल नियम: पुराना वाक्य ठीक एक बार मिले तभी बदलता है; नया पहले से हो तो छोड़ देता है; दोनों न मिलें तो रुक जाता है और कुछ नहीं लिखता।
   दोबारा चलाने पर एक भी byte नहीं बदलता।
   चलाना (repo की जड़ से):  node generator/patch_badge_ek_dar.js            बदलो
                            node generator/patch_badge_ek_dar.js --check    सिर्फ़ जाँचो (कुछ बाक़ी हो तो exit 1)
   इसके बाद: node generator/build_rules_consent_en.js (en, kn, bn) और node generator/build_panel_i18n.js (en, kn, bn)। */
"use strict";
var fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
var CHECK = process.argv.indexOf("--check") > -1;
function count(h, n) { return h.split(n).length - 1; }

var RATE = "₹300 · हर जगह एक ही दर";
/* संस्करण की पट्टियाँ */
var V_FINAL_NEW = "<b>Version: 1.2</b> · 27-11-2026 · Founder का फ़ैसला: बैज की दर हर जगह एक (₹300)";
var V_D10 = "<b>Version: 1.0 (मसौदा)</b> · प्रभावी तिथि: Founder-मंज़ूरी की तिथि से</div>";
var V_D11 = "<b>Version: 1.1 (मसौदा)</b> · प्रभावी तिथि: Founder-मंज़ूरी की तिथि से<br>\n  Supersedes: v1.0 मसौदा · <b>बदलाव-सार:</b> बैज की दर हर जगह एक (₹300; Founder का फ़ैसला, 27-11-2026)</div>";
var V_D11_OLD_LONG = "<b>Version: 1.1 (मसौदा)</b> · प्रभावी तिथि: Founder-मंज़ूरी की तिथि से<br>\n  Supersedes: v1.0 मसौदा (12-07-2026) · <b>बदलाव-सार:</b> नियम-47 कानूनी-सुरक्षा रूप · वार्षिक नैतिकता-घोषणा · KPI-नियम · नियम-43/40 सुदृढ़ · public-नाम प्रदर्शन (कूट-नाम internal)</div>";
var V_D12 = "<b>Version: 1.2 (मसौदा)</b> · प्रभावी तिथि: Founder-मंज़ूरी की तिथि से<br>\n  Supersedes: v1.1 मसौदा · <b>बदलाव-सार:</b> बैज की दर हर जगह एक (₹300; Founder का फ़ैसला, 27-11-2026)</div>";

var JOBS = [
  ["rules-consent-center.html", [
    ["नियम 7: दर", "Metropolitan ₹1000 · ज़िला-मुख्यालय ₹600 · एरिया ₹300 · 365 दिन (उम्र-fee नहीं, यह केंद्र-स्तर का badge है)।", RATE + " · 365 दिन (उम्र-fee नहीं, यह केंद्र-स्तर का badge है)।"],
    ["संस्करण 1.1 → 1.2", "<b>Version: 1.1</b> · 18-07-2026 · Founder-मंज़ूर (धारा 46-47 जुड़ीं; नियम-11 विभाजन-सुधार; उप-पंक्ति सुधार)", V_FINAL_NEW] ]],
  ["rules-consent-workshop.html", [
    ["नियम 7: दर", "Metropolitan ₹1000 · ज़िला-मुख्यालय ₹600 · एरिया ₹300 · 365 दिन (उम्र-fee नहीं, यह केंद्र-स्तर का badge है)।", RATE + " · 365 दिन (उम्र-fee नहीं, यह केंद्र-स्तर का badge है)।"],
    ["संस्करण 1.1 → 1.2", "<b>Version: 1.1</b> · 18-07-2026 · Founder-मंज़ूर (धारा 46-49 जुड़ीं; नियम-11 विभाजन-सुधार; उप-पंक्ति सुधार)", V_FINAL_NEW] ]],
  ["rules-consent-teacher.html", [
    ["नियम 7: दर", "Metro ₹1000 · Town/ज़िला-HQ ₹600 · Village/एरिया ₹300 · 365 दिन। 45 वर्ष या अधिक उम्र पर यह वैकल्पिक है;", RATE + " · 365 दिन। 45 वर्ष या अधिक उम्र पर यह वैकल्पिक है;"],
    ["संस्करण 1.0 → 1.1 (मसौदा)", V_D10, V_D11] ]],
  ["rules-consent-ustad.html", [
    ["नियम 7: दर", "Metro ₹1000 · Town/ज़िला-HQ ₹600 · Village/एरिया ₹300 · 365 दिन। 45 वर्ष या अधिक उम्र पर यह वैकल्पिक है;", RATE + " · 365 दिन। 45 वर्ष या अधिक उम्र पर यह वैकल्पिक है;"],
    ["संस्करण 1.0 → 1.1 (मसौदा)", V_D10, V_D11] ]],
  ["rules-consent-counselor.html", [
    ["नियम 7: दर", "Metro ₹1000 · Town/ज़िला-HQ ₹600 · Village/एरिया ₹300 · 365 दिन। 45 वर्ष या अधिक उम्र पर वैकल्पिक;", RATE + " · 365 दिन। 45 वर्ष या अधिक उम्र पर वैकल्पिक;"],
    ["संस्करण 1.0 → 1.1 (मसौदा)", V_D10, V_D11] ]],
  ["rules-consent-employer.html", [
    ["नियम 6: दर", "<b>Verified Badge (वैकल्पिक, स्थान-आधारित):</b> Metropolitan ₹1000 · जिला-मुख्यालय ₹600 · एरिया ₹300 · 365 दिन।", "<b>Verified Badge (वैकल्पिक):</b> " + RATE + " · 365 दिन।"],
    ["संस्करण 1.0 → 1.1 (मसौदा)", V_D10, V_D11] ]],
  ["rules-consent-vendor.html", [
    ["नियम 8: दर", "स्थान-आधारित शुल्क — Metropolitan ₹1,000 · जिला-मुख्यालय ₹600 · एरिया ₹300 · अवधि 365 दिन।", "शुल्क " + RATE + " · अवधि 365 दिन।"],
    ["संस्करण 1.1 → 1.2 (मसौदा)", V_D11_OLD_LONG, V_D12] ]],
  ["rules-consent-finance-mitra.html", [
    ["नियम 8: दर", "स्थान-आधारित शुल्क — Metropolitan ₹1,000 · जिला-मुख्यालय ₹600 · एरिया ₹300 · अवधि 365 दिन।", "शुल्क " + RATE + " · अवधि 365 दिन।"],
    ["संस्करण 1.1 → 1.2 (मसौदा)", V_D11_OLD_LONG, V_D12] ]],
  ["registration-guide.html", [
    ["गाइड: बैज की पंक्ति 1", "चाहें तो सत्यापित बैज (Verified Badge) ले सकते हैं — गाँव ₹300 · कस्बा ₹600 · महानगर ₹1000, साल भर के लिए। बिना बैज भी आवेदन कर सकते हैं।", "चाहें तो सत्यापित बैज (Verified Badge) ले सकते हैं — ₹300, हर जगह एक ही दर, साल भर के लिए। बिना बैज भी आवेदन कर सकते हैं।"],
    ["गाइड: बैज की पंक्ति 2", "बैज (Badge) आपकी मर्ज़ी — गाँव ₹300 · कस्बा ₹600 · महानगर ₹1000, साल भर।", "बैज (Badge) आपकी मर्ज़ी — ₹300, हर जगह एक ही दर, साल भर।"] ]]
];

var fails = 0, todo = 0, done = 0, writes = [];
JOBS.forEach(function (job) {
  var file = job[0], p = path.join(ROOT, file), raw = fs.readFileSync(p, "utf8"), crlf = raw.indexOf("\r\n") > -1;
  var s = raw.replace(/\r\n/g, "\n"), before = s;
  job[1].forEach(function (c) {
    var label = c[0], oldS = c[1], newS = c[2], co = count(s, oldS), cn = count(s, newS);
    if (co === 1 && cn === 0) { s = s.split(oldS).join(newS); todo++; console.log("  ✓ " + file + " : " + label); return; }
    if (co === 0 && cn === 1) { done++; console.log("  ✓ (पहले से) " + file + " : " + label); return; }
    fails++; console.log("  ✗ FAIL " + file + " : " + label + " (पुराना " + co + " बार, नया " + cn + " बार)");
  });
  if (s !== before) writes.push([p, crlf ? s.replace(/\n/g, "\r\n") : s]);
});
/* पहरा: बदले पत्रों में पुरानी दर का कोई रूप न बचे */
if (!fails) JOBS.forEach(function (job) {
  var w = writes.filter(function (x) { return x[0] === path.join(ROOT, job[0]); })[0];
  var s = (w ? w[1] : fs.readFileSync(path.join(ROOT, job[0]), "utf8"));
  ["₹600", "₹ 600", "Metropolitan", "Metro ₹", "Town/", "महानगर ₹", "कस्बा ₹", "स्थान-आधारित"].forEach(function (bad) {
    if (s.indexOf(bad) > -1) { fails++; console.log("  ✗ FAIL " + job[0] + " : पुरानी दर का शब्द बचा है: " + bad); }
  });
});
if (fails) { console.log("⛔ patch_badge_ek_dar: " + fails + " गड़बड़ी; कुछ नहीं लिखा गया।"); process.exit(1); }
if (CHECK) {
  if (todo) { console.log("⛔ patch_badge_ek_dar --check: " + todo + " बदलाव बाक़ी हैं। चलाएँ: node generator/patch_badge_ek_dar.js"); process.exit(1); }
  console.log("🏁 patch_badge_ek_dar --check: 9 पन्नों में एक दर लिखी है (" + done + " जगह) · पुरानी दर 0"); process.exit(0);
}
writes.forEach(function (w) { fs.writeFileSync(w[0], w[1]); });
console.log("🏁 patch_badge_ek_dar v1.0: " + writes.length + " पन्ने लिखे · " + todo + " बदलाव · " + done + " पहले से · पुरानी दर 0");
