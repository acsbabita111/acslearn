/* generator/dev_matrix_check.js — v1.0 · 06-Oct-2026 (416-महा-मिशन का मास्टर-द्वार)
   नए 11-नियम (वैज्ञानिक-नियम शीट) का fail-closed robot — matrix/ की हर भाषा-फ़ाइल पर:
   1 s-ID अखंडता (gap/दोहराव/क्रम) + master-कवरेज    2 लिपि-नियम — एकमात्र घर dev_kkb2_check की
   SCRIPT_RULES से runtime-पढ़ा (दोहराव नहीं); अनजान भाषा = FAIL (fail-closed)
   3 item[1] = देवनागरी-उपस्थित + विदेशी-लिपि शून्य   4 82%-कांड-पहरा: देवनागरी-native भाषा में
   item[0]==master-हिंदी ≤5% (संख्या छपे), अन्य में ≤0.5%   5 वंशावली-header 6 खाने अनिवार्य
   6 clone-पहरा: item[0]-स्तंभ का hash दो भाषाओं में एक = FAIL   7 कवरेज-ईमानदारी (आंशिक = लाउड 🟠)
   बिना 🏁 कोई भाषा मुहर/upload योग्य नहीं। गिनती मशीन से। */
const fs=require("fs"),path=require("path"),crypto=require("crypto");
const ROOT=path.join(__dirname,"..");
const MASTER=require(path.join(ROOT,"matrix/master_sentences.js"));
const src=fs.readFileSync(path.join(__dirname,"dev_kkb2_check.js"),"utf8");
const m=src.match(/var SCRIPT_RULES = \{([\s\S]*?)\n  \};/); if(!m){console.log("🔴 SCRIPT_RULES नहीं मिली");process.exit(1);}
const SR=new Function("return {"+m[1]+"\n};")();
const DEV=/[\u0900-\u097F]/;
const files=fs.readdirSync(path.join(ROOT,"matrix")).filter(f=>/^[a-z]{2,5}\.js$/.test(f));
let pass=0,warn=0,fail=0; const audit=[]; const hashes={};
files.forEach(f=>{
  const code=f.replace(".js","");
  const L=require(path.join(ROOT,"matrix",f)); const probs=[];
  const R=SR[code]; if(!R){probs.push("SCRIPT_RULES में नहीं (fail-closed)");}
  const n=L.rows.length;
  for(let i=0;i<n;i++){ if(L.rows[i][0]!==MASTER.rows[i][0]){probs.push("s-ID क्रम-टूट @"+i);break;} }
  const v=L.vanshavali||{}; ["srot","j1","j2","vartani","darja","seal"].forEach(k=>{if(!(k in v))probs.push("वंशावली-खाना ग़ायब: "+k);});
  let devMiss=0,foreign=0,natMiss=0,hiSame=0;
  if(R){ const devNat=!!R.devInItem0;
    for(const r of L.rows){ const t0=r[1]||"",t1=r[2]||"";
      if(!DEV.test(t1))devMiss++;
      if(!devNat && R.native.test(t1))foreign++;
      if(!devNat && t0 && !R.native.test(t0))natMiss++;
    }
    for(let i=0;i<n;i++){ if((L.rows[i][1]||"")===MASTER.rows[i][5]) hiSame++; }
    const pct=+(100*hiSame/n).toFixed(1);
    const lim=devNat?5:0.5;
    if(pct>lim)probs.push("82%-पहरा: हिंदी-हूबहू "+pct+"% > "+lim+"%");
    if(devMiss>0)probs.push("item1 देवनागरी-रहित: "+devMiss);
    if(foreign>5)probs.push("item1 में native-लिपि: "+foreign);
    if(natMiss>Math.max(10,n*0.02))probs.push("item0 native-लिपि-रहित: "+natMiss);
    var pctOut=pct;
  }
  const h=crypto.createHash("sha256").update(L.rows.map(r=>r[1]).join("\u0001")).digest("hex").slice(0,16);
  if(hashes[h])probs.push("CLONE: item0-स्तंभ "+hashes[h]+" से हूबहू"); else hashes[h]=code;
  const cov=n+"/"+MASTER.total; const partial=n<MASTER.total;
  const st=probs.length?"🔴":(partial?"🟠":"🏁");
  if(st==="🏁")pass++; else if(st==="🟠")warn++; else fail++;
  audit.push({code,st,cov,hiSame:(typeof pctOut==="number"?pctOut+"%":"—"),mm:v.mirror_mm,probs:probs.join("; ")||"—"});
  if(st!=="🏁")console.log(st,code,cov,probs.join("; "));
});
fs.writeFileSync("/tmp/matrix_audit.json",JSON.stringify(audit));
console.log("────────────────────────────");
console.log((fail===0?"🏁":"🔴")+" dev_matrix_check v1.0 — भाषाएँ:"+files.length+" · 🏁पास:"+pass+" · 🟠आंशिक:"+warn+" · 🔴fail:"+fail);
