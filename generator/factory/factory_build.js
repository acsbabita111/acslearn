/* ============================================================
   ACS Content-Factory v0.1 — build पाठ via API (factory-1)
   काम-कोर्स-2 · 16-Jul-2026
   ------------------------------------------------------------
   चलाना (office laptop, Node 18+):
     1) factory.config.sample.json की नक़ल factory.config.json बनाओ,
        उसमें अपनी API key भरो।   ⚠️ factory.config.json GitHub पर कभी नहीं!
     2) परीक्षण-batch:  node factory_build.js --batch outlines/batch_026_030.js
        → हर पास पाठ out/lesson_NNN.json में सहेजा जाता है (बिजली-कट सुरक्षित)।
     3) जोड़ना:        node factory_build.js --merge
        → backup बनाकर ../data/welding_lessons_data.js में पास पाठ जोड़ता है,
          फिर आप हमेशा की तरह generator चलाओ:  node ../build_course_pages.js
   ------------------------------------------------------------
   provider-बदल: config में baseUrl/model बदलो — script वही रहती है।
     Gemini (मुफ़्त-tier): https://generativelanguage.googleapis.com/v1beta/openai/
                           model: gemini-2.5-flash
     DeepSeek:             https://api.deepseek.com/        model: deepseek-chat
     Mistral:              https://api.mistral.ai/v1/       model: mistral-small-latest
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const HERE = __dirname;
const DATA_PATH = path.join(HERE, "..", "data", "welding_lessons_data.js");
const OUT_DIR = path.join(HERE, "out");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

/* ---------- config ---------- */
const CFG_PATH = path.join(HERE, "factory.config.json");
if (!fs.existsSync(CFG_PATH)) {
  console.error("❌ factory.config.json नहीं मिली — sample की नक़ल बनाकर key भरो।");
  process.exit(1);
}
const CFG = JSON.parse(fs.readFileSync(CFG_PATH, "utf8"));
if (!CFG.apiKey || CFG.apiKey.includes("यहाँ")) {
  console.error("❌ config में असली API key भरो।"); process.exit(1);
}

/* ---------- मौजूदा data (नमूने + duplicate-guard) ---------- */
const { WELDING_COURSE, WELDING_LESSONS } = require(DATA_PATH);
const EXISTING = new Set(WELDING_LESSONS.map(l => l.num));
function exemplar(num) {
  const l = WELDING_LESSONS.find(x => x.num === num);
  if (!l) { console.error("❌ नमूना-पाठ " + num + " data में नहीं"); process.exit(1); }
  return JSON.stringify(l, null, 1);
}

/* ---------- check-robot (generator के नियमों की नक़ल) ---------- */
function visibleText(html) {
  return String(html).replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ");
}
function checkRobot(l) {
  const errs = [];
  if (!l || typeof l !== "object") return ["JSON नहीं मिला"];
  for (const k of ["num","slug","title","metaTitle","metaDesc","minutes","sections","videoRecipe"])
    if (l[k] === undefined) errs.push("खाना ग़ायब: " + k);
  if (errs.length) return errs;
  if (!/^[a-z0-9-]{3,60}$/.test(l.slug)) errs.push("slug नियम-विरुद्ध: " + l.slug);
  if (!Array.isArray(l.sections) || l.sections.length < 10 || l.sections.length > 17)
    errs.push("खंड-गिनती " + (l.sections||[]).length + " (10-17 चाहिए)");
  const all = l.sections.map(s => s.h || "").join(" ");
  const words = visibleText(all).trim().split(/\s+/).filter(Boolean).length;
  if (words < 1200) errs.push("शब्द " + words + " (≥1200 चाहिए)");
  if (!/<svg/.test(all)) errs.push("SVG रेखा-चित्र नहीं");
  const vis = visibleText(all);
  if (/[\[\]]/.test(vis)) errs.push("दिखते text में [ ] मिला — सिर्फ़ गोल ( )");
  if (/wld/i.test(vis)) errs.push("दिखते text में कूट-नाम (wld)");
  const px = [...all.matchAll(/font[^;"']*?(\d+)px/g)].map(m => +m[1]);
  if (px.some(n => n < 16)) errs.push("16px से छोटा फ़ॉन्ट मिला");
  for (const s of l.sections) if (!s.t || !s.h) { errs.push("खंड में t/h ग़ायब"); break; }
  return errs;
}

/* ---------- prompt ---------- */
function buildPrompt(outline) {
  return `तुम ACS (Applied Computer School) के वेल्डिंग कोर्स के पाठ-लेखक हो।
नीचे दिए मंज़ूर ढाँचे से एक पूरा पाठ लिखो — नियम अटल हैं:

1) भाषा: कक्षा-6 स्तर की सरल हिंदी; ठेठ देसी मिसालें (गाँव-बाज़ार-रसोई-खेत की)।
2) तकनीकी शब्द: पहले देवनागरी, फिर एक बार गोल bracket में Roman — जैसे होल्डर (Holder)। square bracket [ ] कभी नहीं।
3) लंबाई: दिखने वाले शब्द ≥1300 (SVG के भीतर के शब्द गिनती में नहीं)।
4) खंड-क्रम (यही t-नाम): "पाठ परिचय" → "सीखने का उद्देश्य" → "मुख्य बात — …" →
   "चित्र से समझिए" (isDiagram:true, h में <figure class="lsn-fig"><svg viewBox="0 0 380 430" …> पूरा
   रेखा-चित्र — style में .dt{font:600 17px 'Noto Sans Devanagari',sans-serif;fill:#0B1F3A}
   .ds{font:400 16px 'Noto Sans Devanagari',sans-serif;fill:#1565C0}; रंग सिर्फ़ #0B1F3A #1565C0
   #F9A825 #2E7D32 #F5F7FA #C62828; अंत में <figcaption>) →
   "आसान भाषा में समझिए" → "असली उदाहरण — …" → "AI के साथ अभ्यास" →
   "आज ही करने का काम (Step-by-Step गतिविधि)" → "आम गलतियाँ" → "सावधानियाँ" →
   "तेज़ दोहराव" → "छोटी परीक्षा (Quiz)" → "पाठ का सार (Chapter Summary)" → "आगे क्या सीखें"।
5) गुँथाव: पिछले पाठों के हवाले (ढाँचे में दिए) ज़रूर बुनो; "आगे क्या सीखें" अगले पाठ के नाम पर ख़त्म हो।
6) फ़ॉन्ट 16px से छोटा कहीं नहीं; कूट-नाम "wld" दिखते text में कहीं नहीं।
7) जवाब सिर्फ़ एक JSON object — कोई और text/markdown fence नहीं:
   {"num":…, "slug":"…", "title":"…", "metaTitle":"…", "metaDesc":"…", "minutes":"11-13",
    "sections":[{"t":"…","h":"<p>…</p>"}, {"t":"चित्र से समझिए","isDiagram":true,"h":"<figure…>…"}, …],
    "videoRecipe":"…"}

दो मंज़ूर नमूना-पाठ (इनकी शैली-नाप-गहराई की हूबहू बराबरी करो):
=== नमूना-1 ===
${exemplar(11)}
=== नमूना-2 ===
${exemplar(24)}

अब यह पाठ लिखो:
=== ढाँचा ===
${JSON.stringify(outline, null, 1)}`;
}

/* ---------- API call ---------- */
async function callAPI(prompt) {
  const url = CFG.baseUrl.replace(/\/+$/, "") + "/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + CFG.apiKey },
    body: JSON.stringify({
      model: CFG.model,
      temperature: CFG.temperature ?? 0.7,
      max_tokens: CFG.maxTokens ?? 16000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!res.ok) throw new Error("API " + res.status + ": " + (await res.text()).slice(0, 300));
  const j = await res.json();
  return j.choices?.[0]?.message?.content || "";
}
function parseLesson(text) {
  let t = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```\s*$/, "");
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b < 0) throw new Error("JSON सीमाएँ नहीं मिलीं");
  return JSON.parse(t.slice(a, b + 1));
}

/* ---------- batch ---------- */
async function runBatch(batchFile) {
  const outlines = require(path.resolve(HERE, batchFile));
  console.log("🏭 factory-batch: " + outlines.length + " पाठ · मॉडल: " + CFG.model);
  for (const o of outlines) {
    const outFile = path.join(OUT_DIR, "lesson_" + String(o.num).padStart(3, "0") + ".json");
    if (fs.existsSync(outFile)) { console.log("⏭️  पाठ-" + o.num + " पहले से out/ में — छोड़ा"); continue; }
    if (EXISTING.has(o.num)) { console.log("⏭️  पाठ-" + o.num + " data में पहले से — छोड़ा"); continue; }
    let feedback = "";
    let done = false;
    for (let attempt = 1; attempt <= (CFG.maxRetries ?? 3); attempt++) {
      try {
        console.log("✍️  पाठ-" + o.num + " (" + o.title + ") — कोशिश " + attempt);
        const raw = await callAPI(buildPrompt(o) + (feedback ? "\n\nपिछली कोशिश की ग़लतियाँ सुधारो:\n" + feedback : ""));
        const lesson = parseLesson(raw);
        lesson.num = o.num; lesson.minutes = lesson.minutes || "11-13";
        const errs = checkRobot(lesson);
        if (errs.length) { feedback = errs.join("; "); console.log("   ❌ check-robot: " + feedback); continue; }
        fs.writeFileSync(outFile, JSON.stringify(lesson, null, 1), "utf8");
        const words = visibleText(lesson.sections.map(s => s.h).join(" ")).trim().split(/\s+/).length;
        console.log("   ✅ पास (" + words + " शब्द) → out/" + path.basename(outFile));
        done = true; break;
      } catch (e) { feedback = String(e.message).slice(0, 200); console.log("   ⚠️ " + feedback); }
    }
    if (!done) console.log("   🔴 पाठ-" + o.num + " " + (CFG.maxRetries ?? 3) + " कोशिशों में fail — Claude-chat से लिखवाओ");
  }
  console.log("🏁 batch पूरा। अगला: नमूना-पठन → फिर node factory_build.js --merge");
}

/* ---------- merge ---------- */
function runMerge() {
  const files = fs.readdirSync(OUT_DIR).filter(f => /^lesson_\d{3}\.json$/.test(f)).sort();
  if (!files.length) { console.log("out/ ख़ाली — पहले batch चलाओ।"); return; }
  let s = fs.readFileSync(DATA_PATH, "utf8");
  const bak = DATA_PATH + ".bak-" + Date.now();
  fs.writeFileSync(bak, s, "utf8");
  const idx = s.lastIndexOf("\n];");
  if (idx < 0) { console.error("❌ data-फ़ाइल का अंत-चिह्न नहीं मिला"); process.exit(1); }
  let added = 0, frag = "";
  for (const f of files) {
    const l = JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8"));
    if (EXISTING.has(l.num)) { console.log("⏭️  पाठ-" + l.num + " data में पहले से"); continue; }
    const errs = checkRobot(l);
    if (errs.length) { console.log("🔴 " + f + " check-robot fail — नहीं जोड़ा: " + errs.join("; ")); continue; }
    frag += ",\n\n/* factory: पाठ " + l.num + " */\n" + JSON.stringify(l, null, 1);
    added++;
  }
  if (!added) { console.log("जोड़ने लायक़ कुछ नहीं।"); return; }
  s = s.slice(0, idx) + frag + s.slice(idx);
  fs.writeFileSync(DATA_PATH, s, "utf8");
  try { execSync('node --check "' + DATA_PATH + '"'); }
  catch (e) {
    fs.copyFileSync(bak, DATA_PATH);
    console.error("❌ syntax fail — data-फ़ाइल backup से वापस लौटाई गई।"); process.exit(1);
  }
  console.log("✅ " + added + " पाठ जुड़े · backup: " + path.basename(bak));
  console.log("अगला: cd .. && node build_course_pages.js  → पेज बनें, फिर zip/upload।");
}

/* ---------- main ---------- */
(async () => {
  const args = process.argv.slice(2);
  const bi = args.indexOf("--batch");
  if (bi >= 0 && args[bi + 1]) await runBatch(args[bi + 1]);
  else if (args.includes("--merge")) runMerge();
  else console.log("उपयोग:\n  node factory_build.js --batch outlines/batch_026_030.js\n  node factory_build.js --merge");
})();
