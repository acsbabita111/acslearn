/* ============================================================
   dev_network_check.js v1.5 (25-Nov-2026, खेप N-3.1: ChatGPT ऑडिट CSC-01/02: किसी प्रकाशित पते में ख़ाली/"null" टुकड़ा या शोध-टिप्पणी
   नहीं; हर CSC नाम की स्रोत-कड़ी (7,437/7,437; कॉलम खिसके 3 की कड़ी पते के खाने से); छँटाई के कार्ड में कड़ी न हो तो "स्रोत की कड़ी
   नहीं"; importer की दो नई धाराएँ (नक़ली CSV से)।
   v1.4 (25-Nov-2026, खेप N-3: CSC सूची। नई जाँचें: BIHAR-CSC-001 के 7,437 रिकॉर्ड (स्रोत की 7,449 पंक्तियाँ,
   ChatGPT का पक्का आँकड़ा, batches.js में), सब "जाँच बाक़ी", फ़ोन/email/वेबसाइट कहीं नहीं, "Official CSC" सिर्फ़ सरकारी स्रोत पर
   (1,819), ID-रूप, शोध-टिप्पणी पता नहीं बनी; CSC के पन्ने: हर नाम की ज़िले के पन्ने पर ठीक एक जगह, अलग पन्ना नहीं, ChatGPT का
   disclosure अक्षरशः, "सत्यापित CSC नेटवर्क" जैसा कोई दावा नहीं, कोई tel: नहीं; Two-Wheeler के पन्ने और data वैसे ही; छँटाई में
   CSC का कार्ड और "प्रखंड-मिलान बाक़ी"; importer की नई धाराएँ (नक़ली CSC-CSV से)। ACS_NET_CSC_SRC=<CSV> दें तो स्रोत से हूबहू मिलान भी।
   v1.3 (22-Nov-2026, खेप N-1; v1.3 = office-laptop (Windows) की पहली दौड़ की सीख: Python-जाँच UTF-8
   console के साथ चलती है; नई जाँच: Windows-जैसी console (cp1252) पर भी साँचा-जाँच पास; आख़िर में फेल जाँचों के नाम दोबारा
   छपते हैं, ताकि खिड़की के आख़िरी हिस्से में ही दिखें। v1.2 = ऑडिट N1-P0-03/04: नक़ली-CSV की हर ग़लत/रोकी पंक्ति के हर खाने
   में पहचान-चिह्न (SENT…) और ऑडिटर का अपना मामला (ग़लत ज़िला + तारीख़ की जगह निजी email): रिपोर्ट में एक भी चिह्न, email
   या 10+ अंक नहीं; ब्रांड/इलाक़ा/शाखा/दूसरे खानों में फ़ोन, email, भीतरी पाठ = रोककर रखा; publicProblems() ब्रांड वाले फ़ोन
   ["private 9876543210"] समेत पकड़ता है; रिपोर्ट का आख़िरी पहरा (email/अंक दिखे तो रुकना) भी जाँचा। v1.1 = ऑडिट N1-P0-01/02: हर जाँच का नाम छपता है (✅/❌, सबूत के लिए);
   857 पर publicProblems() = 0; "सत्यापित" का ताला (VERIFY.registry = null); नक़ली-CSV में निजी Sector_Data_JSON, email/फ़ोन वाला
   नाम/पता/स्रोत, नेस्टेड/ग़लत JSON, TW की ग़लत vehicleType = रोककर रखे, और Evidence_Ref+तारीख़ वाला "Verified" भी = जाँच बाक़ी;
   निजी मान न सार्वजनिक JSON में, न रिपोर्ट में) : व्यावहारिक प्रशिक्षण नेटवर्क का जाँच-यंत्र (robot)
   चलाएँ:  node generator/dev_network_check.js
           (jsdom हो तो पन्ने की छँटाई भी असली DOM में चलती है: ACS_JSDOM=<पता>/node_modules/jsdom ; न हो तो वह हिस्सा छूटता है)
           (Founder की स्रोत-Excel हो तो: ACS_NET_SRC=<फ़ाइल> : data उसी फ़ाइल से हूबहू बना है, यह भी जाँचता है)
   जाँचें:
     1. सब generator ताज़ा (build_network, build_net_khoj, build_menu_lang, Excel-साँचा)।
     2. data: 857 रिकॉर्ड, 38 ज़िले, ID अनोखे और सही रूप के; बिना RM-सबूत कोई "सत्यापित" नहीं; प्रशिक्षण का कोई दावा नहीं;
        सार्वजनिक फ़ाइलों में email, Confidence, RM-क़तार जैसे भीतरी खाने नहीं; हर रिकॉर्ड का स्रोत-पता; फ़ोन/PIN सही रूप के।
     3. पन्ने: हर फ़र्म/ज़िले/राज्य का हिंदी और English पन्ना; हर पन्ने पर disclaimer और "नाम ≠ साझेदारी" वाली सूचना;
        canonical ख़ुद पर, hreflang के पते मौजूद; English में देवनागरी शून्य; हर भीतरी कड़ी की फ़ाइल मौजूद;
        फ़र्म और उस्ताद के अलग बटन; कोई फ़ीस/कमीशन (₹, %) नहीं; चौकोर कोष्ठक नहीं।
     4. नेटवर्क-पन्ने का हिस्सा: छाप (?v=) असली फ़ाइलों से मेल; index.json की गिनती और ज़िला-फ़ाइलें सही।
     5. net-praktik.js: ES5, छँटाई सही, नाम में HTML हो तो भी सुरक्षित; (jsdom हो तो) पन्ने पर ज़िला चुनते ही सूची + निशान।
     6. net-sudhar.js: server का submitContactMessage, App Check, esc(), संदेश की सीमा।
     7. importer: अस्थायी नक़ली-CSV से तीनों स्तर (रोक / रोककर रखा / सूचना), साझा फ़ोन, Verified-बिना-सबूत।
     8. sitemap-network.xml = सब पन्ने; पर्चियाँ sitemap में नहीं। 9. Excel-साँचा: कॉलम सही, कोई नमूना-पंक्ति नहीं।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process"), os = require("os"), vm = require("vm"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
const N = require("./lib_network.js"), TX = N.TX, UI = require("./data/network/ui.js"), BATCHES = require("./data/network/batches.js");
let pass = 0, fail = 0, skip = 0;
const FAILED = [];
function ck(name, ok, extra) { if (ok) { pass++; console.log("✅ " + name); return true; } fail++; FAILED.push(name); console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 600) : "")); return false; }
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const ex = (p) => fs.existsSync(path.join(ROOT, p));
const DEV = /[ऀ-ॿ]/;
const ENV_UTF8 = Object.assign({}, process.env, { PYTHONUTF8: "1", PYTHONIOENCODING: "utf-8" });
const run = (args, cmd, env) => cp.spawnSync(cmd || process.execPath, args, { cwd: ROOT, encoding: "utf8", env: env || ENV_UTF8 });

/* ── 1. generator ताज़ा ── */
for (const g of ["build_network.js", "build_net_khoj.js", "build_menu_lang.js"]) {
  const r = run([path.join("generator", g), "--check"]);
  ck("generator ताज़ा: " + g + " --check", r.status === 0, (r.stdout + r.stderr).slice(-400));
}
const py = run(["generator/build_network_template.py", "--check"], process.platform === "win32" ? "python" : "python3");
if (py.error || py.status === 9009 || /ModuleNotFoundError|No module named|was not found/i.test(py.stdout + py.stderr)) { skip++; console.log("ℹ️ python या openpyxl नहीं मिला: Excel-साँचे की --check छूटी"); }
else {
  ck("Excel-साँचा ताज़ा (build_network_template.py --check)", py.status === 0, py.stdout + py.stderr);
  /* Windows पर pipe की console cp1252 होती है: script को फिर भी UTF-8 में छापना और पास होना चाहिए */
  const pyw = run(["generator/build_network_template.py", "--check"], process.platform === "win32" ? "python" : "python3",
    Object.assign({}, process.env, { PYTHONUTF8: "0", PYTHONIOENCODING: "cp1252" }));
  ck("Excel-साँचा-जाँच Windows-जैसी console (cp1252) पर भी पास", pyw.status === 0, pyw.stdout + pyw.stderr);
}
if (process.env.ACS_NET_SRC) {
  const r = run(["generator/import_network.js", "BIHAR-TW-001", process.env.ACS_NET_SRC, "--check"]);
  ck("data स्रोत-Excel से हूबहू (import_network --check)", r.status === 0, r.stdout + r.stderr);
} else { skip++; console.log("ℹ️ ACS_NET_SRC नहीं दिया: स्रोत-Excel से मिलान छूटा (data की बाक़ी जाँच चलती है)"); }

/* ── 2. data ── */
const raw = rd("generator/data/network/batches/BIHAR-TW-001.json"), J = JSON.parse(raw), R = J.records;
const B = BATCHES["BIHAR-TW-001"];
ck("गिनती: 857 रिकॉर्ड (batches.js की expect)", R.length === B.expect.records && J.count === R.length, R.length);
ck("ज़िले: 38", new Set(R.map((r) => r.district)).size === B.expect.districts);
ck("ID अनोखे", new Set(R.map((r) => r.id)).size === R.length);
const dcode = {}; for (const d of N.STATES.bihar.districts) dcode[d.slug] = d.code;
ck("हर ID का रूप BR-<ज़िला-कूट>-NNNN और ज़िले से मेल", R.every((r) => new RegExp("^BR-" + dcode[r.district] + "-\\d{4}$").test(r.id)), R.find((r) => !new RegExp("^BR-" + dcode[r.district] + "-\\d{4}$").test(r.id)));
ck("सेक्टर TW, mg 3, सब PUBLISHED", R.every((r) => r.sectorId === "TW" && r.mg === 3 && r.listingStatus === "PUBLISHED"));
ck("प्रशिक्षण का कोई दावा नहीं: सबका practicalTrainingAvailability = UNKNOWN", R.every((r) => r.practicalTrainingAvailability === "UNKNOWN"));
ck("सत्यापन का ताला बंद: taxonomy.VERIFY.registry = null (server का RM-रजिस्टर अभी नहीं)", TX.VERIFY && TX.VERIFY.registry === null);
ck("857 में सब \"जाँच बाक़ी\": कोई verificationDate/verifiedBy/lastRMCheck नहीं", R.every((r) => r.verificationStatus === "TO_BE_VERIFIED" && !r.verificationDate && !r.verifiedBy && !r.lastRMCheck));
const ppBad = R.map((r) => [r.id, N.publicProblems(r)]).filter((x) => x[1].length);
ck("857 पर सार्वजनिक-पहरा publicProblems() = 0 (तय खाने, Sector_Data_JSON allowlist, email/फ़ोन-रिसाव, ताला)", ppBad.length === 0, JSON.stringify(ppBad.slice(0, 3)));
ck("sectorData सिर्फ़ अनुमत कुंजी: सबका {vehicleType: TWO_WHEELER}", R.every((r) => JSON.stringify(r.sectorData) === '{"vehicleType":"TWO_WHEELER"}'));
ck("build_network.js और import_network.js दोनों publicProblems() चलाते हैं", /N\.publicProblems\(r\)/.test(rd("generator/build_network.js")) && /NW\.publicProblems\(rec\)/.test(rd("generator/import_network.js")));
const pubFiles = ["generator/data/network/batches/BIHAR-TW-001.json"].concat(fs.readdirSync(path.join(ROOT, "assets/network/bihar/tw")).map((f) => "assets/network/bihar/tw/" + f), ["assets/network/index.json"]);
const pubAll = pubFiles.map(rd).join("\n");
ck("सार्वजनिक data में email-पता नहीं", !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(pubAll));
ck("सार्वजनिक data में भीतरी खाने नहीं (Confidence, Priority, RM_Owner, Identity_Review, Packet_ID, Email …)",
  !/"(Confidence|confidence|Priority|priority|RM_Owner|rmOwner|Identity_Review|identityReview|Packet_ID|Email|email|Execution_Route|Attempt_Status|internalStatus|Notes)"/.test(pubAll));
ck("हर रिकॉर्ड पर स्रोत-पता (http/https) और स्रोत-प्रकार taxonomy का", R.every((r) => r.sources.length && r.sources.every((s) => TX.SOURCE_TYPES[s.sourceType]) && r.sources.some((s) => /^https?:\/\//.test(s.sourceUrl || ""))));
ck("फ़ोन का रूप सही (10 अंक 6-9 से, या 0 वाला landline)", R.every((r) => r.phone.every((p) => /^[6-9]\d{9}$|^0\d{10}$/.test(p))));
const pc = {}; R.forEach((r) => r.phone.forEach((p) => { pc[p] = (pc[p] || 0) + 1; }));
ck("कोई 'अपना फ़ोन' 3 से ज़्यादा फ़र्मों पर नहीं (साझा नंबर sharedPhone में)", Object.values(pc).every((n) => n <= 3));
ck("साझा नंबर साफ़ लिखा: 50 OLA-जगहें", R.filter((r) => r.sharedPhone).length === 50 && R.every((r) => !r.sharedPhone || (r.sharedPhone.places > 3 && /^[6-9]\d{9}$|^0\d{10}$/.test(r.sharedPhone.number))));
ck("PIN 6 अंक, बिहार की सीमा में (या ख़ाली)", R.every((r) => r.pin === null || (/^\d{6}$/.test(r.pin) && +r.pin >= 800000 && +r.pin <= 855999)));
ck("श्रेणी taxonomy की", R.every((r) => N.category("tw", r.primaryCategory)));
ck("हर रिकॉर्ड पर batch-ID और तारीख़", R.every((r) => r.importBatch === "BIHAR-TW-001" && r.createdAt === B.importedOn));

/* ── 2b. CSC सूची (v1.4) ── */
const CSC_DISC = "यह सूची सार्वजनिक/सरकारी स्रोतों से पूर्व-सूचीबद्ध है। ACS/RM सत्यापन अलग प्रक्रिया है। सूची में होना प्रशिक्षण, साझेदारी या वर्तमान संचालन की गारंटी नहीं है।";   /* ChatGPT brief, अक्षरशः */
const J2 = JSON.parse(rd("generator/data/network/batches/BIHAR-CSC-001.json")), R2 = J2.records, B2 = BATCHES["BIHAR-CSC-001"];
ck("CSC: पक्के आँकड़े batches.js में: स्रोत की पंक्तियाँ 7449, प्रकाशित 7437, ज़िले 38", B2.expect.rows === 7449 && B2.expect.records === 7437 && B2.expect.districts === 38);
ck("CSC: गिनती 7437 रिकॉर्ड, 38 ज़िले, ID अनोखे और रूप BR-CSC-M/A + 5 अंक", R2.length === B2.expect.records && J2.count === R2.length && new Set(R2.map((r) => r.district)).size === 38 &&
  new Set(R2.map((r) => r.id)).size === R2.length && R2.every((r) => /^BR-CSC-[MA]\d{5}$/.test(r.id)), R2.length);
ck("CSC: सेक्टर CSC, mg 7, एक श्रेणी CSC-01, सब PUBLISHED", R2.every((r) => r.sectorId === "CSC" && r.mg === 7 && r.primaryCategory === "CSC-01" && r.listingStatus === "PUBLISHED"));
ck("CSC: सब \"जाँच बाक़ी\", कोई सत्यापन-तारीख़/नाम नहीं, प्रशिक्षण UNKNOWN", R2.every((r) => r.verificationStatus === "TO_BE_VERIFIED" && !r.verificationDate && !r.verifiedBy && !r.lastRMCheck && r.practicalTrainingAvailability === "UNKNOWN"));
const pp2 = R2.map((r) => [r.id, N.publicProblems(r)]).filter((x) => x[1].length);
ck("CSC: 7437 पर सार्वजनिक-पहरा publicProblems() = 0", pp2.length === 0, JSON.stringify(pp2.slice(0, 3)));
ck("CSC: फ़ोन, साझा नंबर, वेबसाइट, ब्रांड, हुनर कहीं नहीं (कुछ गढ़ा नहीं)", R2.every((r) => r.phone.length === 0 && r.sharedPhone === null && r.website === null && !r.brandOem.length && !r.practicalSkillTags.length && r.latitude === null));
ck("CSC: sectorData सिर्फ़ officialCsc (हाँ/ना) और rawBlock", R2.every((r) => Object.keys(r.sectorData).every((k) => k === "officialCsc" || k === "rawBlock") && typeof r.sectorData.officialCsc === "boolean"));
const off2 = R2.filter((r) => r.sectorData.officialCsc);
ck("CSC: \"Official CSC\" 1819, और हर एक का स्रोत सरकारी (GOVERNMENT); सरकारी स्रोत वाला हर नाम Official", off2.length === 1819 && off2.every((r) => r.sources[0].sourceType === "GOVERNMENT") &&
  R2.filter((r) => r.sources.some((x) => x.sourceType === "GOVERNMENT")).length === 1819, off2.length);
ck("CSC: प्रखंड ख़ाली (प्रखंड-मिलान बाक़ी) सिर्फ़ वहीं, जहाँ स्रोत का प्रखंड है: 761", R2.filter((r) => r.block === "").length === 761 && R2.every((r) => r.block !== "" || r.sectorData.rawBlock));
const NA = (B2.notAddress || []).map((x) => new RegExp(x, "i"));
ck("CSC: पते में शोध-टिप्पणी नहीं (\"Source row/rank …\", \"Source says …\", \"Listed at SNo …\", अकेला URL …)", NA.length === 8 && R2.every((r) => !r.address || !NA.some((re) => re.test(r.address))) &&
  R2.every((r) => !r.address || !/source (row |address )?(explicitly )?says|listed at sno|page reports|https?:\/\//i.test(r.address)));
const DP = (B2.addressDropParts || []).map((x) => new RegExp(x, "i"));
ck("CSC (ऑडिट CSC-01): किसी प्रकाशित पते में ख़ाली/\"null\" टुकड़ा नहीं (जैसे \"District-null\", \"Panchayat/Village-\")", DP.length === 2 &&
  R2.every((r) => !r.address || (!/\bnull\b/i.test(r.address) && r.address.split(",").every((x) => !DP.some((re) => re.test(x))) && r.address === r.address.trim())));
const byR2 = {}; R2.forEach((r) => { byR2[r.id] = r; });
ck("CSC (ऑडिट CSC-02): हर नाम की स्रोत-कड़ी (7437/7437); कॉलम खिसके 3 (A02484-86) की कड़ी goodreturns की, पता ख़ाली", R2.every((r) => r.sources.some((x) => x.sourceUrl)) &&
  ["BR-CSC-A02484", "BR-CSC-A02485", "BR-CSC-A02486"].every((i) => byR2[i] && /^https:\/\/www\.goodreturns\.in\/csc-in-[a-z-]+-c\d+\.html$/.test(byR2[i].sources[0].sourceUrl) &&
    byR2[i].sources[0].sourceType === "CSC_DIRECTORY" && byR2[i].address === null));
ck("CSC: हर रिकॉर्ड पर batch-ID और तारीख़", R2.every((r) => r.importBatch === "BIHAR-CSC-001" && r.createdAt === B2.importedOn));
const cscPub = fs.readdirSync(path.join(ROOT, "assets/network/bihar/csc")).map((f) => rd("assets/network/bihar/csc/" + f)).join("\n") + rd("generator/data/network/batches/BIHAR-CSC-001.json");
ck("CSC: सार्वजनिक data में email, भीतरी खाने (source_layer, record_origin, rm_verification …) नहीं", !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(cscPub) &&
  !/source_layer|source_authority|record_origin|rm_verification|workshop_commitment|block_mapping_status|portal_publish|Gap Closure/i.test(cscPub));
if (process.env.ACS_NET_CSC_SRC) {
  const r = run(["generator/import_network.js", "BIHAR-CSC-001", process.env.ACS_NET_CSC_SRC, "--check"]);
  ck("CSC: data स्रोत-CSV से हूबहू (import_network --check)", r.status === 0, r.stdout + r.stderr);
  const SR = require("./import_network.js").parseCSV(fs.readFileSync(process.env.ACS_NET_CSC_SRC, "utf8")), hh = SR[0], ix = (n) => hh.indexOf(n);
  const src = SR.slice(1).filter((x) => x.some((v) => v)), byId2 = {}; R2.forEach((x) => { byId2[x.id] = x; });
  const sp = (v) => (v === null ? "" : String(v).replace(/\s+/g, " ").trim());
  ck("CSC स्रोत: 7449 पंक्तियाँ; हर प्रकाशित नाम स्रोत में; नाम और प्रखंड वर्तनी जस-की-तस", src.length === 7449 && R2.every((x) => src.some((y) => y[ix("record_id")] === x.id)) &&
    src.every((y) => { const x = byId2[y[ix("record_id")]]; return !x || (x.firmName === sp(y[ix("vle_name")]) && x.block === sp(y[ix("canonical_block")]) && (x.sectorData.rawBlock || "") === sp(y[ix("raw_block")])); }));
  ck("CSC स्रोत: \"Official CSC\" ठीक वहीं, जहाँ official_csc_label_allowed = YES", src.every((y) => { const x = byId2[y[ix("record_id")]]; return !x || x.sectorData.officialCsc === (sp(y[ix("official_csc_label_allowed")]) === "YES"); }));
} else { skip++; console.log("ℹ️ ACS_NET_CSC_SRC नहीं दिया: CSC स्रोत-CSV से मिलान छूटा (data की बाक़ी जाँच चलती है)"); }

/* ── 3. पन्ने ── */
const urls = N.pageUrls(N.loadRecords());
ck("पन्नों की गिनती: 2 × (1 + 38 + 857) टू-व्हीलर + 2 × (1 + 38) CSC = 1870 (CSC के नामों के अलग पन्ने नहीं)", urls.length === 1870 && !urls.some((u) => /\/firm\/br-csc-/.test(u)), urls.length);
const missing = urls.filter((u) => !ex(N.fileOf(u)));
ck("हर पन्ना मौजूद", missing.length === 0, missing.slice(0, 5));
let devEn = [], noDisc = [], badCanon = [], badHref = [], deadLink = [], verTag = [], money = [], sq = [], noCta = [], noId = [];
const linkCache = {};
const live = (u) => { const p = u.replace(/[?#].*$/, ""); if (linkCache[p] === undefined) linkCache[p] = ex(N.fileOf(p) || "index.html"); return linkCache[p]; };
const recById = {}; R.forEach((r) => { recById[r.id.toLowerCase()] = r; });
for (const u of urls) {
  if (!ex(N.fileOf(u))) continue;
  const s = rd(N.fileOf(u)), en = u.startsWith("/en/"), L = en ? "en" : "hi";
  if (en && DEV.test(s)) devEn.push(u);
  const body = s.slice(s.indexOf('<div class="nw-wrap">'), s.indexOf("</main>"));
  const isCsc = /\/network\/bihar\/csc\//.test(u), XT = isCsc ? UI[L].secText.csc : null;
  if (isCsc ? (body.indexOf(N.esc(XT.disclosure)) < 0 || body.indexOf(N.esc(XT.notice)) < 0 || body.indexOf(N.esc(UI[L].disclaimer)) > -1)
            : (body.indexOf(N.esc(UI[L].disclaimer)) < 0 || body.indexOf(N.esc(UI[L].notice)) < 0)) noDisc.push(u);
  const can = (s.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (can !== "https://acslearn.com" + u) badCanon.push(u);
  for (const m of s.matchAll(/hreflang="[^"]+" href="https:\/\/acslearn\.com([^"]+)"/g)) if (!live(m[1])) badHref.push(u + " → " + m[1]);
  for (const m of body.matchAll(/href="(\/[^"]*)"/g)) if (!/^\/join\.html\?role=(workshop|ustad)(&amp;lang=en)?$/.test(m[1]) && !live(m[1])) deadLink.push(u + " → " + m[1]);
  const text = body.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  if (/₹|\d\s*%|commission|कमीशन|फ़ीस|फीस|\bfee\b/i.test(text)) money.push(u);
  if (/[\[\]]/.test(text)) sq.push(u);
  const fm = /\/network\/firm\/([a-z0-9-]+)\.html$/.exec(u);
  if (fm) {
    const r = recById[fm[1]];
    if (!r || body.indexOf(r.id) < 0) noId.push(u);
    if (body.indexOf('class="nw-tag ver"') > -1 && r && r.verificationStatus === "TO_BE_VERIFIED") verTag.push(u);
    if (!/role=workshop/.test(body) || !/role=ustad/.test(body) || body.indexOf('id="nwFix"') < 0) noCta.push(u);
  } else if (/class="nw-card ver"/.test(body)) verTag.push(u);
}
ck("English पन्नों में देवनागरी शून्य", devEn.length === 0, devEn.slice(0, 3));
ck("हर पन्ने पर अपनी सूची का disclaimer और सूचना (CSC पर ChatGPT का disclosure, Two-Wheeler पर पुराना)", noDisc.length === 0, noDisc.slice(0, 3));
ck("CSC का disclosure ui.js में ChatGPT brief से अक्षरशः", UI.hi.secText.csc.disclosure === CSC_DISC);
/* CSC के पन्ने: हर नाम की ठीक एक जगह, Official/सूचीबद्ध निशान, कोई tel:/सत्यापित-दावा नहीं */
let cscAnch = 0, cscBad = [];
const offById = {}; R2.forEach((r) => { offById[r.id.toLowerCase()] = r; });
for (const u of urls.filter((x) => /\/network\/bihar\/csc\/[a-z-]+\/$/.test(x))) {
  const s = rd(N.fileOf(u)), L = u.startsWith("/en/") ? "en" : "hi", dist = u.split("/").slice(-2)[0];
  const want = R2.filter((r) => r.district === dist), ids = [...s.matchAll(/<li class="nw-card" id="(br-csc-[ma]\d{5})">/g)].map((m) => m[1]);
  if (ids.length !== want.length || new Set(ids).size !== ids.length || !want.every((r) => ids.indexOf(r.id.toLowerCase()) > -1)) cscBad.push(u + " जगहें " + ids.length + "/" + want.length);
  const nOff = s.split(N.esc(UI[L].hub.official)).length - 1, nList = s.split(N.esc(UI[L].hub.listed)).length - 1;
  if (nOff !== want.filter((r) => r.sectorData.officialCsc).length) cscBad.push(u + " Official " + nOff);
  if (nList !== want.length) cscBad.push(u + " सूचीबद्ध " + nList);
  const sb = s.slice(s.indexOf('<div class="nw-wrap">'), s.indexOf("</main>"));   /* ढाँचे (footer) का ACS-नंबर नहीं, सिर्फ़ सूची का हिस्सा */
  if (/href="tel:|class="nw-tag ver"|nw-card ver/.test(sb)) cscBad.push(u + " tel/सत्यापित");
  cscAnch += ids.length;
}
ck("CSC ज़िला-पन्ने: हर नाम की ठीक एक जगह (#id), दोनों भाषाओं में 2 × 7437; Official-निशान सिर्फ़ Official पर; हर कार्ड पर सूचीबद्ध; कोई tel: या सत्यापित-निशान नहीं",
  cscBad.length === 0 && cscAnch === 2 * 7437, cscBad.slice(0, 4).concat([cscAnch]));
ck("CSC: किसी नाम का अलग पन्ना नहीं (/network/firm/br-csc-*)", !fs.readdirSync(path.join(ROOT, "network/firm")).some((f) => /^br-csc-/.test(f)));
const cscAll = urls.filter((x) => /\/network\/bihar\/csc\//.test(x)).map((x) => rd(N.fileOf(x))).join("\n");
ck("CSC: कहीं \"सत्यापित CSC नेटवर्क\" / \"Verified … CSC Network\" जैसा दावा नहीं; सरकारी गिनती का दावा नहीं",
  !/verified[^<]{0,20}csc\s*network|सत्यापित[^<]{0,20}csc[^<]{0,6}नेटवर्क|कुल\s+csc|total\s+csc/i.test(cscAll));
ck("टू-व्हीलर के पन्ने CSC-शब्दों से अछूते (disclosure/Official/सूचीबद्ध नहीं)", urls.filter((x) => /two-wheeler|\/firm\//.test(x)).slice(0, 400).every((x) => {
  const t = rd(N.fileOf(x)); return t.indexOf(UI.hi.secText.csc.disclosure) < 0 && t.indexOf(UI.en.secText.csc.disclosure) < 0 && t.indexOf("Official CSC") < 0; }));
ck("canonical ख़ुद पर", badCanon.length === 0, badCanon.slice(0, 3));
ck("hreflang के सब पते मौजूद", badHref.length === 0, badHref.slice(0, 3));
ck("पन्नों की हर भीतरी कड़ी की फ़ाइल मौजूद", deadLink.length === 0, deadLink.slice(0, 5));
ck("जाँच-बाक़ी जगह पर 'सत्यापित' निशान नहीं", verTag.length === 0, verTag.slice(0, 3));
ck("कोई फ़ीस/कमीशन/प्रतिशत का दावा नहीं", money.length === 0, money.slice(0, 3));
ck("चौकोर कोष्ठक नहीं", sq.length === 0, sq.slice(0, 3));
ck("फ़र्म-पन्ने पर ID, सुधार-फ़ॉर्म, और फ़र्म व उस्ताद के अलग बटन", noCta.length === 0 && noId.length === 0, noCta.concat(noId).slice(0, 3));
const css = rd("assets/network.css");
const small = (css.match(/font-size:\s*(\d+)px/g) || []).map((x) => +x.replace(/\D/g, "")).filter((n) => n < 16);
ck("network.css: कोई अक्षर 16px से छोटा नहीं", small.length === 0, small);
const slips = ["/network/", "/network/firm/", "/network/bihar/", "/en/network/", "/en/network/firm/", "/en/network/bihar/"];
ck("पर्चियाँ मौजूद और नेटवर्क-पन्ने पर भेजती हैं", slips.every((u) => ex(N.fileOf(u)) && /http-equiv="refresh" content="0; url=\/(en|hi)\/network\.html#praktik"/.test(rd(N.fileOf(u)))));

/* ── 4. नेटवर्क-पन्ने का हिस्सा ── */
const vOf = (rel) => crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 10);
for (const hub of ["hi/network.html", "en/network.html"]) {
  const h = rd(hub);
  ck(hub + ": व्यावहारिक-सूची का हिस्सा ठीक एक बार, छाप असली फ़ाइलों से",
    h.split('id="npApp"').length === 2 && h.indexOf("/assets/network/index.json?v=" + vOf("assets/network/index.json") + '"') > -1 &&
    h.indexOf("/assets/net-praktik.js?v=" + vOf("assets/net-praktik.js") + '"') > -1 && h.indexOf("/assets/network.css?v=" + vOf("assets/network.css") + '"') > -1);
  const blk = h.slice(h.indexOf('id="praktik"'), h.indexOf("</section>", h.indexOf('id="praktik"')));
  const L = hub.startsWith("en") ? "en" : "hi";
  ck(hub + ": हिस्से में disclaimer, सूचना, फ़र्म और उस्ताद के अलग बटन", blk.indexOf(UI[L].disclaimer) > -1 && blk.indexOf(UI[L].notice) > -1 && /role=workshop/.test(blk) && /role=ustad/.test(blk));
}
ck("en/network.html: बटन English पैनल पर (lang=en) और सूची-कड़ी /en/ पर", /role=workshop&amp;lang=en/.test(rd("en/network.html")) && rd("en/network.html").indexOf('href="/en/network/bihar/two-wheeler/"') > -1);
const IDX = JSON.parse(rd("assets/network/index.json"));
let shardOk = true, sum = 0;
for (const st of IDX.states) for (const k of Object.keys(st.sectors)) for (const d of st.sectors[k].districts) {
  const rel = d.shard.slice(1).replace(/\?v=.*$/, ""), v = d.shard.split("?v=")[1];
  if (!ex(rel) || crypto.createHash("sha1").update(rd(rel)).digest("hex").slice(0, 10) !== v) shardOk = false;
  else { const sj = JSON.parse(rd(rel)); if (sj.r.length !== d.n) shardOk = false; sum += sj.r.length; }
  if (!ex(N.fileOf(d.page.hi)) || !ex(N.fileOf(d.page.en))) shardOk = false;
}
ck("index.json: ज़िला-फ़ाइलें मौजूद, छाप सही, गिनती का जोड़ 857 + 7437", shardOk && sum === 857 + 7437, sum);
ck("index.json: हिंदी और English शब्द-कुंजियाँ एक-सी; IT 'सर्वे जारी' और 12 श्रेणियाँ, बिना किसी फ़र्म के",
  JSON.stringify(Object.keys(IDX.ui.hi).sort()) === JSON.stringify(Object.keys(IDX.ui.en).sort()) &&
  IDX.sectors.some((s) => s.key === "it" && s.status === "survey" && s.cats.length === 12) && IDX.states.every((s) => !s.sectors.it));
const IC = IDX.sectors.find((s) => s.key === "csc");
ck("index.json: CSC सूची 'सूचीबद्ध', rp 0, अपना disclosure (दोनों भाषा), बिहार में 38 ज़िले", IC && IC.status === "listed" && IC.rp === 0 && IC.txt.hi.disc === CSC_DISC &&
  IC.txt.en.disc === UI.en.secText.csc.disclosure && IDX.states[0].sectors.csc && IDX.states[0].sectors.csc.districts.length === 38 && IDX.states[0].sectors.csc.n === 7437);
const kc = JSON.parse(rd("assets/network/bihar/csc/khagaria.json")).r;
ck("CSC ज़िला-फ़ाइल: फ़ोन/email नहीं; o सिर्फ़ Official पर; पता शोध-टिप्पणी नहीं", kc.every((r) => !r.p && !r.sp && (r.o === undefined || r.o === 1)) &&
  kc.filter((r) => r.o === 1).length === R2.filter((r) => r.district === "khagaria" && r.sectorData.officialCsc).length && kc.every((r) => !r.a || !NA.some((re) => re.test(r.a))));

/* ── 5. net-praktik.js ── */
const NPJS = rd("assets/net-praktik.js");
ck("net-praktik.js: ES5 (Android 8): const/let/=>/`/class नहीं", !/\b(const|let|class)\s|=>|`/.test(NPJS.replace(/\/\*[\s\S]*?\*\//g, "")));
const sb = { window: {}, document: { getElementById: () => null, documentElement: { lang: "hi" } } };
vm.runInNewContext(NPJS, sb);
const NP = sb.window.ACS_NP;
const kh = JSON.parse(rd("assets/network/bihar/tw/khagaria.json")).r;
ck("छँटाई: प्रखंड, श्रेणी, स्थिति, नाम", NP && NP.filter(kh, {}).length === kh.length && NP.filter(kh, { b: "Gogri" }).every((r) => r.b === "Gogri") &&
  NP.filter(kh, { s: "V" }).length === 0 && NP.filter(kh, { q: "TVS" }).every((r) => /tvs/i.test(r.n)) && NP.filter(kh, { c: "TW-05" }).every((r) => r.c === "TW-05"));
const evil = NP.card("hi", IDX, IDX.sectors[0], { i: "BR-KHG-0001", n: '<img src=x onerror="alert(1)">', b: "<b>x</b>", c: "TW-01", s: "T", p: "9876543210" });
ck("नाम/जगह में HTML हो तो भी सुरक्षित (esc)", evil.indexOf("<img") < 0 && evil.indexOf("<b>x") < 0 && evil.indexOf("/network/firm/br-khg-0001.html") > -1 && evil.indexOf("◷") > -1);
const cdd = { page: { hi: "/network/bihar/csc/patna/", en: "/en/network/bihar/csc/patna/" } };
const ce = NP.card("hi", IDX, IC, { i: "BR-CSC-M00001", n: '<img src=x onerror="alert(1)"> [S]', b: "", rb: "Paroo [S]", a: "<b>x</b>", s: "T", o: 1, st: "GOVERNMENT", sn: "tele-law.in", su: "javascript:alert(1)" }, cdd);
ck("net-praktik (CSC कार्ड): HTML सुरक्षित, [ ] छपाई में ( ), 'प्रखंड-मिलान बाक़ी', Official, कड़ी ज़िले की जगह पर, javascript: कड़ी नहीं",
  ce.indexOf("<img") < 0 && ce.indexOf("<b>x") < 0 && ce.indexOf("[") < 0 && ce.indexOf("(S)") > -1 && ce.indexOf(IDX.ui.hi.unmapped) > -1 && ce.indexOf(IDX.ui.hi.official) > -1 &&
  ce.indexOf('href="/network/bihar/csc/patna/#br-csc-m00001"') > -1 && ce.indexOf("javascript:") < 0);
const cn0 = NP.card("hi", IDX, IC, { i: "BR-CSC-A00002", n: "B", b: "X", s: "T", st: "OTHER_PUBLIC" }, cdd), cn1 = NP.card("en", IDX, IC, { i: "BR-CSC-A00003", n: "C", b: "X", s: "T", st: "CSC_DIRECTORY", sn: "goodreturns.in", su: "https://www.goodreturns.in/x.html" }, cdd);
ck("net-praktik (ऑडिट CSC-02): कड़ी न हो तो साफ़ 'स्रोत की कड़ी नहीं'; हो तो 'View source' कड़ी", cn0.indexOf(IC.txt.hi.srcNone) > -1 && cn0.indexOf("<a href=\"http") < 0 &&
  cn1.indexOf('href="https://www.goodreturns.in/x.html"') > -1 && cn1.indexOf(IC.txt.en.srcLink) > -1 && cn1.indexOf(IC.txt.en.srcNone) < 0);
ck("net-praktik: Official का निशान सिर्फ़ o = 1 पर; छँटाई __u = सिर्फ़ ख़ाली प्रखंड", NP.card("en", IDX, IC, { i: "BR-CSC-A00001", n: "A", b: "X", s: "T" }, cdd).indexOf("Official") < 0 &&
  NP.filter([{ b: "" }, { b: "X" }], { b: "__u" }).length === 1 && NP.filter([{ b: "" }, { b: "X" }], { b: "X" }).length === 1);
ck("English कार्ड: /en/ पता, English निशान", NP.card("en", IDX, IDX.sectors[0], kh[0]).indexOf('href="/en/network/firm/') > -1 && !DEV.test(NP.card("en", IDX, IDX.sectors[0], kh[0])));
let jsdom = null; for (const t of [process.env.ACS_JSDOM, "jsdom", path.join(ROOT, "node_modules/jsdom")].filter(Boolean)) { try { jsdom = require(t); break; } catch (e) {} }
async function dom() {
  if (!jsdom) { skip++; console.log("ℹ️ jsdom नहीं मिला: पन्ने पर असली DOM वाली जाँच छूटी (ज़रूरी नहीं। repo-folder के अंदर npm install न करें: repo साफ़ रहना चाहिए)"); return; }
  for (const [hub, L] of [["hi/network.html", "hi"], ["en/network.html", "en"]]) {
    const html = rd(hub).replace(/<script[\s\S]*?<\/script>/g, "");
    const d = new jsdom.JSDOM(html, { url: "https://acslearn.com/" + hub, runScripts: "outside-only" });
    const w = d.window;
    w.XMLHttpRequest = function () { const x = this; x.open = (m, u) => { x.u = u; }; x.send = () => setTimeout(() => {
      const rel = x.u.replace(/^\//, "").replace(/\?.*$/, ""); x.readyState = 4; x.status = ex(rel) ? 200 : 404; x.responseText = x.status === 200 ? rd(rel) : ""; x.onreadystatechange(); }, 1); };
    w.eval(NPJS);
    await new Promise((r) => setTimeout(r, 30));
    const app = w.document.getElementById("npApp");
    ck(hub + " (DOM): क्षेत्र-बटन और ज़िले की सूची बनी", app.querySelectorAll(".np-chip").length === IDX.sectors.length && w.document.getElementById("npDist").options.length === 39);
    const sel = w.document.getElementById("npDist"); sel.value = "patna"; sel.onchange.call(sel);
    await new Promise((r) => setTimeout(r, 30));
    const cards = app.querySelectorAll(".nw-card"), pat = JSON.parse(rd("assets/network/bihar/tw/patna.json")).r;
    ck(hub + " (DOM): ज़िला चुनते ही 20 कार्ड, हर कार्ड पर जाँच-निशान, 'और दिखाएँ'", cards.length === Math.min(20, pat.length) && [].every.call(cards, (c) => c.querySelector(".nw-tag.tbv")) && !!w.document.getElementById("npMore"));
    w.document.getElementById("npMore").onclick(); await new Promise((r) => setTimeout(r, 5));
    ck(hub + " (DOM): 'और दिखाएँ' से अगले 20", app.querySelectorAll(".nw-card").length === Math.min(40, pat.length));
    if (L === "en") ck("en (DOM): सूची में देवनागरी शून्य", !DEV.test(app.textContent));
    /* v1.4: CSC चुनें, फिर पटना: CSC-कार्ड (सूचीबद्ध, ज़िले के पन्ने की जगह की कड़ी), disclosure; "प्रखंड-मिलान बाक़ी" की छँटाई */
    const ci = [].findIndex.call(app.querySelectorAll(".np-chip"), (c) => c.getAttribute("data-sec") === "csc");
    let chC = app.querySelectorAll(".np-chip"); chC[ci].onclick.call(chC[ci]); await new Promise((r) => setTimeout(r, 5));
    const selC = w.document.getElementById("npDist"); selC.value = "patna"; selC.onchange.call(selC); await new Promise((r) => setTimeout(r, 30));
    const cc = app.querySelectorAll(".nw-card"), patC = JSON.parse(rd("assets/network/bihar/csc/patna.json")).r;
    ck(hub + " (DOM): CSC चुनकर पटना: 20 कार्ड, हर पर 'सूचीबद्ध' और जाँच-निशान, कड़ी ज़िले के पन्ने की जगह पर, disclosure दिखा, कोई tel: नहीं",
      cc.length === Math.min(20, patC.length) && [].every.call(cc, (c) => c.textContent.indexOf(IDX.ui[L].listed) > -1 && c.querySelector(".nw-tag.tbv") &&
        /^\/(en\/)?network\/bihar\/csc\/patna\/#br-csc-[ma]\d{5}$/.test(c.querySelector("a.nw-name").getAttribute("href"))) &&
      app.textContent.indexOf(IC.txt[L].disc) > -1 && !app.querySelector('a[href^="tel:"]') && !w.document.getElementById("npCat"));
    const bsel = w.document.getElementById("npBlock"); bsel.value = "__u"; bsel.onchange.call(bsel); await new Promise((r) => setTimeout(r, 5));
    const nU = patC.filter((r) => !r.b).length;
    ck(hub + " (DOM): प्रखंड 'प्रखंड-मिलान बाक़ी' चुनें तो सिर्फ़ वही (" + nU + ")", app.textContent.indexOf(IDX.ui[L].unmapped) > -1 &&
      app.querySelectorAll(".nw-card").length === Math.min(20, nU) && [].every.call(app.querySelectorAll(".nw-card"), (c) => c.textContent.indexOf(IDX.ui[L].unmapped) > -1));
    if (L === "en") ck("en (DOM): CSC सूची में देवनागरी शून्य", !DEV.test(app.textContent));
    const chips = app.querySelectorAll(".np-chip"), ii = [].findIndex.call(chips, (c) => c.getAttribute("data-sec") === "it"); chips[ii].onclick.call(chips[ii]); await new Promise((r) => setTimeout(r, 5));
    ck(hub + " (DOM): IT चुनें तो 'सर्वे जारी' और ख़ाली-सूची का संदेश (कोई नक़ली फ़र्म नहीं)", app.textContent.indexOf(IDX.empty[L]) > -1 && app.querySelectorAll(".nw-card").length === 0);
    w.close();
  }
}

/* ── 6. net-sudhar.js ── */
const SU = rd("assets/net-sudhar.js");
ck("net-sudhar.js: server का submitContactMessage, App Check, Firebase 10.12.0 (संपर्क-पन्ने वाला)", /"submitContactMessage"/.test(SU) && /ReCaptchaEnterpriseProvider\(AC_KEY\)/.test(SU) && (SU.match(/firebasejs\/10\.12\.0\//g) || []).length === 3 && rd("contact/hi/index.html").indexOf("firebasejs/10.12.0/") > -1);
ck("net-sudhar.js: संदेश [NET-SUDHAR] से, 1000 अक्षर तक, नाम 80 तक, मोबाइल 10 अंक, दिखाने से पहले esc()", /"\[NET-SUDHAR\] "/.test(SU) && /\.slice\(0, 1000\)/.test(SU) && /name\.length > 80/.test(SU) && /\/\^\[0-9\]\{10\}\$\//.test(SU) && /innerHTML = '<div class="' \+ cls \+ '">' \+ esc\(txt\)/.test(SU));
ck("फ़र्म-पन्ने: appcheck-config.js और net-sudhar.js (छाप सही)", rd("network/firm/br-khg-0003.html").indexOf('<script type="module" src="/assets/net-sudhar.js?v=' + vOf("assets/net-sudhar.js") + '"></script>') > -1 && rd("en/network/firm/br-khg-0003.html").indexOf('src="/assets/appcheck-config.js"') > -1);

/* ── 7. importer: अस्थायी नक़ली CSV (repo में कभी नहीं) ── */
const I = require("./import_network.js");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "acs-net-")), H = Object.keys(BATCHES.TEMPLATE_HELP);
const row = (o) => H.map((h) => (o[h] === undefined ? "" : '"' + String(o[h]).replace(/"/g, '""') + '"')).join(",");
const base = { Sector_ID: "IT", State: "Bihar", District: "Khagaria", Block: "Khagaria", Firm_Name: "Test", Primary_Category: "IT-01", Source_URL: "https://www.justdial.com/x", Verification_Status: "To Be Verified" };
const mk = (o) => Object.assign({}, base, o);
const rows = [
  mk({ Record_ID: "BR-IT-KHG-0001", Firm_Name: "A", Phone: "+91 98765 43210", Secondary_Categories: "IT-02; IT-99", Practical_Skill_Tags: "Laptop Repair; Jadu", Business_Type: "Independent Shop", Email: "x@y.in" }),
  mk({ Record_ID: "BR-IT-KHG-0001", Firm_Name: "A2" }), mk({ Record_ID: "" }), mk({ Record_ID: "BR-IT-PAT-0001" }), mk({ Record_ID: "BR-IT-KHG-0009", State: "Assam" }),
  mk({ Record_ID: "BR-IT-KHG-0008", Verification_Status: "Maybe" }), mk({ Record_ID: "BR-IT-KHG-0002", District: "Gotham" }), mk({ Record_ID: "BR-IT-KHG-0003", Primary_Category: "IT-77" }),
  mk({ Record_ID: "BR-IT-KHG-0010", Block: "" }),
  mk({ Record_ID: "BR-IT-KHG-0004", Firm_Name: "B", PIN: "12345", Phone: "12345", Website: "not a url", Source_URL: "" }),
  mk({ Record_ID: "BR-IT-KHG-0005", Firm_Name: "C", Verification_Status: "Verified" }),
  mk({ Record_ID: "BR-IT-KHG-0006", Firm_Name: "D", Verification_Status: "Verified", Evidence_Ref: "RM-07", Verification_Date: "2026-11-20" }),
  mk({ Record_ID: "BR-IT-KHG-0007", Firm_Name: "E", Verification_Status: "Closed" }),
  mk({ Record_ID: "BR-IT-KHG-0011", Firm_Name: "F", Phone: "9123456780" }), mk({ Record_ID: "BR-IT-KHG-0012", Firm_Name: "G", Phone: "9123456780" }),
  mk({ Record_ID: "BR-IT-KHG-0013", Firm_Name: "H", Phone: "9123456780" }), mk({ Record_ID: "BR-IT-KHG-0014", Firm_Name: "J", Phone: "9123456780" }),
  /* v1.1: निजी/अनुमति-रहित data (N1-P0-01) */
  mk({ Record_ID: "BR-IT-KHG-0020", Firm_Name: "K", Sector_Data_JSON: '{ "Email": "private@example.org", "Notes": "secret" }' }),
  mk({ Record_ID: "BR-IT-KHG-0021", Firm_Name: "L", Sector_Data_JSON: '{"repairBench": {"owner": "x"}}' }),
  mk({ Record_ID: "BR-IT-KHG-0022", Firm_Name: "M", Sector_Data_JSON: "not json" }),
  mk({ Record_ID: "BR-IT-KHG-0023", Firm_Name: "Ram Repair private2@example.org" }),
  mk({ Record_ID: "BR-IT-KHG-0024", Firm_Name: "N", Address: "Main Road, call 98765 01234" }),
  mk({ Record_ID: "BR-IT-KHG-0025", Firm_Name: "O", Source_Name: "Owner mobile 9123412345" })
];
fs.writeFileSync(path.join(tmp, "it.csv"), "﻿" + H.join(",") + "\n" + rows.map(row).join("\n") + "\n");
const T = I.run({ batchId: "TEST-IT", sector: "it", state: "bihar", importedOn: "2026-11-22", template: true }, path.join(tmp, "it.csv"));
const byId = {}; T.recs.forEach((r) => { byId[r.id] = r; });
ck("importer: 5 रोक (ख़ाली ID, दोहराया ID, ज़िला-कूट बेमेल, दूसरा राज्य, अनजान स्थिति)", T.rep.reject.length === 5, T.rep.reject);
ck("importer: 3 रोककर रखे (अनजान ज़िला, अनजान श्रेणी, प्रखंड ख़ाली) : प्रकाशित नहीं", ["0002", "0003", "0010"].every((n) => !byId["BR-IT-KHG-" + n]) &&
  T.rep.hold.filter((h) => /0002|0003|0010/.test(h)).length === 3, T.rep.hold);
ck("importer (N1-P0-01): निजी Sector_Data_JSON {Email, Notes}, नेस्टेड मान, ग़लत JSON = रोककर रखे", ["0020", "0021", "0022"].every((n) => !byId["BR-IT-KHG-" + n]) &&
  T.rep.hold.some((h) => /0020.*अनुमति-रहित कुंजी: Email/.test(h)) && T.rep.hold.some((h) => /0021.*अनुमति-रहित कुंजी: repairBench/.test(h)) && T.rep.hold.some((h) => /0022.*पढ़ा नहीं/.test(h)), T.rep.hold);
ck("importer (N1-P0-01): नाम में email, पते में मोबाइल, स्रोत-नाम में मोबाइल = रोककर रखे", ["0023", "0024", "0025"].every((n) => !byId["BR-IT-KHG-" + n]) &&
  T.rep.hold.some((h) => /0023.*Firm_Name: email/.test(h)) && T.rep.hold.some((h) => /0024.*Address: फ़ोन/.test(h)) && T.rep.hold.some((h) => /0025.*Source_Name \(किसी स्रोत का\)/.test(h)), T.rep.hold);
const secretVals = ["private@example.org", "secret", "private2@example.org", "98765 01234", "9123412345", "owner"];
const rtext = I.reportText("TEST-IT", path.join(tmp, "it.csv"), T);
ck("importer (N1-P0-01): निजी मान न सार्वजनिक JSON में, न जाँच-रिपोर्ट में", secretVals.every((v) => T.json.indexOf(v) < 0 && rtext.indexOf(v) < 0), secretVals.filter((v) => T.json.indexOf(v) > -1 || rtext.indexOf(v) > -1));
ck("importer: कुल 9 रोककर रखे", T.rep.hold.length === 9, T.rep.hold.length);
ck("importer: बंद (Closed) सार्वजनिक सूची में नहीं, पर रिपोर्ट में", !byId["BR-IT-KHG-0007"] && T.rep.hidden.length === 1);
ck("importer (N1-P0-02): Excel का \"Verified\" कभी नहीं माना, Evidence_Ref + तारीख़ भरी हो तब भी = जाँच बाक़ी + सूचना",
  ["0005", "0006"].every((n) => byId["BR-IT-KHG-" + n].verificationStatus === "TO_BE_VERIFIED" && !byId["BR-IT-KHG-" + n].verificationDate && !byId["BR-IT-KHG-" + n].lastRMCheck) &&
  T.rep.flag.some((f) => /0006.*RM-सत्यापन रजिस्टर.*फिर भी/.test(f)) && T.recs.every((r) => r.verificationStatus === "TO_BE_VERIFIED"));
/* TW साँचा: vehicleType सिर्फ़ TWO_WHEELER; और रजिस्टर भरा हो पर मिलान-code न हो तो importer रुके */
const tb = { Sector_ID: "TW", State: "Bihar", District: "Khagaria", Block: "Khagaria", Firm_Name: "P", Primary_Category: "TW-06", Source_URL: "https://www.bikedekho.com/x" };
fs.writeFileSync(path.join(tmp, "tw.csv"), H.join(",") + "\n" + [Object.assign({}, tb, { Record_ID: "BR-KHG-9001", Sector_Data_JSON: '{"vehicleType":"TWO_WHEELER"}' }),
  Object.assign({}, tb, { Record_ID: "BR-KHG-9002", Firm_Name: "Q", Sector_Data_JSON: '{"vehicleType":"CAR"}' }),
  Object.assign({}, tb, { Record_ID: "BR-KHG-9003", Firm_Name: "R", Verification_Status: "Verified", Evidence_Ref: "RM-1", Verification_Date: "2026-11-20" }),
  Object.assign({}, tb, { Record_ID: "BR-KHG-9004", Firm_Name: "S", Sector_Data_JSON: '{"vehicleType":{"owner":"x"}}' })].map(row).join("\n") + "\n");
const T2 = I.run({ batchId: "TEST-TW", sector: "tw", state: "bihar", importedOn: "2026-11-22", template: true }, path.join(tmp, "tw.csv"));
ck("importer: TW में vehicleType = TWO_WHEELER चलता है; CAR और नेस्टेड मान = रोककर रखे; Excel का Verified = जाँच बाक़ी",
  T2.recs.some((r) => r.id === "BR-KHG-9001" && r.sectorData.vehicleType === "TWO_WHEELER") && !T2.recs.some((r) => r.id === "BR-KHG-9002" || r.id === "BR-KHG-9004") &&
  T2.rep.hold.some((h) => /9002.*vehicleType/.test(h)) && T2.rep.hold.some((h) => /9004.*नेस्टेड/.test(h)) && T2.recs.some((r) => r.id === "BR-KHG-9003" && r.verificationStatus === "TO_BE_VERIFIED") &&
  T2.json.indexOf('"owner"') < 0);
TX.VERIFY.registry = "fake-registry";
let threw = ""; try { I.run({ batchId: "TEST-TW", sector: "tw", state: "bihar", importedOn: "2026-11-22", template: true }, path.join(tmp, "tw.csv")); } catch (e) { threw = e.message; }
TX.VERIFY.registry = null;
ck("importer (N1-P0-02): रजिस्टर भरा हो पर मिलान-code न हो, तो \"Verified\" पर importer रुकता है (चुपचाप सत्यापित नहीं)", /N1-P0-02/.test(threw), threw);
const fake = JSON.parse(JSON.stringify(R[0])); fake.verificationStatus = "VERIFIED"; fake.verificationDate = "2026-11-20";
const fake2 = JSON.parse(JSON.stringify(R[0])); fake2.sectorData.Email = "a@b.in";
const fake3 = JSON.parse(JSON.stringify(R[0])); fake3.rmOwner = "x";
ck("publicProblems(): नक़ली \"सत्यापित\", sectorData में email, अनजान खाना rmOwner : तीनों पकड़े", N.publicProblems(fake).length > 0 && N.publicProblems(fake2).length > 0 && N.publicProblems(fake3).length > 0);
ck("importer: ग़लत PIN/फ़ोन/वेबसाइट छोड़े (गढ़े नहीं), स्रोत-पता न हो तो सूचना", byId["BR-IT-KHG-0004"].pin === null && byId["BR-IT-KHG-0004"].phone.length === 0 && byId["BR-IT-KHG-0004"].website === null &&
  T.rep.flag.some((f) => /source-quality/.test(f)));
ck("importer: +91 हटा, अनजान दूसरी श्रेणी/हुनर छोड़े, व्यवसाय-प्रकार सूची से, email सार्वजनिक में नहीं",
  byId["BR-IT-KHG-0001"].phone[0] === "9876543210" && byId["BR-IT-KHG-0001"].secondaryCategories.join() === "IT-02" && byId["BR-IT-KHG-0001"].practicalSkillTags.join() === "laptop-repair" &&
  byId["BR-IT-KHG-0001"].businessType === "independent-shop" && T.json.indexOf("x@y.in") < 0);
ck("importer: 4 फ़र्मों पर एक फ़ोन = साझा नंबर (दोहराव नहीं माना, किसी का अपना फ़ोन नहीं)", ["0011", "0012", "0013", "0014"].every((n) => byId["BR-IT-KHG-" + n].phone.length === 0 && byId["BR-IT-KHG-" + n].sharedPhone.places === 4));
/* ── v1.2: N1-P0-03 (रिपोर्ट में मूल मान नहीं) और N1-P0-04 (हर सार्वजनिक पाठ का पहरा) ── */
const S = (n, extra) => "SENT" + n + (extra || "");
const bad3 = [
  /* ऑडिटर का मामला: ग़लत ज़िला + स्रोत-जाँच तारीख़ की जगह निजी email */
  mk({ Record_ID: "BR-IT-KHG-0040", Firm_Name: S(1), District: S(2) + " Gotham", Source_Checked_Date: "sent3private@example.org", Email: "sent4@example.org", Notes: S(5), Confidence: S(6) }),
  mk({ Record_ID: "sent7@example.org", Firm_Name: S(8) }),                                                   /* ग़लत रूप का ID (email) */
  mk({ Record_ID: "BR-IT-KHG-0041", Sector_ID: S(9) }), mk({ Record_ID: "BR-IT-KHG-0042", State: S(10) + " 9876512345" }),
  mk({ Record_ID: "BR-IT-KHG-0043", Verification_Status: S(11) + "@example.org" }), mk({ Record_ID: "BR-IT-KHG-0044", Primary_Category: S(12) }),
  mk({ Record_ID: "BR-IT-KHG-0045", Firm_Name: "T", Secondary_Categories: S(13) + "; 9123498765", Practical_Skill_Tags: S(14), Business_Type: S(15),
       PIN: S(16) + "@x.in", Phone: S(17) + " 12", Website: S(18) + "@x.in", Source_Type: S(19), Source2_URL: "notaurl" + S(20), Source2_Name: "x",
       Source2_Checked_Date: S(21) + "@example.org", Parent_Firm_ID: S(22) + "@example.org", Latitude: S(23), Longitude: "1" }),
  mk({ Record_ID: "BR-IT-KHG-0046", Firm_Name: "U", Sector_Data_JSON: '{"sent24@example.org": "9876598765"}' }),
  /* N1-P0-04: ब्रांड/इलाक़ा/शाखा/स्रोत-नाम में फ़ोन, email, भीतरी पाठ */
  mk({ Record_ID: "BR-IT-KHG-0047", Firm_Name: "V", Brand_OEM: "Dell / private 9876543210" }),
  mk({ Record_ID: "BR-IT-KHG-0048", Firm_Name: "W", Brand_OEM: "HP / sent25@example.org" }),
  mk({ Record_ID: "BR-IT-KHG-0049", Firm_Name: "X", Locality: "Aadhaar: 1234 5678 9012" }),
  mk({ Record_ID: "BR-IT-KHG-0050", Firm_Name: "Y", Branch_Name: "Notes: owner home" }),
  mk({ Record_ID: "BR-IT-KHG-0051", Firm_Name: "Z", Source_Name: "Confidence=A" })
];
fs.writeFileSync(path.join(tmp, "it3.csv"), H.join(",") + "\n" + bad3.map(row).join("\n") + "\n");
const T3 = I.run({ batchId: "TEST-IT3", sector: "it", state: "bihar", importedOn: "2026-11-22", template: true }, path.join(tmp, "it3.csv"));
let r3 = "", r3err = ""; try { r3 = I.reportText("TEST-IT3", path.join(tmp, "it3.csv"), T3); } catch (e) { r3err = e.message; }
ck("importer (N1-P0-03): ऑडिटर का मामला + हर खाने में पहचान-चिह्न: जाँच-रिपोर्ट में एक भी चिह्न/email/10+ अंक नहीं", r3 && !r3err && !/sent\d|SENT\d/i.test(r3) && !N.EMAIL_RE.test(r3) && !N.LONG_DIGITS.test(r3),
  r3err || (r3.match(/.*(sent\d|SENT\d).*/i) || [""])[0]);
ck("importer (N1-P0-03): रिपोर्ट में पंक्ति, कॉलम-नाम और समस्या: District, Source_Checked_Date, ग़लत-रूप ID बिना ID के",
  /पंक्ति 2 \(BR-IT-KHG-0040\): District: geo\.js की ज़िला-सूची में नहीं/.test(r3) && /पंक्ति 3: Record_ID: रूप ग़लत/.test(r3) && /Source2_Checked_Date: तारीख़ ग़लत/.test(r3) && /Parent_Firm_ID: रूप ग़लत/.test(r3) && /PIN: ग़लत/.test(r3), r3.slice(0, 600));
ck("importer (N1-P0-04): ब्रांड में फ़ोन/email, इलाक़े में आधार, शाखा में 'Notes:', स्रोत-नाम में 'Confidence=' = रोककर रखे",
  ["0047", "0048", "0049", "0050", "0051"].every((n) => !T3.recs.some((r) => r.id === "BR-IT-KHG-" + n)) &&
  /0047\): Brand_OEM: फ़ोन/.test(r3) && /0048\): Brand_OEM: email/.test(r3) && /0049\): Locality: फ़ोन\/लंबा अंक-समूह.*Locality: भीतरी/.test(r3) && /0050\): Branch_Name: भीतरी/.test(r3) && /0051\): Source_Name \(किसी स्रोत का\): भीतरी/.test(r3), r3);
ck("importer (N1-P0-03/04): कोई पहचान-चिह्न/निजी मान सार्वजनिक JSON में नहीं; ग़लत खाने छोड़कर 0045 प्रकाशित, उसमें गढ़ा कुछ नहीं",
  !/sent\d|SENT\d|9876543210|1234 5678 9012|Notes:|Confidence=/i.test(T3.json) && T3.recs.some((r) => r.id === "BR-IT-KHG-0045" && r.pin === null && r.phone.length === 0 && r.website === null && r.parentFirmId === null && r.latitude === null && r.secondaryCategories.length === 0 && r.practicalSkillTags.length === 0 && r.businessType === null));
let guardErr = ""; try { I.reportText("X", "x.csv", { rep: { reject: ["पंक्ति 2: leak@example.org"], hold: [], flag: [], hidden: [], dup: [], stop: [], coverage: T3.rep.coverage }, source: "x" }); } catch (e) { guardErr = e.message; }
ck("importer (N1-P0-03): रिपोर्ट का आख़िरी पहरा: email दिखे तो रिपोर्ट नहीं बनती (fail-closed)", /N1-P0-03/.test(guardErr), guardErr);
const pb = JSON.parse(JSON.stringify(R[0])); pb.brandOem = ["private 9876543210"];
const pb2 = JSON.parse(JSON.stringify(R[0])); pb2.secondaryCategories = ["TW-01 +91 98765 43210"];
const pb3 = JSON.parse(JSON.stringify(R[0])); pb3.sources[0].sourceType = "Notes: secret";
const pb4 = JSON.parse(JSON.stringify(R[0])); pb4.practicalSkillTags = ["x@y.in"];
ck("publicProblems() (N1-P0-04): ऑडिटर का brandOem [\"private 9876543210\"], दूसरी श्रेणी में +91 नंबर, स्रोत-प्रकार में भीतरी पाठ, हुनर में email : चारों पकड़े, संदेश में मान नहीं",
  [pb, pb2, pb3, pb4].every((x) => { const pp = N.publicProblems(x); return pp.length && !/9876|secret|x@y/.test(pp.join(" ")); }) && N.publicProblems(pb).join() === "brandOem: फ़ोन/लंबा अंक-समूह (10+ अंक)");
ck("publicProblems(): सिर्फ़ ज़रूरी खानों को अंकों की छूट (फ़ोन, साझा नंबर, PIN, तारीख़ें, वेबसाइट/स्रोत-कड़ी); 857 असली रिकॉर्ड पर 0", R.every((r) => N.publicProblems(r).length === 0));
ck("importer: phones() 91 से शुरू 10-अंकी मोबाइल नहीं काटता", I.phones("9123456789").out[0] === "9123456789" && I.phones("919123456789").out[0] === "9123456789" && I.phones("06244 222333").out[0] === "06244222333");
/* v1.4: CSC जैसी batch (consts, sectorDataCols, publishCol, unmappedBlock, notAddress, idRegex, expect.rows) — नक़ली CSV */
const CH = ["record_id", "state", "district", "canonical_block", "raw_block", "vle_name", "pin", "address", "phone", "email", "source_url", "official_csc_label_allowed", "acs_status", "portal_publish", "source_layer"];
const crow = (o) => CH.map((h) => (o[h] === undefined ? "" : '"' + String(o[h]).replace(/"/g, '""') + '"')).join(",");
const cb = { state: "Bihar", district: "KHAGARIA", canonical_block: "Gogri", raw_block: "Gogri", vle_name: "Ram Kumar", source_url: "https://tele-law.in/x?page=1", official_csc_label_allowed: "YES", acs_status: "To Be Verified", portal_publish: "YES", source_layer: "Pass2 Gap Closure" };
const cm = (o) => Object.assign({}, cb, o);
const crows = [
  cm({ record_id: "BR-CSC-M00001", phone: "9876543210", email: "vle@example.org" }),                        /* प्रकाशित; फ़ोन/email कभी नहीं */
  cm({ record_id: "BR-CSC-M00002", official_csc_label_allowed: "MAYBE" }),                                   /* अनजान हाँ/ना = रोककर रखा */
  cm({ record_id: "BR-CSC-M00003", portal_publish: "NO" }),                                                  /* सार्वजनिक नहीं */
  cm({ record_id: "BR-CSC-A00004", canonical_block: "", raw_block: "Gogri Jamalpur", official_csc_label_allowed: "NO", source_url: "https://www.goodreturns.in/csc-x.html" }),   /* प्रखंड-मिलान बाक़ी */
  cm({ record_id: "BR-CSC-A00005", canonical_block: "", raw_block: "" }),                                   /* प्रखंड ही नहीं = रोककर रखा */
  cm({ record_id: "BR-CSC-A00006", address: "Source row/rank 3 on block CSC directory." }),                  /* पता = शोध-टिप्पणी, छपता नहीं */
  cm({ record_id: "BR-CSC-A00007", vle_name: "36402820015" }),                                              /* नाम में 10+ अंक = रोककर रखा */
  cm({ record_id: "BR-CSC-KHG-0008" }),                                                                     /* ID-रूप ग़लत = रोक */
  cm({ record_id: "BR-CSC-M00009", raw_block: "Gogri [S]", address: "Ward 4, Gogri" }),                      /* स्रोत की वर्तनी data में जस-की-तस */
  cm({ record_id: "BR-CSC-M00010", address: "HUSEPUR, Panchayat/Village-null, Sub District-Gogri, District-, State-Bihar, Pin-null" }),   /* v1.5: null/ख़ाली टुकड़े हटें */
  cm({ record_id: "BR-CSC-A00011", address: "https://www.goodreturns.in/csc-in-gogri-c1.html", source_url: "71" }),                     /* v1.5: कॉलम खिसका */
  cm({ record_id: "BR-CSC-A00012", address: "null, Panchayat/Village-, District-null", source_url: "72" })                             /* v1.5: कुछ नहीं बचा; स्रोत ही नहीं */
];
fs.writeFileSync(path.join(tmp, "csc.csv"), CH.join(",") + "\n" + crows.map(crow).join("\n") + "\n");
const CB = Object.assign({}, B2, { batchId: "TEST-CSC", expect: { rows: 12 } });
const TC = I.run(CB, path.join(tmp, "csc.csv")), byC = {}; TC.recs.forEach((r) => { byC[r.id] = r; });
const rC = I.reportText("TEST-CSC", path.join(tmp, "csc.csv"), TC);
ck("importer (CSC): प्रकाशित 7 (M00001, A00004, A00006, M00009, M00010, A00011, A00012); रोक 1 (ID-रूप); रोककर रखे 3 (अनजान हाँ/ना, प्रखंड नहीं, नाम में अंक); सार्वजनिक नहीं 1 (portal_publish NO)",
  JSON.stringify(Object.keys(byC).sort()) === JSON.stringify(["BR-CSC-A00004", "BR-CSC-A00006", "BR-CSC-A00011", "BR-CSC-A00012", "BR-CSC-M00001", "BR-CSC-M00009", "BR-CSC-M00010"]) && TC.rep.reject.length === 1 && TC.rep.hold.length === 3 && TC.rep.hidden.length === 1,
  JSON.stringify({ p: Object.keys(byC), rj: TC.rep.reject, h: TC.rep.hold, hd: TC.rep.hidden }));
ck("importer (CSC): Official = YES वाले पर, NO वाले पर नहीं; फ़ोन/email/source_layer सार्वजनिक JSON और रिपोर्ट में नहीं",
  byC["BR-CSC-M00001"].sectorData.officialCsc === true && byC["BR-CSC-A00004"].sectorData.officialCsc === false && byC["BR-CSC-M00001"].phone.length === 0 &&
  ["9876543210", "vle@example.org", "Gap Closure", "36402820015"].every((v) => TC.json.indexOf(v) < 0 && rC.indexOf(v) < 0));
ck("importer (CSC): प्रखंड-मिलान बाक़ी = block \"\" + स्रोत का प्रखंड; शोध-टिप्पणी पता नहीं बनी; [ ] data में जस-का-तस; गिनती-सूचनाएँ",
  byC["BR-CSC-A00004"].block === "" && byC["BR-CSC-A00004"].sectorData.rawBlock === "Gogri Jamalpur" && byC["BR-CSC-A00006"].address === null &&
  byC["BR-CSC-M00009"].sectorData.rawBlock === "Gogri [S]" && TC.rep.note[Object.keys(TC.rep.note).find((k) => /शोध की टिप्पणी/.test(k))] === 1);
ck("importer (ऑडिट CSC-01/02): null/ख़ाली टुकड़े हटे, बाक़ी पता अक्षरशः; कुछ न बचे तो पता ख़ाली; कॉलम खिसका = पते का URL स्रोत, पता ख़ाली; स्रोत ही न हो तो कड़ी नहीं (गढ़ी नहीं)",
  byC["BR-CSC-M00010"].address === "HUSEPUR, Sub District-Gogri, State-Bihar" && byC["BR-CSC-A00012"].address === null && byC["BR-CSC-A00012"].sources.every((x) => !x.sourceUrl) &&
  byC["BR-CSC-A00011"].address === null && byC["BR-CSC-A00011"].sources[0].sourceUrl === "https://www.goodreturns.in/csc-in-gogri-c1.html" && byC["BR-CSC-A00011"].sources[0].sourceType === "CSC_DIRECTORY" &&
  byC["BR-CSC-A00011"].sources.length === 1 && Object.keys(TC.rep.note).some((k) => /कॉलम खिसका/.test(k)) && Object.keys(TC.rep.note).some((k) => /कुछ नहीं बचा/.test(k)),
  JSON.stringify({ m10: byC["BR-CSC-M00010"].address, a11: byC["BR-CSC-A00011"].sources, note: TC.rep.note }));
const TC2 = I.run(Object.assign({}, CB, { expect: { rows: 13 } }), path.join(tmp, "csc.csv"));
ck("importer (CSC): स्रोत की पंक्तियाँ अपेक्षा से अलग = पूरा import रुका (expect.rows)", TC2.rep.stop.some((m) => /स्रोत की पंक्तियाँ 12 ≠ अपेक्षित 13/.test(m)));
fs.rmSync(tmp, { recursive: true, force: true });

/* ── 8. sitemap, 9. Excel-साँचा ── */
const sm = rd("sitemap-network.xml"), locs = new Set([...sm.matchAll(/<loc>https:\/\/acslearn\.com([^<]+)<\/loc>/g)].map((m) => m[1]));
ck("sitemap-network.xml = सब 1870 पन्ने; पर्चियाँ नहीं; sitemap.xml में खंड दर्ज", locs.size === 1870 && urls.every((u) => locs.has(u)) && slips.every((u) => !locs.has(u)) && rd("sitemap.xml").indexOf("/sitemap-network.xml</loc>") > -1);
const X = require("./lib_xlsx.js"), TPL = "generator/data/network/ACS-Network-Import-Template.xlsx";
const tr = X.readSheet(path.join(ROOT, TPL), "Firms");
ck("Excel-साँचा: 43 कॉलम batches.js के क्रम में, कोई नमूना-पंक्ति नहीं", tr.length === 1 && JSON.stringify(tr[0]) === JSON.stringify(H));

dom().then(() => {
  console.log("जाँचें: पास " + pass + " · फेल " + fail + (skip ? " · छूटी " + skip : ""));
  if (fail) { console.log("फेल जाँचें (ऊपर पूरा ब्योरा):"); FAILED.forEach((n, i) => console.log("   " + (i + 1) + ". ❌ " + n)); console.log("⛔ dev_network_check: फेल"); process.exit(1); }
  console.log("🏁 dev_network_check v1.5 : नेटवर्क पास");
});
