/* ============================================================
   build_twv_pages.js — टू-व्हीलर कोर्स-पाठ पेजों का generator (परत-4)
   v1.0 · 03-Aug-2026 — build_course_pages.js (welding v1.2) की नक़ल +
   Nirdesh v2.1 चार-दरवाज़ा नियम:
     • सरल-सार खंड अनिवार्य (≤4 पंक्ति, हर पंक्ति ≤8 शब्द)
     • सुनो-सलाह पंक्ति हर पाठ के शीर्ष पर
     • बोलचाल-शब्द पहरा (वाहन/विद्युत/उपकरण/प्रज्वलन/स्नेहक = fail)
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत: /_TEMPLATE.html + generator/data/twv_course_data.js
   चलाना: repo-रूट से → node generator/build_twv_pages.js
   नतीजा: /courses/hi/two-wheeler/twv-<chNo>-<num>-<slug>.html
          + /courses/hi/two-wheeler/index.html (कोर्स-परिचय)
   check-robot (fail = पेज नहीं बनेगा):
   1. ≥1200 शब्द  2. ≥1 svg  3. square-bracket नहीं  4. font<16px नहीं
   5. कूट-नाम UI-text में नहीं  6. सरल-सार (v2.1)  7. बोलचाल-शब्द (v2.1)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { TWV_COURSE, TWV_LESSONS } =
  require(path.join(__dirname, "data", "twv_course_data.js"));

const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_twv_pages.js v1.0 · 03-Aug-2026) —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* बोलचाल-शब्द नियम (Nirdesh v2.1) — दिखने वाले text में निषिद्ध */
const KITABI_WORDS = ["वाहन", "विद्युत", "उपकरण", "प्रज्वलन", "स्नेहक"];

/* ---------- सहायक ---------- */
function pad2(n){ return String(n).padStart(2, "0"); }
function numFile(num){
  /* "1"→"01" · "9.5"→"09-5" · "2.6"→"02-6" */
  const parts = String(num).split(".");
  return pad2(parts[0]) + (parts[1] ? "-" + parts[1] : "");
}
function chapterOf(l){
  const c = TWV_COURSE.chapters.find(c => c.no === String(l.ch));
  if (!c) throw new Error("अनजान अध्याय: " + l.ch);
  return c;
}
function fileName(l){
  const c = chapterOf(l);
  const name = (TWV_COURSE.code + "-" + c.file + "-" + numFile(l.num) + "-" + l.slug).toLowerCase();
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("slug-नियम टूटा: " + name);
  if (name.length > 64) throw new Error("फ़ाइल-नाम लंबा: " + name);
  return name + ".html";
}
function visibleText(html){
  return String(html || "")
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim();
}
function wordCount(html){ const t = visibleText(html); return t ? t.split(" ").length : 0; }

/* ---------- check-robot ---------- */
function checkRobot(l, contentHtml){
  const holes = [];
  const words = wordCount(contentHtml);
  if (words < 1200) holes.push("शब्द-गिनती " + words + " (< 1200)");
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं मिला");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const small = contentHtml.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font-size " + n + "px (< 16px): " + m.trim());
  }
  const svgFonts = contentHtml.match(/font-size\s*=\s*"0*([0-9]{1,2})"/gi) || [];
  for (const m of svgFonts){
    const n = parseInt(m.match(/([0-9]{1,2})"/)[1], 10);
    if (n < 16) holes.push("svg font-size " + n + " (< 16)");
  }
  const codeRe = new RegExp("\\b" + TWV_COURSE.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम (" + TWV_COURSE.code + ") दिखने वाले text में");
  /* v2.1 — सरल-सार */
  if (!Array.isArray(l.saral) || l.saral.length < 2 || l.saral.length > 4)
    holes.push("सरल-सार: 2-4 पंक्तियाँ चाहिए (मिलीं " + (l.saral ? l.saral.length : 0) + ")");
  else l.saral.forEach((line, i) => {
    const w = String(line).trim().split(/\s+/).filter(Boolean).length;
    if (w > 8) holes.push("सरल-सार पंक्ति-" + (i+1) + " में " + w + " शब्द (≤8 चाहिए)");
    if (/[\[\]]/.test(line)) holes.push("सरल-सार में square bracket");
  });
  /* v2.1 — बोलचाल-शब्द पहरा */
  for (const w of KITABI_WORDS)
    if (vis.indexOf(w) > -1) holes.push('किताबी शब्द "' + w + '" मिला — बोलचाल-शब्द नियम (v2.1)');
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

/* ---------- पाठ का content-HTML ---------- */
function chapterLessonLinks(l, curFile){
  /* उसी अध्याय के पाठों की छलाँग-सूची (jump) */
  const sibs = TWV_LESSONS.filter(x => String(x.ch) === String(l.ch));
  return sibs.map(x => {
    const f = fileName(x);
    return f === curFile
      ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>"
      : '<a href="' + f + '">पाठ-' + x.num + "</a>";
  }).join(" ");
}

function lessonBody(l, prevFile, nextFile){
  const c = chapterOf(l);
  const curFile = fileName(l);
  const saralHtml =
    '<section class="lsn-sec">\n<h2>🌱 सरल-सार</h2>\n<p>' +
    l.saral.map(x => String(x).trim()).join("<br>\n") + "</p>\n</section>";
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + s.t + "</h2>\n" + s.h.trim() + "\n</section>"
  ).join("\n\n");
  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="/courses/' + TWV_COURSE.lang + '/' + TWV_COURSE.slug + '/">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '">अगला पाठ →</a>'
    : '<span class="lsn-navbtn lsn-soon">अगला पाठ — जल्द</span>';
  const pos = "अध्याय-" + c.no + " · पाठ-" + l.num;

  return '\n<article class="lsn-wrap">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + TWV_COURSE.title +
      " › अध्याय-" + c.no + ": " + c.name + "</p>\n" +
    "<h1>" + pos + ": " + l.title + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: ' + (l.minutes || "11-13") + " मिनट · " + pos +
      " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    /* v2.1 सुनो-सलाह पंक्ति (टेम्पलेट-स्तर — प्रति-पाठ data नहीं) */
    '<p class="lsn-meta">पढ़ना कठिन लगे? हर हिस्से का 🔊 बटन दबाओ — पाठ बोलकर सुनाएगा।</p>\n' +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="/courses/' + TWV_COURSE.lang + "/" + TWV_COURSE.slug + '/">📖 कोर्स-परिचय</a></p>\n' +
    "</header>\n\n" +
    saralHtml + "\n\n" +
    '<details class="lsn-jump">\n<summary>📚 इस अध्याय के सब पाठ</summary>\n<div class="lsn-jumplist">\n' +
    chapterLessonLinks(l, curFile) + "\n</div>\n</details>\n\n" + secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    (l.videoUrl
      ? '<p><a class="lsn-vidbtn" href="' + l.videoUrl + '" target="_blank" rel="noopener">▶ इस पाठ का जाँचा हुआ वीडियो देखें</a>' +
        (l.videoNote ? " — " + l.videoNote : "") + "</p>\n"
      : "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक एक जीवित रास्ता —</p>\n") +
    '<p class="lsn-vidrow"><a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
      encodeURIComponent("टू व्हीलर बाइक " + l.title + " हिंदी") +
      '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a></p>\n' +
    '<p class="lsn-vidnote">(नई खिड़की में; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function buildPage(l, prevFile, nextFile){
  const body = lessonBody(l, prevFile, nextFile);
  const { words, holes } = checkRobot(l, body);
  if (holes.length){
    console.error("❌ अध्याय-" + l.ch + " पाठ-" + l.num + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);

  const c = chapterOf(l);
  const fname = fileName(l);
  const canonical = "https://acslearn.com/courses/" + TWV_COURSE.lang + "/" + TWV_COURSE.slug + "/" + fname;
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + l.metaTitle + "</title>\n" +
    '<meta name="description" content="' + l.metaDesc + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  const ld = { "@context": "https://schema.org", "@type": "LearningResource",
    "name": "अध्याय-" + c.no + " पाठ-" + l.num + ": " + l.title, "description": l.metaDesc,
    "inLanguage": "hi", "isAccessibleForFree": true, "learningResourceType": "Lesson",
    "url": canonical,
    "isPartOf": { "@type": "Course", "name": TWV_COURSE.title, "description": TWV_COURSE.tagline,
      "provider": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com" } } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
    { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
    { "@type": "ListItem", "position": 3, "name": TWV_COURSE.title, "item": "https://acslearn.com/courses/" + TWV_COURSE.lang + "/" + TWV_COURSE.slug + "/" },
    { "@type": "ListItem", "position": 4, "name": "पाठ-" + l.num + ": " + l.title, "item": canonical } ] };
  page = page.replace("</head>",
    '<meta property="og:title" content="' + l.metaTitle + '">\n' +
    '<meta property="og:description" content="' + l.metaDesc + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    '<script type="application/ld+json">' + JSON.stringify(ld) + "</scr" + "ipt>\n" +
    '<script type="application/ld+json">' + JSON.stringify(bc) + "</scr" + "ipt>\n" +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>\n</body>');
  /* 30-Jul स्थायी-नियम: इंजन-कड़ी अनिवार्य — छूटे = fail */
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson इंजन-कड़ी नहीं — पाठ " + l.ch + "/" + l.num);
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return { page, words, fname };
}

/* ---------- मुख्य ---------- */
const outDir = path.join(ROOT, "courses", TWV_COURSE.lang, TWV_COURSE.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
TWV_LESSONS.forEach((l, i) => {
  const prev = i > 0 ? fileName(TWV_LESSONS[i-1]) : null;
  const next = i < TWV_LESSONS.length - 1 ? fileName(TWV_LESSONS[i+1]) : null;
  const built = buildPage(l, prev, next);
  if (!built){ fail++; return; }
  fs.writeFileSync(path.join(outDir, built.fname), built.page, "utf8");
  console.log("✅ अ-" + l.ch + " पाठ-" + l.num + " → " + built.fname + " (" + built.words + " शब्द)");
  ok++;
});

/* ---------- कोर्स-परिचय (index.html) — अध्याय-वार सूची ---------- */
function buildIndex(){
  const byCh = {};
  TWV_LESSONS.forEach(l => { (byCh[l.ch] = byCh[l.ch] || []).push(l); });
  const chBlocks = TWV_COURSE.chapters.map(c => {
    const list = (byCh[c.no] || []).map(l =>
      '<li><a href="' + fileName(l) + '">पाठ-' + l.num + ": " + l.title + "</a></li>").join("\n");
    return '<section class="lsn-sec">\n<h2>अध्याय-' + c.no + ": " + c.name + "</h2>\n" +
      (list ? "<ul>\n" + list + "\n</ul>" : "<p>पाठ जल्द जुड़ेंगे।</p>") + "\n</section>";
  }).join("\n\n");
  const body = '\n<article class="lsn-wrap">\n<header class="lsn-head">\n' +
    "<h1>" + TWV_COURSE.title + "</h1>\n" +
    '<p class="lsn-meta">' + TWV_COURSE.tagline + " · कुल " + TWV_COURSE.totalLessons +
    ' पाठ (जुड़ते जा रहे) · पढ़ाई पूरी तरह मुफ़्त</p>\n' +
    '<p class="lsn-meta">पढ़ना कठिन लगे? हर पाठ में 🔊 सुनो-बटन है — पाठ बोलकर सुनाता है।</p>\n' +
    "</header>\n\n" + chBlocks + "\n</article>\n";
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  const canonical = "https://acslearn.com/courses/" + TWV_COURSE.lang + "/" + TWV_COURSE.slug + "/";
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + TWV_COURSE.title + " — मुफ़्त, सरल हिंदी में | ACS</title>\n" +
    '<meta name="description" content="' + TWV_COURSE.tagline + '">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  page = page.replace("</head>", '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log("✅ कोर्स-परिचय index.html");
}
buildIndex();

console.log("\nकुल: " + ok + " पाठ बने · " + fail + " fail");
if (fail) process.exit(1);
