/* ============================================================
   build_specials.js — one-off विशेष पेजों का generator (परत-4)
   v8.0 · 31-Aug-2026 (KKB मास्टर-प्रतिकृति: en+7 भाषाएँ (ar/fr/es/ja/ko/de/ru) के 90-दिन एकीकृत कोर्स-पेज
   KKB2_LANGS से बनते हैं — kkb2.css/kkb2.js + भाषा-वार L1+L2 data; KKB_LANGS की इन 8 प्रविष्टियों का L1-पेज
   निर्माण बंद (KKB2_CODES-छलनी) — पुरानी redirect-पर्चियाँ यथावत। english पेज अब generator-मुहर में (30-Aug
   का हाथ-सुधार यहीं समाहित — generator-पिछड़ाव होल बंद)। अगला-स्तर कड़ी v6.1-ग: ja=JFT-Basic/JLPT · ko=TOPIK ·
   de=Goethe · fr=DELF · es=DELE · ru=TORFL · ar=ईमानदार-पंक्ति · en=IELTS/Cambridge — सब 31-Aug वेब-जाँच से)
   v1.10 · 26-Aug-2026 (काम की भाषा: + इंडोनेशियाई /courses/hi/bhasha/indonesian/ — KKB_LANGS में आठवीं पंक्ति; video-call टेस्ट)
   v6.6 · 27-Aug-2026 (काम की भाषा: + तागालोग /courses/hi/bhasha/tagalog/ — KKB_LANGS में चौवनवीं पंक्ति; Devanagari-उच्चारण-रूप; रजिस्टर-सीमा दर्ज — "po"/"kayo" कहीं इस्तेमाल नहीं हुआ, native-speaker-पुष्टि में प्राथमिकता)
   v6.8 · 27-Aug-2026 (काम की भाषा: + सिबुआनो /courses/hi/bhasha/cebuano/ — KKB_LANGS में छप्पनवीं पंक्ति; Devanagari-उच्चारण-रूप; तागालोग-सगी-भाषा जाँच — 2.6% ओवरलैप, पैन-फ़िलिपिनो साझा-शब्द)
   v6.9 · 27-Aug-2026 (काम की भाषा: + मंगोलियाई /courses/hi/bhasha/mongolian/ — KKB_LANGS में सत्तावनवीं पंक्ति; Devanagari-उच्चारण-रूप; Cyrillic-दूषण सीख दर्ज — तीसरे प्रयास में सफल शून्य-Cyrillic; रजिस्टर-ग़लती 4 वाक्यों में सुधारी)
   v7.0 · 27-Aug-2026 (काम की भाषा: + तिब्बती /courses/hi/bhasha/tibetan/ — KKB_LANGS में अट्ठावनवीं पंक्ति; Devanagari-उच्चारण-रूप; रजिस्टर-ग़लती 4 वाक्यों में सुधारी; 11-भाषा दक्षिण-पूर्व/पूर्व एशिया शृंखला पूर्ण)
   v7.1 · 28-Aug-2026 (काम की भाषा: + योरूबा /courses/hi/bhasha/yoruba/ — KKB_LANGS में उनसठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका-शृंखला शुरू (1/14); रजिस्टर-नोट दर्ज)
   v7.2 · 28-Aug-2026 (काम की भाषा: + इग्बो /courses/hi/bhasha/igbo/ — KKB_LANGS में साठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 2/14; danda/period मिश्रण + अतिरिक्त-दिन बग सुधारे)
   v7.3 · 28-Aug-2026 (काम की भाषा: + ज़ुलु /courses/hi/bhasha/zulu/ — KKB_LANGS में इकसठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 3/14)
   v7.4 · 28-Aug-2026 (काम की भाषा: + षोसा /courses/hi/bhasha/xhosa/ — KKB_LANGS में बासठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 4/14; ज़ुलु-सगी-भाषा जाँच 7.8%, स्वाभाविक)
   v7.5 · 28-Aug-2026 (काम की भाषा: + अम्हारिक /courses/hi/bhasha/amharic/ — KKB_LANGS में तिरसठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 5/14)
   v7.6 · 28-Aug-2026 (काम की भाषा: + ओरोमो /courses/hi/bhasha/oromo/ — KKB_LANGS में चौंसठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 6/14; लंबी-ध्वनि सन्निकटन-नोट दर्ज)
   v7.7 · 28-Aug-2026 (काम की भाषा: + सोमाली /courses/hi/bhasha/somali/ — KKB_LANGS में पैंसठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 7/14; दोहराव-सुधार सीख दर्ज)
   v7.8 · 28-Aug-2026 (काम की भाषा: + मालागासी /courses/hi/bhasha/malagasy/ — KKB_LANGS में छियासठवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़्रीका 8/14; बड़ी पुनर्निर्माण-सीख दर्ज — पूर्ण फ़ाइल दोबारा लिखी गई)
   v6.7 · 27-Aug-2026 (काम की भाषा: + सुंडानी /courses/hi/bhasha/sundanese/ — KKB_LANGS में पचपनवीं पंक्ति; Devanagari-उच्चारण-रूप; इंडोनेशियाई+मलय दोनों से क्रॉस-चेक — 0.2% ओवरलैप; रजिस्टर-ग़लती 6 वाक्यों में सुधारी)
   v6.5 · 27-Aug-2026 (काम की भाषा: + मलय /courses/hi/bhasha/malay/ — KKB_LANGS में तिरपनवीं पंक्ति; Devanagari-उच्चारण-रूप; इंडोनेशियाई-सगी-भाषा जाँच — 0% ओवरलैप; रजिस्टर-ग़लती 6 वाक्यों में पकड़ी व सुधारी)
   v6.4 · 27-Aug-2026 (काम की भाषा: + लाओ /courses/hi/bhasha/lao/ — KKB_LANGS में बावनवीं पंक्ति; Devanagari-उच्चारण-रूप; थाई-सगी-भाषा जाँच — 8.8% ओवरलैप, अवधी-भोजपुरी स्तर, स्वाभाविक)
   v6.3 · 27-Aug-2026 (काम की भाषा: + खमेर /courses/hi/bhasha/khmer/ — KKB_LANGS में इक्यावनवीं पंक्ति; Devanagari-उच्चारण-रूप; रजिस्टर-अनिश्चितता दर्ज (नियक् का सम्मान-स्तर))
   v6.2 · 27-Aug-2026 (काम की भाषा: + बर्मी /courses/hi/bhasha/burmese/ — KKB_LANGS में पचासवीं पंक्ति; Devanagari-उच्चारण-रूप)
   v6.1 · 27-Aug-2026 (काम की भाषा: + थाई /courses/hi/bhasha/thai/ — KKB_LANGS में उनचासवीं पंक्ति; Devanagari-उच्चारण-रूप)
   v6.0 · 27-Aug-2026 (काम की भाषा: + वियतनामी /courses/hi/bhasha/vietnamese/ — KKB_LANGS में अड़तालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; दक्षिण-पूर्व एशिया शृंखला शुरू)
   v5.9 · 27-Aug-2026 (काम की भाषा: + दारी /courses/hi/bhasha/dari/ — KKB_LANGS में सैंतालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; अफ़ग़ान-फ़ारसी, शृंखला की सबसे कठिन सगी-भाषा-चुनौती (मौजूदा फ़ारसी से); "-अस्त-" शास्त्रीय-क्रिया-रूप एंकर से भेद — क्रॉस-चेक में सिर्फ़ 1.6% ओवरलैप)
   v5.8 · 27-Aug-2026 (काम की भाषा: + बलूची /courses/hi/bhasha/balochi/ — KKB_LANGS में छियालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; ईरानी भाषा-परिवार उत्तर-पश्चिमी शाखा; रजिस्टर-जाँच में 31 वाक्यों की असली डिज़ाइन-चूक (तो/तई डिफ़ॉल्ट बना रहना) पकड़ी व शुमा/शुमे में सुधारी)
   v5.7 · 27-Aug-2026 (काम की भाषा: + पश्तो /courses/hi/bhasha/pashto/ — KKB_LANGS में पैंतालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; ईरानी भाषा-परिवार, अफ़ग़ानिस्तान/पाकिस्तान; रजिस्टर-जाँच में "ता" के बहु-अर्थ (सर्वनाम/postposition) से 40 false-positive मिले, 2 असली-लीक पकड़ीं व सुधारीं)
   v5.6 · 27-Aug-2026 (काम की भाषा: + सिंहली /courses/hi/bhasha/sinhala/ — KKB_LANGS में चवालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; insular-इंडो-आर्यन, श्रीलंका; निर्माण में एक Sinhala-लिपि-मिलावट (208/500) पकड़ी व शून्य से सुधारी)
   v5.5 · 27-Aug-2026 (काम की भाषा: + मगही /courses/hi/bhasha/magahi/ — KKB_LANGS में तैंतालीसवीं पंक्ति; देवनागरी-मूल; भोजपुरी/मैथिली-त्रयी-भेद "छी" कोपुला से बनाए रखा; कोई CSS/इंजन-बदलाव नहीं)
   v5.4 · 27-Aug-2026 (काम की भाषा: + अवधी /courses/hi/bhasha/awadhi/ — KKB_LANGS में बयालीसवीं पंक्ति; देवनागरी-मूल, कोई CSS/इंजन-बदलाव नहीं)
   v5.3 · 27-Aug-2026 (काम की भाषा: + बोडो /courses/hi/bhasha/bodo/ — KKB_LANGS में इकतालीसवीं पंक्ति; Devanagari-उच्चारण-रूप; चीनी-तिब्बती/बोडो-गारो परिवार — शृंखला की सबसे ऊँची अनिश्चितता, संथाली/मणिपुरी से भी ज़्यादा; सम्मान-सर्वनाम-भेद बिल्कुल नहीं दिया जा सका)
   v5.2 · 27-Aug-2026 (काम की भाषा: + उड़िया /courses/hi/bhasha/odia/ — KKB_LANGS में चालीसवीं पंक्ति; Devanagari-उच्चारण-रूप (असली Odia-लिपि नहीं, Founder-फ़ैसला); IVR-मॉडल; कोई CSS/इंजन-बदलाव नहीं)
   v5.1 · 27-Aug-2026 (काम की भाषा: + मलयालम /courses/hi/bhasha/malayalam/ — KKB_LANGS में उनतालीसवीं पंक्ति; Devanagari-उच्चारण-रूप, द्रविड़-परिवार; IVR-मॉडल; कोई CSS/इंजन-बदलाव नहीं)
   v5.0 · 27-Aug-2026 (काम की भाषा: + उर्दू /courses/hi/bhasha/urdu/ — KKB_LANGS में अड़तीसवीं पंक्ति; Devanagari-चुनाव (नस्तालीक़ नहीं, Founder-फ़ैसला); पहचान लिपि से नहीं शब्दावली-रजिस्टर (फ़ारसी-अरबी शब्द) से बनी रखी)
   v4.9 · 27-Aug-2026 (काम की भाषा: + कुमाऊंनी /courses/hi/bhasha/kumaoni/ — KKB_LANGS में सैंतीसवीं पंक्ति; देवनागरी-मूल; गढ़वाली-सगी-बहन-भेद जान-बूझकर बनाए रखा, 72/500 स्वाभाविक-ओवरलैप दर्ज)
   v4.8 · 27-Aug-2026 (काम की भाषा: + गढ़वाली /courses/hi/bhasha/garhwali/ — KKB_LANGS में छत्तीसवीं पंक्ति; देवनागरी-मूल, कोई CSS/इंजन-बदलाव नहीं)
   v4.7 · 27-Aug-2026 (काम की भाषा: + रूसी /courses/hi/bhasha/russian/ — KKB_LANGS में पैंतीसवीं पंक्ति; Devanagari-उच्चारण-रूप, Cyrillic नहीं; विदेशी-भाषा पर it[0]==it[1] पैटर्न पहली बार लागू)
   v4.6 · 27-Aug-2026 (काम की भाषा: + मणिपुरी /courses/hi/bhasha/manipuri/ — KKB_LANGS में चौंतीसवीं पंक्ति; Devanagari-चुनाव (Meitei Mayek/बांग्ला नहीं, Founder-फ़ैसला); चीनी-तिब्बती परिवार — संथाली-स्तर ऊँची-अनिश्चितता; सम्मान-सर्वनाम-भेद बाक़ी कोर्सों जैसा नहीं दिया जा सका)
   v4.5 · 27-Aug-2026 (काम की भाषा: + डोगरी /courses/hi/bhasha/dogri/ — KKB_LANGS में तैंतीसवीं पंक्ति; देवनागरी-मूल, कोई CSS/इंजन-बदलाव नहीं)
   v4.4 · 27-Aug-2026 (काम की भाषा: + सिंधी /courses/hi/bhasha/sindhi/ — KKB_LANGS में बत्तीसवीं पंक्ति; Devanagari-चुनाव (फ़ारसी-अरबी नहीं, Founder-फ़ैसला); निर्माण में एक Arabic-लिपि-मिलावट पकड़ी व शून्य से सुधारी)
   v4.3 · 27-Aug-2026 (काम की भाषा: + कोंकणी /courses/hi/bhasha/konkani/ — KKB_LANGS में इकतीसवीं पंक्ति; देवनागरी गोवा की आधिकारिक लिपि, IVR-मॉडल; कोई CSS/इंजन-बदलाव नहीं)
   v4.2 · 27-Aug-2026 (काम की भाषा: + नेपाली /courses/hi/bhasha/nepali/ — KKB_LANGS में तीसवीं पंक्ति; देवनागरी-मूल राष्ट्रभाषा, IVR-मॉडल; कोई CSS/इंजन-बदलाव नहीं)
   v4.1 · 26-Aug-2026 (काम की भाषा: + कश्मीरी /courses/hi/bhasha/kashmiri/ — KKB_LANGS में उनतीसवीं पंक्ति; Devanagari-चुनाव (नस्तालीक़ नहीं, Founder-फ़ैसला); दार्दिक-शाखा — मध्यम-अनिश्चितता स्तर)
   v4.0 · 26-Aug-2026 (काम की भाषा: + संथाली /courses/hi/bhasha/santali/ — KKB_LANGS में अट्ठाईसवीं पंक्ति; Devanagari-चुनाव (Ol Chiki नहीं, फ़ॉन्ट-जोखिम कारण); मुंडा-परिवार — ऊँचे-अनिश्चितता स्तर, अन्य भाषाओं से ज़्यादा सावधानी)
   v3.9 · 26-Aug-2026 (काम की भाषा: + मारवाड़ी /courses/hi/bhasha/marwari/ — KKB_LANGS में सत्ताईसवीं पंक्ति; देवनागरी-मूल, कोई CSS/इंजन-बदलाव नहीं)
   v3.8 · 26-Aug-2026 (काम की भाषा: + हरियाणवी /courses/hi/bhasha/haryanvi/ — KKB_LANGS में छब्बीसवीं पंक्ति; देवनागरी-मूल, कोई CSS/इंजन-बदलाव नहीं)
   v3.7 · 26-Aug-2026 (काम की भाषा: + मैथिली /courses/hi/bhasha/maithili/ — KKB_LANGS में पच्चीसवीं पंक्ति; देवनागरी-मूल — मराठी/भोजपुरी/छत्तीसगढ़ी जैसा, कोई CSS/इंजन-बदलाव नहीं)
   v3.6 · 26-Aug-2026 (काम की भाषा: + असमिया /courses/hi/bhasha/assamese/ — KKB_LANGS में चौबीसवीं पंक्ति; script "assamese" kkb.css में जुड़ा — बांग्ला-लिपि-परिवार, अलग भाषा)
   v3.5 · 26-Aug-2026 (काम की भाषा: + छत्तीसगढ़ी /courses/hi/bhasha/chhattisgarhi/ — KKB_LANGS में तेईसवीं पंक्ति; देवनागरी-मूल — मराठी/भोजपुरी जैसा, कोई CSS/इंजन-बदलाव नहीं)
   v3.4 · 26-Aug-2026 (काम की भाषा: + पंजाबी /courses/hi/bhasha/punjabi/ — KKB_LANGS में बाईसवीं पंक्ति; script "gurmukhi" kkb.css में जुड़ा)
   v3.3 · 26-Aug-2026 (काम की भाषा: + भोजपुरी /courses/hi/bhasha/bhojpuri/ — KKB_LANGS में इक्कीसवीं पंक्ति; देवनागरी-मूल — मराठी जैसा, कोई CSS/इंजन-बदलाव नहीं)
   v3.2 · 26-Aug-2026 (काम की भाषा: + मीनान चीनी /courses/hi/bhasha/minnan/ — KKB_LANGS में बीसवीं पंक्ति; script "nan" — char-split kkb.js में जुड़ा, kkb.css में Traditional-Chinese font-नियम)
   v3.1 · 26-Aug-2026 (काम की भाषा: + हाउसा /courses/hi/bhasha/hausa/ — KKB_LANGS में उन्नीसवीं पंक्ति; latin script, कोई CSS/इंजन-बदलाव नहीं)
   v3.0 · 26-Aug-2026 (काम की भाषा: + फ़ारसी /courses/hi/bhasha/persian/ — KKB_LANGS में अठारहवीं पंक्ति; script "persian" — RTL kkb.js में जुड़ा, kkb.css में font-नियम)
   v2.9 · 26-Aug-2026 (काम की भाषा: + जावानीज़ /courses/hi/bhasha/javanese/ — KKB_LANGS में सत्रहवीं पंक्ति; latin script, कोई CSS/इंजन-बदलाव नहीं)
   v2.8 · 26-Aug-2026 (काम की भाषा: + गुजराती /courses/hi/bhasha/gujarati/ — KKB_LANGS में सोलहवीं पंक्ति; script "gujarati" kkb.css में जुड़ा)
   v2.7 · 26-Aug-2026 (काम की भाषा: + स्वाहिली /courses/hi/bhasha/swahili/ — KKB_LANGS में पंद्रहवीं पंक्ति; latin script, कोई CSS/इंजन-बदलाव नहीं)
   v2.6 · 26-Aug-2026 (काम की भाषा: + कोरियाई /courses/hi/bhasha/korean/ — KKB_LANGS में चौदहवीं पंक्ति; script "korean" kkb.js/kkb.css में जुड़ा)
   v2.5 · 26-Aug-2026 (काम की भाषा: + तुर्की /courses/hi/bhasha/turkish/ — KKB_LANGS में तेरहवीं पंक्ति; latin script, कोई CSS/इंजन-बदलाव नहीं)
   v2.4 · 26-Aug-2026 (काम की भाषा: + तमिल /courses/hi/bhasha/tamil/ — KKB_LANGS में बारहवीं पंक्ति; script "tamil" kkb.css में जुड़ा)
   v2.3 · 26-Aug-2026 (काम की भाषा: + तेलुगु /courses/hi/bhasha/telugu/ — KKB_LANGS में ग्यारहवीं पंक्ति; script "telugu" kkb.css में जुड़ा, kkb.js अछूता)
   v2.2 · 26-Aug-2026 (काम की भाषा: + मराठी /courses/hi/bhasha/marathi/ — KKB_LANGS में दसवीं पंक्ति; it[0]==it[1] क्योंकि मराठी देवनागरी में ही है)
   v2.1 · 26-Aug-2026 (काम की भाषा: + जापानी /courses/hi/bhasha/japanese/ — KKB_LANGS में नौवीं पंक्ति; script "japanese" kkb.js/kkb.css में जुड़ा)
   v2.0 · 26-Aug-2026 (काम की भाषा: + इंडोनेशियाई /courses/hi/bhasha/indonesian/ — KKB_LANGS में आठवीं पंक्ति)
   v1.9 · 26-Aug-2026 (काम की भाषा: + पुर्तगाली /courses/hi/bhasha/portuguese/ — KKB_LANGS में सातवीं पंक्ति; video-call टेस्ट, कोई CSS-नियम नहीं चाहिए)
   v1.8 · 26-Aug-2026 (काम की भाषा: + बांग्ला /courses/hi/bhasha/bengali/ — KKB_LANGS में छठी पंक्ति; IVR-मॉडल, redirect नहीं)
   v1.7 · 26-Aug-2026 (काम की भाषा: bhasha-परिवार-folder — पाँचों कोर्स /courses/hi/bhasha/<भाषा>/ पर; पुराने पतों पर redirect-पर्ची kkbRedirect)
   v1.6 · 26-Aug-2026 (काम की भाषा: + अरबी/MENA /courses/hi/kaam-ki-bhasha-arabic/ — KKB_LANGS में पाँचवीं पंक्ति; RTL kkb.js/kkb.css में जुड़ा)
   v1.5 · 26-Aug-2026 (काम की भाषा: + Spanish /courses/hi/kaam-ki-bhasha-spanish/ — KKB_LANGS में चौथी पंक्ति; testStep2/check1 चीनी-मॉडल पर)
   v1.4 · 26-Aug-2026 (काम की भाषा: + चीनी/Mandarin /courses/hi/kaam-ki-bhasha-mandarin/ — KKB_LANGS में तीसरी पंक्ति)
   v1.3 · 26-Aug-2026 (काम की भाषा: KKB_LANGS — English /courses/hi/kaam-ki-bhasha/ + कन्नड /courses/hi/kaam-ki-bhasha-kannada/; एक इंजन kkb.js, भाषा-वार data; उप-folder हेतु mkdir)
   v1.2 · 20-Jul-2026 (नींव-दौर: aptitude-test पन्ने में पूरा-टेस्ट session-द्वार + apt-session.js)\n   v1.1 · 20-Jul-2026 (काम-12: + /aptitude-test.html — अभिरुचि-टेस्ट मुफ़्त-झलक)
   v1.0 · 18-Jul-2026 (काम-9+; + रिज़्यूमे-फ़ोटो: device-local canvas-resize)
   ------------------------------------------------------------
   लोहे का नियम: कोई पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत: /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट, home वाला universal
          ढाँचा: navbar + slide-menu(10) + footer + login + मूल-भाषा-टैग)।
   पहला पेज: /career-kit.html (करियर-किट tool)। असेट: /assets/career-kit.css,
             /assets/career-kit.js (परत-1 साझा)।
   चलाना: repo-रूट से → node generator/build_specials.js
   check-robot: दिखने वाले content में square bracket नहीं · font<16px नहीं।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

/* ---- मास्टर टेम्पलेट का 10-menu (links.js से — एकमात्र घर) ---- */
function loadMenu() {
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';
const GEN_NOTE = "<!-- ⚠️ generator से बना (build_specials.js v1.1) — हाथ से न बदलें। स्रोत: _TEMPLATE.html + अपने-अपने assets -->";

/* ---- check-robot ---- */
function visibleText(html) {
  return html.replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function check(name, content) {
  const vis = visibleText(content), holes = [];
  if (/[\[\]]/.test(vis)) holes.push("square bracket दिखने वाले text में");
  const small = content.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  small.forEach(m => { const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) holes.push("font " + n + "px"); });
  if (holes.length) throw new Error("❌ " + name + " check-robot fail: " + holes.join(" · "));
}

/* ---- वर्ग-6 भाषा-फ़िल्टर (सख़्त) — सिर्फ़ langStrict पेजों पर ----
   फेल लाइन पर पेज बनता ही नहीं; कोई लाइन कभी हटाई/बदली नहीं जाती। */
const LANG_OK = ["लूर","ACS","Razorpay","OTP","escrow","QR","PDF","GST","CIN","WhatsApp","Green","Tick","RM","ZM","HQ","ISO","DPDP","UNCITRAL","POCSO","POSH","Firebase","Firestore","NCERT"];
const LANG_HARD = {"प्रावधान":"नियम","अधिनियम":"कानून","तत्पश्चात":"उसके बाद","यथाशीघ्र":"जल्दी","उपरोक्त":"ऊपर बताई","निम्नलिखित":"नीचे दी","सुनिश्चित":"पक्का","अनुपालन":"पालन","व्यपगत":"ख़त्म","देय":"चुकाना","प्रतिपूर्ति":"वापसी","अध्यधीन":"के अधीन","तदनुसार":"उसी तरह","प्रयोजन":"मक़सद","समादेश":"आदेश"};
function langLines(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/(p|li|h1|h2|h3|h4|h5|div|section|summary|b|label|td|th)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .split("\n").map(s => s.replace(/\s+/g, " ").trim()).filter(Boolean);
}
function langLineHoles(line) {
  const holes = [], words = line.split(/\s+/).filter(Boolean);
  line.split(/[।?!]/).forEach(s => { const w = s.trim().split(/\s+/).filter(Boolean); if (w.length > 20) holes.push("लंबा वाक्य (" + w.length + " शब्द)"); });
  (line.match(/[A-Za-z][A-Za-z.\-]{1,}/g) || []).forEach(r => {
    if (LANG_OK.includes(r)) return;
    const inB = new RegExp("\\([^)]*" + r.replace(/[.\-]/g, "\\$&") + "[^)]*\\)").test(line);
    if (!inB) holes.push("नंगा अंग्रेज़ी शब्द '" + r + "' (देवनागरी पहले, फिर गोल कोष्ठक में)");
  });
  Object.keys(LANG_HARD).forEach(h => { if (line.includes(h)) holes.push("भारी शब्द '" + h + "' → '" + LANG_HARD[h] + "'"); });
  if ((line.match(/।/g) || []).length >= 2 || words.length > 30) holes.push("एक लाइन में बहुत बातें — अलग करो");
  return holes;
}
function langCheckStrict(name, html) {
  const fails = [];
  langLines(html).forEach(l => { const h = langLineHoles(l); if (h.length) fails.push("   • “" + l + "”\n     → " + h.join("\n     → ")); });
  if (fails.length) throw new Error("❌ " + name + " वर्ग-6 भाषा-फ़िल्टर fail (इन लाइनों को आसान करो):\n" + fails.join("\n"));
}

/* ---- एक विशेष पेज बनाना ---- */
function buildSpecial(spec) {
  check(spec.out, spec.content);
  if (spec.langStrict) langCheckStrict(spec.out, spec.content);
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");
  let page = TPL.slice(0, a + S.length) + "\n" + spec.content + "\n" + TPL.slice(b);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + spec.title + "</title>\n" +
    '<meta name="description" content="' + spec.desc + '">\n' +
    '<meta name="robots" content="' + (spec.robots || "index, follow") + '">\n' +
    '<link rel="canonical" href="https://acslearn.com/' + spec.out + '">' +
    /* 13-Sep (ऑडिट/SEO): Open Graph + JSON-LD — हर विशेष-पेज पर (share-preview व rich-result) */
    '\n<meta property="og:type" content="website">' +
    '\n<meta property="og:url" content="https://acslearn.com/' + spec.out.replace(/index\.html$/, "") + '">' +
    '\n<meta property="og:title" content="' + spec.title.replace(/"/g, "&quot;") + '">' +
    '\n<meta property="og:description" content="' + spec.desc.replace(/"/g, "&quot;") + '">' +
    '\n<meta property="og:image" content="https://acslearn.com/logo.png">' +
    '\n<meta property="og:locale" content="hi_IN">' +
    '\n<meta name="twitter:card" content="summary">' +
    (spec.jsonld ? '\n<script type="application/ld+json">' + JSON.stringify(spec.jsonld) + '</scr' + 'ipt>' : ''));
  spec.head.forEach(h => { page = page.replace("</head>", h + "\n</head>"); });
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + "\n" + spec.foot.join("\n") + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  fs.mkdirSync(path.dirname(path.join(ROOT, spec.out)), { recursive: true }); /* v1.3: उप-folder पेज */
  fs.writeFileSync(path.join(ROOT, spec.out), page, "utf8");
  console.log("✅ विशेष पेज → /" + spec.out);
}

/* ===================== career-kit content ===================== */
const CAREER_CONTENT =
'<h1 style="font-size:26px;margin:14px 0 6px">💼 करियर-किट (Career Kit)</h1>' +
'<p class="ck-lead">नौकरी की तैयारी के तीन औज़ार — एक ही जगह, बिलकुल मुफ़्त। सब कुछ आपके अपने फ़ोन में सुरक्षित रहता है (कोई server पर नहीं जाता — आपकी निजता सुरक्षित)।</p>' +
'<div class="ck-tabs">' +
'<button id="ck-tab-resume" class="on" onclick="ckShow(\'resume\')">📄 रिज़्यूमे बनाएँ</button>' +
'<button id="ck-tab-prep" onclick="ckShow(\'prep\')">🎤 इंटरव्यू-तैयारी</button>' +
'<button id="ck-tab-mock" onclick="ckShow(\'mock\')">🧑‍💼 मॉक-अभ्यास</button>' +
'</div>' +

'<section id="ck-sec-resume"><div class="ck-card"><h2>📄 अपना रिज़्यूमे बनाएँ</h2>' +
'<p>नीचे अपनी जानकारी भरें और "रिज़्यूमे बनाएँ" दबाएँ — साफ़-सुथरा एक-पन्ने का रिज़्यूमे बनेगा, जिसे आप प्रिंट या PDF के रूप में सहेज सकते हैं।</p>' +
'<label>फ़ोटो (पासपोर्ट-आकार, वैकल्पिक)</label>' +
'<input id="ck_photo" type="file" accept="image/*" onchange="ckPickPhoto(this)">' +
'<div id="ck-photo-prev"></div>' +
'<div class="ck-note">📸 साफ़ पासपोर्ट-आकार फ़ोटो चुनें (सिर्फ़ चेहरा, सादा पृष्ठभूमि)। यह फ़ोटो आपके फ़ोन में ही रहती है — कहीं नहीं भेजी जाती। रिज़्यूमे में यह ऊपर-दाएँ छपेगी।</div>' +
'<div class="ck-row"><div><label>पूरा नाम</label><input id="ck_name" placeholder="जैसे: रामबालक कुमार"></div>' +
'<div><label>मोबाइल नंबर</label><input id="ck_phone" placeholder="जैसे: 98XXXXXXXX"></div></div>' +
'<div class="ck-row"><div><label>ईमेल (हो तो)</label><input id="ck_email" placeholder="जैसे: name@gmail.com"></div>' +
'<div><label>शहर / जिला · राज्य</label><input id="ck_place" placeholder="जैसे: चौथम, खगड़िया · बिहार"></div></div>' +
'<label>उद्देश्य (एक-दो पंक्ति में — आप कौन-सा काम चाहते हैं)</label>' +
'<textarea id="ck_obj" placeholder="जैसे: मैं एक मेहनती वेल्डर हूँ और किसी अच्छी कंपनी या वर्कशॉप में अपना हुनर दिखाना चाहता हूँ।"></textarea>' +
'<label>हुनर / लूर (कॉमा से अलग करें)</label>' +
'<input id="ck_skills" placeholder="जैसे: आर्क वेल्डिंग, गैस-कटिंग, माप-पढ़ाई, सुरक्षा-नियम">' +
'<label>शिक्षा</label><textarea id="ck_edu" placeholder="जैसे: मैट्रिक (10वीं) — 2022 · ITI (वेल्डर) — 2024"></textarea>' +
'<label>प्रशिक्षण व प्रमाण पत्र (ACS वाले भी लिखें)</label>' +
'<textarea id="ck_cert" placeholder="जैसे: ACS वेल्डिंग-कोर्स (Aptitude व प्रशिक्षण-पूर्णता प्रमाण पत्र)"></textarea>' +
'<label>कार्य-अनुभव (हो तो)</label>' +
'<textarea id="ck_exp" placeholder="जैसे: गाँव की वर्कशॉप में 1 साल सहायक-वेल्डर का काम — गेट, ग्रिल व मरम्मत।"></textarea>' +
'<div class="ck-row"><div><label>भाषाएँ</label><input id="ck_lang" placeholder="जैसे: हिंदी, भोजपुरी, थोड़ी अंग्रेज़ी"></div>' +
'<div><label>रुचि (वैकल्पिक)</label><input id="ck_hobby" placeholder="जैसे: नई मशीन सीखना"></div></div>' +
'<div style="margin-top:14px"><button class="ck-btn green" onclick="ckMake()">📄 रिज़्यूमे बनाएँ / प्रिंट करें</button>' +
'<button class="ck-btn ghost" onclick="ckSave()">💾 सहेजें (इसी फ़ोन में)</button>' +
'<button class="ck-btn ghost" onclick="ckClear()">🗑️ मिटाएँ</button></div>' +
'<div class="ck-safe">💡 सुझाव: रिज़्यूमे एक पन्ने में रखें, सच लिखें, फ़ोन नंबर सही डालें। झूठा अनुभव कभी न लिखें — इंटरव्यू में पकड़ में आ जाता है।</div>' +
'</div></section>' +

'<section id="ck-sec-prep" class="ck-hide"><div class="ck-card"><h2>🎤 इंटरव्यू की तैयारी</h2>' +
'<p>नीचे आम सवाल और उनके जवाब देने का ढंग दिया है। हर सवाल खोलकर पढ़ें और अपने शब्दों में जवाब सोचें।</p>' +
'<div class="ck-note">🌟 जवाब देने का सरल तरीक़ा (चार क़दम): स्थिति बताओ → काम क्या था → आपने क्या कार्रवाई की → क्या नतीजा निकला। हमेशा एक छोटा असली उदाहरण दें।</div>' +
'<div class="ck-sub">सामान्य सवाल</div>' +
'<details><summary>अपने बारे में बताइए।</summary><p>अपना नाम, कहाँ से हैं, कौन-सा हुनर सीखा और क्या काम करना चाहते हैं — चार-पाँच वाक्य में। रटी हुई बात नहीं, सहज बोलें।</p></details>' +
'<details><summary>आप यही काम क्यों करना चाहते हैं?</summary><p>बताएँ कि इस काम में आपकी रुचि क्यों है और आपने इसके लिए क्या सीखा या मेहनत की। ईमानदारी से बोलें।</p></details>' +
'<details><summary>आपकी सबसे बड़ी ताक़त क्या है?</summary><p>एक असली ताक़त चुनें (जैसे मेहनत, समय की पाबंदी, जल्दी सीखना) और उसका एक छोटा उदाहरण दें।</p></details>' +
'<details><summary>आपकी कमज़ोरी क्या है?</summary><p>छोटी-सी सच्ची कमज़ोरी बताएँ और यह भी कि आप उसे सुधारने के लिए क्या कर रहे हैं। "कोई कमज़ोरी नहीं" कभी न कहें।</p></details>' +
'<details><summary>पाँच साल बाद ख़ुद को कहाँ देखते हैं?</summary><p>बताएँ कि आप अपने हुनर में और आगे बढ़ना चाहते हैं — जैसे कुशल कर्मी से प्रधान कर्मी, या आगे अपना काम शुरू करना।</p></details>' +
'<div class="ck-sub">हुनर वाले सवाल</div>' +
'<details><summary>अपने हुनर के बारे में बताइए।</summary><p>कौन-सा काम आप अच्छे से कर लेते हैं, कौन-कौन से औज़ार या मशीन चला लेते हैं, और कितने समय से कर रहे हैं।</p></details>' +
'<details><summary>कोई मुश्किल काम जो आपने पूरा किया?</summary><p>एक असली घटना बताएँ — क्या मुश्किल थी, आपने कैसे हल किया, और नतीजा क्या रहा।</p></details>' +
'<details><summary>सुरक्षा-नियम कैसे मानते हैं?</summary><p>बताएँ कि आप दस्ताने, चश्मा, जूते जैसी सुरक्षा हमेशा पहनते हैं और मशीन के नियम मानते हैं — मालिक को यह सुनकर भरोसा होता है।</p></details>' +
'<div class="ck-sub">व्यवहार वाले सवाल</div>' +
'<details><summary>टीम में मतभेद हो तो कैसे सुलझाते हैं?</summary><p>बताएँ कि आप शांति से बात करते हैं, दूसरे की भी सुनते हैं, और काम रुकने नहीं देते।</p></details>' +
'<details><summary>दबाव या जल्दी में कैसे काम करते हैं?</summary><p>बताएँ कि आप घबराते नहीं, पहले ज़रूरी काम करते हैं और सुरक्षा नहीं छोड़ते।</p></details>' +
'<div class="ck-safe">✅ करें: साफ़ कपड़े पहनें · समय से पहले पहुँचें · आँख मिलाकर धीरे-साफ़ बोलें · अंत में आप भी एक सवाल पूछें · जाते समय धन्यवाद कहें।<br>❌ न करें: झूठ न बोलें · मोबाइल बंद रखें · पुरानी जगह की बुराई न करें · घबराकर चुप न हों।</div>' +
'</div></section>' +

'<section id="ck-sec-mock" class="ck-hide"><div class="ck-card"><h2>🧑‍💼 मॉक-इंटरव्यू अभ्यास</h2>' +
'<p>यह अपने-आप अभ्यास है — एक सवाल आता है, आप ज़ोर से जवाब बोलकर अभ्यास करें, फिर अपनी जाँच-सूची भरें। बार-बार अभ्यास से घबराहट ख़त्म होती है।</p>' +
'<div class="ck-note">ℹ️ अभी यह अभ्यास आपकी अपनी जाँच के लिए है। आवाज़ या वीडियो-रिकॉर्डिंग और AI-आधारित जाँच (आपका जवाब कैसा रहा) अगले दौर में जुड़ेगी।</div>' +
'<label>श्रेणी चुनें</label>' +
'<select id="ck_cat"><option value="gen">सामान्य</option><option value="skill">हुनर वाले</option><option value="behav">व्यवहार वाले</option></select>' +
'<div style="margin-top:12px"><button class="ck-btn green" onclick="ckNext()">▶️ सवाल शुरू करें / अगला सवाल</button>' +
'<button class="ck-btn gold" onclick="ckSpeak()">🔊 सवाल सुनो</button></div>' +
'<div id="ck-area" class="ck-hide"><div class="ck-qbox" id="ck-q">—</div>' +
'<div class="ck-timer">⏱️ समय: <span id="ck-t">60</span> सेकंड</div>' +
'<div class="ck-safe" style="margin-top:12px"><b>बोलने के बाद अपनी जाँच करें:</b>' +
'<ul><li>क्या मैंने एक असली उदाहरण दिया?</li><li>क्या मैं साफ़ और धीरे बोला?</li>' +
'<li>क्या मैं समय के अंदर रहा?</li><li>क्या मैंने आत्मविश्वास से बात की?</li></ul></div></div>' +
'</div></section>';

buildSpecial({
  out: "career-kit.html",
  title: "करियर-किट (Career Kit) — रिज़्यूमे · इंटरव्यू-तैयारी · मॉक-अभ्यास | ACS",
  desc: "मुफ़्त करियर-किट: अपना रिज़्यूमे बनाएँ, इंटरव्यू की तैयारी करें और मॉक-अभ्यास करें। सब आपके अपने फ़ोन में — कोई server पर नहीं।",
  head: ['<link rel="stylesheet" href="/assets/career-kit.css">'],
  foot: ['<script src="/assets/career-kit.js" defer></scr' + 'ipt>'],
  content: CAREER_CONTENT
});

/* ===================== वापसी-नीति (Refund) ===================== */
const REFUND_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">💰 वापसी-नीति (Refund Policy)</h1>' +
'<p class="lg-lead">ACS से जुड़ना मुफ़्त है।</p>' +
'<p class="lg-lead">पैसा सिर्फ़ तब लगता है, जब आप कोई सेवा लें।</p>' +

'<div class="lg-warn">' +
'<p>भुगतान से पहले यह ज़रूर जान लें।</p>' +
'<p>कुछ सेवाओं में आपका आवेदन एक इंसान जाँचता है।</p>' +
'<p>भुगतान से पहले एक मुफ़्त मशीन-जाँच होती है।</p>' +
'<p>यह जाँच उम्र, दोहराव और ख़ाली फ़ॉर्म देखती है।</p>' +
'<p>जाँच शुरू होने के बाद आवेदन असफल हो, तो 30% जाँच-शुल्क कटता है।</p>' +
'<p>यह दंड नहीं है, बल्कि जाँच में लगी मेहनत की लागत है।</p>' +
'<p>पहली बार असफल होने पर आपको 7 दिन का सुधार-मौक़ा मिलता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>1. वेरिफाइड बैज (Green Tick)</h2>' +
'<p>हमारी तकनीकी गलती से भुगतान हुआ, तो पूरा पैसा वापस।</p>' +
'<p>जाँच शुरू होने से पहले आप ख़ुद रद्द करें, तो 90% वापस।</p>' +
'<p>बाक़ी 10% प्रबंध-ख़र्च है।</p>' +
'<p>जाँच होने के बाद आवेदन असफल हो, तो पहले 7 दिन सुधार का मौक़ा।</p>' +
'<p>फिर भी असफल हो, तो 70% वापस।</p>' +
'<p>बचा हुआ 30% जाँच-शुल्क है।</p>' +
'<p>बैज मिलने के बाद बीच में रद्द करें, तो बचे दिनों का पैसा लौटेगा।</p>' +
'<p>हिसाब सरल है।</p>' +
'<p>पूरी फ़ीस में से 30% घटाओ, फिर बचे दिनों के हिसाब से पैसा लौटाओ।</p>' +
'</div>' +

'<div class="lg-card"><h2>1-ब. विद्यार्थी गोल्डन बैज (Student Golden Badge)</h2>' +
'<p>विद्यार्थी का गोल्डन बैज भुगतान होते ही तुरंत चालू हो जाता है।</p>' +
'<p>इसमें क्षेत्रीय अधिकारी (RM) की जाँच नहीं होती।</p>' +
'<p>हमारी तकनीकी गलती से भुगतान हुआ, तो पूरा पैसा वापस।</p>' +
'<p>बाक़ी हर हाल में हिसाब सरल है।</p>' +
'<p>पूरी फ़ीस में से 30% घटाओ, फिर बचे दिनों के हिसाब से पैसा लौटाओ।</p>' +
'</div>' +

'<div class="lg-card"><h2>2. अभिरुचि-टेस्ट (Aptitude Test)</h2>' +
'<p>भुगतान के बाद 30 दिन का समय मिलता है।</p>' +
'<p>इसी समय में टेस्ट पूरा करें।</p>' +
'<p>हर हाल में 30% कटता है।</p>' +
'<p>यह बात भुगतान से पहले बता दी जाती है।</p>' +
'<p>नतीजा दिख गया, तो कोई वापसी नहीं।</p>' +
'<p>अंतिम जमा (final submit) से पहले छोड़ा, तो 70% वापस।</p>' +
'<p>इसके लिए शिकायत 24 घंटे में करें।</p>' +
'<p>30 दिन बीत गए, तो कुछ वापस नहीं।</p>' +
'<p>दोबारा टेस्ट देना हो, तो पूरी फ़ीस लगेगी।</p>' +
'</div>' +

'<div class="lg-card"><h2>3. सलाहकार-सलाह (Counselling)</h2>' +
'<p>तय समय से 1 घंटा पहले रद्द करें, तो 90% वापस।</p>' +
'<p>यह दोनों तरफ़ लागू है।</p>' +
'<p>चाहे आप रद्द करें या सलाहकार।</p>' +
'</div>' +

'<div class="lg-card"><h2>4. मृत्यु या आपदा</h2>' +
'<p>विद्यार्थी की मृत्यु या बड़ी आपदा में 75% पैसा वापस।</p>' +
'</div>' +

'<div class="lg-card"><h2>5. औद्योगिक भ्रमण (Tour)</h2>' +
'<p>पैसा एक सुरक्षित-खाते (escrow) में रखा जाता है।</p>' +
'<p>जो ख़र्च हो चुका, वह वापस नहीं होता।</p>' +
'<p>जैसे वीज़ा, टिकट और बुकिंग का पैसा।</p>' +
'<p>बाक़ी बचा पैसा सुरक्षित-खाते से वापस।</p>' +
'</div>' +

'<div class="lg-money">' +
'<p>भारत में वापसी 7 कार्य-दिवस में होती है।</p>' +
'<p>विदेश में वापसी 10 कार्य-दिवस में होती है।</p>' +
'<p>कोई पैसा रोकना पड़े, तो 48 घंटे में सूचना मिलती है।</p>' +
'<p>पैसा अधिकतम 60 दिन तक रुक सकता है।</p>' +
'<p>सभी भुगतान अप्लाइड कंप्यूटर स्कूल को जाते हैं।</p>' +
'<p>भुगतान Razorpay के ज़रिए होता है।</p>' +
'<p>हमेशा आधिकारिक Razorpay लिंक से ही भुगतान करें।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/privacy.html">🔒 गोपनीयता</a><a href="/terms.html">📜 शर्तें</a></div>' +
'</div>';

buildSpecial({
  out: "refund.html", langStrict: true,
  title: "वापसी-नीति (Refund Policy) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS की वापसी-नीति — बैज, अभिरुचि-टेस्ट, सलाह, भ्रमण की फ़ीस-वापसी के नियम सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: REFUND_CONTENT
});

/* ===================== गोपनीयता (Privacy) ===================== */
const PRIVACY_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">🔒 गोपनीयता-नीति (Privacy Policy)</h1>' +
'<p class="lg-lead">आपकी जानकारी हमारे लिए ज़रूरी और सुरक्षित है।</p>' +
'<p class="lg-lead">यहाँ साफ़ लिखा है कि हम क्या लेते हैं और क्यों।</p>' +

'<div class="lg-card"><h2>हम क्या जानकारी लेते हैं</h2>' +
'<p>जुड़ते समय हम आपका नाम लेते हैं।</p>' +
'<p>आपका मोबाइल नंबर और ईमेल लेते हैं।</p>' +
'<p>आपका पता और ज़रूरी दस्तावेज़ लेते हैं।</p>' +
'<p>यह सब आपके खाते और सत्यापन के लिए है।</p>' +
'</div>' +

'<div class="lg-card"><h2>हम इसे कहाँ रखते हैं</h2>' +
'<p>आपकी जानकारी सुरक्षित सर्वर पर रखी जाती है।</p>' +
'<p>आपका पासवर्ड और OTP छिपे रूप में रखे जाते हैं।</p>' +
'<p>इन्हें कोई सीधे पढ़ नहीं सकता।</p>' +
'</div>' +

'<div class="lg-card"><h2>क्या आपके फ़ोन में ही रहता है</h2>' +
'<p>आपकी पढ़ाई-प्रगति आपके फ़ोन में ही रहती है।</p>' +
'<p>आपका बनाया रिज़्यूमे भी फ़ोन में ही रहता है।</p>' +
'<p>यह जानकारी कहीं बाहर नहीं भेजी जाती।</p>' +
'</div>' +

'<div class="lg-card"><h2>भुगतान की जानकारी</h2>' +
'<p>भुगतान की जानकारी Razorpay संभालता है।</p>' +
'<p>हम आपका कार्ड-नंबर कभी नहीं रखते।</p>' +
'</div>' +

'<div class="lg-card"><h2>बच्चों की सुरक्षा</h2>' +
'<p>10 से 18 साल के बच्चों को अभिभावक की सहमति चाहिए।</p>' +
'<p>बच्चों की सुरक्षा के कड़े नियम (POCSO) माने जाते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>आपके अधिकार</h2>' +
'<p>आप अपनी जानकारी देख सकते हैं।</p>' +
'<p>आप उसे सुधार सकते हैं।</p>' +
'<p>आप उसे मिटाने को कह सकते हैं।</p>' +
'<p>यह अधिकार डेटा-सुरक्षा कानून (DPDP) से मिलते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>पेज-गिनती</h2>' +
'<p>हम सिर्फ़ बेनाम पेज-गिनती रखते हैं।</p>' +
'<p>यह गिनती किसी एक व्यक्ति को नहीं पहचानती।</p>' +
'</div>' +

'<div class="lg-card"><h2>संपर्क</h2>' +
'<p>कोई सवाल हो, तो हमें ईमेल करें।</p>' +
'<p>पता और फ़ोन नीचे फुटर में दिया है।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/refund.html">💰 वापसी</a><a href="/terms.html">📜 शर्तें</a></div>' +
'</div>';

buildSpecial({
  out: "privacy.html", langStrict: true,
  title: "गोपनीयता-नीति (Privacy Policy) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS गोपनीयता-नीति — हम क्या जानकारी लेते हैं, कहाँ रखते हैं और आपके अधिकार क्या हैं, सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: PRIVACY_CONTENT
});

/* ===================== उपयोग-शर्तें (Terms) ===================== */
const TERMS_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">📜 उपयोग-शर्तें (Terms of Use)</h1>' +
'<p class="lg-lead">ACS का उपयोग करने पर ये शर्तें लागू होती हैं।</p>' +
'<p class="lg-lead">इन्हें आराम से पढ़ें।</p>' +

'<div class="lg-card"><h2>ACS क्या है</h2>' +
'<p>ACS एक शिक्षा-मंच है।</p>' +
'<p>इससे जुड़ना मुफ़्त है।</p>' +
'<p>पैसा सिर्फ़ सेवा लेने पर लगता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>मंच की भूमिका</h2>' +
'<p>ACS एक जोड़ने वाला मंच है।</p>' +
'<p>यह किसी सौदे का पक्ष नहीं है।</p>' +
'<p>सलाहकार, नियोक्ता या विक्रेता (Vendor) से आपका सीधा रिश्ता होता है।</p>' +
'<p>ACS सिर्फ़ भरोसे का पुल बनाता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>भुगतान</h2>' +
'<p>सभी सेवा-शुल्क अप्लाइड कंप्यूटर स्कूल को जाते हैं।</p>' +
'<p>भुगतान Razorpay के ज़रिए होता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>सच्ची जानकारी दें</h2>' +
'<p>हमेशा सच्ची जानकारी दें।</p>' +
'<p>झूठी जानकारी मिलने पर खाता बंद हो सकता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>बैज और प्रमाण पत्र</h2>' +
'<p>बैज और प्रमाण पत्र असली सत्यापन से ही मिलते हैं।</p>' +
'<p>कोई छोटा रास्ता नहीं है।</p>' +
'</div>' +

'<div class="lg-card"><h2>रोक का अधिकार</h2>' +
'<p>नियम टूटने पर हम आपसे जवाब माँगते हैं।</p>' +
'<p>इसके लिए 7 दिन का समय मिलता है।</p>' +
'<p>इसे कारण-बताओ (Show-Cause) कहते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>कानून</h2>' +
'<p>भारत में झगड़े पटना उच्च न्यायालय के दायरे में आते हैं।</p>' +
'<p>विदेश के मामलों में अंतरराष्ट्रीय नियम (UNCITRAL) लागू होते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>शर्तों में बदलाव</h2>' +
'<p>ये शर्तें आगे बदल सकती हैं।</p>' +
'<p>बदली शर्तें इसी पेज पर दिखेंगी।</p>' +
'</div>' +

'<div class="lg-card"><h2>संपर्क</h2>' +
'<p>कोई सवाल हो, तो हमें ईमेल करें।</p>' +
'<p>पता और फ़ोन नीचे फुटर में दिया है।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/refund.html">💰 वापसी</a><a href="/privacy.html">🔒 गोपनीयता</a></div>' +
'</div>';

buildSpecial({
  out: "terms.html", langStrict: true,
  title: "उपयोग-शर्तें (Terms of Use) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS उपयोग-शर्तें — मंच की भूमिका, भुगतान, नियम और कानून सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: TERMS_CONTENT
});

/* ===================== aptitude-test content (काम-12) ===================== */
const APT_CONTENT =
'<div class="apt-wrap">' +
'<h1 style="font-size:26px;margin:14px 0 6px">🧭 अभिरुचि-टेस्ट (Aptitude Test)</h1>' +
'<p class="apt-lead">यह जानने का खेल है कि आपका मन किन कामों में लगता है।</p>' +
'<p>कोई जवाब सही या ग़लत नहीं होता — बस अपनी पसंद बताइए।</p>' +
'<p>यह मुफ़्त झलक है — 24 प्रश्न और बीच में दो कहानियाँ।</p>' +
'<div class="apt-note">🔒 आपके जवाब सिर्फ़ आपके फ़ोन में रहते हैं — कहीं भेजे नहीं जाते।</div>' +
'<div class="apt-note" id="apt-dummy-notice" style="background:var(--gold-bg,#fef3d0);font-weight:700">⚠️ यह डमी/झलक-टेस्ट है — असली पूरे 120-प्रश्न टेस्ट के लिए रजिस्ट्रेशन ज़रूरी है।</div>' +
'<div id="apt-box" class="apt-card"><p>टेस्ट खुल रहा है…</p></div>' +
'<div class="apt-note">📝 नतीजा अभिरुचि की झलक देता है — यह योग्यता का प्रमाण नहीं है।</div>' +
'<div id="apt-full-info">' +
'<h2 style="font-size:24px;margin:22px 0 4px">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</h2>' +
'<p>रजिस्ट्रेशन ज़रूरी है।</p>' +
'<p>बिना बैज (badge): ₹100 में 1 चांस।</p>' +
'<p>बैज (badge) वालों को मुफ़्त — 365 दिन, जितनी बार चाहें।</p>' +
'<p>घड़ी 90 मिनट की है।</p>' +
'<p>पन्ना बंद करें तो घड़ी रुक जाती है।</p>' +
'<p>खंड 1 — आपकी रुचि के समूह।</p>' +
'<p>खंड 2 — उनकी गहराई।</p>' +
'<p>खंड 3 — कोर्स का चुनाव।</p>' +
'</div>' +
'<div id="apt-sess-box" class="apt-card"><p>पूरा टेस्ट खुल रहा है…</p></div>' +
'</div>';

buildSpecial({
  out: "aptitude-test.html", langStrict: true,
  title: "अभिरुचि-टेस्ट — मुफ़्त झलक | अप्लाइड कंप्यूटर स्कूल",
  desc: "24 सरल प्रश्न — जानें आपका मन किन कामों में लगता है। मुफ़्त, बिना खाता, जवाब आपके फ़ोन में ही।",
  head: ['<link rel="stylesheet" href="/assets/aptitude-test.css">'],
  foot: [
    '<script src="/assets/mg_names.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_art.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_data.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude-test.js" defer></scr' + 'ipt>',
    '<script src="/assets/apt-session.js" defer></scr' + 'ipt>',
    '<script type="module" src="/assets/apt-pay.js"></scr' + 'ipt>'
  ],
  content: APT_CONTENT
});

/* ===================== salah content (काम-अभिरुचि-भुगतान, 22-Jul) =====================
   पहले हाथ से बना था (कोई generator-निशान नहीं) — परत-4 का उल्लंघन था
   (मशीन-ऑडिट से पकड़ा गया)। अब यहीं generator-रास्ते में लाया गया —
   पुराना "जल्द आ रहा है" placeholder हटाकर असली टेस्ट-embed (aptitude-test.html
   जैसा apt-box + apt-sess-box ढाँचा), बाक़ी सब content (career-paths,
   counselors, CTA) हूबहू पुराने salah.html से। */
const SALAH_CONTENT = `    <!-- ════════ सलाह (salah) — बीच का content ════════ -->

<section class="page-hero" style="padding:34px 16px">
  <div class="page-hero-inner">
    <div style="font-size:2.6rem">🧭</div>
    <h1 style="color:var(--navy)">करियर सलाह</h1>
    <p style="color:var(--muted);max-width:640px;margin:6px auto 0">
      सही रास्ता चुनें — अभिरुचि परखें, रास्ते समझें, और काउंसलर (counselor) से बात करें।
    </p>
  </div>
</section>

<!-- ASLI APTITUDE TEST (लाइव) -->
<section class="section-container apt-wrap" style="max-width:760px">
  <div class="notice-card" style="text-align:center">
    <div style="font-size:2.4rem">🧠</div>
    <h2 style="color:var(--navy);margin:6px 0">अभिरुचि परीक्षा (Aptitude Test)</h2>
    <p style="color:var(--muted);margin:0 auto;max-width:600px">
      यह कोई पास/फेल परीक्षा नहीं — सिर्फ़ <b>रुचि</b> जानने का तरीक़ा।
    </p>
    <div class="apt-note">🔒 आपके जवाब सिर्फ़ आपके फ़ोन में रहते हैं — कहीं भेजे नहीं जाते।</div>
    <div class="apt-note" id="apt-dummy-notice" style="background:var(--gold-bg);font-weight:700">⚠️ यह डमी/झलक-टेस्ट है — असली पूरे 120-प्रश्न टेस्ट के लिए रजिस्ट्रेशन ज़रूरी है।</div>
    <div id="apt-box" class="apt-card"><p>टेस्ट खुल रहा है…</p></div>
  </div>
</section>

<section class="section-container apt-wrap" style="max-width:760px;padding-top:0">
  <div class="notice-card" style="text-align:center">
    <div id="apt-full-info">
    <h2 style="color:var(--navy);font-size:22px;margin:4px 0">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</h2>
    <p style="color:var(--muted)">रजिस्ट्रेशन ज़रूरी है। बिना बैज (badge): ₹100 में 1 चांस। बैज (badge) वालों को मुफ़्त — 365 दिन, जितनी बार चाहें।</p>
    </div>
    <div id="apt-sess-box" class="apt-card"><p>पूरा टेस्ट खुल रहा है…</p></div>
  </div>
  <p style="color:var(--muted);font-size:16px;text-align:center;margin-top:10px">
    (आधार: RIASEC अभिरुचि-विज्ञान, 1959 पर आधारित/प्रेरित — यह दिशा भर है, अंतिम फ़ैसला नहीं।)
  </p>
</section>

<!-- CAREER PATHS -->
<section class="section-container" style="max-width:1000px;padding-top:0">
  <div class="section-title-block"><h2 style="color:var(--navy)">🗺️ रास्ते — आपके लिए कौन-सा सही?</h2></div>
  <div class="content-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    <div class="notice-card"><div style="font-size:1.8rem">🏛️</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">सरकारी नौकरी (Government Job)</div>
      <div style="color:var(--muted)">UPSC, BPSC, Railway, Bank, SSC — स्थिर आय, सुरक्षित भविष्य, पेंशन (pension)।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🏢</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">कॉर्पोरेट नौकरी (Corporate Job)</div>
      <div style="color:var(--muted)">IT, Finance, Marketing, HR — तेज़ growth, अच्छी salary।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🏪</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">प्राइवेट नौकरी (Private Job)</div>
      <div style="color:var(--muted)">स्थानीय (local) उद्योग, दुकान, कंपनी — तुरंत काम, तुरंत कमाई।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">💼</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">खुद का व्यवसाय (Own Business)</div>
      <div style="color:var(--muted)">₹0 से शुरू → ₹200 करोड़ तक। L1 से L15 का पूरा रास्ता।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🔧</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">स्वरोजगार (Self-Employment)</div>
      <div style="color:var(--muted)">मरम्मत, सेवा, फ्रीलांस (freelance) — हुनर (lure) से कमाई, लचीला (flexible)।</div></div>
  </div>
</section>

<!-- COUNSELORS -->
<section class="section-container" style="max-width:1000px;padding-top:0">
  <div class="section-title-block"><h2 style="color:var(--navy)">🧭 काउंसलर से मिलें (Meet a Counselor)</h2>
    <p style="color:var(--muted)">हमारे विशेषज्ञ काउंसलर (expert counselors) आपकी मदद के लिए तैयार हैं।</p></div>
  <div class="content-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
    <div class="notice-card">
      <div style="font-size:2rem">🧑</div>
      <div style="font-weight:800;color:var(--navy)">ACS Founder · मुख्य काउंसलर</div>
      <div style="color:var(--muted);font-size:16px">📍 विद्यार्थीनगर, चौथम, खगड़िया, बिहार</div>
      <div style="margin:8px 0;color:var(--muted)">व्यवसाय (business) · करियर (career) · हिंदी</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092" target="_blank" rel="noopener" class="btn btn-primary" style="min-width:auto;padding:10px 16px">💬 WhatsApp</a>
        <a href="tel:+919431210092" class="btn btn-accent" style="min-width:auto;padding:10px 16px">📞 Call</a>
      </div>
    </div>
    <div class="notice-card">
      <div style="font-size:2rem">🏫</div>
      <div style="font-weight:800;color:var(--navy)">ACS Chautham Centre</div>
      <div style="color:var(--muted);font-size:16px">मुख्यालय केंद्र (headquarters center) · ⭐4.8 (318 Reviews)</div>
      <div style="margin:8px 0;color:var(--muted)">सभी कोर्स · सोमवार–शनिवार · सुबह 6 — रात 8</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092" target="_blank" rel="noopener" class="btn btn-primary" style="min-width:auto;padding:10px 16px">💬 WhatsApp</a>
        <a href="mailto:info@ffgpmt.org" class="btn btn-accent" style="min-width:auto;padding:10px 16px">✉️ Email</a>
      </div>
    </div>
    <div class="notice-card">
      <div style="font-size:2rem">🌐</div>
      <div style="font-weight:800;color:var(--navy)">ऑनलाइन काउंसलिंग (Online Counseling)</div>
      <div style="color:var(--muted);font-size:16px">WhatsApp / Video Call · कहीं से भी, किसी भी समय</div>
      <div style="margin:8px 0;color:var(--muted)">निःशुल्क (free) · ऑनलाइन · 24×7</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092?text=नमस्ते, मुझे सलाह चाहिए।" target="_blank" rel="noopener" class="btn btn-gold" style="min-width:auto;padding:10px 16px">🧭 सलाह लें</a>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-container" style="max-width:760px;padding-top:0;text-align:center">
  <div class="notice-card">
    <h3 style="color:var(--navy);margin:0 0 6px">रास्ता तय करने में मदद चाहिए?</h3>
    <p style="color:var(--muted);margin:0 0 14px">पहले काउंसलर से मुफ़्त बात करें, फिर उद्यम/कोर्स चुनें।</p>
    <div class="hero-secondary-links">
      <a href="/udyam/" class="btn btn-gold">🌍 उद्यम खोजें</a>
      <a href="/courses/hi/" class="btn btn-primary">📚 कोर्स देखें</a>
      <a href="/join.html" class="btn btn-accent">📝 जुड़ें</a>
    </div>
  </div>
</section>
`;

buildSpecial({
  out: "hi/salah.html", langStrict: false,
  title: "करियर सलाह — सही रास्ता चुनें | Applied Computer School™",
  desc: "ACS सलाह — अभिरुचि परखें, 5 करियर रास्ते (सरकारी/कॉर्पोरेट/प्राइवेट नौकरी, व्यवसाय, स्वरोजगार) समझें, और विशेषज्ञ काउंसलर से मुफ़्त बात करें।",
  head: [
    '<link rel="stylesheet" href="/assets/aptitude-test.css">',
    `<style>
/* सलाह-पेज बूस्टर CSS (31-Jul, Founder-टोका "टूटा हुआ है") — असली जड़: यह पेज acs-style.css/
   acs-universal.css load करता है, जिनमें .notice-card/.content-grid/.section-container/.page-hero
   जैसे classes परिभाषित ही नहीं थे (सिर्फ़ root /style.css में हैं, वह यहाँ load नहीं होता)।
   body{color:var(--navy);background:var(--navy)} है — बिना card-background के टेक्स्ट navy-पर-navy
   बनकर पूरी तरह अदृश्य हो गया था (चिह्न/emoji दिखते रहे क्योंकि वे रंग-ग्लिफ़ हैं, CSS color से अछूते)।
   नीचे वही classes root style.css से हूबहू (ब्रांड-एकरूपता) — सिर्फ़ इसी पेज के लिए, स्वतंत्र। */
:root{ --border:#E8EDF5; --radius:16px; --primary:#1565C0; --muted:#475569; --gold-bg:#FFF4D6; --white:#FFFFFF; }
.page-hero{background:#F3F4F6;background-image:radial-gradient(rgba(21,101,192,.08) 1px,transparent 0);background-size:24px 24px;text-align:center;padding:36px 16px;border-radius:0 0 28px 28px}
.page-hero-inner{max-width:640px;margin:auto}
.page-hero h1{font-size:clamp(28px,6vw,40px);font-weight:900;margin:10px 0 6px;line-height:1.2}
.notice-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:22px;box-shadow:0 4px 12px #0b1f3a0f}
.content-grid{display:grid;grid-template-columns:1fr;gap:18px}
.section-container{padding:36px 16px;max-width:1200px;margin:auto}
.section-title-block{text-align:center;margin-bottom:22px}
.section-title-block h2{font-size:22px}
.hero-secondary-links{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;min-width:160px;padding:14px 20px;border-radius:999px;font-weight:900;font-size:16px;text-align:center;box-shadow:0 4px 10px #0001}
.btn-primary{background:var(--green);color:#fff}
.btn-accent{background:var(--primary);color:#fff}
.btn-gold{background:var(--gold);color:var(--navy)}
</style>`
  ],
  foot: [
    '<script src="/assets/mg_names.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_art.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_data.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude-test.js" defer></scr' + 'ipt>',
    '<script src="/assets/apt-session.js" defer></scr' + 'ipt>',
    '<script type="module" src="/assets/apt-pay.js"></scr' + 'ipt>'
  ],
  content: SALAH_CONTENT
});

/* ===================== काम की भाषा — एक इंजन, हर भाषा (26-Aug-2026) =====================
   कूट-नाम kkb (सिर्फ़ फ़ाइल-नाम/internal) · public नाम "ACS काम की भाषा — <भाषा> for Work"।
   500 वाक्य × (लक्ष्य-भाषा + देवनागरी + हिंदी + आवाज़) · 5 सप्ताह · दिन 1-5 पाठ, दिन 6 अभ्यास, दिन 7 फ़ोन-टेस्ट।
   साझा: इंजन /assets/kkb.js + सजावट /assets/kkb.css। भाषा-वार सिर्फ़ data (परत-3) व पेज-पता।
   नई भाषा जोड़ना = KKB_LANGS में एक पंक्ति + /assets/kkb_<code>_data.js — इंजन/टेम्पलेट अछूते।
   langStrict नहीं: लक्ष्य-भाषा के शब्द जान-बूझकर नंगे हैं। check-robot (square-bracket / font<16) यथावत। */
const KKB_LANGS = [
  { code: "en", label: "English", h1: "English for Work", data: "/assets/kkb_data.js", out: "courses/hi/bhasha/english/index.html",
    title: "ACS काम की भाषा — English for Work (500 वाक्य, देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "5वीं पास के लिए English बोलने का मुफ़्त कोर्स — 500 वाक्य देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट।",
    line1: "यह English speaking (बोलने) का कोर्स है। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kn", label: "कन्नड", h1: "कन्नड बोलना सीखें (Kannada for Work)", data: "/assets/kkb_kn_data.js", out: "courses/hi/bhasha/kannada/index.html",
    title: "ACS काम की भाषा — कन्नड बोलना सीखें (Kannada for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कन्नड बोलना सीखें — कर्नाटक में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह कन्नड (Kannada) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कर्नाटक में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zh", label: "चीनी", h1: "चीनी बोलना सीखें (Mandarin for Work)", data: "/assets/kkb_zh_data.js", out: "courses/hi/bhasha/mandarin/index.html",
    title: "ACS काम की भाषा — चीनी बोलना सीखें (Mandarin for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चीनी (Mandarin) बोलना सीखें — चीन या चीनी कंपनी में काम के लिए 500 वाक्य, देवनागरी उच्चारण, pinyin, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह चीनी (Mandarin Chinese) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो चीन या किसी चीनी कंपनी/कारख़ाने में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "es", label: "स्पेनिश", h1: "स्पेनिश बोलना सीखें (Spanish for Work)", data: "/assets/kkb_es_data.js", out: "courses/hi/bhasha/spanish/index.html",
    title: "ACS काम की भाषा — स्पेनिश बोलना सीखें (Spanish for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से Spanish बोलना सीखें — स्पेन/लैटिन अमेरिका या Spanish बोलने वाली कंपनी में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह Spanish बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो स्पेन, लैटिन अमेरिका या किसी Spanish बोलने वाली कंपनी में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ar", label: "अरबी", h1: "अरबी बोलना सीखें (Arabic for Work — MENA)", data: "/assets/kkb_ar_data.js", out: "courses/hi/bhasha/arabic/index.html",
    title: "ACS काम की भाषा — अरबी बोलना सीखें (Arabic for Work, मध्य-पूर्व/MENA, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अरबी बोलना सीखें — खाड़ी देश या MENA क्षेत्र में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो खाड़ी देश या मध्य-पूर्व/उत्तर-अफ़्रीका (MENA) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bn", label: "बांग्ला", h1: "बांग्ला बोलना सीखें (Bengali for Work — बंगाल व बांग्लादेश)", data: "/assets/kkb_bn_data.js", out: "courses/hi/bhasha/bengali/index.html",
    title: "ACS काम की भाषा — बांग्ला बोलना सीखें (Bengali for Work, पश्चिम बंगाल व बांग्लादेश, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बांग्ला बोलना सीखें — कोलकाता/पश्चिम बंगाल या बांग्लादेश में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह बांग्ला (Bengali) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पश्चिम बंगाल (कोलकाता आदि) या बांग्लादेश में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pt", label: "पुर्तगाली", h1: "पुर्तगाली बोलना सीखें (Portuguese for Work — ब्राज़ील, अंगोला, मोज़ाम्बीक)", data: "/assets/kkb_pt_data.js", out: "courses/hi/bhasha/portuguese/index.html",
    title: "ACS काम की भाषा — पुर्तगाली बोलना सीखें (Portuguese for Work, ब्राज़ील/अंगोला/मोज़ाम्बीक, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पुर्तगाली बोलना सीखें — ब्राज़ील, अंगोला या मोज़ाम्बीक में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पुर्तगाली (Portuguese) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ब्राज़ील, अंगोला या मोज़ाम्बीक में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "id", label: "इंडोनेशियाई", h1: "इंडोनेशियाई बोलना सीखें (Indonesian/Bahasa for Work)", data: "/assets/kkb_id_data.js", out: "courses/hi/bhasha/indonesian/index.html",
    title: "ACS काम की भाषा — इंडोनेशियाई बोलना सीखें (Bahasa Indonesia for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इंडोनेशियाई (Bahasa Indonesia) बोलना सीखें — इंडोनेशिया में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह इंडोनेशियाई (Bahasa Indonesia) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इंडोनेशिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ja", label: "जापानी", h1: "जापानी बोलना सीखें (Japanese for Work — जापान)", data: "/assets/kkb_ja_data.js", out: "courses/hi/bhasha/japanese/index.html",
    title: "ACS काम की भाषा — जापानी बोलना सीखें (Japanese for Work, जापान, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जापानी बोलना सीखें — जापान में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह जापानी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जापान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mr", label: "मराठी", h1: "मराठी बोलना सीखें (Marathi for Work — महाराष्ट्र)", data: "/assets/kkb_mr_data.js", out: "courses/hi/bhasha/marathi/index.html",
    title: "ACS काम की भाषा — मराठी बोलना सीखें (Marathi for Work, महाराष्ट्र, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मराठी बोलना सीखें — महाराष्ट्र (मुंबई, पुणे आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह मराठी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो महाराष्ट्र में काम करने जा रहे हैं। मराठी देवनागरी में लिखी जाती है, इसलिए पढ़ना पहले से आसान है — फिर भी यह कोर्स सुनने-बोलने पर ज़ोर देता है।" },
  { code: "te", label: "तेलुगु", h1: "तेलुगु बोलना सीखें (Telugu for Work — आंध्र प्रदेश व तेलंगाना)", data: "/assets/kkb_te_data.js", out: "courses/hi/bhasha/telugu/index.html",
    title: "ACS काम की भाषा — तेलुगु बोलना सीखें (Telugu for Work, आंध्र प्रदेश/तेलंगाना, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तेलुगु बोलना सीखें — आंध्र प्रदेश या तेलंगाना (हैदराबाद आदि) में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह तेलुगु बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो आंध्र प्रदेश या तेलंगाना में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ta", label: "तमिल", h1: "तमिल बोलना सीखें (Tamil for Work — तमिलनाडु, श्रीलंका, सिंगापुर)", data: "/assets/kkb_ta_data.js", out: "courses/hi/bhasha/tamil/index.html",
    title: "ACS काम की भाषा — तमिल बोलना सीखें (Tamil for Work, तमिलनाडु/श्रीलंका/सिंगापुर, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तमिल बोलना सीखें — तमिलनाडु, श्रीलंका या सिंगापुर में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह तमिल बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तमिलनाडु, श्रीलंका या सिंगापुर में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tr", label: "तुर्की", h1: "तुर्की बोलना सीखें (Turkish for Work — तुर्की)", data: "/assets/kkb_tr_data.js", out: "courses/hi/bhasha/turkish/index.html",
    title: "ACS काम की भाषा — तुर्की बोलना सीखें (Turkish for Work, तुर्की, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुर्की बोलना सीखें — तुर्की में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तुर्की बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तुर्की में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ko", label: "कोरियाई", h1: "कोरियाई बोलना सीखें (Korean for Work — कोरियाई प्रायद्वीप)", data: "/assets/kkb_ko_data.js", out: "courses/hi/bhasha/korean/index.html",
    title: "ACS काम की भाषा — कोरियाई बोलना सीखें (Korean for Work, कोरियाई प्रायद्वीप, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोरियाई बोलना सीखें — दक्षिण कोरिया में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कोरियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कोरियाई प्रायद्वीप (दक्षिण कोरिया) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sw", label: "स्वाहिली", h1: "स्वाहिली बोलना सीखें (Swahili for Work — पूर्वी व मध्य अफ़्रीका)", data: "/assets/kkb_sw_data.js", out: "courses/hi/bhasha/swahili/index.html",
    title: "ACS काम की भाषा — स्वाहिली बोलना सीखें (Swahili for Work, केन्या/तंज़ानिया, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्वाहिली बोलना सीखें — केन्या, तंज़ानिया या पूर्वी अफ़्रीका में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह स्वाहिली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पूर्वी या मध्य अफ़्रीका (केन्या, तंज़ानिया आदि) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gu", label: "गुजराती", h1: "गुजराती बोलना सीखें (Gujarati for Work — गुजरात)", data: "/assets/kkb_gu_data.js", out: "courses/hi/bhasha/gujarati/index.html",
    title: "ACS काम की भाषा — गुजराती बोलना सीखें (Gujarati for Work, गुजरात, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गुजराती बोलना सीखें — गुजरात (अहमदाबाद, सूरत आदि) में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह गुजराती बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो गुजरात में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "jv", label: "जावानीज़", h1: "जावानीज़ बोलना सीखें (Javanese for Work — जावा द्वीप)", data: "/assets/kkb_jv_data.js", out: "courses/hi/bhasha/javanese/index.html",
    title: "ACS काम की भाषा — जावानीज़ बोलना सीखें (Javanese for Work, जावा द्वीप, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जावानीज़ बोलना सीखें — इंडोनेशिया के जावा द्वीप में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह जावानीज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इंडोनेशिया के जावा द्वीप में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fa", label: "फ़ारसी", h1: "फ़ारसी बोलना सीखें (Persian/Farsi for Work — ईरान व मध्य एशिया)", data: "/assets/kkb_fa_data.js", out: "courses/hi/bhasha/persian/index.html",
    title: "ACS काम की भाषा — फ़ारसी बोलना सीखें (Persian/Farsi for Work, ईरान, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़ारसी बोलना सीखें — ईरान या मध्य एशिया में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह फ़ारसी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ईरान या मध्य एशिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ha", label: "हाउसा", h1: "हाउसा बोलना सीखें (Hausa for Work — पश्चिम अफ़्रीका)", data: "/assets/kkb_ha_data.js", out: "courses/hi/bhasha/hausa/index.html",
    title: "ACS काम की भाषा — हाउसा बोलना सीखें (Hausa for Work, नाईजीरिया/नाइजर, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हाउसा बोलना सीखें — नाईजीरिया या नाइजर में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हाउसा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पश्चिम अफ़्रीका (नाईजीरिया, नाइजर आदि) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nan", label: "मीनान चीनी", h1: "मीनान/होक्किएन बोलना सीखें (Min Nan Chinese for Work — फ़ुज्यान व ताईवान)", data: "/assets/kkb_nan_data.js", out: "courses/hi/bhasha/minnan/index.html",
    title: "ACS काम की भाषा — मीनान चीनी बोलना सीखें (Min Nan/Hokkien for Work, फ़ुज्यान व ताईवान, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मीनान (होक्किएन/ताईवानी) बोलना सीखें — फ़ुज्यान (चीन) या ताईवान में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मीनान चीनी (होक्किएन/ताईवानी) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो फ़ुज्यान (चीन) या ताईवान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bho", label: "भोजपुरी", h1: "भोजपुरी बोलना सीखें (Bhojpuri for Work — पूर्वी उत्तर प्रदेश व बिहार)", data: "/assets/kkb_bho_data.js", out: "courses/hi/bhasha/bhojpuri/index.html",
    title: "ACS काम की भाषा — भोजपुरी बोलना सीखें (Bhojpuri for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से भोजपुरी बोलना सीखें — पूर्वी उत्तर प्रदेश व बिहार में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह भोजपुरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पूर्वी उत्तर प्रदेश व बिहार के भोजपुरी-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sa", label: "संस्कृत", h1: "संस्कृत बोलना सीखें (Sanskrit for Work — शास्त्र, शिक्षा व संस्कृति-जगत)", data: "/assets/kkb_sa_data.js", out: "courses/hi/bhasha/sanskrit/index.html", /* 05-Sep: संस्कृत — देव-भाषा (देवनागरी-native) */
    title: "ACS काम की भाषा — संस्कृत बोलना सीखें (Sanskrit for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से संस्कृत बोलना सीखें — शास्त्र, शिक्षा व संस्कृति-जगत में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह संस्कृत बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो शास्त्र, शिक्षा, मंदिर, योग व संस्कृति-जगत में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pa", label: "पंजाबी", h1: "पंजाबी बोलना सीखें (Punjabi for Work — पंजाब)", data: "/assets/kkb_pa_data.js", out: "courses/hi/bhasha/punjabi/index.html",
    title: "ACS काम की भाषा — पंजाबी बोलना सीखें (Punjabi for Work, पंजाब, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पंजाबी बोलना सीखें — पंजाब (अमृतसर, लुधियाना आदि) में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह पंजाबी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पंजाब में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hne", label: "छत्तीसगढ़ी", h1: "छत्तीसगढ़ी बोलना सीखें (Chhattisgarhi for Work — छत्तीसगढ़)", data: "/assets/kkb_hne_data.js", out: "courses/hi/bhasha/chhattisgarhi/index.html",
    title: "ACS काम की भाषा — छत्तीसगढ़ी बोलना सीखें (Chhattisgarhi for Work, छत्तीसगढ़, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से छत्तीसगढ़ी बोलना सीखें — छत्तीसगढ़ (रायपुर, बिलासपुर आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह छत्तीसगढ़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो छत्तीसगढ़ में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "as", label: "असमिया", h1: "असमिया बोलना सीखें (Assamese for Work — असम)", data: "/assets/kkb_as_data.js", out: "courses/hi/bhasha/assamese/index.html",
    title: "ACS काम की भाषा — असमिया बोलना सीखें (Assamese for Work, असम, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से असमिया बोलना सीखें — असम (गुवाहाटी, डिब्रूगढ़ आदि) में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह असमिया बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो असम में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mai", label: "मैथिली", h1: "मैथिली बोलना सीखें (Maithili for Work — मिथिला, बिहार)", data: "/assets/kkb_mai_data.js", out: "courses/hi/bhasha/maithili/index.html",
    title: "ACS काम की भाषा — मैथिली बोलना सीखें (Maithili for Work, मिथिला, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मैथिली बोलना सीखें — मिथिला क्षेत्र (दरभंगा, मधुबनी आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मैथिली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मिथिला-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bgc", label: "हरियाणवी", h1: "हरियाणवी बोलना सीखें (Haryanvi for Work — हरियाणा)", data: "/assets/kkb_bgc_data.js", out: "courses/hi/bhasha/haryanvi/index.html",
    title: "ACS काम की भाषा — हरियाणवी बोलना सीखें (Haryanvi for Work, हरियाणा, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हरियाणवी बोलना सीखें — हरियाणा (गुड़गांव, हिसार आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हरियाणवी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हरियाणा में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mwr", label: "मारवाड़ी", h1: "मारवाड़ी बोलना सीखें (Marwari for Work — मारवाड़, राजस्थान)", data: "/assets/kkb_mwr_data.js", out: "courses/hi/bhasha/marwari/index.html",
    title: "ACS काम की भाषा — मारवाड़ी बोलना सीखें (Marwari for Work, राजस्थान, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मारवाड़ी बोलना सीखें — मारवाड़ क्षेत्र (जोधपुर, बीकानेर आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मारवाड़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मारवाड़-भाषी क्षेत्र (राजस्थान) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sat", label: "संथाली", h1: "संथाली बोलना सीखें (Santali for Work — झारखंड/बिहार/बंगाल/ओडिशा)", data: "/assets/kkb_sat_data.js", out: "courses/hi/bhasha/santali/index.html",
    title: "ACS काम की भाषा — संथाली बोलना सीखें (Santali for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से संथाली बोलना सीखें — झारखंड, बिहार, पश्चिम बंगाल, ओडिशा के संथाल-भाषी क्षेत्र में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनिवार्य)",
    line1: "यह संथाली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो संथाल-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। ⚠️ यह शुरुआती मसौदा है — संथाली मुंडा-परिवार की भाषा है, कृपया native-speaker से जाँच कराकर ही भरोसा करें।" },
  { code: "ks", label: "कश्मीरी", h1: "कश्मीरी बोलना सीखें (Kashmiri for Work — जम्मू-कश्मीर)", data: "/assets/kkb_ks_data.js", out: "courses/hi/bhasha/kashmiri/index.html",
    title: "ACS काम की भाषा — कश्मीरी बोलना सीखें (Kashmiri for Work, जम्मू-कश्मीर, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कश्मीरी बोलना सीखें — जम्मू-कश्मीर में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह कश्मीरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जम्मू-कश्मीर में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। ⚠️ यह शुरुआती मसौदा है — दार्दिक-शाखा का व्याकरण हिंदी-परिवार से अलग है, कृपया सावधानी बरतें।" },
  { code: "ne", label: "नेपाली", h1: "नेपाली बोलना सीखें (Nepali for Work — भारत व नेपाल)", data: "/assets/kkb_ne_data.js", out: "courses/hi/bhasha/nepali/index.html",
    title: "ACS काम की भाषा — नेपाली बोलना सीखें (Nepali for Work, भारत व नेपाल, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नेपाली बोलना सीखें — भारत (दार्जिलिंग, सिक्किम आदि) व नेपाल में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह नेपाली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो नेपाली-भाषी क्षेत्र (भारत व नेपाल) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gom", label: "कोंकणी", h1: "कोंकणी बोलना सीखें (Konkani for Work — गोवा व कोंकण तट)", data: "/assets/kkb_gom_data.js", out: "courses/hi/bhasha/konkani/index.html",
    title: "ACS काम की भाषा — कोंकणी बोलना सीखें (Konkani for Work, गोवा, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोंकणी बोलना सीखें — गोवा व कोंकण तट (कर्नाटक, महाराष्ट्र) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह कोंकणी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो गोवा व कोंकण तट में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sd", label: "सिंधी", h1: "सिंधी बोलना सीखें (Sindhi for Work)", data: "/assets/kkb_sd_data.js", out: "courses/hi/bhasha/sindhi/index.html",
    title: "ACS काम की भाषा — सिंधी बोलना सीखें (Sindhi for Work, 500 वाक्य असली सिंधी-लिपि व देवनागरी-उच्चारण में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिंधी बोलना सीखें — भारतीय सिंधी समुदाय में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिंधी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो सिंधी-भाषी समुदाय में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "doi", label: "डोगरी", h1: "डोगरी बोलना सीखें (Dogri for Work — जम्मू क्षेत्र)", data: "/assets/kkb_doi_data.js", out: "courses/hi/bhasha/dogri/index.html",
    title: "ACS काम की भाषा — डोगरी बोलना सीखें (Dogri for Work, जम्मू, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डोगरी बोलना सीखें — जम्मू क्षेत्र (जम्मू-कश्मीर, हिमाचल) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह डोगरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जम्मू-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mni", label: "मणिपुरी (Meiteilon)", h1: "मणिपुरी (Meiteilon) बोलना सीखें (Manipuri/Meitei for Work — मणिपुर)", data: "/assets/kkb_mni_data.js", out: "courses/hi/bhasha/manipuri/index.html",
    title: "ACS काम की भाषा — मणिपुरी बोलना सीखें (Manipuri for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मणिपुरी बोलना सीखें — मणिपुर में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनिवार्य)",
    line1: "यह मणिपुरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मणिपुर में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। ⚠️ यह शुरुआती मसौदा है — मणिपुरी चीनी-तिब्बती परिवार की भाषा है, कृपया native-speaker से जाँच कराकर ही भरोसा करें।" },
  { code: "ru", label: "रूसी", h1: "रूसी बोलना सीखें (Russian for Work — रूस)", data: "/assets/kkb_ru_data.js", out: "courses/hi/bhasha/russian/index.html",
    title: "ACS काम की भाषा — रूसी बोलना सीखें (Russian for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रूसी बोलना सीखें — रूस में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह रूसी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो रूस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "he", label: "हिब्रू", h1: "हिब्रू बोलना सीखें (Hebrew for Work — इज़राइल)", data: "/assets/kkb_he_data.js", out: "courses/hi/bhasha/hebrew/index.html",
    title: "ACS काम की भाषा — हिब्रू बोलना सीखें (Hebrew for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिब्रू बोलना सीखें — इज़राइल में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह हिब्रू बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इज़राइल में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hr", label: "क्रोएशियाई", h1: "क्रोएशियाई बोलना सीखें (Croatian for Work — क्रोएशिया)", data: "/assets/kkb_hr_data.js", out: "courses/hi/bhasha/croatian/index.html",
    title: "ACS काम की भाषा — क्रोएशियाई बोलना सीखें (Croatian for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क्रोएशियाई बोलना सीखें — क्रोएशिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह क्रोएशियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो क्रोएशिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sr", label: "सर्बियाई", h1: "सर्बियाई बोलना सीखें (Serbian for Work — सर्बिया)", data: "/assets/kkb_sr_data.js", out: "courses/hi/bhasha/serbian/index.html",
    title: "ACS काम की भाषा — सर्बियाई बोलना सीखें (Serbian for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सर्बियाई बोलना सीखें — सर्बिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह सर्बियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो सर्बिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mt", label: "माल्टीज़", h1: "माल्टीज़ बोलना सीखें (Maltese for Work — माल्टा)", data: "/assets/kkb_mt_data.js", out: "courses/hi/bhasha/maltese/index.html",
    title: "ACS काम की भाषा — माल्टीज़ बोलना सीखें (Maltese for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से माल्टीज़ बोलना सीखें — माल्टा में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह माल्टीज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो माल्टा में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lt", label: "लिथुआनियाई", h1: "लिथुआनियाई बोलना सीखें (Lithuanian for Work — लिथुआनिया)", data: "/assets/kkb_lt_data.js", out: "courses/hi/bhasha/lithuanian/index.html",
    title: "ACS काम की भाषा — लिथुआनियाई बोलना सीखें (Lithuanian for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लिथुआनियाई बोलना सीखें — लिथुआनिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह लिथुआनियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो लिथुआनिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fi", label: "फ़िनिश", h1: "फ़िनिश बोलना सीखें (Finnish for Work — फ़िनलैंड)", data: "/assets/kkb_fi_data.js", out: "courses/hi/bhasha/finnish/index.html",
    title: "ACS काम की भाषा — फ़िनिश बोलना सीखें (Finnish for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़िनिश बोलना सीखें — फ़िनलैंड में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह फ़िनिश बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो फ़िनलैंड में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sk", label: "स्लोवाक", h1: "स्लोवाक बोलना सीखें (Slovak for Work — स्लोवाकिया)", data: "/assets/kkb_sk_data.js", out: "courses/hi/bhasha/slovak/index.html",
    title: "ACS काम की भाषा — स्लोवाक बोलना सीखें (Slovak for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्लोवाक बोलना सीखें — स्लोवाकिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह स्लोवाक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो स्लोवाकिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ka", label: "जॉर्जियाई", h1: "जॉर्जियाई बोलना सीखें (Georgian for Work — जॉर्जिया)", data: "/assets/kkb_ka_data.js", out: "courses/hi/bhasha/georgian/index.html",
    title: "ACS काम की भाषा — जॉर्जियाई बोलना सीखें (Georgian for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जॉर्जियाई बोलना सीखें — जॉर्जिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह जॉर्जियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जॉर्जिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hy", label: "अर्मेनियाई", h1: "अर्मेनियाई बोलना सीखें (Armenian for Work — अर्मेनिया)", data: "/assets/kkb_hy_data.js", out: "courses/hi/bhasha/armenian/index.html",
    title: "ACS काम की भाषा — अर्मेनियाई बोलना सीखें (Armenian for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अर्मेनियाई बोलना सीखें — अर्मेनिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह अर्मेनियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो अर्मेनिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ti", label: "तिग्रीन्या", h1: "तिग्रीन्या बोलना सीखें (Tigrinya for Work — इरीट्रिया व इथियोपिया)", data: "/assets/kkb_ti_data.js", out: "courses/hi/bhasha/tigrinya/index.html",
    title: "ACS काम की भाषा — तिग्रीन्या बोलना सीखें (Tigrinya for Work, 500 वाक्य असली लिपि + देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तिग्रीन्या बोलना सीखें — इरीट्रिया व इथियोपिया में काम के लिए 500 वाक्य असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनुशंसित)",
    line1: "यह तिग्रीन्या बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इरीट्रिया व इथियोपिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gbm", label: "गढ़वाली", h1: "गढ़वाली बोलना सीखें (Garhwali for Work — गढ़वाल क्षेत्र, उत्तराखंड)", data: "/assets/kkb_gbm_data.js", out: "courses/hi/bhasha/garhwali/index.html",
    title: "ACS काम की भाषा — गढ़वाली बोलना सीखें (Garhwali for Work, उत्तराखंड, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गढ़वाली बोलना सीखें — गढ़वाल क्षेत्र (देहरादून, टिहरी, चमोली आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह गढ़वाली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो गढ़वाल-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kfy", label: "कुमाऊंनी", h1: "कुमाऊंनी बोलना सीखें (Kumaoni for Work — कुमाऊं क्षेत्र, उत्तराखंड)", data: "/assets/kkb_kfy_data.js", out: "courses/hi/bhasha/kumaoni/index.html",
    title: "ACS काम की भाषा — कुमाऊंनी बोलना सीखें (Kumaoni for Work, उत्तराखंड, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुमाऊंनी बोलना सीखें — कुमाऊं क्षेत्र (नैनीताल, अल्मोड़ा, पिथौरागढ़ आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कुमाऊंनी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कुमाऊं-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ur", label: "उर्दू", h1: "उर्दू बोलना सीखें (Urdu for Work)", data: "/assets/kkb_ur_data.js", out: "courses/hi/bhasha/urdu/index.html",
    title: "ACS काम की भाषा — उर्दू बोलना सीखें (Urdu for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उर्दू बोलना सीखें — काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह उर्दू बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो उर्दू-भाषी लोगों के साथ काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ml", label: "मलयालम", h1: "मलयालम बोलना सीखें (Malayalam for Work — केरल)", data: "/assets/kkb_ml_data.js", out: "courses/hi/bhasha/malayalam/index.html",
    title: "ACS काम की भाषा — मलयालम बोलना सीखें (Malayalam for Work, केरल, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मलयालम बोलना सीखें — केरल में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह मलयालम बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो केरल में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "or", label: "उड़िया", h1: "उड़िया बोलना सीखें (Odia for Work — ओडिशा)", data: "/assets/kkb_or_data.js", out: "courses/hi/bhasha/odia/index.html",
    title: "ACS काम की भाषा — उड़िया बोलना सीखें (Odia for Work, ओडिशा, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उड़िया बोलना सीखें — ओडिशा में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह उड़िया बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ओडिशा में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "brx", label: "बोडो", h1: "बोडो बोलना सीखें (Bodo for Work — असम, बोडोलैंड)", data: "/assets/kkb_brx_data.js", out: "courses/hi/bhasha/bodo/index.html",
    title: "ACS काम की भाषा — बोडो बोलना सीखें (Bodo for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बोडो बोलना सीखें — असम (बोडोलैंड) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (⚠️ अत्यधिक-प्रारंभिक मसौदा — native-speaker-जाँच निर्विवाद-अनिवार्य)",
    line1: "यह बोडो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो असम (बोडोलैंड) में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। ⚠️⚠️ यह सबसे शुरुआती मसौदा है — बोडो पर मेरा भरोसा संथाली/मणिपुरी से भी कम है, कृपया native-speaker से पूरी जाँच कराए बिना भरोसा न करें।" },
  { code: "awa", label: "अवधी", h1: "अवधी बोलना सीखें (Awadhi for Work — अवध क्षेत्र)", data: "/assets/kkb_awa_data.js", out: "courses/hi/bhasha/awadhi/index.html",
    title: "ACS काम की भाषा — अवधी बोलना सीखें (Awadhi for Work, अवध क्षेत्र, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अवधी बोलना सीखें — अवध क्षेत्र (लखनऊ, अयोध्या आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अवधी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो अवधी-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mag", label: "मगही", h1: "मगही बोलना सीखें (Magahi for Work — मगध क्षेत्र)", data: "/assets/kkb_mag_data.js", out: "courses/hi/bhasha/magahi/index.html",
    title: "ACS काम की भाषा — मगही बोलना सीखें (Magahi for Work, गया-पटना-नालंदा, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मगही बोलना सीखें — मगध क्षेत्र (गया, पटना, नालंदा आदि) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मगही बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मगही-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "si", label: "सिंहली", h1: "सिंहली बोलना सीखें (Sinhala for Work — श्रीलंका)", data: "/assets/kkb_si_data.js", out: "courses/hi/bhasha/sinhala/index.html",
    title: "ACS काम की भाषा — सिंहली बोलना सीखें (Sinhala for Work, श्रीलंका, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिंहली बोलना सीखें — श्रीलंका में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिंहली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो श्रीलंका में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ps", label: "पश्तो", h1: "पश्तो बोलना सीखें (Pashto for Work — अफ़ग़ानिस्तान/पाकिस्तान)", data: "/assets/kkb_ps_data.js", out: "courses/hi/bhasha/pashto/index.html",
    title: "ACS काम की भाषा — पश्तो बोलना सीखें (Pashto for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पश्तो बोलना सीखें — अफ़ग़ानिस्तान/पाकिस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पश्तो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पश्तो-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bal", label: "बलूची", h1: "बलूची बोलना सीखें (Balochi for Work — बलूचिस्तान)", data: "/assets/kkb_bal_data.js", out: "courses/hi/bhasha/balochi/index.html",
    title: "ACS काम की भाषा — बलूची बोलना सीखें (Balochi for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बलूची बोलना सीखें — बलूचिस्तान (पाकिस्तान/ईरान) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बलूची बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बलूची-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "prs", label: "दारी", h1: "दारी बोलना सीखें (Dari for Work — अफ़ग़ानिस्तान)", data: "/assets/kkb_prs_data.js", out: "courses/hi/bhasha/dari/index.html",
    title: "ACS काम की भाषा — दारी बोलना सीखें (Dari for Work, अफ़ग़ानिस्तान, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से दारी बोलना सीखें — अफ़ग़ानिस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह दारी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो अफ़ग़ानिस्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "vi", label: "वियतनामी", h1: "वियतनामी बोलना सीखें (Vietnamese for Work — वियतनाम)", data: "/assets/kkb_vi_data.js", out: "courses/hi/bhasha/vietnamese/index.html",
    title: "ACS काम की भाषा — वियतनामी बोलना सीखें (Vietnamese for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वियतनामी बोलना सीखें — वियतनाम में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह वियतनामी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वियतनाम में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "th", label: "थाई", h1: "थाई बोलना सीखें (Thai for Work — थाईलैंड)", data: "/assets/kkb_th_data.js", out: "courses/hi/bhasha/thai/index.html",
    title: "ACS काम की भाषा — थाई बोलना सीखें (Thai for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से थाई बोलना सीखें — थाईलैंड में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह थाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो थाईलैंड में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "my", label: "बर्मी", h1: "बर्मी बोलना सीखें (Burmese for Work — म्यांमार)", data: "/assets/kkb_my_data.js", out: "courses/hi/bhasha/burmese/index.html",
    title: "ACS काम की भाषा — बर्मी बोलना सीखें (Burmese for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बर्मी बोलना सीखें — म्यांमार में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बर्मी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो म्यांमार में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "km", label: "खमेर", h1: "खमेर बोलना सीखें (Khmer for Work — कंबोडिया)", data: "/assets/kkb_km_data.js", out: "courses/hi/bhasha/khmer/index.html",
    title: "ACS काम की भाषा — खमेर बोलना सीखें (Khmer for Work, कंबोडिया, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से खमेर बोलना सीखें — कंबोडिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह खमेर बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कंबोडिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lo", label: "लाओ", h1: "लाओ बोलना सीखें (Lao for Work — लाओस)", data: "/assets/kkb_lo_data.js", out: "courses/hi/bhasha/lao/index.html",
    title: "ACS काम की भाषा — लाओ बोलना सीखें (Lao for Work, लाओस, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लाओ बोलना सीखें — लाओस में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह लाओ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो लाओस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ms", label: "मलय", h1: "मलय बोलना सीखें (Malay for Work — मलेशिया)", data: "/assets/kkb_ms_data.js", out: "courses/hi/bhasha/malay/index.html",
    title: "ACS काम की भाषा — मलय बोलना सीखें (Malay for Work, मलेशिया, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मलय बोलना सीखें — मलेशिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मलय बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मलेशिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tl", label: "तागालोग", h1: "तागालोग बोलना सीखें (Tagalog for Work — फिलीपींस)", data: "/assets/kkb_tl_data.js", out: "courses/hi/bhasha/tagalog/index.html",
    title: "ACS काम की भाषा — तागालोग बोलना सीखें (Tagalog for Work, फिलीपींस, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तागालोग बोलना सीखें — फिलीपींस में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तागालोग बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो फिलीपींस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "su", label: "सुंडानी", h1: "सुंडानी बोलना सीखें (Sundanese for Work — इंडोनेशिया)", data: "/assets/kkb_su_data.js", out: "courses/hi/bhasha/sundanese/index.html",
    title: "ACS काम की भाषा — सुंडानी बोलना सीखें (Sundanese for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सुंडानी बोलना सीखें — इंडोनेशिया (पश्चिम जावा) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सुंडानी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इंडोनेशिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ceb", label: "सिबुआनो", h1: "सिबुआनो बोलना सीखें (Cebuano for Work — फ़िलीपींस)", data: "/assets/kkb_ceb_data.js", out: "courses/hi/bhasha/cebuano/index.html",
    title: "ACS काम की भाषा — सिबुआनो बोलना सीखें (Cebuano for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिबुआनो बोलना सीखें — फ़िलीपींस (सेबू) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिबुआनो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो फ़िलीपींस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mn", label: "मंगोलियाई", h1: "मंगोलियाई बोलना सीखें (Mongolian for Work — मंगोलिया)", data: "/assets/kkb_mn_data.js", out: "courses/hi/bhasha/mongolian/index.html",
    title: "ACS काम की भाषा — मंगोलियाई बोलना सीखें (Mongolian for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मंगोलियाई बोलना सीखें — मंगोलिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मंगोलियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मंगोलिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bo", label: "तिब्बती", h1: "तिब्बती बोलना सीखें (Tibetan for Work — तिब्बत)", data: "/assets/kkb_bo_data.js", out: "courses/hi/bhasha/tibetan/index.html",
    title: "ACS काम की भाषा — तिब्बती बोलना सीखें (Tibetan for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तिब्बती बोलना सीखें — तिब्बत में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तिब्बती बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तिब्बत में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yo", label: "योरूबा", h1: "योरूबा बोलना सीखें (Yoruba for Work — नाइजीरिया)", data: "/assets/kkb_yo_data.js", out: "courses/hi/bhasha/yoruba/index.html",
    title: "ACS काम की भाषा — योरूबा बोलना सीखें (Yoruba for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से योरूबा बोलना सीखें — नाइजीरिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह योरूबा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो नाइजीरिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ig", label: "इग्बो", h1: "इग्बो बोलना सीखें (Igbo for Work — नाइजीरिया)", data: "/assets/kkb_ig_data.js", out: "courses/hi/bhasha/igbo/index.html",
    title: "ACS काम की भाषा — इग्बो बोलना सीखें (Igbo for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इग्बो बोलना सीखें — नाइजीरिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह इग्बो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो नाइजीरिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zu", label: "ज़ुलु", h1: "ज़ुलु बोलना सीखें (Zulu for Work — दक्षिण अफ़्रीका)", data: "/assets/kkb_zu_data.js", out: "courses/hi/bhasha/zulu/index.html",
    title: "ACS काम की भाषा — ज़ुलु बोलना सीखें (Zulu for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ज़ुलु बोलना सीखें — दक्षिण अफ़्रीका में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ज़ुलु बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो दक्षिण अफ़्रीका में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "xh", label: "षोसा", h1: "षोसा बोलना सीखें (Xhosa for Work — दक्षिण अफ़्रीका)", data: "/assets/kkb_xh_data.js", out: "courses/hi/bhasha/xhosa/index.html",
    title: "ACS काम की भाषा — षोसा बोलना सीखें (Xhosa for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से षोसा बोलना सीखें — दक्षिण अफ़्रीका में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह षोसा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो दक्षिण अफ़्रीका में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "am", label: "अम्हारिक", h1: "अम्हारिक बोलना सीखें (Amharic for Work — इथियोपिया)", data: "/assets/kkb_am_data.js", out: "courses/hi/bhasha/amharic/index.html",
    title: "ACS काम की भाषा — अम्हारिक बोलना सीखें (Amharic for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अम्हारिक बोलना सीखें — इथियोपिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अम्हारिक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इथियोपिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "om", label: "ओरोमो", h1: "ओरोमो बोलना सीखें (Oromo for Work — इथियोपिया)", data: "/assets/kkb_om_data.js", out: "courses/hi/bhasha/oromo/index.html",
    title: "ACS काम की भाषा — ओरोमो बोलना सीखें (Oromo for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओरोमो बोलना सीखें — इथियोपिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ओरोमो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इथियोपिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "so", label: "सोमाली", h1: "सोमाली बोलना सीखें (Somali for Work — सोमालिया)", data: "/assets/kkb_so_data.js", out: "courses/hi/bhasha/somali/index.html",
    title: "ACS काम की भाषा — सोमाली बोलना सीखें (Somali for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सोमाली बोलना सीखें — सोमालिया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सोमाली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो सोमालिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mg", label: "मालागासी", h1: "मालागासी बोलना सीखें (Malagasy for Work — मेडागास्कर)", data: "/assets/kkb_mg_data.js", out: "courses/hi/bhasha/malagasy/index.html",
    title: "ACS काम की भाषा — मालागासी बोलना सीखें (Malagasy for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मालागासी बोलना सीखें — मेडागास्कर में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मालागासी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मेडागास्कर में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rw", label: "किन्यारवांडा", h1: "किन्यारवांडा बोलना सीखें (Kinyarwanda for Work — रवांडा)", data: "/assets/kkb_rw_data.js", out: "courses/hi/bhasha/kinyarwanda/index.html",
    title: "ACS काम की भाषा — किन्यारवांडा बोलना सीखें (Kinyarwanda for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किन्यारवांडा बोलना सीखें — रवांडा में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह किन्यारवांडा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो रवांडा में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tw", label: "अकान/त्वी", h1: "अकान/त्वी बोलना सीखें (Akan/Twi for Work — घाना)", data: "/assets/kkb_tw_data.js", out: "courses/hi/bhasha/twi/index.html",
    title: "ACS काम की भाषा — अकान/त्वी बोलना सीखें (Twi for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अकान/त्वी बोलना सीखें — घाना में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अकान/त्वी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो घाना में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fr", label: "फ़्रेंच", h1: "फ़्रेंच बोलना सीखें (French for Work — अफ़्रीकी फ्रेंच-भाषी देश)", data: "/assets/kkb_fr_data.js", out: "courses/hi/bhasha/french/index.html",
    title: "ACS काम की भाषा — फ़्रेंच बोलना सीखें (French for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़्रेंच बोलना सीखें — पश्चिम व मध्य अफ़्रीका के फ्रेंच-भाषी देशों में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह फ़्रेंच बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो अफ़्रीका के फ्रेंच-भाषी देशों में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "af", label: "अफ़्रीकांस", h1: "अफ़्रीकांस बोलना सीखें (Afrikaans for Work — दक्षिण अफ़्रीका)", data: "/assets/kkb_af_data.js", out: "courses/hi/bhasha/afrikaans/index.html",
    title: "ACS काम की भाषा — अफ़्रीकांस बोलना सीखें (Afrikaans for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अफ़्रीकांस बोलना सीखें — दक्षिण अफ़्रीका में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अफ़्रीकांस बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो दक्षिण अफ़्रीका में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lg", label: "लुगांडा", h1: "लुगांडा बोलना सीखें (Luganda for Work — युगांडा)", data: "/assets/kkb_lg_data.js", out: "courses/hi/bhasha/luganda/index.html",
    title: "ACS काम की भाषा — लुगांडा बोलना सीखें (Luganda for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लुगांडा बोलना सीखें — युगांडा में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह लुगांडा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो युगांडा में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ny", label: "चिचेवा", h1: "चिचेवा बोलना सीखें (Chichewa for Work — मलावी)", data: "/assets/kkb_ny_data.js", out: "courses/hi/bhasha/chichewa/index.html",
    title: "ACS काम की भाषा — चिचेवा बोलना सीखें (Chichewa for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चिचेवा बोलना सीखें — मलावी में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह चिचेवा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मलावी में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ku", label: "कुर्दिश", h1: "कुर्दिश बोलना सीखें (Kurdish for Work — कुर्मांजी)", data: "/assets/kkb_ku_data.js", out: "courses/hi/bhasha/kurdish/index.html",
    title: "ACS काम की भाषा — कुर्दिश बोलना सीखें (Kurdish for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुर्दिश बोलना सीखें — कुर्दिश-भाषी क्षेत्रों में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कुर्दिश बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कुर्दिश-भाषी क्षेत्रों में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "uz", label: "उज़्बेक", h1: "उज़्बेक बोलना सीखें (Uzbek for Work — उज़्बेकिस्तान)", data: "/assets/kkb_uz_data.js", out: "courses/hi/bhasha/uzbek/index.html",
    title: "ACS काम की भाषा — उज़्बेक बोलना सीखें (Uzbek for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उज़्बेक बोलना सीखें — उज़्बेकिस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह उज़्बेक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो उज़्बेकिस्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kk", label: "कज़ाख", h1: "कज़ाख बोलना सीखें (Kazakh for Work — कज़ाख़स्तान)", data: "/assets/kkb_kk_data.js", out: "courses/hi/bhasha/kazakh/index.html",
    title: "ACS काम की भाषा — कज़ाख बोलना सीखें (Kazakh for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कज़ाख बोलना सीखें — कज़ाख़स्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कज़ाख बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कज़ाख़स्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "az", label: "अज़रबैजानी", h1: "अज़रबैजानी बोलना सीखें (Azerbaijani for Work — अज़रबैजान)", data: "/assets/kkb_az_data.js", out: "courses/hi/bhasha/azerbaijani/index.html",
    title: "ACS काम की भाषा — अज़रबैजानी बोलना सीखें (Azerbaijani for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अज़रबैजानी बोलना सीखें — अज़रबैजान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अज़रबैजानी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो अज़रबैजान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tg", label: "ताजिक", h1: "ताजिक बोलना सीखें (Tajik for Work — ताजिकिस्तान)", data: "/assets/kkb_tg_data.js", out: "courses/hi/bhasha/tajik/index.html",
    title: "ACS काम की भाषा — ताजिक बोलना सीखें (Tajik for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ताजिक बोलना सीखें — ताजिकिस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ताजिक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ताजिकिस्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ky", label: "किर्गिज़", h1: "किर्गिज़ बोलना सीखें (Kyrgyz for Work — किर्गिज़स्तान)", data: "/assets/kkb_ky_data.js", out: "courses/hi/bhasha/kyrgyz/index.html",
    title: "ACS काम की भाषा — किर्गिज़ बोलना सीखें (Kyrgyz for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किर्गिज़ बोलना सीखें — किर्गिज़स्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह किर्गिज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो किर्गिज़स्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ug", label: "उइघुर", h1: "उइघुर बोलना सीखें (Uyghur for Work)", data: "/assets/kkb_ug_data.js", out: "courses/hi/bhasha/uyghur/index.html",
    title: "ACS काम की भाषा — उइघुर बोलना सीखें (Uyghur for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उइघुर बोलना सीखें — 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह उइघुर बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ht", label: "हाईटियन क्रियोल", h1: "हाईटियन क्रियोल बोलना सीखें (Haitian Creole for Work — हैती)", data: "/assets/kkb_ht_data.js", out: "courses/hi/bhasha/haitian-creole/index.html",
    title: "ACS काम की भाषा — हाईटियन क्रियोल बोलना सीखें (Haitian Creole for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हाईटियन क्रियोल बोलना सीखें — हैती में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हाईटियन क्रियोल बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हैती में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gn", label: "गुआरानी", h1: "गुआरानी बोलना सीखें (Guarani for Work — पैराग्वे)", data: "/assets/kkb_gn_data.js", out: "courses/hi/bhasha/guarani/index.html",
    title: "ACS काम की भाषा — गुआरानी बोलना सीखें (Guarani for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गुआरानी बोलना सीखें — पैराग्वे में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह गुआरानी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पैराग्वे में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "qu", label: "क्वेशुआ", h1: "क्वेशुआ बोलना सीखें (Quechua for Work — पेरू/बोलीविया)", data: "/assets/kkb_qu_data.js", out: "courses/hi/bhasha/quechua/index.html",
    title: "ACS काम की भाषा — क्वेशुआ बोलना सीखें (Quechua for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क्वेशुआ बोलना सीखें — पेरू व बोलीविया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह क्वेशुआ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पेरू व बोलीविया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ay", label: "आयमारा", h1: "आयमारा बोलना सीखें (Aymara for Work — बोलीविया)", data: "/assets/kkb_ay_data.js", out: "courses/hi/bhasha/aymara/index.html",
    title: "ACS काम की भाषा — आयमारा बोलना सीखें (Aymara for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से आयमारा बोलना सीखें — बोलीविया में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह आयमारा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बोलीविया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "myn", label: "मायन", h1: "मायन बोलना सीखें (Yucatec Maya for Work — मैक्सिको)", data: "/assets/kkb_myn_data.js", out: "courses/hi/bhasha/mayan/index.html",
    title: "ACS काम की भाषा — मायन बोलना सीखें (Yucatec Maya for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मायन (Yucatec Maya) बोलना सीखें — मैक्सिको में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मायन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मैक्सिको में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "anp", label: "अंगिका", h1: "अंगिका बोलना सीखें (Angika for Work — बिहार)", data: "/assets/kkb_anp_data.js", out: "courses/hi/bhasha/angika/index.html",
    title: "ACS काम की भाषा — अंगिका बोलना सीखें (Angika for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अंगिका बोलना सीखें — भागलपुर-मुंगेर-पूर्णिया पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अंगिका बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बिहार के भागलपुर-मुंगेर-पूर्णिया क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sjp", label: "सुरजापुरी", h1: "सुरजापुरी बोलना सीखें (Surjapuri for Work — बिहार-सीमांचल)", data: "/assets/kkb_sjp_data.js", out: "courses/hi/bhasha/surjapuri/index.html",
    title: "ACS काम की भाषा — सुरजापुरी बोलना सीखें (Surjapuri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सुरजापुरी बोलना सीखें — किशनगंज-पूर्णिया-कटिहार-अररिया पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सुरजापुरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बिहार के सीमांचल (किशनगंज-पूर्णिया-कटिहार-अररिया) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "khr", label: "खोरठा", h1: "खोरठा बोलना सीखें (Khortha for Work — झारखंड)", data: "/assets/kkb_khr_data.js", out: "courses/hi/bhasha/khortha/index.html",
    title: "ACS काम की भाषा — खोरठा बोलना सीखें (Khortha for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से खोरठा बोलना सीखें — धनबाद-बोकारो-हज़ारीबाग़-गिरिडीह पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह खोरठा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो झारखंड के धनबाद-बोकारो-हज़ारीबाग़-गिरिडीह-रामगढ़ क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sck", label: "सादरी", h1: "सादरी बोलना सीखें (Sadri for Work — झारखंड)", data: "/assets/kkb_sck_data.js", out: "courses/hi/bhasha/sadri/index.html",
    title: "ACS काम की भाषा — सादरी बोलना सीखें (Sadri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सादरी/नागपुरी बोलना सीखें — राँची-गुमला-खूँटी-सिमडेगा पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सादरी (नागपुरी) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो झारखंड के राँची-गुमला-खूँटी-सिमडेगा क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kyw", label: "कुरमाली", h1: "कुरमाली बोलना सीखें (Kurmali for Work — झारखंड-बंगाल सीमा)", data: "/assets/kkb_kyw_data.js", out: "courses/hi/bhasha/kurmali/index.html",
    title: "ACS काम की भाषा — कुरमाली बोलना सीखें (Kurmali for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुरमाली बोलना सीखें — धनबाद-पुरुलिया-बांकुड़ा-मयूरभंज पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कुरमाली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो झारखंड-बंगाल-ओडिशा सीमा (धनबाद-पुरुलिया-बांकुड़ा-मयूरभंज) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bns", label: "बुंदेली", h1: "बुंदेली बोलना सीखें (Bundeli for Work — बुंदेलखंड)", data: "/assets/kkb_bns_data.js", out: "courses/hi/bhasha/bundeli/index.html",
    title: "ACS काम की भाषा — बुंदेली बोलना सीखें (Bundeli for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बुंदेली बोलना सीखें — झाँसी-सागर-छतरपुर-टीकमगढ़ पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बुंदेली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बुंदेलखंड (झाँसी-सागर-छतरपुर-टीकमगढ़-दमोह) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bfy", label: "बघेली", h1: "बघेली बोलना सीखें (Bagheli for Work — रीवा-सतना)", data: "/assets/kkb_bfy_data.js", out: "courses/hi/bhasha/bagheli/index.html",
    title: "ACS काम की भाषा — बघेली बोलना सीखें (Bagheli for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बघेली बोलना सीखें — रीवा-सतना-सीधी-शहडोल पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बघेली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मध्यप्रदेश के रीवा-सतना-सीधी-शहडोल क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bra", label: "ब्रजभाषा", h1: "ब्रजभाषा बोलना सीखें (Brajbhasha for Work — मथुरा-आगरा)", data: "/assets/kkb_bra_data.js", out: "courses/hi/bhasha/brajbhasha/index.html",
    title: "ACS काम की भाषा — ब्रजभाषा बोलना सीखें (Brajbhasha for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ब्रजभाषा बोलना सीखें — मथुरा-आगरा-अलीगढ़-एटा पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ब्रजभाषा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो उत्तरप्रदेश के मथुरा-आगरा-अलीगढ़-एटा क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mal", label: "मालवी", h1: "मालवी बोलना सीखें (Malvi for Work — मालवा)", data: "/assets/kkb_mal_data.js", out: "courses/hi/bhasha/malvi/index.html",
    title: "ACS काम की भाषा — मालवी बोलना सीखें (Malvi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मालवी बोलना सीखें — इंदौर-उज्जैन-रतलाम-मंदसौर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मालवी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मालवा (इंदौर-उज्जैन-रतलाम-मंदसौर) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nim", label: "निमाड़ी", h1: "निमाड़ी बोलना सीखें (Nimadi for Work — निमाड़)", data: "/assets/kkb_nim_data.js", out: "courses/hi/bhasha/nimadi/index.html",
    title: "ACS काम की भाषा — निमाड़ी बोलना सीखें (Nimadi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से निमाड़ी बोलना सीखें — खरगोन-बड़वानी-खंडवा-बुरहानपुर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह निमाड़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो निमाड़ (खरगोन-बड़वानी-खंडवा-बुरहानपुर) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mtr", label: "मेवाड़ी", h1: "मेवाड़ी बोलना सीखें (Mewari for Work — उदयपुर-चित्तौड़)", data: "/assets/kkb_mtr_data.js", out: "courses/hi/bhasha/mewari/index.html",
    title: "ACS काम की भाषा — मेवाड़ी बोलना सीखें (Mewari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मेवाड़ी बोलना सीखें — उदयपुर-चित्तौड़गढ़-राजसमंद-भीलवाड़ा पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मेवाड़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मेवाड़ (उदयपुर-चित्तौड़गढ़-राजसमंद-भीलवाड़ा) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dhu", label: "ढूँढाड़ी", h1: "ढूँढाड़ी बोलना सीखें (Dhundhari for Work — जयपुर)", data: "/assets/kkb_dhu_data.js", out: "courses/hi/bhasha/dhundhari/index.html",
    title: "ACS काम की भाषा — ढूँढाड़ी बोलना सीखें (Dhundhari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ढूँढाड़ी बोलना सीखें — जयपुर-अजमेर-टोंक-दौसा पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ढूँढाड़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ढूँढाड़ (जयपुर-अजमेर-टोंक-दौसा) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hdt", label: "हाड़ौती", h1: "हाड़ौती बोलना सीखें (Hadoti for Work — कोटा-बूँदी)", data: "/assets/kkb_hdt_data.js", out: "courses/hi/bhasha/hadoti/index.html",
    title: "ACS काम की भाषा — हाड़ौती बोलना सीखें (Hadoti for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हाड़ौती बोलना सीखें — कोटा-बूँदी-बारां-झालावाड़ पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हाड़ौती बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हाड़ौती (कोटा-बूँदी-बारां-झालावाड़) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bgr", label: "बागड़ी", h1: "बागड़ी बोलना सीखें (Bagri for Work — बीकानेर-गंगानगर)", data: "/assets/kkb_bgr_data.js", out: "courses/hi/bhasha/bagri/index.html",
    title: "ACS काम की भाषा — बागड़ी बोलना सीखें (Bagri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बागड़ी बोलना सीखें — बीकानेर-गंगानगर-हनुमानगढ़ पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बागड़ी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बागड़ (बीकानेर-गंगानगर-हनुमानगढ़) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mtw", label: "मेवाती", h1: "मेवाती बोलना सीखें (Mewati for Work — अलवर-भरतपुर)", data: "/assets/kkb_mtw_data.js", out: "courses/hi/bhasha/mewati/index.html",
    title: "ACS काम की भाषा — मेवाती बोलना सीखें (Mewati for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मेवाती बोलना सीखें — अलवर-भरतपुर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मेवाती बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो राजस्थान-हरियाणा सीमा (अलवर-भरतपुर) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bsn", label: "बिश्नोई", h1: "बिश्नोई बोलना सीखें (Bishnoi for Work — बीकानेर-जोधपुर)", data: "/assets/kkb_bsn_data.js", out: "courses/hi/bhasha/bishnoi/index.html",
    title: "ACS काम की भाषा — बिश्नोई बोलना सीखें (Bishnoi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बिश्नोई बोलना सीखें — बीकानेर-जोधपुर-नागौर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बिश्नोई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पश्चिम-राजस्थान (बीकानेर-जोधपुर-नागौर) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lri", label: "लरिया", h1: "लरिया बोलना सीखें (Lariya for Work — रायगढ़-जशपुर)", data: "/assets/kkb_lri_data.js", out: "courses/hi/bhasha/lariya/index.html",
    title: "ACS काम की भाषा — लरिया बोलना सीखें (Lariya for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लरिया बोलना सीखें — रायगढ़-जशपुर-सरगुजा पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह लरिया बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो छत्तीसगढ़-ओडिशा सीमा (रायगढ़-जशपुर-सरगुजा) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pwr", label: "पवारी", h1: "पवारी बोलना सीखें (Pawari for Work — बालाघाट-सिवनी)", data: "/assets/kkb_pwr_data.js", out: "courses/hi/bhasha/pawari/index.html",
    title: "ACS काम की भाषा — पवारी बोलना सीखें (Pawari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पवारी बोलना सीखें — बालाघाट-सिवनी-भंडारा-गोंदिया पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पवारी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मध्यप्रदेश-महाराष्ट्र सीमा (बालाघाट-सिवनी-भंडारा-गोंदिया) क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gjr", label: "गोजरी", h1: "गोजरी बोलना सीखें (Gojri for Work — गुज्जर-समुदाय)", data: "/assets/kkb_gjr_data.js", out: "courses/hi/bhasha/gojri/index.html",
    title: "ACS काम की भाषा — गोजरी बोलना सीखें (Gojri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गोजरी बोलना सीखें — जम्मू-हिमाचल-उत्तराखंड गुज्जर-पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह गोजरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जम्मू-हिमाचल-उत्तराखंड के गुज्जर-समुदाय क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lmn", label: "बंजारी", h1: "बंजारी बोलना सीखें (Lambadi for Work — बंजारा समुदाय)", data: "/assets/kkb_lmn_data.js", out: "courses/hi/bhasha/lambadi/index.html",
    title: "ACS काम की भाषा — बंजारी बोलना सीखें (Lambadi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बंजारी/लमाणी बोलना सीखें — बहु-राज्य बंजारा-समुदाय में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बंजारी (लमाणी) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बहु-राज्य घुमंतू बंजारा-समुदाय के साथ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kgr", label: "कांगड़ी", h1: "कांगड़ी बोलना सीखें (Kangri for Work — कांगड़ा-हमीरपुर)", data: "/assets/kkb_kgr_data.js", out: "courses/hi/bhasha/kangri/index.html",
    title: "ACS काम की भाषा — कांगड़ी बोलना सीखें (Kangri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कांगड़ी बोलना सीखें — कांगड़ा-हमीरपुर-ऊना पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कांगड़ी की सिर्फ़ सर्वनाम (मैं/असाँ/तू/तुसाँ/सै), प्रश्न-शब्द (कब/कहाँ/कैसे) और कुछ विभक्ति-प्रत्यय (को/से/में) का ही भरोसेमंद स्रोत (Wikipedia) मिला — क्रिया-रूप (है/हूँ/था आदि) का स्रोत नहीं मिला, वे हिंदी-जैसे ही रखे गए हैं। यह कोर्स शुरुआती-परिचय-मात्र है, पूरी बोली नहीं — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "mjl", label: "मंडयाली", h1: "मंडयाली बोलना सीखें (Mandeali for Work — मंडी ज़िला)", data: "/assets/kkb_mjl_data.js", out: "courses/hi/bhasha/mandeali/index.html",
    title: "ACS काम की भाषा — मंडयाली बोलना सीखें (Mandeali for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मंडयाली बोलना सीखें — हिमाचल के मंडी ज़िले में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: मंडयाली की सर्वनाम (हाऊँ/आस्से/तू/तुस्से), प्रश्न-शब्द (केथी/की/किह्याँ) और विभक्ति-प्रत्यय (जो/ले/मंझ/कठे आदि) का भरोसेमंद स्रोत (Wikipedia) मिला — पूरा क्रिया-काल तंत्र नहीं मिला, बाक़ी वाक्य-रचना हिंदी-जैसी ही रखी गई है। यह शुरुआती-परिचय है, पूरी बोली नहीं — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "cdh", label: "चम्बियाली", h1: "चम्बियाली बोलना सीखें (Chambeali for Work — चंबा ज़िला)", data: "/assets/kkb_cdh_data.js", out: "courses/hi/bhasha/chambeali/index.html",
    title: "ACS काम की भाषा — चम्बियाली बोलना सीखें (Chambeali for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चम्बियाली बोलना सीखें — हिमाचल के चंबा ज़िले में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: चम्बियाली की अपनी pronoun-तालिका नहीं मिली — यह कोर्स मंडयाली से इसकी 83% शब्दावली-समानता (Ethnologue-दर्ज) के आधार पर बना है। क्रिया-काल तंत्र अपुष्ट; वाक्य-रचना का बड़ा भाग हिंदी-जैसा है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "gbk", label: "गद्दी", h1: "गद्दी बोलना सीखें (Gaddi for Work — चंबा-भरमौर)", data: "/assets/kkb_gbk_data.js", out: "courses/hi/bhasha/gaddi/index.html",
    title: "ACS काम की भाषा — गद्दी बोलना सीखें (Gaddi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गद्दी बोलना सीखें — हिमाचल के चंबा-भरमौर क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: गद्दी पर 2026 की एक नई शोध-पुस्तक (UCL Press, खुली-पहुँच) है, पर उसकी पूरी pronoun/क्रिया-तालिका तक पहुँच नहीं बन पाई — सिर्फ़ एक पुष्ट तथ्य मिला: \"नहीं\" = \"नी\"। बाक़ी वाक्य-रचना पड़ोसी चम्बियाली-बोली (वही ज़िला) के अनुमान पर आधारित है, गद्दी-विशिष्ट नहीं। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "cdj", label: "चुराही", h1: "चुराही बोलना सीखें (Churahi for Work — चुराह-सलूणी)", data: "/assets/kkb_cdj_data.js", out: "courses/hi/bhasha/churahi/index.html",
    title: "ACS काम की भाषा — चुराही बोलना सीखें (Churahi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चुराही बोलना सीखें — हिमाचल के चुराह-सलूणी क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: चुराही की अपनी pronoun-तालिका नहीं मिली — यह कोर्स मंडयाली से इसकी 90% शब्दावली-समानता (Ethnologue-दर्ज, सबसे उच्च में से एक) के आधार पर बना है। क्रिया-काल तंत्र अपुष्ट; वाक्य-रचना का बड़ा भाग हिंदी-जैसा है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "bhd", label: "भद्रवाही", h1: "भद्रवाही बोलना सीखें (Bhadarwahi for Work — भद्रवाह)", data: "/assets/kkb_bhd_data.js", out: "courses/hi/bhasha/bhadarwahi/index.html",
    title: "ACS काम की भाषा — भद्रवाही बोलना सीखें (Bhadarwahi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से भद्रवाही बोलना सीखें — जम्मू-हिमाचल सीमा (भद्रवाह) क्षेत्र में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: भद्रवाही की अपनी pronoun-तालिका नहीं मिली — Wikipedia भद्रवाही को चुराही से \"closely related\" बताता है (सटीक % नहीं दिया), इसलिए यह चुराही-chain (मंडयाली-मूल) पर आधारित दोहरा-अनुमान है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "hii", label: "हंडूरी", h1: "हंडूरी बोलना सीखें (Hinduri for Work — सोलन)", data: "/assets/kkb_hii_data.js", out: "courses/hi/bhasha/hinduri/index.html",
    title: "ACS काम की भाषा — हंडूरी बोलना सीखें (Hinduri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हंडूरी बोलना सीखें — हिमाचल के सोलन ज़िले (नालागढ़-रामशहर) में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: हंडूरी की हिंदी से 64% शब्दावली-समानता ख़ुद Ethnologue-दर्ज तथ्य है (बाक़ी पहाड़ी-भाषाओं से भी ज़्यादा हिंदी-निकट) — इसलिए इसमें बाक़ी सीमित-भाषाओं से भी कम बदलाव हैं, गढ़ा नहीं। सिर्फ़ कुछ पुष्ट-भिन्नता (नहीं→नाँय, है→छे) बदली गई है। स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "jns", label: "जौनसारी", h1: "जौनसारी बोलना सीखें (Jaunsari for Work — जौनसार-बावर)", data: "/assets/kkb_jns_data.js", out: "courses/hi/bhasha/jaunsari/index.html",
    title: "ACS काम की भाषा — जौनसारी बोलना सीखें (Jaunsari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जौनसारी बोलना सीखें — उत्तराखंड के जौनसार-बावर क्षेत्र में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ बहुत-सीमित-शब्दावली कोर्स: जौनसारी Central-Pahari परिवार की है (हिंदी/राजस्थानी से मौलिक रूप से अलग)। SIL के 2008 सर्वेक्षण से सिर्फ़ pronoun-तालिका (मैं/तू/ओ/इ और -का/-के प्रत्यय) मिली — कोई क्रिया-काल/copula-रूप नहीं मिला, इसलिए बाक़ी वाक्य-रचना हिंदी-जैसी ही है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "srx", label: "सिरमौरी", h1: "सिरमौरी बोलना सीखें (Sirmauri for Work — सिरमौर)", data: "/assets/kkb_srx_data.js", out: "courses/hi/bhasha/sirmauri/index.html",
    title: "ACS काम की भाषा — सिरमौरी बोलना सीखें (Sirmauri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिरमौरी बोलना सीखें — हिमाचल के सिरमौर ज़िले में काम के लिए 500 वाक्य। मुफ़्त। (बहुत-सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ बहुत-सीमित-शब्दावली कोर्स: सिरमौरी की अपनी pronoun-तालिका नहीं मिली — Wikipedia कहता है दक्षिण शिमला में केओंठली और सिरमौरी एक जैसी ही बोली जाती हैं, इसलिए यह केओंठली-pronoun/प्रश्न-शब्द (आऊं/हामे/कदी/केथी आदि) पर आधारित है, सिरमौरी-विशिष्ट नहीं। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },
  { code: "him", label: "हिमाचली (सामान्य)", h1: "हिमाचली बोलना सीखें (Himachali for Work — सामान्य-परिचय)", data: "/assets/kkb_him_data.js", out: "courses/hi/bhasha/himachali/index.html",
    title: "ACS काम की भाषा — हिमाचली बोलना सीखें (Himachali for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिमाचली-सामान्य शब्द सीखें — हिमाचल प्रदेश में काम के लिए 500 वाक्य। मुफ़्त। (सामान्य-परिचय कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ ज़रूरी नोट: \"हिमाचली\" कोई एक भाषा नहीं है — यह कांगड़ी, मंडयाली, चम्बियाली, गद्दी जैसी कई अलग-अलग बोलियों का सामान्य-नाम है (Wikipedia इन सभी को \"commonly clubbed as Himachali\" बताता है)। यह कोर्स मंडयाली (सबसे व्यापक-दस्तावेज़ीकृत बोली) पर आधारित एक सामान्य-परिचय है — अपने इलाक़े की विशिष्ट बोली के लिए ऊपर की अलग-अलग बोली-कोर्स देखें, और स्थानीय वक्ता से ज़रूर सीखें।" },

  { code: "gwr", label: "गावरी", h1: "गावरी बोलना सीखें (Gawari for Work — हिमाचल-उत्तराखंड सीमा)", data: "/assets/kkb_gwr_data.js", out: "courses/hi/bhasha/gawari/index.html",
    title: "ACS काम की भाषा — गावरी बोलना सीखें (Gawari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गावरी बोलना सीखें — हिमाचल-उत्तराखंड सीमा-क्षेत्र में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: गावरी की अपनी pronoun-तालिका नहीं मिली — यह उसी Central-Pahari क्षेत्र की नागपुरी(गढ़वाल)-बोली के पुष्ट pronoun+case-तालिका पर आधारित है, जो जौनसारी-सिरमौरी से 58-61% समान दर्ज है। गावरी-विशिष्ट नहीं — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "bjj", label: "बज्जिका", h1: "बज्जिका बोलना सीखें (Bajjika for Work — बिहार)", data: "/assets/kkb_bjj_data.js", out: "courses/hi/bhasha/bajjika/index.html",
    title: "ACS काम की भाषा — बज्जिका बोलना सीखें (Bajjika for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बज्जिका बोलना सीखें — वैशाली-मुज़फ़्फ़रपुर-सीतामढ़ी पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बज्जिका बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बिहार के वैशाली-मुज़फ़्फ़रपुर क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kru", label: "कुरुख़", h1: "कुरुख़ बोलना सीखें (Kurukh for Work — झारखंड-बंगाल)", data: "/assets/kkb_kru_data.js", out: "courses/hi/bhasha/kurukh/index.html",
    title: "ACS काम की भाषा — कुरुख़ बोलना सीखें (Kurukh for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुरुख़ (ओरांव) बोलना सीखें — झारखंड-बिहार-बंगाल-मप्र सीमा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कुरुख़ (ओरांव) बोलने का कोर्स है — द्रविड़-भाषा-परिवार की सबसे बड़ी उत्तर-भारतीय भाषा (13-17 लाख बोलने वाले), झारखंड-पश्चिमबंगाल में आधिकारिक-लिपि का दर्जा प्राप्त। हिंदी जानने वालों के लिए, जो Chotanagpur पठार क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "bhb", label: "भीली", h1: "भीली बोलना सीखें (Bhili for Work — जनजातीय पट्टी)", data: "/assets/kkb_bhb_data.js", out: "courses/hi/bhasha/bhili/index.html",
    title: "ACS काम की भाषा — भीली बोलना सीखें (Bhili for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से भीली बोलना सीखें — राजस्थान-गुजरात-मध्यप्रदेश जनजातीय पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह भीली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो राजस्थान-गुजरात-मध्यप्रदेश के जनजातीय क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "uki", label: "कुई", h1: "कुई बोलना सीखें (Kui for Work — ओडिशा)", data: "/assets/kkb_uki_data.js", out: "courses/hi/bhasha/kui/index.html",
    title: "ACS काम की भाषा — कुई बोलना सीखें (Kui for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुई बोलना सीखें — ओडिशा-आंध्रप्रदेश में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कुई Dravidian-भाषा-परिवार की दूसरी-सबसे-बड़ी (9.4 लाख बोलने वाले, Khond/Kandha समुदाय) भाषा है, मुख्य-लिपि ओड़िया है। सिर्फ़ कुछ पुष्ट शब्द (मैं=ना, postposition) मिले — बाक़ी हिंदी-जैसा है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "tcy", label: "तुलु", h1: "तुलु बोलना सीखें (Tulu for Work — तटीय कर्नाटक)", data: "/assets/kkb_tcy_data.js", out: "courses/hi/bhasha/tulu/index.html",
    title: "ACS काम की भाषा — तुलु बोलना सीखें (Tulu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुलु बोलना सीखें — मंगलौर-उडुपी क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तुलु बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तटीय कर्नाटक में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kff", label: "कोया", h1: "कोया बोलना सीखें (Koya for Work — आंध्र-तेलंगाना-छत्तीसगढ़)", data: "/assets/kkb_kff_data.js", out: "courses/hi/bhasha/koya/index.html",
    title: "ACS काम की भाषा — कोया बोलना सीखें (Koya for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोया बोलना सीखें — आंध्रप्रदेश-तेलंगाना-छत्तीसगढ़-ओडिशा में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कोया गोंडी-कुई समूह की भाषा है (3.6 लाख बोलने वाले, Koya जनजाति)। SIL सर्वेक्षण-नमूने से \"नन्ना\"(मैं/मेरा) मिला, बाक़ी pronoun भाषाविज्ञान के प्रामाणिक Proto-Dravidian पुनर्निर्माण (Britannica) पर आधारित हैं — आधुनिक-कोया का सीधा दावा नहीं। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "gon", label: "गोंडी", h1: "गोंडी बोलना सीखें (Gondi for Work — गोंड जनजातीय पट्टी)", data: "/assets/kkb_gon_data.js", out: "courses/hi/bhasha/gondi/index.html",
    title: "ACS काम की भाषा — गोंडी बोलना सीखें (Gondi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गोंडी बोलना सीखें — मध्यप्रदेश-महाराष्ट्र-छत्तीसगढ़ गोंड-पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह गोंडी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो गोंड जनजातीय क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kxv", label: "कुवि", h1: "कुवि बोलना सीखें (Kuvi for Work — ओडिशा-आंध्र)", data: "/assets/kkb_kxv_data.js", out: "courses/hi/bhasha/kuvi/index.html",
    title: "ACS काम की भाषा — कुवि बोलना सीखें (Kuvi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुवि बोलना सीखें — ओडिशा-आंध्रप्रदेश में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कुवि की अपनी pronoun-तालिका नहीं मिली — Wikipedia इसे कुई से \"closely related\" बताता है (Kuvi-Kandha समुदाय), इसलिए यह कुई-आधार पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "pnb", label: "पश्चिमी पंजाबी", h1: "पश्चिमी पंजाबी बोलना सीखें (Western Punjabi/Lahnda for Work)", data: "/assets/kkb_pnb_data.js", out: "courses/hi/bhasha/western-punjabi/index.html",
    title: "ACS काम की भाषा — पश्चिमी पंजाबी बोलना सीखें (Western Punjabi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पश्चिमी पंजाबी/लहंदा बोलना सीखें — पाकिस्तानी पंजाब में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पश्चिमी पंजाबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kfa", label: "कोडव", h1: "कोडव बोलना सीखें (Kodava for Work — कोडगु/कुर्ग)", data: "/assets/kkb_kfa_data.js", out: "courses/hi/bhasha/kodava/index.html",
    title: "ACS काम की भाषा — कोडव बोलना सीखें (Kodava for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोडव (कोर्गी) बोलना सीखें — कर्नाटक के कोडगु (कुर्ग) ज़िले में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोडव (कोर्गी) बोलने का कोर्स है — South Dravidian परिवार की स्वतंत्र साहित्यिक-भाषा (1.1 लाख बोलने वाले), अपनी Academy है। हिंदी जानने वालों के लिए, जो कर्नाटक के कोडगु ज़िले में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "skr", label: "सराइकी", h1: "सराइकी बोलना सीखें (Saraiki for Work — मुल्तान-बहावलपुर)", data: "/assets/kkb_skr_data.js", out: "courses/hi/bhasha/saraiki/index.html",
    title: "ACS काम की भाषा — सराइकी बोलना सीखें (Saraiki for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सराइकी बोलना सीखें — मुल्तान-बहावलपुर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सराइकी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kfj", label: "कोंडा", h1: "कोंडा बोलना सीखें (Konda for Work — आंध्र-ओडिशा)", data: "/assets/kkb_kfj_data.js", out: "courses/hi/bhasha/konda/index.html",
    title: "ACS काम की भाषा — कोंडा बोलना सीखें (Konda for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोंडा बोलना सीखें — आंध्रप्रदेश-ओडिशा में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कोंडा की अपनी pronoun-तालिका नहीं मिली (सिर्फ़ noun-case-मार्कर) — यह Konda-Kui समूह वर्गीकरण (Wikipedia) के आधार पर कुई-निकटता से बना है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "syl", label: "सिल्हटी", h1: "सिल्हटी बोलना सीखें (Sylheti for Work — सिलहट-कछाड़)", data: "/assets/kkb_syl_data.js", out: "courses/hi/bhasha/sylheti/index.html",
    title: "ACS काम की भाषा — सिल्हटी बोलना सीखें (Sylheti for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिल्हटी बोलना सीखें — सिलहट-कछाड़ पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिल्हटी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kmj", label: "माल्टो", h1: "माल्टो बोलना सीखें (Malto for Work — बिहार-बंगाल-झारखंड)", data: "/assets/kkb_kmj_data.js", out: "courses/hi/bhasha/malto/index.html",
    title: "ACS काम की भाषा — माल्टो बोलना सीखें (Malto for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से माल्टो बोलना सीखें — बिहार-झारखंड-बंगाल सीमा में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: माल्टो की अपनी pronoun-तालिका नहीं मिली — Wikipedia इसे कुरुख़ से \"most closely related\" बताता है (Kurukh-Malto नामित-उपशाखा, Paharia समुदाय), इसलिए यह कुरुख़-आधार पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "tt", label: "तातार", h1: "तातार बोलना सीखें (Tatar for Work — तातारस्तान)", data: "/assets/kkb_tt_data.js", out: "courses/hi/bhasha/tatar/index.html",
    title: "ACS काम की भाषा — तातार बोलना सीखें (Tatar for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तातार बोलना सीखें — तातारस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तातार बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तातारस्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kfb", label: "कोलामी", h1: "कोलामी बोलना सीखें (Kolami for Work — महाराष्ट्र-तेलंगाना)", data: "/assets/kkb_kfb_data.js", out: "courses/hi/bhasha/kolami/index.html",
    title: "ACS काम की भाषा — कोलामी बोलना सीखें (Kolami for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोलामी बोलना सीखें — महाराष्ट्र-तेलंगाना-मध्यप्रदेश में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कोलामी Central Dravidian परिवार की सबसे बड़ी भाषा है (Kolam जनजाति), देवनागरी इसकी आधिकारिक-लिपि-सूची में भी है। Wikipedia sample-तालिका से कुछ पुष्ट शब्द (मेरा=अन्नॆ, हाँ=आय्, नहीं=तोतॆद्) मिले — बाक़ी हिंदी-जैसा है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "apc", label: "लेवांटाइन अरबी", h1: "लेवांटाइन अरबी बोलना सीखें (Levantine Arabic for Work)", data: "/assets/kkb_apc_data.js", out: "courses/hi/bhasha/levantine-arabic/index.html",
    title: "ACS काम की भाषा — लेवांटाइन अरबी बोलना सीखें (Levantine Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लेवांटाइन अरबी बोलना सीखें — सीरिया-लेबनान-जॉर्डन-फ़िलिस्तीन में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह लेवांटाइन अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "nit", label: "नाइकी", h1: "नाइकी बोलना सीखें (Naiki for Work — महाराष्ट्र)", data: "/assets/kkb_nit_data.js", out: "courses/hi/bhasha/naiki/index.html",
    title: "ACS काम की भाषा — नाइकी बोलना सीखें (Naiki for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नाइकी बोलना सीखें — महाराष्ट्र में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: नाइकी को Wikipedia ख़ुद \"Southeastern Kolami\" कहता है (कोलामी की ही नामित-उपशाखा) — इसलिए यह कोलामी-आधार पर है, नाइकी-विशिष्ट स्रोत नहीं। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "acm", label: "मेसोपोटामिया अरबी", h1: "मेसोपोटामिया अरबी बोलना सीखें (Iraqi Arabic for Work)", data: "/assets/kkb_acm_data.js", out: "courses/hi/bhasha/mesopotamian-arabic/index.html",
    title: "ACS काम की भाषा — मेसोपोटामिया अरबी बोलना सीखें (Iraqi Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मेसोपोटामिया/इराक़ी अरबी बोलना सीखें — इराक़ में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मेसोपोटामिया अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "pci", label: "पारजी", h1: "पारजी बोलना सीखें (Parji for Work — बस्तर)", data: "/assets/kkb_pci_data.js", out: "courses/hi/bhasha/parji/index.html",
    title: "ACS काम की भाषा — पारजी बोलना सीखें (Parji for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पारजी बोलना सीखें — छत्तीसगढ़-ओडिशा (बस्तर) में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: पारजी की अकादमिक-व्याकरण-पुस्तक (Burrow-Bhattacharya) से सिर्फ़ \"नान\"(मैं) शब्द पुष्ट हुआ, बाक़ी कोलामी-chain (Central Dravidian परिवार) पर आधारित है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "acw", label: "हिजाज़ी अरबी", h1: "हिजाज़ी अरबी बोलना सीखें (Hejazi Arabic for Work — पश्चिमी सऊदी अरब)", data: "/assets/kkb_acw_data.js", out: "courses/hi/bhasha/hejazi-arabic/index.html",
    title: "ACS काम की भाषा — हिजाज़ी अरबी बोलना सीखें (Hejazi Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिजाज़ी अरबी बोलना सीखें — जेद्दा-मक्का-मदीना क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हिजाज़ी अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "gdb", label: "गदबा", h1: "गदबा बोलना सीखें (Gadaba for Work — ओडिशा-आंध्र)", data: "/assets/kkb_gdb_data.js", out: "courses/hi/bhasha/gadaba/index.html",
    title: "ACS काम की भाषा — गदबा बोलना सीखें (Gadaba for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गदबा (ओल्लारी) बोलना सीखें — ओडिशा-आंध्रप्रदेश में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: गदबा की अपनी pronoun-तालिका नहीं मिली — यह Parji-Gadaba नामित-उपशाखा (Wikipedia) के आधार पर पारजी-chain पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "yue", label: "कैंटोनीज़", h1: "कैंटोनीज़ बोलना सीखें (Cantonese for Work — हांगकांग-ग्वांगदोंग)", data: "/assets/kkb_yue_data.js", out: "courses/hi/bhasha/cantonese/index.html",
    title: "ACS काम की भाषा — कैंटोनीज़ बोलना सीखें (Cantonese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कैंटोनीज़ बोलना सीखें — हांगकांग-ग्वांगदोंग में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कैंटोनीज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हांगकांग-ग्वांगदोंग में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "peg", label: "पेंगो", h1: "पेंगो बोलना सीखें (Pengo for Work — नबरंगपुर)", data: "/assets/kkb_peg_data.js", out: "courses/hi/bhasha/pengo/index.html",
    title: "ACS काम की भाषा — पेंगो बोलना सीखें (Pengo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पेंगो बोलना सीखें — ओडिशा (नबरंगपुर) में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: पेंगो की अपनी pronoun-तालिका नहीं मिली — यह Manda-Pengo नामित-उपशाखा (Konda-Kui परिवार, Wikipedia-वर्गीकृत) के आधार पर कुई-chain पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "arz", label: "मिस्री अरबी", h1: "मिस्री अरबी बोलना सीखें (Egyptian Arabic for Work — मिस्र)", data: "/assets/kkb_arz_data.js", out: "courses/hi/bhasha/egyptian-arabic/index.html",
    title: "ACS काम की भाषा — मिस्री अरबी बोलना सीखें (Egyptian Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मिस्री अरबी बोलना सीखें — मिस्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मिस्री अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "mha", label: "मांडा", h1: "मांडा बोलना सीखें (Manda for Work — ओडिशा)", data: "/assets/kkb_mha_data.js", out: "courses/hi/bhasha/manda/index.html",
    title: "ACS काम की भाषा — मांडा बोलना सीखें (Manda for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मांडा बोलना सीखें — ओडिशा में काम के लिए 500 वाक्य। मुफ़्त। (सीमित-शब्दावली कोर्स — नीचे नोट पढ़ें)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: मांडा की अपनी pronoun-तालिका नहीं मिली — यह Manda-Pengo नामित-उपशाखा (Konda-Kui परिवार, Wikipedia-वर्गीकृत) के आधार पर कुई-chain पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "apd", label: "सूडानी अरबी", h1: "सूडानी अरबी बोलना सीखें (Sudanese Arabic for Work — सूडान)", data: "/assets/kkb_apd_data.js", out: "courses/hi/bhasha/sudanese-arabic/index.html",
    title: "ACS काम की भाषा — सूडानी अरबी बोलना सीखें (Sudanese Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सूडानी अरबी बोलना सीखें — सूडान में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सूडानी अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "grt", label: "गारो", h1: "गारो बोलना सीखें (Garo for Work — मेघालय)", data: "/assets/kkb_grt_data.js", out: "courses/hi/bhasha/garo/index.html",
    title: "ACS काम की भाषा — गारो बोलना सीखें (Garo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गारो बोलना सीखें — मेघालय (गारो हिल्स) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गारो बोलने का कोर्स है — Tibeto-Burman परिवार की भाषा (1.15 मिलियन बोलने वाले), मेघालय की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो मेघालय के गारो हिल्स में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "arq", label: "अल्जीरियाई अरबी", h1: "अल्जीरियाई अरबी बोलना सीखें (Algerian Arabic for Work — अल्जीरिया)", data: "/assets/kkb_arq_data.js", out: "courses/hi/bhasha/algerian-arabic/index.html",
    title: "ACS काम की भाषा — अल्जीरियाई अरबी बोलना सीखें (Algerian Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अल्जीरियाई अरबी बोलना सीखें — अल्जीरिया में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह अल्जीरियाई अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "trp", label: "कोकबोरोक", h1: "कोकबोरोक बोलना सीखें (Kokborok for Work — त्रिपुरा)", data: "/assets/kkb_trp_data.js", out: "courses/hi/bhasha/kokborok/index.html",
    title: "ACS काम की भाषा — कोकबोरोक बोलना सीखें (Kokborok for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोकबोरोक (त्रिपुरी) बोलना सीखें — त्रिपुरा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोकबोरोक (त्रिपुरी) बोलने का कोर्स है — Tibeto-Burman परिवार की भाषा (7-9 लाख बोलने वाले), त्रिपुरा की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो त्रिपुरा में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "ary", label: "मोरक्कन अरबी", h1: "मोरक्कन अरबी बोलना सीखें (Moroccan Arabic for Work — मोरक्को)", data: "/assets/kkb_ary_data.js", out: "courses/hi/bhasha/moroccan-arabic/index.html",
    title: "ACS काम की भाषा — मोरक्कन अरबी बोलना सीखें (Moroccan Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मोरक्कन अरबी बोलना सीखें — मोरक्को में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मोरक्कन अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kha", label: "खासी", h1: "खासी बोलना सीखें (Khasi for Work — मेघालय)", data: "/assets/kkb_kha_data.js", out: "courses/hi/bhasha/khasi/index.html",
    title: "ACS काम की भाषा — खासी बोलना सीखें (Khasi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से खासी बोलना सीखें — मेघालय (खासी-जयंतिया हिल्स) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह खासी बोलने का कोर्स है — भारत की एकमात्र Mon-Khmer भाषा (1.4 मिलियन बोलने वाले), मेघालय की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो मेघालय में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "aec", label: "सैदी अरबी", h1: "सैदी अरबी बोलना सीखें (Saidi Arabic for Work — ऊपरी मिस्र)", data: "/assets/kkb_aec_data.js", out: "courses/hi/bhasha/saidi-arabic/index.html",
    title: "ACS काम की भाषा — सैदी अरबी बोलना सीखें (Saidi Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सैदी अरबी बोलना सीखें — ऊपरी मिस्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सैदी अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "unr", label: "मुंडारी", h1: "मुंडारी बोलना सीखें (Mundari for Work — झारखंड)", data: "/assets/kkb_unr_data.js", out: "courses/hi/bhasha/mundari/index.html",
    title: "ACS काम की भाषा — मुंडारी बोलना सीखें (Mundari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मुंडारी बोलना सीखें — झारखंड-ओडिशा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मुंडारी बोलने का कोर्स है — Munda परिवार की भाषा (1.5-1.6 मिलियन बोलने वाले), झारखंड की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो झारखंड में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "pcm", label: "नाइजीरियन पिजिन", h1: "नाइजीरियन पिजिन बोलना सीखें (Nigerian Pidgin for Work — नाइजीरिया)", data: "/assets/kkb_pcm_data.js", out: "courses/hi/bhasha/nigerian-pidgin/index.html",
    title: "ACS काम की भाषा — नाइजीरियन पिजिन बोलना सीखें (Nigerian Pidgin for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नाइजीरियन पिजिन बोलना सीखें — नाइजीरिया में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह नाइजीरियन पिजिन बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "hoc", label: "हो", h1: "हो बोलना सीखें (Ho for Work — झारखंड-ओडिशा)", data: "/assets/kkb_hoc_data.js", out: "courses/hi/bhasha/ho/index.html",
    title: "ACS काम की भाषा — हो बोलना सीखें (Ho for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हो बोलना सीखें — झारखंड-ओडिशा में काम के लिए 500 वाक्य। मुफ़्त। (मुंडारी-निकटता पर आधारित)",
    line1: "यह हो बोलने का कोर्स है — Munda परिवार की भाषा (10 लाख+ बोलने वाले), मुंडारी की \"sister-language\" दर्ज। हिंदी जानने वालों के लिए, जो झारखंड-ओडिशा में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "sn", label: "शोना", h1: "शोना बोलना सीखें (Shona for Work — ज़िम्बाब्वे)", data: "/assets/kkb_sn_data.js", out: "courses/hi/bhasha/shona/index.html",
    title: "ACS काम की भाषा — शोना बोलना सीखें (Shona for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से शोना बोलना सीखें — ज़िम्बाब्वे में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह शोना बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ज़िम्बाब्वे में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "biy", label: "भूमिज", h1: "भूमिज बोलना सीखें (Bhumij for Work — झारखंड-ओडिशा-बंगाल)", data: "/assets/kkb_biy_data.js", out: "courses/hi/bhasha/bhumij/index.html",
    title: "ACS काम की भाषा — भूमिज बोलना सीखें (Bhumij for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से भूमिज बोलना सीखें — झारखंड-ओडिशा-बंगाल में काम के लिए 500 वाक्य। मुफ़्त। (मुंडारी-निकटता पर आधारित)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: भूमिज की अपनी pronoun-तालिका नहीं मिली — यह Kherwarian उपपरिवार (मुंडारी-निकट) के आधार पर है। शुरुआती-परिचय-मात्र — स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "mfe", label: "मॉरीशियन क्रीओल", h1: "मॉरीशियन क्रीओल बोलना सीखें (Mauritian Creole for Work — मॉरीशस)", data: "/assets/kkb_mfe_data.js", out: "courses/hi/bhasha/mauritian-creole/index.html",
    title: "ACS काम की भाषा — मॉरीशियन क्रीओल बोलना सीखें (Mauritian Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मॉरीशियन क्रीओल बोलना सीखें — मॉरीशस में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मॉरीशियन क्रीओल बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मॉरीशस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "kfp", label: "कोरवा", h1: "कोरवा बोलना सीखें (Korwa for Work — छत्तीसगढ़-झारखंड)", data: "/assets/kkb_kfp_data.js", out: "courses/hi/bhasha/korwa/index.html",
    title: "ACS काम की भाषा — कोरवा बोलना सीखें (Korwa for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोरवा बोलना सीखें — छत्तीसगढ़-झारखंड में काम के लिए 500 वाक्य। मुफ़्त। (मुंडारी-निकटता पर आधारित)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: कोरवा पर 2022 के SIL-सर्वेक्षण ने \"मुंडारी से निकटता\" दर्ज की — यह कोर्स उसी chain पर है, देवनागरी इसकी आधिकारिक-लिपि है। स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "bm", label: "बमबारा", h1: "बमबारा बोलना सीखें (Bambara for Work — माली)", data: "/assets/kkb_bm_data.js", out: "courses/hi/bhasha/bambara/index.html",
    title: "ACS काम की भाषा — बमबारा बोलना सीखें (Bambara for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बमबारा बोलना सीखें — माली में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बमबारा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो माली में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "pbv", label: "प्नार", h1: "प्नार बोलना सीखें (Pnar for Work — मेघालय जयंतिया हिल्स)", data: "/assets/kkb_pbv_data.js", out: "courses/hi/bhasha/pnar/index.html",
    title: "ACS काम की भाषा — प्नार बोलना सीखें (Pnar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से प्नार (जयंतिया) बोलना सीखें — मेघालय जयंतिया हिल्स में काम के लिए 500 वाक्य। मुफ़्त। (खासी-निकटता पर आधारित)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: प्नार (जयंतिया) की अपनी pronoun-तालिका नहीं मिली — यह खासी से \"बेहद-निकट\" दर्ज (Khasic उपपरिवार, 395,000 बोलने वाले) के आधार पर है। स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "wo", label: "वोलोफ़", h1: "वोलोफ़ बोलना सीखें (Wolof for Work — सेनेगल)", data: "/assets/kkb_wo_data.js", out: "courses/hi/bhasha/wolof/index.html",
    title: "ACS काम की भाषा — वोलोफ़ बोलना सीखें (Wolof for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वोलोफ़ बोलना सीखें — सेनेगल में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह वोलोफ़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो सेनेगल में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "dis", label: "डिमासा", h1: "डिमासा बोलना सीखें (Dimasa for Work — असम)", data: "/assets/kkb_dis_data.js", out: "courses/hi/bhasha/dimasa/index.html",
    title: "ACS काम की भाषा — डिमासा बोलना सीखें (Dimasa for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डिमासा बोलना सीखें — असम (दिमा हासाओ) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डिमासा बोलने का कोर्स है — Tibeto-Burman परिवार की भाषा (1.4-1.9 लाख बोलने वाले), दिमा हासाओ ज़िला की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो असम में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "de", label: "जर्मन", h1: "जर्मन बोलना सीखें (German for Work — जर्मनी)", data: "/assets/kkb_de_data.js", out: "courses/hi/bhasha/german/index.html",
    title: "ACS काम की भाषा — जर्मन बोलना सीखें (German for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जर्मन बोलना सीखें — जर्मनी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह जर्मन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जर्मनी में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "lus", label: "मिज़ो", h1: "मिज़ो बोलना सीखें (Mizo for Work — मिज़ोरम)", data: "/assets/kkb_lus_data.js", out: "courses/hi/bhasha/mizo/index.html",
    title: "ACS काम की भाषा — मिज़ो बोलना सीखें (Mizo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मिज़ो बोलना सीखें — मिज़ोरम में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मिज़ो बोलने का कोर्स है — Tibeto-Burman परिवार की भाषा (5-8 लाख बोलने वाले), मिज़ोरम की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो मिज़ोरम में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "it", label: "इतालवी", h1: "इतालवी बोलना सीखें (Italian for Work — इटली)", data: "/assets/kkb_it_data.js", out: "courses/hi/bhasha/italian/index.html",
    title: "ACS काम की भाषा — इतालवी बोलना सीखें (Italian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इतालवी बोलना सीखें — इटली में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह इतालवी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो इटली में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "njo", label: "आओ नागा", h1: "आओ नागा बोलना सीखें (Ao Naga for Work — मोकोकचुंग)", data: "/assets/kkb_njo_data.js", out: "courses/hi/bhasha/aonaga/index.html",
    title: "ACS काम की भाषा — आओ नागा बोलना सीखें (Ao Naga for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से आओ नागा (Chungli) बोलना सीखें — नागालैंड (मोकोकचुंग) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह आओ नागा (Chungli-बोली, सबसे प्रतिष्ठित-variety) बोलने का कोर्स है — Tibeto-Burman Central-Naga परिवार की भाषा (2.27 लाख Ao Naga जनसंख्या)। हिंदी जानने वालों के लिए, जो नागालैंड में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "pl", label: "पोलिश", h1: "पोलिश बोलना सीखें (Polish for Work — पोलैंड)", data: "/assets/kkb_pl_data.js", out: "courses/hi/bhasha/polish/index.html",
    title: "ACS काम की भाषा — पोलिश बोलना सीखें (Polish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पोलिश बोलना सीखें — पोलैंड में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पोलिश बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो पोलैंड में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "njh", label: "लोथा नागा", h1: "लोथा नागा बोलना सीखें (Lotha Naga for Work — वोखा)", data: "/assets/kkb_njh_data.js", out: "courses/hi/bhasha/lothanaga/index.html",
    title: "ACS काम की भाषा — लोथा नागा बोलना सीखें (Lotha Naga for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लोथा नागा बोलना सीखें — नागालैंड (वोखा ज़िला) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लोथा नागा बोलने का कोर्स है — Tibeto-Burman Central-Naga परिवार की भाषा (1.8 लाख बोलने वाले), नागालैंड में स्नातकोत्तर-स्तर तक शिक्षा-माध्यम। हिंदी जानने वालों के लिए, जो नागालैंड में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "uk", label: "यूक्रेनी", h1: "यूक्रेनी बोलना सीखें (Ukrainian for Work — यूक्रेन)", data: "/assets/kkb_uk_data.js", out: "courses/hi/bhasha/ukrainian/index.html",
    title: "ACS काम की भाषा — यूक्रेनी बोलना सीखें (Ukrainian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से यूक्रेनी बोलना सीखें — यूक्रेन में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह यूक्रेनी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो यूक्रेन में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "dzo", label: "ज़ोंगखा", h1: "ज़ोंगखा बोलना सीखें (Dzongkha for Work — भूटान)", data: "/assets/kkb_dzo_data.js", out: "courses/hi/bhasha/dzongkha/index.html",
    title: "ACS काम की भाषा — ज़ोंगखा बोलना सीखें (Dzongkha for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ज़ोंगखा बोलना सीखें — भूटान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ज़ोंगखा बोलने का कोर्स है — भूटान की राष्ट्रभाषा (Tibeto-Burman परिवार, ~1.7 लाख मातृभाषी, पूरे भूटान में स्कूल-अनिवार्य)। हिंदी जानने वालों के लिए, जो भूटान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "ro", label: "रोमानियाई", h1: "रोमानियाई बोलना सीखें (Romanian for Work — रोमानिया)", data: "/assets/kkb_ro_data.js", out: "courses/hi/bhasha/romanian/index.html",
    title: "ACS काम की भाषा — रोमानियाई बोलना सीखें (Romanian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रोमानियाई बोलना सीखें — रोमानिया में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह रोमानियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो रोमानिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "brh", label: "ब्राहुई", h1: "ब्राहुई बोलना सीखें (Brahui for Work — बलूचिस्तान)", data: "/assets/kkb_brh_data.js", out: "courses/hi/bhasha/brahui/index.html",
    title: "ACS काम की भाषा — ब्राहुई बोलना सीखें (Brahui for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ब्राहुई बोलना सीखें — पाकिस्तान (बलूचिस्तान) में काम के लिए 500 वाक्य। मुफ़्त। (कुरुख़-निकटता पर आधारित)",
    line1: "⚠️ सीमित-शब्दावली कोर्स: ब्राहुई दक्षिण-भारत के द्रविड़-परिवार से 1,500 किमी दूर बलूचिस्तान में अकेला द्वीप-जैसा मौजूद है (27.8 लाख बोलने वाले, सबसे बड़ी North-Dravidian भाषा)। CIIL व Encyclopaedia Iranica इसे कुरुख़-माल्टो के साथ ही वर्गीकृत करते हैं — यह कोर्स उसी निकटता पर आधारित है। स्थानीय वक्ता से ज़रूर सीखें।" },  { code: "nl", label: "डच", h1: "डच बोलना सीखें (Dutch for Work — नीदरलैंड्स)", data: "/assets/kkb_nl_data.js", out: "courses/hi/bhasha/dutch/index.html",
    title: "ACS काम की भाषा — डच बोलना सीखें (Dutch for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डच बोलना सीखें — नीदरलैंड्स में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह डच बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो नीदरलैंड्स में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "dv", label: "धिवेही", h1: "धिवेही बोलना सीखें (Dhivehi for Work — मालदीव)", data: "/assets/kkb_dv_data.js", out: "courses/hi/bhasha/dhivehi/index.html",
    title: "ACS काम की भाषा — धिवेही बोलना सीखें (Dhivehi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से धिवेही बोलना सीखें — मालदीव में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह धिवेही बोलने का कोर्स है — मालदीव की एकमात्र राष्ट्रभाषा (Indo-Aryan परिवार, हिंदी की दूर-सहोदर, ~3.4 लाख बोलने वाले)। हिंदी जानने वालों के लिए, जो मालदीव में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "el", label: "ग्रीक", h1: "ग्रीक बोलना सीखें (Greek for Work — ग्रीस)", data: "/assets/kkb_el_data.js", out: "courses/hi/bhasha/greek/index.html",
    title: "ACS काम की भाषा — ग्रीक बोलना सीखें (Greek for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ग्रीक बोलना सीखें — ग्रीस में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह ग्रीक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो ग्रीस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "new", label: "नेवारी (Nepal Bhasa)", h1: "नेवारी (Nepal Bhasa) बोलना सीखें (Newari for Work — काठमांडू)", data: "/assets/kkb_new_data.js", out: "courses/hi/bhasha/newari/index.html",
    title: "ACS काम की भाषा — नेवारी बोलना सीखें (Newari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नेवारी (Nepal Bhasa) बोलना सीखें — नेपाल (काठमांडू-घाटी) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नेवारी (Nepal Bhasa) बोलने का कोर्स है — काठमांडू-घाटी की ऐतिहासिक-भाषा (Tibeto-Burman परिवार, ~10 लाख बोलने वाले, काठमांडू महानगरपालिका में आधिकारिक-दर्जा)। हिंदी जानने वालों के लिए, जो नेपाल में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "hu", label: "हंगेरियन", h1: "हंगेरियन बोलना सीखें (Hungarian for Work — हंगरी)", data: "/assets/kkb_hu_data.js", out: "courses/hi/bhasha/hungarian/index.html",
    title: "ACS काम की भाषा — हंगेरियन बोलना सीखें (Hungarian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हंगेरियन बोलना सीखें — हंगरी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हंगेरियन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हंगरी में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "ccp", label: "चकमा", h1: "चकमा बोलना सीखें (Chakma for Work — चित्तगांव-त्रिपुरा)", data: "/assets/kkb_ccp_data.js", out: "courses/hi/bhasha/chakma/index.html",
    title: "ACS काम की भाषा — चकमा बोलना सीखें (Chakma for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चकमा बोलना सीखें — बांग्लादेश-भारत (त्रिपुरा) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चकमा बोलने का कोर्स है — Indo-Aryan परिवार की भाषा (10 लाख+ बोलने वाले, भारत-बांग्लादेश-म्यांमार में फैली, त्रिपुरा में आधिकारिक-मान्यता, अपनी लिपि भी है)। हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "cs", label: "चेक", h1: "चेक बोलना सीखें (Czech for Work — चेक गणराज्य)", data: "/assets/kkb_cs_data.js", out: "courses/hi/bhasha/czech/index.html",
    title: "ACS काम की भाषा — चेक बोलना सीखें (Czech for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चेक बोलना सीखें — चेक गणराज्य में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह चेक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो चेक गणराज्य में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "zum", label: "कुमज़ारी", h1: "कुमज़ारी बोलना सीखें (Kumzari for Work — ओमान Musandam)", data: "/assets/kkb_zum_data.js", out: "courses/hi/bhasha/kumzari/index.html",
    title: "ACS काम की भाषा — कुमज़ारी बोलना सीखें (Kumzari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुमज़ारी बोलना सीखें — ओमान (Musandam प्रायद्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कुमज़ारी बोलने का कोर्स है — अरब-प्रायद्वीप की एकमात्र Iranian-भाषा (सिर्फ़ 4,000-5,000 बोलने वाले, University of Florida के PhD-शोध से genuine pronoun-तालिका पुष्ट)। हिंदी जानने वालों के लिए, जो ओमान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "be", label: "बेलारूसी", h1: "बेलारूसी बोलना सीखें (Belarusian for Work — बेलारूस)", data: "/assets/kkb_be_data.js", out: "courses/hi/bhasha/belarusian/index.html",
    title: "ACS काम की भाषा — बेलारूसी बोलना सीखें (Belarusian for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बेलारूसी बोलना सीखें — बेलारूस में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बेलारूसी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बेलारूस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "afb", label: "ख़ाड़ी-अरबी", h1: "ख़ाड़ी-अरबी बोलना सीखें (Gulf Arabic for Work — GCC)", data: "/assets/kkb_afb_data.js", out: "courses/hi/bhasha/gulf-arabic/index.html",
    title: "ACS काम की भाषा — ख़ाड़ी-अरबी बोलना सीखें (Gulf Arabic/Khaleeji for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ख़ाड़ी-अरबी बोलना सीखें — UAE, सऊदी-अरब, कुवैत, कतर, बहरीन, ओमान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ख़ाड़ी-अरबी (Khaleeji) बोलने का कोर्स है — पूरे GCC (UAE-कुवैत-कतर-बहरीन-सऊदी-ओमान) की मुख्य बोलचाल-भाषा। हिंदी जानने वालों के लिए, जो ख़ाड़ी-देशों में काम करते हैं — यह भारत से सबसे ज़्यादा लोग जहाँ काम के लिए जाते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "sv", label: "स्वीडिश", h1: "स्वीडिश बोलना सीखें (Swedish for Work — स्वीडन)", data: "/assets/kkb_sv_data.js", out: "courses/hi/bhasha/swedish/index.html",
    title: "ACS काम की भाषा — स्वीडिश बोलना सीखें (Swedish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्वीडिश बोलना सीखें — स्वीडन में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह स्वीडिश बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो स्वीडन में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },

  { code: "wuu", label: "वू-चीनी", h1: "वू-चीनी बोलना सीखें (Wu Chinese for Work — शंघाई)", data: "/assets/kkb_wuu_data.js", out: "courses/hi/bhasha/wu-chinese/index.html",
    title: "ACS काम की भाषा — वू-चीनी बोलना सीखें (Wu Chinese/Shanghainese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वू-चीनी (शंघाईनीज़) बोलना सीखें — शंघाई-झेजियांग में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वू-चीनी (शंघाईनीज़) बोलने का कोर्स है — Sinitic परिवार की भाषा (8 करोड़ बोलने वाले, मंदारिन से पूरी तरह अलग, एक-दूसरे को समझ नहीं आती)। हिंदी जानने वालों के लिए, जो शंघाई-झेजियांग में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },  { code: "bg", label: "बुल्गारियाई", h1: "बुल्गारियाई बोलना सीखें (Bulgarian for Work — बुल्गारिया)", data: "/assets/kkb_bg_data.js", out: "courses/hi/bhasha/bulgarian/index.html",
    title: "ACS काम की भाषा — बुल्गारियाई बोलना सीखें (Bulgarian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बुल्गारियाई बोलना सीखें — बुल्गारिया में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बुल्गारियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बुल्गारिया में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zha", label: "ज़ुआंग", h1: "ज़ुआंग बोलना सीखें (Zhuang for Work — Guangxi)", data: "/assets/kkb_zha_data.js", out: "courses/hi/bhasha/zhuang/index.html",
    title: "ACS काम की भाषा — ज़ुआंग बोलना सीखें (Zhuang for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ज़ुआंग बोलना सीखें — चीन (Guangxi) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ज़ुआंग बोलने का कोर्स है — चीन की सबसे बड़ी अल्पसंख्यक-जातीय-भाषा (1.5 करोड़+ बोलने वाले, Guangxi की सह-आधिकारिक-भाषा, चीनी-बैंक-नोट पर छपती है, Tai-Kadai परिवार — मंदारिन से बिल्कुल अलग-मूल)। हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hak", label: "हक्का", h1: "हक्का बोलना सीखें (Hakka for Work — चीन-ताइवान)", data: "/assets/kkb_hak_data.js", out: "courses/hi/bhasha/hakka/index.html",
    title: "ACS काम की भाषा — हक्का बोलना सीखें (Hakka for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हक्का बोलना सीखें — चीन-ताइवान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हक्का बोलने का कोर्स है — Sinitic परिवार की भाषा (3-4 करोड़ बोलने वाले, ताइवान की आधिकारिक-भाषाओं में से एक, मंदारिन से पूरी तरह अलग)। हिंदी जानने वालों के लिए, जो चीन-ताइवान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gan", label: "गान", h1: "गान बोलना सीखें (Gan for Work — Jiangxi)", data: "/assets/kkb_gan_data.js", out: "courses/hi/bhasha/gan/index.html",
    title: "ACS काम की भाषा — गान बोलना सीखें (Gan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गान बोलना सीखें — चीन (Jiangxi प्रांत) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गान बोलने का कोर्स है — Sinitic परिवार की भाषा (2.2 करोड़ बोलने वाले, Jiangxi प्रांत की मुख्य बोलचाल-भाषा, मंदारिन से अलग)। हिंदी जानने वालों के लिए, जो Jiangxi में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cv", label: "चुवाश", h1: "चुवाश बोलना सीखें (Chuvash for Work — Chuvashia)", data: "/assets/kkb_cv_data.js", out: "courses/hi/bhasha/chuvash/index.html",
    title: "ACS काम की भाषा — चुवाश बोलना सीखें (Chuvash for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चुवाश बोलना सीखें — रूस (Chuvashia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चुवाश बोलने का कोर्स है — 70 लाख बोलने वाले, Oghuric-शाखा का अकेला जीवित-सदस्य। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ba", label: "बश्कीर", h1: "बश्कीर बोलना सीखें (Bashkir for Work — Bashkortostan)", data: "/assets/kkb_ba_data.js", out: "courses/hi/bhasha/bashkir/index.html",
    title: "ACS काम की भाषा — बश्कीर बोलना सीखें (Bashkir for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बश्कीर बोलना सीखें — रूस (Bashkortostan) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बश्कीर बोलने का कोर्स है — 14-16 लाख बोलने वाले, तातार से 94.9% शब्दावली-समान। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sah", label: "याकूत", h1: "याकूत बोलना सीखें (Yakut for Work — Sakha गणराज्य)", data: "/assets/kkb_sah_data.js", out: "courses/hi/bhasha/yakut/index.html",
    title: "ACS काम की भाषा — याकूत बोलना सीखें (Yakut for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से याकूत बोलना सीखें — रूस (Sakha गणराज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह याकूत बोलने का कोर्स है — 4.5 लाख बोलने वाले, भारत से भी बड़े क्षेत्रफल वाले गणराज्य की भाषा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bua", label: "बुर्यात", h1: "बुर्यात बोलना सीखें (Buryat for Work — Buryatia)", data: "/assets/kkb_bua_data.js", out: "courses/hi/bhasha/buryat/index.html",
    title: "ACS काम की भाषा — बुर्यात बोलना सीखें (Buryat for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बुर्यात बोलना सीखें — रूस (Buryatia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बुर्यात बोलने का कोर्स है — 4.4 लाख बोलने वाले, बैकाल-झील की बौद्ध-सांस्कृतिक-परंपरा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "udm", label: "उदमुर्त", h1: "उदमुर्त बोलना सीखें (Udmurt for Work — Udmurtia)", data: "/assets/kkb_udm_data.js", out: "courses/hi/bhasha/udmurt/index.html",
    title: "ACS काम की भाषा — उदमुर्त बोलना सीखें (Udmurt for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उदमुर्त बोलना सीखें — रूस (Udmurtia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह उदमुर्त बोलने का कोर्स है — 3.2 लाख बोलने वाले, Permic-शाखा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mhr", label: "मारी", h1: "मारी बोलना सीखें (Mari for Work — Mari El)", data: "/assets/kkb_mhr_data.js", out: "courses/hi/bhasha/mari/index.html",
    title: "ACS काम की भाषा — मारी बोलना सीखें (Mari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मारी बोलना सीखें — रूस (Mari El) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मारी बोलने का कोर्स है — 3.7 लाख बोलने वाले। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "myv", label: "मोर्डविन-एर्ज़्या", h1: "मोर्डविन-एर्ज़्या बोलना सीखें (Erzya for Work — Mordovia)", data: "/assets/kkb_myv_data.js", out: "courses/hi/bhasha/erzya/index.html",
    title: "ACS काम की भाषा — मोर्डविन-एर्ज़्या बोलना सीखें (Erzya for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मोर्डविन-एर्ज़्या बोलना सीखें — रूस (Mordovia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मोर्डविन-एर्ज़्या बोलने का कोर्स है — मोक्षा से अलग-भाषा, mutually-unintelligible। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "koi", label: "कोमी-पर्म्याक", h1: "कोमी-पर्म्याक बोलना सीखें (Komi-Permyak for Work — Perm Krai)", data: "/assets/kkb_koi_data.js", out: "courses/hi/bhasha/komipermyak/index.html",
    title: "ACS काम की भाषा — कोमी-पर्म्याक बोलना सीखें (Komi-Permyak for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोमी-पर्म्याक बोलना सीखें — रूस (Perm Krai) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोमी-पर्म्याक बोलने का कोर्स है — Permic-शाखा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "inh", label: "इंगुश", h1: "इंगुश बोलना सीखें (Ingush for Work — Ingushetia)", data: "/assets/kkb_inh_data.js", out: "courses/hi/bhasha/ingush/index.html",
    title: "ACS काम की भाषा — इंगुश बोलना सीखें (Ingush for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इंगुश बोलना सीखें — रूस (Ingushetia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह इंगुश बोलने का कोर्स है — 4.4 लाख बोलने वाले, चेचन से निकट Vainakh-शाखा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ava", label: "अवार", h1: "अवार बोलना सीखें (Avar for Work — Dagestan)", data: "/assets/kkb_ava_data.js", out: "courses/hi/bhasha/avar/index.html",
    title: "ACS काम की भाषा — अवार बोलना सीखें (Avar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अवार बोलना सीखें — रूस (Dagestan) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अवार बोलने का कोर्स है — 10 लाख बोलने वाले, Dagestan की सबसे बड़ी स्वदेशी-भाषा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "os", label: "ओसेतियाई", h1: "ओसेतियाई बोलना सीखें (Ossetian for Work — North Ossetia)", data: "/assets/kkb_os_data.js", out: "courses/hi/bhasha/ossetian/index.html",
    title: "ACS काम की भाषा — ओसेतियाई बोलना सीखें (Ossetian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओसेतियाई बोलना सीखें — रूस (North Ossetia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ओसेतियाई बोलने का कोर्स है — 6.1 लाख बोलने वाले, उत्तर-काकेशस में अकेली Indo-European भाषा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tyv", label: "तुवान", h1: "तुवान बोलना सीखें (Tuvan for Work — Tuva गणराज्य)", data: "/assets/kkb_tyv_data.js", out: "courses/hi/bhasha/tuvan/index.html",
    title: "ACS काम की भाषा — तुवान बोलना सीखें (Tuvan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुवान बोलना सीखें — रूस (Tuva गणराज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तुवान बोलने का कोर्स है — 2.8 लाख बोलने वाले, एशिया के भौगोलिक-केंद्र में। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kjh", label: "खाकास", h1: "खाकास बोलना सीखें (Khakas for Work — Khakassia)", data: "/assets/kkb_kjh_data.js", out: "courses/hi/bhasha/khakas/index.html",
    title: "ACS काम की भाषा — खाकास बोलना सीखें (Khakas for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से खाकास बोलना सीखें — रूस (Khakassia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह खाकास बोलने का कोर्स है — ~30 हज़ार बोलने वाले। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "xal", label: "कल्मिक", h1: "कल्मिक बोलना सीखें (Kalmyk for Work — Kalmykia)", data: "/assets/kkb_xal_data.js", out: "courses/hi/bhasha/kalmyk/index.html",
    title: "ACS काम की भाषा — कल्मिक बोलना सीखें (Kalmyk for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कल्मिक बोलना सीखें — रूस (Kalmykia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कल्मिक बोलने का कोर्स है — 4.3 लाख बोलने वाले, यूरोप की एकमात्र पारंपरिक-बौद्ध-भाषा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yrk", label: "नेनेट्स", h1: "नेनेट्स बोलना सीखें (Nenets for Work — आर्कटिक-टुंड्रा)", data: "/assets/kkb_yrk_data.js", out: "courses/hi/bhasha/nenets/index.html",
    title: "ACS काम की भाषा — नेनेट्स बोलना सीखें (Nenets for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नेनेट्स बोलना सीखें — रूस (आर्कटिक-टुंड्रा) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नेनेट्स बोलने का कोर्स है — ~25 हज़ार बोलने वाले, Samoyedic-शाखा। हिंदी जानने वालों के लिए, जो रूस में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "jje", label: "जेजू", h1: "जेजू बोलना सीखें (Jeju for Work — दक्षिण-कोरिया)", data: "/assets/kkb_jje_data.js", out: "courses/hi/bhasha/jeju/index.html",
    title: "ACS काम की भाषा — जेजू बोलना सीखें (Jeju for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जेजू बोलना सीखें — दक्षिण-कोरिया (जेजू-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह जेजू बोलने का कोर्स है — Koreanic परिवार की भाषा, पर मानक-कोरियाई से बिल्कुल अलग (एक-दूसरे को समझ नहीं आती)। सिर्फ़ 5,000-10,000 बोलने वाले बचे हैं, UNESCO ने इसे 2010 में 'गंभीर-संकटग्रस्त' घोषित किया। हिंदी जानने वालों के लिए, जो जेजू-द्वीप में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ryu", label: "ओकिनावन", h1: "ओकिनावन बोलना सीखें (Okinawan for Work — Okinawa द्वीप)", data: "/assets/kkb_ryu_data.js", out: "courses/hi/bhasha/okinawan/index.html",
    title: "ACS काम की भाषा — ओकिनावन बोलना सीखें (Okinawan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओकिनावन बोलना सीखें — जापान (Okinawa द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ओकिनावन (Uchinaaguchi) बोलने का कोर्स है — Japonic परिवार की भाषा, पर मानक-जापानी से सिर्फ़ 71% शब्दावली-समान है — एक-दूसरे को समझना मुश्किल। ~9.8 लाख बोलने वाले। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ryn", label: "अमामी", h1: "अमामी बोलना सीखें (Amami for Work — Amami द्वीप-समूह)", data: "/assets/kkb_ryn_data.js", out: "courses/hi/bhasha/amami/index.html",
    title: "ACS काम की भाषा — अमामी बोलना सीखें (Amami for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अमामी बोलना सीखें — जापान (Amami द्वीप-समूह) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अमामी बोलने का कोर्स है — Japonic Ryukyuan परिवार की भाषा, मानक-जापानी व अन्य Ryukyuan-भाषाओं से भी अलग-समझ। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mvi", label: "मियाको", h1: "मियाको बोलना सीखें (Miyako for Work — Miyako द्वीप)", data: "/assets/kkb_mvi_data.js", out: "courses/hi/bhasha/miyako/index.html",
    title: "ACS काम की भाषा — मियाको बोलना सीखें (Miyako for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मियाको बोलना सीखें — जापान (Miyako द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मियाको बोलने का कोर्स है — Japonic Ryukyuan परिवार की भाषा, 66,000 बोलने वाले, 'गंभीर-संकटग्रस्त' (severely-endangered)। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rys", label: "याएयामा", h1: "याएयामा बोलना सीखें (Yaeyama for Work — Yaeyama द्वीप-समूह)", data: "/assets/kkb_rys_data.js", out: "courses/hi/bhasha/yaeyama/index.html",
    title: "ACS काम की भाषा — याएयामा बोलना सीखें (Yaeyama for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से याएयामा बोलना सीखें — जापान (Yaeyama द्वीप-समूह) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह याएयामा बोलने का कोर्स है — Japonic Ryukyuan परिवार की भाषा, 47,600 बोलने वाले। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yoi", label: "योनागुनी", h1: "योनागुनी बोलना सीखें (Yonaguni for Work — Yonaguni द्वीप)", data: "/assets/kkb_yoi_data.js", out: "courses/hi/bhasha/yonaguni/index.html",
    title: "ACS काम की भाषा — योनागुनी बोलना सीखें (Yonaguni for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से योनागुनी बोलना सीखें — जापान (Yonaguni द्वीप, ताइवान के नज़दीक) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह योनागुनी बोलने का कोर्स है — Japonic Ryukyuan परिवार की भाषा, सिर्फ़ ~400 बोलने वाले बचे हैं — Ainu के बाद जापान की सबसे-संकटग्रस्त भाषा। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ain", label: "ऐनू", h1: "ऐनू बोलना सीखें (Ainu for Work — Hokkaido)", data: "/assets/kkb_ain_data.js", out: "courses/hi/bhasha/ainu/index.html",
    title: "ACS काम की भाषा — ऐनू बोलना सीखें (Ainu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ऐनू बोलना सीखें — जापान (Hokkaido) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ऐनू बोलने का कोर्स है — genuinely एक-अलग भाषा-परिवार (किसी भी अन्य भाषा से genetic-संबंध सिद्ध नहीं), Hokkaido की मूल-निवासी-भाषा, UNESCO द्वारा 'लगभग-विलुप्त' घोषित (सिर्फ़ ~300 लोग समझते हैं)। हिंदी जानने वालों के लिए, जो जापान में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ilo", label: "इलोकानो", h1: "इलोकानो बोलना सीखें (Ilocano for Work — फ़िलीपींस (उत्तर-Luzon))", data: "/assets/kkb_ilo_data.js", out: "courses/hi/bhasha/ilocano/index.html",
    title: "ACS काम की भाषा — इलोकानो बोलना सीखें (Ilocano for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इलोकानो बोलना सीखें — फ़िलीपींस (उत्तर-Luzon) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह इलोकानो बोलने का कोर्स है — 1.1 करोड़ बोलने वाले, तीसरी सबसे-बड़ी फ़िलीपीन्स-भाषा, Cebuano से mutually-unintelligible। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hil", label: "हिलिगाय्नोन", h1: "हिलिगाय्नोन बोलना सीखें (Hiligaynon for Work — फ़िलीपींस (पश्चिम-Visayas))", data: "/assets/kkb_hil_data.js", out: "courses/hi/bhasha/hiligaynon/index.html",
    title: "ACS काम की भाषा — हिलिगाय्नोन बोलना सीखें (Hiligaynon for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिलिगाय्नोन बोलना सीखें — फ़िलीपींस (पश्चिम-Visayas) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हिलिगाय्नोन बोलने का कोर्स है — 91 लाख बोलने वाले, चौथी सबसे-बड़ी, Ilonggo भी कहलाती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "war", label: "वारे", h1: "वारे बोलना सीखें (Waray for Work — फ़िलीपींस (Samar-Leyte))", data: "/assets/kkb_war_data.js", out: "courses/hi/bhasha/waray/index.html",
    title: "ACS काम की भाषा — वारे बोलना सीखें (Waray for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वारे बोलना सीखें — फ़िलीपींस (Samar-Leyte) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वारे बोलने का कोर्स है — 30-40 लाख बोलने वाले, पाँचवीं सबसे-बड़ी फ़िलीपीन्स-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bcl", label: "बिकोल", h1: "बिकोल बोलना सीखें (Bikol for Work — फ़िलीपींस (Bicol क्षेत्र))", data: "/assets/kkb_bcl_data.js", out: "courses/hi/bhasha/bikol/index.html",
    title: "ACS काम की भाषा — बिकोल बोलना सीखें (Bikol for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बिकोल बोलना सीखें — फ़िलीपींस (Bicol क्षेत्र) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बिकोल बोलने का कोर्स है — 25 लाख+ बोलने वाले, छठी सबसे-बड़ी, Central Bikol। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pam", label: "कपम्पांगान", h1: "कपम्पांगान बोलना सीखें (Kapampangan for Work — फ़िलीपींस (मध्य-Luzon))", data: "/assets/kkb_pam_data.js", out: "courses/hi/bhasha/kapampangan/index.html",
    title: "ACS काम की भाषा — कपम्पांगान बोलना सीखें (Kapampangan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कपम्पांगान बोलना सीखें — फ़िलीपींस (मध्य-Luzon) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कपम्पांगान बोलने का कोर्स है — Pampanga-प्रांत की मुख्य-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pag", label: "पांगासिनान", h1: "पांगासिनान बोलना सीखें (Pangasinan for Work — फ़िलीपींस (पश्चिम-मध्य Luzon))", data: "/assets/kkb_pag_data.js", out: "courses/hi/bhasha/pangasinan/index.html",
    title: "ACS काम की भाषा — पांगासिनान बोलना सीखें (Pangasinan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पांगासिनान बोलना सीखें — फ़िलीपींस (पश्चिम-मध्य Luzon) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पांगासिनान बोलने का कोर्स है — 18 लाख बोलने वाले, आठवीं सबसे-बड़ी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mrw", label: "मरानाओ", h1: "मरानाओ बोलना सीखें (Maranao for Work — फ़िलीपींस (Lanao, Mindanao))", data: "/assets/kkb_mrw_data.js", out: "courses/hi/bhasha/maranao/index.html",
    title: "ACS काम की भाषा — मरानाओ बोलना सीखें (Maranao for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मरानाओ बोलना सीखें — फ़िलीपींस (Lanao, Mindanao) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मरानाओ बोलने का कोर्स है — Lake Lanao संस्कृति, Mindanao के मुस्लिम-समुदाय की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mdh", label: "मागिनदानाओ", h1: "मागिनदानाओ बोलना सीखें (Maguindanao for Work — फ़िलीपींस (Mindanao))", data: "/assets/kkb_mdh_data.js", out: "courses/hi/bhasha/maguindanao/index.html",
    title: "ACS काम की भाषा — मागिनदानाओ बोलना सीखें (Maguindanao for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मागिनदानाओ बोलना सीखें — फ़िलीपींस (Mindanao) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मागिनदानाओ बोलने का कोर्स है — नौवीं सबसे-बोली-जाने-वाली भाषा फ़िलीपींस में। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tsg", label: "ताउसूग", h1: "ताउसूग बोलना सीखें (Tausug for Work — फ़िलीपींस (Sulu-द्वीपसमूह))", data: "/assets/kkb_tsg_data.js", out: "courses/hi/bhasha/tausug/index.html",
    title: "ACS काम की भाषा — ताउसूग बोलना सीखें (Tausug for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ताउसूग बोलना सीखें — फ़िलीपींस (Sulu-द्वीपसमूह) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ताउसूग बोलने का कोर्स है — 19 लाख बोलने वाले, मलेशिया-इंडोनेशिया में भी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "krj", label: "किनारे-आ", h1: "किनारे-आ बोलना सीखें (Kinaraya for Work — फ़िलीपींस (Panay-द्वीप))", data: "/assets/kkb_krj_data.js", out: "courses/hi/bhasha/kinaraya/index.html",
    title: "ACS काम की भाषा — किनारे-आ बोलना सीखें (Kinaraya for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किनारे-आ बोलना सीखें — फ़िलीपींस (Panay-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह किनारे-आ बोलने का कोर्स है — 11 लाख बोलने वाले, Hiligaynon से भी genuinely अलग-उपशाखा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ban", label: "बालीनीज़", h1: "बालीनीज़ बोलना सीखें (Balinese for Work — इंडोनेशिया (Bali))", data: "/assets/kkb_ban_data.js", out: "courses/hi/bhasha/balinese/index.html",
    title: "ACS काम की भाषा — बालीनीज़ बोलना सीखें (Balinese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बालीनीज़ बोलना सीखें — इंडोनेशिया (Bali) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बालीनीज़ बोलने का कोर्स है — 33 लाख बोलने वाले, Bali-हिंदू संस्कृति से जुड़ी जटिल सम्मान-प्रणाली। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "min", label: "मिनांगकाबाउ", h1: "मिनांगकाबाउ बोलना सीखें (Minangkabau for Work — इंडोनेशिया (West Sumatra))", data: "/assets/kkb_min_data.js", out: "courses/hi/bhasha/minangkabau/index.html",
    title: "ACS काम की भाषा — मिनांगकाबाउ बोलना सीखें (Minangkabau for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मिनांगकाबाउ बोलना सीखें — इंडोनेशिया (West Sumatra) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मिनांगकाबाउ बोलने का कोर्स है — 50-70 लाख बोलने वाले, matrilineal-संस्कृति के लिए प्रसिद्ध। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mad", label: "मदुरीज़", h1: "मदुरीज़ बोलना सीखें (Madurese for Work — इंडोनेशिया (Madura-द्वीप))", data: "/assets/kkb_mad_data.js", out: "courses/hi/bhasha/madurese/index.html",
    title: "ACS काम की भाषा — मदुरीज़ बोलना सीखें (Madurese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मदुरीज़ बोलना सीखें — इंडोनेशिया (Madura-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मदुरीज़ बोलने का कोर्स है — 1.3 करोड़+ बोलने वाले, इंडोनेशिया की 5वीं-सबसे-बड़ी जातीय-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ace", label: "आचेनीज़", h1: "आचेनीज़ बोलना सीखें (Acehnese for Work — इंडोनेशिया (Aceh))", data: "/assets/kkb_ace_data.js", out: "courses/hi/bhasha/acehnese/index.html",
    title: "ACS काम की भाषा — आचेनीज़ बोलना सीखें (Acehnese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से आचेनीज़ बोलना सीखें — इंडोनेशिया (Aceh) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह आचेनीज़ बोलने का कोर्स है — 35 लाख बोलने वाले, Mon-Khmer-भाषाओं से विशेषताएँ साझा करती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bbc", label: "तोबा-बाटक", h1: "तोबा-बाटक बोलना सीखें (Toba Batak for Work — इंडोनेशिया (North Sumatra))", data: "/assets/kkb_bbc_data.js", out: "courses/hi/bhasha/tobabatak/index.html",
    title: "ACS काम की भाषा — तोबा-बाटक बोलना सीखें (Toba Batak for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तोबा-बाटक बोलना सीखें — इंडोनेशिया (North Sumatra) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तोबा-बाटक बोलने का कोर्स है — 20 लाख बोलने वाले, Lake Toba क्षेत्र, अपनी Batak-लिपि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bug", label: "बुगीनीज़", h1: "बुगीनीज़ बोलना सीखें (Buginese for Work — इंडोनेशिया (South Sulawesi))", data: "/assets/kkb_bug_data.js", out: "courses/hi/bhasha/buginese/index.html",
    title: "ACS काम की भाषा — बुगीनीज़ बोलना सीखें (Buginese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बुगीनीज़ बोलना सीखें — इंडोनेशिया (South Sulawesi) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बुगीनीज़ बोलने का कोर्स है — 50 लाख बोलने वाले, समुद्री-व्यापारिक संस्कृति, अपनी Lontara-लिपि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bjn", label: "बांजारीज़", h1: "बांजारीज़ बोलना सीखें (Banjarese for Work — इंडोनेशिया (Kalimantan))", data: "/assets/kkb_bjn_data.js", out: "courses/hi/bhasha/banjarese/index.html",
    title: "ACS काम की भाषा — बांजारीज़ बोलना सीखें (Banjarese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बांजारीज़ बोलना सीखें — इंडोनेशिया (Kalimantan) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बांजारीज़ बोलने का कोर्स है — 35 लाख बोलने वाले, Kalimantan की लिंगुआ-फ़्रैंका। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mak", label: "मकासारीज़", h1: "मकासारीज़ बोलना सीखें (Makassarese for Work — इंडोनेशिया (South Sulawesi))", data: "/assets/kkb_mak_data.js", out: "courses/hi/bhasha/makassarese/index.html",
    title: "ACS काम की भाषा — मकासारीज़ बोलना सीखें (Makassarese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मकासारीज़ बोलना सीखें — इंडोनेशिया (South Sulawesi) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मकासारीज़ बोलने का कोर्स है — 21 लाख बोलने वाले, अपनी Lontara-लिपि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "btx", label: "बाटक-कारो", h1: "बाटक-कारो बोलना सीखें (Batak Karo for Work — इंडोनेशिया (North Sumatra))", data: "/assets/kkb_btx_data.js", out: "courses/hi/bhasha/batakkaro/index.html",
    title: "ACS काम की भाषा — बाटक-कारो बोलना सीखें (Batak Karo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बाटक-कारो बोलना सीखें — इंडोनेशिया (North Sumatra) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बाटक-कारो बोलने का कोर्स है — 60 लाख बोलने वाले, Toba-Batak से genuinely mutually-unintelligible। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "iba", label: "इबान", h1: "इबान बोलना सीखें (Iban for Work — मलेशिया (Sarawak))", data: "/assets/kkb_iba_data.js", out: "courses/hi/bhasha/iban/index.html",
    title: "ACS काम की भाषा — इबान बोलना सीखें (Iban for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इबान बोलना सीखें — मलेशिया (Sarawak) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह इबान बोलने का कोर्स है — Sarawak की सबसे-बड़ी स्वदेशी-जातीय-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dtp", label: "कादाज़ान-दुसुन", h1: "कादाज़ान-दुसुन बोलना सीखें (Kadazan-Dusun for Work — मलेशिया (Sabah))", data: "/assets/kkb_dtp_data.js", out: "courses/hi/bhasha/kadazandusun/index.html",
    title: "ACS काम की भाषा — कादाज़ान-दुसुन बोलना सीखें (Kadazan-Dusun for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कादाज़ान-दुसुन बोलना सीखें — मलेशिया (Sabah) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कादाज़ान-दुसुन बोलने का कोर्स है — Sabah की सबसे-बड़ी स्वदेशी-जातीय-भाषा, 7+ लाख। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nod", label: "उत्तरी-थाई", h1: "उत्तरी-थाई बोलना सीखें (Northern Thai for Work — थाईलैंड (Chiang Mai))", data: "/assets/kkb_nod_data.js", out: "courses/hi/bhasha/northernthai/index.html",
    title: "ACS काम की भाषा — उत्तरी-थाई बोलना सीखें (Northern Thai for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उत्तरी-थाई बोलना सीखें — थाईलैंड (Chiang Mai) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह उत्तरी-थाई बोलने का कोर्स है — 6 million बोलने वाले, ऐतिहासिक Lan Na राज्य की भाषा, अपनी Tai Tham लिपि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "njm", label: "अंगामी", h1: "अंगामी बोलना सीखें (Angami for Work — भारत (नागालैंड))", data: "/assets/kkb_njm_data.js", out: "courses/hi/bhasha/angami/index.html",
    title: "ACS काम की भाषा — अंगामी बोलना सीखें (Angami for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अंगामी बोलना सीखें — भारत (नागालैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अंगामी बोलने का कोर्स है — नागालैंड की सबसे-बड़ी जनजातियों में से एक, अपनी Tenyidie-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nkh", label: "चाखेसांग", h1: "चाखेसांग बोलना सीखें (Chakhesang for Work — भारत (नागालैंड))", data: "/assets/kkb_nkh_data.js", out: "courses/hi/bhasha/chakhesang/index.html",
    title: "ACS काम की भाषा — चाखेसांग बोलना सीखें (Chakhesang for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चाखेसांग बोलना सीखें — भारत (नागालैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चाखेसांग बोलने का कोर्स है — नागालैंड की बड़ी जनजाति, Phek ज़िले में। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nbe", label: "कोन्याक", h1: "कोन्याक बोलना सीखें (Konyak for Work — भारत (नागालैंड))", data: "/assets/kkb_nbe_data.js", out: "courses/hi/bhasha/konyak/index.html",
    title: "ACS काम की भाषा — कोन्याक बोलना सीखें (Konyak for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोन्याक बोलना सीखें — भारत (नागालैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोन्याक बोलने का कोर्स है — नागालैंड की सबसे-बड़ी जनजाति (2 लाख+), पारंपरिक टैटू-कला के लिए प्रसिद्ध। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nbc", label: "चांग", h1: "चांग बोलना सीखें (Chang for Work — भारत (नागालैंड))", data: "/assets/kkb_nbc_data.js", out: "courses/hi/bhasha/chang/index.html",
    title: "ACS काम की भाषा — चांग बोलना सीखें (Chang for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चांग बोलना सीखें — भारत (नागालैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चांग बोलने का कोर्स है — Tuensang ज़िले की प्रमुख-जनजाति। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nsm", label: "सूमी", h1: "सूमी बोलना सीखें (Sumi for Work — भारत (नागालैंड))", data: "/assets/kkb_nsm_data.js", out: "courses/hi/bhasha/sumi/index.html",
    title: "ACS काम की भाषा — सूमी बोलना सीखें (Sumi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सूमी बोलना सीखें — भारत (नागालैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सूमी बोलने का कोर्स है — नागालैंड की सबसे-बड़ी जनजाति (2.4 लाख+), गुटुरल-ध्वनियों के लिए अनोखी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ksw", label: "करेन", h1: "करेन बोलना सीखें (Karen for Work — म्यांमार)", data: "/assets/kkb_ksw_data.js", out: "courses/hi/bhasha/karen/index.html",
    title: "ACS काम की भाषा — करेन बोलना सीखें (Karen for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से करेन बोलना सीखें — म्यांमार में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह करेन बोलने का कोर्स है — 70 लाख बोलने वाले, म्यांमार की दूसरी-सबसे-बड़ी जातीय-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "che", label: "चेचन", h1: "चेचन बोलना सीखें (Chechen for Work — रूस (चेचन्या))", data: "/assets/kkb_che_data.js", out: "courses/hi/bhasha/chechen/index.html",
    title: "ACS काम की भाषा — चेचन बोलना सीखें (Chechen for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चेचन बोलना सीखें — रूस (चेचन्या) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चेचन बोलने का कोर्स है — 17 लाख बोलने वाले, उत्तर-काकेशस का सबसे-बड़ा जातीय-समूह। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dar", label: "दर्गिन", h1: "दर्गिन बोलना सीखें (Dargwa for Work — रूस (Dagestan))", data: "/assets/kkb_dar_data.js", out: "courses/hi/bhasha/dargwa/index.html",
    title: "ACS काम की भाषा — दर्गिन बोलना सीखें (Dargwa for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से दर्गिन बोलना सीखें — रूस (Dagestan) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह दर्गिन बोलने का कोर्स है — 5.9 लाख बोलने वाले, Dagestan की दूसरी-बड़ी-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lez", label: "लेज़गी", h1: "लेज़गी बोलना सीखें (Lezgian for Work — रूस (Dagestan))", data: "/assets/kkb_lez_data.js", out: "courses/hi/bhasha/lezgian/index.html",
    title: "ACS काम की भाषा — लेज़गी बोलना सीखें (Lezgian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लेज़गी बोलना सीखें — रूस (Dagestan) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लेज़गी बोलने का कोर्स है — 8 लाख+ बोलने वाले, अज़रबैजान में भी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kbd", label: "काबर्दीनो", h1: "काबर्दीनो बोलना सीखें (Kabardian for Work — रूस (Kabardino-Balkaria))", data: "/assets/kkb_kbd_data.js", out: "courses/hi/bhasha/kabardian/index.html",
    title: "ACS काम की भाषा — काबर्दीनो बोलना सीखें (Kabardian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से काबर्दीनो बोलना सीखें — रूस (Kabardino-Balkaria) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह काबर्दीनो बोलने का कोर्स है — 5.2 लाख बोलने वाले, Circassian-भाषा-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tuk", label: "तुर्कमेन", h1: "तुर्कमेन बोलना सीखें (Turkmen for Work — तुर्कमेनिस्तान)", data: "/assets/kkb_tuk_data.js", out: "courses/hi/bhasha/turkmen/index.html",
    title: "ACS काम की भाषा — तुर्कमेन बोलना सीखें (Turkmen for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुर्कमेन बोलना सीखें — तुर्कमेनिस्तान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तुर्कमेन बोलने का कोर्स है — तुर्कमेनिस्तान की राष्ट्रीय-भाषा, 70 लाख+ बोलने वाले। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tet", label: "तेतुम", h1: "तेतुम बोलना सीखें (Tetum for Work — तिमोर-लेस्ते)", data: "/assets/kkb_tet_data.js", out: "courses/hi/bhasha/tetum/index.html",
    title: "ACS काम की भाषा — तेतुम बोलना सीखें (Tetum for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तेतुम बोलना सीखें — तिमोर-लेस्ते में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तेतुम बोलने का कोर्स है — तिमोर-लेस्ते की राष्ट्रीय-भाषा, पुर्तगाली के साथ। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tcz", label: "थाडौ", h1: "थाडौ बोलना सीखें (Thadou for Work — भारत (मणिपुर))", data: "/assets/kkb_tcz_data.js", out: "courses/hi/bhasha/thadou/index.html",
    title: "ACS काम की भाषा — थाडौ बोलना सीखें (Thadou for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से थाडौ बोलना सीखें — भारत (मणिपुर) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह थाडौ बोलने का कोर्स है — मणिपुर की Kuki-जनजाति, Toubou-Kuki भी कहलाती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pck", label: "पाइते", h1: "पाइते बोलना सीखें (Paite for Work — भारत (मणिपुर, Churachandpur))", data: "/assets/kkb_pck_data.js", out: "courses/hi/bhasha/paite/index.html",
    title: "ACS काम की भाषा — पाइते बोलना सीखें (Paite for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पाइते बोलना सीखें — भारत (मणिपुर, Churachandpur) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पाइते बोलने का कोर्स है — Churachandpur-ज़िले की लिंगुआ-फ़्रैंका। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "njz", label: "न्यिशी", h1: "न्यिशी बोलना सीखें (Nyishi for Work — भारत (अरुणाचल-प्रदेश))", data: "/assets/kkb_njz_data.js", out: "courses/hi/bhasha/nyishi/index.html",
    title: "ACS काम की भाषा — न्यिशी बोलना सीखें (Nyishi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से न्यिशी बोलना सीखें — भारत (अरुणाचल-प्रदेश) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह न्यिशी बोलने का कोर्स है — अरुणाचल-प्रदेश की सबसे-बड़ी जनजाति (3 लाख+)। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "apt", label: "अपातानी", h1: "अपातानी बोलना सीखें (Apatani for Work — भारत (अरुणाचल-प्रदेश))", data: "/assets/kkb_apt_data.js", out: "courses/hi/bhasha/apatani/index.html",
    title: "ACS काम की भाषा — अपातानी बोलना सीखें (Apatani for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अपातानी बोलना सीखें — भारत (अरुणाचल-प्रदेश) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अपातानी बोलने का कोर्स है — Ziro-घाटी की अनोखी जनजाति, UNESCO-विश्व-धरोहर-क्षेत्र। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mtq", label: "म्योंग", h1: "म्योंग बोलना सीखें (Muong for Work — वियतनाम)", data: "/assets/kkb_mtq_data.js", out: "courses/hi/bhasha/muong/index.html",
    title: "ACS काम की भाषा — म्योंग बोलना सीखें (Muong for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से म्योंग बोलना सीखें — वियतनाम में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह म्योंग बोलने का कोर्स है — वियतनाम की दूसरी-सबसे-बड़ी जातीय-अल्पसंख्यक, Vietnamese से genuinely अलग-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "swb", label: "कोमोरियन", h1: "कोमोरियन बोलना सीखें (Comorian for Work — कोमोरोस)", data: "/assets/kkb_swb_data.js", out: "courses/hi/bhasha/comorian/index.html",
    title: "ACS काम की भाषा — कोमोरियन बोलना सीखें (Comorian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोमोरियन बोलना सीखें — कोमोरोस में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोमोरियन बोलने का कोर्स है — 4-द्वीपों की राष्ट्रीय-भाषा, स्वाहिली-परिवार से निकट-संबंधी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "crs", label: "सेशेल्वा (Seychellois Creole)", h1: "सेशेल्वा (Seychellois Creole) बोलना सीखें (Seselwa for Work — सेशेल्स)", data: "/assets/kkb_crs_data.js", out: "courses/hi/bhasha/seselwa/index.html",
    title: "ACS काम की भाषा — सेशेल्वा बोलना सीखें (Seselwa for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सेशेल्वा बोलना सीखें — सेशेल्स में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सेशेल्वा बोलने का कोर्स है — 115-द्वीपों के देश की राष्ट्रीय-भाषा, फ्रेंच-आधारित creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rcf", label: "रीयूनियन-क्रियोल", h1: "रीयूनियन-क्रियोल बोलना सीखें (Reunion Creole for Work — रीयूनियन (फ्रांसीसी-प्रदेश))", data: "/assets/kkb_rcf_data.js", out: "courses/hi/bhasha/reunioncreole/index.html",
    title: "ACS काम की भाषा — रीयूनियन-क्रियोल बोलना सीखें (Reunion Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रीयूनियन-क्रियोल बोलना सीखें — रीयूनियन (फ्रांसीसी-प्रदेश) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह रीयूनियन-क्रियोल बोलने का कोर्स है — ~8 लाख बोलने वाले, फ्रेंच-आधारित creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "oon", label: "ओंगे", h1: "ओंगे बोलना सीखें (Onge for Work — भारत (लिटिल-अंडमान))", data: "/assets/kkb_oon_data.js", out: "courses/hi/bhasha/onge/index.html",
    title: "ACS काम की भाषा — ओंगे बोलना सीखें (Onge for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओंगे बोलना सीखें — भारत (लिटिल-अंडमान) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ओंगे बोलने का कोर्स है — Ongan-भाषा-परिवार (दुनिया के मुख्य-भाषा-परिवारों में से एक), लिटिल-अंडमान-द्वीप के मूल-निवासी, अत्यंत-लुप्तप्राय (~100 वक्ता)। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tpi", label: "टोक-पिसिन", h1: "टोक-पिसिन बोलना सीखें (Tok Pisin for Work — पापुआ न्यू गिनी)", data: "/assets/kkb_tpi_data.js", out: "courses/hi/bhasha/tokpisin/index.html",
    title: "ACS काम की भाषा — टोक-पिसिन बोलना सीखें (Tok Pisin for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से टोक-पिसिन बोलना सीखें — पापुआ न्यू गिनी में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह टोक-पिसिन बोलने का कोर्स है — राष्ट्रीय-भाषा, 40+ लाख बोलने वाले, English-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fij", label: "फिजियन", h1: "फिजियन बोलना सीखें (Fijian for Work — फिजी)", data: "/assets/kkb_fij_data.js", out: "courses/hi/bhasha/fijian/index.html",
    title: "ACS काम की भाषा — फिजियन बोलना सीखें (Fijian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फिजियन बोलना सीखें — फिजी में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फिजियन बोलने का कोर्स है — राष्ट्रीय-भाषा, 3-4 लाख मातृभाषी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bis", label: "बिस्लामा", h1: "बिस्लामा बोलना सीखें (Bislama for Work — वानुआटू)", data: "/assets/kkb_bis_data.js", out: "courses/hi/bhasha/bislama/index.html",
    title: "ACS काम की भाषा — बिस्लामा बोलना सीखें (Bislama for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बिस्लामा बोलना सीखें — वानुआटू में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बिस्लामा बोलने का कोर्स है — राष्ट्रीय-भाषा, English-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pis", label: "पिजिन", h1: "पिजिन बोलना सीखें (Pijin for Work — सोलोमन-द्वीपसमूह)", data: "/assets/kkb_pis_data.js", out: "courses/hi/bhasha/pijin/index.html",
    title: "ACS काम की भाषा — पिजिन बोलना सीखें (Pijin for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पिजिन बोलना सीखें — सोलोमन-द्वीपसमूह में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पिजिन बोलने का कोर्स है — राष्ट्रीय-लिंगुआ-फ़्रैंका, English-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mri", label: "माओरी", h1: "माओरी बोलना सीखें (Maori for Work — न्यूज़ीलैंड)", data: "/assets/kkb_mri_data.js", out: "courses/hi/bhasha/maori/index.html",
    title: "ACS काम की भाषा — माओरी बोलना सीखें (Maori for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से माओरी बोलना सीखें — न्यूज़ीलैंड में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह माओरी बोलने का कोर्स है — राष्ट्रीय-भाषा, Polynesian-संस्कृति। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "smo", label: "सामोअन", h1: "सामोअन बोलना सीखें (Samoan for Work — समोआ)", data: "/assets/kkb_smo_data.js", out: "courses/hi/bhasha/samoan/index.html",
    title: "ACS काम की भाषा — सामोअन बोलना सीखें (Samoan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सामोअन बोलना सीखें — समोआ में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सामोअन बोलने का कोर्स है — राष्ट्रीय-भाषा, ~4.7 लाख बोलने वाले। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ton", label: "टोंगन", h1: "टोंगन बोलना सीखें (Tongan for Work — टोंगा)", data: "/assets/kkb_ton_data.js", out: "courses/hi/bhasha/tongan/index.html",
    title: "ACS काम की भाषा — टोंगन बोलना सीखें (Tongan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से टोंगन बोलना सीखें — टोंगा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह टोंगन बोलने का कोर्स है — राष्ट्रीय-भाषा, Polynesian। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hmo", label: "हिरी-मोटू", h1: "हिरी-मोटू बोलना सीखें (Hiri Motu for Work — पापुआ न्यू गिनी)", data: "/assets/kkb_hmo_data.js", out: "courses/hi/bhasha/hirimotu/index.html",
    title: "ACS काम की भाषा — हिरी-मोटू बोलना सीखें (Hiri Motu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिरी-मोटू बोलना सीखें — पापुआ न्यू गिनी में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हिरी-मोटू बोलने का कोर्स है — दूसरी-राष्ट्रीय-भाषा, Motu से mutually-unintelligible। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pjt", label: "पित्यान्त्यात्यारा", h1: "पित्यान्त्यात्यारा बोलना सीखें (Pitjantjatjara for Work — ऑस्ट्रेलिया (केंद्रीय-रेगिस्तान))", data: "/assets/kkb_pjt_data.js", out: "courses/hi/bhasha/pitjantjatjara/index.html",
    title: "ACS काम की भाषा — पित्यान्त्यात्यारा बोलना सीखें (Pitjantjatjara for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पित्यान्त्यात्यारा बोलना सीखें — ऑस्ट्रेलिया (केंद्रीय-रेगिस्तान) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पित्यान्त्यात्यारा बोलने का कोर्स है — Aṉangu-Pitjantjatjara-Yankunytjatjara क्षेत्र की आधिकारिक-आदिवासी-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dan", label: "डैनिश", h1: "डैनिश बोलना सीखें (Danish for Work — डेनमार्क)", data: "/assets/kkb_dan_data.js", out: "courses/hi/bhasha/danish/index.html",
    title: "ACS काम की भाषा — डैनिश बोलना सीखें (Danish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डैनिश बोलना सीखें — डेनमार्क में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डैनिश बोलने का कोर्स है — राष्ट्रीय-भाषा, North-Germanic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nob", label: "नॉर्वेजियन", h1: "नॉर्वेजियन बोलना सीखें (Norwegian for Work — नॉर्वे)", data: "/assets/kkb_nob_data.js", out: "courses/hi/bhasha/norwegian/index.html",
    title: "ACS काम की भाषा — नॉर्वेजियन बोलना सीखें (Norwegian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नॉर्वेजियन बोलना सीखें — नॉर्वे में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नॉर्वेजियन बोलने का कोर्स है — राष्ट्रीय-भाषा, North-Germanic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "isl", label: "आइसलैंडिक", h1: "आइसलैंडिक बोलना सीखें (Icelandic for Work — आइसलैंड)", data: "/assets/kkb_isl_data.js", out: "courses/hi/bhasha/icelandic/index.html",
    title: "ACS काम की भाषा — आइसलैंडिक बोलना सीखें (Icelandic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से आइसलैंडिक बोलना सीखें — आइसलैंड में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह आइसलैंडिक बोलने का कोर्स है — राष्ट्रीय-भाषा, Old-Norse से सबसे-कम-बदली। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "slv", label: "स्लोवेनियाई", h1: "स्लोवेनियाई बोलना सीखें (Slovenian for Work — स्लोवेनिया)", data: "/assets/kkb_slv_data.js", out: "courses/hi/bhasha/slovenian/index.html",
    title: "ACS काम की भाषा — स्लोवेनियाई बोलना सीखें (Slovenian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्लोवेनियाई बोलना सीखें — स्लोवेनिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह स्लोवेनियाई बोलने का कोर्स है — राष्ट्रीय-भाषा, South-Slavic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "est", label: "एस्टोनियाई", h1: "एस्टोनियाई बोलना सीखें (Estonian for Work — एस्टोनिया)", data: "/assets/kkb_est_data.js", out: "courses/hi/bhasha/estonian/index.html",
    title: "ACS काम की भाषा — एस्टोनियाई बोलना सीखें (Estonian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से एस्टोनियाई बोलना सीखें — एस्टोनिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह एस्टोनियाई बोलने का कोर्स है — राष्ट्रीय-भाषा, Finno-Ugric-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lav", label: "लात्वियाई", h1: "लात्वियाई बोलना सीखें (Latvian for Work — लात्विया)", data: "/assets/kkb_lav_data.js", out: "courses/hi/bhasha/latvian/index.html",
    title: "ACS काम की भाषा — लात्वियाई बोलना सीखें (Latvian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लात्वियाई बोलना सीखें — लात्विया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लात्वियाई बोलने का कोर्स है — राष्ट्रीय-भाषा, Baltic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sqi", label: "अल्बानियाई", h1: "अल्बानियाई बोलना सीखें (Albanian for Work — अल्बानिया+कोसोवो)", data: "/assets/kkb_sqi_data.js", out: "courses/hi/bhasha/albanian/index.html",
    title: "ACS काम की भाषा — अल्बानियाई बोलना सीखें (Albanian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अल्बानियाई बोलना सीखें — अल्बानिया+कोसोवो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अल्बानियाई बोलने का कोर्स है — राष्ट्रीय-भाषा, अपना-अलग-Indo-European-उपशाखा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mkd", label: "मैसीडोनियाई", h1: "मैसीडोनियाई बोलना सीखें (Macedonian for Work — उत्तर-मैसीडोनिया)", data: "/assets/kkb_mkd_data.js", out: "courses/hi/bhasha/macedonian/index.html",
    title: "ACS काम की भाषा — मैसीडोनियाई बोलना सीखें (Macedonian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मैसीडोनियाई बोलना सीखें — उत्तर-मैसीडोनिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मैसीडोनियाई बोलने का कोर्स है — राष्ट्रीय-भाषा, South-Slavic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ltz", label: "लक्ज़मबर्गिश", h1: "लक्ज़मबर्गिश बोलना सीखें (Luxembourgish for Work — लक्ज़मबर्ग)", data: "/assets/kkb_ltz_data.js", out: "courses/hi/bhasha/luxembourgish/index.html",
    title: "ACS काम की भाषा — लक्ज़मबर्गिश बोलना सीखें (Luxembourgish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लक्ज़मबर्गिश बोलना सीखें — लक्ज़मबर्ग में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लक्ज़मबर्गिश बोलने का कोर्स है — राष्ट्रीय-भाषा, West-Germanic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cat", label: "कातालान", h1: "कातालान बोलना सीखें (Catalan for Work — स्पेन (कातालोनिया))", data: "/assets/kkb_cat_data.js", out: "courses/hi/bhasha/catalan/index.html",
    title: "ACS काम की भाषा — कातालान बोलना सीखें (Catalan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कातालान बोलना सीखें — स्पेन (कातालोनिया) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कातालान बोलने का कोर्स है — ~1 करोड़ बोलने वाले। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "eus", label: "बास्क", h1: "बास्क बोलना सीखें (Basque for Work — स्पेन/फ्रांस (बास्क-देश))", data: "/assets/kkb_eus_data.js", out: "courses/hi/bhasha/basque/index.html",
    title: "ACS काम की भाषा — बास्क बोलना सीखें (Basque for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बास्क बोलना सीखें — स्पेन/फ्रांस (बास्क-देश) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बास्क बोलने का कोर्स है — यूरोप की सबसे-पुरानी-जीवित भाषा, किसी भी-भाषा-परिवार से असंबंधित। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "glg", label: "गैलिशियन", h1: "गैलिशियन बोलना सीखें (Galician for Work — स्पेन (गैलिसिया))", data: "/assets/kkb_glg_data.js", out: "courses/hi/bhasha/galician/index.html",
    title: "ACS काम की भाषा — गैलिशियन बोलना सीखें (Galician for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गैलिशियन बोलना सीखें — स्पेन (गैलिसिया) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गैलिशियन बोलने का कोर्स है — पुर्तगाली से निकट-संबंधी पर genuinely-अलग-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cym", label: "वेल्श", h1: "वेल्श बोलना सीखें (Welsh for Work — यूके (वेल्स))", data: "/assets/kkb_cym_data.js", out: "courses/hi/bhasha/welsh/index.html",
    title: "ACS काम की भाषा — वेल्श बोलना सीखें (Welsh for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वेल्श बोलना सीखें — यूके (वेल्स) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वेल्श बोलने का कोर्स है — Celtic-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gle", label: "आइरिश", h1: "आइरिश बोलना सीखें (Irish for Work — आयरलैंड)", data: "/assets/kkb_gle_data.js", out: "courses/hi/bhasha/irish/index.html",
    title: "ACS काम की भाषा — आइरिश बोलना सीखें (Irish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से आइरिश बोलना सीखें — आयरलैंड में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह आइरिश बोलने का कोर्स है — राष्ट्रीय-भाषा, Celtic-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gla", label: "स्कॉटिश-गेलिक", h1: "स्कॉटिश-गेलिक बोलना सीखें (Scottish Gaelic for Work — यूके (स्कॉटलैंड))", data: "/assets/kkb_gla_data.js", out: "courses/hi/bhasha/scottishgaelic/index.html",
    title: "ACS काम की भाषा — स्कॉटिश-गेलिक बोलना सीखें (Scottish Gaelic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्कॉटिश-गेलिक बोलना सीखें — यूके (स्कॉटलैंड) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह स्कॉटिश-गेलिक बोलने का कोर्स है — Celtic-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fao", label: "फ़रोईज़", h1: "फ़रोईज़ बोलना सीखें (Faroese for Work — फ़ैरो-द्वीपसमूह (डेनमार्क-स्वायत्त))", data: "/assets/kkb_fao_data.js", out: "courses/hi/bhasha/faroese/index.html",
    title: "ACS काम की भाषा — फ़रोईज़ बोलना सीखें (Faroese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़रोईज़ बोलना सीखें — फ़ैरो-द्वीपसमूह (डेनमार्क-स्वायत्त) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़रोईज़ बोलने का कोर्स है — राष्ट्रीय-भाषा, North-Germanic। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kal", label: "ग्रीनलैंडिक", h1: "ग्रीनलैंडिक बोलना सीखें (Greenlandic for Work — ग्रीनलैंड (डेनमार्क-स्वायत्त))", data: "/assets/kkb_kal_data.js", out: "courses/hi/bhasha/greenlandic/index.html",
    title: "ACS काम की भाषा — ग्रीनलैंडिक बोलना सीखें (Greenlandic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ग्रीनलैंडिक बोलना सीखें — ग्रीनलैंड (डेनमार्क-स्वायत्त) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ग्रीनलैंडिक बोलने का कोर्स है — एकमात्र-आधिकारिक-भाषा, Eskimo-Aleut-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sme", label: "उत्तरी-सामी", h1: "उत्तरी-सामी बोलना सीखें (Northern Sami for Work — नॉर्वे-फ़िनलैंड-स्वीडन आर्कटिक-क्षेत्र)", data: "/assets/kkb_sme_data.js", out: "courses/hi/bhasha/northernsami/index.html",
    title: "ACS काम की भाषा — उत्तरी-सामी बोलना सीखें (Northern Sami for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उत्तरी-सामी बोलना सीखें — नॉर्वे-फ़िनलैंड-स्वीडन आर्कटिक-क्षेत्र में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह उत्तरी-सामी बोलने का कोर्स है — आर्कटिक-यूरोप की स्वदेशी-भाषा, Uralic-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "niv", label: "निव्ख", h1: "निव्ख बोलना सीखें (Nivkh for Work — रूस (सखालिन-द्वीप))", data: "/assets/kkb_niv_data.js", out: "courses/hi/bhasha/nivkh/index.html",
    title: "ACS काम की भाषा — निव्ख बोलना सीखें (Nivkh for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से निव्ख बोलना सीखें — रूस (सखालिन-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह निव्ख बोलने का कोर्स है — भाषाई-पृथक, ~200 वक्ता बचे। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nav", label: "नावाहो", h1: "नावाहो बोलना सीखें (Navajo for Work — USA (एरिज़ोना/न्यू मेक्सिको))", data: "/assets/kkb_nav_data.js", out: "courses/hi/bhasha/navajo/index.html",
    title: "ACS काम की भाषा — नावाहो बोलना सीखें (Navajo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नावाहो बोलना सीखें — USA (एरिज़ोना/न्यू मेक्सिको) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नावाहो बोलने का कोर्स है — सबसे-बड़ी उत्तर-अमेरिकी मूल-निवासी-भाषा, Southern-Athabaskan। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "crk", label: "क्री", h1: "क्री बोलना सीखें (Cree for Work — कनाडा)", data: "/assets/kkb_crk_data.js", out: "courses/hi/bhasha/cree/index.html",
    title: "ACS काम की भाषा — क्री बोलना सीखें (Cree for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क्री बोलना सीखें — कनाडा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह क्री बोलने का कोर्स है — सबसे-व्यापक मूल-निवासी-भाषा, Algonquian-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "iku", label: "इनुक्तितुत", h1: "इनुक्तितुत बोलना सीखें (Inuktitut for Work — कनाडा (Nunavut))", data: "/assets/kkb_iku_data.js", out: "courses/hi/bhasha/inuktitut/index.html",
    title: "ACS काम की भाषा — इनुक्तितुत बोलना सीखें (Inuktitut for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से इनुक्तितुत बोलना सीखें — कनाडा (Nunavut) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह इनुक्तितुत बोलने का कोर्स है — आधिकारिक-भाषा, Eskimo-Aleut-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "oji", label: "ओजिब्वे", h1: "ओजिब्वे बोलना सीखें (Ojibwe for Work — USA/कनाडा (Great-Lakes-क्षेत्र))", data: "/assets/kkb_oji_data.js", out: "courses/hi/bhasha/ojibwe/index.html",
    title: "ACS काम की भाषा — ओजिब्वे बोलना सीखें (Ojibwe for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओजिब्वे बोलना सीखें — USA/कनाडा (Great-Lakes-क्षेत्र) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ओजिब्वे बोलने का कोर्स है — Algonquian-परिवार, Anishinaabemowin। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nah", label: "नाहुआतल", h1: "नाहुआतल बोलना सीखें (Nahuatl for Work — मेक्सिको)", data: "/assets/kkb_nah_data.js", out: "courses/hi/bhasha/nahuatl/index.html",
    title: "ACS काम की भाषा — नाहुआतल बोलना सीखें (Nahuatl for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नाहुआतल बोलना सीखें — मेक्सिको में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नाहुआतल बोलने का कोर्स है — सबसे-बड़ी मूल-निवासी-भाषा, Aztec-विरासत। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "haw", label: "हवाईयन", h1: "हवाईयन बोलना सीखें (Hawaiian for Work — USA (हवाई-राज्य))", data: "/assets/kkb_haw_data.js", out: "courses/hi/bhasha/hawaiian/index.html",
    title: "ACS काम की भाषा — हवाईयन बोलना सीखें (Hawaiian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हवाईयन बोलना सीखें — USA (हवाई-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हवाईयन बोलने का कोर्स है — Polynesian-परिवार, USA की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lkt", label: "लाकोटा", h1: "लाकोटा बोलना सीखें (Lakota for Work — USA (Great-Plains))", data: "/assets/kkb_lkt_data.js", out: "courses/hi/bhasha/lakota/index.html",
    title: "ACS काम की भाषा — लाकोटा बोलना सीखें (Lakota for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लाकोटा बोलना सीखें — USA (Great-Plains) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लाकोटा बोलने का कोर्स है — Sioux-संघ की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "chr", label: "चेरोकी", h1: "चेरोकी बोलना सीखें (Cherokee for Work — USA)", data: "/assets/kkb_chr_data.js", out: "courses/hi/bhasha/cherokee/index.html",
    title: "ACS काम की भाषा — चेरोकी बोलना सीखें (Cherokee for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चेरोकी बोलना सीखें — USA में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चेरोकी बोलने का कोर्स है — प्रमुख पूर्वी मूल-निवासी-भाषा, अपनी-syllabary-लिपि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "guc", label: "वायुनाइकी", h1: "वायुनाइकी बोलना सीखें (Wayuunaiki for Work — कोलंबिया/वेनेज़ुएला (Guajira-प्रायद्वीप))", data: "/assets/kkb_guc_data.js", out: "courses/hi/bhasha/wayuunaiki/index.html",
    title: "ACS काम की भाषा — वायुनाइकी बोलना सीखें (Wayuunaiki for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वायुनाइकी बोलना सीखें — कोलंबिया/वेनेज़ुएला (Guajira-प्रायद्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वायुनाइकी बोलने का कोर्स है — कोलंबिया की सबसे-बड़ी मूल-निवासी-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rap", label: "रापा-नुई", h1: "रापा-नुई बोलना सीखें (Rapa Nui for Work — चिली (ईस्टर-द्वीप, प्रशांत-महासागर))", data: "/assets/kkb_rap_data.js", out: "courses/hi/bhasha/rapanui/index.html",
    title: "ACS काम की भाषा — रापा-नुई बोलना सीखें (Rapa Nui for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रापा-नुई बोलना सीखें — चिली (ईस्टर-द्वीप, प्रशांत-महासागर) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह रापा-नुई बोलने का कोर्स है — Polynesian-भाषा, विश्व-प्रसिद्ध Moai-मूर्तियों की भूमि। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "srn", label: "स्रानान-टोंगो", h1: "स्रानान-टोंगो बोलना सीखें (Sranan Tongo for Work — सूरीनाम)", data: "/assets/kkb_srn_data.js", out: "courses/hi/bhasha/srananTongo/index.html",
    title: "ACS काम की भाषा — स्रानान-टोंगो बोलना सीखें (Sranan Tongo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्रानान-टोंगो बोलना सीखें — सूरीनाम में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह स्रानान-टोंगो बोलने का कोर्स है — राष्ट्रीय-लिंगुआ-फ़्रैंका, English-आधारित-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "acu", label: "अचुआर-शिविआर", h1: "अचुआर-शिविआर बोलना सीखें (Achuar-Shiwiar for Work — इक्वाडोर/पेरू (अमेज़न-वर्षावन))", data: "/assets/kkb_acu_data.js", out: "courses/hi/bhasha/achuarshiwiar/index.html",
    title: "ACS काम की भाषा — अचुआर-शिविआर बोलना सीखें (Achuar-Shiwiar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अचुआर-शिविआर बोलना सीखें — इक्वाडोर/पेरू (अमेज़न-वर्षावन) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अचुआर-शिविआर बोलने का कोर्स है — Chicham/Jivaroan-परिवार, Shuar की निकट-संबंधी भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gyn", label: "गुयानीज़-क्रियोल", h1: "गुयानीज़-क्रियोल बोलना सीखें (Guyanese Creole for Work — गुयाना)", data: "/assets/kkb_gyn_data.js", out: "courses/hi/bhasha/guyanesecreole/index.html",
    title: "ACS काम की भाषा — गुयानीज़-क्रियोल बोलना सीखें (Guyanese Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गुयानीज़-क्रियोल बोलना सीखें — गुयाना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गुयानीज़-क्रियोल बोलने का कोर्स है — व्यापक-बोली जाने वाली English-आधारित-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fgc", label: "फ़्रेंच-गयानीज़-क्रियोल", h1: "फ़्रेंच-गयानीज़-क्रियोल बोलना सीखें (French Guianese Creole for Work — फ़्रेंच-गयाना)", data: "/assets/kkb_fgc_data.js", out: "courses/hi/bhasha/frenchguianesecreole/index.html",
    title: "ACS काम की भाषा — फ़्रेंच-गयानीज़-क्रियोल बोलना सीखें (French Guianese Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़्रेंच-गयानीज़-क्रियोल बोलना सीखें — फ़्रेंच-गयाना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़्रेंच-गयानीज़-क्रियोल बोलने का कोर्स है — French-आधारित-creole, स्थानीय-लिंगुआ-फ़्रैंका। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "trn", label: "त्रिनिदादियन-क्रियोल", h1: "त्रिनिदादियन-क्रियोल बोलना सीखें (Trinidadian Creole for Work — त्रिनिदाद-टोबैगो)", data: "/assets/kkb_trn_data.js", out: "courses/hi/bhasha/trinidadiancreole/index.html",
    title: "ACS काम की भाषा — त्रिनिदादियन-क्रियोल बोलना सीखें (Trinidadian Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से त्रिनिदादियन-क्रियोल बोलना सीखें — त्रिनिदाद-टोबैगो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह त्रिनिदादियन-क्रियोल बोलने का कोर्स है — English-आधारित-creole, कैरिबियन-द्वीपसमूह। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "jiv", label: "शुआर", h1: "शुआर बोलना सीखें (Shuar for Work — इक्वाडोर (अमेज़न-वर्षावन))", data: "/assets/kkb_jiv_data.js", out: "courses/hi/bhasha/shuar/index.html",
    title: "ACS काम की भाषा — शुआर बोलना सीखें (Shuar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से शुआर बोलना सीखें — इक्वाडोर (अमेज़न-वर्षावन) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह शुआर बोलने का कोर्स है — Chicham/Jivaroan-परिवार, अमेज़न-बेसिन की सबसे-बड़ी भाषाओं में से एक (80,000+ वक्ता)। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kea", label: "केप-वर्देयन-क्रियोल", h1: "केप-वर्देयन-क्रियोल बोलना सीखें (Cape Verdean Creole for Work — केप-वर्दे)", data: "/assets/kkb_kea_data.js", out: "courses/hi/bhasha/capeverdean/index.html",
    title: "ACS काम की भाषा — केप-वर्देयन-क्रियोल बोलना सीखें (Cape Verdean Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से केप-वर्देयन-क्रियोल बोलना सीखें — केप-वर्दे में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह केप-वर्देयन-क्रियोल बोलने का कोर्स है — पुर्तगाली-आधारित-creole, लगभग पूरी-आबादी की मातृभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pap", label: "पापियामेंटो", h1: "पापियामेंटो बोलना सीखें (Papiamento for Work — अरूबा/कुराساओ/बोनेयर (ABC-द्वीपसमूह))", data: "/assets/kkb_pap_data.js", out: "courses/hi/bhasha/papiamento/index.html",
    title: "ACS काम की भाषा — पापियामेंटो बोलना सीखें (Papiamento for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पापियामेंटो बोलना सीखें — अरूबा/कुराساओ/बोनेयर (ABC-द्वीपसमूह) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पापियामेंटो बोलने का कोर्स है — स्पेनिश-पुर्तगाली-डच-अफ़्रीकी-मिश्रित-भाषा, आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "acf", label: "सेंट-लूसियन-क्रियोल", h1: "सेंट-लूसियन-क्रियोल बोलना सीखें (Saint Lucian Creole for Work — सेंट-लूसिया)", data: "/assets/kkb_acf_data.js", out: "courses/hi/bhasha/saintlucian/index.html",
    title: "ACS काम की भाषा — सेंट-लूसियन-क्रियोल बोलना सीखें (Saint Lucian Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सेंट-लूसियन-क्रियोल बोलना सीखें — सेंट-लूसिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सेंट-लूसियन-क्रियोल बोलने का कोर्स है — French-आधारित-creole, 95% आबादी बोलती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cri", label: "फ़ोर्रो", h1: "फ़ोर्रो बोलना सीखें (Forro for Work — साओ-टोमे-ए-प्रिंसिपी (गिनी-की-खाड़ी))", data: "/assets/kkb_cri_data.js", out: "courses/hi/bhasha/forro/index.html",
    title: "ACS काम की भाषा — फ़ोर्रो बोलना सीखें (Forro for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़ोर्रो बोलना सीखें — साओ-टोमे-ए-प्रिंसिपी (गिनी-की-खाड़ी) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़ोर्रो बोलने का कोर्स है — पुर्तगाली-आधारित-creole, मुक्त-हुए-दासों की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bjs", label: "बाजन-क्रियोल", h1: "बाजन-क्रियोल बोलना सीखें (Bajan Creole for Work — बारबाडोस)", data: "/assets/kkb_bjs_data.js", out: "courses/hi/bhasha/bajan/index.html",
    title: "ACS काम की भाषा — बाजन-क्रियोल बोलना सीखें (Bajan Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बाजन-क्रियोल बोलना सीखें — बारबाडोस में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बाजन-क्रियोल बोलने का कोर्स है — English-आधारित-creole, मानक-अंग्रेज़ी से सबसे-मिलता-जुलता कैरिबियन-creole। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ch", label: "चामोरो", h1: "चामोरो बोलना सीखें (Chamorro for Work — गुआम/उत्तरी-मारियाना-द्वीपसमूह)", data: "/assets/kkb_ch_data.js", out: "courses/hi/bhasha/chamorro/index.html",
    title: "ACS काम की भाषा — चामोरो बोलना सीखें (Chamorro for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चामोरो बोलना सीखें — गुआम/उत्तरी-मारियाना-द्वीपसमूह में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चामोरो बोलने का कोर्स है — Austronesian-भाषा, स्पेनिश-प्रभाव समेत, गुआम+उत्तरी-मारियाना दोनों की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pau", label: "पलाऊआन", h1: "पलाऊआन बोलना सीखें (Palauan for Work — पलाऊ)", data: "/assets/kkb_pau_data.js", out: "courses/hi/bhasha/palauan/index.html",
    title: "ACS काम की भाषा — पलाऊआन बोलना सीखें (Palauan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पलाऊआन बोलना सीखें — पलाऊ में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पलाऊआन बोलने का कोर्स है — Austronesian-भाषा, पलाऊ की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mh", label: "मार्शलीज़", h1: "मार्शलीज़ बोलना सीखें (Marshallese for Work — मार्शल-द्वीपसमूह)", data: "/assets/kkb_mh_data.js", out: "courses/hi/bhasha/marshallese/index.html",
    title: "ACS काम की भाषा — मार्शलीज़ बोलना सीखें (Marshallese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मार्शलीज़ बोलना सीखें — मार्शल-द्वीपसमूह में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मार्शलीज़ बोलने का कोर्स है — Micronesian-भाषा, मार्शल-द्वीपसमूह की आधिकारिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "chk", label: "चुउकीज़", h1: "चुउकीज़ बोलना सीखें (Chuukese for Work — FSM (चुउक-राज्य))", data: "/assets/kkb_chk_data.js", out: "courses/hi/bhasha/chuukese/index.html",
    title: "ACS काम की भाषा — चुउकीज़ बोलना सीखें (Chuukese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चुउकीज़ बोलना सीखें — FSM (चुउक-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह चुउकीज़ बोलने का कोर्स है — Federated States of Micronesia की सबसे-बड़ी-बोली जाने वाली-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pon", label: "पोन्पेइयन", h1: "पोन्पेइयन बोलना सीखें (Pohnpeian for Work — FSM (पोन्पेई-राज्य))", data: "/assets/kkb_pon_data.js", out: "courses/hi/bhasha/pohnpeian/index.html",
    title: "ACS काम की भाषा — पोन्पेइयन बोलना सीखें (Pohnpeian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पोन्पेइयन बोलना सीखें — FSM (पोन्पेई-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पोन्पेइयन बोलने का कोर्स है — FSM की दूसरी-सबसे-बड़ी भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kos", label: "कोस्राएन", h1: "कोस्राएन बोलना सीखें (Kosraean for Work — FSM (कोस्राए-राज्य))", data: "/assets/kkb_kos_data.js", out: "courses/hi/bhasha/kosraean/index.html",
    title: "ACS काम की भाषा — कोस्राएन बोलना सीखें (Kosraean for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोस्राएन बोलना सीखें — FSM (कोस्राए-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोस्राएन बोलने का कोर्स है — सबसे-अलग-थलग Micronesian-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yap", label: "यापीज़", h1: "यापीज़ बोलना सीखें (Yapese for Work — FSM (याप-राज्य))", data: "/assets/kkb_yap_data.js", out: "courses/hi/bhasha/yapese/index.html",
    title: "ACS काम की भाषा — यापीज़ बोलना सीखें (Yapese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से यापीज़ बोलना सीखें — FSM (याप-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह यापीज़ बोलने का कोर्स है — पत्थर-मुद्रा (rai) के लिए मशहूर याप-द्वीप की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gil", label: "गिल्बर्टीज़", h1: "गिल्बर्टीज़ बोलना सीखें (Gilbertese for Work — किरिबाती)", data: "/assets/kkb_gil_data.js", out: "courses/hi/bhasha/gilbertese/index.html",
    title: "ACS काम की भाषा — गिल्बर्टीज़ बोलना सीखें (Gilbertese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गिल्बर्टीज़ बोलना सीखें — किरिबाती में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गिल्बर्टीज़ बोलने का कोर्स है — किरिबाती की राष्ट्रीय-भाषा, Te taetae ni Kiribati। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ty", label: "ताहितियन", h1: "ताहितियन बोलना सीखें (Tahitian for Work — फ्रेंच-पॉलिनेशिया)", data: "/assets/kkb_ty_data.js", out: "courses/hi/bhasha/tahitian/index.html",
    title: "ACS काम की भाषा — ताहितियन बोलना सीखें (Tahitian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ताहितियन बोलना सीखें — फ्रेंच-पॉलिनेशिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ताहितियन बोलने का कोर्स है — फ्रेंच-पॉलिनेशिया की प्रमुख-पॉलिनेशियन-भाषा, reo Tahiti। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rar", label: "कुक-आइलैंड्स-माओरी", h1: "कुक-आइलैंड्स-माओरी बोलना सीखें (Cook Islands Maori for Work — कुक-द्वीपसमूह)", data: "/assets/kkb_rar_data.js", out: "courses/hi/bhasha/cookislandsmaori/index.html",
    title: "ACS काम की भाषा — कुक-आइलैंड्स-माओरी बोलना सीखें (Cook Islands Maori for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कुक-आइलैंड्स-माओरी बोलना सीखें — कुक-द्वीपसमूह में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कुक-आइलैंड्स-माओरी बोलने का कोर्स है — कुक-द्वीपसमूह की आधिकारिक-भाषा, न्यूज़ीलैंड-माओरी से निकट-संबंधी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "niu", label: "नीयुएन", h1: "नीयुएन बोलना सीखें (Niuean for Work — नीयू)", data: "/assets/kkb_niu_data.js", out: "courses/hi/bhasha/niuean/index.html",
    title: "ACS काम की भाषा — नीयुएन बोलना सीखें (Niuean for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नीयुएन बोलना सीखें — नीयू में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नीयुएन बोलने का कोर्स है — नीयू-द्वीप की भाषा, Tongic-शाखा से। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tvl", label: "तुवालुअन", h1: "तुवालुअन बोलना सीखें (Tuvaluan for Work — तुवालू)", data: "/assets/kkb_tvl_data.js", out: "courses/hi/bhasha/tuvaluan/index.html",
    title: "ACS काम की भाषा — तुवालुअन बोलना सीखें (Tuvaluan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुवालुअन बोलना सीखें — तुवालू में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तुवालुअन बोलने का कोर्स है — तुवालू की राष्ट्रीय-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tkl", label: "तोकेलाउअन", h1: "तोकेलाउअन बोलना सीखें (Tokelauan for Work — तोकेलाउ)", data: "/assets/kkb_tkl_data.js", out: "courses/hi/bhasha/tokelauan/index.html",
    title: "ACS काम की भाषा — तोकेलाउअन बोलना सीखें (Tokelauan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तोकेलाउअन बोलना सीखें — तोकेलाउ में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तोकेलाउअन बोलने का कोर्स है — तोकेलाउ की भाषा, न्यूज़ीलैंड का territory। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dhv", label: "द्रेहु", h1: "द्रेहु बोलना सीखें (Drehu for Work — न्यू-कैलेडोनिया (लीफ़ू-द्वीप))", data: "/assets/kkb_dhv_data.js", out: "courses/hi/bhasha/drehu/index.html",
    title: "ACS काम की भाषा — द्रेहु बोलना सीखें (Drehu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से द्रेहु बोलना सीखें — न्यू-कैलेडोनिया (लीफ़ू-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह द्रेहु बोलने का कोर्स है — न्यू-कैलेडोनिया की सबसे-ज़्यादा बोली जाने वाली Kanak-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "grn", label: "ग्रेनेडियन-क्रियोल", h1: "ग्रेनेडियन-क्रियोल बोलना सीखें (Grenadian Creole for Work — ग्रेनेडा)", data: "/assets/kkb_grn_data.js", out: "courses/hi/bhasha/grenadian/index.html",
    title: "ACS काम की भाषा — ग्रेनेडियन-क्रियोल बोलना सीखें (Grenadian Creole for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ग्रेनेडियन-क्रियोल बोलना सीखें — ग्रेनेडा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ग्रेनेडियन-क्रियोल बोलने का कोर्स है — French-आधारित-creole, Antillean-परिवार, ग्रेनेडा का पारंपरिक-patois। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dcf", label: "डोमिनिकन-क्रियोल", h1: "डोमिनिकन-क्रियोल बोलना सीखें (Dominican Creole French for Work — डोमिनिका)", data: "/assets/kkb_dcf_data.js", out: "courses/hi/bhasha/dominicancreole/index.html",
    title: "ACS काम की भाषा — डोमिनिकन-क्रियोल बोलना सीखें (Dominican Creole French for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डोमिनिकन-क्रियोल बोलना सीखें — डोमिनिका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डोमिनिकन-क्रियोल बोलने का कोर्स है — French-आधारित-creole, लगभग 56,000 बोलने-वाले, हाईतियन-creole से निकट-संबंधी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "srm", label: "सारामाक्कान", h1: "सारामाक्कान बोलना सीखें (Saramaccan for Work — सूरीनाम (Maroon-जनजाति))", data: "/assets/kkb_srm_data.js", out: "courses/hi/bhasha/saramaccan/index.html",
    title: "ACS काम की भाषा — सारामाक्कान बोलना सीखें (Saramaccan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सारामाक्कान बोलना सीखें — सूरीनाम (Maroon-जनजाति) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सारामाक्कान बोलने का कोर्स है — English-पुर्तगाली-मिश्रित-creole, भागे-हुए-दासों-के-वंशज Saramaka-जनजाति की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "djk", label: "न्दियुका", h1: "न्दियुका बोलना सीखें (Ndyuka for Work — सूरीनाम/फ्रेंच-गयाना (Aukan-जनजाति))", data: "/assets/kkb_djk_data.js", out: "courses/hi/bhasha/ndyuka/index.html",
    title: "ACS काम की भाषा — न्दियुका बोलना सीखें (Ndyuka for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से न्दियुका बोलना सीखें — सूरीनाम/फ्रेंच-गयाना (Aukan-जनजाति) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह न्दियुका बोलने का कोर्स है — English-आधारित-Maroon-creole, Afaka syllabary-लिपि के लिए मशहूर। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tdx", label: "तान्द्रोय", h1: "तान्द्रोय बोलना सीखें (Tandroy for Work — दक्षिण-मेडागास्कर (Androy-क्षेत्र))", data: "/assets/kkb_tdx_data.js", out: "courses/hi/bhasha/tandroy/index.html",
    title: "ACS काम की भाषा — तान्द्रोय बोलना सीखें (Tandroy for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तान्द्रोय बोलना सीखें — दक्षिण-मेडागास्कर (Androy-क्षेत्र) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तान्द्रोय बोलने का कोर्स है — मालागासी-भाषा-परिवार की दक्षिणी-बोली, Antandroy-जनजाति की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bhr", label: "बारा", h1: "बारा बोलना सीखें (Bara for Work — दक्षिण-मेडागास्कर)", data: "/assets/kkb_bhr_data.js", out: "courses/hi/bhasha/bara/index.html",
    title: "ACS काम की भाषा — बारा बोलना सीखें (Bara for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बारा बोलना सीखें — दक्षिण-मेडागास्कर में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बारा बोलने का कोर्स है — मालागासी-भाषा-परिवार की दक्षिणी-बोली, Bara-जनजाति की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ln", label: "लिंगाला", h1: "लिंगाला बोलना सीखें (Lingala for Work — DRC/कांगो-ब्राज़ाविल)", data: "/assets/kkb_ln_data.js", out: "courses/hi/bhasha/lingala/index.html",
    title: "ACS काम की भाषा — लिंगाला बोलना सीखें (Lingala for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लिंगाला बोलना सीखें — DRC/कांगो-ब्राज़ाविल में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लिंगाला बोलने का कोर्स है — DRC व कांगो-ब्राज़ाविल दोनों की राष्ट्रीय-भाषा, 4 करोड़+ वक्ता। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kg", label: "किकोंगो", h1: "किकोंगो बोलना सीखें (Kikongo for Work — DRC/अंगोला/कांगो-ब्राज़ाविल)", data: "/assets/kkb_kg_data.js", out: "courses/hi/bhasha/kikongo/index.html",
    title: "ACS काम की भाषा — किकोंगो बोलना सीखें (Kikongo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किकोंगो बोलना सीखें — DRC/अंगोला/कांगो-ब्राज़ाविल में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह किकोंगो बोलने का कोर्स है — बांटू-भाषा-परिवार, कांगो-साम्राज्य की ऐतिहासिक-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fuv", label: "फुलफुल्दे", h1: "फुलफुल्दे बोलना सीखें (Fulfulde for Work — पश्चिम-अफ्रीका-साहेल)", data: "/assets/kkb_fuv_data.js", out: "courses/hi/bhasha/fulfulde/index.html",
    title: "ACS काम की भाषा — फुलफुल्दे बोलना सीखें (Fulfulde for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फुलफुल्दे बोलना सीखें — पश्चिम-अफ्रीका-साहेल में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फुलफुल्दे बोलने का कोर्स है — फुला-लोगों की भाषा, 20+ देशों में फैली। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tn", label: "त्स्वाना", h1: "त्स्वाना बोलना सीखें (Tswana for Work — बोत्सवाना)", data: "/assets/kkb_tn_data.js", out: "courses/hi/bhasha/tswana/index.html",
    title: "ACS काम की भाषा — त्स्वाना बोलना सीखें (Tswana for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से त्स्वाना बोलना सीखें — बोत्सवाना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह त्स्वाना बोलने का कोर्स है — बोत्सवाना की राष्ट्रीय-भाषा, Sotho-Tswana-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bem", label: "बेम्बा", h1: "बेम्बा बोलना सीखें (Bemba for Work — ज़ाम्बिया)", data: "/assets/kkb_bem_data.js", out: "courses/hi/bhasha/bemba/index.html",
    title: "ACS काम की भाषा — बेम्बा बोलना सीखें (Bemba for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बेम्बा बोलना सीखें — ज़ाम्बिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बेम्बा बोलने का कोर्स है — ज़ाम्बिया की सबसे-बड़ी-मातृभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ts", label: "त्सोंगा", h1: "त्सोंगा बोलना सीखें (Tsonga for Work — दक्षिण-अफ्रीका/मोज़ाम्बिक)", data: "/assets/kkb_ts_data.js", out: "courses/hi/bhasha/tsonga/index.html",
    title: "ACS काम की भाषा — त्सोंगा बोलना सीखें (Tsonga for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से त्सोंगा बोलना सीखें — दक्षिण-अफ्रीका/मोज़ाम्बिक में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह त्सोंगा बोलने का कोर्स है — दक्षिण-अफ्रीका की 11 आधिकारिक-भाषाओं में से एक। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mos", label: "मोसी", h1: "मोसी बोलना सीखें (Moore for Work — बुर्किना-फासो)", data: "/assets/kkb_mos_data.js", out: "courses/hi/bhasha/moore/index.html",
    title: "ACS काम की भाषा — मोसी बोलना सीखें (Moore for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मोसी बोलना सीखें — बुर्किना-फासो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मोसी बोलने का कोर्स है — बुर्किना-फासो की राष्ट्रीय-भाषा, Mossi-लोगों की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ee", label: "ईवे", h1: "ईवे बोलना सीखें (Ewe for Work — घाना/टोगो)", data: "/assets/kkb_ee_data.js", out: "courses/hi/bhasha/ewe/index.html",
    title: "ACS काम की भाषा — ईवे बोलना सीखें (Ewe for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ईवे बोलना सीखें — घाना/टोगो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ईवे बोलने का कोर्स है — टोगो की प्रमुख-भाषा, Gbe-भाषा-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kri", label: "क्रियो", h1: "क्रियो बोलना सीखें (Krio for Work — सिएरा-लियोन)", data: "/assets/kkb_kri_data.js", out: "courses/hi/bhasha/krio/index.html",
    title: "ACS काम की भाषा — क्रियो बोलना सीखें (Krio for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क्रियो बोलना सीखें — सिएरा-लियोन में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह क्रियो बोलने का कोर्स है — सिएरा-लियोन की राष्ट्रभाषा-जैसी, 96% आबादी बोलती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nd", label: "उत्तरी-न्देबेले", h1: "उत्तरी-न्देबेले बोलना सीखें (Ndebele for Work — ज़िम्बाब्वे/बोत्सवाना)", data: "/assets/kkb_nd_data.js", out: "courses/hi/bhasha/ndebele/index.html",
    title: "ACS काम की भाषा — उत्तरी-न्देबेले बोलना सीखें (Ndebele for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से उत्तरी-न्देबेले बोलना सीखें — ज़िम्बाब्वे/बोत्सवाना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह उत्तरी-न्देबेले बोलने का कोर्स है — ज़िम्बाब्वे की आधिकारिक-भाषा, Nguni-परिवार। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sqt", label: "सोकोत्री", h1: "सोकोत्री बोलना सीखें (Soqotri for Work — सोकोत्रा-द्वीप (यमन))", data: "/assets/kkb_sqt_data.js", out: "courses/hi/bhasha/soqotri/index.html",
    title: "ACS काम की भाषा — सोकोत्री बोलना सीखें (Soqotri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सोकोत्री बोलना सीखें — सोकोत्रा-द्वीप (यमन) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सोकोत्री बोलने का कोर्स है — Modern-South-Arabian-भाषा-परिवार, अरबी से genuinely-भिन्न। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gdq", label: "मेह्री", h1: "मेह्री बोलना सीखें (Mehri for Work — यमन/ओमान)", data: "/assets/kkb_gdq_data.js", out: "courses/hi/bhasha/mehri/index.html",
    title: "ACS काम की भाषा — मेह्री बोलना सीखें (Mehri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मेह्री बोलना सीखें — यमन/ओमान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मेह्री बोलने का कोर्स है — Modern-South-Arabian की सबसे-बड़ी-भाषा, 2.5 लाख+ वक्ता। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "aii", label: "असीरियाई", h1: "असीरियाई बोलना सीखें (Assyrian for Work — इराक़/सीरिया/ईरान)", data: "/assets/kkb_aii_data.js", out: "courses/hi/bhasha/assyrian/index.html",
    title: "ACS काम की भाषा — असीरियाई बोलना सीखें (Assyrian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से असीरियाई बोलना सीखें — इराक़/सीरिया/ईरान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह असीरियाई बोलने का कोर्स है — Neo-Aramaic-भाषा, असीरियाई-ईसाई-समुदाय की मातृभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  
  { code: "haz", label: "हज़ारगी", h1: "हज़ारगी बोलना सीखें (Hazaragi for Work — अफ़ग़ानिस्तान)", data: "/assets/kkb_haz_data.js", out: "courses/hi/bhasha/hazaragi/index.html",
    title: "ACS काम की भाषा — हज़ारगी बोलना सीखें (Hazaragi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हज़ारगी बोलना सीखें — अफ़ग़ानिस्तान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हज़ारगी बोलने का कोर्स है — Hazara-समुदाय की भाषा-पहचान, Dari-निकट-संबंधी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "shv", label: "शेह्री", h1: "शेह्री बोलना सीखें (Shehri for Work — ओमान (Dhofar-क्षेत्र))", data: "/assets/kkb_shv_data.js", out: "courses/hi/bhasha/shehri/index.html",
    title: "ACS काम की भाषा — शेह्री बोलना सीखें (Shehri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से शेह्री बोलना सीखें — ओमान (Dhofar-क्षेत्र) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह शेह्री बोलने का कोर्स है — Modern-South-Arabian-भाषा, Jibbali भी कहलाती है, academic-grammar(Rubin 2014) से genuine-pronoun पुष्ट। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mid", label: "मंडाइक", h1: "मंडाइक बोलना सीखें (Mandaic for Work — इराक़/ईरान)", data: "/assets/kkb_mid_data.js", out: "courses/hi/bhasha/mandaic/index.html",
    title: "ACS काम की भाषा — मंडाइक बोलना सीखें (Mandaic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मंडाइक बोलना सीखें — इराक़/ईरान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मंडाइक बोलने का कोर्स है — Neo-Aramaic-भाषा, Mandaean-धार्मिक-समुदाय की मातृभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lrc", label: "लूरी", h1: "लूरी बोलना सीखें (Luri for Work — ईरान (Zagros-पर्वत))", data: "/assets/kkb_lrc_data.js", out: "courses/hi/bhasha/luri/index.html",
    title: "ACS काम की भाषा — लूरी बोलना सीखें (Luri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लूरी बोलना सीखें — ईरान (Zagros-पर्वत) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लूरी बोलने का कोर्स है — Iranian-भाषा-परिवार, Lur-लोगों की भाषा, 26 लाख+ वक्ता। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rmt", label: "डोमारी", h1: "डोमारी बोलना सीखें (Domari for Work — मध्य-पूर्व)", data: "/assets/kkb_rmt_data.js", out: "courses/hi/bhasha/domari/index.html",
    title: "ACS काम की भाषा — डोमारी बोलना सीखें (Domari for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डोमारी बोलना सीखें — मध्य-पूर्व में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डोमारी बोलने का कोर्स है — Indo-Aryan-भाषा, Dom-घुमंतू-समुदाय की भाषा, Romani से दूर-संबंधी। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ve", label: "वेन्दा", h1: "वेन्दा बोलना सीखें (Venda for Work — दक्षिण-अफ्रीका)", data: "/assets/kkb_ve_data.js", out: "courses/hi/bhasha/venda/index.html",
    title: "ACS काम की भाषा — वेन्दा बोलना सीखें (Venda for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वेन्दा बोलना सीखें — दक्षिण-अफ्रीका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वेन्दा बोलने का कोर्स है — Bantu-भाषा, Limpopo-प्रांत, Peace-Corps-grammar से genuine-pronoun पुष्ट। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ss", label: "स्वाती", h1: "स्वाती बोलना सीखें (Swati for Work — एस्वातीनी/दक्षिण-अफ्रीका)", data: "/assets/kkb_ss_data.js", out: "courses/hi/bhasha/swati/index.html",
    title: "ACS काम की भाषा — स्वाती बोलना सीखें (Swati for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से स्वाती बोलना सीखें — एस्वातीनी/दक्षिण-अफ्रीका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह स्वाती बोलने का कोर्स है — Nguni-भाषा-परिवार, Eswatini की राजभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "luo", label: "ढोलुओ", h1: "ढोलुओ बोलना सीखें (Dholuo for Work — केन्या (Nyanza-क्षेत्र)/तंज़ानिया)", data: "/assets/kkb_luo_data.js", out: "courses/hi/bhasha/dholuo/index.html",
    title: "ACS काम की भाषा — ढोलुओ बोलना सीखें (Dholuo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ढोलुओ बोलना सीखें — केन्या (Nyanza-क्षेत्र)/तंज़ानिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ढोलुओ बोलने का कोर्स है — Nilotic-भाषा, Luo-लोगों की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "din", label: "डिंका", h1: "डिंका बोलना सीखें (Dinka for Work — दक्षिण-सूडान)", data: "/assets/kkb_din_data.js", out: "courses/hi/bhasha/dinka/index.html",
    title: "ACS काम की भाषा — डिंका बोलना सीखें (Dinka for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डिंका बोलना सीखें — दक्षिण-सूडान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डिंका बोलने का कोर्स है — Nilotic-भाषा, Dinka-लोगों की सबसे-बड़ी-भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ki", label: "किकुयु", h1: "किकुयु बोलना सीखें (Kikuyu for Work — केन्या (Central-Province))", data: "/assets/kkb_ki_data.js", out: "courses/hi/bhasha/kikuyu/index.html",
    title: "ACS काम की भाषा — किकुयु बोलना सीखें (Kikuyu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किकुयु बोलना सीखें — केन्या (Central-Province) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह किकुयु बोलने का कोर्स है — Bantu-भाषा, Gĩkũyũ-लोगों की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zgh", label: "तमाज़ीग़्त", h1: "तमाज़ीग़्त बोलना सीखें (Tamazight for Work — मोरक्को)", data: "/assets/kkb_zgh_data.js", out: "courses/hi/bhasha/tamazight/index.html",
    title: "ACS काम की भाषा — तमाज़ीग़्त बोलना सीखें (Tamazight for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तमाज़ीग़्त बोलना सीखें — मोरक्को में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तमाज़ीग़्त बोलने का कोर्स है — Berber-भाषा-परिवार, Morocco की आधिकारिक-standard। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tig", label: "तिग्रे", h1: "तिग्रे बोलना सीखें (Tigre for Work — इरिट्रिया/सूडान)", data: "/assets/kkb_tig_data.js", out: "courses/hi/bhasha/tigre/index.html",
    title: "ACS काम की भाषा — तिग्रे बोलना सीखें (Tigre for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तिग्रे बोलना सीखें — इरिट्रिया/सूडान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तिग्रे बोलने का कोर्स है — Ethiopian-Semitic-भाषा, Tigrinya से अलग। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "na", label: "नाउरुअन", h1: "नाउरुअन बोलना सीखें (Nauruan for Work — नाउरू)", data: "/assets/kkb_na_data.js", out: "courses/hi/bhasha/nauruan/index.html",
    title: "ACS काम की भाषा — नाउरुअन बोलना सीखें (Nauruan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नाउरुअन बोलना सीखें — नाउरू में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नाउरुअन बोलने का कोर्स है — Micronesian-भाषा, नाउरू की राजभाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fud", label: "पूर्वी-फुतुनन", h1: "पूर्वी-फुतुनन बोलना सीखें (East Futunan for Work — वालिस-ए-फ़्यूतूना)", data: "/assets/kkb_fud_data.js", out: "courses/hi/bhasha/futunan/index.html",
    title: "ACS काम की भाषा — पूर्वी-फुतुनन बोलना सीखें (East Futunan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पूर्वी-फुतुनन बोलना सीखें — वालिस-ए-फ़्यूतूना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह पूर्वी-फुतुनन बोलने का कोर्स है — Polynesian-भाषा, Futuna-द्वीप। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "wls", label: "वालिसियन", h1: "वालिसियन बोलना सीखें (Wallisian for Work — वालिस-ए-फ़्यूतूना)", data: "/assets/kkb_wls_data.js", out: "courses/hi/bhasha/wallisian/index.html",
    title: "ACS काम की भाषा — वालिसियन बोलना सीखें (Wallisian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वालिसियन बोलना सीखें — वालिस-ए-फ़्यूतूना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वालिसियन बोलने का कोर्स है — Polynesian-भाषा, Wallis-द्वीप, East-Uvean भी कहलाती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "skg", label: "दक्षिणी-साकालावा", h1: "दक्षिणी-साकालावा बोलना सीखें (Southern Sakalava for Work — मेडागास्कर (पश्चिमी-तट))", data: "/assets/kkb_skg_data.js", out: "courses/hi/bhasha/sakalava/index.html",
    title: "ACS काम की भाषा — दक्षिणी-साकालावा बोलना सीखें (Southern Sakalava for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से दक्षिणी-साकालावा बोलना सीखें — मेडागास्कर (पश्चिमी-तट) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह दक्षिणी-साकालावा बोलने का कोर्स है — Malagasy-dialect, genuinely-अलग pronoun। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bzc", label: "दक्षिणी-बेत्सिमिसारका", h1: "दक्षिणी-बेत्सिमिसारका बोलना सीखें (Southern Betsimisaraka for Work — मेडागास्कर (पूर्वी-तट))", data: "/assets/kkb_bzc_data.js", out: "courses/hi/bhasha/betsimisaraka/index.html",
    title: "ACS काम की भाषा — दक्षिणी-बेत्सिमिसारका बोलना सीखें (Southern Betsimisaraka for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से दक्षिणी-बेत्सिमिसारका बोलना सीखें — मेडागास्कर (पूर्वी-तट) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह दक्षिणी-बेत्सिमिसारका बोलने का कोर्स है — Malagasy-dialect, Betsimisaraka-लोगों की भाषा। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "eo", label: "एस्पेरांतो", h1: "एस्पेरांतो बोलना सीखें (Esperanto for Work — अंतरराष्ट्रीय-योजित-भाषा (Esperantujo))", data: "/assets/kkb_eo_data.js", out: "courses/hi/bhasha/esperanto/index.html",
    title: "ACS काम की भाषा — एस्पेरांतो बोलना सीखें (Esperanto for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से एस्पेरांतो बोलना सीखें — अंतरराष्ट्रीय-योजित-भाषा (Esperantujo) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह एस्पेरांतो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "la", label: "लैटिन", h1: "लैटिन बोलना सीखें (Latin for Work — प्राचीन-रोम (आज वेटिकन/शिक्षा-जगत))", data: "/assets/kkb_la_data.js", out: "courses/hi/bhasha/latin/index.html",
    title: "ACS काम की भाषा — लैटिन बोलना सीखें (Latin for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लैटिन बोलना सीखें — प्राचीन-रोम (आज वेटिकन/शिक्षा-जगत) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लैटिन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yi", label: "यिद्दिश", h1: "यिद्दिश बोलना सीखें (Yiddish for Work — पूर्वी-यूरोप यहूदी-समुदाय)", data: "/assets/kkb_yi_data.js", out: "courses/hi/bhasha/yiddish/index.html",
    title: "ACS काम की भाषा — यिद्दिश बोलना सीखें (Yiddish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से यिद्दिश बोलना सीखें — पूर्वी-यूरोप यहूदी-समुदाय में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह यिद्दिश बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "br", label: "ब्रेटन", h1: "ब्रेटन बोलना सीखें (Breton for Work — फ़्रांस (ब्रिटनी))", data: "/assets/kkb_br_data.js", out: "courses/hi/bhasha/breton/index.html",
    title: "ACS काम की भाषा — ब्रेटन बोलना सीखें (Breton for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ब्रेटन बोलना सीखें — फ़्रांस (ब्रिटनी) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ब्रेटन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "co", label: "कोर्सिकन", h1: "कोर्सिकन बोलना सीखें (Corsican for Work — फ़्रांस (कोर्सिका-द्वीप))", data: "/assets/kkb_co_data.js", out: "courses/hi/bhasha/corsican/index.html",
    title: "ACS काम की भाषा — कोर्सिकन बोलना सीखें (Corsican for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोर्सिकन बोलना सीखें — फ़्रांस (कोर्सिका-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोर्सिकन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fy", label: "फ़्रिसियाई", h1: "फ़्रिसियाई बोलना सीखें (Frisian for Work — नीदरलैंड्स (Friesland))", data: "/assets/kkb_fy_data.js", out: "courses/hi/bhasha/frisian/index.html",
    title: "ACS काम की भाषा — फ़्रिसियाई बोलना सीखें (Frisian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़्रिसियाई बोलना सीखें — नीदरलैंड्स (Friesland) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़्रिसियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "scn", label: "सिसिलियाई", h1: "सिसिलियाई बोलना सीखें (Sicilian for Work — इटली (सिसिली-द्वीप))", data: "/assets/kkb_scn_data.js", out: "courses/hi/bhasha/sicilian/index.html",
    title: "ACS काम की भाषा — सिसिलियाई बोलना सीखें (Sicilian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिसिलियाई बोलना सीखें — इटली (सिसिली-द्वीप) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सिसिलियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lij", label: "लिगुरियाई", h1: "लिगुरियाई बोलना सीखें (Ligurian for Work — इटली (जेनोआ))", data: "/assets/kkb_lij_data.js", out: "courses/hi/bhasha/ligurian/index.html",
    title: "ACS काम की भाषा — लिगुरियाई बोलना सीखें (Ligurian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लिगुरियाई बोलना सीखें — इटली (जेनोआ) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लिगुरियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lmo", label: "लोम्बार्ड", h1: "लोम्बार्ड बोलना सीखें (Lombard for Work — इटली (मिलान))", data: "/assets/kkb_lmo_data.js", out: "courses/hi/bhasha/lombard/index.html",
    title: "ACS काम की भाषा — लोम्बार्ड बोलना सीखें (Lombard for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लोम्बार्ड बोलना सीखें — इटली (मिलान) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लोम्बार्ड बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "szl", label: "सिलेसियाई", h1: "सिलेसियाई बोलना सीखें (Silesian for Work — पोलैंड (Silesia))", data: "/assets/kkb_szl_data.js", out: "courses/hi/bhasha/silesian/index.html",
    title: "ACS काम की भाषा — सिलेसियाई बोलना सीखें (Silesian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिलेसियाई बोलना सीखें — पोलैंड (Silesia) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सिलेसियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "vec", label: "वेनेशियाई", h1: "वेनेशियाई बोलना सीखें (Venetian for Work — इटली (वेनिस))", data: "/assets/kkb_vec_data.js", out: "courses/hi/bhasha/venetian/index.html",
    title: "ACS काम की भाषा — वेनेशियाई बोलना सीखें (Venetian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से वेनेशियाई बोलना सीखें — इटली (वेनिस) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह वेनेशियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dov", label: "डोम्बे", h1: "डोम्बे बोलना सीखें (Dombe for Work — ज़ाम्बिया-ज़िम्बाब्वे)", data: "/assets/kkb_dov_data.js", out: "courses/hi/bhasha/dombe/index.html",
    title: "ACS काम की भाषा — डोम्बे बोलना सीखें (Dombe for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डोम्बे बोलना सीखें — ज़ाम्बिया-ज़िम्बाब्वे में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह डोम्बे बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hmn", label: "ह्मोंग", h1: "ह्मोंग बोलना सीखें (Hmong for Work — दक्षिण-पूर्व-एशिया)", data: "/assets/kkb_hmn_data.js", out: "courses/hi/bhasha/hmong/index.html",
    title: "ACS काम की भाषा — ह्मोंग बोलना सीखें (Hmong for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ह्मोंग बोलना सीखें — दक्षिण-पूर्व-एशिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ह्मोंग बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kl", label: "कालालिसुत", h1: "कालालिसुत बोलना सीखें (Kalaallisut for Work — ग्रीनलैंड)", data: "/assets/kkb_kl_data.js", out: "courses/hi/bhasha/kalaallisut/index.html",
    title: "ACS काम की भाषा — कालालिसुत बोलना सीखें (Kalaallisut for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कालालिसुत बोलना सीखें — ग्रीनलैंड में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कालालिसुत बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gv", label: "मैंक्स", h1: "मैंक्स बोलना सीखें (Manx for Work — आइल-ऑफ़-मैन)", data: "/assets/kkb_gv_data.js", out: "courses/hi/bhasha/manx/index.html",
    title: "ACS काम की भाषा — मैंक्स बोलना सीखें (Manx for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मैंक्स बोलना सीखें — आइल-ऑफ़-मैन में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह मैंक्स बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "oc", label: "ओक्सिताँ", h1: "ओक्सिताँ बोलना सीखें (Occitan for Work — दक्षिण-फ़्रांस (Occitania))", data: "/assets/kkb_oc_data.js", out: "courses/hi/bhasha/occitan/index.html",
    title: "ACS काम की भाषा — ओक्सिताँ बोलना सीखें (Occitan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ओक्सिताँ बोलना सीखें — दक्षिण-फ़्रांस (Occitania) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ओक्सिताँ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bs", label: "बोस्नियाई", h1: "बोस्नियाई बोलना सीखें (Bosnian for Work — बोस्निया-हर्ज़ेगोविना)", data: "/assets/kkb_bs_data.js", out: "courses/hi/bhasha/bosnian/index.html",
    title: "ACS काम की भाषा — बोस्नियाई बोलना सीखें (Bosnian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बोस्नियाई बोलना सीखें — बोस्निया-हर्ज़ेगोविना में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बोस्नियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fur", label: "फ़्रीयुलियाई", h1: "फ़्रीयुलियाई बोलना सीखें (Friulian for Work — इटली (फ़्रीयुली))", data: "/assets/kkb_fur_data.js", out: "courses/hi/bhasha/friulian/index.html",
    title: "ACS काम की भाषा — फ़्रीयुलियाई बोलना सीखें (Friulian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़्रीयुलियाई बोलना सीखें — इटली (फ़्रीयुली) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़्रीयुलियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "aa", label: "अफ़ार", h1: "अफ़ार बोलना सीखें (Afar for Work — जिबूती-इरिट्रिया-इथियोपिया)", data: "/assets/kkb_aa_data.js", out: "courses/hi/bhasha/afar/index.html",
    title: "ACS काम की भाषा — अफ़ार बोलना सीखें (Afar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अफ़ार बोलना सीखें — जिबूती-इरिट्रिया-इथियोपिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अफ़ार बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "fon", label: "फ़ोन", h1: "फ़ोन बोलना सीखें (Fon for Work — बेनिन)", data: "/assets/kkb_fon_data.js", out: "courses/hi/bhasha/fon/index.html",
    title: "ACS काम की भाषा — फ़ोन बोलना सीखें (Fon for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से फ़ोन बोलना सीखें — बेनिन में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह फ़ोन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gaa", label: "गा", h1: "गा बोलना सीखें (Ga for Work — घाना (अक्करा))", data: "/assets/kkb_gaa_data.js", out: "courses/hi/bhasha/ga/index.html",
    title: "ACS काम की भाषा — गा बोलना सीखें (Ga for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गा बोलना सीखें — घाना (अक्करा) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह गा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sus", label: "सुसु", h1: "सुसु बोलना सीखें (Susu for Work — गिनी-सिएरा-लियोन)", data: "/assets/kkb_sus_data.js", out: "courses/hi/bhasha/susu/index.html",
    title: "ACS काम की भाषा — सुसु बोलना सीखें (Susu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सुसु बोलना सीखें — गिनी-सिएरा-लियोन में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सुसु बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kr", label: "कानुरी", h1: "कानुरी बोलना सीखें (Kanuri for Work — नाइजीरिया-नाइजर-चाड)", data: "/assets/kkb_kr_data.js", out: "courses/hi/bhasha/kanuri/index.html",
    title: "ACS काम की भाषा — कानुरी बोलना सीखें (Kanuri for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कानुरी बोलना सीखें — नाइजीरिया-नाइजर-चाड में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कानुरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ktu", label: "किटुबा", h1: "किटुबा बोलना सीखें (Kituba for Work — DRC-कांगो)", data: "/assets/kkb_ktu_data.js", out: "courses/hi/bhasha/kituba/index.html",
    title: "ACS काम की भाषा — किटुबा बोलना सीखें (Kituba for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किटुबा बोलना सीखें — DRC-कांगो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह किटुबा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cgg", label: "किगा", h1: "किगा बोलना सीखें (Kiga for Work — युगांडा)", data: "/assets/kkb_cgg_data.js", out: "courses/hi/bhasha/kiga/index.html",
    title: "ACS काम की भाषा — किगा बोलना सीखें (Kiga for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से किगा बोलना सीखें — युगांडा में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह किगा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kv", label: "कोमी", h1: "कोमी बोलना सीखें (Komi for Work — रूस (कोमी-गणराज्य))", data: "/assets/kkb_kv_data.js", out: "courses/hi/bhasha/komi/index.html",
    title: "ACS काम की भाषा — कोमी बोलना सीखें (Komi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कोमी बोलना सीखें — रूस (कोमी-गणराज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह कोमी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ltg", label: "लात्गालियाई", h1: "लात्गालियाई बोलना सीखें (Latgalian for Work — लात्विया)", data: "/assets/kkb_ltg_data.js", out: "courses/hi/bhasha/latgalian/index.html",
    title: "ACS काम की भाषा — लात्गालियाई बोलना सीखें (Latgalian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लात्गालियाई बोलना सीखें — लात्विया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लात्गालियाई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rn", label: "रुंडी", h1: "रुंडी बोलना सीखें (Rundi for Work — बुरुंडी)", data: "/assets/kkb_rn_data.js", out: "courses/hi/bhasha/rundi/index.html",
    title: "ACS काम की भाषा — रुंडी बोलना सीखें (Rundi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रुंडी बोलना सीखें — बुरुंडी में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह रुंडी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ab", label: "अबख़ाज़", h1: "अबख़ाज़ बोलना सीखें (Abkhaz for Work — अबख़ाज़िया)", data: "/assets/kkb_ab_data.js", out: "courses/hi/bhasha/abkhaz/index.html",
    title: "ACS काम की भाषा — अबख़ाज़ बोलना सीखें (Abkhaz for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अबख़ाज़ बोलना सीखें — अबख़ाज़िया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अबख़ाज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ach", label: "अचोली", h1: "अचोली बोलना सीखें (Acholi for Work — युगांडा-दक्षिण-सूडान)", data: "/assets/kkb_ach_data.js", out: "courses/hi/bhasha/acholi/index.html",
    title: "ACS काम की भाषा — अचोली बोलना सीखें (Acholi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अचोली बोलना सीखें — युगांडा-दक्षिण-सूडान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अचोली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "alz", label: "अलुर", h1: "अलुर बोलना सीखें (Alur for Work — युगांडा-DRC)", data: "/assets/kkb_alz_data.js", out: "courses/hi/bhasha/alur/index.html",
    title: "ACS काम की भाषा — अलुर बोलना सीखें (Alur for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से अलुर बोलना सीखें — युगांडा-DRC में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह अलुर बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bew", label: "बेतावी", h1: "बेतावी बोलना सीखें (Betawi for Work — इंडोनेशिया (जकार्ता))", data: "/assets/kkb_bew_data.js", out: "courses/hi/bhasha/betawi/index.html",
    title: "ACS काम की भाषा — बेतावी बोलना सीखें (Betawi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बेतावी बोलना सीखें — इंडोनेशिया (जकार्ता) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बेतावी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "crh", label: "क्रीमियाई-तातार", h1: "क्रीमियाई-तातार बोलना सीखें (Crimean Tatar for Work — क्रीमिया)", data: "/assets/kkb_crh_data.js", out: "courses/hi/bhasha/crimeantatar/index.html",
    title: "ACS काम की भाषा — क्रीमियाई-तातार बोलना सीखें (Crimean Tatar for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क्रीमियाई-तातार बोलना सीखें — क्रीमिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह क्रीमियाई-तातार बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "cnh", label: "हाखा-चिन", h1: "हाखा-चिन बोलना सीखें (Hakha Chin for Work — म्यांमार (Chin-State))", data: "/assets/kkb_cnh_data.js", out: "courses/hi/bhasha/hakhachin/index.html",
    title: "ACS काम की भाषा — हाखा-चिन बोलना सीखें (Hakha Chin for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हाखा-चिन बोलना सीखें — म्यांमार (Chin-State) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हाखा-चिन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nso", label: "सेपेदी", h1: "सेपेदी बोलना सीखें (Sepedi for Work — दक्षिण-अफ्रीका)", data: "/assets/kkb_nso_data.js", out: "courses/hi/bhasha/sepedi/index.html",
    title: "ACS काम की भाषा — सेपेदी बोलना सीखें (Sepedi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सेपेदी बोलना सीखें — दक्षिण-अफ्रीका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सेपेदी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "st", label: "सेसोथो", h1: "सेसोथो बोलना सीखें (Sesotho for Work — लेसोथो-दक्षिण-अफ्रीका)", data: "/assets/kkb_st_data.js", out: "courses/hi/bhasha/sesotho/index.html",
    title: "ACS काम की भाषा — सेसोथो बोलना सीखें (Sesotho for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सेसोथो बोलना सीखें — लेसोथो-दक्षिण-अफ्रीका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सेसोथो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kac", label: "जिंगपो", h1: "जिंगपो बोलना सीखें (Jingpo for Work — म्यांमार (Kachin-State))", data: "/assets/kkb_kac_data.js", out: "courses/hi/bhasha/jingpo/index.html",
    title: "ACS काम की भाषा — जिंगपो बोलना सीखें (Jingpo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जिंगपो बोलना सीखें — म्यांमार (Kachin-State) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह जिंगपो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tum", label: "तुंबुका", h1: "तुंबुका बोलना सीखें (Tumbuka for Work — मलावी-ज़ाम्बिया)", data: "/assets/kkb_tum_data.js", out: "courses/hi/bhasha/tumbuka/index.html",
    title: "ACS काम की भाषा — तुंबुका बोलना सीखें (Tumbuka for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुंबुका बोलना सीखें — मलावी-ज़ाम्बिया में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तुंबुका बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "dyu", label: "दयुला", h1: "दयुला बोलना सीखें (Dyula for Work — बुर्किना-फासो-माली)", data: "/assets/kkb_dyu_data.js", out: "courses/hi/bhasha/dyula/index.html",
    title: "ACS काम की भाषा — दयुला बोलना सीखें (Dyula for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से दयुला बोलना सीखें — बुर्किना-फासो-माली में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह दयुला बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zai", label: "ज़ापोतेक", h1: "ज़ापोतेक बोलना सीखें (Zapotec for Work — मेक्सिको (Oaxaca))", data: "/assets/kkb_zai_data.js", out: "courses/hi/bhasha/zapotec/index.html",
    title: "ACS काम की भाषा — ज़ापोतेक बोलना सीखें (Zapotec for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से ज़ापोतेक बोलना सीखें — मेक्सिको (Oaxaca) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह ज़ापोतेक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "sg", label: "सांगो", h1: "सांगो बोलना सीखें (Sango for Work — मध्य-अफ्रीकी-गणराज्य)", data: "/assets/kkb_sg_data.js", out: "courses/hi/bhasha/sango/index.html",
    title: "ACS काम की भाषा — सांगो बोलना सीखें (Sango for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सांगो बोलना सीखें — मध्य-अफ्रीकी-गणराज्य में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सांगो बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "rom", label: "रोमानी", h1: "रोमानी बोलना सीखें (Romani for Work — यूरोप (रोमा-समुदाय))", data: "/assets/kkb_rom_data.js", out: "courses/hi/bhasha/romani/index.html",
    title: "ACS काम की भाषा — रोमानी बोलना सीखें (Romani for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रोमानी बोलना सीखें — यूरोप (रोमा-समुदाय) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह रोमानी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kek", label: "क़ेक़्ची", h1: "क़ेक़्ची बोलना सीखें (Qeqchi for Work — ग्वाटेमाला)", data: "/assets/kkb_kek_data.js", out: "courses/hi/bhasha/qeqchi/index.html",
    title: "ACS काम की भाषा — क़ेक़्ची बोलना सीखें (Qeqchi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से क़ेक़्ची बोलना सीखें — ग्वाटेमाला में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह क़ेक़्ची बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bci", label: "बाउलेई", h1: "बाउलेई बोलना सीखें (Baoule for Work — आइवरी-कोस्ट)", data: "/assets/kkb_bci_data.js", out: "courses/hi/bhasha/baoule/index.html",
    title: "ACS काम की भाषा — बाउलेई बोलना सीखें (Baoule for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बाउलेई बोलना सीखें — आइवरी-कोस्ट में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बाउलेई बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bts", label: "बतक-सिमालुंगुन", h1: "बतक-सिमालुंगुन बोलना सीखें (Batak Simalungun for Work — इंडोनेशिया (सुमात्रा))", data: "/assets/kkb_bts_data.js", out: "courses/hi/bhasha/batsimalungun/index.html",
    title: "ACS काम की भाषा — बतक-सिमालुंगुन बोलना सीखें (Batak Simalungun for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बतक-सिमालुंगुन बोलना सीखें — इंडोनेशिया (सुमात्रा) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह बतक-सिमालुंगुन बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "hrx", label: "हुन्सरिक", h1: "हुन्सरिक बोलना सीखें (Hunsrik for Work — ब्राज़ील)", data: "/assets/kkb_hrx_data.js", out: "courses/hi/bhasha/hunsrik/index.html",
    title: "ACS काम की भाषा — हुन्सरिक बोलना सीखें (Hunsrik for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हुन्सरिक बोलना सीखें — ब्राज़ील में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह हुन्सरिक बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nqo", label: "एनको", h1: "एनको बोलना सीखें (NKo for Work — पश्चिम-अफ्रीका)", data: "/assets/kkb_nqo_data.js", out: "courses/hi/bhasha/nko/index.html",
    title: "ACS काम की भाषा — एनको बोलना सीखें (NKo for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से एनको बोलना सीखें — पश्चिम-अफ्रीका में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह एनको बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "lua", label: "त्शिलुबा", h1: "त्शिलुबा बोलना सीखें (Tshiluba for Work — DRC-कांगो)", data: "/assets/kkb_lua_data.js", out: "courses/hi/bhasha/tshiluba/index.html",
    title: "ACS काम की भाषा — त्शिलुबा बोलना सीखें (Tshiluba for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से त्शिलुबा बोलना सीखें — DRC-कांगो में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह त्शिलुबा बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "jam", label: "जमैकन-पातुआ", h1: "जमैकन-पातुआ बोलना सीखें (Jamaican Patois for Work — जमैका (कैरिबियन))", data: "/assets/kkb_jam_data.js", out: "courses/hi/bhasha/jamaicanpatois/index.html",
    title: "ACS काम की भाषा — जमैकन-पातुआ बोलना सीखें (Jamaican Patois for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से जमैकन-पातुआ बोलना सीखें — जमैका (कैरिबियन) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह जमैकन-पातुआ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "nus", label: "नुएर", h1: "नुएर बोलना सीखें (Nuer for Work — दक्षिण-सूडान)", data: "/assets/kkb_nus_data.js", out: "courses/hi/bhasha/nuer/index.html",
    title: "ACS काम की भाषा — नुएर बोलना सीखें (Nuer for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से नुएर बोलना सीखें — दक्षिण-सूडान में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह नुएर बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ndc", label: "न्दाऊ", h1: "न्दाऊ बोलना सीखें (Ndau for Work — ज़िम्बाब्वे-मोज़ाम्बिक)", data: "/assets/kkb_ndc_data.js", out: "courses/hi/bhasha/ndau/index.html",
    title: "ACS काम की भाषा — न्दाऊ बोलना सीखें (Ndau for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से न्दाऊ बोलना सीखें — ज़िम्बाब्वे-मोज़ाम्बिक में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह न्दाऊ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "shn", label: "शान", h1: "शान बोलना सीखें (Shan for Work — म्यांमार (शान-राज्य))", data: "/assets/kkb_shn_data.js", out: "courses/hi/bhasha/shan/index.html",
    title: "ACS काम की भाषा — शान बोलना सीखें (Shan for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से शान बोलना सीखें — म्यांमार (शान-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह शान बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "li", label: "लिम्बुर्गी", h1: "लिम्बुर्गी बोलना सीखें (Limburgish for Work — नीदरलैंड-बेल्जियम)", data: "/assets/kkb_li_data.js", out: "courses/hi/bhasha/limburgish/index.html",
    title: "ACS काम की भाषा — लिम्बुर्गी बोलना सीखें (Limburgish for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लिम्बुर्गी बोलना सीखें — नीदरलैंड-बेल्जियम में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह लिम्बुर्गी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tiv", label: "तिव", h1: "तिव बोलना सीखें (Tiv for Work — नाइजीरिया (Benue-राज्य))", data: "/assets/kkb_tiv_data.js", out: "courses/hi/bhasha/tiv/index.html",
    title: "ACS काम की भाषा — तिव बोलना सीखें (Tiv for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तिव बोलना सीखें — नाइजीरिया (Benue-राज्य) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह तिव बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mam", label: "माम", h1: "माम बोलना सीखें (Mam for Work — ग्वाटेमाला-मेक्सिको)", data: "/assets/kkb_mam_data.js", out: "courses/hi/bhasha/mam/index.html",
    title: "ACS काम की भाषा — माम बोलना सीखें (Mam for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से माम बोलना सीखें — ग्वाटेमाला-मेक्सिको में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह माम बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ady", label: "सर्कासियन", h1: "सर्कासियन बोलना सीखें (Circassian for Work — रूस (काकेशस-क्षेत्र))", data: "/assets/kkb_ady_data.js", out: "courses/hi/bhasha/circassian/index.html",
    title: "ACS काम की भाषा — सर्कासियन बोलना सीखें (Circassian for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सर्कासियन बोलना सीखें — रूस (काकेशस-क्षेत्र) में काम के लिए 500 वाक्य। मुफ़्त।",
    line1: "यह सर्कासियन बोलने का कोर्स है — Northwest-Caucasian-भाषा, Adyghe भी कहलाती है। हिंदी जानने वालों के लिए, जो वहाँ काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" }
];
function kkbContent(c) {
  return '<section class="kkb-intro" style="max-width:560px;margin:18px auto 0;padding:0 16px;color:#fff">' +
    '<h1 style="font-size:28px;line-height:1.25;margin:10px 0 6px;color:#fff">ACS काम की भाषा — ' + c.h1 + '</h1>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">' + c.line1 + '</p>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">हर वाक्य देवनागरी में दिखता है, हिंदी में मतलब है, और आवाज़ है। 5वीं पास भी आज से बोल सकता है।</p>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">500 वाक्य, 5 सप्ताह। हर सप्ताह में 5 पाठ (20-20 वाक्य), दिन 6 अभ्यास, दिन 7 फ़ोन पर टेस्ट। सब कुछ मुफ़्त है।</p>' +
    '</section>' +
    '<div id="kkb-app" class="kkb-app">' +
    '<noscript><p style="padding:20px;font-size:19px">यह कोर्स चलाने के लिए ब्राउज़र में JavaScript चालू कीजिए।</p></noscript>' +
    '<p style="padding:20px;font-size:19px">कोर्स खुल रहा है…</p>' +
    '</div>';
}
const KKB2_CODES = { uz: 1, ug: 1, tt: 1, tg: 1, sv: 1, si: 1, ro: 1, qu: 1, ps: 1, prs: 1, pcm: 1, nl: 1, myn: 1, mt: 1, mfe: 1, ky: 1, ku: 1, kk: 1, hy: 1, hu: 1, ht: 1, gn: 1, el: 1, cs: 1, brx: 1, bg: 1, be: 1, bal: 1, az: 1, ay: 1, arz: 1, ary: 1, arq: 1, apd: 1, apc: 1, aec: 1, acw: 1, acm: 1, en: 1, ar: 1, fr: 1, es: 1, ja: 1, ko: 1, de: 1, ru: 1, he: 1, pt: 1, kn: 1, ta: 1, te: 1, bn: 1, or: 1, as: 1, pa: 1, gu: 1, ml: 1 , ur: 1 , fa: 1 , sd: 1 , ks: 1 , mr: 1 , ne: 1 , sw: 1 , bho: 1 , zh: 1 , id: 1 , tr: 1 , mai: 1 , it: 1 , ms: 1 , vi: 1 , th: 1 , sa: 1 , bo: 1 , ceb: 1 , jv: 1 , km: 1 , lo: 1 , mn: 1 , my: 1 , nan: 1 , su: 1 , tl: 1 , yue: 1 }; /* pl अभी L1-मात्र — KKB2_CODES में नहीं (L2 बनने तक KKB_LANGS-सामान्य पैटर्न से पेज बने) */ /* 90-दिन मास्टर-परिवार — KKB2_LANGS से बनते हैं; 05-Sep: + th (थाई-लिपि) */
KKB_LANGS.forEach(c => { if (KKB2_CODES[c.code]) return; buildSpecial({
  out: c.out, langStrict: false, title: c.title, desc: c.desc,
  head: ['<link rel="stylesheet" href="/assets/kkb.css">'],
  foot: ['<script src="' + c.data + '"></scr' + 'ipt>', '<script src="/assets/kkb.js" defer></scr' + 'ipt>'],
  content: kkbContent(c)
}); });

/* ---- bhasha-परिवार (26-Aug, Founder-आदेश): सब भाषा-कोर्स /courses/hi/bhasha/<भाषा>/ में — digital/ व vocational/ जैसा परिवार-folder।
   पुराने पते (/courses/hi/kaam-ki-bhasha… पाँचों) 3 घंटे live रहे — मरा पता कभी नहीं: हर पुराने पते पर redirect-पर्ची
   (dca-2036 → digital/dca वाली विधि): noindex + canonical नया + meta-refresh + JS (hash यानी सप्ताह/दिन साथ ले जाए)।
   पर्ची universal ढाँचे पर नहीं (sitemap उसे नहीं गिनता) — यह पेज नहीं, सिर्फ़ रास्ता-निशान है। */
function kkbRedirect(c) {
  if (!c.old) return; /* नई भाषा (bhasha/ में जन्मी) — कोई पुराना पता नहीं, पर्ची नहीं */
  const to = "/" + c.out.replace(/index\.html$/, "");
  const html = '<!DOCTYPE html>\n' + GEN_NOTE + '\n<html lang="hi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>यह कोर्स नए पते पर है — ' + c.label + ' | ACS</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="https://acslearn.com' + to + '">' +
    '<meta http-equiv="refresh" content="0; url=' + to + '"><script>location.replace("' + to + '" + location.hash);</scr' + 'ipt></head>' +
    '<body style="font-family:sans-serif;font-size:19px;padding:24px"><p>यह कोर्स अब नए पते पर है: <a href="' + to + '">' + to + '</a></p></body></html>';
  fs.mkdirSync(path.dirname(path.join(ROOT, c.old)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, c.old), html, "utf8");
  console.log("↪ redirect-पर्ची → /" + c.old + " → " + to);
}
KKB_LANGS.forEach(kkbRedirect);

/* ---- KKB2 मास्टर-परिवार (31-Aug, Founder-मुहर): 90-दिन एकीकृत कोर्स — en मास्टर + 7 भाषाएँ।
   हर पेज = वही ढाँचा: intro (h1 + अगला-स्तर कड़ी + CEFR-नोट) + #kkb2-app;
   data = kkb_<code>_data.js (स्तर-1, 500) + kkb2_<code>_data.js (स्तर-2, 1,650); इंजन kkb2.js साझा।
   सुरक्षा-कड़ियाँ (v6.1-घ4): eMigrate · MADAD हर पेज पर। कड़ियाँ 31-Aug वेब-जाँच से जीवित-पुष्ट। */
const KKB2_SAFE = 'विदेश-काम सुरक्षा: <a href="https://emigrate.gov.in" target="_blank" rel="noopener" style="color:#F9A825">eMigrate</a> · <a href="https://www.madad.gov.in" target="_blank" rel="noopener" style="color:#F9A825">MADAD</a>। (बाहरी site — ख़ुद verify करें।)';
function kkb2Link(u, t) { return '<a href="' + u + '" target="_blank" rel="noopener" style="color:#F9A825">' + t + '</a>'; }
const KKB2_LANGS = [
  { code: "uz", slug: "uzbek", en_name: "Uzbek", hi_name: "उज़्बेक", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, latin-native */
    next: 'आगे का रास्ता: उज़्बेक की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ug", slug: "uyghur", en_name: "Uyghur", hi_name: "उइघुर", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, perso-arabic */
    next: 'आगे का रास्ता: उइघुर की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

    { code: "tt", slug: "tatar", en_name: "Tatar", hi_name: "तातार", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, cyrillic-native */
    next: 'आगे का रास्ता: तातार की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tg", slug: "tajik", en_name: "Tajik", hi_name: "ताजिक", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, cyrillic-native */
    next: 'आगे का रास्ता: ताजिक की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sv", slug: "swedish", en_name: "Swedish", hi_name: "स्वीडिश", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके Swedex — Folkuniversitetet — ' + kkb2Link("https://www.folkuniversitetet.se/in-english/swedex-swedish-examinations/about-swedex/", "folkuniversitetet.se") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "si", slug: "sinhala", en_name: "Sinhala", hi_name: "सिंहली", /* 13-Sep kkb_l2_register: L2 भाषा — पड़ोसी देश, असली-लिपि (13-Sep) */
    next: 'आगे का रास्ता: सिंहली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ro", slug: "romanian", en_name: "Romanian", hi_name: "रोमानियाई", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके Institutul Limbii Române (ILR) — atestare limba română — ' + kkb2Link("https://www.ilr.ro/", "ilr.ro") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "qu", slug: "quechua", en_name: "Quechua", hi_name: "क्वेशुआ", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: क्वेशुआ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ps", slug: "pashto", en_name: "Pashto", hi_name: "पश्तो", /* 13-Sep kkb_l2_register: L2 भाषा — पड़ोसी देश, असली-लिपि (13-Sep) */
    next: 'आगे का रास्ता: पश्तो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "prs", slug: "dari", en_name: "Dari", hi_name: "दारी", /* 13-Sep kkb_l2_register: L2 भाषा — पड़ोसी देश, असली-लिपि (13-Sep) */
    next: 'आगे का रास्ता: दारी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pcm", slug: "nigerian-pidgin", en_name: "Nigerian Pidgin", hi_name: "नाइजीरियन पिजिन", /* 13-Sep kkb_l2_register: L2 भाषा — अफ़्रीका, latin-native */
    next: 'आगे का रास्ता: नाइजीरियन पिजिन की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nl", slug: "dutch", en_name: "Dutch", hi_name: "डच", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके CNaVT (Certificaat Nederlands als Vreemde Taal) — Nederlandse Taalunie — ' + kkb2Link("https://cnavt.org/", "cnavt.org") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "myn", slug: "mayan", en_name: "Yucatec Maya", hi_name: "मायन", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: मायन की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mt", slug: "maltese", en_name: "Maltese", hi_name: "माल्टीज़", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: माल्टीज़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mfe", slug: "mauritian-creole", en_name: "Mauritian Creole", hi_name: "मॉरीशियन क्रीओल", /* 13-Sep kkb_l2_register: L2 भाषा — अफ़्रीका, latin-native */
    next: 'आगे का रास्ता: मॉरीशियन क्रीओल की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ky", slug: "kyrgyz", en_name: "Kyrgyz", hi_name: "किर्गिज़", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, cyrillic-native */
    next: 'आगे का रास्ता: किर्गिज़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ku", slug: "kurdish", en_name: "Kurdish", hi_name: "कुर्दिश", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, latin-native */
    next: 'आगे का रास्ता: कुर्दिश की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kk", slug: "kazakh", en_name: "Kazakh", hi_name: "कज़ाख", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, cyrillic-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके KAZTEST (ҚАЗТЕСТ) — राष्ट्रीय परीक्षण केंद्र (National Testing Center) — ' + kkb2Link("https://app.testcenter.kz", "app.testcenter.kz") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "hy", slug: "armenian", en_name: "Armenian", hi_name: "अर्मेनियाई", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, armenian */
    next: 'आगे का रास्ता: अर्मेनियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hu", slug: "hungarian", en_name: "Hungarian", hi_name: "हंगेरियन", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके ECL (हंगेरियन) — University of Pécs — ' + kkb2Link("https://ecl.hu/", "ecl.hu") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "ht", slug: "haitian-creole", en_name: "Haitian Creole", hi_name: "हाईटियन क्रियोल", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: हाईटियन क्रियोल की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gn", slug: "guarani", en_name: "Guarani", hi_name: "गुआरानी", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: गुआरानी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "el", slug: "greek", en_name: "Greek", hi_name: "ग्रीक", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, greek */
    next: 'आगे का रास्ता: कोर्स पूरा करके Πιστοποίηση Ελληνομάθειας (Certificate of Attainment in Greek) — Centre for the Greek Language — ' + kkb2Link("https://www.greek-language.gr/certification", "greek-language.gr") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "cs", slug: "czech", en_name: "Czech", hi_name: "चेक", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके CCE (Czech Language Certificate Exam) — ÚJOP, Charles University — ' + kkb2Link("https://ujop.cuni.cz/en/exam/czech-language-certificate-exam", "ujop.cuni.cz") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "brx", slug: "bodo", en_name: "Bodo", hi_name: "बोडो", /* 13-Sep kkb_l2_register: L2 भाषा — भारतीय भाषाएँ — देवनागरी लिपि, devanagari-native */
    next: 'आगे का रास्ता: बोडो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bg", slug: "bulgarian", en_name: "Bulgarian", hi_name: "बुल्गारियाई", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, cyrillic-native */
    next: 'आगे का रास्ता: कोर्स पूरा करके ECL (बुल्गारियाई) — University of Pécs — ' + kkb2Link("https://ecl.hu/", "ecl.hu") + ' — की तैयारी (कड़ी 13 Sep 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE },
  { code: "be", slug: "belarusian", en_name: "Belarusian", hi_name: "बेलारूसी", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, cyrillic-native */
    next: 'आगे का रास्ता: बेलारूसी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bal", slug: "balochi", en_name: "Balochi", hi_name: "बलूची", /* 13-Sep kkb_l2_register: L2 भाषा — पड़ोसी देश, असली-लिपि (13-Sep) */
    next: 'आगे का रास्ता: बलूची की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "az", slug: "azerbaijani", en_name: "Azerbaijani", hi_name: "अज़रबैजानी", /* 13-Sep kkb_l2_register: L2 भाषा — एशिया, latin-native */
    next: 'आगे का रास्ता: अज़रबैजानी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ay", slug: "aymara", en_name: "Aymara", hi_name: "आयमारा", /* 13-Sep kkb_l2_register: L2 भाषा — यूरोप व अमेरिका, latin-native */
    next: 'आगे का रास्ता: आयमारा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "arz", slug: "egyptian-arabic", en_name: "Egyptian Arabic", hi_name: "मिस्री अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: मिस्री अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ary", slug: "moroccan-arabic", en_name: "Moroccan Arabic", hi_name: "मोरक्कन अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: मोरक्कन अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "arq", slug: "algerian-arabic", en_name: "Algerian Arabic", hi_name: "अल्जीरियाई अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: अल्जीरियाई अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "apd", slug: "sudanese-arabic", en_name: "Sudanese Arabic", hi_name: "सूडानी अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: सूडानी अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "apc", slug: "levantine-arabic", en_name: "Levantine Arabic", hi_name: "लेवांटाइन अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: लेवांटाइन अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "aec", slug: "saidi-arabic", en_name: "Saidi Arabic", hi_name: "सैदी अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: सैदी अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "acw", slug: "hejazi-arabic", en_name: "Hejazi Arabic", hi_name: "हिजाज़ी अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: हिजाज़ी अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "acm", slug: "mesopotamian-arabic", en_name: "Mesopotamian Arabic", hi_name: "मेसोपोटामिया अरबी", /* 13-Sep kkb_l2_register: L2 भाषा — खाड़ी व अरब देश, arabic */
    next: 'आगे का रास्ता: मेसोपोटामिया अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "en", slug: "english", en_name: "English", hi_name: "अंग्रेज़ी",
    next: 'आगे का रास्ता: कोर्स पूरा करके IELTS (आयल्ट्स) — ' + kkb2Link("https://ielts.org", "ielts.org") + ' — या Cambridge A2 Key — ' + kkb2Link("https://www.cambridgeenglish.org", "cambridgeenglish.org") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "ar", slug: "arabic", en_name: "Arabic", hi_name: "अरबी",
    next: 'आगे का रास्ता: अरबी की कोई एक विश्व-परीक्षा सब देशों में प्रचलित नहीं — जिस देश में काम करना है, वहाँ के नियोक्ता/दूतावास की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fr", slug: "french", en_name: "French", hi_name: "फ़्रेंच",
    next: 'आगे का रास्ता: कोर्स पूरा करके DELF A2 (डेल्फ़) — ' + kkb2Link("https://www.france-education-international.fr", "france-education-international.fr") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "es", slug: "spanish", en_name: "Spanish", hi_name: "स्पेनिश",
    next: 'आगे का रास्ता: कोर्स पूरा करके DELE A2 (देले) — ' + kkb2Link("https://www.dele.org", "dele.org") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "ja", slug: "japanese", en_name: "Japanese", hi_name: "जापानी",
    next: 'आगे का रास्ता: कोर्स पूरा करके JFT-Basic (जे-एफ़-टी बेसिक — जापान के SSW वीज़ा का A2-द्वार) — ' + kkb2Link("https://www.jpf.go.jp/jft-basic/e/", "jpf.go.jp/jft-basic") + ' — या JLPT (जे-एल-पी-टी) — ' + kkb2Link("https://www.jlpt.jp/e/", "jlpt.jp") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "ko", slug: "korean", en_name: "Korean", hi_name: "कोरियाई",
    next: 'आगे का रास्ता: कोर्स पूरा करके TOPIK (टॉपिक) — ' + kkb2Link("https://www.topik.go.kr", "topik.go.kr") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "de", slug: "german", en_name: "German", hi_name: "जर्मन",
    next: 'आगे का रास्ता: कोर्स पूरा करके Goethe-Zertifikat A2 (गोएथे-ज़र्टिफ़िकाट) — ' + kkb2Link("https://www.goethe.de/en/spr/prf.html", "goethe.de") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "ru", slug: "russian", en_name: "Russian", hi_name: "रूसी",
    next: 'आगे का रास्ता: कोर्स पूरा करके TORFL (तोर्फ़ल — रूसी भाषा की सरकारी परीक्षा) — ' + kkb2Link("https://testingcenter.spbu.ru/en/", "testingcenter.spbu.ru") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "he", slug: "hebrew", en_name: "Hebrew", hi_name: "हिब्रू", /* 01-Sep: 9वीं L2 भाषा — इज़राइल (सरकारी G2G भर्ती-गलियारा) */
    next: 'आगे का रास्ता: हिब्रू की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — इज़राइल में काम की भाषा-माँग नियोक्ता/भर्ती-एजेंसी (सरकारी G2G) से ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pt", slug: "portuguese", en_name: "Portuguese", hi_name: "पुर्तगाली", /* 02-Sep: L2 भाषा — ब्राज़ील, अंगोला, मोज़ाम्बीक */
    next: 'आगे का रास्ता: कोर्स पूरा करके Celpe-Bras (सेल्पे-ब्रास — ब्राज़ील सरकार की आधिकारिक पुर्तगाली परीक्षा) — ' + kkb2Link("https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/celpe-bras", "gov.br/inep") + ' — की तैयारी। ' + KKB2_SAFE },
  { code: "ur", slug: "urdu", en_name: "Urdu", hi_name: "उर्दू", /* 02-Sep RTL-परिवार: L2 भाषा — उर्दू-भाषी क्षेत्र व खाड़ी */
    next: 'आगे का रास्ता: उर्दू की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fa", slug: "persian", en_name: "Persian", hi_name: "फ़ारसी", /* 02-Sep RTL-परिवार: L2 भाषा — ईरान व मध्य एशिया */
    next: 'आगे का रास्ता: फ़ारसी की कोई एक विश्व-प्रचलित A2-परीक्षा भारत में सहज उपलब्ध नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sd", slug: "sindhi", en_name: "Sindhi", hi_name: "सिंधी", /* 03-Sep RTL-परिवार: L2 भाषा — सिंधी-भाषी समुदाय */
    next: 'आगे का रास्ता: सिंधी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ks", slug: "kashmiri", en_name: "Kashmiri", hi_name: "कश्मीरी", /* 03-Sep RTL-परिवार: L2 भाषा — जम्मू-कश्मीर */
    next: 'आगे का रास्ता: कश्मीरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mr", slug: "marathi", en_name: "Marathi", hi_name: "मराठी", /* 03-Sep 4-भाषा खेप: L2 भाषा — महाराष्ट्र */
    next: 'आगे का रास्ता: मराठी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ne", slug: "nepali", en_name: "Nepali", hi_name: "नेपाली", /* 03-Sep 4-भाषा खेप: L2 भाषा — भारत व नेपाल */
    next: 'आगे का रास्ता: नेपाली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sw", slug: "swahili", en_name: "Swahili", hi_name: "स्वाहिली", /* 03-Sep 4-भाषा खेप: L2 भाषा — पूर्वी व मध्य अफ़्रीका (Latin) */
    next: 'आगे का रास्ता: स्वाहिली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bho", slug: "bhojpuri", en_name: "Bhojpuri", hi_name: "भोजपुरी", /* 03-Sep 4-भाषा खेप: L2 भाषा — पूर्वी उत्तर प्रदेश व बिहार (देवनागरी) */
    next: 'आगे का रास्ता: भोजपुरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "zh", slug: "mandarin", en_name: "Mandarin", hi_name: "चीनी", /* 04-Sep अगली-8 खेप का पहला: CJK, pinyin+देवनागरी-उच्चारण */
    next: 'आगे का रास्ता: HSK (Hanyu Shuiping Kaoshi) चीनी सरकार की आधिकारिक चीनी-भाषा परीक्षा है — काम के लिए HSK-3/4 स्तर उपयोगी। ' + KKB2_SAFE },
  { code: "id", slug: "indonesian", en_name: "Indonesian", hi_name: "इंडोनेशियाई", /* 04-Sep अगली-8 खेप का दूसरा: Latin, Roman-लिपि */
    next: 'आगे का रास्ता: इंडोनेशियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tr", slug: "turkish", en_name: "Turkish", hi_name: "तुर्की", /* 04-Sep अगली-8 का तीसरा: Latin+ğüşıöç */
    next: 'आगे का रास्ता: तुर्की की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kn", slug: "kannada", en_name: "Kannada", hi_name: "कन्नड", /* 02-Sep: L2 भाषा — कर्नाटक */
    next: 'आगे का रास्ता: कन्नड की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ta", slug: "tamil", en_name: "Tamil", hi_name: "तमिल", /* 02-Sep: L2 भाषा — तमिलनाडु, श्रीलंका, सिंगापुर */
    next: 'आगे का रास्ता: तमिल की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "te", slug: "telugu", en_name: "Telugu", hi_name: "तेलुगु", /* 02-Sep: L2 भाषा — आंध्र प्रदेश व तेलंगाना */
    next: 'आगे का रास्ता: तेलुगु की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bn", slug: "bengali", en_name: "Bengali", hi_name: "बांग्ला", /* 02-Sep: L2 भाषा — बंगाल व बांग्लादेश */
    next: 'आगे का रास्ता: बांग्ला की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "or", slug: "odia", en_name: "Odia", hi_name: "उड़िया", /* 02-Sep: L2 भाषा — ओडिशा */
    next: 'आगे का रास्ता: उड़िया की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "as", slug: "assamese", en_name: "Assamese", hi_name: "असमिया", /* 02-Sep: L2 भाषा — असम */
    next: 'आगे का रास्ता: असमिया की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pa", slug: "punjabi", en_name: "Punjabi", hi_name: "पंजाबी", /* 02-Sep: L2 भाषा — पंजाब */
    next: 'आगे का रास्ता: पंजाबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gu", slug: "gujarati", en_name: "Gujarati", hi_name: "गुजराती", /* 02-Sep: L2 भाषा — गुजरात */
    next: 'आगे का रास्ता: गुजराती की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ml", slug: "malayalam", en_name: "Malayalam", hi_name: "मलयालम", /* 02-Sep: L2 भाषा — केरल */
    next: 'आगे का रास्ता: मलयालम की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "xh", slug: "xhosa", en_name: "Xhosa", hi_name: "षोसा", /* 10-Sep: L2 भाषा — दक्षिण-अफ़्रीका, Nguni/Bantu परिवार (latin-plain, click-consonants c/q/x ज़ुलु जैसा सन्निकटन से); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप अठारहवाँ (अंतिम); L1-transliteration इसी दौर में सुधारी गई (help-array data-bug भी बंद) */
    next: 'आगे का रास्ता: षोसा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "zu", slug: "zulu", en_name: "Zulu", hi_name: "ज़ुलु", /* 10-Sep: L2 भाषा — दक्षिण-अफ़्रीका, Nguni/Bantu परिवार (latin-plain, click-consonants c/q/x सुसंगत-सन्निकटन से); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सत्रहवाँ; L1-transliteration इसी दौर में सुधारी गई (help-array data-bug भी बंद) */
    next: 'आगे का रास्ता: ज़ुलु की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ig", slug: "igbo", en_name: "Igbo", hi_name: "इग्बो", /* 10-Sep: L2 भाषा — नाइजीरिया, Niger-Congo परिवार (latin-native, tone-marked); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सोलहवाँ; L1-transliteration इसी दौर में सुधारी गई (help-array data-bug भी बंद) */
    next: 'आगे का रास्ता: इग्बो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yo", slug: "yoruba", en_name: "Yoruba", hi_name: "योरूबा", /* 10-Sep: L2 भाषा — नाइजीरिया, Niger-Congo परिवार (latin-native, tone-marked); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पंद्रहवाँ; L1-transliteration इसी दौर में सुधारी गई */
    next: 'आगे का रास्ता: योरूबा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ti", slug: "tigrinya", en_name: "Tigrinya", hi_name: "तिग्रीन्या", /* 10-Sep: L2 भाषा — इरिट्रिया/उत्तर-इथियोपिया, Semitic परिवार (Ethiopic-Geez लिपि); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप चौदहवाँ; L1 पहले से सही थी */
    next: 'आगे का रास्ता: तिग्रीन्या की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "am", slug: "amharic", en_name: "Amharic", hi_name: "अम्हारिक", /* 09-Sep: L2 भाषा — इथियोपिया, Semitic परिवार (Ethiopic-Geez लिपि, आधिकारिक भाषा); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप तेरहवाँ; L1-transliteration इसी दौर में सुधारी गई */
    next: 'आगे का रास्ता: अम्हारिक की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mg", slug: "malagasy", en_name: "Malagasy", hi_name: "मालागासी", /* 09-Sep: L2 भाषा — मैडागास्कर, Austronesian परिवार (latin-native, मुख्य भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप बारहवाँ; L1-transliteration इसी दौर में सुधारी गई */
    next: 'आगे का रास्ता: मालागासी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bm", slug: "bambara", en_name: "Bambara", hi_name: "बमबारा", /* 09-Sep: L2 भाषा — माली, Manding परिवार (latin-native, मुख्य भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप ग्यारहवाँ */
    next: 'आगे का रास्ता: बमबारा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "om", slug: "oromo", en_name: "Oromo", hi_name: "ओरोमो", /* 09-Sep: L2 भाषा — इथियोपिया, Cushitic परिवार (latin-native Qubee लिपि, व्यापक भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप दसवाँ; L1-transliteration इसी दौर में सुधारी गई */
    next: 'आगे का रास्ता: ओरोमो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tw", slug: "twi", en_name: "Akan/Twi", hi_name: "अकान/त्वी", /* 09-Sep: L2 भाषा — घाना, Kwa परिवार (latin-native, विशेष स्वर ɛ/ɔ सहित, मुख्य भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप नौवाँ */
    next: 'आगे का रास्ता: अकान/त्वी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sn", slug: "shona", en_name: "Shona", hi_name: "शोना", /* 09-Sep: L2 भाषा — ज़िम्बाब्वे, Bantu परिवार (latin-native, मुख्य भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप आठवाँ */
    next: 'आगे का रास्ता: शोना की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ny", slug: "chichewa", en_name: "Chichewa", hi_name: "चिचेवा", /* 09-Sep: L2 भाषा — मलावी, Bantu परिवार (latin-native, राष्ट्रभाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप सातवाँ */
    next: 'आगे का रास्ता: चिचेवा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rw", slug: "kinyarwanda", en_name: "Kinyarwanda", hi_name: "किन्यारवांडा", /* 09-Sep: L2 भाषा — रवांडा, Bantu परिवार (latin-native, आधिकारिक भाषा); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप छठा */
    next: 'आगे का रास्ता: किन्यारवांडा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lg", slug: "luganda", en_name: "Luganda", hi_name: "लुगांडा", /* 09-Sep: L2 भाषा — युगांडा, Bantu परिवार (latin-native); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पाँचवाँ */
    next: 'आगे का रास्ता: लुगांडा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "wo", slug: "wolof", en_name: "Wolof", hi_name: "वोलोफ़", /* 09-Sep: L2 भाषा — सेनेगल, नाइजर-कांगो/अटलांटिक परिवार (latin-native); मध्यम-निम्न विश्वसनीयता — अफ़्रीका-18-भाषा-खेप चौथा */
    next: 'आगे का रास्ता: वोलोफ़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "so", slug: "somali", en_name: "Somali", hi_name: "सोमाली", /* 09-Sep: L2 भाषा — सोमालिया, कुशीतिक/अफ़्रो-एशियाटिक परिवार (latin-native); मध्यम विश्वसनीयता — अफ़्रीका-18-भाषा-खेप तीसरा */
    next: 'आगे का रास्ता: सोमाली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ha", slug: "hausa", en_name: "Hausa", hi_name: "हाउसा", /* 09-Sep: L2 भाषा — नाईजीरिया/नाइजर, चाडिक/अफ़्रो-एशियाटिक परिवार (latin); मध्यम-उच्च विश्वसनीयता — अफ़्रीका-18-भाषा-खेप दूसरा */
    next: 'आगे का रास्ता: हाउसा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "af", slug: "afrikaans", en_name: "Afrikaans", hi_name: "अफ़्रीकांस", /* 09-Sep: L2 भाषा — दक्षिण अफ़्रीका, जर्मनिक/इंडो-यूरोपीय परिवार (latin-native); उच्च-विश्वसनीयता — अफ़्रीका-18-भाषा-खेप पहला */
    next: 'आगे का रास्ता: अफ़्रीकांस की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "anp", slug: "angika", en_name: "Angika", hi_name: "अंगिका", /* 09-Sep: L2 भाषा — बिहार भागलपुर-मुंगेर-पूर्णिया, हिंद-आर्य परिवार; उच्च-विश्वसनीयता — Founder-ऑडिट से पकड़ी 18-भाषा कतार के बाहर की भाषा */
    next: 'आगे का रास्ता: अंगिका की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sjp", slug: "surjapuri", en_name: "Surjapuri", hi_name: "सुरजापुरी", /* 05-Oct: बोली-खेप-1 — बिहार-सीमांचल (किशनगंज-पूर्णिया-कटिहार-अररिया), हिंद-आर्य परिवार, बांग्ला-मैथिली-प्रभावित; मध्यम-उच्च विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: सुरजापुरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "khr", slug: "khortha", en_name: "Khortha", hi_name: "खोरठा", /* 05-Oct: बोली-खेप-2 — झारखंड (धनबाद-बोकारो-हज़ारीबाग़-गिरिडीह-रामगढ़), हिंद-आर्य परिवार, मगही-अंगिका-क़रीबी; मध्यम-उच्च विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: खोरठा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sck", slug: "sadri", en_name: "Sadri", hi_name: "सादरी", /* 05-Oct: बोली-खेप-3 — झारखंड (राँची-गुमला-खूँटी-सिमडेगा), आदिवासी-बहुल क्षेत्र की संपर्क-भाषा (भोजपुरी-मगही आधार); मध्यम-उच्च विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: सादरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kyw", slug: "kurmali", en_name: "Kurmali", hi_name: "कुरमाली", /* 05-Oct: बोली-खेप-4 — झारखंड-बंगाल-ओडिशा सीमा (धनबाद-पुरुलिया-बांकुड़ा-मयूरभंज), हिंद-आर्य परिवार, बंगाल-सीमा प्रभाव; मध्यम विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: कुरमाली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bns", slug: "bundeli", en_name: "Bundeli", hi_name: "बुंदेली", /* 05-Oct: बोली-खेप-5 (B2-1) — बुंदेलखंड (झाँसी-सागर-छतरपुर-टीकमगढ़-दमोह), पश्चिम-हिंदी परिवार, हिंदी-बेहद-क़रीबी; मध्यम-उच्च विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: बुंदेली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bfy", slug: "bagheli", en_name: "Bagheli", hi_name: "बघेली", /* 05-Oct: बोली-खेप-6 (B2-2) — मध्यप्रदेश (रीवा-सतना-सीधी-शहडोल), पूर्वी-हिंदी परिवार (अवधी-क़रीबी); मध्यम-उच्च विश्वसनीयता — स्थानीय-वक्ता-जाँच वांछित */
    next: 'आगे का रास्ता: बघेली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bra", slug: "brajbhasha", en_name: "Brajbhasha", hi_name: "ब्रजभाषा", /* 05-Oct: बोली-खेप-7 (B2-3) — उत्तरप्रदेश (मथुरा-आगरा-अलीगढ़-एटा), पश्चिम-हिंदी परिवार, साहित्यिक-समृद्ध (कृष्ण-काव्य परंपरा); उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: ब्रजभाषा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mal", slug: "malvi", en_name: "Malvi", hi_name: "मालवी", /* 05-Oct: बोली-खेप-8 (B3-1) — मध्यप्रदेश-राजस्थान सीमा (इंदौर-उज्जैन-रतलाम-मंदसौर), राजस्थानी-भाषा परिवार (मारवाड़ी-क़रीबी); मध्यम-उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: मालवी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nim", slug: "nimadi", en_name: "Nimadi", hi_name: "निमाड़ी", /* 05-Oct: बोली-खेप-9 (B3-2) — मध्यप्रदेश (खरगोन-बड़वानी-खंडवा-बुरहानपुर), राजस्थानी-भाषा परिवार (मालवी-क़रीबी); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: निमाड़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mtr", slug: "mewari", en_name: "Mewari", hi_name: "मेवाड़ी", /* 05-Oct: बोली-खेप-10 (B3-3) — राजस्थान (उदयपुर-चित्तौड़गढ़-राजसमंद-भीलवाड़ा), राजस्थानी-भाषा परिवार (मारवाड़ी-बेहद-क़रीबी); मध्यम-उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: मेवाड़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dhu", slug: "dhundhari", en_name: "Dhundhari", hi_name: "ढूँढाड़ी", /* 05-Oct: बोली-खेप-11 (B3-4) — राजस्थान (जयपुर-अजमेर-टोंक-दौसा), राजस्थानी-भाषा परिवार (मारवाड़ी-क़रीबी); मध्यम-उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: ढूँढाड़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hdt", slug: "hadoti", en_name: "Hadoti", hi_name: "हाड़ौती", /* 05-Oct: बोली-खेप-12 (B3-5) — राजस्थान (कोटा-बूँदी-बारां-झालावाड़), राजस्थानी-भाषा परिवार (मारवाड़ी-क़रीबी); मध्यम-उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: हाड़ौती की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bgr", slug: "bagri", en_name: "Bagri", hi_name: "बागड़ी", /* 05-Oct: बोली-खेप-13 (B3-6) — राजस्थान (बीकानेर-गंगानगर-हनुमानगढ़), राजस्थानी-भाषा परिवार (मारवाड़ी-क़रीबी); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: बागड़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mtw", slug: "mewati", en_name: "Mewati", hi_name: "मेवाती", /* 05-Oct: बोली-खेप-14 (B3-7) — राजस्थान-हरियाणा सीमा (अलवर-भरतपुर), राजस्थानी-हरियाणवी मिश्रित क्षेत्र; मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: मेवाती की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bsn", slug: "bishnoi", en_name: "Bishnoi", hi_name: "बिश्नोई", /* 05-Oct: बोली-खेप-15 (B3-8) — पश्चिम-राजस्थान (बीकानेर-जोधपुर-नागौर), राजस्थानी-भाषा परिवार (मारवाड़ी-बेहद-क़रीबी); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: बिश्नोई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lri", slug: "lariya", en_name: "Lariya", hi_name: "लरिया", /* 05-Oct: बोली-खेप-16 (B5-1) — छत्तीसगढ़-ओडिशा सीमा (रायगढ़-जशपुर-सरगुजा), पूर्वी-हिंदी परिवार (छत्तीसगढ़ी-बेहद-क़रीबी); मध्यम-उच्च विश्वसनीयता */
    next: 'आगे का रास्ता: लरिया की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pwr", slug: "pawari", en_name: "Pawari", hi_name: "पवारी", /* 05-Oct: बोली-खेप-17 (B2-पुनः) — मध्यप्रदेश-महाराष्ट्र सीमा (बालाघाट-सिवनी-भंडारा-गोंदिया), ISO pwr राजस्थानी-मालवी परिवार (वेब-शोध से पुष्ट); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: पवारी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gjr", slug: "gojri", en_name: "Gojri", hi_name: "गोजरी", /* 05-Oct: बोली-खेप-18 (B3-पुनः) — जम्मू-हिमाचल-उत्तराखंड (गुज्जर-समुदाय), राजस्थानी-भाषा परिवार (वेब-शोध से पुष्ट — Ethnologue "Western Rajasthani Gujari"); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: गोजरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lmn", slug: "lambadi", en_name: "Lambadi", hi_name: "बंजारी", /* 05-Oct: बोली-खेप-19 (B5-पुनः) — बहु-राज्य घुमंतू बंजारा-समुदाय, राजस्थानी-मेवाड़-मारवाड़ मूल (वेब-शोध से पुष्ट — Lambadi/Gor Boli); मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: बंजारी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kgr", slug: "kangri", en_name: "Kangri", hi_name: "कांगड़ी", /* 05-Oct: बोली-खेप-20 (B4-पहला) — हिमाचल प्रदेश (कांगड़ा-हमीरपुर-ऊना), पश्चिमी-पहाड़ी परिवार; ⚠️ सीमित-विश्वसनीयता — सिर्फ़ sarvnaam/prashn-shabd/postposition Wikipedia-pronoun-तालिका से, क्रिया-तंत्र अपुष्ट; same-dar ~49% */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — आगे बढ़ने से पहले स्थानीय वक्ता/शिक्षक से पुष्टि ज़रूरी। ' + KKB2_SAFE },
  { code: "mjl", slug: "mandeali", en_name: "Mandeali", hi_name: "मंडयाली", /* 05-Oct: बोली-खेप-21 (B4-दूसरा) — हिमाचल (मंडी), ISO mjl, पश्चिमी-पहाड़ी परिवार; ⚠️ सीमित-विश्वसनीयता — pronoun+postposition Wikipedia से पुष्ट (कांगड़ी से व्यापक), क्रिया-तंत्र अपुष्ट; same-dar ~25% */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — आगे बढ़ने से पहले स्थानीय वक्ता/शिक्षक से पुष्टि ज़रूरी। ' + KKB2_SAFE },
  { code: "cdh", slug: "chambeali", en_name: "Chambeali", hi_name: "चम्बियाली", /* 05-Oct: बोली-खेप-22 (B4-तीसरा) — हिमाचल (चंबा), ISO cdh; ⚠️ निम्न-विश्वसनीयता — कोई स्वतंत्र pronoun-स्रोत नहीं, मंडयाली-निकटता (83% Ethnologue) आधारित approximation; same-dar ~25% (मंडयाली-इनहेरिटेड) */
    next: '⚠️ यह कोर्स मंडयाली-निकटता पर आधारित approximation है (ऊपर नोट देखें) — आगे बढ़ने से पहले स्थानीय वक्ता/शिक्षक से पुष्टि ज़रूरी। ' + KKB2_SAFE },
  { code: "gbk", slug: "gaddi", en_name: "Gaddi", hi_name: "गद्दी", /* 05-Oct: बोली-खेप-23 (B4-चौथा) — हिमाचल (चंबा-भरमौर), ISO gbk; ⚠️ बहुत-निम्न-विश्वसनीयता — सिर्फ़ 1 पुष्ट तथ्य (नहीं→नी, UCL-Grammar-2026), बाक़ी chain-approximation (मंडयाली→चम्बियाली→गद्दी) */
    next: '⚠️ यह कोर्स chain-approximation है, गद्दी-विशिष्ट स्रोत नहीं (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },
  { code: "cdj", slug: "churahi", en_name: "Churahi", hi_name: "चुराही", /* 05-Oct: बोली-खेप-24 (B4-पाँचवाँ) — हिमाचल (चुराह-सलूणी), ISO cdj; ⚠️ मंडयाली-निकटता 90% (सबसे उच्च में से एक) Ethnologue-पुष्ट; same-dar ~25% (मंडयाली-इनहेरिटेड) */
    next: '⚠️ यह कोर्स मंडयाली-निकटता पर आधारित approximation है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },
  { code: "bhd", slug: "bhadarwahi", en_name: "Bhadarwahi", hi_name: "भद्रवाही", /* 05-Oct: बोली-खेप-25 (B4-छठा) — जम्मू-हिमाचल सीमा (भद्रवाह), ISO bhd; ⚠️ दोहरा-अनुमान (चुराही-chain, Wikipedia "closely related" कथन पर आधारित, % अनुपलब्ध) */
    next: '⚠️ यह कोर्स दोहरा-अनुमान (चुराही-chain) है, भद्रवाही-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },
  { code: "hii", slug: "hinduri", en_name: "Hinduri", hi_name: "हंडूरी", /* 05-Oct: बोली-खेप-26 (B4-सातवाँ) — हिमाचल (सोलन-नालागढ़), ISO hii; ⚠️ हिंदी से 64% lexical-similarity ख़ुद Ethnologue-तथ्य — न्यूनतम-रूपांतरण genuine है, गढ़ा नहीं */
    next: '⚠️ यह कोर्स न्यूनतम-भिन्नता कोर्स है (हिंदी-बेहद-क़रीबी भाषा) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },
  { code: "jns", slug: "jaunsari", en_name: "Jaunsari", hi_name: "जौनसारी", /* 05-Oct: बोली-खेप-27 (B4-आठवाँ) — उत्तराखंड (जौनसार-बावर), ISO jns, Central-Pahari परिवार; SIL-2008-survey pronoun-तालिका से पुष्ट (gender-marked direct/oblique) — क्रिया-तंत्र अपुष्ट; same-dar ~70% */
    next: '⚠️ यह कोर्स बहुत-सीमित-शब्दावली है (ऊपर नोट देखें) — जौनसारी हिंदी-परिवार से बिल्कुल अलग है, स्थानीय वक्ता से सीखना अनिवार्य। ' + KKB2_SAFE },
  { code: "srx", slug: "sirmauri", en_name: "Sirmauri", hi_name: "सिरमौरी", /* 05-Oct: बोली-खेप-28 (B4-नौवाँ, अंतिम) — हिमाचल (सिरमौर), ISO srx, Mahasu-Pahari परिवार; केओंठली-निकटता (Wikipedia "interchangeable in south Shimla") आधारित chain-approximation; same-dar ~75% */
    next: '⚠️ यह कोर्स केओंठली-निकटता पर आधारित दोहरा-अनुमान है, सिरमौरी-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },
  { code: "him", slug: "himachali", en_name: "Himachali-general", hi_name: "हिमाचली", /* 05-Oct: बोली-खेप-29 (अंतिम, B4-दसवाँ) — हिमाचल प्रदेश (सामान्य), छाता-नाम; मंडयाली-प्रतिनिधि-आधारित, कोई स्वतंत्र भाषा-पहचान नहीं */
    next: '⚠️ \"हिमाचली\" छाता-नाम है, विशिष्ट बोली नहीं (ऊपर नोट देखें) — अपने इलाक़े की बोली-विशिष्ट कोर्स चुनें। ' + KKB2_SAFE },

  { code: "gwr", slug: "gawari", en_name: "Gawari", hi_name: "गावरी", /* 05-Oct: बोली-खेप-30 (वास्तविक-अंतिम) — हिमाचल-उत्तराखंड सीमा, Central-Pahari क्षेत्र; नागपुरी(गढ़वाल)-pronoun-तालिका निकटता-आधारित (58-61% lexical-similarity दर्ज उसी Jaunsari-Sirmauri-Bangani समूह में) */
    next: '⚠️ यह कोर्स क्षेत्रीय-निकटता पर आधारित approximation है, गावरी-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "sat", slug: "santali", en_name: "Santali", hi_name: "संथाली", /* 09-Sep: L2 भाषा — झारखंड/बिहार/बंगाल/ओडिशा, मुंडा-परिवार पहला (देवनागरी); ⚠️⚠️ मुंडा/ऑस्ट्रो-एशियाटिक भाषा-परिवार — न हिंद-आर्य न द्रविड़, उच्च-अनिश्चितता; स्थानीय-वक्ता-जाँच अनिवार्य-पहले-उपयोग; दक्षिण-एशिया-खेप का अठारहवाँ/अंतिम — कतार पूर्ण */
    next: 'आगे का रास्ता: संथाली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kru", slug: "kurukh", en_name: "Kurukh", hi_name: "कुरुख़", /* 05-Oct: द्रविड़-खेप-1 — झारखंड-बिहार-बंगाल-मप्र सीमा (Chotanagpur), North Dravidian परिवार; Wikipedia pronoun-तालिका (Yen/Nin/Aas/Aad) + negation-marker से पुष्ट; झारखंड-बंगाल में आधिकारिक-लिपि; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: कुरुख़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "gon", slug: "gondi", en_name: "Gondi", hi_name: "गोंडी", /* 09-Sep: L2 भाषा — मध्य-भारत गोंड जनजातीय पट्टी, द्रविड़-परिवार दूसरा (देवनागरी); ⚠️⚠️ द्रविड़-भाषा-परिवार — उच्च-अनिश्चितता; स्थानीय-वक्ता-जाँच अनिवार्य-पहले-उपयोग */
    next: 'आगे का रास्ता: गोंडी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "uki", slug: "kui", en_name: "Kui", hi_name: "कुई", /* 05-Oct: द्रविड़-खेप-2 — ओडिशा-आंध्रप्रदेश, South-Central Dravidian (Konda-Kui समूह); सिर्फ़ pronoun+postposition-संकेत मिले (Grokipedia), मुख्य-लिपि ओड़िया; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "tcy", slug: "tulu", en_name: "Tulu", hi_name: "तुलु", /* 09-Sep: L2 भाषा — तटीय कर्नाटक, द्रविड़-परिवार पहला (देवनागरी); ⚠️⚠️ द्रविड़-भाषा-परिवार — हिंद-आर्य भाषाओं से बुनियादी व्याकरण अलग, उच्च-अनिश्चितता; स्थानीय-वक्ता-जाँच अनिवार्य-पहले-उपयोग; कन्नड़-लिपि-दूषण kn2dev.py fixer से सुधारा (0 अवशिष्ट) */
    next: 'आगे का रास्ता: तुलु की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kff", slug: "koya", en_name: "Koya", hi_name: "कोया", /* 05-Oct: द्रविड़-खेप-3 — आंध्र-तेलंगाना-छत्तीसगढ़-ओडिशा, Gondi-Kui समूह; SIL-sample "Nanna" + Proto-Dravidian pronoun-पुनर्निर्माण; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "syl", slug: "sylheti", en_name: "Sylheti", hi_name: "सिल्हटी", /* 09-Sep: L2 भाषा — सिलहट-असम पट्टी, दक्षिण-एशिया-खेप पंद्रहवाँ (देवनागरी); बांग्ला-निकटता के कारण लेखन में लिपि-मिश्रण जोखिम — bn2dev.py fixer से सुधार व सत्यापित (0 अवशिष्ट बंगाली-अक्षर) */
    next: 'आगे का रास्ता: सिल्हटी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kxv", slug: "kuvi", en_name: "Kuvi", hi_name: "कुवि", /* 05-Oct: द्रविड़-खेप-4 — ओडिशा-आंध्रप्रदेश, कुई-निकटता (Wikipedia "closely related"); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स कुई-निकटता पर आधारित है, कुवि-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "pnb", slug: "western-punjabi", en_name: "Western Punjabi", hi_name: "पश्चिमी पंजाबी", /* 09-Sep: L2 भाषा — पाकिस्तानी पंजाब, दक्षिण-एशिया-खेप चौदहवाँ (देवनागरी); सराइकी की Lahnda-बोली-शृंखला से निकट — सर्वनाम-रूप बदलकर बनाया, शब्दावली अधिकांशतः साझा */
    next: 'आगे का रास्ता: पश्चिमी पंजाबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kfa", slug: "kodava", en_name: "Kodava", hi_name: "कोडव", /* 05-Oct: द्रविड़-खेप-5 — कर्नाटक (कोडगु/Coorg), South Dravidian, स्वतंत्र साहित्यिक-भाषा; kodavaclan.com pronoun+postposition पुष्ट; मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: कोडव की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "skr", slug: "saraiki", en_name: "Saraiki", hi_name: "सराइकी", /* 09-Sep: L2 भाषा — मुल्तान-बहावलपुर पट्टी, दक्षिण-एशिया-खेप तेरहवाँ (देवनागरी) */
    next: 'आगे का रास्ता: सराइकी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kfj", slug: "konda", en_name: "Konda", hi_name: "कोंडा", /* 05-Oct: द्रविड़-खेप-6 — आंध्र-ओडिशा, Konda-Kui समूह (कुई-निकटता-chain); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स कुई-निकटता पर आधारित है, कोंडा-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "mni", slug: "manipuri", en_name: "Manipuri", hi_name: "मणिपुरी (Meiteilon)", /* 09-Sep: L2 भाषा — मणिपुर, दक्षिण-एशिया-खेप बारहवाँ (देवनागरी); चीनी-तिब्बती परिवार — ऊँची-अनिश्चितता, स्थानीय-वक्ता-जाँच अनिवार्य-पहले-उपयोग */
    next: 'आगे का रास्ता: मणिपुरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kmj", slug: "malto", en_name: "Malto", hi_name: "माल्टो", /* 05-Oct: द्रविड़-खेप-7 — बिहार-झारखंड-बंगाल सीमा, Kurukh-Malto नामित-उपशाखा (कुरुख़-chain); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स कुरुख़-निकटता पर आधारित है, माल्टो-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "mwr", slug: "marwari", en_name: "Marwari", hi_name: "मारवाड़ी", /* 09-Sep: L2 भाषा — मारवाड़ राजस्थान, दक्षिण-एशिया-खेप ग्यारहवाँ (देवनागरी) */
    next: 'आगे का रास्ता: मारवाड़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kfb", slug: "kolami", en_name: "Kolami", hi_name: "कोलामी", /* 05-Oct: द्रविड़-खेप-8 — महाराष्ट्र-तेलंगाना-मप्र, Central Dravidian (सबसे बड़ी); Wikipedia Devanagari-sample-तालिका पुष्ट; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "gom", slug: "konkani", en_name: "Konkani", hi_name: "कोंकणी", /* 09-Sep: L2 भाषा — गोवा व कोंकण तट, दक्षिण-एशिया-खेप दसवाँ (देवनागरी) */
    next: 'आगे का रास्ता: कोंकणी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "nit", slug: "naiki", en_name: "Naiki", hi_name: "नाइकी", /* 05-Oct: द्रविड़-खेप-9 — महाराष्ट्र, Southeastern Kolami (कोलामी-chain, Wikipedia-नामित उपशाखा); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स कोलामी-निकटता पर आधारित है, नाइकी-विशिष्ट स्रोत नहीं — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "mag", slug: "magahi", en_name: "Magahi", hi_name: "मगही", /* 09-Sep: L2 भाषा — मगध क्षेत्र, दक्षिण-एशिया-खेप नौवाँ (देवनागरी) */
    next: 'आगे का रास्ता: मगही की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "pci", slug: "parji", en_name: "Parji", hi_name: "पारजी", /* 05-Oct: द्रविड़-खेप-10 — छत्तीसगढ़-ओडिशा (बस्तर), Central Dravidian; Burrow-Bhattacharya nan-pronoun पुष्ट, कोलामी-chain; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "hne", slug: "chhattisgarhi", en_name: "Chhattisgarhi", hi_name: "छत्तीसगढ़ी", /* 09-Sep: L2 भाषा — छत्तीसगढ़, दक्षिण-एशिया-खेप आठवाँ (देवनागरी) */
    next: 'आगे का रास्ता: छत्तीसगढ़ी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "gdb", slug: "gadaba", en_name: "Gadaba", hi_name: "गदबा", /* 05-Oct: द्रविड़-खेप-11 — ओडिशा-आंध्र, Parji-Gadaba उपशाखा (पारजी-chain); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "kfy", slug: "kumaoni", en_name: "Kumaoni", hi_name: "कुमाऊंनी", /* 09-Sep: L2 भाषा — कुमाऊं क्षेत्र उत्तराखंड, दक्षिण-एशिया-खेप सातवाँ (देवनागरी) */
    next: 'आगे का रास्ता: कुमाऊंनी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "peg", slug: "pengo", en_name: "Pengo", hi_name: "पेंगो", /* 05-Oct: द्रविड़-खेप-12 — ओडिशा (नबरंगपुर), Manda-Pengo नामित-उपशाखा (कुई-chain); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "gbm", slug: "garhwali", en_name: "Garhwali", hi_name: "गढ़वाली", /* 09-Sep: L2 भाषा — गढ़वाल क्षेत्र उत्तराखंड, दक्षिण-एशिया-खेप छठवाँ (देवनागरी) */
    next: 'आगे का रास्ता: गढ़वाली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "mha", slug: "manda", en_name: "Manda", hi_name: "मांडा", /* 05-Oct: द्रविड़-खेप-13 (अंतिम) — ओडिशा, Manda-Pengo नामित-उपशाखा (कुई-chain); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स सीमित-शब्दावली है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "doi", slug: "dogri", en_name: "Dogri", hi_name: "डोगरी", /* 09-Sep: L2 भाषा — जम्मू क्षेत्र, दक्षिण-एशिया-खेप पाँचवाँ (देवनागरी) */
    next: 'आगे का रास्ता: डोगरी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "grt", slug: "garo", en_name: "Garo", hi_name: "गारो", /* 05-Oct: उत्तर-पूर्व-खेप-1 — मेघालय, Tibeto-Burman (Bodo-Garo); academic pronoun+case-तालिका पुष्ट; आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: गारो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "bjj", slug: "bajjika", en_name: "Bajjika", hi_name: "बज्जिका", /* 09-Sep: L2 भाषा — बिहार (वैशाली-मुज़फ़्फ़रपुर), दक्षिण-एशिया-खेप चौथा (देवनागरी) */
    next: 'आगे का रास्ता: बज्जिका की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "trp", slug: "kokborok", en_name: "Kokborok", hi_name: "कोकबोरोक", /* 05-Oct: उत्तर-पूर्व-खेप-2 — त्रिपुरा, Tibeto-Burman (Bodo-Garo); languageshome.com समृद्ध conversational-pattern पुष्ट; त्रिपुरा आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: कोकबोरोक की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "bhb", slug: "bhili", en_name: "Bhili", hi_name: "भीली", /* 09-Sep: L2 भाषा — राजस्थान-गुजरात-मध्यप्रदेश जनजातीय पट्टी, दक्षिण-एशिया-खेप तीसरा (देवनागरी) */
    next: 'आगे का रास्ता: भीली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kha", slug: "khasi", en_name: "Khasi", hi_name: "खासी", /* 05-Oct: उत्तर-पूर्व-खेप-3 — मेघालय, Austroasiatic Mon-Khmer (भारत की एकमात्र); Wikipedia pronoun-तालिका पुष्ट; मेघालय आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: खासी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "bgc", slug: "haryanvi", en_name: "Haryanvi", hi_name: "हरियाणवी", /* 09-Sep: L2 भाषा — हरियाणा, दक्षिण-एशिया-खेप दूसरा (देवनागरी) */
    next: 'आगे का रास्ता: हरियाणवी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "unr", slug: "mundari", en_name: "Mundari", hi_name: "मुंडारी", /* 05-Oct: उत्तर-पूर्व-खेप-4 — झारखंड-ओडिशा, Austroasiatic Munda; languageshome.com समृद्ध pronoun-तालिका पुष्ट; झारखंड आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: मुंडारी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "awa", slug: "awadhi", en_name: "Awadhi", hi_name: "अवधी", /* 09-Sep: L2 भाषा — अवध क्षेत्र, दक्षिण-एशिया-खेप पहला (देवनागरी) */
    next: 'आगे का रास्ता: अवधी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "hoc", slug: "ho", en_name: "Ho", hi_name: "हो", /* 05-Oct: उत्तर-पूर्व-खेप-5 — झारखंड-ओडिशा, Munda Kherwarian; मुंडारी-chain (sister-language दर्ज); ⚠️ मध्यम-विश्वसनीयता */
    next: '⚠️ यह कोर्स मुंडारी-निकटता पर आधारित है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "mai", slug: "maithili", en_name: "Maithili", hi_name: "मैथिली", /* 04-Sep: L2 भाषा — मिथिला, बिहार (देवनागरी) */
    next: 'आगे का रास्ता: मैथिली की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "biy", slug: "bhumij", en_name: "Bhumij", hi_name: "भूमिज", /* 05-Oct: उत्तर-पूर्व-खेप-6 — झारखंड-ओडिशा-बंगाल, Munda Kherwarian; मुंडारी-निकटता chain; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स मुंडारी-निकटता पर आधारित है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "sa", slug: "sanskrit", en_name: "Sanskrit", hi_name: "संस्कृत", /* 05-Sep: L2 भाषा — शास्त्र, शिक्षा व संस्कृति-जगत (देवनागरी) */
    next: 'आगे का रास्ता: संस्कृत की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — शास्त्र/शिक्षा-जगत में जहाँ काम करना है, वहाँ की संस्था की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "kfp", slug: "korwa", en_name: "Korwa", hi_name: "कोरवा", /* 05-Oct: उत्तर-पूर्व-खेप-7 — छत्तीसगढ़-झारखंड, Munda Kherwarian; SIL-2022 मुंडारी-निकटता; देवनागरी आधिकारिक-लिपि; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स मुंडारी-निकटता पर आधारित है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "it", slug: "italian", en_name: "Italian", hi_name: "इतालवी", /* 04-Sep: अगली-8 खेप का तीसरा — Latin */
    next: 'आगे का रास्ता: कोर्स पूरा करके CILS A2 या CELI A2 — ' + kkb2Link("https://cils.unistrasi.it", "cils.unistrasi.it") + ' — की तैयारी। ' + KKB2_SAFE },

  { code: "pbv", slug: "pnar", en_name: "Pnar", hi_name: "प्नार", /* 05-Oct: उत्तर-पूर्व-खेप-8 — मेघालय (जयंतिया हिल्स), Khasic उपपरिवार; खासी-निकटता chain; ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स खासी-निकटता पर आधारित है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "ms", slug: "malay", en_name: "Malay", hi_name: "मलय", /* 04-Sep: अगली-8 खेप का चौथा — Latin, मलेशिया */
    next: 'आगे का रास्ता: मलय की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "dis", slug: "dimasa", en_name: "Dimasa", hi_name: "डिमासा", /* 05-Oct: उत्तर-पूर्व-खेप-9 — असम (दिमा हासाओ), Tibeto-Burman (Bodo-Garo); genuine pronoun-तालिका पुष्ट (Ang/Ning/Bo); आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: डिमासा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "vi", slug: "vietnamese", en_name: "Vietnamese", hi_name: "वियतनामी", /* 04-Sep: अगली-8 खेप का पाँचवाँ — Latin, वियतनाम */
    next: 'आगे का रास्ता: वियतनामी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "lus", slug: "mizo", en_name: "Mizo", hi_name: "मिज़ो", /* 05-Oct: उत्तर-पूर्व-खेप-10 (अंतिम) — मिज़ोरम, Tibeto-Burman (Kuki-Chin); genuine pronoun-तालिका पुष्ट (Kei/Nang); आधिकारिक-भाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: मिज़ो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "th", slug: "thai", en_name: "Thai", hi_name: "थाई", /* 05-Sep: अगली-8 खेप का आठवाँ व अंतिम — थाई-लिपि, थाईलैंड */
    next: 'आगे का रास्ता: थाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "njo", slug: "aonaga", en_name: "Ao Naga", hi_name: "आओ नागा", /* 05-Oct: उत्तर-पूर्व-खेप-11 (वास्तविक-अंतिम) — नागालैंड (मोकोकचुंग), Tibeto-Burman Central-Naga; nagatranslate.in genuine pronoun-तालिका पुष्ट (Ni/Na/Pa/Asenok); उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: आओ नागा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "pl", slug: "polish", en_name: "Polish", hi_name: "पोलिश", /* 07-Sep: पूर्वी-यूरोप-खेप का पहला — Latin, Poland-corridor (Founder-चयन) */
    next: 'आगे का रास्ता: पोलिश की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "njh", slug: "lothanaga", en_name: "Lotha Naga", hi_name: "लोथा नागा", /* 05-Oct: उत्तर-पूर्व-खेप-12 (वास्तविक-अंतिम) — नागालैंड (वोखा), Tibeto-Burman Central-Naga; Wikipedia genuine pronoun-तालिका पुष्ट (a/ni/ombo); उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: लोथा नागा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "uk", slug: "ukrainian", en_name: "Ukrainian", hi_name: "यूक्रेनी", /* 07-Sep: पूर्वी-यूरोप-खेप का दूसरा — Cyrillic, Ukraine-corridor */
    next: 'आगे का रास्ता: यूक्रेनी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "dzo", slug: "dzongkha", en_name: "Dzongkha", hi_name: "ज़ोंगखा", /* 05-Oct: सार्क-खेप-1 — भूटान, Tibeto-Burman Bodish; Swarthmore academic genuine pronoun-तालिका पुष्ट; राष्ट्रभाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: ज़ोंगखा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "hr", slug: "croatian", en_name: "Croatian", hi_name: "क्रोएशियाई", /* 07-Sep: पूर्वी-यूरोप-खेप का तीसरा — Latin, Croatia-corridor */
    next: 'आगे का रास्ता: क्रोएशियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "brh", slug: "brahui", en_name: "Brahui", hi_name: "ब्राहुई", /* 05-Oct: सार्क-खेप-2 — पाकिस्तान (बलूचिस्तान), North Dravidian; CIIL/Iranica कुरुख़-chain; सबसे बड़ी North-Dravidian भाषा (27.8 लाख); ⚠️ सीमित-विश्वसनीयता */
    next: '⚠️ यह कोर्स कुरुख़-निकटता पर आधारित है (ऊपर नोट देखें) — स्थानीय वक्ता से पुष्टि अनिवार्य। ' + KKB2_SAFE },  { code: "sr", slug: "serbian", en_name: "Serbian", hi_name: "सर्बियाई", /* 07-Sep: पूर्वी-यूरोप-खेप का चौथा — Cyrillic, Serbia-corridor */
    next: 'आगे का रास्ता: सर्बियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "dv", slug: "dhivehi", en_name: "Dhivehi", hi_name: "धिवेही", /* 05-Oct: सार्क-खेप-3 — मालदीव, Indo-Aryan Sinhalese-Maldivian; Wikivoyage phrasebook genuine pronoun पुष्ट; राष्ट्रभाषा; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: धिवेही की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "lt", slug: "lithuanian", en_name: "Lithuanian", hi_name: "लिथुआनियाई", /* 07-Sep: पूर्वी-यूरोप-खेप का पाँचवाँ — Latin, Lithuania-corridor */
    next: 'आगे का रास्ता: लिथुआनियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "new", slug: "newari", en_name: "Newari", hi_name: "नेवारी (Nepal Bhasa)", /* 05-Oct: सार्क-खेप-4 — नेपाल (काठमांडू-घाटी), Tibeto-Burman Newaric; easynepalityping.com समृद्ध genuine pronoun पुष्ट; देवनागरी-लिपि में ही लिखी जाती है; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: नेवारी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "sk", slug: "slovak", en_name: "Slovak", hi_name: "स्लोवाक", /* 07-Sep: पूर्वी-यूरोप-खेप का छठा — Latin, Slovakia-corridor */
    next: 'आगे का रास्ता: स्लोवाक की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "ccp", slug: "chakma", en_name: "Chakma", hi_name: "चकमा", /* 05-Oct: सार्क-खेप-5 (अंतिम) — बांग्लादेश-भारत-म्यांमार, Indo-Aryan; dimasathairili.com genuine pronoun पुष्ट; त्रिपुरा आधिकारिक-मान्यता; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: चकमा की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "fi", slug: "finnish", en_name: "Finnish", hi_name: "फ़िनिश", /* 08-Sep: उत्तर-यूरोप का पहला — Latin (ä/ö), Finland-corridor */
    next: 'आगे का रास्ता: फ़िनिश की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "zum", slug: "kumzari", en_name: "Kumzari", hi_name: "कुमज़ारी", /* 05-Oct: ख़ाड़ी-खेप-1 — ओमान (Musandam), Southwestern Iranian; UF PhD-थीसिस पूर्ण pronoun-तालिका पुष्ट; अरब-प्रायद्वीप की एकमात्र Iranian-भाषा; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कुमज़ारी की कोई विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "ka", slug: "georgian", en_name: "Georgian", hi_name: "जॉर्जियाई", /* 08-Sep: Georgian script (non-Latin), Georgia-corridor — पूर्वी-यूरोप/काकेशस-खेप */
    next: 'आगे का रास्ता: जॉर्जियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "afb", slug: "gulf-arabic", en_name: "Gulf Arabic", hi_name: "ख़ाड़ी-अरबी", /* 05-Oct: ख़ाड़ी-खेप-2 (अंतिम) — पूरे GCC, Semitic Arabic; phrasebook genuine pronoun-तालिका पुष्ट; भारत से सबसे ज़्यादा-प्रवासी जहाँ जाते हैं; उच्च-मध्यम विश्वसनीयता */
    next: 'आगे का रास्ता: ख़ाड़ी-अरबी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "bo", slug: "tibetan", en_name: "Tibetan", hi_name: "तिब्बती", /* 10-Sep: L2 भाषा — तिब्बत, तिब्बती-लिपि space-रहित (ROT-प्रतिबंधित); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: तिब्बती की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "wuu", slug: "wu-chinese", en_name: "Wu Chinese", hi_name: "वू-चीनी", /* 05-Oct: चीन-खेप-1 — शंघाई-झेजियांग, Sinitic Wu; Wikivoyage genuine pronoun-तालिका पुष्ट; 8 करोड़ बोलने वाले; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: वू-चीनी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },  { code: "ceb", slug: "cebuano", en_name: "Cebuano", hi_name: "सिबुआनो", /* 10-Sep: L2 भाषा — फ़िलीपींस-विसाया, Latin-plain; merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: सिबुआनो की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },

  { code: "zha", slug: "zhuang", en_name: "Zhuang", hi_name: "ज़ुआंग", /* 05-Oct: चीन-खेप-2 — Guangxi, Tai-Kadai; academic-paper genuine pronoun पुष्ट; चीन की सबसे बड़ी अल्पसंख्यक-भाषा; सह-आधिकारिक-दर्जा; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ज़ुआंग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hak", slug: "hakka", en_name: "Hakka", hi_name: "हक्का", /* 05-Oct: चीन-खेप-3 (अंतिम) — चीन-ताइवान, Sinitic; blog genuine pronoun-तालिका पुष्ट; ताइवान आधिकारिक-भाषा; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: हक्का की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gan", slug: "gan", en_name: "Gan", hi_name: "गान", /* 05-Oct: चीन-खेप-4 (अंतिम) — Jiangxi, Sinitic; everyalphabet.com genuine pronoun-तालिका पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: गान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cv", slug: "chuvash", en_name: "Chuvash", hi_name: "चुवाश", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चुवाश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ba", slug: "bashkir", en_name: "Bashkir", hi_name: "बश्कीर", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बश्कीर की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sah", slug: "yakut", en_name: "Yakut", hi_name: "याकूत", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: याकूत की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bua", slug: "buryat", en_name: "Buryat", hi_name: "बुर्यात", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बुर्यात की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "udm", slug: "udmurt", en_name: "Udmurt", hi_name: "उदमुर्त", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: उदमुर्त की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mhr", slug: "mari", en_name: "Mari", hi_name: "मारी", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मारी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "myv", slug: "erzya", en_name: "Erzya", hi_name: "मोर्डविन-एर्ज़्या", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मोर्डविन-एर्ज़्या की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "koi", slug: "komipermyak", en_name: "Komi-Permyak", hi_name: "कोमी-पर्म्याक", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कोमी-पर्म्याक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "inh", slug: "ingush", en_name: "Ingush", hi_name: "इंगुश", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: इंगुश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ava", slug: "avar", en_name: "Avar", hi_name: "अवार", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अवार की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "os", slug: "ossetian", en_name: "Ossetian", hi_name: "ओसेतियाई", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ओसेतियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tyv", slug: "tuvan", en_name: "Tuvan", hi_name: "तुवान", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तुवान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kjh", slug: "khakas", en_name: "Khakas", hi_name: "खाकास", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: खाकास की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "xal", slug: "kalmyk", en_name: "Kalmyk", hi_name: "कल्मिक", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कल्मिक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yrk", slug: "nenets", en_name: "Nenets", hi_name: "नेनेट्स", /* 06-Oct: रूस-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: नेनेट्स की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "jje", slug: "jeju", en_name: "Jeju", hi_name: "जेजू", /* 06-Oct: कोरियाई-खेप-1 — दक्षिण-कोरिया (जेजू-द्वीप), Koreanic; Wikiwand+JSTOR genuine pronoun पुष्ट; UNESCO critically-endangered; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: जेजू की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ryu", slug: "okinawan", en_name: "Okinawan", hi_name: "ओकिनावन", /* 06-Oct: जापान-खेप-1 — Okinawa द्वीप, Japonic Ryukyuan; University of Ryukyus genuine pronoun पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ओकिनावन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ryn", slug: "amami", en_name: "Amami", hi_name: "अमामी", /* 06-Oct: जापान-खेप-2 — Amami द्वीप-समूह, Japonic Ryukyuan; academic-paper genuine pronoun पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अमामी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mvi", slug: "miyako", en_name: "Miyako", hi_name: "मियाको", /* 06-Oct: जापान-खेप-3 — Miyako द्वीप, Japonic Ryukyuan; academic-paper genuine pronoun पुष्ट; severely-endangered; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मियाको की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rys", slug: "yaeyama", en_name: "Yaeyama", hi_name: "याएयामा", /* 06-Oct: जापान-खेप-4 — Yaeyama द्वीप-समूह, Japonic Ryukyuan; academic-paper genuine pronoun पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: याएयामा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yoi", slug: "yonaguni", en_name: "Yonaguni", hi_name: "योनागुनी", /* 06-Oct: जापान-खेप-5 — Yonaguni द्वीप, Japonic Ryukyuan; academic-paper genuine pronoun पुष्ट; सिर्फ़ ~400 बोलने वाले; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: योनागुनी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ain", slug: "ainu", en_name: "Ainu", hi_name: "ऐनू", /* 06-Oct: जापान-खेप-6 (अंतिम) — Hokkaido, genuinely-अलग भाषा-परिवार/language-isolate; Wikisource academic-dictionary genuine pronoun पुष्ट; UNESCO nearly-extinct; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ऐनू की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ilo", slug: "ilocano", en_name: "Ilocano", hi_name: "इलोकानो", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: इलोकानो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hil", slug: "hiligaynon", en_name: "Hiligaynon", hi_name: "हिलिगाय्नोन", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: हिलिगाय्नोन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "war", slug: "waray", en_name: "Waray", hi_name: "वारे", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: वारे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bcl", slug: "bikol", en_name: "Bikol", hi_name: "बिकोल", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बिकोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pam", slug: "kapampangan", en_name: "Kapampangan", hi_name: "कपम्पांगान", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कपम्पांगान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pag", slug: "pangasinan", en_name: "Pangasinan", hi_name: "पांगासिनान", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पांगासिनान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mrw", slug: "maranao", en_name: "Maranao", hi_name: "मरानाओ", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मरानाओ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mdh", slug: "maguindanao", en_name: "Maguindanao", hi_name: "मागिनदानाओ", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मागिनदानाओ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tsg", slug: "tausug", en_name: "Tausug", hi_name: "ताउसूग", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ताउसूग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "krj", slug: "kinaraya", en_name: "Kinaraya", hi_name: "किनारे-आ", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: किनारे-आ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ban", slug: "balinese", en_name: "Balinese", hi_name: "बालीनीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बालीनीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "min", slug: "minangkabau", en_name: "Minangkabau", hi_name: "मिनांगकाबाउ", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मिनांगकाबाउ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mad", slug: "madurese", en_name: "Madurese", hi_name: "मदुरीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मदुरीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ace", slug: "acehnese", en_name: "Acehnese", hi_name: "आचेनीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: आचेनीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bbc", slug: "tobabatak", en_name: "Toba Batak", hi_name: "तोबा-बाटक", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तोबा-बाटक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bug", slug: "buginese", en_name: "Buginese", hi_name: "बुगीनीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बुगीनीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bjn", slug: "banjarese", en_name: "Banjarese", hi_name: "बांजारीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बांजारीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mak", slug: "makassarese", en_name: "Makassarese", hi_name: "मकासारीज़", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मकासारीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "btx", slug: "batakkaro", en_name: "Batak Karo", hi_name: "बाटक-कारो", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बाटक-कारो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "iba", slug: "iban", en_name: "Iban", hi_name: "इबान", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: इबान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dtp", slug: "kadazandusun", en_name: "Kadazan-Dusun", hi_name: "कादाज़ान-दुसुन", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कादाज़ान-दुसुन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nod", slug: "northernthai", en_name: "Northern Thai", hi_name: "उत्तरी-थाई", /* 06-Oct: द्वीप-समूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: उत्तरी-थाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "njm", slug: "angami", en_name: "Angami", hi_name: "अंगामी", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अंगामी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nkh", slug: "chakhesang", en_name: "Chakhesang", hi_name: "चाखेसांग", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चाखेसांग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nbe", slug: "konyak", en_name: "Konyak", hi_name: "कोन्याक", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कोन्याक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nbc", slug: "chang", en_name: "Chang", hi_name: "चांग", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चांग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nsm", slug: "sumi", en_name: "Sumi", hi_name: "सूमी", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सूमी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ksw", slug: "karen", en_name: "Karen", hi_name: "करेन", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: करेन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "che", slug: "chechen", en_name: "Chechen", hi_name: "चेचन", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चेचन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dar", slug: "dargwa", en_name: "Dargwa", hi_name: "दर्गिन", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: दर्गिन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lez", slug: "lezgian", en_name: "Lezgian", hi_name: "लेज़गी", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लेज़गी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kbd", slug: "kabardian", en_name: "Kabardian", hi_name: "काबर्दीनो", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: काबर्दीनो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tuk", slug: "turkmen", en_name: "Turkmen", hi_name: "तुर्कमेन", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तुर्कमेन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tet", slug: "tetum", en_name: "Tetum", hi_name: "तेतुम", /* 06-Oct: उत्तर-पूर्व-महाखेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तेतुम की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tcz", slug: "thadou", en_name: "Thadou", hi_name: "थाडौ", /* 06-Oct: उत्तर-पूर्व-खेप-2 — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: थाडौ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pck", slug: "paite", en_name: "Paite", hi_name: "पाइते", /* 06-Oct: उत्तर-पूर्व-खेप-2 — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पाइते की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "njz", slug: "nyishi", en_name: "Nyishi", hi_name: "न्यिशी", /* 06-Oct: उत्तर-पूर्व-खेप-2 — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: न्यिशी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "apt", slug: "apatani", en_name: "Apatani", hi_name: "अपातानी", /* 06-Oct: उत्तर-पूर्व-खेप-2 — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अपातानी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mtq", slug: "muong", en_name: "Muong", hi_name: "म्योंग", /* 06-Oct: उत्तर-पूर्व-खेप-2 — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: म्योंग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "swb", slug: "comorian", en_name: "Comorian", hi_name: "कोमोरियन", /* 06-Oct: हिंद-महासागर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कोमोरियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "crs", slug: "seselwa", en_name: "Seselwa", hi_name: "सेशेल्वा (Seychellois Creole)", /* 06-Oct: हिंद-महासागर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सेशेल्वा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rcf", slug: "reunioncreole", en_name: "Reunion Creole", hi_name: "रीयूनियन-क्रियोल", /* 06-Oct: हिंद-महासागर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: रीयूनियन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "oon", slug: "onge", en_name: "Onge", hi_name: "ओंगे", /* 06-Oct: बंगाल-की-खाड़ी-खेप — genuine pronoun-स्रोत पुष्ट; अत्यंत-लुप्तप्राय */
    next: 'आगे का रास्ता: ओंगे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tpi", slug: "tokpisin", en_name: "Tok Pisin", hi_name: "टोक-पिसिन", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: टोक-पिसिन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fij", slug: "fijian", en_name: "Fijian", hi_name: "फिजियन", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: फिजियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bis", slug: "bislama", en_name: "Bislama", hi_name: "बिस्लामा", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बिस्लामा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pis", slug: "pijin", en_name: "Pijin", hi_name: "पिजिन", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पिजिन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mri", slug: "maori", en_name: "Maori", hi_name: "माओरी", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: माओरी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "smo", slug: "samoan", en_name: "Samoan", hi_name: "सामोअन", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सामोअन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ton", slug: "tongan", en_name: "Tongan", hi_name: "टोंगन", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: टोंगन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hmo", slug: "hirimotu", en_name: "Hiri Motu", hi_name: "हिरी-मोटू", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: हिरी-मोटू की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pjt", slug: "pitjantjatjara", en_name: "Pitjantjatjara", hi_name: "पित्यान्त्यात्यारा", /* 06-Oct: ऑस्ट्रेलिया-प्रशांत-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पित्यान्त्यात्यारा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dan", slug: "danish", en_name: "Danish", hi_name: "डैनिश", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: डैनिश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nob", slug: "norwegian", en_name: "Norwegian", hi_name: "नॉर्वेजियन", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: नॉर्वेजियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "isl", slug: "icelandic", en_name: "Icelandic", hi_name: "आइसलैंडिक", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: आइसलैंडिक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "slv", slug: "slovenian", en_name: "Slovenian", hi_name: "स्लोवेनियाई", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: स्लोवेनियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "est", slug: "estonian", en_name: "Estonian", hi_name: "एस्टोनियाई", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: एस्टोनियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lav", slug: "latvian", en_name: "Latvian", hi_name: "लात्वियाई", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लात्वियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sqi", slug: "albanian", en_name: "Albanian", hi_name: "अल्बानियाई", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अल्बानियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mkd", slug: "macedonian", en_name: "Macedonian", hi_name: "मैसीडोनियाई", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मैसीडोनियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ltz", slug: "luxembourgish", en_name: "Luxembourgish", hi_name: "लक्ज़मबर्गिश", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लक्ज़मबर्गिश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cat", slug: "catalan", en_name: "Catalan", hi_name: "कातालान", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कातालान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "eus", slug: "basque", en_name: "Basque", hi_name: "बास्क", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बास्क की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "glg", slug: "galician", en_name: "Galician", hi_name: "गैलिशियन", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: गैलिशियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cym", slug: "welsh", en_name: "Welsh", hi_name: "वेल्श", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: वेल्श की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gle", slug: "irish", en_name: "Irish", hi_name: "आइरिश", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: आइरिश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gla", slug: "scottishgaelic", en_name: "Scottish Gaelic", hi_name: "स्कॉटिश-गेलिक", /* 06-Oct: यूरोप-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: स्कॉटिश-गेलिक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fao", slug: "faroese", en_name: "Faroese", hi_name: "फ़रोईज़", /* 06-Oct: आर्कटिक-यूरेशिया-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: फ़रोईज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kal", slug: "greenlandic", en_name: "Greenlandic", hi_name: "ग्रीनलैंडिक", /* 06-Oct: आर्कटिक-यूरेशिया-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ग्रीनलैंडिक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sme", slug: "northernsami", en_name: "Northern Sami", hi_name: "उत्तरी-सामी", /* 06-Oct: आर्कटिक-यूरेशिया-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: उत्तरी-सामी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "niv", slug: "nivkh", en_name: "Nivkh", hi_name: "निव्ख", /* 06-Oct: आर्कटिक-यूरेशिया-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: निव्ख की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nav", slug: "navajo", en_name: "Navajo", hi_name: "नावाहो", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: नावाहो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "crk", slug: "cree", en_name: "Cree", hi_name: "क्री", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: क्री की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "iku", slug: "inuktitut", en_name: "Inuktitut", hi_name: "इनुक्तितुत", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: इनुक्तितुत की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "oji", slug: "ojibwe", en_name: "Ojibwe", hi_name: "ओजिब्वे", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ओजिब्वे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nah", slug: "nahuatl", en_name: "Nahuatl", hi_name: "नाहुआतल", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: नाहुआतल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "haw", slug: "hawaiian", en_name: "Hawaiian", hi_name: "हवाईयन", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: हवाईयन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lkt", slug: "lakota", en_name: "Lakota", hi_name: "लाकोटा", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लाकोटा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "chr", slug: "cherokee", en_name: "Cherokee", hi_name: "चेरोकी", /* 06-Oct: उत्तरी-अमेरिका-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चेरोकी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "guc", slug: "wayuunaiki", en_name: "Wayuunaiki", hi_name: "वायुनाइकी", /* 06-Oct: दक्षिण-अमेरिका-महासागरीय-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: वायुनाइकी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rap", slug: "rapanui", en_name: "Rapa Nui", hi_name: "रापा-नुई", /* 06-Oct: दक्षिण-अमेरिका-महासागरीय-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: रापा-नुई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "srn", slug: "srananTongo", en_name: "Sranan Tongo", hi_name: "स्रानान-टोंगो", /* 06-Oct: दक्षिण-अमेरिका-महासागरीय-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: स्रानान-टोंगो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "acu", slug: "achuarshiwiar", en_name: "Achuar-Shiwiar", hi_name: "अचुआर-शिविआर", /* 06-Oct: दक्षिण-अमेरिका-दूसरा-दौर — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: अचुआर-शिविआर की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gyn", slug: "guyanesecreole", en_name: "Guyanese Creole", hi_name: "गुयानीज़-क्रियोल", /* 06-Oct: दक्षिण-अमेरिका-दूसरा-दौर — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: गुयानीज़-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fgc", slug: "frenchguianesecreole", en_name: "French Guianese Creole", hi_name: "फ़्रेंच-गयानीज़-क्रियोल", /* 06-Oct: दक्षिण-अमेरिका-दूसरा-दौर — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: फ़्रेंच-गयानीज़-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "trn", slug: "trinidadiancreole", en_name: "Trinidadian Creole", hi_name: "त्रिनिदादियन-क्रियोल", /* 06-Oct: दक्षिण-अमेरिका-दूसरा-दौर — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: त्रिनिदादियन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "jiv", slug: "shuar", en_name: "Shuar", hi_name: "शुआर", /* 06-Oct: दक्षिण-अमेरिका-तीसरा-गहन-दौर — eumed.net academic-paper (Pellizzaro-Gramática-आधारित) genuine pronoun पूर्ण-पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: शुआर की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kea", slug: "capeverdean", en_name: "Cape Verdean Creole", hi_name: "केप-वर्देयन-क्रियोल", /* 06-Oct: अटलांटिक-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: केप-वर्देयन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pap", slug: "papiamento", en_name: "Papiamento", hi_name: "पापियामेंटो", /* 06-Oct: अटलांटिक-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पापियामेंटो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "acf", slug: "saintlucian", en_name: "Saint Lucian Creole", hi_name: "सेंट-लूसियन-क्रियोल", /* 06-Oct: अटलांटिक-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सेंट-लूसियन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cri", slug: "forro", en_name: "Forro", hi_name: "फ़ोर्रो", /* 06-Oct: अटलांटिक-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: फ़ोर्रो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bjs", slug: "bajan", en_name: "Bajan Creole", hi_name: "बाजन-क्रियोल", /* 06-Oct: अटलांटिक-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बाजन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ch", slug: "chamorro", en_name: "Chamorro", hi_name: "चामोरो", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चामोरो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pau", slug: "palauan", en_name: "Palauan", hi_name: "पलाऊआन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पलाऊआन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mh", slug: "marshallese", en_name: "Marshallese", hi_name: "मार्शलीज़", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मार्शलीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "chk", slug: "chuukese", en_name: "Chuukese", hi_name: "चुउकीज़", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: चुउकीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "pon", slug: "pohnpeian", en_name: "Pohnpeian", hi_name: "पोन्पेइयन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: पोन्पेइयन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kos", slug: "kosraean", en_name: "Kosraean", hi_name: "कोस्राएन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कोस्राएन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yap", slug: "yapese", en_name: "Yapese", hi_name: "यापीज़", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: यापीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gil", slug: "gilbertese", en_name: "Gilbertese", hi_name: "गिल्बर्टीज़", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: गिल्बर्टीज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ty", slug: "tahitian", en_name: "Tahitian", hi_name: "ताहितियन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ताहितियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rar", slug: "cookislandsmaori", en_name: "Cook Islands Maori", hi_name: "कुक-आइलैंड्स-माओरी", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: कुक-आइलैंड्स-माओरी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "niu", slug: "niuean", en_name: "Niuean", hi_name: "नीयुएन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: नीयुएन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tvl", slug: "tuvaluan", en_name: "Tuvaluan", hi_name: "तुवालुअन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तुवालुअन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tkl", slug: "tokelauan", en_name: "Tokelauan", hi_name: "तोकेलाउअन", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तोकेलाउअन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dhv", slug: "drehu", en_name: "Drehu", hi_name: "द्रेहु", /* 06-Oct: प्रशांत-महासागर-द्वीपसमूह-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: द्रेहु की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "grn", slug: "grenadian", en_name: "Grenadian Creole", hi_name: "ग्रेनेडियन-क्रियोल", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ग्रेनेडियन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dcf", slug: "dominicancreole", en_name: "Dominican Creole French", hi_name: "डोमिनिकन-क्रियोल", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: डोमिनिकन-क्रियोल की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "srm", slug: "saramaccan", en_name: "Saramaccan", hi_name: "सारामाक्कान", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सारामाक्कान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "djk", slug: "ndyuka", en_name: "Ndyuka", hi_name: "न्दियुका", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: न्दियुका की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tdx", slug: "tandroy", en_name: "Tandroy", hi_name: "तान्द्रोय", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: तान्द्रोय की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bhr", slug: "bara", en_name: "Bara", hi_name: "बारा", /* 06-Oct: कैरिबियन-शेष+मेडागास्कर-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बारा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ln", slug: "lingala", en_name: "Lingala", hi_name: "लिंगाला", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लिंगाला की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kg", slug: "kikongo", en_name: "Kikongo", hi_name: "किकोंगो", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: किकोंगो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fuv", slug: "fulfulde", en_name: "Fulfulde", hi_name: "फुलफुल्दे", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: फुलफुल्दे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tn", slug: "tswana", en_name: "Tswana", hi_name: "त्स्वाना", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: त्स्वाना की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bem", slug: "bemba", en_name: "Bemba", hi_name: "बेम्बा", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: बेम्बा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ts", slug: "tsonga", en_name: "Tsonga", hi_name: "त्सोंगा", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: त्सोंगा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mos", slug: "moore", en_name: "Moore", hi_name: "मोसी", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मोसी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ee", slug: "ewe", en_name: "Ewe", hi_name: "ईवे", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: ईवे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kri", slug: "krio", en_name: "Krio", hi_name: "क्रियो", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: क्रियो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nd", slug: "ndebele", en_name: "Ndebele", hi_name: "उत्तरी-न्देबेले", /* 06-Oct: अफ्रीका-शेष-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: उत्तरी-न्देबेले की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sqt", slug: "soqotri", en_name: "Soqotri", hi_name: "सोकोत्री", /* 06-Oct: ख़ाड़ी-क्षेत्र-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: सोकोत्री की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gdq", slug: "mehri", en_name: "Mehri", hi_name: "मेह्री", /* 06-Oct: ख़ाड़ी-क्षेत्र-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मेह्री की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "aii", slug: "assyrian", en_name: "Assyrian", hi_name: "असीरियाई", /* 06-Oct: ख़ाड़ी-क्षेत्र-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: असीरियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  
  { code: "haz", slug: "hazaragi", en_name: "Hazaragi", hi_name: "हज़ारगी", /* 06-Oct: ख़ाड़ी-क्षेत्र-खेप — genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: हज़ारगी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "shv", slug: "shehri", en_name: "Shehri", hi_name: "शेह्री", /* 06-Oct: गहन-ईमानदार-gap-खेप — घंटों की academic-खोज से genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: शेह्री की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mid", slug: "mandaic", en_name: "Mandaic", hi_name: "मंडाइक", /* 06-Oct: गहन-ईमानदार-gap-खेप — घंटों की academic-खोज से genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: मंडाइक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lrc", slug: "luri", en_name: "Luri", hi_name: "लूरी", /* 06-Oct: गहन-ईमानदार-gap-खेप — घंटों की academic-खोज से genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: लूरी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rmt", slug: "domari", en_name: "Domari", hi_name: "डोमारी", /* 06-Oct: गहन-ईमानदार-gap-खेप — घंटों की academic-खोज से genuine pronoun-स्रोत पुष्ट; उच्च-विश्वसनीयता */
    next: 'आगे का रास्ता: डोमारी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ve", slug: "venda", en_name: "Venda", hi_name: "वेन्दा", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: वेन्दा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ss", slug: "swati", en_name: "Swati", hi_name: "स्वाती", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: स्वाती की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "luo", slug: "dholuo", en_name: "Dholuo", hi_name: "ढोलुओ", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: ढोलुओ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "din", slug: "dinka", en_name: "Dinka", hi_name: "डिंका", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: डिंका की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ki", slug: "kikuyu", en_name: "Kikuyu", hi_name: "किकुयु", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: किकुयु की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "zgh", slug: "tamazight", en_name: "Tamazight", hi_name: "तमाज़ीग़्त", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: तमाज़ीग़्त की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tig", slug: "tigre", en_name: "Tigre", hi_name: "तिग्रे", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: तिग्रे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "na", slug: "nauruan", en_name: "Nauruan", hi_name: "नाउरुअन", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: नाउरुअन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fud", slug: "futunan", en_name: "East Futunan", hi_name: "पूर्वी-फुतुनन", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: पूर्वी-फुतुनन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "wls", slug: "wallisian", en_name: "Wallisian", hi_name: "वालिसियन", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: वालिसियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "skg", slug: "sakalava", en_name: "Southern Sakalava", hi_name: "दक्षिणी-साकालावा", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: दक्षिणी-साकालावा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bzc", slug: "betsimisaraka", en_name: "Southern Betsimisaraka", hi_name: "दक्षिणी-बेत्सिमिसारका", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: दक्षिणी-बेत्सिमिसारका की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "eo", slug: "esperanto", en_name: "Esperanto", hi_name: "एस्पेरांतो", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: एस्पेरांतो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "la", slug: "latin", en_name: "Latin", hi_name: "लैटिन", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: लैटिन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yi", slug: "yiddish", en_name: "Yiddish", hi_name: "यिद्दिश", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: यिद्दिश की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "br", slug: "breton", en_name: "Breton", hi_name: "ब्रेटन", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: ब्रेटन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "co", slug: "corsican", en_name: "Corsican", hi_name: "कोर्सिकन", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: कोर्सिकन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fy", slug: "frisian", en_name: "Frisian", hi_name: "फ़्रिसियाई", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: फ़्रिसियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "scn", slug: "sicilian", en_name: "Sicilian", hi_name: "सिसिलियाई", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सिसिलियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lij", slug: "ligurian", en_name: "Ligurian", hi_name: "लिगुरियाई", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: लिगुरियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lmo", slug: "lombard", en_name: "Lombard", hi_name: "लोम्बार्ड", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: लोम्बार्ड की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "szl", slug: "silesian", en_name: "Silesian", hi_name: "सिलेसियाई", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सिलेसियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "vec", slug: "venetian", en_name: "Venetian", hi_name: "वेनेशियाई", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: वेनेशियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dov", slug: "dombe", en_name: "Dombe", hi_name: "डोम्बे", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: डोम्बे की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hmn", slug: "hmong", en_name: "Hmong", hi_name: "ह्मोंग", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: ह्मोंग की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kl", slug: "kalaallisut", en_name: "Kalaallisut", hi_name: "कालालिसुत", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: कालालिसुत की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gv", slug: "manx", en_name: "Manx", hi_name: "मैंक्स", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: मैंक्स की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "oc", slug: "occitan", en_name: "Occitan", hi_name: "ओक्सिताँ", /* 06-Oct Google-मिलान-56-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: ओक्सिताँ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bs", slug: "bosnian", en_name: "Bosnian", hi_name: "बोस्नियाई", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: बोस्नियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fur", slug: "friulian", en_name: "Friulian", hi_name: "फ़्रीयुलियाई", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: फ़्रीयुलियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "aa", slug: "afar", en_name: "Afar", hi_name: "अफ़ार", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: अफ़ार की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "fon", slug: "fon", en_name: "Fon", hi_name: "फ़ोन", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: फ़ोन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "gaa", slug: "ga", en_name: "Ga", hi_name: "गा", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: गा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sus", slug: "susu", en_name: "Susu", hi_name: "सुसु", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सुसु की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kr", slug: "kanuri", en_name: "Kanuri", hi_name: "कानुरी", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: कानुरी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ktu", slug: "kituba", en_name: "Kituba", hi_name: "किटुबा", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: किटुबा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cgg", slug: "kiga", en_name: "Kiga", hi_name: "किगा", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: किगा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kv", slug: "komi", en_name: "Komi", hi_name: "कोमी", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: कोमी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ltg", slug: "latgalian", en_name: "Latgalian", hi_name: "लात्गालियाई", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: लात्गालियाई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rn", slug: "rundi", en_name: "Rundi", hi_name: "रुंडी", /* 06-Oct Google-मिलान-56-खेप बैच-2 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: रुंडी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ab", slug: "abkhaz", en_name: "Abkhaz", hi_name: "अबख़ाज़", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: अबख़ाज़ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ach", slug: "acholi", en_name: "Acholi", hi_name: "अचोली", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: अचोली की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "alz", slug: "alur", en_name: "Alur", hi_name: "अलुर", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: अलुर की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bew", slug: "betawi", en_name: "Betawi", hi_name: "बेतावी", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: बेतावी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "crh", slug: "crimeantatar", en_name: "Crimean Tatar", hi_name: "क्रीमियाई-तातार", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: क्रीमियाई-तातार की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "cnh", slug: "hakhachin", en_name: "Hakha Chin", hi_name: "हाखा-चिन", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: हाखा-चिन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nso", slug: "sepedi", en_name: "Sepedi", hi_name: "सेपेदी", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सेपेदी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "st", slug: "sesotho", en_name: "Sesotho", hi_name: "सेसोथो", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सेसोथो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kac", slug: "jingpo", en_name: "Jingpo", hi_name: "जिंगपो", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: जिंगपो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tum", slug: "tumbuka", en_name: "Tumbuka", hi_name: "तुंबुका", /* 06-Oct Google-मिलान-56-खेप बैच-3 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: तुंबुका की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "dyu", slug: "dyula", en_name: "Dyula", hi_name: "दयुला", /* 06-Oct Google-मिलान-56-खेप बैच-4 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: दयुला की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "zai", slug: "zapotec", en_name: "Zapotec", hi_name: "ज़ापोतेक", /* 06-Oct Google-मिलान-56-खेप बैच-4 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: ज़ापोतेक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "sg", slug: "sango", en_name: "Sango", hi_name: "सांगो", /* 06-Oct Google-मिलान-56-खेप बैच-4 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: सांगो की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "rom", slug: "romani", en_name: "Romani", hi_name: "रोमानी", /* 06-Oct Google-मिलान-56-खेप बैच-4 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: रोमानी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "kek", slug: "qeqchi", en_name: "Qeqchi", hi_name: "क़ेक़्ची", /* 06-Oct Google-मिलान-56-खेप बैच-4 — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: क़ेक़्ची की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bci", slug: "baoule", en_name: "Baoule", hi_name: "बाउलेई", /* 06-Oct Google-मिलान-56-खेप बैच-5 — गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: बाउलेई की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "bts", slug: "batsimalungun", en_name: "Batak Simalungun", hi_name: "बतक-सिमालुंगुन", /* 06-Oct Google-मिलान-56-खेप बैच-5 — गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: बतक-सिमालुंगुन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "hrx", slug: "hunsrik", en_name: "Hunsrik", hi_name: "हुन्सरिक", /* 06-Oct Google-मिलान-56-खेप बैच-5 — गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: हुन्सरिक की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nqo", slug: "nko", en_name: "NKo", hi_name: "एनको", /* 06-Oct Google-मिलान-56-खेप बैच-5 — गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: एनको की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lua", slug: "tshiluba", en_name: "Tshiluba", hi_name: "त्शिलुबा", /* 06-Oct Google-मिलान-56-खेप बैच-5 — गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: त्शिलुबा की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "jam", slug: "jamaicanpatois", en_name: "Jamaican Patois", hi_name: "जमैकन-पातुआ", /* 06-Oct Google-मिलान-56-खेप बैच-6 — Founder-आदेश पर गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: जमैकन-पातुआ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nus", slug: "nuer", en_name: "Nuer", hi_name: "नुएर", /* 06-Oct Google-मिलान-56-खेप बैच-6 — Founder-आदेश पर गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: नुएर की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ndc", slug: "ndau", en_name: "Ndau", hi_name: "न्दाऊ", /* 06-Oct Google-मिलान-56-खेप बैच-6 — Founder-आदेश पर गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: न्दाऊ की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "shn", slug: "shan", en_name: "Shan", hi_name: "शान", /* 06-Oct Google-मिलान-56-खेप बैच-6 — Founder-आदेश पर गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: शान की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "li", slug: "limburgish", en_name: "Limburgish", hi_name: "लिम्बुर्गी", /* 06-Oct Google-मिलान-56-खेप बैच-6 — Founder-आदेश पर गहनतम-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: लिम्बुर्गी की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tiv", slug: "tiv", en_name: "Tiv", hi_name: "तिव", /* 06-Oct Google-मिलान-56-खेप — अंतिम-जोड़ी — Founder-आदेश पर पूर्ण-मुहिम-समापन; genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: तिव की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mam", slug: "mam", en_name: "Mam", hi_name: "माम", /* 06-Oct Google-मिलान-56-खेप — अंतिम-जोड़ी — Founder-आदेश पर पूर्ण-मुहिम-समापन; genuine pronoun-स्रोत पुष्ट; Google-Translate में था, ACS में deferred था */
    next: 'आगे का रास्ता: माम की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "ady", slug: "circassian", en_name: "Circassian", hi_name: "सर्कासियन", /* 06-Oct: जबरदस्त-प्रयास-खेप — घंटों की गहन-विश्व-व्यापी-खोज से genuine pronoun-स्रोत पुष्ट; पहले deferred था */
    next: 'आगे का रास्ता: सर्कासियन की अलग विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "jv", slug: "javanese", en_name: "Javanese", hi_name: "जावानीज़", /* 10-Sep: L2 भाषा — जावा द्वीप, Latin-plain; merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: जावानीज़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "km", slug: "khmer", en_name: "Khmer", hi_name: "खमेर", /* 10-Sep: L2 भाषा — कंबोडिया, खमेर-लिपि space-रहित (ROT-प्रतिबंधित; manual dual-column); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: खमेर की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "lo", slug: "lao", en_name: "Lao", hi_name: "लाओ", /* 10-Sep: L2 भाषा — लाओस, लाओ-लिपि space-रहित (ROT-प्रतिबंधित; manual dual-column); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: लाओ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "mn", slug: "mongolian", en_name: "Mongolian", hi_name: "मंगोलियाई", /* 10-Sep: L2 भाषा — मंगोलिया, Cyrillic-native; merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: मंगोलियाई की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "my", slug: "burmese", en_name: "Burmese", hi_name: "बर्मी", /* 10-Sep: L2 भाषा — म्यांमार, बर्मी-लिपि space-रहित (ROT-प्रतिबंधित); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: बर्मी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "nan", slug: "minnan", en_name: "Min Nan Chinese", hi_name: "मीनान चीनी", /* 10-Sep: L2 भाषा — फ़ुज्यान-ताईवान, Han space-रहित (ROT-प्रतिबंधित); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: मीनान चीनी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "su", slug: "sundanese", en_name: "Sundanese", hi_name: "सुंडानी", /* 10-Sep: L2 भाषा — इंडोनेशिया-पश्चिम जावा, Latin-plain; merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: सुंडानी की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "tl", slug: "tagalog", en_name: "Tagalog", hi_name: "तागालोग", /* 10-Sep: L2 भाषा — फ़िलीपींस, Latin-plain; merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: तागालोग की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
  { code: "yue", slug: "cantonese", en_name: "Cantonese", hi_name: "कैंटोनीज़", /* 10-Sep: L2 भाषा — हांगकांग-ग्वांगदोंग, Han space-रहित (ROT-प्रतिबंधित); merge-दौर में KKB2_LANGS-पंजीकरण (SE-एशिया खेप का छूटा हिस्सा) */
    next: 'आगे का रास्ता: कैंटोनीज़ की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE },
];
/* ===== 14-Sep (Founder: "परिचय पेज विश्व-स्तरीय") — app के नीचे स्थिर परिचय: 6 अंक · 4 कदम · यह भाषा क्यों (गलियारा-data) · विश्व-मानक · FAQ (FAQPage JSON-LD) · आगे ===== */
const KKB_FAQ = [
  ["क्या यह कोर्स सच में मुफ़्त है?", "हाँ। पढ़ना, सुनना, बोलना, साप्ताहिक परीक्षा — सब मुफ़्त, बिना login। सिर्फ़ प्रमाणपत्र-PDF ₹125 का है, वह भी मर्ज़ी से।"],
  ["मैं सिर्फ़ 5वीं पास हूँ, क्या कर पाऊँगा/पाऊँगी?", "हाँ। हर वाक्य देवनागरी में उच्चारण और हिंदी में अर्थ के साथ है। रोज़ 20–30 वाक्य सुनो और बोलो — बस।"],
  ["रोज़ कितना समय लगेगा और कुल कितने दिन?", "रोज़ 15–20 मिनट। 90 दिन में 2,150 वाक्य। छूट जाए तो जहाँ छोड़ा था वहीं से चलता है।"],
  ["प्रमाणपत्र किस काम आएगा?", "यह बोलने-तैयारी का ACS-प्रमाणपत्र है (FFGPMTrust, QR से जाँच)। यह सरकारी भाषा-परीक्षा या वीज़ा की गारंटी नहीं — उनकी तैयारी है; आगे की मान्य परीक्षा की कड़ी इसी पेज पर है।"],
  ["क्या यह बिना internet चलेगा?", "एक बार खोलने के बाद पाठ फ़ोन में रहते हैं (offline)। आवाज़ फ़ोन की अपनी TTS से आती है — पुराने फ़ोन में कोई भाषा न हो तो देवनागरी-उच्चारण पढ़ लो।"],
  ["इस कोर्स का ढाँचा किस पर आधारित है?", "CEFR A1–A2 के 'मैं कर सकता हूँ' कथन, जापान (Irodori/JFT-Basic) और कोरिया (EPS-TOPIK) के कामगार-भाषा कार्यक्रमों की तर्ज़ पर — 'आधारित/प्रेरित', उनकी प्रति नहीं।"]
];
function kkb2IntroBelow(c) {
  const cor = (typeof CORR !== "undefined" ? CORR[c.slug] : null) || []; const hiC = cor.map(k => (typeof EMB_HI !== "undefined" && EMB_HI[k]) || k);
  const why = cor.length
    ? '<p>' + c.hi_name + ' बोलने वालों के मुख्य रोजगार-देश: <b>' + hiC.join(", ") + '</b>। वहाँ काम माँगने, समझने, अपने हक़ की बात रखने और सुरक्षित रहने के लिए भाषा पहला औज़ार है। ACS का सूत्र: <b>1 हुनर + 1 भाषा = पहली कमाई</b>।</p>'
    : '<p>' + c.hi_name + ' किसी एक विदेशी रोजगार-गलियारे से नहीं जुड़ी — यह अपने राज्य/देश, व्यापार, परिवार और पहचान की भाषा है। यहाँ भाषा सीखना = अपने लोगों से उनकी बोली में जुड़ना और स्थानीय बाज़ार में काम पाना।</p>';
  const faqHtml = KKB_FAQ.map(q => '<details class="kkb-faq"><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>').join("");
  return '<section class="kkb-below">' +
    '<h2>यह कोर्स एक नज़र में</h2><div class="kkb-num">' +
    '<div><b>2,150</b><span>वाक्य, असली लिपि + उच्चारण + अर्थ</span></div><div><b>90</b><span>दिन · रोज़ 20–30 वाक्य</span></div><div><b>🔊</b><span>हर वाक्य पर आवाज़, धीरे भी</span></div>' +
    '<div><b>40/40/40</b><span>सुनो · बोलो · पढ़ो — ऑनलाइन परीक्षा</span></div><div><b>₹0</b><span>पढ़ाई मुफ़्त, बिना login</span></div><div><b>₹125</b><span>प्रमाणपत्र (QR से जाँच), मर्ज़ी से</span></div></div>' +
    '<h2>कैसे चलता है — 4 कदम</h2><ol class="kkb-steps"><li><b>सुनो</b> — 🔊 दबाओ, धीरे भी सुन सकते हो।</li><li><b>बोलो</b> — साथ-साथ 3 बार, फिर "मैंने बोला"।</li><li><b>लिखो</b> — हफ़्ते की छपने-योग्य किताब में वही वाक्य (जहाँ बनी है)।</li><li><b>परखो</b> — हर हफ़्ते छोटी परीक्षा; 90 दिन बाद 40/40/40 और प्रमाणपत्र।</li></ol>' +
    '<h2>' + c.hi_name + ' क्यों सीखें</h2>' + why +
    '<h2>दुनिया के मानक से मेल</h2><p>72 "मैं कर सकता/सकती हूँ" लक्ष्य (ऊपर 🎯 में), स्तर-1 = A1, स्तर-2 = A2 पर आधारित। यही ढाँचा जापान-कोरिया के सरकारी कामगार-भाषा कार्यक्रमों में है — हिंदी-माध्यम में यह ACS ही देता है। हर पेज पर मूल भाषा का निशान; अनुवाद का क्रम हिंदी → अंग्रेज़ी → बाक़ी।</p>' +
    '<h2>अक्सर पूछे सवाल</h2>' + faqHtml +
    '<p class="kkb-below-note">मूल भाषा: हिंदी · संस्था: Applied Computer School™ (FFGPMTrust, ISO 9001:2015), खगड़िया, बिहार · <a href="/courses/hi/bhasha/' + c.slug + '/brief/">एक-पन्ना परिचय (हिंदी + English)</a></p>' +
    '</section>';
}
const KKB_BELOW_CSS = '<style>.kkb-below{max-width:600px;margin:18px auto 30px;padding:14px 16px;background:#F5F7FA;color:#0B1F3A;border-radius:14px;font-size:18px;line-height:1.7}.kkb-below h2{font-size:21px;margin:14px 0 8px;border-left:6px solid #F9A825;padding-left:10px}.kkb-below h2:first-child{margin-top:0}.kkb-num{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}.kkb-num div{background:#fff;border:2px solid #CBD5E1;border-radius:12px;padding:10px;text-align:center}.kkb-num b{display:block;font-size:26px;color:#1565C0}.kkb-num span{font-size:16px;color:#334155}.kkb-steps{padding-left:22px}.kkb-steps li{margin:4px 0}.kkb-faq{background:#fff;border:1px solid #CBD5E1;border-radius:10px;padding:6px 12px;margin:6px 0}.kkb-faq summary{cursor:pointer;font-weight:800;font-size:18px}.kkb-faq p{margin:6px 0 4px;font-size:17px}.kkb-below-note{font-size:16px;color:#334155;margin-top:12px}.kkb-below a{color:#1565C0}</style>';
/* ---- AI-सहयोग पट्टी (06-Oct-2026, Founder-आदेश): अंदाज़े/उथले content वाली भाषाओं पर disclaimer +
   भाषाविद-निमंत्रण (WhatsApp, भाषा-नाम pre-भरा)। एकमात्र घर: data/ai_sahyog_flags.js —
   भाषा सुधर-मुहर पाए तो कोड वहाँ से हटे, पट्टी अपने-आप उतरे। फ़ाइल न मिले = build रुके (fail-closed)। */
const AI_FLAGS = new Set(require("./data/ai_sahyog_flags.js").flags);
function aiSahyogNote(c) {
  if (!AI_FLAGS.has(c.code)) return '';
  const msg = encodeURIComponent('नमस्ते ACS — मैं ' + c.hi_name + ' (' + c.en_name + ', कोड ' + c.code + ') भाषा का/की जानकार हूँ। इस भाषा के संवर्धन में सहयोग करना चाहता/चाहती हूँ।');
  return '<div class="kkb-ai-note" style="max-width:600px;margin:10px auto 0;padding:12px 16px;background:#FFF8E1;border:2px solid #F9A825;border-radius:10px;color:#0B1F3A">' +
    '<p style="font-size:17px;line-height:1.7;margin:0">🤖 <b>ज़रूरी सूचना:</b> यह कोर्स AI (मशीन) के सहयोग से तैयार हुआ है। भाषाविद का सहयोग अपेक्षित है।</p>' +
    '<p style="font-size:17px;line-height:1.7;margin:6px 0 0">ACS इस भाषा के संवर्धन के लिए भाषाविदों को आमंत्रित करता है — <a href="https://wa.me/919431210092?text=' + msg + '" target="_blank" rel="noopener" style="color:#1565C0;font-weight:800">🙏 जुड़ने के लिए क्लिक करें</a></p>' +
    '</div>';
}
function kkb2Content(c) {
  return '<section class="kkb-intro" style="max-width:600px;margin:16px auto 0;padding:0 16px;color:#fff">' +
    '<h1 style="font-size:26px;line-height:1.3;margin:8px 0 6px;color:#fff">' + c.hi_name + ' बोलने का पूरा कोर्स — एक ही जगह</h1>' +
    '<p style="font-size:18px;line-height:1.7;margin:0 0 8px;opacity:.92">पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। हर वाक्य असली लिपि में + देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ 🔊 के साथ। 5वीं पास भी आज से शुरू करे।</p>' +
    '<p style="font-size:16px;line-height:1.7;margin:0 0 4px;opacity:.8">' + c.next + '</p>' +
    '<p style="font-size:18px;line-height:1.6;margin:6px 0 4px"><a href="/courses/hi/bhasha/' + c.slug + '/brief/" style="color:#F9A825;font-weight:800;text-decoration:underline">📄 एक-पन्ना परिचय — दूतावास/नियोक्ता के लिए (हिंदी + English)</a></p>' +
    /* 14-Sep: लिपि-परिचय workbook (build_lipi_pages) बना हो तो पहली-बार वालों के लिए द्वार — मौजूदगी से, hardcode नहीं */
    (fs.existsSync(path.join(ROOT, "courses/hi/bhasha", c.slug, "workbook/index.html")) ? '<p style="font-size:18px;line-height:1.6;margin:6px 0 4px"><a href="/courses/hi/bhasha/' + c.slug + '/workbook/" style="color:#F9A825;font-weight:800;text-decoration:underline">📘 लिखो-workbook — हर हफ़्ते की छपने-योग्य किताब + शब्दकोश (मुफ़्त PDF, छूकर download)</a></p>' : '') +
    (fs.existsSync(path.join(ROOT, "courses/hi/bhasha", c.slug, "lipi/index.html")) ? '<p style="font-size:18px;line-height:1.6;margin:6px 0 8px"><a href="/courses/hi/bhasha/' + c.slug + '/lipi/" style="color:#F9A825;font-weight:800;text-decoration:underline">✍️ पहली बार ' + c.hi_name + ' के अक्षर देख रहे हो? पहले लिपि-परिचय workbook (मुफ़्त, छपने-योग्य)</a></p>' : '') +
    '<p style="font-size:16px;line-height:1.7;margin:0 0 8px;opacity:.7">नोट: प्रमाणपत्र CEFR पर आधारित/प्रेरित — CEFR-प्रमाणित नहीं। ऑनलाइन पूर्णता = सर्टिफिकेट प्रोग्राम; केंद्र/वर्कशॉप से practical = डिप्लोमा। 📚 गहन-पढ़ाई सूची — जल्द।</p>' +
    '</section>' +
    aiSahyogNote(c) +
    '<div id="kkb2-app" class="kkb2-app"><noscript><p style="padding:20px;font-size:19px">यह कोर्स चलाने के लिए ब्राउज़र में JavaScript चालू कीजिए।</p></noscript><p style="padding:20px;font-size:19px">कोर्स खुल रहा है…</p></div>' +
    kkb2IntroBelow(c);
}
/* ===== 14-Sep कदम-1 (दूतावास-योग्यता): Can-do asset-प्रति + हर भाषा का एक-पन्ना brief (हिंदी+English) ===== */
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const KKB_CANDO = require("./data/kkb_cando.js");
fs.writeFileSync(path.join(ROOT, "assets", "kkb_cando.js"), "/* generator-प्रति — मूल: generator/data/kkb_cando.js (हाथ से न बदलें) */\nwindow.KKB_CANDO = " + JSON.stringify(KKB_CANDO) + ";\n", "utf8");
const EMB_SRC = fs.readFileSync(path.join(ROOT, "assets", "govt_jobs_embassy.js"), "utf8");
function embGet(name) { const m = EMB_SRC.match(new RegExp("(?:var|const|let)\\s+" + name + "\\s*=\\s*(\\{[\\s\\S]*?\\}|\\[[\\s\\S]*?\\]);\\s*\\n")); try { return JSON.parse(m[1]); } catch (e) { return null; } }
const CORR = embGet("KKB_CORRIDORS") || {}, EMBS = embGet("EMBASSIES") || {}, EMB_HI = embGet("EMB_COUNTRY_HI") || {}, FEMB = embGet("FOREIGN_EMB_IN_INDIA") || {};
function countItems(code) { let n = 0; for (const f of [code === "en" ? "kkb_data.js" : "kkb_" + code + "_data.js", code === "en" ? "kkb2_data.js" : "kkb2_" + code + "_data.js"]) { const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) continue; const w = {}; try { new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {}); } catch (e) { continue; } const D = w.KKB2_DATA || w.KKB_DATA; if (D && D.weeks) D.weeks.forEach(wk => wk.days.forEach(d => n += (d.items || []).length)); } return n; }
function briefContent(c) {
  const url = "https://acslearn.com/courses/hi/bhasha/" + c.slug + "/"; const items = countItems(c.code); const cor = CORR[c.slug] || [];
  const canN = KKB_CANDO.weeks.reduce((a, w) => a + w.can.length, 0);
  const nextTxt = (c.next || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const corHtml = cor.length ? '<ul>' + cor.map(k => { const E = EMBS[k] || {}, F = FEMB[k]; return '<li><b>' + (E.flag ? E.flag + ' ' : '') + esc(EMB_HI[k] || k) + ' (' + esc(k) + ')</b> — भारतीय मिशन ' + esc(E.city || '') + (E.phone ? ', ☎ ' + esc(E.phone) : '') + (E.website ? ' · <a href="' + esc(E.website) + '" target="_blank" rel="noopener">' + esc(E.website.replace(/^https?:\/\//, '')) + '</a>' : '') + (F && F.url ? ' · भारत में दूतावास: <a href="' + esc(F.url) + '" target="_blank" rel="noopener">कड़ी</a>' : '') + '</li>'; }).join('') + '</ul>' : '<p>यह भाषा किसी एक विदेशी रोजगार-गलियारे से नहीं जुड़ी (भारतीय/क्षेत्रीय भाषा, या गलियारा अभी दर्ज नहीं) — इसलिए दूतावास-खंड नहीं (ईमानदार-पैनल नियम)।</p>';
  const corEn = cor.length ? '<ul>' + cor.map(k => { const E = EMBS[k] || {}; return '<li><b>' + (E.flag ? E.flag + ' ' : '') + esc(k) + '</b> — Indian Mission, ' + esc(E.city || '') + (E.phone ? ', ' + esc(E.phone) : '') + (E.website ? ' · <a href="' + esc(E.website) + '" target="_blank" rel="noopener">' + esc(E.website.replace(/^https?:\/\//, '')) + '</a>' : '') + '</li>'; }).join('') + '</ul>' : '<p>No single overseas employment corridor is linked to this language (regional language, or corridor not yet recorded).</p>';
  const canList = KKB_CANDO.weeks.map(w => '<li><b>सप्ताह ' + w.w + ' (' + w.level + ') ' + esc(w.title) + ':</b> ' + w.can.map(x => esc(x.replace(/\{L\}/g, c.hi_name))).join(' ') + '</li>').join('');
  const box = (t, b) => '<section class="bf-sec"><h2>' + t + '</h2>' + b + '</section>';
  let hi = '<article class="bf-wrap" id="bf-hi">' +
    '<p class="bf-kicker">अप्लाइड कंप्यूटर स्कूल™ · FFGPMTrust · ACS काम की भाषा</p>' +
    '<h1>' + esc(c.hi_name) + ' बोलने का प्रमाणपत्र कोर्स — एक-पन्ना परिचय (दूतावास, नियोक्ता व भर्ती-एजेंसी के लिए)</h1>' +
    '<div class="bf-actions"><a class="bf-btn" href="#bf-en">English version ↓</a><button type="button" class="bf-btn bf-btn2" onclick="window.print()">🖨️ छापें / PDF</button><a class="bf-btn bf-btn3" href="' + url + '">🗣️ कोर्स खोलें</a></div>' +
    box('1. कोर्स एक नज़र में', '<table class="bf-t"><tr><td>भाषा</td><td>' + esc(c.hi_name) + ' (' + esc(c.en_name) + ')</td></tr><tr><td>माध्यम</td><td>हिंदी (देवनागरी उच्चारण + हिंदी अर्थ + असली लिपि)</td></tr><tr><td>स्तर</td><td>CEFR A1–A2 पर आधारित/प्रेरित (CEFR-प्रमाणित नहीं)</td></tr><tr><td>अवधि</td><td>90 दिन · 3 महीने · रोज़ 20–30 वाक्य</td></tr><tr><td>सामग्री</td><td>' + items.toLocaleString("en-IN") + ' वाक्य (स्तर-1: 500 · स्तर-2: 1,650), संवाद, साप्ताहिक शब्दकोश, हर वाक्य पर आवाज़</td></tr><tr><td>परीक्षा</td><td>ऑनलाइन: 40 सुनो + 40 बोलो + 40 पढ़ो (प्रश्न-बैंक लगभग 3,000; हर बार नए)</td></tr><tr><td>प्रमाणपत्र</td><td>FFGPMTrust द्वारा, unique नंबर + QR से दुनिया में कहीं से जाँच; कोर्स मुफ़्त, प्रमाणपत्र ₹125</td></tr><tr><td>पता</td><td><a href="' + url + '">' + esc(url) + '</a></td></tr></table>') +
    box('2. कोर्स पूरा करने पर learner क्या कर सकेगा (' + canN + ' Can-do कथन)', '<ul class="bf-can">' + canList + '</ul>') +
    box('3. विषय-नक़्शा', '<p>स्तर-1 (दिन 1–25): पहली ज़रूरत · रोज़ की ज़िंदगी · काम की जगह · पैसा-यात्रा-सुरक्षा · नौकरी-फ़ोन-पेशा। स्तर-2 (दिन 26–90): परिवार-घर · दिनचर्या · पड़ोस · आदतें-समय · मेरा काम-हुनर · पैसा-दोस्त-तरक्की · काम की जगहें-ठिकाना-हक़ · इंटरव्यू-रिपोर्ट · बाज़ार · बस-ट्रेन-सफ़र · वीज़ा-हवाई-अड्डा · आराम-ख़ुशी · जीवन-रक्षा-आवाज़-हक़ (सुरक्षा व शोषण-बचाव परिशिष्ट)।</p>') +
    box('4. आगे की मान्य परीक्षा (ACS कोर्स = तैयारी; वही परीक्षा नहीं)', '<p>' + esc(nextTxt) + '</p>') +
    box('5. रोजगार-देश और दूतावास', corHtml + '<p class="bf-note">सुरक्षा-कड़ियाँ: <a href="https://emigrate.gov.in" target="_blank" rel="noopener">eMigrate</a> · <a href="https://www.madad.gov.in" target="_blank" rel="noopener">MADAD</a> · <a href="https://www.mea.gov.in" target="_blank" rel="noopener">विदेश मंत्रालय</a>। जानकारी जाँची: सितंबर 2026 — बाहरी site, ख़ुद verify करें।</p>') +
    box('6. संस्था', '<p>Applied Computer School™ (acslearn.com) — FFGPMTrust (ffgpmt.org, ISO 9001:2015) की परियोजना। ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar 851201 · +91-9431210092 · info@ffgpmt.org। कोर्स सभी के लिए निःशुल्क; offline चलता है; login के बिना पढ़ाई।</p><p class="bf-note">ईमानदारी-पंक्ति: यह बोलने की तैयारी का कोर्स है — किसी सरकारी भाषा-परीक्षा, वीज़ा या नौकरी की गारंटी नहीं। मूल भाषा: हिंदी।</p>') +
    '</article>';
  let en = '<article class="bf-wrap bf-en" id="bf-en" lang="en">' +
    '<p class="bf-kicker">Applied Computer School™ · FFGPMTrust · ACS Language for Work</p>' +
    '<h1>ACS Certificate in Spoken ' + esc(c.en_name) + ' — one-page brief (for embassies, employers, recruiters)</h1>' +
    box('1. At a glance', '<table class="bf-t"><tr><td>Language</td><td>' + esc(c.en_name) + ' (' + esc(c.hi_name) + ')</td></tr><tr><td>Medium of instruction</td><td>Hindi (Devanagari pronunciation + Hindi meaning + native script)</td></tr><tr><td>Level</td><td>Based on / inspired by CEFR A1–A2 (not CEFR-certified)</td></tr><tr><td>Duration</td><td>90 days · 3 months · 20–30 sentences a day</td></tr><tr><td>Content</td><td>' + items.toLocaleString("en-IN") + ' sentences (Level 1: 500 · Level 2: 1,650), dialogues, weekly word lists, audio for every sentence</td></tr><tr><td>Assessment</td><td>Online exam: 40 listening + 40 speaking + 40 reading (bank of about 3,000 items, randomised)</td></tr><tr><td>Certificate</td><td>Issued by FFGPMTrust; unique number + QR, verifiable worldwide; course free, certificate ₹125</td></tr><tr><td>URL</td><td><a href="' + url + '">' + esc(url) + '</a></td></tr></table>') +
    box('2. Learner outcomes', '<p>' + canN + ' Can-do statements (A1: weeks 1–5 · A2: weeks 6–18) covering first needs, daily life, workplace instructions, money and banking, safety, job interviews, phone calls, family, habits, markets, travel, visa and airport, and workers\' rights. Full list in the Hindi section above.</p>') +
    box('3. Employment corridors and Indian Missions', corEn + '<p class="bf-note">Safety links: <a href="https://emigrate.gov.in" target="_blank" rel="noopener">eMigrate</a> · <a href="https://www.madad.gov.in" target="_blank" rel="noopener">MADAD</a> · <a href="https://www.mea.gov.in" target="_blank" rel="noopener">MEA</a>. Verified: September 2026 — external sites, please re-verify.</p>') +
    box('4. Institution', '<p>Applied Computer School™ (acslearn.com), a project of FFGPMTrust (ffgpmt.org, ISO 9001:2015). ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar 851201, India · +91-9431210092 · info@ffgpmt.org. The course is free for all, works offline, no login needed to study.</p><p class="bf-note">Honesty line: this course prepares learners to speak; it does not guarantee any government language test, visa or job. Original language: Hindi — this section is a translation.</p>') +
    '</article>';
  return hi + en;
}
const BRIEF_CSS = '<style>.bf-wrap{max-width:820px;margin:0 auto;padding:12px 14px 28px;background:#F5F7FA;color:#0B1F3A;border-radius:14px;font-size:18px;line-height:1.7}.bf-en{margin-top:14px;border-top:6px solid #F9A825}.bf-kicker{font-size:16px;font-weight:800;color:#1565C0;margin:4px 0}.bf-wrap h1{font-size:24px;line-height:1.35;margin:6px 0 10px}.bf-wrap h2{font-size:20px;margin:16px 0 6px;border-left:6px solid #F9A825;padding-left:10px}.bf-actions{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px}.bf-btn{font-family:inherit;font-size:18px;font-weight:800;padding:10px 14px;border-radius:12px;border:0;background:#0B1F3A;color:#fff;text-decoration:none;cursor:pointer}.bf-btn2{background:#F9A825;color:#0B1F3A}.bf-btn3{background:#2E7D32}.bf-t{width:100%;border-collapse:collapse;table-layout:fixed}.bf-t td{overflow-wrap:anywhere;word-break:break-word}.bf-t td{border-bottom:1px solid #CBD5E1;padding:6px 8px;vertical-align:top;font-size:17px}.bf-t td:first-child{font-weight:800;width:32%}.bf-can{padding-left:18px}.bf-can li{margin:4px 0;font-size:17px}.bf-note{font-size:16px;color:#334155}.bf-wrap a{color:#1565C0}.bf-wrap a.bf-btn{color:#fff}.bf-wrap a.bf-btn2,.bf-wrap .bf-btn2{color:#0B1F3A}@media print{@page{size:A4;margin:12mm}.acs-nav,.acs-freebar,.acs-translate-panel,.acs-footer,.acs-scrim,.acs-drawer,.acs-wa,.udy-float,.tiranga-bar,.bf-actions{display:none!important}body{background:#fff!important}.bf-wrap{background:#fff;color:#000;padding:0;font-size:16px}.bf-en{break-before:page}.bf-t td{font-size:16px}.bf-can li{font-size:16px}}</style>';
KKB2_LANGS.forEach(c => buildSpecial({
  out: "courses/hi/bhasha/" + c.slug + "/brief/index.html", langStrict: false,
  title: c.hi_name + " बोलने का प्रमाणपत्र कोर्स — एक-पन्ना परिचय (ACS Certificate in Spoken " + c.en_name + " — Brief for embassies & employers) | अप्लाइड कंप्यूटर स्कूल",
  desc: c.hi_name + " (" + c.en_name + ") के 90-दिन, 2,150-वाक्य बोलने-कोर्स का एक-पन्ना परिचय: स्तर (CEFR A1–A2 पर आधारित), 72 Can-do कथन, परीक्षा 40/40/40, प्रमाणपत्र, रोजगार-देश व दूतावास, संस्था — हिंदी और English।",
  head: [BRIEF_CSS],
  jsonld: [{ "@context": "https://schema.org", "@type": "WebPage", "name": "ACS Certificate in Spoken " + c.en_name + " — brief", "inLanguage": ["hi", "en"], "isPartOf": { "@type": "Course", "name": "ACS Certificate in Spoken " + c.en_name, "url": "https://acslearn.com/courses/hi/bhasha/" + c.slug + "/" }, "publisher": { "@type": "Organization", "name": "Applied Computer School", "url": "https://acslearn.com/" } }],
  foot: [], content: briefContent(c)
}));
KKB2_LANGS.forEach(c => buildSpecial({
  out: "courses/hi/bhasha/" + c.slug + "/index.html", langStrict: false,
  title: "ACS Certificate in Spoken " + c.en_name + " — " + c.hi_name + " बोलने का पूरा कोर्स (90 दिन, 2,150 वाक्य, CEFR A2 पर आधारित) | अप्लाइड कंप्यूटर स्कूल",
  desc: c.hi_name + " बोलने का पूरा मुफ़्त कोर्स — 90 दिन, 3 महीने, 2,150 वाक्य असली लिपि + देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। स्तर 1+2 एक साथ; CEFR A2 पर आधारित। 5वीं पास भी आज से बोले।",
  head: ['<link rel="stylesheet" href="/assets/kkb2.css">', KKB_BELOW_CSS],
  /* 13-Sep SEO: schema.org Course + BreadcrumbList (Google Course rich-result: name/description/provider अनिवार्य) — दावे सिर्फ़ दर्ज तथ्य: मुफ़्त, 90 दिन, 2,150 वाक्य, "CEFR A2 पर आधारित" */
  jsonld: [
    { "@context": "https://schema.org", "@type": "Course",
      "name": "ACS Certificate in Spoken " + c.en_name + " — " + c.hi_name + " बोलने का पूरा कोर्स",
      "description": c.hi_name + " बोलने का पूरा मुफ़्त कोर्स — 90 दिन, 2,150 वाक्य असली लिपि + देवनागरी उच्चारण + हिंदी अर्थ + आवाज़; ऑनलाइन परीक्षा; प्रमाणपत्र CEFR A2 पर आधारित/प्रेरित (CEFR-प्रमाणित नहीं)।",
      "url": "https://acslearn.com/courses/hi/bhasha/" + c.slug + "/",
      "inLanguage": "hi", "teaches": "Spoken " + c.en_name + " (" + c.hi_name + ")", "isAccessibleForFree": true,
      "educationalLevel": "Beginner (based on CEFR A2)",
      "provider": { "@type": "Organization", "name": "Applied Computer School", "alternateName": "अप्लाइड कंप्यूटर स्कूल", "url": "https://acslearn.com/" },
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://acslearn.com/courses/hi/bhasha/" + c.slug + "/" },
      "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "P90D", "inLanguage": "hi" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
      { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
      { "@type": "ListItem", "position": 3, "name": c.hi_name + " बोलने का प्रमाणपत्र कोर्स", "item": "https://acslearn.com/courses/hi/bhasha/" + c.slug + "/" } ] },
    { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": KKB_FAQ.map(q => ({ "@type": "Question", "name": q[0], "acceptedAnswer": { "@type": "Answer", "text": q[1] } })) } ],
  foot: ['<script>window.KKB2_META=' + JSON.stringify({ hi: c.hi_name, en: c.en_name, slug: c.slug, brief: "/courses/hi/bhasha/" + c.slug + "/brief/" }) + ';</scr' + 'ipt>', /* 14-Sep कदम-1: Can-do/दूतावास-पैनल व brief-कड़ी हेतु */
         '<script src="/assets/kkb_cando.js"></scr' + 'ipt>',
         '<script src="' + (c.code === "en" ? "/assets/kkb_data.js" : "/assets/kkb_" + c.code + "_data.js") + '"></scr' + 'ipt>',
         '<script src="' + (c.code === "en" ? "/assets/kkb2_data.js" : "/assets/kkb2_" + c.code + "_data.js") + '"></scr' + 'ipt>',
         '<script src="/assets/kkb2.js" defer></scr' + 'ipt>'],
  content: kkb2Content(c)
}));

/* ---- 95 विषय-placeholder-पेज (01-Aug-2026, Founder-आदेश) ---- */
require("./build_subject_pages.js")(buildSpecial);

/* ===================== 404.html (14-Sep, सफ़ाई-दौर) =====================
   GitHub Pages हर अनजान पते पर रूट 404.html देता है। काम: (1) पुराने/हटाए पतों का JS-redirect नक़्शा
   (kaam-ki-bhasha 5 folder हटे — पुरानी कड़ियाँ यहीं सँभलें); (2) बाक़ी पर सादा हिंदी "पेज नहीं मिला" + आगे के रास्ते।
   noindex; sitemap में नहीं। नया पुराना-पता हटाओ = OLD_MAP में एक पंक्ति। */
const OLD_MAP = {
  "/courses/hi/kaam-ki-bhasha/": "/courses/hi/bhasha/english/",
  "/courses/hi/kaam-ki-bhasha-arabic/": "/courses/hi/bhasha/arabic/",
  "/courses/hi/kaam-ki-bhasha-kannada/": "/courses/hi/bhasha/kannada/",
  "/courses/hi/kaam-ki-bhasha-mandarin/": "/courses/hi/bhasha/mandarin/",
  "/courses/hi/kaam-ki-bhasha-spanish/": "/courses/hi/bhasha/spanish/",
  "/hi/": "/",
  "/courses/": "/courses/hi/",
  "/contact/": "/contact/hi/"
};
buildSpecial({
  out: "404.html", langStrict: false, robots: "noindex, follow",
  title: "पेज नहीं मिला — अप्लाइड कंप्यूटर स्कूल",
  desc: "यह पता site पर नहीं है। होम, 130 भाषा-कोर्स, 950 उद्यम या संपर्क पर जाएँ।",
  head: ['<script>(function(){var p=location.pathname.replace(/index\\.html$/,"");if(!/\\/$/.test(p))p+="/";var M=' + JSON.stringify(OLD_MAP) + ';var t=M[p]||M[p.replace(/\\/$/,"")+"/"];if(t){location.replace(t+location.search+location.hash);}})();</script>'],
  foot: [],
  content: '<section style="max-width:720px;margin:24px auto;padding:0 16px;text-align:center">' +
    '<h1 style="font-size:30px;color:#F9A825;margin:16px 0 8px">यह पेज नहीं मिला</h1>' +
    '<p style="font-size:19px;line-height:1.7;color:#F5F7FA">जो पता आपने खोला, वह site पर नहीं है — शायद पुराना हो गया या टाइप में चूक हुई। नीचे से आगे बढ़ें।</p>' +
    '<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:18px 0">' +
    '<a href="/" style="font-size:20px;font-weight:900;padding:14px 22px;border-radius:14px;background:#F9A825;color:#0B1F3A;text-decoration:none">🏠 होम</a>' +
    '<a href="/courses/hi/" style="font-size:20px;font-weight:900;padding:14px 22px;border-radius:14px;background:#2E7D32;color:#fff;text-decoration:none">🗣️ 130 भाषा-कोर्स</a>' +
    '<a href="/udyam/" style="font-size:20px;font-weight:900;padding:14px 22px;border-radius:14px;background:#1565C0;color:#fff;text-decoration:none">🌍 950 उद्यम</a>' +
    '<a href="/contact/hi/" style="font-size:20px;font-weight:900;padding:14px 22px;border-radius:14px;background:#F5F7FA;color:#0B1F3A;text-decoration:none">📞 संपर्क</a>' +
    '</div><p style="font-size:16px;color:#F5F7FA;opacity:.85">मूल भाषा: हिंदी</p></section>'
});
