/* sudhar_ms_e_taling.js v1.0 · 23-Nov-2026 : मलय कोर्स स्तर-1 की देवनागरी में e की आवाज़ का सुधार (data-स्तर; हाथ से नहीं)
   कमी: कोर्स स्तर-1 में शब्द के बीच का हर e "अ" (बिना मात्रा) छपा है, और शुरू का हर e "ए"।
        पर मलय में e की दो आवाज़ें हैं: पेपेत (अ) और तालिंग (ए)। जैसे boleh = बोलेह् (छपा: बोलह्), enam = अनम् (छपा: एनम्)।
   स्रोत: जावी वर्तनी में तालिंग e के लिए "या" (ي) लिखा जाता है (rumi-jawi सूची, DBP शब्दकोशों से)। सूची: generator/dhvani_yantra/ms.js (TALING)।
   काम: assets/kkb_ms_data.js के [1] खाने में सिर्फ़ वे शब्द बदलते हैं जिनका छपा रूप यंत्र से अलग है।
        वाक्य, हिंदी अर्थ, क्रम, बाक़ी हर शब्द जैसा था वैसा। सिर्फ़ उन्हीं वाक्यों पर जिनके शब्द गिनती में बराबर हैं।
   चलाना: node generator/sudhar_ms_e_taling.js            (सिर्फ़ रिपोर्ट)
           node generator/sudhar_ms_e_taling.js --write    (फ़ाइल बदलो)
   दोबारा चलाने पर कुछ नहीं बदलता (दूसरी बार 0 बदलाव)। */
"use strict";
const fs = require("fs"), path = require("path");
const Y = require(path.join(__dirname, "dhvani_yantra", "ms.js"));
const F = path.join(__dirname, "..", "assets", "kkb_ms_data.js");
const WRITE = process.argv.includes("--write");
/* नाम और अंग्रेज़ी शब्द: इनका छपा रूप नहीं छुआ जाता */
const CHHODO = { ram: 1, bihar: 1, india: 1, hindi: 1, kumar: 1, patna: 1, delhi: 1, ac: 1, atm: 1, upi: 1, okay: 1, overtime: 1, rupee: 1, sim: 1, pin: 1 };
const PUNCT = /^([.,!?;:"“”()।…]*)(.*?)([.,!?;:"“”()।…]*)$/;

const src = fs.readFileSync(F, "utf8");
const w = {}; new Function("window", "self", "module", src + ";")(w, w, {});
const D = w.KKB_DATA;
const pairs = [];
D.weeks.forEach((wk, wi) => { wk.days.forEach((d, di) => Object.keys(d).forEach(k => { if (Array.isArray(d[k])) d[k].forEach((it, ii) => { if (Array.isArray(it)) pairs.push({ it: it, at: "हफ़्ता " + (wi + 1) + " दिन " + (di + 1) + " " + k + " " + (ii + 1) }); }); }));
  ((wk.test && wk.test.lines) || []).forEach((it, ii) => pairs.push({ it: it, at: "हफ़्ता " + (wi + 1) + " परीक्षा-पंक्ति " + (ii + 1) })); });

const log = []; let nVakya = 0, nShabd = 0, nBemel = 0; const perWord = {};
pairs.forEach(({ it, at }) => {
  if (typeof it[0] !== "string" || typeof it[1] !== "string" || !/[ऀ-ॿ]/.test(it[1])) return;
  const a = it[0].trim().split(/\s+/), b = it[1].trim().split(/(\s+)/);
  const bw = b.filter((x, i) => i % 2 === 0);
  if (a.length !== bw.length) { nBemel++; return; }
  let changed = false;
  for (let i = 0; i < a.length; i++) {
    const ta = a[i].match(PUNCT)[2], tb = bw[i].match(PUNCT);
    const pa = ta.split("-"), pb = tb[2].split("-");
    if (pa.length !== pb.length) continue;
    let nb = pb.slice();
    pa.forEach((x, j) => { const k = x.toLowerCase(); if (!/^[a-z]+$/.test(k) || CHHODO[k]) return; const y = Y.word(k);
      if (y !== pb[j]) { nb[j] = y; nShabd++; perWord[k] = (perWord[k] || 0) + 1; log.push(at + " · " + x + ": " + pb[j] + " → " + y); changed = true; } });
    bw[i] = tb[1] + nb.join("-") + tb[3];
  }
  if (changed) { nVakya++; let o = ""; for (let i = 0; i < b.length; i++) o += i % 2 === 0 ? bw[i / 2] : b[i]; it[1] = o; }
});
console.log("पंक्तियाँ बदलीं: " + nVakya + " · शब्द बदले: " + nShabd + " · शब्द-गिनती बेमेल (छुए नहीं): " + nBemel);
console.log("शब्द-वार: " + Object.keys(perWord).sort().map(k => k + "×" + perWord[k] + " (" + Y.word(k) + ")").join(", "));
if (process.argv.includes("--log")) console.log(log.join("\n"));
if (WRITE && nShabd) {
  const m = src.match(/window\.KKB_DATA\s*=\s*/);
  fs.writeFileSync(F, src.slice(0, m.index) + m[0] + JSON.stringify(D, null, 1) + ";\n");
  console.log("✅ लिखा: assets/kkb_ms_data.js");
}
