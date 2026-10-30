/* vyakaran_glg.js — "मेरा पहला गैलिशियन व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "glg",
  "hi": "गैलिशियन",
  "en": "Galician",
  "tts": "gl-ES",
  "asr": "gl-ES",
  "cover": {
   "native_title": "A miña primeira gramática",
   "book_words": [
    "eu",
    "vostede"
   ]
  },
  "slug": "galician",
  "glottocode": "gali1258"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "गैलिशियन कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में। x = श, ñ = ञ, ll = ल्य, ch = च; z / ce / ci = थ़।",
    "पुर्तगाली की बहन।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली गैलिशियन पोथी\" में है।",
   "abhyas": [
    [
     "\"ll\" / \"ny\" जैसी जोड़ी?",
     "एक आवाज़"
    ],
    [
     "शब्द किस पर ख़त्म होते हैं?",
     "अक्सर स्वर पर"
    ]
   ],
   "ex": [
    {
     "code": "s0735",
     "hl": "eu"
    },
    {
     "code": "s0001",
     "hl": "é"
    },
    {
     "code": "s0021",
     "hl": "Non"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "eu = मैं, ti = तुम, vostede = आप, el = वह (पुरुष), ela = वह (स्त्री), nós = हम, eles = वे।"
   ],
   "yaad": "eu · ti · vostede · el · ela",
   "abhyas": [
    [
     "\"मैं\"?",
     "eu"
    ],
    [
     "आदर से \"आप\"?",
     "vostede"
    ]
   ],
   "ex": [
    {
     "code": "s0735",
     "hl": "eu"
    },
    {
     "code": "s2088",
     "hl": "vostede"
    },
    {
     "code": "s1126",
     "hl": "el"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और लिंग?",
   "rule": [
    "दो लिंग: o (पुल्लिंग), a (स्त्रीलिंग) = the; un / unha = एक।",
    "अनेक: -s: casas = घर (अनेक)।"
   ],
   "yaad": "o / a = the · un / unha = एक",
   "abhyas": [
    [
     "\"a casa\" में a?",
     "the (स्त्रीलिंग)"
    ],
    [
     "कितने लिंग?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "O"
    },
    {
     "code": "s0008",
     "hl": "a"
    },
    {
     "code": "s0014",
     "hl": "un"
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
     "hl": "Quero"
    },
    {
     "code": "s0201",
     "hl": "Busco"
    },
    {
     "code": "s0197",
     "hl": "traballo"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया का अंत: traballo (मैं काम करता हूँ), traballa (वह करता है)।",
    "son / estou = हूँ, é / está = है।"
   ],
   "yaad": "eu … -o",
   "abhyas": [
    [
     "\"é\"?",
     "है"
    ],
    [
     "\"traballo\" — कौन?",
     "मैं"
    ]
   ],
   "ex": [
    {
     "code": "s0006",
     "hl": "Son"
    },
    {
     "code": "s0011",
     "hl": "Estou"
    },
    {
     "code": "s0001",
     "hl": "é"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अंत -ei / -ín: traballei = मैंने काम किया; era = था।"
   ],
   "yaad": "-ei = मैंने (बीता)",
   "abhyas": [
    [
     "\"traballei\"?",
     "मैंने काम किया"
    ],
    [
     "\"era\"?",
     "था"
    ]
   ],
   "ex": [
    {
     "code": "s0503",
     "hl": "era"
    },
    {
     "code": "s0287",
     "hl": "foi"
    },
    {
     "code": "s0544",
     "hl": "Fun"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: अंत में -rei: traballarei = मैं काम करूँगा।",
    "mañá = कल।"
   ],
   "yaad": "-rei = करूँगा",
   "abhyas": [
    [
     "\"mañá\"?",
     "कल"
    ],
    [
     "\"traballarei\"?",
     "मैं काम करूँगा"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "mañá"
    },
    {
     "code": "s1810",
     "hl": "será"
    },
    {
     "code": "s1402",
     "hl": "chamarei"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया से पहले non: non entendo = मैं नहीं समझता।"
   ],
   "yaad": "non + क्रिया",
   "abhyas": [
    [
     "\"non\"?",
     "नहीं"
    ],
    [
     "\"non\" कहाँ?",
     "क्रिया से पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Non"
    },
    {
     "code": "s0604",
     "hl": "Nunca"
    },
    {
     "code": "s0026",
     "hl": "Non"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "que (क्या), onde (कहाँ), cando (कब), canto (कितना), como (कैसे)।",
    "हाँ/ना सवाल: आवाज़ से।"
   ],
   "yaad": "que · onde · canto · como",
   "abhyas": [
    [
     "\"onde\"?",
     "कहाँ"
    ],
    [
     "\"canto\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Que"
    },
    {
     "code": "s0005",
     "hl": "onde"
    },
    {
     "code": "s0101",
     "hl": "Canto"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: na casa = घर में (en + a), de = से/का, para = के लिए, con = साथ।"
   ],
   "yaad": "en · de · para · con",
   "abhyas": [
    [
     "\"con\"?",
     "साथ"
    ],
    [
     "\"para\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "en"
    },
    {
     "code": "s0003",
     "hl": "de"
    },
    {
     "code": "s0069",
     "hl": "Para"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण ज़्यादातर संज्ञा के बाद: casa grande = बड़ा घर।",
    "un, dous, tres = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"casa grande\"?",
     "बड़ा घर"
    ],
    [
     "\"dous\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "ben"
    },
    {
     "code": "s0676",
     "hl": "grande"
    },
    {
     "code": "s0109",
     "hl": "dous"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "vostede = आप (आदर)।",
    "por favor = कृपया, grazas = धन्यवाद, desculpe = माफ़ कीजिए।"
   ],
   "yaad": "vostede · por favor · grazas",
   "abhyas": [
    [
     "\"grazas\"?",
     "धन्यवाद"
    ],
    [
     "\"desculpe\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "grazas"
    },
    {
     "code": "s0022",
     "hl": "favor"
    },
    {
     "code": "s2088",
     "hl": "vostede"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID gali1258, 29-Oct-2026 को उतारा",
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
