/* ════════════════════════════════════════════════════════════
   dashboard.js — 31-dashboard परिवार का एकमात्र साझा JS (परत-1) · ES-module
   v5.4 · 30-Jul-2026 (2-होल दौर, Founder) — होल-1: perfSector अब खाते (server)
        से भी (latestAptitudeResult — फ़ोन बदलने पर भी रुचि-दिशा वही); होल-2:
        6-tile परफ़ॉर्मेंस (कोर्स रजिस्टर्ड/पूरे) + "मेरे कोर्स" प्रगति-ग्राफ +
        center-align; ensureCoursesData = courses_data का एक-दरवाज़ा loader
        (const दो-बार load = crash — तीनों जगहें अब इसी से)।
   v5.3 · 28-Jul-2026 (काम-9अ) — नामांकन-इंजन k9: केंद्र/वर्कशॉप pnl-enroll
        (घोषणा·seat-graph·दो-दरवाज़ा·फीस-record) + learner pnl-myctr। नीचे की
        सूची अधूरी थी — v4.7 से v5.2 (काम-5/7/8: IS_GOLD·sevaQueue·referral)
        भी इसी फ़ाइल में जीवित हैं (बासी-टिप्पणी सुधार, v3.0-घ4)।
   v4.6 · 20-Jul-2026 (काम-13 कदम-1) — XSS-बंद: हर user-field अब esc() से (आवेदन-सूची · टीम · काम/रिपोर्ट · बैज-क़तार · docChips)
   v4.5 · 19-Jul-2026 — null-सुरक्षित setters (setTxt/setHTML): guard-render व
          loadRegistration की profile-भराई अब किसी सजावटी element के ग़ायब होने
          (बासी-cache/CDN-मिश्रण) पर पूरा dashboard नहीं गिराती — console-चेतावनी
          + बाक़ी सब चालू। fillPubCard भी null-सुरक्षित। तर्क/पाठ बाक़ी byte-अछूता।
   v4.4.1 · 19-Jul-2026 — showLoadError में अब e.stack की पहली 3 पंक्तियाँ भी दिखतीं
          (फ़ाइल:लाइन-नंबर समेत) — अगली बार कोई crash आए तो पहले ही प्रयास में
          सटीक जड़ पकड़ में आए, कोई अटकल/और screenshot-चक्र न चाहिए पड़े।
   v4.7 · 22-Jul-2026 — बैज-द्वार निशान (acs_apt_gate_v1): Jio-नियम v3.7 —
        learner-बैज सक्रिय → पूरा अभिरुचि-टेस्ट खुले; न रहे तो निशान हटे।
   v4.6 · 20-Jul-2026 — ✔-बचाव: फ़ोटो-load पर लगा हुआ बैज-निशान न मिटे (cache-दौड़ दोष बंद)।
   v4.4 · 19-Jul-2026 — गूँगा-fallback निषेध का स्थायी पहरा (v3.5-घ, Laxmi-केस से):
          guardTeam/guardExternal का पूरा profile-भरने वाला हिस्सा अब try-catch में
          (guardTeamRender/guardExternalRender अलग functions) — कोई भी अनपेक्षित
          data अब चुप्पी में "जाँच हो रही है" पर हमेशा के लिए नहीं अटकाएगी; दिखता
          त्रुटि-संदेश + पुनः-कोशिश बटन + सहायता-नंबर हमेशा (showLoadError साझा helper)।
          बाक़ी तर्क byte-अछूता — पहले जैसा ही व्यवहार, बस अब सुरक्षा-जाल के साथ।
   v4.3 · 16-Jul-2026 (काम-6 चरण-6) — dual-घर नियम: initNav अब boot-रास्ते से
          छनती काम-सूची बनाता है — external-boot पर team-पैनल छिपे, team-boot पर
          external-पैनल छिपे (साझा-scope नियम: TEAM_PANEL_IDS module-स्तर पर)।
          बाक़ी घरों पर व्यवहार हूबहू वही (उनके पेज में दूसरा block होता ही नहीं)।
   v4.2 · 16-Jul-2026 (काम-6 चरण-2) — प्रशिक्षु-इंजन अब तीनों घरों पर
          (student/jobseeker/entrepreneur): मुफ़्त कोर्स-सूची साझा; Guardian-नोट
          role-अनुसार (विद्यार्थी 10-18 · नौकरी 16-18 job-नियम · उद्यम 16-18)।
   v4.1 · 16-Jul-2026 (काम-6 चरण-1) — (1) guardExternal: प्रशिक्षु-roles
          (student/jobseeker/entrepreneur) पर provisional-पर्दा व "अस्थायी" pill
          अब कभी नहीं — v1.3-(क) "खाता सीधा चालू" का प्रदर्शन-रूप; (2) विद्यार्थी-इंजन:
          मुफ़्त कोर्स-सूची (courses_data.js आलसी-load, url-नियम v2.4-क8, 50-50 खेप)
          + 10-18 Guardian-नोट (dob से)। बाक़ी तर्क byte-अछूता।
   v4.0.1 · 15-Jul-2026 — hotfix: CAN_FINAL/MYDESIG साझा-क्षेत्र में (दो team-block
          के अलग scope से strict-mode ReferenceError — dashboards "जाँच" पर अटकते थे)।
   v4.0 · 15-Jul-2026 — Founder-आदेश: "32 घरों के लिए एक ही CSS/JS"।
   बदला: (1) per-page मूल्य window.ACS_DASH से (पतला खोखा) ·
   (2) build-time TEAM-कटाई → runtime-gate if(MODE==="team") ·
   (3) docChips/fmtDate साझा — external-dashboards का छिपा ReferenceError बंद।
   बाक़ी तर्क टेम्पलेट v3.4 से हूबहू (guards · hold-पट्टी · provisional-पर्दा ·
   पैनल-इंजन · single-session · 10-मिनट auto-logout)।
   असली रोक server (Firestore rules) पर — यह सिर्फ़ पर्दा (matrix-सुरक्षा नियम)।
   ════════════════════════════════════════════════════════════ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection, query, where, onSnapshot, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";

const app = initializeApp({apiKey:"AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM",authDomain:"acslearn-platform.firebaseapp.com",projectId:"acslearn-platform",storageBucket:"acslearn-platform.firebasestorage.app",messagingSenderId:"435395814481",appId:"1:435395814481:web:655f99452a90f8efbc4470"});
const auth = getAuth(app), db = getFirestore(app);
const functions = getFunctions(app, "us-central1");
const $ = (id)=>document.getElementById(id);
/* v4.5 (19-Jul-2026, Laxmi-केस राउंड-2 की सीख): null-सुरक्षित setters —
   बासी-cache/CDN-मिश्रण से कोई सजावटी element ग़ायब हो तो पूरा dashboard न गिरे;
   console में चेतावनी दर्ज हो (गूँगा-fallback निषेध: चुप्पी नहीं, पर मौत भी नहीं)। */
function setTxt(id,v){ const el=$(id); if(el){ el.textContent=v; } else { try{console.warn("ACS element ग़ायब:",id);}catch(e){} } return el; }
function setHTML(id,v){ const el=$(id); if(el){ el.innerHTML=v; } else { try{console.warn("ACS element ग़ायब:",id);}catch(e){} } return el; }

/* ── generator-भरे consts — जिन designations/roles को यह dashboard
   देखने की छूट (display-gate)। असली रोक server (Firestore rules) पर —
   यह सिर्फ़ पर्दा है (matrix-सुरक्षा नियम)। ── */
/* v4.0: per-page मूल्य अब पतले खोखे के window.ACS_DASH से (generator भरता है) */
const CFG = window.ACS_DASH || {};
const MODE = CFG.mode || "external";
const ALLOWED = CFG.allowed || [];
const EXT_ROLES = CFG.extRoles || [];   /* team-mode में external-fallback roles (जैसे volunteer) */
const ROLE_LABEL = CFG.roleLabel || ""; /* external-mode में pill-label */
const HOME = CFG.home || "/dashboard/";

/* ── matrix से label/चौकी-सूची (सिर्फ़ दिखाने के लिए) ── */
const MX = (window.ACS_DESIGNATIONS && window.ACS_DESIGNATIONS.teams) || [];
const mxRow = (key)=> MX.find(t=>t.key===key) || null;
const mxLabel = (key)=>{ const r=mxRow(key); return r ? r.label : (key||"—"); };
/* v3.4 (14-Jul-2026, मिलान-सुधार): कूट-नाम कभी UI पर नहीं (v1.9-क1) —
   public_label सर्वोपरि; cards भी पढ़ो ताकि बाहरी role का सुंदर नाम मिले */
const MXC = (window.ACS_DESIGNATIONS && window.ACS_DESIGNATIONS.cards) || [];
const mxPub = (key)=>{ const r=mxRow(key); return r ? (r.public_label||r.label) : null; };
const cardPub = (key)=>{ const c=MXC.find(x=>x.key===String(key||"").toLowerCase()); return c ? (c.public_label||c.label) : null; };
function pubName(a){
  const d=String(a.designation||"").toLowerCase();
  if(d && mxRow(d)) return mxPub(d);
  const cl=cardPub(a.role); if(cl) return cl;
  const lv=String(a.staff_level||"").toLowerCase();
  const LVL={hq:"मुख्यालय (HQ)",zm:"राज्य/देश-स्तर (ZM)",rm:"क्षेत्रीय (RM)"};
  return LVL[lv] || a.role || "—";
}
/* v1.3-(क) की तीन प्रशिक्षु-श्रेणियाँ — approval-द्वार नहीं (login के NO_OTP जैसा दर्ज-स्थिरांक) */
const NO_GATEWAY_EXT = ["student","jobseeker","entrepreneur"];

function show(id){
  ["loadView","denyView","appView"].forEach(v=>$(v).classList.add("hidden"));
  $(id).classList.remove("hidden");
}
/* (19-Jul-2026, v3.5-घ — गूँगा-fallback निषेध का स्थायी पहरा) किसी भी अनपेक्षित data/
   त्रुटि से dashboard चुपचाप "जाँच हो रही है" पर हमेशा के लिए न अटके — दिखता संदेश +
   पुनः-कोशिश बटन + सहायता-नंबर, हमेशा। साझा — team व external दोनों रास्तों पर। */
function showLoadError(context, e){
  show("loadView");
  const box = $("loadView");
  if(box){
    box.innerHTML =
      '<div class="cbox"><div class="bigicon">⚠️</div>' +
      '<div class="s">कुछ गड़बड़ हुई — ' + context + '</div>' +
      '<div class="note" style="font-size:15px;color:#B71C1C;margin-top:8px;word-break:break-word">' +
        esc((e && e.message) || String(e)) +
      '</div>' +
      '<div class="note" style="font-size:12px;color:#888;margin-top:4px;word-break:break-word;font-family:monospace;white-space:pre-wrap">' +
        esc((e && e.stack) ? String(e.stack).split("\n").slice(0,3).join("\n") : "") +
      '</div>' +
      '<button type="button" style="margin-top:14px;padding:10px 20px;border-radius:10px;border:none;background:var(--blue);color:#fff;font-size:17px;cursor:pointer" onclick="location.reload()">🔄 फिर कोशिश करें</button>' +
      '<div class="note" style="margin-top:10px">बार-बार यही आए तो सहायता से संपर्क करें: <a href="tel:+919431210092">+91-9431210092</a></div>' +
      '</div>';
  }
  console.error("[ACS guard]", context, e);
}
function esc(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ═══ सार्वजनिक पहचान-कार्ड भरना (v3.2) ═══ */
/* registration-दस्तावेज़ से DP (Founder-आदेश 19-Jul: व्यक्ति का upload किया
   professional-फ़ोटो ही DP — ख़ाली चौखट निषेध; verify-नियम सार्वजनिक-सूचियों
   के photo_public पर यथावत) */
function regDocPhoto(reg){
  try{
    const d=(reg&&(reg.documents||reg.docs))||{};
    const p=d.doc_photo||d.photo||null;
    return (p&&p.url)?p.url:"";
  }catch(e){ return ""; }
}
/* ACS DP-सजावट: gradient-ring + नाम-अक्षर placeholder + (verified) ऊपर-दाएँ हरा बैज */
/* (29-Jul स्थायी-इलाज) decor-याददाश्त: रंग का फ़ैसला एक बार बैज-इंजन करता है,
   बाक़ी बुलाने वाले (फ़ोटो-load आदि) याद दोहराते हैं — झिलमिल (हरा↔गोल्डन) बंद। */
let DECOR = { on:false, gold:false };
let BADGE_INFO = null;   /* (29-Jul K1) {kind,till,from,code} — timing-दौड़ में आख़िरी सच यही */
function setBadgePerf(kind, tillMs, code){ setBadgePerfFrom(kind, tillMs, 0, code); }
function setBadgePerfFrom(kind, tillMs, fromMs, code){
  BADGE_INFO = { kind:kind, till:tillMs||0, from:fromMs||0, code:code||"" };
  applyBadgePerf();
}
/* (29-Jul रात, Founder) referral-घड़ी: खिड़की = बैज के पहले 3 सप्ताह; slot-जीवन 1 सप्ताह */
function refClock(){
  if(!BADGE_INFO || !BADGE_INFO.from) return null;
  const WK=7*24*60*60*1000, now=Date.now(), from=BADGE_INFO.from;
  const wk=Math.floor((now-from)/WK)+1;
  if(wk>3) return { over:true };
  const endWin=from+3*WK, endWk=from+wk*WK;
  return { over:false, wk:wk,
    dWin:Math.max(0,Math.ceil((endWin-now)/86400000)),
    dWk:Math.max(0,Math.ceil((endWk-now)/86400000)) };
}
function applyBadgePerf(){
  if(!BADGE_INFO) return;
  const d = BADGE_INFO.till ? new Date(BADGE_INFO.till).toLocaleDateString("hi-IN") : "";
  setTxt("perfBadge", BADGE_INFO.kind==="gold" ? ("Golden 🏅"+(d?(" · "+d):"")) :
    BADGE_INFO.kind==="green" ? ("Green ✔"+(d?(" · "+d):"")) : "—");
  const code = BADGE_INFO.code || window.ACS_REGNO || "";
  if(!code) return;
  const rc = refClock();
  if(rc && rc.over) setTxt("pubRef", code + " · referral-समय पूरा");
  else if(rc) setTxt("pubRef", code + " · हफ़्ता "+rc.wk+"/3 · बचा समय "+rc.dWin+" दिन");
  else setTxt("pubRef", code);
}
function ensurePhotoDecor(verified, gold){ /* v4.8: gold=true ⇒ Student Golden (v3.7) — हरा ✔ सेवा-भूमिकाओं की अटूट पहचान, विद्यार्थी पर गोल्डन 🏅 */
  if(verified===true){ DECOR.on=true; if(typeof gold==="boolean") DECOR.gold=gold; }
  verified = verified || DECOR.on;
  gold = DECOR.gold;
  try{
    const im=$("pPhoto"), fb=$("pPhotoFb");
    const target=(im && im.style.display!=="none") ? im : fb;
    if(!target) return;
    let wrap=document.getElementById("pubPhotoWrap");
    if(!wrap){
      wrap=document.createElement("div"); wrap.id="pubPhotoWrap";
      target.parentNode.insertBefore(wrap, target);
      wrap.appendChild(target);
      if(im && fb && !wrap.contains(im)) wrap.appendChild(im);
      if(im && fb && !wrap.contains(fb)) wrap.appendChild(fb);
    }
    wrap.style.cssText="position:relative;display:inline-block;padding:5px;border-radius:22px;"+
      (gold ? "background:linear-gradient(135deg,#FACC15 0%,#F9A825 55%,#B8860B 100%);"
            : "background:linear-gradient(135deg,#F9A825 0%,#2E7D32 55%,#0B1F3A 100%);")+
      "box-shadow:0 4px 14px rgba(11,31,58,.25);"+
      "height:fit-content;width:fit-content;line-height:0;align-self:flex-start";
    [im,fb].forEach(el=>{ if(!el) return;
      el.style.borderRadius="16px"; el.style.display=el.style.display; });
    if(im && im.style.display!=="none"){
      im.style.width="200px"; im.style.height="250px"; im.style.objectFit="cover";
      im.style.display="block"; im.style.background="#fff"; im.style.margin="0";
      if(fb){ fb.style.display="none"; fb.style.height="0"; fb.style.padding="0"; fb.style.margin="0"; }
    } else if(fb){
      const nm=($("pubName")&&$("pubName").textContent)||"";
      const ch=(nm.trim()[0]||"👤");
      fb.textContent=ch;
      fb.style.cssText="width:200px;height:250px;border-radius:16px;display:flex;"+
        "align-items:center;justify-content:center;font-size:88px;font-weight:800;color:#fff;"+
        "background:linear-gradient(160deg,#1565C0,#0B1F3A);";
    }
    let t=document.getElementById("pubBadgeTick");
    if(verified){
      if(!t){
        t=document.createElement("span"); t.id="pubBadgeTick";
        wrap.appendChild(t);
      }
      t.title = gold ? "ACS Student Golden Badge — सक्रिय" : "ACS Verified Badge — सत्यापित (Green Tick)";
      t.textContent = gold ? "🏅" : "✔";
      t.style.cssText="position:absolute;top:-10px;right:-10px;width:40px;height:40px;"+
        "border-radius:50%;background:"+(gold?"#F9A825":"#2E7D32")+";color:#fff;display:flex;align-items:center;"+
        "justify-content:center;font-size:22px;font-weight:900;border:3px solid #fff;"+
        "box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:5";
    } else if(t){ t.remove(); }
  }catch(e){}
}
function fillPubCard(name, photoUrl, desigLabel, area, district, state){
  setTxt("pubName",  name || "—");
  setTxt("pubDesig", desigLabel || "—");
  setTxt("pubArea",  area || "—");
  setTxt("pubDist",  district || "—");
  setTxt("pubState", state || "—");
  const im=$("pPhoto");
  /* (v4.6, 20-Jul-2026) ✔-बचाव: लगे हुए बैज-निशान को फ़ोटो-load कभी न मिटाए —
     पहले false भेजने से देर-से-आई फ़ोटो हरा ✔ हटा देती थी (cache-दौड़ दोष)। */
  const keepTick=()=>!!document.getElementById("pubBadgeTick");
  if(photoUrl && im){
    im.onload=()=>{ im.style.display="block"; const fb=$("pPhotoFb"); if(fb) fb.style.display="none"; ensurePhotoDecor(keepTick()); };
    im.onerror=()=>{ im.style.display="none"; const fb=$("pPhotoFb"); if(fb) fb.style.display="flex"; ensurePhotoDecor(keepTick()); };
    im.src=photoUrl;
  }
  ensurePhotoDecor(keepTick());
  perfFill();
}
/* (29-Jul K4, Founder-आदेश) फ़ोटो-स्विच चालू: फ़ाइल → canvas-छोटा (~500px) →
   server-function updateProfilePhoto। प्रशिक्षु का अपना कार्ड ⇒ फ़ोटो तुरंत बदले;
   सेवा-भूमिका पर DP-नीति यथावत — नया फ़ोटो जाँच के बाद ही public (v1.8-ख3)। */
document.addEventListener("click", function(ev){
  if(!ev.target.closest("#photoUpBtn")) return;
  const fi=$("photoUpFile"); if(fi) fi.click();
});
document.addEventListener("change", async function(ev){
  if(!ev.target || ev.target.id!=="photoUpFile") return;
  const f=ev.target.files && ev.target.files[0]; if(!f) return;
  const msg=$("photoUpMsg");
  function say(t,ok){ if(msg){ msg.style.color = ok?"var(--green)":"#B71C1C"; msg.textContent=t; } }
  say("⏳ फ़ोटो छोटा करके भेजा जा रहा है…", true);
  try{
    const img=new Image();
    const url=URL.createObjectURL(f);
    await new Promise((res,rej)=>{ img.onload=res; img.onerror=rej; img.src=url; });
    const M=500, r=Math.min(1, M/Math.max(img.width,img.height));
    const cv=document.createElement("canvas");
    cv.width=Math.round(img.width*r); cv.height=Math.round(img.height*r);
    cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
    URL.revokeObjectURL(url);
    const b64=cv.toDataURL("image/jpeg",0.85).split(",")[1];
    const out=await httpsCallable(functions,"updateProfilePhoto")({ photo_b64:b64 });
    const d=(out&&out.data)||{};
    if(d.liveNow && d.url){
      const im=$("pPhoto"); if(im){ im.src=d.url; im.style.display="block"; const fb=$("pPhotoFb"); if(fb) fb.style.display="none"; }
      say("✅ नया फ़ोटो लग गया!", true);
    } else {
      say("✅ फ़ोटो पहुँच गया — जाँच के बाद कार्ड पर लगेगा; तब तक पुराना ही दिखेगा।", true);
    }
  }catch(e){ say("नहीं भेज पाए: "+((e&&e.message)||e), false); }
});
/* (30-Jul होल-2) courses_data.js का एक-दरवाज़ा loader — top-level const वाली
   फ़ाइल दो script-tag से load हो तो दूसरा re-declare पर मरता है; पूरा dashboard
   अब इसी एक दरवाज़े से data माँगे (एक चीज़ = एक जगह)। in-flight माँगें क़तार में। */
let CRSDATA_CBS=null;
function ensureCoursesData(cb){
  if(typeof SELF_EMP_COURSES!=="undefined"){ try{cb(true);}catch(e){} return; }
  if(CRSDATA_CBS){ CRSDATA_CBS.push(cb); return; }
  CRSDATA_CBS=[cb];
  const sc=document.createElement("script"); sc.src="/assets/courses_data.js";
  sc.onload=function(){ const L=CRSDATA_CBS||[]; CRSDATA_CBS=null; L.forEach(f=>{ try{f(true);}catch(e){} }); };
  sc.onerror=function(){ const L=CRSDATA_CBS||[]; CRSDATA_CBS=null; L.forEach(f=>{ try{f(false);}catch(e){} }); };
  document.body.appendChild(sc);
}
/* (30-Jul होल-2, Founder) कोर्स रजिस्टर्ड / पूरे — गिनती वही जो "मेरे कोर्स"
   पैनल की (➕ से जुड़े + पाठ-खुले कोर्स; पूरे = सब पाठ पढ़े) — एक चीज़ = एक हिसाब। */
function perfCourseStats(){
  ensureCoursesData(function(ok){
    if(!ok){ setTxt("perfCrsReg","—"); setTxt("perfCrsDone","—"); return; }
    try{
      const L=[(typeof SELF_EMP_COURSES!=="undefined")?SELF_EMP_COURSES:[],
               (typeof PRIVATE_JOB_COURSES!=="undefined")?PRIVATE_JOB_COURSES:[],
               (typeof LOCAL_JOB_COURSES!=="undefined")?LOCAL_JOB_COURSES:[],
               (typeof GOVT_JOB_COURSES!=="undefined")?GOVT_JOB_COURSES:[]];
      let E={}; try{ E=JSON.parse(localStorage.getItem("acs_my_courses")||"{}"); }catch(e){}
      let d={}; try{ d=JSON.parse(localStorage.getItem("acs_learn_progress")||"{}"); }catch(e){}
      const read=d.read||{}, byC={};
      for(const k in read){ const m=String(k).match(/^(\/courses\/[a-z]{2}\/[a-z0-9-]+\/)/); if(m) byC[m[1]]=(byC[m[1]]||0)+1; }
      let reg=0, done=0;
      L.forEach(arr=>(arr||[]).forEach(c=>{
        if(!c) return;
        const started=c.url&&byC[c.url];
        if(E[c.id]||started){ reg++; const t=Number(c.lessons)||0; if(t&&started&&byC[c.url]>=t) done++; }
      }));
      setTxt("perfCrsReg",String(reg)); setTxt("perfCrsDone",String(done));
    }catch(e){}
  });
}
/* (29-Jul) ⚡ परफ़ॉर्मेंस-परत — पाठ-गिनती · लगातार-दिन · कोर्स-आँकड़े device-local;
   रुचि-दिशा: पहले device, फिर खाता (server) जीतता है (30-Jul होल-1) · बैज-स्थिति */
function perfFill(){
  try{
    let d={}; try{ d=JSON.parse(localStorage.getItem("acs_learn_progress")||"{}"); }catch(e){}
    const r=d.read||{}, days=d.days||{}; let n=0; for(const k in r) n++;
    setTxt("perfLessons", String(n));
    let st=0, t=new Date();
    for(;;){ const ds=t.toISOString().slice(0,10); if(days[ds]){ st++; t.setDate(t.getDate()-1); } else break; }
    setTxt("perfStreak", String(st));
    perfCourseStats();   /* (30-Jul होल-2) कोर्स रजिस्टर्ड / पूरे */
    let ap={}; try{ ap=JSON.parse(localStorage.getItem("acs_apt_sess_v1")||"{}"); }catch(e){}
    if(ap.prev && ap.prev.mg && ap.prev.mg.length) setTxt("perfSector", ap.prev.mg[0]);
    /* (30-Jul होल-1) खाता (server) जीतता है — फ़ोन बदलने पर भी रुचि-दिशा वही।
       function अभी deploy न हो/network fail = चुपचाप, device-मूल्य बना रहे। */
    try{
      httpsCallable(functions,"latestAptitudeResult")({}).then(r=>{
        const d=(r&&r.data)||{};
        if(d.found && d.prev && d.prev.mg && d.prev.mg.length)
          setTxt("perfSector", String(d.prev.mg[0]).replace(/[<>]/g,""));
      }).catch(()=>{});
    }catch(e){}
    if(BADGE_INFO){ applyBadgePerf(); }
    else{
      let g=null; try{ g=JSON.parse(localStorage.getItem("acs_apt_gate_v1")||"null"); }catch(e){}
      setTxt("perfBadge", (g && g.until>Date.now()) ? "सक्रिय ✅" : "—");
    }
  }catch(e){}
}

/* ═══ काम-सूची इंजन (v3.1) — पैनल click-पर, data आलसी-load ═══ */
window.toggleSide = function(){
  document.getElementById("sideNav").classList.toggle("open");
  document.getElementById("sideVeil").classList.toggle("open");
};
const LAZY = {}; /* team-mode अपनी entries नीचे (team-only block में) भरता है */
/* v4.0.1 (15-Jul-2026): guard-block व engines-block अलग scope थे — guardTeam का
   CAN_FINAL/MYDESIG भरना strict-mode ReferenceError देता था ("जाँच हो रही है" पर
   अटकना)। साझा state अब यहाँ — दोनों block एक ही घर पढ़ें-लिखें। */
let CAN_FINAL = false;
let MYDESIG = "";
let EXT_REG = null;   /* (काम-11+) बाहरी-boot का reg — बैज/खाता-बही इंजन के लिए (साझा-scope नियम) */
/* v4.3 dual-नियम: team-block के पाँच पैनल — external-boot पर काम-सूची से बाहर */
const TEAM_PANEL_IDS = ["pnl-apps","pnl-exo","pnl-team","pnl-tasks","pnl-reports","pnl-badgeq","pnl-sevaq"]; /* E1: nav-whitelist नियम — नया team-पैनल = id यहाँ भी */
/* ⚠️ nav-whitelist नियम (19-Jul सीख): नया team-पैनल जोड़ो तो उसका id ऊपर की सूची में भी —
   वरना पेज में होते हुए भी काम-सूची से छँट जाएगा (badgeq-प्रकरण, Founder ने Notepad से पकड़ा)। */
function initNav(boot){
  const nav=$("sideNav"); nav.innerHTML="";
  document.querySelectorAll(".panel").forEach(p=>{
    /* वाणी सार्वभौम — किसी भी boot में कभी न छँटे */
    if(p.id!=="pnl-vani"){
      if(boot==="ext" && TEAM_PANEL_IDS.indexOf(p.id)>-1) return;
      if(boot==="team" && p.id!=="pnl-profile" && TEAM_PANEL_IDS.indexOf(p.id)===-1) return;
    }
    const b=document.createElement("button");
    b.className="si"; b.textContent=p.getAttribute("data-nav")||p.id;
    b.setAttribute("data-go",p.id);
    b.addEventListener("click",()=>navGo(p.id));
    nav.appendChild(b);
  });
  navGo("pnl-profile");
}
function navGo(id){
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("on",p.id===id));
  document.querySelectorAll(".side .si").forEach(b=>b.classList.toggle("on",b.getAttribute("data-go")===id));
  const nv=$("sideNav"); if(nv.classList.contains("open")) window.toggleSide();
  window.scrollTo(0,0);
  const fn=LAZY[id]; if(typeof fn==="function") fn();
}

/* ═══ पहरा (display-gate) — MODE से शाखा ═══ */
onAuthStateChanged(auth, async (user)=>{
  if(!user){ location.href="/dashboard/index.html"; return; }
  if(MODE==="external"){ await guardExternal(user); return; }
  await guardTeam(user);
});

/* ═══ साझा helpers (v4.0: team-block से बाहर — external का docChips-होल बंद) ═══ */
const DOC_HI = { doc_photo:"आपका फ़ोटो", doc_guardian_id:"अभिभावक का पहचान-पत्र", doc_id:"पहचान-पत्र",
  doc_qual:"योग्यता-प्रमाण", doc_skill:"हुनर-प्रमाण फ़ोटो", doc_reg:"पंजीकरण/लाइसेंस",
  doc_inst_out:"संस्था — बाहर का फ़ोटो", doc_inst_in:"संस्था — अंदर का फ़ोटो" };
function docHi(k){ return DOC_HI[k] || String(k).replace(/^doc_/,"").replace(/_/g," "); }
function docChips(docs){
  const keys = Object.keys(docs||{});
  if(keys.length===0) return "";
  return keys.map(k=>{
    const d = docs[k];
    const u = (typeof d==="string") ? d : (d && d.url);
    if(!u) return '<span class="doc" style="margin:4px 6px 0 0;color:#B71C1C">📄 '+esc(docHi(k))+' (नहीं चढ़ा)</span>';
    return '<a class="doc" style="margin:4px 6px 0 0" target="_blank" rel="noopener" href="'+esc(u)+'">📄 '+esc(docHi(k))+'</a>';
  }).join("");
}
function fmtDate(ts){
  try{ const d=(ts&&ts.toDate)?ts.toDate():null; if(!d) return "—";
    return d.getDate().toString().padStart(2,"0")+"-"+(d.getMonth()+1).toString().padStart(2,"0")+"-"+d.getFullYear();
  }catch(e){ return "—"; }
}

/* v4.0 runtime-gate: external-mode में guardTeam = सीधा deny (build-time कटाई ख़त्म) */
let guardTeam = async ()=>{ show("denyView"); };

if (MODE==="team") { /* ═ team-guard (runtime-gate v4.0) ═ */
guardTeam = async function(user){
  let team = null;
  try{
    const snap = await getDoc(doc(db,"teams",user.uid));
    if(snap.exists()) team = snap.data();
  }catch(e){ /* पढ़ न पाए तो नीचे deny */ }
  const desig = ((team && team.designation)||"").toLowerCase();
  if(!team || ALLOWED.indexOf(desig)===-1){
    if(EXT_ROLES.length){ await guardExternal(user); return; } /* dual: provisional-external रास्ता */
    show("denyView"); return;
  }

  try{ await guardTeamRender(user, team, desig); }
  catch(e){ showLoadError("dashboard नहीं दिखा (team)", e); }
};
} /* team-guard end */

/* (19-Jul-2026, v3.5-घ) profile-भरने का पूरा हिस्सा अलग function में — पूरी तरह
   guardTeam की try-catch के भीतर चलता है; कोई भी अनपेक्षित data अब चुप्पी में
   नहीं दबेगा, दिखता संदेश देगी (गूँगा-fallback निषेध नियम)। */
async function guardTeamRender(user, team, desig){
  /* ── [T2] hold-पट्टी (v1.4 fields: hold:{type,reason}) ── */
  if(team.hold && team.hold.type){
    const hb=$("holdBar");
    hb.textContent = "⛔ आप पर hold लगा है — कारण: " + (team.hold.reason||"—");
    hb.classList.add("on");
  }

  /* ── [T3] provisional-पर्दा ── */
  const isActive = (team.active===true);
  if(!isActive) $("provBar").classList.add("on");

  /* ── अंतिम-मुहर अधिकार (display-gate; असली जाँच server पर) ── */
  CAN_FINAL = (desig==="founder" || desig==="hq_admin");

  /* ── topbar व pill + login-पहचान (v1.6-ङ2 होल बंद) ── */
  setTxt("desigPill", mxLabel(desig) + (isActive ? "" : " (अस्थायी — जाँच में)"));
  const whoName = team.name_local || team.name_roman || team.name || team.fullName || (user.email||"");
  setTxt("tbWho", "👤 " + whoName + " · " + mxLabel(desig));
  $("tbWho").title = "UID: " + user.uid;
  const homeDist = (team.region && team.region.length ? team.region[0] : (team.district||""));
  const pubArea = [team.country, team.state, (team.region&&team.region.join)?team.region.join(", "):team.region].filter(Boolean).join(" · ");
  fillPubCard(whoName, team.photo_public || team.photoURL || "", mxLabel(desig), pubArea, homeDist, team.state||"");

  /* ── [T4] प्रोफ़ाइल — teams से ── */
  setTxt("pName", team.name_local || team.name_roman || team.name || team.fullName || "—");
  setTxt("pLevel", (team.level||"—").toUpperCase());
  const area = [team.country, team.state, (team.region&&team.region.join)?team.region.join(", "):team.region].filter(Boolean).join(" · ");
  setTxt("pArea", area || "—");
  setTxt("pEmail", team.email || (user.email||"—"));
  setTxt("pPhone", team.phone || team.mobile || "—");

  show("appView");

  /* ── registration-ब्योरा (regNo · दस्तावेज़ · सफ़र) — विफल हो तो dashboard न रुके ── */
  if(desig==="founder"){
    setHTML("tlWrap", '<div class="note" style="font-size:18px;font-weight:700;color:var(--navy)">👑 Founder — सर्वोच्च; कोई approval-सफ़र लागू नहीं (नियम-4)।</div>');
    setTxt("tlNote", "");
    setTxt("docNote", "Founder-खाते पर आवेदन-record लागू नहीं।");
  } else {
    loadRegistration(user).catch(()=>{
      setTxt("pReg", "—");
      setTxt("docNote", "आवेदन-ब्योरा नहीं खुला — network/नियम जाँचें।");
      drawTimeline(desig, null);
    });
  }

  /* ── v3.1: data आलसी-load — पैनल खुलने पर ही (500+ के लिए हल्का) ── */
  MYDESIG = desig;
  /* ── वाणी-context (साझा /assets/vani.js के लिए) ── */
  try{ window.__ACS_VANI = { app, auth, functions, httpsCallable,
    firestore:{ getFirestore, collection, query, orderBy, onSnapshot },
    uid:user.uid, lang:"hi" }; }catch(e){}
  initNav("team");

  /* ── single-session (v1.2 नियम): sessions/{uid} सुनो ── */
  startSessionWatch(user);
  /* ── 10-मिनट auto-logout ── */
  startIdleTimer();
}

/* ═══ registration पढ़ना — स्रोत: registrations (एकमात्र सही collection) ═══ */
async function loadRegistration(user){
  const qs = await getDocs(query(collection(db,"registrations"), where("authUid","==",user.uid)));
  let latest=null, t0=0;
  qs.forEach(d=>{
    const r=d.data();
    if(r.status==="cancelled") return;
    const t = (r.createdAt&&r.createdAt.toMillis)?r.createdAt.toMillis():0;
    if(!latest || t>t0){ latest=r; t0=t; }
  });
  if(!latest){ setTxt("pReg", "—"); setTxt("docNote", "कोई आवेदन-record नहीं मिला (सीधे बनाए गए account में सामान्य है)।"); drawTimeline(null,null); return; }

  setTxt("pReg", latest.regNo || "—");

  /* दस्तावेज़-chips */
  const docs = latest.documents || latest.docs || {};
  const keys = Object.keys(docs);
  const wrap = $("docWrap"); wrap.innerHTML="";
  if(keys.length===0){ setTxt("docNote", "आवेदन में कोई दस्तावेज़-link दर्ज नहीं।"); }
  else{ wrap.innerHTML = docChips(docs); setTxt("docNote", ""); }
  /* (19-Jul Founder-आदेश) team-प्रोफ़ाइल की DP भी registration के doc_photo से */
  try{
    const dp=regDocPhoto(latest);
    const im=$("pPhoto");
    if(dp && im && im.style.display==="none"){
      im.onload=()=>{ im.style.display="block"; const fb=$("pPhotoFb"); if(fb) fb.style.display="none"; ensurePhotoDecor(!!document.getElementById("pubBadgeTick")); };
      im.src=dp;
    }
  }catch(e){}
  drawTimeline(null, latest);
}

/* ═══ approval-सफ़र timeline — चौकियाँ matrix से, स्थिति status से ═══ */
function drawTimeline(desigKey, reg){
  if(desigKey==="founder") return;
  const approvedX = !!(reg && (reg.status==="approved"));
  /* ── v3.4 (14-Jul-2026) मिलान-सुधार: बाहरी roles पर टीम-चौकियाँ कभी नहीं ──
     पहचान: external-प्रवाह drawTimeline को desigKey=null भेजता है (guardExternal-रास्ता) */
  if(!desigKey){
    const roleKey = String((reg && reg.role) || EXT_ROLES[0] || ALLOWED[0] || "").toLowerCase();
    const wrapX=$("tlWrap"); wrapX.innerHTML="";
    if(NO_GATEWAY_EXT.indexOf(roleKey)>-1){
      /* प्रशिक्षु: कोई approval-द्वार नहीं — एक ही पूर्ण-कदम */
      const st=document.createElement("div"); st.className="step done";
      st.innerHTML='<div class="dot"><i></i><em></em></div><div class="lbl">रजिस्ट्रेशन<small>पूर्ण ✅ — खाता सीधा चालू</small></div>';
      wrapX.appendChild(st);
      $("tlNote").textContent="आपके role के लिए approval ज़रूरी नहीं — खाता सीधा चालू है ✅";
      return;
    }
    /* सेवा-roles (g2): सरल 2-कदम प्रदर्शन-नक़्शा */
    const steps=[{w:"RM भौतिक-सत्यापन",t:" — चौकी"},{w:"स्वीकृति",t:" — अंतिम मुहर"}];
    steps.forEach(function(sp,i){
      const st=document.createElement("div");
      st.className="step "+(approvedX?"done":(i===0?"now":""));
      st.innerHTML='<div class="dot"><i></i><em></em></div><div class="lbl">'+sp.w+'<small>'+(approvedX?"पूर्ण ✅":"जाँच में")+sp.t+'</small></div>';
      wrapX.appendChild(st);
    });
    $("tlNote").textContent = approvedX ? "आपका approval पूर्ण है — पूरा functioning चालू।" : "बाहरी roles की चौकी-दर-चौकी live स्थिति (g2) अगले दौर में जुड़ेगी — यह सरल नक़्शा है।";
    return;
  }
  const me = desigKey || (ALLOWED[0]||"");
  const row = mxRow(me) || {};
  const chain = ["hq_legal","hq_finance","hq_establishment"];
  if(row.superior && chain.indexOf(row.superior)===-1) chain.push(row.superior);
  const finalKey = (row.final_approval==="hq_admin") ? "hq_admin" : "founder";
  if(chain.indexOf(finalKey)===-1) chain.push(finalKey);

  const approved = !!(reg && (reg.status==="approved"));
  const wrap=$("tlWrap"); wrap.innerHTML="";
  chain.forEach((k,i)=>{
    const st=document.createElement("div");
    st.className = "step " + (approved ? "done" : (i===0 ? "now" : ""));
    const who = (k==="founder") ? "Founder" : (mxPub(k)||mxLabel(k));   /* v3.4: कूट-नाम नहीं */
    const tag = (i===chain.length-1) ? " — अंतिम मुहर" : (i>=3 ? " — विभागीय चौकी" : " — चौकी");
    st.innerHTML = '<div class="dot"><i></i><em></em></div><div class="lbl">'+who+'<small>'+ (approved?"पूर्ण ✅":"स्थिति चरण-3 से live होगी") + tag +'</small></div>';
    wrap.appendChild(st);
  });
  $("tlNote").textContent = approved ? "आपका approval पूर्ण है — पूरा functioning चालू।" : "चौकी-दर-चौकी की live स्थिति चरण-3 (server-approval) से जुड़ेगी।";
}

if (MODE==="team") { /* ═ team-engines (runtime-gate v4.0) ═ */
/* ═══ v3.1 आलसी-load entries (सिर्फ़ team-mode) ═══ */
let TEAM_LOADED=false, APPS_LOADED=false, REPORTS_LOADED=false, TASKS_LOADED=false;
async function ensureTeam(){ if(!TEAM_LOADED){ TEAM_LOADED=true; await loadTeamPanel(MYDESIG); } }
LAZY["pnl-apps"]    = async ()=>{ if(!APPS_LOADED){ APPS_LOADED=true; await loadApplications(); } };
LAZY["pnl-exo"]     = async ()=>{ await ensureTeam(); };
LAZY["pnl-team"]    = async ()=>{ await ensureTeam(); };
LAZY["pnl-tasks"]   = async ()=>{ await ensureTeam(); if(!TASKS_LOADED){ TASKS_LOADED=true; await loadTasks(); } };
LAZY["pnl-reports"] = async ()=>{ if(!REPORTS_LOADED){ REPORTS_LOADED=true; await loadReports(); } };

/* ═══ [P1] आवेदन-सूची — registrations (एकमात्र सही स्रोत), सिर्फ़ पढ़ना ═══ */
let APPS = [], FILTER = "all";
let APP_CURSOR = null, APP_DONE = false, APP_PAGE = 50;
async function loadApplications(more){
  const box = $("appList");
  try{
    let q1 = query(collection(db,"registrations"), orderBy("createdAt","desc"), limit(APP_PAGE));
    if(more && APP_CURSOR) q1 = query(collection(db,"registrations"), orderBy("createdAt","desc"), startAfter(APP_CURSOR), limit(APP_PAGE));
    if(!more){ APPS = []; APP_CURSOR = null; APP_DONE = false; }
    const qs = await getDocs(q1);
    let got = 0;
    qs.forEach(d=>{ const r=d.data(); r._id=d.id; APPS.push(r); APP_CURSOR=d; got++; });
    if(got < APP_PAGE) APP_DONE = true;
    drawApps();
  }catch(e){
    box.innerHTML = '<div class="note">सूची नहीं खुली — या तो आवेदन-सूची का rules-दायरा अभी आपके पद तक विस्तारित नहीं (अगला दौर), या network जाँचें। (' + (e.code||"") + ')</div>';
  }
}
function drawApps(){
  const box = $("appList"); box.innerHTML = "";
  const list = APPS.filter(a=> FILTER==="all" ? true : (a.status||"")===FILTER);
  if(list.length===0){ box.innerHTML = '<div class="note">इस श्रेणी में कोई आवेदन नहीं।</div>'; return; }
  if(list.length && !APP_DONE){
    /* नीचे "और देखें" जुड़ेगा */
  }
  list.forEach(a=>{
    const st = a.status||"provisional";
    const stChip = st==="approved" ? '<span class="chip appr">✅ स्वीकृत</span>'
                 : st==="cancelled" ? '<span class="chip canc">🗑️ निरस्त</span>'
                 : st==="rejected" ? '<span class="chip rej">⚠️ अस्वीकृत</span>'
                 : '<span class="chip prov">⏳ जाँच में</span>';
    const lvl = pubName(a);   /* v3.4: कूट-नाम-chip होल बंद (v1.9-ङ4) */
    const area = [a.country,a.state,(a.rm_districts&&a.rm_districts.join)?a.rm_districts.join(", "):a.rm_districts].filter(Boolean).join(" · ");
    const docs = a.documents||a.docs||{};
    const docLinks = docChips(docs) || '<span class="note">कोई दस्तावेज़-link नहीं</span>';
    let rejInfo = "";
    if(a.rejection && a.rejection.reason){
      rejInfo = '<div class="mrow"><b>अस्वीकृति-कारण:</b> '+a.rejection.reason+'</div>'
              + '<div class="mrow"><b>सुधार-समय:</b> '+fmtDate(a.rejection.correction_deadline)+' तक (1 सप्ताह — v1.4 नियम)</div>';
    }
    const canAct = CAN_FINAL && (st==="provisional" || st==="rejected");
    const rn = a.regNo || a._id;
    const actHtml = canAct
      ? '<div class="acts">'
        + '<button class="abtn ok" data-act="approve" data-reg="'+rn+'">✅ Approve (अंतिम मुहर)</button>'
        + '<button class="abtn no" data-act="rejopen" data-reg="'+rn+'">❌ Reject</button>'
        + '</div>'
        + '<div class="rejbox" id="rej-'+rn+'"><textarea id="rtx-'+rn+'" placeholder="अस्वीकृति का कारण लिखें (अनिवार्य)"></textarea>'
        + '<button class="abtn no" style="margin-top:6px" data-act="reject" data-reg="'+rn+'">कारण के साथ Reject भेजें</button></div>'
        + '<div class="msg" id="msg-'+rn+'"></div>'
      : '<div class="msg" id="msg-'+rn+'"></div>';
    const el = document.createElement("div");
    el.className = "app";
    el.innerHTML =
      '<div class="r1"><span class="nm">'+esc(a.name_local||a.name_roman||a.name||a.fullName||"—")+'</span>'+
      '<span class="rg">('+esc(a.regNo||a._id)+')</span>'+stChip+
      '<span class="chip lvl">'+esc(lvl)+'</span></div>'+
      '<div class="r2">📅 '+fmtDate(a.createdAt)+(area?(' · 📍 '+esc(area)):'')+(a.email?(' · ✉️ '+esc(a.email)):'')+'</div>'+
      '<div class="more"><div class="mrow"><b>Mobile:</b> '+esc(a.phone||a.mobile||"—")+'</div>'+
      '<div class="mrow"><b>दस्तावेज़:</b><br/>'+docLinks+'</div>'+
      rejInfo +
      actHtml + '</div>'+
      '<button class="vbtn">👁️ view</button>';
    el.querySelector(".vbtn").addEventListener("click",()=>{ el.classList.toggle("open"); });
    box.appendChild(el);
  });
  if(!APP_DONE){
    const mb=document.createElement("button");
    mb.className="abtn ok"; mb.style.background="var(--blue)"; mb.style.marginTop="10px";
    mb.textContent="⬇️ और "+APP_PAGE+" आवेदन देखें";
    mb.addEventListener("click", async ()=>{ mb.disabled=true; await loadApplications(true); });
    box.appendChild(mb);
    const nt=document.createElement("div"); nt.className="note";
    nt.textContent="अभी "+APPS.length+" आवेदन दिखे — बाक़ी खेप-दर-खेप (500+ के लिए हल्का रास्ता)।";
    box.appendChild(nt);
  }
}
document.addEventListener("click",(ev)=>{
  const t = ev.target.closest(".ftab"); if(!t) return;
  FILTER = t.getAttribute("data-f");
  document.querySelectorAll(".ftab").forEach(b=>b.classList.toggle("on", b===t));
  drawApps();
});

/* ═══ [P1] approve/reject — server-मुहर (चरण-3) ═══ */
document.addEventListener("click", async (ev)=>{
  const b = ev.target.closest(".abtn"); if(!b) return;
  const act = b.getAttribute("data-act"), rn = b.getAttribute("data-reg");
  if(!act || !rn) return;
  if(act==="rejopen"){ const box=$("rej-"+rn); if(box) box.classList.toggle("on"); return; }
  const msg = $("msg-"+rn);
  if(act==="approve" && !confirm(rn+" — अंतिम मुहर लगाएँ? (आवेदन स्वीकृत + टीम-सदस्यता active)")) return;
  let reason = "";
  if(act==="reject"){
    const tx=$("rtx-"+rn); reason=(tx&&tx.value||"").trim();
    if(!reason){ if(msg){msg.className="msg err";msg.textContent="कारण लिखना अनिवार्य है।";} return; }
  }
  b.disabled = true; if(msg){msg.className="msg";msg.textContent="server-मुहर लग रही है…";}
  try{
    const fn = httpsCallable(functions, act==="approve" ? "approveApplication" : "rejectApplication");
    await fn(act==="approve" ? {regNo:rn} : {regNo:rn, reason:reason});
    if(msg){msg.className="msg ok";msg.textContent = act==="approve" ? "✅ स्वीकृत — टीम-सदस्यता active हो गई।" : "⚠️ अस्वीकृत — कारण व 1-सप्ताह सुधार-समय दर्ज।";}
    await loadApplications();
  }catch(e){
    b.disabled = false;
    if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+(e && e.message ? e.message : e);}
  }
});

/* ═══ [P2] टीम-पैनल — teams से; hold-बटन server (setHold/liftHold) ═══ */
async function loadTeamPanel(myDesig){
  MYDESIG = myDesig;
  const listEl = $("teamList"), exoEl = $("exoList");
  let members = [];
  try{
    const qs = await getDocs(collection(db,"teams"));
    qs.forEach(d=>{ const t=d.data(); t._uid=d.id; members.push(t); });
  }catch(e){
    listEl.textContent = "टीम-सूची नहीं खुली — rules v3 deploy जाँचें। ("+(e.code||"")+")";
    exoEl.textContent = "—"; return;
  }
  const activeDesigs = {};
  members.forEach(m=>{ if(m.active===true) activeDesigs[String(m.designation||"").toLowerCase()] = true; });
  const mine = MX.filter(t => t.superior===myDesig && t.key!=="founder" && !activeDesigs[t.key]);
  exoEl.innerHTML = mine.length
    ? mine.map(t=>'<span class="exo">🧭 '+t.label+'</span>').join("") +
      '<div class="note">इन पदों की चौकी/काम अभी आपके पदेन प्रभार में — धारक आते ही अपने-आप वापस।</div>'
    : '<span class="note">अभी कोई पदेन प्रभार नहीं — आपके नीचे के सब पद भरे हैं।</span>';

  TEAM_MEMBERS = members;
  fillMemberSelect();
  members.sort((a,b)=> String(a.designation||"").localeCompare(String(b.designation||"")));
  listEl.innerHTML = "";
  if(members.length===0){ listEl.textContent="कोई टीम-सदस्य record नहीं।"; return; }
  members.forEach(m=>{
    const d = String(m.designation||"").toLowerCase();
    const isSelf = (auth.currentUser && m._uid===auth.currentUser.uid);
    const holdRec = m.hold && m.hold.type ? m.hold : null;
    const stChip = holdRec ? '<span class="chip hold">⛔ '+(holdRec.type==="id"?"घोर ID-Hold":"हल्का Work-Hold")+'</span>'
                 : (m.active===true ? '<span class="chip on">active</span>' : '<span class="chip off">provisional</span>');
    const el = document.createElement("div");
    el.className = "mem";
    let acts = "";
    if(d!=="founder" && !isSelf){
      acts = holdRec
        ? '<div class="acts"><button class="abtn ok" data-hact="lift" data-uid="'+m._uid+'">🔓 Un-hold</button></div>'
        : '<div class="acts">'
          + '<button class="abtn no" data-hact="work" data-uid="'+m._uid+'">🟠 Work-Hold</button>'
          + '<button class="abtn no" data-hact="id" data-uid="'+m._uid+'">⛔ ID-Hold</button>'
          + '<button class="abtn ok" data-hact="tropen" data-uid="'+m._uid+'" style="background:var(--blue)">🔁 Transfer</button></div>'
          + '<div class="rejbox" id="hbx-'+m._uid+'"><textarea id="htx-'+m._uid+'" placeholder="hold का कारण (अनिवार्य)"></textarea>'
          + '<button class="abtn no" style="margin-top:6px" data-hact="send" data-uid="'+m._uid+'">कारण के साथ hold लगाएँ</button></div>'
          + '<div class="rejbox" id="tbx-'+m._uid+'"><div class="note" style="margin-bottom:6px">🔁 Transfer (v1.4-ख): इस सदस्य का काम/permission किसे मिले?</div>'
          + '<select id="tsl-'+m._uid+'" style="font-size:17px;padding:10px;border:1px solid var(--border);border-radius:9px;max-width:100%"></select>'
          + '<textarea id="ttx-'+m._uid+'" style="margin-top:6px" placeholder="Transfer का कारण (अनिवार्य)"></textarea>'
          + '<button class="abtn ok" style="margin-top:6px;background:var(--blue)" data-hact="trsend" data-uid="'+m._uid+'">🔁 Transfer करें</button></div>';
      acts += '<div class="msg" id="hmsg-'+m._uid+'"></div>';
    }
    el.innerHTML =
      '<div class="r1"><span class="nm">'+esc(m.name_local||m.name_roman||m.name||m.email||"—")+'</span>'
      + '<span class="pill">'+mxLabel(d)+'</span>'+stChip
      + (m.level && String(m.level).toUpperCase()!==mxLabel(d).toUpperCase() ? '<span class="chip lvl">'+esc(String(m.level).toUpperCase())+'</span>':'')+'</div>'
      + (holdRec?'<div class="hres">कारण: '+esc(holdRec.reason||"—")+'</div>':'')
      + acts;
    listEl.appendChild(el);
  });
}
let PENDING_HOLD = {};
document.addEventListener("click", async (ev)=>{
  const b = ev.target.closest("[data-hact]"); if(!b) return;
  const act = b.getAttribute("data-hact"), uid = b.getAttribute("data-uid");
  const msg = $("hmsg-"+uid);
  if(act==="work" || act==="id"){
    PENDING_HOLD[uid]=act;
    const bx=$("hbx-"+uid); if(bx) bx.classList.add("on");
    if(msg){msg.className="msg";msg.textContent=(act==="id"?"घोर ID-Hold":"हल्का Work-Hold")+" चुना — कारण लिखकर भेजें।";}
    return;
  }
  if(act==="tropen"){
    const bx=$("tbx-"+uid); if(!bx) return;
    const sel=$("tsl-"+uid);
    if(sel && !sel.options.length){
      sel.innerHTML = TEAM_MEMBERS
        .filter(m=>m._uid!==uid && String(m.designation||"").toLowerCase()!=="founder")
        .map(m=>'<option value="'+esc(m._uid)+'">'+esc(m.name_local||m.name_roman||m.name||m.email||m._uid)+' — '+mxLabel(String(m.designation||"").toLowerCase())+'</option>').join("");
    }
    bx.classList.toggle("on"); return;
  }
  if(act==="trsend"){
    b.disabled=true;
    try{
      const toUid=($("tsl-"+uid)||{}).value, reason=(($("ttx-"+uid)||{}).value||"").trim();
      if(!toUid || !reason){ if(msg){msg.className="msg err";msg.textContent="नया सदस्य व कारण — दोनों अनिवार्य।";} b.disabled=false; return; }
      await httpsCallable(functions,"transferRole")({fromUid:uid, toUid:toUid, reason:reason});
      if(msg){msg.className="msg ok";msg.textContent="🔁 transfer दर्ज — history में।";}
      await loadTeamPanel(MYDESIG);
    }catch(e){ b.disabled=false; if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e);} }
    return;
  }
  b.disabled = true;
  try{
    if(act==="send"){
      const tx=$("htx-"+uid); const reason=(tx&&tx.value||"").trim();
      if(!reason){ if(msg){msg.className="msg err";msg.textContent="कारण अनिवार्य है।";} b.disabled=false; return; }
      await httpsCallable(functions,"setHold")({targetUid:uid, type:(PENDING_HOLD[uid]||"work"), reason:reason});
      if(msg){msg.className="msg ok";msg.textContent="⛔ hold लग गया — history में दर्ज।";}
    }else if(act==="lift"){
      if(!confirm("Un-hold करें?")) { b.disabled=false; return; }
      await httpsCallable(functions,"liftHold")({targetUid:uid});
      if(msg){msg.className="msg ok";msg.textContent="🔓 un-hold हो गया।";}
    }
    await loadTeamPanel(MYDESIG);
  }catch(e){
    b.disabled=false;
    if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e);}
  }
});

/* ═══ [P3] काम-पैनल + रिपोर्ट-चक्र ═══ */
const CYCLE_HI = {daily:"दैनिक",weekly:"साप्ताहिक",fortnightly:"पाक्षिक",monthly:"मासिक",quarterly:"त्रैमासिक",halfyearly:"अर्धवार्षिक",yearly:"वार्षिक"};
let TEAM_MEMBERS = [];
function fillMemberSelect(){
  const opts = TEAM_MEMBERS
    .filter(m=>String(m.designation||"").toLowerCase()!=="founder" && !(auth.currentUser && m._uid===auth.currentUser.uid))
    .map(m=>'<option value="'+esc(m._uid)+'">'+esc(m.name_local||m.name_roman||m.name||m.email||m._uid)+' — '+mxLabel(String(m.designation||"").toLowerCase())+'</option>').join("");
  const sel = $("tMem"); if(sel) sel.innerHTML = opts;
  const lv = $("lvMem"); if(lv) lv.innerHTML = opts; /* v1.4 छँटाई (समकक्ष/एक-ऊपर) server पर — यह सिर्फ़ सूची */
}
async function loadTasks(){
  const el = $("taskList"); if(!el) return;
  try{
    const qs = await getDocs(collection(db,"tasks"));
    const uid = auth.currentUser ? auth.currentUser.uid : "";
    let rows = []; qs.forEach(d=>{ const t=d.data(); t._id=d.id; rows.push(t); });
    rows.sort((a,b)=>((b.at&&b.at.toMillis)?b.at.toMillis():0)-((a.at&&a.at.toMillis)?a.at.toMillis():0));
    if(rows.length===0){ el.innerHTML='<span class="note">अभी कोई काम दर्ज नहीं।</span>'; return; }
    el.innerHTML = rows.map(t=>{
      const mine = (t.to===uid);
      const st = t.status||"pending";
      const stChip = st==="done" ? '<span class="chip appr">✅ पूरा</span>' : st==="ongoing" ? '<span class="chip prov">🔵 चालू</span>' : '<span class="chip off">⏳ pending</span>';
      const who = mine ? '(मुझे मिला)' : '(मैंने सौंपा → '+mxLabel(String(t.to_designation||"").toLowerCase())+')';
      const btns = (st!=="done")
        ? '<div class="acts">'
          + (st==="pending"?'<button class="abtn ok" data-tact="ongoing" data-tid="'+t._id+'">▶️ चालू करें</button>':'')
          + '<button class="abtn ok" data-tact="done" data-tid="'+t._id+'">✅ पूरा</button></div>'
        : '';
      return '<div class="mem"><div class="r1"><span class="nm">'+esc(t.title||"—")+'</span>'+stChip+'<span class="rg">'+who+'</span></div>'
        + (t.detail?'<div class="r2">'+esc(t.detail)+'</div>':'')
        + btns + '<div class="msg" id="tmsg-'+t._id+'"></div></div>';
    }).join("");
  }catch(e){ el.textContent="काम-सूची नहीं खुली — rules v4 deploy जाँचें। ("+(e.code||"")+")"; }
}
async function loadReports(){
  const el = $("repList"); if(!el) return;
  try{
    const qs = await getDocs(collection(db,"reports"));
    let rows=[]; qs.forEach(d=>{ const t=d.data(); rows.push(t); });
    rows.sort((a,b)=>((b.at&&b.at.toMillis)?b.at.toMillis():0)-((a.at&&a.at.toMillis)?a.at.toMillis():0));
    if(rows.length===0){ el.innerHTML='<span class="note">अभी कोई रिपोर्ट नहीं।</span>'; return; }
    el.innerHTML = rows.slice(0,20).map(t=>
      '<div class="mem"><div class="r1"><span class="pill">'+(CYCLE_HI[t.cycle]||t.cycle)+'</span>'
      +'<span class="rg">'+fmtDate(t.at)+' · '+mxLabel(String(t.by_designation||"").toLowerCase())+'</span></div>'
      +'<div class="r2">'+esc(t.text||"")+'</div></div>').join("");
  }catch(e){ el.textContent="रिपोर्टें नहीं खुलीं — rules v4 deploy जाँचें। ("+(e.code||"")+")"; }
}
document.addEventListener("click", async (ev)=>{
  const tb = ev.target.closest("[data-tact]");
  if(tb){
    const msg=$("tmsg-"+tb.getAttribute("data-tid"));
    tb.disabled=true;
    try{
      await httpsCallable(functions,"updateTaskStatus")({taskId:tb.getAttribute("data-tid"), status:tb.getAttribute("data-tact")});
      await loadTasks();
    }catch(e){ tb.disabled=false; if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e);} }
    return;
  }
  if(ev.target && ev.target.id==="tAssign"){
    const b=ev.target, msg=$("tMsg");
    const uid=$("tMem").value, title=($("tTitle").value||"").trim();
    if(!uid || !title){ msg.className="msg err"; msg.textContent="सदस्य व शीर्षक दोनों ज़रूरी।"; return; }
    b.disabled=true; msg.className="msg"; msg.textContent="सौंपा जा रहा है…";
    try{
      await httpsCallable(functions,"assignTask")({targetUid:uid, title:title});
      msg.className="msg ok"; msg.textContent="✅ काम सौंपा गया।"; $("tTitle").value="";
      await loadTasks();
    }catch(e){ msg.className="msg err"; msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e); }
    b.disabled=false; return;
  }
  if(ev.target && ev.target.id==="lvSet"){
    const b=ev.target, msg=$("lvMsg");
    const toUid=$("lvMem").value, until=$("lvUntil").value;
    if(!toUid || !until){ msg.className="msg err"; msg.textContent="प्रतिनिधि व अंतिम-तारीख़ दोनों ज़रूरी।"; return; }
    b.disabled=true; msg.className="msg"; msg.textContent="नियुक्त हो रहा है…";
    try{
      await httpsCallable(functions,"delegateLeave")({action:"set", toUid:toUid, until:until});
      msg.className="msg ok"; msg.textContent="🏖️ प्रतिनिधि नियुक्त — मियाद ख़त्म होते ही अधिकार अपने-आप वापस।";
      $("lvStatus").textContent="प्रतिनिधि नियुक्त ("+until+" तक)";
    }catch(e){ msg.className="msg err"; msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e); }
    b.disabled=false; return;
  }
  if(ev.target && ev.target.id==="lvCancel"){
    const b=ev.target, msg=$("lvMsg");
    if(!confirm("प्रतिनिधि हटाएँ? (जल्दी वापसी — अधिकार तुरंत आपके पास)")) return;
    b.disabled=true;
    try{
      await httpsCallable(functions,"delegateLeave")({action:"cancel"});
      msg.className="msg ok"; msg.textContent="↩️ प्रतिनिधि हटा — अधिकार वापस आपके पास।";
      $("lvStatus").textContent="कोई प्रतिनिधि नहीं";
    }catch(e){ msg.className="msg err"; msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e); }
    b.disabled=false; return;
  }
  if(ev.target && ev.target.id==="rSend"){
    const b=ev.target, msg=$("rMsg");
    const cycle=$("rCycle").value, text=($("rText").value||"").trim();
    if(!text){ msg.className="msg err"; msg.textContent="रिपोर्ट-सामग्री लिखें।"; return; }
    b.disabled=true; msg.className="msg"; msg.textContent="भेजी जा रही है…";
    try{
      await httpsCallable(functions,"submitReport")({cycle:cycle, text:text});
      msg.className="msg ok"; msg.textContent="📤 रिपोर्ट दर्ज — Founder तक (batch-दौर में उनके पैनल पर भी दिखेगी)।"; $("rText").value="";
      await loadReports();
    }catch(e){ msg.className="msg err"; msg.textContent="नहीं हुआ: "+(e&&e.message?e.message:e); }
    b.disabled=false; return;
  }
});

} /* team-engines end */

/* ═══ external-mode पहरा — registrations से (आवेदक-स्वयं rules-दायरा) ═══ */
async function guardExternal(user){
  let reg=null, t0=0;
  try{
    const qs = await getDocs(query(collection(db,"registrations"), where("authUid","==",user.uid)));
    qs.forEach(d=>{
      const r=d.data();
      if(r.status==="cancelled") return;
      const okRoles = EXT_ROLES.length ? EXT_ROLES : ALLOWED;
      if(okRoles.indexOf(String(r.role||"").toLowerCase())===-1) return;
      const t=(r.createdAt&&r.createdAt.toMillis)?r.createdAt.toMillis():0;
      if(!reg || t>t0){ reg=r; t0=t; }
    });
  }catch(e){ /* नीचे deny */ }
  if(!reg){ show("denyView"); return; }

  try{ await guardExternalRender(user, reg); }
  catch(e){ showLoadError("dashboard नहीं दिखा (बाहरी-role)", e); }
}

/* (19-Jul-2026, v3.5-घ) profile-भरने का पूरा हिस्सा अलग function में — पूरी तरह
   guardExternal की try-catch के भीतर चलता है; कोई भी अनपेक्षित data अब चुप्पी में
   नहीं दबेगा, दिखता संदेश देगी (गूँगा-fallback निषेध नियम, Laxmi-केस से सीखा)। */
async function guardExternalRender(user, reg){
  EXT_REG = reg;
  /* v4.1 (16-Jul-2026, काम-6): v1.3-(क) — प्रशिक्षु-roles का खाता सीधा चालू;
     उन पर न provisional-पर्दा, न "अस्थायी" pill (भ्रामक-संदेश होल बंद)। */
  const roleKey0 = String((reg.role)||ALLOWED[0]||"").toLowerCase();
  const noGate = (NO_GATEWAY_EXT.indexOf(roleKey0)>-1);
  const isActive = noGate ? true : (reg.status==="approved");
  if(!isActive) $("provBar").classList.add("on");
  setTxt("desigPill", ROLE_LABEL + (isActive ? "" : " (अस्थायी — जाँच में)"));

  const whoName = reg.name_local || reg.name_roman || reg.name || reg.fullName || (user.email||"");
  setTxt("pName", whoName);
  setTxt("pReg", reg.regNo || "—");
  setTxt("pLevel", ROLE_LABEL);
  const area = [reg.country, reg.state, (reg.rm_districts&&reg.rm_districts.join)?reg.rm_districts.join(", "):reg.rm_districts].filter(Boolean).join(" · ");
  setTxt("pArea", area || "—");
  setTxt("pEmail", reg.email || (user.email||"—"));
  setTxt("pPhone", reg.phone || reg.mobile || "—");
  setTxt("tbWho", "👤 " + whoName + " · " + (reg.regNo||ROLE_LABEL));
  $("tbWho").title = "UID: " + user.uid;
  window.ACS_REGNO = reg.regNo || "";   /* (29-Jul K2) badge-मॉड्यूल हेतु regNo साझा-याद */
  const ffD = reg.formFields || {};
  /* (29-Jul K3, Founder) गृह-जिला ख़ाली न रहे — क्रम: वांछित जिला → form-जिला → पिन-पता */
  const homeDistE = (reg.rm_districts && reg.rm_districts.length ? reg.rm_districts[0]
    : (ffD.desired_district || reg.desired_district || reg.district || ffD.district || ffD.pincode_address || ""));
  const pubAreaE = [reg.country, reg.state, (reg.rm_districts&&reg.rm_districts.join)?reg.rm_districts.join(", "):""].filter(Boolean).join(" · ");
  fillPubCard(whoName, reg.photo_public || regDocPhoto(reg), ROLE_LABEL, pubAreaE, homeDistE, reg.state||"");

  /* दस्तावेज़-chips */
  const docs = reg.documents || reg.docs || {};
  const wrap = $("docWrap"); wrap.innerHTML = docChips(docs);
  setTxt("docNote", Object.keys(docs).length ? "" : "आवेदन में कोई दस्तावेज़-link दर्ज नहीं।");

  /* (27-Jul, E1) असली 2-कदम स्थिति — status-कार्ड व approval-पैनल दोनों में।
     पुराना "अगले दौर में" वाक्य व UI पर कूट-नाम — दोनों होल बंद। */
  function twoStepHTML(r){
    const rv=(r&&r.rmVerify)||{};
    const s1 = rv.status==="verified"
        ? '<span style="color:#1b4d20;font-weight:700">✅ कदम-1: RM भौतिक-सत्यापन पूरा</span>'
      : rv.status==="failed"
        ? '<span style="color:#B71C1C;font-weight:700">❌ कदम-1: सत्यापन असफल</span>'+(rv.note?' — '+esc(rv.note)+' (सुधार कर दोबारा तैयार रहें)':'')
        : '<span style="color:#8a5a00;font-weight:700">⏳ कदम-1: RM भौतिक-सत्यापन बाक़ी</span>';
    let s2='<span class="note">कदम-2: अंतिम मुहर (आपके राज्य के ZM या Founder) — कदम-1 के बाद</span>';
    if(r && r.status==="approved") s2='<span style="color:#1b4d20;font-weight:800">🎉 कदम-2: स्वीकृत — सब काम-अधिकार खुले</span>';
    else if(r && r.status==="rejected"){
      const rj=(r.rejection&&r.rejection.reason)?(' — '+esc(r.rejection.reason)):'';
      s2='<span style="color:#B71C1C;font-weight:700">⚠️ कदम-2: अस्वीकृत'+rj+'</span>';
    }
    return '<div class="pd">'+s1+'</div><div class="pd">'+s2+'</div>';
  }
  if(NO_GATEWAY_EXT.includes(String(reg.role||"").toLowerCase())){
    /* (29-Jul होल-बंदी) प्रशिक्षु E1-मुक्त है — "RM-सत्यापन बाक़ी" दिखाना झूठा इंतज़ार था */
    const okLine='<div class="pd" style="font-weight:800;color:var(--green)">✅ आपका खाता चालू है — कोई जाँच बाक़ी नहीं। पढ़ाई शुरू कीजिए!</div>';
    setHTML("tlWrap", okLine); setHTML("stTwoStep", okLine);
    const w=$("tlWrap"); if(w && w.previousElementSibling && w.previousElementSibling.tagName==="H2") w.previousElementSibling.style.display="none";
  } else {
    const twoStep = twoStepHTML(reg);
    setHTML("tlWrap", twoStep);
    setHTML("stTwoStep", twoStep);
  }
  setTxt("tlNote", "");

  show("appView");
  initNav("ext");
  /* (19-Jul) बैज-निशान: engine का hook हो तो चलाओ — न हो तो चुप (गूँगा-fallback नहीं, वैकल्पिक-सजावट) */
  if(typeof window.__acsBadgeMark==="function"){ try{ window.__acsBadgeMark(); }catch(e){} }
  /* v4.1: role-इंजन (जैसे विद्यार्थी-इंजन) को reg सौंपो — hook न हो तो चुप */
  if(typeof window.__acsExtReady==="function"){ try{ window.__acsExtReady(reg); }catch(e){} }
  startSessionWatch(user);
  startIdleTimer();
}

/* ═══ single-session: sessions/{uid}.activeSession बदले तो logout ═══ */
async function startSessionWatch(user){
  let mySid = null;
  try{ mySid = localStorage.getItem("acs_sid"); }catch(e){}
  if(!mySid){
    try{
      const res = await httpsCallable(functions,"claimSession")({});
      mySid = res && res.data && res.data.sessionId;
      if(mySid){ try{ localStorage.setItem("acs_sid", mySid); }catch(e){} }
    }catch(e){ /* claim न हो पाए तो चुपचाप — पहरा server पर */ }
  }
  if(!mySid) return;
  onSnapshot(doc(db,"sessions",user.uid),(snap)=>{
    const d = snap.exists() ? snap.data() : null;
    if(d && d.activeSession && d.activeSession!==mySid){
      alert("आपने दूसरी जगह login किया — यह session बंद हो रहा है।");
      doLogout();
    }
  },()=>{ /* rules पढ़ने से रोकें तो चुप */ });
}

/* ═══ 10-मिनट auto-logout (screen-silent) ═══ */
let idleT=null;
function resetIdle(){ clearTimeout(idleT); idleT=setTimeout(()=>{ if(window.__acsVaniActive){ resetIdle(); return; } alert("10 मिनट से कोई हलचल नहीं — सुरक्षा के लिए logout।"); doLogout(); }, 10*60*1000); }
function startIdleTimer(){
  ["click","keydown","scroll","touchstart","mousemove"].forEach(ev=>document.addEventListener(ev,resetIdle,{passive:true}));
  resetIdle();
}

window.doLogout = async ()=>{ try{ await signOut(auth); }catch(e){} try{ localStorage.removeItem("acs_sid"); }catch(e){} location.href="/dashboard/index.html"; };

/* ═══════════════════════════════════════════════════════════════
   v4.2 (काम-6 चरण-1+2) — प्रशिक्षु-इंजन: तीनों प्रशिक्षु-घरों पर जागे
   (student · jobseeker · entrepreneur — NO_GATEWAY_EXT)।
   (1) Guardian-नोट (10-18 नियम) — reg.dob से उम्र गिनकर।
   (2) 📚 मुफ़्त कोर्स-सूची — /assets/courses_data.js आलसी-load (पैनल खुलने पर ही);
       url-नियम (v2.4-क8): url वाले कोर्स पर ही "पढ़ें" बटन — मरा पता कभी नहीं;
       scale-नियम (v1.8-ख2): 50-50 की खेप, "और देखें" से आगे;
       data की पुरानी चौकोर bracket-जोड़ी दिखाते समय गोल ( ) में बदले (लिपि-नियम)।
   ═══════════════════════════════════════════════════════════════ */
if (MODE==="external" && ALLOWED.length===1 && NO_GATEWAY_EXT.indexOf(ALLOWED[0])>-1) {
  const TRAINEE_ROLE = ALLOWED[0];

  window.__acsExtReady = function(reg){
    try{
      const d = new Date(String(reg.dob||""));
      if(isNaN(d.getTime())) return;
      const now = new Date();
      let age = now.getFullYear()-d.getFullYear();
      const m = now.getMonth()-d.getMonth();
      if(m<0 || (m===0 && now.getDate()<d.getDate())) age--;
      if(!(age>0 && age<18)) return;
      const el = $("stGuard");
      if(!el) return;
      el.style.display="block";
      if(TRAINEE_ROLE==="jobseeker"){
        el.textContent = "ℹ️ आपकी उम्र "+age+" साल है — job-तैयारी 16 साल से चलती है, पर असली job व joining 18 साल से। 16 से 18 पर प्रशिक्षण-कैंप व भ्रमण Guardian (अभिभावक) की सहमति से।";
      } else if(TRAINEE_ROLE==="entrepreneur"){
        el.textContent = "ℹ️ आपकी उम्र "+age+" साल है — 18 से पहले paid-सेवा, Industrial Tour व क़ानूनी काग़ज़ों पर Guardian (अभिभावक) की सहमति ज़रूरी है।";
      } else {
        el.textContent = "ℹ️ आपकी उम्र "+age+" साल है — paid-सेवा, workshop-कैंप व भ्रमण पर Guardian (अभिभावक) की सहमति ज़रूरी है (10-18 नियम)।";
      }
    }catch(e){}
  };

  let CRS_LOADED=false, CRS_ALL=[], CRS_SHOWN=0;
  const CRS_PAGE=50; /* scale-नियम: 50-50 खेप */
  const noSq = (t)=>String(t||"").split("[").join("(").split("]").join(")");

  function crsCollect(){
    /* courses_data.js की चार सूचियाँ — जो मौजूद हों वही (data बदले तो अपने-आप) */
    const G=[["🌱 स्वरोजगार कोर्स", (typeof SELF_EMP_COURSES!=="undefined")?SELF_EMP_COURSES:[]],
             ["🏢 प्राइवेट नौकरी कोर्स", (typeof PRIVATE_JOB_COURSES!=="undefined")?PRIVATE_JOB_COURSES:[]],
             ["🏘️ स्थानीय नौकरी कोर्स", (typeof LOCAL_JOB_COURSES!=="undefined")?LOCAL_JOB_COURSES:[]],
             ["🏛️ सरकारी तैयारी कोर्स", (typeof GOVT_JOB_COURSES!=="undefined")?GOVT_JOB_COURSES:[]]];
    CRS_ALL=[]; G.forEach(g=>{ (g[1]||[]).forEach(c=>CRS_ALL.push({g:g[0], c:c})); });
  }

  function crsDrawMore(){
    const box=$("crsList"); if(!box) return;
    if(CRS_SHOWN===0) box.innerHTML="";
    const old=$("crsMoreWrap"); if(old) old.remove();
    let lastG = CRS_SHOWN>0 ? CRS_ALL[CRS_SHOWN-1].g : "";
    const end = Math.min(CRS_SHOWN+CRS_PAGE, CRS_ALL.length);
    for(let i=CRS_SHOWN;i<end;i++){
      const it=CRS_ALL[i], c=it.c;
      if(it.g!==lastG){
        lastG=it.g;
        const h=document.createElement("div");
        h.className="ph"; h.style.marginTop="12px"; h.textContent=it.g;
        box.appendChild(h);
      }
      const row=document.createElement("div");
      row.className="crscard"; row.style.display="inline-block"; row.style.width="min(260px,100%)"; row.style.margin="6px"; row.style.verticalAlign="top";
      const meta=[c.duration?("⏱️ "+noSq(c.duration)):"", c.lessons?("📄 "+c.lessons+" पाठ"):"",
        "🗣️ हिंदी","📴 पढ़े पाठ offline भी"].filter(Boolean).join(" · ");
      const right = c.url
        ? '<a class="abtn ok" style="display:inline-block;text-decoration:none" href="'+c.url+'">📖 पढ़ें (मुफ़्त)</a>'
        : '<span class="note" style="margin-top:0">पाठ जल्द जुड़ेंगे</span>';
      row.innerHTML = '<div class="crsban">📚</div><div class="crsbody">'+
        '<div class="crsname">'+noSq(c.name_hi||c.name_en||"—")+'</div>'+
        '<div class="crsmeta">'+meta+'</div>'+
        (c.url?'<a class="crsgo" href="'+c.url+'">▶ पढ़ें — मुफ़्त</a> '+
          '<button class="abtn" type="button" data-enroll="'+c.id+'" style="margin-top:6px">➕ मेरी पढ़ाई में जोड़ें</button>'
          :'<span class="note">पाठ जल्द जुड़ेंगे</span>')+
        '</div>';
      box.appendChild(row);
    }
    CRS_SHOWN=end;
    const w=document.createElement("div"); w.id="crsMoreWrap";
    if(CRS_SHOWN<CRS_ALL.length){
      const mb=document.createElement("button");
      mb.className="abtn ok"; mb.style.background="var(--blue)"; mb.style.marginTop="10px";
      mb.textContent="⬇️ और कोर्स देखें ("+(CRS_ALL.length-CRS_SHOWN)+" बाक़ी)";
      mb.addEventListener("click", crsDrawMore);
      w.appendChild(mb);
    } else {
      const nt=document.createElement("div"); nt.className="note";
      nt.textContent="कुल "+CRS_ALL.length+" कोर्स — सूची पूरी। नए कोर्स जुड़ते ही यहीं दिखेंगे।";
      w.appendChild(nt);
    }
    box.appendChild(w);
  }

  /* ── (29-Jul, Founder) 📖 मेरी पढ़ाई: प्रगति-मीटर + परीक्षा-सीढ़ी ──
     प्रगति device-local (acs_learn_progress); परीक्षा/result/प्रमाणपत्र-इंजन (काम-10)
     बनने तक: परीक्षा-निवेदन = असली WhatsApp-रास्ता; प्रमाणपत्र-कड़ी result तक ताले में
     (ईमानदार-पैनल नियम — मरा बटन नहीं)। */
  /* (30-Jul तुरंत-1) स्थायी-इनरोल: ➕ से जुड़ा कोर्स हमेशा दिखे + जुड़ने-तारीख़ */
  function enrGet(){ try{ return JSON.parse(localStorage.getItem("acs_my_courses")||"{}"); }catch(e){ return {}; } }
  function enrAdd(id){ const E=enrGet(); if(!E[id]) E[id]={at:Date.now()};
    localStorage.setItem("acs_my_courses", JSON.stringify(E)); }
  /* (30-Jul तुरंत-2) कोर्स खोलते ही वापसी-पता याद — पाठ-पन्ने का "↩ मेरा पैनल" यही पढ़ेगा */
  document.addEventListener("click", function(ev){
    const a=ev.target.closest('a[href^="/courses/"]'); if(!a) return;
    try{ localStorage.setItem("acs_back_home", location.pathname); }catch(e){}
  });
  document.addEventListener("click", function(ev){
    const b=ev.target.closest("[data-enroll]"); if(!b) return;
    enrAdd(b.getAttribute("data-enroll"));
    b.outerHTML='<span class="crsstep on">✅ जुड़ गया</span>';
    crsMineFill();
  });
  async function crsMineFill(){
    const bx=$("crsMine"); if(!bx) return;
    await loadExamState();
    let d={}; try{ d=JSON.parse(localStorage.getItem("acs_learn_progress")||"{}"); }catch(e){}
    const read=d.read||{}, byC={};
    for(const k in read){ const m=String(k).match(/^(\/courses\/[a-z]{2}\/[a-z0-9-]+\/)/); if(m) byC[m[1]]=(byC[m[1]]||0)+1; }
    const ENR=enrGet(); const mine=[];
    CRS_ALL.forEach(function(x){ const c=x&&x.c; if(!c) return;
      const started = c.url && byC[c.url];
      if(started && !ENR[c.id]) enrAdd(c.id);
      if(enrGet()[c.id] || started) mine.push({c:c, n:(c.url&&byC[c.url])||0, at:(enrGet()[c.id]||{}).at||Date.now()}); });
    const doneN=mine.filter(function(m){var t=Number(m.c.lessons)||0;return t&&m.n>=t;}).length;
    const certN=Object.keys(CERT_BY).length;
    /* LearnVern-शैली हल्की सारांश-पट्टी: सफ़ेद card, रंग सिर्फ़ अंकों में */
    const sumBar='<div class="lvsum">'+
      '<div class="lvstat"><div class="lvnum" style="color:var(--blue)">'+mine.length+'</div><div class="lvlbl">शुरू किए</div></div>'+
      '<div class="lvstat"><div class="lvnum" style="color:var(--green)">'+doneN+'</div><div class="lvlbl">पूरे</div></div>'+
      '<div class="lvstat"><div class="lvnum" style="color:var(--gold)">'+certN+'</div><div class="lvlbl">📜 प्रमाणपत्र</div></div></div>';
    if(!mine.length){ bx.innerHTML=sumBar+'<div class="pd">अभी कोई कोर्स शुरू नहीं — नीचे 🟢 सूची से "➕ जोड़ें" या पहला पाठ खोलिए।</div>'; return; }
    /* (30-Jul होल-2, Founder) 📊 कोर्स-प्रगति ग्राफ — हर कोर्स की % पट्टी;
       नीला=चालू, हरा=पूरा (रंग-अनुशासन); सब center। */
    let graph='<div class="crsgraph"><div class="cgh">📊 कोर्स प्रगति ग्राफ</div>';
    mine.slice(0,10).forEach(function(m){
      var t=Number(m.c.lessons)||0, pc=t?Math.min(100,Math.round(m.n*100/t)):0, dn=(t&&m.n>=t);
      graph+='<div class="cgrow"><div class="cgname">'+esc(rb(m.c.name_hi||m.c.id))+'</div>'+
        '<div class="cgbar'+(dn?' done':'')+'"><i style="width:'+Math.max(pc,4)+'%"></i>'+
        '<span class="cgpc">'+pc+'%'+(dn?' 🏆':'')+'</span></div></div>';
    });
    graph+='</div>';
    let h=sumBar+graph;
    mine.forEach(function(m){
      const tot=Number(m.c.lessons)||0, pc=tot?Math.min(100,Math.round(m.n*100/tot)):0, done=(tot&&m.n>=tot);
      const bank=(window.COURSE_EXAMS||{})[m.c.id];
      const canExam=bank && m.n>=bank.minLessons;
      const res=EXAM_RES[m.c.id]||null, cert=res?CERT_BY[res.id]:null;
      let act='';
      if(cert) act='<button class="lvbtn gold" type="button" data-certdl=\''+esc(JSON.stringify({certNo:cert.certNo,name:cert.name,courseName:cert.courseName,courseId:cert.courseId,pct:cert.pct}))+'\'>🖨️ प्रमाणपत्र</button>';
      else if(res) act='<button class="lvbtn green" type="button" data-cert="'+esc(res.id)+'">📜 प्रमाणपत्र लें ₹125</button>';
      else if(done||canExam) act='<button class="lvbtn blue" type="button" data-exam="'+esc(m.c.id)+'">🎓 परीक्षा दें</button>';
      if(!done) act+=' <a class="lvbtn blue" style="text-decoration:none" href="'+esc(m.c.url)+'">▶ जारी रखें</a>';
      h+='<div class="lvrow"><div class="lvic">'+(done?'🏆':'📚')+'</div>'+
        '<div class="lvmain"><div class="lvname">'+esc(rb(m.c.name_hi||m.c.id))+'</div>'+
        '<div class="lvsub">📅 जुड़े: '+new Date(m.at).toLocaleDateString("hi-IN")+' · '+m.n+(tot?(' / '+tot):'')+' पाठ'+
        (res?(' · 📄 result: '+res.pct+'%'):'')+(cert?(' · 📜 '+cert.certNo):'')+'</div>'+
        '<div class="lvbar"><i style="width:'+pc+'%"></i></div>'+
        '<div class="lvpct">'+pc+'% पूरा'+(canExam&&!res?' · 🎓 परीक्षा खुली है':'')+'</div></div>'+
        '<div class="lvact">'+act+'</div></div>'+
        '<div id="exWrap_'+esc(m.c.id)+'" style="display:none"></div>';
    });
    bx.innerHTML=h;
  }
  /* 🧭 रिपोर्ट के कोर्स — आख़िरी अभिरुचि-रिपोर्ट से */
  function crsReportFill(){
    const bx=$("crsReport"); if(!bx) return;
    let ap={}; try{ ap=JSON.parse(localStorage.getItem("acs_apt_sess_v1")||"{}"); }catch(e){}
    const P=ap.prev;
    if(!P||!P.udy||!P.udy.length){ bx.innerHTML='<div class="pd">रिपोर्ट अभी नहीं बनी — 🧭 अभिरुचि-टेस्ट दीजिए, आपके मन के कोर्स यहीं दिखेंगे।</div>'; return; }
    let h='<div class="pd">⭐ '+P.mg.map(function(m2){return '<span class="chip appr">'+esc(m2)+'</span>';}).join(' ')+'</div>';
    P.udy.slice(0,5).forEach(function(u,i){
      h+='<div class="lrow"><span class="nm">'+(i+1)+'. '+esc(u.nm)+'</span> '+
        (u.c?'<a class="abtn ok" style="text-decoration:none" href="'+esc(u.c)+'">📚 पढ़ें</a>'
            :'<a class="abtn2" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/919431210092?text='+
             encodeURIComponent('मुझे यह कोर्स चाहिए: '+u.nm)+'">📲 कोर्स माँगें</a>')+'</div>';
    });
    bx.innerHTML=h;
  }
  /* 🏫 मेरे केंद्र के कोर्स — नामांकन-खाते से झलक; पूरा ब्योरा "मेरा केंद्र" में */
  async function crsCenterFill(){
    const bx=$("crsCenter"); if(!bx) return;
    try{
      const u=auth.currentUser; if(!u){ bx.innerHTML=''; return; }
      const qs=await getDocs(query(collection(db,"enrollments"), where("studentUid","==",u.uid)));
      let h=''; const ST={requested:"⏳ निवेदन भेजा",offered:"✉️ केंद्र का प्रस्ताव — जवाब दें",active:"✅ पढ़ाई चालू"};
      qs.forEach(function(dd){ const x=dd.data()||{};
        if(!ST[x.status]) return;
        h+='<div class="lrow"><span class="nm">'+esc(rb(x.courseName||x.courseId||""))+'</span> '+
          '<span class="note">🏫 '+esc(x.centerName||"")+' · '+ST[x.status]+'</span></div>';
      });
      bx.innerHTML = h ? (h+'<div class="note">फीस-रसीदें व पूरा ब्योरा — "🏫 मेरा केंद्र" पैनल में।</div>')
        : '<div class="pd">अभी किसी केंद्र में नामांकन नहीं — "🏫 मेरा केंद्र" पैनल से नज़दीकी केंद्र खोजिए।</div>';
    }catch(e){ bx.innerHTML='<span class="note" style="color:#B71C1C">केंद्र-सूची नहीं खुली: '+esc((e&&e.message)||e)+'</span>'; }
  }
  /* ── (30-Jul, रास्ता-1) 🎓 परीक्षा → 📄 result → 📜 ₹125 प्रमाणपत्र ── */
  let EXAM_RES={}, CERT_BY={};
  async function loadExamState(){
    EXAM_RES={}; CERT_BY={};
    try{ const u=auth.currentUser; if(!u) return;
      const rs=await getDocs(query(collection(db,"examResults"), where("uid","==",u.uid)));
      rs.forEach(d=>{ const x=d.data()||{}; const k=x.courseId;
        const t=x.at&&x.at.toMillis?x.at.toMillis():0;
        if(x.pass && (!EXAM_RES[k]||t>EXAM_RES[k]._t)) EXAM_RES[k]=Object.assign({_t:t,id:d.id},x); });
      const cs=await getDocs(query(collection(db,"certificates"), where("uid","==",u.uid)));
      cs.forEach(d=>{ const x=d.data()||{}; CERT_BY[x.resultId]=x; });
    }catch(e){}
  }
  function examBox(cid,bank){
    let h='<div class="pd" style="text-align:left"><b>'+esc(bank.name)+'</b> · pass = '+bank.pass+'%</div>';
    bank.q.forEach(function(qq,i){
      h+='<div class="pd" style="text-align:left"><b>'+(i+1)+'.</b> '+esc(qq.t)+'<br>';
      qq.o.forEach(function(op,j){ h+='<label style="display:block;margin:4px 0"><input type="radio" name="ex_'+i+'" value="'+j+'"> '+esc(op)+'</label>'; });
      h+='</div>'; });
    h+='<button class="crsgo" id="exSubmit" data-exid="'+cid+'" type="button">📨 जमा करें</button><div class="note" id="exMsg"></div>';
    return h;
  }
  document.addEventListener("click", async function(ev){
    const eb=ev.target.closest("[data-exam]");
    if(eb){ const cid=eb.getAttribute("data-exam"); const bx=$("exWrap_"+cid);
      if(bx){ bx.style.display=""; bx.innerHTML=examBox(cid, window.COURSE_EXAMS[cid]); } return; }
    const sb=ev.target.closest("#exSubmit");
    if(sb){ const cid=sb.getAttribute("data-exid"); const bank=window.COURSE_EXAMS[cid];
      const ans=[]; let miss=false;
      bank.q.forEach(function(_,i){ const r=document.querySelector('input[name="ex_'+i+'"]:checked');
        if(!r) miss=true; ans.push(r?Number(r.value):-1); });
      const m=$("exMsg");
      if(miss){ if(m) m.textContent="हर प्रश्न का जवाब चुनें।"; return; }
      sb.disabled=true; if(m) m.textContent="⏳ जाँच हो रही है…";
      try{ const out=await httpsCallable(functions,"submitCourseExam")({courseId:cid, answers:ans});
        const d=out.data||{};
        if(m) m.innerHTML=(d.pass?'🎉 <b>पास!</b> ':'😔 इस बार नहीं — दोबारा दे सकते हैं। ')+
          'अंक: '+d.score+'/'+d.total+' ('+d.pct+'%)';
        await loadExamState(); setTimeout(function(){ crsMineFill(); },1200);
      }catch(e){ if(m) m.textContent="त्रुटि: "+((e&&e.message)||e); sb.disabled=false; }
      return; }
    const cb=ev.target.closest("[data-cert]");
    if(cb){ const rid=cb.getAttribute("data-cert"); cb.disabled=true;
      try{ const o=await httpsCallable(functions,"createCourseCertOrder")({resultId:rid});
        await loadRazorpay();
        const rz=new window.Razorpay({ key:o.data.keyId, order_id:o.data.orderId, amount:o.data.amount,
          name:"ACS प्रमाणपत्र", description:"कोर्स-परीक्षा प्रमाणपत्र ₹125",
          handler:async function(rsp){
            try{ const v=await httpsCallable(functions,"verifyCourseCertPayment")({
                orderId:rsp.razorpay_order_id, paymentId:rsp.razorpay_payment_id, signature:rsp.razorpay_signature });
              alert("📜 प्रमाणपत्र बना! नंबर: "+v.data.certNo);
              await loadExamState(); crsMineFill();
            }catch(e2){ alert("verify-त्रुटि: "+((e2&&e2.message)||e2)); cb.disabled=false; } } });
        rz.open();
      }catch(e){ alert("cert-order त्रुटि: "+((e&&e.message)||e)); cb.disabled=false; } return; }
    const db2=ev.target.closest("[data-certdl]");
    if(db2){ certDraw(JSON.parse(db2.getAttribute("data-certdl"))); return; }
  });
  function certDraw(c){
    const cv=document.createElement("canvas"); cv.width=1000; cv.height=700;
    const x=cv.getContext("2d");
    x.fillStyle="#F5F7FA"; x.fillRect(0,0,1000,700);
    x.strokeStyle="#F9A825"; x.lineWidth=14; x.strokeRect(20,20,960,660);
    x.strokeStyle="#0B1F3A"; x.lineWidth=3; x.strokeRect(42,42,916,616);
    x.fillStyle="#0B1F3A"; x.textAlign="center";
    x.font="800 34px 'Noto Sans Devanagari',sans-serif";
    x.fillText("अप्लाइड कंप्यूटर स्कूल™ · FFGPMTrust",500,110);
    x.font="800 44px 'Noto Sans Devanagari',sans-serif"; x.fillStyle="#1565C0";
    x.fillText("Online कोर्स-पूर्णता प्रमाणपत्र",500,180);
    x.fillStyle="#0B1F3A"; x.font="700 26px 'Noto Sans Devanagari',sans-serif";
    x.fillText("प्रमाणित किया जाता है कि",500,240);
    x.font="800 40px 'Noto Sans Devanagari',sans-serif"; x.fillStyle="#2E7D32";
    x.fillText(c.name||"—",500,300);
    x.fillStyle="#0B1F3A"; x.font="700 26px 'Noto Sans Devanagari',sans-serif";
    x.fillText("ने यह online परीक्षा "+c.pct+"% अंकों से पास की:",500,350);
    x.font="800 30px 'Noto Sans Devanagari',sans-serif";
    x.fillText(c.courseName||c.courseId,500,400);
    x.font="700 24px 'Noto Sans Devanagari',sans-serif"; x.fillStyle="#B71C1C";
    x.fillText("(इन्होंने अभी तक प्रैक्टिकल नहीं किया है।)",500,450);
    x.fillStyle="#0B1F3A"; x.font="700 22px monospace";
    x.fillText("प्रमाणपत्र नं: "+c.certNo+" · तिथि: "+new Date().toLocaleDateString("hi-IN"),500,510);
    x.font="700 20px 'Noto Sans Devanagari',sans-serif"; x.fillStyle="#4a5a70";
    x.fillText("verify: acslearn.com (QR अगले दौर में) · From Village to World 🌍",500,560);
    const a=document.createElement("a"); a.download=c.certNo+".png"; a.href=cv.toDataURL("image/png"); a.click();
  }
  LAZY["pnl-courses"] = function(){
    if(CRS_LOADED) return; CRS_LOADED=true;
    const box=$("crsList"); if(box) box.innerHTML='<span class="note">कोर्स-सूची आ रही है…</span>';
    /* (30-Jul) एक-दरवाज़ा loader — दो script-tag का const-crash बंद */
    ensureCoursesData(function(okLoad){
      if(!okLoad){ CRS_LOADED=false; if(box) box.innerHTML='<span class="note" style="color:#B71C1C">कोर्स-सूची नहीं खुली — network जाँचकर पैनल दोबारा खोलें।</span>'; return; }
      crsCollect();
      /* (29-Jul, Founder — "मेरे कोर्स" शानदार-रूप) 🟢 खंड = सिर्फ़ जीवित (url वाले) कोर्स */
      CRS_ALL = CRS_ALL.filter(function(x){ return x && x.c && x.c.url; });   /* तत्व = {g,c} लिफ़ाफ़ा */
      if(CRS_ALL.length===0){ if(box) box.innerHTML='<span class="note">पाठ वाले कोर्स अभी जुड़ रहे हैं।</span>'; }
      else { CRS_SHOWN=0; crsDrawMore(); }
      crsMineFill(); crsReportFill(); crsCenterFill();
    });
  };

} /* प्रशिक्षु-इंजन end */

/* ═══════════════════════════════════════════════════════════════
   (काम-11+, 19-Jul-2026 Founder-आदेश) साझा बैज-इंजन — बैज-योग्य हर भूमिका पर
   (jobseeker · teacher · ustad · counselor · center · workshop · foreign_agent ·
   finance_mitra · vendor)। प्रवाह: बटन → createBadgeOrder (server भूमिका+पिन से
   tier व रक़म तय करे; शिक्षक/उस्ताद/सलाहकार पर उम्र-fee भी server जोड़े) → पुष्टि
   (30% जाँच-शुल्क खुलासा) → Razorpay checkout → verifyBadgePayment → status।
   रक़म client कभी तय नहीं करता। पैनल जिस पेज पर नहीं, वहाँ यह इंजन चुप रहता है।
   ═══════════════════════════════════════════════════════════════ */
if (MODE==="external" && ALLOWED.length>=1) {
  const BADGE_ROLE = String(ALLOWED[0]||"").toLowerCase();
  const IS_GOLD = (BADGE_ROLE === "student");   /* v3.7 काम-5: Golden — पिन/tier/RM-क़तार लागू नहीं */
  const TIER_HI = { village:"गाँव", town:"क़स्बा", metro:"महानगर" };

  function loadRazorpay(){
    return new Promise((res,rej)=>{
      if(window.Razorpay){ res(); return; }
      const s=document.createElement("script");
      s.src="https://checkout.razorpay.com/v1/checkout.js";
      s.onload=()=>res(); s.onerror=()=>rej(new Error("भुगतान-पृष्ठ नहीं खुला — network जाँचें"));
      document.body.appendChild(s);
    });
  }
  function pinFromReg(){
    try{
      const a=String((EXT_REG&&EXT_REG.formFields&&EXT_REG.formFields.address)||"");
      let m=a.match(/PIN:\s*(\d{6})/); if(!m) m=a.match(/(\d{6})(?!.*\d)/);
      return m?m[1]:"";
    }catch(e){ return ""; }
  }

  async function loadBadgeStatus(){
    const st=$("badgeStatus"), btn=$("badgeBuyBtn");
    if(!st||!btn) return;
    /* registration में पता/पिन न हो (प्रशिक्षु-roles में खाना ही नहीं) → पिन-खाना दिखाओ */
    if(!IS_GOLD && !pinFromReg()){ const pr=$("badgePinRow"); if(pr) pr.style.display="block"; }
    try{
      const u=auth.currentUser; if(!u) return;
      const qs=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
      let latest=null,t0=0;
      qs.forEach(d=>{ const p=d.data(); if(p.purpose!=="badge") return;
        if(String(p.role||"jobseeker").toLowerCase()!==BADGE_ROLE) return;
        const t=(p.createdAt&&p.createdAt.toMillis)?p.createdAt.toMillis():0;
        if(!latest||t>t0){ latest=p; t0=t; } });
      if(latest && latest.status==="paid" && latest.rmStatus==="approved"){
        let till="";
        try{ const ex=latest.badgeExpiresAt&&latest.badgeExpiresAt.toDate?latest.badgeExpiresAt.toDate():null;
             if(ex) till=" ("+("0"+ex.getDate()).slice(-2)+"-"+("0"+(ex.getMonth()+1)).slice(-2)+"-"+ex.getFullYear()+" तक)"; }catch(e){}
        st.textContent=(IS_GOLD?"🏅 आपका Student Golden Badge सक्रिय है":"✅ इस भूमिका का आपका बैज सक्रिय है")+till+"।";
        st.style.color=IS_GOLD?"#8a5a00":"#1b4d20"; btn.style.display="none";
        /* v4.9 (Founder-टोक, 27-Jul): बैज सक्रिय ⇒ "RM जाँचेंगे/30%" वाला भुगतान-पूर्व
           नोट अब भ्रामक — छिपाओ (null-सुरक्षित; rejected/नए-आवेदक पर दिखा रहता है)। */
        { const rn=$("badgeRmNote"); if(rn) rn.style.display="none"; }
        markPhotoBadge(latest); setAptGate(latest);
        const pr=$("badgePinRow"); if(pr) pr.style.display="none"; return;
      }
      if(latest && latest.status==="paid"){
        st.textContent=IS_GOLD?"⏳ भुगतान की पुष्टि हो रही है — कुछ पल में Golden Badge सक्रिय दिखेगा।"
                              :"⏳ भुगतान हो चुका — RM-सत्यापन जारी है। स्वीकृति पर बैज सक्रिय हो जाएगा।";
        st.style.color="#8a5a00"; btn.style.display="none"; clearAptGate(); return;
      }
      if(latest && latest.rmStatus==="rejected"){
        st.textContent="⚠️ पिछला बैज-आवेदन अस्वीकृत हुआ था — आप दोबारा ले सकते हैं।";
        st.style.color="#B71C1C"; btn.style.display="inline-block"; clearAptGate(); return;
      }
      st.textContent="अभी इस भूमिका में आपका बैज नहीं है (लेना वैकल्पिक)।"; st.style.color="#555";
      btn.style.display="inline-block"; clearAptGate();
    }catch(e){
      /* status न मिले (rules/network) तो भी बटन दिखे — काम न रुके */
      st.textContent="बैज लेना वैकल्पिक है।"; st.style.color="#555"; btn.style.display="inline-block";
    }
  }
  LAZY["pnl-badge"] = function(){ loadBadgeStatus(); loadMyReferrals(); };

  /* ═══ काम-8 (27-Jul): मेरे referral — record-मात्र (1-अ); gift-योग्य ═══ */
  async function loadMyReferrals(){
    const codeEl=$("myRefCode"), qEl=$("refQuota"), list=$("refList");
    /* (30-Jul LearnVern-2) link+Copy+Share — code अपने-आप भरकर पहुँचे */
    function refShareUI(code){
      if(!codeEl || document.getElementById("refLinkBox")) return;
      const link=location.origin+"/join.html?ref="+code;
      const d=document.createElement("div"); d.id="refLinkBox";
      d.innerHTML='<div class="pd" style="word-break:break-all"><b>🔗 आपका link:</b> <span id="refLinkTxt">'+link+'</span></div>'+
        '<button class="abtn" type="button" id="refCopyBtn">📋 Copy</button> '+
        '<a class="abtn ok" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text='+
        encodeURIComponent("ACS में मुफ़्त पढ़ाई! मेरे link से जुड़ो: "+link)+'">🟢 WhatsApp पर भेजें</a>'+
        '<span class="note" id="refCopyMsg"></span>';
      codeEl.parentNode && codeEl.parentNode.insertBefore(d, codeEl.nextSibling);
      d.querySelector("#refCopyBtn").onclick=function(){
        try{ navigator.clipboard.writeText(link);
          document.getElementById("refCopyMsg").textContent=" ✅ copy हो गया"; }catch(e){} };
    }
    if(!list) return;
    try{
      const u=auth.currentUser; if(!u) return;
      /* code = अपना regNo — सक्रिय बैज पर ही बताओ (referral-अधिकार की शर्त) */
      let hasBadge=false;
      try{
        const qs0=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
        const now=Date.now();
        qs0.forEach(d=>{ const p=d.data()||{};
          if(p.purpose==="badge"&&p.status==="paid"&&p.rmStatus==="approved"){
            const ex=p.badgeExpiresAt&&p.badgeExpiresAt.toMillis?p.badgeExpiresAt.toMillis():0;
            if(ex>now) hasBadge=true; } });
      }catch(e){}
      if(codeEl) codeEl.textContent = hasBadge ? ((EXT_REG&&EXT_REG.regNo)||"—")
                                               : "— (सक्रिय बैज पर मिलेगा)";
      refShareUI((window.ACS_REGNO||codeEl.textContent||"").trim());
      const mine=await getDocs(query(collection(db,"referrals"), where("refBy","==",u.uid)));
      const gifts=await getDocs(query(collection(db,"referrals"), where("giftedToUid","==",u.uid)));
      const now2=Date.now(); let act=0, rows=[];
      window.__myRefDocs=[];   /* (29-Jul N3) जीवन-graph हेतु referral-तिथियाँ */
      mine.forEach(function(d){ const x=d.data()||{};
        const t=x.createdAt&&x.createdAt.toMillis?x.createdAt.toMillis():0; if(t) window.__myRefDocs.push(t); });
      mine.forEach(d=>{ const x=d.data()||{};
        const ex=x.expiresAt&&x.expiresAt.toMillis?x.expiresAt.toMillis():0;
        if(ex>now2) act++;
        rows.push({id:d.id,x:x,mine:true}); });
      gifts.forEach(d=>{ const x=d.data()||{}; if(x.refBy===u.uid) return;
        rows.push({id:d.id,x:x,mine:false}); });
      if(qEl) qEl.textContent = (BADGE_ROLE==="volunteer") ? (act+" (असीमित)") : (act+" / 3");
      /* (29-Jul रात, Founder — जीवन-graph) 3 slot: हुआ ✔ / चालू ▶ / जला ✖ / आगे ⬜ */
      if(qEl && BADGE_ROLE!=="volunteer"){
        let wn=document.getElementById("refWkNote");
        if(!wn){ wn=document.createElement("div"); wn.id="refWkNote";
          qEl.parentNode && qEl.parentNode.appendChild(wn); }
        const rc = (typeof refClock==="function") ? refClock() : null;
        const usedWk = {};
        try{
          const from = BADGE_INFO && BADGE_INFO.from;
          if(from && window.__myRefDocs) window.__myRefDocs.forEach(function(t){
            const w = Math.floor((t - from)/(7*24*60*60*1000)) + 1;
            if(w>=1 && w<=3) usedWk[w]=1; });
        }catch(e){}
        function seg(w){
          const cur = rc && !rc.over && rc.wk===w;
          const past = rc ? (rc.over || rc.wk>w) : false;
          const st = usedWk[w] ? "✔ हुआ" : (cur ? "▶ चालू" : (past ? "✖ जला" : "⬜ आगे"));
          const bg = usedWk[w] ? "#2E7D32" : (cur ? "#F9A825" : (past ? "#9aa7b8" : "#e8edf4"));
          const fg = (usedWk[w]||cur) ? "#fff" : "#0B1F3A";
          return '<span style="display:inline-block;min-width:96px;text-align:center;padding:7px 8px;'+
            'border-radius:10px;margin:3px;font-weight:800;background:'+bg+';color:'+fg+'">हफ़्ता-'+w+'<br>'+st+'</span>';
        }
        let h='<div style="margin-top:8px"><b>🤝 referral-जीवन (सिर्फ़ पहले 3 सप्ताह · 1 हफ़्ता = 1 referral):</b><br>'+
          seg(1)+seg(2)+seg(3)+'</div>';
        if(rc && !rc.over) h+='<div class="note">⏳ इस हफ़्ते का slot: '+(usedWk[rc.wk]?'हो चुका ✔':('बचा है — '+rc.dWk+' दिन'))+
          ' · पूरी खिड़की का बचा समय: '+rc.dWin+' दिन</div>';
        if(rc && rc.over) h+='<div class="note">referral-समय (बैज के पहले 3 सप्ताह) पूरा हो चुका है।</div>';
        wn.innerHTML=h;
      }
      /* (29-Jul, Founder बिंदु-2) पहचान-स्तंभ की referral-पंक्ति में उपयोग-गिनती भी */
      const pr=$("pubRef");
      if(pr && pr.textContent && pr.textContent!=="—")
        pr.textContent += (BADGE_ROLE==="volunteer") ? (" · "+act+" (असीमित)") : (" · "+act+" / 3");
      if(!rows.length){ list.innerHTML='<span class="note">अभी कोई referral-प्रविष्टि नहीं। भुगतान-चक्र: हर fund का पैसा 7 कार्य-दिवस नियम से office भेजता है।</span>'; return; }
      let h="";
      rows.forEach(r=>{ const x=r.x;
        const ex=x.expiresAt&&x.expiresAt.toDate?x.expiresAt.toDate():null;
        const till=ex?(("0"+ex.getDate()).slice(-2)+"-"+("0"+(ex.getMonth()+1)).slice(-2)+"-"+ex.getFullYear()):"—";
        const st=x.status==="paid"?'<span style="color:#1b4d20;font-weight:700">✅ भुगतान हुआ</span>'
                                  :'<span style="color:#8a5a00;font-weight:700">⏳ बाक़ी (7-कार्यदिवस चक्र)</span>';
        h+='<div class="pd" style="border:1px solid #dbe3ee;border-radius:10px;padding:10px;margin:6px 0">'+
           (r.mine?'':'🎁 <b>आपको gift मिला</b> — ')+
           '₹'+Math.round((x.amountPaise||0)/100)+' · नई भूमिका: '+esc(x.newRole||"—")+
           ' · '+st+' · अवधि: '+till+' तक'+
           (x.giftedToRegNo?(' · 🎁 gift → '+esc(x.giftedToRegNo)):'')+
           (r.mine&&x.status==="due"&&!x.giftedToRegNo?(' <button class="abtn ok" data-refgift="'+esc(r.id)+'" type="button" style="padding:4px 10px">🎁 इसे gift करें</button>'):'')+
           '</div>';
      });
      list.innerHTML=h;
    }catch(e){
      list.innerHTML='<span class="note" style="color:#B71C1C">referral-सूची नहीं खुली: '+esc((e&&e.message)||e)+'</span>';
    }
  }
  document.addEventListener("click", async function(ev){
    const g=ev.target.closest("[data-refgift]");
    const btn=ev.target.closest("#refGiftBtn");
    if(!g && !btn) return;
    const msg=$("refMsg"); const to=(($("refGiftTo")||{}).value||"").trim().toUpperCase();
    if(!to){ if(msg){msg.className="msg err";msg.textContent="पहले लाभार्थी का ACS-नंबर भरें।";} return; }
    let oid = g ? g.getAttribute("data-refgift") : "";
    try{
      if(!oid){
        /* बटन-रास्ता: सबसे पुराना due-fund gift हो */
        const u=auth.currentUser;
        const mine=await getDocs(query(collection(db,"referrals"), where("refBy","==",u.uid)));
        let cand=null, t0=9e15;
        mine.forEach(d=>{ const x=d.data()||{};
          if(x.status!=="due"||x.giftedToRegNo) return;
          const t=x.createdAt&&x.createdAt.toMillis?x.createdAt.toMillis():0;
          if(t<t0){ t0=t; cand=d.id; } });
        if(!cand){ if(msg){msg.className="msg err";msg.textContent="gift-योग्य कोई fund नहीं।";} return; }
        oid=cand;
      }
      await httpsCallable(functions,"giftReferral")({ orderId:oid, toRegNo:to });
      if(msg){msg.className="msg ok";msg.textContent="🎁 gift दर्ज — भुगतान-चक्र में पैसा "+to+" को जाएगा।";}
      loadMyReferrals();
    }catch(e){
      if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+((e&&e.message)||e);}
    }
  });

  function markPhotoBadge(pay){ ensurePhotoDecor(true, IS_GOLD);
    let till=0, from=0;
    try{ till=pay&&pay.badgeExpiresAt&&pay.badgeExpiresAt.toMillis?pay.badgeExpiresAt.toMillis():0; }catch(e){}
    try{ from=pay&&pay.badgeActiveFrom&&pay.badgeActiveFrom.toMillis?pay.badgeActiveFrom.toMillis():0; }catch(e){}
    if(BADGE_INFO===null) BADGE_INFO={};
    setBadgePerfFrom(IS_GOLD?"gold":"green", till, from,
      (typeof EXT_REG!=="undefined"&&EXT_REG&&EXT_REG.regNo)||window.ACS_REGNO||""); }
  /* (v4.7, 22-Jul-2026) Jio-नियम v3.7 का बैज-द्वार निशान: learner-बैज (नौकरी-इच्छुक Green /
     भविष्य में विद्यार्थी Golden) सक्रिय → पूरा अभिरुचि-टेस्ट खुले। निशान device-local;
     बैज सक्रिय न मिले तो निशान हटे (refund/समाप्ति पर द्वार बंद)। */
  function setAptGate(pay){
    try{
      if(BADGE_ROLE!=="jobseeker" && BADGE_ROLE!=="student") return;
      let until=0;
      try{ const ex=pay&&pay.badgeExpiresAt&&pay.badgeExpiresAt.toDate?pay.badgeExpiresAt.toDate():null; if(ex) until=ex.getTime(); }catch(e){}
      if(!until) until=Date.now()+30*24*60*60*1000;
      localStorage.setItem("acs_apt_gate_v1", JSON.stringify({until:until, role:BADGE_ROLE}));
    }catch(e){}
  }
  function clearAptGate(){
    try{ if(BADGE_ROLE==="jobseeker"||BADGE_ROLE==="student") localStorage.removeItem("acs_apt_gate_v1"); }catch(e){}
  }
  /* boot पर एक हल्की जाँच — पैनल खोले बिना भी निशान दिखे */
  window.__acsBadgeMark = async function(){
    try{
      const u=auth.currentUser; if(!u) return;
      const qs=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
      let ok=false, okPay=null;
      qs.forEach(d=>{ const p=d.data()||{};
        if(p.purpose==="badge" && String(p.role||"jobseeker").toLowerCase()===BADGE_ROLE
           && p.status==="paid" && p.rmStatus==="approved"){ ok=true; okPay=p; } });
      if(ok){ markPhotoBadge(okPay); setAptGate(okPay); }
    }catch(e){}
  };

  async function buyBadge(){
    const btn=$("badgeBuyBtn"), msg=$("badgeMsg");
    if(!btn) return;
    /* पिन: पहले registration-पते से; न हो तो पैनल के पिन-खाने से (server भी यही क्रम मानता है) */
    let pin = IS_GOLD ? "" : pinFromReg();
    if(!IS_GOLD && !pin){
      const inp=$("badgePin");
      pin = String((inp&&inp.value)||"").replace(/[^0-9]/g,"");
      if(pin.length!==6){
        const pr=$("badgePinRow"); if(pr) pr.style.display="block";
        if(inp) inp.focus();
        if(msg){ msg.className="msg err"; msg.textContent="पहले अपने घर का 6-अंकों का पिन कोड भरें — शुल्क इसी से तय होगा।"; }
        return;
      }
    }
    btn.disabled=true; if(msg){ msg.className="msg"; msg.textContent="शुल्क तैयार किया जा रहा है…"; }
    try{
      let refCode=(($("refCode")||{}).value||"").trim();
      if(!refCode){ try{ refCode=(localStorage.getItem("acs_ref_code")||"").trim(); }catch(e){} }
      const res=await httpsCallable(functions,"createBadgeOrder")({ role:BADGE_ROLE, pincode:pin, referralCode:refCode });
      const o=(res&&res.data)||{};
      if(!o.ok||!o.orderId) throw new Error("order नहीं बना");
      const rupee=Math.round((o.amount||0)/100);
      const tierHi=TIER_HI[o.tier]||o.tier||"";
      let line="आपका क्षेत्र: "+tierHi+" · शुल्क ₹"+rupee+" (365 दिन)।";
      if(o.ageFee && o.ageFee>0){
        line="आपका क्षेत्र: "+tierHi+" · मूल शुल्क ₹"+Math.round(o.baseAmount/100)+
             " + उम्र-fee ₹"+Math.round(o.ageFee/100)+" = कुल ₹"+rupee+" (365 दिन)।";
      }
      if(IS_GOLD){
        line="🏅 Student Golden Badge · शुल्क ₹"+rupee+" (365 दिन)।";
        if(o.ageFee && o.ageFee<0){
          line="🏅 Student Golden Badge · मूल ₹"+Math.round(o.baseAmount/100)+
               " − उम्र-छूट ₹"+Math.round(-o.ageFee/100)+" = ₹"+rupee+" (365 दिन)।";
        }
      }
      const go=confirm(line+"\n\n"+(IS_GOLD
        ? "भुगतान होते ही Badge तुरंत सक्रिय — RM-जाँच नहीं। 18 से कम उम्र पर भुगतान अभिभावक की सहमति/उपस्थिति में करें।\nवापसी-नियम: ACS-दोष = 100%; अन्यथा (पूरा − 30%) × बचे दिन ÷ 365।\n\nभुगतान करें?"
        : "भुगतान के बाद RM आपकी जानकारी जाँचेंगे। सत्यापन असफल हुआ तो 30% जाँच-शुल्क कटेगा।\n\nभुगतान करें?"));
      if(!go){ btn.disabled=false; if(msg) msg.textContent=""; return; }
      if(msg) msg.textContent="भुगतान-पृष्ठ खुल रहा है…";
      await loadRazorpay();
      const rzp=new window.Razorpay({
        key:o.keyId, order_id:o.orderId, amount:o.amount, currency:o.currency||"INR",
        name:o.name||"Applied Computer School", description:IS_GOLD?"Student Golden Badge (365 दिन)":"Verified Badge (365 दिन)",
        prefill:{ email:(auth.currentUser&&auth.currentUser.email)||"" },
        theme:{ color:"#0B1F3A" },
        handler: async function(r){
          if(msg){ msg.className="msg"; msg.textContent="भुगतान की पुष्टि हो रही है…"; }
          try{
            await httpsCallable(functions,"verifyBadgePayment")({
              razorpay_order_id:r.razorpay_order_id,
              razorpay_payment_id:r.razorpay_payment_id,
              razorpay_signature:r.razorpay_signature });
            if(msg){ msg.className="msg ok"; msg.textContent=IS_GOLD?"✅ भुगतान सफल — 🏅 Golden Badge सक्रिय!":"✅ भुगतान सफल — अब RM-सत्यापन होगा।"; }
            loadBadgeStatus();
          }catch(e){
            if(msg){ msg.className="msg err"; msg.textContent="भुगतान हुआ पर पुष्टि अटकी — status थोड़ी देर में अपने-आप सुधरेगा।"; }
          }
          btn.disabled=false;
        },
        modal:{ ondismiss:function(){ btn.disabled=false; if(msg){ msg.className="msg"; msg.textContent="भुगतान रद्द किया गया।"; } } }
      });
      rzp.open();
    }catch(e){
      btn.disabled=false;
      if(msg){ msg.className="msg err"; msg.textContent="नहीं हो पाया: "+(e&&e.message?e.message:e); }
    }
  }
  document.addEventListener("click",(ev)=>{
    const b=ev.target.closest('[data-act="badge-buy"]'); if(!b) return;
    buyBadge();
  });
}

/* ═══════════════════════════════════════════════════════════════
   (22-Jul-2026) सलाह-पैनल: पिछली अभिरुचि-रिपोर्ट की स्थिति (₹125-सेव)।
   badge-status से स्वतंत्र — रिपोर्ट सेव होना/न होना अलग बात है।
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const st = document.getElementById("apt-last-report-status");
  if (!st) return;
  (async () => {
    try {
      const u = auth.currentUser; if (!u) { st.textContent = "लॉगिन-जाँच बाक़ी…"; return; }
      const res = await httpsCallable(functions, "latestAptitudeReport")({});
      const d = (res && res.data) || {};
      if (!d.found) {
        st.innerHTML = "अभी कोई रिपोर्ट सेव नहीं — टेस्ट देकर नतीजे पर ₹125 में सेव करें।";
        return;
      }
      const dt = d.paidAt ? new Date(d.paidAt).toLocaleDateString("hi-IN") : "";
      st.innerHTML = "✅ पिछली रिपोर्ट सेव है"+(dt?" ("+esc(dt)+")":"")+"। " +
        '<button class="abtn ok" id="apt-old-print" style="margin:4px 4px 0 0">🖨️ Print</button> ' +
        '<a class="abtn ok" id="apt-old-wa" target="_blank" rel="noopener" href="https://wa.me/?text='+
        encodeURIComponent(d.reportText||"")+'" style="display:inline-block;text-decoration:none;margin:4px 0 0">📲 WhatsApp</a>';
      const pb = document.getElementById("apt-old-print");
      if (pb) pb.onclick = () => {
        const w = window.open("", "_blank");
        if (w) { w.document.write("<pre style='font-size:16px;white-space:pre-wrap'>"+esc(d.reportText||"")+"</pre>"); w.print(); }
      };
    } catch(e) { st.textContent = "रिपोर्ट-स्थिति नहीं जाँची जा सकी।"; }
  })();
})();

/* ═══════════════════════════════════════════════════════════════
   (काम-11+, 19-Jul-2026 Founder-आदेश) 📒 खाता-बही — सिर्फ़ लेन-देन-रिकॉर्ड।
   ACS कोई balance नहीं रखता, निकासी नहीं (PPI-बचाव + "ACS पुल-मात्र" v1.7)।
   स्रोत: payments (rules v6 — मालिक अपना पढ़े)। scale-नियम: 50-50 खेप।
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const ROLE_HI={jobseeker:"नौकरी-इच्छुक",teacher:"शिक्षक",ustad:"उस्ताद",counselor:"सलाहकार",
    center:"केंद्र",workshop:"वर्कशॉप",foreign_agent:"विदेश एजेंट",finance_mitra:"वित्त मित्र",vendor:"विक्रेता"};
  const TIER_HI={village:"गाँव",town:"क़स्बा",metro:"महानगर"};
  let LG_ALL=[], LG_SHOWN=0; const LG_PAGE=50;
  function stLine(p){
    if(p.status==="paid" && p.rmStatus==="approved") return ["✅ बैज सक्रिय","#1b4d20"];
    if(p.status==="paid" && p.rmStatus==="rejected") return ["⚠️ सत्यापन असफल — वापसी नियम लागू","#B71C1C"];
    if(p.status==="paid") return ["⏳ भुगतान हुआ — RM-सत्यापन जारी","#8a5a00"];
    return ["🕐 शुरू हुआ — भुगतान पूरा नहीं","#555"];
  }
  function lgDrawMore(){
    const box=$("ledgerList"); if(!box) return;
    if(LG_SHOWN===0) box.innerHTML="";
    const old=$("lgMoreWrap"); if(old) old.remove();
    const end=Math.min(LG_SHOWN+LG_PAGE, LG_ALL.length);
    for(let i=LG_SHOWN;i<end;i++){
      const p=LG_ALL[i], st=stLine(p);
      const d=(p.createdAt&&p.createdAt.toDate)?p.createdAt.toDate():null;
      const dt=d?(("0"+d.getDate()).slice(-2)+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+d.getFullYear()):"—";
      const amt="₹"+Math.round((p.amount||0)/100);
      const roleHi=ROLE_HI[String(p.role||"jobseeker")]||p.role||"";
      const row=document.createElement("div"); row.className="mem";
      row.innerHTML='<div class="r1"><span class="nm">✅ Verified Badge — '+roleHi+'</span></div>'
        +'<div class="r2">📅 '+dt+' · क्षेत्र: '+(TIER_HI[p.tier]||p.tier||"—")+' · राशि: '+amt
        +((p.ageFee&&p.ageFee>0)?(' (मूल ₹'+Math.round(p.baseAmount/100)+' + उम्र-fee ₹'+Math.round(p.ageFee/100)+')'):'')+'</div>'
        +'<div class="r2" style="color:'+st[1]+'">'+st[0]+'</div>';
      box.appendChild(row);
    }
    LG_SHOWN=end;
    const w=document.createElement("div"); w.id="lgMoreWrap";
    if(LG_SHOWN<LG_ALL.length){
      const mb=document.createElement("button");
      mb.className="abtn ok"; mb.style.background="var(--blue)"; mb.style.marginTop="10px";
      mb.textContent="⬇️ और देखें ("+(LG_ALL.length-LG_SHOWN)+" बाक़ी)";
      mb.addEventListener("click", lgDrawMore);
      w.appendChild(mb);
    }
    box.appendChild(w);
  }
  LAZY["pnl-ledger"] = async function(){
    const box=$("ledgerList"); if(!box) return;
    box.innerHTML='<span class="note">हिसाब आ रहा है…</span>';
    try{
      const u=auth.currentUser; if(!u){ box.innerHTML='<span class="note">पहले login करें।</span>'; return; }
      const qs=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
      LG_ALL=[]; qs.forEach(d=>LG_ALL.push(d.data()||{}));
      LG_ALL.sort((a,b)=>{
        const ta=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
        const tb=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
        return tb-ta;
      });
      if(LG_ALL.length===0){
        box.innerHTML='<span class="note">अभी कोई लेन-देन नहीं — पहली paid-सेवा लेते ही हिसाब यहीं दिखेगा।</span>'; return;
      }
      LG_SHOWN=0; lgDrawMore();
    }catch(e){
      box.innerHTML='<span class="note" style="color:#B71C1C">हिसाब नहीं खुला — network जाँचकर पैनल दोबारा खोलें।</span>';
    }
  };
})();

/* ═══════════════════════════════════════════════════════════════
   (काम-11 कदम-3, 19-Jul-2026) 🟢 बैज-सत्यापन क़तार — founder/admin/zonal/
   regional के team-घरों पर (पैनल generator से सिर्फ़ वहीं बैठा है)।
   data = server listBadgeQueue (दायरा server जाँचता है) · फ़ैसला = decideBadge।
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const ROLE_HI={jobseeker:"नौकरी-इच्छुक",teacher:"शिक्षक",ustad:"उस्ताद",counselor:"सलाहकार",
    center:"केंद्र",workshop:"वर्कशॉप",foreign_agent:"विदेश एजेंट",finance_mitra:"वित्त मित्र",vendor:"विक्रेता"};
  const TIER_HI={village:"गाँव",town:"क़स्बा",metro:"महानगर"};

  async function loadQueue(){
    const box=$("badgeqList"); if(!box) return;
    box.innerHTML='<span class="note">सूची आ रही है…</span>';
    try{
      const res=await httpsCallable(functions,"listBadgeQueue")({});
      const items=(res&&res.data&&res.data.items)||[];
      if(items.length===0){
        box.innerHTML='<span class="note">✅ अभी कोई लंबित बैज-सत्यापन नहीं — क़तार ख़ाली है।</span>'; return;
      }
      box.innerHTML="";
      items.forEach(it=>{
        const dt=it.paidAt? (function(){const d=new Date(it.paidAt);return ("0"+d.getDate()).slice(-2)+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+d.getFullYear();})():"—";
        const row=document.createElement("div"); row.className="mem";
        row.innerHTML =
          '<div class="r1"><span class="nm">'+esc(it.name||"—")+' · '+esc(it.regNo||"—")+'</span></div>'
        + '<div class="r2">भूमिका: '+(ROLE_HI[it.role]||it.role)+' · क्षेत्र: '+(TIER_HI[it.tier]||it.tier||"—")
        + ' (पिन '+esc(it.pin||"—")+') · राशि: ₹'+(it.amountRupees||0)+' · भुगतान: '+dt+'</div>'
        + '<div class="r2">राज्य: '+esc(it.state||"—")+' · वांछित जिला: '+esc(it.district||"—")
        + (it.mobile? ' · 📱 '+esc(it.mobile) : '')+'</div>'
        + '<div class="acts">'
        + '<button class="abtn ok" data-bqact="approve" data-oid="'+it.orderId+'">✅ स्वीकृत — बैज दें (365 दिन)</button> '
        + '<button class="abtn no" data-bqact="rejopen" data-oid="'+it.orderId+'">❌ अस्वीकृत</button></div>'
        + '<div class="rejbox" id="bqrej-'+it.orderId+'"><textarea id="bqtx-'+it.orderId+'" rows="2" '
        + 'placeholder="अस्वीकृति का कारण (अनिवार्य) — आवेदक को दिखेगा; 70% वापसी देय + 7-दिन सुधार-खिड़की"></textarea>'
        + '<button class="abtn no" style="margin-top:6px" data-bqact="reject" data-oid="'+it.orderId+'">कारण के साथ अस्वीकृत करें</button></div>'
        + '<div class="msg" id="bqmsg-'+it.orderId+'"></div>';
        box.appendChild(row);
      });
    }catch(e){
      box.innerHTML='<span class="note" style="color:#B71C1C">सूची नहीं खुली: '+((e&&e.message)||e)+'</span>';
    }
  }
  LAZY["pnl-badgeq"] = loadQueue;

  /* ═══ E1 (काम-7 · 27-Jul): सेवा-भूमिका सत्यापन-क़तार ═══ */
  async function loadSevaQueue(){
    const box=$("sevaqList"), msg=$("sevaqMsg");
    if(!box) return;
    box.innerHTML='<span class="note">क़तार खुल रही है…</span>';
    try{
      const res=await httpsCallable(functions,"listServiceVerifyQueue")({});
      const items=(res&&res.data&&res.data.items)||[];
      /* (27-Jul, Founder-टोक) ईमानदार-पैनल: बटन = सिर्फ़ अपना अधिकार —
         rm/hq_admin = कदम-1 (सत्यापन); 🏁/⛔ अंतिम मुहर सिर्फ़ zm/founder (1-ब)। */
      const scope=String((res&&res.data&&res.data.scope)||"").toLowerCase();
      const canFinal=(scope==="zm"||scope==="founder");
      if(!items.length){ box.innerHTML='<span class="note">आपके दायरे में अभी कोई सेवा-भूमिका आवेदन नहीं।</span>'; return; }
      let h="";
      items.forEach(function(it){
        const vf=it.verify==="verified"?'<span style="color:#1b4d20;font-weight:700">✅ सत्यापित</span>'
               : it.verify==="failed" ?'<span style="color:#B71C1C;font-weight:700">❌ असफल</span>'
               : '<span style="color:#8a5a00;font-weight:700">⏳ सत्यापन बाक़ी</span>';
        const stt=it.status==="rejected"?' · <span style="color:#B71C1C">अस्वीकृत</span>':"";
        h+='<div class="pd" style="border:1px solid #dbe3ee;border-radius:10px;padding:10px;margin:8px 0">'+
           '<b>'+esc(it.name)+'</b> · '+esc(it.role)+(it.orgName?' · '+esc(it.orgName):'')+
           '<br>Reg: '+esc(it.regNo)+' · '+esc(it.district||"—")+' / '+esc(it.state||"—")+stt+
           '<br>'+vf+(it.verifyNote?' — '+esc(it.verifyNote):'')+
           '<div style="margin-top:6px">'+
           (it.verify!=="verified"
             ? '<button class="abtn ok" data-sevaq="ok" data-reg="'+esc(it.regNo)+'">✅ भौतिक-सत्यापन</button> '+
               '<button class="abtn" style="background:#B71C1C;color:#fff" data-sevaq="fail" data-reg="'+esc(it.regNo)+'">❌ असफल</button> '
             : '')+
           (canFinal
             ? '<button class="abtn ok" style="background:#0B1F3A" data-sevaq="approve" data-reg="'+esc(it.regNo)+'">🏁 अंतिम स्वीकृति</button> '+
               '<button class="abtn" style="background:#6b7280;color:#fff" data-sevaq="reject" data-reg="'+esc(it.regNo)+'">⛔ अस्वीकृति</button>'
             : (it.verify==="verified" ? '<span class="note">कदम-1 पूरा — अंतिम मुहर ZM/Founder करेंगे</span>' : ''))+
           '</div></div>';
      });
      box.innerHTML=h;
    }catch(e){
      box.innerHTML='<span class="note" style="color:#B71C1C">'+esc((e&&e.message)||"क़तार नहीं खुली")+'</span>';
    }
  }
  LAZY["pnl-sevaq"] = loadSevaQueue;
  document.addEventListener("click", async function(ev){
    const b=ev.target.closest("[data-sevaq]"); if(!b) return;
    const act=b.getAttribute("data-sevaq"), regNo=b.getAttribute("data-reg");
    const msg=$("sevaqMsg");
    try{
      b.disabled=true;
      if(act==="ok"||act==="fail"){
        const note=prompt(act==="ok"?"टिप्पणी (वैकल्पिक):":"असफल का कारण (अनिवार्य):","")||"";
        if(act==="fail"&&!note.trim()){ if(msg){msg.className="msg err";msg.textContent="असफल पर कारण अनिवार्य है।";} b.disabled=false; return; }
        await httpsCallable(functions,"rmVerifyService")({regNo:regNo, ok:act==="ok", note:note.trim()});
        if(msg){msg.className="msg ok";msg.textContent=(act==="ok"?"✅ सत्यापन दर्ज":"❌ असफल दर्ज")+" — "+regNo;}
      }else if(act==="approve"){
        if(!confirm("अंतिम स्वीकृति दें? (सिर्फ़ उसी राज्य के ZM या Founder से होगी)")){ b.disabled=false; return; }
        await httpsCallable(functions,"approveApplication")({regNo:regNo});
        if(msg){msg.className="msg ok";msg.textContent="🏁 स्वीकृत — "+regNo;}
      }else{
        const reason=prompt("अस्वीकृति का कारण (अनिवार्य):","")||"";
        if(!reason.trim()){ b.disabled=false; return; }
        await httpsCallable(functions,"rejectApplication")({regNo:regNo, reason:reason.trim()});
        if(msg){msg.className="msg ok";msg.textContent="⛔ अस्वीकृत — "+regNo;}
      }
      loadSevaQueue();
    }catch(e){
      if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+((e&&e.message)||e);}
    }
    b.disabled=false;
  });

  document.addEventListener("click", async (ev)=>{
    const b=ev.target.closest("[data-bqact]"); if(!b) return;
    const act=b.getAttribute("data-bqact"), oid=b.getAttribute("data-oid");
    if(!act||!oid) return;
    if(act==="rejopen"){ const bx=$("bqrej-"+oid); if(bx) bx.classList.toggle("on"); return; }
    const msg=$("bqmsg-"+oid);
    let reason="";
    if(act==="reject"){
      const tx=$("bqtx-"+oid); reason=String((tx&&tx.value)||"").trim();
      if(!reason){ if(msg){msg.className="msg err";msg.textContent="कारण लिखना अनिवार्य है।";} return; }
    }
    if(act==="approve" && !confirm("इस आवेदक को Verified Badge दें? (365 दिन के लिए सक्रिय होगा)")) return;
    b.disabled=true; if(msg){msg.className="msg";msg.textContent="server पर दर्ज हो रहा है…";}
    try{
      await httpsCallable(functions,"decideBadge")({ orderId:oid, action:(act==="reject"?"reject":"approve"), reason:reason });
      if(msg){msg.className="msg ok";msg.textContent = act==="reject"
        ? "⚠️ अस्वीकृत दर्ज — 70% वापसी देय (office Razorpay से) + 7-दिन सुधार-खिड़की।"
        : "✅ बैज सक्रिय — 365 दिन।";}
      setTimeout(loadQueue, 900);
    }catch(e){
      b.disabled=false;
      if(msg){msg.className="msg err";msg.textContent="नहीं हुआ: "+((e&&e.message)||e);}
    }
  });
})();


/* ═══════════════════════════════════════════════════════════════
   (काम-9अ · 28-Jul-2026) k9-block — नामांकन-इंजन (server: v9अ functions)।
   केंद्र/वर्कशॉप: pnl-enroll · learner: pnl-myctr। data device पर नहीं —
   सब Firestore (rules v8: अपना ही दिखे) + server-callables।
   ═══════════════════════════════════════════════════════════════ */
(function(){
  function rb(t){ return String(t==null?"":t).replace(/\[/g,"(").replace(/\]/g,")"); }
  function dt(ts){ try{ return ts&&ts.toDate ? ts.toDate().toLocaleDateString("hi-IN") : "—"; }catch(e){ return "—"; } }
  function seatBar(f,se){
    var pct=se?Math.min(100,Math.round(f/se*100)):0, h;
    if(se<=60){ h='<div class="k9seat">';
      for(var i=0;i<se;i++) h+='<span class="k9dot'+(i<f?' f':'')+'"></span>';
      h+='</div>'; }
    else h='<div class="k9bar"><i style="width:'+pct+'%"></i></div>';
    return '<div class="k9seatwrap">'+h+'<div class="k9seatlbl"><b>'+f+'</b> / '+se+' seat भरीं · '+pct+' प्रतिशत</div></div>'; }
  var K9C=null;
  function k9Courses(cb){
    if(K9C){ cb(K9C); return; }
    if(typeof SELF_EMP_COURSES!=="undefined" && window.MG_NAMES
       && typeof ALL_SECTORS!=="undefined" && typeof GOVT_JOBS!=="undefined"
       && typeof GOVT_SCHOLAR_COURSES!=="undefined"){ collect(); cb(K9C); return; }
    /* (30-Jul) courses_data एक-दरवाज़े से — बाक़ी 3 फ़ाइलें पुरानी श्रृंखला से */
    var need=["/assets/mg_names.js","/assets/udyam_data.js","/assets/govt_jobs_embassy.js"], i=0;
    ensureCoursesData(function(){ next(); });
    function next(){
      if(i>=need.length){ collect(); cb(K9C); return; }
      var sc=document.createElement("script"); sc.src=need[i++];
      sc.onload=next; sc.onerror=next;   /* एक फ़ाइल रुके तो बाक़ी चलें */
      document.body.appendChild(sc);
    }
    function collect(){ K9C=[];
      ((typeof ACADEMIC_COURSES!=="undefined")?ACADEMIC_COURSES:[]).forEach(function(c){ c._ac=true; K9C.push(c); });
      ((typeof GOVT_SCHOLAR_COURSES!=="undefined")?GOVT_SCHOLAR_COURSES:[]).forEach(function(c){ c._sc=true; K9C.push(c); });
      [ (typeof SELF_EMP_COURSES!=="undefined")?SELF_EMP_COURSES:[],
        (typeof PRIVATE_JOB_COURSES!=="undefined")?PRIVATE_JOB_COURSES:[],
        (typeof LOCAL_JOB_COURSES!=="undefined")?LOCAL_JOB_COURSES:[],
        (typeof GOVT_JOB_COURSES!=="undefined")?GOVT_JOB_COURSES:[]
      ].forEach(function(L){ (L||[]).forEach(function(c){ K9C.push(c); }); }); }
  }
  function k9Prog(courseId){
    /* device-local प्रगति (v3.2) — url-उपसर्ग से पढ़े-पाठ गिनती ÷ कुल पाठ */
    var c=(K9C||[]).find(function(x){return x.id===courseId;});
    if(!c||!c.url||!c.lessons) return null;
    var d={}; try{ d=JSON.parse(localStorage.getItem("acs_learn_progress")||"{}"); }catch(e){}
    var r=d.read||{}, n=0, k; for(k in r){ if(k.indexOf(c.url)===0) n++; }
    return Math.min(100, Math.round(n/c.lessons*100));
  }
  function call(name, data){ return httpsCallable(functions, name)(data); }
  function isInst(){ return !!(EXT_REG && (EXT_REG.role==="center"||EXT_REG.role==="workshop")); }

  /* ───────── केंद्र/वर्कशॉप — pnl-enroll ───────── */
  var OF_ALL=[], EN_ALL=[], EN_SHOWN=0;
  async function k9LoadInst(){
    var u=auth.currentUser; if(!u||!isInst()) return;
    var qs=await getDocs(query(collection(db,"offerings"), where("centerUid","==",u.uid)));
    OF_ALL=[]; qs.forEach(function(d){ OF_ALL.push(d.data()||{}); });
    var es=await getDocs(query(collection(db,"enrollments"), where("centerUid","==",u.uid)));
    EN_ALL=[]; es.forEach(function(d){ var x=d.data()||{}; x._id=d.id; EN_ALL.push(x); });
    drawOfferings(); drawPending(); EN_SHOWN=0; drawActive(false);
    var sid=$("instShareId");
    if(sid){ sid.textContent=(EXT_REG&&EXT_REG.regNo)||"—";
      var wa=$("instShareWa");
      if(wa) wa.href="https://wa.me/?text="+encodeURIComponent("मेरे केंद्र से जुड़ने के लिए ACS पर यह ID खोजें: "+((EXT_REG&&EXT_REG.regNo)||"")+" — acslearn.com");
    }
  }
  function drawOfferings(){
    var box=$("ofList"); if(!box) return;
    if(OF_ALL.length===0){ box.innerHTML='<span class="note">अभी कोई घोषणा नहीं — ऊपर से पहली घोषणा करें।</span>'; return; }
    box.innerHTML="";
    OF_ALL.forEach(function(o){
      var d=document.createElement("div"); d.className="k9off";
      d.innerHTML='<div class="t">'+esc(rb(o.courseName))+' '+
        (o.status==="open"?'<span class="chip appr">खुली</span>':'<span class="chip">बंद</span>')+'</div>'+
        '<div class="m">💰 ₹'+esc(o.feeRupees)+' · ⏳ '+esc(rb(o.durationText))+' · 📅 '+esc(o.startDate)+' से '+esc(o.endDate)+'</div>'+
        (o.subjects?'<div class="m">📚 विषय: '+esc(rb(o.subjects))+'</div>':'')+
        seatBar(o.filledCount||0,o.seats)+
        (o.status==="open"?'<button class="abtn" style="background:#B71C1C;margin-top:8px" data-k9close="'+esc(o.courseId)+'">⛔ घोषणा बंद</button>':'');
      box.appendChild(d);
    });
  }
  function pendRow(e, forInst){
    var who=forInst ? (esc(rb(e.studentName))+' · '+esc(e.studentRegNo)) : esc(rb(e.centerName));
    var g=e.minor?(e.guardianOk?' 🛡️':' <span style="color:#B71C1C">🛡️ Guardian-दस्तावेज़ नहीं</span>'):'';
    var h='<div class="r1"><span class="nm">'+who+g+'</span> · '+esc(rb(e.courseName))+
      (e.status==="requested"?' <span class="chip">⏳ निवेदन</span>':' <span class="chip">📩 प्रस्ताव</span>')+'</div>';
    var mine=(e.status==="requested")===forInst; /* फ़ैसला दूसरे पक्ष का: requested→केंद्र · offered→विद्यार्थी */
    if(mine) h+='<button class="abtn ok" data-k9acc="'+esc(e._id)+'">✅ स्वीकारें</button> '+
                '<button class="abtn" style="background:#B71C1C;color:#fff" data-k9ret="'+esc(e._id)+'">❌ लौटाएँ</button>';
    else h+='<button class="abtn" data-k9wd="'+esc(e._id)+'">↩ वापस लें</button>';
    return h;
  }
  function drawPending(){
    var box=$("enrPendList"); if(!box) return;
    var P=EN_ALL.filter(function(e){return e.status==="requested"||e.status==="offered";});
    if(P.length===0){ box.innerHTML='<span class="note">अभी कोई निवेदन/प्रस्ताव लंबित नहीं।</span>'; return; }
    box.innerHTML="";
    P.forEach(function(e){ var d=document.createElement("div"); d.className="lrow"; d.innerHTML=pendRow(e,true); box.appendChild(d); });
  }
  function feeLines(e){
    var f=e.feeEntries||[]; if(f.length===0) return '<span class="note">कोई फीस-प्रविष्टि नहीं।</span>';
    return f.map(function(x){ return '🧾 '+esc(x.receiptNo)+' · ₹'+esc(x.amountRupees)+' · '+dt(x.at)+(x.note?' · '+esc(rb(x.note)):''); }).join("<br>");
  }
  function drawActive(more){
    var box=$("enrActiveList"); if(!box) return;
    var A=EN_ALL.filter(function(e){return e.status==="active";});
    if(A.length===0){ box.innerHTML='<span class="note">अभी कोई active नामांकन नहीं।</span>'; return; }
    if(!more) box.innerHTML="";
    var from=EN_SHOWN, to=Math.min(A.length, from+50); EN_SHOWN=to;   /* scale-नियम: 50-खेप */
    A.slice(from,to).forEach(function(e){
      var d=document.createElement("div"); d.className="lrow";
      var g=e.minor?(e.guardianOk?' 🛡️':''):'';
      d.innerHTML='<div class="r1"><span class="nm">'+esc(rb(e.studentName))+g+'</span> · '+esc(e.studentRegNo)+'</div>'+
        '<div class="r2">'+esc(rb(e.courseName))+' · नामांकन: '+dt(e.enrolledAt)+'<br>'+feeLines(e)+'</div>'+
        '<button class="abtn ok" data-k9fee="'+esc(e._id)+'">💰 फीस-दर्ज</button> '+
        '<a class="abtn" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text='+
        encodeURIComponent("ACS रसीद — "+rb(e.studentName)+" ("+e.studentRegNo+") · "+rb(e.courseName)+" · "+feePlain(e))+'">📲 रसीद WhatsApp</a>';
      box.appendChild(d);
    });
    var old=$("k9More"); if(old) old.remove();
    if(to<A.length){ var mb=document.createElement("button"); mb.className="abtn"; mb.id="k9More";
      mb.textContent="और देखें ("+(A.length-to)+" बाक़ी)"; mb.onclick=function(){ drawActive(true); }; box.appendChild(mb); }
  }
  function feePlain(e){ var f=e.feeEntries||[]; if(!f.length) return "कोई फीस-प्रविष्टि नहीं";
    return f.map(function(x){ return x.receiptNo+" ₹"+x.amountRupees; }).join(", "); }

  LAZY["pnl-enroll"]=async function(){
    var box=$("ofList"); if(!box||!isInst()) return;
    box.innerHTML='<span class="note">हिसाब आ रहा है…</span>';
    k9Courses(function(A){
      var cat=$("ofCatSel"), sec=$("ofSecSel"), sel=$("ofCourseSel");
      if(!cat||!sec||!sel||!A) return;
      if(cat._k9) return; cat._k9=true;
      function og(sel,label){ var g=document.createElement("optgroup"); g.label=label; sel.appendChild(g); return g; }
      function opt(par,val,txt){ var o=document.createElement("option"); o.value=val; o.textContent=txt; par.appendChild(o); }
      function fillCourses(list){
        sel.innerHTML='<option value="">चुनें…</option>';
        list.forEach(function(c){ opt(sel,c.id,rb(c.name_hi||c.name_en||c.id)); });
        var w=$("ofCourseWrap"); if(w) w.style.display=""; }
      function fillSector(mg){
        sel.innerHTML='<option value="">चुनें…</option>';
        var acs=A.filter(function(c){return String(c.mg)===String(mg) && !c._ac;});
        if(acs.length){ var g1=og(sel,"📚 ACS-कोर्स (पाठ बने/बनेंगे)");
          acs.forEach(function(c){ opt(g1,c.id,rb(c.name_hi||c.name_en||c.id)); }); }
        var U=(typeof ALL_SECTORS!=="undefined")?ALL_SECTORS:[];
        var uds=U.filter(function(u){return String(u.mg)===String(mg);});
        if(uds.length){ var g2=og(sel,"🏭 उद्यम-सूची ("+uds.length+") — माँग पर कोर्स बनेगा");
          uds.forEach(function(u){ opt(g2,"UDY-"+u.n,rb(u.name)); }); }
        var w=$("ofCourseWrap"); if(w) w.style.display=""; }
      function fillGovt(){
        sel.innerHTML='<option value="">चुनें…</option>';
        var g0=og(sel,"📚 तैयारी-कोर्स");
        A.filter(function(c){return !c._ac && !c._sc && !c.mg;})
          .forEach(function(c){ opt(g0,c.id,rb(c.name_hi||c.name_en||c.id)); });
        var G=(typeof GOVT_JOBS!=="undefined")?GOVT_JOBS:{};
        var g1=og(sel,"🏛️ सरकारी पद — स्थायी ("+((G.permanent||[]).length)+")");
        (G.permanent||[]).forEach(function(j,i){ opt(g1,"GOV-P"+(i+1),rb(j.name)+" — तैयारी"); });
        var g2=og(sel,"📝 सरकारी पद — संविदा ("+((G.contract||[]).length)+")");
        (G.contract||[]).forEach(function(j,i){ opt(g2,"GOV-C"+(i+1),rb(j.name)+" — तैयारी"); });
        var g3=og(sel,"🎓 छात्रवृत्ति/प्रवेश-परीक्षा");
        A.filter(function(c){return c._sc;})
          .forEach(function(c){ opt(g3,c.id,rb(c.name_hi||c.name_en||c.id)); });
        var w=$("ofCourseWrap"); if(w) w.style.display=""; }
      var NCERT={ jr:["हिंदी","अंग्रेज़ी","संस्कृत","उर्दू","गणित","विज्ञान","सामाजिक विज्ञान","कंप्यूटर","कला","शारीरिक शिक्षा"],
        sr:["हिंदी","अंग्रेज़ी","संस्कृत","उर्दू","भौतिकी","रसायन","जीव विज्ञान","गणित","कंप्यूटर विज्ञान","सूचना प्रौद्योगिकी","लेखाशास्त्र","व्यवसाय अध्ययन","अर्थशास्त्र","उद्यमिता","इतिहास","भूगोल","राजनीति विज्ञान","समाजशास्त्र","मनोविज्ञान","गृह विज्ञान","कृषि","शारीरिक शिक्षा","संगीत","चित्रकला"] };
      function subBox(){ return $("ofSubBox"); }
      function drawSubs(cid){
        var box=subBox(); if(!box) return;
        var n=parseInt(cid.replace("AC",""),10);
        var L=(n>=11)?NCERT.sr:NCERT.jr;
        var h='<label style="font-size:16px;font-weight:700;color:var(--navy);display:block;margin-bottom:6px">NCERT-विषय चुनें:</label><div class="k9subs">'+
          '<label><input type="checkbox" id="ofSubAll"> ✅ सभी विषय</label>';
        L.forEach(function(sub,i){ h+='<label><input type="checkbox" class="ofSub" value="'+sub+'"> '+sub+'</label>'; });
        h+='</div>'; box.innerHTML=h; box.style.display="";
        var all=$("ofSubAll");
        function paint(){ box.querySelectorAll(".k9subs label").forEach(function(l){
          var c=l.querySelector("input"); l.className=c&&c.checked?"on":""; }); }
        all.onchange=function(){ box.querySelectorAll(".ofSub").forEach(function(c){ c.checked=all.checked; }); paint(); };
        box.querySelectorAll(".ofSub").forEach(function(c){ c.onchange=paint; });
      }
      function wrapShow(id,on){ var w=$(id); if(w) w.style.display=on?"":"none"; }
      cat.onchange=function(){
        wrapShow("ofCourseWrap",false); wrapShow("ofSecWrap",false); sel.value="";
        var sb=subBox(); if(sb){ sb.style.display="none"; sb.innerHTML=""; }
        if(cat.value==="ac"){ fillCourses(A.filter(function(c){return c._ac;})); return; }
        if(cat.value==="gv"){ fillGovt(); return; }
        if(cat.value!=="vo") return;
        if(!sec._k9){ sec._k9=true;
          var M=window.MG_NAMES||{}; var k;
          for(k=1;k<=24;k++){ var m=M[k]||M[String(k)]; if(!m) continue;
            var o=document.createElement("option"); o.value=String(k);
            o.textContent=(m.e||"")+" "+m.n; sec.appendChild(o); }
          }
        wrapShow("ofSecWrap",true);
        sec.onchange=function(){ if(sec.value) fillSector(sec.value); };
      };
      sel.onchange=function(){ var sb=subBox(); if(sb){ sb.style.display="none"; sb.innerHTML=""; }
        if(cat.value==="ac" && /^AC\d+$/.test(sel.value)) drawSubs(sel.value); };
      /* अंतिम-तिथि अपने-आप: समय-सीमा (माह/दिन/साल) + प्रारंभ-तिथि */
      function autoEnd(){
        var st=$("ofStart"), en=$("ofEnd"), du=$("ofDur");
        if(!st||!en||!du||!st.value) return;
        var t=du.value, m=t.match(/(\d+)\s*(माह|महीना|महीने|month|months|mah)/i),
            dd=t.match(/(\d+)\s*(दिन|day|days|din)/i),
            yy=t.match(/(\d+)\s*(साल|वर्ष|year|years|sal|varsh)/i);
        var d=new Date(st.value); if(isNaN(d.getTime())) return;
        if(yy) d.setFullYear(d.getFullYear()+parseInt(yy[1],10));
        else if(m) d.setMonth(d.getMonth()+parseInt(m[1],10));
        else if(dd) d.setDate(d.getDate()+parseInt(dd[1],10));
        else return;
        d.setDate(d.getDate()-1);   /* अवधि का आख़िरी दिन */
        en.value=d.toISOString().slice(0,10);
      }
      var stEl=$("ofStart"), duEl=$("ofDur");
      if(stEl) stEl.onchange=autoEnd; if(duEl){ duEl.onchange=autoEnd; duEl.oninput=autoEnd; }
    });
    try{ await k9LoadInst(); }
    catch(e){ box.innerHTML='<span class="note" style="color:#B71C1C">नहीं खुला: '+esc((e&&e.message)||e)+'</span>'; }
  };

  /* ───────── learner — pnl-myctr ───────── */
  var MC_ALL=[];
  async function k9LoadMine(){
    var u=auth.currentUser; if(!u) return;
    var qs=await getDocs(query(collection(db,"enrollments"), where("studentUid","==",u.uid)));
    MC_ALL=[]; qs.forEach(function(d){ var x=d.data()||{}; x._id=d.id; MC_ALL.push(x); });
    var box=$("mcList"); if(!box) return;
    if(MC_ALL.length===0){ box.innerHTML='<span class="note">अभी कोई नामांकन नहीं — ऊपर केंद्र खोजकर निवेदन भेजें।</span>'; return; }
    box.innerHTML="";
    MC_ALL.forEach(function(e){
      var d=document.createElement("div"); d.className="lrow"; var h;
      if(e.status==="requested"||e.status==="offered") h=pendRow(e,false);
      else if(e.status==="active"){
        var pr=k9Prog(e.courseId);
        h='<div class="r1"><span class="nm">'+esc(rb(e.courseName))+'</span> <span class="chip ok">✅ active</span></div>'+
          '<div class="r2">🏫 '+esc(rb(e.centerName))+' · नामांकन-तिथि: '+dt(e.enrolledAt)+
          (pr!==null?('<br>📈 प्रगति: '+pr+' प्रतिशत'+(pr>=80?' · <span class="chip ok">🎯 परीक्षा के योग्य</span>':'')):'')+
          '<br>'+feeLines(e)+'</div>';
      } else h='<div class="r1"><span class="nm">'+esc(rb(e.courseName))+'</span> <span class="chip">'+
          (e.status==="returned"?'❌ लौटाया':'↩ वापस लिया')+'</span></div>'+
          (e.returnReason?'<div class="r2">कारण: '+esc(rb(e.returnReason))+'</div>':'');
      d.innerHTML=h; box.appendChild(d);
    });
  }
  /* (29-Jul, Founder) 🧭 दरवाज़ा-इंजन: बैज > ₹100-चांस > झलक — पैनल अब अंधा नहीं।
     नियम-मुहर: दोनों हों तो बैज जीते (365-दिन असीमित); unused चांस मरता नहीं —
     record में सुरक्षित, बैज-मियाद बाद काम आए (Founder 29-Jul)। */
  LAZY["pnl-aptitude"]=async function(){
    var box=$("aptGateBox"); if(!box) return;
    var back=encodeURIComponent(location.pathname);
    var u=auth.currentUser;
    function draw(h){ box.innerHTML=h; }
    try{
      var badgeTill=0;
      if(u){
        var qs=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
        qs.forEach(function(d){ var p=d.data()||{};
          if(p.purpose==="badge"&&p.status==="paid"&&p.rmStatus==="approved"){
            var ex=p.badgeExpiresAt&&p.badgeExpiresAt.toMillis?p.badgeExpiresAt.toMillis():0;
            if(ex>Date.now()&&ex>badgeTill) badgeTill=ex; } });
      }
      var chance=false;
      if(u){ try{ var cr=await httpsCallable(functions,"checkAptitudeAttempt")({});
        chance=!!(cr.data&&cr.data.available); }catch(e){} }
      var goBtn='<a class="abtn ok" style="display:inline-block;text-decoration:none" href="/aptitude-test.html?back='+back+'">▶️ नया टेस्ट दें / जारी रखें</a>';
      /* (29-Jul, Founder — रोगी→रिपोर्ट→दवा→दुकान) आख़िरी टेस्ट की रिपोर्ट यहीं:
         ⭐ सेक्टर · 5+ उद्यम + सफलता-संभावना · 📚 कोर्स-कड़ी · 🎬 विशेषज्ञ-video ·
         🧑‍🏫 सलाहकार — पन्ने की पूरी उपयोगिता एक जगह। */
      function reportHTML(){
        var ap={}; try{ ap=JSON.parse(localStorage.getItem("acs_apt_sess_v1")||"{}"); }catch(e){}
        var P=ap.prev;
        if(!P||!P.udy||!P.udy.length)
          return '<div class="pd">अभी आपकी कोई रिपोर्ट नहीं बनी — नीचे से टेस्ट दीजिए, रिपोर्ट यहीं दिखेगी।</div>';
        var h='<div class="pd"><b>📊 आपकी रिपोर्ट ('+new Date(P.at).toLocaleDateString("hi-IN")+')</b></div>'+
          '<div class="pd">⭐ आपका मन इन क्षेत्रों में लगता है: '+P.mg.map(function(m){return '<span class="chip appr">'+esc(m)+'</span>';}).join(' ')+'</div>'+
          '<div class="pd"><b>🏭 इन कामों में आगे बढ़ सकते हैं:</b></div>';
        P.udy.slice(0,6).forEach(function(u2,i){
          var sLine=(typeof u2.s==="number")
            ? (u2.s>=4?"मन बहुत गहरा लगा — शुरुआत के लिए सबसे अच्छा":(u2.s>=2?"मन अच्छा लगा — सफल होने की अच्छी उम्मीद":"मन लगा — आज़माने लायक़"))
            : "आपकी रुचि यहाँ दिखी";
          h+='<div class="lrow"><div class="r1"><span class="nm">'+(i+1)+'. '+esc(u2.nm)+'</span></div>'+
            '<div class="r2">💡 '+sLine+' <span class="note">(यह अनुमान है)</span></div>'+
            (u2.c?'<a class="abtn ok" style="text-decoration:none" href="'+esc(u2.c)+'">📚 कोर्स पढ़ें</a> ':'')+
            '<a class="abtn" style="text-decoration:none" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query='+
            encodeURIComponent(u2.nm+" expert documentary")+'">🎬 दुनिया के उस्ताद देखें</a></div>';
        });
        h+='<div class="pd">🧑‍🏫 राह पर बात करनी हो — <a href="/hi/salah.html" style="font-weight:800">सलाहकार-पन्ना खोलें</a></div>';
        return h;
      }
      if(badgeTill){
        draw('<div class="pd"><b>🏅 आपका बैज चालू है ('+new Date(badgeTill).toLocaleDateString("hi-IN")+' तक)</b> — पूरा टेस्ट 365 दिन, जितनी बार चाहें, मुफ़्त।</div>'+
          reportHTML()+goBtn+
          '<div class="note">📜 रिपोर्ट की PDF ₹125 में — मर्ज़ी हो तो लें; नतीजा वैसे भी मुफ़्त दिखता है।</div>');
        return;
      }
      if(chance){
        draw('<div class="pd"><b>🎫 आपका ₹100 वाला 1 मौक़ा तैयार है</b> — पूरा टेस्ट खुला।</div>'+reportHTML()+goBtn);
        return;
      }
      draw(reportHTML()+
        '<div class="pd">🎁 पहले मुफ़्त झलक लीजिए — 24 आसान प्रश्न, बीच में कहानियाँ।</div>'+
        '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none" href="/aptitude-test.html?back='+back+'">🧭 मुफ़्त झलक दें</a>'+
        '<div class="note">🏅 बैज लें तो पूरा टेस्ट साल-भर मुफ़्त · बिना बैज ₹100 में 1 मौक़ा · रिपोर्ट-PDF ₹125 — आपकी मर्ज़ी।</div>');
    }catch(e){
      draw('<span class="note" style="color:#B71C1C">स्थिति नहीं खुली: '+esc((e&&e.message)||e)+'</span>');
    }
  };
  LAZY["pnl-myctr"]=async function(){
    var box=$("mcList"); if(!box) return;
    box.innerHTML='<span class="note">सूची आ रही है…</span>';
    k9Courses(function(){});   /* प्रगति-% के लिए पहले से गरम */
    try{ await k9LoadMine(); }
    catch(e){ box.innerHTML='<span class="note" style="color:#B71C1C">नहीं खुली: '+esc((e&&e.message)||e)+'</span>'; }
  };

  /* ───────── बटन-तार (एक साझा click-सुनना) ───────── */
  document.addEventListener("click", async function(ev){
    var b=ev.target.closest("[data-k9close],[data-k9acc],[data-k9ret],[data-k9wd],[data-k9fee],#ofDeclare,#addStuFind,#mcFindBtn,#instShareCopy,[data-k9off],[data-k9req]");
    if(!b) return;
    var msg=$("enrMsg")||$("mcMsg")||$("ofMsg");
    function say(ok,t){ if(msg){ msg.className="msg "+(ok?"ok":"err"); msg.textContent=t; } }
    try{
      if(b.id==="ofDeclare"){
        b.disabled=true;
        var subs=[]; document.querySelectorAll("#ofSubBox .ofSub:checked").forEach(function(c){ subs.push(c.value); });
        var allS=$("ofSubAll");
        var r=await call("declareOffering",{ courseId:$("ofCourseSel").value, feeRupees:Number($("ofFee").value),
          durationText:$("ofDur").value, seats:Number($("ofSeats").value),
          startDate:$("ofStart").value, endDate:$("ofEnd").value,
          subjectsText:(allS&&allS.checked)?"सभी NCERT-विषय":subs.join(", ") });
        b.disabled=false; var m1=$("ofMsg"); if(m1){m1.className="msg ok";m1.textContent="📣 घोषणा दर्ज — "+r.data.offeringId;}
        await k9LoadInst(); return;
      }
      if(b.hasAttribute("data-k9close")){
        if(!confirm("घोषणा बंद करें? नए नामांकन रुक जाएँगे — active अछूते रहेंगे।")) return;
        await call("closeOffering",{ courseId:b.getAttribute("data-k9close") }); await k9LoadInst(); return;
      }
      if(b.id==="addStuFind"){
        b.disabled=true;
        var card=$("addStuCard"); if(card) card.innerHTML='<span class="note">खोज रहे…</span>';
        var res=await call("lookupStudent",{ regNo:$("addStuReg").value.trim() });
        b.disabled=false; var d=res.data;
        var opts=OF_ALL.filter(function(o){return o.status==="open";})
          .map(function(o){return '<option value="'+esc(o.courseId)+'">'+esc(rb(o.courseName))+'</option>';}).join("");
        if(card) card.innerHTML='<div class="lrow"><div class="r1"><span class="nm">'+esc(rb(d.name))+'</span> · '+esc(d.regNo)+
          (d.minor?' 🛡️ (नाबालिग)':'')+'</div>'+
          (opts?('<select id="addStuCourse">'+opts+'</select> <button class="abtn ok" data-k9off="'+esc(d.regNo)+'">📩 प्रस्ताव भेजें</button>')
               :'<span class="note">पहले ऊपर कोई कोर्स घोषित करें।</span>')+'</div>';
        return;
      }
      if(b.hasAttribute("data-k9off")){
        b.disabled=true;
        await call("offerEnrollment",{ studentRegNo:b.getAttribute("data-k9off"), courseId:$("addStuCourse").value });
        say(true,"📩 प्रस्ताव गया — विद्यार्थी की हाँ पर active होगा।");
        var c2=$("addStuCard"); if(c2) c2.innerHTML=""; await k9LoadInst(); return;
      }
      if(b.id==="mcFindBtn"){
        b.disabled=true;
        var cc=$("mcCtrCard"); if(cc) cc.innerHTML='<span class="note">खोज रहे…</span>';
        var cr=await call("lookupCenter",{ regNo:$("mcCtrReg").value.trim() });
        b.disabled=false; var C=cr.data;
        var rows=(C.offerings||[]).map(function(o){
          var full=(o.filledCount||0)>=o.seats;
          return '<div class="k9off"><div class="t">'+esc(rb(o.courseName))+'</div>'+
            '<div class="m">💰 ₹'+esc(o.feeRupees)+' · ⏳ '+esc(rb(o.durationText))+' · 📅 '+esc(o.startDate)+' से '+esc(o.endDate)+'</div>'+
            (o.subjects?'<div class="m">📚 विषय: '+esc(rb(o.subjects))+'</div>':'')+
            seatBar(o.filledCount||0,o.seats)+
            (full?'<span class="chip">seat भर गईं</span>'
                 :'<button class="abtn ok" data-k9req="'+esc(o.courseId)+'" data-ctr="'+esc(C.regNo)+'">✉️ निवेदन भेजें</button>')+'</div>';
        }).join("");
        if(cc) cc.innerHTML='<div class="lrow"><div class="r1"><span class="nm">'+esc(rb(C.name))+'</span> · '+esc(C.regNo)+
          '</div><div class="r2">'+esc(rb(C.district||"—"))+' / '+esc(rb(C.state||"—"))+'</div></div>'+
          (rows||'<span class="note">इस केंद्र की कोई खुली कोर्स-घोषणा नहीं।</span>');
        return;
      }
      if(b.hasAttribute("data-k9req")){
        b.disabled=true;
        await call("requestEnrollment",{ centerRegNo:b.getAttribute("data-ctr"), courseId:b.getAttribute("data-k9req") });
        say(true,"✉️ निवेदन गया — केंद्र की हाँ पर active होगा।"); await k9LoadMine(); return;
      }
      if(b.hasAttribute("data-k9acc")){
        b.disabled=true;
        await call("acceptEnrollment",{ enrollId:b.getAttribute("data-k9acc") });
        say(true,"✅ नामांकन active — seat दर्ज।");
        if(isInst()) await k9LoadInst(); else await k9LoadMine(); return;
      }
      if(b.hasAttribute("data-k9ret")){
        var why=prompt("लौटाने का कारण लिखें (ज़रूरी):"); if(!why) return;
        await call("declineOrWithdraw",{ enrollId:b.getAttribute("data-k9ret"), reason:why });
        if(isInst()) await k9LoadInst(); else await k9LoadMine(); return;
      }
      if(b.hasAttribute("data-k9wd")){
        if(!confirm("अपना निवेदन/प्रस्ताव वापस लें?")) return;
        await call("declineOrWithdraw",{ enrollId:b.getAttribute("data-k9wd") });
        if(isInst()) await k9LoadInst(); else await k9LoadMine(); return;
      }
      if(b.hasAttribute("data-k9fee")){
        var amt=prompt("रक़म (₹) लिखें:"); if(!amt) return;
        var nt=prompt("नोट (जैसे: पहली किस्त) — ख़ाली भी चलेगा:")||"";
        var fr=await call("recordFee",{ enrollId:b.getAttribute("data-k9fee"), amountRupees:Number(amt), note:nt });
        say(true,"🧾 फीस दर्ज — रसीद "+fr.data.receiptNo); await k9LoadInst(); return;
      }
      if(b.id==="instShareCopy"){
        try{ await navigator.clipboard.writeText((EXT_REG&&EXT_REG.regNo)||""); say(true,"📋 ID copy हुई।"); }
        catch(e){ say(false,"copy नहीं हुई — ID हाथ से लिखें।"); }
        return;
      }
    }catch(e){
      b.disabled=false;
      say(false,"नहीं हुआ: "+((e&&e.message)||e));
    }
  });

  /* ───── 🪪 परिचय-पत्र designer (device-local — फ़ोटो कहीं नहीं जाती) ───── */
  var ID_IMG=null;
  function rr(x,px,py,pw,ph,r){ x.beginPath(); x.moveTo(px+r,py); x.arcTo(px+pw,py,px+pw,py+ph,r);
    x.arcTo(px+pw,py+ph,px,py+ph,r); x.arcTo(px,py+ph,px,py,r); x.arcTo(px,py,px+pw,py,r); x.closePath(); }
  function idDraw(){
    var cv=$("idCanvas"); if(!cv) return;
    var x=cv.getContext("2d"), W=cv.width, H=cv.height;
    var name=($("idName")&&$("idName").value.trim())||"नाम";
    var role=($("idRole")&&$("idRole").value.trim())||"";
    var no=($("idNo")&&$("idNo").value.trim())||"";
    var isStu=($("idWho")&&$("idWho").value==="student");
    var inst=rb((EXT_REG&&((EXT_REG.formFields&&(EXT_REG.formFields.center_name||EXT_REG.formFields.workshop_name))||EXT_REG.name_local))||"ACS केंद्र");
    x.clearRect(0,0,W,H);
    /* कार्ड — गोल-कोना, हल्की छाया-पट्टी */
    rr(x,6,6,W-12,H-12,34); x.fillStyle="#0B1F3A"; x.fill();
    /* सजावट: दाएँ-ऊपर सोने की बड़ी चाप + हरी पतली चाप */
    x.save(); rr(x,6,6,W-12,H-12,34); x.clip();
    x.beginPath(); x.arc(W-40,10,190,0,7); x.strokeStyle="rgba(249,168,37,.28)"; x.lineWidth=46; x.stroke();
    x.beginPath(); x.arc(W-40,10,255,0,7); x.strokeStyle="rgba(46,125,50,.30)"; x.lineWidth=16; x.stroke();
    /* watermark */
    x.save(); x.translate(W/2,H/2); x.rotate(-0.32);
    x.font="800 150px sans-serif"; x.fillStyle="rgba(245,247,250,.05)"; x.textAlign="center";
    x.fillText("ACS™",0,50); x.restore();
    /* ऊपर तिरंगा-रेखा */
    var g=x.createLinearGradient(0,0,W,0); g.addColorStop(0,"#F9A825"); g.addColorStop(.5,"#F5F7FA"); g.addColorStop(1,"#2E7D32");
    x.fillStyle=g; x.fillRect(6,6,W-12,12);
    /* header — brand */
    x.fillStyle="#F5F7FA"; x.textAlign="left"; x.font="800 30px 'Noto Sans Devanagari',sans-serif";
    x.fillText("अप्लाइड कंप्यूटर स्कूल™",44,62);
    x.fillStyle="#9fb3cc"; x.font="700 19px sans-serif"; x.fillText("acslearn.com",44,90);
    /* बड़ी पहचान-पट्टी: किसका कार्ड */
    x.fillStyle="#F9A825"; rr(x,W-268,34,224,44,22); x.fill();
    x.fillStyle="#0B1F3A"; x.font="800 22px 'Noto Sans Devanagari',sans-serif"; x.textAlign="center";
    x.fillText(isStu?"🎓 विद्यार्थी परिचय-पत्र":"👨‍🏫 Staff परिचय-पत्र", W-156, 64); x.textAlign="left";
    /* फ़ोटो — गोल चौखट + gradient-ring (DP-नीति) */
    var pcx=150, pcy=300, prd=104;
    var rg=x.createLinearGradient(pcx-prd,pcy-prd,pcx+prd,pcy+prd);
    rg.addColorStop(0,"#F9A825"); rg.addColorStop(.55,"#2E7D32"); rg.addColorStop(1,"#1565C0");
    x.beginPath(); x.arc(pcx,pcy,prd+9,0,7); x.fillStyle=rg; x.fill();
    x.beginPath(); x.arc(pcx,pcy,prd,0,7); x.fillStyle="#F5F7FA"; x.fill();
    x.save(); x.beginPath(); x.arc(pcx,pcy,prd,0,7); x.clip();
    if(ID_IMG){ var r0=Math.max((prd*2)/ID_IMG.width,(prd*2)/ID_IMG.height),
        sw=(prd*2)/r0, sh=(prd*2)/r0*0+ (prd*2)/r0, sx=(ID_IMG.width-sw)/2, sy=(ID_IMG.height-sh)/2;
      x.drawImage(ID_IMG,sx,sy,sw,sh,pcx-prd,pcy-prd,prd*2,prd*2); }
    else{ x.fillStyle="#9fb3cc"; x.font="800 120px sans-serif"; x.textAlign="center";
      x.fillText((name[0]||"A"),pcx,pcy+42); x.textAlign="left"; }
    x.restore();
    /* ब्योरा */
    var tx=300, ty=210;
    x.fillStyle="#F5F7FA"; x.font="800 44px 'Noto Sans Devanagari',sans-serif";
    x.fillText(name.slice(0,18),tx,ty);
    if(role){ x.fillStyle="#F9A825"; x.font="700 27px 'Noto Sans Devanagari',sans-serif";
      x.fillText((isStu?"📚 ":"🧑‍💼 ")+role.slice(0,28),tx,ty+46); }
    x.fillStyle="#cdd9ea"; x.font="700 25px monospace";
    if(no) x.fillText("🪪 "+no,tx,ty+96);
    /* केंद्र-पंक्ति — Founder-आदेश: केंद्र का नाम साफ़ दिखे */
    x.fillStyle="#F5F7FA"; x.font="700 24px 'Noto Sans Devanagari',sans-serif";
    x.fillText("🏫 "+inst.slice(0,30),tx,ty+146);
    x.fillStyle="#9fb3cc"; x.font="700 21px 'Noto Sans Devanagari',sans-serif";
    x.fillText("📅 वैध: जारी-तिथि से 365 दिन",tx,ty+188);
    /* नीचे सुनहरी पट्टी */
    x.fillStyle="#F9A825"; x.fillRect(6,H-58,W-12,52);
    x.fillStyle="#0B1F3A"; x.font="800 22px 'Noto Sans Devanagari',sans-serif"; x.textAlign="center";
    x.fillText("From Village to World 🌍 · "+inst.slice(0,26), W/2, H-24); x.textAlign="left";
    var out=$("idPrev"), sv=$("idSave");
    if(out){ out.src=cv.toDataURL("image/png"); out.style.display=""; }
    if(sv){ sv.href=cv.toDataURL("image/png"); sv.style.display="inline-block"; }
  }
  LAZY["pnl-idcard"]=function(){
    var who=$("idWho"); if(!who||who._k9) return; who._k9=true;
    who.onchange=function(){
      var w=$("idStuWrap"); if(!w) return;
      if(who.value==="student"){
        w.style.display="";
        var ss=$("idStuSel"); if(ss && ss.options.length<=1){
          EN_ALL.filter(function(e){return e.status==="active";}).forEach(function(e){
            var o=document.createElement("option"); o.value=e._id;
            o.textContent=rb(e.studentName)+" · "+e.studentRegNo; ss.appendChild(o); });
          ss.onchange=function(){
            var e=EN_ALL.find(function(z){return z._id===ss.value;}); if(!e) return;
            $("idName").value=rb(e.studentName); $("idNo").value=e.studentRegNo;
            $("idRole").value=rb(e.courseName).slice(0,26); };
        }
      } else w.style.display="none";
    };
    var ph=$("idPhoto");
    if(ph) ph.onchange=function(){
      var f=ph.files&&ph.files[0]; if(!f) return;
      var img=new Image(); img.onload=function(){ ID_IMG=img; };
      img.src=URL.createObjectURL(f);
    };
    var mk=$("idMake"); if(mk) mk.onclick=function(){ try{ idDraw(); }catch(e){
      var m=$("idMsg"); if(m){m.className="msg err";m.textContent="कार्ड नहीं बना: "+((e&&e.message)||e);} } };
  };
})(); /* k9-block end */
