/* ════════════════════════════════════════════════════════════
   panel_i18n.js v1.1 · 15-Nov-2026 · पैनल का साझा भाषा-इंजन (पैनल-1, पैनल-1ख)
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
var VER="1.1";
var LSK="acs_dash_lang";
/* पैनल की भाषाएँ: [कोड, अपना नाम]। नई भाषा = यहाँ एक पंक्ति + उसका पैक। */
var LANGS=[["hi","हिंदी"],["en","English"]];
var PACK={en:"/assets/i18n/panel_en.js"};
var DEVC=/[ऀ-ॿ]/;
var ATTRS=["placeholder","title","aria-label","alt","label"];
var NAV_SEL=".acs-drawer a,.acs-fmenu a,#acsMenuList a,.acs-nav a";

function known(c){ return c==="hi"||!!PACK[c]; }
function pick(){
  var m=(location.search||"").match(/[?&]lang=([a-z]{2,3})(?:&|$)/), v="";
  if(m&&known(m[1])){ try{ localStorage.setItem(LSK,m[1]); }catch(e){} return m[1]; }
  try{ v=localStorage.getItem(LSK)||""; }catch(e){}
  if(known(v)) return v;
  return "hi";
}

var CUR="hi", D=null, KEYS=[], GEO={}, ACTIVE=false, mo=null, pend=[], raf=false;
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
function tr(t){
  if(!D||!DEVC.test(t)) return t;
  if(D.hasOwnProperty(t)) return D[t];
  /* HTML में कई space/नई पंक्ति एक ही दिखती हैं, इसलिए मिलान भी वैसे ही */
  var c=t.replace(/\s+/g," "), m=c.match(/^( ?)([\s\S]*?)( ?)$/);
  if(m&&D.hasOwnProperty(m[2])) return m[1]+D[m[2]]+m[3];
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
function doText(n){
  var v=n.nodeValue; if(!v||!DEVC.test(v)) return;
  var nv=tr(v); if(nv===v) return;
  if(ORIG) ORIG.set(n,{o:v,t:nv});
  n.nodeValue=nv;
}
function doAttrs(root){
  if(!root.querySelectorAll) return;
  var i,j,a,els,el,v,nv,rec,list=[root];
  els=root.querySelectorAll("*"); for(j=0;j<els.length;j++) list.push(els[j]);
  for(j=0;j<list.length;j++){ el=list[j]; if(el.nodeType!==1||skipped(el)) continue;
    for(i=0;i<ATTRS.length;i++){ a=ATTRS[i]; v=el.getAttribute(a);
      if(v&&DEVC.test(v)){ nv=tr(v); if(nv!==v){
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
function flush(){ raf=false; var list=pend; pend=[]; for(var i=0;i<list.length;i++){ try{ walk(list[i]); }catch(e){} } if(ACTIVE) sortAll(true); }
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
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
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
function swapNav(on){
  var L=window.ACS_LINKS, as, i, j, a, h, m;
  if(!document.querySelectorAll) return;
  /* (v1.1) किसी भी पन्ने की कड़ी: data-href-<भाषा> (links.js न हो तब भी, जैसे रजिस्ट्रेशन गाइड) */
  as=document.querySelectorAll("a[data-href-"+(on?CUR:"x-none")+"],a[data-i18n-href]");
  for(i=0;i<as.length;i++){ a=as[i];
    if(on){ h=a.getAttribute("data-href-"+CUR); if(!h) continue; if(!a.hasAttribute("data-i18n-href")) a.setAttribute("data-i18n-href",a.getAttribute("href")||""); a.setAttribute("href",h); }
    else if(a.hasAttribute("data-i18n-href")){ a.setAttribute("href",a.getAttribute("data-i18n-href")); a.removeAttribute("data-i18n-href"); } }
  if(!L||!L.menu) return;
  as=document.querySelectorAll(NAV_SEL);
  for(i=0;i<as.length;i++){ a=as[i];
    if(on){ if(CUR!=="en") continue; h=a.getAttribute("href");
      for(j=0;j<L.menu.length;j++){ m=L.menu[j];
        if(m.href_en&&m.href_en!==m.href&&h===m.href){ if(NAVO&&!NAVO.has(a)) NAVO.set(a,h); a.setAttribute("href",m.href_en); break; } } }
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
      +(on?'background:#1565C0;color:#fff':'background:#fff;color:#1565C0')+'">'+LANGS[i][1]+'</button>';
  }
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
  if(c==="hi"){ if(ACTIVE){ ACTIVE=false; restore(); } CUR="hi"; D=null; KEYS=[];
    try{ document.documentElement.setAttribute("lang","hi"); }catch(e){} bar(); unwait(); emit(); if(cb) cb(true); return; }
  load(c, function(pk){
    if(!pk){ unwait(); bar(); if(cb) cb(false); return; }
    if(ACTIVE&&CUR!==c){ ACTIVE=false; restore(); }
    CUR=c; D=pk.D; KEYS=Object.keys(D).sort(function(a,b){ return b.length-a.length; });
    GEO={}; var g=pk.G||[], gi; for(gi=0;gi<g.length;gi++) GEO[g[gi]]=1;
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
  walk:walk, src:src, get active(){ return ACTIVE; } };
})();
