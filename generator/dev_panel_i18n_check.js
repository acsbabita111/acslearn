#!/usr/bin/env node
/* ================================================================
   dev_panel_i18n_check.js v1.7 (16-Nov-2026) : पैनल-1 का पहरेदार
   v1.7 (कन्नड़ क-1 v1.2, Founder का आदेश 16-Nov-2026): हर ग़ैर-हिंदी भाषा में साफ़ लिखा हो कि क़ानूनन हिंदी नियम-पत्र ही मान्य है, और हिंदी
     नियम-पत्र की कड़ी हो: नियम-परदे (L6), रजिस्ट्रेशन के नियम-चरण (J) और गाइड (G8) की जाँचें।
   v1.5 (पैनल-6): रजिस्ट्रेशन की OTP-माँग में सिर्फ़ email और lang जाते हैं (पासवर्ड नहीं)।
   v1.6 (कन्नड़ क-1): openPage का expect अब हर पैनल-भाषा के लिए; रजिस्ट्रेशन के क़दम (joinStep1 ...) बाहर भी मिलते हैं
     (dev_panel_lang_check.js के लिए)। English की जाँचें वही; भाषा-पट्टी में अब तीसरा बटन (कन्नड़) भी है।
   v1.5 (पैनल-6): OTP माँगते समय पैनल की भाषा server को जाती है (lang: "en" या "hi"), ताकि OTP का email उसी भाषा में आए:
   login, दोबारा OTP, पासवर्ड भूले, रजिस्ट्रेशन (L11, LH3, JP)।
   v1.4 (पैनल-5): 26 भूमिकाओं के English नियम-पत्र आ गए: "दर्ज होल" बंद। अब हर भूमिका में नियम English फ़ाइल से,
   consent_language = en, दर्ज संस्करण = हिंदी मूल की संख्या; बासी English फ़ाइल = हिंदी मूल + सूचना (J7, G9)।
   v1.1 (पैनल-1ख): + रजिस्ट्रेशन गाइड (G) और सूचियों का English क्रम (JS)
   v1.2 (पैनल-2): S3 दायरा अब सब dashboard समेत; पैक-इंजन v1.2 (data-tr-*); fb-विकल्प (नक़ली Firebase);
   L0: भाषा-बटन पर नाम तीनों रूप में (देवनागरी · रोमन · अपनी लिपि)।
   v1.3 (पैनल-3): S3 दायरे में server के संदेश; पैक में T (साँचे)।
   dashboard का अपना पहरेदार: dev_panel_dash_check.js
   (लॉगिन पन्ना /dashboard/ + रजिस्ट्रेशन /join.html, भाषा-इंजन + English पैक)
   Founder-नियम (15-Nov): पहले पूरा पैनल English, फिर बांग्ला, कन्नड़, मराठी;
   उसके बाद ही किसी कोर्स का अनुवाद। 🏁 के बिना यह काम आगे नहीं जाता।

   असली पन्ने नक़ली browser (jsdom) में चलते हैं; server की जगह नक़ली जवाब।
   जाँचें:
     S  : स्थिर जाँच (पैक ताज़ा, इंजन acs_lang नहीं पढ़ता, rules-gate, universal)
     L  : लॉगिन English: हर चरण, हर भूमिका-कार्ड, हर ग़लती-संदेश, OTP, पासवर्ड भूलना,
          नियम-परदा, session-विफलता : दिखने वाला हर पाठ और हर attribute बिना हिंदी
     LH : हिंदी पहले जैसी (इंजन होने से हिंदी पन्ने का एक अक्षर नहीं बदला)
     LS : भाषा बदलना बिना पन्ना खोले (English → हिंदी = बिल्कुल ताज़ा हिंदी पन्ना)
     LB : browser की भाषा से कभी नहीं (acs_lang=en हो तब भी हिंदी)
     J  : रजिस्ट्रेशन English: हर भूमिका (कार्ड + टीम के हर पद) का पूरा सफ़र
          step-1 → OTP → step-2 → नियम → step-3 → दस्तावेज़ → step-4 → submit → PDF
     JP : server को जाने वाला data English में भी हूबहू वही जो हिंदी में (हर भूमिका)
     JS : English में देश/राज्य/जिला सूचियाँ A-Z (value वही); हिंदी में मूल क्रम
     G  : रजिस्ट्रेशन गाइड English: हर खंड, नियम-कड़ियाँ (अनुवाद तभी जब संस्करण मिले), होम-कड़ी; हिंदी हूबहू
   चलाना (repo-root से):  npm i jsdom@24 --no-save   फिर   node generator/dev_panel_i18n_check.js
   (jsdom कहीं और हो तो:  ACS_JSDOM=<पता>/node_modules/jsdom node generator/dev_panel_i18n_check.js)
   ================================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
function loadJsdom() {
  const tries = [process.env.ACS_JSDOM, "jsdom", path.join(ROOT, "node_modules/jsdom")].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) {} }
  console.log("⛔ jsdom नहीं मिला। पहले चलाएँ:  npm i jsdom@24 --no-save   (या ACS_JSDOM=<jsdom का पता>)");
  process.exit(2);
}
const { JSDOM, ResourceLoader, VirtualConsole } = loadJsdom();

let pass = 0, fail = 0;
function ck(name, ok, extra) {
  if (ok) { pass++; return true; }
  fail++; console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 900) : "")); return false;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
const DEV = /[ऀ-ॿ]/;
const rd = p => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ───────────── S: स्थिर जाँच ───────────── */
const ENG = rd("assets/panel_i18n.js");
const PACK_SRC = rd("assets/i18n/panel_en.js");
const GATE = rd("assets/rules-gate.js");
const UNI = rd("assets/acs-universal.js");
function staticSuite() {
  const r = cp.spawnSync(process.execPath, [path.join(ROOT, "generator/build_panel_i18n.js"), "en", "--check"], { encoding: "utf8" });
  ck("S1 English पैक ताज़ा है (build_panel_i18n.js en --check)", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const m = PACK_SRC.match(/window\.ACS_PANEL_PACKS\["en"\]=(\{[\s\S]*\});\s*$/);
  let P = null; try { P = m && JSON.parse(m[1]); } catch (e) {}
  ck("S2 पैक पढ़ने-योग्य JSON", !!P);
  if (P) {
    const vals = Object.values(P.D);
    ck("S3 पैक का दायरा login + join + guide + सब dashboard + server के संदेश (पैनल-3), पूरा पैनल अभी नहीं (canvas, नियम-पत्र बाक़ी)", JSON.stringify(P.scope) === '["login","join","guide","dash-ext","dash-team","server"]' && P.complete === false && Array.isArray(P.T) && P.T.length > 40, JSON.stringify(P.scope) + " " + P.complete);
    ck("S4 पैक के English में हिंदी अक्षर शून्य", vals.every(v => !DEV.test(v)), vals.filter(v => DEV.test(v)).slice(0, 5).join(" | "));
    ck("S5 पैक में em dash (—) और टूटा अक्षर (U+FFFD) शून्य", vals.every(v => v.indexOf("—") < 0 && v.indexOf("�") < 0));
  }
  ck("S6 इंजन acs_lang नहीं पढ़ता (browser की भाषा उसमें आ जाती है)", ENG.indexOf('getItem("acs_lang")') < 0 && ENG.indexOf("getItem('acs_lang')") < 0);
  ck("S7 इंजन में चाबी acs_dash_lang और has()", /var LSK="acs_dash_lang"/.test(ENG) && /has:known/.test(ENG));
  ck("S8 नियम-परदा भाषा देखता है और अनुवाद-इंजन से बाहर है", /function gateLang\(\)/.test(GATE) && /data-i18n-skip/.test(GATE));
  ck("S9 universal: 🌐 से चुनी भाषा acs_dash_lang में + पैनल पर वहीं बदलती है", /localStorage\.setItem\("acs_dash_lang", c\)/.test(UNI) && /ACS_PANEL_I18N\.set\(c\)/.test(UNI));
  for (const f of ["dashboard/_LOGIN_TEMPLATE.html", "_JOIN_TEMPLATE.html", "dashboard/index.html", "join.html"]) {
    const h = rd(f);
    ck("S10 " + f + " में इंजन + भाषा-पट्टी की जगह", /<script src="\/assets\/panel_i18n\.js"><\/script>/.test(h) && /id="acsPanelLangSlot"/.test(h));
  }
  const lt = rd("dashboard/_LOGIN_TEMPLATE.html");
  ck("S11 लॉगिन में पुराना hi/en toggle नहीं बचा", !/data-en=/.test(lt) && !/switchLang\(/.test(lt) && !/applyLang\(/.test(lt));
  /* join/login generator से ताज़ा हैं या नहीं : यह dev_dash_gen_check.js देखता है */
}

/* ───────────── नक़ली browser ───────────── */
const FB_COMPAT = "window.firebase={apps:[],initializeApp:function(c){this.apps.push({options:c});return this.apps[0];}," +
  "functions:function(){return {httpsCallable:function(n,o){return function(d){return window.__CALL(n,d).then(function(r){return {data:r};});};}};}};";
class Loader extends ResourceLoader {
  fetch(url) {
    let u; try { u = new URL(url); } catch (e) { return Promise.resolve(Buffer.from("")); }
    if (u.hostname === "acslearn.com") {
      let p = decodeURIComponent(u.pathname); if (p.endsWith("/")) p += "index.html";
      const f = path.join(ROOT, p);
      if (fs.existsSync(f) && fs.statSync(f).isFile()) return Promise.resolve(fs.readFileSync(f));
      return Promise.reject(new Error("404 " + p));
    }
    if (/firebase-app-compat\.js$/.test(u.pathname)) return Promise.resolve(Buffer.from(FB_COMPAT));
    return Promise.resolve(Buffer.from(""));
  }
}
function loginTransform(html) {
  let n = 0, dyn = 0;
  const out = html.replace(/<script type="module">([\s\S]*?)<\/script>/, function (m, body) {
    n++;
    body = body.replace(/^import \{([^}]*)\} from "[^"]*";$/gm, function (x, names) { n++; return "const {" + names + "} = window.__FB;"; });
    body = body.replace('import("/assets/rules-gate.js")', function () { dyn++; return "window.__importGate()"; });
    return "<script>(async function(){\n" + body + "\n})();</script>";
  });
  if (n !== 5 || dyn !== 1) throw new Error("लॉगिन का module-script बदला हुआ है (imports " + (n - 1) + ", dynamic " + dyn + ") : robot अद्यतन करें");
  return out;
}
const GATE_CLASSIC = GATE.replace("export function rulesGate", "function rulesGate") + "\n;window.__RG={rulesGate:rulesGate};";

async function openPage(file, opt) {
  opt = opt || {};
  let html = rd(file);
  if (opt.transform) html = opt.transform(html);
  const urlPath = opt.urlPath || ("/" + file.replace(/index\.html$/, ""));
  const ctx = { calls: [], dialogs: [], errors: [], fetched: [], userVals: new Set(), confirmAnswer: true, handlers: opt.handlers || {} };
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => { const m = String(e && (e.message || e)); if (!/Not implemented|Could not load (link|img|iframe)/.test(m)) ctx.errors.push(m.slice(0, 300)); });
  const dom = new JSDOM(html, {
    url: "https://acslearn.com" + urlPath + (opt.query || ""), runScripts: "dangerously", resources: new Loader(),
    pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      const ls = opt.ls || {}; for (const k of Object.keys(ls)) w.localStorage.setItem(k, ls[k]);
      w.scrollTo = function () {}; w.Element.prototype.scrollIntoView = function () {};
      w.alert = m => { ctx.dialogs.push(String(m)); };
      w.confirm = m => { ctx.dialogs.push(String(m)); return ctx.confirmAnswer; };
      w.prompt = m => { ctx.dialogs.push(String(m)); return null; };
      w.open = function () { return null; };
      Object.defineProperty(w.HTMLElement.prototype, "offsetParent", { configurable: true, get() {
        let el = this; while (el && el.nodeType === 1) { if (el.hidden || w.getComputedStyle(el).display === "none") return null; el = el.parentElement; }
        return this.ownerDocument.body; } });
      w.Image = function () { const o = {}; Object.defineProperty(o, "src", { set() { setTimeout(function () { if (o.onerror) o.onerror(); }, 0); } }); return o; };
      w.fetch = function (u) {
        const abs = new w.URL(String(u), w.location.href);
        if (abs.hostname === "acslearn.com") {
          let p = decodeURIComponent(abs.pathname); if (p.endsWith("/")) p += "index.html";
          ctx.fetched.push(p); const f = path.join(ROOT, p);
          if ((opt.missing || []).indexOf(p) > -1) return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve("") });
          /* (v1.1) failOnce: पहली बार internet-गड़बड़ी (fetch ही विफल), फिर सामान्य */
          if ((opt.failOnce || []).indexOf(p) > -1) { opt._failed = opt._failed || {}; if (!opt._failed[p]) { opt._failed[p] = 1; return Promise.reject(new TypeError("Failed to fetch")); } }
          if (fs.existsSync(f) && fs.statSync(f).isFile()) { let t = fs.readFileSync(f, "utf8"); if (opt.rewrite && opt.rewrite[p]) t = opt.rewrite[p](t); return Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(t), json: () => Promise.resolve(JSON.parse(t)) }); }
          return Promise.resolve({ ok: false, status: 404, text: () => Promise.resolve("") });
        }
        if (abs.hostname === "api.postalpincode.in") return Promise.resolve({ ok: true, json: () => Promise.resolve([{ Status: "Success", PostOffice: [{ Name: "Chautham", State: "Bihar", District: "Khagaria" }, { Name: "Malpa", State: "Bihar", District: "Khagaria" }] }]) });
        return Promise.reject(new Error("offline"));
      };
      w.__CALL = function (name, data) {
        ctx.calls.push({ name, data: JSON.parse(JSON.stringify(data || {})) });
        const h = ctx.handlers[name];
        try { return Promise.resolve(h ? h(data, ctx) : {}); } catch (e) { return Promise.reject(e); }
      };
      const AUTH = { currentUser: { uid: "u1" }, signOut: () => Promise.resolve() };
      w.__FB = {
        initializeApp: () => ({}), getAuth: () => AUTH, signOut: () => Promise.resolve(),
        signInWithEmailAndPassword: (a, e, p) => w.__CALL("__signIn", { email: e, pass: p }),
        getFirestore: () => ({}), doc: () => ({}), getDoc: () => w.__CALL("__getDoc", {}),
        getFunctions: () => ({}), httpsCallable: (f, name) => (d => w.__CALL(name, d).then(r => ({ data: r })))
      };
      w.__importGate = () => { if (!w.__RG) w.eval(GATE_CLASSIC); return Promise.resolve(w.__RG); };
      if (opt.fb) w.__FB = opt.fb(w, ctx);   /* (v1.2) dashboard-robot अपना नक़ली Firebase देता है */
    }
  });
  ctx.dom = dom; ctx.w = dom.window; ctx.d = dom.window.document;
  await new Promise(r => { if (ctx.d.readyState === "complete") r(); else dom.window.addEventListener("load", () => r()); setTimeout(r, 8000); });
  if (opt.expect && opt.expect !== "hi") await waitFor(ctx, () => ctx.w.ACS_PANEL_I18N && ctx.w.ACS_PANEL_I18N.active, 4000);   /* (v1.6) हर पैनल-भाषा (पहले सिर्फ़ "en") */
  await settle(ctx);
  return ctx;
}
async function waitFor(ctx, cond, ms) { const t0 = Date.now(); while (Date.now() - t0 < (ms || 3000)) { try { if (cond()) return true; } catch (e) {} await sleep(10); } return false; }
async function settle(ctx) { await sleep(25); await sleep(25); }
function typeIn(ctx, el, v) { el.value = v; el.dispatchEvent(new ctx.w.Event("input", { bubbles: true })); el.dispatchEvent(new ctx.w.Event("change", { bubbles: true })); }
function pick(ctx, el, v) { el.value = v; el.dispatchEvent(new ctx.w.Event("change", { bubbles: true })); }
function click(ctx, el) { el.dispatchEvent(new ctx.w.MouseEvent("click", { bubbles: true, cancelable: true })); }
function rej(code, message, details) { const e = new Error(message || code || "err"); if (code) e.code = code; if (details) e.details = details; throw e; }

/* दिखने वाला हर पाठ + attribute जिसमें हिंदी बची हो */
const ATTRS = ["placeholder", "title", "aria-label", "alt", "label", "data-h"];
function hindiLeaks(ctx, opts) {
  opts = opts || {};
  const d = ctx.d, out = [];
  /* दर्ज होल (पैनल-6 तक): सिर्फ़ नियम-फ़ाइल के क़ानूनी हिस्से (part/rules) हिंदी में; "आपकी जानकारी" डिब्बा नहीं */
  const isHole = el => !!(opts.allowRulesHole && el.closest("#rulesContainer") && el.closest(".part,.rules"));
  const tw = d.createTreeWalker(d.body, 4); let n;
  while ((n = tw.nextNode())) {
    if (!DEV.test(n.nodeValue)) continue;
    const p = n.parentElement; if (!p) continue;
    if (p.closest("script,style,noscript,textarea,#acsPanelLangBar,#acsTranslatePanel")) continue;
    if (p.closest("[data-lname]")) continue;   /* भाषा का नाम (Founder-नियम 15-Nov: भाषा के बटन पर देवनागरी · रोमन · अपनी लिपि, हमेशा) */
    const sk = p.closest("[data-i18n-skip],[translate=no]");
    if (sk && !p.closest("#rulesGate")) {
      if (isHole(sk)) { ctx.holeSeen = true; continue; }
      if (ctx.userVals.has(n.nodeValue.trim())) continue;
      out.push("[skip-ज़ोन] " + n.nodeValue.trim().slice(0, 90)); continue;
    }
    out.push(n.nodeValue.replace(/\s+/g, " ").trim().slice(0, 110));
  }
  d.querySelectorAll("*").forEach(el => {
    if (el.closest("script,style,#acsPanelLangBar,#acsTranslatePanel")) return;
    const sk = el.closest("[data-i18n-skip]"); if (sk && !el.closest("#rulesGate") && isHole(sk)) return;
    for (const a of ATTRS) { const v = el.getAttribute(a); if (v && DEV.test(v)) out.push("@" + a + "=" + v.slice(0, 90)); }
    if (el.tagName === "INPUT" && /^(button|submit)$/i.test(el.type || "") && DEV.test(el.value || "")) out.push("@value=" + el.value);
  });
  if (DEV.test(d.title)) out.push("<title> " + d.title);
  for (const m of ctx.dialogs.splice(0)) if (DEV.test(m)) out.push("[संदेश-डिब्बा] " + m.slice(0, 110));
  return Array.from(new Set(out));
}
function clean(ctx, where, opts) { const L = hindiLeaks(ctx, opts); return ck(where + " : हिंदी शून्य", L.length === 0, L.length + " जगह: " + L.slice(0, 8).join("  ‖  ")); }
function noErr(ctx, where) { const e = ctx.errors.splice(0); return ck(where + " : पन्ने में JS-त्रुटि शून्य", e.length === 0, e.slice(0, 4).join(" ‖ ")); }
function bodyText(ctx) {
  const c = ctx.d.body.cloneNode(true);
  c.querySelectorAll("#acsPanelLangBar,script,style").forEach(x => x.remove());
  return c.innerHTML.replace(/\s+/g, " ");
}

const MXCODE = rd("assets/designation_matrix.js"), RCODE = rd("assets/roles.js");
const MX = (() => { const w = {}; new Function("window", MXCODE)(w); return w.ACS_DESIGNATIONS; })();
const R = (() => { const w = { ACS_DESIGNATIONS: MX }; new Function("window", RCODE)(w); return w.ACS_ROLES; })();

/* ───────────── L: लॉगिन ───────────── */
async function loginSuite() {
  const OPEN = (o) => openPage("dashboard/index.html", Object.assign({ transform: loginTransform, urlPath: "/dashboard/" }, o));
  const H = {
    "__signIn": () => ({ user: { uid: "u1" } }), "claimSession": () => ({ ok: true }),
    "rulesStatus": () => ({ applies: true, need: true, current: "1.2" }), "rulesAccept": () => ({ ok: true }),
    "requestLoginOtp": () => ({ ok: true }), "verifyLoginOtp": () => ({ ok: true }),
    "requestPasswordResetOtp": () => ({ ok: true }), "verifyPasswordResetOtp": () => ({ ok: true }),
    "__getDoc": () => ({ exists: () => true, data: () => ({ designation: "hq_admin" }) })
  };
  /* L1 पहला दृश्य */
  let c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, H) });
  const $ = id => c.d.getElementById(id);
  ck("L0 English सक्रिय, html lang=en, body class en", c.w.ACS_PANEL_I18N.active && c.d.documentElement.getAttribute("lang") === "en" && c.d.body.classList.contains("en") && !c.d.body.classList.contains("hi"));
  ck("L0 भाषा-पट्टी में हिंदी + English, English दबा हुआ", !!c.d.querySelector('#acsPanelLangBar button[data-plang="en"][aria-pressed="true"]') && !!c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]'));
  { const bt = k => ((c.d.querySelector('#acsPanelLangBar button[data-plang="' + k + '"]') || {}).textContent || "").trim();
    ck("L0 भाषा-बटन पर नाम तीनों रूप में (Founder-नियम 15-Nov): हिन्दी · Hindi और अंग्रेज़ी · English", bt("hi") === "हिन्दी · Hindi" && bt("en") === "अंग्रेज़ी · English", bt("hi") + " | " + bt("en")); }
  clean(c, "L1 लॉगिन पहला दृश्य (सब चरण, छिपे भी)");
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
  ck("L4 भूमिका-पट्टी English", /^Role: /.test($("role-tag").textContent), $("role-tag").textContent);
  clean(c, "L4 चरण-2");
  await c.w.doLogin(); await settle(c); clean(c, "L5 email ख़ाली");
  $("f-email").value = "a@b.co"; await c.w.doLogin(); await settle(c); clean(c, "L5 password ख़ाली");
  $("f-pass").value = "x";
  for (const code of ["auth/invalid-credential", "auth/too-many-requests", "auth/network-request-failed", "auth/other"]) {
    c.handlers.__signIn = () => rej(code); await c.w.doLogin(); await settle(c); clean(c, "L5 लॉगिन-ग़लती " + code);
  }
  /* L6 विद्यार्थी: session → नियम-परदा → dashboard */
  c.handlers.__signIn = H.__signIn;
  const loginP = c.w.doLogin(); await waitFor(c, () => $("rulesGate"), 3000); await settle(c);
  ck("L6 नियम-परदा खुला", !!$("rulesGate"));
  clean(c, "L6 नियम-परदा (English)");
  ck("L6 परदे में Continue बटन, क़ानूनी पंक्ति (सिर्फ़ हिंदी नियम-पत्र मान्य) और हिंदी नियम-पत्र की कड़ी", /Continue/.test($("rulesGate").textContent) && /Only the Hindi rules letter is legally valid\./.test($("rulesGate").textContent) && !!$("rulesGateHi") && $("rulesGateHi").getAttribute("href") === "/rules-consent-learner.html" && !DEV.test($("rulesGate").textContent), $("rulesGate").textContent.slice(0, 200));
  await settle(c);
  ck("L6 English परदे की कड़ी English नियम-पत्र पर (/en/rules-consent-learner.html)", $("rulesGateLink").getAttribute("href") === "/en/rules-consent-learner.html" && /English version/.test($("rulesGateLink").textContent),
    $("rulesGateLink").getAttribute("href") + " | " + $("rulesGateLink").textContent);
  c.handlers.rulesAccept = () => rej("unavailable");
  $("rulesGateChk").checked = true; $("rulesGateChk").dispatchEvent(new c.w.Event("change")); click(c, $("rulesGateOk")); await settle(c); await settle(c);
  clean(c, "L6 सहमति दर्ज न हो पाई");
  c.handlers.rulesAccept = H.rulesAccept; click(c, $("rulesGateOk")); await loginP; await settle(c);
  const acc = c.calls.filter(x => x.name === "rulesAccept").pop();
  ck("L6 सहमति के साथ भाषा en और संस्करण भेजा", !!acc && acc.data.language === "en" && acc.data.version === "1.2", JSON.stringify(acc && acc.data));
  ck("L6 परदा हटा, सफलता-चरण", !$("rulesGate") && $("c5").classList.contains("show"));
  ck("L6 सफलता में भूमिका English", /^Role: /.test($("s-role").textContent), $("s-role").textContent);
  clean(c, "L6 सफलता-चरण");
  noErr(c, "L1-L6");
  c.dom.window.close();

  /* LG नियम-परदा: हिंदी में हिंदी कड़ी; English में अनुवाद न मिले या पुराना हो तो हिंदी मूल */
  const gateRun = async (o, tag, wantHref, wantLang, wantText) => {
    const g = await OPEN(Object.assign({ handlers: Object.assign({}, H) }, o));
    click(g, g.d.querySelectorAll("#roleGrid .role-card")[0]); g.w.goStep2(); g.d.getElementById("f-email").value = "a@b.co"; g.d.getElementById("f-pass").value = "x";
    const lp = g.w.doLogin(); await waitFor(g, () => g.d.getElementById("rulesGate"), 3000); await settle(g); await settle(g);
    const a = g.d.getElementById("rulesGateLink");
    ck(tag + " : कड़ी " + wantHref, !!a && a.getAttribute("href") === wantHref && (!wantText || wantText.test(g.d.getElementById("rulesGate").textContent)), a && (a.getAttribute("href") + " | " + g.d.getElementById("rulesGate").textContent.replace(/\s+/g, " ").slice(0, 300)));
    if (o.expect === "en") clean(g, tag + " : परदा");
    const chk = g.d.getElementById("rulesGateChk"); chk.checked = true; chk.dispatchEvent(new g.w.Event("change")); click(g, g.d.getElementById("rulesGateOk")); await lp; await settle(g);
    const ac = g.calls.filter(x => x.name === "rulesAccept").pop();
    ck(tag + " : सहमति में भाषा " + wantLang, !!ac && ac.data.language === wantLang, JSON.stringify(ac && ac.data));
    noErr(g, tag); g.dom.window.close();
  };
  await gateRun({}, "LG1 हिंदी नियम-परदा", "/rules-consent-learner.html", "hi", /आगे बढ़ें/);
  await gateRun({ ls: { acs_dash_lang: "en" }, expect: "en", missing: ["/en/rules-consent-learner.html"] }, "LG2 English, पर English फ़ाइल नहीं मिली", "/rules-consent-learner.html", "hi", /not ready yet[\s\S]*legal original/);
  await gateRun({ ls: { acs_dash_lang: "en" }, expect: "en", rewrite: { "/en/rules-consent-learner.html": t => t.replace("<b>Version: 1.2</b>", "<b>Version: 1.1</b>") } }, "LG3 English, पर English फ़ाइल पुराने संस्करण की", "/rules-consent-learner.html", "hi", /in Hindi/);

  /* L7 नियम-जाँच नहीं हो पाई + session-विफलता */
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, H, { rulesStatus: () => rej("unavailable") }) });
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[0]); c.w.goStep2(); c.d.getElementById("f-email").value = "a@b.co"; c.d.getElementById("f-pass").value = "x";
  c.w.doLogin(); await waitFor(c, () => c.d.getElementById("rulesGateRetry"), 3000); await settle(c);
  clean(c, "L7 नियम-स्थिति जाँच विफल परदा");
  c.dom.window.close();
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, H, { claimSession: () => rej("unavailable") }) });
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[0]); c.w.goStep2(); c.d.getElementById("f-email").value = "a@b.co"; c.d.getElementById("f-pass").value = "x";
  await c.w.doLogin(); await settle(c); clean(c, "L7 session शुरू नहीं हुई");
  c.dom.window.close();

  /* L8 OTP वाली भूमिका */
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, H) });
  const ti = tops.findIndex(x => x.key === "counselor");
  click(c, c.d.querySelectorAll("#roleGrid .role-card")[ti]); c.w.goStep2();
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
    ck("L11 English login: OTP की हर माँग में lang = en (login + 2 बार दोबारा)", q.length === 3 && q.every(x => x.data && x.data.lang === "en" && x.data.email === "a@b.co" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data))); }
  c.dom.window.close();

  /* L9 पासवर्ड भूल गए */
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, H) });
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
  c.handlers.requestPasswordResetOtp = H.requestPasswordResetOtp; await c.w.resendForgotOtp(); await settle(c);
  { const q = c.calls.filter(x => x.name === "requestPasswordResetOtp");
    ck("L11 English पासवर्ड भूले: OTP की हर माँग में lang = en (पहली + दोबारा)", q.length === 2 && q.every(x => x.data && x.data.lang === "en" && x.data.email === "a@b.co" && Object.keys(x.data).sort().join() === "email,lang"), JSON.stringify(q.map(x => x.data))); }
  /* L10 menu की कड़ियाँ English पन्नों पर */
  const mis = Array.from(c.d.querySelectorAll("#acsMenuList a,#acsFooterMenu a")).filter(a => /mission/.test(a.getAttribute("href")));
  ck("L10 English में menu की कड़ी English पन्ने पर", mis.length > 0 && mis.every(a => a.getAttribute("href") === "/en/mission.html"), mis.map(a => a.getAttribute("href")).join(","));
  c.dom.window.close();

  /* LH हिंदी पहले जैसी: इंजन वाला पन्ना बनाम इंजन हटाया पन्ना */
  const noEng = h => loginTransform(h).replace('<script src="/assets/panel_i18n.js"></script>', "");
  const hA = await OPEN({}); const hB = await openPage("dashboard/index.html", { transform: noEng, urlPath: "/dashboard/" });
  ck("LH1 हिंदी में इंजन निष्क्रिय, html lang=hi", !hA.w.ACS_PANEL_I18N.active && hA.d.documentElement.getAttribute("lang") === "hi" && hA.d.body.classList.contains("hi"));
  ck("LH2 हिंदी पन्ना हूबहू (इंजन होने न होने से कोई अंतर नहीं)", bodyText(hA) === bodyText(hB) && hA.d.title === hB.d.title);
  /* LH3 हिंदी में OTP की माँग: lang = hi (इंजन वाला पन्ना और इंजन हटाया पन्ना, दोनों) */
  for (const [nm, mk] of [["इंजन के साथ", () => OPEN({ handlers: Object.assign({}, H) })], ["इंजन के बिना", () => openPage("dashboard/index.html", { transform: noEng, urlPath: "/dashboard/", handlers: Object.assign({}, H) })]]) {
    const h = await mk();
    click(h, h.d.querySelectorAll("#roleGrid .role-card")[tops.findIndex(x => x.key === "counselor")]); h.w.goStep2();
    h.d.getElementById("f-email").value = "a@b.co"; h.d.getElementById("f-pass").value = "x";
    await h.w.doLogin(); await sleep(1100); await settle(h); await h.w.resendLoginOtp(); await settle(h);
    h.w.goForgot(); await settle(h); h.d.getElementById("fp-email").value = "a@b.co"; await h.w.requestForgotOtp(); await sleep(1100); await settle(h);
    const q = h.calls.filter(x => x.name === "requestLoginOtp" || x.name === "requestPasswordResetOtp");
    ck("LH3 हिंदी login (" + nm + "): OTP की हर माँग में lang = hi", q.length === 3 && q.every(x => x.data && x.data.lang === "hi"), JSON.stringify(q.map(x => [x.name, x.data])));
    h.dom.window.close();
  }
  /* LS भाषा बदलना: English → हिंदी = ताज़ा हिंदी */
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en" });
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
  ck("LS1 English → हिंदी: पन्ना बिल्कुल ताज़ा हिंदी जैसा", bodyText(c) === bodyText(hA) && c.d.title === hA.d.title, "");
  ck("LS2 हिंदी चुनना याद रहा", c.w.localStorage.getItem("acs_dash_lang") === "hi" && c.d.documentElement.getAttribute("lang") === "hi");
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="en"]')); await waitFor(c, () => c.w.ACS_PANEL_I18N.active); await settle(c);
  clean(c, "LS3 हिंदी → English दोबारा");
  c.dom.window.close(); hA.dom.window.close(); hB.dom.window.close();
  /* LB browser की भाषा से कभी नहीं */
  c = await OPEN({ ls: { acs_lang: "en" } }); await sleep(100);
  ck("LB1 acs_lang=en (browser से आ सकता है) पर भी लॉगिन हिंदी", !c.w.ACS_PANEL_I18N.active && c.d.documentElement.getAttribute("lang") === "hi");
  /* LU साइट का 🌐 बटन: पन्ना छोड़े बिना English */
  const href0 = c.w.location.href;
  c.w.acsLangGo("en"); await waitFor(c, () => c.w.ACS_PANEL_I18N.active); await settle(c);
  ck("LU1 साइट के 🌐 से English: पन्ना वहीं, भाषा बदली, याद रही", c.w.ACS_PANEL_I18N.active && c.w.location.href === href0 && c.w.localStorage.getItem("acs_dash_lang") === "en");
  clean(c, "LU1 🌐 से English");
  c.dom.window.close();
  c = await OPEN({ query: "?lang=en", expect: "en" });
  ck("LQ ?lang=en से English और याद", c.w.ACS_PANEL_I18N.active && c.w.localStorage.getItem("acs_dash_lang") === "en");
  c.dom.window.close();
  /* LE English साइट का "Login / Dashboard" → ?lang=en */
  const mini = '<!doctype html><html><head><meta charset="utf-8"></head><body><a id="acsLogin" href="/dashboard/">Login</a><div id="acsMenuList"></div><div id="acsFooterMenu"></div>' +
    '<script src="/assets/acs-config.js"></script><script src="/assets/links.js"></script><script src="/assets/acs-universal.js"></script></body></html>';
  for (const [p, want] of [["/en/", "/dashboard/?lang=en"], ["/", "/dashboard/"], ["/te/", "/dashboard/"]]) {
    const dom = new JSDOM(mini, { url: "https://acslearn.com" + p, runScripts: "dangerously", resources: new Loader(), virtualConsole: new VirtualConsole() });
    await new Promise(r => { dom.window.addEventListener("load", r); setTimeout(r, 3000); });
    ck("LE " + p + " पर Login-कड़ी = " + want, dom.window.document.getElementById("acsLogin").getAttribute("href") === want, dom.window.document.getElementById("acsLogin").getAttribute("href"));
    dom.window.close();
  }
}

/* ───────────── J: रजिस्ट्रेशन ───────────── */
function roleList() {
  const L = [];
  for (const c of MX.cards) {
    if (c.key === "team" || c.parent) continue;
    if (c.children && c.children.length) c.children.forEach(k => L.push({ key: k, parent: c.key }));
    else L.push({ key: c.key });
  }
  for (const t of MX.teams) { if (t.registrable === false) continue; L.push({ key: t.key, team: t.level }); }
  return L;
}
const HJ = {
  requestRegisterOtp: () => ({ ok: true }), verifyRegisterOtp: () => ({ ok: true }),
  checkExistingApplication: () => ({ exists: false }), cancelApplication: () => ({ ok: true }),
  submitRegistration: () => ({ regNo: "ACS-2026-123456", updated: false }),
  generateAgreementPdf: () => ({ pdfUrl: "https://example.com/a.pdf", mailNote: "sent" })
};
async function joinStep1(c, o) {
  const $ = id => c.d.getElementById(id);
  typeIn(c, $("nameLocal"), "राम कुमार"); c.userVals.add("राम कुमार");
  typeIn(c, $("nameRoman"), "RAM KUMAR"); typeIn(c, $("fatherNameRoman"), "RAM PRASAD");
  typeIn(c, $("mobile"), "9876543210"); typeIn(c, $("email"), "ram@example.com");
  typeIn(c, $("dob"), o.minor ? "2011-03-04" : "1990-03-04");
  if (o.minor) typeIn(c, $("guardianMobile"), "9123400000");
  typeIn(c, $("pwd"), "abcDEF123!@#x"); typeIn(c, $("pwd2"), "abcDEF123!@#x");
  await settle(c);
}
async function joinOtp(c) {
  const $ = id => c.d.getElementById(id);
  click(c, $("sendOtpBtn")); await waitFor(c, () => $("otpBoxWrap").classList.contains("show")); await settle(c);
  c.d.querySelectorAll(".otpDigits input").forEach((inp, i) => typeIn(c, inp, String(i + 1)));
  click(c, $("verifyOtpBtn")); await waitFor(c, () => $("panel2").classList.contains("active")); await settle(c);
}
async function joinRole(c, rl) {
  const $ = id => c.d.getElementById(id);
  const tops = MX.cards.filter(x => !x.parent);
  const tiles = () => Array.from(c.d.querySelectorAll("#roleGrid .role-card"));
  if (rl.team) {
    click(c, tiles()[tops.findIndex(x => x.key === "team")]); await settle(c);
    pick(c, $("teamLevelSel"), rl.team); await settle(c); pick(c, $("teamDesigSel"), rl.key);
  } else if (rl.parent) {
    click(c, tiles()[tops.findIndex(x => x.key === rl.parent)]); await settle(c);
    click(c, c.d.querySelector('#childChoiceGrid .role-card[data-key="' + rl.key + '"]'));
  } else click(c, tiles()[tops.findIndex(x => x.key === rl.key)]);
  await settle(c);
  const card = R.byKey(rl.key);
  if (card.needsGeo) {
    pick(c, $("countrySel"), rl.country || "in"); await waitFor(c, () => $("stateSel").options.length > 2 || $("stateTyped").style.display !== "none", 3000); await settle(c);
    pick(c, $("stateSel"), rl.state || "bihar"); await settle(c);
    if (card.needsRMOffice) { await waitFor(c, () => $("rmDist1").options.length > 2, 3000); await settle(c); const DL = c.w.ACS_GEO_DISTRICTS["in-" + (rl.state || "bihar")]; pick(c, $("rmDist1"), DL[0]); pick(c, $("rmDist2"), DL[1]); }
  }
  await waitFor(c, () => $("rulesContainer").querySelector(".rule,.part"), 4000); await settle(c);
}
async function joinRules(c) {
  const $ = id => c.d.getElementById(id);
  const bulk = $("bulkConsentChk");
  if (bulk) { bulk.checked = true; bulk.dispatchEvent(new c.w.Event("change")); }
  else c.d.querySelectorAll("#rulesContainer .rule input[type=checkbox]").forEach(b => { if (b.offsetParent !== null) { b.checked = true; b.dispatchEvent(new c.w.Event("change")); } });
  await settle(c);
  const fin = $("finalChk"); if (!fin.checked) { fin.checked = true; fin.dispatchEvent(new c.w.Event("change")); }
  await settle(c);
  const b3 = $("toStep3Btn"); const ok = !b3.disabled; click(c, b3); await settle(c);
  return ok;
}
async function joinStep3(c, rl, firstRole) {
  const $ = id => c.d.getElementById(id);
  const card = R.byKey(rl.key);
  let ec = 0;
  for (const f of card.fields) {
    if (f.id === "name_local" || f.id === "name_roman") continue;
    if (f.type === "pincode_address") {
      typeIn(c, $("pin_" + f.id), "851201"); await waitFor(c, () => $("pinResult_" + f.id).style.display === "block"); await settle(c);
      typeIn(c, $("pinDetail_" + f.id), "घर नं. 12, वार्ड 3"); c.userVals.add("घर नं. 12, वार्ड 3, Chautham, Khagaria, Bihar, PIN: 851201");
      continue;
    }
    if (f.type === "emergency_contact") {
      typeIn(c, $("ecName_" + f.id), "सीता देवी"); typeIn(c, $("ecRel_" + f.id), "बहन"); typeIn(c, $("ecMobile_" + f.id), "91234567" + (10 + ec++));
      c.userVals.add("सीता देवी, बहन, 91234567" + (9 + ec)); continue;
    }
    const el = c.d.querySelector('#dynamicFields [data-fid="' + f.id + '"]'); if (!el) continue;
    const row = el.closest(".row"); if (row && row.style.display === "none") continue;
    if (el.readOnly) continue;
    if (f.type === "select") { pick(c, el, el.options[1].value); continue; }
    if (f.type === "number") { typeIn(c, el, String(f.min != null ? Math.max(f.min, Math.min(f.max != null ? f.max : 1e9, f.min + 1)) : 2)); continue; }
    if (f.roman) { typeIn(c, el, "TEST NAME"); continue; }
    typeIn(c, el, "परीक्षण पाठ"); c.userVals.add("परीक्षण पाठ");
  }
  await settle(c);
  if ($("desiredCountry")) {
    pick(c, $("desiredCountry"), "in"); await waitFor(c, () => $("desiredStateSel").options.length > 2); await settle(c);
    pick(c, $("desiredStateSel"), "bihar"); await waitFor(c, () => $("desiredDistSel").options.length > 2); await settle(c);
    pick(c, $("desiredDistSel"), c.w.ACS_GEO_DISTRICTS["in-bihar"][2]); await settle(c);
  }
  const boxes = Array.from(c.d.querySelectorAll("#documentsContainer .docBox")).filter(b => b.style.display !== "none");
  if (firstRole && boxes.length) {
    const inp = boxes[0].querySelector("input[type=file]");
    Object.defineProperty(inp, "files", { configurable: true, value: [new c.w.File(["x"], "a.txt", { type: "text/plain" })] }); inp.dispatchEvent(new c.w.Event("change")); await settle(c);
    Object.defineProperty(inp, "files", { configurable: true, value: [new c.w.File([new Uint8Array(2200000)], "big.pdf", { type: "application/pdf" })] }); inp.dispatchEvent(new c.w.Event("change")); await settle(c);
    clean(c, "J ग़लत फ़ाइल / बहुत बड़ी फ़ाइल संदेश", {});
  }
  for (const b of boxes) {
    const id = b.getAttribute("data-docid"), inp = b.querySelector("input[type=file]"); if (!inp) continue;
    const pdf = /\.pdf/.test(inp.accept);
    const name = pdf ? "दस्तावेज़-" + id + ".pdf" : "photo-" + id + ".jpg"; if (pdf) c.userVals.add(name);
    const file = new c.w.File([pdf ? "%PDF-1.4 " + id : "JPEGDATA" + id], name, { type: pdf ? "application/pdf" : "image/jpeg" });
    Object.defineProperty(inp, "files", { configurable: true, value: [file] }); inp.dispatchEvent(new c.w.Event("change"));
    await waitFor(c, () => b.classList.contains("filled"), 3000);
  }
  await settle(c);
  return !$("toStep4Btn").disabled;
}
async function joinFull(rl, mode, extra) {
  extra = extra || {};
  const c = await openPage("join.html", { ls: mode === "en" ? { acs_dash_lang: "en" } : {}, expect: mode, handlers: Object.assign({}, HJ) });
  const tag = "J[" + mode + "] " + rl.key + (extra.minor ? " (नाबालिग)" : "") + (rl.country && rl.country !== "in" ? " (" + rl.country + ")" : "");
  const res = { tag };
  const EN = mode === "en", RH = {};   /* (v1.4) नियमों में भी हिंदी की कोई छूट नहीं */
  if (EN && extra.first) clean(c, "J1 रजिस्ट्रेशन पहला दृश्य (सब चरण)");
  await joinStep1(c, extra);
  if (EN && extra.first) clean(c, "J2 चरण-1 भरा हुआ");
  await joinOtp(c);
  if (!ck(tag + " : OTP के बाद चरण-2", c.d.getElementById("panel2").classList.contains("active"))) { c.dom.window.close(); return res; }
  await joinRole(c, rl);
  const learner = /^(student|jobseeker|entrepreneur)$/.test(rl.key);
  if (EN) {
    clean(c, tag + " : चरण-2 भूमिका + नियम", RH);
    const enRules = c.fetched.some(p => p === "/en/" + R.ruleFileFor(rl.key));
    const rc = c.d.getElementById("rulesContainer"), nRules = rc.querySelectorAll(".rule input[type=checkbox]:not(#bulkConsentChk)").length;
    const hiSrc = fs.readFileSync(path.join(ROOT, R.ruleFileFor(rl.key)), "utf8"), nHi = (hiSrc.match(/<div class="rule[^"]*"><input type="checkbox">/g) || []).length;
    if (!ck(tag + " : नियम English फ़ाइल से (/en/...), देवनागरी 0, सूचना नहीं", enRules && !DEV.test(rc.textContent) && !/Hindi text is the legal original/.test(rc.textContent), c.fetched.join(","))) res.hole = true;
    ck(tag + " : English में नियमों की गिनती हिंदी मूल जितनी (" + nHi + ")", nRules === nHi && nHi > 20 || (learner && nRules > 15), nRules + " बनाम " + nHi);
    /* (v1.7, Founder का आदेश 16-Nov-2026) हर ग़ैर-हिंदी भाषा में: क़ानूनन हिंदी नियम-पत्र ही मान्य है + हिंदी पत्र खोलने और डाउनलोड की कड़ी */
    { const lg = c.d.getElementById("rulesLegalNote"), as = lg ? Array.from(lg.querySelectorAll("a")) : [], rf = R.ruleFileFor(rl.key);
      ck(tag + " : नियमों के ऊपर क़ानूनी पंक्ति (English में) + हिंदी नियम-पत्र खोलने और डाउनलोड की कड़ी", !!lg && /Only the Hindi rules letter is legally valid\./.test(lg.textContent) && !DEV.test(lg.textContent) && as.length === 2 && as.every(x => x.getAttribute("href") === rf) && as[0].getAttribute("target") === "_blank" && as[1].getAttribute("download") === rf, lg && lg.textContent); }
  }
  if (!ck(tag + " : सब नियम स्वीकार → चरण-3 खुला", await joinRules(c) && c.d.getElementById("panel3").classList.contains("active"))) { c.dom.window.close(); return res; }
  const ok4 = await joinStep3(c, rl, EN && extra.first);
  if (EN) clean(c, tag + " : चरण-3 फ़ॉर्म + दस्तावेज़", RH);
  if (!ck(tag + " : चरण-3 पूरा → चरण-4 बटन चालू", ok4)) { c.dom.window.close(); return res; }
  click(c, c.d.getElementById("toStep4Btn")); await settle(c);
  if (EN) clean(c, tag + " : चरण-4 पुष्टि", RH);
  if (EN && extra.first) {
    c.handlers.submitRegistration = () => rej("internal", "boom"); click(c, c.d.getElementById("submitBtn")); await settle(c); await settle(c);
    clean(c, "J submit विफल संदेश", RH);
    c.handlers.submitRegistration = () => rej("failed-precondition", "otpVerificationExpired"); click(c, c.d.getElementById("submitBtn")); await settle(c); await settle(c);
    clean(c, "J OTP-प्रमाण की मियाद निकली", RH);
    c.handlers.submitRegistration = HJ.submitRegistration;
  }
  click(c, c.d.getElementById("submitBtn")); await waitFor(c, () => c.d.getElementById("panelSuccess").classList.contains("active")); await settle(c); await settle(c);
  ck(tag + " : submit → सफलता", c.d.getElementById("panelSuccess").classList.contains("active"));
  if (EN) clean(c, tag + " : सफलता + PDF", RH);
  if (EN && extra.first) {
    c.handlers.generateAgreementPdf = () => ({ pdfUrl: "", mailNote: "no" }); c.w.document.getElementById("downloadPdfBtn").click(); await settle(c); clean(c, "J PDF बनी, email नहीं गई", RH);
  }
  const sub = c.calls.filter(x => x.name === "submitRegistration").pop();
  res.payload = sub ? sub.data : null;
  { const q = c.calls.filter(x => x.name === "requestRegisterOtp");
    ck(tag + " : OTP की माँग में lang = " + (EN ? "en" : "hi"), q.length >= 1 && q.every(x => x.data && x.data.lang === (EN ? "en" : "hi")), JSON.stringify(q.map(x => x.data && x.data.lang))); }
  { const q = c.calls.filter(x => x.name === "requestRegisterOtp");
    ck(tag + " : OTP की माँग में सिर्फ़ email और lang (पासवर्ड, नाम, मोबाइल, जन्मतिथि नहीं)", q.length >= 1 && q.every(x => x.data && Object.keys(x.data).sort().join() === "email,lang" && x.data.email === "ram@example.com") && JSON.stringify(q).indexOf("abcDEF123") < 0, JSON.stringify(q.map(x => Object.keys(x.data || {})))); }
  ck(tag + " : submitRegistration में lang नहीं जुड़ा (भाषा सिर्फ़ OTP की माँग में जाती है)", !!sub && !("lang" in sub.data));
  noErr(c, tag);
  c.dom.window.close();
  return res;
}
async function joinExtra() {
  /* OTP-ग़लतियाँ + पहले से मौजूद आवेदन */
  const c = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ) });
  await joinStep1(c, {});
  const $ = id => c.d.getElementById(id);
  for (const [code, msg] of [["resource-exhausted", ""], ["already-exists", ""], ["unavailable", ""], ["", ""]]) {
    c.handlers.requestRegisterOtp = () => rej(code, msg); click(c, $("sendOtpBtn")); await settle(c); await settle(c);
    clean(c, "J3 OTP भेजने में ग़लती " + (code || "(अनजान)"));
  }
  c.handlers.requestRegisterOtp = HJ.requestRegisterOtp; click(c, $("sendOtpBtn")); await waitFor(c, () => $("otpBoxWrap").classList.contains("show")); await sleep(1100); await settle(c);
  clean(c, "J3 OTP भेजा (घड़ी चलते हुए)");
  c.d.querySelectorAll(".otpDigits input").forEach((inp, i) => typeIn(c, inp, String(i + 1)));
  c.handlers.verifyRegisterOtp = () => rej("permission-denied", ""); click(c, $("verifyOtpBtn")); await settle(c); await settle(c); clean(c, "J4 OTP ग़लत");
  c.d.querySelectorAll(".otpDigits input").forEach((inp, i) => typeIn(c, inp, String(i + 1)));
  c.handlers.verifyRegisterOtp = HJ.verifyRegisterOtp;
  c.handlers.checkExistingApplication = () => ({ exists: true, status: "provisional", regNo: "ACS-2026-000111", role: "teacher", country: "in", state: "bihar", rm_districts: ["खगड़िया"] });
  click(c, $("verifyOtpBtn")); await waitFor(c, () => $("existAppCard")); await settle(c);
  clean(c, "J4 पहले से दर्ज आवेदन (जाँच में)");
  c.handlers.cancelApplication = () => rej("internal"); click(c, $("existCancelBtn")); await settle(c); await settle(c);
  clean(c, "J4 आवेदन निरस्त करने में ग़लती");
  c.handlers.cancelApplication = HJ.cancelApplication; click(c, $("existCancelBtn")); await settle(c); await settle(c);
  clean(c, "J4 आवेदन निरस्त");
  noErr(c, "J3-J4");
  c.dom.window.close();
  const c2 = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ, { checkExistingApplication: () => ({ exists: true, status: "approved", regNo: "ACS-2026-000222", role: "student" }) }) });
  await joinStep1(c2, {}); await joinOtp(c2).catch(() => {}); await waitFor(c2, () => c2.d.getElementById("existAppCard")); await settle(c2);
  clean(c2, "J4 आवेदन पहले से स्वीकृत");
  c2.dom.window.close();
  /* back-बटन वाली पंक्तियाँ */
  const c3 = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ) });
  await joinStep1(c3, {}); await joinOtp(c3); click(c3, c3.d.getElementById("back1Btn")); await settle(c3);
  clean(c3, "J5 चरण-2 से वापस चरण-1");
  noErr(c3, "J5");
  c3.dom.window.close();
  /* J6 English learner-नियम पुराने संस्करण के हों, तो हिंदी मूल दिखे और consent_language = hi */
  const c4 = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ),
    rewrite: { "/en/rules-consent-learner.html": t => t.replace("<b>Version: 1.2</b>", "<b>Version: 1.1</b>") } });
  await joinStep1(c4, {}); await joinOtp(c4); await joinRole(c4, { key: "student" }); await settle(c4);
  ck("J6 पुराना English नियम-पत्र नहीं दिखा: हिंदी मूल + English सूचना", /Hindi text is the legal original/.test(c4.d.getElementById("rulesContainer").textContent) && c4.fetched.indexOf("/rules-consent-learner.html") > -1);
  await joinRules(c4); await joinStep3(c4, { key: "student" }, false); click(c4, c4.d.getElementById("toStep4Btn")); await settle(c4);
  click(c4, c4.d.getElementById("submitBtn")); await waitFor(c4, () => c4.calls.some(x => x.name === "submitRegistration")); await settle(c4);
  const sp = c4.calls.filter(x => x.name === "submitRegistration").pop();
  /* J7 (v1.4) सलाहकार का English नियम-पत्र बासी (संस्करण अलग) हो, तो हिंदी मूल + सूचना; consent_language = hi */
  {
    const c7 = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ),
      rewrite: { "/en/rules-consent-counselor.html": t => t.replace(/<b>Version: [0-9.]+/, "<b>Version: 0.9") } });
    await joinStep1(c7, {}); await joinOtp(c7); await joinRole(c7, { key: "counselor" }); await settle(c7);
    const rc7 = c7.d.getElementById("rulesContainer");
    ck("J7 सलाहकार का बासी English नियम-पत्र नहीं दिखा: हिंदी मूल + English सूचना", /Hindi text is the legal original/.test(rc7.textContent) && DEV.test(rc7.querySelector(".rules").textContent) && c7.fetched.indexOf("/en/rules-consent-counselor.html") > -1, c7.fetched.join(","));
    noErr(c7, "J7"); c7.dom.window.close();
    const c8 = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ), missing: ["/en/rules-consent-counselor.html"] });
    await joinStep1(c8, {}); await joinOtp(c8); await joinRole(c8, { key: "counselor" }); await settle(c8);
    ck("J7 English नियम-पत्र ग़ायब (404): हिंदी मूल + English सूचना", /Hindi text is the legal original/.test(c8.d.getElementById("rulesContainer").textContent) && c8.d.getElementById("rulesContainer").querySelectorAll(".rule").length > 20);
    noErr(c8, "J7b"); c8.dom.window.close();
  }
  ck("J6 तब consent_language = hi और संस्करण 1.2", !!sp && sp.data.consent_language === "hi" && sp.data.consent_rules_version === "1.2", JSON.stringify(sp && { l: sp.data.consent_language, v: sp.data.consent_rules_version }));
  noErr(c4, "J6");
  c4.dom.window.close();
}
/* JS: सूची का क्रम (value कभी नहीं बदलती) */
function optOrder(sel) { return Array.from(sel.options).map(o => o.value); }
function isSortedEn(opts) {
  const t = opts.filter(o => o.value !== "" && o.value.charAt(0) !== "_").map(o => o.textContent.replace(/^\s+/, ""));
  for (let i = 1; i < t.length; i++) if (t[i - 1].localeCompare(t[i], "en", { sensitivity: "base" }) > 0) return t[i - 1] + " > " + t[i];
  return "";
}
async function joinSortSuite() {
  const h = await openPage("join.html", { handlers: Object.assign({}, HJ) });
  const e = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HJ) });
  const C = h.w.ACS_GEO_COUNTRIES;
  ck("JS1 हिंदी में देश-सूची मूल क्रम (countries.js जैसा)", optOrder(h.d.getElementById("countrySel")).slice(1).join(",") === [1, 2, 3, 4].map(g => C.filter(x => x.g === g).map(x => x.v)).flat().join(","));
  const og = Array.from(e.d.querySelectorAll("#countrySel optgroup"));
  const bad = og.map(g => isSortedEn(Array.from(g.children))).filter(Boolean);
  ck("JS2 English में हर देश-समूह A से Z (" + og.length + " समूह)", og.length === 4 && bad.length === 0, bad.join(" | "));
  ck("JS2 English में सूची का पहला विकल्प (ख़ाली) अपनी जगह, समूह अपनी जगह", e.d.getElementById("countrySel").options[0].value === "" && Array.from(e.d.getElementById("countrySel").children).map(x => x.tagName).join(",") === Array.from(h.d.getElementById("countrySel").children).map(x => x.tagName).join(","));
  ck("JS2 English और हिंदी में देशों के value एक-से (सिर्फ़ क्रम बदला)", optOrder(e.d.getElementById("countrySel")).slice().sort().join(",") === optOrder(h.d.getElementById("countrySel")).slice().sort().join(","));
  for (const c of [h, e]) { await joinStep1(c, {}); await joinOtp(c); await joinRole(c, { key: "rm", team: "rm" }); }
  const DL = h.w.ACS_GEO_DISTRICTS["in-bihar"];
  ck("JS3 हिंदी में जिला-सूची मूल क्रम", optOrder(h.d.getElementById("rmDist1")).filter(v => v).join(",") === DL.filter(d => d !== DL[1]).join(","), optOrder(h.d.getElementById("rmDist1")).slice(0, 5).join(","));
  const bd = isSortedEn(Array.from(e.d.getElementById("rmDist1").options)), bs = isSortedEn(Array.from(e.d.getElementById("stateSel").options));
  ck("JS3 English में राज्य-सूची और जिला-सूची A से Z", !bd && !bs, bd + " | " + bs);
  ck("JS3 चुना जिला English क्रम के बाद भी वही", e.d.getElementById("rmDist1").value === DL[0] && e.d.getElementById("rmDist2").value === DL[1]);
  click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e);
  ck("JS4 English → हिंदी: जिला-सूची फिर मूल क्रम, चुना जिला वही", optOrder(e.d.getElementById("rmDist1")).join(",") === optOrder(h.d.getElementById("rmDist1")).join(",") && e.d.getElementById("rmDist1").value === DL[0]);
  noErr(e, "JS"); [h, e].forEach(x => x.dom.window.close());
}
/* G: रजिस्ट्रेशन गाइड */
async function guideSuite() {
  const OPEN = o => openPage("registration-guide.html", Object.assign({ urlPath: "/registration-guide.html" }, o || {}));
  const ruleA = (c, key) => c.d.querySelector("#acc-" + key + " a.ruleLink[data-rule-file]");
  const note = a => a && a.nextElementSibling;
  let c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en" });
  ck("G0 गाइड English सक्रिय, खंड " + c.d.querySelectorAll(".acc").length, c.w.ACS_PANEL_I18N.active && c.d.querySelectorAll(".acc").length === MX.cards.length);
  clean(c, "G1 रजिस्ट्रेशन गाइड English (सब खंड, बंद भी)");
  const home = c.d.querySelector(".exitbar a");
  ck("G1 होम-कड़ी English होम पर (/en/)", home.getAttribute("href") === "/en/", home.getAttribute("href"));
  for (const k of MX.cards.map(x => x.key)) { click(c, c.d.querySelector("#acc-" + k + " .acc-head")); await settle(c); await settle(c); }
  clean(c, "G1 हर खंड खोलने के बाद");
  click(c, c.d.querySelector("#acc-student .acc-head")); await settle(c); await settle(c);
  let a = ruleA(c, "student");
  ck("G2 विद्यार्थी के नियम: English नियम-पत्र (संस्करण मिलता है), सूचना छिपी", a.getAttribute("href") === "/en/rules-consent-learner.html" && note(a).hasAttribute("hidden"), a.getAttribute("href"));
  click(c, c.d.querySelector("#acc-teacher .acc-head")); await settle(c); await settle(c);
  a = ruleA(c, "teacher");
  ck("G2 शिक्षक के नियम: English नियम-पत्र (संस्करण की संख्या मिलती है), सूचना छिपी", a.getAttribute("href") === "/en/rules-consent-teacher.html" && note(a).hasAttribute("hidden"), a.getAttribute("href") + " | " + note(a).textContent);
  ck("G2 आवेदन-बटन की कड़ी वही (भाषा join में अपने-आप)", c.d.querySelector("#acc-teacher a.applyBtn").getAttribute("href") === "/join.html?role=teacher");
  ck("G2 <title> English", !DEV.test(c.d.title) && /Registration Guide/.test(c.d.title), c.d.title);
  noErr(c, "G1-G2"); c.dom.window.close();
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", rewrite: { "/en/rules-consent-learner.html": t => t.replace("<b>Version: 1.2</b>", "<b>Version: 1.1</b>") } });
  click(c, c.d.querySelector("#acc-student .acc-head")); await settle(c); await settle(c);
  a = ruleA(c, "student");
  ck("G3 English नियम-पत्र पुराने संस्करण का: हिंदी मूल + सूचना", a.getAttribute("href") === "/rules-consent-learner.html" && !note(a).hasAttribute("hidden"), a.getAttribute("href"));
  c.dom.window.close();
  const noEng = h => h.replace('<script src="/assets/panel_i18n.js"></script>', "");
  const hA = await OPEN({}), hB = await OPEN({ transform: noEng });
  ck("G4 हिंदी गाइड इंजन होने न होने पर हूबहू", !hA.w.ACS_PANEL_I18N.active && bodyText(hA) === bodyText(hB) && hA.d.title === hB.d.title);
  c = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en" });
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
  ck("G5 गाइड English → हिंदी: बिल्कुल ताज़ा हिंदी जैसा (होम-कड़ी, सूचनाएँ भी)", bodyText(c) === bodyText(hA) && c.d.title === hA.d.title);
  /* खुला खंड (English नियम-पत्र वाली कड़ी समेत) हो तब हिंदी पर लौटना */
  const hO = await OPEN({}); click(hO, hO.d.querySelector("#acc-student .acc-head")); await settle(hO);
  const eO = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en" }); click(eO, eO.d.querySelector("#acc-student .acc-head")); await settle(eO); await settle(eO);
  ck("G6 खुले खंड में English नियम-पत्र की कड़ी", ruleA(eO, "student").getAttribute("href") === "/en/rules-consent-learner.html");
  click(eO, eO.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(eO); await settle(eO);
  a = ruleA(eO, "student");
  ck("G6 हिंदी पर लौटे: कड़ी हिंदी नियम-पत्र, सूचना छिपी, पन्ना ताज़ा हिंदी जैसा", a.getAttribute("href") === "/rules-consent-learner.html" && note(a).hasAttribute("hidden") && bodyText(eO) === bodyText(hO));
  noErr(eO, "G6");
  /* #hash से सीधा खुला खंड (join की नियम-कड़ी यही करती है) */
  const eH = await OPEN({ urlPath: "/registration-guide.html#student", ls: { acs_dash_lang: "en" }, expect: "en" }); await settle(eH); await settle(eH);
  ck("G7 #student से खुला खंड: English नियम-पत्र की कड़ी", eH.d.querySelector("#acc-student").classList.contains("open") && ruleA(eH, "student").getAttribute("href") === "/en/rules-consent-learner.html", ruleA(eH, "student").getAttribute("href"));
  noErr(eH, "G7"); eH.dom.window.close();
  /* internet की गड़बड़ी याद नहीं रहती (दोबारा खोलने पर फिर जाँच); पक्का उत्तर (404) याद रहता है */
  const eF = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", failOnce: ["/en/rules-consent-learner.html"], missing: ["/en/rules-consent-teacher.html"] });
  const sh = () => eF.d.querySelector("#acc-student .acc-head"), th = () => eF.d.querySelector("#acc-teacher .acc-head");
  click(eF, sh()); await settle(eF); await settle(eF);
  a = ruleA(eF, "student");
  ck("G8 पहली जाँच में internet-गड़बड़ी: हिंदी मूल + सूचना", a.getAttribute("href") === "/rules-consent-learner.html" && !note(a).hasAttribute("hidden"));
  click(eF, sh()); await settle(eF); click(eF, sh()); await settle(eF); await settle(eF);
  ck("G8 खंड दोबारा खोला: फिर जाँच हुई, अब English नियम-पत्र", ruleA(eF, "student").getAttribute("href") === "/en/rules-consent-learner.html" && note(ruleA(eF, "student")).hasAttribute("hidden"), ruleA(eF, "student").getAttribute("href"));
  { const lg = note(ruleA(eF, "student")).nextElementSibling, la = lg && lg.querySelector("a");   /* (v1.7) क़ानूनी पंक्ति + हिंदी पत्र की कड़ी */
    ck("G8 English नियम-कड़ी के साथ क़ानूनी पंक्ति और हिंदी नियम-पत्र की कड़ी", !!lg && lg.classList.contains("ruleLegalNote") && !lg.hasAttribute("hidden") && /Only the Hindi rules letter is legally valid\./.test(lg.textContent) && !DEV.test(lg.textContent) && !!la && la.getAttribute("href") === "/rules-consent-learner.html", lg && lg.textContent); }
  click(eF, th()); await settle(eF); await settle(eF); click(eF, th()); await settle(eF); click(eF, th()); await settle(eF); await settle(eF);
  const tn = eF.fetched.filter(x => x === "/en/rules-consent-teacher.html").length;
  ck("G8 English नियम-पत्र न होना (404) याद रहता है: दोबारा खोलने पर फिर नहीं माँगा", tn === 1 && ruleA(eF, "teacher").getAttribute("href") === "/rules-consent-teacher.html", "माँगा " + tn + " बार");
  noErr(eF, "G8"); eF.dom.window.close();
  /* G9 (v1.4) शिक्षक का English नियम-पत्र बासी हो, तो कड़ी हिंदी मूल पर और सूचना दिखे */
  const eS = await OPEN({ ls: { acs_dash_lang: "en" }, expect: "en", rewrite: { "/en/rules-consent-teacher.html": t => t.replace(/<b>Version: [0-9.]+/, "<b>Version: 0.9") } });
  click(eS, eS.d.querySelector("#acc-teacher .acc-head")); await settle(eS); await settle(eS);
  a = ruleA(eS, "teacher");
  ck("G9 शिक्षक का बासी English नियम-पत्र: कड़ी हिंदी मूल पर + सूचना", a.getAttribute("href") === "/rules-consent-teacher.html" && !note(a).hasAttribute("hidden") && /legal original/.test(note(a).textContent), a.getAttribute("href"));
  noErr(eS, "G9"); eS.dom.window.close();
  [c, hA, hB, hO, eO].forEach(x => x.dom.window.close());
}
async function joinHindiSame() {
  /* JH: हिंदी रजिस्ट्रेशन पन्ना इंजन होने और न होने पर एक-जैसा */
  const noEng = h => h.replace('<script src="/assets/panel_i18n.js"></script>', "");
  const a = await openPage("join.html", {}), b = await openPage("join.html", { transform: noEng });
  ck("JH1 हिंदी रजिस्ट्रेशन में इंजन निष्क्रिय", !a.w.ACS_PANEL_I18N.active && a.d.documentElement.getAttribute("lang") === "hi");
  ck("JH2 हिंदी रजिस्ट्रेशन पन्ना हूबहू (इंजन होने न होने से कोई अंतर नहीं)", bodyText(a) === bodyText(b) && a.d.title === b.d.title);
  /* LS-J: English → हिंदी बिना पन्ना खोले */
  const c = await openPage("join.html", { ls: { acs_dash_lang: "en" }, expect: "en" });
  click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c);
  ck("JH3 रजिस्ट्रेशन English → हिंदी: पन्ना बिल्कुल ताज़ा हिंदी जैसा", bodyText(c) === bodyText(a) && c.d.title === a.d.title);
  [a, b, c].forEach(x => x.dom.window.close());
}
async function joinSuite() {
  const ONLY = (process.env.ACS_ROLES || "").split(",").filter(Boolean);   /* जाँच तेज़ करने के लिए: ACS_ROLES=teacher,student */
  if (!ONLY.length) { await joinHindiSame(); await joinSortSuite(); await joinExtra(); }
  let roles = roleList();
  if (ONLY.length) roles = roles.filter(r => ONLY.indexOf(r.key) > -1);
  /* ZM देश-प्रमुख (भारत के बाहर) का एक अतिरिक्त रास्ता */
  if (roles.some(r => r.key === "zm")) roles.push({ key: "zm", team: "zm", country: "np", state: "_country" });
  const runs = roles.map(r => ({ rl: r, extra: {} }));
  if (!ONLY.length || ONLY.indexOf("student") > -1) runs.push({ rl: { key: "student" }, extra: { minor: true } });
  let first = true, holes = 0, same = 0;
  for (const run of runs) {
    const en = await joinFull(run.rl, "en", Object.assign({ first }, run.extra)); first = false;
    if (en.hole) holes++;
    const hi = await joinFull(run.rl, "hi", run.extra);
    /* consent_language जान-बूझकर अलग: जिस भाषा के नियम सचमुच दिखे (English नियम-फ़ाइल सिर्फ़ विद्यार्थी-परिवार की है) */
    const learner = /^(student|jobseeker|entrepreneur)$/.test(run.rl.key);
    const tagP = en.tag.replace("J[en]", "JP");
    ck(tagP + " : consent_language = en (English) और hi (हिंदी)", !!en.payload && !!hi.payload &&
      en.payload.consent_language === "en" && hi.payload.consent_language === "hi",
      (en.payload || {}).consent_language + " / " + (hi.payload || {}).consent_language);
    /* (v1.4) दर्ज संस्करण = उसी भूमिका के हिंदी नियम-पत्र की संख्या (पहले हर ग़ैर-विद्यार्थी भूमिका में "1.1" जाता था) */
    const hv = (/<b>Version: ([0-9.]+)/.exec(fs.readFileSync(path.join(ROOT, R.ruleFileFor(run.rl.key)), "utf8")) || [])[1];
    ck(tagP + " : दर्ज संस्करण = हिंदी मूल का संस्करण (" + hv + ")", !!hv && !!en.payload && !!hi.payload && en.payload.consent_rules_version === hv && hi.payload.consent_rules_version === hv,
      (en.payload || {}).consent_rules_version + " / " + (hi.payload || {}).consent_rules_version);
    const strip = p => { if (!p) return p; const q = JSON.parse(JSON.stringify(p)); delete q.consent_language; return q; };
    const a = JSON.stringify(strip(en.payload)), b = JSON.stringify(strip(hi.payload));
    if (ck(tagP + " : server को data हिंदी जैसा ही", !!en.payload && a === b, firstDiff(strip(en.payload), strip(hi.payload)))) same++;
  }
  ck("JP सब भूमिकाओं में data एक-जैसा (" + same + "/" + runs.length + ")", same === runs.length);
  ck("JP English में हर भूमिका के नियम English में (दर्ज होल 0)", holes === 0, "होल " + holes);
}
function firstDiff(a, b, p) {
  p = p || "";
  if (JSON.stringify(a) === JSON.stringify(b)) return "";
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return p + ": " + JSON.stringify(a) + " ≠ " + JSON.stringify(b);
  for (const k of new Set(Object.keys(a).concat(Object.keys(b)))) { const r = firstDiff(a[k], b[k], p + "." + k); if (r) return r; }
  return p;
}

module.exports = { openPage, loginTransform, settle, waitFor, typeIn, pick, click, hindiLeaks, bodyText, MX, R, GATE_CLASSIC,
  /* (v1.6) दूसरी पैनल-भाषाओं का पहरेदार (dev_panel_lang_check.js) यही क़दम दोबारा इस्तेमाल करता है */
  roleList, HJ, joinStep1, joinOtp, joinRole, joinRules, joinStep3, rej, firstDiff };
if (require.main === module) (async function main() {
  const t0 = Date.now();
  const only = process.argv[2] || "";
  try {
    staticSuite();
    if (!only || only === "login") await loginSuite();
    if (!only || only === "guide") await guideSuite();
    if (!only || only === "join") await joinSuite();
  } catch (e) { ck("robot बीच में रुका", false, e && e.stack); }
  console.log("\nजाँचें: पास " + pass + " · FAIL " + fail + " · समय " + Math.round((Date.now() - t0) / 1000) + " सेकंड");
  console.log(fail ? "⛔ dev_panel_i18n_check रुका" : "🏁 dev_panel_i18n_check v1.7 : पैनल-1 (लॉगिन + रजिस्ट्रेशन + रजिस्ट्रेशन गाइड) English पास");
  process.exit(fail ? 1 : 0);
})();
