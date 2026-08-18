/* ============================================================
   build_ecom_pages.js — ACS ई-कॉमर्स मास्टरी (SE009) पाठ-पेजों का generator (परत-4)
   v1.0 · 18-Aug-2026
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट)
         + generator/data/ecom_course_data.js (परत-3 — meta, 24 खंड)
         + generator/data/ecom_lessons_kNN.js (परत-3 — md-सामग्री, 24 shard)
   चलाना: repo-रूट से → node generator/build_ecom_pages.js
          (नमूना: node generator/build_ecom_pages.js --only 74,75)
   नतीजा: /courses/hi/digital/ecom/ecm-NNN-slug.html + index.html

   पाठ-md का ढाँचा (लेखन-नियम, rc_ecom.py से मेल):
     ═══…
     # पाठ-N: शीर्षक
     ═══…
     *(ई-कॉमर्स मास्टरी · खंड-K · … · स्तर X · रास्ता Y · volatility Z)*
     ## 1. उद्देश्य … ## 10. योग्यता-जाँच (- [ ] चेकबॉक्स)
     ```svg … ``` (पाठ का अपना रेखा-चित्र — यही figure बनता है)

   check-robot (fail = पेज बनेगा ही नहीं):
   1. हर पाठ ≥ 1150 शब्द  2. ≥ 1 रेखा-चित्र (svg)
   3. दिखने वाले text में square bracket नहीं  4. कोई font-size < 16px नहीं
   5. कूट-नाम (ecm) दिखने वाले text में नहीं  6. योग्यता-जाँच ≥ 3 checkbox
   7. course-lesson.css/js कड़ी अनिवार्य
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { ECOM_COURSE } = require(path.join(__dirname, "data", "ecom_course_data.js"));
const C = ECOM_COURSE;
const LESSON_SRC = {};
for (const p of C.parts){
  const sh = require(path.join(__dirname, "data", "ecom_lessons_k" + String(p.no).padStart(2, "0") + ".js"));
  Object.assign(LESSON_SRC, sh.LESSONS);
}
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "18-Aug-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_ecom_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- देवनागरी → Roman slug (build_mushroom_pages से समान) ---------- */
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
  s = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s || "paath";
}
function pad3(n){ return String(n).padStart(3, "0"); }
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
  t = t.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  t = t.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
  /* नंगी https-कड़ी → क्लिक-योग्य (स्रोत-खंड में) */
  t = t.replace(/(^|[\s(—])(https?:\/\/[^\s<)"।]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  return t;
}
function mdToHtml(body){
  const svgs = [];
  body = body.replace(/```svg\s*([\s\S]*?)```/g, (m, sv) => { svgs.push(sv.trim()); return "\n@@SVG" + (svgs.length-1) + "@@\n"; });
  const lines = body.split("\n");
  const out = []; let para = [], list = [], olist = [], chks = [];
  function flushPara(){ if (para.length){ out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } }
  function flushList(){ if (list.length){ out.push("<ul>" + list.map(x => "<li>" + inline(x) + "</li>").join("") + "</ul>"); list = []; } }
  function flushOList(){ if (olist.length){ out.push("<ol>" + olist.map(x => "<li>" + inline(x) + "</li>").join("") + "</ol>"); olist = []; } }
  function flushChks(){
    if (chks.length){
      out.push('<div class="ecm-chkbox">' + chks.map((x, i) =>
        '<label class="ecm-chk"><input type="checkbox" class="ecm-q" data-q="' + i + '"> <span>' + inline(x) + "</span></label>"
      ).join("") + "</div>");
      chks = [];
    }
  }
  function flushAll(){ flushPara(); flushList(); flushOList(); flushChks(); }
  for (let raw of lines){
    const t = raw.replace(/\s+$/,"").trim();
    if (!t){ flushAll(); continue; }
    if (/^@@SVG\d+@@$/.test(t)){ flushAll(); out.push(t); continue; }
    if (/^---+$/.test(t)){ flushAll(); continue; }
    if (/^### /.test(t)){ flushAll(); out.push("<h3>" + inline(t.replace(/^### /,"")) + "</h3>"); continue; }
    if (/^>\s?/.test(t)){ flushAll(); out.push("<blockquote>" + inline(t.replace(/^>\s?/,"")) + "</blockquote>"); continue; }
    if (/^- \[ \]\s?/.test(t) || /^☐\s?/.test(t)){ flushPara(); flushList(); flushOList(); chks.push(t.replace(/^- \[ \]\s?/,"").replace(/^☐\s?/,"")); continue; }
    if (/^- /.test(t)){ flushPara(); flushOList(); flushChks(); list.push(t.replace(/^- /,"")); continue; }
    flushList(); flushOList(); flushChks();
    para.push(t);
  }
  flushAll();
  let html = out.join("\n");
  svgs.forEach((sv, i) => { html = html.replace("@@SVG" + i + "@@", '<figure class="lsn-fig lsn-hero">' + sv + "</figure>"); });
  return html;
}

function parseLesson(n){
  const src = LESSON_SRC[String(n)];
  if (!src) return null;
  const hm = src.match(/^# पाठ-(\d+):\s*(.+)$/m);
  if (!hm || parseInt(hm[1],10) !== n) throw new Error("पाठ-" + n + ": header बेमेल");
  const title = hm[2].trim();
  const meta = (src.match(/^\*\((ई-कॉमर्स मास्टरी[^)]*)\)\*/m) || [,""])[1];
  const lv = (meta.match(/स्तर\s+([^·]+)/) || [,"—"])[1].trim();
  const pth = (meta.match(/रास्ता\s+([^·]+)/) || [,"—"])[1].trim();
  const vol = (meta.match(/volatility\s+([A-Z]+)/) || [,"LOW"])[1].trim();
  /* सारी सामग्री header/meta के बाद; ## से sections */
  const after = src.replace(/^═+\n# पाठ-\d+:.*\n═+\n/m, "").replace(/^\*\(ई-कॉमर्स मास्टरी[^)]*\)\*\s*\n/m, "");
  const parts = after.split(/^## /m).slice(1);
  const sections = parts.map(p => { const nl = p.indexOf("\n"); return { t: p.slice(0, nl).trim(), body: p.slice(nl + 1) }; });
  const words = (after.replace(/```svg[\s\S]*?```/g," ").match(/[\u0900-\u097FA-Za-z0-9]+/g) || []).length;
  const minutes = Math.max(9, Math.round(words / 110));
  return { num: n, title, level: lv, pathTag: pth, vol, sections, slug: slugify(title), minutes };
}

/* ---------- check-robot ---------- */
function visibleText(html){
  return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function wordCount(html){ const m = visibleText(html).match(/[\u0900-\u097FA-Za-z0-9]+/g); return m ? m.length : 0; }
function checkRobot(l, contentHtml){
  const holes = [];
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
  const codeRe = new RegExp("\\b" + C.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम दिखने वाले text में");
  const chkN = (contentHtml.match(/class="ecm-q"/g) || []).length;
  if (chkN < 3) holes.push("योग्यता-जाँच checkbox " + chkN + " (< 3)");
  return { words, holes };
}

/* ---------- menu (links.js से) ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m => '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>").join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

function PART(num){ return C.parts.find(p => num >= p.from && num <= p.to) || C.parts[C.parts.length-1]; }

function jumpList(all, cur){
  const pt = PART(cur);
  const inPart = all.filter(x => x.num >= pt.from && x.num <= pt.to);
  return inPart.map(x =>
    x.num === cur ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>" : '<a href="' + fileName(x) + '">पाठ-' + x.num + "</a>"
  ).join(" ") + ' <a href="index.html">📖 पूरी सूची (' + C.totalLessons + ' पाठ)</a>';
}

function lessonBody(l, all, prevFile, nextFile){
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + esc(s.t) + "</h2>\n" + mdToHtml(s.body).trim() + "\n</section>"
  ).join("\n\n");
  const prev = prevFile ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>' : '<a class="lsn-navbtn" href="index.html">← कोर्स-परिचय</a>';
  const next = nextFile ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '" data-nextlsn>अगला पाठ →</a>' : '<a class="lsn-navbtn lsn-next" href="index.html">🎉 कोर्स-सूची पर लौटें</a>';
  const pt = PART(l.num);
  const volTxt = l.vol === "HIGH" ? "⚡ तेज़ बदलने वाला विषय (Δ) — तिमाही जाँच" : (l.vol === "MEDIUM" ? "🔄 बदल सकने वाला विषय — छमाही जाँच" : "🟢 स्थिर विषय");
  return '\n<article class="lsn-wrap" data-lsn-num="' + l.num + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › खंड-" + pt.no + ": " + esc(pt.name) + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + esc(l.title) + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: लगभग ' + l.minutes + " मिनट · योग्यता-स्तर: " + esc(l.level) + " · रास्ता: " + esc(l.pathTag) +
      " · " + volTxt + " · पाठ " + l.num + " / " + C.totalLessons + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="index.html">📖 कोर्स-परिचय</a></p>\n' +
    "</header>\n\n" +
    '<details class="lsn-jump">\n<summary>📚 इस खंड के सब पाठ — किसी पर सीधे जाओ</summary>\n<div class="lsn-jumplist">\n' +
    jumpList(all, l.num) + "\n</div>\n</details>\n\n" +
    secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते —</p>\n" +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' + encodeURIComponent("ई-कॉमर्स " + l.title + " हिंदी") +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      '<a class="lsn-vidbtn lsn-vidgov" href="https://www.ondc.org" target="_blank" rel="noopener">🏛️ ONDC — सरकारी खुला e-commerce नेटवर्क</a></p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n</article>\n";
}

function assemble(body, meta){
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + meta.title + "</title>\n<meta name=\"description\" content=\"" + meta.desc + "\">\n" +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n<link rel="canonical" href="' + meta.canonical + '">');
  page = page.replace("</head>",
    '<meta property="og:title" content="' + meta.title + '">\n<meta property="og:description" content="' + meta.desc + '">\n' +
    '<meta property="og:type" content="article">\n<meta property="og:url" content="' + meta.canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    (meta.ld ? '<script type="application/ld+json">' + JSON.stringify(meta.ld) + "</scr" + "ipt>\n" : "") +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>' + '\n<script src="/assets/ecom-progress.js" defer></scr' + 'ipt>\n</body>');
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0) throw new Error("स्थायी-नियम भंग: course-lesson कड़ी नहीं");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return page;
}

function buildLessonPage(l, all, i){
  const prevFile = i > 0 ? fileName(all[i-1]) : null;
  const nextFile = i < all.length - 1 ? fileName(all[i+1]) : null;
  const body = lessonBody(l, all, prevFile, nextFile);
  const { words, holes } = checkRobot(l, body);
  if (holes.length){ console.error("❌ पाठ-" + l.num + " check-robot fail:"); holes.forEach(h => console.error("   • " + h)); return null; }
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/" + fileName(l);
  const ld = { "@context":"https://schema.org", "@type":"LearningResource", "name":"पाठ-"+l.num+": "+l.title,
    "description": l.title + " — " + C.title + " (मुफ़्त हिंदी पाठ)", "inLanguage":"hi","isAccessibleForFree":true,
    "learningResourceType":"Lesson","url":canonical,
    "isPartOf":{ "@type":"Course","name":C.title,"description":C.tagline,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } } };
  return { page: assemble(body, { title: "पाठ-" + l.num + ": " + l.title + " | " + C.title + " | ACS",
    desc: l.title + " — मुफ़्त हिंदी पाठ, " + C.title + " (ACS)। कक्षा-6 स्तर की सरल भाषा में।", canonical, ld }), words };
}

function buildIndex(all){
  const have = {}; all.forEach(l => have[l.num] = l);
  function partBlock(pt){
    const items = [];
    for (let n = pt.from; n <= pt.to; n++){
      const l = have[n];
      if (l) items.push('<li class="ci-item"><a class="ecm-lsn" data-num="' + l.num + '" href="' + fileName(l) + '">पाठ-' + l.num + ": " + esc(l.title) + '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>");
      else items.push('<li class="ci-item"><span class="ecm-lsn ecm-soon">पाठ-' + n + '</span><span class="ci-min">जल्द जुड़ेगा</span></li>');
    }
    return '<details class="ci-drop" data-from="' + pt.from + '" data-to="' + pt.to + '">\n' +
      '<summary><span>खंड-' + pt.no + ": " + esc(pt.name) + '</span><span class="ci-arrow">▼ पाठ ' + pt.from + "-" + pt.to + '</span></summary>\n' +
      '<ul class="ci-list">\n' + items.join("\n") + '\n</ul>\n</details>\n\n';
  }
  const body = '\n<article class="lsn-wrap ci-wrap" data-ecm-index>\n<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + "</p>\n<h1>" + esc(C.title) + "</h1>\n" +
    '<p class="lsn-meta">ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · बिना login · अपनी गति से · कुल ' + C.totalLessons + " पाठ · 24 खंड · मूल भाषा: हिंदी</p>\n" +
    "</header>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p>यह कोर्स उनके लिए है जो अपना सामान online बेचना चाहते हैं, या दुकानदारों का online-काम सँभालकर कमाना चाहते हैं — दुकानदार, कारीगर, युवा, घर से काम करने वाली महिलाएँ। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। सभी " + C.totalLessons + " पाठ पढ़ना ज़रूरी नहीं — पाँच योग्यता-स्तर हैं: Foundation (30) · Operator (60) · Specialist (120) · Professional (200) · Mastery (326)। और तीन रास्ते: रास्ता-A अपना व्यापार · रास्ता-B सेवा-सहायक · रास्ता-C पूरा।</p>\n" +
    "<p>पढ़ाई का रास्ता सीधा है — <b>पहले यहाँ मुफ़्त पढ़ो</b>, साथ-साथ छोटे-छोटे काम (काम-कार्ड) करते चलो। हर पाठ के अंत में योग्यता-जाँच के डिब्बे व अभ्यास-प्रश्न हैं। कोर्स पूरा होने पर 120-प्रश्न की परीक्षा (dashboard से) — पास पर प्रमाणपत्र।</p>\n" +
    '<p class="ecm-legend"><b>रंग का मतलब:</b> <span class="lg lg-done">हरा = पढ़ा और जाँच पूरी</span> · <span class="lg lg-todo">काला = अभी बाक़ी</span> · <span class="lg lg-miss">लाल = छूट गया</span></p>\n' +
    "</section>\n\n" + C.parts.map(partBlock).join("") + "</article>\n";
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/";
  return assemble(body, { title: C.title + " — मुफ़्त हिंदी कोर्स (" + C.totalLessons + " पाठ) | ACS",
    desc: C.tagline + " कुल " + C.totalLessons + " पाठ, 24 खंड — पूरी तरह मुफ़्त, हिंदी में।", canonical,
    ld: { "@context":"https://schema.org","@type":"Course","name":C.title,"description":C.tagline,"inLanguage":"hi","isAccessibleForFree":true,"url":canonical,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } } });
}

/* ---------- मुख्य ---------- */
const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx+1].split(",").map(Number) : null;
const ALL = [];
const MISSING = [];
for (let n = 1; n <= C.totalLessons; n++){ const l = parseLesson(n); if (l) ALL.push(l); else MISSING.push(n); }
if (MISSING.length) console.warn("⚠️ shard में सामग्री नहीं (पेज नहीं बनेंगे): " + MISSING.length + " पाठ — " + MISSING[0] + "…" + MISSING[MISSING.length-1]);
const seen = {};
ALL.forEach(l => { let f = fileName(l); if (seen[f]) { l.slug = l.slug + "-" + l.num; f = fileName(l); } seen[f] = 1; });
const outDir = path.join(ROOT, "courses", C.lang, C.slug);
fs.mkdirSync(outDir, { recursive: true });

/* पास-1: check-robot — कौन पाठ गेट पार करते हैं (मरी-कड़ी निषेध: index/nav सिर्फ़ पास वालों के बीच) */
const OK = [];
const FAILED = [];
ALL.forEach((l, i) => {
  const body = lessonBody(l, ALL, null, null);
  const { words, holes } = checkRobot(l, body);
  if (holes.length){ FAILED.push(l.num); console.error("❌ पाठ-" + l.num + " check-robot fail:"); holes.forEach(h => console.error("   • " + h)); }
  else OK.push(l);
});
/* पास-2: सिर्फ़ पास पाठों के बीच prev/next व jump */
let ok = 0, fail = FAILED.length;
OK.forEach((l, i) => {
  if (ONLY && ONLY.indexOf(l.num) < 0) return;
  const built = buildLessonPage(l, OK, i);
  if (!built){ fail++; return; }
  fs.writeFileSync(path.join(outDir, fileName(l)), built.page, "utf8");
  console.log("✅ पाठ-" + l.num + " → " + fileName(l) + " (" + built.words + " शब्द)");
  ok++;
});
if (!ONLY){ fs.writeFileSync(path.join(outDir, "index.html"), buildIndex(OK), "utf8"); console.log("✅ कोर्स-परिचय → index.html (" + OK.length + " पाठ जीवित, " + (FAILED.length + MISSING.length) + " \"जल्द जुड़ेगा\")"); }
if (FAILED.length) console.warn("⚠️ check-robot fail (पेज नहीं बने, index पर \"जल्द जुड़ेगा\"): " + FAILED.join(","));
console.log("---- कुल: " + ok + " ✅ · " + fail + " ❌ · अनुपस्थित " + MISSING.length + " ----");
if (fail) process.exit(1);
