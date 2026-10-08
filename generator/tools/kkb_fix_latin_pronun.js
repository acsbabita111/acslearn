#!/usr/bin/env node
/**
 * kkb_fix_latin_pronun.js — pronunciation-column (item[1]) में बचे proper-noun
 * लैटिन-शब्दों (WhatsApp, IMEI, IRCTC, India, e-Migrate, MADAD, e-Shram आदि) को
 * देवनागरी-लिप्यंतरण से बदलना। सभी v5.0-era भाषाओं में एक जैसे शब्द मिले।
 *
 * इस्तेमाल: node kkb_fix_latin_pronun.js <langCode>
 */
const fs = require("fs");
const path = require("path");
const ASSETS = path.join(__dirname, "..", "..", "assets");

function W(p) {
  const w = {};
  new Function("window", fs.readFileSync(p, "utf8"))(w);
  return w;
}

// सामान्य proper-noun → देवनागरी नक़्शा (सभी भाषाओं में एक जैसे शब्द पाए गए)
const REPLACEMENTS = [
  [/WhatsApp/g, "व्हाट्सऐप"],
  [/e-Shram/g, "ई-श्रम"],
  [/\bIMEI\b/g, "आईएमईआई"],
  [/\bIRCTC\b/g, "आईआरसीटीसी"],
  [/\bIndia\b/g, "इंडिया"],
  [/e-Migrate/g, "ई-माइग्रेट"],
  [/\bMADAD\b/g, "मदद"],
  [/\bAI-apo\b/gi, "एआई-ऐप"],
  [/\bAadhaar\b/g, "आधार"],
  [/\bonline\b/gi, "ऑनलाइन"],
  [/\bLabour Chowk\b/g, "लेबर चौक"],
  [/\bcheck-in\b/gi, "चेक-इन"],
  [/\blive\b/g, "लाइव"],
];

function fixLang(langCode) {
  const l1Path = path.join(ASSETS, `kkb_${langCode}_data.js`);
  const l2Path = path.join(ASSETS, `kkb2_${langCode}_data.js`);
  const hasL1 = fs.existsSync(l1Path);
  const hasL2 = fs.existsSync(l2Path);

  let totalFixed = 0;
  [hasL1 && l1Path, hasL2 && l2Path].filter(Boolean).forEach((filePath) => {
    const isL1 = filePath === l1Path;
    const key = isL1 ? "KKB_DATA" : "KKB2_DATA";
    const data = W(filePath)[key];
    data.weeks.forEach((w) =>
      w.days.forEach((day) =>
        day.items.forEach((it) => {
          const before = it[1];
          REPLACEMENTS.forEach(([re, repl]) => {
            it[1] = it[1].replace(re, repl);
          });
          if (it[1] !== before) totalFixed++;
        })
      )
    );
    fs.writeFileSync(filePath, `window.${key} = ` + JSON.stringify(data, null, 1) + ";\n");
  });

  console.log(`✅ ${langCode}: pronunciation-column के ${totalFixed} जगह सुधरे`);
}

if (require.main === module) {
  const langCode = process.argv[2];
  if (!langCode) {
    console.log("इस्तेमाल: node kkb_fix_latin_pronun.js <langCode>");
    process.exit(1);
  }
  fixLang(langCode);
}

module.exports = { fixLang, REPLACEMENTS };
