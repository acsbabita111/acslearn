/* ═══ ACS कोर्स-परीक्षा भंडार v1.6 (01-Sep-2026) — + हिब्रू द्वार PJ137 (he_bank)
   v1.5 (31-Aug-2026) — +7 KKB भाषा-द्वार (PJ022/086/021/026/031/125/052) ═══
   v1.4 (05-Aug-2026) — टेस्ट-मोड: सभी द्वार खुले ═══
   v1.4: +SE022 टू-व्हीलर द्वार-प्रविष्टि (server-मोड, q ख़ाली — प्रश्न server-निजी
   twv_bank से)। minLessons:0 टेस्ट-मोड; असली-फ़ीस युग का मान Founder तय करें।
   v1.3 (Founder-आदेश, 31-Jul): साइट अभी टेस्ट-मोड — असली-फ़ीस शुरू होने तक
   सभी 5 लाइव कोर्स के लिए minLessons:0 (बिना पाठ पूरे किए सीधे परीक्षा)।
   बदला: SE009 120→0 · SE021 2→0 · PJ016 पहले से 0। असली-फ़ीस शुरू होने पर
   इन्हें वापस मूल-मान (SE009:120, SE021:2) पर लौटाना — यही एकमात्र घर।
   ═══ पुराना v1.2 इतिहास नीचे यथावत ═══
   v1.7 (19-Aug): SE021 → server-मोड (wld_bank; वेल्डिंग 100 पाठ × 5 = 500, बढ़ते हुए 1,500) — पुराने 10 inline हटे।
   v1.6 (18-Aug): SE009 → server-मोड (ecom_bank; 326-पाठ नया कोर्स) — पुराने 10 inline-प्रश्न हटे।
   v1.5 (16-Aug): PJ016 → server-मोड (dca_bank 2490, q ख़ाली) — DCA-2036 cutover।
   v1.2: +PJ016 डीसीए 120-प्रश्न बैंक (12 अध्याय × 10 · 3 सेट × 40 · pass 60 ·
   minLessons 0 — Founder-फ़ैसला: offline-पढ़े विद्यार्थी बिना online-पाठ परीक्षा
   दे सकें; द्वार बदलना हो तो सिर्फ़ यह अंक बदलें)। उत्तर-स्थान बिखरे।
   v1.1: +SE009 ई-कॉमर्स बैंक (10 प्रश्न · minLessons 120 — Founder: "सभी 120
   पूरे होने पर द्वार" · pass 60)। server यही फ़ाइल fetch कर अंक जोड़ता है।
   नियम: हर बैंक का दायरा उतना ही जितने पाठ जीवित (minLessons-द्वार);
   गिनती मशीन से (dev_apt_check-तर्ज़); pass = 60%। एकमात्र घर यही फ़ाइल।
   कूट-नाम UI पर कभी नहीं — प्रदर्शन-नाम name-खाने से। */
window.COURSE_EXAMS = {
  "SE009": { name: "ई-कॉमर्स का प्रमाणपत्र कोर्स (Certificate in E-Commerce Mastery) — प्रमाणपत्र परीक्षा", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स (v1.6, 18-Aug) — 120 प्रश्न server-निजी बैंक (ecom_bank; 326 पाठ×5 लक्ष्य) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/ecom_quiz/ecom_quiz_k01–k24.js shards — बदलाव वहीं, फिर ecom_merge_bank.py से server-बैंक regen।
       पुराने 10 inline-प्रश्न (120-पाठ कोर्स के) हटे। */
  ] },
  "PJ016": { name: "डीसीए (DCA-2036) — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (dca_bank, 2490) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/dca_quiz/ shards (22) — बदलाव वहीं, फिर server-बैंक regen। */
  ] },
  "SE021": { name: "वेल्डिंग व्यवसाय का प्रमाणपत्र कोर्स (Certificate in Welding Business) — प्रमाणपत्र परीक्षा", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स (v1.8, 25-Aug) — 120 प्रश्न server-निजी बैंक (wld_bank; 630 पाठ×5 = 3,150) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/wld_quiz/wld_quiz_k01–k12.js shards — बदलाव वहीं, फिर wld_merge_bank.py से server-बैंक regen।
       पुराने 10 inline "सुरक्षा-परीक्षा" प्रश्न हटे। */
  ] },
  "SE022": { name: "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स (Certificate in Two-Wheeler Servicing & EV) — प्रमाणपत्र परीक्षा", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (twv_bank, 2330) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/twv_quiz/ shards — बदलाव वहीं, फिर server-बैंक regen। */
  ] },
  "SE023": { name: "मशरूम उत्पादन व विपणन का प्रमाणपत्र कोर्स (Certificate in Mushroom Farming & Business) — प्रमाणपत्र परीक्षा", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (msh_bank, 3135) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/msh_quiz_k01.js–k12.js shards — बदलाव वहीं, फिर server-बैंक regen। */
  ] },
  "PJ018": { name: "अंग्रेज़ी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken English) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (eng_bank, 2919 — 14 प्रकार, 300 सुनो-प्रश्न) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत = frozen corpus (kkb_data+kkb2_data) — regen: generator/build_eng_bank.js। */
  ] },
  /* (31-Aug) KKB मास्टर-प्रतिकृति — 7 भाषा-परीक्षाएँ, PJ018-रूप server-मोड: q ख़ाली (प्रश्न server-निजी <code>_bank से; regen: generator/build_kkb_bank.js <code>) */
  "PJ022": { name: "अरबी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Arabic) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ086": { name: "फ़्रेंच बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken French) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ021": { name: "स्पेनिश बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Spanish) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ026": { name: "जापानी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Japanese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ031": { name: "कोरियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Korean) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ125": { name: "जर्मन बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken German) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ052": { name: "रूसी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Russian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ137": { name: "हिब्रू बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Hebrew) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ024": { name: "पुर्तगाली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Portuguese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ055": { name: "उर्दू बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Urdu) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ035": { name: "फ़ारसी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Persian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ049": { name: "सिंधी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Sindhi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ046": { name: "कश्मीरी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Kashmiri) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ027": { name: "मराठी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Marathi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ047": { name: "नेपाली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Nepali) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ032": { name: "स्वाहिली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Swahili) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ038": { name: "भोजपुरी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Bhojpuri) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ147": { name: "संस्कृत बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Sanskrit) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ020": { name: "चीनी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Mandarin) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ025": { name: "इंडोनेशियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Indonesian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ030": { name: "तुर्की बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Turkish) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ042": { name: "मैथिली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Maithili) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ126": { name: "इतालवी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Italian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ070": { name: "मलय बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Malay) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ065": { name: "वियतनामी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Vietnamese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ066": { name: "थाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Thai) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ127": { name: "पोलिश बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Polish) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ128": { name: "यूक्रेनी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Ukrainian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ138": { name: "क्रोएशियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Croatian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ139": { name: "सर्बियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Serbian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ141": { name: "लिथुआनियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Lithuanian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ143": { name: "स्लोवाक बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Slovak) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ142": { name: "फ़िनिश बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Finnish) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ144": { name: "जॉर्जियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Georgian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ059": { name: "अवधी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Awadhi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ043": { name: "हरियाणवी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Haryanvi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ104": { name: "भीली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Bhili) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ103": { name: "बज्जिका बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Bajjika) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ050": { name: "डोगरी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Dogri) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ053": { name: "गढ़वाली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Garhwali) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ054": { name: "कुमाऊंनी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Kumaoni) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ040": { name: "छत्तीसगढ़ी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Chhattisgarhi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ060": { name: "मगही बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Magahi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ048": { name: "कोंकणी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Konkani) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ044": { name: "मारवाड़ी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Marwari) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ051": { name: "मणिपुरी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Manipuri) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ108": { name: "सराइकी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Saraiki) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ107": { name: "पश्चिमी पंजाबी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Western Punjabi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ109": { name: "सिल्हटी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Sylheti) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ105": { name: "तुलु बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Tulu) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ106": { name: "गोंडी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Gondi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ045": { name: "संथाली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Santali) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ102": { name: "अंगिका बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Angika) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ087": { name: "अफ़्रीकांस बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Afrikaans) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ036": { name: "हाउसा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Hausa) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ082": { name: "सोमाली बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Somali) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ124": { name: "वोलोफ़ बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Wolof) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ088": { name: "लुगांडा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Luganda) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ084": { name: "किन्यारवांडा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Kinyarwanda) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ089": { name: "चिचेवा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Chichewa) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ121": { name: "शोना बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Shona) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ085": { name: "अकान/त्वी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Akan/Twi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ081": { name: "ओरोमो बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Oromo) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ123": { name: "बमबारा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Bambara) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ083": { name: "मालागासी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Malagasy) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ080": { name: "अम्हारिक बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Amharic) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ146": { name: "तिग्रीन्या बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Tigrinya) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ076": { name: "योरूबा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Yoruba) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ077": { name: "इग्बो बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Igbo) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ078": { name: "ज़ुलु बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Zulu) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, "PJ079": { name: "षोसा बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Xhosa) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ075": { name: "तिब्बती बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Tibetan) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ073": { name: "सिबुआनो बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Cebuano) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ034": { name: "जावानीज़ बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Javanese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ068": { name: "खमेर बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Khmer) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ069": { name: "लाओ बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Lao) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ074": { name: "मंगोलियाई बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Mongolian) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ067": { name: "बर्मी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Burmese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ037": { name: "मीनान चीनी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Min Nan/Hokkien) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ072": { name: "सुंडानी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Sundanese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ071": { name: "तागालोग बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Tagalog) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
"PJ114": { name: "कैंटोनीज़ बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Cantonese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, /* 10-Sep merge-दौर: + SE-एशिया 11 */
  "PJ019": { name: "कन्नड बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Kannada) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ029": { name: "तमिल बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Tamil) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ028": { name: "तेलुगु बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Telugu) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ023": { name: "बांग्ला बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Bengali) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ057": { name: "उड़िया बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Odia) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ041": { name: "असमिया बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Assamese) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ039": { name: "पंजाबी बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Punjabi) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ033": { name: "गुजराती बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Gujarati) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
  "PJ056": { name: "मलयालम बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken Malayalam) — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] },
};