/* vyakaran_pag.js — "मेरा पहला पांगासिनान व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "pag",
  "hi": "पांगासिनान",
  "en": "पांगासिनान",
  "tts": "pag",
  "asr": "pag",
  "cover": {
   "native_title": "Say unonan gramatika ko",
   "book_words": [
    "siak",
    "sikayo"
   ]
  },
  "slug": "pangasinan",
  "glottocode": "pang1290"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "पांगासिनान कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। ng = ङ।",
    "उत्तरी लूज़ोन (पांगासिनान) की भाषा — टागालोग और सेबुआनो की पड़ोसी।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली पांगासिनान पोथी\" में है।",
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
     "code": "s0037",
     "hl": "siak"
    },
    {
     "code": "s0453",
     "hl": "sikayo"
    },
    {
     "code": "s0022",
     "hl": "Ipangasi"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "siak / ak = मैं, sika / ka = तुम, sikayo / yo = आप सब, sikato = वह (दोनों),",
    "sikatayo = हम (समेत), sikami = हम (बिना), sikara = वे।",
    "ko = मेरा (बाद में)।"
   ],
   "yaad": "siak · sika · sikato · sikami",
   "abhyas": [
    [
     "\"मैं\"?",
     "siak / ak"
    ],
    [
     "\"ko\"?",
     "मेरा"
    ]
   ],
   "ex": [
    {
     "code": "s0037",
     "hl": "siak"
    },
    {
     "code": "s0003",
     "hl": "ak"
    },
    {
     "code": "s0002",
     "hl": "yo"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = say (एक), saray (अनेक): say abong = वह घर।",
    "एक = sakey।"
   ],
   "yaad": "say = the · saray = अनेक",
   "abhyas": [
    [
     "\"say\"?",
     "the"
    ],
    [
     "\"saray\"?",
     "the (अनेक)"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Say"
    },
    {
     "code": "s0002",
     "hl": "say"
    },
    {
     "code": "s0085",
     "hl": "saray"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → चीज़: Ominom ak na danum = मैं पानी पीता हूँ (शब्दशः: पीता मैं पानी)।",
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
     "hl": "Kaukolan"
    },
    {
     "code": "s0205",
     "hl": "Nayarian"
    },
    {
     "code": "s0087",
     "hl": "Wala"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "wala = है (मौजूद), anggapo = नहीं है।",
    "क्रिया के आगे-भीतर निशान: mankimey ak = मैं काम करता हूँ।"
   ],
   "yaad": "wala · anggapo",
   "abhyas": [
    [
     "\"wala\"?",
     "है (मौजूद)"
    ],
    [
     "\"mankimey\"?",
     "काम करता है"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "Wala"
    },
    {
     "code": "s0092",
     "hl": "Wala"
    },
    {
     "code": "s0041",
     "hl": "Kaukolan"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: -in- / nan- + क्रिया: nankimey ak = मैंने काम किया।",
    "antis = पहले।"
   ],
   "yaad": "nan- = बीता",
   "abhyas": [
    [
     "\"antis\"?",
     "पहले"
    ],
    [
     "\"nan-\"?",
     "बीता"
    ]
   ],
   "ex": [
    {
     "code": "s0560",
     "hl": "antis"
    },
    {
     "code": "s0172",
     "hl": "unona"
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
    "आने वाली बात: man- + अक्षर-दोहराव: natan = अभी; nabuas = कल।"
   ],
   "yaad": "man- = आगे",
   "abhyas": [
    [
     "\"natan\"?",
     "अभी"
    ],
    [
     "आने वाली बात?",
     "man- (दोहराव)"
    ]
   ],
   "ex": [
    {
     "code": "s0181",
     "hl": "natan"
    },
    {
     "code": "s0183",
     "hl": "natan"
    },
    {
     "code": "s0205",
     "hl": "Nayarian"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = andi (क्रिया से पहले): andi ko amta = मुझे नहीं पता।",
    "anggapo = नहीं है।"
   ],
   "yaad": "andi · anggapo",
   "abhyas": [
    [
     "\"andi\"?",
     "नहीं"
    ],
    [
     "\"anggapo\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Andi"
    },
    {
     "code": "s0026",
     "hl": "Andi"
    },
    {
     "code": "s0039",
     "hl": "Andi"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "anto (क्या), iner (कहाँ), kapigan (कब), pira (कितना), ompan (कैसे)।"
   ],
   "yaad": "anto · iner · pira",
   "abhyas": [
    [
     "\"iner\"?",
     "कहाँ"
    ],
    [
     "\"pira\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Anto"
    },
    {
     "code": "s0005",
     "hl": "Iner"
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
    "संबंध-शब्द पहले: ed abong = घर में, manlapud ed = से, para = के लिए, iba = साथ।"
   ],
   "yaad": "ed · manlapud · para · iba",
   "abhyas": [
    [
     "\"ed\"?",
     "में / को"
    ],
    [
     "\"para\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0014",
     "hl": "ed"
    },
    {
     "code": "s0015",
     "hl": "ed"
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
    "विशेषण और संज्ञा के बीच a / ya: baleg ya abong = बड़ा घर।",
    "sakey, duara, talora = एक, दो, तीन।"
   ],
   "yaad": "विशेषण + ya + संज्ञा",
   "abhyas": [
    [
     "\"duara\"?",
     "दो"
    ],
    [
     "\"maabig\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "sakey"
    },
    {
     "code": "s0103",
     "hl": "Duara"
    },
    {
     "code": "s0011",
     "hl": "Maabig"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों के लिए Sir / po।",
    "ipangasi = कृपया, salamat = धन्यवाद, pasensya = माफ़ कीजिए।"
   ],
   "yaad": "ipangasi · salamat",
   "abhyas": [
    [
     "\"ipangasi\"?",
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
     "hl": "Ipangasi"
    },
    {
     "code": "s0220",
     "hl": "Sir"
    },
    {
     "code": "s0023",
     "hl": "Ipangasi"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID pang1290, 29-Oct-2026 को उतारा",
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
