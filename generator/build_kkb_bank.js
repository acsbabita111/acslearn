/* generator/build_kkb_bank.js — v2.0 (01-Sep-2026, Founder-नियम 40/40/40: + बोलो-प्रश्न T15/T16/T17 · en भी इसी इंजन से) · v1.1 (+ हिब्रू he) · v1.0 (31-Aug-2026) · Founder-मुहर: 7 भाषाओं के server-परीक्षा बैंक
   ACS Certificate in Spoken <भाषा> — build_eng_bank.js (v2.0) का भाषा-सामान्यीकरण। English बैंक अछूता (वही eng-generator से)।
   चलाना: node generator/build_kkb_bank.js <ar|fr|es|ja|ko|de|ru>   (repo-रूट से)
   स्रोत (सब frozen corpus से — कुछ गढ़ा नहीं): 2,150 वाक्य + लक्ष्य-शब्द + सुनो-जवाब जोड़े + संवाद-जोड़ियाँ।
   प्रकार (t:1-14) English-मास्टर जैसे; भाषा-नियम:
   - जापानी (ja): शब्द-आधारित प्रकार 5/6/7/12 नहीं (space-रहित लिपि; कोष्ठक-romaji पर ख़ाली-जगह बेमानी) — ROT=[1,2,3,4]
   - रूसी (ru) v2.0 (31-Aug, Founder-आदेश): it[0]=असली सिरिलिक → पूर्ण ROT [1..7,12]; पुराना [1,2,5,6,7,12]+UPX=0 निरस्त
   - सुनो-प्रश्न (13/14) का ((AU:...)) पाठ = spoken-रूप (जापानी में अंत का romaji कटा) — client-TTS भाषा कोर्स-वार (dashboard v6.2)
   लंबाई-पक्षपात रोक (v5.2 होल): distractor लंबाई-खिड़की + tiny-टोकरी; सही-स्थान बेतरतीब; 15-35% खिड़की मशीन-जाँच।
   देय: functions/<code>_bank.js — server-only, GitHub पर कभी नहीं (eng_bank.js-नियम)। */
"use strict";
var fs = require("fs");
var CODE = (process.argv[2] || "").toLowerCase();
var CFG = {
  ar: { label: "अरबी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  fr: { label: "फ़्रेंच", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  es: { label: "स्पेनिश", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ja: { label: "जापानी", rot: [1, 2, 3, 4], au: true },
  ko: { label: "कोरियाई", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  de: { label: "जर्मन", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ru: { label: "रूसी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.0 (31-Aug): it[0]=सिरिलिक ⇒ 3/4 अब वैध */
  he: { label: "हिब्रू", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true, skipLatinTw: true },
  en: { label: "अंग्रेज़ी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true, data: ["assets/kkb_data.js", "assets/kkb2_data.js"] }, /* v2.0: English मास्टर भी इसी इंजन से (eng_bank.js) */ /* v1.1 (01-Sep): हिब्रू — असली-लिपि, space-विभाजित ⇒ पूर्ण ROT */
  /* v2.1 (02-Sep, 10-भाषा बैच): सब असली-लिपि + space-विभाजित Brahmic/Latin ⇒ पूर्ण ROT (ja-जैसा अपवाद नहीं) */
  pt: { label: "पुर्तगाली", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ur: { label: "उर्दू", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.2 (02-Sep RTL-परिवार): असली उर्दू-लिपि, space-विभाजित ⇒ अरबी-जैसा पूर्ण ROT */
  fa: { label: "फ़ारसी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.3 (02-Sep RTL-परिवार): असली फ़ारसी-लिपि, space-विभाजित ⇒ अरबी-जैसा पूर्ण ROT */
  sd: { label: "सिंधी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ks: { label: "कश्मीरी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.5 (03-Sep RTL-परिवार): असली कश्मीरी नस्तालीक़, space-विभाजित ⇒ अरबी-जैसा पूर्ण ROT */ /* v2.4 (03-Sep RTL-परिवार): असली सिंधी-लिपि, space-विभाजित ⇒ अरबी-जैसा पूर्ण ROT */
  kn: { label: "कन्नड़", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ta: { label: "तमिल", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  te: { label: "तेलुगु", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  bn: { label: "बांग्ला", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  mr: { label: "मराठी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.6 (03-Sep 4-भाषा खेप): देवनागरी [0]=[1] */
  ne: { label: "नेपाली", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.7 (03-Sep 4-भाषा खेप): देवनागरी [0]=[1] */
  sw: { label: "स्वाहिली", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  bho: { label: "भोजपुरी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v2.9 (03-Sep) — देवनागरी [0]=[1] */
  zh: { label: "चीनी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.0 (04-Sep) — असली=[0], देवनागरी=[1] */
  id: { label: "इंडोनेशियाई", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.1 (04-Sep) — Latin असली=[0] */
  tr: { label: "तुर्की", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.2 (04-Sep) — Latin+ğüşıöç असली=[0] */ /* v2.8 (03-Sep 4-भाषा खेप): Latin — [0] स्वाहिली, [1] देवनागरी-उच्चारण */
  or: { label: "उड़िया", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  as: { label: "असमिया", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  pa: { label: "पंजाबी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  gu: { label: "गुजराती", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  ml: { label: "मलयालम", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true },
  mai: { label: "मैथिली", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.3 (04-Sep) — देवनागरी [0]=[1] */
  it: { label: "इतालवी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.4 (04-Sep) — Latin, अगली-8 खेप का तीसरा */
  ms: { label: "मलय", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.5 (04-Sep) — Latin, अगली-8 खेप का चौथा */
  vi: { label: "वियतनामी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.6 (04-Sep) — Latin+tone-marks, अगली-8 खेप का पाँचवाँ */
  th: { label: "थाई", rot: [1, 2, 3, 4], au: true }, /* v3.7 */
  sa: { label: "संस्कृत", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true }, /* v3.8 (05-Sep) — देवनागरी [0]=[1], देव-भाषा परिवार */
  pl: { label: "पोलिश", rot: [1, 2, 3, 4], au: true }, /* v3.9 (07-Sep) — पूर्वी-यूरोप-खेप-1, Latin-native */
  uk: { label: "यूक्रेनी", rot: [1, 2, 3, 4], au: true }, /* v4.0 (07-Sep) — पूर्वी-यूरोप-खेप-2, Cyrillic-native */
  hr: { label: "क्रोएशियाई", rot: [1, 2, 3, 4], au: true }, /* v4.1 (07-Sep) — पूर्वी-यूरोप-खेप-3, Latin-native */
  sr: { label: "सर्बियाई", rot: [1, 2, 3, 4], au: true }, /* v4.2 (07-Sep) — पूर्वी-यूरोप-खेप-4, Cyrillic-native */
  lt: { label: "लिथुआनियाई", rot: [1, 2, 3, 4], au: true }, /* v4.3 (07-Sep) — पूर्वी-यूरोप-खेप-5, Latin-native */
  sk: { label: "स्लोवाक", rot: [1, 2, 3, 4], au: true }, /* v4.4 (07-Sep) — पूर्वी-यूरोप-खेप-6, Latin-native */
  fi: { label: "फ़िनिश", rot: [1, 2, 3, 4], au: true }, /* v4.5 (08-Sep) — उत्तर-यूरोप का पहला, Latin-native */
  ka: { label: "जॉर्जियाई", rot: [1, 2, 3, 4], au: true }, awa: { label: "अवधी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप पहला */, bgc: { label: "हरियाणवी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप दूसरा */, bhb: { label: "भीली", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप तीसरा */, bjj: { label: "बज्जिका", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप चौथा */, doi: { label: "डोगरी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप पाँचवाँ */, gbm: { label: "गढ़वाली", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप छठवाँ */, kfy: { label: "कुमाऊंनी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप सातवाँ */, hne: { label: "छत्तीसगढ़ी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप आठवाँ */, mag: { label: "मगही", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप नौवाँ */, gom: { label: "कोंकणी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप दसवाँ */, mwr: { label: "मारवाड़ी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप ग्यारहवाँ */, mni: { label: "मणिपुरी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप बारहवाँ */, skr: { label: "सराइकी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप तेरहवाँ */, pnb: { label: "पश्चिमी पंजाबी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप चौदहवाँ */, syl: { label: "सिल्हटी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, दक्षिण-एशिया-खेप पंद्रहवाँ; बंगाली-लिपि-दूषण bn2dev.py fixer से सुधारा */, tcy: { label: "तुलु", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, द्रविड़-परिवार पहला; ⚠️ उच्च-अनिश्चितता, स्थानीय-वक्ता-जाँच अनिवार्य; कन्नड़-लिपि-दूषण kn2dev.py fixer से सुधारा */, gon: { label: "गोंडी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, द्रविड़-परिवार दूसरा; ⚠️ उच्च-अनिश्चितता, स्थानीय-वक्ता-जाँच अनिवार्य */, sat: { label: "संथाली", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, मुंडा-परिवार पहला (न हिंद-आर्य न द्रविड़); ⚠️⚠️ उच्च-अनिश्चितता, स्थानीय-वक्ता-जाँच अनिवार्य; दक्षिण-एशिया-खेप का अठारहवाँ/अंतिम */, anp: { label: "अंगिका", rot: [1, 2, 3, 4], au: true } /* 09-Sep — देवनागरी-native, हिंद-आर्य परिवार (बिहार-भागलपुर-मुंगेर-पूर्णिया); उच्च-विश्वसनीयता — 18-भाषा कतार के बाहर, ऑडिट से पकड़ी अलग भाषा */, af: { label: "अफ़्रीकांस", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (जर्मनिक/इंडो-यूरोपीय), उच्च-विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पहला */, ha: { label: "हाउसा", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin (चाडिक/अफ़्रो-एशियाटिक), मध्यम-उच्च विश्वसनीयता — अफ़्रीका-18-भाषा-खेप दूसरा */, so: { label: "सोमाली", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (कुशीतिक/अफ़्रो-एशियाटिक), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप तीसरा */, wo: { label: "वोलोफ़", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (नाइजर-कांगो/अटलांटिक), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप चौथा */, lg: { label: "लुगांडा", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Bantu परिवार), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पाँचवाँ */, rw: { label: "किन्यारवांडा", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Bantu परिवार, रवांडा-आधिकारिक), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप छठा */, ny: { label: "चिचेवा", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Bantu परिवार, मलावी-राष्ट्रभाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सातवाँ */, sn: { label: "शोना", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Bantu परिवार, ज़िम्बाब्वे-मुख्य भाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप आठवाँ */, tw: { label: "अकान/त्वी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (विशेष स्वर ɛ/ɔ, Kwa परिवार, घाना-मुख्य भाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप नौवाँ */, om: { label: "ओरोमो", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native Qubee लिपि (Cushitic परिवार, इथियोपिया-व्यापक भाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप दसवाँ; L1-transliteration इसी दौर में सुधारी गई (पुराना corrupted देवनागरी बदला) */, bm: { label: "बमबारा", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Manding परिवार, माली-मुख्य भाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप ग्यारहवाँ */, mg: { label: "मालागासी", rot: [1, 2, 3, 4], au: true } /* 09-Sep — latin-native (Austronesian परिवार, मैडागास्कर-मुख्य भाषा), मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप बारहवाँ; L1-transliteration इसी दौर में सुधारी गई */, am: { label: "अम्हारिक", rot: [1, 2, 3, 4], au: true } /* 09-Sep — Ethiopic-Geez लिपि (Semitic परिवार, इथियोपिया-आधिकारिक भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप तेरहवाँ; L1-transliteration इसी दौर में सुधारी गई (character-level Geez syllabary मैपिंग) */, ti: { label: "तिग्रीन्या", rot: [1, 2, 3, 4], au: true } /* 10-Sep — Ethiopic-Geez लिपि (Semitic परिवार, इरिट्रिया/उत्तर-इथियोपिया भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप चौदहवाँ; L1 पहले से सही थी */, yo: { label: "योरूबा", rot: [1, 2, 3, 4], au: true } /* 10-Sep — latin-native (tone-marked), Niger-Congo परिवार (नाइजीरिया-प्रमुख भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पंद्रहवाँ; L1-transliteration इसी दौर में सुधारी गई; SCRIPT_RULES regex Latin-Extended-Additional तक बढ़ाया गया */, ig: { label: "इग्बो", rot: [1, 2, 3, 4], au: true } /* 10-Sep — latin-native (tone-marked), Niger-Congo परिवार (नाइजीरिया-प्रमुख भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सोलहवाँ; L1-transliteration इसी दौर में सुधारी गई (help-array का अलग data-bug भी पकड़ा-बंद) */, zu: { label: "ज़ुलु", rot: [1, 2, 3, 4], au: true } /* 10-Sep — latin-plain (click-consonants c/q/x — सुसंगत सन्निकटन, कोई सीधा देवनागरी-प्रतिनिधित्व नहीं), Nguni/Bantu परिवार (दक्षिण-अफ़्रीका की सबसे बड़ी भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सत्रहवाँ; L1-transliteration इसी दौर में सुधारी गई (help-array data-bug भी बंद, इग्बो जैसा) */, xh: { label: "षोसा", rot: [1, 2, 3, 4], au: true } /* 10-Sep — latin-plain (click-consonants c/q/x — ज़ुलु जैसा सुसंगत सन्निकटन), Nguni/Bantu परिवार (दक्षिण-अफ़्रीका की दूसरी सबसे बड़ी भाषा), मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप अठारहवाँ (अंतिम); L1-transliteration इसी दौर में सुधारी गई (help-array data-bug भी बंद) */ /* v4.6 (08-Sep) — Georgian script, non-Latin */ /* v3.7 (05-Sep) — थाई-लिपि (space-रहित, जापानी जैसा) — rot में 6/7/12 (word-count-आधारित) शामिल नहीं, अगली-8 खेप का आठवाँ व अंतिम */, bo: { label: "तिब्बती", rot: [1, 2, 3, 4], au: true } /* v3.8 (10-Sep) — Tibetan Uchen, tsek-जुड़ा (space-रहित native), ja/th-जैसा प्रतिबंधित ROT */, ceb: { label: "सिबुआनो", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true } /* v3.9 (10-Sep) — Latin, space-विभाजित, अत्यंत ध्वन्यात्मक, पूर्ण ROT */, jv: { label: "जावानीज़", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true } /* v4.0 (10-Sep) — Latin, space-विभाजित, पूर्ण ROT */, km: { label: "खमेर", rot: [1, 2, 3, 4], au: true } /* v4.1 (10-Sep) — Khmer script, space-रहित native (देवनागरी-column में स्पेस हैं पर native में नहीं) — ja/th/bo जैसा प्रतिबंधित ROT */, lo: { label: "लाओ", rot: [1, 2, 3, 4], au: true } /* v4.2 (10-Sep) — Lao script, space-रहित native — ja/th/bo/km जैसा प्रतिबंधित ROT */, mn: { label: "मंगोलियाई", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true } /* v4.3 (10-Sep) — Cyrillic, space-विभाजित, पूर्ण ROT */, my: { label: "बर्मी", rot: [1, 2, 3, 4], au: true } /* v4.4 (10-Sep) — Myanmar script, space-रहित native — ja/th/bo/km/lo जैसा प्रतिबंधित ROT */, nan: { label: "मीनान चीनी", rot: [1, 2, 3, 4], au: true } /* v4.5 (10-Sep) — Han script (Min Nan/Hokkien), space-रहित native — ja/th/bo/km/lo/my जैसा प्रतिबंधित ROT */, su: { label: "सुंडानी", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true } /* v4.6 (10-Sep) — Latin native, space-विभाजित, पूर्ण ROT (ceb/jv जैसा) */, tl: { label: "तागालोग", rot: [1, 2, 3, 4, 5, 6, 7, 12], au: true } /* v4.7 (10-Sep) — Latin native, space-विभाजित, पूर्ण ROT */, yue: { label: "कैंटोनीज़", rot: [1, 2, 3, 4], au: true } /* v4.8 (10-Sep) — Han script (Cantonese), space-रहित native — ja/th/bo/km/lo/my/nan जैसा प्रतिबंधित ROT */
};
if (!CFG[CODE]) { console.log("⛔ भाषा-code दीजिए: ar|fr|es|ja|ko|de|ru|he|en|pt|kn|ta|te|bn|or|as|pa|gu|ml"); process.exit(1); }
var L = CFG[CODE].label;
global.window = {};
var DP = CFG[CODE].data || ["assets/kkb_" + CODE + "_data.js", "assets/kkb2_" + CODE + "_data.js"];
eval(fs.readFileSync(DP[0], "utf8").replace("window.KKB_DATA", "global.window.KKB_DATA"));
eval(fs.readFileSync(DP[1], "utf8").replace("window.KKB2_DATA", "global.window.KKB2_DATA"));
var D1 = global.window.KKB_DATA, D2 = global.window.KKB2_DATA;
function clean(t) { return String(t).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, "").replace(/^\([^()\s]{1,8}\)\s*/, "").replace(/\s*\([^()]*[\u0900-\u097F][^()]*\)\s*$/, ""); } /* v2.0: (שמע)/(דבר)-जैसे लिपि-टैग व अंत का (देवनागरी-उच्चारण) भी हटे — listen-भंडारण-रूप */
function spokenT(t) { t = clean(t); if (CODE === "ja" || CODE === "zh" || CODE === "nan") t = t.replace(/\s*\([^()]*\)\s*$/, ""); return t; } /* 04-Sep: zh भी pinyin-कोष्ठक AU-टकराव-मुक्त */
var ALL = [], TW = [], LIS = [], DLG = [];
[D1, D2].forEach(function (D) {
  D.weeks.forEach(function (w) {
    w.days.forEach(function (d) {
      d.items.forEach(function (it) { ALL.push({ en: clean(it[0]), dev: it[1], hi: it[2] }); });
      (d.tw || []).forEach(function (t) { if (CFG[CODE].skipLatinTw && /^[A-Za-z][A-Za-z-]*$/.test(t[0])) return; /* v1.1: Latin brand-शब्द (UPI/OTP/eMigrate…) — असली-लिपि भाषाओं में शब्द-प्रश्न बेमानी, छोड़ो */ TW.push({ w: t[0], dev: t[1], hi: t[2] }); });
    });
    (w.listen || []).forEach(function (p) { LIS.push({ q: clean(p[0]), a: clean(p[1]) }); });
    if (w.dialog) for (var p2 = 0; p2 < w.dialog.length - 1; p2++)
      DLG.push({ ask: clean(w.dialog[p2][1]), rep: clean(w.dialog[p2 + 1][1]) });
  });
});
if (ALL.length !== 2150) { console.log("⛔ corpus " + ALL.length); process.exit(1); }

/* स्थिर बेतरतीबी (regen = वही बैंक) — भाषा-वार अलग seed */
var SALT = { ar: 0, fr: 0, es: 0, ja: 0, ko: 0, de: 0, ru: 0, he: 0, en: 0 };
var UPX = 0.12; /* v2.0 (31-Aug): ru अब सिरिलिक — विशेष UPX-छूट निरस्त, default सब पर */
var seed = 90210 + CODE.charCodeAt(0) * 977 + CODE.charCodeAt(1) * 31 + (SALT[CODE] || 0) * 10007;
function rnd() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return ((seed >>> 0) % 100000) / 100000; }

/* लंबाई-संतुलित distractor-चुनाई (v5.2 होल-रोक) */
function pick3(pool, correct, getT) {
  var cl = correct.length, out = [], tries = 0, win = 0.28, tiny = cl < 8;
  while (out.length < 3 && tries < 9000) {
    tries++;
    if (tries % 900 === 0) win += 0.2;
    var t = getT(pool[Math.floor(rnd() * pool.length)]);
    if (!t || t === correct) continue;
    if (tiny) { if (t.length > 16) continue; }
    else { var r = t.length / cl; if (r < 1 - win || r > 1 + win + UPX) continue; }
    var dup = false;
    for (var k = 0; k < out.length; k++) if (out[k] === t) dup = true;
    if (!dup) out.push(t);
  }
  return out.length === 3 ? out : null;
}
function mkQ(t, q, correct, ds) {
  var pos = Math.floor(rnd() * 4), o = [];
  for (var p = 0, di = 0; p < 4; p++) o.push(p === pos ? correct : ds[di++]);
  return { typ: t, t: q, o: o, a: pos };  /* client प्रश्न-पाठ .t से छापता (server field-मानचित्र {id,t,o,a}) */
}
function words(en) { return en.replace(/[.,!?"'’—،؟]/g, " ").split(/\s+/).filter(function (x) { return x.length > 0; }); }

/* ---- प्रकार-builders (null = इस सामग्री पर लागू नहीं → अगला प्रकार) ---- */
var B = {};
B[1] = function (it) { var ds = pick3(ALL, it.hi, function (x) { return x.hi; }); return ds && mkQ(1, "इस " + L + " वाक्य का सही हिंदी अर्थ चुनिए — \u201C" + it.en + "\u201D", it.hi, ds); };
B[2] = function (it) { var ds = pick3(ALL, it.en, function (x) { return x.en; }); return ds && mkQ(2, "\u201C" + it.hi + "\u201D — इस बात का सही " + L + " वाक्य चुनिए", it.en, ds); };
B[3] = function (it) { var ds = pick3(ALL, it.en, function (x) { return x.en; }); return ds && mkQ(3, "जिस " + L + " वाक्य का उच्चारण \u201C" + it.dev + "\u201D है, वह चुनिए", it.en, ds); };
B[4] = function (it) { var ds = pick3(ALL, it.dev, function (x) { return x.dev; }); return ds && mkQ(4, "\u201C" + it.en + "\u201D — इस वाक्य का सही उच्चारण चुनिए", it.dev, ds); };
B[5] = function (it) { /* ख़ाली-जगह */
  var ws = words(it.en).filter(function (w) { return w.length >= 4 && it.en.split(w).length === 2; });
  if (!ws.length) return null;
  var w = ws[Math.floor(rnd() * ws.length)];
  var ds = pick3(ALL, w, function (x) { var c = words(x.en).filter(function (y) { return y.length >= 3 && y.toLowerCase() !== w.toLowerCase(); }); return c.length ? c[Math.floor(rnd() * c.length)] : null; });
  return ds && mkQ(5, "ख़ाली जगह में सही शब्द चुनिए — \u201C" + it.en.replace(w, "______") + "\u201D (अर्थ: " + it.hi + ")", w, ds);
};
B[6] = function (it) { /* पहला-शब्द */
  var w = words(it.en)[0]; if (!w || words(it.en).length < 3) return null;
  var ds = pick3(ALL, w, function (x) { var f = words(x.en)[0]; return (f && f.toLowerCase() !== w.toLowerCase()) ? f : null; });
  return ds && mkQ(6, "\u201C" + it.hi + "\u201D — " + L + " में यह वाक्य किस शब्द से शुरू होगा?", w, ds);
};
B[7] = function (it) { /* वाक्य-पूर्ति (अंतिम हिस्सा) */
  var ws = words(it.en); if (ws.length < 5) return null;
  var tail = ws.slice(-2).join(" "), head = it.en.slice(0, it.en.lastIndexOf(ws[ws.length - 2]));
  var ds = pick3(ALL, tail, function (x) { var xw = words(x.en); if (xw.length < 5) return null; var t2 = xw.slice(-2).join(" "); return t2.toLowerCase() !== tail.toLowerCase() ? t2 : null; });
  return ds && mkQ(7, "वाक्य पूरा कीजिए — \u201C" + head + "______\u201D (अर्थ: " + it.hi + ")", tail, ds);
};
B[12] = function (it) { /* सही शब्द-क्रम: ग़लत विकल्प = उसी वाक्य के मशीन-उलटे क्रम */
  var ws = words(it.en); if (ws.length < 5 || ws.length > 9) return null;
  var seen = {}; seen[ws.join(" ").toLowerCase()] = 1;
  var ds = [], guard = 0;
  while (ds.length < 3 && guard < 200) {
    guard++;
    var c = ws.slice();
    for (var s2 = c.length - 1; s2 > 0; s2--) { var j2 = Math.floor(rnd() * (s2 + 1)); var tmp = c[s2]; c[s2] = c[j2]; c[j2] = tmp; }
    var str = c.join(" ");
    if (!seen[str.toLowerCase()]) { seen[str.toLowerCase()] = 1; ds.push(str); }
  }
  if (ds.length < 3) return null;
  return mkQ(12, "सही शब्द-क्रम वाला " + L + " वाक्य चुनिए (अर्थ: " + it.hi + ")", ws.join(" "), ds);
};
B[13] = function (it) { /* सुनो→अर्थ: वाक्य सिर्फ़ आवाज़ से — पाठ में नहीं */
  var ds = pick3(ALL, it.hi, function (x) { return x.hi; });
  return ds && mkQ(13, "🔊 सुनो-प्रश्न: नीचे बटन दबाकर " + L + " वाक्य सिर्फ़ कान से सुनिए (पढ़ने को नहीं मिलेगा) — फिर उसका सही हिंदी अर्थ चुनिए ((AU:" + spokenT(it.en) + "))", it.hi, ds);
};
B[14] = function (it) { /* सुनो→उच्चारण पहचानो */
  var ds = pick3(ALL, it.dev, function (x) { return x.dev; });
  return ds && mkQ(14, "🔊 सुनो-प्रश्न: बटन दबाकर वाक्य सुनिए — जो सुना, उसका सही उच्चारण चुनिए ((AU:" + spokenT(it.en) + "))", it.dev, ds);
};
/* ---- v2.0 बोलो-प्रश्न (Founder-नियम 01-Sep: 120 में 40 बोलो): o ख़ाली, a:-1, sp = अपेक्षित वाक्य (client को कभी नहीं जाता —
   server outQ में sp कटता है); client माइक से पहचाना text भेजे, server sp से मिलाए (आंशिक अंक)। पाठ में ((MIC)) = माइक-निशान। ---- */
function mkSp(typ, t, sp) { return { typ: typ, t: t, o: [], a: -1, sp: spokenT(sp) }; }
B[15] = function (it) { /* पढ़कर बोलो: वाक्य दिखे (असली लिपि + देवनागरी), ज़ोर से बोलो */
  return mkSp(15, "🎤 बोलो-प्रश्न: यह " + L + " वाक्य ज़ोर से बोलिए — \u201C" + spokenT(it.en) + "\u201D (" + it.dev + ") ((MIC))", it.en);
};
B[16] = function (it) { /* हिंदी देखो, उस भाषा में बोलो */
  return mkSp(16, "🎤 बोलो-प्रश्न: इसे " + L + " में बोलिए — \u201C" + it.hi + "\u201D ((MIC))", it.en);
};
B[17] = function (p) { /* सवाल सुनो, जवाब बोलो (listen/dialog-जोड़ी से) */
  return mkSp(17, "🔊🎤 सुनो-बोलो प्रश्न: बटन दबाकर " + L + " सवाल सुनिए (पढ़ने को नहीं मिलेगा), फिर उसका जवाब " + L + " में बोलिए ((AU:" + spokenT(p.q) + ")) ((MIC))", p.a);
};
/* tw-धारा */
B[8] = function (t) { var ds = pick3(TW, t.hi, function (x) { return x.hi; }); return ds && mkQ(8, L + " शब्द \u201C" + t.w + "\u201D (" + t.dev + ") का सही हिंदी अर्थ चुनिए", t.hi, ds); };
B[9] = function (t) { var ds = pick3(TW, t.w, function (x) { return x.w; }); return ds && mkQ(9, "जिस " + L + " शब्द का अर्थ \u201C" + t.hi + "\u201D है, वह चुनिए", t.w, ds); };
/* listen/dialog-धारा */
B[10] = function (p) { var ds = pick3(LIS.concat(ALL.slice(0, 400).map(function (x) { return { a: x.en }; })), p.a, function (x) { return x.a; }); return ds && mkQ(10, "सवाल — \u201C" + p.q + "\u201D — सबसे सही जवाब चुनिए", p.a, ds); };
B[11] = function (p) { var ds = pick3(DLG.concat(ALL.slice(500, 900).map(function (x) { return { rep: x.en }; })), p.rep, function (x) { return x.rep; }); return ds && mkQ(11, "बातचीत में पहला व्यक्ति कहता है — \u201C" + p.ask + "\u201D — दूसरे का सबसे सही जवाब चुनिए", p.rep, ds); };

/* ---- मुख्य-धारा: 2,150 वाक्यों पर भाषा-वार ROT घूमते हुए ---- */
var ROT = CFG[CODE].rot;
var BANK = [], typeCount = {};
function push(Q) { if (!Q) return false; BANK.push(Q); typeCount[Q.typ] = (typeCount[Q.typ] || 0) + 1; return true; }
for (var i = 0; i < ALL.length; i++) {
  var ok = false;
  for (var r2 = 0; r2 < ROT.length && !ok; r2++) ok = push(B[ROT[(i + r2) % ROT.length]](ALL[i]));
  if (!ok) { console.log("⛔ कोई प्रकार नहीं बना: " + ALL[i].en); process.exit(1); }
}
var au13 = 0, au14 = 0;
for (i = 3; i < ALL.length && (au13 < 150 || au14 < 150); i += 7) {
  if (au13 <= au14 && au13 < 150) { if (push(B[13](ALL[i]))) au13++; }
  else if (au14 < 150) { if (push(B[14](ALL[i]))) au14++; }
}
if (au13 < 150 || au14 < 150) { console.log("⛔ सुनो-प्रश्न कम: " + au13 + "/" + au14); process.exit(1); }
/* v2.0 बोलो-धारा: T15 ×120 + T16 ×120 (2,150 में से बिखरे, सुनो-प्रश्नों से अलग वाक्य) + T17 = सब listen-जोड़े + dialog-जोड़े */
var sp15 = 0, sp16 = 0, spSeen = {};
for (i = 5; i < ALL.length && (sp15 < 120 || sp16 < 120); i += 9) {
  if (spSeen[ALL[i].en]) continue; spSeen[ALL[i].en] = 1;
  var ws15 = ALL[i].en.split(/\s+/).length; if (CODE !== "ja" && CODE !== "th" && CODE !== "am" && CODE !== "bo" && CODE !== "km" && CODE !== "lo" && CODE !== "my" && CODE !== "nan" && CODE !== "yue" && (ws15 < 3 || ws15 > 10)) continue; /* 10-Sep merge-दौर: space-रहित लिपियों की word-count-छूट (SE-चक्र से) */
  if (sp15 <= sp16 && sp15 < 120) { if (push(B[15](ALL[i]))) sp15++; }
  else if (sp16 < 120) { if (push(B[16](ALL[i]))) sp16++; }
}
if (sp15 < 100 || sp16 < 100) { console.log("⛔ बोलो-प्रश्न कम: " + sp15 + "/" + sp16); process.exit(1); }
for (i = 0; i < LIS.length; i++) push(B[17](LIS[i]));
for (i = 0; i < DLG.length; i++) push(B[17]({ q: DLG[i].ask, a: DLG[i].rep }));
for (i = 0; i < TW.length; i++) if (!push(B[i % 2 === 0 ? 8 : 9](TW[i])) && !push(B[i % 2 === 0 ? 9 : 8](TW[i]))) { console.log("⛔ tw-प्रश्न fail"); process.exit(1); }
for (i = 0; i < LIS.length; i++) if (!push(B[10](LIS[i]))) { console.log("⛔ listen-प्रश्न fail"); process.exit(1); }
for (i = 0; i < DLG.length; i++) if (!push(B[11](DLG[i]))) { console.log("⛔ dialog-प्रश्न fail"); process.exit(1); }

/* ---- अंतिम गूँथाई: बैंक-क्रम में भी प्रकार घूमता चले ---- */
var byType = {}; BANK.forEach(function (Q) { (byType[Q.typ] = byType[Q.typ] || []).push(Q); });
var order = [1, 13, 15, 8, 3, 10, 16, 5, 14, 17, 2, 9, 6, 11, 4, 7, 12], MIX = [], left = BANK.length;
while (left > 0) for (var o2 = 0; o2 < order.length; o2++) { var arr = byType[order[o2]]; if (arr && arr.length) { MIX.push(arr.shift()); left--; } }
BANK = MIX;
/* server-इंजन हर प्रश्न में स्थायी id माँगता है (attempt की qids-सूची इसी से) */
BANK.forEach(function (Q, qi) { Q.id = CODE + "-" + ("0000" + (qi + 1)).slice(-4); });

/* ---- नाप: लंबाई-पक्षपात + विविधता ---- */
var biased = 0, eligible = 0;
BANK.forEach(function (Q) {
  var mx = -1, mi = -1, tie = false;
  if (!Q.o.length) return; /* बोलो-प्रश्न: विकल्प नहीं */
  Q.o.forEach(function (t2, ix) { if (t2.length > mx) { mx = t2.length; mi = ix; tie = false; } else if (t2.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
var rate = Math.round(biased * 1000 / eligible) / 10;
var tc = []; for (var t3 = 1; t3 <= 17; t3++) if (typeCount[t3]) tc.push("T" + t3 + ":" + typeCount[t3]);
console.log("(" + CODE + ") बैंक: " + BANK.length + " प्रश्न · प्रकार [" + tc.join(" ") + "]");
console.log("अकेला-सबसे-लंबा=सही दर: " + rate + "% (खिड़की 15-35%)");
if (rate < 15 || rate > 35) { console.log("⛔ लंबाई-पक्षपात"); process.exit(1); }
var NEED = ROT.concat([8, 9, 10, 11, 13, 14, 15, 16, 17]);
NEED.forEach(function (t4) { if (!typeCount[t4] || typeCount[t4] < 20) { console.log("⛔ प्रकार-" + t4 + " बहुत कम (" + (typeCount[t4] || 0) + ")"); process.exit(1); } });

if (!fs.existsSync("functions")) fs.mkdirSync("functions");
var out = "/* functions/" + CODE + "_bank.js — ACS Certificate in Spoken " + CODE.toUpperCase() + " server-परीक्षा बैंक v2.0 (40/40/40: सुनो T13-14 · बोलो T15-17 · पढ़ो T1-12)\n" +
  "   " + BANK.length + " प्रश्न · प्रकार घूमते क्रम में (मशीन-गिनती dev_kkb_quiz_check से)\n" +
  "   GitHub पर कभी नहीं — सिर्फ़ functions/ में (eng_bank.js-नियम)। स्रोत: frozen corpus (" + L + ") ·\n" +
  "   regen: node generator/build_kkb_bank.js " + CODE + " · लंबाई-संतुलित (v5.2 होल-मुक्त)। */\n" +
  "module.exports = " + JSON.stringify(BANK) + ";\n";
var OUTF = (CODE === "en" ? "eng" : CODE) + "_bank.js"; /* en → eng_bank.js (server-नाम यथावत) */
fs.writeFileSync("functions/" + OUTF, out);
console.log("✅ functions/" + OUTF + " लिखा (" + Math.round(out.length / 1024) + " KB)");
