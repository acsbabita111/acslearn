/* सुधार-7 खेप-3: kac जिंगपो (Jinghpaw/Kachin, Sal/Tibeto-Burman; काचिन राज्य म्यांमार · युन्नान · अरुणाचल/असम-सिंगफो) — research-आधारित पूर्ण पुनर्लेखन
   ★ जड़-दोष: 13-Oct खेमा-स "tn-WORD" — Setswana-शब्द-भार 22.4% (मशीन-नाप 23-Oct) — इसी फ़ाइल से बंद।
   ★ स्रोत (आभार): Ola Hanson — A Dictionary of the Kachin Language (Rangoon 1906) · Keita Kurabe — A Grammar of Jinghpaw
     (PhD, Kyoto University 2016) व Kachin-language portal (kachinportal.aa-ken.jp — सर्वनाम ngai/nang/shi/anhte, Chyeju kaba sai) ·
     Jinghpaw Common Language Bible (वाक्य-रूप मिलान)।
   व्याकरण: SOV · वाक्यांत ai · भूत sai · भविष्य na ai · निषेध n- · मना hkum · आज्ञा u · प्रश्न i। 🟡 AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");
const build=require("./sudhar7_build.js");
const KAC=build({
 code:"kac", labelHi:"जिंगपो", labelEn:"Jingpho", tts:"en-IN",
 decl:"", q:"i", yes:"Re", negWord:"n re",
 pres:"%V ai", past:"%V sai", fut:"%V na ai", prog:"%V nga ai", neg:"n %V", imp:"%V u", negImp:"hkum %V",
 can:"%V lu", want:"%V mayu",
 V:{"होना":"rai","रहना":"nga","करना":"galaw","जाना":"sa","आना":"sa wa","देना":"ya","लेना":"la","खाना":"sha","पीना":"lu","देखना":"yu","सुनना":"madat","बोलना":"tsun","कहना":"tsun","पूछना":"san","पढ़ना":"hti","लिखना":"ka","सीखना":"sharin","सिखाना":"sharin ya","समझना":"hkam la","जानना":"chye","सोना":"yup","उठना":"rawt","बैठना":"dung","खड़ा-होना":"tsap","चलना":"hkawm","दौड़ना":"gat","ख़रीदना":"mari","बेचना":"dut","बनाना":"galaw","खोलना":"hpaw","बंद-करना":"magap","रखना":"tawn","मिलना":"hkrum","भेजना":"shadun","लाना":"la wa","धोना":"hkrut","पकाना":"shadu","चाहना":"ra","पसंद":"ra","माँगना":"hpyi","शुरू":"hpang","ख़त्म":"ngut","पहुँचना":"du","रुकना":"hkring","काम-करना":"bungli galaw","फोन-करना":"phone galaw","मदद-करना":"garum","इंतज़ार":"la","कोशिश":"chyam","याद":"dum"},
 LEX:{"जिंगपो":"Jinghpaw","मिज़ो":"Mizo"},
 translit:{cons:{"hp":"फ","hk":"ख","ht":"थ","ky":"क्य","gy":"ग्य","py":"प्य","by":"ब्य"},clOrder:["hts","hp","hk","ht","ky","gy","py","by"],vm:{"aw":"ॉ"},vi:{"aw":"ऑ"},vOrder:["aw"]}
},"./sudhar7_kac_concepts.json");
KAC.translit.cons["hts"]="छ";
KAC.translit.words=Object.assign({},require("./sudhar7_words.json")); delete KAC.translit.words["ai"]; /* जिंगपो वाक्यांत-कण ai — "एआई" नहीं */
Object.assign(KAC.LEX,require("./sudhar7_kac_split.json")); /* मिज़ो-समनाम से बने ग़लत-समूह अलग */
regen(KAC);
