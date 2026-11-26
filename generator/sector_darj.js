/* ============================================================
   generator/sector_darj.js v1.1 (26-Nov-2026) : सेक्टर-नियम का दर्ज-औज़ार
   नया उद्यम-कार्ड बनाना, कार्ड का नाम बदलना, किसी कोर्स का सेक्टर या कार्ड-कोड लगाना: सबका यही एक रास्ता है।
   हाथ से assets/udyam_data.js, कोर्स का कार्ड-कोड या खाते न बदलें: जाँच-यंत्र पकड़ लेगा।

   नए कोर्स का मिलान (Founder का नियम, 26-Nov-2026), कदम-दर-कदम:
     1. कोर्स का सेक्टर तय करें (24 में से एक; कहीं न बैठे तो 25 «उपरोक्त में कोई नहीं»)।
     2. उस सेक्टर की उद्यम-सूची देखें:
          node generator/sector_darj.js suchi --mg 3
          node generator/sector_darj.js suchi --khoj वेल्डिंग        (सब सेक्टर में शब्द खोजना)
     3क. कार्ड पहले से है → उसी का कोड लगाएँ:
          node generator/sector_darj.js course --id SE027 --udyam 116
     3ख. कार्ड नहीं है → नया कार्ड (नया serial अपने-आप = सबसे बड़ा + 1), फिर उसका कोड लगाएँ:
          node generator/sector_darj.js card --mg 3 --name "नाम (English Name)" --slug english-name-business
          node generator/sector_darj.js course --id SE027 --udyam <नया serial>
         नए कार्ड का परिचय-पन्ना (/udyam/<slug>.html) और sitemap बनना ज़रूरी है; उसके बिना दरवाज़ा बंद रहेगा।
     3ग. नया कार्ड अभी बन नहीं सकता, और Founder ने रुकने की मंज़ूरी दी है → «उपरोक्त में कोई नहीं» (कोड 0):
          node generator/sector_darj.js course --id SE027 --udyam 0 --muhar --karan "कारण और सुझाया कार्ड"
         (नाम मुहर की प्रतीक्षा-सूची में जुड़ता है; सूची की सीमा भरी हो तो आदेश रुक जाता है।)
     4. जाँच:  node generator/dev_sector_niyam_check.js

   दूसरे आदेश:
     course --id <कोड> --udyam <serial> --badlo       पक्का हो चुका कार्ड-कोड बदलना (Founder के फ़ैसले के बाद ही)
     course --id <कोड> --udyam <serial> --mg-badlo    कोर्स का सेक्टर कार्ड वाला करना (Founder के फ़ैसले के बाद ही)
     mg --id <कोड> --mg <1 से 24>                     उस कोर्स का सेक्टर लिखना जिसके पन्ने अभी बने नहीं (कार्ड-कोड बाद में)
     naam --n <serial> --name "नया नाम (English)"       कार्ड का नाम बदलना (serial, पन्ना और सेक्टर वही रहते हैं)
     sector --n <serial> --mg <1 से 24> --badlo        कार्ड को दूसरे सेक्टर में ले जाना (Founder के फ़ैसले के बाद ही; serial वही)।
                                                      उस कार्ड पर कोड वाले कोर्स हों तो --saath जोड़ें: वे भी उसी सेक्टर में जाते हैं।
     khata-v2      कार्ड के खाते को नए रूप (पन्ना + नाम + सेक्टर) में लाना; एक ही बार
     kcode-banao   कोर्स के कोड का खाता पहली बार बनाना; एक ही बार
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
const F = { cards: path.join(ROOT, "assets/udyam_data.js"), courses: path.join(ROOT, "assets/courses_data.js"),
  ledger: path.join(ROOT, LIB.F_LEDGER), cledger: path.join(ROOT, LIB.F_CLEDGER), seal: path.join(ROOT, "generator/data/sector_muhar.js") };
const NONE = LIB.NONE_NAME;

/* text में start पर खुले कोष्ठक का जोड़ीदार ढूँढना (string के भीतर के कोष्ठक छोड़कर) */
function matchEnd(s, start) {
  const open = s[start], close = open === "{" ? "}" : "]"; let d = 0, inStr = false;
  for (let i = start; i < s.length; i++) { const ch = s[i];
    if (inStr) { if (ch === "\\") i++; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true; else if (ch === open) d++; else if (ch === close) { d--; if (d === 0) return i; } }
  return -1;
}
const writeLedger = (obj) => { const k = Object.keys(obj).map(Number).sort((a, b) => a - b); fs.writeFileSync(F.ledger, "{\n" + k.map((n) => '"' + n + '": ' + JSON.stringify(obj[n])).join(",\n") + "\n}\n"); };
const writeCLedger = (obj) => { fs.writeFileSync(F.cledger, "{\n" + Object.keys(obj).map((id) => JSON.stringify(id) + ": " + JSON.stringify(obj[id])).join(",\n") + "\n}\n"); };
const ledgerV2 = (L) => !!L && Object.keys(L).every((k) => L[k] && typeof L[k] === "object");
const needLedgers = (D) => { if (!ledgerV2(D.LEDGER)) stop("कार्ड का खाता नहीं है या पुराने रूप में है; पहले khata-v2"); if (!D.CLEDGER) stop("कोर्स के कोड का खाता नहीं है; पहले kcode-banao"); };

/* कोर्स की पंक्ति ढूँढना और उसमें खाने बदलना */
function courseRow(s, id) {
  const key = '{"id": ' + JSON.stringify(id) + ", ";
  if (s.split(key).length !== 2) stop("कोर्स की पंक्ति ठीक एक बार नहीं मिली: " + id);
  const a = s.indexOf(key), e = matchEnd(s, a); if (e < 0) stop("कोर्स की पंक्ति का अंत नहीं मिला");
  return { key, a, e, obj: s.slice(a, e + 1) };
}
function setField(row, name, val) {   /* name = udyam या mg; पंक्ति की सबसे ऊपरी परत में */
  const re = new RegExp('"' + name + '": -?\\d+', "g"), hits = row.obj.match(re) || [];
  if (hits.length > 1) stop(name + " खाना एक से ज़्यादा बार");
  row.obj = hits.length ? row.obj.replace(re, '"' + name + '": ' + val) : row.key + '"' + name + '": ' + val + ", " + row.obj.slice(row.key.length);
}

/* मुहर की प्रतीक्षा-सूची (PRATIKSHA.courses) में नाम जोड़ना या हटाना; टिप्पणियाँ बची रहती हैं */
function sealCourses(addId, addWhy, removeId) {
  let s = fs.readFileSync(F.seal, "utf8"); const mark = "  courses: [";
  if (s.split(mark).length !== 2) stop("मुहर में प्रतीक्षा-सूची की जगह नहीं मिली");
  const a = s.indexOf(mark) + mark.length, e = s.indexOf("\n  ]", a); if (e < 0) stop("मुहर में प्रतीक्षा-सूची का अंत नहीं मिला");
  const rows = [];
  for (const ln of s.slice(a, e).split("\n")) { if (!ln.trim()) continue;
    const m = ln.match(/^\s*"([^"]+)",?\s*(\/\*.*\*\/)?\s*$/); if (!m) stop("मुहर की प्रतीक्षा-सूची की पंक्ति समझ नहीं आई: " + ln.trim());
    rows.push({ id: m[1], c: m[2] || "" }); }
  let out = rows.filter((r) => r.id !== removeId);
  if (addId && !out.some((r) => r.id === addId)) out.push({ id: addId, c: "/* " + String(addWhy).replace(/\*\//g, "").trim() + " */" });
  const body = out.map((r, i) => '    "' + r.id + '"' + (i < out.length - 1 ? "," : "") + (r.c ? "   " + r.c : "")).join("\n");
  fs.writeFileSync(F.seal, s.slice(0, a) + (out.length ? "\n" + body : "") + s.slice(e));
  const now = LIB.load(ROOT).seal.PRATIKSHA.courses;
  if (now.join(",") !== out.map((r) => r.id).join(",")) stop("मुहर लिखने के बाद सूची नहीं मिली");
  return now;
}

if (cmd === "khata-v2") {
  const D = LIB.load(ROOT); if (!D.LEDGER) stop("खाता है ही नहीं");
  if (ledgerV2(D.LEDGER)) stop("खाता पहले से नए रूप में है। यह आदेश एक ही बार चलता है।");
  const o = {}; D.CARDS.forEach((c, i) => { if (c.n !== i + 1) stop("serial लगातार नहीं: " + c.n);
    if (D.LEDGER[c.n] !== c.intro) stop("पुराने खाते से मेल नहीं: serial " + c.n + " (पहले यह ठीक करें)"); o[c.n] = { u: c.intro, n: c.name, mg: c.mg }; });
  if (Object.keys(D.LEDGER).length !== D.CARDS.length) stop("पुराने खाते की गिनती कार्डों से अलग");
  writeLedger(o); console.log("✅ कार्ड का खाता नए रूप में: " + D.CARDS.length + " serial, हर एक के साथ पन्ना, नाम और सेक्टर");
}
else if (cmd === "kcode-banao") {
  if (fs.existsSync(F.cledger)) stop("कोर्स के कोड का खाता पहले से है। उसे दोबारा नहीं बनाया जाता।");
  const D = LIB.load(ROOT), o = {}; D.COURSES.forEach((c) => { if (c.udyam !== undefined) o[c.id] = LIB.codeOf(c.mg, c.udyam); });
  writeCLedger(o); console.log("✅ कोर्स के कोड का खाता बना: " + Object.keys(o).length + " कोर्स");
}
else if (cmd === "suchi") {
  const D = LIB.load(ROOT), mg = opt("mg") !== undefined ? +opt("mg") : null, q = (opt("khoj") || "").toLowerCase();
  if (mg !== null && !LIB.okMg25(mg)) stop("--mg 1 से 25 के बीच हो");
  const L = D.CARDS.filter((c) => (mg === null || c.mg === mg) && (!q || c.name.toLowerCase().indexOf(q) > -1));
  for (const c of L) console.log("  serial " + c.n + " · सेक्टर " + c.mg + " " + D.MG[c.mg].n + " · " + c.name);
  if (mg !== null && !q) console.log("  कोड 0 · सेक्टर " + mg + " " + LIB.sectorName(D, mg) + " · «" + NONE + "» (सूची के सबसे नीचे; सिर्फ़ Founder की मंज़ूरी से)");
  console.log(L.length + " कार्ड मिले" + (mg !== null ? " (सेक्टर " + mg + " " + LIB.sectorName(D, mg) + ")" : "") + (q ? " · खोज: " + q : ""));
}
else if (cmd === "card") {
  const D = LIB.load(ROOT), mg = +opt("mg"), name = (opt("name") || "").trim(), slug = (opt("slug") || "").trim(), invest = opt("invest") || "₹0 से ₹200 करोड़";
  if (!LIB.okMg(mg)) stop("--mg 1 से 24 के बीच हो (24 सेक्टर अटल हैं; 25वाँ «" + NONE + "» ख़ाली कार्ड है, उसमें कार्ड नहीं बनता)");
  if (name.length < 3) stop("--name दें: देवनागरी नाम, फिर गोल कोष्ठक में English");
  if (LIB.normName(name) === NONE) stop("यह नाम «" + NONE + "» कार्ड का है; वह पहले से हर सूची के नीचे है");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 60) stop("--slug सिर्फ़ छोटे Roman अक्षर, अंक और - (अधिकतम 60)");
  needLedgers(D);
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
  const led = Object.assign({}, D.LEDGER); led[n] = { u: intro, n: name, mg: mg }; writeLedger(led);
  const chk = LIB.load(ROOT); if (chk.CARDS.length !== D.CARDS.length + 1 || chk.CARDS[chk.CARDS.length - 1].n !== n) stop("लिखने के बाद गिनती नहीं मिली");
  console.log("✅ नया कार्ड: serial " + n + " · सेक्टर " + mg + " " + D.MG[mg].n + " · " + name + " · " + intro);
  console.log("   अब ज़रूरी (इनके बिना दरवाज़ा बंद रहेगा): इसका परिचय-पन्ना बनाएँ, फिर node generator/build_udyam_suchi.js और node generator/build_sitemap.js चलाएँ।");
}
else if (cmd === "naam") {
  const D = LIB.load(ROOT), n = +opt("n"), name = (opt("name") || "").trim();
  const k = D.CARDS.find((x) => x.n === n); if (!k) stop("कार्ड नहीं मिला: serial " + opt("n"));
  if (name.length < 3) stop("--name दें: देवनागरी नाम, फिर गोल कोष्ठक में English"); needLedgers(D);
  if (LIB.normName(name) === NONE) stop("यह नाम «" + NONE + "» कार्ड का है");
  const dup = D.CARDS.find((c) => c.n !== n && LIB.normName(c.name) === LIB.normName(name)); if (dup) stop("यही नाम serial " + dup.n + " का है");
  let s = fs.readFileSync(F.cards, "utf8"); const key = '{"n": ' + n + ', "name": ' + JSON.stringify(k.name);
  if (s.split(key).length !== 2) stop("कार्ड की पंक्ति ठीक एक बार नहीं मिली: serial " + n);
  s = s.replace(key, '{"n": ' + n + ', "name": ' + JSON.stringify(name)); fs.writeFileSync(F.cards, s);
  const led = Object.assign({}, D.LEDGER); led[n] = { u: k.intro, n: name, mg: k.mg }; writeLedger(led);
  const k2 = LIB.load(ROOT).CARDS.find((x) => x.n === n); if (!k2 || k2.name !== name) stop("लिखने के बाद नाम नहीं मिला");
  console.log("✅ कार्ड " + n + " का नाम: «" + k.name + "» → «" + name + "» (serial, पन्ना और सेक्टर वही)");
  console.log("   अब: उसका परिचय-पन्ना और node generator/build_udyam_suchi.js दोबारा चलाएँ; assets/udyam_data.js बदली है, इसलिए sw.js का version बढ़ाएँ।");
}
else if (cmd === "sector") {
  const D = LIB.load(ROOT), n = +opt("n"), mg = +opt("mg"); needLedgers(D);
  const k = D.CARDS.find((x) => x.n === n); if (!k) stop("कार्ड नहीं मिला: serial " + opt("n"));
  if (!LIB.okMg(mg)) stop("--mg 1 से 24 के बीच हो (25वाँ «" + NONE + "» ख़ाली कार्ड है, उसमें कार्ड नहीं रखा जाता)");
  if (mg === k.mg) stop("कार्ड " + n + " पहले से सेक्टर " + mg + " में है");
  if (!flag("badlo")) stop("कार्ड का सेक्टर उसकी पक्की पहचान का हिस्सा है। बदलना हो तो --badlo जोड़ें (Founder के फ़ैसले के बाद ही)।");
  const net = Object.keys(D.NET).filter((x) => D.NET[x].udyam === n);
  if (net.length) stop("इस कार्ड पर नेटवर्क-सेक्टर " + net.join(", ") + " का कोड लगा है। पहले generator/data/network/taxonomy.js में उसका सेक्टर और कोड ठीक करें।");
  const on = D.COURSES.filter((c) => c.udyam === n);
  if (on.length && !flag("saath")) stop("इस कार्ड पर " + on.length + " कोर्स का कोड लगा है (" + on.slice(0, 5).map((c) => c.id).join(", ") + (on.length > 5 ? " …" : "") + ")। उन्हें साथ ले जाना हो तो --saath जोड़ें।");
  let s = fs.readFileSync(F.cards, "utf8"); const key = '{"n": ' + n + ', "name": ';
  if (s.split(key).length !== 2) stop("कार्ड की पंक्ति ठीक एक बार नहीं मिली: serial " + n);
  const a = s.indexOf(key), e = matchEnd(s, a); let obj = s.slice(a, e + 1);
  if ((obj.match(/"mg": \d+/g) || []).length !== 1) stop("कार्ड की पंक्ति में mg खाना ठीक एक बार नहीं");
  obj = obj.replace(/"mg": \d+/, '"mg": ' + mg); s = s.slice(0, a) + obj + s.slice(e + 1); fs.writeFileSync(F.cards, s);
  const led = Object.assign({}, D.LEDGER); led[n] = { u: k.intro, n: k.name, mg: mg }; writeLedger(led);
  if (on.length) { let cs = fs.readFileSync(F.courses, "utf8"); const cl = Object.assign({}, D.CLEDGER);
    for (const c of on) { const row = courseRow(cs, c.id); setField(row, "mg", mg); cs = cs.slice(0, row.a) + row.obj + cs.slice(row.e + 1); cl[c.id] = LIB.codeOf(mg, n); }
    fs.writeFileSync(F.courses, cs); writeCLedger(cl); }
  const D2 = LIB.load(ROOT), k2 = D2.CARDS.find((x) => x.n === n); if (!k2 || k2.mg !== mg || D2.COURSES.some((c) => c.udyam === n && c.mg !== mg)) stop("लिखने के बाद मिलान नहीं हुआ");
  console.log("✅ कार्ड " + n + " (" + k.name + "): सेक्टर " + k.mg + " " + D.MG[k.mg].n + " → " + mg + " " + D.MG[mg].n + (on.length ? " · साथ में " + on.length + " कोर्स" : "") + " (serial और पन्ना वही)");
  console.log("   अब ज़रूरी: उसका परिचय-पन्ना दोबारा बनाएँ, node generator/build_udyam_suchi.js और node generator/build_sitemap.js चलाएँ, और sw.js का version बढ़ाएँ।");
  console.log("   ध्यान: अभिरुचि-परीक्षा के प्रश्नों में इस उद्यम का सेक्टर अलग से दर्ज है; कार्ड ले जाने पर उसे भी उसी खेप में मिलाना होगा।");
}
else if (cmd === "mg") {
  const D = LIB.load(ROOT), id = opt("id"), mg = +opt("mg");
  const c = D.COURSES.find((x) => x.id === id); if (!c) stop("कोर्स नहीं मिला: " + id);
  if (!LIB.okMg(mg)) stop("--mg 1 से 24 के बीच हो (25 «" + NONE + "» के लिए: course --udyam 0 --mg 25 --muhar)");
  if (c.udyam !== undefined) stop("इस कोर्स पर कार्ड-कोड लगा है (" + LIB.codeOf(c.mg, c.udyam) + ")। सेक्टर बदलना हो तो: course --id " + id + " --udyam <serial> --mg-badlo");
  if (c.url) stop("यह चालू कोर्स है; इसका सेक्टर कार्ड-कोड के साथ ही लगता है: course --id " + id + " --udyam <serial>");
  let s = fs.readFileSync(F.courses, "utf8"); const row = courseRow(s, id); setField(row, "mg", mg);
  s = s.slice(0, row.a) + row.obj + s.slice(row.e + 1); fs.writeFileSync(F.courses, s);
  const c2 = LIB.load(ROOT).COURSES.find((x) => x.id === id); if (!c2 || c2.mg !== mg) stop("लिखने के बाद मिलान नहीं हुआ");
  console.log("✅ कोर्स " + id + " → सेक्टर " + mg + " " + D.MG[mg].n + " (कार्ड-कोड तब लगेगा जब इसके पन्ने बनेंगे)");
}
else if (cmd === "course") {
  const D = LIB.load(ROOT), id = opt("id"), n = +opt("udyam"); needLedgers(D);
  const c = D.COURSES.find((x) => x.id === id); if (!c) stop("कोर्स नहीं मिला: " + id);
  if (opt("udyam") === undefined || !Number.isInteger(n) || n < 0) stop("--udyam दें: कार्ड का serial, या 0 «" + NONE + "»");
  const old = c.udyam, wasWaiting = old === LIB.NONE_CARD, inSeal = D.seal.PRATIKSHA.courses.indexOf(id) > -1;
  let newMg, label;
  if (n === LIB.NONE_CARD) {
    newMg = opt("mg") !== undefined ? +opt("mg") : c.mg;
    if (!LIB.okMg25(newMg)) stop("कोर्स का सेक्टर नहीं लिखा; --mg <1 से 25> दें");
    if (newMg !== c.mg && c.mg !== undefined && !flag("mg-badlo")) stop("कोर्स का सेक्टर " + c.mg + " से " + newMg + " करना हो तो --mg-badlo जोड़ें (Founder के फ़ैसले के बाद ही)");
    if (!flag("muhar")) stop("«" + NONE + "» (कोड 0) पर कोई कोर्स तभी रुकता है जब Founder ने मंज़ूरी दी हो। पहले देखें कि कार्ड सचमुच नहीं है (suchi --mg " + newMg + "); " +
      "नहीं है तो नया कार्ड बनाएँ (card …)। रुकना ही हो तो आदेश में --muhar --karan \"कारण\" जोड़ें।");
    if (!wasWaiting && !inSeal) { const why = (opt("karan") || "").trim(); if (why.length < 8) stop("--karan दें: क्यों रुका है और कौन-सा नया कार्ड सुझाया है");
      const P = D.seal.PRATIKSHA.courses; if (P.length >= Math.min(D.seal.LIMIT.courses, LIB.HARD_LIMIT.courses)) stop("प्रतीक्षा-सूची भरी है (" + P.length + ")। नया कार्ड बनाइए, या Founder के लिखित आदेश से सीमा बढ़ाइए (मुहर और यंत्र, दोनों जगह)।"); }
    if (old !== undefined && old > 0 && !flag("badlo")) stop("इस कोर्स का कोड " + LIB.codeOf(c.mg, old) + " पक्का हो चुका है। उसे हटाकर «" + NONE + "» पर लाना हो तो --badlo जोड़ें (Founder के फ़ैसले के बाद ही)।");
    label = "«" + NONE + "»";
  } else {
    const k = D.CARDS.find((x) => x.n === n); if (!k) stop("कार्ड नहीं मिला: serial " + opt("udyam") + "। पहले suchi से ढूँढें, या card से नया बनाएँ।");
    newMg = k.mg; label = k.name;
    if (c.mg !== k.mg && !flag("mg-badlo")) stop("कोर्स " + id + " सेक्टर " + c.mg + " में दर्ज है, पर कार्ड " + n + " सेक्टर " + k.mg + " (" + D.MG[k.mg].n + ") का है। कोर्स उसी सेक्टर में बैठता है जिसमें उसका कार्ड है। " +
      "कोर्स का सेक्टर कार्ड वाला करना हो तो आदेश में --mg-badlo जोड़ें (Founder के फ़ैसले के बाद ही)।");
    if (old !== undefined && old > 0 && old !== n && !flag("badlo")) stop("इस कोर्स का कोड " + LIB.codeOf(c.mg, old) + " पक्का हो चुका है। कार्ड बदलना हो तो --badlo जोड़ें (Founder के फ़ैसले के बाद ही)।");
  }
  let s = fs.readFileSync(F.courses, "utf8"); const row = courseRow(s, id);
  setField(row, "udyam", n); if (newMg !== c.mg) setField(row, "mg", newMg);
  s = s.slice(0, row.a) + row.obj + s.slice(row.e + 1); fs.writeFileSync(F.courses, s);
  const c2 = LIB.load(ROOT).COURSES.find((x) => x.id === id); if (!c2 || c2.udyam !== n || c2.mg !== newMg) stop("लिखने के बाद मिलान नहीं हुआ");
  const cl = Object.assign({}, D.CLEDGER); cl[id] = LIB.codeOf(newMg, n); writeCLedger(cl);
  if (n === LIB.NONE_CARD && !inSeal) sealCourses(id, opt("karan"), null);
  if (n !== LIB.NONE_CARD && inSeal) sealCourses(null, null, id);
  console.log("✅ कोर्स " + id + " → कोड " + LIB.codeOf(newMg, n) + " · " + label + " · सेक्टर " + newMg + " " + LIB.sectorName(D, newMg) + (newMg !== c.mg ? " · कोर्स का सेक्टर " + c.mg + " से " + newMg + " हुआ" : "") +
    (n === LIB.NONE_CARD && !inSeal ? " · प्रतीक्षा-सूची में जुड़ा" : "") + (n !== LIB.NONE_CARD && inSeal ? " · प्रतीक्षा-सूची से हटा" : ""));
  console.log("   याद रखें: assets/courses_data.js बदली है, इसलिए उसी खेप में sw.js का version बढ़ाएँ।");
}
else {
  console.log("आदेश: suchi [--mg N] [--khoj शब्द] | course --id <कोड> --udyam <serial या 0> [--mg-badlo] [--badlo] [--muhar --karan \"…\"] | mg --id <कोड> --mg N | card --mg N --name \"…\" --slug … [--invest \"…\"] | naam --n <serial> --name \"…\" | sector --n <serial> --mg N --badlo [--saath] | khata-v2 | kcode-banao");
  process.exit(cmd ? 2 : 0);
}
