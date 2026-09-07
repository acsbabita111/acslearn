/* ============================================================
   build_fwd_pages.js — SE024 चार-पहिया चालक कोर्स पाठ-पेजों का generator (परत-4)
   v1.0 · 07-Sep-2026 — build_mushroom_pages.js (v1.0) की नक़ल, SE024-रूप
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट)
         + generator/data/fwd_course_data.js (परत-3 — meta)
         + generator/data/fwd_lessons_ch01..28.js (परत-3 — सामग्री, 440 पाठ)
   चलाना: repo-रूट से → node generator/build_fwd_pages.js
          (नमूना: node generator/build_fwd_pages.js --only 1.1,1.2)
   नतीजा: /courses/hi/four-wheeler-driver/fwd-CC-NN-slug.html
          + index.html (कोर्स-परिचय व पूरी पाठ-सूची)

   check-robot (fail = पेज बनेगा ही नहीं):
   1. हर पाठ ≥ 1200 शब्द (Addendum v6.4)
   2. हर पाठ में ≥ 1 रेखा-चित्र (svg)
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं (svg समेत)
   5. कूट-नाम (fwd / SE024) दिखने वाले text में नहीं
   6. अल्पविराम-घनत्व ≤ 12 प्रति 100 शब्द
   7. लाइसेंस-पंक्ति हर पेज पर (v6.4 स्थायी पंक्ति)
   8. course-lesson.css/js कड़ी अनिवार्य (30-Jul स्थायी-नियम)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { FWD_COURSE } = require(path.join(__dirname, "data", "fwd_course_data.js"));
const C = FWD_COURSE;

/* पाठ-सामग्री: 28 अध्याय-shard फ़ाइलों से (एक चीज़ = एक जगह; upload-सुगम) */
const LESSON_SRC = {};
for (let k = 1; k <= 28; k++){
  const sh = require(path.join(__dirname, "data", "fwd_lessons_ch" + String(k).padStart(2, "0") + ".js"));
  Object.assign(LESSON_SRC, sh.LESSONS);
}
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "07-Sep-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_fwd_pages.js v1.1 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- देवनागरी → Roman slug (mushroom v1.0 से हूबहू) ---------- */
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
    }
  }
  s = s.toLowerCase()
       .replace(/[^a-z0-9]+/g, "-")
       .replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s || "paath";
}
function pad2(n){ return String(n).padStart(2, "0"); }
/* slug-पिन नियम: live हो चुका पता कभी न बदले — अभी सूची ख़ाली (पहला build)। */
const SLUG_PIN = {};
function fileName(l){
  if (SLUG_PIN[l.key]) l.slug = SLUG_PIN[l.key];
  let base = C.code + "-" + pad2(l.ch) + "-" + pad2(l.n) + "-" + l.slug;
  if (base.length > 60) base = base.slice(0, 60).replace(/-$/, "");
  if (!/^[a-z0-9-]+$/.test(base)) throw new Error("slug-नियम टूटा: " + base);
  return base + ".html";
}
function chapterOf(l){
  const c = C.chapters.find(c => c.no === l.ch);
  if (!c) throw new Error("अनजान अध्याय: " + l.ch);
  return c;
}
function levelOf(ch){
  return C.levels.find(v => ch >= v.from && ch <= v.to) || C.levels[C.levels.length-1];
}

/* ---------- md पढ़ना व पार्स (mushroom-इंजन की नक़ल) ---------- */
function esc(t){ return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function inline(t){
  t = esc(t);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  t = t.replace(/\*([^*\n]+)\*/g, "<i>$1</i>");
  t = t.replace(/«([^»]+)»/g, "<b>«$1»</b>");
  return t;
}

function mdToHtml(body){
  const lines = body.split("\n");
  const out = [];
  let para = [], table = [], list = [];
  function flushPara(){
    if (para.length){ out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; }
  }
  function flushTable(){
    if (!table.length) return;
    let h = '<div class="lsn-tblwrap"><table class="lsn-tbl">';
    table.forEach((row, i) => {
      const cells = row.replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) return;
      const tag = (i === 0) ? "th" : "td";
      h += "<tr>" + cells.map(c => "<" + tag + ">" + inline(c) + "</" + tag + ">").join("") + "</tr>";
    });
    h += "</table></div>";
    out.push(h); table = [];
  }
  function flushList(){
    if (list.length){ out.push("<ul>" + list.map(x => "<li>" + inline(x) + "</li>").join("") + "</ul>"); list = []; }
  }
  function flushAll(){ flushPara(); flushTable(); flushList(); }

  for (let raw of lines){
    const t = raw.replace(/\s+$/,"").trim();
    if (!t){ flushAll(); continue; }
    if (/^---+$/.test(t)){ flushAll(); continue; }
    if (/^\|/.test(t)){ flushPara(); flushList(); table.push(t); continue; }
    flushTable();
    if (/^>\s?/.test(t)){ flushAll(); out.push("<blockquote>" + inline(t.replace(/^>\s?/,"")) + "</blockquote>"); continue; }
    if (/^- /.test(t)){ flushPara(); list.push(t.replace(/^- /,"")); continue; }
    flushList();
    para.push(t);
  }
  flushAll();
  return out.join("\n");
}

function parseLesson(key){
  const src = LESSON_SRC[key];
  if (!src) throw new Error("पाठ-" + key + " shard में नहीं");
  const hm = src.match(/^## पाठ (\d+)\.(\d+)\s*[—-]\s*(.+)$/m);
  if (!hm || (hm[1] + "." + hm[2]) !== key) throw new Error("पाठ-" + key + ": header बेमेल");
  const title = hm[3].trim();
  const cm = src.match(/\*\*चित्र-नुस्ख़ा:\*\*\s*(.+)/);
  const vm = src.match(/\*\*वीडियो-नुस्ख़ा:\*\*\s*(.+)/);
  const parts = src.split(/^### /m).slice(1);
  const sections = parts.map(p => {
    const nl = p.indexOf("\n");
    return { t: p.slice(0, nl).trim(), body: p.slice(nl + 1) };
  });
  return {
    key, ch: parseInt(hm[1],10), n: parseInt(hm[2],10),
    title, chitra: cm ? cm[1].trim() : "", video: vm ? vm[1].trim() : "",
    sections, slug: slugify(title)
  };
}

/* ============================================================
   hero-इंजन (v5.1 शिक्षण-रेखा-चित्र नियम का SE024-रूप — "पाठ-नक़्शा")
   एक पाठ = एक जान-चित्र · 800×800 वर्गाकार · सिर्फ़ ACS-5 रंग ·
   font ≥16 · legend-पट्टी · जगह-पट्टी · सच्चाई-नियम: हर पंक्ति पाठ के
   अपने मैटर (खंड-शीर्षक + आज-की-सीख का पहला वाक्य) से — गढ़ा कुछ नहीं;
   कटाई शब्द-सीमा पर, "…" जोड़ना निषिद्ध।
   ============================================================ */
const CLR = { navy:"#0B1F3A", blue:"#1565C0", gold:"#F9A825", green:"#2E7D32", off:"#F5F7FA" };

function xesc(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function stripMd(t){
  return String(t).replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*\n]+)\*/g,"$1")
          .replace(/[«»`]/g,"").replace(/\s+/g," ").trim();
}
function wrap(t, maxCh, maxLines){
  const words = stripMd(t).split(" ");
  const lines = []; let cur = "";
  for (const w of words){
    if ((cur + " " + w).trim().length > maxCh){
      if (cur) lines.push(cur.trim());
      cur = w;
      if (lines.length === maxLines) break;
    } else cur = (cur + " " + w);
  }
  if (lines.length < maxLines && cur.trim()) lines.push(cur.trim());
  return lines.slice(0, maxLines);
}
function firstSentence(t){
  t = stripMd(t);
  const i = t.indexOf("।");
  return (i > 0 ? t.slice(0, i + 1) : t).trim();
}
function seekhLine(l){
  const s = l.sections[l.sections.length - 1];
  if (!s) return "";
  for (const ln of s.body.split("\n")){
    const t = ln.trim();
    if (!t || /^[|>#-]/.test(t) || /^---/.test(t)) continue;
    return firstSentence(t);
  }
  return "";
}
function tspanLines(lines, x, y0, lh, extra){
  return lines.map((ln, i) =>
    '<text x="' + x + '" y="' + (y0 + i*lh) + '" ' + extra + '>' + xesc(ln) + '</text>'
  ).join("");
}

function heroSVG(l){
  const c = chapterOf(l);
  const lv = levelOf(l.ch);
  const titleL = wrap(l.title, 36, 2);
  const seekh = seekhLine(l);
  const seekhL = wrap(seekh, 62, 2);
  /* खंड-शीर्षक (गिनती हटाकर) — पाठ के अपने मैटर से */
  const steps = l.sections.map(s => s.t.replace(/^\d+\.\s*/, ""));

  let s = '<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + xesc(l.title) + ' — पाठ-नक़्शा">';
  s += '<rect x="0" y="0" width="800" height="800" rx="22" fill="' + CLR.off + '"/>';

  /* शीर्षक-पट्टी */
  const th = titleL.length > 1 ? 92 : 66;
  s += '<rect x="16" y="16" width="768" height="' + th + '" rx="16" fill="' + CLR.navy + '"/>';
  s += '<rect x="16" y="16" width="10" height="' + th + '" rx="5" fill="' + CLR.gold + '"/>';
  s += tspanLines(titleL, 400, titleL.length > 1 ? 50 : 52, 32,
       'font-size="27" font-weight="700" fill="' + CLR.off + '" text-anchor="middle"');
  /* जगह-पट्टी */
  s += '<text x="400" y="' + (16 + th - 12) + '" font-size="16" fill="' + CLR.gold + '" text-anchor="middle">अध्याय-' + l.ch + ' · पाठ ' + l.n + ' / ' + c.count + ' · स्तर-' + lv.no + ': ' + xesc(lv.name) + '</text>';

  /* legend-पट्टी */
  const ly = 16 + th + 10;
  s += '<rect x="16" y="' + ly + '" width="768" height="34" rx="10" fill="#FFFFFF" stroke="' + CLR.blue + '"/>';
  s += '<text x="400" y="' + (ly + 23) + '" font-size="16" fill="' + CLR.navy + '" text-anchor="middle">सोना = पाठ का रास्ता · नीला अंक = खंड-क्रम · नीचे हरी पट्टी = आज की सीख</text>';

  /* दृश्य-मंच: खंड-नक़्शा (2 स्तंभ) */
  const cy = ly + 44;
  const chH = 560 - th;
  s += '<rect x="16" y="' + cy + '" width="768" height="' + chH + '" rx="16" fill="#FFFFFF" stroke="' + CLR.blue + '" stroke-width="2"/>';
  const rows = Math.ceil(steps.length / 2);
  const rowH = Math.min(84, Math.floor((chH - 24) / rows));
  const colX = [32, 404];
  steps.forEach((st, i) => {
    const col = i < rows ? 0 : 1;
    const row = i % rows;
    const bx = colX[col], by = cy + 14 + row * rowH;
    const bw = 364, bh = rowH - 10;
    s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="12" fill="' + CLR.off + '" stroke="' + CLR.blue + '"/>';
    s += '<circle cx="' + (bx + 26) + '" cy="' + (by + bh/2) + '" r="18" fill="' + CLR.blue + '"/>';
    s += '<text x="' + (bx + 26) + '" y="' + (by + bh/2 + 6) + '" font-size="17" font-weight="700" fill="' + CLR.off + '" text-anchor="middle">' + (i + 1) + '</text>';
    const stepL = wrap(st, 26, 2);
    s += tspanLines(stepL, bx + 52,
      by + (stepL.length > 1 ? bh/2 - 5 : bh/2 + 6), 22,
      'font-size="17" font-weight="600" fill="' + CLR.navy + '"');
  });
  /* सोना-रास्ता तीर: स्तंभ-1 से स्तंभ-2 */
  if (steps.length > rows){
    const ay = cy + 14 + (rows * rowH) / 2;
    s += '<defs><marker id="arF" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="24" refX="20" refY="12" orient="auto"><path d="M2,2 L24,12 L2,22 z" fill="' + CLR.gold + '" stroke="' + CLR.navy + '" stroke-width="2"/></marker></defs>';
    s += '<line x1="380" y1="' + ay + '" x2="400" y2="' + ay + '" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arF)"/>';
  }

  /* आज-की-सीख पट्टी (हरा किनारा — पाठ के अपने अंतिम खंड से) */
  const gy = cy + chH + 12;
  s += '<rect x="16" y="' + gy + '" width="768" height="' + (seekhL.length > 1 ? 78 : 54) + '" rx="14" fill="#FFFFFF" stroke="' + CLR.green + '" stroke-width="3"/>';
  s += tspanLines(seekhL.length ? seekhL : ["इस पाठ की सीख नीचे पूरी पढ़िए।"], 400, gy + 33, 26,
       'font-size="18" font-weight="600" fill="' + CLR.navy + '" text-anchor="middle"');

  /* नीचे की सोना-गोली */
  s += '<rect x="120" y="748" width="560" height="40" rx="27" fill="' + CLR.gold + '"/>';
  s += '<text x="400" y="774" font-size="17" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle">पढ़ाई मुफ़्त — acslearn.com · सुरक्षा सबसे पहले</text>';
  s += "</svg>";
  return s;
}

/* ---------- check-robot ---------- */
function visibleText(html){
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim();
}
function wordCount(html){
  const t = visibleText(html);
  const m = t.match(/[\u0900-\u097FA-Za-z0-9]+/g);
  return m ? m.length : 0;
}
function checkRobot(l, contentHtml){
  const holes = [];
  const words = wordCount(contentHtml);
  if (words < 1200) holes.push("शब्द-गिनती " + words + " (< 1200)");
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const commas = (vis.match(/,/g) || []).length;
  if (commas * 100 / Math.max(words,1) > 12)
    holes.push("अल्पविराम-रोग: " + Math.round(commas*100/words) + "/100 शब्द");
  const small = contentHtml.match(/font(?:-size)?\s*[:=]\s*["']?0*([0-9]{1,2})(?:\.[0-9]+)?(?:px)?["']?/gi) || [];
  for (const m of small){
    const num = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?/)[1], 10);
    if (num < 16 && num > 4) holes.push("font-size " + num + " (< 16): " + m.trim());
  }
  if (/\bfwd\b/i.test(vis)) holes.push("कूट-नाम (fwd) दिखने वाले text में");
  if (/\bSE024\b/i.test(vis)) holes.push("कूट-नाम (SE024) दिखने वाले text में");
  if (vis.indexOf("सरकारी ड्राइविंग लाइसेंस (Driving Licence) का विकल्प नहीं") < 0)
    holes.push("लाइसेंस-पंक्ति नहीं (v6.4 स्थायी पंक्ति)");
  return { words, holes };
}

/* ---------- menu (links.js से — एक चीज़ = एक जगह) ---------- */
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

/* ---------- पाठ-body ---------- */
function jumpList(all, cur){
  const sibs = all.filter(x => x.ch === cur.ch);
  return sibs.map(x =>
    x.key === cur.key
      ? '<span class="lsn-jumpcur">पाठ-' + x.key + " (यही)</span>"
      : '<a href="' + fileName(x) + '">पाठ-' + x.key + "</a>"
  ).join(" ") +
  ' <a href="index.html">📖 पूरी सूची (440 पाठ)</a>';
}

function lessonBody(l, all, prevFile, nextFile){
  const c = chapterOf(l);
  const lv = levelOf(l.ch);
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + esc(s.t) + "</h2>\n" + mdToHtml(s.body).trim() + "\n</section>"
  ).join("\n\n");

  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="index.html">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '" data-nextlsn>अगला पाठ →</a>'
    : '<a class="lsn-navbtn lsn-next" href="index.html">🎉 कोर्स-सूची पर लौटें</a>';

  return '\n<article class="lsn-wrap" data-lsn-num="' + l.key + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › " +
      "अध्याय-" + l.ch + ": " + esc(c.name) + "</p>\n" +
    "<h1>पाठ-" + l.key + ": " + esc(l.title) + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: लगभग 12 मिनट · अध्याय-' + l.ch + " का पाठ " + l.n + " / " + c.count +
      " · स्तर-" + lv.no + ": " + esc(lv.name) + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="index.html">📖 कोर्स-परिचय</a></p>\n' +
    "</header>\n\n" +
    '<details class="lsn-jump">\n<summary>📚 इस अध्याय के सब पाठ — किसी पर सीधे जाओ</summary>\n<div class="lsn-jumplist">\n' +
    jumpList(all, l) + "\n</div>\n</details>\n\n" +
    '<figure class="lsn-fig lsn-hero">\n' + heroSVG(l) +
    '\n<figcaption>पाठ-नक़्शा: ' + esc(l.title) + ' — एक नज़र में</figcaption>\n</figure>\n\n' +
    secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते —</p>\n" +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent("ड्राइविंग " + l.title + " हिंदी") +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      '<a class="lsn-vidbtn lsn-vidgov" href="https://parivahan.gov.in" target="_blank" rel="noopener">🏛️ परिवहन विभाग (सरकारी) — नियम व सेवाएँ</a></p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<section class="lsn-sec lsn-lic">\n<h2>ज़रूरी बात — लाइसेंस (Licence)</h2>\n' +
    "<p>" + esc(C.licenceLine) + "</p>\n</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना (mushroom v1.0 से हूबहू) ---------- */
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
    MENU_FALLBACK_JS +
    '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>\n</body>');
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson कड़ी नहीं");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return page;
}

function buildLessonPage(l, all, i){
  const prevFile = i > 0 ? fileName(all[i-1]) : null;
  const nextFile = i < all.length - 1 ? fileName(all[i+1]) : null;
  const body = lessonBody(l, all, prevFile, nextFile);
  const { words, holes } = checkRobot(l, body);
  if (holes.length){
    console.error("❌ पाठ-" + l.key + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/" + fileName(l);
  const ld = { "@context":"https://schema.org", "@type":"LearningResource",
    "name":"पाठ-"+l.key+": "+l.title,
    "description": l.title + " — " + C.title + " (मुफ़्त हिंदी पाठ)",
    "inLanguage":"hi","isAccessibleForFree":true,"learningResourceType":"Lesson","url":canonical,
    "isPartOf":{ "@type":"Course","name":C.title,"description":C.tagline,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } } };
  const page = assemble(body, {
    title: "पाठ-" + l.key + ": " + l.title + " | " + C.title + " | ACS",
    desc: l.title + " — मुफ़्त हिंदी पाठ, " + C.title + " (ACS)। कक्षा-6 स्तर की सरल भाषा में।",
    canonical, ld
  });
  return { page, words };
}

/* ---------- कोर्स-index (v1.1 — Founder-सुधार: पहला पेज = दिल + दृश्य + रास्ता) ---------- */
const CH_ICONS = ["🚗","🛡️","🤝","⚠️","🎛️","🚦","👁️","🔧","⚡","🔍","🌧️","💪","⛑️","🆘","🧳","📦","⛽","📱","📜","💰","🌏","🛂","🧮","🗺️","🗣️","🏦","🪜","🚀"];
const CH_LINE = [
  "गाड़ी चलाने वाले से वैश्विक पेशेवर तक का पहला क़दम",
  "जान सबसे पहले — सोच जो हर पाठ में साथ चलेगी",
  "मीठी ज़बान और पक्का समय — कमाई का असली राज़",
  "जिन ग़लतियों से करियर डूबता है — पहले ही जान लो",
  "गियर, ब्रेक, स्टीयरिंग — गाड़ी को अपना दोस्त बनाओ",
  "संकेत और नियम — सड़क की भाषा सीखो",
  "ख़तरा आने से पहले दिखे — यही असली हुनर है",
  "इंजन से डैशबोर्ड तक — गाड़ी के भीतर की दुनिया",
  "ईवी और नई तकनीक — कल की गाड़ी आज सीखो",
  "रोज़ की जाँच — बड़ी ख़राबी से पहले पकड़ो",
  "बारिश, कोहरा, पहाड़, रात — हर हाल में सुरक्षित",
  "चालक की सेहत — नींद, थकान और शरीर की रक्षा",
  "दुर्घटना हो जाए तो — पहले मिनटों का ज्ञान",
  "गाड़ी बीच रास्ते रुके तो — घबराओ नहीं, सँभालो",
  "यात्री ख़ुश तो काम पक्का — सेवा की कला",
  "सामान की सुरक्षा — भरोसे की कमाई",
  "कम तेल में ज़्यादा दूरी — जेब की सीधी बचत",
  "मोबाइल और ऐप — डिजिटल ज़माने का चालक",
  "काग़ज़ पूरे तो डर किस बात का — क़ानून की समझ",
  "टैक्सी से फ़्लीट तक — कमाई के सब रास्ते",
  "विदेश में चालक-नौकरी — सपने की तैयारी",
  "पासपोर्ट, वीज़ा और धोखे से बचाव — आँखें खोलो",
  "विदेश जाने का पूरा हिसाब — फ़ायदे-नुक़सान साफ़",
  "हर देश के अपने नियम — जाने से पहले जानो",
  "एक हुनर + एक भाषा = दुगुनी कमाई",
  "कमाई को संपत्ति बनाओ — पैसे की समझ",
  "चालक से मालिक तक — अपनी सीढ़ी ख़ुद चढ़ो",
  "आगे की दुनिया — और उसमें आपकी जगह"
];

function heroBanner(){
  let s = '<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="गाँव से विदेश तक — चालक का सफ़र">';
  s += '<rect width="800" height="430" rx="20" fill="' + CLR.off + '"/>';
  /* आसमान-पट्टी + सूरज */
  s += '<rect x="14" y="14" width="772" height="250" rx="16" fill="#FFFFFF" stroke="' + CLR.blue + '" stroke-width="2"/>';
  s += '<circle cx="700" cy="70" r="34" fill="' + CLR.gold + '"/>';
  /* गाँव (बाएँ): झोपड़ी */
  s += '<g stroke="' + CLR.navy + '" stroke-width="4" fill="none">';
  s += '<path d="M60 190 L60 150 L100 120 L140 150 L140 190 Z"/><path d="M60 150 L140 150"/><rect x="88" y="158" width="24" height="32"/>';
  /* शहर (बीच): इमारतें */
  s += '<rect x="330" y="110" width="40" height="80"/><rect x="380" y="90" width="44" height="100"/><rect x="434" y="125" width="36" height="65"/>';
  s += '<path d="M340 125 h20 M340 140 h20 M390 105 h24 M390 120 h24 M390 135 h24"/>';
  /* हवाई जहाज़ (दाएँ) */
  s += '<path d="M640 120 l60 -18 l-8 14 l30 4 l-34 10 l-4 16 l-10 -12 l-40 6 z" fill="' + CLR.blue + '" stroke="' + CLR.navy + '"/>';
  s += '</g>';
  /* नाम-पट्टियाँ */
  s += '<text x="100" y="220" font-size="18" font-weight="700" fill="' + CLR.green + '" text-anchor="middle">गाँव</text>';
  s += '<text x="400" y="220" font-size="18" font-weight="700" fill="' + CLR.blue + '" text-anchor="middle">शहर</text>';
  s += '<text x="690" y="175" font-size="18" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle">विदेश</text>';
  /* सड़क */
  s += '<rect x="14" y="270" width="772" height="86" rx="14" fill="' + CLR.navy + '"/>';
  s += '<path d="M40 313 H760" stroke="' + CLR.gold + '" stroke-width="6" stroke-dasharray="34 26"/>';
  /* गाड़ी */
  s += '<g transform="translate(300 282)">';
  s += '<path d="M10 44 q4 -22 30 -26 l18 -14 q6 -5 16 -5 h44 q10 0 16 6 l16 13 q28 3 32 26 l0 8 h-172 z" fill="' + CLR.gold + '" stroke="#FFFFFF" stroke-width="3"/>';
  s += '<rect x="66" y="8" width="30" height="16" rx="3" fill="' + CLR.off + '"/><rect x="102" y="8" width="26" height="16" rx="3" fill="' + CLR.off + '"/>';
  s += '<circle cx="48" cy="54" r="13" fill="' + CLR.off + '" stroke="' + CLR.navy + '" stroke-width="5"/><circle cx="148" cy="54" r="13" fill="' + CLR.off + '" stroke="' + CLR.navy + '" stroke-width="5"/>';
  s += '</g>';
  /* नारा-पट्टी */
  s += '<rect x="14" y="368" width="772" height="48" rx="14" fill="#FFF8E1" stroke="' + CLR.gold + '" stroke-width="3"/>';
  s += '<text x="400" y="399" font-size="21" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle">गाड़ी चलाना हुनर है — और सच्चा हुनर सरहद नहीं देखता।</text>';
  s += '</svg>';
  return s;
}

function ladderSVG(){
  const steps = [
    ["📖","पहले मुफ़्त पढ़ो","यहीं, आज से"],
    ["🚗","स्थानीय काम","गाँव-शहर में कमाई"],
    ["🚕","टैक्सी व फ़्लीट","अपनी गाड़ी, अपना धंधा"],
    ["🌏","विदेश-नौकरी","देश से विदेश तक"]
  ];
  let s = '<svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="कमाई की सीढ़ी">';
  s += '<rect width="800" height="250" rx="18" fill="#FFFFFF" stroke="' + CLR.blue + '" stroke-width="2"/>';
  s += '<defs><marker id="arL" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="24" refX="20" refY="12" orient="auto"><path d="M2,2 L24,12 L2,22 z" fill="' + CLR.gold + '" stroke="' + CLR.navy + '" stroke-width="2"/></marker></defs>';
  const xs=[105,300,495,690];
  steps.forEach((st,i)=>{
    const y = 150 - i*22;
    s += '<rect x="'+(xs[i]-88)+'" y="'+y+'" width="176" height="78" rx="14" fill="'+(i===3?CLR.green:CLR.off)+'" stroke="'+CLR.blue+'"/>';
    s += '<text x="'+xs[i]+'" y="'+(y+30)+'" font-size="24" text-anchor="middle">'+st[0]+'</text>';
    s += '<text x="'+xs[i]+'" y="'+(y+52)+'" font-size="17" font-weight="700" fill="'+(i===3?'#FFFFFF':CLR.navy)+'" text-anchor="middle">'+st[1]+'</text>';
    s += '<text x="'+xs[i]+'" y="'+(y+70)+'" font-size="16" fill="'+(i===3?'#FFF8E1':CLR.blue)+'" text-anchor="middle">'+st[2]+'</text>';
    if(i<3) s += '<line x1="'+(xs[i]+90)+'" y1="'+(y+18)+'" x2="'+(xs[i+1]-92)+'" y2="'+(y-6)+'" stroke="'+CLR.gold+'" stroke-width="6" marker-end="url(#arL)"/>';
  });
  s += '<text x="400" y="36" font-size="20" font-weight="700" fill="'+CLR.navy+'" text-anchor="middle">कमाई की सीढ़ी — एक-एक पायदान, साफ़ रास्ता</text>';
  s += '</svg>';
  return s;
}

const IDX_CSS =
'<style>' +
'.fw-stats{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}' +
'.fw-stat{flex:1 1 160px;background:#FFFFFF;border:2px solid #1565C0;border-radius:16px;padding:14px 10px;text-align:center}' +
'.fw-stat b{display:block;font-size:26px;color:#0B1F3A}' +
'.fw-stat span{font-size:16px;color:#1565C0}' +
'.fw-cta{display:flex;flex-wrap:wrap;gap:12px;margin:18px 0}' +
'.fw-btn{flex:1 1 200px;display:block;text-align:center;padding:16px 12px;border-radius:14px;font-size:19px;font-weight:700;text-decoration:none}' +
'.fw-btn-go{background:#F9A825;color:#0B1F3A;border:2px solid #0B1F3A}' +
'.fw-btn-alt{background:#FFFFFF;color:#1565C0;border:2px solid #1565C0}' +
'.fw-heart{background:#FFF8E1;border:2px solid #F9A825;border-radius:16px;padding:16px 18px;margin:16px 0}' +
'.fw-lvl{border-radius:14px;padding:10px 16px;margin:26px 0 10px;color:#F5F7FA;font-size:20px;font-weight:700}' +
'.fw-chline{display:block;font-size:16px;color:#2E7D32;margin-top:2px}' +
'</style>';

function buildIndex(all){
  function chapterBlock(c){
    const items = all.filter(l => l.ch === c.no).map(l =>
      '<li class="ci-item"><a class="msh-lsn" data-num="' + l.key + '" href="' + fileName(l) + '">पाठ-' + l.key + ": " + esc(l.title) +
      '</a><span class="ci-min">12 मिनट</span></li>'
    ).join("\n");
    return '<details class="ci-drop">\n' +
      '<summary><span>' + CH_ICONS[c.no-1] + ' अध्याय-' + c.no + ": " + esc(c.name) +
      '<span class="fw-chline">' + CH_LINE[c.no-1] + '</span></span>' +
      '<span class="ci-arrow">▼ ' + c.count + ' पाठ</span></summary>\n' +
      '<ul class="ci-list">\n' + items + '\n</ul>\n</details>\n';
  }
  const lvlColors = { 1:"#2E7D32", 2:"#1565C0", 3:"#0B1F3A", 4:"#F9A825" };
  const lvlText   = { 1:"#F5F7FA", 2:"#F5F7FA", 3:"#F5F7FA", 4:"#0B1F3A" };
  const lvlSub = {
    1: "गाड़ी छूने से पहले — सोच, सुरक्षा और इरादा",
    2: "स्टीयरिंग से सड़क तक — असली ड्राइविंग की पूरी विद्या",
    3: "अब कमाई की बारी — यात्री, सामान, ऐप और क़ानून",
    4: "देश से विदेश तक — पासपोर्ट, भाषा, पैसा और मालिक बनने की राह"
  };
  const firstFile = fileName(all[0]);
  const levelsHtml = C.levels.map(lv =>
    '<div class="fw-lvl" style="background:' + lvlColors[lv.no] + ';color:' + lvlText[lv.no] + '">' +
    '🎓 स्तर-' + lv.no + ": " + esc(lv.name) + ' — <span style="font-weight:600;font-size:17px">' + lvlSub[lv.no] + '</span></div>\n' +
    C.chapters.filter(c => c.no >= lv.from && c.no <= lv.to).map(chapterBlock).join("")
  ).join("\n");

  const body = '\n<article class="lsn-wrap ci-wrap" data-msh-index>\n' + IDX_CSS + '\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + "</p>\n" +
    "<h1>" + esc(C.title) + "</h1>\n" +
    '<p class="lsn-meta">जो हाथ स्टीयरिंग थामना जानते हैं, उनके लिए दुनिया में कहीं भी काम है।</p>\n' +
    "</header>\n\n" +
    '<figure class="lsn-fig">' + heroBanner() + '</figure>\n\n' +
    '<div class="fw-stats">' +
    '<div class="fw-stat"><b>440</b><span>पाठ — सब मुफ़्त</span></div>' +
    '<div class="fw-stat"><b>28</b><span>अध्याय · 4 स्तर</span></div>' +
    '<div class="fw-stat"><b>0 रुपये</b><span>बिना login पढ़ो</span></div>' +
    '<div class="fw-stat"><b>🌏</b><span>देश से विदेश तक</span></div>' +
    '</div>\n' +
    '<div class="fw-cta">' +
    '<a class="fw-btn fw-btn-go" href="' + firstFile + '">🚀 पाठ-1 से अभी शुरू करें</a>' +
    '<a class="fw-btn fw-btn-alt" href="#fwlist">📖 पूरी पाठ-सूची देखें</a>' +
    '<a class="fw-btn fw-btn-alt" href="/aptitude-test.html">🧭 पहले अपनी रुचि जाँचें</a>' +
    '</div>\n\n' +
    '<div class="fw-heart">\n' +
    '<p><b>एक छोटी-सी बात, दिल से।</b> हमारे इलाक़े में रामदीन चाचा तीस साल से स्कूल की गाड़ी चलाते हैं। तीस साल में एक भी बच्चे को खरोंच नहीं आई। आज पूरा इलाक़ा उन्हें सलाम करता है, और उनके बेटे के पास तीन गाड़ियाँ हैं।</p>\n' +
    '<p>यह इज़्ज़त और यह कमाई किसी जादू से नहीं आई — <b>सीखे हुए हुनर</b> से आई। वही हुनर, पूरा का पूरा, इन 440 पाठों में है। आपकी अपनी भाषा में। बिल्कुल मुफ़्त।</p>\n' +
    '<p>कोई किताब नहीं ख़रीदनी। कोई फ़ीस नहीं। बस रोज़ थोड़ा पढ़िए — और अपने सपने की गाड़ी ख़ुद चलाइए।</p>\n' +
    '</div>\n\n' +
    '<figure class="lsn-fig">' + ladderSVG() + '</figure>\n\n' +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p><b>उस युवा के लिए</b> जो नया सीखकर पहली कमाई चाहता है। <b>उस चलते चालक के लिए</b> जो और आगे — टैक्सी, फ़्लीट, विदेश — जाना चाहता है। <b>उस परिवार के लिए</b> जो अपने बेटे-बेटी को सुरक्षित, इज़्ज़तदार हुनर देना चाहता है। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है।</p>\n" +
    "<p>कोर्स पूरा करने पर ऑनलाइन परीक्षा से प्रमाणपत्र का रास्ता खुलता है। गाड़ी का असली अभ्यास हमेशा किसी सिखाने वाले की देख-रेख में, खुली-सुरक्षित जगह पर।</p>\n" +
    "<p><b>" + esc(C.licenceLine) + "</b></p>\n" +
    '<p class="msh-legend"><b>रंग का मतलब:</b> <span class="lg lg-done">हरा = पढ़ा</span> · <span class="lg lg-todo">काला = अभी बाक़ी</span> · <span class="lg lg-miss">लाल = छूट गया</span></p>\n' +
    "</section>\n\n" +
    '<h2 id="fwlist" style="color:#0B1F3A">📖 पूरी पाठ-सूची — अपनी गति से, अपने रास्ते</h2>\n' +
    levelsHtml + '\n' +
    '<div class="fw-cta">' +
    '<a class="fw-btn fw-btn-go" href="' + firstFile + '">🚀 अभी पाठ-1 से शुरू करें — पहला क़दम आज</a>' +
    '</div>\n' +
    "</article>\n";
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/";
  return assemble(body, {
    title: C.title + " — मुफ़्त हिंदी कोर्स (440 पाठ) | ACS",
    desc: C.tagline + " कुल 440 पाठ, 28 अध्याय — पूरी तरह मुफ़्त, हिंदी में।",
    canonical,
    ld: { "@context":"https://schema.org","@type":"Course","name":C.title,"description":C.tagline,
      "inLanguage":"hi","isAccessibleForFree":true,"url":canonical,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } }
  });
}

/* ---------- मुख्य ---------- */
const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx+1].split(",") : null;

const ALL = [];
C.chapters.forEach(c => {
  for (let n = 1; n <= c.count; n++) ALL.push(parseLesson(c.no + "." + n));
});
if (ALL.length !== C.totalLessons)
  throw new Error("गिनती बेमेल: " + ALL.length + " ≠ " + C.totalLessons);

/* slug-टकराव जाँच */
const seen = {};
ALL.forEach(l => {
  let f = fileName(l);
  if (seen[f]) { l.slug = (l.slug + "-" + l.n).slice(0, 44); f = fileName(l); }
  if (seen[f]) throw new Error("slug-टकराव नहीं सुलझा: " + f);
  seen[f] = 1;
});

const outDir = path.join(ROOT, "courses", C.lang, C.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0, minW = 99999, sumW = 0;
ALL.forEach((l, i) => {
  if (ONLY && ONLY.indexOf(l.key) < 0) return;
  const built = buildLessonPage(l, ALL, i);
  if (!built){ fail++; return; }
  fs.writeFileSync(path.join(outDir, fileName(l)), built.page, "utf8");
  if (ONLY) console.log("✅ पाठ-" + l.key + " → " + fileName(l) + " (" + built.words + " शब्द)");
  minW = Math.min(minW, built.words); sumW += built.words;
  ok++;
});

if (!ONLY){
  fs.writeFileSync(path.join(outDir, "index.html"), buildIndex(ALL), "utf8");
  console.log("✅ कोर्स-परिचय → index.html");
}
console.log("---- कुल: " + ok + " ✅ · " + fail + " ❌ · न्यूनतम-शब्द " + (ok?minW:0) + " · औसत " + (ok?Math.round(sumW/ok):0) + " ----");
if (fail) process.exit(1);
