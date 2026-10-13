/* generator/fix_europe24_v1.js — पड़ाव-ब (Addendum v7.0): 24 यूरोप-खेप भाषाओं की ढाँचा-मरम्मत
   स्रोत-नियम: हर नया लक्ष्य-भाषा पाठ सिर्फ़ उस भाषा के अपने मौजूदा 2150-corpus से (गढ़ा शून्य)।
   जोड़: L2 — tw(6/दिन, co-occurrence निकासी) · listen(2/सप्ताह) · dialog(मास्टर-गिनती) ·
   test(मास्टर-गिनती, position-lookup; मौजूदा हो तो byte-अछूता) · drill(65, दिन-वाक्य दोहराव)
   L1 — 5 test-block (position-lookup)। दर्पण: item[2]:=मास्टर(अंग्रेज़ी→भाषा-नाम), [3],[4]:=मास्टर;
   w4d4#16 हिंदी→भाषा-नाम (ALLOWED-छूट का प्रयोग)। week n/title/hi/pace, day.title := मास्टर। */
"use strict";
const fs = require("fs");
const PATH = p => "/home/claude/work24/repo/" + p;

const LANGS = {
  cat:"कातालान", cym:"वेल्श", dan:"डैनिश", est:"एस्टोनियाई", eus:"बास्क",
  fao:"फ़रोईज़", gla:"स्कॉटिश-गेलिक", gle:"आइरिश", glg:"गैलिशियन", isl:"आइसलैंडिक",
  kal:"ग्रीनलैंडिक", lav:"लात्वियाई", lij:"लिगुरियाई", lmo:"लोम्बार्ड", ltz:"लक्ज़मबर्गिश",
  mkd:"मैसीडोनियाई", niv:"निव्ख", nob:"नॉर्वेजियन", scn:"सिसिलियाई", slv:"स्लोवेनियाई",
  sme:"उत्तरी-सामी", sqi:"अल्बानियाई", szl:"सिलेसियाई", vec:"वेनेशियाई"
};
const HAS_TEST = { lij:1, lmo:1, scn:1, szl:1, vec:1 }; // इनके L2-test byte-अछूते रहें

function load(file, key){ const w={}; global.window=w; delete require.cache[require.resolve(PATH(file))]; require(PATH(file)); return w[key]; }
const M2 = load("assets/kkb2_data.js","KKB2_DATA");
const M1 = load("assets/kkb_data.js","KKB_DATA");

/* EN corpus → position नक़्शे */
const EN2POS = new Map(); M2.weeks.forEach((w,wi)=>w.days.forEach((d,di)=>d.items.forEach((it,ii)=>{ if(!EN2POS.has(it[0])) EN2POS.set(it[0],[wi,di,ii]); })));
const EN1POS = new Map(); M1.weeks.forEach((w,wi)=>w.days.forEach((d,di)=>d.items.forEach((it,ii)=>{ if(!EN1POS.has(it[0])) EN1POS.set(it[0],[wi,di,ii]); })));

const HI_STOP = new Set(("है हैं हूँ था थी थे हो गया गई गए रहा रही रहे का की के को से में पर और या भी नहीं एक यह वह ये वे मैं हम तुम आप मेरा मेरी मेरे हमारा आपका उसका उनका कि जो तो अब क्या कौन कब कहाँ कैसे लिए साथ बाद पहले फिर बहुत कुछ सब हर "+
"किया करो करें करता करती करते दिया लिया आया गया जाना आना होना वाला वाली वाले").split(/\s+/));
const PUNCT = /[.,!?;:«»"'()¡¿।…\u2018\u2019\u201C\u201D]/g;
const tok = s => String(s).replace(PUNCT," ").split(/\s+/).filter(Boolean);
const lc = s => s.toLowerCase();
function hiWords(s){ return tok(s).filter(w=>/[\u0900-\u097F]/.test(w) && !HI_STOP.has(w) && w.length>1); }

function buildIndexes(D){
  const gFreq=new Map(), cooc=new Map(), pron=new Map(), sentsByHi=new Map();
  D.weeks.forEach(w=>w.days.forEach(d=>d.items.forEach(it=>{
    const t0=tok(it[0]), t1=tok(it[1]); const aligned = t0.length===t1.length;
    const hws = hiWords(it[2]||"");
    t0.forEach((t,i)=>{ const k=lc(t); gFreq.set(k,(gFreq.get(k)||0)+1);
      if(aligned && !pron.has(k)) pron.set(k, t1[i]);
      hws.forEach(h=>{ let m=cooc.get(k); if(!m){m=new Map();cooc.set(k,m);} m.set(h,(m.get(h)||0)+1); });
    });
    hws.forEach(h=>{ let a=sentsByHi.get(h); if(!a){a=[];sentsByHi.set(h,a);} a.push(it); });
  })));
  return {gFreq,cooc,pron,sentsByHi};
}

function pickTokenForHi(hw, IX, used){
  const sents = IX.sentsByHi.get(hw); if(!sents||!sents.length) return null;
  const cand=new Map();
  sents.forEach(it=>tok(it[0]).forEach(t=>{const k=lc(t); cand.set(k,(cand.get(k)||0)+1);}));
  let best=null,bs=-1;
  cand.forEach((c,k)=>{ if(used.has(k)) return; if(c<Math.min(2,sents.length)) return;
    const g=IX.gFreq.get(k)||1; const s=c*c/g; // co-occ² / global — विशिष्टता
    if(s>bs){bs=s;best=k;} });
  if(!best) return null;
  // मूल रूप (case) + उच्चारण
  let orig=best, pr=IX.pron.get(best)||"";
  outer: for(const it of sents){ const t0=tok(it[0]),t1=tok(it[1]);
    for(let i=0;i<t0.length;i++) if(lc(t0[i])===best){ orig=t0[i]; if(t0.length===t1.length) pr=t1[i]; break outer; } }
  return {tok:orig, pron:pr||orig, key:best};
}
function dayDistinct(dayItems, IX, used, n){
  const cand=new Map();
  dayItems.forEach(it=>tok(it[0]).forEach(t=>{const k=lc(t); if(!used.has(k)) cand.set(k,(cand.get(k)||0)+1);}));
  const arr=[...cand.entries()].map(([k,c])=>[k,c/(IX.gFreq.get(k)||1)]).sort((a,b)=>b[1]-a[1]);
  const out=[];
  for(const [k] of arr){ if(out.length>=n) break;
    let hw="", bm=0; const m=IX.cooc.get(k); if(m) m.forEach((c,h)=>{if(c>bm){bm=c;hw=h;}});
    if(!hw) continue;
    let orig=k, pr=IX.pron.get(k)||"";
    for(const it of dayItems){ const t0=tok(it[0]),t1=tok(it[1]);
      const i=t0.findIndex(x=>lc(x)===k); if(i>=0){orig=t0[i]; if(t0.length===t1.length)pr=t1[i]; break;} }
    out.push({tok:orig,pron:pr||orig,hi:hw,key:k}); used.add(k);
  }
  return out;
}
const stripP = s => String(s).replace(/[।.!?]+$/,"");

function subst(hi, lname){ return String(hi).replace(/अंग्रेज़ी|English/g, lname); }

function repair(code){
  const lname = LANGS[code];
  const T2 = load("assets/kkb2_"+code+"_data.js","KKB2_DATA");
  const T1 = load("assets/kkb_"+code+"_data.js","KKB_DATA");
  const IX = buildIndexes(T2);
  const flat2=[]; T2.weeks.forEach((w,wi)=>w.days.forEach((d,di)=>d.items.forEach((it,ii)=>flat2.push({wi,di,ii,it}))));
  const pos2=(wi,di,ii)=>T2.weeks[wi].days[di].items[ii];
  const pos1=(wi,di,ii)=>T1.weeks[wi].days[di].items[ii];

  /* --- L2 दर्पण: week/day मेटा + item cols 2/3/4 --- */
  T2.weeks.forEach((w,wi)=>{ const mw=M2.weeks[wi];
    w.n=mw.n; w.title=mw.title; w.hi=mw.hi; if(mw.pace!==undefined) w.pace=mw.pace;
    w.days.forEach((d,di)=>{ const md=mw.days[di]; d.title=md.title;
      d.items.forEach((it,ii)=>{ const mi=md.items[ii];
        it.length=5; it[2]=subst(mi[2],lname); it[3]=mi[3]; it[4]=mi[4];
        if(wi===4&&di===4&&ii===16) it[2]=String(mi[2]).replace(/हिंदी/g,lname); /* ALLOWED-छूट */
      });
    });
  });
  /* --- tw (6/दिन) --- */
  T2.weeks.forEach((w,wi)=>w.days.forEach((d,di)=>{
    const md=M2.weeks[wi].days[di]; const used=new Set(); const twOut=[];
    (md.tw||[]).forEach(mt=>{ const hw=(hiWords(mt[2])[0])||mt[2];
      const p=pickTokenForHi(hw,IX,used);
      if(p){ twOut.push([p.tok,stripP(p.pron),mt[2],mt[3]||"क"]); used.add(p.key); } });
    if(twOut.length<6){ dayDistinct(d.items,IX,used,6-twOut.length).forEach(x=>twOut.push([x.tok,stripP(x.pron),x.hi,"क"])); }
    d.tw=twOut.slice(0,6);
  }));
  /* --- listen (2/सप्ताह): प्रश्न→उत्तर जोड़ी, वरना क्रमिक --- */
  T2.weeks.forEach((w,wi)=>{
    const items=[]; w.days.forEach(d=>items.push(...d.items));
    const pairs=[]; const usedI=new Set();
    for(let i=0;i<items.length-1&&pairs.length<2;i++){
      if(/\?$/.test(items[i][0])&&!usedI.has(i)){ pairs.push([items[i][0],"(बोलो) "+items[i+1][0]]); usedI.add(i);usedI.add(i+1);} }
    for(let i=0;i<items.length-1&&pairs.length<2;i+=2){ if(!usedI.has(i)&&!usedI.has(i+1)){ pairs.push([items[i][0],"(बोलो) "+items[i+1][0]]); usedI.add(i);usedI.add(i+1);} }
    w.listen=pairs; w._usedI=usedI; w._items=items;
  });
  /* --- dialog (मास्टर-गिनती; वक्ता-नाम मास्टर से हूबहू) --- */
  T2.weeks.forEach((w,wi)=>{ const mdlg=M2.weeks[wi].dialog;
    const items=w._items, usedI=w._usedI; const dlg=[]; let p=0;
    for(let j=0;j<mdlg.length;j++){ while(p<items.length&&usedI.has(p))p++;
      if(p>=items.length)p=0; dlg.push([mdlg[j][0], items[p][0]]); usedI.add(p); p++; }
    w.dialog=dlg;
  });
  /* --- test (मास्टर-गिनती; position-lookup; 5-भाषा मौजूदा अछूता) --- */
  T2.weeks.forEach((w,wi)=>{ if(HAS_TEST[code]&&w.test&&w.test.lines) return;
    const mt=M2.weeks[wi].test; const lines=[]; const usedI=w._usedI; const items=w._items;
    mt.lines.forEach(ml=>{ const pos=EN2POS.get(ml[0]);
      if(pos){ const t=pos2(pos[0],pos[1],pos[2]); lines.push([t[0],t[1]]); }
      else { let p=0; while(p<items.length&&usedI.has(p))p++; if(p>=items.length)p=0;
        lines.push([items[p][0],items[p][1]]); usedI.add(p); } });
    w.test={ target: mt.target, goal: subst(mt.goal,lname), lines };
  });
  T2.weeks.forEach(w=>{ delete w._usedI; delete w._items; });
  /* --- drill (65) --- */
  T2.weeks.forEach(w=>w.days.forEach(d=>{
    d.drill={ hi:"बोलो-अभ्यास — नीचे के वाक्य तीन-तीन बार ज़ोर से दोहराओ।",
      rows:[[d.items[0][0]],[d.items[1][0]],[d.items[2][0]]] };
  }));

  /* --- L1 दर्पण + 5 test-block --- */
  T1.weeks.forEach((w,wi)=>{ const mw=M1.weeks[wi];
    w.n=mw.n; w.title=mw.title; w.hi=mw.hi;
    w.days.forEach((d,di)=>{ const md=mw.days[di]; d.title=md.title;
      d.items.forEach((it,ii)=>{ const mi=md.items[ii];
        if(mi&&mi.length>2){ it[2]=subst(mi[2],lname); if(mi.length>3)it[3]=mi[3]; if(mi.length>4)it[4]=mi[4]; } });
    });
    const items=[]; w.days.forEach(d=>items.push(...d.items)); let p=0; const usedI=new Set();
    const lines=[]; const mt=mw.test;
    mt.lines.forEach(ml=>{ const pos=EN1POS.get(ml[0]);
      if(pos){ const t=pos1(pos[0],pos[1],pos[2]); lines.push([t[0],t[1]]); }
      else { while(p<items.length&&usedI.has(p))p++; if(p>=items.length)p=0;
        lines.push([items[p][0],items[p][1]]); usedI.add(p); p++; } });
    w.test={ target: mt.target, goal: subst(mt.goal,lname), lines };
  });

  /* --- लिखाई --- */
  const hdr2 = "/* kkb2_"+code+"_data.js — v2.0-ब (09-Oct-2026, fix_europe24 v1): ढाँचा-मरम्मत —\n"+
   "   tw/listen/dialog/test/drill corpus-निकासी से (गढ़ा-पाठ शून्य) · item[2/3/4] मास्टर-दर्पण ·\n"+
   "   tw = co-occurrence मशीन-निकासी (🟡 — गुणवत्ता-ऑडिट पड़ाव-द में) · Addendum v7.0 पटरी-ब */\n";
  const hdr1 = "/* kkb_"+code+"_data.js — v2.0-ब (09-Oct-2026, fix_europe24 v1): L1 दर्पण + 5 test-block (position-lookup) */\n";
  fs.writeFileSync(PATH("assets/kkb2_"+code+"_data.js"), hdr2+"window.KKB2_DATA="+JSON.stringify(T2)+";\n");
  fs.writeFileSync(PATH("assets/kkb_"+code+"_data.js"), hdr1+"window.KKB_DATA="+JSON.stringify(T1)+";\n");
  return {code, tw:T2.weeks.reduce((a,w)=>a+w.days.reduce((b,d)=>b+d.tw.length,0),0)};
}

const out=[];
Object.keys(LANGS).forEach(c=>{ try{ out.push(repair(c)); }catch(e){ console.log("⛔",c,e.message); } });
console.log("मरम्मत:", out.map(o=>o.code+"(tw:"+o.tw+")").join(" "));
console.log("कुल भाषाएँ:", out.length+"/24");
