/* ============================================================
   acs-universal.js v2.6 — header + menu + footer का एक दिमाग़ (09-Nov: mirror-mode + भाषा-होम isHome; 12-Nov: 🌐 भाषा-सूची + रोमन नाम + देवनागरी छाया-नाम)
   जगह: /assets/acs-universal.js  (config+links के बाद load)
   • भाषा-सचेत: /en/ folder → English labels/strings; अन्यथा हिंदी।
   • acs- prefix — पुराने script.js/page-JS से कोई टकराव नहीं।
   ============================================================ */
var ACS_LANG_HOMES = {en:1,zh:1,es:1,ar:1,fr:1,bn:1,pt:1,ru:1,id:1,ur:1,de:1,ja:1,mr:1,te:1,ko:1,he:1,ta:1,kn:1,gu:1,ml:1,pa:1,or:1,as:1,ne:1,ms:1,tl:1,vi:1,th:1,sw:1,tr:1,fa:1,uz:1,kk:1,az:1,so:1,am:1,ha:1,yo:1,zu:1,si:1,my:1,km:1,ps:1,sd:1}; /* भाषा-रजिस्टर (hi=मूल root) — runtime भाषा-घर तालिका; एकमात्र स्रोत = generator/data/mirror_home_strings.js की कुंजियाँ; build_mirror_homes.js लिखता है — हाथ से न बदलें */
var ACS_LANG_NAMES = {"hi":"हिन्दी","en":"English","zh":"中文","es":"Español","ar":"العربية","fr":"Français","bn":"বাংলা","pt":"Português","ru":"Русский","id":"Bahasa Indonesia","ur":"اردو","de":"Deutsch","ja":"日本語","mr":"मराठी","te":"తెలుగు","ko":"한국어","he":"עברית","ta":"தமிழ்","kn":"ಕನ್ನಡ","gu":"ગુજરાતી","ml":"മലയാളം","pa":"ਪੰਜਾਬੀ","or":"ଓଡ଼ିଆ","as":"অসমীয়া","ne":"नेपाली","ms":"Bahasa Melayu","tl":"Filipino","vi":"Tiếng Việt","th":"ไทย","sw":"Kiswahili","tr":"Türkçe","fa":"فارسی","uz":"Oʻzbekcha","kk":"Қазақша","az":"Azərbaycanca","so":"Soomaali","am":"አማርኛ","ha":"Hausa","yo":"Yorùbá","zu":"isiZulu","si":"සිංහල","my":"မြန်မာ","km":"ខ្មែរ","ps":"پښتو","sd":"سنڌي"}; /* भाषा के अपने नाम (🌐 सूची); एकमात्र स्रोत = generator/data/lang_native_names.js; हाथ से न बदलें */
var ACS_LANG_ROMAN = {"hi":"Hindi","en":"English","zh":"Chinese","es":"Spanish","ar":"Arabic","fr":"French","bn":"Bengali","pt":"Portuguese","ru":"Russian","id":"Indonesian","ur":"Urdu","de":"German","ja":"Japanese","mr":"Marathi","te":"Telugu","ko":"Korean","he":"Hebrew","ta":"Tamil","kn":"Kannada","gu":"Gujarati","ml":"Malayalam","pa":"Punjabi","or":"Odia","as":"Assamese","ne":"Nepali","ms":"Malay","tl":"Filipino","vi":"Vietnamese","th":"Thai","sw":"Swahili","tr":"Turkish","fa":"Persian","uz":"Uzbek","kk":"Kazakh","az":"Azerbaijani","so":"Somali","am":"Amharic","ha":"Hausa","yo":"Yoruba","zu":"Zulu","si":"Sinhala","my":"Burmese","km":"Khmer","ps":"Pashto","sd":"Sindhi"}; /* भाषा के रोमन नाम (🌐 सूची में छोटे हरे अक्षर); एकमात्र स्रोत = generator/data/lang_native_names.js; हाथ से न बदलें */
var ACS_LANG_DEVA = {"hi":"हिन्दी","en":"अंग्रेज़ी","zh":"चीनी","es":"स्पेनिश","ar":"अरबी","fr":"फ़्रेंच","bn":"बांग्ला","pt":"पुर्तगाली","ru":"रूसी","id":"इंडोनेशियाई","ur":"उर्दू","de":"जर्मन","ja":"जापानी","mr":"मराठी","te":"तेलुगु","ko":"कोरियाई","he":"हिब्रू","ta":"तमिल","kn":"कन्नड","gu":"गुजराती","ml":"मलयालम","pa":"पंजाबी","or":"उड़िया","as":"असमिया","ne":"नेपाली","ms":"मलय","tl":"तागालोग","vi":"वियतनामी","th":"थाई","sw":"स्वाहिली","tr":"तुर्की","fa":"फ़ारसी","uz":"उज़्बेक","kk":"कज़ाख","az":"अज़रबैजानी","so":"सोमाली","am":"अम्हारिक","ha":"हाउसा","yo":"योरूबा","zu":"ज़ुलु","si":"सिंहली","my":"बर्मी","km":"खमेर","ps":"पश्तो","sd":"सिंधी"}; /* भाषा के देवनागरी नाम (🌐 सूची में बटन की छाया); एकमात्र स्रोत = generator/data/bhasha_register.json; हाथ से न बदलें */
function acsUniversalInit(){
  var C = window.ACS_CONFIG || {}, L = window.ACS_LINKS || {};
  var seg0 = ((location.pathname||"").split("/")[1]||"");
  var lang = seg0==="en" ? "en" : (ACS_LANG_HOMES[seg0] ? "mirror" : "hi");
  /* mirror-mode: पेज का baked अनुवाद ही सच — यह script उस पाठ को कभी न लिखे */

  var STR = {
    hi:{ btnLang:"भाषा", btnMenu:"मेन्यू", drawer:"मेन्यू", orig:"मूल भाषा: हिंदी",
         fbCert:"📜 प्रमाण पत्र देने वाली संस्था", fbContact:"📞 संपर्क",
         warn:"⚠️ भुगतान केवल आधिकारिक Razorpay लिंक से।",
         cert:"प्रमाणन: ", site:" · वेबसाइट: " },
    en:{ btnLang:"Language", btnMenu:"Menu", drawer:"Menu", orig:"Original language: Hindi",
         fbCert:"📜 Certificate-Issuing Body", fbContact:"📞 Contact",
         warn:"⚠️ Payment only via official Razorpay link.",
         cert:"Certification: ", site:" · Website: " }
  }[lang==="mirror" ? "en" : lang];

  /* 1) config → CSS variables */
  try{
    var r=document.documentElement.style, col=C.colors||{};
    ["navy","blue","gold","green","offwhite"].forEach(function(k){ if(col[k]) r.setProperty("--"+k, col[k]); });
  }catch(e){}

  function setTxt(id,val){ var el=document.getElementById(id); if(el&&val) el.textContent=val; }

  /* 2) org जानकारी + भाषा-strings भरो */
  try{
    var o=C.org||{};
    if(lang!=="mirror"){ /* mirror-पेजों पर baked अनुवाद अछूता */
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
    } /* mirror-skip बंद */
  }catch(e){}

  /* 3) links.js → drawer + footer menu (भाषा अनुसार) */
  try{
    var mlang = (lang==="mirror") ? "en" : lang;
    var items = (L.build ? L.build(mlang) : (L.menu||[]));
    var login = L.login||{icon:"🔑",href:"/dashboard/",label:{hi:"लॉगिन / डैशबोर्ड",en:"Login / Dashboard"}};
    var dl=document.getElementById("acsMenuList"), fm=document.getElementById("acsFooterMenu");
    /* साइट-व्यापी दोहरा-मेनू bug (31-Jul, Founder-टोका salah.html पर) — जड़: कई generator (udyam/lesson/
       special-पेज) #acsMenuList/#acsFooterMenu में मेनू पहले से बेक कर देते हैं, फिर यह runtime-कोड
       दोबारा जोड़ देता था (हर पेज पर 2× मेनू)। इलाज: पहले से भरा हो तो दोबारा न जोड़ें — यह एक साझा-फ़ाइल
       पैच पूरी साइट (हज़ारों पेज) पर एक साथ असर करता है। ध्यान: fm को null नहीं करते — नीचे legal-पंक्ति
       fm पर निर्भर है, पुराने बेक-किए footer वाले पेजों पर वह पंक्ति फिर भी जुड़नी चाहिए। */
    var dlEmpty = !dl || dl.children.length === 0;
    var fmEmpty = !fm || fm.children.length === 0;
    items.forEach(function(m){
      var label = m.text || m.label;
      if(dl && dlEmpty){ var a=document.createElement("a"); a.href=m.href;
        a.innerHTML='<span class="e">'+m.icon+'</span>'+label; a.onclick=window.acsCloseMenu; dl.appendChild(a); }
      if(fm && fmEmpty){ var b=document.createElement("a"); b.href=m.href;
        b.innerHTML="<span>"+m.icon+"</span>"+label; fm.appendChild(b); }
    });
    /* legal-पंक्ति (काम-11-पूर्व, 19-Jul-2026): Razorpay-अनुपालन — refund/privacy/terms हर पेज के footer से */
    if(fm){ var lgl=document.createElement("div"); lgl.className="acs-flegal";
      lgl.style.cssText="margin-top:10px;font-size:16px;line-height:1.8";
      lgl.innerHTML = (lang==="hi")
        ? '<a href="/refund.html">💳 रिफंड (Refund) नीति</a> · <a href="/privacy.html">🔒 निजता (Privacy) नीति</a> · <a href="/terms.html">📜 नियम व शर्तें (Terms)</a>'
        : '<a href="/refund.html">💳 Refund Policy</a> · <a href="/privacy.html">🔒 Privacy Policy</a> · <a href="/terms.html">📜 Terms</a>';
      fm.parentNode.insertBefore(lgl, fm.nextSibling); }
    var lg2=document.getElementById("acsLogin");
    if(lg2){ lg2.href=login.href||"/dashboard/";
      if(lang!=="mirror"){ lg2.innerHTML='<span class="e">'+(login.icon||"🔑")+'</span> '+((login.label&&(login.label[lang]||login.label.hi))||"Login / Dashboard"); } }
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
/* ---------- 🌐 भाषा-सूची (v2.4, 12-Nov-2026) ----------
   बटन दबे → पट्टी खुले → उसमें हर live भाषा का नाम (उसकी अपनी लिपि में)।
   नाम दबे → वही पेज उस भाषा में खुले, अगर वह सचमुच बना है (पता-नियम: पते में सिर्फ़ भाषा-खंड बदलता है);
   न बना हो → उस भाषा का होम खुले। हर कड़ी का href उस भाषा का होम है, इसलिए script न चले तब भी कड़ी काम करती है।
   सूची के नाम ACS_LANG_NAMES से (घर: generator/data/lang_native_names.js), भाषाएँ ACS_LANG_HOMES से।
   v2.5 (Founder, 12-Nov): हर बटन में अपने नाम के नीचे छोटे हरे अक्षरों में रोमन नाम (ACS_LANG_ROMAN), ताकि जो वह लिपि न पढ़ सके वह भी भाषा पहचान ले।
   यह छोटा अक्षर (13px) Founder के कहने पर "16px से छोटा कुछ नहीं" नियम की दर्ज छूट है : सिर्फ़ इसी रोमन पंक्ति के लिए।
   v2.6 (Founder, 12-Nov): हर बटन की पूरी पृष्ठभूमि पर उसी भाषा का देवनागरी नाम (ACS_LANG_DEVA), हल्के गुलाबी भरे अक्षर में, पूरे बटन पर फैला हुआ।
   रंग Founder ने 8 नमूनों में से चुना (गुलाबी #D81B60, 16% गहरा; रेखा नहीं)। यह "अधिकतम 5 रंग" नियम की दर्ज छूट है : सिर्फ़ इसी छाया-नाम के लिए।
   यह सिर्फ़ सजावट है (aria-hidden), पढ़ने वाली मशीन इसे नहीं पढ़ती। देवनागरी नाम का घर = भाषा-रजिस्टर (bhasha_register.json का "hi" खाना)।
   जिस भाषा का अपना नाम ही वही देवनागरी शब्द है (हिन्दी, मराठी, नेपाली), वहाँ छाया-नाम दोबारा नहीं आता।
   यह Founder के कहने पर "दूसरी भाषा के पेज पर देवनागरी नहीं" नियम की दर्ज छूट है : सिर्फ़ इसी छाया-नाम के लिए। */
function acsLangCur(){ var s=((location.pathname||"").split("/")[1]||""); return ACS_LANG_HOMES[s] ? s : "hi"; }
function acsLangHome(c){ return c==="hi" ? "/" : "/"+c+"/"; }
function acsLangTargets(c){
  var P=location.pathname||"/", seg=P.split("/"), i, at=-1, out=[];
  for(i=1;i<seg.length;i++){ if(seg[i]==="hi"||ACS_LANG_HOMES[seg[i]]){ at=i; break; } }
  if(at===1 && seg[1]!=="hi"){ var r=seg.slice(2).join("/"); out.push(c==="hi" ? "/"+r : "/"+c+"/"+r); }   /* /te/x → /x या /ko/x */
  else if(at>=1){ var s2=seg.slice(); s2[at]=c; out.push(s2.join("/")); }                                 /* /courses/hi/x → /courses/te/x */
  else if(c!=="hi"){ out.push("/"+c+P); }                                                                 /* /career.html → /te/career.html */
  return out;
}
function acsLangGo(c, ev){
  if(ev&&ev.preventDefault) ev.preventDefault();
  try{ localStorage.setItem("acs_lang", c); }catch(e){}
  var home=acsLangHome(c), list=acsLangTargets(c).filter(function(u){ return u!==home; }), i=0;
  function next(){
    if(i>=list.length || typeof fetch!=="function"){ location.href=home; return; }
    var u=list[i++];
    fetch(u,{method:"HEAD"}).then(function(r){ if(r&&r.ok) location.href=u; else next(); }).catch(next);
  }
  next(); return false;
}
function acsLangFill(p){
  var cur=acsLangCur(), codes=["hi"].concat(Object.keys(ACS_LANG_HOMES)), h="", i, c, n;
  for(i=0;i<codes.length;i++){ c=codes[i]; n=ACS_LANG_NAMES[c]; if(!n) continue;
    var rn=(typeof ACS_LANG_ROMAN!=="undefined" && ACS_LANG_ROMAN[c]) ? ACS_LANG_ROMAN[c] : "";
    var dv=(typeof ACS_LANG_DEVA!=="undefined" && ACS_LANG_DEVA[c] && ACS_LANG_DEVA[c]!==n) ? ACS_LANG_DEVA[c] : "";
    h+='<a href="'+acsLangHome(c)+'" data-lang="'+c+'"'+(c===cur?' class="on" aria-current="true"':'')+'>'
      +(dv?'<svg class="w" aria-hidden="true" focusable="false" viewBox="0 0 100 40" preserveAspectRatio="none"><text x="50" y="31" text-anchor="middle" textLength="88" lengthAdjust="spacingAndGlyphs" lang="hi">'+dv+'</text></svg>':'')
      +'<span lang="'+c+'" dir="auto">'+n+'</span>'
      +((rn && rn.toLowerCase()!==n.toLowerCase())?'<small lang="en" dir="ltr">'+rn+'</small>':'')+'</a>'; }   /* नाम पहले से वही रोमन हो (English, Hausa, Filipino) तो दोबारा नहीं */
  var st=document.createElement("style");
  st.textContent=".acs-langs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:1000px;margin:0 auto;padding:4px 0}"
    +".acs-langs a{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-size:17px;line-height:1.3;padding:6px 14px;min-height:48px;border-radius:22px;border:1.5px solid #c9d3e0;background:#F5F7FA;color:#0B1F3A;font-weight:700;text-decoration:none;letter-spacing:0}"
    +".acs-langs a{position:relative;overflow:hidden}.acs-langs a span,.acs-langs a small{position:relative;z-index:1}"
    +".acs-langs a svg.w{position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;pointer-events:none}"
    +".acs-langs a svg.w text{font:400 34px 'Noto Sans Devanagari','Nirmala UI','Mangal','Kohinoor Devanagari',sans-serif;fill:#D81B60;fill-opacity:.16;stroke:none}"
    +".acs-langs a small{font-size:13px;line-height:1.2;font-weight:600;color:#2E7D32;font-family:Inter,sans-serif}.acs-langs a.on small{color:#0B1F3A}"
    +".acs-langs a.on{background:#F9A825;border-color:#F9A825}.acs-langs a:focus-visible{outline:3px solid #1565C0;outline-offset:2px}";
  document.head.appendChild(st);
  var d=document.createElement("div"); d.className="acs-langs"; d.setAttribute("role","navigation"); d.innerHTML=h;
  d.addEventListener("click",function(e){ var a=e.target&&e.target.closest?e.target.closest("a[data-lang]"):null; if(a) acsLangGo(a.getAttribute("data-lang"), e); });
  p.insertBefore(d, p.firstChild); p.setAttribute("data-filled","1");
}
function acsLangToggle(){ var p=document.getElementById("acsTranslatePanel"); if(!p) return;
  if(!p.getAttribute("data-filled") && typeof ACS_LANG_NAMES!=="undefined") acsLangFill(p);
  p.classList.toggle("open"); }
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
  /* v267: तैरते ⬆/← बटन सब कोर्स-पेजों पर भी (Founder-नियम: "पीछे व ऊपर —
     दो बटन हमेशा"); hero व अनुच्छेद-सुनो पहले की तरह सिर्फ़ उद्यम-परिचय पर। */
  /* v268 (Founder-नियम): ⬆/← तैरते बटन साइट के हर पेज पर डिफ़ॉल्ट —
     जहाँ भी universal चलता है। hero+अनुच्छेद-सुनो सिर्फ़ उद्यम-परिचय पर।
     होम पर ← नहीं (पीछे कुछ नहीं)। */
  var P = location.pathname || "";
  var isUdyam = /^\/udyam\/.+\.html$/.test(P);
  var segH = (P.split("/")[1]||"");
  var isHome = (P === "/" || P === "/index.html" || (ACS_LANG_HOMES[segH] && (P === "/"+segH+"/" || P === "/"+segH+"/index.html")));
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded",fn); }
  ready(function(){
    var sec1 = document.querySelector(".udy-sec");
    var doUdyam = isUdyam && !!sec1; /* hero+सुनो सिर्फ़ उद्यम-परिचय पर */

    /* ---------- (1) hero v2 — हर उद्यम का अपना दृश्य ----------
       स्रोत: /assets/udyam_hero_data.js (generator-निर्मित: n → चिह्न+mg+img)।
       img भरा हो → असली फ़ोटो; ख़ाली → MG-रंग-थीम SVG-दृश्य (n से ढाँचा-बदलाव)। */
    if(doUdyam) try{
      var h1 = document.querySelector("h1");
      var mN = document.body.textContent.match(/उद्यम-सूची क्रमांक (\d+)/);
      var uN = mN ? parseInt(mN[1],10) : 0;
      /* 13-Sep (ऑडिट H2, CLS 0.136 → 0): hero-डिब्बा DOMContentLoaded पर ही h1 के नीचे बैठे (जगह आरक्षित, aspect-ratio CSS से);
         data-फ़ाइल आने पर सिर्फ़ भीतर भरे — पाठ नीचे नहीं खिसकता */
      var hero = document.createElement("div");
      hero.className = "udy-hero";
      hero.setAttribute("aria-hidden","true");
      var head = h1 ? (h1.closest ? h1.closest(".lsn-head") : h1.parentNode) : null;
      if(head){ head.appendChild(hero); head.classList.add("has-hero"); } /* ::after placeholder की जगह पर ही, अंत में */
      else if(h1 && h1.parentNode) h1.parentNode.insertBefore(hero, h1.nextSibling);
      var s = document.createElement("script");
      s.src = "/assets/udyam_hero_data.js";
      s.onerror = function(){ if(hero.parentNode) hero.parentNode.removeChild(hero); if(head) head.classList.remove("has-hero"); }; /* data न आए → डिब्बा हटे (गूँगा-ख़ाली नहीं) */
      s.onload = function(){
        try{
          var H = (window.ACS_UDYAM_HERO||{})[uN] || {e:"🏭", mg:0, img:""};
          var PAL = window.ACS_UDYAM_HERO_PAL || {};
          var pal = PAL[H.mg] || PAL[0] || ["#0B1F3A","#1565C0","#2E7D32"];
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
          if(H.img){ hero.removeAttribute("aria-hidden"); }
        }catch(e){}
      };
      document.head.appendChild(s);
    }catch(e){}

    /* ---------- (1b) 13-Sep SEO: उद्यम-परिचय पर Article + BreadcrumbList JSON-LD (runtime — 950 पेज बिना regen) ---------- */
    if(doUdyam) try{
      var h1s = document.querySelector("h1"); var dsc = document.querySelector('meta[name="description"]');
      var ld = document.createElement("script"); ld.type = "application/ld+json";
      ld.textContent = JSON.stringify([
        { "@context":"https://schema.org", "@type":"Article", "headline": h1s ? h1s.textContent.trim() : document.title, "description": dsc ? dsc.content : "", "inLanguage":"hi", "isAccessibleForFree": true, "mainEntityOfPage": location.origin + location.pathname,
          "author": { "@type":"Organization", "name":"Applied Computer School", "url":"https://acslearn.com/" }, "publisher": { "@type":"Organization", "name":"Applied Computer School", "logo": { "@type":"ImageObject", "url":"https://acslearn.com/logo.png" } } },
        { "@context":"https://schema.org", "@type":"BreadcrumbList", "itemListElement":[ { "@type":"ListItem","position":1,"name":"होम","item":"https://acslearn.com/" }, { "@type":"ListItem","position":2,"name":"उद्यम","item":"https://acslearn.com/udyam/" }, { "@type":"ListItem","position":3,"name": h1s ? h1s.textContent.trim() : "उद्यम-परिचय","item": location.origin + location.pathname } ] } ]);
      document.head.appendChild(ld);
    }catch(e){}

    /* ---------- (1c) 14-Sep ईमेल-सेतु (अस्थायी): Founder-आदेश — site का ईमेल info@ffgpmt.org। 5,100+ पुराने generated पेजों की पूरी regen git से चढ़ेगी;
       तब तक पुराने footer/पाठ में दिखा acs.chautham@gmail.com इसी सेतु से बदले (DOM में; source नहीं)। पूरा regen live होते ही यह block हटाया जाए। ---------- */
    try {
      var OLD_MAIL = "acs.chautham@gmail.com", NEW_MAIL = "info@ffgpmt.org";
      var links = document.querySelectorAll('a[href*="' + OLD_MAIL + '"]');
      for (var li = 0; li < links.length; li++) links[li].href = links[li].href.split(OLD_MAIL).join(NEW_MAIL);
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false), tn;
      while ((tn = walker.nextNode())) { if (tn.nodeValue && tn.nodeValue.indexOf(OLD_MAIL) >= 0) tn.nodeValue = tn.nodeValue.split(OLD_MAIL).join(NEW_MAIL); }
    } catch (e) {}

    /* ---------- (2) 🔊 सुनो-बटन — हर अनुच्छेद पर ---------- */
    if(doUdyam) try{
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
      var fbHi=((document.documentElement.getAttribute("lang")||"hi").indexOf("hi")===0);
      bTop.setAttribute("aria-label", fbHi?"पेज के ऊपर जाएँ":"Back to top");
      bTop.title = fbHi?"पेज के ऊपर जाएँ":"Back to top";
      bTop.onclick=function(){ try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){window.scrollTo(0,0);} };
      var bBack = document.createElement("a");
      bBack.className="udy-fbtn"; bBack.textContent="←";
      bBack.href = isUdyam ? "/udyam/" : "/"; bBack.setAttribute("aria-label", fbHi?"पीछे जाएँ":"Go back"); bBack.title = fbHi?"पीछे जाएँ":"Go back";
      bBack.onclick=function(ev){ if(history.length>1){ ev.preventDefault(); history.back(); } };
      fw.appendChild(bTop); if(!isHome) fw.appendChild(bBack);
      document.body.appendChild(fw);
    }catch(e){}
  });
})();

/* ── kkb-embassy hook (Addendum v6.1-घ, 30-Aug-2026): भाषा-कोर्स पेज (#kkb-app) पर
   govt_jobs_embassy.js आलसी-load — 119 HTML व kkb.js अछूते (साझा-असेट-लाभ नियम) ── */
(function(){
  function go(){
    try{
      if(!document.getElementById('kkb-app')) return;
      var s = document.createElement('script');
      s.src = '/assets/govt_jobs_embassy.js';
      document.body.appendChild(s);
    }catch(e){}
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
