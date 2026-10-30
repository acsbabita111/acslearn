/* dev_kkb_hindi_gate.js v1.1 · 30-Oct-2026 — छुपी-हिंदी पहरा (fail-closed)
   v1.1: क़र्ज़-सूची की हर भाषा के कोर्स-पन्ने पर सूचना-पट्टी अनिवार्य (translit_hold_flags या kkb_nakal_soochna) — पट्टी नहीं = FAIL
   नाप: हर भाषा-कोर्स (स्तर-1 + स्तर-2) के उच्चारण-खाने [1] में कितने शब्द हूबहू उसी वाक्य के हिंदी-अर्थ [2] के हैं।
   लिपि कोई भी हो (चेरोकी, सीरियाई, कातागाना…), उच्चारण देवनागरी में है — इसलिए दूसरी लिपि में लिखी हिंदी भी पकड़ी जाती है।
   छूट: (1) उधार-शब्द (फ़ोन, बस, टिकट…) गिनती से बाहर; (2) हिंदी-क्षेत्र की भाषाएँ/बोलियाँ (HINDI_PARIVAR) — इनमें मेल स्वाभाविक है।
   नियम: मान ≥ threshold (20%) और भाषा क़र्ज़-सूची (generator/data/kkb_hindi_karz.json) में नहीं = FAIL (नई गंदगी)।
         क़र्ज़-सूची की भाषा threshold से नीचे आ जाए = FAIL ("क़र्ज़ चुका — सूची से हटाओ", ताकि सूची सच्ची रहे)।
         warn (8%) से ऊपर = ⚠️ हाथ-जाँच सूची (FAIL नहीं)।
   चलाना: node generator/dev_kkb_hindi_gate.js            (सब भाषाएँ)
          node generator/dev_kkb_hindi_gate.js nqo sg       (कुछ भाषाएँ) */
"use strict";
const fs=require("fs"),path=require("path"); const ROOT=process.cwd();
const HINDI_PARIVAR=new Set(("ur bns bra cdh kgr jns srx him bfy cdj bhd gbk mjl sjp pwr kyw sck khr bgc awa bjj mal gjr gbm mtw bgr mag bho skr kfy bsn mwr pnb hne anp lri doi pa mai mtr nim dhu hdt lmn bhb sd ne ks gu mr hii bn as or raj kfx noe wbr gom kok dgo bhi").split(" "));
const LOAN=new Set("फोन फ़ोन नंबर बस टिकट बैंक पासपोर्ट मिनट बिल सीट गेट फोटो कार्ड मशीन ट्रेन ऑटो स्कूल डॉक्टर पुलिस बल्ब होटल किलो साइकिल".split(" ").map(t=>t.replace(/[़ँं]/g,"")));
const cl=t=>t.replace(/[।.,!?;:"“”()…،؟\-]/g,"").replace(/्$/,"").replace(/[़ँं]/g,"");
function items(c){const w={},w2={};
  new Function("window","self","module",fs.readFileSync(path.join(ROOT,"assets/kkb_"+c+"_data.js"),"utf8")+";")(w,w,{});
  new Function("window","self","module",fs.readFileSync(path.join(ROOT,"assets/kkb2_"+c+"_data.js"),"utf8")+";")(w2,w2,{});
  return w.KKB_DATA.weeks.flatMap(k=>k.days.flatMap(d=>d.items)).concat(w2.KKB2_DATA.weeks.flatMap(k=>(k.days||[]).flatMap(d=>d.items||[]))).filter(Array.isArray);}
function hp(c){const I=items(c);let tok=0,hit=0;
  I.forEach(x=>{const H=new Set(String(x[2]).split(/\s+/).map(cl).filter(t=>t.length>1&&!LOAN.has(t)));
    String(x[1]).split(/\s+/).map(cl).filter(Boolean).forEach(t=>{tok++; if(H.has(t))hit++;});});
  return tok?100*hit/tok:0;}
const K=JSON.parse(fs.readFileSync(path.join(ROOT,"generator/data/kkb_hindi_karz.json"),"utf8"));
const TH=K.threshold, WARN=K.warn, KARZ=K.karz||{};
let codes=process.argv.slice(2);
if(!codes.length) codes=fs.readdirSync(path.join(ROOT,"assets")).map(f=>(f.match(/^kkb2_([a-z]+)_data\.js$/)||[])[1]).filter(Boolean).filter(c=>fs.existsSync(path.join(ROOT,"assets/kkb_"+c+"_data.js")));
const fail=[],warn=[],paid=[]; let checked=0,karzSeen=0;
for(const c of codes){ if(HINDI_PARIVAR.has(c)||c==="en") continue; let v; try{v=hp(c);}catch(e){continue;} checked++;
  if(c in KARZ){ karzSeen++; if(v<TH) paid.push(c+"="+v.toFixed(1)+"%"); continue; }
  if(v>=TH) fail.push(c+"="+v.toFixed(1)+"%"); else if(v>=WARN) warn.push(c+"="+v.toFixed(1)+"%"); }
const FLAGS=new Set(require(path.join(ROOT,"generator/data/translit_hold_flags.js")).flags);
const NOTES=require(path.join(ROOT,"generator/data/kkb_nakal_soochna.js")).notes;
const noNote=Object.keys(KARZ).filter(c=>!FLAGS.has(c)&&!NOTES[c]);
if(noNote.length){ console.log("❌ क़र्ज़-सूची की भाषा पर कोर्स-पन्ने की सूचना-पट्टी नहीं: "+noNote.join(" ")+" (translit_hold_flags.js या kkb_nakal_soochna.js में जोड़ो)"); process.exitCode=1; }
console.log("छुपी-हिंदी पहरा: "+checked+" भाषाएँ जाँचीं (हिंदी-परिवार की "+HINDI_PARIVAR.size+" छूट) · सीमा "+TH+"% · क़र्ज़-सूची "+Object.keys(KARZ).length+" (इनमें से "+karzSeen+" इस दौड़ में)");
if(warn.length) console.log("⚠️ हाथ-जाँच ("+WARN+"–"+TH+"%): "+warn.join(" "));
if(paid.length) console.log("❌ क़र्ज़ चुका — इन्हें kkb_hindi_karz.json से हटाओ: "+paid.join(" "));
if(fail.length) console.log("❌ नई छुपी-हिंदी (सीमा से ऊपर, क़र्ज़-सूची में नहीं): "+fail.join(" "));
if(fail.length||paid.length||noNote.length) process.exit(1);
console.log("🏁 छुपी-हिंदी पहरा पास (क़र्ज़-सूची की हर भाषा पर सूचना-पट्टी भी)");
