/* realscript.js — 13-Sep-2026 — si/ps/bal/prs का देवनागरी-उच्चारण → असली लिपि (तीन-स्तंभ नियम v6.3-क1)
   क्रम: hand-dictionary (dict_<code>.js) → live fa/ur से सीखा शब्दकोश (__dirname + "/dev2ar_learned.json") → नियम-आधारित fallback।
   सिंहली: शुद्ध Brahmic नियम-लिप्यंतरण + शीर्ष-शब्द dictionary। */
"use strict";
const fs = require("fs");
const LEARNED = JSON.parse(fs.readFileSync(__dirname + "/dev2ar_learned.json", "utf8"));
const HAND = { ps: require(__dirname + "/dict_ps.js"), bal: require(__dirname + "/dict_bal.js"), prs: require(__dirname + "/dict_prs.js"), si: require(__dirname + "/dict_si.js") };
const DEV = /[\u0900-\u0963\u0966-\u097F]/; /* ।॥ विराम = लिपि नहीं */
const STATS = {};
function stat(c, k) { STATS[c] = STATS[c] || { hand: 0, learned: 0, rule: 0, ruleWords: {} }; STATS[c][k]++; }

/* ---------- Perso-Arabic rule fallback ---------- */
const CONS = {
  "क":"ک","क़":"ق","ख":"کھ","ख़":"خ","ग":"گ","ग़":"غ","घ":"گھ","ङ":"ن","च":"چ","छ":"چھ","ज":"ج","ज़":"ز","झ":"جھ","ञ":"ن",
  "ट":"ٹ","ठ":"ٹھ","ड":"ڈ","ड़":"ڑ","ढ":"ڈھ","ढ़":"ڑھ","ण":"ن","त":"ت","थ":"تھ","द":"د","ध":"دھ","न":"ن","प":"پ","फ":"پھ","फ़":"ف",
  "ब":"ب","भ":"بھ","म":"م","य":"ی","र":"ر","ऱ":"ڑ","ल":"ل","ळ":"ل","व":"و","श":"ش","ष":"ش","स":"س","ह":"ه"
};
const PS_CONS = { "ट":"ټ","ठ":"ټ","ड":"ډ","ड़":"ړ","ढ":"ډ","ण":"ڼ","ऱ":"ړ" };
const BAL_CONS = { "ह":"ہ" };
const VOW_INIT = { "अ":"ا","आ":"آ","इ":"ا","ई":"ای","उ":"ا","ऊ":"او","ऋ":"ر","ए":"ای","ऐ":"ای","ओ":"او","औ":"او","ऍ":"ا","ऑ":"ا" };
const MATRA = { "ा":"ا","ि":"","ी":"ی","ु":"","ू":"و","ृ":"ر","ॅ":"","ॉ":"و","े":"","ै":"ی","ो":"و","ौ":"و" };
const NUKTA = "\u093C";
function persoRule(word, lang) {
  const cons = Object.assign({}, CONS, lang === "ps" ? PS_CONS : {}, lang === "bal" ? BAL_CONS : {});
  let out = "", i = 0, atStart = true;
  const chars = Array.from(word.normalize("NFC"));
  /* ts → څ (ps) */
  while (i < chars.length) {
    let ch = chars[i];
    let nx = chars[i + 1];
    if (nx === NUKTA) { ch = ch + NUKTA; i++; nx = chars[i + 1]; }
    const isLast = (i + 1 >= chars.length) || (i + 2 >= chars.length && (chars[i + 1] === "्" || MATRA[chars[i + 1]] !== undefined));
    if (lang === "ps" && ch === "त" && nx === "्" && chars[i + 2] === "स") { out += "څ"; i += 3; atStart = false; continue; }
    if (cons[ch] !== undefined) {
      out += cons[ch]; atStart = false;
      /* अगला: मात्रा/विराम/अंतर्निहित-अ */
      const m = chars[i + 1];
      if (m === "्") { i += 2; continue; }
      if (m !== undefined && MATRA[m] !== undefined) {
        const last = (i + 2 >= chars.length);
        if (m === "े") out += (lang === "ps" ? "ې" : (last ? (lang === "bal" ? "ے" : "ه") : ""));
        else if (m === "ी") out += (lang === "ps" && last ? "ي" : "ی");
        else if (m === "ै") out += (lang === "ps" ? "ې" : "ی");
        else out += MATRA[m];
        i += 2; continue;
      }
      i += 1; continue;
    }
    if (VOW_INIT[ch] !== undefined) { out += atStart ? VOW_INIT[ch] : (ch === "आ" ? "ا" : ch === "ई" ? "ی" : ch === "ओ" || ch === "ऊ" || ch === "औ" ? "و" : ch === "ए" || ch === "ऐ" ? "ی" : "ا"); atStart = false; i++; continue; }
    if (ch === "ं") { out += (lang === "bal" && i + 1 >= chars.length) ? "ں" : "ن"; i++; continue; }
    if (ch === "ँ") { out += lang === "bal" ? "ں" : "ن"; i++; continue; }
    if (ch === "ः" || ch === "ऽ" || ch === "्") { i++; continue; }
    out += ch; i++; atStart = false;
  }
  return out;
}
/* ---------- Sinhala rule ---------- */
const SI_CONS = { "क":"ක","ख":"ඛ","ग":"ග","घ":"ඝ","ङ":"ඞ","च":"ච","छ":"ඡ","ज":"ජ","झ":"ඣ","ञ":"ඤ","ट":"ට","ठ":"ඨ","ड":"ඩ","ढ":"ඪ","ण":"ණ","त":"ත","थ":"ථ","द":"ද","ध":"ධ","न":"න","प":"ප","फ":"ඵ","ब":"බ","भ":"භ","म":"ම","य":"ය","र":"ර","ल":"ල","ळ":"ළ","व":"ව","श":"ශ","ष":"ෂ","स":"ස","ह":"හ","फ़":"ෆ","ज़":"ස","ख़":"ඛ","ग़":"ග","क़":"ක","ड़":"ඩ","ढ़":"ඪ","ऱ":"ර" };
const SI_VI = { "अ":"අ","आ":"ආ","इ":"ඉ","ई":"ඊ","उ":"උ","ऊ":"ඌ","ऋ":"ඍ","ए":"එ","ऐ":"ඓ","ओ":"ඔ","औ":"ඖ","ऍ":"ඇ","ऑ":"ඔ","ऎ":"එ","ऒ":"ඔ" };
const SI_M = { "ा":"ා","ि":"ි","ी":"ී","ु":"ු","ू":"ූ","ृ":"ෘ","े":"ෙ","ै":"ෛ","ो":"ො","ौ":"ෞ","ॅ":"ැ","ॉ":"ො","ॆ":"ෙ","ॊ":"ො" };
function sinhalaRule(word) {
  return sinhalaRule0(word).replace(/්ර/g, "්\u200Dර").replace(/්ය/g, "්\u200Dය");
}
function sinhalaRule0(word) {
  const chars = Array.from(word.normalize("NFC")); let out = "", i = 0;
  while (i < chars.length) {
    let ch = chars[i]; if (chars[i + 1] === NUKTA) { ch += NUKTA; i++; }
    if (SI_CONS[ch]) {
      out += SI_CONS[ch]; const m = chars[i + 1];
      if (m === "्") { out += "්"; i += 2; continue; }
      if (m !== undefined && SI_M[m] !== undefined) {
        const last = i + 2 >= chars.length;
        if (m === "े" && last) out += "ේ"; else if (m === "ो" && last) out += "ෝ"; else out += SI_M[m];
        i += 2; continue;
      }
      i++; continue;
    }
    if (SI_VI[ch]) { out += SI_VI[ch]; i++; continue; }
    if (ch === "ं" || ch === "ँ") { out += "ං"; i++; continue; }
    if (ch === "ः") { out += "ඃ"; i++; continue; }
    if (ch === "ऽ" || ch === "्") { i++; continue; }
    out += ch; i++;
  }
  return out;
}
/* ---------- token-level ---------- */
function normUr(w, lang) {
  if (lang === "ps") return w.replace(/ہ/g, "ه").replace(/ے/g, "ې").replace(/ۃ/g, "ه").replace(/ك/g, "ک");
  if (lang === "prs") return w.replace(/ہ/g, "ه").replace(/ے/g, "ی").replace(/ۃ/g, "ه").replace(/ك/g, "ک");
  return w;
}
function learnedBest(tok, lang) {
  const e = LEARNED[tok]; if (!e) return null;
  const best = Object.entries(e).sort((a, b) => b[1] - a[1])[0][0];
  /* सिंधी/कश्मीरी-विशेष अक्षर न आएँ */
  if (/[ڪٽڏڊڍڃڄڳڱٻڀٺٿۆۄٲٛ]/.test(best)) return null;
  return normUr(best, lang);
}
function convToken(tok, lang) {
  if (!DEV.test(tok)) return tok;
  const core = tok.replace(/^[^\u0900-\u0963\u0966-\u097F]+|[^\u0900-\u0963\u0966-\u097F]+$/g, "");
  const pre = tok.slice(0, tok.indexOf(core)), post = tok.slice(tok.indexOf(core) + core.length);
  let out;
  if (HAND[lang][core] !== undefined) { out = HAND[lang][core]; stat(lang, "hand"); }
  else if (lang !== "si" && Array.from(core).filter(c => /[\u0915-\u0939\u0958-\u095F]/.test(c)).length >= 2 && learnedBest(core, lang)) { out = learnedBest(core, lang); stat(lang, "learned"); }
  else { out = lang === "si" ? sinhalaRule(core) : persoRule(core, lang); stat(lang, "rule"); const rw = STATS[lang].ruleWords; rw[core] = (rw[core] || 0) + 1; }
  return pre + out + post;
}
function convText(s, lang) {
  if (typeof s !== "string" || !DEV.test(s)) return s;
  let out = s.split(/(\s+|-)/).map(t => (/^\s+$/.test(t) || t === "-") ? t : convToken(t, lang)).join("");
  /* बचे-खुचे देवनागरी चिह्न (source-दूषण: stray nukta/मात्रा/ॲ) — साफ़ */
  out = Array.from(out).map(ch => {
    if (!/[\u0900-\u0963\u0966-\u097F]/.test(ch)) return ch;
    if (lang === "si") return SI_M[ch] !== undefined ? SI_M[ch] : (SI_VI[ch] || (ch === "ॲ" ? "ඇ" : (SI_CONS[ch] || "")));
    return MATRA[ch] !== undefined ? MATRA[ch] : (VOW_INIT[ch] || (ch === "ॲ" ? "ا" : (CONS[ch] || "")));
  }).join("");
  if (lang !== "si") out = out.replace(/\?/g, "؟").replace(/,/g, "،").replace(/\u0964/g, ".");
  else out = out.replace(/\u0964/g, ".");
  return out;
}
/* ---------- field-level applier ---------- */
function convertData(D, lang, isL2) {
  let n = 0;
  const cv = s => { const r = convText(s, lang); if (r !== s) n++; return r; };
  (D.help || []).forEach(h => { h[0] = cv(h[1] !== undefined && h[0] === h[1] ? h[0] : h[0]); });
  D.weeks.forEach(w => {
    w.days.forEach(d => {
      d.items.forEach(it => { it[0] = cv(it[0]); });
      (d.tw || []).forEach(t => { t[0] = cv(t[0]); });
      if (d.drill && Array.isArray(d.drill.rows)) d.drill.rows = d.drill.rows.map(r => Array.isArray(r) ? r.map(x => cv(x)) : r);
    });
    if (w.test && Array.isArray(w.test.lines)) w.test.lines.forEach(l => { l[0] = cv(l[0]); });
  });
  return n;
}
module.exports = { convText, convToken, convertData, STATS, persoRule, sinhalaRule };
