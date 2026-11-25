/* ============================================================
   generator/sector_darj.js v1.0 (26-Nov-2026) : सेक्टर-नियम का दर्ज-औज़ार
   नया उद्यम-कार्ड बनाने और किसी कोर्स पर कार्ड का कोड लगाने का यही एक रास्ता है।
   हाथ से assets/udyam_data.js या कोर्स का कार्ड-कोड न बदलें: जाँच-यंत्र पकड़ लेगा।

   नए कोर्स का मिलान (Founder का नियम, 26-Nov-2026), कदम-दर-कदम:
     1. कोर्स का सेक्टर तय करें (24 में से एक)।
     2. उस सेक्टर की उद्यम-सूची देखें:
          node generator/sector_darj.js suchi --mg 3
          node generator/sector_darj.js suchi --khoj वेल्डिंग        (सब सेक्टर में शब्द खोजना)
     3क. कार्ड पहले से है → उसी का कोड लगाएँ:
          node generator/sector_darj.js course --id SE027 --udyam 116
     3ख. कार्ड नहीं है → नया कार्ड (नया serial अपने-आप = सबसे बड़ा + 1), फिर उसका कोड लगाएँ:
          node generator/sector_darj.js card --mg 3 --name "नाम (English Name)" --slug english-name-business
          node generator/sector_darj.js course --id SE027 --udyam <नया serial>
         नए कार्ड का परिचय-पन्ना (/udyam/<slug>.html) बनना ज़रूरी है; उसके बिना दूसरे यंत्र रुकेंगे।
     4. जाँच:  node generator/dev_sector_niyam_check.js

   दूसरे आदेश:
     khata-banao   serial का खाता पहली बार बनाना (सिर्फ़ तब, जब खाता है ही नहीं)
   हर आदेश में --root <folder> दिया जा सकता है (जाँच के लिए; आम काम में नहीं चाहिए)।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const LIB = require("./lib_sector.js");
const stop = (m) => { console.error("⛔ sector_darj: " + m); process.exit(1); };
const argv = process.argv.slice(2), cmd = argv[0];
const opt = (k) => { const i = argv.indexOf("--" + k); return i > -1 ? argv[i + 1] : undefined; };
const flag = (k) => argv.indexOf("--" + k) > -1;
const ROOT = opt("root") ? path.resolve(opt("root")) : path.join(__dirname, "..");
const F = { cards: path.join(ROOT, "assets/udyam_data.js"), courses: path.join(ROOT, "assets/courses_data.js"), ledger: path.join(ROOT, "generator/data/udyam_serial_ledger.json") };

/* text में start पर खुले कोष्ठक का जोड़ीदार ढूँढना (string के भीतर के कोष्ठक छोड़कर) */
function matchEnd(s, start) {
  const open = s[start], close = open === "{" ? "}" : "]"; let d = 0, inStr = false;
  for (let i = start; i < s.length; i++) { const ch = s[i];
    if (inStr) { if (ch === "\\") i++; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true; else if (ch === open) d++; else if (ch === close) { d--; if (d === 0) return i; } }
  return -1;
}
const writeLedger = (obj) => { const k = Object.keys(obj).map(Number).sort((a, b) => a - b); fs.writeFileSync(F.ledger, "{\n" + k.map((n) => '"' + n + '": ' + JSON.stringify(obj[n])).join(",\n") + "\n}\n"); };

if (cmd === "khata-banao") {
  if (fs.existsSync(F.ledger)) stop("खाता पहले से है। उसे दोबारा नहीं बनाया जाता (serial अटल हैं)।");
  const D = LIB.load(ROOT); const o = {};
  D.CARDS.forEach((c, i) => { if (c.n !== i + 1) stop("serial लगातार नहीं: " + c.n); o[c.n] = c.intro; });
  writeLedger(o); console.log("✅ खाता बना: " + D.CARDS.length + " serial (1 से " + D.CARDS.length + ")");
}
else if (cmd === "suchi") {
  const D = LIB.load(ROOT), mg = opt("mg") !== undefined ? +opt("mg") : null, q = (opt("khoj") || "").toLowerCase();
  if (mg !== null && !LIB.okMg(mg)) stop("--mg 1 से 24 के बीच हो");
  const L = D.CARDS.filter((c) => (mg === null || c.mg === mg) && (!q || c.name.toLowerCase().indexOf(q) > -1));
  for (const c of L) console.log("  serial " + c.n + " · सेक्टर " + c.mg + " " + D.MG[c.mg].n + " · " + c.name);
  console.log(L.length + " कार्ड मिले" + (mg !== null ? " (सेक्टर " + mg + " " + D.MG[mg].n + ")" : "") + (q ? " · खोज: " + q : ""));
}
else if (cmd === "card") {
  const D = LIB.load(ROOT), mg = +opt("mg"), name = (opt("name") || "").trim(), slug = (opt("slug") || "").trim(), invest = opt("invest") || "₹0 से ₹200 करोड़";
  if (!LIB.okMg(mg)) stop("--mg 1 से 24 के बीच हो (24 सेक्टर अटल हैं)");
  if (name.length < 3) stop("--name दें: देवनागरी नाम, फिर गोल कोष्ठक में English");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 60) stop("--slug सिर्फ़ छोटे Roman अक्षर, अंक और - (अधिकतम 60)");
  if (!D.LEDGER) stop("serial का खाता नहीं है; पहले khata-banao");
  const intro = "/udyam/" + slug + ".html";
  if (D.CARDS.some((c) => c.intro === intro)) stop("इस slug का कार्ड पहले से है: " + intro);
  const same = D.CARDS.find((c) => c.name.replace(/[\[\(].*$/, "").trim() === name.replace(/[\[\(].*$/, "").trim());
  if (same) stop("इसी नाम का कार्ड पहले से है: serial " + same.n + " (सेक्टर " + same.mg + ")। नया कार्ड नहीं बनेगा; उसी का कोड लगाएँ।");
  const n = Math.max.apply(null, D.CARDS.map((c) => c.n)) + 1;
  if (D.LEDGER[n] !== undefined) stop("खाते में serial " + n + " पहले से है");
  let s = fs.readFileSync(F.cards, "utf8"); const a = s.indexOf("const ALL_SECTORS = ["); if (a < 0 || s.split("const ALL_SECTORS = [").length !== 2) stop("ALL_SECTORS की जगह नहीं मिली");
  const st = a + "const ALL_SECTORS = ".length, en = matchEnd(s, st); if (en < 0) stop("ALL_SECTORS का अंत नहीं मिला");
  const row = '{"n": ' + n + ', "name": ' + JSON.stringify(name) + ', "mg": ' + mg + ', "invest": ' + JSON.stringify(invest) + ', "intro": ' + JSON.stringify(intro) + "}";
  s = s.slice(0, en) + ", " + row + s.slice(en); fs.writeFileSync(F.cards, s);
  const led = Object.assign({}, D.LEDGER); led[n] = intro; writeLedger(led);
  const chk = LIB.load(ROOT); if (chk.CARDS.length !== D.CARDS.length + 1 || chk.CARDS[chk.CARDS.length - 1].n !== n) stop("लिखने के बाद गिनती नहीं मिली");
  console.log("✅ नया कार्ड: serial " + n + " · सेक्टर " + mg + " " + D.MG[mg].n + " · " + name + " · " + intro);
  console.log("   अब: इसका परिचय-पन्ना बनाएँ, फिर node generator/build_udyam_suchi.js और node generator/build_sitemap.js चलाएँ।");
}
else if (cmd === "course") {
  const D = LIB.load(ROOT), id = opt("id"), n = +opt("udyam");
  const c = D.COURSES.find((x) => x.id === id); if (!c) stop("कोर्स नहीं मिला: " + id);
  const k = D.CARDS.find((x) => x.n === n); if (!k) stop("कार्ड नहीं मिला: serial " + opt("udyam") + "। पहले suchi से ढूँढें, या card से नया बनाएँ।");
  const mgDiff = c.mg !== k.mg;
  if (mgDiff && !flag("mg-badlo")) stop("कोर्स " + id + " सेक्टर " + c.mg + " में दर्ज है, पर कार्ड " + n + " सेक्टर " + k.mg + " (" + D.MG[k.mg].n + ") का है। कोर्स उसी सेक्टर में बैठता है जिसमें उसका कार्ड है। " +
    "कोर्स का सेक्टर कार्ड वाला करना हो तो आदेश में --mg-badlo जोड़ें (Founder के फ़ैसले के बाद ही)।");
  let s = fs.readFileSync(F.courses, "utf8"); const key = '{"id": ' + JSON.stringify(id) + ", ";
  if (s.split(key).length !== 2) stop("कोर्स की पंक्ति ठीक एक बार नहीं मिली: " + id);
  const a = s.indexOf(key), e = matchEnd(s, a); if (e < 0) stop("कोर्स की पंक्ति का अंत नहीं मिला");
  let obj = s.slice(a, e + 1);
  if (/"udyam": -?\d+/.test(obj)) { if ((obj.match(/"udyam": /g) || []).length !== 1) stop("udyam खाना एक से ज़्यादा बार"); obj = obj.replace(/"udyam": -?\d+/, '"udyam": ' + n); }
  else obj = key + '"udyam": ' + n + ", " + obj.slice(key.length);
  if (mgDiff) { if ((obj.match(/"mg": \d+/g) || []).length > 1) stop("mg खाना एक से ज़्यादा बार");
    obj = /"mg": \d+/.test(obj) ? obj.replace(/"mg": \d+/, '"mg": ' + k.mg) : key + '"mg": ' + k.mg + ", " + obj.slice(key.length); }
  s = s.slice(0, a) + obj + s.slice(e + 1); fs.writeFileSync(F.courses, s);
  const c2 = LIB.load(ROOT).COURSES.find((x) => x.id === id); if (!c2 || c2.udyam !== n || c2.mg !== k.mg) stop("लिखने के बाद मिलान नहीं हुआ");
  console.log("✅ कोर्स " + id + " → कार्ड " + n + " (" + k.name + ") · सेक्टर " + k.mg + " " + D.MG[k.mg].n + (mgDiff ? " · कोर्स का सेक्टर " + c.mg + " से " + k.mg + " हुआ" : ""));
  console.log("   याद रखें: assets/courses_data.js बदली है, इसलिए उसी खेप में sw.js का version बढ़ाएँ।");
}
else {
  console.log("आदेश: suchi [--mg N] [--khoj शब्द] | course --id <कोड> --udyam <serial> [--mg-badlo] | card --mg N --name \"…\" --slug … [--invest \"…\"] | khata-banao");
  process.exit(cmd ? 2 : 0);
}
