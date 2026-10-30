/* vyakaran_bjn.js — "मेरा पहला बांजारीज़ व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "bjn",
  "hi": "बांजारीज़",
  "en": "बांजारीज़",
  "tts": "bjn",
  "asr": "bjn",
  "cover": {
   "native_title": "Tata bahasa partama ulun",
   "book_words": [
    "ulun",
    "pian"
   ]
  },
  "slug": "banjarese",
  "glottocode": "banj1239"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "बांजारीज़ कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। c = च, j = ज, ng = ङ, ny = ञ।",
    "दक्षिण कालीमंतान (इंडोनेशिया) की भाषा — मलय/इंडोनेशियाई की बहन।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली बांजारीज़ पोथी\" में है।",
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
     "hl": "ulun"
    },
    {
     "code": "s0002",
     "hl": "pian"
    },
    {
     "code": "s0022",
     "hl": "Tulung"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "ulun = मैं (आदर), aku = मैं (आम), pian = आप, ikam = तुम, inya = वह, kami = हम (बिना),",
    "kita = हम (समेत)।"
   ],
   "yaad": "ulun · pian · inya · kami",
   "abhyas": [
    [
     "\"मैं\" (आदर)?",
     "ulun"
    ],
    [
     "\"आप\"?",
     "pian"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "ulun"
    },
    {
     "code": "s0003",
     "hl": "Ulun"
    },
    {
     "code": "s0002",
     "hl": "pian"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the के लिए nang / itu: rumah itu = वह घर।",
    "संज्ञा का लिंग नहीं; अनेक: दोहराकर।"
   ],
   "yaad": "itu / ini = वह / यह",
   "abhyas": [
    [
     "\"itu\"?",
     "वह"
    ],
    [
     "\"ini\"?",
     "यह"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "nang"
    },
    {
     "code": "s0012",
     "hl": "Ini"
    },
    {
     "code": "s0227",
     "hl": "itu"
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
     "code": "s0008",
     "hl": "handak"
    },
    {
     "code": "s0041",
     "hl": "perlu"
    },
    {
     "code": "s0036",
     "hl": "kawa"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; ada = है (मौजूद)।",
    "ulun bagawi = मैं काम करता हूँ।"
   ],
   "yaad": "ada · bagawi",
   "abhyas": [
    [
     "\"ada\"?",
     "है (मौजूद)"
    ],
    [
     "\"bagawi\"?",
     "काम करना"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "Ada"
    },
    {
     "code": "s0092",
     "hl": "Ada"
    },
    {
     "code": "s0008",
     "hl": "bagawi"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: sudah + क्रिया: sudah datang = आ गया।"
   ],
   "yaad": "sudah = हो गया",
   "abhyas": [
    [
     "\"sudah\"?",
     "हो गया"
    ],
    [
     "\"sabalum\"?",
     "पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0032",
     "hl": "sudah"
    },
    {
     "code": "s0560",
     "hl": "sabalum"
    },
    {
     "code": "s0033",
     "hl": "sudah"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: akan / handak + क्रिया; kini = अभी।"
   ],
   "yaad": "akan + क्रिया",
   "abhyas": [
    [
     "\"akan\"?",
     "आगे"
    ],
    [
     "\"kini\"?",
     "अभी"
    ]
   ],
   "ex": [
    {
     "code": "s0562",
     "hl": "akan"
    },
    {
     "code": "s0181",
     "hl": "kini"
    },
    {
     "code": "s0183",
     "hl": "kini"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = kada (क्रिया से पहले); jangan = मत।"
   ],
   "yaad": "kada · jangan",
   "abhyas": [
    [
     "\"kada\"?",
     "नहीं"
    ],
    [
     "\"jangan\"?",
     "मत"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "kada"
    },
    {
     "code": "s0299",
     "hl": "jangan"
    },
    {
     "code": "s0026",
     "hl": "Kada"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "apa (क्या), dimana (कहाँ), bilaan (कब), barapa (कितना), kayapa (कैसे)।"
   ],
   "yaad": "apa · dimana · barapa",
   "abhyas": [
    [
     "\"dimana\"?",
     "कहाँ"
    ],
    [
     "\"barapa\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0047",
     "hl": "Dimana"
    },
    {
     "code": "s0017",
     "hl": "barapa"
    },
    {
     "code": "s0052",
     "hl": "Dimana"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: di rumah = घर में, dari = से, ka = को, gasan = के लिए, lawan = साथ।"
   ],
   "yaad": "di · dari · ka · gasan · lawan",
   "abhyas": [
    [
     "\"gasan\"?",
     "के लिए"
    ],
    [
     "\"lawan\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0412",
     "hl": "di"
    },
    {
     "code": "s0308",
     "hl": "dari"
    },
    {
     "code": "s0037",
     "hl": "ka"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: rumah ganal = बड़ा घर।",
    "asa, dua, talu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"dua\"?",
     "दो"
    ],
    [
     "\"baik\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0108",
     "hl": "asa"
    },
    {
     "code": "s0018",
     "hl": "dua"
    },
    {
     "code": "s0011",
     "hl": "Baik"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "pian = आप (आदर)।",
    "tulung = कृपया, tarima kasih = धन्यवाद, ampun = माफ़ कीजिए।"
   ],
   "yaad": "tulung · pian",
   "abhyas": [
    [
     "\"tulung\"?",
     "कृपया"
    ],
    [
     "\"pian\"?",
     "आप"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Tulung"
    },
    {
     "code": "s0023",
     "hl": "Tulung"
    },
    {
     "code": "s0220",
     "hl": "Pak"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "बांजारीज़ Grambank और WALS दोनों में नहीं — पाठ इसी कोर्स के असली वाक्यों से; AI-मसौदा, भाषा संवर्धन समिति (मूल-वक्ता) की जाँच बाक़ी",
  "claims": []
 }
};
