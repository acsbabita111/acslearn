/* vyakaran_de.js — "मेरा पहला व्याकरण" (ACS-VK1-de) · परत-3 · v1.0 · 29-Oct-2026 · स्तर-क
   जर्मन Grambank में नहीं है — हर दावा WALS (World Atlas of Language Structures) के मान से मशीन-मिलान। 🟡 मूल-वक्ता की जाँच बाक़ी। */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "de",
  "hi": "जर्मन",
  "en": "German",
  "tts": "de-DE",
  "asr": "de-DE",
  "cover": {
   "native_title": "Meine erste Grammatik",
   "book_words": [
    "ich",
    "wir"
   ]
  },
  "slug": "german",
  "glottocode": "stan1295"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "जर्मन के अक्षर कैसे पढ़ें?",
   "rule": [
    "जर्मन रोमन लिपि में बाएँ से दाएँ लिखी जाती है: 26 अक्षर और Ä, Ö, Ü, ß।",
    "कुछ जोड़ी-अक्षर एक आवाज़ देते हैं: sch = श, ch = ख़, ei = आइ, ie = ई।",
    "हर संज्ञा बड़े अक्षर से शुरू होती है: Haus, Arbeit।",
    "स्वर से पहले S = ज़, और Z = त्स।"
   ],
   "alpha": [
    [
     "Ä",
     "ए"
    ],
    [
     "Ö",
     "ओ (गोल होंठ)"
    ],
    [
     "Ü",
     "ऊ (गोल होंठ)"
    ],
    [
     "ß",
     "स"
    ],
    [
     "sch",
     "श"
    ],
    [
     "ch",
     "ख़"
    ],
    [
     "ei",
     "आइ"
    ],
    [
     "ie",
     "ई"
    ]
   ],
   "yaad": "पूरी वर्णमाला और आवाज़ \"मेरी पहली जर्मन पोथी\" में है।",
   "abhyas": [
    [
     "\"sch\" की आवाज़?",
     "श"
    ],
    [
     "\"ei\" की आवाज़?",
     "आइ"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "heiße"
    },
    {
     "code": "s0003",
     "hl": "komme"
    },
    {
     "code": "s0011",
     "hl": "geht"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "\"मैं, तुम, आप, वह, हम\" कैसे कहें?",
   "rule": [
    "मैं = ich (इश) · तू = du (दू) · आप (आदर) = Sie (ज़ी) · हम = wir (वीर)।",
    "वह (लड़का) = er (एर) · वह (लड़की) = sie (ज़ी) · वह (चीज़) = es (एस)।",
    "लिंग का भेद सिर्फ़ \"वह\" (एक व्यक्ति/चीज़) में है; \"हम\" का एक ही रूप है।"
   ],
   "yaad": "er = वह लड़का · sie = वह लड़की · es = वह चीज़ · Sie = आप।",
   "abhyas": [
    [
     "\"हम\" जर्मन में?",
     "wir"
    ],
    [
     "आदर से \"आप\" जर्मन में?",
     "Sie"
    ]
   ],
   "ex": [
    {
     "code": "s0006",
     "hl": "Ich"
    },
    {
     "code": "s0388",
     "hl": "Er"
    },
    {
     "code": "s0160",
     "hl": "Wir"
    },
    {
     "code": "s0438",
     "hl": "dich"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा: der, die, das और ein",
   "q": "\"the\" और \"a\" जर्मन में कैसे?",
   "rule": [
    "जर्मन में संज्ञा के तीन लिंग हैं: der (पुल्लिंग), die (स्त्रीलिंग), das (नपुंसक)।",
    "\"the\" = der/die/das: die Toilette, das Krankenhaus।",
    "\"a/an\" = ein/eine — यही शब्द \"एक\" भी है।",
    "अनेक बनाने के लिए अक्सर अंत में कुछ जुड़ता है: Tag → Tage।"
   ],
   "yaad": "der · die · das = the · ein/eine = a / एक।",
   "abhyas": [
    [
     "\"अस्पताल\" (Krankenhaus) के साथ कौन-सा the?",
     "das"
    ],
    [
     "Tag (दिन) का अनेक?",
     "Tage"
    ]
   ],
   "ex": [
    {
     "code": "s0047",
     "hl": "die"
    },
    {
     "code": "s0052",
     "hl": "das"
    },
    {
     "code": "s0089",
     "hl": "ein"
    },
    {
     "code": "s0311",
     "hl": "Tage"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "जर्मन में क्रिया कहाँ आती है?",
   "rule": [
    "सामान्य वाक्य में क्रिया हमेशा दूसरे स्थान पर आती है।",
    "Ich komme aus Bihar · Heute komme ich spät — दोनों में komme दूसरे स्थान पर।",
    "इसलिए वाक्य का क्रम पूरी तरह तय नहीं, पर क्रिया की जगह तय है।"
   ],
   "yaad": "पहला कोई भी शब्द → दूसरे स्थान पर क्रिया।",
   "abhyas": [
    [
     "\"Heute komme ich spät\" में क्रिया किस स्थान पर?",
     "दूसरे"
    ],
    [
     "\"Heute ist Montag\" में क्रिया?",
     "ist"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "komme"
    },
    {
     "code": "s0277",
     "hl": "komme"
    },
    {
     "code": "s0184",
     "hl": "ist"
    }
   ]
  },
  {
   "n": 5,
   "t": "वर्तमान काल",
   "q": "\"मैं आता हूँ, हम बुलाते हैं\" कैसे कहें?",
   "rule": [
    "क्रिया का अंत बताता है कि कौन: ich -e (komme), du -st (kommst), er/sie -t (kommt), wir -en (kommen)।",
    "यही रूप रोज़ की बात और अभी हो रही बात, दोनों के लिए है।"
   ],
   "yaad": "ich komme · du kommst · er kommt · wir kommen।",
   "abhyas": [
    [
     "\"मैं आता हूँ\" जर्मन में?",
     "Ich komme"
    ],
    [
     "wir के साथ क्रिया का अंत?",
     "-en"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "komme"
    },
    {
     "code": "s0438",
     "hl": "rufen"
    },
    {
     "code": "s0057",
     "hl": "Geht"
    }
   ]
  },
  {
   "n": 6,
   "t": "भूतकाल",
   "q": "\"मैंने काम किया\" — बीती बात कैसे कहें?",
   "rule": [
    "बोलचाल में बीती बात के लिए habe + क्रिया का ge- वाला रूप: Ich habe gearbeitet = मैंने काम किया।",
    "habe दूसरे स्थान पर, और ge- वाला रूप वाक्य के आख़िर में आता है।"
   ],
   "yaad": "habe … ge-___ = मैंने … किया।",
   "abhyas": [
    [
     "\"मैंने काम किया\" जर्मन में?",
     "Ich habe gearbeitet"
    ],
    [
     "ge- वाला रूप वाक्य में कहाँ आता है?",
     "आख़िर में"
    ]
   ],
   "ex": [
    {
     "code": "s0311",
     "hl": "gearbeitet"
    },
    {
     "code": "s0312",
     "hl": "gemacht"
    },
    {
     "code": "s0286",
     "hl": "gemacht"
    }
   ]
  },
  {
   "n": 7,
   "t": "भविष्य काल",
   "q": "\"मैं करूँगा\" — आगे की बात कैसे कहें?",
   "rule": [
    "भविष्य के लिए क्रिया का कोई अलग अंत नहीं होता।",
    "werde + क्रिया: Ich werde dir helfen = मैं आपकी मदद करूँगा।",
    "अक्सर सिर्फ़ समय-शब्द से भी काम चलता है: Heute komme ich spät = मैं आज देर से आऊँगा।"
   ],
   "yaad": "werde + क्रिया · या आज/कल + सामान्य रूप।",
   "abhyas": [
    [
     "\"मैं कर दूँगा\" जर्मन में?",
     "Ich werde es tun"
    ],
    [
     "भविष्य के लिए कौन-सा सहायक शब्द?",
     "werde"
    ]
   ],
   "ex": [
    {
     "code": "s0257",
     "hl": "werde"
    },
    {
     "code": "s0284",
     "hl": "werde"
    },
    {
     "code": "s0277",
     "hl": "Heute"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "\"मैं नहीं जानता\" — मना करना कैसे कहें?",
   "rule": [
    "\"नहीं\" एक अलग शब्द है: nicht (निश्ट) — Ich weiß nicht = मुझे नहीं पता।",
    "संज्ञा से पहले \"कोई नहीं\" के लिए kein: Ich habe kein Geld = मेरे पास पैसे नहीं हैं।"
   ],
   "yaad": "nicht = नहीं · kein = कोई … नहीं।",
   "abhyas": [
    [
     "\"मुझे समझ नहीं आया\" जर्मन में?",
     "Ich verstehe nicht"
    ],
    [
     "\"मेरे पास पैसे नहीं हैं\"?",
     "Ich habe kein Geld"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "nicht"
    },
    {
     "code": "s0039",
     "hl": "nicht"
    },
    {
     "code": "s0086",
     "hl": "kein"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "\"क्या? कहाँ?\" — सवाल कैसे बनाएँ?",
   "rule": [
    "प्रश्न-शब्द वाक्य की शुरुआत में आता है: Was (क्या), Wo (कहाँ), Wann (कब), Wer (कौन)।",
    "हाँ या ना वाले प्रश्न में कोई प्रश्न-शब्द नहीं लगता — क्रिया सबसे आगे आ जाती है: Ist das gut?"
   ],
   "yaad": "प्रश्न-शब्द सबसे आगे · हाँ-ना प्रश्न में क्रिया सबसे आगे।",
   "abhyas": [
    [
     "\"कहाँ\" जर्मन में?",
     "Wo"
    ],
    [
     "\"क्या यह अच्छा है?\"",
     "Ist das gut?"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Was"
    },
    {
     "code": "s0047",
     "hl": "Wo"
    },
    {
     "code": "s0113",
     "hl": "Ist"
    },
    {
     "code": "s0057",
     "hl": "Geht"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "\"से, को, में\" — शब्द से पहले या बाद?",
   "rule": [
    "जर्मन में संबंध-शब्द शब्द से पहले आते हैं — हिंदी से उल्टा।",
    "aus = से: aus Indien = भारत से · nach = की ओर: nach Hause = घर को · in = में।"
   ],
   "yaad": "हिंदी: भारत से · जर्मन: aus Indien (\"से भारत\")।",
   "abhyas": [
    [
     "\"भारत से\" जर्मन में?",
     "aus Indien"
    ],
    [
     "संबंध-शब्द पहले आता है या बाद में?",
     "पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0004",
     "hl": "aus"
    },
    {
     "code": "s0088",
     "hl": "nach"
    },
    {
     "code": "s0100",
     "hl": "in"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "\"छोटा खेत, दस नए शब्द\" — कैसे कहें?",
   "rule": [
    "विशेषण संज्ञा से पहले आता है — हिंदी जैसा: ein kleines Feld = एक छोटा खेत।",
    "विशेषण का अंत संज्ञा के हिसाब से बदलता है: kleine Schwester, kleines Feld।",
    "गिनती भी पहले आती है: zehn Tage = दस दिन।"
   ],
   "yaad": "हिंदी जैसा क्रम — विशेषण और गिनती पहले।",
   "abhyas": [
    [
     "विशेषण संज्ञा से पहले आता है या बाद में?",
     "पहले"
    ],
    [
     "\"दस दिन\" जर्मन में?",
     "zehn Tage"
    ]
   ],
   "ex": [
    {
     "code": "s0524",
     "hl": "kleines"
    },
    {
     "code": "s0506",
     "hl": "kleine"
    },
    {
     "code": "s0562",
     "hl": "neue"
    },
    {
     "code": "s0311",
     "hl": "zehn"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और आज्ञा",
   "q": "\"कृपया रुकिए\" — विनम्र बात कैसे कहें?",
   "rule": [
    "कृपया = bitte (बित्ते)।",
    "आदर से आज्ञा: क्रिया + Sie + bitte: Warten Sie bitte = कृपया रुकिए।",
    "दोस्त से आज्ञा का छोटा रूप: Zeig mir das bitte = मुझे दिखाओ।"
   ],
   "yaad": "bitte = कृपया · क्रिया + Sie = आदर वाली आज्ञा।",
   "abhyas": [
    [
     "\"कृपया\" जर्मन में?",
     "bitte"
    ],
    [
     "\"कृपया धीरे बोलिए\"?",
     "Bitte sprich langsam"
    ]
   ],
   "ex": [
    {
     "code": "s0682",
     "hl": "Warten"
    },
    {
     "code": "s0684",
     "hl": "Rufen"
    },
    {
     "code": "s0022",
     "hl": "Bitte"
    },
    {
     "code": "s0037",
     "hl": "Zeig"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID ger (German), 29-Oct-2026 को उतारा; जर्मन Grambank में नहीं है",
  "claims": [
   {
    "path": 2,
    "gb": "WALS-44A",
    "claim": "3rd person singular only",
    "grambank": "3rd person singular only",
    "text": "सर्वनाम में लिंग-भेद सिर्फ़ तीसरे पुरुष एकवचन में"
   },
   {
    "path": 2,
    "gb": "WALS-39A",
    "claim": "No inclusive/exclusive",
    "grambank": "No inclusive/exclusive",
    "text": "\"हम\" के दो रूप नहीं"
   },
   {
    "path": 3,
    "gb": "WALS-30A",
    "claim": "Three",
    "grambank": "Three",
    "text": "संज्ञा के तीन लिंग"
   },
   {
    "path": 3,
    "gb": "WALS-37A",
    "claim": "Definite word distinct from demonstrative",
    "grambank": "Definite word distinct from demonstrative",
    "text": "the के लिए अलग शब्द"
   },
   {
    "path": 3,
    "gb": "WALS-38A",
    "claim": "Indefinite word same as 'one'",
    "grambank": "Indefinite word same as 'one'",
    "text": "a/an = \"एक\" वाला शब्द"
   },
   {
    "path": 3,
    "gb": "WALS-33A",
    "claim": "Plural suffix",
    "grambank": "Plural suffix",
    "text": "अनेक के लिए अंत में चिह्न"
   },
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "No dominant order",
    "grambank": "No dominant order",
    "text": "वाक्य-क्रम पूरी तरह तय नहीं"
   },
   {
    "path": 7,
    "gb": "WALS-67A",
    "claim": "No inflectional future",
    "grambank": "No inflectional future",
    "text": "भविष्य का क्रिया-अंत नहीं"
   },
   {
    "path": 8,
    "gb": "WALS-112A",
    "claim": "Negative particle",
    "grambank": "Negative particle",
    "text": "\"नहीं\" अलग शब्द"
   },
   {
    "path": 9,
    "gb": "WALS-93A",
    "claim": "Initial interrogative phrase",
    "grambank": "Initial interrogative phrase",
    "text": "प्रश्न-शब्द सबसे आगे"
   },
   {
    "path": 9,
    "gb": "WALS-92A",
    "claim": "No question particle",
    "grambank": "No question particle",
    "text": "हाँ-ना प्रश्न का अलग शब्द नहीं"
   },
   {
    "path": 10,
    "gb": "WALS-85A",
    "claim": "Prepositions",
    "grambank": "Prepositions",
    "text": "संबंध-शब्द पहले"
   },
   {
    "path": 11,
    "gb": "WALS-87A",
    "claim": "Adjective-Noun",
    "grambank": "Adjective-Noun",
    "text": "विशेषण संज्ञा से पहले"
   },
   {
    "path": 11,
    "gb": "WALS-89A",
    "claim": "Numeral-Noun",
    "grambank": "Numeral-Noun",
    "text": "गिनती संज्ञा से पहले"
   },
   {
    "path": 12,
    "gb": "WALS-70A",
    "claim": "Second singular",
    "grambank": "Second singular",
    "text": "आज्ञा का अपना रूप"
   }
  ]
 }
};
