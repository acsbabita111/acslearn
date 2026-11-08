// dev_dmt_check.js v2.4.1 - DMT fail-closed gate
// v2.4.1 patch (ChatGPT v2.4-audit): FRONTMATTER me bhi raw-HTML nishedh — seo_title_hi/
//   seo_description_hi/h1_hi samet kisi bhi fm-khane me <tag> ya <!-- = FAIL.
// v2.4 naya dwar (ChatGPT v2.3-audit se): SVG-BAHAR raw HTML nishedh — paath-body me <script>,
//   <img onerror> jaisa koi bhi HTML-tag ya <!-- comment = FAIL (paath me ekmatra manya HTML = SVG).
//   renderer-star sanitization = generator-daur ka anivarya kadam (PENDING dastavez me darj).
// v2.3 naye dwar (ChatGPT v2.2-audit ke 6 naye dosh se):
//   - MANAK XML PARSER (saxes@6.0.0, spec-conformant) ab prathmik well-formedness dwar —
//     attr ke bheetar nanga-&, &nonsense;, &#0;, comment me --, control-char sab yahi pakadta hai.
//     library na mile to robot FAIL (fail-closed) — ./node_modules/saxes anivarya.
//   - duplicate lesson_id/slug: ab FRONTMATTER se padhkar uniqueness (file-naam se nahi);
//     khali lesson_id/slug bhi bank-FAIL.
//   - apna strict-scan ab POORAK part hai (DTD/PI nishedh + SVG suraksha-allowlist policy) —
//     XML-shuddhta ka faisla manak parser ka.
// v2.2 naye dwar (ChatGPT punah-audit B01-B04 se):
//   B01 strict XML parse: bare-attr (bina =) FAIL, amanya char-ref (&#0; adi) FAIL, DTD/PI/CDATA nishedh
//   B02 SVG suraksha: element+attr allowlist, on* event-attr FAIL, javascript:/vbscript:/data: FAIL,
//       href sirf #fragment, style me expression()/url()/javascript: FAIL
//   B03 strict 4-vikalp: koi bhi paanchva vikalp-label (jaise NGA) FAIL — sirf ka kha ga gha theek ek-ek
//   B04 khali bank FAIL: 0 file = exit 1; --expected-lessons=N --expected-mcq=N milan; duplicate lesson-id FAIL;
//       file padhne me vifal = FAIL
// v2.5: +karan-label consistency dwar (khep-23)\n// v2.1 ke sab dwar yathavat: strict parse, uttar-vitran, lambai-khidki, sequence-dwar, publish-rok
// chalana: node dev_dmt_check.js <file>
// bank:    node dev_dmt_check.js --bank [--expected-lessons=70] [--expected-mcq=350] <f1> <f2> ...
// note: arthgat uttar-vyakhya (semantic) ki jaanch robot nahi kar sakta — manav-audit anivarya (H01)
const fs=require('fs');

// === v2.3: manak XML parser (saxes) — na mile to fail-closed ===
let SaxesParser=null;
try{SaxesParser=require('saxes').SaxesParser;}catch(e){
  console.log('FAIL manak XML parser (saxes) nahi mila — robot ke paas ./node_modules/saxes@6.0.0 anivarya hai (fail-closed)');
  process.exit(1);
}
function saxesCheck(s){
  const errs=[];
  const p=new SaxesParser({xmlns:false});
  p.on('error',e=>{if(errs.length<4)errs.push('manak-parser: '+String(e.message).split('\n')[0].slice(0,80));});
  try{p.write(s).close();}catch(e){errs.push('manak-parser throw: '+String(e.message).slice(0,80));}
  return errs;
}

// === B03: vikalp-label varnmala — koi bhi devanagari vyanjan kostak me label-jaisa dikhe to pakdo ===
const VALID_LETTERS=['\u0915','\u0916','\u0917','\u0918']; // ka kha ga gha
// devanagari vyanjan-range jo label ban sakta hai: 0915-0939 + 0958-095F
const LABEL_RE=/\(([\u0915-\u0939\u0958-\u095F])\)/g;

function parseMCQ(body,fails){
  fails=fails||[];
  const out=[];
  const re=/\*\*\u092A\u094D\u0930-(\d+)\.\*\*([\s\S]*?)\*\*\u0909\u0924\u094D\u0924\u0930:\s*\(([^)]+)\)[\s\S]*?(?=\*\*\u092A\u094D\u0930-\d+\.\*\*|$)/g;
  let m;
  while((m=re.exec(body))){
    const pn=m[1], block=m[2], ans=m[3].trim();
    const full=m[0];
    const ai=full.indexOf('\u0909\u0924\u094D\u0924\u0930:');
    const reason=ai>=0?full.slice(ai):'';
    // B03: block me SAB vikalp-jaise label pakdo (sirf ka-gha nahi) — paanchva (NGA adi) = FAIL
    const labels=[]; let lm; LABEL_RE.lastIndex=0;
    while((lm=LABEL_RE.exec(block))){labels.push({l:lm[1],i:lm.index});}
    const invalid=labels.filter(x=>VALID_LETTERS.indexOf(x.l)<0);
    if(invalid.length)fails.push('pr-'+pn+' amanya vikalp-label: ('+invalid.map(x=>x.l).join(')(')+') — sirf (\u0915)(\u0916)(\u0917)(\u0918) manya');
    if(labels.length!==4)fails.push('pr-'+pn+' vikalp-label '+labels.length+' mile (theek 4 chahiye)');
    // opts: har VALID label se agle label tak ka text
    const opts={}; let dup=false;
    for(let k=0;k<labels.length;k++){
      const st=labels[k].i, en=(k+1<labels.length)?labels[k+1].i:block.length;
      const txt=block.slice(st,en).replace(/^\([\s\S]\)\s*/,'').trim();
      const L=labels[k].l;
      if(VALID_LETTERS.indexOf(L)<0)continue;
      if(L in opts){dup=true;}
      opts[L]=txt;
    }
    if(dup)fails.push('pr-'+pn+' duplicate vikalp-label');
    const have=Object.keys(opts);
    const missing=VALID_LETTERS.filter(l=>!(l in opts));
    if(have.length!==4||missing.length)fails.push('pr-'+pn+' vikalp 4 nahi ('+have.length+' mile'+(missing.length?', gayab: ('+missing.join(')(')+')':'')+')');
    for(const k of have) if(!opts[k])fails.push('pr-'+pn+' vikalp ('+k+') khali');
    if(VALID_LETTERS.indexOf(ans)<0)fails.push('pr-'+pn+' uttar-letter amanya: ('+ans+')');
    else if(!(ans in opts))fails.push('pr-'+pn+' uttar ('+ans+') vikalpon me nahi');
    const vals=have.map(k=>opts[k]);
    if(new Set(vals).size!==vals.length)fails.push('pr-'+pn+' do vikalp hoobahoo ek');
    const rl=reason.match(/\(([\u0915\u0916\u0917\u0918](?:\/[\u0915\u0916\u0917\u0918]){0,3})\)/g)||[];
    rl.forEach(g=>{g.replace(/[()]/g,'').split('/').forEach(l=>{if(!(l in opts))fails.push('pr-'+pn+' karan-letter ('+l+') vikalpon me nahi');});});
    out.push({ans:VALID_LETTERS.indexOf(ans)>=0?ans:'\u0915',opts,seq:ans});
  }
  if(out.length!==5)fails.push('strict-parse: '+out.length+'/5 prashn hi parse hue');
  return out;
}

// === B01: strict XML char-ref jaanch (XML 1.0 Char range) ===
function validCharRef(numStr,hex){
  const n=parseInt(numStr,hex?16:10);
  if(isNaN(n))return false;
  return n===0x9||n===0xA||n===0xD||(n>=0x20&&n<=0xD7FF)||(n>=0xE000&&n<=0xFFFD)||(n>=0x10000&&n<=0x10FFFF);
}

// === B01: strict attr-parse — har attr = name + '=' + quoted value, aur kuch nahi (bare-attr FAIL) ===
function parseAttrsStrict(chunk,name,errs){
  const pairs=[];
  let r=chunk.replace(/\/\s*$/,'');
  let k=0;
  while(k<r.length){
    if(/\s/.test(r[k])){k++;continue;}
    const nm=r.slice(k).match(/^[A-Za-z_][\w.:-]*/);
    if(!nm){errs.push('<'+name+'> amanya attr-paath: "'+r.slice(k,k+12)+'"');return pairs;}
    const an=nm[0]; k+=an.length;
    let kk=k; while(kk<r.length&&/\s/.test(r[kk]))kk++;
    if(r[kk]!=='='){errs.push('<'+name+'> bare-attr (bina =): '+an);return pairs;}
    kk++; while(kk<r.length&&/\s/.test(r[kk]))kk++;
    const q=r[kk];
    if(q!=='"'&&q!=="'"){errs.push('<'+name+'> attr bina-quote: '+an);return pairs;}
    const e=r.indexOf(q,kk+1);
    if(e<0){errs.push('<'+name+'> attr-quote band nahi: '+an);return pairs;}
    pairs.push([an,r.slice(kk+1,e)]);
    k=e+1;
  }
  const anames=pairs.map(p=>p[0]);
  const dupA=anames.filter((a,ix)=>anames.indexOf(a)!==ix);
  if(dupA.length)errs.push('<'+name+'> duplicate attr: '+dupA[0]);
  return pairs;
}

// === B02: SVG allowlist (70 moul paath ke prayukt set se; naya element/attr = pehle yahan jodo, Founder-manzoori se) ===
const ALLOWED_ELEMENTS={svg:1,g:1,rect:1,circle:1,ellipse:1,line:1,polyline:1,polygon:1,path:1,text:1,tspan:1,title:1,desc:1};
const ALLOWED_ATTRS={'aria-label':1,cx:1,cy:1,d:1,fill:1,'font-size':1,'font-style':1,'font-weight':1,'font-family':1,height:1,opacity:1,points:1,r:1,role:1,rx:1,ry:1,stroke:1,'stroke-dasharray':1,'stroke-width':1,'stroke-linecap':1,'stroke-linejoin':1,template:1,'text-anchor':1,'text-decoration':1,theme:1,transform:1,viewBox:1,width:1,x:1,x1:1,x2:1,xmlns:1,y:1,y1:1,y2:1,'letter-spacing':1};

function checkSvgSecurity(name,pairs,errs){
  if(!(name in ALLOWED_ELEMENTS))errs.push('SVG-allowlist: <'+name+'> anadhikrit element');
  for(const p of pairs){
    const an=p[0], av=p[1], anl=an.toLowerCase(), avl=av.toLowerCase();
    if(/^on/i.test(an)){errs.push('SVG-suraksha: event-attr nishedh: '+an);continue;}
    if(/^(xlink:)?href$/i.test(anl)){
      if(!/^#/.test(av.trim()))errs.push('SVG-suraksha: href sirf #fragment manya: '+av.slice(0,30));
    } else if(!(an in ALLOWED_ATTRS)){
      errs.push('SVG-allowlist: attr anadhikrit: '+an);
    }
    if(/javascript:|vbscript:/i.test(avl))errs.push('SVG-suraksha: '+an+' me script-URL nishedh');
    if(anl==='style'&&/expression\s*\(|url\s*\(|javascript:/i.test(avl))errs.push('SVG-suraksha: style me expression/url/script nishedh');
    if(/^data:/i.test(av.trim()))errs.push('SVG-suraksha: data:-URL nishedh: '+an);
  }
}

// === B01+B02: XML well-formed (v2.3: manak parser prathmik) + suraksha-gate (poorak policy) ===
function xmlWellFormed(s){
  // parat-1 (prathmik): manak spec-conformant parser — XML-shuddhta ka asli faisla yahi
  const errs=saxesCheck(s);
  // parat-2 (poorak): apna scan — DTD/PI nishedh + SVG allowlist/suraksha policy (XML-kaam nahi, neeti-kaam)
  let i=0, stack=[];
  while(i<s.length){
    const c=s[i];
    if(c==='<'){
      if(s.startsWith('<!--',i)){const e=s.indexOf('-->',i);if(e<0){errs.push('comment band nahi');break;}i=e+3;continue;}
      if(s.startsWith('<!',i)){errs.push('DTD/CDATA/<! nishedh @'+i);break;}
      if(s.startsWith('<?',i)){errs.push('processing-instruction <? nishedh @'+i);break;}
      const close=s[i+1]==='/';
      let j=i+(close?2:1);
      const nm=s.slice(j).match(/^[A-Za-z_][\w.:-]*/);
      if(!nm){errs.push('amanya tag @'+i);break;}
      const name=nm[0]; j+=name.length;
      let selfClose=false, inq=null, attrChunk='';
      for(;j<s.length;j++){
        const ch=s[j];
        if(inq){ if(ch===inq)inq=null; attrChunk+=ch; continue; }
        if(ch==='"'||ch==="'"){inq=ch;attrChunk+=ch;continue;}
        if(ch==='<'){errs.push('tag ke bheetar < @'+j);j=-1;break;}
        if(ch==='>'){ if(s[j-1]==='/')selfClose=true; break; }
        attrChunk+=ch;
      }
      if(j<0)break;
      if(j>=s.length){errs.push('tag band nahi: <'+name);break;}
      if(inq){errs.push('attr-quote band nahi: <'+name);break;}
      if(close){
        if(/[^\s]/.test(attrChunk)){errs.push('</'+name+'> me attr nishedh');}
        if(!stack.length||stack[stack.length-1]!==name){errs.push('</'+name+'> bina khula');break;}
        stack.pop();
      } else {
        const pairs=parseAttrsStrict(attrChunk,name,errs);
        checkSvgSecurity(name,pairs,errs);
        if(!selfClose)stack.push(name);
      }
      if(errs.length>8)break;
      i=j+1;
    } else if(c==='&'){
      const em=s.slice(i).match(/^&(amp|lt|gt|quot|apos);/);
      const dm=s.slice(i).match(/^&#(\d+);/);
      const xm=s.slice(i).match(/^&#x([0-9A-Fa-f]+);/);
      if(em){i+=em[0].length;continue;}
      if(dm){if(!validCharRef(dm[1],false))errs.push('amanya char-ref &#'+dm[1]+';');i+=dm[0].length;continue;}
      if(xm){if(!validCharRef(xm[1],true))errs.push('amanya char-ref &#x'+xm[1]+';');i+=xm[0].length;continue;}
      errs.push('nanga-& @'+i);i++;
    } else { i++; }
  }
  if(stack.length)errs.push('band nahi hue tag: '+stack.join(','));
  return errs;
}

function check(path){
  const t=fs.readFileSync(path,'utf8');
  const parts=t.split('---'); const body0=parts.slice(2).join('---');
  const body=body0.replace(/<svg[\s\S]*?<\/svg>/g,'');
  const fails=[];
  const w=body.split(/\s+/).filter(Boolean).length;
  if(w<1200||w>1300)fails.push('shabd '+w+' (1200-1300 chahiye)');
  if(!/<svg[^>]*viewBox/.test(t))fails.push('SVG/viewBox nahi');
  if(!/publish:\s*false/.test(t))fails.push('publish:false nahi');
  const q=(body.match(/\*\*\u092A\u094D\u0930-/g)||[]).length, a=(body.match(/\*\*\u0909\u0924\u094D\u0924\u0930:/g)||[]).length;
  if(q!==5||a!==5)fails.push('MCQ '+q+'/uttar '+a);
  if((body.match(/\u0915\u094D\u092F\u094B\u0902 \u0917\u093C\u0932\u0924/g)||[]).length<4)fails.push('distractor-karan adhure');
  // v2.5: karan-label consistency — "kyon galat" suchi ke akshar = {ka,kha,ga,gha} - sahi; sahi-akshar suchi me nishedh
  {
    const qre=/\*\*\u092A\u094D\u0930-(\d)\.\*\*[\s\S]*?\n\*\*\u0909\u0924\u094D\u0924\u0930: \(([\u0915\u0916\u0917\u0918])\)\u0964\*\*([\s\S]*?)(?=\n\*\*\u092A\u094D\u0930-|\n\*\*\u0905\u0917\u0932\u093E|\n##|$)/g;
    let m5;
    while((m5=qre.exec(body))!==null){
      const qn=m5[1],ans=m5[2],expl=m5[3];
      const t5=expl.match(/\u0915\u094D\u092F\u094B\u0902 \u0917\u093C\u0932\u0924\s*:([\s\S]*)/);
      if(!t5){fails.push('pr-'+qn+' "kyon galat" khand nahi');continue;}
      const got=new Set();
      for(const g5 of t5[1].match(/\(([\u0915\u0916\u0917\u0918\/\s]+)\)/g)||[]){
        for(const L of g5.match(/[\u0915\u0916\u0917\u0918]/g)||[]) got.add(L);
      }
      if(got.has(ans))fails.push('pr-'+qn+' sahi-akshar ('+ans+') galat-suchi me');
      const miss=['\u0915','\u0916','\u0917','\u0918'].filter(x=>x!==ans&&!got.has(x));
      if(miss.length)fails.push('pr-'+qn+' galat-suchi me anupasthit: '+miss.join(''));
    }
  }
  if(/\[/.test(body))fails.push('chaukor-koshthak mila');
  // v2.4: SVG-bahar raw HTML nishedh (ChatGPT v2.3-audit) — paath-body me ekmatra manya HTML = SVG
  const rawTag=body.match(/<\s*\/?\s*[A-Za-z][^>]{0,80}>?/);
  if(rawTag)fails.push('raw-HTML nishedh (SVG-bahar): "'+rawTag[0].slice(0,40)+'"');
  if(/<!--/.test(body))fails.push('raw-HTML comment nishedh (SVG-bahar)');
  if(!/\u0915\u093E\u0932\u094D\u092A\u0928\u093F\u0915/.test(body))fails.push('kalpanik-data pankti nahi');
  const fm=parts[1]||'';
  function fmval(k){const m=fm.match(new RegExp('^'+k+':\\s*(.*)$','m'));if(!m)return '';return m[1].trim().replace(/^"|"$/g,'').trim();}
  for(const k of ['slug','seo_title_hi','seo_description_hi','h1_hi','primary_search_intent_hi','image_alt_hi'])
    if(!fmval(k))fails.push('SEO-khana khali: '+k);
  const lessonId=fmval('lesson_id'), slugV=fmval('slug');
  if(!lessonId)fails.push('lesson_id khali/gayab (fail-closed)');
  const st=fmval('seo_title_hi'); const sd=fmval('seo_description_hi');
  if(st.length>65)fails.push('seo_title '+st.length+'>65');
  if(sd.length>170)fails.push('seo_desc '+sd.length+'>170');
  if(!/seo_publish_ready:\s*false/.test(fm))fails.push('seo_publish_ready:false nahi');
  // v2.4.1: FRONTMATTER me bhi raw-HTML nishedh (ChatGPT v2.4-audit) — SEO metadata seedha
  // sarvajanik HTML me jata hai, isliye yahan koi bhi <tag>/<!-- = FAIL
  const fmTag=fm.match(/<\s*\/?\s*[A-Za-z][^>\n]{0,80}>?/);
  if(fmTag)fails.push('frontmatter me raw-HTML nishedh: "'+fmTag[0].slice(0,40)+'"');
  if(/<!--/.test(fm))fails.push('frontmatter me HTML-comment nishedh');

  const mcq=parseMCQ(body,fails);
  const dist={'\u0915':0,'\u0916':0,'\u0917':0,'\u0918':0};
  mcq.forEach(x=>dist[x.ans]++);
  for(const k in dist) if(dist[k]>=4)fails.push('uttar-pakshpat: ('+k+') '+dist[k]+'/5 baar sahi (max 3)');
  let longest=0;
  mcq.forEach((x,i)=>{
    const L={}; for(const k in x.opts) L[k]=x.opts[k].length;
    if(Object.keys(L).length===4){
      const others=Object.keys(L).filter(k=>k!==x.ans).map(k=>L[k]);
      if(L[x.ans]>Math.max.apply(null,others))longest++;
      const avg=others.reduce((a,b)=>a+b,0)/3;
      if(L[x.ans]>1.6*avg)fails.push('pr-'+(i+1)+' sahi vikalp bahut lamba ('+L[x.ans]+' vs ausat '+Math.round(avg)+')');
      if(L[x.ans]<0.4*avg)fails.push('pr-'+(i+1)+' sahi vikalp bahut chhota');
    }
  });
  if(longest>=4)fails.push('lambai-pakshpat: sahi=sabse-lamba '+longest+'/5 (max 3)');
  const smalls=(t.match(/font-size="(\d+)"/g)||[]).map(s=>parseInt(s.match(/\d+/)[0])).filter(n=>n<16);
  if(smalls.length)fails.push('SVG font<16: '+smalls.length+' jagah (nyoonatam '+Math.min.apply(null,smalls)+')');
  const svgs=t.match(/<svg[\s\S]*?<\/svg>/g)||[];
  if(svgs.length!==1)fails.push('SVG '+svgs.length+' (theek 1 chahiye)');
  svgs.forEach(s=>{
    const xe=xmlWellFormed(s);
    xe.slice(0,4).forEach(e=>fails.push('SVG-XML: '+e));
    if(/<script/i.test(s))fails.push('SVG me script nishedh');
    if(/(xlink:)?href\s*=\s*["\x27]https?:/i.test(s))fails.push('SVG me bahari-kadi nishedh');
  });
  if(/^publish:\s*true/m.test(t))fails.push('publish:true — PRAKASHAN-ROK');
  if(/^seo_publish_ready:\s*true/m.test(t))fails.push('seo_publish_ready:true — PRAKASHAN-ROK');
  return {w,fails,mcq,dist,longest,lessonId,slug:slugV};
}

// === bank-mode (B04: fail-closed) ===
if(process.argv[2]==='--bank'){
  let expectedLessons=null, expectedMcq=null;
  const files=[];
  process.argv.slice(3).forEach(a=>{
    let m;
    if((m=a.match(/^--expected-lessons=(\d+)$/)))expectedLessons=parseInt(m[1]);
    else if((m=a.match(/^--expected-mcq=(\d+)$/)))expectedMcq=parseInt(m[1]);
    else files.push(a);
  });
  const bf=[];
  if(files.length===0){console.log('BANK-FAIL: 0 paath-file — khali bank nishedh (fail-closed)');process.exit(1);}
  const dupF=files.filter((f,ix)=>files.indexOf(f)!==ix);
  if(dupF.length)bf.push('duplicate file: '+dupF[0]);
  const dist={'\u0915':0,'\u0916':0,'\u0917':0,'\u0918':0};
  let total=0, longest=0, lessonFails=0, readFails=0;
  const seqs=[], seenId={}, seenSlug={};
  files.forEach(f=>{
    let r;
    try{r=check(f);}catch(e){readFails++;bf.push('file padhne me vifal: '+f);return;}
    if(r.fails.length)lessonFails++;
    // v2.3: FRONTMATTER se lesson_id/slug uniqueness (file-naam se nahi)
    if(r.lessonId){ if(seenId[r.lessonId])bf.push('duplicate lesson_id (frontmatter): '+r.lessonId+' — '+seenId[r.lessonId]+' aur '+f); else seenId[r.lessonId]=f; }
    if(r.slug){ if(seenSlug[r.slug])bf.push('duplicate slug (frontmatter): '+r.slug); else seenSlug[r.slug]=f; }
    r.mcq.forEach(x=>{dist[x.ans]++;total++;});
    longest+=r.longest;
    seqs.push(r.mcq.map(x=>x.ans).join(''));
  });
  if(expectedLessons!==null&&files.length!==expectedLessons)bf.push('paath-ginti '+files.length+' != expected '+expectedLessons);
  if(expectedMcq!==null&&total!==expectedMcq)bf.push('MCQ-ginti '+total+' != expected '+expectedMcq);
  const sc={}; seqs.forEach(s=>sc[s]=(sc[s]||0)+1);
  const rep=Object.keys(sc).filter(s=>sc[s]>2);
  if(rep.length)bf.push('sequence-dohrav: '+rep.map(s=>'['+s+']x'+sc[s]).join(' '));
  for(let i=0;i+7<seqs.length;i++){
    if(seqs[i]===seqs[i+4]&&seqs[i+1]===seqs[i+5]&&seqs[i+2]===seqs[i+6]&&seqs[i+3]===seqs[i+7]){bf.push('modulo-4 cycle paath '+(i+1)+' se');break;}
  }
  if(total>0){
    for(const k in dist){
      const pc=100*dist[k]/total;
      if(pc>40)bf.push('('+k+') '+pc.toFixed(1)+'% >40%');
      if(pc<15)bf.push('('+k+') '+pc.toFixed(1)+'% <15%');
    }
    const lpc=100*longest/total;
    if(lpc>40)bf.push('sahi=sabse-lamba '+lpc.toFixed(1)+'% >40%');
    console.log('BANK:',files.length,'paath,',total,'MCQ | vitran:',JSON.stringify(dist),'| sabse-lamba:',longest,'('+lpc.toFixed(1)+'%)','| paath-FAIL:',lessonFails,'| padh-FAIL:',readFails);
  } else {
    bf.push('0 MCQ parse hue — bank khali/toota');
    console.log('BANK:',files.length,'paath, 0 MCQ');
  }
  if(bf.length||lessonFails||readFails){console.log('BANK-FAIL:',bf.join(' | ')||'(paath-star FAIL dekho)');process.exit(1);}
  console.log('BANK-PASS 🏁');
  process.exit(0);
}

let r;
try{r=check(process.argv[2]);}catch(e){console.log('FAIL file padhne me vifal: '+(process.argv[2]||'(koi file nahi)'));process.exit(1);}
if(r.fails.length){console.log('FAIL',r.fails.join(' | '));process.exit(1);}
console.log('PASS 🏁 shabd',r.w,'| uttar-vitran',JSON.stringify(r.dist),'| sabse-lamba',r.longest+'/5 | SVG>=16 | XML+suraksha ✓');
