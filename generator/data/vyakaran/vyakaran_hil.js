/* vyakaran_hil.js — "मेरा पहला हिलिगाय्नोन व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "hil",
  "hi": "हिलिगाय्नोन",
  "en": "Hiligaynon",
  "tts": "hil",
  "asr": "hil",
  "cover": {
   "native_title": "Akon una nga gramatika",
   "book_words": [
    "ako",
    "kamo"
   ]
  },
  "slug": "hiligaynon",
  "glottocode": "hili1240"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "हिलिगाय्नोन कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। ng = ङ।",
    "फ़िलीपींस (इलोइलो, बाकोलोद) की भाषा — टागालोग की पड़ोसी।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली हिलिगाय्नोन पोथी\" में है।",
   "abhyas": [
    [
     "\"ng\" की आवाज़?",
     "ङ"
    ],
    [
     "कहाँ की भाषा?",
     "फ़िलीपींस"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ako"
    },
    {
     "code": "s0001",
     "hl": "Ang"
    },
    {
     "code": "s0026",
     "hl": "Indi"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "ako = मैं, ikaw / ka = तुम, kamo / ninyo = आप सब, siya = वह (दोनों), kita = हम (समेत),",
    "kami = हम (बिना), sila = वे।",
    "akon = मेरा।"
   ],
   "yaad": "ako · ikaw · siya · kita · kami",
   "abhyas": [
    [
     "\"मैं\"?",
     "ako"
    ],
    [
     "सुनने वाले समेत \"हम\"?",
     "kita"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ako"
    },
    {
     "code": "s0004",
     "hl": "ako"
    },
    {
     "code": "s0037",
     "hl": "akon"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = ang (मुख्य), sang (बाक़ी): ang balay = वह घर।",
    "अनेक: mga पहले: mga balay = घर (अनेक)।"
   ],
   "yaad": "ang = the · mga = अनेक",
   "abhyas": [
    [
     "\"mga\"?",
     "अनेक"
    ],
    [
     "\"ang\"?",
     "the"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Ang"
    },
    {
     "code": "s0002",
     "hl": "ang"
    },
    {
     "code": "s0085",
     "hl": "mga"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → चीज़: Nagainom ako sang tubig = मैं पानी पीता हूँ (शब्दशः: पीता-हूँ मैं पानी)।",
    "हिंदी और अंग्रेज़ी दोनों से अलग क्रम।"
   ],
   "yaad": "क्रिया → करने वाला → चीज़",
   "abhyas": [
    [
     "क्रिया कहाँ?",
     "सबसे पहले"
    ],
    [
     "करने वाला कहाँ?",
     "क्रिया के बाद"
    ]
   ],
   "ex": [
    {
     "code": "s0041",
     "hl": "Kinahanglan"
    },
    {
     "code": "s0036",
     "hl": "Mahimo"
    },
    {
     "code": "s0048",
     "hl": "May"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया के आगे-भीतर निशान: nagatrabaho ako = मैं काम कर रहा हूँ।",
    "may = है (मौजूद), wala = नहीं है।"
   ],
   "yaad": "naga- + क्रिया · may",
   "abhyas": [
    [
     "\"may\"?",
     "है (मौजूद)"
    ],
    [
     "\"wala\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0048",
     "hl": "May"
    },
    {
     "code": "s0049",
     "hl": "May"
    },
    {
     "code": "s0021",
     "hl": "Wala"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: nag- + क्रिया: nagtrabaho ako = मैंने काम किया।"
   ],
   "yaad": "nag- = बीता",
   "abhyas": [
    [
     "\"nag-\"?",
     "बीता"
    ],
    [
     "\"antes\"?",
     "पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0560",
     "hl": "antes"
    },
    {
     "code": "s0183",
     "hl": "subong"
    },
    {
     "code": "s0601",
     "hl": "antes"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: ma- + क्रिया: matawag ako = मैं फ़ोन करूँगा।",
    "buwas = कल।"
   ],
   "yaad": "ma- = आगे",
   "abhyas": [
    [
     "\"buwas\"?",
     "कल"
    ],
    [
     "\"ma-\"?",
     "आगे का निशान"
    ]
   ],
   "ex": [
    {
     "code": "s0036",
     "hl": "Mahimo"
    },
    {
     "code": "s0183",
     "hl": "subong"
    },
    {
     "code": "s0075",
     "hl": "Mahimo"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = indi (क्रिया से पहले): indi ko kabalo = मुझे नहीं पता।",
    "wala = नहीं है।"
   ],
   "yaad": "indi · wala",
   "abhyas": [
    [
     "\"indi\"?",
     "नहीं"
    ],
    [
     "\"wala\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0026",
     "hl": "Indi"
    },
    {
     "code": "s0111",
     "hl": "Indi"
    },
    {
     "code": "s0021",
     "hl": "Wala"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "ano (क्या), diin (कहाँ), san-o (कब), pila (कितना), paano (कैसे)।",
    "हाँ/ना सवाल: अंत में bala।"
   ],
   "yaad": "… bala? · ano · diin · pila",
   "abhyas": [
    [
     "\"diin\"?",
     "कहाँ"
    ],
    [
     "\"pila\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Ano"
    },
    {
     "code": "s0047",
     "hl": "Diin"
    },
    {
     "code": "s0017",
     "hl": "Pila"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: sa balay = घर में, halin sa = से, para = के लिए, upod sa = साथ।"
   ],
   "yaad": "sa · halin · para · upod",
   "abhyas": [
    [
     "\"para\"?",
     "के लिए"
    ],
    [
     "\"sa\"?",
     "में / को"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "sa"
    },
    {
     "code": "s0037",
     "hl": "sa"
    },
    {
     "code": "s0268",
     "hl": "para"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण और संज्ञा के बीच nga: dako nga balay = बड़ा घर।",
    "isa, duha, tatlo = एक, दो, तीन।"
   ],
   "yaad": "विशेषण + nga + संज्ञा",
   "abhyas": [
    [
     "\"dako nga balay\"?",
     "बड़ा घर"
    ],
    [
     "\"duha\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "isa"
    },
    {
     "code": "s0103",
     "hl": "Duha"
    },
    {
     "code": "s0011",
     "hl": "Maayo"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों के लिए po / Sir।",
    "palihog = कृपया, salamat = धन्यवाद, pasensya = माफ़ कीजिए।"
   ],
   "yaad": "palihog · salamat · Sir",
   "abhyas": [
    [
     "\"palihog\"?",
     "कृपया"
    ],
    [
     "\"salamat\"?",
     "धन्यवाद"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Palihog"
    },
    {
     "code": "s0023",
     "hl": "Palihog"
    },
    {
     "code": "s0220",
     "hl": "Sir"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID hili1240, 29-Oct-2026 को उतारा",
  "claims": [
   {
    "path": 2,
    "gb": "GB030",
    "claim": "0",
    "grambank": "0",
    "text": "\"वह\" में लड़का-लड़की का भेद नहीं"
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
    "gb": "GB044",
    "claim": "0",
    "grambank": "0",
    "text": "अनेक के लिए संज्ञा पर ज़रूरी चिह्न नहीं"
   },
   {
    "path": 4,
    "gb": "GB131",
    "claim": "1",
    "grambank": "1",
    "text": "क्रिया वाक्य की शुरुआत में"
   },
   {
    "path": 8,
    "gb": "GB107",
    "claim": "0",
    "grambank": "0",
    "text": "\"नहीं\" क्रिया के भीतर नहीं, अलग शब्द"
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
