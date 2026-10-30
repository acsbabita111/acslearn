/* vyakaran_so.js — "मेरा पहला सोमाली व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "so",
  "hi": "सोमाली",
  "en": "Somali",
  "tts": "so-SO",
  "asr": "so-SO",
  "cover": {
   "native_title": "Naxwahayga ugu horreeya",
   "book_words": [
    "aniga",
    "adiga"
   ]
  },
  "slug": "somali",
  "glottocode": "soma1255"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "सोमाली कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। c = ऐन (गले से अ), x = गले का भारी ह, q = क़, dh = ढ।",
    "दो बार लिखा स्वर = लंबा: aa = आ।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली सोमाली पोथी\" में है।",
   "abhyas": [
    [
     "\"x\" की आवाज़?",
     "गले का भारी ह"
    ],
    [
     "\"aa\"?",
     "लंबा आ"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "waa"
    },
    {
     "code": "s0016",
     "hl": "Ma"
    },
    {
     "code": "s0003",
     "hl": "Waxaan"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "aniga = मैं, adiga = तुम, isaga = वह (पुरुष), iyada = वह (स्त्री)।",
    "annaga = हम (सुनने वाले के बिना), innaga = हम (समेत), iyaga = वे।"
   ],
   "yaad": "aniga · adiga · isaga · iyada",
   "abhyas": [
    [
     "\"मैं\"?",
     "aniga"
    ],
    [
     "सुनने वाले समेत \"हम\"?",
     "innaga"
    ]
   ],
   "ex": [
    {
     "code": "s0773",
     "hl": "adiga"
    },
    {
     "code": "s0236",
     "hl": "isaga"
    },
    {
     "code": "s1016",
     "hl": "adiga"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the कहाँ लगता है?",
   "rule": [
    "the शब्द के अंत में: guri (घर) → guriga (वह घर)।",
    "दो लिंग: पुल्लिंग में -ka, स्त्रीलिंग में -ta।"
   ],
   "yaad": "the = अंत में -ka / -ta",
   "abhyas": [
    [
     "\"guriga\" में the?",
     "अंत में -ga"
    ],
    [
     "कितने लिंग?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "waa"
    },
    {
     "code": "s0279",
     "hl": "kan"
    },
    {
     "code": "s0106",
     "hl": "tan"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "हिंदी जैसा! करने वाला → चीज़ → क्रिया: Aniga biyo ayaan rabaa = मैं पानी चाहता हूँ।",
    "क्रिया वाक्य के अंत में आती है।"
   ],
   "yaad": "करने वाला → चीज़ → क्रिया (हिंदी जैसा)",
   "abhyas": [
    [
     "क्रिया कहाँ?",
     "आख़िर में"
    ],
    [
     "क्रम हिंदी जैसा?",
     "हाँ"
    ]
   ],
   "ex": [
    {
     "code": "s1171",
     "hl": "rabaa"
    },
    {
     "code": "s0059",
     "hl": "doonayaa"
    },
    {
     "code": "s0505",
     "hl": "shaqeeyaa"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया का अंत: waan shaqeeyaa = मैं काम करता हूँ। waa = (वाक्य का निशान) है।"
   ],
   "yaad": "waa + क्रिया",
   "abhyas": [
    [
     "\"waa\"?",
     "है (निशान)"
    ],
    [
     "\"waan shaqeeyaa\"?",
     "मैं काम करता हूँ"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "waa"
    },
    {
     "code": "s0009",
     "hl": "Waan"
    },
    {
     "code": "s0003",
     "hl": "Waxaan"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अंत में -ay / -nay: waan shaqeeyay = मैंने काम किया।"
   ],
   "yaad": "-ay = बीता",
   "abhyas": [
    [
     "\"shaqeeyay\"?",
     "काम किया"
    ],
    [
     "बीती बात का अंत?",
     "-ay"
    ]
   ],
   "ex": [
    {
     "code": "s0311",
     "hl": "shaqeeyay"
    },
    {
     "code": "s0003",
     "hl": "imid"
    },
    {
     "code": "s0503",
     "hl": "ahaa"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "doonaa + क्रिया: waan iman doonaa = मैं आऊँगा।",
    "berri = कल (आने वाला)।"
   ],
   "yaad": "… doonaa",
   "abhyas": [
    [
     "\"berri\"?",
     "कल (आने वाला)"
    ],
    [
     "आने वाली बात का शब्द?",
     "doonaa"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "doonaa"
    },
    {
     "code": "s0020",
     "hl": "Berri"
    },
    {
     "code": "s0132",
     "hl": "doonaa"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\": ma + क्रिया (अंत भी बदलता है): ma fahmin = समझ नहीं आया।",
    "maya = नहीं (उत्तर)।"
   ],
   "yaad": "ma + क्रिया · maya",
   "abhyas": [
    [
     "\"maya\"?",
     "नहीं"
    ],
    [
     "\"ma\" कहाँ?",
     "क्रिया से पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0016",
     "hl": "Ma"
    },
    {
     "code": "s0026",
     "hl": "Maya"
    },
    {
     "code": "s0237",
     "hl": "maaha"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "सवाल: ma? शुरू में: Ma fahantay? = क्या समझे?",
    "maxay (क्या), xagee (कहाँ), goorma (कब), imisa (कितना), sidee (कैसे)।"
   ],
   "yaad": "ma … ? · maxay · xagee · imisa",
   "abhyas": [
    [
     "\"imisa\"?",
     "कितना"
    ],
    [
     "\"xagee\"?",
     "कहाँ"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "maxay"
    },
    {
     "code": "s0005",
     "hl": "Xagee"
    },
    {
     "code": "s0017",
     "hl": "Imisa"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "हिंदी की तरह शब्द के बाद या क्रिया से पहले छोटे शब्द: ku = में/पर, ka = से, u = को/के लिए,",
    "la = साथ।"
   ],
   "yaad": "ku · ka · u · la",
   "abhyas": [
    [
     "\"ka\"?",
     "से"
    ],
    [
     "\"la\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0009",
     "hl": "ku"
    },
    {
     "code": "s0003",
     "hl": "ka"
    },
    {
     "code": "s0143",
     "hl": "la"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: guri weyn = बड़ा घर।",
    "kow, laba, saddex = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"guri weyn\"?",
     "बड़ा घर"
    ],
    [
     "\"laba\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0579",
     "hl": "fiican"
    },
    {
     "code": "s0505",
     "hl": "weyn"
    },
    {
     "code": "s0103",
     "hl": "Laba"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "आदर: adeer (चाचा/सर), eedo (चाची/मैडम)।",
    "fadlan = कृपया, mahadsanid = धन्यवाद, iga raali noqo = माफ़ कीजिए।"
   ],
   "yaad": "fadlan · mahadsanid",
   "abhyas": [
    [
     "\"fadlan\"?",
     "कृपया"
    ],
    [
     "\"mahadsanid\"?",
     "धन्यवाद"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Fadlan"
    },
    {
     "code": "s0011",
     "hl": "mahadsanid"
    },
    {
     "code": "s0030",
     "hl": "Fadlan"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID soma1255, 29-Oct-2026 को उतारा",
  "claims": [
   {
    "path": 2,
    "gb": "GB030",
    "claim": "1",
    "grambank": "1",
    "text": "\"वह\" में लड़का-लड़की का भेद है"
   },
   {
    "path": 2,
    "gb": "GB028",
    "claim": "1",
    "grambank": "1",
    "text": "\"हम\" के दो रूप (सुनने वाले समेत / बिना)"
   },
   {
    "path": 3,
    "gb": "GB020",
    "claim": "1",
    "grambank": "1",
    "text": "\"the\" जैसा निश्चित शब्द है"
   },
   {
    "path": 3,
    "gb": "GB051",
    "claim": "1",
    "grambank": "1",
    "text": "संज्ञा का लिंग होता है"
   },
   {
    "path": 3,
    "gb": "GB044",
    "claim": "1",
    "grambank": "1",
    "text": "अनेक के लिए संज्ञा पर चिह्न लगता है"
   },
   {
    "path": 4,
    "gb": "GB133",
    "claim": "1",
    "grambank": "1",
    "text": "क्रिया वाक्य के अंत में"
   },
   {
    "path": 5,
    "gb": "GB082",
    "claim": "1",
    "grambank": "1",
    "text": "अभी के समय का चिह्न क्रिया पर लगता है"
   },
   {
    "path": 6,
    "gb": "GB083",
    "claim": "1",
    "grambank": "1",
    "text": "बीते समय का चिह्न क्रिया पर लगता है"
   },
   {
    "path": 7,
    "gb": "GB084",
    "claim": "0",
    "grambank": "0",
    "text": "आने वाले समय का चिह्न क्रिया पर नहीं लगता"
   },
   {
    "path": 8,
    "gb": "GB107",
    "claim": "1",
    "grambank": "1",
    "text": "\"नहीं\" क्रिया के भीतर (प्रत्यय) भी लग सकता है"
   },
   {
    "path": 9,
    "gb": "GB262",
    "claim": "1",
    "grambank": "1",
    "text": "हाँ/ना सवाल का शब्द वाक्य की शुरुआत में"
   },
   {
    "path": 10,
    "gb": "GB075",
    "claim": "1",
    "grambank": "1",
    "text": "संबंध-शब्द संज्ञा के बाद (postposition)"
   }
  ]
 }
};
