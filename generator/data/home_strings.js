/* ============================================================
   home_strings.js v1.3 (12-Nov-2026) : होम-पेज के हीरो, खोज-बॉक्स और "6 कदम" का पाठ : एकमात्र घर।
   पढ़ता है: generator/build_home.js (वही index.html और en/index.html का <main> हिस्सा बनाता है)।
   Founder-मंज़ूरी (11/12-Nov-2026): हीरो-लाइन, शीर्षक, छह कदम, खोज-बॉक्स, चारों दरवाज़े हरे।
   v1.1 (Founder, 12-Nov): "अपने गाँव से देश और दुनिया तक" वाली लाइन हटी (ऊपर की tagline "गाँव से ग्लोबल साउथ तक"
   पहले से यही बात कहती है); खंड का नाम अब सिर्फ़ "ACS पर आपका रास्ता: 6 कदम"। नई भाषा जोड़नी हो तो यहाँ एक और खाना (जैसे "bn") जोड़ें।
   v1.2 (Founder, 12-Nov): seoWords = वे खोज-शब्द जो इस होम पर हमेशा रहने चाहिए (पुराने होम के सभी + नए)।
   build_home.js हर बार जाँचता है; एक भी शब्द पेज से हटे तो पेज बनता ही नहीं।
   v1.3 (Founder, 12-Nov): कदम 2, 3 और 5 के शब्द नतीजे के वादे से हटाकर तैयारी/अवसर पर
   ("रोजगार या स्वरोजगार के लिए तैयार", "अधिक अवसरों तक", "अवसर तक पहुँचो"); नीचे की पंक्ति Founder के शब्दों में
   (नौकरी और विदेशी वर्क वीज़ा के लिए सिर्फ़ मार्गदर्शन, गारंटी नहीं)।
   नियम: कोई वादा नहीं (नौकरी/वीज़ा की गारंटी नहीं); लंबी रेखा का उपयोग नहीं।
   ============================================================ */
"use strict";
module.exports = {
  hi: {
    out: "index.html", home: "https://acslearn.com/",
    title: "मुफ़्त ऑनलाइन कोर्स (Free Online Courses): हुनर, भाषा, करियर टेस्ट | ACS",
    desc: "मुफ़्त ऑनलाइन कोर्स: करियर टेस्ट दो, एक हुनर सीखो, अंग्रेज़ी और एक विदेशी भाषा सीखो, परीक्षा देकर प्रमाणपत्र लो। 950+ उद्यम, नौकरी व स्वरोजगार की पूरी जानकारी। 130 भाषाओं में, गाँव से ग्लोबल साउथ तक, हमेशा निःशुल्क ऑनलाइन कंप्यूटर शिक्षा। अप्लाइड कंप्यूटर स्कूल (ACS) से जुड़ें।",
    seoWords: ["जुड़ें", "मुफ़्त ऑनलाइन कोर्स", "Free Online Courses", "निःशुल्क", "ऑनलाइन कंप्यूटर शिक्षा", "हुनर", "भाषा", "करियर टेस्ट", "करियर", "अंग्रेज़ी", "विदेशी भाषा", "प्रमाणपत्र", "पोर्टफ़ोलियो", "950+ उद्यम", "उद्यम", "नौकरी", "स्वरोजगार", "130 भाषा", "गाँव से ग्लोबल साउथ तक", "अप्लाइड कंप्यूटर स्कूल", "ACS", "खोजें", "कोर्स", "सीखें"],
    ogdesc: "मुफ़्त ऑनलाइन कोर्स: करियर टेस्ट, हुनर, भाषा और प्रमाणपत्र। गाँव से ग्लोबल साउथ तक।",
    pill: "✨ सुंदर भविष्य के लिए", h1a: "मुफ़्त ऑनलाइन कोर्स से", h1b: "हुनर और भाषा सीखें!",
    sAria: "हुनर, भाषा, उद्यम या करियर खोजें", sPh: "हुनर, भाषा, उद्यम खोजें…", sBtn: "🔍 खोजें", sEg: "जैसे: वेल्डिंग, जापानी, DCA",
    kind: { b: "भाषा", h: "हुनर", u: "उद्यम", k: "करियर" },
    none: "नहीं मिला। दूसरा शब्द लिखकर देखें, या", fail: "सूची नहीं खुली।", allLabel: "सभी कोर्स देखें →", allUrl: "/courses/hi/",
    startQ: "पता नहीं कहाँ से शुरू करें?", startA: "करियर टेस्ट दें →", testUrl: "/career.html",
    doors: [["/career.html", "", "🧭 अपना करियर चुनें!"], ["/bhasha.html", " stack", "🗣️ नई भाषा सीखें!"], ["/hunar.html", "", "🛠️ नया हुनर सीखें!"], ["/udyam-shuruat.html", "", "🏭 अपना उद्यम शुरू करें!"]],
    pathH: "ACS पर आपका रास्ता: 6 कदम", pathSub: "",
    steps: [
      ["🧭 अपनी रुचि पहचानो", "करियर टेस्ट दो।", "करियर टेस्ट दो →", "/career.html"],
      ["🛠️ एक हुनर सीखो", "ताकि रोजगार या स्वरोजगार के लिए तैयार हो सको।", "हुनर-कोर्स देखो →", "/hunar.html"],
      ["🗣️ भाषा सीखो", "देश-दुनिया के अधिक अवसरों तक पहुँचने के लिए अंग्रेज़ी के साथ एक और विदेशी भाषा सीखो।", "भाषा-कोर्स देखो →", "/bhasha.html"],
      ["🏆 दुनिया को दिखाओ", "परीक्षा दो, प्रमाणपत्र लो और अपना पोर्टफ़ोलियो (Portfolio) तैयार करो।", "करियर-किट खोलो →", "/career-kit.html"],
      ["🤝 अवसर तक पहुँचो", "ACS के नेटवर्क से जुड़ो: अपने ज़िले में, देश में या विदेश में।", "नेटवर्क देखो →", "/hi/network.html"],
      ["📣 अपनी कहानी सुनाओ", "अपनी सफलता की कहानी दोस्तों को बताओ, और दुनिया में नाम करो।", "दोस्तों को बताओ →", "WA"]
    ],
    share: "ACS पर मुफ़्त ऑनलाइन कोर्स: https://acslearn.com/",
    truth: "ACS पढ़ाई और तैयारी कराता है। नौकरी और विदेशी वर्क वीज़ा प्राप्त करने के लिए सिर्फ़ मार्गदर्शन देता है, जबकि गारंटी नहीं देता।"
  },
  en: {
    out: "en/index.html", home: "https://acslearn.com/en/",
    title: "Free Online Courses: Skills, Languages, Career Test | ACS",
    desc: "Free online courses: take the career test, learn one skill, learn English and one more foreign language, pass the exam and earn a certificate. Courses, skills and certificates on your phone: always-free online learning in 130 languages, from village to the Global South. Applied Computer School (ACS).",
    seoWords: ["free online courses", "always-free", "learning", "online", "courses", "skills", "languages", "career test", "career", "English", "foreign language", "certificate", "certificates", "portfolio", "enterprise", "130 languages", "from village to the Global South", "Applied Computer School", "ACS", "phone", "search", "learn"],
    ogdesc: null,   /* English og:description को build_mirror_homes.js जाँचता है : यहाँ से नहीं बदलता */
    pill: "✨ For a Bright Future", h1a: "Free online courses:", h1b: "learn skills and languages!",
    sAria: "Search skills, languages, enterprises or career", sPh: "Search courses…", sBtn: "🔍 Search", sEg: "e.g. welding, Japanese, DCA",
    kind: { b: "Language", h: "Skill", u: "Enterprise", k: "Career" },
    none: "not found. Try another word, or", fail: "The list did not open.", allLabel: "See all courses →", allUrl: "/courses/hi/",
    startQ: "Not sure where to start?", startA: "Take the Career Test →", testUrl: "/en/career.html",
    doors: [["/en/career.html", "", "🧭 Choose Your Career!"], ["/bhasha.html", " stack", "🗣️ Learn a New Language!"], ["/hunar.html", "", "🛠️ Learn a New Skill!"], ["/udyam-shuruat.html", "", "🏭 Start Your Enterprise!"]],
    pathH: "Your path on ACS: 6 steps", pathSub: "",
    steps: [
      ["🧭 Know your interest", "Take the Career Test.", "Take the Career Test →", "/en/career.html"],
      ["🛠️ Learn one skill", "So that you are ready for a job or for your own work.", "See skill courses →", "/hunar.html"],
      ["🗣️ Learn languages", "Learn English and one more foreign language to reach more opportunities at home and abroad.", "See language courses →", "/bhasha.html"],
      ["🏆 Show the world", "Take the exam, earn the certificate and build your portfolio.", "Open the Career Kit →", "/career-kit.html"],
      ["🤝 Reach opportunity", "Join the ACS network: in your district, in your country or abroad.", "See the network →", "/hi/network.html"],
      ["📣 Tell your story", "Share your success story with friends, and make your name in the world.", "Tell your friends →", "WA"]
    ],
    share: "Free online courses on ACS: https://acslearn.com/en/",
    truth: "ACS helps you learn and prepare. For jobs and foreign work visas it gives only guidance, not a guarantee."
  }
};
