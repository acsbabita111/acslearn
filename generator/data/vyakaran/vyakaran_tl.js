/* vyakaran_tl.js — "मेरा पहला टागालोग व्याकरण" · परत-3 · v1.0 · 29-Oct-2026 · स्तर-ग · नियम AI-मसौदा, उदाहरण इसी कोर्स के असली वाक्य */
module.exports = {
 "version": "1.0",
 "book": "ACS-VK1",
 "lang": {
  "code": "tl",
  "hi": "तागालोग",
  "en": "Tagalog",
  "tts": "fil-PH",
  "asr": "fil-PH",
  "cover": {
   "native_title": "Aking Unang Balarila",
   "book_words": [
    "ako",
    "kayo"
   ]
  },
  "slug": "tagalog",
  "glottocode": "taga1270"
 },
 "lessons": [
  {
   "n": 1,
   "t": "अक्षर और उच्चारण",
   "q": "तागालोग के अक्षर कैसे पढ़ें?",
   "rule": [
    "रोमन लिपि में, जैसा लिखा वैसा बोला।",
    "ng = ङ (एक ही अक्षर), और अकेला ng शब्द \"नांग\" बोला जाता है।"
   ],
   "yaad": "पूरी वर्णमाला \"मेरी पहली तागालोग पोथी\" में है।",
   "abhyas": [
    [
     "\"ng\" की आवाज़?",
     "ङ"
    ],
    [
     "\"mga\" कैसे बोलें?",
     "मांगा"
    ]
   ],
   "ex": [
    {
     "code": "s0014",
     "hl": "ng"
    },
    {
     "code": "s0011",
     "hl": "salamat"
    },
    {
     "code": "s0003",
     "hl": "ako"
    }
   ]
  },
  {
   "n": 2,
   "t": "सर्वनाम",
   "q": "मैं, तुम, वह?",
   "rule": [
    "ako = मैं, ikaw/ka = तुम, kayo = आप/तुम सब, siya = वह (लड़का-लड़की दोनों)।",
    "tayo = हम (सुनने वाले समेत), kami = हम (सुनने वाले के बिना), sila = वे।"
   ],
   "yaad": "ako · ka · siya · tayo · kami",
   "abhyas": [
    [
     "\"मैं\"?",
     "ako"
    ],
    [
     "सुनने वाले समेत \"हम\"?",
     "tayo"
    ]
   ],
   "ex": [
    {
     "code": "s0003",
     "hl": "ako"
    },
    {
     "code": "s0005",
     "hl": "ka"
    },
    {
     "code": "s0236",
     "hl": "siya"
    }
   ]
  },
  {
   "n": 3,
   "t": "संज्ञा: बिना लिंग",
   "q": "the और लिंग?",
   "rule": [
    "संज्ञा का लिंग नहीं।",
    "ang कुछ-कुछ \"the\" जैसा काम करता है; ng और sa बताते हैं कि संज्ञा वाक्य में क्या काम कर रही है।",
    "अनेक के लिए संज्ञा से पहले mga: mga libro = किताबें।"
   ],
   "yaad": "mga + संज्ञा = अनेक",
   "abhyas": [
    [
     "\"mga libro\"?",
     "किताबें"
    ],
    [
     "संज्ञा का लिंग?",
     "नहीं"
    ]
   ],
   "ex": [
    {
     "code": "s0001",
     "hl": "Ang"
    },
    {
     "code": "s0085",
     "hl": "mga"
    },
    {
     "code": "s0008",
     "hl": "sa"
    }
   ]
  },
  {
   "n": 4,
   "t": "वाक्य का क्रम",
   "q": "क्रिया कहाँ?",
   "rule": [
    "क्रिया सबसे पहले! क्रिया → करने वाला → बाक़ी: Kailangan ko ng tubig = मुझे पानी चाहिए।",
    "यह हिंदी और अंग्रेज़ी दोनों से अलग है।"
   ],
   "yaad": "क्रिया → करने वाला → बाक़ी बात",
   "abhyas": [
    [
     "क्रिया कहाँ आती है?",
     "सबसे पहले"
    ],
    [
     "\"Kailangan ko\" में क्रिया?",
     "kailangan"
    ]
   ],
   "ex": [
    {
     "code": "s0041",
     "hl": "Kailangan"
    },
    {
     "code": "s0059",
     "hl": "Gusto"
    },
    {
     "code": "s0201",
     "hl": "Naghahanap"
    }
   ]
  },
  {
   "n": 5,
   "t": "काम चल रहा है",
   "q": "\"मैं कर रहा हूँ\" कैसे?",
   "rule": [
    "तागालोग में क्रिया समय (काल) से नहीं, \"काम पूरा हुआ या नहीं\" से बदलती है।",
    "पहला शब्दांश दोहराओ = काम चल रहा है: kumakain = खा रहा है।"
   ],
   "yaad": "दोहराया शब्दांश = अभी",
   "abhyas": [
    [
     "\"kumakain\"?",
     "खा रहा है"
    ],
    [
     "\"nagtatrabaho\"?",
     "काम कर रहा है"
    ]
   ],
   "ex": [
    {
     "code": "s0282",
     "hl": "nagtatrabaho"
    },
    {
     "code": "s0099",
     "hl": "nakatira"
    },
    {
     "code": "s0100",
     "hl": "Nakatira"
    }
   ]
  },
  {
   "n": 6,
   "t": "काम पूरा हुआ",
   "q": "\"मैंने किया\"?",
   "rule": [
    "nag- या -um- वाला रूप = काम पूरा हो गया: kumain = खा लिया, nagtrabaho = काम कर लिया।",
    "kahapon = कल (बीता) — समय ऐसे शब्द बताते हैं।"
   ],
   "yaad": "nag- / -um- = बीता",
   "abhyas": [
    [
     "\"kumain\"?",
     "खाया"
    ],
    [
     "\"kahapon\"?",
     "कल (बीता)"
    ]
   ],
   "ex": [
    {
     "code": "s0186",
     "hl": "Kahapon"
    },
    {
     "code": "s0248",
     "hl": "Natapos"
    },
    {
     "code": "s0335",
     "hl": "dumating"
    }
   ]
  },
  {
   "n": 7,
   "t": "काम अभी शुरू नहीं हुआ",
   "q": "\"मैं करूँगा\"?",
   "rule": [
    "पहला शब्दांश दोहराओ, nag-/-um- नहीं = काम आगे होगा: kakain = खाएगा।",
    "bukas = कल (आने वाला)।"
   ],
   "yaad": "दोहराया शब्दांश (बिना nag-) = आगे",
   "abhyas": [
    [
     "\"kakain\"?",
     "खाएगा"
    ],
    [
     "\"bukas\"?",
     "कल (आने वाला)"
    ]
   ],
   "ex": [
    {
     "code": "s0020",
     "hl": "bukas"
    },
    {
     "code": "s0295",
     "hl": "Babalik"
    },
    {
     "code": "s0115",
     "hl": "Bukas"
    }
   ]
  },
  {
   "n": 8,
   "t": "\"नहीं\" कैसे लगाएँ",
   "q": "मना कैसे?",
   "rule": [
    "क्रिया से पहले hindi: hindi ko alam = मुझे नहीं पता।",
    "wala = नहीं है; huwag = मत (मना करना)।"
   ],
   "yaad": "hindi · wala · huwag",
   "abhyas": [
    [
     "\"hindi ko alam\"?",
     "मुझे नहीं पता"
    ],
    [
     "\"wala\"?",
     "नहीं है"
    ]
   ],
   "ex": [
    {
     "code": "s0015",
     "hl": "Hindi"
    },
    {
     "code": "s0086",
     "hl": "Wala"
    },
    {
     "code": "s0124",
     "hl": "Huwag"
    }
   ]
  },
  {
   "n": 9,
   "t": "प्रश्न कैसे पूछें",
   "q": "सवाल कैसे?",
   "rule": [
    "हाँ/ना वाला सवाल: ba लगाओ: Marunong ka ba? = क्या तुम जानते हो?",
    "ano (क्या), saan (कहाँ), kailan (कब), magkano (कितने पैसे), paano (कैसे)।"
   ],
   "yaad": "… ba? · ano · saan · magkano",
   "abhyas": [
    [
     "\"saan\"?",
     "कहाँ"
    ],
    [
     "\"magkano\"?",
     "कितने पैसे"
    ]
   ],
   "ex": [
    {
     "code": "s0016",
     "hl": "ba"
    },
    {
     "code": "s0002",
     "hl": "Ano"
    },
    {
     "code": "s0005",
     "hl": "saan"
    }
   ]
  },
  {
   "n": 10,
   "t": "संबंध-शब्द",
   "q": "में, पर, से?",
   "rule": [
    "sa = में/पर/को: sa bahay = घर में।",
    "para sa = के लिए, kasama = साथ, galing sa = से।"
   ],
   "yaad": "sa · para sa · galing sa",
   "abhyas": [
    [
     "\"sa bahay\"?",
     "घर में"
    ],
    [
     "\"para sa\"?",
     "के लिए"
    ]
   ],
   "ex": [
    {
     "code": "s0008",
     "hl": "sa"
    },
    {
     "code": "s0268",
     "hl": "para"
    },
    {
     "code": "s0164",
     "hl": "Kasama"
    }
   ]
  },
  {
   "n": 11,
   "t": "विशेषण और गिनती",
   "q": "विशेषण कहाँ?",
   "rule": [
    "विशेषण और संज्ञा के बीच na/ng जोड़ता है: malaking bahay = बड़ा घर।",
    "isa, dalawa, tatlo = एक, दो, तीन।"
   ],
   "yaad": "विशेषण + ng/na + संज्ञा",
   "abhyas": [
    [
     "\"malaking bahay\"?",
     "बड़ा घर"
    ],
    [
     "\"dalawa\"?",
     "दो"
    ]
   ],
   "ex": [
    {
     "code": "s0167",
     "hl": "Maliit"
    },
    {
     "code": "s0109",
     "hl": "dalawa"
    },
    {
     "code": "s0375",
     "hl": "isa"
    }
   ]
  },
  {
   "n": 12,
   "t": "आदर और विनती",
   "q": "आदर से कैसे?",
   "rule": [
    "बड़ों से बात में po / opo लगाओ: Salamat po = धन्यवाद (आदर से), opo = जी हाँ।",
    "pakiusap / paki- = कृपया, pasensya na = माफ़ कीजिए।"
   ],
   "yaad": "po · opo · salamat po",
   "abhyas": [
    [
     "\"opo\"?",
     "जी हाँ"
    ],
    [
     "आदर का छोटा शब्द?",
     "po"
    ]
   ],
   "ex": [
    {
     "code": "s0241",
     "hl": "Opo"
    },
    {
     "code": "s0011",
     "hl": "salamat"
    },
    {
     "code": "s0030",
     "hl": "Paki"
    }
   ]
  }
 ],
 "grambank": {
  "source": "Grambank v1 (MPI-EVA) — cldf/values.csv, Language_ID taga1270, 29-Oct-2026 को उतारा",
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
    "text": "\"the\" जैसा निश्चित उपपद है"
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
