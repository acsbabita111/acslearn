/* build_tirhuta_og.js v1.0 · 27-Oct-2026 — "तिरहुता लिपि" की og:image (1200×630 PNG) · परत-4
   WhatsApp/Facebook पर कड़ी भेजते ही दिखने वाली छवि। स्रोत: landing का heroSVG + TIR_COURSE + courses_data (PJ434)।
   छपाई: Chromium (playwright, python) — देवनागरी-आकार सही। निकास: assets/og/<slug>.png */
const fs = require("fs"), path = require("path"), cp = require("child_process"), os = require("os");
const ROOT = path.join(__dirname, "..");
const { TIR_COURSE: C } = require("./data/tirhuta_lessons_data.js");
const LD = require("./tirhuta_landing.js");
const se = LD.loadSE(ROOT, "/courses/" + C.lang + "/" + C.slug + "/");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const html = `<!DOCTYPE html><html lang="hi"><head><meta charset="UTF-8"><style>
body{margin:0;width:1200px;height:630px;background:#0B1F3A;font-family:'Noto Sans Devanagari','Noto Sans',sans-serif;color:#F5F7FA;display:flex;overflow:hidden}
.l{width:560px;padding:44px 34px 0 50px;display:flex;flex-direction:column}.r{width:640px;display:flex;align-items:center}.r svg{width:640px;height:auto}
.org{font-size:24px;font-weight:700;color:#F9A825}.t{font-size:78px;font-weight:900;line-height:1.1;margin:18px 0 8px}
.s{font-size:30px;line-height:1.35;font-weight:700}.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.chips span{font-size:24px;font-weight:800;background:#F9A825;color:#0B1F3A;border-radius:999px;padding:6px 18px}
.u{margin-top:auto;padding-bottom:30px;font-size:24px;color:#F5F7FA}</style></head><body>
<div class="l"><div class="org">अप्लाइड कंप्यूटर स्कूल™ · ACS</div><div class="t">${esc(C.title.replace(/\s*\([^)]*\)/, ""))}</div>
<div class="s">विद्यापति की धरती की पोथी-लिपि — मिथिलाक्षर अब अपनी आँख से पढ़ो</div>
<div class="chips"><span>मुफ़्त</span><span>${se.lessons} पाठ</span><span>${C.parts.length} ${esc(C.partLabel)}</span><span>बिना login</span></div>
<div class="u">acslearn.com/courses/hi/${C.slug}/</div></div><div class="r">${LD.heroSVG()}</div></body></html>`;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-")); const hf = path.join(tmp, "og.html"); fs.writeFileSync(hf, html, "utf8");
const out = path.join(ROOT, "assets", "og", C.slug + ".png"); fs.mkdirSync(path.dirname(out), { recursive: true });
const py = `import sys\nfrom playwright.sync_api import sync_playwright\nwith sync_playwright() as p:\n    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1200,'height':630})\n    pg.goto('file://'+sys.argv[1]); pg.evaluate('document.fonts.ready'); pg.screenshot(path=sys.argv[2]); b.close()\nprint('ok')`;
const pf = path.join(tmp, "s.py"); fs.writeFileSync(pf, py);
const r = cp.spawnSync("python3", [pf, hf, out], { encoding: "utf8" }); if (r.status !== 0) throw new Error(r.stderr.slice(-400));
console.log("🏁 og-छवि: assets/og/" + C.slug + ".png · " + Math.round(fs.statSync(out).size / 1024) + " KB · 1200×630");
