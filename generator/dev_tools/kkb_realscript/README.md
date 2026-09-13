# KKB असली-लिपि औज़ार (13-Sep-2026) — si · ps · bal · prs
देवनागरी-उच्चारण (item[1]) से असली लिपि (item[0]) — तीन-स्तंभ नियम v6.3-क1।
- `learn_dev2ar.js` — live fa/ur फ़ाइलों से देवनागरी→फ़ारसी-अरबी शब्दकोश सीखता है → `dev2ar_learned.json` (6,694 प्रविष्टियाँ)
- `dict_<code>.js` — हाथ से लिखे शब्दकोश (व्याकरण-शब्द + सीखे-शब्दकोश से बाहर के शब्द); dict_si = सिंहली शीर्ष-शब्द
- `realscript.js` — इंजन: hand-dict → learned-dict (≥2 व्यंजन, सिंधी/कश्मीरी अक्षर निषिद्ध, ur→ps/prs सामान्यीकरण) → नियम-fallback (Perso-Arabic / Sinhala Brahmic)
- `convert4.js` — चारों भाषाओं की L1+L2 पर लागू (items/tw/test-lines/help/drill-rows)
कवरेज (13-Sep): prs hand+learned 92% · ps 90% · bal 92% · si hand 50% + नियम 50% (Brahmic↔Brahmic यांत्रिक)।
⚠️ यह मशीन-लिप्यंतरण है — बोली/वर्तनी की native-speaker पुष्टि (RM/Counselor-network, 50 वाक्य spot-check) अनिवार्य।
