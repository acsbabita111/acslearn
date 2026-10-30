/* vyakaran_gla.js — "मेरा पहला स्कॉटिश-गेलिक व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "gla",
  "hi": "स्कॉटिश-गेलिक",
  "en": "Scottish Gaelic",
  "tts": "gd",
  "asr": "gd",
  "cover": {
   "native_title": "Mo chiad ghràmar",
   "book_words": [
    "mi",
    "sibh"
   ]
  },
  "slug": "scottishgaelic",
  "glottocode": "gae"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "स्कॉटिश-गेलिक कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में — सिर्फ़ 18 अक्षर। h दूसरे अक्षर को नरम करता है: bh / mh = व, ch = ख़।",
    "` (जैसे à, ò) = लंबा स्वर।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली स्कॉटिश-गेलिक पोथी\" में है।",
   "abhyas": [
    [
     "\"bh\" की आवाज़?",
     "व"
    ],
    [
     "कितने अक्षर?",
     "18"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "mi"
    },
    {
     "code": "s0004",
     "hl": "Tha"
    },
    {
     "code": "s0021",
     "hl": "Chan"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "mi = मैं, thu = तुम, sibh = आप, e = वह (पुरुष), i = वह (स्त्री), sinn = हम, iad = वे।"
   ],
   "yaad": "mi · thu · sibh · e · i",
   "abhyas": [
    [
     "\"मैं\"?",
     "mi"
    ],
    [
     "आदर से \"आप\"?",
     "sibh"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "mi"
    },
    {
     "code": "s0005",
     "hl": "thu"
    },
    {
     "code": "s1133",
     "hl": "sibh"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और लिंग",
   "rule": [
    "the = an / am / a' (a नहीं होता): an taigh = वह घर।",
    "दो लिंग; शब्द की शुरुआत भी बदलती है (नरम होना)।"
   ],
   "yaad": "an / am / a' = the · a नहीं",
   "abhyas": [
    [
     "\"an taigh\"?",
     "वह घर"
    ],
    [
     "\"a\" (एक) जैसा शब्द?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "an"
    },
    {
     "code": "s0046",
     "hl": "am"
    },
    {
     "code": "s0016",
     "hl": "a'"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → चीज़: Tha mi ag",
    "òl uisge = मैं पानी पी रहा हूँ (शब्दशः: है मैं पीते-हुए पानी)।",
    "हिंदी और अंग्रेज़ी दोनों से अलग क्रम।"
   ],
   "yaad": "क्रिया → करने वाला → चीज़",
   "abhyas": [
    [
     "क्रिया कहाँ?",
     "सबसे पहले"
    ],
    [
     "करने वाला कहाँ?",
     "क्रिया के बाद"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Tha"
    },
    {
     "code": "s0004",
     "hl": "Tha"
    },
    {
     "code": "s0298",
     "hl": "Bha"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया पहले: tha = है (अभी), is = है (पहचान): tha mi ag obair = मैं काम कर रहा हूँ।",
    "ag + क्रिया = रहा है।"
   ],
   "yaad": "tha · is · ag + क्रिया",
   "abhyas": [
    [
     "\"tha\"?",
     "है (अभी)"
    ],
    [
     "\"ag obair\"?",
     "काम करते हुए"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Tha"
    },
    {
     "code": "s0001",
     "hl": "Is"
    },
    {
     "code": "s0107",
     "hl": "ag"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: bha = था; क्रिया नरम होकर: rinn mi = मैंने किया, chaidh mi = मैं गया।"
   ],
   "yaad": "bha · rinn · chaidh",
   "abhyas": [
    [
     "\"bha\"?",
     "था"
    ],
    [
     "\"chaidh mi\"?",
     "मैं गया"
    ]
   ],
   "ex": [
    {
     "code": "s0298",
     "hl": "Bha"
    },
    {
     "code": "s0286",
     "hl": "Rinn"
    },
    {
     "code": "s0544",
     "hl": "Chaidh"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: bidh = होगा; -idh: cuiridh mi fòn = मैं फ़ोन करूँगा।",
    "a-màireach = कल।"
   ],
   "yaad": "bidh · -idh",
   "abhyas": [
    [
     "\"bidh\"?",
     "होगा"
    ],
    [
     "\"a-màireach\"?",
     "कल"
    ]
   ],
   "ex": [
    {
     "code": "s0277",
     "hl": "Bidh"
    },
    {
     "code": "s0020",
     "hl": "a-màireach"
    },
    {
     "code": "s0577",
     "hl": "Bidh"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = chan (क्रिया से पहले): chan eil = नहीं है: chan eil fios agam = मुझे नहीं पता।"
   ],
   "yaad": "chan + क्रिया",
   "abhyas": [
    [
     "\"chan eil\"?",
     "नहीं है"
    ],
    [
     "\"chan\" कहाँ?",
     "क्रिया से पहले"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Chan"
    },
    {
     "code": "s0255",
     "hl": "Cha"
    },
    {
     "code": "s0026",
     "hl": "Chan"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "dè (क्या), càite (कहाँ), cuin (कब), cò mheud (कितने), ciamar (कैसे)।",
    "हाँ/ना सवाल: a bheil … ? = क्या है?"
   ],
   "yaad": "a bheil … ? · dè · càite · ciamar",
   "abhyas": [
    [
     "\"càite\"?",
     "कहाँ"
    ],
    [
     "\"ciamar\"?",
     "कैसे"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "Dè"
    },
    {
     "code": "s0047",
     "hl": "Càite"
    },
    {
     "code": "s0010",
     "hl": "Ciamar"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: anns an taigh = घर में, à = से, do = को, airson = के लिए, le = साथ।",
    "संबंध-शब्द सर्वनाम से जुड़ जाते हैं: agam = मेरे पास।"
   ],
   "yaad": "anns · à · do · airson · le",
   "abhyas": [
    [
     "\"airson\"?",
     "के लिए"
    ],
    [
     "\"agam\"?",
     "मेरे पास"
    ]
   ],
   "ex": [
    {
     "code": "s0062",
     "hl": "ann"
    },
    {
     "code": "s0008",
     "hl": "airson"
    },
    {
     "code": "s0009",
     "hl": "do"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: taigh mòr = बड़ा घर।",
    "aon, dhà, trì = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"taigh mòr\"?",
     "बड़ा घर"
    ],
    [
     "\"trì\"?",
     "तीन"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "math"
    },
    {
     "code": "s0101",
     "hl": "mòr"
    },
    {
     "code": "s0109",
     "hl": "dhà"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "sibh = आप (आदर), thu = तुम।",
    "mas e do thoil e / mas e ur toil e = कृपया, tapadh leat / leibh = धन्यवाद,",
    "gabh mo leisgeul = माफ़ कीजिए।"
   ],
   "yaad": "sibh · mas e ur toil e · tapadh leibh",
   "abhyas": [
    [
     "\"tapadh leibh\"?",
     "धन्यवाद"
    ],
    [
     "\"mas e ur toil e\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0899",
     "hl": "toil"
    },
    {
     "code": "s0011",
     "hl": "tapadh"
    },
    {
     "code": "s0031",
     "hl": "leisgeul"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID gae, 29-Oct-2026 को उतारा; स्कॉटिश-गेलिक Grambank में नहीं है",
  "claims": [
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "VSO",
    "grambank": "VSO",
    "text": "वाक्य-क्रम: VSO"
   },
   {
    "path": 3,
    "gb": "WALS-37A",
    "claim": "Definite word distinct from demonstrative",
    "grambank": "Definite word distinct from demonstrative",
    "text": "\"the\" का रूप: Definite word distinct from demonstrative"
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
    "claim": "Noun-Adjective",
    "grambank": "Noun-Adjective",
    "text": "विशेषण-क्रम: Noun-Adjective"
   },
   {
    "path": 9,
    "gb": "WALS-116A",
    "claim": "Interrogative verb morphology",
    "grambank": "Interrogative verb morphology",
    "text": "हाँ/ना सवाल: Interrogative verb morphology"
   },
   {
    "path": 6,
    "gb": "WALS-69A",
    "claim": "Mixed type",
    "grambank": "Mixed type",
    "text": "काल का चिह्न: Mixed type"
   }
  ]
 }
};
