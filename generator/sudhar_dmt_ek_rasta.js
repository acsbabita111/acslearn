#!/usr/bin/env node
/* ============================================================================
   sudhar_dmt_ek_rasta.js v1.0 · 24-Nov-2026
   Founder: "इसको शुरू करो" (डिजिटल मित्र का "दो जीवित रास्ते" होल)।
   होल: डिजिटल मित्र के 109 पाठ-पन्नों पर लिखा था "तब तक दो जीवित रास्ते", पर बटन एक ही है
        (YouTube खोज)। सरकारी कड़ी (govVideoHtml) डिजिटल मित्र में ख़ाली है।
   यह script live पन्नों में सिर्फ़ दो पंक्तियाँ बदलता है, ठीक वैसे जैसे generator v2.4.1-dmt बनाता है:
     "तब तक दो जीवित रास्ते:"  ->  "तब तक एक जीवित रास्ता:"
     "(दोनों नई खिड़की में; ..." ->  "(नई खिड़की में; ..."
   क्यों script, पूरा release-build क्यों नहीं: release-build के लिए Founder की मुहर चाहिए, और मुहर
   अभी ख़ाली है (नारे वाले दौर से)। पन्ने हूबहू वही बनते हैं जो generator बनाएगा (सबूत: generator का
   preview-build और ये पन्ने, robots वाली एक पंक्ति छोड़कर, बाइट-बराबर)।
   चलाना (repo-रूट से):  node generator/sudhar_dmt_ek_rasta.js          (सिर्फ़ गिनती, कुछ नहीं बदलता)
                         node generator/sudhar_dmt_ek_rasta.js --write  (बदलता है)
   दोबारा चलाने पर: "बदली फ़ाइलें: 0"।
   ============================================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DIR = path.join(__dirname, "..", "courses", "hi", "digital-mitra-basic");
const WRITE = process.argv.includes("--write");
const PAIRS = [
  ["<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते:</p>",
   "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक एक जीवित रास्ता:</p>"],
  ['<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा। पढ़ाई कहीं नहीं रुकती।)</p>',
   '<p class="lsn-vidnote">(नई खिड़की में; वीडियो बिना भी पाठ पूरा। पढ़ाई कहीं नहीं रुकती।)</p>']
];
const files = fs.readdirSync(DIR).filter(f => /^dmt-\d+-\d+-.*\.html$/.test(f)).sort();
if (files.length !== 109) { console.error("❌ पाठ-पन्ने " + files.length + " मिले, 109 चाहिए"); process.exit(1); }
let changed = 0, already = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  let s = fs.readFileSync(p, "utf8");
  const vidBtns = ((s.match(/<p class="lsn-vidrow">[\s\S]*?<\/p>/) || [""])[0].match(/class="lsn-vidbtn/g) || []).length;
  if (vidBtns !== 1) { console.error("❌ " + f + ": वीडियो-पंक्ति में " + vidBtns + " बटन (1 चाहिए); कुछ नहीं बदला"); process.exit(1); }
  const oldN = PAIRS.map(pr => s.split(pr[0]).length - 1);
  const newN = PAIRS.map(pr => s.split(pr[1]).length - 1);
  if (oldN.every(n => n === 0) && newN.every(n => n === 1)) { already++; continue; }
  if (!(oldN.every(n => n === 1) && newN.every(n => n === 0))) {
    console.error("❌ " + f + ": अनपेक्षित हालत (पुराना " + oldN + " · नया " + newN + "); कुछ नहीं बदला"); process.exit(1);
  }
  for (const pr of PAIRS) s = s.replace(pr[0], pr[1]);
  if (WRITE) fs.writeFileSync(p, s);
  changed++;
}
console.log((WRITE ? "बदली फ़ाइलें: " : "बदलनी हैं: ") + changed + " · पहले से ठीक: " + already + " · कुल: " + files.length);
