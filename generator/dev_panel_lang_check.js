#!/usr/bin/env node
/* ============================================================
   dev_panel_lang_check.js v1.0 (15-Nov-2026) · English के अलावा हर पैनल-भाषा का पहरेदार (पहली भाषा: कन्नड़, खेप क-1)
   Founder का आदेश (15-Nov-2026): "कोई यूजर एक बार अपने पैनल को ... ले तो उसको देवनागरी में कुछ भी नहीं दिखना चाहिए।"
   यह robot असली पन्ने (लॉगिन, रजिस्ट्रेशन, रजिस्ट्रेशन गाइड, सब dashboard) jsdom में उस भाषा में खोलकर हर बटन दबाता है और देखता है:
     • दिखने वाले पाठ, attribute, <title> और संदेश-डिब्बों में देवनागरी शून्य;
     • server को जाने वाला data वही जो हिंदी पन्ने से जाता है (भाषा सिर्फ़ दिखावट है);
     • भाषा बदलकर हिंदी पर लौटना = बिल्कुल ताज़ा हिंदी पन्ना; English और इस भाषा के बीच आना-जाना;
     • भाषा-पट्टी के नीचे उसी भाषा में "AI-मसौदा" की सूचना।
   दर्ज होल (इस खेप में जान-बूझकर; भाषा की दूसरी खेप में बंद होंगे), जिन्हें यह robot गिनकर दिखाता है, छिपाता नहीं:
     H1 नियम-पत्र का क़ानूनी हिस्सा हिंदी में (ऊपर उसी भाषा में सूचना); सहमति की भाषा "hi" ही दर्ज होती है।
     H2 नियम-परदा (नियम-पत्र बदलने पर दोबारा सहमति) हिंदी + English में।
     H3 काग़ज़ (प्रमाणपत्र, परिचय-पत्र, WhatsApp के पहले से लिखे संदेश, छपाई) और OTP का email हिंदी में: OTP की माँग में lang = "hi"।
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
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const t0 = Date.now(), INV = new Map(), HOLES = { H1: 0, H2: 0, H3: 0 };
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
  ck("S8 पैक का दायरा वही जो English का; पूरा पैनल अभी नहीं (काग़ज़ और नियम-पत्र बाक़ी); AI-मसौदा की सूचना पैक में", JSON.stringify(P.scope) === JSON.stringify(EP.scope) && P.complete === false && typeof P.draft === "string" && own(P.draft) && !DEV.test(P.draft), JSON.stringify(P.scope) + " " + P.complete + " " + P.draft);
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
  /* L6 विद्यार्थी: session → नियम-परदा (दर्ज होल H2: हिंदी + English) → सफलता */
  c.handlers.__signIn = H.__signIn;
  const loginP = c.w.doLogin(); await waitFor(c, () => $("rulesGate"), 3000); await settle(c); await settle(c);
  if (ck("L6 नियम-परदा खुला", !!$("rulesGate"))) {
    const gt = $("rulesGate").textContent;
    if (ck("L6 (दर्ज होल H2) नियम-परदा हिंदी + English में, कड़ी हिंदी नियम-पत्र पर", DEV.test(gt) && /Continue/.test(gt) && $("rulesGateLink").getAttribute("href") === "/rules-consent-learner.html", $("rulesGateLink").getAttribute("href"))) HOLES.H2++;
    $("rulesGateChk").checked = true; $("rulesGateChk").dispatchEvent(new c.w.Event("change")); click(c, $("rulesGateOk")); await loginP; await settle(c);
    const acc = c.calls.filter(x => x.name === "rulesAccept").pop();
    ck("L6 सहमति के साथ भाषा hi और संस्करण (हिंदी नियम-पत्र ही पढ़ा गया)", !!acc && acc.data.language === "hi" && acc.data.version === "1.2", JSON.stringify(acc && acc.data));
    ck("L6 परदा हटा, सफलता-चरण", !$("rulesGate") && $("c5").classList.contains("show"));
    clean(c, "L6 सफलता-चरण");
  }
  noErr(c, "L1-L6"); c.dom.window.close();
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
    if (ck("L8 (दर्ज होल H3) OTP की माँग में lang = hi (email अभी हिंदी में), और सिर्फ़ email + lang", q.length === 3 && q.every(x => x.data && x.data.lang === "hi" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data)))) HOLES.H3++; }
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
  /* L10 menu की कड़ियाँ: इस भाषा के पन्ने अभी नहीं, इसलिए हिंदी पते ही (English पन्नों पर नहीं भेजते) */
  const mis = Array.from(c.d.querySelectorAll("#acsMenuList a,#acsFooterMenu a")).filter(a => /mission/.test(a.getAttribute("href")));
  ck("L10 menu की कड़ी मूल पते पर (English पन्ने पर नहीं)", mis.length > 0 && mis.every(a => !/^\/en\//.test(a.getAttribute("href"))), mis.map(a => a.getAttribute("href")).join(","));
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
  if (ck("G2 (दर्ज होल H1) विद्यार्थी के नियम: कड़ी हिंदी नियम-पत्र पर, साथ में उसी भाषा में सूचना", !!a && a.getAttribute("href") === "/rules-consent-learner.html" && !!note && !note.hasAttribute("hidden") && own(note.textContent) && !DEV.test(note.textContent), a && (a.getAttribute("href") + " | " + (note && note.textContent)))) HOLES.H1++;
  ck("G2 आवेदन-बटन की कड़ी वही (भाषा रजिस्ट्रेशन में अपने-आप)", c.d.querySelector("#acc-teacher a.applyBtn").getAttribute("href") === "/join.html?role=teacher");
  noErr(c, "G1-G2");
  const hA = await OPEN({});
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c); await settle(c);
  const hO = await OPEN({}); for (const k of MX.cards.map(x => x.key)) { click(hO, hO.d.querySelector("#acc-" + k + " .acc-head")); await settle(hO); } click(hO, hO.d.querySelector("#acc-student .acc-head")); await settle(hO); await settle(hO);
  ck("G3 गाइड " + LG + " → हिंदी: बिल्कुल ताज़ा हिंदी जैसा (खुले खंड, कड़ियाँ, सूचनाएँ)", bodyText(c) === bodyText(hO) && c.d.title === hA.d.title);
  [c, hA, hO].forEach(x => x.dom.window.close());
}

/* ───────────── J: रजिस्ट्रेशन ───────────── */
const RH = { allowRulesHole: true };
const HI_NOTE = "ℹ️ इस भूमिका के नियम अभी सिर्फ़ हिंदी में हैं। हिंदी ही क़ानूनी मूल है।";   /* रजिस्ट्रेशन का अपना वाक्य (_JOIN_TEMPLATE.html) */
async function joinFull(rl, mode, extra) {
  extra = extra || {};
  const T = mode !== "hi";
  const c = await openPage("join.html", { ls: T ? LS() : {}, expect: mode, handlers: Object.assign({}, HJ) });
  const tag = "J[" + mode + "] " + rl.key + (extra.minor ? " (नाबालिग)" : "") + (rl.country && rl.country !== "in" ? " (" + rl.country + ")" : "");
  const res = { tag }, $ = id => c.d.getElementById(id);
  if (T && extra.first) { clean(c, "J1 रजिस्ट्रेशन पहला दृश्य (सब चरण)"); ck("J1 <title> में देवनागरी नहीं", !DEV.test(c.d.title), c.d.title); }
  await joinStep1(c, extra);
  if (T && extra.first) clean(c, "J2 चरण-1 भरा हुआ");
  await joinOtp(c);
  if (!ck(tag + " : OTP के बाद चरण-2", $("panel2").classList.contains("active"))) { c.dom.window.close(); return res; }
  await joinRole(c, rl);
  if (T) {
    c.holeSeen = false; clean(c, tag + " : चरण-2 भूमिका + नियम (क़ानूनी हिस्सा छोड़कर)", RH);
    const rc = $("rulesContainer"), first = rc.firstElementChild, nRules = rc.querySelectorAll(".rule input[type=checkbox]:not(#bulkConsentChk)").length;
    const hiSrc = rd(R.ruleFileFor(rl.key)), nHi = (hiSrc.match(/<div class="rule(?:"| [^"]*")[^>]*>\s*<input type="checkbox"/g) || []).length;
    if (ck(tag + " : (दर्ज होल H1) नियम हिंदी मूल से, सबसे ऊपर उसी भाषा में सूचना; नियमों की गिनती मूल जितनी (" + nHi + ")",
      c.holeSeen === true && !!first && first.textContent === c.w.ACS_PANEL_I18N.tr(HI_NOTE) && own(first.textContent) && !DEV.test(first.textContent) && nRules === nHi && nHi > 15 && !c.fetched.some(p => p === "/en/" + R.ruleFileFor(rl.key)),
      (first && first.textContent.slice(0, 120)) + " | नियम " + nRules + "/" + nHi)) HOLES.H1++;
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
  ck(tag + " : OTP की माँग में lang = hi, और सिर्फ़ email + lang", q.length >= 1 && q.every(x => x.data && x.data.lang === "hi" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data)));
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
    const b = await joinFull(run.rl, "hi", run.extra);
    const tagP = a.tag.replace("J[" + LG + "]", "JP");
    ck(tagP + " : consent_language = hi (हिंदी नियम-पत्र ही दिखा), दोनों में", !!a.payload && !!b.payload && a.payload.consent_language === "hi" && b.payload.consent_language === "hi", (a.payload || {}).consent_language + " / " + (b.payload || {}).consent_language);
    if (ck(tagP + " : server को data हिंदी पन्ने जैसा ही (अक्षर-अक्षर)", !!a.payload && JSON.stringify(a.payload) === JSON.stringify(b.payload), firstDiff(a.payload, b.payload))) same++;
  }
  ck("JP सब भूमिकाओं में data एक-जैसा (" + same + "/" + runs.length + ")", same === runs.length);
  if (!PICK.length) {
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
  /* (दर्ज होल H3) काग़ज़: इस भाषा के पैनल में प्रमाणपत्र और पहले से लिखे संदेश (WhatsApp आदि) अभी ठीक वही जो हिंदी पैनल में।
     आधा अनूदित काग़ज़ कभी नहीं: या पूरा हिंदी (अभी), या पूरा इस भाषा में (अगली खेप)। */
  for (const f of PG.filter(f => f.split("/")[1] === "student")) {
    try {
      const k = await openDoc(f, LG), h = await openDoc(f, "hi");
      const okK = await certClick(k), okH = await certClick(h);
      const tK = k.canvasText.map(z => z.t), tH = h.canvasText.map(z => z.t);
      if (ck("D student : (दर्ज होल H3) प्रमाणपत्र इस भाषा के पैनल में ठीक वही जो हिंदी पैनल में (" + tH.length + " पंक्तियाँ), फ़ाइल सहेजी", okK && okH && tH.length > 30 && JSON.stringify(tK) === JSON.stringify(tH) && k.saved[0] === h.saved[0] && !!k.saved[0], "बटन " + okK + "/" + okH + " · पंक्तियाँ " + tK.length + "/" + tH.length + " · " + firstDiff(tK, tH))) HOLES.H3++;
      const lK = docLinks(k).map(a => decText(a.getAttribute("href"))), lH = docLinks(h).map(a => decText(a.getAttribute("href")));
      ck("D student : (दर्ज होल H3) पहले से लिखे संदेशों की कड़ियाँ (" + lH.length + ") ठीक वही जो हिंदी पैनल में", lH.length > 0 && JSON.stringify(lK) === JSON.stringify(lH), firstDiff(lK, lH));
      noErr(k, "D student काग़ज़"); [k, h].forEach(x => x.dom.window.close());
    } catch (e) { ck(f + " : काग़ज़-जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
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
  console.log("दर्ज होल (जान-बूझकर, अगली खेप में बंद): H1 नियम-पत्र हिंदी में " + HOLES.H1 + " बार देखा · H2 नियम-परदा हिंदी + English " + HOLES.H2 + " · H3 OTP का email हिंदी (lang=hi) " + HOLES.H3);
  console.log(fail ? "⛔ dev_panel_lang_check (" + LG + ") रुका" : "🏁 dev_panel_lang_check v1.0 : पैनल " + LG + " (" + LI.hi + ") पास");
  process.exit(fail ? 1 : 0);
})();
