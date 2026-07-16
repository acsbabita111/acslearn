/* ============================================================
   build_dashboards.js — dashboard-परिवार का generator (परत-4)
   v1.4 · 16-Jul-2026 (काम-6 चरण-1) — टेम्पलेट v4.1: external status-कार्ड अब
          statusPanel(key) से (g2 = पुराना पाठ हूबहू; प्रशिक्षु = "खाता सीधा चालू ✅");
          विद्यार्थी-घर के 9 असली पैनल studentPanels() से — बाक़ी घरों का HTML अपरिवर्तित।
   v1.3 · 15-Jul-2026 — टेम्पलेट v4.0 (पतला खोखा): CSS/JS अब /assets/ में साझा;
          JS की build-time TEAM-कटाई हटी (runtime-gate) — सिर्फ़ HTML-mode कटाई बची।
   v1.2 · 14-Jul-2026 — एक-generator नियम (Founder): join.html व login (dashboard/index.html)
          भी अब इसी generator से — स्रोत: /_JOIN_TEMPLATE.html · /dashboard/_LOGIN_TEMPLATE.html।
          इन दोनों को अब हाथ से न बदलें — टेम्पलेट बदलो, generator चलाओ (परत-4)।
   v1.1 · 14-Jul-2026 — v3.4 टेम्पलेट: chip-public_label + gateway-timeline (मिलान-सुधार)
   v1.0 · 12-Jul-2026 (काम-4)
   ------------------------------------------------------------
   लोहे का नियम: कोई dashboard-page हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /assets/designation_matrix.js (परत-3 — पद/घर/label का एकमात्र घर)
         + /dashboard/_DASHBOARD_TEMPLATE.html (परत-2 — मास्टर टेम्पलेट)
   चलाना: repo-रूट से → node generator/build_dashboards.js
   नतीजा: हर dashboard-घर का index.html (admin समेत — admin भी अब generator-output)
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MX = require(path.join(ROOT, "assets", "designation_matrix.js"));
const TPL = fs.readFileSync(path.join(ROOT, "dashboard", "_DASHBOARD_TEMPLATE.html"), "utf8");

const STAMP = "16-Jul-2026";
const GEN_NOTE =
  "⚙️ यह फ़ाइल generator से बनी है (generator/build_dashboards.js v1.4 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: टेम्पलेट/matrix में करके generator दोबारा चलाएँ (परत-4 नियम)।";

/* ---------- साझा-घर वाले dashboards के प्रदर्शन-नाम ---------- */
const SHARED_LABELS = {
  "/dashboard/hq/staff/":  { tb: "Staff Dashboard", deny: "Staff (DEO · Intern)" },
  "/dashboard/callcenter/": { tb: "Call Center Dashboard", deny: "Call Center कर्मी" },
  "/dashboard/future/":    { tb: "Future Dashboard", deny: "Future/Other पद-धारक" }
};

/* ---------- P1 (आवेदन-पैनल) का पद-अनुसार वाक्य ---------- */
function p1Note(allowedKeys){
  if(allowedKeys.includes("hq_admin"))
    return "आपके दायरे के आवेदन (अंतिम मुहर आपकी: RM-स्तर के सभी + ZM-office के कर्मी)। approve/reject बटन नीचे।";
  if(allowedKeys[0]==="founder")
    return "सभी आवेदन (अंतिम मुहर आपकी: ZM/Continental · सातों Heads · System Security · Admin)। approve/reject बटन नीचे।";
  return "आपके दायरे के आवेदन — आपकी चौकी-मुहर व दायरा-छँटाई अगले दौर (rules-विस्तार) में; अभी पूरी सूची सिर्फ़ Founder/Admin को दिखती है।";
}

/* ---------- external status-कार्ड (टेम्पलेट v4.1 का STATUS_PANEL-खाना) ----------
   v1.3-(क): student/jobseeker/entrepreneur पर approval-द्वार नहीं — खाता सीधा चालू।
   बाक़ी (g2) roles का पाठ v4.0 वाला हूबहू (byte-मिलान के लिए)। */
const NO_GATEWAY = ["student","jobseeker","entrepreneur"];
function statusPanel(key){
  if(NO_GATEWAY.includes(key)) return (
    '<div class="pcard panel" id="pnl-status" data-nav="✅ खाता-स्थिति" style="grid-column:1/-1">' +
    '<div class="ph">✅ खाता-स्थिति</div>' +
    '<div class="pd">आपका खाता सीधा चालू है ✅ — आपकी भूमिका के लिए कोई approval ज़रूरी नहीं (नियम v1.3)। ' +
    'जुड़ना व पढ़ना हमेशा मुफ़्त; पैसा सिर्फ़ तब, जब आप कोई paid-सेवा लें।</div>' +
    '<div class="note" id="stGuard" style="display:none"></div>' +
    '</div>');
  return (
    '<div class="pcard panel" id="pnl-status" data-nav="🛤️ approval-स्थिति" style="grid-column:1/-1">\n' +
    '        <div class="ph">🛤️ approval-स्थिति</div>\n' +
    '        <div class="pd">बाहरी-role (g2) की approval-श्रृंखला server पर अगले दौर में बनेगी (v1.3: "पहले टीम फ़ाइनल") — तब तक dashboard देखने के मोड में। आपका आवेदन सुरक्षित दर्ज है।</div>\n' +
    '      </div>');
}

/* ---------- विद्यार्थी-घर के असली पैनल (काम-6 चरण-1, 16-Jul-2026) ----------
   नियम लागू: काम-सूची (v1.8-ख1) · scale/आलसी-load (v1.8-ख2) · कूट-नाम कभी UI पर नहीं ·
   कोई मरा बटन नहीं (url-नियम v2.4-क8) · गोल bracket · फ़ॉन्ट ≥16px (सिर्फ़ मौजूदा classes)। */
function studentPanels(){
  return (
    /* 🧠 टेस्ट-1 — Aptitude */
    '<div class="pcard panel" id="pnl-aptitude" data-nav="🧠 Aptitude टेस्ट" style="grid-column:1/-1">' +
    '<div class="ph">🧠 Aptitude टेस्ट (अभिरुचि-परीक्षा — टेस्ट-1)</div>' +
    '<div class="pd">यह ज्ञान की नहीं, आपकी रुचि (अभिरुचि) की परीक्षा है — कोई जवाब सही या ग़लत नहीं। ' +
    'नतीजा बताता है कि 24 सेक्टर में आपकी रुचि किधर सबसे मज़बूत है, 4 सुझाए सेक्टर और सुझाया स्केल क्या है।</div>' +
    '<div class="pd">🕐 फीस चुकाने पर 30 दिन की छतरी — टेस्ट अपनी सुविधा से 5 से 25 दिन में पूरा करें। ' +
    'जवाब जितनी बार चाहें बदलें, पर Final Submit सिर्फ़ एक बार — उसके बाद ही नतीजा। नतीजे के साथ Aptitude Certificate download होगा।</div>' +
    '<div class="note">💡 भुगतान से पहले साफ़ दिखेगा: सत्यापन असफल होने पर 30 प्रतिशत जाँच-शुल्क कटता है (यह दंड नहीं)।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>🧠 टेस्ट शुरू करें</button> ' +
    '<span class="soon">टेस्ट-इंजन जल्द चालू होगा — अभी तैयारी में</span>' +
    '</div>' +

    /* 📚 मेरे कोर्स */
    '<div class="pcard panel" id="pnl-courses" data-nav="📚 मेरे कोर्स" style="grid-column:1/-1">' +
    '<div class="ph">📚 मेरे कोर्स</div>' +
    '<div class="pd"><b>मेरा नामांकन:</b> नामांकन-खाता अगले दौर में जुड़ेगा — तब यहाँ सिर्फ़ आपका अपना ब्योरा दिखेगा: ' +
    'मेरा कोर्स · मेरी fee · मेरी परीक्षा · मेरा नतीजा (आपके सब केंद्रों का, एक जगह)।</div>' +
    '<div class="ph" style="margin-top:14px">📖 मुफ़्त online कोर्स — अभी पढ़ें</div>' +
    '<div class="pd">पढ़ना हमेशा मुफ़्त है — बिना रोक, बिना शर्त। जिस कोर्स के पाठ बन चुके हैं, उस पर "पढ़ें" बटन दिखेगा।</div>' +
    '<div id="crsList"><span class="note">कोर्स-सूची यह पैनल खोलने पर आती है…</span></div>' +
    '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none;margin-top:10px" href="/courses/">🌍 पूरी कोर्स-सूची देखें</a>' +
    '</div>' +

    /* 📝 मेरी परीक्षाएँ */
    '<div class="pcard panel" id="pnl-exams" data-nav="📝 मेरी परीक्षाएँ" style="grid-column:1/-1">' +
    '<div class="ph">📝 मेरी परीक्षाएँ (टेस्ट-2 व टेस्ट-3)</div>' +
    '<div class="pd"><b>टेस्ट-2 — Workshop-प्रवेश टेस्ट:</b> online कोर्स पूरा करने के बाद, workshop या कैंप में admission के लिए। ' +
    'यह सिर्फ़ पास-फ़ेल (qualifying) है — इसका कोई प्रमाण पत्र नहीं। fail हों तो जब मर्ज़ी आधी फीस पर दोबारा।</div>' +
    '<div class="pd"><b>टेस्ट-3 (मोड-अ) — प्रशिक्षण-पूर्णता:</b> workshop-प्रशिक्षण → पहली कमाई → अपने काम का फोटो या वीडियो भेजें → ' +
    'उस्ताद हुनर-प्रमाणीकरण दें → साथ में HQ की online परीक्षा — <b>दोनों ताले खुलें तभी</b> प्रशिक्षण-पूर्णता का प्रमाण पत्र।</div>' +
    '<div class="pd"><b>टेस्ट-3 (मोड-ब) — online कोर्स-पूर्णता:</b> workshop में भाग न लेने पर, आपके आवेदन से, online ज्ञान के पूर्ण ' +
    'मूल्यांकन के बाद — प्रमाण पत्र पर साफ़ लिखा होगा: "इन्होंने अभी तक प्रैक्टिकल नहीं किया है।"</div>' +
    '<span class="soon">परीक्षा-इंजन अगले दौर में — तब यहीं से टेस्ट देंगे</span>' +
    '</div>' +

    /* 📸 पहली-कमाई सबूत */
    '<div class="pcard panel" id="pnl-proof" data-nav="📸 पहली-कमाई सबूत" style="grid-column:1/-1">' +
    '<div class="ph">📸 पहली-कमाई का सबूत (मोड-अ का हिस्सा)</div>' +
    '<div class="pd">यहाँ आप अपने किए काम का फोटो या वीडियो भेजेंगे (हर फ़ाइल अधिकतम 2MB)। उस्ताद इसे देखकर हुनर-प्रमाणीकरण देंगे — ' +
    'यह प्रमाण पत्र के दो तालों में से पहला ताला है।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>📤 सबूत भेजें</button> ' +
    '<span class="soon">upload-इंजन व समीक्षा-चौकी अगले दौर में</span>' +
    '</div>' +

    /* 🏆 मेरे प्रमाण पत्र */
    '<div class="pcard panel" id="pnl-certs" data-nav="🏆 मेरे प्रमाण पत्र" style="grid-column:1/-1">' +
    '<div class="ph">🏆 मेरे प्रमाण पत्र</div>' +
    '<div class="pd">ACS पर अभी तीन प्रकार: (1) Aptitude Certificate — रुचि-रिपोर्ट, (2) प्रशिक्षण-पूर्णता प्रमाण पत्र — दोहरा-ताला, ' +
    '(3) online कोर्स-पूर्णता प्रमाण पत्र। हर प्रमाण पत्र पर unique number व QR — दुनिया में कहीं से verify। ' +
    'Lifetime valid; verify 3 साल मुफ़्त, फिर 1000 रुपये; duplicate 500 रुपये।</div>' +
    '<div class="note">अभी आपका कोई प्रमाण पत्र नहीं बना — परीक्षा-इंजन चालू होते ही download यहीं मिलेगा।</div>' +
    '</div>' +

    /* 💳 मेरे भुगतान */
    '<div class="pcard panel" id="pnl-pay" data-nav="💳 मेरे भुगतान" style="grid-column:1/-1">' +
    '<div class="ph">💳 मेरे भुगतान</div>' +
    '<div class="pd">paid सिर्फ़ ये 5 सेवाएँ: aptitude टेस्ट · offline प्रशिक्षण · workshop apprenticeship · ' +
    'counselor सलाह · विदेश-एजेंट connection। बाक़ी सब — पढ़ना, जुड़ना, देखना — हमेशा मुफ़्त।</div>' +
    '<div class="note">💡 हर paid-सेवा पर भुगतान-बटन के ठीक ऊपर लिखा मिलेगा: सत्यापन असफल = 30 प्रतिशत जाँच-शुल्क। ' +
    'भुगतान से पहले मशीन-जाँच मुफ़्त होती है।</div>' +
    '<span class="soon">रसीद व भुगतान-history अगले दौर में</span>' +
    '</div>' +

    /* 🧭 सलाह */
    '<div class="pcard panel" id="pnl-counsel" data-nav="🧭 सलाह (Counselor)" style="grid-column:1/-1">' +
    '<div class="ph">🧭 सलाह — काउंसलर (Counselor)</div>' +
    '<div class="pd">सलाह का रास्ता टेस्ट से पहले भी खुला है और बाद भी। हर counselor से 5 मिनट की मुफ़्त बातचीत (free preview) ' +
    'ज़रूर मिलती है — फिर booking। booking रद्द करने पर (1 घंटा पहले तक) 90 प्रतिशत वापसी — चाहे आप रद्द करें या counselor।</div>' +
    '<div class="note">counselor-सूची (नाम · fees) यहाँ तभी दिखेगी जब उनका RM भौतिक-सत्यापन व approval पूरा होगा — ' +
    'बिना सत्यापन कोई नाम portal पर नहीं दिखता (प्रदर्शन-नियम)।</div>' +
    '</div>' +

    /* 🛠️ Workshop / कैंप */
    '<div class="pcard panel" id="pnl-workshop" data-nav="🛠️ Workshop व कैंप" style="grid-column:1/-1">' +
    '<div class="ph">🛠️ Workshop व कैंप</div>' +
    '<div class="pd">रास्ता: मुफ़्त पढ़ो → टेस्ट-2 पास करो → अपने पास के workshop में paid-प्रशिक्षण (अवधि कोर्स के हिसाब से 15 से 300 दिन)। ' +
    'पास में workshop न हो तो 10 या ज़्यादा पास-विद्यार्थी मिलकर online निवेदन करें — RM या ZM कैंप लगवाएँगे।</div>' +
    '<div class="pd">ℹ️ 16 से 18 साल वालों के लिए: प्रशिक्षण-कैंप व भ्रमण सिर्फ़ Guardian (अभिभावक) की सहमति से — या Guardian साथ जाएँ।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>🙏 कैंप-निवेदन भेजें</button> ' +
    '<span class="soon">workshop-सूची व निवेदन-इंजन अगले दौर में</span>' +
    '</div>' +

    /* 🆘 सहायता */
    '<div class="pcard panel" id="pnl-help" data-nav="🆘 सहायता व शिकायत" style="grid-column:1/-1">' +
    '<div class="ph">🆘 सहायता व शिकायत</div>' +
    '<div class="pd">कोई दिक़्क़त, सवाल या शिकायत हो — सीधे लिखें। शिकायत की स्वतंत्र सुनवाई ACS की Trust Policy का हिस्सा है।</div>' +
    '<a class="abtn ok" style="display:inline-block;text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/919431210092">💬 WhatsApp पर लिखें</a> ' +
    '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none" href="mailto:acs.chautham@gmail.com">✉️ Email भेजें</a>' +
    '</div>');
}

/* ---------- external roles के अतिरिक्त आरक्षित-पैनल ---------- */
function extraPanels(key){
  if(key==="entrepreneur") return (
    '<div class="pcard panel" id="pnl-extra" data-nav="🌱 उद्यमी-सहयोग" style="grid-column:1/-1">' +
    '<div class="ph">🌱 उद्यमी-सहयोग ecosystem</div>' +
    '<div class="pd">v1.7-ग की आरक्षित जगह — Verified Vendor सूची · First Customer Mission (90-दिन) · Failure Recovery · Family/Women परतें · ज़िला-माँग जानकारी। निर्माण just-in-time (अपना chatroom)।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
  if(key==="vendor") return (
    '<div class="pcard panel" id="pnl-extra" data-nav="🧾 RM-सत्यापन" style="grid-column:1/-1">' +
    '<div class="ph">🧾 RM भौतिक-सत्यापन</div>' +
    '<div class="pd">v1.7 प्रदर्शन-नियम: बिना RM भौतिक-सत्यापन + approval-श्रृंखला के आपका नाम portal पर नहीं दिखेगा। सत्यापन-स्थिति यहीं दिखेगी। Verified Vendor badge (वैकल्पिक, ₹300/600/1000 × 365 दिन) approval के बाद।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
  return (
    '<div class="pcard panel" id="pnl-extra" data-nav="🗂️ आगे के पैनल" style="grid-column:1/-1">' +
    '<div class="ph">🗂️ आगे के पैनल</div>' +
    '<div class="pd">इस role के काम-पैनल (सेवा · payment · badge आदि) approval-श्रृंखला (g2) के साथ अगले दौर में खुलेंगे।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
}

/* ---------- 1) team-घर इकट्ठे ---------- */
const homes = new Map(); // path → config
for(const t of MX.teams){
  if(!t.dashboard) continue;
  if(!homes.has(t.dashboard)) homes.set(t.dashboard, { mode:"team", keys:[], labels:[] });
  const h = homes.get(t.dashboard);
  h.keys.push(t.key); h.labels.push(t.label);
}
/* founder हर team-dashboard देख सके (नियम-4 का प्रदर्शन-रूप — admin v2.2 जैसा) */
for(const [p,h] of homes){ if(!h.keys.includes("founder")) h.keys.push("founder"); }

/* ---------- 2) बाहरी कार्ड-घर ---------- */
for(const c of MX.cards){
  if(c.key==="team" || !c.dashboard || c.dashboard==="/dashboard/") continue;
  if(homes.has(c.dashboard)){
    /* dual (volunteer): team-घर में external-fallback role जुड़े */
    homes.get(c.dashboard).ext = [c.key];
    homes.get(c.dashboard).extLabel = c.label;
  } else {
    homes.set(c.dashboard, { mode:"external", keys:[c.key], labels:[c.label], roleLabel:c.label });
  }
}

/* ---------- 3) बनाना ---------- */
let made = [];
for(const [home, h] of homes){
  const shared = SHARED_LABELS[home];
  const isTeam = h.mode==="team";
  const mainLabel = shared ? shared.tb
    : (isTeam ? (h.labels[0] + " Dashboard") : (h.labels[0] + " Dashboard"));
  const denyWho = shared ? shared.deny : h.labels.join(" / ");
  const out = TPL
    .split("{{GEN_NOTE}}").join(GEN_NOTE)
    .split("{{TITLE}}").join(mainLabel)
    .split("{{TB_ROLE}}").join(mainLabel)
    .split("{{DENY_WHO}}").join(denyWho)
    .split("{{MODE}}").join(h.mode)
    .split("{{ALLOWED_JSON}}").join(JSON.stringify(h.keys))
    .split("{{EXT_ROLES_JSON}}").join(JSON.stringify(h.ext||[]))
    .split("{{ROLE_LABEL}}").join(h.roleLabel || h.extLabel || mainLabel)
    .split("{{HOME}}").join(home)
    .split("{{P1_NOTE}}").join(isTeam ? p1Note(h.keys) : "")
    .split("{{STATUS_PANEL}}").join(isTeam ? "" : statusPanel(h.keys[0]))
    .split("{{EXTRA_PANELS}}").join(isTeam ? "" : (h.keys[0]==="student" ? studentPanels() : extraPanels(h.keys[0])));

  /* mode-अनुसार दूसरे mode का HTML हटाना (v4.0: JS-कटाई ख़त्म — साझा
     dashboard.js runtime-gate if(MODE==="team") से ख़ुद सँभालता है) */
  let final = out;
  if(isTeam){
    final = final.replace(/<!--EXTERNAL_ONLY_START-->[\s\S]*?<!--EXTERNAL_ONLY_END-->/,"");
  } else {
    final = final.replace(/<!--TEAM_ONLY_START-->[\s\S]*?<!--TEAM_ONLY_END-->/,"");
  }

  /* जाँच: कोई placeholder बचा तो fail (check-robot भावना) */
  const left = final.match(/\{\{[A-Z_]+\}\}/);
  if(left){ console.error("❌ placeholder बचा:", left[0], "→", home); process.exit(1); }

  const dir = path.join(ROOT, home.replace(/^\//,""));
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir,"index.html"), final);
  made.push({ home, mode: h.mode + (h.ext?"+ext":""), allowed: h.keys.join(","), bytes: final.length });
}

/* ---------- 4) एक-generator नियम (v1.2, Founder 14-Jul-2026):
   join व login भी इसी generator के अधीन — टेम्पलेट → output + generator-मुहर।
   (सार्वजनिक-content संसार का root _TEMPLATE.html अपनी जगह यथावत — v1.2 आर्किटेक्चर) ---------- */
const SPECIALS = [
  { tpl: "_JOIN_TEMPLATE.html",                    out: "join.html",                     nm: "join (registration)" },
  { tpl: path.join("dashboard","_LOGIN_TEMPLATE.html"), out: path.join("dashboard","index.html"), nm: "login/router" }
];
for(const sp of SPECIALS){
  let t = fs.readFileSync(path.join(ROOT, sp.tpl), "utf8");
  const note = "<!--\n  " + GEN_NOTE.split("\n").join("\n  ") + "\n  स्रोत-टेम्पलेट: /" + String(sp.tpl).split(path.sep).join("/") + "\n-->\n";
  const outHtml = t.replace(/^(<!DOCTYPE html>\s*\n?)/i, "$1" + note);
  if(outHtml === t){ console.error("❌ doctype नहीं मिला:", sp.tpl); process.exit(1); }
  fs.writeFileSync(path.join(ROOT, sp.out), outHtml);
  made.push({ home: "/"+String(sp.out).split(path.sep).join("/"), mode: "special:"+sp.nm, allowed: "—", bytes: outHtml.length });
}

/* ---------- रिपोर्ट ---------- */
console.log("घर | mode | allowed | bytes");
made.sort((a,b)=>a.home.localeCompare(b.home));
for(const m of made) console.log(m.home+" | "+m.mode+" | "+m.allowed+" | "+m.bytes);
console.log("\n✅ कुल "+made.length+" पेज बने (31 dashboards + join + login) — generator v1.4 · "+STAMP);
