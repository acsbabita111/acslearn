#!/usr/bin/env node
/* ============================================================
   sudhar_ghar_kadi.js v1.0 (27-Nov-2026, खेप SEO-सफ़ाई v2) : कोर्स-घर की कड़ी साफ़ रूप में
   क्यों: 6 पुराने कोर्सों के 2,940 पाठ अपने कोर्स-घर को "index.html" लिखकर बुलाते थे
          (प्रिंटर, मशरूम, DCA, चार-पहिया, ई-कॉमर्स, AI डिजिटल मास्टर)। Google "…/index.html" और "…/" को
          दो पते गिनता है, और Search Console में "Alternate page with proper canonical" में दिखाता है।
   यह यंत्र सिर्फ़ उन जगहों को ठीक करता है, जिनका कोई generator दोबारा नहीं चलता:
     (1) data: assets/courses_data.js, assets/udyam_data.js के 5 कोर्स-पते; पहला-कोड के पाठ-217 की 2 कड़ियाँ।
     (2) पुरानी पीढ़ी के पन्ने (build_legacy_migrate.js से एक बार बने, स्रोत अब यही पन्ने हैं):
         प्रिंटर के 900 पाठ और कोर्स-घर; AI डिजिटल मास्टर के 150 पाठ और कोर्स-घर।
   बाक़ी चार कोर्स (DCA, ई-कॉमर्स, मशरूम, चार-पहिया) अपने generator से दोबारा बनते हैं; उनके generator में
   भी अब "./" लिखा है।
   यह सिर्फ़ कड़ी का पता बदलता है: href="index.html" → href="./" और href="../../index.html" → href="../../"।
   पाठ का एक अक्षर नहीं बदलता। दोबारा चलाना सुरक्षित है।
   चलाना: node generator/sudhar_ghar_kadi.js [--check]
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), CHECK = process.argv.includes("--check");
let changed = 0, left = 0; const names = [];
function fix(rel, pairs, must) {
  const f = path.join(ROOT, rel); let s = fs.readFileSync(f, "utf8"), n = 0;
  for (const [a, b] of pairs) { const k = s.split(a).length - 1; if (k) { n += k; s = s.split(a).join(b); } }
  if (must && !n && !pairs.some(([, b]) => s.indexOf(b) > -1)) throw new Error("न पुराना रूप मिला, न नया: " + rel);
  if (!n) return;
  left += n; names.push(rel);
  if (!CHECK) { fs.writeFileSync(f, s, "utf8"); changed++; }
}
/* (1) data */
const HOMES = ["/courses/hi/digital/ai-digital-master/", "/courses/hi/digital/dca/", "/courses/hi/vocational/printer/"];
const dq = HOMES.map((h) => ['"' + h + 'index.html"', '"' + h + '"']);
fix("assets/courses_data.js", dq, true);
fix("assets/udyam_data.js", dq, true);
fix("generator/data/pl0_lessons_data.js", HOMES.map((h) => ['href=\\"' + h + 'index.html\\"', 'href=\\"' + h + '\\"']), false);
/* (2) पुरानी पीढ़ी के पन्ने */
const LINKS = [['href="index.html"', 'href="./"'], ['href="../../index.html"', 'href="../../"']];
for (const [dir, pat] of [["courses/hi/vocational/printer", /^(L\d+|index)\.html$/], ["courses/hi/digital/ai-digital-master", /^(aidm-\d+-[a-z0-9\-]+|index)\.html$/]]) {
  const fl = fs.readdirSync(path.join(ROOT, dir)).filter((n) => pat.test(n)).sort();
  if (fl.length < 100) throw new Error("पन्ने कम मिले: " + dir + " (" + fl.length + ")");
  for (const n of fl) fix(dir + "/" + n, LINKS, false);
}
if (CHECK) {
  if (left) { console.log("❌ " + left + " कड़ियाँ अब भी index.html पर (" + names.length + " फ़ाइलें): " + names.slice(0, 4).join(", ") + " : चलाएँ node generator/sudhar_ghar_kadi.js"); process.exit(1); }
  console.log("🏁 sudhar_ghar_kadi : कोर्स-घर की हर कड़ी साफ़ रूप में");
} else console.log("✅ sudhar_ghar_kadi v1.0 : " + left + " कड़ियाँ बदलीं, " + changed + " फ़ाइलों में");
