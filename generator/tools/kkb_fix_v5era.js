#!/usr/bin/env node
/**
 * kkb_fix_v5era.js — v5.0-दौर की 8 भाषाओं (epo,lat,oci,bre,fry,cos,scn,lmo) में
 * पाए गए systemic बग सुधारना:
 *  1. week.title = week.hi (अंग्रेज़ी-टाइटल हिंदी से बदलना)
 *  2. day.items में हिंदी "अंग्रेज़ी" शब्द (ग़लत भाषा-नाम) → सही भाषा-नाम
 *  3. day.title में भी वही सुधार (week13 day3 जैसी जगहें)
 * pronunciation-लैटिन (proper nouns) अलग-अलग भाषा में अलग होने से मैनुअली सुधारे जाते हैं।
 *
 * इस्तेमाल: node kkb_fix_v5era.js <langCode> <सही-हिंदी-नाम>
 * उदाहरण:  node kkb_fix_v5era.js epo एस्पेरान्तो
 */
const fs = require("fs");
const path = require("path");
const ASSETS = path.join(__dirname, "..", "..", "assets");

function W(p) {
  const w = {};
  new Function("window", fs.readFileSync(p, "utf8"))(w);
  return w;
}

function fixLang(langCode, correctHiName) {
  const l1Path = path.join(ASSETS, `kkb_${langCode}_data.js`);
  const l2Path = path.join(ASSETS, `kkb2_${langCode}_data.js`);
  const l1 = W(l1Path).KKB_DATA;
  const l2 = W(l2Path).KKB2_DATA;

  let weekTitleFixed = 0,
    itemHiFixed = 0,
    dayTitleFixed = 0;

  [l1, l2].forEach((d) => {
    d.weeks.forEach((w) => {
      // 1. week.title सुधार
      if (w.title !== w.hi && w.hi) {
        w.title = w.hi;
        weekTitleFixed++;
      }
      w.days.forEach((day) => {
        // 2. day.title में ग़लत-भाषा-नाम सुधार
        if (/अंग्रेज़ी|फ्रेंच|फ़्रेंच/.test(day.title)) {
          day.title = day.title.replace(/अंग्रेज़ी|फ्रेंच|फ़्रेंच/g, correctHiName);
          dayTitleFixed++;
        }
        // 3. item[2] (हिंदी) में ग़लत-भाषा-नाम सुधार
        day.items.forEach((it) => {
          if (/अंग्रेज़ी|फ्रेंच|फ़्रेंच/.test(it[2])) {
            it[2] = it[2].replace(/अंग्रेज़ी|फ्रेंच|फ़्रेंच/g, correctHiName);
            itemHiFixed++;
          }
        });
      });
    });
  });

  fs.writeFileSync(l1Path, "window.KKB_DATA = " + JSON.stringify(l1, null, 1) + ";\n");
  fs.writeFileSync(l2Path, "window.KKB2_DATA = " + JSON.stringify(l2, null, 1) + ";\n");

  console.log(`✅ ${langCode}: week-title सुधरे=${weekTitleFixed}, day-title सुधरे=${dayTitleFixed}, item-हिंदी सुधरे=${itemHiFixed}`);
}

if (require.main === module) {
  const langCode = process.argv[2];
  const correctHiName = process.argv[3];
  if (!langCode || !correctHiName) {
    console.log("इस्तेमाल: node kkb_fix_v5era.js <langCode> <सही-हिंदी-नाम>");
    process.exit(1);
  }
  fixLang(langCode, correctHiName);
}

module.exports = { fixLang };
