/* ============================================================
   dev_runtime_check.js — dashboard.js का runtime-परीक्षा-यंत्र (dev-tool)
   v1.2 · 16-Jul-2026 (काम-6 चरण-6) — + नक़ली पैनल-DOM व dual-घर (volunteer)
          की दोनों-दिशा परीक्षाएँ: ext-boot में team-पैनल छिपें, team-boot में सेवा-पैनल
   v1.1 · 16-Jul-2026 (काम-6 चरण-2) — + jobseeker व entrepreneur boot-परीक्षाएँ
   v1.0 · 16-Jul-2026 (काम-6 चरण-1)
   ------------------------------------------------------------
   नियम (v2.3-ख2, स्थायी): assets/dashboard.js के हर बदलाव पर upload से
   पहले यह परीक्षा पास अनिवार्य — सिर्फ़ node --check (syntax) काफ़ी नहीं।
   तरीक़ा: firebase-imports को नक़ली stubs से बदलकर, नक़ली DOM/window में
   दो boot चलाना — (1) external (student) · (2) team (hq_admin)।
   चलाना: repo-रूट से → node generator/dev_runtime_check.js
   यह फ़ाइल कभी browser पर नहीं जाती — सिर्फ़ dev-जाँच।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SRC = fs.readFileSync(path.join(__dirname, "..", "assets", "dashboard.js"), "utf8");

/* ---- import-पंक्तियाँ काटो (नक़ली stubs नीचे sandbox में) ---- */
const body = SRC.split("\n").filter(l => !/^import\s/.test(l)).join("\n");

/* ---- नक़ली DOM ---- */
function makeEl(id){
  const el = {
    _id:id, _cls:{}, style:{}, textContent:"", title:"", value:"", disabled:false,
    innerHTML:"", src:"", onload:null, onerror:null,
    classList:{
      add:(c)=>{el._cls[c]=true;}, remove:(c)=>{delete el._cls[c];},
      toggle:(c,f)=>{ if(f===undefined) el._cls[c]?delete el._cls[c]:el._cls[c]=true; else f?el._cls[c]=true:delete el._cls[c]; },
      contains:(c)=>!!el._cls[c]
    },
    children:[],
    appendChild:(ch)=>{ el.children.push(ch); if(ch._tag==="script" && typeof ch.onload==="function"){ /* कोर्स-script नक़ली-load नहीं */ } return ch; },
    remove:()=>{}, setAttribute:()=>{}, getAttribute:()=>null,
    addEventListener:()=>{}, querySelector:()=>null, querySelectorAll:()=>[],
    closest:()=>null
  };
  return el;
}
const ELS = {};
let CUR_PANELS = [];
function makePanel(id, nav){
  const el = makeEl(id); el.id = id; el._attrs = {"data-nav": nav};
  el.getAttribute = (k)=> (el._attrs && el._attrs[k]) || null;
  ELS[id] = el; return el;
}
const doc = {
  getElementById:(id)=>{ if(!ELS[id]) ELS[id]=makeEl(id); return ELS[id]; },
  querySelectorAll:(sel)=> (sel===".panel" ? CUR_PANELS : []),
  addEventListener:()=>{},
  createElement:(tag)=>{ const e=makeEl("_"+tag+Math.random()); e._tag=tag; return e; },
  body: makeEl("_body")
};

function freshSandbox(cfg, fakes){
  for(const k of Object.keys(ELS)) delete ELS[k];
  CUR_PANELS = (fakes.panels||[]).map(p=>makePanel(p[0], p[1]));
  let authCb = null;
  const sandbox = {
    console, setTimeout, clearTimeout,
    document: doc,
    alert:()=>{}, confirm:()=>true,
    localStorage:{ getItem:()=>null, setItem:()=>{}, removeItem:()=>{} },
    location:{ href:"" },
    /* नक़ली firebase */
    initializeApp:()=>({}),
    getAuth:()=>({}), signOut:async()=>{},
    onAuthStateChanged:(a,cb)=>{ authCb=cb; },
    getFirestore:()=>({}),
    doc:(db,col,id)=>({_col:col,_id:id}),
    getDoc:async(ref)=>{ const d=(fakes.docs||{})[ref._col]; return { exists:()=>!!d, data:()=>d }; },
    getDocs:async(q)=>{ const rows=(fakes.lists||{})[q._col]||[]; return { forEach:(f)=>rows.forEach(r=>f({ id:r._id||"x", data:()=>r })) }; },
    collection:(db,col)=>({_col:col}),
    query:(c)=>({_col:c._col}), where:()=>({}), orderBy:()=>({}), limit:()=>({}), startAfter:()=>({}),
    onSnapshot:()=>(()=>{}),
    getFunctions:()=>({}),
    httpsCallable:()=>(async()=>({data:{sessionId:"sid-test"}})),
  };
  sandbox.scrollTo = ()=>{};
  sandbox.window = sandbox;
  sandbox.window.ACS_DASH = cfg;
  sandbox.window.ACS_DESIGNATIONS = {
    teams:[{key:"hq_admin",label:"Admin (प्रशासन)",public_label:"Admin (प्रशासन)",level:"hq"},
           {key:"rm_volunteer",label:"स्वयंसेवक",public_label:"स्वयंसेवक",level:"rm"},
           {key:"founder",label:"Founder",public_label:"Founder"}],
    cards:[{key:"student",label:"कोचिंग-प्रशिक्षु",public_label:"कोचिंग-प्रशिक्षु"},
           {key:"volunteer",label:"स्वयंसेवक (Volunteer)",public_label:"स्वयंसेवक (Volunteer)"}]
  };
  vm.createContext(sandbox);
  vm.runInContext(body, sandbox, { filename:"dashboard.js(stubbed)" });
  return { sandbox, fire:async(user)=>{ await authCb(user); } };
}

const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
let fails = 0;
function check(name, ok){ console.log((ok?"✅":"❌")+" "+name); if(!ok) fails++; }
const E = (id)=>doc.getElementById(id);

(async ()=>{
  /* ═ परीक्षा-1: external-boot (student, provisional-status) ═ */
  {
    const t = freshSandbox(
      { mode:"external", allowed:["student"], extRoles:[], roleLabel:"कोचिंग-प्रशिक्षु", home:"/dashboard/student/" },
      { lists:{ registrations:[{ authUid:"u1", role:"student", status:"provisional",
          name_local:"टेस्ट विद्यार्थी", regNo:"ACS-T-001", dob:"2012-01-15",
          country:"India", state:"Bihar", district:"Khagaria", email:"t@x", documents:{} }] } }
    );
    await t.fire({ uid:"u1", email:"t@x" });
    await sleep(20);
    check("student: appView खुला", !E("appView")._cls["hidden"]);
    check("student: provisional-पर्दा नहीं (v1.3 नियम)", !E("provBar")._cls["on"]);
    check("student: pill में 'अस्थायी' नहीं", E("desigPill").textContent.indexOf("अस्थायी")===-1);
    check("student: नाम भरा", E("pName").textContent==="टेस्ट विद्यार्थी");
    check("student: कार्य-क्षेत्र में Bihar", (E("pArea").textContent||"").indexOf("Bihar")>-1);
    check("student: विद्यार्थी-इंजन जागा (__acsExtReady)", typeof t.sandbox.window.__acsExtReady==="function");
    check("student: Guardian-नोट (उम्र<18)", (E("stGuard").textContent||"").indexOf("Guardian")>-1);
  }

  /* ═ परीक्षा-2: team-boot (hq_admin, active) — v4.0.1 ReferenceError पहरेदारी ═ */
  {
    const t = freshSandbox(
      { mode:"team", allowed:["hq_admin","founder"], extRoles:[], roleLabel:"", home:"/dashboard/admin/" },
      { docs:{ teams:{ designation:"hq_admin", active:true, name_local:"बाबीता",
          level:"hq", country:"India", state:"Bihar", region:["Khagaria"], email:"a@x" } },
        lists:{ registrations:[{ authUid:"u2", role:"team", status:"approved", regNo:"ACS-T-002",
          createdAt:null, documents:{} }] } }
    );
    await t.fire({ uid:"u2", email:"a@x" });
    await sleep(20);
    check("admin: appView खुला (जाँच-अटकाव नहीं)", !E("appView")._cls["hidden"]);
    check("admin: pill में 'अस्थायी' नहीं (active)", E("desigPill").textContent.indexOf("अस्थायी")===-1);
    check("admin: teams का country/state/region पढ़ा", (E("pArea").textContent||"").indexOf("Khagaria")>-1);
  }

  /* ═ परीक्षा-2ब: external-boot (jobseeker, 17 साल) — v4.2 प्रशिक्षु-इंजन ═ */
  {
    const t = freshSandbox(
      { mode:"external", allowed:["jobseeker"], extRoles:[], roleLabel:"नौकरी-प्रशिक्षु", home:"/dashboard/jobseeker/" },
      { lists:{ registrations:[{ authUid:"u4", role:"jobseeker", status:"provisional",
          name_local:"टेस्ट नौकरी", regNo:"ACS-T-004", dob:"2009-06-01",
          country:"India", state:"Bihar", email:"j@x", documents:{} }] } }
    );
    await t.fire({ uid:"u4", email:"j@x" });
    await sleep(20);
    check("jobseeker: appView खुला", !E("appView")._cls["hidden"]);
    check("jobseeker: provisional-पर्दा नहीं", !E("provBar")._cls["on"]);
    check("jobseeker: Guardian-नोट में 18-नियम", (E("stGuard").textContent||"").indexOf("18 साल से")>-1);
  }

  /* ═ परीक्षा-2स: external-boot (entrepreneur, 17 साल) ═ */
  {
    const t = freshSandbox(
      { mode:"external", allowed:["entrepreneur"], extRoles:[], roleLabel:"उद्योग-प्रशिक्षु", home:"/dashboard/entrepreneur/" },
      { lists:{ registrations:[{ authUid:"u5", role:"entrepreneur", status:"provisional",
          name_local:"टेस्ट उद्यमी", regNo:"ACS-T-005", dob:"2009-06-01",
          country:"India", state:"Bihar", email:"e@x", documents:{} }] } }
    );
    await t.fire({ uid:"u5", email:"e@x" });
    await sleep(20);
    check("entrepreneur: appView खुला", !E("appView")._cls["hidden"]);
    check("entrepreneur: provisional-पर्दा नहीं", !E("provBar")._cls["on"]);
    check("entrepreneur: Guardian-नोट में Tour-नियम", (E("stGuard").textContent||"").indexOf("Industrial Tour")>-1);
  }

  /* ═ परीक्षा-3: external-boot (g2 role, जैसे vendor) — पुराना बर्ताव अछूता ═ */
  {
    const t = freshSandbox(
      { mode:"external", allowed:["vendor"], extRoles:[], roleLabel:"विक्रेता (Vendor)", home:"/dashboard/vendor/" },
      { lists:{ registrations:[{ authUid:"u3", role:"vendor", status:"provisional",
          name_local:"टेस्ट विक्रेता", regNo:"ACS-T-003", email:"v@x", documents:{} }] } }
    );
    await t.fire({ uid:"u3", email:"v@x" });
    await sleep(20);
    check("vendor: appView खुला", !E("appView")._cls["hidden"]);
    check("vendor: provisional-पर्दा है (g2 यथावत)", !!E("provBar")._cls["on"]);
    check("vendor: pill में 'अस्थायी' है (g2 यथावत)", E("desigPill").textContent.indexOf("अस्थायी")>-1);
  }

  /* ═ परीक्षा-4: dual-घर (volunteer) — external-boot: team-पैनल काम-सूची से बाहर ═ */
  const DUAL_PANELS = [
    ["pnl-profile","👤 मेरी प्रोफ़ाइल"],["pnl-apps","📥 आवेदन-पैनल"],["pnl-exo","🧭 पदेन-प्रभार"],
    ["pnl-team","👥 टीम-पैनल"],["pnl-tasks","🗂️ काम-पैनल"],["pnl-reports","📊 रिपोर्ट-चक्र"],
    ["pnl-status","🛤️ approval-स्थिति"],["pnl-seva","🤝 मेरा सेवा-काम"],
    ["pnl-volpath","🛤️ आगे का रास्ता"],["pnl-earn","💰 कमाई-नियम"]
  ];
  const DUAL_CFG = { mode:"team", allowed:["rm_volunteer","founder"], extRoles:["volunteer"],
                     roleLabel:"स्वयंसेवक (Volunteer)", home:"/dashboard/volunteer/" };
  {
    const t = freshSandbox(DUAL_CFG,
      { panels: DUAL_PANELS,
        lists:{ registrations:[{ authUid:"u6", role:"volunteer", status:"provisional",
          name_local:"टेस्ट स्वयंसेवक", regNo:"ACS-T-006", country:"India", state:"Bihar",
          email:"vo@x", documents:{} }] } }  /* teams-doc अनुपस्थित → external-fallback */
    );
    await t.fire({ uid:"u6", email:"vo@x" });
    await sleep(20);
    const navTexts = E("sideNav").children.map(c=>c.textContent);
    check("volunteer-ext: appView खुला (dual fallback)", !E("appView")._cls["hidden"]);
    check("volunteer-ext: provisional-पर्दा है (g2)", !!E("provBar")._cls["on"]);
    check("volunteer-ext: काम-सूची में सेवा-पैनल", navTexts.indexOf("🤝 मेरा सेवा-काम")>-1);
    check("volunteer-ext: team-पैनल छिपे", navTexts.indexOf("👥 टीम-पैनल")===-1 && navTexts.indexOf("📥 आवेदन-पैनल")===-1);
  }

  /* ═ परीक्षा-5: dual-घर — team-boot (rm_volunteer active): external-पैनल छिपें ═ */
  {
    const t = freshSandbox(DUAL_CFG,
      { panels: DUAL_PANELS,
        docs:{ teams:{ designation:"rm_volunteer", active:true, name_local:"टेस्ट टीम-स्वयंसेवक",
          level:"rm", country:"India", state:"Bihar", region:["Khagaria"], email:"vt@x" } },
        lists:{ registrations:[{ authUid:"u7", role:"volunteer", status:"approved",
          regNo:"ACS-T-007", documents:{} }] } }
    );
    await t.fire({ uid:"u7", email:"vt@x" });
    await sleep(20);
    const navTexts = E("sideNav").children.map(c=>c.textContent);
    check("volunteer-team: appView खुला", !E("appView")._cls["hidden"]);
    check("volunteer-team: pill में 'अस्थायी' नहीं (active)", E("desigPill").textContent.indexOf("अस्थायी")===-1);
    check("volunteer-team: काम-सूची में team-पैनल", navTexts.indexOf("👥 टीम-पैनल")>-1 && navTexts.indexOf("🗂️ काम-पैनल")>-1);
    check("volunteer-team: सेवा-पैनल छिपे", navTexts.indexOf("🤝 मेरा सेवा-काम")===-1);
    check("volunteer-team: प्रोफ़ाइल दोनों में", navTexts.indexOf("👤 मेरी प्रोफ़ाइल")>-1);
  }

  console.log(fails===0 ? "\n🏁 runtime-परीक्षा: सब पास ✅" : "\n🏁 runtime-परीक्षा: "+fails+" विफल ❌");
  process.exit(fails===0?0:1);
})().catch(e=>{ console.error("❌ यंत्र-त्रुटि:", e); process.exit(1); });
