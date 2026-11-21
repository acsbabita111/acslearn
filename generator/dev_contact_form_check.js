/* dev_contact_form_check.js v1.2 (22-Nov-2026, खेप M-1.1) : संपर्क-form का सुरक्षा जाँच-यंत्र।
   v1.2 (ऑडिट A04 + स्वतंत्र-जाँच): jsdom न हो तो भी सब स्थिर (static) जाँचें चलती हैं, और साफ़ लिखा आता है कि
   चलाने वाली (runtime) जाँचें नहीं चलीं (निकास-कोड 3)। + assets/appcheck-config.js में site key भरी होने की जाँच।
   निकास-कोड: 0 = सब पास · 1 = कोई जाँच फेल · 3 = static सब पास, पर jsdom न होने से runtime नहीं चला।
   v1.1 (ऑडिट M11-G01/G03): संदेश अब server-function submitContactMessage से जाता है (App Check के साथ);
   पन्ना database में ख़ुद कुछ नहीं लिखता; firestore.rules में contact_messages का कोई client-नियम नहीं।
   ChatGPT ऑडिट P0-01 (contact में DOM XSS) और P1-8 (contact_messages का नियम) के बाद बना।
   असली पन्ने (contact/hi/ और contact/en/) का असली module-script jsdom में चलता है; Firebase की जगह नक़ली callable।
   चलाएँ:  node generator/dev_contact_form_check.js [-v]      (jsdom कहीं और हो तो: ACS_JSDOM=<पता>/node_modules/jsdom)
   जाँचें: नाम में HTML/script डालने पर वह सिर्फ़ लिखा हुआ दिखे, कोई tag न बने, कोई script न चले ·
           server को ठीक 4 खाने (name, mobile, message, lang) · App Check key ख़ाली हो तो server को बुलावा नहीं ·
           पन्ने में Firestore का import या contact_messages का सीधा लिखना नहीं · खानों की अधिकतम लंबाई (नाम 80, मोबाइल 10,
           संदेश 1000) पन्ने में और server में एक जैसी · ख़ाली खाने, ग़लत मोबाइल, "आज की सीमा" और server-इनकार पर साफ़ संदेश ·
           पन्ने में कहीं भी innerHTML में बिना esc() का नाम नहीं · firestore.rules (संदर्भ-प्रति) में contact_messages का कोई
           client-नियम नहीं, और ऊपर "कभी deploy नहीं" वाली पट्टी। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
function loadJsdom() {
  const tries = [process.env.ACS_JSDOM, "jsdom", path.join(ROOT, "node_modules/jsdom")].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) {} }
  return null;
}
const JSD = loadJsdom();
const { JSDOM, VirtualConsole } = JSD || {};
let pass = 0, fail = 0;
const VERBOSE = process.argv.indexOf("-v") > -1;   /* -v: हर पास जाँच भी दिखे */
function ck(name, ok, extra) { if (ok) { pass++; if (VERBOSE) console.log("✅ " + name); return true; } fail++; console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 700) : "")); return false; }
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const PAYLOAD = '<img src=x onerror="window.__xss=1"><script>window.__xss=2</script>';

/* पन्ने का contact module-script निकालो, Firebase के import हटाकर नक़ली चीज़ें दो */
function formScript(html) {
  const m = html.match(/<script type="module">((?:(?!<\/script>)[\s\S])*?window\.sendContact[\s\S]*?)<\/script>/);
  if (!m) return null;
  return m[1];
}

async function runPage(file) {
  if (!ck(file + ": फ़ाइल मौजूद है", fs.existsSync(path.join(ROOT, file)))) return;   /* ग़ायब फ़ाइल = फेल-पंक्ति, robot टूटता नहीं */
  const html = rd(file);
  const raw = formScript(html);
  if (!ck(file + ": contact का module-script मिला", !!raw)) return;
  ck(file + ": पन्ना database में ख़ुद नहीं लिखता (Firestore का import नहीं, addDoc नहीं)", !/firebase-firestore\.js/.test(raw) && !/addDoc|collection\(/.test(raw));
  ck(file + ": App Check (reCAPTCHA Enterprise) और server-function submitContactMessage", /initializeAppCheck\(app, \{ provider: new ReCaptchaEnterpriseProvider\(AC_KEY\)/.test(raw) && /httpsCallable\(getFunctions\(app, "us-central1"\), "submitContactMessage"\)/.test(raw));
  ck(file + ": App Check key की फ़ाइल head में लदती है", /<script src="\/assets\/appcheck-config\.js"><\/script>/.test(html.slice(0, html.indexOf("</head>"))));
  const code = raw.replace(/^\s*import[^\n]*\n/gm, "");
  ck(file + ": खानों की अधिकतम लंबाई (पन्ने का HTML: नाम 80, मोबाइल 10, संदेश 1000)",
    /id="cName"[^>]*maxlength="80"/.test(html) && /id="cMob"[^>]*maxlength="10"/.test(html) && /id="cMsg"[^>]*maxlength="1000"/.test(html));
  ck(file + ": नाम innerHTML में सिर्फ़ esc() से जाता है", /\+esc\(name\)\+/.test(code) && !/\+\s*name\s*\+/.test(code), code.match(/innerHTML=[^;]*name[^;]*/g));
  ck(file + ": esc() पाँचों ख़तरनाक अक्षर बदलता है", /const esc = \(v\) => String\(v\)\.replace\(\/\[&<>"'\]\/g/.test(code));
  if (!JSD) return;   /* jsdom नहीं: आगे की runtime जाँच नहीं */
  const vc = new VirtualConsole();
  const dom = new JSDOM(html.replace(/<script\b[\s\S]*?<\/script>/g, ""), { url: "https://acslearn.com/" + file.replace(/index\.html$/, ""), runScripts: "outside-only", virtualConsole: vc });
  const w = dom.window, d = w.document;
  ck(file + ": खानों की अधिकतम लंबाई (नाम 80, मोबाइल 10, संदेश 1000)",
    d.getElementById("cName").getAttribute("maxlength") === "80" && d.getElementById("cMob").getAttribute("maxlength") === "10" && d.getElementById("cMsg").getAttribute("maxlength") === "1000");
  const sent = [];
  w.__mode = "ok";
  let acInit = 0, fnName = "";
  w.ACS_APPCHECK_SITE_KEY = "test-site-key";
  w.__stub = {
    initializeApp: () => ({}), getApps: () => [], getApp: () => ({}),
    initializeAppCheck: () => { acInit++; }, ReCaptchaEnterpriseProvider: function (k) { this.k = k; },
    getFunctions: () => ({}),
    httpsCallable: (fns, name) => { fnName = name; return async (data) => {
      if (w.__mode === "deny") { const e = new Error("internal"); e.code = "functions/internal"; throw e; }
      if (w.__mode === "limit") { const e = new Error("limit"); e.code = "functions/resource-exhausted"; throw e; }
      sent.push({ fn: name, data }); return { data: { ok: true } }; }; },
  };
  try { w.eval("(function(){ const {initializeApp,getApps,getApp,initializeAppCheck,ReCaptchaEnterpriseProvider,getFunctions,httpsCallable} = window.__stub;\n" + code + "\n})();"); }
  catch (e) { ck(file + ": पन्ने का script चला", false, e.message); w.close(); return; }
  ck(file + ": App Check चालू हुआ, function का नाम submitContactMessage", acInit === 1 && fnName === "submitContactMessage");
  const box = d.getElementById("cResult");
  const fill = (n, m, g) => { d.getElementById("cName").value = n; d.getElementById("cMob").value = m; d.getElementById("cMsg").value = g; };

  fill(PAYLOAD, "9431210092", "test");
  await w.sendContact();
  ck(file + ": XSS: नाम में डाला tag बना ही नहीं (img/script शून्य)", box.querySelectorAll("img,script,[onerror]").length === 0, box.innerHTML);
  ck(file + ": XSS: नाम ज्यों-का-त्यों अक्षरों में दिखा", box.textContent.indexOf(PAYLOAD) > -1, box.textContent);
  ck(file + ": XSS: कोई script नहीं चला", w.__xss === undefined);
  const pageLang = /\/en\//.test(file) ? "en" : "hi";
  ck(file + ": server को ठीक 4 खाने (name, mobile, message, lang = पन्ने की भाषा)", sent.length === 1
    && JSON.stringify(Object.keys(sent[0].data).sort()) === JSON.stringify(["lang", "message", "mobile", "name"]) && sent[0].data.lang === pageLang && sent[0].data.name === PAYLOAD, JSON.stringify(sent));
  ck(file + ": सफल होने पर खाने ख़ाली", d.getElementById("cName").value === "" && d.getElementById("cMsg").value === "");

  fill("", "9431210092", "x"); await w.sendContact();
  ck(file + ": ख़ाली नाम पर रोक, कुछ नहीं भेजा", sent.length === 1 && box.querySelector(".pg-bad"));
  fill("Ram", "12345", "x"); await w.sendContact();
  ck(file + ": 10 अंक से कम मोबाइल पर रोक", sent.length === 1 && box.querySelector(".pg-bad"));
  w.__mode = "deny"; fill("Ram", "9431210092", "x"); await w.sendContact();
  ck(file + ": server ने मना किया तो साफ़ संदेश (WhatsApp की राह)", box.querySelector(".pg-bad") && /WhatsApp/.test(box.textContent));
  const t1 = box.textContent;
  w.__mode = "limit"; fill("Ram", "9431210092", "x"); await w.sendContact();
  ck(file + ": \"आज की सीमा\" पर अलग साफ़ संदेश", box.querySelector(".pg-bad") && /WhatsApp/.test(box.textContent) && box.textContent !== t1, box.textContent);
  if (/\/en\//.test(file)) ck(file + ": English पन्ने के संदेश और code में देवनागरी नहीं (टिप्पणी छोड़कर)", !/[\u0900-\u097F]/.test(box.textContent + code.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "")), box.textContent);
  w.close();
  /* App Check key ख़ाली: server को बुलावा नहीं, साफ़ संदेश */
  const dom2 = new JSDOM(html.replace(/<script\b[\s\S]*?<\/script>/g, ""), { url: "https://acslearn.com/" + file.replace(/index\.html$/, ""), runScripts: "outside-only", virtualConsole: new VirtualConsole() });
  const w2 = dom2.window; let calls = 0, ac2 = 0;
  w2.ACS_APPCHECK_SITE_KEY = "";
  w2.__stub = { initializeApp: () => ({}), getApps: () => [], getApp: () => ({}), initializeAppCheck: () => { ac2++; }, ReCaptchaEnterpriseProvider: function () {},
    getFunctions: () => ({}), httpsCallable: () => async () => { calls++; return { data: { ok: true } }; } };
  w2.eval("(function(){ const {initializeApp,getApps,getApp,initializeAppCheck,ReCaptchaEnterpriseProvider,getFunctions,httpsCallable} = window.__stub;\n" + code + "\n})();");
  w2.document.getElementById("cName").value = "Ram"; w2.document.getElementById("cMob").value = "9431210092"; w2.document.getElementById("cMsg").value = "x";
  await w2.sendContact();
  ck(file + ": App Check key ख़ाली हो तो server को बुलावा नहीं, साफ़ संदेश", calls === 0 && ac2 === 0 && !!w2.document.querySelector("#cResult .pg-bad"));
  w2.close();
}

/* firestore.rules (repo की संदर्भ-प्रति): contact_messages का कोई client-नियम नहीं; "कभी deploy नहीं" वाली पट्टी */
function appcheckKeyCheck() {
  let t = ""; try { t = rd("assets/appcheck-config.js"); } catch (e) {}
  ck("assets/appcheck-config.js मौजूद और उसमें site key भरी (संपर्क-पन्ने इसी पर चलते हैं)", /window\.ACS_APPCHECK_SITE_KEY\s*=\s*"[A-Za-z0-9_-]{20,}"/.test(t));
}

function rulesCheck() {
  const R = rd("firestore.rules");
  ck("firestore.rules: contact_messages का कोई client-नियम नहीं (सिर्फ़ server लिखता है)", !/match \/contact_messages\//.test(R));
  ck("firestore.rules: ऊपर संदर्भ-प्रति की पट्टी [M11-REFCOPY] (असली = office की acs-deploy\\firestore.rules)", /\[M11-REFCOPY\]/.test(R.slice(0, 1500)) && R.slice(0, 1500).indexOf("acs-deploy\\firestore.rules") > -1);
  ck("repo में firebase.json नहीं (यहाँ से rules deploy हो ही नहीं सकते)", !fs.existsSync(path.join(ROOT, "firebase.json")));
}

(async () => {
  rulesCheck();
  appcheckKeyCheck();
  await runPage("contact/hi/index.html");
  await runPage("contact/en/index.html");
  if (fail) { console.log("⛔ dev_contact_form_check: " + fail + " जाँच फ़ेल (" + pass + " पास)"); process.exit(1); }
  if (!JSD) { console.log("⚠️ dev_contact_form_check: static " + pass + " जाँच पास; runtime जाँच नहीं चली (jsdom नहीं मिला)।\n   पूरा चलाने के लिए: किसी ख़ाली folder में  npm i jsdom@24  फिर  ACS_JSDOM=<वह folder>/node_modules/jsdom"); process.exit(3); }
  console.log("🏁 dev_contact_form_check: सब पास (" + pass + " पास)");
  process.exit(0);
})();
