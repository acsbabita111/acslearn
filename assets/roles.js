/* =====================================================================
   ACS — roles.js  (v2.0 — पूर्ण अद्यतन)
   घर: /assets/roles.js   ·   परत-3 DATA (सिर्फ़ जानकारी — कोई design नहीं)
   मूल भाषा: हिंदी
   ---------------------------------------------------------------------
   यह इस पूरे chatroom (join.html rebuild) का एकमात्र सच्चा data-स्रोत है:
   - हर भूमिका, उसका rules-consent फ़ाइल-नाम, dashboard-पता, Step-3 के खाने
   - राज्य/देश की सूची + RM-कार्यालयों की सीढ़ी (पहले join.html में अलग हार्डकोड थी — अब यहीं)
   - team-designation का 3-कदम चयन (स्तर→विभाग→भूमिका)
   बदलाव यहीं करें — join.html, designation-gate किसी भी और फ़ाइल में हार्डकोड न करें।

   पक्के नियम:
   1) कार्ड/भूमिकाएँ अंतिम नहीं — घटती-बढ़ती रहेंगी। बदलाव सिर्फ़ यहीं।
   2) रजिस्ट्रेशन (हर भूमिका) = OTP-verify के बाद ही — कोई अपवाद नहीं।
   3) Login: learnerKeys वाले = सिर्फ़ ID+Password; बाक़ी सब = हर बार Email-OTP।
   4) Auto-logout: 10 मिनट हलचल नहीं → logout। Forgot Password = OTP से।
   5) नाम-प्रकार खाने (नाम/नॉमिनी/संस्था) हमेशा दो-रूप: हिंदी(स्थानीय) + ROMAN CAPITAL(database)।
   6) हर भूमिका का पूरा नियम-पाठ उसकी अपनी rules-consent-*.html फ़ाइल में — यहाँ सिर्फ़ फ़ाइल-नाम व Step-3 खाने।
===================================================================== */
window.ACS_ROLES = {
  version: "2.0",
  updated: "05 July 2026",

  /* ---- Learner-समूह (login सिर्फ़ ID+Password) — फ़िलहाल 3, research से बदल सकता है ---- */
  learnerKeys: ("student jobseeker entrepreneur").split(" "),

  /* ---- कार्ड-समूह शीर्षक ---- */
  groups: {
    g1: { hi: "🟦 मैं सीखना / कमाना चाहता हूँ", en: "I want to learn / earn" },
    g2: { hi: "🟨 मैं ACS से जुड़कर कमाना चाहता हूँ", en: "I want to earn with ACS" },
    g3: { hi: "🛠️ ACS Team", en: "ACS Team" }
  },

  /* =====================================================================
     भूमिका-सूची (रजिस्ट्रेशन-गेट में यही क्रम दिखेगा)
     हर भूमिका: key · group · icon · नाम · collection · dashboard ·
                ruleFile(असली rules-consent फ़ाइल — join.html यहीं से fetch करे) ·
                gateway(true=अप्रूवल-शृंखला/pending, false=OTP के बाद सीधे active) ·
                needsGeo(true = राज्य/देश-चयन ज़रूरी) · needsRMOffice(true = आगे RM-सूची भी) ·
                subtypes(अगर भूमिका के अंदर उप-चयन है — उसका फ़ाइल के अंदर अपना selector है) ·
                fields(Step-3 के भूमिका-विशेष खाने)
  ===================================================================== */
  cards: (function () {
    var F = {}; /* साझा field-परिभाषाएँ — दोहराव नहीं (एक चीज़ = एक जगह) */
    F.nameLocal  = { id:"name_local", type:"text", required:true, hi:"नाम — हिंदी/स्थानीय भाषा में", en:"Name — local script" };
    F.nameRoman  = { id:"name_roman", type:"text", required:true, roman:true, hi:"Name — ROMAN CAPITAL में (database के लिए)", en:"Name — ROMAN CAPITAL (for database)" };
    F.age = function (min, hintHi, hintEn) {
      return { id:"age", type:"number", min:min, max:100, required:true, hi:"उम्र", en:"Age", hint_hi:hintHi||"", hint_en:hintEn||"" };
    };
    F.guardianName = { id:"guardian_name", type:"text", required:false, showWhenMinor:true, hi:"Guardian का नाम", en:"Guardian Name" };
    F.guardianRel  = { id:"guardian_relation", type:"text", required:false, showWhenMinor:true, hi:"Guardian से संबंध", en:"Guardian Relation" };
    F.nomineeName  = { id:"nominee_name", type:"text", required:true, hi:"नॉमिनी का नाम", en:"Nominee Name",
      hint_hi:"मृत्यु के बाद royalty/पारिश्रमिक नॉमिनी को जाता है", hint_en:"Royalty/dues go to nominee after death" };
    F.nomineeRel   = { id:"nominee_relation", type:"text", required:true, hi:"नॉमिनी से संबंध", en:"Nominee Relation" };
    F.address      = { id:"address", type:"text", required:true, hi:"पूरा पता", en:"Full Address", ph_hi:"गाँव/शहर, ज़िला, राज्य" };

    return [
      /* ---------------- समूह-1 : Learner (गेटवे नहीं — 3-में-1 फ़ाइल) ---------------- */
      { key:"learner", group:"g1", icon:"🎓",
        hi:"Learner — Student / Job-seeker / Entrepreneur", en:"Learner — Student / Job-seeker / Entrepreneur",
        desc_hi:"सीखने वाला — उम्र व उप-प्रकार फ़ाइल के अंदर चुनें", desc_en:"Learner — choose sub-type & age inside",
        collection:"learners", dashboard:"/dashboard/learner/",
        ruleFile:"rules-consent-learner.html", gateway:false, needsGeo:false, needsRMOffice:false,
        subtypes:["student","jobseeker","entrepreneur"], /* फ़ाइल के अंदर अपना selector है */
        fields: [ F.nameLocal, F.nameRoman ] /* उम्र/Guardian/पुलिस-वेरिफिकेशन फ़ाइल के अंदर ही dynamic हैं */
      },

      /* ---------------- समूह-2 : जुड़कर कमाने वाले (गेटवे — RM/ZM/HQ शृंखला) ---------------- */
      { key:"teacher", group:"g2", icon:"👨‍🏫",
        hi:"Teacher / उस्ताद", en:"Teacher / Ustad",
        desc_hi:"कोर्स पढ़ाएँ या पारंपरिक हुनर सिखाएँ — royalty लाइफटाइम", desc_en:"Teach courses or traditional skills — lifetime royalty",
        collection:"teachers", dashboard:"/dashboard/teacher/",
        ruleFile:"rules-consent-teacher.html", gateway:true, needsGeo:false, needsRMOffice:false,
        subtypes:["teacher","ustad"],
        fields: [ F.nameLocal, F.nameRoman, F.age(18,"न्यूनतम 18 वर्ष"),
          { id:"subject", type:"text", required:true, hi:"विषय / हुनर का क्षेत्र", en:"Subject / Skill area" },
          { id:"experience", type:"number", min:0, required:false, hi:"अनुभव (वर्ष)", en:"Experience (years)" },
          F.nomineeName, F.nomineeRel ]
      },

      { key:"centre", group:"g2", icon:"🏫",
        hi:"Centre / Workshop", en:"Centre / Workshop",
        desc_hi:"किताबी कोर्स या सीधे-कमाई का हुनर सिखाने वाला केंद्र", desc_en:"Academic coaching or direct-earning skill workshop",
        collection:"centres", dashboard:"/dashboard/centre/",
        ruleFile:"rules-consent-centre.html", gateway:true, needsGeo:false, needsRMOffice:false,
        subtypes:["centre","workshop"],
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"केंद्र/वर्कशॉप का नाम", en:"Centre/Workshop Name" },
          { id:"address", type:"text", required:true, hi:"पूरा पता", en:"Address" },
          { id:"district", type:"text", required:true, hi:"ज़िला", en:"District" } ]
      },

      { key:"counselor", group:"g2", icon:"🧭",
        hi:"Counselor", en:"Counselor",
        desc_hi:"करियर/उद्योग सलाह — आय 90% + टर्न-की उद्योग-सेटअप सेवा भी", desc_en:"Career/industry advice — 90% share + optional turn-key setup service",
        collection:"counselors", dashboard:"/dashboard/counselor/",
        ruleFile:"rules-consent-counselor.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman, F.age(18,"न्यूनतम 18 वर्ष"),
          { id:"experience", type:"number", min:5, required:true, hi:"अनुभव (वर्ष)", en:"Experience (years)", hint_hi:"न्यूनतम 5 वर्ष अनिवार्य" },
          { id:"specialization", type:"text", required:true, hi:"विशेषज्ञता का विषय", en:"Specialization" }, F.address ]
      },

      { key:"employer", group:"g2", icon:"🧑‍💼",
        hi:"Employer", en:"Employer",
        desc_hi:"job post करें, staff पाएँ — जुड़ना निःशुल्क", desc_en:"Post jobs, find staff — free to join",
        collection:"employers", dashboard:"/dashboard/employer/",
        ruleFile:"rules-consent-employer.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"संस्था/व्यवसाय का नाम", en:"Business/Organization Name" },
          { id:"business_type", type:"select", required:false, hi:"व्यवसाय-प्रकार", en:"Business Type",
            options:[ {v:"individual",hi:"व्यक्तिगत",en:"Individual"}, {v:"shop",hi:"दुकान/Workshop",en:"Shop/Workshop"},
                      {v:"msme",hi:"MSME/छोटा व्यवसाय",en:"MSME/Small Business"}, {v:"company",hi:"Company/Firm",en:"Company/Firm"},
                      {v:"ngo",hi:"NGO/Trust",en:"NGO/Trust"}, {v:"govt",hi:"सरकारी विभाग",en:"Government Dept."},
                      {v:"international",hi:"International/MNC",en:"International/MNC"} ] }, F.address ]
      },

      { key:"foreign_agent", group:"g2", icon:"✈️",
        hi:"Foreign Agent", en:"Foreign Agent",
        desc_hi:"विदेश placement — eMigrate लाइसेंस अनिवार्य", desc_en:"Overseas placement — eMigrate license mandatory",
        collection:"foreign_agents", dashboard:"/dashboard/foreign-agent/",
        ruleFile:"rules-consent-foreign-agent.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"Agency/Firm का नाम", en:"Agency/Firm Name" },
          { id:"license_no", type:"text", required:true, hi:"eMigrate/RA लाइसेंस नंबर", en:"eMigrate/RA License No.",
            hint_hi:"वैध लाइसेंस के बिना पंजीकरण नहीं", hint_en:"No registration without valid license" }, F.address ]
      },

      { key:"volunteer", group:"g2", icon:"🤝",
        hi:"Volunteer", en:"Volunteer",
        desc_hi:"लोगों को नेटवर्क से जोड़ें — प्रति-verification पारितोषिक", desc_en:"Connect people to network — reward per verification",
        collection:"volunteers", dashboard:"/dashboard/volunteer/",
        ruleFile:"rules-consent-volunteer.html", gateway:true, needsGeo:true, needsRMOffice:true,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"kshetra", type:"text", required:true, hi:"क्षेत्र", en:"Area/Region", ph_hi:"जैसे: चौथम, खगड़िया" } ]
      },

      /* ---------------- समूह-3 : ACS Team ---------------- */
      { key:"hq_admin", group:"g3", icon:"🏢",
        hi:"HQ Admin", en:"HQ Admin",
        desc_hi:"मुख्यालय-प्रशासन प्रमुख — Founder के सीधे नीचे", desc_en:"HQ administration head — directly under Founder",
        collection:"team", dashboard:"/dashboard/hq/",
        ruleFile:"rules-consent-hq-admin.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"hq_establishment", group:"g3", icon:"🖥️",
        hi:"HQ Establishment Head", en:"HQ Establishment Head",
        desc_hi:"तकनीक/cyber-सुरक्षा प्रमुख", desc_en:"IT/cyber-security head",
        collection:"team", dashboard:"/dashboard/hq/establishment/",
        ruleFile:"rules-consent-hq-establishment.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"hq_finance", group:"g3", icon:"💰",
        hi:"HQ Finance Head", en:"HQ Finance Head",
        desc_hi:"भुगतान/लेखा प्रमुख", desc_en:"Payments/accounts head",
        collection:"team", dashboard:"/dashboard/hq/finance/",
        ruleFile:"rules-consent-hq-finance.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"hq_legal", group:"g3", icon:"⚖️",
        hi:"HQ Legal Head", en:"HQ Legal Head",
        desc_hi:"कानूनी/अनुपालन प्रमुख — एग्रीमेंट-सत्यापन अधिकारी", desc_en:"Legal/compliance head — agreement verification authority",
        collection:"team", dashboard:"/dashboard/hq/legal/",
        ruleFile:"rules-consent-hq-legal.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"zm", group:"g3", icon:"🌍",
        hi:"ZM / State Head / Country Head", en:"ZM / State Head / Country Head",
        desc_hi:"राज्य/देश का प्रमुख — प्रोविज़नल अप्रूवल-प्राधिकारी", desc_en:"State/Country head — provisional approval authority",
        collection:"team", dashboard:"/dashboard/zonal/",
        ruleFile:"rules-consent-zm.html", gateway:true, needsGeo:true, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"rm", group:"g3", icon:"📍",
        hi:"RM (Regional Manager)", en:"RM (Regional Manager)",
        desc_hi:"क्षेत्र का प्रमुख — भौतिक सत्यापन प्राधिकारी", desc_en:"Regional head — physical verification authority",
        collection:"team", dashboard:"/dashboard/regional/",
        ruleFile:"rules-consent-rm.html", gateway:true, needsGeo:true, needsRMOffice:true,
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"content_creator", group:"g3", icon:"🎬",
        hi:"Content Creator", en:"Content Creator",
        desc_hi:"7 उप-भूमिकाएँ — ZM कार्यालय के अंतर्गत", desc_en:"7 sub-roles — under ZM office",
        collection:"team", dashboard:"/dashboard/zonal/staff/",
        ruleFile:"rules-consent-content-creator.html", gateway:true, needsGeo:true, needsRMOffice:false,
        subtypes:["script","prompt","animator","voice","editor","thumbnail","publisher"],
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"staff", group:"g3", icon:"🗂️",
        hi:"Staff (Data Entry / Call Center / अन्य)", en:"Staff (Data Entry / Call Center / Other)",
        desc_hi:"HQ/ZM/RM किसी भी कार्यालय में — पदनाम फ़ाइल के अंदर चुनें", desc_en:"At any office level — designation chosen inside file",
        collection:"team", dashboard:"/dashboard/", /* असली पता office-level-चयन पर निर्भर, फ़ाइल के अंदर तय */
        ruleFile:"rules-consent-hq-staff.html", gateway:true, needsGeo:false, needsRMOffice:false, hasOfficeLevelCascade:true,
        subtypes:["data_entry","callcenter","social_media","marketing","grade4","sweeper","other"],
        fields: [ F.nameLocal, F.nameRoman, F.address ]
      },
      { key:"intern", group:"g3", icon:"🎒",
        hi:"Intern (प्रशिक्षु-सहयोगी)", en:"Intern",
        desc_hi:"HQ/ZM/RM किसी भी स्तर पर — minor-सुरक्षा लागू", desc_en:"At any office level — minor protections apply",
        collection:"team", dashboard:"/dashboard/", /* Intern-tag के साथ Staff/Admin वाला ही dashboard */
        ruleFile:"rules-consent-intern.html", gateway:true, needsGeo:false, needsRMOffice:false, hasOfficeLevelCascade:true,
        fields: [ F.nameLocal, F.nameRoman, F.age(14,"18 से कम पर Guardian लिखित सहमति अनिवार्य"),
          F.guardianName, F.guardianRel,
          { id:"referring_officer", type:"text", required:true, hi:"संदर्भ-अधिकारी का नाम", en:"Referring Officer" },
          { id:"duration_months", type:"number", min:1, required:true, hi:"इंटर्नशिप-अवधि (महीने)", en:"Internship Duration (months)" } ]
      }
    ];
  })(),

  /* =====================================================================
     भौगोलिक-सीढ़ी (राज्य/देश + RM-कार्यालय) — एकमात्र घर
     (पहले join.html/gate-demo में अलग-अलग hardcode था — अब यहीं, आगे data-फ़ाइल से भी बदला जा सकेगा)
  ===================================================================== */
  geo: {
    states: [
      { v:"bihar", hi:"बिहार (भारत)", en:"Bihar (India)" },
      { v:"up", hi:"उत्तर प्रदेश (भारत)", en:"Uttar Pradesh (India)" },
      { v:"maharashtra", hi:"महाराष्ट्र (भारत)", en:"Maharashtra (India)" },
      { v:"karnataka", hi:"कर्नाटक (भारत)", en:"Karnataka (India)" },
      { v:"kenya", hi:"केन्या (Global South)", en:"Kenya (Global South)" },
      { v:"nigeria", hi:"नाइजीरिया (Global South)", en:"Nigeria (Global South)" },
      { v:"bangladesh", hi:"बांग्लादेश (Global South)", en:"Bangladesh (Global South)" }
    ],
    rmOfficesByState: {
      bihar: ["चौथम RM (खगड़िया)", "पटना RM", "भागलपुर RM"],
      up: ["लखनऊ RM", "वाराणसी RM"],
      maharashtra: ["मुंबई RM", "पुणे RM"],
      karnataka: ["बेंगलुरु RM"],
      kenya: ["नैरोबी RM"],
      nigeria: ["लागोस RM"],
      bangladesh: ["ढाका RM"]
    },
    stateLabel: function (key) {
      var s = this.states.filter(function (x) { return x.v === key; })[0];
      return s ? s.hi : key;
    },
    rmOfficesFor: function (stateKey) { return this.rmOfficesByState[stateKey] || []; }
  },

  /* =====================================================================
     team-कार्ड का 3-कदम चयन (सिर्फ़ HQ के 4 उप-पदों के लिए dept ज़रूरी)
     Staff/Intern के हासिल कार्यालय-स्तर(HQ/ZM/RM) + आगे geo-cascade अलग हैंडल होता है (hasOfficeLevelCascade)
  ===================================================================== */
  team: {
    hqRoles: ["hq_admin", "hq_establishment", "hq_finance", "hq_legal"],
    officeLevels: [
      { v:"hq", hi:"HQ (मुख्यालय)", en:"HQ (Headquarters)" },
      { v:"zm", hi:"ZM कार्यालय (राज्य/देश)", en:"ZM Office (State/Country)" },
      { v:"rm", hi:"RM कार्यालय (क्षेत्र)", en:"RM Office (Region)" }
    ]
  },

  /* ---- साझा सहायक ---- */
  byKey: function (k) {
    for (var i = 0; i < this.cards.length; i++) if (this.cards[i].key === k) return this.cards[i];
    return null;
  },
  isLearner: function (k) { return k === "learner" || this.learnerKeys.indexOf(k) > -1; },
  ruleFileFor: function (k) { var c = this.byKey(k); return c ? c.ruleFile : null; },
  dashboardFor: function (k) { var c = this.byKey(k); return c ? c.dashboard : "/dashboard/"; },
  needsGateway: function (k) { var c = this.byKey(k); return c ? !!c.gateway : true; }
};
