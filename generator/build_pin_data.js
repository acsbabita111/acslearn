#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   generator/build_pin_data.js v1.1 (26-Nov-2026) · परत-4 · "पिन-घर"
   Founder (26-Nov-2026): "पूरे सिस्टम मे जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही
   अपने आप सभी सूचना ले लिया जाए।" और "पता को कनफर्म करना का सब उपाय करो।"

   दो सरकारी स्रोत (परत-3; कभी हाथ से नहीं बदलते):
     generator/data/pin/india_post_pincode.csv.gz   India Post की पिन-सूची: पिन → डाकघर, ज़िला, राज्य
     generator/data/pin/lgd_places.tsv.br           LGD (पंचायती राज मंत्रालय) की सूची: पिन → गाँव, पंचायत, प्रखंड, तहसील, ज़िला; पिन → नगर निकाय
                                                    (यह फ़ाइल generator/import_lgd.js बनाता है; पहचान lgd_source.json में)
     generator/data/pin/district_map.js             दोनों स्रोतों के ज़िला-नाम → ACS की सूची के नाम (हाथ से जाँचा)
     assets/geo/states/in.js                        राज्यों की कुंजी और हिंदी नाम (पहले से)
     generator/data/panel_i18n/en.json ("geo")      हिंदी नाम वाले ज़िलों के English रूप (पहले से)

   बनता है (हाथ से कभी नहीं):
     assets/geo/pin/NNN.json     डाक: पिन के पहले 3 अंक का एक टुकड़ा
     assets/geo/pinv/NNN.json    गाँव: पिन के पहले 3 अंक का टुकड़ा; बड़ा हो तो उसमें सिर्फ़ {"x":4} और टुकड़े NNNN.json (ऐसे ही 5 और 6 अंक तक)
     assets/geo/pin/meta.json    गिनती, स्रोत की पहचान, दोनों स्रोतों का मिलान
     assets/geo/districts/in-<राज्य>.js   ज़िला-सूची: पुराने नाम जस के तस + वे ज़िले जो सूची में नहीं थे

   डाक का टुकड़ा:  {"v":1,"s":{"bihar":["बिहार","Bihar"]},"d":[["bihar","खगड़िया","Khagaria"]],"p":{"201":[[0,"Borney|Chautham|…"]]}}
     s = राज्य की कुंजी → [हिंदी नाम, English नाम]
     d = इस टुकड़े के ज़िले: [राज्य की कुंजी, ACS की ज़िला-सूची का नाम (फ़ॉर्म और RM का दायरा इसी से चलता है), English नाम]
     p = पिन के बाक़ी अंक → समूह [ज़िले का क्रमांक, "डाकघर|डाकघर|…"]; सबसे बड़ा समूह पहले; ज़िला पता न हो तो क्रमांक -1
   गाँव का टुकड़ा: {"v":1,"s":{…},"d":[…],"n":["Chautham","Gogri"],"p":{"201":{"u":["Khagaria|Municipal Council"],"g":[[0,0,0,["Buchcha","Arnawan|Buchcha|Phango", …]]]}}}
     n = तहसील और प्रखंड के नाम (क्रमांक से)
     u = इस पिन के नगर निकाय "नाम|प्रकार"
     g = समूह [ज़िले का क्रमांक, तहसील का क्रमांक, प्रखंड का क्रमांक (-1 = दर्ज नहीं), [पंचायत, "गाँव|गाँव", पंचायत, "गाँव|गाँव", …]]; पंचायत "" = दर्ज नहीं

   नियम:
     1. fail-closed: किसी स्रोत का कोई राज्य या ज़िला न सुलझे, तो कुछ नहीं लिखा जाता (district_map.js में जोड़ें)।
     2. ACS की सूची का कोई पुराना ज़िला-नाम नहीं बदलता, नहीं हटता।
     3. नाम सिर्फ़ साफ़ होते हैं (डाकघर के पद B.O, S.O, H.O हटते हैं; चौकोर कोष्ठक गोल होते हैं); और कुछ नहीं बदलता।
     4. अक्षांश और देशांतर नहीं रखे जाते (अभी किसी काम के नहीं; स्रोत में सुरक्षित हैं)।
     5. दोनों स्रोतों में फ़र्क़ हो, तो कोई स्रोत बदला नहीं जाता; फ़र्क़ गिना जाता है और रिपोर्ट में लिखा जाता है।

   चलाना:   node generator/build_pin_data.js            (लिखता है)
            node generator/build_pin_data.js --check    (कुछ नहीं लिखता; फ़र्क़ हो तो exit 1)
            node generator/build_pin_data.js --report <folder>   (zila-milan.tsv और pin-milan.tsv)
            --root <folder>  (दूसरे folder पर; जाँच-यंत्र के लिए)
   ═══════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs"), path = require("path"), zlib = require("zlib"), crypto = require("crypto");
const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : null; };
const ROOT = arg("--root") ? path.resolve(arg("--root")) : path.resolve(__dirname, "..");
const CHECK = argv.indexOf("--check") > -1;
const SRC = "generator/data/pin/india_post_pincode.csv.gz";
const SRC_LGD = "generator/data/pin/lgd_places.tsv.br", SRC_LGD_INFO = "generator/data/pin/lgd_source.json";
const OUT = "assets/geo/pin", OUTV = "assets/geo/pinv", DIST = "assets/geo/districts";
const LIMIT = 48 * 1024;   /* गाँव का टुकड़ा इससे बड़ा हो, तो अगले अंक पर बँटता है (फ़ोन पर gzip होकर क़रीब एक-तिहाई उतरता है) */
const P = (f) => path.join(ROOT, f);
const die = (m) => { console.error("⛔ build_pin_data: " + m); process.exit(1); };

/* ── CSV (RFC 4180: उद्धरण के भीतर अल्पविराम और दोहरा उद्धरण) ── */
function parseCSV(text) {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
    else if (c !== "\r") cur += c;
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
const norm = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]/g, "");
const cleanEn = (s) => String(s).replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const stateEn = (key) => key.split("-").map((w) => (w === "and" ? "and" : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");

/* डाकघर का नाम साफ़ करना */
function officeName(raw) {
  let n = String(raw).replace(/ /g, " ").replace(/[`]/g, "").replace(/\s+/g, " ").trim();
  n = n.replace(/\[/g, "(").replace(/\]/g, ")");
  /* पद: "Borney BO", "Kothimir B.O", "X S.O.", "Y G.P.O.", "DuppalliB.O", "Z B.O-An", "W B  O" */
  n = n.replace(/\s*\b(?:G\.?\s?P\.?\s?O|[BSH]\.\s?O|[BSH]\s{1,2}O|[BSH]O)\b\.?(?:-([A-Za-z]{1,3}))?$/, (m, tag) => (tag ? " (" + tag + ")" : ""));
  n = n.replace(/([a-z])[BSH]\.O\.?$/, "$1");
  const open = (n.match(/\(/g) || []).length, close = (n.match(/\)/g) || []).length;
  if (open > close) n += ")".repeat(open - close);
  n = n.replace(/\s+/g, " ").replace(/\s+\)/g, ")").replace(/\(\s+/g, "(").trim();
  if (/[A-Z]/.test(n) && !/[a-z]/.test(n)) n = n.toLowerCase().replace(/(^|[\s(\-.\/&@])([a-z])/g, (m, a, b) => a + b.toUpperCase());   /* पूरा बड़े अक्षरों में हो तो */
  return n.replace(/\|/g, "/");
}

/* गाँव, पंचायत, प्रखंड, तहसील, नगर निकाय का नाम साफ़ करना (सिर्फ़ रूप; शब्द नहीं बदलते) */
function placeName(raw) {
  let n = String(raw).replace(/[\u00a0\t]/g, " ").replace(/\s+/g, " ").trim();
  n = n.replace(/\[/g, "(").replace(/\]/g, ")").replace(/\|/g, "/").replace(/[\u0001\u0002]/g, "");
  n = n.replace(/\s+\)/g, ")").replace(/\(\s+/g, "(");
  if (/[A-Z]/.test(n) && !/[a-z]/.test(n) && n.length > 3) n = n.toLowerCase().replace(/(^|[\s(\-.\/&@])([a-z])/g, (m, a, b) => a + b.toUpperCase());
  return n;
}

/* ── स्रोत पढ़ना ── */
if (!fs.existsSync(P(SRC))) die("स्रोत नहीं मिला: " + SRC);
const gz = fs.readFileSync(P(SRC));
const csv = zlib.gunzipSync(gz);
const SHA = crypto.createHash("sha256").update(csv).digest("hex");
const table = parseCSV(csv.toString("utf8"));
const head = table.shift();
const need = ["officename", "pincode", "district", "statename"], col = {};
need.forEach((k) => { col[k] = head.indexOf(k); if (col[k] < 0) die("स्रोत में खाना नहीं: " + k); });
if (!fs.existsSync(P(SRC_LGD)) || !fs.existsSync(P(SRC_LGD_INFO))) die("स्रोत नहीं मिला: " + SRC_LGD + " (पहले चलाएँ: node generator/import_lgd.js <folder>)");
const LGD_INFO = JSON.parse(fs.readFileSync(P(SRC_LGD_INFO), "utf8"));
const lgdBuf = zlib.brotliDecompressSync(fs.readFileSync(P(SRC_LGD)));
if (crypto.createHash("sha256").update(lgdBuf).digest("hex") !== LGD_INFO.out.text_sha256) die(SRC_LGD + " और lgd_source.json मेल नहीं खाते (दोनों एक ही आयात के होने चाहिए)");
const MAP = require(P("generator/data/pin/district_map.js"));

/* ── ACS के राज्य और मौजूदा ज़िला-सूचियाँ ── */
function evalWindow(file) { const w = {}; new Function("window", fs.readFileSync(P(file), "utf8"))(w); return w; }
const STATES = evalWindow("assets/geo/states/in.js").ACS_GEO_STATES["in"];
const STHI = {}; STATES.forEach((s) => { STHI[s.v] = s.name; });
Object.keys(MAP.STATE).forEach((k) => { if (!STHI[MAP.STATE[k]]) die("district_map.STATE की कुंजी राज्य-सूची में नहीं: " + MAP.STATE[k]); });
const GEO = JSON.parse(fs.readFileSync(P("generator/data/panel_i18n/en.json"), "utf8")).geo || {};
const HAS_DEV = (s) => /[ऀ-ॿ]/.test(s);
const enOf = (name) => { if (HAS_DEV(name)) { if (!GEO[name]) die("हिंदी ज़िला-नाम का English रूप en.json (geo) में नहीं: " + name); return GEO[name]; } return cleanEn(name); };
const problems = [];

/* दूसरे नाम (ALIAS) और नए ज़िले (NEW): दोनों स्रोतों की तालिकाएँ एक साथ; कुंजी = नाम के सिर्फ़ अक्षर और अंक */
const AL = {}, NW = {};
function index(tbl, into, sec) {
  Object.keys(tbl || {}).forEach((key) => {
    if (!STHI[key]) problems.push(sec + " का राज्य राज्य-सूची में नहीं: " + key);
    into[key] = into[key] || new Map();
    Object.keys(tbl[key]).forEach((raw) => { const n = norm(raw); if (into[key].has(n)) problems.push("एक ही नाम दो बार: " + key + " / " + raw); into[key].set(n, { to: tbl[key][raw], sec, raw, used: 0 }); });
  });
}
index(MAP.ALIAS, AL, "ALIAS"); index(MAP.ALIAS_LGD, AL, "ALIAS_LGD"); index(MAP.NEW, NW, "NEW"); index(MAP.NEW_LGD, NW, "NEW_LGD");
Object.keys(AL).forEach((key) => AL[key].forEach((v, n) => { if (NW[key] && NW[key].has(n)) problems.push("एक ही ज़िला ALIAS और NEW दोनों में: " + key + " / " + v.raw); }));
const NEWVALS = {}; Object.keys(NW).forEach((key) => { NEWVALS[key] = Array.from(new Set(Array.from(NW[key].values()).map((v) => v.to))); });

const LIST0 = {};   /* राज्य → मौजूदा सूची (जस की तस) */
STATES.forEach((s) => {
  if (MAP.LISTS[s.v]) { LIST0[s.v] = MAP.LISTS[s.v].slice(); return; }
  const f = DIST + "/in-" + s.v + ".js";
  if (!fs.existsSync(P(f))) die("ज़िला-सूची नहीं मिली और district_map.LISTS में भी नहीं: " + s.v);
  /* दोबारा चलाने पर भी वही नतीजा: पिछली दौड़ में जुड़े नए ज़िले हटाकर ही "मौजूदा सूची" मानी जाती है; वे नीचे उसी जगह फिर जुड़ते हैं */
  const added = NEWVALS[s.v] || [];
  LIST0[s.v] = (evalWindow(f).ACS_GEO_DISTRICTS["in-" + s.v] || []).filter((x) => added.indexOf(x) < 0);
});
const LISTN = {};   /* राज्य → नई सूची: पुरानी + नए ज़िले (नाम के क्रम में अपनी जगह) */
Object.keys(LIST0).forEach((key) => {
  const L = LIST0[key].slice();
  (NEWVALS[key] || []).slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach((name) => {
    if (LIST0[key].some((x) => norm(enOf(x)) === norm(name))) { problems.push("NEW में लिखा ज़िला सूची में पहले से है: " + key + " / " + name); return; }
    const en = name.toLowerCase(); let at = L.length;
    for (let i = 0; i < L.length; i++) if (enOf(L[i]).toLowerCase().localeCompare(en) > 0) { at = i; break; }
    L.splice(at, 0, name);
  });
  LISTN[key] = L;
});

/* ── हर (स्रोत, राज्य, ज़िला) सुलझाना ── */
const pairInfo = new Map();   /* "स्रोत|राज्य|ज़िला" → {src, st, di, key, acs, en, how, rows, code} */
function resolve(src, stRaw, diRaw, code) {
  const id = src + "|" + stRaw + "|" + diRaw; if (pairInfo.has(id)) { const x = pairInfo.get(id); x.rows++; return x; }
  const info = { src, st: stRaw, di: diRaw, key: "", acs: "", en: "", how: "", rows: 1, code: code || "" };
  if (stRaw === "NA" || stRaw === "" || diRaw === "NA" || diRaw === "") info.how = "ख़ाली";
  else {
    const key = MAP.STATE[stRaw.toUpperCase()];
    if (!key) { problems.push("राज्य नहीं सुलझा (" + src + "): " + stRaw); info.how = "राज्य?"; }
    else {
      info.key = key;
      const n = norm(diRaw), al = AL[key] && AL[key].get(n), nw = NW[key] && NW[key].get(n);
      if (al) {
        al.used++;
        const hit = LISTN[key].filter((x) => x === al.to || enOf(x) === al.to || enOf(x) === cleanEn(al.to));
        if (hit.length !== 1) problems.push(al.sec + " का निशाना ACS की सूची में " + hit.length + " बार: " + key + " / " + al.raw + " → " + al.to);
        else { info.acs = hit[0]; info.en = enOf(hit[0]); info.how = "दूसरा नाम"; }
      } else if (nw) { nw.used++; info.acs = nw.to; info.en = nw.to; info.how = "नया ज़िला"; }
      else {
        const hit = LIST0[key].filter((x) => norm(enOf(x)) === n);
        if (hit.length === 1) { info.acs = hit[0]; info.en = enOf(hit[0]); info.how = "हूबहू"; }
        else problems.push("ज़िला नहीं सुलझा (" + src + "; district_map.js में जोड़ें): " + key + " / " + diRaw);
      }
    }
  }
  pairInfo.set(id, info); return info;
}
const didOf = (info) => (info.acs ? info.key + "\u0001" + info.acs + "\u0001" + info.en : "");

/* ── 1. डाक: पिन → डाकघर ── */
const PINS = new Map();   /* pin → Map(districtId → Map(छोटे अक्षर → नाम)) */
let badPin = 0, rows = 0;
table.forEach((r) => {
  if (r.length < head.length) return; rows++;
  const pin = String(r[col.pincode]).trim();
  if (!/^[1-9]\d{5}$/.test(pin)) { badPin++; return; }
  const did = didOf(resolve("डाक", String(r[col.statename]).trim(), String(r[col.district]).trim()));
  const name = officeName(r[col.officename]); if (!name) return;
  if (!PINS.has(pin)) PINS.set(pin, new Map());
  const m = PINS.get(pin); if (!m.has(did)) m.set(did, new Map());
  const low = name.toLowerCase(); if (!m.get(did).has(low)) m.get(did).set(low, name);
});

/* ── 2. LGD: पिन → गाँव (पंचायत, प्रखंड, तहसील, ज़िला) और नगर निकाय ── */
const LT = new Map(), LD = new Map(), LS = new Map(), LB = new Map();
const LP = new Map();   /* pin → { u: Map, g: Map(समूह → {did, sd, b, gp: Map(पंचायत → Map(छोटे अक्षर → गाँव))}) } */
const lgdPin = (pin) => { let o = LP.get(pin); if (!o) { o = { u: new Map(), g: new Map() }; LP.set(pin, o); } return o; };
const UTYPE = {}; let villages = 0, villageEntries = 0, urbanRows = 0, lgdSubUsed = 0;
const subOver = (key, dName, sdName) => { const a = MAP.LGD_SUB && MAP.LGD_SUB[key], b = a && a[dName]; return (b && b[sdName]) || ""; };
lgdBuf.toString("utf8").split("\n").forEach((line) => {
  if (!line) return; const r = line.split("\t");
  if (r[0] === "T") LT.set(r[1], r[2]);
  else if (r[0] === "D") { const st = LT.get(r[2]); if (!st) die("LGD: ज़िले " + r[1] + " का राज्य नहीं मिला"); LD.set(r[1], { st, name: r[3], info: resolve("LGD", st, r[3], r[1]) }); }
  else if (r[0] === "S") LS.set(r[1], { d: r[2], name: placeName(r[3]) });
  else if (r[0] === "B") LB.set(r[1], placeName(r[2]));
  else if (r[0] === "U") {
    const t = r[5].toLowerCase().replace(/\s*\(\s*/g, " (").replace(/(^|[\s(])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/^Nct /, "NCT ");
    UTYPE[t] = (UTYPE[t] || 0) + 1; urbanRows++;
    const nm = placeName(r[4]); lgdPin(r[1]).u.set((nm + "|" + t).toLowerCase(), { n: nm + "|" + t, st: MAP.STATE[String(r[6]).toUpperCase()] || "" });
  } else if (r[0] === "V") {
    const sd = LS.get(r[3]); if (!sd) die("LGD: गाँव " + r[2] + " की तहसील नहीं मिली");
    const D = LD.get(sd.d); if (!D) die("LGD: तहसील " + r[3] + " का ज़िला नहीं मिला");
    let info = D.info; const ov = subOver(info.key, D.name, sd.name);
    if (ov) { if (LISTN[info.key].indexOf(ov) < 0) die("LGD_SUB का ज़िला सूची में नहीं: " + ov); info = { key: info.key, acs: ov, en: enOf(ov) }; lgdSubUsed++; }
    const did = didOf(info), name = placeName(r[6]); if (!name) return;
    villages++;
    const pairs = r[7] ? r[7].split(";") : [":"];
    pairs.forEach((pr) => {
      const c = pr.indexOf(":"), bc = pr.slice(0, c), gp = placeName(pr.slice(c + 1));
      const b = bc ? LB.get(bc) : ""; if (bc && b === undefined) die("LGD: प्रखंड " + bc + " का नाम नहीं मिला");
      const gk = did + "\u0002" + sd.name + "\u0002" + (b || "");
      const o = lgdPin(r[1]); let g = o.g.get(gk); if (!g) { g = { did, sd: sd.name, b: b || "", gp: new Map() }; o.g.set(gk, g); }
      let vs = g.gp.get(gp); if (!vs) { vs = new Map(); g.gp.set(gp, vs); }
      const low = name.toLowerCase(); if (!vs.has(low)) { vs.set(low, name); villageEntries++; }
    });
  }
});

/* नगर-सूची की छँटाई। LGD की «pincode_urban» में कुछ पिन पर पूरे राज्य के दर्जनों नगर निकाय दर्ज हैं (ग़लत भराई;
   जैसे पिन 313325 पर राजस्थान के 214 निकाय)। नियम:
   (क) एक पिन पर TOWN_MAX से ज़्यादा निकाय हों, तो उस पिन की नगर-सूची नहीं ली जाती;
   (ख) निकाय का राज्य उस पिन के डाक वाले राज्य से न मिले, तो वह निकाय नहीं लिया जाता।
   स्रोत नहीं बदलता; गिनती meta.json में जाती है। */
const TOWN_MAX = 3; let townPinsDropped = 0, townRowsDropped = 0, townStateDropped = 0;
Array.from(LP.keys()).forEach((pin) => {
  const o = LP.get(pin);
  if (o.u.size > TOWN_MAX) { townPinsDropped++; townRowsDropped += o.u.size; o.u.clear(); }
  else if (o.u.size && PINS.has(pin)) {
    const st = new Set(); PINS.get(pin).forEach((v, did) => { if (did) st.add(did.split("\u0001")[0]); });
    if (st.size) o.u.forEach((u, k) => { if (u.st && !st.has(u.st)) { o.u.delete(k); townStateDropped++; } });
  }
  if (!o.u.size && !o.g.size) LP.delete(pin);
});

/* ALIAS/NEW/LGD_SUB की हर पंक्ति काम आई हो (बासी पंक्ति = अगला होल) */
[AL, NW].forEach((T) => Object.keys(T).forEach((key) => T[key].forEach((v) => { if (!v.used) problems.push(v.sec + " की पंक्ति किसी स्रोत में नहीं मिली (बासी): " + key + " / " + v.raw); })));
if (MAP.LGD_SUB && !lgdSubUsed) problems.push("LGD_SUB की कोई पंक्ति काम नहीं आई (बासी)");
if (problems.length) { console.error(Array.from(new Set(problems)).map((x) => "  ✗ " + x).join("\n")); die(new Set(problems).size + " गड़बड़ी; कुछ नहीं लिखा गया।"); }

/* ── 3. डाक के टुकड़े ── */
const files = new Map();   /* पथ → पाठ */
const shards = new Map(); let multiD = 0, multiS = 0, unknownPins = 0, offices = 0;
const IPD = new Map();   /* pin → Set(ज़िले की पहचान); मिलान के लिए */
Array.from(PINS.keys()).sort().forEach((pin) => {
  const m = PINS.get(pin), pre = pin.slice(0, 3);
  if (!shards.has(pre)) shards.set(pre, { d: [], di: new Map(), p: {} });
  const sh = shards.get(pre);
  /* जिन डाकघरों का ज़िला ख़ाली है: अगर पिन का सिर्फ़ एक ही जाना हुआ ज़िला है, तो वे उसी में गिने जाते हैं */
  const known = Array.from(m.keys()).filter((k) => k !== "");
  if (m.has("") && known.length === 1) { const tgt = m.get(known[0]); m.get("").forEach((v, k) => { if (!tgt.has(k)) tgt.set(k, v); }); m.delete(""); }
  const groups = Array.from(m.keys()).map((did) => ({ did, names: Array.from(m.get(did).values()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) }))
    .sort((a, b) => (a.did === "" ? 1 : 0) - (b.did === "" ? 1 : 0) || b.names.length - a.names.length || a.did.localeCompare(b.did));
  const k2 = groups.filter((g) => g.did !== "");
  IPD.set(pin, new Set(k2.map((g) => g.did)));
  if (!k2.length) unknownPins++;
  if (k2.length > 1) multiD++;
  if (new Set(k2.map((g) => g.did.split("\u0001")[0])).size > 1) multiS++;
  sh.p[pin.slice(3)] = groups.map((g) => {
    let idx = -1;
    if (g.did !== "") { if (!sh.di.has(g.did)) { sh.di.set(g.did, sh.d.length); sh.d.push(g.did.split("\u0001")); } idx = sh.di.get(g.did); }
    offices += g.names.length; return [idx, g.names.join("|")];
  });
});
let maxShard = 0, totalBytes = 0;
Array.from(shards.keys()).sort().forEach((pre) => {
  const sh = shards.get(pre), s = {};
  sh.d.forEach((x) => { s[x[0]] = [STHI[x[0]], stateEn(x[0])]; });
  const txt = JSON.stringify({ v: 1, s, d: sh.d, p: sh.p }) + "\n";
  files.set(OUT + "/" + pre + ".json", txt); maxShard = Math.max(maxShard, Buffer.byteLength(txt)); totalBytes += Buffer.byteLength(txt);
});

/* ── 4. गाँव के टुकड़े (बड़ा टुकड़ा अगले अंक पर बँटता है) ── */
const byName = (a, b) => { const x = a.toLowerCase(), y = b.toLowerCase(); return x < y ? -1 : x > y ? 1 : a < b ? -1 : a > b ? 1 : 0; };
function fileText(prefix, pins) {
  const s = {}, d = [], di = new Map(), n = [], ni = new Map(), p = {};
  const nIdx = (name) => { if (name === "") return -1; if (!ni.has(name)) { ni.set(name, n.length); n.push(name); } return ni.get(name); };
  pins.forEach((pin) => {
    const o = LP.get(pin), out = {};
    if (o.u.size) out.u = Array.from(o.u.values()).map((x) => x.n).sort(byName);
    if (o.g.size) out.g = Array.from(o.g.values()).sort((a, b) => byName(a.did, b.did) || byName(a.sd, b.sd) || byName(a.b, b.b)).map((g) => {
      if (!di.has(g.did)) { di.set(g.did, d.length); const t = g.did.split("\u0001"); d.push(t); s[t[0]] = [STHI[t[0]], stateEn(t[0])]; }
      const flat = []; Array.from(g.gp.keys()).sort(byName).forEach((gp) => { flat.push(gp, Array.from(g.gp.get(gp).values()).sort(byName).join("|")); });
      return [di.get(g.did), nIdx(g.sd), nIdx(g.b), flat];
    });
    p[pin.slice(prefix.length)] = out;
  });
  return JSON.stringify({ v: 1, s, d, n, p }) + "\n";
}
let vFiles = 0, vStubs = 0, vMax = 0, vBytes = 0; const vDepth = { 3: 0, 4: 0, 5: 0, 6: 0 };
function emit(prefix, pins) {
  const txt = fileText(prefix, pins), size = Buffer.byteLength(txt);
  if (size <= LIMIT || prefix.length >= 6) { files.set(OUTV + "/" + prefix + ".json", txt); vFiles++; vDepth[prefix.length] += pins.length; vMax = Math.max(vMax, size); vBytes += size; return; }
  const stub = JSON.stringify({ v: 1, x: prefix.length + 1 }) + "\n";
  files.set(OUTV + "/" + prefix + ".json", stub); vStubs++; vBytes += Buffer.byteLength(stub);
  const kids = new Map(); pins.forEach((pin) => { const k = pin.slice(0, prefix.length + 1); if (!kids.has(k)) kids.set(k, []); kids.get(k).push(pin); });
  Array.from(kids.keys()).sort().forEach((k) => emit(k, kids.get(k)));
}
{ const by3 = new Map(); Array.from(LP.keys()).sort().forEach((pin) => { const k = pin.slice(0, 3); if (!by3.has(k)) by3.set(k, []); by3.get(k).push(pin); });
  Array.from(by3.keys()).sort().forEach((k) => emit(k, by3.get(k))); }

/* ── 5. दोनों स्रोतों का मिलान (कुछ बदला नहीं जाता; सिर्फ़ गिना और लिखा जाता है) ── */
const MILAN = { both_same: 0, both_lgd_inside_post: 0, both_post_inside_lgd: 0, both_overlap: 0, both_different: 0, only_post: 0, only_lgd: 0, post_without_district: 0 };
const milanRows = []; let lgdPinsWithVillages = 0, lgdPinsUrbanOnly = 0;
const showD = (set) => Array.from(set).map((x) => { const t = x.split("\u0001"); return t[2] + " (" + stateEn(t[0]) + ")"; }).sort().join(" ; ");
const allPins = new Set(Array.from(PINS.keys()).concat(Array.from(LP.keys())));
Array.from(allPins).sort().forEach((pin) => {
  const a = IPD.get(pin), o = LP.get(pin), b = o && o.g.size ? new Set(Array.from(o.g.values()).map((g) => g.did)) : null;
  if (o) { if (o.g.size) lgdPinsWithVillages++; else lgdPinsUrbanOnly++; }
  let cls;
  if (a && !b) cls = a.size ? "only_post" : "post_without_district";
  else if (!a && b) cls = "only_lgd";
  else if (!a && !b) return;   /* सिर्फ़ नगर निकाय वाला पिन, डाक में नहीं */
  else if (!a.size) cls = "post_without_district";
  else {
    const inA = Array.from(b).every((x) => a.has(x)), inB = Array.from(a).every((x) => b.has(x));
    cls = inA && inB ? "both_same" : inA ? "both_lgd_inside_post" : inB ? "both_post_inside_lgd" : Array.from(b).some((x) => a.has(x)) ? "both_overlap" : "both_different";
  }
  MILAN[cls]++;
  if (cls !== "both_same" && cls !== "only_post") milanRows.push([pin, cls, a ? showD(a) : "", b ? showD(b) : ""].join("\t"));
});

/* ── 6. meta और ज़िला-सूचियाँ ── */
const newD = []; Object.keys(LISTN).sort().forEach((k) => { LISTN[k].forEach((x) => { if (LIST0[k].indexOf(x) < 0) newD.push(k + ": " + x); }); });
const distAll = Object.keys(LISTN).reduce((t, k) => t + LISTN[k].length, 0);
const META = { v: 2,
  india_post: { source: "India Post pincode directory (file given by the Founder on 26-Nov-2026)", sha256: SHA, rows, pins: PINS.size, shards: shards.size, offices,
    districts: new Set(Array.from(pairInfo.values()).filter((x) => x.src === "डाक" && x.acs).map(didOf)).size, pinsWithTwoDistricts: multiD, pinsWithoutDistrict: unknownPins },
  lgd: { source: "Local Government Directory (Ministry of Panchayati Raj); files given by the Founder", date: LGD_INFO.date, files: Object.keys(LGD_INFO.files).sort().map((k) => ({ name: LGD_INFO.files[k].name, sha256: LGD_INFO.files[k].sha256, rows: LGD_INFO.files[k].rows })),
    districts: LD.size, pins: LP.size, pinsWithVillages: lgdPinsWithVillages, pinsWithTownOnly: lgdPinsUrbanOnly, villages, townRows: urbanRows, files_out: vFiles + vStubs, biggestFileBytes: vMax },
  districtsInLists: distAll, newDistricts: newD.length, match: MILAN,
  townsLeftOut: { pinsWithTooManyTowns: townPinsDropped, rowsOnThosePins: townRowsDropped, rowsFromAnotherState: townStateDropped } };
files.set(OUT + "/meta.json", JSON.stringify(META, null, 1) + "\n");
STATES.forEach((s) => { files.set(DIST + "/in-" + s.v + ".js", 'window.ACS_GEO_DISTRICTS=window.ACS_GEO_DISTRICTS||{};window.ACS_GEO_DISTRICTS["in-' + s.v + '"]=' + JSON.stringify(LISTN[s.v]) + ";\n"); });

/* ── जाँच या लिखना ── */
const stale = [], extra = [];
files.forEach((txt, f) => { if (!fs.existsSync(P(f)) || fs.readFileSync(P(f), "utf8").replace(/\r\n/g, "\n") !== txt) stale.push(f); });
[OUT, OUTV].forEach((dir) => { if (fs.existsSync(P(dir))) fs.readdirSync(P(dir)).forEach((f) => { if (!files.has(dir + "/" + f)) extra.push(dir + "/" + f); }); });
(MAP.ORPHANS || []).forEach((f) => { if (fs.existsSync(P(DIST + "/" + f))) extra.push(DIST + "/" + f); });
fs.readdirSync(P(DIST)).forEach((f) => { if (/^in-/.test(f) && !files.has(DIST + "/" + f) && extra.indexOf(DIST + "/" + f) < 0) extra.push(DIST + "/" + f); });
if (arg("--report")) {
  const dir = path.resolve(arg("--report")); fs.mkdirSync(dir, { recursive: true });
  const lines = ["स्रोत\tराज्य\tस्रोत में ज़िले का नाम\tLGD code\tACS की सूची का नाम\tEnglish नाम\tकैसे मिला\tपंक्तियाँ"];
  Array.from(pairInfo.values()).sort((a, b) => byName(a.key + a.en + a.src, b.key + b.en + b.src)).forEach((x) => { lines.push([x.src, x.st, x.di, x.code, x.acs, x.en, x.how, x.src === "LGD" ? "" : x.rows].join("\t")); });
  fs.writeFileSync(path.join(dir, "zila-milan.tsv"), lines.join("\n") + "\n");
  fs.writeFileSync(path.join(dir, "pin-milan.tsv"), ["पिन\tफ़र्क़ का प्रकार\tडाक-सूची के ज़िले\tLGD के ज़िले"].concat(milanRows).join("\n") + "\n");
  fs.writeFileSync(path.join(dir, "naye-zile.tsv"), ["राज्य\tनया ज़िला"].concat(newD.map((x) => x.replace(": ", "\t"))).join("\n") + "\n");
  fs.writeFileSync(path.join(dir, "nagar-prakar.tsv"), ["नगर निकाय का प्रकार\tपंक्तियाँ"].concat(Object.keys(UTYPE).sort().map((k) => k + "\t" + UTYPE[k])).join("\n") + "\n");
}
const sum = "डाक: पंक्तियाँ " + rows + " · पिन " + PINS.size + " · टुकड़े " + shards.size + " (सबसे बड़ा " + Math.round(maxShard / 1024) + " KB, कुल " + (totalBytes / 1048576).toFixed(1) + " MB) · डाकघर " + offices +
  " · दो ज़िलों वाले पिन " + multiD + " · दो राज्यों वाले " + multiS + " · बिना ज़िले के पिन " + unknownPins + (badPin ? " · ग़लत पिन-पंक्तियाँ " + badPin : "") +
  "\n   गाँव (LGD " + LGD_INFO.date + "): पिन " + LP.size + " · गाँव " + villages + " · फ़ाइलें " + (vFiles + vStubs) + " (सबसे बड़ी " + Math.round(vMax / 1024) + " KB, कुल " + (vBytes / 1048576).toFixed(1) + " MB; अंक 3/4/5/6 पर पिन " + [3, 4, 5, 6].map((k) => vDepth[k]).join("/") + ")" +
  "\n   ज़िले: सूची में " + distAll + " (नए " + newD.length + ") · मिलान: एक-जैसे " + MILAN.both_same + " · LGD कम " + MILAN.both_lgd_inside_post + " · डाक कम " + MILAN.both_post_inside_lgd + " · कुछ साझा " + MILAN.both_overlap +
  " · बिल्कुल अलग " + MILAN.both_different + " · सिर्फ़ डाक " + MILAN.only_post + " · सिर्फ़ LGD " + MILAN.only_lgd +
  "\n   नगर-सूची से बाहर: " + townPinsDropped + " पिन (उन पर " + townRowsDropped + " पंक्तियाँ; एक पिन पर " + TOWN_MAX + " से ज़्यादा निकाय) · दूसरे राज्य की " + townStateDropped + " पंक्तियाँ";
if (CHECK) {
  if (stale.length || extra.length) { console.error("⛔ पिन-घर बासी है: " + stale.length + " फ़ाइलें अलग, " + extra.length + " फ़ालतू। चलाएँ: node generator/build_pin_data.js\n" + stale.concat(extra).slice(0, 12).map((x) => "  " + x).join("\n")); process.exit(1); }
  console.log("🏁 build_pin_data --check: " + files.size + " फ़ाइलें ताज़ा हैं\n   " + sum); process.exit(0);
}
fs.mkdirSync(P(OUT), { recursive: true }); fs.mkdirSync(P(OUTV), { recursive: true });
stale.forEach((f) => fs.writeFileSync(P(f), files.get(f)));
extra.forEach((f) => fs.unlinkSync(P(f)));
console.log("🏁 build_pin_data v1.1: " + stale.length + " फ़ाइलें लिखीं, " + extra.length + " हटाईं (कुल " + files.size + ")\n   " + sum);
if (newD.length) console.log("   नए ज़िले (" + newD.length + "): " + newD.join(" · "));
