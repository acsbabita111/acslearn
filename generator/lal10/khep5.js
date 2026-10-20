/* lal10 खेप-5: zha (ज़ुआंग/Zhuang — Tai, SVO) + mtq (म्योंग/Muong — Vietic, SVO)
   attested-core LEX + नियमित morphology; AI-draft — मूल-वक्ता जाँच बाक़ी।
   mtq सादे-Latin भाषांतरण-लिपि में (diacritic मूल-वक्ता दौर में)। */
"use strict";
const {regen}=require("./engine.js");

/* ---- zha ज़ुआंग (Zhuang) ---- */
const ZHA={
 code:"zha", labelHi:"ज़ुआंग", labelEn:"Zhuang", tts:"en-IN", svo:true,
 decl:"", q:"lwi", yes:"Dwg",
 past:"%V gvaq", fut:"yaek %V", prog:"cingq %V", neg:"mbouj %V", negWord:"mbouj",
 can:"rox %V", want:"siengj %V",
 pre:[["राउ माय","मेरी माँ"],["राउ बहिन","मेरी बहन"],["राउ म्वंज़","मैं आपको"],["राउ","हम"],["म्वंज़","आप"],[" मि।"," हैं।"],[" मि?"," है?"],[" मि "," हैं "]],
 V:{"होना":"miz","रहना":"youq","करना":"guh","जाना":"bae","आना":"daeuj","देना":"hawj","लेना":"aeu","खाना":"gwn","पीना":"gwn raemx","देखना":"yawj","सुनना":"dingq","बोलना":"gangj","कहना":"gangj","पूछना":"cam","पढ़ना":"doeg saw","लिखना":"sij","सीखना":"hag","सिखाना":"son","समझना":"rox ndaej","जानना":"rox","सोना":"ninz","उठना":"hwnq","बैठना":"naengh","खड़ा-होना":"ndwn","चलना":"byaij","दौड़ना":"buet","ख़रीदना":"cawx","बेचना":"gai","बनाना":"guh-baenz","खोलना":"hai","बंद-करना":"gven","रखना":"cuengq","मिलना":"bungz","भेजना":"soengq","लाना":"daiq daeuj","धोना":"swiq","पकाना":"cawj haeux","चाहना":"siengj","पसंद":"maij","माँगना":"cam aeu","शुरू":"hainduj","ख़त्म":"sat","पहुँचना":"daengz","रुकना":"dingz","काम-करना":"guh hong","फोन-करना":"guh phone","मदद-करना":"guh madat","इंतज़ार":"caj","कोशिश":"sawq","याद":"geiq"},
 LEX:{
  "मैं":"Gou","मैंने":"Gou","मुझे":"Gou","मुझको":"Gou","मेरा":"Gou","मेरे":"Gou","मेरी":"Gou","हम":"Raeuz","हमें":"Raeuz","हमारा":"Raeuz","हमारे":"Raeuz","हमारी":"Raeuz",
  "आप":"Mwngz","आपका":"Mwngz","आपके":"Mwngz","आपकी":"Mwngz","आपको":"Mwngz","तुम":"Mwngz","तू":"Mwngz","तुम्हारा":"Mwngz",
  "वह":"De","वे":"Gyoengqde","उसका":"De","उसके":"De","उसकी":"De","उन्हें":"Gyoengqde","उसे":"De","उसने":"De","उन्होंने":"Gyoengqde",
  "यह":"Neix","इस":"Neix","ये":"Gyoengq neix","वो":"De","कोई":"bouxlawz","सब":"cungj","सभी":"cungj","हर":"moix",
  "अपना":"bonjfaenh","अपने":"bonjfaenh","अपनी":"bonjfaenh",
  "परिवार":"ranzvunz","माता-पिता":"meh-boh","माता":"meh","माँ":"meh","पिता":"boh","पिताजी":"boh",
  "भाई":"beixnuengx sai","बड़ा भाई":"go","छोटा भाई":"nuengx sai","बहन":"beixnuengx mbwk","छोटी बहन":"nuengx mbwk","बड़ी बहन":"cej",
  "बेटा":"lwg sai","बेटी":"lwg mbwk","बच्चा":"lwgnyez","बच्चे":"gyoengq lwgnyez","पत्नी":"yah","पति":"gvan","दोस्त":"baengzyoux","दोस्तों":"gyoengq baengzyoux",
  "लोग":"vunz","लोगों":"vunz","आदमी":"vunzsai","औरत":"vunzmbwk","लड़का":"lwgnyez sai","लड़की":"lwgnyez mbwk",
  "घर":"ranz","गाँव":"mbanj","शहर":"singz","नाम":"mingz","काम":"hong","पानी":"raemx","खाना":"haeux","चावल":"haeux","खेत":"naz","रास्ता":"roen","दुकान":"dukan",
  "दिन":"ngoenz","रात":"haemh","सुबह":"gyanghaet","शाम":"banhaemh","आज":"ngoenzneix","कल":"ngoenzcog","अभी":"seizneix","समय":"seiz",
  "साल":"bi","महीना":"ndwen","महीने":"ndwen","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"ngaenz","पैसे":"ngaenz","रुपये":"rupi","रुपया":"rupi","बाज़ार":"haw","बाजार":"haw","स्कूल":"sokul","किताब":"saw","भाषा":"vah","बात":"vah",
  "सवाल":"vah cam","जवाब":"vah dap","मदद":"madat","जगह":"dieg","चीज़":"doxgaiq","चीज़ें":"doxgaiq","सामान":"saman",
  "अच्छा":"ndei","अच्छी":"ndei","अच्छे":"ndei","ठीक":"ndei","बड़ा":"hung","बड़ी":"hung","बड़े":"hung","छोटा":"iq","छोटी":"iq","छोटे":"iq",
  "नया":"moq","नई":"moq","नए":"moq","पुराना":"gaeuq","बहुत":"haujlai","थोड़ा":"di","कम":"noix","ज़्यादा":"haujlai","जल्दी":"vaiq","धीरे":"menh",
  "साफ़":"seuq","गरम":"ndat","ठंडा":"caep","रोज़":"moix ngoenz","हमेशा":"moix ngoenz","फिर":"caiq","बाद":"doeklaeng","पहले":"gonq","यहाँ":"gizneix","वहाँ":"gizde",
  "क्या":"gijmaz","कौन":"bouxlawz","कहाँ":"gizlawz","कब":"seizlawz","कैसे":"baenzlawz","कैसा":"baenzlawz","कैसी":"baenzlawz","क्यों":"vihmaz","कितना":"geijlai","कितने":"geijlai","कितनी":"geijlai",
  "में":"youq","पर":"youq","से":"daj","को":"hawj","का":"","के":"","की":"","ने":"","के लिए":"vih","लिए":"vih","साथ":"caeuq","के साथ":"caeuq",
  "और":"caeuq","या":"roxnaeuz","भी":"hix","तो":"couh","अगर":"danghnaeuz","लेकिन":"hoeng","कि":"naeuz",
  "हाँ":"Dwg","जी":"Dwg","नमस्ते":"Mwngz ndei","धन्यवाद":"Gyo mbaq","कृपया":"Camz mwngz","माफ़":"maf"
 },
 translit:{vm:{"ae":"ै","oe":"ो","w":"ऺ","wj":"ऺ"},vi:{"ae":"ऐ","oe":"ओ"}}
};

/* ---- mtq म्योंग (Muong — Vietic; सादे-Latin) ---- */
const MTQ={
 code:"mtq", labelHi:"म्योंग", labelEn:"Muong", tts:"en-IN", svo:true,
 decl:"", q:"a", yes:"Phai",
 past:"da %V", fut:"se %V", prog:"dang %V", neg:"khong %V", negWord:"khong",
 can:"%V duoc", want:"muon %V",
 pre:[[" co।"," हैं।"],[" co?"," है?"],[" co "," हैं "],[" N "," आप "],[" N?"," आप?"],[" N,"," आप,"]],
 V:{"होना":"la","रहना":"o","करना":"lam","जाना":"ti","आना":"den","देना":"cho","लेना":"lay","खाना":"an","पीना":"uong","देखना":"nhin","सुनना":"nghe","बोलना":"noi","कहना":"noi","पूछना":"hoi","पढ़ना":"doc","लिखना":"viet","सीखना":"hoc","सिखाना":"day","समझना":"hieu","जानना":"biet","सोना":"ngu","उठना":"day som","बैठना":"ngoi","खड़ा-होना":"dung","चलना":"pay bo","दौड़ना":"chay","ख़रीदना":"mua","बेचना":"ban","बनाना":"lam ra","खोलना":"mo","बंद-करना":"dong","रखना":"de","मिलना":"gap","भेजना":"gui","लाना":"mang den","धोना":"rua","पकाना":"nau com","चाहना":"muon","पसंद":"thich","माँगना":"xin","शुरू":"bat dau","ख़त्म":"xong","पहुँचना":"toi","रुकना":"dung lai","काम-करना":"lam viec","फोन-करना":"lam phone","मदद-करना":"lam madat","इंतज़ार":"cho doi","कोशिश":"thu","याद":"nho"},
 LEX:{
  "मैं":"Ho","मैंने":"Ho","मुझे":"Ho","मुझको":"Ho","मेरा":"cua ho","मेरे":"cua ho","मेरी":"cua ho","हम":"Chung ho","हमें":"Chung ho","हमारा":"cua chung ho","हमारे":"cua chung ho","हमारी":"cua chung ho",
  "आप":"Mi","आपका":"cua mi","आपके":"cua mi","आपकी":"cua mi","आपको":"Mi","तुम":"Mi","तू":"Mi","तुम्हारा":"cua mi",
  "वह":"No","वे":"Chung no","उसका":"cua no","उसके":"cua no","उसकी":"cua no","उन्हें":"Chung no","उसे":"No","उसने":"No","उन्होंने":"Chung no",
  "यह":"Nay","इस":"Nay","ये":"Chung nay","वो":"No","कोई":"ai do","सब":"tat ca","सभी":"tat ca","हर":"moi",
  "अपना":"cua minh","अपने":"cua minh","अपनी":"cua minh",
  "परिवार":"nha cua","माता-पिता":"me-bo","माता":"me","माँ":"me","पिता":"bo","पिताजी":"bo",
  "भाई":"anh em","बड़ा भाई":"anh","छोटा भाई":"em trai","बहन":"chi em","छोटी बहन":"em gai","बड़ी बहन":"chi",
  "बेटा":"con trai","बेटी":"con gai","बच्चा":"con nho","बच्चे":"cac con","पत्नी":"vo","पति":"chong","दोस्त":"ban","दोस्तों":"cac ban",
  "लोग":"nguoi","लोगों":"nguoi","आदमी":"dan ong","औरत":"dan ba","लड़का":"con trai nho","लड़की":"con gai nho",
  "घर":"nha","गाँव":"lang","शहर":"pho","नाम":"ten","काम":"viec","पानी":"dac","खाना":"com","चावल":"com","खेत":"ruong","रास्ता":"duong","दुकान":"dukan",
  "दिन":"ngay","रात":"dem","सुबह":"sang","शाम":"chieu","आज":"hom nay","कल":"ngay mai","अभी":"bay gio","समय":"gio",
  "साल":"nam","महीना":"thang","महीने":"thang","हफ़्ता":"hapta","सप्ताह":"hapta","घंटा":"ganta","घंटे":"ganta","मिनट":"minit",
  "पैसा":"tien","पैसे":"tien","रुपये":"rupi","रुपया":"rupi","बाज़ार":"cho","बाजार":"cho","स्कूल":"sokul","किताब":"sach","भाषा":"tieng","बात":"loi",
  "सवाल":"cau hoi","जवाब":"tra loi","मदद":"madat","जगह":"cho o","चीज़":"do","चीज़ें":"cac do","सामान":"saman",
  "अच्छा":"tot","अच्छी":"tot","अच्छे":"tot","ठीक":"tot","बड़ा":"to","बड़ी":"to","बड़े":"to","छोटा":"nho","छोटी":"nho","छोटे":"nho",
  "नया":"moi","नई":"moi","नए":"moi","पुराना":"cu","बहुत":"nhieu","थोड़ा":"it","कम":"it","ज़्यादा":"nhieu","जल्दी":"nhanh","धीरे":"cham",
  "साफ़":"sach se","गरम":"nong","ठंडा":"lanh","रोज़":"moi ngay","हमेशा":"moi ngay","फिर":"lai","बाद":"sau","पहले":"truoc","यहाँ":"o day","वहाँ":"o do",
  "क्या":"cai gi","कौन":"ai","कहाँ":"o dau","कब":"khi nao","कैसे":"the nao","कैसा":"the nao","कैसी":"the nao","क्यों":"tai sao","कितना":"bao nhieu","कितने":"bao nhieu","कितनी":"bao nhieu",
  "में":"trong","पर":"tren","से":"tu","को":"cho","का":"cua","के":"cua","की":"cua","ने":"","के लिए":"de cho","लिए":"de cho","साथ":"voi","के साथ":"voi",
  "और":"va","या":"hay","भी":"cung","तो":"thi","अगर":"neu","लेकिन":"nhung","कि":"rang",
  "हाँ":"Phai","जी":"Phai","नमस्ते":"Chao mi","धन्यवाद":"Cam on","कृपया":"Xin mi","माफ़":"xin loi"
 },
 translit:{}
};

const arg=(process.argv[2]||"both").toLowerCase();
if(arg==="zha"||arg==="both") regen(ZHA);
if(arg==="mtq"||arg==="both") regen(MTQ);
