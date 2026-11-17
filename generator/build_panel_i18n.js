/* ════════════════════════════════════════════════════════════
   build_panel_i18n.js v1.8 · 16-Nov-2026 · पैनल-भाषा-पैक का generator (परत-4)
   v1.8 (कन्नड़ क-3; Founder: "कन्नड मे सब कुछ कन्नड मे ही हो"): (1) उस भाषा का शब्द-नियम (<भाषा>_terms.json, lib_lang_terms.js) हो, तो हर अनुवाद
     उससे जाँचा जाता है: छूट-सूची (brand के नाम, छोटे रूप) के बाहर कोई English शब्द नहीं; हिंदी मूल का रोमन शब्द अनुवाद में अपनी लिपि में जा सकता है।
     (2) पैक के नए खाने "N" और "NT": data के नाम (कोर्स, भाषा, समूह, उद्यम) उस भाषा में (स्रोत: <भाषा>.json के "names" और "name_tpl")।
     (3) प्रमाणपत्र के "जारी" वाले साँचे में "online" रोमन में ज़रूरी नहीं रहा। English पैक में कुछ नहीं बदला।
   v1.7 (कन्नड़ क-2क-2): पैक का "C" खाना = उस भाषा के काग़ज़ों के साँचे (प्रमाणपत्र का वाक्य, तिथि, जारी-पंक्ति; करियर रिपोर्ट की जाँच-पंक्ति)।
     स्रोत: <भाषा>.json का "docs" खंड। कुंजियाँ और हर कुंजी के {खाने} नीचे DOC_SPEC में पक्के हैं: कम, ज़्यादा या अलग हों, तो पैक नहीं बनता।
     font का नाम भाषा-रजिस्टर से (lib_lang_registry.js)। "docs" न हो, तो "C" नहीं बनता और उस भाषा के काग़ज़ English में रहते हैं। English पैक में "C" कभी नहीं।
   v1.6 (कन्नड़ क-1 v1.2): (1) पैक का "P" खाना: इस भाषा के अपने पन्ने (en/ का जो पन्ना <भाषा>/ में भी है); इंजन कड़ियाँ वहीं मोड़ता है।
     (2) पहुँच-जाँच में assets/rules-gate.js की GATE_HI तालिका (नियम-परदे के वाक्य: परदा अब पैनल की भाषा में)।
   v1.5 (कन्नड़, खेप क-1): मशीन अब हर पैनल-भाषा के लिए। भाषाओं का घर generator/lib_panel_langs.js (Founder का क्रम; लिपि lib_apt_langs.js से)।
     English के अलावा हर भाषा में: (1) <भाषा>.json का नया खंड "data": data-फ़ाइलों (roles.js, designation_matrix.js, countries.js, links.js)
     के हर हिंदी→English जोड़े का अनुवाद ज़रूरी (English में ये जोड़े data से अपने-आप आते हैं); (2) हर अनुवाद हिंदी मूल से मिलाया जाता है
     (lib_panel_langs.js का parity: अंक, {n}, चिह्न, emoji, रोमन शब्द, विराम, अपनी लिपि, पराई लिपि); (3) अनुवाद के आगे-पीछे की ख़ाली जगह
     English पैक जैसी (टुकड़े उसी तरह जुड़ें); (4) "draft_note" हो तो पैक में जाता है (भाषा-पट्टी के नीचे "AI-मसौदा" सूचना)।
     --todo <फ़ाइल>: जो हिंदी टुकड़े <भाषा>.json में अभी नहीं हैं, उनकी सूची (हिंदी + English संदर्भ) उस फ़ाइल में; पैक नहीं बनता।
     (5) पहुँच-जाँच में अब नियम-फ़ाइलों की script के वे टुकड़े भी, जो रजिस्ट्रेशन पन्ने के अपने हिस्से में लिखे जाते हैं (गिनती, "अंतिम पुष्टि" का लेबल):
     नियम-पत्र हिंदी में दिखे तब भी ये चुनी भाषा में दिखते हैं; इससे en.json और panel_en.js में 2 टुकड़े जुड़े (पुराने 2861 वैसे ही)।
     (6) brand का नाम हर भाषा में रोमन में ही (Applied Computer School, ACS): lib_panel_langs.js के parity में।
   v1.1 (पैनल-1ख): दायरे में रजिस्ट्रेशन गाइड (registration-guide.html) और matrix की पद-योग्यताएँ।
   v1.2 (शब्द-सूची): English पैक पर generator/data/vocab_en.json के नियम (उद्यम = Enterprise)। पैक का ढाँचा-संस्करण (VER) वही 1.1।
   v1.3 (पैनल-2): दायरे में सब 31 dashboard (dash-ext, dash-team) और assets/dashboard.js के literal; "\n" वाले literal
   पंक्ति-दर-पंक्ति; data-h और data-nav भी; शब्द-सूची का "एक चीज़ = एक English नाम" पहरा (V6-V11, lib_vocab_en.js)।
   v1.4 (पैनल-3): दायरे में server के संदेश (generator/data/panel_i18n/server_msgs.json; server की फ़ाइलें repo में नहीं
   होतीं, इसलिए उनके संदेशों की सूची extract_server_msgs.js से निकलकर repo में रहती है)। जिस संदेश में {0}, {1} है,
   वह पैक के T (साँचे) में जाता है; बाक़ी D में। हर संदेश तीन तरह जाँचा जाता है: अकेले, "नहीं हुआ: " के बाद, और जब उसके बाद भी पाठ हो।
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
const TODO=process.argv.indexOf("--todo")>-1 ? (process.argv[process.argv.indexOf("--todo")+1]||"") : "";
if(!/^[a-z]{2,3}$/.test(LANG)||LANG==="hi"||(process.argv.indexOf("--todo")>-1&&!TODO)){ console.log("उपयोग: node generator/build_panel_i18n.js <भाषा-कोड> [--check | --todo <फ़ाइल>]"); process.exit(1); }
/* (v1.5) भाषा का घर: lib_panel_langs.js। कोड वहाँ न हो, या लिपि दर्ज न हो = पैक नहीं बनता (fail-closed) */
const PL=require("./lib_panel_langs.js"), LI=PL.info(LANG), EN_MODE=(LANG==="en");
if(!LI){ console.log("⛔ भाषा-कोड \""+LANG+"\" पैनल-भाषाओं की सूची (generator/lib_panel_langs.js का ORDER) में नहीं, या उसकी लिपि lib_apt_langs.js में दर्ज नहीं।"); process.exit(1); }
if(LI.script==="Deva"){ console.log("⛔ देवनागरी में लिखी जाने वाली भाषा ("+LANG+") की पहुँच-जाँच और इंजन का पहरा अभी नहीं बना (\"हिंदी बची या नहीं\" लिपि से नहीं पहचाना जा सकता)। यह उस भाषा की खेप में बनेगा।"); process.exit(1); }
const DEV=/[ऀ-ॿ]/;
/* (v1.9, बांग्ला ब-1) अनुवाद में "देवनागरी बची?" की जाँच: जिन लिपियों का अपना पूर्ण-विराम "।" है (lib_panel_langs.js: dandaOwn),
   उनमें "।" और "॥" नहीं गिने जाते; बाक़ी भाषाओं में पहले जैसा। कुंजी (हिंदी मूल) की जाँच वही पुरानी DEV। */
const DEVV=PL.devRe(LANG), DANDA=PL.dandaOwn(LANG);
const VER="1.2";   /* 1.2 (पैनल-3): पैक में T (साँचे) */
/* पैक किन हिस्सों को ढकता है (पैनल-खेपों के साथ बढ़ेगा)। सब हिस्से पूरे = complete:true।
   करियर-टेस्ट की नई भाषा का द्वार (lib_apt_langs.js panelGate) इसी पर चलता है। */
const SCOPE=["login","join","guide","dash-ext","dash-team","server"];
const ALL_AREAS={ en:["login","join","guide","dash-ext","dash-team","server","canvas","rules"] };   /* (v1.5) दूसरी भाषाओं में भी यही सूची (नीचे complete) */
/* ये हिंदी टुकड़े पन्ने पर दिखते ही नहीं (सिर्फ़ console या कोड के भीतर) — इसलिए अनुवाद नहीं */
const SKIP=new Set([
  "Firebase init विफल:", "requestRegisterOtp त्रुटि:", "resend त्रुटि:", "cancelApplication त्रुटि:",
  "verifyRegisterOtp त्रुटि:", "submitRegistration त्रुटि:",
  "ज्ञ", "क्ष", "त्र"   /* नाम को देवनागरी में बदलने वाली अक्षर-तालिका (दिखती नहीं) */
]);
const KEEP_SHORT=new Set(["या","पद","और","मई","सब"]);   /* 2 अक्षर से छोटे जो सचमुच दिखते हैं */

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
/* (v1.5) नई भाषा: शब्दकोश-फ़ाइल अभी न हो तो --todo पूरी सूची देता है (काम यहीं से शुरू होता है); बिना --todo साफ़ संदेश */
if(!fs.existsSync(path.join(ROOT,"generator/data/panel_i18n/"+LANG+".json"))&&!TODO){ console.log("⛔ generator/data/panel_i18n/"+LANG+".json नहीं मिली। नई भाषा का पहला क़दम: node generator/build_panel_i18n.js "+LANG+" --todo <फ़ाइल> (अनुवाद के लिए पूरी सूची), फिर "+LANG+".json लिखें (ढाँचा: generator/data/panel_i18n/README.md)।"); process.exit(1); }
const MAN=fs.existsSync(path.join(ROOT,"generator/data/panel_i18n/"+LANG+".json")) ? readJSON("generator/data/panel_i18n/"+LANG+".json") : { lang:LANG, ui:{}, geo:{}, server:{}, data:{} };
if(MAN.lang!==LANG){ console.log("⛔ "+LANG+".json में lang खाना ग़लत"); process.exit(1); }
const D={}; let overrides=0; const pre=[];
if(EN_MODE) for(const [h,v] of auto) D[h]=v.en;
for(const sec of ["ui","geo"]) for(const [h0,e] of Object.entries(MAN[sec]||{})){
  const h=norm(h0); if(D[h]!==undefined&&D[h]!==e) overrides++; D[h]=e; }
/* (v1.5) English संदर्भ: किनारे की ख़ाली जगह और --todo के लिए */
const ENREF={}, ENSRV={};
if(!EN_MODE){ const E=readJSON("generator/data/panel_i18n/en.json");
  for(const [h,v] of auto) ENREF[h]=v.en;
  for(const sec of ["ui","geo"]) for(const [h0,e] of Object.entries(E[sec]||{})) ENREF[norm(h0)]=e;
  for(const [h0,e] of Object.entries(E.server||{})){ ENSRV[h0]=e; if(!/\{\d+\}/.test(h0)) ENREF[norm(h0)]=e; } }
/* (v1.5) data-फ़ाइलों के जोड़े: English में अपने-आप; दूसरी भाषा में "data" खंड (या ui/geo) में हर एक का अनुवाद ज़रूरी */
if(EN_MODE){ if(MAN.data) pre.push("en.json में \"data\" खंड नहीं होता (English के जोड़े data-फ़ाइलों से अपने-आप आते हैं)"); }
else {
  for(const [h0,e] of Object.entries(MAN.data||{})){ const h=norm(h0);
    if(!auto.has(h)) pre.push("\"data\" खंड में ऐसी कुंजी जो data-फ़ाइलों में नहीं: "+h0);
    else if(D[h]!==undefined&&D[h]!==e) pre.push("एक ही कुंजी के दो अनुवाद (ui/geo और data): "+h0);
    else D[h]=e; }
  for(const [h] of auto) if(D[h]===undefined) pre.push("data-फ़ाइलों के जोड़े का अनुवाद नहीं ("+LANG+".json के \"data\" खंड में जोड़ें): "+h);
}
/* (v1.4) server के संदेश: सूची server_msgs.json से, अनुवाद <भाषा>.json के "server" खंड से।
   सूची का हर संदेश अनुवाद में हो, और अनुवाद में कोई फ़ालतू न हो (सूची और अनुवाद एक-दूसरे से न भटकें)। */
const SRV=readJSON("generator/data/panel_i18n/server_msgs.json").msgs.map(x=>x.hi), MSRV=MAN.server||{}, TP=[], srvBad=[];
if(SCOPE.indexOf("server")>-1){
  const PH=t=>(t.match(/\{\d+\}/g)||[]).slice().sort().join(",");
  for(const hi of SRV){ const en=MSRV[hi];
    if(typeof en!=="string"||!en.trim()){ srvBad.push("server-संदेश का अनुवाद नहीं: "+hi); continue; }
    if(PH(hi)!==PH(en)){ srvBad.push("server-संदेश में {n} बेमेल: "+hi+" → "+en); continue; }
    if(PH(hi)) TP.push([hi,en]);
    else { const h=norm(hi); if(D[h]!==undefined&&D[h]!==en) srvBad.push("server-संदेश का अनुवाद ui वाले से अलग: "+hi+" → ui: "+D[h]+" | server: "+en); D[h]=en; } }
  for(const hi of Object.keys(MSRV)) if(SRV.indexOf(hi)<0) srvBad.push("अनुवाद में ऐसा server-संदेश जो सूची में नहीं: "+hi);
  TP.sort((a,b)=>a[0]<b[0]?-1:1);
}
/* जगहों के नाम (देश, राज्य, जिले): ये वाक्य के बीच में सिर्फ़ ":" "," "·" "(" के बाद और "," "·" ")" या अंत से पहले बदलते हैं।
   कारण: "गया" (जिला) और "गया" (क्रिया), "माली" (देश) और "माली" (बागवान) एक जैसे लिखे जाते हैं। */
const GEOK=new Set();
for(const [h,v] of auto) if(v.src==="countries") GEOK.add(h);
for(const h0 of Object.keys(MAN.geo||{})) GEOK.add(norm(h0));

/* ---------- 3. पहरा (क): मानों की शुद्धता ---------- */
const bad=pre.concat(srvBad);
/* (v1.5) --todo: जो टुकड़े अभी इस भाषा में नहीं लिखे गए (हिंदी + English संदर्भ), फ़ाइल में; पैक नहीं बनता */
if(TODO){ const list=[], seen=new Set(), E0=readJSON("generator/data/panel_i18n/en.json");
  /* खंड वही जो en.json में: ui, geo; data-फ़ाइलों के जोड़े "data" में (जो ui में पहले से हैं, वे ui में ही); server अलग */
  const put=(sec,h,en)=>{ if(seen.has(h)||D[h]!==undefined) return; seen.add(h); list.push({ sec:sec, hi:h, en:en }); };
  for(const [h0,e] of Object.entries(E0.ui||{})) put("ui",norm(h0),e);
  for(const [h0,e] of Object.entries(E0.geo||{})) put("geo",norm(h0),e);
  for(const [h,v] of auto) put("data",h,v.en);
  for(const hi of SRV) if(typeof MSRV[hi]!=="string") list.push({ sec:"server", hi:hi, en:ENSRV[hi]||"" });
  fs.writeFileSync(TODO, JSON.stringify(list,null,1)+"\n"); console.log("📝 --todo: "+list.length+" टुकड़े अभी "+LANG+".json में नहीं → "+TODO); process.exit(0); }
/* (v1.5) किनारे की ख़ाली जगह English पैक जैसी (हिंदी के टुकड़े जिस तरह जुड़ते हैं, अनुवाद भी वैसे जुड़ें); फिर हिंदी मूल से मिलान */
/* (v1.8, क-3) उस भाषा का शब्द-नियम (generator/data/panel_i18n/<भाषा>_terms.json) हो, तो हर अनुवाद उससे जाँचा जाता है: छूट-सूची के बाहर English शब्द नहीं */
const LT=require("./lib_lang_terms.js"), TERMS=(!EN_MODE&&LT.has(LANG))?LT.load(LANG):null;
if(!EN_MODE){ const LOK=MAN.latin_ok||[];
  const shape=(h,v)=>{ const r=ENREF[h]; if(typeof r!=="string"||typeof v!=="string"||!v.trim()) return v; return (/^\s*/.exec(r)[0])+v.trim()+(/\s*$/.exec(r)[0]); };
  for(const h of Object.keys(D)) D[h]=shape(h,D[h]);
  for(const [h,e] of Object.entries(D).concat(TP)) if(typeof e==="string"&&e.trim()) for(const x of PL.parity(LANG,h,e,LOK,TERMS)) bad.push("मिलान ("+x+"): "+h+" → "+e);
}
for(const [h,e] of Object.entries(D).concat(TP)){
  if(!DEV.test(h)) bad.push("कुंजी में देवनागरी नहीं: "+h);
  if(typeof e!=="string"||!e.trim()) bad.push("ख़ाली मान: "+h);
  else { if(DEVV.test(e)) bad.push("मान में देवनागरी: "+h+" → "+e);
         if(e.indexOf("—")>-1) bad.push("मान में — (em dash): "+h+" → "+e);
         if(e.indexOf("�")>-1||h.indexOf("�")>-1) bad.push("U+FFFD: "+h); }
}
/* (v1.2, 15-Nov) English शब्द-सूची (Founder की हाँ, 15-Nov-2026): नियम का घर generator/data/vocab_en.json।
   V1: हिंदी में "उद्यम" हो, तो English में "industry" उतनी ही बार जितनी बार हिंदी में "उद्योग"।
   V2/V3: English में "950 industries/sectors" या "🌍 Industries" नहीं। (पूरी साइट: dev_vocab_en_check.js)
   V6-V11 (पैनल-2, generator/lib_vocab_en.js): एक चीज़ = एक English नाम (अभिरुचि-रिपोर्ट = Career Interest Report,
   अभिरुचि-परीक्षण = Career Interest Test, उद्योग-प्रशिक्षु = Entrepreneur Learner); English की तरफ़ से भी (V9-V11)। */
if(EN_MODE){ const VOC=JSON.parse(fs.readFileSync(path.join(ROOT,"generator/data/vocab_en.json"),"utf8"));
  const r1=VOC.pair_rules.find(r=>r.id==="V1"), hi1=new RegExp(r1.hi_re), en1=new RegExp(r1.en_count_re,"gi"), al1=new RegExp(r1.hi_allow_re,"g");
  for(const [h,e] of Object.entries(D)){ if(typeof e!=="string") continue;
    if(hi1.test(h)&&(e.match(en1)||[]).length>(h.match(al1)||[]).length) bad.push("शब्द-सूची V1 ('उद्यम' = Enterprise, industry नहीं): "+h+" → "+e);
    for(const r of VOC.never_en) if(new RegExp(r.re,"i").test(e)) bad.push("शब्द-सूची "+r.id+": "+h+" → "+e);
    for(const x of require("./lib_vocab_en.js").pairViolations(VOC,h,e)) bad.push("शब्द-सूची "+x.id+" ("+x.msg+"): "+h+" → "+e); } }

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
        if(code[j]==="\\"){ const x=code[j+1]; buf+=(x==="n"?"\n":x); j+=2; continue; }   /* (v1.3) \n असली नई पंक्ति: संदेश-डिब्बे पंक्ति-दर-पंक्ति बदलते हैं */
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
    let a; const ra=/\b(?:placeholder|title|label|aria-label|alt|data-h|data-nav)="([^"]*)"/g; while((a=ra.exec(r))) if(DEV.test(a[1])) out.push(norm(a[1]));
    r=r.replace(/\b(?:placeholder|title|label|aria-label|alt|style|id|class|maxlength|inputmode|type|value|data-[a-z-]+)="[^"]*"/g," ");
    r=r.replace(/^["']?\s*>/,"");   /* (v1.3) attribute हटने के बाद भी बचा सिरा ('" type="button">पाठ') */
    for(const t of segsMarkup(r)) if(!/^["'=>]/.test(t)) out.push(t);
    /* (v1.3) कई पंक्तियों वाला संदेश: इंजन alert/confirm को पंक्ति-दर-पंक्ति बदलता है, इसलिए हर पंक्ति भी */
    if(r.indexOf("\n")>-1) for(const ln of r.split("\n")) for(const t of segsMarkup(ln)) if(!/^["'=>]/.test(t)) out.push(t); }
  return out;
}
function htmlSegs(p){
  const s=fs.readFileSync(path.join(ROOT,p),"utf8");
  const scripts=[...s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
  let body=s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g," ").replace(/<!--[\s\S]*?-->/g," ");
  const out=[]; let a; const ra=/\b(?:placeholder|title|aria-label|alt|label|content|data-h|data-nav)="([^"]*)"/g;
  while((a=ra.exec(body))) if(DEV.test(a[1])) out.push(norm(a[1]));
  out.push(...segsMarkup(body.replace(/<[^>]*\bdata-i18n-skip\b[^>]*>[\s\S]*?<\/[^>]+>/g," ")));
  scripts.forEach(sc=>out.push(...literals(sc)));
  return out;
}
const AREA_SRC={ login:["dashboard/_LOGIN_TEMPLATE.html"], join:["_JOIN_TEMPLATE.html"], guide:["registration-guide.html"] };
/* (v1.3, पैनल-2) dashboard: generator से बने सब पन्ने (बाहरी = कार्ड-भूमिकाएँ, बाक़ी टीम) + उनकी साझा JS */
(function(){ const ext=new Set((MX.cards||[]).map(c=>c.key.replace(/_/g,"-"))); const ext2=[], team=[];
  const add=f=>{ if(fs.existsSync(path.join(ROOT,f))) (ext.has(f.split("/")[1])?ext2:team).push(f); };
  for(const d of fs.readdirSync(path.join(ROOT,"dashboard"),{withFileTypes:true})) if(d.isDirectory()){
    if(d.name==="hq") for(const h of fs.readdirSync(path.join(ROOT,"dashboard/hq"))) team.push("dashboard/hq/"+h+"/index.html");
    else add("dashboard/"+d.name+"/index.html"); }
  AREA_SRC["dash-ext"]=ext2.sort(); AREA_SRC["dash-team"]=team.filter(f=>fs.existsSync(path.join(ROOT,f))).sort(); })();
const DASH_JS=["assets/dashboard.js","assets/vani.js","assets/exam-session.js","assets/academic_subjects.js"];
const need=new Map();
function want(t,src){ t=norm(t); if(!t||!DEV.test(t)||SKIP.has(t)) return; if(/^[ऀ-ॿ]{1,2}$/.test(t)&&!KEEP_SHORT.has(t)) return; if(!need.has(t)) need.set(t,src); }
for(const a of SCOPE) for(const p of (AREA_SRC[a]||[])) htmlSegs(p).forEach(t=>want(t,p));
if(SCOPE.some(a=>/^dash-/.test(a))) for(const f of DASH_JS) literals(fs.readFileSync(path.join(ROOT,f),"utf8")).forEach(t=>want(t,f));
/* लॉगिन पन्ने पर acs-universal.js भी चलता है (मेनू, footer, नीचे के बटन) : उसकी हर हिंदी पंक्ति भी।
   सिर्फ़ भाषा-सूची की तालिकाएँ (var ACS_LANG_...) छोड़कर: वहाँ भाषाओं के अपने नाम हैं, जो जान-बूझकर वैसे ही रहते हैं। */
if(SCOPE.indexOf("login")>-1){ const u=fs.readFileSync(path.join(ROOT,"assets/acs-universal.js"),"utf8").split("\n").filter(l=>!/^var ACS_LANG_/.test(l)).join("\n");
  literals(u).forEach(t=>want(t,"assets/acs-universal.js")); }
/* (v1.6) नियम-परदा (login और dashboard पर): उसके वाक्य GATE_HI तालिका में हैं और पैनल की भाषा में दिखते हैं */
if(SCOPE.indexOf("login")>-1){ const g=fs.readFileSync(path.join(ROOT,"assets/rules-gate.js"),"utf8"), gm=/var GATE_HI = \{[\s\S]*?\n\};/.exec(g);
  if(!gm){ console.log("⛔ assets/rules-gate.js में GATE_HI तालिका नहीं मिली (पहुँच-जाँच)"); process.exit(1); }
  const gl=literals(gm[0]); if(gl.length<12){ console.log("⛔ GATE_HI से सिर्फ़ "+gl.length+" वाक्य पढ़े गए (पहुँच-जाँच)"); process.exit(1); }
  gl.forEach(t=>want(t,"assets/rules-gate.js (GATE_HI)")); }
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
    let m; const re=/placeholder="([^"]*)"/g; while((m=re.exec(box))) if(DEV.test(m[1])) want(m[1],f+" (idbox)"); }
  /* (v1.5) नियम-फ़ाइल की script रजिस्ट्रेशन पन्ने के अपने हिस्से में भी लिखती है (गिनती की पंक्ति, "अंतिम पुष्टि" का लेबल):
     ये नियम नहीं, फ़ॉर्म के टुकड़े हैं, और नियम-पत्र हिंदी में दिखे तब भी चुनी भाषा में दिखने चाहिए। idbox न हो तब भी। */
  for(const f of files){ const h=fs.readFileSync(path.join(ROOT,f),"utf8");
    for(const sc of [...h.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]))
      for(const ln of sc.split("\n")) if(/\b(?:finalLabel|count)\.(?:innerHTML|textContent)\s*=/.test(ln)) literals(ln).forEach(t=>want(t,f+" (script: गिनती / अंतिम पुष्टि)")); } }
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
  sb.ACS_PANEL_PACKS={}; sb.ACS_PANEL_PACKS[LANG]=DANDA?{D:D,G:[...GEOK],T:TP,dn:1}:{D:D,G:[...GEOK],T:TP};
  sb.ACS_PANEL_I18N.set(LANG);
  if(sb.ACS_PANEL_I18N.lang()!==LANG){ console.log("⛔ इंजन ने भाषा नहीं ली (panel_i18n.js की PACK-सूची में "+LANG+" है?)"); process.exit(1); }
  return sb.ACS_PANEL_I18N.tr;
}
const TR=engineTr(), miss=[];
for(const [t,src] of need){ const o=TR(t); if(DEVV.test(o)) miss.push(src+" :: "+t+"  ⇒  "+o); }
/* (v1.4) server के संदेश: {n} की जगह नमूना-मान रखकर; अकेले भी और "नहीं हुआ: " के बाद भी (dashboard ऐसे ही दिखाता है)।
   साँचे वाले संदेश का नतीजा ठीक वही हो जो अनुवाद में लिखा है (कोई दूसरा टुकड़ा बीच में न घुसे)। */
if(SCOPE.indexOf("server")>-1) for(const hi of SRV){ const en=MSRV[hi]; if(typeof en!=="string") continue;
  const fill=t=>t.replace(/\{(\d+)\}/g,(_,d)=>"X"+d+"7");
  const o=TR(fill(hi)), o2=TR("नहीं हुआ: "+fill(hi)), o3=TR(fill(hi)+" पहले login करें।");   /* o3: संदेश के बाद भी पाठ हो (साँचे के आगे-पीछे दोनों ओर बदले) */
  if(DEVV.test(o)||DEVV.test(o2)||DEVV.test(o3)) miss.push("server :: "+hi+"  ⇒  "+o+"  |  "+o2+"  |  "+o3);
  else if(norm(o)!==norm(fill(en))) miss.push("server (नतीजा अनुवाद से अलग) :: "+hi+"  ⇒  "+o+"  ≠  "+fill(en));
  else if(o2.indexOf(norm(fill(en)))<0) miss.push("server (\"नहीं हुआ: \" के बाद नतीजा अलग) :: "+hi+"  ⇒  "+o2); }
/* (v1.3) अनुवाद-सूची बनाने का औज़ार: ACS_MISS=<फ़ाइल> पर छूटे टुकड़े (स्रोत :: हिंदी) उस फ़ाइल में */
if(process.env.ACS_MISS) fs.writeFileSync(process.env.ACS_MISS, miss.join("\n")+"\n");
if(miss.length){ bad.push("पहुँच-जाँच: "+miss.length+" हिंदी टुकड़े "+(MAN.name||LANG)+" में नहीं बदले:"); miss.slice(0,Number(process.env.ACS_SHOW||60)).forEach(x=>bad.push("   "+x)); }
if(bad.length){ bad.forEach(b=>console.log("  ⛔ "+b)); console.log("⛔ कोई फ़ाइल नहीं लिखी गई।"); process.exit(1); }

/* ---------- 5. पैक लिखना ---------- */
const keys=Object.keys(D).sort();
const SD={}; keys.forEach(k=>SD[k]=D[k]);
const complete=(ALL_AREAS[LANG]||ALL_AREAS.en).every(a=>SCOPE.indexOf(a)>-1);
/* (v1.5) पैक का ढाँचा: English में वही जो पहले था (अक्षर-भर नहीं बदला); दूसरी भाषा में draft_note हो तो "draft" भी */
const PACKOBJ={v:VER,lang:LANG,name:MAN.name||LANG,scope:SCOPE,complete:complete};
if(DANDA) PACKOBJ.dn=1;   /* (v1.9) इस भाषा का अपना पूर्ण-विराम "।" है: इंजन उसे "." में नहीं बदलता और "हिंदी बची" नहीं मानता */
if(!EN_MODE&&typeof MAN.draft_note==="string"&&MAN.draft_note.trim()){ for(const x of PL.parity(LANG,"मसौदा",MAN.draft_note,MAN.latin_ok||["AI"],TERMS)) { console.log("⛔ draft_note: "+x); process.exit(1); } PACKOBJ.draft=MAN.draft_note.trim(); }
/* (v1.6, Founder का आदेश 16-Nov-2026: "कन्नड़ पैनल से कन्नड़ पन्ने पर ही जाना चाहिए") इस भाषा के अपने पन्ने:
   repo के en/ folder का जो पन्ना <भाषा>/ folder में भी मौजूद है, उसका जोड़ा पैक के "P" खाने में ("/en/x" → "/<भाषा>/x")।
   इंजन कड़ी का English पता (data-href-en, मेनू का href_en) इसी से अपनी भाषा के पन्ने पर मोड़ता है; जो पन्ना उस भाषा में नहीं, वह English में।
   पन्ना जुड़े या हटे, तो --check पैक को बासी कहता है। */
/* (v1.7, कन्नड़ क-2क-2; Founder का फ़ैसला 16-Nov-2026: कन्नड़ उपयोगकर्ता का प्रमाणपत्र कन्नड़ + English में) काग़ज़ों के साँचे: पैक का "C" खाना।
   ये वाक्य हिंदी के टुकड़ों को जोड़कर नहीं बन सकते (हर भाषा का अपना शब्द-क्रम), इसलिए पूरे साँचे के रूप में लिखे जाते हैं।
   DOC_SPEC: कुंजी → [ज़रूरी {खाने} (हर एक ठीक एक बार), वह रोमन पाठ जो साँचे में होना ही चाहिए, अपनी लिपि का अक्षर ज़रूरी?]।
   dashboard.js का DOC_KEYS इसी सूची से मिलना चाहिए (पहरेदार dev_cert_guard.js मिलाता है)। */
const DOC_SPEC={
  cert_sentence:  [["course","date","pct"], "", true],
  cert_date:      [["d","month","y"], "", false],
  cert_issued:    [["issued","valid"], "", true],
  cert_details:   [[], "Institutional Details", true],
  report_valid:   [["no","date"], "acslearn.com/verify", true],
  report_expired: [["no","date"], "acslearn.com/verify", true]
};
if(EN_MODE&&MAN.docs){ console.log("⛔ en.json में \"docs\" खंड नहीं होता (English के काग़ज़ dashboard.js में पक्के लिखे हैं)"); process.exit(1); }
if(!EN_MODE&&MAN.docs){
  const DB=[], DOCS=MAN.docs, LI2=PL.info(LANG), APT2=require("./lib_apt_langs.js");
  const hasOwn=t=>{ for(const ch of t) if(APT2.scriptOf(ch.codePointAt(0))===LI2.script) return true; return false; };
  for(const k of Object.keys(DOCS)) if(!DOC_SPEC[k]) DB.push("अनजान कुंजी: "+k);
  for(const k of Object.keys(DOC_SPEC)){ const t=DOCS[k], [need,must,own]=DOC_SPEC[k];
    if(typeof t!=="string"||!t.trim()){ DB.push(k+": ख़ाली या ग़ायब"); continue; }
    if(t!==t.trim()) DB.push(k+": शुरू या अंत में ख़ाली जगह");
    if(DEVV.test(t)) DB.push(k+": देवनागरी");
    if(/[\u2014\u2013\uFFFD<>"\\]/.test(t)) DB.push(k+": लंबी रेखा, टूटा अक्षर या < > \" \\");
    const got=(t.match(/\{[^}]*\}/g)||[]).map(x=>x.slice(1,-1)).sort().join(","), want=need.slice().sort().join(",");
    if(got!==want) DB.push(k+": {खाने} अलग (चाहिए: "+(want||"कोई नहीं")+"; मिले: "+(got||"कोई नहीं")+")");
    if(must&&t.indexOf(must)<0) DB.push(k+": \""+must+"\" नहीं");
    if(own&&LI2.script!=="Latn"&&!hasOwn(t)) DB.push(k+": अपनी लिपि ("+LI2.script+") का अक्षर नहीं");
    for(const ch of t){ const sc=APT2.scriptOf(ch.codePointAt(0)); if(sc&&sc!==LI2.script&&sc!=="Latn"){ DB.push(k+": पराई लिपि का अक्षर ("+sc+")"); break; } }
    if(/\d/.test(t.replace(/\{[^}]*\}/g,""))) DB.push(k+": साँचे में अंक (अंक सिर्फ़ {खानों} से आते हैं)"); }
  const REG2=require("./lib_lang_registry.js").load()[LANG];
  if(!REG2||!REG2.font||!/^[A-Za-z0-9 ]+$/.test(REG2.font)||!/^[A-Za-z0-9+]+$/.test(REG2.gfam||"")) DB.push("भाषा-रजिस्टर में इस भाषा का font नहीं मिला");
  if(DB.length){ console.log("⛔ \"docs\" खंड ("+LANG+".json) ठीक नहीं:"); DB.forEach(x=>console.log("   - "+x)); process.exit(1); }
  const C={}; Object.keys(DOC_SPEC).forEach(k=>C[k]=DOCS[k]); C.font=REG2.font; C.gfam=REG2.gfam;
  PACKOBJ.C=C; }
/* (v1.8, क-3) नाम-तालिका: <भाषा>.json का "names" (English नाम → उस भाषा का नाम) और "name_tpl" (साँचे) → पैक के "N" और "NT"।
   इंजन data-tr-en वाले नाम (कोर्स, भाषा, समूह, उद्यम) इसी से उस भाषा में दिखाता है। */
if(EN_MODE&&(MAN.names||MAN.name_tpl)){ console.log("⛔ en.json में \"names\" खंड नहीं होता"); process.exit(1); }
if(!EN_MODE&&MAN.names){
  const NB=[], NA=MAN.names, NTP=MAN.name_tpl||[], LI3=PL.info(LANG), APT3=require("./lib_apt_langs.js");
  const okv=(k,v)=>{ if(typeof v!=="string"||!v.trim()||v!==v.trim()) return NB.push("ख़ाली या किनारे पर जगह: "+k);
    if(DEVV.test(v)) NB.push("देवनागरी: "+k+" → "+v);
    if(/[\u2014\u2013\uFFFD]/.test(v)) NB.push("लंबी रेखा या टूटा अक्षर: "+k+" → "+v);
    for(const ch of v){ const sc=APT3.scriptOf(ch.codePointAt(0)); if(sc&&sc!==LI3.script&&sc!=="Latn"){ NB.push("पराई लिपि ("+sc+"): "+k+" → "+v); break; } }
    if(TERMS){ const left=LT.scan(v.replace(/\{\d\}/g," "),TERMS,null).filter(w=>!/^[A-Z]{2,}$/.test(w));   /* परीक्षा और संस्था के छोटे रूप (UPSC, SSC) नामों में रोमन में ही */
      if(left.length) NB.push("English शब्द ("+left.join(", ")+"): "+k+" → "+v); } };
  if(typeof NA!=="object"||Array.isArray(NA)) NB.push("\"names\" एक तालिका होनी चाहिए");
  else for(const k of Object.keys(NA)){ if(!k.trim()||/[\u0900-\u097F]/.test(k)) NB.push("कुंजी English नाम होनी चाहिए: "+k); okv(k,NA[k]); }
  if(!Array.isArray(NTP)) NB.push("\"name_tpl\" एक सूची होनी चाहिए");
  else NTP.forEach((t,i)=>{ if(!Array.isArray(t)||t.length!==2||typeof t[0]!=="string"||typeof t[1]!=="string") return NB.push("साँचा "+(i+1)+": [English साँचा, अपना साँचा] चाहिए");
    let re; try{ re=new RegExp(t[0]); }catch(e){ return NB.push("साँचा "+(i+1)+": regex ठीक नहीं"); }
    const groups=(new RegExp(t[0]+"|")).exec("").length-1, used=(t[1].match(/\{\d\}/g)||[]).map(x=>Number(x[1]));
    for(let g=1;g<=groups;g++) if(used.filter(x=>x===g).length!==1) NB.push("साँचा "+(i+1)+": {"+g+"} ठीक एक बार चाहिए");
    if(used.some(x=>x<1||x>groups)) NB.push("साँचा "+(i+1)+": अनजान खाना");
    okv("साँचा "+(i+1),t[1]); });
  if(NB.length){ console.log("⛔ \"names\" खंड ("+LANG+".json) ठीक नहीं:"); NB.slice(0,40).forEach(x=>console.log("   - "+x)); process.exit(1); }
  const SN={}; Object.keys(NA).sort().forEach(k=>SN[k]=NA[k]); PACKOBJ.N=SN; PACKOBJ.NT=NTP; }
/* (v1.8) शब्द-नियम पैक में भी: इंजन पन्ने पर बचे English शब्द (जो टुकड़े जोड़ने से या पन्ने के अपने English शब्दों से आते हैं) उसी तालिका से बदलता है */
if(TERMS){ const L={}; Object.keys(TERMS.terms).sort().forEach(k=>L[k]=TERMS.terms[k][0]); PACKOBJ.L=L; PACKOBJ.LK=TERMS.keep.slice().sort(); PACKOBJ.LP=(TERMS.keep_phrases||[]).slice(); PACKOBJ.LS=TERMS.script; }
if(!EN_MODE){ const P={};
  (function walkEn(dir){ for(const e of fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true})){
    const rel=dir+"/"+e.name; if(e.isDirectory()){ walkEn(rel); continue; }
    if(!/\.html$/.test(e.name)) continue;
    const own=LANG+rel.slice(2); if(!fs.existsSync(path.join(ROOT,own))) continue;
    const u=x=>"/"+x.replace(/(^|\/)index\.html$/,"$1");
    P[u(rel)]=u(own); } })("en");
  if(Object.keys(P).length){ const SP={}; Object.keys(P).sort().forEach(k=>SP[k]=P[k]); PACKOBJ.P=SP; } }
const out="/* panel_"+LANG+".js · पैनल का "+(MAN.name||LANG)+" पैक v"+VER+" — generator/build_panel_i18n.js से बना, हाथ से न बदलें।\n"
  +"   हिंदी मूल है; यह सिर्फ़ दिखावट बदलता है। हिस्से: "+SCOPE.join(", ")+" · प्रविष्टियाँ "+keys.length+" */\n"
  +"window.ACS_PANEL_PACKS=window.ACS_PANEL_PACKS||{};\n"
  +"window.ACS_PANEL_PACKS["+JSON.stringify(LANG)+"]="+JSON.stringify(Object.assign(PACKOBJ,{D:SD,G:[...GEOK].filter(k=>SD[k]!==undefined).sort(),T:TP}))+";\n";
const OUT=path.join(ROOT,"assets/i18n/panel_"+LANG+".js");
if(CHECK){
  const cur=fs.existsSync(OUT)?fs.readFileSync(OUT,"utf8"):"";
  if(cur!==out){ console.log("⛔ --check: assets/i18n/panel_"+LANG+".js ताज़ा नहीं (generator दोबारा चलाएँ)"); process.exit(1); }
  console.log("🏁 जाँच पास (--check): panel_"+LANG+".js ताज़ा · प्रविष्टियाँ "+keys.length+" · पहुँच-जाँच "+need.size+" टुकड़े · पूरा पैनल: "+(complete?"हाँ":"नहीं"));
} else {
  fs.mkdirSync(path.dirname(OUT),{recursive:true}); fs.writeFileSync(OUT,out);
  console.log("✅ लिखा: assets/i18n/panel_"+LANG+".js · प्रविष्टियाँ "+keys.length+" (data से "+auto.size+", हाथ से "+(Object.keys(MAN.ui||{}).length+Object.keys(MAN.geo||{}).length)+", हाथ ने बदले "+overrides+") · पहुँच-जाँच "+need.size+" टुकड़े पास · पूरा पैनल: "+(complete?"हाँ":"नहीं"));
}
