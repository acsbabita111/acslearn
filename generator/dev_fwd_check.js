/* ============================================================
   dev_fwd_check.js — SE024 चार-पहिया कोर्स का स्वतंत्र check-robot (🏁-द्वार)
   v1.0 · 07-Sep-2026 — बने हुए पेजों की disk-से जाँच (generator से अलग आँख)
   चलाना: repo-रूट से → node generator/dev_fwd_check.js
   जाँचें: गिनती 440+index · ≥1200 शब्द · ≥1 svg · square-bracket नहीं ·
   font≥16 · कूट-नाम नहीं · लाइसेंस-पंक्ति · prev/next ज़ंजीर अखंड ·
   index-कड़ियाँ जीवित · अल्पविराम ≤12/100 · course-lesson कड़ी
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "courses", "hi", "four-wheeler-driver");

function vis(html){
  return html.replace(/<script[\s\S]*?<\/script>/g," ")
    .replace(/<svg[\s\S]*?<\/svg>/g," ").replace(/<style[\s\S]*?<\/style>/g," ")
    .replace(/<[^>]+>/g," ").replace(/&[a-z]+;/g," ").replace(/\s+/g," ").trim();
}
function words(t){ const m=t.match(/[\u0900-\u097FA-Za-z0-9]+/g); return m?m.length:0; }

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".html"));
const lessons = files.filter(f => f !== "index.html");
const holes = [];
if (files.length !== 441) holes.push("फ़ाइल-गिनती " + files.length + " (441 चाहिए)");

let minW=99999;
const fileSet = {};
lessons.forEach(f => fileSet[f]=1);
lessons.forEach(f => {
  const h = fs.readFileSync(path.join(DIR,f),"utf8");
  const art = h.slice(h.indexOf("<!-- PAGE-CONTENT-START -->"), h.indexOf("<!-- PAGE-CONTENT-END -->"));
  const v = vis(art), w = words(v);
  minW = Math.min(minW, w);
  if (w < 1200) holes.push(f+": शब्द "+w);
  if (!/<svg[\s>]/.test(art)) holes.push(f+": svg नहीं");
  if (/[\[\]]/.test(v)) holes.push(f+": square bracket");
  if (/\bfwd\b|\bSE024\b/i.test(v)) holes.push(f+": कूट-नाम");
  if (v.indexOf("सरकारी ड्राइविंग लाइसेंस (Driving Licence) का विकल्प नहीं")<0) holes.push(f+": लाइसेंस-पंक्ति नहीं");
  const commas=(v.match(/,/g)||[]).length;
  if (commas*100/Math.max(w,1) > 12) holes.push(f+": अल्पविराम "+Math.round(commas*100/w)+"/100");
  const small = art.match(/font(?:-size)?\s*[:=]\s*["']?0*([0-9]{1,2})(?:\.[0-9]+)?(?:px)?["']?/gi)||[];
  for (const m of small){ const n=parseInt(m.match(/([0-9]{1,2})/)[1],10); if(n<16&&n>4) holes.push(f+": font "+n); }
  if (art.indexOf("/assets/course-lesson.css")>=0) {} /* head में है */
  if (h.indexOf("/assets/course-lesson.css")<0 || h.indexOf("/assets/course-lesson.js")<0) holes.push(f+": course-lesson कड़ी नहीं");
  /* भीतरी कड़ियाँ जीवित */
  const re=/href="(fwd-[a-z0-9-]+\.html)"/g; let m2;
  while((m2=re.exec(art))) if(!fileSet[m2[1]]) holes.push(f+": मरी कड़ी "+m2[1]);
});

/* index-कड़ियाँ */
const idx = fs.readFileSync(path.join(DIR,"index.html"),"utf8");
const re=/href="(fwd-[a-z0-9-]+\.html)"/g; let m; let idxLinks=0;
while((m=re.exec(idx))){ idxLinks++; if(!fileSet[m[1]]) holes.push("index: मरी कड़ी "+m[1]); }
if (idxLinks !== 440) holes.push("index कड़ी-गिनती "+idxLinks+" (440 चाहिए)");
if (/[\[\]]/.test(vis(idx.slice(idx.indexOf("PAGE-CONTENT-START"),idx.indexOf("PAGE-CONTENT-END"))))) holes.push("index: square bracket");

/* अगला-पाठ ज़ंजीर: हर पाठ (अंतिम छोड़) में data-nextlsn हो */
let chain=0;
lessons.forEach(f=>{ if(fs.readFileSync(path.join(DIR,f),"utf8").indexOf("data-nextlsn")>=0) chain++; });
if (chain !== 439) holes.push("अगला-पाठ ज़ंजीर "+chain+" (439 चाहिए)");

console.log("पाठ-पेज: "+lessons.length+" · न्यूनतम-शब्द: "+minW+" · index-कड़ियाँ: "+idxLinks);
if (holes.length){ console.error("❌ होल "+holes.length+":"); holes.slice(0,25).forEach(h=>console.error("  • "+h)); process.exit(1); }
console.log("🏁 dev_fwd_check v1.0 — सब जाँचें पास");
