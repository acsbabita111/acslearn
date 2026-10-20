/* lal10-ब खेप-5: dhv (द्रेहु/Drehu, Oceanic, न्यू-कैलेडोनिया लीफ़ू; SVO, असली tense-कण a/hna/troa/kola/tha) +
   nah (नाहुआतल/Nahuatl, Uto-Aztecan, मेक्सिको; SVO-सरलीकृत, असली प्रत्यय o-/-z/-tica/-znequi, amo-निषेध)
   attested-core LEX (eni/eo/tim/uma/oleti · nehua/atl/calli/tequitl/tlazohcamati) + ASCII-सरल वर्तनी
   (dhv ë→e ö→o, nah macron/saltillo छोड़े); Spanish/French loans जहाँ स्वाभाविक; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- dhv द्रेहु (Drehu) ---- */
const DHV={
 code:"dhv", labelHi:"द्रेहु", labelEn:"Drehu", tts:"fr-FR", svo:true,
 pre:[["एनि।","मैं।"],[" एनि "," मैं "],["ओ।","तुम।"],[" ओ "," तुम "],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"", yes:"Eje", negWord:"ohea",
 pres:"a %V", past:"hna %V", fut:"troa %V", prog:"kola %V", neg:"tha %V",
 can:"ijije %V", want:"aja %V",
 V:{"होना":"lapa","रहना":"lapa","करना":"kuca","जाना":"tro","आना":"traqa","देना":"hamen","लेना":"xome","खाना":"xeni","पीना":"iji","देखना":"goeen","सुनना":"dreng","बोलना":"ithanata","कहना":"qaja","पूछना":"sipo","पढ़ना":"e itus","लिखना":"cinyihan","सीखना":"ini","सिखाना":"ini","समझना":"trotrohnin","जानना":"atre","सोना":"mekol","उठना":"cil","बैठना":"lapa","खड़ा-होना":"cil","चलना":"tro","दौड़ना":"tro catr","ख़रीदना":"ito","बेचना":"salem","बनाना":"kuca","खोलना":"thawa","बंद-करना":"thing","रखना":"ame","मिलना":"ohn","भेजना":"upe","लाना":"tro fe","धोना":"siwa","पकाना":"kuca xen","चाहना":"aja","पसंद":"aja","माँगना":"sipo","शुरू":"nyiqan","ख़त्म":"ase","पहुँचना":"traqa","रुकना":"cil","काम-करना":"huliwa","फोन-करना":"kuca phone","मदद-करना":"ixatua","इंतज़ार":"treqen","कोशिश":"tupath","याद":"mekun"},
 LEX:{
  "मैं":"Eni","मैंने":"Eni","मुझे":"koi eni","मुझको":"koi eni","मेरा":"i eni","मेरे":"i eni","मेरी":"i eni","हम":"Ease","हमें":"koi ease","हमने":"Ease","हमारा":"i ease","हमारे":"i ease","हमारी":"i ease",
  "आप":"Eo","आपने":"Eo","तुम":"Eo","तू":"Eo","आपका":"i eo","आपके":"i eo","आपकी":"i eo","आपको":"koi eo","तुम्हारा":"i eo",
  "वह":"Angeic","उसने":"Angeic","वो":"Angeic","उसका":"i angeic","उसके":"i angeic","उसकी":"i angeic","उसे":"koi angeic","वे":"Angatr","उन्होंने":"Angatr","उन्हें":"koi angatr",
  "यह":"Cele","इस":"cele","ये":"cele","इसे":"ej","इसका":"ne ej","इसकी":"ne ej","इसके":"ne ej",
  "कोई":"ketre atr","किसी":"ketre atr","सब":"ase","सभी":"ase","सारा":"ase","सारे":"ase","हर":"nojei","पूरा":"ase","पूरी":"ase","पूरे":"ase",
  "अपना":"","अपने":"","अपनी":"","ही":"","वाला":"","वाली":"","वाले":"","ने":"","को":"","का":"","के":"","की":"",
  "परिवार":"hnepe lapa","माता-पिता":"thine me keme","माता":"thine","माँ":"thine","पिता":"keme","पिताजी":"keme",
  "भाई":"trejin","बड़ा भाई":"trejin ka tru","छोटा भाई":"trejin ka co","बहन":"trejin foe","छोटी बहन":"trejin foe ka co","बड़ी बहन":"trejin foe ka tru",
  "बेटा":"neko trahmany","बेटी":"neko foe","बच्चा":"nekonatr","बच्चे":"ite nekonatr","पत्नी":"foe i angeic","पति":"trahmany i angeic","दोस्त":"sinee","दोस्तों":"ite sinee",
  "लोग":"ite atr","लोगों":"ite atr","आदमी":"trahmany","औरत":"foe","लड़का":"nekonatr trahmany","लड़की":"nekonatr foe",
  "घर":"uma","गाँव":"noj","शहर":"noj ka tru","नाम":"eje","काम":"huliwa","पानी":"tim","खाना":"xen","चावल":"rais","खेत":"garden","रास्ता":"gojeny","दुकान":"magasin",
  "दिन":"drai","रात":"jidr","सुबह":"hmakany","शाम":"hej","आज":"enehila","कल":"elany","अभी":"enehila","अब":"enehila","समय":"hawa",
  "साल":"macatre","महीना":"treu","महीने":"treu","हफ़्ता":"wiik","हफ़्ते":"wiik","सप्ताह":"wiik","घंटा":"hawa","घंटे":"hawa","मिनट":"minit","बजे":"hawa","बार":"ijin",
  "पैसा":"mani","पैसे":"mani","रुपये":"mani","रुपया":"mani","बाज़ार":"maketr","बाजार":"maketr","स्कूल":"uma ne ini","किताब":"itus","कागज़":"pepa","भाषा":"qene","बात":"eweke","शब्द":"eweke","वाक्य":"eweke",
  "सवाल":"hnying","मदद":"ixatua","जगह":"got","चीज़":"eweke","चीज़ें":"ite eweke","सामान":"ite eweke","कुछ":"ketre eweke",
  "अच्छा":"loi","अच्छी":"loi","अच्छे":"loi","ठीक":"loi","सही":"nyipici","असली":"nyipici","पक्का":"nyipici","ग़लत":"ngazo","गलत":"ngazo",
  "बड़ा":"tru","बड़ी":"tru","बड़े":"tru","छोटा":"co","छोटी":"co","छोटे":"co","नया":"hnyipixe","नई":"hnyipixe","नए":"hnyipixe","पुराना":"qatr","पुराने":"qatr",
  "बहुत":"nyimu","थोड़ा":"xalaith","कम":"xalaith","जल्दी":"canga","धीरे":"hmaloi","रोज़":"nojei drai","हमेशा":"palua",
  "फिर":"hmaca","बाद":"thupen","पहले":"eko","पहला":"pane","पहली":"pane","पिछले":"eko","पिछला":"eko","यहाँ":"cele","यहीं":"cele","वहाँ":"cili","दूर":"nany","पास":"easeny","आगे":"qemek","पीछे":"thupen","अंदर":"hnin",
  "क्या":"nemen","कौन":"drei","कौन-सा":"nemen","कौन-सी":"nemen","कहाँ":"ekaa","कब":"eu","कैसे":"tune kaa","कैसा":"tune kaa","कैसी":"tune kaa","क्यों":"pine nemen","कितना":"ije","कितने":"ije","कितनी":"ije",
  "में":"e","पर":"hune","के लिए":"koi","लिए":"koi","साथ":"memin","के साथ":"memin",
  "और":"me","या":"maine","भी":"fe","तो":"hawe","अगर":"maine","लेकिन":"ngo","कि":"laka","क्योंकि":"pine laka","सिर्फ़":"hmekuj","तक":"uti",
  "हाँ":"Eje","जी":"Eje","नहीं":"ohea","नमस्ते":"Bozu","धन्यवाद":"Oleti","कृपया":"sipo","माफ़":"pardon",
  "किया":"hna kuca","गया":"hna tro","गई":"hna tro","गए":"hna tro","हुआ":"hna eje","हुई":"hna eje","हुए":"hna eje","लिया":"hna xome","दिया":"hna hamen","आया":"hna traqa","आई":"hna traqa","आए":"hna traqa","मिला":"hna ohn","मिली":"hna ohn",
  "लो":"xome ju","ले":"xome ju","लीजिए":"xome ju","दीजिए":"hamen ju","कीजिए":"kuca ju","करो":"kuca ju","कर":"kuca ju","करके":"kuca ju","बताइए":"qaja ju","बताओ":"qaja ju","दिखाइए":"amaman ju","दिखाओ":"amaman ju","चलो":"tro ju","चलिए":"tro ju","आओ":"traqa ju","आइए":"traqa ju","जाओ":"tro ju",
  "है":"hetre","हैं":"hetre","हूँ":"hetre","हो":"hetre",
  "द्रेहु":"Drehu","हाथ":"im","आग":"ee","दर्द":"akot","मन":"hni","खुश":"madrin","कपड़ा":"iheetr","कपड़े":"iheetr","चाय":"ti",
  "रविवार":"sabath","सोमवार":"lundi","मज़दूर":"atr ka huliwa","मजदूर":"atr ka huliwa","मालिक":"maseta","परीक्षा":"egzamen","दाम":"pris","भाव":"pris",
  "काम-धंधा":"huliwa","नौकरी":"huliwa","वेतन":"saler","मज़दूरी":"saler","मजदूरी":"saler","ख़र्च":"depans","खर्च":"depans",
  "वेल्डिंग":"welding","वेल्डर":"welder","कोर्स":"course","ऐप":"app","टीम":"team","प्लेटफॉर्म":"platform","ऑटो":"auto","कॉल":"call","एम्बुलेंस":"ambulance","एटीएम":"ATM","ओवरटाइम":"overtime","हेल्पलाइन":"helpline","पैकेट":"packet","गेट":"gate","किलो":"kilo","तारीख़":"drai","तारीख":"drai",
  "आराम":"mano","अनुभव":"ate hnin","जाँच":"wang","परख":"wang","अभ्यास":"ini","सीख":"ini","ग़लती":"ngazo","गलती":"ngazo","शुरुआत":"nyiqan","ख़बर":"maca","संदेश":"maca","पता":"adres","सबूत":"prev","सावधान":"wang hnyawa","ज़रूर":"nyipici","जरूर":"nyipici","शांत":"lapa hnyawa","मज़बूत":"catr","मजबूत":"catr","आसान":"hmaloi","मुफ़्त":"gratis","मुफ्त":"gratis","ख़ाली":"pena","बिना":"pena","विदेश":"ketre noj","त्योहार":"feet","यात्रा":"voyaj","सफ़र":"voyaj","गर्मी":"jo","बारिश":"mani tim","आधा":"demi","दूसरा":"ketre","दूसरे":"ketre","दूसरी":"ketre"
 },
 translit:{cons:{"c":"च","q":"क","x":"स"},vm:{"ë":"े","ö":"ो"},vi:{"ë":"ए","ö":"ओ"}}
};

/* ---- nah नाहुआतल (Nahuatl) ---- */
const NAH={
 code:"nah", labelHi:"नाहुआतल", labelEn:"Nahuatl", tts:"es-MX", svo:true,
 pre:[["नेहुआतल।","मैं।"],[" नेहुआतल "," मैं "],["तेहुआतल।","तुम।"],[" तेहुआतल "," तुम "],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"]],
 decl:"", q:"", yes:"Quema", negWord:"amo",
 past:"o%Vc", fut:"%Vz", prog:"%Vtica", neg:"amo %V",
 can:"hueli %V", want:"%Vznequi",
 V:{"होना":"ca","रहना":"chanti","करना":"chihua","जाना":"yauh","आना":"huala","देना":"maca","लेना":"cui","खाना":"cua","पीना":"coni","देखना":"itta","सुनना":"caqui","बोलना":"tlahtoa","कहना":"ihtoa","पूछना":"tlahtlani","पढ़ना":"amapohua","लिखना":"ihcuiloa","सीखना":"momachtia","सिखाना":"machtia","समझना":"ahcicamati","जानना":"mati","सोना":"cochi","उठना":"mehua","बैठना":"motlalia","खड़ा-होना":"moquetza","चलना":"nehnemi","दौड़ना":"motlaloa","ख़रीदना":"cohua","बेचना":"namaca","बनाना":"chihua","खोलना":"tlapoa","बंद-करना":"tzacua","रखना":"tlalia","मिलना":"nextia","भेजना":"titlani","लाना":"hualhuica","धोना":"paca","पकाना":"tlacualchihua","चाहना":"nequi","पसंद":"nequi","माँगना":"tlahtlani","शुरू":"pehua","ख़त्म":"tlami","पहुँचना":"ahci","रुकना":"moquetza","काम-करना":"tequiti","फोन-करना":"chihua phone","मदद-करना":"palehuia","इंतज़ार":"chia","कोशिश":"yehyecoa","याद":"ilnamiqui"},
 LEX:{
  "मैं":"Nehua","मैंने":"Nehua","मुझे":"nechca nehua","मुझको":"nechca nehua","मेरा":"no","मेरे":"no","मेरी":"no","हम":"Tehuan","हमें":"tehuan","हमने":"Tehuan","हमारा":"to","हमारे":"to","हमारी":"to",
  "आप":"Tehua","आपने":"Tehua","तुम":"Tehua","तू":"Tehua","आपका":"mo","आपके":"mo","आपकी":"mo","आपको":"tehua","तुम्हारा":"mo",
  "वह":"Yehua","उसने":"Yehua","वो":"Yehua","उसका":"i","उसके":"i","उसकी":"i","उसे":"yehua","वे":"Yehuan","उन्होंने":"Yehuan","उन्हें":"yehuan",
  "यह":"Inin","इस":"inin","ये":"inin","इसे":"inin","इसका":"i","इसकी":"i","इसके":"i",
  "कोई":"aca","किसी":"aca","सब":"nochi","सभी":"nochi","सारा":"nochi","सारे":"nochi","हर":"nochi","पूरा":"nochi","पूरी":"nochi","पूरे":"nochi",
  "अपना":"","अपने":"","अपनी":"","ही":"","वाला":"","वाली":"","वाले":"","ने":"","को":"","का":"","के":"","की":"",
  "परिवार":"cencalli","माता-पिता":"nantli ihuan tahtli","माता":"nantli","माँ":"nantli","पिता":"tahtli","पिताजी":"tahtli",
  "भाई":"icniuhtli","बड़ा भाई":"hueyi icniuhtli","छोटा भाई":"tepitzin icniuhtli","बहन":"icniuhtli cihuatl","छोटी बहन":"tepitzin icniuhtli cihuatl","बड़ी बहन":"hueyi icniuhtli cihuatl",
  "बेटा":"conetl","बेटी":"conetl cihuatl","बच्चा":"conetl","बच्चे":"coconeh","पत्नी":"namictli","पति":"namictli","दोस्त":"icniuhtli","दोस्तों":"icniuhtin",
  "लोग":"tlacah","लोगों":"tlacah","आदमी":"tlacatl","औरत":"cihuatl","लड़का":"telpochtli","लड़की":"ichpochtli",
  "घर":"calli","गाँव":"altepetl","शहर":"hueyi altepetl","नाम":"tocaitl","काम":"tequitl","पानी":"atl","खाना":"tlacualli","चावल":"arroz","खेत":"milli","रास्ता":"ohtli","दुकान":"tienda",
  "दिन":"tonalli","रात":"yohualli","सुबह":"cualcan","शाम":"teotlac","आज":"axcan","कल":"moztla","अभी":"axcan","अब":"axcan","समय":"cahuitl",
  "साल":"xihuitl","महीना":"metztli","महीने":"metztli","हफ़्ता":"semana","हफ़्ते":"semana","सप्ताह":"semana","घंटा":"ora","घंटे":"ora","मिनट":"minuto","बजे":"ora","बार":"ceppa",
  "पैसा":"tomin","पैसे":"tomin","रुपये":"tomin","रुपया":"tomin","बाज़ार":"tianquiztli","बाजार":"tianquiztli","स्कूल":"escuela","किताब":"amoxtli","कागज़":"amatl","भाषा":"tlahtolli","बात":"tlahtolli","शब्द":"tlahtolli","वाक्य":"tlahtolli",
  "सवाल":"tlahtlanilli","मदद":"palehuilli","जगह":"canin","चीज़":"tlamantli","चीज़ें":"tlamantli","सामान":"tlamantli","कुछ":"itla",
  "अच्छा":"cualli","अच्छी":"cualli","अच्छे":"cualli","ठीक":"cualli","सही":"melahuac","असली":"melahuac","पक्का":"melahuac","ग़लत":"amo cualli","गलत":"amo cualli",
  "बड़ा":"hueyi","बड़ी":"hueyi","बड़े":"hueyi","छोटा":"tepitzin","छोटी":"tepitzin","छोटे":"tepitzin","नया":"yancuic","नई":"yancuic","नए":"yancuic","पुराना":"huehue","पुराने":"huehue",
  "बहुत":"miac","थोड़ा":"tepitzin","कम":"tepitzin","जल्दी":"iciuhca","धीरे":"yolic","रोज़":"momoztla","हमेशा":"nochipa",
  "फिर":"occeppa","बाद":"zatepan","पहले":"achto","पहला":"achto","पहली":"achto","पिछले":"achto","पिछला":"achto","यहाँ":"nican","यहीं":"nican","वहाँ":"ompa","दूर":"huehca","पास":"nechca","आगे":"ixpan","पीछे":"icuitlapan","अंदर":"ihtic",
  "क्या":"tlen","कौन":"aquin","कौन-सा":"catli","कौन-सी":"catli","कहाँ":"campa","कब":"queman","कैसे":"quenin","कैसा":"quenin","कैसी":"quenin","क्यों":"tleica","कितना":"quezqui","कितने":"quezqui","कितनी":"quezqui",
  "में":"ipan","पर":"ipan","के लिए":"para","लिए":"para","साथ":"ihuan","के साथ":"ihuan",
  "और":"ihuan","या":"nozo","भी":"noihqui","तो":"yeca","अगर":"intla","लेकिन":"yece","कि":"ca","क्योंकि":"pampa","सिर्फ़":"zan","तक":"asta",
  "हाँ":"Quema","जी":"Quema","नहीं":"amo","नमस्ते":"Niltze","धन्यवाद":"Tlazohcamati","कृपया":"por favor","माफ़":"perdon",
  "किया":"ochihuac","गया":"oya","गई":"oya","गए":"oya","हुआ":"omochiuh","हुई":"omochiuh","हुए":"omochiuh","लिया":"ocuic","दिया":"omacac","आया":"ohuala","आई":"ohuala","आए":"ohuala","मिला":"oahcic","मिली":"oahcic",
  "लो":"xicui","ले":"xicui","लीजिए":"xicui","दीजिए":"ximaca","कीजिए":"xichihua","करो":"xichihua","कर":"xichihua","करके":"xichihua","बताइए":"xihtoa","बताओ":"xihtoa","दिखाइए":"xinextia","दिखाओ":"xinextia","चलो":"tiahue","चलिए":"tiahue","आओ":"xihuala","आइए":"xihuala","जाओ":"xiauh",
  "है":"ca","हैं":"ca","हूँ":"ca","हो":"ca",
  "नाहुआतल":"Nahuatl","हाथ":"maitl","आग":"tletl","दर्द":"cococ","मन":"yollotl","खुश":"paqui","कपड़ा":"tzotzoma","कपड़े":"tzotzoma","चाय":"te",
  "रविवार":"domingo","सोमवार":"lunes","मज़दूर":"tequitqui","मजदूर":"tequitqui","मालिक":"teco","परीक्षा":"esamen","दाम":"presio","भाव":"presio",
  "काम-धंधा":"tequitl","नौकरी":"tequitl","वेतन":"tlaxtlahuil","मज़दूरी":"tlaxtlahuil","मजदूरी":"tlaxtlahuil","ख़र्च":"gasto","खर्च":"gasto",
  "वेल्डिंग":"welding","वेल्डर":"welder","कोर्स":"course","ऐप":"app","टीम":"team","प्लेटफॉर्म":"platform","ऑटो":"auto","कॉल":"call","एम्बुलेंस":"ambulance","एटीएम":"ATM","ओवरटाइम":"overtime","हेल्पलाइन":"helpline","पैकेट":"packet","गेट":"gate","किलो":"kilo","तारीख़":"tonalli","तारीख":"tonalli",
  "आराम":"moceui","अनुभव":"esperiensia","जाँच":"rebisa","परख":"rebisa","अभ्यास":"momachtilli","सीख":"momachtilli","ग़लती":"tlahtlacolli","गलती":"tlahtlacolli","शुरुआत":"pehualiztli","ख़बर":"tlahtolli","संदेश":"tlahtolli","पता":"direksion","सबूत":"prueba","सावधान":"cuidado","ज़रूर":"melahuac","जरूर":"melahuac","शांत":"yolic","मज़बूत":"chicahuac","मजबूत":"chicahuac","आसान":"amo ohui","मुफ़्त":"gratis","मुफ्त":"gratis","ख़ाली":"vacio","बिना":"sin","विदेश":"occe altepetl","त्योहार":"ilhuitl","यात्रा":"ohtlatoca","सफ़र":"ohtlatoca","गर्मी":"tona","बारिश":"quiahuitl","आधा":"tlahco","दूसरा":"occe","दूसरे":"occe","दूसरी":"occe"
 },
 translit:{cons:{"x":"श","z":"स","c":"क"},vm:{"á":"ा","é":"े","í":"ी","ó":"ो"},vi:{"á":"आ","é":"ए","í":"ई","ó":"ओ"}}
};

regen(DHV);
regen(NAH);
