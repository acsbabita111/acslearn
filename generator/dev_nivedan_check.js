/* ============================================================
   dev_nivedan_check.js v1.1 (25-Nov-2026, खेप N-4) : (v1.1: सफलता की तीन अलग बातें P9/N18; सहेजने में टूटना N36-N37) "सुधार का निवेदन / नया फ़र्म जोड़ें" और नेटवर्क-खोज की पंचायत का जाँच-यंत्र।
   असली पन्ने (/network/nivedan/, /en/network/nivedan/, /hi/network.html) jsdom में; Firebase की जगह नक़ली (कुछ server पर नहीं जाता)।
   data असली: assets/network/index.json, ज़िलों की .json, nivedan_data.json (generator/build_network.js से)।
   जाँचें:
     D  : data — पंचायत सिर्फ़ स्रोत के लिखे रूप से (CSC 2,454; टू-व्हीलर 0), कोई पंचायत-नाम फ़ोन/email जैसा नहीं; nivedan_data
          (24 सेक्टर, 951 उद्यम, हर सेक्टर के अपने, English नाम में देवनागरी नहीं, हिंदी नाम में [ ] नहीं); index.json में बटन और पता।
     P  : पन्ने — हर CSC और टू-व्हीलर कार्ड पर ठीक दो बटन (सुधार = उसी नाम का ID, नया = वही सूची और ज़िला); निवेदन-पन्ना noindex,
          sitemap में नहीं, English में देवनागरी नहीं; पन्ने में Firestore का import नहीं।
     K  : खोज (net-praktik.js) — पंचायत का खाना (CSC), प्रखंड चुनें तो उसी की पंचायतें, "पंचायत पता नहीं", गाँव के शब्द से खोज, टू-व्हीलर में
          पंचायत का खाना नहीं, कार्ड पर दोनों बटन।
     N  : निवेदन-पन्ना (net-nivedan.js) — अधूरी कड़ी, नाम का कार्ड (esc), रजिस्ट्रेशन नंबर, लॉगिन, OTP (ग़लत/सही/रोक/दोबारा), फ़ॉर्म
          (24 सेक्टर → उस सेक्टर के उद्यम → "इनमें से कोई नहीं" → नया नाम), सहमति, फ़ाइल, server को जाने वाला data, सफलता का संदेश
          (Founder के शब्द), लॉगआउट, नया फ़र्म (राज्य/ज़िला), server न हो, 10 मिनट की चुप्पी।
   चलाएँ:  ACS_JSDOM=<jsdom का पता> node generator/dev_nivedan_check.js
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
function loadJsdom() { for (const t of [process.env.ACS_JSDOM, "jsdom", path.join(ROOT, "node_modules/jsdom")].filter(Boolean)) { try { return require(t); } catch (e) {} } return null; }
const JSD = loadJsdom();
let pass = 0, fail = 0;
function ck(name, ok, extra) { if (ok) { pass++; console.log("✅ " + name); } else { fail++; console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 500) : "")); } return ok; }
const DEV = /[ऀ-ॿ]/;
const N = require("./lib_network.js"), UI = require("./data/network/ui.js");

/* ---------- D: data ---------- */
const recs = N.loadRecords();
const pcs = recs.map((r) => [r, N.panchayatOf(r)]).filter((x) => x[1]);
ck("D1 पंचायत सिर्फ़ स्रोत के लिखे रूप से: CSC 2454, टू-व्हीलर 0", pcs.length === 2454 && pcs.every((x) => x[0].sectorId === "CSC") &&
  pcs.every((x) => /Panchayat\/Village-|Gram Panchayat:/i.test(x[0].address)), pcs.length);
ck("D2 कोई पंचायत-नाम email/फ़ोन जैसा नहीं, 60 अक्षर तक, आख़िर में 'Panchayat' शब्द नहीं", pcs.every((x) => !N.textProblems("x", x[1]).length && x[1].length <= 60 && !/\bpanchayat$/i.test(x[1])));
ck("D3 एक जैसे नाम एक विकल्प: 'SAHSI' और 'Sahsi' दोनों 'Sahsi'", N.panchayatOf({ address: "X, Panchayat/Village-SAHSI, Sub District-Alauli" }) === "Sahsi" &&
  N.panchayatOf({ address: "Gram Panchayat: sahsi; Block: Alauli" }) === "Sahsi" && N.panchayatOf({ address: "Panchayat/Village-null, District-x" }) === "" &&
  N.panchayatOf({ address: "Near Panchayat Bhawan, Chhorahi" }) === "" && N.panchayatOf({ address: "Panchayat/Village-PARASI PANCHAYAT, Sub" }) === "Parasi");
const IDX = JSON.parse(rd("assets/network/index.json")), NVD = JSON.parse(rd("assets/network/nivedan_data.json"));
/* (26-Nov-2026, सेक्टर-नियम v1.2) उद्यमों की गिनती यहाँ लिखी नहीं जाती: वह assets/udyam_data.js से आती है (नया कार्ड जुड़े तो जाँच अपने-आप साथ चले) */
const NCARDS = new Function(rd("assets/udyam_data.js") + ";return ALL_SECTORS.length;")();
ck("D4 nivedan_data: 24 सेक्टर, " + NCARDS + " उद्यम (उद्यम-सूची जितने; नंबर अलग-अलग), हर सेक्टर के अपने उद्यम", NVD.mg.length === 24 && NCARDS >= 951 && NVD.u.length === NCARDS && new Set(NVD.u.map((x) => x[0])).size === NCARDS &&
  NVD.mg.every((m) => NVD.u.some((x) => x[1] === m[0])) && NVD.u.every((x) => x[1] >= 1 && x[1] <= 24));
ck("D5 nivedan_data: English नाम में देवनागरी नहीं, हिंदी नाम में [ ] नहीं; राज्य बिहार के 38 ज़िले", NVD.u.every((x) => !DEV.test(x[3]) && !/[\[\]]/.test(x[2])) && NVD.mg.every((m) => !DEV.test(m[3])) &&
  NVD.st.length === 1 && NVD.st[0][0] === "bihar" && NVD.st[0][3].length === 38);
ck("D6 index.json: दोनों बटनों के शब्द और निवेदन-पन्ने का पता (hi, en)", IDX.ui.hi.nvBtn === UI.hi.nvBtn && IDX.ui.en.nyBtn === UI.en.nyBtn && IDX.nv.hi === "/network/nivedan/" && IDX.nv.en === "/en/network/nivedan/");
let shPc = 0, shTwPc = 0;
for (const st of IDX.states) for (const k of Object.keys(st.sectors)) for (const d of st.sectors[k].districts) {
  const j = JSON.parse(rd(d.shard.replace(/^\//, "").replace(/\?.*$/, "")));
  for (const r of j.r) { if (r.pc) { if (k === "csc") shPc++; else shTwPc++; } }
}
ck("D7 छँटाई के data में पंचायत: CSC 2454, टू-व्हीलर 0", shPc === 2454 && shTwPc === 0, shPc + " / " + shTwPc);

/* ---------- P: पन्ने ---------- */
function cardsOf(html) { return html.split('<li class="nw-card').slice(1).map((c) => c.split("</li>")[0]); }
const khg = rd("network/bihar/csc/khagaria/index.html"), khgCards = cardsOf(khg);
const btnOk = (c, id) => { const a = c.match(/<div class="nw-nv">(.*?)<\/div>/); if (!a) return false;
  const hrefs = (a[1].match(/href="([^"]+)"/g) || []).map((h) => h.slice(6, -1).replace(/&amp;/g, "&"));
  return hrefs.length === 2 && hrefs[0] === "/network/nivedan/?m=sudhar&id=" + id + "&s=bihar&k=csc&d=khagaria" && hrefs[1] === "/network/nivedan/?m=naya&s=bihar&k=csc&d=khagaria"; };
ck("P1 CSC खगड़िया: हर कार्ड पर ठीक दो बटन (सुधार = उसी नाम का ID, नया = वही सूची और ज़िला)", khgCards.length > 100 && khgCards.every((c) => btnOk(c, (c.match(/id="(br-csc-[am]\d+)"/) || [])[1].toUpperCase())), khgCards.length);
const twD = rd("network/bihar/two-wheeler/bhagalpur/index.html"), twCards = cardsOf(twD);
ck("P2 टू-व्हीलर ज़िला-पन्ना: हर कार्ड पर दोनों बटन", twCards.length > 5 && twCards.every((c) => /m=sudhar&amp;id=BR-[A-Z]{3}-\d{4}&amp;s=bihar&amp;k=tw&amp;d=bhagalpur/.test(c) && /m=naya&amp;s=bihar&amp;k=tw&amp;d=bhagalpur/.test(c)));
const firm = rd("network/firm/br-bgp-0008.html"), firmEn = rd("en/network/firm/br-bgp-0008.html");
ck("P3 फ़र्म का पन्ना: नाम के नीचे दोनों बटन (हिंदी, English)", /m=sudhar&amp;id=BR-BGP-0008/.test(firm) && firm.indexOf(UI.hi.nvBtn) > -1 && firm.indexOf(UI.hi.nyBtn) > -1 &&
  /\/en\/network\/nivedan\/\?m=sudhar&amp;id=BR-BGP-0008/.test(firmEn) && firmEn.indexOf(UI.en.nyBtn) > -1);
const nvHi = rd("network/nivedan/index.html"), nvEn = rd("en/network/nivedan/index.html");
ck("P4 निवेदन-पन्ना: noindex, canonical, hreflang, नक़ल-रहित (generator का निशान)", /<meta name="robots" content="noindex,follow"\/>/.test(nvHi) && /<meta name="robots" content="noindex,follow"\/>/.test(nvEn) &&
  /rel="canonical" href="https:\/\/acslearn\.com\/network\/nivedan\/"/.test(nvHi) && /generated by generator\/build_network\.js/.test(nvHi));
ck("P5 निवेदन-पन्ना sitemap में नहीं", !/nivedan/.test(rd("sitemap-network.xml")) && !/nivedan/.test(rd("sitemap.xml")));
ck("P6 English निवेदन-पन्ने में देवनागरी नहीं", !DEV.test(nvEn));
const nvJs = rd("assets/net-nivedan.js");
ck("P7 पन्ना database में ख़ुद कुछ नहीं लिखता (Firestore नहीं), OTP ख़ुद नहीं बनाता", !/firebase-firestore|addDoc|setDoc|Math\.random/.test(nvJs) && /"nivedanOtpSend"/.test(nvJs) && /"submitListingEdit"/.test(nvJs));
ck("P8 पन्ने के शब्द ui.js से (JSON): Founder का सफलता-वाक्य (पहला हिस्सा हूबहू), फिर तीन अलग बातें", nvHi.indexOf(JSON.stringify(UI.hi.nv.ok).slice(1, -1)) > -1 &&
  UI.hi.nv.ok === "✅ आपका अनुरोध सफलतापूर्वक RM को भेज दिया गया है।" &&
  UI.hi.nv.gate === "रजिस्टर्ड यूज़र ही एडिट कर सकते हैं। अपना रजिस्ट्रेशन नंबर बताएँ।");
/* v1.1 (ChatGPT ऑडिट): website पर छपने का दिन वादा नहीं; मिलना, जाँच, छपना अलग-अलग */
ck("P9 सफलता के बाद तीन अलग बातें (मिला · RM की जाँच · स्वीकृति के बाद ही website), हिंदी और English; '2 से 7 कार्यदिवस में अपडेट' का वादा कहीं नहीं",
  ["hi", "en"].every((l) => Array.isArray(UI[l].nv.steps) && UI[l].nv.steps.length === 3) && /RM जाँच/.test(UI.hi.nv.steps[1]) && /स्वीकृति के बाद ही/.test(UI.hi.nv.steps[2]) &&
  /only after the RM approves/.test(UI.en.nv.steps[2]) && !/कार्यदिवस में सूचना अपडेट|updated in the next/.test(nvHi + nvEn + JSON.stringify(UI)) &&
  nvHi.indexOf(JSON.stringify(UI.hi.nv.steps[2]).slice(1, -1)) > -1 && nvEn.indexOf(JSON.stringify(UI.en.nv.steps[2]).slice(1, -1)) > -1 &&
  !!UI.hi.nv.rs.save && !!UI.en.nv.rs.save);

if (!JSD) { console.log("⚠️ jsdom नहीं मिला: K और N (चलाने वाली) जाँचें नहीं चलीं।"); console.log("जाँचें: पास " + pass + " · फेल " + fail); process.exit(fail ? 1 : 3); }
const { JSDOM, VirtualConsole } = JSD;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function settle(n) { for (let i = 0; i < (n || 6); i++) await wait(5); }
function fetchFor(w, over) {
  return async (u) => { const p = String(u).replace(/^https?:\/\/[^/]+/, "").split("?")[0];
    if (over && over[p]) return { ok: true, status: 200, json: async () => JSON.parse(JSON.stringify(over[p])) };
    const f = path.join(ROOT, p.replace(/^\//, ""));
    if (!fs.existsSync(f)) return { ok: false, status: 404, json: async () => ({}) };
    const t = fs.readFileSync(f, "utf8"); return { ok: true, status: 200, json: async () => JSON.parse(t) }; };
}
function mkDom(file, url) {
  const vc = new VirtualConsole(); const errors = []; vc.on("jsdomError", (e) => errors.push(String(e && e.message || e)));
  const html = rd(file).replace(/<script\b(?![^>]*type="application\/json")[\s\S]*?<\/script>/g, "");
  const dom = new JSDOM(html, { url, runScripts: "outside-only", virtualConsole: vc, pretendToBeVisual: true });
  return { dom, w: dom.window, d: dom.window.document, errors };
}

/* ---------- K: खोज ---------- */
async function khoj(lang) {
  const file = lang === "hi" ? "hi/network.html" : "en/network.html";
  const c = mkDom(file, "https://acslearn.com/" + file);
  c.w.XMLHttpRequest = function () { const x = this; x.open = (m, u) => { x._u = u; }; x.send = () => { const p = String(x._u).split("?")[0], f = path.join(ROOT, p.replace(/^\//, ""));
    x.readyState = 4; x.status = fs.existsSync(f) ? 200 : 404; x.responseText = x.status === 200 ? fs.readFileSync(f, "utf8") : ""; setTimeout(() => x.onreadystatechange && x.onreadystatechange(), 0); }; };
  c.w.eval(rd("assets/net-praktik.js"));
  await settle();
  const $ = (id) => c.d.getElementById(id), U = IDX.ui[lang];
  const chip = c.d.querySelector('.np-chip[data-sec="csc"]'); chip.click(); await settle();
  const pick = (id, v) => { const e = $(id); e.value = v; e.dispatchEvent(new c.w.Event("change")); };
  pick("npDist", "khagaria"); await settle(10);
  const cards = () => Array.from(c.d.querySelectorAll("#npList .nw-card")), tot = () => (($("npList").querySelector(".np-tot") || {}).textContent || "");
  const pc = $("npPc"), opts = pc ? Array.from(pc.options).map((o) => o.value) : [];
  const shard = JSON.parse(rd(IDX.states[0].sectors.csc.districts.find((d) => d.slug === "khagaria").shard.replace(/^\//, "").replace(/\?.*$/, ""))).r;
  ck("K1 " + lang + ": CSC खगड़िया में पंचायत का खाना; विकल्प = data की पंचायतें + 'पंचायत पता नहीं'", !!pc && opts[0] === "" && opts[opts.length - 1] === "__n" &&
    opts.length - 2 === new Set(shard.filter((r) => r.pc).map((r) => r.pc)).size && pc.options[opts.length - 1].textContent === U.pcNone, opts.length);
  const one = opts[1], want = shard.filter((r) => r.pc === one).length;
  pick("npPc", one); await settle();
  ck("K2 " + lang + ": एक पंचायत चुनें तो सिर्फ़ उसी के नाम (" + want + ")", tot().indexOf(String(want)) > -1 && cards().length === Math.min(20, want), tot());
  pick("npPc", "__n"); await settle();
  const noPc = shard.filter((r) => !r.pc).length;
  ck("K3 " + lang + ": 'पंचायत पता नहीं' = जिनमें पंचायत नहीं (" + noPc + ")", tot().indexOf(String(noPc)) > -1, tot());
  const blk = shard.find((r) => r.pc && r.b).b; pick("npBlock", blk); await settle(10);
  const opts2 = Array.from($("npPc").options).map((o) => o.value).filter((v) => v && v !== "__n");
  ck("K4 " + lang + ": प्रखंड (" + blk + ") चुनें तो सिर्फ़ उसी प्रखंड की पंचायतें", opts2.length > 0 && opts2.every((v) => shard.some((r) => r.b === blk && r.pc === v)) &&
    opts2.length === new Set(shard.filter((r) => r.b === blk && r.pc).map((r) => r.pc)).size && $("npPc").value === "");
  pick("npBlock", ""); await settle(10);
  const word = "maheshkhunt", wantQ = shard.filter((r) => [r.n, r.pc, r.a, r.l, r.rb].join(" ").toLowerCase().indexOf(word) > -1).length;
  const q = $("npQ"); q.value = "Maheshkhunt"; q.dispatchEvent(new c.w.Event("input")); await settle();
  ck("K5 " + lang + ": खोज-खाने में गाँव का शब्द (Maheshkhunt): पते/पंचायत से भी मिलता है (" + wantQ + ")", wantQ > 1 && tot().indexOf(String(wantQ)) > -1, tot());
  const first = cards()[0], links = first ? Array.from(first.querySelectorAll(".nw-nv a")).map((a) => a.getAttribute("href")) : [];
  const pre = lang === "hi" ? "" : "/en";
  ck("K6 " + lang + ": खोज के कार्ड पर दोनों बटन, सही पते", links.length === 2 && new RegExp("^" + pre + "/network/nivedan/\\?m=sudhar&id=BR-CSC-[AM]\\d{5}&s=bihar&k=csc&d=khagaria$").test(links[0]) &&
    links[1] === pre + "/network/nivedan/?m=naya&s=bihar&k=csc&d=khagaria", links.join(" | "));
  c.d.querySelector('.np-chip[data-sec="tw"]').click(); await settle();
  pick("npDist", "bhagalpur"); await settle(10);
  ck("K7 " + lang + ": टू-व्हीलर में पंचायत का खाना नहीं (data में पंचायत नहीं); कार्ड पर बटन", !$("npPc") && cards().length > 0 && cards().every((x) => x.querySelectorAll(".nw-nv a").length === 2));
  if (lang === "en") { const t = $("npApp").textContent; ck("K8 en: खोज के हिस्से में देवनागरी शून्य", !DEV.test(t), (t.match(/[ऀ-ॿ]+/g) || []).slice(0, 5).join(" ")); }
  ck("K9 " + lang + ": JS-त्रुटि शून्य", c.errors.length === 0, c.errors.join(" | "));
  c.dom.window.close();
}

/* ---------- N: निवेदन-पन्ना ---------- */
function nivedan(lang, query, opt) {
  opt = opt || {};
  const file = lang === "hi" ? "network/nivedan/index.html" : "en/network/nivedan/index.html";
  const c = mkDom(file, "https://acslearn.com/" + (lang === "hi" ? "" : "en/") + "network/nivedan/" + query);
  const calls = [], H = Object.assign({
    claimSession: () => ({ sessionId: "s1" }),
    nivedanOtpSend: () => ({ ok: true, to: "ra***@example.com" }),
    nivedanOtpVerify: (d) => { if (d.code !== "123456") { const e = new Error("x"); e.code = "functions/failed-precondition"; e.details = { reason: "otpWrong", n: 2 }; throw e; } return { ok: true }; },
    submitListingEdit: () => ({ ok: true, reqId: "NV-20261125-ABC123" })
  }, opt.handlers || {});
  const auth = { currentUser: opt.user || null }, apps = [];
  const AP = { getApps: () => apps, getApp: () => apps[0], initializeApp: (cfg) => { apps.push({ cfg }); return apps[0]; } };
  const A = { getAuth: () => auth, onAuthStateChanged: (a, cb) => { setTimeout(() => cb(a.currentUser), 0); return () => {}; },
    signInWithEmailAndPassword: async (a, e, p) => { calls.push(["signIn", e]); if (p !== "Good#Pass123") { const er = new Error("x"); er.code = "auth/invalid-credential"; throw er; } a.currentUser = { uid: "u1", email: e }; },
    signOut: async (a) => { calls.push(["signOut"]); a.currentUser = null; } };
  const F = { getFunctions: () => ({}), httpsCallable: (fns, name) => async (data) => { calls.push([name, data]); const h = H[name];
    if (!h) { const e = new Error("nf"); e.code = "functions/not-found"; throw e; } return { data: await h(data) }; } };
  c.w.__imp = (n) => Promise.resolve(n === "firebase-app.js" ? AP : n === "firebase-auth.js" ? A : F);
  c.w.fetch = fetchFor(c.w, opt.fetchOver);
  const timers = []; const st = c.w.setTimeout.bind(c.w);
  c.w.setTimeout = (fn, ms) => { if (ms === 600000) { timers.push(fn); return 999; } return st(fn, ms); };
  /* फ़ोटो: canvas और Image का नक़ली रूप (jsdom में चित्र नहीं बनते) */
  c.w.HTMLCanvasElement.prototype.getContext = () => ({ drawImage: () => {} });
  c.w.HTMLCanvasElement.prototype.toDataURL = () => "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ";
  c.w.URL.createObjectURL = () => "blob:x"; c.w.URL.revokeObjectURL = () => {};
  c.w.Image = function () { const im = this; im.width = 4000; im.height = 3000; Object.defineProperty(im, "src", { set: () => setTimeout(() => im.onload && im.onload(), 0) }); };
  let src = rd("assets/net-nivedan.js"); const n0 = (src.match(/import\(FB \+ "/g) || []).length;
  src = src.replace(/import\(FB \+ "([a-z-]+\.js)"\)/g, '__imp("$1")');
  c.w.eval(src);
  return Object.assign(c, { calls, timers, n0, auth, $: (id) => c.d.getElementById(id), T: UI[lang].nv,
    type: (id, v) => { const e = c.d.getElementById(id); e.value = v; e.dispatchEvent(new c.w.Event("input")); },
    pick: (id, v) => { const e = c.d.getElementById(id); e.value = v; e.dispatchEvent(new c.w.Event("change")); },
    click: (id) => c.d.getElementById(id).click(),
    msg: () => ((c.d.getElementById("nvMsg") || {}).textContent || ""), app: () => c.d.getElementById("nvApp").textContent,
    file: (id, name, type, bytes) => { const f = new c.w.File([bytes], name, { type }); Object.defineProperty(c.d.getElementById(id), "files", { value: [f], configurable: true }); c.d.getElementById(id).dispatchEvent(new c.w.Event("change")); } });
}
async function flow(lang) {
  const c = nivedan(lang, "?m=sudhar&id=BR-CSC-M00003&s=bihar&k=csc&d=khagaria"), T = c.T;
  ck("N0 " + lang + ": तीनों Firebase-import बदले गए (यंत्र)", c.n0 === 3);
  await settle(10);
  ck("N1 " + lang + ": नाम का कार्ड (असली सूची से) और रजिस्ट्रेशन-संदेश, बगल में नया रजिस्ट्रेशन", c.app().indexOf("Nitesh Kumar Arya") > -1 && c.app().indexOf("BR-CSC-M00003") > -1 &&
    c.app().indexOf(T.gate) > -1 && !!c.d.querySelector('#nvApp a[href^="/join.html"]') && c.d.querySelector('#nvApp a[href^="/join.html"]').textContent === T.newReg, c.app().slice(0, 200));
  c.type("nvReg", "<b>"); c.click("nvNext"); await settle();
  ck("N2 " + lang + ": ग़लत रूप का रजिस्ट्रेशन नंबर = रुकता है", c.msg().indexOf(T.regBad) > -1 && !c.calls.length);
  c.type("nvReg", "acs-2026-111111"); c.click("nvNext"); await settle(10);
  ck("N3 " + lang + ": लॉगिन का फ़ॉर्म (ईमेल, पासवर्ड, पासवर्ड भूले = dashboard)", !!c.$("nvEm") && !!c.$("nvPw") && c.app().indexOf(T.loginH) > -1 && !!c.d.querySelector('#nvApp a[href^="/dashboard/"]'));
  c.type("nvEm", "ram@example.com"); c.type("nvPw", "bad"); c.click("nvLog"); await settle(10);
  ck("N4 " + lang + ": ग़लत पासवर्ड = साफ़ संदेश, OTP नहीं गया", c.msg().indexOf(T.loginBad) > -1 && !c.calls.some((x) => x[0] === "nivedanOtpSend"));
  c.type("nvPw", "Good#Pass123"); c.click("nvLog"); await settle(15);
  const os = c.calls.find((x) => x[0] === "nivedanOtpSend");
  ck("N5 " + lang + ": सही लॉगिन → एक-जगह-login (claimSession) → OTP server से, नंबर बड़े अक्षरों में, पन्ने की भाषा", c.calls.some((x) => x[0] === "claimSession") && !!os && os[1].regNo === "ACS-2026-111111" && os[1].lang === lang &&
    c.app().indexOf("ra***@example.com") > -1 && c.$("nvRe").disabled === true, JSON.stringify(os));
  c.type("nvOtp", "999999"); c.click("nvChk"); await settle(10);
  ck("N6 " + lang + ": ग़लत OTP = server की वजह, पन्ने के शब्दों में (2 कोशिश बाक़ी)", c.msg().indexOf(T.rs.otpWrong.replace("{n}", "2")) > -1, c.msg());
  c.type("nvOtp", "123456"); c.click("nvChk"); await settle(15);
  ck("N7 " + lang + ": सही OTP → फ़ॉर्म; नाम, प्रखंड पहले से भरे; 24 सेक्टर; उद्यम का खाना बंद", !!c.$("nvName") && c.$("nvName").value === "Nitesh Kumar Arya" && c.$("nvBlock").value === "Gogri" &&
    c.$("nvMg").options.length === 25 && c.$("nvUd").disabled === true && !c.$("nvSt"));
  ck("N8 " + lang + ": सबको दिखने की सूचना, उद्यम प्रमाणपत्र निजी, सहमति का डिब्बा", c.app().indexOf(T.publicNote) > -1 && c.app().indexOf(T.privNote) > -1 && !!c.$("nvOk") && c.app().indexOf(T.consent) > -1);
  c.click("nvSend"); await settle();
  ck("N9 " + lang + ": कुछ न बदला = 'कम से कम एक बदलाव'", c.msg().indexOf(T.needSome) > -1);
  c.pick("nvMg", "7"); await settle();
  const ud = Array.from(c.$("nvUd").options).map((o) => o.value), want7 = NVD.u.filter((x) => x[1] === 7).map((x) => String(x[0]));
  ck("N10 " + lang + ": सेक्टर 7 चुनें = सिर्फ़ उसके " + want7.length + " उद्यम + 'इनमें से कोई नहीं'", !c.$("nvUd").disabled && ud.length === want7.length + 2 && ud[ud.length - 1] === "0" && want7.every((v) => ud.indexOf(v) > -1));
  c.click("nvSend"); await settle();
  ck("N11 " + lang + ": सेक्टर चुना, उद्यम नहीं = रुकता है", c.msg().indexOf(T.needUdy) > -1);
  c.pick("nvUd", "0"); await settle();
  ck("N12 " + lang + ": 'इनमें से कोई नहीं' = नए नाम का खाना खुलता है", c.$("nvUdNewW").className === "");
  c.type("nvUdNew", "CSC Digital Seva"); c.type("nvName", "Nitesh Kumar Arya CSC"); c.type("nvPin", "85120"); c.click("nvSend"); await settle();
  ck("N13 " + lang + ": पिन 5 अंक = रुकता है", c.msg().indexOf(T.pinBad) > -1);
  c.type("nvPin", "851203"); c.type("nvUdyam", "udyam-12"); c.click("nvSend"); await settle();
  ck("N14 " + lang + ": ग़लत उद्यम नंबर = रुकता है", c.msg().indexOf(T.udyamBad) > -1);
  c.type("nvUdyam", "udyam-br-07-0012345"); c.click("nvSend"); await settle();
  ck("N15 " + lang + ": सहमति बिना = रुकता है", c.msg().indexOf(T.needConsent) > -1 && !c.calls.some((x) => x[0] === "submitListingEdit"));
  c.file("nvAudit", "a.pdf", "image/png", "x"); await settle();
  ck("N16 " + lang + ": ऑडिट में PDF के सिवा = फ़ाइल हटती है, संदेश", c.$("nvAuditM").textContent === T.fileType);
  c.file("nvAudit", "a.pdf", "application/pdf", "%PDF-1.4 test"); c.file("nvPhoto", "p.jpg", "image/jpeg", "fake"); c.pick("nvRel", "owner"); c.type("nvNote", "<img src=x onerror=1>");
  c.$("nvOk").checked = true; c.click("nvSend"); await settle(20);
  const sb = c.calls.find((x) => x[0] === "submitListingEdit"), D = sb && sb[1];
  ck("N17 " + lang + ": server को जाने वाला data: नंबर, सुधार, सूची-पता, सब खाने, सहमति, फ़ाइलें base64 (फ़ोटो छोटी JPEG)", !!D && D.regNo === "ACS-2026-111111" && D.mode === "sudhar" && D.consent === true && D.lang === lang &&
    JSON.stringify(D.where) === JSON.stringify({ id: "BR-CSC-M00003", s: "bihar", k: "csc", d: "khagaria" }) && D.f.name === "Nitesh Kumar Arya CSC" && D.f.pin === "851203" && D.f.mg === 7 && D.f.udy === 0 &&
    D.f.udyNew === "CSC Digital Seva" && D.f.udyamNo === "UDYAM-BR-07-0012345" && D.f.relation === "owner" && D.files.audit.mime === "application/pdf" && Buffer.from(D.files.audit.b64, "base64").toString().indexOf("%PDF-") === 0 &&
    D.files.photo.mime === "image/jpeg" && !D.files.cert, JSON.stringify(D && Object.assign({}, D, { files: Object.keys((D || {}).files || {}) })));
  ck("N18 " + lang + ": सफलता = Founder का वाक्य + तीन अलग बातें (क्रम से) + निवेदन-नंबर; पन्ने ने जो लॉगिन किया, वह बंद", c.app().indexOf(T.ok) > -1 && c.app().indexOf("NV-20261125-ABC123") > -1 &&
    T.steps.every((x, i) => c.app().indexOf(x) > -1 && (i === 0 || c.app().indexOf(x) > c.app().indexOf(T.steps[i - 1]))) && c.calls.some((x) => x[0] === "signOut") && !c.auth.currentUser);
  if (lang === "en") ck("N19 en: पूरे सफ़र में देवनागरी शून्य", !DEV.test(c.app()), (c.app().match(/[ऀ-ॿ]+/g) || []).join(" "));
  ck("N20 " + lang + ": JS-त्रुटि शून्य", c.errors.length === 0, c.errors.join(" | "));
  c.dom.window.close();
}
async function more() {
  let c = nivedan("hi", "?m=sudhar&id=BR-CSC-M99999&s=bihar&k=csc&d=khagaria"); await settle(10);
  ck("N21 सूची में न हो, ऐसा ID = 'नाम नहीं मिला', आगे कुछ नहीं", c.app().indexOf(c.T.notFound) > -1 && !c.$("nvReg")); c.dom.window.close();
  c = nivedan("hi", "?m=sudhar&id=BR-CSC-M00003&s=bihar&k=csc&d=../x"); await settle(10);
  ck("N22 अधूरी/ग़लत कड़ी = 'कड़ी अधूरी'", c.app().indexOf(c.T.badLink) > -1); c.dom.window.close();
  /* XSS: सूची में नाम/पता में HTML हो, तब भी सिर्फ़ अक्षर */
  const d = IDX.states[0].sectors.csc.districts.find((x) => x.slug === "khagaria"), sp = d.shard.split("?")[0];
  const evil = { r: [{ i: "BR-CSC-M00003", n: '<img src=x onerror="window.__x=1">', b: "Gogri", a: "<script>window.__x=2</script>", s: "T" }] };
  c = nivedan("hi", "?m=sudhar&id=BR-CSC-M00003&s=bihar&k=csc&d=khagaria", { fetchOver: { [sp]: evil } }); await settle(10);
  ck("N23 नाम/पते में HTML = सिर्फ़ लिखा दिखता है (कोई tag नहीं)", !c.d.querySelector("#nvApp img") && !c.d.querySelector("#nvApp script") && c.app().indexOf("<img") > -1 && !c.w.__x); c.dom.window.close();
  /* पहले से लॉगिन (dashboard से) */
  c = nivedan("hi", "?m=sudhar&id=BR-CSC-M00003&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" } }); await settle(10);
  c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10);
  ck("N24 पहले से लॉगिन = 'इसी खाते से आगे बढ़ें' (पासवर्ड नहीं), ईमेल छिपा", !!c.$("nvUse") && !c.$("nvPw") && c.app().indexOf("ra***@example.com") > -1);
  c.click("nvUse"); await settle(10);
  ck("N25 उसी खाते से आगे = सीधे OTP; claimSession नहीं (नया लॉगिन नहीं हुआ)", c.calls.some((x) => x[0] === "nivedanOtpSend") && !c.calls.some((x) => x[0] === "claimSession"));
  c.timers.forEach((f) => f()); await settle(10);
  ck("N26 10 मिनट चुप्पी = शुरू पर लौटे; जो लॉगिन पन्ने ने नहीं किया, उसे बंद नहीं करता", c.app().indexOf(c.T.idle) > -1 && !c.calls.some((x) => x[0] === "signOut") && !!c.auth.currentUser); c.dom.window.close();
  /* OTP: server कहे 'रुकें' / 'रोक' / 'नंबर इस खाते का नहीं' */
  const H = (reason, extra) => ({ nivedanOtpSend: () => { const e = new Error("x"); e.code = "functions/x"; e.details = Object.assign({ reason }, extra || {}); throw e; } });
  c = nivedan("hi", "?m=naya&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" }, handlers: H("wait", { s: 420, m: 7 }) }); await settle(10);
  c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10);
  ck("N27 OTP पहले भेजा जा चुका = संदेश (7 मिनट) और OTP का खाना, दोबारा-बटन बंद", c.msg().indexOf(c.T.rs.wait.replace("{m}", "7")) > -1 && !!c.$("nvOtp") && c.$("nvRe").disabled === true, c.msg()); c.dom.window.close();
  c = nivedan("hi", "?m=naya&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" }, handlers: H("notYours") }); await settle(10);
  c.type("nvReg", "ACS-2026-333333"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10);
  ck("N28 दूसरे का रजिस्ट्रेशन नंबर = रजिस्ट्रेशन-नंबर वाले कदम पर लौटे, server का कारण", !!c.$("nvReg") && c.msg().indexOf(c.T.rs.notYours) > -1); c.dom.window.close();
  c = nivedan("hi", "?m=naya&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" }, handlers: { nivedanOtpSend: undefined } });
  await settle(10); c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10);
  ck("N29 server पर function अभी नहीं = 'सुविधा चालू हो रही है' (WhatsApp का रास्ता)", c.app().indexOf(c.T.notReady) > -1 && !!c.d.querySelector('#nvApp a[href^="https://wa.me/919431210092"]'), c.app().slice(0, 300)); c.dom.window.close();
  /* नया फ़र्म, बिना कड़ी के: राज्य और ज़िला चुनना */
  c = nivedan("hi", "?m=naya", { user: { uid: "u1", email: "ram@example.com" } }); await settle(10);
  ck("N30 नया फ़र्म (कड़ी में जगह नहीं) = शीर्षक 'नया फ़र्म जोड़ें'", c.app().indexOf(c.T.hNaya) > -1);
  c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10); c.type("nvOtp", "123456"); c.click("nvChk"); await settle(15);
  ck("N31 नया फ़र्म: राज्य, ज़िला (बंद, राज्य के बाद खुलता), ख़ाली नाम", !!c.$("nvSt") && c.$("nvDi").disabled && c.$("nvName").value === "");
  c.$("nvOk").checked = true; c.click("nvSend"); await settle();
  ck("N32 नया फ़र्म: जगह न चुनी = रुकता है", c.msg().indexOf(c.T.needPlace) > -1);
  c.pick("nvSt", "bihar"); await settle(); c.pick("nvDi", "khagaria"); c.type("nvName", "Ram Motors"); c.type("nvAddr", "Main Road"); c.type("nvBlock", "Gogri"); c.click("nvSend"); await settle();
  ck("N33 नया फ़र्म: धंधा न चुना = रुकता है", c.msg().indexOf(c.T.needUdy) > -1);
  const u8 = NVD.u.find((x) => x[1] === 8); c.pick("nvMg", "8"); await settle(); c.pick("nvUd", String(u8[0])); c.click("nvSend"); await settle(20);
  const sb = c.calls.find((x) => x[0] === "submitListingEdit");
  ck("N34 नया फ़र्म: server को नया, जगह (बिहार, खगड़िया), सूची का धंधा", !!sb && sb[1].mode === "naya" && sb[1].where.s === "bihar" && sb[1].where.d === "khagaria" && sb[1].f.mg === 8 && sb[1].f.udy === u8[0] && c.app().indexOf(c.T.ok) > -1, JSON.stringify(sb && sb[1].where));
  c.dom.window.close();
  /* जमा करते समय निशान ख़त्म (30 मिनट) = फिर OTP */
  c = nivedan("hi", "?m=naya&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" }, handlers: { submitListingEdit: () => { const e = new Error("x"); e.code = "functions/failed-precondition"; e.details = { reason: "otpNeeded" }; throw e; } } });
  await settle(10); c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10); c.type("nvOtp", "123456"); c.click("nvChk"); await settle(15);
  c.type("nvName", "Ram Motors"); c.type("nvAddr", "Main Road"); c.type("nvBlock", "Gogri"); c.pick("nvMg", "8"); await settle(); c.pick("nvUd", String(u8[0])); c.$("nvOk").checked = true;
  const before = c.calls.filter((x) => x[0] === "nivedanOtpSend").length; c.click("nvSend"); await settle(20);
  ck("N35 जमा पर 'फिर OTP' = OTP दोबारा माँगा जाता है", c.calls.filter((x) => x[0] === "nivedanOtpSend").length === before + 1 && !!c.$("nvOtp")); c.dom.window.close();
  /* v1.1: server पर सहेजते समय टूटा (reason save) = साफ़ संदेश, फ़ॉर्म भरा रहे, सबमिट फिर चालू; दूसरी बार सफल */
  let tries = 0;
  c = nivedan("hi", "?m=naya&s=bihar&k=csc&d=khagaria", { user: { uid: "u1", email: "ram@example.com" }, handlers: { submitListingEdit: () => { if (++tries === 1) { const e = new Error("x"); e.code = "functions/unavailable"; e.details = { reason: "save" }; throw e; } return { ok: true, reqId: "NV-20261125-DEF456" }; } } });
  await settle(10); c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10); c.type("nvOtp", "123456"); c.click("nvChk"); await settle(15);
  c.type("nvName", "Ram Motors"); c.type("nvAddr", "Main Road"); c.type("nvBlock", "Gogri"); c.pick("nvMg", "8"); await settle(); c.pick("nvUd", String(u8[0])); c.$("nvOk").checked = true;
  c.click("nvSend"); await settle(20);
  const keep = c.$("nvName") && c.$("nvName").value === "Ram Motors" && c.$("nvSend") && c.$("nvSend").disabled === false;
  ck("N36 सहेजते समय टूटा = 'कुछ नहीं बिगड़ा, फिर सबमिट'; फ़ॉर्म भरा, बटन चालू", c.msg().indexOf(c.T.rs.save) > -1 && keep, c.msg());
  c.click("nvSend"); await settle(20);
  ck("N37 फिर सबमिट (नया OTP नहीं) = सफल, निवेदन-नंबर", tries === 2 && c.app().indexOf("NV-20261125-DEF456") > -1 && c.calls.filter((x) => x[0] === "nivedanOtpSend").length === 1); c.dom.window.close();
}
/* ---------- NP: पिन-घर (26-Nov-2026) ----------
   Founder: "जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही अपने आप सभी सूचना ले लिया जाए।"
   पिन भरते ही ज़िला और राज्य अपनी ही साइट की सरकारी सूची से; पंचायत और प्रखंड के सुझाव; बेमेल पिन पर चेतावनी (रोक नहीं)। */
async function pinGhar() {
  for (const lang of ["hi", "en"]) {
    const c = nivedan(lang, "?m=naya", { user: { uid: "u1", email: "ram@example.com" } }); c.w.eval(rd("assets/acs-pin.js")); await settle(10);
    c.type("nvReg", "ACS-2026-111111"); c.click("nvNext"); await settle(10); c.click("nvUse"); await settle(10); c.type("nvOtp", "123456"); c.click("nvChk"); await settle(15);
    const T = c.T, m = () => ((c.$("nvPinM") || {}).textContent || ""), HI = lang === "hi";
    c.type("nvPin", "851201"); await settle(40);
    ck("NP1 " + lang + ": पिन 851201 = जगह दिखी (खगड़िया, बिहार); ख़ाली राज्य और ज़िला अपने-आप चुने गए", m() === T.pinAt.replace("{p}", HI ? "खगड़िया · बिहार" : "Khagaria · Bihar") && c.$("nvSt").value === "bihar" && c.$("nvDi").value === "khagaria", m() + " | " + c.$("nvSt").value + "/" + c.$("nvDi").value);
    ck("NP2 " + lang + ": पंचायत और प्रखंड के सुझाव जुड़े; दो प्रखंड हों तो प्रखंड अपने-आप नहीं भरता", c.$("nvPc").getAttribute("list") === "nvPcL" && c.d.querySelectorAll("#nvPcL option").length > 20 &&
      Array.from(c.d.querySelectorAll("#nvBlockL option")).map((o) => o.value).join() === "Chautham,Gogri" && c.$("nvBlock").value === "", Array.from(c.d.querySelectorAll("#nvBlockL option")).map((o) => o.value).join());
    c.type("nvPin", "800001"); await settle(40);
    ck("NP3 " + lang + ": चुने ज़िले (खगड़िया) से अलग पिन (पटना) = चेतावनी; ज़िला नहीं बदला (रोक नहीं)", m() === T.pinOther.replace("{p}", HI ? "पटना · बिहार" : "Patna · Bihar").replace("{d}", HI ? "खगड़िया" : "Khagaria") && c.$("nvDi").value === "khagaria", m());
    c.type("nvPin", "999999"); await settle(40);
    ck("NP4 " + lang + ": सूची में न मिलने वाला पिन = चेतावनी", m() === T.pinNone, m());
    c.type("nvPin", "85120"); await settle(10);
    ck("NP5 " + lang + ": अधूरा पिन = कोई संदेश नहीं", m() === "");
    if (!HI) ck("NP6 en: पिन के संदेशों में हिंदी नहीं", ![T.pinAt, T.pinOk, T.pinNone, T.pinOther].some((x) => DEV.test(x)));
    ck("NP7 " + lang + ": JS-त्रुटि शून्य", c.errors.length === 0, c.errors.join(" | "));
    c.dom.window.close();
  }
  ck("NP8 निवेदन का फ़ॉर्म पिन के लिए कोई बाहरी site नहीं पूछता (helper अपनी ही साइट का)", /sc\.src = "\/assets\/acs-pin\.js"/.test(nvJs) && !/https?:\/\/[^"' ]*(postalpincode|pincode)/i.test(nvJs));
}
(async () => {
  await khoj("hi"); await khoj("en");
  await flow("hi"); await flow("en");
  await more();
  await pinGhar();
  console.log("जाँचें: पास " + pass + " · फेल " + fail);
  console.log(fail ? "⛔ dev_nivedan_check: फेल" : "🏁 dev_nivedan_check v1.2 : पास");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("❌ यंत्र टूटा: " + (e && e.stack || e)); process.exit(1); });
