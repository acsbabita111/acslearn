/* ============================================================
   links.js  —  menu + paths का एकमात्र घर (परत 1)
   जगह: /assets/links.js
   ------------------------------------------------------------
   v3 (UPDATE 6): दो consumers, एक source —
   • नया होमपेज/मास्टर टेम्पलेट → ACS_LINKS.menu + ACS_LINKS.paths
   • पुराना script.js (58 pages) → ACS_LINKS.build(lang) + ACS_LINKS.login
   MENU = 10 items — अटल। सब पते असली (audit-पुष्ट)।
   ============================================================ */

const ACS_LINKS = {

  /* ---------- 10-item MENU (अटल क्रम; key = script.js/T_KEY से मेल) ---------- */
  menu: [
    { key: "home",     icon: "🏠", label: "होम",         href: "/" },
    { key: "mission",  icon: "🎯", label: "मिशन",        href: "/hi/mission.html" },
    { key: "salah",    icon: "🧭", label: "सलाह",         href: "/hi/salah.html" },
    { key: "udyam",    icon: "🌍", label: "उद्यम",        href: "/udyam/" },
    { key: "courses",  icon: "📚", label: "कोर्स",        href: "/courses/hi/" },
    { key: "register", icon: "📝", label: "रजिस्ट्रेशन",   href: "/join.html" },
    { key: "verify",   icon: "🏆", label: "प्रमाण पत्र",   href: "/verify/" },
    { key: "network",  icon: "🤝", label: "नेटवर्क",       href: "/hi/network.html" },
    { key: "vani",     icon: "📱", label: "वाणी",          href: "/vani/" },
    { key: "contact",  icon: "📞", label: "संपर्क",        href: "/contact/hi/" }
  ],

  /* ---------- 🔑 Login/Dashboard (menu का साथी — 11वाँ item नहीं) ---------- */
  login: {
    icon: "🔑",
    href: "/dashboard/",
    label: { hi: "लॉगिन / डैशबोर्ड", en: "Login / Dashboard" }
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
    return this.menu.map(function (m) {
      return { key: m.key, icon: m.icon, href: m.href, text: m.label };
    });
  }

};

if (typeof window !== "undefined") window.ACS_LINKS = ACS_LINKS;
if (typeof module !== "undefined") module.exports = ACS_LINKS;
