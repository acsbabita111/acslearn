/* pranali.js v1.0 · 22-Nov-2026 : लिपि-पन्नों पर लेखन-प्रणाली का सही नाम (परत-3, एकमात्र घर)
   कारण (ChatGPT ऑडिट LP1-03): चीनी चिह्न, जापानी काना और शब्दांश-लिपियाँ (चेरोकी, क्री, इनुक्तितुत) वर्णमाला (alphabet) नहीं हैं,
   फिर भी इनके पन्नों के शीर्षक "वर्णमाला / Alphabet" कहते थे। चीनी पन्ना ख़ुद लिखता है: "चीनी में वर्णमाला नहीं होती"।
   नियम:
   1) वर्णमाला, अबुगिडा (देवनागरी-परिवार, थाई, गीज़ आदि), अबजद (अरबी, हिब्रू) और हंगुल पर "वर्णमाला / Alphabet" ही रहता है।
      हिंदी अपनी लिपि को भी वर्णमाला कहती है, और अंग्रेज़ी में "Arabic alphabet", "Korean alphabet" मानक नाम हैं।
   2) बदलाव सिर्फ़ वहाँ जहाँ यह नाम शैक्षणिक रूप से ग़लत है: चित्र-लिपि (चीनी) और शब्दांश-लिपि (काना, चेरोकी, क्री, इनुक्तितुत)।
   3) इसी फ़ाइल को lib_seo_meta.js (title/description), build_lipi_pages.js (h1, schema, खंड-शीर्षक) और dev_lipi_check.js पढ़ते हैं।
   नई लिपि जोड़नी हो जो वर्णमाला नहीं: BY_SCRIPT में एक पंक्ति। */
"use strict";
const KINDS = {
  "": { hi: "वर्णमाला", en: e => e + " Alphabet", ant: "अक्षर, आवाज़ और लिखाई", sab: "पूरी वर्णमाला", dekh: "आपने पूरी वर्णमाला देख ली।", srot: "वर्णमाला-स्रोत" },
  han: { hi: "लिपि", en: () => "Chinese Characters", fixedEn: true, ant: "मूल चिह्न, आवाज़ और लिखाई", sab: "इस पन्ने के सारे अक्षर", dekh: "आपने इस पन्ने के सारे अक्षर देख लिए।", srot: "लिपि-स्रोत" },
  kana: { hi: "काना", en: e => e + " Kana", ant: "अक्षर, आवाज़ और लिखाई", sab: "सारे काना", dekh: "आपने सारे काना देख लिए।", srot: "लिपि-स्रोत" },
  syllabary: { hi: "लिपि", en: e => e + " Syllabary", ant: "अक्षर, आवाज़ और लिखाई", sab: "पूरी लिपि", dekh: "आपने पूरी लिपि देख ली।", srot: "लिपि-स्रोत" },
  syllabics: { hi: "लिपि", en: e => e + " Syllabics", ant: "अक्षर, आवाज़ और लिखाई", sab: "पूरी लिपि", dekh: "आपने पूरी लिपि देख ली।", srot: "लिपि-स्रोत" }
};
/* base-फ़ाइल का script → प्रणाली (जो यहाँ नहीं, वह वर्णमाला/अबुगिडा/अबजद) */
const BY_SCRIPT = { han: "han", kana: "kana", cherokee: "syllabary", crksyl: "syllabics", ikusyl: "syllabics" };
const kindOf = script => BY_SCRIPT[script] || "";
const of = script => KINDS[kindOf(script)];
module.exports = { KINDS, BY_SCRIPT, kindOf, of };
