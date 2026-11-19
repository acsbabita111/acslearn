#!/usr/bin/env node
/* ============================================================
   dev_panel_dash_check.js v3.3 (19-Nov-2026; v3.3 N-1b: बोर्ड और बैनर वाला नाम: पहचान-कार्ड, online कोर्स के कार्ड (O11); v3.2 P-6b: "✉️ संदेश" (बातचीत, भेजना, अभिभावक का email, शिकायत), शिक्षक की विद्यार्थी-सूची और विद्यार्थी के कार्ड से बातचीत, ACS की "🚩 शिकायतें" (O10); v3.1 P-5b: विद्यार्थी-सूची, कोर्स रद्द करना, ACS की "रद्द" सूची और "वापसी आगे बढ़ाएँ", अटकी वापसी, विद्यार्थी के कार्ड पर रद्द कोर्स (O9); v3.0 P-3b: विद्यार्थी का online-कोर्स पर्दा, ACS की वापसी-सूची, खाता-बही (O6-O8); v2.9 P-2b: कक्षाएँ और YouTube कड़ी की जाँचें (O4, O5); v2.8 P-1b: शिक्षक के paid online कोर्स की जाँचें (O1-O3); v2.7 design D-4: टीम के पैनलों की जाँचें (D4 …); v2.6 design D-3: केंद्र के "Enrollment" की जाँचें (D3 …); v2.5 design D-2: विद्यार्थी के "मेरा केंद्र" की जाँचें (D2 …); v2.4 design D-1: कक्षा-कार्ड का नया रूप और "मेरा रूप" की जाँचें (D1 …, R1 … R11); v2.3 K-5b: प्रगति और सूचना-पट की जाँचें (K5 …); v2.2 K-4b: "काम व अंक" की जाँचें (K4 …); v2.1 K-3b: हाज़िरी की जाँचें (K3 …); v2.0 Founder का देखने वाला मोड (nazarChecks): 13 बाहरी घर नमूना-रूप में, किसी खाते की नज़र से, लिखने वाले काम बंद, तीनों भाषाएँ; v1.9 K-2b: शिकायत वाले रास्ते की जाँचें (K2 …) और Founder/Admin का पैनल pnl-abandon; v1.8 कक्षा-परत K-1b: class_server.js के नक़ली जवाब (K1_HANDLERS), पर्दों की 23 अपनी जाँचें (k1Checks), और हर भाषा की जाँच में सूची, सौंपने का फ़ॉर्म और खोज भी खुलते हैं; v1.7 15-Nov-2026; v1.7 कन्नड़ क-1: openDash, openDoc, openH अब हर पैनल-भाषा के लिए, और बाहर भी मिलते हैं (dev_panel_lang_check.js के लिए); English की जाँचें वही; v1.6 प्रमाणपत्र: नाम पूछने का डिब्बा (पिता / माता / अभिभावक), server में एक बार सहेजना, और बहुत लंबा नाम किनारे के भीतर; v1.5 पैनल-5: नियम-पत्र की कड़ी English नियम-पत्र पर; v1.4 प्रमाणपत्र पर नाम की नई पंक्तियाँ; v1.0 पैनल-2; v1.1 पैनल-3: server के संदेश; v1.2 पैनल-4: काग़ज़; v1.3 पैनल-4ख: सहेजा हुआ हिंदी data): सब 31 dashboard का English पहरेदार
   (v1.2, पैनल-4) काग़ज़ जो DOM में नहीं होते: प्रमाणपत्र का चित्र, परिचय-पत्र का चित्र, WhatsApp के पहले से लिखे संदेश,
   रिपोर्ट की छपाई, अभिरुचि-परीक्षण की कड़ी। English पैनल में इनमें देवनागरी शून्य (उपयोगकर्ता का अपना लिखा नाम छोड़कर);
   हिंदी पैनल में ये हिंदी में ही; भाषा बदलने पर कड़ियाँ और कार्ड साथ बदलते हैं।
   असली पन्ने jsdom में, असली assets/dashboard.js (import की जगह नक़ली Firebase), नक़ली data।
   हर dashboard English में खोलकर हर काम-सूची पैनल दबाया जाता है: दिखने वाला कोई भी पाठ,
   attribute, <title> या संदेश-डिब्बा हिंदी में नहीं होना चाहिए।
   उपयोगकर्ता का अपना लिखा (जैसे हिंदी में लिखा नाम) सिर्फ़ data-i18n-skip ज़ोन में ही दिख सकता है।
   तीन हालतें: base (ख़ाली खाता) · data (भरा खाता, कार्रवाई-बटन भी दबते हैं) · prov (जाँच-में खाता)।
   भाषा-पट्टी tagline के नीचे; उसके बटनों पर नाम तीनों रूप में (Founder-नियम 15-Nov: देवनागरी · रोमन · अपनी लिपि)।
   और: उपयोगकर्ता का नाम "संगीत माली" (पैक में "संगीत" = Music, "माली" = Mali) English में भी वैसा ही;
   भाषा-कार्ड पर भाषा का नाम English में भी देवनागरी + रोमन (Founder-नियम 15-Nov), और यह छूट सिर्फ़ छोटे नाम पर; हिंदी पन्ना इंजन होने और न होने पर अक्षर-अक्षर एक;
   English से हिंदी पर लौटना = बिल्कुल ताज़ा हिंदी।
   उल्टी जाँच (15-Nov): पहरों पर ग़लतियाँ जान-बूझकर डालकर परखा गया; सब पकड़ी गईं (सूची: खेप के AUDIT/mutations.txt में)।
   चलाना (repo-root से): ACS_JSDOM=<jsdom का पता> node generator/dev_panel_dash_check.js [पन्ना-फ़िल्टर]
   ACS_INV=<फ़ाइल> : छूटे हिंदी टुकड़ों की पूरी सूची उस फ़ाइल में (अनुवाद-सूची बनाने के लिए)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const P1 = require("./dev_panel_i18n_check.js");
const { openPage, settle, waitFor, click, hindiLeaks, bodyText } = P1;
const typeIn = (ctx, el, v) => { el.value = v; el.dispatchEvent(new ctx.w.Event("input", { bubbles: true })); el.dispatchEvent(new ctx.w.Event("change", { bubbles: true })); };
const rd = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const DEV = /[ऀ-ॿ]/;
let pass = 0, fail = 0; const t0 = Date.now(); const INV = new Map();
function ck(name, ok, info) { if (ok) pass++; else { fail++; console.log("❌ " + name + (info ? "\n     " + info : "")); } return ok; }

/* ---- dashboard.js को classic script बनाना (import → नक़ली Firebase) ---- */
const DJS = rd("assets/dashboard.js");
function dashTransform(html) {
  let n = 0, dyn = 0;
  let body = DJS.replace(/^import \{([^}]*)\} from "[^"]*";$/gm, function (x, names) { n++; return "const {" + names.replace(/(\w+) as (\w+)/g, "$1: $2") + "} = window.__FB;"   /* "a as b" (import) = "a: b" (destructuring) */; });
  body = body.replace(/import\("\/assets\/rules-gate\.js"\)/g, function () { dyn++; return "window.__importGate()"; });
  if (n !== 4 || /\bimport\s*\(/.test(body) || /^import\s/m.test(body)) throw new Error("dashboard.js के import बदले हैं (static " + n + ", dynamic " + dyn + "): robot अद्यतन करें");
  const tag = '<script type="module" src="/assets/dashboard.js"></script>';
  if (html.split(tag).length !== 2) throw new Error("dashboard.js का script-tag नहीं मिला");
  return html.replace(tag, "<script>(async function(){\n\"use strict\";\n" + body.replace(/<\/script/g, "<\\/script") + "\n})();</script>");
}

/* ---- नक़ली Firebase + data ---- */
const TS = (y, m, d) => { const dt = new Date(Date.UTC(y, m - 1, d, 6)); return { toDate: () => dt, toMillis: () => dt.getTime(), seconds: Math.floor(dt.getTime() / 1000) }; };
/* (v1.2, पैनल-4) काग़ज़ पकड़ने का जाल: canvas पर लिखा हर पाठ, सहेजी फ़ाइल का नाम, छपाई की खिड़की में लिखा पाठ */
function installDocKit(w, ctx) {
  ctx.canvasText = []; ctx.saved = []; ctx.printed = [];
  w.HTMLCanvasElement.prototype.getContext = function () {
    const cv = this; if (cv.__x) return cv.__x;
    const base = { canvas: cv, font: "",
      measureText: t => ({ width: String(t).length * parseInt((/(\d+)px/.exec(base.font) || [0, 16])[1], 10) * 0.55 }),
      fillText: (t, px, py) => { const wd = base.measureText(t).width, al = base.textAlign || "start", L = al === "center" ? px - wd / 2 : (al === "right" || al === "end") ? px - wd : px;
        ctx.canvasText.push({ id: cv.id || "", w: cv.width, t: String(t), x: Math.round(px), y: Math.round(py), font: base.font, L: L, R: L + wd }); },
      createLinearGradient: () => ({ addColorStop() {} }) };
    return (cv.__x = new Proxy(base, { get(o, k) { return (k in o) ? o[k] : function () {}; }, set(o, k, v) { o[k] = v; return true; } }));
  };
  w.HTMLCanvasElement.prototype.toDataURL = () => "data:image/png;base64,AAAA";
  w.QRious = function () {};
  w.jspdf = { jsPDF: function () { this.addImage = function () {}; this.save = function (n) { ctx.saved.push(String(n)); }; } };
  w.open = function () { return { document: { write: h => ctx.printed.push(String(h)) }, print() {} }; };
}
function makeFB(data, user) {
  return function (w, ctx) {
    installDocKit(w, ctx);
    const ref = (coll, id) => ({ __t: "doc", coll, id });
    const snapOf = (coll, id) => { const d = (data[coll] || {})[id]; return { exists: () => !!d, data: () => d, id, ref: { id } }; };
    return {
      initializeApp: () => ({}), getAuth: () => ({ currentUser: user }),
      signOut: () => { ctx.signedOut = true; return Promise.resolve(); },
      onAuthStateChanged: (a, cb) => { setTimeout(() => cb(user), 0); return () => {}; },
      getFirestore: () => ({}), doc: (db, coll, id) => ref(coll, id), collection: (db, coll) => ({ __t: "col", coll, conds: [] }),
      query: (c, ...ops) => ({ __t: "col", coll: c.coll, conds: c.conds.concat(ops.filter(o => o && o.__w)) }),
      where: (f, op, v) => ({ __w: 1, f, op, v }), orderBy: () => null, limit: () => null, startAfter: () => null,
      getDoc: r => Promise.resolve(snapOf(r.coll, r.id)),
      getDocs: q => {
        const all = data[q.coll] || {};
        const docs = Object.keys(all).filter(id => q.conds.every(c => c.op !== "==" || all[id][c.f] === c.v))
          .map(id => ({ id, data: () => all[id], ref: { id } }));
        return Promise.resolve({ docs, empty: !docs.length, size: docs.length, forEach: f => docs.forEach(f) });
      },
      onSnapshot: (r, cb) => { setTimeout(() => cb(snapOf(r.coll, r.id)), 0); return () => {}; },
      getFunctions: () => ({}), httpsCallable: (f, name) => (d => w.__CALL(name, d).then(r => ({ data: r })))
    };
  };
}
function pageInfo(file) {
  const m = /window\.ACS_DASH=(\{[^<]*\});<\/script>/.exec(rd(file));
  if (!m) throw new Error(file + ": ACS_DASH नहीं मिला");
  return new Function("return " + m[1])();   /* JS-object (कुंजियाँ बिना उद्धरण) */
}
const NAME_HI = "राम कुमार";   /* उपयोगकर्ता का अपना लिखा हिंदी नाम: सिर्फ़ skip-ज़ोन में दिख सकता है */
function fixture(info, sc) {
  sc = sc || "base";
  const role = String((info.extRoles && info.extRoles[0]) || info.allowed[0] || "student").toLowerCase();
  const reg = {
    authUid: "u1", role, status: "approved", regNo: "ACS-2026-123456", name_local: NAME_HI, name_roman: "Ram Kumar",
    email: "ram@example.com", mobile: "9000000000", country: "in", state: "bihar", district: "Khagaria", desired_district: "Khagaria",
    pincode: "851201", createdAt: TS(2026, 11, 1), documents: { doc_photo: { url: "https://example.com/p.jpg", filename: "p.jpg" } },
    rmVerify: { status: "verified" }, dob: "2000-01-01"
  };
  if (sc === "prov") { reg.status = "provisional"; reg.rmVerify = { status: "pending" }; }
  const data = { registrations: { r1: reg }, teams: {}, sessions: { u1: { sid: "s1" } } };
  if (sc === "data") {   /* भरा हुआ खाता: भुगतान, बैज, referral, नामांकन, परीक्षा, प्रमाणपत्र */
    /* (v3.3, N-1b) बोर्ड और बैनर वाला नाम: केंद्र और वर्कशॉप का org_name, शिक्षक और उस्ताद का class_name */
    if (role === "center" || role === "workshop") reg.formFields = { org_name: HU.bnr };
    if (role === "teacher" || role === "ustad") reg.formFields = { class_name: HU.cls };
    data.payments = {
      p1: { uid: "u1", purpose: "badge", status: "paid", amount: 30000, rmStatus: "approved", badgeType: role === "student" ? "golden" : "green", badgeRole: role,
        badgeActiveFrom: TS(2026, 11, 2), badgeExpiresAt: TS(2027, 11, 2), createdAt: TS(2026, 11, 2), orderId: "order_A1", tier: "village" },
      p2: { uid: "u1", purpose: "aptitude_attempt", status: "paid", amount: 10000, createdAt: TS(2026, 11, 3), orderId: "order_A2" },
      p3: { uid: "u1", purpose: "badge", status: "paid", amount: 30000, rmStatus: "rejected", rmNote: "photo not clear", refundDuePercent: 70, refundDueRupees: 210, createdAt: TS(2026, 10, 2), orderId: "order_A3" },
      /* (v3.0, P-3b) शिक्षक के online कोर्स का भुगतान, और एक दोहरा भुगतान जो लौटाया गया */
      p4: { uid: "u1", purpose: "online_course", courseId: "oc4", courseTitle: "Spoken English", status: "paid", amount: 50000, createdAt: TS(2026, 11, 10), orderId: "order_A4", enrolled: true },
      p5: { uid: "u1", purpose: "online_course", courseId: "oc4", courseTitle: "Spoken English", status: "paid", amount: 50000, duplicate: true, refundStatus: "refunded", createdAt: TS(2026, 11, 10), orderId: "order_A5" }
    };
    data.referrals = { f1: { refBy: "u1", status: "due", amount: 10000, newRegNo: "ACS-2026-777777", createdAt: TS(2026, 11, 5), expiresAt: TS(2027, 11, 2) } };
    data.enrollments = { e1: { studentUid: "u1", centerUid: "c1", courseId: "PJ001", status: "active", centerName: "Shiv Computer Center", feeRupees: 5000, createdAt: TS(2026, 11, 6) },
      e2: { studentUid: "u1", centerUid: "c1", courseId: "PJ002", status: "proposed", centerName: "Shiv Computer Center", createdAt: TS(2026, 11, 7) } };
    data.examResults = { x1: { uid: "u1", courseId: "SE022", pct: 72, pass: true, score: 86, total: 120, at: TS(2026, 11, 8) } };
    data.certificates = { c1: { uid: "u1", certNo: "ACS-C-2026-0001", courseId: "SE022", courseName: "Two-Wheeler", name: "Ram Kumar", pct: 72, issuedAt: TS(2026, 11, 9), validUntil: TS(2031, 11, 9) } };
    data.offerings = { o1: { centerUid: "u1", courseId: "PJ001", feeRupees: 5000, seats: 30, filled: 3, status: "open", startOn: "2026-12-01", createdAt: TS(2026, 11, 1) } };
    data.tasks = { t1: { title: "Visit village", text: "Meet RM", to: "u1", by: "u2", status: "pending", createdAt: TS(2026, 11, 3) } };
    data.reports = { rp1: { cycle: "daily", text: "Done", by: "u1", createdAt: TS(2026, 11, 3) } };
  }
  if (sc === "docs") {   /* (v1.2, पैनल-4) काग़ज़ों की जाँच: सहेजा हुआ data हिंदी में, जैसा असल में होता है */
    reg.name_roman = "Raam Kumar";   /* उपयोगकर्ता की अपनी वर्तनी (मशीन का रोमन रूप "Ram Kumar" होता): English प्रमाणपत्र पर यही छपे */
    data.payments = { p1: { uid: "u1", purpose: "badge", status: "paid", amount: 30000, rmStatus: "approved", badgeType: role === "student" ? "golden" : "green", badgeRole: role,
      badgeActiveFrom: TS(2026, 11, 2), badgeExpiresAt: TS(2027, 11, 2), createdAt: TS(2026, 11, 2), orderId: "order_A1", tier: "village" } };
    data.examResults = { x1: { uid: "u1", courseId: "SE022", pct: 72, pass: true, score: 86, total: 120, at: TS(2026, 11, 8) } };
    data.certificates = { c1: { uid: "u1", resultId: "x1", certNo: "ACS-C-2026-0001", courseId: "SE022", courseName: "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स (Certificate in Two-Wheeler Servicing & EV)", name: NAME_HI, pct: 72, issuedAt: TS(2026, 11, 9), validUntil: TS(2031, 11, 9) } };
    data.offerings = { o1: { centerUid: "u1", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", feeRupees: 5000, seats: 30, filled: 3, status: "open", startOn: "2026-12-01", createdAt: TS(2026, 11, 1) } };
    data.enrollments = {
      e1: { studentUid: "s9", centerUid: "u1", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", status: "active", studentName: "सीता देवी", studentRegNo: "ACS-2026-999999", enrolledAt: TS(2026, 11, 6), createdAt: TS(2026, 11, 6),
        feeEntries: [{ receiptNo: "R-0001", amountRupees: 500, at: TS(2026, 11, 7), note: "" }] },
      e2: { studentUid: "s8", centerUid: "u1", courseId: "PJ002", courseName: "डेटा एंट्री ऑपरेटर", status: "active", studentName: "सीता देवी", studentRegNo: "ACS-2026-888888", enrolledAt: TS(2026, 11, 7), createdAt: TS(2026, 11, 7), feeEntries: [] } };
  }
  if (info.mode !== "external") {
    const desig = String(info.allowed[0] || "hq_admin").toLowerCase();
    data.teams.u1 = { designation: desig, active: true, status: "permanent", name: "Ram Kumar", level: "hq", country: "in", state: "bihar", region: ["Khagaria"] };
    data.registrations.r2 = Object.assign({}, reg, { authUid: "u2", regNo: "ACS-2026-654321", role: "teacher", status: "provisional", name_local: "सीता देवी", name_roman: "Sita Devi" });
    if (sc === "data") {
      data.registrations.r3 = Object.assign({}, reg, { authUid: "u3", regNo: "ACS-2026-111111", role: "center", status: "rejected", rejection: { reason: "photo not clear", correction_deadline: TS(2026, 11, 22) }, name_local: "सीता देवी" });
      data.registrations.r4 = Object.assign({}, reg, { authUid: "u4", regNo: "ACS-2026-222222", role: "rm", staff_level: "rm", status: "approved", name_local: "सीता देवी" });
      data.teams.u2 = { designation: "rm", active: true, status: "permanent", name: "Sita Devi", level: "rm", country: "in", state: "bihar", region: ["Khagaria"] };
      data.teams.u5 = { designation: "hq_legal", active: false, status: "provisional", name: "Mohan", level: "hq" };
    }
  }
  return data;
}
const HANDLERS = { claimSession: () => ({ ok: true }), rulesStatus: () => ({ applies: false }) };

async function openDash(file, sc, lang, noEngine) {
  const info = pageInfo(file);
  const data = fixture(info, sc), user = { uid: "u1", email: "ram@example.com" };
  const tf = noEngine ? (h => dashTransform(h).replace('<script src="/assets/panel_i18n.js"></script>', "")) : dashTransform;
  const c = await openPage(file, { transform: tf, urlPath: "/" + file.replace(/index\.html$/, ""), ls: (lang && lang !== "hi") ? { acs_dash_lang: lang } : {}, expect: (lang && lang !== "hi") ? lang : undefined,   /* (v1.7) हर पैनल-भाषा */
    handlers: Object.assign({}, HANDLERS), fb: makeFB(data, user) });
  return c;
}
async function openAll(c) {
  await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden") || !c.d.getElementById("denyView").classList.contains("hidden"), 6000);
  await settle(c); await settle(c);
  const navs = Array.from(c.d.querySelectorAll("#sideNav .si"));
  for (const b of navs) { click(c, b); await settle(c); await settle(c); }
  await settle(c); return navs.length;
}
let RULE_PAGES = 0;   /* जिन dashboard में नियम-पत्र का पैनल है */
async function runPage(file, sc) {
  sc = sc || "base";
  const c = await openDash(file, sc, "en");
  [NAME_HI, "सीता देवी"].forEach(v => { c.userVals.add(v); c.userVals.add(v.trim()[0]); });   /* नाम + उसका पहला अक्षर (फ़ोटो की जगह) */
  [HU.bnr, HU.cls].forEach(v => c.userVals.add(v));   /* (v3.3, N-1b) उपयोगकर्ता का लिखा बैनर-नाम: पूरा नाम ही, अक्षर नहीं */
  const up = await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden") || !c.d.getElementById("denyView").classList.contains("hidden"), 6000);
  await settle(c); await settle(c);
  const tag = file.replace(/^dashboard\//, "").replace(/\/index\.html$/, "") + (sc === "base" ? "" : " [" + sc + "]");
  ck(tag + " : dashboard खुला", up && !c.d.getElementById("appView").classList.contains("hidden"), "appView नहीं खुला");
  { const bt = k => ((c.d.querySelector('#acsPanelLangBar button[data-plang="' + k + '"]') || {}).textContent || "").trim();
    if (sc === "base") ck(tag + " : भाषा-पट्टी tagline के नीचे, बटनों पर नाम तीनों रूप में (हिन्दी · Hindi, अंग्रेज़ी · English)", !!c.d.querySelector("#acsPanelLangSlot #acsPanelLangBar") && bt("hi") === "हिन्दी · Hindi" && bt("en") === "अंग्रेज़ी · English", bt("hi") + " | " + bt("en")); }
  const navs = Array.from(c.d.querySelectorAll("#sideNav .si"));
  for (const b of navs) { click(c, b); await settle(c); await settle(c); }
  await settle(c);
  /* भरे खाते में कार्रवाई-बटन भी दबाओ: पुष्टि/सूचना-डिब्बे English में हों (पुष्टि पर "नहीं", ताकि कुछ न बदले) */
  if (sc === "data") {
    c.confirmAnswer = false;
    const acts = Array.from(c.d.querySelectorAll('#badgeBuyBtn,[data-refgift],#ofDeclare,[data-act="approve"],[data-act="reject"],[data-certext],[data-cert]'));
    for (const b of acts) { if (b.disabled) continue; click(c, b); await settle(c); await settle(c); }
    if (process.env.ACS_VERBOSE) console.log("   " + tag + ": कार्रवाई-बटन " + acts.length + ", संदेश-डिब्बे " + c.dialogs.length + (c.dialogs.length ? " (पहला: " + c.dialogs[0].slice(0, 80).replace(/\n/g, " ") + ")" : ""));
    ck(tag + " : कार्रवाई-बटन दबाए (" + acts.length + ")", true);
  }
  /* उपयोगकर्ता का अपना लिखा (नाम) बचा रह सकता है: उसे हटाकर देखो, बाक़ी में हिंदी न हो */
  const UV = Array.from(c.userVals);
  const L = hindiLeaks(c).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV.forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
  L.forEach(x => { const k = x.replace(/^\[skip-ज़ोन\] /, ""); INV.set(k, (INV.get(k) || []).concat(tag)); });
  ck(tag + " : English में हिंदी शून्य (" + navs.length + " पैनल)", L.length === 0, L.length + " जगह: " + L.slice(0, 6).join("  ‖  "));
  /* भाषा-कार्ड (Founder-नियम 15-Nov: भाषा के बटन पर नाम देवनागरी · रोमन · अपनी लिपि, हमेशा):
     English में भी "जापानी" और "Japanese" दोनों; यह छूट सिर्फ़ भाषा के नाम के लिए (data-lname में छोटा नाम ही, वाक्य नहीं) */
  const sw = Array.from(c.d.querySelectorAll(".lgswitch,.crsban.lang"));
  if (sw.length) ck(tag + " : English में भी भाषा का नाम देवनागरी और रोमन दोनों में (" + sw.length + " कार्ड)",
    sw.every(x => { const t = Array.from(x.querySelectorAll("[data-lname]")).map(y => y.textContent.trim()); return t.length >= 2 && t.some(v => DEV.test(v)) && t.some(v => /^[A-Za-z]/.test(v)); }),
    sw.filter(x => { const t = Array.from(x.querySelectorAll("[data-lname]")).map(y => y.textContent.trim()); return !(t.length >= 2 && t.some(v => DEV.test(v)) && t.some(v => /^[A-Za-z]/.test(v))); }).slice(0, 3).map(x => x.textContent.trim()).join(" | "));
  const ln = Array.from(c.d.querySelectorAll("[data-lname]")).map(x => x.textContent.trim());
  if (ln.length) ck(tag + " : भाषा-नाम की छूट सिर्फ़ छोटे नाम पर (" + ln.length + ")", ln.every(t => t.length <= 30 && !/[।.!?:]/.test(t)), ln.filter(t => !(t.length <= 30 && !/[।.!?:]/.test(t))).slice(0, 5).join(" | "));
  /* (v1.5, पैनल-5) "पूरा नियम-पत्र पढ़ें" English में English नियम-पत्र पर जाए; वह फ़ाइल हो और उसमें देवनागरी न हो */
  if (sc === "base") {
    const ra = c.d.querySelector('#pnl-rules a[data-href-en]'), raw = fs.readFileSync(path.join(ROOT, file), "utf8"), m = /href="\/(rules-consent-[a-z-]+\.html)" data-href-en="\/en\/(rules-consent-[a-z-]+\.html)"/.exec(raw);
    if (/id="pnl-rules"/.test(raw)) {
      const hf = ra ? ra.getAttribute("href") : "", f = hf ? path.join(ROOT, hf) : "";
      ck(tag + " : नियम-पत्र की कड़ी English में English नियम-पत्र पर (फ़ाइल है; टिप्पणियों और \"हिंदी\" भाषा-कड़ी के बाहर देवनागरी शून्य; हिंदी में मूल पता)",
        !!m && m[1] === m[2] && hf === "/en/" + m[2] && fs.existsSync(f) && !DEV.test(fs.readFileSync(f, "utf8").replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/>🇮🇳 हिंदी</g, "><")) && fs.existsSync(path.join(ROOT, m[1])), hf + " | " + (m ? m[1] : "कड़ी नहीं मिली"));
      RULE_PAGES++;
    }
  }
  const errs = c.errors.splice(0); ck(tag + " : JS-त्रुटि शून्य", errs.length === 0, errs.slice(0, 3).join(" ‖ "));
  c.dom.window.close();
}

/* (दर्ज-औज़ार) ACS_DUMP=<फ़ाइल>: हर dashboard को हिंदी में (भरा खाता) खोलकर दिखने वाला पाठ JSON में लिखना
   (पुराने और नए repo का हिंदी-मिलान करने के लिए) */
async function dumpHindi(pages, out) {
  const res = {};
  for (const f of pages) { const c = await openDash(f, "data", "hi"); await openAll(c);
    const b = c.d.body.cloneNode(true); b.querySelectorAll("script,style,#acsPanelLangBar").forEach(x => x.remove());
    res[f] = { text: b.textContent.replace(/\s+/g, " ").trim(), title: c.d.title, dialogs: c.dialogs.slice() }; c.dom.window.close(); }
  fs.writeFileSync(out, JSON.stringify(res));
}
/* ════════ (v1.3, पैनल-4ख) सहेजा हुआ हिंदी data ════════
   असल में खाते का data हिंदी में सहेजा होता है। पुराना नक़ली data English में था, इसलिए यह कमी नहीं दिखती थी।
   नियम: (1) उपयोगकर्ता का लिखा (नाम, केंद्र का नाम, टिप्पणी, कारण, काम, रिपोर्ट) English पैनल में अक्षर-अक्षर वैसा ही, और हिंदी पैनल जितनी ही बार;
   (2) बाक़ी सब (कोर्स का सहेजा नाम, उद्यम/क्षेत्र के नाम, जिला) English में; (3) परीक्षा के प्रश्न और विकल्प कोर्स की भाषा में, बिना छेड़छाड़। */
/* हर पाठ में जान-बूझकर ऐसा शब्द है जो पैक में भी है (केंद्र, शिक्षा, संगीत, माली): बचाव न हो, तो वह शब्द बदल जाएगा और जाँच पकड़ लेगी */
const HU = { center: "शिव संगीत केंद्र", student: "संगीत माली", task: "केंद्र का दौरा", detail: "केंद्र में शिक्षा की जाँच करनी है", report: "आज केंद्र का काम पूरा हुआ", reason: "केंद्र की फ़ोटो साफ़ नहीं है",
  feeNote: "केंद्र पर पहली किस्त", subjects: "हिंदी, गणित, शिक्षा", dur: "3 महीने (शिक्षा सत्र)", ret: "केंद्र बंद है", hold: "केंद्र में अनुशासन की कमी", vnote: "केंद्र का पता ग़लत है",
  ocTitle: "शिक्षा की बोलचाल कक्षा", ocAbout: "गाँव के बच्चों के लिए बोलचाल की सरल पढ़ाई, रोज़ एक घंटा", ocLang: "हिंदी और भोजपुरी", ccl: "शिक्षक के घर में शादी है", msg: "कल की कक्षा में किताब लेकर आना", krs: "शिक्षक ने रात में बेवजह संदेश भेजा", bnr: "ज्ञान ज्योति कंप्यूटर केंद्र", cls: "शर्मा गणित कक्षा" };
const HQ = ["सुरक्षा के लिए हेलमेट क्यों ज़रूरी है?", "सिर की सुरक्षा के लिए", "गाँव का नियम है", "शिक्षा के लिए", "खेल के लिए"];
function hdataFix(data, info) {
  const C1 = "कंप्यूटर ऑपरेटर (Computer Operator)", C2 = "डेटा एंट्री ऑपरेटर", C3 = "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स (Certificate in Two-Wheeler Servicing & EV)";
  const r1 = data.registrations.r1; r1.district = "खगड़िया"; r1.desired_district = "खगड़िया"; r1.formFields = Object.assign({ center_name: HU.center, workshop_name: HU.center }, r1.formFields);   /* (v3.3, N-1b) बैनर-नाम (org_name, class_name) बना रहे */
  const en = (id, o) => Object.assign({ studentUid: "u1", centerUid: "u1", centerName: HU.center, studentName: HU.student, studentRegNo: "ACS-2026-999999", enrolledAt: TS(2026, 11, 6), createdAt: TS(2026, 11, 6) }, o);
  data.enrollments = {
    e1: en("e1", { courseId: "PJ001", courseName: C1, status: "active", feeEntries: [{ receiptNo: "R-0001", amountRupees: 500, at: TS(2026, 11, 7), note: HU.feeNote }] }),
    e2: en("e2", { courseId: "PJ002", courseName: C2, status: "offered" }),
    e3: en("e3", { courseId: "PJ002", courseName: C2, status: "requested" }),
    e4: en("e4", { courseId: "SE022", courseName: C3, status: "returned", returnReason: HU.ret }) };
  data.offerings = { o1: { centerUid: "u1", courseId: "PJ001", courseName: C1, feeRupees: 5000, seats: 30, filledCount: 3, status: "open", startDate: "2026-12-01", endDate: "2027-03-01", durationText: HU.dur, subjects: HU.subjects, createdAt: TS(2026, 11, 1) } };
  data.tasks = { t1: { title: HU.task, detail: HU.detail, to: "u1", to_uid: "u1", by: "u2", by_uid: "u2", status: "pending", at: TS(2026, 11, 3), createdAt: TS(2026, 11, 3) } };
  data.reports = { rp1: { cycle: "daily", text: HU.report, by: "u1", by_uid: "u1", at: TS(2026, 11, 3), createdAt: TS(2026, 11, 3) } };
  if (data.registrations.r3) { data.registrations.r3.rejection.reason = HU.reason; data.registrations.r3.name_local = HU.student; data.registrations.r3.district = "खगड़िया"; }
  if (data.teams.u5) { data.teams.u5.name_local = HU.student; data.teams.u5.active = true; data.teams.u5.status = "permanent"; data.teams.u5.hold = { type: "work", reason: HU.hold, by: "u1", at: TS(2026, 11, 4) }; }
  if (data.teams.u2) data.teams.u2.name_local = HU.student;
}
/* (v1.8, कक्षा-परत K-1b) class_server.js के नक़ली जवाब: हर हालत की एक कक्षा (प्रस्ताव, चालू, सूचना पर, बिना सूचना छोड़ी), सुझाया हुआ नया समय,
   इंतज़ार वाले विद्यार्थी, रोकी हुई फ़ीस, रोक लगा खाता। नाम और कारण हिंदी में (उपयोगकर्ता का लिखा): वे सिर्फ़ data-i18n-skip ज़ोन में दिख सकते हैं। */
const K1C = (id, st, extra) => Object.assign({ classId: id, offeringId: "u1_PJ001", batchNo: 1, courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)",
  centerName: HU.center, centerRegNo: "ACS-CE-2026-123456", centerRole: "center", teacherName: HU.student, teacherRegNo: "ACS-TE-2026-222222", teacherRole: "teacher",
  days: [1, 3, 5], from: "16:00", to: "17:30", status: st, cap: 30, lastDayMs: st === "notice" ? Date.UTC(2026, 11, 2) : null, noticeReason: st === "notice" ? HU.reason : "", pendingSched: null }, extra || {});
/* (v1.9, K-2b) शिकायत की तीन हालतें: खुली (जवाब का समय बाक़ी), जवाब आ चुका, खुली और 7 दिन बीत चुके */
const K1AB = (st, days, reply) => ({ abandon: { status: st, reason: HU.hold, reportedAtMs: Date.now() - (7 - days) * 86400000, replyByMs: Date.now() + days * 86400000, reply: reply || "" } });
/* (v2.8, P-1b) शिक्षक का paid online कोर्स: चारों हालतें (मसौदा, जाँच में, लौटाया गया, मंज़ूर) */
const OCC = (id, st, extra) => Object.assign({ courseId: id, mode: "live", title: HU.ocTitle, about: HU.ocAbout, lang: HU.ocLang, classes: 24, days: [1, 3, 5],
  from: "18:00", to: "19:00", minutes: 60, startDate: "2026-12-01", lastDate: "2027-01-29", fee: 500, status: st, returnReason: "", returns: 0 }, extra || {});
const OC_HANDLERS = {
  listMyOnlineCourses: () => ({ allowed: true, blocked: false, canCreate: true, maxOpen: 5, maxFee: 100000,
    items: [OCC("oc1", "draft"), OCC("oc2", "review"), OCC("oc3", "returned", { returnReason: HU.ret, returns: 1 }), OCC("oc4", "approved", { className: HU.cls }),
      OCC("oc5", "cancelled", { cancelReason: HU.ccl, cancelledBy: "teacher", cancelledAtMs: Date.UTC(2026, 10, 18, 6), enrolled: 3 })] }),
  listOnlineCourseQueue: (d) => ({ status: (d && d.status) || "review", total: 1,
    items: [OCC("oc2", (d && d.status) || "review", Object.assign({ teacherName: HU.student, teacherRegNo: "ACS-TE-2026-222222", teacherRole: "teacher" },
      d && d.status === "cancelled" ? { cancelReason: HU.ccl, cancelledBy: "acs", cancelledAtMs: Date.UTC(2026, 10, 18, 6), enrolled: 3 } : {}))] }),
  saveOnlineCourse: () => ({ ok: true, courseId: "oc9", status: "draft" }), submitOnlineCourse: () => ({ ok: true, status: "review" }),
  withdrawOnlineCourse: (d) => ({ ok: true, status: d && d.drop ? "dropped" : "draft" }), decideOnlineCourse: (d) => ({ ok: true, status: d && d.approve ? "approved" : "returned" }),
  /* (v2.9, P-2b) कक्षाएँ: 2 बीती, 1 अभी चालू (कड़ी लगी), 8 आने वाली (एक पर कड़ी) */
  listOnlineClasses: () => ({ courseId: "oc4", title: HU.ocTitle, status: "approved", canSet: true, earlyMin: 15, linked: 3,
    classes: Array.from({ length: 11 }, (_, i) => ({ n: i + 1, date: "2026-12-" + String(1 + i * 2).padStart(2, "0"), day: [1, 3, 5][i % 3], from: "18:00", to: "19:00",
      state: i < 2 ? "past" : (i === 2 ? "open" : "later"), link: (i === 1 || i === 2 || i === 4) ? "https://www.youtube.com/watch?v=AbCdEfGhIjK" : "" })) }),
  setOnlineClassLink: (d) => ({ ok: true, classNo: d && d.classNo, link: d && d.link ? "https://www.youtube.com/watch?v=AbCdEfGhIjK" : "" }),
  /* (v3.0, P-3b) विद्यार्थी: मेरे कोर्स (एक चालू, कक्षा अभी खुली; एक छोड़ा हुआ, वापसी भेजी गई) और खुले कोर्स (एक नया, एक जुड़ा हुआ) */
  myOnlineCourses: () => ({ items: [
    { courseId: "oc4", title: HU.ocTitle, teacherName: HU.student, className: HU.cls, teacherRole: "teacher", lang: HU.ocLang, days: [1, 3, 5], from: "18:00", to: "19:00", startDate: "2026-12-01", lastDate: "2027-01-29",
      classes: 24, held: 2, attended: 1, feeRupees: 500, status: "active", canWithdraw: false, refundPct: 90, refundRupees: 0, refundStatus: "", next: { n: 3, date: "2026-12-05", day: 5, from: "18:00", to: "19:00", state: "open" } },
    { courseId: "oc7", title: HU.ocTitle, teacherName: HU.student, teacherRole: "ustad", lang: HU.ocLang, days: [2], from: "10:00", to: "11:00", startDate: "2026-12-02", lastDate: "2026-12-30",
      classes: 5, held: 0, attended: 0, feeRupees: 300, status: "withdrawn", canWithdraw: false, refundPct: 90, refundRupees: 270, refundStatus: "refunded", next: null },
    { courseId: "oc8", title: HU.ocTitle, teacherName: HU.student, teacherRole: "teacher", lang: HU.ocLang, days: [4], from: "17:00", to: "18:00", startDate: "2026-12-10", lastDate: "2026-12-31",
      classes: 4, held: 0, attended: 0, feeRupees: 200, status: "active", canWithdraw: true, refundPct: 90, refundRupees: 0, refundStatus: "", next: { n: 1, date: "2026-12-10", day: 4, from: "17:00", to: "18:00", state: "later" } },
    { courseId: "oc6", title: HU.ocTitle, teacherName: HU.student, teacherRole: "teacher", lang: HU.ocLang, days: [1], from: "17:00", to: "18:00", startDate: "2026-12-14", lastDate: "2026-12-28",
      classes: 3, held: 0, attended: 0, feeRupees: 500, status: "cancelled", canWithdraw: false, refundPct: 90, refundRupees: 500, refundStatus: "queued", cancelReason: HU.ccl, next: null }] }),
  listOnlineCatalog: () => ({ items: [
    OCC("oc9", "approved", { teacherName: HU.student, teacherRole: "teacher", joined: false, own: false, enrolled: 12, className: HU.cls }),
    OCC("oc8", "approved", { teacherName: HU.student, teacherRole: "ustad", joined: true, own: false, enrolled: 5 })] }),
  syncOnlinePayments: () => ({ ok: true, fixed: 0 }),
  createOnlineCourseOrder: (d) => ({ ok: true, orderId: "order_OC1", amount: 50000, currency: "INR", keyId: "rzp_test_x", name: "Applied Computer School", title: HU.ocTitle }),
  verifyOnlineCoursePayment: () => ({ ok: true, status: "active", duplicate: false }),
  openOnlineClass: (d) => ({ ok: true, classNo: d && d.classNo, link: "https://www.youtube.com/watch?v=AbCdEfGhIjK" }),
  withdrawOnlineEnrollment: () => ({ ok: true, status: "withdrawn", refundRupees: 180, refundStatus: "refunded" }),
  listOnlineRefundsDue: () => ({ items: [{ enrollmentId: "oc4_uS3", courseId: "oc4", courseTitle: HU.ocTitle, studentName: HU.student, studentRegNo: "ACS-2026-999999",
    orderId: "order_A9", paymentId: "pay_A9", refundRupees: 450, atMs: Date.UTC(2026, 10, 18), pct: 90, stuck: false, why: "withdrawn" },
    { enrollmentId: "oc5_uS4", courseId: "oc5", courseTitle: HU.ocTitle, studentName: HU.student, studentRegNo: "ACS-2026-999998",
      orderId: "order_B1", paymentId: "pay_B1", refundRupees: 500, atMs: Date.UTC(2026, 10, 18), pct: 100, stuck: true, why: "cancelled" }] }),
  markOnlineRefundPaid: () => ({ ok: true }),
  /* (v3.1, P-5b) विद्यार्थी-सूची (53 में से 3 एक बार में), कोर्स रद्द करना, वापसी आगे बढ़ाना */
  listOnlineLearners: (d) => ({ total: 53, active: 51, held: 2, classes: 24, offset: (d && d.offset) || 0, pageSize: 50,
    items: [{ name: HU.student, regNo: "ACS-2026-999999", role: "student", status: "active", enrolledAtMs: Date.UTC(2026, 10, 12), attended: 2 },
      { name: HU.student, regNo: "ACS-2026-999998", role: "jobseeker", status: "withdrawn", enrolledAtMs: Date.UTC(2026, 10, 13), attended: 0 },
      { name: HU.student, regNo: "ACS-2026-999997", role: "entrepreneur", status: "active", enrolledAtMs: Date.UTC(2026, 10, 14), attended: 1 }] }),
  cancelOnlineCourse: () => ({ ok: true, status: "cancelled", learners: 3, refunded: 3, due: 0, left: 0 }),
  runOnlineRefunds: () => ({ ok: true, refunded: 2, due: 0, left: 1 }),
  /* (v3.2, P-6b) निजी संदेश, अभिभावक का email, संदेश-शिकायतें */
  listMyThreads: () => ({ total: 2, blocked: false, items: [
    { side: "teacher", courseId: "oc4", courseTitle: HU.ocTitle, regNo: "ACS-2026-999999", otherName: HU.student, minor: true, lastText: HU.msg, lastAtMs: Date.UTC(2026, 10, 19, 4), lastSide: "student", unread: 2 },
    { side: "student", courseId: "oc9", courseTitle: HU.ocTitle, regNo: "ACS-2026-999999", otherName: HU.student, minor: true, lastText: HU.krs, lastAtMs: Date.UTC(2026, 10, 19, 3), lastSide: "student", unread: 0, complaint: false }] }),
  openThread: (d) => ({ courseId: (d && d.courseId) || "oc4", courseTitle: HU.ocTitle, side: d && d.regNo ? "teacher" : "student", regNo: "ACS-2026-999999", otherName: HU.student, minor: true, lock: "",
    complaint: false, total: 3, shown: 2, items: [
      { id: "m1", mine: !(d && d.regNo), fromSide: "student", text: HU.msg, atMs: Date.UTC(2026, 10, 19, 3), copy: "sent" },
      { id: "m2", mine: !!(d && d.regNo), fromSide: "teacher", text: HU.msg, atMs: Date.UTC(2026, 10, 19, 4), copy: "failed" }] }),
  sendMessage: () => ({ ok: true, id: "m3", copy: "sent" }),
  reportThread: () => ({ ok: true, complaintId: "k1" }),
  myGuardianContact: () => ({ learner: true, minor: true, verified: false, email: "", pending: "" }),
  setGuardianEmail: () => ({ ok: true, sentTo: "pa****@example.com" }),
  confirmGuardianEmail: () => ({ ok: true, email: "pa****@example.com" }),
  listMsgComplaints: (d) => ({ status: (d && d.status) || "open", total: 1, items: [{ complaintId: "k1", courseTitle: HU.ocTitle, teacherName: HU.student, teacherRegNo: "ACS-TE-2026-222222",
    studentName: HU.student, studentRegNo: "ACS-2026-999999", minor: true, reason: HU.krs, atMs: Date.UTC(2026, 10, 19, 5), status: (d && d.status) || "open",
    closeNote: d && d.status === "closed" ? HU.ccl : "", closedAtMs: 0, blocked: !!(d && d.status === "closed") }] }),
  readComplaintThread: () => ({ complaintId: "k1", total: 2, items: [{ fromSide: "teacher", text: HU.msg, atMs: Date.UTC(2026, 10, 19, 3), copy: "sent" },
    { fromSide: "student", text: HU.msg, atMs: Date.UTC(2026, 10, 19, 4), copy: "sent" }] }),
  closeMsgComplaint: (d) => ({ ok: true, blocked: !!(d && d.block) }),
  unblockTeacherMsg: () => ({ ok: true })
};
const K1_HANDLERS = {
  listMyClasses: () => ({
    asCenter: [{ courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", status: "open", seats: 60, students: 31, cap: 30, maxBatches: 4, waiting: 1,
      batches: [{ batchNo: 1, size: 30, classes: [K1C("k1", "active", { pendingSched: { days: [0, 6], from: "07:00", to: "08:00" } }), K1C("k2", "notice"), K1C("k4", "active", K1AB("open", 5)), K1C("k5", "active", K1AB("replied", 3, HU.ret))] },
                { batchNo: 2, size: 0, classes: [K1C("k3", "offered", { batchNo: 2 })] }, { batchNo: 3, size: 0, classes: [] },
                { batchNo: 4, size: 0, classes: [K1C("k6", "active", Object.assign({ batchNo: 4 }, K1AB("open", -1)))] }],
      heldFees: [{ classId: "k9", batchNo: 2, teacherName: HU.student, teacherRegNo: "ACS-TE-2026-222222", leftAtMs: Date.UTC(2026, 10, 10) }] }],
    asTeacher: [K1C("k3", "offered"), K1C("k1", "active", { pendingSched: { days: [0, 6], from: "07:00", to: "08:00" } }), K1C("k2", "notice"), K1C("k9", "left_no_notice", { feeHold: true }),
      K1C("k4", "active", K1AB("open", 5)), K1C("k5", "active", K1AB("replied", 3, HU.ret)), K1C("k6", "active", K1AB("open", -1))],
    asStudent: [{ offeringId: "u1_PJ001", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", centerName: HU.center, batchNo: 1,
        teacher: { teacherName: HU.student, teacherRole: "teacher", days: [1, 3, 5], from: "16:00", to: "17:30" } },
      { offeringId: "u1_PJ002", courseId: "PJ002", courseName: "डेटा एंट्री ऑपरेटर", centerName: HU.center, batchNo: 2, teacher: null },
      { offeringId: "u1_PJ003", courseId: "PJ002", courseName: "डेटा एंट्री ऑपरेटर", centerName: HU.center, batchNo: null, teacher: null }],
    standing: { strikes: 1, lifetime: false, blocked: true, applied: false, blockedUntilMs: null } }),
  classRoster: () => ({ cls: K1C("k1", "active"), total: 2, cap: 30, waiting: 1, students: [
    { regNo: "ACS-ST-2026-111111", name: HU.student, role: "student", minor: true, guardianOk: false, joinedMs: Date.UTC(2026, 10, 6) },
    { regNo: "ACS-ST-2026-111112", name: "सीता देवी", role: "student", minor: false, guardianOk: null, joinedMs: Date.UTC(2026, 10, 7) }] }),
  lookupTeacher: () => ({ regNo: "ACS-TE-2026-222222", name: HU.student, role: "teacher", blocked: false, blockedForLife: false }),
  /* (v2.1, K-3b) हाज़िरी */
  listAttendance: d => ({ cls: K1C((d && d.classId) || "k1", "active"), today: "2026-11-18", firstOpen: "2026-11-15", canMark: true, date: (d && d.date) || "2026-11-18",
    dayMarks: (d && d.date === "2026-11-17") ? { "ACS-ST-2026-111111": "A", "ACS-ST-2026-111112": "P" } : null, daysHeld: 3, lastDate: "2026-11-17",
    days: [{ date: "2026-11-17", open: true, P: 1, A: 1, L: 0 }, { date: "2026-11-13", open: false, P: 2, A: 0, L: 0 }],
    students: [{ regNo: "ACS-ST-2026-111111", name: HU.student, present: 2, absent: 1, leave: 0, pct: 67 }, { regNo: "ACS-ST-2026-111112", name: "सीता देवी", present: 2, absent: 0, leave: 1, pct: 100 }] }),
  markAttendance: d => ({ ok: true, date: d.date, corrected: d.date === "2026-11-17", counts: { P: 1, A: 1, L: 0 } }),
  myAttendance: () => ({ items: [{ offeringId: "u1_PJ001", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", centerName: HU.center, days: 3, present: 2, absent: 1, leave: 0, pct: 67,
      last: [{ date: "2026-11-17", mark: "P" }, { date: "2026-11-16", mark: "A" }, { date: "2026-11-13", mark: "P" }] },
    { offeringId: "u1_PJ002", courseId: "PJ002", courseName: "डेटा एंट्री ऑपरेटर", centerName: HU.center, days: 0, present: 0, absent: 0, leave: 0, pct: null, last: [] }] }),
  /* (v2.2, K-4b) काम व अंक */
  listWork: d => ({ cls: K1C((d && d.classId) || "k1", "active"), canMark: true, today: "2026-11-18",
    works: [{ workId: "w2", title: HU.task, details: HU.detail, dueDate: "2026-11-25", maxMarks: 10, counts: { S: 0, N: 0, R: 0, open: 2 },
        results: [{ regNo: "ACS-ST-2026-111111", status: "", marks: null, remark: "" }, { regNo: "ACS-ST-2026-111112", status: "", marks: null, remark: "" }] },
      { workId: "w1", title: HU.report, details: "", dueDate: "2026-11-15", maxMarks: 20, counts: { S: 1, N: 0, R: 1, open: 0 },
        results: [{ regNo: "ACS-ST-2026-111111", status: "S", marks: 15, remark: HU.vnote }, { regNo: "ACS-ST-2026-111112", status: "R", marks: null, remark: "" }] }],
    students: [{ regNo: "ACS-ST-2026-111111", name: HU.student, got: 15, full: 20, done: 1, missed: 0, again: 0, pct: 75 }, { regNo: "ACS-ST-2026-111112", name: "सीता देवी", got: 0, full: 0, done: 0, missed: 0, again: 1, pct: null }] }),
  setWork: () => ({ ok: true, workId: "w3", changed: false }), removeWork: () => ({ ok: true }), markWork: d => ({ ok: true, written: Object.keys(d.results || {}).length }),
  myWork: () => ({ items: [{ offeringId: "u1_PJ001", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", centerName: HU.center, got: 15, full: 30, done: 1, missed: 1, again: 1, pct: 50,
      works: [{ title: HU.task, details: HU.detail, dueDate: "2026-11-25", maxMarks: 10, status: "", marks: null, remark: "" }, { title: HU.report, details: "", dueDate: "2026-11-15", maxMarks: 20, status: "S", marks: 15, remark: HU.vnote },
        { title: HU.ret, details: "", dueDate: "2026-11-10", maxMarks: 10, status: "N", marks: null, remark: "" }, { title: HU.hold, details: "", dueDate: "2026-11-08", maxMarks: 10, status: "R", marks: null, remark: "" }] }] }),
  /* (v2.3, K-5b) सूचना-पट */
  listNotices: d => ({ cls: K1C((d && d.classId) || "k1", "active"), canPost: true, total: 2, notices: [{ text: HU.ret, byRole: "center", byName: HU.center, atMs: Date.UTC(2026, 10, 17, 6) }, { text: HU.task, byRole: "teacher", byName: HU.student, atMs: Date.UTC(2026, 10, 15, 6) }] }),
  postNotice: () => ({ ok: true, noticeId: "n9" }),
  myNotices: () => ({ items: [{ offeringId: "u1_PJ001", courseId: "PJ001", notices: [{ text: HU.ret, byRole: "center", byName: HU.center, atMs: Date.UTC(2026, 10, 17, 6) }, { text: HU.task, byRole: "teacher", byName: HU.student, atMs: Date.UTC(2026, 10, 15, 6) }] }] }),
  listAbandonCases: () => ({ items: [{ classId: "k5", courseId: "PJ001", courseName: "कंप्यूटर ऑपरेटर (Computer Operator)", batchNo: 1, centerName: HU.center, centerRegNo: "ACS-CE-2026-123456",
    teacherName: HU.student, teacherRegNo: "ACS-TE-2026-222222", teacherRole: "teacher", reason: HU.hold, reply: HU.ret, reportedAtMs: Date.UTC(2026, 10, 10), repliedAtMs: Date.UTC(2026, 10, 12) }] })
};
const H_HANDLERS = {
  listBadgeQueue: () => ({ scope: "founder", items: [{ id: "p9", name: HU.student, regNo: "ACS-2026-555555", role: "teacher", tier: "village", pin: "851201", amountRupees: 300, paidAt: Date.UTC(2026, 10, 9), state: "bihar", district: "खगड़िया", mobile: "9000000001" }] }),
  listServiceVerifyQueue: () => ({ scope: "founder", items: [{ regNo: "ACS-2026-444444", name: HU.student, role: "center", orgName: HU.center, district: "खगड़िया", state: "bihar", verify: "failed", verifyNote: HU.vnote, status: "provisional" }] }),
  lookupStudent: () => ({ name: HU.student, regNo: "ACS-2026-999999", minor: false }),
  lookupCenter: () => ({ name: HU.center, regNo: "ACS-2026-123456", district: "खगड़िया", state: "bihar", offerings: [{ courseId: "PJ002", courseName: "डेटा एंट्री ऑपरेटर", feeRupees: 4000, seats: 20, filledCount: 2, durationText: HU.dur, subjects: HU.subjects, startDate: "2026-12-01", endDate: "2027-03-01" }] }),
  examGate: () => ({ now: Date.now(), mode: "badge", course: { name: "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स", pass: 60 }, quota: { canStart: true }, best: null, open: null,
    rules: { perSet: 40, sets: 3, maxSetSec: 2400, minSetSec: 600, pauseMinSec: 60, pauseMaxSec: 300, sessionSec: 9000, dailyMax: 2 } }),
  examStart: () => ({ now: Date.now(), sid: "s1", set: 1, courseId: "SE022", name: "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स", pass: 60, deadline: Date.now() + 2400000, releaseAt: Date.now() + 600000,
    questions: [{ t: HQ[0], o: HQ.slice(1) }, { t: "दूसरा प्रश्न: शिक्षा क्या है?", o: ["ज्ञान", "खेल", "काम", "नाम"] }],
    rules: { perSet: 40, sets: 3, maxSetSec: 2400, minSetSec: 600, pauseMinSec: 60, pauseMaxSec: 300, sessionSec: 9000, dailyMax: 2 } })
};
const visText = c => { const b = c.d.body.cloneNode(true); b.querySelectorAll("script,style,noscript,#acsPanelLangBar").forEach(x => x.remove()); return b.textContent; };
const countOf = (t, v) => t.split(v).length - 1;
async function openH(file, lang, sc, navOnly, moreLs) {   /* navOnly (v1.7): सिर्फ़ ये पैनल खोलो (id की सूची); न हो तो सब */
  const info = pageInfo(file), data = fixture(info, sc || "data"), user = { uid: "u1", email: "ram@example.com" };
  hdataFix(data, info);
  const ls = { acs_apt_sess_v1: APT_PREV, acs_learn_progress: JSON.stringify({ read: { "/courses/hi/two-wheeler/twv-001-parichay.html": 1 } }) }; if (lang && lang !== "hi") ls.acs_dash_lang = lang; Object.assign(ls, moreLs || {});
  const c = await openPage(file, { transform: dashTransform, urlPath: "/" + file.replace(/index\.html$/, ""), ls, expect: (lang && lang !== "hi") ? lang : undefined,
    handlers: Object.assign({}, HANDLERS, DOC_HANDLERS, H_HANDLERS, K1_HANDLERS, OC_HANDLERS), fb: makeFB(data, user) });
  if (navOnly) { await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden"), 6000); await settle(c);
    for (const id of navOnly) { const b = c.d.querySelector('#sideNav .si[data-go="' + id + '"]'); if (b) { click(c, b); await settle(c); await settle(c); } }
    await settle(c); return c; }
  await openAll(c); await settle(c);
  /* खोज वाले बटन: केंद्र खोजना (विद्यार्थी), विद्यार्थी खोजना (केंद्र) */
  for (const [inp, btn] of [["mcCtrReg", "mcFindBtn"], ["addStuReg", "addStuFind"]]) { const i = c.d.getElementById(inp), b = c.d.getElementById(btn); if (i && b) { i.value = "ACS-2026-123456"; click(c, b); await settle(c); await settle(c); } }
  /* (v1.8, कक्षा-परत K-1b) विद्यार्थी-सूची खोलना, बैच सौंपने का फ़ॉर्म खोलना, शिक्षक खोजना, समय बदलने का फ़ॉर्म खोलना */
  /* (v2.4, design D-1) कक्षा के पाँच खाने अब एक बार में एक ही खुलते हैं। हर खाना खोलकर उसकी निष्क्रिय प्रति #k1Snap में रखते हैं,
     ताकि पूरे पन्ने की भाषा-जाँच हर खाने को देखे। आख़िर में विद्यार्थी-सूची खुली रहती है। */
  { const snap = () => { let h = c.d.getElementById("k1Snap"); if (!h) { h = c.d.createElement("div"); h.id = "k1Snap"; c.d.body.appendChild(h); }
      c.d.querySelectorAll(".k1card .k1att, .k1card .k1pane").forEach(n => { const k = n.cloneNode(true); k.removeAttribute("class");
        k.querySelectorAll("*").forEach(x => { x.removeAttribute("data-k1"); x.removeAttribute("id"); x.removeAttribute("class"); }); h.appendChild(k); }); };
    for (const sel of ['[data-k1="give"]', '[data-k1="att"]', '[data-k1="attall"]', '[data-k1="wk"]', '[data-k1="wknew"]', '[data-k1="wkopen"][data-w="w1"]', '[data-k1="pg"]', '[data-k1="nt"]', '[data-k1="ros"]']) {
      const b = c.d.querySelector(sel); if (!b) continue;
      if (/"(wk|pg|nt|ros)"\]$/.test(sel)) snap();
      click(c, b); await settle(c); await settle(c); } }
  { const i = c.d.getElementById("k1Reg"), b = c.d.querySelector('[data-k1="find"]'); if (i && b) { i.value = "ACS-TE-2026-222222"; click(c, b); await settle(c); await settle(c); } }
  /* (v2.8, P-1b) online कोर्स: सूची की निष्क्रिय प्रति (भाषा-जाँच के लिए), फिर नए कोर्स का फ़ॉर्म खुला रहे */
  { const cb = c.d.querySelector('#ocList [data-oc="cls"]'); if (cb) { click(c, cb); await settle(c); await settle(c);
      const dd = c.d.querySelector("#ocList details.ocpast"); if (dd) dd.open = true; } }
  { const L = c.d.getElementById("ocList"), nb = c.d.querySelector('[data-oc="new"]');
    if (L && nb) { let h = c.d.getElementById("k1Snap"); if (!h) { h = c.d.createElement("div"); h.id = "k1Snap"; c.d.body.appendChild(h); }
      const k = L.cloneNode(true); k.removeAttribute("id"); k.querySelectorAll("*").forEach(x => { x.removeAttribute("data-oc"); x.removeAttribute("id"); x.removeAttribute("class"); }); h.appendChild(k);
      click(c, nb); await settle(c); await settle(c); } }
  await settle(c); return c;
}
/* (v1.8, कक्षा-परत K-1b) पर्दों की अपनी जाँच: केंद्र, शिक्षक और विद्यार्थी के घर में कक्षा-परत सचमुच दिखती और चलती है */
async function k1Checks(pages) {
  const has = (c, sel) => !!c.d.querySelector(sel), txt = (c, id) => { const e = c.d.getElementById(id); return e ? e.textContent : ""; };
  const pg = n => pages.find(f => f.split("/")[1] === n);
  if (pg("center")) { const c = await openH(pg("center"), "hi"), t = txt(c, "clsList");
    ck("K1 केंद्र: बैच, इंतज़ार और बैच-चुनाव दिखते हैं", /कुल विद्यार्थी:\s*31/.test(t) && /इंतज़ार में:\s*1/.test(t) && has(c, 'select[data-k1sel="PJ001"]') && has(c, '[data-k1="bset"]'), t.slice(0, 200));
    ck("K1 केंद्र: ख़ाली बैच पर सौंपने का बटन, भरे बैच पर नहीं", Array.from(c.d.querySelectorAll('[data-k1="give"]')).map(b => b.getAttribute("data-b")).join() === "3,4");   /* (v1.9) बैच 4: शिकायत वाली कक्षा के रहते अगला शिक्षक तय हो सकता है */
    ck("K1 केंद्र: सौंपने का फ़ॉर्म खुला, खोजा हुआ नाम दिखा", has(c, "#k1Reg") && c.d.querySelectorAll(".k1day").length === 7 && has(c, "#k1From") && /बैच सौंपा जा सकता है/.test(txt(c, "k1Who")));
    ck("K1 केंद्र: विद्यार्थी-सूची में नाम और ACS-ID, संपर्क नहीं", /ACS-ST-2026-111111/.test(t) && /Guardian-दस्तावेज़ नहीं/.test(t) && !/9\d{9}|@/.test(t));
    ck("K1 केंद्र: रोकी हुई फ़ीस और माफ़ी का बटन", /इस कक्षा की फ़ीस रोकें/.test(t) && has(c, '[data-k1="forgive"][data-id="k9"]'));
    ck("K1 केंद्र: सूचना का कारण और आख़िरी दिन", /कक्षा का आख़िरी दिन:/.test(t) && t.indexOf(HU.reason) > -1);
    ck("K1 केंद्र: समय बदलने और कक्षा वापस लेने के बटन", has(c, '[data-k1="time"][data-id="k1"]') && has(c, '[data-k1="end"][data-st="offered"]') && has(c, '[data-k1="end"][data-st="active"]'));
    const tb = c.d.querySelector('[data-k1="time"][data-id="k1"]'); click(c, tb); await settle(c); await settle(c);
    ck("K1 केंद्र: समय का फ़ॉर्म चालू समय से भरा खुलता है", (c.d.getElementById("k1From") || {}).value === "16:00" && c.d.querySelectorAll(".k1day:checked").length === 3 && !has(c, "#k1Reg"));
    const sb = c.d.querySelector('[data-k1="send"]'); click(c, sb); await settle(c); await settle(c);
    const sc = c.calls.filter(x => x.name === "setClassSchedule").pop();
    ck("K1 केंद्र: नया समय server को सही खानों में जाता है", !!sc && sc.data.classId === "k1" && sc.data.from === "16:00" && sc.data.to === "17:30" && sc.data.days.join() === "1,3,5", JSON.stringify(sc && sc.data)); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi"), t = txt(c, "myClsList"), s = txt(c, "myClsStand");
    ck("K1 शिक्षक: प्रस्ताव पर हाँ और ना", has(c, '[data-k1="acc"][data-id="k3"]') && has(c, '[data-k1="dec"][data-id="k3"]'));
    ck("K1 शिक्षक: चालू कक्षा पर सूची, सूचना और छोड़ने के बटन", has(c, '[data-k1="ros"][data-id="k1"]') && has(c, '[data-k1="notice"][data-id="k1"]') && has(c, '[data-k1="leave"][data-id="k1"]') && !has(c, '[data-k1="notice"][data-id="k2"]'));
    ck("K1 शिक्षक: सूचना वापस लेने का बटन सिर्फ़ सूचना वाली कक्षा पर", has(c, '[data-k1="unnotice"][data-id="k2"]') && !has(c, '[data-k1="unnotice"][data-id="k1"]'));
    ck("K1 शिक्षक: सुझाए हुए समय पर मंज़ूर और नामंज़ूर", has(c, '[data-k1="sy"][data-id="k1"]') && has(c, '[data-k1="sn"][data-id="k1"]') && /नया समय सुझाया गया है:/.test(t));
    ck("K1 शिक्षक: बिना सूचना छोड़ी कक्षा पर फ़ीस-रोक दिखती है, बटन नहीं", /इसकी फ़ीस रोकी गई है/.test(t) && !has(c, '[data-id="k9"]'));
    ck("K1 शिक्षक: रोक की सूचना और दोबारा आवेदन का बटन", /नई कक्षा मिलना बंद है/.test(s) && has(c, '[data-k1="apply"]'));
    ck("K1 शिक्षक: केंद्र को दिखने वाला कारण और बटन यहाँ नहीं", !has(c, '[data-k1="forgive"]') && !has(c, '[data-k1="give"]') && !has(c, '[data-k1="time"]'));
    const nb = c.d.querySelector('[data-k1="acc"][data-id="k3"]'); click(c, nb); await settle(c); await settle(c);
    const rc = c.calls.filter(x => x.name === "respondClass").pop();
    ck("K1 शिक्षक: हाँ server को जाती है", !!rc && rc.data.classId === "k3" && rc.data.accept === true); }
  /* (v2.1, K-3b) हाज़िरी */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "base", ["pnl-myclass"]), q = sel => c.d.querySelector(sel), qa = sel => c.d.querySelectorAll(sel);
    ck("K3 शिक्षक: चालू कक्षा पर हाज़िरी का बटन, प्रस्ताव पर नहीं", !!q('[data-k1="att"][data-id="k1"]') && !!q('[data-k1="att"][data-id="k2"]') && !q('[data-k1="att"][data-id="k3"]') && !q('[data-k1="att"][data-id="k9"]'));
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K3 शिक्षक: आज और पिछले 3 दिन के बटन, आज चुना हुआ", qa(".k1d").length === 4 && q(".k1d.on").getAttribute("data-d") === "2026-11-18" && q(".k1d.on").textContent === "18/11/2026" && /अभी नहीं लगी/.test(txt(c, "myClsList")));
    ck("K3 शिक्षक: हर विद्यार्थी के तीन बटन, कोई पहले से चुना नहीं", qa(".k1m").length === 6 && qa(".k1m.on").length === 0 && /उपस्थित/.test(q(".k1mP").textContent) && /अनुपस्थित/.test(q(".k1mA").textContent) && /छुट्टी/.test(q(".k1mL").textContent));
    click(c, q('[data-k1="attsave"]')); await settle(c);
    ck("K3 शिक्षक: अधूरी हाज़िरी server को नहीं जाती, कारण दिखता है", !c.calls.some(x => x.name === "markAttendance") && /हर विद्यार्थी की हाज़िरी लगाएँ/.test(txt(c, "myClsMsg")));
    click(c, q('[data-k1="attall"]')); await settle(c);
    ck("K3 शिक्षक: \"सब उपस्थित\" से सब चुने गए", qa(".k1mP.on").length === 2 && qa(".k1m.on").length === 2);
    click(c, q('.k1mA[data-r="ACS-ST-2026-111111"]')); await settle(c);
    click(c, q('[data-k1="attsave"]')); await settle(c); await settle(c);
    const mk = c.calls.filter(x => x.name === "markAttendance").pop();
    ck("K3 शिक्षक: हाज़िरी server को सही खानों में जाती है", !!mk && mk.data.classId === "k1" && mk.data.date === "2026-11-18" && mk.data.marks["ACS-ST-2026-111111"] === "A" && mk.data.marks["ACS-ST-2026-111112"] === "P" && Object.keys(mk.data.marks).length === 2 && /हाज़िरी सहेज ली गई/.test(txt(c, "myClsMsg")), JSON.stringify(mk && mk.data));
    click(c, q('.k1d[data-d="2026-11-17"]')); await settle(c); await settle(c);
    const la = c.calls.filter(x => x.name === "listAttendance").pop();
    ck("K3 शिक्षक: पुराना दिन चुनने पर उस दिन की लगी हाज़िरी भरी हुई आती है", la.data.date === "2026-11-17" && q(".k1d.on").getAttribute("data-d") === "2026-11-17" && !!q('.k1mA.on[data-r="ACS-ST-2026-111111"]') && !!q('.k1mP.on[data-r="ACS-ST-2026-111112"]') && /लग चुकी है/.test(txt(c, "myClsList")));
    ck("K3 शिक्षक: अब तक का हिसाब (दिन, उपस्थित, प्रतिशत)", /हाज़िरी के कुल दिन:\s*3/.test(txt(c, "myClsList")) && /67%/.test(txt(c, "myClsList")) && /100%/.test(txt(c, "myClsList")) && /आख़िरी हाज़िरी:\s*17\/11\/2026/.test(txt(c, "myClsList")) && !/9\d{9}|@/.test(txt(c, "myClsList")));
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c);
    ck("K3 शिक्षक: बटन दोबारा दबाने पर हाज़िरी का हिस्सा बंद", !q(".k1att")); c.dom.window.close(); }
  if (pg("center")) { const c = await openH(pg("center"), "hi", "base", ["pnl-class"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K3 केंद्र: हाज़िरी दिखती है, लगाने के बटन नहीं", !!q(".k1att") && /हाज़िरी के कुल दिन:\s*3/.test(txt(c, "clsList")) && /67%/.test(txt(c, "clsList")) && !q(".k1m") && !q(".k1d") && !q('[data-k1="attsave"]') && !q('[data-k1="attall"]'));
    ck("K3 केंद्र: पैनल में हाज़िरी का वाक्य", /हाज़िरी शिक्षक लगाता है/.test(c.d.getElementById("pnl-class").textContent)); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "base", ["pnl-myctr"]), t = txt(c, "mcClass");
    ck("K3 विद्यार्थी: अपनी हाज़िरी (दिन, उपस्थित, प्रतिशत, पिछले दिन)", /हाज़िरी के कुल दिन:\s*3/.test(t) && /67%/.test(t) && /17\/11 ✅/.test(t) && /16\/11 ❌/.test(t) && /अभी कोई हाज़िरी दर्ज नहीं/.test(t), t.slice(0, 300));
    ck("K3 विद्यार्थी: कोई बटन नहीं, किसी और की हाज़िरी नहीं", !c.d.querySelector("#mcClass button") && !/ACS-ST-2026-111112/.test(t)); c.dom.window.close();
    const d = await openH(pg("student"), "hi", "base", ["pnl-rules"]); d.handlers.myAttendance = () => { throw new Error("x"); };
    click(d, d.d.querySelector('#sideNav .si[data-go="pnl-myctr"]')); await settle(d); await settle(d); await settle(d);
    ck("K3 विद्यार्थी (हाज़िरी न आए): कक्षा की पंक्ति वैसी ही रहती है", /मेरी कक्षा:/.test(txt(d, "mcClass")) && /शिक्षक:/.test(txt(d, "mcClass")) && !/हाज़िरी के कुल दिन/.test(txt(d, "mcClass"))); d.dom.window.close(); }
  /* (v2.2, K-4b) काम व अंक */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "base", ["pnl-myclass"]), q = sel => c.d.querySelector(sel), qa = sel => c.d.querySelectorAll(sel), T = () => txt(c, "myClsList");
    ck("K4 शिक्षक: चालू कक्षा पर \"काम व अंक\" का बटन, प्रस्ताव पर नहीं", !!q('[data-k1="wk"][data-id="k1"]') && !q('[data-k1="wk"][data-id="k3"]'));
    click(c, q('[data-k1="wk"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K4 शिक्षक: दिए गए काम, गिनती और अब तक के अंक", /दिए गए काम:\s*2/.test(T()) && T().indexOf(HU.task) > -1 && /25\/11\/2026/.test(T()) && /पूरे अंक:\s*20/.test(T()) && /15 \/ 20/.test(T()) && /75%/.test(T()) && !/9\d{9}|@/.test(T()));
    ck("K4 शिक्षक: जिस काम के अंक नहीं लिखे, वही हटाया जा सकता है", !!q('[data-k1="wkdel"][data-w="w2"]') && !q('[data-k1="wkdel"][data-w="w1"]'));
    click(c, q('[data-k1="wknew"]')); await settle(c);
    ck("K4 शिक्षक: नए काम का फ़ॉर्म: आख़िरी तारीख़ 7 दिन आगे, पूरे अंक 10", (q("#k1WDue") || {}).value === "2026-11-25" && (q("#k1WMax") || {}).value === "10" && !!q("#k1WTitle"));
    click(c, q('[data-k1="wksave"]')); await settle(c);
    ck("K4 शिक्षक: बिना नाम का काम server को नहीं जाता", !c.calls.some(x => x.name === "setWork") && /काम का नाम लिखें/.test(txt(c, "myClsMsg")));
    q("#k1WTitle").value = "तीसरा काम"; q("#k1WMax").value = "25"; click(c, q('[data-k1="wksave"]')); await settle(c); await settle(c);
    const sw = c.calls.filter(x => x.name === "setWork").pop();
    ck("K4 शिक्षक: नया काम server को सही खानों में जाता है", !!sw && sw.data.classId === "k1" && sw.data.title === "तीसरा काम" && sw.data.maxMarks === 25 && sw.data.dueDate === "2026-11-25" && /काम दे दिया गया/.test(txt(c, "myClsMsg")), JSON.stringify(sw && sw.data));
    click(c, q('[data-k1="wkopen"][data-w="w1"]')); await settle(c);
    ck("K4 शिक्षक: अंक की सूची पहले के नतीजों से भरी आती है", qa(".k1m").length === 6 && !!q('.k1mP.on[data-r="ACS-ST-2026-111111"]') && !!q('.k1mL.on[data-r="ACS-ST-2026-111112"]') && (q('.k1wm[data-r="ACS-ST-2026-111111"]') || {}).value === "15" && !q('.k1wm[data-r="ACS-ST-2026-111112"]') && (q('.k1wr[data-r="ACS-ST-2026-111111"]') || {}).value === HU.vnote);
    q('.k1wr[data-r="ACS-ST-2026-111111"]').value = "शाबाश"; click(c, q('.k1mP[data-r="ACS-ST-2026-111112"]')); await settle(c);
    ck("K4 शिक्षक: एक बटन दबाने पर दूसरे खाने का लिखा हुआ नहीं मिटता", (q('.k1wr[data-r="ACS-ST-2026-111111"]') || {}).value === "शाबाश" && (q('.k1wm[data-r="ACS-ST-2026-111111"]') || {}).value === "15" && !!q('.k1wm[data-r="ACS-ST-2026-111112"]'));
    click(c, q('[data-k1="wkmark"]')); await settle(c);
    ck("K4 शिक्षक: \"जमा\" पर अंक न लिखे हों तो server को नहीं जाता", !c.calls.some(x => x.name === "markWork") && /जमा वाले हर विद्यार्थी के अंक लिखें/.test(txt(c, "myClsMsg")));
    q('.k1wm[data-r="ACS-ST-2026-111112"]').value = "18"; click(c, q('[data-k1="wkmark"]')); await settle(c); await settle(c);
    const mw = c.calls.filter(x => x.name === "markWork").pop(), R1 = mw && mw.data.results["ACS-ST-2026-111111"], R2 = mw && mw.data.results["ACS-ST-2026-111112"];
    ck("K4 शिक्षक: अंक server को सही खानों में जाते हैं", !!mw && mw.data.classId === "k1" && mw.data.workId === "w1" && R1.status === "S" && R1.marks === 15 && R1.remark === "शाबाश" && R2.status === "S" && R2.marks === 18 && /अंक सहेज लिए गए/.test(txt(c, "myClsMsg")), JSON.stringify(mw && mw.data));
    c.confirmAnswer = true; click(c, q('[data-k1="wkdel"][data-w="w2"]')); await settle(c); await settle(c);
    const rw = c.calls.filter(x => x.name === "removeWork").pop();
    ck("K4 शिक्षक: काम हटाना server को जाता है", !!rw && rw.data.workId === "w2" && rw.data.classId === "k1"); c.dom.window.close(); }
  if (pg("center")) { const c = await openH(pg("center"), "hi", "base", ["pnl-class"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-k1="wk"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K4 केंद्र: काम और अंक दिखते हैं, लिखने के बटन नहीं", /दिए गए काम:\s*2/.test(txt(c, "clsList")) && /75%/.test(txt(c, "clsList")) && !q('[data-k1="wknew"]') && !q('[data-k1="wkopen"]') && !q('[data-k1="wkdel"]') && !q(".k1wm")); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "base", ["pnl-myctr"]), t = txt(c, "mcClass");
    ck("K4 विद्यार्थी: अपना काम, अंक और शिक्षक की टिप्पणी", /काम व अंक:\s*15 \/ 30/.test(t) && /50%/.test(t) && /जमा\s*·\s*15 \/ 20/.test(t) && /नहीं किया/.test(t) && /दोबारा करना है/.test(t) && /बाक़ी/.test(t) && t.indexOf(HU.vnote) > -1, t.slice(0, 400));
    ck("K4 विद्यार्थी: कोई बटन नहीं, कोई खाना नहीं", !c.d.querySelector("#mcClass button") && !c.d.querySelector("#mcClass input")); c.dom.window.close(); }
  /* (v2.3, K-5b) प्रगति और सूचना-पट */
  for (const who of ["teacher", "center"]) if (pg(who)) { const box = who === "teacher" ? "myClsList" : "clsList", msg = who === "teacher" ? "myClsMsg" : "clsMsg";
    const c = await openH(pg(who), "hi", "base", [who === "teacher" ? "pnl-myclass" : "pnl-class"]), q = sel => c.d.querySelector(sel), T = () => txt(c, box);
    click(c, q('[data-k1="pg"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K5 " + who + ": प्रगति में हर विद्यार्थी की हाज़िरी और अंक एक जगह", /📊 प्रगति/.test(T()) && /हाज़िरी:\s*2 \/ 3\s*·\s*67%/.test(T()) && /काम व अंक:\s*15 \/ 20\s*·\s*75%/.test(T()) && /हाज़िरी के कुल दिन:\s*3/.test(T()) && !/9\d{9}|@/.test(T()), T().slice(-300));
    click(c, q('[data-k1="pg"][data-id="k1"]')); await settle(c);
    click(c, q('[data-k1="nt"][data-id="k1"]')); await settle(c); await settle(c);
    ck("K5 " + who + ": सूचना-पट में सूचनाएँ, लिखने वाले की भूमिका के साथ", /कुल सूचनाएँ:\s*2/.test(T()) && T().indexOf(HU.ret) > -1 && T().indexOf(HU.task) > -1 && /केंद्र/.test(q(".k1att").textContent) && /शिक्षक/.test(q(".k1att").textContent) && !!q(".k1nt"));
    click(c, q('[data-k1="ntsend"]')); await settle(c);
    ck("K5 " + who + ": ख़ाली सूचना server को नहीं जाती", !c.calls.some(x => x.name === "postNotice") && /सूचना लिखें/.test(txt(c, msg)));
    q(".k1nt").value = "कल कक्षा नहीं होगी"; c.confirmAnswer = false; click(c, q('[data-k1="ntsend"]')); await settle(c);
    ck("K5 " + who + ": भेजने से पहले पुष्टि; \"नहीं\" पर कुछ नहीं जाता और लिखा हुआ बचा रहता है", !c.calls.some(x => x.name === "postNotice") && c.dialogs.some(x => /बदली या हटाई नहीं जा सकती/.test(x)) && (q(".k1nt") || {}).value === "कल कक्षा नहीं होगी");
    c.confirmAnswer = true; click(c, q('[data-k1="ntsend"]')); await settle(c); await settle(c);
    const pn = c.calls.filter(x => x.name === "postNotice").pop();
    ck("K5 " + who + ": सूचना server को सही खानों में जाती है", !!pn && pn.data.classId === "k1" && pn.data.text === "कल कक्षा नहीं होगी" && /सूचना भेज दी गई/.test(txt(c, msg)) && (q(".k1nt") || {}).value === "", JSON.stringify(pn && pn.data)); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "base", ["pnl-myctr"]), t = txt(c, "mcClass");
    ck("K5 विद्यार्थी: अपने बैच की सूचनाएँ दिखती हैं, लिखने का खाना नहीं", /सूचनाएँ:/.test(t) && t.indexOf(HU.ret) > -1 && t.indexOf(HU.task) > -1 && !c.d.querySelector("#mcClass input") && !c.d.querySelector("#mcClass button"), t.slice(0, 300)); c.dom.window.close(); }
  /* (v1.9, K-2b) शिकायत वाला रास्ता */
  const ans = (c, v) => { c.w.prompt = m => { c.dialogs.push(String(m)); return v; }; };
  if (pg("center")) { const c = await openH(pg("center"), "hi"), t = txt(c, "clsList");
    ck("K2 केंद्र: चालू कक्षा पर शिकायत का बटन, शिकायत दर्ज हो तो नहीं", has(c, '[data-k1="abrep"][data-id="k1"]') && has(c, '[data-k1="abrep"][data-id="k2"]') && !has(c, '[data-k1="abrep"][data-id="k4"]') && !has(c, '[data-k1="abrep"][data-id="k3"]'));
    ck("K2 केंद्र: शिकायत, कारण और जवाब की आख़िरी तारीख़ दिखती है", /आपकी शिकायत दर्ज है:/.test(t) && t.indexOf(HU.hold) > -1 && /जवाब देने की आख़िरी तारीख़:/.test(t));
    ck("K2 केंद्र: निशान का बटन सिर्फ़ 7 दिन बीतने पर और जवाब न आने पर", has(c, '[data-k1="abconfirm"][data-id="k6"]') && c.d.querySelectorAll('[data-k1="abconfirm"]').length === 1 && /7 दिन में जवाब नहीं आया/.test(t));
    ck("K2 केंद्र: जवाब आ चुका हो तो जवाब दिखता है और फ़ैसला ACS का", t.indexOf(HU.ret) > -1 && /अब फ़ैसला ACS करेगा/.test(t) && c.d.querySelectorAll('[data-k1="abwd"]').length === 3);
    ck("K2 केंद्र: फ़ैसले के बटन यहाँ नहीं", !has(c, '[data-k1="abup"]') && !has(c, '[data-k1="abno"]') && !has(c, '[data-k1="abreply"]'));
    click(c, c.d.querySelector('[data-k1="abrep"][data-id="k1"]')); await settle(c);
    ck("K2 केंद्र: कारण न लिखा हो तो शिकायत server को नहीं जाती", !c.calls.some(x => x.name === "reportAbandon"));
    ans(c, HU.hold); click(c, c.d.querySelector('[data-k1="abrep"][data-id="k1"]')); await settle(c); await settle(c);
    const ra = c.calls.filter(x => x.name === "reportAbandon").pop();
    ck("K2 केंद्र: शिकायत server को सही खानों में जाती है", !!ra && ra.data.classId === "k1" && ra.data.reason === HU.hold, JSON.stringify(ra && ra.data));
    click(c, c.d.querySelector('[data-k1="abconfirm"][data-id="k6"]')); await settle(c); await settle(c);
    click(c, c.d.querySelector('[data-k1="abwd"][data-id="k4"]')); await settle(c); await settle(c);
    const cf = c.calls.filter(x => x.name === "confirmAbandon").pop(), wd = c.calls.filter(x => x.name === "withdrawAbandon").pop();
    ck("K2 केंद्र: निशान और वापसी server को जाते हैं", !!cf && cf.data.classId === "k6" && !!wd && wd.data.classId === "k4"); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi"), t = txt(c, "myClsList");
    ck("K2 शिक्षक: शिकायत और जवाब की आख़िरी तारीख़ दिखती है", /केंद्र ने शिकायत की है कि आप बिना सूचना आना बंद कर चुके हैं:/.test(t) && t.indexOf(HU.hold) > -1 && /जवाब देने की आख़िरी तारीख़:/.test(t));
    ck("K2 शिक्षक: जवाब का बटन सिर्फ़ खुली शिकायत पर और 7 दिन के भीतर", has(c, '[data-k1="abreply"][data-id="k4"]') && c.d.querySelectorAll('[data-k1="abreply"]').length === 1);
    ck("K2 शिक्षक: केंद्र के बटन यहाँ नहीं", !has(c, '[data-k1="abrep"]') && !has(c, '[data-k1="abwd"]') && !has(c, '[data-k1="abconfirm"]') && !has(c, '[data-k1="abup"]'));
    ans(c, HU.ret); click(c, c.d.querySelector('[data-k1="abreply"][data-id="k4"]')); await settle(c); await settle(c);
    const rp = c.calls.filter(x => x.name === "replyAbandon").pop();
    ck("K2 शिक्षक: जवाब server को सही खानों में जाता है", !!rp && rp.data.classId === "k4" && rp.data.reply === HU.ret, JSON.stringify(rp && rp.data)); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-abandon"]), t = txt(c, "abqList");
    ck("K2 " + who + ": पैनल काम-सूची में है", has(c, '#sideNav .si[data-go="pnl-abandon"]'));
    ck("K2 " + who + ": दोनों पक्ष और दोनों फ़ैसले दिखते हैं", /केंद्र की शिकायत:/.test(t) && /शिक्षक का जवाब:/.test(t) && t.indexOf(HU.hold) > -1 && t.indexOf(HU.ret) > -1 && has(c, '[data-k1="abup"][data-id="k5"]') && has(c, '[data-k1="abno"][data-id="k5"]'), t.slice(0, 200));
    click(c, c.d.querySelector('[data-k1="abup"]')); await settle(c);
    ck("K2 " + who + ": कारण न लिखा हो तो फ़ैसला server को नहीं जाता", !c.calls.some(x => x.name === "decideAbandon"));
    ans(c, HU.vnote); click(c, c.d.querySelector('[data-k1="abno"]')); await settle(c); await settle(c);
    const dc = c.calls.filter(x => x.name === "decideAbandon").pop();
    ck("K2 " + who + ": फ़ैसला server को सही खानों में जाता है", !!dc && dc.data.classId === "k5" && dc.data.uphold === false && dc.data.note === HU.vnote && /फ़ैसला दर्ज/.test(txt(c, "abqMsg")), JSON.stringify(dc && dc.data)); }
  for (const who of ["zonal", "regional", "center", "teacher"]) if (pg(who)) { const html = fs.readFileSync(path.join(ROOT, pg(who)), "utf8");
    ck("K2 " + who + ": फ़ैसले का पैनल इस घर में नहीं", html.indexOf('id="pnl-abandon"') < 0); }
  if (pg("student")) { const c = await openH(pg("student"), "hi"), t = txt(c, "mcClass");
    ck("K1 विद्यार्थी: शिक्षक का नाम, बैच और समय", /मेरी कक्षा:/.test(t) && /शिक्षक:/.test(t) && t.indexOf(HU.student) > -1 && /16:00 - 17:30/.test(t) && /सोमवार/.test(t), t.slice(0, 200));
    ck("K1 विद्यार्थी: शिक्षक तय न हो, या इंतज़ार में हो, तो साफ़ वाक्य", /शिक्षक अभी तय नहीं हुए/.test(t) && /अभी आप इंतज़ार में हैं/.test(t));
    ck("K1 विद्यार्थी: कोई बटन नहीं, कोई ACS-ID नहीं", !c.d.querySelector("#mcClass [data-k1]") && !/ACS-TE-/.test(t)); }
  if (pg("workshop")) { const c = await openH(pg("workshop"), "hi");
    ck("K1 वर्कशॉप: seat का संकेत 5 से 10", (c.d.getElementById("ofSeats") || { placeholder: "" }).placeholder === "5 से 10" && /कुल 10 शागिर्द/.test(c.d.getElementById("pnl-class").textContent)); }
  if (pg("center")) { const c = await openH(pg("center"), "hi", "base", ["pnl-enroll"]);
    c.handlers.listMyClasses = () => ({});   /* server का जवाब ख़ाली */
    click(c, c.d.querySelector('#sideNav .si[data-go="pnl-class"]')); await settle(c); await settle(c);
    ck("K1 केंद्र (server का जवाब ख़ाली): साफ़ वाक्य, टूटन नहीं", /अभी कोई घोषित कोर्स नहीं/.test(txt(c, "clsList")), txt(c, "clsList").slice(0, 120));
    c.handlers.listMyClasses = () => { const e = new Error("यह कक्षा मिली नहीं"); throw e; };
    click(c, c.d.querySelector('#sideNav .si[data-go="pnl-myid"]') || c.d.querySelector('#sideNav .si')); await settle(c);
    click(c, c.d.querySelector('#sideNav .si[data-go="pnl-class"]')); await settle(c); await settle(c);
    ck("K1 केंद्र (server की त्रुटि): कारण दिखता है", /नहीं खुला: यह कक्षा मिली नहीं/.test(txt(c, "clsList")), txt(c, "clsList").slice(0, 120)); }
}
/* (v2.8, P-1b · 18-Nov-2026) शिक्षक का paid online कोर्स: शिक्षक/उस्ताद का पैनल और Founder/Admin की जाँच। server: class_server.js v1.8 */
async function ocChecks(pages) {
  const has = (c, sel) => !!c.d.querySelector(sel), txt = (c, id) => { const e = c.d.getElementById(id); return e ? e.textContent : ""; };
  const pg = n => pages.find(f => f.split("/")[1] === n);
  const ans = (c, v) => { c.w.prompt = m => { c.dialogs.push(String(m)); return v; }; };
  const UV = Object.keys(HU).map(k => HU[k]).concat([NAME_HI, "सीता देवी"]);
  const clean = t => { UV.forEach(v => { t = t.split(v).join(""); }); return t; };
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-online"]), q = sel => c.d.querySelector(sel), t = txt(c, "ocList");
    ck("O1 शिक्षक: पैनल काम-सूची में है, पुराना ख़ाली \"Live class\" पैनल नहीं", has(c, '#sideNav .si[data-go="pnl-online"]') && !has(c, "#pnl-live"));
    ck("O1 शिक्षक: चारों हालतें, नाम, दिन, समय, तारीख़ और फ़ीस दिखते हैं", has(c, ".k1card.st-draft") && has(c, ".k1card.st-review") && has(c, ".k1card.st-returned") && has(c, ".k1card.st-approved")
      && t.indexOf(HU.ocTitle) > -1 && /सोमवार/.test(t) && /18:00 - 19:00/.test(t) && /01-12-2026/.test(t) && /29-01-2027/.test(t) && /₹500/.test(t) && t.indexOf(HU.ocLang) > -1, t.slice(0, 200));
    ck("O1 शिक्षक: लौटाए गए कोर्स पर ACS का कारण", /ACS ने यह कोर्स लौटाया है। कारण:/.test(t) && t.indexOf(HU.ret) > -1);
    ck("O1 शिक्षक: बटन हालत के हिसाब से (मसौदा और लौटाया: भेजें, बदलें; जाँच में: वापस लें; मंज़ूर: सिर्फ़ कक्षाएँ, विद्यार्थी-सूची, रद्द)",
      has(c, '[data-oc="send"][data-id="oc1"]') && has(c, '[data-oc="edit"][data-id="oc3"]') && has(c, '[data-oc="drop"][data-id="oc1"]') && has(c, '[data-oc="back"][data-id="oc2"]')
      && !has(c, '[data-oc="send"][data-id="oc2"]') && !c.d.querySelector('#ocList .k1card.st-approved [data-oc]:not([data-oc="cls"]):not([data-oc="lrn"]):not([data-oc="ccl"])') && !has(c, '#ocList [data-oc="ok"]') && !has(c, '#ocList [data-oc="ret"]'));
    ck("O1 शिक्षक: अपने कार्ड पर ACS-ID या फ़ोन नहीं", !/ACS-TE-|9\d{9}|@/.test(t));
    click(c, q('[data-oc="new"]')); await settle(c);
    ck("O1 शिक्षक: नए कोर्स का फ़ॉर्म पूरा खुला", ["ocTitle", "ocAbout", "ocLang", "ocClasses", "ocFrom", "ocTo", "ocStart", "ocFee"].every(id => has(c, "#" + id)) && c.d.querySelectorAll(".ocday").length === 7);
    click(c, q('[data-oc="save"]')); await settle(c);
    ck("O1 शिक्षक: नाम न लिखा हो तो server को कुछ नहीं जाता", !c.calls.some(x => x.name === "saveOnlineCourse") && /कोर्स का नाम लिखें/.test(txt(c, "ocMsg")));
    q("#ocTitle").value = HU.ocTitle; q("#ocAbout").value = HU.ocAbout; q("#ocLang").value = HU.ocLang; q("#ocClasses").value = "24";
    q('.ocday[value="1"]').checked = true; q('.ocday[value="5"]').checked = true; q("#ocFrom").value = "18:00"; q("#ocTo").value = "19:00"; q("#ocStart").value = "2026-12-01"; q("#ocFee").value = "500";
    click(c, q('[data-oc="save"]')); await settle(c); await settle(c);
    const sv = c.calls.filter(x => x.name === "saveOnlineCourse").pop();
    ck("O1 शिक्षक: मसौदा सही खानों में server को जाता है", !!sv && sv.data.title === HU.ocTitle && sv.data.classes === 24 && sv.data.fee === 500 && sv.data.days.join() === "1,5"
      && sv.data.from === "18:00" && sv.data.startDate === "2026-12-01" && sv.data.courseId === undefined && /मसौदा सहेजा गया/.test(txt(c, "ocMsg")), JSON.stringify(sv && sv.data));
    click(c, q('[data-oc="edit"][data-id="oc3"]')); await settle(c);
    ck("O1 शिक्षक: बदलने का फ़ॉर्म पुरानी बातों से भरा खुलता है", (q("#ocTitle") || {}).value === HU.ocTitle && (q("#ocFee") || {}).value === "500" && c.d.querySelectorAll(".ocday:checked").length === 3);
    click(c, q('[data-oc="save"]')); await settle(c); await settle(c);
    ck("O1 शिक्षक: बदला हुआ मसौदा उसी कोर्स पर जाता है", (c.calls.filter(x => x.name === "saveOnlineCourse").pop() || { data: {} }).data.courseId === "oc3");
    c.confirmAnswer = false; click(c, q('[data-oc="send"][data-id="oc1"]')); await settle(c);
    ck("O1 शिक्षक: पुष्टि पर \"नहीं\" तो जाँच को नहीं जाता", !c.calls.some(x => x.name === "submitOnlineCourse"));
    c.confirmAnswer = true; click(c, q('[data-oc="send"][data-id="oc1"]')); await settle(c); await settle(c);
    const sb = c.calls.filter(x => x.name === "submitOnlineCourse").pop();
    ck("O1 शिक्षक: जाँच को भेजना और वापस लेना server को जाते हैं", !!sb && sb.data.courseId === "oc1" && /जाँच के लिए भेजा गया/.test(txt(c, "ocMsg")));
    click(c, q('[data-oc="back"][data-id="oc2"]')); await settle(c); await settle(c);
    ck("O1 शिक्षक: जाँच से वापस लेना", (c.calls.filter(x => x.name === "withdrawOnlineCourse").pop() || { data: {} }).data.courseId === "oc2");
    c.handlers.listMyOnlineCourses = () => ({ allowed: false, items: [] }); click(c, q('#sideNav .si[data-go="pnl-help"]') || q('#sideNav .si')); await settle(c);
    click(c, q('#sideNav .si[data-go="pnl-online"]')); await settle(c); await settle(c);
    ck("O1 शिक्षक (खाता स्वीकृत नहीं): साफ़ वाक्य, कोई बटन नहीं", /स्वीकृत होने के बाद/.test(txt(c, "ocList")) && !has(c, "#ocList [data-oc]"));
    c.dom.window.close(); }
  if (pg("ustad")) { const html = fs.readFileSync(path.join(ROOT, pg("ustad")), "utf8");
    ck("O1 उस्ताद: \"मेरे online कोर्स\" पैनल है", html.indexOf('id="pnl-online"') > -1 && html.indexOf('id="ocList"') > -1); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "en", "data", ["pnl-online"]);
    const L = clean(txt(c, "pnl-online")).match(/[\u0900-\u097F]+/g) || [];
    ck("O1 शिक्षक English: पैनल में हिंदी शून्य (उपयोगकर्ता का लिखा छोड़कर)", L.length === 0, L.slice(0, 8).join(" ‖ "));
    click(c, c.d.querySelector('[data-oc="new"]')); await settle(c); await settle(c);
    const F = clean(txt(c, "pnl-online")).match(/[\u0900-\u097F]+/g) || [];
    ck("O1 शिक्षक English: फ़ॉर्म में हिंदी शून्य", F.length === 0, F.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel), t = txt(c, "ocqList");
    ck("O2 " + who + ": जाँच का पैनल काम-सूची में है", has(c, '#sideNav .si[data-go="pnl-ocq"]'));
    ck("O2 " + who + ": शिक्षक का नाम, ACS-ID और पूरा प्रस्ताव दिखता है; फ़ोन या email नहीं", t.indexOf(HU.student) > -1 && /ACS-TE-2026-222222/.test(t) && t.indexOf(HU.ocAbout) > -1 && /₹500/.test(t) && !/9\d{9}|@/.test(t));
    ck("O2 " + who + ": मंज़ूर (भरा हरा) और लौटाएँ (लाल रेखा) के बटन", has(c, '.abtn.ok[data-oc="ok"][data-id="oc2"]') && has(c, '.abtn.no[data-oc="ret"][data-id="oc2"]'));
    ans(c, null); click(c, q('[data-oc="ret"]')); await settle(c);
    ck("O2 " + who + ": कारण न लिखा हो तो लौटाना server को नहीं जाता", !c.calls.some(x => x.name === "decideOnlineCourse"));
    ans(c, HU.vnote); click(c, q('[data-oc="ret"]')); await settle(c); await settle(c);
    const rt = c.calls.filter(x => x.name === "decideOnlineCourse").pop();
    ck("O2 " + who + ": लौटाना कारण के साथ server को जाता है", !!rt && rt.data.courseId === "oc2" && rt.data.approve === false && rt.data.reason === HU.vnote && /कारण के साथ लौटाया गया/.test(txt(c, "ocqMsg")), JSON.stringify(rt && rt.data));
    c.confirmAnswer = true; click(c, q('[data-oc="ok"]')); await settle(c); await settle(c);
    const ap = c.calls.filter(x => x.name === "decideOnlineCourse").pop();
    ck("O2 " + who + ": मंज़ूरी server को जाती है", !!ap && ap.data.approve === true && /कोर्स मंज़ूर हुआ/.test(txt(c, "ocqMsg")));
    click(c, q('[data-oc="qs"][data-v="approved"]')); await settle(c); await settle(c);
    const ls = c.calls.filter(x => x.name === "listOnlineCourseQueue").pop();
    ck("O2 " + who + ": \"मंज़ूर\" वाली सूची खुलती है, वहाँ फ़ैसले के बटन नहीं", !!ls && ls.data.status === "approved" && !has(c, '[data-oc="ok"]') && has(c, '.k1m.on[data-v="approved"]'));
    c.dom.window.close(); }
  for (const who of ["zonal", "regional", "center", "student", "teacher"]) if (pg(who)) { const html = fs.readFileSync(path.join(ROOT, pg(who)), "utf8");
    ck("O2 " + who + ": जाँच का पैनल इस घर में नहीं", html.indexOf('id="pnl-ocq"') < 0); }
  for (const who of ["center", "student", "founder", "admin"]) if (pg(who)) { const html = fs.readFileSync(path.join(ROOT, pg(who)), "utf8");
    ck("O1 " + who + ": शिक्षक वाला पैनल इस घर में नहीं", html.indexOf('id="pnl-online"') < 0); }
  /* (v2.9, P-2b) कक्षाएँ और YouTube कड़ी */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-online"]), q = sel => c.d.querySelector(sel), qa = sel => Array.from(c.d.querySelectorAll(sel));
    ck("O4 शिक्षक: कक्षाओं का बटन सिर्फ़ मंज़ूर कोर्स पर", qa('#ocList [data-oc="cls"]').length === 1 && has(c, '#ocList .k1card.st-approved [data-oc="cls"]'));
    click(c, q('[data-oc="cls"]')); await settle(c); await settle(c); let t = txt(c, "ocList");
    ck("O4 शिक्षक: कक्षा-सूची खुली: गिनती, अभी चालू, पहली 6 आने वाली, बीती कक्षाएँ मुड़ी हुई", /कुल कक्षाएँ:\s*11/.test(t) && /कड़ी लगी:\s*3/.test(t) && /अभी चालू/.test(t)
      && qa(".oclink").length === 6 && has(c, '[data-oc="lmore"]') && has(c, "details.ocpast") && !q("details.ocpast").open && /बीती कक्षाएँ\s*\(2\)/.test(t), t.slice(0, 300));
    ck("O4 शिक्षक: लगी कड़ी दिखती है और नई खिड़की में खुलती है; बीती कक्षा में डालने का खाना नहीं", has(c, '.oclk a[target="_blank"][href*="youtube.com"]') && !c.d.querySelector("details.ocpast .oclink")
      && has(c, '[data-oc="lclr"][data-n="3"]') && !has(c, '[data-oc="lclr"][data-n="4"]'));
    click(c, q('[data-oc="lmore"]')); await settle(c);
    ck("O4 शिक्षक: \"सब दिखाएँ\" से सब 9 आने वाली कक्षाएँ", qa(".oclink").length === 9 && !has(c, '[data-oc="lmore"]'));
    q('.oclink[data-n="4"]').value = "https://youtu.be/AbCdEfGhIjK"; q('.oclink[data-n="6"]').value = "लिखा हुआ";
    click(c, q('[data-oc="lset"][data-n="4"]')); await settle(c); await settle(c);
    const ls = c.calls.filter(x => x.name === "setOnlineClassLink").pop();
    ck("O4 शिक्षक: कड़ी सही खानों में server को जाती है; दूसरे खाने में लिखी बात बची रहती है", !!ls && ls.data.courseId === "oc4" && ls.data.classNo === 4 && ls.data.link === "https://youtu.be/AbCdEfGhIjK"
      && /कड़ी सहेजी गई/.test(txt(c, "ocMsg")) && (q('.oclink[data-n="6"]') || {}).value === "लिखा हुआ", JSON.stringify(ls && ls.data));
    q('.oclink[data-n="7"]').value = ""; click(c, q('[data-oc="lset"][data-n="7"]')); await settle(c);
    ck("O4 शिक्षक: ख़ाली कड़ी server को नहीं जाती", c.calls.filter(x => x.name === "setOnlineClassLink").length === 1 && /YouTube की कड़ी डालें/.test(txt(c, "ocMsg")));
    c.confirmAnswer = false; click(c, q('[data-oc="lclr"][data-n="3"]')); await settle(c);
    ck("O4 शिक्षक: कड़ी हटाने पर पुष्टि; \"नहीं\" तो कुछ नहीं", c.calls.filter(x => x.name === "setOnlineClassLink").length === 1);
    c.confirmAnswer = true; click(c, q('[data-oc="lclr"][data-n="3"]')); await settle(c); await settle(c);
    const lc = c.calls.filter(x => x.name === "setOnlineClassLink").pop();
    ck("O4 शिक्षक: कड़ी हटाना server को ख़ाली कड़ी के साथ जाता है", lc.data.classNo === 3 && lc.data.link === "" && /कड़ी हटा दी गई/.test(txt(c, "ocMsg")));
    click(c, q('[data-oc="cls"]')); await settle(c);
    ck("O4 शिक्षक: दोबारा दबाने पर सूची बंद", !has(c, ".oclink") && !has(c, "details.ocpast"));
    c.dom.window.close(); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "en", "data", ["pnl-online"]);
    click(c, c.d.querySelector('[data-oc="cls"]')); await settle(c); await settle(c); const dd = c.d.querySelector("details.ocpast"); if (dd) dd.open = true;
    const L = clean(txt(c, "pnl-online")).match(/[\u0900-\u097F]+/g) || [];
    ck("O4 शिक्षक English: कक्षा-सूची में हिंदी शून्य", L.length === 0 && /Unlisted/.test(txt(c, "pnl-online")), L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="qs"][data-v="approved"]')); await settle(c); await settle(c);
    click(c, q('#ocqList [data-oc="cls"]')); await settle(c); await settle(c);
    ck("O5 " + who + ": मंज़ूर कोर्स की कक्षाएँ और कड़ियाँ दिखती हैं, बदलने का खाना नहीं", /कुल कक्षाएँ:\s*11/.test(txt(c, "ocqList")) && has(c, '#ocqList .oclk a') && !has(c, "#ocqList .oclink") && !has(c, '#ocqList [data-oc="lset"]'));
    c.dom.window.close(); }
  /* (v3.0, P-3b) विद्यार्थी का पर्दा: मेरे कोर्स, खुले कोर्स, जुड़ना, कक्षा खोलना, छोड़ना; और खाता-बही */
  for (const who of ["student", "jobseeker", "entrepreneur"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-olearn"]), q = sel => c.d.querySelector(sel);
    const tm = txt(c, "olMine"), tc = txt(c, "olCat");
    ck("O6 " + who + ": पैनल काम-सूची में; पहले भुगतान का मिलान होता है", has(c, '#sideNav .si[data-go="pnl-olearn"]') && c.calls.some(x => x.name === "syncOnlinePayments") && c.calls.some(x => x.name === "myOnlineCourses") && c.calls.some(x => x.name === "listOnlineCatalog"));
    if (who !== "student") { c.dom.window.close(); continue; }
    ck("O6 विद्यार्थी: मेरा कोर्स: शिक्षक, दिन, कक्षाएँ, खोली हुई, अभी चालू कक्षा का बटन", /✅ जुड़े हैं/.test(tm) && tm.indexOf(HU.student) > -1 && /कक्षाएँ हो चुकीं:\s*2 \/ 24/.test(tm) && /आपने खोलीं:\s*1/.test(tm)
      && /कक्षा अभी चालू है/.test(tm) && has(c, '[data-ol="open"][data-id="oc4"][data-n="3"]'), tm.slice(0, 300));
    ck("O6 विद्यार्थी: छोड़ा हुआ कोर्स: वापसी की रक़म और हालत; अगली कक्षा का समय", /↩ छोड़ दिया/.test(tm) && /वापसी:\s*₹270/.test(tm) && /Razorpay से भेज दी गई/.test(tm) && /अगली कक्षा:/.test(tm) && /15 मिनट पहले यहीं खुलेगी/.test(tm));
    ck("O6 विद्यार्थी: छोड़ने का बटन सिर्फ़ उस कोर्स पर जिसकी पहली कक्षा बाक़ी है, \"और विकल्प\" के भीतर", has(c, 'details.k1more [data-ol="leave"][data-id="oc8"]') && !has(c, '[data-ol="leave"][data-id="oc4"]'));
    ck("O6 विद्यार्थी: खुले कोर्स: फ़ीस, शिक्षक, जुड़े विद्यार्थी; जुड़ा हुआ कोर्स बिना बटन", /₹500/.test(tc) && /जुड़े विद्यार्थी:\s*12/.test(tc) && has(c, '[data-ol="buy"][data-id="oc9"]') && !has(c, '[data-ol="buy"][data-id="oc8"]') && /आप इस कोर्स से जुड़े हैं/.test(tc));
    click(c, q('[data-ol="open"]')); await settle(c); await settle(c);
    const op = c.calls.filter(x => x.name === "openOnlineClass").pop();
    ck("O6 विद्यार्थी: कक्षा खोलना: server से कड़ी, फिर YouTube का बटन (नई खिड़की)", !!op && op.data.courseId === "oc4" && op.data.classNo === 3 && has(c, '#olMine a[target="_blank"][href*="youtube.com/watch"]') && /कड़ी तैयार है/.test(txt(c, "olMsg")));
    c.confirmAnswer = false; click(c, q('[data-ol="buy"]')); await settle(c);
    ck("O6 विद्यार्थी: जुड़ने से पहले वापसी-नियम की पुष्टि; \"नहीं\" तो कुछ नहीं", !c.calls.some(x => x.name === "createOnlineCourseOrder") && c.dialogs.some(m => /90 प्रतिशत फ़ीस वापस/.test(m)));
    let rzOpt = null; c.w.Razorpay = function (o) { rzOpt = o; this.open = () => { setTimeout(() => o.handler({ razorpay_order_id: o.order_id, razorpay_payment_id: "pay_X1", razorpay_signature: "sig_X1" }), 0); }; };
    c.confirmAnswer = true; click(c, q('[data-ol="buy"]')); await settle(c); await settle(c); await settle(c); await settle(c);
    const co = c.calls.filter(x => x.name === "createOnlineCourseOrder").pop(), vv = c.calls.filter(x => x.name === "verifyOnlineCoursePayment").pop();
    ck("O6 विद्यार्थी: जुड़ना: order (रक़म browser नहीं भेजता), Razorpay, फिर हस्ताक्षर की जाँच", !!co && co.data.courseId === "oc9" && co.data.amount === undefined && co.data.fee === undefined && !!rzOpt && rzOpt.order_id === "order_OC1"
      && rzOpt.key === "rzp_test_x" && !!vv && vv.data.razorpay_payment_id === "pay_X1" && vv.data.razorpay_signature === "sig_X1" && /आप कोर्स से जुड़ गए/.test(txt(c, "olMsg")), JSON.stringify(co && co.data));
    c.confirmAnswer = true; click(c, q('[data-ol="leave"]')); await settle(c); await settle(c);
    const wd = c.calls.filter(x => x.name === "withdrawOnlineEnrollment").pop();
    ck("O6 विद्यार्थी: छोड़ना: पुष्टि, फिर server; वापसी का संदेश", !!wd && wd.data.courseId === "oc8" && /कोर्स छोड़ दिया/.test(txt(c, "olMsg")));
    click(c, q('#sideNav .si[data-go="pnl-pay"]')); await settle(c); await settle(c); const lg = txt(c, "ledgerList");
    ck("O7 खाता-बही: हर भुगतान अपने नाम से (online कोर्स, करियर टेस्ट का चांस, बैज); दोहरा भुगतान लौटाया दिखता है", /शिक्षक का online कोर्स/.test(lg) && /Spoken English/.test(lg) && /करियर टेस्ट का चांस/.test(lg)
      && /दोहरा भुगतान: पूरी राशि वापस/.test(lg) && (lg.match(/Verified Badge/g) || []).length === 2, lg.slice(0, 400));
    c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "en", "data", ["pnl-olearn"]);
    const L = clean(txt(c, "pnl-olearn")).match(/[\u0900-\u097F]+/g) || [];
    ck("O6 विद्यार्थी English: पैनल में हिंदी शून्य", L.length === 0, L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="qs"][data-v="refund"]')); await settle(c); await settle(c); const t = txt(c, "ocqList");
    ck("O8 " + who + ": \"वापसी बाक़ी\" सूची: विद्यार्थी, रक़म, order", c.calls.some(x => x.name === "listOnlineRefundsDue") && /लौटानी है:\s*₹450/.test(t) && /order_A9/.test(t) && has(c, '[data-oc="rdone"][data-id="oc4_uS3"]'));
    c.w.prompt = () => "rfnd_ABC123"; click(c, q('[data-oc="rdone"]')); await settle(c); await settle(c);
    const mk = c.calls.filter(x => x.name === "markOnlineRefundPaid").pop();
    ck("O8 " + who + ": वापसी दर्ज करना server को नंबर के साथ जाता है", !!mk && mk.data.enrollmentId === "oc4_uS3" && mk.data.note === "rfnd_ABC123" && /वापसी दर्ज हुई/.test(txt(c, "ocqMsg")));
    c.dom.window.close(); }
  for (const who of ["teacher", "center", "founder", "admin"]) if (pg(who)) { const html = fs.readFileSync(path.join(ROOT, pg(who)), "utf8");
    ck("O6 " + who + ": विद्यार्थी वाला पैनल इस घर में नहीं", html.indexOf('id="pnl-olearn"') < 0); }
  /* (v3.1, P-5b) विद्यार्थी-सूची, कोर्स रद्द करना, ACS की "रद्द" सूची, वापसी आगे बढ़ाना, विद्यार्थी के कार्ड पर रद्द कोर्स */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-online"]), q = sel => c.d.querySelector(sel), qa = sel => Array.from(c.d.querySelectorAll(sel));
    const cc = q("#ocList .k1card.st-cancelled"), ct = cc ? cc.textContent : "";
    ck("O9 शिक्षक: रद्द कोर्स: कारण, किसने, पूरी फ़ीस वापस; कक्षा या रद्द का बटन नहीं, विद्यार्थी-सूची है", !!cc && /यह कोर्स रद्द हुआ। कारण:/.test(ct) && ct.indexOf(HU.ccl) > -1 && /शिक्षक ने रद्द किया/.test(ct)
      && /18-11-2026/.test(ct) && /पूरी फ़ीस \(100 प्रतिशत\)/.test(ct) && !cc.querySelector('[data-oc="cls"]') && !cc.querySelector('[data-oc="ccl"]') && !!cc.querySelector('[data-oc="lrn"]'), ct.slice(0, 300));
    ck("O9 शिक्षक: मंज़ूर कोर्स पर रद्द का बटन \"और विकल्प\" के भीतर, लाल रेखा वाला", has(c, '.k1card.st-approved details.k1more .abtn.dg[data-oc="ccl"][data-id="oc4"]') && qa('[data-oc="ccl"]').length === 1);
    click(c, q('[data-oc="lrn"][data-id="oc4"]')); await settle(c); await settle(c);
    const lc = c.calls.filter(x => x.name === "listOnlineLearners").pop(), pane = q(".ocln"), pt = pane ? pane.textContent : "";
    ck("O9 शिक्षक: विद्यार्थी-सूची: गिनती, नाम, ACS नंबर, भूमिका, खोली कक्षाएँ; फ़ोन, email या फ़ीस नहीं", !!lc && lc.data.courseId === "oc4" && lc.data.offset === 0 && /कुल विद्यार्थी:\s*53/.test(pt) && /अभी जुड़े:\s*51/.test(pt)
      && /ACS-2026-999998/.test(pt) && /💼 नौकरी-इच्छुक/.test(pt) && /🏭 उद्यमी/.test(pt) && /🎓 विद्यार्थी/.test(pt) && /↩ छोड़ दिया/.test(pt) && /खोली कक्षाएँ:\s*2/.test(pt) && /12-11-2026/.test(pt) && !/9\d{9}|@|₹/.test(pt), pt.slice(0, 300));
    click(c, q('[data-oc="lrmore"]')); await settle(c); await settle(c);
    const lc2 = c.calls.filter(x => x.name === "listOnlineLearners").pop();
    ck("O9 शिक्षक: \"और विद्यार्थी दिखाएँ\" अगली खेप माँगता है और सूची में जोड़ता है", lc2.data.offset === 3 && qa(".ocln .ocs").length === 6);
    click(c, q('[data-oc="lrn"][data-id="oc4"]')); await settle(c);
    ck("O9 शिक्षक: दोबारा दबाने पर सूची बंद", !has(c, ".ocln"));
    ans(c, null); click(c, q('[data-oc="ccl"]')); await settle(c);
    ans(c, "नहीं"); click(c, q('[data-oc="ccl"]')); await settle(c);
    ck("O9 शिक्षक: कारण न लिखा या बहुत छोटा: रद्द server को नहीं जाता", !c.calls.some(x => x.name === "cancelOnlineCourse") && /कम से कम 5 अक्षर/.test(txt(c, "ocMsg")));
    ans(c, HU.ccl); c.confirmAnswer = false; click(c, q('[data-oc="ccl"]')); await settle(c);
    ck("O9 शिक्षक: पक्का करने पर \"नहीं\" तो रद्द नहीं", !c.calls.some(x => x.name === "cancelOnlineCourse") && c.dialogs.some(m => /पूरी फ़ीस वापस जाएगी/.test(m)));
    c.confirmAnswer = true; click(c, q('[data-oc="ccl"]')); await settle(c); await settle(c);
    const cx = c.calls.filter(x => x.name === "cancelOnlineCourse").pop();
    ck("O9 शिक्षक: रद्द करना कारण के साथ server को जाता है; संदेश", !!cx && cx.data.courseId === "oc4" && cx.data.reason === HU.ccl && /कोर्स रद्द हुआ/.test(txt(c, "ocMsg")), JSON.stringify(cx && cx.data));
    c.dom.window.close(); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "en", "data", ["pnl-online"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="lrn"][data-id="oc4"]')); await settle(c); await settle(c); const dd = q('.k1card.st-approved details.k1more'); if (dd) dd.open = true;
    const L = clean(txt(c, "pnl-online")).match(/[ऀ-ॿ]+/g) || [];
    ck("O9 शिक्षक English: रद्द कोर्स और विद्यार्थी-सूची में हिंदी शून्य", L.length === 0 && !!q(".ocln"), L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    ck("O9 " + who + ": छह खाने, \"⛔ रद्द\" और \"🚩 शिकायतें\" भी", c.d.querySelectorAll(".k1seg.oc6 .k1m").length === 6 && has(c, '[data-oc="qs"][data-v="cancelled"]') && has(c, '[data-oc="qs"][data-v="msgk"]'));
    click(c, q('[data-oc="qs"][data-v="approved"]')); await settle(c); await settle(c);
    ck("O9 " + who + ": मंज़ूर कोर्स पर विद्यार्थी-सूची और रद्द के बटन", has(c, '#ocqList [data-oc="lrn"][data-id="oc2"]') && has(c, '#ocqList details.k1more [data-oc="ccl"][data-id="oc2"]'));
    ans(c, HU.ccl); c.confirmAnswer = true; click(c, q('#ocqList [data-oc="ccl"]')); await settle(c); await settle(c);
    const cx = c.calls.filter(x => x.name === "cancelOnlineCourse").pop();
    ck("O9 " + who + ": ACS भी कारण के साथ रद्द करता है; संदेश ACS वाले डिब्बे में", !!cx && cx.data.courseId === "oc2" && cx.data.reason === HU.ccl && /कोर्स रद्द हुआ/.test(txt(c, "ocqMsg")));
    click(c, q('[data-oc="qs"][data-v="cancelled"]')); await settle(c); await settle(c);
    const ls = c.calls.filter(x => x.name === "listOnlineCourseQueue").pop(), t = txt(c, "ocqList");
    ck("O9 " + who + ": \"रद्द\" सूची: कारण और \"ACS ने रद्द किया\"", !!ls && ls.data.status === "cancelled" && t.indexOf(HU.ccl) > -1 && /ACS ने रद्द किया/.test(t) && !has(c, '#ocqList [data-oc="ccl"]'));
    click(c, q('[data-oc="qs"][data-v="refund"]')); await settle(c); await settle(c); const tr = txt(c, "ocqList");
    ck("O9 " + who + ": वापसी-सूची: अटकी वापसी की पहचान, रद्द से 100 प्रतिशत, छोड़ने से 90 प्रतिशत", /⚠️ वापसी अटकी/.test(tr) && /बीच में अटकी है/.test(tr) && /कोर्स रद्द: पूरी फ़ीस \(100 प्रतिशत\)/.test(tr) && /विद्यार्थी ने छोड़ा: 90 प्रतिशत/.test(tr), tr.slice(0, 300));
    click(c, q('[data-oc="rrun"]')); await settle(c); await settle(c);
    ck("O9 " + who + ": \"वापसी आगे बढ़ाएँ\" server को जाता है; कुछ बाक़ी हों तो फिर दबाने को कहता है", c.calls.some(x => x.name === "runOnlineRefunds") && /बटन फिर दबाएँ/.test(txt(c, "ocqMsg")));
    c.dom.window.close(); }
  if (pg("founder")) { const c = await openH(pg("founder"), "en", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="qs"][data-v="cancelled"]')); await settle(c); await settle(c);
    let L = clean(txt(c, "pnl-ocq")).match(/[ऀ-ॿ]+/g) || [];
    click(c, q('[data-oc="qs"][data-v="refund"]')); await settle(c); await settle(c); click(c, q('[data-oc="rrun"]')); await settle(c); await settle(c);
    L = L.concat(clean(txt(c, "pnl-ocq")).match(/[ऀ-ॿ]+/g) || []);
    ck("O9 founder English: रद्द सूची, वापसी-सूची और संदेश में हिंदी शून्य", L.length === 0, L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "data", ["pnl-olearn"]);
    const cc = Array.from(c.d.querySelectorAll("#olMine .k1card")).find(x => /कोर्स रद्द/.test(x.textContent)), ct = cc ? cc.textContent : "";
    ck("O9 विद्यार्थी: रद्द कोर्स: कारण, पूरी फ़ीस ₹500 वापस, वापसी की हालत; कोई बटन नहीं", !!cc && ct.indexOf(HU.ccl) > -1 && /आपकी पूरी फ़ीस वापस:\s*₹500/.test(ct) && /वापसी हो रही है/.test(ct) && !cc.querySelector("[data-ol]"), ct.slice(0, 300));
    c.dom.window.close(); }
  /* (v3.2, P-6b) निजी संदेश: शिक्षक की बातचीत, विद्यार्थी का अभिभावक-email और शिकायत, ACS की "🚩 शिकायतें" */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-omsg"]), q = sel => c.d.querySelector(sel), qa = sel => Array.from(c.d.querySelectorAll(sel));
    const lt = txt(c, "omList");
    ck("O10 शिक्षक: संदेश-सूची: नाम, कोर्स, ACS नंबर, नए संदेश 2; अभिभावक-email का डिब्बा शिक्षक को नहीं", /नए संदेश:\s*2/.test(lt) && lt.indexOf(HU.msg) > -1 && /ACS-2026-999999/.test(lt) && !has(c, "#omGuard .omg") && /विद्यार्थी-सूची/.test(lt), lt.slice(0, 300));
    click(c, q('[data-om="open"][data-id="oc4"]')); await settle(c); await settle(c);
    const oc = c.calls.filter(x => x.name === "openThread").pop(), th = txt(c, "omThread");
    ck("O10 शिक्षक: बातचीत खुली: विद्यार्थी के ACS नंबर से; बुलबुले, अभिभावक की प्रति की हालत, लिखने का डिब्बा", !!oc && oc.data.courseId === "oc4" && oc.data.regNo === "ACS-2026-999999" && qa("#omThread .omb").length === 2
      && qa("#omThread .omb.me").length === 1 && /अभिभावक को प्रति गई/.test(th) && /अभिभावक को प्रति बाक़ी/.test(th) && /पुराने संदेश दिखाएँ/.test(th) && has(c, "#omText") && has(c, '[data-om="send"]') && !has(c, '[data-om="rep"]'), th.slice(0, 300));
    click(c, q('[data-om="send"]')); await settle(c);
    ck("O10 शिक्षक: ख़ाली संदेश server को नहीं जाता", !c.calls.some(x => x.name === "sendMessage") && /पहले संदेश लिखें/.test(txt(c, "omMsg")));
    q("#omText").value = HU.msg; click(c, q('[data-om="send"]')); await settle(c); await settle(c); await settle(c);
    const sm = c.calls.filter(x => x.name === "sendMessage").pop();
    ck("O10 शिक्षक: संदेश ACS नंबर के साथ server को जाता है; अभिभावक को प्रति का संदेश", !!sm && sm.data.courseId === "oc4" && sm.data.regNo === "ACS-2026-999999" && sm.data.text === HU.msg && /अभिभावक को प्रति भी गई/.test(txt(c, "omMsg")), JSON.stringify(sm && sm.data));
    click(c, q('[data-om="more"]')); await settle(c); await settle(c);
    ck("O10 शिक्षक: \"पुराने संदेश\" आगे की खेप माँगता है", c.calls.filter(x => x.name === "openThread").pop().data.more === 2);
    click(c, q('[data-om="close"]')); await settle(c);
    ck("O10 शिक्षक: बातचीत बंद करने पर डिब्बा ख़ाली", !has(c, "#omTh"));
    c.dom.window.close(); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-online"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="lrn"][data-id="oc4"]')); await settle(c); await settle(c);
    const mb = Array.from(c.d.querySelectorAll('.ocln [data-oc="msg"]'));
    ck("O10 शिक्षक: विद्यार्थी-सूची में हर जुड़े विद्यार्थी पर \"✉️ संदेश\"; छोड़ चुके पर नहीं", mb.length === 2 && mb.every(b => b.getAttribute("data-id") === "oc4") && !mb.some(b => b.getAttribute("data-r") === "ACS-2026-999998"));
    click(c, mb[0]); await settle(c); await settle(c); await settle(c);
    const oc = c.calls.filter(x => x.name === "openThread").pop();
    ck("O10 शिक्षक: सूची से सीधे \"✉️ संदेश\" पैनल में उसी विद्यार्थी की बातचीत", c.d.getElementById("pnl-omsg").classList.contains("on") && !!oc && oc.data.regNo === "ACS-2026-999999" && has(c, "#omTh"));
    c.dom.window.close(); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "en", "data", ["pnl-omsg"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-om="open"][data-id="oc4"]')); await settle(c); await settle(c); const dd = q("#pnl-omsg details.k1rules"); if (dd) dd.open = true;
    const L = clean(txt(c, "pnl-omsg") + " " + (q("#omText") ? q("#omText").getAttribute("placeholder") : "")).match(/[ऀ-ॿ]+/g) || [];
    ck("O10 शिक्षक English: संदेश-पैनल और खुली बातचीत में हिंदी शून्य", L.length === 0 && !!q("#omTh"), L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "data", ["pnl-omsg"]), q = sel => c.d.querySelector(sel);
    const g = txt(c, "omGuard");
    ck("O10 विद्यार्थी (18 से कम): अभिभावक का email जोड़ने का डिब्बा", /अभिभावक का email जोड़ें/.test(g) && has(c, "#omGmail") && has(c, '[data-om="gsend"]'), g.slice(0, 200));
    click(c, q('[data-om="gsend"]')); await settle(c);
    ck("O10 विद्यार्थी: ख़ाली email server को नहीं जाता", !c.calls.some(x => x.name === "setGuardianEmail") && /अभिभावक का email लिखें/.test(txt(c, "omMsg")));
    q("#omGmail").value = "parent@example.com"; click(c, q('[data-om="gsend"]')); await settle(c); await settle(c);
    const se = c.calls.filter(x => x.name === "setGuardianEmail").pop();
    ck("O10 विद्यार्थी: email server को, फिर code का डिब्बा", !!se && se.data.email === "parent@example.com" && has(c, "#omCode") && /pa\*\*\*\*@example\.com/.test(txt(c, "omGuard")) && /code अभिभावक के email पर भेजा गया/.test(txt(c, "omMsg")));
    q("#omCode").value = "12ab"; click(c, q('[data-om="gconf"]')); await settle(c);
    ck("O10 विद्यार्थी: 6 अंक न हों तो code server को नहीं जाता", !c.calls.some(x => x.name === "confirmGuardianEmail") && /6 अंकों का code लिखें/.test(txt(c, "omMsg")));
    q("#omCode").value = "123456"; click(c, q('[data-om="gconf"]')); await settle(c); await settle(c); await settle(c);
    ck("O10 विद्यार्थी: सही code server को; email जुड़ने का संदेश", c.calls.some(x => x.name === "confirmGuardianEmail" && x.data.code === "123456") && /अभिभावक का email जुड़ गया/.test(txt(c, "omMsg")));
    click(c, q('[data-om="open"][data-id="oc9"]')); await settle(c); await settle(c);
    const oc = c.calls.filter(x => x.name === "openThread").pop();
    ck("O10 विद्यार्थी: अपनी बातचीत बिना ACS नंबर के खुलती है; शिकायत का बटन \"और विकल्प\" में", !!oc && oc.data.courseId === "oc9" && oc.data.regNo === undefined && has(c, '#omThread details.k1more [data-om="rep"]'));
    ans(c, "बुरा"); click(c, q('[data-om="rep"]')); await settle(c);
    ck("O10 विद्यार्थी: छोटी शिकायत server को नहीं जाती", !c.calls.some(x => x.name === "reportThread") && /कम से कम 5 अक्षर/.test(txt(c, "omMsg")));
    ans(c, HU.krs); click(c, q('[data-om="rep"]')); await settle(c); await settle(c);
    const rp = c.calls.filter(x => x.name === "reportThread").pop();
    ck("O10 विद्यार्थी: शिकायत server को, कारण के साथ; \"सिर्फ़ ACS देखेगा\" बताया गया", !!rp && rp.data.courseId === "oc9" && rp.data.reason === HU.krs && c.dialogs.some(m => /सिर्फ़ ACS देखेगा/.test(m)) && /शिकायत ACS के पास पहुँच गई/.test(txt(c, "omMsg")));
    c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "data", ["pnl-olearn"]), q = sel => c.d.querySelector(sel);
    const mb = q('#olMine .k1card.st-active [data-ol="msg"]');
    ck("O10 विद्यार्थी: जुड़े कोर्स के कार्ड पर \"✉️ शिक्षक को संदेश\"; रद्द कोर्स पर नहीं", !!mb && !c.d.querySelector('#olMine .k1card.st-returned [data-ol="msg"]'));
    click(c, mb); await settle(c); await settle(c); await settle(c);
    ck("O10 विद्यार्थी: कार्ड से सीधे उसी कोर्स की बातचीत", c.d.getElementById("pnl-omsg").classList.contains("on") && c.calls.some(x => x.name === "openThread" && x.data.courseId === mb.getAttribute("data-id")));
    c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "en", "data", ["pnl-omsg"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-om="open"][data-id="oc9"]')); await settle(c); await settle(c); const dd = q("#omThread details.k1more"); if (dd) dd.open = true;
    const L = clean(txt(c, "pnl-omsg") + " " + q("#omGmail").getAttribute("placeholder") + " " + q("#omText").getAttribute("placeholder")).match(/[ऀ-ॿ]+/g) || [];
    ck("O10 विद्यार्थी English: अभिभावक का डिब्बा और बातचीत में हिंदी शून्य", L.length === 0, L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  for (const who of ["founder", "admin"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="qs"][data-v="msgk"]')); await settle(c); await settle(c);
    const lk = c.calls.filter(x => x.name === "listMsgComplaints").pop(), t = txt(c, "ocqList");
    ck("O10 " + who + ": \"🚩 शिकायतें\": खुली शिकायत, कारण, विद्यार्थी, शिक्षक, 18 से कम", !!lk && lk.data.status === "open" && t.indexOf(HU.krs) > -1 && /ACS-TE-2026-222222/.test(t) && /18 से कम/.test(t) && /शिक्षक को शिकायत नहीं दिखती/.test(t), t.slice(0, 300));
    click(c, q('[data-oc="kread"]')); await settle(c); await settle(c);
    ck("O10 " + who + ": पूरी बातचीत पढ़ी जाती है", c.calls.some(x => x.name === "readComplaintThread" && x.data.complaintId === "k1") && c.d.querySelectorAll(".omk .omb").length === 2);
    ans(c, "ठीक"); click(c, q('[data-oc="kclose"]')); await settle(c);
    ck("O10 " + who + ": छोटा नोट server को नहीं जाता", !c.calls.some(x => x.name === "closeMsgComplaint"));
    ans(c, HU.ccl); click(c, q('[data-oc="kclose"]')); await settle(c); await settle(c);
    const kc = c.calls.filter(x => x.name === "closeMsgComplaint").pop();
    ck("O10 " + who + ": शिकायत बंद, संदेश रोके बिना", !!kc && kc.data.block === false && kc.data.note === HU.ccl && /शिकायत बंद हुई/.test(txt(c, "ocqMsg")));
    c.confirmAnswer = true; ans(c, HU.ccl); click(c, q('#ocqList details.k1more [data-oc="kblock"]')); await settle(c); await settle(c);
    const kb = c.calls.filter(x => x.name === "closeMsgComplaint").pop();
    ck("O10 " + who + ": \"बंद करें और शिक्षक के संदेश रोकें\" पक्का करके", kb.data.block === true && c.dialogs.some(m => /सब संदेश रोकें/.test(m)) && /संदेश रोक दिए गए/.test(txt(c, "ocqMsg")));
    click(c, q('[data-oc="kst"]')); await settle(c); await settle(c);
    const kd = txt(c, "ocqList");
    ck("O10 " + who + ": बंद शिकायतें: क्या किया, संदेश बंद, \"फिर खोलें\"", c.calls.filter(x => x.name === "listMsgComplaints").pop().data.status === "closed" && /क्या किया:/.test(kd) && /संदेश बंद हैं/.test(kd) && has(c, '[data-oc="kopen"]'));
    ans(c, HU.ccl); click(c, q('[data-oc="kopen"]')); await settle(c); await settle(c);
    ck("O10 " + who + ": संदेश फिर खोलना, कारण के साथ", c.calls.some(x => x.name === "unblockTeacherMsg" && x.data.note === HU.ccl) && /फिर खुल गए/.test(txt(c, "ocqMsg")));
    c.dom.window.close(); }
  if (pg("founder")) { const c = await openH(pg("founder"), "en", "data", ["pnl-ocq"]), q = sel => c.d.querySelector(sel);
    click(c, q('[data-oc="qs"][data-v="msgk"]')); await settle(c); await settle(c); click(c, q('[data-oc="kread"]')); await settle(c); await settle(c);
    let L = clean(txt(c, "pnl-ocq")).match(/[ऀ-ॿ]+/g) || [];
    click(c, q('[data-oc="kst"]')); await settle(c); await settle(c); L = L.concat(clean(txt(c, "pnl-ocq")).match(/[ऀ-ॿ]+/g) || []);
    ck("O10 founder English: \"🚩 शिकायतें\" में हिंदी शून्य", L.length === 0, L.slice(0, 8).join(" ‖ ")); c.dom.window.close(); }
  /* (v3.3, N-1b) बोर्ड और बैनर वाला नाम: पहचान-कार्ड और online कोर्स के कार्ड */
  for (const who of ["teacher", "ustad", "center", "workshop"]) if (pg(who)) { const c = await openH(pg(who), "hi", "data", ["pnl-profile"]);
    const r = c.d.getElementById("pubBannerRow"), want = (who === "center" || who === "workshop") ? HU.bnr : HU.cls;
    ck("O11 " + who + ": पहचान-कार्ड पर नाम के ठीक नीचे \"🏷️ बैनर का नाम\"", !!r && r.previousElementSibling && r.previousElementSibling.id === "pubName" && /बैनर का नाम:/.test(r.textContent) && r.textContent.indexOf(want) > -1, r ? r.textContent : "row नहीं");
    c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "data", ["pnl-profile"]);
    ck("O11 student: विद्यार्थी के कार्ड पर बैनर-नाम की पंक्ति नहीं", !c.d.getElementById("pubBannerRow")); c.dom.window.close(); }
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "data", ["pnl-online"]);
    const k = c.d.querySelector('#ocList .k1card.st-approved'), t = k ? k.textContent : "";
    ck("O11 शिक्षक: मंज़ूर कोर्स पर \"कक्षा का नाम\"", /कक्षा का नाम:/.test(t) && t.indexOf(HU.cls) > -1, t.slice(0, 200)); c.dom.window.close(); }
  if (pg("student")) { const c = await openH(pg("student"), "hi", "data", ["pnl-olearn"]);
    const cat = txt(c, "olCat"), mine = txt(c, "olMine");
    ck("O11 विद्यार्थी: खुले कोर्स और अपने कोर्स के कार्ड पर \"कक्षा का नाम\"", /कक्षा का नाम:/.test(cat) && cat.indexOf(HU.cls) > -1 && /कक्षा का नाम:/.test(mine) && mine.indexOf(HU.cls) > -1); c.dom.window.close(); }
  for (const who of ["teacher", "center"]) if (pg(who)) { const c = await openH(pg(who), "en", "data", ["pnl-profile"]);
    const r = c.d.getElementById("pubBannerRow"), L = clean(r ? r.textContent : "").match(/[ऀ-ॿ]+/g) || [];
    ck("O11 " + who + " English: बैनर-नाम की पंक्ति में हिंदी शून्य (नाम छोड़कर)", !!r && L.length === 0 && /Banner name/i.test(r.textContent), r ? r.textContent : "row नहीं"); c.dom.window.close(); }
  /* देखने का मोड: शिक्षक की नज़र से सूची पढ़ी जाती है, कोई लिखने वाला काम नहीं */
  if (pg("teacher")) { const c = await openNazar(pg("teacher"), "hi", "?nazar=" + NZ_REG);
    { const cb = c.d.querySelector('#ocList [data-oc="cls"]'); if (cb) { click(c, cb); await settle(c); await settle(c); } }
    ck("O3 नज़र शिक्षक: कक्षा-सूची पढ़ी गई (viewAs के साथ), कड़ी डालने का खाना नहीं", c.calls.some(x => x.name === "listOnlineClasses" && x.data.viewAs) && /कुल कक्षाएँ/.test(txt(c, "ocList")) && !c.d.querySelector(".oclink"));
    { const lb = c.d.querySelector('#ocList [data-oc="lrn"]'); if (lb) { click(c, lb); await settle(c); await settle(c); } }
    { const ob = c.d.querySelector('[data-om="open"]'); if (ob) { click(c, ob); await settle(c); await settle(c); } }
    ck("O10 नज़र शिक्षक: बातचीत पढ़ी गई (viewAs के साथ); लिखने का डिब्बा और भेजने का बटन नहीं", c.calls.some(x => x.name === "listMyThreads" && x.data.viewAs) && c.calls.some(x => x.name === "openThread" && x.data.viewAs)
      && !!c.d.querySelector("#omTh") && !c.d.querySelector("#omText") && !c.d.querySelector('[data-om="send"]'));
    ck("O9 नज़र शिक्षक: विद्यार्थी-सूची पढ़ी गई (viewAs के साथ); रद्द का बटन नहीं", c.calls.some(x => x.name === "listOnlineLearners" && x.data.viewAs) && !c.d.querySelector('[data-oc="ccl"]'));
    ck("O3 नज़र शिक्षक: online कोर्स पढ़े गए (viewAs के साथ), कोई लिखने वाला काम नहीं", c.calls.some(x => x.name === "listMyOnlineCourses" && x.data.viewAs) && /शिक्षा की बोलचाल/.test(txt(c, "ocList"))
      && !c.calls.some(x => /^(save|submit|withdraw|decide|cancel)OnlineCourse$|^setOnlineClassLink$|^sendMessage$|^reportThread$/.test(x.name)));
    c.dom.window.close(); }
}
/* (v2.0, Founder का आदेश 17-Nov-2026: "Founder को सभी पैनल देखने का अधिकार दो") Founder का देखने वाला मोड।
   नक़ली database: login वाला खाता (u1) Founder है और उसका कोई registration नहीं; भरा हुआ खाता किसी और (uX) का है। */
const NZ_REG = "ACS-2026-123456";
function nazarData(info, founder) {
  const data = fixture(info, "data");
  const swap = o => { if (!o || typeof o !== "object") return; for (const k of Object.keys(o)) { if (o[k] === "u1") o[k] = "uX"; else if (typeof o[k] === "object" && typeof o[k].toMillis !== "function") swap(o[k]); } };
  swap(data);
  data.registrations[NZ_REG] = data.registrations.r1; delete data.registrations.r1;
  data.registrations["ACS-2026-000009"] = { authUid: "uS", role: info.allowed[0] === "student" ? "center" : "student", status: "approved", regNo: "ACS-2026-000009", name_local: NAME_HI, name_roman: "Sita", createdAt: TS(2026, 11, 1) };
  data.registrations["ACS-2026-000010"] = { role: String((info.extRoles && info.extRoles[0]) || info.allowed[0]).toLowerCase(), status: "provisional", regNo: "ACS-2026-000010", name_local: NAME_HI, createdAt: TS(2026, 11, 1) };
  data.teams = founder ? { u1: { designation: "founder", active: true, name: "Founder" } } : {};
  data.sessions = { u1: { sid: "s1" } };
  return data;
}
async function openNazar(file, lang, query, opt) {
  opt = opt || {};
  const info = pageInfo(file), data = nazarData(info, opt.founder !== false), user = { uid: "u1", email: "founder@example.com" };
  const ls = {}; if (lang && lang !== "hi") ls.acs_dash_lang = lang; Object.assign(ls, opt.ls || {});
  const KV = f => (d => Object.assign(f(d), d && d.viewAs !== undefined && !opt.oldServer ? { viewed: true } : {}));
  const c = await openPage(file, { transform: dashTransform, urlPath: "/" + file.replace(/index\.html$/, ""), query: query || "", ls, expect: (lang && lang !== "hi") ? lang : undefined,
    handlers: Object.assign({}, HANDLERS, DOC_HANDLERS, H_HANDLERS, K1_HANDLERS, OC_HANDLERS, { listMyOnlineCourses: KV(OC_HANDLERS.listMyOnlineCourses), listOnlineClasses: KV(OC_HANDLERS.listOnlineClasses), listOnlineCatalog: KV(OC_HANDLERS.listOnlineCatalog), myOnlineCourses: KV(OC_HANDLERS.myOnlineCourses), listOnlineLearners: KV(OC_HANDLERS.listOnlineLearners), listMyThreads: KV(OC_HANDLERS.listMyThreads), openThread: KV(OC_HANDLERS.openThread), myGuardianContact: KV(OC_HANDLERS.myGuardianContact), listMyClasses: KV(K1_HANDLERS.listMyClasses), classRoster: KV(K1_HANDLERS.classRoster), listAttendance: KV(K1_HANDLERS.listAttendance), myAttendance: KV(K1_HANDLERS.myAttendance), listWork: KV(K1_HANDLERS.listWork), myWork: KV(K1_HANDLERS.myWork), listNotices: KV(K1_HANDLERS.listNotices), myNotices: KV(K1_HANDLERS.myNotices) }), fb: makeFB(data, user) });
  c.userVals.add(NAME_HI); c.userVals.add(NAME_HI.trim()[0]); c.userVals.add("सीता देवी"); Object.keys(HU).forEach(k => c.userVals.add(HU[k]));   /* उपयोगकर्ता का लिखा हर पाठ */
  await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden") || !c.d.getElementById("denyView").classList.contains("hidden"), 6000);
  await settle(c); await settle(c);
  if (!opt.noOpen && !c.d.getElementById("appView").classList.contains("hidden")) { await openAll(c); await settle(c); }
  return c;
}
/* (v2.4, design D-1) नया रूप: कक्षा-कार्ड के पाँच खाने (एक बार में एक), ख़तरे वाले काम "और विकल्प" के भीतर, नियम मुड़े हुए;
   और "मेरा रूप": रंग, बटन का आकार, काम-सूची से छिपाना, ऊपर की पट्टी; पसंद इसी फ़ोन में; देखने के मोड में कुछ नहीं बदलता। */
async function roopChecks(pages) {
  const pg = n => pages.find(f => f === "dashboard/" + n + "/index.html");
  const bad = pages.filter(f => { const h = fs.readFileSync(path.join(ROOT, f), "utf8"); return !(/id="pnl-roop"/.test(h) && /id="tbRoop"/.test(h) && /id="roopBar"/.test(h) && /id="roopBox"/.test(h)); });
  ck("D1 हर घर में \"मेरा रूप\" पैनल, ऊपर का बटन और ऊपर की पट्टी", pages.length >= 31 && bad.length === 0, bad.join(" "));
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "base", ["pnl-myclass"]), q = sel => c.d.querySelector(sel), qa = sel => c.d.querySelectorAll(sel);
    ck("D1 शिक्षक: चालू कक्षा पर पाँच खाने, प्रस्ताव पर नहीं", qa('.k1tab[data-id="k1"]').length === 5 && qa('.k1tab[data-id="k3"]').length === 0 && qa(".k1tab.on").length === 0);
    ck("D1 शिक्षक: पैनल के नियम मुड़े हुए हैं", !!q("#pnl-myclass details.k1rules") && !q("#pnl-myclass details.k1rules").open && /15 दिन पहले/.test(q("#pnl-myclass details.k1rules").textContent));
    ck("D1 शिक्षक: छोड़ने का लाल काम \"और विकल्प\" के भीतर, सूचना का काम बाहर", !!q('[data-k1="leave"][data-id="k1"]').closest("details.k1more") && !q('[data-k1="notice"][data-id="k1"]').closest("details") && q('[data-k1="leave"][data-id="k1"]').classList.contains("dg"));
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c); await settle(c);
    click(c, q('[data-k1="attall"]')); await settle(c);
    ck("D1 शिक्षक: हाज़िरी का खाना खुला और चुना हुआ दिखा", qa(".k1att").length === 1 && qa(".k1tab.on").length === 1 && q(".k1tab.on").getAttribute("data-k1") === "att" && qa(".k1mP.on").length === 2);
    click(c, q('[data-k1="wk"][data-id="k1"]')); await settle(c); await settle(c);
    ck("D1 शिक्षक: दूसरा खाना खोलने पर पहला बंद (एक बार में एक)", qa(".k1att").length === 1 && q(".k1tab.on").getAttribute("data-k1") === "wk" && !q(".k1m.k1mP") && !!q('[data-k1="wknew"]'));
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c); await settle(c);
    ck("D1 शिक्षक: खाना बदलकर लौटने पर लगाई हुई हाज़िरी याद रही", qa(".k1mP.on").length === 2 && q(".k1tab.on").getAttribute("data-k1") === "att");
    click(c, q('[data-k1="att"][data-id="k1"]')); await settle(c);
    ck("D1 शिक्षक: वही खाना दोबारा दबाने पर बंद", !q(".k1att") && qa(".k1tab.on").length === 0);
    c.dom.window.close(); }
  if (pg("center")) { const c = await openH(pg("center"), "hi", "base", ["pnl-class"]), q = sel => c.d.querySelector(sel);
    ck("D1 केंद्र: नियम मुड़े हुए; वापस लेने और शिकायत के काम \"और विकल्प\" के भीतर", !!q("#pnl-class details.k1rules") && !!q('[data-k1="end"][data-id="k1"]').closest("details.k1more") && !!q('[data-k1="abrep"]').closest("details.k1more") && !q('[data-k1="time"][data-id="k1"]').closest("details"));
    click(c, q('[data-k1="pg"][data-id="k1"]')); await settle(c); await settle(c);
    ck("D1 केंद्र: प्रगति में प्रतिशत की पट्टी", c.d.querySelectorAll(".k1bar i").length >= 3 && /width:\s*67%/.test(q(".k1bar i").getAttribute("style")));
    c.dom.window.close(); }
  /* (v2.5, design D-2) विद्यार्थी का "मेरा केंद्र" */
  if (pg("student")) { const c = await openH(pg("student"), "hi", "base", ["pnl-myctr"]), q = sel => c.d.querySelector(sel), qa = sel => c.d.querySelectorAll(sel);
    const card = q("#mcClass .k1card"), ac = card ? card.querySelectorAll("details.k1acc") : [];
    ck("D2 विद्यार्थी: कक्षा कार्ड में; सूचनाएँ खुली, हाज़िरी और काम मुड़े हुए", !!card && ac.length === 3 && ac[0].open && !ac[1].open && !ac[2].open && card.classList.contains("st-active"));
    ck("D2 विद्यार्थी: हाज़िरी और काम के माथे पर प्रतिशत और पट्टी", /67%/.test(ac[1].querySelector("summary").textContent) && !!ac[1].querySelector("summary .k1bar i") && /15 \/ 30/.test(ac[2].querySelector("summary").textContent) && !!ac[2].querySelector("summary .k1bar i"));
    ck("D2 विद्यार्थी: शिक्षक, दिन और समय अलग-अलग पंक्ति में", card.querySelectorAll(".k1meta").length === 4 && /संगीत माली/.test(card.textContent) && /16:00 - 17:30/.test(card.textContent));
    ck("D2 विद्यार्थी: बिना शिक्षक वाले बैच और इंतज़ार पर साफ़ पट्टी", qa("#mcClass .k1card .k1call").length === 2 && /अभी तय नहीं हुए/.test(q("#mcClass").textContent) && /इंतज़ार में हैं/.test(q("#mcClass").textContent));
    ck("D2 विद्यार्थी: जुड़ने का तरीक़ा मुड़ा हुआ; \"अगले दौर\" वाली बासी पंक्ति नहीं", !!q("#pnl-myctr details.k1rules") && !q("#pnl-myctr .soon") && !/अगले दौर/.test(q("#pnl-myctr").textContent) && /Guardian-निशान/.test(q("#pnl-myctr details.k1rules").textContent));
    ck("D2 नामांकन की पंक्तियाँ और खोज का बटन", qa("#mcList .lrow").length >= 3 && !!q("#mcFindBtn"));
    c.dom.window.close(); }
  { const css = fs.readFileSync(path.join(ROOT, "assets/dashboard.css"), "utf8");
    ck("D2 बिना रंग-class वाला बटन अब फीका नहीं (मूल रंग नीला)", /\.abtn\{[^}]*background:var\(--blue\)/.test(css) && /\.lrow\{/.test(css) && /\.chip\.ok\{/.test(css)); }
  /* (v2.6, design D-3) केंद्र का "Enrollment" */
  if (pg("center")) { const c = await openH(pg("center"), "hi", "base", ["pnl-enroll"]), q = sel => c.d.querySelector(sel), css = fs.readFileSync(path.join(ROOT, "assets/dashboard.css"), "utf8");
    ck("D3 केंद्र: घोषणा के नियम मुड़े हुए; हर हिस्से का माथा अलग; \"अगले दौर\" वाली बासी पंक्ति नहीं", !!q("#pnl-enroll details.k1rules") && /30 के गुणक/.test(q("#pnl-enroll details.k1rules").textContent) && c.d.querySelectorAll("#pnl-enroll .pd.k9h").length === 5 && !q("#pnl-enroll .soon") && !/अगले दौर/.test(q("#pnl-enroll").textContent));
    ck("D3 कड़ी वाले बटन टूटते नहीं; चुनने का खाना बड़ा", /a\.abtn:not\(\.hidden\)\{display:inline-block/.test(css) && /#addStuCourse,\.lrow select\{[^}]*min-height:48px/.test(css) && !!q("#instShareWa.abtn"));
    c.dom.window.close(); }
  /* (v2.7, design D-4) टीम के पैनल */
  if (pg("founder")) { const c = await openH(pg("founder"), "hi"), css = fs.readFileSync(path.join(ROOT, "assets/dashboard.css"), "utf8"), sq = (c.d.getElementById("pnl-sevaq") || {}).textContent || "";
    ck("D4 सेवा-क़तार में भूमिका का पूरा नाम, कूट-नाम नहीं", /केंद्र \(Center\)/.test(sq) && !/· center\b/.test(sq), sq.slice(0, 300));
    ck("D4 \"ना\" वाले बटन एक ही class से (भीतर लिखा लाल रंग नहीं)", !c.d.querySelector('button.abtn[style*="B71C1C"], button.abtn[style*="6b7280"]') && !!c.d.querySelector('.abtn.no[data-sevaq="fail"]') && /\.abtn\.no\{background:#fff;color:#B71C1C;border:2px solid #B71C1C/.test(css));
    ck("D4 आवेदन की पंक्ति पर \"ब्योरा देखें\"", !!c.d.querySelector("#pnl-apps .vbtn") && /ब्योरा देखें/.test(c.d.querySelector("#pnl-apps .vbtn").textContent));
    c.dom.window.close(); }
  /* मेरा रूप */
  if (pg("teacher")) { const c = await openH(pg("teacher"), "hi", "base", ["pnl-roop"]), q = sel => c.d.querySelector(sel), qa = sel => c.d.querySelectorAll(sel);
    const st = c.d.documentElement.style, home = c.w.ACS_DASH.home, saved = () => { try { return JSON.parse(c.w.localStorage.getItem("acs_roop_v1") || "{}").u1 || {}; } catch (e) { return {}; } };
    const msg = () => (c.d.getElementById("roopMsg") || {}).textContent || "", tap = async sel => { click(c, q(sel)); await settle(c); };
    ck("R1 मेरा रूप: ऊपर का बटन दिखा, काम-सूची में पंक्ति, पैनल खुला", q("#tbRoop").style.display !== "none" && !!q('#sideNav .si[data-go="pnl-roop"]') && q("#pnl-roop").classList.contains("on") && qa('[data-roop="pc"]').length === 6 && qa('[data-roop="bc"]').length === 7 && qa('[data-roop="bz"]').length === 3 && !!q('[data-roop="reset"]'));
    ck("R1 मेरा रूप: शुरू में मूल रूप (कुछ बदला नहीं)", !st.getPropertyValue("--blue") && !st.getPropertyValue("--navy") && !st.getPropertyValue("--bfs") && !q("#roopBar").classList.contains("on") && !qa("#sideNav .si.rhide").length);
    await tap('[data-roop="bc"][data-v="g"]');
    ck("R2 बटन का रंग: तुरंत बदला, इसी फ़ोन में सहेजा गया", st.getPropertyValue("--blue") === "#2E7D32" && saved().bc === "g" && /सहेज ली गई/.test(msg()) && q('[data-roop="bc"][data-v="g"]').classList.contains("on"));
    await tap('[data-roop="pc"][data-v="p"]');
    ck("R3 पैनल का रंग: माथे का रंग बदला", st.getPropertyValue("--navy") === "#2A1B4D" && st.getPropertyValue("--hd2") === "#5E35B1" && saved().pc === "p");
    await tap('[data-roop="bz"][data-v="l"]');
    ck("R4 बटन का आकार: बड़ा", st.getPropertyValue("--bfs") === "21px" && st.getPropertyValue("--bh") === "56px" && saved().bz === "l");
    ck("R5 प्रोफ़ाइल, मेरा रूप, सहायता और नियम-पत्र छिपाए नहीं जा सकते", !q('[data-roop="hide"][data-v="pnl-profile"]') && !q('[data-roop="hide"][data-v="pnl-roop"]') && !q('[data-roop="hide"][data-v="pnl-help"]') && !q('[data-roop="hide"][data-v="pnl-rules"]') && qa(".rlk").length >= 3, String(qa(".rlk").length));
    await tap('[data-roop="hide"][data-v="pnl-myclass"]');
    ck("R5 पैनल छिपाना: काम-सूची से गया, बटन पर \"छिपा है\"", q('#sideNav .si[data-go="pnl-myclass"]').classList.contains("rhide") && /छिपा है/.test(q('[data-roop="hide"][data-v="pnl-myclass"]').textContent) && (saved().hide || {})[home].join() === "pnl-myclass");
    await tap('[data-roop="hide"][data-v="pnl-myclass"]');
    ck("R5 पैनल दोबारा दिखाना", !q('#sideNav .si[data-go="pnl-myclass"]').classList.contains("rhide") && (saved().hide || {})[home].length === 0);
    await tap('[data-roop="pin"][data-v="pnl-myclass"]');
    ck("R6 ऊपर की पट्टी: बटन जुड़ा, नाम वही", q("#roopBar").classList.contains("on") && qa("#roopBar .rpin").length === 1 && /मेरी कक्षाएँ/.test(q("#roopBar .rpin").textContent));
    click(c, q("#roopBar .rpin")); await settle(c); await settle(c);
    ck("R6 ऊपर की पट्टी का बटन उसी पैनल पर ले गया", q("#pnl-myclass").classList.contains("on") && !q("#pnl-roop").classList.contains("on"));
    click(c, q("#tbRoop")); await settle(c);
    ck("R6 ऊपर का \"रूप बदलें\" बटन पैनल खोलता है", q("#pnl-roop").classList.contains("on"));
    const rest = Array.from(qa('[data-roop="pin"]')).map(b => b.getAttribute("data-v")).filter(v => v !== "pnl-myclass");
    for (const v of rest.slice(0, 5)) await tap('[data-roop="pin"][data-v="' + v + '"]');
    ck("R7 ऊपर की पट्टी में 6 बटन तक", qa("#roopBar .rpin").length === 6, String(qa("#roopBar .rpin").length));
    if (rest.length > 5) { await tap('[data-roop="pin"][data-v="' + rest[5] + '"]');
      ck("R7 सातवाँ बटन नहीं जुड़ता, साफ़ संदेश", qa("#roopBar .rpin").length === 6 && /6 से ज़्यादा/.test(msg())); }
    c.confirmAnswer = false; await tap('[data-roop="reset"]');
    ck("R8 \"पहले जैसा\" पर पहले पूछा जाता है; ना कहने पर कुछ नहीं बदला", st.getPropertyValue("--blue") === "#2E7D32" && c.dialogs.some(m => /पहले जैसा रूप करें/.test(m)));
    c.confirmAnswer = true; await tap('[data-roop="reset"]');
    ck("R8 \"पहले जैसा\": रंग, आकार, पट्टी सब मूल", !st.getPropertyValue("--blue") && !st.getPropertyValue("--navy") && !st.getPropertyValue("--hd2") && !st.getPropertyValue("--bfs") && !q("#roopBar").classList.contains("on") && !saved().bc && /पहले जैसा हो गया/.test(msg()));
    ck("R मेरा रूप: कोई त्रुटि नहीं", c.errors.length === 0, c.errors.join(" | "));
    c.dom.window.close(); }
  if (pg("teacher")) { const home = "/dashboard/teacher/";
    const pre = { acs_roop_v1: JSON.stringify({ u1: { pc: "t", bc: "o", bz: "s", hide: { [home]: ["pnl-myclass", "pnl-profile"] }, pins: { [home]: ["pnl-roop", "pnl-nahi"] } }, u2: { bc: "m" } }) };
    const c = await openH(pg("teacher"), "hi", "base", ["pnl-profile"], pre), st = c.d.documentElement.style, q = sel => c.d.querySelector(sel);
    ck("R9 सहेजी हुई पसंद खुलते ही लागू (अपने खाते की ही)", c.w.ACS_DASH.home === home && st.getPropertyValue("--blue") === "#BF360C" && st.getPropertyValue("--navy") === "#06343A" && st.getPropertyValue("--bfs") === "16px", String(c.w.ACS_DASH.home));
    ck("R9 छिपा पैनल छिपा रहा; प्रोफ़ाइल कभी नहीं छिपती; जो पैनल है ही नहीं, उसका बटन नहीं बना", q('#sideNav .si[data-go="pnl-myclass"]').classList.contains("rhide") && !q('#sideNav .si[data-go="pnl-profile"]').classList.contains("rhide") && c.d.querySelectorAll("#roopBar .rpin").length === 1);
    c.dom.window.close();
    const d = await openH(pg("teacher"), "hi", "base", ["pnl-profile"], { acs_roop_v1: "{टूटा" });
    ck("R9 टूटा हुआ सहेजा data पन्ना नहीं रोकता", !d.d.getElementById("appView").classList.contains("hidden") && d.errors.length === 0 && !d.d.documentElement.style.getPropertyValue("--blue"), d.errors.join(" | "));
    d.dom.window.close(); }
  if (pg("teacher")) { const pre = { acs_roop_v1: JSON.stringify({ u1: { bc: "m", bz: "l" } }) };
    const c = await openNazar(pg("teacher"), "hi", "", { noOpen: true, ls: pre }), q = sel => c.d.querySelector(sel), st = c.d.documentElement.style;
    click(c, q('#sideNav .si[data-go="pnl-roop"]')); await settle(c); await settle(c);
    ck("R10 देखने का मोड: Founder की अपनी पसंद लागू नहीं, घर का मूल रूप", !!q("#nazarBar") && !st.getPropertyValue("--blue") && !st.getPropertyValue("--bfs") && /मूल रूप दिखता है/.test(q("#roopBox").textContent));
    click(c, q('[data-roop="bc"][data-v="g"]')); await settle(c);
    ck("R10 देखने का मोड: रूप नहीं बदलता, कुछ सहेजा नहीं जाता", !st.getPropertyValue("--blue") && /देखने के मोड में यह काम नहीं होता/.test(q("#roopMsg").textContent) && JSON.parse(c.w.localStorage.getItem("acs_roop_v1")).u1.bc === "m");
    c.dom.window.close(); }
  if (pg("founder")) { const c = await openH(pg("founder"), "hi", "base", ["pnl-roop"]), q = sel => c.d.querySelector(sel);
    ck("R11 टीम का घर: \"मेरा रूप\" काम-सूची में, रंग की सूची पूरी", !!q('#sideNav .si[data-go="pnl-roop"]') && c.d.querySelectorAll('[data-roop="bc"]').length === 7);
    click(c, q('[data-roop="bc"][data-v="p"]')); await settle(c);
    ck("R11 टीम का घर: बटन का रंग बदला", c.d.documentElement.style.getPropertyValue("--blue") === "#5E35B1"); c.dom.window.close(); }
}
const NZ_OK = { claimSession: 1, listMyOnlineCourses: 1, listOnlineClasses: 1, listOnlineCatalog: 1, myOnlineCourses: 1, listOnlineLearners: 1, listMyThreads: 1, openThread: 1, myGuardianContact: 1, listMyClasses: 1, classRoster: 1, listAttendance: 1, myAttendance: 1, listWork: 1, myWork: 1, listNotices: 1, myNotices: 1 };   /* देखने के मोड में server तक सिर्फ़ ये जा सकते हैं */
async function nazarChecks(pages) {
  const has = (c, sel) => !!c.d.querySelector(sel), txt = (c, id) => { const e = c.d.getElementById(id); return e ? e.textContent : ""; };
  const shown = (c, id) => { const e = c.d.getElementById(id); return !!e && !e.classList.contains("hidden"); };
  const pg = n => pages.find(f => f === "dashboard/" + n + "/index.html");
  const ext = pages.filter(f => pageInfo(f).mode === "external");
  ck("नज़र: बाहरी घर 12 हैं (13वाँ, स्वयंसेवक, दो रूप वाला घर है)", ext.length === 12, String(ext.length));
  /* 1) हर बाहरी घर: नमूना-रूप खुले, हर पैनल खुले, कोई त्रुटि नहीं, server तक कोई लिखने वाला काम नहीं */
  for (const f of ext) { const tag = "नज़र " + f.split("/")[1];
    try { const c = await openNazar(f, "hi");
      const bad = c.calls.map(x => x.name).filter(n => !NZ_OK[n]);
      ck(tag + " : Founder के लिए नमूना-रूप खुला, पट्टी दिखी", shown(c, "appView") && !shown(c, "denyView") && /Founder का देखने वाला मोड/.test(txt(c, "nazarBar")) && /नमूना-रूप खुला है/.test(txt(c, "nazarBar")));
      ck(tag + " : हर पैनल खुला, JS-त्रुटि शून्य", c.d.querySelectorAll("#sideNav .si").length >= 5 && c.errors.length === 0, c.errors.slice(0, 2).join(" ‖ "));
      ck(tag + " : server तक कोई लिखने वाला काम नहीं गया", bad.length === 0, bad.join(","));
      ck(tag + " : नियम-पत्र की सहमति नहीं माँगी गई", !has(c, "#rulesGate"));
      c.dom.window.close();
    } catch (e) { ck(tag + " : robot चला", false, String(e && e.stack || e).slice(0, 300)); } }
  /* 2) जो Founder नहीं है: पहले जैसा, कोई रास्ता नहीं */
  for (const q of ["", "?nazar=" + NZ_REG, "?nazar=1"]) { const c = await openNazar(pg("center"), "hi", q, { founder: false });
    ck("नज़र: जो Founder नहीं है, उसके लिए घर बंद (" + (q || "सीधा") + ")", shown(c, "denyView") && !shown(c, "appView") && !has(c, "#nazarBar") && !c.calls.some(x => x.name === "listMyClasses")); c.dom.window.close(); }
  /* 3) किसी खाते की नज़र से: केंद्र */
  { const c = await openNazar(pg("center"), "hi", "?nazar=" + NZ_REG), bar = txt(c, "nazarBar");
    ck("नज़र केंद्र: पट्टी में खाते का नाम और ACS नंबर", /अभी इस खाते की नज़र से:/.test(bar) && bar.indexOf(NAME_HI) > -1 && bar.indexOf(NZ_REG) > -1 && has(c, '[data-nz="sample"]'), bar.slice(0, 160));
    ck("नज़र केंद्र: प्रोफ़ाइल उसी खाते की", txt(c, "pName").indexOf(NAME_HI) > -1 && txt(c, "pReg") === NZ_REG && /^👁/.test(txt(c, "tbWho")));
    const lm = c.calls.filter(x => x.name === "listMyClasses").pop();
    ck("नज़र केंद्र: कक्षा-सूची उसी खाते की पहचान से माँगी गई", !!lm && lm.data.viewAs === "uX" && /कुल विद्यार्थी:\s*31/.test(txt(c, "clsList")), JSON.stringify(lm && lm.data));
    ck("नज़र केंद्र: उस खाते का लेन-देन दिखा", /राशि:\s*₹300/.test(txt(c, "pnl-ledger")) && /बैज सक्रिय/.test(txt(c, "pnl-ledger")), txt(c, "pnl-ledger").slice(-200));
    const n0 = c.calls.length; c.w.prompt = m => { c.dialogs.push(String(m)); return "x"; }; c.confirmAnswer = true;
    for (const sel of ['[data-k1="abrep"]', '[data-k1="bset"]', '[data-k1="abwd"]', '#ofDeclare']) { const b = c.d.querySelector(sel); if (b) { b.disabled = false; click(c, b); await settle(c); await settle(c); } }
    const wr = c.calls.slice(n0).map(x => x.name).filter(n => !NZ_OK[n]);
    ck("नज़र केंद्र: बटन दबाने पर server तक कुछ नहीं गया, कारण दिखा", wr.length === 0 && /देखने के मोड में यह काम नहीं होता/.test(txt(c, "clsMsg")), wr.join(",") + " | " + txt(c, "clsMsg"));
    click(c, c.d.querySelector('[data-nz="list"]')); await settle(c); await settle(c);
    ck("नज़र केंद्र: \"इस भूमिका के खाते\" में वही खाते जिनका login बना है", c.d.querySelectorAll('[data-nz="pick"]').length === 1 && c.d.querySelector('[data-nz="pick"]').getAttribute("data-reg") === NZ_REG, txt(c, "nzList").slice(0, 120));
    c.dom.window.close(); }
  /* 4) पुराना server (viewAs नहीं समझता): उस खाते का बताकर Founder का अपना data न दिखे */
  { const c = await openNazar(pg("center"), "hi", "?nazar=" + NZ_REG, { oldServer: true });
    ck("नज़र केंद्र (पुराना server): कक्षा-सूची की जगह साफ़ कारण", /server का यह हिस्सा अभी देखने के मोड के लिए तैयार नहीं है/.test(txt(c, "clsList")) && !/कुल विद्यार्थी/.test(txt(c, "clsList")), txt(c, "clsList").slice(0, 140)); c.dom.window.close(); }
  /* 5) ग़लत नंबर, दूसरी भूमिका का खाता, बिना login वाला खाता */
  { const c = await openNazar(pg("center"), "hi", "?nazar=ACS-2026-999000", { noOpen: true });
    ck("नज़र केंद्र: नंबर न मिले तो साफ़ वाक्य और नमूना-रूप", /यह ACS नंबर नहीं मिला:/.test(txt(c, "nazarBar")) && /नमूना-रूप खुला है/.test(txt(c, "nazarBar")) && shown(c, "appView")); c.dom.window.close(); }
  { const c = await openNazar(pg("center"), "hi", "?nazar=ACS-2026-000009", { noOpen: true }), a = c.d.querySelector("#nazarBar a.nzl");
    ck("नज़र केंद्र: दूसरी भूमिका का खाता हो तो उसके घर की कड़ी", /यह खाता दूसरी भूमिका का है:/.test(txt(c, "nazarBar")) && !!a && a.getAttribute("href") === "/dashboard/student/?nazar=ACS-2026-000009" && txt(c, "pReg") !== "ACS-2026-000009", a && a.getAttribute("href")); c.dom.window.close(); }
  { const c = await openNazar(pg("center"), "hi", "?nazar=ACS-2026-000010", { noOpen: true });
    ck("नज़र केंद्र: जिस खाते का login नहीं बना, वह नहीं खुलता", /इस खाते का login अभी बना नहीं है:/.test(txt(c, "nazarBar")) && /नमूना-रूप खुला है/.test(txt(c, "nazarBar"))); c.dom.window.close(); }
  { const c = await openNazar(pg("center"), "hi", "?nazar=" + encodeURIComponent("a/b<c>"), { noOpen: true });
    ck("नज़र केंद्र: टूटा हुआ नंबर पन्ने में ज्यों का त्यों नहीं घुसता", /यह ACS नंबर नहीं मिला:/.test(txt(c, "nazarBar")) && !has(c, "#nazarBar c")); c.dom.window.close(); }
  /* 6) शिक्षक और विद्यार्थी की नज़र से */
  { const c = await openNazar(pg("teacher"), "hi", "?nazar=" + NZ_REG);
    ck("नज़र शिक्षक: उसकी कक्षाएँ दिखीं, रोक की सूचना दिखी", /📩|प्रस्ताव/.test(txt(c, "myClsList")) && /नई कक्षा मिलना बंद है/.test(txt(c, "myClsStand")) && c.calls.filter(x => x.name === "listMyClasses").every(x => x.data.viewAs === "uX"));
    c.w.prompt = () => "x"; const n0 = c.calls.length; click(c, c.d.querySelector('[data-k1="acc"]')); await settle(c); await settle(c);
    click(c, c.d.querySelector('[data-k1="att"][data-id="k1"]')); await settle(c); await settle(c);
    click(c, c.d.querySelector('[data-k1="attall"]')); await settle(c); click(c, c.d.querySelector('[data-k1="attsave"]')); await settle(c); await settle(c);
    ck("नज़र शिक्षक: हाज़िरी दिखती है, पर सहेजी नहीं जाती", !!c.d.querySelector(".k1att") && c.calls.filter(x => x.name === "listAttendance").every(x => x.data.viewAs === "uX") && !c.calls.some(x => x.name === "markAttendance") && /देखने के मोड में यह काम नहीं होता/.test(txt(c, "myClsMsg")), txt(c, "myClsMsg"));
    ck("नज़र शिक्षक: \"स्वीकारें\" दबाने पर server तक कुछ नहीं गया", !c.calls.slice(n0).some(x => x.name === "respondClass") && /देखने के मोड में यह काम नहीं होता/.test(txt(c, "myClsMsg")), txt(c, "myClsMsg")); c.dom.window.close(); }
  { const c = await openNazar(pg("student"), "hi", "?nazar=" + NZ_REG), bad = c.calls.map(x => x.name).filter(n => !NZ_OK[n]);
    ck("नज़र विद्यार्थी: उसका केंद्र, कक्षा और प्रमाणपत्र दिखे", /मेरी कक्षा:/.test(txt(c, "mcClass")) && /1\s*📜 प्रमाणपत्र/.test(txt(c, "pnl-courses")) && /फ़ोन में रहता है/.test(txt(c, "nazarBar")), txt(c, "mcClass").slice(0, 100));
    ck("नज़र विद्यार्थी: पढ़ाई की प्रगति server को नहीं भेजी गई, सहमति नहीं माँगी गई", bad.length === 0 && !has(c, "#rulesGate"), bad.join(",")); c.dom.window.close(); }
  /* 7) स्वयंसेवक (दो रूप वाला घर) */
  if (pg("volunteer")) { const c = await openNazar(pg("volunteer"), "hi", "?nazar=1");
    ck("नज़र स्वयंसेवक: ?nazar=1 से बाहरी-रूप खुला", shown(c, "appView") && /नमूना-रूप खुला है/.test(txt(c, "nazarBar")) && !has(c, '#sideNav .si[data-go="pnl-apps"]')); c.dom.window.close();
    const d = await openNazar(pg("volunteer"), "hi", "");
    ck("नज़र स्वयंसेवक: सीधे खोलने पर टीम-रूप, पट्टी नहीं", shown(d, "appView") && !has(d, "#nazarBar") && has(d, '#sideNav .si[data-go="pnl-apps"]')); d.dom.window.close(); }
  /* 8) Founder का घर: "सभी घर" */
  { const html = fs.readFileSync(path.join(ROOT, pg("founder")), "utf8"), box = (/id="pnl-ghar"[\s\S]*?<\/div><\/div>/.exec(html) || [""])[0];
    const links = (box.match(/class="abtn gharb" href="[^"]+"/g) || []).map(x => /href="([^"]+)"/.exec(x)[1]);
    const homes = pages.map(f => "/" + f.replace(/index\.html$/, "")).filter(h => h !== "/dashboard/founder/");
    ck("नज़र Founder: \"सभी घर\" में हर घर की कड़ी (30 घर + स्वयंसेवक का बाहरी-रूप)", links.length === 31 && homes.every(h => links.indexOf(h) > -1) && links.indexOf("/dashboard/volunteer/?nazar=1") > -1
      && links.every(l => fs.existsSync(path.join(ROOT, l.replace(/\?.*$/, "").slice(1), "index.html"))), links.length + " | " + homes.filter(h => links.indexOf(h) < 0).join(","));
    for (const who of pages.filter(f => f !== pg("founder"))) if (fs.readFileSync(path.join(ROOT, who), "utf8").indexOf('id="pnl-ghar"') > -1) ck("नज़र: \"सभी घर\" सिर्फ़ Founder के घर में", false, who);
    const c = await openH(pg("founder"), "hi", "data", ["pnl-ghar"]);
    ck("नज़र Founder: पैनल काम-सूची में है और खुलता है", has(c, '#sideNav .si[data-go="pnl-ghar"]') && c.d.querySelectorAll("#pnl-ghar a.gharb").length === 31); c.dom.window.close(); }
  /* 9) तीनों भाषाएँ: पट्टी और देखने के मोड के संदेश में हिंदी शून्य */
  for (const lang of ["en"]) for (const who of ["center", "student", "teacher"]) {   /* कन्नड़ और बांग्ला: dev_panel_lang_check.js (वहाँ English शब्द भी पकड़े जाते हैं) */
    const c = await openNazar(pg(who), lang, "?nazar=" + NZ_REG);
    c.w.prompt = () => "x"; for (const sel of ['[data-k1="abrep"]', '[data-k1="acc"]', '[data-nz="list"]']) { const b = c.d.querySelector(sel); if (b) { click(c, b); await settle(c); await settle(c); } }
    const UV = Array.from(c.userVals), L = hindiLeaks(c).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV.forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
    ck("नज़र " + who + " [" + lang + "]: हिंदी शून्य", L.length === 0, L.length + " जगह: " + L.slice(0, 6).join("  ‖  ")); c.dom.window.close(); }
}
async function hdataChecks(pages, all) {
  const UV = Object.keys(HU).map(k => HU[k]).concat([NAME_HI, "सीता देवी"]);
  const seen = {}; UV.forEach(v => { seen[v] = 0; });
  const LIST = ["student", "jobseeker", "entrepreneur", "center", "workshop", "teacher", "admin", "founder", "regional", "zonal"];
  for (const f of pages.filter(f => LIST.indexOf(f.split("/")[1]) > -1)) {
    const tag = f.split("/")[1] + " [हिंदी data]";
    try {
      const e = await openH(f, "en"), h = await openH(f, "hi");
      UV.forEach(v => { e.userVals.add(v); e.userVals.add(v.trim()[0]); });
      const L = hindiLeaks(e).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV.forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
      L.forEach(x => { const k = x.replace(/^\[skip-ज़ोन\] /, ""); INV.set(k, (INV.get(k) || []).concat(tag)); });
      ck(tag + " : English में हिंदी शून्य (उपयोगकर्ता का अपना लिखा छोड़कर)", L.length === 0, L.length + " जगह: " + L.slice(0, 6).join("  ‖  "));
      const tE = visText(e), tH = visText(h), bad = [];
      UV.forEach(v => { const a = countOf(tH, v), b = countOf(tE, v); seen[v] += a; if (a !== b) bad.push(v + " (हिंदी में " + a + " बार, English में " + b + ")"); });
      ck(tag + " : उपयोगकर्ता का लिखा हर पाठ English में भी उतनी ही बार, अक्षर-अक्षर वैसा", bad.length === 0, bad.slice(0, 5).join(" ‖ "));
      /* हिंदी पन्ना: इंजन की नई चीज़ों से कुछ न बदले (पुराने live से मिलान खेप के AUDIT में) */
      const er = e.errors.concat(h.errors); ck(tag + " : JS-त्रुटि शून्य", er.length === 0, er.slice(0, 3).join(" ‖ "));
      if (f.split("/")[1] === "student") {
        const body = tE;
        ck("student [हिंदी data] : कोर्स का सहेजा नाम English में (सूची से), उद्यम और क्षेत्र के नाम English में", /Data Entry Operator/.test(body) && /Computer Operator/.test(body) && /Rice/.test(body) && /🌾 Agriculture/.test(body) && /🏭 Manufacturing/.test(body) && !/धान/.test(body), body.match(/.{0,40}(धान|कृषि|ऑपरेटर).{0,40}/) ? body.match(/.{0,40}(धान|कृषि|ऑपरेटर).{0,40}/)[0] : "");
        /* परीक्षा: प्रश्न और विकल्प जैसे हैं वैसे; अक्षर A B C D; कोर्स का नाम English */
        const eb = e.d.querySelector("[data-exam]");
        if (eb) { click(e, eb); await waitFor(e, () => e.d.getElementById("xmStart"), 4000); await settle(e);
          const top = (e.d.querySelector(".xm-top") || {}).textContent || "";
          const st = e.d.getElementById("xmStart"); if (st) { click(e, st); await waitFor(e, () => e.d.querySelector(".xm-q"), 4000); await settle(e); await settle(e); }
          const q = (e.d.querySelector(".xm-q") || {}).textContent || "", ops = Array.from(e.d.querySelectorAll(".xm-opt span")).map(x => x.textContent), ab = Array.from(e.d.querySelectorAll(".xm-opt i")).map(x => x.textContent).join("");
          ck("परीक्षा : प्रश्न और विकल्प कोर्स की भाषा में, अक्षर-अक्षर वैसे (भाषा-इंजन नहीं छूता)", q.indexOf(HQ[0]) === 0 && ops.join("|") === HQ.slice(1).join("|"), q.slice(0, 80) + " ‖ " + ops.join("|"));
          ck("परीक्षा : विकल्प के अक्षर A B C D, और शीर्ष पर कोर्स का English नाम", ab === "ABCD" && /Motorcycle & Two-Wheeler Repair/.test(top) && !DEV.test(top), ab + " ‖ " + top.slice(0, 90));
          const ov = e.d.querySelector(".xm-top") && e.d.querySelector(".xm-top").parentElement;
          const lk = hindiLeaks(e).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV.concat(HQ).forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
          ck("परीक्षा : परीक्षा के पन्ने पर बाक़ी सब English में", !!ov && lk.length === 0, lk.slice(0, 4).join(" ‖ "));
        } else ck("परीक्षा : परीक्षा का बटन मिला", false, "data-exam नहीं");
      }
      if (f.split("/")[1] === "admin") {
        const op = Array.from(e.d.querySelectorAll("option[data-i18n-user]")).map(x => x.textContent);
        ck("admin [हिंदी data] : सूची के विकल्प में नाम वैसा ही, पद English में (\"" + HU.student + " — …\")", op.length > 0 && op.every(t => !DEV.test(t.split(HU.student).join("").split("सीता देवी").join(""))) && op.some(t => t.indexOf(HU.student + " — ") === 0), op.slice(0, 3).join(" ‖ "));
      }
      e.dom.window.close(); h.dom.window.close();
    } catch (err) { ck(tag + " : जाँच चली", false, String(err && err.stack || err).slice(0, 500)); }
  }
  const never = Object.keys(seen).filter(v => v !== NAME_HI && v !== "सीता देवी" && seen[v] === 0);
  if (all) ck("हिंदी data : नक़ली खाते का हर लिखा पाठ सचमुच किसी पन्ने पर दिखा (जाँच खोखली नहीं)", never.length === 0, "कहीं नहीं दिखा: " + never.join(" ‖ "));
  /* स्थिर: 24 क्षेत्रों के English नाम = करियर टेस्ट वाले; कोर्स-सूची के English नाम में देवनागरी नहीं */
  { const D = rd("assets/dashboard.js"), a = D.indexOf("const MG_EN = {"), b = D.indexOf("};", a); let T = null; try { T = new Function("return " + D.slice(a + 14, b + 1))(); } catch (e2) {}
    const src = rd("generator/data/aptitude/en/apt_en_strings.js"), mm = /mg:\s*\{([\s\S]*?)\}/.exec(src); let EN = null; try { EN = new Function("return {" + mm[1] + "}")(); } catch (e3) {}
    const sb = { window: {} }; new Function("window", rd("assets/mg_names.js"))(sb.window); const MG = sb.window.MG_NAMES || {};
    const bad = (T && EN) ? Object.keys(MG).filter(k => T[MG[k].n] !== EN[k]) : ["तालिका नहीं पढ़ी गई"];
    ck("हिंदी data : 24 क्षेत्रों के English नाम (MG_EN) करियर टेस्ट की English तालिका से मिलते हैं", !!T && Object.keys(T).length === 24 && Object.keys(MG).length === 24 && bad.length === 0, bad.join(","));
    const cd = rd("assets/courses_data.js"), bn = (cd.match(/"name_en": "[^"]*[ऀ-ॿ][^"]*"/g) || []);
    ck("हिंदी data : कोर्स-सूची के किसी English नाम (name_en) में देवनागरी नहीं", bn.length === 0, bn.slice(0, 3).join(" ‖ "));
  }
}

/* ════════ (v1.2, पैनल-4) काग़ज़ों की जाँच ════════ */
const APT_PREV = JSON.stringify({ prev: { at: Date.UTC(2026, 10, 10), sec: [{ nm: "🌾 कृषि", sc: 4 }], mg: ["🌾 कृषि", "🏭 विनिर्माण"],
  udy: [{ n: 1, nm: "धान/चावल (Rice)", c: "", s: 4.2 }, { n: 116, nm: "स्टील ढाँचा/वेल्डिंग (Steel Structures/Welding)", c: "/courses/hi/welding/", s: 3.1 }] } });
const CERT1 = { certNo: "ACS-C-2026-0001", status: "valid", examOn: "2026-11-08", issuedOn: "2026-11-09", validUntil: "2031-11-09", extend: { due: 100000, credit: 0, newValid: "2036-11-09" } };
const DOC_HANDLERS = {
  /* नाम पहले से सहेजा हुआ (माता: सीता देवी); नाम पूछने वाले डिब्बे की जाँचें अपना certList देती हैं (guardian: null) */
  certList: () => ({ certs: [CERT1], guardian: { rel: "mother", name: "सीता देवी" } }),
  latestAptitudeReport: () => ({ found: true, paidAt: Date.UTC(2026, 10, 10), reportText: "REPORT-BODY-LINE" }),
  reportNumber: () => ({ found: true, reportNo: "ACS-R-2026-0007", status: "valid", validUntil: "2031-11-12" }),
  checkAptitudeAttempt: () => ({ available: false })
};
async function openDoc(file, lang, mod, hx) {
  const info = pageInfo(file), data = fixture(info, "docs"), user = { uid: "u1", email: "ram@example.com" };
  if (mod) mod(data);
  const ls = { acs_apt_sess_v1: APT_PREV, acs_learn_progress: JSON.stringify({ read: { "/courses/hi/two-wheeler/twv-001-parichay.html": 1 } }) }; if (lang && lang !== "hi") ls.acs_dash_lang = lang;
  const c = await openPage(file, { transform: dashTransform, urlPath: "/" + file.replace(/index\.html$/, ""), ls, expect: (lang && lang !== "hi") ? lang : undefined,
    handlers: Object.assign({}, HANDLERS, DOC_HANDLERS, hx || {}), fb: makeFB(data, user) });
  await openAll(c); await settle(c); await settle(c);
  return c;
}
const decText = h => { try { return decodeURIComponent(String(h || "")); } catch (e) { return String(h || ""); } };
const docLinks = c => Array.from(c.d.querySelectorAll('a[href*="wa.me"],a[href*="youtube.com/results"],a[href*="aptitude-test.html"]')).filter(a => !a.closest("nav,footer,#acsFooter,.acs-footer"));
const stripUser = (t, vals) => { vals.forEach(v => { t = t.split(v).join(""); }); return t; };
function noErrDoc(c, tag) { const errs = c.errors.splice(0); ck(tag + " : JS-त्रुटि शून्य", errs.length === 0, errs.slice(0, 3).join(" ‖ ")); }
async function certClick(c) {
  c.canvasText.length = 0; c.saved.length = 0; c.dialogs.length = 0;
  const b = c.d.querySelector("[data-certdl]"); if (!b) return false;
  click(c, b); await waitFor(c, () => c.saved.length > 0, 4000); await settle(c); return true;
}
async function docChecks(pages) {
  const USERV = [NAME_HI, "सीता देवी"];
  const has = n => pages.find(f => f.split("/")[1] === n);
  const D = rd("assets/dashboard.js");
  /* -- स्थिर जाँचें -- */
  { const a = D.indexOf("const DOC_EN = {"), b = D.indexOf("};", a); let T = null; try { T = new Function("return " + D.slice(a + 15, b + 1))(); } catch (e) {}
    const sb = { window: {} }; new Function("window", rd("assets/i18n/panel_en.js"))(sb.window); const PK = sb.window.ACS_PANEL_PACKS.en.D;
    const bad = T ? Object.keys(T).filter(k => DEV.test(T[k]) || PK[k.trim()] === undefined || String(PK[k.trim()]).trim() !== T[k].trim()) : ["तालिका नहीं पढ़ी गई"];
    ck("काग़ज़ : काग़ज़ों के पक्के वाक्य (DOC_EN, " + (T ? Object.keys(T).length : 0) + ") English पैक में भी ठीक वही", !!T && Object.keys(T).length >= 11 && bad.length === 0, bad.slice(0, 4).join(" ‖ "));
    const fa = D.indexOf("async function certTextEn("), fb = D.indexOf("\n  }\n", fa); const body = D.slice(fa, fb).replace(/\/\*[\s\S]*?\*\//g, "");
    ck("काग़ज़ : English प्रमाणपत्र के कोड (certTextEn) में \"S/o\", \"D/o\" या \"Accreditations\" नहीं", fa > 0 && !/S\/o|D\/o|accredit/i.test(body), (body.match(/[^\n]*(S\/o|D\/o|ccredit)[^\n]*/) || [""])[0].slice(0, 120));
    ck("काग़ज़ : English प्रमाणपत्र के कोड (certTextEn) में देवनागरी का कोई अक्षर नहीं", fa > 0 && body.length > 2500 && !DEV.test(body), (body.match(/[^\n]*[ऀ-ॿ][^\n]*/) || [""])[0].slice(0, 120));
    const tg = (/tagline_en:\s*"([^"]+)"/.exec(rd("assets/acs-config.js")) || [])[1] || "";
    ck("काग़ज़ : English प्रमाणपत्र का नारा वही जो acs-config.js का tagline_en", tg.length > 10 && body.split('"' + tg + '"').length === 3, tg);
  }
  /* -- प्रमाणपत्र (विद्यार्थी) -- */
  if (has("student")) try {
    const f = has("student");
    const e = await openDoc(f, "en"); const okE = await certClick(e);
    const tE = e.canvasText.filter(z => z.w === 1240).map(z => z.t), devE = tE.filter(t => DEV.test(t));
    ck("प्रमाणपत्र : English पैनल में प्रमाणपत्र बना (" + tE.length + " पंक्तियाँ) और फ़ाइल सहेजी", okE && tE.length > 30 && e.saved[0] === "ACS-C-2026-0001.pdf", "बटन " + okE + ", सहेजा " + e.saved.join(",") + ", संदेश " + e.dialogs.slice(0, 1).join(""));
    ck("प्रमाणपत्र : English प्रमाणपत्र पर देवनागरी शून्य", tE.length > 30 && devE.length === 0, devE.slice(0, 4).join(" ‖ "));
    const need = ["Applied Computer School™", "Freedom Fighter Gangadhar Prasad Memorial Trust", "Online Course Completion Certificate", "This is to certify that", "Institutional Details", "ACS-C-2026-0001", "Certificate No", "Scan to verify", "Authorized Signatory", "Chief Trustee, FFGPMT", "We wish him/her a bright future."];
    ck("प्रमाणपत्र : English प्रमाणपत्र पर सब ज़रूरी पंक्तियाँ; नाम रजिस्ट्रेशन में उपयोगकर्ता का अपना लिखा रोमन नाम (Raam Kumar; मशीन वाला Ram Kumar नहीं)", /Name: Raam Kumar /.test(tE.join(" ") + " ") && !/Ram Kumar/.test(tE.join(" ")) && need.every(n => tE.indexOf(n) > -1), need.filter(n => tE.indexOf(n) < 0).join(" ‖ "));
    const para = tE.join(" ");
    /* (v1.2, ऑडिट की पकड़) रिश्ते की ख़ाली पंक्ति और "Accreditations" शब्द English प्रमाणपत्र पर नहीं */
    const REL = /\bS\/o\b|\bD\/o\b|\bW\/o\b|\bC\/o\b|_{4,}/i;   /* (v1.4) रिश्ता बताने वाली पंक्ति कभी नहीं; "Mother / Father / Guardian's name" वाली बिना-रिश्ते की रेखा Founder का फ़ैसला है */
    ck("प्रमाणपत्र : English प्रमाणपत्र पर \"S/o\", \"D/o\" या ख़ाली रेखा नहीं; उसकी जगह विद्यार्थी का चुना और server में सहेजा नाम (Mother's name: Sita Devi)", tE.length > 30 && !tE.some(t => REL.test(t)) && /Mother's name: Sita Devi /.test(para + " ") && !/Father's name|Guardian's name/.test(para), tE.filter(t => REL.test(t)).join(" ‖ ") + " | " + (/[A-Za-z']+ name: [^:]{0,30}/.exec(para.replace(/^.*?Name: /, "")) || [""])[0]);
    ck("प्रमाणपत्र : English प्रमाणपत्र पर \"Accreditations\" शब्द नहीं; शीर्षक \"Institutional Details\"", tE.length > 30 && !tE.some(t => /accredit/i.test(t)) && tE.indexOf("Institutional Details") > -1, tE.filter(t => /accredit|Registrations/i.test(t)).join(" ‖ "));
    ck("प्रमाणपत्र : कोर्स का नाम कोर्स-सूची का English नाम; परीक्षा-तिथि, अंक और जारी/मान्य तिथि", /Motorcycle & Two-Wheeler Repair, Servicing, EV & Entrepreneurship/.test(para) && /held on 8 November 2026, with/.test(para) && /72%/.test(para) && /Issued 09\.11\.2026 · Online verification valid till 09\.11\.2031 \(acslearn\.com\/verify\)/.test(para), para.slice(0, 300));
    /* हिंदी पर लौटकर वही बटन: हिंदी + English वाला पुराना रूप */
    click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e); await settle(e);
    await certClick(e); const tB = e.canvasText.filter(z => z.w === 1240).map(z => z.t);
    const h = await openDoc(f, "hi"); await certClick(h); const tH = h.canvasText.filter(z => z.w === 1240);
    const needH = ["अप्लाइड कंप्यूटर स्कूल™", "ऑनलाइन कोर्स-पूर्णता प्रमाणपत्र", "प्रमाणित किया जाता है कि", "हम इनके उज्ज्वल भविष्य की कामना करते हैं।", "प्रधान ट्रस्टी, FFGPMT", "130 भाषा में, गाँव से ग्लोबल साउथ तक!"];
    const jH = tH.map(z => z.t).join(" ");
    ck("प्रमाणपत्र : हिंदी पैनल में प्रमाणपत्र हिंदी + English वाला (" + tH.length + " पंक्तियाँ); \"नाम : …\" और सहेजा हुआ \"माता का नाम : सीता देवी\" (English में \"Mother's name: Sita Devi\"); \"S/o\" या ख़ाली रेखा नहीं", needH.every(n => tH.some(z => z.t === n)) && tH.filter(z => DEV.test(z.t)).length > 30 && jH.indexOf("नाम : " + NAME_HI) > -1 && jH.indexOf("Name: Ram Kumar") > -1 && jH.indexOf("माता का नाम : सीता देवी ") > -1 && jH.indexOf("Mother's name: Sita Devi ") > -1 && !/पिता का नाम|अभिभावक का नाम|Father's|Guardian's/.test(jH) && !tH.some(z => REL.test(z.t)), needH.filter(n => !tH.some(z => z.t === n)).join(" ‖ ") + " | " + jH.slice(jH.indexOf("नाम :"), jH.indexOf("नाम :") + 160));
    ck("प्रमाणपत्र : English से हिंदी पर लौटने के बाद प्रमाणपत्र = सीधे हिंदी में खोला प्रमाणपत्र", tB.length === tH.length && tB.every((t, i) => t === tH[i].t), tB.length + " बनाम " + tH.length);
    const pinOf = a => a.map(z => ({ id: z.id, w: z.w, t: z.t, x: z.x, y: z.y, font: z.font }));   /* छाप में वही खाने जो पहले से थे */
    if (process.env.ACS_CERT_DUMP) fs.writeFileSync(process.env.ACS_CERT_DUMP, JSON.stringify(pinOf(tH)));
    /* छाप: हिंदी प्रमाणपत्र की हर पंक्ति (पाठ, जगह, अक्षर-आकार)। हिंदी रूप जान-बूझकर बदले, तभी यह छाप बदलें।
       15-Nov-2026 (Founder का फ़ैसला): नाम की पंक्तियाँ बदलीं ("नाम :", "माता / पिता / अभिभावक का नाम :"); पुरानी छाप fb08a7a7…
       15-Nov-2026 (Founder का आदेश, दूसरा): ख़ाली रेखा की जगह विद्यार्थी का चुना नाम ("माता का नाम : सीता देवी"); पुरानी छाप 887edc4b… */
    const pin = require("crypto").createHash("sha256").update(JSON.stringify(pinOf(tH))).digest("hex");
    ck("प्रमाणपत्र : हिंदी प्रमाणपत्र की हर पंक्ति, जगह और अक्षर-आकार तय रूप जैसा (" + tH.length + " लिखावटें, छाप मिली)", pin === "e838ccee2fb748db69e339b37f879b02d166d9f195e511384b783fd95a5b4c72", pin);
    /* ---- (v1.6) नाम पूछने वाला डिब्बा: पिता / माता / अभिभावक; एक बार server में सहेजना ---- */
    {
      const mk = (over) => { const st = { g: null, saves: 0 }; return { st, hx: Object.assign({ certList: () => ({ certs: [CERT1], guardian: st.g }),
        certGuardianSave: (d) => { st.saves++; st.g = { rel: d.rel, name: d.name }; return { ok: true, saved: true, already: false, guardian: st.g }; } }, over || {}) }; };
      const box = c => c.d.getElementById("certGuardBox"), q = (c, sel) => box(c) && box(c).querySelector(sel);
      const vis = (c, id) => { const e1 = q(c, "#" + id); return !!e1 && e1.style.display !== "none"; };
      const type = (c, v) => { const i = q(c, "#cgName"); i.value = v; i.dispatchEvent(new c.w.Event("input", { bubbles: true })); };
      const press = async (c, id) => { click(c, q(c, "#" + id)); await settle(c); await settle(c); };
      const open1 = async (c) => { c.canvasText.length = 0; c.saved.length = 0; click(c, c.d.querySelector("[data-certdl]")); await waitFor(c, () => !!box(c), 3000); await settle(c); };
      const saveCalls = c => c.calls.filter(z => z.name === "certGuardianSave");
      /* English */
      let M = mk(); const m1 = await openDoc(f, "en", null, M.hx); await open1(m1);
      const radios = box(m1) ? Array.from(box(m1).querySelectorAll('input[type=radio][name="cgRel"]')) : [];
      ck("नाम-डिब्बा : प्रमाणपत्र का बटन दबाते ही डिब्बा खुला; प्रमाणपत्र अभी नहीं निकला", !!box(m1) && m1.saved.length === 0 && m1.canvasText.filter(z => z.w === 1240).length === 0);
      ck("नाम-डिब्बा : तीन बिंदु (पिता, माता, अभिभावक), एक ही समूह में (एक बार में एक ही चुना जा सके); पहले से कोई चुना नहीं", radios.length === 3 && radios.map(r => r.value).join() === "father,mother,guardian" && radios.every(r => !r.checked), radios.map(r => r.value + ":" + r.checked).join());
      const UV1 = USERV.concat([NAME_HI.trim()[0]]), cleanLeak = c => hindiLeaks(c).filter(x => { let y = x.replace(/^\[skip-ज़ोन\] /, ""); UV1.forEach(v => { y = y.split(v).join(""); }); return DEV.test(y); });
      const leak1 = cleanLeak(m1);
      const bt = box(m1) ? box(m1).textContent : "";
      ck("नाम-डिब्बा : English में डिब्बे में देवनागरी शून्य; तीनों लेबल और चेतावनी English में", leak1.length === 0 && /Father's name:/.test(bt) && /Mother's name:/.test(bt) && /Guardian's name:/.test(bt) && /saved on the server forever/.test(bt) && /not be able to change it later/.test(bt), leak1.slice(0, 3).join(" ‖ "));
      await press(m1, "cgNext");
      ck("नाम-डिब्बा : बिना बिंदु चुने आगे नहीं बढ़ता (संदेश दिखता है); server को कुछ नहीं गया", vis(m1, "cgStep1") && /First choose one of the three/.test(q(m1, "#cgErr").textContent) && saveCalls(m1).length === 0, q(m1, "#cgErr").textContent);
      radios[0].click(); radios[1].click(); await settle(m1);
      ck("नाम-डिब्बा : दूसरा बिंदु चुनते ही पहला हट जाता है", radios.filter(r => r.checked).length === 1 && radios[1].checked);
      const badNames = ["", "S", "Sita 123", "Sita@Devi", "12345", "<b>Sita</b>"]; let badOk = true, badInfo = "";
      for (const bn of badNames) { type(m1, bn); await press(m1, "cgNext"); if (!(vis(m1, "cgStep1") && /name is not correct/.test(q(m1, "#cgErr").textContent))) { badOk = false; badInfo = bn; } }
      ck("नाम-डिब्बा : ग़लत नाम (ख़ाली, एक अक्षर, अंक, चिह्न) पर आगे नहीं बढ़ता; server को कुछ नहीं गया", badOk && saveCalls(m1).length === 0, badInfo);
      type(m1, "  Sita   Devi "); await press(m1, "cgNext");
      ck("नाम-डिब्बा : सही नाम पर \"एक बार फिर देख लीजिए\": चुना रिश्ता और नाम दिखते हैं; अभी तक server को कुछ नहीं गया", vis(m1, "cgStep2") && !vis(m1, "cgStep1") && q(m1, "#cgShowRel").textContent === "Mother's name:" && q(m1, "#cgShowName").textContent === "Sita Devi" && saveCalls(m1).length === 0, q(m1, "#cgShowRel").textContent + " " + q(m1, "#cgShowName").textContent);
      await press(m1, "cgBack");
      ck("नाम-डिब्बा : \"बदलें\" से वापस; चुनाव और नाम बने रहते हैं", vis(m1, "cgStep1") && radios[1].checked && /Sita/.test(q(m1, "#cgName").value));
      await press(m1, "cgNext"); await press(m1, "cgSave"); await waitFor(m1, () => vis(m1, "cgStep3"), 3000); await settle(m1);
      const sc = saveCalls(m1);
      ck("नाम-डिब्बा : \"सहेजें\" पर server को ठीक एक माँग: {rel: mother, name: Sita Devi}", sc.length === 1 && JSON.stringify(sc[0].data) === JSON.stringify({ rel: "mother", name: "Sita Devi" }), JSON.stringify(sc.map(z => z.data)));
      ck("नाम-डिब्बा : सहेजने की सूचना दिखी (\"saved on the server forever\"); प्रमाणपत्र अभी नहीं निकला", vis(m1, "cgStep3") && /The name has been saved on the server forever/.test(q(m1, "#cgDoneHead").textContent) && q(m1, "#cgDoneRel").textContent === "Mother's name:" && q(m1, "#cgDoneName").textContent === "Sita Devi" && m1.saved.length === 0, q(m1, "#cgDoneHead").textContent);
      const leak3 = cleanLeak(m1);
      click(m1, q(m1, "#cgGo")); await waitFor(m1, () => m1.saved.length > 0, 4000); await settle(m1);
      const tm = m1.canvasText.filter(z => z.w === 1240).map(z => z.t).join(" ");
      ck("नाम-डिब्बा : फिर प्रमाणपत्र निकला, उस पर वही नाम (Mother's name: Sita Devi); डिब्बा बंद; देवनागरी शून्य", m1.saved[0] === "ACS-C-2026-0001.pdf" && /Mother's name: Sita Devi /.test(tm + " ") && !box(m1) && !DEV.test(tm) && leak3.length === 0, tm.slice(tm.indexOf("Name:"), tm.indexOf("Name:") + 90));
      m1.canvasText.length = 0; m1.saved.length = 0; click(m1, m1.d.querySelector("[data-certdl]")); await waitFor(m1, () => m1.saved.length > 0, 4000); await settle(m1);
      ck("नाम-डिब्बा : दोबारा बटन दबाने पर नहीं पूछा जाता; server को दूसरी माँग नहीं; प्रमाणपत्र सीधे निकला", !box(m1) && saveCalls(m1).length === 1 && m1.saved.length === 1 && /Mother's name: Sita Devi /.test(m1.canvasText.filter(z => z.w === 1240).map(z => z.t).join(" ") + " "));
      noErrDoc(m1, "नाम-डिब्बा (English)"); m1.dom.window.close();
      /* रद्द */
      M = mk(); const m2 = await openDoc(f, "en", null, M.hx); await open1(m2); await press(m2, "cgCancel");
      ck("नाम-डिब्बा : \"रद्द करें\" पर डिब्बा बंद; कुछ नहीं सहेजा; प्रमाणपत्र नहीं निकला", !box(m2) && saveCalls(m2).length === 0 && m2.saved.length === 0 && m2.canvasText.filter(z => z.w === 1240).length === 0);
      m2.dom.window.close();
      /* server की ग़लती, फिर दोबारा कोशिश */
      let failN = 0; M = mk({ certGuardianSave: (d) => { failN++; if (failN === 1) { const e9 = new Error("नाम सही नहीं है। नाम में सिर्फ़ अक्षर हों (2 से 60), अंक या चिह्न नहीं।"); throw e9; } return { ok: true, saved: true, already: false, guardian: { rel: d.rel, name: d.name } }; } });
      const m3 = await openDoc(f, "en", null, M.hx); await open1(m3);
      box(m3).querySelectorAll('input[name="cgRel"]')[2].click(); type(m3, "Mohan Lal"); await press(m3, "cgNext"); await press(m3, "cgSave"); await settle(m3);
      ck("नाम-डिब्बा : server मना करे, तो संदेश डिब्बे में (English में); प्रमाणपत्र नहीं निकला; बटन फिर चालू", vis(m3, "cgStep2") && /name is not correct/.test(q(m3, "#cgErr2").textContent) && !DEV.test(q(m3, "#cgErr2").textContent) && m3.saved.length === 0 && !q(m3, "#cgSave").disabled, q(m3, "#cgErr2").textContent);
      await press(m3, "cgSave"); await waitFor(m3, () => vis(m3, "cgStep3"), 3000); click(m3, q(m3, "#cgGo")); await waitFor(m3, () => m3.saved.length > 0, 4000); await settle(m3);
      ck("नाम-डिब्बा : दोबारा कोशिश सफल: Guardian's name: Mohan Lal छपा", /Guardian's name: Mohan Lal /.test(m3.canvasText.filter(z => z.w === 1240).map(z => z.t).join(" ") + " "));
      m3.dom.window.close();
      /* दूसरे फ़ोन से पहले ही सहेजा जा चुका: server का नाम ही छपता है, अभी लिखा हुआ नहीं */
      M = mk({ certGuardianSave: () => ({ ok: true, saved: false, already: true, guardian: { rel: "father", name: "Hari Prasad" } }) });
      const m4 = await openDoc(f, "en", null, M.hx); await open1(m4);
      box(m4).querySelectorAll('input[name="cgRel"]')[1].click(); type(m4, "Kuchh Aur"); await press(m4, "cgNext"); await press(m4, "cgSave"); await waitFor(m4, () => vis(m4, "cgStep3"), 3000); await settle(m4);
      const head4 = q(m4, "#cgDoneHead").textContent, name4 = q(m4, "#cgDoneName").textContent;
      click(m4, q(m4, "#cgGo")); await waitFor(m4, () => m4.saved.length > 0, 4000); await settle(m4);
      const t4 = m4.canvasText.filter(z => z.w === 1240).map(z => z.t).join(" ");
      ck("नाम-डिब्बा : नाम पहले से सहेजा हो (दूसरे फ़ोन से), तो वही दिखता और छपता है (Father's name: Hari Prasad), नया लिखा नहीं", /already saved/.test(head4) && name4 === "Hari Prasad" && /Father's name: Hari Prasad /.test(t4 + " ") && t4.indexOf("Kuchh") < 0, head4 + " | " + name4);
      m4.dom.window.close();
      /* रजिस्ट्रेशन का "पिता/माता का नाम" पहले से भरा; हिंदी पैनल */
      M = mk(); const m5 = await openDoc(f, "hi", data => { data.registrations.r1.father_name = "SURESH KUMAR"; }, M.hx); await open1(m5);
      const b5 = box(m5).textContent;
      ck("नाम-डिब्बा (हिंदी) : तीनों लेबल और चेतावनी हिंदी में; रजिस्ट्रेशन का नाम पहले से भरा, पर रिश्ता विद्यार्थी ख़ुद चुनता है", /पिता का नाम :/.test(b5) && /माता का नाम :/.test(b5) && /अभिभावक का नाम :/.test(b5) && /server में हमेशा के लिए सहेजा जाएगा/.test(b5) && q(m5, "#cgName").value === "SURESH KUMAR" && !box(m5).querySelector('input[name="cgRel"]:checked'), q(m5, "#cgName").value);
      box(m5).querySelectorAll('input[name="cgRel"]')[0].click(); type(m5, "सुरेश कुमार"); await press(m5, "cgNext"); await press(m5, "cgSave"); await waitFor(m5, () => vis(m5, "cgStep3"), 3000); await settle(m5);
      const head5 = q(m5, "#cgDoneHead").textContent; click(m5, q(m5, "#cgGo")); await waitFor(m5, () => m5.saved.length > 0, 4000); await settle(m5);
      const t5 = m5.canvasText.filter(z => z.w === 1240).map(z => z.t).join(" ");
      ck("नाम-डिब्बा (हिंदी) : सहेजने की सूचना हिंदी में; प्रमाणपत्र पर \"पिता का नाम : सुरेश कुमार\" और English में \"Father's name: Suresh Kumar\"", /नाम server में हमेशा के लिए सहेज लिया गया/.test(head5) && JSON.stringify(saveCalls(m5)[0].data) === JSON.stringify({ rel: "father", name: "सुरेश कुमार" }) && /पिता का नाम : सुरेश कुमार /.test(t5 + " ") && /Father's name: Suresh Kumar /.test(t5 + " "), head5 + " | " + t5.slice(t5.indexOf("नाम :"), t5.indexOf("नाम :") + 120));
      noErrDoc(m5, "नाम-डिब्बा (हिंदी)"); m5.dom.window.close();
    }
    /* ---- (v1.6; ऑडिट की पकड़) बहुत लंबा नाम: नाम वाली हर लिखावट सुरक्षित किनारे (120..1120) के भीतर; ज़्यादा-से-ज़्यादा 2 पंक्तियाँ ---- */
    {
      const LONGS = [
        ["English, 6 लंबे शब्द", "en", "Venkata Subrahmanya Lakshminarasimha Ramachandra Chaturvedi Bhattacharya", { rel: "guardian", name: "Thiruvenkatanathapuram Subrahmanya Ramachandra Chaturvedi Iyer" }],
        ["English, 100 अक्षर का एक ही शब्द", "en", "Venkatanarasimharajuvaripetasubrahmanyalakshminarasimharamachandrachaturvedibhattacharyamukhopadhyayji", { rel: "father", name: "Aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffff" }],
        ["English, 18 शब्द", "en", "Abcdefghij Klmnopqrst Uvwxyzabcd Efghijklmn Opqrstuvwx Yzabcdefgh Ijklmnopqr Stuvwxyzab Cdefghijkl Mnopqrstuv Wxyzabcdef Ghijklmnop Qrstuvwxyz Abcdefghij Klmnopqrst Uvwxyzabcd Efghijklmn Opqrstuvwx", { rel: "mother", name: "Sita Devi" }],
        ["हिंदी, 7 लंबे शब्द", "hi", "वेंकट सुब्रह्मण्य लक्ष्मीनरसिंह रामचंद्र चतुर्वेदी भट्टाचार्य मुखोपाध्याय", { rel: "guardian", name: "श्रीमती लक्ष्मीनारायणी सुब्रह्मण्य रामचंद्र चतुर्वेदी भट्टाचार्य" }],
        ["हिंदी, एक ही बहुत लंबा शब्द", "hi", "वेंकटनरसिंहराजुवारिपेटसुब्रह्मण्यलक्ष्मीनरसिंहरामचंद्रचतुर्वेदीभट्टाचार्यमुखोपाध्यायजीमहाराजश्रीमानपंडित", { rel: "mother", name: "सीता देवी" }]];
      /* आधार: सामान्य नाम वाले प्रमाणपत्र की आख़िरी पंक्ति कहाँ है (लंबा नाम पन्ने को नीचे नहीं धकेलना चाहिए) */
      const BASE = {}; for (const lg0 of ["en", "hi"]) { const cB = await openDoc(f, lg0); await certClick(cB); BASE[lg0] = Math.max.apply(null, cB.canvasText.filter(z => z.w === 1240 && z.t !== "ACS · FFGPMT").map(z => z.y)); cB.dom.window.close(); }
      for (const [nm, lg, lname, gd] of LONGS) {
        const cL = await openDoc(f, lg, data => { data.certificates.c1.name = lname; data.registrations.r1.name_local = lname; data.registrations.r1.name_roman = lg === "en" ? lname : ""; }, { certList: () => ({ certs: [CERT1], guardian: gd }) });
        [lname, gd.name].forEach(v => cL.userVals && cL.userVals.add(v));
        await certClick(cL); const all = cL.canvasText.filter(z => z.w === 1240);
        const i0 = all.findIndex(z => z.t === (lg === "en" ? "This is to certify that" : "प्रमाणित किया जाता है कि")), i1 = all.findIndex((z, i) => i > i0 && z.t === (lg === "en" ? "has" : "ने"));
        const blk = i0 > -1 && i1 > i0 ? all.slice(i0 + 1, i1) : [];
        const out = blk.filter(z => z.L < 120 - 0.01 || z.R > 1120 + 0.01), rows = Array.from(new Set(blk.map(z => z.y))).length;
        const maxRows = lg === "en" ? 4 : 8;   /* English: नाम ≤2 + सहेजा नाम ≤2; हिंदी: चार पंक्तियाँ, हर एक ≤2 */
        ck("लंबा नाम (" + nm + ") : नाम वाली हर लिखावट किनारे के भीतर (बायाँ ≥ 120, दायाँ ≤ 1120); " + blk.length + " लिखावटें, " + rows + " पंक्तियाँ", cL.saved.length === 1 && blk.length >= 3 && out.length === 0 && rows <= maxRows,
          "बाहर " + out.length + ": " + out.slice(0, 3).map(z => z.t.slice(0, 24) + " @" + Math.round(z.L) + ".." + Math.round(z.R)).join(" ; ") + " | पंक्तियाँ " + rows);
        const bottom = Math.max.apply(null, all.filter(z => z.t !== "ACS · FFGPMT").map(z => z.y));
        ck("लंबा नाम (" + nm + ") : लंबा नाम पन्ने को नीचे नहीं धकेलता (आख़िरी पंक्ति सामान्य नाम वाले प्रमाणपत्र से 12 से ज़्यादा नीचे नहीं)", BASE[lg] > 1500 && bottom <= BASE[lg] + 12, "y " + bottom + " बनाम सामान्य " + BASE[lg]);
        cL.dom.window.close();
      }
    }
    /* नाम रोमन में न लिखा हो, या नाम में ऑ हो */
    const e2 = await openDoc(f, "en", data => { data.registrations.r1.name_local = "डॉली कुमारी"; data.registrations.r1.name_roman = ""; data.certificates.c1.name = "डॉली कुमारी"; data.certificates.c1.courseId = "ZZ999"; data.certificates.c1.courseName = "सिलाई कोर्स (Tailoring Course)"; });
    await certClick(e2); const t2 = e2.canvasText.filter(z => z.w === 1240).map(z => z.t);
    ck("प्रमाणपत्र : रोमन नाम न लिखा हो, तो हिंदी नाम का रोमन रूप (डॉली कुमारी = Doli Kumari); सूची से बाहर का कोर्स = नाम के कोष्ठक का English; लड़की के प्रमाणपत्र पर भी S/o नहीं", t2.join(" ").indexOf("Name: Doli Kumari") > -1 && t2.join(" ").indexOf("Tailoring Course") > -1 && !t2.some(t => DEV.test(t)) && !t2.some(t => REL.test(t) || /accredit/i.test(t)), t2.filter(t => DEV.test(t) || /Kumari|Tailor/.test(t)).slice(0, 4).join(" ‖ "));
    const e3 = await openDoc(f, "en", data => { data.certificates.c1.courseId = "ZZ999"; data.certificates.c1.courseName = "सिलाई कोर्स"; });
    await certClick(e3); const t3 = e3.canvasText.filter(z => z.w === 1240).map(z => z.t);
    ck("प्रमाणपत्र : कोर्स का English नाम कहीं न मिले, तो कोर्स का कोड (ZZ999); देवनागरी फिर भी शून्य", t3.join(" ").indexOf("ZZ999") > -1 && !t3.some(t => DEV.test(t)), t3.filter(t => DEV.test(t)).slice(0, 3).join(" ‖ "));
    /* कड़ियाँ: WhatsApp, YouTube, अभिरुचि-परीक्षण */
    const e4 = await openDoc(f, "en"); const LE = docLinks(e4), h4 = await openDoc(f, "hi"), LH = docLinks(h4);
    const wa = LE.filter(a => /wa\.me|youtube/.test(a.getAttribute("href")));
    const badL = LE.filter(a => DEV.test(stripUser(decText(a.getAttribute("href")), USERV)));
    ck("कड़ियाँ (विद्यार्थी) : English में WhatsApp/YouTube के पहले से लिखे पाठ में देवनागरी शून्य (" + wa.length + " कड़ियाँ)", wa.length >= 4 && badL.length === 0, badL.slice(0, 3).map(a => decText(a.getAttribute("href")).slice(0, 140)).join(" ‖ "));
    const txt = wa.map(a => decText(a.getAttribute("href"))).join("\n");
    ck("कड़ियाँ (विद्यार्थी) : English संदेश सही (कोर्स माँगना, referral, रिपोर्ट, YouTube)", /I want this course: Rice/.test(txt) && /Free learning at ACS! Join with my link: https:\/\/acslearn\.com\/join\.html\?ref=ACS-2026-123456/.test(txt) && /REPORT-BODY-LINE\nReport number: ACS-R-2026-0007 · online verification: acslearn\.com\/verify · valid until 12\.11\.2031/.test(txt) && /search_query=Rice expert documentary/.test(txt), txt.slice(0, 500));
    const apt = LE.filter(a => /aptitude-test\.html/.test(a.getAttribute("href"))), aptH = LH.filter(a => /aptitude-test\.html/.test(a.getAttribute("href")));
    ck("कड़ियाँ (विद्यार्थी) : अभिरुचि-परीक्षण की कड़ी English में English पन्ने पर (" + apt.length + "), हिंदी में हिंदी पन्ने पर (" + aptH.length + ")", apt.length >= 2 && apt.every(a => a.getAttribute("href").indexOf("/en/aptitude-test.html") === 0) && aptH.length === apt.length && aptH.every(a => a.getAttribute("href").indexOf("/aptitude-test.html") === 0), apt.concat(aptH).map(a => a.getAttribute("href")).join(" | "));
    const hrefH = LH.map(a => a.getAttribute("href"));
    ck("कड़ियाँ (विद्यार्थी) : हिंदी पैनल में कड़ियाँ हिंदी में (" + hrefH.length + ")", hrefH.length === LE.length && hrefH.some(x => /मुझे यह कोर्स चाहिए: धान/.test(decText(x))) && hrefH.some(x => /रिपोर्ट नंबर: ACS-R-2026-0007/.test(decText(x))), hrefH.map(decText).join(" | ").slice(0, 300));
    click(e4, e4.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e4); await settle(e4);
    const back = docLinks(e4).map(a => a.getAttribute("href"));
    ck("कड़ियाँ (विद्यार्थी) : English से हिंदी पर लौटते ही हर कड़ी हिंदी वाली", back.length === hrefH.length && back.every((x, i) => x === hrefH[i]), back.filter((x, i) => x !== hrefH[i]).slice(0, 2).map(decText).join(" ‖ ").slice(0, 300));
    click(e4, e4.d.querySelector('#acsPanelLangBar button[data-plang="en"]')); await waitFor(e4, () => e4.w.ACS_PANEL_I18N.active, 3000); await settle(e4); await settle(e4);
    const again = docLinks(e4).map(a => a.getAttribute("href")), wantE = LE.map(a => a.getAttribute("href"));
    ck("कड़ियाँ (विद्यार्थी) : फिर English = फिर English वाली कड़ियाँ", again.length === wantE.length && again.every((x, i) => x === wantE[i]), again.filter((x, i) => x !== wantE[i]).slice(0, 2).map(decText).join(" ‖ ").slice(0, 300));
    /* रिपोर्ट की छपाई */
    e4.printed.length = 0; click(e4, e4.d.getElementById("apt-old-print")); await settle(e4);
    h4.printed.length = 0; click(h4, h4.d.getElementById("apt-old-print")); await settle(h4);
    ck("छपाई : सहेजी रिपोर्ट की छपाई English पैनल में English, हिंदी पैनल में हिंदी", e4.printed.length === 1 && !DEV.test(e4.printed[0]) && /Report number: ACS-R-2026-0007/.test(e4.printed[0]) && h4.printed.length === 1 && /रिपोर्ट नंबर: ACS-R-2026-0007 · online जाँच: acslearn\.com\/verify · मान्य: 12\.11\.2031 तक/.test(h4.printed[0]), (e4.printed[0] || "").slice(0, 160) + " ‖ " + (h4.printed[0] || "").slice(0, 160));
    const noEl = e4.d.getElementById("apt-old-no");
    ck("छपाई : रिपोर्ट-नंबर की पंक्ति पन्ने पर भी English में पूरी (पहले अंत में \"तक\" बचता था)", !!noEl && !DEV.test(noEl.textContent) && /valid until 12\.11\.2031/.test(noEl.textContent), noEl && noEl.textContent);
    /* इंजन v1.4: बाद में बनी कड़ी, और href दोबारा लिखी जाए */
    const a1 = e4.d.createElement("a"); a1.setAttribute("href", "/hi-1"); a1.setAttribute("data-href-en", "/en-1"); a1.textContent = "x"; e4.d.getElementById("appView").appendChild(a1); await settle(e4); await settle(e4);
    const s1 = a1.getAttribute("href"); a1.setAttribute("href", "/hi-2"); a1.setAttribute("data-href-en", "/en-2"); await settle(e4); await settle(e4);
    const s2 = a1.getAttribute("href"); click(e4, e4.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e4); await settle(e4);
    ck("इंजन v1.4 : बाद में बनी कड़ी भी English पते पर; href दोबारा लिखी जाए, तो नया हिंदी पता ही मूल", s1 === "/en-1" && s2 === "/en-2" && a1.getAttribute("href") === "/hi-2", s1 + " | " + s2 + " | " + a1.getAttribute("href"));
    const er = [e, h, e2, e3, e4, h4].reduce((a, x) => a.concat(x.errors), []); ck("काग़ज़ (विद्यार्थी) : JS-त्रुटि शून्य", er.length === 0, er.slice(0, 3).join(" ‖ "));
    [e, h, e2, e3, e4, h4].forEach(x => x.dom.window.close());
  } catch (err) { ck("काग़ज़ (विद्यार्थी) : जाँच चली", false, String(err && err.stack || err).slice(0, 500)); }
  /* -- केंद्र: रसीद, ID बाँटना, परिचय-पत्र -- */
  if (has("center")) try {
    const f = has("center");
    const e = await openDoc(f, "en"), h = await openDoc(f, "hi");
    const LE = docLinks(e).filter(a => /wa\.me/.test(a.getAttribute("href"))), LH = docLinks(h).filter(a => /wa\.me/.test(a.getAttribute("href")));
    const txt = LE.map(a => decText(a.getAttribute("href"))).join("\n"), txtH = LH.map(a => decText(a.getAttribute("href"))).join("\n");
    const badL = LE.filter(a => DEV.test(stripUser(decText(a.getAttribute("href")), USERV)));
    ck("कड़ियाँ (केंद्र) : English में रसीद और ID वाले WhatsApp-संदेश English में (" + LE.length + "); विद्यार्थी का अपना नाम जैसा है वैसा", LE.length >= 3 && badL.length === 0 &&
      /ACS receipt: सीता देवी \(ACS-2026-999999\) · Computer Operator · R-0001 ₹500/.test(txt) && /ACS receipt: सीता देवी \(ACS-2026-888888\) · Data Entry Operator · No fee entries/.test(txt) &&
      /To join my center, search this ID on ACS: ACS-2026-123456 \(acslearn\.com\)/.test(txt), txt.slice(0, 500));
    ck("कड़ियाँ (केंद्र) : हिंदी में वही संदेश हिंदी में", LH.length === LE.length && /ACS रसीद — सीता देवी \(ACS-2026-999999\) · कंप्यूटर ऑपरेटर \(Computer Operator\) · R-0001 ₹500/.test(txtH) && /कोई फीस-प्रविष्टि नहीं/.test(txtH) && /मेरे केंद्र से जुड़ने के लिए ACS पर यह ID खोजें: ACS-2026-123456 — acslearn\.com/.test(txtH), txtH.slice(0, 400));
    /* परिचय-पत्र */
    const mk = async (c) => { c.canvasText.length = 0; typeIn(c, c.d.getElementById("idName"), "Sita Devi"); typeIn(c, c.d.getElementById("idRole"), "Computer Operator"); typeIn(c, c.d.getElementById("idNo"), "ACS-2026-999999"); click(c, c.d.getElementById("idMake")); await settle(c); return c.canvasText.map(z => z.t); };
    const cE = await mk(e), cH = await mk(h);
    ck("परिचय-पत्र : English पैनल में कार्ड के पक्के शब्द English में, देवनागरी शून्य (" + cE.length + " पंक्तियाँ)", cE.length >= 8 && !cE.some(t => DEV.test(stripUser(t, USERV))) && cE.indexOf("Applied Computer School™") > -1 && cE.indexOf("👨‍🏫 Staff ID Card") > -1 && cE.indexOf("📅 Valid: 365 days from issue date") > -1, cE.filter(t => DEV.test(t)).join(" ‖ ") + " | " + cE.slice(0, 6).join(" | "));
    ck("परिचय-पत्र : हिंदी पैनल में कार्ड पहले जैसा", cH.indexOf("अप्लाइड कंप्यूटर स्कूल™") > -1 && cH.indexOf("👨‍🏫 Staff परिचय-पत्र") > -1 && cH.indexOf("📅 वैध: जारी-तिथि से 365 दिन") > -1 && cH.length === cE.length, cH.slice(0, 6).join(" | "));
    e.canvasText.length = 0; click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e); await settle(e);
    const cB = e.canvasText.map(z => z.t);
    ck("परिचय-पत्र : भाषा बदलते ही बना हुआ कार्ड नई भाषा में दोबारा बनता है", cB.length === cH.length && cB.every((t, i) => t === cH[i]), cB.slice(0, 5).join(" | "));
    const er = e.errors.concat(h.errors); ck("काग़ज़ (केंद्र) : JS-त्रुटि शून्य", er.length === 0, er.slice(0, 3).join(" ‖ "));
    e.dom.window.close(); h.dom.window.close();
  } catch (err) { ck("काग़ज़ (केंद्र) : जाँच चली", false, String(err && err.stack || err).slice(0, 500)); }
}
module.exports = { openNazar, nazarChecks, k1Checks, roopChecks, ocChecks, tally: () => ({ pass: pass, fail: fail }), dashTransform, makeFB, fixture, openDash, openAll, pageInfo, HANDLERS, NAME_HI, openDoc, openH, certClick, docLinks, decText, HU, HQ, visText, countOf };
if (require.main === module) (async function main() {
  const only = process.argv[2] || "";
  const listPages = () => fs.readdirSync(path.join(ROOT, "dashboard"), { withFileTypes: true }).filter(e => e.isDirectory())
    .flatMap(e => e.name === "hq" ? fs.readdirSync(path.join(ROOT, "dashboard/hq")).map(x => "dashboard/hq/" + x + "/index.html") : ["dashboard/" + e.name + "/index.html"])
    .filter(f => fs.existsSync(path.join(ROOT, f)) && f.indexOf(only) > -1).sort();
  if (process.env.ACS_DUMP) { await dumpHindi(listPages(), process.env.ACS_DUMP); console.log("dump लिखा"); process.exit(0); }
  const pages = fs.readdirSync(path.join(ROOT, "dashboard"), { withFileTypes: true }).filter(e => e.isDirectory())
    .flatMap(e => e.name === "hq" ? fs.readdirSync(path.join(ROOT, "dashboard/hq")).map(x => "dashboard/hq/" + x + "/index.html") : ["dashboard/" + e.name + "/index.html"])
    .filter(f => fs.existsSync(path.join(ROOT, f)) && f.indexOf(only) > -1).sort();
  for (const f of pages.filter(() => !process.env.ACS_ONLY_HI)) { try { await runPage(f); } catch (e) { ck(f + " : robot चला", false, String(e && e.stack || e).slice(0, 400)); } }
  /* भरा हुआ खाता और जाँच-में (provisional) खाता */
  const SC = { data: ["student", "jobseeker", "entrepreneur", "center", "teacher", "volunteer", "admin", "founder", "regional", "zonal"], prov: ["teacher", "center", "vendor", "employer", "foreign-agent", "finance-mitra"] };
  for (const sc of Object.keys(SC)) for (const f of pages.filter(f => !process.env.ACS_ONLY_HI && SC[sc].indexOf(f.split("/")[1]) > -1)) {
    try { await runPage(f, sc); } catch (e) { ck(f + " [" + sc + "] : robot चला", false, String(e && e.stack || e).slice(0, 400)); } }
  /* उपयोगकर्ता का नाम ऐसा हो जिसके शब्द पैक में भी हैं ("संगीत" = Music, "माली" = देश Mali): English में भी नाम वैसा ही रहे */
  for (const f of pages.filter(f => ["student", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const info = pageInfo(f), data = fixture(info, "base"); data.registrations.r1.name_local = "संगीत माली"; if (data.teams.u1) data.teams.u1.name_local = "संगीत माली";
      const c = await openPage(f, { transform: dashTransform, urlPath: "/" + f.replace(/index\.html$/, ""), ls: { acs_dash_lang: "en" }, expect: "en", handlers: Object.assign({}, HANDLERS), fb: makeFB(data, { uid: "u1", email: "ram@example.com" }) });
      await openAll(c);
      const who = c.d.getElementById("tbWho").textContent, pn = c.d.getElementById("pName").textContent, pb = (c.d.getElementById("pubName") || {}).textContent || "";
      ck(f.split("/")[1] + " : उपयोगकर्ता का नाम English में भी वैसा ही (\"संगीत माली\": ऊपर की पट्टी, प्रोफ़ाइल, पहचान-कार्ड)", who.indexOf("संगीत माली") > -1 && pn === "संगीत माली" && pb.indexOf("संगीत माली") > -1, who + " | " + pn + " | " + pb);
      c.dom.window.close();
    } catch (e) { ck(f + " : नाम-जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* (v1.1, पैनल-3) server के संदेश: सूची (server_msgs.json) का हर संदेश असली dashboard में, जैसे dashboard दिखाता है
     (अकेले, "नहीं हुआ: " के बाद, और संदेश-डिब्बे में); {n} की जगह नमूना-मान। फिर हिंदी पर लौटकर मूल वापस। */
  for (const f of pages.filter(f => ["student", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const SM = JSON.parse(rd("generator/data/panel_i18n/server_msgs.json")).msgs.map(x => x.hi);
      const fill = t => t.replace(/\{(\d+)\}/g, (_, d) => "X" + d + "7");
      const c = await openDash(f, "base", "en"), tag = f.split("/")[1];
      await waitFor(c, () => !c.d.getElementById("appView").classList.contains("hidden"), 6000); await settle(c);
      const box = c.d.createElement("div"); const want = [];
      SM.forEach((m, i) => { const p = c.d.createElement("p"), t = (i % 2 ? "नहीं हुआ: " : "") + fill(m); want.push(t); p.textContent = t; box.appendChild(p); });
      c.d.getElementById("appView").appendChild(box); await settle(c); await settle(c);
      const left = Array.from(box.children).map(p => p.textContent).filter(t => DEV.test(t));
      ck(tag + " : server के " + SM.length + " संदेश dashboard में English", SM.length > 250 && left.length === 0, left.length + " बचे: " + left.slice(0, 4).join(" ‖ "));
      c.dialogs.length = 0; SM.forEach(m => c.w.alert("काम पूरा नहीं हुआ: " + fill(m)));
      const dl = c.dialogs.filter(x => DEV.test(x));
      ck(tag + " : server के संदेश संदेश-डिब्बे में English (" + c.dialogs.length + ")", c.dialogs.length === SM.length && dl.length === 0, dl.slice(0, 3).join(" ‖ "));
      click(c, c.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(c); await settle(c);
      const back = Array.from(box.children).map(p => p.textContent);
      ck(tag + " : हिंदी पर लौटने पर server के संदेश मूल हिंदी में", back.length === want.length && back.every((t, i) => t === want[i]), back.filter((t, i) => t !== want[i]).slice(0, 3).join(" ‖ "));
      c.dom.window.close();
    } catch (e) { ck(f + " : server-संदेश जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  /* हिंदी: इंजन होने और न होने पर पन्ना अक्षर-अक्षर एक; English से हिंदी पर लौटना = ताज़ा हिंदी */
  for (const f of pages.filter(f => ["student", "center", "admin"].indexOf(f.split("/")[1]) > -1)) {
    try {
      const tag = f.split("/")[1];
      const hA = await openDash(f, "data", "hi"); const nA = await openAll(hA);
      const hB = await openDash(f, "data", "hi", true); await openAll(hB);
      ck(tag + " : हिंदी dashboard इंजन होने और न होने पर हूबहू (" + nA + " पैनल)", !hA.w.ACS_PANEL_I18N.active && bodyText(hA) === bodyText(hB) && hA.d.title === hB.d.title);
      const e = await openDash(f, "data", "en"); await openAll(e);
      click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e); await settle(e);
      const bE = bodyText(e), bH = bodyText(hA); let di = 0; while (di < bE.length && bE[di] === bH[di]) di++;
      ck(tag + " : English → हिंदी = बिल्कुल ताज़ा हिंदी", bE === bH && e.d.title === hA.d.title, "पहला फ़र्क़: …" + bE.slice(Math.max(0, di - 120), di + 160) + "…  ‖  …" + bH.slice(Math.max(0, di - 120), di + 160) + "…");
      [hA, hB, e].forEach(x => x.dom.window.close());
    } catch (e) { ck(f + " : हिंदी-जाँच चली", false, String(e && e.stack || e).slice(0, 300)); }
  }
  if (!process.env.ACS_ONLY_HI && (!only || /student|center/.test(only))) await docChecks(pages);
  if (!process.env.ACS_ONLY_HI) await hdataChecks(pages, !only);
  await k1Checks(pages);   /* (v1.8) कक्षा-परत के पर्दे */
  await nazarChecks(pages);   /* (v2.0) Founder का देखने वाला मोड */
  await roopChecks(pages);   /* (v2.4) नया रूप (design D-1) और "मेरा रूप" */
  await ocChecks(pages);   /* (v2.8) शिक्षक का paid online कोर्स (P-1b) */
  if (!only && !process.env.ACS_ONLY_HI) ck("नियम-पत्र का पैनल 13 dashboard में, हर एक की कड़ी जाँची (" + RULE_PAGES + ")", RULE_PAGES === 13, String(RULE_PAGES));
  if (process.env.ACS_INV) fs.writeFileSync(process.env.ACS_INV, Array.from(INV.entries()).map(([k, v]) => v.length + "\t" + Array.from(new Set(v)).join(",") + "\t" + k).sort().join("\n") + "\n");
  console.log("\nजाँचें: पास " + pass + " · फेल " + fail + " · पन्ने " + pages.length + " · समय " + Math.round((Date.now() - t0) / 1000) + " सेकंड");
  console.log(fail ? "⛔ dev_panel_dash_check रुका" : "🏁 dev_panel_dash_check v3.3 : सब dashboard, काग़ज़ और सहेजा हुआ data English पास");
  process.exit(fail ? 1 : 0);
})();
