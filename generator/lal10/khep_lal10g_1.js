/* लाल10-ग: C05 कोंध-गुच्छा — uki कुई · kxv कुवि · kfj कोंडा · peg पेंगो · mha मांडा · kff कोया
   लिपियाँ: Orya (uki/kxv/peg/mha) · Telu (kfj/kff) — Indic block-shift 1:1:
   ओड़िया=देव+0x200, तेलुगु=देव+0x300 (संरचना/matra/virama समानांतर)।
   वास्तु: LEX/V/patterns यहाँ देवनागरी में लिखे (typing-सटीक), D2O/D2T से target-लिपि में ढले;
   [1]-translit हेतु ORYX/TELX = उल्टा-shift (हर char एक-मान vi/vm, ARBX-तर्ज़ concat)।
   भंडार (पक्के-नीति, अनिश्चित=हिंदी-passthrough):
   Kui/Kuvi: आनु/आमु/ईनु, एजु=पानी, इडु=घर, नाजु=गाँव, सल्-जा वा-आ तिन्-खा उन्-पी मेह्-देख, हिल्ले=नहीं
   Konda: नान/मापु, एरु=पानी, सो-जा सू-देख, सिले=नहीं | Pengo: आन, हुर्-देख, सल्-जा | Manda=Pengo-सिबलिंग (घोषित)
   Koya (गोंडी-शाखा): नन्ना/मम्मा, एरु=पानी, लोन=घर, हन्द-जा हुड-देख (तेलुगु-लिपि: nukta-रहित)
   ⚠️ काल-प्रत्यय सरल-draft (एक-रूप प्रति-काल) — 🟡 AI-draft, मूल-वक्ता समीक्षा बाक़ी। */
"use strict";
const {regen}=require("./engine.js");

/* ---- block-shift maps ---- */
function mkShift(off){ /* target→देव translit (ARBX-तर्ज़: सब-अक्षर vi/vm एक-मान) */
  const vi={},vm={},order=[];
  for(let cp=0x01;cp<0x80;cp++){
    const s=String.fromCharCode(off+cp), d=String.fromCharCode(0x0900+cp);
    vi[s]=d; vm[s]=d; order.push(s);
  }
  return {cons:{},clOrder:[],vi,vm,vOrder:order};
}
const ORYX=mkShift(0x0B00), TELX=mkShift(0x0C00);
function mkD2(off){ return s=>String(s).replace(/[\u0900-\u097F]/g,ch=>{
  const cp=ch.charCodeAt(0)-0x0900+off;
  return String.fromCharCode(cp);
});}
const D2O=mkD2(0x0B00), D2T=mkD2(0x0C00);
function conv(o,fn){ const out={}; for(const[k,v]of Object.entries(o)) out[k]=fn(v); return out; }
function convPat(P,fn){ for(const k of ["yes","negWord","pres","past","fut","prog","imp","neg","can","want"]) if(P[k]) P[k]=fn(P[k]); return P; }

const PRE=[["hetrenyi","हैं"],[" ओ "," वह "],["ओ अपन","वह अपने"],["साहेब","सर"],["पगार","वेतन"],["अंग्रेजी","English"],["अंग्रेज़ी","English"]];

/* ---- साझा कोंध-कोर (देव में) ---- */
const KUI_LEX={
 "मैं":"आनु","मैंने":"आनु","मुझे":"नांगे","मेरा":"नाइ","मेरे":"नाइ","मेरी":"नाइ",
 "हम":"आमु","हमें":"मांगे","हमने":"आमु","हमारा":"माइ","हमारे":"माइ","हमारी":"माइ",
 "तुम":"ईनु","तू":"ईनु","तुम्हें":"नींगे","तुमने":"ईनु","तुम्हारा":"नी","तुम्हारे":"नी","तुम्हारी":"नी",
 "आप":"ईरु","आपको":"मींगे","आपने":"ईरु","आपका":"मी","आपके":"मी","आपकी":"मी",
 "वह":"एवासि","वो":"एवासि","वे":"एवारु","यह":"इवासि",
 "पानी":"एजु","घर":"इडु","गाँव":"नाजु","एक":"रोण्डे","दो":"रीण्डे","तीन":"तीनि",
 "क्या":"इनाइ","कौन":"इमासि","कहाँ":"इम्बा","कब":"एचेरि","नहीं":"हिल्ले","हाँ":"हाँ",
 "कुई":"कुइ","कुई-भाषी":"कुइ"
};
const KUI_V={
 "होना":"मन","रहना":"मन","करना":"कि","जाना":"सल","आना":"वा","देना":"सी","लेना":"ओ","खाना":"तिन","पीना":"उन","देखना":"मेह","सुनना":"वेन","बोलना":"इन","कहना":"इन","पूछना":"वेन्ब","सोना":"डूक","बैठना":"कुच","सकना":"आट","चाहना":"वेण्ड"
};
function kondh(code,labelHi,labelEn,tts,fn,TR,lex,v,ex){
 const P=Object.assign({
  code, labelHi, labelEn, tts,
  script: tts==="or-IN"?"oriya-native":"telugu-native",
  scriptName: tts==="or-IN"?"Oriya":"Telugu", translit:TR,
  pre:PRE, yes:"हाँ", negWord:"हिल्ले",
  pres:"%Vति मने", past:"%Vते", fut:"%Vइ", prog:"%Vति मने", imp:"%Vमु",
  neg:"%Vए हिल्ले", can:"%V आटि मने", want:"%V वेण्डि मने",
  V:conv(v,fn), LEX:conv(lex,fn)
 },ex||{});
 return convPat(P,fn);
}
const UKI=kondh("uki","कुई","Kui","or-IN",D2O,ORYX,KUI_LEX,KUI_V);
const KXV=kondh("kxv","कुवि","Kuvi","or-IN",D2O,ORYX,
 Object.assign({},KUI_LEX,{"मैं":"नानु","मैंने":"नानु","पानी":"एयु","कुई":"कुवि","कुई-भाषी":"कुवि","कुवि":"कुवि","कुवि-भाषी":"कुवि"}),
 KUI_V);

/* ---- कोंडा kfj (तेलुगु-लिपि) ---- */
const KFJ=kondh("kfj","कोंडा","Konda","te-IN",D2T,TELX,
 {"मैं":"नान","मैंने":"नान","मुझे":"नाङ","मेरा":"ना","मेरे":"ना","मेरी":"ना",
  "हम":"मापु","हमें":"माङ","हमने":"मापु","हमारा":"मा","हमारे":"मा","हमारी":"मा",
  "तुम":"नीन","तू":"नीन","तुम्हें":"नीङ","तुमने":"नीन","तुम्हारा":"नी","तुम्हारे":"नी","तुम्हारी":"नी",
  "आप":"मीरु","आपको":"मीङ","आपने":"मीरु","आपका":"मी","आपके":"मी","आपकी":"मी",
  "वह":"वान्रु","वो":"वान्रु","यह":"इवन",
  "पानी":"एरु","एक":"उन्रि","दो":"रिण्डु","तीन":"मूण्डु",
  "क्या":"इनिका","कौन":"एयेन","कहाँ":"एम्बे","नहीं":"सिले","हाँ":"हाँ",
  "कोंडा":"कोण्डा","कोंडा-भाषी":"कोण्डा"},
 Object.assign({},KUI_V,{"जाना":"सो","देखना":"सू","सुनना":"वेन","खाना":"तिन","पीना":"उन"}),
 {negWord:"सिले",neg:"%Vए सिले"});

/* ---- पेंगो peg + मांडा mha (ओड़िया-लिपि; mha=peg-सिबलिंग घोषित) ---- */
const PEG_LEX=Object.assign({},KUI_LEX,{
 "मैं":"आन","मैंने":"आन","पानी":"एजो","कुई":"पेंगो","कुई-भाषी":"पेंगो","पेंगो":"पेंगो","पेंगो-भाषी":"पेंगो"});
const PEG_V=Object.assign({},KUI_V,{"देखना":"हुर","जाना":"सल"});
const PEG=kondh("peg","पेंगो","Pengo","or-IN",D2O,ORYX,PEG_LEX,PEG_V);
const MHA=kondh("mha","मांडा","Manda","or-IN",D2O,ORYX,
 Object.assign({},PEG_LEX,{"पेंगो":"माण्डा","पेंगो-भाषी":"माण्डा","मांडा":"माण्डा","मांडा-भाषी":"माण्डा"}),
 PEG_V);

/* ---- कोया kff (तेलुगु-लिपि, गोंडी-शाखा) ---- */
const KFF=kondh("kff","कोया","Koya","te-IN",D2T,TELX,
 {"मैं":"नन्ना","मैंने":"नन्ना","मुझे":"नाकु","मेरा":"ना","मेरे":"ना","मेरी":"ना",
  "हम":"मम्मा","हमें":"माकु","हमने":"मम्मा","हमारा":"मा","हमारे":"मा","हमारी":"मा",
  "तुम":"नीमा","तू":"नीमा","तुम्हें":"नीकु","तुमने":"नीमा","तुम्हारा":"नी","तुम्हारे":"नी","तुम्हारी":"नी",
  "आप":"मीरु","आपको":"मीकु","आपने":"मीरु","आपका":"मी","आपके":"मी","आपकी":"मी",
  "वह":"वोरु","वो":"वोरु","यह":"इद",
  "पानी":"एरु","घर":"लोन","एक":"ओक्को","दो":"रेण्डु","तीन":"मूण्डु",
  "क्या":"बाता","कौन":"बोरु","कहाँ":"बेके","नहीं":"सिल्ले","हाँ":"हाँ",
  "कोया":"कोया","कोया-भाषी":"कोया"},
 Object.assign({},KUI_V,{"जाना":"हन्द","देखना":"हुड","खाना":"तिन","पीना":"उन","आना":"वा","देना":"सी"}),
 {negWord:"सिल्ले",neg:"%Vए सिल्ले",pres:"%Vतोना",past:"%Vतन",fut:"%Vआना"});


/* ---- हिंदी-passthrough → native-लिपि identity (Latin-कचरा रोक) ----
   pristine hindi-side के सब देव-token जो LEX में नहीं → value=उसी शब्द की native-लिपि (shift)।
   पढ़ने वाले को हिंदी-शब्द अपनी लिपि में मिलता है; [1]-translit shift-back से मूल-देव। */
const fsI=require("fs");
function addIdentity(P,fn){
  const toks=new Set();
  for(const suf of ["kkb_","kkb2_"]){
    const f=`/home/claude/lal10/pristine/${suf}${P.code}_data.js`;
    const w={}; new Function("window","self","module",fsI.readFileSync(f,"utf8")+";")(w,w,{});
    (function walk(o){ if(Array.isArray(o)){ const row=o.length>=3&&typeof o[0]==="string"&&typeof o[2]==="string";
        o.forEach((x,i)=>{ if(typeof x==="string"){ if(row&&i<2)return;
            for(const t of x.replace(/^\((सुनो|बोलो)\)\s*/,"").split(/[\s।,?!()"'“”:;—.]+/))
              if(/^[\u0900-\u097F\-]+$/.test(t)) toks.add(t);
          } else walk(x); });
      } else if(o&&typeof o==="object") Object.values(o).forEach(v=>{ if(typeof v==="string"){
          for(const t of v.replace(/^\((सुनो|बोलो)\)\s*/,"").split(/[\s।,?!()"'“”:;—.]+/))
            if(/^[\u0900-\u097F\-]+$/.test(t)) toks.add(t);
        } else walk(v); });
    })(w.KKB_DATA||w.KKB2_DATA);
  }
  let n=0;
  for(const t of toks){ if(!(t in P.LEX)){ P.LEX[t]=fn(t); n++; } }
  return n;
}
for(const [P,fn] of [[UKI,D2O],[KXV,D2O],[PEG,D2O],[MHA,D2O],[KFJ,D2T],[KFF,D2T]])
  console.log(P.code,"identity +",addIdentity(P,fn));

module.exports={ORYX,TELX,UKI,KXV,KFJ,PEG,MHA,KFF};
if(require.main===module){
  const M={uki:UKI,kxv:KXV,kfj:KFJ,peg:PEG,mha:MHA,kff:KFF};
  const w=process.argv[2];
  if(w&&M[w]) regen(M[w]); else Object.values(M).forEach(P=>regen(P));
}
