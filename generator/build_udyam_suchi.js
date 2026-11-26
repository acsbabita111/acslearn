/* ============================================================
   build_udyam_suchi.js v1.2 (परत-4, 26-Nov-2026, खेप सेक्टर-नियम v1.1) · v1.1 (26-Nov) · v1.0 (25-Nov-2026, खेप SEO-सफ़ाई)
   v1.2 (Founder, 26-Nov-2026: "उद्यम-सूची पूरी website पर एक जैसी दिखे"):
         1. हर सेक्टर की सूची के सबसे नीचे कार्ड «उपरोक्त में कोई नहीं», और 24 के बाद 25वाँ सेक्टर
            «उपरोक्त में कोई नहीं» (ख़ाली कार्ड)। नाम का घर: assets/mg_names.js (MG_NONE, UDYAM_NONE)।
         2. English पन्ना /en/industries/ भी अब यहीं से: उसकी सेक्टर-सूची पन्ने की अपनी बासी नक़ल थी
            ("All (950)", "Agriculture (67)", "Healthcare")। अब नाम mg_names.js के English नाम से, गिनती data से।
   v1.1: हिंदी पन्ने के सेक्टर-बटनों की सूची (const MG=[…]) और कुल गिनती data से।
   v1.0: /udyam/index.html में "सभी उद्यमों की पूरी सूची" (UDYAM-SUCHI:START … END): 24 सेक्टर, हर सेक्टर के
         नीचे उसके सब उद्यमों की सीधी कड़ियाँ (Google के लिए, JavaScript के बिना भी)।
   data के घर (एक चीज़ = एक जगह): assets/udyam_data.js (ALL_SECTORS) और assets/mg_names.js।
   चलाना:  node generator/build_udyam_suchi.js          (लिखता है)
           node generator/build_udyam_suchi.js --check  (सिर्फ़ जाँच: दोनों पन्ने ताज़ा हैं या नहीं)
   नियम: ये हिस्से हाथ से न बदलें। नया उद्यम = node generator/sector_darj.js card …, फिर यह generator।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const LIBS = require("./lib_sector.js");   /* v1.3: निकली सूची (कार्ड → उसके चालू कोर्स) */
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
  const MG = w.MG_NAMES, N25 = w.MG_NONE, N0 = w.UDYAM_NONE;
  if (!Array.isArray(A) || !A.length) stop("ALL_SECTORS नहीं मिला");
  if (!MG || Object.keys(MG).length !== 24) stop("MG_NAMES में 24 सेक्टर नहीं");
  if (!N25 || N25.id !== 25 || !N25.n || !N25.en || !N0 || N0.n !== 0 || !N0.name || !N0.en) stop("mg_names.js में MG_NONE (25) या UDYAM_NONE (0) नहीं");
  for (let g = 1; g <= 24; g++) if (!MG[g].en) stop("सेक्टर " + g + " का English नाम नहीं");
  return { A, MG, N25, N0 };
}
/* «उपरोक्त में कोई नहीं» के साथ का पाठ: दोनों भाषाओं का एक ही घर (नाम mg_names.js से आता है) */
const WA = "https://wa.me/919431210092?text=";
const T = {
  hi: { hint: "आपका उद्यम इस सूची में नहीं है? हमें बताएँ। जाँच के बाद नया कार्ड बनेगा।", hint25: "आपका काम इन 24 सेक्टर में से किसी में नहीं बैठता? हमें बताएँ।",
        btn: "📲 WhatsApp पर बताएँ", li: "अपना उद्यम बताएँ", empty: "ख़ाली कार्ड", count25: "यह ख़ाली कार्ड है: यहाँ वही आता है जो 24 सेक्टर में कहीं न बैठे",
        msg: "ACS: सेक्टर {G} ({N}) की सूची में मेरा उद्यम नहीं है। मेरा उद्यम: ", msg25: "ACS: मेरा काम 24 सेक्टर में कहीं नहीं बैठता। मेरा काम: " },
  en: { hint: "Is your enterprise not in this list? Tell us. After a check, a new card will be made.", hint25: "Does your work fit none of the 24 sectors? Tell us.",
        btn: "📲 Tell us on WhatsApp", li: "Tell us your enterprise", empty: "Empty card", count25: "This card is empty: it holds only what fits none of the 24 sectors",
        msg: "ACS: my enterprise is not in the list of sector {G} ({N}). My enterprise: ", msg25: "ACS: my work fits none of the 24 sectors. My work: " }
};
const waMsg = (t, g, nm) => (g === 25 ? t.msg25 : t.msg.replace("{G}", g).replace("{N}", nm));
const waUrl = (text) => WA + encodeURIComponent(text);
/* नाम: चौकोर कोष्ठक नहीं, हमेशा गोल (लिपि-नियम) */
const nm = (s) => String(s).replace(/\[/g, "(").replace(/\]/g, ")").replace(/\s+/g, " ").trim();

function block() {
  const { A, MG, N25, N0 } = load(), t = T.hi;
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
    "    .us-l .us-none{grid-column:1/-1}",
    "    .us-l .us-none a{margin-top:6px;padding:12px 10px;color:#0B1F3A;font-weight:800;background:#FFF8E1;border:1.5px dashed #F9A825;border-radius:10px}",
    "    .us-n{font-size:17px;line-height:1.7;color:#37474F;margin:0;padding:10px 14px 0}",
    "    </style>",
    '    <section class="us-wrap" id="puri-suchi" aria-label="सभी उद्यमों की पूरी सूची">',
    '      <h2 class="us-h">📋 सभी ' + A.length + " उद्यमों की पूरी सूची</h2>",
    '      <p class="us-p">नीचे 24 सेक्टर हैं। किसी सेक्टर का नाम दबाएँ, उसके सब उद्यम खुल जाएँगे। फिर किसी भी उद्यम का नाम दबाकर उसकी पूरी जानकारी पढ़ें। हर सूची के सबसे नीचे «' + N0.name + '» है: आपका उद्यम सूची में न हो, तो वहीं से हमें बताएँ।</p>'];
  const noneLi = (g, nmHi) => '          <li class="us-none"><a href="' + esc(waUrl(waMsg(t, g, nmHi))) + '" target="_blank" rel="noopener">' + esc(N0.e) + " " + esc(N0.name) + ": " + esc(t.li) + "</a></li>";
  for (let g = 1; g <= 24; g++) {
    const L = by[g] || [];
    if (!L.length) stop("सेक्टर " + g + " में कोई उद्यम नहीं");
    out.push('      <details class="us-d"><summary>' + esc(MG[g].e) + " " + esc(MG[g].n) + ' <span class="us-c">' + L.length + " उद्यम</span></summary>");
    out.push('        <ul class="us-l">');
    for (const s of L) out.push('          <li><a href="' + esc(s.intro) + '">' + esc(nm(s.name)) + "</a></li>");
    out.push(noneLi(g, MG[g].n));
    out.push("        </ul>", "      </details>");
  }
  /* 25वाँ सेक्टर: ख़ाली कार्ड (इसमें कोई उद्यम-कार्ड नहीं, सिर्फ़ «उपरोक्त में कोई नहीं») */
  out.push('      <details class="us-d us-25"><summary>' + esc(N25.e) + " " + esc(N25.n) + ' <span class="us-c">' + esc(t.empty) + "</span></summary>",
    '        <p class="us-n">' + esc(t.hint25) + "</p>", '        <ul class="us-l">', noneLi(25, N25.n), "        </ul>", "      </details>");
  out.push("    </section>", END);
  const html = out.join("\n") + "\n";
  /* पहरा */
  /* दिखने वाले पाठ में चौकोर कोष्ठक नहीं (CSS का [open] इस जाँच से बाहर) */
  if (/[\[\]]/.test(html.replace(/<style>[\s\S]*?<\/style>/, ""))) stop("चौकोर कोष्ठक बचा");
  const small = (html.match(/font-size:\s*(\d+)px/g) || []).map((x) => +x.replace(/\D/g, "")).filter((n) => n < 16);
  if (small.length) stop("16px से छोटा अक्षर: " + small.join(","));
  const links = html.match(/<li><a href="/g) || [];
  if (links.length !== A.length) stop("कड़ियाँ " + links.length + ", उद्यम " + A.length);
  if ((html.match(/<li class="us-none">/g) || []).length !== 25) stop("«" + N0.name + "» की पंक्तियाँ ठीक 25 नहीं (24 सेक्टर + 25वाँ)");
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
/* सेक्टर-बटनों की सूची (const MG=[…]), «उपरोक्त में कोई नहीं» कार्ड और कुल गिनती: हिंदी और English, दोनों पन्नों पर यहीं से */
const q = (x) => String(x).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
function mgBlock(lang) {
  const { A, MG, N25, N0 } = load(), t = T[lang], en = lang === "en"; const cnt = {}; A.forEach((s) => { cnt[s.mg] = (cnt[s.mg] || 0) + 1; });
  const nmOf = (g) => (en ? MG[g].en : MG[g].n), none = en ? N0.en : N0.name, none25 = en ? N25.en : N25.n;
  const M_START = en ? "/* UDYAM-MG:START (built by generator/build_udyam_suchi.js; do not edit by hand) */" : "/* UDYAM-MG:START (generator/build_udyam_suchi.js से बना; हाथ से न बदलें) */";
  const rows = ["  {id:'all',name:'" + (en ? "All" : "सब") + " (" + A.length + ")'},"];
  for (let g = 1; g <= 24; g += 2) rows.push("  {id:" + g + ",name:'" + q(MG[g].e + " " + nmOf(g)) + " (" + cnt[g] + ")'},{id:" + (g + 1) + ",name:'" + q(MG[g + 1].e + " " + nmOf(g + 1)) + " (" + cnt[g + 1] + ")'},");
  rows.push("  {id:25,name:'" + q(N25.e + " " + none25) + "'},");
  const names = []; for (let g = 1; g <= 24; g++) names.push(g + ":'" + q(nmOf(g)) + "'");
  const body = [M_START, "const MG=[", rows.join("\n"), "];",
    en ? "/* Under every sector list: the card \"None of the above\" (code 0). Sector 25 is an empty card. Names: assets/mg_names.js */"
       : "/* हर सेक्टर की सूची के नीचे «उपरोक्त में कोई नहीं» कार्ड (कोड 0)। 25वाँ सेक्टर ख़ाली कार्ड है। नाम: assets/mg_names.js */",
    "const UDY_NONE={e:'" + q(N0.e) + "',name:'" + q(none) + "',hint:'" + q(t.hint) + "',hint25:'" + q(t.hint25) + "',btn:'" + q(t.btn) + "',count25:'" + q(t.count25) + "',",
    "  wa:'" + WA + "',msg:'" + q(t.msg) + "',msg25:'" + q(t.msg25) + "',",
    "  n:{" + names.join(",") + "}};",
    "function udyNoneCard(mg){",
    "  var m=mg===25?UDY_NONE.msg25:UDY_NONE.msg.replace('{G}',mg).replace('{N}',UDY_NONE.n[mg]);",
    "  return '<div class=\"sector-card\" style=\"border:2px dashed #F9A825;background:#FFF8E1;cursor:default\">'+",
    "    '<div class=\"s-num\">'+UDY_NONE.e+'</div><div class=\"s-name\">'+UDY_NONE.name+'</div>'+",
    "    '<div style=\"font-size:16px;line-height:1.6;color:#37474F;margin-top:6px\">'+(mg===25?UDY_NONE.hint25:UDY_NONE.hint)+'</div>'+",
    "    '<a href=\"'+UDY_NONE.wa+encodeURIComponent(m)+'\" target=\"_blank\" rel=\"noopener\" style=\"display:block;color:#0B1F3A;font-weight:800;font-size:17px;margin-top:8px;text-decoration:none\">'+UDY_NONE.btn+'</a></div>';",
    "}",
    "function udyNoneFix(){",
    "  var g=document.getElementById('sectorGrid'),c=document.getElementById('sectorCount');",
    "  if(!g||activeMG==='all'||searchQ||!(activeMG===25||UDY_NONE.n[activeMG]))return;",
    "  if(activeMG===25){g.innerHTML=udyNoneCard(25);if(c)c.textContent=UDY_NONE.count25;return;}",
    "  if(g.querySelector('button'))return;",
    "  g.insertAdjacentHTML('beforeend',udyNoneCard(activeMG));",
    "}",
    "(function(){var r0=renderSectors;renderSectors=function(){r0();udyNoneFix();};})();"]
    .concat(en ? [] : courseLines())
    .concat(["/* UDYAM-MG:END */"]).join("\n") + "\n";
  return { body, M_START };
}
/* v1.3: कार्ड पर "📚 मुफ़्त कोर्स" की कड़ियाँ निकली सूची से (generator/lib_sector.js derive): जिस कार्ड के कोड पर चालू कोर्स हैं,
   वे सब यहाँ अपने-आप; कई हों तो हर कोर्स अपने नाम से; बहुत हों (12 से ज़्यादा) तो सूची के पन्ने की कड़ी।
   जिस कार्ड का अपना कोर्स नहीं, वहाँ udyam_data.js की "संबंधित कोर्स" कड़ी (course) पहले जैसी। */
function courseLines() {
  const X = LIBS.derive(LIBS.load(ROOT)), rows = [];
  Object.keys(X.card).map(Number).sort((a, b) => a - b).forEach((n) => { const e = X.card[n];
    rows.push(n + ":{k:" + e.k + (e.l ? ",l:'" + q(e.l) + "'" : "") + ",c:[" + e.c.map((c) => "['" + q(c[1]) + "','" + q(c[3]) + "']").join(",") + "]}"); });
  return ["/* कार्ड → उसके चालू कोर्स (निकली सूची; स्रोत: assets/courses_data.js के «सेक्टर-कार्ड» कोड) */",
    "const UDY_K={" + rows.join(",\n  ") + "};",
    "function udyCourseLinks(s){",
    "  var k=UDY_K[s.n],a=function(u,t){return '<a href=\"'+u+'\" onclick=\"event.stopPropagation()\" style=\"display:block;color:var(--green);font-weight:700;font-size:16px;margin-top:6px;text-decoration:none\">📚 '+t+' →</a>';};",
    "  if(!k)return s.course?a(s.course,'मुफ़्त कोर्स पढ़ें'):'';",
    "  if(k.l)return a(k.l,k.k+' मुफ़्त कोर्स देखें');",
    "  if(k.c.length===1)return a(k.c[0][1],'मुफ़्त कोर्स पढ़ें');",
    "  return k.c.map(function(c){return a(c[1],c[0]);}).join('');",
    "}"];
}
/* कार्ड के साँचे की कोर्स-पंक्ति (पन्ने का हाथ वाला हिस्सा): एक बार बदलकर udyCourseLinks(s) पर */
function placeCourseCall(src) {
  const NEW = "${udyCourseLinks(s)}";
  if (src.split(NEW).length === 2) return src;
  const re = /\$\{s\.course\?`<a href="\$\{s\.course\}"[^`]*`:''\}/g, m = src.match(re);
  if (!m || m.length !== 1) stop("कार्ड के साँचे की कोर्स-पंक्ति ठीक एक बार नहीं मिली");
  return src.replace(re, () => NEW);
}
const M_END = "/* UDYAM-MG:END */";
function placeMg(src, lang) {
  const { body, M_START } = mgBlock(lang);
  if (src.includes(M_START)) {
    if (src.split(M_START).length !== 2 || src.split(M_END).length !== 2) stop("UDYAM-MG START/END ठीक एक-एक बार नहीं (" + lang + ")");
    const a = src.indexOf(M_START), b = src.indexOf(M_END) + M_END.length + 1;
    return src.slice(0, a) + body + src.slice(b);
  }
  const re = /const MG=\[\n *\{id:'all',name:'[^']*'\},\n[\s\S]*?\n\];\n/g, m = src.match(re);
  if (!m || m.length !== 1) stop("पन्ने की पुरानी सेक्टर-सूची (const MG=[…]) ठीक एक बार नहीं मिली (" + lang + ")");
  return src.replace(re, () => body);
}
/* कुल गिनती की तीन जगहें: हर एक ठीक एक बार मिलनी चाहिए */
function counts(src, n, lang) {
  const R = lang === "en" ? [
    [/(<span class="hs-num">)\d+(<\/span><div class="hs-lbl">Enterprises<\/div>)/g, "$1" + n + "$2"],
    [/(<div class="sector-count" id="sectorCount">All )\d+( Enterprises<\/div>)/g, "$1" + n + "$2"],
    [/(filtered\.length===)\d+(\?'All )\d+( Enterprises')/g, "$1" + n + "$2" + n + "$3"]
  ] : [
    [/(<span class="hs-num">)\d+(<\/span><div class="hs-lbl">उद्यम<\/div>)/g, "$1" + n + "$2"],
    [/(<div class="sector-count" id="sectorCount">सभी )\d+( उद्यम<\/div>)/g, "$1" + n + "$2"],
    [/(filtered\.length===)\d+(\?'सभी )\d+( उद्यम')/g, "$1" + n + "$2" + n + "$3"]
  ];
  for (const [re, to] of R) { const m = src.match(re); if (!m || m.length !== 1) stop("कुल गिनती की जगह ठीक एक बार नहीं मिली (" + lang + "): " + re.source.slice(0, 50)); src = src.replace(re, to); }
  return src;
}
/* ---------- हिंदी पन्ना ---------- */
const src = fs.readFileSync(PAGE, "utf8");
const { html, n } = block();
const kadi = K_START + '\n    <p style="margin:0 0 12px"><a href="#puri-suchi" style="display:inline-block;padding:11px 14px;font-size:17px;font-weight:700;line-height:1.5;color:var(--blue);background:#EEF4FF;border:1.5px solid #BBDEFB;border-radius:10px;text-decoration:none">📋 सभी ' + n + ' उद्यमों की पूरी सूची देखें (सेक्टर के अनुसार) ↓</a></p>\n' + K_END + "\n";
let next = place(src, START, END, html, ANCHOR, true);
next = place(next, K_START, K_END, kadi, K_ANCHOR, false);
next = placeCourseCall(counts(placeMg(next, "hi"), n, "hi"));
/* ---------- English पन्ना ---------- */
const PAGE_EN = path.join(ROOT, "en", "industries", "index.html");
const srcEn = fs.readFileSync(PAGE_EN, "utf8");
const nextEn = counts(placeMg(srcEn, "en"), n, "en");
for (const [nm2, txt] of [["udyam/index.html", next], ["en/industries/index.html", nextEn]]) {
  const sc = txt.slice(txt.indexOf("UDYAM-MG:START"), txt.indexOf("/* UDYAM-MG:END */"));
  try { new Function("renderSectors", "activeMG", "searchQ", "document", sc.slice(sc.indexOf("\n") + 1)); } catch (e) { stop(nm2 + ": बने हुए JS में गड़बड़ी: " + e.message); }
  if ((sc.match(/\{id:\d+,name:'/g) || []).length !== 25) stop(nm2 + ": सेक्टर-बटन ठीक 25 नहीं (24 + «उपरोक्त में कोई नहीं»)");
}
if (CHECK) {
  if (next !== src) stop("--check: udyam/index.html बासी है (generator चलाएँ)");
  if (nextEn !== srcEn) stop("--check: en/industries/index.html बासी है (generator चलाएँ)");
  console.log("🏁 --check पास: udyam/index.html और en/industries/index.html ताज़ा हैं (" + n + " उद्यम, 24 सेक्टर + «उपरोक्त में कोई नहीं»)।");
} else {
  for (const [P, a, b, nm2] of [[PAGE, src, next, "udyam/index.html"], [PAGE_EN, srcEn, nextEn, "en/industries/index.html"]]) {
    if (a === b) console.log("✅ पहले जैसा: " + nm2);
    else { fs.writeFileSync(P, b); console.log("✅ लिखा: " + nm2 + " (" + a.length + " → " + b.length + " अक्षर)"); }
  }
  console.log("🏁 build_udyam_suchi v1.3 (" + n + " उद्यम, 24 सेक्टर + «उपरोक्त में कोई नहीं»)");
}
