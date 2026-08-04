/* ============================================================
   generator/twv_safai.js v1.0 — twv-भराव सफ़ाई-इंजन (खेप-1)
   04-Aug-2026 · Founder-आदेश: भराव-खंड हटें, पाठ-नियम (≥1200) न टूटे।
   ------------------------------------------------------------
   कचरा-पहचान (5 नियम — इनमें से कोई भी लगे तो खंड कचरा):
   1) h2 का देवनागरी-रूप JUNK-सूची में (बस/अंत/अलविदा/धन्यवाद…)
   2) KEEP_FIRST (संक्षेप में/अगला पाठ/सरल-सार) का दूसरा+ दोहराव
   3) h2 placeholder: सिर्फ़ 1-3 अंग्रेज़ी अक्षर + अंक (z1, y2, ab12)
   4) h2 में देवनागरी शून्य और शरीर <80 शब्द
   5) शरीर platitude-छाप (≥2 घिसे-वाक्यांश) और <90 शब्द, या किसी भी
      पहले h2 का दोहराव और शरीर <70 शब्द
   सुरक्षा: सिर्फ़ <section class="lsn-sec"> ब्लॉक छुए जाते हैं; jumplist,
   hero, सुनो-इंजन, head — सब byte-अछूते। हटाना = पूरा section-ब्लॉक।
   चलाना:
     node generator/twv_safai.js --measure           (सिर्फ़ नाप, कोई बदलाव नहीं)
     node generator/twv_safai.js --clean f1.html f2… (सिर्फ़ इन फ़ाइलों की सफ़ाई)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DIR = path.join(__dirname, "..", "courses", "hi", "two-wheeler");

const JUNK = new Set(["बस","अंत","समाप्त","अलविदा","पूर्ण","पूर्ण विराम","बस इतना","पूरी बात","बस अब","ठीक","आख़िर","आखिर","अंतिम शब्द","अंतिम विचार","शुभकामनाएँ","धन्यवाद","निष्कर्ष","अंत में","आगे","पूरा हुआ","धन्यवाद आख़िरी","निष्कर्ष अंतिम","पूरी बात अंत","बस अंत में","ठीक अंत","बस अब अंत","अंतिम1","अब बस खत्म","बस अब खत्म","आख़िर अब","पूर्ण अंत","समापन","अंतिम","आख़िर में","पूरा","बस अंत","धन्यवाद अंत में","पूर्ण विराम अंत","बस अंत खत्म","आख़िरी वाक्य","बस इतना ही","अंतिम टिप्पणी","आख़िरी शब्द","अंत में एक बार फिर","आख़िरी विचार"]); /* v1.1: 04-Aug सफ़ाई-दौर के 26 नए कचरा-रूप */
const KEEP_FIRST = new Set(["संक्षेप में","अगला पाठ","सरल-सार"]);
const PLAT = ["तैयार रहें","आगे बढ़ते रहें","कभी न भूलें","यह ज्ञान बहुत","गर्व से आगे","हर सर्विस में इसे","कभी लापरवाही न","कभी अंदाज़े से","हमेशा याद रखें","आगे बढ़ें, हमेशा"];

const devnorm = x => x.replace(/<[^>]+>/g, "").replace(/[^\u0900-\u097F ]/g, "").replace(/\s+/g, " ").trim();
const rawh2  = x => x.replace(/<[^>]+>/g, "").trim();
const wcount = t => (t.replace(/<[^>]+>/g, " ").match(/[\u0900-\u097FA-Za-z0-9]+/g) || []).length;

function analyse(html){
  const secs = [...html.matchAll(/<section class="lsn-sec">[\s\S]*?<\/section>/g)].map(m => m[0]);
  const seen = Object.create(null);
  const junk = [];
  for (const sec of secs) {
    const m = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (!m) continue;
    const dv = devnorm(m[1]), rw = rawh2(m[1]);
    const w = wcount(sec);
    seen[dv] = (seen[dv] || 0) + 1;
    let bad = false;
    if (JUNK.has(dv)) bad = true;
    if (/^निदान\s*\d+$/.test(dv)) bad = true; /* v1.1 */
    else if (KEEP_FIRST.has(dv) && seen[dv] > 1) bad = true;
    else if (/^[A-Za-z]{1,3}[0-9]{0,3}$/.test(rw)) bad = true;
    else if (dv === "" && w < 80) bad = true;
    else if (!KEEP_FIRST.has(dv) && seen[dv] > 1 && w < 70) bad = true;
    else {
      let hits = 0;
      for (const p of PLAT) if (sec.indexOf(p) !== -1) hits++;
      if (hits >= 2 && w < 90) bad = true;
    }
    if (bad) junk.push({ sec, w });
  }
  return { junk, total: wcount(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<svg[\s\S]*?<\/svg>/g, " ")) };
}

function clean(html){
  const { junk } = analyse(html);
  let out = html;
  for (const j of junk) {
    const i = out.indexOf(j.sec);
    if (i === -1) { throw new Error("खंड नहीं मिला — रुकावट (सुरक्षा)"); }
    /* section + उसके ठीक बाद की ख़ाली पंक्तियाँ */
    let end = i + j.sec.length;
    while (out[end] === "\n" || out[end] === "\r") end++;
    out = out.slice(0, i) + out.slice(end);
  }
  return { out, removed: junk.length, removedWords: junk.reduce((a, b) => a + b.w, 0) };
}

const args = process.argv.slice(2);
const files = fs.readdirSync(DIR).filter(f => f.startsWith("twv-") && f.endsWith(".html")).sort();

if (args[0] === "--measure") {
  let rows = [];
  for (const f of files) {
    const html = fs.readFileSync(path.join(DIR, f), "utf8");
    const { junk, total } = analyse(html);
    const jw = junk.reduce((a, b) => a + b.w, 0);
    rows.push({ f, junk: junk.length, jw, after: total - jw });
  }
  const clean0 = rows.filter(r => r.junk === 0).length;
  const ok = rows.filter(r => r.junk > 0 && r.after >= 1200);
  const need = rows.filter(r => r.junk > 0 && r.after < 1200).sort((a, b) => a.after - b.after);
  console.log("कुल:", rows.length, "| पहले-से-साफ़:", clean0, "| हटाओ-भर:", ok.length, "| भराई-चाहिए:", need.length);
  console.log("कुल कचरा-शब्द:", rows.reduce((a, b) => a + b.jw, 0), "| कुल भराई-घाटा:", need.reduce((a, b) => a + (1200 - b.after), 0));
  console.log("CLEANONLY_LIST=" + ok.map(r => r.f).join(","));
  console.log("WORST8=" + need.slice(0, 8).map(r => r.f + "(" + r.after + ")").join(","));
} else if (args[0] === "--clean") {
  let done = 0;
  for (const f of args.slice(1)) {
    const p = path.join(DIR, f);
    const html = fs.readFileSync(p, "utf8");
    const r = clean(html);
    fs.writeFileSync(p, r.out);
    console.log("🧹", f, "— हटे", r.removed, "खंड /", r.removedWords, "शब्द");
    done++;
  }
  console.log("साफ़ किए:", done);
} else {
  console.log("उपयोग: --measure | --clean <files…>");
}
