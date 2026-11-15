#!/usr/bin/env node
/* ============================================================
   dev_panel_dash_check.js v1.0 (15-Nov-2026, पैनल-2): सब 31 dashboard का English पहरेदार
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
function makeFB(data, user) {
  return function (w, ctx) {
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
  if (process.env.ACS_INV) fs.writeFileSync(process.env.ACS_INV, Array.from(INV.entries()).map(([k, v]) => v.length + "\t" + Array.from(new Set(v)).join(",") + "\t" + k).sort().join("\n") + "\n");
  console.log("\nजाँचें: पास " + pass + " · फेल " + fail + " · पन्ने " + pages.length + " · समय " + Math.round((Date.now() - t0) / 1000) + " सेकंड");
  console.log(fail ? "⛔ dev_panel_dash_check रुका" : "🏁 dev_panel_dash_check v1.0 : सब dashboard English पास");
  process.exit(fail ? 1 : 0);
})();
