/* lal10-ब खेप-4: zai (ज़ापोतेक/Isthmus Zapotec, Oto-Manguean, मेक्सिको-Oaxaca; SVO-सरलीकृत) +
   guc (वायुनाइकी/Wayuunaiki, Arawakan, कोलंबिया-वेनेज़ुएला Guajira; SVO-सरलीकृत)
   attested-core LEX (naa/lii/nisa/yoo · taya/pia/wuin/piichi) + नियमित साँचे; ASCII-सरल वर्तनी
   (zai glottal-apostrophe हटा, guc ü→u); Spanish loans जहाँ स्वाभाविक; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- zai ज़ापोतेक (Isthmus Zapotec) ---- */
const ZAI={
 code:"zai", labelHi:"ज़ापोतेक", labelEn:"Zapotec", tts:"es-MX", svo:true,
 pre:[["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"", yes:"Ya", negWord:"co",
 past:"ma %V", fut:"chi %V", prog:"ca %V", neg:"que %V",
 can:"zanda %V", want:"racaladxi %V",
 V:{"होना":"nuu","रहना":"nabeza","करना":"runi","जाना":"rie","आना":"reeda","देना":"rudii","लेना":"ricaa","खाना":"ro","पीना":"re","देखना":"ruuya","सुनना":"rucaadiaga","बोलना":"rini","कहना":"rabi","पूछना":"rinabadiidxa","पढ़ना":"riunda","लिखना":"rucaa","सीखना":"riziidi","सिखाना":"rusiidi","समझना":"riene","जानना":"nanna","सोना":"rasi","उठना":"riasa","बैठना":"ribi","खड़ा-होना":"ruzuhua","चलना":"riza","दौड़ना":"rixoñe","ख़रीदना":"rizi","बेचना":"rutoo","बनाना":"runi","खोलना":"rixele","बंद-करना":"rusegu","रखना":"rapa","मिलना":"ridxela","भेजना":"rusenda","लाना":"redane","धोना":"riguibi","पकाना":"runi guendaro","चाहना":"racaladxi","पसंद":"racaladxi","माँगना":"rinaba","शुरू":"ruzulu","ख़त्म":"riluxe","पहुँचना":"ridxiña","रुकना":"ruzuhua","काम-करना":"runi dxiiña","फोन-करना":"runi phone","मदद-करना":"racane","इंतज़ार":"ribeza","कोशिश":"ruyubi","याद":"rietenaladxi"},
 LEX:{
  "मैं":"Naa","मैंने":"Naa","मुझे":"naa","मुझको":"naa","मेरा":"stinne","मेरे":"stinne","मेरी":"stinne","हम":"Laanu","हमें":"laanu","हमने":"Laanu","हमारा":"stinu","हमारे":"stinu","हमारी":"stinu",
  "आप":"Lii","आपने":"Lii","तुम":"Lii","तू":"Lii","आपका":"stilu","आपके":"stilu","आपकी":"stilu","आपको":"lii","तुम्हारा":"stilu",
  "वह":"Laabe","उसने":"Laabe","वो":"Laabe","उसका":"stibe","उसके":"stibe","उसकी":"stibe","उसे":"laabe","वे":"Laacabe","उन्होंने":"Laacabe","उन्हें":"laacabe",
  "यह":"Ndi","इस":"ndi","ये":"ndi","इसे":"ni","इसका":"stini","इसकी":"stini","इसके":"stini",
  "कोई":"tuuxa","किसी":"tuuxa","सब":"gira","सभी":"gira","सारा":"gira","सारे":"gira","हर":"gira","पूरा":"gira","पूरी":"gira","पूरे":"gira",
  "अपना":"","अपने":"","अपनी":"","ही":"","वाला":"","वाली":"","वाले":"","ने":"","को":"","का":"","के":"","की":"",
  "परिवार":"binnilidxi","माता-पिता":"jñaa ne bixhoze","माता":"jñaa","माँ":"jñaa","पिता":"bixhoze","पिताजी":"bixhoze",
  "भाई":"bichi","बड़ा भाई":"bichi naroba","छोटा भाई":"bichi huiini","बहन":"benda","छोटी बहन":"benda huiini","बड़ी बहन":"benda naroba",
  "बेटा":"xiiñi","बेटी":"badudxaapa","बच्चा":"badu","बच्चे":"ca badu","पत्नी":"xheela","पति":"xheela","दोस्त":"xhamigu","दोस्तों":"ca xhamigu",
  "लोग":"binni","लोगों":"binni","आदमी":"nguiiu","औरत":"gunaa","लड़का":"badunguiiu","लड़की":"badudxaapa",
  "घर":"yoo","गाँव":"guidxi","शहर":"guidxi naroba","नाम":"la","काम":"dxiiña","पानी":"nisa","खाना":"guendaro","चावल":"arroz","खेत":"ñaa","रास्ता":"neza","दुकान":"tienda",
  "दिन":"dxi","रात":"gueela","सुबह":"siado","शाम":"huadxi","आज":"yannadxi","कल":"ixi","अभी":"yanna","अब":"yanna","समय":"tiempu",
  "साल":"iza","महीना":"beeu","महीने":"beeu","हफ़्ता":"semana","हफ़्ते":"semana","सप्ताह":"semana","घंटा":"ora","घंटे":"ora","मिनट":"minutu","बजे":"ora","बार":"biaje",
  "पैसा":"bidxichi","पैसे":"bidxichi","रुपये":"bidxichi","रुपया":"bidxichi","बाज़ार":"luguiaa","बाजार":"luguiaa","स्कूल":"scuela","किताब":"guichi","कागज़":"guichi","भाषा":"diidxa","बात":"diidxa","शब्द":"diidxa","वाक्य":"diidxa",
  "सवाल":"pregunta","मदद":"ayuda","जगह":"lugar","चीज़":"cosa","चीज़ें":"ca cosa","सामान":"ca cosa","कुछ":"xixa",
  "अच्छा":"galan","अच्छी":"galan","अच्छे":"galan","ठीक":"jneza","सही":"jneza","असली":"dxandi","पक्का":"dxandi","ग़लत":"mal","गलत":"mal",
  "बड़ा":"naroba","बड़ी":"naroba","बड़े":"naroba","छोटा":"huiini","छोटी":"huiini","छोटे":"huiini","नया":"cubi","नई":"cubi","नए":"cubi","पुराना":"yooxho","पुराने":"yooxho",
  "बहुत":"nabe","थोड़ा":"caadxi","कम":"caadxi","जल्दी":"nagueenda","धीरे":"chaahui","रोज़":"gira dxi","हमेशा":"gira ora",
  "फिर":"sti biaje","बाद":"despues","पहले":"nirudo","पहला":"nirudo","पहली":"nirudo","पिछले":"gudidi","पिछला":"gudidi","यहाँ":"rari","यहीं":"rari","वहाँ":"raque","दूर":"zitu","पास":"gaxha","आगे":"nezalu","पीछे":"deche","अंदर":"ndaani",
  "क्या":"xi","कौन":"tu","कौन-सा":"xi","कौन-सी":"xi","कहाँ":"paraa","कब":"padxi","कैसे":"ximodo","कैसा":"ximodo","कैसी":"ximodo","क्यों":"xiñee","कितना":"panda","कितने":"panda","कितनी":"panda",
  "में":"ndaani","पर":"lu","के लिए":"para","लिए":"para","साथ":"ne","के साथ":"ne",
  "और":"ne","या":"o","भी":"laaca","तो":"pues","अगर":"pa","लेकिन":"peru","कि":"que","क्योंकि":"purti","सिर्फ़":"solu","तक":"dede",
  "हाँ":"Ya","जी":"Ya","नहीं":"co","नमस्ते":"Padiuxi","धन्यवाद":"Xquixe pelu","कृपया":"por favor","माफ़":"perdon",
  "किया":"bini","गया":"guye","गई":"guye","गए":"guye","हुआ":"guca","हुई":"guca","हुए":"guca","लिया":"bicaa","दिया":"bidii","आया":"beeda","आई":"beeda","आए":"beeda","मिला":"bidxela","मिली":"bidxela",
  "लो":"bicaa","ले":"bicaa","लीजिए":"bicaa","दीजिए":"bidii","कीजिए":"bini","करो":"bini","कर":"bini","करके":"bini","बताइए":"gudxi naa","बताओ":"gudxi naa","दिखाइए":"bilui naa","दिखाओ":"bilui naa","चलो":"che nu","चलिए":"che nu","आओ":"guda","आइए":"guda","जाओ":"che",
  "है":"nuu","हैं":"nuu","हूँ":"nuu","हो":"nuu",
  "ज़ापोतेक":"Didxaza","हाथ":"na","आग":"gui","दर्द":"yuuba","मन":"ladxido","खुश":"nayeche","कपड़ा":"lari","कपड़े":"lari","चाय":"te",
  "रविवार":"domingu","सोमवार":"lunes","मज़दूर":"peon","मजदूर":"peon","मालिक":"xpixuana","परीक्षा":"esamen","दाम":"presiu","भाव":"presiu",
  "काम-धंधा":"dxiiña","नौकरी":"dxiiña","वेतन":"sueldu","मज़दूरी":"sueldu","मजदूरी":"sueldu","ख़र्च":"gastu","खर्च":"gastu",
  "वेल्डिंग":"welding","वेल्डर":"welder","कोर्स":"course","ऐप":"app","टीम":"team","प्लेटफॉर्म":"platform","ऑटो":"auto","कॉल":"call","एम्बुलेंस":"ambulance","एटीएम":"ATM","ओवरटाइम":"overtime","हेल्पलाइन":"helpline","पैकेट":"packet","गेट":"gate","किलो":"kilo","तारीख़":"dxi","तारीख":"dxi",
  "आराम":"descansu","अनुभव":"esperiensia","जाँच":"rebisa","परख":"rebisa","अभ्यास":"guendariziidi","सीख":"guendariziidi","ग़लती":"falta","गलती":"falta","शुरुआत":"nirudo","ख़बर":"diidxa","संदेश":"diidxa","पता":"direksion","सबूत":"prueba","सावधान":"biya chaahui","ज़रूर":"dxandi","जरूर":"dxandi","शांत":"nado","मज़बूत":"nadipa","मजबूत":"nadipa","आसान":"sencillu","मुफ़्त":"gratis","मुफ्त":"gratis","ख़ाली":"vaciu","बिना":"sin","विदेश":"sti guidxi","त्योहार":"saa","यात्रा":"biaje","सफ़र":"biaje","गर्मी":"nanda","बारिश":"nisaguie","आधा":"mediu","दूसरा":"sti","दूसरे":"sti","दूसरी":"sti"
 },
 translit:{cons:{"ñ":"न्य","x":"श","c":"क"},vm:{"á":"ा","é":"े","í":"ी","ó":"ो","ú":"ू"},vi:{"á":"आ","é":"ए","í":"ई","ó":"ओ","ú":"ऊ"}}
};

/* ---- guc वायुनाइकी (Wayuunaiki; Guajira) ---- */
const GUC={
 code:"guc", labelHi:"वायुनाइकी", labelEn:"Wayuunaiki", tts:"es-CO", svo:true,
 pre:[["तया।","मैं।"],[" तया "," मैं "],["वाया।","हम।"],[" वाया "," हम "],["पिया।","तुम।"],[" पिया "," तुम "],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"", yes:"Aa", negWord:"nnojo",
 past:"%Vin", fut:"%Veechi", prog:"%Vuin", neg:"nnojo %V",
 can:"atuja %V", want:"acheka %V",
 V:{"होना":"ee","रहना":"kepia","करना":"ainjaa","जाना":"ounaa","आना":"antaa","देना":"aapaa","लेना":"ayulaa","खाना":"ekaa","पीना":"asaa","देखना":"eraa","सुनना":"aapajaa","बोलना":"yootoo","कहना":"maa","पूछना":"asakiraa","पढ़ना":"ashajeraa","लिखना":"ashajaa","सीखना":"ekirajawa","सिखाना":"ekiraja","समझना":"ayaawata","जानना":"atujaa","सोना":"atunka","उठना":"atamaa","बैठना":"aikkala","खड़ा-होना":"shawataa","चलना":"waraitta","दौड़ना":"awata","ख़रीदना":"ayalaja","बेचना":"oikka","बनाना":"ainjaa","खोलना":"atalaa","बंद-करना":"asurula","रखना":"apunaa","मिलना":"antaa","भेजना":"aluwata","लाना":"antita","धोना":"ashija","पकाना":"ainja ekuulu","चाहना":"acheka","पसंद":"acheka","माँगना":"achunta","शुरू":"otta","ख़त्म":"ajatta","पहुँचना":"antaa","रुकना":"shawataa","काम-करना":"ayatawa","फोन-करना":"ainja phone","मदद-करना":"akaalija","इंतज़ार":"atapaja","कोशिश":"ainjawa","याद":"sotuin ain"},
 LEX:{
  "मैं":"Taya","मैंने":"Taya","मुझे":"tamuin","मुझको":"tamuin","मेरा":"ta","मेरे":"ta","मेरी":"ta","हम":"Waya","हमें":"wamuin","हमने":"Waya","हमारा":"wa","हमारे":"wa","हमारी":"wa",
  "आप":"Pia","आपने":"Pia","तुम":"Pia","तू":"Pia","आपका":"pu","आपके":"pu","आपकी":"pu","आपको":"pumuin","तुम्हारा":"pu",
  "वह":"Nia","उसने":"Nia","वो":"Nia","उसका":"nu","उसके":"nu","उसकी":"nu","उसे":"numuin","वे":"Naya","उन्होंने":"Naya","उन्हें":"namuin",
  "यह":"Tuu","इस":"tuu","ये":"tuu","इसे":"tuu","इसका":"su","इसकी":"su","इसके":"su",
  "कोई":"wane wayuu","किसी":"wane wayuu","सब":"supushua","सभी":"supushua","सारा":"supushua","सारे":"supushua","हर":"supushua","पूरा":"supushua","पूरी":"supushua","पूरे":"supushua",
  "अपना":"","अपने":"","अपनी":"","ही":"","वाला":"","वाली":"","वाले":"","ने":"","को":"","का":"","के":"","की":"",
  "परिवार":"apushi","माता-पिता":"ei je ashi","माता":"ei","माँ":"ei","पिता":"ashi","पिताजी":"ashi",
  "भाई":"awala","बड़ा भाई":"awala laula","छोटा भाई":"awala motso","बहन":"awala","छोटी बहन":"awala motso","बड़ी बहन":"awala laula",
  "बेटा":"achon","बेटी":"achon","बच्चा":"tepichi","बच्चे":"tepichi","पत्नी":"awayuuse","पति":"awayuuse","दोस्त":"aleewa","दोस्तों":"aleewa",
  "लोग":"wayuu","लोगों":"wayuu","आदमी":"toolo","औरत":"jieru","लड़का":"jintui","लड़की":"jintut",
  "घर":"piichi","गाँव":"pueulo","शहर":"pueulo miyou","नाम":"anulia","काम":"ayatawaa","पानी":"wuin","खाना":"ekuulu","चावल":"aroosa","खेत":"apain","रास्ता":"wopu","दुकान":"tienda",
  "दिन":"kai","रात":"aipaa","सुबह":"maalu","शाम":"aliika","आज":"joolu kai","कल":"watta","अभी":"joolu","अब":"joolu","समय":"ora",
  "साल":"juya","महीना":"kashi","महीने":"kashi","हफ़्ता":"semaana","हफ़्ते":"semaana","सप्ताह":"semaana","घंटा":"ora","घंटे":"ora","मिनट":"minuuto","बजे":"ora","बार":"biaje",
  "पैसा":"neeru","पैसे":"neeru","रुपये":"neeru","रुपया":"neeru","बाज़ार":"merkaao","बाजार":"merkaao","स्कूल":"ekirajiapule","किताब":"karalouta","कागज़":"karalouta","भाषा":"anuiki","बात":"putchi","शब्द":"putchi","वाक्य":"putchi",
  "सवाल":"pregunta","मदद":"akaalija","जगह":"mma","चीज़":"kasa","चीज़ें":"kasa","सामान":"kasa","कुछ":"wane kasa",
  "अच्छा":"anashi","अच्छी":"anashi","अच्छे":"anashi","ठीक":"anashi","सही":"shiimain","असली":"shiimain","पक्का":"shiimain","ग़लत":"mojusu","गलत":"mojusu",
  "बड़ा":"miyou","बड़ी":"miyou","बड़े":"miyou","छोटा":"motso","छोटी":"motso","छोटे":"motso","नया":"jeket","नई":"jeket","नए":"jeket","पुराना":"laula","पुराने":"laula",
  "बहुत":"wainma","थोड़ा":"palit","कम":"palit","जल्दी":"yapa","धीरे":"palit palit","रोज़":"supushua kai","हमेशा":"waneepia",
  "फिर":"chikua","बाद":"chikijee","पहले":"palajana","पहला":"palajana","पहली":"palajana","पिछले":"palajana","पिछला":"palajana","यहाँ":"yaaya","यहीं":"yaaya","वहाँ":"chayaa","दूर":"wattashi","पास":"peje","आगे":"palajana","पीछे":"chiirua","अंदर":"suluu",
  "क्या":"kasa","कौन":"jarai","कौन-सा":"jarai","कौन-सी":"jarai","कहाँ":"jala","कब":"jouja","कैसे":"jamusu","कैसा":"jamusu","कैसी":"jamusu","क्यों":"jamusu","कितना":"jera","कितने":"jera","कितनी":"jera",
  "में":"suluu","पर":"aau","के लिए":"supula","लिए":"supula","साथ":"amaa","के साथ":"amaa",
  "और":"je","या":"o","भी":"musia","तो":"musia","अगर":"muleka","लेकिन":"akatsa","कि":"sunain","क्योंकि":"suka","सिर्फ़":"nee","तक":"asta",
  "हाँ":"Aa","जी":"Aa","नहीं":"nnojo","नमस्ते":"Jamaya","धन्यवाद":"Anashi pia","कृपया":"Achunta","माफ़":"perdoon",
  "किया":"ainjaain","गया":"ounaain","गई":"ounaain","गए":"ounaain","हुआ":"eein","हुई":"eein","हुए":"eein","लिया":"ayulaain","दिया":"aapain","आया":"antaain","आई":"antaain","आए":"antaain","मिला":"antaain","मिली":"antaain",
  "लो":"payula","ले":"payula","लीजिए":"payula","दीजिए":"paapa","कीजिए":"painja","करो":"painja","कर":"painja","करके":"painja","बताइए":"puma","बताओ":"puma","दिखाइए":"peiyata","दिखाओ":"peiyata","चलो":"joo waya","चलिए":"joo waya","आओ":"panta","आइए":"panta","जाओ":"pouna",
  "है":"eeshi","हैं":"eeshi","हूँ":"eeshi","हो":"eeshi",
  "वायुनाइकी":"Wayuunaiki","हाथ":"ajapu","आग":"siki","दर्द":"mulia","मन":"ain","खुश":"talata","कपड़ा":"kuluulu","कपड़े":"kuluulu","चाय":"tee",
  "रविवार":"tominku","सोमवार":"luunes","मज़दूर":"ayataashi","मजदूर":"ayataashi","मालिक":"alaula","परीक्षा":"esamen","दाम":"presio","भाव":"presio",
  "काम-धंधा":"ayatawaa","नौकरी":"ayatawaa","वेतन":"sueldo","मज़दूरी":"sueldo","मजदूरी":"sueldo","ख़र्च":"gastu","खर्च":"gastu",
  "वेल्डिंग":"welding","वेल्डर":"welder","कोर्स":"course","ऐप":"app","टीम":"team","प्लेटफॉर्म":"platform","ऑटो":"auto","कॉल":"call","एम्बुलेंस":"ambulance","एटीएम":"ATM","ओवरटाइम":"overtime","हेल्पलाइन":"helpline","पैकेट":"packet","गेट":"gate","किलो":"kilo","तारीख़":"kai","तारीख":"kai",
  "आराम":"eemera","अनुभव":"atujala","जाँच":"eraja","परख":"eraja","अभ्यास":"ekirajawa","सीख":"ekirajawa","ग़लती":"falta","गलती":"falta","शुरुआत":"otta","ख़बर":"putchi","संदेश":"putchi","पता":"direksion","सबूत":"prueba","सावधान":"kuidao","ज़रूर":"shiimain","जरूर":"shiimain","शांत":"jimata","मज़बूत":"katsuin","मजबूत":"katsuin","आसान":"pasil","मुफ़्त":"gratis","मुफ्त":"gratis","ख़ाली":"vaciu","बिना":"siin","विदेश":"wane mma","त्योहार":"miira","यात्रा":"biaje","सफ़र":"biaje","गर्मी":"jouttai","बारिश":"juya","आधा":"mediu","दूसरा":"wane","दूसरे":"wane","दूसरी":"wane"
 },
 translit:{cons:{"c":"क"},vm:{"ü":"ु","á":"ा","é":"े","í":"ी","ó":"ो","ú":"ू"},vi:{"ü":"उ","á":"आ","é":"ए","í":"ई","ó":"ओ","ú":"ऊ"}}
};

regen(ZAI);
regen(GUC);
