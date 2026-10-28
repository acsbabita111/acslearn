/* build_chitra_pustak.js v2.0 · 29-Oct-2026 (v1.0: 24-Oct) — "मेरी पहली चित्र-पुस्तक" (ACS-CP1) generator · परत-4
   स्रोत: (1) root _TEMPLATE.html (universal navbar/menu/footer) — web-पन्ना  (2) generator/data/chitra/chitra_<code>.js — शब्द, उच्चारण, अर्थ, चित्र-नाम
          (3) /assets/chitra/*.webp — चित्र अलग फ़ाइलों में (Microsoft Fluent Emoji, MIT; षटकोण/त्रिभुज ACS-निर्मित)
   निकास: /courses/hi/bhasha/<slug>/chitra-pustak/index.html  (web: पूरी पुस्तक, 🔊, छपाई-योग्य)
          /courses/hi/bhasha/<slug>/chitra-pustak/reader.html (मोबाइल: पूरी स्क्रीन, एक कार्ड प्रति स्क्रीन, स्वाइप — जान-बूझकर बिना navbar; ⌂ से वापसी)
   नियम: तीन-स्तंभ (शब्द · देवनागरी उच्चारण · हिंदी अर्थ) · ≥16px · हिंदी वर्णमाला वर्ग-अनुसार · पट्टी: © ™ + FFGPMTrust पंक्ति · check-robot fail = पन्ना नहीं बनता
   नई भाषा = CHITRA_LANGS में एक पंक्ति + data/chitra/chitra_<code>.js */
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const TPL=fs.readFileSync(path.join(ROOT,"_TEMPLATE.html"),"utf8");
const VER="2.0";   /* v2.0 (29-Oct, चरण-3): हर-लिपि-योग्य — en रास्ता byte-frozen (L.code==="en" gate); non-en: भाग-1 उस भाषा के अक्षर (जहाँ चित्र-शब्द मिला), भाग-2 हिंदी अक्षर + उस भाषा का शब्द, भाग-3 वही 100 चित्र */   /* v1.1 (25-Oct): canonical = …/index.html (sitemap-रूप) + og:url/og:description */
const CHITRA_LANGS=["en","mr","sw","ta"];
function loadMenu(){const src=fs.readFileSync(path.join(ROOT,"assets","links.js"),"utf8");const box={};new Function("window",src+"; window.__L=(typeof ACS_LINKS!=='undefined')?ACS_LINKS:null;")(box);if(!box.__L||!Array.isArray(box.__L.menu))throw new Error("links.js से menu नहीं");return box.__L.menu;}
const MENU_HTML=loadMenu().map(m=>'<a class="acs-mitem" href="'+m.href+'"><span class="e">'+m.icon+"</span> "+m.label+"</a>").join("\n");
const MENU_FALLBACK_JS='<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};}</scr'+'ipt>';
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const jsq=s=>String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'");
const TM='© 2026 <b>Applied Computer School™</b> · <b>acslearn™</b> · acslearn.com';
const LINE='FFGPMTrust के सौजन्य से ऑनलाइन शिक्षा निःशुल्क और प्रमाणपत्र सशुल्क';
const IMG="/assets/chitra/";
const COLORS=["#E53935","#FB8C00","#43A047","#1E88E5","#8E24AA","#F4511E"];
function rainbow(t){const seg=[...new Intl.Segmenter("hi",{granularity:"grapheme"}).segment(t)].map(x=>x.segment);let k=0;return seg.map(g=>g.trim()&&g!=="-"?'<span style="color:'+COLORS[k++%COLORS.length]+'">'+g+"</span>":g).join("");}
/* ---- check-robot ---- */
function check(D){
  const E=[],LAT=/[A-Za-z]/,EN=D.lang.code==="en";
  if(EN&&D.alpha.length!==26)E.push("अंग्रेज़ी वर्णमाला 26 नहीं: "+D.alpha.length);
  const hn=D.hindi.reduce((a,g)=>a+g.items.length,0);if(hn!==48)E.push("हिंदी वर्णमाला 48 नहीं: "+hn);
  if(D.shared.length!==100)E.push("साझा शब्द 100 नहीं: "+D.shared.length);
  const all=[...D.alpha,...D.hindi.flatMap(g=>g.items),...D.shared];
  for(const x of all){
    if(!fs.existsSync(path.join(ROOT,"assets","chitra",x.img)))E.push("चित्र नहीं: "+x.img);
    else if(fs.statSync(path.join(ROOT,"assets","chitra",x.img)).size>50*1024)E.push("चित्र 50KB से भारी: "+x.img);
    if(!x.p||LAT.test(x.p))E.push("उच्चारण में Latin/ख़ाली: "+x.w+" → "+x.p);
    if(!EN&&/[^\u0900-\u097F\s'()\-]/u.test(x.p))E.push("उच्चारण में देवनागरी के बाहर का अक्षर: "+x.w+" → "+x.p);
    if(!EN&&!(x.w||"").trim())E.push("शब्द ख़ाली");
  }
  for(const g of D.hindi){if(g.items.length>6)E.push("एक वर्ग-पेज पर 6 से ज़्यादा: "+g.g);}
  if(E.length)throw new Error("check-robot FAIL:\n  "+E.join("\n  "));
  return all.length;
}
function card(x,kind,tts,lab){lab=lab||"English";
  let a,b,bl,al,body;
  if(kind==="alpha"){a=x.w;al=tts;b=x.m;bl="hi-IN";body='<div class="cp-L">'+esc(x.L)+(x.L.toLowerCase()!==x.L?' <small>'+esc(x.L.toLowerCase())+'</small>':'')+'</div><img src="'+IMG+x.img+'" alt="'+esc(x.w)+'" loading="lazy" onclick="cpPlay(this)"><div class="cp-w">'+esc(x.w)+'</div><div class="cp-p">'+esc(x.p)+'</div><div class="cp-m">'+esc(x.m)+'</div>';}
  else if(kind==="hindi"){a=x.L+"... "+x.w.replace(/[()]/g,"");al="hi-IN";b=x.en;bl=tts;body='<div class="cp-L">'+esc(x.L)+'</div><img src="'+IMG+x.img+'" alt="'+esc(x.w)+'" loading="lazy" onclick="cpPlay(this)"><div class="cp-w">'+esc(x.w)+'</div><div class="cp-lab">'+esc(lab)+': '+esc(x.en)+'</div><div class="cp-p">'+esc(x.p)+'</div>';}
  else{a=x.w;al=tts;b=x.hi;bl="hi-IN";body='<img src="'+IMG+x.img+'" alt="'+esc(x.w)+'" loading="lazy" onclick="cpPlay(this)"><div class="cp-w">'+esc(x.w)+'</div><div class="cp-p">'+esc(x.p)+'</div><div class="cp-m">'+esc(x.hi)+'</div>';}
  return '<div class="cp-card" data-a="'+esc(a)+'" data-al="'+al+'" data-b="'+esc(b)+'" data-bl="'+bl+'"><button class="cp-spk" title="सुनें" onclick="cpPlay(this)">🔊</button>'+body+'</div>';
}
const SAYJS='<script>function cpSay(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=.8;var v=speechSynthesis.getVoices().filter(function(x){return x.lang.replace("_","-").indexOf(l.split("-")[0])===0;});if(v.length)u.voice=v[0];speechSynthesis.speak(u);}catch(e){}}function cpPlay(el){if(!("speechSynthesis" in window)){alert("इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है");return;}var c=el.closest(".cp-card");speechSynthesis.cancel();cpSay(c.dataset.a,c.dataset.al);if(c.dataset.b)cpSay(c.dataset.b,c.dataset.bl);}</scr'+'ipt>';
function regBox(L,where){/* v2.0 ब्रांड-नियम (27-Oct): non-en पन्नों पर तीन जगह छात्र-रजिस्ट्रेशन की अपील; en पन्ना byte-frozen */if(L.code==="en")return "";const t=where==="top"?"यह पुस्तक मुफ़्त है, और "+L.hi+" बोलने का पूरा कोर्स भी मुफ़्त है।":where==="mid"?"आगे "+L.hi+" बोलना सीखिए, और परीक्षा देकर प्रमाणपत्र लीजिए।":"अगला कदम रजिस्ट्रेशन है — इससे आपकी पढ़ाई और परीक्षा का हिसाब आपके नाम से रहता है।";return '<div class="acs-reg" style="background:#F5F7FA;color:#0B1F3A;border:2px solid #2E7D32;border-radius:12px;padding:12px 14px;margin:14px auto;max-width:900px;font-size:18px;line-height:1.7">📝 <b>'+esc(t)+'</b> रजिस्ट्रेशन मुफ़्त है। <a href="/join.html" style="color:#2E7D32;font-weight:800">मुफ़्त रजिस्ट्रेशन करें →</a></div>';}
function buildIndex(D,n){
  const L=D.lang,code="ACS-CP1-"+L.code;
  let h='<div class="cp-wrap"><div class="cp-hero"><div class="cp-code">'+code+' · भाषा: '+L.code+' ('+esc(L.en)+') · धुरी: हिंदी</div><h1>मेरी पहली <span class="gold">चित्र-पुस्तक</span></h1><div style="font-size:20px">'+esc(L.hi)+' · हिंदी — कक्षा 1 स्तर · '+n+' चित्र-शब्द</div></div>';
  h+='<div class="cp-btns"><a class="cp-btn" href="reader.html">📱 मोबाइल-पुस्तक खोलें (पूरी स्क्रीन)</a><button class="cp-btn b2" onclick="window.print()">🖨️ छापें / PDF</button><a class="cp-btn b3" href="#bhag3">🔤 साझा शब्द</a></div>';
  h+=regBox(L,"top");
  h+='<p style="text-align:center">हर कार्ड में: <b>शब्द</b> · <span style="color:#1565C0"><b>उच्चारण</b> (देवनागरी में)</span> · <span style="color:#2E7D32"><b>हिंदी अर्थ</b></span> — 🔊 या चित्र दबाएँ तो आवाज़।</p>';
  const LAB=L.code==="en"?"English":L.hi;
  if(L.code!=="en"&&!D.alpha.length)h+='<h2 class="cp-sec">भाग-1 · '+esc(L.hi)+' वर्णमाला</h2><p style="text-align:center">'+esc(L.hi)+' की लिपि देवनागरी है — अक्षर वही हैं जो हिंदी के। इसलिए नीचे भाग-2 में हर हिंदी अक्षर का चित्र-शब्द '+esc(L.hi)+' में दिया है।</p>';
  else h+='<h2 class="cp-sec">भाग-1 · '+esc(L.hi)+' वर्णमाला</h2><div class="cp-grid">'+D.alpha.map(x=>card(x,"alpha",L.tts)).join("")+'</div>'+(D.alphaNote?'<p style="text-align:center">'+esc(D.alphaNote)+'</p>':'');
  h+='<h2 class="cp-sec">भाग-2 · हिंदी वर्णमाला (वर्ग-अनुसार)</h2>'+D.hindi.map(g=>'<h3 class="cp-grp">'+esc(g.g)+'</h3><div class="cp-grid">'+g.items.map(x=>card(x,"hindi",L.tts,LAB)).join("")+'</div>').join("");
  h+=regBox(L,"mid");
  h+='<h2 class="cp-sec" id="bhag3">भाग-3 · साझा शब्द-चित्र (100)</h2><div class="cp-grid">'+D.shared.map(x=>card(x,"shared",L.tts)).join("")+'</div>';
  h+=regBox(L,"end");
  h+='<div class="cp-info"><b>पुस्तक-सूचना</b><br>'+TM+'<br><b>'+LINE+'</b><br>मेरी पहली चित्र-पुस्तक v'+D.version+' · पुस्तक-कोड: '+code+' · भाषा: '+L.code+' · धुरी: हिंदी<br>🟡 AI-मसौदा — भाषा संवर्धन समिति की समीक्षा का स्वागत'+(D.srcNote?' · '+esc(D.srcNote):'')+' · चित्र: Microsoft Fluent Emoji (MIT लाइसेंस: <a href="/assets/chitra/LICENSE-FluentEmoji-MIT.txt">पूरा पाठ</a>) · षटकोण व त्रिभुज: ACS-निर्मित</div></div>';
  return h;
}
function buildReader(D){
  const L=D.lang,S=[{t:"cover"},{t:"sec",h:"भाग-1",s:L.hi+" वर्णमाला"}];
  D.alpha.forEach(x=>S.push({t:"card",big:x.L+(x.L.toLowerCase()!==x.L?' <small>'+x.L.toLowerCase()+'</small>':''),img:IMG+x.img,w:x.w,p:x.p,m:x.m,a:x.w,al:L.tts,b:x.m,bl:"hi-IN"}));
  S.push({t:"sec",h:"भाग-2",s:"हिंदी वर्णमाला"});
  D.hindi.forEach(g=>{S.push({t:"sec",h:"हिंदी वर्णमाला",s:g.g,l:g.items.map(x=>x.L).join(" ")});g.items.forEach(x=>S.push({t:"card",g:g.g,big:x.L,img:IMG+x.img,w:x.w,p:x.p,m:(L.code==="en"?"English":L.hi)+": "+x.en,hi:1,a:x.L+"... "+x.w.replace(/[()]/g,""),al:"hi-IN",b:x.en,bl:L.tts}));});
  S.push({t:"sec",h:"भाग-3",s:"साझा शब्द-चित्र · 100"});
  D.shared.forEach(x=>S.push({t:"card",img:IMG+x.img,w:x.w,p:x.p,m:x.hi,a:x.w,al:L.tts,b:x.hi,bl:"hi-IN"}));
  S.push({t:"end"});
  const code="ACS-CP1-"+L.code,key="acs_cp1_"+L.code;
  return {n:S.length,html:`<!DOCTYPE html>
<!-- ⚠️ generator से बना (build_chitra_pustak.js v${VER}) — हाथ से न बदलें -->
<html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0B1F3A">
<title>मेरी पहली चित्र-पुस्तक — ${esc(L.hi)} (मोबाइल) | अप्लाइड कंप्यूटर स्कूल</title><link rel="canonical" href="https://acslearn.com/courses/hi/bhasha/${L.slug}/chitra-pustak/reader.html">
<style>*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}html,body{height:100%;overflow:hidden;background:#0B1F3A;font-family:"Noto Sans Devanagari",system-ui,sans-serif;color:#0B1F3A}
#app{position:fixed;inset:0;display:flex;flex-direction:column;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}
#top{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;color:#fff;font-size:16px}#top a,#top button{background:#1565C0;color:#fff;border:0;border-radius:18px;padding:6px 12px;font-size:16px;text-decoration:none}
#bar{height:5px;background:#24365a}#bar i{display:block;height:100%;background:#F9A825;width:0;transition:width .25s}#stage{flex:1;position:relative;overflow:hidden}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:14px 16px;background:linear-gradient(180deg,#E8F6FF,#FFFFFF 55%,#FFF8E1);transition:transform .3s ease}
.big{font-size:clamp(64px,18vw,120px);font-weight:900;color:#2E7D32;line-height:1.1}.big small{font-size:.6em;color:#1565C0}
.slide img.pic{width:min(62vw,40vh);height:min(62vw,40vh);object-fit:contain;filter:drop-shadow(0 8px 10px rgba(0,0,0,.18));margin:6px 0}
.w{font-size:clamp(34px,10vw,56px);font-weight:800}.p{font-size:clamp(22px,6vw,32px);color:#1565C0}.m{font-size:clamp(24px,6.5vw,34px);color:#2E7D32;font-weight:700}
.spk{margin-top:14px;border:0;background:#F9A825;color:#0B1F3A;border-radius:40px;padding:12px 26px;font-size:24px;font-weight:800;box-shadow:0 4px 0 #C17900}
.sec{background:linear-gradient(160deg,#0B1F3A,#1565C0);color:#fff}.sec .h{font-size:30px;color:#FFE082}.sec .s{font-size:clamp(30px,8vw,44px);font-weight:800;margin-top:8px}
.lt{font-size:clamp(34px,10vw,52px);font-weight:900;color:#FFE082;margin-top:14px;letter-spacing:4px}.gl{position:absolute;top:10px;left:12px;background:#EF6C00;color:#fff;border-radius:16px;padding:3px 12px;font-size:16px;font-weight:700}
.cv{background:linear-gradient(180deg,#3FA9F5 0%,#BEE3FF 55%,#FFF6D6 100%);justify-content:flex-start;padding-top:18px}
.cv .brand{display:flex;gap:8px;align-items:center;background:#fff;border-radius:40px;padding:4px 14px 4px 4px}.cv .brand img{width:54px;height:54px}
.cv .bn{font-size:clamp(16px,4.4vw,18px);font-weight:800;white-space:nowrap}.cv .bt{font-size:16px;color:#1565C0;font-style:italic}
.cv .box{background:#fff;border-radius:36px;padding:12px 18px 16px;margin-top:14px;box-shadow:0 6px 0 rgba(0,0,0,.08)}
.cv .t1{font-size:30px;font-weight:800}.cv .t2{font-size:clamp(48px,14vw,68px);font-weight:900;line-height:1.15}.cv .t3{font-size:18px;font-weight:700;color:#1565C0}
.cv .rib{display:inline-block;margin-top:6px;background:#FFE082;border-radius:20px;padding:4px 14px;font-size:18px;font-weight:800}.cv .scene{position:relative;width:100%;flex:1;min-height:120px}.cv .scene img{position:absolute}
.go{margin:8px 0 4px;border:0;background:#2E7D32;color:#fff;border-radius:40px;padding:12px 30px;font-size:24px;font-weight:800;box-shadow:0 4px 0 #1B5E20}
#nav{display:flex;gap:10px;padding:8px 10px;background:#0B1F3A}#nav button{flex:1;border:0;border-radius:14px;padding:12px;font-size:22px;font-weight:800;background:#1565C0;color:#fff}#nav button:disabled{opacity:.35}
#pg{color:#fff;align-self:center;font-size:18px;min-width:84px;text-align:center}#foot{background:#0B1F3A;color:#cfd8e3;font-size:16px;text-align:center;padding:0 8px 6px;line-height:1.3}#foot b{color:#F9A825}
.hint{font-size:16px;color:#555;margin-top:8px}
@media (max-height:700px){.cv{padding-top:8px}.cv .brand img{width:42px;height:42px}.cv .box{margin-top:6px;padding:6px 14px 10px}.cv .t1{font-size:24px}.cv .t2{font-size:44px}.cv .scene{min-height:70px}.cv .hint{display:none}.go{padding:10px 24px;font-size:22px}.big{font-size:56px}.slide img.pic{width:min(55vw,28vh);height:min(55vw,28vh)}.w{font-size:32px}.p,.m{font-size:22px}.spk{margin-top:8px;padding:8px 22px;font-size:22px}}
</style></head><body><div id="app"><div id="top"><a href="./">⌂ पुस्तक</a><span>${code}</span><button id="fs">⛶ पूरी स्क्रीन</button></div>
<div id="bar"><i></i></div><div id="stage"></div><div id="nav"><button id="prev">◀ पीछे</button><span id="pg"></span><button id="next">आगे ▶</button></div>
<div id="foot">${TM}<br><b>${LINE}</b></div></div>
<script>var S=${JSON.stringify(S)};var TITLE=${JSON.stringify(rainbow("चित्र-पुस्तक"))};var CODE=${JSON.stringify(code)};var KEY=${JSON.stringify(key)};var IMG=${JSON.stringify(IMG)};var LHI=${JSON.stringify(L.hi)};
var i=0;try{i=parseInt(localStorage.getItem(KEY)||'0',10)||0;}catch(e){}if(i>=S.length)i=0;
function say(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=.8;var v=speechSynthesis.getVoices().filter(function(x){return x.lang.replace('_','-').indexOf(l.split('-')[0])===0;});if(v.length)u.voice=v[0];speechSynthesis.speak(u);}catch(e){}}
function play(s){if(!('speechSynthesis' in window)){alert('इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है');return;}speechSynthesis.cancel();say(s.a,s.al);if(s.b)say(s.b,s.bl);}
function html(s){
 if(s.t=='cover')return '<div class="slide cv"><div class="brand"><img src="/logo.png" alt=""><div><div class="bn">Applied Computer School™</div><div class="bt">From Village to World</div></div></div><div class="box"><div class="t1">मेरी पहली</div><div class="t2">'+TITLE+'</div><div class="t3">My First Picture Book</div><div class="rib">'+LHI+' · हिंदी — कक्षा 1</div></div><div class="scene"><img src="'+IMG+'cover-rainbow.webp" style="left:2%;top:4%;width:34%"><img src="'+IMG+'cover-sun.webp" style="right:4%;top:0;width:20%"><img src="'+IMG+'cover-plane.webp" style="right:6%;top:34%;width:18%"><img src="'+IMG+'cover-boy.webp" style="left:14%;bottom:6%;width:32%"><img src="'+IMG+'cover-girl.webp" style="right:14%;bottom:6%;width:32%"></div><button class="go" onclick="go(1)">पढ़ना शुरू करें ▶</button><div class="hint">उँगली से बाएँ-दाएँ खिसकाएँ</div></div>';
 if(s.t=='sec')return '<div class="slide sec"><div class="h">'+s.h+'</div><div class="s">'+s.s+'</div>'+(s.l?'<div class="lt">'+s.l+'</div>':'')+'<div class="hint" style="color:#cfd8e3">आगे ▶ दबाएँ</div></div>';
 if(s.t=='end')return '<div class="slide sec"><div class="s">शाबाश! 🎉</div><div class="h" style="margin-top:10px">आपने पूरी पुस्तक पढ़ ली</div><button class="go" onclick="go(-'+(S.length-1)+')">फिर से शुरू करें</button><div class="hint" style="color:#cfd8e3">पुस्तक-कोड: '+CODE+' · धुरी: हिंदी<br>🟡 AI-मसौदा · भाषा संवर्धन समिति की समीक्षा का स्वागत</div></div>';
 return '<div class="slide">'+(s.g?'<div class="gl">'+s.g+'</div>':'')+(s.big?'<div class="big">'+s.big+'</div>':'')+'<img class="pic" src="'+s.img+'" alt="" onclick="play(S[i])"><div class="w">'+s.w+'</div>'+(s.hi?'<div class="m" style="color:#555">'+s.m+'</div><div class="p">'+s.p+'</div>':'<div class="p">'+s.p+'</div><div class="m">'+s.m+'</div>')+'<button class="spk" onclick="play(S[i])">🔊 सुनें</button></div>';
}
var st=document.getElementById('stage');
function render(dir){st.innerHTML=html(S[i]);var el=st.firstChild;if(dir){el.style.transform='translateX('+(dir>0?'100%':'-100%')+')';requestAnimationFrame(function(){requestAnimationFrame(function(){el.style.transform='translateX(0)';});});}
 document.getElementById('pg').textContent=(i+1)+' / '+S.length;document.querySelector('#bar i').style.width=(i/(S.length-1)*100)+'%';
 document.getElementById('prev').disabled=i==0;document.getElementById('next').disabled=i==S.length-1;try{localStorage.setItem(KEY,i);}catch(e){}
 var nx=S[i+1];if(nx&&nx.img){var im=new Image();im.src=nx.img;}}
function go(d){var n=i+d;if(n<0||n>=S.length)return;i=n;try{speechSynthesis.cancel();}catch(e){}render(d>0?1:-1);}
document.getElementById('prev').onclick=function(){go(-1)};document.getElementById('next').onclick=function(){go(1)};
document.getElementById('fs').onclick=function(){var d=document.documentElement;try{if(!document.fullscreenElement){(d.requestFullscreen||d.webkitRequestFullscreen).call(d);}else{document.exitFullscreen();}}catch(e){}};
var x0=null;st.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});st.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)go(dx<0?1:-1);x0=null;},{passive:true});
document.addEventListener('keydown',function(e){if(e.key=='ArrowRight')go(1);if(e.key=='ArrowLeft')go(-1);});render(0);
</scr`+`ipt></body></html>`};
}
function build(code){
  const D=require(path.join(__dirname,"data","chitra","chitra_"+code+".js"));
  const n=check(D),L=D.lang,dir=path.join(ROOT,"courses","hi","bhasha",L.slug,"chitra-pustak");
  fs.mkdirSync(dir,{recursive:true});
  const html=buildIndex(D,n);
  const S="<!-- PAGE-CONTENT-START -->",E="<!-- PAGE-CONTENT-END -->",a=TPL.indexOf(S),b=TPL.indexOf(E);
  if(a<0||b<0)throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page=TPL.slice(0,a+S.length)+"\n"+html+"\n"+TPL.slice(b);
  const title="मेरी पहली चित्र-पुस्तक — "+L.hi+" · हिंदी, कक्षा 1 ("+n+" बोलते चित्र-शब्द, मुफ़्त) | अप्लाइड कंप्यूटर स्कूल";
  const desc=L.code!=="en"?L.hi+" के चित्र-शब्द: "+L.hi+" अक्षर, हिंदी वर्णमाला (वर्ग-अनुसार) और रोज़ की 100 चीज़ें — हर शब्द देवनागरी उच्चारण और हिंदी अर्थ के साथ, 🔊 आवाज़, मोबाइल-पुस्तक और छपाई-योग्य।":L.hi+" A–Z और हिंदी वर्णमाला (वर्ग-अनुसार) के साथ रोज़ की 100 चीज़ें — हर शब्द देवनागरी उच्चारण और हिंदी अर्थ के साथ, 🔊 आवाज़, मोबाइल-पुस्तक और छपाई-योग्य।";
  const url="https://acslearn.com/courses/hi/bhasha/"+L.slug+"/chitra-pustak/index.html";   /* 25-Oct: canonical = sitemap-रूप */
  page=page.replace(/<title>[\s\S]*?<\/title>/,"<title>"+esc(title)+"</title>\n<meta name=\"description\" content=\""+esc(desc)+"\">\n<link rel=\"canonical\" href=\""+url+"\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:url\" content=\""+url+"\">\n<meta property=\"og:title\" content=\""+esc(title)+"\">\n<meta property=\"og:description\" content=\""+esc(desc)+"\">\n<meta property=\"og:locale\" content=\"hi_IN\">\n<meta property=\"og:image\" content=\"https://acslearn.com/logo.png\">");
  page=page.replace("</head>",'<link rel="stylesheet" href="/assets/chitra.css">\n</head>');
  page=page.replace('<div id="acsMenuList"></div>','<div id="acsMenuList">\n'+MENU_HTML+"\n</div>");
  page=page.replace("</body>",MENU_FALLBACK_JS+"\n"+SAYJS+"\n</body>");
  page=page.replace("<!DOCTYPE html>","<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_chitra_pustak.js v"+VER+") — हाथ से न बदलें। स्रोत: _TEMPLATE.html + generator/data/chitra/chitra_"+code+".js + assets/chitra/ -->");
  fs.writeFileSync(path.join(dir,"index.html"),page);
  const R=buildReader(D);fs.writeFileSync(path.join(dir,"reader.html"),R.html);
  console.log("✅ "+code+": "+n+" कार्ड · index.html + reader.html ("+R.n+" स्क्रीन)");
}
/* v2.0: en का live-पन्ना कभी अपने-आप दोबारा नहीं बनता — सिर्फ़ साफ़ माँग पर */
const only=process.argv[2];CHITRA_LANGS.filter(c=>only?c===only:c!=="en").forEach(build);
