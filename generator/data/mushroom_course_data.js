/* ============================================================
   mushroom_course_data.js — मशरूम-कोर्स का meta (परत-3)
   v1.0 · 13-Aug-2026
   एकमात्र घर: कोर्स-पहचान + 12-खंड सूची (v2.3 मास्टर-सूची से)।
   पाठ-सामग्री का घर: generator/data/mushroom_lessons/paath-NNN.md
   (गिनती मशीन से देखें — header में हाथ-लिखी गिनती निषिद्ध नियम)
   ============================================================ */
"use strict";

const MUSHROOM_COURSE = {
  code: "msh",                       /* कूट-नाम — UI/certificate पर कभी नहीं */
  slug: "mushroom-cultivation-marketing",
  lang: "hi",
  title: "मशरूम: खेती, व्यापार और उद्यमिता",
  tagline: "बटन मशरूम पर केंद्रित व्यावसायिक पाठ्यक्रम — उत्पादन से बाज़ार तक। आधुनिक ढंग · AI के सहयोग से।",
  totalLessons: 627,
  mg: 1,                             /* MG-1 कृषि */
  udyamN: 951,
  parts: [
    { no: 1,  name: "नींव और फ़ैसला",                        from: 1,   to: 39  },
    { no: 2,  name: "AI आपका साथी",                          from: 40,  to: 73  },
    { no: 3,  name: "पहला चक्र",                             from: 74,  to: 123 },
    { no: 4,  name: "रास्ता-ब: बेड यानी सब्सट्रेट",           from: 124, to: 177 },
    { no: 5,  name: "रास्ता-स: Spawn (मशरूम बीज)",           from: 178, to: 233 },
    { no: 6,  name: "रास्ता-अ: उत्पादन",                     from: 234, to: 293 },
    { no: 7,  name: "सुरक्षा, गुणवत्ता और समस्या-समाधान",     from: 294, to: 359 },
    { no: 8,  name: "रास्ता-द: तुड़ाई के बाद",                from: 360, to: 413 },
    { no: 9,  name: "उद्यम-संचालन",                          from: 414, to: 461 },
    { no: 10, name: "हब",                                    from: 462, to: 493 },
    { no: 11, name: "डिजिटल दुकान और आधुनिक विपणन",          from: 494, to: 559 },
    { no: 12, name: "पैसा, क़ानून, निर्यात और योजना",         from: 560, to: 627 }
  ]
};

if (typeof module !== "undefined") module.exports = { MUSHROOM_COURSE };
