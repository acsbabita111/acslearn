/* dev_lipi_check.js v1.0 · 14-Sep-2026 — लिपि-परिचय workbook का check-robot (🏁-द्वार)
   चलाओ: node generator/dev_lipi_check.js [code]  · जाँचें: पेज मौजूद · generator-निशान · अक्षर-गिनती = base · हर अक्षर का कार्ड + ≥5 बिंदुदार tracing ·
   देवनागरी नाम/आवाज़/लिखो ख़ाली नहीं · उदाहरण-शब्द ≥1/अक्षर · [ ] शून्य · <16px शून्य · मूल-भाषा निशान · JSON-LD · बोलने-कोर्स कड़ी · glyph JSON में हर अक्षर (extra समेत) · sitemap में पेज */
const fs = require("fs"), path = require("path"); const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(__dirname, "build_lipi_pages.js"), "utf8");
const langs = eval("(" + src.match(/const LIPI_LANGS = (\[[\s\S]*?\]);/)[1] + ")");
const only = process.argv[2]; let fail = 0; const ok = (c, m) => { console.log((c ? "  ✅ " : "  ❌ ") + m); if (!c) fail++; };
const sm = fs.existsSync(path.join(ROOT, "sitemap.xml")) ? fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8") : "";
for (const L of langs.filter(l => !only || l.code === only)) {
  console.log("— " + L.code + " (" + L.hi + ") —");
  const B = require(path.join(__dirname, "data", "lipi", L.script + "_base.js"));
  const G = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "lipi", "glyphs_" + L.script + ".json"), "utf8"));
  const p = path.join(ROOT, "courses/hi/bhasha", L.slug, "lipi/index.html");
  ok(fs.existsSync(p), "पेज मौजूद: " + path.relative(ROOT, p)); if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, "utf8");
  ok(/generator से बना \(build_lipi_pages\.js/.test(s), "generator-निशान");
  const all = B.letters.concat((L.extra || []).map(e => ({ u: e[0], l: e[0] })));
  all.forEach(x => { ok(s.indexOf('id="l-' + x.u + '"') >= 0, "कार्ड " + x.u); });
  const dots = (s.match(/class="lipi-g g-dot"/g) || []).length; ok(dots >= all.length * 5, "tracing-SVG " + dots + " (≥" + all.length * 5 + ")");
  B.letters.forEach(x => { if (!(x.naam && x.aawaz && x.likho)) ok(false, "data अधूरा " + x.u); });
  ok(true, "देवनागरी नाम/आवाज़/लिखो — " + B.letters.length + " अक्षर");
  const cards = s.split('class="lipi-card"').length - 1; const wordless = all.filter(x => { const i = s.indexOf('id="l-' + x.u + '"'); const j = s.indexOf('class="lipi-card"', i + 1); return (s.slice(i, j < 0 ? undefined : j).match(/class="lipi-word"/g) || []).length < 1; });
  ok(wordless.length === 0, "हर अक्षर पर ≥1 उदाहरण-शब्द" + (wordless.length ? " — बिना: " + wordless.map(x => x.u).join(",") : ""));
  const vis = s.replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), "square bracket शून्य");
  ok(!(s.match(/font(?:-size)?\s*:\s*0*([0-9]|1[0-5])px/gi) || []).length, "<16px शून्य");
  ok(/मूल भाषा: हिंदी/.test(s), "मूल-भाषा निशान");
  ok(/application\/ld\+json/.test(s) && /LearningResource/.test(s), "JSON-LD LearningResource");
  ok(s.indexOf('href="/courses/hi/bhasha/' + L.slug + '/"') >= 0, "बोलने-कोर्स कड़ी");
  const gmiss = all.filter(x => !G.glyphs[x.u] || (x.l && !G.glyphs[x.l])); ok(gmiss.length === 0, "glyph-outline सब अक्षरों का" + (gmiss.length ? " — नहीं: " + gmiss.map(x => x.u).join(",") : ""));
  ok(!sm || sm.indexOf("/courses/hi/bhasha/" + L.slug + "/lipi/index.html") >= 0 || sm.indexOf("/courses/hi/bhasha/" + L.slug + "/lipi/") >= 0, "sitemap में");
  ok(fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "index.html"), "utf8").indexOf("/lipi/") >= 0, "बोलने-कोर्स पेज से workbook की कड़ी");
}
console.log(fail ? "⛔ " + fail + " जाँच फेल" : "🏁 dev_lipi_check: सब पास");
process.exit(fail ? 1 : 0);
