/* सुधार-7 खेप-3: nus नुएर (Thok Naath, Western Nilotic; दक्षिण सूडान · पश्चिमी इथियोपिया-गम्बेला) — research-आधारित पूर्ण पुनर्लेखन
   ★ जड़-दोष: 13-Oct खेमा-स "tn-WORD/nus-मिसाल" — Setswana-भार 7.5% + मिज़ो (lus) से 109 हूबहू वाक्य + 22 वाक्यों में
     "अंग्रेज़ी" भाषा-नाम (नुएर की जगह) — तीनों इसी फ़ाइल से बंद।
   ★ स्रोत (आभार): Indiana University Libraries — Nuer Field Notes Project (African Studies Collection, 2003):
     593-संज्ञा कोश, क्रिया-कोश, Pedagogical Grammar Pre-Lesson 1 (Maalɛ? · Gɔaaɛ · Wër/Bër · /Cu̲ wä̲ · Ɣä̲n a thï̲n);
     J. P. Crazzolara — Outlines of a Nuer Grammar (1933); Ray Huffman — English-Nuer Dictionary (1929)।
   सरलीकरण: अधो-रेखा (U+0331) हटाई; ä ë ï ö ɛ ɔ ŋ ɣ रखे। V2 क्रम (svo)। 🟡 AI-draft — मूल-वक्ता जाँच बाक़ी। */
"use strict";
const {regen}=require("./engine.js");
const build=require("./sudhar7_build.js");
const NUS=build({
 code:"nus", labelHi:"नुएर", labelEn:"Nuer", tts:"en-IN", svo:true,
 decl:"", q:"", yes:"Ëë", negWord:"yëc",
 past:"cɛ %V", fut:"bi %V", prog:"a %V", neg:"kënɛ %V", negImp:"cu %V",
 can:"bi %V", want:"göör %V",
 V:{"होना":"ɛ","रहना":"ciɛŋ","करना":"lät","जाना":"wä","आना":"bä","देना":"moc","लेना":"naŋ","खाना":"cam","पीना":"math","देखना":"nɛn","सुनना":"liŋ","बोलना":"ruac","कहना":"lar","पूछना":"thiec","पढ़ना":"kuɛn","लिखना":"gɔr","सीखना":"ŋiɛc","सिखाना":"ŋiɛɛc","समझना":"ŋäc","जानना":"ŋäc","सोना":"niɛɛn","उठना":"kɛɛr","बैठना":"nyuur","खड़ा-होना":"cuɔŋ","चलना":"jal","दौड़ना":"riŋ","ख़रीदना":"kɔk","बेचना":"kök","बनाना":"lät","खोलना":"lɛp","बंद-करना":"lɛk","रखना":"lath","मिलना":"jek","भेजना":"jäk","लाना":"nööŋ","धोना":"lak","पकाना":"tɔ̈ɔ̈t","चाहना":"göör","पसंद":"göör","माँगना":"lim","शुरू":"tuɔk","ख़त्म":"thuɔk","पहुँचना":"cop","रुकना":"cuŋ","काम-करना":"lät","फोन-करना":"cɔl phone","मदद-करना":"luäk","इंतज़ार":"lip","कोशिश":"ɣɔn","याद":"tim"},
 LEX:{},
 translit:{cons:{"ŋ":"ङ","ɣ":"ग़","nh":"न्ह","dh":"ध"},clOrder:["nh"],vm:{"ɛ":"े","ɔ":"ॉ","ä":"ा","ë":"े","ï":"ी","ö":"ो","ɛ̈":"े","ɔ̈":"ॉ"},vi:{"ɛ":"ए","ɔ":"ऑ","ä":"आ","ë":"ए","ï":"ई","ö":"ओ","ɛ̈":"ए","ɔ̈":"ऑ"},vOrder:["ɛ̈ɛ̈","ɔ̈ɔ̈","ɛ̈","ɔ̈","ɛɛ","ɔɔ","ää","ëë","öö","ïï","ee","oo","ɛ","ɔ","ä","ë","ï","ö"]}
},"./sudhar7_nus_concepts.json");
NUS.translit.words=Object.assign({},require("./sudhar7_words.json"));
Object.assign(NUS.translit.vm,{"ɛ̈ɛ̈":"े","ɔ̈ɔ̈":"ॉ","ɛɛ":"े","ɔɔ":"ॉ","ää":"ा","ëë":"े","öö":"ो","ïï":"ी","ee":"े","oo":"ो"}); Object.assign(NUS.translit.vi,{"ɛ̈ɛ̈":"ए","ɔ̈ɔ̈":"ऑ","ɛɛ":"ए","ɔɔ":"ऑ","ää":"आ","ëë":"ए","öö":"ओ","ïï":"ई","ee":"ए","oo":"ओ"}); /* दीर्घ-स्वर एक मात्रा */
for(const k of Object.keys(NUS.V)) NUS.V[k]=NUS.V[k].normalize("NFC");
Object.assign(NUS.LEX,require("./sudhar7_nus_split.json")); /* मिज़ो-समनाम से बने ग़लत-समूह अलग */
regen(NUS);
