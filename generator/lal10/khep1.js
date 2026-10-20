/* lal10 खेप-1: njm (अंगामी/Tenyidie) + njo (आओ नागा/Chungli Ao)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- njm अंगामी (Tenyidie) ---- */
const NJM={
 code:"njm", labelHi:"अंगामी", labelEn:"Tenyidie", tts:"en-IN",
 decl:"we", q:"ga", yes:"Üü",
 past:"%V", fut:"%V tuo", prog:"%V ba", neg:"%V mo", negWord:"moya",
 can:"%V lhie", want:"%V nei",
 V:{"होना":"ba","रहना":"ba","करना":"chü","जाना":"vo","आना":"vor","देना":"tsü","लेना":"le","खाना":"chi","पीना":"kra","देखना":"ngu","सुनना":"zo-ngu","बोलना":"pu","कहना":"pu","पूछना":"kenieketuo","पढ़ना":"lesho ngu","लिखना":"rei","सीखना":"se-ngu","सिखाना":"se-tsü","समझना":"se","जानना":"se","सोना":"zü","उठना":"tuo","बैठना":"ba","खड़ा-होना":"to","चलना":"ta","दौड़ना":"prie","ख़रीदना":"krü","बेचना":"zie","बनाना":"chü-sa","खोलना":"krie","बंद-करना":"nyi","रखना":"ta-ba","मिलना":"ngu-kelie","भेजना":"tsü-vo","लाना":"le-vor","धोना":"metsa","पकाना":"ja chü","चाहना":"nei","पसंद":"nei","माँगना":"kenie","शुरू":"sa","ख़त्म":"meja","पहुँचना":"phru","रुकना":"ba-ta","काम-करना":"sielie chü","फोन-करना":"phone chü","मदद-करना":"madat chü","इंतज़ार":"nhatuo","कोशिश":"chü-ngu","याद":"nhie-se"},
 LEX:{
  "मैं":"A","मैंने":"A","मुझे":"A zo","मुझको":"A zo","मेरा":"A","मेरे":"A","मेरी":"A","हम":"Uko","हमें":"Uko zo","हमारा":"Uko","हमारे":"Uko","हमारी":"Uko",
  "आप":"No","आपका":"No","आपके":"No","आपकी":"No","आपको":"No zo","तुम":"No","तू":"No","तुम्हारा":"No",
  "वह":"Puo","वे":"Hieko","उसका":"Puo","उसके":"Puo","उसकी":"Puo","उन्हें":"Hieko zo","उसे":"Puo zo","उसने":"Puo","उन्होंने":"Hieko",
  "यह":"Hau","इस":"Hau","ये":"Hako","वो":"Puo","कोई":"kepuo-mia","सब":"kekrei","सभी":"kekrei","हर":"kekrei",
  "अपना":"puo","अपने":"puo","अपनी":"puo",
  "परिवार":"kikru","माता-पिता":"azuo-apuo","माता":"azuo","माँ":"azuo","पिता":"apuo","पिताजी":"apuo",
  "भाई":"ashie","बड़ा भाई":"ashie kezha","छोटा भाई":"ashie kecha","बहन":"akhrie","छोटी बहन":"akhrie kecha","बड़ी बहन":"akhrie kezha",
  "बेटा":"anuo","बेटी":"anuo thenumia","बच्चा":"nuocha","बच्चे":"nuochako","पत्नी":"akimia","पति":"akipuo","दोस्त":"aru","दोस्तों":"aruko",
  "लोग":"mia","लोगों":"mia","आदमी":"thepfumia","औरत":"thenumia","लड़का":"nuopfu","लड़की":"nuopfü",
  "घर":"ki","गाँव":"rüna","शहर":"rükhru","नाम":"za","काम":"sielie","पानी":"dzü","खाना":"ja","चावल":"ja","खेत":"tekhu","रास्ता":"chara","दुकान":"dukan",
  "दिन":"zane","रात":"tazhü","सुबह":"kathie","शाम":"terhuo","आज":"thaniu","कल":"sodi","अभी":"ketuo-nu","समय":"tsiepfu",
  "साल":"tsa","महीना":"khrü","महीने":"khrü","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"rakadi","पैसे":"rakadi","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"lesho","भाषा":"ru","बात":"ru",
  "सवाल":"kenieketuo ru","जवाब":"kaliako ru","मदद":"madat","जगह":"phichü","चीज़":"thedze","चीज़ें":"thedzeko","सामान":"saman",
  "अच्छा":"kevi","अच्छी":"kevi","अच्छे":"kevi","ठीक":"kevi","बड़ा":"kezha","बड़ी":"kezha","बड़े":"kezha","छोटा":"kecha","छोटी":"kecha","छोटे":"kecha",
  "नया":"kesa","नई":"kesa","नए":"kesa","पुराना":"ketsa","बहुत":"tei","थोड़ा":"kecha-tei","कम":"kecha","ज़्यादा":"tei","जल्दी":"jaldi","धीरे":"nhanhi",
  "साफ़":"kemesa","गरम":"ketha","ठंडा":"kecü","रोज़":"zane kekrei","हमेशा":"zane kekrei","फिर":"pete","बाद":"thenu","पहले":"ketsapfü","यहाँ":"hienu","वहाँ":"lunu",
  "क्या":"kepuo","कौन":"sopuo","कहाँ":"kipa nu","कब":"kijü nu","कैसे":"kidi","कैसा":"kidi","कैसी":"kidi","क्यों":"kepuo la","कितना":"kijü","कितने":"kijü","कितनी":"kijü",
  "में":"nu","पर":"nu","से":"nunu","को":"zo","का":"","के":"","की":"","ने":"","के लिए":"la","लिए":"la","साथ":"kele","के साथ":"kele",
  "और":"di","या":"mho di","भी":"shi","तो":"la","अगर":"nu-la","लेकिन":"zoshi","कि":"di",
  "हाँ":"Üü","जी":"Üü","नमस्ते":"Ukhrülie","धन्यवाद":"Ukhrülie tei","कृपया":"Themia vi la","माफ़":"maf"
 },
 translit:{}
};

/* ---- njo आओ नागा (Chungli Ao) ---- */
const NJO={
 code:"njo", labelHi:"आओ नागा", labelEn:"Ao Naga", tts:"en-IN",
 decl:"", q:"kia", yes:"Oh",
 past:"%V-ogo", fut:"%V-tsü", prog:"%V-dang", neg:"%V-mak", negWord:"nükla",
 can:"%V-tet", want:"%V-mulung",
 V:{"होना":"li","रहना":"li","करना":"za","जाना":"au","आना":"aru","देना":"agü","लेना":"ayu","खाना":"chi","पीना":"mezü","देखना":"ani","सुनना":"tangar","बोलना":"shi","कहना":"shi","पूछना":"sentong","पढ़ना":"paru","लिखना":"zülu","सीखना":"süngda","सिखाना":"süngdaka","समझना":"meden","जानना":"meden","सोना":"ip","उठना":"soro","बैठना":"nyim","खड़ा-होना":"tsünglu","चलना":"ao","दौड़ना":"zük","ख़रीदना":"melem","बेचना":"soya","बनाना":"zaka","खोलना":"phila","बंद-करना":"süpa","रखना":"tenzük","मिलना":"ajak","भेजना":"agütsü","लाना":"ayu-aru","धोना":"meshi","पकाना":"chak za","चाहना":"mulung","पसंद":"mulung","माँगना":"sentong","शुरू":"temeshi","ख़त्म":"meso","पहुँचना":"tajung","रुकना":"li-ta","काम-करना":"mesü za","फोन-करना":"phone za","मदद-करना":"madat za","इंतज़ार":"nemtsü","कोशिश":"za-ani","याद":"mesem"},
 LEX:{
  "मैं":"Ni","मैंने":"Ni","मुझे":"Ni dang","मुझको":"Ni dang","मेरा":"Ni","मेरे":"Ni","मेरी":"Ni","हम":"Asen","हमें":"Asen dang","हमारा":"Asen","हमारे":"Asen","हमारी":"Asen",
  "आप":"Na","आपका":"Na","आपके":"Na","आपकी":"Na","आपको":"Na dang","तुम":"Na","तू":"Na","तुम्हारा":"Na",
  "वह":"Pa","वे":"Parenok","उसका":"Pa","उसके":"Pa","उसकी":"Pa","उन्हें":"Parenok dang","उसे":"Pa dang","उसने":"Pa","उन्होंने":"Parenok",
  "यह":"Iba","इस":"Iba","ये":"Ibanok","वो":"Pa","कोई":"shisa","सब":"ajanga","सभी":"ajanga","हर":"ajanga",
  "अपना":"pa","अपने":"pa","अपनी":"pa",
  "परिवार":"kibong","माता-पिता":"otsü-oba","माता":"otsü","माँ":"otsü","पिता":"oba","पिताजी":"oba",
  "भाई":"oti","बड़ा भाई":"oti tazüng","छोटा भाई":"oti tanur","बहन":"ola","छोटी बहन":"ola tanur","बड़ी बहन":"ola tazüng",
  "बेटा":"tanur","बेटी":"tanur tetsür","बच्चा":"tanur","बच्चे":"tanurnok","पत्नी":"kinu","पति":"kibu","दोस्त":"shilem","दोस्तों":"shilemnok",
  "लोग":"nisung","लोगों":"nisung","आदमी":"nisung","औरत":"tetsür","लड़का":"tanur apu","लड़की":"tanur tetsür",
  "घर":"ki","गाँव":"yim","शहर":"yim tazüng","नाम":"nüng","काम":"mesü","पानी":"tzü","खाना":"chak","चावल":"chak","खेत":"alu","रास्ता":"len","दुकान":"dukan",
  "दिन":"anü","रात":"azüng","सुबह":"tanela","शाम":"anüja","आज":"tanü","कल":"asonü","अभी":"itanü","समय":"atsü",
  "साल":"küm","महीना":"ita","महीने":"ita","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"sen","पैसे":"sen","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"kakü","भाषा":"o","बात":"o",
  "सवाल":"sentong o","जवाब":"ashi o","मदद":"madat","जगह":"tema","चीज़":"soba","चीज़ें":"sobanok","सामान":"saman",
  "अच्छा":"tazüng","अच्छी":"tazüng","अच्छे":"tazüng","ठीक":"tazüng","बड़ा":"tazüng","बड़ी":"tazüng","बड़े":"tazüng","छोटा":"tanur","छोटी":"tanur","छोटे":"tanur",
  "नया":"aser-ka","नई":"aser-ka","नए":"aser-ka","पुराना":"alem","बहुत":"nung-ka","थोड़ा":"kecha","कम":"kecha","ज़्यादा":"nung-ka","जल्दी":"jaldi","धीरे":"ayim-ayim",
  "साफ़":"meshia","गरम":"alang","ठंडा":"arem","रोज़":"anü ajanga","हमेशा":"anü ajanga","फिर":"ashi-ka","बाद":"adoka","पहले":"tashi","यहाँ":"iba nung","वहाँ":"chuba nung",
  "क्या":"kechi","कौन":"shir","कहाँ":"kolen nung","कब":"kodang","कैसे":"kocha","कैसा":"kocha","कैसी":"kocha","क्यों":"kechi asoshi","कितना":"koda","कितने":"koda","कितनी":"koda",
  "में":"nung","पर":"nung","से":"nungi","को":"dang","का":"","के":"","की":"","ने":"","के लिए":"asoshi","लिए":"asoshi","साथ":"den","के साथ":"den",
  "और":"aser","या":"mo aser","भी":"ta","तो":"la","अगर":"lir","लेकिन":"taoda","कि":"na",
  "हाँ":"Oh","जी":"Oh","नमस्ते":"Monen","धन्यवाद":"Moang","कृपया":"Temeshi la","माफ़":"maf"
 },
 translit:{vm:{"ü":"ू"},vi:{"ü":"ऊ"}},
 pre:[["असेनोक","हम"],["ओनोक","मेरी"],[" तली"," हैं"],["नुई","आपको"]]
};

const which=process.argv[2]||"both";
if(which==="njm"||which==="both")regen(NJM);
if(which==="njo"||which==="both")regen(NJO);
