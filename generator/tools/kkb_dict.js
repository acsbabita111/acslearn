#!/usr/bin/env node
/**
 * kkb_dict.js — किसी week-JSON से अद्वितीय शब्द निकालना, और शब्दकोश-सत्यापन
 *
 * इस्तेमाल (require करके):
 *   const { extractWords, verifyDict, mergeDicts } = require("./kkb_dict.js");
 *
 *   // 1. week-JSON से शब्द-सूची निकालना (अर्थ ख़ुद लिखने के लिए)
 *   const words = extractWords("./szl_L2week9_assembled.json");
 *   console.log(words.join("\n"));
 *
 *   // 2. अपना लिखा हुआ dict (JS ऑब्जेक्ट) सत्यापित करना
 *   const missing = verifyDict(words, { "jaki": "कौन-सा", ... });
 *   console.log("छूटे:", missing);
 *
 *   // 3. कई हफ़्तों के dict-JSON फ़ाइलों को एक में मिलाना (फ़ाइनल शब्दकोश के लिए)
 *   mergeDicts(["/tmp/w1.json","/tmp/w2.json",...], "./final_shabdkosh.js", "SZL_SHABDKOSH");
 */
const fs = require("fs");

function clean(s) {
  return s.replace(/[.,?!"'।;:()_]/g, "").trim();
}

function extractWords(weekJsonPath) {
  const w = JSON.parse(fs.readFileSync(weekJsonPath, "utf8"));
  const words = new Set();
  w.days.forEach((d) =>
    d.items.forEach((it) => {
      clean(it[0])
        .split(/\s+/)
        .filter(Boolean)
        .forEach((x) => words.add(x.toLowerCase()));
    })
  );
  return [...words].sort();
}

function verifyDict(words, dictObj) {
  return words.filter((w) => !(w in dictObj));
}

function mergeDicts(jsonPaths, outFile, varName) {
  const merged = {};
  jsonPaths.forEach((p) => Object.assign(merged, JSON.parse(fs.readFileSync(p, "utf8"))));
  const header = `/* ${varName.toLowerCase()}.js (स्वतः-मर्ज) · कोर्स के शब्दों के हिंदी अर्थ (परत-3) */\nconst ${varName} = `;
  fs.writeFileSync(outFile, header + JSON.stringify(merged, null, 1) + `;\nif (typeof module !== "undefined") module.exports = ${varName};\n`);
  console.log(`✅ ${outFile} — ${Object.keys(merged).length} शब्द मर्ज हुए`);
  return merged;
}

module.exports = { extractWords, verifyDict, mergeDicts, clean };

if (require.main === module) {
  const cmd = process.argv[2];
  if (cmd === "extract") {
    const words = extractWords(process.argv[3]);
    console.log("कुल अद्वितीय शब्द:", words.length);
    console.log(words.join("\n"));
  } else {
    console.log("इस्तेमाल: node kkb_dict.js extract <weekJsonPath>");
    console.log("(verifyDict/mergeDicts को require() से कोड में इस्तेमाल करें)");
  }
}
