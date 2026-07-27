#!/usr/bin/env node
/* ============================================================
   build_legacy_migrate.js v1.0 (परत-4) — काम-4ग: legacy कोर्स-पाठ →
   universal-प्रणाली (shell-swap)।
   सिद्धांत: भीतरी <main>-content byte-अछूता; सिर्फ़ बाहरी खोल बदले —
   universal navbar/menu/footer (दाता: welding-पाठ wld-001) + सही
   canonical + निकास-बटन (होम · सब-कोर्स · कोर्स-सूची) + course-lesson.js
   (learner-progress) + legacy-lesson.css (content-classes)।
   साथ बनाता है: assets/legacy-lesson.css — /assets/style.css से सिर्फ़
   class-नियम छानकर (global *, body, main आदि बाहर — universal से टकराव-रोक)।
   चलाना:
     node generator/build_legacy_migrate.js --course=ai      (pilot)
     node generator/build_legacy_migrate.js --course=dca
     node generator/build_legacy_migrate.js --course=printer
   नियम: कोई पाठ हाथ से नहीं; index.html/course-details अभी दायरे-बाहर
   (कोर्स-परिचय टेम्पलेट-A दौर)। फ़ाइल-नाम/URL अपरिवर्तित।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";

const COURSES = {
  ai:      { dir: "courses/hi/digital/ai-digital-master", name: "AI डिजिटल मास्टर (AI Digital Master)", pat: /^L\d+\.html$/ },
  dca:     { dir: "courses/hi/digital/dca",               name: "DCA — कंप्यूटर एप्लीकेशन डिप्लोमा (DCA)", pat: /^dca-l\d+\.html$/ },
  printer: { dir: "courses/hi/vocational/printer",        name: "प्रिंटर रिपेयरिंग (Printer Repairing)", pat: /^L\d+\.html$/ }
};

const arg = (process.argv.find(a => a.startsWith("--course=")) || "").split("=")[1];
if (!COURSES[arg]) { console.error("उपयोग: --course=ai|dca|printer"); process.exit(1); }
const C = COURSES[arg];

/* ---------- 1) legacy-lesson.css — style.css से सिर्फ़ class-नियम ---------- */
function classOnly(css) {
  let out = "", i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    const selRaw = css.slice(i, open);
    const sel = selRaw.trim();
    if (sel.startsWith("@media")) {
      /* भीतरी block पर वही छलनी */
      let depth = 1, j = open + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === "{") depth++;
        else if (css[j] === "}") depth--;
        j++;
      }
      const inner = classOnly(css.slice(open + 1, j - 1));
      if (inner.trim()) out += sel + "{\n" + inner + "}\n";
      i = j; continue;
    }
    let depth = 1, j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") depth--;
      j++;
    }
    const body = css.slice(open + 1, j - 1);
    /* समूह के हर selector की जड़ class/attribute हो तभी रखो */
    const parts = sel.split(",").map(s => s.trim());
    const safe = parts.length > 0 && parts.every(s => /^[.\[:]/.test(s) && !/^:root/.test(s));
    if (safe && sel) out += sel + "{" + body + "}\n";
    i = j;
  }
  return out;
}

const styleSrc = fs.readFileSync(path.join(ROOT, "assets/style.css"), "utf8");
/* :root के रंग-चर .lsn-wrap-दायरे में — content को पुराना रंग-संसार हूबहू,
   universal-खोल के --blue/--gold/--green से शून्य टकराव (नज़दीकी-परिभाषा जीतती है) */
const rootM = styleSrc.match(/:root\s*\{([^}]*)\}/);
const scopedVars = rootM ? ".lsn-wrap{" + rootM[1].trim() + "}\n" : "";
const legacyCss =
  "/* legacy-lesson.css — generator-निर्मित (build_legacy_migrate.js)।\n" +
  "   स्रोत: /assets/style.css के सिर्फ़ class-नियम (global *, html, body, main,\n" +
  "   a, p आदि बाहर — universal-खोल से टकराव-रोक)। हाथ से न बदलें —\n" +
  "   style.css बदले तो यह generator दोबारा चलाएँ। */\n" + scopedVars + classOnly(styleSrc) +
  "\n/* v1.1: scroll-पर-प्रकट (.reveal) बंद — content सदा दिखे (धुँधला-होल की जड़-2) */\n" +
  ".lsn-wrap .reveal{opacity:1 !important;transform:none !important;transition:none !important}\n" +
  "/* v1.1: legacy-content का अपना dark-मंच बहाल — भीतरी द्वीप मूल रंग-संसार में जिए,\n" +
  "   universal-खोल बाहर उजला रहे (सफ़ेद-पर्दे पर सफ़ेद-text वाला उल्टा-अंधापन रोक) */\n" +
  ".lsn-wrap{background:linear-gradient(180deg,var(--bg),var(--bg2)) !important;" +
  "color:var(--text);border-radius:14px;padding:18px 14px 26px}\n" +
  ".lsn-wrap .lsn-crumb, .lsn-wrap .lsn-crumb a{color:var(--muted)}\n" +
  ".lsn-wrap .lsn-crumb a{text-decoration:underline}\n";
fs.writeFileSync(path.join(ROOT, "assets/legacy-lesson.css"), legacyCss);

/* ---------- 2) welding-दाता खोल ---------- */
const donorPath = path.join(ROOT, "courses/hi/welding/wld-001-aankh-ki-suraksha.html");
const donor = fs.readFileSync(donorPath, "utf8");
const dMainA = donor.indexOf("<main");
const dMainB = donor.indexOf("</main>") + "</main>".length;
if (dMainA === -1 || dMainB < 10) { console.error("दाता-खोल में <main> नहीं"); process.exit(1); }
let shellHead = donor.slice(0, dMainA);
let shellFoot = donor.slice(dMainB);
/* खोल में content-सम्पत्तियाँ जोड़ो (एक बार) */
if (!shellHead.includes("legacy-lesson.css")) {
  shellHead = shellHead.replace("</head>",
    '<link rel="stylesheet" href="/assets/legacy-lesson.css">\n' +
    '<script src="/assets/app.js" defer></script>\n</head>');
}

function setHead(head, t) {
  head = head.replace(/<title>[\s\S]*?<\/title>/, "<title>" + t.title + "</title>");
  head = head.replace(/(<meta name="description" content=")[^"]*(")/, "$1" + t.desc + "$2");
  head = head.replace(/(<link rel="canonical" href=")[^"]*(")/, "$1" + t.canon + "$2");
  head = head.replace(/(<meta property="og:title" content=")[^"]*(")/, "$1" + t.title + "$2");
  head = head.replace(/(<meta property="og:url" content=")[^"]*(")/g, "$1" + t.canon + "$2");
  head = head.replace(/(<meta property="og:description" content=")[^"]*(")/, "$1" + t.desc + "$2");
  head = head.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      "headline": t.h1, "inLanguage": "hi",
      "isPartOf": { "@type": "Course", "name": C.name },
      "publisher": { "@type": "Organization", "name": "Applied Computer School" },
      "url": t.canon
    }) + "</script>");
  return head;
}

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/* ---------- 3) हर legacy पाठ ---------- */
const dir = path.join(ROOT, C.dir);
const files = fs.readdirSync(dir).filter(f => C.pat.test(f)).sort();
let done = 0, fail = [];
for (let fi = 0; fi < files.length; fi++) {
  const f = files[fi];
  const prevF = fi > 0 ? files[fi - 1] : null;
  const nextF = fi < files.length - 1 ? files[fi + 1] : null;
  const p = path.join(dir, f);
  const h = fs.readFileSync(p, "utf8");
  if (h.includes("/assets/acs-universal.js")) continue; /* पहले से universal */
  try {
    const mMain = h.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (!mMain) throw new Error("main नहीं");
    const inner = mMain[1];
    /* v1.2: main-बाहर बैठे ज़रूरी छिपे-अंग साथ लाओ — app.js इन्हीं से चलता है:
       lesson-map (पेज-नंबर-जाएँ सूची) · course-progress-data (प्रोग्रेस-मीटर) ·
       audio-dock (सारांश-सुनो पट्टी)। जो मिले, verbatim जुड़े। */
    let carried = "";
    const mMap = h.match(/<script type="application\/json" id="lesson-map">[\s\S]*?<\/script>/);
    if (mMap) carried += mMap[0] + "\n";
    const mProg = h.match(/<script type="application\/json" id="course-progress-data">[\s\S]*?<\/script>/);
    if (mProg) carried += mProg[0] + "\n";
    const mDock = h.match(/<div class="audio-dock"[\s\S]*?<\/div>/);
    if (mDock) carried += mDock[0] + "\n";
    const tRaw = (h.match(/<title>([^<]*)/) || [,""])[1].trim();
    const h1m = inner.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : tRaw.split("|")[0].trim();
    if (!h1) throw new Error("h1 नहीं");
    const dm = h.match(/name="description" content="([^"]*)"/);
    const desc = (dm ? dm[1] : (h1 + " — " + C.name + " का निःशुल्क पाठ।")).slice(0, 158);
    const code = f.replace(/\.html$/, "").toUpperCase();
    const canon = BASE + "/" + C.dir + "/" + f;
    const title = h1.slice(0, 55) + " | " + C.name.split(" (")[0] + " " + code;

    const article =
      '<article class="lsn-wrap">\n' +
      '<div class="lsn-head"><div class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' +
      '<a href="index.html">' + esc(C.name) + '</a> › ' + code + '</div></div>\n' +
      inner + "\n" +
      '<div class="lsn-exit" style="text-align:center;margin:26px 0 6px">' +
      (prevF ? '<a class="lsn-navbtn" href="' + prevF + '">← पिछला पाठ</a> ' : '') +
      (nextF ? '<a class="lsn-navbtn" href="' + nextF + '">अगला पाठ →</a>' : '') +
      '</div>\n' +
      '<div class="lsn-exit" style="text-align:center;margin:10px 0">' +
      '<a class="lsn-navbtn" href="/">🏠 होम</a> ' +
      '<a class="lsn-navbtn" href="/courses/hi/">📚 सब कोर्स</a> ' +
      '<a class="lsn-navbtn" href="index.html">🗂️ ' + esc(C.name.split(" (")[0]) + ' — पाठ-सूची</a>' +
      "</div>\n" + carried + "</article>";

    let page = setHead(shellHead, { title: esc(title), desc: esc(desc), canon, h1 }) +
      "<main>\n" + article + "\n</main>" + shellFoot;

    /* check-robot */
    if (!page.includes("/assets/acs-universal.js")) throw new Error("universal ग़ायब");
    if ((page.match(/<h1/g) || []).length !== 1) throw new Error("h1-गिनती " + (page.match(/<h1/g) || []).length);
    if ((page.match(/<\/main>/g) || []).length !== 1) throw new Error("main-गिनती");
    if (!page.includes('href="index.html"')) throw new Error("कोर्स-सूची निकास ग़ायब");
    if (nextF && !page.includes('href="' + nextF + '"')) throw new Error("अगला-कड़ी ग़ायब");
    if (prevF && !page.includes('href="' + prevF + '"')) throw new Error("पिछला-कड़ी ग़ायब");
    if (mMap && !page.includes('id="lesson-map"')) throw new Error("lesson-map ग़ायब");
    if (mProg && !page.includes('id="course-progress-data"')) throw new Error("progress-data ग़ायब");
    fs.writeFileSync(p, page);
    done++;
  } catch (e) { fail.push(f + " — " + e.message); }
}
console.log("— " + arg + ": " + done + " पाठ बदले · fail " + fail.length + " —");
fail.slice(0, 5).forEach(x => console.log("  ✗", x));
console.log("legacy-lesson.css:", legacyCss.length, "bytes");
