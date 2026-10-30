/* vyakaran_su.js — "मेरा पहला सुंडानीज़ व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "su",
  "hi": "सुंडानीज़",
  "en": "Sundanese",
  "tts": "su-ID",
  "asr": "su-ID",
  "cover": {
   "native_title": "Tata basa munggaran abdi",
   "book_words": [
    "abdi",
    "anjeun"
   ]
  },
  "slug": "sundanese",
  "glottocode": "sund1252"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "सुंडानीज़ कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। eu = गले से यो (सुंडानीज़ का अपना), é = ए, e = हल्का अ।",
    "ng = ङ, ny = ञ, c = च।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली सुंडानीज़ पोथी\" में है।",
   "abhyas": [
    [
     "\"eu\" की आवाज़?",
     "गले से यो"
    ],
    [
     "\"c\"?",
     "च"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "abdi"
    },
    {
     "code": "s0016",
     "hl": "teu"
    },
    {
     "code": "s0002",
     "hl": "anjeun"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "abdi = मैं (आदर), aing = मैं (आम), anjeun = आप/तुम, manéhna = वह, urang = हम, maranéhna = वे।",
    "बोली के स्तर: लेमेस (आदर) और लोमा (आम)।"
   ],
   "yaad": "abdi · anjeun · manéhna · urang",
   "abhyas": [
    [
     "\"मैं\" (आदर)?",
     "abdi"
    ],
    [
     "\"हम\"?",
     "urang"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "abdi"
    },
    {
     "code": "s0002",
     "hl": "anjeun"
    },
    {
     "code": "s0495",
     "hl": "urang"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the के लिए téh / éta: imah téh = वह घर।",
    "संज्ञा का लिंग नहीं; अनेक: दोहराना या ar-/al- जोड़कर।"
   ],
   "yaad": "téh / éta = वह/the",
   "abhyas": [
    [
     "\"téh\"?",
     "वह/the का निशान"
    ],
    [
     "संज्ञा का लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "Ieu"
    },
    {
     "code": "s0660",
     "hl": "éta"
    },
    {
     "code": "s0532",
     "hl": "hiji"
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
     "hl": "butuh"
    },
    {
     "code": "s0059",
     "hl": "hoyong"
    },
    {
     "code": "s0043",
     "hl": "butuh"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; चल रहा काम: keur + क्रिया।",
    "aya = है (मौजूद)।"
   ],
   "yaad": "keur + क्रिया · aya",
   "abhyas": [
    [
     "\"keur\"?",
     "रहा है"
    ],
    [
     "\"aya\"?",
     "है (मौजूद)"
    ]
   ],
   "ex": [
    {
     "code": "s0288",
     "hl": "keur"
    },
    {
     "code": "s0040",
     "hl": "aya"
    },
    {
     "code": "s0131",
     "hl": "bade"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: tos / geus + क्रिया: abdi tos tuang = मैंने खा लिया।"
   ],
   "yaad": "tos / geus = हो गया",
   "abhyas": [
    [
     "\"tos\"?",
     "हो गया"
    ],
    [
     "\"geus\"?",
     "हो गया"
    ]
   ],
   "ex": [
    {
     "code": "s0559",
     "hl": "tos"
    },
    {
     "code": "s0158",
     "hl": "Geus"
    },
    {
     "code": "s0186",
     "hl": "Kamari"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: badé / rék + क्रिया: abdi badé nelepon = मैं फ़ोन करूँगा।",
    "énjing = कल।"
   ],
   "yaad": "badé + क्रिया",
   "abhyas": [
    [
     "\"badé\"?",
     "आगे (करूँगा)"
    ],
    [
     "\"énjing\"?",
     "कल"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "bade"
    },
    {
     "code": "s0132",
     "hl": "bade"
    },
    {
     "code": "s0219",
     "hl": "bade"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया से पहले teu / henteu: abdi teu ngartos = मैं नहीं समझता।",
    "sanés = वह नहीं।"
   ],
   "yaad": "teu + क्रिया · sanés",
   "abhyas": [
    [
     "\"teu\"?",
     "नहीं"
    ],
    [
     "\"sanés\"?",
     "वह नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0016",
     "hl": "teu"
    },
    {
     "code": "s0026",
     "hl": "Henteu"
    },
    {
     "code": "s0021",
     "hl": "teu"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "naon (क्या), dimana (कहाँ), iraha (कब), sabaraha (कितना), kumaha (कैसे)।",
    "हाँ/ना सवाल: आवाज़ से, या शुरू में naha।"
   ],
   "yaad": "naon · dimana · sabaraha · kumaha",
   "abhyas": [
    [
     "\"dimana\"?",
     "कहाँ"
    ],
    [
     "\"sabaraha\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Naon"
    },
    {
     "code": "s0047",
     "hl": "dimana"
    },
    {
     "code": "s0017",
     "hl": "sabaraha"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: di imah = घर में, ti = से, ka = की ओर, pikeun = के लिए, sareng = साथ।"
   ],
   "yaad": "di · ti · ka · pikeun · sareng",
   "abhyas": [
    [
     "\"ti\"?",
     "से"
    ],
    [
     "\"sareng\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0013",
     "hl": "di"
    },
    {
     "code": "s0003",
     "hl": "ti"
    },
    {
     "code": "s0008",
     "hl": "ka"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: imah gedé = बड़ा घर।",
    "hiji, dua, tilu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"imah gedé\"?",
     "बड़ा घर"
    ],
    [
     "\"dua\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0629",
     "hl": "saé"
    },
    {
     "code": "s0018",
     "hl": "dua"
    },
    {
     "code": "s0163",
     "hl": "Tilu"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों से लेमेस बोली: abdi, anjeun, tuang (खाना), damel (काम)।",
    "punten = माफ़ कीजिए / कृपया, hatur nuhun = धन्यवाद।"
   ],
   "yaad": "punten · hatur nuhun",
   "abhyas": [
    [
     "\"hatur nuhun\"?",
     "धन्यवाद"
    ],
    [
     "\"punten\"?",
     "माफ़ कीजिए / कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0685",
     "hl": "Punten"
    },
    {
     "code": "s0011",
     "hl": "hatur"
    },
    {
     "code": "s0028",
     "hl": "nuhun"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID sund1252, 29-Oct-2026 को उतारा",
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
    "claim": "0",
    "grambank": "0",
    "text": "अनेक के लिए संज्ञा पर ज़रूरी चिह्न नहीं"
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
    "claim": "1",
    "grambank": "1",
    "text": "गिनती के साथ वर्ग-शब्द (classifier)"
   }
  ]
 }
};
