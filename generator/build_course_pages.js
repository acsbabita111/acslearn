/* ============================================================
   build_course_pages.js — कोर्स-पाठ पेजों का generator (परत-4)
   v1.2 · 16-Jul-2026 (काम-कोर्स-2: + videoUrl/videoNote-खाना — प्रति-पाठ सत्यापित वीडियो;
              बिना-वीडियो पाठों में सत्यापित BharatSkills सरकारी-मंच कड़ी। पहले का:
   v1.1 · 16-Jul-2026 (+ कोर्स-परिचय पेज (index.html) निर्माण;
              पाठ-1 का पिछला-बटन अब कोर्स-परिचय पर। पाठ-पेजों का GEN_NOTE v1.0 ही —
              ताकि अछूते पाठ byte-अछूते रहें।)
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट, home वाला universal ढाँचा)
         + generator/data/welding_lessons_data.js (परत-3 — पाठ-सामग्री का एकमात्र घर)
   चलाना: repo-रूट से → node generator/build_course_pages.js
   नतीजा: /courses/hi/<course-slug>/<code>-<num>-<slug>.html (SEO-नामकरण नियम)

   check-robot (fail = पेज नहीं बनेगा):
   1. हर पाठ ≥ 1200 शब्द (Founder-नियम 15-Jul: 1200-1300 न्यूनतम)
   2. हर पाठ में ≥ 1 रेखा-चित्र (svg) — अनिवार्य
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं
   5. कूट-नाम (course.code आदि) पेज के दिखने वाले text में नहीं
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { WELDING_COURSE, WELDING_LESSONS } =
  require(path.join(__dirname, "data", "welding_lessons_data.js"));

const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "15-Jul-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_course_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- सहायक ---------- */
function pad3(n){ return String(n).padStart(3, "0"); }

function fileName(course, l){
  /* SEO नियम: [code]-[num]-[slug].html · lowercase · hyphen · max 60 */
  const name = (course.code + "-" + pad3(l.num) + "-" + l.slug).toLowerCase();
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("slug-नियम टूटा: " + name);
  if (name.length > 60) throw new Error("slug 60 से लंबा: " + name);
  return name + ".html";
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
  /* svg के font: shorthand भी जाँचो */
  const svgFonts = contentHtml.match(/font\s*:\s*[0-9]{3}\s+0*([0-9]{1,2})px/gi) || [];
  for (const m of svgFonts){
    const n = parseInt(m.match(/([0-9]{1,2})px/i)[1], 10);
    if (n < 16) holes.push("svg font " + n + "px (< 16px)");
  }
  const codeRe = new RegExp("\\b" + course.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम (" + course.code + ") दिखने वाले text में");
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

function PART(num){ return WELDING_COURSE.parts.find(p => num >= p.from && num <= p.to) || WELDING_COURSE.parts[WELDING_COURSE.parts.length-1]; }

function ALL_LESSON_LINKS(course, curNum){
  return WELDING_LESSONS.map(x =>
    x.num === curNum
      ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>"
      : '<a href="' + fileName(course, x) + '">पाठ-' + x.num + "</a>"
  ).join(" ");
}

function lessonBody(course, l, prevFile, nextFile){
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + s.t + "</h2>\n" + s.h.trim() + "\n</section>"
  ).join("\n\n");

  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="/courses/' + course.lang + '/' + course.slug + '/">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '">अगला पाठ →</a>'
    : '<span class="lsn-navbtn lsn-soon">अगला पाठ — जल्द</span>';

  return '\n<article class="lsn-wrap">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + course.title + " › " +
      "हिस्सा-" + PART(l.num).no + ": " + PART(l.num).name + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + l.title + "</h1>\n" +
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
      : "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते —</p>\n") +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent("वेल्डिंग " + l.title + " हिंदी") +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      '<a class="lsn-vidbtn lsn-vidgov" href="https://bskillforum.bharatskills.gov.in/Home/video?flag=1&amp;pkTrade_ID=Welder&amp;pkCourse_ID=CTS" target="_blank" rel="noopener">🏛️ BharatSkills सरकारी वीडियो-मंच</a></p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function buildPage(course, l, prevFile, nextFile){
  const body = lessonBody(course, l, prevFile, nextFile);
  const { words, holes } = checkRobot(course, l, body);
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
    "<title>" + l.metaTitle + "</title>\n" +
    '<meta name="description" content="' + l.metaDesc + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  const ld = { "@context": "https://schema.org", "@type": "LearningResource",
    "name": "पाठ-" + l.num + ": " + l.title, "description": l.metaDesc,
    "inLanguage": "hi", "isAccessibleForFree": true, "learningResourceType": "Lesson",
    "url": canonical,
    "isPartOf": { "@type": "Course", "name": course.title, "description": course.tagline,
      "provider": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com" } } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
    { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
    { "@type": "ListItem", "position": 3, "name": course.title, "item": "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/" },
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

  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return { page, words };
}

/* ---------- मुख्य ---------- */
const outDir = path.join(ROOT, "courses", WELDING_COURSE.lang, WELDING_COURSE.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
WELDING_LESSONS.forEach((l, i) => {
  const prev = i > 0 ? fileName(WELDING_COURSE, WELDING_LESSONS[i-1]) : null;
  const next = i < WELDING_LESSONS.length - 1 ? fileName(WELDING_COURSE, WELDING_LESSONS[i+1]) : null;
  const built = buildPage(WELDING_COURSE, l, prev, next);
  if (!built){ fail++; return; }
  const f = fileName(WELDING_COURSE, l);
  fs.writeFileSync(path.join(outDir, f), built.page, "utf8");
  console.log("✅ पाठ-" + l.num + " → courses/" + WELDING_COURSE.lang + "/" +
    WELDING_COURSE.slug + "/" + f + " (" + built.words + " शब्द)");
  ok++;
});

/* ---------- कोर्स-परिचय पेज (index.html) — SEO-नियम: /courses/[lang]/[slug]/index.html ---------- */
function buildCourseIndex(course, lessons){
  const GEN_NOTE_IDX =
    "<!-- ⚙️ यह पेज generator से बना है (generator/build_course_pages.js v1.1 · 16-Jul-2026) —\n" +
    "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

  function partBlock(pt){
    const inPart = lessons.filter(l => l.num >= pt.from && l.num <= pt.to);
    if (!inPart.length) return "";
    const items = inPart.map(l =>
      '<li class="ci-item"><a href="' + fileName(course, l) + '">पाठ-' + l.num + ": " + l.title +
      '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
    ).join("\n");
    const last = inPart[inPart.length - 1].num;
    const soon = (last < pt.to)
      ? '<p class="ci-soon">पाठ ' + (last + 1) + "-" + pt.to + " — जल्द जुड़ेंगे।</p>"
      : '<p class="ci-soon">हिस्सा-' + pt.no + " (पाठ " + pt.from + "-" + pt.to + ") पूरा ✅</p>";
    return '<section class="lsn-sec">\n<h2>हिस्सा-' + pt.no + ": " + pt.name +
      " (पाठ " + pt.from + "-" + pt.to + ")</h2>\n" +
      '<ul class="ci-list">\n' + items + "\n</ul>\n" + soon + "\n</section>\n\n";
  }
  const partSections = course.parts.map(partBlock).join("");

  const body = '\n<article class="lsn-wrap ci-wrap">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + course.title + "</p>\n" +
    "<h1>" + course.title + "</h1>\n" +
    '<p class="lsn-meta">ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · बिना login · अपनी गति से · कुल ' +
      course.totalLessons + " पाठ</p>\n</header>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p>यह कोर्स उनके लिए है जो वेल्डिंग का हुनर सीखकर कमाना चाहते हैं — चाहे किसी दुकान में वेल्डर सहायक बनकर, चाहे आगे चलकर अपनी वेल्डिंग दुकान खोलकर। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। कोई भी पाठ खोलिए, पढ़िए, और अपनी वेल्डिंग डायरी बनाते चलिए।</p>\n" +
    "<p>पढ़ाई का रास्ता सीधा है — <b>पहले यहाँ मुफ़्त पढ़ो</b>, फिर मन पक्का हो तो आगे प्रवेश-टेस्ट देकर नज़दीकी वर्कशॉप में हाथ का अभ्यास, और अभ्यास के बाद परीक्षा से प्रमाण पत्र। टेस्ट, वर्कशॉप और परीक्षा की जानकारी समय आने पर यहीं जुड़ेगी — पढ़ाई के लिए आज किसी चीज़ का इंतज़ार नहीं।</p>\n</section>\n\n" +
    partSections +
    '<section class="lsn-sec">\n<h2>आगे के हिस्से</h2>\n' +
    "<p>पूरा कोर्स " + course.totalLessons + " पाठों का है, आठ हिस्सों में — हर नया पाठ तैयार होते ही यहीं जुड़ता है। जो पाठ अभी नहीं बना, उसका झूठा बटन यहाँ कभी नहीं मिलेगा।</p>\n</section>\n\n" +
    '<nav class="lsn-nav"><a class="lsn-navbtn lsn-next" href="' +
      fileName(course, lessons[0]) + '">पाठ-1 से शुरू करें →</a></nav>\n' +
    "</article>\n";

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
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + course.title + " — मुफ़्त ऑनलाइन कोर्स | ACS</title>\n" +
    '<meta name="description" content="' + course.title + ' का पूरा मुफ़्त ऑनलाइन कोर्स सरल हिंदी में — सुरक्षा से हुनर तक, ' + course.totalLessons + ' पाठ। बिना login पढ़िए, अपनी गति से।">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  page = page.replace("</head>",
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n' +
    "<style>.ci-list{list-style:none;padding:0;margin:12px 0}.ci-item{display:flex;justify-content:space-between;gap:10px;padding:12px 4px;border-bottom:1px solid #E2E8F0;font-size:18px}.ci-item a{color:#1565C0;text-decoration:none;font-weight:600}.ci-min{color:#2E7D32;font-size:16px;white-space:nowrap}.ci-soon{color:#0B1F3A;font-size:17px;font-weight:600;margin-top:10px}</style>\n</head>");
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE_IDX);
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log("✅ कोर्स-परिचय → courses/" + course.lang + "/" + course.slug + "/index.html");
  return true;
}
if (!buildCourseIndex(WELDING_COURSE, WELDING_LESSONS)) fail++;

console.log("\n— नतीजा: " + ok + " पेज बने · " + fail + " fail —");
if (fail) process.exit(1);
