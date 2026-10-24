/* dev_chitra_check.js v1.0 — चित्र-पुस्तक robot: बने पन्नों की जाँच (generator के बाद चलाएँ)
   जाँचें: दोनों पन्ने मौजूद · हर <img> की फ़ाइल असली · reader की हर स्लाइड का चित्र असली · © ™ + FFGPMTrust पंक्ति · कोई 🔊-कार्ड बिना data-a नहीं · उच्चारण में Latin नहीं */
const fs=require("fs"),path=require("path");const ROOT=path.join(__dirname,"..");
let bad=0;const fail=m=>{bad++;console.log("⛔ "+m);};
for(const code of ["en"]){
  const D=require(path.join(__dirname,"data","chitra","chitra_"+code+".js"));const dir=path.join(ROOT,"courses","hi","bhasha",D.lang.slug,"chitra-pustak");
  for(const f of ["index.html","reader.html"])if(!fs.existsSync(path.join(dir,f)))fail(code+": "+f+" नहीं");
  const ix=fs.readFileSync(path.join(dir,"index.html"),"utf8"),rd=fs.readFileSync(path.join(dir,"reader.html"),"utf8");
  const imgs=[...ix.matchAll(/src="\/assets\/chitra\/([^"]+)"/g)].map(m=>m[1]).concat([...rd.matchAll(/\/assets\/chitra\/([A-Za-z0-9_.-]+\.(?:webp|svg))/g)].map(m=>m[1]));
  for(const f of new Set(imgs))if(!fs.existsSync(path.join(ROOT,"assets","chitra",f)))fail(code+": चित्र नहीं "+f);
  const cards=(ix.match(/class="cp-card"/g)||[]).length;if(cards!==174)fail(code+": कार्ड "+cards+" (174 चाहिए)");
  if((ix.match(/data-a="[^"]+"/g)||[]).length!==cards)fail(code+": कुछ कार्ड बिना आवाज़-पाठ");
  for(const [n,h] of [["index",ix],["reader",rd]]){if(!h.includes("Applied Computer School™")||!h.includes("acslearn™"))fail(code+" "+n+": ™ पंक्ति नहीं");if(!h.includes("FFGPMTrust के सौजन्य से ऑनलाइन शिक्षा निःशुल्क और प्रमाणपत्र सशुल्क"))fail(code+" "+n+": FFGPMTrust पंक्ति नहीं");}
  const pr=[...ix.matchAll(/class="cp-p">([^<]*)</g)].map(m=>m[1]);if(pr.some(p=>/[A-Za-z]/.test(p)))fail(code+": उच्चारण में Latin");
  console.log(code+": कार्ड "+cards+" · चित्र-फ़ाइलें "+new Set(imgs).size+" · उच्चारण "+pr.length);
}
console.log(bad?"⛔ FAIL "+bad:"🏁 चित्र-पुस्तक robot पास");process.exit(bad?1:0);
