/* lal10 खेप-2: nkh (चाखेसांग/Chokri) + nsm (सूमी/Sümi)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी।
   nkh = अंगामी-परिवार cognate (dzü/ki) पर अपनी morphology (va/ve/lo);
   nsm = a-prefix संज्ञाएँ (aki/azü/ana/alu), copula ani, suffix-काल। */
"use strict";
const {regen}=require("./engine.js");

/* ---- nkh चाखेसांग (Chokri) ---- */
const NKH={
 code:"nkh", labelHi:"चाखेसांग", labelEn:"Chokri", tts:"en-IN",
 decl:"va", q:"ma", yes:"Üvi",
 past:"%V ve", fut:"%V lo", prog:"%V ta", neg:"%V mo", negWord:"move",
 can:"%V thsü", want:"%V zho",
 V:{"होना":"ba","रहना":"ba","करना":"süzo","जाना":"vo","आना":"vü","देना":"pezü","लेना":"le","खाना":"zhü","पीना":"kri","देखना":"nguzo","सुनना":"thezo","बोलना":"pusü","कहना":"pusü","पूछना":"kütsüzo","पढ़ना":"leshü nguzo","लिखना":"rüzo","सीखना":"süngu","सिखाना":"süpezü","समझना":"süve","जानना":"süve","सोना":"züta","उठना":"thota","बैठना":"beta","खड़ा-होना":"tozo","चलना":"taza","दौड़ना":"prüzo","ख़रीदना":"krüzo","बेचना":"zezo","बनाना":"süsa","खोलना":"krezo","बंद-करना":"nyizo","रखना":"tazü","मिलना":"ngukrü","भेजना":"pevo","लाना":"levü","धोना":"metshü","पकाना":"zha süzo","चाहना":"zho","पसंद":"zho","माँगना":"kütsü","शुरू":"saza","ख़त्म":"mezo","पहुँचना":"phuzo","रुकना":"bata","काम-करना":"küsie süzo","फोन-करना":"phone süzo","मदद-करना":"madat süzo","इंतज़ार":"nhazo","कोशिश":"süngu-za","याद":"nhiesü"},
 LEX:{
  "मैं":"A","मैंने":"A","मुझे":"A zü","मुझको":"A zü","मेरा":"A","मेरे":"A","मेरी":"A","हम":"Ame","हमें":"Ame zü","हमारा":"Ame","हमारे":"Ame","हमारी":"Ame",
  "आप":"No","आपका":"No","आपके":"No","आपकी":"No","आपको":"No zü","तुम":"No","तू":"No","तुम्हारा":"No",
  "वह":"Pu","वे":"Pumi","उसका":"Pu","उसके":"Pu","उसकी":"Pu","उन्हें":"Pumi zü","उसे":"Pu zü","उसने":"Pu","उन्होंने":"Pumi",
  "यह":"Hi","इस":"Hi","ये":"Hiko","वो":"Pu","कोई":"küpu-mi","सब":"küthe","सभी":"küthe","हर":"küthe",
  "अपना":"pu","अपने":"pu","अपनी":"pu",
  "परिवार":"kimhü","माता-पिता":"azo-apo","माता":"azo","माँ":"azo","पिता":"apo","पिताजी":"apo",
  "भाई":"ashü","बड़ा भाई":"ashü kezü","छोटा भाई":"ashü kechi","बहन":"akhrü","छोटी बहन":"akhrü kechi","बड़ी बहन":"akhrü kezü",
  "बेटा":"ano","बेटी":"ano thenomi","बच्चा":"nochi","बच्चे":"nochiko","पत्नी":"akimi","पति":"akipu","दोस्त":"arü","दोस्तों":"arüko",
  "लोग":"mi","लोगों":"mi","आदमी":"thepumi","औरत":"thenomi","लड़का":"nopu","लड़की":"nopü",
  "घर":"ki","गाँव":"müza","शहर":"müza kezü","नाम":"zha","काम":"küsie","पानी":"dzü","खाना":"zha","चावल":"zha","खेत":"lükhü","रास्ता":"chüra","दुकान":"dukan",
  "दिन":"zunhi","रात":"küthi","सुबह":"kümthe","शाम":"terü","आज":"thünhi","कल":"sodü","अभी":"ketü-i","समय":"tshüpu",
  "साल":"tsha","महीना":"khrü","महीने":"khrü","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"rakadü","पैसे":"rakadü","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"leshü","भाषा":"rü","बात":"rü",
  "सवाल":"kütsü rü","जवाब":"külie rü","मदद":"madat","जगह":"phichü","चीज़":"thedze","चीज़ें":"thedzeko","सामान":"saman",
  "अच्छा":"küvi","अच्छी":"küvi","अच्छे":"küvi","ठीक":"küvi","बड़ा":"kezü","बड़ी":"kezü","बड़े":"kezü","छोटा":"kechi","छोटी":"kechi","छोटे":"kechi",
  "नया":"küsü","नई":"küsü","नए":"küsü","पुराना":"kütsa","बहुत":"the","थोड़ा":"kechi-the","कम":"kechi","ज़्यादा":"the","जल्दी":"jaldi","धीरे":"nhünhü",
  "साफ़":"kümesa","गरम":"kütha","ठंडा":"kücü","रोज़":"zunhi küthe","हमेशा":"zunhi küthe","फिर":"pütü","बाद":"thünu","पहले":"kütsapü","यहाँ":"hinu","वहाँ":"lunu",
  "क्या":"küpu","कौन":"sopu","कहाँ":"kipa i","कब":"küzü i","कैसे":"küdi","कैसा":"küdi","कैसी":"küdi","क्यों":"küpu la","कितना":"küzü","कितने":"küzü","कितनी":"küzü",
  "में":"i","पर":"i","से":"inu","को":"zü","का":"","के":"","की":"","ने":"","के लिए":"la","लिए":"la","साथ":"küle","के साथ":"küle",
  "और":"dü","या":"mho dü","भी":"shi","तो":"la","अगर":"i-la","लेकिन":"zoshi","कि":"dü",
  "हाँ":"Üvi","जी":"Üvi","नमस्ते":"Ükhrüle","धन्यवाद":"Ükhrüle the","कृपया":"Themi vi la","माफ़":"maf"
 },
 translit:{}
};

/* ---- nsm सूमी (Sümi) ---- */
const NSM={
 code:"nsm", labelHi:"सूमी", labelEn:"Sumi", tts:"en-IN",
 decl:"", q:"ke", yes:"Ou",
 past:"%V-va", fut:"%V-ni", prog:"%V-ghe", neg:"%V-mo", negWord:"mo",
 can:"%V-chen", want:"%V-mla",
 V:{"होना":"ani","रहना":"ani","करना":"kughu","जाना":"wo","आना":"ighi","देना":"tsü","लेना":"lu","खाना":"chu","पीना":"ngi","देखना":"khulu","सुनना":"tsütha","बोलना":"pi","कहना":"pi","पूछना":"tsüpu","पढ़ना":"kaku khulu","लिखना":"zütha","सीखना":"süpu","सिखाना":"süpu-tsü","समझना":"ikhi","जानना":"ikhi","सोना":"ipi","उठना":"thokhu","बैठना":"nhapi","खड़ा-होना":"tokhu","चलना":"ache","दौड़ना":"pukhu","ख़रीदना":"kimi","बेचना":"zükha","बनाना":"kughu-sa","खोलना":"phikha","बंद-करना":"süpi","रखना":"takha","मिलना":"kimtsü","भेजना":"tsü-wo","लाना":"lu-ighi","धोना":"metsa","पकाना":"ana kughu","चाहना":"mla","पसंद":"mla","माँगना":"tsüpu","शुरू":"sakha","ख़त्म":"mesü","पहुँचना":"phughu","रुकना":"ani-ta","काम-करना":"amsü kughu","फोन-करना":"phone kughu","मदद-करना":"madat kughu","इंतज़ार":"nemkha","कोशिश":"kughu-khulu","याद":"mesem"},
 LEX:{
  "मैं":"Ni","मैंने":"Ni","मुझे":"Ni lo","मुझको":"Ni lo","मेरा":"Ni","मेरे":"Ni","मेरी":"Ni","हम":"Ningu","हमें":"Ningu lo","हमारा":"Ningu","हमारे":"Ningu","हमारी":"Ningu",
  "आप":"No","आपका":"No","आपके":"No","आपकी":"No","आपको":"No lo","तुम":"No","तू":"No","तुम्हारा":"No",
  "वह":"Pa","वे":"Panongu","उसका":"Pa","उसके":"Pa","उसकी":"Pa","उन्हें":"Panongu lo","उसे":"Pa lo","उसने":"Pa","उन्होंने":"Panongu",
  "यह":"Hipa","इस":"Hipa","ये":"Hiqo","वो":"Pa","कोई":"küpu-timi","सब":"kumtsü","सभी":"kumtsü","हर":"kumtsü",
  "अपना":"pa","अपने":"pa","अपनी":"pa",
  "परिवार":"akibo","माता-पिता":"aza-apu","माता":"aza","माँ":"aza","पिता":"apu","पिताजी":"apu",
  "भाई":"angu","बड़ा भाई":"angu kizhe","छोटा भाई":"angu kiti","बहन":"alimi","छोटी बहन":"alimi kiti","बड़ी बहन":"alimi kizhe",
  "बेटा":"anga","बेटी":"anga totimi","बच्चा":"anga","बच्चे":"angangu","पत्नी":"akinu","पति":"akibu","दोस्त":"ashou","दोस्तों":"ashoungu",
  "लोग":"timi","लोगों":"timi","आदमी":"timi","औरत":"totimi","लड़का":"anga apu","लड़की":"anga totimi",
  "घर":"aki","गाँव":"aghüna","शहर":"aghüna kizhe","नाम":"ayi","काम":"amsü","पानी":"azü","खाना":"ana","चावल":"ana","खेत":"alu","रास्ता":"alen","दुकान":"dukan",
  "दिन":"anhi","रात":"athi","सुबह":"khumtsala","शाम":"anhiza","आज":"tanhi","कल":"asonhi","अभी":"itanhi","समय":"atsü",
  "साल":"akü","महीना":"akhi","महीने":"akhi","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"asen","पैसे":"asen","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"kaku","भाषा":"atsa","बात":"atsa",
  "सवाल":"tsüpu atsa","जवाब":"api atsa","मदद":"madat","जगह":"atema","चीज़":"asoba","चीज़ें":"asobangu","सामान":"saman",
  "अच्छा":"kivi","अच्छी":"kivi","अच्छे":"kivi","ठीक":"kivi","बड़ा":"kizhe","बड़ी":"kizhe","बड़े":"kizhe","छोटा":"kiti","छोटी":"kiti","छोटे":"kiti",
  "नया":"kichi","नई":"kichi","नए":"kichi","पुराना":"kütsa","बहुत":"ashi","थोड़ा":"kiti-ashi","कम":"kiti","ज़्यादा":"ashi","जल्दी":"jaldi","धीरे":"nhanhi",
  "साफ़":"kimsa","गरम":"kütha","ठंडा":"kücü","रोज़":"anhi kumtsü","हमेशा":"anhi kumtsü","फिर":"pütü","बाद":"thinu","पहले":"kütsapu","यहाँ":"hilo","वहाँ":"palo",
  "क्या":"kiu","कौन":"kütimi","कहाँ":"kila lo","कब":"küghi lo","कैसे":"küdi","कैसा":"küdi","कैसी":"küdi","क्यों":"kiu la","कितना":"küghi","कितने":"küghi","कितनी":"küghi",
  "में":"lo","पर":"lo","से":"lono","को":"lo","का":"","के":"","की":"","ने":"","के लिए":"la","लिए":"la","साथ":"ghili","के साथ":"ghili",
  "और":"eno","या":"mho eno","भी":"shi","तो":"la","अगर":"lo-la","लेकिन":"ghashi","कि":"eno",
  "हाँ":"Ou","जी":"Ou","नमस्ते":"Alobo","धन्यवाद":"Alobo ashi","कृपया":"Timi vi la","माफ़":"maf"
 },
 translit:{}
};

const arg=(process.argv[2]||"both").toLowerCase();
if(arg==="nkh"||arg==="both") regen(NKH);
if(arg==="nsm"||arg==="both") regen(NSM);
