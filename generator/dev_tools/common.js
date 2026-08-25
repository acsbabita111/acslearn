"use strict";
const fs=require("fs");
const DATA="/home/claude/work/acs/generator/data/welding_lessons_data.js";
const LIST="/mnt/user-data/uploads/ACS-Welding-Course-Lesson-List-v3_1.md";
function loadData(){ delete require.cache[require.resolve(DATA)]; return require(DATA); }
function saveData(M){
  const out='"use strict";\n/* ACS वेल्डिंग कोर्स — पाठ-डेटा (परत-3) · generator से पेज बनते हैं */\nconst WELDING_COURSE = '+JSON.stringify(M.WELDING_COURSE,null,1)+';\nconst WELDING_LESSONS = [\n'+M.WELDING_LESSONS.map(l=>JSON.stringify(l)).join(",\n")+'\n];\nmodule.exports = { WELDING_COURSE, WELDING_LESSONS };\n';
  fs.writeFileSync(DATA,out);
}
function vis(html){return html.replace(/<svg[\s\S]*?<\/svg>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();}
function wc(html){const t=vis(html);return t?t.split(" ").length:0;}
function coreWords(l){return wc(l.sections.map(s=>s.t+" "+s.h).join(" "));}
function officialList(){
  const txt=fs.readFileSync(LIST,"utf8"); const m={};
  for(const line of txt.split("\n")){ const r=line.match(/^(\d+)\.\s+(.+?)\s+·\s+\(([KDPAR+]+)\)\s*$/); if(r) m[+r[1]]={title:r[2].trim(),tag:r[3]}; }
  return m;
}
const MAP={"अ":"a","आ":"a","इ":"i","ई":"i","उ":"u","ऊ":"u","ए":"e","ऐ":"ai","ओ":"o","औ":"au","ऋ":"ri",
"क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"n","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"n","ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh","ष":"sh","स":"s","ह":"h","ळ":"l",
"ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","े":"e","ै":"ai","ो":"o","ौ":"au","ृ":"ri","ं":"n","ँ":"n","ः":"h","़":"","्":""};
function translit(s){
  let out="";const ch=[...s];
  for(let i=0;i<ch.length;i++){const c=ch[i];
    if(MAP[c]!==undefined){ out+=MAP[c];
      const cons=/[क-ह]/.test(c);
      if(cons){ const nx=ch[i+1]; if(nx===undefined||!(MAP[nx]!==undefined && !/[क-ह]/.test(nx)) ) out+="a"; }
    } else if(/[a-zA-Z0-9]/.test(c)) out+=c.toLowerCase();
    else out+="-";
  }
  return out.replace(/-+/g,"-").replace(/^-|-$/g,"");
}
function slugFor(title,num){
  let s=translit(title); const max=60-("wld-"+String(num).padStart(3,"0")+"-").length;
  if(s.length>max){ s=s.slice(0,max); s=s.replace(/-[^-]*$/,""); }
  return s.replace(/-+$/,"");
}
module.exports={DATA,loadData,saveData,vis,wc,coreWords,officialList,translit,slugFor};
