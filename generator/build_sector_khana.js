/* ============================================================
   build_sector_khana.js v1.0 (परत-4, 26-Nov-2026, खेप सेक्टर-नियम v1.1)
   काम: assets/roles.js में रजिस्ट्रेशन का «सेक्टर» खाना (F.sector) बनाना, और पक्का करना कि वह
        सातों भूमिकाओं के फ़ॉर्म में लगा है।
   Founder का आदेश (26-Nov-2026): उस्ताद, शिक्षक, सलाहकार, केंद्र, वर्कशॉप, नियोक्ता और Vendor को
        रजिस्ट्रेशन के समय कम से कम एक सेक्टर बताना होगा।
   मान = सेक्टर का कूट ("1" से "25"); नाम का घर assets/mg_names.js (हिंदी n, English en; 25 = MG_NONE)।
   roles.js में नामों की यह प्रति क्यों: server हर आवेदन पर live roles.js अकेले चलाता है (mg_names.js के बिना),
        इसलिए विकल्प roles.js के भीतर ही होने चाहिए। यह प्रति हाथ की नहीं, इसी generator की बनाई है;
        जाँच-यंत्र इसे mg_names.js से मिलाता है।
   चलाना:  node generator/build_sector_khana.js          (लिखता है)
           node generator/build_sector_khana.js --check  (सिर्फ़ जाँच)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "assets", "roles.js");
const CHECK = process.argv.includes("--check");
const stop = (m) => { console.error("⛔ build_sector_khana: " + m); process.exit(1); };
/* जिन भूमिकाओं को सेक्टर बताना ज़रूरी है (Founder की सूची) */
const ROLES = ["teacher", "ustad", "center", "workshop", "counselor", "employer", "vendor"];
const START = "    /* SECTOR-KHANA:START (generator/build_sector_khana.js से बना; हाथ से न बदलें) */";
const END = "    /* SECTOR-KHANA:END */";
const ANCHOR = "\n    return [\n      /* ---------------- समूह-1 : Learner";
const LABEL = { hi: "आपके काम का सेक्टर", en: "Sector of your work" };
const HINT = { hi: "वह सेक्टर चुनें जिसमें आपका सबसे ज़्यादा काम है। कोई न बैठे, तो सबसे नीचे «उपरोक्त में कोई नहीं» चुनें।",
  en: "Choose the sector where most of your work is. If none fits, choose \"None of the above\" at the bottom." };

function region() {
  const w = {}; new Function("window", fs.readFileSync(path.join(ROOT, "assets/mg_names.js"), "utf8"))(w);
  const MG = w.MG_NAMES, N = w.MG_NONE;
  if (!MG || Object.keys(MG).length !== 24 || !N || N.id !== 25) stop("mg_names.js में 24 सेक्टर और MG_NONE (25) नहीं");
  const q = (s) => JSON.stringify(String(s)), rows = [];
  for (let g = 1; g <= 24; g++) { if (!MG[g].n || !MG[g].en) stop("सेक्टर " + g + " का नाम अधूरा"); rows.push('{v:"' + g + '",hi:' + q(MG[g].n) + ",en:" + q(MG[g].en) + "}"); }
  rows.push('{v:"25",hi:' + q(N.n) + ",en:" + q(N.en) + "}");
  const lines = []; for (let i = 0; i < rows.length; i += 3) lines.push("        " + rows.slice(i, i + 3).join(", "));
  return [START,
    "    /* रजिस्ट्रेशन का «सेक्टर» खाना (Founder, 26-Nov-2026): " + ROLES.join(", ") + " को जुड़ते समय कम से कम",
    "       एक सेक्टर बताना ज़रूरी। मान = सेक्टर का कूट (\"1\" से \"25\"); नाम का घर assets/mg_names.js। */",
    "    F.sector = { id:\"sector\", type:\"select\", required:true, hi:" + q(LABEL.hi) + ", en:" + q(LABEL.en) + ",",
    "      hint_hi:" + q(HINT.hi) + ",",
    "      hint_en:" + q(HINT.en) + ",",
    "      options:[", lines.join(",\n") + " ] };",
    END].join("\n") + "\n";
}

let src = fs.readFileSync(FILE, "utf8"); const before = src, body = region();
if (src.includes(START)) {
  if (src.split(START).length !== 2 || src.split(END).length !== 2) stop("START/END ठीक एक-एक बार नहीं");
  const a = src.indexOf(START), b = src.indexOf(END) + END.length + 1;
  src = src.slice(0, a) + body + src.slice(b);
} else {
  if (src.split(ANCHOR).length !== 2) stop("roles.js में जगह (return [ … Learner) ठीक एक बार नहीं मिली");
  src = src.replace(ANCHOR, "\n" + body + ANCHOR);
}
/* सातों भूमिकाओं के फ़ॉर्म में F.sector (नाम के ठीक बाद), ठीक एक-एक बार */
for (const k of ROLES) {
  const key = '{ key:"' + k + '", group:"g2"';
  if (src.split(key).length !== 2) stop("भूमिका की जगह ठीक एक बार नहीं मिली: " + k);
  const a = src.indexOf(key), nx = src.indexOf('{ key:"', a + 10), card = src.slice(a, nx < 0 ? src.length : nx);
  const f0 = "fields: [ F.nameLocal, F.nameRoman,";
  if (card.split(f0).length !== 2) stop("भूमिका " + k + " की fields-पंक्ति ठीक एक बार नहीं मिली");
  const has = (card.match(/F\.sector\b/g) || []).length;
  if (has > 1) stop("भूमिका " + k + " में F.sector एक से ज़्यादा बार");
  if (has === 0) { const at = a + card.indexOf(f0) + f0.length; src = src.slice(0, at) + " F.sector," + src.slice(at); }
}
/* पहरा: फ़ाइल चले, और सातों में खाना, बाक़ी किसी में नहीं */
const w2 = {}; try { new Function("window", src)(w2); } catch (e) { stop("बनी हुई roles.js नहीं चली: " + e.message); }
const cards = w2.ACS_ROLES.cards, withS = cards.filter((c) => (c.fields || []).some((f) => f.id === "sector")).map((c) => c.key).sort();
if (withS.join(",") !== ROLES.slice().sort().join(",")) stop("सेक्टर-खाना इन भूमिकाओं में मिला: " + withS.join(",") + " (चाहिए: " + ROLES.join(",") + ")");
for (const c of cards) { const f = (c.fields || []).filter((x) => x.id === "sector"); if (f.length > 1) stop(c.key + ": सेक्टर-खाना दो बार");
  if (f.length && (f[0].options.length !== 25 || f[0].required !== true || f[0].options.some((o, i) => o.v !== String(i + 1)))) stop(c.key + ": सेक्टर-खाने के विकल्प ठीक 25 और कूट 1 से 25 नहीं"); }
if (CHECK) { if (src !== before) stop("--check: assets/roles.js का सेक्टर-खाना बासी है (generator चलाएँ)"); console.log("🏁 --check पास: assets/roles.js में सेक्टर-खाना ताज़ा है (" + ROLES.length + " भूमिकाएँ, 25 विकल्प)।"); }
else { if (src === before) console.log("✅ पहले जैसा: assets/roles.js"); else { fs.writeFileSync(FILE, src); console.log("✅ लिखा: assets/roles.js (" + before.length + " → " + src.length + " अक्षर)"); }
  console.log("🏁 build_sector_khana v1.0 (" + ROLES.length + " भूमिकाएँ: " + ROLES.join(", ") + ")"); }
