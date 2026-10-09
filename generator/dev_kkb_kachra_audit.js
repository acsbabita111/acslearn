/* generator/dev_kkb_kachra_audit.js — v1.1 (09-Oct-2026: xClone → massShare≥10 — बोली-परिवार की जायज़ साझेदारी छूट, Addendum v7.0 पड़ाव-द का औज़ार)
   271-कचरा संसार का मशीन-नाप — हर भाषा पर 4 बीमारियाँ:
   (1) hiClone%  — item[0] में देवनागरी/हिंदी-घुसपैठ (ग़ैर-देव भाषाओं में)
   (2) xClone    — दूसरी भाषाओं से हूबहू नक़ल वाक्य (भाषाओं-के-बीच copy-paste)
   (3) dictBad%  — शब्दकोश में पहचान-नक़ल ("मेरा":"मेरा") व ख़ाली/हिंदी-अर्थ=शब्द
   (4) shallow   — शब्द-विविधता (अलग token / कुल token) — उथले-clone की गंध
   निकास: stdout सार + /tmp/kachra_queue.csv (severity घटते क्रम = द-क़तार मसौदा)
   चलाना: node generator/dev_kkb_kachra_audit.js  (repo-रूट से) */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = process.cwd();
const DEV = /[\u0900-\u097F]/;

function listCodes() {
  return fs.readdirSync(path.join(ROOT, "assets"))
    .map(f => { const m = f.match(/^kkb2_([a-z]+)_data\.js$/); return m && m[1]; })
    .filter(Boolean);
}
function load(f, k) { const w = {}; try { new Function("window", "self", "module", fs.readFileSync(path.join(ROOT, f), "utf8") + ";")(w, w, {}); } catch (e) { return null; } return w[k]; }
function items(D) { const a = []; if (D && D.weeks) D.weeks.forEach(w => w.days.forEach(d => (d.items || []).forEach(it => a.push(it)))); return a; }

const codes = listCodes();
const hiMaster = new Set(items(load("assets/kkb2_data.js", "KKB2_DATA")).map(it => it[2]));
/* देव-भाषा सूची robot से (एकमात्र घर) */
const robotSrc = fs.readFileSync(path.join(ROOT, "generator/dev_kkb2_check.js"), "utf8");
const devBlock = robotSrc.match(/var DEVLANG = \{([\s\S]*?)\};/);
const DEVLANG = new Set([...devBlock[1].matchAll(/([a-z]+): 1/g)].map(m => m[1]));

/* पहला पास: वाक्य-छाप (भाषाओं-के-बीच नक़ल पकड़ने) */
const sentOwner = new Map(); const sentCount = new Map(); /* v1.1: किस वाक्य को कितनी भाषाएँ */
const perLang = {};
codes.forEach(c => {
  const D = load("assets/kkb2_" + c + "_data.js", "KKB2_DATA"); if (!D) return;
  const its = items(D); perLang[c] = { its };
  its.forEach(it => { const s = it[0]; if (s && s.length > 12) { if (!sentOwner.has(s)) sentOwner.set(s, c); sentCount.set(s, (sentCount.get(s) || 0) + 1); } });
});
/* दूसरा पास: नाप */
const rows = [];
codes.forEach(c => {
  const P = perLang[c]; if (!P) return;
  const its = P.its, n = its.length || 1;
  let hiClone = 0, xClone = 0, toks = 0, uniq = new Set();
  its.forEach(it => {
    const s = String(it[0] || "");
    if (!DEVLANG.has(c) && (DEV.test(s) || hiMaster.has(s))) hiClone++;
    if (s.length > 12 && (sentCount.get(s) || 0) >= 10) xClone++; /* v1.1 massShare: ≥10 भाषाओं में हूबहू */
    s.split(/\s+/).forEach(t => { if (t) { toks++; uniq.add(t.toLowerCase()); } });
  });
  /* शब्दकोश */
  let dictBad = -1;
  const dp = path.join(ROOT, "generator/data/lipi", c + "_shabdkosh.js");
  if (fs.existsSync(dp)) {
    const t = fs.readFileSync(dp, "utf8");
    const pairs = [...t.matchAll(/"([^"]+)"\s*:\s*"([^"]*)"/g)];
    if (pairs.length) {
      let bad = 0;
      pairs.forEach(m => { const k = m[1], v = m[2]; if (!v || k === v || (!DEVLANG.has(c) && !DEV.test(k) === false && DEV.test(k) && DEV.test(v) && k !== v ? false : k === v)) bad += (k === v || !v) ? 1 : 0; if (!DEVLANG.has(c) && DEV.test(k)) bad++; });
      dictBad = Math.min(100, Math.round(100 * bad / pairs.length));
    }
  }
  const shallow = Math.round(100 * uniq.size / (toks || 1)); /* कम% = ज़्यादा दोहराव */
  const hiP = Math.round(100 * hiClone / n), xP = Math.round(100 * xClone / n);
  const sev = hiP * 3 + xP * 2 + (dictBad > 0 ? dictBad : 0) + (shallow < 18 ? (18 - shallow) * 2 : 0);
  rows.push({ c, n, hiP, xP, dictBad, shallow, sev });
});
rows.sort((a, b) => b.sev - a.sev);
const sick = rows.filter(r => r.sev > 0);
console.log("भाषाएँ नापीं:", rows.length, "| बीमार (sev>0):", sick.length);
console.log("कोड  वाक्य hiClone% massShare%dict-bad% शब्द-विविधता% severity");
sick.slice(0, 20).forEach(r => console.log(r.c.padEnd(5), String(r.n).padEnd(5), String(r.hiP).padEnd(8), String(r.xP).padEnd(7), String(r.dictBad).padEnd(9), String(r.shallow).padEnd(13), r.sev));
const csv = ["code,sentences,hiClone_pct,xClone_pct,dictBad_pct,tokenDiversity_pct,severity"]
  .concat(rows.map(r => [r.c, r.n, r.hiP, r.xP, r.dictBad, r.shallow, r.sev].join(","))).join("\n");
fs.writeFileSync("/tmp/kachra_queue.csv", csv);
console.log("क़तार-CSV: /tmp/kachra_queue.csv (severity घटते क्रम)");
console.log("🏁 dev_kkb_kachra_audit v1.0");
