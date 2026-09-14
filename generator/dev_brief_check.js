/* dev_brief_check.js v1.0 · 14-Sep-2026 — कदम-1 (दूतावास-योग्यता) का check-robot: 130 brief-पेज + course-पेज पर Can-do/दूतावास/brief-कड़ी + kkb_cando asset-प्रति = generator/data */
const fs = require("fs"), path = require("path"); const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(__dirname, "build_specials.js"), "utf8");
const slugs = [...src.matchAll(/\{ code: "([a-z]+)", slug: "([a-z\-]+)"/g)].map(m => m[2]);
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log("  ❌ " + m); } };
const CAN = require("./data/kkb_cando.js"); const asset = fs.readFileSync(path.join(ROOT, "assets/kkb_cando.js"), "utf8");
ok(asset.indexOf(JSON.stringify(CAN)) >= 0, "assets/kkb_cando.js = generator/data/kkb_cando.js (प्रति बासी)");
ok(CAN.weeks.length === 18 && CAN.weeks.every(w => w.can.length === 4 && w.can.every(x => x.split(/\s+/).length <= 20 && /सकता\/सकती|जानता\/जानती/.test(x))), "Can-do 18×4, ≤20 शब्द, 'सकता/सकती' रूप");
const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8"); let n = 0;
for (const s of slugs) {
  const bp = path.join(ROOT, "courses/hi/bhasha", s, "brief/index.html"); if (!fs.existsSync(bp)) { ok(false, s + ": brief नहीं"); continue; } n++;
  const b = fs.readFileSync(bp, "utf8"); const vis = b.replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
  ok(/id="bf-hi"/.test(b) && /id="bf-en"/.test(b), s + ": हिंदी+English दोनों नहीं");
  ok((b.match(/class="bf-sec"/g) || []).length === 10, s + ": 10 खंड नहीं");
  ok(!/[\[\]]/.test(vis), s + ": square bracket"); ok(!(b.match(/font(?:-size)?\s*:\s*0*([0-9]|1[0-5])px/gi) || []).length, s + ": <16px");
  ok(/मूल भाषा: हिंदी/.test(b) && /Original language: Hindi/.test(b), s + ": मूल-भाषा निशान");
  ok(/जानकारी जाँची: सितंबर 2026/.test(b), s + ": जाँची-तारीख़"); ok(/गारंटी नहीं/.test(b) && /does not guarantee/.test(b), s + ": ईमानदारी-पंक्ति");
  ok(sm.indexOf("/courses/hi/bhasha/" + s + "/brief/") >= 0, s + ": sitemap में brief नहीं");
  const c = fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", s, "index.html"), "utf8");
  ok(c.indexOf('/brief/"') >= 0 && c.indexOf("KKB2_META") >= 0 && c.indexOf("/assets/kkb_cando.js") >= 0, s + ": course-पेज पर meta/cando/brief-कड़ी नहीं");
}
console.log("brief-पेज " + n + "/" + slugs.length);
console.log(fail ? "⛔ " + fail + " जाँच फेल" : "🏁 dev_brief_check: 130 brief + course-पेज कदम-1 सब पास"); process.exit(fail ? 1 : 0);
