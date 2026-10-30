/* vyakaran_id.js — "मेरा पहला इंडोनेशियाई व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "id",
  "hi": "इंडोनेशियाई",
  "en": "Indonesian",
  "tts": "id-ID",
  "asr": "id-ID",
  "cover": {
   "native_title": "Tata Bahasa Pertama Saya",
   "book_words": [
    "saya",
    "kita"
   ]
  },
  "slug": "indonesian",
  "glottocode": "indo1316"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "इंडोनेशियाई के अक्षर कैसे पढ़ें?",
   "rule": [
    "रोमन लिपि में, जैसा लिखा वैसा बोला।",
    "c = च, ng = ङ, ny = न्य, sy = श; e अक्सर हल्का अ: besar = बसार।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली इंडोनेशियाई पोथी\" में है।",
   "abhyas": [
    [
     "\"c\" की आवाज़?",
     "च"
    ],
    [
     "\"ng\"?",
     "ङ"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "dari"
    },
    {
     "code": "s0014",
     "hl": "bisa"
    },
    {
     "code": "s0021",
     "hl": "tidak"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, वह?",
   "rule": [
    "saya = मैं, Anda = आप, kamu = तुम, dia = वह (लड़का-लड़की दोनों)।",
    "kita = हम (सुनने वाले समेत), kami = हम (सुनने वाले के बिना), mereka = वे।"
   ],
   "yaad": "saya · Anda · dia · kita · kami",
   "abhyas": [
    [
     "\"मैं\"?",
     "saya"
    ],
    [
     "सुनने वाले समेत \"हम\"?",
     "kita"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "saya"
    },
    {
     "code": "s0002",
     "hl": "Anda"
    },
    {
     "code": "s0236",
     "hl": "dia"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा: बिना the, बिना लिंग",
   "q": "the और लिंग?",
   "rule": [
    "the/a जैसा शब्द नहीं, संज्ञा का लिंग भी नहीं।",
    "अनेक के लिए शब्द दोहराते हैं: buku-buku = किताबें — पर अक्सर बिना दोहराए भी।"
   ],
   "yaad": "न the, न लिंग · अनेक = दोहराना",
   "abhyas": [
    [
     "\"buku-buku\"?",
     "किताबें"
    ],
    [
     "संज्ञा का लिंग होता है?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0012",
     "hl": "Ini"
    },
    {
     "code": "s0063",
     "hl": "itu"
    },
    {
     "code": "s0254",
     "hl": "banyak"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "किस क्रम में?",
   "rule": [
    "क्रम: करने वाला → क्रिया → चीज़: Saya perlu air = मुझे पानी चाहिए।",
    "क्रिया आख़िर में नहीं आती।"
   ],
   "yaad": "करने वाला → क्रिया → बाक़ी बात।",
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
     "code": "s0043",
     "hl": "perlu"
    },
    {
     "code": "s0107",
     "hl": "mau"
    },
    {
     "code": "s0008",
     "hl": "bekerja"
    }
   ]
  },
  {
   "n": 5,
   "t": "काल: क्रिया नहीं बदलती",
   "q": "\"करता हूँ, किया, करूँगा\" में क्रिया बदलती है?",
   "rule": [
    "नहीं — क्रिया एक ही रहती है; समय अलग शब्द बताते हैं।",
    "sudah = कर चुका, sedang = कर रहा है, akan = करेगा।"
   ],
   "yaad": "क्रिया वही · sudah / sedang / akan",
   "abhyas": [
    [
     "\"akan\"?",
     "करेगा (आगे)"
    ],
    [
     "क्रिया समय से बदलती है?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0160",
     "hl": "sudah"
    },
    {
     "code": "s0191",
     "hl": "Sedang"
    },
    {
     "code": "s0131",
     "hl": "akan"
    }
   ]
  },
  {
   "n": 6,
   "t": "बीती बात",
   "q": "\"मैंने किया\"?",
   "rule": [
    "sudah लगाओ: saya sudah makan = मैंने खा लिया।",
    "kemarin = कल (बीता)।"
   ],
   "yaad": "sudah + क्रिया",
   "abhyas": [
    [
     "\"sudah makan\"?",
     "खा लिया"
    ],
    [
     "\"kemarin\"?",
     "कल (बीता)"
    ]
   ],
   "ex": [
    {
     "code": "s0160",
     "hl": "sudah"
    },
    {
     "code": "s0186",
     "hl": "Kemarin"
    },
    {
     "code": "s0248",
     "hl": "sudah"
    }
   ]
  },
  {
   "n": 7,
   "t": "आने वाली बात",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "akan लगाओ: saya akan datang = मैं आऊँगा।",
    "besok = कल (आने वाला)।"
   ],
   "yaad": "akan + क्रिया",
   "abhyas": [
    [
     "\"besok\"?",
     "कल (आने वाला)"
    ],
    [
     "\"akan\"?",
     "करेगा"
    ]
   ],
   "ex": [
    {
     "code": "s0131",
     "hl": "akan"
    },
    {
     "code": "s0020",
     "hl": "besok"
    },
    {
     "code": "s0247",
     "hl": "nanti"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया/विशेषण से पहले tidak: saya tidak tahu = मैं नहीं जानता।",
    "संज्ञा से पहले bukan: bukan saya = मैं नहीं।",
    "belum = अभी नहीं।"
   ],
   "yaad": "tidak + क्रिया · bukan + संज्ञा",
   "abhyas": [
    [
     "\"tidak tahu\"?",
     "नहीं जानता"
    ],
    [
     "\"belum\"?",
     "अभी नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0021",
     "hl": "tidak"
    },
    {
     "code": "s0237",
     "hl": "Bukan"
    },
    {
     "code": "s0249",
     "hl": "belum"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "apa (क्या), di mana (कहाँ), kapan (कब), berapa (कितना), bagaimana (कैसे)।",
    "हाँ/ना वाला सवाल: शुरू में apakah, या बस आवाज़ उठाओ।"
   ],
   "yaad": "apa · di mana · berapa",
   "abhyas": [
    [
     "\"berapa\"?",
     "कितना"
    ],
    [
     "\"di mana\"?",
     "कहाँ"
    ]
   ],
   "ex": [
    {
     "code": "s0010",
     "hl": "Apa"
    },
    {
     "code": "s0005",
     "hl": "mana"
    },
    {
     "code": "s0017",
     "hl": "Berapa"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "संबंध-शब्द पहले: di rumah = घर में, ke pasar = बाज़ार को, dari India = भारत से।",
    "untuk = के लिए, dengan = साथ।"
   ],
   "yaad": "di · ke · dari · untuk · dengan",
   "abhyas": [
    [
     "\"dari\"?",
     "से"
    ],
    [
     "\"untuk\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0013",
     "hl": "di"
    },
    {
     "code": "s0008",
     "hl": "ke"
    },
    {
     "code": "s0003",
     "hl": "dari"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण संज्ञा के बाद: rumah besar = बड़ा घर।",
    "गिनती संज्ञा से पहले: dua orang = दो आदमी।"
   ],
   "yaad": "संज्ञा → विशेषण · गिनती → संज्ञा",
   "abhyas": [
    [
     "\"rumah besar\" में विशेषण?",
     "besar"
    ],
    [
     "\"dua\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0135",
     "hl": "kecil"
    },
    {
     "code": "s0018",
     "hl": "dua"
    },
    {
     "code": "s0163",
     "hl": "Tiga"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "Bapak (सर), Ibu (मैडम) — नाम से पहले भी।",
    "tolong = कृपया (मदद), silakan = आइए/कीजिए, terima kasih = धन्यवाद, maaf = माफ़ कीजिए।"
   ],
   "yaad": "Bapak · Ibu · tolong · terima kasih",
   "abhyas": [
    [
     "\"tolong\"?",
     "कृपया"
    ],
    [
     "\"maaf\"?",
     "माफ़ कीजिए"
    ]
   ],
   "ex": [
    {
     "code": "s0022",
     "hl": "Tolong"
    },
    {
     "code": "s0011",
     "hl": "terima"
    },
    {
     "code": "s0029",
     "hl": "Maaf"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID indo1316, 29-Oct-2026 को उतारा",
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
    "claim": "0",
    "grambank": "0",
    "text": "\"the\" जैसा उपपद नहीं"
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
    "claim": "1",
    "grambank": "1",
    "text": "गिनती के साथ वर्ग-शब्द (classifier)"
   }
  ]
 }
};
