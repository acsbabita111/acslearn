/* vyakaran_nl.js — "मेरा पहला डच व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "nl",
  "hi": "डच",
  "en": "Dutch",
  "tts": "nl-NL",
  "asr": "nl-NL",
  "cover": {
   "native_title": "Mijn eerste grammatica",
   "book_words": [
    "ik",
    "u"
   ]
  },
  "slug": "dutch",
  "glottocode": "dutc1256"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "डच कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में। g और ch = ख़ (गले से), w = व, v = फ़ जैसा।",
    "ij / ei = एइ, ui = आउ, oe = ऊ: goed = ख़ूत।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली डच पोथी\" में है।",
   "abhyas": [
    [
     "\"g\" की आवाज़?",
     "ख़"
    ],
    [
     "\"oe\"?",
     "ऊ"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Ik"
    },
    {
     "code": "s0021",
     "hl": "niet"
    },
    {
     "code": "s0001",
     "hl": "is"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "ik = मैं, jij = तुम, u = आप, hij = वह (पुरुष), zij = वह (स्त्री), wij = हम, zij = वे।"
   ],
   "yaad": "ik · jij · u · hij · zij",
   "abhyas": [
    [
     "\"मैं\"?",
     "ik"
    ],
    [
     "आदर से \"आप\"?",
     "u"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Ik"
    },
    {
     "code": "s1232",
     "hl": "u"
    },
    {
     "code": "s0388",
     "hl": "Hij"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और a?",
   "rule": [
    "the के दो रूप: de (ज़्यादातर) और het (कुछ शब्द): de man, het huis।",
    "a = een। अनेक के लिए -en / -s: boeken = किताबें।"
   ],
   "yaad": "de / het = the · een = एक",
   "abhyas": [
    [
     "\"het huis\" में het?",
     "the"
    ],
    [
     "\"een\"?",
     "एक"
    ]
   ],
   "ex": [
    {
     "code": "s0055",
     "hl": "de"
    },
    {
     "code": "s0010",
     "hl": "het"
    },
    {
     "code": "s0014",
     "hl": "een"
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
     "code": "s0041",
     "hl": "nodig"
    },
    {
     "code": "s0059",
     "hl": "wil"
    },
    {
     "code": "s0201",
     "hl": "zoek"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया का अंत: ik werk (मैं काम करता हूँ), hij werkt (वह करता है)।",
    "ben = हूँ, is = है।"
   ],
   "yaad": "ik … · hij … -t",
   "abhyas": [
    [
     "\"ben\"?",
     "हूँ"
    ],
    [
     "\"werkt\" — कौन?",
     "वह"
    ]
   ],
   "ex": [
    {
     "code": "s0006",
     "hl": "ben"
    },
    {
     "code": "s0197",
     "hl": "werk"
    },
    {
     "code": "s0041",
     "hl": "heb"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "heb / ben + क्रिया का रूप: ik heb gewerkt = मैंने काम किया; was = था।"
   ],
   "yaad": "heb + ge…t",
   "abhyas": [
    [
     "\"was\"?",
     "था"
    ],
    [
     "\"ik heb gewerkt\"?",
     "मैंने काम किया"
    ]
   ],
   "ex": [
    {
     "code": "s0289",
     "hl": "was"
    },
    {
     "code": "s0041",
     "hl": "heb"
    },
    {
     "code": "s0409",
     "hl": "gedaan"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "ga + क्रिया या zal: ik ga bellen = मैं फ़ोन करूँगा।",
    "morgen = कल (आने वाला)।"
   ],
   "yaad": "ga / zal + क्रिया",
   "abhyas": [
    [
     "\"morgen\"?",
     "कल"
    ],
    [
     "\"ik ga bellen\"?",
     "फ़ोन करूँगा"
    ]
   ],
   "ex": [
    {
     "code": "s0066",
     "hl": "Ga"
    },
    {
     "code": "s0257",
     "hl": "zal"
    },
    {
     "code": "s0020",
     "hl": "morgen"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "niet = नहीं — अक्सर क्रिया के बाद: ik begrijp het niet = मैं नहीं समझता।",
    "geen = कोई नहीं (संज्ञा से पहले)।"
   ],
   "yaad": "niet · geen",
   "abhyas": [
    [
     "\"geen\"?",
     "कोई नहीं"
    ],
    [
     "\"niet\"?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "niet"
    },
    {
     "code": "s0040",
     "hl": "Geen"
    },
    {
     "code": "s0026",
     "hl": "Nee"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "हाँ/ना सवाल: क्रिया पहले: Begrijpt u het? = क्या आप समझे?",
    "wat (क्या), waar (कहाँ), wanneer (कब), hoeveel (कितना), hoe (कैसे)।"
   ],
   "yaad": "क्रिया पहले · wat · waar · hoeveel",
   "abhyas": [
    [
     "\"waar\"?",
     "कहाँ"
    ],
    [
     "\"hoeveel\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Wat"
    },
    {
     "code": "s0005",
     "hl": "Waar"
    },
    {
     "code": "s0076",
     "hl": "Hoeveel"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: in huis = घर में, van = से/का, naar = की ओर, voor = के लिए, met = साथ।"
   ],
   "yaad": "in · van · naar · voor · met",
   "abhyas": [
    [
     "\"voor\"?",
     "के लिए"
    ],
    [
     "\"met\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0117",
     "hl": "in"
    },
    {
     "code": "s0347",
     "hl": "van"
    },
    {
     "code": "s0088",
     "hl": "naar"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा से पहले: een groot huis = एक बड़ा घर।",
    "een, twee, drie = एक, दो, तीन।"
   ],
   "yaad": "विशेषण → संज्ञा",
   "abhyas": [
    [
     "\"twee\"?",
     "दो"
    ],
    [
     "विशेषण कहाँ?",
     "संज्ञा से पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "Goed"
    },
    {
     "code": "s0816",
     "hl": "groot"
    },
    {
     "code": "s0109",
     "hl": "twee"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "u = आप (आदर)।",
    "alstublieft = कृपया, dank u = धन्यवाद, sorry / pardon = माफ़ कीजिए।"
   ],
   "yaad": "u · alstublieft · dank u",
   "abhyas": [
    [
     "\"dank u\"?",
     "धन्यवाद"
    ],
    [
     "आदर से \"आप\"?",
     "u"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "dank"
    },
    {
     "code": "s1251",
     "hl": "alstublieft"
    },
    {
     "code": "s0029",
     "hl": "Sorry"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID dutc1256, 29-Oct-2026 को उतारा",
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
    "claim": "0",
    "grambank": "0",
    "text": "\"हम\" का एक ही रूप"
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
    "claim": "0",
    "grambank": "0",
    "text": "आने वाले समय का चिह्न क्रिया पर नहीं लगता"
   },
   {
    "path": 8,
    "gb": "GB107",
    "claim": "0",
    "grambank": "0",
    "text": "\"नहीं\" क्रिया के भीतर नहीं, अलग शब्द"
   },
   {
    "path": 10,
    "gb": "GB074",
    "claim": "1",
    "grambank": "1",
    "text": "संबंध-शब्द संज्ञा से पहले (preposition)"
   },
   {
    "path": 11,
    "gb": "GB057",
    "claim": "0",
    "grambank": "0",
    "text": "गिनती के साथ वर्ग-शब्द नहीं"
   }
  ]
 }
};
