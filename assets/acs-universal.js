/* ============================================================
   acs-universal.js v2.1 — header + menu + footer का एक दिमाग़
   जगह: /assets/acs-universal.js  (config+links के बाद load)
   • भाषा-सचेत: /en/ folder → English labels/strings; अन्यथा हिंदी।
   • acs- prefix — पुराने script.js/page-JS से कोई टकराव नहीं।
   ============================================================ */
function acsUniversalInit(){
  var C = window.ACS_CONFIG || {}, L = window.ACS_LINKS || {};
  var lang = (location.pathname||"").indexOf("/en/")===0 ? "en" : "hi";

  var STR = {
    hi:{ btnLang:"भाषा", btnMenu:"मेन्यू", drawer:"मेन्यू", orig:"मूल भाषा: हिंदी",
         fbCert:"📜 प्रमाण पत्र देने वाली संस्था", fbContact:"📞 संपर्क",
         warn:"⚠️ भुगतान केवल आधिकारिक Razorpay लिंक से।",
         cert:"प्रमाणन: ", site:" · वेबसाइट: " },
    en:{ btnLang:"Language", btnMenu:"Menu", drawer:"Menu", orig:"Original language: Hindi",
         fbCert:"📜 Certificate-Issuing Body", fbContact:"📞 Contact",
         warn:"⚠️ Payment only via official Razorpay link.",
         cert:"Certification: ", site:" · Website: " }
  }[lang];

  /* 1) config → CSS variables */
  try{
    var r=document.documentElement.style, col=C.colors||{};
    ["navy","blue","gold","green","offwhite"].forEach(function(k){ if(col[k]) r.setProperty("--"+k, col[k]); });
  }catch(e){}

  function setTxt(id,val){ var el=document.getElementById(id); if(el&&val) el.textContent=val; }

  /* 2) org जानकारी + भाषा-strings भरो */
  try{
    var o=C.org||{};
    var name = (lang==="en" ? (o.name_en||o.name_hi) : o.name_hi);
    if(name){ setTxt("acsName",name+"™"); setTxt("acsFootName",name+"™"); setTxt("acsCopy",name+"™"); }
    var tag  = (lang==="en" ? (o.tagline_en||o.tagline_hi) : o.tagline_hi);
    var tagF = (lang==="en" ? (o.tagline_full_en||o.tagline_full_hi) : o.tagline_full_hi);
    setTxt("acsTagline", tag); setTxt("acsFootTag", tagF);
    var trust = (lang==="en" ? (o.trust_en||o.trust_hi) : o.trust_hi);
    if(trust) setTxt("acsTrust", trust+" ("+(o.trust_short||"")+")");
    if(o.iso) setTxt("acsCert", STR.cert+o.iso+STR.site+(o.trust_site||""));
    var ph=document.getElementById("acsPhone"); if(ph&&o.phone){ ph.textContent=o.phone; ph.href="tel:"+o.phone.replace(/[^0-9+]/g,""); }
    var em=document.getElementById("acsEmail"); if(em&&o.email){ em.textContent=o.email; em.href="mailto:"+o.email; }
    var addr = (lang==="en" ? (o.address_en||o.address_hi) : o.address_hi);
    if(addr) setTxt("acsAddr","📍 "+addr);
    var wa=document.getElementById("acsWa"); if(wa&&o.whatsapp) wa.href=o.whatsapp;
    var lg=document.getElementById("acsLogo"); if(lg&&o.logo) lg.src="/"+o.logo.replace(/^\//,"");
    /* भाषा-strings */
    setTxt("acsBtnLang",STR.btnLang); setTxt("acsBtnMenu",STR.btnMenu);
    setTxt("acsDrawerTitle",STR.drawer); setTxt("acsOrigLang",STR.orig);
    setTxt("acsFbCertTitle",STR.fbCert); setTxt("acsFbContactTitle",STR.fbContact);
    setTxt("acsWarn",STR.warn);
  }catch(e){}

  /* 3) links.js → drawer + footer menu (भाषा अनुसार) */
  try{
    var items = (L.build ? L.build(lang) : (L.menu||[]));
    var login = L.login||{icon:"🔑",href:"/dashboard/",label:{hi:"लॉगिन / डैशबोर्ड",en:"Login / Dashboard"}};
    var dl=document.getElementById("acsMenuList"), fm=document.getElementById("acsFooterMenu");
    items.forEach(function(m){
      var label = m.text || m.label;
      if(dl){ var a=document.createElement("a"); a.href=m.href;
        a.innerHTML='<span class="e">'+m.icon+'</span>'+label; a.onclick=window.acsCloseMenu; dl.appendChild(a); }
      if(fm){ var b=document.createElement("a"); b.href=m.href;
        b.innerHTML="<span>"+m.icon+"</span>"+label; fm.appendChild(b); }
    });
    var lg2=document.getElementById("acsLogin");
    if(lg2){ lg2.href=login.href||"/dashboard/";
      lg2.innerHTML='<span class="e">'+(login.icon||"🔑")+'</span> '+((login.label&&(login.label[lang]||login.label.hi))||"Login / Dashboard"); }
  }catch(e){}
}
/* नीचे-load होने वाली scripts (links/config) चलने के बाद ही init —
   script-क्रम से आज़ाद (चाहे universal ऊपर जुड़ा हो या नीचे) */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", acsUniversalInit);
} else {
  acsUniversalInit();
}

function acsOpenMenu(){ var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");
  if(d)d.classList.add("open"); if(s)s.classList.add("open"); }
function acsCloseMenu(){ var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");
  if(d)d.classList.remove("open"); if(s)s.classList.remove("open"); }
function acsLangToggle(){ var p=document.getElementById("acsTranslatePanel"); if(p)p.classList.toggle("open"); }
document.addEventListener("keydown",function(e){ if(e.key==="Escape") acsCloseMenu(); });
