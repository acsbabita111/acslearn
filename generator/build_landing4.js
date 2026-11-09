/* ============================================================
   ACS build_landing4.js v1.1 (27-Oct-2026, Founder-आदेश) — 4 landing पेज
   v1.2 (08-Nov-2026, Founder-आदेश): career.html पूरा पेशेवर रूप : hero-SVG ·
   v1.4 (08-Nov-2026, Founder-सुधार): फ़ायदे-grid 2 कार्ड प्रति पंक्ति (v7.6-च नियम); सब विवरण छोटे, पूरे सरल वाक्यों में; तालिका-नोट 17px।
   v1.7.2 (09-Nov-2026, Founder-सुधार): "क्षेत्र-ठप्पा" शब्द हर जगह "क्षेत्र-विवरण"
   (BRIDGE-SVG पाठ + विज्ञान-खंड paragraph); ver-stamp v1.7.2। बाक़ी v1.7.1 जस-का-तस।
   v1.7.1 (09-Nov-2026, Founder-सुधार): career.html — हिन्दी baseline finalization :
   (1) Student Golden Badge को अलग premium ACS GOLDEN PASS card बनाया
   (2) पुराने backend v3.7 से exact 10–17 आयु-छूट, ₹300 base, 365 दिन, minimum age 10
   (3) खरीद प्रक्रिया: login → student registration/DOB → dashboard → server fee → Razorpay → instant activation
   (4) Golden scope साफ़: अभी unlimited full Career Interest Test; अन्य paid सेवा तभी शामिल जब GOLDEN PASS INCLUDED लिखा हो
   (5) दुनिया के subscription/pass उदाहरण: Coursera Plus, Udemy Personal Plan, Skillshare, LinkedIn Premium Career
   (6) MAPP users 1 करोड़+ → 90 लाख+; ACS fee-copy contradiction बंद
   v1.7 (09-Nov-2026, ChatGPT deep-research HOLD का जवाब): career.html :
   (1) निजता-तालिका पूरी: logged-in नतीजा-सार server-save row (code-प्रमाणित,
       apt-pay.js v1.1 / Founder-override 30-Jul) + भुगतान-रसीद row
   (2) 18,943 व 951 अब hard-code नहीं: generator/data/apt_counts.json से
       (dev_count_claims.js की मशीन-गिनती; बेमेल = build FAIL)
   (3) CTA-एकरूपता: हर मुफ़्त-बटन = '24 प्रश्न की मुफ़्त झलक' परिवार
   (4) stepSVG को वैकल्पिक aria-label (career देता है; hunar/udyam byte-अछूते)
   (5) FAB scroll-aware (career-only foot-script): नीचे-scroll पर छिपें
   v1.6 (09-Nov-2026, ChatGPT पुनः-ऑडिट HOLD के 10 सुधार): career.html :
   (1) झलक-ईमानदारी: title/CTA में '24 प्रश्न की मुफ़्त झलक' साफ़; पूरा=120-प्रश्न
   (2) फीस-भाषा: 'नतीजे के लिए कोई अलग शुल्क नहीं' (मुफ़्त-विरोधाभास ख़त्म)
   (3) निजता: 'कुछ नहीं जाता' हटाकर सही दावा (टेस्ट-उत्तर नहीं जाते; web-log सामान्य)
   (4) '10 साल = 12 रुपये' हटा: उम्र-आधारित छूट + 10-13 = खोज-अभ्यास पंक्ति
   (5) तुलना-फीस सही: 'कई मुफ़्त · paid ₹900-₹13,000'
   (6) 'टॉप 10' दावा हटा: '10 जाने-माने'; '20 साइटों/सबसे' ranking-दावे हटे
   (7) mobile FAB: छोटे+हल्के (career-स्तर CSS); पूरा scroll-इलाज universal-दौर होल
   (8) a11y: RES2/CERT2/BRIDGE पर aria-label (stepSVG साझा: दर्ज होल)
   (9) GEN_NOTE spec-ver: career v1.6 traceable, बाक़ी 3 पेज byte-अछूते
   (10) फीस-कार्ड पंक्तियाँ एक सुर में ('अलग शुल्क नहीं')
   v1.5 (09-Nov-2026, Founder-आदेश: ChatGPT-ऑडिट के 10 सुधार): career.html :
   (1) नाम-सुधार Aptitude->Career Interest Test (रुचि-परीक्षण; slug/URL अटल)
   (2) वैज्ञानिक-आधार व सीमा खंड: validation-चरण का साफ़ सच
   (3) 'Adaptive Testing' दावा हटा: 'गतिशील प्रश्न-चयन' (असली तकनीक)
   (4) RIASEC-6 -> 24 क्षेत्र -> 951 उद्यम bridge-चित्र
   (5) फीस-भाषा एकरूप: 'मुफ़्त' की एक परिभाषा; बैज = असीमित टेस्ट
   (6) 18-कम सुरक्षा-पट्टी (अभिभावक/शिक्षक के साथ; भुगतान सहमति से)
   (7) निजता-तालिका: क्या फ़ोन में, क्या server पर, क्या Razorpay पर
   (8) तुलना ईमानदार: 'नापता है' चिप हर औज़ार पर; heading बदला; accordion में
   (9) ₹125 = रिपोर्ट (प्रमाणपत्र नहीं) + ISO-9001 स्पष्टीकरण
   (10) ढाँचा छोटा: CTA hero के तुरंत नीचे; तुलना accordion में; + English-झलक कड़ी
   v1.4 (08-Nov-2026, Founder-फ़ैसला): दो-पेज दोहराव ख़त्म : सारी विवेचना career.html पर (टॉप-10 पूरी सूची + फ़र्क़-तालिका + 4-आँकड़े पट्टी aptitude-test से यहाँ); टेस्ट-पेज सिर्फ़ टेस्ट।
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
/* v1.7: बड़े आँकड़े मशीन-गिनती से (dev_count_claims.js) — hard-code निषिद्ध */
const COUNTS=JSON.parse(fs.readFileSync(path.join(__dirname,"data","apt_counts.json"),"utf8"));
if(!(COUNTS.question_total>18000&&COUNTS.udyam_total>900)) throw new Error("apt_counts.json संदिग्ध: "+JSON.stringify(COUNTS));
const Q_TOTAL=COUNTS.question_total.toLocaleString("en-IN");
const U_TOTAL=String(COUNTS.udyam_total);
const BH_COUNT=CD.all.filter(c=>c&&c.url&&String(c.url).indexOf("/bhasha/")>-1).length;
if(!BH_COUNT) throw new Error("भाषा-गिनती 0 — courses_data जाँचो");
console.log("भाषा-गिनती (build-समय):",BH_COUNT,"| समूह:",CD.groups.length);
const MENU_HTML=loadMenu().map(m=>'<a class="acs-mitem" href="'+m.href+'"><span class="e">'+m.icon+'</span> '+m.label+'</a>').join("\n");
const MENU_FALLBACK_JS='<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr'+'ipt>';
function GEN_NOTE_FOR(spec){return "<!-- generator: build_landing4.js "+(spec.ver||"v1.0")+" — हाथ से न बदलें -->";}
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
  p=p.replace("<!DOCTYPE html>","<!DOCTYPE html>\n"+GEN_NOTE_FOR(spec));
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
function stepSVG(a,b,c,lbl){
 return '<svg viewBox="0 0 700 150" role="img"'+(lbl?' aria-label="'+lbl+'"':'')+' style="width:100%;max-width:700px;display:block;margin:10px auto;background:#0B1F3A;border-radius:12px">'+
 '<g font-family="Noto Sans Devanagari,Inter" font-size="20" fill="#F5F7FA" text-anchor="middle">'+
 '<rect x="20" y="35" width="190" height="80" rx="12" fill="none" stroke="#F9A825" stroke-width="3"/><text x="115" y="82">'+a+'</text>'+
 '<path d="M215 75 h40" stroke="#F9A825" stroke-width="3"/><path d="M250 68 l12 7 -12 7z" fill="#F9A825"/>'+
 '<rect x="265" y="35" width="190" height="80" rx="12" fill="none" stroke="#2E7D32" stroke-width="3"/><text x="360" y="82">'+b+'</text>'+
 '<path d="M460 75 h40" stroke="#F9A825" stroke-width="3"/><path d="M495 68 l12 7 -12 7z" fill="#F9A825"/>'+
 '<rect x="510" y="35" width="170" height="80" rx="12" fill="#2E7D32"/><text x="595" y="82" font-weight="bold">'+c+'</text></g></svg>';
}

/* ===== v1.5 career-robot: ChatGPT-ऑडिट के दावों का मशीन-पहरा ===== */
function careerAudit_run(c){careerAudit(c);return c;}
function careerAudit(content){
  let bad=0;
  const vis=content.replace(/<[^>]*>/g," ");
  [["Aptitude Test","पुराना नाम"],["Adaptive Testing","हटाया दावा"],["प्रमाणपत्र जैसा","रिपोर्ट-भाषा"],["कितना सस्ता","तुलना-दावा"],["कुछ नहीं जाता","निजता-absolute"],["टॉप 10","ranking-दावा"],["12 रुपये","उम्र-दाम"],["सबसे जानी-मानी","ranking-दावा"],["हमेशा मुफ़्त दिखता","फीस-विरोधाभास"],["मुफ़्त टेस्ट शुरू","पुराना CTA"],["मुफ़्त टेस्ट अभी","पुराना CTA"]].forEach(x=>{
    if(vis.indexOf(x[0])>-1){console.log("⛔ career:",x[1],"बचा:",x[0]);bad++;}
  });
  ["Career Interest Test","जाँच-चरण (validation phase)","/en/aptitude-test.html","नापता है:","ISO 9001","18 से कम उम्र वालों के लिए","निजता: क्या कहाँ","<details","dynamic question selection","कोई अलग शुल्क नहीं","कई मुफ़्त","उम्र-आधारित छूट","10 से 13","web-log","मुफ़्त झलक दें","नतीजा-सार (login पर)","भुगतान की रसीद","मुफ़्त झलक शुरू करें","24 प्रश्न की मुफ़्त झलक शुरू","मशीन से होती है"].forEach(k=>{
    if(content.indexOf(k)<0){console.log("⛔ career: अनिवार्य अनुपस्थित:",k);bad++;}
  });
  if(vis.indexOf("\u2014")>-1){console.log("⛛ career: लंबी रेखा (—) content में");bad++;}
  if(bad){FAIL+=bad;}
  else console.log("✅ career-robot: 11 निषेध + 20 अनिवार्य + डैश : सब पास");
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
+'.cz-goldpass{position:relative;overflow:hidden;max-width:860px;margin:24px auto 18px;border:3px solid #8A5A00;border-radius:26px;padding:22px;background:linear-gradient(135deg,#5A3600 0%,#B97900 18%,#FFD76A 43%,#FFF3B0 57%,#D99A12 78%,#6B4200 100%);box-shadow:0 3px 0 #0B1F3A,0 10px 0 #8A5A00,0 22px 38px rgba(11,31,58,.34),inset 0 2px 0 rgba(255,255,255,.75);color:#211400}'
+'.cz-goldpass:before{content:"";position:absolute;inset:-35%;background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.36) 50%,transparent 58%);transform:rotate(10deg);pointer-events:none}'
+'.cz-gphead{position:relative;display:grid;grid-template-columns:1.4fr .8fr;gap:18px;align-items:center}'
+'.cz-gpkicker{display:inline-block;background:#0B1F3A;color:#FFD76A;border-radius:999px;padding:6px 12px;font-size:16px;font-weight:900;letter-spacing:.6px}'
+'.cz-gptitle{font-size:34px;line-height:1.1;margin:10px 0 5px;color:#211400;text-shadow:0 1px 0 rgba(255,255,255,.55)}'
+'.cz-gpsub{font-size:18px;font-weight:800;margin:0;line-height:1.6}'
+'.cz-gpprice{text-align:center;background:rgba(11,31,58,.92);color:#fff;border:2px solid #FFF1A6;border-radius:20px;padding:16px 12px;box-shadow:inset 0 2px 0 rgba(255,255,255,.18)}'
+'.cz-gpprice b{display:block;font-size:36px;color:#FFD76A;line-height:1.05}.cz-gpprice span{font-size:16px;font-weight:800}'
+'.cz-gpstrip{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0 12px}'
+'.cz-gppill{background:rgba(255,255,255,.72);border:1px solid rgba(90,54,0,.45);border-radius:14px;padding:10px;text-align:center;font-size:16px;font-weight:900;line-height:1.45}'
+'.cz-gpbox{position:relative;background:rgba(255,255,255,.82);border:1px solid rgba(90,54,0,.45);border-radius:16px;padding:14px;margin-top:12px}'
+'.cz-gpbox h4{font-size:19px;margin:0 0 8px;color:#402600}.cz-gpbox p,.cz-gpbox li{font-size:17px;line-height:1.75;color:#211400}'
+'.cz-gpsteps{margin:0;padding-left:22px}.cz-gpsteps li{margin:5px 0}'
+'.cz-age{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden}.cz-age th,.cz-age td{border:1px solid #8A5A0066;padding:8px;text-align:center;font-size:16px}.cz-age th{background:#0B1F3A;color:#FFD76A}.cz-age td:last-child{font-weight:900;color:#2E7D32}'
+'.cz-gpactions{position:relative;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:14px}.cz-gpactions a{display:inline-block;text-decoration:none;border-radius:999px;padding:12px 18px;font-size:18px;font-weight:900;box-shadow:0 5px 0 rgba(11,31,58,.45)}'
+'.cz-worldpass{max-width:860px;margin:16px auto;border:2px solid #8A5A00;border-radius:16px;background:#FFF8E1;box-shadow:0 8px 18px rgba(11,31,58,.12)}.cz-worldpass summary{cursor:pointer;font-size:19px;font-weight:900;color:#0B1F3A;padding:14px 16px;list-style:none}.cz-worldpass summary::-webkit-details-marker{display:none}.cz-worldpass summary:after{content:" ▾";color:#B97900}.cz-wpgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0 14px 14px}.cz-wpc{background:#fff;border:1px solid #8A5A0055;border-radius:14px;padding:12px}.cz-wpc b{display:block;font-size:18px;color:#0B1F3A;margin-bottom:4px}.cz-wpc p{font-size:16px;line-height:1.6;margin:0;color:#0B1F3A}'
+'.cz-tblw{border-radius:14px;box-shadow:0 2px 0 #0B1F3A,0 10px 22px rgba(11,31,58,.22);background:#fff}'
+'.cz-tblw tr:nth-child(even) td{background:#F5F7FA}'
+'.cz-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:760px;margin:14px auto 4px}'
+'.cz-stat{background:linear-gradient(180deg,#fff,#eef4ff);border:2px solid #1565C0;border-radius:14px;padding:12px 10px;text-align:center;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #1565C0,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff}'
+'.cz-stat b{display:block;font-size:26px;color:#0B1F3A}'
+'.cz-stat span{font-size:17px;color:#0B1F3A}'
+'.cz-stat:nth-child(2){border-color:#F9A825;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #F9A825,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(180deg,#fff,#fff7e0)}'
+'.cz-stat:nth-child(3){border-color:#2E7D32;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #2E7D32,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(180deg,#fff,#eaf6ea)}'
+'.cz-acsline{background:#2E7D32;color:#fff;border-radius:14px;padding:14px 16px;margin:14px 0 4px;font-size:18px;font-weight:800;line-height:1.7;box-shadow:0 2px 0 #0B1F3A,0 8px 18px rgba(11,31,58,.25)}'
+'.cz-acc{max-width:860px;margin:14px auto;border:2px solid #1565C0;border-radius:16px;background:#fff;box-shadow:0 2px 0 #0B1F3A,0 8px 18px rgba(11,31,58,.18)}'
+'.cz-acc summary{cursor:pointer;font-size:19px;font-weight:800;color:#0B1F3A;padding:14px 16px;list-style:none}'
+'.cz-acc summary::-webkit-details-marker{display:none}'
+'.cz-acc summary::after{content:" ▾";color:#1565C0}'
+'.cz-acc .cz-accin{padding:0 14px 14px}'
+'.apl-measure{display:inline-block;background:#0B1F3A;color:#F9A825;font-size:16px;font-weight:700;padding:2px 10px;border-radius:999px;margin:2px 0 4px}'
+'.cz-priv{width:100%;max-width:760px;margin:10px auto;border-collapse:collapse;font-size:17px}'
+'.cz-priv th,.cz-priv td{border:1px solid #0B1F3A33;padding:10px 10px;text-align:left;color:#0B1F3A}'
+'.cz-priv th{background:#0B1F3A;color:#F9A825;font-size:18px}'
+'.cz-limit{max-width:760px;margin:12px auto;border:2px dashed #F9A825;border-radius:14px;background:#FFF8E1;padding:12px 14px;font-size:18px;line-height:1.8;color:#0B1F3A}'
+'.cz-minor{max-width:860px;margin:14px auto;background:#F9A825;color:#0B1F3A;border-radius:14px;padding:14px 16px;font-size:18px;font-weight:700;line-height:1.8;box-shadow:0 2px 0 #0B1F3A,0 8px 18px rgba(11,31,58,.25)}'
+'@media(max-width:680px){.cz-gphead{grid-template-columns:1fr}.cz-gptitle{font-size:29px}.cz-gpstrip{grid-template-columns:1fr}.cz-wpgrid{grid-template-columns:1fr}}@media(max-width:520px){.cz-goldpass{padding:16px 12px;border-radius:20px}.udy-float{transform:scale(.78);transform-origin:left bottom;opacity:.85}.udy-float:active,.udy-float:focus-within{transform:none;opacity:1}.acs-wa{transform:scale(.85);transform-origin:right bottom}}'
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
const RES2='<svg viewBox="0 0 760 444" role="img" aria-label="नमूना नतीजा: सबसे प्रबल रुचि और 24 क्षेत्रों के अंक घटते क्रम में" style="width:100%;max-width:760px;display:block;margin:10px auto">'
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
const CERT2='<svg viewBox="0 0 760 560" role="img" aria-label="नमूना अभिरुचि-रिपोर्ट: नाम, टेस्ट-ब्योरा, 4 सुझाए क्षेत्र, unique नंबर और QR" style="width:100%;max-width:700px;display:block;margin:10px auto">'
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
+'<text x="371" y="426" font-size="16">RIASEC रुचि-विज्ञान (1959) पर आधारित/प्रेरित · गिनती सीधा गणित</text>'
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
const APTCSS='<link rel="stylesheet" href="/assets/aptitude-test.css">';
const CZSTATS='<div class="cz-stats"><div class="cz-stat"><b>'+Q_TOTAL+'+</b><span>प्रश्नों का भंडार</span></div><div class="cz-stat"><b>24</b><span>काम के क्षेत्र</span></div><div class="cz-stat"><b>'+U_TOTAL+'</b><span>उद्यम-श्रेणियाँ</span></div><div class="cz-stat"><b>🔒</b><span>टेस्ट के जवाब फ़ोन में ही</span></div></div>';
const TOP10='<div class="apl-card"><div class="apl-rank">1</div><div class="apl-body"><b class="apl-nm">ओ-नेट इंटरेस्ट प्रोफ़ाइलर (O*NET Interest Profiler)</b><br><span class="apl-measure">नापता है: रुचि (interest)</span><p class="apl-desc">अमेरिकी सरकार का टेस्ट।<br>रायसेक (RIASEC) विज्ञान पर बना: हमारा टेस्ट भी इसी विज्ञान से प्रेरित है।</p><div class="apl-meta"><span class="apl-fee free">फीस: मुफ़्त</span><span class="apl-site">mynextmove.org</span></div></div><a class="apl-go" href="https://www.mynextmove.org/explore/ip" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">2</div><div class="apl-body"><b class="apl-nm">सिक्स्टीन पर्सनैलिटीज़ (16Personalities)</b><br><span class="apl-measure">नापता है: स्वभाव (personality)</span><p class="apl-desc">स्वभाव बताने वाला मशहूर टेस्ट।<br> करोड़ों लोग ले चुके हैं।<br>हिंदी में भी मिलता है।</p><div class="apl-meta"><span class="apl-fee free">फीस: मुफ़्त</span><span class="apl-site">16personalities.com</span></div></div><a class="apl-go" href="https://www.16personalities.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">3</div><div class="apl-body"><b class="apl-nm">करियर एक्सप्लोरर (CareerExplorer)</b><br><span class="apl-measure">नापता है: रुचि + करियर-मिलान</span><p class="apl-desc">बड़ा टेस्ट: सैकड़ों करियर से आपका मिलान करता है।</p><div class="apl-meta"><span class="apl-fee free">फीस: शुरुआत मुफ़्त · गहरी रिपोर्ट के पैसे</span><span class="apl-site">careerexplorer.com</span></div></div><a class="apl-go" href="https://www.careerexplorer.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">4</div><div class="apl-body"><b class="apl-nm">वन-टू-थ्री टेस्ट (123test)</b><br><span class="apl-measure">नापता है: रुचि (interest)</span><p class="apl-desc">चित्रों वाला छोटा टेस्ट।<br>जल्दी नतीजा देता है।</p><div class="apl-meta"><span class="apl-fee free">फीस: मुफ़्त</span><span class="apl-site">123test.com</span></div></div><a class="apl-go" href="https://www.123test.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">5</div><div class="apl-body"><b class="apl-nm">ट्रूइटी (Truity)</b><br><span class="apl-measure">नापता है: रुचि व स्वभाव</span><p class="apl-desc">94 प्रश्नों का जाना-माना करियर-टेस्ट।</p><div class="apl-meta"><span class="apl-fee">फीस: टेस्ट मुफ़्त · पूरी रिपोर्ट लगभग $19-$29 (लगभग ₹1,700-₹2,600)</span><span class="apl-site">truity.com</span></div></div><a class="apl-go" href="https://www.truity.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">6</div><div class="apl-body"><b class="apl-nm">सेल्फ़ डाइरेक्टेड सर्च (Self-Directed Search)</b><br><span class="apl-measure">नापता है: रुचि (interest)</span><p class="apl-desc">रायसेक (RIASEC) बनाने वाले वैज्ञानिक जॉन हॉलैंड का अपना टेस्ट।</p><div class="apl-meta"><span class="apl-fee">फीस: लगभग $10-$19 (लगभग ₹900-₹1,700)</span><span class="apl-site">self-directed-search.com</span></div></div><a class="apl-go" href="https://self-directed-search.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">7</div><div class="apl-body"><b class="apl-nm">एम-बी-टी-आई (MBTI): आधिकारिक</b><br><span class="apl-measure">नापता है: स्वभाव (personality)</span><p class="apl-desc">दुनिया का सबसे मशहूर 16-स्वभाव टेस्ट: यही उसका आधिकारिक घर है।</p><div class="apl-meta"><span class="apl-fee">फीस: $59.95 (लगभग ₹5,300)</span><span class="apl-site">mbtionline.com</span></div></div><a class="apl-go" href="https://www.mbtionline.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">8</div><div class="apl-body"><b class="apl-nm">क्लिफ़्टन स्ट्रेंथ्स (CliftonStrengths)</b><br><span class="apl-measure">नापता है: ताक़त (strengths)</span><p class="apl-desc">गैलप (Gallup) कंपनी का टेस्ट: आपकी 34 ताक़तें नापता है।<br>बड़े दफ़्तरों में चलता है।</p><div class="apl-meta"><span class="apl-fee">फीस: $24.99-$59.99 (लगभग ₹2,200-₹5,300)</span><span class="apl-site">store.gallup.com</span></div></div><a class="apl-go" href="https://store.gallup.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">9</div><div class="apl-body"><b class="apl-nm">यू-साइंस (YouScience)</b><br><span class="apl-measure">नापता है: योग्यता (aptitude)</span><p class="apl-desc">11 दिमाग़ी खेलों से असली योग्यता नापता है।<br>स्कूलों में ख़ूब चलता है।</p><div class="apl-meta"><span class="apl-fee">फीस: $49 (लगभग ₹4,300)</span><span class="apl-site">youscience.com</span></div></div><a class="apl-go" href="https://www.youscience.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apl-card"><div class="apl-rank">10</div><div class="apl-body"><b class="apl-nm">मैप (MAPP)</b><br><span class="apl-measure">नापता है: काम की प्रेरणा (motivation)</span><p class="apl-desc">काम की प्रेरणा नापता है।<br>90 लाख से ज़्यादा users: Assessment.com का वर्तमान दावा।</p><div class="apl-meta"><span class="apl-fee">फीस: झलक मुफ़्त · रिपोर्ट $89.95-$149.95 (लगभग ₹8,000-₹13,200)</span><span class="apl-site">assessment.com</span></div></div><a class="apl-go" href="https://www.assessment.com" target="_blank" rel="noopener">🔗 खोलें</a></div><div class="apt-note">⚠️ ये सब बाहरी साइटें हैं: जानकारी ख़ुद verify करें।<br>फीस बदलती रहती है।<br>जानकारी: अक्टूबर 2026 की।<br>ज़्यादातर टेस्ट अंग्रेज़ी में हैं। ACS की मुफ़्त झलक English में भी है।</div><div class="apl-india">🇮🇳 भारत में भी: <b>माइंडलर (Mindler)</b>: स्कूल के बच्चों का करियर-टेस्ट और सलाहकार-सेवा।<br>दाम लगभग ₹1,500 से शुरू।<br>पता: <a href="https://www.mindler.com" target="_blank" rel="noopener">mindler.com</a></div>';
const FARQ='<div class="apl-row"><span class="l">💰 फीस</span><span class="a">वहाँ: कई मुफ़्त · paid रिपोर्ट लगभग ₹900 से ₹13,000 तक</span><span class="b">यहाँ: झलक मुफ़्त · पूरा टेस्ट ₹100 · बैज-धारक को असीमित</span></div><div class="apl-row"><span class="l">🗣️ भाषा</span><span class="a">वहाँ: ज़्यादातर अंग्रेज़ी</span><span class="b">यहाँ: सरल हिंदी · English झलक भी</span></div><div class="apl-row"><span class="l">👤 खाता</span><span class="a">वहाँ: ज़्यादातर में खाता और ईमेल (email) ज़रूरी</span><span class="b">यहाँ: झलक बिना खाते के</span></div><div class="apl-row"><span class="l">🔒 आपके जवाब</span><span class="a">वहाँ: उनके सर्वर (server) पर</span><span class="b">यहाँ: टेस्ट के जवाब सिर्फ़ फ़ोन में</span></div><div class="apl-row"><span class="l">📜 छपा काग़ज़</span><span class="a">वहाँ: अलग-अलग नियम</span><span class="b">यहाँ: रिपोर्ट ₹125 में, मर्ज़ी हो तो</span></div><p class="apl-small">यह तुलना अक्टूबर 2026 की जाँच पर है।<br>ये औज़ार अलग-अलग चीज़ें नापते हैं: सीधी बराबरी ठीक नहीं।<br>हर साइट की अपनी ख़ूबी है: मन करे तो वे भी आज़माइए।</p>';
const ACSLINE='<div class="cz-acsline">🧭 ACS अभिरुचि-टेस्ट (Career Interest Test): भारत में, हिंदी में। 24-प्रश्न झलक ₹0 है। पूरा 120-प्रश्न टेस्ट ₹100 प्रति चांस है; नतीजे के लिए अलग शुल्क नहीं। Active Golden Pass में पूरे टेस्ट के चांस असीमित हैं। छपने लायक़ रिपोर्ट ₹125 में, मर्ज़ी हो तो। <a href="/aptitude-test.html" style="color:#F9A825;font-weight:900">🚀 टेस्ट-पेज खोलें →</a> · <a href="/en/aptitude-test.html" style="color:#F9A825;font-weight:900">English →</a></div>';

/* ===== v1.5 नए टुकड़े (career) ===== */
const CTAROW='<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:12px 0 2px">'
+'<a href="/aptitude-test.html#apt-start" style="display:inline-block;background:#2E7D32;color:#fff;font-size:21px;font-weight:900;padding:14px 26px;border-radius:999px;text-decoration:none;box-shadow:inset 0 2px 0 rgba(255,255,255,.35),0 5px 0 rgba(11,31,58,.55),0 10px 16px rgba(11,31,58,.3)">🆓 24 प्रश्न की मुफ़्त झलक दें →</a>'
+'<a href="/aptitude-test.html#apt-full" style="display:inline-block;background:#F9A825;color:#0B1F3A;font-size:21px;font-weight:900;padding:14px 26px;border-radius:999px;text-decoration:none;box-shadow:inset 0 2px 0 rgba(255,255,255,.35),0 5px 0 rgba(11,31,58,.55),0 10px 16px rgba(11,31,58,.3)">🧭 पूरा 120-प्रश्न टेस्ट</a></div>'
+'<p style="font-size:17px;text-align:center;margin:6px 0 0;color:#F5F7FA">English में भी: <a href="/en/aptitude-test.html" style="color:#F9A825;font-weight:800">Free 24-question preview in English →</a></p>';
const BRIDGE='<svg viewBox="0 0 760 360" role="img" aria-label="6 रुचि से 24 क्षेत्र और 951 उद्यम तक" style="width:100%;max-width:760px;display:block;margin:10px auto;background:#FFFFFF;border:2px solid #0B1F3A;border-radius:14px">'
+'<g font-family="Noto Sans Devanagari,Inter" text-anchor="middle">'
+'<text x="380" y="34" font-size="20" font-weight="800" fill="#0B1F3A">रास्ता: 6 रुचि → ACS जोड़-इंजन → 24 क्षेत्र → '+U_TOTAL+' उद्यम-श्रेणियाँ</text>'
+'<g font-size="16" fill="#0B1F3A">'
+'<rect x="26" y="56" width="112" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="82" y="82">हाथ का काम</text>'
+'<rect x="146" y="56" width="112" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="202" y="82">खोजबीन</text>'
+'<rect x="266" y="56" width="112" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="322" y="82">कला</text>'
+'<rect x="386" y="56" width="112" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="442" y="82">लोग-सेवा</text>'
+'<rect x="506" y="56" width="112" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="562" y="82">उद्यम-अगुआई</text>'
+'<rect x="626" y="56" width="108" height="40" rx="9" fill="none" stroke="#1565C0" stroke-width="2.5"/><text x="680" y="82">हिसाब-क्रम</text>'
+'</g>'
+'<text x="380" y="118" font-size="16" fill="#0B1F3A" opacity=".85">(RIASEC की 6 रुचियाँ, 1959 से)</text>'
+'<path d="M380 126 v26" stroke="#F9A825" stroke-width="4"/><path d="M372 148 l8 12 8 -12z" fill="#F9A825"/>'
+'<rect x="150" y="166" width="460" height="52" rx="12" fill="#0B1F3A"/>'
+'<text x="380" y="190" font-size="18" font-weight="800" fill="#F9A825">ACS जोड़-इंजन</text>'
+'<text x="380" y="211" font-size="15" fill="#F5F7FA">हर प्रश्न पर पहले से क्षेत्र-विवरण · गिनती सीधा गणित</text>'
+'<path d="M380 222 v26" stroke="#F9A825" stroke-width="4"/><path d="M372 244 l8 12 8 -12z" fill="#F9A825"/>'
+'<rect x="96" y="262" width="260" height="46" rx="12" fill="none" stroke="#2E7D32" stroke-width="3"/>'
+'<text x="226" y="291" font-size="18" font-weight="800" fill="#2E7D32">24 काम के क्षेत्र</text>'
+'<path d="M360 285 h38" stroke="#F9A825" stroke-width="4"/><path d="M392 277 l12 8 -12 8z" fill="#F9A825"/>'
+'<rect x="408" y="262" width="260" height="46" rx="12" fill="#2E7D32"/>'
+'<text x="538" y="291" font-size="18" font-weight="800" fill="#FFFFFF">'+U_TOTAL+' उद्यम-श्रेणियाँ</text>'
+'<text x="380" y="340" font-size="15" fill="#0B1F3A" opacity=".85">नतीजे में 24 क्षेत्रों के अंक और आगे कोर्स व उद्यम की सीधी कड़ी मिलती है।</text>'
+'</g></svg>';
const LIMITBOX='<div class="cz-limit"><b>सीमा का साफ़ सच:</b> ACS का अपना अंक-मॉडल अभी जाँच-चरण (validation phase) में है। pilot-सैंपल और reliability जैसे आँकड़े अभी प्रकाशित नहीं हुए हैं। '+Q_TOTAL+' प्रश्न होना अपने-आप वैज्ञानिक प्रमाण नहीं है। इसीलिए नतीजा सलाह है, फ़ैसला नहीं। आगे counsellor या अपने अनुभव से पक्का करें।</div>';
const PRIVTABLE='<table class="cz-priv"><tr><th>चीज़</th><th>कहाँ रहती है?</th></tr>'
+'<tr><td>झलक के जवाब (24 प्रश्न)</td><td>सिर्फ़ आपके फ़ोन में।</td></tr>'
+'<tr><td>पूरे टेस्ट के जवाब (120 प्रश्न)</td><td>सिर्फ़ आपके फ़ोन में।</td></tr>'
+'<tr><td>पूरे टेस्ट का नतीजा-सार (login पर)</td><td>आपके ACS खाते में server पर, अपने-आप: ताकि फ़ोन बदलने पर भी पिछला नतीजा मिल जाए।</td></tr>'
+'<tr><td>नाम व खाता (रजिस्ट्रेशन पर)</td><td>ACS के server पर।</td></tr>'
+'<tr><td>भुगतान</td><td>Razorpay के सुरक्षित पन्ने पर। ACS के पास card-नंबर कभी नहीं आता।</td></tr>'
+'<tr><td>भुगतान की रसीद (order-नंबर व स्थिति)</td><td>ACS के server पर।</td></tr>'
+'<tr><td>₹125 रिपोर्ट का सार (नाम, टेस्ट-नाम, अंक-सार, नंबर)</td><td>ACS के server पर। QR-जाँच इसी से चलती है।</td></tr>'
+'<tr><td>QR-जाँच में क्या दिखता है?</td><td>सिर्फ़ रिपोर्ट-नंबर और असली या नक़ली की स्थिति।</td></tr></table>'
+'<p style="font-size:17px;text-align:center;margin:8px 0 0">झलक बिना खाते के चलती है। झलक में आपके टेस्ट-उत्तर, नाम या खाते की कोई जानकारी ACS server पर नहीं भेजी जाती। पेज खुलने के सामान्य web-log हर वेबसाइट की तरह बनते हैं।</p>';
const MINORBAR='<div class="cz-minor">📢 18 से कम उम्र वालों के लिए: यह करियर-खोज का औज़ार है, करियर का फ़ैसला नहीं। नतीजा माता-पिता, अभिभावक या शिक्षक के साथ देखें। भुगतान अभिभावक की सहमति से ही करें। 10 से 13 की उम्र में इसे करियर-खोज का अभ्यास मानें, पक्की जाँच नहीं।</div>';
const FEE_NOTE='<p style="font-size:18px;line-height:1.8;max-width:760px;margin:0 auto 10px"><b>फीस का साफ़ हिसाब:</b> नतीजे के लिए कोई अलग शुल्क नहीं है। 24-प्रश्न झलक 0 रुपये की है। पूरे 120-प्रश्न टेस्ट का एक चांस 100 रुपये का है। <b>ACS Golden Pass की मूल फीस 300 रुपये है</b>; 10 से 17 वर्ष में जन्मतिथि के अनुसार उम्र-आधारित छूट अपने-आप लगती है। छपने-लायक़ रिपोर्ट 125 रुपये की है, मर्ज़ी हो तो।</p>';

const GOLDPASS='<div class="cz-goldpass" aria-label="ACS Golden Pass: विद्यार्थी गोल्डन बैज">'+
'<div class="cz-gphead"><div><span class="cz-gpkicker">🏅 ACS GOLDEN PASS</span><h3 class="cz-gptitle">एक पास · 365 दिन · बार-बार उपयोग</h3><p class="cz-gpsub">Student Golden Badge: ACS की शामिल विद्यार्थी-सेवाओं के लिए सालाना पास।</p></div>'+
'<div class="cz-gpprice"><b>₹300</b><span>मूल फीस · 18 वर्ष या अधिक</span><br><span>10–17 वर्ष: DOB से स्वतः छूट</span></div></div>'+
'<div class="cz-gpstrip"><div class="cz-gppill">♾️ पूरा Career Interest Test<br>असीमित बार</div><div class="cz-gppill">📅 365 दिन<br>payment verification से</div><div class="cz-gppill">⚡ Student badge<br>तुरंत सक्रिय</div></div>'+
'<div class="cz-gpbox"><h4>✅ अभी Golden Pass में क्या शामिल है?</h4><p><b>120-प्रश्न Career Interest Test</b> साल भर जितनी बार चाहें दें; हर attempt पर 100 रुपये अलग नहीं लगते। नतीजा साथ में दिखता है, अलग result-fee नहीं।</p><p><b>वेबसाइट-व्यापी पास नियम:</b> आगे ACS की जिस सेवा पर <b>“GOLDEN PASS INCLUDED”</b> लिखा होगा, active pass से वह सुविधा मिलेगी। ₹125 की printable report, paid certificate या दूसरी अलग-fee सेवा तब तक pass में शामिल नहीं मानी जाएगी जब तक उस सेवा पर साफ़ “Golden Pass Included” न लिखा हो।</p></div>'+
'<div class="cz-gpbox"><h4>🪪 Golden Pass कैसे लें?</h4><ol class="cz-gpsteps"><li>अपने ACS खाते में <b>login</b> करें।</li><li><b>Student</b> भूमिका में registration पूरा करें; सही जन्मतिथि (DOB) जरूरी है।</li><li><b>Dashboard → Golden Badge / Golden Pass</b> खोलें।</li><li>Server आपकी payment-day उम्र DOB से निकालेगा और सही fee खुद तय करेगा; गाँव/क़स्बा/महानगर का अलग rate Student Golden पर नहीं है।</li><li>दिखी हुई रकम केवल आधिकारिक <b>Razorpay</b> से जमा करें।</li><li>Payment signature verify होते ही Student Golden Pass <b>तुरंत 365 दिन</b> के लिए active हो जाता है। Active/pending badge हो तो दोबारा खरीद नहीं करनी चाहिए।</li></ol></div>'+
'<div class="cz-gpbox"><h4>🎓 18 वर्ष से कम उम्र की छूट</h4><p>न्यूनतम उम्र <b>10 वर्ष</b> है। 18 से कम हर पूरे वर्ष पर ₹300 की मूल फीस का 12% यानी ₹36 घटता है। उम्र payment-day पर DOB से server निकालता है। 18 से कम भुगतान अभिभावक की सहमति से करें।</p>'+
'<table class="cz-age" aria-label="Golden Pass age discount table"><thead><tr><th>उम्र</th><th>छूट</th><th>देय फीस</th></tr></thead><tbody>'+
'<tr><td>10</td><td>96%</td><td>₹12</td></tr><tr><td>11</td><td>84%</td><td>₹48</td></tr><tr><td>12</td><td>72%</td><td>₹84</td></tr><tr><td>13</td><td>60%</td><td>₹120</td></tr><tr><td>14</td><td>48%</td><td>₹156</td></tr><tr><td>15</td><td>36%</td><td>₹192</td></tr><tr><td>16</td><td>24%</td><td>₹228</td></tr><tr><td>17</td><td>12%</td><td>₹264</td></tr><tr><td>18 या अधिक</td><td>0%</td><td>₹300</td></tr>'+
'</tbody></table></div>'+
'<div class="cz-gpactions"><a href="/join.html" style="background:#0B1F3A;color:#FFD76A">नया छात्र: रजिस्ट्रेशन →</a><a href="/dashboard/" style="background:#2E7D32;color:#fff">पहले से registered: Dashboard →</a></div></div>';

const WORLD_PASS='<details class="cz-worldpass"><summary>🌍 दुनिया में “एक सदस्यता, बार-बार उपयोग” मॉडल कहाँ मिलता है?</summary><div class="cz-wpgrid">'+
'<div class="cz-wpc"><b>Coursera Plus · वैश्विक</b><p>एक subscription से हजारों courses और programs तक access का मॉडल। <a href="https://www.coursera.org/" target="_blank" rel="noopener">आधिकारिक साइट →</a></p></div>'+
'<div class="cz-wpc"><b>Udemy Personal Plan · भारत सहित अनेक देश</b><p>एक plan में चुने हुए courses और learning resources तक subscription access। <a href="https://www.udemy.com/personal-plan/" target="_blank" rel="noopener">आधिकारिक साइट →</a></p></div>'+
'<div class="cz-wpc"><b>Skillshare Membership · वैश्विक online</b><p>Membership active रहने तक हजारों creative classes का unlimited access मॉडल। <a href="https://www.skillshare.com/" target="_blank" rel="noopener">आधिकारिक साइट →</a></p></div>'+
'<div class="cz-wpc"><b>LinkedIn Premium Career · अनेक बाज़ार</b><p>Career subscription में LinkedIn Learning access जैसी bundled सेवाएँ शामिल होती हैं। <a href="https://premium.linkedin.com/careers/career" target="_blank" rel="noopener">आधिकारिक साइट →</a></p></div>'+
'</div><p style="font-size:16px;line-height:1.7;margin:0 14px 14px;color:#0B1F3A"><b>नोट:</b> ये केवल membership/pass मॉडल के उदाहरण हैं। ACS का उनसे कोई साझेदारी या समान-सेवा दावा नहीं है; ACS Golden Pass के लाभ वही हैं जो ACS पेज पर स्पष्ट लिखे हों।</p></details>';
const ISO_NOTE='<p style="font-size:17px;text-align:center;max-width:760px;margin:8px auto 0;color:#0B1F3A">नोट: FFGPMTrust का ISO 9001 प्रमाणन संस्था की कार्य-प्रणाली (Quality Management System) का है। यह इस टेस्ट का psychometric प्रमाणन नहीं है।</p>';

const FABSCRIPT='<script>(function(){var t=0,h=0;function f(s){var L=[document.querySelector(".udy-float"),document.querySelector(".acs-wa")];for(var i=0;i<L.length;i++){var e=L[i];if(e){e.style.transition="opacity .25s";e.style.opacity=s?"":"0";e.style.pointerEvents=s?"":"none";}}}window.addEventListener("scroll",function(){var y=window.pageYOffset||document.documentElement.scrollTop||0;if(y>h+24){f(false);}else if(y<h-8){f(true);}h=y;clearTimeout(t);t=setTimeout(function(){f(true);},900);},{passive:true});})();</scr'+'ipt>';
build({out:"career.html", ver:"v1.7.2", foot:[FABSCRIPT],
 title:"अपना करियर चुनें — 24 प्रश्न की मुफ़्त झलक + पूरा टेस्ट (Career Interest Test) | ACS",
 desc:"24 प्रश्न की मुफ़्त अभिरुचि-झलक (Career Interest Test): जानिए आपका मन किस काम में लगेगा। सही या ग़लत कुछ नहीं। पूरा 120-प्रश्न टेस्ट भी है। हिंदी में, अपने फ़ोन पर।",
 content:careerAudit_run(
 APTCSS+CZ+HERO2+CTAROW+
 h1("🧭","अपना करियर चुनें")+WRAP_S+
 P('<b>सबसे बड़ा सवाल:</b> "मैं क्या बनूँ?" इसका जवाब कोई और नहीं दे सकता। जवाब आपके अपने मन में है। ACS का <b>अभिरुचि-टेस्ट (Career Interest Test)</b> वही जवाब बाहर निकालता है।')+
 stepSVG("सवालों के जवाब दो","मन की रुचि नापो","अपनी राह पाओ","तीन कदम: सवालों के जवाब दो, मन की रुचि नापो, अपनी राह पाओ")+
 sec("❓ यह टेस्ट क्या है?",
  P('साफ़ बात पहले: यह <b>रुचि (interest)</b> नापने का टेस्ट है। यह योग्यता (aptitude) या ज्ञान की परीक्षा <b>नहीं</b> है। कोई जवाब सही या ग़लत नहीं होता। सवाल रोज़ की ज़िंदगी से आते हैं: घर, खेत, बाज़ार, मोबाइल, खेल। आप बस बताइए क्या पसंद है, क्या नहीं।')+
  P('जिस काम में मन लगे, उसमें तरक़्क़ी तेज़ होती है। इसीलिए दुनिया-भर के स्कूल और कंपनियाँ ऐसे रुचि-टेस्ट कराती हैं। गाँव-देहात में बहुत लोगों को पता नहीं कि ऐसा टेस्ट भी होता है। अब आप जान गए।')+
  P('पीछे का विज्ञान: दुनिया-भर में माना गया RIASEC रुचि-विज्ञान, सन 1959 से। उसी से प्रेरित ACS-इंजन आपके जवाबों से 24 क्षेत्रों में रुचि नापता है।')+CZSTATS)+
 sec("🎁 इस टेस्ट के 6 बड़े फ़ायदे",'<div class="cz-grid">'+
  '<div class="cz-card"><h3>🧭 दिशा साफ़</h3><p>टेस्ट आपके सबसे मज़बूत 4 क्षेत्र बताता है। पूरे 24 क्षेत्रों के अंक भी मिलते हैं। अंक घटते क्रम में दिखते हैं।</p></div>'+
  '<div class="cz-card"><h3>🌍 आगे की सीधी राह</h3><p>नतीजे के साथ कोर्स की सीधी कड़ी मिलती है। 950 से ज़्यादा उद्यमों की कड़ी भी मिलती है। पढ़ाई वहीं से शुरू हो जाती है।</p></div>'+
  '<div class="cz-card"><h3>🔍 अनजान क्षेत्र भी दिखें</h3><p>दुनिया में बहुत तरह के काम हैं। कई काम हम जानते ही नहीं। टेस्ट वे काम भी सामने लाता है।</p></div>'+
  '<div class="cz-card"><h3>🗣️ भाषा बिल्कुल सरल</h3><p>सवाल रोज़ की ज़िंदगी से हैं। भाषा कक्षा-6 जैसी हिंदी है। मुफ़्त झलक English में भी है।</p></div>'+
  '<div class="cz-card"><h3>📱 आपकी निजता</h3><p>टेस्ट के जवाब आपके फ़ोन में रहते हैं। झलक बिना login चलती है। पूरा ब्योरा नीचे निजता-तालिका में है।</p></div>'+
  '<div class="cz-card"><h3>🛡️ झूठे वादे नहीं</h3><p>नतीजा दिशा दिखाता है। यह क़िस्मत नहीं लिखता। फ़ैसला हमेशा आपका है।</p></div></div>')+
 sec("📊 नतीजा कैसा दिखेगा? नमूना देखिए",
  P('टेस्ट पूरा होते ही फ़ोन पर ऐसा नतीजा खुलता है। नीचे की तस्वीर सिर्फ़ नमूना है, नाम और अंक बनावटी हैं।')+
  RES2)+
 sec("🧬 विज्ञान और सीमा: पूरा सच",
  P('ढाँचा RIASEC (1959) पर आधारित/प्रेरित है। RIASEC में 6 तरह की रुचियाँ होती हैं। ACS के '+Q_TOTAL+' प्रश्न '+U_TOTAL+' उद्यम-श्रेणियों की अपनी सूची से बने हैं। यह गिनती मशीन से होती है, हाथ से नहीं लिखी जाती। हर प्रश्न पर पहले से क्षेत्र-विवरण लगा है। इसी से 24 क्षेत्रों के अंक बनते हैं।')+
  BRIDGE+
  P('गिनती सीधा गणित है: कोई AI आपका नतीजा नहीं बनाता। प्रश्न-चयन गतिशील (dynamic question selection) है: पूरे टेस्ट के बीच के खंड आपके मज़बूत क्षेत्रों में गहरे जाते हैं। हम इससे बड़ा कोई तकनीकी दावा नहीं करते।')+
  LIMITBOX)+
 sec("₹ ACS की फीस: पूरा हिसाब, कुछ छिपा नहीं",FEE_NOTE+'<div class="cz-fee">'+
  '<div class="cz-fc" style="border-color:#1565C0;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #1565C0,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#EAF2FF 55%,#DCE9FF 100%)"><div class="cz-price" style="color:#1565C0">🆓 0 रुपये</div><h3>मुफ़्त झलक</h3><p>इसमें 24 सवाल हैं। 10 से 12 मिनट लगते हैं। login या रजिस्ट्रेशन नहीं चाहिए। नतीजा साथ में ही दिखता है, अलग शुल्क नहीं।</p><a class="cz-btn" style="background:#1565C0" href="/aptitude-test.html#apt-start">मुफ़्त झलक शुरू करें →</a></div>'+
  '<div class="cz-fc" style="border-color:#F9A825;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #F9A825,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#FFF6DC 55%,#FFE9A8 100%)"><div class="cz-price" style="color:#0B1F3A">🎫 100 रुपये</div><h3>1 पूरा टेस्ट</h3><p>इसमें 120 सवाल हैं। समय 90 मिनट का है। बीच में कहानी-विराम आते हैं। नतीजा साथ में ही दिखता है, अलग शुल्क नहीं। पहले रजिस्ट्रेशन करें। फिर टेस्ट-पेज पर ही 100 रुपये का बटन मिलता है।</p><a class="cz-btn" style="background:#F9A825;color:#0B1F3A" href="/aptitude-test.html#apt-full">पूरा टेस्ट यहीं से →</a></div>'+
  '<div class="cz-fc" style="border-color:#0B1F3A;box-shadow:0 2px 0 #0B1F3A,0 6px 0 #0B1F3A,0 12px 22px rgba(11,31,58,.22),inset 0 2px 0 #fff;background:linear-gradient(160deg,#FFFFFF 0%,#EDF0F5 55%,#DCE2EC 100%)"><div class="cz-price" style="color:#0B1F3A">📜 125 रुपये</div><h3>छपने लायक़ रिपोर्ट (वैकल्पिक)</h3><p>नतीजे के बाद उसी पेज से मिलती है। इस पर आपका नाम, unique नंबर और QR होता है। दुनिया में कहीं से असली-नक़ली जाँच हो जाती है। यह रिपोर्ट है, योग्यता-प्रमाणपत्र नहीं। न लें तो भी नतीजा दिखता ही है।</p><a class="cz-btn" style="background:#0B1F3A" href="/aptitude-test.html#apt-full">पहले टेस्ट दें →</a></div>'+
  '</div>'+GOLDPASS+WORLD_PASS+
  '<p style="font-size:17px;text-align:center;margin:12px 0 0">⚠️ भुगतान केवल आधिकारिक Razorpay से। हर फीस का वापसी-नियम साफ़ लिखा है: <a href="/refund.html" style="color:#1565C0;font-weight:700">रिफंड-नीति देखें</a>।</p>'+ISO_NOTE)+
 sec("🔒 निजता: क्या कहाँ रहता है?",PRIVTABLE)+
 MINORBAR+
 sec("📜 125 रुपये की रिपोर्ट में क्या मिलेगा? नमूना देखिए",
  P('• रिपोर्ट में आपका नाम और ACS ID छपते हैं।<br>• टेस्ट का नाम, तारीख़ और समय भी छपते हैं।<br>• ⭐ सबसे प्रबल रुचि और सुझाए 4 क्षेत्र छपते हैं।<br>• पूरे 24 क्षेत्रों के अंक घटते क्रम में छपते हैं।<br>• Unique नंबर और QR लगा होता है। दुनिया में कहीं से असली-नक़ली जाँच हो जाती है।<br>• PDF छपने लायक़ होती है। इसे profile, स्कूल या WhatsApp पर share कर सकते हैं।')+
  CERT2+
  P('हर बार का टेस्ट अलग तारीख़ और अंक के साथ अपनी अलग रिपोर्ट बनाता है। यह अभिरुचि-रिपोर्ट है, योग्यता का प्रमाणपत्र नहीं। रिपोर्ट लेना पूरी तरह आपकी मर्ज़ी है।'))+
 sec("🛡️ भरोसा",
  P('टेस्ट के जवाब आपके फ़ोन में रहते हैं। नतीजा दिशा दिखाता है: फ़ैसला हमेशा आपका। "100 प्रतिशत गारंटी" जैसे झूठे दावे ACS कभी नहीं करता।'))+
 '<details class="cz-acc"><summary>🌍 दुनिया के 10 जाने-माने करियर-जाँच औज़ार: तुलना खोलें</summary><div class="cz-accin">'+
  P('दुनिया की जानी-मानी टेस्ट-साइटों में से 10 प्रमुख उदाहरण नीचे हैं। ध्यान रखें: ये सब एक ही चीज़ नहीं नापते। कोई रुचि नापता है, कोई स्वभाव, कोई ताक़त, कोई योग्यता। इसलिए दाम की सीधी बराबरी ठीक नहीं: दाम सिर्फ़ जानकारी के लिए हैं।')+
  TOP10+ACSLINE+
  '<h3 style="font-size:20px;color:#0B1F3A;margin:16px 0 6px">⚖️ वहाँ और यहाँ: फ़र्क़ देखिए</h3>'+FARQ+
 '</div></details>'+
 CTA("/aptitude-test.html#apt-start","🧭 24 प्रश्न की मुफ़्त झलक शुरू करें →")+
 '</div>'+SLOT+
 cross([["/bhasha.html","🗣️ नई भाषा सीखें"],["/hunar.html","🛠️ नया हुनर सीखें"],["/udyam-shuruat.html","🏭 अपना उद्यम शुरू करें"]]))
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
 foot:['<script src="/assets/courses_data.js"></scr'+'ipt>','<script>(function(){try{var A=[].concat(typeof SELF_EMP_COURSES!=="undefined"?SELF_EMP_COURSES:[],typeof PRIVATE_JOB_COURSES!=="undefined"?PRIVATE_JOB_COURSES:[],typeof GOVT_JOB_COURSES!=="undefined"?GOVT_JOB_COURSES:[],typeof GOVT_SCHOLAR_COURSES!=="undefined"?GOVT_SCHOLAR_COURSES:[],typeof ACADEMIC_COURSES!=="undefined"?ACADEMIC_COURSES:[]);var seen={},R=[];A.forEach(function(c){if(!c||!c.url)return;var u=String(c.url);if(u.indexOf("/bhasha/")>-1||u.indexOf("/courses/")!==0)return;if(seen[u])return;seen[u]=1;R.push(c);});\n/* Founder-क्रम (08-Nov): 12 कोर्स इसी क्रम में; नया कोर्स जुड़े तो सूची-अंत में अपने-आप */\nvar ORD=["digital-mitra-basic","first-code","/digital/ecom","/digital/dca","ai-digital-master","vocational/printer","/welding/","two-wheeler","four-wheeler-driver","mushroom-cultivation-marketing","kaithi-lipi","tirhuta-lipi"];\nR.sort(function(a,b){function k(c){var u=String(c.url);for(var i=0;i<ORD.length;i++){if(u.indexOf(ORD[i])>-1)return i;}return 99;}return k(a)-k(b);});\nvar box=document.getElementById("hnList");if(box&&R.length){var h="";\n/* 3D रंगीन बटन — नीला/सुनहरा/हरा बारी-बारी (कार्ड-रूप नियम) */\nvar TH=[["#1565C0","#0B1F3A","#fff","rgba(255,255,255,.88)"],["#F9A825","#c47f12","#0B1F3A","#5a4100"],["#2E7D32","#1b5e20","#fff","rgba(255,255,255,.88)"]];\nR.forEach(function(c,i){var nm=(c.t2&&c.t2[0])?c.t2[0]:(c.name_hi||"");var t=TH[i%3];\nh+=\'<a href="\'+c.url+\'" style="display:block;margin:12px auto;max-width:620px;background:\'+t[0]+\';color:\'+t[2]+\';border:0;border-bottom:5px solid \'+t[1]+\';border-radius:14px;padding:14px 16px;text-decoration:none;font-size:18px;font-weight:800;box-shadow:0 4px 12px rgba(11,31,58,.22);text-align:center">\'+nm+\' <span style="display:block;margin-top:4px;color:\'+t[3]+\';font-size:16px;font-weight:700">(\'+(c.lessons||"")+\' पाठ · मुफ़्त)</span></a>\';});\nbox.innerHTML=h;}}catch(e){}})();</scr'+'ipt>'],
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
