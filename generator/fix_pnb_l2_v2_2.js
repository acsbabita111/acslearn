/* generator/fix_pnb_l2_v2_2.js — एक-बार मरम्मत (09-Oct-2026), v2.1 के ऊपर
   (1) हर item का 5वाँ खाना (A/B/C महत्व-वर्ग) English-मास्टर की उसी स्थिति से —
       EN↔UR में 1650/1650 स्थिति-मेल मशीन-सिद्ध, इसलिए स्थिति-विरासत सुरक्षित
   (2) हर L2-दिन में drill (बोलने-अभ्यास) — generator/data/pnb_drills.js से;
       type EN-मास्टर से, hi = दर्ज override या EN-hi (English/अंग्रेज़ी→पंजाबी)
   item[0]/[1]/[2]/[3] byte-अछूते। गिनती-पहरे: drill 65/65 · A=308। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
function load(rel, key) { global.window = {}; delete require.cache[require.resolve(path.join(ROOT, rel))]; require(path.join(ROOT, rel)); return global.window[key]; }

const EN = load("assets/kkb2_data.js", "KKB2_DATA");
const P  = load("assets/kkb2_pnb_data.js", "KKB2_DATA");
const DR = require("./data/pnb_drills.js");

let A = 0, drills = 0;
P.weeks.forEach((W, wi) => {
  const WE = EN.weeks[wi];
  W.days.forEach((D, di) => {
    const DE = WE.days[di];
    if (D.items.length !== DE.items.length) { console.error("⛔ item-गिनती w" + (wi + 1) + "d" + (di + 1)); process.exit(1); }
    D.items.forEach((it, ii) => {
      const cls = DE.items[ii][4];
      if (["A", "B", "C"].indexOf(cls) < 0) { console.error("⛔ EN-वर्ग अवैध w" + (wi + 1) + "d" + (di + 1) + "#" + ii); process.exit(1); }
      if (it.length === 4) it.push(cls); else it[4] = cls;
      if (cls === "A") A++;
    });
    const key = (wi + 1) + "-" + (di + 1);
    const src = DR[key];
    if (!src || !src.rows || !src.rows.length) { console.error("⛔ drill नहीं: " + key); process.exit(1); }
    const hi = src.hi || String(DE.drill.hi).replace(/English/g, "पंजाबी").replace(/अंग्रेज़ी/g, "पंजाबी");
    /* drill-cell पहरे: Shahmukhi-cell में देवनागरी-उच्चारण कोष्ठक अनिवार्य; चौकोर-कोष्ठक निषिद्ध */
    src.rows.forEach(r => r.forEach(c => {
      if (/[\[\]]/.test(c)) { console.error("⛔ drill में चौकोर-कोष्ठक: " + c); process.exit(1); }
      if (/[\u0600-\u06FF]/.test(c) && !/\([^()]*[\u0900-\u097F][^()]*\)/.test(c)) { console.error("⛔ drill-cell में देवनागरी-कोष्ठक नहीं: " + c); process.exit(1); }
    }));
    D.drill = { type: DE.drill.type, hi: hi, rows: src.rows };
    drills++;
    /* day-key क्रम परिवार जैसा: title,tw,drill,items */
    const nd = { title: D.title }; if (D.tw) nd.tw = D.tw; nd.drill = D.drill; nd.items = D.items;
    W.days[di] = nd;
  });
});
if (A !== 308) { console.error("⛔ A=" + A + " (308 चाहिए)"); process.exit(1); }
if (drills !== 65) { console.error("⛔ drill=" + drills); process.exit(1); }

P.version = "2.2";
const header = "// kkb2_pnb_data.js v2.2 — पश्चिमी पंजाबी (Shahmukhi) L2: 1650 वाक्य + tw/listen/dialog/test + A/B/C + 65 drill\n" +
 "// v2.2 (09-Oct-2026): A/B/C महत्व-वर्ग (A=308, मास्टर-स्थिति से) + 65 दिन के drill (pnb_drills.js से)\n" +
 "// v2.1 (09-Oct-2026): परिवार-ढाँचा + 13 test-ब्लॉक + hi/दिशा मास्टर-दर्पण + उच्चारण विराम-सफ़ाई\n";
fs.writeFileSync(path.join(ROOT, "assets/kkb2_pnb_data.js"), header + "window.KKB2_DATA = " + JSON.stringify(P, null, 1) + ";\n");
console.log("✅ लिखा kkb2_pnb_data.js v2.2 | A =", A, "| drill =", drills, "/65");
