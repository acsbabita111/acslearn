/* generator/patch_cert_rules_k3.js : v1.0 (14-Nov-2026) : खेप 3-क
   प्रमाणपत्र के पुराने नियम ("Lifetime valid", "verify 3 साल मुफ़्त", "duplicate 500 रुपये") जहाँ लिखे थे, वहाँ Founder के
   13-Nov-2026 के नियम लिखता है: online जाँच जारी होने से 5 साल; ₹1000 में 5 साल और; मान्य अवधि में प्रमाणपत्र मुफ़्त निकलता है।
   हर बदलाव स्रोत और उससे बने पेज, दोनों में एक साथ होता है। dashboard के पेज यंत्र से दोबारा नहीं बनाए जाते
   (यंत्र आज के live पेज हूबहू नहीं बनाता: यह पुराना दर्ज होल है), इसलिए वहाँ सिर्फ़ यही वाक्य बदले जाते हैं।
   सटीक-हाल नियम: पुराना वाक्य मिले तभी बदलता है; नया पहले से हो तो छोड़ देता है; दोनों न मिलें तो रुक जाता है।
   चलाना (repo की जड़ से): node generator/patch_cert_rules_k3.js */
"use strict";
var fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
function count(h, n) { return h.split(n).length - 1; }
var NEW5 = "online जाँच जारी होने से 5 साल तक; 1000 रुपये देकर 5 साल और बढ़ती है (मान्य तिथि निकलने के बाद देर का शुल्क अलग से)। मान्य अवधि में प्रमाण पत्र मुफ़्त निकलता है।";
var REP = [
  /* dashboard: "मेरे प्रमाण पत्र" पैनल */
  ["Lifetime valid; verify 3 साल मुफ़्त, फिर 1000 रुपये; duplicate 500 रुपये।", NEW5],
  ["अभी आपका कोई प्रमाण पत्र नहीं बना — परीक्षा-इंजन चालू होते ही download यहीं मिलेगा।", "प्रमाण पत्र \"मेरे कोर्स\" की तालिका से निकलता है: परीक्षा पास कीजिए, फिर 125 रुपये देकर लीजिए।"],
  ["दुनिया में कहीं से verify। Lifetime valid।", "दुनिया में कहीं से verify। online जाँच जारी होने से 5 साल तक; 1000 रुपये में 5 साल और (मान्य तिथि के बाद देर का शुल्क अलग से)।"],
  /* वेल्डिंग पाठ 626 */
  ["lifetime valid, 3 साल free फिर ₹1,000, duplicate ₹500", "online जाँच जारी होने से 5 साल तक, फिर ₹1,000 में 5 साल और"],
  ["(lifetime, 3 साल free)", "(online जाँच 5 साल; ₹1,000 में 5 साल और)"]
];
/* English-परत (assets/dash_i18n_en.js): वहाँ हर वाक्य "..." के भीतर है, इसलिए नए पाठ के उद्धरण-चिह्न \\" के रूप में लिखे जाते हैं।
   कुंजी (हिंदी) और मान (English) दोनों बदलते हैं। */
var EN = [
  ["Lifetime valid; verify 3 साल मुफ़्त, फिर 1000 रुपये; duplicate 500 रुपये।", NEW5],
  ["अभी आपका कोई प्रमाण पत्र नहीं बना — परीक्षा-इंजन चालू होते ही download यहीं मिलेगा।", "प्रमाण पत्र \\\"मेरे कोर्स\\\" की तालिका से निकलता है: परीक्षा पास कीजिए, फिर 125 रुपये देकर लीजिए।"],
  ["दुनिया में कहीं से verify। Lifetime valid।", "दुनिया में कहीं से verify। online जाँच जारी होने से 5 साल तक; 1000 रुपये में 5 साल और (मान्य तिथि के बाद देर का शुल्क अलग से)।"],
  ["Lifetime valid; verification free for 3 years, then ₹1000; duplicate ₹500.", "Online verification runs for 5 years from the issue date; 1000 rupees adds 5 more years (after the valid-till date a late fee is added). Within the valid period the certificate is free to download."],
  ["You have no certificate yet: as soon as the exam engine is on, downloads will be right here.", "Certificates come from the \\\"My Courses\\\" table: pass the exam, then get it for 125 rupees."],
  ["verify from anywhere in the world. Lifetime valid.", "verify from anywhere in the world. Online verification for 5 years from the issue date; 5 more years for 1000 rupees (plus a late fee after the valid-till date)."]
];
var files = ["generator/build_dashboards.js", "assets/dash_i18n_en.js", "generator/data/welding_lessons_data.js",
  "courses/hi/welding/wld-626-varkasha-pa-ke-bada-pariksha-ki-raha-dohara-tala.html"];
fs.readdirSync(path.join(ROOT, "dashboard"), { withFileTypes: true }).forEach(function (d) {
  if (d.isDirectory() && fs.existsSync(path.join(ROOT, "dashboard", d.name, "index.html"))) files.push("dashboard/" + d.name + "/index.html");
});
var out = [], OLDS = REP.map(function (r) { return r[0]; });
files.forEach(function (rel) {
  var f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) { console.log("[STOP] फ़ाइल नहीं मिली: " + rel); process.exit(1); }
  var s = fs.readFileSync(f, "utf8"), did = 0;
  (rel === "assets/dash_i18n_en.js" ? EN : REP).forEach(function (r) { var n = count(s, r[0]); if (n) { s = s.split(r[0]).join(r[1]); did += n; } });
  if (did) { fs.writeFileSync(f, s); out.push(rel + " (" + did + ")"); }
});
/* बाद की जाँच: इन फ़ाइलों में पुराना वाक्य कहीं न बचे */
var left = [];
files.forEach(function (rel) { var s = fs.readFileSync(path.join(ROOT, rel), "utf8"); OLDS.concat(["Lifetime valid", "duplicate 500"]).forEach(function (o) { if (s.indexOf(o) >= 0) left.push(rel + " : " + o.slice(0, 30)); }); });
if (left.length) { console.log("[STOP] पुराना वाक्य अब भी बचा है:\n  " + left.slice(0, 8).join("\n  ")); process.exit(1); }
console.log(out.length ? "🏁 बदली फ़ाइलें " + out.length + ": " + out.join(" · ") : "🏁 कुछ बदलना बाक़ी नहीं था (सब पहले से नए हाल में)");
