# KKB L2 — 38 भाषाएँ: मास्टर-सूची व प्रगति-tracker (v1.1)
तैयार: 10-Sep-2026 (v1.0, chatroom-sandbox) · पुनर्जन्म व अद्यतन: 13-Sep-2026 (v1.1 — 38-भाषा फ़्रेश v3.0 के साथ)
स्रोत = live v553 (मशीन-गिनती: 130 भाषाएँ · 92 पूरा-कोर्स live · 38 इस zip में)
मशीन-प्रति: generator/data/kkb_l2_pending.json (एक चीज़ = एक जगह) · औज़ार: generator/kkb_l2_register.js

## नियम (हर भाषा पर अटल)
1. **एक भाषा पूरी, तभी अगली।** एक chatroom = 1 (कठिन) या 2 (आसान) भाषा।
2. **क्रम:** `node generator/kkb_l2_register.js <code> --apply --skeleton` → skeleton भरो — 13 सप्ताह, [0]=असली लिपि, [1]=देवनागरी-उच्चारण, [2] हिंदी अटल → assets/kkb2_<code>_data.js → `node generator/build_kkb_bank.js <code>` → `node generator/build_specials.js` → robots।
3. **🏁-द्वार (v6.3-क3):** dev_kkb2_check 🏁🏁 · dev_kkb_check 🏁 · dev_kkb_quiz_check 🏁 · dev_bhasha_full_check 🏁 · dev_courses_page_check 🏁 — इसी session में असली node से; बिना 🏁 upload नहीं। **पंजीकरण (register) के बिना robot उस भाषा को जानता ही नहीं — इसलिए generator-फ़ाइलें हर zip में साथ जाएँ।**
4. **तीन-स्तंभ (v6.3-क1):** [0] असली लिपि, देवनागरी शून्य; [1] सिर्फ़ देवनागरी।
5. **मास्टर-दर्पण (v6.3-क6):** हिंदी-स्तंभ मास्टर से एक पंक्ति भी अलग नहीं; सिर्फ़ भाषा-नाम की अदला-बदली।
6. **अगला-स्तर कड़ी (v6.1-ग):** सिर्फ़ वेब-जीवित-जाँच के बाद (next.v="link"); न हो तो ईमानदार पंक्ति। भीतरी नोट पेज पर कभी न छपे।
7. **बोलियाँ (अरबी-8):** 50 वाक्य स्थानीय-वक्ता spot-check (RM/Counselor-network)।
8. **देय:** GitHub zip + office zip (functions/*_bank.js) अलग-अलग; पहली देय = पूरा zip; बाद की = patch।
9. **✅ सिर्फ़ तब** जब zip GitHub पर चढ़े और ताज़ा tarball से मशीन-गिनती मिले (v4.4-क2)। इस फ़ाइल की तालिका तभी ⬜/📦 → ✅।

## तालिका (38) — स्थिति: 📦 = zip v3.0 में तैयार, upload लंबित (⬜/📦 → ✅ सिर्फ़ upload + ताज़ा-tarball मशीन-गिनती के बाद)
| # | कोड | PJ | भाषा | गलियारा | L2-लिपि (लक्ष्य) | TTS | अगला-स्तर | विशेष | स्थिति |
|---|---|---|---|---|---|---|---|---|---|
| 1 | acm | PJ112 | मेसोपोटामिया अरबी (Mesopotamian Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-IQ | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 2 | acw | PJ113 | हिजाज़ी अरबी (Hejazi Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-SA | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 3 | aec | PJ119 | सैदी अरबी (Saidi Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-EG | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 4 | apc | PJ111 | लेवांटाइन अरबी (Levantine Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-JO | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 5 | apd | PJ116 | सूडानी अरबी (Sudanese Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-SD | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 6 | arq | PJ117 | अल्जीरियाई अरबी (Algerian Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-DZ | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 7 | ary | PJ118 | मोरक्कन अरबी (Moroccan Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-MA | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 8 | arz | PJ115 | मिस्री अरबी (Egyptian Arabic) | खाड़ी व अरब देश | arabic (RTL) | ar-EG | ईमानदार-पंक्ति | बोली — स्थानीय-वक्ता spot-check (50 वाक्य) अनिवार्य | 📦 |
| 9 | ku | PJ090 | कुर्दिश (Kurdish) | खाड़ी व अरब देश | latin-native | ku | ईमानदार-पंक्ति |  | 📦 |
| 10 | bal | PJ063 | बलूची (Balochi) | पड़ोसी देश | perso-arabic (RTL) | bal | ईमानदार-पंक्ति | L1+L2 दोनों असली-लिपि में (13-Sep, देवनागरी-उच्चारण से मशीन-लिप्यंतरण: hand-शब्दकोश + fa/ur-सीखा शब्दकोश + नियम) — native-speaker spot-check अनिवार्य।  | 📦 (असली-लिपि 13-Sep — native-पुष्टि बाक़ी) |
| 11 | prs | PJ064 | दारी (Dari) | पड़ोसी देश | perso-arabic (RTL) | prs-AF | ईमानदार-पंक्ति | L1+L2 दोनों असली-लिपि में (13-Sep, देवनागरी-उच्चारण से मशीन-लिप्यंतरण: hand-शब्दकोश + fa/ur-सीखा शब्दकोश + नियम) — native-speaker spot-check अनिवार्य।  | 📦 (असली-लिपि 13-Sep — native-पुष्टि बाक़ी) |
| 12 | ps | PJ062 | पश्तो (Pashto) | पड़ोसी देश | perso-arabic (RTL) | ps-AF | ईमानदार-पंक्ति | L1+L2 दोनों असली-लिपि में (13-Sep, देवनागरी-उच्चारण से मशीन-लिप्यंतरण: hand-शब्दकोश + fa/ur-सीखा शब्दकोश + नियम) — native-speaker spot-check अनिवार्य।  | 📦 (असली-लिपि 13-Sep — native-पुष्टि बाक़ी) |
| 13 | si | PJ061 | सिंहली (Sinhala) | पड़ोसी देश | sinhala | si-LK | ईमानदार-पंक्ति | L1+L2 दोनों असली-लिपि में (13-Sep, देवनागरी-उच्चारण से मशीन-लिप्यंतरण: hand-शब्दकोश + fa/ur-सीखा शब्दकोश + नियम) — native-speaker spot-check अनिवार्य।  | 📦 (असली-लिपि 13-Sep — native-पुष्टि बाक़ी) |
| 14 | az | PJ093 | अज़रबैजानी (Azerbaijani) | एशिया | latin-native | az-AZ | ईमानदार-पंक्ति |  | 📦 |
| 15 | kk | PJ092 | कज़ाख (Kazakh) | एशिया | cyrillic-native | kk-KZ | ✅ कड़ी जाँची: app.testcenter.kz |  | 📦 |
| 16 | ky | PJ095 | किर्गिज़ (Kyrgyz) | एशिया | cyrillic-native | ky-KG | ईमानदार-पंक्ति |  | 📦 |
| 17 | tg | PJ094 | ताजिक (Tajik) | एशिया | cyrillic-native | tg-TJ | ईमानदार-पंक्ति |  | 📦 |
| 18 | tt | PJ110 | तातार (Tatar) | एशिया | cyrillic-native | tt-RU | ईमानदार-पंक्ति |  | 📦 |
| 19 | ug | PJ096 | उइघुर (Uyghur) | एशिया | perso-arabic (RTL) | ug-CN | ईमानदार-पंक्ति |  | 📦 |
| 20 | uz | PJ091 | उज़्बेक (Uzbek) | एशिया | latin-native | uz-UZ | ईमानदार-पंक्ति |  | 📦 |
| 21 | ay | PJ100 | आयमारा (Aymara) | यूरोप व अमेरिका | latin-native | ay | ईमानदार-पंक्ति |  | 📦 |
| 22 | be | PJ134 | बेलारूसी (Belarusian) | यूरोप व अमेरिका | cyrillic-native | be-BY | ईमानदार-पंक्ति |  | 📦 |
| 23 | bg | PJ136 | बुल्गारियाई (Bulgarian) | यूरोप व अमेरिका | cyrillic-native | bg-BG | ✅ कड़ी जाँची: ecl.hu |  | 📦 |
| 24 | cs | PJ133 | चेक (Czech) | यूरोप व अमेरिका | latin-native | cs-CZ | ✅ कड़ी जाँची: ujop.cuni.cz |  | 📦 |
| 25 | el | PJ131 | ग्रीक (Greek) | यूरोप व अमेरिका | greek | el-GR | ✅ कड़ी जाँची: greek-language.gr |  | 📦 |
| 26 | gn | PJ098 | गुआरानी (Guarani) | यूरोप व अमेरिका | latin-native | gn-PY | ईमानदार-पंक्ति |  | 📦 |
| 27 | ht | PJ097 | हाईटियन क्रियोल (Haitian Creole) | यूरोप व अमेरिका | latin-native | fr-HT | ईमानदार-पंक्ति |  | 📦 |
| 28 | hu | PJ132 | हंगेरियन (Hungarian) | यूरोप व अमेरिका | latin-native | hu-HU | ✅ कड़ी जाँची: ecl.hu |  | 📦 |
| 29 | hy | PJ145 | अर्मेनियाई (Armenian) | यूरोप व अमेरिका | armenian | hy-AM | ईमानदार-पंक्ति |  | 📦 |
| 30 | mt | PJ140 | माल्टीज़ (Maltese) | यूरोप व अमेरिका | latin-native | mt-MT | ईमानदार-पंक्ति |  | 📦 |
| 31 | myn | PJ101 | मायन (Yucatec Maya) | यूरोप व अमेरिका | latin-native | yua | ईमानदार-पंक्ति |  | 📦 |
| 32 | nl | PJ130 | डच (Dutch) | यूरोप व अमेरिका | latin-native | nl-NL | ✅ कड़ी जाँची: cnavt.org |  | 📦 |
| 33 | qu | PJ099 | क्वेशुआ (Quechua) | यूरोप व अमेरिका | latin-native | qu-PE | ईमानदार-पंक्ति |  | 📦 |
| 34 | ro | PJ129 | रोमानियाई (Romanian) | यूरोप व अमेरिका | latin-native | ro-RO | ✅ कड़ी जाँची: ilr.ro |  | 📦 |
| 35 | sv | PJ135 | स्वीडिश (Swedish) | यूरोप व अमेरिका | latin-native | sv-SE | ✅ कड़ी जाँची: folkuniversitetet.se |  | 📦 |
| 36 | mfe | PJ122 | मॉरीशियन क्रीओल (Mauritian Creole) | अफ़्रीका | latin-native | fr-MU | ईमानदार-पंक्ति |  | 📦 |
| 37 | pcm | PJ120 | नाइजीरियन पिजिन (Nigerian Pidgin) | अफ़्रीका | latin-native | en-NG | ईमानदार-पंक्ति |  | 📦 |
| 38 | brx | PJ058 | बोडो (Bodo) | भारतीय भाषाएँ — देवनागरी लिपि | devanagari-native | hi-IN | ईमानदार-पंक्ति |  | 📦 |

## हिसाब-पट्टी (13-Sep-2026)
कुल 130 · live पूरा-कोर्स 92 · zip v3.0 में 38 (सब असली-लिपि) · sw v591 · 4 robots 38/38 🏁 · गहरा content-ऑडिट 38/38 पास।

## दर्ज होल
- 🟠 **si · ps · bal · prs — असली-लिपि मशीन-लिप्यंतरण (13-Sep) की native-speaker पुष्टि बाक़ी** — 50-वाक्य spot-check (RM/Counselor-network); सुधार dict_<code>.js में जोड़कर convert4 दोबारा (generator/dev_tools/kkb_realscript)। बलूची L2 test-lines 65/81 (मास्टर से 16 कम — भंडारण-रूप नोट, robot-⚠️)।
- 🟡 **"अंग्रेज़ी सीख रहा हूँ" वाली 19 पंक्तियाँ** (items[2] + item[0]) 118 भाषा-फ़ाइलों में मास्टर-रूप में (सिर्फ़ ru/de/ja/ko/fr/es/ar/he आदि 11 में भाषा-नाम) — शृंखला-व्यापी सफ़ाई-दौर, Founder-मंज़ूरी पर (दोनों स्तंभ बदलेंगे)।
- 🟡 **test.goal "English में"** — इस zip की 38 में सुधरा; live की 74 पुरानी फ़ाइलों में यथावत (अलग सफ़ाई-दौर)।
- 🟢 kk/hu/bg/cs/sv/nl/el/ro की कड़ियाँ 13-Sep को जाँची — हर 6 माह पुनः-जाँच (check-robot में कड़ी-जीविता जाँच अभी नहीं)।
