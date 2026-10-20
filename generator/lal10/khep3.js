/* lal10 खेप-3: njz (न्यिशी/Nyishi — तानी) + tcz (थाडौ/Thadou — कुकी-चिन)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- njz न्यिशी (Nyishi) ---- */
const NJZ={
 code:"njz", labelHi:"न्यिशी", labelEn:"Nyishi", tts:"en-IN",
 decl:"", q:"re", yes:"Ho",
 past:"%V-pa", fut:"%V-ri", prog:"%V-dung", neg:"%V-ma", negWord:"mama",
 can:"%V-lap", want:"%V-len",
 pre:[["ङुलु माय","मेरी माँ"],["ङुलु बहिन","मेरी बहन"],["ङुलु N","मैं आपको"],["ङुलु","मैं"],[" do।"," हैं।"],[" do?"," है?"],[" N "," आप "],[" N?"," आप?"],[" N,"," आप,"]],
 V:{"होना":"dana","रहना":"dana","करना":"rinam","जाना":"in","आना":"aa","देना":"bi","लेना":"la","खाना":"do","पीना":"tü","देखना":"ka","सुनना":"tat","बोलना":"ban","कहना":"lu","पूछना":"tatlu","पढ़ना":"poriya ka","लिखना":"soi","सीखना":"charap","सिखाना":"charap-bi","समझना":"chin","जानना":"chin","सोना":"yup","उठना":"gorap","बैठना":"düta","खड़ा-होना":"daglu","चलना":"inba","दौड़ना":"jok","ख़रीदना":"rika","बेचना":"pyoka","बनाना":"rinam-sa","खोलना":"koka","बंद-करना":"tumka","रखना":"tüta","मिलना":"kapa","भेजना":"bi-in","लाना":"la-aa","धोना":"haryok","पकाना":"achin rinam","चाहना":"len","पसंद":"len","माँगना":"konam","शुरू":"rila","ख़त्म":"muyap","पहुँचना":"chingka","रुकना":"data","काम-करना":"ridin rinam","फोन-करना":"phone rinam","मदद-करना":"madat rinam","इंतज़ार":"kagap","कोशिश":"rika-ka","याद":"chinyap"},
 LEX:{
  "मैं":"Ngo","मैंने":"Ngo","मुझे":"Ngom","मुझको":"Ngom","मेरा":"Ngo","मेरे":"Ngo","मेरी":"Ngo","हम":"Ngunu","हमें":"Ngunum","हमारा":"Ngunu","हमारे":"Ngunu","हमारी":"Ngunu",
  "आप":"No","आपका":"No","आपके":"No","आपकी":"No","आपको":"Nom","तुम":"No","तू":"No","तुम्हारा":"No",
  "वह":"Mo","वे":"Bulu","उसका":"Mo","उसके":"Mo","उसकी":"Mo","उन्हें":"Bulum","उसे":"Mom","उसने":"Mo","उन्होंने":"Bulu",
  "यह":"Si","इस":"Si","ये":"Silu","वो":"Mo","कोई":"yapa-nyi","सब":"mintung","सभी":"mintung","हर":"mintung",
  "अपना":"ato","अपने":"ato","अपनी":"ato",
  "परिवार":"namnyi","माता-पिता":"ane-abo","माता":"ane","माँ":"ane","पिता":"abo","पिताजी":"abo",
  "भाई":"achi","बड़ा भाई":"achi yachu","छोटा भाई":"achi ajen","बहन":"ame","छोटी बहन":"ame ajen","बड़ी बहन":"ame yachu",
  "बेटा":"ao","बेटी":"ao nyime","बच्चा":"anga","बच्चे":"angalu","पत्नी":"nyime","पति":"nyilo","दोस्त":"ajen","दोस्तों":"ajenlu",
  "लोग":"nyi","लोगों":"nyi","आदमी":"nyilo","औरत":"nyime","लड़का":"anga nyilo","लड़की":"anga nyime",
  "घर":"nam","गाँव":"namgo","शहर":"namgo yachu","नाम":"amin","काम":"ridin","पानी":"isi","खाना":"achin","चावल":"achin","खेत":"rik","रास्ता":"lambo","दुकान":"dukan",
  "दिन":"alo","रात":"ayo","सुबह":"aru","शाम":"alik","आज":"silo","कल":"sapo","अभी":"sido","समय":"adu",
  "साल":"anying","महीना":"polo","महीने":"polo","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"murkho","पैसे":"murkho","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"poriya","भाषा":"agom","बात":"agom",
  "सवाल":"tatlu agom","जवाब":"lupa agom","मदद":"madat","जगह":"mopo","चीज़":"yapa","चीज़ें":"yapalu","सामान":"saman",
  "अच्छा":"alang","अच्छी":"alang","अच्छे":"alang","ठीक":"alang","बड़ा":"yachu","बड़ी":"yachu","बड़े":"yachu","छोटा":"ajen","छोटी":"ajen","छोटे":"ajen",
  "नया":"anu","नई":"anu","नए":"anu","पुराना":"aku","बहुत":"aya","थोड़ा":"ajen-aya","कम":"ajen","ज़्यादा":"aya","जल्दी":"jaldi","धीरे":"lele",
  "साफ़":"asa","गरम":"agu","ठंडा":"achik","रोज़":"alo mintung","हमेशा":"alo mintung","फिर":"lepa","बाद":"koba","पहले":"ako","यहाँ":"solo","वहाँ":"molo",
  "क्या":"yapa","कौन":"yina","कहाँ":"yolo","कब":"yidu","कैसे":"yila","कैसा":"yila","कैसी":"yila","क्यों":"yapa la","कितना":"yidu","कितने":"yidu","कितनी":"yidu",
  "में":"lo","पर":"lo","से":"lokke","को":"m","का":"","के":"","की":"","ने":"","के लिए":"la","लिए":"la","साथ":"lari","के साथ":"lari",
  "और":"la","या":"mho la","भी":"bo","तो":"la","अगर":"lo-la","लेकिन":"dabo","कि":"la",
  "हाँ":"Ho","जी":"Ho","नमस्ते":"Nogo alang","धन्यवाद":"Ayado","कृपया":"Nyi alang la","माफ़":"maf"
 },
 translit:{}
};

/* ---- tcz थाडौ (Thadou) ---- */
const TCZ={
 code:"tcz", labelHi:"थाडौ", labelEn:"Thadou", tts:"en-IN",
 decl:"e", q:"ham", yes:"Henge",
 past:"%V-tai", fut:"%V-ding", prog:"%V-jing", neg:"%V-lou", negWord:"ahilou",
 can:"%V-thei", want:"%V-nom",
 pre:[["हम नांग","मैं आपको"],["नांग","आप"],[" aum।"," हैं।"],[" aum?"," है?"],[" aum "," हैं "]],
 V:{"होना":"ahi","रहना":"um","करना":"bol","जाना":"che","आना":"hung","देना":"pe","लेना":"la","खाना":"neh","पीना":"don","देखना":"mu","सुनना":"ja","बोलना":"sei","कहना":"sei","पूछना":"doh","पढ़ना":"sim","लिखना":"jih","सीखना":"kihil","सिखाना":"hil","समझना":"hethem","जानना":"he","सोना":"imut","उठना":"tho","बैठना":"tou","खड़ा-होना":"ding","चलना":"lamjot","दौड़ना":"lhai","ख़रीदना":"cho","बेचना":"joh","बनाना":"sem","खोलना":"hong","बंद-करना":"kha","रखना":"koi","मिलना":"kimu","भेजना":"sol","लाना":"hinpo","धोना":"sop","पकाना":"an hon","चाहना":"nom","पसंद":"nom","माँगना":"thum","शुरू":"pan","ख़त्म":"chai","पहुँचना":"lhung","रुकना":"um-den","काम-करना":"natoh bol","फोन-करना":"phone bol","मदद-करना":"madat bol","इंतज़ार":"nga","कोशिश":"bol-mu","याद":"geldoh"},
 LEX:{
  "मैं":"Kei","मैंने":"Kei","मुझे":"Keima","मुझको":"Keima","मेरा":"Ka","मेरे":"Ka","मेरी":"Ka","हम":"Eiho","हमें":"Eiho","हमारा":"I","हमारे":"I","हमारी":"I",
  "आप":"Nang","आपका":"Na","आपके":"Na","आपकी":"Na","आपको":"Nangma","तुम":"Nang","तू":"Nang","तुम्हारा":"Na",
  "वह":"Ama","वे":"Amaho","उसका":"A","उसके":"A","उसकी":"A","उन्हें":"Amaho","उसे":"Ama","उसने":"Ama","उन्होंने":"Amaho",
  "यह":"Hiche","इस":"Hiche","ये":"Hicheho","वो":"Ama","कोई":"koitobang","सब":"abonchan","सभी":"abonchan","हर":"abonchan",
  "अपना":"ama","अपने":"ama","अपनी":"ama",
  "परिवार":"insung","माता-पिता":"nule-pa","माता":"nu","माँ":"nu","पिता":"pa","पिताजी":"pa",
  "भाई":"sopi pasal","बड़ा भाई":"u pasal","छोटा भाई":"nao pasal","बहन":"sopi numei","छोटी बहन":"nao numei","बड़ी बहन":"u numei",
  "बेटा":"chapa","बेटी":"chanu","बच्चा":"chapang","बच्चे":"chapangho","पत्नी":"ji numei","पति":"ji pasal","दोस्त":"gol","दोस्तों":"golho",
  "लोग":"mi","लोगों":"mi","आदमी":"pasal","औरत":"numei","लड़का":"chapang pasal","लड़की":"chapang numei",
  "घर":"in","गाँव":"kho","शहर":"kho len","नाम":"min","काम":"natoh","पानी":"tui","खाना":"an","चावल":"an","खेत":"lou","रास्ता":"lampi","दुकान":"dukan",
  "दिन":"nikho","रात":"jan","सुबह":"jingkah","शाम":"nilhah","आज":"tuni","कल":"jing","अभी":"tun","समय":"phat",
  "साल":"kum","महीना":"lha","महीने":"lha","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"sum","पैसे":"sum","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"lekhabu","भाषा":"pao","बात":"thu",
  "सवाल":"thudoh","जवाब":"donbut","मदद":"madat","जगह":"mun","चीज़":"thil","चीज़ें":"thilho","सामान":"saman",
  "अच्छा":"apha","अच्छी":"apha","अच्छे":"apha","ठीक":"apha","बड़ा":"alen","बड़ी":"alen","बड़े":"alen","छोटा":"aneo","छोटी":"aneo","छोटे":"aneo",
  "नया":"athah","नई":"athah","नए":"athah","पुराना":"alui","बहुत":"tamtah","थोड़ा":"themkhat","कम":"lhom","ज़्यादा":"tamtah","जल्दी":"gang","धीरे":"ole",
  "साफ़":"atheng","गरम":"asa","ठंडा":"adap","रोज़":"niseh","हमेशा":"phatin","फिर":"avel","बाद":"nung","पहले":"masang","यहाँ":"hikom","वहाँ":"hokom",
  "क्या":"ipi","कौन":"koi","कहाँ":"hoiya","कब":"itih","कैसे":"iti","कैसा":"iti","कैसी":"iti","क्यों":"ipi jeh","कितना":"ijat","कितने":"ijat","कितनी":"ijat",
  "में":"a","पर":"chunga","से":"akon","को":"","का":"","के":"","की":"","ने":"in","के लिए":"ding","लिए":"ding","साथ":"toh","के साथ":"toh",
  "और":"chule","या":"ahilouleh","भी":"jong","तो":"leh","अगर":"ijemtia","लेकिन":"hinla","कि":"ti",
  "हाँ":"Henge","जी":"Henge","नमस्ते":"Chibai","धन्यवाद":"Kipa thu","कृपया":"Lungset tah in","माफ़":"ngaidam"
 },
 translit:{}
};

const arg=(process.argv[2]||"both").toLowerCase();
if(arg==="njz"||arg==="both") regen(NJZ);
if(arg==="tcz"||arg==="both") regen(TCZ);
