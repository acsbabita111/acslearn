/* ============================================================
   ACS build_landing4.js v1.1 (27-Oct-2026, Founder-आदेश) — 4 landing पेज
   v1.2 (08-Nov-2026, Founder-आदेश): career.html पूरा पेशेवर रूप : hero-SVG ·
   6-फ़ायदे · दुनिया के 5 टेस्ट की दाम-तुलना (वेब-जाँच, नवंबर 2026) · ACS फीस-हिसाब
   4 कार्ड (0/100/300/125, असली कड़ियों सहित) · नतीजा-नमूना SVG · 125-रिपोर्ट नमूना SVG।
   बाक़ी 3 पेज byte-अछूते।
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
 '<svg viewBox="0 0 1000 430" role="img" aria-label="गाँव से दुनिया तक: अभिरुचि-टेस्ट" style="width:100%;max-width:1000px;display:block;margin:4px auto 10px;background:#0B1F3A;border-radius:18px">'+'<defs><linearGradient id="cgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1F3A"/><stop offset="1" stop-color="#1565C0"/></linearGradient></defs>'+'<rect width="1000" height="430" fill="url(#cgSky)"/>'+'<circle cx="870" cy="80" r="34" fill="#F9A825"/>'+'<path d="M0 340 Q 250 300 500 335 T 1000 330 L1000 430 L0 430 Z" fill="#2E7D32"/>'+'<path d="M60 345 C 260 300, 520 330, 940 305" fill="none" stroke="#F9A825" stroke-width="7" stroke-dasharray="2 16" stroke-linecap="round"/>'+'<g stroke="#F5F7FA" stroke-width="5" fill="none" stroke-linecap="round">'+'<rect x="58" y="300" width="74" height="52" rx="4"/><path d="M50 302 L95 268 L140 302"/>'+'<circle cx="205" cy="292" r="13"/><path d="M205 305 v34 M205 318 l-17 13 M205 318 l17 11 M205 339 l-13 22 M205 339 l13 22"/>'+'<circle cx="255" cy="296" r="13"/><path d="M255 309 v30 M255 320 l-16 12 M255 320 l18 8 M248 339 l-8 24 M262 339 l8 24 M243 312 h24 v16 h-24 z"/>'+'</g>'+'<g transform="translate(500,185)"><circle r="92" fill="#0B1F3A" stroke="#F9A825" stroke-width="6"/><circle r="70" fill="none" stroke="#F5F7FA" stroke-width="2" opacity=".55"/>'+'<g font-family="Noto Sans Devanagari,Inter" font-size="18" fill="#F5F7FA" text-anchor="middle"><text y="-74">उ</text><text y="86">द</text><text x="-80" y="6">प</text><text x="80" y="6">पू</text></g>'+'<path d="M0 0 L34 -52" stroke="#F9A825" stroke-width="8" stroke-linecap="round"/><path d="M0 0 L-24 38" stroke="#F5F7FA" stroke-width="8" stroke-linecap="round"/><circle r="11" fill="#F9A825"/></g>'+'<g stroke="#F5F7FA" stroke-width="5" fill="none"><circle cx="880" cy="250" r="44"/><path d="M836 250 h88 M880 206 c-26 26 -26 62 0 88 M880 206 c26 26 26 62 0 88"/></g>'+'<g font-family="Noto Sans Devanagari,Inter" text-anchor="middle" fill="#F5F7FA">'+'<text x="500" y="46" font-size="34" font-weight="bold" fill="#F9A825">मन की रुचि नापो, अपनी राह पाओ</text>'+'<text x="500" y="396" font-size="22">24 क्षेत्र · 950 से ज़्यादा उद्यम · हिंदी में, अपने फ़ोन पर</text>'+'<text x="95" y="392" font-size="18">गाँव</text><text x="880" y="325" font-size="18">दुनिया</text></g></svg>'+
 h1("🧭","अपना करियर चुनें")+WRAP_S+
 P('<b>सबसे बड़ा सवाल:</b> "मैं क्या बनूँ?" इसका जवाब कोई और नहीं दे सकता। जवाब आपके अपने मन में है। ACS का <b>अभिरुचि-टेस्ट (Aptitude Test)</b> वही जवाब बाहर निकालता है।')+
 stepSVG("सवालों के जवाब दो","मन की रुचि नापो","अपनी राह पाओ")+
 sec("❓ यह टेस्ट क्या है?",
  P('यह ज्ञान की परीक्षा <b>नहीं</b> है। कोई जवाब सही या ग़लत नहीं होता। सवाल रोज़ की ज़िंदगी से आते हैं: घर, खेत, बाज़ार, मोबाइल, खेल। आप बस बताइए क्या पसंद है, क्या नहीं।')+
  P('पीछे का विज्ञान: दुनिया-भर में माना गया RIASEC रुचि-विज्ञान, सन 1959 से। उसी पर आधारित मशीन आपके जवाबों से 24 क्षेत्रों में रुचि नापती है।'))+
 sec("🎁 इस टेस्ट के 6 बड़े फ़ायदे",'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">'+[['🧭','दिशा साफ़','सबसे मज़बूत 4 क्षेत्र, पूरे 24 क्षेत्रों के अंक घटते क्रम में।'],['🌍','आगे की सीधी राह','हर क्षेत्र से जुड़े कोर्स और 950 से ज़्यादा उद्यमों की कड़ी, नतीजे के साथ।'],['🔍','अनजान क्षेत्र भी दिखें','जिन कामों को आप जानते ही नहीं, टेस्ट वे भी सामने लाता है।'],['🗣️','भाषा बिल्कुल सरल','सवाल रोज़ की ज़िंदगी से, कक्षा-6 जैसी हिंदी में। 10 साल से ऊपर कोई भी।'],['📱','आपकी निजता','जवाब आपके फ़ोन में रहते हैं। बिना login झलक, कोई ज़बरदस्ती नहीं।'],['🛡️','झूठे वादे नहीं','नतीजा दिशा दिखाता है, क़िस्मत नहीं लिखता। फ़ैसला हमेशा आपका।']].map(function(c){return '<div style="background:#fff;border:2px solid #0B1F3A;border-radius:14px;padding:12px"><p style="font-size:20px;font-weight:800;margin:0">'+c[0]+' '+c[1]+'</p><p style="font-size:17px;line-height:1.6;margin:6px 0 0">'+c[2]+'</p></div>';}).join('')+'</div>')+
 sec("🌍 दुनिया के जाने-माने टेस्ट: दाम की तुलना",P('नीचे दुनिया और भारत के जाने-माने अभिरुचि-टेस्ट हैं। आप इन्हें भी देख सकते हैं। तुलना से साफ़ दिखेगा कि ACS का रास्ता कितना सस्ता है।')+'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px">'+'<tr style="background:#0B1F3A;color:#fff"><th style="font-size:17px;padding:10px 8px;text-align:left">टेस्ट</th><th style="font-size:17px;padding:10px 8px;text-align:left">कहाँ का</th><th style="font-size:17px;padding:10px 8px;text-align:left">दाम</th><th style="font-size:17px;padding:10px 8px;text-align:left">कड़ी</th></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">O*NET Interest Profiler (ओ-नेट)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिकी सरकार</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">मुफ़्त, अंग्रेज़ी में</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.mynextmove.org/explore/ip" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Truity Career Profiler (ट्रुइटी)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिका</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">झलक मुफ़्त; पूरी रिपोर्ट 29 डॉलर, यानी ढाई हज़ार रुपये के आसपास</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.truity.com/test/career-surveyor" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Self-Directed Search (होलैंड का अपना SDS)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिका</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">एक बार का दाम 18.95 डॉलर, यानी डेढ़ हज़ार रुपये से ऊपर</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://self-directed-search.com/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">123test career test (123-टेस्ट)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">यूरोप</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">छोटा टेस्ट मुफ़्त, अंग्रेज़ी में; बड़ी रिपोर्ट paid</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.123test.com/career-test/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Mindler (माइंडलर)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">भारत</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">1,499 रुपये से शुरू; counsellor-पैकेज और महँगे</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.mindler.com/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr style="background:#2E7D32;color:#fff"><td style="font-size:18px;padding:12px 8px;font-weight:900">ACS अभिरुचि-टेस्ट</td><td style="font-size:17px;padding:12px 8px">भारत, हिंदी में</td><td style="font-size:18px;padding:12px 8px;font-weight:900">झलक और नतीजा मुफ़्त; पूरा टेस्ट 100 रुपये; छपने लायक़ रिपोर्ट 125 रुपये</td><td style="font-size:17px;padding:12px 8px"><a href="/aptitude-test.html" style="color:#fff;font-weight:900">यही पेज ↓</a></td></tr></table></div>'+'<p style="font-size:16px;opacity:.85;margin:8px 0 0">जानकारी नवंबर 2026 की है। दाम बदलते रहते हैं, हर site पर ख़ुद जाँच लें। ये बाहरी site हैं, इनकी सेवा के ज़िम्मेदार वे ख़ुद हैं। विदेशी दाम डॉलर में हैं।</p>')+
 sec("₹ ACS की फीस: पूरा हिसाब, कुछ छिपा नहीं",'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px">'+'<div style="background:#fff;border:3px solid #1565C0;border-radius:16px;padding:14px;display:flex;flex-direction:column">'+'<p style="font-size:26px;font-weight:900;margin:0;color:#1565C0">🆓 0 रुपये</p>'+'<p style="font-size:19px;font-weight:800;margin:4px 0">मुफ़्त झलक</p>'+'<p style="font-size:17px;line-height:1.6;margin:0 0 10px;flex:1">24 सवाल, 10 से 12 मिनट। बिना login, बिना रजिस्ट्रेशन। नतीजा भी मुफ़्त दिखता है।</p>'+'<a href="/aptitude-test.html" style="display:block;text-align:center;background:#1565C0;color:#fff;font-size:18px;font-weight:800;padding:11px 10px;border-radius:999px;text-decoration:none">मुफ़्त टेस्ट शुरू करें →</a></div>'+'<div style="background:#fff;border:3px solid #F9A825;border-radius:16px;padding:14px;display:flex;flex-direction:column">'+'<p style="font-size:26px;font-weight:900;margin:0;color:#F9A825">🎫 100 रुपये</p>'+'<p style="font-size:19px;font-weight:800;margin:4px 0">1 पूरा टेस्ट</p>'+'<p style="font-size:17px;line-height:1.6;margin:0 0 10px;flex:1">120 सवाल, 90 मिनट, बीच में कहानी-विराम। नतीजा मुफ़्त। रजिस्ट्रेशन के बाद टेस्ट-पेज पर ही 100 रुपये का बटन मिलता है।</p>'+'<a href="/aptitude-test.html" style="display:block;text-align:center;background:#F9A825;color:#fff;font-size:18px;font-weight:800;padding:11px 10px;border-radius:999px;text-decoration:none">पूरा टेस्ट यहीं से →</a></div>'+'<div style="background:#fff;border:3px solid #2E7D32;border-radius:16px;padding:14px;display:flex;flex-direction:column">'+'<p style="font-size:26px;font-weight:900;margin:0;color:#2E7D32">🏅 300 रुपये</p>'+'<p style="font-size:19px;font-weight:800;margin:4px 0">गोल्डन बैज: 365 दिन असीमित</p>'+'<p style="font-size:17px;line-height:1.6;margin:0 0 10px;flex:1">साल भर जितनी बार चाहो, पूरा टेस्ट मुफ़्त। 18 से कम उम्र पर छूट: 10 साल के बच्चे का सिर्फ़ 12 रुपये। बैज रजिस्ट्रेशन के बाद dashboard से मिलता है।</p>'+'<a href="/join.html" style="display:block;text-align:center;background:#2E7D32;color:#fff;font-size:18px;font-weight:800;padding:11px 10px;border-radius:999px;text-decoration:none">रजिस्ट्रेशन से शुरू करें →</a></div>'+'<div style="background:#fff;border:3px solid #0B1F3A;border-radius:16px;padding:14px;display:flex;flex-direction:column">'+'<p style="font-size:26px;font-weight:900;margin:0;color:#0B1F3A">📜 125 रुपये</p>'+'<p style="font-size:19px;font-weight:800;margin:4px 0">छपने लायक़ रिपोर्ट, मर्ज़ी हो तो</p>'+'<p style="font-size:17px;line-height:1.6;margin:0 0 10px;flex:1">नतीजे के बाद उसी पेज से। QR-जाँच वाली, प्रमाणपत्र-रूप। न लें तो भी टेस्ट और नतीजा मुफ़्त ही है।</p>'+'<a href="/aptitude-test.html" style="display:block;text-align:center;background:#0B1F3A;color:#fff;font-size:18px;font-weight:800;padding:11px 10px;border-radius:999px;text-decoration:none">पहले टेस्ट दें →</a></div>'+'</div>'+'<p style="font-size:17px;margin:10px 0 0">⚠️ भुगतान केवल आधिकारिक Razorpay से। हर फीस का वापसी-नियम साफ़ लिखा है: <a href="/refund.html" style="color:#1565C0;font-weight:700">रिफंड-नीति देखें</a>।</p>')+
 sec("📊 नतीजा कैसा दिखेगा? नमूना देखिए",
  P('टेस्ट पूरा होते ही फ़ोन पर ऐसा नतीजा खुलता है। नीचे की तस्वीर सिर्फ़ नमूना है, नाम और अंक बनावटी हैं।')+
  '<svg viewBox="0 0 760 430" role="img" style="width:100%;max-width:760px;display:block;margin:8px auto;background:#fff;border:3px solid #0B1F3A;border-radius:14px">'+'<rect x="0" y="0" width="760" height="64" fill="#0B1F3A"/>'+'<text x="380" y="42" font-family="Noto Sans Devanagari" font-size="26" font-weight="bold" fill="#F9A825" text-anchor="middle">आपका नतीजा</text>'+'<g font-family="Noto Sans Devanagari" font-size="19" fill="#0B1F3A">'+'<text x="30" y="104">⭐ सबसे प्रबल रुचि: 🌾 कृषि व खेती</text>'+'<text x="30" y="150">🌾 कृषि</text><rect x="210" y="132" width="430" height="24" rx="12" fill="#2E7D32"/><text x="655" y="150">92</text>'+'<text x="30" y="192">🍽️ भोजन-उद्योग</text><rect x="210" y="174" width="360" height="24" rx="12" fill="#1565C0"/><text x="585" y="192">81</text>'+'<text x="30" y="234">🛒 व्यापार</text><rect x="210" y="216" width="300" height="24" rx="12" fill="#F9A825"/><text x="525" y="234">74</text>'+'<text x="30" y="276">🚚 परिवहन</text><rect x="210" y="258" width="250" height="24" rx="12" fill="#1565C0"/><text x="475" y="276">66</text>'+'<text x="30" y="318">…और बाक़ी 20 क्षेत्र घटते क्रम में, अंकों सहित</text>'+'<text x="30" y="356">🔍 अनजान क्षेत्र: 🤖 रोबोटिक्स, 🧪 रसायन</text>'+'<text x="30" y="398" fill="#2E7D32" font-weight="bold">📚 आगे की राह: इन क्षेत्रों के कोर्स और उद्यम की सीधी कड़ी</text></g>'+'<text x="380" y="250" font-family="Noto Sans Devanagari" font-size="72" fill="#0B1F3A" opacity="0.12" text-anchor="middle" transform="rotate(-18 380 250)">नमूना</text></svg>')+
 sec("📜 125 रुपये की रिपोर्ट में क्या मिलेगा? नमूना देखिए",
  P('• आपका नाम, ACS ID, टेस्ट का नाम, तारीख़ और समय।<br>• ⭐ सबसे प्रबल रुचि और सुझाए 4 क्षेत्र।<br>• पूरे 24 क्षेत्रों के अंक घटते क्रम में।<br>• Unique नंबर और QR: दुनिया में कहीं से असली-नक़ली जाँच।<br>• छपने लायक़ PDF: profile, स्कूल या WhatsApp पर share करने योग्य।')+
  '<svg viewBox="0 0 760 540" role="img" style="width:100%;max-width:760px;display:block;margin:8px auto;background:#fff;border:3px solid #F9A825;border-radius:14px">'+'<rect x="14" y="14" width="732" height="512" fill="none" stroke="#0B1F3A" stroke-width="3" rx="10"/>'+'<rect x="14" y="14" width="732" height="26" fill="#F9A825"/><rect x="14" y="40" width="732" height="6" fill="#fff"/><rect x="14" y="46" width="732" height="10" fill="#2E7D32"/>'+'<g font-family="Noto Sans Devanagari" text-anchor="middle" fill="#0B1F3A">'+'<text x="380" y="96" font-size="30" font-weight="bold">अभिरुचि-रिपोर्ट</text>'+'<text x="380" y="126" font-size="17">अप्लाइड कंप्यूटर स्कूल · FFGPMTrust</text>'+'<text x="380" y="166" font-size="21">नाम: सोनू कुमार · ACS ID: ACS-2026-000000</text>'+'<text x="380" y="196" font-size="18">टेस्ट: पूरा अभिरुचि-टेस्ट, 120 सवाल · तारीख़: 08-11-2026 · समय: 05:08 शाम</text>'+'<text x="380" y="240" font-size="20" font-weight="bold" fill="#2E7D32">⭐ सबसे प्रबल रुचि: कृषि व खेती</text>'+'<text x="380" y="272" font-size="18">सुझाए 4 क्षेत्र: कृषि · भोजन-उद्योग · व्यापार · परिवहन</text>'+'<text x="380" y="302" font-size="17">पूरे 24 क्षेत्रों के अंक घटते क्रम में, इसी पन्ने पर छपे</text>'+'<text x="380" y="346" font-size="16">RIASEC रुचि-विज्ञान, 1959 और Adaptive Testing पर आधारित</text>'+'<text x="380" y="374" font-size="16">यह अभिरुचि-रिपोर्ट है: योग्यता या पास होने का प्रमाण नहीं।</text>'+'<text x="380" y="398" font-size="16">यह शुरुआती दिशा है: आगे counsellor या अनुभव से पक्का करें।</text>'+'<text x="250" y="470" font-size="16">Unique नंबर: APT-2026-XXXXXX</text>'+'<text x="250" y="494" font-size="16">verify: acslearn.com पर QR से</text></g>'+'<g transform="translate(560,420)" fill="#0B1F3A"><rect width="96" height="96" fill="none" stroke="#0B1F3A" stroke-width="4"/><rect x="10" y="10" width="22" height="22"/><rect x="64" y="10" width="22" height="22"/><rect x="10" y="64" width="22" height="22"/><rect x="44" y="44" width="12" height="12"/><rect x="64" y="64" width="10" height="10"/><rect x="80" y="52" width="8" height="8"/><rect x="52" y="78" width="8" height="8"/></g>'+'<text x="380" y="300" font-family="Noto Sans Devanagari" font-size="84" fill="#0B1F3A" opacity="0.10" text-anchor="middle" transform="rotate(-18 380 300)">नमूना</text></svg>'+
  P('हर बार का टेस्ट अलग तारीख़ और अंक के साथ अपनी अलग रिपोर्ट बनाता है। रिपोर्ट लेना पूरी तरह आपकी मर्ज़ी है।'))+
 sec("🛡️ भरोसा",
  P('आपके जवाब आपके फ़ोन में रहते हैं। नतीजा दिशा दिखाता है: फ़ैसला हमेशा आपका। "100 प्रतिशत गारंटी" जैसे झूठे दावे ACS कभी नहीं करता।'))+
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
