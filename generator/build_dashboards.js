/* ============================================================
   build_dashboards.js — dashboard-परिवार का generator (परत-4)
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

const STAMP = "12-Jul-2026";
const GEN_NOTE =
  "⚙️ यह फ़ाइल generator से बनी है (generator/build_dashboards.js v1.0 · " + STAMP + ") —\n" +
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

/* ---------- external roles के अतिरिक्त आरक्षित-पैनल ---------- */
function extraPanels(key){
  if(key==="entrepreneur") return (
    '<div class="pcard" style="grid-column:1/-1">' +
    '<div class="ph">🌱 उद्यमी-सहयोग ecosystem</div>' +
    '<div class="pd">v1.7-ग की आरक्षित जगह — Verified Vendor सूची · First Customer Mission (90-दिन) · Failure Recovery · Family/Women परतें · ज़िला-माँग जानकारी। निर्माण just-in-time (अपना chatroom)।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
  if(key==="vendor") return (
    '<div class="pcard" style="grid-column:1/-1">' +
    '<div class="ph">🧾 RM भौतिक-सत्यापन</div>' +
    '<div class="pd">v1.7 प्रदर्शन-नियम: बिना RM भौतिक-सत्यापन + approval-श्रृंखला के आपका नाम portal पर नहीं दिखेगा। सत्यापन-स्थिति यहीं दिखेगी। Verified Vendor badge (वैकल्पिक, ₹300/600/1000 × 365 दिन) approval के बाद।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
  return (
    '<div class="pcard" style="grid-column:1/-1">' +
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
    .split("{{EXTRA_PANELS}}").join(isTeam ? "" : extraPanels(h.keys[0]));

  /* mode-अनुसार दूसरे mode के हिस्से हटाना */
  let final = out;
  if(isTeam){
    final = final.replace(/<!--EXTERNAL_ONLY_START-->[\s\S]*?<!--EXTERNAL_ONLY_END-->/,"");
  } else {
    final = final.replace(/<!--TEAM_ONLY_START-->[\s\S]*?<!--TEAM_ONLY_END-->/,"");
    final = final.replace(/\/\*TEAM_ONLY_JS_START\*\/[\s\S]*?\/\*TEAM_ONLY_JS_END\*\//,"");
    final = final.replace(/\/\*TEAM_GUARD_JS_START\*\/[\s\S]*?\/\*TEAM_GUARD_JS_END\*\//,"");
    final = final.replace("  await guardTeam(user);\n", "  /* external-mode: team-guard लागू नहीं */\n");
  }

  /* जाँच: कोई placeholder बचा तो fail (check-robot भावना) */
  const left = final.match(/\{\{[A-Z_]+\}\}/);
  if(left){ console.error("❌ placeholder बचा:", left[0], "→", home); process.exit(1); }

  const dir = path.join(ROOT, home.replace(/^\//,""));
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir,"index.html"), final);
  made.push({ home, mode: h.mode + (h.ext?"+ext":""), allowed: h.keys.join(","), bytes: final.length });
}

/* ---------- रिपोर्ट ---------- */
console.log("घर | mode | allowed | bytes");
made.sort((a,b)=>a.home.localeCompare(b.home));
for(const m of made) console.log(m.home+" | "+m.mode+" | "+m.allowed+" | "+m.bytes);
console.log("\n✅ कुल "+made.length+" dashboards बने — generator v1.0 · "+STAMP);
