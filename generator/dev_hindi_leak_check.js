/* dev_hindi_leak_check.js v1.0 · 24-Oct-2026 — robot #31: "हिंदी-शब्द प्रवेश" (हिंदी को दूसरी लिपि/भाषा में डाल देना)
   नाप R = उच्चारण-स्तंभ [1] के शब्दों में से कितने, उसी वाक्य के हिंदी-अर्थ [2] के शब्द हैं (व्यंजन-ढाँचा मिलान: मात्रा/नुक़्ता हटाकर)।
   परिवार (generator/data/lang_family.json, Glottolog): Indo-European भाषाओं में हिंदी-समानता स्वाभाविक → सिर्फ़ सूचना।
   ग़ैर-IE भाषा में R ≥ 0.25 = "दोषी" (असली भाषा नहीं)। translit_hold_flags.js वाली भाषाएँ = ज्ञात-होल (पट्टी लगी)।
   पीछे-न-खिसकना: generator/data/hindi_leak_baseline.json से तुलना — किसी भाषा का R 0.02 से ज़्यादा बढ़े, या कोई नई ग़ैर-IE भाषा 0.25 पार करे = FAIL।
   उपयोग: node generator/dev_hindi_leak_check.js            (जाँच)
          node generator/dev_hindi_leak_check.js --baseline (आज की स्थिति को baseline लिखना — सिर्फ़ Founder-मंज़ूर सुधार के बाद) */
const fs=require("fs"),path=require("path");const ROOT=path.join(__dirname,"..");
const FAM=require("./data/lang_family.json").langs;const HOLD=new Set(require("./data/translit_hold_flags.js").flags);
const BASEF=path.join(__dirname,"data","hindi_leak_baseline.json");const TH=0.25,EXEMPT=new Set(["ur"]);
const sk=t=>t.replace(/[\u093e-\u094d\u0901-\u0903\u093c\u0962\u0963\u0951-\u0954\u200c\u200d]/g,"").replace(/[।?,.!"'()]/g,"");
const tk=s=>String(s||"").split(/\s+/).map(sk).filter(x=>x.length>=2);
function load(f){const w={};new Function("window","self","module",fs.readFileSync(f,"utf8")+";")(w,w,{});return w.KKB2_DATA||w.KKB_DATA;}
const R={};
for(const f of fs.readdirSync(path.join(ROOT,"assets")).filter(f=>/^kkb2_[a-z]+_data\.js$/.test(f))){
  const c=f.slice(5,-8);let D;try{D=load(path.join(ROOT,"assets",f));}catch(e){continue}if(!D)continue;
  let t=0,m=0;D.weeks.forEach(w=>w.days.forEach(d=>d.items.forEach(it=>{const H=new Set(tk(it[2]));tk(it[1]).forEach(x=>{t++;if(H.has(x))m++;});})));
  R[c]=t?+(m/t).toFixed(3):0;}
if(process.argv.includes("--baseline")){fs.writeFileSync(BASEF,JSON.stringify({_date:new Date().toISOString().slice(0,10),R},null,0));console.log("baseline लिखा: "+Object.keys(R).length+" भाषाएँ");process.exit(0);}
const B=fs.existsSync(BASEF)?require(BASEF).R:{};let fail=0;const guilty=[],hold=[],ie=[];
for(const [c,r] of Object.entries(R)){
  const fam=(FAM[c]||{}).family||"";const isIE=fam==="indo1319";
  if(B[c]!==undefined&&r>B[c]+0.02){fail++;console.log("⛔ पीछे खिसका: "+c+" R "+B[c]+" → "+r);}
  if(!isIE&&!EXEMPT.has(c)&&fam&&r>=TH){if(HOLD.has(c))hold.push(c+":"+r);else{guilty.push(c+":"+r);if(B[c]===undefined||B[c]<TH){fail++;console.log("⛔ नया दोषी: "+c+" R "+r);}}}
  if(isIE&&r>=0.6)ie.push(c+":"+r);}
console.log("ज्ञात-होल (पट्टी लगी) "+hold.length+": "+hold.join(" "));
console.log("दोषी, पट्टी नहीं ("+guilty.length+"): "+guilty.join(" "));
console.log("सूचना — IE, हिंदी-समान ≥0.6 ("+ie.length+"): "+ie.join(" "));
console.log(fail?"⛔ FAIL "+fail:"🏁 dev_hindi_leak_check: कोई भाषा पीछे नहीं खिसकी, कोई नया दोषी नहीं");process.exit(fail?1:0);
