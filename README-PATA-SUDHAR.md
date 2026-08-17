# DCA-2036 पता-सुधार (Founder-अ) · 17-Aug-2026 · sw v342

**क्या बदला:** कोर्स अब ठीक पुराने पते `/courses/hi/digital/dca/` पर (digital/ परिवार में)। `/courses/hi/dca-2036/` फ़ोल्डर और सब redirect-पर्चियाँ **मिटनी हैं** — कोई पर्ची नहीं। courseId PJ016 वही; office-server अछूता (कुछ deploy नहीं करना)।

## GitHub पर — एक commit
1. **मिटाओ (पूरा फ़ोल्डर):** `courses/hi/dca-2036/` (500 फ़ाइलें)।
2. **मिटाओ (पूरा फ़ोल्डर):** `courses/hi/digital/dca/` का सब कुछ (361 पर्चियाँ + `index.htm` + `style.css` = 363)।
3. **चढ़ाओ:** इस zip का पूरा ढाँचा — `courses/hi/digital/dca/` के 500 नए पेज + बाक़ी 10 फ़ाइलें।
   (GitHub web में एक commit में हटाना+जोड़ना न हो तो: पहले दोनों फ़ोल्डर हटाओ (commit-1), तुरंत zip चढ़ाओ (commit-2) — बीच में 10 मिनट से ज़्यादा नहीं।)

## 10 मिनट बाद मोबाइल-जाँच
- `acslearn.com/courses/hi/digital/dca/` → नया index (498 पाठ, 22 खंड); पाठ-1 → नीचे 5 अभ्यास-प्रश्न, हरा/लाल, प्रगति-पट्टी।
- `acslearn.com/courses/hi/dca-2036/` → 404 (यही सही)।
- `/courses/hi/` की सूची और उद्यम-पेज "कंप्यूटर संस्थान" की कड़ी → नए index पर।
- dashboard → 🎓 DCA-2036 → 120 प्रश्न (server पहले से नया बैंक — कल का deploy)।

## इस zip में
`courses/hi/digital/dca/` 500 पेज (generator से, canonical नया) · `courses_data.js` दोनों · `udyam_data.js` तीनों · `udyam/computer-institute-business.html` · `sw.js` v342 · `sitemap.xml` (digital/dca के 500, dca-2036 शून्य) · `generator/build_dca_pages.js` + `generator/data/dca_course_data.js` (slug = digital/dca) · SHA256SUMS.txt।

## स्थायी सीख (Addendum में दर्ज होगी)
नया पता/फ़ोल्डर बनाने से पहले पड़ोसी कोर्सों का live-पता देखो और Founder-पुष्टि लो; "हटाओ" के आदेश पर पर्ची/stub नहीं — हटाना ही।
