/* ================================================================
   dev_dash_i18n_check.js v1.0 — learner-dashboard English-परत robot
   चलाना (repo-root से):  npm i jsdom@24  फिर  node generator/dev_dash_i18n_check.js
   जाँचें: A hi-default अछूता+toggle · B en-मोड zero-Devanagari (3 पेज)
   · C dashboard.js के runtime-literals render-सिम zero-leak (team-block
   कटाकर, SKIP/CANVAS छोड़कर) · C2 concat-जोड़ी+boundary · D dialogs · E observer
   नोट: canvas-लिखाई (प्रमाणपत्र/रसीद/ID-कार्ड) हिंदी ही है — design,
   "English certificate v1" अलग दर्ज होल। 🏁 के बिना deploy निषिद्ध।
   ================================================================ */
const path=require('path');
const ROOT=path.join(__dirname,'..');
function stripTeam(src){
  let out=src;
  for(;;){ const m=out.indexOf('if (MODE==="team")'); if(m===-1) break;
    const b=out.indexOf('{',m); let d=1,i=b+1;
    while(i<out.length&&d>0){const c=out[i]; if(c==='{')d++; else if(c==='}')d--; i++;}
    out=out.slice(0,m)+out.slice(i); }
  return out;
}
function stripComments(src){
  /* block-comments व //-comments हटाओ — उनके भीतर के "उद्धरण" literal नहीं */
  return src.replace(/\/\*[\s\S]*?\*\//g,' ')
            .split('\n').map(function(l){
              var i=l.indexOf('//');
              /* '//' किसी string के भीतर हो सकता है — मोटा नियम: उसके पहले
                 के हिस्से में उद्धरण-गिनती सम हो तभी काटो */
              while(i!==-1){ var pre=l.slice(0,i);
                var q=(pre.match(/'/g)||[]).length, qq=(pre.match(/"/g)||[]).length;
                if(q%2===0&&qq%2===0){ l=pre; break; }
                i=l.indexOf('//',i+1); }
              return l; }).join('\n');
}
function deriveLits(){
  const src=stripComments(stripTeam(require('fs').readFileSync(path.join(ROOT,'assets/dashboard.js'),'utf8')));
  const re=/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g;
  const dev=/[\u0900-\u097F]/, seen=new Set(), out=[]; let m;
  while((m=re.exec(src))){ const raw=m[1]!==undefined?m[1]:m[2];
    if(!dev.test(raw)||seen.has(raw)) continue; seen.add(raw); out.push(raw); }
  return out;
}
/* rt_i18n.js — learner English-layer मुहर-robot (jsdom) */
const fs=require('fs'); const {JSDOM}=require('jsdom');
const DEV=/[\u0900-\u097F]/;
const ENG=fs.readFileSync(path.join(ROOT,'assets/dash_i18n_en.js'),'utf8');
/* G0: corruption/version gates */
if(ENG.indexOf('\uFFFD')!==-1){console.log('FAIL: dash_i18n_en.js में U+FFFD (corrupted char)');process.exit(1);}
(function(){const dj=fs.readFileSync(path.join(ROOT,'assets/dashboard.js'),'utf8');
  if(dj.indexOf('\uFFFD')!==-1){console.log('FAIL: dashboard.js में U+FFFD');process.exit(1);}
  const hv=(dj.slice(0,800).match(/v(\d+\.\d+\.\d+)/)||[])[1];
  const dv=(dj.match(/const DASH_VER = "v([\d.]+)";/)||[])[1];
  if(!hv||!dv||hv!==dv){console.log('FAIL: version-बेमेल header v'+hv+' vs DASH_VER v'+dv);process.exit(1);}
  /* v1.2: production import-path gate — import early-boot पर, guard के भीतर नहीं */
  const iImp=dj.indexOf('import("/assets/dash_i18n_en.js")');
  const iGuard=dj.indexOf('function guardExternal');
  if(iImp===-1||iGuard===-1||iImp>iGuard){console.log('FAIL: English-import early-boot पर नहीं (guard से पहले चाहिए)');process.exit(1);}
  if(dj.indexOf('dash_i18n_en',iGuard)!==-1){console.log('FAIL: guard-क्षेत्र में dash_i18n_en का ज़िक्र — late-import लौट आया?');process.exit(1);}
  /* v1.2: sw-version gate */
  const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
  if(!/CACHE_VERSION = 'v831'/.test(sw)){console.log('FAIL: sw.js CACHE_VERSION v831 नहीं');process.exit(1);}
  /* v1.2: banned legacy-terminology gate — English VALUES पर */
  const mD=ENG.match(/^var D=(\{.*\});$/m);
  if(!mD){console.log('FAIL: D-line नहीं मिली');process.exit(1);}
  const DOBJ=JSON.parse(mD[1]); const vals=Object.values(DOBJ);
  const BAN=[/aptitude/i,/Green\/Golden/,/all online tests/,/stays temporary/,/[Ww]ith (?:an|the) active badge/,/[Ww]ith the badge\b/];
  for(const v of vals) for(const b of BAN) if(b.test(v)){console.log('FAIL: banned-term value में: '+b+' => '+v.slice(0,70));process.exit(1);}
  /* v1.2.1: banned-gate Hindi SOURCE पर भी — dict-KEYS + तीनों learner-HTML + stripped dashboard.js
     (ऑडिट-2 होल: values-only gate Hindi default-UI के बासी Career-दावे नहीं पकड़ता) */
  const BAN_HI=[/अभिरुचि-टेस्ट/,/Aptitude Test/,/Aptitude Certificate/,/Green\/Golden/,/सभी online टेस्ट/,/अस्थायी रहती/,/बिना-badge ₹100/];
  for(const k of Object.keys(DOBJ)) for(const b of BAN_HI) if(b.test(k)){console.log('FAIL: banned-term KEY में: '+b+' => '+k.slice(0,70));process.exit(1);}
  for(const hp of ['dashboard/student/index.html','dashboard/jobseeker/index.html','dashboard/entrepreneur/index.html']){
    const h=fs.readFileSync(path.join(ROOT,hp),'utf8');
    for(const b of BAN_HI) if(b.test(h)){console.log('FAIL: banned-term '+hp+' में: '+b);process.exit(1);}
  }
  const djStr=stripComments(dj);
  for(const b of BAN_HI) if(b.test(djStr)){console.log('FAIL: banned-term dashboard.js (stripped) में: '+b);process.exit(1);}
  console.log('G0(FFFD+version+path+sw+ban keys+HTML+js) 🏁 v'+dv+' · sw v831 · values='+vals.length);})();
const SKIP=new Set(["\" id=\"examResClose\" type=\"button\" style=\"width:100%\">ठीक है, बंद करें", "\" type=\"button\" style=\"padding:4px 10px\">🎁 इसे gift करें", "\" type=\"button\">📨 जमा करें", "\">कारण के साथ अस्वीकृत करें", "\">हफ़्ता-", "\">↩ वापस लें", "\">▶ जारी रखें", "\">▶️ नया टेस्ट दें / जारी रखें", "\">⛔ अस्वीकृति", "\">⛔ घोषणा बंद", "\">✅ भौतिक-सत्यापन", "\">✅ स्वीकारें", "\">✅ स्वीकृत — बैज दें (365 दिन)", "\">✉️ निवेदन भेजें", "\">❌ असफल", "\">❌ अस्वीकृत", "\">❌ लौटाएँ", "\">➕ जोड़ें", "\">➕ मेरी सूची में जोड़ें", "\">🎓 परीक्षा दें", "\">🎬 दुनिया के उस्ताद देखें", "\">🏁 अंतिम स्वीकृति", "\">🐢 धीरे", "\">💰 फीस-दर्ज", "\">📚 कोर्स पढ़ें", "\">📚 पढ़ें", "\">📜 लें ₹125", "\">📩 प्रस्ताव भेजें", "\">📲 कोर्स माँगें", "\">📲 रसीद WhatsApp", "\">🔊 वाक्य सुनिए", "\">🟢 WhatsApp पर भेजें", "\">🧭 मुफ़्त झलक दें", ">◀ पिछला", "Founder-खाते पर आवेदन-record लागू नहीं।", "placeholder=\"अस्वीकृति का कारण (अनिवार्य) — आवेदक को दिखेगा; 70% वापसी देय + 7-दिन सुधार-खिड़की\">", "अंतिम स्वीकृति दें? (सिर्फ़ उसी राज्य के ZM या Founder से होगी)", "अभी कोई घोषणा नहीं — ऊपर से पहली घोषणा करें।", "असफल का कारण (अनिवार्य):", "असफल पर कारण अनिवार्य है।", "अस्वीकृति का कारण (अनिवार्य) — आवेदक को दिखेगा; 70% वापसी देय + 7-दिन सुधार-खिड़की", "अस्वीकृति का कारण (अनिवार्य):", "आपके दायरे में अभी कोई सेवा-भूमिका आवेदन नहीं।", "इस आवेदक को Verified Badge दें? (365 दिन के लिए सक्रिय होगा)", "कदम-1 पूरा — अंतिम मुहर ZM/Founder करेंगे", "कदम-2: अंतिम मुहर (आपके राज्य के ZM या Founder) — कदम-1 के बाद", "क़तार खुल रही है…", "क़तार नहीं खुली", "कारण के साथ अस्वीकृत करें", "कारण लिखना अनिवार्य है।", "घोषणा बंद करें? नए नामांकन रुक जाएँगे — active अछूते रहेंगे।", "टिप्पणी (वैकल्पिक):", "नोट (जैसे: पहली किस्त) — ख़ाली भी चलेगा:", "पहले ऊपर कोई कोर्स घोषित करें।", "रक़म (₹) लिखें:", "लौटाने का कारण लिखें (ज़रूरी):", "⏳ कदम-1: RM भौतिक-सत्यापन बाक़ी", "⚠️ अस्वीकृत दर्ज — 70% वापसी देय (office Razorpay से) + 7-दिन सुधार-खिड़की।", "⚠️ कदम-2: अस्वीकृत", "⛔ अस्वीकृत — ", "⛔ अस्वीकृति", "⛔ घोषणा बंद", "✅ अभी कोई लंबित बैज-सत्यापन नहीं — क़तार ख़ाली है।", "✅ कदम-1: RM भौतिक-सत्यापन पूरा", "✅ भौतिक-सत्यापन", "✅ सत्यापन दर्ज", "✅ स्वीकारें", "✅ स्वीकृत — बैज दें (365 दिन)", "❌ असफल", "❌ असफल दर्ज", "❌ अस्वीकृत", "❌ कदम-1: सत्यापन असफल", "❌ लौटाएँ", "❌ लौटाया", "🎉 कदम-2: स्वीकृत — सब काम-अधिकार खुले", "🏁 अंतिम स्वीकृति", "🏁 स्वीकृत — ", "👑 Founder — सर्वोच्च; कोई approval-सफ़र लागू नहीं (नियम-4)।", "💰 फीस-दर्ज", "📣 घोषणा दर्ज — ", "📩 प्रस्ताव भेजें", "🛡️ Guardian-दस्तावेज़ नहीं"]);
['ँ','ं','ः','ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','्','।','। ','ने','मग','मणि','मरा','पिता ','राजूकुमार','सुनीता देवी','लैपटॉप 4 / मोबाइल 2 — माजरा?','32 घरों के लिए एक ही CSS/JS','ACS element ग़ायब:','dashboard नहीं दिखा (बाहरी-role)'].forEach(x=>SKIP.add(x));
'अआइईउऊऋएऐऑओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह'.split('').forEach(x=>SKIP.add(x)); SKIP.add('ड़');SKIP.add('ढ़');
const CANVAS=new Set(['प्रमाणित किया जाता है कि','प्रधान ट्रस्टी, FFGPMT','फ़्रीडम फ़ाइटर गंगाधर प्रसाद मेमोरियल ट्रस्ट','प्राधिकृत हस्ताक्षर','मान्यता एवं पंजीकरण / Registrations & Accreditations','मुख्यालय / Head Office: ACS Building, Vidyarthi Nagar, Karua-Javahartola Road, Chautham, Khagaria, Bihar - 851201','हम इनके उज्ज्वल भविष्य की कामना करते हैं।','प्रमाणपत्र नं / Certificate No','स्कैन कर सत्यापित करें','की दिनांक 31 जुलाई 2026 को आयोजित ऑनलाइन परीक्षा','अंकों से पास की।','दो भाषा मे, हिंदी और अंग्रेज़ी','📅 वैध: जारी-तिथि से 365 दिन','इस प्रमाणपत्र की सत्यता acslearn.com/verify पर ऊपर लिखे प्रमाणपत्र-नंबर से जाँची जा सकती है।']);
function fresh(html,lsEn){
  const dom=new JSDOM(html,{url:'https://acslearn.com/dashboard/student/',pretendToBeVisual:true,runScripts:'outside-only'});
  const w=dom.window;
  if(lsEn) w.localStorage.setItem('acs_dash_lang','en');
  w.eval(ENG);
  return {dom,w,d:w.document};
}
function devLeaks(d){
  const out=[]; const tw=d.createTreeWalker(d.body,4);
  let n; while((n=tw.nextNode())){
    const p=n.parentNode&&n.parentNode.tagName;
    if(p==='SCRIPT'||p==='STYLE') continue;
    if(n.parentNode&&n.parentNode.id==='i18nTgl') continue;
    if(DEV.test(n.nodeValue)) out.push('TXT:'+n.nodeValue.trim().slice(0,70));
  }
  ['placeholder','title','aria-label','data-h','alt'].forEach(a=>{
    d.querySelectorAll('['+a+']').forEach(el=>{ if(el.id==='i18nTgl') return;const v=el.getAttribute(a); if(v&&DEV.test(v)) out.push('ATTR['+a+']:'+v.slice(0,60));});
  });
  if(DEV.test(d.title)) out.push('TITLE:'+d.title);
  return out;
}
function A(c,m){ if(!c){ console.error('FAIL:',m); process.exit(1);} }
const PAGES=['student','jobseeker','entrepreneur'];
// ── A: hi-default अछूता + toggle ──
for(const p of PAGES){
  const html=fs.readFileSync(path.join(ROOT,'dashboard',p,'index.html'),'utf8');
  const {d}=fresh(html,false);
  A(d.getElementById('i18nTgl'),p+' toggle नहीं');
  A(d.getElementById('i18nTgl').textContent==='🌐 English',p+' toggle-label');
  A(DEV.test(d.body.textContent),p+' hi-default देवनागरी ग़ायब?!');
  A(d.documentElement.getAttribute('lang')==='hi',p+' hi lang');
  console.log(p,'A(hi-default) 🏁');
}
/* A2 (v1.2): registration-रहित/deny/loading अवस्था — engine early-load पर भी
   toggle+English मिले (registration-lookup पर निर्भरता शून्य) */
(function(){
  const html='<html><head><title>कोचिंग-प्रशिक्षु Dashboard — ACS</title></head><body>'
    +'<div class="topbar"><button class="btn-out side-toggle">☰ काम-सूची</button>'
    +'<button class="btn-out" id="logoutBtn">बाहर निकलें (Logout)</button></div>'
    +'<div id="loadView"><div>जाँच हो रही है…</div></div>'
    +'<div id="denyView"><h2>यह आपका Dashboard नहीं</h2><p>कृपया सही भूमिका से Login करें।</p>'
    +'<a href="/dashboard/">← Login पर जाएँ</a></div></body></html>';
  const {w,d}=fresh(html,true);
  w.__ACS_I18N.activate();
  const leaks=devLeaks(d).filter(t=>t.indexOf('i18nTgl')===-1);
  if(leaks.length){console.log('FAIL A2 deny-leak:',leaks.slice(0,3));process.exit(1);}
  const tg=d.getElementById('i18nTgl');
  if(!tg||tg.textContent!=='हिंदी'){console.log('FAIL A2: toggle ग़ायब/ग़लत');process.exit(1);}
  if(d.body.textContent.indexOf('This is not your Dashboard')===-1){console.log('FAIL A2: deny-पाठ English नहीं');process.exit(1);}
  console.log('A2(deny/loading en) 🏁');
})();
// ── B: en-mode — तीनों पेज zero-leak ──
for(const p of PAGES){
  const html=fs.readFileSync(path.join(ROOT,'dashboard',p,'index.html'),'utf8');
  const {d}=fresh(html,true);
  const leaks=devLeaks(d);
  if(leaks.length){ console.error(p,'LEAKS',leaks.length); leaks.slice(0,20).forEach(x=>console.error('  ',x)); process.exit(1); }
  A(d.documentElement.getAttribute('lang')==='en',p+' lang=en');
  A(d.getElementById('i18nTgl').textContent==='हिंदी',p+' toggle=हिंदी');
  A(/Dashboard: ACS/.test(d.title)&&!DEV.test(d.title),p+' title');
  console.log(p,'B(en zero-leak) 🏁');
}
// ── C: हर runtime-literal render-सिम → zero-leak ──
{
  const html=fs.readFileSync(path.join(ROOT,'dashboard/student/index.html'),'utf8');
  const {w,d}=fresh(html,true);
  const lits=deriveLits();
  let tested=0, leaks=[];
  for(const raw of lits){
    const s=raw.replace(/\\n/g,'\n').replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\\\/g,'\\');
    if(SKIP.has(raw)||SKIP.has(s)||CANVAS.has(s)) continue;
    if(s.trim().length<2) continue;
    const plain=s.replace(/<[^>]+>/g,'').replace(/^\s*"?>?/,'').trim();
    if(SKIP.has(plain)||CANVAS.has(plain)) continue;
    if(raw.startsWith('placeholder=')) continue;
    if(raw.startsWith('"')){ /* tag-कटा artifact — असली DOM-पाठ plain है */
      const dv2=d.createElement('div'); dv2.textContent=plain; w.__ACS_I18N.walk(dv2);
      if(DEV.test(dv2.textContent)) leaks.push('BTN» '+plain.slice(0,60));
      tested++; continue; }
    const div=d.createElement('div');
    if(s.indexOf('<')!==-1) div.innerHTML=s; else div.textContent=s;
    w.__ACS_I18N.walk(div);
    const t=div.textContent;
    const attrsLeak=[...div.querySelectorAll('[placeholder],[title],[aria-label],[data-h],[alt]')].some(el=>['placeholder','title','aria-label','data-h','alt'].some(a=>DEV.test(el.getAttribute(a)||'')));
    if(DEV.test(t)||attrsLeak) leaks.push(raw.slice(0,80));
    tested++;
  }
  if(leaks.length){ console.error('LITERAL-LEAKS',leaks.length); leaks.forEach(x=>console.error('  »',x)); process.exit(1); }
  console.log('C(runtime-literals) 🏁 tested='+tested);
  // concat-जोड़ नमूने
  const comps=[
    ['🏅 आपका बैज चालू है ('+'19-07-2027'+' तक)','valid till 19-07-2027)'],
    ['Student Golden Badge'+' · शुल्क ₹'+'228',' · fee ₹228'],
    ['भरे '+'80'+'/120 ('+'40'+' बाक़ी)','Answered 80/120 (40 left)'],
    ['प्रश्न '+'12'+'/120','Question 12/120'],
    ['⏳ इस हफ़्ते का slot: '+'1','slot: 1'],
    ['नमस्ते'+' · अवधि: '+'90 दिन',' · duration: 90 days'],
    ['🎁 gift दर्ज — भुगतान-चक्र में पैसा '+'ACS-2026-1234'+' को जाएगा।','money will go to ACS-2026-1234.'],
    ['✅ सहेजा गया — '+'2 कोर्स',''],
    ['🎯 परीक्षा के योग्य','🎯 Eligible for the exam'],
  ];
  for(const [inp,need] of comps){
    const dv=d.createElement('div'); dv.textContent=inp; w.__ACS_I18N.walk(dv);
    A(!DEV.test(dv.textContent)||inp.indexOf('नमस्ते')>-1&&dv.textContent.indexOf('नमस्ते')>-1&&!DEV.test(dv.textContent.replace('नमस्ते','')),'comp-leak: '+inp+' => '+dv.textContent);
    A(dv.textContent.indexOf(need)>-1,'comp-miss: '+inp+' => '+dv.textContent);
    A(dv.textContent.indexOf('\uFFFD')===-1,'FFFD-output: '+inp);
  }
  // boundary: नाम ⊄ नामांकन-जैसे शब्द
  const b=d.createElement('div'); b.textContent='कोर्सनामा'; w.__ACS_I18N.walk(b);
  A(b.textContent==='कोर्सनामा','boundary टूटा: '+b.textContent);
  console.log('C2(concat+boundary) 🏁');
  // D: dialogs
  A(w.__ACS_I18N.trText('10 मिनट से कोई हलचल नहीं — सुरक्षा के लिए logout।')==='No activity for 10 minutes: logging out for safety.','dialog-tr');
  const conf=w.__ACS_I18N.trText('भुगतान के बाद RM आपकी जानकारी जाँचेंगे। सत्यापन असफल हुआ तो 30% जाँच-शुल्क कटेगा।\n\nभुगतान करें?');
  A(conf.indexOf('Proceed to pay?')>-1,'confirm-tr');
  console.log('D(dialogs) 🏁');
}
// ── E: observer smoke (async) ──
(async()=>{
  const html=fs.readFileSync(path.join(ROOT,'dashboard/jobseeker/index.html'),'utf8');
  const {w,d}=fresh(html,true);
  const host=d.createElement('div'); d.body.appendChild(host);
  host.innerHTML='<span class="note">हिसाब आ रहा है…</span>';
  await new Promise(r=>setTimeout(r,50));
  A(host.textContent==='Ledger loading…','observer: '+host.textContent);
  console.log('E(observer) 🏁');
  console.log('RT-I18N ROBOT 🏁 सब पास');
})();
