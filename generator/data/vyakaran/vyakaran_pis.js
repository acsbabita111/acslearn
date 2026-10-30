/* vyakaran_pis.js — "मेरा पहला पिजिन व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "pis",
  "hi": "पिजिन",
  "en": "Solomons Pijin",
  "tts": "pis",
  "asr": "pis",
  "cover": {
   "native_title": "Faswan grama blong mi",
   "book_words": [
    "mi",
    "iu"
   ]
  },
  "slug": "pijin",
  "glottocode": "piji1239"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "पिजिन कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — अंग्रेज़ी से निकली, टोक-पिसिन की बहन।",
    "blong = का, long = में/पर/को — दो सबसे ज़रूरी शब्द।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली पिजिन पोथी\" में है।",
   "abhyas": [
    [
     "क्रिया बदलती है?",
     "नहीं — आगे छोटे शब्द लगते हैं"
    ],
    [
     "लिखावट कैसी?",
     "जैसा बोला, वैसा लिखा"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "mi"
    },
    {
     "code": "s0012",
     "hl": "hem"
    },
    {
     "code": "s0021",
     "hl": "no"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "mi = मैं, iu = तुम, hem = वह (दोनों), mifala = हम (बिना), iumi = हम (समेत), olketa = वे।"
   ],
   "yaad": "mi · iu · hem · mifala · iumi",
   "abhyas": [
    [
     "सुनने वाले समेत \"हम\"?",
     "iumi"
    ],
    [
     "\"वह\"?",
     "hem"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "mi"
    },
    {
     "code": "s0002",
     "hl": "iu"
    },
    {
     "code": "s0012",
     "hl": "hem"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = disfala (यह) / olketa (अनेक) पहले: olketa pikinini = बच्चे।",
    "एक = wanfala।"
   ],
   "yaad": "olketa = अनेक · wanfala = एक",
   "abhyas": [
    [
     "\"olketa\"?",
     "अनेक"
    ],
    [
     "\"wanfala\"?",
     "एक"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "Disfala"
    },
    {
     "code": "s0087",
     "hl": "Wanfala"
    },
    {
     "code": "s0085",
     "hl": "olketa"
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
     "hl": "laek"
    },
    {
     "code": "s0001",
     "hl": "mi"
    },
    {
     "code": "s0014",
     "hl": "save"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "stap = रहा है: mi waka stap = मैं काम कर रहा हूँ।",
    "hem nao = वही है।"
   ],
   "yaad": "stap · hem",
   "abhyas": [
    [
     "\"stap\"?",
     "रहा है"
    ],
    [
     "\"waka\"?",
     "काम"
    ]
   ],
   "ex": [
    {
     "code": "s0047",
     "hl": "stap"
    },
    {
     "code": "s0012",
     "hl": "hem"
    },
    {
     "code": "s0048",
     "hl": "stap"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: bin / finis: mi bin go = मैं गया था; mi kaikai finis = मैंने खा लिया।"
   ],
   "yaad": "bin · finis = बीता",
   "abhyas": [
    [
     "\"bin\"?",
     "था"
    ],
    [
     "\"finis\"?",
     "हो गया"
    ]
   ],
   "ex": [
    {
     "code": "s0411",
     "hl": "bin"
    },
    {
     "code": "s0032",
     "hl": "finis"
    },
    {
     "code": "s0412",
     "hl": "bin"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: bae: bae mi ringim = मैं फ़ोन करूँगा।",
    "tumoro = कल।"
   ],
   "yaad": "bae + क्रिया",
   "abhyas": [
    [
     "\"bae\"?",
     "आगे"
    ],
    [
     "\"tumoro\"?",
     "कल"
    ]
   ],
   "ex": [
    {
     "code": "s0219",
     "hl": "bae"
    },
    {
     "code": "s0257",
     "hl": "bae"
    },
    {
     "code": "s0284",
     "hl": "bae"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = no: mi no save = मुझे नहीं पता।"
   ],
   "yaad": "no + क्रिया",
   "abhyas": [
    [
     "\"no\"?",
     "नहीं"
    ],
    [
     "\"save\"?",
     "जानना"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "no"
    },
    {
     "code": "s0604",
     "hl": "nating"
    },
    {
     "code": "s0039",
     "hl": "no"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "wanem (क्या), wea (कहाँ), wataem (कब), haomas (कितना), hao (कैसे)।"
   ],
   "yaad": "wanem · wea · haomas",
   "abhyas": [
    [
     "\"haomas\"?",
     "कितना"
    ],
    [
     "\"wea\"?",
     "कहाँ"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Wanem"
    },
    {
     "code": "s0005",
     "hl": "wea"
    },
    {
     "code": "s0035",
     "hl": "taem"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: long haos = घर में, from = से, witim = साथ, blong = का।"
   ],
   "yaad": "long · from · witim · blong",
   "abhyas": [
    [
     "\"long\"?",
     "में / पर / को"
    ],
    [
     "\"blong\"?",
     "का"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "long"
    },
    {
     "code": "s0235",
     "hl": "witem"
    },
    {
     "code": "s0001",
     "hl": "blong"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा से पहले (-fala के साथ): bigfala haos = बड़ा घर।",
    "wanfala, tufala, trifala = एक, दो, तीन।"
   ],
   "yaad": "विशेषण-fala → संज्ञा",
   "abhyas": [
    [
     "\"bigfala\"?",
     "बड़ा"
    ],
    [
     "\"tufala\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "Gudfala"
    },
    {
     "code": "s0505",
     "hl": "Bigfala"
    },
    {
     "code": "s0209",
     "hl": "tufala"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "आदर शब्दों से: Bos (मालिक / साहब)।",
    "plis = कृपया, tanggio = धन्यवाद, sori = माफ़ कीजिए।"
   ],
   "yaad": "plis · tanggio · Bos",
   "abhyas": [
    [
     "\"tanggio\"?",
     "धन्यवाद"
    ],
    [
     "\"Bos\"?",
     "साहब"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Plis"
    },
    {
     "code": "s0011",
     "hl": "tanggio"
    },
    {
     "code": "s0220",
     "hl": "Bos"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID piji1239, 29-Oct-2026 को उतारा",
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
