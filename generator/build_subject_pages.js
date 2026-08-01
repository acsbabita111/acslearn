/* ============================================================
   build_subject_pages.js — 95 विषय-placeholder-पेज (परत-4)
   v1.0 · 01-Aug-2026 (Founder-आदेश: "सभी विषय-नाम हाइपरलिंक से जोड़ो")
   ------------------------------------------------------------
   हर विषय का अपना पेज /courses/hi/subject/{slug}.html — build_specials.js
   के buildSpecial() इंजन से (root _TEMPLATE.html आधारित, हाथ से नहीं)।
   स्कूल-स्तर (कक्षा 6-12) के 35 विषयों पर NCERT के असली, स्थिर portal-पेज
   (ncert.nic.in/textbook.php) की कड़ी — व्यक्तिगत किताब-कोड (जैसे
   ?fegp1=0-10) कक्षा-दर-कक्षा अलग व अस्थिर हैं, ग़लत-अनुमान का जोखिम,
   इसलिए स्थिर मुख्य-पेज से जोड़ा। बाक़ी 60 उच्च-शिक्षा/व्यावसायिक विषयों
   (MBBS/LLB/इंजीनियरिंग आदि) पर NCERT-कड़ी नहीं — NCERT स्कूल-स्तर तक ही
   सीमित है, ग़लत-दावा नहीं बनाया। हर पेज पर हमेशा: "पेज के कॉन्टेन्ट का
   विस्तृत तैयारी अभी की जा रही है।" (Founder का दिया वाक्य)।
   चलाना: repo-रूट से → node generator/build_subject_pages.js
   ============================================================ */
"use strict";
const path = require("path");
const ROOT = path.join(__dirname, "..");
const SUBJECT_SLUGS = require(path.join(ROOT, "assets", "subject_slugs.js"));

/* स्कूल-स्तर विषय (कक्षा 6-12, NCERT-linkable) — academic_subjects.js के
   middle+secondary+senior सेट से निकाला (31-Jul ऑडिट, 35 विषय) */
const SCHOOL_LEVEL = new Set([
  "अंग्रेज़ी","अर्थशास्त्र","इतिहास","इलेक्ट्रॉनिक्स एवं हार्डवेयर","उद्यमिता",
  "कंप्यूटर एवं कृत्रिम बुद्धिमत्ता","कंप्यूटर विज्ञान","कला-शिक्षा","कृषि",
  "गणित","गणित (उन्नत)","गणित (मानक)","गणित (वैकल्पिक)","गृह विज्ञान",
  "चित्रकला","जीव विज्ञान","डिज़ाइन थिंकिंग एवं नवाचार","दर्शनशास्त्र",
  "भू-परिवहन सहयोगी","भूगोल","भौतिक गतिविधि प्रशिक्षक","भौतिकी","मनोविज्ञान",
  "रसायन विज्ञान","राजनीति विज्ञान","लेखाशास्त्र","विज्ञान","व्यवसाय अध्ययन",
  "व्यावसायिक शिक्षा","शारीरिक शिक्षा","शारीरिक शिक्षा एवं कल्याण","संगीत",
  "समाजशास्त्र","सामाजिक विज्ञान","सूचना प्रौद्योगिकी"
]);

/* buildSpecial व TPL आदि build_specials.js से साझा — यह स्क्रिप्ट उसके
   बाद, उसी Node-process में चले (नीचे README देखें) या अपनी स्वतंत्र प्रति। */
module.exports = function buildSubjectPages(buildSpecial) {
  let built = 0;
  Object.keys(SUBJECT_SLUGS).sort().forEach(function(nameHi){
    const slug = SUBJECT_SLUGS[nameHi];
    const isSchool = SCHOOL_LEVEL.has(nameHi);
    const ncertBlock = isSchool
      ? '<p style="margin:18px 0"><a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener" ' +
        'style="display:inline-block;background:#1565C0;color:#fff;padding:12px 20px;border-radius:10px;' +
        'font-weight:800;text-decoration:none;font-size:17px">📘 NCERT की आधिकारिक पाठ्यपुस्तकें देखें (बाहरी वेबसाइट)</a></p>'
      : '';
    const content =
      '<div style="max-width:640px;margin:30px auto;padding:0 16px;text-align:center">' +
      '<h1 style="font-size:26px;margin:14px 0 10px;color:var(--navy)">📘 ' + nameHi + '</h1>' +
      ncertBlock +
      '<p style="font-size:18px;color:var(--navy);background:#FFF8E1;border:1.5px solid var(--gold);' +
      'border-radius:12px;padding:16px;margin-top:20px">पेज के कॉन्टेन्ट का विस्तृत तैयारी अभी की जा रही है।</p>' +
      '<p style="margin-top:22px"><a href="/courses/hi/" style="color:var(--blue);font-weight:700">← सभी कोर्स पर वापस जाएँ</a></p>' +
      '</div>';
    buildSpecial({
      out: "courses/hi/subject/" + slug + ".html",
      langStrict: true,
      title: nameHi + " — विषय | Applied Computer School™",
      desc: nameHi + " विषय की पढ़ाई — ACS पर जल्द उपलब्ध।",
      head: [],
      foot: [],
      content: content
    });
    built++;
  });
  console.log("✅ कुल " + built + " विषय-पेज बने");
};
