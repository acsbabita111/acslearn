# ACS Content-Factory v0.1 — चलाने की विधि (office laptop)
1. Node 18+ चाहिए (`node --version`)।
2. `factory.config.sample.json` की नक़ल `factory.config.json` बनाओ, उसमें अपनी API key भरो।
   ⚠️ `factory.config.json` GitHub पर **कभी नहीं** — zip में सिर्फ़ sample है, यही नियम है।
3. परीक्षण-batch:  `node factory_build.js --batch outlines/batch_026_030.js`
   - हर पास पाठ `out/lesson_NNN.json` में सहेजा जाता है (बिजली-कट सुरक्षित; दोबारा चलाने पर बने पाठ छोड़े जाते हैं)।
   - fail-पाठ की सूचना console पर — वह Claude-chat से लिखा जाएगा।
4. नमूना-पठन: out/ के json खोलकर (या Founder chat में भेजकर) भाषा-गुणवत्ता जाँचो।
5. मंज़ूरी के बाद:  `node factory_build.js --merge`  → data-फ़ाइल में जुड़ें (backup अपने-आप)।
6. फिर हमेशा वाला रास्ता: `cd .. && node build_course_pages.js` → पेज → zip → upload।
- provider बदलना: config में baseUrl+model बदलो (नीचे _deepseek/_mistral नमूने) — script वही।
