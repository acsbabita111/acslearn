/* build_vyakaran.js v1.0 · 24-Oct-2026 — "मेरा पहला व्याकरण" (ACS-VK1) generator · परत-4
   स्रोत: root _TEMPLATE.html + generator/data/vyakaran/vyakaran_<code>.js (उदाहरण = master-वाक्य, कोड सहित)
   निकास: /courses/hi/bhasha/<slug>/vyakaran/index.html — 12 पाठ, 🔊, छपाई-योग्य (हर पाठ नए पन्ने पर)
   check-robot (fail = पन्ना नहीं): 12 पाठ · हर पाठ ≥3 उदाहरण · चमकने वाला शब्द उसी वाक्य में · उच्चारण में Latin नहीं ·
   नियम-वाक्य ≤24 शब्द · Grambank-दावा = Grambank-मान (हर दावा)। नई भाषा = LANGS में पंक्ति + data-फ़ाइल */
const fs=require("fs"),path=require("path");const ROOT=path.join(__dirname,"..");const VER="1.0";const LANGS=["en"];
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
function lessonHtml(g){
  let h='<section class="vk-les" id="path-'+g.n+'"><div class="vk-hd"><div class="vk-no">'+g.n+'</div><div><h2>पाठ '+g.n+' · '+esc(g.t)+'</h2><div class="vk-q">'+esc(g.q)+'</div></div></div>';
  h+='<div class="vk-box vk-rule"><h3>📘 नियम</h3><ul>'+g.rule.map(r=>"<li>"+esc(r)+"</li>").join("")+"</ul>";
  if(g.alpha)h+='<div class="vk-alpha">'+Object.keys(LP).map(c=>'<div class="'+("AEIOU".includes(c)?"v":"")+'"><b>'+c+c.toLowerCase()+"</b><br>"+LP[c]+"</div>").join("")+"</div>";
  if(g.order){const [e,hh]=g.order;h+='<div class="vk-ord">अंग्रेज़ी: '+e.filter(Boolean).map((w,i)=>'<span class="vk-c'+(i+1)+'">'+esc(w)+"</span>").join("")+'</div><div class="vk-ord">हिंदी: '+hh.filter(Boolean).map((w,i)=>'<span class="vk-c'+(g.n===4?[1,3,2][i]:[2,1,3][i])+'">'+esc(w)+"</span>").join("")+"</div>";}
  h+='</div><div class="vk-box vk-ex"><h3>✍️ उदाहरण (कोर्स के असली वाक्य)</h3>'+g.ex.map(x=>'<div class="vk-er" data-a="'+esc(x.en)+'" data-b="'+esc(x.hi)+'"><div><div class="vk-en">'+esc(x.en).replace(hlRe(esc(x.hl)),"<mark>$1</mark>")+'</div><div class="vk-pr">'+esc(x.p)+'</div><div class="vk-hi">'+esc(x.hi)+'</div></div><div class="vk-cd">'+x.code+'<br><button class="vk-spk" title="सुनें" onclick="vkPlay(this)">🔊</button></div></div>').join("")+"</div>";
  h+='<div class="vk-box vk-yd"><h3>💡 याद रखो</h3>'+esc(g.yaad)+'</div><div class="vk-box vk-ab"><h3>📝 अभ्यास</h3>'+g.abhyas.map((a,i)=>"<div>"+(i+1)+". "+esc(a[0])+"</div>").join("")+'<div class="vk-ans">उत्तर: '+g.abhyas.map((a,i)=>(i+1)+". "+esc(a[1])).join(" · ")+"</div></div></section>";
  return h;}
const SAYJS='<script>function vkSay(t,l){try{var u=new SpeechSynthesisUtterance(t);u.lang=l;u.rate=.8;var v=speechSynthesis.getVoices().filter(function(x){return x.lang.replace("_","-").indexOf(l.split("-")[0])===0;});if(v.length)u.voice=v[0];speechSynthesis.speak(u);}catch(e){}}function vkPlay(el){if(!("speechSynthesis" in window)){alert("इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है");return;}var r=el.closest(".vk-er");speechSynthesis.cancel();vkSay(r.dataset.a,"en-US");vkSay(r.dataset.b,"hi-IN");}</scr'+'ipt>';
function build(code){const D=require(path.join(__dirname,"data","vyakaran","vyakaran_"+code+".js"));check(D);const L=D.lang,bk="ACS-VK1-"+L.code;
  let h='<div class="vk-wrap"><div class="vk-hero"><div class="vk-code">'+bk+' · भाषा: '+L.code+' ('+esc(L.en)+') · धुरी: हिंदी</div><h1>मेरा पहला <span class="gold">व्याकरण</span></h1><div style="font-size:20px">'+esc(L.hi)+' · वर्ग 5 स्तर · 12 पाठ · हर उदाहरण पर 🔊</div></div>';
  h+='<p style="text-align:center;margin:12px 0"><button class="vk-spk" style="width:auto;border-radius:24px;padding:8px 18px;font-size:18px" onclick="window.print()">🖨️ छापें / PDF</button></p><div class="vk-toc">'+D.lessons.map(g=>'<a href="#path-'+g.n+'">'+g.n+". "+esc(g.t)+"</a>").join("")+"</div>";
  h+=D.lessons.map(lessonHtml).join("");
  const ok=D.grambank.claims.length;
  h+='<div class="vk-info"><b>पुस्तक-सूचना</b><br>'+TM+'<br><b>'+LINE+'</b><br>मेरा पहला व्याकरण v'+D.version+' · पुस्तक-कोड: '+bk+'<br>उदाहरण: ACS master-वाक्य (वाक्य-कोड सहित) — कोई वाक्य नया गढ़ा नहीं गया · उच्चारण: ACS '+esc(L.hi)+' कोर्स<br>विश्व-मानक मिलान: '+ok+' व्याकरण-दावे Grambank (Max Planck Institute for Evolutionary Anthropology) से मशीन द्वारा मिलाए — '+ok+'/'+ok+' मेल<br>🟡 AI-मसौदा — भाषा संवर्धन समिति की समीक्षा का स्वागत</div></div>';
  const S="<!-- PAGE-CONTENT-START -->",E="<!-- PAGE-CONTENT-END -->",a=TPL.indexOf(S),b=TPL.indexOf(E);if(a<0||b<0)throw new Error("PAGE-CONTENT निशान नहीं");
  let page=TPL.slice(0,a+S.length)+"\n"+h+"\n"+TPL.slice(b);
  const title="मेरा पहला व्याकरण — "+L.hi+" (वर्ग 5, 12 पाठ, असली वाक्य, मुफ़्त) | अप्लाइड कंप्यूटर स्कूल",url="https://acslearn.com/courses/hi/bhasha/"+L.slug+"/vyakaran/";
  page=page.replace(/<title>[\s\S]*?<\/title>/,"<title>"+esc(title)+"</title>\n<meta name=\"description\" content=\""+esc(L.hi+" के 12 सबसे ज़रूरी व्याकरण-नियम सरल हिंदी में — हर नियम के साथ कोर्स के असली वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और 🔊 आवाज़।")+"\">\n<link rel=\"canonical\" href=\""+url+"\">");
  page=page.replace("</head>",'<link rel="stylesheet" href="/assets/vyakaran.css">\n</head>').replace('<div id="acsMenuList"></div>','<div id="acsMenuList">\n'+MENU_HTML+"\n</div>").replace("</body>",MENU_FALLBACK_JS+"\n"+SAYJS+"\n</body>");
  page=page.replace("<!DOCTYPE html>","<!DOCTYPE html>\n<!-- ⚠️ generator से बना (build_vyakaran.js v"+VER+") — हाथ से न बदलें। स्रोत: _TEMPLATE.html + generator/data/vyakaran/vyakaran_"+code+".js -->");
  const dir=path.join(ROOT,"courses","hi","bhasha",L.slug,"vyakaran");fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,"index.html"),page);
  console.log("✅ "+code+": 12 पाठ · "+D.lessons.reduce((s,g)=>s+g.ex.length,0)+" उदाहरण · Grambank "+ok+"/"+ok);}
LANGS.forEach(build);
