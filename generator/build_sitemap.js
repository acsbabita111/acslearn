/* ============================================================
   build_sitemap.js v2.2 (परत-4) — sitemap-index + 4 खंड-sitemap
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
   v2.1 (10-Nov-2026, GSC-सफ़ाई दौर):
   (घ) sitemap का एकमात्र घर यही फ़ाइल। पहले build_mirror_homes.js व
       career-दौर अलग से sitemap-core में पते जोड़ते थे; यह generator उन्हें
       नहीं जानता था, इसलिए चलने पर 29 पते मिटा देता (भाषा-होम + career)।
       अब: भाषा-होम व भाषा-career-पेज generator/data/mirror_home_strings.js
       की कुंजियों से (फ़ाइल मौजूद हो तभी)।
   (ङ) पहरा: जिस पेज का canonical किसी और पते पर है, या जो redirect-पर्ची
       (meta-refresh) है, वह sitemap में कभी नहीं (Google-नियम: sitemap में
       सिर्फ़ canonical पते)। हटे पते build-log में नाम सहित छपते हैं।
       मुख्य-सूची का कोई पता इस पहरे में गिरे = build रुके (fail-closed)।
   v2.2 (11-Nov-2026, SEO-ऑडिट के सुधार):
   (च) तीन hub-पेज जुड़े: /bhasha.html · /hunar.html · /udyam-shuruat.html (पहले छूटे थे)।
       साथ में भाषा-वार learner नियम-पेज (/<कोड>/rules-consent-learner.html), जो फ़ाइल मौजूद हो।
   (छ) नया पहरा: जिस पेज पर noindex लिखा है, वह sitemap में कभी नहीं
       (Google-नियम: sitemap में सिर्फ़ वही पते जो खोज में दिखाने हैं)।
   (ज) सच्ची बदलाव-तारीख़ (lastmod) अब बही-खाते से: generator/data/sitemap_ledger.json।
       हर पते की फ़ाइल की छाप (hash) वहाँ दर्ज है। छाप बदली = पेज बदला = उसी दिन की तारीख़।
       छाप वही = तारीख़ वही। जिस पुराने पेज की असली तारीख़ पता नहीं, उस पर तारीख़ नहीं लगती
       (13-Sep फ़ैसला यथावत: झूठी तारीख़ निषिद्ध)। इसके लिए git-इतिहास ज़रूरी नहीं।
       वैकल्पिक: --git देने पर बिना-तारीख़ वाले पते git-इतिहास से भरे जाते हैं (इतिहास पूरा हो तभी)।
   (झ) sitemap.xml (index) में हर खंड की तारीख़ तभी बदलती है जब उस खंड की फ़ाइल सचमुच बदले।
   नियम: हाथ से sitemap कभी न लिखें — सिर्फ़ इसी से। जाँच: dev_seo_check.js।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";
const USE_GIT = process.argv.includes("--git");
/* भाषा-सूची का एकमात्र घर: mirror-data की कुंजियाँ (टॉप-15 क्रम) */
const MIRROR = Object.keys(require("./data/mirror_home_strings.js"));
const CAREER_LANGS = ["en"].concat(MIRROR).filter(c => fs.existsSync(path.join(ROOT, c, "career.html")));

/* हर पता live-सत्यापित — नया पता जोड़ने से पहले 200-जाँच अनिवार्य */
const main = [
  "/", "/hi/mission.html", "/hi/salah.html", "/udyam/", "/courses/hi/",
  "/join.html", "/verify/", "/hi/network.html", "/vani/", "/contact/hi/",
  "/aptitude-test.html", "/career-kit.html", "/career.html",
  "/bhasha.html", "/hunar.html", "/udyam-shuruat.html" /* v2.2: तीन hub-पेज */
].concat(CAREER_LANGS.map(c => "/" + c + "/career.html")).concat([
  "/registration-guide.html",
  "/refund.html", "/privacy.html", "/terms.html",
  /* 13-Sep SEO: English पेज (मूल→अंग्रेज़ी→बाक़ी क्रम) + उद्यम-विकी + rules-consent */
  "/en/", "/en/mission.html", "/en/counseling.html", "/en/industries/", "/en/aptitude-test.html", "/vani/en/", "/udyam/wiki.html"
]).concat(fs.readdirSync(ROOT).filter(f => /^rules-consent-.*\.html$/.test(f)).sort().map(f => "/" + f))
  .concat(MIRROR.filter(c => fs.existsSync(path.join(ROOT, c, "index.html"))).map(c => "/" + c + "/"))
  /* v2.2: भाषा-वार learner नियम-पेज */
  .concat(["en"].concat(MIRROR).filter(c => fs.existsSync(path.join(ROOT, c, "rules-consent-learner.html"))).map(c => "/" + c + "/rules-consent-learner.html"));

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

/* ---------- सच्चा lastmod: बही-खाता (ledger) ---------- */
const crypto = require("crypto");
const LEDGER_FILE = path.join(__dirname, "data", "sitemap_ledger.json");
const LEDGER_OLD = fs.existsSync(LEDGER_FILE) ? JSON.parse(fs.readFileSync(LEDGER_FILE, "utf8")) : null;
const LEDGER_NEW = {};
const d0 = new Date();
const today = d0.getFullYear() + "-" + String(d0.getMonth() + 1).padStart(2, "0") + "-" + String(d0.getDate()).padStart(2, "0");
function urlToFile(u) {
  if (u === "/") return "index.html";
  const rel = u.replace(/^\//, "");
  return u.endsWith("/") ? rel + "index.html" : rel;
}
/* छाप = फ़ाइल की sha1 के पहले 12 अक्षर। Windows की पंक्ति-अंत (CRLF) पहले LF में बदली जाती है,
   ताकि office-laptop और Linux दोनों पर एक ही छाप निकले (वरना हर पेज "बदला" दिखता)। */
function fileHash(f) { const b = Buffer.from(fs.readFileSync(f).toString("latin1").replace(/\r\n/g, "\n"), "latin1"); return crypto.createHash("sha1").update("blob " + b.length + "\0").update(b).digest("hex").slice(0, 12); }
/* वैकल्पिक --git: एक ही आदेश में पूरे इतिहास से हर फ़ाइल की आख़िरी तारीख़ */
let GITMAP = null;
if (USE_GIT) {
  try {
    const shallow = cp.execSync("git rev-parse --is-shallow-repository", { cwd: ROOT }).toString().trim();
    if (shallow === "true") console.log("⚠️ git-इतिहास अधूरा (shallow) : --git छोड़ा गया, बही-खाता ही चलेगा।");
    else {
      GITMAP = {}; let cur = "";
      const out = cp.execSync("git -c core.quotepath=off log --format=@%cs --name-only", { cwd: ROOT, maxBuffer: 1 << 30 }).toString();
      for (const ln of out.split("\n")) { if (ln[0] === "@") cur = ln.slice(1); else if (ln && !GITMAP[ln]) GITMAP[ln] = cur; }
    }
  } catch (e) { console.log("⚠️ git नहीं मिला : --git छोड़ा गया।"); }
}
function lastmod(u) {
  const rel = urlToFile(u), h = fileHash(path.join(ROOT, rel));
  const old = LEDGER_OLD && LEDGER_OLD[u];
  let d;
  if (old && old[0] === h) d = old[1];             /* पेज नहीं बदला : तारीख़ वही */
  else if (LEDGER_OLD) d = today;                   /* पेज बदला या नया पता : आज */
  else d = "";                                      /* बही की पहली भराई : तारीख़ अज्ञात */
  if (!d && GITMAP && GITMAP[rel]) d = GITMAP[rel];
  LEDGER_NEW[u] = [h, d];
  return d ? "<lastmod>" + d + "</lastmod>" : "";
}

/* ---------- पहरा: सिर्फ़ canonical, ग़ैर-redirect पेज ---------- */
const MAINSET = new Set(main);
const dropped = [];
function sitemapOk(loc) {
  const f = path.join(ROOT, urlToFile(loc));
  if (!fs.existsSync(f)) throw new Error("sitemap-पता, पर फ़ाइल नहीं: " + loc);
  const h = fs.readFileSync(f, "utf8").slice(0, 20000);
  let why = "";
  if (/http-equiv=["']refresh["']/i.test(h)) why = "redirect-पर्ची";
  if (!why && /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(h)) why = "noindex"; /* v2.2 */
  const m = h.match(/<link rel="canonical" href="([^"]+)"/);
  if (!why && m && m[1] !== BASE + loc) why = "canonical पराया → " + m[1].replace(BASE, "");
  if (!why) return true;
  if (MAINSET.has(loc)) throw new Error("मुख्य-सूची का पता पहरे में गिरा (" + why + "): " + loc);
  dropped.push(loc + "  (" + why + ")");
  return false;
}

/* ---------- लिखाई ---------- */
const seen = new Set(); let total = 0; const SECHASH = {};
for (const [file, list] of SECTIONS) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  let n = 0;
  for (const u of list) {
    const loc = u.endsWith("/index.html") ? u.slice(0, -10) : u; /* 08-Nov: <loc> साफ़-/ रूप : पन्नों के canonical से मेल */
    if (seen.has(loc)) continue; seen.add(loc);
    if (!sitemapOk(loc)) continue;
    n++; total++;
    xml += "  <url><loc>" + BASE + loc + "</loc>" + lastmod(loc) + "</url>\n";
  }
  xml += "</urlset>\n";
  fs.writeFileSync(path.join(ROOT, file), xml);
  SECHASH[file] = fileHash(path.join(ROOT, file));
  console.log("  " + file + " — " + n + " URL");
}
/* index: खंड की तारीख़ तभी बदले जब खंड-फ़ाइल सचमुच बदली हो (खंड की छाप भी बही-खाते में, कुंजी "#फ़ाइल-नाम") */
const IDX_FILE = path.join(ROOT, "sitemap.xml");
const idxOld = fs.existsSync(IDX_FILE) ? fs.readFileSync(IDX_FILE, "utf8") : "";
let idx = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
const SEC_NEW = {};
for (const [file] of SECTIONS) {
  const old = LEDGER_OLD && LEDGER_OLD["#" + file];
  const m = idxOld.match(new RegExp("/" + file.replace(/\./g, "\\.") + "</loc><lastmod>(\\d{4}-\\d{2}-\\d{2})</lastmod>"));
  const d = (old && old[0] === SECHASH[file] && old[1]) ? old[1] : (!LEDGER_OLD && m) ? m[1] : today;
  SEC_NEW["#" + file] = [SECHASH[file], d];
  idx += "  <sitemap><loc>" + BASE + "/" + file + "</loc><lastmod>" + d + "</lastmod></sitemap>\n";
}
idx += "</sitemapindex>\n";
fs.writeFileSync(IDX_FILE, idx);
/* बही-खाता: पते के क्रम में, एक पंक्ति प्रति पता (git में साफ़ अंतर दिखे) */
const LEDGER_ALL = Object.assign({}, SEC_NEW, LEDGER_NEW);
fs.writeFileSync(LEDGER_FILE, "{\n" + Object.keys(LEDGER_ALL).sort().map(k => JSON.stringify(k) + ": " + JSON.stringify(LEDGER_ALL[k])).join(",\n") + "\n}\n");
const dated = Object.values(LEDGER_NEW).filter(v => v[1]).length;
console.log("✅ sitemap.xml (index) + 4 खंड — कुल", total, "URL · बदलाव-तारीख़ वाले पते:", dated, "(आज बदले/नए:", Object.values(LEDGER_NEW).filter(v => v[1] === today).length + ")");
if (dropped.length) { console.log("  पहरे से बाहर (" + dropped.length + "):"); dropped.forEach(d => console.log("   - " + d)); }
