/* ============================================================
   dev_msh_quiz_check.js — मशरूम अभ्यास-प्रश्न भंडार का check-robot
   v1.0 · 13-Aug-2026 · चलाना: node generator/dev_msh_quiz_check.js
   जाँचें (v5.2 लंबाई-पक्षपात सीख जन्म से):
   1) coverage: shard के दायरे का हर पाठ मौजूद, हर पाठ ठीक 5 प्रश्न
   2) हर प्रश्न: 4 विकल्प · सब विकल्प अलग-अलग · a = 0-3
   3) लंबाई-पक्षपात: "सही = अकेला-सबसे-लंबा" 15-35 प्रतिशत खिड़की में ही
   4) सही-उत्तर स्थान-बँटवारा: कोई एक स्थान 45 प्रतिशत से ज़्यादा नहीं
   5) मौलिकता: 6-शब्द खिड़की — एक जैसा प्रश्न-वाक्यांश दो जगह नहीं
   6) square-bracket निषेध · ख़ाली पाठ निषेध
   ============================================================ */
"use strict";
const path = require("path");
const fs = require("fs");

const PARTS = [[1,39],[40,73],[74,123],[124,177],[178,233],[234,293],[294,359],[360,413],[414,461],[462,493],[494,559],[560,627]];
let fails = 0, totalQ = 0, shards = 0;
function bad(msg){ console.log("  ❌ " + msg); fails++; }

for (let k = 1; k <= 12; k++) {
  const kk = String(k).padStart(2, "0");
  const f = path.join(__dirname, "..", "assets", "msh_quiz_k" + kk + ".js");
  if (!fs.existsSync(f)) continue; // जो खंड अभी बने ही नहीं — चुपचाप छोड़ो
  shards++;
  const bank = require(f).MSH_QUIZ;
  const [a, b] = PARTS[k - 1];
  console.log("— shard k" + kk + " (पाठ " + a + "-" + b + ") —");
  let longestCorrect = 0, qCount = 0;
  const posCount = [0, 0, 0, 0];
  const seen = {};
  for (let n = a; n <= b; n++) {
    const list = bank[String(n)];
    if (!list) { bad("पाठ-" + n + " ग़ायब"); continue; }
    if (list.length !== 5) bad("पाठ-" + n + " में " + list.length + " प्रश्न (5 चाहिए)");
    list.forEach((it, qi) => {
      qCount++;
      const tag = "पाठ-" + n + " प्र-" + (qi + 1);
      if (!it.q || !it.q.trim()) bad(tag + ": ख़ाली प्रश्न");
      if (!Array.isArray(it.o) || it.o.length !== 4) { bad(tag + ": 4 विकल्प नहीं"); return; }
      if (new Set(it.o.map(x => x.trim())).size !== 4) bad(tag + ": विकल्प दोहराए");
      if (typeof it.a !== "number" || it.a < 0 || it.a > 3) bad(tag + ": a ग़लत");
      const all = [it.q].concat(it.o).join(" ");
      if (/[\[\]]/.test(all)) bad(tag + ": square-bracket");
      posCount[it.a]++;
      const lens = it.o.map(x => x.length);
      const mx = Math.max.apply(null, lens);
      if (lens[it.a] === mx && lens.filter(l => l === mx).length === 1) longestCorrect++;
      /* 6-शब्द मौलिकता-खिड़की (प्रश्न-पाठ पर) */
      const words = it.q.replace(/[()?"',.—-]/g, " ").split(/\s+/).filter(Boolean);
      for (let w = 0; w + 6 <= words.length; w++) {
        const key = words.slice(w, w + 6).join(" ");
        if (seen[key] && seen[key] !== tag) bad(tag + ": 6-शब्द दोहराव ← " + seen[key] + " («" + key + "»)");
        else seen[key] = tag;
      }
    });
  }
  totalQ += qCount;
  const pct = qCount ? Math.round(longestCorrect * 100 / qCount) : 0;
  console.log("  प्रश्न: " + qCount + " | सही=अकेला-सबसे-लंबा: " + pct + "% (खिड़की 15-35)");
  if (pct < 15 || pct > 35) bad("लंबाई-पक्षपात खिड़की से बाहर: " + pct + "%");
  const mxPos = Math.max.apply(null, posCount);
  console.log("  सही-स्थान बँटवारा (क/ख/ग/घ): " + posCount.join("/"));
  if (qCount && mxPos * 100 / qCount > 45) bad("एक स्थान पर " + Math.round(mxPos * 100 / qCount) + "% सही-उत्तर (छत 45%)");
}
console.log("----");
console.log(shards ? ("shard: " + shards + " | कुल प्रश्न: " + totalQ + " | " + (fails ? "❌ " + fails + " दोष" : "🏁 सब जाँचें पास")) : "कोई shard नहीं मिला ❌");
process.exit(fails ? 1 : 0);
