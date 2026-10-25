/* dev_kkb_nakal_check.js v1.1 · 25-Oct-2026 (v1.1: हर ज्ञात नक़ल-जोड़ी पर पेज-सूचना अनिवार्य) — नक़ल-robot: कौन-सा भाषा-कोर्स किसकी हूबहू प्रति है
   विधि: हर भाषा के 2,150 वाक्य (स्तर-1 + स्तर-2) स्थान-दर-स्थान; हर जोड़ी में हूबहू-एक वाक्यों का प्रतिशत
   (विराम-चिह्न व बड़े-छोटे अक्षर छोड़कर)। सीमा: 90% (generator/data/kkb_nakal_karz.json → threshold)।
   क़र्ज़-सूची के बाहर नई 90%+ जोड़ी = FAIL (नई भाषा किसी की नक़ल से न बने); सूची में पर अब 90% से नीचे = "हटाइए"।
   चलाना: node generator/dev_kkb_nakal_check.js   (~15 सेकंड) */
"use strict";
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const K = JSON.parse(fs.readFileSync(path.join(ROOT, "generator/data/kkb_nakal_karz.json"), "utf8"));
const TH = K.threshold || 0.9, key = (a, b) => [a, b].sort().join("="), KNOWN = new Set(K.pairs.map(p => key(p[0], p[1]))), TWIN = new Set(K.twin.map(p => key(p[0], p[1])));
const BS = fs.readFileSync(path.join(ROOT, "generator/build_specials.js"), "utf8");
const L = [...BS.matchAll(/\{\s*code:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g)].map(m => m[1]);
function load(f) { const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) return null; const w = {}; try { new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {}); } catch (e) { return null; } return w.KKB2_DATA || w.KKB_DATA; }
const PUN = /[\s.,!?;:"'()\[\]\-–—…«»¿¡।॥،؟、。，！？「」“”‘’·]+/g;
const norm = t => String(t).normalize("NFC").toLowerCase().replace(PUN, " ").trim();
const T = {};
for (const c of L) {
  const A = load(c === "en" ? "kkb_data.js" : "kkb_" + c + "_data.js"), B = load(c === "en" ? "kkb2_data.js" : "kkb2_" + c + "_data.js"); if (!B) continue;
  const t = []; for (const D of [A, B]) if (D && D.weeks) D.weeks.forEach(wk => wk.days.forEach(d => (d.items || []).forEach(it => t.push(norm(it[0])))));
  T[c] = t;
}
const codes = Object.keys(T), maxLen = Math.max(...codes.map(c => T[c].length)), pair = new Map();
for (let p = 0; p < maxLen; p++) {
  const b = new Map();
  for (const c of codes) { const s = T[c][p]; if (!s) continue; if (!b.has(s)) b.set(s, []); b.get(s).push(c); }
  for (const cs of b.values()) if (cs.length > 1) for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) { const k = key(cs[i], cs[j]); pair.set(k, (pair.get(k) || 0) + 1); }
}
let F = 0, known = 0; const seen = new Set();
for (const [k, n] of pair) {
  const [a, b] = k.split("="), r = n / Math.min(T[a].length, T[b].length);
  if (r < TH) continue; seen.add(k);
  if (TWIN.has(k)) continue;
  if (KNOWN.has(k)) { known++; continue; }
  F++; console.log("❌ नई नक़ल: " + a + " = " + b + " — " + (r * 100).toFixed(1) + "% वाक्य हूबहू");
}
/* 25-Oct: हर ज्ञात नक़ल-जोड़ी पर पेज-सूचना हो — या तो एक भाषा पर "copy" पट्टी (दूसरी उसका स्रोत), या दोनों पर "सच्ची सूचना" (translit-झंडा) */
const NOTES = require(path.join(ROOT, "generator/data/kkb_nakal_soochna.js")).notes, HOLD = new Set(require(path.join(ROOT, "generator/data/translit_hold_flags.js")).flags);
const SLUG = {}; [...BS.matchAll(/\{\s*code:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g)].forEach(m => SLUG[m[1]] = m[2]);
const hasNote = c => NOTES[c] || HOLD.has(c);
for (const k of KNOWN) { const [a, b] = k.split("="); const covered = (NOTES[a] && NOTES[a].of === b) || (NOTES[b] && NOTES[b].of === a) || (HOLD.has(a) && HOLD.has(b)) || (hasNote(a) && hasNote(b));
  if (!covered) { F++; console.log("❌ नक़ल-जोड़ी " + k + " पर पेज-सूचना नहीं (kkb_nakal_soochna.js या translit_hold_flags.js में जोड़ें)"); } }
for (const c of Object.keys(NOTES)) { const f = path.join(ROOT, "courses/hi/bhasha", SLUG[c] || "?", "index.html");
  if (!fs.existsSync(f) || fs.readFileSync(f, "utf8").indexOf('class="kkb-nakal-note"') < 0) { F++; console.log("❌ " + c + ": कोर्स-पेज पर नक़ल-सूचना पट्टी नहीं"); } }
const fixed = [...KNOWN].filter(k => !seen.has(k));
console.log("भाषाएँ " + codes.length + " · जोड़ियाँ जाँचीं " + (codes.length * (codes.length - 1) / 2) + " · नक़ल-क़र्ज़ बाक़ी " + known + " जोड़ी · जुड़वाँ " + TWIN.size);
if (fixed.length) console.log("⚠️ अब 90% से नीचे (सुधर गई — सूची से हटाइए): " + fixed.join(", "));
console.log(F ? "\n❌ नक़ल-robot: " + F + " fail" : "🏁 नक़ल-robot: कोई नई नक़ल नहीं · हर ज्ञात नक़ल पर पेज-सूचना लगी (पुराना क़र्ज़ ऊपर गिना)");
process.exit(F ? 1 : 0);
