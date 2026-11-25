/* ============================================================
   import_network.js v1.4 (परत-4, 25-Nov-2026, खेप N-3.1: ChatGPT ऑडिट CSC-01/02 के लक्षित सुधार, batches.js के दो नए खाने;
     पुराने batch पर असर शून्य: addressDropParts (पते के कॉमा-टुकड़े, जो ख़ाली/null हैं, जैसे "District-null", "Panchayat/Village-",
     छपते नहीं; बाक़ी पता अक्षरशः) · addressUrlAsSource (स्रोत-पंक्ति में कॉलम खिसका: स्रोत-खाने में URL नहीं, पर पते के खाने में
     सिर्फ़ एक URL = वही स्रोत-कड़ी; पता नहीं छपता; रिपोर्ट में गिनती)। स्रोत-फ़ाइल नहीं बदलती।
   v1.3 (25-Nov-2026, खेप N-3: CSC सूची, batches.js के नए खाने से; पुराने batch पर असर शून्य:
     consts (स्रोत में कॉलम न हो तो तय मान, जैसे एक ही श्रेणी) · sectorDataCols (स्रोत के कॉलम → SECTOR_DATA की अनुमत कुंजी,
     map से हाँ/ना; अनजान मान = रोककर रखा) · publishCol (portal_publish YES न हो = सार्वजनिक सूची में नहीं) · unmappedBlock
     (प्रखंड ख़ाली पर स्रोत का प्रखंड हो = "प्रखंड-मिलान बाक़ी", block "") · notAddress (पते के खाने में शोध-टिप्पणी = पता नहीं
     छपता) · idRegex (सेक्टर का अपना ID-रूप, ज़िला-कूट के बिना) · expect.rows (स्रोत की पंक्तियाँ; बेमेल = पूरा import रुका) ·
     बार-बार की सूचनाएँ पंक्ति-दर-पंक्ति नहीं, गिनती में (rep.note)।
   v1.2 (22-Nov-2026, खेप N-1; v1.2 = ऑडिट N1-P0-03: जाँच-रिपोर्ट में Excel का कोई मान नहीं, सिर्फ़
   पंक्ति-नंबर, कॉलम-नाम (batches.js से) और समस्या का प्रकार; Record_ID भी तभी, जब उसका रूप सही हो; दोहराव-संकेत में फ़ोन/वेबसाइट
   नहीं, सिर्फ़ IDs; अनजान domain सिर्फ़ गिनती (सूची --internal-out में); रिपोर्ट में email या 10+ अंक दिखे तो रुकता है।
   N1-P0-04: पहरा अब हर सार्वजनिक पाठ (ब्रांड समेत) पर, lib_network v1.2। v1.1 = ऑडिट N1-P0-01: Sector_Data_JSON सिर्फ़ taxonomy.SECTOR_DATA की
   अनुमत कुंजियों से, बाक़ी = रोककर रखा; हर रिकॉर्ड पर lib_network.publicProblems() का पहरा (email/फ़ोन-रिसाव = रोककर रखा)।
   N1-P0-02: "Verified" सिर्फ़ server के RM-सत्यापन रजिस्टर से; वह अभी नहीं बना (taxonomy.VERIFY.registry = null), इसलिए
   Excel/CSV का हर "Verified" = "जाँच बाक़ी" + सूचना, Evidence_Ref और तारीख़ भरी हो तब भी) : नेटवर्क-सूची का importer (Excel/CSV → सार्वजनिक data)
   Founder के brief (22-Nov-2026): पोर्टल धारा 27-31 + IT-brief धारा 8-15, 28-32। एक ही importer से Two-Wheeler, IT
   और आगे के सब (24 तक) सेक्टर। स्रोत = Excel (.xlsx, generator/lib_xlsx.js से) या CSV (UTF-8)।
   batch का ब्योरा = generator/data/network/batches.js । नतीजा = generator/data/network/batches/<BATCH>.json
   (सिर्फ़ प्रकाशित रिकॉर्ड, सिर्फ़ सार्वजनिक खाने)।

   तीन स्तर (IT-brief धारा 29):
     ⛔ रोक (रिकॉर्ड नहीं आता) : Record_ID ख़ाली या दोहराया · ID का रूप/सेक्टर/ज़िला-कूट बेमेल · राज्य ख़ाली/दूसरा ·
        ज़िला ख़ाली · फ़र्म का नाम ख़ाली · अनजान जाँच-स्थिति · Sector_ID बेमेल।
     ⏸ रोककर रखा (रिकॉर्ड प्रकाशित नहीं, रिपोर्ट में) : अनजान ज़िला · प्रखंड ख़ाली · अनजान श्रेणी।
     ℹ️ सूचना (रिकॉर्ड आता है, ग़लत खाना छोड़ा जाता है, कुछ गढ़ा नहीं जाता) : ग़लत फ़ोन/PIN/वेबसाइट/निर्देशांक/URL ·
        स्रोत-पता ही नहीं (source-quality exception) · अनजान हुनर-टैग/दूसरी श्रेणी/व्यवसाय-प्रकार · Excel में "Verified"
        (RM-रजिस्टर नहीं: तब "जाँच बाक़ी") · ख़ाली जाँच-स्थिति (तब "जाँच बाक़ी")।
     ⏸ (v1.1) और भी रोककर रखे: Sector_Data_JSON में अनुमति-रहित कुंजी/नेस्टेड मान/पढ़ा न जा सके · सार्वजनिक पाठ
        (नाम, पता, इलाक़ा, शाखा, स्रोत-नाम) में email या फ़ोन-नंबर जैसा अंक-समूह। रिपोर्ट में मान नहीं, सिर्फ़ खाने का नाम।
     पूरा import तभी रुकता है जब batches.js की "expect" गिनती न मिले (तब कुछ नहीं लिखा जाता)।
   "सत्यापित" कभी स्रोत की मज़बूती (Confidence) से नहीं, और कभी Excel के खाने (Evidence_Ref + तारीख़) से भी नहीं:
   सिर्फ़ server के अनुमोदित RM-सत्यापन रजिस्टर से (अभी नहीं बना = इस importer से "सत्यापित" असंभव)।
   NOT_FOUND / CLOSED / REJECTED / HIDDEN = सार्वजनिक सूची में नहीं (रिपोर्ट में गिनती)। कोई रिकॉर्ड मिटाया नहीं जाता:
   स्रोत-फ़ाइल व भीतरी फ़ाइल में सब रहता है।
   फ़ोन: 10 अंक (6-9 से शुरू) मोबाइल, या 0 से शुरू 11 अंक का landline (+91 वाले 12 अंक में ही देश-कूट हटता है)।
   साझा नंबर (IT-brief धारा 13): जो फ़ोन 3 से ज़्यादा रिकॉर्ड पर एक-सा हो, वह दोहराव नहीं माना जाता (chain/कंपनी का नंबर
   हो सकता है), पर किसी फ़र्म का "अपना" फ़ोन भी नहीं: sharedPhone में (कितनी जगहों पर), पन्ने पर साफ़ लिखकर।
   दोहराव की जाँच (सिर्फ़ रिपोर्ट, कुछ मिलाया नहीं जाता): पक्के संकेत = वही फ़ोन (2-3 रिकॉर्ड) · वही पूरा पता ·
   वही वेबसाइट-domain · वही नाम + वही इलाक़ा; संभावित = वही नाम + वही ज़िला। शाखाएँ अलग रिकॉर्ड (parentFirmId, branchName)।
   PIN: 6 अंक, राज्य की सीमा में (बिहार 800000-855999)। स्रोत-पता अक्षरशः। हर रिकॉर्ड पर batch-ID और import की तारीख़।

   चलाएँ:  node generator/import_network.js <BATCH-ID> <Excel/CSV फ़ाइल>
           ... --check                 (कुछ नहीं लिखता; data बासी हो तो FAIL)
           ... --report <फ़ाइल>         (जाँच-रिपोर्ट; इसमें भीतरी खाने नहीं)
           ... --internal-out <फ़ाइल>   (भीतरी खाने अलग फ़ाइल में: इसे repo में कभी न रखें)
           ... --out-dir <folder>      (परीक्षा के लिए दूसरी जगह लिखना)
   निकास-कोड: 0 = ठीक · 1 = रुका (कुछ नहीं लिखा) · 2 = फ़ाइल/आदेश ग़लत।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const X = require("./lib_xlsx.js");
const NW = require("./lib_network.js");
const TX = require("./data/network/taxonomy.js");
const { STATES } = require("./data/network/geo.js");
const BATCHES = require("./data/network/batches.js");
const OUTDIR = path.join(__dirname, "data", "network", "batches");

const PIN_RANGE = { bihar: [800000, 855999] };
const GEO_BOX = { lat: [6, 37.5], lng: [68, 97.5] };   /* भारत के बाहर का निर्देशांक = ग़लत */
const SHARED_MAX = 3;
const s = (v) => (v === null || v === undefined) ? "" : String(v).replace(/\s+/g, " ").trim();
const low = (v) => s(v).toLowerCase();
const norm = (v) => low(v).replace(/[^a-z0-9ऀ-ॿ]+/g, " ").trim();
const STATUS_TEXT = {
  "to be verified": "TO_BE_VERIFIED", "verified": "VERIFIED", "verified with correction": "VERIFIED_WITH_CORRECTION",
  "correction pending": "CORRECTION_PENDING", "identity review": "IDENTITY_REVIEW", "not found": "NOT_FOUND",
  "closed": "CLOSED", "rejected": "REJECTED", "hidden": "HIDDEN"
};
for (const k of Object.keys(TX.STATUS.internal)) STATUS_TEXT[k.toLowerCase()] = k;   /* कूट भी चलें (TO_BE_VERIFIED) */

/* ---------- CSV (UTF-8; "…" के भीतर , और नई पंक्ति चलती है) ---------- */
function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; continue; }
    if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows.map((r) => r.map((v) => (v === "" ? null : v)));
}
function readTable(file, sheet) {
  if (/\.csv$/i.test(file)) return parseCSV(fs.readFileSync(file, "utf8"));
  const names = X.sheetNames(file);
  if (sheet && names.indexOf(sheet) < 0) throw new Error("Excel में शीट \"" + sheet + "\" नहीं (हैं: " + names.join(", ") + ")");
  return X.readSheet(file, sheet || names[0]);
}

function domainOf(u) { return u.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[\/?#:]/)[0].toLowerCase(); }
function sourceTypeOf(dom) { for (const [k, v] of Object.entries(TX.SOURCE_TYPES)) if ((v.domains || []).indexOf(dom) > -1) return k; return null; }
function phones(raw) {
  const out = [], bad = [];
  for (const part of s(raw).split(/[,/;|]+/)) {
    let d = part.replace(/\D/g, "");
    if (!d) continue;
    if (d.length === 12 && d.slice(0, 2) === "91") d = d.slice(2);   /* +91: देश-कूट सिर्फ़ 12 अंकों पर हटे (91… से शुरू मोबाइल अछूता) */
    if (/^[6-9]\d{9}$/.test(d) || /^0\d{10}$/.test(d)) { if (out.indexOf(d) < 0) out.push(d); }
    else bad.push(part.trim());
  }
  return { out, bad };
}
const isUrl = (u) => /^https?:\/\/[^\s<>"']+\.[^\s<>"']+$/i.test(u);
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + "T00:00:00Z"));
function lookup(list, v) { const k = low(v); return (list || []).find((x) => low(x.id) === k || low(x.en) === k) || null; }
const splitList = (v) => s(v).split(/\s*[;,]\s*/).map((x) => x.trim()).filter(Boolean);

/* ---------- एक batch ---------- */
function run(cfg, file) {
  const SEC = TX.SECTORS[cfg.sector]; if (!SEC) throw new Error("taxonomy.js में सेक्टर नहीं: " + cfg.sector);
  const ST = STATES[cfg.state]; if (!ST) throw new Error("geo.js में राज्य नहीं: " + cfg.state);
  const COLS = cfg.template ? BATCHES.TEMPLATE_COLS : cfg.cols;
  const INTERNAL = cfg.template ? BATCHES.TEMPLATE_INTERNAL : (cfg.internalCols || []);
  const cn = (k) => COLS[k] || k;   /* रिपोर्ट में खाने का नाम = Excel का कॉलम-नाम (batches.js से, मान कभी नहीं) */
  const CATS = TX.CATEGORIES[cfg.sector] || [], typeCat = {};
  for (const c of CATS) for (const t of (c.types || [])) typeCat[t] = c.id;
  const SKILLS = TX.SKILL_TAGS[cfg.sector] || [], BTYPES = TX.BUSINESS_TYPES[cfg.sector] || null;
  const distByEn = {}; for (const d of ST.districts) distByEn[d.en.toLowerCase()] = d;
  const idRe = SEC.idRegex ? new RegExp("^" + SEC.idRegex.replace("{ST}", ST.idPrefix) + "$")   /* v1.3: ज़िला-कूट के बिना (CSC) */
    : new RegExp("^" + SEC.idPattern.replace("{ST}", ST.idPrefix).replace("{DC}", "([A-Z]{3})").replace("NNNN", "\\d{4}") + "$");
  const idHint = SEC.idRegex ? (SEC.idHint || SEC.idRegex).split("{ST}").join(ST.idPrefix) : SEC.idPattern.replace("{ST}", ST.idPrefix).replace("{DC}", "ज़िला-कूट");
  const CONSTS = cfg.consts || {};
  const NOTADDR = (cfg.notAddress || []).map((x) => new RegExp(x, "i"));
  const DROPPART = (cfg.addressDropParts || []).map((x) => new RegExp(x, "i"));   /* v1.4 */

  const rows = readTable(file, cfg.sheet);
  const hi = rows.findIndex((r) => (r || []).map(s).indexOf(COLS.id) > -1);
  if (hi < 0) throw new Error("शीट में कॉलम \"" + COLS.id + "\" वाली पंक्ति नहीं मिली");
  const head = rows[hi].map(s), col = {};
  for (const [k, name] of Object.entries(COLS)) { const j = head.indexOf(name); if (j > -1) col[k] = j; }
  const need = ["id", "district", "block", "name"].concat(cfg.template ? ["sectorCode", "state", "primary"] : []);
  for (const k of need) if (col[k] === undefined) throw new Error("शीट में ज़रूरी कॉलम नहीं: " + COLS[k]);
  const byType = SEC.typeMode === "map" && col.type !== undefined;
  const icol = {}; for (const name of INTERNAL) { const j = head.indexOf(name); if (j > -1) icol[name] = j; }
  /* v1.3: सेक्टर के अपने खाने और प्रकाशन का कॉलम (batches.js में नाम; न मिले तो import ही नहीं) */
  const SDC = cfg.sectorDataCols || {}, xcol = {};
  for (const name of Object.values(SDC).map((x) => x.col).concat(cfg.publishCol ? [cfg.publishCol.col] : [])) {
    const j = head.indexOf(name); if (j < 0) throw new Error("शीट में ज़रूरी कॉलम नहीं: " + name); xcol[name] = j;
  }
  let nRows = 0;

  const rep = { reject: [], hold: [], flag: [], hidden: [], dup: [], stop: [], unknownDom: {}, note: {} };
  const note = (m) => { rep.note[m] = (rep.note[m] || 0) + 1; };
  const recs = [], internal = [], seen = new Set();
  for (let i = hi + 1; i < rows.length; i++) {
    const r = rows[i] || []; const g = (k) => (col[k] === undefined ? (CONSTS[k] !== undefined ? String(CONSTS[k]) : "") : s(r[col[k]]));
    const gx = (name) => (xcol[name] === undefined ? "" : s(r[xcol[name]]));
    if (!r.some((v) => s(v))) continue;
    nRows++;
    /* v1.2 (N1-P0-03): रिपोर्ट में सिर्फ़ पंक्ति-नंबर, खाने का नाम और समस्या का प्रकार; ID भी तभी, जब उसका रूप सही हो */
    const id = g("id"), at = "पंक्ति " + (i + 1) + (idRe.test(id) ? " (" + id + ")" : "") + ": ";
    const flag = (m) => rep.flag.push(at + m), hold = (m) => rep.hold.push(at + m), reject = (m) => rep.reject.push(at + m);
    if (!id) { reject("Record_ID ख़ाली"); continue; }
    if (seen.has(id)) { reject("Record_ID दोहराया"); continue; }
    seen.add(id);
    if (col.sectorCode !== undefined && g("sectorCode").toUpperCase() !== SEC.id) { reject(cn("sectorCode") + ": इस batch के सेक्टर (" + SEC.id + ") से मेल नहीं"); continue; }
    if (col.state !== undefined && low(g("state")) !== low(ST.en)) { reject(cn("state") + (g("state") ? ": इस batch के राज्य (" + ST.en + ") से मेल नहीं" : ": ख़ाली")); continue; }
    if (!g("district")) { reject(cn("district") + ": ख़ाली"); continue; }
    if (!g("name")) { reject(cn("name") + ": ख़ाली"); continue; }
    const idm = idRe.exec(id);
    if (!idm) { reject(cn("id") + ": रूप ग़लत (चाहिए " + idHint + ")"); continue; }
    const dist = distByEn[low(g("district"))];
    if (dist && idm[1] !== undefined && idm[1] !== dist.code) { reject(cn("id") + ": ज़िला-कूट " + cn("district") + " से मेल नहीं (" + dist.en + " = " + dist.code + ")"); continue; }
    /* जाँच की स्थिति */
    const vtxt = g("verStatus") || g("acsStatus");
    let status = vtxt ? STATUS_TEXT[vtxt.toLowerCase()] : "TO_BE_VERIFIED";
    if (!status) { reject((g("verStatus") ? cn("verStatus") : cn("acsStatus")) + ": अनजान जाँच-स्थिति"); continue; }
    if (!vtxt) flag("जाँच-स्थिति ख़ाली: \"जाँच बाक़ी\" माना");
    if (status === "VERIFIED" || status === "VERIFIED_WITH_CORRECTION") {
      if (TX.VERIFY && TX.VERIFY.registry) throw new Error("taxonomy.VERIFY.registry भरा है, पर RM-रजिस्टर से मिलान का code अभी नहीं बना: importer रुका (N1-P0-02)");
      flag("\"Verified\" लिखा है, पर \"सत्यापित\" सिर्फ़ server के RM-सत्यापन रजिस्टर से होगा (अभी नहीं बना): \"जाँच बाक़ी\" माना" +
           (g("evidence") || g("verDate") ? " (Evidence_Ref/तारीख़ भरी है, फिर भी)" : ""));
      status = "TO_BE_VERIFIED";
    }
    /* रोककर रखना */
    const holds = [];
    if (!dist) holds.push(cn("district") + ": geo.js की ज़िला-सूची में नहीं");
    /* Sector_Data_JSON (v1.1, N1-P0-01): सिर्फ़ अनुमत कुंजियाँ; बाक़ी या पढ़ा न जा सके = रोककर रखा (मान रिपोर्ट में नहीं) */
    const SDA = TX.SECTOR_DATA[cfg.sector] || {}, sectorData = {};
    for (const k of Object.keys(SDA)) if (SDA[k].default !== undefined) sectorData[k] = SDA[k].default;
    if (g("sectorData")) {
      let j = null; try { j = JSON.parse(g("sectorData")); } catch (e) { j = null; }
      if (!j || typeof j !== "object" || Array.isArray(j)) holds.push("Sector_Data_JSON पढ़ा नहीं गया (JSON object चाहिए)");
      else { const sp = NW.sectorDataProblems(cfg.sector, j); if (sp.length) holds.push(sp.join(" · ")); else Object.assign(sectorData, j); }
    }
    /* v1.3: स्रोत के कॉलम से सेक्टर के खाने (batches.js का sectorDataCols); वही allowlist-पहरा */
    if (Object.keys(SDC).length) {
      const fromCols = {};
      for (const [k, d] of Object.entries(SDC)) {
        const v = gx(d.col); if (!v) continue;
        if (d.map) { const key = Object.keys(d.map).find((m) => m.toLowerCase() === v.toLowerCase()); if (key === undefined) { holds.push(d.col + ": अनजान मान"); continue; } fromCols[k] = d.map[key]; }
        else fromCols[k] = v;
      }
      const sp = NW.sectorDataProblems(cfg.sector, fromCols);
      if (sp.length) holds.push(sp.map((x) => x.replace("Sector_Data_JSON", "सेक्टर-खाने")).join(" · ")); else Object.assign(sectorData, fromCols);
    }
    let unm = false;
    if (!g("block")) {
      if (cfg.unmappedBlock && sectorData[cfg.unmappedBlock]) unm = ("प्रखंड-मिलान बाक़ी (" + cn("block") + " ख़ाली): ज़िले के पन्ने के \"प्रखंड-मिलान बाक़ी\" हिस्से में, स्रोत का प्रखंड साथ");
      else holds.push(cn("block") + ": ख़ाली");
    }
    let primary = null;
    if (byType) { primary = typeCat[g("type")] || null; if (!primary) holds.push(cn("type") + ": taxonomy.js की किसी श्रेणी में नहीं"); }
    else { const c = lookup(CATS, g("primary")); primary = c ? c.id : null; if (!primary) holds.push(cn("primary") + ": अनजान श्रेणी"); }
    if (holds.length) { hold(holds.join(" · ")); internal.push({ id, internalStatus: status, held: holds }); continue; }
    const notes = []; if (unm) notes.push(unm);
    if (TX.STATUS.internal[status] === null) { rep.hidden.push(id + " (" + status + ")"); internal.push({ id, internalStatus: status }); continue; }
    if (cfg.publishCol && low(gx(cfg.publishCol.col)) !== low(cfg.publishCol.yes)) { rep.hidden.push(id + " (" + cfg.publishCol.col + " ≠ " + cfg.publishCol.yes + ")"); internal.push({ id, internalStatus: status, notPublished: true }); continue; }
    /* दूसरी श्रेणियाँ, हुनर, व्यवसाय-प्रकार */
    const secondary = [];
    for (const v of splitList(g("secondary"))) {
      const c = lookup(CATS, v);
      if (!c) flag(cn("secondary") + ": एक अनजान श्रेणी, छोड़ी"); else if (c.id !== primary && secondary.indexOf(c.id) < 0) secondary.push(c.id);
    }
    const skills = [];
    for (const v of splitList(g("skills"))) { const t = lookup(SKILLS, v); if (!t) flag(cn("skills") + ": एक अनजान टैग, छोड़ा"); else if (skills.indexOf(t.id) < 0) skills.push(t.id); }
    let btype = g("type") || null;
    if (BTYPES) { const b = g("btype") ? lookup(BTYPES, g("btype")) : null; btype = b ? b.id : null; if (g("btype") && !b) flag(cn("btype") + ": अनजान व्यवसाय-प्रकार, छोड़ा"); }
    /* स्रोत (1-3) */
    const sources = [];
    for (const n of [1, 2, 3]) {
      const url = g("s" + n + "url"), nm = g("s" + n + "name"), ty = g("s" + n + "type");
      if (!url && !nm) continue;
      let okUrl = url;
      if (url && !isUrl(url)) { flag(cn("s" + n + "url") + ": ग़लत पता, छोड़ा"); okUrl = ""; }
      const dom = okUrl ? domainOf(okUrl) : "";
      let stype = ty && TX.SOURCE_TYPES[ty.toUpperCase()] ? ty.toUpperCase() : null;
      if (ty && !stype) flag(cn("s" + n + "type") + ": अनजान स्रोत-प्रकार, domain से तय");
      if (!stype) { stype = (dom && sourceTypeOf(dom)) || "OTHER_PUBLIC"; if (dom && !sourceTypeOf(dom)) rep.unknownDom[dom] = (rep.unknownDom[dom] || 0) + 1; }
      const chk = g("s" + n + "date"); if (chk && !isDate(chk)) flag(cn("s" + n + "date") + ": तारीख़ ग़लत (YYYY-MM-DD चाहिए), छोड़ी");
      sources.push({ sourceType: stype, sourceName: nm || dom || null, sourceUrl: okUrl || null, checkedAt: isDate(chk) ? chk : null,
                     fieldSupport: splitList(g("s" + n + "fields")).map((x) => x.toLowerCase()) });
    }
    /* v1.4 (CSC-02): कॉलम खिसका: स्रोत-खाने में URL नहीं, पते के खाने में सिर्फ़ एक URL = वही स्रोत (उसी पंक्ति का, गढ़ा नहीं) */
    let addrIsSource = false;
    if (cfg.addressUrlAsSource && !sources.some((x) => x.sourceUrl) && /^https?:\/\/\S+$/i.test(g("address")) && isUrl(g("address"))) {
      const u = g("address"), dom = domainOf(u), st = sourceTypeOf(dom) || "OTHER_PUBLIC";
      if (!sourceTypeOf(dom)) rep.unknownDom[dom] = (rep.unknownDom[dom] || 0) + 1;
      const s0 = { sourceType: st, sourceName: dom, sourceUrl: u, checkedAt: null, fieldSupport: [] };
      if (sources.length && !sources[0].sourceUrl && !g("s1name")) sources[0] = s0; else sources.unshift(s0);
      notes.push(cn("address") + ": स्रोत-पंक्ति में कॉलम खिसका था; पते के खाने का URL स्रोत-कड़ी माना (उस पन्ने पर यह नाम है या नहीं, import ने नहीं देखा)");
      addrIsSource = true;
    }
    if (!sources.some((x) => x.sourceUrl)) flag(cn("s1url") + ": कोई स्रोत-पता नहीं (source-quality exception)");
    /* फ़ोन, PIN, वेबसाइट, निर्देशांक */
    const ph = phones(col.phone === undefined ? "" : r[col.phone]);
    for (const bp of ph.bad) flag(cn("phone") + (/^1800/.test(bp.replace(/\D/g, "")) ? ": toll-free (कंपनी हेल्पलाइन) नंबर, फ़र्म का अपना फ़ोन नहीं, छोड़ा" : ": एक नंबर ग़लत रूप का, छोड़ा"));
    let pin = g("pin").replace(/\D/g, "");
    const pr = PIN_RANGE[cfg.state];
    if (g("pin") && (!/^\d{6}$/.test(pin) || (pr && (+pin < pr[0] || +pin > pr[1])))) { flag(cn("pin") + ": ग़लत (6 अंक, राज्य की सीमा में चाहिए), छोड़ा"); pin = ""; }
    let address = addrIsSource ? null : (g("address") || null);
    if (address && DROPPART.length) {   /* v1.4 (CSC-01): ख़ाली/null टुकड़े हटें, बाक़ी अक्षरशः */
      const parts = address.split(","), keep = parts.filter((x) => !DROPPART.some((re) => re.test(x)));
      if (keep.length !== parts.length) {
        address = keep.join(",").replace(/^[\s,]+|[\s,]+$/g, "") || null;
        notes.push(cn("address") + ": ख़ाली या \"null\" टुकड़े (जैसे \"District-null\", \"Panchayat/Village-\") नहीं छपते; बाक़ी पता जस-का-तस" + (address ? "" : " (कुछ नहीं बचा: पता ख़ाली)"));
      }
    }
    if (address && NOTADDR.some((re) => re.test(address))) { notes.push(cn("address") + ": पता नहीं, शोध की टिप्पणी है (जैसे \"Source row/rank …\"): छपता नहीं"); address = null; }
    let website = null;
    if (g("website")) { if (isUrl(g("website"))) website = g("website"); else flag(cn("website") + ": ग़लत पता, छोड़ी"); }
    else { const fw = sources.find((x) => x.sourceType === "FIRM_WEBSITE" && x.sourceUrl); if (fw) website = fw.sourceUrl.replace(/^(https?:\/\/[^\/?#]+).*$/i, "$1/"); }
    let lat = null, lng = null;
    if (g("lat") || g("lng")) {
      const a = Number(g("lat")), b = Number(g("lng"));
      if (g("lat") && g("lng") && isFinite(a) && isFinite(b) && a >= GEO_BOX.lat[0] && a <= GEO_BOX.lat[1] && b >= GEO_BOX.lng[0] && b <= GEO_BOX.lng[1]) { lat = a; lng = b; }
      else flag(cn("lat") + "/" + cn("lng") + ": ग़लत या अधूरे, छोड़े");
    }
    let parentId = g("parent") || null;   /* मुख्य फ़र्म का ID भी उसी ID-रूप का हो, वरना छोड़ा (मान रिपोर्ट में नहीं) */
    if (parentId && !idRe.test(parentId)) { flag(cn("parent") + ": रूप ग़लत, छोड़ा"); parentId = null; }
    const verified = status === "VERIFIED" || status === "VERIFIED_WITH_CORRECTION";
    const lastSource = sources.map((x) => x.checkedAt).filter(Boolean).sort().pop() || null;
    const rec = {
      id, sectorId: SEC.id, mg: SEC.mg, primaryCategory: primary, secondaryCategories: secondary,
      firmName: g("name"), canonicalName: g("name"), parentFirmId: parentId, branchName: g("branch") || null,
      state: ST.slug, district: dist.slug, block: g("block"), locality: g("locality") || null, address, pin: pin || null,
      latitude: lat, longitude: lng, phone: ph.out, sharedPhone: null, website,
      brandOem: g("brand") ? g("brand").split(/\s*\/\s*/).filter(Boolean) : [], businessType: btype, practicalSkillTags: skills,
      verificationStatus: verified ? status : "TO_BE_VERIFIED", verificationDate: verified ? g("verDate") : null, verifiedBy: null,
      listingStatus: "PUBLISHED", practicalTrainingAvailability: "UNKNOWN", sources, sectorData,
      importBatch: cfg.batchId, createdAt: cfg.importedOn, updatedAt: cfg.importedOn,
      lastSourceCheck: lastSource, lastRMCheck: verified ? g("verDate") : null, nextReviewDue: null
    };
    /* आख़िरी पहरा (v1.1): वही जाँच जो build_network.js और जाँच-यंत्र चलाते हैं */
    const pp = NW.publicProblems(rec);
    if (pp.length) {   /* रिकॉर्ड के खाने का नाम → Excel का कॉलम-नाम (पढ़ने में आसान; मान फिर भी नहीं) */
      const P2C = { firmName: "name", canonicalName: "name", branchName: "branch", block: "block", locality: "locality", address: "address", brandOem: "brand",
        businessType: byType ? "type" : "btype", "sources.sourceName": "s1name", "sources.sourceType": "s1type", "sources.fieldSupport": "s1fields" };
      const ppx = pp.map((m) => { const k = m.split(":")[0]; return P2C[k] && COLS[P2C[k]] ? COLS[P2C[k]] + (k.indexOf("sources.") === 0 ? " (किसी स्रोत का)" : "") + m.slice(k.length) : m; });
      hold(ppx.join(" · ")); internal.push({ id, internalStatus: status, held: ppx }); continue;
    }
    recs.push(rec); notes.forEach(note);   /* v1.3: गिनती सिर्फ़ प्रकाशित रिकॉर्ड की */
    const inr = { id, internalStatus: status }; for (const [n, j] of Object.entries(icol)) inr[n] = s(r[j]) || null;
    internal.push(inr);
  }
  /* शाखा: मुख्य फ़र्म इसी सूची में हो */
  const ids = new Set(recs.map((x) => x.id));
  for (const x of recs) if (x.parentFirmId && !ids.has(x.parentFirmId)) { rep.flag.push(x.id + ": " + cn("parent") + ": सूची में नहीं, छोड़ा"); x.parentFirmId = null; }
  /* साझा फ़ोन और दोहराव (कुछ मिलाया नहीं जाता) */
  const group = (keyf) => { const m = {}; for (const x of recs) for (const k of [].concat(keyf(x) || [])) if (k) (m[k] = m[k] || []).push(x); return m; };
  const ids4 = (xs) => xs.slice(0, 4).map((x) => x.id).join(", ") + (xs.length > 4 ? " …" : "");
  for (const [p, xs] of Object.entries(group((x) => x.phone))) {
    if (xs.length > SHARED_MAX) {
      for (const x of xs) { x.phone = x.phone.filter((q) => q !== p); if (!x.sharedPhone) x.sharedPhone = { number: p, places: xs.length }; }
      rep.dup.push("साझा फ़ोन (" + xs.length + " रिकॉर्ड पर एक ही नंबर): दोहराव नहीं माना; किसी फ़र्म का अपना फ़ोन नहीं, \"साझा नंबर\" लिखकर छपेगा (" + ids4(xs) + ")");
    } else if (xs.length > 1) rep.dup.push("पक्का संकेत · वही फ़ोन: " + xs.map((x) => x.id).join(", "));
  }
  for (const xs of Object.values(group((x) => x.address && norm(x.address).length > 12 ? x.district + "|" + norm(x.address) : null)))
    if (xs.length > 1) rep.dup.push("पक्का संकेत · वही पूरा पता: " + xs.map((x) => x.id).join(", "));
  for (const [d, xs] of Object.entries(group((x) => x.website ? domainOf(x.website) : null)))
    if (xs.length > 1) rep.dup.push("पक्का संकेत · वही वेबसाइट: " + ids4(xs));
  const strongNL = new Set();
  for (const xs of Object.values(group((x) => x.locality ? norm(x.firmName) + "|" + x.district + "|" + norm(x.locality) : null)))
    if (xs.length > 1) { rep.dup.push("पक्का संकेत · वही नाम + वही इलाक़ा: " + xs.map((x) => x.id).join(", ")); xs.forEach((x) => strongNL.add(x.id)); }
  for (const xs of Object.values(group((x) => norm(x.firmName) + "|" + x.district)))
    if (xs.length > 1 && xs.some((x) => !strongNL.has(x.id))) rep.dup.push("संभावित · वही नाम + वही ज़िला: " + xs.map((x) => x.id).join(", "));
  const nDom = Object.keys(rep.unknownDom).length;   /* domain-सूची सिर्फ़ भीतरी फ़ाइल में (रिपोर्ट में मान नहीं) */
  if (nDom) rep.flag.push("अनजान स्रोत-domain: " + nDom + " (" + Object.values(rep.unknownDom).reduce((a, b) => a + b, 0) + " स्रोत), OTHER_PUBLIC माना; सूची भीतरी फ़ाइल (--internal-out) में"); 
  /* गिनती */
  const dset = new Set(recs.map((x) => x.district));
  if (cfg.expect && cfg.expect.rows !== undefined && nRows !== cfg.expect.rows) rep.stop.push("स्रोत की पंक्तियाँ " + nRows + " ≠ अपेक्षित " + cfg.expect.rows);
  if (cfg.expect && cfg.expect.records !== undefined && recs.length !== cfg.expect.records) rep.stop.push("प्रकाशित रिकॉर्ड " + recs.length + " ≠ अपेक्षित " + cfg.expect.records);
  if (cfg.expect && cfg.expect.districts !== undefined && dset.size !== cfg.expect.districts) rep.stop.push("ज़िले " + dset.size + " ≠ अपेक्षित " + cfg.expect.districts);
  /* कवरेज (IT-brief धारा 21) */
  const emailCol = Object.keys(icol).find((n) => /^email$/i.test(n));
  rep.coverage = {
    rows: nRows, published: recs.length, districts: dset.size + "/" + ST.districts.length, blocks: new Set(recs.filter((x) => x.block).map((x) => x.district + "/" + x.block)).size,
    verified: recs.filter((x) => x.verificationStatus !== "TO_BE_VERIFIED").length, toBeVerified: recs.filter((x) => x.verificationStatus === "TO_BE_VERIFIED").length,
    phone: recs.filter((x) => x.phone.length).length, sharedPhoneOnly: recs.filter((x) => !x.phone.length && x.sharedPhone).length,
    email: emailCol ? internal.filter((x) => x[emailCol]).length : 0, website: recs.filter((x) => x.website).length,
    sourceUrl: recs.filter((x) => x.sources.some((y) => y.sourceUrl)).length, pin: recs.filter((x) => x.pin).length,
    categories: CATS.filter((c) => recs.some((x) => x.primaryCategory === c.id || x.secondaryCategories.indexOf(c.id) > -1)).length + "/" + CATS.length,
    skills: SKILLS.filter((t) => recs.some((x) => x.practicalSkillTags.indexOf(t.id) > -1)).length + "/" + SKILLS.length
  };
  const head2 = { batch: cfg.batchId, sector: SEC.id, state: cfg.state, importedOn: cfg.importedOn, source: cfg.source || path.basename(file), count: recs.length };
  const json = "{\n" + Object.entries(head2).map(([k, v]) => "  " + JSON.stringify(k) + ": " + JSON.stringify(v)).join(",\n") +
               ',\n  "records": [\n' + recs.map((x) => "    " + JSON.stringify(x)).join(",\n") + "\n  ]\n}\n";
  return { rep, json, internal, recs, source: head2.source };
}

/* जाँच-रिपोर्ट (validation report) */
function reportText(batchId, file, r) {
  const L = [], R = r.rep, C = R.coverage;
  L.push("ACS नेटवर्क import-रिपोर्ट · batch " + batchId + " · स्रोत " + (r.source || path.basename(file)));
  L.push("सारांश: स्रोत की पंक्तियाँ " + C.rows + " · प्रकाशित " + C.published + " · रोक " + R.reject.length + " · रोककर रखे " + R.hold.length + " · सार्वजनिक नहीं (बंद/न मिला/छिपा) " + R.hidden.length +
         " · सूचनाएँ " + R.flag.length + " · दोहराव-संकेत " + R.dup.length + (R.stop.length ? " · ⛔ गिनती बेमेल" : ""));
  L.push("कवरेज: ज़िले " + C.districts + " · प्रखंड " + C.blocks + " · सत्यापित " + C.verified + " · जाँच बाक़ी " + C.toBeVerified + " · फ़ोन " + C.phone +
         " (सिर्फ़ साझा नंबर " + C.sharedPhoneOnly + ") · email (भीतरी) " + C.email + " · वेबसाइट " + C.website + " · स्रोत-पता " + C.sourceUrl +
         " · PIN " + C.pin + " · श्रेणियाँ " + C.categories + " · हुनर-टैग " + C.skills);
  const sec = (t, xs) => { L.push(""); L.push("== " + t + " (" + xs.length + ")"); xs.forEach((x) => L.push("  " + x)); };
  if (R.stop.length) sec("⛔ पूरा import रुका", R.stop);
  sec("⛔ रोक (रिकॉर्ड नहीं आया)", R.reject);
  sec("⏸ रोककर रखे (प्रकाशित नहीं)", R.hold);
  sec("सार्वजनिक सूची में नहीं (स्थिति से)", R.hidden);
  sec("ℹ️ सूचना (खाना छोड़ा, कुछ गढ़ा नहीं)", R.flag);
  if (Object.keys(R.note || {}).length) sec("ℹ️ बार-बार की सूचनाएँ (गिनती)", Object.entries(R.note).map(([m, n]) => n + " रिकॉर्ड · " + m));
  sec("दोहराव के संकेत (कुछ मिलाया नहीं गया; RM देखेगा)", R.dup);
  const out = L.join("\n") + "\n";
  /* v1.2 (N1-P0-03) आख़िरी पहरा: रिपोर्ट बाहर जाती है (ऑडिट/RM)। उसमें email या 10+ अंकों का समूह दिखे = यह code-दोष है:
     रिपोर्ट नहीं बनती, import रुकता है (fail-closed)। */
  if (NW.EMAIL_RE.test(out) || NW.LONG_DIGITS.test(out)) throw new Error("जाँच-रिपोर्ट में email/लंबा अंक-समूह आ गया (N1-P0-03): रिपोर्ट नहीं बनी");
  return out;
}

if (require.main === module) {
  const a = process.argv.slice(2), val = (f) => { const i = a.indexOf(f); return i > -1 ? a[i + 1] : null; };
  const pos = a.filter((x, i) => !x.startsWith("--") && ["--internal-out", "--report", "--out-dir"].indexOf(a[i - 1]) < 0);
  const CHECK = a.indexOf("--check") > -1;
  const batchId = pos[0], file = pos[1];
  if (!batchId || !file) { console.log("चलाएँ: node generator/import_network.js <BATCH-ID> <Excel/CSV फ़ाइल> [--check] [--report <फ़ाइल>] [--internal-out <फ़ाइल>] [--out-dir <folder>]"); process.exit(2); }
  if (!fs.existsSync(file)) { console.log("⛔ फ़ाइल नहीं मिली: " + file); process.exit(2); }
  const B = BATCHES[batchId]; if (!B) { console.log("⛔ batches.js में batch नहीं: " + batchId); process.exit(2); }
  let r; try { r = run(Object.assign({ batchId }, B), file); } catch (e) { console.log("⛔ " + e.message); process.exit(1); }
  let txt; try { txt = reportText(batchId, file, r); } catch (e) { console.log("⛔ " + e.message); process.exit(1); }
  console.log(txt.split("\n").slice(0, 3).join("\n"));
  if (val("--report")) { fs.writeFileSync(val("--report"), txt, "utf8"); console.log("✅ रिपोर्ट: " + val("--report")); }
  if (r.rep.stop.length) { r.rep.stop.forEach((m) => console.log("  ⛔ " + m)); console.log("⛔ import रुका: कुछ नहीं लिखा"); process.exit(1); }
  const outdir = val("--out-dir") || OUTDIR, outf = path.join(outdir, batchId + ".json");
  const old = fs.existsSync(outf) ? fs.readFileSync(outf, "utf8").replace(/\r\n/g, "\n") : null;
  if (CHECK) {
    if (old !== r.json) { console.log("⛔ " + batchId + ".json बासी है (import दोबारा चलाएँ)"); process.exit(1); }
    console.log("🏁 import --check: " + batchId + " का data स्रोत-फ़ाइल से हूबहू मेल खाता है"); process.exit(0);
  }
  fs.mkdirSync(outdir, { recursive: true });
  if (old === r.json) console.log("✅ " + batchId + ".json पहले जैसा (कुछ नहीं बदला)");
  else { fs.writeFileSync(outf, r.json, "utf8"); console.log("✅ लिखा: " + path.relative(process.cwd(), outf)); }
  if (val("--internal-out")) { fs.writeFileSync(val("--internal-out"), JSON.stringify({ batch: batchId, records: r.internal, unknownSourceDomains: r.rep.unknownDom }, null, 1), "utf8"); console.log("✅ भीतरी फ़ाइल (repo में न रखें): " + val("--internal-out")); }
  console.log("🏁 import_network v1.4 : " + batchId);
}
module.exports = { run, reportText, phones, domainOf, parseCSV };
