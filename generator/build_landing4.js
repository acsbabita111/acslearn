/* ============================================================
   ACS build_landing4.js v1.1 (27-Oct-2026, Founder-आदेश) — 4 landing पेज
   v1.2 (08-Nov-2026, Founder-आदेश): career.html पूरा पेशेवर रूप : hero-SVG ·
   v1.4 (08-Nov-2026, Founder-सुधार): फ़ायदे-grid 2 कार्ड प्रति पंक्ति (v7.6-च नियम); सब विवरण छोटे, पूरे सरल वाक्यों में; तालिका-नोट 17px।
   v1.3 (08-Nov-2026, Founder-सुधार): career का रूप-सुधार : 3D रंगीन कार्ड (lipi.css की कार्ड-भाषा), फीस-कार्ड 2x2, नया hero, नमूना-SVG नए, छपाई में header-सुधार।
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
/* ===== career v1.3: 3D कार्ड-भाषा (lipi.css से) + छपाई-सुधार ===== */
const CZ='<style>'
+'.cz-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:760px;margin:14px auto}'
+'.cz-grid>:last-child:nth-child(odd){grid-column:1/-1;justify-self:center;width:min(100%,420px)}'
+'.cz-card{border-radius:18px;padding:16px 14px;border:2px solid #1565C0;background:linear-gradient(160deg,#FFFFFF 0%,#EAF2FF 55%,#DCE9FF 100%);box-shadow:0 2px 0 #0B1F3A,0 6px 0 #1565C0,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff}'
+'.cz-grid>.cz-card:nth-child(3n+2){border-color:#F9A825;background:linear-gradient(160deg,#FFFFFF 0%,#FFF6DC 55%,#FFE9A8 100%);box-shadow:0 2px 0 #0B1F3A,0 6px 0 #F9A825,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff}'
+'.cz-grid>.cz-card:nth-child(3n){border-color:#2E7D32;background:linear-gradient(160deg,#FFFFFF 0%,#E8F5E9 55%,#C8E6C9 100%);box-shadow:0 2px 0 #0B1F3A,0 6px 0 #2E7D32,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff}'
+'.cz-card h3{font-size:19px;margin:0 0 6px;color:#0B1F3A}'
+'.cz-card p{font-size:17px;line-height:1.7;margin:0;color:#0B1F3A}'
+'.cz-fee{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;max-width:780px;margin:14px auto}'
+'.cz-fee>:last-child:nth-child(odd){grid-column:1/-1;justify-self:center;width:min(100%,370px)}'
+'.cz-fc{display:flex;flex-direction:column;border-radius:18px;padding:16px 14px;border:2px solid #1565C0;background:linear-gradient(160deg,#FFFFFF 0%,#F5F9FF 60%,#E8F0FE 100%)}'
+'.cz-fc h3{font-size:20px;margin:6px 0;color:#0B1F3A}'
+'.cz-fc p{font-size:17px;line-height:1.75;margin:0;color:#0B1F3A;flex:1}'
+'.cz-price{font-size:30px;font-weight:900}'
+'.cz-btn{display:block;text-align:center;font-size:19px;font-weight:800;padding:12px 10px;border-radius:999px;text-decoration:none;margin-top:14px;color:#fff;box-shadow:inset 0 2px 0 rgba(255,255,255,.35),0 5px 0 rgba(11,31,58,.55),0 10px 16px rgba(11,31,58,.3)}'
+'.cz-tblw{border-radius:14px;box-shadow:0 2px 0 #0B1F3A,0 10px 22px rgba(11,31,58,.22);background:#fff}'
+'.cz-tblw tr:nth-child(even) td{background:#F5F7FA}'
+'@media print{.acs-nav{position:static!important;box-shadow:none!important}.acs-wa,.acs-scrim,.acs-drawer{display:none!important}}'
+'</style>';
const HERO2='<svg viewBox="0 0 1000 430" role="img" aria-label="गाँव से दुनिया तक: अभिरुचि-टेस्ट" style="width:100%;display:block;border-radius:16px;margin:4px 0 10px;box-shadow:0 10px 24px rgba(11,31,58,.35)">'
+'<defs><linearGradient id="czsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1F3A"/><stop offset="1" stop-color="#1565C0"/></linearGradient>'
+'<radialGradient id="czsun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F9A825"/><stop offset=".55" stop-color="#F9A825" stop-opacity=".45"/><stop offset="1" stop-color="#F9A825" stop-opacity="0"/></radialGradient></defs>'
+'<rect width="1000" height="430" fill="url(#czsky)"/>'
+'<g fill="#F5F7FA"><circle cx="90" cy="60" r="2.4" opacity=".8"/><circle cx="180" cy="110" r="1.8" opacity=".55"/><circle cx="300" cy="50" r="2" opacity=".6"/><circle cx="660" cy="55" r="2.2" opacity=".7"/><circle cx="740" cy="130" r="1.8" opacity=".5"/><circle cx="950" cy="55" r="2" opacity=".6"/><circle cx="420" cy="80" r="1.6" opacity=".5"/><circle cx="560" cy="40" r="1.8" opacity=".6"/></g>'
+'<circle cx="852" cy="92" r="72" fill="url(#czsun)"/><circle cx="852" cy="92" r="32" fill="#F9A825"/>'
+'<g opacity=".9" fill="#0B1F3A"><rect x="690" y="236" width="26" height="86" rx="3"/><rect x="722" y="256" width="34" height="66" rx="3"/><rect x="762" y="222" width="28" height="100" rx="3"/><rect x="796" y="246" width="36" height="76" rx="3"/></g>'
+'<g fill="#F9A825" opacity=".9"><rect x="696" y="246" width="6" height="8"/><rect x="708" y="262" width="6" height="8"/><rect x="730" y="266" width="7" height="8"/><rect x="744" y="282" width="7" height="8"/><rect x="768" y="232" width="6" height="8"/><rect x="779" y="252" width="6" height="8"/><rect x="804" y="256" width="7" height="8"/><rect x="818" y="276" width="7" height="8"/></g>'
+'<g stroke="#F5F7FA" fill="none" stroke-width="3"><circle cx="906" cy="268" r="38"/><ellipse cx="906" cy="268" rx="16" ry="38"/><path d="M868 268h76M874 248h64M874 288h64"/></g>'
+'<path d="M0 330 Q250 282 520 318 T1000 300 V430 H0 Z" fill="#2E7D32" opacity=".55"/>'
+'<path d="M0 360 Q260 318 540 348 T1000 338 V430 H0 Z" fill="#2E7D32"/>'
+'<path d="M92 388 C300 364 520 350 700 338 820 330 870 326 906 314" fill="none" stroke="#F9A825" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 18"/>'
+'<g><rect x="60" y="330" width="66" height="50" fill="#0B1F3A"/><path d="M52 332 L93 300 L134 332 Z" fill="#0B1F3A"/><rect x="118" y="306" width="9" height="18" fill="#0B1F3A"/><rect x="76" y="346" width="16" height="18" fill="#F9A825"/><rect x="100" y="346" width="14" height="14" fill="#F5F7FA" opacity=".85"/></g>'
+'<g><rect x="156" y="346" width="7" height="26" fill="#0B1F3A"/><circle cx="159" cy="334" r="17" fill="#2E7D32" stroke="#0B1F3A" stroke-width="3"/></g>'
+'<g fill="#0B1F3A"><circle cx="212" cy="330" r="10"/><path d="M212 340 c-9 0 -13 10 -13 22 l5 26 h6 l2 -22 h1 l4 22 h6 l3 -28 c1 -11 -5 -20 -14 -20 Z"/><circle cx="246" cy="342" r="8"/><path d="M246 350 c-7 0 -10 8 -10 16 l4 20 h5 l1 -16 h1 l3 16 h5 l2 -20 c1 -9 -4 -16 -11 -16 Z"/></g>'
+'<g transform="translate(500,118)"><circle r="56" fill="#F5F7FA" opacity=".08"/><circle r="54" fill="none" stroke="#F9A825" stroke-width="5"/><circle r="44" fill="none" stroke="#F5F7FA" stroke-width="1.5" opacity=".5"/>'
+'<g stroke="#F5F7FA" stroke-width="3"><path d="M0 -54 V-44"/><path d="M0 54 V44"/><path d="M-54 0 H-44"/><path d="M54 0 H44"/></g>'
+'<g transform="rotate(32)"><path d="M0 -38 L9 0 L-9 0 Z" fill="#F9A825"/><path d="M0 38 L9 0 L-9 0 Z" fill="#F5F7FA"/></g><circle r="6" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>'
+'<text y="-64" text-anchor="middle" font-size="20" fill="#F5F7FA" font-weight="700">उ</text></g>'
+'<text x="500" y="232" text-anchor="middle" font-size="46" font-weight="900" fill="#F9A825" stroke="#0B1F3A" stroke-width="8" paint-order="stroke" font-family="Noto Sans Devanagari, sans-serif">मन की रुचि नापो, अपनी राह पाओ</text>'
+'<text x="93" y="290" text-anchor="middle" font-size="22" fill="#F5F7FA">गाँव</text><text x="906" y="222" text-anchor="middle" font-size="22" fill="#F5F7FA">दुनिया</text>'
+'<rect y="376" width="1000" height="54" fill="#0B1F3A" opacity=".72"/>'
+'<text x="500" y="412" text-anchor="middle" font-size="27" fill="#F5F7FA" font-family="Noto Sans Devanagari, sans-serif">24 क्षेत्र · 950 से ज़्यादा उद्यम · हिंदी में, अपने फ़ोन पर</text>'
+'</svg>';
const RES2='<svg viewBox="0 0 760 444" role="img" style="width:100%;max-width:760px;display:block;margin:10px auto">'
+'<rect x="20" y="26" width="722" height="402" rx="20" fill="#0B1F3A" opacity=".18"/>'
+'<rect x="10" y="12" width="722" height="402" rx="20" fill="#FFFFFF" stroke="#0B1F3A" stroke-width="2"/>'
+'<text x="371" y="268" text-anchor="middle" font-size="120" font-weight="900" fill="#0B1F3A" opacity=".06" transform="rotate(-22 371 268)" font-family="Noto Sans Devanagari, sans-serif">नमूना</text>'
+'<path d="M10 32 q0 -20 20 -20 h682 q20 0 20 20 v38 h-722 Z" fill="#0B1F3A"/>'
+'<text x="371" y="52" text-anchor="middle" font-size="25" font-weight="900" fill="#F9A825" font-family="Noto Sans Devanagari, sans-serif">📊 आपका नतीजा</text>'
+'<rect x="636" y="80" width="84" height="30" rx="15" fill="#F9A825"/><text x="678" y="101" text-anchor="middle" font-size="17" font-weight="800" fill="#0B1F3A">नमूना</text>'
+'<text x="34" y="104" font-size="20" font-weight="800" fill="#0B1F3A">⭐ सबसे प्रबल रुचि: 🌾 कृषि व खेती</text>'
+'<g font-family="Noto Sans Devanagari, sans-serif">'
+'<text x="34" y="146" font-size="19" fill="#0B1F3A">🌾 कृषि</text><rect x="196" y="130" width="440" height="22" rx="11" fill="#F5F7FA" stroke="#0B1F3A" stroke-opacity=".2"/><rect x="196" y="130" width="405" height="22" rx="11" fill="#2E7D32"/><rect x="606" y="126" width="48" height="30" rx="15" fill="#0B1F3A"/><text x="630" y="147" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">92</text>'
+'<text x="34" y="194" font-size="19" fill="#0B1F3A">🍽️ भोजन-उद्योग</text><rect x="196" y="178" width="440" height="22" rx="11" fill="#F5F7FA" stroke="#0B1F3A" stroke-opacity=".2"/><rect x="196" y="178" width="356" height="22" rx="11" fill="#1565C0"/><rect x="556" y="174" width="48" height="30" rx="15" fill="#0B1F3A"/><text x="580" y="195" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">81</text>'
+'<text x="34" y="242" font-size="19" fill="#0B1F3A">🛒 व्यापार</text><rect x="196" y="226" width="440" height="22" rx="11" fill="#F5F7FA" stroke="#0B1F3A" stroke-opacity=".2"/><rect x="196" y="226" width="325" height="22" rx="11" fill="#F9A825"/><rect x="526" y="222" width="48" height="30" rx="15" fill="#0B1F3A"/><text x="550" y="243" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">74</text>'
+'<text x="34" y="290" font-size="19" fill="#0B1F3A">🚚 परिवहन</text><rect x="196" y="274" width="440" height="22" rx="11" fill="#F5F7FA" stroke="#0B1F3A" stroke-opacity=".2"/><rect x="196" y="274" width="290" height="22" rx="11" fill="#1565C0"/><rect x="490" y="270" width="48" height="30" rx="15" fill="#0B1F3A"/><text x="514" y="291" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">66</text>'
+'</g>'
+'<text x="34" y="334" font-size="18" fill="#0B1F3A" opacity=".9">...और बाक़ी 20 क्षेत्र घटते क्रम में, अंकों सहित</text>'
+'<text x="34" y="366" font-size="18" fill="#0B1F3A">🔍 अनजान क्षेत्र: 🤖 रोबोटिक्स · 🧪 रसायन</text>'
+'<text x="34" y="398" font-size="18" font-weight="800" fill="#2E7D32">📚 आगे की राह: इन क्षेत्रों के कोर्स और उद्यम की सीधी कड़ी</text>'
+'</svg>';
const CERT2='<svg viewBox="0 0 760 560" role="img" style="width:100%;max-width:700px;display:block;margin:10px auto">'
+'<rect x="22" y="26" width="722" height="522" rx="16" fill="#0B1F3A" opacity=".18"/>'
+'<rect x="10" y="10" width="722" height="522" rx="16" fill="#FFFFFF" stroke="#F9A825" stroke-width="8"/>'
+'<rect x="26" y="26" width="690" height="490" rx="10" fill="none" stroke="#0B1F3A" stroke-width="1.5" opacity=".6"/>'
+'<text x="371" y="300" text-anchor="middle" font-size="130" font-weight="900" fill="#0B1F3A" opacity=".055" transform="rotate(-22 371 300)" font-family="Noto Sans Devanagari, sans-serif">नमूना</text>'
+'<rect x="26" y="26" width="690" height="12" fill="#F9A825"/><rect x="26" y="38" width="690" height="2" fill="#0B1F3A" opacity=".35"/><rect x="26" y="40" width="690" height="8" fill="#FFFFFF"/><rect x="26" y="48" width="690" height="2" fill="#0B1F3A" opacity=".35"/><rect x="26" y="50" width="690" height="12" fill="#2E7D32"/>'
+'<rect x="612" y="78" width="84" height="30" rx="15" fill="#F9A825"/><text x="654" y="99" text-anchor="middle" font-size="17" font-weight="800" fill="#0B1F3A">नमूना</text>'
+'<circle cx="371" cy="108" r="30" fill="#0B1F3A" stroke="#F9A825" stroke-width="4"/><text x="371" y="116" text-anchor="middle" font-size="19" font-weight="900" fill="#F9A825">ACS</text>'
+'<rect x="201" y="150" width="340" height="44" rx="12" fill="#0B1F3A"/><text x="371" y="180" text-anchor="middle" font-size="26" font-weight="900" fill="#F9A825" font-family="Noto Sans Devanagari, sans-serif">अभिरुचि-रिपोर्ट</text>'
+'<g text-anchor="middle" font-family="Noto Sans Devanagari, sans-serif" fill="#0B1F3A">'
+'<text x="371" y="222" font-size="17">अप्लाइड कंप्यूटर स्कूल · FFGPMTrust</text>'
+'<text x="371" y="258" font-size="18" font-weight="700">नाम: सोनू कुमार · ACS ID: ACS-2026-000000</text>'
+'<text x="371" y="288" font-size="17">टेस्ट: पूरा अभिरुचि-टेस्ट, 120 सवाल · तारीख़: 08-11-2026 · समय: 05:08 शाम</text>'
+'<text x="371" y="326" font-size="20" font-weight="900" fill="#2E7D32">⭐ सबसे प्रबल रुचि: कृषि व खेती</text>'
+'<text x="371" y="356" font-size="17">सुझाए 4 क्षेत्र: कृषि · भोजन-उद्योग · व्यापार · परिवहन</text>'
+'<text x="371" y="382" font-size="16" opacity=".85">पूरे 24 क्षेत्रों के अंक घटते क्रम में, इसी पन्ने पर छपे</text>'
+'</g>'
+'<path d="M90 398 H652" stroke="#F9A825" stroke-width="2"/>'
+'<g text-anchor="middle" font-family="Noto Sans Devanagari, sans-serif" fill="#0B1F3A">'
+'<text x="371" y="426" font-size="16">RIASEC रुचि-विज्ञान, 1959 और Adaptive Testing पर आधारित</text>'
+'<text x="371" y="450" font-size="16">यह अभिरुचि-रिपोर्ट है: योग्यता या पास होने का प्रमाण नहीं।</text>'
+'<text x="371" y="474" font-size="16">यह शुरुआती दिशा है: आगे counsellor या अनुभव से पक्का करें।</text>'
+'</g>'
+'<text x="56" y="492" font-size="17" font-weight="700" fill="#0B1F3A">Unique नंबर: APT-2026-XXXXXX</text>'
+'<text x="56" y="513" font-size="16" fill="#0B1F3A" opacity=".85">verify: acslearn.com पर QR से</text>'
+'<g transform="translate(596,414)"><rect width="92" height="92" fill="#FFFFFF" stroke="#0B1F3A" stroke-width="3"/>'
+'<g fill="#0B1F3A"><rect x="8" y="8" width="22" height="22"/><rect x="62" y="8" width="22" height="22"/><rect x="8" y="62" width="22" height="22"/>'
+'<rect x="40" y="12" width="8" height="8"/><rect x="52" y="24" width="8" height="8"/><rect x="40" y="40" width="8" height="8"/><rect x="54" y="48" width="8" height="8"/><rect x="66" y="40" width="8" height="8"/><rect x="40" y="62" width="8" height="8"/><rect x="52" y="74" width="8" height="8"/><rect x="66" y="62" width="8" height="8"/><rect x="74" y="76" width="8" height="8"/><rect x="14" y="40" width="8" height="8"/><rect x="26" y="48" width="8" height="8"/></g>'
+'<g fill="#FFFFFF"><rect x="13" y="13" width="12" height="12"/><rect x="67" y="13" width="12" height="12"/><rect x="13" y="67" width="12" height="12"/></g>'
+'<g fill="#0B1F3A"><rect x="16" y="16" width="6" height="6"/><rect x="70" y="16" width="6" height="6"/><rect x="16" y="70" width="6" height="6"/></g></g>'
+'</svg>';
build({out:"career.html",
 title:"अपना करियर चुनें — मुफ़्त अभिरुचि-टेस्ट (Career Aptitude Test) | ACS",
 desc:"24 क्षेत्र, 950+ उद्यम — मुफ़्त अभिरुचि-टेस्ट से जानिए आपका मन किस काम में लगेगा। सही/ग़लत कुछ नहीं, बस अपनी पसंद बताइए। हिंदी में, अपने फ़ोन पर।",
 content:
 CZ+HERO2+
 h1("🧭","अपना करियर चुनें")+WRAP_S+
 P('<b>सबसे बड़ा सवाल:</b> "मैं क्या बनूँ?" इसका जवाब कोई और नहीं दे सकता। जवाब आपके अपने मन में है। ACS का <b>अभिरुचि-टेस्ट (Aptitude Test)</b> वही जवाब बाहर निकालता है।')+
 stepSVG("सवालों के जवाब दो","मन की रुचि नापो","अपनी राह पाओ")+
 sec("❓ यह टेस्ट क्या है?",
  P('यह ज्ञान की परीक्षा <b>नहीं</b> है। कोई जवाब सही या ग़लत नहीं होता। सवाल रोज़ की ज़िंदगी से आते हैं: घर, खेत, बाज़ार, मोबाइल, खेल। आप बस बताइए क्या पसंद है, क्या नहीं।')+
  P('पीछे का विज्ञान: दुनिया-भर में माना गया RIASEC रुचि-विज्ञान, सन 1959 से। उसी पर आधारित मशीन आपके जवाबों से 24 क्षेत्रों में रुचि नापती है।'))+
 sec("🎁 इस टेस्ट के 6 बड़े फ़ायदे",'<div class="cz-grid">'+
  '<div class="cz-card"><h3>🧭 दिशा साफ़</h3><p>टेस्ट आपके सबसे मज़बूत 4 क्षेत्र बताता है। पूरे 24 क्षेत्रों के अंक भी मिलते हैं। अंक घटते क्रम में दिखते हैं।</p></div>'+
  '<div class="cz-card"><h3>🌍 आगे की सीधी राह</h3><p>नतीजे के साथ कोर्स की सीधी कड़ी मिलती है। 950 से ज़्यादा उद्यमों की कड़ी भी मिलती है। पढ़ाई वहीं से शुरू हो जाती है।</p></div>'+
  '<div class="cz-card"><h3>🔍 अनजान क्षेत्र भी दिखें</h3><p>दुनिया में बहुत तरह के काम हैं। कई काम हम जानते ही नहीं। टेस्ट वे काम भी सामने लाता है।</p></div>'+
  '<div class="cz-card"><h3>🗣️ भाषा बिल्कुल सरल</h3><p>सवाल रोज़ की ज़िंदगी से हैं। भाषा कक्षा-6 जैसी हिंदी है। 10 साल से ऊपर कोई भी दे सकता है।</p></div>'+
  '<div class="cz-card"><h3>📱 आपकी निजता</h3><p>आपके जवाब आपके फ़ोन में रहते हैं। झलक बिना login चलती है। कोई ज़बरदस्ती नहीं है।</p></div>'+
  '<div class="cz-card"><h3>🛡️ झूठे वादे नहीं</h3><p>नतीजा दिशा दिखाता है। यह क़िस्मत नहीं लिखता। फ़ैसला हमेशा आपका है।</p></div></div>')+
 sec("🌍 दुनिया के जाने-माने टेस्ट: दाम की तुलना",P('नीचे दुनिया और भारत के जाने-माने अभिरुचि-टेस्ट हैं। आप इन्हें भी देख सकते हैं। तुलना से साफ़ दिखेगा कि ACS का रास्ता कितना सस्ता है।')+'<div class="cz-tblw" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px">'+'<tr style="background:#0B1F3A;color:#fff"><th style="font-size:17px;padding:10px 8px;text-align:left">टेस्ट</th><th style="font-size:17px;padding:10px 8px;text-align:left">कहाँ का</th><th style="font-size:17px;padding:10px 8px;text-align:left">दाम</th><th style="font-size:17px;padding:10px 8px;text-align:left">कड़ी</th></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">O*NET Interest Profiler (ओ-नेट)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिकी सरकार</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">यह मुफ़्त है। अंग्रेज़ी में है।</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.mynextmove.org/explore/ip" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Truity Career Profiler (ट्रुइटी)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिका</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">झलक मुफ़्त है। पूरी रिपोर्ट 29 डॉलर की है। यानी ढाई हज़ार रुपये के आसपास।</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.truity.com/test/career-surveyor" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Self-Directed Search (होलैंड का अपना SDS)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">अमेरिका</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">एक बार का दाम 18.95 डॉलर है। यानी डेढ़ हज़ार रुपये से ऊपर।</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://self-directed-search.com/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">123test career test (123-टेस्ट)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">यूरोप</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">छोटा टेस्ट मुफ़्त है। अंग्रेज़ी में है। बड़ी रिपोर्ट paid है।</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.123test.com/career-test/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A;font-weight:700">Mindler (माइंडलर)</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">भारत</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A">दाम 1,499 रुपये से शुरू होता है। counsellor-पैकेज और महँगे हैं।</td><td style="font-size:17px;padding:10px 8px;border-bottom:1px solid #0B1F3A"><a href="https://www.mindler.com/" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700">site खोलें ↗</a></td></tr>'+'<tr style="background:#2E7D32;color:#fff"><td style="font-size:18px;padding:12px 8px;font-weight:900">ACS अभिरुचि-टेस्ट</td><td style="font-size:17px;padding:12px 8px">भारत, हिंदी में</td><td style="font-size:18px;padding:12px 8px;font-weight:900">झलक और नतीजा मुफ़्त है। पूरा टेस्ट 100 रुपये में। छपने लायक़ रिपोर्ट 125 रुपये में।</td><td style="font-size:17px;padding:12px 8px"><a href="/aptitude-test.html" style="color:#fff;font-weight:900">यही पेज ↓</a></td></tr></table></div>'+'<p style="font-size:17px;opacity:.9;margin:10px 0 0">जानकारी नवंबर 2026 की है। दाम बदलते रहते हैं। हर site पर ख़ुद जाँच लें। ये बाहरी site हैं। इनकी सेवा के ज़िम्मेदार वे ख़ुद हैं। विदेशी दाम डॉलर में हैं।</p>')+
 sec("₹ ACS की फीस: पूरा हिसाब, कुछ छिपा नहीं",'<div class="cz-fee">'+
  '<div class="cz-fc" style="border-color:#1565C0;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #1565C0,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#EAF2FF 55%,#DCE9FF 100%)"><div class="cz-price" style="color:#1565C0">🆓 0 रुपये</div><h3>मुफ़्त झलक</h3><p>इसमें 24 सवाल हैं। 10 से 12 मिनट लगते हैं। login या रजिस्ट्रेशन नहीं चाहिए। नतीजा भी मुफ़्त दिखता है।</p><a class="cz-btn" style="background:#1565C0" href="/aptitude-test.html">मुफ़्त टेस्ट शुरू करें →</a></div>'+
  '<div class="cz-fc" style="border-color:#F9A825;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #F9A825,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#FFF6DC 55%,#FFE9A8 100%)"><div class="cz-price" style="color:#0B1F3A">🎫 100 रुपये</div><h3>1 पूरा टेस्ट</h3><p>इसमें 120 सवाल हैं। समय 90 मिनट का है। बीच में कहानी-विराम आते हैं। नतीजा मुफ़्त दिखता है। पहले रजिस्ट्रेशन करें। फिर टेस्ट-पेज पर ही 100 रुपये का बटन मिलता है।</p><a class="cz-btn" style="background:#F9A825;color:#0B1F3A" href="/aptitude-test.html">पूरा टेस्ट यहीं से →</a></div>'+
  '<div class="cz-fc" style="border-color:#2E7D32;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #2E7D32,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#E8F5E9 55%,#C8E6C9 100%)"><div class="cz-price" style="color:#2E7D32">🏅 300 रुपये</div><h3>गोल्डन बैज: 365 दिन असीमित</h3><p>साल भर जितनी बार चाहें, पूरा टेस्ट दें। हर बार मुफ़्त रहेगा। 18 से कम उम्र पर छूट है। 10 साल के बच्चे का सिर्फ़ 12 रुपये लगता है। बैज रजिस्ट्रेशन के बाद dashboard से मिलता है।</p><a class="cz-btn" style="background:#2E7D32" href="/join.html">रजिस्ट्रेशन से शुरू करें →</a></div>'+
  '<div class="cz-fc" style="border-color:#0B1F3A;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #0B1F3A,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#EDF0F5 55%,#DCE2EC 100%)"><div class="cz-price" style="color:#0B1F3A">📜 125 रुपये</div><h3>छपने लायक़ रिपोर्ट, मर्ज़ी हो तो</h3><p>नतीजे के बाद उसी पेज से मिलती है। इस पर QR लगा होता है। दुनिया में कहीं से असली-नक़ली जाँच हो जाती है। रूप प्रमाणपत्र जैसा है। न लें तो भी टेस्ट और नतीजा मुफ़्त ही है।</p><a class="cz-btn" style="background:#0B1F3A" href="/aptitude-test.html">पहले टेस्ट दें →</a></div>'+
  '</div>'+
  '<p style="font-size:17px;text-align:center;margin:12px 0 0">⚠️ भुगतान केवल आधिकारिक Razorpay से। हर फीस का वापसी-नियम साफ़ लिखा है: <a href="/refund.html" style="color:#1565C0;font-weight:700">रिफंड-नीति देखें</a>।</p>')+
 sec("📊 नतीजा कैसा दिखेगा? नमूना देखिए",
  P('टेस्ट पूरा होते ही फ़ोन पर ऐसा नतीजा खुलता है। नीचे की तस्वीर सिर्फ़ नमूना है, नाम और अंक बनावटी हैं।')+
  RES2)+
 sec("📜 125 रुपये की रिपोर्ट में क्या मिलेगा? नमूना देखिए",
  P('• रिपोर्ट में आपका नाम और ACS ID छपते हैं।<br>• टेस्ट का नाम, तारीख़ और समय भी छपते हैं।<br>• ⭐ सबसे प्रबल रुचि और सुझाए 4 क्षेत्र छपते हैं।<br>• पूरे 24 क्षेत्रों के अंक घटते क्रम में छपते हैं।<br>• Unique नंबर और QR लगा होता है। दुनिया में कहीं से असली-नक़ली जाँच हो जाती है।<br>• PDF छपने लायक़ होती है। इसे profile, स्कूल या WhatsApp पर share कर सकते हैं।')+
  CERT2+
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
