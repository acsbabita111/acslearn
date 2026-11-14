/* ============================================================
   generator/lib_apt_langs.js : v1.6 (14-Nov-2026; v1.5 14-Nov-2026; v1.4 14-Nov-2026; v1.3 14-Nov-2026; v1.2 13-Nov-2026; v1.1 12-Nov-2026) · परत-3
   v1.6 (खेप 5-ग, संस्करण 1.1; ChatGPT के ऑडिट के बाद): नियम 5 मज़बूत हुआ। (1) हिंदी के शब्दों की सूची 73 से 206 हुई
     (जैसे मिलान, कटाई, नालीदार, सदस्यता, किसान, पानी, चाहिए, सकता)। (2) नई सूची style: वे शब्द जो हिंदी जैसे दिखते हैं और जिनका साफ़ मराठी
     शब्द मौजूद है (जीत, जुगाड, सुनसान, रोक)। (3) नई सूची roots: शब्द-मूल, जो शब्द की शुरुआत में आए तो पकड़ा जाए (खिलाडू)।
     तीनों सूचियाँ पूरे मराठी पाठ (भंडार, उद्यम-नाम, झलक, बटन-संदेश) पर परखी गईं: झूठी पकड़ शून्य।
   v1.5 (खेप 5-ग): (1) मराठी (mr) LIVE सूची में जुड़ी। (2) scriptFail का नया नियम 5: देवनागरी में लिखी जाने वाली दूसरी भाषा (मराठी) के पाठ में
     हिंदी का शब्द या चिह्न मिले तो दोष। कारण: मराठी की लिपि भी देवनागरी है, इसलिए नियम 2 (पराई लिपि) हिंदी को पकड़ ही नहीं सकता।
     सूची HINDI_MARKS में है (एक चीज़ = एक जगह); repo का यंत्र build_apt_lang.js और server-पैकेज का भंडार-यंत्र, दोनों इसी scriptFail से गुज़रते हैं।
   v1.4 (खेप 5-ख): कन्नड़ (kn) LIVE सूची में जुड़ी। बस यही एक पंक्ति बदली।
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
var LIVE = ["hi", "en", "bn", "kn", "mr"];
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
   (4) पाठ में अक्षर हों तो कम से कम एक अक्षर अपनी लिपि का हो।
   (5) देवनागरी में लिखी जाने वाली दूसरी भाषा (हिंदी को छोड़कर) में हिंदी का शब्द या चिह्न नहीं (नीचे HINDI_MARKS)। */
/* HINDI_MARKS: हर देवनागरी भाषा की अपनी "हिंदी-पहचान" सूची।
   chars = वे चिह्न जो उस भाषा में लिखे ही नहीं जाते (मराठी: नुक़्ता, नुक़्ते वाले अक्षर, खड़ी पाई)।
   words = वे शब्द जो हिंदी में रोज़ आते हैं पर उस भाषा में होते ही नहीं। शब्द पूरा अकेला आए तभी गिना जाता है:
     उसके ठीक पहले या बाद देवनागरी अक्षर या "-" हो तो नहीं (इसलिए "को-वर्किंग", "के-पॉप", "बहुतेक" दोष नहीं हैं)।
   जो शब्द दोनों भाषाओं में हैं (जैसे का, की, या, ही, तो, जो, कर, होता, दुकान, सामान, बंद) वे जान-बूझकर सूची में नहीं हैं।
   style = वे शब्द जो मराठी में भी कहीं-कहीं लिखे-बोले जाते हैं (शब्दकोश में भी हैं), पर हिंदी जैसे दिखते हैं और जिनका साफ़ मराठी शब्द मौजूद है
     (जीत → विजय, जुगाड → युक्ती / शक्कल, सुनसान → ओस / सामसूम, रोक → अडवणे / रोखून ठेवणे)। ACS की शैली: इन्हें नहीं लिखते।
   roots = शब्द-मूल; शब्द की शुरुआत में आए तो पकड़ा जाता है, आगे कुछ भी जुड़ा हो (खिलाडू → खेळाडू; "खिलाडूवृत्ती" की जगह "खेळाडूवृत्ती")।
     style और roots के दोष का संदेश अलग है ("हिंदी जैसा शब्द"), ताकि यंत्र यह न कहे कि शब्द मराठी में है ही नहीं।
   यह जाँच हिंदी का हर वाक्य नहीं पकड़ सकती (जिस वाक्य में सूची का कोई शब्द न हो, वह निकल जाएगा); यह मोटी भूल रोकती है।
   fail-closed: किसी देवनागरी भाषा (जैसे आगे नेपाली) की सूची यहाँ न हो, तो उसका हर पाठ दोष गिना जाता है, ताकि वह बिना सूची के बन ही न सके। */
var HINDI_MARKS = {
  mr: { chars: /[\u093C\u0958-\u095F\u0964\u0965]/,
        words: ["है", "हैं", "था", "थी", "थे", "हूँ", "और", "में", "से", "को", "के", "नहीं", "क्या", "कौन", "यह", "वह", "इस", "उस", "इसे", "उसे", "लिए", "तुम", "तुम्हें",
                "आपका", "आपके", "आपकी", "आपको", "भी", "कुछ", "बहुत", "कोई", "किसी", "होगा", "होगी", "गया", "गई", "वाला", "वाली", "वाले", "सबसे", "पहले", "अच्छा", "पसंद",
                "शुरू", "करें", "करना", "अपना", "अपनी", "अपने", "जब", "तब", "अब", "यहाँ", "वहाँ", "कहाँ", "कैसे", "कैसा", "क्यों", "लेकिन", "क्योंकि", "ताकि", "मैं", "मुझे",
                "हम", "हमारा", "हमारी", "हमारे", "कीजिए", "दीजिए", "दबाइए", "चुनिए", "रुकिए", "खोलिए",
                /* v1.6 में जुड़े 133 शब्द */
                "रहा", "रही", "रहे", "चाहिए", "सकता", "सकती", "सकते", "हुआ", "हुई", "हुए", "किया", "लिया", "देखो", "बताओ", "सीखो", "चुनो", "करके", "लेकर", "देकर", "बनाकर",
                "जाकर", "रखना", "बनाना", "चलाना", "समझना", "सीखना", "देखना", "बेचना", "खरीदना", "लगाना", "सिखाना", "करवाना", "सोचना", "जानना", "होंगे", "करेंगे", "करोगे", "चुनोगे", "मदद", "पानी",
                "लोग", "लोगों", "खेत", "किसान", "फसल", "बिजली", "मिट्टी", "पत्थर", "मछली", "मुर्गी", "चावल", "नमक", "बीमारी", "कहानी", "तस्वीर", "खरीद", "बिक्री", "मुनाफा", "जरूरत", "तरीका",
                "सुबह", "सब्जी", "गेहूं", "आदमी", "औरत", "धंधा", "हुनर", "टोली", "अस्पताल", "बीमा", "पूंजी", "मरम्मत", "जांच", "गांव", "खेल", "दाल", "कटाई", "बुनाई", "सिलाई", "बुआई",
                "सिंचाई", "जुताई", "ढुलाई", "पिसाई", "पुताई", "लदाई", "गहराई", "लंबाई", "ऊंचाई", "सुनवाई", "मिलान", "नालीदार", "सदस्यता", "तोलमोल", "नया", "नई", "नए", "पुराना", "पुरानी", "सस्ता",
                "महंगा", "आसान", "मुश्किल", "गंदा", "ठंडा", "मीठा", "गलत", "दोनों", "तीनों", "सभी", "ऊपर", "नीचे", "बाहर", "पीछे", "आगे", "सिर्फ", "केवल", "फिर", "अभी", "कभी",
                "हमेशा", "शायद", "बिल्कुल", "ज्यादा",
                "पूरा", "पूरे", "पूरी", "अनजान", "दोबारा", "हिसाब", "जाँच", "जाँचें", "जाँचो"],
        style: ["जीत", "जुगाड", "सुनसान", "रोक"],
        roots: ["खिलाडू"] }
};
function hindiMark(code, t) {
  if (L[code].script !== "Deva" || code === "hi") return null;
  var M = HINDI_MARKS[code]; if (!M) return "देवनागरी भाषा \"" + code + "\" की हिंदी-पहचान सूची (HINDI_MARKS) नहीं है";
  var m = t.match(M.chars); if (m) return "हिंदी का चिह्न (U+" + ("0000" + m[0].charCodeAt(0).toString(16).toUpperCase()).slice(-4) + "), जो इस भाषा में नहीं लिखा जाता";
  if (!M.re) {
    M.re = new RegExp("(^|[^\\u0900-\\u097F-])(" + M.words.join("|") + ")(?![\\u0900-\\u097F-])");
    M.reStyle = M.style && M.style.length ? new RegExp("(^|[^\\u0900-\\u097F-])(" + M.style.join("|") + ")(?![\\u0900-\\u097F-])") : null;
    M.reRoot = M.roots && M.roots.length ? new RegExp("(^|[^\\u0900-\\u097F-])((?:" + M.roots.join("|") + ")[\\u0900-\\u097F]*)") : null;
  }
  m = t.match(M.re); if (m) return "हिंदी का शब्द: " + m[2];
  m = M.reStyle && t.match(M.reStyle); if (m) return "हिंदी जैसा शब्द (इसकी जगह साफ़ मराठी शब्द लिखें): " + m[2];
  m = M.reRoot && t.match(M.reRoot); if (m) return "हिंदी जैसा शब्द (इसकी जगह साफ़ मराठी शब्द लिखें): " + m[2];
  return null;
}
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
  return hindiMark(code, t);
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
module.exports = { ORDER: ORDER, LIVE: LIVE, NOTICE: NOTICE, L: L, scriptFail: scriptFail, hindiMark: hindiMark, HINDI_MARKS: HINDI_MARKS, scriptOf: scriptOf, pageUrl: pageUrl, hreflangLines: hreflangLines, dateLocaleOf: dateLocaleOf };
