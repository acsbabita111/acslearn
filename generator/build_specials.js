/* ============================================================
   build_specials.js — one-off विशेष पेजों का generator (परत-4)
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
    '<meta name="robots" content="index, follow">\n' +
    '<link rel="canonical" href="https://acslearn.com/' + spec.out + '">');
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
        <a href="mailto:acs.chautham@gmail.com" class="btn btn-accent" style="min-width:auto;padding:10px 16px">✉️ Email</a>
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
  { code: "en", label: "English", h1: "English for Work", data: "/assets/kkb_data.js", out: "courses/hi/bhasha/english/index.html", old: "courses/hi/kaam-ki-bhasha/index.html",
    title: "ACS काम की भाषा — English for Work (500 वाक्य, देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "5वीं पास के लिए English बोलने का मुफ़्त कोर्स — 500 वाक्य देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट।",
    line1: "यह English speaking (बोलने) का कोर्स है। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "kn", label: "कन्नड", h1: "कन्नड बोलना सीखें (Kannada for Work)", data: "/assets/kkb_kn_data.js", out: "courses/hi/bhasha/kannada/index.html", old: "courses/hi/kaam-ki-bhasha-kannada/index.html",
    title: "ACS काम की भाषा — कन्नड बोलना सीखें (Kannada for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कन्नड बोलना सीखें — कर्नाटक में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और फ़ोन पर टेस्ट। मुफ़्त।",
    line1: "यह कन्नड (Kannada) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो कर्नाटक में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "zh", label: "चीनी", h1: "चीनी बोलना सीखें (Mandarin for Work)", data: "/assets/kkb_zh_data.js", out: "courses/hi/bhasha/mandarin/index.html", old: "courses/hi/kaam-ki-bhasha-mandarin/index.html",
    title: "ACS काम की भाषा — चीनी बोलना सीखें (Mandarin for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से चीनी (Mandarin) बोलना सीखें — चीन या चीनी कंपनी में काम के लिए 500 वाक्य, देवनागरी उच्चारण, pinyin, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह चीनी (Mandarin Chinese) बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो चीन या किसी चीनी कंपनी/कारख़ाने में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "es", label: "स्पेनिश", h1: "स्पेनिश बोलना सीखें (Spanish for Work)", data: "/assets/kkb_es_data.js", out: "courses/hi/bhasha/spanish/index.html", old: "courses/hi/kaam-ki-bhasha-spanish/index.html",
    title: "ACS काम की भाषा — स्पेनिश बोलना सीखें (Spanish for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से Spanish बोलना सीखें — स्पेन/लैटिन अमेरिका या Spanish बोलने वाली कंपनी में काम के लिए 500 वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह Spanish बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो स्पेन, लैटिन अमेरिका या किसी Spanish बोलने वाली कंपनी में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "ar", label: "अरबी", h1: "अरबी बोलना सीखें (Arabic for Work — MENA)", data: "/assets/kkb_ar_data.js", out: "courses/hi/bhasha/arabic/index.html", old: "courses/hi/kaam-ki-bhasha-arabic/index.html",
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
    title: "ACS काम की भाषा — सिंधी बोलना सीखें (Sindhi for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिंधी बोलना सीखें — भारतीय सिंधी समुदाय में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिंधी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो सिंधी-भाषी समुदाय में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "doi", label: "डोगरी", h1: "डोगरी बोलना सीखें (Dogri for Work — जम्मू क्षेत्र)", data: "/assets/kkb_doi_data.js", out: "courses/hi/bhasha/dogri/index.html",
    title: "ACS काम की भाषा — डोगरी बोलना सीखें (Dogri for Work, जम्मू, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से डोगरी बोलना सीखें — जम्मू क्षेत्र (जम्मू-कश्मीर, हिमाचल) में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह डोगरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो जम्मू-भाषी क्षेत्र में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "mni", label: "मणिपुरी", h1: "मणिपुरी बोलना सीखें (Manipuri/Meitei for Work — मणिपुर)", data: "/assets/kkb_mni_data.js", out: "courses/hi/bhasha/manipuri/index.html",
    title: "ACS काम की भाषा — मणिपुरी बोलना सीखें (Manipuri for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मणिपुरी बोलना सीखें — मणिपुर में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त। (प्रारंभिक मसौदा — native-speaker-जाँच अनिवार्य)",
    line1: "यह मणिपुरी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो मणिपुर में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना। ⚠️ यह शुरुआती मसौदा है — मणिपुरी चीनी-तिब्बती परिवार की भाषा है, कृपया native-speaker से जाँच कराकर ही भरोसा करें।" },
  { code: "ru", label: "रूसी", h1: "रूसी बोलना सीखें (Russian for Work — रूस)", data: "/assets/kkb_ru_data.js", out: "courses/hi/bhasha/russian/index.html",
    title: "ACS काम की भाषा — रूसी बोलना सीखें (Russian for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से रूसी बोलना सीखें — रूस में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह रूसी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो रूस में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
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
  { code: "bjj", label: "बज्जिका", h1: "बज्जिका बोलना सीखें (Bajjika for Work — बिहार)", data: "/assets/kkb_bjj_data.js", out: "courses/hi/bhasha/bajjika/index.html",
    title: "ACS काम की भाषा — बज्जिका बोलना सीखें (Bajjika for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से बज्जिका बोलना सीखें — वैशाली-मुज़फ़्फ़रपुर-सीतामढ़ी पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह बज्जिका बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो बिहार के वैशाली-मुज़फ़्फ़रपुर क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "bhb", label: "भीली", h1: "भीली बोलना सीखें (Bhili for Work — जनजातीय पट्टी)", data: "/assets/kkb_bhb_data.js", out: "courses/hi/bhasha/bhili/index.html",
    title: "ACS काम की भाषा — भीली बोलना सीखें (Bhili for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से भीली बोलना सीखें — राजस्थान-गुजरात-मध्यप्रदेश जनजातीय पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह भीली बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो राजस्थान-गुजरात-मध्यप्रदेश के जनजातीय क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tcy", label: "तुलु", h1: "तुलु बोलना सीखें (Tulu for Work — तटीय कर्नाटक)", data: "/assets/kkb_tcy_data.js", out: "courses/hi/bhasha/tulu/index.html",
    title: "ACS काम की भाषा — तुलु बोलना सीखें (Tulu for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तुलु बोलना सीखें — मंगलौर-उडुपी क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तुलु बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तटीय कर्नाटक में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "gon", label: "गोंडी", h1: "गोंडी बोलना सीखें (Gondi for Work — गोंड जनजातीय पट्टी)", data: "/assets/kkb_gon_data.js", out: "courses/hi/bhasha/gondi/index.html",
    title: "ACS काम की भाषा — गोंडी बोलना सीखें (Gondi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से गोंडी बोलना सीखें — मध्यप्रदेश-महाराष्ट्र-छत्तीसगढ़ गोंड-पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह गोंडी बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो गोंड जनजातीय क्षेत्र में काम करते हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "pnb", label: "पश्चिमी पंजाबी", h1: "पश्चिमी पंजाबी बोलना सीखें (Western Punjabi/Lahnda for Work)", data: "/assets/kkb_pnb_data.js", out: "courses/hi/bhasha/western-punjabi/index.html",
    title: "ACS काम की भाषा — पश्चिमी पंजाबी बोलना सीखें (Western Punjabi for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से पश्चिमी पंजाबी/लहंदा बोलना सीखें — पाकिस्तानी पंजाब में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह पश्चिमी पंजाबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "skr", label: "सराइकी", h1: "सराइकी बोलना सीखें (Saraiki for Work — मुल्तान-बहावलपुर)", data: "/assets/kkb_skr_data.js", out: "courses/hi/bhasha/saraiki/index.html",
    title: "ACS काम की भाषा — सराइकी बोलना सीखें (Saraiki for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सराइकी बोलना सीखें — मुल्तान-बहावलपुर पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सराइकी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "syl", label: "सिल्हटी", h1: "सिल्हटी बोलना सीखें (Sylheti for Work — सिलहट-कछाड़)", data: "/assets/kkb_syl_data.js", out: "courses/hi/bhasha/sylheti/index.html",
    title: "ACS काम की भाषा — सिल्हटी बोलना सीखें (Sylheti for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से सिल्हटी बोलना सीखें — सिलहट-कछाड़ पट्टी में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह सिल्हटी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "tt", label: "तातार", h1: "तातार बोलना सीखें (Tatar for Work — तातारस्तान)", data: "/assets/kkb_tt_data.js", out: "courses/hi/bhasha/tatar/index.html",
    title: "ACS काम की भाषा — तातार बोलना सीखें (Tatar for Work, 500 वाक्य देवनागरी में) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से तातार बोलना सीखें — तातारस्तान में काम के लिए 500 वाक्य, हिंदी अर्थ और आवाज़ के साथ। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह तातार बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो तातारस्तान में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "apc", label: "लेवांटाइन अरबी", h1: "लेवांटाइन अरबी बोलना सीखें (Levantine Arabic for Work)", data: "/assets/kkb_apc_data.js", out: "courses/hi/bhasha/levantine-arabic/index.html",
    title: "ACS काम की भाषा — लेवांटाइन अरबी बोलना सीखें (Levantine Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से लेवांटाइन अरबी बोलना सीखें — सीरिया-लेबनान-जॉर्डन-फ़िलिस्तीन में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह लेवांटाइन अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "acm", label: "मेसोपोटामिया अरबी", h1: "मेसोपोटामिया अरबी बोलना सीखें (Iraqi Arabic for Work)", data: "/assets/kkb_acm_data.js", out: "courses/hi/bhasha/mesopotamian-arabic/index.html",
    title: "ACS काम की भाषा — मेसोपोटामिया अरबी बोलना सीखें (Iraqi Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से मेसोपोटामिया/इराक़ी अरबी बोलना सीखें — इराक़ में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह मेसोपोटामिया अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "acw", label: "हिजाज़ी अरबी", h1: "हिजाज़ी अरबी बोलना सीखें (Hejazi Arabic for Work — पश्चिमी सऊदी अरब)", data: "/assets/kkb_acw_data.js", out: "courses/hi/bhasha/hejazi-arabic/index.html",
    title: "ACS काम की भाषा — हिजाज़ी अरबी बोलना सीखें (Hejazi Arabic for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से हिजाज़ी अरबी बोलना सीखें — जेद्दा-मक्का-मदीना क्षेत्र में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह हिजाज़ी अरबी बोलने का कोर्स है — हिंदी जानने वालों के लिए। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" },
  { code: "yue", label: "कैंटोनीज़", h1: "कैंटोनीज़ बोलना सीखें (Cantonese for Work — हांगकांग-ग्वांगदोंग)", data: "/assets/kkb_yue_data.js", out: "courses/hi/bhasha/cantonese/index.html",
    title: "ACS काम की भाषा — कैंटोनीज़ बोलना सीखें (Cantonese for Work, 500 वाक्य) | अप्लाइड कंप्यूटर स्कूल",
    desc: "हिंदी से कैंटोनीज़ बोलना सीखें — हांगकांग-ग्वांगदोंग में काम के लिए 500 वाक्य। 5 सप्ताह: पाठ, अभ्यास और video-call टेस्ट। मुफ़्त।",
    line1: "यह कैंटोनीज़ बोलने का कोर्स है — हिंदी जानने वालों के लिए, जो हांगकांग-ग्वांगदोंग में काम करने जा रहे हैं। पढ़ना-लिखना नहीं — सिर्फ़ सुनना और बोलना।" }
];
function kkbContent(c) {
  return '<section class="kkb-intro" style="max-width:560px;margin:18px auto 0;padding:0 16px;color:#fff">' +
    '<h1 style="font-size:28px;line-height:1.25;margin:10px 0 6px;color:#fff">ACS काम की भाषा — ' + c.h1 + '</h1>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">' + c.line1 + '</p>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">हर वाक्य देवनागरी में दिखता है, हिंदी में मतलब है, और आवाज़ है। 5वीं पास भी आज से बोल सकता है।</p>' +
    '<p style="font-size:19px;line-height:1.7;margin:0 0 10px;opacity:.92">500 वाक्य, 5 सप्ताह। हर सप्ताह में 5 पाठ (20-20 वाक्य), दिन 6 अभ्यास, दिन 7 फ़ोन पर टेस्ट। यह demo (नमूना) रूप है। सब कुछ मुफ़्त है।</p>' +
    '</section>' +
    '<div id="kkb-app" class="kkb-app">' +
    '<noscript><p style="padding:20px;font-size:19px">यह कोर्स चलाने के लिए ब्राउज़र में JavaScript चालू कीजिए।</p></noscript>' +
    '<p style="padding:20px;font-size:19px">कोर्स खुल रहा है…</p>' +
    '</div>';
}
KKB_LANGS.forEach(c => buildSpecial({
  out: c.out, langStrict: false, title: c.title, desc: c.desc,
  head: ['<link rel="stylesheet" href="/assets/kkb.css">'],
  foot: ['<script src="' + c.data + '"></scr' + 'ipt>', '<script src="/assets/kkb.js" defer></scr' + 'ipt>'],
  content: kkbContent(c)
}));

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

/* ---- 95 विषय-placeholder-पेज (01-Aug-2026, Founder-आदेश) ---- */
require("./build_subject_pages.js")(buildSpecial);

