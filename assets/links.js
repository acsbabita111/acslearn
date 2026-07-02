/* ============================================================
   links.js  —  menu + paths का एकमात्र घर (परत 1 का हिस्सा)
   ------------------------------------------------------------
   नियम (Constitution):
   • menu/links सिर्फ़ यहाँ। config में दोबारा नहीं।
   • यहाँ बदलो → navbar-drawer + footer + हर पेज एक साथ बदले।
   • MENU = 10 items — अटल, कभी 11वाँ नहीं।
   ============================================================ */

const ACS_LINKS = {

  /* ---------- 10-item MENU (अटल क्रम) ----------
     icon · label (देवनागरी) · href
     ("#___" = अभी उसी पेज का हिस्सा;  "TODO" = पेज बनने पर पक्का path) */
  menu: [
    { icon: "🏠", label: "होम",         href: "/" },
    { icon: "🎯", label: "मिशन",        href: "/mission.html" },
    { icon: "🧭", label: "सलाह",         href: "#" },   /* TODO: सलाह पेज */
    { icon: "🌍", label: "उद्यम",        href: "/udyam/" },
    { icon: "📚", label: "कोर्स",        href: "/courses/" },
    { icon: "📝", label: "रजिस्ट्रेशन",   href: "/join.html" },
    { icon: "🏆", label: "प्रमाण पत्र",   href: "#" },   /* TODO: certificate पेज */
    { icon: "🤝", label: "नेटवर्क",       href: "#" },   /* TODO: network पेज */
    { icon: "📱", label: "वाणी",          href: "#" },   /* TODO: वाणी पेज */
    { icon: "📞", label: "संपर्क",        href: "#contact" }
  ],

  /* ---------- ख़ास paths (single source) ---------- */
  paths: {
    home:       "/",
    login:      "/dashboard/",     /* 🔑 Login/Dashboard */
    dashboard:  "/dashboard/",
    register:   "/join.html",      /* 10 रजिस्ट्रेशन-कार्ड यहीं */
    udyam:      "/udyam/",
    courses:    "/courses/",
    jobs:       "#",               /* TODO: jobs पेज */
    language:   "#"                /* TODO: भाषा-चयन */
  }

};

if (typeof window !== "undefined") window.ACS_LINKS = ACS_LINKS;
if (typeof module !== "undefined") module.exports = ACS_LINKS;
