/* vyakaran_rw.js — "मेरा पहला किन्यारवांडा व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "rw",
  "hi": "किन्यारवांडा",
  "en": "Kinyarwanda",
  "tts": "rw-RW",
  "asr": "rw-RW",
  "cover": {
   "native_title": "Ikibonezamvugo cyanjye cya mbere",
   "book_words": [
    "jye",
    "wowe"
   ]
  },
  "slug": "kinyarwanda",
  "glottocode": "kin"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "किन्यारवांडा कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। c = च, r = र (l की जगह भी), जोड़ी-अक्षर: cy = च्य, sh = श, ny = न्य।",
    "संज्ञाएँ उपसर्ग से पहचानी जाती हैं: umu- (एक), aba- (अनेक)।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली किन्यारवांडा पोथी\" में है।",
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
     "code": "s0001",
     "hl": "ni"
    },
    {
     "code": "s0006",
     "hl": "Ndi"
    },
    {
     "code": "s0040",
     "hl": "Nta"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "jye / njye = मैं, wowe = तुम, we = वह (दोनों), twe = हम, mwe = आप सब, bo = वे।",
    "क्रिया में छोटा रूप: n- = मैं, u- = तुम, a- = वह।"
   ],
   "yaad": "jye · wowe · we · twe",
   "abhyas": [
    [
     "\"मैं\"?",
     "jye"
    ],
    [
     "\"वह\" में लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0675",
     "hl": "njye"
    },
    {
     "code": "s0773",
     "hl": "wowe"
    },
    {
     "code": "s0878",
     "hl": "twe"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "संज्ञा-वर्ग (लिंग नहीं)?",
   "rule": [
    "लड़का-लड़की वाला लिंग नहीं — संज्ञाएँ उपसर्ग-वर्गों में: umuntu (आदमी) → abantu (लोग)।",
    "the या a नहीं।"
   ],
   "yaad": "वर्ग = उपसर्ग",
   "abhyas": [
    [
     "\"abantu\"?",
     "लोग"
    ],
    [
     "the जैसा शब्द?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "iki"
    },
    {
     "code": "s0012",
     "hl": "Uyu"
    },
    {
     "code": "s0778",
     "hl": "abantu"
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
     "hl": "Ndashaka"
    },
    {
     "code": "s0041",
     "hl": "Nkeneye"
    },
    {
     "code": "s0242",
     "hl": "Nkora"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया के आगे करने वाले का उपसर्ग: ndakora = मैं काम करता हूँ। ni = है।"
   ],
   "yaad": "n- + क्रिया",
   "abhyas": [
    [
     "\"ni\"?",
     "है"
    ],
    [
     "\"ndakora\"?",
     "मैं काम करता हूँ"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "ni"
    },
    {
     "code": "s0006",
     "hl": "Ndi"
    },
    {
     "code": "s0018",
     "hl": "Mfite"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अंत बदलता है: nakoze = मैंने काम किया; naje = मैं आया।"
   ],
   "yaad": "अंत -ze / -je = बीता",
   "abhyas": [
    [
     "\"naje\"?",
     "मैं आया"
    ],
    [
     "बीती बात कैसे?",
     "क्रिया का अंत बदलता है"
    ]
   ],
   "ex": [
    {
     "code": "s0286",
     "hl": "Nakoze"
    },
    {
     "code": "s0008",
     "hl": "Naje"
    },
    {
     "code": "s0868",
     "hl": "Nari"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: -za- / -zaa-: nzaza = मैं आऊँगा; ejo = कल।"
   ],
   "yaad": "-za- = आगे",
   "abhyas": [
    [
     "\"ejo\"?",
     "कल"
    ],
    [
     "\"nzaza\"?",
     "मैं आऊँगा"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "ejo"
    },
    {
     "code": "s0219",
     "hl": "nzaza"
    },
    {
     "code": "s1360",
     "hl": "nza"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" क्रिया के आगे: nti- / si-: simbyumva = मैं नहीं समझता; nta = नहीं है।",
    "oya = नहीं।"
   ],
   "yaad": "nti- / si- · oya",
   "abhyas": [
    [
     "\"oya\"?",
     "नहीं"
    ],
    [
     "\"nta\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0026",
     "hl": "Oya"
    },
    {
     "code": "s0040",
     "hl": "Nta"
    },
    {
     "code": "s0137",
     "hl": "si"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "iki (क्या), he (कहाँ), ryari (कब), angahe (कितना), gute (कैसे)।",
    "हाँ/ना सवाल: आवाज़ से।"
   ],
   "yaad": "iki · he · angahe · gute",
   "abhyas": [
    [
     "\"he\"?",
     "कहाँ"
    ],
    [
     "\"angahe\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "iki"
    },
    {
     "code": "s0005",
     "hl": "he"
    },
    {
     "code": "s0101",
     "hl": "angahe"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: mu nzu = घर में, ku = पर/को, kuva = से, na = साथ।"
   ],
   "yaad": "mu · ku · kuva · na",
   "abhyas": [
    [
     "\"mu\"?",
     "में"
    ],
    [
     "\"na\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0004",
     "hl": "mu"
    },
    {
     "code": "s0008",
     "hl": "ku"
    },
    {
     "code": "s0641",
     "hl": "kuva"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद, उपसर्ग से मेल: inzu nini = बड़ा घर।",
    "rimwe, kabiri, gatatu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"inzu nini\"?",
     "बड़ा घर"
    ],
    [
     "\"kabiri\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0048",
     "hl": "neza"
    },
    {
     "code": "s0676",
     "hl": "nini"
    },
    {
     "code": "s0533",
     "hl": "kabiri"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों को आदर से: mwe (आप) बहुवचन में।",
    "nyabuneka = कृपया, murakoze = धन्यवाद, mumbabarire = माफ़ कीजिए।"
   ],
   "yaad": "murakoze · nyabuneka",
   "abhyas": [
    [
     "\"murakoze\"?",
     "धन्यवाद"
    ],
    [
     "\"nyabuneka\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "murakoze"
    },
    {
     "code": "s0028",
     "hl": "Murakoze"
    },
    {
     "code": "s0220",
     "hl": "Murakoze"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID kin, 29-Oct-2026 को उतारा; किन्यारवांडा Grambank में नहीं है",
  "claims": [
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "SVO",
    "grambank": "SVO",
    "text": "वाक्य-क्रम: SVO"
   },
   {
    "path": 8,
    "gb": "WALS-112A",
    "claim": "Negative affix",
    "grambank": "Negative affix",
    "text": "\"नहीं\" का रूप: Negative affix"
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
    "claim": "Noun-Adjective",
    "grambank": "Noun-Adjective",
    "text": "विशेषण-क्रम: Noun-Adjective"
   },
   {
    "path": 6,
    "gb": "WALS-69A",
    "claim": "Tense-aspect prefixes",
    "grambank": "Tense-aspect prefixes",
    "text": "काल का चिह्न: Tense-aspect prefixes"
   }
  ]
 }
};
