/* generator/build_matrix_from_kkb.js — v1.0 · 06-Oct-2026 (416-महा-मिशन, कदम-1-स)
   काम: 130 पुरानी प्रमाणित भाषाओं का kkb/kkb2 content → matrix/<code>.js (s-ID-बद्ध)।
   लोहे के नियम: (1) हिंदी-स्तंभ कभी नहीं लिखा जाता — सिर्फ़ दर्पण-जाँच में मिलाया जाता है
   (2) दर्पण-बेमेल >30 पंक्ति = उस भाषा की FAIL, फ़ाइल बनती ही नहीं (fail-closed)
   (3) वंशावली-header अनिवार्य (FAIR — संदर्भ-ग्रंथ #13)। गिनती मशीन से। */
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const MASTER=require(path.join(ROOT,"matrix/master_sentences.js"));
const OLD=JSON.parse(fs.readFileSync("/tmp/old130.json","utf8"));
function loadKKB(f){const p=path.join(ROOT,"assets",f);if(!fs.existsSync(p))return null;
  const w={};try{new Function("window","self",fs.readFileSync(p,"utf8"))(w,w);}catch(e){return null;}
  return w.KKB_DATA||w.KKB2_DATA||null;}
function walk(D){const o=[];(D.weeks||[]).forEach(wk=>(wk.days||[]).forEach(dy=>(dy.items||[]).forEach(it=>o.push(it))));return o;}
const rep=[];
OLD.forEach(code=>{
  const f1=code==="en"?"kkb_data.js":"kkb_"+code+"_data.js";
  const f2=code==="en"?"kkb2_data.js":"kkb2_"+code+"_data.js";
  const D1=loadKKB(f1),D2=loadKKB(f2);
  if(!D1){rep.push({code,st:"🔴",note:"L1-फ़ाइल नहीं"});return;}
  const items=walk(D1).concat(D2?walk(D2):[]);
  const n=items.length, cov=n+"/"+MASTER.total;
  let mm=0; const mmlist=[];
  for(let i=0;i<n;i++){ if((items[i][2]||"")!==MASTER.rows[i][5]){mm++;if(mmlist.length<5)mmlist.push(MASTER.rows[i][0]);} }
  if(mm>30){rep.push({code,st:"🔴",note:"दर्पण-बेमेल "+mm,cov});return;}
  const rows=items.map((it,i)=>[MASTER.rows[i][0],it[0]||"",it[1]||""]);
  const body="/* matrix/"+code+".js v1.0 · 06-Oct-2026 — 130-पुरानी migration (build_matrix_from_kkb v1.0)\n"+
   "   वंशावली: स्रोत=assets/"+f1+(D2?"+"+f2:"")+" · जाँचकर्ता-1=⬜ · जाँचकर्ता-2=⬜ · वर्तनी-मानक=⬜ ·\n"+
   "   दर्जा=130-पुरानी(प्रमाणित-स्तर); वैज्ञानिक-मुहर ⬜ (2-हस्ताक्षर+उल्टा-अनुवाद बाक़ी) · दर्पण-बेमेल="+mm+" (भाषा-नाम पंक्तियाँ)\n"+
   "   पंक्ति=[s-ID, मूल-लिपि, देवनागरी-उच्चारण] — हिंदी यहाँ कभी नहीं (धुरी master में)। गिनती मशीन से। */\n"+
   "module.exports={ver:\"1.0\",code:"+JSON.stringify(code)+",total:"+rows.length+
   ",vanshavali:{srot:"+JSON.stringify(f1+(D2?"+"+f2:""))+",j1:\"⬜\",j2:\"⬜\",vartani:\"⬜\",darja:\"130-purani\",seal:\"⬜\",mirror_mm:"+mm+"},rows:[\n"+
   rows.map(r=>JSON.stringify(r)).join(",\n")+"\n]};\n";
  fs.writeFileSync(path.join(ROOT,"matrix",code+".js"),body,"utf8");
  rep.push({code,st:D2?"✅":"🟠",note:(D2?"पूर्ण":"L1-मात्र"),cov,mm});
});
fs.writeFileSync("/tmp/migration_report.json",JSON.stringify(rep));
const ok=rep.filter(r=>r.st==="✅").length,l1=rep.filter(r=>r.st==="🟠").length,bad=rep.filter(r=>r.st==="🔴").length;
console.log("🏁 migration: ✅पूर्ण="+ok+" 🟠L1-मात्र="+l1+" 🔴fail="+bad+" / "+OLD.length);
rep.filter(r=>r.st!=="✅").forEach(r=>console.log(" ",r.st,r.code,r.note,r.cov||""));
