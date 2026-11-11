/* ============================================================
   generator/data/aptitude/en/ending_glossary.js — अंत-शब्दावली (एकमात्र घर) · v1.1 (11-Nov-2026)
   पैमाना-प्रश्नों का हिंदी अंत (आख़िरी "—" के बाद का टुकड़ा) → English का तय अंत।
   नियम (Founder + ChatGPT, 11-Nov): एक हिंदी अंत = एक English — 18,943 प्रश्नों में और आगे की सब भाषाओं में
   एक-सा पुल। चरण-1: बेमेल = चेतावनी। चरण-2 (शब्दावली frozen होने पर): --strict-endings से FAIL।
   छूट: प्रविष्टि में eor: "कारण" — जहाँ शब्दशः अंत अटपटा English देता हो (मशीनी भाषा से बचाव)।
   परत-1 (map): छोटे अकेले अंत का पूरा तय English।
   परत-2 (verbs, v1.1): नाप (11-Nov) — 18,276 पैमाना-प्रश्नों में 13,090 अलग अंत (12,202 एक-बार वाले), पर आख़िरी क्रियाएँ
     सिर्फ़ 497; सबसे आम 40 = 91.5% प्रश्न। इसलिए: आख़िरी क्रिया → मूल-शब्द (regex) जो English के अंतिम टुकड़े
     (आख़िरी ":" के बाद) में हो। वाक्य-बनावट आज़ाद, मूल भाव एक। सहायक क्रियाएँ (करोगे/होगा/दोगे/लोगे/है) बाहर —
     उनका अर्थ साथ के शब्द से बनता है।
   जो अंत दोनों परतों में नहीं = मुक्त अंत: जाँच नहीं, सिर्फ़ गिनती।
   ============================================================ */
module.exports = {
  version: "1.1",
  status: "draft",          // draft → frozen (frozen होने पर strict चलाना अनिवार्य)
  map: {
    "कैसा लगता है?": ["how does that feel?"],
    "सोचकर कैसा लगता है?": ["how does it feel to think about it?"],
    "कैसा लगेगा?": ["how would that feel?"],
    "कैसा रहेगा?": ["how would that be?"],
    "भाएगा?": ["would you enjoy it?"],
    "यह काम भाएगा?": ["would you enjoy this work?"],
    "रुचेगा?": ["would you like it?"],
    "जमेगा?": ["would it suit you?"],
    "जँचेगा?": ["does it appeal to you?"],
    "तुम्हें जँचेगा?": ["does it appeal to you?"],
    "मज़ा आएगा?": ["would it be fun?"],
    "अच्छा लगेगा?": ["would that feel good?"],
    "मन करेगा?": ["would you want to?"],
    "मन लगेगा?": ["would you enjoy doing it?"],
    "कर पाओगे?": ["could you do it?"],
    "करोगे?": ["would you do it?"],
    "सोचोगे?": ["would you think about it?"],
    "हिम्मत है?": ["would you be willing to take it on?"],
    "धीरज रहेगा?": ["would you have the patience?"],
    "यह हुनर सीखोगे?": ["would you learn this skill?"],
    "सोच जमती है?": ["does the idea appeal to you?"],
    "सोच भाती है?": ["does the idea appeal to you?"],
    "करने का मन है?": ["do you want to do it?"]
  },
  // परत-2: आख़िरी क्रिया (एक या दो शब्द) → English के अंतिम टुकड़े में अनिवार्य मूल-शब्द
  verbs: {
    "भाएगा|भाएगी|भाएँगे": "enjoy",
    "रुचेगा|रुचेगी|रुचेंगे": "like",
    "जँचेगा|जँचेगी": "appeal",
    "जमेगा|जमेगी": "suit",
    "समझोगे": "understand",
    "सोचोगे": "think",
    "अच्छा लगेगा": "feel good",
    "सहोगे|झेलोगे": "bear|endure|put up with",
    "मानोगे": "accept|agree",
    "चाहोगे": "want",
    "सुहाएगा|सुहाएगी": "please|pleasant",
    "निभाओगे|निभेगा|निभेगी": "keep",
    "पढ़ोगे": "read",
    "सधेगा|सधेगी|सधेंगी|सधेंगे|साधोगे": "master|manage",
    "सँभालोगे": "handle|manage|look after",
    "ललचाएगा|ललचाएगी": "tempt",
    "रास आएगा|रास आएगी": "agree with you",
    "गिनोगे": "count",
    "रमेगा|रमोगे": "absorbed",
    "बेचोगे": "sell",
    "चलाओगे": "run|operate|drive",
    "मन लगेगा": "enjoy doing",
    "मन करेगा": "want to",
    "चलेगा|चलेगी": "work for you",
    "बनोगे": "become",
    "पकड़ोगे": "catch|take hold",
    "सीखोगे": "learn",
    "मज़ा आएगा": "fun",
    "कर पाओगे": "could you"
  }
};
