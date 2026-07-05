/* =====================================================================
   ACS — agreements_data.js  (सभी 18 एग्रीमेंट का code-रूप — एकमात्र स्रोत)
   घर: /assets/agreements_data.js   ·   परत-3 DATA (सिर्फ़ जानकारी)
   स्रोत: ACS-Agreements-All-18.html (तिथि-मुहर 02 July 2026, 01:20 IST)
   मूल भाषा: हिंदी  ·  v1.0 — 04 July 2026
   ---------------------------------------------------------------------
   नियम:
   - join.html का स्वागत-पृष्ठ + PDF सिर्फ़ यहीं से पढ़े — कहीं और शर्तें न लिखी जाएँ।
   - अनुवाद-क्रम: मूल हिंदी → अंग्रेज़ी (मास्टर) → बाक़ी भाषाएँ। अभी हिंदी (मूल);
     अंग्रेज़ी असली प्रति बनने तक Google Translate संभाले (Constitution v1.1)।
   - यह मसौदा-आधार है; अंतिम कानूनी मंज़ूरी HQ Legal Head की।
   - हर एग्रीमेंट: code · title · party2 · verify · elig · secs(शीर्षक+बिंदु) ·
     disc(जोखिम-नकार) · flow(जुड़ने की प्रक्रिया) · login · checks(सहमति-खाने)
===================================================================== */
window.ACS_AGREEMENTS = (function () {

  /* --- साझा पंक्तियाँ (एक चीज़ = एक जगह) --- */
  var CHG = "परिवर्तन-अधिकार: Founder शर्तें बदल सकता है; सूचना 7 दिन में; चुनौती नहीं।";
  var NORETRO = "पूर्वप्रभाव नहीं: कोई बदलाव पहले से चुकाई फ़ीस / ली-दी सेवा पर लागू नहीं।";
  var COPIES = "दो समान प्रतियाँ — एक स्टेकहोल्डर, एक ACS (HQ Legal)। विवाद: भारत = Patna High Court · अंतरराष्ट्रीय = UNCITRAL।";
  var LAWS = "POSH · POCSO · DPDP लागू; जानकारी गोपनीय; minor पर विशेष सुरक्षा।";
  var LOGIN_OTP = "Login: हर बार password + 6-अंकी Email-OTP। एक ID एक समय एक ही जगह।";
  var LOGIN_PWD = "Login: केवल ID + Password (OTP नहीं)। एक ID एक समय एक ही जगह।";
  var FLOW_ZM = "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → RM भौतिक सत्यापन → ZM प्रोविज़नल (🟡) → HQ फ़ाइनल (🟢)";
  var FLOW_LEARNER = "online रजिस्ट्रेशन → OTP-verify → सीधे active";
  var CK_TERMS = { id: "terms", req: true, hi: "मैंने ACS की शर्तें पढ़ीं व समझीं — मैं स्वीकार करता/करती हूँ।" };
  var CK_PRIV = { id: "privacy", req: true, hi: "मैं ACS Privacy Policy स्वीकार करता/करती हूँ।" };

  return {

  /* ================= समूह-1 : प्रशिक्षु (गेटवे नहीं) ================= */

  student: {
    code: "ACS-CON-STU", title: "सहमति-पत्र — प्रशिक्षु: कोचिंग (Student)",
    party2: "ACS-सिस्टम (गेटवे: नहीं — सीधे active)", verify: "—", elig: "न्यूनतम उम्र 10 वर्ष; 10-17 पर Guardian सहमति अनिवार्य।",
    secs: [
      { h: "मुझे क्या मिलेगा (अधिकार)", li: [
        "बिना login निःशुल्क: सभी कोर्स, 950 उद्यम सूची, यंत्र/training जानकारी।",
        "रजिस्ट्रेशन के बाद: aptitude test, counselling, केंद्र-कोर्स; अपनी भाषा; certificate download/share।" ] },
      { h: "फ़ीस व Refund (साफ़-साफ़)", li: [
        "जुड़ना/देखना निःशुल्क; पैसा केवल 5 सेवाओं पर: aptitude · offline training · workshop · counselling · foreign-agent connection। हर fee पहले साफ़ बताई जाएगी।",
        "Aptitude: हर हाल 30% कटौती; result दिखा = refund नहीं; final-submit से पहले छोड़ा = 70% वापस।",
        "Counselling: सत्र से 1 घंटा पहले cancel = 90% वापस (कोई भी cancel करे)। मृत्यु/आपदा = 75% वापस।" ] },
      { h: "कर्तव्य व सुरक्षा", li: [ LAWS, "Certificate केवल असली Exam → Result → Certificate प्रवाह से।" ] },
      { h: "सर्वोच्चता", li: [ CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: कोर्स/प्रशिक्षण से नौकरी या आय की कोई गारंटी नहीं; certificate योग्यता-प्रमाण है, रोज़गार-आश्वासन नहीं।",
    flow: FLOW_LEARNER, login: LOGIN_PWD,
    checks: [ CK_TERMS, CK_PRIV ]
  },

  jobseeker: {
    code: "ACS-AGR-JOB", title: "सेवा-शर्तें व सहमति-पत्र — प्रशिक्षु: नौकरी (Job-seeker)",
    party2: "ACS-सिस्टम (गेटवे: नहीं — सीधे active)", verify: "—",
    elig: "तैयारी 16 वर्ष से (16-17 पर Guardian सहमति); असली job/apply/joining केवल 18+ पर।",
    secs: [
      { h: "उम्र-नियम (अनिवार्य)", li: [
        "16+ = तैयारी/training (Centre-देखरेख)। असली apply/joining केवल 18+ पर।",
        "16-17 (minor): Centre-देखरेख site-visit/कैंप; Guardian सहमति या साथ; POCSO लागू।" ] },
      { h: "अधिकार व फ़ीस", li: [
        "job-जानकारी/अवसर देखना निःशुल्क; 18+ पर dashboard से संपर्क।",
        "Verified Badge वैकल्पिक — Village ₹300 · Town ₹600 · Metro ₹1000 · 365 दिन (flat, उम्र-जोड़ नहीं)।",
        "platform-fee सीधे ACS को; किसी employer/agent को कोई fee नहीं — कोई माँगे तो अवैध, तुरंत रिपोर्ट करें।" ] },
      { h: "सुरक्षा", li: [ LAWS, "सहमति वाले संपर्क ही; fake job/advance-fee तुरंत रिपोर्ट।" ] },
      { h: "सर्वोच्चता", li: [ CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: नौकरी/placement में सफलता की कोई गारंटी नहीं; रोज़गार का अंतिम निर्णय employer का; ACS मध्यस्थ मात्र।",
    flow: FLOW_LEARNER, login: LOGIN_PWD,
    checks: [ CK_TERMS,
      { id: "join18", req: true, hi: "असली job/joining 18+ पर ही — मैंने समझा/समझी।" },
      CK_PRIV ]
  },

  entrepreneur: {
    code: "ACS-AGR-ENT", title: "सेवा-शर्तें व सहमति-पत्र — प्रशिक्षु: उद्योग (Entrepreneur)",
    party2: "ACS-सिस्टम (गेटवे: नहीं — सीधे active)", verify: "—",
    elig: "न्यूनतम उम्र 16 वर्ष; Tour पर 16-17 = Guardian की notarized अनुमति अनिवार्य।",
    secs: [
      { h: "मुझे क्या मिलेगा (अधिकार)", li: [
        "950 उद्यम की bank-finance-ready रिपोर्ट, market research, यंत्र-सूची, कोर्स; निवेश-सीढ़ी L1-L15; Industrial Tour पैकेज।" ] },
      { h: "Industrial Tour (यदि लूँ)", li: [
        "निवेश-आधारित सीढ़ी: ₹20 लाख से कम → स्थानीय (1 माह) · ₹20 लाख-1 करोड़ → राज्य (15 दिन) · ₹1-10 करोड़ → देश का best (10 दिन) · ₹10 करोड़+ → अंतरराष्ट्रीय (5 दिन)।",
        "सुरक्षा (ISO 31031 आधारित): supervisor 1:10-15; 3-4 के समूह; 16-17 पर passport + notarized Guardian-अनुमति; बीमा; 24×7 आपात-लाइन। न्यूनतम राशि पहले बताई जाएगी।" ] },
      { h: "फ़ीस व Refund", li: [
        "जुड़ना/जानकारी निःशुल्क; पैसा केवल Tour/सेवा पर। Tour का पैसा escrow में; ख़र्च हुआ हिस्सा (वीज़ा/टिकट/booking) वापसी-योग्य नहीं, बाक़ी वापस।" ] },
      { h: "सर्वोच्चता", li: [ CHG, NORETRO + " (Tour सहित)", COPIES ] }
    ],
    disc: "जोखिम-नकार (महत्वपूर्ण): उद्यम के साथ जोखिम सदैव जुड़ा है। किसी भी हानि/नुक़सान के लिए ACS, FFGPMTrust या कोई Counselor उत्तरदायी नहीं; निवेश व परिणाम की पूर्ण ज़िम्मेदारी उद्यमी की स्वयं। रिपोर्ट/सफलता-% केवल जानकारी — कोई गारंटी नहीं।",
    flow: FLOW_LEARNER, login: LOGIN_PWD,
    checks: [ CK_TERMS,
      { id: "risk", req: true, hi: "उद्यम-जोखिम मेरा अपना; हानि के लिए ACS/Counselor उत्तरदायी नहीं — मैंने समझा/समझी।" },
      { id: "tour", req: false, hi: "Tour की सुरक्षा-शर्तें स्वीकार (यदि Tour लूँ)।" },
      CK_PRIV ]
  },

  /* ================= समूह-2 : जुड़कर कमाने वाले (गेटवे — pending) ================= */

  teacher: {
    code: "ACS-AGR-TCH", title: "सेवा-शर्तें व सहमति-पत्र — शिक्षक (Teacher)",
    party2: "ZM", verify: "HQ Legal Head", elig: "जुड़ना निःशुल्क; न्यूनतम उम्र 18।",
    secs: [
      { h: "भूमिका", li: [ "कोर्स/content बनाना, पढ़ाना (online/live), कमाना।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [
        "royalty लाइफटाइम: Content Creator 7% · Translator 3% — जीवनभर; मृत्यु के बाद नॉमिनी को।",
        "live-class fee स्वयं तय — ACS न्यूनतम से नीचे नहीं; अधिकतम पर बंदिश नहीं।",
        "royalty/आय-भुगतान: भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold अधिकतम 60 दिन।" ] },
      { h: "बैज (Verified Badge)", li: [
        "बैज: Metro ₹1000 · Town/जिला-HQ ₹600 · Village/एरिया ₹300 · 365 दिन।",
        "45+ = वैकल्पिक; 45 से कम = अनिवार्य (प्रवेश-टिकट) + उम्र-fee x% (x = 45 − उम्र)।",
        "नवीनीकरण: पहली बार पूरा; पहला नवीनीकरण = (1 अप्रैल तक बचे दिन ÷ 365) × फीस; फिर हर वर्ष 1 अप्रैल-31 मार्च (खिड़की 1-25 मार्च)।" ] },
      { h: "कर्तव्य", li: [
        "केवल मौलिक content; content अप-टू-डेट रखना = कर्तव्य; गुणवत्ता; समय पर class।",
        "AI-Training में content का उपयोग बिना लिखित अनुमति नहीं; Copyright Act 1957 Sec 57 — Moral Rights सुरक्षित।", LAWS ] },
      { h: "समाप्ति · सर्वोच्चता", li: [
        "7-दिन Show-Cause; Appeal 15 दिन; content-चोरी/मानहानि = तत्काल समाप्ति (पूर्व-content की royalty का निपटान नियमानुसार — Legal Head समीक्षा)।",
        CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: ACS का मंच केवल मार्गदर्शन — कमाई/आय की कोई गारंटी नहीं; कमाई प्रयास व माँग पर निर्भर।",
    flow: FLOW_ZM, login: LOGIN_OTP,
    checks: [ CK_TERMS, CK_PRIV ]
  },

  center: {
    code: "ACS-AGR-CTR", title: "सेवा-शर्तें व सहमति-पत्र — केंद्र (Center)",
    party2: "ZM", verify: "HQ Legal Head", elig: "जुड़ना निःशुल्क।",
    secs: [
      { h: "भूमिका", li: [ "ACS कोर्स offline चलाना; students को enroll व प्रशिक्षण देना।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [
        "कोर्स-आय का हिस्सा: Center 80% · Content Creator 7% · Translator 3% · ACS 5% · State 5%।",
        "कोर्स-fee स्वयं तय — ACS न्यूनतम से नीचे नहीं; अधिकतम पर बंदिश नहीं; छूट-banner (अंतिम fee न्यूनतम से नीचे नहीं)।",
        "मुफ़्त ACS branding; WhatsApp panel (केवल enrolled + सहमति वाले students)।",
        "हिस्सा-भुगतान: भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold अधिकतम 60 दिन।" ] },
      { h: "बैज (वैकल्पिक, स्थान-आधारित)", li: [
        "Metropolitan ₹1000 · जिला-मुख्यालय ₹600 · एरिया ₹300 · 365 दिन (उम्र-fee नहीं); नवीनीकरण 1 अप्रैल-31 मार्च।" ] },
      { h: "कर्तव्य", li: [
        "fee न्यूनतम slab से नीचे नहीं; certificate केवल असली Exam → Result → Certificate प्रवाह से — कोई shortcut नहीं।",
        LAWS + " कोई भेदभाव नहीं।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [
        "7-दिन Show-Cause; Appeal 15 दिन; फ़र्ज़ी certificate/मानहानि = तत्काल समाप्ति।", CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: ACS की सामग्री/अवसर केवल मार्गदर्शन — कमाई/नामांकन की गारंटी नहीं; परिणाम प्रयास व माँग पर निर्भर।",
    flow: FLOW_ZM, login: LOGIN_OTP,
    checks: [ CK_TERMS, CK_PRIV ]
  },

  counselor: {
    code: "ACS-AGR-CNS", title: "सेवा-शर्तें व सहमति-पत्र — सलाहकार (Counselor)",
    party2: "ZM", verify: "HQ Legal Head", elig: "न्यूनतम उम्र 18; न्यूनतम अनुभव 5 वर्ष (45-उम्र शर्त नहीं)।",
    secs: [
      { h: "अधिकार व पारिश्रमिक", li: [
        "आय-हिस्सा: Counselor 90% · State 5% · ACS 5%; fee स्वयं तय (न्यूनतम से ऊपर)।",
        "आय-भुगतान: भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold अधिकतम 60 दिन।" ] },
      { h: "बैज", li: [
        "Metro ₹1000 · Town/जिला-HQ ₹600 · Village/एरिया ₹300 · 365 दिन; 45+ वैकल्पिक; 45 से कम अनिवार्य + उम्र-fee x% (x = 45 − उम्र)।" ] },
      { h: "कर्तव्य", li: [
        "हर payment से पहले 5-मिनट free preview अनिवार्य; ईमानदार-निष्पक्ष सलाह।", LAWS ] },
      { h: "Refund", li: [ "सत्र से 1 घंटा पहले cancel = 90% वापस (कोई भी cancel करे)।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [
        "7-दिन Show-Cause; भ्रामक सलाह/मानहानि = तत्काल समाप्ति।", CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: सलाह केवल मार्गदर्शन — किसी करियर/उद्यम-निर्णय की हानि के लिए सलाहकार व ACS उत्तरदायी नहीं; कोई गारंटी नहीं।",
    flow: FLOW_ZM, login: LOGIN_OTP,
    checks: [ CK_TERMS, CK_PRIV ]
  },

  employer: {
    code: "ACS-AGR-EMP", title: "सेवा-शर्तें व सहमति-पत्र — नियोक्ता (Employer)",
    party2: "ZM", verify: "HQ Legal Head", elig: "जुड़ना पूर्णतः निःशुल्क (भविष्य का split Founder तय करे)।",
    secs: [
      { h: "भूमिका व शुल्क", li: [ "job post करना; dashboard से staff ढूँढना; जुड़ना निःशुल्क।" ] },
      { h: "बैज (वैकल्पिक, स्थान-आधारित)", li: [ "Metropolitan ₹1000 · जिला-मुख्यालय ₹600 · एरिया ₹300 · 365 दिन।" ] },
      { h: "कर्तव्य (अनिवार्य)", li: [
        "worker/job-seeker से शून्य (ZERO) शुल्क — शुल्क लेना अवैध। संपर्क केवल ACS dashboard से।",
        "पारिश्रमिक Minimum Wage से कम नहीं; फ़र्ज़ी job · advance-fee · Human Trafficking = तत्काल समाप्ति।",
        "Child Labor (14 से कम) निषिद्ध; " + LAWS + " (IT Act 2000 Sec 79 — ACS मध्यस्थ।)" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause।", CHG, COPIES ] }
    ],
    disc: "",
    flow: FLOW_ZM, login: LOGIN_OTP,
    checks: [ CK_TERMS,
      { id: "zeroFee", req: true, hi: "worker/job-seeker से शून्य शुल्क — मैं स्वीकार करता/करती हूँ।" },
      CK_PRIV ]
  },

  foreign_agent: {
    code: "ACS-AGR-FGA", title: "सेवा-शर्तें व सहमति-पत्र — विदेश एजेंट (Foreign Agent)",
    party2: "ZM", verify: "HQ Legal Head",
    elig: "वैध eMigrate/RA लाइसेंस अनिवार्य — बिना इसके पंजीकरण/कार्य नहीं।",
    secs: [
      { h: "अधिकार व पारिश्रमिक", li: [
        "आय-हिस्सा: Agent 90% · ACS 5% · State 5%।",
        "commission केवल employer से; बच्चे/worker/job-seeker से कुछ नहीं।",
        "आय-भुगतान: भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold अधिकतम 60 दिन।" ] },
      { h: "बैज", li: [ "वैकल्पिक — फ़िलहाल भारतीय मुद्रा (INR); नवीनीकरण 1 अप्रैल-31 मार्च।" ] },
      { h: "कर्तव्य (अनिवार्य)", li: [
        "बच्चे/worker/job-seeker से कोई शुल्क नहीं; केवल वैध-सत्यापित placement।",
        "कोई धोखा/Human Trafficking नहीं; passport ज़ब्त करना सख़्त निषिद्ध; eMigrate/श्रम-नियमों का पालन।", LAWS ] },
      { h: "समाप्ति · सर्वोच्चता", li: [
        "फ़र्ज़ी placement/worker-fee/trafficking/लाइसेंस-उल्लंघन/मानहानि = तत्काल समाप्ति; 7-दिन Show-Cause।",
        CHG, NORETRO, COPIES ] }
    ],
    disc: "जोखिम-नकार: विदेश job/आय की कोई गारंटी नहीं; रोज़गार का अंतिम निर्णय employer का; ACS मध्यस्थ मात्र।",
    flow: "online रजिस्ट्रेशन (OTP-verify + eMigrate) → पेंडिंग (7 कार्य-दिवस) → RM भौतिक सत्यापन → ZM प्रोविज़नल (🟡) → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP,
    checks: [ CK_TERMS,
      { id: "zeroFee", req: true, hi: "बच्चे/worker से शून्य शुल्क — मैं स्वीकार करता/करती हूँ।" },
      CK_PRIV ]
  },

  volunteer: {
    code: "ACS-AGR-VOL", title: "सेवा-शर्तें व सहमति-पत्र — Volunteer (स्वयंसेवक)",
    party2: "RM", verify: "HQ Legal Head", elig: "सेवा-भाव से जुड़ना; RM भौतिक सत्यापन अनिवार्य।",
    secs: [
      { h: "भूमिका व कार्य", li: [
        "कहीं के भी हर स्तर के स्टेकहोल्डर (ख़ासकर कम-पढ़े) को उनके मोबाइल से नेटवर्क में जोड़ना।",
        "नियम ज़मीनी स्तर पर समझाना; RM से मिलाना; verification में सहयोग।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [
        "प्रति-verification पारितोषिक (राशि ACS तय)।",
        "स्टार रेटिंग + बोनस: लगभग 20-25/दिन या 500/माह जोड़ने पर; भारी पुरस्कार: एक वर्ष में 5000+ जोड़ने पर।",
        "अपने नीचे अधिकतम 21 Volunteer; ख़ुद के सीधे जोड़े 5001 स्टेकहोल्डर + 21 Volunteer = RM-पात्रता (RM के सभी नियम+अप्रूवल लागू; अवसर, गारंटी नहीं)।",
        "1 वर्ष सेवा + RM सिफ़ारिश → ACS Team में अवसर (उम्मीद, गारंटी नहीं)।" ] },
      { h: "कर्तव्य", li: [
        "सही व ईमानदार जानकारी; कम-पढ़े की सहमति व गरिमा; password/OTP का दुरुपयोग नहीं।", LAWS,
        "Article 19(1)(a): ईमानदार आलोचना — आपका अधिकार।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [
        "7-दिन Show-Cause; धोखाधड़ी/मानहानि = तत्काल समाप्ति; पारितोषिक hold अधिकतम 60 दिन।", CHG, COPIES ] }
    ],
    disc: "",
    flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → RM भौतिक सत्यापन → RM स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP,
    checks: [ CK_TERMS, CK_PRIV ]
  },

  /* ================= team-कार्ड (designation-अनुसार 9 एग्रीमेंट) ================= */

  founder: {
    code: "ACS-DEC-FND", title: "घोषणा एवं स्वीकृति पत्र — Founder",
    party2: "— (घोषणा; दो-पक्षीय एग्रीमेंट नहीं)", verify: "—", elig: "Founder auto — किसी अप्रूवल-शृंखला के अधीन नहीं। केवल पद, नाम नहीं।",
    secs: [
      { h: "Founder की स्थिति", li: [
        "revenue/नीति/विवाद की उलझन में अंतिम फ़ैसला Founder का।",
        "व्यक्तिगत नाम सार्वजनिक दस्तावेज़ में नहीं — केवल पद।" ] },
      { h: "मूल सिद्धांत (संरक्षण Founder का दायित्व)", li: [
        "जुड़ना व कमाना सबके लिए निःशुल्क; पैसा केवल सेवा लेने पर।",
        "सेवा के बदले पैसा केवल प्रशिक्षु देता है; शेष कमाने जुड़ते हैं; समस्त platform-राजस्व ACS/HQ को — किसी बिचौलिए को नहीं।" ] },
      { h: "सर्वोच्चता", li: [
        "ACS Constitution व नवीनतम परिशिष्ट के दर्ज नियम अंतिम; टकराव में नवीनतम नियम व Founder-निर्देश मान्य।", CHG ] }
    ],
    disc: "", flow: "Founder = auto (कोई पेंडिंग/अप्रूवल नहीं)", login: LOGIN_OTP,
    checks: [ { id: "declare", req: true, hi: "मैं उपरोक्त सभी घोषणाएँ स्वीकार करता/करती हूँ।" } ]
  },

  hq_admin: {
    code: "ACS-AGR-HQADMIN", title: "सेवा-शर्तें व सहमति-पत्र — HQ Admin",
    party2: "Founder", verify: "HQ Legal Head", elig: "तीनों Head (Establishment · Finance · Legal) का प्रमुख।",
    secs: [
      { h: "भूमिका", li: [ "HQ प्रशासन एवं joining-approval का उत्तरदायित्व (Founder के अधीन)।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "सम्पूर्ण HQ का data/dashboard; मानदेय — माह की 1-7 तारीख़।" ] },
      { h: "कर्तव्य", li: [ "नियम-कानून का पालन/क्रियान्वयन; अधीनस्थों की भर्ती/सत्यापन में मर्यादा।", LAWS + " केवल अपने दायरे तक।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; Appeal 15 दिन; मानहानि = तत्काल समाप्ति; payment hold अधिकतम 60 दिन (48 घंटे में सूचना)।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → Founder स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  hq_establishment: {
    code: "ACS-AGR-HQEST", title: "सेवा-शर्तें व सहमति-पत्र — HQ Establishment Head",
    party2: "HQ Admin", verify: "HQ Legal Head", elig: "पात्रता: Cyber Security।",
    secs: [
      { h: "भूमिका", li: [ "IT · systems · तकनीकी सुरक्षा प्रमुख; अधीन: support · call-center · intern।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने विभाग का data/dashboard; मानदेय माह 1-7।" ] },
      { h: "कर्तव्य", li: [ "Firestore Rules, login-guard, OTP-व्यवस्था की रक्षा; डेटा-रिसाव रोकना।", LAWS + " केवल अपने दायरे तक।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; Appeal 15 दिन; मानहानि = तत्काल समाप्ति; hold 60 दिन।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → HQ Admin स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  hq_finance: {
    code: "ACS-AGR-HQFIN", title: "सेवा-शर्तें व सहमति-पत्र — HQ Finance Head",
    party2: "HQ Admin", verify: "HQ Legal Head", elig: "पात्रता: Commerce / CS / CA।",
    secs: [
      { h: "भूमिका", li: [ "भुगतान · लेखा · audit प्रमुख; अधीन: support · call-center · intern।" ] },
      { h: "कर्तव्य", li: [
        "समयबद्ध भुगतान: भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold अधिकतम 60 दिन।",
        "Revenue-हिस्सा लागू रखना: कोर्स 80/7/3/5/5 · Counselor 90/5/5 · Foreign Agent 90/5/5।",
        "फीस-slab निगरानी (न्यूनतम से नीचे नहीं)।", LAWS + " केवल अपने दायरे तक।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने विभाग का data/dashboard; मानदेय माह 1-7।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; वित्तीय अनियमितता/मानहानि = तत्काल समाप्ति।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → HQ Admin स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  hq_legal: {
    code: "ACS-AGR-HQLEG", title: "सेवा-शर्तें व सहमति-पत्र — HQ Legal Head",
    party2: "HQ Admin", verify: "Founder (इस पद हेतु)", elig: "पात्रता: High Court अधिवक्ता।",
    secs: [
      { h: "भूमिका", li: [ "terms · अनुपालन · विवाद-प्रबंधन प्रमुख; सभी एग्रीमेंट का सत्यापन अधिकारी (अपने पद को छोड़कर)।" ] },
      { h: "कर्तव्य", li: [ "दस्तावेज़ों की कानूनी शुद्धता; POSH · POCSO · DPDP · IT Act अनुपालन; विवादों में नेटवर्क का पक्ष।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने विभाग का data/dashboard; मानदेय माह 1-7।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; कदाचार/मानहानि = तत्काल समाप्ति।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → HQ Admin स्वीकृति → Founder सत्यापन → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  zm: {
    code: "ACS-AGR-ZM", title: "सेवा-शर्तें व सहमति-पत्र — ZM (State / Country Head)",
    party2: "HQ", verify: "HQ Legal Head",
    elig: "पात्रता: Cyber Security। पद-नाम: भारत = State Head · विदेश = Country Head।",
    secs: [
      { h: "भूमिका", li: [
        "अपने राज्य (भारत) / देश (विदेश) का प्रमुख; अधीन: RM व टीम।",
        "प्रोविज़नल (अस्थायी) अप्रूवल प्राधिकारी; विदेश सेवा: अपने देश के tour/placement की तैयारी।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने राज्य/देश का data/dashboard; call-center panel; पारिश्रमिक: मानदेय + कमीशन + भत्ता (माह 1-7)।" ] },
      { h: "कर्तव्य", li: [ "राज्य/देश-स्तर संचालन व विस्तार; अधीनस्थों का सत्यापन/निगरानी।", LAWS + " केवल अपने दायरे तक।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; मानहानि = तत्काल समाप्ति; hold 60 दिन।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → HQ भौतिक सत्यापन (विशेष हाल/विदेश में live-video call मान्य) → HQ स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  rm: {
    code: "ACS-AGR-RM", title: "सेवा-शर्तें व सहमति-पत्र — RM (Regional Manager)",
    party2: "ZM", verify: "HQ Legal Head", elig: "पात्रता: Cyber Security (सहायक: Marketing)।",
    secs: [
      { h: "भूमिका", li: [
        "अपने क्षेत्र का प्रमुख (ZM के अधीन); अधीन: Field Staff व टीम।",
        "भौतिक सत्यापन प्राधिकारी — आँखों-देखा सत्यापन कर ZM को रिपोर्ट; Volunteer का सत्यापन।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने क्षेत्र का data/dashboard; call-center panel; पारिश्रमिक: मानदेय + कमीशन + भत्ता (माह 1-7)।" ] },
      { h: "कर्तव्य", li: [ "क्षेत्र-संचालन, विस्तार, ज़मीनी सत्यापन; नए स्टेकहोल्डर/Volunteer को जोड़ना व मार्गदर्शन।", LAWS + " केवल अपने क्षेत्र तक।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; झूठा सत्यापन/मानहानि = तत्काल समाप्ति।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → ZM भौतिक सत्यापन → ZM प्रोविज़नल (🟡) → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  staff: {
    code: "ACS-AGR-STAFF", title: "सेवा-शर्तें व सहमति-पत्र — Staff (कार्यालय-सहायक)",
    party2: "संबंधित कार्यालय-प्रमुख", verify: "HQ Legal Head",
    elig: "पात्रता: Marketing / Cyber Security / Software। (Support व Call Center — दोनों इसी में।)",
    secs: [
      { h: "भूमिका", li: [ "अपने कार्यालय (HQ/ZM/RM) में प्रमुख की सहायता; support · call-center · संचालन।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "अपने निर्धारित दायरे का panel/dashboard; मानदेय माह 1-7।" ] },
      { h: "कर्तव्य", li: [ "प्रमुख के निर्देशानुसार कार्य; गोपनीयता; केवल अपने दायरे तक।", LAWS ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; मानहानि = तत्काल समाप्ति।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → संबंधित Head स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  },

  intern: {
    code: "ACS-AGR-INTERN", title: "सेवा-शर्तें व सहमति-पत्र — Intern / Apprentice",
    party2: "संबंधित कार्यालय", verify: "HQ Legal Head",
    elig: "अपने कार्यालय में सीखते हुए सहयोग (प्रशिक्षण-अवधि); 18 से कम पर Guardian लिखित सहमति अनिवार्य (POCSO लागू)।",
    secs: [
      { h: "भूमिका", li: [ "अपने कार्यालय में सीखते हुए सहयोग; आगे team-member का मार्ग।" ] },
      { h: "अधिकार व पारिश्रमिक", li: [ "सीमित दायरे का dashboard (Intern tag); स्टाइपेंड/पारिश्रमिक (यदि लागू) माह 1-7।" ] },
      { h: "अवधि (Term)", li: [ "निश्चित-अवधि इंटर्नशिप; अवधि-अंत पर मूल्यांकन → team-अवसर (गारंटी नहीं)।" ] },
      { h: "minor (18 से कम) सुरक्षा", li: [ "Guardian लिखित सहमति अनिवार्य; POCSO पूर्णतः लागू।" ] },
      { h: "समाप्ति · सर्वोच्चता", li: [ "7-दिन Show-Cause; मानहानि = तत्काल समाप्ति।", CHG, COPIES ] }
    ],
    disc: "", flow: "online रजिस्ट्रेशन (OTP-verify) → पेंडिंग (7 कार्य-दिवस) → भौतिक सत्यापन → कार्यालय स्वीकृति → HQ फ़ाइनल (🟢)",
    login: LOGIN_OTP, checks: [ CK_TERMS, CK_PRIV ]
  }

  };
})();
