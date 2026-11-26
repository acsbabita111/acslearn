/* ============================================================
   dev_sector_niyam_check.js v1.1 (26-Nov-2026) : सेक्टर-नियम का पहरा
   Founder का नियम (26-Nov-2026): पूरी website की नींव 24 सेक्टर हैं। कोर्स, नेटवर्क, रजिस्ट्रेशन, जो भी हो,
   इन्हीं 24 में बैठेगा; जो कहीं न बैठे वह 25वें «उपरोक्त में कोई नहीं» में। सेक्टर के भीतर उद्यम-सूची है,
   और हर सूची के नीचे «उपरोक्त में कोई नहीं» कार्ड (कोड 0)। नया कोर्स उसी सूची से मिलाया जाएगा:
   कार्ड है तो उसका कोड, नहीं है तो नया serial और नया कार्ड। उद्यम-सूची पूरी website पर एक जैसी दिखे।
   कोई इस नियम को लाँघ न सके।
   (पूरा नियम: generator/data/sector_muhar.js · औज़ार: generator/sector_darj.js · जाँच का घर: generator/lib_sector.js)
   चलाएँ:  node generator/dev_sector_niyam_check.js
   चार हिस्से:
     अ) आज के data की जाँच (सेक्टर, कार्ड और पहचान, पन्ने, कोर्स और कोड, नेटवर्क, प्रतीक्षा-सूची)।
     आ) सूची हर जगह एक जैसी: हिंदी और English उद्यम-पन्ने, और हर भाषा में सेक्टर के नाम एक ही।
     इ) रजिस्ट्रेशन: सातों भूमिकाओं के फ़ॉर्म में सेक्टर-खाना, विकल्प उसी घर से।
     ई) लाँघने की कोशिशें (एक अलग नक़ली folder में, असली फ़ाइलें अछूती): हर कोशिश पर यंत्र को रुकना चाहिए,
        और औज़ार का सही रास्ता चलना चाहिए।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const LIB = require("./lib_sector.js");
let pass = 0, fail = 0;
const ck = (name, ok, extra) => { if (ok) { pass++; console.log("  ✅ " + name); } else { fail++; console.log("  ❌ " + name + (extra ? "\n       " + String(extra).slice(0, 700) : "")); } };
const rd = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const run = (f, a) => cp.spawnSync(process.execPath, [path.join(__dirname, f)].concat(a || []), { encoding: "utf8" });

console.log("== dev_sector_niyam_check v1.2");
console.log("-- अ) आज का data");
const R = LIB.audit(ROOT);
R.checks.forEach((c) => ck(c.name, c.ok, c.extra));
const st = R.stats;
console.log("     गिनती: सेक्टर " + st.sectors + " + «" + LIB.NONE_NAME + "» · उद्यम-कार्ड " + st.cards + " · कोर्स " + st.courses + " (चालू " + st.live + ", कार्ड-कोड वाले " + st.withCard + ") · नेटवर्क-सेक्टर " + st.net);
console.log("     «" + LIB.NONE_NAME + "» पर रुके (मुहर की प्रतीक्षा-सूची): कोर्स " + st.waiting + " · नेटवर्क-सेक्टर " + st.netWaiting + " · जिन कोर्सों के पन्ने अभी बने नहीं (कोड बाद में): " + st.notLive);

console.log("-- आ) सूची हर जगह एक जैसी");
{
  const D = LIB.load(ROOT), N25 = D.MG_NONE, N0 = D.UDYAM_NONE;
  const r = run("build_udyam_suchi.js", ["--check"]);
  ck("हिंदी और English, दोनों उद्यम-पन्ने generator से ताज़ा (सेक्टर-बटन, पूरी सूची, गिनती)", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const cnt = {}; D.CARDS.forEach((c) => { cnt[c.mg] = (cnt[c.mg] || 0) + 1; });
  const total = D.CARDS.length;
  for (const [lang, file, all] of [["hi", "udyam/index.html", "सब"], ["en", "en/industries/index.html", "All"]]) {
    const page = rd(file), a = page.indexOf("/* UDYAM-MG:START"), b = page.indexOf("/* UDYAM-MG:END */"), blk = a > -1 && b > a ? page.slice(a, b) : "";
    const rows = [...blk.matchAll(/\{id:(\d+),name:'([^']*)'\}/g)].map((m) => [+m[1], m[2]]);
    const want = (id) => (id === 25 ? N25.e + " " + (lang === "en" ? N25.en : N25.n) : D.MG[id].e + " " + (lang === "en" ? D.MG[id].en : D.MG[id].n) + " (" + cnt[id] + ")");
    ck(file + ": सेक्टर-बटन ठीक 25 (24 + «" + LIB.NONE_NAME + "»), नाम mg_names.js से, गिनती उद्यम-सूची से", rows.length === 25 && rows.every(([id, nm], i) => id === i + 1 && nm === want(id)),
      rows.filter(([id, nm]) => id > 25 || nm !== want(id)).slice(0, 4).map((x) => x.join(":")).join(" | ") + " · बटन " + rows.length);
    ck(file + ": सेक्टर-सूची पन्ने पर सिर्फ़ एक बार (दूसरी नक़ल नहीं), और \"" + all + "\" की गिनती असली (" + total + ")", page.split("const MG=[").length === 2 && blk.indexOf("{id:'all',name:'" + all + " (" + total + ")'}") > -1);
    ck(file + ": कार्डों के नीचे «" + LIB.NONE_NAME + "» कार्ड लगाने वाला हिस्सा मौजूद", blk.indexOf("function udyNoneCard(mg)") > -1 && blk.indexOf("renderSectors=function(){r0();udyNoneFix();}") > -1 && blk.indexOf("name:'" + (lang === "en" ? N0.en : N0.name) + "'") > -1);
    const c3 = lang === "en"
      ? page.indexOf('<span class="hs-num">' + total + "</span>") > -1 && page.indexOf('id="sectorCount">All ' + total + " Enterprises</div>") > -1 && page.indexOf("filtered.length===" + total + "?'All " + total + " Enterprises'") > -1
      : page.indexOf('<span class="hs-num">' + total + "</span>") > -1 && page.indexOf('id="sectorCount">सभी ' + total + " उद्यम</div>") > -1 && page.indexOf("filtered.length===" + total + "?'सभी " + total + " उद्यम'") > -1;
    ck(file + ": कुल गिनती तीनों जगह असली (" + total + ")", c3);
  }
  { /* हिंदी पन्ने की पूरी सूची: हर सेक्टर के नीचे ठीक एक «उपरोक्त में कोई नहीं», और 25वाँ ख़ाली कार्ड */
    const page = rd("udyam/index.html"), a = page.indexOf("UDYAM-SUCHI:START"), b = page.indexOf("UDYAM-SUCHI:END"), blk = a > -1 && b > a ? page.slice(a, b) : "";
    const det = blk.split('<details class="us-d">').slice(1), i25 = blk.indexOf('<details class="us-d us-25">');
    const body = det.map((d, i) => (i === det.length - 1 && i25 > -1 ? d.slice(0, d.indexOf('<details class="us-d us-25">')) : d));
    ck("पूरी सूची: 24 सेक्टर, हर एक के सबसे नीचे ठीक एक «" + LIB.NONE_NAME + "» (कार्डों के बाद)", det.length === 24 && body.every((d) => (d.match(/<li class="us-none">/g) || []).length === 1 && d.lastIndexOf('<li class="us-none">') > d.lastIndexOf("<li><a href=") && d.indexOf(N0.name) > -1));
    const last = i25 > -1 ? blk.slice(i25) : "";
    ck("पूरी सूची: 25वाँ सेक्टर «" + LIB.NONE_NAME + "» ख़ाली कार्ड है (कोई उद्यम-कड़ी नहीं, सिर्फ़ वही एक कार्ड)", i25 > -1 && blk.split('<details class="us-d us-25">').length === 2 && last.indexOf(N25.n) > -1 && !/<li><a href=/.test(last) && (last.match(/<li class="us-none">/g) || []).length === 1);
  }
  /* हर भाषा में सेक्टर का नाम एक ही: घर mg_names.js (हिंदी, English); बाक़ी जगहें उसी से मिलनी चाहिए */
  const names = D.seal.SECTORS.map((x) => x[1]);
  const ds = rd("assets/dashboard.js"), me = /const MG_EN = (\{[^}]*\});/.exec(ds), E = me ? JSON.parse(me[1]) : {}, enKeys = Object.keys(E);
  ck("dashboard.js की English-नाम तालिका (MG_EN): कुंजियाँ वही 24 नाम उसी क्रम में, और English नाम mg_names.js वाले", enKeys.length === 24 && enKeys.every((k, i) => k === names[i] && E[k] === D.MG[i + 1].en),
    enKeys.filter((k, i) => k !== names[i] || E[k] !== D.MG[i + 1].en).join(", "));
  const aptEn = require(path.join(ROOT, "generator/data/aptitude/en/apt_en_strings.js")).mg || {};
  const pEn = JSON.parse(rd("generator/data/panel_i18n/en.json")).ui || {};
  const enBad = []; for (let g = 1; g <= 24; g++) { if (aptEn[g] !== D.MG[g].en) enBad.push("अभिरुचि " + g + ":" + aptEn[g]); if (pEn[D.MG[g].n] !== undefined && pEn[D.MG[g].n] !== D.MG[g].en) enBad.push("पैनल " + g + ":" + pEn[D.MG[g].n]); }
  ck("English में हर सेक्टर का एक ही नाम: अभिरुचि-परीक्षा और पैनल के नाम mg_names.js वाले ही", enBad.length === 0, enBad.join(" | "));
  /* दूसरी भाषाएँ: अभिरुचि का नाम = पैनल का नाम। कन्नड़ में 4 पुराने फ़र्क़ दर्ज हैं (सिर्फ़ घट सकते हैं) */
  const KN_DEBT = ["विनिर्माण", "रसायन", "डेटा", "रोबोटिक्स"], lbad = [];
  for (const l of ["bn", "kn"]) { const A = require(path.join(ROOT, "generator/data/aptitude/" + l + "/strings.js")).mg || {}, P = JSON.parse(rd("generator/data/panel_i18n/" + l + ".json")).ui || {};
    for (let g = 1; g <= 24; g++) { const hi = D.MG[g].n; if (P[hi] !== undefined && P[hi] !== A[g] && !(l === "kn" && KN_DEBT.indexOf(hi) > -1)) lbad.push(l + " " + hi + ": «" + A[g] + "» ≠ «" + P[hi] + "»"); } }
  ck("बांग्ला और कन्नड़ में सेक्टर के नाम: अभिरुचि और पैनल में एक ही (कन्नड़ के 4 पुराने फ़र्क़ दर्ज; नया फ़र्क़ नहीं)", lbad.length === 0, lbad.join(" | "));
  const sh = require(path.join(ROOT, "generator/data/udyam_intro_shared.js")).MG_INTRO || {};
  const shBad = Object.keys(sh).filter((g) => !D.MG[g] || String(sh[g].name || "").indexOf(D.MG[g].n + " (") !== 0);
  ck("उद्यम-परिचय के साझा हिस्से (MG_INTRO) में सेक्टर का हिंदी नाम mg_names.js वाला ही", shBad.length === 0, shBad.join(", "));
  const twins = fs.readdirSync(path.join(ROOT, "assets")).filter((f) => /\.js$/.test(f) && ["mg_names.js", "dashboard.js", "roles.js", "suchi_index.js"].indexOf(f) === -1).filter((f) => { const s = rd("assets/" + f); return /MG_NAMES\s*=\s*\{/.test(s) || (names.filter((n) => s.indexOf("'" + n + "'") > -1 || s.indexOf('"' + n + '"') > -1).length >= 20 && /रोबोटिक्स/.test(s) && /डिजिटल वित्त/.test(s)); });
  ck("assets/ की कोई दूसरी फ़ाइल सेक्टर की अपनी सूची नहीं रखती (घर mg_names.js; roles.js और suchi_index.js की प्रतियाँ generator की हैं, नीचे जाँची)", twins.length === 0 && ds.split("MG_NAMES = {").length === 1, twins.join(", "));
}

console.log("-- आ-2) एक ही भाषा, अपने-आप अपडेट (v1.2)");
{
  const D = LIB.load(ROOT), X = LIB.derive(D);
  let r = run("build_suchi_index.js", ["--check"]);
  ck("निकली सूची assets/suchi_index.js generator से ताज़ा", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const w = {}; new Function("window", rd("assets/suchi_index.js"))(w); const SI = w.ACS_SUCHI || {};
  const live = D.COURSES.filter((c) => c.url);
  const urlBad = live.filter((c) => SI.url[LIB.normUrl(c.url)] !== LIB.codeOf(c.mg, c.udyam)).map((c) => c.id);
  ck("निकली सूची: हर चालू कोर्स (" + live.length + ") का पता उसी के «सेक्टर-कार्ड» कोड पर", urlBad.length === 0 && Object.keys(SI.url).length === new Set(live.map((c) => LIB.normUrl(c.url))).size, urlBad.slice(0, 6).join(", "));
  const cardBad = Object.keys(SI.card).filter((n) => { const k = D.CARDS.find((c) => c.n === +n), e = SI.card[n]; return !k || e.m !== k.mg || e.u !== k.intro || e.k !== live.filter((c, i, a) => c.udyam === +n && a.findIndex((x) => x.url && LIB.normUrl(x.url) === LIB.normUrl(c.url)) === i).length; });
  ck("निकली सूची: हर कार्ड (" + Object.keys(SI.card).length + ") का सेक्टर, पन्ना और कोर्स की गिनती data से", cardBad.length === 0, cardBad.join(", "));
  /* सूची के दो काम चलाकर देखना */
  const list = [{ n: 116, course: "/x/" }, { n: 468 }, { n: 1 }]; SI.lagao(list);
  ck("निकली सूची: lagao() कार्ड पर कोर्स-कड़ी रखता है (116 → वेल्डिंग, 468 → सूची का पन्ना, 1 → कुछ नहीं)", list[0].course === "/courses/hi/welding/" && list[1].course === D.seal.SUCHI_PANNA[468] && list[2].course === undefined);
  const mkDoc = (lang) => { const made = []; const main = { firstChild: null, insertBefore: (b) => made.push(b) };
    return { made, d: { documentElement: { lang }, getElementById: () => null, querySelector: (q) => (q === "main" ? main : null), createElement: () => ({ setAttribute: function (k, v) { this[k] = v; } }) } }; };
  const patti = (pth, lang) => { const m = mkDoc(lang), w3 = {}; new Function("window", "document", "location", rd("assets/suchi_index.js") + ";window.ACS_SUCHI.patti();")(w3, m.d, { pathname: pth }); return m.made[0] ? m.made[0].innerHTML : ""; };
  const one = live.find((c) => c.udyam > 0 && SI.card[c.udyam] && SI.card[c.udyam].c.length), zero = live.find((c) => c.udyam === 0);
  const h1 = patti(LIB.normUrl(one.url), "hi"), h2 = patti(LIB.normUrl(one.url) + "index.html", "en"), h3 = zero ? patti(LIB.normUrl(zero.url), "hi") : "skip", h4 = patti("/courses/hi/", "hi");
  ck("कोर्स-घर की पट्टी: सेक्टर और उद्यम का नाम data से (हिंदी और English), U-नंबर के साथ; कोड 0 पर «जुड़ना बाक़ी»; कोर्स-सूची के पन्ने पर कुछ नहीं",
    h1.indexOf(D.MG[one.mg].n) > -1 && h1.indexOf("(U" + ("000" + one.udyam).slice(-4) + ")") > -1 && h1.indexOf(SI.card[one.udyam].u) > -1 && h2.indexOf(D.MG[one.mg].en) > -1 && h2.indexOf("Sector") > -1 &&
    (h3 === "skip" || (h3.indexOf("बाक़ी") > -1 && h3.indexOf("(U") === -1)) && h4 === "" && !/font-size:1[0-5]px/.test(h1), h1.slice(0, 200));
  const uni = rd("assets/acs-universal.js"), apt = rd("assets/apt-session.js");
  ck("कोर्स-घर की पट्टी का hook acs-universal.js में ठीक एक बार; अभिरुचि का नतीजा भी निकली सूची पढ़ता है (न उतरे तो भी नतीजा बनता है)",
    uni.split("s.src = '/assets/suchi_index.js'").length === 2 && uni.split("ACS_SUCHI.patti").length === 3 && apt.split("loadScript('/assets/suchi_index.js', aptGo, aptGo)").length === 2 && apt.split("ACS_SUCHI.lagao(SEC)").length === 2);
  const noUni = live.filter((c, i, a) => a.findIndex((x) => x.url === c.url) === i).filter((c) => { let p = c.url; if (/\/$/.test(p)) p += "index.html"; return rd(p.replace(/^\//, "")).indexOf("/assets/acs-universal.js") === -1; }).map((c) => c.id);
  ck("कोर्स-घर: acs-universal.js वाले पन्नों पर पट्टी अपने-आप (बिना universal के पुराने घर: " + noUni.length + ", क़र्ज़-सूची से ज़्यादा नहीं)", noUni.length <= 2 && noUni.every((id) => ["SE017", "PJ017"].indexOf(id) > -1), noUni.join(", "));
  /* कोर्स-सूची का पन्ना: हाथ की सूची नहीं */
  const cp2 = rd("courses/hi/index.html");
  const all = D.COURSES.filter((c) => c._group === "SELF_EMP_COURSES" || c._group === "PRIVATE_JOB_COURSES"), kk = {}, seen = {};
  new Function("window", rd("assets/courses_data.js"))(w); (w.KKB_GROUPS || []).forEach((g) => (g.ids || []).forEach((id) => { kk[id] = 1; }));
  const hunar = all.filter((c) => c.url && !kk[c.id] && !seen[c.url] && (seen[c.url] = 1));
  ck("कोर्स-सूची का पन्ना: हुनर के तैयार कोर्स की हाथ की सूची (READY_IDS) नहीं रही; नियम data से (" + hunar.length + " कोर्स)", cp2.indexOf("READY_IDS = [") === -1 && cp2.indexOf("READY_IDS.map") === -1 && cp2.indexOf("!kk[c.id] && !seen[c.url]") > -1 && hunar.length >= 10);
  /* उद्यम-पन्ना: कार्ड की कोर्स-कड़ियाँ निकली सूची से */
  const up = rd("udyam/index.html"), ks = up.slice(up.indexOf("const UDY_K="), up.indexOf("/* UDYAM-MG:END */")), UK = new Function(ks + ";return {UDY_K:UDY_K,f:udyCourseLinks};")();
  const ukBad = Object.keys(X.card).filter((n) => { const e = X.card[n], k = UK.UDY_K[n]; return !k || k.k !== e.k || (k.l || "") !== (e.l || "") || k.c.map((c) => c[1]).join() !== e.c.map((c) => c[3]).join(); });
  const multi = Object.keys(X.card).find((n) => X.card[n].c.length > 1);
  ck("उद्यम-पन्ना: कार्ड की कोर्स-कड़ियाँ निकली सूची से (" + Object.keys(UK.UDY_K).length + " कार्ड); कई कोर्स वाले कार्ड पर हर कोर्स की अपनी कड़ी; साँचे में हाथ की कड़ी नहीं",
    ukBad.length === 0 && Object.keys(UK.UDY_K).length === Object.keys(X.card).length && up.split("${udyCourseLinks(s)}").length === 2 && up.indexOf("${s.course?`<a href") === -1 &&
    (!multi || (UK.f({ n: +multi }).match(/<a /g) || []).length === X.card[multi].c.length) && UK.f({ n: 999999, course: "/c/" }).indexOf('href="/c/"') > -1 && UK.f({ n: 999999 }) === "", ukBad.join(", "));
  /* कार्ड के परिचय-पन्ने पर उसके हर कोर्स का बटन */
  const noBtn = []; Object.keys(X.card).forEach((n) => { const e = X.card[n]; const h = rd(e.u.replace(/^\//, "")); (e.l ? [e.l] : e.c.map((c) => c[3])).forEach((u) => { if (h.indexOf('href="' + u) === -1 && h.indexOf('href="' + u.replace(/\/$/, "/index.html")) === -1) noBtn.push(n + ":" + u); }); });
  ck("कार्ड का परिचय-पन्ना: जिस कार्ड पर कोर्स है, उसके पन्ने पर हर कोर्स का बटन", noBtn.length === 0, noBtn.join(" | "));
  r = run("portal_sync.js", ["--check"]);
  ck("पूरा पोर्टल ताज़ा: node generator/portal_sync.js --check (हर generator की अपनी जाँच + नियम की जाँच)", r.status === 0, ((r.stdout || "") + (r.stderr || "")).split("\n").filter((x) => /❌/.test(x)).join(" | "));
}

console.log("-- इ) रजिस्ट्रेशन में सेक्टर");
{
  const D = LIB.load(ROOT), r = run("build_sector_khana.js", ["--check"]);
  ck("assets/roles.js का सेक्टर-खाना generator से ताज़ा", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const w = {}; new Function("window", rd("assets/roles.js"))(w); const cards = w.ACS_ROLES.cards;
  const NEED = ["teacher", "ustad", "center", "workshop", "counselor", "employer", "vendor"];
  const has = cards.filter((c) => (c.fields || []).some((f) => f.id === "sector")).map((c) => c.key);
  ck("सेक्टर-खाना ठीक इन 7 भूमिकाओं में: उस्ताद, शिक्षक, सलाहकार, केंद्र, वर्कशॉप, नियोक्ता, Vendor", has.slice().sort().join(",") === NEED.slice().sort().join(","), "मिला: " + has.join(","));
  const bad = [];
  for (const c of cards.filter((x) => NEED.indexOf(x.key) > -1)) { const f = c.fields.filter((x) => x.id === "sector");
    if (f.length !== 1 || f[0].type !== "select" || f[0].required !== true) { bad.push(c.key + ": खाना ज़रूरी (required) select नहीं"); continue; }
    const o = f[0].options || []; if (o.length !== 25) { bad.push(c.key + ": विकल्प " + o.length); continue; }
    o.forEach((x, i) => { const g = i + 1, hi = g === 25 ? D.MG_NONE.n : D.MG[g].n, en = g === 25 ? D.MG_NONE.en : D.MG[g].en; if (x.v !== String(g) || x.hi !== hi || x.en !== en) bad.push(c.key + " विकल्प " + g); }); }
  ck("हर फ़ॉर्म में सेक्टर चुनना ज़रूरी; विकल्प ठीक 25 (कूट 1 से 25), नाम mg_names.js से हूबहू (हिंदी और English)", bad.length === 0, bad.slice(0, 6).join(" | "));
  const pk = []; for (const l of ["en", "kn", "bn"]) { const s = rd("assets/i18n/panel_" + l + ".js"); for (const k of ["आपके काम का सेक्टर", LIB.NONE_NAME]) if (s.indexOf(JSON.stringify(k) + ":") === -1) pk.push(l + ": " + k); }
  ck("English, कन्नड़ और बांग्ला पैनल-पैक में नए खाने के शब्द मौजूद", pk.length === 0, pk.join(" | "));
}

console.log("-- ई) लाँघने की कोशिशें (नक़ली folder में; असली फ़ाइलें अछूती)");
{
  const T = fs.mkdtempSync(path.join(os.tmpdir(), "acs-sector-"));
  const FILES = ["assets/mg_names.js", "assets/udyam_data.js", "assets/courses_data.js", "generator/data/sector_muhar.js", "generator/data/udyam_serial_ledger.json",
    "generator/data/course_code_ledger.json", "generator/data/network/taxonomy.js", "sitemap-udyam.xml",
    "assets/suchi_index.js", "assets/network/nivedan_data.json", "bhasha.html"].concat(fs.readdirSync(path.join(ROOT, "assets")).filter((f) => /^apt_udyam_[a-z]{2,3}\.js$/.test(f)).map((f) => "assets/" + f));
  const APTF = FILES.filter((f) => /apt_udyam_/.test(f));
  /* syncT(): असली औज़ार हर बदलाव के बाद पोर्टल ताज़ा करता है (portal_sync)। नक़ली folder में वही तीन निकली चीज़ें यहाँ ताज़ा होती हैं,
     ताकि हर कोशिश में सिर्फ़ वही नियम परखा जाए जिसकी वह कोशिश है (बासी सूची का अपना परीक्षण अलग है)। */
  const syncT = () => { try {
    cp.spawnSync(process.execPath, [path.join(__dirname, "build_suchi_index.js"), "--root", T], { encoding: "utf8" });
    const D = LIB.load(T), nvP = path.join(T, "assets/network/nivedan_data.json"), nv = JSON.parse(fs.readFileSync(nvP, "utf8"));
    nv.u = D.CARDS.map((c) => [c.n, c.mg, c.name, ""]); fs.writeFileSync(nvP, JSON.stringify(nv));
    for (const f of APTF) { const w = {}; new Function("window", fs.readFileSync(path.join(T, f), "utf8"))(w); D.CARDS.forEach((c) => { if (!w.APT_UDN.n[c.n]) w.APT_UDN.n[c.n] = "x"; }); fs.writeFileSync(path.join(T, f), "window.APT_UDN=" + JSON.stringify(w.APT_UDN) + ";"); }
  } catch (e) {} };
  const STUB = "<!doctype html><html><head><title>x</title></head><body>" + "x".repeat(600) + "</body></html>";
  const stubs = LIB.load(ROOT).CARDS.map((c) => c.intro);
  fs.mkdirSync(path.join(T, "udyam"), { recursive: true }); for (const u of stubs) fs.writeFileSync(path.join(T, u), STUB);
  const fresh = () => { for (const f of FILES) { fs.mkdirSync(path.dirname(path.join(T, f)), { recursive: true }); fs.copyFileSync(path.join(ROOT, f), path.join(T, f)); }
    for (const f of fs.readdirSync(path.join(T, "udyam"))) if (stubs.indexOf("/udyam/" + f) === -1) fs.unlinkSync(path.join(T, "udyam", f)); };
  const ed = (f, fn) => { const p = path.join(T, f), s = fs.readFileSync(p, "utf8"), t = fn(s); if (t === s) throw new Error("बदलाव लगा ही नहीं: " + f); fs.writeFileSync(p, t); };
  /* bad(): जाँच चली और रुकी। (जाँच ही न चल पाए, जैसे बिगड़ी फ़ाइल, तो उसे "रुका" नहीं गिना जाता: वह कोशिश की अपनी ग़लती है।) */
  const bad = () => { syncT(); return LIB.audit(T).fail > 0; };
  const good = () => { syncT(); return LIB.audit(T).fail === 0; };
  const failNames = () => LIB.audit(T).checks.filter((c) => !c.ok).map((c) => c.name).join(" || ");
  const tool = (args) => cp.spawnSync(process.execPath, [path.join(__dirname, "sector_darj.js")].concat(args, ["--root", T]), { encoding: "utf8" });
  const before = FILES.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8"));
  const t = (name, fn) => { fresh(); let ok = false, ex = ""; try { ok = fn(); } catch (e) { ex = e.message; } ck(name, ok, ex); };
  const NEW = 'const SELF_EMP_COURSES = [', addCourse = (row) => ed("assets/courses_data.js", (s) => s.replace(NEW, NEW + row + ", "));
  const course = (id) => LIB.load(T).COURSES.find((c) => c.id === id);
  /* fillWait(): प्रतीक्षा-सूची को औज़ार से ही सीमा तक भरना (परख आज की सूची के आकार पर न टिके) */
  const fillWait = () => { let i = 0; while (LIB.load(T).seal.PRATIKSHA.courses.length < LIB.HARD_LIMIT.courses) { const id = "SE98" + (i++);
    addCourse('{"id": "' + id + '", "mg": 3, "name_hi": "भराव", "name_en": "Fill", "url": "/courses/hi/bharav-' + i + '/"}');
    const r = tool(["course", "--id", id, "--udyam", "0", "--muhar", "--karan", "परख के लिए भराव (सीमा तक)"]); if (r.status !== 0) throw new Error("fillWait: " + r.stderr); } };
  fresh(); ck("नक़ली folder में शुरू की जाँच पास (तुलना का आधार)", good());
  /* --- सेक्टर --- */
  t("26वाँ सेक्टर जोड़ा (सूची में 25: भाषा) → रुका", () => { ed("assets/mg_names.js", (s) => s.replace(/(24:\s*\{[^}]*\})/, '$1,\n  25: { e:"🗣️", n:"भाषा", en:"Language" }')); return bad(); });
  t("किसी सेक्टर का नाम बदला → रुका", () => { ed("assets/mg_names.js", (s) => s.replace('n:"कृषि"', 'n:"खेती"')); return bad(); });
  t("एक सेक्टर हटाया (23 बचे) → रुका", () => { ed("assets/mg_names.js", (s) => s.replace(/\n\s*24:\s*\{[^}]*\},?/, "")); return bad(); });
  t("25वें सेक्टर का नाम बदला («अन्य») → रुका", () => { ed("assets/mg_names.js", (s) => s.replace('id:25, e:"➕", n:"उपरोक्त में कोई नहीं"', 'id:25, e:"➕", n:"अन्य"')); return bad(); });
  t("25वें सेक्टर का नाम mg_names.js और मुहर, दोनों में बदला → फिर भी रुका (यंत्र में भी लिखा है)", () => { ed("assets/mg_names.js", (s) => s.replace('id:25, e:"➕", n:"उपरोक्त में कोई नहीं"', 'id:25, e:"➕", n:"भाषा"')); ed("generator/data/sector_muhar.js", (s) => s.replace('const NONE_SECTOR = [25, "उपरोक्त में कोई नहीं"]', 'const NONE_SECTOR = [25, "भाषा"]')); return bad(); });
  t("«उपरोक्त में कोई नहीं» कार्ड का कोड बदला (0 → 999) → रुका", () => { ed("assets/mg_names.js", (s) => s.replace("window.UDYAM_NONE = { n:0,", "window.UDYAM_NONE = { n:999,")); return bad(); });
  t("किसी सेक्टर का English नाम मिटाया → रुका", () => { ed("assets/mg_names.js", (s) => s.replace(', en:"Agriculture"', "")); return bad(); });
  /* --- कोर्स --- */
  t("नया कोर्स बिना सेक्टर के जोड़ा → रुका", () => { addCourse('{"id": "SE999", "name_hi": "नया कोर्स", "name_en": "New"}'); return bad(); });
  t("नया चालू कोर्स, सेक्टर है पर उद्यम-कार्ड का कोड नहीं → रुका", () => { addCourse('{"id": "SE999", "mg": 3, "name_hi": "नया कोर्स", "name_en": "New", "url": "/courses/hi/naya/"}'); return bad(); });
  t("नया कोर्स, कार्ड-कोड ऐसा जो है ही नहीं (9999) → रुका", () => { addCourse('{"id": "SE999", "mg": 3, "udyam": 9999, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); return bad(); });
  t("नया कोर्स एक सेक्टर में, कार्ड दूसरे सेक्टर का → रुका", () => { addCourse('{"id": "SE999", "mg": 7, "udyam": 116, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); return bad(); });
  t("नया कोर्स सही कार्ड के साथ, पर हाथ से (कोड के खाते के बिना) → रुका", () => { addCourse('{"id": "SE999", "mg": 3, "udyam": 116, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); return bad(); });
  t("नया कोर्स चुपके से «उपरोक्त में कोई नहीं» (कोड 0) पर, मुहर के बिना → रुका", () => { addCourse('{"id": "SE999", "mg": 3, "udyam": 0, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); ed("generator/data/course_code_ledger.json", (s) => s.replace("{\n", '{\n"SE999": "3-0",\n')); return bad(); });
  t("सीमा भरी हो, फिर एक और कोर्स कोड 0 पर और मुहर की सूची में उसका नाम भी हाथ से → सीमा पर रुका (" + LIB.HARD_LIMIT.courses + " से ज़्यादा नहीं)", () => { fillWait();
    addCourse('{"id": "SE999", "mg": 3, "udyam": 0, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); ed("generator/data/course_code_ledger.json", (s) => s.replace("{\n", '{\n"SE999": "3-0",\n'));
    ed("generator/data/sector_muhar.js", (s) => s.replace("  courses: [\n", '  courses: [\n    "SE999",   /* हाथ से */\n')); syncT(); return failNames().indexOf("सीमा के भीतर") > -1; });
  t("प्रतीक्षा-सूची की सीमा मुहर में बढ़ाई (3 → 30) → रुका (यंत्र में भी लिखी है)", () => { ed("generator/data/sector_muhar.js", (s) => s.replace("const LIMIT = { courses: 3,", "const LIMIT = { courses: 30,")); return bad(); });
  t("नया कोर्स सेक्टर 25 में, पर कार्ड-कोड किसी असली कार्ड का → रुका (25 ख़ाली कार्ड है)", () => { addCourse('{"id": "SE999", "mg": 25, "udyam": 116, "name_hi": "नया", "name_en": "New"}'); return bad(); });
  t("नया कोर्स सेक्टर 25 में, कार्ड-कोड लिखा ही नहीं → रुका", () => { addCourse('{"id": "SE999", "mg": 25, "name_hi": "नया", "name_en": "New"}'); return bad(); });
  t("चालू कोर्स से कार्ड-कोड हटाया (SE021) → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('{"id": "SE021", "udyam": 116, ', '{"id": "SE021", ')); return bad(); });
  t("पक्का कोड हाथ से बदला (भाषा-कोर्स PJ018: कार्ड 468 → 474, उसी सेक्टर का) → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('{"id": "PJ018", "udyam": 468, ', '{"id": "PJ018", "udyam": 474, ')); return bad(); });
  t("कोड वाला कोर्स सूची से ही हटा दिया (PJ434) → रुका", () => { ed("assets/courses_data.js", (s) => { const k = '{"id": "PJ434", ', a = s.indexOf(k); let d = 0, i = a, q = false; for (; i < s.length; i++) { const ch = s[i]; if (q) { if (ch === "\\") i++; else if (ch === '"') q = false; continue; } if (ch === '"') q = true; else if (ch === "{") d++; else if (ch === "}") { d--; if (d === 0) break; } } return s.slice(0, a).replace(/,\s*$/, "") + s.slice(i + 1); }); return bad(); });
  /* --- कार्ड, पहचान (SN-02) और पन्ना (SN-01) --- */
  const NX = LIB.load(ROOT).CARDS.length + 1;
  const HAND = '}, {"n": ' + NX + ', "name": "हाथ का कार्ड", "mg": 3, "invest": "x", "intro": "/udyam/haath-ka-card.html"}];';
  t("हाथ से नया कार्ड जोड़ा (खाते के बिना) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/\}\];/, HAND)); return bad(); });
  t("हाथ से नया कार्ड और खाते में भी हाथ से दर्ज, पर पन्ना बना ही नहीं → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/\}\];/, HAND)); ed("generator/data/udyam_serial_ledger.json", (s) => s.replace(/\n\}\n$/, ',\n"952": {"u":"/udyam/haath-ka-card.html","n":"हाथ का कार्ड","mg":3}\n}\n')); return bad(); });
  t("वही, पन्ना भी रख दिया, पर sitemap में पता नहीं → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/\}\];/, HAND)); ed("generator/data/udyam_serial_ledger.json", (s) => s.replace(/\n\}\n$/, ',\n"952": {"u":"/udyam/haath-ka-card.html","n":"हाथ का कार्ड","mg":3}\n}\n')); fs.writeFileSync(path.join(T, "udyam/haath-ka-card.html"), STUB); return bad(); });
  t("किसी पुराने कार्ड का पन्ना मिटा दिया (फ़ाइल नहीं) → रुका", () => { fs.unlinkSync(path.join(T, "udyam/rice-cultivation-milling.html")); const r = bad(); fs.writeFileSync(path.join(T, "udyam/rice-cultivation-milling.html"), STUB); return r; });
  t("किसी पुराने कार्ड का serial बदला (116 → 9116) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('{"n": 116, ', '{"n": 9116, ')); return bad(); });
  t("एक पुराना कार्ड हटाया → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/, \{"n": 950, [^}]*\}/, "")); return bad(); });
  t("पुराने serial पर दूसरा उद्यम बैठाया (पन्ना बदला) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('"intro": "/udyam/rice-cultivation-milling.html"', '"intro": "/udyam/koi-aur-udyam.html"')); return bad(); });
  t("पुराने serial का नाम हाथ से बदला (पन्ना वही) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('{"n": 468, "name": "भाषा संस्थान [Language Institute]"', '{"n": 468, "name": "कोचिंग केंद्र [Coaching Centre]"')); return bad(); });
  t("नाम में सिर्फ़ कोष्ठक की शक्ल बदली ([ ] → ( )) → चलता है (यह नाम बदलना नहीं)", () => { ed("assets/udyam_data.js", (s) => s.replace('{"n": 468, "name": "भाषा संस्थान [Language Institute]"', '{"n": 468, "name": "भाषा संस्थान (Language Institute)"')); return good(); });
  t("पुराने कार्ड का सेक्टर हाथ से बदला (कार्ड 2: सेक्टर 1 → 3) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/(\{"n": 2, [^}]*"mg": )1,/, "$13,")); return bad(); });
  t("कार्ड को सेक्टर 25 में रखा (वह ख़ाली कार्ड है) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/(\{"n": 2, [^}]*"mg": )1,/, "$125,")); ed("generator/data/udyam_serial_ledger.json", (s) => s.replace('"n":"गेहूं [Wheat]","mg":1}', '"n":"गेहूं [Wheat]","mg":25}')); return bad(); });
  /* --- नेटवर्क --- */
  t("नेटवर्क में नया सेक्टर बिना कार्ड-कोड के → रुका", () => { ed("generator/data/network/taxonomy.js", (s) => s.replace("const SECTORS = {", 'const SECTORS = {\n  naya: { id: "NY", slug: "naya", mg: 4, icon: "x", status: "planned", hi: "नया", en: "New" },')); return bad(); });
  t("नेटवर्क में नया सेक्टर चुपके से कोड 0 पर (मुहर के बिना) → रुका", () => { ed("generator/data/network/taxonomy.js", (s) => s.replace("const SECTORS = {", 'const SECTORS = {\n  naya: { id: "NY", slug: "naya", mg: 4, udyam: 0, icon: "x", status: "planned", hi: "नया", en: "New" },')); return bad(); });
  t("नेटवर्क का सेक्टर ग़लत सेक्टर के कार्ड से जोड़ा → रुका", () => { ed("generator/data/network/taxonomy.js", (s) => s.replace("mg: 3, udyam: 132,", "mg: 3, udyam: 310,")); return bad(); });
  /* --- औज़ार का सही रास्ता --- */
  t("औज़ार: सेक्टर 25 का कार्ड बनाने से मना (25 ख़ाली कार्ड है)", () => tool(["card", "--mg", "25", "--name", "नया (New)", "--slug", "naya-udyam"]).status !== 0 && good());
  t("औज़ार: उसी नाम का कार्ड दोबारा बनाने से मना (पहले से है → उसी का कोड लगे)", () => { const r = tool(["card", "--mg", "11", "--name", "भाषा संस्थान (Language Institute)", "--slug", "bhasha-sansthan-2"]); return r.status !== 0 && /serial 468/.test(r.stderr); });
  t("औज़ार: कोर्स को दूसरे सेक्टर के कार्ड से जोड़ने से मना (SE021 → 310)", () => tool(["course", "--id", "SE021", "--udyam", "310"]).status !== 0 && good());
  t("औज़ार: पक्का कोड बदलने से मना (PJ018: 468 → 474); --badlo के साथ चलता है और खाता भी बदलता है", () => {
    if (tool(["course", "--id", "PJ018", "--udyam", "474"]).status === 0 || !good()) return false;
    const r = tool(["course", "--id", "PJ018", "--udyam", "474", "--badlo"]); return r.status === 0 && course("PJ018").udyam === 474 && LIB.load(T).CLEDGER.PJ018 === "11-474" && good(); });
  t("औज़ार: «उपरोक्त में कोई नहीं» (कोड 0) पर रखने से मना, जब तक --muhar न हो; --muhar पर भी सीमा भरी हो तो मना", () => { fillWait();
    addCourse('{"id": "SE999", "mg": 3, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}');
    const r1 = tool(["course", "--id", "SE999", "--udyam", "0"]), r2 = tool(["course", "--id", "SE999", "--udyam", "0", "--muhar", "--karan", "नया कार्ड बनना बाक़ी है"]);
    return r1.status !== 0 && /muhar/.test(r1.stderr) && r2.status !== 0 && /प्रतीक्षा-सूची भरी/.test(r2.stderr) && course("SE999").udyam === undefined; });
  t("औज़ार: नया कोर्स सही रास्ते से (कार्ड का कोड) → जाँच पास, कोड खाते में", () => {
    addCourse('{"id": "SE999", "mg": 3, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}'); if (!bad()) return false;
    return tool(["course", "--id", "SE999", "--udyam", "116"]).status === 0 && good() && LIB.load(T).CLEDGER.SE999 === "3-116"; });
  t("औज़ार: नया कार्ड = सबसे बड़ा serial + 1, खाते में पन्ना + नाम + सेक्टर; पन्ना और sitemap बनने तक दरवाज़ा बंद; फिर रुका कोर्स उस पर आए तो प्रतीक्षा-सूची से अपने-आप हटे", () => {
    fillWait(); const W0 = LIB.load(T).seal.PRATIKSHA.courses, wid = W0[0], wmg = course(wid).mg;
    const n0 = LIB.load(T).CARDS.length, r = tool(["card", "--mg", String(wmg), "--name", "कंप्यूटर और प्रिंटर मरम्मत (Computer and Printer Repair)", "--slug", "computer-printer-repair-service"]);
    const D = LIB.load(T), last = D.CARDS[D.CARDS.length - 1], L = D.LEDGER[n0 + 1];
    if (r.status !== 0 || D.CARDS.length !== n0 + 1 || last.n !== n0 + 1 || last.mg !== wmg || !L || L.u !== "/udyam/computer-printer-repair-service.html" || L.mg !== wmg || L.n !== last.name) return false;
    if (!bad()) return false;                                   /* पन्ना नहीं बना: रुकना चाहिए */
    fs.writeFileSync(path.join(T, "udyam/computer-printer-repair-service.html"), STUB); if (!bad()) return false;   /* sitemap में नहीं: रुकना चाहिए */
    ed("sitemap-udyam.xml", (s) => s.replace("</urlset>", "<url><loc>https://acslearn.com/udyam/computer-printer-repair-service.html</loc></url>\n</urlset>")); if (!good()) return false;
    const r2 = tool(["course", "--id", wid, "--udyam", String(n0 + 1)]); const D2 = LIB.load(T);
    return r2.status === 0 && good() && course(wid).udyam === n0 + 1 && D2.seal.PRATIKSHA.courses.indexOf(wid) === -1 && D2.seal.PRATIKSHA.courses.length === W0.length - 1 && D2.CLEDGER[wid] === wmg + "-" + (n0 + 1); });
  t("औज़ार: कोर्स का सेक्टर कार्ड वाला करना सिर्फ़ --mg-badlo के साथ (प्रतीक्षा वाला कोर्स → दूसरे सेक्टर का कार्ड); प्रतीक्षा-सूची से हटे", () => {
    fillWait(); const wid = LIB.load(T).seal.PRATIKSHA.courses[0], c0 = course(wid), k = LIB.load(T).CARDS.find((x) => x.mg !== c0.mg && !LIB.derive(LIB.load(T)).card[x.n]);
    if (tool(["course", "--id", wid, "--udyam", String(k.n)]).status === 0) return false;
    const r = tool(["course", "--id", wid, "--udyam", String(k.n), "--mg-badlo"]); const c = course(wid), D2 = LIB.load(T);
    return r.status === 0 && c.udyam === k.n && c.mg === k.mg && D2.CLEDGER[wid] === k.mg + "-" + k.n && D2.seal.PRATIKSHA.courses.indexOf(wid) === -1 && good(); });
  t("औज़ार: कार्ड का नाम बदलना (naam): data और खाता दोनों बदलें, serial, पन्ना और सेक्टर वही, जाँच पास", () => {
    const r = tool(["naam", "--n", "468", "--name", "भाषा और लिपि संस्थान (Language and Script Institute)"]); const D2 = LIB.load(T), k = D2.CARDS.find((x) => x.n === 468);
    return r.status === 0 && k.name === "भाषा और लिपि संस्थान (Language and Script Institute)" && D2.LEDGER[468].n === k.name && D2.LEDGER[468].u === k.intro && k.mg === 11 && good(); });
  t("औज़ार: कार्ड को दूसरे सेक्टर में ले जाना सिर्फ़ --badlo के साथ (कार्ड 949: 24 → 21); खाता भी बदले, जाँच पास", () => {
    if (tool(["sector", "--n", "949", "--mg", "21"]).status === 0 || !good()) return false;
    const r = tool(["sector", "--n", "949", "--mg", "21", "--badlo"]); const D2 = LIB.load(T), k = D2.CARDS.find((x) => x.n === 949);
    return r.status === 0 && k.mg === 21 && D2.LEDGER[949].mg === 21 && D2.LEDGER[949].u === k.intro && good(); });
  t("औज़ार: जिस कार्ड पर कोर्स के कोड लगे हैं, वह --saath के बिना नहीं हिलता (कार्ड 116); --saath से कोर्स भी साथ जाते हैं; 25 में कभी नहीं", () => {
    if (tool(["sector", "--n", "116", "--mg", "4", "--badlo"]).status === 0 || !good()) return false;
    if (tool(["sector", "--n", "116", "--mg", "25", "--badlo", "--saath"]).status === 0 || !good()) return false;
    const r = tool(["sector", "--n", "116", "--mg", "4", "--badlo", "--saath"]); const D2 = LIB.load(T);
    return r.status === 0 && course("SE021").mg === 4 && course("LJ011").mg === 4 && D2.CLEDGER.SE021 === "4-116" && D2.CLEDGER.LJ011 === "4-116" && good(); });
  t("औज़ार: mg आदेश चालू या कोड वाले कोर्स का सेक्टर नहीं बदलता (PJ018), बिना पन्ने वाले का लिखता है (GJ001)", () =>
    tool(["mg", "--id", "PJ018", "--mg", "10"]).status !== 0 && tool(["mg", "--id", "GJ001", "--mg", "11"]).status === 0 && course("GJ001").mg === 11 && good());
  t("औज़ार: खाते दोबारा नहीं बनते (khata-v2, kcode-banao दूसरी बार मना)", () => tool(["khata-v2"]).status !== 0 && tool(["kcode-banao"]).status !== 0 && good());
  /* --- v1.2: निकली सूची और अपने-आप अपडेट --- */
  t("कोर्स का कोड औज़ार से बदला, पर पोर्टल ताज़ा नहीं किया → निकली सूची बासी → रुका (इलाज: portal_sync)", () => {
    const D0 = LIB.load(T), X0 = LIB.derive(D0), c0 = D0.COURSES.find((c) => c.url && c.udyam > 0 && X0.card[c.udyam].k === 1 && D0.COURSES.filter((x) => x.url === c.url).length === 1);
    const k = D0.CARDS.find((x) => x.mg === c0.mg && x.n !== c0.udyam && !X0.card[x.n] && !Object.keys(D0.NET).some((y) => D0.NET[y].udyam === c0.udyam));
    const r = tool(["course", "--id", c0.id, "--udyam", String(k.n), "--badlo"]); const fn = failNames();
    return r.status === 0 && fn.indexOf("निकली सूची ताज़ा") > -1 && fn.indexOf("||") === -1 && good(); });
  t("निकली सूची हाथ से बदली (एक कोर्स का कोड) → रुका", () => { ed("assets/suchi_index.js", (s) => s.replace('"/courses/hi/welding/": "3-116"', '"/courses/hi/welding/": "3-117"')); return failNames().indexOf("निकली सूची ताज़ा") > -1; });
  t("निकली सूची मिटा दी → रुका", () => { fs.unlinkSync(path.join(T, "assets/suchi_index.js")); return failNames().indexOf("निकली सूची ताज़ा") > -1; });
  t("एक ही पन्ने के दो कोर्स, पर कोड अलग (LJ011 → 117, SE021 वहीं) → रुका", () => {
    const r = tool(["course", "--id", "LJ011", "--udyam", "117", "--badlo"]); syncT(); return r.status === 0 && failNames().indexOf("एक पता, एक कोड") > -1; });
  t("बहुत कोर्स वाले कार्ड (468) की सूची का पन्ना मुहर से हटाया → रुका", () => { ed("generator/data/sector_muhar.js", (s) => s.replace('const SUCHI_PANNA = { 468: "/bhasha.html" };', "const SUCHI_PANNA = {};")); syncT(); return failNames().indexOf("सूची का पन्ना") > -1; });
  t("नया कार्ड बना, पन्ना और sitemap भी; पर निवेदन-फ़ॉर्म की सूची में नहीं → रुका", () => {
    const r = tool(["card", "--mg", "7", "--name", "परख कार्ड (Test Card)", "--slug", "parakh-card-business"]); const n = LIB.load(T).CARDS.length;
    fs.writeFileSync(path.join(T, "udyam/parakh-card-business.html"), STUB); ed("sitemap-udyam.xml", (s) => s.replace("</urlset>", "<url><loc>https://acslearn.com/udyam/parakh-card-business.html</loc></url></urlset>"));
    cp.spawnSync(process.execPath, [path.join(__dirname, "build_suchi_index.js"), "--root", T]);
    const fn = failNames(); return r.status === 0 && fn.indexOf("दोहराई जाती है") > -1 && fn.indexOf("||") === -1 && good() && LIB.load(T).CARDS.length === n; });
  t("नया कार्ड बना, पर अभिरुचि के एक भाषा-पैक में उसका नाम नहीं → रुका", () => {
    tool(["card", "--mg", "7", "--name", "परख कार्ड (Test Card)", "--slug", "parakh-card-business"]);
    fs.writeFileSync(path.join(T, "udyam/parakh-card-business.html"), STUB); ed("sitemap-udyam.xml", (s) => s.replace("</urlset>", "<url><loc>https://acslearn.com/udyam/parakh-card-business.html</loc></url></urlset>"));
    syncT(); const n = LIB.load(T).CARDS.length; ed(APTF[0], (s) => s.replace('"' + n + '":"x"', '"0":"x"')); return failNames().indexOf("दोहराई जाती है") > -1; });
  t("औज़ार net: नेटवर्क-सेक्टर को «उपरोक्त में कोई नहीं» पर रखने से मना (--muhar बिना); पक्का कोड बदलने से मना (--badlo बिना)", () => {
    const k = Object.keys(LIB.load(T).NET).find((x) => LIB.load(T).NET[x].udyam > 0), N = LIB.load(T).NET[k];
    const other = LIB.load(T).CARDS.find((c) => c.mg === N.mg && c.n !== N.udyam).n;
    return tool(["net", "--key", k, "--udyam", "0"]).status !== 0 && tool(["net", "--key", k, "--udyam", String(other)]).status !== 0 && tool(["net", "--key", "nahi", "--udyam", "1"]).status !== 0 && LIB.load(T).NET[k].udyam === N.udyam && good(); });
  t("औज़ार net: कोड ऐसे कार्ड पर ले गए जिसका कोर्स अलग है → नेटवर्क की कोर्स-कड़ी वाली जाँच रोकती है", () => {
    const D0 = LIB.load(T), X0 = LIB.derive(D0), k = Object.keys(D0.NET).find((x) => D0.NET[x].udyam > 0 && D0.NET[x].course), N = D0.NET[k];
    const other = Object.keys(X0.card).map(Number).find((n) => X0.byN[n].mg === N.mg && n !== N.udyam && !X0.card[n].l); if (!other) return true;
    const r = tool(["net", "--key", k, "--udyam", String(other), "--badlo"]); syncT(); return r.status === 0 && LIB.load(T).NET[k].udyam === other && failNames().indexOf("कोर्स-कड़ी उसी कार्ड") > -1; });
  t("औज़ार net: प्रतीक्षा वाला नेटवर्क-सेक्टर कार्ड पर आया → मुहर की सूची से अपने-आप हटा, जाँच पास", () => {
    const D0 = LIB.load(T), k = D0.seal.PRATIKSHA.network[0]; if (!k) return true; const card = D0.CARDS.find((c) => c.mg === D0.NET[k].mg && !LIB.derive(D0).card[c.n]).n;
    const r = tool(["net", "--key", k, "--udyam", String(card)]); const D2 = LIB.load(T);
    return r.status === 0 && D2.NET[k].udyam === card && D2.seal.PRATIKSHA.network.indexOf(k) === -1 && good(); });
  const after = FILES.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8"));
  ck("इन कोशिशों के बाद असली फ़ाइलें byte-दर-byte वैसी ही", before.every((s, i) => s === after[i]));
  fs.rmSync(T, { recursive: true, force: true });
}

console.log("जाँचें: पास " + pass + " · फेल " + fail);
if (fail) { console.log("⛔ dev_sector_niyam_check रुका"); process.exit(1); }
console.log("🏁 dev_sector_niyam_check v1.2 : सेक्टर-नियम पास");
