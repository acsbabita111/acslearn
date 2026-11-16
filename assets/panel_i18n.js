/* ════════════════════════════════════════════════════════════
   panel_i18n.js v1.8 · 16-Nov-2026 · पैनल का साझा भाषा-इंजन (पैनल-1, पैनल-1ख, पैनल-2, पैनल-3, पैनल-4, पैनल-4ख, कन्नड़ क-1, कन्नड़ क-3)
   • (v1.8, कन्नड़ क-3) data के नाम उस भाषा में: पैक की नाम-तालिका "N" (English नाम → उस भाषा का नाम) और साँचे "NT"
     (जैसे "Certificate in Spoken {भाषा}")। data-tr-en वाला नाम तालिका में मिले, तो वही दिखता है; न मिले, तो पहले जैसा English।
     नया रास्ता: ACS_PANEL_I18N.name(English नाम) (प्रमाणपत्र जैसे काग़ज़ों के लिए)। English और हिंदी में कुछ नहीं बदला।
     पाठ में बचे English शब्द: पैक की शब्द-तालिका "L" (English शब्द → उस भाषा का रूप; "LK", "LP" = जो Latin में रहते हैं)। पैक का पूरा वाक्य
     जैसा है वैसा रहता है; तालिका सिर्फ़ जोड़कर बने पाठ पर और पन्ने के अपने Latin शब्दों पर चलती है। जिस Latin पाठ में कोई अनजान शब्द
     भी हो (किसी का भरा नाम, संस्था का नाम), वह अक्षर-अक्षर वैसा ही रहता है।
   • (v1.6) तीसरी भाषा: कन्नड़ (kn)। (1) data का नाम (कोर्स, भाषा, उद्यम): पहले उसी भाषा का (data-tr-<भाषा>); वह न हो तो English
     (data-tr-en), ताकि English के अलावा किसी भाषा में भी देवनागरी न बचे। (2) पैक में "draft" हो (AI-मसौदा, जाँच बाक़ी), तो वह सूचना
     भाषा-पट्टी के ठीक नीचे उसी भाषा में दिखती है। हिंदी और English का व्यवहार वही।
   • (v1.7, क-1 v1.1) Founder का फ़ैसला (16-Nov-2026): जो चीज़ उस भाषा में अभी नहीं बनी, वह English में दिखे (हिंदी में नहीं)।
     कड़ी: data-href-<भाषा> न हो तो data-href-en (नियम-पत्र, WhatsApp का संदेश); मेनू की कड़ियाँ हर ग़ैर-हिंदी भाषा में English पन्नों पर।
     Founder का आदेश (16-Nov-2026, दूसरा): जिस पन्ने का उस भाषा में अपना रूप मौजूद है (जैसे कन्नड़ करियर टेस्ट, कन्नड़ होम), कड़ी उसी पर जाए:
     पैक का "P" खाना (English पता → अपनी भाषा का पता); own(h) बाहर भी मिलता है। हिंदी और English का व्यवहार वही।
   • (v1.5) data-i18n-user="<उपयोगकर्ता का लिखा>": जहाँ span नहीं बन सकता (जैसे <option> में "नाम — पद"), वहाँ पाठ का वह
     हिस्सा जैसा है वैसा रहता है और बाक़ी बदलता है (नाम "संगीत माली" कभी "Music Mali" न बने)।
   • (v1.4) data-href-<भाषा> अब बाद में बनी कड़ियों पर भी (पहले सिर्फ़ भाषा चुनते समय की कड़ियों पर): dashboard की
     WhatsApp-कड़ियाँ (पहले से लिखा संदेश) और अभिरुचि-परीक्षण की कड़ी code से बाद में बनती हैं। कोड पहले href (हिंदी)
     लिखे, फिर data-href-<भाषा>; href दोबारा लिखा जाए, तो नया हिंदी पता ही मूल माना जाता है।
   • (v1.3) साँचे (पैक का T): जिस संदेश के बीच में कुछ बदलता है (संख्या, नाम, कारण), जैसे server का
     "इस role की न्यूनतम उम्र {0} है — जन्मतिथि से उम्र {1} बनती है", वह पूरा वाक्य एक साथ बदलता है, ताकि
     English का शब्द-क्रम सही रहे। साँचा बड़े पाठ के भीतर भी मिलता है ("नहीं हुआ: " + server का संदेश)।
   • (v1.2) <span data-tr-en="...">हिंदी</span> : data (कोर्स/भाषा के नाम) का English उसी data से; खाली मान = English में न दिखे।
   • (v1.2) data-h attribute भी बदलता है; textarea का placeholder भी; एक ही पाठ का अनुवाद याद (MEMO)।
   • (v1.2) भाषा-पट्टी के हर बटन पर भाषा का नाम तीनों रूप में: देवनागरी · रोमन · अपनी लिपि (Founder-नियम, 15-Nov-2026)।
   Founder-नियम (15-Nov-2026): पहले पूरा पैनल English, फिर बांग्ला, कन्नड़,
   मराठी; उसके बाद ही किसी कोर्स का अनुवाद।
   • 1 इंजन + भाषा-पैक (/assets/i18n/panel_<भाषा>.js, generator से बना)।
     पन्ना और पता वही रहते हैं; हिंदी मूल है, दूसरी भाषा सिर्फ़ दिखावट।
   • भाषा का चुनाव: पते में ?lang= → चुनी हुई भाषा (acs_dash_lang) → हिंदी।
     acs_dash_lang तीन जगह से लिखी जाती है: यह भाषा-पट्टी, ?lang=, और साइट का
     🌐 भाषा-बटन (acs-universal.js का acsLangGo)। browser की भाषा से कभी नहीं:
     acs_lang नहीं पढ़ते, क्योंकि acs-translate.js उसमें browser की भाषा भी लिख देता है।
   • data हमेशा हिंदी: बदला हुआ हर पाठ-टुकड़ा अपना हिंदी मूल याद रखता है;
     ACS_PANEL_I18N.src(el) से कोड हिंदी मूल पढ़ता है (server को हिंदी ही जाए)।
   • [data-i18n-skip] या translate="no" वाले हिस्से नहीं बदलते (जैसे
     हिंदी नियम-पत्र, उपयोगकर्ता का अपना लिखा पाठ)।
   • भाषा-पट्टी: #acsPanelLangSlot में (न हो तो body के सबसे ऊपर)।
     बदलने पर पन्ना दोबारा नहीं खुलता, भरा हुआ फ़ॉर्म सुरक्षित रहता है।
   • (v1.1) <select data-i18n-sort>: दूसरी भाषा में सूची उसी भाषा के अक्षर-क्रम में
     (जैसे English में देश A से Z)। हर optgroup अपने भीतर। ख़ाली value और "_" से शुरू
     होने वाले विकल्प ऊपर अपनी जगह। value कभी नहीं बदलती; हिंदी में मूल क्रम वापस।
   • (v1.1) <a data-href-en="..."> : English में कड़ी उस पते पर (हिंदी में मूल पता)।
   • (v1.1) भाषा बदलते ही document पर "acs-panel-lang" event (detail.lang)।
   ES5 (Android 8)। पैक न आए तो पन्ना हिंदी में खुलता है (fail-open)।
   ═══════════════════════════════════════════════════════════ */
(function(){
"use strict";
if(window.ACS_PANEL_I18N) return;
var VER="1.8";
var LSK="acs_dash_lang";
/* पैनल की भाषाएँ: [कोड, देवनागरी नाम, रोमन नाम, अपनी लिपि में नाम]। नई भाषा = यहाँ एक पंक्ति + उसका पैक।
   (v1.2, Founder-नियम 15-Nov-2026) भाषा के हर बटन पर नाम तीनों रूप में, हमेशा: देवनागरी · रोमन · अपनी लिपि
   (जो रूप दूसरे जैसा ही हो, वह दोबारा नहीं)। तीनों नाम साइट के 🌐 बटन की तालिका (acs-universal.js:
   ACS_LANG_DEVA, ACS_LANG_ROMAN, ACS_LANG_NAMES) से हूबहू; पहरा: dev_lang_switch_check.js। */
var LANGS=[["hi","हिन्दी","Hindi","हिन्दी"],["en","अंग्रेज़ी","English","English"],["kn","कन्नड","Kannada","ಕನ್ನಡ"]];
var PACK={en:"/assets/i18n/panel_en.js",kn:"/assets/i18n/panel_kn.js"};
var DEVC=/[ऀ-ॿ]/;
var ATTRS=["placeholder","title","aria-label","alt","label","data-h"];   /* (v1.2) data-h: dashboard में CSS ::before से दिखता है */
var NAV_SEL=".acs-drawer a,.acs-fmenu a,#acsMenuList a,.acs-nav a";

function known(c){ return c==="hi"||!!PACK[c]; }
function pick(){
  var m=(location.search||"").match(/[?&]lang=([a-z]{2,3})(?:&|$)/), v="";
  if(m&&known(m[1])){ try{ localStorage.setItem(LSK,m[1]); }catch(e){} return m[1]; }
  try{ v=localStorage.getItem(LSK)||""; }catch(e){}
  if(known(v)) return v;
  return "hi";
}

var CUR="hi", D=null, KEYS=[], GEO={}, ACTIVE=false, mo=null, pend=[], raf=false, DRAFT="", OWN={};
/* (v1.7) English पते को इस भाषा के अपने पन्ने पर मोड़ना (पैक का "P": "/en/x" → "/<भाषा>/x"); अपना पन्ना न हो, तो English पता वैसा ही */
function ownHref(h){ if(!h) return h; var m=/^([^?#]*)(.*)$/.exec(String(h)); return (m&&Object.prototype.hasOwnProperty.call(OWN,m[1]))?OWN[m[1]]+m[2]:h; }
var MEMO={};   /* (v1.2) एक ही पाठ बार-बार आए तो दोबारा न खोजें (कमज़ोर फ़ोन) */
var ORIG=(typeof WeakMap==="function")?new WeakMap():null;   /* textNode → {o:मूल, t:अनुवाद} */
var AORIG=(typeof WeakMap==="function")?new WeakMap():null;  /* element → {attr:{o,t}} */

function devAt(s,i){ var c=s.charCodeAt(i); return c>=0x0900&&c<=0x097F; }
function fragSwap(t){
  var out=t, i, k, idx, res, pos, e, okL, okR;
  for(i=0;i<KEYS.length;i++){
    k=KEYS[i]; if(k.length<2) continue;
    idx=out.indexOf(k); if(idx===-1) continue;
    res=""; pos=0;
    while(idx!==-1){
      okL=!(idx>0&&devAt(out,idx-1)&&devAt(k,0));
      e=idx+k.length;
      okR=!(e<out.length&&devAt(out,e)&&devAt(k,k.length-1));
      /* जगह का नाम (पैक की G-सूची) वाक्य के बीच सिर्फ़ सूची-जैसी जगह पर: पहले ":" "," "·" "(" या शुरुआत,
         बाद में "," "·" ")" "।" "." या अंत। ("गया" जिला बदले, "भेजा गया" की क्रिया नहीं) */
      if(okL&&okR&&GEO[k]){ okL=/(^|[:,\u00b7(])\s*$/.test(out.slice(0,idx)); okR=/^\s*($|[,\u00b7()\u0964.])/.test(out.slice(e)); }
      if(okL&&okR){ res+=out.slice(pos,idx)+D[k]; pos=e; }
      idx=out.indexOf(k,e);
    }
    res+=out.slice(pos); out=res;
    if(!DEVC.test(out)) break;
  }
  /* बाक़ी सिर्फ़ पूर्ण-विराम बचा हो तो उसे "." (पूरा हिंदी वाक्य बचा हो तो नहीं छूते) */
  if(DEVC.test(out)&&!/[\u0900-\u0963\u0966-\u097F]/.test(out)) out=out.replace(/\s*\u0964/g,".").replace(/\u0965/g,".");
  return out;
}
/* (v1.3) साँचे: पैक का T = [[हिंदी साँचा, दूसरी भाषा का साँचा], ...]; {0}, {1} = बदलने वाला हिस्सा।
   बीच वाला {n} कम-से-कम पाठ लेता है; आख़िरी {n} (जिसके बाद साँचे में कुछ नहीं) पंक्ति के अंत तक।
   लंबा साँचा पहले। साँचे से पहले और बाद का पाठ, और {n} में आया पाठ, अलग से बदला जाता है। */
var TPL=[];
function rxEsc(s){ return s.replace(/[.*+?^${}()|[\]\\\/]/g,"\\$&"); }
function compileT(T){
  var out=[], i, j, h, parts, ids, src, st;
  for(i=0;i<(T||[]).length;i++){
    h=T[i][0]; parts=h.split(/\{\d+\}/); ids=h.match(/\{\d+\}/g)||[]; st=parts.join("");
    if(!ids.length||st.replace(/\s/g,"").length<3) continue;
    src="";
    for(j=0;j<parts.length;j++){ src+=rxEsc(parts[j]); if(j<ids.length) src+=(j===ids.length-1&&parts[j+1]==="")?"([^\\n]*)":"([^\\n]+?)"; }
    try{ out.push({re:new RegExp(src), en:T[i][1], ids:ids, n:st.length}); }catch(e){}
  }
  out.sort(function(a,b){ return b.n-a.n; });
  return out;
}
function part(x, depth){
  if(!x||!DEVC.test(x)) return x;
  var m=x.match(/^(\s*)([\s\S]*?)(\s*)$/), r;
  if(D.hasOwnProperty(m[2])) return m[1]+D[m[2]]+m[3];
  if(depth<3){ r=tplSwap(x, depth+1); if(r!==null) return r; }
  return fragSwap(x);
}
function tplSwap(c, depth){
  var i, g, m, T, vals, out;
  for(i=0;i<TPL.length;i++){
    T=TPL[i]; m=T.re.exec(c); if(!m) continue;
    vals={}; for(g=0;g<T.ids.length;g++) vals[T.ids[g]]=part(m[g+1], depth);
    out=T.en.replace(/\{\d+\}/g,function(k){ return vals.hasOwnProperty(k)?vals[k]:""; });
    return part(c.slice(0,m.index), depth)+out+part(c.slice(m.index+m[0].length), depth);
  }
  return null;
}
/* (v1.8, कन्नड़ क-3; Founder: "कन्नड मे सब कुछ कन्नड मे ही हो") पाठ में बचे English शब्द उस भाषा की लिपि में।
   पैक के खाने: L = { english शब्द या वाक्यांश (छोटे अक्षरों में): उस भाषा का रूप }, LK = जो Latin में ही रहते हैं (brand, छोटे रूप), LP = पूरे नाम जो Latin में रहते हैं, LS = उस भाषा की लिपि।
   नहीं छुआ जाता: पते, email, फ़ाइलों के नाम, ACS-नंबर, {खाने}, और "(English)" वाला कोष्ठक जो उस भाषा के शब्द के ठीक बाद हो।
   strict = पूरा पाठ Latin का है (हिंदी से अनुवाद होकर नहीं आया): तब बदलाव तभी, जब बदलने के बाद कोई और English शब्द न बचे
   (बचे, तो वह किसी का नाम या data है: वैसा ही रहता है)। */
var LX=null, LXRE=null, LKEEP={}, OWNRE=null, LPHR=[];
function compileL(L, K, S, P){
  LX=null; LXRE=null; LKEEP={}; OWNRE=null; LPHR=P||[]; if(!L||!S) return;
  var ks=Object.keys(L).sort(function(a,b){ return b.length-a.length; }), parts=[], i;
  if(!ks.length) return;
  for(i=0;i<ks.length;i++) parts.push(ks[i].replace(/[.*+?^${}()|[\]\\\/]/g,"\\$&").replace(/ /g,"[ -]"));
  try{ OWNRE=new RegExp("["+S+"]"); LXRE=new RegExp("(^|[^A-Za-z0-9_@])("+parts.join("|")+")(?![A-Za-z0-9_@])","gi"); }catch(e){ LXRE=null; return; }
  LX=L; for(i=0;i<(K||[]).length;i++) LKEEP[K[i]]=1;
}
function lshield(t){
  var out=[], m, k, re;
  function add(r){ r.lastIndex=0; while((m=r.exec(t))){ if(!m[0].length){ r.lastIndex++; continue; } out.push([m.index,m.index+m[0].length]); } }
  for(k=0;k<LPHR.length;k++){ var q=-1; while((q=t.indexOf(LPHR[k],q+1))>=0) out.push([q,q+LPHR[k].length]); }   /* पूरे नाम जो Latin में ही रहते हैं (Applied Computer School) */
  add(/\{[^{}]*\}/g); add(/https?:\/\/[^\s<>"')]+/g); add(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g);
  add(/(?:[\w-]+\/)*[\w-]+(\.[\w-]+)*\.(com|org|in|html|js|json|pdf|png|jpg)(?![A-Za-z])(\/[^\s<>"',;)]*)?/gi);
  add(/ACS-[A-Z]{0,3}-?\d{4}-[\dX\u2026.]*/g); add(/\d[\dA-Za-z]*[A-Za-z]/g); add(/\bv\d+(\.\d+)*\b/g); add(/[A-Za-z]+_[A-Za-z_]+/g);
  re=/\(([^()]*)\)/g;
  while((m=re.exec(t))){ if(!/[A-Za-z]/.test(m[1])||OWNRE.test(m[1])) continue;
    k=m.index-1; while(k>=0&&/[\s\u200c\u200d]/.test(t.charAt(k))) k--;
    if(k>=0&&OWNRE.test(t.charAt(k))) out.push([m.index,m.index+m[0].length]); }
  return out;
}
function inSh(sh, a, b){ for(var i=0;i<sh.length;i++) if(a<sh[i][1]&&b>sh[i][0]) return true; return false; }
function latinFix(t, strict){
  if(!LXRE||!/[A-Za-z]{2}/.test(t)) return t;
  var sh=lshield(t), out="", pos=0, hit=false, m, a, b, k, w, x, sh2;
  LXRE.lastIndex=0;
  while((m=LXRE.exec(t))){ a=m.index+m[1].length; b=a+m[2].length;
    if(inSh(sh,a,b)) continue;
    k=m[2].toLowerCase().replace(/-/g," "); if(!Object.prototype.hasOwnProperty.call(LX,k)) continue;
    out+=t.slice(pos,a)+LX[k]; pos=b; hit=true; }
  if(!hit) return t;
  out+=t.slice(pos);
  if(strict){ sh2=lshield(out); w=/[A-Za-z][A-Za-z0-9]*/g;
    while((x=w.exec(out))){ if(x[0].length<2||inSh(sh2,x.index,x.index+x[0].length)||LKEEP[x[0]]===1||/[a-z][A-Z]/.test(x[0])) continue; return t; } }
  return out;
}
/* पूरा पाठ Latin का: पहले नाम-तालिका में ठीक वही नाम (देश, उदाहरण); नहीं, तो शब्द-तालिका (strict) */
function latinOwn(v){
  var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(v);
  if(NM&&m&&m[2]&&Object.prototype.hasOwnProperty.call(NM,m[2])) return m[1]+NM[m[2]]+m[3];
  return latinFix(v,true);
}
/* पैक में पूरा वाक्य जैसा है वैसा मिले, तो वही (पैक बनाते समय जाँचा हुआ; प्रमाणपत्र की दो भाषा वाली पंक्तियाँ भी ऐसे ही रहती हैं);
   शब्द-तालिका सिर्फ़ उस पाठ पर, जो टुकड़े जोड़कर बना */
function tr(t){ var r; if(D&&DEVC.test(t)&&D.hasOwnProperty(t)) return D[t]; EXACT=false; r=tr0(t); return (LXRE&&r!==t&&!EXACT)?latinFix(r,false):r; }
var EXACT=false;
function tr0(t){
  if(!D||!DEVC.test(t)) return t;
  if(D.hasOwnProperty(t)) return D[t];
  /* HTML में कई space/नई पंक्ति एक ही दिखती हैं, इसलिए मिलान भी वैसे ही */
  var c=t.replace(/\s+/g," "), m=c.match(/^( ?)([\s\S]*?)( ?)$/), r;
  if(m&&D.hasOwnProperty(m[2])){ EXACT=true; return m[1]+D[m[2]]+m[3]; }
  if(TPL.length){ r=tplSwap(c, 0); if(r!==null) return r; }
  return fragSwap(c);
}
/* alert/confirm के संदेश में पंक्तियाँ बनी रहें: पंक्ति-दर-पंक्ति */
function trMsg(t){ return String(t).split("\n").map(tr).join("\n"); }
function skipped(el){
  while(el&&el.nodeType===1){
    var tg=el.tagName;
    if(tg==="SCRIPT"||tg==="STYLE"||tg==="TEXTAREA"||tg==="NOSCRIPT") return true;
    if(el.hasAttribute("data-i18n-skip")||el.getAttribute("translate")==="no"||el.id==="acsPanelLangBar") return true;
    el=el.parentNode;
  }
  return false;
}
/* (v1.8) नाम-तालिका: N = { English नाम: उस भाषा का नाम }, NT = [[English साँचा (regex), उस भाषा का साँचा ({1}, {2})]]।
   साँचे का जो हिस्सा Latin अक्षरों का है, वह भी तालिका में मिलना चाहिए; न मिले, तो पूरा नाम English में ही रहता है (आधा-आधा नहीं)। */
var NM=null, NT=[];
function compileN(a){ var out=[], i; if(!a) return out;
  for(i=0;i<a.length;i++){ try{ out.push({ re:new RegExp(a[i][0]), own:String(a[i][1]) }); }catch(e){} }
  return out; }
function nameFind(en, depth){
  var i,k,m,o,part,ok;
  if(!NM) return null;
  if(Object.prototype.hasOwnProperty.call(NM,en)) return NM[en];
  if(depth>3) return null;
  for(i=0;i<NT.length;i++){ m=NT[i].re.exec(en); if(!m) continue;
    o=NT[i].own; ok=true;
    for(k=1;k<m.length;k++){ part=m[k];
      if(/[A-Za-z]/.test(part)){ part=nameFind(part, depth+1); if(part===null){ ok=false; break; } }
      o=o.split("{"+k+"}").join(part); }
    if(ok) return o; }
  return null;
}
function nameOwn(en){ var r; en=String(en); if(!ACTIVE||CUR==="en"||!NM||!en) return en; r=nameFind(en,0); return r===null?en:r; }
function doText(n){
  var v=n.nodeValue, p=n.parentNode, alt;
  /* (v1.2) data का English: पाठ का अकेला पिता data-tr-<भाषा> रखे, तो वही (खाली हो तो कुछ नहीं दिखता) */
  /* (v1.6) उस भाषा का नाम data में न हो, तो English नाम (data-tr-en): किसी भी भाषा में देवनागरी न बचे */
  var ta=(p&&p.nodeType===1&&p.childNodes.length===1)?(p.hasAttribute("data-tr-"+CUR)?"data-tr-"+CUR:(p.hasAttribute("data-tr-en")?"data-tr-en":"")):"";
  if(ta){
    alt=p.getAttribute(ta); if(ta==="data-tr-en"&&NM&&alt) alt=nameOwn(alt); if(alt===v) return;
    if(ORIG) ORIG.set(n,{o:v,t:alt}); n.nodeValue=alt; return; }
  if(v&&(LXRE||NM)&&!DEVC.test(v)){   /* (v1.8) पूरा पाठ Latin का: सिर्फ़ तब, जब वह पन्ने का अपना शब्द हो (किसी का नाम या data नहीं) */
    if(p&&p.nodeType===1&&p.hasAttribute("data-i18n-user")) return;
    alt=latinOwn(v); if(alt!==v){ if(ORIG) ORIG.set(n,{o:v,t:alt}); n.nodeValue=alt; } return; }
  if(!v||!DEVC.test(v)) return;
  /* (v1.5) उपयोगकर्ता का लिखा हिस्सा (data-i18n-user) जैसा है वैसा; उसके आगे-पीछे का पाठ बदलता है */
  var uv=(p&&p.nodeType===1)?p.getAttribute("data-i18n-user"):null, nv, parts, pi;
  if(uv&&v.indexOf(uv)>-1){ parts=v.split(uv); for(pi=0;pi<parts.length;pi++) if(DEVC.test(parts[pi])) parts[pi]=tr(parts[pi]); nv=parts.join(uv); }
  else nv=MEMO.hasOwnProperty(v)?MEMO[v]:(MEMO[v]=tr(v));
  if(nv===v) return;
  if(ORIG) ORIG.set(n,{o:v,t:nv});
  n.nodeValue=nv;
}
function doAttrs(root){
  if(!root.querySelectorAll) return;
  var i,j,a,els,el,v,nv,rec,list=[root];
  els=root.querySelectorAll("*"); for(j=0;j<els.length;j++) list.push(els[j]);
  for(j=0;j<list.length;j++){ el=list[j]; if(el.nodeType!==1) continue;
    /* (v1.2) textarea का भीतर का पाठ उपयोगकर्ता का है, पर उसका placeholder/title बदलते हैं */
    if(el.tagName==="TEXTAREA"?(skipped(el.parentNode)||el.hasAttribute("data-i18n-skip")||el.getAttribute("translate")==="no"):skipped(el)) continue;
    for(i=0;i<ATTRS.length;i++){ a=ATTRS[i]; v=el.getAttribute(a);
      if(v&&(DEVC.test(v)||LXRE||NM)){ nv=DEVC.test(v)?tr(v):latinOwn(v); if(nv!==v){
        if(AORIG){ rec=AORIG.get(el)||{}; rec[a]={o:v,t:nv}; AORIG.set(el,rec); }
        el.setAttribute(a,nv); } } }
    if(el.tagName==="INPUT"&&/^(button|submit)$/i.test(el.type||"")&&DEVC.test(el.value||"")){
      v=el.value; nv=tr(v); if(nv!==v){ if(AORIG){ rec=AORIG.get(el)||{}; rec.value={o:v,t:nv}; AORIG.set(el,rec); } el.value=nv; } }
  }
}
function walk(root){
  if(!root) return;
  if(root.nodeType===3){ if(!skipped(root.parentNode)) doText(root); return; }
  if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11) return;
  if(root.nodeType===1&&skipped(root)) return;
  var doc=root.ownerDocument||root, tw=doc.createTreeWalker(root,4,null,false), n;
  var todo=[]; while((n=tw.nextNode())) todo.push(n);
  for(var i=0;i<todo.length;i++){ n=todo[i]; if(!skipped(n.parentNode)) doText(n); }
  doAttrs(root.nodeType===9?root.documentElement:root);
}
function flush(){ raf=false; var list=pend; pend=[]; for(var i=0;i<list.length;i++){ try{ walk(list[i]); }catch(e){} } if(ACTIVE){ sortAll(true); try{ swapNav(true); }catch(e){} } }   /* (v1.4) बाद में बनी कड़ियाँ भी */
function queue(n){ pend.push(n); if(!raf){ raf=true; (window.requestAnimationFrame||setTimeout)(flush,0); } }
function startObs(){
  if(mo||!window.MutationObserver||!document.body) return;
  mo=new MutationObserver(function(recs){
    if(!ACTIVE) return;
    for(var i=0;i<recs.length;i++){ var r=recs[i];
      if(r.type==="characterData") queue(r.target);
      else if(r.type==="attributes") queue(r.target);
      else if(r.addedNodes) for(var j=0;j<r.addedNodes.length;j++) queue(r.addedNodes[j]); }
  });
  /* (v1.4) data-href-<भाषा> बाद में लगे, तो भी कड़ी बदले */
  var af=ATTRS.slice(), li; for(li=0;li<LANGS.length;li++) if(LANGS[li][0]!=="hi") af.push("data-href-"+LANGS[li][0]);
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:af});
}
/* हिंदी मूल वापस (भाषा हिंदी करने पर) — पन्ना दोबारा खोले बिना */
function restore(){
  if(!ORIG||!document.body) return;
  var tw=document.createTreeWalker(document.body,4,null,false), n, r;
  while((n=tw.nextNode())){ r=ORIG.get(n); if(r&&n.nodeValue===r.t) n.nodeValue=r.o; }
  var els=document.body.querySelectorAll("*"), i, el, rec, a;
  for(i=0;i<els.length;i++){ el=els[i]; rec=AORIG&&AORIG.get(el); if(!rec) continue;
    for(a in rec){ if(!rec.hasOwnProperty(a)) continue;
      if(a==="value"){ if(el.value===rec[a].t) el.value=rec[a].o; }
      else if(el.getAttribute(a)===rec[a].t) el.setAttribute(a,rec[a].o); } }
  swapNav(false); bodyCls(false); sortAll(false);
  if(TITLE0!==null) document.title=TITLE0;
}
/* कोड के लिए: किसी element का हिंदी मूल पाठ (option, लॉक-पट्टी आदि) */
function src(el){
  if(!el) return "";
  if(el.nodeType===3){ var r0=ORIG&&ORIG.get(el); return (r0&&el.nodeValue===r0.t)?r0.o:el.nodeValue; }
  var out="", tw=(el.ownerDocument||document).createTreeWalker(el,4,null,false), n, r;
  while((n=tw.nextNode())){ r=ORIG&&ORIG.get(n); out+=(r&&n.nodeValue===r.t)?r.o:n.nodeValue; }
  return out;
}
/* English में menu की कड़ियाँ English पन्नों पर (links.js का href_en) */
var NAVO=(typeof WeakMap==="function")?new WeakMap():null;
var HSET=(typeof WeakMap==="function")?new WeakMap():null;   /* (v1.7) कड़ी → वह पता जो इंजन ने पिछली बार लगाया */
function swapNav(on){
  var L=window.ACS_LINKS, as, i, j, a, h, m;
  if(!document.querySelectorAll) return;
  /* (v1.1) किसी भी पन्ने की कड़ी: data-href-<भाषा> (links.js न हो तब भी, जैसे रजिस्ट्रेशन गाइड) */
  /* (v1.7) उस भाषा का पता न हो, तो English पता (data-href-en): जिस भाषा का पन्ना या काग़ज़ अभी नहीं बना, वहाँ English (Founder का फ़ैसला 16-Nov-2026) */
  as=document.querySelectorAll("a[data-href-"+(on?CUR:"x-none")+"],a[data-href-"+(on?"en":"x-none")+"],a[data-i18n-href]");
  for(i=0;i<as.length;i++){ a=as[i];
    if(on){ h=a.getAttribute("data-href-"+CUR)||ownHref(a.getAttribute("data-href-en")); if(!h) continue; m=a.getAttribute("href")||"";
      /* (v1.4) मूल पता याद रखना: पहली बार, या जब कोड ने href दोबारा (हिंदी में) लिख दिया हो।
         (v1.7) जो पता इंजन ने ख़ुद लगाया था (HSET), वह "कोड का नया हिंदी पता" नहीं है: तब मूल वही रहता है
         (जैसे English पता लगने के बाद उसी भाषा का अपना पता, data-href-<भाषा>, देर से जुड़े) */
      if(!a.hasAttribute("data-i18n-href")||(m!==h&&!(HSET&&HSET.get(a)===m))) a.setAttribute("data-i18n-href",m);
      if(m!==h){ a.setAttribute("href",h); if(HSET) HSET.set(a,h); } }
    else if(a.hasAttribute("data-i18n-href")){ a.setAttribute("href",a.getAttribute("data-i18n-href")); a.removeAttribute("data-i18n-href"); } }
  if(!L||!L.menu) return;
  as=document.querySelectorAll(NAV_SEL);
  for(i=0;i<as.length;i++){ a=as[i];
    if(on){ h=a.getAttribute("href");   /* (v1.7) मेनू की कड़ियाँ हर ग़ैर-हिंदी भाषा में English पन्नों पर (उस भाषा के पन्ने बनने तक) */
      for(j=0;j<L.menu.length;j++){ m=L.menu[j];
        if(m.href_en&&m.href_en!==m.href&&h===m.href){ if(NAVO&&!NAVO.has(a)) NAVO.set(a,h); a.setAttribute("href",ownHref(m.href_en)); break; } } }
    else if(NAVO&&NAVO.has(a)){ a.setAttribute("href",NAVO.get(a)); NAVO["delete"](a); } }
}
/* (v1.1) सूची का क्रम: दूसरी भाषा में उसी भाषा के अक्षर-क्रम से, हिंदी में मूल क्रम।
   मूल क्रम WeakMap में (DOM में कोई निशान नहीं)। value और चुना हुआ विकल्प नहीं बदलता। */
var ORD=(typeof WeakMap==="function")?new WeakMap():null, ORDN=0;
function sortOne(par, on){
  if(!ORD) return;
  var kids=[], c, i, pin=[], rest=[], want;
  for(c=par.firstChild;c;c=c.nextSibling) if(c.nodeType===1&&c.tagName==="OPTION"){ if(!ORD.has(c)) ORD.set(c,++ORDN); kids.push(c); }
  if(kids.length<3) return;
  for(i=0;i<kids.length;i++){ c=kids[i]; if(on&&(c.value===""||c.value.charAt(0)==="_")) pin.push(c); else rest.push(c); }
  function byOrd(a,b){ return ORD.get(a)-ORD.get(b); }
  pin.sort(byOrd);
  if(on) rest.sort(function(a,b){ var x=(a.textContent||"").replace(/^\s+/,""), y=(b.textContent||"").replace(/^\s+/,""), r;
    try{ r=x.localeCompare(y,CUR,{sensitivity:"base"}); }catch(e){ r=x<y?-1:(x>y?1:0); } return r||byOrd(a,b); });
  else rest.sort(byOrd);
  want=pin.concat(rest);
  for(i=0;i<want.length;i++) if(kids[i]!==want[i]) break;
  if(i===want.length) return;
  /* हर विकल्प की जगह (slot) वही रहती है: optgroup जहाँ हैं वहीं; सिर्फ़ विकल्प आपस में बदलते हैं */
  var sel=par.tagName==="SELECT"?par:par.parentNode, v=sel&&sel.value, ph=[];
  for(i=0;i<kids.length;i++){ ph.push(document.createComment("")); par.replaceChild(ph[i],kids[i]); }
  for(i=0;i<want.length;i++) par.replaceChild(want[i],ph[i]);
  if(sel&&sel.value!==v) sel.value=v;
}
function sortAll(on){
  if(!document.querySelectorAll) return;
  var ss=document.querySelectorAll("select[data-i18n-sort]"), i, j, gs;
  for(i=0;i<ss.length;i++){ try{ sortOne(ss[i],on); gs=ss[i].getElementsByTagName("optgroup"); for(j=0;j<gs.length;j++) sortOne(gs[j],on); }catch(e){} }
}
function emit(){ try{ var ev; if(typeof CustomEvent==="function") ev=new CustomEvent("acs-panel-lang",{detail:{lang:CUR}});
  else { ev=document.createEvent("CustomEvent"); ev.initCustomEvent("acs-panel-lang",false,false,{lang:CUR}); } document.dispatchEvent(ev); }catch(e){} }
var TITLE0=null;
function activate(){
  if(!D||!document.body) return;
  ACTIVE=true;
  try{ document.documentElement.setAttribute("lang",CUR); }catch(e){}
  try{ if(TITLE0===null) TITLE0=document.title; if(DEVC.test(document.title)) document.title=tr(document.title); }catch(e){}
  walk(document.body); sortAll(true); swapNav(true); bodyCls(true); startObs(); bar();
}
/* जिन पन्नों पर body.hi/body.en से फ़ॉन्ट चुना जाता है (जैसे लॉगिन), वहाँ class भी बदले */
var HADHI=null;
function bodyCls(on){
  var b=document.body; if(!b||!b.classList) return;
  if(on){ if(HADHI===null) HADHI=b.classList.contains("hi"); if(HADHI){ b.classList.remove("hi"); b.classList.add(CUR); } }
  else if(HADHI){ b.classList.remove(CUR); b.classList.add("hi"); }
}
var NA=window.alert, NC=window.confirm, NP=window.prompt;
function wrapDialogs(){
  window.alert=function(t){ return NA.call(window, ACTIVE?trMsg(t):t); };
  window.confirm=function(t){ return NC.call(window, ACTIVE?trMsg(t):t); };
  window.prompt=function(t,d){ return NP.call(window, ACTIVE?trMsg(t):t, d); };
}
function unwait(){ try{ document.documentElement.classList.remove("acs-i18n-wait"); }catch(e){} }

/* भाषा-पट्टी */
/* बटन का नाम: देवनागरी · रोमन · अपनी लिपि; दोहराव हटाकर (हिन्दी · Hindi, अंग्रेज़ी · English) */
function names3(L){
  var out=[], seen={}, k, x, lg=["hi","en",L[0]];
  for(k=1;k<4;k++){ x=L[k]; if(!x||seen[x.toLowerCase()]) continue; seen[x.toLowerCase()]=1;
    out.push('<span lang="'+lg[k-1]+'" dir="auto">'+x+'</span>'); }
  return out.join(' · ');
}
function bar(){
  if(!document.body) return;
  var b=document.getElementById("acsPanelLangBar");
  if(!b){
    b=document.createElement("div"); b.id="acsPanelLangBar"; b.setAttribute("role","group");
    b.setAttribute("aria-label","भाषा / Language");
    b.style.cssText="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:8px auto;font-size:16px";
    var slot=document.getElementById("acsPanelLangSlot");
    if(slot) slot.appendChild(b); else document.body.insertBefore(b, document.body.firstChild);
  }
  var h='<span style="font-weight:700">🌐 भाषा / Language:</span>', i;
  for(i=0;i<LANGS.length;i++){
    var c=LANGS[i][0], on=(c===CUR);
    h+='<button type="button" data-plang="'+c+'" aria-pressed="'+(on?"true":"false")+'" style="font:inherit;font-size:16px;font-weight:700;padding:6px 14px;border-radius:999px;cursor:pointer;border:2px solid #1565C0;'
      +(on?'background:#1565C0;color:#fff':'background:#fff;color:#1565C0')+'">'+names3(LANGS[i])+'</button>';
  }
  /* (v1.6) AI-मसौदा की सूचना: पैक की भाषा में, पट्टी के नीचे पूरी चौड़ाई में */
  if(ACTIVE&&DRAFT) h+='<div id="acsPanelDraft" lang="'+CUR+'" style="flex-basis:100%;text-align:center;font-size:16px;line-height:1.5;color:#5a4300;background:#FFF8E1;border:1px solid #F9A825;border-radius:8px;padding:6px 10px">ℹ️ '+String(DRAFT).replace(/&/g,"&amp;").replace(/</g,"&lt;")+'</div>';
  b.innerHTML=h;
  var bs=b.querySelectorAll("button[data-plang]");
  for(i=0;i<bs.length;i++) bs[i].onclick=function(){ set(this.getAttribute("data-plang")); };
}
var loading={};
function load(c, cb){
  var P=window.ACS_PANEL_PACKS||{};
  if(P[c]&&P[c].D) return cb(P[c]);
  if(loading[c]) return loading[c].push(cb);
  loading[c]=[cb];
  var s=document.createElement("script"); s.src=PACK[c]+"?v="+VER;
  function done(){ var L=loading[c]; loading[c]=null; var pk=(window.ACS_PANEL_PACKS||{})[c]||null; for(var i=0;i<L.length;i++) L[i](pk&&pk.D?pk:null); }
  s.onload=done; s.onerror=done;
  (document.head||document.documentElement).appendChild(s);
}
function useLang(c, cb){
  if(c==="hi"){ if(ACTIVE){ ACTIVE=false; restore(); } CUR="hi"; D=null; KEYS=[]; MEMO={}; TPL=[]; DRAFT=""; OWN={}; NM=null; NT=[]; compileL(null);
    try{ document.documentElement.setAttribute("lang","hi"); }catch(e){} bar(); unwait(); emit(); if(cb) cb(true); return; }
  load(c, function(pk){
    if(!pk){ unwait(); bar(); if(cb) cb(false); return; }
    if(ACTIVE&&CUR!==c){ ACTIVE=false; restore(); }
    CUR=c; D=pk.D; DRAFT=pk.draft||""; OWN=pk.P||{}; MEMO={}; KEYS=Object.keys(D).sort(function(a,b){ return b.length-a.length; }); TPL=compileT(pk.T);
    GEO={}; var g=pk.G||[], gi; for(gi=0;gi<g.length;gi++) GEO[g[gi]]=1;
    NM=pk.N||null; NT=compileN(pk.NT); compileL(pk.L, pk.LK, pk.LS, pk.LP);
    function go(){ activate(); unwait(); emit(); if(cb) cb(true); }
    if(document.body&&document.readyState!=="loading") go(); else document.addEventListener("DOMContentLoaded",go);
  });
}
function set(c){
  if(!known(c)) return;
  try{ localStorage.setItem(LSK,c); }catch(e){}
  useLang(c);
}

/* शुरुआत */
var START=pick();
wrapDialogs();
if(START!=="hi"){
  try{ document.documentElement.classList.add("acs-i18n-wait");
    var st=document.createElement("style"); st.textContent=".acs-i18n-wait body{visibility:hidden}";
    (document.head||document.documentElement).appendChild(st); }catch(e){}
  setTimeout(unwait, 4000);   /* पैक देर करे तो भी पन्ना 4 सेकंड में दिखे (हिंदी में) */
}
function boot(){ bar(); if(START!=="hi") useLang(START); }
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot); else boot();

window.ACS_PANEL_I18N={ version:VER, lang:function(){ return CUR; }, langs:LANGS, has:known, set:set, tr:function(t){ return tr(String(t)); },
  walk:walk, src:src, own:function(h){ return ACTIVE?ownHref(String(h)):String(h); }, name:function(en){ return nameOwn(en); }, get active(){ return ACTIVE; } };
})();
