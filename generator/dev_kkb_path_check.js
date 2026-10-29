/* dev_kkb_path_check.js v1.0 · 25-Oct-2026 — कोर्स-परिचय पेज v2 का robot (सब भाषा-कोर्स पेज)
   जाँचें: 🧭 सीखने की राह = ठीक 7 कदम, Founder-क्रम (लिपि → चित्र-पुस्तक → 90-दिन कोर्स → वर्कबुक → व्याकरण) ·
   हर "खोलें" कड़ी की फ़ाइल repo में हो · जो नहीं बना वहाँ "जल्द" (मरी कड़ी या छिपा हुआ बना-पन्ना = FAIL) ·
   📦 पैकेज 15 पंक्ति · 🌱 समिति · 👍👎💬 राय-डिब्बा ठीक एक + acs-raay.js · og:url = canonical · नया हिस्सा [ ]-मुक्त ·
   भाषा-कोड ताज़ा रजिस्टर (bhasha_register.json) में + h1 में रजिस्टर वाला हिंदी-नाम।
   चलाना: node generator/dev_kkb_path_check.js → 🏁 */
"use strict";
const fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
const ORDER = ["लिपि-परिचय", "चित्र-पुस्तक", "90-दिन बोलचाल कोर्स", "बोलो-वर्कबुक (workbook)", "लिखो-वर्कबुक (workbook)", "शब्दकोश", "मेरा पहला व्याकरण"]; /* 29-Oct Founder-नियम: 7 कदम */
const SUB = ["lipi", "chitra-pustak", null, "bolo-workbook", "workbook", "shabdkosh", "vyakaran"];
const B = path.join(ROOT, "courses/hi/bhasha");
/* 25-Oct: भाषा-सूची = ताज़ा मास्टर-स्प्रेडशीट (bhasha_register.json) — कोड रजिस्टर में, h1 में रजिस्टर वाला हिंदी-नाम */
const REG = JSON.parse(fs.readFileSync(path.join(ROOT, "generator/data/bhasha_register.json"), "utf8")).langs;
let pages = 0, F = 0, links = 0, soon = 0;
/* 25-Oct L0: भाषा की लिपि उसके kkb2-data से (code ← पेज का data-page) */
function DEVA(slug) { const h = fs.readFileSync(path.join(B, slug, "index.html"), "utf8"); const code = (h.match(/data-page="ACS-KKB-([^"]+)"/) || [])[1]; if (!code) return false;
  const p = path.join(ROOT, "assets", code === "en" ? "kkb2_data.js" : "kkb2_" + code + "_data.js"); if (!fs.existsSync(p)) return false;
  const m = fs.readFileSync(p, "utf8").slice(0, 6000).match(/"script":\s*"([^"]+)"/); return !!m && /^devanagari(-native)?$/.test(m[1]); }
const fail = (s, m) => { F++; if (F <= 30) console.log("❌ " + s + ": " + m); };
for (const slug of fs.readdirSync(B).sort()) {
  const f = path.join(B, slug, "index.html");
  if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, "utf8");
  if (h.indexOf('id="kkb2-app"') < 0) continue;
  pages++;
  const nav = (h.match(/<nav class="kkb-path"[\s\S]*?<\/nav>/g) || []);
  if (nav.length !== 1) { fail(slug, "सीखने की राह " + nav.length); continue; }
  const lis = [...nav[0].matchAll(/<li class="(on|soon|here|known)">[\s\S]*?<b>([^<]+)<\/b>[\s\S]*?<\/li>/g)];
  if (lis.length !== 7) { fail(slug, "कदम " + lis.length); continue; }
  lis.forEach((m, i) => {
    if (m[2] !== ORDER[i]) fail(slug, "कदम-" + (i + 1) + " क्रम ग़लत: " + m[2]);
    if (i === 2) { if (m[1] !== "here" || m[0].indexOf('href="#kkb2-app"') < 0) fail(slug, "कदम-3 'यहीं' नहीं"); return; }
    if (i === 0 && DEVA(slug)) { if (m[1] !== "known" || m[0].indexOf("परिचित") < 0) fail(slug, "देवनागरी-भाषा: कदम-1 'परिचित' नहीं"); return; }
    if (i === 0 && m[1] === "known") { fail(slug, "ग़ैर-देवनागरी भाषा पर 'परिचित'"); return; }
    const exists = fs.existsSync(path.join(B, slug, SUB[i], "index.html"));
    const href = (m[0].match(/href="([^"]+)"/) || [])[1];
    if (exists && (m[1] !== "on" || href !== "/courses/hi/bhasha/" + slug + "/" + SUB[i] + "/")) fail(slug, SUB[i] + " बना है पर कड़ी नहीं");
    if (!exists && (m[1] !== "soon" || href || m[0].indexOf("जल्द") < 0)) fail(slug, SUB[i] + " नहीं बना पर कड़ी/बिना-जल्द");
    if (exists) links++; else soon++;
  });
  const code = (h.match(/data-page="ACS-KKB-([^"]+)"/) || [])[1];
  if (!code || !REG[code]) fail(slug, "भाषा-कोड रजिस्टर में नहीं: " + code);
  else if (h.indexOf("<h1") < 0 || !(h.match(/<h1[^>]*>([^<]*)</) || ["", ""])[1].startsWith(REG[code].hi + " ")) fail(slug, "h1 में रजिस्टर-नाम नहीं: " + REG[code].hi);
  const pk = h.match(/<ul class="kkb-pack">[\s\S]*?<\/ul>/);
  if (!pk || (pk[0].match(/<li /g) || []).length !== 15) fail(slug, "पैकेज 15 पंक्ति नहीं");
  for (const id of ["kkb-pack", "kkb-samiti", "kkb-raay", "kkb2-app"]) if (h.split('id="' + id + '"').length !== 2) fail(slug, "anchor #" + id + " ठीक एक नहीं");
  if (h.split('class="acs-raay"').length !== 2 || h.indexOf('data-page="ACS-KKB-') < 0) fail(slug, "राय-डिब्बा");
  if (h.split('src="/assets/acs-raay.js"').length !== 2) fail(slug, "acs-raay.js ठीक एक बार नहीं");
  if (h.split('src="/assets/acs-bolo.js"').length !== 2) fail(slug, "acs-bolo.js (🎙️) ठीक एक बार नहीं");
  if (pk && !/🎙️<\/span><span class="kpk-tx">[^<]*<\/span><span class="kpk-st">✅/.test(pk[0])) fail(slug, "पैकेज में 🎙️ ✅ नहीं");
  if (h.indexOf("wa.me/919431210092?text=") < 0 || h.indexOf('id="kkb-samiti"') < 0) fail(slug, "समिति-निमंत्रण");
  const can = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1], og = (h.match(/<meta property="og:url" content="([^"]+)"/) || [])[1];
  if (!can || can !== og) fail(slug, "og:url ≠ canonical");
  const neu = nav[0] + (pk ? pk[0] : "");
  if (/[\[\]]/.test(neu)) fail(slug, "नए हिस्से में चौकोर कोष्ठक");
}
console.log("कोर्स-पेज " + pages + " · बनी कड़ियाँ " + links + " · ईमानदार 'जल्द' " + soon);
if (!pages) { console.log("❌ एक भी कोर्स-पेज नहीं मिला"); process.exit(1); }
console.log(F ? "\n❌ kkb-path robot: " + F + " fail" : "🏁 kkb-path robot: सब पास");
process.exit(F ? 1 : 0);
