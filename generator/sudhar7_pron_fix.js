/* सुधार-7 खेप-4: उच्चारण-स्तंभ [1] व test-पंक्ति सफ़ाई (सर्व-भाषा, data-स्तर; हाथ से नहीं)
   D — L1/L2 test-पंक्ति में अंगिका-pristine अवशेष → उसी भाषा का अपना item (anp-स्थान से हूबहू; हिंदी-अर्थ वही)
   C — test/tw का [1] Latin हो और [0] उसी भाषा के किसी item[0] से हूबहू → उस item का [1]
   A — [1] में Latin संक्षेप (UPI/OTP/AI…) → देवनागरी (देवनागरी-भाषा में [0]=[1] दर्पण दोनों में)
   चलाना: node generator/sudhar7_pron_fix.js [--write] [code…]   (बिना --write = सिर्फ़ रिपोर्ट) */
"use strict";
const fs=require("fs");
const WRITE=process.argv.includes("--write");
const ONLY=process.argv.slice(2).filter(a=>!a.startsWith("--"));
function load(f){const w={};new Function("window","self","module",fs.readFileSync(f,"utf8")+";")(w,w,{});return w.KKB_DATA||w.KKB2_DATA;}
function save(f,D,key){const s=fs.readFileSync(f,"utf8");const m=s.match(new RegExp("window\\."+key+"\\s*=\\s*"));if(!m)throw new Error("साँचा नहीं: "+f);
  fs.writeFileSync(f,s.slice(0,m.index)+m[0]+JSON.stringify(D,null,1)+";\n");}
const EXEMPT=new Set("anp mai mag bho bjj sjp khr sck kyw dhu hdt mr lri gon hne kfy awa".split(" ")); /* बिहारी/राजस्थानी — छी/छै/हमर असली शब्द */
const BAD=/(^|\s)(H|छी|छै|क्नो|हमर|हमरा|अहाँ|अहाँक|छथिन|करै|रहै|गेलौं|खेलौं|कतेक|कतय|मिलत|मिलल|सकैत|सकीं|बैसू|बताऊ|करू|खोजैत|शुक्रबार)([\s।?,!]|$)/;
const ACR={"UPI":"यूपीआई","OTP":"ओटीपी","AI":"एआई","PIN":"पिन","PF":"पीएफ़","ESI":"ईएसआई","UTS":"यूटीएस","PNR":"पीएनआर","ITI":"आईटीआई","IMEI":"आईएमईआई","IRCTC":"आईआरसीटीसी","TT":"टीटी","ATM":"एटीएम","SIM":"सिम","ID":"आईडी","AC":"एसी","A2":"ए2","eMigrate":"ई-माइग्रेट","e-Shram":"ई-श्रम","WhatsApp":"व्हाट्सऐप","Aadhaar":"आधार","S-4":"एस-4"};
const ACR_K=Object.keys(ACR).sort((a,b)=>b.length-a.length);
function acr(s){let t=s;for(const k of ACR_K){t=t.replace(new RegExp("(^|[^A-Za-z])"+k.replace(/[-]/g,"\\-")+"(?=[^A-Za-z]|$)","g"),(m,p)=>p+ACR[k]);}return t;}
const scripts=JSON.parse(fs.readFileSync(__dirname+"/../generator/sudhar7_scripts.json","utf8"));
const ANP={L1:load(__dirname+"/../assets/kkb_anp_data.js"),L2:load(__dirname+"/../assets/kkb2_anp_data.js")};
function anpPos(A){return A.weeks.map(w=>{const ix={};w.days.forEach((d,di)=>d.items.forEach((it,ii)=>{if(!(it[0] in ix))ix[it[0]]=[di,ii];}));return ((w.test&&w.test.lines)||[]).map(l=>ix[l[0]]||null);});}
const POS={L1:anpPos(ANP.L1),L2:anpPos(ANP.L2)};
const codes=(ONLY.length?ONLY:fs.readFileSync(__dirname+"/../generator/sudhar7_codes.txt","utf8").trim().split("\n")).filter(c=>c!=="en"&&c!=="anp");
const REP={}; let TOT={D:0,C:0,A:0,left:0};
for(const c of codes){
  const isDev=/^devanagari/.test(scripts[c]||"");
  const r={D:0,C:0,A:0,left:[]};
  const F={L1:__dirname+"/../assets/kkb_"+c+"_data.js",L2:__dirname+"/../assets/kkb2_"+c+"_data.js"};
  const DD={L1:load(F.L1),L2:load(F.L2)};
  const MAN=JSON.parse(fs.readFileSync(__dirname+"/sudhar7_pron_manual.json","utf8")); const MW=MAN._words;
  const man=s=>{if(!/[A-Za-z]/.test(s||""))return s;let o=s;for(const [a,b] of (MAN._all||[]).concat(MAN[c]||[]))o=o.split(a).join(b);return o;};
  const P=s=>String(s).replace(/[.,!?;:"“”()।]/g,"").trim();
  const WM=new Map();
  const it0=new Map(); ["L1","L2"].forEach(L=>DD[L].weeks.forEach(w=>w.days.forEach(d=>d.items.forEach(it=>{const k=String(it[0]).trim();if(!it0.has(k)&&!/[A-Za-z]/.test(isDev?"":it[1]))it0.set(k,it);}))));
  ["L1","L2"].forEach(L=>DD[L].weeks.forEach(w=>w.days.forEach(d=>{d.items.concat(d.tw||[]).forEach(it=>{const a=P(it[0]).split(/\s+/),b=P(it[1]).split(/\s+/);if(a.length===b.length&&/[\u0900-\u097F]/.test(it[1])&&!/[^\u0900-\u097F\s0-9\-'’_.,!?;:"“”()।\/—]/.test(it[1]))a.forEach((tk,i)=>{const k=tk.toLowerCase();if(!WM.has(k))WM.set(k,b[i]);});});})));
  for(const L of ["L1","L2"]){const D=DD[L];
    D.weeks.forEach((w,wi)=>{
      if(w.test&&Array.isArray(w.test.lines)) w.test.lines=w.test.lines.map((l,li)=>{
        let x=l.slice();
        /* D */
        if(!EXEMPT.has(c)){const al=ANP[L].weeks[wi]&&ANP[L].weeks[wi].test&&ANP[L].weeks[wi].test.lines[li];
          const ov=(a,b)=>{const A=new Set(String(a).split(/\s+/)),B=String(b).split(/\s+/);return B.filter(t=>A.has(t)).length/Math.max(1,B.length);};
          if((BAD.test(x[0])||(al&&ov(al[0],x[0])>=0.6&&!/[A-Za-z]/.test(al[0])&&/[\u0900-\u097F]/.test(x[0])&&!isDev))){
            const p=POS[L][wi]&&POS[L][wi][li]; if(p){const own=D.weeks[wi].days[p[0]].items[p[1]]; x=[own[0],own[1]]; r.D++;} }
        }
        /* C */
        if(/[A-Za-z]/.test(x[1]||"")&&!isDev){const m=it0.get(String(x[0]).trim()); if(m&&!/[A-Za-z]/.test(m[1])){x=[x[0],m[1]];r.C++;}}
        /* A */
        if(/[A-Za-z]/.test(x[1]||"")){const n=acr(x[1]); if(n!==x[1]){x[1]=n; if(isDev)x[0]=acr(x[0]); r.A++;}}
        /* W — शब्द-मिलान (अपने items/tw से); M — हाथ-नक़्शा */
        if(/[A-Za-z]/.test(x[1]||"")&&!isDev){const toks=P(x[0]).split(/\s+/);const out=toks.map(tk=>WM.get(tk.toLowerCase())||MW[tk.toLowerCase()]);if(out.every(Boolean)){x=[x[0],out.join(" ")+(/\?\s*$/.test(x[0])?"?":"।")];r.C++;}}
        {const mm=man(x[1]); if(mm!==x[1]){x[1]=mm; r.A++;}}
        if(/[A-Za-z]/.test(x[1]||"")) r.left.push(L+"w"+wi+"test"+li+": "+x[1]);
        return x;
      });
      w.days.forEach((d,di)=>{
        d.items.forEach((it,ii)=>{ if(/[A-Za-z]/.test(it[1])){const n=man(acr(it[1])); if(n!==it[1]){it[1]=n; if(isDev)it[0]=acr(it[0]); r.A++;} if(/[A-Za-z]/.test(it[1]))r.left.push(L+"w"+wi+"d"+di+"it"+ii+": "+it[1]);} });
        (d.tw||[]).forEach((t,ti)=>{ if(t[1]&&/\p{L}/u.test(t[1])&&!/[\u0900-\u097F]/.test(t[1])&&!isDev){const m=it0.get(String(t[0]).trim()); let nv=m&&/[\u0900-\u097F]/.test(m[1])&&!/[A-Za-z]/.test(m[1])?m[1]:null;
              if(!nv){const toks=P(t[0]).split(/\s+/);const out=toks.map(tk=>WM.get(tk.toLowerCase())||MW[tk.toLowerCase()]);if(out.every(Boolean))nv=out.join(" ");}
              if(nv){t[1]=nv;r.C++;} else r.left.push(L+"w"+wi+"d"+di+"tw"+ti+" (देव-रहित): "+t[0]+" → "+t[1]);}
          if(/[A-Za-z]/.test(t[1]||"")){
            if(!isDev){const m=it0.get(String(t[0]).trim()); if(m&&!/[A-Za-z]/.test(m[1])){t[1]=m[1];r.C++;}}
            if(/[A-Za-z]/.test(t[1])){const n=man(acr(t[1])); if(n!==t[1]){t[1]=n; if(isDev)t[0]=acr(t[0]); r.A++;}}
            if(/[A-Za-z]/.test(t[1]))r.left.push(L+"w"+wi+"d"+di+"tw"+ti+": "+t[1]);} });
      });
    });
    if(WRITE&&(r.D||r.C||r.A)) save(F[L],D,L==="L1"?"KKB_DATA":"KKB2_DATA");
  }
  if(r.D||r.C||r.A||r.left.length){REP[c]=r; TOT.D+=r.D;TOT.C+=r.C;TOT.A+=r.A;TOT.left+=r.left.length;}
}
for(const [c,r] of Object.entries(REP)) console.log(c.padEnd(4),"D",r.D,"C",r.C,"A",r.A,"| बचा",r.left.length,(r.left.length?"→ "+r.left.slice(0,2).join(" ‖ "):""));
console.log("कुल:",JSON.stringify(TOT),WRITE?"(लिखा)":"(सिर्फ़ रिपोर्ट)");
fs.writeFileSync("/tmp/pronfix_left.json",JSON.stringify(Object.fromEntries(Object.entries(REP).map(([c,r])=>[c,r.left])),null,1));
