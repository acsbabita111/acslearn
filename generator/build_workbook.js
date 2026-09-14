/* build_workbook.js v1.0 · 14-Sep-2026 — "लिखो-workbook" (copy-practice) + साप्ताहिक शब्दकोश · परत-4
   Founder-निर्देश (14-Sep): पढ़ाई से भागने वाले वयस्क के लिए — बड़े अक्षर, हर दिन के पाठ का हर वाक्य ऊपर, नीचे 3–4 ख़ाली लाइनें;
   सप्ताह-वार workbook PDF + महीना-वार PDF + साप्ताहिक शब्दकोश (सप्ताह के सब शब्द: शब्द · उच्चारण · अर्थ) + पूरा शब्दकोश — छूकर download।
   स्रोत: assets/kkb_<code>_data.js (L1, दिन 1–25) + kkb2_<code>_data.js (L2, दिन 26–90) — वही 90-दिन क्रम जो kkb2.js चलाता है;
          उच्चारण शब्द-दर-शब्द वाक्य की देवनागरी-पंक्ति से (शब्द-गिनती मिले तो), अर्थ: tw → generator/data/lipi/<code>_shabdkosh.js → "—"
   निकास: /courses/hi/bhasha/<slug>/workbook/week-NN.pdf (18) · month-N.pdf (3) · shabdkosh.pdf · index.html (download-पेज, universal-टेम्पलेट)
   PDF: Chromium (playwright, python) — build-समय; repo में PDF output (generator-निर्मित, हाथ से नहीं)। नई भाषा = WB_LANGS में एक पंक्ति। */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const VER = "1.0";
const WB_LANGS = [
  { code: "en", slug: "english", hi: "अंग्रेज़ी", en: "English", dir: "ltr", font: "'Noto Sans', Inter, Arial, sans-serif" }
];
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function loadData(code) {
  const w = {};
  for (const f of [code === "en" ? "kkb_data.js" : "kkb_" + code + "_data.js", code === "en" ? "kkb2_data.js" : "kkb2_" + code + "_data.js"]) {
    const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) throw new Error("data नहीं: " + f);
    new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {});
  }
  return { L1: w.KKB_DATA, L2: w.KKB2_DATA };
}
/* 90 दिन: L1 के 25 दिन (5×5) + L2 के 65 दिन (13×5) — kkb2.js का वही क्रम */
function days90(D) {
  const out = []; let n = 0;
  D.L1.weeks.forEach(w => w.days.forEach(d => { n++; out.push({ n, level: 1, wk: w.n, wkTitle: w.hi || w.title, title: d.title, items: d.items, tw: d.tw || [] }); }));
  D.L2.weeks.forEach(w => w.days.forEach(d => { n++; out.push({ n, level: 2, wk: w.n, wkTitle: w.hi || w.title, title: d.title, items: d.items, tw: d.tw || [] }); }));
  return out;
}
const clean = s => String(s).replace(/[.,?!"'।;:()]/g, "").trim();
function wordDev(items) { /* वाक्य → शब्द-दर-शब्द देवनागरी (गिनती मिले तो) */
  const m = new Map();
  items.forEach(it => { const en = clean(it[0]).split(/\s+/).filter(Boolean), dv = clean(it[1]).split(/\s+/).filter(Boolean); if (en.length === dv.length) en.forEach((e, i) => { const k = e.toLowerCase(); if (!m.has(k)) m.set(k, dv[i]); }); });
  return m;
}
function buildDict(days, twAll, KOSH, devAll) {
  const seen = new Set(); const rows = []; const missing = new Set();
  days.forEach(d => d.items.forEach(it => clean(it[0]).split(/\s+/).filter(Boolean).forEach(w => {
    const k = w.toLowerCase(); if (seen.has(k) || /^\d+$/.test(k)) return; seen.add(k);
    const tw = twAll.get(k); const dev = tw ? tw[1] : (devAll.get(k) || ""); const mean = tw ? tw[2] : (KOSH[k] || "");
    if (!mean) missing.add(k);
    rows.push([w.toLowerCase(), dev, mean || "—"]);
  })));
  return { rows, missing: [...missing] };
}

/* ---- HTML (print) ---- */
const CSS = (L) => `
@page{size:A4;margin:11mm 12mm}
*{box-sizing:border-box}
body{font-family:'Noto Sans Devanagari','Noto Sans','Inter',sans-serif;color:#0B1F3A;margin:0;font-size:22px;line-height:1.5}
.cover{height:262mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;break-after:page;border:6px double #0B1F3A;padding:20mm}
.cover h1{font-size:44px;margin:0 0 10px;line-height:1.25}.cover h2{font-size:32px;color:#1565C0;margin:6px 0}
.cover p{font-size:22px;margin:6px 0}.cover .big{font-size:96px;font-weight:900;color:#F9A825;margin:8px 0;line-height:1}
.rule{font-size:24px;background:#FFF5D6;border:3px solid #F9A825;border-radius:16px;padding:10px 16px;margin:14px 0;text-align:left}
.day{break-before:page}
.dayhead{display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid #0B1F3A;padding:4px 0 6px;margin-bottom:8px}
.dayhead .n{font-size:34px;font-weight:900}.dayhead .t{font-size:24px;color:#1565C0;font-weight:700}
.blk{break-inside:avoid;margin:0 0 3mm}
.blk .num{display:inline-block;background:#0B1F3A;color:#fff;font-size:18px;font-weight:800;border-radius:8px;padding:0 10px;margin-bottom:2px}
.blk .en{font-family:${L.font};font-size:31px;font-weight:700;line-height:1.25;direction:${L.dir};unicode-bidi:isolate}
.blk .dv{font-size:23px;color:#1565C0;font-weight:700}.blk .hi{font-size:22px;color:#2E7D32}
.lines{margin-top:2mm}
.ln{height:11mm;border-bottom:2px solid #94A3B8;position:relative}
.ln:before{content:"";position:absolute;left:0;right:0;top:5.5mm;border-top:1px solid #E2E8F0} /* dashed नहीं — dashed = हज़ारों path, PDF 4× भारी */
.ln.first{border-bottom-color:#0B1F3A}
.done{margin-top:6mm;font-size:22px;border:2px dashed #94A3B8;border-radius:12px;padding:8px 12px}
.done span{display:inline-block;width:26px;height:26px;border:3px solid #0B1F3A;border-radius:6px;vertical-align:middle;margin-right:8px}
.dict{break-before:page}
.dict h2{font-size:34px;margin:0 0 8px;border-bottom:4px solid #F9A825;padding-bottom:4px}
table{width:100%;border-collapse:collapse;font-size:22px}
th{text-align:left;background:#0B1F3A;color:#fff;padding:6px 8px;font-size:20px}
td{padding:6px 8px;border-bottom:1.5px solid #CBD5E1;vertical-align:top}
td.w{font-family:${L.font};font-weight:800;font-size:26px;width:36%;direction:${L.dir}}
td.d{color:#1565C0;width:30%}td.m{color:#2E7D32}
tr{break-inside:avoid}
.foot{font-size:16px;color:#334155;text-align:center;margin-top:6mm}
`;
function coverHTML(L, title, sub, days, extra) {
  return `<section class="cover"><p style="font-size:24px;font-weight:800">अप्लाइड कंप्यूटर स्कूल™ · ACS काम की भाषा</p><h1>${esc(L.hi)} — लिखो-workbook</h1><div class="big">${esc(title)}</div><h2>${esc(sub)}</h2>
<p>${days.length} दिन · ${days.reduce((a, d) => a + d.items.length, 0)} वाक्य · हर वाक्य ऊपर, नीचे 4 लाइनें आपके लिए</p>
<div class="rule">✍️ <b>तीन काम, रोज़:</b><br>1. ऊपर का वाक्य ज़ोर से 3 बार बोलो (फ़ोन के कोर्स में 🔊 दबाकर सुनो)।<br>2. नीचे की लाइनों में वही वाक्य 3 बार लिखो — धीरे, साफ़।<br>3. दिन के अंत में ☐ पर ✔ लगाओ।</div>
<p>${extra || ""}</p><p style="font-size:18px">मूल भाषा: हिंदी · मुफ़्त · acslearn.com/courses/hi/bhasha/${L.slug}/ · छपाई: A4, एक तरफ़</p></section>`;
}
function dayHTML(L, d) {
  let h = `<section class="day"><div class="dayhead"><span class="n">दिन ${d.n} / 90</span><span class="t">${esc(d.title)}</span><span style="font-size:18px;color:#334155">स्तर-${d.level} · सप्ताह ${d.level === 1 ? d.wk : d.wk + 5}</span></div>`;
  d.items.forEach((it, i) => {
    h += `<div class="blk"><span class="num">${d.n}.${i + 1}</span><div class="en">${esc(it[0])}</div><div class="dv">${esc(it[1])}</div><div class="hi">${esc(it[2])}</div><div class="lines"><div class="ln first"></div><div class="ln"></div><div class="ln"></div><div class="ln"></div></div></div>`;
  });
  h += `<div class="done"><span></span>दिन ${d.n} के सब ${d.items.length} वाक्य मैंने बोले और लिखे। तारीख़: ____________</div></section>`;
  return h;
}
function dictHTML(title, rows, note) {
  let h = `<section class="dict"><h2>📖 ${esc(title)} — ${rows.length} शब्द</h2><p style="font-size:18px;color:#334155;margin:0 0 6px">${esc(note || "जो शब्द इस हफ़्ते के वाक्यों में आए — शब्द · कैसे बोलें · मतलब। रोज़ 10 शब्द दोहराओ।")}</p><table><tr><th>शब्द</th><th>कैसे बोलें</th><th>मतलब</th></tr>`;
  rows.forEach(r => { h += `<tr><td class="w">${esc(r[0])}</td><td class="d">${esc(r[1])}</td><td class="m">${esc(r[2])}</td></tr>`; });
  return h + `</table></section>`;
}
function doc(L, body) { return `<!DOCTYPE html><html lang="hi"><head><meta charset="UTF-8"><title>workbook</title><style>${CSS(L)}</style></head><body>${body}<p class="foot">ACS काम की भाषा · अप्लाइड कंप्यूटर स्कूल™ · FFGPMTrust · मूल भाषा: हिंदी · generator: build_workbook.js v${VER}</p></body></html>`; }

/* ---- PDF: playwright (python) ---- */
function htmlToPdf(jobs) { /* jobs: [{html, pdf}] */
  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "wb-"));
  const list = jobs.map((j, i) => { const f = path.join(tmp, "j" + i + ".html"); fs.writeFileSync(f, j.html, "utf8"); return [f, j.pdf]; });
  fs.writeFileSync(path.join(tmp, "jobs.json"), JSON.stringify(list));
  const py = `import json,sys
from playwright.sync_api import sync_playwright
jobs=json.load(open(sys.argv[1]))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    for html,pdf in jobs:
        pg.goto('file://'+html,wait_until='load'); pg.emulate_media(media='print'); pg.pdf(path=pdf,format='A4',print_background=True,prefer_css_page_size=True)
    b.close()
print('ok',len(jobs))`;
  fs.writeFileSync(path.join(tmp, "run.py"), py);
  const r = cp.spawnSync("python3", [path.join(tmp, "run.py"), path.join(tmp, "jobs.json")], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("PDF fail: " + r.stderr.slice(-400));
}

/* ---- download-पेज (universal) ---- */
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");
function loadMenu() { const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8"); const box = {}; new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box); return box.__L.menu; }
const MENU_HTML = loadMenu().map(m => '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>").join("\n");
const MENU_FALLBACK_JS = '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};}</scr' + 'ipt>';
function kb(p) { return Math.max(1, Math.round(fs.statSync(p).size / 1024)); }
function downloadPage(L, weeks, months, dictPdf, dictRows, missing) {
  const base = "/courses/hi/bhasha/" + L.slug + "/workbook/";
  const card = (href, icon, title, sub, size) => `<a class="wb-card" href="${href}" download><span class="wb-ic">${icon}</span><span class="wb-t">${esc(title)}</span><span class="wb-s">${esc(sub)} · ${size} KB · PDF</span><span class="wb-dl">⬇️ छूकर download</span></a>`;
  let h = `<article class="wb-wrap"><p class="wb-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="/courses/hi/bhasha/${L.slug}/">${esc(L.hi)} बोलने का कोर्स</a> › लिखो-workbook</p>
<h1>${esc(L.hi)} — लिखो-workbook और शब्दकोश (छपने-योग्य PDF)</h1>
<p class="wb-lead">फ़ोन पर सुनो-बोलो, काग़ज़ पर लिखो। हर दिन के पाठ का हर वाक्य बड़े अक्षरों में ऊपर, नीचे 4 लाइनें आपके लिए। हर हफ़्ते की किताब अलग — छूते ही download; दुकान पर छपवाओ (A4, ₹1–2/पन्ना) या फ़ोन में रखो।</p>
<div class="wb-rule">✍️ तीन काम रोज़: वाक्य 3 बार बोलो → 3 बार लिखो → ☐ पर ✔। बस।</div>
<h2>📅 महीना-वार (एक साथ पूरा महीना)</h2><div class="wb-grid">`;
  months.forEach(m => { h += card(base + m.file, "📗", m.title, m.sub, kb(m.path)); });
  h += `</div><h2>📘 सप्ताह-वार (छोटी किताब, हर हफ़्ते नई) — हर किताब के अंत में उस हफ़्ते का शब्दकोश</h2><div class="wb-grid">`;
  weeks.forEach(w => { h += card(base + w.file, "📘", w.title, w.sub, kb(w.path)); });
  h += `</div><h2>📖 पूरा शब्दकोश — कोर्स के सब ${dictRows.length} शब्द</h2><div class="wb-grid">${card(base + "shabdkosh.pdf", "📖", "पूरा शब्दकोश (90 दिन)", dictRows.length + " शब्द · कैसे बोलें · मतलब", kb(dictPdf))}</div>
<p class="wb-note">मूल भाषा: हिंदी · यह workbook मुफ़्त है; प्रमाणपत्र बोलने-कोर्स की परीक्षा से मिलता है। उच्चारण देवनागरी में उसी वाक्य से; मतलब कोर्स के शब्दकोश से${missing.length ? " (" + missing.length + " शब्दों का मतलब अगली खेप में जुड़ेगा — तब तक \"—\")" : ""}। पहली बार अक्षर देख रहे हो? <a href="/courses/hi/bhasha/${L.slug}/lipi/">लिपि-परिचय</a> पहले।</p></article>`;
  const css = `<style>.wb-wrap{max-width:820px;margin:0 auto;padding:12px 14px 40px;background:#F5F7FA;color:#0B1F3A;border-radius:14px;font-size:19px;line-height:1.7}.wb-crumb{font-size:16px;color:#1565C0}.wb-crumb a{color:#1565C0;text-decoration:none}.wb-wrap h1{font-size:26px;line-height:1.35}.wb-wrap h2{font-size:22px;margin:22px 0 8px;border-left:6px solid #F9A825;padding-left:10px}.wb-lead{font-size:19px}.wb-rule{font-size:20px;background:#FFF5D6;border:3px solid #F9A825;border-radius:14px;padding:10px 14px;font-weight:700}.wb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}.wb-card{display:flex;flex-direction:column;gap:4px;background:#fff;border:2px solid #0B1F3A;border-radius:14px;padding:12px;text-decoration:none;color:#0B1F3A}.wb-ic{font-size:34px}.wb-t{font-size:20px;font-weight:800}.wb-s{font-size:16px;color:#334155}.wb-dl{margin-top:4px;font-size:18px;font-weight:800;color:#fff;background:#2E7D32;border-radius:10px;padding:8px 10px;text-align:center}.wb-note{font-size:16px;color:#334155;margin-top:14px}</style>`;
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->"; const a = TPL.indexOf(S), b = TPL.indexOf(E);
  let page = TPL.slice(0, a + S.length) + "\n" + h + "\n" + TPL.slice(b);
  const title = L.hi + " लिखो-workbook — हर दिन के वाक्य बड़े अक्षरों में + लिखने की लाइनें + साप्ताहिक शब्दकोश (मुफ़्त PDF) | अप्लाइड कंप्यूटर स्कूल";
  const desc = L.hi + " बोलने के 90-दिन कोर्स की छपने-योग्य copy-किताबें: " + weeks.length + " साप्ताहिक + 3 महीना-वार PDF, हर वाक्य के नीचे 4 लिखने की लाइनें, हर हफ़्ते का शब्दकोश (शब्द · उच्चारण · मतलब) और पूरा शब्दकोश। छूकर download।";
  const url = "https://acslearn.com" + base;
  page = page.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(title) + "</title>\n<meta name=\"description\" content=\"" + esc(desc) + "\">\n<meta name=\"robots\" content=\"index, follow\">\n<link rel=\"canonical\" href=\"" + url + "\">\n<meta property=\"og:title\" content=\"" + esc(title) + "\">\n<meta property=\"og:description\" content=\"" + esc(desc) + "\">\n<meta property=\"og:url\" content=\"" + url + "\">\n<meta property=\"og:image\" content=\"https://acslearn.com/logo.png\">\n<script type=\"application/ld+json\">" + JSON.stringify({ "@context": "https://schema.org", "@type": "LearningResource", "name": L.hi + " लिखो-workbook (" + L.en + " copy-practice workbook)", "description": desc, "inLanguage": "hi", "learningResourceType": "Workbook", "isAccessibleForFree": true, "url": url, "provider": { "@type": "Organization", "name": "Applied Computer School", "url": "https://acslearn.com/" } }) + "</scr" + "ipt>");
  page = page.replace("</head>", css + "\n</head>").replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>").replace("</body>", MENU_FALLBACK_JS + "\n</body>").replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_workbook.js v" + VER + ") — हाथ से न बदलें -->");
  fs.writeFileSync(path.join(ROOT, base.slice(1), "index.html"), page, "utf8");
}

/* ---- build ---- */
function build(L) {
  const D = loadData(L.code); const days = days90(D);
  if (days.length !== 90) throw new Error("90 दिन नहीं: " + days.length);
  const twAll = new Map(); D.L2.weeks.forEach(w => w.days.forEach(d => (d.tw || []).forEach(t => twAll.set(String(t[0]).toLowerCase(), t))));
  /* शब्दकोश-फ़ाइलें: <code>_shabdkosh.js, _2.js, _3.js … — सब जुड़कर एक */
  const KOSH = {}; for (const suf of ["", "_2", "_3", "_4"]) { const kp = path.join(__dirname, "data", "lipi", L.code + "_shabdkosh" + suf + ".js"); if (fs.existsSync(kp)) Object.assign(KOSH, require(kp)); }
  const devAll = wordDev(days.flatMap(d => d.items));
  const outDir = path.join(ROOT, "courses/hi/bhasha", L.slug, "workbook"); fs.mkdirSync(outDir, { recursive: true });
  const jobs = []; const weeks = []; const months = [];
  /* 18 सप्ताह: 1–5 = L1 (दिन 1–25), 6–18 = L2 (दिन 26–90) */
  for (let w = 1; w <= 18; w++) {
    const wd = days.slice((w - 1) * 5, w * 5); const { rows } = buildDict(wd, twAll, KOSH, devAll);
    const title = "सप्ताह " + w, sub = "दिन " + wd[0].n + "–" + wd[wd.length - 1].n + " · " + wd[0].wkTitle;
    const html = doc(L, coverHTML(L, title, sub, wd, "इस हफ़्ते के दिन: " + wd.map(d => d.n + " " + d.title).join(" · ")) + wd.map(d => dayHTML(L, d)).join("") + dictHTML("सप्ताह " + w + " का शब्दकोश", rows));
    const file = "week-" + String(w).padStart(2, "0") + ".pdf"; jobs.push({ html, pdf: path.join(outDir, file) }); weeks.push({ file, path: path.join(outDir, file), title, sub: sub + " · " + wd.reduce((a, d) => a + d.items.length, 0) + " वाक्य · " + rows.length + " शब्द" });
  }
  for (let m = 1; m <= 3; m++) {
    const md = days.slice((m - 1) * 30, m * 30); const { rows } = buildDict(md, twAll, KOSH, devAll);
    const title = "महीना " + m, sub = "दिन " + md[0].n + "–" + md[md.length - 1].n + (m === 1 ? " · नींव" : m === 2 ? " · ज़िंदगी और काम" : " · कमाई, सफ़र और हक़");
    const html = doc(L, coverHTML(L, title, sub, md, "") + md.map(d => dayHTML(L, d)).join("") + dictHTML("महीना " + m + " का शब्दकोश", rows));
    const file = "month-" + m + ".pdf"; jobs.push({ html, pdf: path.join(outDir, file) }); months.push({ file, path: path.join(outDir, file), title, sub: sub + " · " + md.reduce((a, d) => a + d.items.length, 0) + " वाक्य" });
  }
  const full = buildDict(days, twAll, KOSH, devAll);
  jobs.push({ html: doc(L, coverHTML(L, "शब्दकोश", "90 दिन · " + full.rows.length + " शब्द", days, "कोर्स के हर वाक्य का हर शब्द — जिस क्रम में पहली बार आया") + dictHTML("पूरा शब्दकोश (90 दिन)", full.rows, "शब्द · कैसे बोलें (देवनागरी) · मतलब — कोर्स में पहली बार आने के क्रम में।")), pdf: path.join(outDir, "shabdkosh.pdf") });
  htmlToPdf(jobs);
  downloadPage(L, weeks, months, path.join(outDir, "shabdkosh.pdf"), full.rows, full.missing);
  const total = jobs.reduce((a, j) => a + fs.statSync(j.pdf).size, 0);
  console.log("✅ " + L.code + ": " + jobs.length + " PDF (" + Math.round(total / 1024) + " KB) · शब्दकोश " + full.rows.length + " शब्द, मतलब-रहित " + full.missing.length + (full.missing.length ? " → " + full.missing.slice(0, 20).join(",") + (full.missing.length > 20 ? "…" : "") : ""));
  fs.writeFileSync(path.join(__dirname, "data", "lipi", L.code + "_missing_words.txt"), full.missing.join("\n") || "(कोई नहीं)", "utf8"); /* generator-घर में, site पर नहीं */
}
const only = process.argv[2];
WB_LANGS.filter(l => !only || l.code === only).forEach(build);
console.log("🏁 build_workbook v" + VER);
