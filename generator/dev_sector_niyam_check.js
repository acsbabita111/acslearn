/* ============================================================
   dev_sector_niyam_check.js v1.0 (26-Nov-2026) : सेक्टर-नियम का पहरा
   Founder का नियम (26-Nov-2026): पूरी website की नींव 24 सेक्टर हैं। कोर्स, नेटवर्क, रजिस्ट्रेशन, जो भी हो,
   इन्हीं 24 में बैठेगा। सेक्टर के भीतर उद्यम-सूची है; नया कोर्स उसी सूची से मिलाया जाएगा:
   कार्ड है तो उसका कोड, नहीं है तो नया serial और नया कार्ड। कोई इस नियम को लाँघ न सके।
   (पूरा नियम: generator/data/sector_muhar.js · औज़ार: generator/sector_darj.js · जाँच का घर: generator/lib_sector.js)
   चलाएँ:  node generator/dev_sector_niyam_check.js
   तीन हिस्से:
     अ) आज के data की जाँच (24 सेक्टर, कार्ड और serial, कोर्स, नेटवर्क, क़र्ज़-सूचियाँ)।
     आ) पन्नों की अपनी नक़ल नहीं: उद्यम-पन्ने के सेक्टर-बटन और गिनती data से ही बने हैं।
     इ) लाँघने की कोशिशें (एक अलग नक़ली folder में, असली फ़ाइलें अछूती): हर कोशिश पर यंत्र को रुकना चाहिए,
        और औज़ार का सही रास्ता चलना चाहिए।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const LIB = require("./lib_sector.js");
let pass = 0, fail = 0;
const ck = (name, ok, extra) => { if (ok) { pass++; console.log("  ✅ " + name); } else { fail++; console.log("  ❌ " + name + (extra ? "\n       " + String(extra).slice(0, 700) : "")); } };

console.log("== dev_sector_niyam_check v1.0");
console.log("-- अ) आज का data");
const R = LIB.audit(ROOT);
R.checks.forEach((c) => ck(c.name, c.ok, c.extra));
const st = R.stats;
console.log("     गिनती: सेक्टर " + st.sectors + " · उद्यम-कार्ड " + st.cards + " · कोर्स " + st.courses + " (चालू " + st.live + ", कार्ड-कोड वाले " + st.withCard + ") · नेटवर्क-सेक्टर " + st.net);
console.log("     दर्ज क़र्ज़ (सिर्फ़ घट सकता है): चालू कोर्स बिना कार्ड " + st.debtCard + " · सूची की प्रविष्टि बिना सेक्टर " + st.debtMg + " · नेटवर्क-सेक्टर बिना कार्ड " + st.debtNet);

console.log("-- आ) पन्नों की अपनी नक़ल नहीं");
{
  const D = LIB.load(ROOT), page = fs.readFileSync(path.join(ROOT, "udyam/index.html"), "utf8");
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, "build_udyam_suchi.js"), "--check"], { encoding: "utf8" });
  ck("उद्यम-पन्ना generator से ताज़ा (सेक्टर-बटन, पूरी सूची, गिनती)", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const a = page.indexOf("/* UDYAM-MG:START"), b = page.indexOf("/* UDYAM-MG:END */"), blk = a > -1 && b > a ? page.slice(a, b) : "";
  const cnt = {}; D.CARDS.forEach((c) => { cnt[c.mg] = (cnt[c.mg] || 0) + 1; });
  const rows = [...blk.matchAll(/\{id:(\d+),name:'([^']*)'\}/g)].map((m) => [+m[1], m[2]]);
  ck("उद्यम-पन्ने के सेक्टर-बटन: ठीक 24, नाम mg_names.js से, गिनती उद्यम-सूची से", rows.length === 24 && rows.every(([id, nm], i) => id === i + 1 && nm === D.MG[id].e + " " + D.MG[id].n + " (" + cnt[id] + ")"),
    rows.filter(([id, nm]) => !D.MG[id] || nm !== D.MG[id].e + " " + D.MG[id].n + " (" + cnt[id] + ")").slice(0, 4).map((x) => x.join(":")).join(" | "));
  ck("उद्यम-पन्ने पर सेक्टर-सूची सिर्फ़ एक बार (दूसरी नक़ल नहीं), और \"सब\" की गिनती असली (" + D.CARDS.length + ")", page.split("const MG=[").length === 2 && blk.indexOf("{id:'all',name:'सब (" + D.CARDS.length + ")'}") > -1);
  ck("उद्यम-पन्ने की कुल गिनती तीनों जगह असली (" + D.CARDS.length + ")", page.indexOf('<span class="hs-num">' + D.CARDS.length + "</span>") > -1 && page.indexOf('id="sectorCount">सभी ' + D.CARDS.length + " उद्यम</div>") > -1 && page.indexOf("filtered.length===" + D.CARDS.length + "?'सभी " + D.CARDS.length + " उद्यम'") > -1);
  /* 24 सेक्टर के नाम किसी दूसरी प्रकाशित JS में दोबारा न लिखे हों (नक़ल = आगे का बेमेल) */
  const names = D.seal.SECTORS.map((x) => x[1]);
  /* एक जानी-पहचानी छूट: assets/dashboard.js की MG_EN तालिका (हिंदी नाम → English नाम)। यह सूची नहीं, अनुवाद है;
     शर्त: उसकी कुंजियाँ ठीक वही 24 नाम हों (नाम बदले तो यह भी साथ बदले)। */
  const ds = fs.readFileSync(path.join(ROOT, "assets/dashboard.js"), "utf8"), me = /const MG_EN = (\{[^}]*\});/.exec(ds);
  const enKeys = me ? Object.keys(JSON.parse(me[1])) : [];
  ck("dashboard.js की English-नाम तालिका (MG_EN): कुंजियाँ ठीक वही 24 सेक्टर-नाम, उसी क्रम में", enKeys.length === 24 && enKeys.every((k, i) => k === names[i]), enKeys.filter((k, i) => k !== names[i]).join(", "));
  const twins = fs.readdirSync(path.join(ROOT, "assets")).filter((f) => /\.js$/.test(f) && f !== "mg_names.js" && f !== "dashboard.js").filter((f) => { const s = fs.readFileSync(path.join(ROOT, "assets", f), "utf8"); return /MG_NAMES\s*=\s*\{/.test(s) || (names.filter((n) => s.indexOf("'" + n + "'") > -1 || s.indexOf('"' + n + '"') > -1).length >= 20 && /रोबोटिक्स/.test(s) && /डिजिटल वित्त/.test(s)); });
  ck("assets/ की कोई दूसरी फ़ाइल 24 सेक्टर की अपनी सूची नहीं रखती (घर सिर्फ़ mg_names.js)", twins.length === 0 && ds.split("MG_NAMES = {").length === 1, twins.join(", "));
}

console.log("-- इ) लाँघने की कोशिशें (नक़ली folder में; असली फ़ाइलें अछूती)");
{
  const T = fs.mkdtempSync(path.join(os.tmpdir(), "acs-sector-"));
  const FILES = ["assets/mg_names.js", "assets/udyam_data.js", "assets/courses_data.js", "generator/data/sector_muhar.js", "generator/data/udyam_serial_ledger.json", "generator/data/network/taxonomy.js"];
  const fresh = () => { for (const f of FILES) { fs.mkdirSync(path.dirname(path.join(T, f)), { recursive: true }); fs.copyFileSync(path.join(ROOT, f), path.join(T, f)); } };
  const ed = (f, fn) => { const p = path.join(T, f), s = fs.readFileSync(p, "utf8"), t = fn(s); if (t === s) throw new Error("बदलाव लगा ही नहीं: " + f); fs.writeFileSync(p, t); };
  const bad = () => { try { return LIB.audit(T).fail > 0; } catch (e) { return true; } };
  const tool = (args) => cp.spawnSync(process.execPath, [path.join(__dirname, "sector_darj.js")].concat(args, ["--root", T]), { encoding: "utf8" });
  const before = FILES.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8"));
  const t = (name, fn) => { fresh(); let ok = false, ex = ""; try { ok = fn(); } catch (e) { ex = e.message; } ck(name, ok, ex); };
  fresh(); ck("नक़ली folder में शुरू की जाँच पास (तुलना का आधार)", LIB.audit(T).fail === 0);
  t("25वाँ सेक्टर जोड़ा → रुका", () => { ed("assets/mg_names.js", (s) => s.replace(/(24:\s*\{[^}]*\})/, '$1,\n  25: { e:"🗣️", n:"भाषा" }')); return bad(); });
  t("किसी सेक्टर का नाम बदला → रुका", () => { ed("assets/mg_names.js", (s) => s.replace('n:"कृषि"', 'n:"खेती"')); return bad(); });
  t("एक सेक्टर हटाया (23 बचे) → रुका", () => { ed("assets/mg_names.js", (s) => s.replace(/\n\s*24:\s*\{[^}]*\},?/, "")); return bad(); });
  t("नया कोर्स बिना सेक्टर के जोड़ा → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "name_hi": "नया कोर्स", "name_en": "New", "url": "/courses/hi/naya/"}, ')); return bad(); });
  t("नया चालू कोर्स, सेक्टर है पर उद्यम-कार्ड का कोड नहीं → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "mg": 3, "name_hi": "नया कोर्स", "name_en": "New", "url": "/courses/hi/naya/"}, ')); return bad(); });
  t("नया कोर्स, कार्ड-कोड ऐसा जो है ही नहीं (9999) → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "mg": 3, "udyam": 9999, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}, ')); return bad(); });
  t("नया कोर्स एक सेक्टर में, कार्ड दूसरे सेक्टर का → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "mg": 7, "udyam": 116, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}, ')); return bad(); });
  t("नया कोर्स सेक्टर 25 में → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "mg": 25, "name_hi": "नया", "name_en": "New"}, ')); return bad(); });
  t("नया कोर्स क़र्ज़-सूची में चुपके से जोड़ा (छूट लेने को) → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('const SELF_EMP_COURSES = [', 'const SELF_EMP_COURSES = [{"id": "SE999", "mg": 3, "name_hi": "नया", "name_en": "New", "url": "/courses/hi/naya/"}, '));
    ed("generator/data/sector_muhar.js", (s) => s.replace('  "SE009",', '  "SE999", "SE009",')); return bad(); });
  t("क़र्ज़ की सीमा मुहर में बढ़ाई (6 → 60) → रुका", () => { ed("generator/data/sector_muhar.js", (s) => s.replace("noCard: 6,", "noCard: 60,")); return bad(); });
  t("हाथ से नया कार्ड जोड़ा (खाते के बिना) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('"intro": "/udyam/rice-cultivation-milling.html"}', '"intro": "/udyam/rice-cultivation-milling.html"}').replace(/\}\];/, '}, {"n": 952, "name": "हाथ का कार्ड", "mg": 3, "invest": "x", "intro": "/udyam/haath-ka-card.html"}];')); return bad(); });
  t("किसी पुराने कार्ड का serial बदला (116 → 9116) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('{"n": 116, ', '{"n": 9116, ')); return bad(); });
  t("एक पुराना कार्ड हटाया → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace(/, \{"n": 950, [^}]*\}/, "")); return bad(); });
  t("पुराने serial पर दूसरा उद्यम बैठाया (पन्ना बदला) → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('"intro": "/udyam/rice-cultivation-milling.html"', '"intro": "/udyam/koi-aur-udyam.html"')); return bad(); });
  t("कार्ड को सेक्टर 30 में रखा → रुका", () => { ed("assets/udyam_data.js", (s) => s.replace('{"n": 2, "name": "गेहूँ', '{"n": 2, "name": "गेहूँ').replace(/(\{"n": 2, [^}]*"mg": )1,/, "$130,")); return bad(); });
  t("चालू कोर्स से कार्ड-कोड हटाया (SE021) → रुका", () => { ed("assets/courses_data.js", (s) => s.replace('{"id": "SE021", "udyam": 116, ', '{"id": "SE021", ')); return bad(); });
  t("नेटवर्क में नया सेक्टर बिना कार्ड के → रुका", () => { ed("generator/data/network/taxonomy.js", (s) => s.replace("const SECTORS = {", 'const SECTORS = {\n  naya: { id: "NY", slug: "naya", mg: 4, icon: "x", status: "planned", hi: "नया", en: "New" },')); return bad(); });
  t("नेटवर्क का सेक्टर ग़लत सेक्टर के कार्ड से जोड़ा → रुका", () => { ed("generator/data/network/taxonomy.js", (s) => s.replace("mg: 3, udyam: 132,", "mg: 3, udyam: 310,")); return bad(); });
  /* औज़ार का सही रास्ता */
  t("औज़ार: सेक्टर 25 का कार्ड बनाने से मना", () => tool(["card", "--mg", "25", "--name", "नया (New)", "--slug", "naya-udyam"]).status !== 0);
  t("औज़ार: उसी नाम का कार्ड दोबारा बनाने से मना (पहले से है → उसी का कोड लगे)", () => { const r = tool(["card", "--mg", "11", "--name", "भाषा संस्थान (Language Institute)", "--slug", "bhasha-sansthan-2"]); return r.status !== 0 && /serial 468/.test(r.stderr); });
  t("औज़ार: कोर्स को दूसरे सेक्टर के कार्ड से जोड़ने से मना (SE021 → 310)", () => tool(["course", "--id", "SE021", "--udyam", "310"]).status !== 0 && LIB.audit(T).fail === 0);
  t("औज़ार: नया कार्ड = सबसे बड़ा serial + 1, खाते में दर्ज, जाँच पास; फिर कोर्स पर उसका कोड", () => {
    const n0 = LIB.load(T).CARDS.length, r = tool(["card", "--mg", "7", "--name", "प्रिंटर मरम्मत (Printer Repair)", "--slug", "printer-repair-business"]);
    const D = LIB.load(T), last = D.CARDS[D.CARDS.length - 1];
    if (r.status !== 0 || D.CARDS.length !== n0 + 1 || last.n !== n0 + 1 || last.mg !== 7 || D.LEDGER[n0 + 1] !== "/udyam/printer-repair-business.html" || LIB.audit(T).fail !== 0) return false;
    const r2 = tool(["course", "--id", "SE017", "--udyam", String(n0 + 1)]); if (r2.status !== 0) return false;
    /* अब SE017 क़र्ज़-सूची में बासी है: यंत्र कहे "सूची से हटाओ"; हटाने पर पास */
    if (LIB.audit(T).fail === 0) return false;
    ed("generator/data/sector_muhar.js", (s) => s.replace(/\n  "SE017",[^\n]*/, ""));
    return LIB.audit(T).fail === 0 && LIB.load(T).COURSES.find((c) => c.id === "SE017").udyam === n0 + 1;
  });
  t("औज़ार: कोर्स का सेक्टर कार्ड वाला करना सिर्फ़ --mg-badlo के साथ (PJ016 → 463)", () => {
    if (tool(["course", "--id", "PJ016", "--udyam", "463"]).status === 0) return false;
    const r = tool(["course", "--id", "PJ016", "--udyam", "463", "--mg-badlo"]); const c = LIB.load(T).COURSES.find((x) => x.id === "PJ016");
    return r.status === 0 && c.udyam === 463 && c.mg === 11;
  });
  const after = FILES.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8"));
  ck("इन कोशिशों के बाद असली फ़ाइलें byte-दर-byte वैसी ही", before.every((s, i) => s === after[i]));
  fs.rmSync(T, { recursive: true, force: true });
}

console.log("जाँचें: पास " + pass + " · फेल " + fail);
if (fail) { console.log("⛔ dev_sector_niyam_check रुका"); process.exit(1); }
console.log("🏁 dev_sector_niyam_check v1.0 : सेक्टर-नियम पास");
