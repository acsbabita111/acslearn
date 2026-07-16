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
      "हिस्सा-" + course.part.no + ": " + course.part.name + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + l.title + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: ' + l.minutes + " मिनट · पाठ " + l.num + " / " +
      course.totalLessons + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    "</header>\n\n" + secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    (l.videoUrl
      ? '<p><a href="' + l.videoUrl + '" target="_blank" rel="noopener">▶ इस पाठ का चुना हुआ वीडियो देखें</a>' +
        (l.videoNote ? " — " + l.videoNote : "") + " (नई खिड़की में खुलेगा)</p>\n"
      : "<p>इस पाठ का चुना हुआ वीडियो जल्द यहीं जुड़ेगा — जाँच-परख के बाद। तब तक ऊपर की समझाइश और चित्र पूरा पाठ हैं; पढ़ाई कहीं नहीं रुकती।</p>\n" +
        '<p>वेल्डिंग के और वीडियो भारत सरकार के <a href="https://bskillforum.bharatskills.gov.in/Home/video?flag=1&amp;pkTrade_ID=Welder&amp;pkCourse_ID=CTS" target="_blank" rel="noopener">BharatSkills वीडियो-मंच (Welder)</a> पर देखे जा सकते हैं — सरकारी भंडार, हिंदी सामग्री सहित। (नई खिड़की में खुलेगा)</p>\n') +
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
  page = page.replace("</head>",
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');

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

  const items = lessons.map(l =>
    '<li class="ci-item"><a href="' + fileName(course, l) + '">पाठ-' + l.num + ": " + l.title +
    '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
  ).join("\n");

  const body = '\n<article class="lsn-wrap ci-wrap">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + course.title + "</p>\n" +
    "<h1>" + course.title + "</h1>\n" +
    '<p class="lsn-meta">ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · बिना login · अपनी गति से · कुल ' +
      course.totalLessons + " पाठ</p>\n</header>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p>यह कोर्स उनके लिए है जो वेल्डिंग का हुनर सीखकर कमाना चाहते हैं — चाहे किसी दुकान में वेल्डर सहायक बनकर, चाहे आगे चलकर अपनी वेल्डिंग दुकान खोलकर। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। कोई भी पाठ खोलिए, पढ़िए, और अपनी वेल्डिंग डायरी बनाते चलिए।</p>\n" +
    "<p>पढ़ाई का रास्ता सीधा है — <b>पहले यहाँ मुफ़्त पढ़ो</b>, फिर मन पक्का हो तो आगे प्रवेश-टेस्ट देकर नज़दीकी वर्कशॉप में हाथ का अभ्यास, और अभ्यास के बाद परीक्षा से प्रमाण पत्र। टेस्ट, वर्कशॉप और परीक्षा की जानकारी समय आने पर यहीं जुड़ेगी — पढ़ाई के लिए आज किसी चीज़ का इंतज़ार नहीं।</p>\n</section>\n\n" +
    '<section class="lsn-sec">\n<h2>हिस्सा-' + course.part.no + ": " + course.part.name +
      " (पाठ 1-20)</h2>\n" +
    "<p>हुनर से पहले हिफ़ाज़त — पहले बीस पाठ आपके शरीर और आपकी जगह की सुरक्षा के हैं। अभी " +
      lessons.length + " पाठ तैयार हैं; बाक़ी जुड़ते जा रहे हैं।</p>\n" +
    '<ul class="ci-list">\n' + items + "\n</ul>\n" +
    (lessons.length < 20
      ? '<p class="ci-soon">पाठ ' + (lessons.length + 1) + "-20 — जल्द जुड़ेंगे।</p>"
      : '<p class="ci-soon">हिस्सा-1 (पाठ 1-20) पूरा — बधाई! अब हिस्सा-2 की तैयारी चल रही है।</p>') + "\n</section>\n\n" +
    '<section class="lsn-sec">\n<h2>आगे के हिस्से</h2>\n' +
    "<p>पूरा कोर्स " + course.totalLessons + " पाठों का है, आठ हिस्सों में। हिस्सा-2 (यंत्रों की पहचान) की तैयारी चल रही है — हर नया पाठ तैयार होते ही यहीं जुड़ता है। जो पाठ अभी नहीं बना, उसका झूठा बटन यहाँ कभी नहीं मिलेगा।</p>\n</section>\n\n" +
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
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE_IDX);
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log("✅ कोर्स-परिचय → courses/" + course.lang + "/" + course.slug + "/index.html");
  return true;
}
if (!buildCourseIndex(WELDING_COURSE, WELDING_LESSONS)) fail++;

console.log("\n— नतीजा: " + ok + " पेज बने · " + fail + " fail —");
if (fail) process.exit(1);
