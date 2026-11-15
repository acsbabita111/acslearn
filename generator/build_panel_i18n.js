/* ════════════════════════════════════════════════════════════
   build_panel_i18n.js v1.2 · 15-Nov-2026 · पैनल-भाषा-पैक का generator (परत-4)
   v1.1 (पैनल-1ख): दायरे में रजिस्ट्रेशन गाइड (registration-guide.html) और matrix की पद-योग्यताएँ।
   v1.2 (शब्द-सूची): English पैक पर generator/data/vocab_en.json के नियम (उद्यम = Enterprise)। पैक का ढाँचा-संस्करण (VER) वही 1.1।
   उपयोग (repo-root से):  node generator/build_panel_i18n.js en [--check]
   स्रोत (एक चीज़ = एक जगह):
     1. assets/roles.js, assets/designation_matrix.js, assets/geo/countries.js,
        assets/links.js में पहले से दर्ज हिंदी→English जोड़े (hi/en, desc_hi/desc_en,
        hint_hi/hint_en, ph_hi/ph_en, label/label_en)।
     2. generator/data/panel_i18n/<भाषा>.json : हाथ से लिखा शब्दकोश ("ui") और
        भारत के राज्य/जिले ("geo")। यही जीतता है अगर दोनों में एक ही कुंजी हो।
   बनता है: assets/i18n/panel_<भाषा>.js (हाथ से न बदलें)।
   पहरा (fail-closed): (क) हर मान भरा हो, उसमें देवनागरी, "—" या U+FFFD न हो; English में शब्द-सूची (vocab_en.json) भी;
   (ख) पहुँच-जाँच: लॉगिन और रजिस्ट्रेशन टेम्पलेट, रजिस्ट्रेशन गाइड (+ पदों की योग्यता), acs-universal.js (भाषा-नाम तालिकाएँ छोड़कर),
   हर नियम-फ़ाइल का "आपकी जानकारी" डिब्बा (idbox),
   roles.js (भूगोल की पुरानी सूची छोड़कर) और matrix के नाम का हर हिंदी टुकड़ा इंजन (assets/panel_i18n.js) से
   पूरा बदलना चाहिए; न बदले तो फ़ाइल नहीं लिखी जाती। सिर्फ़ SKIP वाले छूटते हैं।
   ═══════════════════════════════════════════════════════════ */
"use strict";
const fs=require("fs"), path=require("path"), vm=require("vm");
const ROOT=path.join(__dirname,"..");
const LANG=(process.argv[2]||"").trim(), CHECK=process.argv.indexOf("--check")>-1;
if(!/^[a-z]{2,3}$/.test(LANG)||LANG==="hi"){ console.log("उपयोग: node generator/build_panel_i18n.js <भाषा-कोड> [--check]"); process.exit(1); }
const DEV=/[ऀ-ॿ]/;
const VER="1.1";
/* पैक किन हिस्सों को ढकता है (पैनल-खेपों के साथ बढ़ेगा)। सब हिस्से पूरे = complete:true।
   करियर-टेस्ट की नई भाषा का द्वार (lib_apt_langs.js panelGate) इसी पर चलता है। */
const SCOPE=["login","join","guide"];
const ALL_AREAS={ en:["login","join","guide","dash-ext","dash-team","server","canvas","rules"] };
/* ये हिंदी टुकड़े पन्ने पर दिखते ही नहीं (सिर्फ़ console या कोड के भीतर) — इसलिए अनुवाद नहीं */
const SKIP=new Set([
  "Firebase init विफल:", "requestRegisterOtp त्रुटि:", "resend त्रुटि:", "cancelApplication त्रुटि:",
  "verifyRegisterOtp त्रुटि:", "submitRegistration त्रुटि:",
  "ज्ञ", "क्ष", "त्र"   /* नाम को देवनागरी में बदलने वाली अक्षर-तालिका (दिखती नहीं) */
]);
const KEEP_SHORT=new Set(["या","पद","और"]);   /* 2 अक्षर से छोटे जो सचमुच दिखते हैं */

function readJSON(p){ return JSON.parse(fs.readFileSync(path.join(ROOT,p),"utf8")); }
function sandbox(files){
  const sb={window:{},console:{log(){},error(){},warn(){}}}; sb.self=sb.window; vm.createContext(sb);
  for(const f of files){ let s=fs.readFileSync(path.join(ROOT,f),"utf8");
    s=s.replace(/^const (ACS_LINKS|ACS_CONFIG)\b/m,"var $1"); vm.runInContext(s,sb,{filename:f}); }
  return sb;
}
const norm=(t)=>String(t).replace(/\s+/g," ").trim();

/* ---------- 1. data में दर्ज जोड़े ---------- */
const auto=new Map(), autoConf=[];
function add(hi,en,src){
  if(typeof hi!=="string"||typeof en!=="string") return;
  hi=norm(hi); en=norm(en); if(!DEV.test(hi)||!en||DEV.test(en)) return;
  if(auto.has(hi)&&auto.get(hi).en!==en) autoConf.push(hi+" | "+auto.get(hi).en+" | "+en+" ("+src+")");
  if(!auto.has(hi)) auto.set(hi,{en,src});
}
const SB=sandbox(["assets/designation_matrix.js","assets/roles.js","assets/geo/countries.js","assets/links.js"]);
const W=SB.window, MX=W.ACS_DESIGNATIONS, RR=W.ACS_ROLES;
const seen=new Set();
function walkPairs(o,src){
  if(!o||typeof o!=="object"||seen.has(o)) return; seen.add(o);
  if(Array.isArray(o)){ o.forEach(x=>walkPairs(x,src)); return; }
  add(o.hi,o.en,src); add(o.desc_hi,o.desc_en,src); add(o.hint_hi,o.hint_en,src); add(o.ph_hi,o.ph_en,src);
  add(o.label,o.label_en,src); add(o.public_label,o.label_en,src);
  for(const k in o){ if(k==="geo") continue; let v; try{ v=o[k]; }catch(e){ continue; } if(v&&typeof v==="object") walkPairs(v,src); }
}
walkPairs(MX,"matrix"); walkPairs(RR,"roles");
for(const k of [...(MX.teams||[]).map(t=>t.key),...(MX.cards||[]).map(c=>c.key)]){ try{ const c=RR.byKey(k); if(c) walkPairs(c,"roles.byKey"); }catch(e){} }
(W.ACS_GEO_COUNTRIES||[]).forEach(c=>add(c.hi,c.en,"countries"));
const LK=SB.ACS_LINKS||W.ACS_LINKS;
if(LK){ LK.menu.forEach(m=>{ add(m.label,m.label_en,"links"); add(m.icon+" "+m.label,m.icon+" "+m.label_en,"links"); }); add(LK.login.label.hi,LK.login.label.en,"links"); }
if(autoConf.length){ console.log("⛔ data-फ़ाइलों में एक ही हिंदी के दो English:"); autoConf.forEach(x=>console.log("   "+x)); process.exit(1); }

/* ---------- 2. हाथ का शब्दकोश ---------- */
const MAN=readJSON("generator/data/panel_i18n/"+LANG+".json");
if(MAN.lang!==LANG){ console.log("⛔ "+LANG+".json में lang खाना ग़लत"); process.exit(1); }
const D={}; let overrides=0;
for(const [h,v] of auto) D[h]=v.en;
for(const sec of ["ui","geo"]) for(const [h0,e] of Object.entries(MAN[sec]||{})){
  const h=norm(h0); if(D[h]!==undefined&&D[h]!==e) overrides++; D[h]=e; }
/* जगहों के नाम (देश, राज्य, जिले): ये वाक्य के बीच में सिर्फ़ ":" "," "·" "(" के बाद और "," "·" ")" या अंत से पहले बदलते हैं।
   कारण: "गया" (जिला) और "गया" (क्रिया), "माली" (देश) और "माली" (बागवान) एक जैसे लिखे जाते हैं। */
const GEOK=new Set();
for(const [h,v] of auto) if(v.src==="countries") GEOK.add(h);
for(const h0 of Object.keys(MAN.geo||{})) GEOK.add(norm(h0));

/* ---------- 3. पहरा (क): मानों की शुद्धता ---------- */
const bad=[];
for(const [h,e] of Object.entries(D)){
  if(!DEV.test(h)) bad.push("कुंजी में देवनागरी नहीं: "+h);
  if(typeof e!=="string"||!e.trim()) bad.push("ख़ाली मान: "+h);
  else { if(DEV.test(e)) bad.push("मान में देवनागरी: "+h+" → "+e);
         if(e.indexOf("—")>-1) bad.push("मान में — (em dash): "+h+" → "+e);
         if(e.indexOf("�")>-1||h.indexOf("�")>-1) bad.push("U+FFFD: "+h); }
}
/* (v1.2, 15-Nov) English शब्द-सूची (Founder की हाँ, 15-Nov-2026): नियम का घर generator/data/vocab_en.json।
   V1: हिंदी में "उद्यम" हो, तो English में "industry" उतनी ही बार जितनी बार हिंदी में "उद्योग"।
   V2/V3: English में "950 industries/sectors" या "🌍 Industries" नहीं। (पूरी साइट: dev_vocab_en_check.js) */
if(LANG==="en"){ const VOC=JSON.parse(fs.readFileSync(path.join(ROOT,"generator/data/vocab_en.json"),"utf8"));
  const r1=VOC.pair_rules.find(r=>r.id==="V1"), hi1=new RegExp(r1.hi_re), en1=new RegExp(r1.en_count_re,"gi"), al1=new RegExp(r1.hi_allow_re,"g");
  for(const [h,e] of Object.entries(D)){ if(typeof e!=="string") continue;
    if(hi1.test(h)&&(e.match(en1)||[]).length>(h.match(al1)||[]).length) bad.push("शब्द-सूची V1 ('उद्यम' = Enterprise, industry नहीं): "+h+" → "+e);
    for(const r of VOC.never_en) if(new RegExp(r.re,"i").test(e)) bad.push("शब्द-सूची "+r.id+": "+h+" → "+e); } }

/* ---------- 4. पहरा (ख): पहुँच-जाँच ---------- */
function segsMarkup(s){ const out=[]; for(let t of s.split(/<[^>]*>/)){ t=norm(t); if(t&&DEV.test(t)) out.push(t); } return out; }
/* JS के सब string (', ", ` ) — टिप्पणी और regex-literal पहचानकर (एक छोटा tokenizer;
   सिर्फ़ regex-अनुमान वाला पुराना तरीक़ा quote/टिप्पणी में भटककर टुकड़े छोड़ देता था) */
function jsStrings(code){
  const out=[]; let i=0, n=code.length, prev="";   /* prev = पिछला सार्थक चिह्न/शब्द */
  const RX_BEFORE=/[(,=:[!&|?{};+\-*%<>~^]$|^(return|typeof|case|do|else|in|of|new|delete|void|throw)$/;
  while(i<n){
    const c=code[i], d=code[i+1];
    if(c==="/"&&d==="/"){ const e=code.indexOf("\n",i); i=e<0?n:e; continue; }
    if(c==="/"&&d==="*"){ const e=code.indexOf("*/",i+2); i=e<0?n:e+2; continue; }
    if(c==="'"||c==='"'||c==="`"){
      let j=i+1, buf="";
      while(j<n&&code[j]!==c){
        if(code[j]==="\\"){ const x=code[j+1]; buf+=(x==="n"?" ":x); j+=2; continue; }
        if(c==="`"&&code[j]==="$"&&code[j+1]==="{"){ let dep=1; j+=2; while(j<n&&dep){ if(code[j]==="{")dep++; else if(code[j]==="}")dep--; j++; } buf+=" "; continue; }
        if(c!=="`"&&code[j]==="\n") break;
        buf+=code[j]; j++; }
      out.push(buf); i=j+1; prev="str"; continue; }
    if(c==="/"&&(prev===""||RX_BEFORE.test(prev))){   /* regex literal */
      let j=i+1, cls=false;
      while(j<n){ const x=code[j]; if(x==="\\"){ j+=2; continue; } if(x==="[") cls=true; else if(x==="]") cls=false; else if(x==="/"&&!cls) break; else if(x==="\n") break; j++; }
      j++; while(j<n&&/[a-z]/i.test(code[j])) j++; i=j; prev="rx"; continue; }
    if(/\s/.test(c)){ i++; continue; }
    if(/[A-Za-z0-9_$\u0080-\uffff]/.test(c)){ let j=i; while(j<n&&/[A-Za-z0-9_$\u0080-\uffff]/.test(code[j])) j++; prev=code.slice(i,j); i=j; continue; }
    prev=c; i++;
  }
  return out;
}
function literals(code){
  const out=[];
  for(let r of jsStrings(code)){ if(!r||!DEV.test(r)) continue;
    /* (v1.1) '">📝 पाठ</a>' जैसा टुकड़ा: पिछले टुकड़े में खुले attribute का बचा सिरा हटाओ, वरना पूरा पाठ छूट जाता था */
    r=r.replace(/^["']?\s*>/,"");
    /* HTML-टुकड़ा: placeholder/title/label/aria-label के मान अलग से */
    let a; const ra=/\b(?:placeholder|title|label|aria-label|alt)="([^"]*)"/g; while((a=ra.exec(r))) if(DEV.test(a[1])) out.push(norm(a[1]));
    r=r.replace(/\b(?:placeholder|title|label|aria-label|alt|style|id|class|maxlength|inputmode|type|value|data-[a-z-]+)="[^"]*"/g," ");
    for(const t of segsMarkup(r)) if(!/^["'=>]/.test(t)) out.push(t); }
  return out;
}
function htmlSegs(p){
  const s=fs.readFileSync(path.join(ROOT,p),"utf8");
  const scripts=[...s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
  let body=s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g," ").replace(/<!--[\s\S]*?-->/g," ");
  const out=[]; let a; const ra=/\b(?:placeholder|title|aria-label|alt|label|content)="([^"]*)"/g;
  while((a=ra.exec(body))) if(DEV.test(a[1])) out.push(norm(a[1]));
  out.push(...segsMarkup(body.replace(/<[^>]*\bdata-i18n-skip\b[^>]*>[\s\S]*?<\/[^>]+>/g," ")));
  scripts.forEach(sc=>out.push(...literals(sc)));
  return out;
}
const AREA_SRC={ login:["dashboard/_LOGIN_TEMPLATE.html"], join:["_JOIN_TEMPLATE.html"], guide:["registration-guide.html"] };
const need=new Map();
function want(t,src){ t=norm(t); if(!t||!DEV.test(t)||SKIP.has(t)) return; if(/^[ऀ-ॿ]{1,2}$/.test(t)&&!KEEP_SHORT.has(t)) return; if(!need.has(t)) need.set(t,src); }
for(const a of SCOPE) for(const p of AREA_SRC[a]) htmlSegs(p).forEach(t=>want(t,p));
/* लॉगिन पन्ने पर acs-universal.js भी चलता है (मेनू, footer, नीचे के बटन) : उसकी हर हिंदी पंक्ति भी।
   सिर्फ़ भाषा-सूची की तालिकाएँ (var ACS_LANG_...) छोड़कर: वहाँ भाषाओं के अपने नाम हैं, जो जान-बूझकर वैसे ही रहते हैं। */
if(SCOPE.indexOf("login")>-1){ const u=fs.readFileSync(path.join(ROOT,"assets/acs-universal.js"),"utf8").split("\n").filter(l=>!/^var ACS_LANG_/.test(l)).join("\n");
  literals(u).forEach(t=>want(t,"assets/acs-universal.js")); }
/* रजिस्ट्रेशन गाइड की पद-तालिका matrix की योग्यता-पंक्तियाँ दिखाती है */
if(SCOPE.indexOf("guide")>-1) for(const t of (MX.teams||[])) if(t.registrable&&t.qualification) want(t.qualification,"assets/designation_matrix.js (qualification)");
/* रजिस्ट्रेशन में हर भूमिका की नियम-फ़ाइल का "आपकी जानकारी" डिब्बा (idbox) भी दिखता है : वह फ़ॉर्म का हिस्सा है,
   इसलिए उसकी हर पंक्ति English में। नियम (part/rules) क़ानूनी मूल हैं : वे पैनल-6 में अलग फ़ाइल बनकर English होंगे। */
if(SCOPE.indexOf("join")>-1){ const files=new Set();
  for(const k of [...(MX.teams||[]).map(t=>t.key),...(MX.cards||[]).map(c=>c.key)]){ try{ const f=RR.ruleFileFor(k); if(f) files.add(f); }catch(e){} }
  for(const f of files){ const h=fs.readFileSync(path.join(ROOT,f),"utf8"), a=h.indexOf('<div class="idbox">');
    if(a<0) continue;
    /* idbox कहाँ ख़त्म होता है: <div> की गिनती से (भीतर के div भी गिने जाते हैं) */
    let depth=0, b=-1; const re0=/<div\b|<\/div>/g; re0.lastIndex=a; let t0;
    while((t0=re0.exec(h))){ depth+= t0[0]==="</div>" ? -1 : 1; if(depth===0){ b=re0.lastIndex; break; } }
    if(b<0){ console.log("⛔ "+f+": idbox का अंत नहीं मिला"); process.exit(1); }
    const box=h.slice(a,b); segsMarkup(box).forEach(t=>want(t,f+" (idbox)"));
    /* नियम-फ़ाइल की script idbox के लेबल/placeholder बदलती है (जैसे NAME_LABEL, SUBJECT_PH) : वे भी */
    let mm; const reT=/var\s+[A-Z_]*(?:LABEL|PH)\s*=\s*\{[^}]*\}/g; while((mm=reT.exec(h))) literals(mm[0]).forEach(t=>want(t,f+" (idbox-script)"));
    let m; const re=/placeholder="([^"]*)"/g; while((m=re.exec(box))) if(DEV.test(m[1])) want(m[1],f+" (idbox)"); } }
/* roles.js: भूगोल की पुरानी (dormant) सूची छोड़कर सब; matrix: सिर्फ़ दिखने वाले नाम */
(function(){ let s=fs.readFileSync(path.join(ROOT,"assets/roles.js"),"utf8");
  const g=s.indexOf("\n  geo: {"); if(g<0){ console.log("⛔ roles.js में geo-खंड नहीं मिला (पहुँच-जाँच)"); process.exit(1); }
  literals(s.slice(0,g)).forEach(t=>want(t,"assets/roles.js")); })();
(function walkMx(o){ if(!o||typeof o!=="object") return; if(Array.isArray(o)){ o.forEach(walkMx); return; }
  ["label","public_label"].forEach(k=>{ if(typeof o[k]==="string") want(o[k],"designation_matrix.js"); });
  for(const k in o) if(o[k]&&typeof o[k]==="object") walkMx(o[k]); })(MX);
(W.ACS_GEO_COUNTRIES||[]).forEach(c=>want(c.hi,"countries.js"));
Object.values(W.ACS_GEO_GROUPS||{}).forEach(g=>want(g,"countries.js"));
(function(){ const sb2={window:{}}; vm.createContext(sb2);
  vm.runInContext(fs.readFileSync(path.join(ROOT,"assets/geo/states/in.js"),"utf8"),sb2);
  (sb2.window.ACS_GEO_STATES.in||[]).forEach(s=>want(s.name,"geo/states/in.js"));
  for(const f of fs.readdirSync(path.join(ROOT,"assets/geo/districts"))){ const sb3={window:{}}; vm.createContext(sb3);
    vm.runInContext(fs.readFileSync(path.join(ROOT,"assets/geo/districts",f),"utf8"),sb3);
    Object.values(sb3.window.ACS_GEO_DISTRICTS).forEach(l=>l.forEach(d=>want(d,"geo/districts/"+f))); } })();
/* इंजन से अनुवाद (वही tr जो browser में चलता है) */
function engineTr(){
  const store={}; const sb={ console, setTimeout(){ }, location:{search:""},
    localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=String(v);}},
    document:{ readyState:"complete", body:null, documentElement:{setAttribute(){},classList:{add(){},remove(){}}}, head:null,
      addEventListener(){}, getElementById(){ return null; }, createElement(){ return {style:{}}; }, querySelectorAll(){ return []; }, title:"" } };
  sb.window=sb; sb.alert=sb.confirm=sb.prompt=function(){};
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(ROOT,"assets/panel_i18n.js"),"utf8"),sb,{filename:"panel_i18n.js"});
  sb.ACS_PANEL_PACKS={}; sb.ACS_PANEL_PACKS[LANG]={D:D,G:[...GEOK]};
  sb.ACS_PANEL_I18N.set(LANG);
  if(sb.ACS_PANEL_I18N.lang()!==LANG){ console.log("⛔ इंजन ने भाषा नहीं ली (panel_i18n.js की PACK-सूची में "+LANG+" है?)"); process.exit(1); }
  return sb.ACS_PANEL_I18N.tr;
}
const TR=engineTr(), miss=[];
for(const [t,src] of need){ const o=TR(t); if(DEV.test(o)) miss.push(src+" :: "+t+"  ⇒  "+o); }
if(miss.length){ bad.push("पहुँच-जाँच: "+miss.length+" हिंदी टुकड़े English में नहीं बदले:"); miss.slice(0,Number(process.env.ACS_SHOW||60)).forEach(x=>bad.push("   "+x)); }
if(bad.length){ bad.forEach(b=>console.log("  ⛔ "+b)); console.log("⛔ कोई फ़ाइल नहीं लिखी गई।"); process.exit(1); }

/* ---------- 5. पैक लिखना ---------- */
const keys=Object.keys(D).sort();
const SD={}; keys.forEach(k=>SD[k]=D[k]);
const complete=(ALL_AREAS[LANG]||[]).every(a=>SCOPE.indexOf(a)>-1);
const out="/* panel_"+LANG+".js · पैनल का "+(MAN.name||LANG)+" पैक v"+VER+" — generator/build_panel_i18n.js से बना, हाथ से न बदलें।\n"
  +"   हिंदी मूल है; यह सिर्फ़ दिखावट बदलता है। हिस्से: "+SCOPE.join(", ")+" · प्रविष्टियाँ "+keys.length+" */\n"
  +"window.ACS_PANEL_PACKS=window.ACS_PANEL_PACKS||{};\n"
  +"window.ACS_PANEL_PACKS["+JSON.stringify(LANG)+"]="+JSON.stringify({v:VER,lang:LANG,name:MAN.name||LANG,scope:SCOPE,complete:complete,D:SD,G:[...GEOK].filter(k=>SD[k]!==undefined).sort()})+";\n";
const OUT=path.join(ROOT,"assets/i18n/panel_"+LANG+".js");
if(CHECK){
  const cur=fs.existsSync(OUT)?fs.readFileSync(OUT,"utf8"):"";
  if(cur!==out){ console.log("⛔ --check: assets/i18n/panel_"+LANG+".js ताज़ा नहीं (generator दोबारा चलाएँ)"); process.exit(1); }
  console.log("🏁 जाँच पास (--check): panel_"+LANG+".js ताज़ा · प्रविष्टियाँ "+keys.length+" · पहुँच-जाँच "+need.size+" टुकड़े · पूरा पैनल: "+(complete?"हाँ":"नहीं"));
} else {
  fs.mkdirSync(path.dirname(OUT),{recursive:true}); fs.writeFileSync(OUT,out);
  console.log("✅ लिखा: assets/i18n/panel_"+LANG+".js · प्रविष्टियाँ "+keys.length+" (data से "+auto.size+", हाथ से "+(Object.keys(MAN.ui||{}).length+Object.keys(MAN.geo||{}).length)+", हाथ ने बदले "+overrides+") · पहुँच-जाँच "+need.size+" टुकड़े पास · पूरा पैनल: "+(complete?"हाँ":"नहीं"));
}
