/* ============================================================
   generator/data/aptitude/en/apt_en_page_strings.js — v1.1 (12-Nov-2026: पूरी 120-प्रश्न परीक्षा English पन्ने पर; v1.0 09-Nov-2026)
   /en/aptitude-test.html दर्पण-पेज की अदला-बदली तालिका (परत-3)।
   मूल भाषा: हिंदी (/aptitude-test.html, build_specials v2.2 से बना)।
   हर जोड़ा: [पुराना, नया, गिनती] : build_mirror_apt.js गिनती-assert
   से बदलता है : गिनती बेमेल = FAIL, कोई फ़ाइल नहीं लिखी जाती।
   reused:true वाली पंक्तियाँ /en/index.html (live, ChatGPT-ऑडिटेड)
   से byte-हूबहू उठाई गई हैं : site-भर एक English शब्दावली रहे।
   उनके भीतर की पुरानी लंबी रेखा (—) वहीं से आई है : डैश-नियम सिर्फ़
   नए लिखे पाठ पर है, और यहाँ का हर नया पाठ ":" इस्तेमाल करता है।
   ============================================================ */
module.exports = {
  outPath: "en/aptitude-test.html",
  canonical: "https://acslearn.com/en/aptitude-test.html",
  hreflangExpected: 3,
  pairs: [
    /* ---- ढाँचा: भाषा, पता, og ---- */
    ['<html lang="hi">', '<html lang="en">', 1],
    ['<link rel="canonical" href="https://acslearn.com/aptitude-test.html">',
     '<link rel="canonical" href="https://acslearn.com/en/aptitude-test.html">', 1],
    ['<meta property="og:url" content="https://acslearn.com/aptitude-test.html">',
     '<meta property="og:url" content="https://acslearn.com/en/aptitude-test.html">', 1],
    ['<meta property="og:locale" content="hi_IN">',
     '<meta property="og:locale" content="en_US">', 1],

    /* ---- title + meta + og (title ×1, og:title ×1; desc ×1, og:desc ×1) ---- */
    ['<title>अभिरुचि-टेस्ट दें — मुफ़्त झलक और पूरा 120-प्रश्न टेस्ट | अप्लाइड कंप्यूटर स्कूल</title>',
     '<title>Take the Aptitude Test: Free Preview and Full 120-Question Test | Applied Computer School</title>', 1],
    ['content="अभिरुचि-टेस्ट दें — मुफ़्त झलक और पूरा 120-प्रश्न टेस्ट | अप्लाइड कंप्यूटर स्कूल"',
     'content="Take the Aptitude Test: Free Preview and Full 120-Question Test | Applied Computer School"', 1],
    ['content="पूरे पर्दे पर एक-एक प्रश्न। मुफ़्त झलक बिना खाते के — जवाब आपके फ़ोन में। पूरी जानकारी और टॉप-10 तुलना करियर-पेज पर।"',
     'content="One question at a time, full screen. Free preview without an account: your answers stay on your phone. Based on RIASEC interest science."', 2],

    /* ---- shell (reused:true : /en/index.html की शब्दावली byte-हूबहू) ---- */
    ['>अप्लाइड कंप्यूटर स्कूल™<', '>Applied Computer School™<', 3],
    ['>भाषा<', '>Language<', 1],
    ['>मेन्यू<', '>Menu<', 2],
    ['130 भाषा में, गाँव से ग्लोबल साउथ तक!', 'In 130 languages, from village to the Global South!', 1],
    ['मूल भाषा: हिंदी', 'Original language: Hindi', 1],
    ['130 भाषा में गाँव से ग्लोबल साउथ तक — मोबाइल फ्रेंडली कोर्स कंटेंट!',
     'From village to the Global South in 130 languages — mobile-friendly course content!', 1, true],
    ['📜 प्रमाण पत्र देने वाली संस्था', '📜 Certificate Issuing Body', 1],
    ['फ्रीडम फाइटर गंगाधर प्रसाद मेमोरियल ट्रस्ट (FFGPMTrust)',
     'Freedom Fighter Gangadhar Prasad Memorial Trust (FFGPMTrust)', 1],
    ['प्रमाणन: ISO 9001:2015 · वेबसाइट: ffgpmt.org', 'Certification: ISO 9001:2015 · Website: ffgpmt.org', 1],
    ['>📞 संपर्क<', '>📞 Contact<', 1],
    ['📍 एसीएस भवन, विद्यार्थी नगर, चौथम, खगड़िया, बिहार — 851201',
     '📍 ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar — 851201', 1, true],
    ['⚠️ भुगतान केवल आधिकारिक Razorpay लिंक से।', '⚠️ Payments only via the official Razorpay link.', 1],
    ['aria-label="व्हाट्सएप पर संपर्क करें"', 'aria-label="Contact on WhatsApp"', 1],
    ['aria-label="फुटर मेन्यू"', 'aria-label="Footer menu"', 1],
    ['aria-label="मेन्यू"', 'aria-label="Menu"', 1],
    ['aria-label="बंद करें"', 'aria-label="Close"', 1],

    /* ---- baked menu (label_en + href_en, links.js से मेल) ---- */
    ['<a class="acs-mitem" href="/"><span class="e">🏠</span> होम</a>',
     '<a class="acs-mitem" href="/en/"><span class="e">🏠</span> Home</a>', 1],
    ['<a class="acs-mitem" href="/hi/mission.html"><span class="e">🎯</span> मिशन</a>',
     '<a class="acs-mitem" href="/en/mission.html"><span class="e">🎯</span> Mission</a>', 1],
    ['<a class="acs-mitem" href="/hi/salah.html"><span class="e">🧭</span> सलाह</a>',
     '<a class="acs-mitem" href="/en/counseling.html"><span class="e">🧭</span> Counseling</a>', 1],
    ['<a class="acs-mitem" href="/udyam/"><span class="e">🌍</span> उद्यम</a>',
     '<a class="acs-mitem" href="/en/industries/"><span class="e">🌍</span> Industries</a>', 1],
    ['<a class="acs-mitem" href="/courses/hi/"><span class="e">📚</span> कोर्स</a>',
     '<a class="acs-mitem" href="/courses/hi/"><span class="e">📚</span> Courses</a>', 1],
    ['<a class="acs-mitem" href="/registration-guide.html"><span class="e">📝</span> रजिस्ट्रेशन</a>',
     '<a class="acs-mitem" href="/registration-guide.html"><span class="e">📝</span> Registration</a>', 1],
    ['<a class="acs-mitem" href="/verify/"><span class="e">🏆</span> प्रमाण पत्र</a>',
     '<a class="acs-mitem" href="/verify/"><span class="e">🏆</span> Certificate</a>', 1],
    ['<a class="acs-mitem" href="/hi/network.html"><span class="e">🤝</span> नेटवर्क</a>',
     '<a class="acs-mitem" href="/hi/network.html"><span class="e">🤝</span> Network</a>', 1],
    ['<a class="acs-mitem" href="/vani/"><span class="e">📱</span> वाणी</a>',
     '<a class="acs-mitem" href="/vani/en/"><span class="e">📱</span> Vani</a>', 1],
    ['<a class="acs-mitem" href="/contact/hi/"><span class="e">📞</span> संपर्क</a>',
     '<a class="acs-mitem" href="/contact/hi/"><span class="e">📞</span> Contact</a>', 1],
    ['<span class="e">🔑</span> लॉगिन / डैशबोर्ड', '<span class="e">🔑</span> Login / Dashboard', 1],

    /* ---- content (hero + झलक-खंड) ---- */
    ['🧭 अभिरुचि-टेस्ट (Aptitude Test)', '🧭 Aptitude Test', 1],
    ['मन की रुचि नापो — अपनी राह पाओ।', 'Measure your interests: find your path.', 1],
    ['टेस्ट पूरे पर्दे पर खुलता है — एक समय एक प्रश्न।', 'The test opens full screen, one question at a time.', 1],
    ['🚀 मुफ़्त झलक (24 प्रश्न)', '🚀 Free preview (24 questions)', 1],
    ['🧭 पूरा टेस्ट (120 प्रश्न)', '🧭 Full test (120 questions)', 1],
    ['📖 पूरी जानकारी, फीस और दुनिया के टॉप-10 टेस्ट की तुलना — करियर-पेज पर →',
     '📖 Full details, fees and the world top-10 comparison: on the Career page →', 1],
    ['🆓 मुफ़्त झलक — अभी, यहीं', '🆓 Free preview: right here, right now', 1],
    ['कोई जवाब सही या ग़लत नहीं होता — बस अपनी पसंद बताइए।', 'No answer is right or wrong: just tell us what you like.', 1],
    ['24 प्रश्न हैं और बीच में दो कहानियाँ।', 'There are 24 questions and two short stories in between.', 1],
    ['🔒 आपके जवाब सिर्फ़ आपके फ़ोन में रहते हैं — कहीं भेजे नहीं जाते।',
     '🔒 Your answers stay only on your phone. Nothing is sent anywhere.', 1],
    ['<p>टेस्ट खुल रहा है…</p>', '<p>The test is opening…</p>', 1],
    ['🧪 यह टेस्ट रायसेक (RIASEC) रुचि-विज्ञान (1959) पर आधारित/प्रेरित है।',
     '🧪 This test is based on and inspired by RIASEC interest science (1959).', 1],
    ['📖 फीस, नमूना-रिपोर्ट और टॉप-10 तुलना — करियर-पेज पर →',
     '📖 Fees, a sample report and the top-10 comparison: on the Career page →', 1],

    /* ---- करियर-कड़ी (12-Nov-2026): English करियर-पन्ना अब है, इसलिए कड़ी उसी पर (Founder-नियम 10-Nov: हर भाषा की करियर-कड़ी उसी भाषा के पन्ने पर) ---- */
    ['href="/career.html"', 'href="/en/career.html"', 2],

    /* ---- पूरा-टेस्ट खंड (v1.1, 12-Nov-2026): अब English में भी पूरी परीक्षा ----
       इंजन (apt-session.js v1.4) में भाषा-परत है; प्रश्न-पाठ /assets/apt_sets_en/ से (जाँचा हुआ English पुल-बैंक:
       mg01..mg24 के 18,443 + broad 452 = 18,895; झलक-पूल के 48 /assets/apt_en.js में; कुल 18,943)।
       पहले यहाँ "अभी सिर्फ़ हिंदी में" वाला ईमानदार कार्ड था (v1.0); अब वही डिब्बा (apt-sess-box) जो हिंदी पन्ने पर है। */
    ['<div id="apt-full-info"><h2 id="apt-full" style="font-size:24px;margin:26px 0 6px">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</h2></div><div id="apt-sess-box" class="apt-card"><p>पूरा टेस्ट खुल रहा है…</p></div>',
     '<div id="apt-full-info"><h2 id="apt-full" style="font-size:24px;margin:26px 0 6px">🧭 Full test: 120 questions, 3 sections</h2></div><div id="apt-sess-box" class="apt-card"><p>The full test is opening…</p></div>', 1],

    /* ---- scripts: भाषा-निशान + English की तालिकाएँ (इंजन से पहले) + वही इंजन और भुगतान-फ़ाइल जो हिंदी पन्ने पर ---- */
    ['<script src="/assets/apt_strings.js"></script>\n<script src="/assets/aptitude-test.js" defer></script>\n<script src="/assets/apt-session.js" defer></script>\n<script type="module" src="/assets/apt-pay.js"></script>',
     '<script>window.APT_LANG="en";</script>\n<script src="/assets/apt_strings.js"></script>\n<script src="/assets/apt_en.js"></script>\n<script src="/assets/apt_session_en.js"></script>\n<script src="/assets/aptitude-test.js" defer></script>\n<script src="/assets/apt-session.js" defer></script>\n<script type="module" src="/assets/apt-pay.js"></script>', 1]
  ]
};
