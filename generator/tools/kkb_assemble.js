#!/usr/bin/env node
/**
 * kkb_assemble.js — content-फ़ाइल को मास्टर के साथ मर्ज करके week-JSON बनाना
 * दोनों L1 (4-फ़ील्ड items) और L2 (5-फ़ील्ड items) को संभालता है।
 *
 * इस्तेमाल (कोड में require करके, CLI से नहीं — हर भाषा का content अलग):
 *   const { assembleWeek } = require("./kkb_assemble.js");
 *   assembleWeek({
 *     level: 2, weekNum: 9, langCode: "szl",
 *     contentFile: "./khep_szl_L2_week9.js",   // module.exports = {KEY_D1..KEY_D5}
 *     dayKeys: ["SZL_L2W9D1","SZL_L2W9D2","SZL_L2W9D3","SZL_L2W9D4","SZL_L2W9D5"],
 *     outFile: "./szl_L2week9_assembled.json",
 *     testGoalHi: "पूरी बातचीत ... में कीजिए — ...",  // सिर्फ़ day0 के पहले 6 वाक्य टेस्ट में जाते हैं
 *     titleFix: { "दिन-इंडेक्स-item-इंडेक्स": "सुधरा-हिंदी" }  // वैकल्पिक: भाषा-नाम सुधार
 *   });
 *
 * यह टूल ख़ुद-ब-ख़ुद:
 *  - मास्टर (fr) से day.title, item[2] (हिंदी), item[4] (level-tag, सिर्फ़ L2) उठाता है
 *  - content-फ़ाइल से item[0] (असली भाषा), item[1] (देवनागरी-उच्चारण) लेता है
 *  - हर दिन में वाक्य-गिनती मास्टर से मैच न होने पर रोक देता है (fail-loud)
 */
const fs = require("fs");
const path = require("path");
const ASSETS = path.join(__dirname, "..", "..", "assets");

function W(p) {
  const w = {};
  new Function("window", fs.readFileSync(p, "utf8"))(w);
  return w;
}

function assembleWeek({ level, weekNum, langCode, contentFile, dayKeys, outFile, testGoalHi, titleFix }) {
  if (![1, 2].includes(level)) throw new Error("level सिर्फ़ 1 या 2 हो सकता है");
  if (!dayKeys || dayKeys.length !== 5) throw new Error("dayKeys में ठीक 5 keys चाहिए (5 दिन)");

  const masterFile = level === 1 ? "kkb_fr_data.js" : "kkb2_fr_data.js";
  const masterKey = level === 1 ? "KKB_DATA" : "KKB2_DATA";
  const master = W(path.join(ASSETS, masterFile))[masterKey];
  const refWeek = master.weeks[weekNum - 1];
  if (!refWeek) throw new Error("मास्टर में week" + weekNum + " नहीं मिला");

  const contentAbs = path.isAbsolute(contentFile) ? contentFile : path.join(path.dirname(outFile), contentFile);
  const content = require(contentAbs);

  function mkDay(n, items, refDay) {
    if (items.length !== refDay.items.length) {
      throw new Error(
        `दिन ${n}: content में ${items.length} वाक्य पर मास्टर में ${refDay.items.length} — गिनती नहीं मिलती!`
      );
    }
    return {
      n,
      title: refDay.title,
      items: items.map((it, i) => {
        const base = [it[0], it[1], refDay.items[i][2]];
        if (level === 2) {
          base.push("S", refDay.items[i][4] || "B");
        } else {
          base.push("S");
        }
        return base;
      }),
    };
  }

  const days = dayKeys.map((k, di) => {
    if (!content[k]) throw new Error("content-फ़ाइल में key नहीं मिली: " + k);
    return mkDay(di + 1, content[k], refWeek.days[di]);
  });

  const week = {
    n: weekNum,
    title: refWeek.title,
    hi: refWeek.hi || refWeek.title,
    days,
  };

  if (level === 2) {
    week.test = {
      target: `अपने trainer या किसी ${langCode}-भाषी साथी को video call (ACS वाणी या WhatsApp से)`,
      goal: testGoalHi || "पूरी बातचीत कीजिए।",
      lines: days[0].items.slice(0, 6).map((it) => [it[0], it[1]]),
    };
  }

  // वैकल्पिक भाषा-नाम / अन्य सुधार: titleFix = {"dayIdx-itemIdx": "नया हिंदी टेक्स्ट"}
  if (titleFix) {
    Object.entries(titleFix).forEach(([key, newHi]) => {
      const [di, ii] = key.split("-").map(Number);
      if (!days[di] || !days[di].items[ii]) throw new Error("titleFix की जगह ग़लत: " + key);
      days[di].items[ii][2] = newHi;
    });
  }

  fs.writeFileSync(outFile, JSON.stringify(week, null, 1));
  const total = days.reduce((s, d) => s + d.items.length, 0);
  const missing = days.reduce((s, d) => s + d.items.filter((it) => !it[2]).length, 0);
  console.log(`✅ ${outFile} — वाक्य: ${total} | ख़ाली-हिंदी: ${missing}`);
  return week;
}

module.exports = { assembleWeek };

// CLI से सीधे टेस्ट करने के लिए (सिर्फ़ मास्टर दिखाएगा, content नहीं चाहिए)
if (require.main === module) {
  console.log("यह टूल require() से इस्तेमाल होता है, सीधे CLI से नहीं। देखें फ़ाइल के ऊपर का उदाहरण।");
}
