/* build_de_ipa.js v1.0 · 24-Nov-2026 : जर्मन कोर्स (और जर्मन चित्र-पुस्तक) के हर शब्द का IPA उच्चारण, विक्षनरी से → generator/data/lipi/dhvani/de_ipa.js
   स्रोत: german-ipa-dict (devio-at, विक्षनरी Wiktionary से, CC BY-SA), जैसा ipa-dict में:
          https://raw.githubusercontent.com/open-dict-data/ipa-dict/master/data/de.txt   (787,104 पंक्तियाँ; 24-Nov-2026 को उतारा)
          यह बड़ी फ़ाइल repo में नहीं रखी (30 MB); सिर्फ़ कोर्स में आए शब्दों की प्रति रखी, और बड़ी फ़ाइल का SHA-256 दर्ज।
   हर शब्द: 1) कोश में हूबहू (या पहला अक्षर छोटा/बड़ा) · 2) न मिले तो जोड़-शब्द तोड़कर (Schweiß + maschine; बीच का s/es/n/en/e भी)
            3) फिर भी नहीं: dhvani_yantra/de.js की HAATH-तालिका या sudhar_de_uchcharan.js की NAAM-तालिका (नाम, संक्षेप)।
   एक शब्द के दो उच्चारण हों तो पहला; पर -ig वाले शब्द में मानक ç वाला (zwanzig = /ˈt͡svant͡sɪç/, दक्षिणी /ɪk/ नहीं),
   जोड़-शब्द: भागों के IPA के बीच "ˌ" (भाग की सीमा; जैसे Arbeiter|platz में -er आगे के व्यंजन से नहीं जुड़ता)।
   और -en में साफ़ n̩ वाला (haben = /ˈhaːbn̩/, बोलचाल का /ˈhaːbm̩/ नहीं)।
   वाक्य के शुरू का बड़ा अक्षर: शब्द कोर्स में कभी वाक्य के बीच बड़े अक्षर से न आए और छोटे अक्षर वाला रूप कोश में हो,
   तो छोटे अक्षर वाला (Die = die /diː/; कोश का Die /daɪ/ अंग्रेज़ी शब्द है)।
   चलाना: node generator/build_de_ipa.js <de.txt का पता>      (दोबारा चलाने पर फ़ाइल वही) */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
const SRC = process.argv[2]; if (!SRC || !fs.existsSync(SRC)) { console.log("चलाना: node generator/build_de_ipa.js <de.txt>"); process.exit(2); }
const buf = fs.readFileSync(SRC), SHA = crypto.createHash("sha256").update(buf).digest("hex");
const dict = new Map();
function pick(v) {
  let a = v.split(",").map(x => x.trim().replace(/^\/|\/$/g, "")).filter(Boolean);
  const plain = a.filter(x => !/[mŋ][̩̍]/.test(x)); if (plain.length) a = plain;   /* haben: /ˈhaːbn̩/, बोलचाल का /ˈhaːbm̩/ नहीं */
  return a.find(x => /ç$/.test(x)) || a[0];
}
for (const l of buf.toString("utf8").split("\n")) { const t = l.indexOf("\t"); if (t > 0) dict.set(l.slice(0, t), pick(l.slice(t + 1))); }
/* कोश में पहला रूप मानक न हो तो हाथ से चुना मानक रूप (वही कोश-प्रविष्टि का दूसरा रूप; चाप ͡ जोड़ा ताकि एक आवाज़ पढ़ी जाए) */
const PICK = {
  Orange: ["oˈʁɑ̃ːʒə", "कोश: /oˈʁɑ̃ːʃ/, /oˈʁɑ̃ːʒə/; पहला ऑस्ट्रिया वाला, दूसरा जर्मनी का मानक"],
  Chili: ["ˈt͡ʃiːli", "कोश: /ˈkiːli/, /ˈtʃiːli/; दूसरा आम बोलचाल का मानक"]
};
for (const [w, [ipa]] of Object.entries(PICK)) { if (!dict.has(w)) throw new Error("PICK: कोश में नहीं: " + w); dict.set(w, ipa); }

/* कोर्स के सब जर्मन पाठ (जिनकी देवनागरी छपती है) */
const W = {};
new Function("window", fs.readFileSync(path.join(ROOT, "assets/kkb_de_data.js"), "utf8"))(W);
new Function("window", fs.readFileSync(path.join(ROOT, "assets/kkb2_de_data.js"), "utf8"))(W);
const texts = [];
for (const D of [W.KKB_DATA, W.KKB2_DATA]) {
  (D.help || []).forEach(h => texts.push(h[0]));
  for (const wk of D.weeks) {
    for (const d of wk.days) { (d.items || []).forEach(it => texts.push(it[0])); (d.tw || []).forEach(t => texts.push(t[0])); }
    ((wk.test && wk.test.lines) || []).forEach(x => texts.push(x[0]));
  }
}
const WORD = /[A-Za-zÄÖÜäöüßéÉ]+(?:-[A-Za-zÄÖÜäöüßéÉ]+)*/g;
const words = new Set(), MID = new Set();
/* चित्र-पुस्तक (generator/data/chitra/chitra_de.js) के शब्द भी: वहाँ हर शब्द संज्ञा है, जैसा लिखा वैसा (MID) */
const CH = require(path.join(ROOT, "generator/data/chitra/chitra_de.js"));
CH.words.concat(CH.shared).forEach(x => (String(x.w).match(WORD) || []).forEach(w => { words.add(w); MID.add(w); }));
texts.forEach(s => {
  /* वाक्य के बीच आया शब्द (MID): बड़ा अक्षर = संज्ञा। वाक्य के शुरू का बड़ा अक्षर सिर्फ़ शुरुआत के कारण भी हो सकता है (Die = die) */
  String(s).split(/(?<=[.?!:])\s+/).forEach(sen => (sen.match(WORD) || []).forEach((w, i) => { words.add(w); if (i > 0) MID.add(w); if (w.indexOf("-") > 0) w.split("-").forEach(p => { words.add(p); if (i > 0) MID.add(p); }); }));
});

function look(w) {
  const lo = w.toLowerCase(), order = (/^[A-ZÄÖÜ][a-zäöüß]/.test(w) && !MID.has(w) && dict.has(lo)) ? [lo, w] : [w, lo, w[0].toUpperCase() + w.slice(1).toLowerCase()];
  for (const k of order) if (dict.has(k)) return { k, ipa: dict.get(k) };
  return null;
}
const LINK = [["", ""], ["s", "s"], ["es", "əs"], ["n", "n"], ["en", "ən"], ["e", "ə"]];
function split(w, depth) {
  if (depth > 5) return null;
  const r = look(w); if (r) return [r];
  for (let i = w.length - 3; i >= 3; i--) {
    const ra = look(w.slice(0, i)); if (!ra) continue;
    for (const [lk, li] of LINK) {
      const rest = w.slice(i); if (lk && !rest.startsWith(lk)) continue;
      const tail = rest.slice(lk.length); if (tail.length < 3) continue;
      const rt = split(tail[0].toUpperCase() + tail.slice(1), depth + 1) || split(tail, depth + 1);
      if (rt) return [{ k: ra.k + lk, ipa: ra.ipa + li }].concat(rt);
    }
  }
  return null;
}
const out = {}, miss = []; let nK = 0, nJ = 0;
for (const w of [...words].sort()) {
  const r = look(w);
  if (r) { out[w] = { ipa: r.ipa, srot: "kosh" + (r.k !== w ? ":" + r.k : "") }; nK++; continue; }
  const sp = split(w, 0);
  if (sp && sp.length > 1) { out[w] = { ipa: sp.map((x, i) => (i && !/^[ˈˌ]/.test(x.ipa) ? "ˌ" : "") + x.ipa).join(""), srot: "jod:" + sp.map(x => x.k).join("+") }; nJ++; continue; }
  miss.push(w);
}
const body = "/* de_ipa.js : जर्मन कोर्स के शब्दों का IPA उच्चारण (विक्षनरी से)। generator/build_de_ipa.js से बना, हाथ से मत बदलो।\n" +
  "   स्रोत: german-ipa-dict (devio-at), विक्षनरी (Wiktionary) पर आधारित, CC BY-SA; ipa-dict की data/de.txt (sha256 " + SHA + ")।\n" +
  "   srot: kosh = कोश में हूबहू (kosh:X = पहला अक्षर छोटा/बड़ा करके X) · jod = जोड़-शब्द, भागों के IPA जोड़कर (भाग + से)।\n" +
  "   शब्द " + Object.keys(out).length + " · कोश " + nK + " · जोड़ " + nJ + " · यहाँ नहीं (नाम-तालिका या हाथ-तालिका में): " + miss.length + " */\n" +
  "module.exports = {\n  srot: " + JSON.stringify({ naam: "german-ipa-dict (Wiktionary), CC BY-SA", file: "ipa-dict/data/de.txt", sha256: SHA, date: "2026-11-24" }) + ",\n  shabd: " + JSON.stringify(out, null, 0).replace(/\},"/g, '},\n  "') + "\n};\n";
const dst = path.join(ROOT, "generator/data/lipi/dhvani/de_ipa.js");
const old = fs.existsSync(dst) ? fs.readFileSync(dst, "utf8") : "";
if (old !== body) { fs.writeFileSync(dst, body); console.log("✅ लिखा: generator/data/lipi/dhvani/de_ipa.js"); } else console.log("बदलाव नहीं: generator/data/lipi/dhvani/de_ipa.js");
console.log("शब्द " + Object.keys(out).length + " · कोश " + nK + " · जोड़ " + nJ + " · बाक़ी " + miss.length + ": " + miss.join(" "));
