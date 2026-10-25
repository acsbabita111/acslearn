/* dev_bhasha_naam_check.js v1.0 · 25-Oct-2026 — भाषा-नाम robot (Founder-नियम: भाषा-सूची ताज़ा मास्टर-स्प्रेडशीट से)
   एकमात्र सच: generator/data/bhasha_register.json (स्प्रेडशीट "भाषा-रजिस्टर" की मशीन-निकासी)।
   जाँचें: (1) build_specials की KKB2_LANGS-सूची के नाम = रजिस्टर (regex से पढ़ने वाले generator भी सही नाम पाएँ)
           (2) कोर्स-सूची (assets/courses_data.js) में हर भाषा-कोर्स का name_hi रजिस्टर-नाम से शुरू
           (3) परीक्षा-सूची (assets/exam_data.js) के भाषा-कोर्स नाम भी वही
           (4) हर भाषा का वर्कबुक-पन्ना (h1) रजिस्टर-नाम से
   चलाना: node generator/dev_bhasha_naam_check.js → 🏁 */
"use strict";
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const REG = JSON.parse(fs.readFileSync(path.join(ROOT, "generator/data/bhasha_register.json"), "utf8")).langs;
let F = 0; const bad = (m) => { F++; console.log("❌ " + m); };
const BS = fs.readFileSync(path.join(ROOT, "generator/build_specials.js"), "utf8");
const L = [...BS.matchAll(/\{\s*code:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*en_name:\s*"([^"]*)",\s*hi_name:\s*"([^"]*)"/g)].map(m => ({ code: m[1], slug: m[2], en: m[3], hi: m[4] }));
const slug2 = {}; L.forEach(x => slug2[x.slug] = x);
for (const x of L) {
  const r = REG[x.code];
  if (!r) { bad("सूची: कोड रजिस्टर में नहीं — " + x.code); continue; }
  if (x.hi !== r.hi) bad("सूची: " + x.code + " हिंदी-नाम '" + x.hi + "' ≠ रजिस्टर '" + r.hi + "'");
  if (x.en !== r.en) bad("सूची: " + x.code + " English-नाम '" + x.en + "' ≠ रजिस्टर '" + r.en + "'");
}
/* courses_data.js में सूचियाँ const हैं (window पर नहीं) — सब सूचियाँ एक साथ निकालो */
const CSRC = fs.readFileSync(path.join(ROOT, "assets/courses_data.js"), "utf8");
const CNAMES = [...CSRC.matchAll(/^const\s+([A-Z_]+_COURSES)\s*=/gm)].map(m => m[1]);
const CD = [].concat(...Object.values(new Function("window", "self", "module", CSRC + ";\nreturn {" + CNAMES.join(",") + "};")({}, {}, {})).filter(Array.isArray));
const id2code = {}; let nC = 0;
for (const c of CD) {
  const m = String(c.url || "").match(/^\/courses\/hi\/bhasha\/([^\/]+)\/$/); if (!m || !slug2[m[1]]) continue;
  const code = slug2[m[1]].code, r = REG[code]; id2code[c.id] = code; nC++;
  if (!String(c.name_hi || "").startsWith(r.hi + " ")) bad("कोर्स-सूची " + c.id + " (" + code + "): '" + String(c.name_hi).slice(0, 40) + "…' — रजिस्टर-नाम '" + r.hi + "' से शुरू नहीं");
}
const EX = fs.readFileSync(path.join(ROOT, "assets/exam_data.js"), "utf8"); let nE = 0;
for (const m of EX.matchAll(/"(PJ\d+)":\s*\{\s*name:\s*"([^"]*)"/g)) {
  const code = id2code[m[1]]; if (!code) continue; nE++;
  if (!m[2].startsWith(REG[code].hi + " ")) bad("परीक्षा-सूची " + m[1] + " (" + code + "): '" + m[2].slice(0, 40) + "…' — रजिस्टर-नाम से शुरू नहीं");
}
let nW = 0;
for (const x of L) {
  const f = path.join(ROOT, "courses/hi/bhasha", x.slug, "workbook/index.html"); if (!fs.existsSync(f) || !REG[x.code]) continue; nW++;
  const h1 = (fs.readFileSync(f, "utf8").match(/<h1[^>]*>([^<]*)</) || [])[1] || "";
  if (!h1.startsWith(REG[x.code].hi + " ")) bad("वर्कबुक " + x.slug + ": h1 '" + h1.slice(0, 40) + "' — रजिस्टर-नाम '" + REG[x.code].hi + "' से शुरू नहीं");
}
console.log("सूची " + L.length + " · कोर्स-सूची " + nC + " · परीक्षा-सूची " + nE + " · वर्कबुक " + nW + " — रजिस्टर: " + Object.keys(REG).length + " भाषा");
if (!L.length || !nC) { console.log("❌ कुछ पढ़ा ही नहीं गया"); process.exit(1); }
console.log(F ? "\n❌ भाषा-नाम robot: " + F + " fail" : "🏁 भाषा-नाम robot: सब पास");
process.exit(F ? 1 : 0);
