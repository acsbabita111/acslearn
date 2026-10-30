/* vyakaran_pam.js — "मेरा पहला कपम्पांगान व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "pam",
  "hi": "कपम्पांगान",
  "en": "कपम्पांगान",
  "tts": "pam",
  "asr": "pam",
  "cover": {
   "native_title": "Ing kanaku mumuna a gramatika",
   "book_words": [
    "aku",
    "yu"
   ]
  },
  "slug": "kapampangan",
  "glottocode": "pamp1243"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "कपम्पांगान कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। ng = ङ।",
    "मध्य लूज़ोन (पम्पांगा) की भाषा — टागालोग और सेबुआनो की पड़ोसी।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली कपम्पांगान पोथी\" में है।",
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
     "code": "s0635",
     "hl": "Aku"
    },
    {
     "code": "s0002",
     "hl": "yu"
    },
    {
     "code": "s0022",
     "hl": "Pakisabi"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "aku / ku = मैं, ika / ka = तुम, ikayu / yu = आप सब, iya / ya = वह (दोनों),",
    "ikata / ta = हम (समेत), ikami = हम (बिना), ila = वे।",
    "kanaku = मेरा।"
   ],
   "yaad": "aku · ika · iya · ikata · ikami",
   "abhyas": [
    [
     "\"मैं\"?",
     "aku / ku"
    ],
    [
     "\"kanaku\"?",
     "मेरा"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "ku"
    },
    {
     "code": "s0002",
     "hl": "yu"
    },
    {
     "code": "s0005",
     "hl": "kayu"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = ing (मुख्य), ning (बाक़ी): ing bale = वह घर।",
    "अनेक: ding / reng: ding bale = घर (अनेक)।"
   ],
   "yaad": "ing = the · ding = अनेक",
   "abhyas": [
    [
     "\"ing\"?",
     "the"
    ],
    [
     "\"ding\"?",
     "the (अनेक)"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Ing"
    },
    {
     "code": "s0002",
     "hl": "ing"
    },
    {
     "code": "s0041",
     "hl": "ning"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → चीज़: Uminum ku danum = मैं पानी पीता हूँ (शब्दशः: पीता मैं पानी)।",
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
     "hl": "Kailangan"
    },
    {
     "code": "s0036",
     "hl": "Maliari"
    },
    {
     "code": "s0087",
     "hl": "Atin"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "atin = है (मौजूद), ala = नहीं है।",
    "क्रिया के आगे-भीतर निशान: magtrabaju ku = मैं काम करता हूँ।"
   ],
   "yaad": "atin · ala",
   "abhyas": [
    [
     "\"atin\"?",
     "है (मौजूद)"
    ],
    [
     "\"ala\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "Atin"
    },
    {
     "code": "s0092",
     "hl": "Atin"
    },
    {
     "code": "s0041",
     "hl": "Kailangan"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: -in- / me- + क्रिया: mekapagtrabaju = काम किया।",
    "antis = पहले।"
   ],
   "yaad": "-in- / me- = बीता",
   "abhyas": [
    [
     "\"antis\"?",
     "पहले"
    ],
    [
     "बीती बात का निशान?",
     "-in- / me-"
    ]
   ],
   "ex": [
    {
     "code": "s0560",
     "hl": "antis"
    },
    {
     "code": "s0411",
     "hl": "pamuna"
    },
    {
     "code": "s0601",
     "hl": "antis"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: क्रिया का पहला अक्षर दोहराकर: ngeni = अभी; bukas = कल।"
   ],
   "yaad": "अक्षर दोहराव = आगे",
   "abhyas": [
    [
     "\"ngeni\"?",
     "अभी"
    ],
    [
     "आने वाली बात?",
     "अक्षर दोहराकर"
    ]
   ],
   "ex": [
    {
     "code": "s0183",
     "hl": "ngeni"
    },
    {
     "code": "s0036",
     "hl": "Maliari"
    },
    {
     "code": "s0184",
     "hl": "ngeni"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = e (क्रिया से पहले): e ku balu = मुझे नहीं पता।",
    "ala = नहीं है।"
   ],
   "yaad": "e · ala",
   "abhyas": [
    [
     "\"e\"?",
     "नहीं"
    ],
    [
     "\"ala\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "E"
    },
    {
     "code": "s0039",
     "hl": "E"
    },
    {
     "code": "s0111",
     "hl": "E"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "nanu (क्या), nokarin (कहाँ), kapilan (कब), magkanu (कितने पैसे), makananu (कैसे)।"
   ],
   "yaad": "nanu · nokarin · magkanu",
   "abhyas": [
    [
     "\"nokarin\"?",
     "कहाँ"
    ],
    [
     "\"magkanu\"?",
     "कितने पैसे"
    ]
   ],
   "ex": [
    {
     "code": "s0047",
     "hl": "Nokarin"
    },
    {
     "code": "s0101",
     "hl": "Magkanu"
    },
    {
     "code": "s0155",
     "hl": "nung"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: king bale = घर में, ibat king = से, para = के लिए, kayabe = साथ।"
   ],
   "yaad": "king · ibat · para · kayabe",
   "abhyas": [
    [
     "\"para\"?",
     "के लिए"
    ],
    [
     "\"king\"?",
     "में / को"
    ]
   ],
   "ex": [
    {
     "code": "s0014",
     "hl": "king"
    },
    {
     "code": "s0067",
     "hl": "king"
    },
    {
     "code": "s0008",
     "hl": "para"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण और संज्ञा के बीच a / ng: maragul a bale = बड़ा घर।",
    "metung, adwa, atlu = एक, दो, तीन।"
   ],
   "yaad": "विशेषण + a + संज्ञा",
   "abhyas": [
    [
     "\"adwa\"?",
     "दो"
    ],
    [
     "\"mayap\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "metung"
    },
    {
     "code": "s0209",
     "hl": "adwang"
    },
    {
     "code": "s0011",
     "hl": "Mayap"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों के लिए Sir / po।",
    "pakisabi = कृपया बताइए, salamat = धन्यवाद, patawaran = माफ़ कीजिए।"
   ],
   "yaad": "pakisabi · salamat",
   "abhyas": [
    [
     "\"pakisabi\"?",
     "कृपया बताइए"
    ],
    [
     "\"salamat\"?",
     "धन्यवाद"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Pakisabi"
    },
    {
     "code": "s0220",
     "hl": "Sir"
    },
    {
     "code": "s0023",
     "hl": "Pakisabi"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID pamp1243, 29-Oct-2026 को उतारा",
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
   }
  ]
 }
};
