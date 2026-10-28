/* ============================================================
   build_kaithi_pages.js v1.0 · 27-Oct-2026 — "कैथी लिपि" पाठ-पेज generator (परत-4)
   आधार: build_pl0_pages.js v1.3 (26-Oct) का कैथी-रूप + K-token→SVG पाइपलाइन
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2) + generator/data/kaithi_lessons_data.js (परत-3)
         + assets/kaithi_lipi.js (देवनागरी→कैथी, यांत्रिक robot 100%)
         + generator/data/kaithi_glyphs_data.js (मशीन-जनित SVG-भंडार — gen_kaithi_svg.py)
   K-token: पाठ-HTML में {{K:शब्द}} / {{KBIG:शब्द}} लिखो → build पर उस शब्द का कैथी-रूप
   baked-SVG (Noto Sans Kaithi, OFL की रूपरेखाएँ) बन जाता है — फ़ोन पर फ़ॉन्ट-निर्भरता शून्य।
   भंडार में शब्द न मिले = build fail (fail-closed) + ज़रूरी-शब्द सूची छपे।
   चलाना: node generator/build_kaithi_pages.js · check-robot pl-0 वाले ही (शब्द≥1200 · svg ·
   गोल-कोष्ठक · font≥16px · कूट-नाम-निषेध)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { KTH_COURSE, KTH_LESSONS } =
  require(path.join(__dirname, "data", "kaithi_lessons_data.js"));

const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

/* ---------- K-token → कैथी baked-SVG ---------- */
const LIPI = require(path.join(ROOT, "assets", "kaithi_lipi.js"));
const GLY = require(path.join(__dirname, "data", "kaithi_glyphs_data.js"));
const MISSING = new Set();
function kthSVG(deva, big){
  const k = LIPI.devaToKaithi(deva);
  const g = GLY.map[k];
  if (!g){ MISSING.add(k); return "⛔"; }
  const h = GLY.asc + GLY.desc;
  return '<svg class="kth-svg' + (big ? " kth-big" : "") + '" viewBox="0 -' + GLY.asc + ' ' + g.w + ' ' + h +
    '" preserveAspectRatio="xMinYMid meet" role="img" aria-label="कैथी लिपि में लिखा शब्द: ' + deva.replace(/"/g, "") + '"><path d="' + g.d + '" fill="currentColor"/></svg>';
}
function kthTokens(html){
  return String(html)
    .replace(/\{\{KBIG:([^{}]+)\}\}/g, (m, w) => kthSVG(w.trim(), true))
    .replace(/\{\{K:([^{}]+)\}\}/g, (m, w) => kthSVG(w.trim(), false));
}
/* पूर्व-स्कैन: data-फ़ाइल पाठ के सब {{K:}} token भंडार से मिलाओ — एक भी न मिले तो
   build शुरू ही नहीं (⛔-placeholder वाला पेज कभी न बने)। */
function prescanTokens(){
  const src = fs.readFileSync(path.join(__dirname, "data", "kaithi_lessons_data.js"), "utf8");
  const re = /\{\{K(?:BIG)?:([^{}]+)\}\}/g; let m;
  while ((m = re.exec(src))){ const k = LIPI.devaToKaithi(m[1].trim()); if (!GLY.map[k]) MISSING.add(k); }
  return flushMissing();
}
function flushMissing(){
  if (!MISSING.size) return false;
  const list = Array.from(MISSING);
  fs.writeFileSync(path.join(__dirname, "data", "kaithi_need_words.json"), JSON.stringify(list, null, 1), "utf8");
  console.error("⛔ SVG-भंडार में " + list.length + " कैथी-शब्द नहीं — generator/data/kaithi_need_words.json बनी;\n"
    + "   चलाओ: python3 generator/gen_kaithi_svg.py (भंडार regen), फिर यह build दोबारा।");
  return true;
}

const STAMP = "15-Jul-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_course_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- सहायक ---------- */
/* [26-Oct] कोर्स-विशेष खाना ज़रूरी — न हो तो रुको (fail-closed; वेल्डिंग-विरासत होल से सीख) */
function REQ(course, k){ if (course[k] === undefined || course[k] === "" ) throw new Error("KTH_COURSE." + k + " नहीं — कोर्स-विशेष बात generator में हाथ से नहीं लिखी जाएगी"); return course[k]; }
const LANDING = require("./kaithi_landing.js");
/* [26-Oct SEO] og:image = कोर्स की 1200×630 छवि (generator/build_kaithi_og.js से बनी) · description शब्द-सीमा पर कटे (Google लगभग 155-160 पर काटता है) */
function OG_IMAGE(course){ return "https://acslearn.com/assets/og/" + course.slug + ".png"; }
/* [26-Oct SEO] title ≤70: " | ..." वाला पूँछ-हिस्सा बचे, आगे का शब्द-सीमा पर कटे (schema में पूरा नाम) */
function trimTitle(t, n){ n = n || 70; t = String(t).trim(); if (t.length <= n) return t; const k = t.lastIndexOf(" | "); let tail = k > 0 ? t.slice(k) : ""; if (tail.length > 24) tail = tail.replace(/\s+—.*$/, "");
  const head = k > 0 ? t.slice(0, k) : t; let c = head.slice(0, n - tail.length - 1); const sp = Math.max(c.lastIndexOf(" "), c.lastIndexOf(":")); if (sp > 20) c = c.slice(0, sp); return c.replace(/[\s,:;—·?-]+$/, "") + "…" + tail; }
function trimDesc(s, n){ n = n || 158; s = String(s).replace(/\s+/g, " ").trim(); if (s.length <= n) return s; const c = s.slice(0, n);
  const k = Math.max(c.lastIndexOf("। "), c.lastIndexOf("; "), c.lastIndexOf(", "), c.lastIndexOf(" — "), c.lastIndexOf(" ")); return c.slice(0, k > 60 ? k : n).replace(/[\s,;—·]+$/, "") + "…"; }
function pad3(n){ return String(n).padStart(3, "0"); }

/* [26-Oct] HTML-सुरक्षा: title/meta सादा पाठ हैं — छपाई से पहले escape (46 पेजों का meta-description
   कच्चे " से टूटा था — content पहले उद्धरण-चिह्न पर कट जाता था)। पाठ-शरीर ("h") में HTML जान-बूझकर है — उसे नहीं छूते। */
function escText(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escAttr(s){ return escText(s).replace(/"/g, "&quot;"); }
function ldSafe(o){ return JSON.stringify(o).replace(/</g, "\\u003c"); }

function fileName(course, l){
  /* SEO नियम: [code]-[num]-[slug].html · lowercase · hyphen · max 60 */
  const name = (course.code + "-" + pad3(l.num) + "-" + l.slug).toLowerCase();
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("slug-नियम टूटा: " + name);
  if (name.length > 60) throw new Error("slug 60 से लंबा: " + name);
  return name + ".html";
}

/* [26-Oct, Founder-छूट] square-bracket निषेध: हिंदी पाठ + SVG-चित्र में पूरा; छूट सिर्फ़ code-डिब्बों
   (pre.pl-code / pre.pl-err) के भीतर — Python की सूची [ ] के बिना लिखी ही नहीं जाती। */
function bracketText(html){
  return html
    .replace(/<pre class="pl-(code|err|sample)"[^>]*>[\s\S]*?<\/pre>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
}

function visibleText(html){
  /* svg + tags हटाकर सिर्फ़ पढ़ा जाने वाला text */
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function wordCount(html){
  const t = visibleText(html);
  return t ? t.split(" ").length : 0;
}

/* ---------- check-robot ---------- */
function checkRobot(course, l, contentHtml){
  const holes = [];
  /* v3.1 नियम-11: हर पाठ पर हुनर-टैग; (R)-पाठ में disclaimer-पंक्ति अनिवार्य */
  if (!l.tag || !/^[KDPAR+]+$/.test(l.tag)) holes.push("हुनर-टैग नहीं/ग़लत: " + l.tag);
  if (l.tag && l.tag.split("+").indexOf("R") !== -1 && visibleText(contentHtml).indexOf("यह परिचय है") === -1)
    holes.push("(R)-पाठ में परिचय-disclaimer पंक्ति नहीं");
  const words = wordCount(contentHtml);
  /* शब्द-जाँच अब buildPage में coreHtml पर (24-Aug फ़िक्स) */
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं मिला");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(bracketText(contentHtml))) holes.push("दिखने वाले text (या SVG) में square bracket — छूट सिर्फ़ code-डिब्बों में");
  const small = contentHtml.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font-size " + n + "px (< 16px): " + m.trim());
  }
  /* svg के font: shorthand भी जाँचो */
  const svgFonts = contentHtml.match(/font\s*:\s*[0-9]{3}\s+0*([0-9]{1,2})px/gi) || [];
  for (const m of svgFonts){
    const n = parseInt(m.match(/([0-9]{1,2})px/i)[1], 10);
    if (n < 16) holes.push("svg font " + n + "px (< 16px)");
  }
  /* svg font-size="NNpx" attribute-रूप भी जाँचो (20-Aug होल-फ़िक्स: पहले सिर्फ़ CSS-रूप देखता था) */
  const svgFontAttrs = contentHtml.match(/font-size\s*=\s*"0*([0-9]{1,2})px"/gi) || [];
  for (const m of svgFontAttrs){
    const n = parseInt(m.match(/([0-9]{1,2})px/i)[1], 10);
    if (n < 16) holes.push("svg font-size attribute " + n + "px (< 16px): " + m.trim());
  }
  const codeRe = new RegExp("\\b" + course.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम (" + course.code + ") दिखने वाले text में");
  if (contentHtml.indexOf("\u26d4") !== -1) holes.push("कैथी-SVG भंडार में शब्द नहीं (⛔) — gen_kaithi_svg.py चलाओ");
  return { words, holes };
}

/* ---------- पाठ का content-HTML ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== \'undefined\') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU = loadMenu();
const MENU_HTML = MENU.map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

function PART(num){ return KTH_COURSE.parts.find(p => num >= p.from && num <= p.to) || KTH_COURSE.parts[KTH_COURSE.parts.length-1]; }

function ALL_LESSON_LINKS(course, curNum){
  return KTH_LESSONS.map(x =>
    x.num === curNum
      ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>"
      : '<a href="' + fileName(course, x) + '">पाठ-' + x.num + "</a>"
  ).join(" ");
}

function lessonBody(course, l, prevFile, nextFile){
  const secs = kthTokens(l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + s.t + "</h2>\n" + s.h.trim() + "\n</section>"
  ).join("\n\n"));

  const regBar = '<div class="lsn-reg" style="background:#F5F7FA;border:2px solid #2E7D32;border-radius:12px;padding:12px 14px;margin:14px 0;font-size:18px">📝 <b>यह पाठ मुफ़्त है — पूरा कोर्स भी।</b> परीक्षा देकर <b>प्रमाणपत्र</b> चाहिए? <a href="/join.html" style="color:#2E7D32;font-weight:800">मुफ़्त रजिस्ट्रेशन करें →</a></div>';
  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="/courses/' + course.lang + '/' + course.slug + '/">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '">अगला पाठ →</a>'
    : (l.num === course.totalLessons
        ? '<a class="lsn-navbtn lsn-next" href="/courses/' + course.lang + '/' + course.slug + '/">🎓 कोर्स पूरा — कोर्स-परिचय →</a>'
        : '<span class="lsn-navbtn lsn-soon">अगला पाठ — जल्द</span>');

  return '\n<article class="lsn-wrap" data-lsn-num="' + l.num + '" data-course="' + course.slug + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + course.title + " › " +
      "हिस्सा-" + PART(l.num).no + ": " + PART(l.num).name + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + escText(l.title) + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: ' + l.minutes + " मिनट · पाठ " + l.num + " / " +
      course.totalLessons + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="/courses/' + course.lang + "/" + course.slug + '/">📖 कोर्स-परिचय</a></p>\n' +
    "</header>\n\n" +
    '<details class="lsn-jump">\n<summary>📚 सब पाठ — किसी भी पाठ पर सीधे जाओ</summary>\n<div class="lsn-jumplist">\n' +
    ALL_LESSON_LINKS(course, l.num) + "\n</div>\n</details>\n\n" + secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    (l.videoUrl
      ? '<p><a class="lsn-vidbtn" href="' + l.videoUrl + '" target="_blank" rel="noopener">▶ इस पाठ का जाँचा हुआ वीडियो देखें</a>' +
        (l.videoNote ? " — " + l.videoNote : "") + "</p>\n"
      : "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक " + (course.videoGov ? "दो जीवित रास्ते" : "एक जीवित रास्ता") + " —</p>\n") +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent((REQ(course, "videoQuery") + " " + l.title + " हिंदी").replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()) +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      (course.videoGov ? '<a class="lsn-vidbtn lsn-vidgov" href="' + course.videoGov.href + '" target="_blank" rel="noopener">🏛️ ' + course.videoGov.label + '</a>' : "") + '</p>\n' +
    '<p class="lsn-vidnote">(' + (course.videoGov ? "दोनों नई खिड़की में" : "नई खिड़की में") + '; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    regBar + '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function buildPage(course, l, prevFile, nextFile){
  const body = lessonBody(course, l, prevFile, nextFile);
  /* 24-Aug robot-फ़िक्स: शब्द-गिनती सिर्फ़ पाठ-सामग्री (sections) पर — jumplist/ढाँचा-पाठ गिनती से बाहर */
  const coreHtml = l.sections.map(s => s.t + " " + s.h).join(" ").replace(/\{\{K(BIG)?:[^{}]+\}\}/g, " ");
  const { holes } = checkRobot(course, l, body);
  const coreWords = wordCount(coreHtml);
  if (coreWords < 1200) holes.push("शब्द-गिनती (सिर्फ़ सामग्री) " + coreWords + " (< 1200)");
  if (holes.length){
    console.error("❌ पाठ-" + l.num + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }

  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");

  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);

  /* head: title/meta/canonical (SEO) + पाठ-CSS */
  const canonical = "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/" +
                    fileName(course, l);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + escText(trimTitle(l.metaTitle)) + "</title>\n" +
    '<meta name="description" content="' + escAttr(trimDesc(l.metaDesc)) + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  const ld = { "@context": "https://schema.org", "@type": "LearningResource",
    "name": "पाठ-" + l.num + ": " + l.title, "description": l.metaDesc,
    "inLanguage": "hi", "isAccessibleForFree": true, "learningResourceType": "Lesson",
    "url": canonical, "image": OG_IMAGE(course), "educationalLevel": "Beginner", "position": l.num, "timeRequired": "PT" + String(l.minutes).split("-").pop() + "M",
    "isPartOf": { "@type": "Course", "@id": "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/#course", "name": course.title, "description": course.tagline,
      "provider": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com" } } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
    { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
    { "@type": "ListItem", "position": 3, "name": course.title, "item": "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/" },
    { "@type": "ListItem", "position": 4, "name": "पाठ-" + l.num + ": " + l.title, "item": canonical } ] };
  page = page.replace("</head>",
    '<meta property="og:title" content="' + escAttr(trimTitle(l.metaTitle, 90)) + '">\n' +
    '<meta property="og:description" content="' + escAttr(trimDesc(l.metaDesc, 200)) + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + canonical + '">\n' +
    '<meta property="og:image" content="' + OG_IMAGE(course) + '">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' +
    '<meta property="og:locale" content="hi_IN">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + escAttr(trimTitle(l.metaTitle)) + '">\n<meta name="twitter:description" content="' + escAttr(trimDesc(l.metaDesc)) + '">\n<meta name="twitter:image" content="' + OG_IMAGE(course) + '">\n' +
    '<link rel="alternate" hreflang="hi" href="' + canonical + '">\n<link rel="alternate" hreflang="x-default" href="' + canonical + '">\n' +
    '<script type="application/ld+json">' + ldSafe(ld) + "</scr" + "ipt>\n" +
    '<script type="application/ld+json">' + ldSafe(bc) + "</scr" + "ipt>\n" +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n<link rel="stylesheet" href="/assets/kaithi-course.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>' + (course.progressJs ? '\n<script src="' + course.progressJs + '" defer></scr' + 'ipt>' : '') + '\n</body>');
  /* ── (30-Jul स्थायी-नियम, Founder) घड़ी+प्रगति-इंजन का लोहे का पहरा ──
     भविष्य का हर कोर्स-पाठ इसी नियम पर: course-lesson.css+js अनिवार्य।
     टेम्पलेट-बदलाव से कड़ी छूटे = build यहीं fail (पेज बनेगा ही नहीं)।
     दायरा: सिर्फ़ पाठ-पन्ने — course-details/index जैसे मेटा-पन्ने बाहर
     (उन पर "पढ़ा"-दर्ज = पाठ-गिनती का झूठा फुलाव)। */
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson इंजन-कड़ी पाठ-पेज में नहीं — " + (l && l.id));

  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return { page, words: coreWords };
}

/* ---------- मुख्य ---------- */
if (prescanTokens()) process.exit(1);
const outDir = path.join(ROOT, "courses", KTH_COURSE.lang, KTH_COURSE.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
KTH_LESSONS.forEach((l, i) => {
  const prev = i > 0 ? fileName(KTH_COURSE, KTH_LESSONS[i-1]) : null;
  const next = i < KTH_LESSONS.length - 1 ? fileName(KTH_COURSE, KTH_LESSONS[i+1]) : null;
  const built = buildPage(KTH_COURSE, l, prev, next);
  if (!built){ fail++; return; }
  const f = fileName(KTH_COURSE, l);
  fs.writeFileSync(path.join(outDir, f), built.page, "utf8");
  console.log("✅ पाठ-" + l.num + " → courses/" + KTH_COURSE.lang + "/" +
    KTH_COURSE.slug + "/" + f + " (" + built.words + " शब्द)");
  ok++;
});

/* ---------- कोर्स-परिचय पेज (index.html) — SEO-नियम: /courses/[lang]/[slug]/index.html ---------- */
function buildCourseIndex(course, lessons){
  const GEN_NOTE_IDX =
    "<!-- ⚙️ यह पेज generator से बना है (generator/build_kaithi_pages.js — कोर्स-बातें KTH_COURSE से) —\n" +
    "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

  function partBlock(pt){
    const inPart = lessons.filter(l => l.num >= pt.from && l.num <= pt.to);
    if (!inPart.length) return "";
    const items = inPart.map(l =>
      '<li class="ci-item"><a class="crs-lsn" data-num="' + l.num + '" href="' + fileName(course, l) + '">पाठ-' + l.num + ": " + escText(l.title) +
      '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
    ).join("\n");
    const last = inPart[inPart.length - 1].num;
    const soon = (last < pt.to)
      ? '<p class="ci-soon">पाठ ' + (last + 1) + "-" + pt.to + " — जल्द जुड़ेंगे।</p>"
      : '<p class="ci-soon">' + (course.partLabel || "हिस्सा") + "-" + pt.no + " (पाठ " + pt.from + "-" + pt.to + ") पूरा ✅</p>";
    /* [26-Oct] खुलने-बंद होने वाली सूची — 218 पाठों से पन्ना 32,000px लंबा था; कड़ियाँ DOM में रहती हैं (Google पढ़ता है) */
    return '<details class="ci-ch"' + (pt.no === 1 ? " open" : "") + '>\n<summary>' + (course.partLabel || "हिस्सा") + "-" + pt.no + ": " + pt.name.replace(/\s*\([^)]*\)/g, "") +
      " · पाठ " + pt.from + "-" + pt.to + "</summary>\n" +
      '<ul class="ci-list">\n' + items + "\n</ul>\n" + soon + "\n</details>\n\n";
  }
  const partSections = course.parts.map(partBlock).join("");

  const SE = LANDING.loadSE(ROOT, "/courses/" + course.lang + "/" + course.slug + "/");
  const body = kthTokens(LANDING.landingBody(course, lessons, partSections, SE, fileName(course, lessons[0])));

  /* index की check-robot: bracket · font · कूट-नाम (शब्द-गिनती नियम पाठों का है, परिचय का नहीं) */
  const vis = visibleText(body);
  const holes = [];
  if (/[\[\]]/.test(vis)) holes.push("square bracket");
  const small = body.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font " + n + "px");
  }
  if (new RegExp("\\b" + course.code + "\\b", "i").test(vis)) holes.push("कूट-नाम दिखने वाले text में");
  if (holes.length){ console.error("❌ कोर्स-परिचय check-robot fail: " + holes.join(" · ")); return false; }

  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  const canonical = "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/";
  const LH = LANDING.landingHead(course, lessons, SE, canonical, OG_IMAGE(course));
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + escText(LH.title) + "</title>\n" +
    '<meta name="description" content="' + escAttr(LH.desc) + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  page = page.replace("</head>", LH.extra +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n<link rel="stylesheet" href="/assets/kaithi-course.css">\n' +
    "<style>.ci-list{list-style:none;padding:0;margin:12px 0}.ci-item{display:flex;justify-content:space-between;gap:10px;padding:12px 4px;border-bottom:1px solid #E2E8F0;font-size:18px}.ci-item a{color:#1565C0;text-decoration:none;font-weight:600}.ci-min{color:#2E7D32;font-size:16px;white-space:nowrap}.ci-soon{color:#0B1F3A;font-size:17px;font-weight:600;margin-top:10px}</style>\n</head>");
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + (course.progressJs ? '\n<script src="' + course.progressJs + '" defer></scr' + 'ipt>' : "") + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE_IDX);
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log("✅ कोर्स-परिचय → courses/" + course.lang + "/" + course.slug + "/index.html");
  return true;
}
if (!buildCourseIndex(KTH_COURSE, KTH_LESSONS)) fail++;

if (flushMissing()) fail++;
console.log("\n— नतीजा: " + ok + " पेज बने · " + fail + " fail —");
if (fail) process.exit(1);
