/* dev_twv_hero_check.js v1.3 — twv-hero v5.0 की पूर्ण-ऑडिट (नक़ली browser)
   v1.3 (04-Aug): + सच्चाई-जाँच (grounding) — छपा हर असली-कदम/लक्षण/अंक
   पाठ के मैटर/शीर्षकों में हूबहू हो, वरना FAIL; + legend (चित्र-भाषा) व
   "अध्याय में जगह" पट्टी की जाँच (dots = jumplist-गिनती)।
   v1.2-आधार: content-सहित नक़ली-DOM; hooबहू-एक चित्र = संदिग्ध content-दोहराव। */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const DIR = path.join(__dirname, "..", "courses", "hi", "two-wheeler");
const SRC = fs.readFileSync(path.join(__dirname, "..", "assets", "twv-hero.js"), "utf8");
const files = fs.readdirSync(DIR).filter(f => f.startsWith("twv-") && f.endsWith(".html")).sort();
const ALLOWED = ["#0b1f3a","#1565c0","#f9a825","#2e7d32","#f5f7fa","#ffffff"];

function stripTags(x){ return x.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&[a-z]+;/g," "); }
function buildHero(f){
  const html = fs.readFileSync(path.join(DIR, f), "utf8");
  const title = ((html.match(/<h1>([\s\S]*?)<\/h1>/)||[])[1]||"").replace(/<[^>]+>/g,"").trim();
  const secs = [], heads = [];
  html.replace(/<section class="lsn-sec">([\s\S]*?)<\/section>/g, (a,b)=>{
    const h2 = (b.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)||[])[1];
    const hTxt = h2 ? stripTags(h2).replace(/\s+/g," ").trim() : null;
    if (hTxt) heads.push(hTxt);
    secs.push({ textContent: stripTags(b), querySelector: q => (q==="h2" && hTxt) ? { textContent: hTxt } : null });
    return a;
  });
  const jl = [];
  const jlHtml = (html.match(/<div class="lsn-jumplist">([\s\S]*?)<\/div>/)||[])[1]||"";
  jlHtml.replace(/href="([^"]+)"/g,(a,h)=>{ jl.push({ getAttribute: n => n==="href" ? h : null }); return a; });
  let hero = null;
  const h1 = { textContent: title, nextSibling: null, parentNode: { insertBefore: n => { hero = n.innerHTML; } } };
  const headEl = { querySelector: q => q === "h1" ? h1 : null };
  const doc = {
    querySelector: q => q === ".lsn-head" ? headEl : null,
    querySelectorAll: q => q === ".lsn-sec" ? secs : (q === ".lsn-jumplist a" ? jl : []),
    getElementById: () => null,
    createElement: t => ({ tag: t, id: "", innerHTML: "", textContent: "", setAttribute(){} }),
    head: { appendChild(){} }
  };
  vm.runInNewContext(SRC, { location: { pathname: "/courses/hi/two-wheeler/" + f }, document: doc, console });
  const ctext = secs.map(x=>x.textContent).join(" ").toLowerCase().replace(/\s+/g," ");
  return { title, hero, ctext, heads: heads.join(" | "), jlCount: jl.length + 1 };
}
function texts(svg){ const out=[]; svg.replace(/<text[^>]*>([^<]*)<\/text>/g,(a,t)=>{out.push(t);return a;}); return out; }

let ok=0, fail=[], notSquare=[], badColor=new Set(), smallFont=[], sig={}, typeCnt={};
let gFail=[], stepReal=0, stepGen=0, symReal=0, symGen=0, numLessons=0, legendMiss=[], progMiss=[], progWrong=[];
for (const f of files) {
  let r;
  try { r = buildHero(f); } catch(e){ fail.push(f+" (crash: "+e.message+")"); continue; }
  if (!r.hero || r.hero.indexOf("<svg") !== 0) { fail.push(f+" (चित्र नहीं बना)"); continue; }
  ok++;
  const b = r.hero;
  if (b.indexOf('viewBox="0 0 800 800"') < 0) notSquare.push(f);
  for (const c of b.match(/#[0-9A-Fa-f]{6}/g)||[]) if (!ALLOWED.includes(c.toLowerCase())) badColor.add(c);
  for (const m of b.match(/font-size="([0-9.]+)"/g)||[]) { const v=parseFloat(m.slice(11)); if (v<16) smallFont.push(f+":"+v); }
  const body = b.replace(/<title>[\s\S]*?<\/title>/,"").replace(/aria-label="[^"]*"/,"");
  (sig[body]=sig[body]||[]).push(f);
  const typ=/यही तीन पड़ाव|कोई कदम मत छोड़ो/.test(body)?"step":/बनाम<\/text>/.test(body)?"vs":/ऐसा कभी नहीं/.test(body)?"dont":/जड़ की ओर/.test(body)?"sym":"anat";
  typeCnt[typ]=(typeCnt[typ]||0)+1;
  /* legend + progress */
  if (b.indexOf('id="lgnd"') < 0) legendMiss.push(f);
  if (b.indexOf('id="prog"') < 0) progMiss.push(f);
  else {
    const pg=(b.match(/<g id="prog">([\s\S]*?)<\/g>/)||["",""])[1];
    const dots=(pg.match(/<circle/g)||[]).length - 1;  /* current का भीतरी बिंदु घटाओ */
    if (dots !== Math.min(r.jlCount, Math.floor(568/Math.max(8,Math.min(20,Math.floor(568/r.jlCount))))+0) && dots !== r.jlCount) progWrong.push(f+" (dots="+dots+" बनाम "+r.jlCount+")");
  }
  const T = texts(body), ct = r.ctext, hd = r.heads.toLowerCase();
  /* सच्चाई-जाँच: असली कदम */
  if (typ==="step") {
    if (/यही तीन पड़ाव/.test(body)) {
      stepReal++;
      for (const t of T) {
        const m = t.match(/^[123]\. (.+)$/);
        if (m && !/^(तैयारी|जाँच)/.test(m[1]) && !/धीरे, क्रम से$/.test(m[1])) {
          if (hd.indexOf(m[1].toLowerCase()) === -1) gFail.push(f+" कदम〈"+m[1]+"〉शीर्षकों में नहीं");
        }
      }
    } else stepGen++;
  }
  /* सच्चाई-जाँच: असली लक्षण */
  if (typ==="sym") {
    if (/लक्षण \(इसी पाठ से\)/.test(body)) {
      symReal++;
      for (const t of T) if (t.indexOf("• ")===0 && ct.indexOf(t.slice(2).toLowerCase())===-1) gFail.push(f+" लक्षण〈"+t.slice(2)+"〉मैटर में नहीं");
    } else symGen++;
  }
  /* सच्चाई-जाँच: नाप-अंक */
  if (/पाठ के नाप-अंक/.test(body)) {
    numLessons++;
    const bi = T.indexOf("पाठ के नाप-अंक");
    for (let k=Math.max(0,bi-2); k<bi; k++) {
      const nv=T[k]; if (!/[0-9]/.test(nv)) continue;
      if (ct.replace(/\s+/g," ").indexOf(nv.toLowerCase()) === -1) gFail.push(f+" अंक〈"+nv+"〉मैटर में नहीं");
    }
  }
}
const groups = Object.values(sig).sort((a,b)=>b.length-a.length);
const dups = groups.filter(g=>g.length>1);
console.log("कुल पाठ:", files.length, "| चित्र बने:", ok, "| fail:", fail.length);
fail.slice(0,6).forEach(x=>console.log("  ❌",x));
console.log("वर्गाकार 800×800:", files.length-notSquare.length, "/", files.length);
console.log("ग़ैर-ACS रंग:", badColor.size?[...badColor]:"शून्य ✅", "| font<16px:", smallFont.length?smallFont.slice(0,4):"शून्य ✅");
console.log("प्रकार-बँटवारा:", JSON.stringify(typeCnt));
console.log("चित्र-भाषा legend:", files.length-legendMiss.length, "/", files.length, "| जगह-पट्टी:", files.length-progMiss.length, "/", files.length, progWrong.length?("| dot-बेमेल:"+progWrong.length):"");
console.log("असली-कदम पाठ:", stepReal, "| सामान्य-ढाँचा:", stepGen, "‖ असली-लक्षण:", symReal, "| सामान्य:", symGen, "‖ नाप-अंक वाले पाठ:", numLessons);
if (gFail.length) { console.log("⛔ सच्चाई-जाँच fail =", gFail.length); gFail.slice(0,10).forEach(x=>console.log("   ", x)); }
else console.log("सच्चाई-जाँच: छपा हर कदम/लक्षण/अंक मैटर में हूबहू मौजूद ✅");
console.log("अलग-अलग पूर्ण चित्र-रूप:", groups.length, "/", files.length, "| सबसे बड़ा समूह:", groups[0]?groups[0].length:0);
if (dups.length) { console.log("⚠️ hooबहू-एक =", dups.length, "समूह → संदिग्ध content-दोहराव:"); dups.slice(0,10).forEach(g=>console.log("   ", g.join(" ↔ "))); }
else console.log("hooबहू-एक चित्र: शून्य ✅ (content-दोहराव का कोई संदेह नहीं)");
const pass = ok===files.length && !notSquare.length && !badColor.size && !smallFont.length && !dups.length && !gFail.length && !legendMiss.length;
console.log(pass ? "\n🏁 सब जाँचें पास" : "\n⛔ FAIL");
process.exit(pass?0:1);
