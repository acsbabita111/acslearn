/* ============================================================
   generator/lib_sector.js v1.0 (26-Nov-2026) : सेक्टर-नियम का एक ही घर (पढ़ना + जाँचना + दरवाज़ा)
   नियम: generator/data/sector_muhar.js के ऊपर लिखा है (Founder, 26-Nov-2026)।
   कौन इसे चलाता है:
     generator/dev_sector_niyam_check.js  (जाँच-यंत्र; हर खेप में)
     generator/dev_seo_check.js           (जाँच-15; GitHub का द्वार भी इसे चलाता है)
     generator/sector_darj.js             (नया कार्ड या कोर्स-कार्ड जोड़ने का एकमात्र औज़ार)
     tools/acs-site-deploy.js v1.6        (zip का चढ़ाने वाला औज़ार: चढ़ाने से ठीक पहले `--door`)
   data के घर (एक चीज़ = एक जगह):
     24 सेक्टर      assets/mg_names.js            (मुहर: generator/data/sector_muhar.js)
     उद्यम-कार्ड     assets/udyam_data.js          (serial का खाता: generator/data/udyam_serial_ledger.json)
     कोर्स          assets/courses_data.js        (हर कोर्स में: mg = सेक्टर, udyam = कार्ड का serial)
     नेटवर्क-सेक्टर   generator/data/network/taxonomy.js  (हर सेक्टर में: mg, udyam)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DEF_ROOT = path.join(__dirname, "..");
const GROUPS = ["SELF_EMP_COURSES", "PRIVATE_JOB_COURSES", "ACADEMIC_COURSES", "GOVT_SCHOLAR_COURSES", "GOVT_JOB_COURSES"];

function load(ROOT) {
  ROOT = ROOT || DEF_ROOT;
  const rd = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
  const w = {}; new Function("window", rd("assets/mg_names.js"))(w);
  const MG = w.MG_NAMES || {};
  const CARDS = new Function(rd("assets/udyam_data.js") + ";return ALL_SECTORS;")();
  const cs = rd("assets/courses_data.js");
  const G = new Function("window", cs + ";return {" + GROUPS.map((g) => g + ":" + g).join(",") + "};")({});
  const COURSES = []; for (const g of GROUPS) for (const c of G[g]) COURSES.push(Object.assign({ _group: g }, c));
  const seal = (function () { const p = path.join(ROOT, "generator/data/sector_muhar.js"); delete require.cache[require.resolve(p)]; return require(p); })();
  const lp = path.join(ROOT, "generator/data/udyam_serial_ledger.json");
  const LEDGER = fs.existsSync(lp) ? JSON.parse(fs.readFileSync(lp, "utf8")) : null;
  const tp = path.join(ROOT, "generator/data/network/taxonomy.js"); delete require.cache[require.resolve(tp)];
  const NET = require(tp).SECTORS;
  return { ROOT, MG, CARDS, COURSES, seal, LEDGER, NET };
}

const okMg = (v) => Number.isInteger(v) && v >= 1 && v <= 24;
const normUrl = (u) => String(u || "").replace(/index\.html$/, "");

/* पूरी जाँच। लौटाता है: { checks: [{name, ok, extra}], stats } */
function audit(ROOT) {
  const D = load(ROOT), S = D.seal, out = [];
  const ck = (name, ok, extra) => out.push({ name, ok: !!ok, extra: ok ? "" : String(extra || "").slice(0, 700) });
  const byN = {}; D.CARDS.forEach((c) => { byN[c.n] = c; });

  /* ---- क) 24 सेक्टर अटल ---- */
  const mgKeys = Object.keys(D.MG).map(Number).sort((a, b) => a - b);
  ck("24 सेक्टर: assets/mg_names.js में कूट ठीक 1 से 24 (न कम, न ज़्यादा)", mgKeys.length === 24 && mgKeys.every((k, i) => k === i + 1), "मिले: " + mgKeys.join(","));
  ck("24 सेक्टर: मुहर की सूची भी ठीक 24, कूट 1 से 24", S.SECTORS.length === 24 && S.SECTORS.every((r, i) => r[0] === i + 1));
  const diffNames = S.SECTORS.filter((r) => !D.MG[r[0]] || D.MG[r[0]].n !== r[1]).map((r) => r[0] + ":" + r[1] + "≠" + (D.MG[r[0]] ? D.MG[r[0]].n : "नहीं"));
  ck("24 सेक्टर: हर नाम मुहर से हूबहू (नाम बदलना = Founder का आदेश)", diffNames.length === 0, diffNames.join(" · "));

  /* ---- ख) उद्यम-कार्ड और serial ---- */
  const ns = D.CARDS.map((c) => c.n);
  ck("उद्यम-कार्ड: serial 1 से " + ns.length + " तक लगातार, कोई दोहराव या छूट नहीं", ns.every((n, i) => n === i + 1), "पहली गड़बड़ी: " + ns.find((n, i) => n !== i + 1));
  const badCard = D.CARDS.filter((c) => !okMg(c.mg) || !c.name || !/^\/udyam\/[a-z0-9\-]+\.html$/.test(c.intro || ""));
  ck("उद्यम-कार्ड: हर कार्ड 24 में से एक सेक्टर में, नाम और अपने पन्ने के साथ", badCard.length === 0, badCard.slice(0, 5).map((c) => "n" + c.n).join(", "));
  const perMg = {}; D.CARDS.forEach((c) => { perMg[c.mg] = (perMg[c.mg] || 0) + 1; });
  ck("उद्यम-कार्ड: 24 में से हर सेक्टर में कम से कम एक कार्ड", S.SECTORS.every((r) => perMg[r[0]] > 0));
  if (!D.LEDGER) ck("serial का खाता मौजूद (generator/data/udyam_serial_ledger.json)", false, "फ़ाइल नहीं");
  else {
    const lk = Object.keys(D.LEDGER).map(Number).sort((a, b) => a - b);
    const moved = lk.filter((n) => !byN[n] || byN[n].intro !== D.LEDGER[n]);
    ck("serial अटल: खाते का हर पुराना serial आज भी उसी उद्यम-पन्ने पर (कोई कार्ड हटा या नंबर बदला नहीं)", moved.length === 0, moved.slice(0, 6).map((n) => "n" + n + " खाता " + D.LEDGER[n] + " · आज " + (byN[n] ? byN[n].intro : "नहीं")).join(" | "));
    const notIn = D.CARDS.filter((c) => D.LEDGER[c.n] === undefined);
    ck("हर कार्ड खाते में दर्ज (नया कार्ड सिर्फ़ sector_darj.js से, जो खाता भी लिखता है)", notIn.length === 0 && lk.length === D.CARDS.length, "खाते से बाहर: " + notIn.slice(0, 6).map((c) => "n" + c.n).join(", ") + " · खाता " + lk.length + ", कार्ड " + D.CARDS.length);
  }

  /* ---- ग) कोर्स ---- */
  const ids = D.COURSES.map((c) => c.id), idSet = new Set(ids);
  ck("कोर्स: हर कोर्स का कोड अलग (" + ids.length + ")", idSet.size === ids.length);
  const noMg = D.COURSES.filter((c) => !okMg(c.mg)).map((c) => c.id);
  const noMgNew = noMg.filter((id) => S.DEBT_NO_MG.indexOf(id) === -1);
  ck("कोर्स: हर कोर्स 24 में से एक सेक्टर में (mg)। पुराना दर्ज क़र्ज़: " + noMg.length, noMgNew.length === 0, "बिना सेक्टर (क़र्ज़-सूची से बाहर): " + noMgNew.slice(0, 8).join(", "));
  const live = D.COURSES.filter((c) => c.url);
  const cardBad = [];   /* udyam खाना है, पर ग़लत */
  const cardNone = [];  /* चालू कोर्स, udyam खाना नहीं */
  for (const c of D.COURSES) {
    if (c.udyam === undefined) { if (c.url) cardNone.push(c.id); continue; }
    const k = byN[c.udyam];
    if (!Number.isInteger(c.udyam) || !k) cardBad.push(c.id + ": कार्ड " + c.udyam + " है ही नहीं");
    else if (k.mg !== c.mg) cardBad.push(c.id + ": कोर्स सेक्टर " + c.mg + ", कार्ड " + c.udyam + " सेक्टर " + k.mg);
  }
  ck("कोर्स: जहाँ भी कार्ड-कोड लिखा है, वह कार्ड मौजूद है और उसी सेक्टर का है", cardBad.length === 0, cardBad.slice(0, 6).join(" | "));
  const cardNoneNew = cardNone.filter((id) => S.DEBT_NO_CARD.indexOf(id) === -1);
  ck("कोर्स: हर चालू कोर्स (" + live.length + ") पर उद्यम-कार्ड का कोड। पुराना दर्ज क़र्ज़: " + cardNone.length, cardNoneNew.length === 0,
    "बिना कार्ड-कोड (क़र्ज़-सूची से बाहर): " + cardNoneNew.slice(0, 8).join(", ") + " · इलाज: node generator/sector_darj.js course --id <कोड> --udyam <serial>");

  /* ---- घ) क़र्ज़-सूचियाँ ईमानदार: सिर्फ़ घटें, बढ़ें नहीं ---- */
  const L = S.LIMIT;
  ck("क़र्ज़-सूचियाँ सीमा के भीतर (कार्ड ≤ 6, सेक्टर ≤ 65, नेटवर्क ≤ 2) और मुहर की सीमा यंत्र की सीमा से बड़ी नहीं",
    S.DEBT_NO_CARD.length <= 6 && S.DEBT_NO_MG.length <= 65 && S.DEBT_NETWORK.length <= 2 && L.noCard <= 6 && L.noMg <= 65 && L.network <= 2
    && S.DEBT_NO_CARD.length <= L.noCard && S.DEBT_NO_MG.length <= L.noMg && S.DEBT_NETWORK.length <= L.network,
    "कार्ड " + S.DEBT_NO_CARD.length + "/" + L.noCard + " · सेक्टर " + S.DEBT_NO_MG.length + "/" + L.noMg + " · नेटवर्क " + S.DEBT_NETWORK.length + "/" + L.network);
  const stale = S.DEBT_NO_CARD.filter((id) => cardNone.indexOf(id) === -1).concat(S.DEBT_NO_MG.filter((id) => noMg.indexOf(id) === -1));
  ck("क़र्ज़-सूची में कोई ऐसा कोड नहीं जो अब ठीक हो चुका या है ही नहीं (ठीक होते ही सूची से हटे)", stale.length === 0, "हटाएँ: " + stale.slice(0, 8).join(", "));

  /* ---- ङ) उद्यम-कार्ड की कोर्स-कड़ी ---- */
  const urls = new Set(live.map((c) => normUrl(c.url)));
  const badPtr = D.CARDS.filter((c) => c.course && !urls.has(normUrl(c.course)));
  ck("उद्यम-कार्ड: कार्ड पर लिखी कोर्स-कड़ी किसी दर्ज चालू कोर्स की ही है", badPtr.length === 0, badPtr.slice(0, 5).map((c) => "n" + c.n + " → " + c.course).join(" | "));

  /* ---- च) नेटवर्क के सेक्टर ---- */
  const nk = Object.keys(D.NET);
  const netMgBad = nk.filter((k) => !okMg(D.NET[k].mg));
  ck("नेटवर्क: हर सेक्टर (" + nk.length + ") 24 में से एक सेक्टर में", netMgBad.length === 0, netMgBad.join(", "));
  const netBad = [], netNone = [];
  for (const k of nk) { const s = D.NET[k];
    if (s.udyam === undefined) { netNone.push(k); continue; }
    const c = byN[s.udyam]; if (!c) netBad.push(k + ": कार्ड " + s.udyam + " नहीं"); else if (c.mg !== s.mg) netBad.push(k + ": सेक्टर " + s.mg + ", कार्ड सेक्टर " + c.mg); }
  const netNoneNew = netNone.filter((k) => S.DEBT_NETWORK.indexOf(k) === -1);
  ck("नेटवर्क: हर सेक्टर पर उद्यम-कार्ड का कोड, उसी सेक्टर का। पुराना दर्ज क़र्ज़: " + netNone.length, netBad.length === 0 && netNoneNew.length === 0 && S.DEBT_NETWORK.every((k) => netNone.indexOf(k) > -1),
    netBad.concat(netNoneNew.map((k) => k + ": कार्ड-कोड नहीं"), S.DEBT_NETWORK.filter((k) => netNone.indexOf(k) === -1).map((k) => k + ": क़र्ज़-सूची से हटाएँ")).join(" | "));
  const netCourse = nk.filter((k) => D.NET[k].course && !urls.has(normUrl(D.NET[k].course.url)));
  ck("नेटवर्क: सेक्टर पर लिखा कोर्स किसी दर्ज चालू कोर्स का ही है", netCourse.length === 0, netCourse.join(", "));

  const stats = { sectors: mgKeys.length, cards: D.CARDS.length, courses: ids.length, live: live.length, withCard: D.COURSES.filter((c) => c.udyam !== undefined).length,
    debtCard: cardNone.length, debtMg: noMg.length, debtNet: netNone.length, net: nk.length };
  return { checks: out, stats, fail: out.filter((c) => !c.ok).length };
}

module.exports = { load, audit, okMg, normUrl, GROUPS };

/* दरवाज़ा: चढ़ाने वाला औज़ार (tools/acs-site-deploy.js v1.6 से) इसे सीधे चलाता है:
     node generator/lib_sector.js --door
   नियम टूटा हो तो exit 1 और हर टूटी जाँच "FAIL " से शुरू होती पंक्ति में (औज़ार की खिड़की English/ASCII पढ़ती है,
   इसलिए यहाँ सिर्फ़ जाँच का क्रमांक और कूट जाते हैं; पूरा हिंदी ब्योरा: node generator/dev_sector_niyam_check.js)। */
if (require.main === module) {
  let r; try { r = audit(); } catch (e) { console.log("FAIL the sector check could not run: " + String(e.message).replace(/[^\x20-\x7E]/g, "?")); process.exit(1); }
  r.checks.forEach((c, i) => { if (!c.ok) console.log("FAIL check " + (i + 1) + " of " + r.checks.length + ": " + (c.extra.replace(/[^\x20-\x7E]+/g, " ").replace(/\s+/g, " ").trim() || "see dev_sector_niyam_check")); });
  if (r.fail) process.exit(1);
  console.log("DOOR OK " + r.checks.length + " checks; 24 sectors, " + r.stats.cards + " enterprise cards, " + r.stats.courses + " courses, " + r.stats.live + " live, " + r.stats.withCard + " with card code");
}
