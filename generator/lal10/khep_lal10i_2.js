/* लाल10-इ खेप-2: jje जेजू (Hangul, नई HANGX) · ryn अमामी · mvi मियाको · rys याएयामा · yoi योनागुनी
   (चारों kana, JPNX-reuse) · gwr गावरी (Deva) · zgh तमाज़ीग़्त (Tfng, नई TFNX)
   ★ स्रोत-स्तंभ: jje: Yang Changyong, Yang Sejung & William O'Grady — Jejueo: The Language of
   Korea's Jeju Island (Univ. of Hawai'i Press 2020) · ryn/mvi/rys/yoi: Michinori Shimoji & Thomas
   Pellard (eds.) — An Introduction to Ryukyuan Languages (2010); Heinrich, Miyara & Shimoji (eds.) —
   Handbook of the Ryukyuan Languages (De Gruyter 2015); Pellard — Dunan/Ōgami अध्ययन ·
   gwr: Joan L.G. Baart — A Sketch of Kalam Kohistani Grammar (1999), Sounds and Tones (1997);
   Muhammad Zaman Sagar — Gawri Trilingual Conversation Guide (FLI 2011) ·
   zgh: IRCAM (Rabat) — Boukhris, Boumalk, El Moujahid & Souifi, La nouvelle grammaire de l'amazighe (2008)
   🟡 सब AI-draft — मूल-वक्ता समीक्षा बाक़ी। प्रसिद्ध-अभिवादन प्रामाणिक (तांदिगा-तांदि, निーファイユー, फ़ुगरस्सा…)। */
"use strict";
const {regen}=require("./engine.js");
const H2=require("./khep_lal10h_2.js");
const JPNX=H2.JPNX;

/* ---- HANGX: Hangul syllable → देव (decompose-formula; प्रयुक्त-chars से map जनित) ---- */
const HI_L=["ग","क्क","न","द","त्त","र","म","ब","प्प","स","स्स","","ज","ज्ज","च","ख","त","प","ह"];
const HI_V=["ा","ै","्या","्यै","ॅ","े","्यॅ","्ये","ो","्वा","्वै","्वे","्यो","ु","्वॅ","्वे","्वि","्यु","ू","ी","ी"];
const HI_T=["","क्","क्क","क्स","न्","न्ज","न्ह","त्","ल्","ल्क","ल्म","ल्ब","ल्स","ल्त","ल्प","ल्ह","म्","ब्","ब्स","स्","स्स","ङ्","ज्","च्","ख़्","त्","प्","ह्"];
function hang2dev(s){
  let out="";
  for(const ch of s){
    const cp=ch.codePointAt(0);
    if(cp>=0xAC00&&cp<=0xD7A3){
      const i=cp-0xAC00, l=Math.floor(i/588), v=Math.floor((i%588)/28), t=i%28;
      let syl=HI_L[l]; const vm=HI_V[v];
      if(syl==="") syl=(vm[0]==="्")?("इ"+vm.slice(1)):({"ा":"आ","ै":"ऐ","ॅ":"अ","े":"ए","ो":"ओ","ु":"उ","ू":"ऊ","ी":"ई"}[vm]||"अ");
      else syl=(vm==="ा")?syl+"ा":syl+vm;
      out+=syl+HI_T[t];
    } else out+=ch;
  }
  return out;
}
const JAMO={"\u1112":"ह","\u1161":"ा","\u11AB":"न्","\u119E":"ॉ","\u110B":"","\u1169":"ो","\u1173":"्"};
function jamo2dev(seq){let o="";for(const ch of seq)o+=(JAMO[ch]!==undefined?JAMO[ch]:ch);return o.replace(/^ा/,"आ").replace(/^ॉ/,"ऑ");}
function mkHANGX(texts){
  const vi={},vm={},order=[];
  const seqs=new Set();
  for(const t of texts){const mm=String(t).match(/[\u1100-\u11FF\u119E]{2,4}/g); if(mm)mm.forEach(x=>seqs.add(x));}
  for(const sq of seqs){const d=jamo2dev(sq); vi[sq]=d; vm[sq]=d; order.push(sq);}
  const chars=new Set();
  for(const t of texts) for(const ch of String(t)) if(ch.codePointAt(0)>=0xAC00&&ch.codePointAt(0)<=0xD7A3) chars.add(ch);
  for(const ch of chars){ const d=hang2dev(ch); vi[ch]=d; vm[ch]=d; order.push(ch); }
  return {cons:{},clOrder:[],vi,vm,vOrder:order};
}

const PRE=[["hetrenyi","हैं"],[" ओ "," वह "],["ओ अपन","वह अपने"],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"],["अंग्रेज़ी","English"]];

/* ---- jje जेजू ---- */
const JJE_V={"होना":"잇","रहना":"살","करना":"허","जाना":"가","आना":"오","देना":"주","लेना":"받","खाना":"먹","पीना":"마시","देखना":"보","सुनना":"듣","बोलना":"말허","कहना":"골","पूछना":"묻","सोना":"자","उठना":"일어나","बैठना":"앉","सीखना":"배우","जानना":"알","ख़रीदना":"사","बेचना":"팔","मिलना":"만나","रखना":"놓","भेजना":"보내","लाना":"가져오","धोना":"씻","काम-करना":"일허"};
const JJE_LEX={
 "मैं":"나","मैंने":"나","मेरा":"나의","मेरे":"나의","मेरी":"나의",
 "हम":"우리","हमारा":"우리의","हमारे":"우리의","हमारी":"우리의",
 "तुम":"이녁","तू":"이녁","आप":"이녁","वह":"가이","वो":"가이",
 "पानी":"물","घर":"집","नाम":"일름","रोटी":"빵","चावल":"곤밥","आदमी":"하르방","औरत":"할망","दादा":"하르방","दादी":"할망","बेटा":"아덜","बेटी":"똘",
 "एक":"하나","दो":"둘","तीन":"싯",
 "क्या":"무신거","कौन":"누게","कहाँ":"어디","नहीं":"아니","हाँ":"예",
 "नमस्ते":"혼저옵서예","स्वागत":"혼저옵서예","धन्यवाद":"고맙수다","अच्छा":"좋은","अच्छी":"좋은","ठीक":"좋은",
 "जेजू":"제주어","जेजू-भाषी":"제주사름","है":"이우다","हैं":"이우다","हूँ":"이우다"
};
const JJE_PAT={yes:"예",negWord:"아니",pres:"%V엄쪄",past:"%V엇저",fut:"%V쿠다",prog:"%V엄쪄",imp:"%V라",neg:"아니 %V엄쪄",can:"%V 수 잇수다",want:"%V구정 허다"};
const JJE={
 code:"jje", labelHi:"जेजू", labelEn:"Jejueo", tts:"ko-KR",
 script:"hangul-native", scriptName:"Hangul",
 translit:mkHANGX([].concat(Object.values(JJE_V),Object.values(JJE_LEX),Object.values(JJE_PAT))),
 pre:PRE, V:JJE_V, LEX:JJE_LEX,
 yes:JJE_PAT.yes,negWord:JJE_PAT.negWord,pres:JJE_PAT.pres,past:JJE_PAT.past,fut:JJE_PAT.fut,prog:JJE_PAT.prog,imp:JJE_PAT.imp,neg:JJE_PAT.neg,can:JJE_PAT.can,want:JJE_PAT.want
};

/* ---- RYUBASE: चार Ryukyuan (kana, JPNX) ---- */
function ryu(code,labelHi,labelEn,me,water,house,thanks,hello,extraL,extraV,pat){
 return Object.assign({
  code, labelHi, labelEn, tts:"ja-JP",
  script:"kana-native", scriptName:"Kana", translit:JPNX,
  pre:PRE, yes:"うー", negWord:"あらん",
  pres:"%Vん", past:"%Vたん", fut:"%Vん", prog:"%Vとーん", imp:"%Vれ",
  neg:"%Vらん", can:"%Vゆーすん", want:"%Vぶさん",
  V:Object.assign({"होना":"あ","रहना":"を","करना":"す","जाना":"いき","आना":"き","देना":"くぃ","लेना":"とぅ","खाना":"かま","पीना":"ぬま","देखना":"んーじ","सुनना":"ちき","बोलना":"はなさ","कहना":"い","सोना":"にんじ","बैठना":"いちゃ","सीखना":"なら","जानना":"しっち","मिलना":"いちゃ","काम-करना":"わざす"},extraV||{}),
  LEX:Object.assign({
   "मैं":me,"मैंने":me,"मेरा":me+"ぬ","मेरे":me+"ぬ","मेरी":me+"ぬ",
   "पानी":water,"घर":house,"धन्यवाद":thanks,"नमस्ते":hello,"स्वागत":hello,
   "नहीं":"あらん","हाँ":"うー","एक":"てぃーち","दो":"たーち","तीन":"みーち",
   "क्या":"ぬー","कौन":"たー","कहाँ":"まー"
  },extraL||{})
 },pat||{});
}
const RYN=ryu("ryn","अमामी","Amami","わん","みじ","やー","ありがっさまりょうた","うがみんしょーらん",
 {"अमामी":"しまゆむた","अमामी-भाषी":"しまんちゅ","है":"あん","हैं":"あん","हूँ":"あん"});
const MVI=ryu("mvi","मियाको","Miyako","ばん","みず","やー","たんでぃがーたんでぃ","んみゃーち",
 {"मियाको":"みゃーくふつ","मियाको-भाषी":"みゃーくんちゅ","है":"あん","हैं":"あん","हूँ":"あん"});
const RYS=ryu("rys","याएयामा","Yaeyama","ばぬ","みじ","やー","にーふぁいゆー","おーりとーり",
 {"याएयामा":"やいまむに","याएयामा-भाषी":"やいまぴとぅ","है":"あん","हैं":"あん","हूँ":"あん"});
const YOI=ryu("yoi","योनागुनी","Yonaguni","あぬ","みん","だー","ふがらっさ","わーりー",
 {"योनागुनी":"どぅなんむぬい","योनागुनी-भाषी":"どぅなんびとぅ","घर":"だー","है":"あん","हैं":"あん","हूँ":"あん"});

/* ---- gwr गावरी (Deva DEVP; Baart/Sagar-स्रोत; core जानबूझ अति-छोटा) ---- */
const GWR={
 code:"gwr", labelHi:"गावरी", labelEn:"Gawri", tts:"hi-IN",
 script:"devanagari-native", scriptName:"Devanagari", translit:null,
 pre:PRE, yes:"हाँ", negWord:"ना",
 pres:"%Vाम", past:"%Vिल", fut:"%Vाम", prog:"%Vाम", imp:"%V",
 neg:"ना %Vाम", can:"%V बोयाम", want:"%V गोश्आम",
 V:{"होना":"थ","करना":"कर","जाना":"बि","आना":"ए","देना":"दे","लेना":"गिन","खाना":"ख","पीना":"पि","देखना":"चे","सुनना":"सुण","कहना":"मन"},
 LEX:{"मैं":"मा","मैंने":"मा","तुम":"तु","तू":"तु","नहीं":"ना","हाँ":"हाँ","एक":"अक","दो":"दू","गावरी":"गावरी","गावरी-भाषी":"गावरी"}
};

/* ---- zgh तमाज़ीग़्त (TFNX h_1-reuse? नहीं — स्थानीय) ---- */
const TFC={"ⴱ":"ब","ⴳ":"ग","ⴷ":"द","ⴹ":"द","ⴼ":"फ़","ⴽ":"क","ⵀ":"ह","ⵃ":"ह","ⵄ":"अ","ⵅ":"ख़","ⵇ":"क़","ⵊ":"ज","ⵍ":"ल","ⵎ":"म","ⵏ":"न","ⵒ":"प","ⵔ":"र","ⵕ":"र","ⵖ":"ग़","ⵙ":"स","ⵚ":"स","ⵛ":"श","ⵜ":"त","ⵟ":"त","ⵡ":"व","ⵢ":"य","ⵣ":"ज़","ⵥ":"ज़","ⵯ":""};
const TFVi={"ⴰ":"अ","ⴻ":"ए","ⵉ":"इ","ⵓ":"उ"};
const TFVm={"ⴰ":"ा","ⴻ":"े","ⵉ":"ि","ⵓ":"ु"};
const TFNX={cons:{},clOrder:[],vi:Object.assign({},TFC,TFVi),vm:Object.assign({},TFC,TFVm),
 vOrder:Object.keys(TFVi).concat(Object.keys(TFC))};
const ZGH={
 code:"zgh", labelHi:"तमाज़ीग़्त", labelEn:"Tamazight", tts:"ar-MA",
 script:"tifinagh-native", scriptName:"Tifinagh", translit:TFNX,
 pre:PRE, yes:"ⵢⴰⵀ", negWord:"ⵓⵔ",
 pres:"%Vⵖ", past:"%Vⵖ", fut:"ⴰⴷ %Vⵖ", prog:"%Vⵖ", imp:"%V",
 neg:"ⵓⵔ %Vⵖ", can:"ⵣⵎⵔⵖ ⴰⴷ %Vⵖ", want:"ⵔⵉⵖ ⴰⴷ %Vⵖ",
 V:{"होना":"ⴳ","रहना":"ⵇⵇⵉⵎ","करना":"ⵙⴽⵔ","जाना":"ⴷⴷⵓ","आना":"ⴰⵛⴽ","देना":"ⴼⴽ","लेना":"ⴰⵎⵥ","खाना":"ⵛⵛ","पीना":"ⵙⵓ","देखना":"ⵥⵔ","सुनना":"ⵙⵍⵍ","बोलना":"ⵙⴰⵡⵍ","कहना":"ⵉⵏⵉ","पूछना":"ⵙⵇⵙⴰ","सोना":"ⴳⵏ","बैठना":"ⵇⵇⵉⵎ","सीखना":"ⵍⵎⴷ","जानना":"ⵙⵙⵏ","ख़रीदना":"ⵙⵖ","बेचना":"ⵣⵣⵏⵣ","मिलना":"ⵎⵍⵉⵍ","रखना":"ⵙⵔⵙ","भेजना":"ⴰⵣⵏ","लाना":"ⴰⵡⵉ","धोना":"ⵙⵉⵔⴷ","काम-करना":"ⵅⴷⵎ"},
 LEX:{
  "मैं":"ⵏⴻⴽⴽ","मैंने":"ⵏⴻⴽⴽ","मेरा":"ⵉⵏⵓ","मेरे":"ⵉⵏⵓ","मेरी":"ⵉⵏⵓ",
  "हम":"ⵏⵓⴽⵏⵉ","हमारा":"ⵏⵏⵖ","हमारे":"ⵏⵏⵖ","हमारी":"ⵏⵏⵖ",
  "तुम":"ⴽⴻⵢⵢ","तू":"ⴽⴻⵢⵢ","आप":"ⴽⵓⵏⵏⵉ","वह":"ⵏⴻⵜⵜⴰ","वो":"ⵏⴻⵜⵜⴰ",
  "पानी":"ⴰⵎⴰⵏ","घर":"ⵜⵉⴳⴻⵎⵎⵉ","गाँव":"ⵜⴰⴷⴷⴰⵔⵜ","रोटी":"ⴰⵖⵔⵓⵎ","आदमी":"ⴰⵔⴳⴰⵣ","औरत":"ⵜⴰⵎⵖⴰⵔⵜ",
  "एक":"ⵢⴰⵏ","दो":"ⵙⵉⵏ","तीन":"ⴽⵕⴰⴹ",
  "क्या":"ⵎⴰ","कौन":"ⵎⴰⵢ","कहाँ":"ⵎⴰⵏⵉ","नहीं":"ⵓⵀⵓ","हाँ":"ⵢⴰⵀ",
  "नमस्ते":"ⴰⵣⵓⵍ","धन्यवाद":"ⵜⴰⵏⴻⵎⵎⵉⵔⵜ","अच्छा":"ⵉⴼⵓⵍⴽⵉ","अच्छी":"ⵉⴼⵓⵍⴽⵉ","ठीक":"ⵉⴼⵓⵍⴽⵉ",
  "तमाज़ीग़्त":"ⵜⴰⵎⴰⵣⵉⵖⵜ","तमाज़ीग़्त-भाषी":"ⴰⵎⴰⵣⵉⵖ","है":"ⵉⴳⴰ","हैं":"ⴳⴰⵏ","हूँ":"ⴳⵉⵖ"
 }
};


/* ---- ध्वनि-identity ---- */
const addIdent=H2.addIdent, D2J=H2.D2J;
const T_C={"क":"ⴽ","ख":"ⵅ","ग":"ⴳ","घ":"ⴳ","च":"ⵛ","छ":"ⵛ","ज":"ⵊ","झ":"ⵊ","ट":"ⵟ","ठ":"ⵟ","ड":"ⴹ","ढ":"ⴹ","ण":"ⵏ","त":"ⵜ","थ":"ⵜ","द":"ⴷ","ध":"ⴷ","न":"ⵏ","प":"ⵒ","फ":"ⴼ","ब":"ⴱ","भ":"ⴱ","म":"ⵎ","य":"ⵢ","र":"ⵔ","ल":"ⵍ","व":"ⵡ","श":"ⵛ","ष":"ⵛ","स":"ⵙ","ह":"ⵀ","ज़":"ⵣ","फ़":"ⴼ","क़":"ⵇ","ख़":"ⵅ","ग़":"ⵖ","ड़":"ⵔ","ढ़":"ⵔ"};
const T_V={"ा":"ⴰ","ि":"ⵉ","ी":"ⵉ","ु":"ⵓ","ू":"ⵓ","े":"ⴻ","ै":"ⴻ","ो":"ⵓ","ौ":"ⵓ","ं":"ⵏ","ँ":"ⵏ","्":"","ॉ":"ⴰ"};
const T_I={"अ":"ⴰ","आ":"ⴰ","इ":"ⵉ","ई":"ⵉ","उ":"ⵓ","ऊ":"ⵓ","ए":"ⴻ","ऐ":"ⴻ","ओ":"ⵓ","औ":"ⵓ"};
const preD=s=>String(s).normalize("NFC").replace(/\u093C/g,"").replace(/\u0943/g,"\u094D\u0930\u093F").replace(/ऋ/g,"रि").replace(/\u0944/g,"\u094D\u0930\u0940").replace(/ः/g,"ह").replace(/ऽ/g,"").replace(/ॐ/g,"ओम").replace(/ऍ/g,"ए").replace(/\u0945/g,"\u0947").replace(/ऑ/g,"ओ").replace(/ॲ/g,"अ").replace(/ऒ/g,"ओ").replace(/ऎ/g,"ए").replace(/ऴ/g,"ल").replace(/ऱ/g,"र").replace(/ॠ/g,"री").replace(/[\u0962\u0963\u0951\u0952]/g,"");
function D2T(t){t=preD(t);t=String(t).normalize("NFC");let o="";for(const ch of String(t)){ if(ch==="\u093C")continue; if(T_I[ch]!==undefined)o+=T_I[ch]; else if(T_C[ch]!==undefined)o+=T_C[ch]+"ⴰ"; else if(T_V[ch]!==undefined){o=o.replace(/ⴰ$/,"");o+=T_V[ch];} else if(!/[\u0900-\u097F]/.test(ch)) o+=ch; }return o;}
const HL_INV={"ग":0,"क":15,"क़":0,"ख":15,"ख़":15,"न":2,"द":3,"ध":3,"ड":3,"ढ":3,"त":16,"थ":16,"ट":16,"ठ":16,"र":5,"ड़":5,"ढ़":5,"म":6,"ब":7,"भ":7,"स":9,"श":9,"ष":9,"ज":12,"ज़":12,"झ":12,"च":14,"छ":14,"प":17,"फ":17,"फ़":17,"ह":18,"घ":0,"ल":5,"व":7,"य":11,"ण":2};
const HV_INV={"ा":0,"ि":20,"ी":20,"ु":13,"ू":18,"े":5,"ै":1,"ो":8,"ौ":8,"ॉ":4};
const HT_INV={"क":1,"न":4,"ल":8,"म":16,"ब":17,"स":19,"ं":21,"त":25,"र":8,"प":26,"द":7,"ज":22,"ह":27,"ँ":21};
function D2H(t){t=preD(t);t=String(t).normalize("NFC");
  let o="",L=null,V=null;
  const emit=()=>{ if(L===null&&V===null)return;
    const l=(L===null)?11:L, v=(V===null)?0:V;
    o+=String.fromCharCode(0xAC00+l*588+v*28); L=null;V=null; };
  const base=ch=>ch.normalize? ch:ch;
  const chars=[...String(t)];
  for(let i=0;i<chars.length;i++){
    const ch=chars[i];
    if(ch==="\u093C")continue;
    if("अआइईउऊएऐओऔ".includes(ch)){ emit(); L=11; V={"अ":0,"आ":0,"इ":20,"ई":20,"उ":13,"ऊ":18,"ए":5,"ऐ":1,"ओ":8,"औ":8}[ch]; emit(); }
    else if(HL_INV[ch]!==undefined){
      if(chars[i+1]==="्"&&L===null&&o.length&&HT_INV[ch]!==undefined){
        const prev=o.codePointAt(o.length-1)||0;
        if(prev>=0xAC00&&prev<=0xD7A3&&(prev-0xAC00)%28===0){ o=o.slice(0,-1)+String.fromCharCode(prev+HT_INV[ch]); i++; continue; }
      }
      emit(); L=HL_INV[ch];
    }
    else if(HV_INV[ch]!==undefined){ V=HV_INV[ch]; emit(); }
    else if(ch==="्"){ emit(); }
    else if(ch==="ं"||ch==="ँ"){ emit(); const prev=o.codePointAt(o.length-1)||0; if(prev>=0xAC00&&(prev-0xAC00)%28===0) o=o.slice(0,-1)+String.fromCharCode(prev+21); }
    else { emit(); if(!/[\u0900-\u097F]/.test(ch)) o+=ch; }
  }
  emit();
  return o;
}
addIdent(JJE,D2H); addIdent(RYN,D2J); addIdent(MVI,D2J); addIdent(RYS,D2J); addIdent(YOI,D2J); addIdent(ZGH,D2T);
JJE.translit=mkHANGX([].concat(Object.values(JJE.V),Object.values(JJE.LEX),[JJE.pres,JJE.past,JJE.fut,JJE.imp,JJE.neg,JJE.can,JJE.want,JJE.yes,JJE.negWord]));
console.log("identity i_2 ✓");

module.exports={HANGX:null,TFNX,JJE,RYN,MVI,RYS,YOI,GWR,ZGH};
if(require.main===module){
  const M={jje:JJE,ryn:RYN,mvi:MVI,rys:RYS,yoi:YOI,gwr:GWR,zgh:ZGH};
  const w=process.argv[2];
  if(w&&M[w]) regen(M[w]); else Object.values(M).forEach(P=>regen(P));
}
