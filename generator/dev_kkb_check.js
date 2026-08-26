/* ============================================================
   dev_kkb_check.js v2.2 (26-Aug-2026; + तेलुगु te) — "ACS काम की भाषा" कोर्स का check-robot (हर भाषा: KKB_SETS)
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
const KKB_SETS = [
  { code: "en", data: "assets/kkb_data.js", page: "courses/hi/bhasha/english/index.html", old: "courses/hi/kaam-ki-bhasha/index.html", id: "PJ018", url: "/courses/hi/bhasha/english/" },
  { code: "kn", data: "assets/kkb_kn_data.js", page: "courses/hi/bhasha/kannada/index.html", old: "courses/hi/kaam-ki-bhasha-kannada/index.html", id: "PJ019", url: "/courses/hi/bhasha/kannada/" },
  { code: "zh", data: "assets/kkb_zh_data.js", page: "courses/hi/bhasha/mandarin/index.html", old: "courses/hi/kaam-ki-bhasha-mandarin/index.html", id: "PJ020", url: "/courses/hi/bhasha/mandarin/" },
  { code: "es", data: "assets/kkb_es_data.js", page: "courses/hi/bhasha/spanish/index.html", old: "courses/hi/kaam-ki-bhasha-spanish/index.html", id: "PJ021", url: "/courses/hi/bhasha/spanish/" },
  { code: "ar", data: "assets/kkb_ar_data.js", page: "courses/hi/bhasha/arabic/index.html", old: "courses/hi/kaam-ki-bhasha-arabic/index.html", id: "PJ022", url: "/courses/hi/bhasha/arabic/" },
  { code: "bn", data: "assets/kkb_bn_data.js", page: "courses/hi/bhasha/bengali/index.html", id: "PJ023", url: "/courses/hi/bhasha/bengali/" },
  { code: "pt", data: "assets/kkb_pt_data.js", page: "courses/hi/bhasha/portuguese/index.html", id: "PJ024", url: "/courses/hi/bhasha/portuguese/" },
  { code: "id", data: "assets/kkb_id_data.js", page: "courses/hi/bhasha/indonesian/index.html", id: "PJ025", url: "/courses/hi/bhasha/indonesian/" },
  { code: "ja", data: "assets/kkb_ja_data.js", page: "courses/hi/bhasha/japanese/index.html", id: "PJ026", url: "/courses/hi/bhasha/japanese/" },
  { code: "mr", data: "assets/kkb_mr_data.js", page: "courses/hi/bhasha/marathi/index.html", id: "PJ027", url: "/courses/hi/bhasha/marathi/" },
  { code: "te", data: "assets/kkb_te_data.js", page: "courses/hi/bhasha/telugu/index.html", id: "PJ028", url: "/courses/hi/bhasha/telugu/" }
];
const js = R("assets/kkb.js"), css = R("assets/kkb.css");
(css.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => {
  const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) fails.push("kkb.css: font " + n + "px");
});
const cd = R("assets/courses_data.js"), readyIds = R("courses/hi/index.html");
const swSrc = R("sw.js"), cv = (swSrc.match(/const CACHE_VERSION = '(v\d+)';([^\n]*)/) || []);
ok(cv[1] && /kkb|काम की भाषा/.test(cv[2] || ""), "sw.js CACHE_VERSION इस दौर के लिए bump नहीं (cache-first असर-नियम)");
const intentHi = {}; /* साझा-भाषा नियम: id-क्रम पर हिंदी-अर्थ/दिशा भाषाओं में मेल (कुछ छूट: भाषा-नाम वाले वाक्य) */
KKB_SETS.forEach(SET => {
const tag = "(" + SET.code + ") ";

/* (1)(2) data */
const box = { window: {} };
new Function("window", R(SET.data))(box.window);
const D = box.window.KKB_DATA;
ok(D && Array.isArray(D.weeks) && D.weeks.length === 5, tag + "data: 5 सप्ताह नहीं");
ok(D && D.lang && D.lang.code === SET.code && D.lang.label && D.lang.tts && D.lang.sr && D.lang.script, tag + "lang-खाना अधूरा");
ok(D && Array.isArray(D.help) && D.help.length >= 2, tag + "help-जोड़ी नहीं");
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
      /* भाषा-नाम नियम (26-Aug, चौथी बार पकड़े होल से): English-आधार से हिंदी-अर्थ हूबहू उठता है, पर
         "मैं थोड़ी अंग्रेज़ी बोलता हूँ" जैसे वाक्यों में भाषा-नाम लक्ष्य-भाषा का होना चाहिए —
         गैर-English सेट में हिंदी-अर्थ में "अंग्रेज़ी" = अर्थ-होल (चीनी/Spanish/अरबी तीनों में मिला था)। */
      if (SET.code !== "en") ok(!/अंग्रेज़ी|अंग्रेजी|English/.test(it[2]), tag + "वाक्य " + total + ": हिंदी-अर्थ में 'अंग्रेज़ी' — लक्ष्य-भाषा का नाम चाहिए");
      /* लिपि-नियम: देवनागरी-खाने में Roman अक्षर नहीं (___ रिक्त-स्थान छोड़कर) */
      ok(!/[A-Za-z]/.test(String(it[1]).replace(/___/g, "")), tag + "वाक्य " + total + ": देवनागरी-खाने में Roman अक्षर");
    });
  });
  const T = w.test;
  ok(T && T.target && T.goal && Array.isArray(T.lines) && T.lines.length >= 4, "सप्ताह " + (wi + 1) + ": test-खाना अधूरा");
  (T && T.lines || []).forEach((l, i) => ok(Array.isArray(l) && l.length === 2 && l[0] && l[1], "सप्ताह " + (wi + 1) + " test-line " + (i + 1) + ": English+देवनागरी जोड़ी नहीं"));
});
ok(total === 500, "कुल वाक्य 500 नहीं: " + total);

/* runtime-जाँच (नक़ली DOM): इंजन को हर रास्ते (home · 5 सप्ताह · 25 दिन · 5 अभ्यास · 5 टेस्ट) पर चलाकर
   दिखने वाला HTML इकट्ठा — उसमें square bracket नहीं, ख़ाली पाठ नहीं (v2.3 runtime-यंत्र नियम) */
const els = {}, seen = [];
const mk = id => ({ id, _h: "", style: {}, className: "", textContent: "", checked: false, onclick: null,
  set innerHTML(v) { this._h = v; seen.push(v); }, get innerHTML() { return this._h; },
  getBoundingClientRect() { return { top: 0 }; }, setAttribute() {} });
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
const PAGE = SET.page;
ok(fs.existsSync(path.join(ROOT, PAGE)), "पेज नहीं बना: " + PAGE);
if (fs.existsSync(path.join(ROOT, PAGE))) {
  const pg = R(PAGE);
  ok(pg.includes("generator से बना (build_specials.js"), "पेज पर generator-निशान नहीं");
  ok(pg.includes("/assets/acs-universal.js"), "पेज universal ढाँचे पर नहीं");
  ["/assets/kkb.css", "/" + SET.data, "/assets/kkb.js"].forEach(a => ok(pg.includes(a), tag + "पेज " + a + " नहीं बुलाता"));
  ok(pg.includes('id="kkb-app"'), "पेज में kkb-app डिब्बा नहीं");
  ok(pg.includes("मूल भाषा: हिंदी"), "मूल-भाषा निशान नहीं");
  const vis = pg.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), "पेज के दिखने वाले पाठ में square bracket");
}

/* (5b) redirect-पर्ची: पुराना पता → नया (noindex + canonical + refresh), universal ढाँचा नहीं */
if (SET.old) {
  ok(fs.existsSync(path.join(ROOT, SET.old)), tag + "redirect-पर्ची नहीं: " + SET.old);
  if (fs.existsSync(path.join(ROOT, SET.old))) {
    const rd = R(SET.old);
    ok(rd.includes('content="0; url=' + SET.url + '"') && rd.includes('canonical" href="https://acslearn.com' + SET.url + '"') && rd.includes("noindex"), tag + "redirect-पर्ची ग़लत पते/robots पर");
    ok(!rd.includes("/assets/acs-universal.js"), tag + "redirect-पर्ची universal ढाँचे पर है — sitemap में घुस जाएगी");
  }
}

/* (6) courses_data + READY_IDS */
const m = cd.match(new RegExp('\\{"id": "' + SET.id + '"[^}]*\\}'));
ok(!!m, tag + "courses_data.js में " + SET.id + " नहीं");
if (m) {
  const u = (m[0].match(/"url": "([^"]+)"/) || [])[1];
  ok(u === SET.url, tag + SET.id + " url ग़लत: " + u);
  ok(!/[\[\]]/.test(m[0].replace(/"edu": \[[^\]]*\]/, "")), tag + SET.id + " नाम में square bracket");
}
ok(readyIds.includes("'" + SET.id + "'"), tag + "courses/hi/index.html READY_IDS में " + SET.id + " नहीं");
/* intent-मेल: दिशा (S/L) हर भाषा में एक-सी */
const dirs = []; D.weeks.forEach(w => w.days.forEach(d => d.items.forEach(it => dirs.push(it[3]))));
if (!intentHi.dirs) intentHi.dirs = dirs; else ok(intentHi.dirs.join("") === dirs.join(""), tag + "दिशा-क्रम (S/L) पहली भाषा से नहीं मिलता — id-intent टूटा");
}); /* KKB_SETS */

if (fails.length) { console.error("❌ dev_kkb_check FAIL:\n - " + fails.join("\n - ")); process.exit(1); }
console.log("🏁 dev_kkb_check: सब पास — 500 वाक्य · 5×5×20 · पेज generator से · असेट/कड़ी/sw ठीक (" + (cv[1] || "?") + ")");
