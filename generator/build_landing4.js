/* ============================================================
   ACS build_landing4.js v1.1 (27-Oct-2026, Founder-आदेश) — 4 landing पेज
   /career.html · /bhasha.html · /hunar.html · /udyam-shuruat.html
   स्रोत: /_TEMPLATE.html (परत-2) + links.js menu (परत-1)।
   हर पेज: react-पट्टी (assets/acs-react.js) + आपसी cross-links।
   dynamic हिस्से (भाषा-गिनती/समूह, हुनर-सूची) courses_data.js से
   browser में — बैनर-संख्या कभी hardcode नहीं (झूठ-रोक)।
   check-robot: square-bracket नहीं · font<16px नहीं · react-slot अनिवार्य ·
   cross-links अनिवार्य। चलाना: node generator/build_landing4.js
   ============================================================ */
"use strict";
const fs=require("fs"), path=require("path");
const ROOT=path.join(__dirname,"..");
const TPL=fs.readFileSync(path.join(ROOT,"_TEMPLATE.html"),"utf8");
function loadMenu(){
  const src=fs.readFileSync(path.join(ROOT,"assets","links.js"),"utf8");
  const box={};
  new Function("window",src+"; window.__L=(typeof ACS_LINKS!=='undefined')?ACS_LINKS:null;")(box);
  if(!box.__L||!Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं");
  return box.__L.menu;
}
function loadCourseGlobals(){
  const src=fs.readFileSync(path.join(ROOT,"assets","courses_data.js"),"utf8");
  const box={};
  new Function("window",src+';window.__A=[].concat(typeof SELF_EMP_COURSES!=="undefined"?SELF_EMP_COURSES:[],typeof PRIVATE_JOB_COURSES!=="undefined"?PRIVATE_JOB_COURSES:[],typeof GOVT_JOB_COURSES!=="undefined"?GOVT_JOB_COURSES:[],typeof GOVT_SCHOLAR_COURSES!=="undefined"?GOVT_SCHOLAR_COURSES:[],typeof ACADEMIC_COURSES!=="undefined"?ACADEMIC_COURSES:[]);window.__G=(typeof window.KKB_GROUPS!=="undefined")?window.KKB_GROUPS:[];')(box);
  return {all:box.__A||[],groups:box.__G||[]};
}
const CD=loadCourseGlobals();
const BH_COUNT=CD.all.filter(c=>c&&c.url&&String(c.url).indexOf("/bhasha/")>-1).length;
if(!BH_COUNT) throw new Error("भाषा-गिनती 0 — courses_data जाँचो");
console.log("भाषा-गिनती (build-समय):",BH_COUNT,"| समूह:",CD.groups.length);
const MENU_HTML=loadMenu().map(m=>'<a class="acs-mitem" href="'+m.href+'"><span class="e">'+m.icon+'</span> '+m.label+'</a>').join("\n");
const MENU_FALLBACK_JS='<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr'+'ipt>';
const GEN_NOTE="<!-- generator: build_landing4.js v1.0 — हाथ से न बदलें -->";
let FAIL=0;
function check(name,c){
  if(/\[|\]/.test(c.replace(/<[^>]*>/g,""))){console.log("⛔",name,"square-bracket");FAIL++;}
  const m=c.match(/font-size:\s*(\d+)px/g)||[];
  m.forEach(x=>{const n=parseInt(x.replace(/\D/g,""));if(n<16){console.log("⛔",name,"font",n);FAIL++;}});
  if(c.indexOf('id="acsReactSlot"')<0){console.log("⛔",name,"react-slot नहीं");FAIL++;}
  if(c.indexOf('class="l4-cross"')<0){console.log("⛔",name,"cross-links नहीं");FAIL++;}
}
function build(spec){
  check(spec.out,spec.content);
  const S="<!-- PAGE-CONTENT-START -->",E="<!-- PAGE-CONTENT-END -->";
  const a=TPL.indexOf(S),b=TPL.indexOf(E);
  if(a<0||b<0) throw new Error("PAGE-CONTENT निशान नहीं");
  let p=TPL.slice(0,a+S.length)+"\n"+spec.content+"\n"+TPL.slice(b);
  p=p.replace(/<title>[\s\S]*?<\/title>/,
    "<title>"+spec.title+"</title>\n"+
    '<meta name="description" content="'+spec.desc+'">\n'+
    '<meta name="robots" content="index, follow">\n'+
    '<link rel="canonical" href="https://acslearn.com/'+spec.out+'">'+
    '\n<meta property="og:type" content="website">'+
    '\n<meta property="og:url" content="https://acslearn.com/'+spec.out+'">'+
    '\n<meta property="og:title" content="'+spec.title.replace(/"/g,"&quot;")+'">'+
    '\n<meta property="og:description" content="'+spec.desc.replace(/"/g,"&quot;")+'">'+
    '\n<meta property="og:image" content="https://acslearn.com/logo.png">'+
    '\n<meta property="og:locale" content="hi_IN">'+
    '\n<meta name="twitter:card" content="summary">'+
    '\n<script type="application/ld+json">'+JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":spec.title,"description":spec.desc,"url":"https://acslearn.com/"+spec.out,"inLanguage":"hi"})+'</scr'+'ipt>');
  p=p.replace('<div id="acsMenuList"></div>','<div id="acsMenuList">\n'+MENU_HTML+'\n</div>');
  p=p.replace("</body>",MENU_FALLBACK_JS+"\n"+(spec.foot||[]).join("\n")+'\n<script src="/assets/acs-react.js" defer></scr'+'ipt>\n</body>');
  p=p.replace("<!DOCTYPE html>","<!DOCTYPE html>\n"+GEN_NOTE);
  fs.writeFileSync(path.join(ROOT,spec.out),p,"utf8");
  console.log("✅ /"+spec.out);
}
/* ---- साझा टुकड़े ---- */
const WRAP_S='<div style="background:#F5F7FA;border-radius:16px;padding:18px 16px;margin:12px auto;max-width:860px;color:#0B1F3A">';
function h1(e,t){return '<h1 style="font-size:28px;text-align:center;margin:16px 0 6px;color:#F9A825">'+e+' '+t+'</h1>';}
function sec(t,body){return '<section style="margin:16px 0"><h2 style="font-size:22px;color:#0B1F3A;border-left:5px solid #F9A825;padding-left:10px">'+t+'</h2>'+body+'</section>';}
function P(t){return '<p style="font-size:19px;line-height:1.8;text-align:justify">'+t+'</p>';}
function CTA(href,txt,bg){return '<p style="text-align:center;margin:18px 0"><a href="'+href+'" style="display:inline-block;background:'+(bg||"#2E7D32")+';color:#fff;font-size:21px;font-weight:800;padding:14px 26px;border-radius:999px;text-decoration:none">'+txt+'</a></p>';}
function cross(items){
  return '<div class="l4-cross" style="text-align:center;margin:20px 0 8px"><p style="font-size:18px;font-weight:800;color:#F5F7FA">आगे और देखें:</p>'+
  items.map(i=>'<a href="'+i[0]+'" style="display:inline-block;margin:6px;background:#1565C0;color:#fff;font-size:17px;font-weight:700;padding:10px 16px;border-radius:999px;text-decoration:none">'+i[1]+'</a>').join("")+'</div>';
}
const SLOT='<div id="acsReactSlot"></div>';
/* तीन-कदम SVG (साझा सरल रेखा-चित्र) */
function stepSVG(a,b,c){
 return '<svg viewBox="0 0 700 150" role="img" style="width:100%;max-width:700px;display:block;margin:10px auto;background:#0B1F3A;border-radius:12px">'+
 '<g font-family="Noto Sans Devanagari,Inter" font-size="20" fill="#F5F7FA" text-anchor="middle">'+
 '<rect x="20" y="35" width="190" height="80" rx="12" fill="none" stroke="#F9A825" stroke-width="3"/><text x="115" y="82">'+a+'</text>'+
 '<path d="M215 75 h40" stroke="#F9A825" stroke-width="3"/><path d="M250 68 l12 7 -12 7z" fill="#F9A825"/>'+
 '<rect x="265" y="35" width="190" height="80" rx="12" fill="none" stroke="#2E7D32" stroke-width="3"/><text x="360" y="82">'+b+'</text>'+
 '<path d="M460 75 h40" stroke="#F9A825" stroke-width="3"/><path d="M495 68 l12 7 -12 7z" fill="#F9A825"/>'+
 '<rect x="510" y="35" width="170" height="80" rx="12" fill="#2E7D32"/><text x="595" y="82" font-weight="bold">'+c+'</text></g></svg>';
}
/* ================= पेज-1: करियर ================= */
build({out:"career.html",
 title:"अपना करियर चुनें — मुफ़्त अभिरुचि-टेस्ट (Career Aptitude Test) | ACS",
 desc:"24 क्षेत्र, 950+ उद्यम — मुफ़्त अभिरुचि-टेस्ट से जानिए आपका मन किस काम में लगेगा। सही/ग़लत कुछ नहीं, बस अपनी पसंद बताइए। हिंदी में, अपने फ़ोन पर।",
 content:
 h1("🧭","अपना करियर चुनें")+WRAP_S+
 P('<b>सबसे बड़ा सवाल:</b> "मैं क्या बनूँ?" — इसका जवाब कोई और नहीं दे सकता। जवाब आपके अपने मन में है। ACS का <b>अभिरुचि-टेस्ट (Aptitude Test)</b> वही जवाब बाहर निकालता है।')+
 stepSVG("सवालों के जवाब दो","मन की रुचि नापो","अपनी राह पाओ")+
 sec("❓ यह टेस्ट क्या है?",
  P('यह ज्ञान की परीक्षा <b>नहीं</b> है। इसमें कोई जवाब सही या ग़लत नहीं होता। आपसे रोज़ की ज़िंदगी के सवाल पूछे जाते हैं — घर, खेत, बाज़ार, मोबाइल, खेल। आप बस बताइए क्या पसंद है, क्या नहीं।')+
  P('पीछे का विज्ञान: दुनिया-भर में माना गया RIASEC रुचि-विज्ञान (1959) — उस पर आधारित। आपके जवाबों से मशीन 24 क्षेत्रों में आपकी रुचि नापती है।'))+
 sec("🎁 क्या मिलेगा?",
  P('• आपके <b>सबसे मज़बूत 4 क्षेत्र</b> — घटते क्रम में पूरे 24 क्षेत्रों के अंक।<br>• उन क्षेत्रों से जुड़े <b>कोर्स और 950+ उद्यमों</b> की सीधी राह।<br>• चाहें तो ₹125 में छपने लायक़ <b>अभिरुचि-रिपोर्ट</b> (प्रमाणपत्र-रूप, QR-जाँच सहित) — मर्ज़ी हो तो लें, न लें तो भी टेस्ट व नतीजा मुफ़्त।')) +
 sec("⏱️ कितना समय? कौन दे सकता है?",
  P('मुफ़्त झलक: 24 सवाल, 10-12 मिनट — बिना login, अभी। पूरा टेस्ट: 120 सवाल, 90 मिनट (बीच में कहानी-विराम) — 10 साल से ऊपर कोई भी। गाँव का बच्चा हो या बड़ी उम्र का कामगार — भाषा कक्षा-6 जैसी सरल।'))+
 sec("🛡️ भरोसा",
  P('आपके जवाब आपके फ़ोन में रहते हैं। नतीजा दिशा दिखाता है — फ़ैसला हमेशा आपका। "100 प्रतिशत गारंटी" जैसे झूठे दावे ACS कभी नहीं करता।'))+
 CTA("/aptitude-test.html","🧭 मुफ़्त टेस्ट अभी शुरू करें →")+
 '</div>'+SLOT+
 cross([["/bhasha.html","🗣️ नई भाषा सीखें"],["/hunar.html","🛠️ नया हुनर सीखें"],["/udyam-shuruat.html","🏭 अपना उद्यम शुरू करें"]])
});
/* ================= पेज-2: भाषा ================= */
build({out:"bhasha.html",
 title:"नई भाषा सीखें — हिंदी से दुनिया की भाषाएँ, प्रमाणपत्र कोर्स | ACS",
 desc:"हिंदी-माध्यम से दुनिया की भाषाओं के पूरे प्रमाणपत्र कोर्स — 90 दिन, 2,150 वाक्य, ऑनलाइन परीक्षा। पढ़ाई मुफ़्त। समूह चुनिए और आज शुरू कीजिए।",
 foot:['<script src="/assets/courses_data.js"></scr'+'ipt>','<script>(function(){try{var A=[].concat(typeof SELF_EMP_COURSES!=="undefined"?SELF_EMP_COURSES:[],typeof PRIVATE_JOB_COURSES!=="undefined"?PRIVATE_JOB_COURSES:[],typeof GOVT_JOB_COURSES!=="undefined"?GOVT_JOB_COURSES:[],typeof GOVT_SCHOLAR_COURSES!=="undefined"?GOVT_SCHOLAR_COURSES:[],typeof ACADEMIC_COURSES!=="undefined"?ACADEMIC_COURSES:[]);var n=A.filter(function(c){return c&&c.url&&String(c.url).indexOf("/bhasha/")>-1;}).length;var el=document.getElementById("bhCount");if(el&&n)el.textContent=n;var G=window.KKB_GROUPS||[];var box=document.getElementById("bhGroups");if(box&&G.length){var h="";G.forEach(function(g,i){h+=\'<a href="/courses/hi/#g\'+i+\'" style="display:inline-block;margin:5px;background:#fff;color:#0B1F3A;border:2px solid #0B1F3A;font-size:17px;font-weight:700;padding:9px 14px;border-radius:999px;text-decoration:none">\'+g.e+" "+g.t+" ("+(g.ids||[]).length+")</a>";});box.innerHTML=h;}}catch(e){}})();</scr'+'ipt>'],
 content:
 h1("🗣️","नई भाषा सीखें")+
 '<div style="background:#F9A825;color:#0B1F3A;border-radius:16px;padding:20px 14px;margin:10px auto;max-width:860px;text-align:center">'+
 '<p style="font-size:30px;font-weight:900;margin:0"><span id="bhCount">'+BH_COUNT+'</span> भाषाओं में प्रमाणपत्र कोर्स</p>'+
 '<p style="font-size:19px;font-weight:700;margin:6px 0 0">हर भाषा का पूरा कोर्स — 90 दिन · 2,150 वाक्य · ऑनलाइन परीक्षा · पढ़ाई मुफ़्त</p></div>'+
 WRAP_S+
 sec("🌍 अपना समूह चुनिए",'<div id="bhGroups" style="text-align:center">'+
  '<p style="font-size:17px">समूह-सूची खुल रही है…</p></div>'+
  CTA("/courses/hi/","📚 सभी भाषाओं की पूरी सूची →","#1565C0"))+
 sec("👤 किसे सीखना चाहिए?",
  P('जो <b>विदेश में काम</b> करना चाहते हैं (खाड़ी देश, जापान, कोरिया, यूरोप…) · जो <b>अपने ही देश में</b> पर्यटक-ग्राहक से ज़्यादा कमाना चाहते हैं · जो विद्यार्थी आगे पढ़ाई बाहर करना चाहते हैं। सफलता का सूत्र: <b>1 हुनर + 1 ग़ैर-देवनागरी भाषा</b> = देश-विदेश में जॉब की संभावना कई गुना।'))+
 sec("📖 कैसे सिखाते हैं?",
  P('हर भाषा तीन पंक्तियों में: असली भाषा अपनी लिपि में → देवनागरी-उच्चारण → हिंदी अर्थ। रोज़ के काम के वाक्य — बाज़ार, काम, सफ़र, फ़ोन। हर पंक्ति पर 🔊 सुनो-बटन। 90 दिन का रास्ता, रोज़ ~25 वाक्य। अंत में ऑनलाइन परीक्षा और CEFR-A2 पर आधारित प्रमाणपत्र।'))+
 sec("⏱️ समय व ख़र्च",
  P('पढ़ाई पूरी <b>मुफ़्त</b>, बिना login। अपनी गति से — 90 दिन का ढाँचा है, पर जल्दी या धीरे, आपकी मर्ज़ी। प्रमाणपत्र-परीक्षा का रास्ता dashboard से।'))+
 '</div>'+SLOT+
 cross([["/career.html","🧭 अपना करियर चुनें"],["/hunar.html","🛠️ नया हुनर सीखें"],["/udyam-shuruat.html","🏭 अपना उद्यम शुरू करें"]])
});
/* ================= पेज-3: हुनर ================= */
build({out:"hunar.html",
 title:"नया हुनर सीखें — मुफ़्त हुनर-कोर्स, परीक्षा व प्रमाणपत्र | ACS",
 desc:"वेल्डिंग से Python तक — पूरे हुनर-कोर्स हिंदी में: पाठ, चित्र, वीडियो, quiz, ऑनलाइन परीक्षा और प्रमाणपत्र। पढ़ाई मुफ़्त, अपने फ़ोन पर।",
 foot:['<script src="/assets/courses_data.js"></scr'+'ipt>','<script>(function(){try{var A=[].concat(typeof SELF_EMP_COURSES!=="undefined"?SELF_EMP_COURSES:[],typeof PRIVATE_JOB_COURSES!=="undefined"?PRIVATE_JOB_COURSES:[],typeof GOVT_JOB_COURSES!=="undefined"?GOVT_JOB_COURSES:[],typeof GOVT_SCHOLAR_COURSES!=="undefined"?GOVT_SCHOLAR_COURSES:[],typeof ACADEMIC_COURSES!=="undefined"?ACADEMIC_COURSES:[]);var seen={},R=[];A.forEach(function(c){if(!c||!c.url)return;var u=String(c.url);if(u.indexOf("/bhasha/")>-1||u.indexOf("/courses/")!==0)return;if(seen[u])return;seen[u]=1;R.push(c);});var box=document.getElementById("hnList");if(box&&R.length){var h="";R.forEach(function(c){var nm=(c.t2&&c.t2[0])?c.t2[0]:(c.name_hi||"");h+=\'<a href="\'+c.url+\'" style="display:block;margin:8px auto;max-width:620px;background:#fff;color:#0B1F3A;border:2px solid #0B1F3A;border-radius:12px;padding:12px 14px;text-decoration:none;font-size:18px;font-weight:700">\'+nm+\' <span style="color:#2E7D32;font-size:16px">(\'+(c.lessons||"")+\' पाठ · मुफ़्त)</span></a>\';});box.innerHTML=h;}}catch(e){}})();</scr'+'ipt>'],
 content:
 h1("🛠️","नया हुनर सीखें")+WRAP_S+
 P('<b>डिग्री नौकरी नहीं देती — हुनर देता है।</b> हाथ का हुनर वह पूँजी है जो न चोरी होती है, न पुरानी पड़ती है। गाँव में रहो या विदेश जाओ — हुनरमंद आदमी कभी ख़ाली नहीं बैठता।')+
 stepSVG("मुफ़्त पढ़ो","परीक्षा दो","प्रमाणपत्र पाओ")+
 sec("🎁 हर कोर्स में क्या मिलेगा?",
  P('• सरल हिंदी में सैकड़ों <b>चित्रमय पाठ</b> — कक्षा-6 जैसी भाषा।<br>• हर पाठ पर रेखा-चित्र, वीडियो-राह और <b>quiz (क्विज़)</b>।<br>• अंत में <b>ऑनलाइन परीक्षा</b> (120 सवाल) और पास होने पर प्रमाणपत्र — QR से दुनिया में कहीं भी जाँच।<br>• पढ़ाई <b>पूरी मुफ़्त</b>, बिना login, अपने फ़ोन पर — रात में भी, खेत से भी।'))+
 sec("👤 किसे करना चाहिए?",
  P('10 साल से ऊपर कोई भी — स्कूल का बच्चा, काम खोजता जवान, या अपनी दुकान/उद्यम का सपना देखने वाला। हर कोर्स की सीढ़ी प्रशिक्षु से मालिक तक जाती है।'))+
 sec("✅ तैयार हुनर-कोर्स — अभी शुरू करें",
  '<div id="hnList"><p style="font-size:17px;text-align:center">सूची खुल रही है…</p></div>'+
  CTA("/courses/hi/","🛠️ सभी कोर्स-टैब देखें →","#1565C0"))+
 sec("🎓 आगे की राह",
  P('एकेडमिक पढ़ाई (वर्ग 6 से आगे) और सरकारी/प्राइवेट नौकरी की तैयारी भी उसी कोर्स-पेज के टैबों में है — ऊपर वाले बटन से।'))+
 '</div>'+SLOT+
 cross([["/career.html","🧭 अपना करियर चुनें"],["/bhasha.html","🗣️ नई भाषा सीखें"],["/udyam-shuruat.html","🏭 अपना उद्यम शुरू करें"]])
});
/* ================= पेज-4: उद्यम ================= */
build({out:"udyam-shuruat.html",
 title:"अपना उद्यम शुरू करें — 950+ उद्यमों की पूरी जानकारी, मुफ़्त | ACS",
 desc:"950+ उद्यमों की सूची, लागत-सीढ़ी L1 से L15, कोर्स, project report और Tour — अपना काम शुरू करने की पूरी राह, सरल हिंदी में, मुफ़्त।",
 content:
 h1("🏭","अपना उद्यम शुरू करें")+WRAP_S+
 P('<b>नौकरी माँगने वाला नहीं — नौकरी देने वाला बनो।</b> अगर आपके मन में कभी भी यह सपना आया है कि अपना काम हो, अपनी कमाई हो — तो यही वह पेज है जिसकी तलाश आपको थी। यहाँ सपने से शुरुआत तक की <b>पूरी राह</b> एक जगह है।')+
 stepSVG("उद्यम चुनो","सीखो व देखो","शुरू करो")+
 sec("1️⃣ पहले चुनो — 950+ उद्यमों की सूची",
  P('खेती से रोबोटिक्स तक, 24 समूहों में 950 से ज़्यादा उद्यम — हर एक का परिचय-पेज: बाज़ार, कमाई-सीढ़ी, बड़े नाम, सरकारी योजनाएँ, सफलता-सूत्र।')+
  CTA("/udyam/","🌍 950+ उद्यम सूची खोलें →","#1565C0")+
  P('किधर जाना है समझ न आए? पहले <a href="/career.html" style="color:#1565C0;font-weight:700">अभिरुचि-टेस्ट</a> दो — मन की रुचि ख़ुद रास्ता दिखाएगी।'))+
 sec("2️⃣ फिर सीखो — मुफ़्त कोर्स",
  P('चुने उद्यम का हुनर-कोर्स मुफ़्त पढ़ो — पाठ, चित्र, परीक्षा, प्रमाणपत्र। हर बड़े कोर्स के अंत में <b>bank-ready project report</b> बनाने का module — जो काग़ज़ बैंक माँगता है, वही।')+
  CTA("/courses/hi/","📚 कोर्स देखें →","#1565C0"))+
 sec("3️⃣ फिर देखो — पैसा कितना, मदद कहाँ",
  P('हर उद्यम पर लागत-सीढ़ी <b>L1 (₹0 से) — L15 (₹200 करोड़)</b> तक: छोटे से शुरू करके बड़ा बनने का नक़्शा। आगे चलकर औद्योगिक Tour, सत्यापित विक्रेता और वित्त-संस्थाओं से जोड़ने वाला पुल — सब इसी मंच पर। ACS ख़ुद बैंक नहीं — सिर्फ़ सही दरवाज़े तक पहुँचाने वाला पुल।'))+
 sec("4️⃣ साथ कौन?",
  P('रजिस्ट्रेशन मुफ़्त है — Learner बनकर जुड़ो, आगे की सेवाएँ (सलाहकार, केंद्र, workshop) ज़रूरत पर।')+
  CTA("/join.html","📝 मुफ़्त रजिस्ट्रेशन करें →"))+
 '</div>'+SLOT+
 cross([["/career.html","🧭 अपना करियर चुनें"],["/bhasha.html","🗣️ नई भाषा सीखें"],["/hunar.html","🛠️ नया हुनर सीखें"]])
});
console.log(FAIL===0?"🏁 build_landing4 — 4 पेज, check पास":"⛔ FAIL="+FAIL);
process.exit(FAIL===0?0:1);
