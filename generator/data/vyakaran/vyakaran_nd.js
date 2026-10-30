/* vyakaran_nd.js — "मेरा पहला उत्तरी-न्देबेले व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "nd",
  "hi": "उत्तरी-न्देबेले",
  "en": "उत्तरी-न्देबेले",
  "tts": "nd",
  "asr": "nd",
  "cover": {
   "native_title": "Uhlelo lwami lokuqala",
   "book_words": [
    "mina",
    "wena"
   ]
  },
  "slug": "ndebele",
  "glottocode": "nort2795"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "उत्तरी-न्देबेले कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — ज़िम्बाब्वे की भाषा; ज़ुलू की बहन भाषा।",
    "c q x = तीन क्लिक-आवाज़ें (दाँत, तालु, बग़ल से); hl = ह्ल।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली उत्तरी-न्देबेले पोथी\" में है।",
   "abhyas": [
    [
     "c q x क्या हैं?",
     "क्लिक-आवाज़ें"
    ],
    [
     "\"hl\" की आवाज़?",
     "ह्ल"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "ngicela"
    },
    {
     "code": "s0009",
     "hl": "Ngiyathokoza"
    },
    {
     "code": "s0201",
     "hl": "umsebenzi"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "mina = मैं, wena = तुम, lina = आप सब, yena = वह (दोनों), thina = हम, bona = वे।",
    "क्रिया में छोटे निशान: ngi- = मैं, u- = तुम / वह, si- = हम।"
   ],
   "yaad": "ngi- · u- · si- · ba-",
   "abhyas": [
    [
     "\"ngi-\"?",
     "मैं"
    ],
    [
     "\"si-\"?",
     "हम"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "ngicela"
    },
    {
     "code": "s0044",
     "hl": "Ngifuna"
    },
    {
     "code": "s0009",
     "hl": "Ngiyathokoza"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "संज्ञा-वर्ग",
   "rule": [
    "the या a नहीं। संज्ञा के आगे वर्ग-उपसर्ग: um- (व्यक्ति), isi- (चीज़), in- …",
    "अनेक के लिए उपसर्ग बदलता है: umntwana → abantwana (बच्चे)।"
   ],
   "yaad": "संज्ञा-वर्ग · उपसर्ग से अनेक",
   "abhyas": [
    [
     "the जैसा शब्द?",
     "नहीं"
    ],
    [
     "अनेक कैसे?",
     "उपसर्ग बदलकर"
    ]
   ],
   "ex": [
    {
     "code": "s0060",
     "hl": "lo"
    },
    {
     "code": "s0024",
     "hl": "lokhu"
    },
    {
     "code": "s0199",
     "hl": "Lo"
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
     "code": "s0044",
     "hl": "Ngifuna"
    },
    {
     "code": "s0041",
     "hl": "Ngidinga"
    },
    {
     "code": "s0022",
     "hl": "ngicela"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया के आगे करने वाले का निशान: ngi-sebenza = मैं काम करता हूँ।",
    "ngu- / ngi- = है (पहचान): ngiyisisebenzi = मैं मज़दूर हूँ।"
   ],
   "yaad": "ngi- + क्रिया",
   "abhyas": [
    [
     "\"ngisebenza\"?",
     "मैं काम करता हूँ"
    ],
    [
     "\"ngi-\"?",
     "मैं"
    ]
   ],
   "ex": [
    {
     "code": "s0584",
     "hl": "Ngisebenza"
    },
    {
     "code": "s0044",
     "hl": "Ngifuna"
    },
    {
     "code": "s0041",
     "hl": "Ngidinga"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अंत -ile / -e: ngisebenzile = मैंने काम किया; kulungile = ठीक हो गया (ठीक है)।",
    "आदेश-रूप: ngithumele = मुझे भेजो।"
   ],
   "yaad": "-ile = बीता",
   "abhyas": [
    [
     "बीती बात का अंत?",
     "-ile / -e"
    ],
    [
     "\"kulungile\"?",
     "ठीक है (हो गया)"
    ]
   ],
   "ex": [
    {
     "code": "s0219",
     "hl": "Kulungile"
    },
    {
     "code": "s0845",
     "hl": "Ngithumele"
    },
    {
     "code": "s0037",
     "hl": "Ngitshengise"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: ngi-zo-: ngizokufonela = मैं तुम्हें फ़ोन करूँगा।",
    "kusasa = कल।"
   ],
   "yaad": "-zo- = आगे",
   "abhyas": [
    [
     "\"kusasa\"?",
     "कल"
    ],
    [
     "आने वाली बात का निशान?",
     "-zo-"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "kusasa"
    },
    {
     "code": "s0185",
     "hl": "Kusasa"
    },
    {
     "code": "s0217",
     "hl": "kusasa"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" दो हिस्सों में: a- … -i: angazi = मुझे नहीं पता।"
   ],
   "yaad": "a- … -i",
   "abhyas": [
    [
     "\"नहीं\" के दो हिस्से?",
     "a- … -i"
    ],
    [
     "\"angazi\"?",
     "मुझे नहीं पता"
    ]
   ],
   "ex": [
    {
     "code": "s0026",
     "hl": "Hatshi"
    },
    {
     "code": "s0237",
     "hl": "Hatshi"
    },
    {
     "code": "s0459",
     "hl": "Hatshi"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "kuyini (क्या), ngaphi (कहाँ), nini (कब), malini (कितने पैसे), njani (कैसे)।"
   ],
   "yaad": "ngaphi · malini · njani",
   "abhyas": [
    [
     "\"malini\"?",
     "कितने पैसे"
    ],
    [
     "\"ngaphi\"?",
     "कहाँ"
    ]
   ],
   "ex": [
    {
     "code": "s0101",
     "hl": "malini"
    },
    {
     "code": "s0062",
     "hl": "njani"
    },
    {
     "code": "s0005",
     "hl": "ngaphi"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "जगह के लिए आगे e- और अंत में -ini: indlu → endlini = घर में।",
    "la- / le- = साथ।"
   ],
   "yaad": "e- … -ini = में · la- = साथ",
   "abhyas": [
    [
     "\"endlini\"?",
     "घर में"
    ],
    [
     "\"la-\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0088",
     "hl": "ekhaya"
    },
    {
     "code": "s0197",
     "hl": "emsebenzini"
    },
    {
     "code": "s0187",
     "hl": "Ekuseni"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद, जोड़-शब्द से: indlu enkulu = बड़ा घर।",
    "kunye, kubili, kuthathu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → (जोड़) विशेषण",
   "abhyas": [
    [
     "\"kubili\"?",
     "दो"
    ],
    [
     "विशेषण कहाँ?",
     "संज्ञा के बाद"
    ]
   ],
   "ex": [
    {
     "code": "s0291",
     "hl": "ezimbili"
    },
    {
     "code": "s0121",
     "hl": "elilodwa"
    },
    {
     "code": "s0104",
     "hl": "kakhulu"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों को mnumzane (श्रीमान), umama कहकर।",
    "ngicela = कृपया, ngiyabonga = धन्यवाद, uxolo = माफ़ कीजिए।"
   ],
   "yaad": "ngicela · ngiyabonga · mnumzane",
   "abhyas": [
    [
     "\"ngiyabonga\"?",
     "धन्यवाद"
    ],
    [
     "\"mnumzane\"?",
     "श्रीमान"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "ngicela"
    },
    {
     "code": "s1780",
     "hl": "Ngiyabonga"
    },
    {
     "code": "s0220",
     "hl": "mnumzane"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID nort2795, 29-Oct-2026 को उतारा",
  "claims": [
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
    "claim": "0",
    "grambank": "0",
    "text": "\"the\" जैसा उपपद नहीं"
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
    "claim": "1",
    "grambank": "1",
    "text": "\"नहीं\" क्रिया के भीतर (प्रत्यय) भी लग सकता है"
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
