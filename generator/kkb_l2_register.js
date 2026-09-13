/* kkb_l2_register.js v1.1 (13-Sep-2026) — नई KKB L2 भाषा का एक-आदेश पंजीकरण
   v1.0 (10-Sep) chatroom-sandbox में बना था पर repo पर कभी चढ़ा नहीं — इसलिए 38-भाषा zip v2.0 में generator/robot
   पंजीकरण छूट गया (SCRIPT_RULES · LNAME · PID · CFG · KKB2FAM · KKB2_CODES · KKB2_LANGS · courses/hi गिनती)।
   v1.1: पुनर्जन्म + interim-लिपि (अस्थायी देवनागरी-रूप, Founder-फ़ैसला लंबित) + वेब-जाँची अगला-स्तर कड़ी (next.v="link")।

   जन्म-कारण: हर chatroom ने 10 जगह हाथ से पंजीकरण किया और कुछ जगहें छूटीं। अब सब एक आदेश से, assert-count=1 अनुशासन से।

   चलाओ (ROOT से):
     node generator/kkb_l2_register.js <code>            → सूखा-दौर: क्या-क्या बदलेगा, दिखाए (फ़ाइल नहीं छूता)
     node generator/kkb_l2_register.js <code> --apply    → सचमुच लागू (फिर node --check + robots)
     node generator/kkb_l2_register.js <code> --skeleton → generator/work/l2_<code>_skeleton.js — English मास्टर का
                                                           दर्पण, [0]/[1] ख़ाली — इसी को भरकर assets/kkb2_<code>_data.js बने
     node generator/kkb_l2_register.js --all --apply     → pending-सूची की सब भाषाएँ (idempotent — दोबारा चलाना सुरक्षित)
   स्रोत-सूची: generator/data/kkb_l2_pending.json (एक चीज़ = एक जगह)।
   क्रम (हर नई भाषा): register --apply → skeleton भरो (13 सप्ताह) → bank: node generator/build_kkb_bank.js <code>
     → पेज: node generator/build_specials.js → robots: dev_kkb2_check · dev_kkb_check · dev_kkb_quiz_check ·
     dev_bhasha_full_check · dev_courses_page_check (सब 🏁) → zip (GitHub + office-पंक्तियाँ नीचे छपती हैं)। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const W = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, "utf8");
const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith("--"));
const APPLY = flags.includes("--apply"), SKEL = flags.includes("--skeleton"), ALL = flags.includes("--all"), NOSW = flags.includes("--no-sw");
const LIST = JSON.parse(R("generator/data/kkb_l2_pending.json"));
const codes = ALL ? LIST.map(x => x.code) : args.filter(a => !a.startsWith("--"));
if (!codes.length) { console.log("उपयोग: node generator/kkb_l2_register.js <code>|--all [--apply] [--skeleton] [--no-sw]"); process.exit(1); }
const today = (() => { const d = new Date(); return String(d.getDate()).padStart(2, "0") + "-" + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]; })();
let grandBad = 0;

function kkb2SafeLink(u, d) { return "kkb2Link(" + JSON.stringify(u) + ", " + JSON.stringify(d) + ")"; }

function registerOne(code) {
  const L = LIST.find(x => x.code === code);
  if (!L) { console.log("⛔ '" + code + "' pending-सूची में नहीं (generator/data/kkb_l2_pending.json)"); process.exit(1); }
  const edits = []; /* {file, old, neu, label} */
  const preRegistered = new RegExp("KKB2_CODES = \\{[^}]*\\b" + code + ": 1").test(R("generator/build_specials.js")); /* गिनती-छूट का फ़ैसला किसी write से पहले */
  function edit(file, old, neu, label) { edits.push({ file, old, neu, label }); }
  /* interim-लिपि: SCRIPT_RULES में अस्थायी देवनागरी-नियम + ज़ोरदार टिप्पणी (मौन-अंतर निषिद्ध — v6.3-क6) */
  const useInterim = !!L.interim_script;
  const sr = useInterim
    ? { re: "/[\\u0900-\\u097F]/", name: "Devanagari (" + L.en + ", अस्थायी)", dev0: true, devLang: true, interim: true }
    : { re: L.native_regex, name: L.script_name, dev0: L.devInItem0, devLang: L.devLang, interim: false };
  const tts = useInterim ? L.interim_tts : L.tts;

  /* ── (1) dev_kkb2_check: SCRIPT_RULES + LNAME ── */
  edit("generator/dev_kkb2_check.js", "SCRIPT_RULES = {\n",
    "SCRIPT_RULES = {\n    " + code + ": { native: " + sr.re + ', name: "' + sr.name + '", devInItem0: ' + sr.dev0 + (sr.devLang ? ", devLang: true" : "") + (sr.interim ? ", interim: true" : "") + " }, /* " + today + " kkb_l2_register: " + L.hi + " — " + (useInterim ? "⚠️ अस्थायी देवनागरी-रूप; लक्ष्य-लिपि " + L.l2_script + " (v6.3-क1) — Founder-फ़ैसला लंबित" : L.l2_script + (L.rtl ? ", RTL" : "")) + " */\n",
    "SCRIPT_RULES." + code);
  edit("generator/dev_kkb2_check.js", "var LNAME = { ", 'var LNAME = { ' + code + ': "' + L.hi + '", ', "LNAME." + code);
  /* ── (2) dev_kkb_quiz_check: PID ── */
  edit("generator/dev_kkb_quiz_check.js", "PID = { ", 'PID = { ' + code + ': "' + L.id + '", ', "PID." + code);
  /* ── (3) build_kkb_bank: CFG ── */
  edit("generator/build_kkb_bank.js", "CFG = {\n", "CFG = {\n  " + code + ': { label: "' + L.hi + '", rot: [' + L.rot.join(", ") + "], au: true }, /* " + today + " kkb_l2_register — " + (useInterim ? "देवनागरी [0]=[1] (अस्थायी)" : L.l2_script) + ", space-विभाजित, पूर्ण ROT */\n", "CFG." + code);
  /* ── (4) dev_kkb_check: KKB2FAM ── */
  edit("generator/dev_kkb_check.js", "const KKB2FAM = { ", "const KKB2FAM = { " + code + ": 1, ", "KKB2FAM." + code);
  /* ── (5) build_specials: KKB2_CODES + KKB2_LANGS ── */
  edit("generator/build_specials.js", "const KKB2_CODES = { ", "const KKB2_CODES = { " + code + ": 1, ", "KKB2_CODES." + code);
  let nextLine;
  if (L.next && L.next.v === "link")
    nextLine = "'आगे का रास्ता: कोर्स पूरा करके " + L.next.c + " — ' + " + kkb2SafeLink(L.next.u, L.next.d) + " + ' — की तैयारी (कड़ी " + today.replace(/-/, " ") + " 2026 को जाँची — शुल्क/तारीख़ आधिकारिक site से ख़ुद verify करें)। ' + KKB2_SAFE";
  else if (L.next && L.next.v === "verify")
    nextLine = "'आगे का रास्ता: " + L.hi + " की आधिकारिक परीक्षा — " + L.next.c + " — शुल्क/केंद्र/तारीख़ उनकी आधिकारिक site से ख़ुद जाँचें। ' + KKB2_SAFE";
  else
    nextLine = "'आगे का रास्ता: " + L.hi + " की कोई एक विश्व-प्रचलित A2-परीक्षा नहीं — जहाँ काम करना है, वहाँ के नियोक्ता की भाषा-माँग ख़ुद जाँचें। ' + KKB2_SAFE";
  edit("generator/build_specials.js", "const KKB2_LANGS = [\n",
    'const KKB2_LANGS = [\n  { code: "' + code + '", slug: "' + L.slug + '", en_name: "' + L.en + '", hi_name: "' + L.hi + '", /* ' + today + ' kkb_l2_register: L2 भाषा — ' + L.corridor + ', ' + (useInterim ? "अस्थायी देवनागरी-रूप" : L.l2_script) + ' */\n    next: ' + nextLine + " },\n",
    "KKB2_LANGS." + code);
  /* ── (6) courses_data: L1-प्रविष्टि → 90-दिन Certificate-रूप ── */
  {
    const s = R("assets/courses_data.js");
    const m = s.match(new RegExp('\\{[^{}]*"id": "' + L.id + '"[^{}]*\\}'));
    if (!m) { console.log("⛔ courses_data में " + L.id + " नहीं"); process.exit(1); }
    const o = JSON.parse(m[0]);
    if (!/Certificate in Spoken/.test(o.name_hi || "")) {
      const n = Object.assign({}, o, {
        name_hi: L.hi + " बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken " + L.en + ") — स्तर 1+2",
        name_en: "ACS Certificate in Spoken " + L.en + " (Level 1+2, CEFR A2 based)",
        duration: "3 माह (90 दिन)", lessons: 90 });
      const ser = "{" + Object.keys(o).map(k => JSON.stringify(k) + ": " + JSON.stringify(n[k])).join(", ") + "}";
      edit("assets/courses_data.js", m[0], ser, "courses_data " + L.id + " → 90-दिन");
    }
  }
  /* ── (7) exam_data: द्वार-प्रविष्टि (PJ018 से ठीक पहले) ── */
  edit("assets/exam_data.js", '\n  "PJ018": {', '\n  "' + L.id + '": { name: "' + L.hi + ' बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken ' + L.en + ') — प्रमाणपत्र परीक्षा (स्तर 1+2)", minLessons: 0, pass: 60, q: [] }, /* ' + today + ' kkb_l2_register */\n  "PJ018": {', "exam_data." + L.id);
  /* ── (8) dashboard: CRS_ICON · SERVER_EXAM_COURSES · EXAM_TTS ── */
  edit("assets/dashboard.js", 'PJ018:"🇬🇧",', L.id + ':"🗣️", PJ018:"🇬🇧",', "CRS_ICON." + L.id);
  edit("assets/dashboard.js", "SERVER_EXAM_COURSES = { PJ016: true,", "SERVER_EXAM_COURSES = { " + L.id + ": true, PJ016: true,", "SERVER_EXAM_COURSES." + L.id);
  edit("assets/dashboard.js", 'EXAM_TTS = { PJ018: "en-IN",', 'EXAM_TTS = { ' + L.id + ': "' + tts + '", PJ018: "en-IN",', "EXAM_TTS." + L.id);
  /* ── (9) courses/hi गिनती ── */
  {
    const s = R("courses/hi/index.html"); const m = s.match(/(\d+) भाषाओं का पूरा कोर्स/);
    if (!m) { console.log("⛔ गिनती-वाक्य नहीं मिला"); process.exit(1); }
    edit("courses/hi/index.html", m[0], (Number(m[1]) + 1) + " भाषाओं का पूरा कोर्स", "गिनती " + m[1] + "→" + (Number(m[1]) + 1));
  }
  /* ── (10) sw.js version bump ── */
  if (!NOSW) {
    const s = R("sw.js"); const m = s.match(/const CACHE_VERSION = 'v(\d+)'/);
    if (!m) { console.log("⛔ sw CACHE_VERSION नहीं मिला"); process.exit(1); }
    const nv = Number(m[1]) + 1;
    edit("sw.js", m[0], "const CACHE_VERSION = 'v" + nv + "' /* (" + today + ") " + L.hi + " (" + code + ") L2 पूर्ण: kkb2_" + code + "_data (1,650 वाक्य, 13 सप्ताह, " + L.l2_script + "+देवनागरी-उच्चारण, master-mirror) + " + L.id + " 90-दिन Certificate + " + code + "_bank — kkb_l2_register · v" + nv + " */ /* पुराना: v" + m[1] + "", "sw v" + m[1] + "→v" + nv);
  }

  /* ── सूखा-दौर / लागू ── */
  let bad = 0, applied = 0, skipped = 0;
  const byFile = {};
  edits.forEach(e => { (byFile[e.file] = byFile[e.file] || []).push(e); });
  const swMarker = "(" + code + ") L2 पूर्ण";
  Object.keys(byFile).forEach(f => {
    let s = R(f);
    byFile[f].forEach(e => {
      /* idempotent: जोड़ा-हुआ टुकड़ा पहले से मौजूद = "पहले से" (दोबारा चलाना सुरक्षित) */
      const snippet = e.neu.replace(e.old, "");
      const keyAlready = {
        "SCRIPT_RULES": new RegExp("\\n\\s*" + code + ": \\{ native:"), "LNAME": new RegExp("LNAME = \\{[^}]*\\b" + code + ': "'),
        "PID": new RegExp("PID = \\{[^}]*\\b" + code + ': "'), "CFG": new RegExp("\\n\\s*" + code + ": \\{ label:"),
        "KKB2FAM": new RegExp("KKB2FAM = \\{[^}]*\\b" + code + ": 1"), "KKB2_CODES": new RegExp("KKB2_CODES = \\{[^}]*\\b" + code + ": 1"),
        "KKB2_LANGS": new RegExp('code: "' + code + '", slug:'), "exam_data": new RegExp('"' + L.id + '": \\{'),
        "CRS_ICON": new RegExp(L.id + ':"'), "SERVER_EXAM_COURSES": new RegExp("SERVER_EXAM_COURSES = \\{[^}]*\\b" + L.id + ": true"),
        "EXAM_TTS": new RegExp("EXAM_TTS = \\{[^}]*\\b" + L.id + ': "')
      };
      const k = e.label.split(".")[0].split(" ")[0];
      let already = (snippet && s.indexOf(snippet) > -1) || (keyAlready[k] && keyAlready[k].test(s));
      if (e.label.indexOf("गिनती") === 0) already = preRegistered || R("sw.js").indexOf(swMarker) > -1;
      if (e.label.indexOf("sw v") === 0) already = s.indexOf(swMarker) > -1;
      if (already) { skipped++; console.log("ℹ️ " + f + " :: " + e.label + " — पहले से"); return; }
      const n = s.split(e.old).length - 1;
      if (n !== 1) { bad++; console.log("⛔ " + f + " :: " + e.label + " — anchor " + n + " बार (1 चाहिए)"); return; }
      applied++; console.log((APPLY ? "✏️ " : "· ") + f + " :: " + e.label);
      s = s.replace(e.old, e.neu);
    });
    if (APPLY && !bad) W(f, s);
  });
  if (bad) { console.log("⛔ " + bad + " anchor-दोष — कुछ नहीं बदला (assert-count=1)"); grandBad += bad; if (!SKEL) return; }
  console.log((APPLY ? "✅ लागू" : "🔎 सूखा-दौर") + " [" + code + "] — " + applied + " बदलाव" + (skipped ? " (" + skipped + " पहले से)" : "") + (APPLY ? "" : " (लागू: --apply)"));

  /* ── office (server-निजी) पंक्तियाँ — index.js में हाथ से/patch से ── */
  if (!ALL || APPLY) {
    console.log("📎 office functions/index.js: BANKS_BY_COURSE " + L.id + ': "./' + code + '_bank.js", · SERVER_EXAM_BANKS ' + L.id + ': { name: "' + L.hi + ' बोलने का प्रमाणपत्र कोर्स (Certificate in Spoken ' + L.en + ') — प्रमाणपत्र परीक्षा (स्तर 1+2)", total: 120, pass: 60, maxAttempts: 10 },');
  }
  if (L.note) console.log("⚠️ नोट [" + code + "]: " + L.note);

  /* ── skeleton ── */
  if (SKEL) {
    global.window = {}; require(path.join(ROOT, "assets/kkb2_data.js"));
    const M = JSON.parse(JSON.stringify(global.window.KKB2_DATA));
    M.lang = { code: code, label: L.hi, tts: tts, sr: tts, script: useInterim ? L.interim_script : L.l2_script };
    if (L.rtl && !useInterim) M.lang.rtl = true;
    if (Array.isArray(M.help)) M.help = M.help.map(h => Array.isArray(h) ? h.map((x, i) => (i <= 1 && typeof x === "string") ? "" : x) : h);
    M.version = String(M.version || "").replace(/MASTER.*$/, "") + "L2-" + code + "-skeleton (" + today + ")";
    M.module = M.module.replace(/English/g, L.en); M.sub = (M.sub || "").replace(/अंग्रेज़ी/g, L.hi).replace(/English/g, L.en);
    const blank2 = it => { if (Array.isArray(it) && typeof it[0] === "string") { it[0] = ""; if (typeof it[1] === "string") it[1] = ""; } return it; };
    (M.weeks || []).forEach(w => {
      (w.days || []).forEach(d => {
        (d.items || []).forEach(blank2); (d.tw || []).forEach(blank2);
        if (d.drill && Array.isArray(d.drill.rows)) d.drill.rows = d.drill.rows.map(r => Array.isArray(r) ? r.map(x => typeof x === "string" ? "" : x) : r);
      });
      if (w.test && Array.isArray(w.test.lines)) w.test.lines.forEach(blank2);
      if (w.test && typeof w.test.goal === "string") w.test.goal = w.test.goal.replace(/English में बताइए/g, L.hi + " में बताइए");
      const pre = x => typeof x === "string" ? (x.match(/^\((सुनो|बोलो)\)\s*/) || [""])[0] : x;
      if (Array.isArray(w.listen)) w.listen = w.listen.map(x => Array.isArray(x) ? x.map(pre) : pre(x));
      if (Array.isArray(w.dialog)) w.dialog = w.dialog.map(x => Array.isArray(x) && x.length >= 2 ? [x[0], ""] : x);
    });
    fs.mkdirSync(path.join(ROOT, "generator/work"), { recursive: true });
    const out = "generator/work/l2_" + code + "_skeleton.js";
    W(out, "// KKB स्तर-2 " + L.hi + " (" + code + "/" + L.id + ") — skeleton (" + today + ") — English मास्टर का दर्पण; [0]=" + L.l2_script + " असली लिपि, [1]=देवनागरी-उच्चारण भरो; [2] हिंदी अटल (मास्टर-दर्पण नियम v6.3-क6)\n" +
      "// भरने के बाद: assets/kkb2_" + code + "_data.js के रूप में रखो (window.KKB2_DATA=...) → node generator/dev_kkb2_check.js " + code + "\n" +
      "window.KKB2_DATA=" + JSON.stringify(M) + ";\n");
    console.log("📝 skeleton: " + out + " (GitHub पर नहीं — काम-फ़ाइल)");
  }
}

codes.forEach(registerOne);
if (grandBad) process.exit(1);
