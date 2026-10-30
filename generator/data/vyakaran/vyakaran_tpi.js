/* vyakaran_tpi.js — "मेरा पहला टोक-पिसिन व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "tpi",
  "hi": "टोक-पिसिन",
  "en": "Tok Pisin",
  "tts": "tpi",
  "asr": "tpi",
  "cover": {
   "native_title": "Namba wan gramma bilong mi",
   "book_words": [
    "mi",
    "yu"
   ]
  },
  "slug": "tokpisin",
  "glottocode": "tokp1240"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "टोक-पिसिन कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — अंग्रेज़ी से निकली, जैसा बोला वैसा लिखा।",
    "bilong = का, long = में/पर/को — दो सबसे ज़रूरी शब्द।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली टोक-पिसिन पोथी\" में है।",
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
     "code": "s0024",
     "hl": "i"
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
    "mi = मैं, yu = तुम/आप, em = वह (दोनों), mipela = हम (सुनने वाले के बिना), yumi = हम (समेत), ol = वे।"
   ],
   "yaad": "mi · yu · em · mipela · yumi",
   "abhyas": [
    [
     "\"सुनने वाले समेत हम\"?",
     "yumi"
    ],
    [
     "\"वह\"?",
     "em"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "mi"
    },
    {
     "code": "s0002",
     "hl": "yu"
    },
    {
     "code": "s0012",
     "hl": "em"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the = dispela (यह) / ol (अनेक) पहले: ol pikinini = बच्चे।",
    "एक = wanpela।"
   ],
   "yaad": "ol = अनेक · wanpela = एक",
   "abhyas": [
    [
     "\"ol\"?",
     "अनेक"
    ],
    [
     "\"wanpela\"?",
     "एक"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "Dispela"
    },
    {
     "code": "s0087",
     "hl": "Wanpela"
    },
    {
     "code": "s0085",
     "hl": "ol"
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
     "hl": "laik"
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
    "क्रिया से पहले i (वह के साथ): em i wok = वह काम करता है।",
    "stap = रहा है: mi wok i stap = मैं काम कर रहा हूँ।"
   ],
   "yaad": "i + क्रिया · stap",
   "abhyas": [
    [
     "\"stap\"?",
     "रहा है"
    ],
    [
     "\"i\"?",
     "क्रिया का निशान"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "i"
    },
    {
     "code": "s0047",
     "hl": "stap"
    },
    {
     "code": "s0018",
     "hl": "gat"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: bin / pinis: mi bin go = मैं गया; mi kaikai pinis = मैंने खा लिया।"
   ],
   "yaad": "bin · pinis = बीता",
   "abhyas": [
    [
     "\"bin\"?",
     "था"
    ],
    [
     "\"pinis\"?",
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
     "hl": "pinis"
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
    "आने वाली बात: bai: bai mi ringim = मैं फ़ोन करूँगा।",
    "tumora = कल।"
   ],
   "yaad": "bai + क्रिया",
   "abhyas": [
    [
     "\"bai\"?",
     "आगे"
    ],
    [
     "\"tumora\"?",
     "कल"
    ]
   ],
   "ex": [
    {
     "code": "s0219",
     "hl": "bai"
    },
    {
     "code": "s0020",
     "hl": "tumora"
    },
    {
     "code": "s0257",
     "hl": "bai"
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
     "code": "s0026",
     "hl": "Nogat"
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
    "wanem (क्या), we (कहाँ), wataim (कब), hamas (कितना), olsem wanem (कैसे)।",
    "हाँ/ना सवाल: अंत में o nogat।"
   ],
   "yaad": "wanem · we · hamas",
   "abhyas": [
    [
     "\"hamas\"?",
     "कितना"
    ],
    [
     "\"we\"?",
     "कहाँ"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Wanem"
    },
    {
     "code": "s0017",
     "hl": "Hamas"
    },
    {
     "code": "s0005",
     "hl": "we"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: long haus = घर में, long = से/को, wantaim = साथ, bilong = का।"
   ],
   "yaad": "long · wantaim · bilong",
   "abhyas": [
    [
     "\"long\"?",
     "में / पर / को"
    ],
    [
     "\"bilong\"?",
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
     "hl": "wantaim"
    },
    {
     "code": "s0001",
     "hl": "bilong"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा से पहले (-pela के साथ): bikpela haus = बड़ा घर।",
    "wanpela, tupela, tripela = एक, दो, तीन।"
   ],
   "yaad": "विशेषण-pela → संज्ञा",
   "abhyas": [
    [
     "\"bikpela\"?",
     "बड़ा"
    ],
    [
     "\"tupela\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "Gutpela"
    },
    {
     "code": "s0505",
     "hl": "Bikpela"
    },
    {
     "code": "s0209",
     "hl": "tupela"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "आदर शब्दों से।",
    "plis = कृपया, tenkyu = धन्यवाद, sori = माफ़ कीजिए।"
   ],
   "yaad": "plis · tenkyu",
   "abhyas": [
    [
     "\"tenkyu\"?",
     "धन्यवाद"
    ],
    [
     "\"plis\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "tenkyu"
    },
    {
     "code": "s0022",
     "hl": "Plis"
    },
    {
     "code": "s0029",
     "hl": "Sori"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID tokp1240, 29-Oct-2026 को उतारा",
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
    "path": 9,
    "gb": "GB263",
    "claim": "1",
    "grambank": "1",
    "text": "हाँ/ना सवाल का शब्द वाक्य के अंत में"
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
