/* ============================================================
   links.js  —  menu + paths का एकमात्र घर (परत 1)
   जगह: /assets/links.js
   ------------------------------------------------------------
   v5 (17-Nov-2026): labels = भाषा-घर के पन्नों के लिए मेन्यू के नाम उसी भाषा में (पहली पंक्ति: कन्नड़)।
   v4: दो consumers + दो भाषाएँ, एक source —
   • label_en/href_en: EN pages के लिए (होल: courses/network/contact के EN pages बनने पर href_en बदलें)
   • नया होमपेज/मास्टर टेम्पलेट → ACS_LINKS.menu + ACS_LINKS.paths
   • पुराना script.js (58 pages) → ACS_LINKS.build(lang) + ACS_LINKS.login
   MENU = 10 items — अटल। सब पते असली (audit-पुष्ट)।
   ============================================================ */

const ACS_LINKS = {

  /* ---------- 10-item MENU (अटल क्रम; key = script.js/T_KEY से मेल) ---------- */
  menu: [
    { key: "home",     icon: "🏠", label: "होम",         href: "/", label_en: "Home", href_en: "/en/" },
    { key: "mission",  icon: "🎯", label: "मिशन",        href: "/hi/mission.html", label_en: "Mission", href_en: "/en/mission.html" },
    { key: "salah",    icon: "🧭", label: "सलाह",         href: "/hi/salah.html", label_en: "Counseling", href_en: "/en/counseling.html" },
    { key: "udyam",    icon: "🌍", label: "उद्यम",        href: "/udyam/", label_en: "Enterprises", href_en: "/en/industries/" },
    { key: "courses",  icon: "📚", label: "कोर्स",        href: "/courses/hi/", label_en: "Courses", href_en: "/courses/hi/" },
    /* (Founder-आदेश 14-Jul-2026) रजिस्ट्रेशन अब पहले guide-पृष्ठ खोले — 12 भूमिकाएँ,
       दस्तावेज़-सूची, अधिकार-कर्तव्य, टीम-योग्यताएँ; वहीं से form का बटन। menu-नाम वही (10-लॉक)। */
    { key: "register", icon: "📝", label: "रजिस्ट्रेशन",   href: "/registration-guide.html", label_en: "Registration", href_en: "/registration-guide.html" },
    { key: "verify",   icon: "🏆", label: "प्रमाण पत्र",   href: "/verify/", label_en: "Certificate", href_en: "/en/verify/" },
    { key: "network",  icon: "🤝", label: "नेटवर्क",       href: "/hi/network.html", label_en: "Network", href_en: "/en/network.html" },
    { key: "vani",     icon: "📱", label: "वाणी",          href: "/vani/", label_en: "Vani", href_en: "/vani/en/" },
    { key: "contact",  icon: "📞", label: "संपर्क",        href: "/contact/hi/", label_en: "Contact", href_en: "/contact/en/" }
  ],

  /* ---------- 🔑 Login/Dashboard (menu का साथी — 11वाँ item नहीं) ---------- */
  login: {
    icon: "🔑",
    href: "/dashboard/",
    label: { hi: "लॉगिन / डैशबोर्ड", en: "Login / Dashboard" }
  },

  /* ---------- भाषा-घर (/kn/ …) के पन्नों पर मेन्यू और नीचे की कड़ियों के नाम, उसी भाषा में (v5, 17-Nov-2026) ----------
     Founder का आदेश (16-Nov-2026): कन्नड़ में सब कुछ कन्नड़ में। जिस भाषा की पंक्ति यहाँ है, उसके भाषा-घर के पन्नों पर
     acs-universal.js मेन्यू, नीचे का मेन्यू, नीति की तीन कड़ियाँ और बटनों के नाम यहीं से लेता है। जिस भाषा की पंक्ति नहीं है,
     वहाँ पहले जैसा English रहता है। नई भाषा = यहाँ एक नई पंक्ति (पते वही रहते हैं; सिर्फ़ "होम" उसी भाषा के घर पर जाता है)।
     नाम सादे पाठ में (HTML का कोई चिह्न नहीं)। जाँच: generator/dev_mirror_runtime_check.js और generator/dev_lang_public_check.js। */
  labels: {
    kn: { home: "ಮುಖಪುಟ", mission: "ಧ್ಯೇಯ", salah: "ಮಾರ್ಗದರ್ಶನ", udyam: "ಉದ್ಯಮಗಳು", courses: "ಕೋರ್ಸ್‌ಗಳು",
          register: "ನೋಂದಣಿ", verify: "ಪ್ರಮಾಣಪತ್ರಗಳು", network: "ಜಾಲ", vani: "ವಾಣಿ", contact: "ಸಂಪರ್ಕ",
          refund: "ಮರುಪಾವತಿ ನೀತಿ", privacy: "ಗೌಪ್ಯತೆ ನೀತಿ", terms: "ನಿಯಮ ಮತ್ತು ಷರತ್ತುಗಳು",
          top: "ಪುಟದ ಮೇಲಕ್ಕೆ ಹೋಗಿ", back: "ಹಿಂದೆ ಹೋಗಿ", menu: "ಮೆನು", close: "ಮುಚ್ಚಿ",
          footer: "ಅಡಿಟಿಪ್ಪಣಿ ಮೆನು", wa: "WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ", logo: "ACS ಲೋಗೋ" },
    bn: { home: "হোম", mission: "মিশন", salah: "পরামর্শ", udyam: "উদ্যোগ", courses: "কোর্স",
          register: "নিবন্ধন", verify: "সার্টিফিকেট", network: "নেটওয়ার্ক", vani: "বাণী", contact: "যোগাযোগ",
          refund: "ফেরত নীতি", privacy: "গোপনীয়তা নীতি", terms: "নিয়ম ও শর্তাবলি",
          top: "পাতার উপরে যান", back: "পিছনে যান", menu: "মেনু", close: "বন্ধ করুন",
          footer: "নিচের মেনু", wa: "WhatsApp-এ যোগাযোগ করুন", logo: "ACS লোগো" }
  },

  /* ---------- ख़ास paths (single source) ---------- */
  paths: {
    home: "/", login: "/dashboard/", dashboard: "/dashboard/",
    register: "/join.html", udyam: "/udyam/", courses: "/courses/hi/",
    verify: "/verify/", vani: "/vani/", contact: "/contact/hi/",
    payment: "/payment/hi/", help: "/help/hi/"
  },

  /* ---------- पुराने script.js के लिए: build(lang) ----------
     [{key, icon, href, text}] — text मूल (हिंदी) label;
     दूसरी भाषा का label script.js ख़ुद acs-translate से लेता है। */
  build: function (lang) {
    var en = (lang === "en");
    return this.menu.map(function (m) {
      return { key: m.key, icon: m.icon,
               href: (en && m.href_en) ? m.href_en : m.href,
               text: (en && m.label_en) ? m.label_en : m.label };
    });
  }

};

if (typeof window !== "undefined") window.ACS_LINKS = ACS_LINKS;
if (typeof module !== "undefined") module.exports = ACS_LINKS;
