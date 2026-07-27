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
    /* legal-पंक्ति (काम-11-पूर्व, 19-Jul-2026): Razorpay-अनुपालन — refund/privacy/terms हर पेज के footer से */
    if(fm){ var lgl=document.createElement("div"); lgl.className="acs-flegal";
      lgl.style.cssText="margin-top:10px;font-size:16px;line-height:1.8";
      lgl.innerHTML='<a href="/refund.html">💳 रिफंड (Refund) नीति</a> · <a href="/privacy.html">🔒 निजता (Privacy) नीति</a> · <a href="/terms.html">📜 नियम व शर्तें (Terms)</a>';
      fm.parentNode.insertBefore(lgl, fm.nextSibling); }
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

/* ============================================================
   udyam-intro enhancer v1.0 (v262) — सिर्फ़ /udyam/ परिचय-पेजों पर।
   950 पेजों को छुए बिना, एक जगह से तीन सुधार:
   (1) शीर्षक के नीचे विषय-चिह्न वाला बड़ा hero-चित्र (SVG — चित्र-सीढ़ी नियम)
   (2) हर अनुच्छेद पर 🔊 सुनो-बटन (browser की हिंदी आवाज़)
   (3) तैरते बटन: ⬆ ऊपर + ← वापस (लंबे पेज के बीच से भी लौट सकें)
   बटन-केंद्रण की css /acs-style.css में है।
   ============================================================ */
(function(){
  if(!(location.pathname||"").match(/^\/udyam\/.+\.html$/)) return;
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded",fn); }
  ready(function(){
    var sec1 = document.querySelector(".udy-sec");
    if(!sec1) return; /* सिर्फ़ परिचय-पेज */

    /* ---------- (1) hero v2 — हर उद्यम का अपना दृश्य ----------
       स्रोत: /assets/udyam_hero_data.js (generator-निर्मित: n → चिह्न+mg+img)।
       img भरा हो → असली फ़ोटो; ख़ाली → MG-रंग-थीम SVG-दृश्य (n से ढाँचा-बदलाव)। */
    try{
      var h1 = document.querySelector("h1");
      var mN = document.body.textContent.match(/उद्यम-सूची क्रमांक (\d+)/);
      var uN = mN ? parseInt(mN[1],10) : 0;
      var s = document.createElement("script");
      s.src = "/assets/udyam_hero_data.js";
      s.onload = function(){
        try{
          var H = (window.ACS_UDYAM_HERO||{})[uN] || {e:"🏭", mg:0, img:""};
          var PAL = window.ACS_UDYAM_HERO_PAL || {};
          var pal = PAL[H.mg] || PAL[0] || ["#0B1F3A","#1565C0","#2E7D32"];
          var hero = document.createElement("div");
          hero.className = "udy-hero";
          if(H.img){
            var im = document.createElement("img");
            im.src = H.img; im.alt = (h1?h1.textContent:"उद्यम")+" — चित्र";
            im.loading = "lazy";
            im.onerror = function(){ hero.innerHTML = svgScene(); };
            hero.appendChild(im);
          } else {
            hero.setAttribute("aria-hidden","true");
            hero.innerHTML = svgScene();
          }
          function svgScene(){
            var v = uN % 3; /* ढाँचा-बदलाव */
            var sunX = v===0 ? 520 : (v===1 ? 110 : 320);
            var sunY = v===2 ? 52 : 70;
            var icoX = v===1 ? 470 : 160;
            var ground = v===0
              ? '<path d="M0,205 Q160,168 320,198 T640,192 L640,250 L0,250 Z" fill="'+pal[2]+'"/>'
              : v===1
              ? '<path d="M0,195 L120,220 L260,185 L400,225 L520,190 L640,215 L640,250 L0,250 Z" fill="'+pal[2]+'"/>'
              : '<rect y="200" width="640" height="50" fill="'+pal[2]+'"/><circle cx="90" cy="200" r="34" fill="'+pal[2]+'"/><circle cx="300" cy="200" r="46" fill="'+pal[2]+'"/><circle cx="540" cy="200" r="30" fill="'+pal[2]+'"/>';
            return '<svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid slice">'
              +'<defs><linearGradient id="uhSky'+uN+'" x1="0" y1="0" x2="0" y2="1">'
              +'<stop offset="0" stop-color="'+pal[0]+'"/><stop offset="1" stop-color="'+pal[1]+'"/></linearGradient></defs>'
              +'<rect width="640" height="250" fill="url(#uhSky'+uN+')"/>'
              +'<circle cx="'+sunX+'" cy="'+sunY+'" r="90" fill="#F9A825" opacity="0.18"/>'
              +'<circle cx="'+sunX+'" cy="'+sunY+'" r="32" fill="#F9A825"/>'
              + ground
              +'<circle cx="'+icoX+'" cy="118" r="76" fill="#F5F7FA" opacity="0.97"/>'
              +'<circle cx="'+icoX+'" cy="118" r="76" fill="none" stroke="#F9A825" stroke-width="6"/>'
              +'<text x="'+icoX+'" y="150" text-anchor="middle" font-size="88">'+(H.e||"🏭")+'</text>'
              +'<text x="'+(v===1?70:300)+'" y="103" font-size="25" font-weight="700" fill="#F5F7FA">गाँव से विश्व तक</text>'
              +'<text x="'+(v===1?70:300)+'" y="137" font-size="19" font-weight="600" fill="#F9A825">ACS उद्यम-परिचय</text>'
              +'</svg>';
          }
          if(h1 && h1.parentNode) h1.parentNode.insertBefore(hero, h1.nextSibling);
        }catch(e){}
      };
      document.head.appendChild(s);
    }catch(e){}

    /* ---------- (2) 🔊 सुनो-बटन — हर अनुच्छेद पर ---------- */
    try{
      if("speechSynthesis" in window){
        var current = null; /* {btn, utt} */
        function stopAll(){
          try{ window.speechSynthesis.cancel(); }catch(e){}
          if(current){ current.btn.textContent="🔊 सुनें"; current.btn.classList.remove("on"); current=null; }
        }
        var paras = document.querySelectorAll(".udy-sec p");
        for(var p=0;p<paras.length;p++){
          (function(para){
            var txt = (para.textContent||"").replace(/🔊 सुनें|⏸ रोकें/g,"").trim();
            if(txt.length < 40) return; /* बहुत छोटे नोट छोड़ो */
            var b = document.createElement("button");
            b.type="button"; b.className="udy-listen"; b.textContent="🔊 सुनें";
            b.setAttribute("aria-label","यह अनुच्छेद सुनें");
            b.onclick = function(){
              if(current && current.btn===b){ stopAll(); return; }
              stopAll();
              var u = new SpeechSynthesisUtterance(txt);
              u.lang="hi-IN"; u.rate=0.95;
              u.onend=function(){ if(current&&current.btn===b){ b.textContent="🔊 सुनें"; b.classList.remove("on"); current=null; } };
              current={btn:b, utt:u};
              b.textContent="⏸ रोकें"; b.classList.add("on");
              try{ window.speechSynthesis.speak(u); }catch(e){ stopAll(); }
            };
            para.appendChild(b);
          })(paras[p]);
        }
        window.addEventListener("beforeunload", stopAll);
      }
    }catch(e){}

    /* ---------- (3) तैरते बटन: ⬆ ऊपर + ← वापस ---------- */
    try{
      var fw = document.createElement("div");
      fw.className = "udy-float";
      var bTop = document.createElement("button");
      bTop.type="button"; bTop.className="udy-fbtn"; bTop.textContent="⬆";
      bTop.setAttribute("aria-label","पेज के ऊपर जाएँ");
      bTop.onclick=function(){ try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){window.scrollTo(0,0);} };
      var bBack = document.createElement("a");
      bBack.className="udy-fbtn"; bBack.textContent="←";
      bBack.href="/udyam/"; bBack.setAttribute("aria-label","वापस — सब उद्यम");
      bBack.onclick=function(ev){ if(history.length>1){ ev.preventDefault(); history.back(); } };
      fw.appendChild(bTop); fw.appendChild(bBack);
      document.body.appendChild(fw);
    }catch(e){}
  });
})();
