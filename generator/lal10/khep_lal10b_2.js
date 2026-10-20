/* lal10-ब खेप-2: grt (गारो/A·chik, SOV suffix-काल) + tiv (Tiv, SVO, Benue-Congo)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- grt गारो (A·chik) ---- */
const GRT={
 code:"grt", labelHi:"गारो", labelEn:"Garo (A·chik)", tts:"en-IN",
 pre:[["आंगनिके","मुझे"],["आंगनि","मेरा"],["नांगनि","आपका"],["नांगको","आपको"],["नांग","आप"],["डोंगआ","है"],["आंगा","मैं"],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"ma", yes:"Hoe", negWord:"ja'a",
 pres:"%Va", past:"%Vaha", fut:"%Vgen", prog:"%Venga", imp:"%Vbo",
 neg:"%Vja", can:"%Vna man'a", want:"%Vna sik'a",
 V:{"होना":"dong","रहना":"dong","करना":"dak","जाना":"re'ang","आना":"re'ba","देना":"on'","लेना":"ra'","खाना":"cha'","पीना":"ring'","देखना":"nik","सुनना":"kna","बोलना":"agan","कहना":"agan","पूछना":"sing'","पढ़ना":"porai","लिखना":"se","सीखना":"ski","सिखाना":"skiat","समझना":"u'i","जानना":"u'i","सोना":"tusi","उठना":"chakat","बैठना":"asong","खड़ा-होना":"chade","चलना":"re'","दौड़ना":"kat","ख़रीदना":"bre","बेचना":"pal","बनाना":"dak","खोलना":"khula dak","बंद-करना":"band dak","रखना":"don","मिलना":"grik","भेजना":"watat","लाना":"ra'ba","धोना":"su'","पकाना":"song","चाहना":"sik'","पसंद":"namnik","माँगना":"bi'","शुरू":"shuru dak","ख़त्म":"khatam dak","पहुँचना":"sok","रुकना":"dongchak","काम-करना":"kam ka'","फोन-करना":"phone ka'","मदद-करना":"dakchak","इंतज़ार":"seng'","कोशिश":"koshish dak","याद":"gisik ra'"},
 LEX:{
  "मैं":"Anga","मैंने":"Anga","मुझे":"Angna","मुझको":"Angna","मेरा":"Angni","मेरे":"Angni","मेरी":"Angni","हम":"Anching","हमें":"Anchingna","हमारा":"Anchingni","हमारे":"Anchingni","हमारी":"Anchingni",
  "आप":"Na'a","आपका":"Na'ni","आपके":"Na'ni","आपकी":"Na'ni","आपको":"Na'na","तुम":"Na'a","तू":"Na'a","तुम्हारा":"Na'ni",
  "वह":"Bia","वे":"Bisong","उसका":"Bini","उसके":"Bini","उसकी":"Bini","उसे":"Bina","उसने":"Bia","उन्हें":"Bisongna","उन्होंने":"Bisong",
  "यह":"Ia","इस":"Ia","ये":"Ia","वो":"Bia","कोई":"sawaba","सब":"pilak","सभी":"pilak","हर":"pilak",
  "अपना":"an'tangni","अपने":"an'tangni","अपनी":"an'tangni",
  "परिवार":"nokdang","माता-पिता":"ama-apa","माता":"ama","माँ":"ama","पिता":"apa","पिताजी":"apa",
  "भाई":"ada","बड़ा भाई":"ada","छोटा भाई":"jong","बहन":"abi","छोटी बहन":"no","बड़ी बहन":"abi",
  "बेटा":"depante","बेटी":"demechik","बच्चा":"bi'sa","बच्चे":"bi'sarang","पत्नी":"jik","पति":"se","दोस्त":"ripeng","दोस्तों":"ripengrang",
  "लोग":"manderang","लोगों":"manderang","आदमी":"me'a","औरत":"me'chik","लड़का":"pante","लड़की":"metra",
  "घर":"nok","गाँव":"song","शहर":"songjinma","नाम":"bimung","काम":"kam","पानी":"chi","खाना":"mi","चावल":"mairong","खेत":"a'ba","रास्ता":"rama","दुकान":"dukan",
  "दिन":"sal","रात":"walo","सुबह":"pring","शाम":"attam","आज":"da'o","कल":"knalo","अभी":"da'o","समय":"somoi",
  "साल":"bilsi","महीना":"ja'","महीने":"ja'","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ghanta","घंटे":"ghanta","मिनट":"minit",
  "पैसा":"tangka","पैसे":"tangka","रुपये":"tangka","रुपया":"tangka","बाज़ार":"bajar","बाजार":"bajar","स्कूल":"iskul","किताब":"kitap","भाषा":"ku'sik","बात":"katta",
  "सवाल":"sing'ani","जवाब":"jobab","मदद":"dakchakani","जगह":"biap","चीज़":"jinis","चीज़ें":"jinisrang","सामान":"saman",
  "अच्छा":"nam'a","अच्छी":"nam'a","अच्छे":"nam'a","ठीक":"nam'a","बड़ा":"dal'a","बड़ी":"dal'a","बड़े":"dal'a","छोटा":"chon'a","छोटी":"chon'a","छोटे":"chon'a",
  "नया":"gital","नई":"gital","नए":"gital","पुराना":"gitcham","बहुत":"namen","थोड़ा":"ise","कम":"komi","ज़्यादा":"bate","जल्दी":"joldi","धीरे":"aste",
  "साफ़":"sapa","गरम":"gorom","ठंडा":"thanda","रोज़":"salante","हमेशा":"sobsomoi","फिर":"aro","बाद":"ja'man","पहले":"skang","यहाँ":"iano","वहाँ":"uano",
  "क्या":"mai","कौन":"sawa","कहाँ":"bano","कब":"basako","कैसे":"maidake","कैसा":"maidake","कैसी":"maidake","क्यों":"maina","कितना":"besik","कितने":"besik","कितनी":"besik",
  "में":"o","पर":"o","से":"oni","को":"na","का":"ni","के":"ni","की":"ni","ने":"","के लिए":"na","लिए":"na","साथ":"baksa","के साथ":"baksa",
  "और":"aro","या":"ba","भी":"ba","तो":"ode","अगर":"jodi","लेकिन":"indiba","कि":"ine",
  "हाँ":"Hoe","जी":"Hoe","नमस्ते":"Salam","धन्यवाद":"Mittela","कृपया":"Doya ka'e","माफ़":"map",
  "किया":"dakaha","गया":"re'angaha","गई":"re'angaha","गए":"re'angaha","हुआ":"ong'aha","हुई":"ong'aha","हुए":"ong'aha","लिया":"ra'aha","दिया":"on'aha","आया":"re'baaha","आई":"re'baaha","मिला":"man'aha","मिली":"man'aha",
  "लो":"ra'bo","दीजिए":"on'bo","कीजिए":"dakbo","बताइए":"aganbo","बताओ":"aganbo","चलो":"re'angbo","चलिए":"re'angbo",
  "बजे":"baje","पास":"sepango","पूरा":"pura","पूरी":"pura","पूरे":"pura","बार":"khep","अब":"da'o","इसे":"iana","इसका":"iani","इसकी":"iani","इसके":"iani","यहीं":"iano","कुछ":"maiba","सारा":"pilak","सारे":"pilak","दूसरा":"gipin","दूसरे":"gipin","दूसरी":"gipin","पहला":"skanggipa","पहली":"skanggipa",
  "गारो":"Garo","है":"donga","हूँ":"donga","हो":"donga","जाँचो":"nikbo","हफ़्ते":"hapta","सिर्फ़":"khali","करना":"dakna","करने":"dakna","सुरक्षित":"nirapad","क्योंकि":"maina ine","कभी":"basakoba","तक":"ona","देर":"deri","शुरू":"shuru","दाम":"dam","भाव":"dam","वाला":"","वाली":"","वाले":"","ही":"",
  "रविवार":"Robibar","सोमवार":"Shombar","गेट":"gate","अगले":"ja'mangipa","अगला":"ja'mangipa","अगली":"ja'mangipa","पिछले":"skanggipa","पिछला":"skanggipa","हाथ":"jak","दिखाइए":"nikatbo","दिखाओ":"nikatbo","किसी":"sawaba","नहीं":"ja'a",
  "सुनो-समझो":"knabo u'ibo","आओ":"re'babo","जाओ":"re'angbo","कर":"dak","संदेश":"khobor","ख़बर":"khobor","कागज़":"kagoj","किलो":"kilo","थैला":"jolong","दूँगा":"on'gen","वापस":"re'pil","त्योहार":"porob","सफ़र":"re'angani","यात्रा":"re'angani","जाने":"re'angna",
  "पता":"thikana","आराम":"aram","आपने":"Na'a","ग़लत":"golti","गलत":"golti","साँचा":"sancha","लीजिए":"ra'bo","नौकरी":"chakri","वेल्डिंग":"welding","खाने":"cha'na","पहनो":"gan'bo","पहनना":"gan'na","डिब्बा":"dabba","बेहतर":"bate nam'a","हमने":"Anching","शब्द":"katta","करो":"dakbo","तारीख़":"tarik","तारीख":"tarik","वाक्य":"bakyo","औज़ार":"aujar","सबूत":"proman","मिलकर":"grike","दूर":"chel'a","पीछे":"ja'mano","चाय":"cha","कौन-सा":"maigipa","कौन-सी":"maigipa","किराया":"bhara","बिजली":"bijli","रसीद":"rosid","बिना":"gri","शिकायत":"nalish","कोर्स":"course",
  "बाहर":"bahira","वेल्डर":"welder","कमरे":"kamra","खुश":"kushi","कपड़े":"kapor","कपड़ा":"kapor","तैयार":"toiyar","अभ्यास":"abhyas","ग़लती":"golti","गलती":"golti","ऐप":"app","बंद":"band","प्लेटफॉर्म":"platform","आने":"re'bana","सही":"thik","आए":"re'baaha","बारे":"bishoyo","मिलाओ":"grikatbo","सीख":"ski","ख़ाली":"khali","असली":"asol","कमीज़":"kamij","गर्व":"gorob","ख़र्च":"khoroch","खर्च":"khoroch","आगे":"mikkango","आसान":"sohoj","ऑटो":"auto","टीम":"team","मज़दूर":"kamgipa","मजदूर":"kamgipa","बनाओ":"dakbo","मुफ़्त":"free","मुफ्त":"free","दस्तख़त":"soi","दस्तखत":"soi","पैकेट":"packet","क़रार":"chukti","करार":"chukti",
  "दर्द":"sa'a","आइए":"re'babo","कॉल":"call","एम्बुलेंस":"ambulance","आग":"wa'al","नकद":"nogod","अंदर":"ning'o","अनुभव":"anubhab","जाँच":"nikani","ओवरटाइम":"overtime","एटीएम":"ATM","खाता":"khata","खुला":"khula","खुले":"khula","पुराने":"gitcham","मज़दूरी":"hajira","मजदूरी":"hajira","आधा":"adha","मालिक":"malik","परीक्षा":"porikkha","करके":"dake","मन":"gisik","ज़रूर":"zorur","जरूर":"zorur","परख":"nikani","अनजान":"u'ijagipa","शांत":"shanto","मज़बूत":"rak'a","मजबूत":"rak'a","हक़":"hok","हक":"hok","छूट":"chhut","हेल्पलाइन":"helpline","पक्का":"pakka","मना":"mana","विदेश":"bidesh","ले":"ra'","प्रति":"proti","गर्मी":"gormi","बारिश":"mikka","मिलेगा":"man'gen","सावधान":"sabdhan"
 },
 translit:{cons:{"'":"'"},vm:{},vi:{}}
};

/* ---- tiv Tiv (Benue, नाइजीरिया; SVO) ---- */
const TIV={
 code:"tiv", labelHi:"तिव", labelEn:"Tiv", tts:"en-NG", svo:true,
 pre:[[" उ "," आप "],[" उ?"," आप?"],[" उ।"," आप।"],[" उ,"," आप,"],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"", yes:"Een", negWord:"ga",
 past:"yange %V", fut:"ua %V", prog:"ngu %V", neg:"%V ga",
 can:"fatyô u %V", want:"soo u %V",
 V:{"होना":"ngu","रहना":"tem","करना":"er","जाना":"za","आना":"va","देना":"na","लेना":"ngohol","खाना":"ya","पीना":"ma","देखना":"nenge","सुनना":"ungwa","बोलना":"lam","कहना":"kaa","पूछना":"pine","पढ़ना":"ôr","लिखना":"nger","सीखना":"hen","सिखाना":"tese","समझना":"kav","जानना":"fa","सोना":"yav","उठना":"mough","बैठना":"tem","खड़ा-होना":"til","चलना":"zende","दौड़ना":"yevese","ख़रीदना":"yam","बेचना":"tee","बनाना":"er","खोलना":"bugh","बंद-करना":"cir","रखना":"ver","मिलना":"zua","भेजना":"tindi","लाना":"va a","धोना":"ese","पकाना":"er kwaghyan","चाहना":"soo","पसंद":"soo","माँगना":"sôn","शुरू":"hii","ख़त्म":"kure","पहुँचना":"ar","रुकना":"tile","काम-करना":"er tom","फोन-करना":"er phone","मदद-करना":"wase","इंतज़ार":"kegh","कोशिश":"nôngo","याद":"umbur"},
 LEX:{
  "मैं":"M","मैंने":"M","मुझे":"mo","मुझको":"mo","मेरा":"wam","मेरे":"wam","मेरी":"wam","हम":"Se","हमें":"se","हमारा":"wase","हमारे":"wase","हमारी":"wase",
  "आप":"We","आपका":"wou","आपके":"wou","आपकी":"wou","आपको":"we","तुम":"We","तू":"We","तुम्हारा":"wou",
  "वह":"Un","वे":"Ve","उसका":"na","उसके":"na","उसकी":"na","उसे":"un","उसने":"Un","उन्हें":"ve","उन्होंने":"Ve",
  "यह":"ne","इस":"ne","ये":"mban","वो":"Un","कोई":"ma or","सब":"cii","सभी":"cii","हर":"hanma",
  "अपना":"","अपने":"","अपनी":"",
  "परिवार":"tsombor","माता-पिता":"ngô man ter","माता":"ngô","माँ":"ngô","पिता":"ter","पिताजी":"ter",
  "भाई":"anmgbian","बड़ा भाई":"anmgbian u tamen","छोटा भाई":"anmgbian u kiriki","बहन":"anmgbian u kwase","छोटी बहन":"anmgbian u kiriki","बड़ी बहन":"anmgbian u tamen",
  "बेटा":"wan u nomso","बेटी":"wan u kwase","बच्चा":"wanye","बच्चे":"ônov","पत्नी":"kwase","पति":"nom","दोस्त":"ijende","दोस्तों":"ijende",
  "लोग":"ior","लोगों":"ior","आदमी":"or","औरत":"kwase","लड़का":"wan u nomso","लड़की":"wankwase",
  "घर":"ya","गाँव":"gar","शहर":"gartamen","नाम":"iti","काम":"tom","पानी":"mnger","खाना":"kwaghyan","चावल":"cinkafa","खेत":"sule","रास्ता":"gbenda","दुकान":"duka",
  "दिन":"iyange","रात":"tugh","सुबह":"pepe","शाम":"aikighe","आज":"nyian","कल":"kper","अभी":"hegen","समय":"shighe",
  "साल":"inyom","महीना":"uwer","महीने":"uwer","हफ़्ता":"sati","सप्ताह":"sati","घंटा":"awa","घंटे":"awa","मिनट":"miniti",
  "पैसा":"inyaregh","पैसे":"inyaregh","रुपये":"rupee","रुपया":"rupee","बाज़ार":"kasua","बाजार":"kasua","स्कूल":"makaranta","किताब":"takerada","भाषा":"zwa","बात":"kwaghôron",
  "सवाल":"mpin","जवाब":"amsa","मदद":"iwasen","जगह":"ijiir","चीज़":"kwagh","चीज़ें":"akaa","सामान":"akaa",
  "अच्छा":"dedoo","अच्छी":"dedoo","अच्छे":"dedoo","ठीक":"dedoo","बड़ा":"tamen","बड़ी":"tamen","बड़े":"tamen","छोटा":"kiriki","छोटी":"kiriki","छोटे":"kiriki",
  "नया":"he","नई":"he","नए":"he","पुराना":"tse","बहुत":"kpishi","थोड़ा":"kpuaa","कम":"kpuaa","ज़्यादा":"hemba","जल्दी":"fefa","धीरे":"legh-legh",
  "साफ़":"wang","गरम":"zafi","ठंडा":"sanyi","रोज़":"hanma iyange","हमेशा":"hanma shighe","फिर":"shi","बाद":"ijime","पहले":"vande","यहाँ":"heen","वहाँ":"her",
  "क्या":"nyi","कौन":"an","कहाँ":"hana","कब":"shighe nyi","कैसे":"nena","कैसा":"nena","कैसी":"nena","क्यों":"er nyi","कितना":"ikyenge nyi","कितने":"ikyenge nyi","कितनी":"ikyenge nyi",
  "में":"ken","पर":"sha","से":"hen","को":"","का":"u","के":"u","की":"u","ने":"","के लिए":"sha ci u","लिए":"sha ci","साथ":"vea","के साथ":"vea",
  "और":"man","या":"shin","भी":"kpaa","तो":"yô","अगर":"aluer","लेकिन":"kpa","कि":"er",
  "हाँ":"Een","जी":"Een","नमस्ते":"Msugh","धन्यवाद":"M sugh u","कृपया":"M sôn we","माफ़":"De mo",
  "किया":"yange er","गया":"yange za","गई":"yange za","गए":"yange za","हुआ":"yange lu","हुई":"yange lu","हुए":"yange lu","लिया":"yange ngohol","दिया":"yange na","आया":"yange va","आई":"yange va","मिला":"yange zua","मिली":"yange zua",
  "लो":"ngohol","दीजिए":"na","कीजिए":"er","बताइए":"kaa","बताओ":"kaa","चलो":"se za","चलिए":"se za",
  "बजे":"baje","पास":"ikyua","पूरा":"vough","पूरी":"vough","पूरे":"vough","बार":"kwa","अब":"hegen","इसे":"ne","इसका":"u ne","इसकी":"u ne","इसके":"u ne","यहीं":"heen","कुछ":"ma kwagh","सारा":"cii","सारे":"cii","दूसरा":"ugen","दूसरे":"ugen","दूसरी":"ugen","पहला":"u hiihii","पहली":"u hiihii",
  "तिव":"Tiv","है":"ngu","हूँ":"ngu","हो":"ngu","जाँचो":"nenge","हफ़्ते":"sati","सिर्फ़":"tseegh","करना":"eren","करने":"eren","सुरक्षित":"ken bem","क्योंकि":"sha ci u","कभी":"mayange","तक":"zan zan","देर":"ica","शुरू":"mhii","दाम":"farashi","भाव":"farashi","वाला":"","वाली":"","वाले":"","ही":"",
  "रविवार":"Lahadi","सोमवार":"Litini","गेट":"gate","अगले":"u he","अगला":"u he","अगली":"u he","पिछले":"u kar","पिछला":"u kar","हाथ":"uwegh","दिखाइए":"tese","दिखाओ":"tese","किसी":"ma or","नहीं":"ga",
  "सुनो-समझो":"ungwa kav","आओ":"va","जाओ":"za","कर":"er","संदेश":"sako","ख़बर":"sako","कागज़":"takarda","किलो":"kilo","थैला":"jaka","दूँगा":"ua na","वापस":"hide","त्योहार":"iniongo","सफ़र":"mzende","यात्रा":"mzende","जाने":"zan",
  "पता":"adireshi","आराम":"mmem","आपने":"We","ग़लत":"bo","गलत":"bo","साँचा":"mold","लीजिए":"ngohol","नौकरी":"tom","वेल्डिंग":"welding","खाने":"yan","पहनो":"wuha","पहनना":"wuha","डिब्बा":"akwati","बेहतर":"hemba doo","हमने":"Se","शब्द":"ishember","करो":"er","तारीख़":"iyange","तारीख":"iyange","वाक्य":"kwaghôron","औज़ार":"ikyagh u tom","सबूत":"ikyav","मिलकर":"imôngo","दूर":"gbing","पीछे":"ijime","चाय":"shayi","कौन-सा":"u nyi","कौन-सी":"u nyi","किराया":"haya","बिजली":"lantarki","रसीद":"rasidi","बिना":"shio","शिकायत":"ishô","कोर्स":"course",
  "बाहर":"sha won","वेल्डर":"welder","कमरे":"daki","खुश":"saan","कपड़े":"akondo","कपड़ा":"akondo","तैयार":"sôr","अभ्यास":"henen","ग़लती":"shami","गलती":"shami","ऐप":"app","बंद":"cir","प्लेटफॉर्म":"platform","आने":"van","सही":"mimi","आए":"yange va","बारे":"sha kwagh","मिलाओ":"zua a","सीख":"hen","ख़ाली":"gbilin","असली":"jim","कमीज़":"riga","गर्व":"ihagh","ख़र्च":"mvihi","खर्च":"mvihi","आगे":"hemen","आसान":"taver ga","ऑटो":"auto","टीम":"team","मज़दूर":"or u tom","मजदूर":"or u tom","बनाओ":"er","मुफ़्त":"kyauta","मुफ्त":"kyauta","दस्तख़त":"sain","दस्तखत":"sain","पैकेट":"packet","क़रार":"ityendezwa","करार":"ityendezwa",
  "दर्द":"angev","आइए":"va","कॉल":"call","एम्बुलेंस":"ambulance","आग":"usu","नकद":"cash","अंदर":"ken atô","अनुभव":"mfe","जाँच":"mnenge","ओवरटाइम":"overtime","एटीएम":"ATM","खाता":"akaunti","खुला":"bugh","खुले":"bugh","पुराने":"tse","मज़दूरी":"albashi","मजदूरी":"albashi","आधा":"rabi","मालिक":"maigida","परीक्षा":"jarrabawa","करके":"er","मन":"ishima","ज़रूर":"sha mimi","जरूर":"sha mimi","परख":"mnenge","अनजान":"fa ga","शांत":"bem","मज़बूत":"taver","मजबूत":"taver","हक़":"ian","हक":"ian","छूट":"rangwame","हेल्पलाइन":"helpline","पक्का":"mimi","मना":"venda","विदेश":"tar ugen","ले":"ngohol","प्रति":"sha","गर्मी":"zafi","बारिश":"ura","मिलेगा":"ua zua","सावधान":"ver ishima"
 },
 translit:{cons:{},vm:{"ô":"ॉ"},vi:{"ô":"ऑ"},vOrder:["ô"]}
};

regen(GRT);
regen(TIV);
