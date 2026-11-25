/* ============================================================
   build_udyam_suchi.js v1.0 (परत-4, 25-Nov-2026, खेप SEO-सफ़ाई)
   काम: /udyam/index.html में "सभी उद्यमों की पूरी सूची" का हिस्सा बनाना
        (UDYAM-SUCHI:START … END)। 24 सेक्टर, हर सेक्टर के नीचे उसके सब उद्यमों की सीधी कड़ियाँ।
   क्यों (Google Search Console, 25-Nov-2026): उद्यम के 951 पन्नों पर साइट के किसी पन्ने से
        एक भी सीधी (HTML वाली) कड़ी नहीं थी। ऊपर की कार्ड-सूची JavaScript से बनती है और एक बार में
        सिर्फ़ 50 कार्ड दिखाती है। इसलिए Google को ये पन्ने सिर्फ़ sitemap से मिलते थे और बहुत-से
        "Discovered, currently not indexed" में पड़े थे। अब हर उद्यम-पन्ने तक होम से 3 कदम में
        सीधी कड़ी है, JavaScript के बिना भी।
   data के घर (एक चीज़ = एक जगह): assets/udyam_data.js (ALL_SECTORS) और assets/mg_names.js (MG_NAMES)।
   चलाना:  node generator/build_udyam_suchi.js          (लिखता है)
           node generator/build_udyam_suchi.js --check  (सिर्फ़ जाँच: पन्ना ताज़ा है या नहीं)
   नियम: यह हिस्सा हाथ से न बदलें। नया उद्यम = udyam_data.js में जोड़ें, फिर यह generator चलाएँ।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const PAGE = path.join(ROOT, "udyam", "index.html");
const CHECK = process.argv.includes("--check");
const START = "<!-- UDYAM-SUCHI:START (generator/build_udyam_suchi.js से बना; हाथ से न बदलें) -->";
const END = "<!-- UDYAM-SUCHI:END -->";
const ANCHOR = '    <div class="sector-grid" id="sectorGrid"></div>\n';
/* ऊपर की एक पंक्ति: कार्डों से पहले "पूरी सूची" तक पहुँचने की कड़ी (सूची 50 कार्डों के नीचे है) */
const K_START = "<!-- UDYAM-SUCHI-KADI:START (generator/build_udyam_suchi.js से बना; हाथ से न बदलें) -->";
const K_END = "<!-- UDYAM-SUCHI-KADI:END -->";
const K_ANCHOR = '    <div class="sector-count" id="sectorCount">';
const stop = (m) => { console.error("⛔ build_udyam_suchi: " + m); process.exit(1); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- data ---------- */
function load() {
  const A = new Function(fs.readFileSync(path.join(ROOT, "assets/udyam_data.js"), "utf8") + ";return ALL_SECTORS;")();
  const w = {}; new Function("window", fs.readFileSync(path.join(ROOT, "assets/mg_names.js"), "utf8"))(w);
  const MG = w.MG_NAMES;
  if (!Array.isArray(A) || !A.length) stop("ALL_SECTORS नहीं मिला");
  if (!MG || Object.keys(MG).length !== 24) stop("MG_NAMES में 24 सेक्टर नहीं");
  return { A, MG };
}
/* नाम: चौकोर कोष्ठक नहीं, हमेशा गोल (लिपि-नियम) */
const nm = (s) => String(s).replace(/\[/g, "(").replace(/\]/g, ")").replace(/\s+/g, " ").trim();

function block() {
  const { A, MG } = load();
  const seen = new Set(), by = {};
  for (const s of A) {
    if (!s.intro || !/^\/udyam\/[a-z0-9\-]+\.html$/.test(s.intro)) stop("उद्यम " + s.n + " की intro-कड़ी सही रूप में नहीं: " + s.intro);
    if (seen.has(s.intro)) stop("दोहरी कड़ी: " + s.intro);
    seen.add(s.intro);
    if (!fs.existsSync(path.join(ROOT, s.intro))) stop("पन्ना नहीं है: " + s.intro);
    if (!MG[s.mg]) stop("उद्यम " + s.n + " का सेक्टर " + s.mg + " MG_NAMES में नहीं");
    (by[s.mg] = by[s.mg] || []).push(s);
  }
  const out = [START,
    "    <style>",
    "    .us-wrap{margin:26px 0 8px;padding:18px 14px;background:#fff;border:1.5px solid #BBDEFB;border-radius:14px;scroll-margin-top:170px}",
    "    .us-h{font-size:22px;font-weight:900;color:var(--navy);margin:0 0 6px;line-height:1.4}",
    "    .us-p{font-size:17px;line-height:1.7;color:#37474F;margin:0 0 12px}",
    "    .us-d{border:1px solid #D7E3F4;border-radius:10px;margin:8px 0;background:#F5F7FA}",
    "    .us-d>summary{cursor:pointer;padding:13px 14px;font-size:18px;font-weight:800;color:var(--navy);line-height:1.5;list-style-position:inside}",
    "    .us-d[open]>summary{border-bottom:1px solid #D7E3F4;background:#EEF4FF;border-radius:10px 10px 0 0}",
    "    .us-c{font-size:16px;font-weight:700;color:#2E7D32;margin-left:6px;white-space:nowrap}",
    "    .us-l{list-style:none;margin:0;padding:8px 10px 12px;display:grid;grid-template-columns:1fr;gap:2px 14px}",
    "    @media(min-width:600px){.us-l{grid-template-columns:1fr 1fr}}",
    "    @media(min-width:900px){.us-l{grid-template-columns:1fr 1fr 1fr}}",
    "    .us-l a{display:block;padding:10px 6px;font-size:17px;line-height:1.5;color:var(--blue);font-weight:600;text-decoration:none;border-bottom:1px dashed #D7E3F4}",
    "    .us-l a:hover,.us-l a:focus{text-decoration:underline;background:#fff}",
    "    </style>",
    '    <section class="us-wrap" id="puri-suchi" aria-label="सभी उद्यमों की पूरी सूची">',
    '      <h2 class="us-h">📋 सभी ' + A.length + " उद्यमों की पूरी सूची</h2>",
    '      <p class="us-p">नीचे 24 सेक्टर हैं। किसी सेक्टर का नाम दबाएँ, उसके सब उद्यम खुल जाएँगे। फिर किसी भी उद्यम का नाम दबाकर उसकी पूरी जानकारी पढ़ें।</p>'];
  for (let g = 1; g <= 24; g++) {
    const L = by[g] || [];
    if (!L.length) stop("सेक्टर " + g + " में कोई उद्यम नहीं");
    out.push('      <details class="us-d"><summary>' + esc(MG[g].e) + " " + esc(MG[g].n) + ' <span class="us-c">' + L.length + " उद्यम</span></summary>");
    out.push('        <ul class="us-l">');
    for (const s of L) out.push('          <li><a href="' + esc(s.intro) + '">' + esc(nm(s.name)) + "</a></li>");
    out.push("        </ul>", "      </details>");
  }
  out.push("    </section>", END);
  const html = out.join("\n") + "\n";
  /* पहरा */
  /* दिखने वाले पाठ में चौकोर कोष्ठक नहीं (CSS का [open] इस जाँच से बाहर) */
  if (/[\[\]]/.test(html.replace(/<style>[\s\S]*?<\/style>/, ""))) stop("चौकोर कोष्ठक बचा");
  const small = (html.match(/font-size:\s*(\d+)px/g) || []).map((x) => +x.replace(/\D/g, "")).filter((n) => n < 16);
  if (small.length) stop("16px से छोटा अक्षर: " + small.join(","));
  const links = html.match(/<li><a href="/g) || [];
  if (links.length !== A.length) stop("कड़ियाँ " + links.length + ", उद्यम " + A.length);
  return { html, n: A.length };
}

/* ---------- पन्ने में लगाना ---------- */
/* एक हिस्सा लगाना: पहले से हो तो बदलो; न हो तो जगह (anchor) के पहले या बाद जोड़ो */
function place(src, start, end, body, anchor, after) {
  if (src.includes(start)) {
    if (src.split(start).length !== 2 || src.split(end).length !== 2) stop("START/END ठीक एक-एक बार नहीं: " + end);
    const a = src.indexOf(start), b = src.indexOf(end) + end.length + 1;
    if (src[b - 1] !== "\n") stop("END के बाद नई पंक्ति नहीं: " + end);
    return src.slice(0, a) + body + src.slice(b);
  }
  if (src.split(anchor).length !== 2) stop("जगह ठीक एक बार नहीं मिली: " + anchor.trim());
  return after ? src.replace(anchor, anchor + body) : src.replace(anchor, body + anchor);
}
const src = fs.readFileSync(PAGE, "utf8");
const { html, n } = block();
const kadi = K_START + '\n    <p style="margin:0 0 12px"><a href="#puri-suchi" style="display:inline-block;padding:11px 14px;font-size:17px;font-weight:700;line-height:1.5;color:var(--blue);background:#EEF4FF;border:1.5px solid #BBDEFB;border-radius:10px;text-decoration:none">📋 सभी ' + n + ' उद्यमों की पूरी सूची देखें (सेक्टर के अनुसार) ↓</a></p>\n' + K_END + "\n";
let next = place(src, START, END, html, ANCHOR, true);
next = place(next, K_START, K_END, kadi, K_ANCHOR, false);
if (CHECK) {
  if (next !== src) stop("--check: udyam/index.html बासी है (generator चलाएँ)");
  console.log("🏁 --check पास: udyam/index.html की पूरी सूची ताज़ा है (" + n + " उद्यम, 24 सेक्टर)।");
} else {
  if (next === src) console.log("✅ पहले जैसा: udyam/index.html (" + n + " उद्यम, 24 सेक्टर)।");
  else { fs.writeFileSync(PAGE, next); console.log("✅ लिखा: udyam/index.html (" + src.length + " → " + next.length + " अक्षर; " + n + " उद्यम, 24 सेक्टर)।"); }
  console.log("🏁 build_udyam_suchi v1.0");
}
