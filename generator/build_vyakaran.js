/* build_vyakaran.js v1.1 · 25-Oct-2026 (v1.0: 24-Oct) — "मेरा पहला व्याकरण" (ACS-VK1) generator · परत-4
   v1.1: हर उदाहरण पर 🎙️ बोलो-अभ्यास (assets/acs-bolo.js) · पन्ने के अंत में 👍👎💬 (assets/acs-raay.js) ·
         आवरण: पुस्तक v0.1 (24-Oct) का Founder-पसंद पहला पेज अब web-पन्ने का शीर्ष (हर पाठ ≥16px, छपाई में पूरा पहला पन्ना)
         पन्ना-robot में नए नियम: हर उदाहरण पर 🎙️ · राय-डिब्बा ठीक एक, सबसे अंत में · छपाई-नियम (पाठ-1 पहले पन्ने पर, तैरते बटन/WhatsApp/तिरंगा न छपें)
   स्रोत: root _TEMPLATE.html + generator/data/vyakaran/vyakaran_<code>.js (उदाहरण = master-वाक्य, कोड सहित)
   निकास: /courses/hi/bhasha/<slug>/vyakaran/index.html — 12 पाठ, 🔊, छपाई-योग्य (हर पाठ नए पन्ने पर)
   check-robot (fail = पन्ना नहीं): 12 पाठ · हर पाठ ≥3 उदाहरण · चमकने वाला शब्द उसी वाक्य में · उच्चारण में Latin नहीं ·
   नियम-वाक्य ≤24 शब्द · Grambank-दावा = Grambank-मान (हर दावा)। नई भाषा = LANGS में पंक्ति + data-फ़ाइल */
const fs=require("fs"),path=require("path");const ROOT=path.join(__dirname,"..");const VER="1.1";const LANGS=["en"];
const TPL=fs.readFileSync(path.join(ROOT,"_TEMPLATE.html"),"utf8");
function loadMenu(){const src=fs.readFileSync(path.join(ROOT,"assets","links.js"),"utf8");const box={};new Function("window",src+"; window.__L=(typeof ACS_LINKS!=='undefined')?ACS_LINKS:null;")(box);return box.__L.menu;}
const MENU_HTML=loadMenu().map(m=>'<a class="acs-mitem" href="'+m.href+'"><span class="e">'+m.icon+"</span> "+m.label+"</a>").join("\n");
const MENU_FALLBACK_JS='<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};}</scr'+'ipt>';
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const TM='© 2026 <b>Applied Computer School™</b> · <b>acslearn™</b> · acslearn.com';const LINE='FFGPMTrust के सौजन्य से ऑनलाइन शिक्षा निःशुल्क और प्रमाणपत्र सशुल्क';
const LP={A:"ए",B:"बी",C:"सी",D:"डी",E:"ई",F:"एफ़",G:"जी",H:"एच",I:"आइ",J:"जे",K:"के",L:"एल",M:"एम",N:"एन",O:"ओ",P:"पी",Q:"क्यू",R:"आर",S:"एस",T:"टी",U:"यू",V:"वी",W:"डब्ल्यू",X:"एक्स",Y:"वाइ",Z:"ज़ेड"};
function hlRe(h){return new RegExp("(?<![A-Za-z])("+reEsc(h)+")(?![A-Za-z])");}
function check(D){const E=[];if(D.lessons.length!==12)E.push("पाठ 12 नहीं: "+D.lessons.length);
  for(const g of D.lessons){if(g.ex.length<3)E.push("पाठ "+g.n+": 3 से कम उदाहरण");
    for(const x of g.ex){if(!hlRe(x.hl).test(x.en))E.push("पाठ "+g.n+" "+x.code+": '"+x.hl+"' वाक्य में नहीं");if(/[A-Za-z]/.test(x.p))E.push("पाठ "+g.n+" "+x.code+": उच्चारण में Latin");}
    for(const r of g.rule.concat([g.yaad]))if(r.split(/\s+/).length>24)E.push("पाठ "+g.n+": लंबा वाक्य");}
  for(const c of D.grambank.claims)if(c.claim!==c.grambank)E.push("Grambank बेमेल: "+c.gb+" दावा "+c.claim+" ≠ "+c.grambank);
  if(E.length)throw new Error("check-robot FAIL:\n  "+E.join("\n  "));}
function cnt(h,x){return h.split(x).length-1;}
/* आवरण — चित्र: Microsoft Fluent Emoji 3D (MIT), एकमात्र घर /assets/chitra/<कोड>.webp (चित्र-पुस्तक के साथ साझा) */
const COVER_IMG={sun:"1f31e",rain:"1f308",cloud:"2601",boy:"1f466",girl:"1f467",plane:"2708",dog:"1f415",cat:"1f408",globe:"1f30f",crayon:"1f58d"};
const COVER_ALT={sun:"मुस्कुराता सूरज",rain:"इंद्रधनुष",cloud:"बादल",boy:"लड़का",girl:"लड़की",plane:"हवाई जहाज़",dog:"पिल्ला",cat:"बिल्ली",globe:"दुनिया",crayon:"रंग-पेंसिल"};
function cImg(k,cls){return '<img class="'+cls+'" src="/assets/chitra/'+COVER_IMG[k]+'.webp" alt="'+COVER_ALT[k]+'" width="256" height="256" loading="eager">';}
function rainbowWord(w){const seg=new Intl.Segmenter("hi",{granularity:"grapheme"});const C=["#E53935","#FB8C00","#43A047","#1E88E5","#8E24AA"];return [...seg.segment(w)].map((x,i)=>'<span style="color:'+C[i%C.length]+'">'+esc(x.segment)+"</span>").join("");}
function coverHtml(D,L,bk){const cv=L.cover||{};
  return '<div class="vk-cover" role="img" aria-label="'+esc("आवरण — मेरा पहला व्याकरण, "+L.hi)+'">'+
   '<div class="vkc-top"><div class="vkc-brand"><img src="/logo.png" alt="ACS लोगो" onerror="this.replaceWith(document.createTextNode(\'ACS\'))"><div><b>Applied Computer School™</b><i>From Village to World</i></div></div>'+cImg("sun","vkc-sun")+'</div>'+
   '<div class="vkc-card"><div class="vkc-t1">मेरा पहला</div><div class="vkc-t2">'+rainbowWord("व्याकरण")+'</div>'+(cv.native_title?'<div class="vkc-t3">'+esc(cv.native_title)+'</div>':"")+
   '<div class="vkc-pill">'+esc(L.hi)+' व्याकरण — वर्ग 5 स्तर</div><div class="vkc-code">पुस्तक-कोड: '+bk+' · भाषा: '+L.code+' ('+esc(L.en)+') · धुरी: हिंदी</div></div>'+
   '<div class="vkc-scene">'+cImg("rain","vkc-rain")+cImg("cloud","vkc-cloud")+cImg("boy","vkc-boy")+cImg("girl","vkc-girl")+cImg("plane","vkc-plane")+
   '<div class="vkc-hill"></div><div class="vkc-book"><div class="vkc-pg"><span>'+(cv.book_words||[]).map(esc).join("<br>")+'</span></div><div class="vkc-pg">'+cImg("globe","vkc-globe")+'</div></div>'+
   cImg("dog","vkc-dog")+cImg("cat","vkc-cat")+'</div>'+
   '<div class="vkc-ground"><div class="vkc-tags"><span class="b">'+D.lessons.length+' पाठ</span><span class="o">सरल नियम</span><span class="g">असली वाक्य</span></div>'+
   '<div class="vkc-motto">'+cImg("crayon","vkc-crayon")+'<b>सीखें · पढ़ें · आगे बढ़ें</b><br>हर बच्चे के लिए, हर भाषा में</div></div>'+
   '<div class="vkc-foot">'+TM+'<br><b>'+LINE+'</b></div></div>';}
/* v1.1 पन्ना-robot (Founder 25-Oct: "नियम = robot नियम") — fail = पन्ना नहीं */
function checkPage(page,D,bk){const E=[],nEx=D.lessons.reduce((s,g)=>s+g.ex.length,0);
  if(cnt(page,'onclick="vkMic(this)"')!==nEx)E.push("🎙️ बटन "+cnt(page,'onclick="vkMic(this)"')+" ≠ उदाहरण "+nEx);
  if(cnt(page,"data-bolo-host")!==nEx)E.push("बोलो-host "+cnt(page,"data-bolo-host")+" ≠ "+nEx);
  if(cnt(page,'class="acs-raay"')!==1||cnt(page,'data-page="'+bk+'"')!==1)E.push("👍👎💬 राय-डिब्बा ठीक एक नहीं");
  if(page.indexOf('class="acs-raay"')<page.lastIndexOf('class="vk-info"'))E.push("राय-डिब्बा पन्ने के अंत में नहीं");
  for(const f of ["/assets/acs-bolo.js","/assets/acs-raay.js"])if(cnt(page,'src="'+f+'"')!==1)E.push(f+" ठीक एक बार नहीं");
  const body=page.slice(page.indexOf("<!-- PAGE-CONTENT-START -->"),page.indexOf("<!-- PAGE-CONTENT-END -->"));
  if(/[\[\]]/.test(body))E.push("चौकोर कोष्ठक मिला");
  const css=fs.readFileSync(path.join(ROOT,"assets","vyakaran.css"),"utf8"),pi=css.indexOf("@media print{"),pr=pi<0?"":css.slice(pi);
  for(const x of [".udy-float",".acs-wa",".tiranga-bar",".acs-freebar",".acs-raay",".acs-bolo",".vk-howto",".vk-les~.vk-les{break-before:page}"])if(pr.indexOf(x)<0)E.push("छपाई-नियम में नहीं: "+x);
  /* नियम-दर-नियम पढ़ो (चयनकर्ता-सूची + भीतर) — मोटा-मिलान झूठा FAIL देता था */
  const rules=[...pr.replace(/@media print\{/g,"").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>({sel:m[1].split(",").map(x=>x.trim()),body:m[2]}));
  if(rules.some(r=>r.sel.includes(".vk-toc")&&/display:none/.test(r.body)))E.push("छपाई में विषय-सूची छिपी है");
  if(rules.some(r=>r.sel.includes(".vk-les")&&/break-before:page/.test(r.body)))E.push("पाठ-1 पर भी नया पन्ना (पहला पन्ना ख़ाली होगा)");
  if(cnt(page,'class="vk-cover"')!==1)E.push("आवरण ठीक एक नहीं");
  for(const c of Object.values(COVER_IMG))if(!fs.existsSync(path.join(ROOT,"assets","chitra",c+".webp")))E.push("आवरण-चित्र नहीं मिला: /assets/chitra/"+c+".webp");
  if(pr.indexOf(".vk-cover{")<0||!/\.vk-cover\{[^}]*break-after:page/.test(pr))E.push("छपाई में आवरण के बाद नया पन्ना नहीं");
  if(E.length)throw new Error("पन्ना-robot FAIL:\n  "+E.join("\n  "));}
function lessonHtml(g){
  let h='<section class="vk-les" id="path-'+g.n+'"><div class="vk-hd"><div class="vk-no">'+g.n+'</div><div><h2>पाठ '+g.n+' · '+esc(g.t)+'</h2><div class="vk-q">'+esc(g.q)+'</div></div></div>';
  h+='<div class="vk-box vk-rule"><h3>📘 नियम</h3><ul>'+g.rule.map(r=>"<li>"+esc(r)+"</li>").join("")+"</ul>";
  if(g.alpha)h+='<div class="vk-alpha">'+Object.keys(LP).map(c=>'<div class="'+("AEIOU".includes(c)?"v":"")+'"><b>'+c+c.toLowerCase()+"</b><br>"+LP[c]+"</div>").join("")+"</div>";
  if(g.order){const [e,hh]=g.order;h+='<div class="vk-ord">अंग्रेज़ी: '+e.filter(Boolean).map((w,i)=>'<span class="vk-c'+(i+1)+'">'+esc(w)+"</span>").join("")+'</div><div class="vk-ord">हिंदी: '+hh.filter(Boolean).map((w,i)=>'<span class="vk-c'+(g.n===4?[1,3,2][i]:[2,1,3][i])+'">'+esc(w)+"</span>").join("")+"</div>";}
  h+='</div><div class="vk-box vk-ex"><h3>✍️ उदाहरण (कोर्स के असली वाक्य)</h3>'+g.ex.map(x=>'<div class="vk-er" data-bolo-host data-c="'+x.code+'" data-a="'+esc(x.en)+'" data-b="'+esc(x.hi)+'"><div><div class="vk-en">'+esc(x.en).replace(hlRe(esc(x.hl)),"<mark>$1</mark>")+'</div><div class="vk-pr">'+esc(x.p)+'</div><div class="vk-hi">'+esc(x.hi)+'</div></div><div class="vk-cd">'+x.code+'<br><button class="vk-spk" title="सुनें" onclick="vkPlay(this)">🔊</button><button class="vk-spk vk-mic" title="बोलो-अभ्यास" onclick="vkMic(this)">🎙️</button></div></div>').join("")+"</div>";
  h+='<div class="vk-box vk-yd"><h3>💡 याद रखो</h3>'+esc(g.yaad)+'</div><div class="vk-box vk-ab"><h3>📝 अभ्यास</h3>'+g.abhyas.map((a,i)=>"<div>"+(i+1)+". "+esc(a[0])+"</div>").join("")+'<div class="vk-ans">उत्तर: '+g.abhyas.map((a,i)=>(i+1)+". "+esc(a[1])).join(" · ")+"</div></div></section>";
  return h;}
function sayJs(L){return '<script>function vkSay(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=.8;var v=speechSynthesis.getVoices().filter(function(x){return x.lang.replace("_","-").indexOf(l.split("-")[0])===0;});if(v.length)u.voice=v[0];speechSynthesis.speak(u);}catch(e){}}function vkPlay(el){if(!("speechSynthesis" in window)){alert("इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है");return;}var r=el.closest(".vk-er");speechSynthesis.cancel();vkSay(r.dataset.a,"'+L.tts+'");vkSay(r.dataset.b,"hi-IN");}function vkMic(el){var r=el.closest(".vk-er");if(!window.ACSBolo){alert("बोलो-अभ्यास अभी लोड नहीं हुआ — पन्ना एक बार दोबारा खोलें");return;}ACSBolo.open(el,{t:r.dataset.a,code:r.dataset.c,asr:"'+(L.asr||L.tts)+'",tts:"'+L.tts+'",host:r});}</scr'+'ipt>';}
function build(code){const D=require(path.join(__dirname,"data","vyakaran","vyakaran_"+code+".js"));check(D);const L=D.lang,bk="ACS-VK1-"+L.code;
  let h='<div class="vk-wrap">'+coverHtml(D,L,bk);
  h+='<p style="text-align:center;margin:12px 0"><button class="vk-spk" style="width:auto;border-radius:24px;padding:8px 18px;font-size:18px" onclick="window.print()">🖨️ छापें / PDF</button></p><p class="vk-howto">🔊 दबाकर सुनिए, 🎙️ दबाकर वाक्य बोलिए। 🟢 हरा = सही · 🔴 लाल = ग़लत · ⚫ काला = छूटा। साथ में प्रतिशत और गति भी दिखेगी।</p><div class="vk-toc">'+D.lessons.map(g=>'<a href="#path-'+g.n+'">'+g.n+". "+esc(g.t)+"</a>").join("")+"</div>";
  h+=D.lessons.map(lessonHtml).join("");
  const ok=D.grambank.claims.length;
  h+='<div class="vk-info"><b>पुस्तक-सूचना</b><br>'+TM+'<br><b>'+LINE+'</b><br>मेरा पहला व्याकरण v'+D.version+' · पुस्तक-कोड: '+bk+'<br>उदाहरण: ACS master-वाक्य (वाक्य-कोड सहित) — कोई वाक्य नया गढ़ा नहीं गया · उच्चारण: ACS '+esc(L.hi)+' कोर्स<br>विश्व-मानक मिलान: '+ok+' व्याकरण-दावे Grambank (Max Planck Institute for Evolutionary Anthropology) से मशीन द्वारा मिलाए — '+ok+'/'+ok+' मेल<br>🟡 AI-मसौदा — भाषा संवर्धन समिति की समीक्षा का स्वागत<br>आवरण-चित्र: Microsoft Fluent Emoji (<a href="https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE" target="_blank" rel="noopener">MIT लाइसेंस</a>)</div>'+'<div class="acs-raay" data-page="'+bk+'" data-title="'+esc("मेरा पहला व्याकरण — "+L.hi)+'"></div></div>';
  const S="<!-- PAGE-CONTENT-START -->",E="<!-- PAGE-CONTENT-END -->",a=TPL.indexOf(S),b=TPL.indexOf(E);if(a<0||b<0)throw new Error("PAGE-CONTENT निशान नहीं");
  let page=TPL.slice(0,a+S.length)+"\n"+h+"\n"+TPL.slice(b);
  const title="मेरा पहला व्याकरण — "+L.hi+" (वर्ग 5, 12 पाठ, असली वाक्य, मुफ़्त) | अप्लाइड कंप्यूटर स्कूल",url="https://acslearn.com/courses/hi/bhasha/"+L.slug+"/vyakaran/";
  page=page.replace(/<title>[\s\S]*?<\/title>/,"<title>"+esc(title)+"</title>\n<meta name=\"description\" content=\""+esc(L.hi+" के 12 सबसे ज़रूरी व्याकरण-नियम सरल हिंदी में — हर नियम के साथ कोर्स के असली वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और 🔊 आवाज़।")+"\">\n<link rel=\"canonical\" href=\""+url+"\">");
  page=page.replace("</head>",'<link rel="stylesheet" href="/assets/vyakaran.css">\n</head>').replace('<div id="acsMenuList"></div>','<div id="acsMenuList">\n'+MENU_HTML+"\n</div>").replace("</body>",MENU_FALLBACK_JS+"\n"+sayJs(L)+'\n<script src="/assets/acs-bolo.js" defer></scr'+'ipt>\n<script src="/assets/acs-raay.js" defer></scr'+'ipt>\n</body>');
  page=page.replace("<!DOCTYPE html>","<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_vyakaran.js v"+VER+") — हाथ से न बदलें। स्रोत: _TEMPLATE.html + generator/data/vyakaran/vyakaran_"+code+".js -->");
  checkPage(page,D,bk);
  const dir=path.join(ROOT,"courses","hi","bhasha",L.slug,"vyakaran");fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,"index.html"),page);
  console.log("✅ "+code+": 12 पाठ · "+D.lessons.reduce((s,g)=>s+g.ex.length,0)+" उदाहरण · Grambank "+ok+"/"+ok);}
LANGS.forEach(build);
