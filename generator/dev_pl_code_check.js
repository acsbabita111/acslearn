/* ============================================================
   dev_pl_code_check.js — pl-0 "पहला कोड" का विशेष check-robot · v1.7 · 26-Oct-2026
   ------------------------------------------------------------
   रजिस्टर-वादा: "code चलाकर (robot 100%)" — यह फ़ाइल उसी वादे की मशीन।
   build_pl0_pages.js के भीतरी robot (शब्द/svg/bracket/फ़ॉन्ट/कूट-नाम) के ऊपर
   pl-0 की 6 अतिरिक्त जाँचें, data-फ़ाइल (परत-3) पर सीधे:

   1. code-दौड़ (py):   <pre class="pl-code" data-lang="py"> का हर टुकड़ा
                        असली python3 से चले; exit≠0 = FAIL।
                        data-out="…" हो तो stdout (खाली-जगह-सामान्य कर) हूबहू मिले।
                        [v1.2] data-in="जवाब1|जवाब2" — input() के नक़ली कीबोर्ड-जवाब
                        (| = Enter); बिना data-in के input() = EOFError = FAIL।
                        ध्यान: पाइप से चलने पर कीबोर्ड-जवाब परदे पर नहीं छपता —
                        data-out में सवाल के बाद जवाब नहीं, सीधे अगला print।
                        [v1.3] कई दौड़ें — data-in-2/data-out-2 … -9 (एक डिब्बा,
                        अलग जवाब, अलग नतीजा); if + input वाले डिब्बे में कम-से-कम
                        दो दौड़ें अनिवार्य (दोनों राहें जँचें) — वरना FAIL। (अधिकतम 9 दौड़ें)
                        [v1.4] अनंत-लूप पहरा — 5 सेकंड में न रुके या 2MB+ output
                        दे, तो साफ़ संदेश "अनंत-लूप पकड़ा" (गूँगा timeout नहीं)।
   2. code-जाँच (html): data-lang="html" टुकड़े का tag-संतुलन (stack-parser);
                        खुला/बेमेल tag = FAIL। (void-tags: br hr img input meta link)
   2-ब. code-जाँच (css) [v1.1]: data-lang="css" टुकड़ा + html के भीतर के
                        <style>…</style> और style="…" — कोष्ठक-संतुलन { },
                        हर घोषणा "नाम: मूल्य" रूप में, भूला अर्धविराम (एक घोषणा में दो गुण),
                        ख़ाली चुनने वाला नहीं = FAIL।
   3. code-लिपि नियम:  pl-code के भीतर देवनागरी वर्ण = FAIL
                        (code हूबहू Roman; समझाइश डिब्बे के बाहर)।
   4. गारंटी-निषेध:     दिखने वाले text में "गारंटी" / "100% भविष्य" /
                        "100% सही" = FAIL (v2.1 नियम — "यह अनुमान है" आत्मा)।
   5. ⏱ जाँची-तारीख़:   l.fast === true वाले पाठ में "जानकारी-जाँची:" पंक्ति
      [v1.6] master के ⏱ पाठ (7, 204-218) पर fast-निशान अनिवार्य (fail-closed)
   7. [v1.6] बाहरी कड़ी: target="_blank" rel="noopener" + उसी खंड में "ख़ुद verify करें"
   4. [v1.6] निषिद्ध-सूची: + "सौ फ़ीसदी पक्का", "सबसे पढ़ने-योग्य", "100% पक्का" — उद्धरण में भी
                        अनिवार्य (जाँची-तारीख़ नियम v6.4)।
   6. प्रिम-क्रम:       जिस पाठ में pl-code है, उसमें code-डिब्बे से पहले
                        दिखने वाले text में "अंदाज़ा" शब्द आए (पढ़ो/सोचो-पहले —
                        PRIMM का P); न आए = FAIL।
   भाग-अ (बिना-कंप्यूटर, पाठ 1-46) में pl-code शून्य होना सही है — जाँच 1/2/3/6
   वहाँ अपने-आप ख़ाली-पास; 4/5 हर पाठ पर।
   चलाना: node generator/dev_pl_code_check.js   (repo/काम-रूट से)
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const { PL0_COURSE, PL0_LESSONS } =
  require(path.join(__dirname, "data", "pl0_lessons_data.js"));

function unescapeHtml(s){
  // [26-Oct] संख्या-वाले रूप भी (&#39; और &#x27; — दोनों एक ही अक्षर; Python का html.escape &#x27; लिखता है)
  return s.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')
          .replace(/&#x([0-9a-fA-F]+);/g,(m,h)=>String.fromCharCode(parseInt(h,16)))
          .replace(/&#(\d+);/g,(m,d)=>String.fromCharCode(parseInt(d,10)))
          .replace(/&amp;/g,"&");
}
function visibleText(html){
  return html.replace(/<svg[\s\S]*?<\/svg>/g," ")
             .replace(/<pre[\s\S]*?<\/pre>/g," ")
             .replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
}
const MUST_FAST = new Set([7, 204,205,206,207,208,209,210,211,212,213,214,215,216,217,218]);  // [v1.6] master v2.1 के ⏱ पाठ
const VOID = new Set(["br","hr","img","input","meta","link","source","wbr"]);
/* v1.1: CSS-जाँच — घोषणा-सूची (style="…" या { } के भीतर) */
function cssDecls(body, where){
  const holes = [];
  body.split(";").map(x=>x.trim()).filter(Boolean).forEach(d=>{
    if (!/^[a-zA-Z-]+\s*:\s*\S.*$/.test(d))
      holes.push(where+" बिगड़ी घोषणा (नाम: मूल्य नहीं): '"+d+"'");
    else if (/:[^:]*\s[a-zA-Z-]+\s*:/.test(d))
      holes.push(where+" भूला अर्धविराम? (एक घोषणा में दो गुण): '"+d+"'");
  });
  return holes;
}
function cssCheck(code){
  const holes = [];
  const c = code.replace(/\/\*[\s\S]*?\*\//g, "");
  let depth = 0;
  for (const ch of c){ if (ch==="{") depth++; else if (ch==="}"){ depth--; if (depth<0){ holes.push("css: बिना-खुला }"); depth=0; } } }
  if (depth>0) holes.push("css: खुला रह गया {");
  const re = /([^{}]*)\{([^{}]*)\}/g; let m, n = 0;
  while ((m = re.exec(c))){
    n++;
    if (!m[1].trim()) holes.push("css: ख़ाली चुनने वाला (selector)");
    cssDecls(m[2], "css").forEach(h=>holes.push(h));
  }
  if (!n && c.trim()) holes.push("css: कोई नियम-खंड { } नहीं");
  return holes;
}
function htmlInnerCss(code){
  const holes = []; let m;
  const sre = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  while ((m = sre.exec(code))) cssCheck(m[1]).forEach(h=>holes.push("style-tag "+h));
  const are = /style="([^"]*)"/g;
  while ((m = are.exec(code))) cssDecls(m[1], "style-जेब").forEach(h=>holes.push(h));
  return holes;
}

function htmlBalance(code){
  const holes = [];
  const stack = [];
  const re = /<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9-]*)[^>]*?(\/?)\s*>/g;
  let m;
  while ((m = re.exec(code))){
    const close = m[1] === "/", tag = m[2].toLowerCase(), self = m[3] === "/";
    if (tag.startsWith("!")) continue;
    if (VOID.has(tag) || self) continue;
    if (!close) stack.push(tag);
    else {
      if (!stack.length) { holes.push("बिना-खुले बंद: </"+tag+">"); continue; }
      const top = stack.pop();
      if (top !== tag) holes.push("बेमेल जोड़ी: <"+top+"> … </"+tag+">");
    }
  }
  for (const t of stack) holes.push("खुला रह गया: <"+t+">");
  return holes;
}
function runPy(code, stdin){
  const f = path.join(__dirname, ".pl0_tmp.py");
  fs.writeFileSync(f, code, "utf8");
  try {
    const out = execFileSync("python3", [f], { timeout: 5000, encoding: "utf8",
                 input: (stdin === undefined ? "" : stdin), maxBuffer: 2 * 1024 * 1024,
                 stdio: ["pipe", "pipe", "pipe"] });
    return { ok: true, out };
  } catch (e) {
    // [v1.4] अनंत-लूप पहरा: 5 सेकंड में न रुके (ETIMEDOUT) या output-छत फटे (ENOBUFS)
    if (e.code === "ETIMEDOUT" || e.code === "ENOBUFS")
      return { ok: false, out: "अनंत-लूप पकड़ा — डिब्बा " + (e.code === "ETIMEDOUT" ? "5 सेकंड में नहीं रुका" : "बेहिसाब output (2MB+) देता रहा") + "; लूप की शर्त/गिनती जाँचो" };
    return { ok: false, out: String(e.stderr || e.message).slice(0, 200) };
  } finally { try{ fs.unlinkSync(f); }catch(_){} }
}
const norm = s => String(s).replace(/\s+/g," ").trim();

let fails = 0, codeRun = 0, pyN = 0, htmlN = 0, cssN = 0, inN = 0, multiN = 0;
for (const l of PL0_LESSONS){
  const full = l.sections.map(s => s.h).join("\n");
  const holes = [];

  /* [26-Oct] data-in/data-out attribute में कच्चा < या > नहीं — वह tag को बीच में तोड़ता है
     (पाठ-180: "Sita -> Gita" ने pre-tag के [^>]* पैटर्न को काटा); &lt; / &gt; लिखो */
  if (/data-(in|out)(-\d)?="[^"]*[<>][^"]*"/.test(full))
    holes.push("data-in/out attribute में कच्चा < या > — &lt; / &gt; लिखो");

  /* [26-Oct] शीर्षक/meta में square bracket नहीं (h1, <title>, खोज-snippet में दिखते हैं; छूट सिर्फ़ code-डिब्बों को) */
  for (const k of ["title", "metaTitle", "metaDesc"])
    if (/[\[\]]/.test(String(l[k] || ""))) holes.push(k + " में square bracket — शब्दों में लिखो (code-छूट यहाँ नहीं)");

  /* 4. गारंटी-निषेध */
  const vis = visibleText(full);
  // [v1.6] पूरी निषिद्ध-सूची — उद्धरण में भी (नियम: "दिखे तो fail")
  if (/गारंटी|100%\s*(भविष्य|सही|पक्का)|सौ\s*फ़ीसदी\s*पक्का|सबसे\s*पढ़ने-योग्य/.test(vis))
    holes.push("निषिद्ध भाषा मिली (गारंटी / 100% / सौ फ़ीसदी पक्का / सबसे पढ़ने-योग्य) — उद्धरण में भी नहीं");

  /* 5. ⏱ जाँची-तारीख़ */
  if (l.fast === true && vis.indexOf("जानकारी-जाँची:") === -1)
    holes.push("⏱-पाठ पर 'जानकारी-जाँची:' पंक्ति नहीं");
  // [v1.6] fail-closed: master-सूची के ⏱ पाठ (1.7 = पाठ-7, अध्याय-24 = पाठ 204-218) निशान भूलें, तो भी पकड़ो
  if (MUST_FAST.has(l.num) && l.fast !== true)
    holes.push("master में ⏱ पाठ, पर fast-निशान नहीं — जाँची-पंक्ति की जाँच छूट जाती");

  /* 7. [v1.6] बाहरी कड़ी: नई खिड़की + उसी खंड में "ख़ुद verify करें" नोट (v2.7 कड़ी-नियम) */
  for (const sec of l.sections){
    const ext = [...sec.h.matchAll(/<a\s+href="(https?:[^"]+)"([^>]*)>/g)];
    for (const m of ext)
      if (!/target="_blank"/.test(m[2]) || !/rel="noopener"/.test(m[2]))
        holes.push("बाहरी कड़ी नई खिड़की में नहीं (target/rel): " + m[1]);
    if (ext.length && visibleText(sec.h).indexOf("verify करें") === -1)
      holes.push("खंड '" + sec.t + "' में बाहरी कड़ी है, पर 'ख़ुद verify करें' नोट नहीं");
  }

  /* 1/2/3/6. code-डिब्बे */
  const blocks = [];
  const bre = /<pre class="pl-code"([^>]*)>([\s\S]*?)<\/pre>/g;
  let b; while ((b = bre.exec(full))) blocks.push({ attrs: b[1], raw: b[2], at: b.index });
  if (blocks.length){
    const before = visibleText(full.slice(0, blocks[0].at));
    if (before.indexOf("अंदाज़ा") === -1 && before.indexOf("अंदाज़") === -1)
      holes.push("प्रिम-होल: पहले code-डिब्बे से पहले 'अंदाज़ा लगाओ' नहीं");
  }
  for (const blk of blocks){
    const code = unescapeHtml(blk.raw).trim();
    if (/[\u0900-\u097F]/.test(code)) holes.push("code-लिपि होल: pl-code के भीतर देवनागरी");
    const lang = (blk.attrs.match(/data-lang="([a-z]+)"/) || [])[1] || "";
    codeRun++;
    if (lang === "py"){
      pyN++;
      // [v1.3] कई दौड़ें: data-in/data-out (दौड़-1), data-in-2/data-out-2 … data-in-9/data-out-9
      const runs = [];
      for (const k of ["", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9"]){
        const din = (blk.attrs.match(new RegExp('data-in' + k + '="([^"]*)"')) || [])[1];
        const dout = (blk.attrs.match(new RegExp('data-out' + k + '="([^"]*)"')) || [])[1];
        if (k !== "" && din === undefined && dout === undefined) continue;
        runs.push({ k: k || "-1", din, dout });
      }
      if (runs.some(x => x.din !== undefined)) inN++;
      // [v1.5] random-डिब्बा: data-seed="N" अनिवार्य — robot चलाते समय random.seed(N) आगे जोड़ता है,
      //        ताकि नतीजा पक्का हो (पढ़ने वाले को code बिना seed के दिखता है)
      const seed = (blk.attrs.match(/data-seed="(\d+)"/) || [])[1];
      if (/\brandom\b/.test(code) && seed === undefined)
        holes.push("random-डिब्बा बिना data-seed — नतीजा हर दौड़ में अलग, मिलान असंभव");
      const runCode = seed === undefined ? code : "import random\nrandom.seed(" + seed + ")\n" + code;
      // [v1.3] फ़ैसले वाला डिब्बा (if + input) — कम-से-कम दो दौड़ें, ताकि दोनों राहें जँचें
      if (/(^|\n)\s*if\b/.test(code) && /input\(/.test(code) && runs.length < 2)
        holes.push("if-डिब्बा: सिर्फ़ एक राह जाँची — data-in-2/data-out-2 से दूसरी राह भी चलाओ");
      if (runs.length > 1) multiN++;
      for (const run of runs){
        const r = runPy(runCode, run.din === undefined ? undefined : unescapeHtml(run.din).split("|").join("\n") + "\n");
        if (!r.ok) { holes.push("py-code फेल (दौड़" + run.k + "): " + r.out); continue; }
        if (run.dout !== undefined && norm(unescapeHtml(run.dout)) !== norm(r.out))
          holes.push("py-output बेमेल (दौड़" + run.k + "): चाहिए '"+run.dout+"' मिला '"+norm(r.out)+"'");
      }
    } else if (lang === "html"){
      htmlN++;
      const hb = htmlBalance(code);
      for (const h of hb) holes.push("html-code: " + h);
      for (const h of htmlInnerCss(code)) holes.push("html-code: " + h);
    } else if (lang === "css"){
      cssN++;
      for (const h of cssCheck(code)) holes.push("css-code: " + h);
    } else holes.push("pl-code बिना data-lang (py/html/css)");
  }

  // [v1.4] पाठ-शरीर में कच्चा < (tag नहीं — जैसे "5 < 3", "i <= 5") — &lt; लिखो, वरना tag-जैसा पढ़ा जा सकता है
  for (const sec of (l.sections || [])){
    const raw = String(sec.h || "").match(/<(?![a-zA-Z\/!])/g);   // tag अक्षर, / या ! से ही शुरू होता है
    if (raw) holes.push("पाठ-शरीर (" + sec.t + ") में कच्चा < ×" + raw.length + " — &lt; लिखो");
  }

  if (holes.length){ fails++; console.log("⛔ पाठ-"+l.num+" ("+l.title+")"); holes.forEach(h=>console.log("   • "+h)); }
}

// [v1.4] बने पेजों की meta-पंक्तियाँ साबुत? (26-Oct: 46 पेजों का description कच्चे " से टूटा था)
let metaBad = 0, metaPages = 0;
const pagesDir = path.join(__dirname, "..", "courses", "hi", (PL0_COURSE && PL0_COURSE.slug) || "first-code");
if (fs.existsSync(pagesDir)){
  for (const fn of fs.readdirSync(pagesDir).filter(f => f.endsWith(".html"))){
    metaPages++;
    const t = fs.readFileSync(path.join(pagesDir, fn), "utf8");
    for (const line of t.split("\n")){
      if (/^<meta (name|property)="[^"]+" content="/.test(line) && !/^<meta (name|property)="[^"]+" content="[^"]*"\s*\/?>$/.test(line)){
        metaBad++; console.log("⛔ टूटी meta-पंक्ति: " + fn + " → " + line.slice(0, 80)); break;
      }
    }
  }
  if (metaBad) fails++;
  // [v1.7] कोर्स-विरासत पहरा: दूसरे कोर्स का शब्द पन्ने पर उतनी ही बार, जितना पाठ की अपनी सामग्री में —
  //        ज़्यादा = generator के ढाँचे से रिसाव (वेल्डिंग-विरासत होल, 26-Oct); परिचय-पन्ने पर शून्य
  const FOREIGN = ["वेल्डिंग", "वेल्डर", "Welder", "welding", "सुरक्षा से हुनर"];
  const cnt = (t, w) => t.split(w).length - 1;
  const bySlug = {}; for (const L of PL0_LESSONS) bySlug["pl0-" + String(L.num).padStart(3, "0") + "-" + L.slug + ".html"] = JSON.stringify(L);
  for (const fn of fs.readdirSync(pagesDir).filter(f => f.endsWith(".html"))){
    const t = fs.readFileSync(path.join(pagesDir, fn), "utf8");
    const own = bySlug[fn] !== undefined ? bySlug[fn] : "";
    for (const w of FOREIGN){
      const n = cnt(t, w), o = cnt(own, w);
      if (n > o){ fails++; console.log("⛔ कोर्स-विरासत रिसाव: " + fn + " में '" + w + "' " + n + " बार, पाठ-सामग्री में " + o + " — generator का ढाँचा जाँचो"); }
    }
  }
  // [26-Oct] गिनती-पहरा: बने पाठ-पेज = data के पाठ? (build टूटे तो पुराने पेज बचे रहते हैं — robot चुप न रहे)
  const lessonPages = fs.readdirSync(pagesDir).filter(f => /^pl0-\d{3}-.*\.html$/.test(f)).length;
  if (lessonPages !== PL0_LESSONS.length){
    fails++; console.log("⛔ बने पाठ-पेज " + lessonPages + " · data में पाठ " + PL0_LESSONS.length + " — build टूटा या अधूरा? पहले build चलाओ");
  }
}
console.log("—".repeat(50));
console.log("बने पेज जाँचे (meta-पंक्तियाँ): " + metaPages + " · टूटी: " + metaBad);
console.log("पाठ जाँचे: "+PL0_LESSONS.length+" · code-टुकड़े चले/जाँचे: "+codeRun+" (py "+pyN+" (input-वाले "+inN+", कई-दौड़ "+multiN+") · html "+htmlN+" · css "+cssN+")");
if (fails){ console.log("⛔ FAIL — "+fails+" पाठ में होल"); process.exit(1); }
console.log("🏁 dev_pl_code_check v1.7 — सब पास");
