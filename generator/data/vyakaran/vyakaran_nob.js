/* vyakaran_nob.js — "मेरा पहला नॉर्वेजियन व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "nob",
  "hi": "नॉर्वेजियन",
  "en": "Norwegian",
  "tts": "nb-NO",
  "asr": "nb-NO",
  "cover": {
   "native_title": "Min første grammatikk",
   "book_words": [
    "jeg",
    "du"
   ]
  },
  "slug": "norwegian",
  "glottocode": "nor"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "नॉर्वेजियन कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में, Æ Ø Å के साथ।",
    "sk / skj (कुछ शब्दों में) = श, kj = ख़्य, hj = य।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली नॉर्वेजियन पोथी\" में है।",
   "abhyas": [
    [
     "\"å\" की आवाज़?",
     "ओ"
    ],
    [
     "\"skj\"?",
     "श"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Jeg"
    },
    {
     "code": "s0003",
     "hl": "er"
    },
    {
     "code": "s0021",
     "hl": "ikke"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "jeg = मैं, du = तुम/आप, han = वह (पुरुष), hun = वह (स्त्री), vi = हम, de = वे।",
    "नॉर्वे में सबको du कहते हैं।"
   ],
   "yaad": "jeg · du · han · hun · vi",
   "abhyas": [
    [
     "\"मैं\"?",
     "jeg"
    ],
    [
     "\"वह\" (स्त्री)?",
     "hun"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Jeg"
    },
    {
     "code": "s0002",
     "hl": "du"
    },
    {
     "code": "s0388",
     "hl": "Han"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the कहाँ लगता है?",
   "rule": [
    "the शब्द के अंत में: hus (घर) → huset (वह घर), bil → bilen।",
    "लिंग: en (पुल्लिंग), ei (स्त्रीलिंग), et (नपुंसक)।"
   ],
   "yaad": "the = अंत में -en / -a / -et",
   "abhyas": [
    [
     "\"huset\" में the?",
     "अंत में -et"
    ],
    [
     "\"et\"?",
     "एक (नपुंसक)"
    ]
   ],
   "ex": [
    {
     "code": "s0053",
     "hl": "en"
    },
    {
     "code": "s0034",
     "hl": "et"
    },
    {
     "code": "s0010",
     "hl": "det"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया हमेशा दूसरे स्थान पर: I dag जैसे वाक्य में भी क्रिया दूसरे नंबर पर।",
    "आम क्रम: करने वाला → क्रिया → चीज़।"
   ],
   "yaad": "क्रिया = दूसरा स्थान",
   "abhyas": [
    [
     "क्रिया किस स्थान पर?",
     "दूसरे"
    ],
    [
     "आम क्रम?",
     "करने वाला → क्रिया → चीज़"
    ]
   ],
   "ex": [
    {
     "code": "s0008",
     "hl": "har"
    },
    {
     "code": "s0059",
     "hl": "vil"
    },
    {
     "code": "s0127",
     "hl": "skal"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया हर करने वाले के लिए एक ही, अंत -r: jeg jobber, han jobber।",
    "er = हूँ/है।"
   ],
   "yaad": "क्रिया + -r",
   "abhyas": [
    [
     "\"er\"?",
     "हूँ / है"
    ],
    [
     "क्रिया करने वाले से बदलती है?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "er"
    },
    {
     "code": "s0282",
     "hl": "jobber"
    },
    {
     "code": "s0008",
     "hl": "har"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: -et / -te: jobbet = काम किया; var = था।"
   ],
   "yaad": "-et / -te = बीता",
   "abhyas": [
    [
     "\"var\"?",
     "था"
    ],
    [
     "\"jobbet\"?",
     "काम किया"
    ]
   ],
   "ex": [
    {
     "code": "s0287",
     "hl": "var"
    },
    {
     "code": "s0008",
     "hl": "har"
    },
    {
     "code": "s0200",
     "hl": "Kom"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "skal / vil + क्रिया: jeg skal ringe = मैं फ़ोन करूँगा।",
    "i morgen = कल।"
   ],
   "yaad": "skal / vil + क्रिया",
   "abhyas": [
    [
     "\"i morgen\"?",
     "कल"
    ],
    [
     "आगे के लिए शब्द?",
     "skal / vil"
    ]
   ],
   "ex": [
    {
     "code": "s0127",
     "hl": "skal"
    },
    {
     "code": "s0059",
     "hl": "vil"
    },
    {
     "code": "s0019",
     "hl": "morgen"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "ikke = नहीं — क्रिया के बाद: jeg forstår ikke = मैं नहीं समझता।",
    "nei = नहीं (उत्तर)।"
   ],
   "yaad": "क्रिया + ikke",
   "abhyas": [
    [
     "\"ikke\" कहाँ?",
     "क्रिया के बाद"
    ],
    [
     "\"nei\"?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "ikke"
    },
    {
     "code": "s0026",
     "hl": "Nei"
    },
    {
     "code": "s0086",
     "hl": "ingen"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "हाँ/ना सवाल: क्रिया पहले: Forstår du? = समझे?",
    "hva (क्या), hvor (कहाँ), når (कब), hvor mye (कितना), hvordan (कैसे)।"
   ],
   "yaad": "क्रिया पहले · hva · hvor",
   "abhyas": [
    [
     "\"hvor\"?",
     "कहाँ"
    ],
    [
     "\"hvordan\"?",
     "कैसे"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Hva"
    },
    {
     "code": "s0005",
     "hl": "Hvor"
    },
    {
     "code": "s0010",
     "hl": "Hvordan"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: i huset = घर में, fra = से, til = को/तक, for = के लिए, med = साथ।"
   ],
   "yaad": "i · fra · til · for · med",
   "abhyas": [
    [
     "\"fra\"?",
     "से"
    ],
    [
     "\"med\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "i"
    },
    {
     "code": "s0003",
     "hl": "fra"
    },
    {
     "code": "s0067",
     "hl": "til"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा से पहले: et stort hus = एक बड़ा घर।",
    "en, to, tre = एक, दो, तीन।"
   ],
   "yaad": "विशेषण → संज्ञा",
   "abhyas": [
    [
     "\"to\"?",
     "दो"
    ],
    [
     "विशेषण कहाँ?",
     "संज्ञा से पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "bra"
    },
    {
     "code": "s0816",
     "hl": "stort"
    },
    {
     "code": "s0103",
     "hl": "To"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "takk = धन्यवाद, unnskyld = माफ़ कीजिए, vær så snill = कृपया।",
    "आदर शब्दों और आवाज़ से — du सबके लिए।"
   ],
   "yaad": "takk · unnskyld",
   "abhyas": [
    [
     "\"takk\"?",
     "धन्यवाद"
    ],
    [
     "\"unnskyld\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "takk"
    },
    {
     "code": "s0029",
     "hl": "Unnskyld"
    },
    {
     "code": "s0030",
     "hl": "snill"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID nor, 29-Oct-2026 को उतारा; नॉर्वेजियन Grambank में नहीं है",
  "claims": [
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "SVO",
    "grambank": "SVO",
    "text": "वाक्य-क्रम: SVO"
   },
   {
    "path": 3,
    "gb": "WALS-37A",
    "claim": "Definite affix",
    "grambank": "Definite affix",
    "text": "\"the\" का रूप: Definite affix"
   },
   {
    "path": 8,
    "gb": "WALS-112A",
    "claim": "Negative particle",
    "grambank": "Negative particle",
    "text": "\"नहीं\" का रूप: Negative particle"
   },
   {
    "path": 10,
    "gb": "WALS-85A",
    "claim": "Prepositions",
    "grambank": "Prepositions",
    "text": "संबंध-शब्द: Prepositions"
   },
   {
    "path": 11,
    "gb": "WALS-87A",
    "claim": "Adjective-Noun",
    "grambank": "Adjective-Noun",
    "text": "विशेषण-क्रम: Adjective-Noun"
   },
   {
    "path": 9,
    "gb": "WALS-116A",
    "claim": "Interrogative word order",
    "grambank": "Interrogative word order",
    "text": "हाँ/ना सवाल: Interrogative word order"
   },
   {
    "path": 6,
    "gb": "WALS-69A",
    "claim": "Tense-aspect suffixes",
    "grambank": "Tense-aspect suffixes",
    "text": "काल का चिह्न: Tense-aspect suffixes"
   }
  ]
 }
};
