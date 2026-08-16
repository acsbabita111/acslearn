/* ============================================================
   build_dca_pages.js — DCA-2036 कोर्स पाठ-पेजों का generator (परत-4)
   v1.0 · 16-Aug-2026
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   साँचा: build_mushroom_pages.js v1.0 (13-Aug) — "नया स्टाइल"
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट)
         + generator/data/dca_course_data.js (परत-3 — meta, 22 खंड)
         + generator/data/dca_lessons_kNN.js (परत-3 — 22 shard, पाठ-सामग्री md)
   चलाना: repo-रूट से → node generator/build_dca_pages.js
          नमूना: node generator/build_dca_pages.js --only 1,7
          आंशिक (जब तक 498 पूरे न हों, सिर्फ़ जाँच हेतु): --partial
          (--partial में index/kyon नहीं बनते — अधूरी सूची कभी live नहीं)
   नतीजा: /courses/hi/dca-2036/dca-NNN-slug.html + index.html + kyon.html

   check-robot (fail = पेज बनेगा ही नहीं):
   1. हर पाठ ≥ 1150 दिखने वाले शब्द (svg/चेकबॉक्स-पंक्ति छोड़कर)
   2. हर पाठ में ≥ 1 रेखा-चित्र (svg) — पाठ का अपना जान-चित्र (md में हाथ-रचित)
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं (svg समेत)
   5. मूल 10 खंड-शीर्षक मौजूद (उद्देश्य … योग्यता-जाँच)
   6. योग्यता-जाँच के ≥ 3 checkbox बने हों
   7. course-lesson.css/js कड़ी अनिवार्य (30-Jul स्थायी-नियम)
   8. md-शीर्षक = पाठ-सूची v3.0-FINAL शीर्षक (बेमेल = चेतावनी; खंड-8 Founder-लंबित)
   (कूट-नाम-जाँच इस कोर्स पर लागू नहीं — "DCA" ही सार्वजनिक नाम है।)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { DCA_COURSE } = require(path.join(__dirname, "data", "dca_course_data.js"));
const C = DCA_COURSE;
const LESSON_SRC = {};
for (const p of C.parts){
  const sh = require(path.join(__dirname, "data", "dca_lessons_k" + String(p.no).padStart(2, "0") + ".js"));
  Object.assign(LESSON_SRC, sh.LESSONS);
}
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "16-Aug-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_dca_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- देवनागरी → Roman slug (मशरूम-generator से हूबहू) ---------- */
const TR = {
  "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"n","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"n",
  "ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
  "प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh",
  "ष":"sh","स":"s","ह":"h","ळ":"l","क़":"q","ख़":"kh","ग़":"g","ज़":"z","ड़":"r","ढ़":"rh",
  "फ़":"f","य़":"y","अ":"a","आ":"aa","इ":"i","ई":"ee","उ":"u","ऊ":"oo","ऋ":"ri","ए":"e",
  "ऐ":"ai","ओ":"o","औ":"au","ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","ृ":"ri","े":"e",
  "ै":"ai","ो":"o","ौ":"au","ं":"n","ँ":"n","ः":"","्":"","़":"","ॐ":"om"
};
const CONS = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळक़ख़ग़ज़ड़ढ़फ़य़";
const MATRA = "ािीुूृेैोौंँः्";
function slugify(t){
  const chars = Array.from(t);
  let s = "";
  for (let i = 0; i < chars.length; i++){
    const ch = chars[i];
    if (TR[ch] === undefined){ s += ch; continue; }
    s += TR[ch];
    if (CONS.indexOf(ch) >= 0){
      const nx = chars[i+1];
      const wordEnd = (nx === undefined) || MATRA.indexOf(nx) < 0 && CONS.indexOf(nx) < 0 && TR[nx] === undefined;
      if (nx !== undefined && MATRA.indexOf(nx) < 0 && !wordEnd) s += "a";
      else if (nx === "ं" || nx === "ँ") s += "a";      /* कं → kan (kn नहीं) — slug पठनीय */
    }
  }
  s = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s || "paath";
}
function pad3(n){ return String(n).padStart(3, "0"); }
/* slug-पिन (live पता कभी न बदले) — अभी ख़ाली; live होने के बाद शीर्षक बदले तो यहाँ पिन जोड़ें */
const SLUG_PIN = {};
function fileName(l){
  if (SLUG_PIN[l.num]) l.slug = SLUG_PIN[l.num];
  let base = C.code + "-" + pad3(l.num) + "-" + l.slug;
  if (base.length > 60) base = base.slice(0, 60).replace(/-$/, "");
  if (!/^[a-z0-9-]+$/.test(base)) throw new Error("slug-नियम टूटा: " + base);
  return base + ".html";
}

/* ---------- md → HTML ---------- */
function esc(t){ return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function inline(t){
  t = esc(t);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  t = t.replace(/\*([^*\n]+)\*/g, "<i>$1</i>");
  t = t.replace(/«([^»]+)»/g, "<b>«$1»</b>");
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  t = t.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
  return t;
}
function mdToHtml(body){
  /* DCA-md में svg ```svg … ``` बाड़े में — पहले निकालो, बाद में figure बनाकर बैठाओ */
  const svgs = [];
  body = body.replace(/```svg\s*([\s\S]*?)```/g, (m, sv) => { svgs.push(sv.trim()); return "\n@@SVG" + (svgs.length-1) + "@@\n"; });
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, m => { svgs.push(m); return "\n@@SVG" + (svgs.length-1) + "@@\n"; });
  const lines = body.split("\n");
  const out = [];
  let para = [], table = [], list = [], olist = [], chks = [], code = null;
  function flushPara(){ if (para.length){ out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } }
  function flushTable(){
    if (!table.length) return;
    let h = '<div class="msh-tblwrap"><table class="msh-tbl">';
    let first = true;
    table.forEach(row => {
      const cells = row.replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) return;
      const tag = first ? "th" : "td"; first = false;
      h += "<tr>" + cells.map(c => "<" + tag + ">" + inline(c) + "</" + tag + ">").join("") + "</tr>";
    });
    h += "</table></div>";
    out.push(h); table = [];
  }
  function flushList(){ if (list.length){ out.push("<ul>" + list.map(x => "<li>" + inline(x) + "</li>").join("") + "</ul>"); list = []; } }
  function flushOList(){ if (olist.length){ out.push("<ol>" + olist.map(x => "<li>" + inline(x) + "</li>").join("") + "</ol>"); olist = []; } }
  function flushChks(){
    if (chks.length){
      out.push('<div class="msh-chkbox">' + chks.map((x, i) =>
        '<label class="msh-chk"><input type="checkbox" class="msh-q" data-q="' + i + '"> <span>' + inline(x) + "</span></label>"
      ).join("") + "</div>");
      chks = [];
    }
  }
  function flushAll(){ flushPara(); flushTable(); flushList(); flushOList(); flushChks(); }

  for (let raw of lines){
    const ln = raw.replace(/\s+$/,"");
    const t = ln.trim();
    if (code !== null){                       /* सादा code-बाड़ा (```) — जैसा है वैसा */
      if (/^```/.test(t)){ out.push("<pre>" + esc(code.join("\n")) + "</pre>"); code = null; }
      else code.push(ln);
      continue;
    }
    if (/^```/.test(t)){ flushAll(); code = []; continue; }
    if (!t){ flushAll(); continue; }
    if (/^@@SVG\d+@@$/.test(t)){ flushAll(); out.push(t); continue; }
    if (/^---+$/.test(t)){ flushAll(); continue; }
    if (/^###\s+/.test(t)){ flushAll(); out.push("<h3>" + inline(t.replace(/^###\s+/,"")) + "</h3>"); continue; }
    if (/^\|/.test(t)){ flushPara(); flushList(); flushOList(); flushChks(); table.push(t); continue; }
    flushTable();
    if (/^>\s?/.test(t)){ flushAll(); out.push("<blockquote>" + inline(t.replace(/^>\s?/,"")) + "</blockquote>"); continue; }
    if (/^☐\s?/.test(t) || /^- \[ \]\s?/.test(t)){
      flushPara(); flushList(); flushOList();
      chks.push(t.replace(/^☐\s?/,"").replace(/^- \[ \]\s?/,""));
      continue;
    }
    if (/^[-*] /.test(t)){ flushPara(); flushOList(); flushChks(); list.push(t.replace(/^[-*] /,"")); continue; }
    if (/^\d+[.)] /.test(t)){ flushPara(); flushList(); flushChks(); olist.push(t.replace(/^\d+[.)] /,"")); continue; }
    flushList(); flushOList(); flushChks();
    para.push(t);
  }
  flushAll();
  let html = out.join("\n");
  svgs.forEach((sv, i) => {
    html = html.replace("@@SVG" + i + "@@", '<figure class="lsn-fig">' + sv + "</figure>");
  });
  return html;
}

/* ---------- md पढ़ना व पार्स ---------- */
const REQUIRED = ["उद्देश्य","मुख्य बात","आज का काम","नाप","सबूत","AI-सहायक","आम ग़लती","सुरक्षा-पत्रक","स्रोत","योग्यता-जाँच"];
function parseLesson(n){
  const src = LESSON_SRC[String(n)];
  if (!src) return null;
  const hm = src.match(/^# पाठ-(\d+):\s*(.+)$/m);
  if (!hm || parseInt(hm[1],10) !== n) throw new Error("पाठ-" + n + ": header बेमेल");
  const title = hm[2].trim();
  let body = src.slice(hm.index + hm[0].length);
  /* header-block की meta-पंक्ति (*(DCA-2036 · खंड-N · …)*) व नाबालिग-नोट — पहले "## " से पहले की *(…)* पंक्तियाँ छोड़ो */
  const firstSec = body.search(/^## /m);
  const pre = firstSec >= 0 ? body.slice(0, firstSec) : "";
  const notes = pre.split("\n").map(x => x.trim()).filter(x => x && !/^\*\(DCA-2036/.test(x));
  body = firstSec >= 0 ? body.slice(firstSec) : body;
  /* पहला svg = जान-चित्र (hero) — अपनी जगह से उठाकर शीर्ष पर; उसका खंड-शीर्षक figcaption बने */
  const parts = body.split(/^## /m).slice(1);
  const sections = parts.map(p => {
    const nl = p.indexOf("\n");
    return { t: p.slice(0, nl).trim().replace(/^\d+\.\s*/, ""), body: p.slice(nl + 1) };
  });
  let hero = null, heroCap = "";
  for (const s of sections){
    const m = s.body.match(/```svg\s*([\s\S]*?)```/);
    if (m){
      hero = m[1].trim(); heroCap = s.t.replace(/^चित्र\s*[—-]\s*/, "");
      s.body = s.body.replace(m[0], "");
      break;
    }
  }
  const secs = sections.filter(s => s.body.replace(/\s/g,"").length > 0 || /योग्यता/.test(s.t));
  const wc = visibleWordsMd(body);
  const minutes = Math.max(10, Math.round(wc / 110));
  return { num: n, title, notes, sections: secs, hero, heroCap, minutes, slug: slugify(title) };
}
function visibleWordsMd(md){
  const b = md.replace(/```svg[\s\S]*?```/g, " ").replace(/<svg[\s\S]*?<\/svg>/gi, " ").replace(/^- \[ \].*$/gm, "");
  const m = b.match(/[\u0900-\u097FA-Za-z0-9]+/g);
  return m ? m.length : 0;
}

/* ---------- check-robot ---------- */
function visibleText(html){
  return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function wordCount(html){ const m = visibleText(html).match(/[\u0900-\u097FA-Za-z0-9]+/g); return m ? m.length : 0; }
function checkRobot(l, contentHtml){
  const holes = [], warns = [];
  const words = wordCount(contentHtml);
  if (words < 1150) holes.push("शब्द-गिनती " + words + " (< 1150)");
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const small = contentHtml.match(/font(?:-size)?\s*[:=]\s*["']?0*([0-9]{1,2})(?:\.[0-9]+)?(?:px)?["']?/gi) || [];
  for (const m of small){
    const num = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?/)[1], 10);
    if (num < 16 && num > 4) holes.push("font-size " + num + " (< 16): " + m.trim());
  }
  const miss = REQUIRED.filter(r => !l.sections.some(s => s.t.indexOf(r) >= 0));
  if (miss.length) holes.push("मूल खंड-शीर्षक ग़ायब: " + miss.join(", "));
  const chkN = (contentHtml.match(/class="msh-q"/g) || []).length;
  if (chkN < 3) holes.push("योग्यता-जाँच checkbox " + chkN + " (< 3)");
  if (SYL_TITLE[l.num] && SYL_TITLE[l.num] !== l.title) warns.push("शीर्षक ≠ पाठ-सूची v3.0 («" + SYL_TITLE[l.num] + "»)");
  return { words, holes, warns };
}

/* पाठ-सूची v3.0-FINAL के शीर्षक (मिलान-जाँच हेतु) — dca_course_data के साथ रखे */
const SYL_TITLE = (function(){
  const f = path.join(__dirname, "data", "dca_syllabus_v3.json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {};
})();

/* ---------- menu (links.js से) ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

/* course-progress.js का config (पाठ→quiz-shard, रंग-व्यवस्था) — page पर inline */
const CP_CONFIG = '<script>window.ACS_CP={code:"dca",parts:' +
  JSON.stringify(C.parts.map(p => [p.from, p.to])) + ',quizSrc:"/assets/dca_quiz/dca_quiz_k",quizVar:"DCA_QUIZ_K"};</scr' + 'ipt>';

function PART(num){ return C.parts.find(p => num >= p.from && num <= p.to) || C.parts[C.parts.length-1]; }
function LAYER(pt){ return C.layers.find(L => pt.no >= L.from && pt.no <= L.to); }

/* ---------- पाठ-body ---------- */
function jumpList(all, cur){
  const pt = PART(cur);
  const inPart = all.filter(x => x.num >= pt.from && x.num <= pt.to);
  return inPart.map(x =>
    x.num === cur ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>"
                  : '<a href="' + fileName(x) + '">पाठ-' + x.num + "</a>"
  ).join(" ") + ' <a href="index.html">📖 पूरी सूची (' + C.totalLessons + ' पाठ)</a>';
}

function lessonBody(l, all, prevFile, nextFile){
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + esc(s.t) + "</h2>\n" + mdToHtml(s.body).trim() + "\n</section>"
  ).join("\n\n");
  const prev = prevFile ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
                        : '<a class="lsn-navbtn" href="index.html">← कोर्स-परिचय</a>';
  const next = nextFile ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '" data-nextlsn>अगला पाठ →</a>'
                        : '<a class="lsn-navbtn lsn-next" href="index.html">🎉 कोर्स-सूची पर लौटें</a>';
  const pt = PART(l.num), ly = LAYER(pt);
  const noteHtml = l.notes.length ? '<p class="lsn-vidnote">' + l.notes.map(x => inline(x)).join(" ") + "</p>\n" : "";
  const heroHtml = l.hero
    ? '<figure class="lsn-fig lsn-hero">\n' + l.hero + '\n<figcaption>पाठ-चित्र: ' + esc(l.heroCap || l.title) + ' — एक नज़र में</figcaption>\n</figure>\n\n'
    : "";
  return '\n<article class="lsn-wrap" data-lsn-num="' + l.num + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › खंड-" + pt.no + ": " + esc(pt.name) + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + esc(l.title) + "</h1>\n" +
    '<p class="lsn-meta">पढ़ने का समय: ' + l.minutes + " मिनट · पूरा पाठ (पढ़ना + आज का काम) ≈ 1 घंटा · " +
      "पाठ " + l.num + " / " + C.totalLessons + " · " + esc(ly ? ly.name : "") + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="index.html">📖 कोर्स-परिचय</a></p>\n' + noteHtml +
    "</header>\n\n" +
    '<details class="lsn-jump">\n<summary>📚 इस खंड के सब पाठ — किसी पर सीधे जाओ</summary>\n<div class="lsn-jumplist">\n' +
    jumpList(all, l.num) + "\n</div>\n</details>\n\n" +
    heroHtml + secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते —</p>\n" +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent(l.title + " हिंदी कंप्यूटर") + '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      '<a class="lsn-vidbtn lsn-vidgov" href="https://www.nielit.gov.in" target="_blank" rel="noopener">🏛️ NIELIT — सरकारी कंप्यूटर-शिक्षा संस्थान</a></p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में — बाहरी site, जानकारी ख़ुद verify करें; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function assemble(body, meta){
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + meta.title + "</title>\n" +
    '<meta name="description" content="' + meta.desc + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + meta.canonical + '">');
  page = page.replace("</head>",
    '<meta property="og:title" content="' + meta.title + '">\n' +
    '<meta property="og:description" content="' + meta.desc + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + meta.canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    (meta.ld ? '<script type="application/ld+json">' + JSON.stringify(meta.ld) + "</scr" + "ipt>\n" : "") +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>",
    MENU_FALLBACK_JS + "\n" + CP_CONFIG +
    '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>' +
    '\n<script src="/assets/course-progress.js" defer></scr' + 'ipt>\n</body>');
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson कड़ी नहीं");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return page;
}

function buildLessonPage(l, all, i){
  const prevFile = i > 0 ? fileName(all[i-1]) : null;
  const nextFile = i < all.length - 1 ? fileName(all[i+1]) : null;
  const body = lessonBody(l, all, prevFile, nextFile);
  const { words, holes, warns } = checkRobot(l, body);
  warns.forEach(w => console.warn("   ⚠️ पाठ-" + l.num + ": " + w));
  if (holes.length){
    console.error("❌ पाठ-" + l.num + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/" + fileName(l);
  const ld = { "@context":"https://schema.org", "@type":"LearningResource",
    "name":"पाठ-"+l.num+": "+l.title,
    "description": l.title + " — " + C.title + " (मुफ़्त हिंदी पाठ)",
    "inLanguage":"hi","isAccessibleForFree":true,"learningResourceType":"Lesson","url":canonical,
    "isPartOf":{ "@type":"Course","name":C.title,"description":C.tagline,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } } };
  const page = assemble(body, {
    title: "पाठ-" + l.num + ": " + l.title + " | " + C.title + " | ACS",
    desc: l.title + " — मुफ़्त हिंदी पाठ, " + C.subtitle + " (ACS)। कक्षा-6 स्तर की सरल भाषा में।",
    canonical, ld
  });
  return { page, words };
}

/* ---------- कोर्स-index ---------- */
function buildIndex(all){
  function partBlock(pt){
    const items = all.filter(l => l.num >= pt.from && l.num <= pt.to).map(l =>
      '<li class="ci-item"><a class="msh-lsn" data-num="' + l.num + '" href="' + fileName(l) + '">पाठ-' + l.num + ": " + esc(l.title) +
      '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
    ).join("\n");
    return '<details class="ci-drop" data-from="' + pt.from + '" data-to="' + pt.to + '">\n' +
      '<summary><span>खंड-' + pt.no + ": " + esc(pt.name) +
      '</span><span class="ci-arrow">▼ पाठ ' + pt.from + "-" + pt.to + '</span></summary>\n' +
      '<ul class="ci-list">\n' + items + '\n</ul>\n</details>\n\n';
  }
  function layerBlock(L){
    const pts = C.parts.filter(p => p.no >= L.from && p.no <= L.to);
    const n = pts.reduce((a,p) => a + (p.to - p.from + 1), 0);
    return '<h2 class="ci-layer">' + esc(L.name) + ' — खंड ' + L.from + "-" + L.to + " (" + n + " पाठ)</h2>\n" + pts.map(partBlock).join("");
  }
  const body = '\n<article class="lsn-wrap ci-wrap" data-msh-index>\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + "</p>\n" +
    "<h1>" + esc(C.title) + "</h1>\n" +
    '<p class="lsn-meta">' + esc(C.subtitle) + " · ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · बिना login · अपनी गति से · कुल " + C.totalLessons + " पाठ · 22 खंड · हर पाठ ≈ 1 घंटा</p>\n" +
    '<p class="lsn-tools"><a class="lsn-toolbtn" href="kyon.html">💛 पहले यह पढ़ें — यह कोर्स क्यों</a></p>\n' +
    "</header>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p>यह कोर्स गाँव-क़स्बे के उस विद्यार्थी के लिए है जो कंप्यूटर से पहली कमाई तक पहुँचना चाहता है — 10 साल के बच्चे से लेकर दुकान चलाने वाले बड़े तक। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। कंप्यूटर न हो तो भी शुरू कीजिए — पहले 6 पाठ बिना कंप्यूटर के हैं, और मोबाइल पर भी सब पढ़ा जा सकता है।</p>\n" +
    "<p>रास्ता सीधा है — <b>पहले यहाँ मुफ़्त पढ़ो</b>, हर पाठ का «आज का काम» ख़ुद करो, «नाप» से जाँचो, «सबूत» सँभालो। हर पाठ के अंत में योग्यता-जाँच के डिब्बे हैं — उन्हें टिक करते चलो। नीचे 5 अभ्यास-प्रश्न भी हैं — यह अभ्यास है, परीक्षा नहीं। पूरा कोर्स = 22 खंड, चार परतों में: 🅐 CORE (कंप्यूटर की नींव) → 🅑 DIGITAL (AI, पैसा, सरकारी सेवा, सुरक्षा) → 🅒 EMPLOYMENT (दुकान-काम, डेटा-एंट्री, व्यवहार) → 🅓 ENTREPRENEURSHIP (रोज़गार, CSC, मार्केटिंग, हिसाब, महा-परियोजना)।</p>\n" +
    "<p><b>ईमानदार बात:</b> कोर्स पूरा करने के बाद 120-प्रश्न की परीक्षा है, पर अकेली परीक्षा प्रमाणपत्र के लिए काफ़ी नहीं — जानो → करो → साबित करो → सौंपो, चारों स्तर चाहिए। यहाँ \"सरकारी मान्यता\" का कोई दावा नहीं है — सिर्फ़ यह तथ्य कि हर पाठ ≈ 1 घंटा है और पूरा कोर्स लगभग 498 घंटे का।</p>\n" +
    '<p class="msh-legend"><b>रंग का मतलब:</b> <span class="lg lg-done">हरा = पढ़ा और जाँच पूरी</span> · <span class="lg lg-todo">काला = अभी बाक़ी</span> · <span class="lg lg-miss">लाल = छूट गया (आगे बढ़ गए पर यह अधूरा)</span></p>\n' +
    "</section>\n\n" +
    C.layers.map(layerBlock).join("") +
    "</article>\n";
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/";
  return assemble(body, {
    title: C.title + " — मुफ़्त हिंदी कोर्स (" + C.totalLessons + " पाठ) | ACS",
    desc: C.subtitle + " — " + C.tagline,
    canonical,
    ld: { "@context":"https://schema.org","@type":"Course","name":C.title,"description":C.tagline,
      "inLanguage":"hi","isAccessibleForFree":true,"url":canonical,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } }
  });
}

/* ---------- "यह कोर्स क्यों" — भावनात्मक पेज ---------- */
function buildKyon(firstFile){
  const body = '\n<article class="lsn-wrap" data-msh-kyon>\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › यह कोर्स क्यों</p>\n" +
    "<h1>यह कोर्स क्यों — शुरू करने से पहले दो मिनट</h1>\n" +
    '<p class="lsn-meta">पढ़ने का समय: 4 मिनट · यह पेज दिल से लिखा गया है</p>\n' +
    "</header>\n\n" +
    '<section class="lsn-sec">\n<h2>एक छोटी-सी कहानी</h2>\n' +
    "<p>क़स्बे के चौराहे पर एक छोटी दुकान है। बाहर तख़्ती लगी है — फ़ोटो, ज़ेरॉक्स, ऑनलाइन फ़ॉर्म। भीतर एक पुराना कंप्यूटर, एक प्रिंटर, और एक लड़की जो सुबह से शाम तक लोगों के काम निपटाती है। किसी का पेंशन-फ़ॉर्म, किसी का रिज़्यूमे, किसी के बच्चे का स्कूल-आवेदन।</p>\n" +
    "<p>दो साल पहले वही लड़की कंप्यूटर के पास बैठने से डरती थी। फिर उसने रोज़ एक-एक घंटा सीखा — टाइपिंग, Word, Excel, इंटरनेट, UPI, सरकारी पोर्टल, और आजकल AI भी। आज वह अपने गाँव की सबसे भरोसेमंद डिजिटल-दुकान चलाती है, और दो लोगों को काम देती है।</p>\n" +
    "<p>यह कोर्स उसी सफ़र का पूरा नक़्शा है — पहले पाठ से पहली कमाई तक। पूरा। मुफ़्त। आपकी अपनी भाषा में।</p>\n</section>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके सपने के लिए बना है</h2>\n' +
    "<p><b>उस विद्यार्थी के लिए</b> — जिसके स्कूल में कंप्यूटर की कक्षा नहीं लगी। यहाँ पहले 6 पाठ बिना कंप्यूटर के हैं, और हर पाठ कक्षा-6 की हिंदी में।</p>\n" +
    "<p><b>उस युवा के लिए</b> — जो नौकरी ढूँढ रहा है और हर जगह \"कंप्यूटर आता है?\" सुनकर चुप हो जाता है। यह कोर्स सिर्फ़ जवाब नहीं देता, सबूत देता है — पोर्टफ़ोलियो, परियोजना, प्रमाणपत्र।</p>\n" +
    "<p><b>उस दुकानदार, किसान, गृहिणी के लिए</b> — जिसे अपने ही काम में कंप्यूटर की ज़रूरत है: हिसाब, बिल, फ़ॉर्म, UPI, WhatsApp-धंधा। यहाँ हर हुनर असली काम से जुड़ा है।</p>\n" +
    "<p><b>उसके लिए जो अपनी दुकान खोलना चाहता है</b> — डिजिटल सेवा-केंद्र, CSC, टाइपिंग-दुकान। कोर्स का अंतिम खंड इसी \"अपना डिजिटल सेवा-केंद्र\" की महा-परियोजना है।</p>\n</section>\n\n" +
    '<section class="lsn-sec">\n<h2>सच भी सुन लीजिए</h2>\n' +
    "<p>यह कोर्स आपसे झूठ नहीं बोलेगा। कंप्यूटर सीख लेने भर से नौकरी नहीं मिलती। मिलती है — अभ्यास से, सबूत से, और ग्राहक के काम को समय पर, सही करके देने से। इसलिए हर पाठ में «आज का काम», «नाप» और «सबूत» है — पढ़ना काफ़ी नहीं, करना पड़ेगा।</p>\n" +
    "<p>यह कोर्स सस्ते, पुराने कंप्यूटर और धीमे इंटरनेट की असली दुनिया के लिए लिखा गया है — बिजली जाती है, RAM कम है, डेटा महँगा है। इन सबके नुस्ख़े पाठों में हैं। और AI का ज़माना आ चुका है — इसलिए एक पूरा खंड AI के रोज़ के काम पर है, ताकि गाँव का बच्चा उसी औज़ार से काम करे जिससे शहर की कंपनियाँ करती हैं।</p>\n</section>\n\n" +
    '<section class="lsn-sec">\n<h2>आपसे एक वादा — और आपसे एक माँग</h2>\n' +
    "<p><b>हमारा वादा:</b> पूरी पढ़ाई मुफ़्त रहेगी। सभी " + C.totalLessons + " पाठ पूरे हैं, कोई आधा नहीं। हर पाठ ≈ 1 घंटा — पढ़ना, करना, जाँचना।</p>\n" +
    "<p><b>हमारी माँग:</b> रोज़ एक पाठ। हर पाठ का काम ख़ुद करें, सबूत सँभालें, अंत की जाँच टिक करें। छूटा पाठ सूची में लाल दिखेगा — वह आपको वापस बुलाएगा।</p>\n" +
    "<p>सपना आपका है। रास्ता यह कोर्स है। पहला क़दम — नीचे का बटन।</p>\n" +
    '<p class="lsn-tools"><a class="lsn-vidbtn" href="index.html">📖 कोर्स की पूरी सूची देखें</a> <a class="lsn-vidbtn" href="' + firstFile + '">🚀 सीधे पाठ-1 से शुरू करें</a></p>\n</section>\n' +
    "</article>\n";
  return assemble(body, {
    title: "यह कोर्स क्यों — " + C.title + " | ACS",
    desc: "शुरू करने से पहले दो मिनट — DCA-2036 किसके सपने के लिए बना है, और आपसे क्या माँगता है।",
    canonical: "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/kyon.html"
  });
}

/* ---------- मुख्य ---------- */
const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx+1].split(",").map(Number) : null;
const PARTIAL = args.indexOf("--partial") >= 0;

const ALL = [], MISSING = [];
for (let n = 1; n <= C.totalLessons; n++){
  const l = parseLesson(n);
  if (l) ALL.push(l); else MISSING.push(n);
}
if (MISSING.length){
  console.error((PARTIAL ? "⚠️" : "❌") + " shard में ग़ायब पाठ (" + MISSING.length + "): " + MISSING.join(", "));
  if (!PARTIAL){ console.error("   → सब 498 के बिना पूरा build नहीं; सिर्फ़ जाँच हेतु --partial दें।"); process.exit(1); }
}

/* slug-टकराव जाँच */
const seen = {};
ALL.forEach(l => { let f = fileName(l); if (seen[f]) { l.slug = l.slug + "-" + l.num; f = fileName(l); } seen[f] = 1; });

const outDir = path.join(ROOT, "courses", C.lang, C.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0, totalWords = 0;
ALL.forEach((l, i) => {
  if (ONLY && ONLY.indexOf(l.num) < 0) return;
  const built = buildLessonPage(l, ALL, i);
  if (!built){ fail++; return; }
  fs.writeFileSync(path.join(outDir, fileName(l)), built.page, "utf8");
  totalWords += built.words;
  if (ONLY || ok < 5 || l.num % 50 === 0) console.log("✅ पाठ-" + l.num + " → " + fileName(l) + " (" + built.words + " शब्द)");
  ok++;
});

if (!ONLY && !PARTIAL && !MISSING.length && !fail){
  fs.writeFileSync(path.join(outDir, "index.html"), buildIndex(ALL), "utf8");
  console.log("✅ कोर्स-परिचय → index.html");
  fs.writeFileSync(path.join(outDir, "kyon.html"), buildKyon(fileName(ALL[0])), "utf8");
  console.log("✅ यह-कोर्स-क्यों → kyon.html");
}
console.log("---- कुल: " + ok + " ✅ · " + fail + " ❌ · औसत शब्द " + (ok ? Math.round(totalWords/ok) : 0) + " ----");
if (fail || (MISSING.length && !PARTIAL)) process.exit(1);
