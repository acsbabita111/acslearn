/* खेप-2 शब्दकोश-पूर्ति (20-Oct-2026): unr/hoc = profile V/LEX-उल्टा + Kherwarian suffix-छील इंजन;
   ts = हाथ-नक़्शा (52)। निकास: lipi/<code>_shabdkosh_3.js (module.exports — loader-नियम)। */
"use strict";
const fs=require("fs"),path=require("path");
const {UNR,HOC,TS}=require("./khep_lal10s_2.js");
const LIPI=path.join(__dirname,"..","data","lipi");

/* हिंदी-क्रिया रूप-रचना: "खाना"→खा+ता है आदि; अनियमित past अलग */
const IRR={"जाना":"गया","आना":"आया","देना":"दिया","लेना":"लिया","करना":"किया","पीना":"पिया","होना":"हुआ","सोना":"सोया","धोना":"धोया","लाना":"लाया","खाना":"खाया","सीखना":"सीखा","बैठना":"बैठा"};
function stem(h){return h.replace(/ना$/,"");}
function forms(h){ // h = हिंदी-धातु (…ना)
 const s=stem(h), past=IRR[h]||s+"ा";
 return {pres:s+"ता है",past:past,fut:s+"एगा",imp:s+"ओ",impP:s+"इए",inf:h};
}
/* विशेष-base (साँचा-कण) */
const SPECIAL={"मेना":{pres:"है",past:"था",fut:"होगा",imp:"हो",impP:"होइए",inf:"होना"},
 "दाड़ि":{pres:"सकता है",past:"सका",fut:"सकेगा",imp:"सको",impP:"सकिए",inf:"सकना"},
 "सनांग":{pres:"चाहता है",past:"चाहा",fut:"चाहेगा",imp:"चाहो",impP:"चाहिए",inf:"चाहना"}};

function buildKherwarian(P){
 // उल्टा-कोश: भाषा-रूप → हिंदी
 const inv={};
 for(const[h,v]of Object.entries(P.V)) if(v&&!inv[v]) inv[v]=h.replace(/-/g," ");
 for(const[h,v]of Object.entries(P.LEX)) if(v&&!inv[v]) inv[v]=h;
 const q=(P.fut==="%Vए")?"ए":"आ"; // प्रश्न/भविष्य-पूँछ भाषा-अनुसार (unr=आ, hoc=ए)
 const pastS=(P.past==="%Vकेदा")?"केदा":"केना";
 // suffix-सीढ़ी लंबी-पहले (v4.2-ग3 नियम)
 const SUF=[["तना"+q,"pres","?"],["केना"+q,"past","?"],["केदा"+q,"past","?"],["जाना"+q,"past","?"],
  ["मे"+q,"imp","?"],["पे"+q,"impP","?"],[q+q,"fut","?"],
  ["आकान","past",""],["तना","pres",""],["केना","past",""],["केदा","past",""],["जाना","past",""],
  ["इचि","inf","(करवाना)"],["मे","imp",""],["पे","impP",""],[q,"fut",""]];
 return function resolve(w){
  if(inv[w])return inv[w];
  for(const[suf,form,tag]of SUF){
   if(w.length>suf.length&&w.endsWith(suf)){
    const base=w.slice(0,-suf.length);
    let f=null;
    if(SPECIAL[base])f=SPECIAL[base][form];
    else if(inv[base]){const h=inv[base]; f=/ना$/.test(h)?forms(h)[form]:(h+" ("+({pres:"अभी",past:"बीता",fut:"आगे",imp:"आज्ञा",impP:"आज्ञा",inf:""}[form]||"")+")");}
    else{const r=resolve(base); if(r&&r!=="—")f=/ता है|या|एगा|ओ$|इए$/.test(r)?r:( /ना$/.test(r)?forms(r)[form]:null);}
    if(f)return f+(tag==="?"?"?":tag?" "+tag:"");
   }
  }
  // शुद्ध-हिंदी passthrough (देव-लक्ष्य में उधार) → identity
  if(/^[\u0900-\u097F\u0964\-]+$/.test(w)&&(w in P.LEX===false))return w;
  return null;
 };
}

const TS_MAP={"suka":"(से — ku suka eka का हिस्सा)","ka":"(का — जोड़-शब्द)","swinwe":"मिलकर","/":"—","alavida":"अलविदा","nonoka":"धीरे","unwana":"कोई","vava":"दर्द","wunwana":"दूसरा","xinwana":"कुछ","xandla":"हाथ (नक़द में)","leyi":"यह","taka":"आने वाला","wo":"(का — पहला में)","hisa":"गर्मी","lebyinene":"अच्छा (शुभ)","welda":"वेल्ड करना","kuma":"पाना","wunwe":"एक","engetela":"बढ़ाना (ओवरटाइम)","fambeni":"चलो (सब मिलकर)","ha":"(से — क्यों में)","mayelana":"बारे में","lonkulu":"बड़ा","lontsongo":"छोटा","xisati":"स्त्री (की)","ni":"और (के साथ)","tlula":"से बढ़कर (सबसे)","hundza":"बीता हुआ","rinwana":"हर (दिन)","minkarhi":"समय (बार)","hinkwayo":"हमेशा (सब समय)","yinwana":"कभी (कोई समय)","ri":"(जोड़-शब्द)","nchumu":"चीज़ (ख़ाली में)","khomeli":"माफ़ कीजिए","tinyungubyisa":"गर्व करना","tirhisa":"इस्तेमाल करना (ख़र्च)","bini":"डिब्बा (कूड़ेदान)","ra":"(का — जोड़-शब्द)","byakwe":"ख़ुद (अपने आप)","vilela":"चिंता करना","titoloveta":"अभ्यास करना","hunguta":"घटाना (कटौती)","tiviwiki":"अनजान (न जाना हुआ)","durhi":"महँगा (नहीं = सस्ता)","kam":"कैमरा (हिस्सा)","xana":"क्या (सवाल-शब्द)","bandhi":"पट्टी (सीट की)","mila":"बढ़ना","aag":"आग","yingisa":"सुनो (ध्यान से)"};

function run(P,code){
 const miss=fs.readFileSync(path.join(LIPI,code+"_missing_words.txt"),"utf8").split("\n").map(x=>x.trim()).filter(x=>x&&x!=="(कोई नहीं)");
 let out={},left=[];
 if(code==="ts"){ for(const w of miss){ if(TS_MAP[w])out[w]=TS_MAP[w]; else left.push(w);} }
 else{ const R=buildKherwarian(P);
  for(const w of miss){ const r=R(w); if(r)out[w]=r; else if(w==="/")out[w]="—"; else left.push(w);} }
 const f=path.join(LIPI,code+"_shabdkosh_3.js");
 fs.writeFileSync(f,"/* "+code+" शब्दकोश-पूर्ति v3 (20-Oct-2026 खेप-2): regen-रूपों की suffix-इंजन/हाथ-पूर्ति — "+Object.keys(out).length+" अर्थ */\nconst K={\n"+Object.entries(out).map(([k,v])=>" "+JSON.stringify(k)+":"+JSON.stringify(v)).join(",\n")+"\n};\nmodule.exports=K;\n","utf8");
 console.log(code+": भरे "+Object.keys(out).length+" · बचे "+left.length+(left.length?" → "+left.slice(0,25).join(","):""));
 return left;
}
const M={unr:UNR,hoc:HOC,ts:TS};
for(const c of (process.argv[2]?[process.argv[2]]:["unr","hoc","ts"])) run(M[c],c);
