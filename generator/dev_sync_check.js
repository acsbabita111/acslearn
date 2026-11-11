#!/usr/bin/env node
/* ============================================================
   dev_sync_check.js v1.1 (जाँच-यंत्र) · 10-Nov-2026 (v1.1: career सब भाषाएँ)
   सवाल: "अगर आज कोई generator दोबारा चले, तो क्या live का कोई सुधार पलट जाएगा?"
   जड़ (10-Nov GSC-दौर में पकड़ी): बाद के दौर पेज/sitemap बदलते रहे पर पुराना
   generator नहीं सुधरा; अगला दौर उसी generator को चलाता तो पिछला काम चुपचाप मिटता
   (sitemap से 29 पते, 13 भाषा-होम का बटन, career का hreflang-गुच्छा)।
   नियम (स्थायी): हर देय से पहले यह यंत्र पास हो; "zero" वाली हर पाइपलाइन का
   बदलाव शून्य हो। नई पाइपलाइन बने तो यहाँ एक पंक्ति जोड़ें।
   चलाना (सिर्फ़ फेंकने-योग्य नक़ल में — यह git checkout/clean करता है):
     node generator/dev_sync_check.js --scratch
   सुरक्षा: साफ़ git-पेड़ अनिवार्य; Founder के clone (acslearn-repo) में कभी नहीं चलता।
   ============================================================ */
"use strict";
const cp = require("child_process");
const path = require("path");
const ROOT = path.join(__dirname, "..");

if (!process.argv.includes("--scratch")) { console.log("⛔ सिर्फ़ फेंकने-योग्य नक़ल में चलाएँ: --scratch"); process.exit(2); }
if (/acslearn-repo/i.test(ROOT)) { console.log("⛔ यह Founder का clone है — यहाँ नहीं चलेगा।"); process.exit(2); }
const sh = (c) => cp.execSync(c, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }).toString();
if (sh("git status --porcelain").trim()) { console.log("⛔ git-पेड़ साफ़ नहीं — पहले commit करें।"); process.exit(2); }

/* expect: zero = बदलाव शून्य होना ही चाहिए · nowrite = रुक सकता है, पर लिखे कुछ नहीं ·
   debt = दर्ज क़र्ज़ (सिर्फ़ सूचना, रोक नहीं) */
const PIPES = [
  { name: "विशेष पेज (build_specials)", cmds: ["build_specials.js"], expect: "zero" },
  { name: "sitemap (build_sitemap)", cmds: ["build_sitemap.js"], expect: "zero" },
  /* 12-Nov-2026: होम-पेज की खोज-सूची और होम (हिंदी + English) */
  { name: "खोज-सूची + होम (build_search_index, build_home)", cmds: ["build_search_index.js", "build_home.js"], expect: "zero" },
  /* 11-Nov-2026: भाषा-परिवार की अंतिम SEO-परत (title/description lib_seo_meta.js से, जुड़वाँ व reader canonical) */
  { name: "SEO-परत (build_seo_meta)", cmds: ["build_seo_meta.js"], expect: "zero" },
  { name: "बोलो-वर्कबुक + शब्दकोश (build_bolo_shabd)", cmds: ["build_bolo_shabd.js"], expect: "debt",
    note: "11-Nov दर्ज क़र्ज़: संथाली के 2 पेज generator से अलग बनते हैं (ओल-चिकी दौर के बाद); बाक़ी 830 पेज बराबर" },
  { name: "भाषा-होम (build_mirror_homes)", cmds: ["build_mirror_homes.js"], expect: "zero" },
  { name: "career-हिंदी (landing4 → patch_career_hi)", cmds: ["build_landing4.js", "patch_career_hi.js"], expect: "zero" },
  /* रजिस्टर की हर भाषा का career-पेज (en + mirror-data की कुंजियाँ) */
  { name: "career-भाषा सब (build_career_lang × रजिस्टर)", expect: "zero",
    cmds: ["en"].concat(Object.keys(require("./data/mirror_home_strings.js"))).map(c => "build_career_lang.js " + c) },
  { name: "career-English (build_career_en)", cmds: ["build_career_en.js"], expect: "nowrite" },
  { name: "उद्यम-परिचय 950 (build_udyam_intro_pages)", cmds: ["build_udyam_intro_pages.js"], expect: "zero" },
  { name: "redirect-पर्चियाँ (build_moved_stubs)", cmds: ["build_moved_stubs.js"], expect: "zero" },
  { name: "लिपि-परिचय (build_lipi_pages)", cmds: ["build_lipi_pages.js"], expect: "debt",
    note: "10-Nov दर्ज क़र्ज़: अभ्यास-अक्षर Math.random से — हर दौड़ नया क्रम (हानि नहीं, शोर); भाषा-कोड से तय-क्रम अगला दौर" },
  { name: "dashboards (build_dashboards)", cmds: ["build_dashboards.js"], expect: "debt",
    note: "10-Nov दर्ज क़र्ज़: generator बासी (learner English-परत v1.2.1 के बाद) — अलग दौर" }
];

/* sitemap.xml की <lastmod> = build-तारीख़ (सच) — सिर्फ़ उसी पंक्ति का बदलाव "बदलाव" नहीं */
function realChanges() {
  const files = sh("git status --porcelain").split("\n").filter(Boolean);
  return files.filter(l => {
    const f = l.slice(3).trim();
    if (f !== "sitemap.xml") return true;
    const d = sh("git diff -U0 -- sitemap.xml").split("\n")
      .filter(x => /^[+-]/.test(x) && !/^(\+\+\+|---)/.test(x));
    return !d.every(x => /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod><\/sitemap>\s*$/.test(x));
  });
}

let bad = 0;
for (const p of PIPES) {
  let exitOk = true, err = "";
  for (const c of p.cmds) {
    try { cp.execSync("node generator/" + c, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], timeout: 900000 }); }
    catch (e) { exitOk = false; err = (e.stdout || "").toString().split("\n").filter(Boolean).slice(-1)[0] || "exit≠0"; break; }
  }
  const ch = realChanges();
  sh("git checkout -q -- . && git clean -fdq");
  let st;
  if (p.expect === "zero") st = (exitOk && ch.length === 0) ? "✅ शून्य बदलाव" : "❌ " + (exitOk ? ch.length + " फ़ाइलें पलटतीं" : "रुका: " + err);
  else if (p.expect === "nowrite") st = ch.length === 0 ? "✅ कुछ नहीं लिखता" + (exitOk ? "" : " (सुरक्षित रुकता है)") : "❌ " + ch.length + " फ़ाइलें लिखीं";
  else st = "⚠️ क़र्ज़: " + ch.length + " फ़ाइलें" + (p.note ? " — " + p.note : "");
  if (st.startsWith("❌")) { bad++; ch.slice(0, 5).forEach(l => st += "\n      " + l); }
  console.log((p.name + " ").padEnd(48, ".") + " " + st);
}
console.log(bad ? "\n⛔ " + bad + " पाइपलाइन live से बेमेल — देय रोकें, पहले generator सुधारें." : "\n🏁 सब पाइपलाइन live के बराबर");
process.exit(bad ? 1 : 0);
