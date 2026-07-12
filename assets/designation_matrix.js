/* ============================================================
   designation_matrix.js — पद-सूची का एकमात्र घर (परत-3: DATA)
   जगह: /assets/designation_matrix.js
   ------------------------------------------------------------
   आधार: Founder की 35-पद तालिका (10-Jul-2026 · 11:36 PM)
         + Addendum-प्रविष्टि "संगठन-ढाँचा v2.0" (11-Jul-2026 · 02:44 AM)
         + Addendum-प्रविष्टि "Vendor-role v1.7" (12-Jul-2026 · 12:12 PM)
   Version: 1.3 · 12-Jul-2026 — काम-5: public_label (कूट-नाम नियम — Founder, 12-07-2026:
            code-key सिर्फ़ internal; public को सुंदर आम-बोलचाल नाम) + ruleFile (नियम-फ़ाइल का
            एकमात्र घर अब यहीं) + registrable + geo — नीचे v1.3-block से।
   पिछला:  1.2 · 12-Jul-2026 — Vendor-कार्ड जुड़ा (v1.7-क) ·
            Employer/Foreign-Agent अलग-अलग dashboard (v1.7-ख — "एक-परिवार" पंक्ति निरस्त)
   पिछला: 1.1 · 11-Jul-2026 · 03:04 AM IST — शब्द-सुधार: "ख़ाली" शब्द हटा (पदेन-नियम: कोई पद कभी रिक्त नहीं)

   ⚠️ matrix-सुरक्षा नियम (v2.0 प्रविष्टि):
   यह फ़ाइल GitHub पर सार्वजनिक है — सिर्फ़ *दिखाने* के लिए
   (form-चुनाव, पैनल-नाम, routing)। असली रोक हमेशा server पर:
   Firestore rules + Cloud Function, जाँच teams/{uid}.designation से।
   इस फ़ाइल से कभी guard न बने।

   नियम (परत-3): सिर्फ़ जानकारी — कोई design/CSS नहीं।
   एक चीज़ = एक जगह: पद/चौकी/घर यहीं बदले → हर dashboard में बदले।
   ============================================================ */

const ACS_DESIGNATIONS = {

  version: "1.3",
  updated: "12-07-2026 IST",

  /* ---------- approval एक-पाइपलाइन (v2.0-ग) ----------
     क्रम: legal → finance → establishment → विभागीय-चौकी → अंतिम मुहर
     विभागीय-चौकी = सिर्फ़ सीधा ऊपर वाला एक (superior field)।
     अंतिम मुहर: final_approval field (founder / hq_admin)।
     पदेन-प्रभारी नियम: कोई पद कभी रिक्त/"ख़ाली" नहीं — मूल धारक न हो
     तो उसका immediate superior स्वतः पदेन प्रभारी (server-side तय)। */
  pipeline_order: ["hq_legal", "hq_finance", "hq_establishment", "SUPERIOR", "FINAL"],

  /* ---------- स्तर (level) ---------- */
  levels: {
    hq:  { label: "HQ (मुख्यालय)",   final_default: "founder"  },
    zm:  { label: "ZM कार्यालय",      final_default: "hq_admin" },
    rm:  { label: "RM कार्यालय",      final_default: "hq_admin" }
  },

  /* ============================================================
     भाग-1 — ACS TEAM के पद (teams collection · designation field)
     status: built = dashboard बना · placeholder = शुरुआती ढाँचा ·
             new = folder भी नहीं (🆕) · shared = साझा dashboard
     ============================================================ */
  teams: [

    /* ---------- शीर्ष ---------- */
    { key: "founder", label: "Founder", label_en: "Founder",
      level: "hq", qualification: "Self", min_age: null,
      dashboard: "/dashboard/founder/", superior: null,
      final_approval: "self", status: "built",
      note: "नियम-4: पद ही लिखें, नाम कभी नहीं; Founder पर कोई नियम लागू नहीं" },

    { key: "system_security", label: "System Security Head", label_en: "System Security Head",
      level: "hq", qualification: "MTech / MCA", min_age: 40,
      dashboard: "/dashboard/security/", superior: "founder",
      final_approval: "founder", status: "new",
      note: "स्वतंत्र — Admin-बराबर; सीधे Founder को; Admin से कोई लेना-देना नहीं" },

    { key: "hq_admin", label: "Admin", label_en: "Admin",
      level: "hq", qualification: "Masters", min_age: 45,
      dashboard: "/dashboard/admin/", superior: "founder",
      final_approval: "founder", status: "placeholder",
      note: "सातों Heads का प्रमुख; मास्टर टेम्पलेट dashboard (काम-3)" },

    /* ---------- Admin के नीचे 7 Heads ---------- */
    { key: "hq_establishment", label: "स्थापना Head", label_en: "Establishment Head",
      level: "hq", qualification: "Masters", min_age: 40,
      dashboard: "/dashboard/hq/establishment/", superior: "hq_admin",
      final_approval: "founder", status: "built" },

    { key: "hq_finance", label: "वित्त Head", label_en: "Finance Head",
      level: "hq", qualification: "MCom", min_age: 40,
      dashboard: "/dashboard/hq/finance/", superior: "hq_admin",
      final_approval: "founder", status: "built" },

    { key: "hq_legal", label: "कानून Head", label_en: "Legal Head",
      level: "hq", qualification: "LLB", min_age: 40,
      dashboard: "/dashboard/hq/legal/", superior: "hq_admin",
      final_approval: "founder", status: "built" },

    { key: "hq_employment", label: "रोजगार Head", label_en: "Employment Head",
      level: "hq", qualification: "Masters (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 40,
      dashboard: "/dashboard/hq/employment/", superior: "hq_admin",
      final_approval: "founder", status: "new" },

    { key: "hq_academic", label: "एकेडमिक Head", label_en: "Academic Head",
      level: "hq", qualification: "Masters (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 40,
      dashboard: "/dashboard/hq/academic/", superior: "hq_admin",
      final_approval: "founder", status: "new" },

    { key: "hq_examination", label: "एग्जामिनेशन Head", label_en: "Examination Head",
      level: "hq", qualification: "Masters (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 40,
      dashboard: "/dashboard/hq/examination/", superior: "hq_admin",
      final_approval: "founder", status: "new",
      note: "Certificate-flow (Exam → Result → Certificate) इसी के अधीन" },

    { key: "hq_network", label: "नेटवर्क Head", label_en: "Network Head",
      level: "hq", qualification: "MBA (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 40,
      dashboard: "/dashboard/hq/network/", superior: "hq_admin",
      final_approval: "founder", status: "new",
      note: "नीचे: भारत के सभी ZM + विदेशी Continental Heads" },

    /* ---------- HQ office-कर्मी ---------- */
    { key: "hq_deo", label: "Data Entry Operator (HQ)", label_en: "Data Entry Operator (HQ)",
      level: "hq", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/hq/staff/", superior: "hq_admin",
      final_approval: "founder", status: "shared", tag: "DEO" },

    { key: "hq_intern", label: "Intern (HQ)", label_en: "Intern (HQ)",
      level: "hq", qualification: "BTech", min_age: 18,
      dashboard: "/dashboard/hq/staff/", superior: "hq_admin",
      final_approval: "founder", status: "shared", tag: "Intern" },

    { key: "hq_callcenter", label: "Call Center (HQ)", label_en: "Call Center (HQ)",
      level: "hq", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/callcenter/", superior: "hq_admin",
      final_approval: "founder", status: "shared",
      note: "एक ही Call Center dashboard — दायरा level/region से; आगे Vani-आधारित CRM" },

    { key: "hq_future", label: "Future (HQ)", label_en: "Future (HQ)",
      level: "hq", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/future/", superior: "hq_admin",
      final_approval: "founder", status: "shared",
      note: "आरक्षित slot — नया पद बने तो पहले यहीं बैठे" },

    /* ---------- नेटवर्क-श्रृंखला (ZM-स्तर) ---------- */
    { key: "continental", label: "Continental Head", label_en: "Continental Head",
      level: "zm", qualification: "MBA (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 40,
      dashboard: "/dashboard/continental/", superior: "hq_network",
      final_approval: "founder", status: "new",
      note: "भारत से बाहर; नीचे हर देश का ZM" },

    { key: "zm", label: "ZM (State / Country Head)", label_en: "ZM (State / Country Head)",
      level: "zm", qualification: "MBA", min_age: 40,
      dashboard: "/dashboard/zonal/", superior: "hq_network",
      superior_abroad: "continental",
      final_approval: "founder", status: "built",
      note: "भारत में राज्य-ZM (superior = नेटवर्क Head); विदेश में देश-ZM (superior = Continental)" },

    { key: "zm_content_creator", label: "Content Creator (ZM टीम)", label_en: "Content Creator (ZM Team)",
      level: "zm", qualification: "BTech / BCA", min_age: 18,
      dashboard: "/dashboard/content-creator/", superior: "zm",
      final_approval: "hq_admin", status: "new",
      note: "कोर्स को ACS-norm पर modify/update करे; मूल Course Creator (Teacher) से अलग; कोर्स-royalty का 3% टीम-हिस्सा (v2.0-घ)" },

    { key: "zm_social_media", label: "Social Media Manager (ZM)", label_en: "Social Media Manager (ZM)",
      level: "zm", qualification: "BTech / BCA (प्रस्तावित — Founder-पुष्टि बाक़ी)", min_age: 18,
      dashboard: "/dashboard/social-media/", superior: "zm",
      final_approval: "hq_admin", status: "new" },

    { key: "zm_callcenter", label: "Call Center (ZM)", label_en: "Call Center (ZM)",
      level: "zm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/callcenter/", superior: "zm",
      final_approval: "hq_admin", status: "shared" },

    { key: "zm_deo", label: "Data Entry Operator (ZM)", label_en: "Data Entry Operator (ZM)",
      level: "zm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/hq/staff/", superior: "zm",
      final_approval: "hq_admin", status: "shared", tag: "DEO" },

    { key: "zm_intern", label: "Intern (ZM)", label_en: "Intern (ZM)",
      level: "zm", qualification: "BBA", min_age: 18,
      dashboard: "/dashboard/hq/staff/", superior: "zm",
      final_approval: "hq_admin", status: "shared", tag: "Intern" },

    { key: "zm_future", label: "Future (ZM)", label_en: "Future (ZM)",
      level: "zm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/future/", superior: "zm",
      final_approval: "hq_admin", status: "shared" },

    /* ---------- RM-स्तर ---------- */
    { key: "rm", label: "RM", label_en: "RM",
      level: "rm", qualification: "BBA", min_age: 18,
      dashboard: "/dashboard/regional/", superior: "zm",
      final_approval: "hq_admin", status: "built",
      note: "जिला-आधारित (1-3 जिले, मुख्य जिला अनिवार्य — 09-Jul नियम)" },

    { key: "rm_callcenter", label: "Call Center (RM)", label_en: "Call Center (RM)",
      level: "rm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/callcenter/", superior: "rm",
      final_approval: "hq_admin", status: "shared" },

    { key: "rm_volunteer", label: "Volunteer", label_en: "Volunteer",
      level: "rm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/volunteer/", superior: "rm",
      final_approval: "hq_admin", status: "placeholder",
      note: "ACS Team का हिस्सा, RM के अंदर; मानदेय नहीं — सिर्फ़ कमीशन; registration-card अलग रहेगा (10-कार्ड लॉक)" },

    { key: "rm_intern", label: "Intern (RM)", label_en: "Intern (RM)",
      level: "rm", qualification: "BBA", min_age: 18,
      dashboard: "/dashboard/hq/staff/", superior: "rm",
      final_approval: "hq_admin", status: "shared", tag: "Intern" },

    { key: "rm_future", label: "Future (RM)", label_en: "Future (RM)",
      level: "rm", qualification: "12th समकक्ष", min_age: 18,
      dashboard: "/dashboard/future/", superior: "rm",
      final_approval: "hq_admin", status: "shared" }
  ],

  /* ============================================================
     भाग-2 — बाहरी stakeholder कार्ड (10-कार्ड लॉक — Addendum-v1 §2;
     v1.7-क override: Founder-अधिकार से "vendor" कार्ड जुड़ा)
     code-key/collection वहीं से; उप-प्रकार (subtype) यहाँ दर्ज।
     approval-चौकियाँ बाद में इसी engine पर (v2.0-ग)।
     ============================================================ */
  cards: [
    { key: "student",       collection: "students",       dashboard: "/dashboard/student/",       label: "कोचिंग-प्रशिक्षु",  min_age: 10, subtypes: [] },
    { key: "jobseeker",     collection: "jobseekers",     dashboard: "/dashboard/jobseeker/",     label: "नौकरी-प्रशिक्षु",   min_age: 16, subtypes: [] },
    { key: "entrepreneur",  collection: "entrepreneurs",  dashboard: "/dashboard/entrepreneur/",  label: "उद्योग-प्रशिक्षु",  min_age: 16, subtypes: [] },
    { key: "teacher",       collection: "teachers",       dashboard: "/dashboard/teacher/",       label: "शिक्षक",           min_age: 18,
      subtypes: ["Teacher", "Ustad"],
      note: "स्वतंत्र शिक्षक = Course Creator (मूल कोर्स, 7% royalty lifetime — v2.0-घ); केंद्र-प्रशिक्षक अलग login नहीं (v2 §18)" },
    { key: "center",        collection: "centers",        dashboard: "/dashboard/center/",        label: "केंद्र",           min_age: 0,
      subtypes: ["Center", "WorkShop", "College", "University"],
      note: "संस्था Min-Age 0 (आज खुला, आज मान्यता); WorkShop कम-से-कम 3 वर्ष पुराना अनिवार्य" },
    { key: "counselor",     collection: "counselors",     dashboard: "/dashboard/counselor/",     label: "सलाहकार",          min_age: 18,
      subtypes: ["Counselor", "Professional"],
      note: "न्यूनतम अनुभव 5 वर्ष; 5-मिनट free preview अनिवार्य" },
    { key: "employer",      collection: "employers",      dashboard: "/dashboard/employer/",      label: "नियोक्ता",         min_age: 0,
      subtypes: ["Employer"],
      note: "v1.7-ख: Employer व Foreign Agent के dashboard अलग-अलग (v2.0 की एक-परिवार पंक्ति निरस्त); Employer के dashboard में कोई agent-सूची नहीं" },
    { key: "foreign_agent", collection: "foreign_agents", dashboard: "/dashboard/foreign-agent/", label: "विदेश एजेंट",       min_age: 0,
      subtypes: [],
      note: "v1.7-ख: अपना अलग dashboard — इसमें कई employers की सूची हो सकती है; card/Terms/eMigrate अलग" },
    { key: "volunteer",     collection: "volunteers",     dashboard: "/dashboard/volunteer/",     label: "स्वयंसेवक",        min_age: 18,
      subtypes: [],
      note: "approval पर teams-record (designation: rm_volunteer) भी बने — v2.0-घ" },
    { key: "vendor",        collection: "vendors",        dashboard: "/dashboard/vendor/",        label: "विक्रेता (Vendor)", min_age: 18,
      subtypes: [],
      note: "v1.7-क: उद्यम-स्थापना का सेवा/सामान प्रदाता; जुड़ना free; Verified Vendor = वैकल्पिक paid badge (₹300/600/1000 × 365 दिन); प्रदर्शन-नियम: बिना RM भौतिक-सत्यापन + approval-श्रृंखला के कोई नाम portal पर कभी न दिखे" },
    { key: "team",          collection: "teams",          dashboard: "/dashboard/",               label: "ACS टीम",          min_age: 18,
      subtypes: [],
      note: "designation ऊपर भाग-1 से; routing teams/{uid}.designation से" }
  ],

  /* ---------- Learner भविष्य-श्रेणी (आरक्षित — अभी नहीं बनेगी) ---------- */
  reserved: [
    { key: "others", label: "Others (Learner)", min_age: 10, note: "भविष्य की नई Learner-श्रेणी के लिए जगह आरक्षित (v2.0-घ)" }
  ]
};

/* ============================================================
   v1.3-block (12-07-2026, काम-5) — हर पद/कार्ड पर 4 नए खाने:
   public_label  = public-नाम (कूट-नाम नियम: key कभी UI पर नहीं)
   ruleFile      = rules-consent फ़ाइल (एकमात्र घर अब matrix)
   registrable   = registration-form से चुना जा सकता है या नहीं
   geo           = hq | country_state | district | continent
   ============================================================ */
(function(M){
  var PUB = {
    founder:"संस्थापक (Founder)",
    system_security:"प्रणाली सुरक्षा प्रमुख (System Security Head)",
    hq_admin:"प्रधान कार्यालय प्रशासक (HQ Administrator)",
    hq_establishment:"स्थापना प्रमुख (Establishment Head)",
    hq_finance:"वित्त प्रमुख (Finance Head)",
    hq_legal:"कानून प्रमुख (Legal Head)",
    hq_employment:"रोजगार प्रमुख (Employment Head)",
    hq_academic:"एकेडमिक प्रमुख (Academic Head)",
    hq_examination:"एग्जामिनेशन प्रमुख (Examination Head)",
    hq_network:"नेटवर्क प्रमुख (Network Head)",
    hq_deo:"Data Entry Operator — प्रधान कार्यालय",
    hq_intern:"Intern — प्रधान कार्यालय",
    hq_callcenter:"Call Center — प्रधान कार्यालय",
    hq_future:"आरक्षित पद — प्रधान कार्यालय",
    continental:"महाद्वीप प्रमुख (Continental Head)",
    zm:"राज्य/देश प्रमुख (State/Country Head)",
    zm_content_creator:"Content Creator — राज्य कार्यालय",
    zm_social_media:"Social Media Manager — राज्य कार्यालय",
    zm_callcenter:"Call Center — राज्य कार्यालय",
    zm_deo:"Data Entry Operator — राज्य कार्यालय",
    zm_intern:"Intern — राज्य कार्यालय",
    zm_future:"आरक्षित पद — राज्य कार्यालय",
    rm:"क्षेत्रीय प्रबंधक (Regional Manager)",
    rm_callcenter:"Call Center — क्षेत्रीय कार्यालय",
    rm_volunteer:"स्वयंसेवक (Volunteer)",
    rm_intern:"Intern — क्षेत्रीय कार्यालय",
    rm_future:"आरक्षित पद — क्षेत्रीय कार्यालय"
  };
  var RULE = {
    system_security:"rules-consent-system-security.html",
    hq_admin:"rules-consent-hq-admin.html",
    hq_establishment:"rules-consent-hq-establishment.html",
    hq_finance:"rules-consent-hq-finance.html",
    hq_legal:"rules-consent-hq-legal.html",
    hq_employment:"rules-consent-hq-employment.html",
    hq_academic:"rules-consent-hq-academic.html",
    hq_examination:"rules-consent-hq-examination.html",
    hq_network:"rules-consent-hq-network.html",
    hq_deo:"rules-consent-hq-staff.html",
    hq_intern:"rules-consent-intern.html",
    hq_callcenter:"rules-consent-hq-staff.html",
    continental:"rules-consent-continental.html",
    zm:"rules-consent-zm.html",
    zm_content_creator:"rules-consent-content-creator.html",
    zm_social_media:"rules-consent-social-media.html",
    zm_callcenter:"rules-consent-hq-staff.html",
    zm_deo:"rules-consent-hq-staff.html",
    zm_intern:"rules-consent-intern.html",
    rm:"rules-consent-rm.html",
    rm_callcenter:"rules-consent-hq-staff.html",
    rm_volunteer:"rules-consent-volunteer.html",
    rm_intern:"rules-consent-intern.html"
  };
  M.teams.forEach(function(t){
    t.public_label = PUB[t.key] || t.label;
    t.ruleFile = RULE[t.key] || null;
    /* registrable: founder कभी नहीं; Future-slot आरक्षित; rm_volunteer का रास्ता = volunteer-कार्ड */
    t.registrable = !(t.key === "founder" || /_future$/.test(t.key) || t.key === "rm_volunteer");
    if(t.key === "continental"){ t.geo = "continent"; }
    else if(t.level === "hq"){ t.geo = "hq"; }
    else if(t.level === "zm"){ t.geo = "country_state"; }
    else { t.geo = "district"; }
  });
  var CPUB = {
    student:"विद्यार्थी (Student)", jobseeker:"नौकरी (Job-seeker)", entrepreneur:"उद्यम (Entrepreneur)",
    teacher:"शिक्षक (Teacher)", center:"केंद्र (Center)", counselor:"सलाहकार (Counselor)",
    employer:"नियोक्ता (Employer)", foreign_agent:"विदेश एजेंट (Foreign Agent)",
    volunteer:"स्वयंसेवक (Volunteer)", vendor:"विक्रेता (Vendor)", team:"ACS टीम (ACS Team)"
  };
  var CRULE = { vendor:"rules-consent-vendor.html" };
  M.cards.forEach(function(c){
    c.public_label = CPUB[c.key] || c.label;
    if(CRULE[c.key]) c.ruleFile = CRULE[c.key];
  });
})(ACS_DESIGNATIONS);

/* browser + generator दोनों के लिए */
if (typeof module !== "undefined" && module.exports) { module.exports = ACS_DESIGNATIONS; }
if (typeof window !== "undefined") { window.ACS_DESIGNATIONS = ACS_DESIGNATIONS; }
