/* generator/dev_kkb_quiz_check.js — v1.0 (31-Aug-2026)
   KKB भाषा-परीक्षा बैंकों (ar/fr/es/ja/ko/de/ru) का स्थायी check-robot।
   चलाना: node generator/dev_kkb_quiz_check.js <code>   (repo-रूट से; functions/<code>_bank.js local हो)
   जाँचें: (1) बैंक ≥2,900 प्रश्न · हर प्रश्न {id,t,o(4),a(0-3)} · id "<code>-NNNN" व अनूठा
   (2) विकल्प-दोहराव शून्य · सही-उत्तर विकल्पों में · [ ] square-bracket शून्य
   (3) लंबाई-पक्षपात: अकेला-सबसे-लंबा=सही 15-35% (v5.2 होल)
   (4) ((AU:...)) निशान सिर्फ़ सुनो-प्रश्नों में — और हर AU-पाठ corpus के असली वाक्य का spoken-रूप
   (5) भाषा-नियम: ja के AU-पाठ में अंत-कोष्ठक (romaji) नहीं; ru v2.0: प्रश्न/विकल्प में सिरिलिक अनिवार्य (au-छूट)
   (6) client-द्वार: dashboard.js की SERVER_EXAM_COURSES में कोर्स-id + exam_data.js में प्रविष्टि (q ख़ाली)
   v2.0 (01-Sep): (6) बोलो-प्रश्न T15-17 — o ख़ाली, a=-1, sp corpus-हूबहू, ((MIC)); ≥250 प्रति बैंक (40/40/40 नियम)।
   fail = कोई भी upload/deploy नहीं। */
"use strict";
var fs = require("fs");
var CODE = (process.argv[2] || "").toLowerCase();
var PID = { ar: "PJ022", fr: "PJ086", es: "PJ021", ja: "PJ026", ko: "PJ031", de: "PJ125", ru: "PJ052", he: "PJ137", en: "PJ018",
  pt: "PJ024", kn: "PJ019", ta: "PJ029", te: "PJ028", bn: "PJ023", or: "PJ057", as: "PJ041", pa: "PJ039", gu: "PJ033", ml: "PJ056", ur: "PJ055", fa: "PJ035", sd: "PJ049", ks: "PJ046", mr: "PJ027", ne: "PJ047", sw: "PJ032", bho: "PJ038" }[CODE]; /* 02-Sep: +10; + ur/fa/sd/ks (RTL-परिवार) */
if (!PID) { console.log("⛔ भाषा-code दीजिए: ar|fr|es|ja|ko|de|ru|he|pt|kn|ta|te|bn|or|as|pa|gu|ml"); process.exit(1); }
var fail = 0;
function ok(c, m) { if (!c) { console.log("⛔ " + m); fail++; } }
var BANK = require(process.cwd() + "/functions/" + (CODE === "en" ? "eng" : CODE) + "_bank.js");
ok(Array.isArray(BANK) && BANK.length >= 2900, "बैंक छोटा: " + BANK.length);

/* corpus (AU-पाठ के हूबहू-मिलान हेतु) */
global.window = {};
eval(fs.readFileSync(CODE === "en" ? "assets/kkb_data.js" : "assets/kkb_" + CODE + "_data.js", "utf8").replace("window.KKB_DATA", "global.window.KKB_DATA"));
eval(fs.readFileSync(CODE === "en" ? "assets/kkb2_data.js" : "assets/kkb2_" + CODE + "_data.js", "utf8"));
var SPOK = {};
function clean(t) { return String(t).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, "").replace(/^\([^()\s]{1,8}\)\s*/, "").replace(/\s*\([^()]*[\u0900-\u097F][^()]*\)\s*$/, ""); } /* v2.0: (שמע)/(דבר)-जैसे लिपि-टैग व अंत का (देवनागरी-उच्चारण) भी हटे — listen-भंडारण-रूप */
function spokenT(t) { t = clean(t); if (CODE === "ja") t = t.replace(/\s*\([^()]*\)\s*$/, ""); return t; }
[global.window.KKB_DATA, global.window.KKB2_DATA].forEach(function (D) {
  D.weeks.forEach(function (w) { w.days.forEach(function (d) { d.items.forEach(function (it) { SPOK[spokenT(it[0])] = 1; }); });
    (w.listen || []).forEach(function (p) { SPOK[spokenT(p[0])] = 1; SPOK[spokenT(p[1])] = 1; });   /* v2.0: T17 के सवाल-जवाब listen/dialog से */
    (w.dialog || []).forEach(function (d2) { SPOK[spokenT(d2[1])] = 1; }); });
});

var ids = {}, biased = 0, eligible = 0, au = 0, auBad = 0, sp = 0, CYR = /[\u0400-\u04FF]/;
BANK.forEach(function (Q, i) {
  ok(Q.id && Q.id.indexOf(CODE + "-") === 0, "id-prefix ग़लत: " + Q.id);
  ok(!ids[Q.id], "id-दोहराव: " + Q.id); ids[Q.id] = 1;
  ok(typeof Q.t === "string" && Q.t.length > 8, "प्रश्न-पाठ छोटा #" + i);
  if (Q.sp) { /* v2.0 (01-Sep, Founder-नियम 40/40/40): बोलो-प्रश्न — o ख़ाली, a=-1, sp = corpus का असली वाक्य, ((MIC)) निशान */
    sp++; ok(Array.isArray(Q.o) && Q.o.length === 0 && Q.a === -1, "बोलो-प्रश्न में विकल्प/उत्तर-सूचक #" + i);
    ok(typeof Q.sp === "string" && Q.sp.length > 1 && SPOK[Q.sp], "बोलो-प्रश्न का sp corpus में नहीं #" + i + ": " + Q.sp);
    ok(Q.t.indexOf("((MIC))") > -1, "बोलो-प्रश्न में ((MIC)) निशान नहीं #" + i);
    if (Q.typ === 17) ok(/\(\(AU:/.test(Q.t), "T17 में सुनो-निशान नहीं #" + i);
    return;
  }
  ok(Array.isArray(Q.o) && Q.o.length === 4, "4 विकल्प नहीं #" + i);
  ok(Q.a >= 0 && Q.a <= 3 && typeof Q.o[Q.a] === "string", "उत्तर-सूचक ग़लत #" + i);
  var seen = {};
  Q.o.forEach(function (t) { ok(!seen[t], "विकल्प-दोहराव #" + i); seen[t] = 1; });
  ok(!/[\[\]]/.test(Q.t + Q.o.join("")), "square-bracket #" + i);
  if (CODE === "ru") ok(CYR.test(Q.t + Q.o.join("")) || Q.au, "सिरिलिक-अनुपस्थित #" + i);
  if (CODE === "he") ok(/[\u0590-\u05FF]/.test(Q.t + Q.o.join("")) || Q.au, "हिब्रू-अनुपस्थित #" + i); /* 01-Sep: हिब्रू असली-लिपि अनिवार्य (au-छूट) */ /* v2.0 (31-Aug): सिरिलिक अनिवार्य (au-सुनो-प्रश्न छूट) */
  var m = /\(\(AU:([\s\S]*?)\)\)/.exec(Q.t);
  if (m) {
    au++;
    if (!SPOK[m[1]]) auBad++;
    if (CODE === "ja") ok(!/\([^()]*\)\s*$/.test(m[1]), "ja AU-पाठ में अंत-romaji #" + i);
  }
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t, ix) { if (t.length > mx) { mx = t.length; mi = ix; tie = false; } else if (t.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
ok(au >= 280, "सुनो-प्रश्न कम: " + au);
ok(sp >= 250, "बोलो-प्रश्न कम (40/40/40 नियम हेतु ≥250 चाहिए): " + sp);   /* v2.0 */
ok(auBad === 0, "AU-पाठ corpus से बाहर: " + auBad);
var rate = Math.round(biased * 1000 / eligible) / 10;
ok(rate >= 15 && rate <= 35, "लंबाई-पक्षपात " + rate + "%");

/* client-द्वार */
var dj = fs.readFileSync("assets/dashboard.js", "utf8");
ok(new RegExp(PID + ":\\s*true").test(dj), "dashboard SERVER_EXAM_COURSES में " + PID + " नहीं");
var ed = fs.readFileSync("assets/exam_data.js", "utf8");
ok(ed.indexOf('"' + PID + '"') >= 0, "exam_data में " + PID + " प्रविष्टि नहीं");

if (fail) { console.log("⛔ कुल fail: " + fail); process.exit(1); }
console.log("🏁 dev_kkb_quiz_check (" + CODE + "/" + PID + "): " + BANK.length + " प्रश्न · सुनो " + au + " · बोलो " + sp + " · लंबाई-दर " + rate + "% · द्वार ठीक — सब पास");
