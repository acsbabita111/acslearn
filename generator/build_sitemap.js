/* ============================================================
   build_sitemap.js v1.0 (परत-4) — sitemap.xml का generator
   v1.1 — स्रोत: (1) assets/udyam_data.js की intro-कड़ियाँ (2) मुख्य सार्वजनिक
   पेज (3) courses/ के सिर्फ़ नई-प्रणाली पेज — पहचान: पेज /assets/acs-universal.js
   बुलाता हो (विकल्प-ब, Founder 27-Jul: legacy 1500+ पाठ migration के बाद जुड़ेंगे,
   ताकि Google को पहली छाप सुधरे रूप की मिले)।
   चलाना: node generator/build_sitemap.js  → रूट पर sitemap.xml
   नियम: हाथ से sitemap कभी न लिखें — सिर्फ़ इसी से।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";

/* हर पता live-सत्यापित (27-Jul) — नया पता जोड़ने से पहले 200-जाँच अनिवार्य */
const main = [
  "/", "/hi/mission.html", "/hi/salah.html", "/udyam/", "/courses/hi/",
  "/join.html", "/verify/", "/hi/network.html", "/vani/", "/contact/hi/",
  "/aptitude-test.html", "/career-kit.html", "/registration-guide.html",
  "/refund.html", "/privacy.html", "/terms.html"
];

const data = fs.readFileSync(path.join(ROOT, "assets/udyam_data.js"), "utf8");
const intros = [...data.matchAll(/"intro": "(\/udyam\/[^"]+)"/g)].map(m => m[1]);

/* courses/ — सिर्फ़ नई-प्रणाली (universal) पेज */
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}
const coursePages = walk(path.join(ROOT, "courses"), [])
  .filter(p => fs.readFileSync(p, "utf8").includes("/assets/acs-universal.js"))
  .map(p => "/" + path.relative(ROOT, p).split(path.sep).join("/"))
  .filter(u => u !== "/courses/hi/index.html") /* main-सूची में पहले से */
  .sort();
console.log("नई-प्रणाली कोर्स-पेज:", coursePages.length);

const today = new Date().toISOString().slice(0, 10);
const urls = [...main, ...intros, ...coursePages];
const seen = new Set();
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const u of urls) {
  if (seen.has(u)) continue; seen.add(u);
  xml += "  <url><loc>" + BASE + u + "</loc><lastmod>" + today + "</lastmod></url>\n";
}
xml += "</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log("✅ sitemap.xml —", seen.size, "URL");
