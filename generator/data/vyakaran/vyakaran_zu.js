/* vyakaran_zu.js — "मेरा पहला ज़ुलू व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "zu",
  "hi": "ज़ुलू",
  "en": "Zulu",
  "tts": "zu-ZA",
  "asr": "zu-ZA",
  "cover": {
   "native_title": "Uhlelo lwami lokuqala",
   "book_words": [
    "mina",
    "wena"
   ]
  },
  "slug": "zulu",
  "glottocode": "zulu1248"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "ज़ुलू कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। c, q, x = तीन क्लिक-आवाज़ें; hl = ह्ल।",
    "संज्ञाएँ आगे के हिस्से (उपसर्ग) से पहचानी जाती हैं: um-, aba-, i-, izi-।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली ज़ुलू पोथी\" में है।",
   "abhyas": [
    [
     "\"q\" कैसी आवाज़?",
     "क्लिक (तालु से)"
    ],
    [
     "\"hl\"?",
     "ह्ल"
    ]
   ],
   "ex": [
    {
     "code": "s0195",
     "hl": "Ngiya"
    },
    {
     "code": "s0056",
     "hl": "Yini"
    },
    {
     "code": "s0032",
     "hl": "na"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "mina = मैं, wena = तुम, yena = वह (दोनों), thina = हम, nina = आप सब, bona = वे।",
    "क्रिया में छोटा रूप: ngi- = मैं, u- = तुम।"
   ],
   "yaad": "mina · wena · yena · thina",
   "abhyas": [
    [
     "\"मैं\"?",
     "mina / ngi-"
    ],
    [
     "\"वह\" में लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0715",
     "hl": "Mina"
    },
    {
     "code": "s0935",
     "hl": "Wena"
    },
    {
     "code": "s1164",
     "hl": "yena"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "संज्ञा-वर्ग (लिंग नहीं)?",
   "rule": [
    "लड़का-लड़की वाला लिंग नहीं — संज्ञाएँ वर्गों में बँटी हैं, आगे के उपसर्ग से: umuntu (आदमी) → abantu (लोग)।",
    "the या a नहीं।"
   ],
   "yaad": "वर्ग = उपसर्ग · the नहीं",
   "abhyas": [
    [
     "\"abantu\"?",
     "लोग"
    ],
    [
     "the जैसा शब्द?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "lokhu"
    },
    {
     "code": "s0078",
     "hl": "Le"
    },
    {
     "code": "s0510",
     "hl": "abantu"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "किस क्रम में?",
   "rule": [
    "आम क्रम: करने वाला → क्रिया → चीज़ — क्रिया बीच में।"
   ],
   "yaad": "करने वाला → क्रिया → बाक़ी बात",
   "abhyas": [
    [
     "क्रिया आख़िर में?",
     "नहीं"
    ],
    [
     "क्रम?",
     "करने वाला → क्रिया → चीज़"
    ]
   ],
   "ex": [
    {
     "code": "s0059",
     "hl": "Ngifuna"
    },
    {
     "code": "s0041",
     "hl": "Ngidinga"
    },
    {
     "code": "s0603",
     "hl": "ngisebenza"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया के आगे करने वाले का उपसर्ग: ngiyasebenza = मैं काम करता हूँ।"
   ],
   "yaad": "ngi- + क्रिया",
   "abhyas": [
    [
     "\"ngi-\"?",
     "मैं"
    ],
    [
     "\"ngiyasebenza\"?",
     "मैं काम करता हूँ"
    ]
   ],
   "ex": [
    {
     "code": "s0195",
     "hl": "Ngiya"
    },
    {
     "code": "s0603",
     "hl": "ngisebenza"
    },
    {
     "code": "s0197",
     "hl": "Ngiya"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अंत में -ile / -e: ngisebenzile = मैंने काम किया।"
   ],
   "yaad": "-ile = बीता",
   "abhyas": [
    [
     "बीती बात का अंत?",
     "-ile"
    ],
    [
     "\"sesifikile\"?",
     "हम पहुँच गए"
    ]
   ],
   "ex": [
    {
     "code": "s0968",
     "hl": "usuqedile"
    },
    {
     "code": "s0155",
     "hl": "sesifikile"
    },
    {
     "code": "s0312",
     "hl": "Ngenzile"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: -zo- / -yo-: ngizoshaya ucingo = मैं फ़ोन करूँगा।",
    "kusasa = कल (आने वाला)।"
   ],
   "yaad": "ngizo- + क्रिया",
   "abhyas": [
    [
     "\"kusasa\"?",
     "कल"
    ],
    [
     "\"ngizo-\"?",
     "मैं करूँगा"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "kusasa"
    },
    {
     "code": "s0185",
     "hl": "Kusasa"
    },
    {
     "code": "s0217",
     "hl": "kusasa"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\": क्रिया के आगे a- और अंत में -i: angiqondi = मैं नहीं समझता।",
    "cha = नहीं।"
   ],
   "yaad": "a- … -i · cha",
   "abhyas": [
    [
     "\"cha\"?",
     "नहीं"
    ],
    [
     "\"angiqondi\"?",
     "नहीं समझता"
    ]
   ],
   "ex": [
    {
     "code": "s0026",
     "hl": "Cha"
    },
    {
     "code": "s0040",
     "hl": "Akukho"
    },
    {
     "code": "s0459",
     "hl": "Cha"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "ini / yini (क्या), kuphi (कहाँ), nini (कब), malini (कितने पैसे), kanjani (कैसे)।",
    "हाँ/ना सवाल: आवाज़ से, या अंत में na।"
   ],
   "yaad": "yini · kuphi · malini · kanjani",
   "abhyas": [
    [
     "\"kuphi\"?",
     "कहाँ"
    ],
    [
     "\"malini\"?",
     "कितने पैसे"
    ]
   ],
   "ex": [
    {
     "code": "s0056",
     "hl": "Yini"
    },
    {
     "code": "s0005",
     "hl": "kuphi"
    },
    {
     "code": "s0101",
     "hl": "malini"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध: शब्द के आगे e- … -ini: endlini = घर में; ku- = को, nga- = से/के बारे में, na- = साथ।"
   ],
   "yaad": "e-…-ini = में · na- = साथ",
   "abhyas": [
    [
     "\"endlini\"?",
     "घर में"
    ],
    [
     "\"na-\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0032",
     "hl": "na"
    },
    {
     "code": "s0036",
     "hl": "na"
    },
    {
     "code": "s0042",
     "hl": "na"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद, जोड़-शब्द के साथ: indlu enkulu = बड़ा घर।",
    "kunye, kubili, kuthathu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"indlu enkulu\"?",
     "बड़ा घर"
    ],
    [
     "\"kubili\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0048",
     "hl": "kahle"
    },
    {
     "code": "s0660",
     "hl": "enkulu"
    },
    {
     "code": "s0231",
     "hl": "kahle"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों को: baba (पिता/सर), mama (माँ/मैडम) कहकर।",
    "ngicela = कृपया, ngiyabonga = धन्यवाद, uxolo = माफ़ कीजिए।"
   ],
   "yaad": "ngicela · ngiyabonga · uxolo",
   "abhyas": [
    [
     "\"ngiyabonga\"?",
     "धन्यवाद"
    ],
    [
     "\"uxolo\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "ngiyabonga"
    },
    {
     "code": "s0022",
     "hl": "Ngicela"
    },
    {
     "code": "s0685",
     "hl": "Uxolo"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID zulu1248, 29-Oct-2026 को उतारा",
  "claims": [
   {
    "path": 2,
    "gb": "GB028",
    "claim": "0",
    "grambank": "0",
    "text": "\"हम\" का एक ही रूप"
   },
   {
    "path": 3,
    "gb": "GB020",
    "claim": "0",
    "grambank": "0",
    "text": "\"the\" जैसा उपपद नहीं"
   },
   {
    "path": 3,
    "gb": "GB051",
    "claim": "0",
    "grambank": "0",
    "text": "संज्ञा का लिंग नहीं"
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
    "gb": "GB132",
    "claim": "1",
    "grambank": "1",
    "text": "क्रिया बीच में (करने वाला → क्रिया → चीज़)"
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
    "claim": "1",
    "grambank": "1",
    "text": "आने वाले समय का चिह्न क्रिया पर लगता है"
   },
   {
    "path": 8,
    "gb": "GB107",
    "claim": "1",
    "grambank": "1",
    "text": "\"नहीं\" क्रिया के भीतर (प्रत्यय) भी लग सकता है"
   }
  ]
 }
};
