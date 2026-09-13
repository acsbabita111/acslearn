const fs=require('fs');
function ld(f,k){global.window={};eval(fs.readFileSync(f,'utf8'));return window[k];}
const P=/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const strip=s=>String(s).replace(/[.,!?;:()\u0964\u061F\u060C\u061B«»"'…—–-]/g,' ').replace(/\s+/g,' ').trim();
const dict={};
function learn(pairs,c){pairs.forEach(([a,b])=>{const ta=strip(a).split(' ').filter(Boolean),tb=strip(b).split(' ').filter(Boolean);if(ta.length!==tb.length||!ta.length)return;ta.forEach((w,i)=>{const cc=c;if(!P.test(w))return;const d=tb[i];if(!/[\u0900-\u097F]/.test(d))return;(dict[d]=dict[d]||{});dict[d][w]=(dict[d][w]||0)+(cc==='fa'?3:1);});});}
for(const c of ['fa','ur']){
  const D2=ld(`assets/kkb2_${c}_data.js`,'KKB2_DATA'),D1=ld(`assets/kkb_${c}_data.js`,'KKB_DATA');
  const pairs=[];[D1,D2].forEach(D=>D.weeks.forEach(w=>{w.days.forEach(d=>{d.items.forEach(it=>pairs.push([it[0],it[1]]));(d.tw||[]).forEach(t=>pairs.push([t[0],t[1]]));});if(w.test&&w.test.lines)w.test.lines.forEach(l=>pairs.push([l[0],l[1]]));}));
  learn(pairs,c);
}
console.log('dict entries:',Object.keys(dict).length);
fs.writeFileSync('/tmp/dev2ar.json',JSON.stringify(dict));
for(const c of ['prs','bal','ps','si']){
  const D2=ld(`assets/kkb2_${c}_data.js`,'KKB2_DATA'),D1=ld(`assets/kkb_${c}_data.js`,'KKB_DATA');
  const toks={};let tot=0;
  [D1,D2].forEach(D=>D.weeks.forEach(w=>{w.days.forEach(d=>{d.items.forEach(it=>strip(it[1]).split(' ').forEach(t=>{if(t){toks[t]=(toks[t]||0)+1;tot++;}}));(d.tw||[]).forEach(t=>strip(t[1]).split(' ').forEach(x=>{if(x){toks[x]=(toks[x]||0)+1;tot++;}}));});}));
  const uniq=Object.keys(toks);const cov=uniq.filter(t=>dict[t]).reduce((a,t)=>a+toks[t],0);
  const uncov=uniq.filter(t=>!dict[t]).sort((a,b)=>toks[b]-toks[a]);
  console.log(c,'| tokens',tot,'| unique',uniq.length,'| dict-covered',(100*cov/tot).toFixed(1)+'%','| uncovered unique',uncov.length,'| top uncovered:',uncov.slice(0,25).map(t=>t+'('+toks[t]+')').join(' '));
}
