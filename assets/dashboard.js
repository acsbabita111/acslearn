/* ════════════════════════════════════════════════════════════
   dashboard.js — 31-dashboard परिवार का एकमात्र साझा JS (परत-1) · ES-module
   v4.5 · 19-Jul-2026 — null-सुरक्षित setters (setTxt/setHTML): guard-render व
          loadRegistration की profile-भराई अब किसी सजावटी element के ग़ायब होने
          (बासी-cache/CDN-मिश्रण) पर पूरा dashboard नहीं गिराती — console-चेतावनी
          + बाक़ी सब चालू। fillPubCard भी null-सुरक्षित। तर्क/पाठ बाक़ी byte-अछूता।
   v4.4.1 · 19-Jul-2026 — showLoadError में अब e.stack की पहली 3 पंक्तियाँ भी दिखतीं
          (फ़ाइल:लाइन-नंबर समेत) — अगली बार कोई crash आए तो पहले ही प्रयास में
          सटीक जड़ पकड़ में आए, कोई अटकल/और screenshot-चक्र न चाहिए पड़े।
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
function fillPubCard(name, photoUrl, desigLabel, area, district, state){
  setTxt("pubName",  name || "—");
  setTxt("pubDesig", desigLabel || "—");
  setTxt("pubArea",  area || "—");
  setTxt("pubDist",  district || "—");
  setTxt("pubState", state || "—");
  if(photoUrl){
    const im=$("pPhoto"); if(!im) return;
    im.src=photoUrl;
    im.onload=()=>{ im.style.display="block"; const fb=$("pPhotoFb"); if(fb) fb.style.display="none"; };
  }
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
const TEAM_PANEL_IDS = ["pnl-apps","pnl-exo","pnl-team","pnl-tasks","pnl-reports","pnl-badgeq"];
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
function docChips(docs){
  const keys = Object.keys(docs||{});
  if(keys.length===0) return "";
  return keys.map(k=>{
    const d = docs[k];
    const u = (typeof d==="string") ? d : (d && d.url);
    if(!u) return '<span class="doc" style="margin:4px 6px 0 0;color:#B71C1C">📄 '+k+' (upload विफल)</span>';
    return '<a class="doc" style="margin:4px 6px 0 0" target="_blank" rel="noopener" href="'+u+'">📄 '+k+'</a>';
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
      '<div class="r1"><span class="nm">'+(a.name_local||a.name_roman||a.name||a.fullName||"—")+'</span>'+
      '<span class="rg">('+(a.regNo||a._id)+')</span>'+stChip+
      '<span class="chip lvl">'+lvl+'</span></div>'+
      '<div class="r2">📅 '+fmtDate(a.createdAt)+(area?(' · 📍 '+area):'')+(a.email?(' · ✉️ '+a.email):'')+'</div>'+
      '<div class="more"><div class="mrow"><b>Mobile:</b> '+(a.phone||a.mobile||"—")+'</div>'+
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
      '<div class="r1"><span class="nm">'+(m.name_local||m.name_roman||m.name||m.email||"—")+'</span>'
      + '<span class="pill">'+mxLabel(d)+'</span>'+stChip
      + (m.level && String(m.level).toUpperCase()!==mxLabel(d).toUpperCase() ? '<span class="chip lvl">'+String(m.level).toUpperCase()+'</span>':'')+'</div>'
      + (holdRec?'<div class="hres">कारण: '+(holdRec.reason||"—")+'</div>':'')
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
        .map(m=>'<option value="'+m._uid+'">'+(m.name_local||m.name_roman||m.name||m.email||m._uid)+' — '+mxLabel(String(m.designation||"").toLowerCase())+'</option>').join("");
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
    .map(m=>'<option value="'+m._uid+'">'+(m.name_local||m.name_roman||m.name||m.email||m._uid)+' — '+mxLabel(String(m.designation||"").toLowerCase())+'</option>').join("");
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
      return '<div class="mem"><div class="r1"><span class="nm">'+(t.title||"—")+'</span>'+stChip+'<span class="rg">'+who+'</span></div>'
        + (t.detail?'<div class="r2">'+t.detail+'</div>':'')
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
      +'<div class="r2">'+(t.text||"")+'</div></div>').join("");
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
  const homeDistE = (reg.rm_districts && reg.rm_districts.length ? reg.rm_districts[0] : (reg.district||""));
  const pubAreaE = [reg.country, reg.state, (reg.rm_districts&&reg.rm_districts.join)?reg.rm_districts.join(", "):""].filter(Boolean).join(" · ");
  fillPubCard(whoName, reg.photo_public || "", ROLE_LABEL, pubAreaE, homeDistE, reg.state||"");

  /* दस्तावेज़-chips */
  const docs = reg.documents || reg.docs || {};
  const wrap = $("docWrap"); wrap.innerHTML = docChips(docs);
  setTxt("docNote", Object.keys(docs).length ? "" : "आवेदन में कोई दस्तावेज़-link दर्ज नहीं।");

  /* g2-सफ़र नोट */
  setHTML("tlWrap", '<div class="note">बाहरी-role approval-श्रृंखला (g2) अगले दौर में — तब यहाँ चौकी-दर-चौकी live स्थिति दिखेगी।</div>');
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
      row.className="mem";
      const meta=[c.duration?("⏱️ "+noSq(c.duration)):"", c.lessons?("📄 "+c.lessons+" पाठ"):""].filter(Boolean).join(" · ");
      const right = c.url
        ? '<a class="abtn ok" style="display:inline-block;text-decoration:none" href="'+c.url+'">📖 पढ़ें (मुफ़्त)</a>'
        : '<span class="note" style="margin-top:0">पाठ जल्द जुड़ेंगे</span>';
      row.innerHTML = '<div class="r1"><span class="nm">'+noSq(c.name_hi||c.name_en||"—")+'</span></div>'
                    + '<div class="r2">'+meta+'</div>' + right;
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

  LAZY["pnl-courses"] = function(){
    if(CRS_LOADED) return; CRS_LOADED=true;
    const box=$("crsList"); if(box) box.innerHTML='<span class="note">कोर्स-सूची आ रही है…</span>';
    const sc=document.createElement("script");
    sc.src="/assets/courses_data.js";
    sc.onload=function(){ crsCollect(); if(CRS_ALL.length===0){ if(box) box.innerHTML='<span class="note">कोर्स-सूची अभी ख़ाली है — जल्द जुड़ेगी।</span>'; return; } CRS_SHOWN=0; crsDrawMore(); };
    sc.onerror=function(){ CRS_LOADED=false; if(box) box.innerHTML='<span class="note" style="color:#B71C1C">कोर्स-सूची नहीं खुली — network जाँचकर पैनल दोबारा खोलें।</span>'; };
    document.body.appendChild(sc);
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
    if(!pinFromReg()){ const pr=$("badgePinRow"); if(pr) pr.style.display="block"; }
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
        st.textContent="✅ इस भूमिका का आपका बैज सक्रिय है"+till+"।"; st.style.color="#1b4d20"; btn.style.display="none";
        markPhotoBadge();
        const pr=$("badgePinRow"); if(pr) pr.style.display="none"; return;
      }
      if(latest && latest.status==="paid"){
        st.textContent="⏳ भुगतान हो चुका — RM-सत्यापन जारी है। स्वीकृति पर बैज सक्रिय हो जाएगा।";
        st.style.color="#8a5a00"; btn.style.display="none"; return;
      }
      if(latest && latest.rmStatus==="rejected"){
        st.textContent="⚠️ पिछला बैज-आवेदन अस्वीकृत हुआ था — आप दोबारा ले सकते हैं।";
        st.style.color="#B71C1C"; btn.style.display="inline-block"; return;
      }
      st.textContent="अभी इस भूमिका में आपका बैज नहीं है (लेना वैकल्पिक)।"; st.style.color="#555";
      btn.style.display="inline-block";
    }catch(e){
      /* status न मिले (rules/network) तो भी बटन दिखे — काम न रुके */
      st.textContent="बैज लेना वैकल्पिक है।"; st.style.color="#555"; btn.style.display="inline-block";
    }
  }
  LAZY["pnl-badge"] = loadBadgeStatus;

  /* (Founder-आदेश 19-Jul) बैज सक्रिय हो तो प्रोफ़ाइल-फ़ोटो के किनारे हरा ✔-निशान */
  function markPhotoBadge(){
    if(document.getElementById("pubBadgeTick")) return;
    const im=$("pPhoto"), fb=$("pPhotoFb");
    const holder=(im&&im.parentElement)||(fb&&fb.parentElement);
    if(!holder) return;
    holder.style.position="relative";
    const t=document.createElement("span");
    t.id="pubBadgeTick"; t.title="Verified Badge — सत्यापित (Green Tick)";
    t.textContent="✔";
    t.style.cssText="position:absolute;bottom:6px;right:6px;width:34px;height:34px;"+
      "border-radius:50%;background:#2E7D32;color:#fff;display:flex;align-items:center;"+
      "justify-content:center;font-size:20px;font-weight:800;border:3px solid #fff;"+
      "box-shadow:0 1px 4px rgba(0,0,0,.35);z-index:3";
    holder.appendChild(t);
  }
  /* boot पर एक हल्की जाँच — पैनल खोले बिना भी निशान दिखे */
  window.__acsBadgeMark = async function(){
    try{
      const u=auth.currentUser; if(!u) return;
      const qs=await getDocs(query(collection(db,"payments"), where("uid","==",u.uid)));
      let ok=false;
      qs.forEach(d=>{ const p=d.data()||{};
        if(p.purpose==="badge" && String(p.role||"jobseeker").toLowerCase()===BADGE_ROLE
           && p.status==="paid" && p.rmStatus==="approved") ok=true; });
      if(ok) markPhotoBadge();
    }catch(e){}
  };

  async function buyBadge(){
    const btn=$("badgeBuyBtn"), msg=$("badgeMsg");
    if(!btn) return;
    /* पिन: पहले registration-पते से; न हो तो पैनल के पिन-खाने से (server भी यही क्रम मानता है) */
    let pin = pinFromReg();
    if(!pin){
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
      const res=await httpsCallable(functions,"createBadgeOrder")({ role:BADGE_ROLE, pincode:pin });
      const o=(res&&res.data)||{};
      if(!o.ok||!o.orderId) throw new Error("order नहीं बना");
      const rupee=Math.round((o.amount||0)/100);
      const tierHi=TIER_HI[o.tier]||o.tier||"";
      let line="आपका क्षेत्र: "+tierHi+" · शुल्क ₹"+rupee+" (365 दिन)।";
      if(o.ageFee && o.ageFee>0){
        line="आपका क्षेत्र: "+tierHi+" · मूल शुल्क ₹"+Math.round(o.baseAmount/100)+
             " + उम्र-fee ₹"+Math.round(o.ageFee/100)+" = कुल ₹"+rupee+" (365 दिन)।";
      }
      const go=confirm(line+"\n\n"+
        "भुगतान के बाद RM आपकी जानकारी जाँचेंगे। सत्यापन असफल हुआ तो 30% जाँच-शुल्क कटेगा।\n\nभुगतान करें?");
      if(!go){ btn.disabled=false; if(msg) msg.textContent=""; return; }
      if(msg) msg.textContent="भुगतान-पृष्ठ खुल रहा है…";
      await loadRazorpay();
      const rzp=new window.Razorpay({
        key:o.keyId, order_id:o.orderId, amount:o.amount, currency:o.currency||"INR",
        name:o.name||"Applied Computer School", description:"Verified Badge (365 दिन)",
        prefill:{ email:(auth.currentUser&&auth.currentUser.email)||"" },
        theme:{ color:"#0B1F3A" },
        handler: async function(r){
          if(msg){ msg.className="msg"; msg.textContent="भुगतान की पुष्टि हो रही है…"; }
          try{
            await httpsCallable(functions,"verifyBadgePayment")({
              razorpay_order_id:r.razorpay_order_id,
              razorpay_payment_id:r.razorpay_payment_id,
              razorpay_signature:r.razorpay_signature });
            if(msg){ msg.className="msg ok"; msg.textContent="✅ भुगतान सफल — अब RM-सत्यापन होगा।"; }
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
          '<div class="r1"><span class="nm">'+(it.name||"—")+' · '+(it.regNo||"—")+'</span></div>'
        + '<div class="r2">भूमिका: '+(ROLE_HI[it.role]||it.role)+' · क्षेत्र: '+(TIER_HI[it.tier]||it.tier||"—")
        + ' (पिन '+(it.pin||"—")+') · राशि: ₹'+(it.amountRupees||0)+' · भुगतान: '+dt+'</div>'
        + '<div class="r2">राज्य: '+(it.state||"—")+' · वांछित जिला: '+(it.district||"—")
        + (it.mobile? ' · 📱 '+it.mobile : '')+'</div>'
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
