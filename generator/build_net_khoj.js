/* build_net_khoj.js v1.0 (19-Nov-2026) : नेटवर्क पेज (/hi/network.html) की खोज, generator से।
   Founder की सलाह (19-Nov-2026): registration में लिखा बोर्ड और बैनर वाला नाम, ACS की मंज़ूरी के बाद, खोज में सबको दिखे।

   यह generator नेटवर्क पेज के तीन हिस्से अपने हाथ में रखता है (बाक़ी पेज byte-अछूता):
     1. ऊपर की गिनती-पट्टी: पहले से लिखे "0" की जगह "—" (असली गिनती server से आती है; बिना JS के झूठा 0 न दिखे)।
     2. "🔍 नेटवर्क खोजें" का पूरा हिस्सा: NET-KHOJ:START और NET-KHOJ:END के बीच।
     3. नीचे के script: पुराना udyam_data.js और देश-सूची वाला हाथ का script हटे; उनकी जगह
        /assets/geo/countries.js (भूगोल का एकमात्र घर) और /assets/net-khoj.js (खोज, server: searchPublicListings)।

   पहली दौड़ पुराने हिस्सों को हूबहू मिलाकर बदलती है (कोई हिस्सा ठीक एक बार न मिले, तो कुछ नहीं लिखता)।
   दूसरी दौड़ से सिर्फ़ markers के बीच का हिस्सा दोबारा बनता है। दो बार चलाने पर पेज वही रहता है।
   चलाएँ:  node generator/build_net_khoj.js          जाँच:  node generator/build_net_khoj.js --check */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "hi", "network.html");
const CHECK = process.argv.indexOf("--check") > -1;

const START = "<!-- NET-KHOJ:START (generator/build_net_khoj.js से बना; हाथ से न बदलें) -->";
const END = "<!-- NET-KHOJ:END -->";
const JS_MARK = "<!-- NET-KHOJ:JS (generator/build_net_khoj.js) -->";

const BLOCK = [
  START,
  '<section class="section-container" style="max-width:900px;padding-top:24px">',
  '  <div class="notice-card">',
  '    <div style="font-weight:800;color:var(--navy);font-size:1.15rem;margin-bottom:6px">🔍 नेटवर्क खोजें</div>',
  '    <p class="nk-help">ACS से जुड़े स्वीकृत केंद्र, वर्कशॉप और शिक्षकों की online कक्षाएँ यहाँ मिलती हैं।</p>',
  '    <p class="nk-help">हर नाम ACS की जाँच के बाद ही यहाँ आता है।</p>',
  '    <div class="net-filters">',
  '      <select class="net-sel" id="fCountry" aria-label="देश"><option value="">सब देश</option></select>',
  '      <select class="net-sel" id="fState" aria-label="राज्य"><option value="">सब राज्य</option></select>',
  '      <select class="net-sel" id="fDistrict" aria-label="ज़िला"><option value="">सब ज़िले</option></select>',
  '    </div>',
  '    <div class="net-filters">',
  '      <input class="net-sel" id="fQ" type="search" maxlength="60" placeholder="नाम या ACS नंबर लिखें" aria-label="नाम या ACS नंबर"/>',
  '      <button class="btn btn-primary nk-go" id="fGo" type="button">🔍 खोजें</button>',
  '    </div>',
  '    <div class="net-cats" role="group" aria-label="श्रेणी">',
  '      <button class="net-cat on" type="button" data-cat="" aria-pressed="true">🔎 सब</button>',
  '      <button class="net-cat" type="button" data-cat="center" aria-pressed="false">🏫 केंद्र</button>',
  '      <button class="net-cat" type="button" data-cat="workshop" aria-pressed="false">🔧 वर्कशॉप</button>',
  '      <button class="net-cat" type="button" data-cat="teacher" aria-pressed="false">👨‍🏫 शिक्षक की कक्षा</button>',
  '      <button class="net-cat" type="button" data-cat="ustad" aria-pressed="false">🛠️ उस्ताद की कक्षा</button>',
  '    </div>',
  '    <p class="nk-soon">🧭 काउंसलर, 💼 नियोक्ता और ✈️ एजेंट की सूची जल्द जुड़ेगी।</p>',
  '    <div id="netResult" class="nk-res" aria-live="polite"><p class="nk-note">सूची लाई जा रही है…</p></div>',
  '    <noscript><p class="nk-note">यह सूची देखने के लिए browser में JavaScript चालू करें।</p></noscript>',
  '    <div class="nk-cta">',
  '      <p>अपने सुंदर भविष्य के लिए Applied Computer School के नेटवर्क में जुड़ें और जीवन भर रॉयल्टी (royalty) पाएँ।</p>',
  '      <a href="/join.html" class="btn btn-primary">📝 नेटवर्क में जुड़ें</a>',
  '    </div>',
  '  </div>',
  '</section>',
  '<style>',
  '  .nk-help{color:var(--muted);font-size:17px;line-height:1.7;margin:0 0 6px}',
  '  .nk-go{flex:0 0 auto;min-height:48px;font-size:18px}',
  '  .nk-soon{color:var(--muted);font-size:16px;margin:-6px 0 12px}',
  '  .nk-res{margin-top:4px}',
  '  .nk-note{text-align:center;color:var(--muted);font-size:17px;padding:16px 8px;margin:0}',
  '  .nk-tot{font-size:17px;font-weight:800;color:var(--navy);margin:4px 0 10px}',
  '  .nk-card{background:#fff;border:2px solid var(--border);border-left:6px solid var(--blue);border-radius:14px;padding:12px 14px;margin:0 0 12px;text-align:left}',
  '  .nk-card.bdg{border-left-color:var(--green)}',
  '  .nk-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}',
  '  .nk-tag{display:inline-block;font-size:16px;font-weight:800;padding:3px 10px;border-radius:999px;background:var(--offwhite);color:var(--navy)}',
  '  .nk-tag.gn{background:#E8F5E9;color:var(--green)}',
  '  .nk-name{font-size:21px;font-weight:900;color:var(--navy);line-height:1.4;margin:2px 0 4px;word-break:break-word}',
  '  .nk-row{font-size:17px;color:var(--text,#223);line-height:1.7}',
  '  .nk-how{font-size:16px;color:var(--muted);line-height:1.7;margin-top:6px}',
  '  .nk-more{display:block;margin:6px auto 0;min-height:48px;font-size:18px}',
  '  .nk-cta{text-align:center;padding:20px 12px 6px;margin-top:10px;border-top:1px dashed var(--border)}',
  '  .nk-cta p{font-size:1.1rem;font-weight:700;color:var(--navy);max-width:520px;margin:0 auto 14px;line-height:1.7}',
  '</style>',
  END
].join("\n");

/* पहली दौड़ में जो पुराना हिस्सा हूबहू मिलना चाहिए */
const OLD_START = "<!-- खोज / फ़िल्टर -->\n<section class=\"section-container\" style=\"max-width:900px;padding-top:24px\">";
const OLD_END_TEXT = "      <a href=\"/join.html\" class=\"btn btn-primary\">📝 नेटवर्क में जुड़ें</a>\n    </div>\n  </div>\n</section>";
const OLD_UDYAM = "<!-- भारत के राज्य→ज़िला STATES_DISTRICTS यहाँ से -->\n<script src=\"/assets/udyam_data.js\"></script>\n";
const NEW_JS = JS_MARK + "\n<script src=\"/assets/geo/countries.js\"></script>\n<script src=\"/assets/net-khoj.js\"></script>\n";
const STAT_IDS = ["nDesh", "nZonal", "nRegional", "nCentre", "nTeacher", "nCounselor", "nEmployer", "nAgent", "nLabharthi"];

function stop(m) { console.error("⛔ " + m + " : hi/network.html नहीं बदला।"); process.exit(1); }
function once(s, piece, what) { const n = s.split(piece).length - 1; if (n !== 1) stop(what + " " + n + " बार मिला (ठीक 1 चाहिए)"); }

function build(src) {
  let s = src;
  /* 1. गिनती-पट्टी: 0 → — */
  for (const id of STAT_IDS) {
    const a = '<span class="net-n" id="' + id + '">0</span>', b = '<span class="net-n" id="' + id + '">—</span>';
    if (s.indexOf(b) > -1) continue;
    once(s, a, "गिनती " + id); s = s.replace(a, b);
  }
  /* 2. खोज का हिस्सा */
  if (s.indexOf(START) > -1) {
    once(s, START, "START marker"); once(s, END, "END marker");
    const i = s.indexOf(START), j = s.indexOf(END) + END.length;
    s = s.slice(0, i) + BLOCK + s.slice(j);
  } else {
    once(s, OLD_START, "पुराना खोज-हिस्सा (शुरू)");
    const i = s.indexOf(OLD_START), j = s.indexOf(OLD_END_TEXT, i);
    if (j < 0) stop("पुराने खोज-हिस्से का अंत नहीं मिला");
    const old = s.slice(i, j + OLD_END_TEXT.length);
    if (old.split("<section").length !== 2 || old.indexOf("id=\"netResult\"") < 0) stop("पुराना खोज-हिस्सा अपेक्षा से अलग है");
    s = s.slice(0, i) + BLOCK + s.slice(j + OLD_END_TEXT.length);
  }
  /* 3. scripts */
  if (s.indexOf(JS_MARK) < 0) {
    once(s, OLD_UDYAM, "udyam_data.js वाला script");
    const k = s.indexOf(OLD_UDYAM), a = s.indexOf("<script>", k), b = s.indexOf("</script>", a);
    if (a !== k + OLD_UDYAM.length) stop("udyam_data.js के ठीक बाद देश-सूची वाला script नहीं मिला");
    const inline = s.slice(a, b + "</script>".length);
    if (inline.indexOf("var COUNTRY_GROUPS") < 0 || inline.indexOf("SAARC_DATA") < 0) stop("देश-सूची वाला script अपेक्षा से अलग है");
    let tail = b + "</script>".length; if (s[tail] === "\n") tail++;
    s = s.slice(0, k) + NEW_JS + s.slice(tail);
  } else once(s, JS_MARK, "JS marker");
  return s;
}

const src = fs.readFileSync(FILE, "utf8");
const out = build(src);
if (build(out) !== out) stop("दूसरी दौड़ पेज बदल देती (generator idempotent नहीं)");
/* पहरे: पुरानी चीज़ें गईं, नई ठीक एक बार */
if (/udyam_data\.js|COUNTRY_GROUPS|SAARC_DATA|class="net-count"|TODO\(future\)/.test(out)) stop("पुराना हिस्सा बचा रह गया");
for (const id of ["fCountry", "fState", "fDistrict", "fQ", "fGo", "netResult"].concat(STAT_IDS)) if (out.split('id="' + id + '"').length !== 2) stop("id " + id + " ठीक एक बार नहीं");
if (/\[|\]/.test(BLOCK.replace(/<[^>]+>/g, ""))) stop("चौकोर कोष्ठक मिला");
if (CHECK) {
  if (out !== src) { console.error("⛔ --check: hi/network.html ताज़ा नहीं; generator चलाएँ।"); process.exit(1); }
  console.log("🏁 --check पास: hi/network.html ताज़ा है।"); process.exit(0);
}
if (out === src) console.log("✅ hi/network.html पहले से ताज़ा (कुछ नहीं बदला)।");
else { fs.writeFileSync(FILE, out, "utf8"); console.log("✅ लिखा: hi/network.html (" + Buffer.byteLength(src) + " → " + Buffer.byteLength(out) + " bytes)।"); }
