/* काम-खेमा-द — शब्दकोश-पुनर्निर्माण v1.0 (14-Oct-2026)
   स्रोत: नई kkb/kkb2 फ़ाइलों की वाक्य-जोड़ियाँ ([0] बोली ↔ [2] हिंदी) —
   शब्द-गिनती बराबर हो तो 1:1 सीध से अर्थ; बहु-अर्थ पर सर्वाधिक-बार वाला; tw सीधे।
   निकास: generator/data/lipi/<code>_shabdkosh.js (पुराना कचरा-कोश प्रतिस्थापित)।
   चलाना: node build_shabdkosh_kd.js <repo-root> <code...> */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = process.argv[2]; const CODES = process.argv.slice(3);
const PUNCT = /[।?!,.;:"'()\[\]—–\-…]/g;
function words(s) { return String(s).replace(PUNCT, " ").split(/\s+/).filter(w => w && w !== "___"); }
function loadWin(f) { const w = {}; new Function("window", fs.readFileSync(path.join(ROOT, f), "utf8"))(w); return w; }

CODES.forEach(code => {
  const L1 = loadWin("assets/kkb_" + code + "_data.js").KKB_DATA;
  const L2 = loadWin("assets/kkb2_" + code + "_data.js").KKB2_DATA;
  const votes = {};          /* शब्द → {अर्थ: गिनती} */
  const order = [];          /* पहली-बार क्रम */
  function vote(w, m) { if (!votes[w]) { votes[w] = {}; order.push(w); } votes[w][m] = (votes[w][m] || 0) + 1; }
  function pair(d, h) {
    const A = words(d), B = words(h);
    if (A.length !== B.length) return;
    for (let i = 0; i < A.length; i++) vote(A[i], B[i]);
  }
  /* tw = पक्का अर्थ (भारी वोट) */
  L2.weeks.forEach(w => w.days.forEach(d => (d.tw || []).forEach(t => { for (let k = 0; k < 5; k++) vote(String(t[0]).trim(), String(t[2]).trim()); })));
  [L1, L2].forEach(X => X.weeks.forEach(w => {
    w.days.forEach(d => d.items.forEach(it => pair(it[0], it[2])));
    (w.test && w.test.lines || []).forEach(l => { });   /* test की हिंदी नहीं — छोड़ो */
  }));
  const label = L1.lang.label;
  let out = "/* " + label + " (" + code + ") शब्दकोश v2.0 ("+(process.env.KD_DATE||"14-Oct-2026")+", "+(process.env.KD_LABEL||"काम-खेमा-द")+") — नए पूर्ण-पुनर्लेखन content की\n   वाक्य-जोड़ी शब्द-सीध से (deterministic); गिनती मशीन से देखें (dev_kkb_kachra_audit) */\n";
  const VAR = code.toUpperCase() + "_SHABDKOSH";
  out += "const " + VAR + "={\n";
  let n = 0;
  order.forEach(w => {
    const best = Object.entries(votes[w]).sort((a, b) => b[1] - a[1])[0][0];
    if (best === w || !best) return;            /* sealed-convention: पहचान-जोड़े कोश में नहीं (kachra dictBad=0) */
    out += JSON.stringify(w) + ":" + JSON.stringify(best) + ",\n"; n++;
  });
  out += "};\nif(typeof module!==\"undefined\")module.exports=" + VAR + ";\n";
  fs.writeFileSync(path.join(ROOT, "generator/data/lipi", code + "_shabdkosh.js"), out);
  console.log(code + " (" + label + "): " + n + " शब्द ✓");
});
