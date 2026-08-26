/* ============================================================
   dev_kkb_check.js v1.0 (26-Aug-2026) — "ACS काम की भाषा" कोर्स का check-robot
   चलाना: repo-रूट से → node generator/dev_kkb_check.js
   जाँचें: (1) data 5 सप्ताह × 5 दिन × 20 = 500, हर वाक्य के 4 खाने भरे, दिशा S/L
   (2) हर सप्ताह का test-खाना (target/goal/lines, हर line = English+देवनागरी)
   (3) दिखने वाले पाठ में square bracket नहीं (data + js + css)
   (4) kkb.css में कुछ भी 16px से छोटा नहीं
   (5) पेज generator-निशान से बना, तीनों असेट बुलाता है, universal ढाँचा (acs-universal.js) है
   (6) courses_data.js में PJ018 + url = बना हुआ पेज; courses/hi/index.html की READY_IDS में PJ018
   (7) sw.js में kkb-टिप्पणी वाली CACHE_VERSION (cache-first असर-नियम)
   fail = कोई भी upload नहीं।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

/* (1)(2) data */
const box = { window: {} };
new Function("window", R("assets/kkb_data.js"))(box.window);
const D = box.window.KKB_DATA;
ok(D && Array.isArray(D.weeks) && D.weeks.length === 5, "kkb_data: 5 सप्ताह नहीं");
let total = 0;
(D.weeks || []).forEach((w, wi) => {
  ok(w.n === wi + 1 && w.title && w.hi, "सप्ताह " + (wi + 1) + ": n/title/hi अधूरा");
  ok(Array.isArray(w.days) && w.days.length === 5, "सप्ताह " + (wi + 1) + ": 5 दिन नहीं");
  (w.days || []).forEach((d, di) => {
    ok(d.title, "सप्ताह " + (wi + 1) + " दिन " + (di + 1) + ": शीर्षक ख़ाली");
    ok(Array.isArray(d.items) && d.items.length === 20, "सप्ताह " + (wi + 1) + " दिन " + (di + 1) + ": 20 वाक्य नहीं (" + (d.items || []).length + ")");
    (d.items || []).forEach((it, i) => {
      total++;
      ok(Array.isArray(it) && it.length === 4 && it.every(x => typeof x === "string" && x.trim()), "वाक्य " + total + ": 4 खाने भरे नहीं");
      ok(it[3] === "S" || it[3] === "L", "वाक्य " + total + ": दिशा S/L नहीं");
      ok(!/[\[\]]/.test(it.join(" ")), "वाक्य " + total + ": square bracket");
    });
  });
  const T = w.test;
  ok(T && T.target && T.goal && Array.isArray(T.lines) && T.lines.length >= 4, "सप्ताह " + (wi + 1) + ": test-खाना अधूरा");
  (T && T.lines || []).forEach((l, i) => ok(Array.isArray(l) && l.length === 2 && l[0] && l[1], "सप्ताह " + (wi + 1) + " test-line " + (i + 1) + ": English+देवनागरी जोड़ी नहीं"));
});
ok(total === 500, "कुल वाक्य 500 नहीं: " + total);

/* (3)(4) js/css */
const js = R("assets/kkb.js"), css = R("assets/kkb.css");
/* runtime-जाँच (नक़ली DOM): इंजन को हर रास्ते (home · 5 सप्ताह · 25 दिन · 5 अभ्यास · 5 टेस्ट) पर चलाकर
   दिखने वाला HTML इकट्ठा — उसमें square bracket नहीं, ख़ाली पाठ नहीं (v2.3 runtime-यंत्र नियम) */
const els = {}, seen = [];
const mk = id => ({ id, _h: "", style: {}, className: "", textContent: "", checked: false, onclick: null,
  set innerHTML(v) { this._h = v; seen.push(v); }, get innerHTML() { return this._h; },
  getBoundingClientRect() { return { top: 0 }; } });
const fakeDoc = { getElementById: id => (els[id] = els[id] || mk(id)) };
const fakeWin = { KKB_DATA: D, addEventListener() {}, pageYOffset: 0, scrollTo() {}, location: { hash: "#home" } };
const sandbox = { window: fakeWin, document: fakeDoc, localStorage: { getItem: () => null, setItem() {} }, confirm: () => false, alert() {}, encodeURIComponent, JSON, Math, console, location: fakeWin.location };
try {
  new Function("window", "document", "localStorage", "confirm", "alert", "location", js)(fakeWin, fakeDoc, sandbox.localStorage, sandbox.confirm, sandbox.alert, fakeWin.location);
  const routes = ["#home"];
  for (let w = 1; w <= 5; w++) { routes.push("#w" + w, "#w" + w + "p", "#w" + w + "t"); for (let d = 1; d <= 5; d++) routes.push("#w" + w + "d" + d); }
  const handlers = [];
  fakeWin.addEventListener = (t, f) => { if (t === "hashchange") handlers.push(f); };
  routes.forEach(r => { fakeWin.location.hash = r; fakeWin.kkbRender(); });
  ok(seen.length >= routes.length, "runtime: सब रास्तों पर HTML नहीं बना");
  /* render() closure तक पहुँच: kkbCard/kkbPractice से भी HTML बनता है */
  fakeWin.location.hash = "#w1d1"; fakeWin.kkbCard(1, 1, 0); fakeWin.kkbCard(1, 1, 0, true);
  fakeWin.kkbPractice(1, "A"); fakeWin.kkbPr("show"); fakeWin.kkbPr("ok");
  fakeWin.kkbPractice(2, "B"); fakeWin.kkbPr("show"); fakeWin.kkbPr("no");
} catch (e) { fails.push("kkb.js runtime त्रुटि: " + e.message); }
const shown = seen.join("\n").replace(/<[^>]+>/g, " ");
ok(!/[\[\]]/.test(shown), "kkb.js के बनाए दिखने वाले पाठ में square bracket");
(css.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => {
  const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) fails.push("kkb.css: font " + n + "px");
});

/* (5) page */
const PAGE = "courses/hi/kaam-ki-bhasha/index.html";
ok(fs.existsSync(path.join(ROOT, PAGE)), "पेज नहीं बना: " + PAGE);
if (fs.existsSync(path.join(ROOT, PAGE))) {
  const pg = R(PAGE);
  ok(pg.includes("generator से बना (build_specials.js"), "पेज पर generator-निशान नहीं");
  ok(pg.includes("/assets/acs-universal.js"), "पेज universal ढाँचे पर नहीं");
  ["/assets/kkb.css", "/assets/kkb_data.js", "/assets/kkb.js"].forEach(a => ok(pg.includes(a), "पेज " + a + " नहीं बुलाता"));
  ok(pg.includes('id="kkb-app"'), "पेज में kkb-app डिब्बा नहीं");
  ok(pg.includes("मूल भाषा: हिंदी"), "मूल-भाषा निशान नहीं");
  const vis = pg.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), "पेज के दिखने वाले पाठ में square bracket");
}

/* (6) courses_data + READY_IDS */
const cd = R("assets/courses_data.js");
const m = cd.match(/\{"id": "PJ018"[^}]*\}/);
ok(!!m, "courses_data.js में PJ018 नहीं");
if (m) {
  const u = (m[0].match(/"url": "([^"]+)"/) || [])[1];
  ok(u === "/courses/hi/kaam-ki-bhasha/", "PJ018 url ग़लत: " + u);
  ok(!/[\[\]]/.test(m[0].replace(/"edu": \[[^\]]*\]/, "")), "PJ018 नाम में square bracket");
}
ok(R("courses/hi/index.html").includes("'PJ018'"), "courses/hi/index.html READY_IDS में PJ018 नहीं");

/* (7) sw */
const sw = R("sw.js");
const cv = (sw.match(/const CACHE_VERSION = '(v\d+)';([^\n]*)/) || []);
ok(cv[1] && /kkb|काम की भाषा/.test(cv[2] || ""), "sw.js CACHE_VERSION इस दौर के लिए bump नहीं (cache-first असर-नियम)");

if (fails.length) { console.error("❌ dev_kkb_check FAIL:\n - " + fails.join("\n - ")); process.exit(1); }
console.log("🏁 dev_kkb_check: सब पास — 500 वाक्य · 5×5×20 · पेज generator से · असेट/कड़ी/sw ठीक (" + (cv[1] || "?") + ")");
