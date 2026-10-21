/* लाल10-ह खेप-1: pjt पित्यान्त्यात्यारा · oji ओजिब्वे · lkt लाकोटा (Latin-लिपि, engine-builtin lat2dev)
   + rmt डोमारी (ARBX Perso-Arabic) — चारों हिंदी-clone fake (census 1034)।
   प्रामाणिक-affix भंडार: pjt -nyi/-ngu/-ku काल, -kitja mukuringanyi=want, nyangu/kuli/ngalku/tjiki
   oji ni-/ningii-/ninga-/nindaa-/niwii- उपसर्ग, gaawiin …-sii neg, nibi/miigwech
   lkt wa- 1sg, kte-fut, šni-neg, okíhi-can, wačhíŋ-want, mni/thípi/wašté
   rmt (इंडो-आर्यन!): ama/atu, pani=पानी, kuri=घर, dža-/aw-/xa-/pi-/kar-/lak-/šun-, -ami/-dom काल
   नीति: पक्के-attested only; अनिश्चित=हिंदी-passthrough (Latin-भाषाओं में romanize-मानक)।
   🟡 AI-draft — मूल-वक्ता समीक्षा बाक़ी। */
"use strict";
const {regen}=require("./engine.js");
const E3=require("./khep_lal10e_3.js");
const ARBX=E3.ARBX;
const PRE=[["hetrenyi","हैं"],[" ओ "," वह "],["ओ अपन","वह अपने"],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"],["अंग्रेज़ी","English"]];

/* ---- pjt पित्यान्त्यात्यारा ---- */
const PJT={
 code:"pjt", labelHi:"पित्यान्त्यात्यारा", labelEn:"Pitjantjatjara", tts:"en-US",
 script:"latin", scriptName:"Latin",
 translit:{cons:{"tj":"त्य","ng":"ङ","ny":"न्य","ly":"ल्य"},clOrder:["tj","ng","ny","ly"],vi:{},vm:{},vOrder:[]},
 pre:PRE, yes:"uwa", negWord:"wiya",
 pres:"%Vnyi", past:"%Vngu", fut:"%Vku", prog:"%Vnyi", imp:"%Vma",
 neg:"%Vnytja wiya", can:"%Vku ninti", want:"%Vkitja mukuringanyi",
 V:{"होना":"nyina","रहना":"nyina","करना":"palyal","जाना":"ana","आना":"pitja","देना":"u","लेना":"mantji","खाना":"ngalku","पीना":"tjiki","देखना":"nyanga","सुनना":"kuli","बोलना":"wangka","कहना":"wangka","पूछना":"tjapi","सोना":"ngari","उठना":"pakal","बैठना":"nyina","चलना":"ana","सीखना":"nintiri","जानना":"ninti","मिलना":"tjunguri","लाना":"kati","रखना":"tju","सकना":"ninti","चाहना":"mukuri"},
 LEX:{
  "मैं":"ngayulu","मैंने":"ngayulu","मुझे":"ngayunya","मेरा":"ngayuku","मेरे":"ngayuku","मेरी":"ngayuku",
  "हम":"nganana","हमें":"nganananya","हमने":"nganana","हमारा":"nganampa","हमारे":"nganampa","हमारी":"nganampa",
  "तुम":"nyuntu","तू":"nyuntu","तुम्हें":"nyuntunya","तुमने":"nyuntu","तुम्हारा":"nyuntumpa","तुम्हारे":"nyuntumpa","तुम्हारी":"nyuntumpa",
  "आप":"nyuntu","आपको":"nyuntunya","आपने":"nyuntu","आपका":"nyuntumpa","आपके":"nyuntumpa","आपकी":"nyuntumpa",
  "वह":"paluru","वो":"paluru","वे":"tjana","यह":"nyanga",
  "पानी":"kapi","घर":"ngura","जगह":"ngura","खाना":"mai","आदमी":"wati","औरत":"minyma","बच्चा":"tjitji","बच्चे":"tjitji","लोग":"anangu",
  "अच्छा":"palya","अच्छी":"palya","अच्छे":"palya","ठीक":"palya","बड़ा":"pulka","बड़ी":"pulka","बड़े":"pulka","छोटा":"tjukutjuku","छोटी":"tjukutjuku","छोटे":"tjukutjuku",
  "नहीं":"wiya","हाँ":"uwa","अभी":"kuwari","आज":"kuwari","एक":"kutju","दो":"kutjara","बहुत":"tjuta",
  "क्या":"nyaa","कौन":"ngana","कहाँ":"yaaltji","कब":"yaaltjituwan",
  "पित्यान्त्यात्यारा":"Pitjantjatjara","पित्यान्त्यात्यारा-भाषी":"Anangu"
 }
};

/* ---- oji ओजिब्वे ---- */
const OJI={
 code:"oji", labelHi:"ओजिब्वे", labelEn:"Ojibwe", tts:"en-US",
 script:"latin", scriptName:"Latin",
 translit:{cons:{"zh":"झ़","sh":"श","ch":"च","'":"ऽ"},clOrder:["zh","sh","ch"],vi:{"aa":"आ","ii":"ई","oo":"ऊ","e":"ए"},vm:{"aa":"ा","ii":"ी","oo":"ू","e":"े"},vOrder:["aa","ii","oo"]},
 pre:PRE, yes:"enh", negWord:"gaawiin",
 pres:"ni%V", past:"ningii-%V", fut:"ninga-%V", prog:"ni%V", imp:"%Vn",
 neg:"gaawiin ni%Vsii", can:"nindaa-%V", want:"niwii-%V",
 V:{"होना":"ayaa","रहना":"ayaa","करना":"izhichige","जाना":"izhaa","आना":"bi-izhaa","देना":"miin","लेना":"odaapin","खाना":"wiisini","पीना":"minikwe","देखना":"waabi","सुनना":"noondam","बोलना":"giigido","कहना":"ikido","पूछना":"gagwedwe","सोना":"nibaa","बैठना":"namadabi","चलना":"bimose","सीखना":"gikendaaso","जानना":"gikendam","मिलना":"nakweshkaw","लाना":"biidoon","रखना":"atoon","काम-करना":"anokii","सकना":"gashkitoon","चाहना":"misawendam"},
 LEX:{
  "मैं":"niin","मैंने":"niin","मुझे":"niin","मेरा":"niin","मेरे":"niin","मेरी":"niin",
  "हम":"niinawind","हमें":"niinawind","हमने":"niinawind","हमारा":"niinawind","हमारे":"niinawind","हमारी":"niinawind",
  "तुम":"giin","तू":"giin","तुम्हें":"giin","तुमने":"giin","तुम्हारा":"giin","तुम्हारे":"giin","तुम्हारी":"giin",
  "आप":"giinawaa","आपको":"giinawaa","आपने":"giinawaa","आपका":"giinawaa","आपके":"giinawaa","आपकी":"giinawaa",
  "वह":"wiin","वो":"wiin","वे":"wiinawaa",
  "पानी":"nibi","घर":"waakaa'igan","आदमी":"inini","औरत":"ikwe","बच्चा":"abinoojiinh","बच्चे":"abinoojiinyag","लोग":"anishinaabeg",
  "अच्छा":"mino","अच्छी":"mino","अच्छे":"mino","ठीक":"mino","बड़ा":"gichi","बड़ी":"gichi","बड़े":"gichi",
  "नहीं":"gaawiin","हाँ":"enh","धन्यवाद":"miigwech","शुक्रिया":"miigwech","नमस्ते":"boozhoo",
  "एक":"bezhig","दो":"niizh","तीन":"niswi","क्या":"wegonen","कौन":"awenen","कहाँ":"aandi","कब":"aaniin apii","कैसे":"aaniin",
  "ओजिब्वे":"Ojibwemowin","ओजिब्वे-भाषी":"Anishinaabe"
 }
};

/* ---- lkt लाकोटा ---- */
const LKT={
 code:"lkt", labelHi:"लाकोटा", labelEn:"Lakota", tts:"en-US",
 script:"latin", scriptName:"Latin",
 translit:{cons:{"š":"श","ž":"ज़","ȟ":"ख़","ǧ":"ग़","č":"च","ʼ":"ऽ"},clOrder:["š","ž","ȟ","ǧ","č"],vi:{"á":"आ","é":"ए","í":"ई","ó":"ओ","ú":"ऊ","ŋ":"ं"},vm:{"á":"ा","é":"े","í":"ी","ó":"ो","ú":"ू","ŋ":"ं"},vOrder:["á","é","í","ó","ú"]},
 pre:PRE, yes:"háŋ", negWord:"šni",
 pres:"wa%V", past:"wa%V", fut:"wa%V kte", prog:"wa%V", imp:"%V yo",
 neg:"wa%V šni", can:"wa%V owakihi", want:"wa%V wačhíŋ",
 V:{"होना":"úŋ","रहना":"thí","करना":"ečhúŋ","जाना":"yá","आना":"ú","देना":"kʼu","लेना":"ičú","खाना":"wóte","पीना":"yatkáŋ","देखना":"waŋyáŋka","सुनना":"naȟʼúŋ","बोलना":"iá","कहना":"eyá","पूछना":"iyúŋǧa","सोना":"ištíŋma","बैठना":"íyotaka","चलना":"máni","सीखना":"uŋspéičʼičhiya","जानना":"slolyá","मिलना":"akípha","लाना":"aú","रखना":"égnaka","सकना":"okíhi","चाहना":"čhíŋ"},
 LEX:{
  "मैं":"miyé","मैंने":"miyé","मुझे":"miyé","मेरा":"mitháwa","मेरे":"mitháwa","मेरी":"mitháwa",
  "हम":"uŋkíyepi","हमें":"uŋkíyepi","हमने":"uŋkíyepi","हमारा":"uŋkítȟawapi","हमारे":"uŋkítȟawapi","हमारी":"uŋkítȟawapi",
  "तुम":"niyé","तू":"niyé","तुम्हें":"niyé","तुमने":"niyé","तुम्हारा":"nitháwa","तुम्हारे":"nitháwa","तुम्हारी":"nitháwa",
  "आप":"niyé","आपको":"niyé","आपने":"niyé","आपका":"nitháwa","आपके":"nitháwa","आपकी":"nitháwa",
  "वह":"iyé","वो":"iyé","वे":"iyépi",
  "पानी":"mni","घर":"thípi","आदमी":"wičháša","औरत":"wíŋyaŋ","बच्चा":"wakȟáŋyeža","बच्चे":"wakȟáŋyeža","लोग":"oyáte",
  "अच्छा":"wašté","अच्छी":"wašté","अच्छे":"wašté","ठीक":"wašté","बड़ा":"tȟáŋka","बड़ी":"tȟáŋka","बड़े":"tȟáŋka","छोटा":"čísčila","छोटी":"čísčila","छोटे":"čísčila",
  "नहीं":"hiyá","हाँ":"háŋ","धन्यवाद":"philámayaye","शुक्रिया":"philámayaye","नमस्ते":"háu",
  "एक":"waŋží","दो":"núŋpa","तीन":"yámni","क्या":"táku","कौन":"tuwé","कहाँ":"tuktél","कब":"tóhaŋ","कैसे":"tókhel",
  "लाकोटा":"Lakȟótiyapi","लाकोटा-भाषी":"Lakȟóta"
 }
};

/* ---- rmt डोमारी (ARBX) ---- */
const RMT={
 code:"rmt", labelHi:"डोमारी", labelEn:"Domari", tts:"ur-IN",
 script:"perso-arabic", scriptName:"Perso-Arabic", translit:ARBX,
 pre:PRE, yes:"اِي", negWord:"نَه",
 pres:"%Vامي", past:"%Vدوم", fut:"%Vامي", prog:"%Vامي", imp:"%V",
 neg:"نَه %Vامي", can:"سَکامي %V", want:"مَنگامي %V",
 V:{"होना":"هو","रहना":"رَه","करना":"کَر","जाना":"جا","आना":"اَو","देना":"دے","लेना":"لے","खाना":"خا","पीना":"پي","देखना":"لَک","सुनना":"شُن","बोलना":"بول","कहना":"بول","पूछना":"پُچ","सोना":"سو","उठना":"اُٹ","बैठना":"بَيٹ","चलना":"جا","सीखना":"سيک","जानना":"جان","मिलना":"مِل","लाना":"لِيا","रखना":"رَک","धोना":"دو","ख़रीदना":"کِن","बेचना":"بيچ","माँगना":"مَنگ","सकना":"سَک","चाहना":"مَنگ"},
 LEX:Object.assign({},E3.HAZ.LEX,{
  "मैं":"اَما","मैंने":"اَما","मुझे":"اَمَکے","मेरा":"اَمَکي","मेरे":"اَمَکي","मेरी":"اَمَکي",
  "हम":"اِمے","हमें":"اِمَنکے","हमने":"اِمے","हमारा":"اِمَنکي","हमारे":"اِمَنکي","हमारी":"اِمَنکي",
  "तुम":"اَتو","तू":"اَتو","तुम्हें":"اَتَکے","तुमने":"اَتو","तुम्हारा":"اَتَکي","तुम्हारे":"اَتَکي","तुम्हारी":"اَتَکي",
  "आप":"اَتمے","आपको":"اَتمَنکے","आपने":"اَتمے","आपका":"اَتمَنکي","आपके":"اَتمَنکي","आपकी":"اَتمَنکي",
  "वह":"پَنجي","वो":"پَنجي","वे":"پَندے",
  "पानी":"پاني","घर":"کوري","रोटी":"مَنا","खाना":"مَنا","आदमी":"دوم","लोग":"دومے","औरत":"دومِيا","लड़का":"شونا","लड़की":"شوني","बेटा":"شونا","बेटी":"شوني",
  "अच्छा":"لَچو","अच्छी":"لَچي","अच्छे":"لَچے","ठीक":"لَچو","बड़ा":"تِلّا","बड़ी":"تِلّي","बड़े":"تِلّے","छोटा":"قَشٹوٹا","छोटी":"قَشٹوٹي","छोटे":"قَشٹوٹے",
  "है":"هي","हैं":"هي","हूँ":"هومي","हो":"هوري","नहीं":"نَه","हाँ":"اِي",
  "एक":"اِيکَک","दो":"دي","तीन":"تَرَن","चार":"اِشتار","पाँच":"پَنج",
  "क्या":"کي","कौन":"کون","कहाँ":"کَرا","कब":"کَتَر","क्यों":"کيکے","कैसे":"کيف",
  "डोमारी":"دوماري","डोमारी-भाषी":"دوم",
  "किया":"کَردوم","गया":"جادوم","गई":"جادوم","गए":"جادے","हुआ":"هودوم","आया":"اَودوم","आई":"اَودوم","आए":"اَودے","लिया":"لےدوم","दिया":"دےدوم","मिला":"مِلدوم","मिली":"مِلدوم","ली":"لےدوم","दी":"دےدوم",
  "लो":"لے","ले":"لے","करो":"کَر","कर":"کَر","जाओ":"جا","आओ":"اَو","खाओ":"خا","पियो":"پي","बताओ":"بول","दिखाओ":"لَکَو","सको":"سَکري"
 })
};

module.exports={PJT,OJI,LKT,RMT};
if(require.main===module){
  const M={pjt:PJT,oji:OJI,lkt:LKT,rmt:RMT};
  const w=process.argv[2];
  if(w&&M[w]) regen(M[w]); else Object.values(M).forEach(P=>regen(P));
}
