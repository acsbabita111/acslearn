/* vyakaran_war.js — "मेरा पहला वारे व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "war",
  "hi": "वारे",
  "en": "वारे",
  "tts": "war",
  "asr": "war",
  "cover": {
   "native_title": "An akon siyahan nga gramatika",
   "book_words": [
    "ako",
    "kamo"
   ]
  },
  "slug": "waray",
  "glottocode": "wara1300"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "वारे कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। ng = ङ।",
    "पूर्वी विसाया (लेयते, समार) की भाषा — टागालोग और सेबुआनो की पड़ोसी।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली वारे पोथी\" में है।",
   "abhyas": [
    [
     "\"ng\" की आवाज़?",
     "ङ"
    ],
    [
     "लिखावट?",
     "जैसा बोला वैसा"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ako"
    },
    {
     "code": "s0005",
     "hl": "kamo"
    },
    {
     "code": "s0022",
     "hl": "Alayon"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "ako = मैं, ikaw / ka = तुम, kamo / niyo = आप सब, hiya = वह (दोनों), kita = हम (समेत),",
    "kami = हम (बिना), hira = वे।",
    "akon = मेरा।"
   ],
   "yaad": "ako · ikaw · hiya · kita · kami",
   "abhyas": [
    [
     "\"मैं\"?",
     "ako"
    ],
    [
     "\"akon\"?",
     "मेरा"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ako"
    },
    {
     "code": "s0037",
     "hl": "akon"
    },
    {
     "code": "s0002",
     "hl": "niyo"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = an (मुख्य), han (बाक़ी): an balay = वह घर।",
    "अनेक: mga पहले: mga balay = घर (अनेक)।"
   ],
   "yaad": "an = the · mga = अनेक",
   "abhyas": [
    [
     "\"mga\"?",
     "अनेक"
    ],
    [
     "\"an\"?",
     "the"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "An"
    },
    {
     "code": "s0002",
     "hl": "an"
    },
    {
     "code": "s0070",
     "hl": "han"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → चीज़: Nainom ako hin tubig = मैं पानी पीता हूँ (शब्दशः: पीता मैं पानी)।",
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
    "may = है (मौजूद), waray = नहीं है।",
    "क्रिया के आगे-भीतर निशान: nagtatrabaho ako = मैं काम कर रहा हूँ।"
   ],
   "yaad": "may · waray",
   "abhyas": [
    [
     "\"may\"?",
     "है (मौजूद)"
    ],
    [
     "\"waray\"?",
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
     "code": "s0041",
     "hl": "Kinahanglan"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: nag- + क्रिया: nagtrabaho ako = मैंने काम किया।",
    "antes = पहले।"
   ],
   "yaad": "nag- = बीता",
   "abhyas": [
    [
     "\"antes\"?",
     "पहले"
    ],
    [
     "\"nag-\"?",
     "बीता"
    ]
   ],
   "ex": [
    {
     "code": "s0560",
     "hl": "antes"
    },
    {
     "code": "s0020",
     "hl": "liwat"
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
    "आने वाली बात: ma- / mag- + क्रिया: matawag ako = मैं फ़ोन करूँगा।",
    "buwas = कल; yana = अभी।"
   ],
   "yaad": "ma- = आगे",
   "abhyas": [
    [
     "\"yana\"?",
     "अभी"
    ],
    [
     "\"ma-\"?",
     "आगे"
    ]
   ],
   "ex": [
    {
     "code": "s0183",
     "hl": "yana"
    },
    {
     "code": "s0036",
     "hl": "Mahimo"
    },
    {
     "code": "s0184",
     "hl": "yana"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = diri (क्रिया से पहले), ayaw = मत, waray = नहीं है।"
   ],
   "yaad": "diri · ayaw · waray",
   "abhyas": [
    [
     "\"ayaw\"?",
     "मत"
    ],
    [
     "\"diri\"?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Diri"
    },
    {
     "code": "s0026",
     "hl": "Diri"
    },
    {
     "code": "s0299",
     "hl": "ayaw"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "ano (क्या), hain (कहाँ), san-o (कब), pira (कितना), paonan-o (कैसे)।",
    "हाँ/ना सवाल: अंत में ba।"
   ],
   "yaad": "… ba? · ano · hain · pira",
   "abhyas": [
    [
     "\"hain\"?",
     "कहाँ"
    ],
    [
     "\"pira\"?",
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
     "hl": "Hain"
    },
    {
     "code": "s0017",
     "hl": "Pira"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ha balay = घर में, tikang ha = से, para = के लिए, upod = साथ।"
   ],
   "yaad": "ha · tikang · para · upod",
   "abhyas": [
    [
     "\"para\"?",
     "के लिए"
    ],
    [
     "\"ha\"?",
     "में / को"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "ha"
    },
    {
     "code": "s0037",
     "hl": "ha"
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
    "usa, duha, tulo = एक, दो, तीन।"
   ],
   "yaad": "विशेषण + nga + संज्ञा",
   "abhyas": [
    [
     "\"duha\"?",
     "दो"
    ],
    [
     "\"maupay\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "usa"
    },
    {
     "code": "s0103",
     "hl": "Duha"
    },
    {
     "code": "s0011",
     "hl": "Maupay"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों के लिए Sir / po।",
    "alayon = कृपया, salamat = धन्यवाद, pasayloa = माफ़ कीजिए।"
   ],
   "yaad": "alayon · salamat",
   "abhyas": [
    [
     "\"alayon\"?",
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
     "hl": "Alayon"
    },
    {
     "code": "s0023",
     "hl": "Alayon"
    },
    {
     "code": "s0220",
     "hl": "Sir"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID wara1300, 29-Oct-2026 को उतारा",
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
    "gb": "GB044",
    "claim": "1",
    "grambank": "1",
    "text": "अनेक के लिए संज्ञा पर चिह्न लगता है"
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
