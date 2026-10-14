/* काम-खेमा-र build v1.0 (14-Oct-2026) — gen_khema_ya core + परिवार-नियम →
   assets/kkb_<c>_data.js व kkb2_<c>_data.js (25 Latin भाषाएँ, बहन-pivot विधि)।
   चलाना: node generator/build_khema_ya.js <ROOT> <OUT> [code...]
   फ़ेल-क्लोज़्ड: हर भाषा का अपरिवर्तित-token bag छपता है — बड़े बचे token = नियम जोड़ो। */
"use strict";
const G = require("./gen_khema_ya.js");
const { fs, path, ROOT, OUT, ONLY, M1, M2, loadPivot, makeDialLat, makeG2P, makeAudit } = G;

const LANGS = Object.assign({},
  safeReq("./langs_r_italic.js"),
  safeReq("./langs_r_madag.js"),
  safeReq("./langs_r_bantu.js"),
  safeReq("./langs_r_phil.js"),
  safeReq("./langs_r_pacif.js"),
  safeReq("./langs_r_india.js"),
  safeReq("./langs_r_misc.js")
);
function safeReq(f) { try { return require(f); } catch (e) { return {}; } }

function hiSwap(L) {
  const names = (L.pivotHiNames || []).concat(["अंग्रेज़ी", "English"]);
  const res = names.map(n => [new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), L.label]);
  return s => { s = String(s); res.forEach(([re, to]) => { s = s.replace(re, to); }); return s; };
}

function buildLang(code) {
  const L = LANGS[code];
  if (!L) throw new Error("अनजान कोड: " + code);
  const { P1, P2 } = loadPivot(L.pivot);
  const dial = makeDialLat(L), pron = makeG2P(L.g2p), audit = makeAudit(L);
  const bag = {};
  const T = s => { const o = dial(String(s)); audit(s, o, bag); return o; };
  const HS = hiSwap(L);
  /* पुरानी लक्ष्य-फ़ाइल से lang (tts/sr) सुरक्षित */
  let oldLang = { tts: L.tts || code, sr: L.sr || L.tts || code };
  try { oldLang = G.loadWin("assets/kkb_" + code + "_data.js").KKB_DATA.lang || oldLang; } catch (e) { }
  const langObj = { code, label: L.label, tts: oldLang.tts || code, sr: oldLang.sr || oldLang.tts || code, script: "latin" };
  const vtxt = "2.0 (14-Oct-2026) — पूर्ण-पुनर्लेखन (काम-खेमा-र): बहन-pivot नियम-रूपांतरण (AI-draft); गिनती मशीन से देखें";
  const disc = "यह content Claude AI से " + L.en + " में रूपांतरित है — native-भाषी से अभी सत्यापित नहीं। विशेषज्ञ-समीक्षा बाक़ी।";

  const TP = s => { const o = T(s); return [o, pron(o)]; };
  const strip = (s, p) => String(s).replace(p, "");

  /* ---------- L1 (pivot-P1 की चाल, hi मास्टर-M1 से) ---------- */
  const L1 = {
    module: "ACS काम की भाषा — " + L.en + " for Work",
    version: vtxt + " (dev_kkb_check)", ai_disclaimer: disc,
    lang: langObj, brand: "ACS काम की भाषा",
    sub: L.en + " (" + L.label + ") for Work — " + L.region,
    help: P1.help.map(h => TP(h[0])),
    testShort: "अपने trainer या किसी " + L.label + "-भाषी साथी को video call करके " + L.label + " में बात करें।",
    testStep1: "call कीजिए (WhatsApp/ACS वाणी से video call) — किसी असली इंसान से, screen देखे बिना।",
    testStep2: "<b>शुरुआत " + L.label + " में कीजिए।</b>",
    check1: "पूरी बात " + L.label + " में रखने की कोशिश की",
    weeks: P1.weeks.map((w, wi) => ({
      n: w.n, title: w.title, hi: w.hi,
      days: w.days.map((d, di) => ({
        title: d.title,
        items: d.items.map((it, i) => {
          const m = M1.weeks[wi].days[di].items[i];
          const [t, p] = TP(it[0]);
          return [t, p, HS(m[2]), m[3]];
        })
      })),
      test: {
        target: w.test.target, goal: HS(w.test.goal),
        lines: w.test.lines.map(l => TP(l[0]))
      }
    }))
  };

  /* ---------- L2 (pivot-P2 की चाल, hi मास्टर-M2 से) ---------- */
  const L2 = {
    heroTitle: L.heroTitle, heroSub: L.label + " बोलने का पूरा कोर्स — एक ही जगह, स्तर 1 + 2",
    module: L.heroTitle + " — " + L.label + " बोलने का प्रमाणपत्र कोर्स (स्तर-2)",
    level: HS(String(P2.level || "")),
    version: vtxt + " (dev_kkb2_check)", ai_disclaimer: disc,
    lang: langObj, brand: "ACS काम की भाषा", sub: L.label + " स्तर-2 (A2)",
    help: P2.help.map(h => TP(h[0])),
    weeks: P2.weeks.map((w, wi) => ({
      n: w.n, title: w.title, hi: w.hi, pace: w.pace,
      days: w.days.map((d, di) => ({
        title: d.title,
        tw: (d.tw || []).map((t, i) => {
          const m = (M2.weeks[wi].days[di].tw || [])[i] || t;
          const [a, p] = TP(t[0]);
          return [a, p, HS(m[2]), m[3]];
        }),
        drill: d.drill ? {
          type: d.drill.type, hi: d.drill.hi,
          rows: (d.drill.rows || []).map(row => Array.isArray(row) ? row.map(el => T(el)) : T(row))
        } : undefined,
        items: d.items.map((it, i) => {
          const m = M2.weeks[wi].days[di].items[i];
          const [t, p] = TP(it[0]);
          const o = [t, p, HS(m[2]), m[3]];
          if (m.length > 4) o.push(m[4]);
          return o;
        })
      })),
      test: {
        target: w.test.target, goal: HS(w.test.goal),
        lines: w.test.lines.map(l => TP(l[0]))
      },
      listen: (w.listen || []).map(p2 => {
        const q = T(strip(p2[0], /^\(सुनो\)\s*/));
        const a = T(strip(p2[1], /^\(बोलो\)\s*/));
        return ["(सुनो) " + q, "(बोलो) " + a];
      }),
      dialog: (w.dialog || []).map(p2 => [p2[0], T(p2[1])])
    }))
  };

  /* ---------- फ़ाइल-लेखन ---------- */
  const hdr = lv => "/* ACS काम की भाषा — " + L.label + " (" + code + ") स्तर-" + lv + " data | v2.0 (14-Oct-2026)\n" +
    "   पूर्ण-पुनर्लेखन (काम-खेमा-र): बहन-pivot (" + L.pivot + ") नियम-रूपांतरण — AI-draft (🟡);\n" +
    "   हिंदी-स्तंभ English मास्टर से हूबहू (भाषा-नाम छूट)। गिनती मशीन से देखें (dev_kkb" + (lv === 2 ? "2" : "") + "_check)। */\n";
  fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "assets", "kkb_" + code + "_data.js"), hdr(1) + "window.KKB_DATA = " + JSON.stringify(L1) + ";\n");
  fs.writeFileSync(path.join(OUT, "assets", "kkb2_" + code + "_data.js"), hdr(2) + "window.KKB2_DATA = " + JSON.stringify(L2) + ";\n");

  /* नाप: बचे pivot-token (फ़ेल-क्लोज़्ड सूची) + ¿?-G2P छेद */
  let holes = 0;
  const scanP = o => { if (typeof o === "string") { if (o.indexOf("¿") >= 0) holes++; } else if (Array.isArray(o)) o.forEach(scanP); else if (o && typeof o === "object") Object.values(o).forEach(scanP); };
  scanP(L1); scanP(L2);
  const top = Object.entries(bag).sort((a, b) => b[1] - a[1]);
  const left = top.reduce((s, x) => s + x[1], 0);
  return { code, name: L.label, left, holes, top: top.slice(0, 30), all: top };
}

const codes = ONLY.length ? ONLY : Object.keys(LANGS);
codes.forEach(c => {
  const r = buildLang(c);
  console.log("== " + r.code + " (" + r.name + ") == बचे-token:" + r.left + " · G2P-छेद:" + r.holes);
  if (process.env.KY_DUMP) fs.writeFileSync('/tmp/kr_bag_' + r.code + '.json', JSON.stringify(r.all));
  console.log("   शीर्ष:", r.top.map(x => x[0] + "×" + x[1]).join(" "));
});
