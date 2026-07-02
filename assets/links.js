/* ============================================================
   links.js  —  menu + paths का एकमात्र घर (परत 1 का हिस्सा)
   जगह: /assets/links.js
   ------------------------------------------------------------
   नियम (Constitution):
   • menu/links सिर्फ़ यहाँ। config में दोबारा नहीं।
   • यहाँ बदलो → navbar-drawer + footer + हर पेज एक साथ बदले।
   • MENU = 10 items — अटल, कभी 11वाँ नहीं।
   v2 (UPDATE 2): सब पते असली — hi-जाल से मिलाकर, audit-पुष्ट।
   ============================================================ */

const ACS_LINKS = {

  /* ---------- 10-item MENU (अटल क्रम — हर पता audit में ज़िंदा-पुष्ट) ---------- */
  menu: [
    { icon: "🏠", label: "होम",         href: "/" },
    { icon: "🎯", label: "मिशन",        href: "/hi/mission.html" },
    { icon: "🧭", label: "सलाह",         href: "/hi/salah.html" },
    { icon: "🌍", label: "उद्यम",        href: "/udyam/" },
    { icon: "📚", label: "कोर्स",        href: "/courses/hi/" },
    { icon: "📝", label: "रजिस्ट्रेशन",   href: "/join.html" },
    { icon: "🏆", label: "प्रमाण पत्र",   href: "/verify/" },
    { icon: "🤝", label: "नेटवर्क",       href: "/hi/network.html" },
    { icon: "📱", label: "वाणी",          href: "/vani/" },
    { icon: "📞", label: "संपर्क",        href: "/contact/hi/" }
  ],

  /* ---------- ख़ास paths (single source) ---------- */
  paths: {
    home:       "/",
    login:      "/dashboard/",
    dashboard:  "/dashboard/",
    register:   "/join.html",
    udyam:      "/udyam/",
    courses:    "/courses/hi/",
    verify:     "/verify/",
    vani:       "/vani/",
    contact:    "/contact/hi/",
    payment:    "/payment/hi/",
    help:       "/help/hi/"
  }

};

if (typeof window !== "undefined") window.ACS_LINKS = ACS_LINKS;
if (typeof module !== "undefined") module.exports = ACS_LINKS;
