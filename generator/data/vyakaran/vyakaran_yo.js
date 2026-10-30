/* vyakaran_yo.js — "मेरा पहला योरूबा व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "yo",
  "hi": "योरूबा",
  "en": "Yoruba",
  "tts": "yo-NG",
  "asr": "yo-NG",
  "cover": {
   "native_title": "Gírámà àkọ́kọ́ mi",
   "book_words": [
    "èmi",
    "ẹ̀yin"
   ]
  },
  "slug": "yoruba",
  "glottocode": "yor"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "योरूबा कैसे पढ़ें?",
   "rule": [
    "लातिन अक्षरों में, नीचे बिंदु वाले अक्षर: ẹ = ऐ, ọ = ऑ, ṣ = श; p = क्प, gb = ग्ब।",
    "तीन सुर: ऊपर ´ ऊँचा, नीचे ` नीचा, बिना निशान बीच का।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली योरूबा पोथी\" में है।",
   "abhyas": [
    [
     "\"ṣ\" की आवाज़?",
     "श"
    ],
    [
     "कितने सुर?",
     "तीन"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Mo"
    },
    {
     "code": "s0001",
     "hl": "ni"
    },
    {
     "code": "s0040",
     "hl": "Kò"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, आप?",
   "rule": [
    "mo / èmi = मैं, o / ìwọ = तुम, ẹ / ẹ̀yin = आप, ó / òun = वह (दोनों),",
    "a / àwa = हम, wọ́n = वे।"
   ],
   "yaad": "mo · o · ẹ · ó · a · wọ́n",
   "abhyas": [
    [
     "\"मैं\"?",
     "mo"
    ],
    [
     "\"वह\" में लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "Mo"
    },
    {
     "code": "s0011",
     "hl": "ẹ"
    },
    {
     "code": "s0027",
     "hl": "Ó"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा और लिंग",
   "q": "the और लिंग?",
   "rule": [
    "the या a नहीं, लिंग नहीं।",
    "अनेक के लिए संज्ञा से पहले àwọn: àwọn ilé = घर (अनेक)।"
   ],
   "yaad": "न the, न लिंग · अनेक = àwọn",
   "abhyas": [
    [
     "the जैसा शब्द?",
     "नहीं"
    ],
    [
     "\"àwọn\"?",
     "अनेक का निशान"
    ]
   ],
   "ex": [
    {
     "code": "s0266",
     "hl": "àwọn"
    },
    {
     "code": "s0060",
     "hl": "yìí"
    },
    {
     "code": "s0108",
     "hl": "kan"
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
     "hl": "fẹ́"
    },
    {
     "code": "s0754",
     "hl": "nílò"
    },
    {
     "code": "s0003",
     "hl": "wá"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\"?",
   "rule": [
    "क्रिया नहीं बदलती; चल रहे काम के लिए ń: mo ń ṣiṣẹ́ = मैं काम कर रहा हूँ।"
   ],
   "yaad": "ń = चल रहा",
   "abhyas": [
    [
     "\"ń\"?",
     "चल रहा"
    ],
    [
     "क्रिया बदलती है?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0045",
     "hl": "ń"
    },
    {
     "code": "s0001",
     "hl": "ni"
    },
    {
     "code": "s0011",
     "hl": "wà"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "बीती बात: अक्सर बस क्रिया; ti = कर चुका: mo ti jẹun = मैंने खा लिया।"
   ],
   "yaad": "ti + क्रिया = कर चुका",
   "abhyas": [
    [
     "\"ti\"?",
     "कर चुका"
    ],
    [
     "\"mo ti jẹun\"?",
     "मैंने खा लिया"
    ]
   ],
   "ex": [
    {
     "code": "s0005",
     "hl": "ti"
    },
    {
     "code": "s0017",
     "hl": "ti"
    },
    {
     "code": "s0160",
     "hl": "ti"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "máa / yóò + क्रिया: màá pè = मैं फ़ोन करूँगा।",
    "ọ̀la = कल (आने वाला)।"
   ],
   "yaad": "máa / yóò + क्रिया",
   "abhyas": [
    [
     "\"ọ̀la\"?",
     "कल"
    ],
    [
     "आने वाली बात का शब्द?",
     "máa / yóò"
    ]
   ],
   "ex": [
    {
     "code": "s0062",
     "hl": "máa"
    },
    {
     "code": "s0355",
     "hl": "yóò"
    },
    {
     "code": "s0020",
     "hl": "ọ̀la"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "\"नहीं\": kò / kò … क्रिया से पहले: kò yé mi = मुझे समझ नहीं आया।",
    "rárá = बिल्कुल नहीं।"
   ],
   "yaad": "kò + क्रिया",
   "abhyas": [
    [
     "\"kò\"?",
     "नहीं"
    ],
    [
     "\"rárá\"?",
     "बिल्कुल नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0040",
     "hl": "Kò"
    },
    {
     "code": "s0459",
     "hl": "Rárá"
    },
    {
     "code": "s0289",
     "hl": "Kì"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "kí ni (क्या), níbo (कहाँ), ìgbà wo (कब), mélòó (कितना), báwo (कैसे)।",
    "हाँ/ना सवाल: शुरू में ṣé।"
   ],
   "yaad": "ṣé … ? · kí ni · níbo",
   "abhyas": [
    [
     "\"níbo\"?",
     "कहाँ"
    ],
    [
     "हाँ/ना सवाल का शब्द?",
     "ṣé"
    ]
   ],
   "ex": [
    {
     "code": "s0010",
     "hl": "Ṣé"
    },
    {
     "code": "s1143",
     "hl": "níbo"
    },
    {
     "code": "s0243",
     "hl": "Báwo"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: ní ilé = घर में, láti = से, sí = को, fún = के लिए, pẹ̀lú = साथ।"
   ],
   "yaad": "ní · láti · sí · fún · pẹ̀lú",
   "abhyas": [
    [
     "\"fún\"?",
     "के लिए"
    ],
    [
     "\"pẹ̀lú\"?",
     "साथ"
    ]
   ],
   "ex": [
    {
     "code": "s0006",
     "hl": "ní"
    },
    {
     "code": "s0003",
     "hl": "láti"
    },
    {
     "code": "s0040",
     "hl": "sí"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: ilé ńlá = बड़ा घर।",
    "ọ̀kan, méjì, mẹ́ta = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"ilé ńlá\"?",
     "बड़ा घर"
    ],
    [
     "\"méjì\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0027",
     "hl": "dára"
    },
    {
     "code": "s0520",
     "hl": "ńlá"
    },
    {
     "code": "s0109",
     "hl": "méjì"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों के लिए ẹ (आप) — एक व्यक्ति को भी।",
    "jọ̀wọ́ = कृपया, ẹ ṣé = धन्यवाद, ẹ má bínú = माफ़ कीजिए।"
   ],
   "yaad": "ẹ · jọ̀wọ́ · ẹ ṣé",
   "abhyas": [
    [
     "\"ẹ ṣé\"?",
     "धन्यवाद"
    ],
    [
     "\"jọ̀wọ́\"?",
     "कृपया"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Jọ̀wọ́"
    },
    {
     "code": "s0010",
     "hl": "Ṣé"
    },
    {
     "code": "s0011",
     "hl": "ẹ"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID yor, 29-Oct-2026 को उतारा; योरूबा Grambank में नहीं है",
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
    "claim": "No definite or indefinite article",
    "grambank": "No definite or indefinite article",
    "text": "\"the\" का रूप: No definite or indefinite article"
   },
   {
    "path": 8,
    "gb": "WALS-112A",
    "claim": "Negative word, unclear if verb or particle",
    "grambank": "Negative word, unclear if verb or particle",
    "text": "\"नहीं\" का रूप: Negative word, unclear if verb or particle"
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
    "claim": "No tense-aspect inflection",
    "grambank": "No tense-aspect inflection",
    "text": "काल का चिह्न: No tense-aspect inflection"
   }
  ]
 }
};
