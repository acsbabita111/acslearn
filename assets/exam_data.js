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
  "SE009": { name: "ई-कॉमर्स मास्टरी — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
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
  "SE021": { name: "वेल्डिंग व्यवसाय — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स (v1.8, 25-Aug) — 120 प्रश्न server-निजी बैंक (wld_bank; 630 पाठ×5 = 3,150) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/wld_quiz/wld_quiz_k01–k12.js shards — बदलाव वहीं, फिर wld_merge_bank.py से server-बैंक regen।
       पुराने 10 inline "सुरक्षा-परीक्षा" प्रश्न हटे। */
  ] },
  "SE022": { name: "टू-व्हीलर सर्विसिंग, EV एवं उद्यमिता — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (twv_bank, 2330) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/twv_quiz/ shards — बदलाव वहीं, फिर server-बैंक regen। */
  ] },
  "SE023": { name: "मशरूम: खेती, व्यापार और उद्यमिता — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (msh_bank, 3135) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत-भंडार = /assets/msh_quiz_k01.js–k12.js shards — बदलाव वहीं, फिर server-बैंक regen। */
  ] },
  "PJ018": { name: "ACS Certificate in Spoken English — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [
    /* server-मोड कोर्स — 120 प्रश्न server-निजी बैंक (eng_bank, 2919 — 14 प्रकार, 300 सुनो-प्रश्न) से हर बार बेतरतीब;
       q यहाँ जान-बूझकर ख़ाली: यह प्रविष्टि सिर्फ़ 🎓-बटन का द्वार (minLessons/pass) है।
       स्रोत = frozen corpus (kkb_data+kkb2_data) — regen: generator/build_eng_bank.js। */
  ] },
  /* (31-Aug) KKB मास्टर-प्रतिकृति — 7 भाषा-परीक्षाएँ, PJ018-रूप server-मोड: q ख़ाली (प्रश्न server-निजी <code>_bank से; regen: generator/build_kkb_bank.js <code>) */
  "PJ022": { name: "ACS Certificate in Spoken Arabic — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ086": { name: "ACS Certificate in Spoken French — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ021": { name: "ACS Certificate in Spoken Spanish — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ026": { name: "ACS Certificate in Spoken Japanese — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ031": { name: "ACS Certificate in Spoken Korean — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ125": { name: "ACS Certificate in Spoken German — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ052": { name: "ACS Certificate in Spoken Russian — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ137": { name: "ACS Certificate in Spoken Hebrew — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ024": { name: "ACS Certificate in Spoken Portuguese — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
"PJ055": { name: "ACS Certificate in Spoken Urdu — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
"PJ035": { name: "ACS Certificate in Spoken Persian — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ019": { name: "ACS Certificate in Spoken Kannada — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ029": { name: "ACS Certificate in Spoken Tamil — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ028": { name: "ACS Certificate in Spoken Telugu — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ023": { name: "ACS Certificate in Spoken Bengali — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ057": { name: "ACS Certificate in Spoken Odia — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ041": { name: "ACS Certificate in Spoken Assamese — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ039": { name: "ACS Certificate in Spoken Punjabi — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ033": { name: "ACS Certificate in Spoken Gujarati — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
  "PJ056": { name: "ACS Certificate in Spoken Malayalam — प्रमाणपत्र परीक्षा (टेस्ट-मोड: बिना पाठ-पूरे भी)", minLessons: 0, pass: 60, q: [] },
};