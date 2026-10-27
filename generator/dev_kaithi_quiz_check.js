/* generator/dev_kaithi_quiz_check.js — v1.0 (27-Oct-2026)
   PJ433 कैथी-लिपि server-परीक्षा बैंक का स्थायी check-robot (fail-closed)।
   चलाना: node generator/dev_kaithi_quiz_check.js   (repo-रूट से; functions/kth_bank.js local हो)
   जाँचें: (1) बैंक ≥165 · हर प्रश्न {id,t,o(4),a(0-3),typ} · id "kth-NNNN" अनूठा
   (2) विकल्प-दोहराव शून्य · [ ] square-bracket शून्य · प्रश्न-पाठ ≥9 अक्षर
   (3) लंबाई-पक्षपात: अकेला-सबसे-लंबा=सही 15-35% (v5.2 होल)
   (4) यांत्रिक सच्चाई: T1/T3/T5 का सही विकल्प = kaithi_lipi.js के devaToKaithi से हूबहू;
       T2/T4 उल्टी दिशा हूबहू; T6 सन-गणित सूत्र (फसली+593 · संवत−57) से हूबहू
   (5) client-द्वार: dashboard.js SERVER_EXAM_COURSES/EXAM_TTS/CRS_ICON में PJ433 ·
       exam_data.js में PJ433 (q ख़ाली) · courses_data.js में PJ433 ·
       dashboard.css में NotoSansKaithi @font-face · sw.js v775+
   fail = कोई भी upload/deploy नहीं। */
"use strict";
var fs = require("fs");
var vm = require("vm");
var fail = 0;
function ok(c, m) { if (!c) { console.log("⛔ " + m); fail++; } }

/* इंजन */
var sb = { window: {} }; vm.createContext(sb);
vm.runInContext(fs.readFileSync("assets/kaithi_lipi.js", "utf8"), sb);
var KL = sb.window.KAITHI_LIPI; ok(KL && KL.devaToKaithi, "kaithi_lipi.js इंजन नहीं");
var toK = KL.devaToKaithi;

/* बैंक */
var BANK = require(process.cwd() + "/functions/kth_bank.js");
ok(Array.isArray(BANK) && BANK.length >= 165, "बैंक छोटा: " + BANK.length);
var ids = {}, biased = 0, eligible = 0;
BANK.forEach(function (Q, i) {
  ok(Q.id && /^kth-\d{4}$/.test(Q.id), "id ग़लत #" + i + ": " + Q.id);
  ok(!ids[Q.id], "id-दोहराव: " + Q.id); ids[Q.id] = 1;
  ok(typeof Q.t === "string" && Q.t.length > 8, "प्रश्न-पाठ छोटा #" + i);
  ok(Array.isArray(Q.o) && Q.o.length === 4, "4 विकल्प नहीं #" + i);
  ok(Q.a >= 0 && Q.a <= 3 && typeof Q.o[Q.a] === "string", "उत्तर-सूचक ग़लत #" + i);
  ok(Q.typ >= 1 && Q.typ <= 7, "typ ग़लत #" + i);
  var seen = {}; Q.o.forEach(function (t) { ok(!seen[t], "विकल्प-दोहराव #" + i); seen[t] = 1; });
  ok(!/[\[\]]/.test(Q.t + Q.o.join("")), "square-bracket #" + i);
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t2, ix) { if (t2.length > mx) { mx = t2.length; mi = ix; tie = false; } else if (t2.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
  /* यांत्रिक सच्चाई */
  var qm;
  if (Q.typ === 1 && (qm = Q.t.match(/«([^»]+)» कैथी/))) ok(Q.o[Q.a] === toK(qm[1]), "T1 रूपांतरण-बेमेल #" + i);
  if (Q.typ === 3 && (qm = Q.t.match(/«([^»]+)» का कैथी/))) ok(Q.o[Q.a] === toK(qm[1]), "T3 रूपांतरण-बेमेल #" + i);
  if (Q.typ === 5 && (qm = Q.t.match(/«([^»]+)» कैथी/))) ok(Q.o[Q.a] === toK(qm[1]), "T5 रूपांतरण-बेमेल #" + i);
  if ((Q.typ === 2 || Q.typ === 4) && (qm = Q.t.match(/«([^»]+)»/))) ok(toK(Q.o[Q.a]) === qm[1], "T" + Q.typ + " उल्टा-रूपांतरण-बेमेल #" + i);
  if (Q.typ === 6 && (qm = Q.t.match(/फसली सन (\d+)/))) ok(Q.o[Q.a] === String(+qm[1] + 593), "T6 फसली-सूत्र #" + i);
  if (Q.typ === 6 && (qm = Q.t.match(/विक्रम संवत (\d+)/))) ok(Q.o[Q.a] === String(+qm[1] - 57), "T6 संवत-सूत्र #" + i);
});
var rate = Math.round(biased * 1000 / eligible) / 10;
ok(rate >= 15 && rate <= 35, "लंबाई-पक्षपात " + rate + "% (खिड़की 15-35%)");

/* client-द्वार */
var dash = fs.readFileSync("assets/dashboard.js", "utf8");
ok(dash.indexOf("PJ433: true") > -1, "dashboard SERVER_EXAM_COURSES में PJ433 नहीं");
ok(dash.indexOf('PJ433: "hi-IN"') > -1, "dashboard EXAM_TTS में PJ433 नहीं");
ok(dash.indexOf('PJ433:"🏛️"') > -1, "dashboard CRS_ICON में PJ433 नहीं");
var ed = fs.readFileSync("assets/exam_data.js", "utf8");
ok(/"PJ433":\s*\{[^}]*q:\s*\[\]/.test(ed), "exam_data में PJ433 (q ख़ाली) नहीं");
var cd = fs.readFileSync("assets/courses_data.js", "utf8");
ok(cd.indexOf('"PJ433"') > -1, "courses_data में PJ433 नहीं");
var dc = fs.readFileSync("assets/dashboard.css", "utf8");
ok(dc.indexOf("NotoSansKaithi") > -1 && dc.indexOf("U+11080-110CF") > -1, "dashboard.css में कैथी font-face नहीं");
var sw = fs.readFileSync("sw.js", "utf8");
var swv = (sw.match(/CACHE_VERSION = 'v(\d+)'/) || [0, 0])[1];
ok(+swv >= 775, "sw version पुराना: v" + swv);

if (fail) { console.log("⛔ " + fail + " दोष — upload/deploy निषिद्ध"); process.exit(1); }
console.log("🏁 kth-बैंक: " + BANK.length + " प्रश्न · पक्षपात " + rate + "% · यांत्रिक-सच्चाई + client-द्वार 7/7 पास");
