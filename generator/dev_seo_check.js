/* ============================================================
   dev_seo_check.js v1.0 — SEO-जीविता robot (SEO-सुधार दौर, 04-Oct-2026)
   जाँचें:
   1) hreflang-लक्ष्य जीविता: हर *.html के हर hreflang-href का पथ repo में
      असली फ़ाइल हो (…/ → index.html) — मरे पते पर hreflang = मरी कड़ी (निषिद्ध)।
   2) sitemap-अखंडता: रूट sitemap.xml = sitemapindex; हर खंड-फ़ाइल मौजूद;
      हर <loc> की फ़ाइल repo में जीवित; खंडों के बीच दोहराव = 0।
   3) robots.txt में Sitemap-पंक्ति।
   चलाना: node generator/dev_seo_check.js   → सब पास तो 🏁
   नियम: sitemap/hreflang छूने वाले हर दौर में upload से पहले 🏁 अनिवार्य।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
let fails = 0;
function FAIL(msg) { fails++; console.log("❌ " + msg); }

function urlPathToFile(u) {
  let p = u.replace(/^https:\/\/acslearn\.com/, "");
  if (p === "" || p === "/") p = "/index.html";
  if (p.endsWith("/")) p += "index.html";
  return path.join(ROOT, p.replace(/^\//, ""));
}

/* ---- जाँच-1: hreflang-लक्ष्य ---- */
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    if (f === ".git" || f === "node_modules") continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}
const htmls = walk(ROOT, []);
let hrefTotal = 0, hrefPages = 0;
for (const f of htmls) {
  const s = fs.readFileSync(f, "utf8");
  const ms = [...s.matchAll(/<link[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/g)];
  if (!ms.length) continue;
  hrefPages++;
  for (const m of ms) {
    hrefTotal++;
    const tgt = m[2];
    if (!/^https:\/\/acslearn\.com/.test(tgt)) { FAIL("बाहरी/सापेक्ष hreflang: " + tgt + " ← " + path.relative(ROOT, f)); continue; }
    if (!fs.existsSync(urlPathToFile(tgt)))
      FAIL("मरा hreflang-लक्ष्य: " + tgt + " ← " + path.relative(ROOT, f));
  }
}
console.log("जाँच-1 hreflang: " + hrefPages + " पेज, " + hrefTotal + " कड़ियाँ जाँचीं");

/* ---- जाँच-2: sitemap-अखंडता ---- */
const idx = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
if (!idx.includes("<sitemapindex")) FAIL("sitemap.xml sitemapindex नहीं है");
const kids = [...idx.matchAll(/<loc>https:\/\/acslearn\.com\/(sitemap-[a-z]+\.xml)<\/loc>/g)].map(m => m[1]);
if (kids.length < 2) FAIL("sitemapindex में खंड-फ़ाइलें नहीं मिलीं");
const seen = new Map(); let urlTotal = 0, deadLoc = 0;
for (const k of kids) {
  const kp = path.join(ROOT, k);
  if (!fs.existsSync(kp)) { FAIL("खंड-फ़ाइल ग़ायब: " + k); continue; }
  const xs = fs.readFileSync(kp, "utf8");
  const locs = [...xs.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const u of locs) {
    urlTotal++;
    if (seen.has(u)) FAIL("खंडों में दोहराव: " + u + " (" + seen.get(u) + " + " + k + ")");
    seen.set(u, k);
    if (!fs.existsSync(urlPathToFile(u))) { deadLoc++; if (deadLoc <= 10) FAIL("sitemap में मरा URL: " + u); }
  }
  console.log("  " + k + " — " + locs.length + " URL");
}
if (deadLoc > 10) FAIL("…कुल मरे sitemap-URL: " + deadLoc);
console.log("जाँच-2 sitemap: " + kids.length + " खंड, कुल " + urlTotal + " URL");

/* ---- जाँच-3: robots.txt ---- */
const rb = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (!rb.includes("Sitemap: https://acslearn.com/sitemap.xml")) FAIL("robots.txt में Sitemap-पंक्ति नहीं");
console.log("जाँच-3 robots.txt: Sitemap-पंक्ति ✅");

if (fails) { console.log("\n❌ कुल विफल: " + fails + " — upload निषिद्ध"); process.exit(1); }
console.log("\n🏁 dev_seo_check — तीनों जाँचें पास");
