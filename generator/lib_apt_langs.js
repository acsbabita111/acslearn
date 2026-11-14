/* ============================================================
   generator/lib_apt_langs.js : v1.3 (14-Nov-2026; v1.2 13-Nov-2026; v1.1 12-Nov-2026) · परत-3
   v1.3 (खेप 5-क): dateLocaleOf() जोड़ा। तारीख़ हर भाषा में ASCII अंकों (0-9) में छपे, इसलिए तारीख़ के रूप के आगे "-u-nu-latn" लगता है;
     इसके बिना बांग्ला, मराठी, नेपाली जैसी भाषाओं में browser तारीख़ अपने अंकों में छापता है, जबकि बाक़ी पन्ने पर अंक ASCII हैं।
   अभिरुचि-परीक्षा की 30 भाषाओं का एकमात्र घर।
   Founder के फ़ैसले (12-Nov-2026), Founder के अपने शब्दों में (बातचीत के अभिलेख से, हूबहू):
     1. पहले 25 भाषाओं की सूची पर "हाँ"।
     2. उसी दिन Founder का प्रश्न: "अच्छा , और अगर पुराना 15 भाषा कि सूची, और नई 14 भारतीय भाषा और इंग्लिस मिलकर 30 भाषा पर काम किया जाए तो क्या होगा ?"
     3. Claude की 30-भाषा योजना देखकर Founder का आदेश: "30 भाषा का प्लान जारी ---"। इसी से 25 की सीमा निरस्त हुई।
   30 = भारत-केंद्रित 15 + ग्लोबल साउथ 10 + पुरानी टॉप-15 सूची की बची तीन (रूसी, जर्मन, जापानी) + दो और (तुर्की, फ़ारसी)।
   तुर्की और फ़ारसी उस योजना में Claude का प्रस्ताव थीं (बोलने वाले बहुत, होम और करियर पन्ने पहले से live), जिसे Founder ने ऊपर के आदेश से जारी किया।
   Founder इन दो को कभी भी बदल सकते हैं: बस ORDER की पंक्ति और नीचे का ब्योरा बदलेगा। अभी live सिर्फ़ LIVE-सूची वाली भाषाएँ हैं।
   - ORDER: 30 भाषा-कोड, तय क्रम में। कोड = मास्टर स्प्रेडशीट का ACS-कोड (पता-नियम v1.1); यह फ़ाइल हर कोड को
     generator/data/bhasha_register.json (स्प्रेडशीट की मशीन-निकासी) से मिलाती है: कोड न मिले या लिपि बेमेल हो = रुकावट।
   - LIVE: जिन भाषाओं का परीक्षा-पन्ना बन चुका है। hreflang, sitemap और जाँच-यंत्र इसी सूची से चलते हैं।
     नई भाषा की खेप पूरी होने पर उसका कोड यहाँ जुड़ता है; यही एक पंक्ति बदलती है।
   - NOTICE: जिन भाषाओं के पन्ने पर "AI-अनुवाद, समिति-जाँच बाक़ी" पट्टी रहती है (जब तक भाषा-समिति न देख ले)।
   - पन्ने का फ़ॉन्ट, दिशा (दाएँ-से-बाएँ) और og-locale यहाँ नहीं दोहराए गए: वे उसी भाषा की करियर-तालिका
     (generator/career_<कोड>_strings.js का META) से पढ़े जाते हैं (एक चीज़ = एक जगह)।
   ============================================================ */
"use strict";
var fs = require("fs"), path = require("path");
var ORDER = ["hi", "en", "bn", "mr", "te", "ta", "ur", "gu", "kn", "ml", "pa", "or", "as", "ne", "sd",
             "zh", "es", "ar", "fr", "pt", "id", "vi", "ha", "sw", "tl",
             "ru", "de", "ja", "tr", "fa"];
var LIVE = ["hi", "en", "bn"];
var NOTICE = ["as", "or", "sd", "ha"];
/* script: लिपि का नाम (रजिस्टर के "lipi" स्तंभ जैसा) · dateLocale: तारीख़ का रूप · hi: हिंदी में भाषा का नाम */
var L = {
  hi: { script: "Deva", dateLocale: "hi-IN", hi: "हिंदी" },
  en: { script: "Latn", dateLocale: "en-IN", hi: "English" },
  bn: { script: "Beng", dateLocale: "bn-IN", hi: "बांग्ला" },
  mr: { script: "Deva", dateLocale: "mr-IN", hi: "मराठी" },
  te: { script: "Telu", dateLocale: "te-IN", hi: "तेलुगु" },
  ta: { script: "Taml", dateLocale: "ta-IN", hi: "तमिल" },
  ur: { script: "Arab", dateLocale: "ur-PK", hi: "उर्दू" },
  gu: { script: "Gujr", dateLocale: "gu-IN", hi: "गुजराती" },
  kn: { script: "Knda", dateLocale: "kn-IN", hi: "कन्नड़" },
  ml: { script: "Mlym", dateLocale: "ml-IN", hi: "मलयालम" },
  pa: { script: "Guru", dateLocale: "pa-IN", hi: "पंजाबी" },
  or: { script: "Orya", dateLocale: "or-IN", hi: "ओड़िया" },
  as: { script: "Beng", dateLocale: "as-IN", hi: "असमिया" },
  ne: { script: "Deva", dateLocale: "ne-NP", hi: "नेपाली" },
  sd: { script: "Arab", dateLocale: "sd-PK", hi: "सिंधी" },
  zh: { script: "Hans", dateLocale: "zh-CN", hi: "मंदारिन" },
  es: { script: "Latn", dateLocale: "es-ES", hi: "स्पेनिश" },
  ar: { script: "Arab", dateLocale: "ar", hi: "अरबी" },
  fr: { script: "Latn", dateLocale: "fr-FR", hi: "फ़्रेंच" },
  pt: { script: "Latn", dateLocale: "pt-BR", hi: "पुर्तगाली" },
  id: { script: "Latn", dateLocale: "id-ID", hi: "इंडोनेशियाई" },
  vi: { script: "Latn", dateLocale: "vi-VN", hi: "वियतनामी" },
  ha: { script: "Latn", dateLocale: "ha-NG", hi: "हौसा" },
  sw: { script: "Latn", dateLocale: "sw-KE", hi: "स्वाहिली" },
  tl: { script: "Latn", dateLocale: "fil-PH", hi: "तागालोग" },
  ru: { script: "Cyrl", dateLocale: "ru-RU", hi: "रूसी" },
  de: { script: "Latn", dateLocale: "de-DE", hi: "जर्मन" },
  ja: { script: "Jpan", dateLocale: "ja-JP", hi: "जापानी" },
  tr: { script: "Latn", dateLocale: "tr-TR", hi: "तुर्की" },
  fa: { script: "Arab", dateLocale: "fa-IR", hi: "फ़ारसी" }
};
/* हर लिपि के अक्षर-खंड। U+0964/0965 (। ॥) कई भारतीय लिपियों का साझा विराम है, इसलिए देवनागरी की गिनती में नहीं। */
var BLOCKS = {
  Deva: [[0x0900, 0x0963], [0x0966, 0x097F]], Beng: [[0x0980, 0x09FF]], Guru: [[0x0A00, 0x0A7F]], Gujr: [[0x0A80, 0x0AFF]],
  Orya: [[0x0B00, 0x0B7F]], Taml: [[0x0B80, 0x0BFF]], Telu: [[0x0C00, 0x0C7F]], Knda: [[0x0C80, 0x0CFF]], Mlym: [[0x0D00, 0x0D7F]],
  Arab: [[0x0600, 0x06FF], [0x0750, 0x077F], [0xFB50, 0xFDFF], [0xFE70, 0xFEFF]], Hans: [[0x3400, 0x4DBF], [0x4E00, 0x9FFF]],
  Cyrl: [[0x0400, 0x04FF]], Jpan: [[0x3040, 0x30FF], [0x3400, 0x4DBF], [0x4E00, 0x9FFF]], Latn: [[0x41, 0x5A], [0x61, 0x7A], [0xC0, 0x24F], [0x1E00, 0x1EFF]]
};
function inBlock(cp, name) { var b = BLOCKS[name], i; for (i = 0; i < b.length; i++) if (cp >= b[i][0] && cp <= b[i][1]) return true; return false; }
function scriptOf(cp) { for (var k in BLOCKS) if (inBlock(cp, k)) return k; return null; }
/* scriptFail(कोड, पाठ, छूट): पाठ में कोई दोष हो तो उसका कारण (string), वरना null।
   नियम: (1) लंबी रेखा (—) वर्जित। (2) पराई लिपि का एक भी अक्षर नहीं (Latin की बात अलग, नीचे)।
   (3) जिस भाषा की लिपि Latin नहीं है, उसमें Latin अक्षर सिर्फ़ गोल कोष्ठक ( ) के भीतर, या छूट-सूची के शब्द (ब्रांड-नाम)।
   (4) पाठ में अक्षर हों तो कम से कम एक अक्षर अपनी लिपि का हो। */
function scriptFail(code, text, allow) {
  var own = L[code].script, s = String(text), i, cp, sc, hasOwn = false, hasLetter = false;
  if (s.indexOf("\u2014") >= 0) return "लंबी रेखा (—)";
  var t = s; (allow || []).forEach(function (a) { t = t.split(a).join(" "); });
  var outside = own === "Latn" ? t : t.replace(/\([^()]*\)/g, " ").replace(/（[^（）]*）/g, " ");
  for (i = 0; i < t.length; i++) {
    cp = t.codePointAt(i); if (cp > 0xFFFF) i++;
    if (inBlock(cp, own)) { hasOwn = true; hasLetter = true; continue; }   /* पहले अपनी लिपि: जापानी और चीनी के कई अक्षर साझा हैं */
    sc = scriptOf(cp); if (!sc) continue; hasLetter = true;
    if (sc !== "Latn") return "पराई लिपि (" + sc + "): " + String.fromCodePoint(cp);
  }
  if (own !== "Latn" && /[A-Za-z\u00C0-\u024F]/.test(outside)) return "Latin अक्षर कोष्ठक के बाहर: " + (outside.match(/[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F\-]*/) || [""])[0];
  if (hasLetter && !hasOwn && own !== "Latn" && !/^[\s\d\W]*(\([^()]*\))?[\s\d\W]*$/.test(t)) return "अपनी लिपि (" + own + ") का एक भी अक्षर नहीं";
  return null;
}
/* रजिस्टर से मिलान (fail-closed): हर कोड रजिस्टर में हो और लिपि वही हो। zh की लिपि रजिस्टर में Hans/Hani दोनों मान्य। */
(function () {
  var f = path.join(__dirname, "data", "bhasha_register.json"); if (!fs.existsSync(f)) throw new Error("lib_apt_langs: bhasha_register.json नहीं मिला");
  var R = JSON.parse(fs.readFileSync(f, "utf8")).langs, bad = [];
  if (ORDER.length !== 30) bad.push("सूची 30 की नहीं: " + ORDER.length);
  ORDER.forEach(function (c, i) { if (ORDER.indexOf(c) !== i) bad.push(c + ": ORDER में दो बार"); });
  ORDER.forEach(function (c) {
    if (!L[c]) { bad.push(c + ": ब्योरा नहीं"); return; }
    if (c === "hi") return;
    if (!R[c]) { bad.push(c + ": रजिस्टर में कोड नहीं"); return; }
    var rl = String(R[c].lipi || ""); if (rl.indexOf(L[c].script) < 0 && !(c === "zh" && /Han/.test(rl))) bad.push(c + ": लिपि यहाँ " + L[c].script + ", रजिस्टर में " + rl);
  });
  LIVE.concat(NOTICE).forEach(function (c) { if (ORDER.indexOf(c) < 0) bad.push(c + ": LIVE/NOTICE में है पर ORDER में नहीं"); });
  if (bad.length) throw new Error("lib_apt_langs: " + bad.join(" · "));
})();
/* तारीख़ का रूप, ASCII अंकों के साथ (इंजन और झलक इसी को toLocaleDateString में देते हैं) */
function dateLocaleOf(code) { return L[code].dateLocale + "-u-nu-latn"; }
/* परीक्षा-पन्ने का पता */
function pageUrl(code) { return "https://acslearn.com/" + (code === "hi" ? "" : code + "/") + "aptitude-test.html"; }
/* hreflang की पंक्तियाँ: LIVE की हर भाषा + x-default (हिंदी मूल)। सब पन्नों पर हूबहू यही (आपसी कड़ी)। */
function hreflangLines() {
  return LIVE.map(function (c) { return '<link rel="alternate" hreflang="' + c + '" href="' + pageUrl(c) + '">'; })
    .concat(['<link rel="alternate" hreflang="x-default" href="' + pageUrl("hi") + '">']);
}
module.exports = { ORDER: ORDER, LIVE: LIVE, NOTICE: NOTICE, L: L, scriptFail: scriptFail, scriptOf: scriptOf, pageUrl: pageUrl, hreflangLines: hreflangLines, dateLocaleOf: dateLocaleOf };
