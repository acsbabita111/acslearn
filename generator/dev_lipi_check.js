/* dev_lipi_check.js v2.0 · 29-Oct-2026 (v1.0: 14-Sep) — लिपि-परिचय workbook का check-robot (🏁-द्वार)
   चलाओ: node generator/dev_lipi_check.js [code]
   v2.0: चिह्न लगे रूप (खंड 4-ख) की जाँच · रजिस्ट्रेशन-अपील ≥3 · सूची regex-eval से नहीं — build_lipi_pages v2.0 के module.exports से (require.main-guard वहाँ);
   subset-भाषाओं की अक्षर-गिनती expandLang से; बिना-शब्द अक्षर पर ईमानदार lipi-rare पंक्ति = मान्य;
   sitemap-जाँच अब sitemap-bhasha.xml से (04-Oct से रूट sitemap = index)।
   जाँचें: पेज मौजूद · generator-निशान · हर अक्षर कार्ड + ≥5 बिंदुदार tracing · data पूरा · हर अक्षर ≥1 शब्द या rare-पंक्ति ·
   [ ] शून्य · <16px शून्य · मूल-भाषा निशान · वर्णमाला-स्रोत पंक्ति (non-en) · JSON-LD · बोलने-कोर्स कड़ी · glyph सब · sitemap · कोर्स-पेज से /lipi/ कड़ी */
const fs = require("fs"), path = require("path"); const ROOT = path.join(__dirname, "..");
const ENG = require(path.join(__dirname, "build_lipi_pages.js"));
const langs = ENG.LIPI_LANGS;
const only = process.argv[2]; let fail = 0; let pass = 0;
const ok = (c, m) => { if (!c) { console.log("  ❌ " + m); fail++; } else pass++; };
const smP = path.join(ROOT, "sitemap-bhasha.xml");
const sm = fs.existsSync(smP) ? fs.readFileSync(smP, "utf8") : (fs.existsSync(path.join(ROOT, "sitemap.xml")) ? fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8") : "");
for (const L of langs.filter(l => !only || l.code === only)) {
  const B = require(path.join(__dirname, "data", "lipi", L.script + "_base.js"));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "lipi", "glyphs_" + L.script + ".json"), "utf8"));
  const words = ENG.loadKKB(L.code);
  const X = ENG.expandLang(L, B, G, words);
  const all = X.letters.concat(X.extras);
  const p = path.join(ROOT, "courses/hi/bhasha", L.slug, "lipi/index.html");
  ok(fs.existsSync(p), L.code + ": पेज मौजूद: " + path.relative(ROOT, p)); if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, "utf8");
  ok(/generator से बना \(build_lipi_pages\.js/.test(s), L.code + ": generator-निशान");
  all.forEach(x => { ok(s.indexOf('id="l-' + x.u + '"') >= 0, L.code + ": कार्ड " + x.u); });
  (X.rup || []).forEach(r => { ok(s.indexOf('id="r-' + r.l + '"') >= 0, L.code + ": चिह्न-रूप " + r.l); ok(!!G.glyphs[r.l], L.code + ": चिह्न-रूप glyph " + r.l); });
  const dots = (s.match(/class="lipi-g g-dot"/g) || []).length; ok(dots >= all.length * 5 + (X.rup || []).length * 3, L.code + ": tracing-SVG " + dots + " (≥" + (all.length * 5 + (X.rup || []).length * 3) + ")");
  all.forEach(x => { if (!(x.naam && x.aawaz && (x.likho || x.isExtra))) ok(false, L.code + ": data अधूरा " + x.u); });
  const wordless = all.filter(x => { const i = s.indexOf('id="l-' + x.u + '"'); const j = s.indexOf('class="lipi-card"', i + 1); const seg = s.slice(i, j < 0 ? undefined : j); return (seg.match(/class="lipi-word"/g) || []).length < 1 && seg.indexOf('class="lipi-p lipi-rare"') < 0; });
  ok(wordless.length === 0, L.code + ": हर अक्षर पर ≥1 शब्द या rare-पंक्ति" + (wordless.length ? " — बिना: " + wordless.map(x => x.u).join(",") : ""));
  const vis = s.replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), L.code + ": square bracket शून्य");
  ok(!(s.match(/font(?:-size)?\s*:\s*0*([0-9]|1[0-5])px/gi) || []).length, L.code + ": <16px शून्य");
  ok(/मूल भाषा: हिंदी/.test(s), L.code + ": मूल-भाषा निशान");
  if (L.code !== "en") ok(s.indexOf("वर्णमाला-स्रोत:") >= 0, L.code + ": वर्णमाला-स्रोत पंक्ति");
  if (L.code !== "en") ok((s.match(/class="lipi-reg"[^>]*>[\s\S]*?href="\/join\.html"/g) || []).length >= 3, L.code + ": रजिस्ट्रेशन-अपील ≥3 जगह (/join.html)");
  ok(/application\/ld\+json/.test(s) && /LearningResource/.test(s), L.code + ": JSON-LD LearningResource");
  ok(s.indexOf('href="/courses/hi/bhasha/' + L.slug + '/"') >= 0, L.code + ": बोलने-कोर्स कड़ी");
  const gmiss = all.filter(x => !G.glyphs[x.u] || (x.l && !G.glyphs[x.l])); ok(gmiss.length === 0, L.code + ": glyph-outline सब" + (gmiss.length ? " — नहीं: " + gmiss.map(x => x.u).join(",") : ""));
  ok(!sm || sm.indexOf("/courses/hi/bhasha/" + L.slug + "/lipi/") >= 0, L.code + ": sitemap में");
  ok(fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "index.html"), "utf8").indexOf("/lipi/") >= 0, L.code + ": कोर्स-पेज से लिपि-कड़ी");
}
console.log((fail ? "⛔ " + fail + " जाँच फेल" : "🏁 dev_lipi_check v2.0: सब पास") + " · ✅ " + pass + " जाँचें");
process.exit(fail ? 1 : 0);
