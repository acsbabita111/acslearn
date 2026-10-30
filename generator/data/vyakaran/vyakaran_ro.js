/* vyakaran_ro.js — "मेरा पहला रोमानियाई व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "ro",
  "hi": "रोमानियाई",
  "en": "Romanian",
  "tts": "ro-RO",
  "asr": "ro-RO",
  "cover": {
   "native_title": "Prima mea gramatică",
   "book_words": [
    "eu",
    "dumneavoastră"
   ]
  },
  "slug": "romanian",
  "glottocode": "rom"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "रोमानियाई कैसे पढ़ें?",
   "rule": [
    "रोमन अक्षरों में, ख़ास अक्षरों के साथ: ă = हल्का अ, â/î = गले से इ, ș = श, ț = त्स।",
    "ce/ci = चे/ची, che/chi = के/की।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली रोमानियाई पोथी\" में है।",
   "abhyas": [
    [
     "\"ș\" की आवाज़?",
     "श"
    ],
    [
     "\"ț\"?",
     "त्स"
    ]
   ],
   "ex": [
    {
     "code": "s1972",
     "hl": "Eu"
    },
    {
     "code": "s0021",
     "hl": "Nu"
    },
    {
     "code": "s0012",
     "hl": "este"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "eu = मैं, tu = तुम, dumneavoastră = आप, el = वह (पुरुष), ea = वह (स्त्री), noi = हम, ei = वे।"
   ],
   "yaad": "eu · tu · dumneavoastră · el · ea",
   "abhyas": [
    [
     "\"मैं\"?",
     "eu"
    ],
    [
     "आदर से \"आप\"?",
     "dumneavoastră"
    ]
   ],
   "ex": [
    {
     "code": "s1972",
     "hl": "Eu"
    },
    {
     "code": "s0012",
     "hl": "El"
    },
    {
     "code": "s0517",
     "hl": "ea"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the कहाँ लगता है?",
   "rule": [
    "the शब्द के अंत में जुड़ता है: casă (घर) → casa (वह घर), lup → lupul।",
    "a = un / o। तीन लिंग जैसे वर्ग: पुल्लिंग, स्त्रीलिंग, और मिला-जुला।"
   ],
   "yaad": "the = शब्द का अंत (-ul, -a)",
   "abhyas": [
    [
     "\"casa\" में the कहाँ?",
     "अंत में -a"
    ],
    [
     "\"un\"?",
     "एक"
    ]
   ],
   "ex": [
    {
     "code": "s0034",
     "hl": "un"
    },
    {
     "code": "s0089",
     "hl": "o"
    },
    {
     "code": "s0097",
     "hl": "Acesta"
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
     "hl": "nevoie"
    },
    {
     "code": "s0059",
     "hl": "Vreau"
    },
    {
     "code": "s0201",
     "hl": "Caut"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "sunt = हूँ, este = है। क्रिया का अंत: eu lucrez (मैं काम करता हूँ), el lucrează (वह करता है)।"
   ],
   "yaad": "eu … · el … -ă",
   "abhyas": [
    [
     "\"sunt\"?",
     "हूँ"
    ],
    [
     "\"lucrez\" — कौन?",
     "मैं"
    ]
   ],
   "ex": [
    {
     "code": "s0006",
     "hl": "Sunt"
    },
    {
     "code": "s0008",
     "hl": "Am"
    },
    {
     "code": "s0012",
     "hl": "este"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "am + क्रिया का रूप: am lucrat = मैंने काम किया, am venit = मैं आया।"
   ],
   "yaad": "am + …at / …it",
   "abhyas": [
    [
     "\"am venit\"?",
     "मैं आया"
    ],
    [
     "\"am lucrat\"?",
     "मैंने काम किया"
    ]
   ],
   "ex": [
    {
     "code": "s0008",
     "hl": "Am"
    },
    {
     "code": "s0289",
     "hl": "fost"
    },
    {
     "code": "s0411",
     "hl": "lucrat"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "o să + क्रिया: o să sun = मैं फ़ोन करूँगा। या voi + क्रिया।",
    "mâine = कल (आने वाला)।"
   ],
   "yaad": "o să + क्रिया",
   "abhyas": [
    [
     "\"mâine\"?",
     "कल"
    ],
    [
     "\"o să sun\"?",
     "फ़ोन करूँगा"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "Voi"
    },
    {
     "code": "s0020",
     "hl": "mâine"
    },
    {
     "code": "s0042",
     "hl": "să"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया से पहले nu: nu înțeleg = मैं नहीं समझता।",
    "nu e = नहीं है।"
   ],
   "yaad": "nu + क्रिया",
   "abhyas": [
    [
     "\"nu\" कहाँ?",
     "क्रिया से पहले"
    ],
    [
     "\"nu înțeleg\"?",
     "नहीं समझता"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "Nu"
    },
    {
     "code": "s0026",
     "hl": "Nu"
    },
    {
     "code": "s0039",
     "hl": "Nu"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "ce (क्या), unde (कहाँ), când (कब), cât (कितना), cum (कैसे)।",
    "हाँ/ना सवाल में बस आवाज़ उठाओ।"
   ],
   "yaad": "ce · unde · cât · cum",
   "abhyas": [
    [
     "\"unde\"?",
     "कहाँ"
    ],
    [
     "\"cât\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0010",
     "hl": "Ce"
    },
    {
     "code": "s0005",
     "hl": "unde"
    },
    {
     "code": "s0101",
     "hl": "Cât"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: în casă = घर में, din = से, la = को/पर, pentru = के लिए, cu = साथ।"
   ],
   "yaad": "în · din · la · pentru · cu",
   "abhyas": [
    [
     "\"pentru\"?",
     "के लिए"
    ],
    [
     "\"cu\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0098",
     "hl": "în"
    },
    {
     "code": "s0003",
     "hl": "din"
    },
    {
     "code": "s0020",
     "hl": "La"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण ज़्यादातर संज्ञा के बाद: casă mare = बड़ा घर।",
    "unu, doi, trei = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"casă mare\"?",
     "बड़ा घर"
    ],
    [
     "\"doi\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0009",
     "hl": "bine"
    },
    {
     "code": "s0505",
     "hl": "mare"
    },
    {
     "code": "s0153",
     "hl": "doi"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "dumneavoastră = आप (बहुत आदर)।",
    "vă rog = कृपया, mulțumesc = धन्यवाद, scuzați = माफ़ कीजिए।"
   ],
   "yaad": "dumneavoastră · vă rog · mulțumesc",
   "abhyas": [
    [
     "\"mulțumesc\"?",
     "धन्यवाद"
    ],
    [
     "\"vă rog\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "mulțumesc"
    },
    {
     "code": "s0022",
     "hl": "rog"
    },
    {
     "code": "s1241",
     "hl": "dumneavoastră"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID rom, 29-Oct-2026 को उतारा; रोमानियाई Grambank में नहीं है",
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
    "claim": "Noun-Adjective",
    "grambank": "Noun-Adjective",
    "text": "विशेषण-क्रम: Noun-Adjective"
   },
   {
    "path": 9,
    "gb": "WALS-116A",
    "claim": "Interrogative intonation only",
    "grambank": "Interrogative intonation only",
    "text": "हाँ/ना सवाल: Interrogative intonation only"
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
