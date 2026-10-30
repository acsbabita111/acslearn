/* vyakaran_jv.js — "मेरा पहला जावानीज़ व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "jv",
  "hi": "जावानीज़",
  "en": "Javanese",
  "tts": "jv-ID",
  "asr": "jv-ID",
  "cover": {
   "native_title": "Gramatika kawitanku",
   "book_words": [
    "aku",
    "panjenengan"
   ]
  },
  "slug": "javanese",
  "glottocode": "java1254"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "जावानीज़ कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में। dh = ड, th = ट, ng = ङ, ny = ञ।",
    "a कई बार ऑ जैसा: lara = लॉरॉ।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली जावानीज़ पोथी\" में है।",
   "abhyas": [
    [
     "\"dh\" की आवाज़?",
     "ड"
    ],
    [
     "\"ny\"?",
     "ञ"
    ]
   ],
   "ex": [
    {
     "code": "s0235",
     "hl": "aku"
    },
    {
     "code": "s0237",
     "hl": "Ora"
    },
    {
     "code": "s0283",
     "hl": "aku"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "aku = मैं, kowe = तुम, sampeyan / panjenengan = आप (आदर), dheweke = वह (दोनों), awake dhewe = हम।",
    "जावानीज़ में बोली के स्तर हैं: ङोको (आम) और क्रामा (आदर)।"
   ],
   "yaad": "aku · kowe · sampeyan · dheweke",
   "abhyas": [
    [
     "\"मैं\"?",
     "aku"
    ],
    [
     "आदर की बोली?",
     "क्रामा"
    ]
   ],
   "ex": [
    {
     "code": "s0235",
     "hl": "aku"
    },
    {
     "code": "s0282",
     "hl": "Kowe"
    },
    {
     "code": "s0388",
     "hl": "Dheweke"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और अनेक?",
   "rule": [
    "the के लिए अंत में -e / -ne: omahe = वह घर।",
    "संज्ञा का लिंग नहीं; अनेक के लिए दोहराओ: omah-omah।"
   ],
   "yaad": "-e / -ne = the · दोहराना = अनेक",
   "abhyas": [
    [
     "\"omahe\"?",
     "वह घर"
    ],
    [
     "अनेक कैसे?",
     "शब्द दोहराकर"
    ]
   ],
   "ex": [
    {
     "code": "s0228",
     "hl": "iki"
    },
    {
     "code": "s0227",
     "hl": "kuwi"
    },
    {
     "code": "s0233",
     "hl": "iki"
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
     "code": "s0290",
     "hl": "butuh"
    },
    {
     "code": "s0936",
     "hl": "pengin"
    },
    {
     "code": "s0006",
     "hl": "nyambut"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; चल रहा काम: lagi + क्रिया।",
    "समय छोटे शब्दों से: wis (हो गया), arep (गा)।"
   ],
   "yaad": "lagi · wis · arep",
   "abhyas": [
    [
     "\"lagi\"?",
     "रहा है"
    ],
    [
     "क्रिया बदलती है?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0376",
     "hl": "ana"
    },
    {
     "code": "s0377",
     "hl": "ana"
    },
    {
     "code": "s0386",
     "hl": "Ana"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: wis + क्रिया: wis mangan = खा लिया; mau = पहले/अभी-अभी।"
   ],
   "yaad": "wis + क्रिया",
   "abhyas": [
    [
     "\"wis\"?",
     "हो गया"
    ],
    [
     "\"wis mangan\"?",
     "खा लिया"
    ]
   ],
   "ex": [
    {
     "code": "s0370",
     "hl": "wis"
    },
    {
     "code": "s0186",
     "hl": "wingi"
    },
    {
     "code": "s0297",
     "hl": "wingi"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "आने वाली बात: arep / bakal + क्रिया: arep nelpon = फ़ोन करूँगा।",
    "sesuk = कल।"
   ],
   "yaad": "arep / bakal + क्रिया",
   "abhyas": [
    [
     "\"sesuk\"?",
     "कल"
    ],
    [
     "\"arep\"?",
     "आगे (करूँगा)"
    ]
   ],
   "ex": [
    {
     "code": "s0400",
     "hl": "arep"
    },
    {
     "code": "s0284",
     "hl": "bakal"
    },
    {
     "code": "s0288",
     "hl": "bakal"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया से पहले ora: aku ora ngerti = मैं नहीं समझता।",
    "dudu = नहीं (वह नहीं)।"
   ],
   "yaad": "ora + क्रिया · dudu",
   "abhyas": [
    [
     "\"ora\"?",
     "नहीं"
    ],
    [
     "\"dudu\"?",
     "वह नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0237",
     "hl": "Ora"
    },
    {
     "code": "s0289",
     "hl": "dudu"
    },
    {
     "code": "s0288",
     "hl": "ora"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "apa (क्या), ngendi (कहाँ), kapan (कब), pira (कितना), piye (कैसे)।",
    "हाँ/ना सवाल: आवाज़ से, या शुरू में apa।"
   ],
   "yaad": "apa · ngendi · pira · piye",
   "abhyas": [
    [
     "\"ngendi\"?",
     "कहाँ"
    ],
    [
     "\"pira\"?",
     "कितना"
    ]
   ],
   "ex": [
    {
     "code": "s0282",
     "hl": "ngendi"
    },
    {
     "code": "s0171",
     "hl": "kapan"
    },
    {
     "code": "s0377",
     "hl": "ngendi"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ing omah = घर में, saka = से, menyang = की ओर, kanggo = के लिए, karo = साथ।"
   ],
   "yaad": "ing · saka · menyang · kanggo · karo",
   "abhyas": [
    [
     "\"saka\"?",
     "से"
    ],
    [
     "\"karo\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0282",
     "hl": "ing"
    },
    {
     "code": "s0371",
     "hl": "saka"
    },
    {
     "code": "s0390",
     "hl": "menyang"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: omah gedhe = बड़ा घर, kamar resik = साफ़ कमरा।",
    "siji, loro, telu = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"omah gedhe\"?",
     "बड़ा घर"
    ],
    [
     "\"resik\"?",
     "साफ़"
    ]
   ],
   "ex": [
    {
     "code": "s0611",
     "hl": "resik"
    },
    {
     "code": "s1564",
     "hl": "murah"
    },
    {
     "code": "s0238",
     "hl": "Apik"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों से क्रामा बोली: panjenengan = आप, matur nuwun = धन्यवाद।",
    "nyuwun pangapunten = माफ़ कीजिए, monggo = कृपया।"
   ],
   "yaad": "panjenengan · matur nuwun",
   "abhyas": [
    [
     "\"matur nuwun\"?",
     "धन्यवाद"
    ],
    [
     "\"nyuwun pangapunten\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0011",
     "hl": "matur"
    },
    {
     "code": "s0020",
     "hl": "Nuwun"
    },
    {
     "code": "s0029",
     "hl": "pangapunten"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID java1254, 29-Oct-2026 को उतारा",
  "claims": [
   {
    "path": 2,
    "gb": "GB030",
    "claim": "0",
    "grambank": "0",
    "text": "\"वह\" में लड़का-लड़की का भेद नहीं"
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
