/* ════════════════════════════════════════════════════════════════
   acs-config.js  —  ACS एकमात्र CONFIG (single source / परत-1)
   ----------------------------------------------------------------
   नियम: रंग · फ़ॉन्ट · org-जानकारी · Firebase — सब सिर्फ़ यहाँ।
   यहाँ एक value बदलो → पूरी website (करोड़ों pages) बदले।
   menu/links यहाँ नहीं — उनका घर links.js है (एक चीज़ = एक जगह)।
   ════════════════════════════════════════════════════════════════ */

window.ACS_CONFIG = {

  /* ── ब्रांड पहचान ── */
  brand: {
    name:      "Applied Computer School™",
    short:     "ACS",
    trust:     "FFGPMTrust",
    tagline:   "From Village to World — Free Digital Education for the Global South",
    motto:     "Learn. Build. Contribute. Grow.",
    iso:       "ISO 9001:2015",
    logo:      "https://acsbabita111.github.io/acslearn/logo.png"
  },

  /* ── संपर्क व org ── */
  org: {
    addressLine: "ACS Building, Vidyarthi Nagar, Chautham",
    city:        "Khagaria",
    region:      "Bihar",
    pincode:     "851201",
    country:     "IN",
    phone:       "+91-9431210092",
    email:       "acs.chautham@gmail.com",
    whatsapp:    "https://wa.me/919431210092",
    youtube:     "https://youtube.com/@AppliedComputerSchool",
    siteUrl:     "https://acslearn.com",
    trustUrl:    "https://ffgpmt.org"
  },

  /* ── रंग ──
     ब्रांड पैलेट = ठीक 5 (Constitution: "अधिकतम 5")।
     नीचे ui/* सिर्फ़ ज़रूरी कामकाजी रंग हैं (text/border/सफ़ल/त्रुटि),
     ये ब्रांड-रंग में नहीं गिने जाते।                                  */
  colors: {
    brand: {
      navy:     "#0B1F3A",
      blue:     "#1565C0",
      gold:     "#F9A825",
      green:    "#2E7D32",
      offwhite: "#F5F7FA"
    },
    ui: {
      white:    "#FFFFFF",
      ink:      "#1A2B3C",   /* मुख्य text */
      line:     "#E8EDF5",   /* border */
      muted:    "#607D8B",   /* हल्का text */
      success:  "#43A047",
      danger:   "#C62828"
    }
  },

  /* ── फ़ॉन्ट ──
     नियम: base 19px · 16px से नीचे कुछ नहीं · बटन 20-22px · line 1.8  */
  type: {
    devanagari: "'Noto Sans Devanagari'",
    latin:      "'Inter'",
    stack:      "'Inter','Noto Sans Devanagari',sans-serif",
    base:       "19px",
    min:        "16px",
    lineHeight:  1.8,
    button:     "21px",
    weights:    [400, 500, 600, 700, 800, 900]
  },

  /* ── Firebase (तकनीकी — system के लिए ज़रूरी) ──
     apiKey web-app में खुली रहना सामान्य; असली सुरक्षा Firestore Rules से। */
  firebase: {
    apiKey:            "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM",
    authDomain:        "acslearn-platform.firebaseapp.com",
    projectId:         "acslearn-platform",
    storageBucket:     "acslearn-platform.firebasestorage.app",
    messagingSenderId: "435395814481",
    appId:             "1:435395814481:web:655f99452a90f8efbc4470"
  },

  /* ── भाषाएँ ──
     मूल भाषा hi; अंग्रेज़ी = पुल। नई भाषा = यहाँ code जोड़ें + folder clone।
     क्रम: चुनी → browser → GPS → असली page; न हो तभी Google Translate।    */
  langs: {
    source:  "hi",                  /* इस set की मूल भाषा */
    bridge:  "en",                  /* पुल भाषा */
    enabled: ["hi", "en"],          /* असली (हाथ से बने) page जिन भाषाओं में हैं */
    google:  ["hi","en","kn","mr","te","ta","bn","gu","pa","ur",
              "sw","fr","es","pt","ar","id","vi","ha"]  /* fallback widget */
  }
};
