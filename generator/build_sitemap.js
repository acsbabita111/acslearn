/* ============================================================
   build_sitemap.js v1.0 (परत-4) — sitemap.xml का generator
   स्रोत: assets/udyam_data.js की intro-कड़ियाँ + मुख्य सार्वजनिक पेज।
   चलाना: node generator/build_sitemap.js  → रूट पर sitemap.xml
   नियम: हाथ से sitemap कभी न लिखें — सिर्फ़ इसी से।
   (कोर्स-पाठ पेज बाद के दौर में जुड़ेंगे — अभी उद्यम+मुख्य पेज।)
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";

const main = [
  "/", "/mission/hi/", "/salah.html", "/udyam/", "/courses/hi/",
  "/join.html", "/verify/", "/network/hi/", "/vani/hi/", "/contact/hi/",
  "/aptitude-test.html", "/career-kit.html",
  "/refund.html", "/privacy.html", "/terms.html"
];

const data = fs.readFileSync(path.join(ROOT, "assets/udyam_data.js"), "utf8");
const intros = [...data.matchAll(/"intro": "(\/udyam\/[^"]+)"/g)].map(m => m[1]);

const today = new Date().toISOString().slice(0, 10);
const urls = [...main, ...intros];
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
