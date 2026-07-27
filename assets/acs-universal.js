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

    /* ---------- (1) विषय-चिह्न चुनो (शीर्षक के शब्दों से) ---------- */
    var h1 = document.querySelector("h1");
    var T = (h1 ? h1.textContent : "") + " " + (document.title||"");
    var MAP = [
      ["खाद्य|भोजन|रसोई|फ़ूड|Food","🍲"],["चावल|धान|Rice","🌾"],["गेहूँ|आटा","🌾"],["फल|आम|केला|अनानास","🍎"],
      ["सब्ज़ी|टमाटर|आलू","🥕"],["मछली|झींगा|समुद्री|सीफ़ूड|Fish|Seafood","🐟"],["डेयरी|दूध|Dairy","🥛"],
      ["मुर्ग़ी|पोल्ट्री|अंडा","🐔"],["बकरी|भेड़|पशु","🐐"],["मधुमक्खी|शहद","🐝"],["चाय|Tea","🍵"],["कॉफ़ी|Coffee","☕"],
      ["मसाला|हल्दी|मिर्च|इलायची","🌶️"],["गन्ना|चीनी","🍬"],["कपास|सूत|धागा","🧵"],["वस्त्र|कपड़ा|गारमेंट|परिधान|फ़ैशन|Textile|Garment","👕"],
      ["जूता|चप्पल|Footwear","👞"],["चमड़ा|Leather","👜"],["गहना|आभूषण|ज्वेलरी|हीरा|रत्न|सोना|Jewel|Diamond|Gem","💎"],
      ["ऑटोमोटिव|वाहन|गाड़ी|कार|मोटर|Automotive|Vehicle","🚗"],["ट्रक|पिकअप","🚚"],["दो-पहिया|मोटरसाइकिल|स्कूटर","🏍️"],
      ["वेल्डिंग|इस्पात|स्टील|धातु|लोहा|Steel|Welding","⚙️"],["मशीन|यंत्र|उपकरण|Equipment|Machinery","🛠️"],
      ["इलेक्ट्रॉनिक|चिप|सेमीकंडक्टर|Electronics|Chip","💻"],["मोबाइल|फ़ोन|स्मार्टफ़ोन","📱"],["सॉफ़्टवेयर|आईटी|IT|कंप्यूटर|AI|डेटा|Data|साइबर|Cyber","💻"],
      ["सौर|सोलर|Solar","☀️"],["पवन|Wind","🌬️"],["बिजली|ऊर्जा|पावर|Energy|Power|बैटरी|Battery","⚡"],
      ["तेल|गैस|पेट्रोल|Oil|Gas|LNG","🛢️"],["खनन|खदान|खनिज|कोयला|Mining|Coal","⛏️"],
      ["निर्माण|भवन|सड़क|पुल|रियल|संपत्ति|Estate|Construction|Housing","🏗️"],["सीमेंट|ईंट","🧱"],
      ["होटल|रिसॉर्ट|आतिथ्य|Hotel","🏨"],["पर्यटन|टूर|यात्रा|Tourism|Travel","🧳"],["रेस्तराँ|ढाबा|कैफ़े|बेकरी|Restaurant","🍽️"],
      ["अस्पताल|स्वास्थ्य|चिकित्सा|मेडिकल|दवा|फ़ार्मा|Health|Pharma|Medical","🏥"],["योग|वेलनेस|स्पा","🧘"],
      ["स्कूल|कॉलेज|शिक्षा|विश्वविद्यालय|कोचिंग|पढ़ाई|Education|School|College","🎓"],
      ["बैंक|वित्त|बीमा|निवेश|फ़िनटेक|Finance|Bank|Insurance|Fintech","💰"],["व्यापार|दुकान|रिटेल|स्टोर|बाज़ार|मार्ट|Trade|Retail|Commerce","🛒"],
      ["परिवहन|लॉजिस्टिक|ढुलाई|कूरियर|Logistics|Transport","🚚"],["रेल|मेट्रो|Rail","🚆"],["विमान|हवाई|एयर|Aviation|Air","✈️"],
      ["जहाज़|बंदरगाह|समुद्र|Ship|Port|Marine","🚢"],["अंतरिक्ष|सैटेलाइट|Space|Satellite","🚀"],
      ["फ़िल्म|सिनेमा|मीडिया|टीवी|मनोरंजन|संगीत|Music|Film|Media","🎬"],["खेल|क्रिकेट|फ़ुटबॉल|Sports","🏆"],["गेमिंग|ई-स्पोर्ट्स|Gaming","🎮"],
      ["क़ानून|विधिक|वकील|Legal|Law","⚖️"],["सुरक्षा|Security|रक्षा|Defen","🛡️"],["रोबोट|Robot|ड्रोन|Drone","🤖"],
      ["रसायन|केमिकल|पेंट|Chemical|Paint","🧪"],["प्लास्टिक|पैकेजिंग|Packaging","📦"],["काग़ज़|प्रिंट|प्रकाशन|Publish|Paper","📖"],
      ["काँच|कांच|Glass","🪟"],["लकड़ी|फ़र्नीचर|बाँस|Wood|Bamboo|Timber","🪵"],["हस्तशिल्प|कला|शिल्प|मूर्ति|Craft|Art","🎨"],
      ["जल|पानी|Water","💧"],["कचरा|रीसाइक्लिंग|अपशिष्ट|Waste|Recycl","♻️"],["जलवायु|पर्यावरण|हरित|कार्बन|Climate|Green|Carbon","🌱"],
      ["धार्मिक|मंदिर|तीर्थ|पूजा|Religious|Temple","🛕"],["विवाह|शादी|Wedding|डेटिंग","💐"],["सैलून|सौंदर्य|Beauty|कॉस्मेटिक","💇"],
      ["खेती|कृषि|फ़ार्म|बाग़|Agri|Farm|Cultivation|Plantation","🌾"]
    ];
    var em = "🏭";
    for(var i=0;i<MAP.length;i++){ if(new RegExp(MAP[i][0]).test(T)){ em = MAP[i][1]; break; } }

    /* ---------- hero-चित्र (SVG) h1 के ठीक बाद ---------- */
    try{
      var hero = document.createElement("div");
      hero.className = "udy-hero";
      hero.setAttribute("aria-hidden","true");
      hero.innerHTML =
        '<svg viewBox="0 0 640 250" preserveAspectRatio="xMidYMid slice">'+
        '<defs><linearGradient id="uhSky" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" stop-color="#0B1F3A"/><stop offset="1" stop-color="#1565C0"/></linearGradient>'+
        '<radialGradient id="uhSun" cx="0.5" cy="0.5" r="0.5">'+
        '<stop offset="0" stop-color="#F9A825"/><stop offset="1" stop-color="#F9A825" stop-opacity="0"/></radialGradient></defs>'+
        '<rect width="640" height="250" fill="url(#uhSky)"/>'+
        '<circle cx="520" cy="70" r="95" fill="url(#uhSun)"/>'+
        '<circle cx="520" cy="70" r="34" fill="#F9A825"/>'+
        '<path d="M0,205 Q160,168 320,198 T640,192 L640,250 L0,250 Z" fill="#2E7D32"/>'+
        '<path d="M0,222 Q200,196 400,218 T640,214 L640,250 L0,250 Z" fill="#1B5E20" opacity="0.85"/>'+
        '<circle cx="150" cy="118" r="78" fill="#F5F7FA" opacity="0.96"/>'+
        '<circle cx="150" cy="118" r="78" fill="none" stroke="#F9A825" stroke-width="6"/>'+
        '<text x="150" y="152" text-anchor="middle" font-size="92">'+em+'</text>'+
        '<text x="300" y="105" font-size="26" font-weight="700" fill="#F5F7FA">गाँव से विश्व तक</text>'+
        '<text x="300" y="140" font-size="20" font-weight="600" fill="#F9A825">ACS उद्यम-परिचय</text>'+
        '</svg>';
      if(h1 && h1.parentNode) h1.parentNode.insertBefore(hero, h1.nextSibling);
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
