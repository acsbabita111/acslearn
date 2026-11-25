#!/usr/bin/env node
/* ============================================================================
   build_course_toc.js v1.0 · 25-Nov-2026 · कोर्स की पाठ-सूची (TOC) का data (परत-4 → परत-3)
   Founder (25-Nov): "laptop पर कोर्स खोलें, तो बाईं ओर Claude-पैनल जैसी पट्टी में सब खंड;
   खंड छुएँ तो उसके सब पाठ; पाठ दाईं ओर।" पट्टी assets/course-toc.js बनाती है; उसका data यही फ़ाइल।
   ------------------------------------------------------------
   स्रोत: बने हुए पाठ-पन्ने ही (जो website पर हैं, वही सच):
     - फ़ाइल-नाम  → पाठ का पता
     - <h1>पाठ 1.1: शीर्षक</h1> → पाठ-संख्या और शीर्षक
     - lsn-crumb का आख़िरी हिस्सा "खंड-1: नाम" → खंड
   नतीजा: assets/toc/<कोर्स>.json  (हाथ से कभी नहीं)
   चलाना:  node generator/build_course_toc.js            (लिखे)
           node generator/build_course_toc.js --check    (सिर्फ़ जाँचे: फ़ाइल ताज़ा है? कुछ नहीं लिखता)
   जाँच (कुछ भी गड़बड़ = रुके, कुछ नहीं लिखे): हर पन्ने पर h1 और खंड · खंड-संख्या = पाठ-संख्या का पहला अंक ·
   हर खंड में पाठ 1,2,3… बिना छूटे · खंड 1,2,3… बिना छूटे · कुल पाठ = पन्नों की गिनती · पता दोहराया नहीं।
   ============================================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const VERSION = "build_course_toc.js v1.0";
const COURSES = {
  SE026: { dir: "courses/hi/digital-mitra-basic", file: /^dmt-(\d{1,2})-(\d{2})-[a-z0-9-]+\.html$/, expect: 109 }
};

function stop(m) { console.error("❌ " + m); process.exit(1); }
function txt(s) { return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim(); }

function build(id) {
  const C = COURSES[id];
  const dir = path.join(ROOT, C.dir);
  const files = fs.readdirSync(dir).filter(f => C.file.test(f));
  if (files.length !== C.expect) stop(id + ": " + C.expect + " पाठ-पन्ने चाहिए, मिले " + files.length);
  let title = "";
  const rows = files.map(f => {
    const h = fs.readFileSync(path.join(dir, f), "utf8");
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(h), cr = /<p class="lsn-crumb">([\s\S]*?)<\/p>/.exec(h);
    if (!h1 || !cr) stop(f + ": h1 या lsn-crumb नहीं मिला");
    const m = /^पाठ (\d{1,2})\.(\d{1,2}): (.+)$/.exec(txt(h1[1]));
    if (!m) stop(f + ": h1 \"पाठ X.Y: शीर्षक\" रूप में नहीं");
    const parts = txt(cr[1]).split("›").map(s => s.trim());
    const kh = /^खंड-(\d{1,2}): (.+)$/.exec(parts[parts.length - 1] || "");
    if (!kh) stop(f + ": crumb के आख़िर में \"खंड-N: नाम\" नहीं");
    if (+kh[1] !== +m[1]) stop(f + ": खंड " + kh[1] + " पर पाठ " + m[1] + "." + m[2]);
    const fm = C.file.exec(f);
    if (+fm[1] !== +m[1] || +fm[2] !== +m[2]) stop(f + ": फ़ाइल-नाम और h1 की पाठ-संख्या अलग");
    const t = parts.length >= 3 ? parts[parts.length - 2] : "";
    if (!title) title = t; else if (t !== title) stop(f + ": कोर्स-नाम दूसरे पन्नों से अलग");
    return { k: +m[1], kn: kh[2], n: +m[2], t: m[3], u: "/" + C.dir + "/" + f };
  }).sort((a, b) => a.k - b.k || a.n - b.n);
  const chapters = [];
  rows.forEach(r => {
    let c = chapters[chapters.length - 1];
    if (!c || c.k !== r.k) {
      if (r.k !== chapters.length + 1) stop("खंड-" + r.k + " से पहले कोई खंड छूटा");
      c = { k: r.k, name: "खंड-" + r.k + ": " + r.kn, lessons: [] }; chapters.push(c);
    } else if (c.name !== "खंड-" + r.k + ": " + r.kn) stop("खंड-" + r.k + " के दो नाम");
    if (r.n !== c.lessons.length + 1) stop("खंड-" + r.k + " में पाठ " + r.k + "." + r.n + " से पहले कोई पाठ छूटा");
    c.lessons.push({ n: r.k + "." + r.n, t: r.t, u: r.u });
  });
  const urls = new Set(rows.map(r => r.u));
  if (urls.size !== rows.length) stop("एक पता दो बार");
  return { course_id: id, made_by: VERSION, title: title, intro: "/" + C.dir + "/", total: rows.length,
           chapters: chapters.map(c => ({ name: c.name, lessons: c.lessons })) };
}

const check = process.argv.indexOf("--check") >= 0;
let bad = 0;
Object.keys(COURSES).forEach(id => {
  const o = build(id), out = path.join(ROOT, "assets", "toc", id + ".json"), text = JSON.stringify(o, null, 1) + "\n";
  const old = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;
  const sum = id + ": " + o.chapters.length + " खंड · " + o.total + " पाठ (" + o.chapters.map(c => c.lessons.length).join("+") + ")";
  if (check) { if (old === text) console.log("✅ ताज़ा · " + sum); else { console.log("❌ बासी या ग़ायब: assets/toc/" + id + ".json · " + sum); bad++; } return; }
  if (old === text) { console.log("= बदलाव नहीं · " + sum); return; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
  console.log("✅ लिखा assets/toc/" + id + ".json · " + sum);
});
process.exit(bad ? 1 : 0);
