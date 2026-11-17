/* dev_mirror_runtime_check.js v1.2 (17-Nov-2026: links.js के "labels" की जाँच जुड़ी; जिस भाषा की शब्द-तालिका है, वहाँ नामों में English शब्द की रोक भी) · v1.1 — universal v2.2 नक़ली-DOM परीक्षा
   चलाना: repo-रूट से  node generator/dev_mirror_runtime_check.js */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const SRC_ALL = fs.readFileSync(path.join(ROOT, "assets/acs-universal.js"), "utf8");
const cut = SRC_ALL.indexOf("/* ============================================================\n   udyam-intro");
const SRC = cut > 0 ? SRC_ALL.slice(0, cut) : SRC_ALL;
const IDS = ["acsTagline","acsWarn","acsAddr","acsLogin","acsMenuList","acsFooterMenu","acsName","acsFootName","acsCopy","acsFootTag","acsTrust","acsCert","acsPhone","acsEmail","acsLogo","acsWa","acsBtnLang","acsBtnMenu","acsDrawerTitle","acsOrigLang","acsFbCertTitle","acsFbContactTitle"];
const REAL_LINKS = require(path.join(ROOT, "assets/links.js"));
function boot(pathname, realLinks){
  const els = {};
  function el(id){ if(!els[id]) els[id]={id,textContent:"BAKED_"+id,innerHTML:"BAKED_"+id,children:[],
    style:{cssText:""},classList:{add(){},remove(){},toggle(){}},appendChild(c){this.children.push(c)},
    href:"BAKED_href",onclick:null,parentNode:{insertBefore(n){els.__legal=n}}}; return els[id]; }
  IDS.forEach(el);
  global.document = { documentElement:{style:{setProperty(){}}}, readyState:"complete",
    getElementById:(id)=>el(id),
    createElement:(t)=>({tag:t,children:[],style:{},set innerHTML(v){this._h=v},get innerHTML(){return this._h||""},
      appendChild(c){this.children.push(c)},href:"",className:"",onclick:null}),
    addEventListener(){}, querySelectorAll:(q)=>{ els.__q=(els.__q||[]).concat([q]); return [{ setAttribute(k,v){ els.__set=(els.__set||[]).concat([q+" "+k+"="+v]); } }]; } };
  global.location = {pathname};
  global.window = { ACS_CONFIG:{org:{name_hi:"अ",name_en:"A",tagline_hi:"हिं-TAG",tagline_en:"EN-TAG",
      tagline_full_hi:"हफ",tagline_full_en:"EF",trust_hi:"ट",trust_en:"T",trust_short:"F",iso:"ISO",
      trust_site:"s",phone:"+91-9",email:"a@b.c",address_hi:"पता",address_en:"Ad",whatsapp:"w",logo:"logo.png"},colors:{}},
    ACS_LINKS: realLinks ? REAL_LINKS : {build:(l)=>[{icon:"🏠",href:"/",text:(l==="hi"?"होम":"Home")}],
      login:{icon:"🔑",href:"/dashboard/",label:{hi:"लॉगिन",en:"Login / Dashboard"}}} };
  els.acsMenuList.children = []; els.acsFooterMenu.children = [];
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
/* v1.2 (17-Nov-2026, कन्नड़ क-4): links.js के "labels" वाली भाषा के घर पर मेन्यू और नीति की कड़ियाँ उसी भाषा में; बाक़ी पर पहले जैसा */
const LB = REAL_LINKS.labels || {}, KEYS = REAL_LINKS.menu.map(m => m.key);
A(Object.keys(LB).length >= 1 && !!LB.kn, "links.js: labels में कन्नड़ की पंक्ति");
Object.keys(LB).forEach(function (lg) {
  const o = LB[lg], need = KEYS.concat(["refund","privacy","terms","top","back","menu","close","footer","wa","logo"]);
  A(need.every(k => typeof o[k] === "string" && o[k] && !/[<>"&]/.test(o[k]) && !/[\u0900-\u097F]/.test(o[k])), "labels." + lg + ": सब खाने भरे, सादा पाठ, देवनागरी नहीं");
  /* जिस भाषा की शब्द-तालिका है (generator/data/panel_i18n/<भाषा>_terms.json), वहाँ हर नाम उसी लिपि में और English शब्द के बिना (यह जाँच jsdom के बिना चलती है) */
  if (fs.existsSync(path.join(__dirname, "data", "panel_i18n", lg + "_terms.json"))) { const LT = require("./lib_lang_terms.js"), T = LT.load(lg);
    const badN = need.filter(k => !T.own.test(o[k]) || LT.scan(" " + o[k] + " ", T, null).length);
    A(badN.length === 0, "labels." + lg + ": हर नाम इसी भाषा की लिपि में, English शब्द नहीं" + (badN.length ? " (दोष: " + badN.join(", ") + ")" : "")); }
  const x = boot("/" + lg + "/career.html", true), dl = x.acsMenuList.children, fm = x.acsFooterMenu.children;
  A(dl.length === 10 && fm.length === 10 && KEYS.every((k, i) => dl[i].innerHTML.indexOf(o[k]) >= 0 && fm[i].innerHTML.indexOf(o[k]) >= 0), "/" + lg + "/: ऊपर और नीचे के मेन्यू के 10-10 नाम उसी भाषा में");
  A(dl[0].href === "/" + lg + "/" && fm[0].href === "/" + lg + "/" && dl[1].href === REAL_LINKS.menu[1].href_en, "/" + lg + "/: \"होम\" उसी भाषा के घर पर; बाक़ी पते पहले जैसे");
  A(x.__legal.innerHTML.indexOf(o.refund) >= 0 && x.__legal.innerHTML.indexOf(o.privacy) >= 0 && x.__legal.innerHTML.indexOf(o.terms) >= 0 && !/Refund Policy|रिफंड/.test(x.__legal.innerHTML) && (x.__legal.innerHTML.match(/href="\/(refund|privacy|terms)\.html"/g) || []).length === 3, "/" + lg + "/: नीति की तीन कड़ियाँ उसी भाषा में, पते वही");
  A(x.acsLogin.innerHTML === "BAKED_acsLogin" && x.acsTagline.textContent === "BAKED_acsTagline", "/" + lg + "/: पन्ने में लिखा अनुवाद (लॉगिन, टैगलाइन) अछूता");
  const want = ['[aria-label="Menu"] aria-label=' + o.menu, '[aria-label="Close"] aria-label=' + o.close, '[aria-label="Footer menu"] aria-label=' + o.footer, '[aria-label="Contact on WhatsApp"] aria-label=' + o.wa, 'img[alt="ACS logo"] alt=' + o.logo];
  A(want.every(w => (x.__set || []).indexOf(w) >= 0) && (x.__set || []).length === want.length, "/" + lg + "/: पहले से लिखे 5 English नाम (Menu, Close, Footer menu, WhatsApp, logo) इसी भाषा के नाम से बदले जाते हैं");
});
e = boot("/zh/career.html", true);
A(!LB.zh && e.acsMenuList.children.length === 10 && /Home$/.test(e.acsMenuList.children[0].innerHTML) && e.acsMenuList.children[0].href === "/en/" && e.__legal.innerHTML.indexOf("Refund Policy") >= 0 && !(e.__q || []).length && !(e.__set || []).length, "जिस भाषा की पंक्ति नहीं (zh): मेन्यू और नीति की कड़ियाँ पहले जैसी English में");
e = boot("/career.html", true);
A(/होम$/.test(e.acsMenuList.children[0].innerHTML) && e.acsMenuList.children[0].href === "/" && e.__legal.innerHTML.indexOf("रिफंड") >= 0, "हिंदी पन्ना: मेन्यू और नीति की कड़ियाँ हिंदी में (पहले जैसी)");
e = boot("/en/career.html", true);
A(/Home$/.test(e.acsMenuList.children[0].innerHTML) && e.acsMenuList.children[0].href === "/en/" && e.__legal.innerHTML.indexOf("Refund Policy") >= 0, "English पन्ना: पहले जैसा");
A(/var fbTop = fbHi\?"पेज के ऊपर जाएँ":\(\(fbOwn&&fbOwn\.top\)\|\|"Back to top"\)/.test(SRC_ALL) && /bBack\.href = isUdyam \? "\/udyam\/" : \(fbOwn \? "\/"\+fbSeg\+"\/" : "\/"\)/.test(SRC_ALL), "ऊपर और पीछे वाले बटन: नाम उसी भाषा में, पीछे का पता उसी भाषा का घर");
console.log("🏁 runtime 15+ जाँचें पास (v1.2: भाषा के अपने नाम समेत)");
