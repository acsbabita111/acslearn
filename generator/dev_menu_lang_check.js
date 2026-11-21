/* ============================================================
   dev_menu_lang_check.js v1.0 (जाँच-यंत्र, 21-Nov-2026, खेप M-1)
   Founder का आदेश (21-Nov-2026): पैनल की चारों भाषाओं (हिंदी, English, कन्नड़, बांग्ला) में मेन्यू का हर आइटम उसी
   भाषा के पन्ने पर खुले। यह यंत्र 4 × 10 की तालिका बनाता है: हर भाषा में हर मेन्यू-आइटम कहाँ खुलता है।
     ✅ = उसी भाषा का पन्ना · 🔄 = पन्ना पैनल की भाषा में अपने-आप बदलता है (रजिस्ट्रेशन गाइड)
     🟡 = अभी English पन्ना (उस भाषा का पन्ना बाक़ी) · 🔴 = अभी हिंदी पन्ना (बाक़ी, और "हिंदी के बाद हिंदी नहीं" नियम टूटता है)
     ❌ = पन्ना ही नहीं (FAIL)
   पते वैसे ही निकाले जाते हैं जैसे assets/acs-universal.js v2.9 निकालता है (links.js: href, href_en, href_lang)।
   साथ में: यंत्र से बने हर पन्ने का hreflang-गुच्छा उसके सब साथी पन्नों में हूबहू (FAIL अगर नहीं)।
   चलाएँ: node generator/dev_menu_lang_check.js          (बाक़ी काम सिर्फ़ गिनता है)
          node generator/dev_menu_lang_check.js --strict (कोई भी 🟡/🔴 बचा हो, तो FAIL)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const M = require("./lib_menu_lang.js");
const ROOT = M.ROOT, STRICT = process.argv.indexOf("--strict") > -1;
const L = M.readLinks();
const LG = ["hi", "en", "kn", "bn"];
let fail = 0, pend = 0;
const bad = m => { console.log("  ❌ " + m); fail++; };

function urlFor(m, lang) {
  if (lang === "hi") return m.href;
  if (lang === "en") return m.href_en || m.href;
  if (m.key === "home") return "/" + lang + "/";
  return (m.href_lang && m.href_lang[lang]) || m.href_en || m.href;
}
console.log("मेन्यू × भाषा (" + LG.join(", ") + ")");
for (const m of L.menu) {
  const row = [];
  for (const lg of LG) {
    const u = urlFor(m, lg), f = M.fileOf(u), full = path.join(ROOT, f);
    if (!fs.existsSync(full)) { row.push("❌ " + u); bad(m.key + "/" + lg + ": फ़ाइल नहीं: " + f); continue; }
    const s = fs.readFileSync(full, "utf8"), hl = (s.match(/<html[^>]*\slang="([^"]+)"/) || [])[1] || "?";
    if (hl === lg) row.push("✅");
    else if (m.key === "register" && /panel_i18n\.js/.test(s)) row.push("🔄");
    else if (hl === "en") { row.push("🟡 " + u); pend++; }
    else { row.push("🔴 " + u); pend++; }
  }
  console.log("  " + (m.icon + " " + m.key).padEnd(14) + " | " + row.join(" | "));
}
/* यंत्र से बने पन्नों का hreflang-गुच्छा: हर साथी पन्ने में वही पंक्तियाँ */
for (const k of Object.keys(M.PAGES)) {
  const lines = M.hreflangLines(L, k);
  for (const c of M.cluster(L, k)) {
    const f = M.fileOf(c[1]), full = path.join(ROOT, f);
    if (!fs.existsSync(full)) { bad(k + ": गुच्छे का पन्ना नहीं: " + f); continue; }
    const s = fs.readFileSync(full, "utf8");
    for (const l of lines) if (s.indexOf(l) < 0) bad(k + ": " + f + " में hreflang नहीं: " + l);
    const n = (s.match(/<link rel="alternate" hreflang=/g) || []).length;
    if (n !== lines.length) bad(k + ": " + f + " में hreflang " + n + " (चाहिए " + lines.length + ")");
  }
}
console.log("बाक़ी (🟡/🔴): " + pend);
if (fail || (STRICT && pend)) { console.log("⛔ dev_menu_lang_check: FAIL " + (fail || pend)); process.exit(1); }
console.log("🏁 dev_menu_lang_check v1.0 : पास (बाक़ी काम " + pend + ")");
