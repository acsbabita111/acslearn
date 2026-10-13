/* fix_europe24_pron_v1.js — पड़ाव-ब चरण-2: [1] उच्चारण-स्तंभ की Latin-गंदगी सफ़ाई (24 भाषाएँ)
   दायरा सिर्फ़ item[1] / tw[1] / test.lines[1] — [0] व [2] byte-अछूते।
   क्रम: (1) संक्षिप्त-नाम नक़्शा (2) accent-स्वर → मात्रा/स्वर (3) बचे शब्द → generic लिप्यंतरण */
"use strict";
const fs=require("fs");
const P=p=>"/home/claude/work24/repo/"+p;
const CODES="cat cym dan est eus fao gla gle glg isl kal lav lij lmo ltz mkd niv nob scn slv sme sqi szl vec".split(" ");

const ACR={UPI:"यूपीआई",OTP:"ओटीपी",AI:"एआई",SIM:"सिम",MRP:"एमआरपी",PIN:"पिन",PNR:"पीएनआर",
PF:"पीएफ़",ESI:"ईएसआई",UTS:"यूटीएस",ATM:"एटीएम",EMI:"ईएमआई",ID:"आईडी",TT:"टीटी",ITI:"आईटीआई",
PVP:"पीवीपी",AC:"एसी",IA:"आईए",KYC:"केवाईसी",QR:"क्यूआर",SMS:"एसएमएस",GPS:"जीपीएस",TV:"टीवी",
A:"ए",B:"बी",D:"डी",I:"आई",M:"एम",S:"एस",Y:"इ"};
const DEVC=/[\u0915-\u0939\u0958-\u095F]/; /* देवनागरी व्यंजन */
const VOW={ "â":["आ","ा"],"à":["आ","ा"],"á":["आ","ा"],"ê":["ए","े"],"è":["ए","े"],"é":["ए","े"],"ë":["ए","े"],
"î":["ई","ी"],"ï":["ई","ी"],"ô":["ओ","ो"],"ø":["ओ","ो"],"û":["ऊ","ू"],"ŵ":["ऊ","ू"],"ŷ":["ई","ी"],"æ":["ऐ","ै"],"ð":["द","द"] };
/* generic लिप्यंतरण (बचे शब्दों के लिए) */
const DIG={ch:"च",sh:"श",th:"थ",ph:"फ",gh:"घ",kh:"ख",zh:"झ",ck:"क",qu:"क्व",ng:"ंग"};
const CONS={b:"ब",c:"क",d:"द",f:"फ़",g:"ग",h:"ह",j:"ज",k:"क",l:"ल",m:"म",n:"न",p:"प",q:"क",r:"र",s:"स",t:"त",v:"व",w:"व",x:"क्स",y:"य",z:"ज़"};
const VFULL={a:"अ",e:"ए",i:"इ",o:"ओ",u:"उ"}, VMAT={a:"ा",e:"े",i:"ि",o:"ो",u:"ु"};
function translitWord(w){
  w=w.toLowerCase(); let out="",i=0,lastCons=false;
  while(i<w.length){
    const d2=w.slice(i,i+2);
    if(DIG[d2]){ out+=DIG[d2]; lastCons=true; i+=2; continue; }
    const ch=w[i];
    if(VOW[ch]){ out+= lastCons?VOW[ch][1]:VOW[ch][0]; lastCons=false; i++; continue; }
    if(VFULL[ch]){ out+= lastCons?VMAT[ch]:VFULL[ch]; lastCons=false; i++; continue; }
    if(CONS[ch]){ out+=CONS[ch]; lastCons=true; i++; continue; }
    out+=ch; lastCons=false; i++;
  }
  return out;
}
const LATRUN=/[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]+/g;
function cleanPron(s){
  if(s==null) return s; s=String(s);
  /* 1) संक्षिप्त-नाम (पूरे token) */
  s=s.replace(LATRUN,m=>ACR[m]!==undefined?ACR[m]:m);
  /* 2) अकेले accent-अक्षर — पिछला अक्षर देव-व्यंजन हो तो मात्रा */
  let out=""; for(let i=0;i<s.length;i++){ const ch=s[i];
    if(VOW[ch]){ const prev=out[out.length-1]||""; out+= DEVC.test(prev)?VOW[ch][1]:VOW[ch][0]; }
    else out+=ch; }
  s=out;
  /* 3) बचे Latin-शब्द → generic लिप्यंतरण */
  s=s.replace(LATRUN,m=>translitWord(m));
  return s;
}
let touched=0,files=0;
CODES.forEach(c=>{
 [["assets/kkb2_"+c+"_data.js","KKB2_DATA"],["assets/kkb_"+c+"_data.js","KKB_DATA"]].forEach(([f,k])=>{
  const w={}; global.window=w; delete require.cache[require.resolve(P(f))]; require(P(f));
  const D=w[k]; if(!D) return; let ch=0;
  function fix(o,idx){ const v=o[idx]; const nv=cleanPron(v); if(nv!==v){o[idx]=nv;ch++;} }
  D.weeks.forEach(wk=>{ wk.days.forEach(d=>{ (d.items||[]).forEach(it=>fix(it,1)); (d.tw||[]).forEach(t=>fix(t,1)); });
    ((wk.test||{}).lines||[]).forEach(l=>fix(l,1)); });
  if(ch){ const txt=fs.readFileSync(P(f),"utf8"); const hdrEnd=txt.indexOf("window.");
    const hdr=txt.slice(0,hdrEnd).replace("*/"," · चरण-2: [1]-सफ़ाई (संक्षिप्त-नाम/accent/लिप्यंतरण) */");
    fs.writeFileSync(P(f), hdr+"window."+k+"="+JSON.stringify(D)+";\n"); files++; touched+=ch; }
 });
});
console.log("सफ़ाई:",touched,"cell,",files,"फ़ाइलें ✅");
