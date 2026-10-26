/* build_pl0_workbook.js v1.0 · 26-Oct-2026 — "पहला कोड" अभ्यास-पुस्तिका (Workbook) · परत-4
   स्रोत (एक घर): generator/data/pl0_lessons_data.js — हर सवाल पाठ से अपने-आप; हाथ से लिखा कोई सवाल नहीं।
   ढाँचा (KKB build_workbook.js की परंपरा): छपाई Chromium से (playwright, python) — देवनागरी-आकार सिर्फ़ Chromium (v1.5 लोहे का नियम);
     PDF repo में नहीं — GitHub Release "workbook-first-code" में (Founder-फ़ैसला 14-Sep "रिलीज़ में ही डालो"); repo में सिर्फ़ download-पेज।
   हर पाठ = नया पन्ना: 🎯 उद्देश्य-सूची · 🔮 अंदाज़ा-पर्ची (PRIMM "Predict" पर आधारित/प्रेरित) · ✍️ पाठ के अपने अभ्यास-खेल + लिखने की लाइनें · 💡 ग़लतफ़हमी-जाँच
   हर अध्याय के अंत में ✅ उत्तर-पन्ने — Python-उत्तर असली python3 से (फ़ोन जैसी जवाब-लिखावट), robot-data से मिलान अनिवार्य।
   स्याही-बचत: code-डिब्बे हल्की पृष्ठभूमि पर (दुकान पर छपाई सस्ती)। फ़ॉन्ट 16px से नीचे कहीं नहीं (ACS नियम)।
   निकास: RELEASE_OUT/first-code/adhyay-NN.pdf (24) · bhag-A/B/C.pdf · poori-kitab.pdf ; repo: courses/hi/first-code/workbook/index.html */
const fs = require("fs"), path = require("path"), cp = require("child_process"), os = require("os");
const ROOT = path.join(__dirname, "..");
const VER = "1.0";
const { PL0_COURSE: C, PL0_LESSONS: LS } = require("./data/pl0_lessons_data.js");
const RELEASE_BASE = "https://github.com/acsbabita111/acslearn/releases/download";
const TAG = "workbook-" + C.slug;
const RELEASE_OUT = path.join(process.env.WB_OUT || path.join(ROOT, "..", "workbook-release"), C.slug);
const PAGES_ONLY = !!process.env.WB_PAGES_ONLY;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unesc = s => String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#x([0-9a-fA-F]+);/g, (m, h) => String.fromCharCode(parseInt(h, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d)).replace(/&amp;/g, "&");
const norm = s => String(s).split(/\s+/).filter(Boolean).join(" ");
const sec = (L, pre) => L.sections.find(s => s.t.startsWith(pre));
const chapterOf = n => C.parts.find(p => n >= p.from && n <= p.to);
const FAIL = []; const fail = m => FAIL.push(m);

/* ---- पाठ से सवाल निकालना ---- */
function objectives(L) {
  const s = sec(L, "सीखने का उद्देश्य"); if (!s) { fail("पाठ-" + L.num + ": उद्देश्य नहीं"); return []; }
  return [...s.h.matchAll(/<p>\s*\d\.\s*([\s\S]*?)<\/p>/g)].map(m => m[1].trim());
}
function cleanPara(h) { /* छपाई के लिए: कड़ी का पाठ रखो, कड़ी नहीं; svg नहीं */
  return h.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, "$1").trim();
}
function practice(L) {
  const s = L.sections.find(x => x.t.startsWith("अभ्यास")); if (!s) { fail("पाठ-" + L.num + ": अभ्यास-खेल नहीं"); return { t: "", ps: [] }; }
  const ps = [...s.h.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => cleanPara(m[1])).filter(x => x.replace(/<[^>]+>/g, "").trim().length > 8);
  if (!ps.length) fail("पाठ-" + L.num + ": अभ्यास में पैराग्राफ़ नहीं");
  return { t: s.t, ps };
}
function misconception(L) {
  const s = sec(L, "ग़लतफ़हमी तोड़ो"); if (!s) { fail("पाठ-" + L.num + ": ग़लतफ़हमी-खंड नहीं"); return null; }
  const st = s.h.match(/<p><b>ग़लतफ़हमी:<\/b>\s*([\s\S]*?)<\/p>/);
  const ps = [...s.h.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => m[1]); const last = ps[ps.length - 1] || "";
  const bl = [...last.matchAll(/<b>([^<]{30,})<\/b>/g)].map(m => m[1].trim());
  const sents = last.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().split(/(?<=[।?!])\s+/).filter(x => x.length > 15);
  const a = bl.length ? bl[bl.length - 1] : (sents[sents.length - 1] || "");
  if (st && /<b>सच:<\/b>/.test(s.h) && a) return { std: true, q: cleanPara(st[1]), a: esc(a) };
  return { std: false, q: "", a: "" }; /* अलग ढाँचा (पाठ 1, 2, 5, 7) — पाठ का हिस्सा पढ़कर अपने शब्दों में */
}
function codeBlocks(L) {
  const all = L.sections.map(s => s.h).join("\n"); const out = [];
  for (const m of all.matchAll(/<pre class="pl-code"([^>]*)>([\s\S]*?)<\/pre>/g)) {
    const attrs = m[1], code = unesc(m[2]);
    const lang = (attrs.match(/data-lang="(\w+)"/) || [])[1];
    const seed = (attrs.match(/data-seed="(\d+)"/) || [])[1];
    const din = (attrs.match(/data-in="([^"]*)"/) || [])[1];
    const dout = (attrs.match(/data-out="([^"]*)"/) || [])[1];
    out.push({ lang, seed, din: din === undefined ? undefined : unesc(din), dout: dout === undefined ? undefined : unesc(dout), code, lines: code.replace(/\n+$/, "").split("\n").length });
  }
  return out;
}
function runPy(code, seed, stdin, echo) {
  let pre = seed === undefined ? "" : "import random\nrandom.seed(" + seed + ")\n";
  if (echo) pre += "import builtins as _b\n_ri=_b.input\ndef _ei(p=''):\n    print(p, end='')\n    v=_ri()\n    print(v)\n    return v\n_b.input=_ei\n";
  const r = cp.spawnSync("python3", ["-c", pre + code], { input: stdin || "", encoding: "utf8", timeout: 8000 });
  if (r.status !== 0) return { ok: false, out: (r.stderr || "").trim().split("\n").slice(-1)[0] };
  return { ok: true, out: r.stdout.replace(/\s+$/, "") };
}
function predictTask(L) {
  const bl = codeBlocks(L);
  const py = bl.filter(b => b.lang === "py" && b.dout !== undefined && b.dout.trim() !== "");
  const fit = py.filter(b => b.lines <= 18);
  const pick = (fit.length ? fit : py.slice().sort((a, b) => a.lines - b.lines))[0];
  if (pick) {
    const stdin = pick.din === undefined ? "" : pick.din.split("|").join("\n") + "\n";
    const plain = runPy(pick.code, pick.seed, stdin, false), echo = runPy(pick.code, pick.seed, stdin, true);
    if (!plain.ok || !echo.ok) fail("पाठ-" + L.num + ": अंदाज़ा-code नहीं चला — " + (plain.out || echo.out));
    else if (norm(plain.out) !== norm(pick.dout)) fail("पाठ-" + L.num + ": उत्तर पाठ के robot-data से बेमेल — '" + norm(plain.out).slice(0, 60) + "' बनाम '" + norm(pick.dout).slice(0, 60) + "'");
    return { kind: "py", code: pick.code, seed: pick.seed, inputs: pick.din === undefined ? null : pick.din.split("|"), answer: echo.out, outLines: echo.out.split("\n").length };
  }
  const html = bl.filter(b => b.lang === "html").sort((a, b) => a.lines - b.lines)[0];
  if (html && html.lines <= 22) return { kind: "html", code: html.code };
  return { kind: "soch" };
}
const FAST_DATE = L => { const t = L.sections.map(s => s.h).join(" ").replace(/<[^>]+>/g, " "); const m = t.match(/जानकारी-जाँची:\s*([^\s—.।]+\s+\d{4})/); return m ? m[1] : null; };

/* ---- छपाई-HTML ---- */
const CSS = `@page{size:A4;margin:11mm 12mm}
*{box-sizing:border-box}
body{font-family:'Noto Sans Devanagari','Noto Sans',sans-serif;color:#0B1F3A;margin:0;font-size:19px;line-height:1.5}
b{font-weight:800}
.cover{break-after:page;text-align:center;padding-top:10mm}
.cover .org{font-size:22px;font-weight:800}.cover h1{font-size:38px;margin:6px 0;line-height:1.25}
.cover .big{font-size:72px;font-weight:900;color:#F9A825;line-height:1.05;margin:4mm 0}
.cover h2{font-size:28px;color:#1565C0;margin:2mm 0 4mm;line-height:1.3}
.rule{font-size:21px;line-height:1.5;background:#FFF8E1;border:3px solid #F9A825;border-radius:14px;padding:10px 16px;margin:5mm 0;text-align:left}
.who{display:grid;grid-template-columns:1fr 1fr;gap:4mm;text-align:left;font-size:21px;margin:5mm 0}
.who div{border-bottom:2px solid #0B1F3A;padding:6mm 0 1mm}
.toc{text-align:left;font-size:18px;columns:2;column-gap:8mm;margin-top:4mm}.toc p{margin:0 0 2mm;break-inside:avoid}
.lesson{break-before:page}
.lhead{display:flex;justify-content:space-between;align-items:flex-start;gap:4mm;border-bottom:4px solid #F9A825;padding-bottom:2mm;margin-bottom:3mm}
.lhead .n{font-size:18px;font-weight:800;color:#1565C0;white-space:nowrap}
.lhead .t{font-size:25px;font-weight:800;line-height:1.3}
.lhead .ch{font-size:16px;color:#334155}
.fast{display:inline-block;font-size:16px;font-weight:800;border:2px solid #1565C0;color:#1565C0;border-radius:8px;padding:0 8px;margin-top:2px}
.done{font-size:18px;white-space:nowrap;border:2px dashed #94A3B8;border-radius:10px;padding:2px 8px}
h3{font-size:21px;margin:3mm 0 1.5mm;color:#0B1F3A;border-left:6px solid #2E7D32;padding-left:8px;break-after:avoid}
.obj p{margin:1mm 0;font-size:19px}
.task{break-inside:avoid;margin-bottom:2mm}
.task p{margin:1mm 0;font-size:19px}
.ln{height:9.5mm;border-bottom:2px dashed #94A3B8}
.box{height:48mm;border:2px dashed #94A3B8;border-radius:12px;margin:2mm 0}
pre{font-family:'Noto Sans Mono',monospace;font-size:18px;line-height:1.45;background:#F5F7FA;color:#0B1F3A;border:2px solid #0B1F3A;border-left:8px solid #1565C0;border-radius:10px;padding:3mm 4mm;margin:2mm 0;white-space:pre-wrap;overflow-wrap:anywhere;break-inside:avoid}
.inp{font-size:19px;background:#FFF8E1;border-radius:8px;padding:1mm 3mm;display:inline-block}
.chk{font-size:19px;margin:2mm 0}
.note{font-size:16px;color:#334155}
.ans{break-before:page}.ans h2{font-size:30px;border-bottom:4px solid #2E7D32;margin:0 0 2mm}
.arow{break-inside:avoid;border-bottom:1px solid #94A3B8;padding:2mm 0}
.arow .k{font-size:18px;font-weight:800;color:#1565C0}
.arow pre{font-size:17px;border-left-color:#2E7D32}
.arow p{font-size:18px;margin:1mm 0}
.foot{font-size:16px;color:#334155;text-align:center;margin-top:5mm}`;

function lines(n) { return '<div class="ln"></div>'.repeat(n); }
function lessonHTML(L) {
  const ch = chapterOf(L.num); const fd = L.fast ? FAST_DATE(L) : null;
  let h = `<section class="lesson" id="p${L.num}"><div class="lhead"><div><div class="n">पाठ-${L.num} / ${C.totalLessons}</div><div class="t">${esc(L.title)}</div><div class="ch">${C.partLabel}-${ch.no}: ${esc(ch.name)}</div>${fd ? `<span class="fast">⏱ जानकारी-जाँची: ${esc(fd)} — छपी जानकारी पुरानी हो सकती है, फ़ोन पर ताज़ा पाठ देखो</span>` : ""}</div><div class="done">☐ पूरा किया · तारीख़: ____</div></div>`;
  const ob = objectives(L);
  h += `<h3>🎯 मैं यह कर पाया / पाई (✔ लगाओ)</h3><div class="obj">` + ob.map(o => `<p>☐ ${cleanPara(o)}</p>`).join("") + `</div>`;
  const P = predictTask(L); L.__P = P;
  if (P.kind === "py") {
    h += `<div class="task"><h3>🔮 अंदाज़ा-पर्ची — पहले काग़ज़, फिर फ़ोन</h3><p>यह code पढ़ो। <b>चलाने से पहले</b> सोचो — परदे पर क्या आएगा? नीचे लिखो।</p><pre>${esc(P.code.replace(/\n+$/, ""))}</pre>`;
    if (P.inputs) h += `<p class="inp">मान लो सवाल आने पर आपने बारी-बारी लिखा: <b>${P.inputs.map(esc).join(" → ")}</b></p>`;
    if (P.seed !== undefined) h += `<p class="note">(इसमें random है — फ़ोन पर अंक अलग आ सकते हैं; उत्तर-पन्ने वाला नतीजा एक तय बीज से है, ढंग मिलाओ।)</p>`;
    h += lines(Math.min(Math.max(P.outLines, 2), 7)) + `<p class="chk">फिर फ़ोन पर चलाकर मिलाओ: ☐ मेरा अंदाज़ा सही निकला &nbsp; ☐ अलग निकला — क्यों? ______________________</p></div>`;
  } else if (P.kind === "html") {
    h += `<div class="task"><h3>🔮 अंदाज़ा-पर्ची — यह पन्ना कैसा दिखेगा?</h3><p>यह HTML पढ़ो। ब्राउज़र में खोलने से <b>पहले</b> नीचे के डिब्बे में चित्र बनाओ — क्या, कहाँ, कितना बड़ा।</p><pre>${esc(P.code.replace(/\n+$/, ""))}</pre><div class="box"></div><p class="chk">फिर फ़ोन के ब्राउज़र में खोलकर मिलाओ: ☐ मिलता है &nbsp; ☐ अलग — क्या अलग? ______________________</p></div>`;
  } else {
    h += `<div class="task"><h3>🧠 अपने शब्दों में</h3><p>इस पाठ की सबसे बड़ी बात — अपने शब्दों में:</p>${lines(2)}<p>अपने घर या गाँव का एक उदाहरण जहाँ यह बात दिखती है:</p>${lines(2)}</div>`;
  }
  const M = misconception(L); L.__M = M;
  if (M && M.std) h += `<div class="task"><h3>💡 ग़लतफ़हमी-जाँच</h3><p><b>ग़लतफ़हमी:</b> ${M.q}</p><p>सच क्या है? अपने शब्दों में लिखो (फिर उत्तर-पन्ने से मिलाओ):</p>${lines(2)}</div>`;
  else h += `<div class="task"><h3>💡 ग़लतफ़हमी-जाँच</h3><p>पाठ का "ग़लतफ़हमी तोड़ो" हिस्सा पढ़ो। उसकी ग़लतफ़हमी और उसका सच — अपने शब्दों में लिखो:</p>${lines(3)}</div>`;
  const pr = practice(L);
  h += `<h3>✍️ ${esc(pr.t)} <span class="note">(बड़े जवाब अपनी कॉपी में)</span></h3>` + pr.ps.map(p => `<div class="task"><p>${p}</p>${lines(2)}</div>`).join("");
  return h + `</section>`;
}
function answerHTML(Ls) {
  let h = `<section class="ans"><h2>✅ उत्तर-पन्ने — पहले ख़ुद करो, फिर मिलाओ</h2><p class="note">Python के उत्तर असली चलाकर निकाले गए हैं — फ़ोन पर भी ऐसा ही दिखना चाहिए। आपका लिखा जवाब सवाल के ठीक बाद दिखता है। "अपने शब्दों में" वाले काम का कोई एक सही उत्तर नहीं — पाठ से मिलाओ।</p>`;
  for (const L of Ls) {
    const P = L.__P, M = L.__M;
    h += `<div class="arow"><div class="k">पाठ-${L.num}: ${esc(L.title)}</div>`;
    if (P.kind === "py") h += `<p>🔮 परदे पर:</p><pre>${esc(P.answer)}</pre>`;
    else if (P.kind === "html") h += `<p>🔮 फ़ोन के ब्राउज़र में खोलकर अपने चित्र से मिलाओ (पाठ-${L.num} में इसका पूरा ब्योरा है)।</p>`;
    else h += `<p>🧠 अपना उत्तर — पाठ-${L.num} दोबारा पढ़कर मिलाओ।</p>`;
    if (M && M.std) h += `<p>💡 सच का निचोड़: <b>${M.a}</b> (पूरा सच — पाठ-${L.num})</p>`; else h += `<p>💡 सच: पाठ-${L.num} का "ग़लतफ़हमी तोड़ो" हिस्सा देखो।</p>`;
    h += `</div>`;
  }
  return h + `</section>`;
}
function coverHTML(title, big, sub, Ls) {
  return `<section class="cover"><p class="org">अप्लाइड कंप्यूटर स्कूल™ · ACS · ${esc(C.title)}</p><h1>अभ्यास-पुस्तिका (Workbook)</h1><div class="big">${esc(big)}</div><h2>${esc(sub)}</h2>
<div class="rule">✍️ <b>हर पाठ के चार कदम:</b> (1) फ़ोन पर पाठ पढ़ो → (2) इस पुस्तिका में 🔮 अंदाज़ा <b>पहले काग़ज़ पर</b> → (3) फ़ोन पर चलाकर मिलाओ → (4) अभ्यास-खेल हाथ से, फिर ☐ पर ✔। उत्तर-पन्ने अंत में — पहले ख़ुद करो।</div>
<div class="who"><div>मेरा नाम:</div><div>शुरू किया (तारीख़):</div><div>गाँव / स्कूल:</div><div>पूरा किया (तारीख़):</div></div>
<div class="toc">${Ls.map(L => `<p>☐ पाठ-${L.num}: ${esc(L.title)}</p>`).join("")}</div>
<p class="note" style="margin-top:5mm">मूल भाषा: हिंदी · मुफ़्त · acslearn.com/courses/hi/${C.slug}/ · छपाई: A4 · ${esc(title)}</p></section>`;
}
const doc = body => `<!DOCTYPE html><html lang="hi"><head><meta charset="UTF-8"><title>workbook</title><style>${CSS}</style></head><body>${body}<p class="foot">ACS · ${esc(C.title)} · अभ्यास-पुस्तिका · अप्लाइड कंप्यूटर स्कूल™ · FFGPMTrust · मूल भाषा: हिंदी · generator: build_pl0_workbook.js v${VER}</p></body></html>`;

/* ---- PDF (playwright, python) + गट्ठर (pypdf) ---- */
function runPython(py, arg) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pl0wb-")); const f = path.join(tmp, "run.py"); fs.writeFileSync(f, py);
  const r = cp.spawnSync("python3", [f, arg], { encoding: "utf8", maxBuffer: 1 << 26 }); if (r.status !== 0) throw new Error("python fail: " + (r.stderr || "").slice(-500)); return r.stdout;
}
function htmlToPdf(jobs) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pl0wbj-"));
  const list = jobs.map((j, i) => { const f = path.join(tmp, "j" + i + ".html"); fs.writeFileSync(f, j.html, "utf8"); return [f, j.pdf]; });
  fs.writeFileSync(path.join(tmp, "jobs.json"), JSON.stringify(list));
  runPython(`import json,sys
from playwright.sync_api import sync_playwright
jobs=json.load(open(sys.argv[1]))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    for html,pdf in jobs:
        pg.goto('file://'+html,wait_until='load'); pg.evaluate('document.fonts.ready'); pg.emulate_media(media='print'); pg.pdf(path=pdf,format='A4',print_background=True,prefer_css_page_size=True)
    b.close()
print('ok',len(jobs))`, path.join(tmp, "jobs.json"));
}
function mergePdf(parts, out) {
  runPython(`import json,sys
from pypdf import PdfWriter, PdfReader
a=json.load(open(sys.argv[1])); w=PdfWriter()
for f in a['in']:
    for pg in PdfReader(f).pages: w.add_page(pg)
with open(a['out'],'wb') as o: w.write(o)
print('ok')`, (() => { const f = path.join(os.tmpdir(), "pl0merge-" + path.basename(out) + ".json"); fs.writeFileSync(f, JSON.stringify({ in: parts, out })); return f; })());
}
function pageCount(f) { return +runPython(`import sys\nfrom pypdf import PdfReader\nprint(len(PdfReader(sys.argv[1]).pages))`, f).trim(); }

/* ---- download-पेज (universal टेम्पलेट) ---- */
function downloadPage(files) {
  const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8"); const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  const MENU = box.__L.menu.map(m => '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>").join("\n");
  const base = RELEASE_BASE + "/" + TAG + "/";
  const card = (f) => `<a class="wb-card" href="${base}${f.file}" download target="_blank" rel="noopener"><span class="wb-ic">${f.icon}</span><span class="wb-t">${esc(f.title)}</span><span class="wb-s">${esc(f.sub)} · ${f.pages} पन्ने · ${f.kb} KB · PDF</span><span class="wb-dl">⬇️ छूकर download</span></a>`;
  const g = k => files.filter(f => f.group === k).map(card).join("");
  const pageBase = "/courses/hi/" + C.slug + "/workbook/";
  const h = `<article class="wb-wrap"><p class="wb-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="/courses/hi/${C.slug}/">${esc(C.title)}</a> › अभ्यास-पुस्तिका</p>
<h1>${esc(C.title)} — अभ्यास-पुस्तिका (छपने-योग्य PDF)</h1>
<p class="wb-lead">फ़ोन पर पढ़ो, काग़ज़ पर सोचो। हर पाठ का अपना पन्ना — 🔮 अंदाज़ा-पर्ची (पहले काग़ज़ पर, फिर फ़ोन पर चलाकर मिलाओ), पाठ के अभ्यास-खेल लिखने की लाइनों के साथ, और ग़लतफ़हमी-जाँच। हर अध्याय के अंत में उत्तर-पन्ने। दुकान पर छपवाओ (A4) या फ़ोन में रखो।</p>
<div class="wb-rule">✍️ हर पाठ के चार कदम: पढ़ो → पहले काग़ज़ पर अंदाज़ा → फ़ोन पर मिलाओ → खेल हाथ से, ☐ पर ✔।</div>
<h2>📚 भाग-वार (एक साथ कई अध्याय)</h2><div class="wb-grid">${g("bhag")}</div>
<h2>📘 अध्याय-वार (छोटी किताब — एक-एक अध्याय)</h2><div class="wb-grid">${g("adhyay")}</div>
<p class="wb-note">मूल भाषा: हिंदी · यह अभ्यास-पुस्तिका मुफ़्त है। Python के उत्तर असली चलाकर निकाले गए हैं। ⏱ वाले पाठ (7 और 204-218) की जानकारी समय के साथ बदल सकती है — छपी प्रति पर तारीख़ लिखी है, ताज़ा जानकारी फ़ोन वाले पाठ पर देखें। प्रमाणपत्र कोर्स की परीक्षा से मिलता है, इस पुस्तिका से नहीं।</p></article>`;
  const css = `<style>.wb-wrap{max-width:820px;margin:0 auto;padding:12px 14px 40px;background:#F5F7FA;color:#0B1F3A;border-radius:14px;font-size:19px;line-height:1.7}.wb-crumb{font-size:16px;color:#1565C0}.wb-crumb a{color:#1565C0;text-decoration:none}.wb-wrap h1{font-size:26px;line-height:1.35}.wb-wrap h2{font-size:22px;margin:22px 0 8px;border-left:6px solid #F9A825;padding-left:10px}.wb-lead{font-size:19px}.wb-rule{font-size:20px;background:#FFF5D6;border:3px solid #F9A825;border-radius:14px;padding:10px 14px;font-weight:700}.wb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}.wb-card{display:flex;flex-direction:column;gap:4px;background:#fff;border:2px solid #0B1F3A;border-radius:14px;padding:12px;text-decoration:none;color:#0B1F3A}.wb-ic{font-size:34px}.wb-t{font-size:20px;font-weight:800}.wb-s{font-size:16px;color:#334155}.wb-dl{margin-top:4px;font-size:18px;font-weight:800;color:#fff;background:#2E7D32;border-radius:10px;padding:8px 10px;text-align:center}.wb-note{font-size:16px;color:#334155;margin-top:14px}</style>`;
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->"; const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page = TPL.slice(0, a + S.length) + "\n" + h + "\n" + TPL.slice(b);
  const title = "पहला कोड अभ्यास-पुस्तिका — मुफ़्त PDF, हर पाठ के अभ्यास और उत्तर";
  const desc = "पहला कोड के " + C.totalLessons + " पाठों की छपने-योग्य अभ्यास-पुस्तिका — " + files.filter(f => f.group === "adhyay").length + " अध्याय-वार PDF, हर पाठ की अंदाज़ा-पर्ची, अभ्यास-खेल और असली चलाकर निकाले उत्तर। मुफ़्त।";
  const url = "https://acslearn.com" + pageBase;
  page = page.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(title) + "</title>\n<meta name=\"description\" content=\"" + esc(desc) + "\">\n<meta name=\"robots\" content=\"index, follow\">\n<link rel=\"canonical\" href=\"" + url + "\">\n<meta property=\"og:title\" content=\"" + esc(title) + "\">\n<meta property=\"og:description\" content=\"" + esc(desc) + "\">\n<meta property=\"og:url\" content=\"" + url + "\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:image\" content=\"https://acslearn.com/assets/og/" + C.slug + ".png\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">\n<meta property=\"og:locale\" content=\"hi_IN\">\n<meta property=\"og:site_name\" content=\"Applied Computer School (ACS)\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"" + esc(title) + "\">\n<meta name=\"twitter:description\" content=\"" + esc(desc) + "\">\n<meta name=\"twitter:image\" content=\"https://acslearn.com/assets/og/" + C.slug + ".png\">\n<link rel=\"alternate\" hreflang=\"hi\" href=\"" + url + "\">\n<link rel=\"alternate\" hreflang=\"x-default\" href=\"" + url + "\">\n<script type=\"application/ld+json\">" + JSON.stringify({ "@context": "https://schema.org", "@type": "LearningResource", "name": C.title + " अभ्यास-पुस्तिका (Workbook)", "description": desc, "inLanguage": "hi", "learningResourceType": "Workbook", "isAccessibleForFree": true, "educationalLevel": "Beginner", "image": "https://acslearn.com/assets/og/" + C.slug + ".png", "isPartOf": { "@type": "Course", "@id": "https://acslearn.com/courses/hi/" + C.slug + "/#course", "name": C.title }, "url": url, "provider": { "@type": "Organization", "name": "Applied Computer School", "url": "https://acslearn.com/" } }).replace(/</g, "\\u003c") + "</scr" + "ipt>");
  page = page.replace("</head>", css + "\n</head>").replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU + "\n</div>").replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_pl0_workbook.js v" + VER + ") — हाथ से न बदलें -->");
  const dir = path.join(ROOT, pageBase.slice(1)); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page, "utf8");
}

/* ---- build ---- */
fs.mkdirSync(RELEASE_OUT, { recursive: true });
const pad2 = n => String(n).padStart(2, "0");
const htmlDir = path.join(RELEASE_OUT, "_html"); fs.mkdirSync(htmlDir, { recursive: true });
const jobs = [], files = [], BODIES = {};
for (const ch of C.parts) {
  const Ls = LS.filter(L => L.num >= ch.from && L.num <= ch.to);
  if (Ls.length !== ch.to - ch.from + 1) fail(C.partLabel + "-" + ch.no + ": पाठ अधूरे (" + Ls.length + ")");
  const body = coverHTML(C.partLabel + "-" + ch.no, C.partLabel + "-" + ch.no, ch.name + " · पाठ " + ch.from + "-" + ch.to, Ls) + Ls.map(lessonHTML).join("") + answerHTML(Ls);
  BODIES[ch.no] = body; const html = doc(body); const file = "adhyay-" + pad2(ch.no) + ".pdf";
  fs.writeFileSync(path.join(htmlDir, "adhyay-" + pad2(ch.no) + ".html"), html, "utf8");
  jobs.push({ html, pdf: path.join(RELEASE_OUT, file) });
  files.push({ group: "adhyay", file, icon: "📘", title: C.partLabel + "-" + ch.no + ": " + ch.name.replace(/\s*\([^)]*\)/g, ""), sub: "पाठ " + ch.from + "-" + ch.to, path: path.join(RELEASE_OUT, file), ch: ch.no });
}
/* फ़ेल-बंद: हर सवाल ठीक बना हो, तभी छपाई */
const seen = new Set(); for (const L of LS) { if (!L.__P) fail("पाठ-" + L.num + ": पुस्तिका में नहीं"); seen.add(L.num); }
if (seen.size !== C.totalLessons) fail("पाठ-गिनती " + seen.size + " ≠ " + C.totalLessons);
if (FAIL.length) { console.log("⛔ पुस्तिका नहीं छपी — " + FAIL.length + " होल:\n  " + FAIL.slice(0, 30).join("\n  ")); process.exit(1); }
const kinds = LS.reduce((a, L) => (a[L.__P.kind] = (a[L.__P.kind] || 0) + 1, a), {});
console.log("सवाल बने: 218 पाठ · अंदाज़ा-पर्ची py " + (kinds.py || 0) + " · html " + (kinds.html || 0) + " · अपने-शब्दों " + (kinds.soch || 0) + " · ग़लतफ़हमी (मानक) " + LS.filter(L => L.__M && L.__M.std).length);
if (!PAGES_ONLY) {
  const chs = (a, b) => C.parts.filter(p => p.no >= a && p.no <= b).map(p => BODIES[p.no]).join("");
  for (const b of C.bhag.filter(b => b.chTo > b.chFrom)) {
    const file = "bhag-" + b.key + ".pdf"; jobs.push({ html: doc(chs(b.chFrom, b.chTo)), pdf: path.join(RELEASE_OUT, file) });
    files.push({ group: "bhag", file, icon: "📚", title: b.name, sub: C.partLabel + " " + b.chFrom + "-" + b.chTo, path: path.join(RELEASE_OUT, file) });
  }
  jobs.push({ html: doc(chs(1, C.parts.length)), pdf: path.join(RELEASE_OUT, "poori-kitab.pdf") });
  htmlToPdf(jobs);
  files.push({ group: "bhag", file: "poori-kitab.pdf", icon: "📗", title: "पूरी किताब — सब " + C.parts.length + " " + C.partLabel, sub: "पाठ 1-" + C.totalLessons, path: path.join(RELEASE_OUT, "poori-kitab.pdf") });
}
for (const f of files) { f.kb = Math.max(1, Math.round(fs.statSync(f.path).size / 1024)); f.pages = pageCount(f.path); }
downloadPage(files);
fs.writeFileSync(path.join(RELEASE_OUT, "manifest.json"), JSON.stringify(files.map(f => ({ group: f.group, file: f.file, title: f.title, pages: f.pages, kb: f.kb, ch: f.ch || null })), null, 1));
console.log("🏁 build_pl0_workbook v" + VER + " — " + files.length + " PDF · " + files.reduce((a, f) => a + (f.group === "adhyay" ? f.pages : 0), 0) + " पन्ने (अध्याय-वार) · " + Math.round(files.reduce((a, f) => a + f.kb, 0) / 1024) + " MB कुल · download-पेज: courses/hi/" + C.slug + "/workbook/index.html");
