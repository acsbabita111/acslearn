/* sudhar_naara_apni.js v1.0 · 24-Nov-2026 : site का नारा "130 भाषा में, गाँव से ग्लोबल साउथ तक!" बदलकर "अपनी भाषा में, गाँव से ग्लोबल साउथ तक!"
   Founder (24-Nov-2026): "इस लाइन को बदल कर <अपनी भाषा में, गाँव से ग्लोबल साउथ तक!> इस तरह अपडेट करना है ... अब 130 भाषा का कोई लॉजिक नहीं है।"
   नियम (उसी दिन तय): नारे में कोई गिनती नहीं। गिनती सिर्फ़ उस पन्ने पर जिसकी वह गिनती है, और data से अपने-आप
   (कोर्स-सूची: generator/sudhar_courses_khoj.js v1.1)। पाठों के गद्य में "सैकड़ों भाषाएँ" (कभी पुराना न हो)।
   इस दौर में: हिंदी और English (हर पन्ना, टेम्पलेट, config, generator-data, पैनल के English/বাংলা/ಕನ್ನಡ अनुवाद की नई कुंजी)।
   अगले दौर में: 43 दूसरी भाषाओं के होम, करियर और अभिरुचि-पन्ने; कैथी और तिरहुता की PDF-पुस्तिका।
   जान-बूझकर नहीं छूते: courses/hi/bhasha/english/lipi/index.html (byte-frozen; वहाँ नारा चलते समय acs-config.js से नया दिखता है)।
   अलग दौर, Founder की अनुमति से: dashboard/index.html (login) और उसका टेम्पलेट dashboard/_LOGIN_TEMPLATE.html
   (dev_dash_gen_check: टेम्पलेट से बना पन्ना = live पन्ना; login पर नारा वैसे भी acs-config.js से चलते समय नया दिखता है), assets/dashboard.js (प्रमाणपत्र का नारा),
   और उनकी robot-अपेक्षाएँ (dev_cert_guard.js, dev_panel_dash_check.js, dev_panel_lang_check.js: प्रमाणपत्र का पुराना नारा जाँचते हैं), पुराना dashboard.js (root, कहीं से नहीं बुलाया जाता)।
   कैसे: नीचे की तालिका के हूबहू जोड़े (पुराना → नया), हर text-फ़ाइल में। हर जोड़ा कितनी बार लगा, यह छपता है।
   चलाना: node generator/sudhar_naara_apni.js            (सिर्फ़ गिनती, robot: कोई जोड़ा बाक़ी हो तो exit 1)
           node generator/sudhar_naara_apni.js --write    (फ़ाइलें बदलो; दोबारा चलाने पर 0) */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const WRITE = process.argv.includes("--write");

const PAIRS = [
  /* नारा: हिंदी */
  ["130 भाषा में, गाँव से ग्लोबल साउथ तक!", "अपनी भाषा में, गाँव से ग्लोबल साउथ तक!"],
  ["130 भाषा में गाँव से ग्लोबल साउथ तक — मोबाइल फ्रेंडली कोर्स कंटेंट!", "अपनी भाषा में गाँव से ग्लोबल साउथ तक — मोबाइल फ्रेंडली कोर्स कंटेंट!"],
  /* नारा: English */
  ["In 130 languages, from villages to the Global South", "In your own language, from villages to the Global South"],
  ["In 130 languages, from village to the Global South", "In your own language, from village to the Global South"],
  ["In 130 languages, from village to Global South", "In your own language, from village to Global South"],
  ["In 130 languages: from villages to the Global South", "In your own language: from villages to the Global South"],
  ["to the Global South in 130 languages", "to the Global South in your own language"],
  /* होम का परिचय (हिंदी, English) और उसके SEO-शब्द */
  ["130 भाषाओं में, गाँव से ग्लोबल साउथ तक,", "अपनी भाषा में, गाँव से ग्लोबल साउथ तक,"],
  ["always-free online learning in 130 languages", "always-free online learning in your own language"],
  ["Always-free online learning in 130 languages", "Always-free online learning in your own language"],
  ["\"130 भाषा\", ", "\"अपनी भाषा\", "],
  ["\"130 languages\", ", "\"your own language\", "],
  /* 404 पन्ना */
  ["🗣️ 130 भाषा-कोर्स", "🗣️ भाषा-कोर्स"],
  ["होम, 130 भाषा-कोर्स, 950 उद्यम", "होम, भाषा-कोर्स, 950 उद्यम"],
  /* mission पन्ना (हिंदी, English) */
  ["10,000+ मोबाइल फ्रेंडली कोर्स, 130 भाषा।", "10,000+ मोबाइल फ्रेंडली कोर्स, अपनी भाषा में।"],
  ["ग्लोबल साउथ के लिए 130 भाषा", "ग्लोबल साउथ के लिए अपनी भाषा"],
  ["<b>130 भाषाओं में मोबाइल फ्रेंडली कोर्स</b>", "<b>अपनी भाषा में मोबाइल फ्रेंडली कोर्स</b>"],
  ["50 करोड़ Students, 130 भाषाएं", "50 करोड़ Students, अपनी भाषा में"],
  ["10,000+ mobile-friendly courses, 130 languages.", "10,000+ mobile-friendly courses, in your own language."],
  ["130 languages for the Global South", "Your own language, for the Global South"],
  ["mobile-friendly courses in 130 languages", "mobile-friendly courses in your own language"],
  ["500 million students, 130 languages", "500 million students, each in their own language"],
  /* वाणी पन्ना */
  ["शिक्षक-विद्यार्थी live कमरा, 130 भाषाएँ।", "शिक्षक-विद्यार्थी live कमरा, अपनी भाषा में।"],
  ["talk across 130 languages", "talk, each in their own language"],
  /* पाठों का गद्य (पहला कोड, DCA): गिनती नहीं, "सैकड़ों" */
  ["ACS के 130 भाषाओं वाले संसार", "ACS के सैकड़ों भाषाओं वाले संसार"],
  ["(130 भाषाओं वाले ACS की रीत)", "(सैकड़ों भाषाओं वाले ACS की रीत)"],
  ["ACS का अपना संसार भी 130 भाषाओं के शब्दों का है", "ACS का अपना संसार भी सैकड़ों भाषाओं के शब्दों का है"],
  ["950 उद्यमों की सूची, 130 भाषाओं की सूची", "950 उद्यमों की सूची, सैकड़ों भाषाओं की सूची"],
  ["ACS की पूरी website 130 भाषाओं की लिपियों में चलती है", "ACS की पूरी website सैकड़ों भाषाओं की लिपियों में चलती है"],
  ["ACS जैसे मंच 130 भाषाओं व कई देशों तक", "ACS जैसे मंच सैकड़ों भाषाओं व कई देशों तक"],
  ["यह ACS के \\\"130 भाषाओं\\\" के बड़े सपने", "यह ACS के \\\"अपनी भाषा में\\\" के बड़े सपने"],
  ["यह ACS के \"130 भाषाओं\" के बड़े सपने", "यह ACS के \"अपनी भाषा में\" के बड़े सपने"],
  ["यह ACS के &quot;130 भाषाओं&quot; के बड़े सपने", "यह ACS के &quot;अपनी भाषा में&quot; के बड़े सपने"]
];
/* जान-बूझकर नहीं छूते (ऊपर लिखा कारण) */
const SKIP = new Set(["courses/hi/bhasha/english/lipi/index.html", "dashboard/index.html", "dashboard/_LOGIN_TEMPLATE.html", "assets/dashboard.js", "dashboard.js", "generator/dev_cert_guard.js", "generator/dev_panel_dash_check.js", "generator/dev_panel_lang_check.js", "generator/sudhar_naara_apni.js"]);
const SKIP_DIR = /^(functions\/|generator\/data\/punarlekhan\/|generator\/data\/panel_i18n\/|assets\/i18n\/)/;   /* पैनल-अनुवाद: पुरानी कुंजी रहती है (login और प्रमाणपत्र अभी पुराने), नई कुंजी अलग से जुड़ती है, पैक build_panel_i18n.js बनाता है */
const BIN = /\.(png|jpe?g|webp|gif|pdf|woff2?|ttf|otf|ico|mp3|mp4|zip|gz)$/i;

const files = cp.execSync("git ls-files", { cwd: ROOT, maxBuffer: 1 << 28 }).toString().split("\n").filter(f => f && !BIN.test(f) && !SKIP.has(f) && !SKIP_DIR.test(f));
const hits = PAIRS.map(() => 0); let nFiles = 0;
for (const f of files) {
  const p = path.join(ROOT, f); let s;
  try { s = fs.readFileSync(p, "utf8"); } catch (e) { continue; }
  if (s.indexOf("130") < 0) continue;
  let t = s;
  PAIRS.forEach(([a, b], i) => { const n = t.split(a).length - 1; if (n) { hits[i] += n; t = t.split(a).join(b); } });
  if (t !== s) { nFiles++; if (WRITE) fs.writeFileSync(p, t); }
}
PAIRS.forEach(([a], i) => console.log(String(hits[i]).padStart(6) + "  " + a));
const tot = hits.reduce((x, y) => x + y, 0);
console.log((WRITE ? "✅ लिखा: " : "") + "बदलाव " + tot + " · फ़ाइलें " + nFiles);
if (!WRITE && tot) { console.log("⛔ " + tot + " पुराने नारे/गिनती बाक़ी: --write चलाओ"); process.exitCode = 1; }
else if (!WRITE) console.log("🏁 हिंदी और English में पुराना नारा (130) कहीं नहीं (छोड़ी गई फ़ाइलें: " + [...SKIP].join(", ") + ")");
