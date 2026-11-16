#!/usr/bin/env node
/* ============================================================
   dev_panel_lang_check.js v1.4 (16-Nov-2026) · English के अलावा हर पैनल-भाषा का पहरेदार (पहली भाषा: कन्नड़, खेप क-1)
   Founder का आदेश (15-Nov-2026): "कोई यूजर एक बार अपने पैनल को ... ले तो उसको देवनागरी में कुछ भी नहीं दिखना चाहिए।"
   यह robot असली पन्ने (लॉगिन, रजिस्ट्रेशन, रजिस्ट्रेशन गाइड, सब dashboard) jsdom में उस भाषा में खोलकर हर बटन दबाता है और देखता है:
     • दिखने वाले पाठ, attribute, <title> और संदेश-डिब्बों में देवनागरी शून्य;
     • server को जाने वाला data वही जो English पन्ने से जाता है (भाषा सिर्फ़ दिखावट है);
     • भाषा बदलकर हिंदी पर लौटना = बिल्कुल ताज़ा हिंदी पन्ना; English और इस भाषा के बीच आना-जाना;
     • भाषा-पट्टी के नीचे उसी भाषा में "AI-मसौदा" की सूचना।
   Founder के आदेश (16-Nov-2026): (1) हिंदी के अलावा किसी भाषा में हिंदी कहीं न दिखे; जो चीज़ इस भाषा में अभी नहीं बनी, वह English में।
   (2) जो इस भाषा में मौजूद है या बन सकता है, वह इसी भाषा में (English में नहीं): करियर टेस्ट और होम की कड़ी इस भाषा के पन्ने पर, नियम-परदा,
   WhatsApp के पहले से लिखे संदेश। (3) हर जगह साफ़ लिखा हो कि क़ानूनन हिंदी नियम-पत्र ही मान्य है, और हिंदी नियम-पत्र की कड़ी हो।
   v1.4 (क-2क): जिस भाषा के अपने नियम-पत्र बन गए (repo में <भाषा>/rules-consent-*.html), उसमें हर जगह वही अपेक्षित हैं: रजिस्ट्रेशन में नियम उसी भाषा में
   और सहमति की भाषा उसी का कोड; गाइड, नियम-परदे और dashboard की नियम-कड़ी उसी भाषा के पत्र पर। अपना पत्र न मिले या बासी हो, तब English; वह भी नहीं, तब रुकावट।
   यह robot गिनकर दिखाता है कि अभी क्या English में है (इस भाषा के अपने रूप बनने तक):
     E1 नियम-पत्र English में (ऊपर इसी भाषा में सूचना + क़ानूनी पंक्ति + हिंदी पत्र की कड़ी); सहमति की भाषा "en" दर्ज; गाइड की नियम-कड़ी English पत्र पर।
     E2 नियम-परदा इसी भाषा में, पर उसकी नियम-पत्र वाली कड़ी English पत्र पर।
     E3 प्रमाणपत्र ठीक वही जो English पैनल में; OTP की माँग में lang = "en"; जिन मेनू-पन्नों का इस भाषा में रूप नहीं, वे English पर।
     server को गया रजिस्ट्रेशन का data English पन्ने वाले से अक्षर-अक्षर मिलाया जाता है (server इस भाषा को English रजिस्ट्रेशन की तरह देखता है)।
   चलाना (repo-root से): ACS_JSDOM=<jsdom का पता> node generator/dev_panel_lang_check.js <भाषा-कोड> [static|login|guide|join|dash]
     ACS_ROLES=teacher,student  : रजिस्ट्रेशन की जाँच सिर्फ़ इन भूमिकाओं पर (तेज़ जाँच)
     ACS_INV=<फ़ाइल>            : बचे देवनागरी टुकड़ों की पूरी सूची उस फ़ाइल में
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const LG = (process.argv[2] || "").trim(), ONLY = process.argv[3] || "";
const PL = require("./lib_panel_langs.js"), LI = PL.info(LG);
if (!LI || LG === "en") { console.log("उपयोग: node generator/dev_panel_lang_check.js <भाषा-कोड> [static|login|guide|join|dash]   (English का पहरेदार: dev_panel_i18n_check.js और dev_panel_dash_check.js)"); process.exit(2); }
const P1 = require("./dev_panel_i18n_check.js"), P2 = require("./dev_panel_dash_check.js");
const { openPage, loginTransform, settle, waitFor, typeIn, click, hindiLeaks, bodyText, MX, R, roleList, HJ, joinStep1, joinOtp, joinRole, joinRules, joinStep3, rej, firstDiff } = P1;
const { openDash, openAll, NAME_HI, openDoc, openH, certClick, docLinks, decText, HU, HQ, visText, countOf } = P2;
const rd = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const DEV = /[ऀ-ॿ]/;
/* (v1.4) इस भाषा का अपना नियम-पत्र repo में है? हो, तो वही अपेक्षित; न हो, तो English का */
const OWNR = f => fs.existsSync(path.join(ROOT, LG, f));
const RLG = f => OWNR(f) ? LG : "en";
const RMISS = f => (OWNR(f) ? ["/" + LG + "/" + f] : []).concat(["/en/" + f]);   /* अनुवाद वाले सब पत्रों के पते (रुकावट की जाँच में इन्हें ग़ायब या बासी किया जाता है) */
const LF = "rules-consent-learner.html", STALE = t => t.replace("<b>Version: 1.2</b>", "<b>Version: 1.1</b>");
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const t0 = Date.now(), INV = new Map(), HOLES = { E1: 0, E2: 0, E3: 0 };
function ck(name, ok, info) { if (ok) pass++; else { fail++; console.log("❌ " + name + (info ? "\n     " + String(info).slice(0, 900) : "")); } return !!ok; }
const LS = () => ({ acs_dash_lang: LG });
function leaks(c, opts) {
  const UV = Array.from(c.userVals || []);
  return hindiLeaks(c, opts).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV.forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
}
function clean(c, where, opts) {
  const L = leaks(c, opts); L.forEach(x => INV.set(x, (INV.get(x) || []).concat(where)));
  return ck(where + " : देवनागरी शून्य", L.length === 0, L.length + " जगह: " + L.slice(0, 8).join("  ‖  "));
}
function noErr(c, where) { const e = c.errors.splice(0); return ck(where + " : पन्ने में JS-त्रुटि शून्य", e.length === 0, e.slice(0, 4).join(" ‖ ")); }
const own = t => { for (let i = 0; i < t.length; i++) { const sc = require("./lib_apt_langs.js").scriptOf(t.codePointAt(i)); if (sc === LI.script) return true; } return false; };

/* ───────────── S: स्थिर जाँच ───────────── */
function staticSuite() {
  const r = cp.spawnSync(process.execPath, [path.join(ROOT, "generator/build_panel_i18n.js"), LG, "--check"], { encoding: "utf8" });
  ck("S1 पैक ताज़ा है (build_panel_i18n.js " + LG + " --check)", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const src = rd("assets/i18n/panel_" + LG + ".js"), m = src.match(new RegExp('window\\.ACS_PANEL_PACKS\\["' + LG + '"\\]=(\\{[\\s\\S]*\\});\\s*$'));
  let P = null; try { P = m && JSON.parse(m[1]); } catch (e) {}
  if (!ck("S2 पैक पढ़ने-योग्य JSON, भाषा-कोड सही", !!P && P.lang === LG)) return;
  { /* SR (v1.4, क-2क) इस भाषा के अपने नियम-पत्र: या तो एक भी नहीं, या सब के सब; हर पत्र ताज़ा, हिंदी मूल के संस्करण का, देवनागरी शून्य, हिंदी मूल की कड़ी के साथ; पैक उन्हें जानता है */
    const HIF = fs.readdirSync(ROOT).filter(f => /^rules-consent-[a-z-]+\.html$/.test(f)).sort(), OWF = HIF.filter(OWNR);
    ck("SR1 इस भाषा के नियम-पत्र: या तो एक भी नहीं, या सब (" + OWF.length + " / " + HIF.length + ")", OWF.length === 0 || OWF.length === HIF.length, HIF.filter(f => !OWNR(f)).slice(0, 5).join(","));
    if (OWF.length) {
      const rr = cp.spawnSync(process.execPath, [path.join(ROOT, "generator/build_rules_consent_en.js"), LG, "--check"], { encoding: "utf8" });
      ck("SR2 भूमिकाओं के नियम-पत्र ताज़ा हैं (build_rules_consent_en.js " + LG + " --check)", rr.status === 0, ((rr.stdout || "") + (rr.stderr || "")).slice(-300));
      const ver = h => (/<b>Version: ([0-9.]+)/.exec(h) || [])[1] || "", vis = h => h.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
      const bad = [];
      for (const f of OWF) { const h = rd(LG + "/" + f), hi = rd(f);
        if (!ver(hi) || ver(h) !== ver(hi)) bad.push(f + ": संस्करण " + ver(h) + " ≠ हिंदी " + ver(hi));
        if (DEV.test(vis(h))) bad.push(f + ": देवनागरी");
        if (/[\u2014\u2013\uFFFD]/.test(vis(h).replace(/<style[\s\S]*?<\/style>/g, ""))) bad.push(f + ": लंबी रेखा या टूटा अक्षर");
        if (h.indexOf('<html lang="' + LG + '"') < 0) bad.push(f + ": lang");
        if (h.indexOf('<link rel="canonical" href="https://acslearn.com/' + LG + "/" + f + '"') < 0) bad.push(f + ": canonical");
        if (h.indexOf('href="/' + f + '"') < 0) bad.push(f + ": हिंदी मूल की कड़ी नहीं");
        if ((h.match(/<div class="rule(?:"| [^"]*")[^>]*>\s*<input type="checkbox"/g) || []).length !== (hi.match(/<div class="rule(?:"| [^"]*")[^>]*>\s*<input type="checkbox"/g) || []).length) bad.push(f + ": नियमों की गिनती हिंदी से अलग");
        if (!P.P || P.P["/en/" + f] !== "/" + LG + "/" + f) bad.push(f + ": पैक की अपने-पन्नों की तालिका में नहीं"); }
      ck("SR3 हर नियम-पत्र (" + OWF.length + "): हिंदी मूल का संस्करण, देवनागरी शून्य, lang और canonical सही, हिंदी मूल की कड़ी, नियमों की गिनती वही, पैक में दर्ज", bad.length === 0, bad.length + ": " + bad.slice(0, 6).join(" ‖ "));
    }
  }
  const EP = JSON.parse(rd("assets/i18n/panel_en.js").match(/window\.ACS_PANEL_PACKS\["en"\]=(\{[\s\S]*\});\s*$/)[1]);
  const vals = Object.values(P.D).concat(P.T.map(x => x[1]));
  ck("S3 पैक की कुंजियाँ English पैक जितनी ही (हर हिंदी टुकड़ा दोनों में): D " + Object.keys(EP.D).length + ", T " + EP.T.length + ", G " + EP.G.length,
    JSON.stringify(Object.keys(P.D)) === JSON.stringify(Object.keys(EP.D)) && JSON.stringify(P.T.map(x => x[0])) === JSON.stringify(EP.T.map(x => x[0])) && JSON.stringify(P.G) === JSON.stringify(EP.G),
    "D " + Object.keys(P.D).length + " / " + Object.keys(EP.D).length + " · T " + P.T.length + " / " + EP.T.length + " · G " + P.G.length + " / " + EP.G.length);
  ck("S4 पैक के हर मान में देवनागरी, लंबी रेखा और टूटा अक्षर शून्य", vals.every(v => !DEV.test(v) && !/[\u2014\u2013\uFFFD]/.test(v)), vals.filter(v => DEV.test(v) || /[\u2014\u2013\uFFFD]/.test(v)).slice(0, 5).join(" | "));
  ck("S5 पैक के हर मान में अपनी लिपि (" + LI.script + ") का अक्षर (सिर्फ़ brand का नाम हो तो रोमन ही)", vals.every(v => own(v) || !/\p{L}/u.test(PL.noBrand(v))), vals.filter(v => !own(v) && /\p{L}/u.test(PL.noBrand(v))).slice(0, 8).join(" | "));
  { const bad = []; for (const [h, v] of Object.entries(P.D).concat(P.T)) for (const x of PL.parity(LG, h, v, ["AI"])) bad.push(x + ": " + h);
    ck("S6 हर अनुवाद हिंदी मूल से मिलता है (अंक, {n}, चिह्न, emoji, रोमन शब्द, विराम)", bad.length === 0, bad.length + ": " + bad.slice(0, 5).join(" ‖ ")); }
  { const sp = Object.keys(P.D).filter(h => { const a = EP.D[h], b = P.D[h]; return /^\s*/.exec(a)[0] !== /^\s*/.exec(b)[0] || /\s*$/.exec(a)[0] !== /\s*$/.exec(b)[0]; });
    ck("S7 अनुवाद के आगे-पीछे की ख़ाली जगह English पैक जैसी (टुकड़े उसी तरह जुड़ें)", sp.length === 0, sp.slice(0, 5).join(" | ")); }
  { const bad = Object.keys(P.D).filter(h => PL.BRAND.some(b => h.indexOf(b[0]) > -1 && P.D[h].indexOf(b[1]) < 0));
    ck("S7b brand का नाम हर जगह रोमन में (Applied Computer School, ACS): अपनी लिपि में लिखा रूप नहीं", bad.length === 0 && P.D["अप्लाइड कंप्यूटर स्कूल™"] === "Applied Computer School™", bad.slice(0, 4).join(" | ")); }
  ck("S8 पैक का दायरा वही जो English का; पूरा पैनल अभी नहीं (काग़ज़ बाक़ी); AI-मसौदा की सूचना पैक में", JSON.stringify(P.scope) === JSON.stringify(EP.scope) && P.complete === false && typeof P.draft === "string" && own(P.draft) && !DEV.test(P.draft), JSON.stringify(P.scope) + " " + P.complete + " " + P.draft);
  /* इंजन की भाषा-सूची और साइट के 🌐 बटन की तालिकाएँ: नाम तीनों रूप में हूबहू */
  const ENG = rd("assets/panel_i18n.js"), UNI = rd("assets/acs-universal.js");
  const row = new RegExp('\\["' + LG + '","([^"]+)","([^"]+)","([^"]+)"\\]').exec(ENG);
  const tab = n => { const mm = new RegExp("var " + n + " = (\\{[^\\n]*?\\});").exec(UNI); return mm ? JSON.parse(mm[1]) : {}; };
  ck("S9 इंजन की भाषा-सूची में " + LG + ", नाम साइट की तालिकाओं जैसे (देवनागरी · रोमन · अपनी लिपि), और पैक का पता दर्ज",
    !!row && row[1] === tab("ACS_LANG_DEVA")[LG] && row[2] === tab("ACS_LANG_ROMAN")[LG] && row[3] === tab("ACS_LANG_NAMES")[LG] && ENG.indexOf(LG + ':"/assets/i18n/panel_' + LG + '.js"') > -1, row ? row.slice(1).join(" · ") : "पंक्ति नहीं मिली");
  /* dashboard.js: कोर्स-सूची हर ग़ैर-हिंदी पैनल में मँगाई जाए (सिर्फ़ English में नहीं), ताकि देर से आई सूची के बाद भी सहेजे कोर्स-नाम ठीक हों।
     यह दौड़ (नाम पहले छपा, सूची बाद में आई) नक़ली browser में नहीं बनती, इसलिए यहाँ कोड से जाँच */
  { const DJ = rd("assets/dashboard.js");
    ck("S11 dashboard.js: कोर्स के नाम का English सहारा हर ग़ैर-हिंदी पैनल में (cnWant और भाषा-बदल, दोनों panelOther से)",
      DJ.indexOf('function panelOther(){ try{ const P=window.ACS_PANEL_I18N; return !!(P && P.active && P.lang()!=="hi"); }catch(e){ return false; } }') > -1
      && DJ.indexOf("function cnWant(){ if(CN_ASKED || cnLoaded() || !panelOther()) return;") > -1
      && DJ.indexOf('document.addEventListener("acs-panel-lang", function(){ if(!panelOther()) return;') > -1); }
  /* काग़ज़ों के पक्के वाक्य (dashboard.js की DOC_EN तालिका: परिचय-पत्र, WhatsApp के संदेश): हर वाक्य इस भाषा के पैक में, ताकि DT() और ownMsgHref() उसी भाषा में दें */
  { const DJ = rd("assets/dashboard.js"), a = DJ.indexOf("const DOC_EN = {"), b = DJ.indexOf("};", a); let T = null; try { T = new Function("return " + DJ.slice(a + 15, b + 1))(); } catch (e) {}
    const bad = T ? Object.keys(T).filter(k => { const v = P.D[k.trim()]; return typeof v !== "string" || DEV.test(v) || !(own(v) || !/\p{L}/u.test(PL.noBrand(v))); }) : ["तालिका नहीं पढ़ी गई"];
    ck("S12 काग़ज़ों के पक्के वाक्य (DOC_EN, " + (T ? Object.keys(T).length : 0) + ") इस भाषा के पैक में, अपनी लिपि में", !!T && Object.keys(T).length >= 11 && bad.length === 0, bad.slice(0, 4).join(" ‖ ")); }
  /* शब्दकोश-फ़ाइल: चारों खंड, कोई ख़ाली नहीं */
  const J = JSON.parse(rd("generator/data/panel_i18n/" + LG + ".json")), EJ = JSON.parse(rd("generator/data/panel_i18n/en.json"));
  ck("S10 " + LG + ".json: ui और geo और server की कुंजियाँ en.json जितनी ही; data खंड भरा",
    ["ui", "geo", "server"].every(s => JSON.stringify(Object.keys(J[s]).sort()) === JSON.stringify(Object.keys(EJ[s]).sort())) && Object.keys(J.data || {}).length > 250,
    ["ui", "geo", "server"].map(s => s + " " + Object.keys(J[s] || {}).length + "/" + Object.keys(EJ[s]).length).join(" · ") + " · data " + Object.keys(J.data || {}).length);
}

/* ───────────── L: लॉगिन ───────────── */
async function loginSuite() {
  const OPEN = o => openPage("dashboard/index.html", Object.assign({ transform: loginTransform, urlPath: "/dashboard/" }, o));
  const H = {
    "__signIn": () => ({ user: { uid: "u1" } }), "claimSession": () => ({ ok: true }),
    "rulesStatus": () => ({ applies: true, need: true, current: "1.2" }), "rulesAccept": () => ({ ok: true }),
    "requestLoginOtp": () => ({ ok: true }), "verifyLoginOtp": () => ({ ok: true }),
    "requestPasswordResetOtp": () => ({ ok: true }), "verifyPasswordResetOtp": () => ({ ok: true }),
    "__getDoc": () => ({ exists: () => true, data: () => ({ designation: "hq_admin" }) })
  };
  let c = await OPEN({ ls: LS(), expect: LG, handlers: Object.assign({}, H) });
  const $ = id => c.d.getElementById(id);
  ck("L0 " + LG + " सक्रिय, html lang=" + LG + ", body class " + LG, c.w.ACS_PANEL_I18N.active && c.w.ACS_PANEL_I18N.lang() === LG && c.d.documentElement.getAttribute("lang") === LG && c.d.body.classList.contains(LG) && !c.d.body.classList.contains("hi"));
  { const bt = k => ((c.d.querySelector('#acsPanelLangBar button[data-plang="' + k + '"]') || {}).textContent || "").trim();
    const nm = c.w.ACS_PANEL_I18N.langs.find(x => x[0] === LG);
    ck("L0 भाषा-पट्टी: हिंदी, English और " + LG + " के बटन; " + LG + " दबा हुआ; नाम तीनों रूप में", !!c.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"][aria-pressed="true"]') && bt("hi") === "हिन्दी · Hindi" && bt("en") === "अंग्रेज़ी · English" && bt(LG) === nm.slice(1).join(" · "), bt("hi") + " | " + bt("en") + " | " + bt(LG));
    const dn = c.d.getElementById("acsPanelDraft");
    ck("L0 भाषा-पट्टी के नीचे AI-मसौदा की सूचना, उसी भाषा में", !!dn && own(dn.textContent) && !DEV.test(dn.textContent), dn && dn.textContent); }
  clean(c, "L1 लॉगिन पहला दृश्य (सब चरण, छिपे भी)");
  ck("L1 <title> में देवनागरी नहीं", !DEV.test(c.d.title), c.d.title);
  const tops = MX.cards.filter(x => !x.parent);
  ck("L2 भूमिका-कार्ड गिनती = matrix", c.d.querySelectorAll("#roleGrid .role-card").length === tops.length);
  for (const card of tops.filter(x => x.children)) {
    const tile = Array.from(c.d.querySelectorAll("#roleGrid .role-card"))[tops.indexOf(card)];
    click(c, tile); await settle(c);
    clean(c, "L2 कार्ड " + card.key + " खुला (प्रकार चुनें)");
    const back = Array.from(c.d.querySelectorAll("#roleGrid .role-card")).find(x => /↩/.test(x.textContent));
    click(c, back); await settle(c);
  }
  c.w.goStep2(); await settle(c); clean(c, "L3 बिना भूमिका आगे बढ़ना");
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[0]); c.w.goStep2(); await settle(c);
  ck("L4 भूमिका-पट्टी उसी भाषा में", own($("role-tag").textContent) && !DEV.test($("role-tag").textContent), $("role-tag").textContent);
  clean(c, "L4 चरण-2");
  await c.w.doLogin(); await settle(c); clean(c, "L5 email ख़ाली");
  $("f-email").value = "a@b.co"; await c.w.doLogin(); await settle(c); clean(c, "L5 password ख़ाली");
  $("f-pass").value = "x";
  for (const code of ["auth/invalid-credential", "auth/too-many-requests", "auth/network-request-failed", "auth/other"]) {
    c.handlers.__signIn = () => rej(code); await c.w.doLogin(); await settle(c); clean(c, "L5 लॉगिन-ग़लती " + code);
  }
  /* L6 विद्यार्थी: session → नियम-परदा (इसी भाषा में; नियम-पत्र की कड़ी English पत्र पर) → सफलता */
  c.handlers.__signIn = H.__signIn;
  const loginP = c.w.doLogin(); await waitFor(c, () => $("rulesGate"), 3000); await settle(c); await settle(c);
  if (ck("L6 नियम-परदा खुला", !!$("rulesGate"))) {
    const gt = $("rulesGate").textContent;
const gh = $("rulesGateHi"), gl = $("rulesGateLink");
    ck("L6 नियम-परदा इसी भाषा में: देवनागरी शून्य, English का वाक्य नहीं, अपनी लिपि में", !DEV.test(gt) && own(gt) && !/The rules letter has changed|Continue|I have read/.test(gt) && own($("rulesGateOk").textContent) && own(gl.textContent), gt.slice(0, 160));
    ck("L6 परदे पर क़ानूनी पंक्ति (इसी भाषा में) और हिंदी नियम-पत्र की कड़ी", !!gh && gh.getAttribute("href") === "/rules-consent-learner.html" && own(gh.textContent) && $("rulesGateNote").textContent.indexOf(c.w.ACS_PANEL_I18N.tr("क़ानूनी रूप से हिंदी नियम-पत्र ही मान्य है।")) === 0, gh && (gh.getAttribute("href") + " | " + $("rulesGateNote").textContent));
    await waitFor(c, () => gl.getAttribute("href") === "/" + RLG(LF) + "/" + LF, 3000);
    if (OWNR(LF)) ck("L6 परदे की नियम-पत्र वाली कड़ी इसी भाषा के नियम-पत्र पर", gl.getAttribute("href") === "/" + LG + "/" + LF && gl.textContent === c.w.ACS_PANEL_I18N.tr("नियम-पत्र पढ़ें ↗") && own(gl.textContent) && c.fetched.indexOf("/" + LG + "/" + LF) > -1, gl.getAttribute("href") + " | " + gl.textContent);
    else if (ck("L6 (E2) परदे की नियम-पत्र वाली कड़ी English पत्र पर (इस भाषा का पत्र अभी नहीं)", gl.getAttribute("href") === "/en/rules-consent-learner.html" && gl.textContent === c.w.ACS_PANEL_I18N.tr("नियम-पत्र पढ़ें (English में) ↗"), gl.getAttribute("href") + " | " + gl.textContent)) HOLES.E2++;
    $("rulesGateChk").checked = true; $("rulesGateChk").dispatchEvent(new c.w.Event("change")); click(c, $("rulesGateOk")); await loginP; await settle(c);
    const acc = c.calls.filter(x => x.name === "rulesAccept").pop();
    ck("L6 सहमति के साथ भाषा " + RLG(LF) + " और संस्करण (जिस पत्र की कड़ी दी गई, वही)", !!acc && acc.data.language === RLG(LF) && acc.data.version === "1.2", JSON.stringify(acc && acc.data));
    ck("L6 परदा हटा, सफलता-चरण", !$("rulesGate") && $("c5").classList.contains("show"));
    clean(c, "L6 सफलता-चरण");
  }
  noErr(c, "L1-L6"); c.dom.window.close();
  /* LGF (v1.3, ऑडिट की शर्त) नियम-परदा: इस भाषा का और English का पत्र न मिले, तो कड़ी हिंदी नियम-पत्र पर; परदे का सारा पाठ इसी भाषा में (हिंदी शून्य, English का वाक्य नहीं) */
  if (OWNR(LF)) {   /* LGE (v1.4) इस भाषा का पत्र न मिले या बासी हो, पर English का ठीक हो: कड़ी English पत्र पर, सहमति में भाषा en */
    for (const [tg, o] of [["इस भाषा का पत्र ग़ायब (404)", { missing: ["/" + LG + "/" + LF] }], ["इस भाषा का पत्र पुराने संस्करण का", { rewrite: { ["/" + LG + "/" + LF]: STALE } }]]) {
      const g = await OPEN(Object.assign({ ls: LS(), expect: LG, handlers: Object.assign({}, H) }, o)), G = id => g.d.getElementById(id), TR = t => g.w.ACS_PANEL_I18N.tr(t);
      click(g, g.d.querySelectorAll("#roleGrid .role-card")[0]); g.w.goStep2(); G("f-email").value = "a@b.co"; G("f-pass").value = "x";
      const lp = g.w.doLogin(); await waitFor(g, () => G("rulesGate"), 3000); await waitFor(g, () => g.fetched.indexOf("/en/" + LF) > -1, 3000); await settle(g); await settle(g);
      const gl = G("rulesGateLink"), gt = G("rulesGate") ? G("rulesGate").textContent : "";
      ck("LGE " + tg + " : कड़ी English नियम-पत्र पर, कड़ी का पाठ इसी भाषा में", !!gl && gl.getAttribute("href") === "/en/" + LF && gl.textContent === TR("नियम-पत्र पढ़ें (English में) ↗") && own(gl.textContent) && !DEV.test(gt), gl && (gl.getAttribute("href") + " | " + gl.textContent));
      G("rulesGateChk").checked = true; G("rulesGateChk").dispatchEvent(new g.w.Event("change")); click(g, G("rulesGateOk")); await lp; await settle(g);
      const ac = g.calls.filter(x => x.name === "rulesAccept").pop();
      ck("LGE " + tg + " : सहमति में भाषा en दर्ज", !!ac && ac.data.language === "en" && ac.data.version === "1.2", JSON.stringify(ac && ac.data));
      noErr(g, "LGE " + tg); g.dom.window.close();
    }
  }
  for (const [tg, o] of [["अनुवाद वाले पत्र ग़ायब (404)", { missing: RMISS(LF) }], ["अनुवाद वाले पत्र पुराने संस्करण के", { rewrite: RMISS(LF).reduce((m, p) => (m[p] = STALE, m), {}) }]]) {
    const g = await OPEN(Object.assign({ ls: LS(), expect: LG, handlers: Object.assign({}, H) }, o)), G = id => g.d.getElementById(id), TR = t => g.w.ACS_PANEL_I18N.tr(t);
    click(g, g.d.querySelectorAll("#roleGrid .role-card")[0]); g.w.goStep2(); G("f-email").value = "a@b.co"; G("f-pass").value = "x";
    const lp = g.w.doLogin(); await waitFor(g, () => G("rulesGate"), 3000); await waitFor(g, () => G("rulesGateLink") && G("rulesGateLink").getAttribute("href") === "/rules-consent-learner.html", 3000); await settle(g);
    const gl = G("rulesGateLink"), gn = G("rulesGateNote"), gt = G("rulesGate") ? G("rulesGate").textContent : "";
    ck("LGF " + tg + " : कड़ी हिंदी नियम-पत्र पर; कड़ी और सूचना इसी भाषा में", !!gl && gl.getAttribute("href") === "/rules-consent-learner.html" && gl.textContent === TR("नियम-पत्र पढ़ें (हिंदी में) ↗") && own(gl.textContent) && !!gn && gn.textContent === TR("इस नियम-पत्र का अनुवाद अभी तैयार नहीं है। क़ानूनी मूल हिंदी में है।") && own(gn.textContent), gl && (gl.getAttribute("href") + " | " + gl.textContent + " | " + (gn && gn.textContent)));
    ck("LGF " + tg + " : परदे में देवनागरी शून्य, English का वाक्य नहीं", !DEV.test(gt) && !/not ready yet|legal original|Read the rules letter/.test(gt), gt.slice(0, 200));
    clean(g, "LGF " + tg + " : परदा");
    G("rulesGateChk").checked = true; G("rulesGateChk").dispatchEvent(new g.w.Event("change")); click(g, G("rulesGateOk")); await lp; await settle(g);
    const ac = g.calls.filter(x => x.name === "rulesAccept").pop();
    ck("LGF " + tg + " : सहमति में भाषा hi दर्ज (जिस पत्र की कड़ी दी गई, वही)", !!ac && ac.data.language === "hi" && ac.data.version === "1.2", JSON.stringify(ac && ac.data));
    noErr(g, "LGF " + tg); g.dom.window.close();
  }
  /* L7 session-विफलता */
  c = await OPEN({ ls: LS(), expect: LG, handlers: Object.assign({}, H, { claimSession: () => rej("unavailable") }) });
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[0]); c.w.goStep2(); c.d.getElementById("f-email").value = "a@b.co"; c.d.getElementById("f-pass").value = "x";
  await c.w.doLogin(); await settle(c); clean(c, "L7 session शुरू नहीं हुई");
  c.dom.window.close();
  /* L8 OTP वाली भूमिका */
  c = await OPEN({ ls: LS(), expect: LG, handlers: Object.assign({}, H) });
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[tops.findIndex(x => x.key === "counselor")]); c.w.goStep2();
  c.d.getElementById("f-email").value = "a@b.co"; c.d.getElementById("f-pass").value = "x";
  await c.w.doLogin(); await sleep(1100); await settle(c);
  ck("L8 OTP-चरण खुला", c.d.getElementById("c3").classList.contains("show"));
  clean(c, "L8 OTP-चरण (घड़ी चलते हुए)");
  await c.w.verifyLoginOtp(); await settle(c); clean(c, "L8 OTP अधूरा");
  ["o1", "o2", "o3", "o4", "o5", "o6"].forEach((id, i) => { c.d.getElementById(id).value = String(i + 1); });
  c.handlers.verifyLoginOtp = () => ({ ok: false }); await c.w.verifyLoginOtp(); await settle(c); clean(c, "L8 OTP ग़लत (server ok:false)");
  c.handlers.requestLoginOtp = () => ({ ok: true }); await c.w.resendLoginOtp(); await settle(c); clean(c, "L8 नया OTP भेजा");
  c.handlers.requestLoginOtp = () => { throw {}; }; await c.w.resendLoginOtp(); await settle(c); clean(c, "L8 दोबारा OTP अभी नहीं");
  noErr(c, "L7-L8");
  { const q = c.calls.filter(x => x.name === "requestLoginOtp");
    if (ck("L8 (E3) OTP की माँग में lang = en (email English में; server सिर्फ़ hi और en जानता है), और सिर्फ़ email + lang", q.length === 3 && q.every(x => x.data && x.data.lang === "en" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data)))) HOLES.E3++; }
  c.dom.window.close();
  /* L9 पासवर्ड भूल गए */
  c = await OPEN({ ls: LS(), expect: LG, handlers: Object.assign({}, H) });
  c.w.goForgot(); await settle(c); clean(c, "L9 पासवर्ड भूले: पहला दृश्य");
  await c.w.requestForgotOtp(); await settle(c); clean(c, "L9 email ग़लत");
  c.d.getElementById("fp-email").value = "a@b.co"; await c.w.requestForgotOtp(); await sleep(1100); await settle(c); clean(c, "L9 OTP भेजा + शर्तें");
  typeIn(c, c.d.getElementById("fp-pass1"), "abcDEF123!@#x"); typeIn(c, c.d.getElementById("fp-pass2"), "zz"); await settle(c); clean(c, "L9 पासवर्ड मेल नहीं");
  await c.w.submitForgotReset(); await settle(c); clean(c, "L9 OTP अधूरा");
  ["p1", "p2", "p3", "p4", "p5", "p6"].forEach((id, i) => { c.d.getElementById(id).value = String(i + 1); });
  typeIn(c, c.d.getElementById("fp-pass1"), "abc"); await c.w.submitForgotReset(); await settle(c); clean(c, "L9 पासवर्ड की शर्तें अधूरी");
  typeIn(c, c.d.getElementById("fp-pass1"), "abcDEF123!@#x"); typeIn(c, c.d.getElementById("fp-pass2"), "abcDEF123!@#y"); await c.w.submitForgotReset(); await settle(c); clean(c, "L9 दोनों पासवर्ड अलग");
  c.handlers.verifyPasswordResetOtp = () => { throw {}; }; typeIn(c, c.d.getElementById("fp-pass2"), "abcDEF123!@#x"); await c.w.submitForgotReset(); await settle(c); clean(c, "L9 OTP ग़लत");
  c.handlers.verifyPasswordResetOtp = H.verifyPasswordResetOtp; ["p1", "p2", "p3", "p4", "p5", "p6"].forEach((id, i) => { c.d.getElementById(id).value = String(i + 1); });
  await c.w.submitForgotReset(); await settle(c); clean(c, "L9 पासवर्ड बदल गया");
  noErr(c, "L9");
  /* L10 menu की कड़ियाँ: इस भाषा के पन्ने अभी नहीं, इसलिए English पन्नों पर (हिंदी पर नहीं); हिंदी पर लौटने पर मूल पते */
  const mis = Array.from(c.d.querySelectorAll("#acsMenuList a,#acsFooterMenu a")).filter(a => /mission/.test(a.getAttribute("href")));
  if (ck("L10 (E3) menu: जिस पन्ने का इस भाषा में रूप नहीं (मिशन), उसकी कड़ी English पन्ने पर", mis.length > 0 && mis.every(a => /^\/en\//.test(a.getAttribute("href"))), mis.map(a => a.getAttribute("href")).join(","))) HOLES.E3++;
  const OWNP = (c.w.ACS_PANEL_PACKS[LG] || {}).P || {};
  const homes = Array.from(c.d.querySelectorAll("#acsMenuList a,#acsFooterMenu a")).filter(a => a.getAttribute("href") === "/" + LG + "/" || a.getAttribute("href") === "/en/" || a.getAttribute("href") === "/");
  ck("L10 menu: होम की कड़ी इस भाषा के अपने होम पर (" + (OWNP["/en/"] || "पन्ना नहीं") + ")", !OWNP["/en/"] || (homes.length > 0 && homes.every(a => a.getAttribute("href") === OWNP["/en/"])), homes.map(a => a.getAttribute("href")).join(","));
  { const bad = Object.keys(OWNP).filter(k => !/^\/en\//.test(k) || OWNP[k].indexOf("/" + LG + "/") !== 0 || !fs.existsSync(path.join(ROOT, OWNP[k].replace(/\/$/, "/index.html"))));
    ck("L10 पैक का \"अपने पन्ने\" खाना: हर पता /en/ से /" + LG + "/ पर, और वह पन्ना repo में मौजूद (" + Object.keys(OWNP).length + ")", bad.length === 0, bad.join(",")); }
  { click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
    ck("L10 हिंदी पर लौटने पर menu की कड़ियाँ मूल पते पर", mis.every(a => !/^\/en\//.test(a.getAttribute("href"))) && homes.every(a => a.getAttribute("href") === "/"), mis.concat(homes).map(a => a.getAttribute("href")).join(",")); }
  c.dom.window.close();
  /* LS भाषा बदलना */
  const hA = await OPEN({});
  c = await OPEN({ ls: LS(), expect: LG });
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
  ck("LS1 " + LG + " → हिंदी: पन्ना बिल्कुल ताज़ा हिंदी जैसा", bodyText(c) === bodyText(hA) && c.d.title === hA.d.title && !c.d.getElementById("acsPanelDraft"));
  ck("LS2 हिंदी चुनना याद रहा", c.w.localStorage.getItem("acs_dash_lang") === "hi" && c.d.documentElement.getAttribute("lang") === "hi" && c.d.body.classList.contains("hi") && !c.d.body.classList.contains(LG));
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"]')); await waitFor(c, () => c.w.ACS_PANEL_I18N.active); await settle(c);
  clean(c, "LS3 हिंदी → " + LG + " दोबारा");
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="en"]')); await waitFor(c, () => c.w.ACS_PANEL_I18N.lang() === "en"); await settle(c); await settle(c);
  { const L = leaks(c); ck("LS4 " + LG + " → English: देवनागरी शून्य, इस भाषा की लिपि का एक भी अक्षर नहीं बचा, AI-मसौदा की सूचना हटी", L.length === 0 && !own(bodyText(c).replace(/<button[^>]*data-plang[\s\S]*?<\/button>/g, "")) && !c.d.getElementById("acsPanelDraft") && c.d.body.classList.contains("en") && !c.d.body.classList.contains(LG), L.slice(0, 4).join(" ‖ ")); }
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"]')); await waitFor(c, () => c.w.ACS_PANEL_I18N.lang() === LG); await settle(c); await settle(c);
  clean(c, "LS5 English → " + LG);
  ck("LS5 English → " + LG + ": body class और html lang ठीक, सूचना वापस", c.d.body.classList.contains(LG) && !c.d.body.classList.contains("en") && c.d.documentElement.getAttribute("lang") === LG && !!c.d.getElementById("acsPanelDraft"));
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
  ck("LS6 तीन भाषाओं से घूमकर हिंदी पर: बिल्कुल ताज़ा हिंदी", bodyText(c) === bodyText(hA) && c.d.title === hA.d.title);
  noErr(c, "LS"); c.dom.window.close(); hA.dom.window.close();
  /* LU साइट का 🌐 बटन, LQ ?lang= */
  c = await OPEN({}); const href0 = c.w.location.href;
  c.w.acsLangGo(LG); await waitFor(c, () => c.w.ACS_PANEL_I18N.active); await settle(c);
  ck("LU साइट के 🌐 से " + LG + ": पन्ना वहीं, भाषा बदली, याद रही", c.w.ACS_PANEL_I18N.active && c.w.ACS_PANEL_I18N.lang() === LG && c.w.location.href === href0 && c.w.localStorage.getItem("acs_dash_lang") === LG);
  clean(c, "LU 🌐 से " + LG); c.dom.window.close();
  c = await OPEN({ query: "?lang=" + LG, expect: LG });
  ck("LQ ?lang=" + LG + " से भाषा और याद", c.w.ACS_PANEL_I18N.active && c.w.ACS_PANEL_I18N.lang() === LG && c.w.localStorage.getItem("acs_dash_lang") === LG);
  c.dom.window.close();
}

/* ───────────── G: रजिस्ट्रेशन गाइड ───────────── */
async function guideSuite() {
  const OPEN = o => openPage("registration-guide.html", Object.assign({ urlPath: "/registration-guide.html" }, o || {}));
  const ruleA = (c, key) => c.d.querySelector("#acc-" + key + " a.ruleLink[data-rule-file]");
  let c = await OPEN({ ls: LS(), expect: LG });
  ck("G0 गाइड " + LG + " में सक्रिय, खंड " + c.d.querySelectorAll(".acc").length, c.w.ACS_PANEL_I18N.active && c.d.querySelectorAll(".acc").length === MX.cards.length);
  clean(c, "G1 रजिस्ट्रेशन गाइड (सब खंड, बंद भी)");
  for (const k of MX.cards.map(x => x.key)) { click(c, c.d.querySelector("#acc-" + k + " .acc-head")); await settle(c); await settle(c); }
  clean(c, "G1 हर खंड खोलने के बाद");
  ck("G1 <title> में देवनागरी नहीं", !DEV.test(c.d.title), c.d.title);
  click(c, c.d.querySelector("#acc-student .acc-head")); await settle(c); await settle(c);
  const a = ruleA(c, "student"), note = a && a.nextElementSibling;
  await waitFor(c, () => a && a.getAttribute("href") === "/" + RLG(LF) + "/" + LF, 3000);
  if (ck("G2 " + (OWNR(LF) ? "" : "(E1) ") + "विद्यार्थी के नियम: कड़ी " + (OWNR(LF) ? "इसी भाषा के" : "English") + " नियम-पत्र पर, \"सिर्फ़ हिंदी में\" वाली सूचना छिपी", !!a && a.getAttribute("href") === "/" + RLG(LF) + "/" + LF && (!note || note.hasAttribute("hidden")), a && (a.getAttribute("href") + " | " + (note && note.hasAttribute("hidden")))) && !OWNR(LF)) HOLES.E1++;
  { const lg = note && note.nextElementSibling, la = lg && lg.querySelector("a");
    ck("G2 नियम-कड़ी के साथ क़ानूनी पंक्ति (इसी भाषा में) और हिंदी नियम-पत्र की कड़ी", !!lg && lg.classList.contains("ruleLegalNote") && !lg.hasAttribute("hidden") && own(lg.textContent) && !DEV.test(lg.textContent) && !!la && la.getAttribute("href") === "/rules-consent-learner.html", lg && (lg.textContent + " | " + (la && la.getAttribute("href")))); }
  { const at = ruleA(c, "teacher");   /* यह खंड ऊपर की दौड़ में खुल चुका है */
    const tf = R.ruleFileFor("teacher");
    await waitFor(c, () => at && at.getAttribute("href") === "/" + RLG(tf) + "/" + tf, 3000);
    ck("G2 " + (OWNR(tf) ? "" : "(E1) ") + "शिक्षक के नियम: कड़ी " + (OWNR(tf) ? "इसी भाषा के" : "English") + " नियम-पत्र पर", !!at && at.getAttribute("href") === "/" + RLG(tf) + "/" + tf, at && at.getAttribute("href")); }
  ck("G2 आवेदन-बटन की कड़ी वही (भाषा रजिस्ट्रेशन में अपने-आप)", c.d.querySelector("#acc-teacher a.applyBtn").getAttribute("href") === "/join.html?role=teacher");
  noErr(c, "G1-G2");
  const hA = await OPEN({});
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c); await settle(c);
  const hO = await OPEN({}); for (const k of MX.cards.map(x => x.key)) { click(hO, hO.d.querySelector("#acc-" + k + " .acc-head")); await settle(hO); } click(hO, hO.d.querySelector("#acc-student .acc-head")); await settle(hO); await settle(hO);
  ck("G3 गाइड " + LG + " → हिंदी: बिल्कुल ताज़ा हिंदी जैसा (खुले खंड, कड़ियाँ, सूचनाएँ)", bodyText(c) === bodyText(hO) && c.d.title === hA.d.title);
  [c, hA, hO].forEach(x => x.dom.window.close());
}

/* ───────────── J: रजिस्ट्रेशन ───────────── */
const RH = {};   /* नियम अब English फ़ाइल से आते हैं: नियम-खंड में भी देवनागरी शून्य (कोई छूट नहीं) */
const EN_NOTE = "ℹ️ इस भूमिका के नियम अभी English में दिखाए जा रहे हैं।";   /* रजिस्ट्रेशन का अपना वाक्य (_JOIN_TEMPLATE.html) */
async function joinFull(rl, mode, extra) {
  extra = extra || {};
  const T = mode === LG;   /* दूसरी दौड़ (English) सिर्फ़ data मिलाने के लिए है; उसकी अपनी जाँचें English के पहरेदार में हैं */
  const c = await openPage("join.html", { ls: { acs_dash_lang: mode }, expect: mode, handlers: Object.assign({}, HJ) });
  const tag = "J[" + mode + "] " + rl.key + (extra.minor ? " (नाबालिग)" : "") + (rl.country && rl.country !== "in" ? " (" + rl.country + ")" : "");
  const res = { tag }, $ = id => c.d.getElementById(id);
  if (T && extra.first) { clean(c, "J1 रजिस्ट्रेशन पहला दृश्य (सब चरण)"); ck("J1 <title> में देवनागरी नहीं", !DEV.test(c.d.title), c.d.title); }
  await joinStep1(c, extra);
  if (T && extra.first) clean(c, "J2 चरण-1 भरा हुआ");
  await joinOtp(c);
  if (!ck(tag + " : OTP के बाद चरण-2", $("panel2").classList.contains("active"))) { c.dom.window.close(); return res; }
  await joinRole(c, rl);
  if (T) {
    clean(c, tag + " : चरण-2 भूमिका + नियम (नियम-खंड समेत)", RH);
    const rc = $("rulesContainer"), first = rc.firstElementChild, nRules = rc.querySelectorAll(".rule input[type=checkbox]:not(#bulkConsentChk)").length;
    const rf = R.ruleFileFor(rl.key), hiSrc = rd(rf), enSrc = rd(RLG(rf) + "/" + rf), RX = /<div class="rule(?:"| [^"]*")[^>]*>\s*<input type="checkbox"/g;
    const nHi = (hiSrc.match(RX) || []).length, firstRule = (rc.querySelector(".rule label") || {}).textContent || "", enFirst = (/<div class="rule[^>]*>\s*<input type="checkbox"[^>]*>\s*<span class="no">[^<]*<\/span>\s*<label>([\s\S]*?)<\/label>/.exec(enSrc) || [])[1] || "";
    const plain = t => t.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (OWNR(rf)) ck(tag + " : नियम इसी भाषा के नियम-पत्र से (पहला नियम हूबहू, हर नियम अपनी लिपि में); \"English में दिखाए जा रहे हैं\" वाली सूचना नहीं; नियमों की गिनती हिंदी मूल जितनी (" + nHi + ")",
      !!first && first.id === "rulesLegalNote" && rc.textContent.indexOf(c.w.ACS_PANEL_I18N.tr(EN_NOTE)) < 0 && nRules === nHi && nHi > 15 && c.fetched.some(p => p === "/" + LG + "/" + rf) && enFirst.length > 20 && plain(firstRule) === plain(enFirst) && !DEV.test(rc.textContent) &&
      Array.from(rc.querySelectorAll(".rule label")).every(l => own(l.textContent)),
      (first && first.id) + " | नियम " + nRules + "/" + nHi + " | " + plain(firstRule).slice(0, 60) + " ≟ " + plain(enFirst).slice(0, 60));
    else if (ck(tag + " : (E1) नियम English नियम-पत्र से (पहला नियम हूबहू), सबसे ऊपर उसी भाषा में सूचना; नियमों की गिनती हिंदी मूल जितनी (" + nHi + ")",
      !!first && first.textContent === c.w.ACS_PANEL_I18N.tr(EN_NOTE) && own(first.textContent) && !DEV.test(first.textContent) && nRules === nHi && nHi > 15 && c.fetched.some(p => p === "/en/" + rf) && enFirst.length > 20 && plain(firstRule) === plain(enFirst) && !DEV.test(rc.textContent),
      (first && first.textContent.slice(0, 110)) + " | नियम " + nRules + "/" + nHi + " | " + plain(firstRule).slice(0, 60) + " ≟ " + plain(enFirst).slice(0, 60))) HOLES.E1++;
    { const lg = c.d.getElementById("rulesLegalNote"), as = lg ? Array.from(lg.querySelectorAll("a")) : [];
      ck(tag + " : नियमों के ऊपर क़ानूनी पंक्ति (इसी भाषा में) + हिंदी नियम-पत्र खोलने और डाउनलोड की कड़ी", !!lg && own(lg.textContent) && !DEV.test(lg.textContent) && lg.textContent.indexOf(c.w.ACS_PANEL_I18N.tr("क़ानूनी रूप से हिंदी नियम-पत्र ही मान्य है।")) > -1 && as.length === 2 && as.every(x => x.getAttribute("href") === rf) && as[0].getAttribute("target") === "_blank" && as[1].getAttribute("download") === rf, lg && (lg.textContent + " | " + as.map(x => x.getAttribute("href")).join(","))); }
  }
  if (!ck(tag + " : सब नियम स्वीकार → चरण-3 खुला", await joinRules(c) && $("panel3").classList.contains("active"))) { c.dom.window.close(); return res; }
  const ok4 = await joinStep3(c, rl, false);
  if (T) clean(c, tag + " : चरण-3 फ़ॉर्म + दस्तावेज़", RH);
  if (T && extra.first) {   /* ग़लत फ़ाइल / बहुत बड़ी फ़ाइल के संदेश */
    const b0 = Array.from(c.d.querySelectorAll("#documentsContainer .docBox")).filter(b => b.style.display !== "none")[0], inp = b0 && b0.querySelector("input[type=file]");
    if (inp) { for (const f of [new c.w.File(["x"], "a.txt", { type: "text/plain" }), new c.w.File([new Uint8Array(2200000)], "big.pdf", { type: "application/pdf" })]) {
        Object.defineProperty(inp, "files", { configurable: true, value: [f] }); inp.dispatchEvent(new c.w.Event("change")); await settle(c); clean(c, "J ग़लत फ़ाइल / बहुत बड़ी फ़ाइल संदेश (" + f.name + ")", RH); }
      const pdf = /\.pdf/.test(inp.accept), id = b0.getAttribute("data-docid"), nm = pdf ? "दस्तावेज़-" + id + ".pdf" : "photo-" + id + ".jpg"; if (pdf) c.userVals.add(nm);
      Object.defineProperty(inp, "files", { configurable: true, value: [new c.w.File([pdf ? "%PDF-1.4 " + id : "JPEGDATA" + id], nm, { type: pdf ? "application/pdf" : "image/jpeg" })] }); inp.dispatchEvent(new c.w.Event("change"));
      await waitFor(c, () => b0.classList.contains("filled"), 3000); await settle(c); }
  }
  if (!ck(tag + " : चरण-3 पूरा → चरण-4 बटन चालू", ok4 && !$("toStep4Btn").disabled)) { c.dom.window.close(); return res; }
  click(c, $("toStep4Btn")); await settle(c);
  if (T) clean(c, tag + " : चरण-4 पुष्टि", RH);
  if (T && extra.first) {
    c.handlers.submitRegistration = () => rej("internal", "boom"); click(c, $("submitBtn")); await settle(c); await settle(c); clean(c, "J submit विफल संदेश", RH);
    c.handlers.submitRegistration = () => rej("failed-precondition", "otpVerificationExpired"); click(c, $("submitBtn")); await settle(c); await settle(c); clean(c, "J OTP-प्रमाण की मियाद निकली", RH);
    c.handlers.submitRegistration = HJ.submitRegistration;
  }
  click(c, $("submitBtn")); await waitFor(c, () => $("panelSuccess").classList.contains("active")); await settle(c); await settle(c);
  ck(tag + " : submit → सफलता", $("panelSuccess").classList.contains("active"));
  if (T) clean(c, tag + " : सफलता + PDF", RH);
  if (T && extra.first) { c.handlers.generateAgreementPdf = () => ({ pdfUrl: "", mailNote: "no" }); $("downloadPdfBtn").click(); await settle(c); clean(c, "J PDF बनी, email नहीं गई", RH); }
  const sub = c.calls.filter(x => x.name === "submitRegistration").pop(); res.payload = sub ? sub.data : null;
  const q = c.calls.filter(x => x.name === "requestRegisterOtp");
  ck(tag + " : OTP की माँग में lang = en, और सिर्फ़ email + lang", q.length >= 1 && q.every(x => x.data && x.data.lang === "en" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data)));
  noErr(c, tag); c.dom.window.close();
  return res;
}
async function joinSuite() {
  const PICK = (process.env.ACS_ROLES || "").split(",").filter(Boolean);
  let roles = roleList(); if (PICK.length) roles = roles.filter(r => PICK.indexOf(r.key) > -1);
  if (roles.some(r => r.key === "zm")) roles.push({ key: "zm", team: "zm", country: "np", state: "_country" });
  const runs = roles.map(r => ({ rl: r, extra: {} }));
  if (!PICK.length || PICK.indexOf("student") > -1) runs.push({ rl: { key: "student" }, extra: { minor: true } });
  let first = true, same = 0;
  for (const run of runs) {
    const a = await joinFull(run.rl, LG, Object.assign({ first }, run.extra)); first = false;
    const b = await joinFull(run.rl, "en", run.extra);
    const tagP = a.tag.replace("J[" + LG + "]", "JP");
    const wl = RLG(R.ruleFileFor(run.rl.key));
    ck(tagP + " : consent_language = " + wl + " (जो नियम-पत्र सचमुच दिखा); English पन्ने से en", !!a.payload && !!b.payload && a.payload.consent_language === wl && b.payload.consent_language === "en", (a.payload || {}).consent_language + " / " + (b.payload || {}).consent_language);
    const a2 = a.payload ? Object.assign({}, a.payload, { consent_language: "en" }) : null;   /* सहमति की भाषा के अलावा बाक़ी data अक्षर-अक्षर वही */
    if (ck(tagP + " : server को बाक़ी data English पन्ने जैसा ही (अक्षर-अक्षर; फ़र्क़ सिर्फ़ सहमति की भाषा)", !!a2 && JSON.stringify(a2) === JSON.stringify(b.payload), firstDiff(a2, b.payload))) same++;
  }
  ck("JP सब भूमिकाओं में data एक-जैसा (" + same + "/" + runs.length + ")", same === runs.length);
  if (!PICK.length || PICK[0] === "-") {   /* ACS_ROLES=- : भूमिका-दौड़ें छोड़कर सिर्फ़ ये अतिरिक्त जाँचें */
    /* पहले से मौजूद आवेदन + OTP की ग़लतियाँ */
    const c = await openPage("join.html", { ls: LS(), expect: LG, handlers: Object.assign({}, HJ, { checkExistingApplication: () => ({ exists: true, status: "provisional", regNo: "ACS-2026-111111", role: "teacher" }) }) });
    await joinStep1(c, {}); const $ = id => c.d.getElementById(id);
    c.handlers.requestRegisterOtp = () => rej("resource-exhausted", "x"); click(c, $("sendOtpBtn")); await settle(c); await settle(c); clean(c, "JE OTP भेजने में रुकावट");
    c.handlers.requestRegisterOtp = HJ.requestRegisterOtp; click(c, $("sendOtpBtn")); await waitFor(c, () => $("otpBoxWrap").classList.contains("show")); await settle(c); clean(c, "JE OTP-डिब्बा खुला");
    c.d.querySelectorAll(".otpDigits input").forEach((inp, i) => typeIn(c, inp, String(i + 1)));
    c.handlers.verifyRegisterOtp = () => ({ ok: false, reason: "wrong", left: 2 }); click(c, $("verifyOtpBtn")); await settle(c); await settle(c); clean(c, "JE OTP ग़लत");
    c.handlers.verifyRegisterOtp = HJ.verifyRegisterOtp; click(c, $("verifyOtpBtn")); await settle(c); await settle(c); await settle(c); clean(c, "JE पहले से मौजूद आवेदन का डिब्बा", RH);
    noErr(c, "JE"); c.dom.window.close();
    /* भाषा बदलना: भरा फ़ॉर्म सुरक्षित, हिंदी पर लौटना = ताज़ा हिंदी */
    const h = await openPage("join.html", {}), k = await openPage("join.html", { ls: LS(), expect: LG });
    click(k, k.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(k);
    ck("JH रजिस्ट्रेशन " + LG + " → हिंदी: पन्ना बिल्कुल ताज़ा हिंदी जैसा", bodyText(k) === bodyText(h) && k.d.title === h.d.title);
    typeIn(k, k.d.getElementById("nameRoman"), "RAM KUMAR"); click(k, k.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"]')); await waitFor(k, () => k.w.ACS_PANEL_I18N.active); await settle(k);
    ck("JH भाषा बदलने पर भरा हुआ खाना सुरक्षित", k.d.getElementById("nameRoman").value === "RAM KUMAR"); clean(k, "JH हिंदी → " + LG);
    [h, k].forEach(x => x.dom.window.close());
    /* JF (v1.3, ऑडिट की शर्त 16-Nov-2026) इस भाषा का और English का नियम-पत्र, दोनों न मिलें या बासी हों: हिंदी नियम पन्ने के भीतर नहीं दिखते।
       इसी भाषा में सूचना + हिंदी नियम-पत्र की अलग कड़ी + "दोबारा कोशिश करें"; सहमति नहीं ली जाती, रजिस्ट्रेशन आगे नहीं बढ़ता। */
    { const TR = t => k0.w.ACS_PANEL_I18N.tr(t);
      /* नियमों के ऊपर क्या हो: अपना पत्र दिखे, तो सबसे ऊपर क़ानूनी पंक्ति (English वाली सूचना नहीं); English पत्र दिखे, तो सबसे ऊपर इसी भाषा में वह सूचना */
      const TOPOK = (c, f) => { const rc = c.d.getElementById("rulesContainer"), t = c.w.ACS_PANEL_I18N.tr(EN_NOTE); return OWNR(f) ? (rc.firstElementChild.id === "rulesLegalNote" && rc.textContent.indexOf(t) < 0) : rc.firstElementChild.textContent === t; };
      let bad = true, k0 = null;
      const blocked = async (c, tag, hiFile) => {
        const $ = id => c.d.getElementById(id), rc = $("rulesContainer"), bx = $("rulesBlocked"), ha = $("rulesBlockedHi"), T2 = t => c.w.ACS_PANEL_I18N.tr(t);
        ck(tag + " : नियम पन्ने के भीतर नहीं दिखे (हिंदी भी नहीं, English भी नहीं); सूचना इसी भाषा में", !!bx && rc.children.length === 1 && rc.querySelectorAll(".rule, .rules, .part, .idbox, input").length === 0 && !DEV.test(rc.textContent) && own(bx.textContent) &&
          bx.textContent.indexOf(T2("⚠️ इस भाषा में और English में नियम-पत्र अभी नहीं खुल सका।")) === 0 && bx.textContent.indexOf(T2("नियम पढ़े बिना रजिस्ट्रेशन आगे नहीं बढ़ता। थोड़ी देर बाद दोबारा कोशिश करें।")) > 0 &&
          !/could not be opened|Registration cannot go ahead/.test(bx.textContent), rc.textContent.slice(0, 220));
        ck(tag + " : क़ानूनी पंक्ति (इसी भाषा में) + हिंदी नियम-पत्र की अलग कड़ी (नए tab में)", !!ha && bx.textContent.indexOf(T2("क़ानूनी रूप से हिंदी नियम-पत्र ही मान्य है।")) > 0 && ha.getAttribute("href") === hiFile && ha.getAttribute("target") === "_blank" && ha.textContent === T2("हिंदी नियम-पत्र खोलें ↗") && own(ha.textContent), ha && (ha.getAttribute("href") + " | " + ha.textContent));
        ck(tag + " : \"दोबारा कोशिश करें\" का बटन इसी भाषा में", !!$("rulesRetryBtn") && $("rulesRetryBtn").textContent === T2("🔄 दोबारा कोशिश करें") && own($("rulesRetryBtn").textContent));
        ck(tag + " : सहमति बंद: अंतिम पुष्टि और आगे का बटन बंद, गिनती ख़ाली", $("finalChk").disabled && !$("finalChk").checked && $("toStep3Btn").disabled && $("toStep3Btn").className === "big btn-off" && $("rulesCount").textContent === "");
        const fin = $("finalChk"); fin.checked = true; fin.dispatchEvent(new c.w.Event("change")); click(c, $("toStep3Btn")); await settle(c);
        ck(tag + " : ज़बरदस्ती दबाने पर भी चरण-3 नहीं खुला, server को कुछ नहीं गया", $("panel2").classList.contains("active") && !$("panel3").classList.contains("active") && !c.calls.some(x => x.name === "submitRegistration"));
        click(c, $("submitBtn")); await settle(c);
        const eb = $("submitBtn").nextElementSibling;
        ck(tag + " : जमा-बटन सीधे दबाने पर भी server को कुछ नहीं गया; कारण इसी भाषा में लिखा आया", !c.calls.some(x => x.name === "submitRegistration") && !!eb && eb.style.display === "block" && eb.textContent === T2("⚠️ नियम पढ़े और स्वीकार किए बिना आवेदन जमा नहीं होता। चरण-2 पर लौटकर नियम स्वीकार करें।") && own(eb.textContent) && !DEV.test(eb.textContent), eb && eb.textContent);
        clean(c, tag + " : पूरा पन्ना");
      };
      /* (क) English नियम-पत्र ग़ायब (404) */
      k0 = await openPage("join.html", { ls: LS(), expect: LG, handlers: Object.assign({}, HJ), missing: RMISS("rules-consent-counselor.html") });
      await joinStep1(k0, {}); await joinOtp(k0); await joinRole(k0, { key: "counselor" }); await settle(k0);
      ck("JF माँग का क्रम: पहले इस भाषा का पत्र, फिर English का", k0.fetched.indexOf("/" + LG + "/rules-consent-counselor.html") > -1 && k0.fetched.indexOf("/en/rules-consent-counselor.html") > -1);
      await blocked(k0, "JF अनुवाद वाले नियम-पत्र ग़ायब (404)", "rules-consent-counselor.html");
      click(k0, k0.d.getElementById("rulesRetryBtn")); await settle(k0); await settle(k0);
      ck("JF दोबारा कोशिश, फ़ाइल अब भी नहीं: रुकावट बनी रही, हिंदी नहीं आई", !!k0.d.getElementById("rulesBlocked") && k0.d.querySelectorAll("#rulesContainer .rule").length === 0 && !DEV.test(k0.d.getElementById("rulesContainer").textContent) && k0.fetched.filter(p => p === "/en/rules-consent-counselor.html").length === 2);
      noErr(k0, "JF (क)"); k0.dom.window.close();
      /* (ख) अनुवाद वाले नियम-पत्र बासी; दोबारा कोशिश पर ठीक → इस भाषा का नियम-पत्र (वह न बना हो, तो English का), consent_language वही */
      k0 = await openPage("join.html", { ls: LS(), expect: LG, handlers: Object.assign({}, HJ),
        rewrite: RMISS(LF).reduce((m, p) => (m[p] = t => bad ? STALE(t) : t, m), {}) });
      await joinStep1(k0, {}); await joinOtp(k0); await joinRole(k0, { key: "student" }); await settle(k0);
      await blocked(k0, "JF अनुवाद वाले learner-नियम पुराने संस्करण के", "rules-consent-learner.html");
      bad = false; click(k0, k0.d.getElementById("rulesRetryBtn")); await waitFor(k0, () => k0.d.querySelectorAll("#rulesContainer .rule").length > 15); await settle(k0);
      ck("JF दोबारा कोशिश (अब फ़ाइल ठीक): " + (OWNR(LF) ? "इस भाषा का" : "English") + " नियम-पत्र दिखा, रुकावट हटी, ऊपर क़ानूनी पंक्ति", !k0.d.getElementById("rulesBlocked") && k0.d.querySelectorAll("#rulesContainer .rule").length > 15 && !!k0.d.getElementById("rulesLegalNote") &&
        TOPOK(k0, LF) && !DEV.test(k0.d.getElementById("rulesContainer").textContent));
      ck("JF उसके बाद सब नियम स्वीकार → चरण-3", await joinRules(k0) && k0.d.getElementById("panel3").classList.contains("active"));
      await joinStep3(k0, { key: "student" }, false); click(k0, k0.d.getElementById("toStep4Btn")); await settle(k0);
      click(k0, k0.d.getElementById("submitBtn")); await waitFor(k0, () => k0.calls.some(x => x.name === "submitRegistration")); await settle(k0);
      const sp = k0.calls.filter(x => x.name === "submitRegistration").pop();
      ck("JF तब consent_language = " + RLG(LF) + " और संस्करण 1.2 (जो पत्र सचमुच दिखा)", !!sp && sp.data.consent_language === RLG(LF) && sp.data.consent_rules_version === "1.2", JSON.stringify(sp && { l: sp.data.consent_language, v: sp.data.consent_rules_version }));
      noErr(k0, "JF (ख)"); k0.dom.window.close();
      if (OWNR(LF)) for (const [tg, o] of [["ग़ायब (404)", { missing: ["/" + LG + "/" + LF] }], ["पुराने संस्करण का", { rewrite: { ["/" + LG + "/" + LF]: STALE } }]]) {
        /* (ख-2, v1.4) सिर्फ़ इस भाषा का पत्र न मिले या बासी हो, English का ठीक हो: English नियम-पत्र + इसी भाषा में सूचना; consent_language = en (सच: English पत्र दिखा) */
        k0 = await openPage("join.html", Object.assign({ ls: LS(), expect: LG, handlers: Object.assign({}, HJ) }, o));
        await joinStep1(k0, {}); await joinOtp(k0); await joinRole(k0, { key: "student" }); await waitFor(k0, () => k0.d.querySelectorAll("#rulesContainer .rule").length > 15); await settle(k0);
        const rc2 = k0.d.getElementById("rulesContainer"), enF = (/<div class="rule[^>]*>\s*<input type="checkbox"[^>]*>\s*<span class="no">[^<]*<\/span>\s*<label>([\s\S]*?)<\/label>/.exec(rd("en/" + LF)) || [])[1] || "", pl = t => t.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
        ck("JF इस भाषा का learner-पत्र " + tg + ", English का ठीक: English नियम-पत्र दिखा, ऊपर इसी भाषा में सूचना + क़ानूनी पंक्ति; हिंदी शून्य", !k0.d.getElementById("rulesBlocked") && rc2.firstElementChild.textContent === TR(EN_NOTE) && own(rc2.firstElementChild.textContent) && !!k0.d.getElementById("rulesLegalNote") && !DEV.test(rc2.textContent) && enF.length > 20 && pl((rc2.querySelector(".rule label") || {}).textContent || "") === pl(enF), rc2.textContent.slice(0, 160));
        ck("JF तब सब नियम स्वीकार → चरण-3", await joinRules(k0) && k0.d.getElementById("panel3").classList.contains("active"));
        await joinStep3(k0, { key: "student" }, false); click(k0, k0.d.getElementById("toStep4Btn")); await settle(k0);
        click(k0, k0.d.getElementById("submitBtn")); await waitFor(k0, () => k0.calls.some(x => x.name === "submitRegistration")); await settle(k0);
        const sp2 = k0.calls.filter(x => x.name === "submitRegistration").pop();
        ck("JF तब consent_language = en (English पत्र ही दिखा, इस भाषा का नहीं)", !!sp2 && sp2.data.consent_language === "en" && sp2.data.consent_rules_version === "1.2", JSON.stringify(sp2 && { l: sp2.data.consent_language, v: sp2.data.consent_rules_version }));
        noErr(k0, "JF (ख-2) " + tg); k0.dom.window.close();
      }
      /* (ग) रुकावट में भाषा हिंदी कर दें: हिंदी नियम सामान्य रूप से; वापस इस भाषा में: फिर रुकावट (हिंदी नहीं) */
      k0 = await openPage("join.html", { ls: LS(), expect: LG, handlers: Object.assign({}, HJ), missing: RMISS("rules-consent-counselor.html") });
      await joinStep1(k0, {}); await joinOtp(k0); await joinRole(k0, { key: "counselor" }); await settle(k0);
      click(k0, k0.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await waitFor(k0, () => k0.d.querySelectorAll("#rulesContainer .rule").length > 20); await settle(k0);
      ck("JF रुकावट से हिंदी पर: हिंदी नियम सामान्य रूप से दिखे", !k0.d.getElementById("rulesBlocked") && k0.d.querySelectorAll("#rulesContainer .rule").length > 20);
      click(k0, k0.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"]')); await waitFor(k0, () => !!k0.d.getElementById("rulesBlocked")); await settle(k0); await settle(k0);
      ck("JF वापस " + LG + " पर: फिर रुकावट, हिंदी नियम हट गए", !!k0.d.getElementById("rulesBlocked") && k0.d.querySelectorAll("#rulesContainer .rule").length === 0 && !DEV.test(k0.d.getElementById("rulesContainer").textContent));
      clean(k0, "JF वापस " + LG + " पर : पूरा पन्ना");
      noErr(k0, "JF (ग)"); k0.dom.window.close();
      /* (घ) एक भूमिका के नियम स्वीकार कर चुके हों, फिर ऐसी भूमिका चुनें जिसका पत्र नहीं खुलता: पुरानी सहमति साथ नहीं आती */
      k0 = await openPage("join.html", { ls: LS(), expect: LG, handlers: Object.assign({}, HJ), missing: RMISS("rules-consent-counselor.html") });
      await joinStep1(k0, {}); await joinOtp(k0); await joinRole(k0, { key: "student" }); await waitFor(k0, () => k0.d.querySelectorAll("#rulesContainer .rule").length > 15); await settle(k0);
      { const $ = id => k0.d.getElementById(id), bulk = $("bulkConsentChk");
        if (bulk) { bulk.checked = true; bulk.dispatchEvent(new k0.w.Event("change")); } else k0.d.querySelectorAll("#rulesContainer .rule input[type=checkbox]").forEach(b => { b.checked = true; b.dispatchEvent(new k0.w.Event("change")); });
        await settle(k0); if (!$("finalChk").checked) { $("finalChk").checked = true; $("finalChk").dispatchEvent(new k0.w.Event("change")); } await settle(k0);
        ck("JF (घ) पहली भूमिका के नियम स्वीकार: आगे का बटन खुला", $("finalChk").checked && !$("toStep3Btn").disabled);
        await joinRole(k0, { key: "counselor" }); await waitFor(k0, () => !!$("rulesBlocked")); await settle(k0);
        ck("JF (घ) अब दूसरी भूमिका, जिसका पत्र नहीं खुलता: रुकावट; पुरानी सहमति हटी (अंतिम पुष्टि और आगे का बटन बंद)", !!$("rulesBlocked") && k0.d.querySelectorAll("#rulesContainer .rule").length === 0 && $("finalChk").disabled && !$("finalChk").checked && $("toStep3Btn").disabled && $("toStep3Btn").className === "big btn-off" && !DEV.test($("rulesContainer").textContent));
        click(k0, $("toStep3Btn")); await settle(k0);
        ck("JF (घ) चरण-3 नहीं खुला", $("panel2").classList.contains("active") && !$("panel3").classList.contains("active")); }
      noErr(k0, "JF (घ)"); k0.dom.window.close();
    }
    /* JL (v1.3) चरण-2 पर भाषा बदलना: हिंदी में लोड हुए नियम इस भाषा के पैनल में पन्ने के भीतर नहीं रहते (English पत्र से दोबारा लोड, टिक हटते हैं) */
    { const k9 = await openPage("join.html", { handlers: Object.assign({}, HJ) }), $ = id => k9.d.getElementById(id), RC = () => $("rulesContainer");
      const BTN = l => k9.d.querySelector('#acsPanelLangBar button[data-plang="' + l + '"]');
      await joinStep1(k9, {}); await joinOtp(k9); await joinRole(k9, { key: "counselor" }); await waitFor(k9, () => RC().querySelectorAll(".rule").length > 20); await settle(k9);
      const nHi = RC().querySelectorAll(".rule input[type=checkbox]:not(#bulkConsentChk)").length;
      RC().querySelectorAll(".rule input[type=checkbox]").forEach(b => { b.checked = true; b.dispatchEvent(new k9.w.Event("change")); }); await settle(k9);
      ck("JL हिंदी में नियम लोड हुए और टिक लगे", DEV.test(RC().textContent) && nHi > 20 && !$("finalChk").disabled);
      click(k9, BTN(LG)); await waitFor(k9, () => !!$("rulesLegalNote")); await settle(k9); await settle(k9);
      const CF9 = "rules-consent-counselor.html", t9 = k9.w.ACS_PANEL_I18N.tr(EN_NOTE);
      ck("JL हिंदी → " + LG + " (चरण-2 पर): हिंदी नियम हटे; " + (OWNR(CF9) ? "इस भाषा के" : "English") + " पत्र से दोबारा लोड; गिनती वही", !DEV.test(RC().textContent) && (OWNR(CF9) ? (RC().firstElementChild.id === "rulesLegalNote" && RC().textContent.indexOf(t9) < 0) : RC().firstElementChild.textContent === t9) &&
        RC().querySelectorAll(".rule input[type=checkbox]:not(#bulkConsentChk)").length === nHi && k9.fetched.indexOf("/" + RLG(CF9) + "/" + CF9) > -1, RC().textContent.slice(0, 160));
      ck("JL दोबारा लोड पर टिक हटे: अंतिम पुष्टि और आगे का बटन बंद", Array.from(RC().querySelectorAll(".rule input[type=checkbox]")).every(b => !b.checked) && $("finalChk").disabled && !$("finalChk").checked && $("toStep3Btn").disabled);
      clean(k9, "JL हिंदी → " + LG + " के बाद पूरा पन्ना", RH);
      ck("JL नियम स्वीकार → चरण-3", await joinRules(k9) && $("panel3").classList.contains("active"));
      click(k9, BTN("hi")); await waitFor(k9, () => !k9.w.ACS_PANEL_I18N.active); await settle(k9);
      ck("JL चरण-3 पर भाषा हिंदी की: चरण-2 के नियम नहीं छुए गए (सहमति दर्ज रही)", $("finalChk").checked && !!$("rulesLegalNote") && $("panel3").classList.contains("active"));
      click(k9, BTN(LG)); await waitFor(k9, () => k9.w.ACS_PANEL_I18N.active && k9.w.ACS_PANEL_I18N.lang() === LG); await settle(k9);
      click(k9, $("back2Btn")); await settle(k9); await settle(k9);
      ck("JL वापस " + LG + ", फिर चरण-2 पर लौटे: वही English नियम (दोबारा लोड नहीं; सहमति बनी रही)", $("finalChk").checked && !!$("rulesLegalNote") && !DEV.test(RC().textContent) && !$("toStep3Btn").disabled);
      click(k9, BTN("hi")); await waitFor(k9, () => !$("rulesLegalNote") && RC().querySelectorAll(".rule").length > 20); await settle(k9);
      ck("JL चरण-2 पर भाषा हिंदी की: नियम हिंदी में दोबारा लोड, सहमति दोबारा चाहिए", DEV.test(RC().querySelector(".rules").textContent) && $("finalChk").disabled && !$("finalChk").checked && $("toStep3Btn").disabled);
      noErr(k9, "JL"); k9.dom.window.close();
    }
  }
}

/* ───────────── D: सब dashboard ───────────── */
function pages() {
  return fs.readdirSync(path.join(ROOT, "dashboard"), { withFileTypes: true }).filter(e => e.isDirectory())
    .flatMap(e => e.name === "hq" ? fs.readdirSync(path.join(ROOT, "dashboard/hq")).map(x => "dashboard/hq/" + x + "/index.html") : ["dashboard/" + e.name + "/index.html"])
    .filter(f => fs.existsSync(path.join(ROOT, f))).sort();
}
async function runPage(file, sc) {
  sc = sc || "base";
  const c = await openDash(file, sc, LG);
  [NAME_HI, "सीता देवी"].forEach(v => { c.userVals.add(v); c.userVals.add(v.trim()[0]); });
  const up = await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden") || !c.d.getElementById("denyView").classList.contains("hidden"), 6000);
  await settle(c); await settle(c);
  const tag = "D " + file.replace(/^dashboard\//, "").replace(/\/index\.html$/, "") + (sc === "base" ? "" : " [" + sc + "]");
  ck(tag + " : dashboard खुला, भाषा " + LG, up && !c.d.getElementById("appView").classList.contains("hidden") && c.w.ACS_PANEL_I18N.lang() === LG, "appView नहीं खुला");
  if (sc === "base") ck(tag + " : भाषा-पट्टी tagline के नीचे, AI-मसौदा की सूचना साथ", !!c.d.querySelector("#acsPanelLangSlot #acsPanelLangBar") && !!c.d.querySelector("#acsPanelLangBar #acsPanelDraft"));
  const navs = Array.from(c.d.querySelectorAll("#sideNav .si"));
  for (const b of navs) { click(c, b); await settle(c); await settle(c); }
  await settle(c);
  if (sc === "data") {
    c.confirmAnswer = false;
    const acts = Array.from(c.d.querySelectorAll('#badgeBuyBtn,[data-refgift],#ofDeclare,[data-act="approve"],[data-act="reject"],[data-certext],[data-cert]'));
    for (const b of acts) { if (b.disabled) continue; click(c, b); await settle(c); await settle(c); }
    ck(tag + " : कार्रवाई-बटन दबाए (" + acts.length + ")", true);
  }
  clean(c, tag + " (" + navs.length + " पैनल)");
  ck(tag + " : <title> में देवनागरी नहीं", !DEV.test(c.d.title), c.d.title);
  noErr(c, tag); c.dom.window.close();
}
async function dashSuite() {
  const PG = pages().filter(f => !process.env.ACS_PAGE || f.indexOf(process.env.ACS_PAGE) > -1);
  for (const f of PG) { try { await runPage(f); } catch (e) { ck(f + " : robot चला", false, String(e && e.stack || e).slice(0, 400)); } }
  const SC = { data: ["student", "jobseeker", "entrepreneur", "center", "teacher", "volunteer", "admin", "founder", "regional", "zonal"], prov: ["teacher", "center", "vendor", "employer", "foreign-agent", "finance-mitra"] };
  for (const sc of Object.keys(SC)) for (const f of PG.filter(f => SC[sc].indexOf(f.split("/")[1]) > -1)) {
    try { await runPage(f, sc); } catch (e) { ck(f + " [" + sc + "] : robot चला", false, String(e && e.stack || e).slice(0, 400)); } }
  /* हिंदी में लिखा data (नाम, पता, संस्था, सहेजे कोर्स, परीक्षा): उपयोगकर्ता का लिखा वैसा ही; बाक़ी सब इस भाषा में (या सूची का English नाम) */
  { const UV = Object.keys(HU).map(k => HU[k]).concat([NAME_HI, "सीता देवी"]);
    const LIST = ["student", "jobseeker", "entrepreneur", "center", "workshop", "teacher", "admin", "founder", "regional", "zonal"];
    for (const f of PG.filter(f => LIST.indexOf(f.split("/")[1]) > -1)) {
      const tag = "D " + f.split("/")[1] + " [हिंदी data]";
      try {
        const e = await openH(f, LG), h = await openH(f, "hi");
        UV.forEach(v => { e.userVals.add(v); e.userVals.add(v.trim()[0]); });
        clean(e, tag + " (उपयोगकर्ता का अपना लिखा छोड़कर)");
        const tE = visText(e), tH = visText(h), bad = [];
        UV.forEach(v => { const a = countOf(tH, v), b = countOf(tE, v); if (a !== b) bad.push(v + " (हिंदी में " + a + " बार, " + LG + " में " + b + ")"); });
        ck(tag + " : उपयोगकर्ता का लिखा हर पाठ " + LG + " में भी उतनी ही बार, अक्षर-अक्षर वैसा", bad.length === 0, bad.slice(0, 5).join(" ‖ "));
        if (f.split("/")[1] === "student") {
          ck("D student [हिंदी data] : कोर्स का सहेजा नाम सूची के English नाम से (इस भाषा का नाम अभी नहीं), हिंदी नाम नहीं बचा", /Data Entry Operator/.test(tE) && /Computer Operator/.test(tE) && !/धान/.test(tE), (tE.match(/.{0,40}(धान|कृषि|ऑपरेटर).{0,40}/) || [""])[0]);
          const eb = e.d.querySelector("[data-exam]");
          if (eb) { click(e, eb); await waitFor(e, () => e.d.getElementById("xmStart"), 4000); await settle(e);
            const st = e.d.getElementById("xmStart"); if (st) { click(e, st); await waitFor(e, () => e.d.querySelector(".xm-q"), 4000); await settle(e); await settle(e); }
            const q = (e.d.querySelector(".xm-q") || {}).textContent || "", ops = Array.from(e.d.querySelectorAll(".xm-opt span")).map(x => x.textContent), ab = Array.from(e.d.querySelectorAll(".xm-opt i")).map(x => x.textContent).join("");
            ck("D परीक्षा : प्रश्न और विकल्प कोर्स की भाषा में, अक्षर-अक्षर वैसे (भाषा-इंजन नहीं छूता); विकल्प के अक्षर A B C D", q.indexOf(HQ[0]) === 0 && ops.join("|") === HQ.slice(1).join("|") && ab === "ABCD", q.slice(0, 80) + " ‖ " + ops.join("|") + " ‖ " + ab);
            HQ.forEach(v => e.userVals.add(v));
            clean(e, "D परीक्षा : परीक्षा के पन्ने पर बाक़ी सब " + LG + " में");
          } else ck("D परीक्षा : परीक्षा का बटन मिला", false, "data-exam नहीं");
        }
        const er = e.errors.concat(h.errors); ck(tag + " : JS-त्रुटि शून्य", er.length === 0, er.slice(0, 3).join(" ‖ "));
        e.dom.window.close(); h.dom.window.close();
      } catch (err) { ck(tag + " : जाँच चली", false, String(err && err.stack || err).slice(0, 500)); }
    } }
  /* सहेजा हुआ कोर्स-नाम, जब कोर्स-सूची अभी आई ही न हो (सिर्फ़ "मेरा केंद्र" खोला): इस भाषा के पैनल में सूची अपने-आप मँगाई जाए और नाम ठीक हो */
  for (const f of PG.filter(f => f.split("/")[1] === "student")) {
    try {
      const e = await openH(f, LG, undefined, ["pnl-myctr"]);
      const pn = e.d.getElementById("pnl-myctr");
      await waitFor(e, () => /Data Entry Operator/.test(pn.textContent), 5000); await settle(e);
      ck("D student : सिर्फ़ \"मेरा केंद्र\" खोलने पर भी सहेजा कोर्स-नाम सूची के English नाम में (कोर्स-सूची अपने-आप मँगाई गई)", /Data Entry Operator/.test(pn.textContent) && !/डेटा एंट्री/.test(pn.textContent), (pn.textContent.match(/.{0,50}(डेटा|Data Entry).{0,50}/) || ["नाम नहीं मिला"])[0]);
      e.dom.window.close();
    } catch (err) { ck(f + " : कोर्स-नाम जाँच चली", false, String(err && err.stack || err).slice(0, 300)); }
  }
  /* (E3) काग़ज़: इस भाषा के पैनल में प्रमाणपत्र और पहले से लिखे संदेश (WhatsApp आदि) ठीक वही जो English पैनल में; देवनागरी शून्य।
     आधा अनूदित काग़ज़ कभी नहीं: या पूरा English (अभी), या इस भाषा वाला (अगली खेप)। */
  for (const f of PG.filter(f => f.split("/")[1] === "student")) {
    try {
      const k = await openDoc(f, LG), h = await openDoc(f, "en");
      const okK = await certClick(k), okH = await certClick(h);
      const tK = k.canvasText.map(z => z.t), tH = h.canvasText.map(z => z.t);
      if (ck("D student : (E3) प्रमाणपत्र इस भाषा के पैनल में ठीक वही जो English पैनल में (" + tH.length + " पंक्तियाँ), देवनागरी शून्य, फ़ाइल सहेजी", okK && okH && tH.length > 30 && JSON.stringify(tK) === JSON.stringify(tH) && !tK.some(t => DEV.test(t)) && k.saved[0] === h.saved[0] && !!k.saved[0], "बटन " + okK + "/" + okH + " · पंक्तियाँ " + tK.length + "/" + tH.length + " · " + firstDiff(tK, tH) + " · " + tK.filter(t => DEV.test(t)).slice(0, 2).join(" | "))) HOLES.E3++;
      /* पहले से लिखे संदेश (WhatsApp) इसी भाषा में; करियर टेस्ट की कड़ी इसी भाषा के पन्ने पर; बाक़ी कड़ियाँ वही जो English पैनल में */
      const OWNP = (k.w.ACS_PANEL_PACKS[LG] || {}).P || {}, hk = docLinks(k).map(a => a.getAttribute("href")), hh = docLinks(h).map(a => a.getAttribute("href"));
      const wa = hk.filter(x => /wa\.me/.test(x)).map(decText), waE = hh.filter(x => /wa\.me/.test(x)).map(decText);
      ck("D student : WhatsApp के पहले से लिखे संदेश इसी भाषा में (जिनका पक्का वाक्य पैक में है; रिपोर्ट का पाठ और बिना-संदेश की कड़ी English पैनल जैसी), देवनागरी शून्य", wa.length > 0 && wa.length === waE.length && wa.every((t, i) => !DEV.test(t.split(NAME_HI.trim()).join("")) && (own(t) ? t !== waE[i] : t === waE[i])) && wa.filter(own).length >= 2, "इसी भाषा में " + wa.filter(own).length + " / " + wa.length + " · " + wa.filter((t, i) => DEV.test(t.split(NAME_HI.trim()).join("")) || (!own(t) && t !== waE[i])).slice(0, 2).join(" | "));
      const ap = hk.filter(x => /aptitude-test\.html/.test(x)), want = OWNP["/en/aptitude-test.html"];
      ck("D student : करियर टेस्ट की कड़ियाँ (" + ap.length + ") इसी भाषा के टेस्ट-पन्ने पर (" + (want || "पन्ना नहीं: English") + "), लौटने का पता साथ", ap.length > 0 && ap.every(x => x.indexOf(want || "/en/aptitude-test.html") === 0) && ap.some(x => /\?back=/.test(x)), ap.join(" , "));
      const rest = x => x.filter(y => !/wa\.me|aptitude-test\.html/.test(y));
      ck("D student : बाक़ी काग़ज़-कड़ियाँ ठीक वही जो English पैनल में", JSON.stringify(rest(hk)) === JSON.stringify(rest(hh)), firstDiff(rest(hk), rest(hh)));
      click(k, k.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(k); await settle(k);
      { const back = docLinks(k).map(a => a.getAttribute("href")), h0 = await openDoc(f, "hi"), hi0 = docLinks(h0).map(a => a.getAttribute("href")); h0.dom.window.close();
        ck("D student : हिंदी पर लौटने पर सब काग़ज़-कड़ियाँ हिंदी वाली (सीधे हिंदी में खोले पन्ने जैसी)", JSON.stringify(back) === JSON.stringify(hi0), firstDiff(back, hi0)); }
      noErr(k, "D student काग़ज़"); [k, h].forEach(x => x.dom.window.close());
    } catch (e) { ck(f + " : काग़ज़-जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* (E1) dashboard की नियम-कड़ी: English नियम-पत्र पर (जिन पन्नों में data-href-en है); हिंदी पर लौटने पर हिंदी पत्र पर */
  for (const f of PG.filter(f => ["teacher", "student", "center"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const c = await openDash(f, "base", LG); await openAll(c);
      const as = Array.from(c.d.querySelectorAll('a[data-href-en*="rules-consent"]'));
      ck("D " + f.split("/")[1] + " : नियम-पत्र की कड़ी इस भाषा के पत्र पर (वह न बना हो, तो English पत्र पर) (" + as.length + ")", as.length > 0 && as.every(a => { const m = /^\/en\/(rules-consent-[a-z-]+\.html)$/.exec(a.getAttribute("data-href-en") || ""); return !!m && a.getAttribute("href") === "/" + RLG(m[1]) + "/" + m[1]; }), as.map(a => a.getAttribute("href")).join(","));
      click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c); await settle(c);
      ck("D " + f.split("/")[1] + " : हिंदी पर लौटने पर नियम-पत्र की कड़ी हिंदी पत्र पर", as.length > 0 && as.every(a => /^\/rules-consent-/.test(a.getAttribute("href"))), as.map(a => a.getAttribute("href")).join(","));
      c.dom.window.close();
    } catch (e) { ck(f + " : नियम-कड़ी जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* उपयोगकर्ता का नाम जिसके शब्द पैक में भी हैं: नाम वैसा ही रहे */
  for (const f of PG.filter(f => ["student", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const info = P2.pageInfo(f), data = P2.fixture(info, "base"); data.registrations.r1.name_local = "संगीत माली"; if (data.teams.u1) data.teams.u1.name_local = "संगीत माली";
      const c = await openPage(f, { transform: P2.dashTransform, urlPath: "/" + f.replace(/index\.html$/, ""), ls: LS(), expect: LG, handlers: Object.assign({}, P2.HANDLERS), fb: P2.makeFB(data, { uid: "u1", email: "ram@example.com" }) });
      await openAll(c);
      const who = c.d.getElementById("tbWho").textContent, pn = c.d.getElementById("pName").textContent;
      ck("D " + f.split("/")[1] + " : उपयोगकर्ता का नाम इस भाषा में भी वैसा ही (\"संगीत माली\")", who.indexOf("संगीत माली") > -1 && pn.indexOf("संगीत माली") > -1, who + " | " + pn);
      c.dom.window.close();
    } catch (e) { ck(f + " : नाम-जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* server के संदेश असली dashboard में; फिर हिंदी पर लौटकर मूल वापस */
  for (const f of PG.filter(f => ["student", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const SM = JSON.parse(rd("generator/data/panel_i18n/server_msgs.json")).msgs.map(x => x.hi), fill = t => t.replace(/\{(\d+)\}/g, (_, d) => "X" + d + "7");
      const c = await openDash(f, "base", LG), tag = "D " + f.split("/")[1];
      await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden"), 6000); await settle(c);
      const box = c.d.createElement("div"), want = [];
      SM.forEach((m, i) => { const p = c.d.createElement("p"), t = (i % 2 ? "नहीं हुआ: " : "") + fill(m); want.push(t); p.textContent = t; box.appendChild(p); });
      c.d.getElementById("appView").appendChild(box); await settle(c); await settle(c);
      const left = Array.from(box.children).map(p => p.textContent).filter(t => DEV.test(t));
      ck(tag + " : server के " + SM.length + " संदेश dashboard में " + LG, SM.length > 250 && left.length === 0, left.length + " बचे: " + left.slice(0, 4).join(" ‖ "));
      c.dialogs.length = 0; SM.forEach(m => c.w.alert("काम पूरा नहीं हुआ: " + fill(m)));
      const dl = c.dialogs.filter(x => DEV.test(x));
      ck(tag + " : server के संदेश संदेश-डिब्बे में " + LG + " (" + c.dialogs.length + ")", c.dialogs.length === SM.length && dl.length === 0, dl.slice(0, 3).join(" ‖ "));
      click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c); await settle(c);
      const back = Array.from(box.children).map(p => p.textContent);
      ck(tag + " : हिंदी पर लौटने पर server के संदेश मूल हिंदी में", back.length === want.length && back.every((t, i) => t === want[i]), back.filter((t, i) => t !== want[i]).slice(0, 3).join(" ‖ "));
      c.dom.window.close();
    } catch (e) { ck(f + " : server-संदेश जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* इस भाषा से हिंदी पर लौटना = ताज़ा हिंदी; और English से आना-जाना */
  for (const f of PG.filter(f => ["student", "center", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const tag = "D " + f.split("/")[1];
      const hA = await openDash(f, "data", "hi"); await openAll(hA);
      const e = await openDash(f, "data", LG); await openAll(e);
      click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="en"]')); await waitFor(e, () => e.w.ACS_PANEL_I18N.lang() === "en"); await settle(e); await settle(e); await settle(e);
      [NAME_HI, "सीता देवी"].forEach(v => { e.userVals.add(v); e.userVals.add(v.trim()[0]); });
      { const L = leaks(e); ck(tag + " : " + LG + " → English: देवनागरी शून्य", L.length === 0, L.slice(0, 5).join(" ‖ ")); }
      click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="' + LG + '"]')); await waitFor(e, () => e.w.ACS_PANEL_I18N.lang() === LG); await settle(e); await settle(e); await settle(e);
      clean(e, tag + " : English → " + LG);
      click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e); await settle(e);
      const bE = bodyText(e), bH = bodyText(hA); let di = 0; while (di < bE.length && bE[di] === bH[di]) di++;
      ck(tag + " : " + LG + " → English → " + LG + " → हिंदी = बिल्कुल ताज़ा हिंदी", bE === bH && e.d.title === hA.d.title, "पहला फ़र्क़: …" + bE.slice(Math.max(0, di - 120), di + 160) + "…  ‖  …" + bH.slice(Math.max(0, di - 120), di + 160) + "…");
      [hA, e].forEach(x => x.dom.window.close());
    } catch (e) { ck(f + " : भाषा-बदल जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
}

(async function main() {
  try {
    if (!ONLY || ONLY === "static") staticSuite();
    if (!ONLY || ONLY === "login") await loginSuite();
    if (!ONLY || ONLY === "guide") await guideSuite();
    if (!ONLY || ONLY === "join") await joinSuite();
    if (!ONLY || ONLY === "dash") await dashSuite();
  } catch (e) { ck("robot बीच में रुका", false, e && e.stack); }
  if (process.env.ACS_INV) fs.writeFileSync(process.env.ACS_INV, Array.from(INV.entries()).map(([k, v]) => v.length + "\t" + Array.from(new Set(v)).slice(0, 6).join(",") + "\t" + k).sort().join("\n") + "\n");
  console.log("\nजाँचें: पास " + pass + " · FAIL " + fail + " · समय " + Math.round((Date.now() - t0) / 1000) + " सेकंड");
  console.log("अभी English में (इस भाषा के अपने रूप बनने तक): E1 नियम-पत्र " + HOLES.E1 + " बार देखा · E2 परदे की नियम-पत्र कड़ी " + HOLES.E2 + " · E3 प्रमाणपत्र, OTP का email, बिना अपने रूप वाले मेनू-पन्ने " + HOLES.E3);
  console.log(fail ? "⛔ dev_panel_lang_check (" + LG + ") रुका" : "🏁 dev_panel_lang_check v1.4 : पैनल " + LG + " (" + LI.hi + ") पास");
  process.exit(fail ? 1 : 0);
})();
