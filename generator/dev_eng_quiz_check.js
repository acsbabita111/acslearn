/* generator/dev_eng_quiz_check.js — v1.0 · PJ018 server-बैंक का स्थायी पहरेदार
   जाँचें: 2,150 गिनती · हर प्रश्न 4 विकल्प · a=0-3 · विकल्प-दोहराव शून्य ·
   सही-उत्तर विकल्पों में · लंबाई-पक्षपात 15-35% (v5.2 होल) · [ ] शून्य ·
   client-द्वार (dashboard SERVER_EXAM_COURSES + exam_data प्रविष्टि) */
"use strict";
var fs = require("fs"), fail = 0;
var B = require("../functions/eng_bank.js");
if (B.length !== 2619) { console.log("⛔ गिनती " + B.length); fail++; }
var idSeen = {};
B.forEach(function (Q, i2) {
  if (!Q.id) { console.log("⛔ id नहीं q#" + i2); fail++; }
  else if (idSeen[Q.id]) { console.log("⛔ id-दोहराव " + Q.id); fail++; }
  else idSeen[Q.id] = 1;
});
var tCount = {}; B.forEach(function (Q) { tCount[Q.t] = (tCount[Q.t] || 0) + 1; });
for (var t = 1; t <= 12; t++) if (!tCount[t] || tCount[t] < 20) { console.log("⛔ प्रकार-" + t + " कम/ग़ायब"); fail++; }
var first24 = {}; B.slice(0, 24).forEach(function (Q) { first24[Q.t] = 1; });
if (Object.keys(first24).length < 10) { console.log("⛔ शुरुआती क्रम में प्रकार नहीं घूमते"); fail++; }
console.log("12-प्रकार गिनती: " + JSON.stringify(tCount));
var biased = 0, eligible = 0;
B.forEach(function (Q, i) {
  if (!Q.q || Q.o.length !== 4 || Q.a < 0 || Q.a > 3) { console.log("⛔ ढाँचा q#" + i); fail++; }
  var seen = {};
  Q.o.forEach(function (t) { if (seen[t]) { console.log("⛔ विकल्प-दोहराव q#" + i); fail++; } seen[t] = 1; });
  if ((Q.q + Q.o.join("")).indexOf("[") > -1) { console.log("⛔ चौकोर-कोष्ठक q#" + i); fail++; }
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t, ix) { if (t.length > mx) { mx = t.length; mi = ix; tie = false; } else if (t.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
var rate = Math.round(biased * 1000 / eligible) / 10;
console.log("बैंक " + B.length + " · पक्षपात-दर " + rate + "%");
if (rate < 15 || rate > 35) { console.log("⛔ लंबाई-पक्षपात"); fail++; }
var dj = fs.readFileSync("../assets/dashboard.js", "utf8");
if (dj.indexOf("PJ018: true") < 0) { console.log("⛔ dashboard-द्वार नहीं"); fail++; }
var ed = fs.readFileSync("../assets/exam_data.js", "utf8");
if (ed.indexOf('"PJ018"') < 0 || ed.indexOf("eng_bank, 2619") < 0) { console.log("⛔ exam_data-द्वार नहीं"); fail++; }
if (fail) { console.log("⛔ कुल fail: " + fail); process.exit(1); }
console.log("🏁🏁 dev_eng_quiz_check: सब जाँचें पास");
