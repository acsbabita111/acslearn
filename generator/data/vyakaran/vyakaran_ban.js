/* vyakaran_ban.js — "मेरा पहला बालीनीज़ व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "ban",
  "hi": "बालीनीज़",
  "en": "बालीनीज़",
  "tts": "ban",
  "asr": "ban",
  "cover": {
   "native_title": "Tata basa pinih riin tiang",
   "book_words": [
    "tiang",
    "ragane"
   ]
  },
  "slug": "balinese",
  "glottocode": "bali1278"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "बालीनीज़ कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — जैसा बोला वैसा लिखा। c = च, j = ज, ng = ङ, ny = ञ।",
    "बाली (इंडोनेशिया) — आदर के ऊँचे-नीचे स्तर की भाषा — मलय/इंडोनेशियाई की बहन।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली बालीनीज़ पोथी\" में है।",
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
     "hl": "tiang"
    },
    {
     "code": "s0002",
     "hl": "ragane"
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
    "tiang = मैं (आदर), cang = मैं (आम), ragane / jero = आप, ia = वह, iraga = हम,",
    "ipun = वे / वह (आदर)।"
   ],
   "yaad": "tiang · ragane · ia · iraga",
   "abhyas": [
    [
     "\"मैं\" (आदर)?",
     "tiang"
    ],
    [
     "\"हम\"?",
     "iraga"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "tiang"
    },
    {
     "code": "s0003",
     "hl": "Tiang"
    },
    {
     "code": "s0002",
     "hl": "ragane"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the के लिए -e / -ne शब्द के अंत में: umahne = वह घर।",
    "संज्ञा का लिंग नहीं; अनेक: दोहराकर।"
   ],
   "yaad": "-e / -ne = the",
   "abhyas": [
    [
     "\"umahne\"?",
     "वह घर"
    ],
    [
     "संज्ञा का लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0107",
     "hl": "sane"
    },
    {
     "code": "s0012",
     "hl": "Puniki"
    },
    {
     "code": "s0115",
     "hl": "punika"
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
     "hl": "mamerluang"
    },
    {
     "code": "s0008",
     "hl": "makarya"
    },
    {
     "code": "s0204",
     "hl": "nyidayang"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; wenten = है (मौजूद)।",
    "tiang makarya = मैं काम करता हूँ।"
   ],
   "yaad": "wenten · makarya",
   "abhyas": [
    [
     "\"wenten\"?",
     "है (मौजूद)"
    ],
    [
     "\"makarya\"?",
     "काम करना"
    ]
   ],
   "ex": [
    {
     "code": "s0087",
     "hl": "Wenten"
    },
    {
     "code": "s0092",
     "hl": "Wenten"
    },
    {
     "code": "s0008",
     "hl": "makarya"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: sampun + क्रिया: sampun rauh = आ चुका।"
   ],
   "yaad": "sampun = हो गया",
   "abhyas": [
    [
     "\"sampun\"?",
     "हो गया"
    ],
    [
     "\"sadurung\"?",
     "पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0032",
     "hl": "Sampun"
    },
    {
     "code": "s0560",
     "hl": "sadurung"
    },
    {
     "code": "s0033",
     "hl": "sampun"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: jagi + क्रिया: jagi nelpon = फ़ोन करूँगा।",
    "mangkin = अभी।"
   ],
   "yaad": "jagi + क्रिया",
   "abhyas": [
    [
     "\"jagi\"?",
     "आगे (करूँगा)"
    ],
    [
     "\"mangkin\"?",
     "अभी"
    ]
   ],
   "ex": [
    {
     "code": "s0008",
     "hl": "jagi"
    },
    {
     "code": "s0181",
     "hl": "mangkin"
    },
    {
     "code": "s0183",
     "hl": "mangkin"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = nenten (आदर) / sing (आम); sampunang = मत।"
   ],
   "yaad": "nenten · sampunang",
   "abhyas": [
    [
     "\"nenten\"?",
     "नहीं"
    ],
    [
     "\"sampunang\"?",
     "मत"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "nenten"
    },
    {
     "code": "s0299",
     "hl": "sampunang"
    },
    {
     "code": "s0026",
     "hl": "Nenten"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "napi (क्या), dija (कहाँ), pidan (कब), akuda (कितना), sapunapi (कैसे)।"
   ],
   "yaad": "napi · dija · kuda",
   "abhyas": [
    [
     "\"dija\"?",
     "कहाँ"
    ],
    [
     "\"napi\"?",
     "क्या"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Napi"
    },
    {
     "code": "s0005",
     "hl": "dija"
    },
    {
     "code": "s0017",
     "hl": "Kuda"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ring umah = घर में, saking = से, ka = को, anggen = के लिए, sareng = साथ।"
   ],
   "yaad": "ring · saking · ka · sareng",
   "abhyas": [
    [
     "\"saking\"?",
     "से"
    ],
    [
     "\"sareng\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0187",
     "hl": "Ring"
    },
    {
     "code": "s0188",
     "hl": "Ring"
    },
    {
     "code": "s0003",
     "hl": "saking"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: umah gede = बड़ा घर।",
    "asiki, kalih, tiga = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"kalih\"?",
     "दो"
    ],
    [
     "\"becik\"?",
     "अच्छा"
    ]
   ],
   "ex": [
    {
     "code": "s0121",
     "hl": "asiki"
    },
    {
     "code": "s0103",
     "hl": "Kalih"
    },
    {
     "code": "s0009",
     "hl": "Becik"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों से ऊँचे स्तर की बोली (अलुस): tiang, ragane, napi।",
    "tulung = कृपया, suksma = धन्यवाद, ampura = माफ़ कीजिए।"
   ],
   "yaad": "tulung · suksma · ampura",
   "abhyas": [
    [
     "\"suksma\"?",
     "धन्यवाद"
    ],
    [
     "\"tulung\"?",
     "कृपया"
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
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID bali1278, 29-Oct-2026 को उतारा",
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
    "gb": "GB051",
    "claim": "0",
    "grambank": "0",
    "text": "संज्ञा का लिंग नहीं"
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
