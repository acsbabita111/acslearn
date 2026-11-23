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
/* 29-Oct: हर खाने/कार्ड/शब्द पर 🎙️ — साझा lipi.js जोड़ती है; 2-कार्ड पंक्ति lipi.css में */
{ const lj = fs.readFileSync(path.join(ROOT, "assets/lipi.js"), "utf8"), lc = fs.readFileSync(path.join(ROOT, "assets/lipi.css"), "utf8");
  if (!/window\.lipiBolo/.test(lj) || !/lipi-mic/.test(lj)) { console.log("  ❌ lipi.js में 🎙️ बोलो नहीं"); fail++; } else pass++;
  if (!/\.lipi-grid\{grid-template-columns:repeat\(2/.test(lc)) { console.log("  ❌ lipi.css में 2-कार्ड पंक्ति नहीं"); fail++; } else pass++;
  if (lc.indexOf(".lipi-word .w{overflow-wrap:anywhere}") < 0) { console.log("  ❌ lipi.css: लंबा शब्द कार्ड से बाहर निकल सकता है"); fail++; } else pass++; }
const PR = require(path.join(__dirname, "data", "lipi", "pranali.js"));
const ok = (c, m) => { if (!c) { console.log("  ❌ " + m); fail++; } else pass++; };
const smP = path.join(ROOT, "sitemap-bhasha.xml");
const sm = fs.existsSync(smP) ? fs.readFileSync(smP, "utf8") : (fs.existsSync(path.join(ROOT, "sitemap.xml")) ? fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8") : "");
/* 22-Nov-2026: ध्वनि-कार्ड वाले पन्ने (generator/data/lipi/dhvani/<code>.js) का ढाँचा अलग है: उनकी जाँच उनका अपना यंत्र करता है */
const NO_AAWAZ_LINE = "जिस अक्षर का अनुमान पक्का नहीं बना";
const LD = require(path.join(__dirname, "lipi_dhvani.js")), DCHK = require(path.join(__dirname, "dev_lipi_dhvani_check.js"));
for (const L of langs.filter(l => !only || l.code === only)) {
  if (LD.has(L.code)) { const r = DCHK.run(L.code, { noWrite: true }); r.all.forEach(x => ok(x.ok, L.code + ": " + x.id + " " + x.msg + (x.detail ? " : " + x.detail : ""))); continue; }
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
  const dots = (s.match(/class="lipi-g g-dot"/g) || []).length; const TN = (B && B.traceN) || 5; /* 29-Oct: काना जैसी बड़ी लिपि में प्रति अक्षर 3 (base का traceN) */ ok(dots >= all.length * TN + (X.rup || []).length * 3, L.code + ": tracing-SVG " + dots + " (≥" + (all.length * TN + (X.rup || []).length * 3) + ")");
  all.forEach(x => { if (!(x.naam && x.aawaz && (x.likho || x.isExtra))) ok(false, L.code + ": data अधूरा " + x.u); });
  const wordless = all.filter(x => { const i = s.indexOf('id="l-' + x.u + '"'); const j = s.indexOf('class="lipi-card"', i + 1); const seg = s.slice(i, j < 0 ? undefined : j); return (seg.match(/class="lipi-word"/g) || []).length < 1 && seg.indexOf('class="lipi-p lipi-rare"') < 0; });
  ok(wordless.length === 0, L.code + ": हर अक्षर पर ≥1 शब्द या rare-पंक्ति" + (wordless.length ? " — बिना: " + wordless.map(x => x.u).join(",") : ""));
  const vis = s.replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), L.code + ": square bracket शून्य");
  ok(!(s.match(/font(?:-size)?\s*:\s*0*([0-9]|1[0-5])px/gi) || []).length, L.code + ": <16px शून्य");
  ok(/मूल भाषा: हिंदी/.test(s), L.code + ": मूल-भाषा निशान");
  const PRK = PR.kindOf(L.script), PK = PR.KINDS[PRK];   /* 22-Nov (ऑडिट LP1-03): लेखन-प्रणाली का नाम */
  if (L.code !== "en") ok(s.indexOf(PK.srot + ":") >= 0, L.code + ": " + PK.srot + " पंक्ति");
  if (L.code !== "en") ok((s.match(/class="lipi-reg"[^>]*>[\s\S]*?href="\/join\.html"/g) || []).length >= 3, L.code + ": रजिस्ट्रेशन-अपील ≥3 जगह (/join.html)");
  ok(/application\/ld\+json/.test(s) && /LearningResource/.test(s), L.code + ": JSON-LD LearningResource");
  /* 22-Nov-2026 चरण-1 (सच्चाई-सुधार): ये कमियाँ fgc-ऑडिट में मिलीं और 217-294 पन्नों में फैली थीं; अब कोई दोबारा न आए। en byte-frozen है। */
  if (L.code !== "en") {
    const art = s.slice(s.indexOf("<!-- PAGE-CONTENT-START -->"), s.indexOf("<!-- PAGE-CONTENT-END -->")), artVis = art.replace(/<svg[\s\S]*?<\/svg>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
    const LTx = require("./data/lipi/latin_letter_tables.js")[L.code], derived = B.script === "latin" && !LTx;
    ok(artVis.indexOf("बटन दबाकर सुनो") < 0, L.code + ": आवाज़ की जगह 'बटन दबाकर सुनो' नहीं");
    if (derived) ok(!/<span class="aw">[^<]*\/[^<]*<\/span>/.test(art), L.code + ": अनुमानित आवाज़ में दो-दो रूप (आ / ए) नहीं");
    if (derived) ok(!/<span class="nm">(एच|वाइ|वाई|डब्ल्यू|एक्स|क्यू|ज़ेड|जेड)<\/span>/.test(art), L.code + ": अंग्रेज़ी अक्षर-नाम (एच, वाइ) नहीं");
    const acr = (art.match(/<span class="w[^"]*"[^>]*>([^<]*)<\/span>/g) || []).map(x => x.replace(/<[^>]+>/g, "")).filter(w => /[A-Z].*[A-Z]/.test(w));
    ok(!acr.length, L.code + ": उदाहरण-शब्दों में संक्षेप (UPI, EMI) नहीं" + (acr.length ? " — मिले: " + acr.slice(0, 4).join(",") : ""));
    ok(!/[\u2014\u2013]/.test(artVis), L.code + ": पाठ में लंबी डैश नहीं");
    ok(artVis.indexOf("(लाल)") < 0, L.code + ": 'स्वर (लाल)' नहीं (कोई स्वर लाल नहीं दिखता)");
    ok(!/<button type="button" class="lipi-sp"(?![^>]*aria-label)/.test(art), L.code + ": हर 🔊 बटन का नाम (aria-label)");
    const pd = (art.match(/ङ\) (\d+) दिन की योजना/) || [])[1], dd = (s.match(/<meta name="description" content="[^"]*?और (\d+) दिन की योजना/) || [])[1];
    if (!LD.has(L.code)) ok(pd && pd === dd, L.code + ": खोज-विवरण के दिन (" + dd + ") = पन्ने के दिन (" + pd + ")");
    /* 22-Nov (ChatGPT ऑडिट LP1-01): मशीन-आवाज़ और अनुमान को "असली आवाज़" नहीं कहना; अनुमान-वाक्य सिर्फ़ तब, जब सच में कोई आवाज़ अनुमान हो */
    ok(artVis.indexOf("असली आवाज़") < 0, L.code + ": 'असली आवाज़' का दावा नहीं");
    if (B.script === "latin" && LTx) {
      const nNotLT = all.filter(y => y.aSrc !== "lt").length, estLine = artVis.indexOf("शब्दों से निकाला गया अनुमान") >= 0;
      ok(estLine === (nNotLT > 0), L.code + ": अनुमान-वाक्य " + (nNotLT ? "होना चाहिए (" + nNotLT + " आवाज़ें अनुमान)" : "नहीं होना चाहिए (सब आवाज़ें अक्षर-तालिका से)"));
      ok(artVis.indexOf(NO_AAWAZ_LINE) < 0 || all.some(y => y.aSrc === "none"), L.code + ": '" + NO_AAWAZ_LINE + "' वाला वाक्य, पर ऐसा कोई अक्षर नहीं");
    }
    /* 22-Nov (ChatGPT ऑडिट LP1-03): चीनी चिह्न, काना और शब्दांश-लिपि को "वर्णमाला / Alphabet" नहीं कहना */
    if (PRK) {
      const t = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || "", h1 = (art.match(/<h1>([^<]*)<\/h1>/) || [])[1] || "", nm = (s.match(/"@type":"LearningResource","name":"([^"]*)"/) || [])[1] || "", h2 = (art.match(/<h2>3\. ([^<]*)<\/h2>/) || [])[1] || "";
      ok(t && h1 && nm && h2, L.code + ": शीर्षक, h1, schema-नाम और खंड-3 मिले");
      ok(![t, h1, nm, h2, (s.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ""].some(x => /वर्णमाला|Alphabet/.test(x)), L.code + ": " + PRK + " लिपि को वर्णमाला/Alphabet नहीं कहा");
      ok(t.indexOf("(" + PK.en(L.en) + ")") >= 0 && h1.indexOf("(" + PK.en(L.en) + " Workbook)") >= 0, L.code + ": सही अंग्रेज़ी नाम (" + PK.en(L.en) + ")");
    }
  }
  ok(s.indexOf('href="/courses/hi/bhasha/' + L.slug + '/"') >= 0, L.code + ": बोलने-कोर्स कड़ी");
  const gmiss = all.filter(x => !G.glyphs[x.u] || (x.l && !G.glyphs[x.l])); ok(gmiss.length === 0, L.code + ": glyph-outline सब" + (gmiss.length ? " — नहीं: " + gmiss.map(x => x.u).join(",") : ""));
  /* 11-Nov-2026: जुड़वाँ कोर्स (data/seo_twins.js) जान-बूझकर sitemap से बाहर है; उसका canonical मुख्य कोर्स पर होना चाहिए */
  { const TW = require("./data/seo_twins.js");
    if (TW[L.slug]) ok(fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "lipi/index.html"), "utf8").indexOf('<link rel="canonical" href="https://acslearn.com/courses/hi/bhasha/' + TW[L.slug] + '/lipi/">') >= 0, L.code + ": जुड़वाँ का canonical मुख्य कोर्स पर नहीं");
    else ok(!sm || sm.indexOf("/courses/hi/bhasha/" + L.slug + "/lipi/") >= 0, L.code + ": sitemap में"); }
  ok(fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "index.html"), "utf8").indexOf("/lipi/") >= 0, L.code + ": कोर्स-पेज से लिपि-कड़ी");
}
console.log((fail ? "⛔ " + fail + " जाँच फेल" : "🏁 dev_lipi_check v2.0: सब पास") + " · ✅ " + pass + " जाँचें");
process.exit(fail ? 1 : 0);
