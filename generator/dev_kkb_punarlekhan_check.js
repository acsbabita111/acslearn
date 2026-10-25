/* dev_kkb_punarlekhan_check.js v1.0 · 25-Oct-2026 — नक़ल-भाषाओं के पुनर्लेखन का पहरा
   हर भाषा के पूरे हुए हिस्से (kkb_punarlekhan_pragati.json → done) पर:
   (1) स्रोत-भाषा से हूबहू वाक्य 15% से ज़्यादा नहीं (छोटे सार्वभौमिक वाक्य — "लا.", "صباح الخير" — छूट इसी सीमा में)
   (2) अरबी-प्रतियों में स्रोत-बोली के पहचान-शब्द शून्य (लेवांटाइन: بدي/شو/هلق/كتير/منيح/مش · मिस्री: عايز/إزاي/دلوقتي/ده/دي)
   (3) स्रोत-TSV generator/data/punarlekhan/<code>/ में मौजूद (समिति-जाँच योग्य)
   (4) प्रगति-गणना: कुल लक्ष्य-पाठ (वाक्य + शब्द + अभ्यास + परीक्षा + सुनो + संवाद) में कितना पूरा — छपाई। */
"use strict";
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const P = JSON.parse(fs.readFileSync(path.join(ROOT, "generator/data/kkb_punarlekhan_pragati.json"), "utf8"));
function load(f) { const w = {}; new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, "assets", f), "utf8") + ";")(w, w, {}); return w.KKB2_DATA || w.KKB_DATA; }
const n = t => String(t).normalize("NFC").toLowerCase().replace(/[\s.,!?;:"'()\-–—…।॥،؟]+/g, " ").trim();
const items = D => { const o = []; D.weeks.forEach(w => w.days.forEach(d => (d.items || []).forEach(x => o.push(x)))); return o; };
/* पूरा-शब्द मिलान (शब्द के भीतर नहीं — जैसे इराक़ी "أبدي" = मैं शुरू करूँ, लेवांटाइन "بدي" नहीं) */
const MARK = { apc: ["بدي", "بدك", "بدو", "شو", "هلق", "هلأ", "كتير", "منيح", "مش"], arz: ["عايز", "عاوز", "إزاي", "ازاي", "دلوقتي", "ده", "دي", "إيه"] };
const toks = t => String(t).split(/[\s.,!?;:"'()\-–—…،؟]+/).filter(Boolean);
function total(code) { const A = load("kkb_" + code + "_data.js"), B = load("kkb2_" + code + "_data.js"); let t = items(A).length + items(B).length;
  for (const D of [A, B]) D.weeks.forEach(w => { if (w.test && w.test.lines) t += w.test.lines.length; t += (w.listen || []).length + (w.dialog || []).length; (w.days || []).forEach(d => { t += (d.tw || []).length + ((d.drill && d.drill.rows) || []).length; }); });
  return t; }
let F = 0;
for (const c of P.order) { const L = P.langs[c], src = L.source, done = L.done || {}; let cnt = 0;
  for (const [lv, fk] of [["L1", "kkb_"], ["L2", "kkb2_"]]) { const ranges = done[lv + "_items"] || []; if (!ranges.length) continue;
    const a = items(load(fk + c + "_data.js")), b = items(load(fk + src + "_data.js")); let same = 0, tot = 0, mk = 0;
    for (const [s, e] of ranges) for (let i = s; i < e; i++) { tot++; if (n(a[i][0]) === n(b[i][0])) same++; const tk = toks(a[i][0]); for (const w of (MARK[src] || [])) if (tk.includes(w)) mk++; }
    cnt += tot; const r = same / tot;
    if (r > 0.15) { F++; console.log("❌ " + c + " " + lv + ": पूरे हिस्से में " + (r * 100).toFixed(1) + "% वाक्य अब भी " + src + " से हूबहू"); }
    if (mk) { F++; console.log("❌ " + c + " " + lv + ": स्रोत-बोली के पहचान-शब्द " + mk + " बार"); } }
  for (const [lv, fk] of [["L1", "kkb_"], ["L2", "kkb2_"]]) for (const wn of (done[lv + "_test_weeks"] || [])) { const W = load(fk + c + "_data.js").weeks[wn - 1]; cnt += (W && W.test && W.test.lines || []).length; }
  for (const wn of (done.L2_extra_weeks || [])) { const W = load("kkb2_" + c + "_data.js").weeks[wn - 1]; if (!W) continue; cnt += (W.listen || []).length + (W.dialog || []).length; (W.days || []).forEach(d => { cnt += (d.tw || []).length + ((d.drill && d.drill.rows) || []).length; }); }
  const dir = path.join(ROOT, "generator/data/punarlekhan", c); if (cnt && (!fs.existsSync(dir) || !fs.readdirSync(dir).some(f => f.endsWith(".tsv")))) { F++; console.log("❌ " + c + ": स्रोत-TSV नहीं"); }
  const T = total(c); console.log((cnt ? "✍️ " : "⏳ ") + c + " (← " + src + "): वाक्य पूरे " + cnt + " · कुल लक्ष्य-पाठ " + T + " · प्रगति " + (cnt / T * 100).toFixed(1) + "%"); }
console.log(F ? "\n❌ पुनर्लेखन-robot: " + F + " fail" : "🏁 पुनर्लेखन-robot: पूरे हिस्से साफ़ (स्रोत-नक़ल 15% से कम, स्रोत-बोली के शब्द शून्य)");
process.exit(F ? 1 : 0);
