/* lal10 खेप-4: trp (कोकबोरोक/Kokborok) + pbv (प्नार/Pnar — खासी-परिवार, prefix-काल)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- trp कोकबोरोक (Kokborok) ---- */
const TRP={
 code:"trp", labelHi:"कोकबोरोक", labelEn:"Kokborok", tts:"en-IN",
 decl:"", q:"de", yes:"Ho",
 past:"%V-kha", fut:"%V-nai", prog:"%V-wi", neg:"%V-ya", negWord:"hoya",
 can:"%V-lai", want:"%V-naha",
 pre:[["आंगनिके","मुझे"],["आंगनि","मेरी"],["नुंगको","आपको"],["नुंग","आप"],[" तोंग।"," हैं।"],[" तोंग?"," है?"],[" तोंग "," हैं "]],
 V:{"होना":"tong","रहना":"tong","करना":"khlai","जाना":"thang","आना":"phai","देना":"ri","लेना":"lang","खाना":"cha","पीना":"nung","देखना":"nai","सुनना":"khna","बोलना":"sa","कहना":"sa","पूछना":"sokna","पढ़ना":"pori","लिखना":"sai","सीखना":"solai","सिखाना":"solai-ri","समझना":"buju","जानना":"buju","सोना":"thungjak","उठना":"chora","बैठना":"achak","खड़ा-होना":"chongo","चलना":"salai","दौड़ना":"khat","ख़रीदना":"pen","बेचना":"phal","बनाना":"khlai-sa","खोलना":"kulum","बंद-करना":"bondo khlai","रखना":"tai","मिलना":"logo","भेजना":"rwngo","लाना":"lang-phai","धोना":"su","पकाना":"mai song","चाहना":"naha","पसंद":"naha","माँगना":"sokna","शुरू":"hamjak","ख़त्म":"phuruk","पहुँचना":"bokhlai","रुकना":"tong-ta","काम-करना":"kaham khlai","फोन-करना":"phone khlai","मदद-करना":"madat khlai","इंतज़ार":"naithok tai","कोशिश":"khlai-nai","याद":"kokhrang"},
 LEX:{
  "मैं":"Ang","मैंने":"Ang","मुझे":"Angno","मुझको":"Angno","मेरा":"Ani","मेरे":"Ani","मेरी":"Ani","हम":"Chung","हमें":"Chungno","हमारा":"Chini","हमारे":"Chini","हमारी":"Chini",
  "आप":"Nwng","आपका":"Nini","आपके":"Nini","आपकी":"Nini","आपको":"Nwngno","तुम":"Nwng","तू":"Nwng","तुम्हारा":"Nini",
  "वह":"Bo","वे":"Borok","उसका":"Bini","उसके":"Bini","उसकी":"Bini","उन्हें":"Borokno","उसे":"Bono","उसने":"Bo","उन्होंने":"Borok",
  "यह":"Ebo","इस":"Ebo","ये":"Eborok","वो":"Bo","कोई":"sakhai","सब":"sokol","सभी":"sokol","हर":"sokol",
  "अपना":"ani","अपने":"ani","अपनी":"ani",
  "परिवार":"nokphang","माता-पिता":"ma-pha","माता":"ma","माँ":"ma","पिता":"pha","पिताजी":"pha",
  "भाई":"ta","बड़ा भाई":"ta kotor","छोटा भाई":"ta kisa","बहन":"hanok","छोटी बहन":"hanok kisa","बड़ी बहन":"hanok kotor",
  "बेटा":"sa","बेटी":"sajwk","बच्चा":"sikla","बच्चे":"siklarok","पत्नी":"bihik","पति":"bisai","दोस्त":"logo borok","दोस्तों":"logo borok",
  "लोग":"borok","लोगों":"borok","आदमी":"bwsai","औरत":"bwrwi","लड़का":"sikla sa","लड़की":"sikla sajwk",
  "घर":"nok","गाँव":"kami","शहर":"kami kotor","नाम":"mung","काम":"kaham","पानी":"twi","खाना":"mai","चावल":"mai","खेत":"huk","रास्ता":"lama","दुकान":"dukan",
  "दिन":"sal","रात":"hor","सुबह":"phung","शाम":"sanja","आज":"tini","कल":"agarsal","अभी":"ebatini","समय":"somoi",
  "साल":"bosor","महीना":"tal","महीने":"tal","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"rang","पैसे":"rang","रुपये":"rupi","रुपया":"rupi","बाज़ार":"bazar","बाजार":"bazar","स्कूल":"sokul","किताब":"bijab","भाषा":"kok","बात":"kok",
  "सवाल":"sokna kok","जवाब":"salai kok","मदद":"madat","जगह":"jaga","चीज़":"jinis","चीज़ें":"jinisrok","सामान":"saman",
  "अच्छा":"kaham-ma","अच्छी":"kaham-ma","अच्छे":"kaham-ma","ठीक":"kaham-ma","बड़ा":"kotor","बड़ी":"kotor","बड़े":"kotor","छोटा":"kisa","छोटी":"kisa","छोटे":"kisa",
  "नया":"kwtal","नई":"kwtal","नए":"kwtal","पुराना":"guria","बहुत":"kwchak","थोड़ा":"kisa-kwchak","कम":"kisa","ज़्यादा":"kwchak","जल्दी":"jaldi","धीरे":"lese",
  "साफ़":"kwlwi","गरम":"gwrwm","ठंडा":"kwthwng","रोज़":"sal sokol","हमेशा":"sal sokol","फिर":"abo","बाद":"ulo","पहले":"sigang","यहाँ":"ephai","वहाँ":"ophai",
  "क्या":"tamo","कौन":"sabo","कहाँ":"boro","कब":"bokhali","कैसे":"bohonwi","कैसा":"bohonwi","कैसी":"bohonwi","क्यों":"tamo bagwi","कितना":"bokhrob","कितने":"bokhrob","कितनी":"bokhrob",
  "में":"o","पर":"o","से":"ni","को":"no","का":"","के":"","की":"","ने":"","के लिए":"bagwi","लिए":"bagwi","साथ":"baksa","के साथ":"baksa",
  "और":"bai","या":"mho bai","भी":"bo","तो":"le","अगर":"o-le","लेकिन":"tabo","कि":"bai",
  "हाँ":"Ho","जी":"Ho","नमस्ते":"Khulumkha","धन्यवाद":"Hambai","कृपया":"Kaham naikha","माफ़":"maf"
 },
 translit:{}
};

/* ---- pbv प्नार (Pnar — खासी-परिवार; prefix-काल la/yn/dang/ym) ---- */
const PBV={
 code:"pbv", labelHi:"प्नार", labelEn:"Pnar", tts:"en-IN",
 decl:"", q:"em", yes:"Haoid",
 past:"la %V", fut:"yn %V", prog:"dang %V", neg:"ym %V", negWord:"em",
 can:"lah %V", want:"kwah %V",
 pre:[["नगि जोंग फि","मैं आपको"],["जोंग नगा","मेरी"],["जोंग फि","आपको"],["नगि","मैं"],["फि ","तुम "],["फि?","तुम?"],["फि,","तुम,"],["फि।","तुम।"],[" नगा "," मुझे "],[" डॉन।"," हैं।"],[" डॉन?"," है?"],[" डॉन "," हैं "]],
 V:{"होना":"don","रहना":"shong","करना":"khlam","जाना":"leit","आना":"wan","देना":"ai","लेना":"shim","खाना":"bam","पीना":"dih","देखना":"peit","सुनना":"sngap","बोलना":"kren","कहना":"ong","पूछना":"kylli","पढ़ना":"pule","लिखना":"thoh","सीखना":"hikai","सिखाना":"hikai-ai","समझना":"sngewthuh","जानना":"ithuh","सोना":"thiah","उठना":"kheiñ","बैठना":"shongthait","खड़ा-होना":"ieng","चलना":"iaid","दौड़ना":"mareh","ख़रीदना":"thied","बेचना":"die","बनाना":"shna","खोलना":"plie","बंद-करना":"khang","रखना":"buh","मिलना":"iakynduh","भेजना":"phah","लाना":"wallam","धोना":"sait","पकाना":"shet ja","चाहना":"kwah","पसंद":"kwah","माँगना":"pan","शुरू":"sdang","ख़त्म":"dep","पहुँचना":"poi","रुकना":"sangeh","काम-करना":"trei kam","फोन-करना":"khlam phone","मदद-करना":"khlam madat","इंतज़ार":"ap","कोशिश":"pyrshang","याद":"kynmaw"},
 LEX:{
  "मैं":"Nga","मैंने":"Nga","मुझे":"Ia nga","मुझको":"Ia nga","मेरा":"Jong nga","मेरे":"Jong nga","मेरी":"Jong nga","हम":"Ngi","हमें":"Ia ngi","हमारा":"Jong ngi","हमारे":"Jong ngi","हमारी":"Jong ngi",
  "आप":"Phi","आपका":"Jong phi","आपके":"Jong phi","आपकी":"Jong phi","आपको":"Ia phi","तुम":"Phi","तू":"Phi","तुम्हारा":"Jong phi",
  "वह":"U","वे":"Ki","उसका":"Jong u","उसके":"Jong u","उसकी":"Jong ka","उन्हें":"Ia ki","उसे":"Ia u","उसने":"U","उन्होंने":"Ki",
  "यह":"Kane","इस":"Kane","ये":"Kine","वो":"U","कोई":"uno-uno","सब":"baroh","सभी":"baroh","हर":"baroh",
  "अपना":"lade","अपने":"lade","अपनी":"lade",
  "परिवार":"iing-khun","माता-पिता":"kmie-kpa","माता":"kmie","माँ":"kmie","पिता":"kpa","पिताजी":"kpa",
  "भाई":"para shynrang","बड़ा भाई":"hep para","छोटा भाई":"para rit","बहन":"para kynthei","छोटी बहन":"para kynthei rit","बड़ी बहन":"hep para kynthei",
  "बेटा":"khun shynrang","बेटी":"khun kynthei","बच्चा":"khun","बच्चे":"ki khun","पत्नी":"ka tnga","पति":"u tnga","दोस्त":"paralok","दोस्तों":"ki paralok",
  "लोग":"bru","लोगों":"bru","आदमी":"shynrang","औरत":"kynthei","लड़का":"khynnah shynrang","लड़की":"khynnah kynthei",
  "घर":"iing","गाँव":"shnong","शहर":"shnong heh","नाम":"kyrteng","काम":"kam","पानी":"um","खाना":"ja","चावल":"ja","खेत":"lyngkha","रास्ता":"lynti","दुकान":"dukan",
  "दिन":"sngi","रात":"miet","सुबह":"step","शाम":"janmiet","आज":"mynta","कल":"lashai","अभी":"mynta-mynta","समय":"por",
  "साल":"snem","महीना":"bnai","महीने":"bnai","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"pisa","पैसे":"pisa","रुपये":"rupi","रुपया":"rupi","बाज़ार":"iew","बाजार":"iew","स्कूल":"sokul","किताब":"kot","भाषा":"ktien","बात":"ktien",
  "सवाल":"kylli ktien","जवाब":"jubab","मदद":"madat","जगह":"jaka","चीज़":"mar","चीज़ें":"ki mar","सामान":"saman",
  "अच्छा":"bha","अच्छी":"bha","अच्छे":"bha","ठीक":"bha","बड़ा":"heh","बड़ी":"heh","बड़े":"heh","छोटा":"rit","छोटी":"rit","छोटे":"rit",
  "नया":"thmai","नई":"thmai","नए":"thmai","पुराना":"rim","बहुत":"shibun","थोड़ा":"khyndiat","कम":"duna","ज़्यादा":"shibun","जल्दी":"suki-suki","धीरे":"suki",
  "साफ़":"khuid","गरम":"shit","ठंडा":"khriah","रोज़":"man sngi","हमेशा":"man sngi","फिर":"pat","बाद":"hadien","पहले":"shuwa","यहाँ":"hangne","वहाँ":"hangta",
  "क्या":"aiu","कौन":"uno","कहाँ":"hangno","कब":"lano","कैसे":"kumno","कैसा":"kumno","कैसी":"kumno","क्यों":"balei","कितना":"katno","कितने":"katno","कितनी":"katno",
  "में":"ha","पर":"ha","से":"na","को":"ia","का":"jong","के":"jong","की":"jong","ने":"","के लिए":"na ka bynta","लिए":"na ka bynta","साथ":"ryngkat","के साथ":"ryngkat",
  "और":"bad","या":"ne","भी":"ruh","तो":"te","अगर":"lada","लेकिन":"hinrei","कि":"ba",
  "हाँ":"Haoid","जी":"Haoid","नमस्ते":"Khublei","धन्यवाद":"Khublei shibun","कृपया":"Sngewbha","माफ़":"map"
 },
 translit:{cons:{"ñ":"ञ"}}
};

const arg=(process.argv[2]||"both").toLowerCase();
if(arg==="trp"||arg==="both") regen(TRP);
if(arg==="pbv"||arg==="both") regen(PBV);
