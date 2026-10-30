/* vyakaran_mad.js — "मेरा पहला मदुरीज़ व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "mad",
  "hi": "मदुरीज़",
  "en": "मदुरीज़",
  "tts": "mad",
  "asr": "mad",
  "cover": {
   "native_title": "Tata bhasa se kapèng settong",
   "book_words": [
    "kaule",
    "sampeyan"
   ]
  },
  "slug": "madurese",
  "glottocode": "nucl1460"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "मदुरीज़ कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। c = च, j = ज, ng = ङ, ny = ञ।",
    "मदुरा द्वीप (पूर्वी जावा) की भाषा — मलय/इंडोनेशियाई की बहन।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली मदुरीज़ पोथी\" में है।",
   "abhyas": [
    [
     "\"c\" की आवाज़?",
     "च"
    ],
    [
     "किसकी बहन?",
     "मलय / इंडोनेशियाई"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "kaule"
    },
    {
     "code": "s0002",
     "hl": "sampeyan"
    },
    {
     "code": "s0022",
     "hl": "Tolong"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "kaule = मैं (आदर), sengko' = मैं (आम), sampeyan = आप, be'na = तुम, aba'na = वह, kaula sadaja = हम।"
   ],
   "yaad": "kaule · sampeyan · be'na",
   "abhyas": [
    [
     "\"मैं\" (आदर)?",
     "kaule"
    ],
    [
     "\"आप\"?",
     "sampeyan"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "kaule"
    },
    {
     "code": "s0003",
     "hl": "Kaule"
    },
    {
     "code": "s0002",
     "hl": "sampeyan"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the के लिए -na / -e शब्द के अंत में: romana = वह घर।",
    "संज्ञा का लिंग नहीं; अनेक: दोहराकर।"
   ],
   "yaad": "-na = the",
   "abhyas": [
    [
     "\"romana\"?",
     "वह घर"
    ],
    [
     "अनेक कैसे?",
     "दोहराकर"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "Reya"
    },
    {
     "code": "s0107",
     "hl": "se"
    },
    {
     "code": "s0108",
     "hl": "settong"
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
     "hl": "perlu"
    },
    {
     "code": "s0043",
     "hl": "pengen"
    },
    {
     "code": "s0036",
     "hl": "bisa"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; bada = है (मौजूद)।",
    "kaule alako = मैं काम करता हूँ।"
   ],
   "yaad": "bada · alako",
   "abhyas": [
    [
     "\"bada\"?",
     "है (मौजूद)"
    ],
    [
     "\"alako\"?",
     "काम करना"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "Bada"
    },
    {
     "code": "s0092",
     "hl": "Bada"
    },
    {
     "code": "s0008",
     "hl": "alako"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: la + क्रिया: la dhateng = आ गया।"
   ],
   "yaad": "la = हो गया",
   "abhyas": [
    [
     "\"la\"?",
     "हो गया"
    ],
    [
     "\"sabellun\"?",
     "पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0032",
     "hl": "la"
    },
    {
     "code": "s0560",
     "hl": "sabellun"
    },
    {
     "code": "s0033",
     "hl": "la"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: bakal + क्रिया: bakal nelpon = फ़ोन करूँगा।",
    "sateya = अभी।"
   ],
   "yaad": "bakal + क्रिया",
   "abhyas": [
    [
     "\"bakal\"?",
     "आगे (करूँगा)"
    ],
    [
     "\"sateya\"?",
     "अभी"
    ]
   ],
   "ex": [
    {
     "code": "s0257",
     "hl": "bakal"
    },
    {
     "code": "s0181",
     "hl": "sateya"
    },
    {
     "code": "s0234",
     "hl": "sateya"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = ta' (क्रिया से पहले); ja' = मत।"
   ],
   "yaad": "ta' · ja'",
   "abhyas": [
    [
     "\"ta'\"?",
     "नहीं"
    ],
    [
     "\"ja'\"?",
     "मत"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "ta'"
    },
    {
     "code": "s0299",
     "hl": "ja'"
    },
    {
     "code": "s0039",
     "hl": "ta'"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "apa (क्या), dimma (कहाँ), bila (कब), bara (कितना), dhaghi ponapa (कैसे)।"
   ],
   "yaad": "apa · dimma · bara",
   "abhyas": [
    [
     "\"dimma\"?",
     "कहाँ"
    ],
    [
     "\"bara\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0005",
     "hl": "dimma"
    },
    {
     "code": "s0017",
     "hl": "bara"
    },
    {
     "code": "s0010",
     "hl": "apa"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: e roma = घर में, dhari = से, ka = को, kaangguy = के लिए, kalaban = साथ।"
   ],
   "yaad": "e · dhari · ka · kalaban",
   "abhyas": [
    [
     "\"kalaban\"?",
     "साथ"
    ],
    [
     "\"kaangguy\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0013",
     "hl": "e"
    },
    {
     "code": "s0003",
     "hl": "dhari"
    },
    {
     "code": "s0008",
     "hl": "ka"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: roma raja = बड़ा घर।",
    "settong, dhuwa', tello' = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"dhuwa\"?",
     "दो"
    ],
    [
     "\"bagus\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "settong"
    },
    {
     "code": "s0018",
     "hl": "dhuwa"
    },
    {
     "code": "s0027",
     "hl": "Bagus"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों से ऊँचे स्तर की बोली: kaule, sampeyan।",
    "tolong = कृपया, sakalangkong = धन्यवाद, sapora = माफ़ कीजिए।"
   ],
   "yaad": "tolong · sakalangkong",
   "abhyas": [
    [
     "\"sakalangkong\"?",
     "धन्यवाद"
    ],
    [
     "\"tolong\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Tolong"
    },
    {
     "code": "s0023",
     "hl": "Tolong"
    },
    {
     "code": "s0220",
     "hl": "Pak"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID nucl1460, 29-Oct-2026 को उतारा",
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
    "claim": "0",
    "grambank": "0",
    "text": "अनेक के लिए संज्ञा पर ज़रूरी चिह्न नहीं"
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
    "claim": "0",
    "grambank": "0",
    "text": "अभी के समय का चिह्न क्रिया पर नहीं लगता"
   },
   {
    "path": 6,
    "gb": "GB083",
    "claim": "0",
    "grambank": "0",
    "text": "बीते समय का चिह्न क्रिया पर नहीं लगता"
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
   }
  ]
 }
};
