/* dev_pl0_workbook_check.js v1.0 · 26-Oct-2026 — "पहला कोड" अभ्यास-पुस्तिका का robot (generator से अलग, स्वतंत्र जाँच)
   उपयोग:  WB_OUT=<release-folder> node generator/dev_pl0_workbook_check.js
   जाँचें (fail-closed — कोई एक टूटे, तो FAIL):
   1. manifest: 24 अध्याय-PDF + भाग-गट्ठर + पूरी किताब — सब फ़ाइलें मौजूद, पन्ने > 0
   2. हर अध्याय-PDF के भीतर (pdftotext) उसके सब पाठ "N / 218" — न कम, न दूसरे अध्याय का; उत्तर-पन्ने मौजूद
   3. पूरी किताब में सब 218 पाठ; हर भाग-गट्ठर में उसके अध्यायों के सब पाठ
   4. छपाई-HTML: CSS में कोई font-size 16px से कम नहीं; code-डिब्बों के बाहर square bracket नहीं; निषिद्ध भाषा नहीं;
      हर पाठ का पन्ना ठीक एक बार; ⏱ पाठों (master) पर जाँची-तारीख़ छपी
   5. 🔮 Python-उत्तर स्वतंत्र दोबारा: छपे code को असली python3 से चलाओ — पाठ के robot-data (data-out) से मिलान
   6. download-पेज: हर PDF की release-कड़ी, नई खिड़की, menu टेम्पलेट से, 16px से छोटा अक्षर नहीं */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const { PL0_COURSE: C, PL0_LESSONS: LS } = require("./data/pl0_lessons_data.js");
const OUT = path.join(process.env.WB_OUT || path.join(ROOT, "..", "workbook-release"), C.slug);
const TAG = "workbook-" + C.slug, RB = "https://github.com/acsbabita111/acslearn/releases/download/" + TAG + "/";
const MUST_FAST = new Set([7, ...Array.from({ length: 15 }, (_, i) => 204 + i)]);
let fails = 0; const bad = m => { fails++; console.log("⛔ " + m); };
const unesc = s => String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x([0-9a-fA-F]+);/g, (m, h) => String.fromCharCode(parseInt(h, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d)).replace(/&amp;/g, "&");
const norm = s => String(s).split(/\s+/).filter(Boolean).join(" ");
const pdfText = f => { if (!fs.existsSync(f)) return ""; try { return cp.execFileSync("pdftotext", ["-layout", f, "-"], { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] }); } catch (e) { bad("PDF पढ़ी नहीं गई: " + path.basename(f)); return ""; } }; /* ग़ायब/टूटी PDF = होल गिनो, robot न गिरे */
const nums = t => new Set([...t.matchAll(/(\d{1,3})\s*\/\s*218/g)].map(m => +m[1]));

/* 1 */
const mf = JSON.parse(fs.readFileSync(path.join(OUT, "manifest.json"), "utf8"));
const ad = mf.filter(f => f.group === "adhyay");
if (ad.length !== C.parts.length) bad("अध्याय-PDF " + ad.length + " ≠ " + C.parts.length);
for (const f of mf) { const p = path.join(OUT, f.file); if (!fs.existsSync(p) || f.pages < 1) bad("PDF नहीं/ख़ाली: " + f.file); }
/* 2 */
for (const ch of C.parts) {
  const f = ad.find(x => x.ch === ch.no); if (!f) { bad("अध्याय-" + ch.no + " की PDF नहीं"); continue; }
  const t = pdfText(path.join(OUT, f.file)); const got = nums(t);
  for (let n = ch.from; n <= ch.to; n++) if (!got.has(n)) bad(f.file + ": पाठ-" + n + " नहीं मिला");
  for (const n of got) if (n < ch.from || n > ch.to) bad(f.file + ": दूसरे अध्याय का पाठ-" + n);
  if (t.indexOf("उत्तर-पन्ने") < 0) bad(f.file + ": उत्तर-पन्ने नहीं");
}
/* 3 */
const full = mf.find(f => f.file === "poori-kitab.pdf");
if (!full) bad("पूरी किताब नहीं"); else { const g = nums(pdfText(path.join(OUT, full.file))); for (const L of LS) if (!g.has(L.num)) bad("पूरी किताब में पाठ-" + L.num + " नहीं"); }
for (const b of C.bhag.filter(b => b.chTo > b.chFrom)) {
  const f = mf.find(x => x.file === "bhag-" + b.key + ".pdf"); if (!f) { bad("भाग-" + b.key + " गट्ठर नहीं"); continue; }
  const g = nums(pdfText(path.join(OUT, f.file)));
  for (const ch of C.parts.filter(p => p.no >= b.chFrom && p.no <= b.chTo)) for (let n = ch.from; n <= ch.to; n++) if (!g.has(n)) bad(f.file + ": पाठ-" + n + " नहीं");
}
/* 4 + 5 */
const htmlDir = path.join(OUT, "_html"); let pyChecked = 0, pagesSeen = 0;
const byCode = new Map();
for (const L of LS) for (const s of L.sections) for (const m of s.h.matchAll(/<pre class="pl-code"([^>]*)>([\s\S]*?)<\/pre>/g)) {
  const a = m[1]; if (!/data-lang="py"/.test(a)) continue;
  byCode.set(L.num + "|" + unesc(m[2]).replace(/\n+$/, ""), { seed: (a.match(/data-seed="(\d+)"/) || [])[1], din: (a.match(/data-in="([^"]*)"/) || [])[1], dout: (a.match(/data-out="([^"]*)"/) || [])[1] });
}
for (const fn of fs.readdirSync(htmlDir).filter(f => f.endsWith(".html"))) {
  const h = fs.readFileSync(path.join(htmlDir, fn), "utf8");
  for (const m of h.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) if (+m[1] < 16) bad(fn + ": font-size " + m[1] + "px — 16 से कम");
  const vis = h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<pre[\s\S]*?<\/pre>/g, " ").replace(/<[^>]+>/g, " ");
  if (/[\[\]]/.test(vis)) bad(fn + ": code-डिब्बे के बाहर square bracket");
  if (/गारंटी|100%\s*(भविष्य|सही|पक्का)|सौ\s*फ़ीसदी\s*पक्का|सबसे\s*पढ़ने-योग्य/.test(vis)) bad(fn + ": निषिद्ध भाषा");
  for (const m of h.matchAll(/<section class="lesson" id="p(\d+)">([\s\S]*?)<\/section>/g)) {
    pagesSeen++; const n = +m[1], body = m[2];
    if (MUST_FAST.has(n) && body.indexOf("जानकारी-जाँची:") < 0) bad("पाठ-" + n + ": ⏱ पाठ पर जाँची-तारीख़ नहीं छपी");
    const pm = body.match(/🔮 अंदाज़ा-पर्ची — पहले काग़ज़, फिर फ़ोन<\/h3>[\s\S]*?<pre>([\s\S]*?)<\/pre>/);
    if (pm) {
      const code = unesc(pm[1]); const ref = byCode.get(n + "|" + code);
      if (!ref) { bad("पाठ-" + n + ": छपा code पाठ में हूबहू नहीं मिला"); continue; }
      const pre = ref.seed === undefined ? "" : "import random\nrandom.seed(" + ref.seed + ")\n";
      const stdin = ref.din === undefined ? "" : unesc(ref.din).split("|").join("\n") + "\n";
      const r = cp.spawnSync("python3", ["-c", pre + code], { input: stdin, encoding: "utf8", timeout: 8000 });
      if (r.status !== 0 || norm(r.stdout) !== norm(unesc(ref.dout || ""))) bad("पाठ-" + n + ": 🔮 उत्तर पाठ के robot-data से बेमेल");
      pyChecked++;
    }
  }
}
if (pagesSeen !== C.totalLessons) bad("छपाई-HTML में पाठ-पन्ने " + pagesSeen + " ≠ " + C.totalLessons);
/* 6 */
const pg = fs.readFileSync(path.join(ROOT, "courses/hi", C.slug, "workbook/index.html"), "utf8");
for (const f of mf) { const href = RB + f.file; if (pg.indexOf('href="' + href + '" download target="_blank" rel="noopener"') < 0) bad("download-पेज पर कड़ी नहीं/नई खिड़की नहीं: " + f.file); }
if (pg.indexOf('class="acs-mitem"') < 0) bad("download-पेज पर menu (links.js) नहीं");
for (const m of pg.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) if (+m[1] < 16) bad("download-पेज: font-size " + m[1] + "px");
console.log("—".repeat(50));
console.log("PDF जाँचे: " + mf.length + " · अध्याय " + ad.length + " · पाठ-पन्ने " + pagesSeen + " · 🔮 Python-उत्तर दोबारा चलाकर मिलाए: " + pyChecked);
if (fails) { console.log("⛔ FAIL — " + fails + " होल"); process.exit(1); }
console.log("🏁 dev_pl0_workbook_check v1.0 — सब पास");
