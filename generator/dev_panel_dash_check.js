#!/usr/bin/env node
/* ============================================================
   dev_panel_dash_check.js v1.3 (15-Nov-2026; v1.0 पैनल-2; v1.1 पैनल-3: server के संदेश; v1.2 पैनल-4: काग़ज़; v1.3 पैनल-4ख: सहेजा हुआ हिंदी data): सब 31 dashboard का English पहरेदार
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
  let body = DJS.replace(/^import \{([^}]*)\} from "[^"]*";$/gm, function (x, names) { n++; return "const {" + names + "} = window.__FB;"; });
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
      fillText: (t, px, py) => { ctx.canvasText.push({ id: cv.id || "", w: cv.width, t: String(t), x: Math.round(px), y: Math.round(py), font: base.font }); },
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
    data.payments = {
      p1: { uid: "u1", purpose: "badge", status: "paid", amount: 30000, rmStatus: "approved", badgeType: role === "student" ? "golden" : "green", badgeRole: role,
        badgeActiveFrom: TS(2026, 11, 2), badgeExpiresAt: TS(2027, 11, 2), createdAt: TS(2026, 11, 2), orderId: "order_A1", tier: "village" },
      p2: { uid: "u1", purpose: "aptitude_attempt", status: "paid", amount: 10000, createdAt: TS(2026, 11, 3), orderId: "order_A2" },
      p3: { uid: "u1", purpose: "badge", status: "paid", amount: 30000, rmStatus: "rejected", rmNote: "photo not clear", refundDuePercent: 70, refundDueRupees: 210, createdAt: TS(2026, 10, 2), orderId: "order_A3" }
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
  const c = await openPage(file, { transform: tf, urlPath: "/" + file.replace(/index\.html$/, ""), ls: lang === "en" ? { acs_dash_lang: "en" } : {}, expect: lang === "en" ? "en" : undefined,
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
async function runPage(file, sc) {
  sc = sc || "base";
  const c = await openDash(file, sc, "en");
  [NAME_HI, "सीता देवी"].forEach(v => { c.userVals.add(v); c.userVals.add(v.trim()[0]); });   /* नाम + उसका पहला अक्षर (फ़ोटो की जगह) */
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
  feeNote: "केंद्र पर पहली किस्त", subjects: "हिंदी, गणित, शिक्षा", dur: "3 महीने (शिक्षा सत्र)", ret: "केंद्र बंद है", hold: "केंद्र में अनुशासन की कमी", vnote: "केंद्र का पता ग़लत है" };
const HQ = ["सुरक्षा के लिए हेलमेट क्यों ज़रूरी है?", "सिर की सुरक्षा के लिए", "गाँव का नियम है", "शिक्षा के लिए", "खेल के लिए"];
function hdataFix(data, info) {
  const C1 = "कंप्यूटर ऑपरेटर (Computer Operator)", C2 = "डेटा एंट्री ऑपरेटर", C3 = "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का प्रमाणपत्र कोर्स (Certificate in Two-Wheeler Servicing & EV)";
  const r1 = data.registrations.r1; r1.district = "खगड़िया"; r1.desired_district = "खगड़िया"; r1.formFields = { center_name: HU.center, workshop_name: HU.center };
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
async function openH(file, lang, sc) {
  const info = pageInfo(file), data = fixture(info, sc || "data"), user = { uid: "u1", email: "ram@example.com" };
  hdataFix(data, info);
  const ls = { acs_apt_sess_v1: APT_PREV, acs_learn_progress: JSON.stringify({ read: { "/courses/hi/two-wheeler/twv-001-parichay.html": 1 } }) }; if (lang === "en") ls.acs_dash_lang = "en";
  const c = await openPage(file, { transform: dashTransform, urlPath: "/" + file.replace(/index\.html$/, ""), ls, expect: lang === "en" ? "en" : undefined,
    handlers: Object.assign({}, HANDLERS, DOC_HANDLERS, H_HANDLERS), fb: makeFB(data, user) });
  await openAll(c); await settle(c);
  /* खोज वाले बटन: केंद्र खोजना (विद्यार्थी), विद्यार्थी खोजना (केंद्र) */
  for (const [inp, btn] of [["mcCtrReg", "mcFindBtn"], ["addStuReg", "addStuFind"]]) { const i = c.d.getElementById(inp), b = c.d.getElementById(btn); if (i && b) { i.value = "ACS-2026-123456"; click(c, b); await settle(c); await settle(c); } }
  await settle(c); return c;
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
const DOC_HANDLERS = {
  certList: () => ({ certs: [{ certNo: "ACS-C-2026-0001", status: "valid", examOn: "2026-11-08", issuedOn: "2026-11-09", validUntil: "2031-11-09", extend: { due: 100000, credit: 0, newValid: "2036-11-09" } }] }),
  latestAptitudeReport: () => ({ found: true, paidAt: Date.UTC(2026, 10, 10), reportText: "REPORT-BODY-LINE" }),
  reportNumber: () => ({ found: true, reportNo: "ACS-R-2026-0007", status: "valid", validUntil: "2031-11-12" }),
  checkAptitudeAttempt: () => ({ available: false })
};
async function openDoc(file, lang, mod) {
  const info = pageInfo(file), data = fixture(info, "docs"), user = { uid: "u1", email: "ram@example.com" };
  if (mod) mod(data);
  const ls = { acs_apt_sess_v1: APT_PREV, acs_learn_progress: JSON.stringify({ read: { "/courses/hi/two-wheeler/twv-001-parichay.html": 1 } }) }; if (lang === "en") ls.acs_dash_lang = "en";
  const c = await openPage(file, { transform: dashTransform, urlPath: "/" + file.replace(/index\.html$/, ""), ls, expect: lang === "en" ? "en" : undefined,
    handlers: Object.assign({}, HANDLERS, DOC_HANDLERS), fb: makeFB(data, user) });
  await openAll(c); await settle(c); await settle(c);
  return c;
}
const decText = h => { try { return decodeURIComponent(String(h || "")); } catch (e) { return String(h || ""); } };
const docLinks = c => Array.from(c.d.querySelectorAll('a[href*="wa.me"],a[href*="youtube.com/results"],a[href*="aptitude-test.html"]')).filter(a => !a.closest("nav,footer,#acsFooter,.acs-footer"));
const stripUser = (t, vals) => { vals.forEach(v => { t = t.split(v).join(""); }); return t; };
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
    ck("काग़ज़ : English प्रमाणपत्र के कोड (certTextEn) में \"S/o\", ख़ाली रेखा या \"Accreditations\" नहीं", fa > 0 && !/S\/o|D\/o|_{3,}|fatherPh|accredit/i.test(body), (body.match(/[^\n]*(S\/o|D\/o|_{3,}|fatherPh|ccredit)[^\n]*/) || [""])[0].slice(0, 120));
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
    const need = ["Applied Computer School™", "Freedom Fighter Gangadhar Prasad Memorial Trust", "Online Course Completion Certificate", "This is to certify that", "Raam Kumar", "Institutional Details", "ACS-C-2026-0001", "Certificate No", "Scan to verify", "Authorized Signatory", "Chief Trustee, FFGPMT", "We wish him/her a bright future."];
    ck("प्रमाणपत्र : English प्रमाणपत्र पर सब ज़रूरी पंक्तियाँ; नाम रजिस्ट्रेशन में उपयोगकर्ता का अपना लिखा रोमन नाम (Raam Kumar; मशीन वाला Ram Kumar नहीं)", tE.indexOf("Ram Kumar") < 0 && need.every(n => tE.indexOf(n) > -1), need.filter(n => tE.indexOf(n) < 0).join(" ‖ "));
    const para = tE.join(" ");
    /* (v1.2, ऑडिट की पकड़) रिश्ते की ख़ाली पंक्ति और "Accreditations" शब्द English प्रमाणपत्र पर नहीं */
    const REL = /\bS\/o\b|\bD\/o\b|\bW\/o\b|\bC\/o\b|_{3,}|\bFather\b|\bGuardian\b/i;
    ck("प्रमाणपत्र : English प्रमाणपत्र पर पिता/रिश्ते की ख़ाली पंक्ति नहीं (S/o, D/o, ____ कुछ नहीं)", tE.length > 30 && !tE.some(t => REL.test(t)), tE.filter(t => REL.test(t)).join(" ‖ "));
    ck("प्रमाणपत्र : English प्रमाणपत्र पर \"Accreditations\" शब्द नहीं; शीर्षक \"Institutional Details\"", tE.length > 30 && !tE.some(t => /accredit/i.test(t)) && tE.indexOf("Institutional Details") > -1, tE.filter(t => /accredit|Registrations/i.test(t)).join(" ‖ "));
    ck("प्रमाणपत्र : कोर्स का नाम कोर्स-सूची का English नाम; परीक्षा-तिथि, अंक और जारी/मान्य तिथि", /Motorcycle & Two-Wheeler Repair, Servicing, EV & Entrepreneurship/.test(para) && /held on 8 November 2026, with/.test(para) && /72%/.test(para) && /Issued 09\.11\.2026 · Online verification valid till 09\.11\.2031 \(acslearn\.com\/verify\)/.test(para), para.slice(0, 300));
    /* हिंदी पर लौटकर वही बटन: हिंदी + English वाला पुराना रूप */
    click(e, e.d.querySelector('#acsPanelLangBar button[data-plang="hi"]')); await settle(e); await settle(e);
    await certClick(e); const tB = e.canvasText.filter(z => z.w === 1240).map(z => z.t);
    const h = await openDoc(f, "hi"); await certClick(h); const tH = h.canvasText.filter(z => z.w === 1240);
    const needH = ["अप्लाइड कंप्यूटर स्कूल™", "ऑनलाइन कोर्स-पूर्णता प्रमाणपत्र", "प्रमाणित किया जाता है कि", NAME_HI, "पिता ________", "Ram Kumar", "हम इनके उज्ज्वल भविष्य की कामना करते हैं।", "प्रधान ट्रस्टी, FFGPMT", "130 भाषा में, गाँव से ग्लोबल साउथ तक!"];
    ck("प्रमाणपत्र : हिंदी पैनल में प्रमाणपत्र पहले जैसा (हिंदी + English, " + tH.length + " पंक्तियाँ)", needH.every(n => tH.some(z => z.t === n)) && tH.filter(z => DEV.test(z.t)).length > 30, needH.filter(n => !tH.some(z => z.t === n)).join(" ‖ "));
    ck("प्रमाणपत्र : English से हिंदी पर लौटने के बाद प्रमाणपत्र = सीधे हिंदी में खोला प्रमाणपत्र", tB.length === tH.length && tB.every((t, i) => t === tH[i].t), tB.length + " बनाम " + tH.length);
    if (process.env.ACS_CERT_DUMP) fs.writeFileSync(process.env.ACS_CERT_DUMP, JSON.stringify(tH));
    /* छाप: हिंदी प्रमाणपत्र की हर पंक्ति (पाठ, जगह, अक्षर-आकार) पैनल-4 से पहले के कोड (v6.13.0) जैसी; हिंदी रूप जान-बूझकर बदले, तभी यह छाप बदलें */
    const pin = require("crypto").createHash("sha256").update(JSON.stringify(tH)).digest("hex");
    ck("प्रमाणपत्र : हिंदी प्रमाणपत्र की हर पंक्ति, जगह और अक्षर-आकार पहले जैसा (" + tH.length + " लिखावटें, छाप मिली)", pin === "fb08a7a7c7691b176f7636cff91621edfcd6a675b9be7dabd0f63b00eb02afe8", pin);
    /* नाम रोमन में न लिखा हो, या नाम में ऑ हो */
    const e2 = await openDoc(f, "en", data => { data.registrations.r1.name_local = "डॉली कुमारी"; data.registrations.r1.name_roman = ""; data.certificates.c1.name = "डॉली कुमारी"; data.certificates.c1.courseId = "ZZ999"; data.certificates.c1.courseName = "सिलाई कोर्स (Tailoring Course)"; });
    await certClick(e2); const t2 = e2.canvasText.filter(z => z.w === 1240).map(z => z.t);
    ck("प्रमाणपत्र : रोमन नाम न लिखा हो, तो हिंदी नाम का रोमन रूप (डॉली कुमारी = Doli Kumari); सूची से बाहर का कोर्स = नाम के कोष्ठक का English; लड़की के प्रमाणपत्र पर भी S/o नहीं", t2.indexOf("Doli Kumari") > -1 && t2.join(" ").indexOf("Tailoring Course") > -1 && !t2.some(t => DEV.test(t)) && !t2.some(t => REL.test(t) || /accredit/i.test(t)), t2.filter(t => DEV.test(t) || /Kumari|Tailor/.test(t)).slice(0, 4).join(" ‖ "));
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
module.exports = { dashTransform, makeFB, fixture, openDash, openAll };
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
  if (process.env.ACS_INV) fs.writeFileSync(process.env.ACS_INV, Array.from(INV.entries()).map(([k, v]) => v.length + "\t" + Array.from(new Set(v)).join(",") + "\t" + k).sort().join("\n") + "\n");
  console.log("\nजाँचें: पास " + pass + " · फेल " + fail + " · पन्ने " + pages.length + " · समय " + Math.round((Date.now() - t0) / 1000) + " सेकंड");
  console.log(fail ? "⛔ dev_panel_dash_check रुका" : "🏁 dev_panel_dash_check v1.3 : सब dashboard, काग़ज़ और सहेजा हुआ data English पास");
  process.exit(fail ? 1 : 0);
})();
