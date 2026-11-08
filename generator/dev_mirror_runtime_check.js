/* dev_mirror_runtime_check.js v1.1 — universal v2.2 नक़ली-DOM परीक्षा
   चलाना: repo-रूट से  node generator/dev_mirror_runtime_check.js */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const SRC_ALL = fs.readFileSync(path.join(ROOT, "assets/acs-universal.js"), "utf8");
const cut = SRC_ALL.indexOf("/* ============================================================\n   udyam-intro");
const SRC = cut > 0 ? SRC_ALL.slice(0, cut) : SRC_ALL;
const IDS = ["acsTagline","acsWarn","acsAddr","acsLogin","acsMenuList","acsFooterMenu","acsName","acsFootName","acsCopy","acsFootTag","acsTrust","acsCert","acsPhone","acsEmail","acsLogo","acsWa","acsBtnLang","acsBtnMenu","acsDrawerTitle","acsOrigLang","acsFbCertTitle","acsFbContactTitle"];
function boot(pathname){
  const els = {};
  function el(id){ if(!els[id]) els[id]={id,textContent:"BAKED_"+id,innerHTML:"BAKED_"+id,children:[],
    style:{cssText:""},classList:{add(){},remove(){},toggle(){}},appendChild(c){this.children.push(c)},
    href:"BAKED_href",onclick:null,parentNode:{insertBefore(n){els.__legal=n}}}; return els[id]; }
  IDS.forEach(el);
  global.document = { documentElement:{style:{setProperty(){}}}, readyState:"complete",
    getElementById:(id)=>el(id),
    createElement:(t)=>({tag:t,children:[],style:{},set innerHTML(v){this._h=v},get innerHTML(){return this._h||""},
      appendChild(c){this.children.push(c)},href:"",className:"",onclick:null}),
    addEventListener(){}, querySelectorAll:()=>[] };
  global.location = {pathname};
  global.window = { ACS_CONFIG:{org:{name_hi:"अ",name_en:"A",tagline_hi:"हिं-TAG",tagline_en:"EN-TAG",
      tagline_full_hi:"हफ",tagline_full_en:"EF",trust_hi:"ट",trust_en:"T",trust_short:"F",iso:"ISO",
      trust_site:"s",phone:"+91-9",email:"a@b.c",address_hi:"पता",address_en:"Ad",whatsapp:"w",logo:"logo.png"},colors:{}},
    ACS_LINKS:{build:(l)=>[{icon:"🏠",href:"/",text:(l==="hi"?"होम":"Home")}],
      login:{icon:"🔑",href:"/dashboard/",label:{hi:"लॉगिन",en:"Login / Dashboard"}}} };
  eval(SRC);
  return els;
}
function A(c, m){ if(!c) throw new Error("FAIL: "+m); console.log("✅", m); }
let e = boot("/");
A(e.acsTagline.textContent === "हिं-TAG", "hi-boot भराई");
A(e.__legal.innerHTML.indexOf("रिफंड") >= 0, "hi legal हिंदी");
e = boot("/en/");
A(e.acsTagline.textContent === "EN-TAG", "en-boot भराई");
A(e.__legal.innerHTML.indexOf("Refund Policy") >= 0, "en legal English");
e = boot("/zh/");
["acsTagline","acsWarn","acsAddr","acsBtnLang","acsOrigLang","acsFootTag"].forEach(id =>
  A(e[id].textContent === "BAKED_"+id, "mirror "+id+" अछूता"));
A(e.acsLogin.innerHTML === "BAKED_acsLogin", "mirror login अछूता");
A(e.acsMenuList.children[0].innerHTML.indexOf("Home") >= 0, "mirror menu en");
A(e.__legal.innerHTML.indexOf("Refund Policy") >= 0, "mirror legal en");
["/ur/","/mr/","/te/"].forEach(p => { const x = boot(p);
  A(x.acsTagline.textContent === "BAKED_acsTagline", "mirror-boot "+p); });
e = boot("/zhao/");
A(e.acsTagline.textContent === "हिं-TAG", "/zhao/ अनजान-पथ = hi");
/* isHome: ← बटन भाषा-होम पर न बने */
const hv = SRC;
function homeOf(P){
  const segH = (P.split("/")[1]||"");
  const T = {}; hv.match(/var ACS_LANG_HOMES = \{([^}]+)\}/)[1].split(",").forEach(x=>T[x.split(":")[0].trim()]=1);
  return (P === "/" || P === "/index.html" || (T[segH] && (P === "/"+segH+"/" || P === "/"+segH+"/index.html")));
}
A(homeOf("/") && homeOf("/en/") && homeOf("/zh/index.html") && homeOf("/te/"), "isHome: भाषा-होम = होम");
A(!homeOf("/career.html") && !homeOf("/courses/hi/welding/") && !homeOf("/zhao/"), "isHome: बाक़ी पेज होम नहीं");
console.log("🏁 runtime 15+ जाँचें पास");
