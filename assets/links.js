/* ════════════════════════════════════════════════════════════════
   links.js  —  ACS menu व paths का एकमात्र घर (single source / परत-1)
   ----------------------------------------------------------------
   नियम: menu/links सिर्फ़ यहाँ। navbar + footer-sitemap दोनों इसी से बनें
   (दो जगह hardcode नहीं → एक बदलो, दोनों बदलें)।
   10 items अटल — क्रम कभी न बदले; कोई 11वाँ नहीं।
   path में {lang} = भाषा-folder (hi/en/kn…); बाक़ी paths साझा।
   नई भाषा = हर item के label में नया code जोड़ें (path वही)।
   ════════════════════════════════════════════════════════════════ */

window.ACS_LINKS = {

  /* ── 10 अटल menu items ── */
  items: [
    { key: "home",     icon: "🏠", path: "/",                    label: { hi: "होम" } },
    { key: "mission",  icon: "🎯", path: "/{lang}/mission.html", label: { hi: "मिशन" } },
    { key: "salah",    icon: "🧭", path: "/{lang}/salah.html",   label: { hi: "सलाह" } },
    { key: "udyam",    icon: "🌍", path: "/udyam/",              label: { hi: "उद्यम" } },
    { key: "courses",  icon: "📚", path: "/courses/{lang}/",     label: { hi: "कोर्स" } },
    { key: "register", icon: "📝", path: "/join.html",           label: { hi: "रजिस्ट्रेशन" } },
    { key: "verify",   icon: "🏆", path: "/verify/",             label: { hi: "प्रमाण पत्र" } },
    { key: "network",  icon: "🤝", path: "/{lang}/network.html", label: { hi: "नेटवर्क" } },
    { key: "vani",     icon: "📱", path: "/vani/",               label: { hi: "वाणी" } },
    { key: "contact",  icon: "📞", path: "/contact/{lang}/",     label: { hi: "संपर्क" } }
  ],

  /* ── Login/Dashboard (menu के बाद अलग बटन) ── */
  login: {
    icon:  "🔑",
    label: { hi: "Login / Dashboard" }
  },

  /* ── सहायक: किसी भाषा के लिए तैयार menu निकालें ──
     acs-app.js इसी से navbar + footer दोनों बनाएगा।
     label न मिले तो मूल (hi) दिखे — जब तक अनुवाद न हो।                  */
  build: function (lang) {
    lang = lang || (window.ACS_CONFIG && ACS_CONFIG.langs.source) || "hi";
    return this.items.map(function (it) {
      return {
        key:   it.key,
        icon:  it.icon,
        href:  it.path.replace("{lang}", lang),
        text:  it.label[lang] || it.label.hi
      };
    });
  }
};
