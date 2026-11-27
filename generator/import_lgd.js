#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   generator/import_lgd.js v1.0 (26-Nov-2026) · "पिन-घर" · सरकारी गाँव-सूची (LGD) का आयात

   Founder (26-Nov-2026): "इस फाइल को भी गहन जांच करो, और पता को कनफर्म करना का सब उपाय करो।"

   LGD = Local Government Directory (भारत सरकार, पंचायती राज मंत्रालय)। Founder की दी हुई 5 फ़ाइलें:
     district_panchayats.<तारीख़>.csv   ज़िले (ज़िला-पंचायत वाले)
     pincode_urban.<तारीख़>.csv         पिन → नगर निकाय
     pincode_villages.<तारीख़>.csv      पिन → गाँव (राज्य, ज़िला, अनुमंडल/तहसील समेत)
     villages.<तारीख़>.csv              हर गाँव (स्थानीय नाम, दर्जा)
     villages_by_blocks.<तारीख़>.csv    गाँव → ग्राम पंचायत और प्रखंड (विकास खंड)

   ये पाँचों मिलकर 213 MB हैं; साइट की सीमा के कारण repo में नहीं रखी जातीं। यह यंत्र इन्हें
   पहले जाँचता है, फिर ज़रूरी खाने निकालकर एक छोटी फ़ाइल बनाता है:
     generator/data/pin/lgd_places.tsv.br    (brotli; यही repo में रहती है)
     generator/data/pin/lgd_source.json      (मूल फ़ाइलों के नाम, आकार, sha256, गिनतियाँ)
   आगे का यंत्र generator/build_pin_data.js सिर्फ़ इसी छोटी फ़ाइल को पढ़ता है।

   चलाना (नई सरकारी फ़ाइलें आएँ तब; पाँचों CSV एक folder में खोलकर रखें):
     node generator/import_lgd.js <folder>
     node generator/build_pin_data.js

   जाँच (एक भी टूटे, तो यंत्र रुकता है और कुछ नहीं लिखता):
     - हर फ़ाइल के खानों के नाम ठीक वही; हर पंक्ति में उतने ही खाने
     - हर पिन ठीक 6 अंक; गाँव का code दोहराया नहीं
     - पिन-सूची और प्रखंड-सूची का हर गाँव «villages» में मौजूद; ज़िला और तहसील का code मेल खाता है
     - एक code का एक ही नाम (राज्य, ज़िला, तहसील, प्रखंड)
   छोटी फ़ाइल की पंक्तियाँ (tab से बँटी):
     T राज्य-code नाम · D ज़िला-code राज्य-code नाम · S तहसील-code ज़िला-code नाम · B प्रखंड-code नाम
     U पिन राज्य-code निकाय-code नाम प्रकार राज्य-नाम
     V पिन गाँव-code तहसील-code श्रेणी(R/U/M/B) दर्जा(I/N/F) नाम «प्रखंड-code:पंचायत;प्रखंड-code:पंचायत»
   ═══════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs"), path = require("path"), zlib = require("zlib"), crypto = require("crypto");
const ROOT = path.resolve(__dirname, "..");
const die = (m) => { console.error("⛔ import_lgd: " + m); process.exit(1); };
const DIR = process.argv[2];
if (!DIR || !fs.existsSync(DIR) || !fs.statSync(DIR).isDirectory()) die("folder बताइए: node generator/import_lgd.js <folder जिसमें पाँचों CSV हैं>");

const WANT = {
  district_panchayats: ["S.No.", "State Code", "State Name (In English)", "Disrict Code", "District Name", "District Panchayat Code", "District Panchayat"],
  pincode_urban: ["S.No.", "State Code", "State Name", "Localbody Code", "Localbody Name", "Localbody Type Name", "Pincode"],
  pincode_villages: ["S.No.", "State Code", "State Name", "District Code", "District Name", "SubDistrict Code", "SubDistrict Name", "Village Code", "Village Name", "Pincode"],
  villages: ["S.No.", "District Code", "District Name (In English)", "Sub-District Code", "Sub-District Name (In English)", "Village Code", "Village Version", "Village Name (In English)",
    "Village Name (In Local)", "Village Category", "Village Status", "Census 2001 Code", "Census 2011 Code", "Remark", "State Code", "State Name(In English)"],
  villages_by_blocks: ["S.No.", "State Code", "State Name (In English)", "State Census 2011 Code", "District Code", "District Name (In English)", "District Census 2011 Code",
    "Subdistrict Code", "Subdistrict Name (In English)", "Subdistrict Census 2011 Code", "Village Code", "Village Name (In English)", "Village Census 2011 Code", "Local Body Code",
    "Local Body Name (In English)", "Local Body 2011 Code", "Development Block Code", "Development Block Name (In English)", "District Code of Development Block",
    "District Name of Development Block (In English)"]
};

/* RFC 4180: उद्धरण-चिह्न के भीतर अल्पविराम और दोहरा उद्धरण-चिह्न */
function parseCSV(text, each) {
  let row = [], cur = "", q = false, i = 0; const n = text.length;
  for (; i < n; i++) {
    const c = text.charCodeAt(i);
    if (q) { if (c === 34) { if (text.charCodeAt(i + 1) === 34) { cur += '"'; i++; } else q = false; } else cur += text[i]; }
    else if (c === 34) q = true;
    else if (c === 44) { row.push(cur); cur = ""; }
    else if (c === 10) { row.push(cur); cur = ""; each(row); row = []; }
    else if (c !== 13) cur += text[i];
  }
  if (cur !== "" || row.length) { row.push(cur); each(row); }
}
const clean = (s) => String(s).replace(/[\t ]/g, " ").replace(/\s+/g, " ").trim();
const PIN = /^[1-9][0-9]{5}$/, NUM = /^[0-9]+$/;

const found = {}, SRC = { imported_by: "generator/import_lgd.js v1.0", files: {} };
fs.readdirSync(DIR).forEach((f) => { const m = /^([a-z_]+)\.([0-9A-Za-z]+)\.csv$/.exec(f); if (m && WANT[m[1]]) { if (found[m[1]]) die("एक ही सूची की दो फ़ाइलें: " + f); found[m[1]] = { file: f, date: m[2] }; } });
Object.keys(WANT).forEach((k) => { if (!found[k]) die("फ़ाइल नहीं मिली: " + k + ".<तारीख़>.csv"); });
const dates = Array.from(new Set(Object.keys(found).map((k) => found[k].date)));
if (dates.length !== 1) die("पाँचों फ़ाइलों की तारीख़ एक नहीं है: " + dates.join(", "));
SRC.date = dates[0];

function load(kind, each) {
  const p = path.join(DIR, found[kind].file), buf = fs.readFileSync(p);
  let text; try { text = new TextDecoder("utf-8", { fatal: true }).decode(buf); } catch (e) { die(found[kind].file + ": UTF-8 नहीं है"); }
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  let head = null, rows = 0; const W = WANT[kind];
  parseCSV(text, (r) => {
    if (!head) { head = r.map(clean); if (head.join("|") !== W.join("|")) die(found[kind].file + ": खानों के नाम बदल गए हैं\n   मिला: " + head.join(" | ") + "\n   चाहिए: " + W.join(" | ")); return; }
    if (r.length === 1 && r[0] === "") return;
    if (r.length !== W.length) die(found[kind].file + ": पंक्ति " + (rows + 2) + " में " + r.length + " खाने हैं, चाहिए " + W.length);
    rows++; each(r.map(clean));
  });
  SRC.files[kind] = { name: found[kind].file, bytes: buf.length, sha256: crypto.createHash("sha256").update(buf).digest("hex"), rows };
  return rows;
}
const one = (map, code, name, what) => { const o = map.get(code); if (o === undefined) map.set(code, name); else if (o !== name) die(what + " के code " + code + " के दो नाम: «" + o + "» और «" + name + "»"); };

/* ── 1. villages: हर गाँव ── */
const ST = new Map(), DI = new Map(), DIST_STATE = new Map(), SD = new Map(), SD_DIST = new Map();
const VIL = new Map();   /* code → [sd, name, cat, status, district] */
const CAT = { rural: "R", urban: "U", unmapped: "M", both: "B" }, STA = { "inhabitant": "I", "un-inhabitant": "N", "forest": "F" };
let localNames = 0;
load("villages", (r) => {
  const dc = r[1], sd = r[3], vc = r[5], sc = r[14];
  [dc, sd, vc, sc].forEach((x) => { if (!NUM.test(x)) die("villages: code अंक नहीं है: " + x); });
  one(ST, sc, r[15], "राज्य"); one(DI, dc, r[2], "ज़िला"); one(DIST_STATE, dc, sc, "ज़िले का राज्य"); one(SD, sd, r[4], "तहसील"); one(SD_DIST, sd, dc, "तहसील का ज़िला");
  if (VIL.has(vc)) die("villages: गाँव का code दोहराया गया: " + vc);
  const c = CAT[r[9].toLowerCase()], s = STA[r[10].toLowerCase()];
  if (!c) die("villages: अनजान श्रेणी: " + r[9]); if (!s) die("villages: अनजान दर्जा: " + r[10]);
  if (!r[7]) die("villages: गाँव का नाम ख़ाली, code " + vc);
  if (r[8]) localNames++;
  VIL.set(vc, [sd, r[7], c, s, dc]);
});

/* ── 2. pincode_villages: गाँव का पिन ── */
const VPIN = new Map();
load("pincode_villages", (r) => {
  const vc = r[7], pin = r[9];
  if (!PIN.test(pin)) die("pincode_villages: पिन ठीक नहीं: " + pin);
  const v = VIL.get(vc); if (!v) die("pincode_villages: गाँव " + vc + " «villages» में नहीं है");
  if (v[0] !== r[5] || v[4] !== r[3]) die("pincode_villages: गाँव " + vc + " का ज़िला या तहसील «villages» से नहीं मिलता");
  if (DIST_STATE.get(r[3]) !== r[1]) die("pincode_villages: गाँव " + vc + " का राज्य नहीं मिलता");
  if (VPIN.has(vc)) die("pincode_villages: गाँव " + vc + " दो बार आया");
  VPIN.set(vc, pin);
});

/* ── 3. villages_by_blocks: ग्राम पंचायत और प्रखंड ── */
const BL = new Map(), VB = new Map();
let vbRows = 0, crossBlock = 0;
load("villages_by_blocks", (r) => {
  const vc = r[10], bc = r[16], bd = r[18]; vbRows++;
  const v = VIL.get(vc); if (!v) die("villages_by_blocks: गाँव " + vc + " «villages» में नहीं है");
  if (!NUM.test(bc) || bc === "0") die("villages_by_blocks: प्रखंड का code ठीक नहीं, गाँव " + vc);
  one(BL, bc, r[17], "प्रखंड");   /* एक प्रखंड दो ज़िलों के नाम से दर्ज हो सकता है; इसलिए प्रखंड का ज़िला नहीं रखा जाता (गाँव का ज़िला ही सच है) */
  if (bd !== v[4]) crossBlock++;
  const gp = (r[13] !== "0" ? r[14] : "").replace(/;/g, ",");   /* ";" इस फ़ाइल में जोड़ियों को अलग करता है */
  let a = VB.get(vc); if (!a) { a = []; VB.set(vc, a); }
  const key = bc + ":" + gp; if (a.indexOf(key) < 0) a.push(key);
});

/* ── 4. pincode_urban: नगर निकाय ── */
const URB = []; const useen = new Set();
load("pincode_urban", (r) => {
  if (!PIN.test(r[6])) die("pincode_urban: पिन ठीक नहीं: " + r[6]);
  if (!ST.has(r[1]) && r[2] !== "Chandigarh") die("pincode_urban: अनजान राज्य-code " + r[1]);
  const k = r[6] + "|" + r[3]; if (useen.has(k)) return; useen.add(k);
  URB.push([r[6], r[1], r[3], r[4], r[5], r[2]]);
});

/* ── 5. district_panchayats: सिर्फ़ जाँच (ज़िले का code और राज्य वही) ── */
let dpNew = 0;
load("district_panchayats", (r) => {
  if (!DI.has(r[3])) { dpNew++; return; }   /* बिना गाँव वाला ज़िला: आगे के काम में नहीं आता */
  if (DIST_STATE.get(r[3]) !== r[1]) die("district_panchayats: ज़िला " + r[3] + " का राज्य «villages» से नहीं मिलता");
});

/* ── 6. छोटी फ़ाइल ── */
const L = [];
Array.from(ST.keys()).sort((a, b) => a - b).forEach((sc) => L.push(["T", sc, ST.get(sc)].join("\t")));
Array.from(DI.keys()).sort((a, b) => a - b).forEach((dc) => L.push(["D", dc, DIST_STATE.get(dc), DI.get(dc)].join("\t")));
Array.from(SD.keys()).sort((a, b) => a - b).forEach((sd) => L.push(["S", sd, SD_DIST.get(sd), SD.get(sd)].join("\t")));
Array.from(BL.keys()).sort((a, b) => a - b).forEach((bc) => L.push(["B", bc, BL.get(bc)].join("\t")));
URB.sort((a, b) => (a[0] + a[3] < b[0] + b[3] ? -1 : 1)).forEach((u) => L.push(["U", u[0], u[1], u[2], u[3], u[4], u[5]].join("\t")));
const vrows = []; let noPin = 0, noBlock = 0;
VIL.forEach((v, vc) => { const pin = VPIN.get(vc); if (!pin) { noPin++; return; } const b = VB.get(vc); if (!b) noBlock++; vrows.push([pin, v[1], vc, v[0], v[2], v[3], b ? b.join(";") : ""]); });
vrows.sort((a, b) => (a[0] !== b[0] ? (a[0] < b[0] ? -1 : 1) : a[1] !== b[1] ? (a[1] < b[1] ? -1 : 1) : a[2] - b[2]));
vrows.forEach((v) => L.push(["V", v[0], v[2], v[3], v[4], v[5], v[1], v[6]].join("\t")));
const text = L.join("\n") + "\n";
if (/\r/.test(text)) die("भीतरी गड़बड़ी: पाठ में CR");
const raw = Buffer.from(text, "utf8");
const P = zlib.constants;
const br = zlib.brotliCompressSync(raw, { params: { [P.BROTLI_PARAM_QUALITY]: 11, [P.BROTLI_PARAM_LGWIN]: 24, [P.BROTLI_PARAM_SIZE_HINT]: raw.length } });
SRC.counts = { states: ST.size, districts: DI.size, subdistricts: SD.size, blocks: BL.size, villages: VIL.size, villages_with_pin: vrows.length, villages_without_pin: noPin,
  villages_with_pin_but_no_block_row: noBlock, village_local_names: localNames, block_rows: vbRows, block_in_other_district_rows: crossBlock, urban_rows: URB.length,
  district_panchayat_rows_without_villages: dpNew };
SRC.out = { file: "generator/data/pin/lgd_places.tsv.br", text_bytes: raw.length, text_sha256: crypto.createHash("sha256").update(raw).digest("hex"), bytes: br.length };
const OUT = path.join(ROOT, "generator/data/pin");
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "lgd_places.tsv.br"), br);
fs.writeFileSync(path.join(OUT, "lgd_source.json"), JSON.stringify(SRC, null, 1) + "\n");
console.log("🏁 import_lgd v1.0 : तारीख़ " + SRC.date + " · राज्य " + ST.size + " · ज़िले " + DI.size + " · तहसील " + SD.size + " · प्रखंड " + BL.size + " · गाँव " + VIL.size +
  " (पिन वाले " + vrows.length + ", बिना पिन " + noPin + ") · नगर निकाय की पंक्तियाँ " + URB.length + " · छोटी फ़ाइल " + (br.length / 1048576).toFixed(1) + " MB (पाठ " + (raw.length / 1048576).toFixed(1) + " MB)");
