/* vyakaran_mg.js — "मेरा पहला मलागासी व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "mg",
  "hi": "मलागासी",
  "en": "Malagasy",
  "tts": "mg-MG",
  "asr": "mg-MG",
  "cover": {
   "native_title": "Fitsipi-pitenenana voalohany",
   "book_words": [
    "izaho",
    "ianao"
   ]
  },
  "slug": "malagasy",
  "glottocode": "plat1254"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "मलागासी कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। o = उ, j = द्ज़, शब्द के अंत में y = इ।",
    "शब्द का आख़िरी स्वर अक्सर बहुत हल्का बोला जाता है।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली मलागासी पोथी\" में है।",
   "abhyas": [
    [
     "\"o\" की आवाज़?",
     "उ"
    ],
    [
     "\"j\"?",
     "द्ज़"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "aho"
    },
    {
     "code": "s0021",
     "hl": "Tsy"
    },
    {
     "code": "s0005",
     "hl": "ianao"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "aho / izaho = मैं, ianao = तुम/आप, izy = वह (दोनों)।",
    "isika = हम (सुनने वाले समेत), izahay = हम (बिना), izy ireo = वे।"
   ],
   "yaad": "aho · ianao · izy · isika · izahay",
   "abhyas": [
    [
     "\"मैं\"?",
     "aho / izaho"
    ],
    [
     "सुनने वाले समेत \"हम\"?",
     "isika"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "aho"
    },
    {
     "code": "s0005",
     "hl": "ianao"
    },
    {
     "code": "s0236",
     "hl": "izy"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और लिंग?",
   "rule": [
    "the = ny: ny trano = वह घर। लिंग नहीं।",
    "अनेक के लिए संज्ञा नहीं बदलती।"
   ],
   "yaad": "ny = the · लिंग नहीं",
   "abhyas": [
    [
     "\"ny\"?",
     "the"
    ],
    [
     "संज्ञा का लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Ny"
    },
    {
     "code": "s0012",
     "hl": "Ity"
    },
    {
     "code": "s0034",
     "hl": "iray"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले, करने वाला सबसे अंत में: Mila rano aho = मुझे पानी चाहिए (शब्दशः: चाहिए पानी मैं)।",
    "यह हिंदी और अंग्रेज़ी दोनों से उलटा है।"
   ],
   "yaad": "क्रिया → चीज़ → करने वाला",
   "abhyas": [
    [
     "क्रिया कहाँ?",
     "सबसे पहले"
    ],
    [
     "करने वाला कहाँ?",
     "सबसे अंत में"
    ]
   ],
   "ex": [
    {
     "code": "s0041",
     "hl": "Mila"
    },
    {
     "code": "s0201",
     "hl": "Mitady"
    },
    {
     "code": "s0168",
     "hl": "miasa"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "अभी: क्रिया m- से: miasa aho = मैं काम करता हूँ।"
   ],
   "yaad": "m- = अभी",
   "abhyas": [
    [
     "\"miasa aho\"?",
     "मैं काम करता हूँ"
    ],
    [
     "अभी का निशान?",
     "m-"
    ]
   ],
   "ex": [
    {
     "code": "s0086",
     "hl": "manana"
    },
    {
     "code": "s0168",
     "hl": "miasa"
    },
    {
     "code": "s0106",
     "hl": "Manana"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: m- की जगह n-: niasa aho = मैंने काम किया; tonga = आ गया।"
   ],
   "yaad": "n- = बीता",
   "abhyas": [
    [
     "बीती बात का निशान?",
     "n-"
    ],
    [
     "\"niasa\"?",
     "काम किया"
    ]
   ],
   "ex": [
    {
     "code": "s0431",
     "hl": "na"
    },
    {
     "code": "s0008",
     "hl": "Tonga"
    },
    {
     "code": "s0286",
     "hl": "Nanao"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: m- की जगह h-: hiasa aho = मैं काम करूँगा।",
    "rahampitso = कल (आने वाला)।"
   ],
   "yaad": "h- = आगे",
   "abhyas": [
    [
     "आने वाली बात का निशान?",
     "h-"
    ],
    [
     "\"rahampitso\"?",
     "कल"
    ]
   ],
   "ex": [
    {
     "code": "s0062",
     "hl": "ho"
    },
    {
     "code": "s0020",
     "hl": "rahampitso"
    },
    {
     "code": "s0204",
     "hl": "ho"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\" = tsy, क्रिया से पहले: tsy azoko = मैं नहीं समझा।",
    "tsia = नहीं (उत्तर)।"
   ],
   "yaad": "tsy + क्रिया",
   "abhyas": [
    [
     "\"tsy\" कहाँ?",
     "क्रिया से पहले"
    ],
    [
     "\"tsia\"?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Tsy"
    },
    {
     "code": "s0026",
     "hl": "Tsia"
    },
    {
     "code": "s0039",
     "hl": "Tsy"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "हाँ/ना सवाल: ve: Azonao ve? = समझे?",
    "inona (क्या), aiza (कहाँ), rahoviana (कब), ohatrinona (कितना), ahoana (कैसे)।"
   ],
   "yaad": "… ve? · inona · aiza",
   "abhyas": [
    [
     "\"aiza\"?",
     "कहाँ"
    ],
    [
     "हाँ/ना सवाल का शब्द?",
     "ve"
    ]
   ],
   "ex": [
    {
     "code": "s0016",
     "hl": "ve"
    },
    {
     "code": "s0024",
     "hl": "Inona"
    },
    {
     "code": "s0005",
     "hl": "aiza"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ao an-trano = घर में, avy any = से, ho an'ny = के लिए, amin'ny = में/साथ।"
   ],
   "yaad": "ao · avy · ho an'ny · amin'ny",
   "abhyas": [
    [
     "\"avy\"?",
     "से"
    ],
    [
     "\"ho an'ny\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0164",
     "hl": "ao"
    },
    {
     "code": "s0003",
     "hl": "Avy"
    },
    {
     "code": "s0132",
     "hl": "amin'ny"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: trano lehibe = बड़ा घर।",
    "iray, roa, telo = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"trano lehibe\"?",
     "बड़ा घर"
    ],
    [
     "\"roa\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "Tsara"
    },
    {
     "code": "s0520",
     "hl": "lehibe"
    },
    {
     "code": "s0109",
     "hl": "roa"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों को Tompoko (सर/मैडम) कहकर।",
    "azafady = कृपया, misaotra = धन्यवाद, miala tsiny = माफ़ कीजिए।"
   ],
   "yaad": "azafady · misaotra",
   "abhyas": [
    [
     "\"misaotra\"?",
     "धन्यवाद"
    ],
    [
     "\"azafady\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "misaotra"
    },
    {
     "code": "s0022",
     "hl": "Azafady"
    },
    {
     "code": "s0220",
     "hl": "tompoko"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID plat1254, 29-Oct-2026 को उतारा",
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
    "gb": "GB044",
    "claim": "0",
    "grambank": "0",
    "text": "अनेक के लिए संज्ञा पर ज़रूरी चिह्न नहीं"
   },
   {
    "path": 4,
    "gb": "GB131",
    "claim": "1",
    "grambank": "1",
    "text": "क्रिया वाक्य की शुरुआत में"
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
