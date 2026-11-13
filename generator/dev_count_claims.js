/* ============================================================
   dev_count_claims.js v1.0 (09-Nov-2026) — career-पेज के बड़े आँकड़ों
   की deterministic मशीन-गिनती (ChatGPT deep-audit #4/#5 का जवाब)।
   गिनता है:
     (1) प्रश्न-भंडार = aptitude_data.js का आधार + apt_sets/ के सब shards
     (2) उद्यम-श्रेणियाँ = udyam_data.js की प्रविष्टियाँ
   लिखता है: generator/data/apt_counts.json — build_landing4.js इसी से
   पेज के अंक भरता/जाँचता है (hard-code निषिद्ध)।
   चलाना:  node generator/dev_count_claims.js [ASSETS_DIR]
   ASSETS_DIR default = ../assets (repo-ढाँचा); audit-zip में audit/ दें।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const ASSETS = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, "assets");

function runJs(file, win) {
  const src = fs.readFileSync(file, "utf8");
  new Function("window", "self", src)(win, win);
}

const win = { APT_POOL: [] };
/* आधार-फ़ाइल: 48 आधार-प्रश्न + pool-नक़्शा */
runJs(path.join(ASSETS, "aptitude_data.js"), win);
const baseQuestions = ((win.APT_DATA && (win.APT_DATA.questions || win.APT_DATA.q)) || []);
const baseQ = baseQuestions.length;

/* pool-नक़्शे से सब shard चलाओ */
const dataSrc = fs.readFileSync(path.join(ASSETS, "aptitude_data.js"), "utf8");
const poolM = dataSrc.match(/pool:\s*(\{[\s\S]*?\}\})/);
if (!poolM) { console.log("⛔ pool-नक़्शा नहीं मिला"); process.exit(1); }
const pool = JSON.parse(poolM[1].replace(/'/g, '"'));
/* 13-Nov-2026: पूरा प्रश्न-भंडार अब repo पर नहीं है (Founder-नियम: फीस से जुड़ा content server पर)।
   भंडार की जगह: APT_BANK_DIR (environment), या office laptop का ../acs-deploy/functions/apt_bank/hi।
   भंडार इस मशीन पर न मिले तो apt_counts.json जैसा है वैसा ही रहता है। */
const BANK = process.env.APT_BANK_DIR ? path.resolve(process.env.APT_BANK_DIR) : path.join(ROOT, "..", "acs-deploy", "functions", "apt_bank", "hi");
if (!fs.existsSync(path.join(BANK, "broad.js"))) {
  console.log("ℹ️ प्रश्न-भंडार इस मशीन पर नहीं मिला (" + BANK + ")। apt_counts.json नहीं बदला गया।");
  process.exit(0);
}
const shardFiles = [pool.broad].concat(Object.keys(pool.mg).sort((a,b)=>a-b).map(k => pool.mg[k]))
  .map(p => path.join(BANK, path.basename(p)));

let shardQ = 0; const ids = new Set();
for (const q of baseQuestions) { if (q && q.id) ids.add(q.id); }
for (const f of shardFiles) {
  const before = win.APT_POOL.length;
  runJs(f, win);
  shardQ += win.APT_POOL.length - before;
}
for (const q of win.APT_POOL) { if (q && q.id) ids.add(q.id); }

/* उद्यम-गिनती */
const usrc = fs.readFileSync(path.join(ASSETS, "udyam_data.js"), "utf8");
const uwin = {};
new Function("window", "self", usrc + ';window.__U=(typeof ALL_SECTORS!=="undefined")?ALL_SECTORS:null;')(uwin, uwin);
const udy = Array.isArray(uwin.__U) ? uwin.__U.length : 0;

const total = baseQ + shardQ;
const out = {
  question_base: baseQ,
  question_shards: shardQ,
  question_total: total,
  question_unique_ids: ids.size,
  shard_files: shardFiles.length,
  udyam_total: udy,
  note: "मशीन-गिनती: dev_count_claims.js से; career-पेज के आँकड़े इसी json से भरते/जँचते हैं।"
};
fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "data", "apt_counts.json"), JSON.stringify(out, null, 1), "utf8");
console.log("🏁 गिनती:", JSON.stringify(out));
if (shardQ === 0 || udy === 0) { console.log("⛔ गिनती शून्य — ASSETS_DIR जाँचो"); process.exit(1); }
if (ids.size !== total) { console.log("⛔ question ID duplicate/missing — total:", total, "unique:", ids.size); process.exit(1); }
