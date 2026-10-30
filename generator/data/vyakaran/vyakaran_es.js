/* vyakaran_es.js — "मेरा पहला स्पेनिश व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "es",
  "hi": "स्पेनिश",
  "en": "Spanish",
  "tts": "es-ES",
  "asr": "es-ES",
  "cover": {
   "native_title": "Mi primera gramática",
   "book_words": [
    "yo",
    "usted"
   ]
  },
  "slug": "spanish",
  "glottocode": "stan1288"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "स्पेनिश के अक्षर कैसे पढ़ें?",
   "rule": [
    "स्पेनिश जैसी लिखी जाती है, लगभग वैसी ही बोली जाती है।",
    "j = ख़, ll = य, ñ = न्य, h चुप रहता है: hola = ओला।",
    "v भी b जैसा बोला जाता है: vaca = बाका।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली स्पेनिश पोथी\" में है।",
   "abhyas": [
    [
     "\"j\" की आवाज़?",
     "ख़"
    ],
    [
     "\"hola\" में h?",
     "चुप"
    ]
   ],
   "ex": [
    {
     "code": "s0441",
     "hl": "Hola"
    },
    {
     "code": "s0197",
     "hl": "trabajo"
    },
    {
     "code": "s0001",
     "hl": "llamo"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, वह — स्पेनिश में कैसे?",
   "rule": [
    "yo = मैं, tú = तुम, usted = आप, él = वह (लड़का), ella = वह (लड़की)।",
    "nosotros = हम, ellos = वे।",
    "अक्सर सर्वनाम छोड़ दिया जाता है, क्योंकि क्रिया ख़ुद बता देती है: trabajo = (मैं) काम करता हूँ।"
   ],
   "yaad": "yo · tú · usted · él · ella",
   "abhyas": [
    [
     "\"मैं\" कैसे?",
     "yo"
    ],
    [
     "\"आप\" (आदर) कैसे?",
     "usted"
    ]
   ],
   "ex": [
    {
     "code": "s0002",
     "hl": "usted"
    },
    {
     "code": "s0388",
     "hl": "Él"
    },
    {
     "code": "s0005",
     "hl": "usted"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा: लिंग और the",
   "q": "स्पेनिश में हर चीज़ का लिंग होता है?",
   "rule": [
    "हाँ — हर संज्ञा पुल्लिंग या स्त्रीलिंग है: el libro (किताब, पुल्लिंग), la casa (घर, स्त्रीलिंग)।",
    "the के लिए el / la, a के लिए un / una।",
    "अनेक के लिए अंत में -s या -es: libros, casas।"
   ],
   "yaad": "el / la = the · un / una = एक",
   "abhyas": [
    [
     "\"la casa\" में la?",
     "the (स्त्रीलिंग)"
    ],
    [
     "\"libros\" — एक या अनेक?",
     "अनेक"
    ]
   ],
   "ex": [
    {
     "code": "s0047",
     "hl": "el"
    },
    {
     "code": "s0004",
     "hl": "la"
    },
    {
     "code": "s0034",
     "hl": "un"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "करने वाला, क्रिया, चीज़ — किस क्रम में?",
   "rule": [
    "आम क्रम: करने वाला → क्रिया → चीज़: Yo necesito agua = मुझे पानी चाहिए।",
    "क्रिया बीच में आती है — हिंदी की तरह आख़िर में नहीं।"
   ],
   "yaad": "करने वाला → क्रिया → बाक़ी बात।",
   "abhyas": [
    [
     "स्पेनिश में क्रिया आख़िर में आती है?",
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
     "hl": "Necesito"
    },
    {
     "code": "s0059",
     "hl": "Quiero"
    },
    {
     "code": "s0018",
     "hl": "Tengo"
    }
   ]
  },
  {
   "n": 5,
   "t": "अभी की बात",
   "q": "\"मैं करता हूँ\" कैसे?",
   "rule": [
    "क्रिया का अंत करने वाले के हिसाब से बदलता है: trabajo (मैं), trabajas (तुम), trabaja (वह)।",
    "-ar वाली क्रिया: hablar → hablo, hablas, habla।"
   ],
   "yaad": "मैं = -o · तुम = -as/-es · वह = -a/-e",
   "abhyas": [
    [
     "\"trabajo\" — कौन करता है?",
     "मैं"
    ],
    [
     "\"habla\" — कौन?",
     "वह / आप"
    ]
   ],
   "ex": [
    {
     "code": "s0197",
     "hl": "trabajo"
    },
    {
     "code": "s0014",
     "hl": "Hablo"
    },
    {
     "code": "s0100",
     "hl": "Vivo"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\" कैसे?",
   "rule": [
    "बीती बात के लिए क्रिया का अंत बदलता है: trabajé = मैंने काम किया, comí = मैंने खाया।",
    "\"he\" + क्रिया का रूप भी: he terminado = मैंने ख़त्म कर दिया।"
   ],
   "yaad": "मैंने = -é / -í",
   "abhyas": [
    [
     "\"comí\" — कब?",
     "बीते समय"
    ],
    [
     "\"he terminado\"?",
     "मैंने ख़त्म कर दिया"
    ]
   ],
   "ex": [
    {
     "code": "s0311",
     "hl": "Trabajé"
    },
    {
     "code": "s0008",
     "hl": "He"
    },
    {
     "code": "s0412",
     "hl": "Trabajé"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\" कैसे?",
   "rule": [
    "सबसे आसान: voy a + क्रिया = करने जा रहा हूँ: voy a llamar = मैं फ़ोन करूँगा।",
    "या अंत में -é: llamaré = मैं फ़ोन करूँगा।"
   ],
   "yaad": "voy a + क्रिया",
   "abhyas": [
    [
     "\"voy a llamar\"?",
     "मैं फ़ोन करूँगा"
    ],
    [
     "आने वाली बात का आसान तरीक़ा?",
     "voy a + क्रिया"
    ]
   ],
   "ex": [
    {
     "code": "s0195",
     "hl": "Voy"
    },
    {
     "code": "s0020",
     "hl": "mañana"
    },
    {
     "code": "s0285",
     "hl": "Vamos"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे करें?",
   "rule": [
    "क्रिया से ठीक पहले no: no entiendo = मैं नहीं समझता।",
    "no = नहीं; nada = कुछ नहीं; nunca = कभी नहीं।"
   ],
   "yaad": "no + क्रिया",
   "abhyas": [
    [
     "\"no\" कहाँ लगता है?",
     "क्रिया से पहले"
    ],
    [
     "\"no entiendo\"?",
     "मैं नहीं समझता"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "No"
    },
    {
     "code": "s0026",
     "hl": "No"
    },
    {
     "code": "s0039",
     "hl": "No"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे बनाएँ?",
   "rule": [
    "सवाल के दोनों ओर निशान: ¿…? — शुरू में उल्टा ¿।",
    "प्रश्न-शब्द: qué (क्या), dónde (कहाँ), cuándo (कब), cuánto (कितना), cómo (कैसे)।",
    "हाँ/ना वाले सवाल में बस आवाज़ ऊपर उठती है।"
   ],
   "yaad": "¿Qué? ¿Dónde? ¿Cuánto?",
   "abhyas": [
    [
     "\"dónde\"?",
     "कहाँ"
    ],
    [
     "सवाल की शुरुआत में निशान?",
     "¿"
    ]
   ],
   "ex": [
    {
     "code": "s0024",
     "hl": "Qué"
    },
    {
     "code": "s0005",
     "hl": "dónde"
    },
    {
     "code": "s0101",
     "hl": "Cuánto"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से — स्पेनिश में?",
   "rule": [
    "संबंध-शब्द संज्ञा से पहले आते हैं: en casa = घर में।",
    "de = का/से, a = को/तक, con = साथ, para = के लिए।"
   ],
   "yaad": "en · de · a · con · para",
   "abhyas": [
    [
     "\"en casa\" में en?",
     "में"
    ],
    [
     "\"para\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "en"
    },
    {
     "code": "s0003",
     "hl": "de"
    },
    {
     "code": "s0132",
     "hl": "con"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "अच्छा, बड़ा — कहाँ लगता है?",
   "rule": [
    "विशेषण ज़्यादातर संज्ञा के बाद: casa grande = बड़ा घर।",
    "विशेषण भी लिंग के साथ बदलता है: bueno (पुल्लिंग), buena (स्त्रीलिंग)।",
    "uno, dos, tres = एक, दो, तीन।"
   ],
   "yaad": "संज्ञा → विशेषण",
   "abhyas": [
    [
     "\"casa grande\" में विशेषण?",
     "grande"
    ],
    [
     "\"dos\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0113",
     "hl": "bueno"
    },
    {
     "code": "s0140",
     "hl": "buena"
    },
    {
     "code": "s0109",
     "hl": "dos"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे बोलें?",
   "rule": [
    "बड़ों और अनजान से usted (आप) — क्रिया \"वह\" वाले रूप में।",
    "por favor = कृपया, gracias = धन्यवाद, perdón = माफ़ कीजिए।"
   ],
   "yaad": "usted · por favor · gracias",
   "abhyas": [
    [
     "\"por favor\"?",
     "कृपया"
    ],
    [
     "आदर से \"आप\"?",
     "usted"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "favor"
    },
    {
     "code": "s0011",
     "hl": "gracias"
    },
    {
     "code": "s0002",
     "hl": "usted"
    }
   ]
  }
 ],
 "grambank": {
  "db": "WALS",
  "source": "WALS Online (MPI-EVA) — cldf/values.csv, Language_ID spa, 29-Oct-2026 को उतारा; स्पेनिश Grambank में नहीं है",
  "claims": [
   {
    "path": 4,
    "gb": "WALS-81A",
    "claim": "SVO",
    "grambank": "SVO",
    "text": "वाक्य-क्रम: करने वाला → क्रिया → चीज़ (SVO)"
   },
   {
    "path": 3,
    "gb": "WALS-37A",
    "claim": "Definite word distinct from demonstrative",
    "grambank": "Definite word distinct from demonstrative",
    "text": "\"the\" जैसा निश्चित उपपद है (Definite word distinct from demonstrative)"
   },
   {
    "path": 3,
    "gb": "WALS-30A",
    "claim": "Two",
    "grambank": "Two",
    "text": "संज्ञा के लिंग हैं (Two)"
   },
   {
    "path": 8,
    "gb": "WALS-112A",
    "claim": "Negative particle",
    "grambank": "Negative particle",
    "text": "\"नहीं\" अलग शब्द (Negative particle)"
   },
   {
    "path": 10,
    "gb": "WALS-85A",
    "claim": "Prepositions",
    "grambank": "Prepositions",
    "text": "संबंध-शब्द संज्ञा से पहले (Prepositions)"
   },
   {
    "path": 11,
    "gb": "WALS-87A",
    "claim": "Noun-Adjective",
    "grambank": "Noun-Adjective",
    "text": "विशेषण संज्ञा के बाद (Noun-Adjective)"
   }
  ]
 }
};
