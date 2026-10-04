/* ============================================================
   build_sitemap.js v2.0 (परत-4) — sitemap-index + 4 खंड-sitemap
   v1.1 — स्रोत: (1) assets/udyam_data.js की intro-कड़ियाँ (2) मुख्य सार्वजनिक
   पेज (3) courses/ के सिर्फ़ नई-प्रणाली पेज (पहचान: /assets/acs-universal.js)।
   v2.0 (SEO-सुधार दौर, 04-Oct-2026):
   (क) रूट sitemap.xml अब sitemapindex — 4 खंड-फ़ाइलों की सूची:
       sitemap-core.xml (मुख्य+rules) · sitemap-udyam.xml (950 परिचय) ·
       sitemap-bhasha.xml (भाषा-कोर्स) · sitemap-hunar.xml (बाक़ी कोर्स+legacy-द्वार)।
       लाभ: Search Console में खंड-दर-खंड indexing दिखेगी।
   (ख) per-URL lastmod डिफ़ॉल्ट में नहीं (13-Sep फ़ैसला यथावत: झूठी तारीख़ निषिद्ध)।
       वैकल्पिक सच्चा रास्ता: node generator/build_sitemap.js --git
       → हर फ़ाइल की असली आख़िरी-commit तारीख़ git-history से।
       शर्त (office git-clone): एक बार  git fetch --unshallow  चलाकर पूरा
       इतिहास लाएँ; बिना इतिहास --git अपने-आप बिना-lastmod गिरता है (झूठ कभी नहीं)।
   (ग) sitemapindex की <lastmod> = इसी build की तारीख़ (sitemap-फ़ाइल की अपनी
       बदलाव-तारीख़ — यह सच है, URL-तारीख़ नहीं)।
   चलाना: node generator/build_sitemap.js [--git]  → रूट पर 5 फ़ाइलें
   नियम: हाथ से sitemap कभी न लिखें — सिर्फ़ इसी से। जाँच: dev_seo_check.js।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";
const USE_GIT = process.argv.includes("--git");

/* हर पता live-सत्यापित — नया पता जोड़ने से पहले 200-जाँच अनिवार्य */
const main = [
  "/", "/hi/mission.html", "/hi/salah.html", "/udyam/", "/courses/hi/",
  "/join.html", "/verify/", "/hi/network.html", "/vani/", "/contact/hi/",
  "/aptitude-test.html", "/career-kit.html", "/registration-guide.html",
  "/refund.html", "/privacy.html", "/terms.html",
  /* 13-Sep SEO: English पेज (मूल→अंग्रेज़ी→बाक़ी क्रम) + उद्यम-विकी + rules-consent */
  "/en/", "/en/mission.html", "/en/counseling.html", "/en/industries/", "/vani/en/", "/udyam/wiki.html"
].concat(fs.readdirSync(ROOT).filter(f => /^rules-consent-.*\.html$/.test(f)).sort().map(f => "/" + f));

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

/* legacy कोर्स-परिवार के प्रवेश-पेज (13-Sep नियम यथावत)।
   v1.1 dedupe-नियम बहाल: जिस परिवार का index.html universal-regen से
   coursePages में पहले से है (जैसे DCA-2036), उसका "/" रूप दोबारा नहीं। */
const LEGacy = ["/courses/hi/digital/dca/", "/courses/hi/digital/ai-digital-master/", "/courses/hi/vocational/printer/"]
  .filter(u => fs.existsSync(path.join(ROOT, u.slice(1), "index.html")))
  .filter(u => !coursePages.includes(u) && !coursePages.includes(u + "index.html"));

/* ---------- खंड-बँटवारा (हर URL ठीक एक खंड में) ---------- */
const bhasha = coursePages.filter(u => u.startsWith("/courses/hi/bhasha/"));
const hunar  = coursePages.filter(u => !u.startsWith("/courses/hi/bhasha/")).concat(LEGacy);
const SECTIONS = [
  ["sitemap-core.xml",   main],
  ["sitemap-udyam.xml",  intros],
  ["sitemap-bhasha.xml", bhasha],
  ["sitemap-hunar.xml",  hunar]
];

/* ---------- सच्चा lastmod (सिर्फ़ --git, सिर्फ़ असली तारीख़) ---------- */
let gitOk = false;
if (USE_GIT) {
  try {
    const shallow = cp.execSync("git rev-parse --is-shallow-repository", { cwd: ROOT }).toString().trim();
    if (shallow === "true") console.log("⚠️ git-इतिहास अधूरा (shallow) — पहले: git fetch --unshallow ; अभी बिना-lastmod बन रहा।");
    else gitOk = true;
  } catch (e) { console.log("⚠️ git नहीं मिला — बिना-lastmod बन रहा।"); }
}
function urlToFile(u) {
  if (u === "/") return "index.html";
  const rel = u.replace(/^\//, "");
  return u.endsWith("/") ? rel + "index.html" : rel;
}
function lastmod(u) {
  if (!gitOk) return "";
  try {
    const d = cp.execSync('git log -1 --format=%cI -- "' + urlToFile(u) + '"', { cwd: ROOT }).toString().trim();
    return d ? "<lastmod>" + d.slice(0, 10) + "</lastmod>" : "";
  } catch (e) { return ""; }
}

/* ---------- लिखाई ---------- */
const seen = new Set(); let total = 0;
for (const [file, list] of SECTIONS) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  let n = 0;
  for (const u of list) {
    if (seen.has(u)) continue; seen.add(u); n++; total++;
    xml += "  <url><loc>" + BASE + u + "</loc>" + lastmod(u) + "</url>\n";
  }
  xml += "</urlset>\n";
  fs.writeFileSync(path.join(ROOT, file), xml);
  console.log("  " + file + " — " + n + " URL");
}
const today = new Date().toISOString().slice(0, 10);
let idx = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const [file] of SECTIONS)
  idx += "  <sitemap><loc>" + BASE + "/" + file + "</loc><lastmod>" + today + "</lastmod></sitemap>\n";
idx += "</sitemapindex>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), idx);
console.log("✅ sitemap.xml (index) + 4 खंड — कुल", total, "URL" + (gitOk ? " (सच्चे lastmod सहित)" : ""));
