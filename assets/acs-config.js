/* ============================================================
   acs-config.js  —  ACS की "एक जगह सब सेटिंग" (CONFIG — परत 1)
   ------------------------------------------------------------
   नियम (Constitution):
   • यह पूरी website का एकमात्र setting-घर है।
   • menu/links यहाँ नहीं — वो links.js में।
   • एक जगह बदलो → 5 करोड़+ पेज बदलें।
   अपडेट: नया तिरंगा design (गोल्डन पट्टी · सफ़ेद शीर्षक · हरे 3D बटन)।
   ============================================================ */

const ACS_CONFIG = {

  /* ---------- 1) रंग ---------- */
  /* आधार 5 रंग (Constitution) + तिरंगा accents (Founder-स्वीकृत भारतीय टच) */
  colors: {
    /* आधार */
    navy:        "#0B1F3A",   // मुख्य background / heading
    navy_deep:   "#081527",   // footer
    blue:        "#1565C0",
    gold:        "#F9A825",   // पट्टी/pill (केसरी-गोल्डन)
    gold_light:  "#FFC24D",   // gradient ऊपरी shade
    gold_edge:   "#C77F0A",   // 3D निचला किनारा
    green:       "#2E7D32",   // आधार हरा
    offwhite:    "#F5F7FA",
    white:       "#FFFFFF",

    /* हरे बटन (3D) */
    btn_green:        "#1F7A2E",
    btn_green_light:  "#3BB14D",
    btn_green_edge:   "#145F22",

    /* 🇮🇳 तिरंगा (पट्टी/लकीर के लिए) */
    saffron:      "#FF9933",
    india_white:  "#FFFFFF",
    india_green:  "#138808"
  },

  /* ---------- 2) फ़ॉन्ट (बुज़ुर्ग भी पढ़ें) ---------- */
  fonts: {
    family_text:  "'Noto Sans Devanagari', 'Inter', sans-serif",
    family_num:   "'Inter', 'Noto Sans Devanagari', sans-serif",  // अंक/आँकड़े

    size_base:    "19px",   // 16px से नीचे कभी नहीं
    size_min:     "16px",
    size_button:  "21px",
    size_h1:      "38px",   // hero शीर्षक (मोबाइल); बड़े screen पर 48px
    size_h2:      "26px",
    size_h3:      "21px",

    line_height:  "1.8",    // आम पाठ; पट्टी जैसी जगह CSS में कसी जाती है
    weight_text:  "400",
    weight_bold:  "800"
  },

  /* ---------- 3) संगठन जानकारी (हिंदी पेज = देवनागरी) ---------- */
  org: {
    name_short:  "ACS",
    name_hi:     "एप्लाइड कंप्यूटर स्कूल",
    name_en:     "Applied Computer School",   // अंग्रेज़ी पेज के लिए
    tagline_hi:  "80+ भाषा में, गाँव से ग्लोबल साउथ तक!",
    tagline_full_hi: "80+ भाषा में गाँव से ग्लोबल साउथ तक — मोबाइल फ्रेंडली कोर्स कंटेंट!",

    trust_short: "FFGPMTrust",
    trust_hi:    "फ्रीडम फाइटर गंगाधर प्रसाद मेमोरियल ट्रस्ट",
    trust_site:  "ffgpmt.org",
    iso:         "ISO 9001:2015",

    website:     "acslearn.com",
    email:       "acs.chautham@gmail.com",
    phone:       "+91-9431210092",
    whatsapp:    "https://wa.me/919431210092",
    youtube:     "https://youtube.com/@AppliedComputerSchool",
    address_hi:  "एसीएस भवन, विद्यार्थी नगर, चौथम, खगड़िया, बिहार — 851201",

    logo:        "logo.png"   // न खुले तो "ACS" text fallback
  },

  /* ---------- 4) लेआउट (mobile-first) ---------- */
  layout: {
    max_width:        "1100px",
    radius:           "18px",
    radius_pill:      "999px",
    auto_logout_min:  10
  },

  /* ---------- 5) Firebase (login/OTP/dashboard के लिए) ---------- */
  firebase: {
    apiKey:            "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM",
    authDomain:        "acslearn-platform.firebaseapp.com",
    projectId:         "acslearn-platform",
    storageBucket:     "acslearn-platform.firebasestorage.app",
    messagingSenderId: "435395814481",
    appId:             "1:435395814481:web:655f99452a90f8efbc4470"
  }

};

if (typeof window !== "undefined") window.ACS_CONFIG = ACS_CONFIG;
if (typeof module !== "undefined") module.exports = ACS_CONFIG;
