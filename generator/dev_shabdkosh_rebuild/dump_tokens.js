/* हर भाषा के course-tokens + tw-keys + script → JSON */
const fs=require("fs"),path=require("path");
const ROOT=process.cwd();
const src=fs.readFileSync(path.join(ROOT,"generator/build_specials.js"),"utf8");
const m=src.match(/const KKB2_LANGS = \[([\s\S]*?)\n\];/);
const re=/\{ code: "([a-z]+)", slug: "([a-z\-]+)"/g; let x; const langs=[];
while((x=re.exec(m[1]))) langs.push({code:x[1],slug:x[2]});
const clean=s=>String(s).replace(/[.,?!"'।;:()]/g,"").trim();
const out={};
for(const L of langs){
  try{
    const w={};
    for(const f of [L.code==="en"?"kkb_data.js":"kkb_"+L.code+"_data.js", L.code==="en"?"kkb2_data.js":"kkb2_"+L.code+"_data.js"]){
      new Function("window","self","module",fs.readFileSync(path.join(ROOT,"assets",f),"utf8")+";")(w,w,{});
    }
    const script=(w.KKB2_DATA.lang&&w.KKB2_DATA.lang.script)||"latin";
    const days=[]; w.KKB_DATA.weeks.forEach(wk=>wk.days.forEach(d=>days.push(d))); w.KKB2_DATA.weeks.forEach(wk=>wk.days.forEach(d=>days.push(d)));
    const twKeys=new Set(); days.forEach(d=>(d.tw||[]).forEach(t=>twKeys.add(String(t[0]).trim().toLowerCase())));
    const dev={}; days.forEach(d=>d.items.forEach(it=>{const en=clean(it[0]).split(/\s+/).filter(Boolean),dv=clean(it[1]).split(/\s+/).filter(Boolean); if(en.length===dv.length) en.forEach((e,i)=>{const k=e.toLowerCase(); if(!(k in dev)) dev[k]=dv[i];});}));
    const toks=[]; const seen=new Set();
    days.forEach(d=>d.items.forEach(it=>clean(it[0]).split(/\s+/).filter(Boolean).forEach(wd=>{
      const k=wd.toLowerCase(); if(seen.has(k)||/^\d+$/.test(k))return; seen.add(k); toks.push(k);
    })));
    out[L.slug]={code:L.code,script,tokens:toks,tw:[...twKeys],dev};
  }catch(e){ out[L.slug]={code:L.code,error:String(e.message).slice(0,60)}; }
}
fs.writeFileSync("/tmp/course_tokens.json",JSON.stringify(out));
const s=Object.values(out);
console.log("भाषाएँ:",s.length,"| त्रुटि:",s.filter(v=>v.error).length);
console.log("NO_SPACE लिपियाँ:",s.filter(v=>({japanese:1,chinese:1,han:1,thai:1,lao:1,khmer:1,myanmar:1,tibetan:1})[v.script]).map(v=>v.code).join(" "));
