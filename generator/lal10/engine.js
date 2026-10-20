/* lal10 साझा-इंजन — हर भाषा profile (LEX/particles/translit/नाम) देती है।
   विधि lal20-सिद्ध: items/tw/listen/dialog/test/drill/help regen; हिंदी-स्तंभ [2] अछूता। */
"use strict";
const fs = require("fs");
const REPO = "/home/claude/repo";
const PRIS = "/home/claude/lal10/pristine";

/* देवनागरी → रोमन (loan-fallback) */
const DV = { "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ng","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"ny",
"ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
"प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh","ष":"sh","स":"s","ह":"h",
"ज़":"z","फ़":"f","ड़":"r","ढ़":"rh","क़":"q","ख़":"kh","ग़":"g" };
const MAT = { "ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","े":"e","ै":"ai","ो":"o","ौ":"au","ृ":"ri","ॅ":"a","ॉ":"o" };
const IND = { "अ":"a","आ":"aa","इ":"i","ई":"i","उ":"u","ऊ":"u","ए":"e","ऐ":"ai","ओ":"o","औ":"au","ऋ":"ri","ऑ":"o" };
function dev2lat(s){
  let out="", i=0;
  while(i<s.length){
    let ch=s[i], two=s.slice(i,i+2);
    if(two.length===2 && DV[two]){
      out+=DV[two]; i+=2;
      if(i<s.length && (s[i]==="ं"||s[i]==="ँ")){out+="an";i++;}
      else if(i<s.length && MAT[s[i]]){out+=MAT[s[i]];i++; if(i<s.length&&(s[i]==="ं"||s[i]==="ँ")){out+="n";i++;}}
      else if(i<s.length && s[i]==="्"){i++;}
      else if(i<s.length && (DV[s[i]]||IND[s[i]]))out+="a";
      continue;
    }
    if(DV[ch]){
      out+=DV[ch]; i++;
      if(i<s.length && (s[i]==="ं"||s[i]==="ँ")){out+="an";i++;}
      else if(i<s.length && MAT[s[i]]){out+=MAT[s[i]];i++; if(i<s.length&&(s[i]==="ं"||s[i]==="ँ")){out+="n";i++;}}
      else if(i<s.length && s[i]==="्"){i++;}
      else { const nxt=s[i];
        if(nxt===undefined || /[\s।?,!.\-—:;"'()0-9]/.test(nxt)) {}
        else out+="a";
      }
      continue;
    }
    if(IND[ch]){out+=IND[ch];i++;continue;}
    if(MAT[ch]){out+=MAT[ch];i++;continue;}
    if(ch==="ं"||ch==="ँ"){out+="n";i++;continue;}
    if(ch==="्"){i++;continue;}
    out+=ch; i++;
  }
  return out;
}

/* Latin → देवनागरी-उच्चारण (syllable-जोड़) */
const CONS = {k:"क","kh":"ख",g:"ग","gh":"घ","ng":"ङ",c:"क","ch":"च","chh":"छ",j:"ज","jh":"झ","ny":"ञ",
t:"त","th":"थ",d:"द","dh":"ध",n:"न",p:"प","ph":"फ",b:"ब","bh":"भ",m:"म",y:"य",r:"र",l:"ल",v:"व",w:"व",
s:"स","sh":"श",h:"ह",z:"ज़","zh":"झ़",f:"फ़",q:"क़",x:"क्स","ts":"त्स","tz":"त्ज़","dz":"द्ज़","mb":"म्ब","nd":"न्द","mw":"म्व","gw":"ग्व","hl":"ह्ल","kr":"क्र","pf":"प्फ"};
const CL_ORDER=["chh","ng","ny","kh","gh","ch","jh","th","dh","ph","bh","sh","zh","ts","tz","dz","mb","nd","mw","gw","hl","pf"];
const VOW_M = {a:"ा",aa:"ा",i:"ि",ii:"ी",u:"ु",uu:"ू",e:"े",ai:"ै",o:"ो",au:"ौ","ü":"ू",ie:"िए",uo:"ुओ",ia:"िया",io:"ियो",ae:"ै",aw:"ॉ",wng:"ुंग",w:"ऺ"};
const VOW_I = {a:"अ",aa:"आ",i:"इ",ii:"ई",u:"उ",uu:"ऊ",e:"ए",ai:"ऐ",o:"ओ",au:"औ","ü":"ऊ",ie:"इए",uo:"उओ",ia:"इया",io:"इयो",ae:"ऐ",aw:"ऑ",w:"अ"};
const V_ORDER=["uo","ie","ia","io","aa","ai","au","ae","aw","ü"];
function mkLat2dev(extra){
  const EC=Object.assign({},CONS,(extra&&extra.cons)||{});
  const EVm=Object.assign({},VOW_M,(extra&&extra.vm)||{});
  const EVi=Object.assign({},VOW_I,(extra&&extra.vi)||{});
  const ECL=((extra&&extra.clOrder)||[]).concat(CL_ORDER);
  const EVO=((extra&&extra.vOrder)||[]).concat(V_ORDER);
  function lat2dev(word){
    if(/^[0-9]+$/.test(word)) return word;
    let s=word.toLowerCase(), out="", i=0;
    while(i<s.length){
      let c=null;
      for(const cl of ECL) if(s.startsWith(cl,i)){c=cl;break;}
      if(!c && EC[s[i]])c=s[i];
      if(c){
        i+=c.length;
        let v=null;
        for(const vl of EVO) if(s.startsWith(vl,i)){v=vl;break;}
        if(!v && EVm[s[i]])v=s[i];
        if(v){ out+= (v==="a"? EC[c] : EC[c]+EVm[v]); i+=v.length; }
        else out+=EC[c]+"्";
        continue;
      }
      let v=null;
      for(const vl of EVO) if(s.startsWith(vl,i)){v=vl;break;}
      if(!v && EVi[s[i]])v=s[i];
      if(v){out+=EVi[v];i+=v.length;continue;}
      out+=s[i];i++;
    }
    return out;
  }
  return function latSent2dev(sent){
    return sent.split(/(\s+|[?,!.\-—:;()"]|।)/).map(p=>{
      if(!p||/^\s+$/.test(p)||/^[?,!.\-—:;()"।]$/.test(p))return p;
      if(/^[0-9]+$/.test(p))return p;
      if(/[\u0900-\u097F]/.test(p))return p;
      return lat2dev(p);
    }).join("").replace(/\.$/,"।").replace(/\.(\s)/g,"।$1");
  };
}

/* अंगिका-clone स्रोत → मानक-हिंदी (सब 10 भाषाओं में साझा) */
const ANP2HI = [
  /* 20-Oct variant-विस्तार (nsm "इत" + साझा अंगिका-रूप; boundary-सुरक्षित) */
  [" नो "," तुम "],["आयल","आया"],["आबय","आते"],["आयत","आएँगे"],["कएलक","किया"],["कहलक","कहा"],["पहुंचल","पहुँचा"],["कखन","कब"],[" छल "," था "],["जाइ ","जाते "],["उतरनाइ","उतरना"],[" इत?"," है?"],[" इत।"," हैं।"],[" इत "," हैं "],["करय छी","करते हो"],["करय","करते"],["चलय","चलता"],["चाहय","चाहते"],
  [" ई "," यह "],[" ई?"," यह?"],["लागि","के लिए"],["इहाँ","यहाँ"],["भ गेल","हो गया"],["चलि गेल","चली गई"],["गेल","गया"],
  ["पहिले","पहले"],["आबू","आओ"],["कोनो","किसी"],["दुनु","दोनों"],["देब","दूँगा"],["जाँचू","जाँचो"],["देखाऊ","दिखाओ"],["बताऊ","बताओ"],["भेजू","भेजो"],["गिनू","गिनो"],["कयके","करके"],["कयलौं","किया"],[" जाय "," जाने "],
  [" के वो?"," कौन है?"],["के वो?","कौन है?"],[" वो।"," है।"],[" वो?"," है?"],[" wan।"," हैं।"],[" wan?"," हैं?"],[" wan "," हैं "],
  ["छेलै","था"],["छेली","थी"],["छेलौं","था"],["रहलौं","रहा था"],["रहल छी","रहा हूँ"],["रहल","रहा"],
  ["करै छी","करता हूँ"],["करै","करते"],["रहै छी","रहते हैं"],["रहै","रहते"],["जाइ छी","जाता हूँ"],["खाइ छी","खाता हूँ"],["सिखै छी","सीखता हूँ"],["सिखै","सीखते"],["उठै छी","उठता हूँ"],["उठै","उठते"],
  ["खेलौं","खाया"],["गेलौं","गया"],["केलौं","किया"],["भेलौं","हुआ"],["सूतलौं","सोया"],["देखलौं","देखा"],["सुनलौं","सुना"],["कहलौं","कहा"],["अयलौं","आया"],["पहुँचलौं","पहुँचा"],
  ["जायब","जाऊँगा"],["करब","करूँगा"],["उठब","उठूँगा"],["खायब","खाऊँगा"],["आयब","आऊँगा"],["बोलब","बोलूँगा"],["देखब","देखूँगा"],["सुतब","सोऊँगा"],["रहब","रहूँगा"],["मिलब","मिलूँगा"],["सिखब","सीखूँगा"],["फोन करब","फोन करूँगा"],
  ["खाऊ","खाओ"],["जाऊ","जाओ"],["आऊ","आओ"],["सुनू","सुनो"],["बोलू","बोलो"],["करू","करो"],["रखू","रखो"],["पीबू","पियो"],["सूतऽ","सोओ"],["बउआ","बेटा"],["खाउ","खाओ"],["जाउ","जाओ"],["करु","करो"],
  ["कतेक","कितने"],["कोना","कैसे"],["कोन ","कौन-सी "],["कथी","क्या"],["कहिया","कब"],["कत्ते","कहाँ"],["काहेकि","क्योंकि"],["काहे","क्यों"],
  ["हम्मर","मेरा"],["तोहर","तुम्हारा"],["अपन","अपने"],["माय","माँ"],["बाबू","पिता"],["बहिन","बहन"],["भाय","भाई"],
  ["क्नो","आप"],["लात","आप"],["नीक","अच्छा"],["बेर","बार"],["भोर","सुबह"],["साँझ","शाम"],["अखनो","अभी तक"],["अखन","अभी"],["काल्हि","कल"],["आइ","आज"],
  ["नै","नहीं"],["हँ","हाँ"],["संग","के साथ"],[" सं "," से "],[" आ "," और "],["लगे","पास"],["होउ","हो"],["हेतौ","होगा"],["चाही","चाहिए"],["दू","दो"],["घर में के","घर में कौन"],
  ["छी।","हूँ।"],["छी?","हैं?"],["छी,","हूँ,"],[" छी "," हैं "],["छै।","है।"],["छै?","है?"],[" छै "," है "],["छौ","हो"],["छे।","है।"],
  ["प्रणाम","नमस्ते"],["राति","रात"],["भात","चावल"],["सूतल","सोया"],["थाकल","थका"],["बोखार","बुखार"]
];
let UNK={}; let CURP={}; let ROM2HI={};
function anp2hi(s){
  if(!s)return s;
  let o=" "+s+" ";
  for(const [a,b] of (CURP.pre||[])) o=o.split(a).join(b);
  for(const [a,b] of ANP2HI) o=o.split(a).join(b);
  o=o.replace(/\bH\b/g,"मेरा");
  return o.replace(/\s+/g," ").trim();
}

/* हिंदी अंक-शब्द */
const NUMW = {"एक":"1","दो":"2","तीन":"3","चार":"4","पाँच":"5","पांच":"5","छह":"6","छः":"6","सात":"7","आठ":"8","नौ":"9","दस":"10","ग्यारह":"11","बारह":"12","पंद्रह":"15","बीस":"20","पच्चीस":"25","तीस":"30","चालीस":"40","पचास":"50","साठ":"60","सत्तर":"70","अस्सी":"80","नब्बे":"90","सौ":"100","हज़ार":"1000","हजार":"1000","लाख":"100000"};
/* साझा loan-सूची */
const KEEP_LOAN = new Set(["फोन","नंबर","मोबाइल","टिकट","बैंक","पासपोर्ट","बस","ट्रेन","रेल","स्टेशन","होटल","रूम","कमरा","ऑफिस","कंपनी","मशीन","गाड़ी","डॉक्टर","दवा","अस्पताल","पुलिस","बिल","फोटो","इंटरनेट","व्हाट्सऐप","ईमेल","वीज़ा","एजेंट","बॉस","ड्यूटी","छुट्टी","वेतन","भुगतान","सीट","लाइन","फ़ॉर्म","फॉर्म","कार्ड","आईडी","सर","मैडम"]);
const LOAN_MAP = {"फोन":"phone","नंबर":"number","मोबाइल":"mobile","टिकट":"ticket","बैंक":"bank","पासपोर्ट":"passport","बस":"bus","ट्रेन":"train","रेल":"rail","स्टेशन":"station","होटल":"hotel","रूम":"room","कमरा":"room","ऑफिस":"office","कंपनी":"company","मशीन":"machine","गाड़ी":"gari","डॉक्टर":"doctor","दवा":"dawa","अस्पताल":"hospital","पुलिस":"police","बिल":"bill","फोटो":"photo","इंटरनेट":"internet","व्हाट्सऐप":"WhatsApp","ईमेल":"email","वीज़ा":"visa","एजेंट":"agent","बॉस":"boss","ड्यूटी":"duty","छुट्टी":"chhutti","वेतन":"talab","भुगतान":"talab","सीट":"seat","लाइन":"line","फ़ॉर्म":"form","फॉर्म":"form","कार्ड":"card","आईडी":"ID","सर":"sir","मैडम":"madam"};

/* क्रिया-stems (हिंदी-पहचान साझा; लक्ष्य-रूप profile.V से) */
const VERB_STEMS = [
  ["काम कर","काम-करना"],["फोन कर","फोन-करना"],["मदद कर","मदद-करना"],["इंतज़ार कर","इंतज़ार"],["कोशिश कर","कोशिश"],
  ["याद रख","याद"],["याद कर","याद"],["शुरू कर","शुरू"],["ख़त्म कर","ख़त्म"],["खत्म कर","ख़त्म"],["बंद कर","बंद-करना"],
  ["पसंद कर","पसंद"],["खड़ा हो","खड़ा-होना"],["खड़े हो","खड़ा-होना"],
  ["रह","रहना"],["कर","करना"],["जा","जाना"],["आ","आना"],["दे","देना"],["ले","लेना"],
  ["खा","खाना"],["पी","पीना"],["देख","देखना"],["सुन","सुनना"],["बोल","बोलना"],["कह","कहना"],["पूछ","पूछना"],
  ["पढ़","पढ़ना"],["लिख","लिखना"],["सीख","सीखना"],["सिखा","सिखाना"],["समझ","समझना"],["जान","जानना"],
  ["सो","सोना"],["उठ","उठना"],["बैठ","बैठना"],["चल","चलना"],["दौड़","दौड़ना"],
  ["ख़रीद","ख़रीदना"],["खरीद","ख़रीदना"],["बेच","बेचना"],["बना","बनाना"],["खोल","खोलना"],
  ["रख","रखना"],["मिल","मिलना"],["भेज","भेजना"],["ला","लाना"],["धो","धोना"],["पका","पकाना"],
  ["चाह","चाहना"],["माँग","माँगना"],["मांग","माँगना"],["पहुँच","पहुँचना"],["पहुंच","पहुँचना"],["रुक","रुकना"],
  ["हो जा","होना"],["हो","होना"]
];
function tenseOf(tail){
  if(/(ऊँगा|ऊंगा|एगा|एगी|एँगे|एंगे|ओगे|ूँगा|ूंगा|ूँगी)/.test(tail)) return "fut";
  if(/(रहा|रही|रहे)\s*(हूँ|है|हैं|हो)/.test(tail)) return "prog";
  if(/(या|ई|ए|ईं|ये|यी|िया|ुआ|ुई|ुए)\s*(था|थी|थे|हूँ|है|हैं)?[\s।]*$/.test(tail) && /(किया|गया|गई|गए|लिया|दिया|आया|आई|आए|था|थी|थे|हुआ|हुई|हुए|मिला|मिली|मिले)/.test(tail)) return "past";
  if(/(ता|ती|ते)\s*(हूँ|है|हैं|हो)/.test(tail)) return "hab";
  if(/(ो|ओ|िए|ीजिए|िये|ीजिये|ें|ना)[\s।!]*$/.test(tail)) return "imp";
  return "pres";
}

/* ---------- मुख्य: profile से भाषा-इंजन बनाओ ---------- */
function makeLang(P){
  const latSent2dev = mkLat2dev(P.translit||{});
  const MULTI = Object.keys(P.LEX).filter(k=>k.includes(" ")).sort((a,b)=>b.length-a.length);
  function vRoot(key){ return (P.V&&P.V[key]) || (P.V&&P.V["करना"]) || "chü"; }
  function conj(root,tense,neg){
    let v=root;
    if(tense==="prog"&&P.prog) v=P.prog.replace("%V",v);
    else if(tense==="fut"&&P.fut) v=P.fut.replace("%V",v);
    else if(tense==="past"&&P.past) v=P.past.replace("%V",v);
    else if(tense==="imp"&&P.imp) v=P.imp.replace("%V",v); /* 20-Oct लाल10-ब additive: imp-साँचा (grt) — पुराने profiles में key नहीं, शून्य-असर */
    else if((tense==="pres"||tense==="hab")&&P.pres) v=P.pres.replace("%V",v); /* 20-Oct लाल10-ब additive: pres-साँचा (grt) */
    if(neg&&P.neg) v=P.neg.replace("%V",v);
    return v;
  }
  function tSent(hi){
    if(!hi||!/[\u0900-\u097F]/.test(hi)) return hi;
    let s=hi.trim();
    const isQ=/\?$/.test(s)||/^(क्या|कौन|कहाँ|कब|कैसे|क्यों|कितन)/.test(s);
    const excl=/!$/.test(s);
    s=s.replace(/[।?!]+$/,"").trim();
    let neg=false;
    if(/(^|\s)(नहीं|मत)(\s|$)/.test(s)){neg=true; s=s.replace(/(^|\s)(नहीं|मत)(?=\s|$)/g,"$1").replace(/\s+/g," ").trim();}
    const toks0=s.split(/\s+/);
    let verbKey=null, verbAt=-1, tail="";
    outer:
    for(let start=Math.max(0,toks0.length-4); start<toks0.length; start++){
      const seg=toks0.slice(start).join(" ");
      for(const [st,key] of VERB_STEMS){
        if(seg.startsWith(st)){
          const rest=seg.slice(st.length);
          if(/^[ािीुूेैोौंँ]*(ता|ती|ते|या|यी|ये|ा|ी|े|ो|ें|िए|ीजिए|िये|ना|ऊँगा|ऊंगा|एगा|एगी|एँगे|एंगे|ूँगा|ूंगा)?\s*(है|हैं|हूँ|हो|था|थी|थे|रहा|रही|रहे|सकता|सकती|सकते|चुका|चुकी|चुके|जाए|जाओ|दीजिए|दो|लो|गया|गई|गए)?\s*(है|हैं|हूँ|हो|था|थी|थे)?\s*$/.test(rest)){
            verbKey=key; verbAt=start; tail=seg; break outer;
          }
        }
      }
    }
    if(!verbKey){
      const lastT=toks0[toks0.length-1];
      if(/^(है|हैं|हूँ|हो)$/.test(lastT)){verbKey="होना";verbAt=toks0.length-1;tail=lastT;}
      else if(/^(था|थी|थे)$/.test(lastT)){verbKey="होना";verbAt=toks0.length-1;tail="था";}
      else if(/^चाहिए$/.test(lastT)){verbKey="चाहना";verbAt=toks0.length-1;tail="";}
    }
    let tense = tail ? tenseOf(tail) : "pres";
    if(verbKey==="होना"&&/^(था|थी|थे)/.test(tail)) tense="past";
    if(verbKey==="होना"&&/^(है|हैं|हूँ|हो)$/.test(tail)) tense="pres";
    const canDo = tail && /(सकता|सकती|सकते)/.test(tail);
    const want = tail && /(चाहता|चाहती|चाहते)\s*(हूँ|है|हैं)/.test(s);
    const body = verbAt>=0 ? toks0.slice(0,verbAt).join(" ") : s;
    let b=" "+body+" ";
    for(const m of MULTI){ b=b.split(" "+m+" ").join(" §"+P.LEX[m].replace(/ /g,"¤")+"§ "); }
    const parts=b.trim().split(/\s+/).filter(Boolean);
    const out=[];
    for(let t of parts){
      if(t.startsWith("§")){out.push(t.replace(/[§]/g,"").replace(/¤/g," "));continue;}
      t=t.replace(/[,"';:()]/g,"");
      if(!t)continue;
      if(/^[0-9]+$/.test(t)){out.push(t);continue;}
      if(NUMW[t]){out.push(NUMW[t]);continue;}
      if(P.LEX[t]!==undefined){ if(P.LEX[t]!=="")out.push(P.LEX[t]); continue;}
      if(KEEP_LOAN.has(t)){out.push(LOAN_MAP[t]||dev2lat(t));continue;}
      if(/[\u0900-\u097F]/.test(t)) {UNK[t]=(UNK[t]||0)+1; const rr=dev2lat(t); if(!(rr.toLowerCase() in ROM2HI)) ROM2HI[rr.toLowerCase()]=t; out.push(rr);}
      else out.push(t);
    }
    if(verbKey){
      let v=vRoot(verbKey);
      if(want&&P.want) v=P.want.replace("%V",v);
      if(canDo&&P.can) v=P.can.replace("%V",v);
      v=conj(v,tense,neg);
      if(P.svo && out.length>1){ out.splice(1,0,v); } else out.push(v);
    } else if(neg&&P.negWord){ out.push(P.negWord); }
    let sent=out.join(" ").replace(/\s+/g," ").trim();
    if(!sent) sent=P.yes||"—";
    if(isQ) sent+= P.q? " "+P.q+"?" : "?";
    else if(tense==="imp"&&verbKey) sent+= excl?"!":".";
    else sent+= P.decl? " "+P.decl+"." : ".";
    sent=sent.charAt(0).toUpperCase()+sent.slice(1);
    return sent.replace(/\s+([?.!])/g,"$1");
  }
  function tWord(hi){
    let b=" "+hi.replace(/[।?!]/g,"").trim()+" ";
    for(const m of MULTI){ b=b.split(" "+m+" ").join(" §"+P.LEX[m].replace(/ /g,"¤")+"§ "); }
    const out=[];
    for(let t of b.trim().split(/\s+/).filter(Boolean)){
      if(t.startsWith("§")){out.push(t.replace(/[§]/g,"").replace(/¤/g," "));continue;}
      if(/^[0-9]+$/.test(t)){out.push(t);continue;}
      if(NUMW[t]){out.push(NUMW[t]);continue;}
      if(P.LEX[t]!==undefined){if(P.LEX[t]!=="")out.push(P.LEX[t]);continue;}
      if(KEEP_LOAN.has(t)){out.push(LOAN_MAP[t]||dev2lat(t));continue;}
      if(/[\u0900-\u097F]/.test(t)){UNK[t]=(UNK[t]||0)+1; const rr=dev2lat(t); if(!(rr.toLowerCase() in ROM2HI)) ROM2HI[rr.toLowerCase()]=t; out.push(rr);} else out.push(t);
    }
    let w=out.join(" ").trim()||"—";
    return w.charAt(0).toUpperCase()+w.slice(1);
  }
  return { tSent, tWord, latSent2dev };
}

/* ---------- regen-runner ---------- */
function regen(P){
  CURP=P; UNK={}; ROM2HI={};
  const E=makeLang(P);
  function load(p){global.window={};eval(fs.readFileSync(p,"utf8"));const d=window.KKB_DATA||window.KKB2_DATA;delete window.KKB_DATA;delete window.KKB2_DATA;return d;}
  const L1=load(PRIS+"/kkb_"+P.code+"_data.js");
  const L2=load(PRIS+"/kkb2_"+P.code+"_data.js");
  const LANG={code:P.code,label:P.labelHi,tts:P.tts||"en-IN",sr:P.tts||"en-IN",script:"latin"};
  const pair=h=>{const l=E.tSent(h);return [l,E.latSent2dev(l)];};
  const pairW=h=>{const l=E.tWord(h);return [l,E.latSent2dev(l)];};

  L1.lang=LANG;
  L1.version="2.0 (20-Oct, लाल10 — असली "+P.labelEn+" Latin, AI-draft मूल-वक्ता जाँच बाक़ी)";
  const T1=["Survival "+P.labelEn,"Daily Life "+P.labelEn,"Work "+P.labelEn,"Money, Travel & Safety","Employment & Occupation"];
  L1.weeks.forEach((w,i)=>{ if(T1[i])w.title=T1[i];
    for(const d of w.days) d.items=d.items.map(it=>{const[l,dv]=pair(it[2]);const o=it.slice();o[0]=l;o[1]=dv;return o;});
  });
  L1.help=[[E.tSent("धीरे बोलो।"),"धीरे बोलो।"],[E.tSent("क्या आप मेरी मदद कर सकते हैं?"),"क्या आप मेरी मदद कर सकते हैं?"]];
  /* 20-Oct काम-लाल10-ब खेप-2 additive: L1 का w.test/listen/dialog भी regen — पहले अछूता रह जाता था (lal10-व्यापी होल; grt-ऑडिट से पकड़ा) */
  for(const w of L1.weeks){
    if(w.test&&Array.isArray(w.test.lines)) w.test.lines=w.test.lines.map(l=>{
      const hiSrc=anp2hi(/[\u0900-\u097F]/.test(l[0])?l[0]:(l[1]||l[0]));
      const lat=/[\u0900-\u097F]/.test(hiSrc)?E.tSent(hiSrc):hiSrc;
      return [lat,E.latSent2dev(lat)];
    });
    if(w.test&&typeof w.test.goal==="string") w.test.goal=w.test.goal.replace(/अंगिका|चांग|अंगामी/g,P.labelHi);
    if(Array.isArray(w.listen)) w.listen=w.listen.map(q=>{
      const a=anp2hi(q[0].replace(/^\(सुनो\)\s*/,"")), b=anp2hi(q[1].replace(/^\(बोलो\)\s*/,""));
      const qa=/[\u0900-\u097F]/.test(a)?E.tSent(a):a, qb=/[\u0900-\u097F]/.test(b)?E.tSent(b):b;
      return ["(सुनो) "+qa,"(बोलो) "+qb];
    });
    if(Array.isArray(w.dialog)) w.dialog=w.dialog.map(d=>{
      const sp=d[0]; const hiSrc=anp2hi(d[1]);
      const lat=/[\u0900-\u097F]/.test(hiSrc)?E.tSent(hiSrc):hiSrc;
      return [sp,lat,E.latSent2dev(lat)];
    });
  }

  L2.lang=LANG;
  L2.heroTitle=P.labelHi+" ("+P.labelEn+") बोलने का सर्टिफिकेट कोर्स";
  L2.heroSub=P.labelHi+" बोलने का पूरा कोर्स — एक ही जगह, स्तर 1 + 2";
  L2.module=P.labelHi+" बोलने का सर्टिफिकेट कोर्स (स्तर-2)";
  L2.version="2.0 (20-Oct, लाल10 — असली "+P.labelEn+" Latin तीन-स्तंभ, master-mirror; AI-draft मूल-वक्ता जाँच बाक़ी)";
  L2.sub=P.labelHi+" स्तर-2 (A2)";
  L2.help=[[E.tSent("कृपया धीरे बोलिए।"),"कृपया धीरे बोलो।"],[E.tSent("कृपया फिर से बोलिए।"),"कृपया फिर से बोलिए।"]];
  for(const w of L2.weeks){
    for(const d of w.days){
      d.items=d.items.map(it=>{const[l,dv]=pair(it[2]);const o=it.slice();o[0]=l;o[1]=dv;return o;});
      if(Array.isArray(d.tw)) d.tw=d.tw.map(x=>{const[l,dv]=pairW(x[2]);const o=x.slice();o[0]=l;o[1]=dv;return o;});
      if(d.drill&&Array.isArray(d.drill.rows)){
        d.drill.rows=[
          [E.tSent("मैं अपने परिवार के साथ रहता हूँ।"),E.tSent("आप अपने परिवार के साथ रहते हैं।"),E.tSent("वह अपने परिवार के साथ रहता है।")],
          [E.tSent("मैं माँ को फोन करता हूँ।"),E.tSent("आप माँ को फोन करते हैं।"),E.tSent("वह माँ को फोन करता है।")]
        ];
      }
    }
    if(Array.isArray(w.listen)) w.listen=w.listen.map(q=>{
      const a=anp2hi(q[0].replace(/^\(सुनो\)\s*/,"")), b=anp2hi(q[1].replace(/^\(बोलो\)\s*/,""));
      const qa=/[\u0900-\u097F]/.test(a)?E.tSent(a):a, qb=/[\u0900-\u097F]/.test(b)?E.tSent(b):b;
      return ["(सुनो) "+qa,"(बोलो) "+qb];
    });
    if(Array.isArray(w.dialog)) w.dialog=w.dialog.map(d=>{
      const sp=d[0]; const hiSrc=anp2hi(d[1]);
      const lat=/[\u0900-\u097F]/.test(hiSrc)?E.tSent(hiSrc):hiSrc;
      return [sp,lat,E.latSent2dev(lat)];
    });
    if(w.test&&Array.isArray(w.test.lines)) w.test.lines=w.test.lines.map(l=>{
      const hiSrc=anp2hi(/[\u0900-\u097F]/.test(l[0])?l[0]:(l[1]||l[0]));
      const lat=/[\u0900-\u097F]/.test(hiSrc)?E.tSent(hiSrc):hiSrc;
      return [lat,E.latSent2dev(lat)];
    });
    if(w.test&&typeof w.test.goal==="string") w.test.goal=w.test.goal.replace(/अंगिका|चांग|अंगामी/g,P.labelHi);
  }

  function hdr(mod){return "/* "+mod+" — ACS काम की भाषा · "+P.labelHi+" ("+P.labelEn+") · v2.0 (20-Oct-2026, काम-लाल10)\n   असली Latin-लिपि तीन-स्तंभ — AI-draft, मूल-वक्ता जाँच बाक़ी। गिनती मशीन से देखें (dev_kkb2_check)। */\n";}
  fs.writeFileSync(REPO+"/assets/kkb_"+P.code+"_data.js",hdr("KKB L1")+"window.KKB_DATA = "+JSON.stringify(L1,null,1)+";\n");
  fs.writeFileSync(REPO+"/assets/kkb2_"+P.code+"_data.js",hdr("KKB L2")+"window.KKB2_DATA = "+JSON.stringify(L2,null,1)+";\n");
  let anpN=0;const BAD=/छी|छै|क्नो|हम्मर|करै|रहै|गेलौं|खेलौं|बउआ/;
  let dev0=0,s01=0,t=0;
  for(const w of L2.weeks){for(const d of w.days)for(const it of d.items){t++;if(/[\u0900-\u097F]/.test(it[0]))dev0++;if(it[0]===it[1])s01++;}
   for(const q of (w.listen||[]))for(const c of q)if(BAD.test(c))anpN++;
   for(const dd of (w.dialog||[]))if(BAD.test(dd[1]))anpN++;
   if(w.test)for(const l of w.test.lines)if(BAD.test(l[0]))anpN++;}
  console.log("✅ "+P.code+" regen: items="+t+" same01="+s01+" dev[0]="+dev0+" अंगिका-अवशेष="+anpN);
  console.log("  नमूना:",JSON.stringify(L2.weeks[0].days[0].items[0].slice(0,3)));
  console.log("  listen:",JSON.stringify(L2.weeks[0].listen[0]));
  const uk=Object.entries(UNK).sort((a,b)=>b[1]-a[1]);
  if(uk.length) console.log("  ⚠️ unknown-token ("+uk.length+"): "+uk.slice(0,70).map(e=>e[0]+"×"+e[1]).join(" "));
  UNK={};
  /* 20-Oct लाल10: workbook-कोश पूरक — LEX-उल्टा + V-उल्टा + ROM2HI (loan-रोमन→हिंदी) */
  const K2={};
  for(const [hi,lt] of Object.entries(P.LEX||{})){ const v=String(lt).trim(); if(!v||/\s/.test(v)) continue; const lk=v.toLowerCase(); if(!(lk in K2)) K2[lk]=hi; }
  for(const [hi,lt] of Object.entries(P.V||{})){ const v=String(lt).trim(); if(!v||/\s/.test(v)) continue; const lk=v.toLowerCase(); if(!(lk in K2)) K2[lk]=hi; }
  for(const [hi,lt] of Object.entries(P.V||{})){ const v=String(lt).trim(); if(!v||/\s/.test(v)) continue;
    for(const tpl of [P.past,P.fut,P.prog,P.neg,P.can,P.want,P.pres,P.imp]){ if(!tpl||tpl.indexOf("%V")<0) continue; /* 20-Oct लाल10-ब खेप-2 सुधार: pres/imp कोश-लूप में छूट गए थे (grt-kachra 182 की जड़) */
      const f=tpl.replace("%V",v); if(/\s/.test(f)) continue; const fk=f.toLowerCase(); if(!(fk in K2)) K2[fk]=hi; } }
  for(const [rom,hi] of Object.entries(ROM2HI)){ if(!(rom in K2)) K2[rom]=hi; }
  fs.writeFileSync(REPO+"/generator/data/lipi/"+P.code+"_shabdkosh_2.js",
    "/* "+P.labelHi+" ("+P.code+") workbook-कोश पूरक v1.0 (20-Oct लाल10, engine-regen से — हाथ से नहीं)\n   LEX-उल्टा + क्रिया-उल्टा + हिंदी-loan रोमन→मूल। गिनती मशीन से देखें। */\n"+
    "module.exports = "+JSON.stringify(K2,null,0)+";\n");
  console.log("  कोश-पूरक _2: "+Object.keys(K2).length+" प्रविष्टि");
}
module.exports={regen,dev2lat,anp2hi};
