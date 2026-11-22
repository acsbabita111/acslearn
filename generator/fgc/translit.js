/* translit.js — गयानी क्रियोल (GEREC-जैसी वर्तनी) → देवनागरी उच्चारण · नियम-यंत्र
   नियम: an/en/on स्वर से पहले नासिक नहीं; ou = उ; è = ऐ; ò = ऑ; en = ऐं (आं नहीं)। */
"use strict";
const OVER = require("./overrides.js");           // नाम/संक्षेप: Hindi→हिंदी, SIM→सिम …
const CONS = { gn: "न्य", tch: "च", dj: "ज", ch: "श", b: "ब", d: "द", f: "फ़", g: "ग", h: "ह", j: "झ़", k: "क", l: "ल", m: "म", n: "न",
  p: "प", r: "र", s: "स", t: "त", v: "व", w: "व", y: "य", z: "ज़" };
const VOW = { a: ["अ", "ा", "आ"], "é": ["ए", "े"], e: ["ए", "े"], "è": ["ऐ", "ै"], i: ["इ", "ि"], o: ["ओ", "ो"], "ò": ["ऑ", "ॉ"], ou: ["उ", "ु"],
  AN: ["आं", "ां"], EN: ["ऐं", "ैं"], ON: ["ओं", "ों"] };
const isV = c => "aeiouéèòà".indexOf(c) > -1;
function graphemes(w) {
  const g = []; let i = 0;
  while (i < w.length) {
    const r = w.slice(i);
    if (r.startsWith("tch")) { g.push("tch"); i += 3; continue; }
    if (r.startsWith("dj")) { g.push("dj"); i += 2; continue; }
    if (r.startsWith("gn")) { g.push("gn"); i += 2; continue; }
    if (r.startsWith("ch")) { g.push("ch"); i += 2; continue; }
    if (r.startsWith("ou")) { g.push("ou"); i += 2; continue; }
    const c = w[i], n1 = w[i + 1], n2 = w[i + 2];
    if ((c === "a" || c === "e" || c === "o") && n1 === "n" && !(n2 && isV(n2))) {     // नासिक स्वर
      g.push(c === "a" ? "AN" : c === "e" ? "EN" : "ON"); i += 2; continue;            // "ann" → AN + n (अगला n अलग)
    }
    if (c === "à") { g.push("a"); i++; continue; }
    if (VOW[c] || CONS[c]) { g.push(c); i++; continue; }
    throw new Error("अनजान अक्षर '" + c + "' शब्द '" + w + "' में");
  }
  return g;
}
function word(w0) {
  if (OVER[w0]) return OVER[w0];
  const lw = w0.toLowerCase();
  if (OVER[lw]) return OVER[lw];
  if (/^\d+$/.test(w0)) return w0;
  if (/^[A-Z0-9]{2,}$/.test(w0)) throw new Error("संक्षेप overrides.js में नहीं: " + w0);
  const g = graphemes(lw); let out = "";
  for (let i = 0; i < g.length; i++) {
    const x = g[i], nx = g[i + 1];
    if (VOW[x]) { const prevC = i > 0 && CONS[g[i - 1]]; let m = prevC ? VOW[x][1] : (x === "a" && !prevC ? "आ" : VOW[x][0]);
      if (prevC && i === g.length - 1) { if (x === "i") m = "ी"; if (x === "ou") m = "ू"; }
      out += m; }
    else { out += CONS[x]; if (!(nx && VOW[nx]) && i !== g.length - 1) out += "्"; }
  }
  return out;
}
function line(s) {
  return String(s).split(/(\s+)/).map(tok => {
    if (/^\s+$/.test(tok) || !tok) return tok;
    return tok.split(/(-)/).map(part => {
      if (part === "-" || !part) return part;
      const m = /^([^A-Za-zéèòàÉÈÒÀ0-9]*)(.*?)([^A-Za-zéèòàÉÈÒÀ0-9]*)$/.exec(part);
      const core = m[2] ? word(m[2]) : "";
      return m[1] + core + m[3].replace(/\./g, "।");
    }).join("");
  }).join("");
}
module.exports = { line, word, graphemes };
if (require.main === module) {
  const T = ["Mo ka travay.", "Mèrsi bokou!", "A kouman ou fika?", "Mo non a Ram.", "Lapli ka tonbé.", "Nou valiz-ya lou.", "Mo gen kenz lannen.", "byen konmyen simenn vini machin moun roun manman fanm wonm konprann jodla dimen bonmanten profésò tchò djòb Gwiyanè annan solèy travay chyen"];
  T.forEach(t => console.log(t, "→", line(t)));
}
