/* dev_kkb_naam_vakya_check.js v1.0 · 25-Oct-2026 — "अंग्रेज़ी"-दोष robot (मास्टर-दर्पण का छूटा पहरा)
   नियम: English मास्टर के जिन 22 वाक्यों के हिंदी-अर्थ में "अंग्रेज़ी" है, हर भाषा-कोर्स में वहाँ उसी भाषा का नाम हो —
   लक्ष्य-वाक्य (असली लिपि) और देवनागरी उच्चारण में "English" का कोई रूप नहीं (इंग्लिश/इंगिलीज़ी/आंग्ल/англ/إنجليز/英语… 40+ रूप)।
   क़र्ज़-सूची: generator/data/kkb_angrezi_karz.json — जिनका सुधार बाक़ी है। सूची से बाहर की भाषा में दोष = FAIL (पीछे फिसलना रोक);
   सूची में पर दोष-रहित = "सूची से हटाओ" चेतावनी। चलाना: node generator/dev_kkb_naam_vakya_check.js [code…] */
"use strict";
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const KARZ = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "generator/data/kkb_angrezi_karz.json"), "utf8")).codes);
const BS = fs.readFileSync(path.join(ROOT, "generator/build_specials.js"), "utf8");
let L = [...BS.matchAll(/\{\s*code:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g)].map(m => m[1]).filter(c => c !== "en");
const ONLY = process.argv.slice(2); if (ONLY.length) L = L.filter(c => ONLY.includes(c));
function load(f) { const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) return null; const w = {}; try { new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {}); } catch (e) { return null; } return w.KKB2_DATA || w.KKB_DATA; }
function items(D) { const o = []; if (D && D.weeks) D.weeks.forEach(wk => wk.days.forEach(d => (d.items || []).forEach(it => o.push(it)))); return o; }
const M1 = items(load("kkb_data.js")), M2 = items(load("kkb2_data.js")), P1 = [], P2 = [];
M1.forEach((it, i) => { if (/अंग्रेज़ी/.test(it[2])) P1.push(i); }); M2.forEach((it, i) => { if (/अंग्रेज़ी/.test(it[2])) P2.push(i); });
const MARK = /इंग्ल|इंगिल|इंगल|इंग्ले|एंग्ल|एंगल|अंग्रेज़|अंग्रेज|आंग्ल|आंग्ले|आन्ग्ल|इंग्रज|इंगलि|इंग्लि|अंग्लै|अंग्लि|अंगले|अङ्ल|एङ्ल|इन्ग्ल|इंगेलि|इंगेली|इन्गि|इंग्गि|इंजिल|इंज्ल|इन्जिल|इङ्ग्ल|इंग्ग्ल|एइगो|यिंग्यु|यिंग्यू|योंगओ|योंग्-ओ|ingl|engl|angl|İngil|Ingil|anglai|英语|英語|英文|영어|えいご|エイゴ|إنجليز|انگلیس|انجليز|англ|Англ|ئىنگلىز|ingilis/i;
let F = 0, debt = 0, debtS = 0, stale = [];
for (const c of L) {
  const A = items(load("kkb_" + c + "_data.js")), Bq = items(load("kkb2_" + c + "_data.js")); let bad = 0;
  for (const [arr, pos] of [[A, P1], [Bq, P2]]) for (const i of pos) { const it = arr[i]; if (it && (MARK.test(String(it[0])) || MARK.test(String(it[1])))) bad++; }
  if (bad && !KARZ.has(c)) { F++; console.log("❌ " + c + ": " + bad + " वाक्य में अब भी English (क़र्ज़-सूची से बाहर — पीछे फिसला)"); }
  else if (bad) { debt++; debtS += bad; }
  else if (KARZ.has(c)) stale.push(c);
}
console.log("मास्टर-जगहें " + (P1.length + P2.length) + " · भाषाएँ " + L.length + " · क़र्ज़ बाक़ी: " + debt + " भाषा / " + debtS + " वाक्य");
if (stale.length) console.log("⚠️ दोष-रहित पर क़र्ज़-सूची में (हटाइए): " + stale.join(", "));
console.log(F ? "\n❌ अंग्रेज़ी-दोष robot: " + F + " fail" : "🏁 अंग्रेज़ी-दोष robot: कोई नया दोष नहीं (क़र्ज़ ऊपर गिना)");
process.exit(F ? 1 : 0);
