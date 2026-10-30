/* vyakaran_ny.js — "मेरा पहला चिचेवा व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "ny",
  "hi": "चिचेवा",
  "en": "Chichewa",
  "tts": "ny-MW",
  "asr": "ny-MW",
  "cover": {
   "native_title": "Galamala yanga yoyamba",
   "book_words": [
    "ine",
    "inu"
   ]
  },
  "slug": "chichewa",
  "glottocode": "chw"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "चिचेवा कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। ch = च, ng' = ङ, dz = द्ज़, ts = त्स।",
    "संज्ञाएँ उपसर्ग से पहचानी जाती हैं: m- / mu- (एक), a- / anthu (अनेक)।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली चिचेवा पोथी\" में है।",
   "abhyas": [
    [
     "संज्ञा किससे पहचानी जाती है?",
     "उपसर्ग (शुरू के हिस्से) से"
    ],
    [
     "हर शब्द किस पर ख़त्म होता है?",
     "ज़्यादातर स्वर पर"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "ndi"
    },
    {
     "code": "s0011",
     "hl": "Ndili"
    },
    {
     "code": "s0061",
     "hl": "ali"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "ine = मैं, iwe = तुम, inu = आप, iye = वह (दोनों), ife = हम, iwo = वे।"
   ],
   "yaad": "ine · iwe · inu · iye · ife",
   "abhyas": [
    [
     "\"मैं\"?",
     "ine"
    ],
    [
     "आदर से \"आप\"?",
     "inu"
    ]
   ],
   "ex": [
    {
     "code": "s0675",
     "hl": "ine"
    },
    {
     "code": "s0773",
     "hl": "inu"
    },
    {
     "code": "s0878",
     "hl": "ife"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "संज्ञा-वर्ग (लिंग नहीं)?",
   "rule": [
    "लड़का-लड़की वाला लिंग नहीं — उपसर्ग-वर्ग: munthu (आदमी) → anthu (लोग)।",
    "the या a नहीं।"
   ],
   "yaad": "वर्ग = उपसर्ग",
   "abhyas": [
    [
     "\"anthu\"?",
     "लोग"
    ],
    [
     "the जैसा शब्द?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0089",
     "hl": "Ichi"
    },
    {
     "code": "s0012",
     "hl": "Uyu"
    },
    {
     "code": "s0501",
     "hl": "anthu"
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
     "hl": "Ndikufuna"
    },
    {
     "code": "s1203",
     "hl": "ndikugwira"
    },
    {
     "code": "s0043",
     "hl": "Ndikufuna"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया के आगे: ndi- = मैं: ndikugwira ntchito = मैं काम कर रहा हूँ।",
    "ndi = हूँ/है।"
   ],
   "yaad": "ndi- + क्रिया",
   "abhyas": [
    [
     "\"ndi-\"?",
     "मैं"
    ],
    [
     "\"ndili\"?",
     "मैं हूँ (जगह/हालत)"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "Ndili"
    },
    {
     "code": "s0012",
     "hl": "ndi"
    },
    {
     "code": "s1203",
     "hl": "ndikugwira"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: -na- / -da-: ndinabwera = मैं आया।"
   ],
   "yaad": "-na- = बीता",
   "abhyas": [
    [
     "\"ndinabwera\"?",
     "मैं आया"
    ],
    [
     "बीती बात का निशान?",
     "-na-"
    ]
   ],
   "ex": [
    {
     "code": "s0408",
     "hl": "Ndinaphunzira"
    },
    {
     "code": "s0845",
     "hl": "Ndinatumiza"
    },
    {
     "code": "s0311",
     "hl": "Ndinagwira"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: -dza-: ndidzabwera = मैं आऊँगा; mawa = कल।"
   ],
   "yaad": "-dza- = आगे",
   "abhyas": [
    [
     "\"mawa\"?",
     "कल"
    ],
    [
     "\"-dza-\"?",
     "आगे"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "mawa"
    },
    {
     "code": "s0185",
     "hl": "Mawa"
    },
    {
     "code": "s0217",
     "hl": "mawa"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\": si- / sindi-: sindikumva = मैं नहीं समझता।",
    "ayi = नहीं।"
   ],
   "yaad": "si- … · ayi",
   "abhyas": [
    [
     "\"ayi\"?",
     "नहीं"
    ],
    [
     "\"sindikumva\"?",
     "नहीं समझता"
    ]
   ],
   "ex": [
    {
     "code": "s0026",
     "hl": "Ayi"
    },
    {
     "code": "s0040",
     "hl": "Palibe"
    },
    {
     "code": "s0459",
     "hl": "Ayi"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "chiyani (क्या), kuti (कहाँ), liti (कब), zingati (कितना), bwanji (कैसे)।",
    "हाँ/ना सवाल: शुरू में kodi।"
   ],
   "yaad": "kodi … ? · kuti · zingati",
   "abhyas": [
    [
     "\"kuti\"?",
     "कहाँ"
    ],
    [
     "हाँ/ना सवाल का शब्द?",
     "kodi"
    ]
   ],
   "ex": [
    {
     "code": "s0016",
     "hl": "Kodi"
    },
    {
     "code": "s0005",
     "hl": "kuti"
    },
    {
     "code": "s0010",
     "hl": "bwanji"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ku nyumba = घर पर, mu = में, kuchokera = से, ndi = साथ।"
   ],
   "yaad": "ku · mu · kuchokera · ndi",
   "abhyas": [
    [
     "\"kuchokera\"?",
     "से"
    ],
    [
     "\"mu\"?",
     "में"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ku"
    },
    {
     "code": "s0929",
     "hl": "mu"
    },
    {
     "code": "s0442",
     "hl": "kuchokera"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: nyumba yaikulu = बड़ा घर।",
    "chimodzi, ziwiri, zitatu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"nyumba yaikulu\"?",
     "बड़ा घर"
    ],
    [
     "\"ziwiri\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "bwino"
    },
    {
     "code": "s1186",
     "hl": "yaikulu"
    },
    {
     "code": "s0209",
     "hl": "ziwiri"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "inu = आप (आदर) — एक व्यक्ति को भी।",
    "chonde = कृपया, zikomo = धन्यवाद, pepani = माफ़ कीजिए।"
   ],
   "yaad": "inu · chonde · zikomo",
   "abhyas": [
    [
     "\"zikomo\"?",
     "धन्यवाद"
    ],
    [
     "\"pepani\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "zikomo"
    },
    {
     "code": "s0022",
     "hl": "Chonde"
    },
    {
     "code": "s0029",
     "hl": "Pepani"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID chw, 29-Oct-2026 को उतारा; चिचेवा Grambank में नहीं है",
  "claims": [
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "SVO",
    "grambank": "SVO",
    "text": "वाक्य-क्रम: SVO"
   },
   {
    "path": 11,
    "gb": "WALS-87A",
    "claim": "Noun-Adjective",
    "grambank": "Noun-Adjective",
    "text": "विशेषण-क्रम: Noun-Adjective"
   },
   {
    "path": 9,
    "gb": "WALS-116A",
    "claim": "Question particle",
    "grambank": "Question particle",
    "text": "हाँ/ना सवाल: Question particle"
   }
  ]
 }
};
