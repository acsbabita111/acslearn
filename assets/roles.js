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
  version: "2.1",
  updated: "10 July 2026",

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
    F.address      = { id:"address", type:"pincode_address", required:true, hi:"पूरा पता", en:"Full Address" };

    /* दस्तावेज़-upload साझा परिभाषाएँ — एक चीज़ = एक जगह */
    F.docPhoto = { id:"doc_photo", accept:"image/*", required:true, hi:"आपका प्रोफ़ेशनल फ़ोटो (पासपोर्ट-साइज़)", en:"Your professional photo (passport-size)" };
    F.docGuardianConsent = { id:"doc_guardian_consent", accept:"image/*,.pdf", required:false, showWhenMinor:true,
      hi:"Guardian की लिखित सहमति (18 से कम उम्र पर)", en:"Guardian written consent (if below 18)" };
    F.docLicense = { id:"doc_license", accept:"image/*,.pdf", required:true, hi:"eMigrate/RA लाइसेंस की प्रति", en:"Copy of eMigrate/RA license" };
    F.docPremisesPhoto = { id:"doc_premises_photo", accept:"image/*", required:true, hi:"केंद्र/वर्कशॉप के भवन का फ़ोटो", en:"Photo of Center/Workshop premises" };
    F.docPhotoId1 = { id:"doc_photo_id1", accept:"image/*,.pdf", required:true, hi:"फ़ोटो पहचान-पत्र 1 (जैसे Aadhaar)", en:"Photo ID proof 1 (e.g. Aadhaar)" };
    F.docPhotoId2 = { id:"doc_photo_id2", accept:"image/*,.pdf", required:true, hi:"फ़ोटो पहचान-पत्र 2 (जैसे Voter-ID/Pan)", en:"Photo ID proof 2 (e.g. Voter-ID/PAN)" };
    F.docMatric = { id:"doc_matric", accept:"image/*,.pdf", required:true, hi:"मैट्रिक (10वीं) का दस्तावेज़", en:"Matric (10th) document" };
    F.docHighestEdu = { id:"doc_highest_edu", accept:"image/*,.pdf", required:true, hi:"अधिकतम शिक्षा का प्रमाण पत्र", en:"Highest education certificate" };
    F.docExperience = { id:"doc_experience", accept:"image/*,.pdf", required:false, hi:"अनुभव प्रमाण पत्र (यदि लागू)", en:"Experience certificate (if applicable)" };
    F.docSignature = { id:"doc_signature", accept:"image/*", required:true, hi:"हस्ताक्षर की स्कैन/फ़ोटो (JPG)", en:"Signature scan/photo (JPG)" };
    F.emergencyContact1 = { id:"emergency_contact_1", type:"emergency_contact", required:true, hi:"आपातकालीन संपर्क 1", en:"Emergency Contact 1" };
    F.emergencyContact2 = { id:"emergency_contact_2", type:"emergency_contact", required:true, hi:"आपातकालीन संपर्क 2", en:"Emergency Contact 2" };

    return [
      /* ---------------- समूह-1 : Learner (गेटवे नहीं — 3-में-1 फ़ाइल) ---------------- */
      { key:"learner", group:"g1", icon:"🎓",
        hi:"Learner — Student / Job-seeker / Entrepreneur", en:"Learner — Student / Job-seeker / Entrepreneur",
        desc_hi:"सीखने वाला — उम्र व उप-प्रकार फ़ाइल के अंदर चुनें", desc_en:"Learner — choose sub-type & age inside",
        collection:"learners", dashboard:"/dashboard/learner/",
        ruleFile:"rules-consent-learner.html", gateway:false, needsGeo:false, needsRMOffice:false,
        subtypes:["student","jobseeker","entrepreneur"], /* फ़ाइल के अंदर अपना selector है */
        fields: [ F.nameLocal, F.nameRoman ], /* उम्र/Guardian/पुलिस-वेरिफिकेशन फ़ाइल के अंदर ही dynamic हैं */
        documents: [] /* Learner से कोई दस्तावेज़ नहीं माँगा जाता — बाल-सुरक्षा */
      },

      /* ---------------- समूह-2 : जुड़कर कमाने वाले (गेटवे — RM/ZM/HQ शृंखला) ---------------- */
      { key:"teacher", group:"g2", icon:"👨‍🏫",
        hi:"Teacher / उस्ताद", en:"Teacher / Ustad",
        desc_hi:"कोर्स पढ़ाएँ या पारंपरिक हुनर सिखाएँ — royalty लाइफटाइम", desc_en:"Teach courses or traditional skills — lifetime royalty",
        collection:"teachers", dashboard:"/dashboard/teacher/",
        ruleFile:"rules-consent-teacher.html", gateway:true, needsGeo:false, needsRMOffice:false,
        subtypes:["teacher","ustad"],
        fields: [ F.nameLocal, F.nameRoman, F.age(18,"न्यूनतम 18 वर्ष"), F.address,
          { id:"subject", type:"text", required:true, hi:"विषय / हुनर का क्षेत्र", en:"Subject / Skill area" },
          { id:"experience", type:"number", min:0, max:60, required:false, hi:"अनुभव (वर्ष)", en:"Experience (years)" },
          F.nomineeName, F.nomineeRel, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },

      { key:"center", group:"g2", icon:"🏫",
        hi:"Center / Workshop", en:"Center / Workshop",
        desc_hi:"किताबी कोर्स या सीधे-कमाई का हुनर सिखाने वाला केंद्र", desc_en:"Academic coaching or direct-earning skill workshop",
        collection:"centers", dashboard:"/dashboard/center/",
        ruleFile:"rules-consent-center.html", gateway:true, needsGeo:false, needsRMOffice:false,
        subtypes:["center","workshop"],
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"केंद्र/वर्कशॉप का नाम", en:"Center/Workshop Name" },
          { id:"address", type:"text", required:true, hi:"पूरा पता", en:"Address" },
          { id:"district", type:"text", required:true, hi:"ज़िला", en:"District" }, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature, F.docPremisesPhoto ]
      },

      { key:"counselor", group:"g2", icon:"🧭",
        hi:"Counselor", en:"Counselor",
        desc_hi:"करियर/उद्योग सलाह — आय 90% + टर्न-की उद्योग-सेटअप सेवा भी", desc_en:"Career/industry advice — 90% share + optional turn-key setup service",
        collection:"counselors", dashboard:"/dashboard/counselor/",
        ruleFile:"rules-consent-counselor.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman, F.age(18,"न्यूनतम 18 वर्ष"),
          { id:"experience", type:"number", min:5, max:60, required:true, hi:"अनुभव (वर्ष)", en:"Experience (years)", hint_hi:"न्यूनतम 5 वर्ष अनिवार्य" },
          { id:"specialization", type:"text", required:true, hi:"विशेषज्ञता का विषय", en:"Specialization" }, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
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
                      {v:"international",hi:"International/MNC",en:"International/MNC"} ] }, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },

      { key:"foreign_agent", group:"g2", icon:"✈️",
        hi:"Foreign Agent", en:"Foreign Agent",
        desc_hi:"विदेश placement — eMigrate लाइसेंस अनिवार्य", desc_en:"Overseas placement — eMigrate license mandatory",
        collection:"foreign_agents", dashboard:"/dashboard/foreign-agent/",
        ruleFile:"rules-consent-foreign-agent.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"Agency/Firm का नाम", en:"Agency/Firm Name" },
          { id:"license_no", type:"text", required:true, hi:"eMigrate/RA लाइसेंस नंबर", en:"eMigrate/RA License No.",
            hint_hi:"वैध लाइसेंस के बिना पंजीकरण नहीं", hint_en:"No registration without valid license" }, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature, F.docLicense ]
      },

      { key:"volunteer", group:"g2", icon:"🤝",
        hi:"Volunteer", en:"Volunteer",
        desc_hi:"लोगों को नेटवर्क से जोड़ें — प्रति-verification पारितोषिक", desc_en:"Connect people to network — reward per verification",
        collection:"volunteers", dashboard:"/dashboard/volunteer/",
        ruleFile:"rules-consent-volunteer.html", gateway:true, needsGeo:true, needsRMOffice:true,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"kshetra", type:"text", required:true, hi:"क्षेत्र", en:"Area/Region", ph_hi:"जैसे: चौथम, खगड़िया" }, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },

      { key:"finance_mitra", group:"g2", icon:"🏦",
        hi:"वित्त मित्र (Finance Mitra)", en:"Finance Mitra",
        desc_hi:"उद्यमी को बैंक/योजना से जोड़कर पूंजी की व्यवस्था — जुड़ना निःशुल्क", desc_en:"Connect entrepreneurs to banks/schemes for capital — free to join",
        collection:"finance_mitras", dashboard:"/dashboard/finance-mitra/",
        ruleFile:"rules-consent-finance-mitra.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"affiliation", type:"text", required:true, hi:"किस संस्था/योजना से अधिकृत (जैसे: SBI Bank-Mitra, मुद्रा DSA)", en:"Authorized by which institution/scheme" },
          { id:"experience", type:"number", min:0, max:60, required:false, hi:"अनुभव (वर्ष)", en:"Experience (years)" },
          F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature,
          { id:"doc_empanelment", accept:"image/*,.pdf", required:true, hi:"संस्था-अधिकृति/empanelment प्रमाण की प्रति", en:"Institution authorization/empanelment proof" } ]
      },

      { key:"vendor", group:"g2", icon:"🛒",
        hi:"Vendor (विक्रेता)", en:"Vendor",
        desc_hi:"उद्यम-स्थापना का सेवा/सामान प्रदाता — जुड़ना निःशुल्क", desc_en:"Enterprise-setup goods/service provider — free to join",
        collection:"vendors", dashboard:"/dashboard/vendor/",
        ruleFile:"rules-consent-vendor.html", gateway:true, needsGeo:false, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman,
          { id:"org_name", type:"text", required:true, hi:"संस्था/दुकान का नाम", en:"Business/Shop Name" },
          { id:"vendor_type", type:"select", required:true, hi:"सेवा/सामान का प्रकार", en:"Goods/Service Type",
            options:[ {v:"machinery",hi:"यंत्र-विक्रेता (Machinery)",en:"Machinery"}, {v:"raw_material",hi:"कच्चा-माल (Raw Material)",en:"Raw Material"},
                      {v:"packaging",hi:"Packaging",en:"Packaging"}, {v:"license_compliance",hi:"License/Compliance सहायक",en:"License/Compliance"},
                      {v:"marketing",hi:"Marketing/Branding",en:"Marketing/Branding"}, {v:"export",hi:"Export सहायक",en:"Export Support"},
                      {v:"other",hi:"अन्य",en:"Other"} ] },
          F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },

      /* ---------------- समूह-3 : ACS Team ---------------- */
      { key:"hq_admin", group:"g3", icon:"🏢",
        hi:"HQ Admin", en:"HQ Admin",
        desc_hi:"मुख्यालय-प्रशासन प्रमुख — Founder के सीधे नीचे", desc_en:"HQ administration head — directly under Founder",
        collection:"team", dashboard:"/dashboard/hq/",
        ruleFile:"rules-consent-hq-admin.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"hq_establishment", group:"g3", icon:"🖥️",
        hi:"HQ Establishment Head", en:"HQ Establishment Head",
        desc_hi:"तकनीक-प्रबंधन प्रमुख", desc_en:"IT/technology management head",
        collection:"team", dashboard:"/dashboard/hq/establishment/",
        ruleFile:"rules-consent-hq-establishment.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"hq_finance", group:"g3", icon:"💰",
        hi:"HQ Finance Head", en:"HQ Finance Head",
        desc_hi:"भुगतान/लेखा प्रमुख", desc_en:"Payments/accounts head",
        collection:"team", dashboard:"/dashboard/hq/finance/",
        ruleFile:"rules-consent-hq-finance.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"hq_legal", group:"g3", icon:"⚖️",
        hi:"HQ Legal Head", en:"HQ Legal Head",
        desc_hi:"कानूनी/अनुपालन प्रमुख — एग्रीमेंट-सत्यापन अधिकारी", desc_en:"Legal/compliance head — agreement verification authority",
        collection:"team", dashboard:"/dashboard/hq/legal/",
        ruleFile:"rules-consent-hq-legal.html", gateway:true, needsGeo:false, needsRMOffice:false, isHQ:true,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"zm", group:"g3", icon:"🌍",
        hi:"ZM / State Head / Country Head", en:"ZM / State Head / Country Head",
        desc_hi:"राज्य/देश का प्रमुख — प्रोविज़नल अप्रूवल-प्राधिकारी", desc_en:"State/Country head — provisional approval authority",
        collection:"team", dashboard:"/dashboard/zonal/",
        ruleFile:"rules-consent-zm.html", gateway:true, needsGeo:true, needsRMOffice:false,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"rm", group:"g3", icon:"📍",
        hi:"RM (Regional Manager)", en:"RM (Regional Manager)",
        desc_hi:"क्षेत्र का प्रमुख — भौतिक सत्यापन प्राधिकारी", desc_en:"Regional head — physical verification authority",
        collection:"team", dashboard:"/dashboard/regional/",
        ruleFile:"rules-consent-rm.html", gateway:true, needsGeo:true, needsRMOffice:true,
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"content_creator", group:"g3", icon:"🎬",
        hi:"Content Creator", en:"Content Creator",
        desc_hi:"7 उप-भूमिकाएँ — ZM कार्यालय के अंतर्गत", desc_en:"7 sub-roles — under ZM office",
        collection:"team", dashboard:"/dashboard/zonal/staff/",
        ruleFile:"rules-consent-content-creator.html", gateway:true, needsGeo:true, needsRMOffice:false,
        subtypes:["script","prompt","animator","voice","editor","thumbnail","publisher"],
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"staff", group:"g3", icon:"🗂️",
        hi:"Staff (Data Entry / Call Center / अन्य)", en:"Staff (Data Entry / Call Center / Other)",
        desc_hi:"HQ/ZM/RM किसी भी कार्यालय में — पदनाम फ़ाइल के अंदर चुनें", desc_en:"At any office level — designation chosen inside file",
        collection:"team", dashboard:"/dashboard/", /* असली पता office-level-चयन पर निर्भर, फ़ाइल के अंदर तय */
        ruleFile:"rules-consent-hq-staff.html", gateway:true, needsGeo:false, needsRMOffice:false, hasOfficeLevelCascade:true,
        subtypes:["data_entry","callcenter","social_media","marketing","grade4","sweeper","other"],
        fields: [ F.nameLocal, F.nameRoman, F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature ]
      },
      { key:"intern", group:"g3", icon:"🎒",
        hi:"Intern (प्रशिक्षु-सहयोगी)", en:"Intern",
        desc_hi:"HQ/ZM/RM किसी भी स्तर पर — minor-सुरक्षा लागू", desc_en:"At any office level — minor protections apply",
        collection:"team", dashboard:"/dashboard/", /* Intern-tag के साथ Staff/Admin वाला ही dashboard */
        ruleFile:"rules-consent-intern.html", gateway:true, needsGeo:false, needsRMOffice:false, hasOfficeLevelCascade:true,
        fields: [ F.nameLocal, F.nameRoman, F.age(14,"18 से कम पर Guardian लिखित सहमति अनिवार्य"),
          F.guardianName, F.guardianRel,
          { id:"referring_officer", type:"text", required:true, hi:"संदर्भ-अधिकारी का नाम", en:"Referring Officer" },
          { id:"duration_months", type:"number", min:1, max:24, required:true, hi:"इंटर्नशिप-अवधि (महीने)", en:"Internship Duration (months)", hint_hi:"1 से 24 महीने" },
          F.address, F.emergencyContact1, F.emergencyContact2 ],
        documents: [ F.docPhoto, F.docPhotoId1, F.docPhotoId2, F.docMatric, F.docHighestEdu, F.docExperience, F.docSignature, F.docGuardianConsent ]
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
    rmOfficesFor: function (stateKey) { return this.rmOfficesByState[stateKey] || []; },

    /* ---- (नया नियम, 09-Jul-2026) RM = ज़िला-आधारित ----
       RM रजिस्ट्रेशन पर 1 से 3 जिले चुनता है (शुरुआत में 3 जिले/RM;
       टीम बड़ी होने पर 2 या 1 जिला/RM — सिकुड़न HQ/approval-स्तर से)।
       हर राज्य/देश की पूरी सरकारी ज़िला-सूची (देश हो तो county/state/district): */
    districtsByState: {
      bihar: ["अररिया","अरवल","औरंगाबाद","बांका","बेगूसराय","भागलपुर","भोजपुर","बक्सर","दरभंगा","गया","गोपालगंज","जमुई","जहानाबाद","कैमूर","कटिहार","खगड़िया","किशनगंज","लखीसराय","मधेपुरा","मधुबनी","मुंगेर","मुजफ्फरपुर","नालंदा","नवादा","पश्चिम चंपारण","पटना","पूर्णिया","पूर्वी चंपारण","रोहतास","सहरसा","समस्तीपुर","सारण","शेखपुरा","शिवहर","सीतामढ़ी","सीवान","सुपौल","वैशाली"],
      up: ["आगरा","अलीगढ़","अंबेडकर नगर","अमेठी","अमरोहा","औरैया","अयोध्या","आजमगढ़","बागपत","बहराइच","बलिया","बलरामपुर","बांदा","बाराबंकी","बरेली","बस्ती","भदोही","बिजनौर","बदायूं","बुलंदशहर","चंदौली","चित्रकूट","देवरिया","एटा","इटावा","फर्रुखाबाद","फतेहपुर","फिरोजाबाद","गौतम बुद्ध नगर","गाजियाबाद","गाजीपुर","गोंडा","गोरखपुर","हमीरपुर","हापुड़","हरदोई","हाथरस","जालौन","जौनपुर","झांसी","कन्नौज","कानपुर देहात","कानपुर नगर","कासगंज","कौशांबी","कुशीनगर","लखीमपुर खीरी","ललितपुर","लखनऊ","महोबा","महराजगंज","मैनपुरी","मथुरा","मऊ","मेरठ","मिर्जापुर","मुरादाबाद","मुजफ्फरनगर","पीलीभीत","प्रतापगढ़","प्रयागराज","रायबरेली","रामपुर","सहारनपुर","संभल","संत कबीर नगर","शाहजहांपुर","शामली","श्रावस्ती","सिद्धार्थनगर","सीतापुर","सोनभद्र","सुल्तानपुर","उन्नाव","वाराणसी"],
      maharashtra: ["अहिल्यानगर (अहमदनगर)","अकोला","अमरावती","छत्रपति संभाजीनगर (औरंगाबाद)","बीड","भंडारा","बुलढाणा","चंद्रपुर","धुले","गडचिरोली","गोंदिया","हिंगोली","जलगांव","जालना","कोल्हापुर","लातूर","मुंबई शहर","मुंबई उपनगर","नागपुर","नांदेड़","नंदुरबार","नासिक","धाराशिव (उस्मानाबाद)","पालघर","परभणी","पुणे","रायगढ़","रत्नागिरी","सांगली","सतारा","सिंधुदुर्ग","सोलापुर","ठाणे","वर्धा","वाशिम","यवतमाल"],
      karnataka: ["बागलकोट","बेंगलुरु ग्रामीण","बेंगलुरु शहरी","बेलगावी","बल्लारी","बीदर","चामराजनगर","चिक्कबल्लापुर","चिक्कमगलुरु","चित्रदुर्ग","दक्षिण कन्नड़","दावणगेरे","धारवाड़","गदग","हासन","हावेरी","कलबुर्गी","कोडगु","कोलार","कोप्पल","मांड्या","मैसूरु","रायचूर","रामनगर","शिवमोग्गा","तुमकुरु","उडुपी","उत्तर कन्नड़","विजयनगर","विजयपुरा","यादगीर"],
      kenya: ["नैरोबी","मोम्बासा","क्वाले","किलिफ़ी","ताना रिवर","लामू","ताइता-तावेता","गरिस्सा","वाजिर","मंडेरा","मार्साबिट","इसियोलो","मेरु","थराका-निथि","एम्बु","कितुई","माचाकोस","माकुएनी","न्यांदरुआ","न्येरी","किरिन्यागा","मुरंगा","किआम्बु","तुर्काना","वेस्ट पोकोट","सैम्बुरु","ट्रांस-न्ज़ोइया","उआसिन गिशु","एल्गेयो-मारकवेट","नंदी","बारिंगो","लाइकिपिया","नाकुरु","नारोक","काजियाडो","केरिचो","बोमेट","काकामेगा","विहिगा","बुंगोमा","बुसिया","सियाया","किसुमु","होमा बे","मिगोरी","किसी","न्यामीरा"],
      nigeria: ["अबिया","अदामावा","अकवा इबोम","अनम्ब्रा","बाउची","बायेल्सा","बेनुए","बोर्नो","क्रॉस रिवर","डेल्टा","एबोनी","एडो","एकिति","एनुगु","गोम्बे","इमो","जिगावा","कडुना","कानो","कात्सिना","केब्बी","कोगी","क्वारा","लागोस","नसरावा","नाइजर","ओगुन","ओन्डो","ओसुन","ओयो","प्लेटो","रिवर्स","सोकोतो","ताराबा","योबे","ज़म्फ़ारा","अबुजा (FCT)"],
      bangladesh: ["ढाका","फरीदपुर","गाज़ीपुर","गोपालगंज","किशोरगंज","मादारीपुर","मानिकगंज","मुंशीगंज","नारायणगंज","नरसिंगदी","राजबाड़ी","शरीयतपुर","टांगाइल","चटगांव","बांदरबान","ब्राह्मणबाड़िया","चांदपुर","कुमिल्ला","कॉक्स बाज़ार","फेनी","खगड़ाछड़ि","लक्ष्मीपुर","नोआखाली","रांगामाटी","राजशाही","बोगुरा","जयपुरहाट","नौगांव","नाटोर","चांपाइनवाबगंज","पाबना","सिराजगंज","खुलना","बागेरहाट","चुआडांगा","जशोर","झेनाइदह","कुष्टिया","मागुरा","मेहेरपुर","नड़ाइल","सातखीरा","बरिशाल","बरगुना","भोला","झालकाठी","पटुआखाली","पिरोजपुर","सिलेट","हबीगंज","मौलवीबाज़ार","सुनामगंज","रंगपुर","दिनाजपुर","गाईबांधा","कुड़ीग्राम","लालमोनिरहाट","नीलफामारी","पंचगड़","ठाकुरगांव","मयमनसिंह","जामालपुर","नेत्रकोना","शेरपुर"]
    },
    districtsFor: function (stateKey) { return this.districtsByState[stateKey] || []; }
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
    var lc = this.learnerCardFor(k);   /* (काम-5 v1.9-ब) matrix के 3 Learner-कार्ड */
    if (lc) return lc;
    return this.teamCardFor(k);        /* (काम-5 v1.9) matrix v1.3 के टीम-पद — virtual card */
  },
  /* ═══ (काम-5 v1.9-ब, 12-07-2026) student/jobseeker/entrepreneur — matrix-कार्ड ═══
     आधार: पुराना learner-कार्ड (नियम-फ़ाइल/fields वही — फ़ाइल के अंदर का selector
     अपने-आप सही उप-प्रकार पर सुनता रहेगा); collection/dashboard/public-नाम matrix से। */
  learnerCardFor: function (k) {
    if (k !== "student" && k !== "jobseeker" && k !== "entrepreneur") return null;
    if (this._teamCardCache[k]) return this._teamCardCache[k];
    var M = (typeof window !== "undefined") ? window.ACS_DESIGNATIONS : null;
    var mc = null;
    if (M && M.cards) for (var i = 0; i < M.cards.length; i++) if (M.cards[i].key === k) { mc = M.cards[i]; break; }
    var base = null;
    for (var j = 0; j < this.cards.length; j++) if (this.cards[j].key === "learner") { base = this.cards[j]; break; }
    if (!base) return null;
    var card = {
      key: k, group: "g1", icon: (k==="student"?"🎓":k==="jobseeker"?"💼":"🏭"),
      hi: (mc && mc.public_label) || base.hi, en: (mc && mc.public_label) || base.en,
      desc_hi: base.desc_hi, desc_en: base.desc_en,
      collection: (mc && mc.collection) || base.collection,
      dashboard: (mc && mc.dashboard) || base.dashboard,
      ruleFile: base.ruleFile, gateway: false, needsGeo: false, needsRMOffice: false,
      learnerSubtype: k,
      fields: base.fields.slice(), documents: (base.documents || []).slice()
    };
    this._teamCardCache[k] = card;
    return card;
  },
  /* ═══ (काम-5 v1.9, 12-07-2026) matrix-चालित virtual team-card ═══
     स्रोत: window.ACS_DESIGNATIONS (v1.3) — public_label/ruleFile/geo/registrable वहीं से।
     fields/documents: नज़दीकी मौजूदा कार्ड से (एक चीज़ = एक जगह; दोहराव नहीं)। */
  _teamCardCache: {},
  _TEAM_FIELD_BASE: {
    hq_deo:"staff", zm_deo:"staff", hq_callcenter:"staff", zm_callcenter:"staff", rm_callcenter:"staff",
    hq_intern:"intern", zm_intern:"intern", rm_intern:"intern",
    zm:"zm", rm:"rm", zm_content_creator:"content_creator",
    hq_admin:"hq_admin", hq_establishment:"hq_establishment", hq_finance:"hq_finance", hq_legal:"hq_legal"
    /* बाक़ी सब (system_security, नए Heads, continental, zm_social_media) → hq_admin का साझा टीम-सेट */
  },
  teamCardFor: function (k) {
    if (this._teamCardCache[k]) return this._teamCardCache[k];
    var M = (typeof window !== "undefined") ? window.ACS_DESIGNATIONS : null;
    if (!M || !M.teams) return null;
    var t = null;
    for (var i = 0; i < M.teams.length; i++) if (M.teams[i].key === k) { t = M.teams[i]; break; }
    if (!t || t.registrable === false) return null;
    var baseKey = this._TEAM_FIELD_BASE[k] || "hq_admin";
    var base = null;
    for (var j = 0; j < this.cards.length; j++) if (this.cards[j].key === baseKey) { base = this.cards[j]; break; }
    if (!base) return null;
    var card = {
      key: k, group: "g3", icon: "🛠️",
      hi: t.public_label || t.label, en: t.label_en || t.label,
      desc_hi: "", desc_en: "",
      collection: "team", dashboard: t.dashboard || "/dashboard/",
      ruleFile: t.ruleFile || null, gateway: true,
      isHQ: (t.geo === "hq"),
      needsGeo: (t.geo === "country_state" || t.geo === "district"),
      needsRMOffice: (t.geo === "district"),
      matrixLevel: t.level || "",
      fields: base.fields.slice(),
      documents: (base.documents || []).slice()
    };
    if (t.geo === "continent") {
      card.fields = card.fields.slice();
      card.fields.splice(2, 0, { id: "continent", type: "select", required: true,
        hi: "महाद्वीप (कार्य-क्षेत्र)", en: "Continent",
        options: [ {v:"asia",hi:"एशिया (Asia)"}, {v:"africa",hi:"अफ़्रीका (Africa)"},
                   {v:"south_america",hi:"दक्षिण अमेरिका (South America)"}, {v:"north_america",hi:"उत्तर अमेरिका (North America)"},
                   {v:"europe",hi:"यूरोप (Europe)"}, {v:"oceania",hi:"ओशिनिया (Oceania)"} ] });
    }
    this._teamCardCache[k] = card;
    return card;
  },
  isLearner: function (k) { return k === "learner" || this.learnerKeys.indexOf(k) > -1; },
  ruleFileFor: function (k) { var c = this.byKey(k); return c ? c.ruleFile : null; },
  dashboardFor: function (k) { var c = this.byKey(k); return c ? c.dashboard : "/dashboard/"; },
  needsGateway: function (k) { var c = this.byKey(k); return c ? !!c.gateway : true; }
};
