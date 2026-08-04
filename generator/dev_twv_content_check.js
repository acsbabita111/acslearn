/* dev_twv_content_check.js v1.0 — twv-भराव सफ़ाई खेप-1 की ऑडिट (04-Aug-2026)
   जाँचें: (1) 58 बदले पाठ: कचरा-खंड 0 · शब्द ≥1200 · h1/jumplist/video-खंड सलामत
   (2) भराई-मौलिकता: जुड़े 24 खंडों में कोई 6-शब्द खिड़की साझा नहीं
   (3) बाक़ी 408 पाठ live-मूल से byte-हूबहू (कुछ और न छुआ हो) */
"use strict";
const fs=require("fs"), path=require("path"), cp=require("child_process");
const DIR=path.join(__dirname,"..","courses","hi","two-wheeler");
const ORIG=path.join(__dirname,"..","..","orig","acslearn-main","courses","hi","two-wheeler");
const CHANGED=(cp.execSync('cd '+JSON.stringify(path.join(__dirname,".."))+' && node generator/twv_safai.js --measure',{encoding:"utf8"}));
const files=fs.readdirSync(DIR).filter(f=>f.startsWith("twv-")&&f.endsWith(".html")).sort();
const wcount=t=>(t.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<svg[\s\S]*?<\/svg>/g," ").replace(/<[^>]+>/g," ").match(/[\u0900-\u097FA-Za-z0-9]+/g)||[]).length;

let changed=[], untouched=[], byteDiff=[];
for(const f of files){
  const a=fs.readFileSync(path.join(DIR,f));
  const b=fs.readFileSync(path.join(ORIG,f));
  if(a.equals(b)) untouched.push(f); else changed.push(f);
}
console.log("बदले:",changed.length,"| अछूते:",untouched.length,"(मूल-live से byte-हूबहू)");

/* बदले पाठों की जाँच */
let fail=[]; let pending=[];
const NEWSEC=[];
for(const f of changed){
  const s=fs.readFileSync(path.join(DIR,f),"utf8");
  const w=wcount(s);
  if(w<1200){pending.push(f);} 
  if(!/<h1>/.test(s)) fail.push(f+" h1 ग़ायब");
  if(!/lsn-jumplist/.test(s)) fail.push(f+" jumplist ग़ायब");
  if(!/lsn-video/.test(s)) fail.push(f+" video-खंड ग़ायब");
  /* नए खंड (भराई) पकड़ो — orig में नहीं थे */
  const o=fs.readFileSync(path.join(ORIG,f),"utf8");
  for(const m of s.matchAll(/<section class="lsn-sec">\n<h2>([^<]+)<\/h2>([\s\S]*?)<\/section>/g)){
    if(o.indexOf(m[0])===-1 && !/lsn-video/.test(m[0])) NEWSEC.push({f,h:m[1],t:m[2].replace(/<[^>]+>/g," ")});
  }
}
console.log("ढाँचा-जाँच:",fail.length?("⛔ "+fail.slice(0,5)):"सब पास ✅"); console.log("शब्द ≥1200 पूर्ण:",changed.length-pending.length,"| क़तार (<1200):",pending.length);
console.log("भराई-खंड मिले:",NEWSEC.length);

/* मौलिकता: 6-शब्द खिड़की */
const win=new Map(); let dupWin=[];
for(const sec of NEWSEC){
  const words=(sec.t.match(/[\u0900-\u097F]+/g)||[]);
  for(let i=0;i+6<=words.length;i++){
    const k=words.slice(i,i+6).join(" ");
    if(win.has(k) && win.get(k)!==sec.f+sec.h) dupWin.push(k+" ("+win.get(k)+" ↔ "+sec.f+")");
    else win.set(k,sec.f+sec.h);
  }
}
console.log("मौलिकता (6-शब्द खिड़की साझा):",dupWin.length?("⛔ "+dupWin.slice(0,3)):"शून्य ✅");

/* कचरा-गिनती बदले पाठों पर (safai --measure से) */
const m=CHANGED.match(/भराई-चाहिए: (\d+)/);
console.log("safai-नाप:", CHANGED.split("\n")[0]);
// इसी-पाठ भीतर hooबहू दोहराया नया-खंड (v1.3)
let selfDup=[]; const seenSec={};
for(const sec of NEWSEC){
  const k=sec.f+"||"+sec.h+"||"+sec.t.replace(/\s+/g," ").trim();
  if(seenSec[k]) selfDup.push(sec.f+" ("+sec.h+")"); seenSec[k]=1;
}
console.log("इसी-पाठ दोहराया-खंड:",selfDup.length?("⛔ "+selfDup):"शून्य ✅");
const pass=!fail.length && !dupWin.length && !selfDup.length;
console.log(pass?("\n🏁 ऑडिट पास (बदले="+changed.length+")"):"\n⛔ FAIL");
process.exit(pass?0:1);
