/* ============================================================
   lib_lang_terms.js v1.0 (16-Nov-2026) · "इस भाषा में English शब्द नहीं" का एक घर
   Founder का आदेश (16-Nov-2026): "कन्नड मे सब कुछ कन्नड मे ही हो। अंग्रेजी कहे को रहेगा।"
   Constitution का लिपि-नियम: तकनीकी शब्द पहले पन्ने की अपनी लिपि में; Roman रूप एक बार छोटे गोल कोष्ठक में आ सकता है।

   यह फ़ाइल तीन काम करती है (तीनों एक ही शब्द-तोड़ से, ताकि जाँच और बदलाव कभी अलग न पड़ें):
     scan(text, T)  : पाठ में Latin अक्षरों के वे शब्द, जो छूट में नहीं आते (इन्हें उस भाषा की लिपि में होना चाहिए)
     apply(text, T) : तालिका के शब्द उस भाषा की लिपि में बदलकर नया पाठ (पीछे लगा विभक्ति-टुकड़ा शब्द से जोड़ दिया जाता है)
     load(lang)     : generator/data/panel_i18n/<भाषा>_terms.json

   Latin में क्या रह सकता है (छूट):
     • तालिका की "keep" सूची: brand के नाम और छोटे रूप (ACS, OTP, PDF, RM ...); "keep_phrases": पूरे नाम (Applied Computer School)
     • पते, email, फ़ाइलों के नाम, ACS-नंबर, {खाने}, HTML के tag
     • program के नाम जैसे शब्द (orderId, regNo), एक अक्षर के शब्द
     • गोल कोष्ठक, जिसमें सिर्फ़ Latin हो और जो उस भाषा के शब्द के ठीक बाद आए: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (Dashboard)"
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");

function has(lang) { return fs.existsSync(path.join(__dirname, "data", "panel_i18n", lang + "_terms.json")); }
function load(lang) {
  const p = path.join(__dirname, "data", "panel_i18n", lang + "_terms.json");
  const T = JSON.parse(fs.readFileSync(p, "utf8"));
  return prepare(T);
}
function prepare(T) {
  T.own = new RegExp("[" + T.script + "]");
  T.keepSet = new Set(T.keep || []);
  T.keepLower = new Set((T.keep_any_case || []).map(function (s) { return s.toLowerCase(); }));
  T.phr = (T.keep_phrases || []).slice().sort(function (a, b) { return b.length - a.length; });
  T.keys = Object.keys(T.terms || {});
  /* तालिका के हर वाक्यांश के शब्द: हिंदी मूल का ऐसा रोमन शब्द अनुवाद में अपनी लिपि में जा सकता है */
  T.termWords = new Set((T.drop_ok || []).map(function (x) { return x.toLowerCase(); }));
  T.keys.forEach(function (k) { k.split(" ").forEach(function (x) { T.termWords.add(x); }); });
  T.maxWords = T.keys.reduce(function (m, k) { return Math.max(m, k.split(" ").length); }, 1);
  /* तालिका ख़ुद साफ़ हो: हर English वाक्यांश छोटे अक्षरों में; हर रूप उसी भाषा की लिपि में, और उसमें छूट-सूची के बाहर कोई English शब्द नहीं */
  const badT = [];
  T.keys.forEach(function (k) {
    const v = T.terms[k], w = Array.isArray(v) ? String(v[0] || "") : "";
    if (k !== k.toLowerCase() || !/^[a-z0-9][a-z0-9 '&/.]*$/.test(k)) badT.push(k + " (वाक्यांश छोटे अक्षरों में नहीं)");
    else if (!w || !T.own.test(w)) badT.push(k + " (रूप उस भाषा की लिपि में नहीं)");
    else if ((w.match(/[A-Za-z][A-Za-z0-9]*/g) || []).some(function (x) { return x.length > 1 && !T.keepSet.has(x) && !T.keepLower.has(x.toLowerCase()) && !/^[A-Z0-9]+$/.test(x); })) badT.push(k + " (रूप में English शब्द: " + w + ")");
    else if (v.length > 1 && !(T.suffix_forms || {})[v[1]]) badT.push(k + " (शब्द के अंत का वर्ग अनजान: " + v[1] + ")");
  });
  if (badT.length) throw new Error("शब्द-तालिका ठीक नहीं (" + badT.length + "): " + badT.slice(0, 6).join("; "));
  return T;
}

/* पाठ के वे हिस्से, जिन्हें छुआ नहीं जाता: [शुरू, अंत) की सूची */
function shields(text, T) {
  const out = [];
  const add = function (re) { let m; re.lastIndex = 0; while ((m = re.exec(text))) { if (m[0].length === 0) { re.lastIndex++; continue; } out.push([m.index, m.index + m[0].length]); } };
  add(/<[^<>]*>/g);                                   /* HTML tag */
  add(/&[a-zA-Z]+;|&#\d+;/g);                         /* HTML entity */
  add(/\{[^{}]*\}/g);                                 /* {खाना} */
  add(/https?:\/\/[^\s<>"')]+/g);                     /* पता */
  add(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g);                 /* email */
  add(/\b(?:[\w-]+\/)*[\w-]+(\.[\w-]+)*\.(com|org|in|html|js|json|py|css|bat|pdf|png|jpg)\b(\/[^\s<>"',;)]*)?/gi);   /* domain या फ़ाइल का नाम */
  add(/\bACS-[A-Z]{0,3}-?\d{4}-[\dX\u2026.]*/g);                       /* ACS-नंबर */
  add(/\d[\dA-Za-z]*[A-Za-z]/g);                       /* अंक से शुरू: 12th, 16px, 2FA */
  add(/\b\d{1,2}-[A-Za-z]{3}-\d{4}\b/g);              /* तारीख़: 18-Jul-2026 */
  add(/\bv\d+(\.\d+)*\b/g);                          /* संस्करण: v1.2 */
  add(/[A-Za-z]+(\{[^{}]*\})?_[A-Za-z_]+/g);           /* program के नाम: udyam_data, Point{0}_Desc */
  add(/'\s*\+\s*[\w.]+\s*\+\s*'/g);                  /* पन्ने के code का टुकड़ा */
  add(/\b[A-Z]{2,}-\d{4}-[\d…]*/g);
  (T.phr || []).forEach(function (p) { let i = -1; while ((i = text.indexOf(p, i + 1)) >= 0) out.push([i, i + p.length]); });
  /* गोल कोष्ठक में सिर्फ़ Latin, और ठीक पहले उस भाषा का शब्द */
  const br = /\(([^()]*)\)/g; let m;
  while ((m = br.exec(text))) {
    if (!/[A-Za-z]/.test(m[1]) || T.own.test(m[1])) continue;
    let k = m.index - 1; while (k >= 0 && /[\s\u200c\u200d]/.test(text[k])) k--;
    if (k >= 0 && T.own.test(text[k])) out.push([m.index, m.index + m[0].length]);
  }
  return out;
}
function shielded(sh, i, j) { for (let k = 0; k < sh.length; k++) if (i < sh[k][1] && j > sh[k][0]) return true; return false; }

/* Latin शब्द: [शब्द, शुरू, अंत] (छुए न जाने वाले हिस्सों के बाहर) */
function words(text, T) {
  const sh = shields(text, T), out = [], re = /[A-Za-z](?:[A-Za-z0-9]|['\u2019](?=[A-Za-z]))*/g; let m;
  while ((m = re.exec(text))) { if (!shielded(sh, m.index, m.index + m[0].length)) out.push([m[0], m.index, m.index + m[0].length]); }
  return out;
}
function isKept(w, T) {
  if (w.length < 2) return true;
  if (T.keepSet.has(w) || T.keepLower.has(w.toLowerCase())) return true;
  if (/[a-z][A-Z]/.test(w)) return true;              /* orderId, regNo, eMigrate जैसे program के नाम */
  if (/\d/.test(w) && /^[A-Z0-9]+$/.test(w)) return true;   /* A2, B1 */
  return false;
}
/* i से शुरू होने वाला सबसे लंबा तालिका-वाक्यांश (शब्दों के बीच एक खाली जगह या "-") */
function matchAt(text, ws, i, T) {
  for (let n = Math.min(T.maxWords, ws.length - i); n >= 1; n--) {
    let ok = true, key = ws[i][0].toLowerCase();
    for (let k = 1; k < n; k++) {
      const gap = text.slice(ws[i + k - 1][2], ws[i + k][1]);
      if (gap !== " " && gap !== "-") { ok = false; break; }
      key += " " + ws[i + k][0].toLowerCase();
    }
    if (ok && Object.prototype.hasOwnProperty.call(T.terms, key)) return { n: n, key: key };
  }
  return null;
}

/* key = हिंदी कुंजी (हो तो): "skip_keys" की कुंजी पूरी छूट में (दो भाषा वाली प्रमाणपत्र-पंक्तियाँ); "keep_in" में उस कुंजी के अपने छूट-शब्द */
function forKey(T, key) {
  if (key == null) return T;
  if ((T.skip_keys || []).indexOf(key) >= 0) return null;
  const extra = (T.keep_in || {})[key];
  if (!extra) return T;
  const T2 = Object.assign({}, T); T2.keepSet = new Set(Array.from(T.keepSet).concat(extra)); return T2;
}
function scan(text, T, key) {
  T = forKey(T, key); if (!T) return [];
  const ws = words(String(text), T), bad = [];
  for (let i = 0; i < ws.length; i++) { if (!isKept(ws[i][0], T)) bad.push(ws[i][0]); }
  return bad;
}

/* शब्द का आख़िरी स्वर-वर्ग: C = हलंत (व्यंजन पर ख़त्म), E = इ/ई/ए/ऐ, A = अ, U = उ/ऊ, O = बाक़ी */
function klass(s, T) {
  const c = s.charCodeAt(s.length - 1), base = parseInt(T.block, 16);
  const off = c - base;
  if (off === 0x4D) return "C";
  if (off === 0x3F || off === 0x40 || off === 0x46 || off === 0x47 || off === 0x48) return "E";
  if (off === 0x41 || off === 0x42) return "U";
  if (off >= 0x15 && off <= 0x39) return "A";
  return "O";
}
function join(term, cls, role, T) {
  const F = T.suffix_forms[cls];
  if (!F || !Object.prototype.hasOwnProperty.call(F, role)) return null;
  let f = F[role];
  if (f.charAt(0) === "<") { term = term.slice(0, -1); f = f.slice(1); }   /* "<" = शब्द का आख़िरी अक्षर-चिह्न हटाकर जोड़ो */
  return term + f;
}

function apply(text, T, key) {
  text = String(text);
  T = forKey(T, key); if (!T) return { text: text, notes: [] };
  const ws = words(text, T), notes = [];
  let out = "", pos = 0, prev = 0;
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i];
    const hit = matchAt(text, ws, i, T);
    if (!hit) { continue; }
    /* वाक्यांश का कोई शब्द छूट में हो और अकेला ही मिला हो, तो छूट जीतती है */
    if (hit.n === 1 && isKept(w[0], T)) continue;
    const def = T.terms[hit.key], term = def[0], cls = def[1] || klass(term, T);
    const end = ws[i + hit.n - 1][2];
    let put = term; pos = end;
    /* "English (ಕನ್ನಡ)" : कोष्ठक में उसी भाषा का रूप पहले से लिखा है, तो वही रहता है (दोहराव नहीं) */
    const rb = /^ \(([^()]*)\)/.exec(text.slice(end));
    if (rb && T.own.test(rb[1]) && !/[A-Za-z]/.test(rb[1])) {
      let own = rb[1].trim(), stop = end + rb[0].length;
      const sm2 = /^ ([^\s.,;:!?()\[\]{}<>\/|·\-"'«»]+)/.exec(text.slice(stop));
      if (sm2 && Object.prototype.hasOwnProperty.call(T.particles, sm2[1])) {
        const j2 = join(own, def[1] || klass(own, T), T.particles[sm2[1]], T);
        if (j2 !== null) { own = j2; stop += sm2[0].length; }
      }
      out += text.slice(prev, w[1]) + own; prev = pos = stop; i += hit.n - 1; continue;
    }
    /* पीछे अलग लिखा विभक्ति-टुकड़ा: " ನಲ್ಲಿ", " ಗೆ" ... शब्द से जोड़ो */
    const rest = text.slice(end), sm = /^ ([^\s.,;:!?()\[\]{}<>\/|·\-"'«»]+)/.exec(rest);
    if (sm && Object.prototype.hasOwnProperty.call(T.particles, sm[1])) {
      const j = join(term, cls, T.particles[sm[1]], T);
      if (j === null) notes.push("no form: " + hit.key + " [" + cls + "] + " + sm[1]);
      else { put = j; pos = end + sm[0].length; }
    } else if (sm && cls === "H" && (T.after_person || []).indexOf(sm[1]) >= 0) {
      put = join(term, cls, "gen", T);                /* व्यक्ति + "ಅಡಿಯಲ್ಲಿ / ಬಳಿ / ಜೊತೆ": संबंध-रूप */
    }
    out += text.slice(prev, w[1]) + put; prev = pos;
    i += hit.n - 1;
  }
  out += text.slice(prev);
  return { text: out, notes: notes };
}

/* पहले के मसौदों की आदत: हलंत पर ख़त्म शब्द के बाद विभक्ति अलग लिखी थी ("ಫೋನ್ ನಲ್ಲಿ"); उसे जोड़ दो ("ಫೋನ್‌ನಲ್ಲಿ") */
function tidy(text, T) {
  if (!T.tidy_endings || !T.tidy_endings.length) return String(text);
  const H = String.fromCharCode(parseInt(T.block, 16) + 0x4D), own = "[" + T.script + "]";
  const re = new RegExp(H + " (" + T.tidy_endings.slice().sort(function (a, b) { return b.length - a.length; }).join("|") + ")(?!" + own + ")", "g");
  return String(text).replace(re, H + String.fromCharCode(0x200c) + "$1");
}

module.exports = { has: has, tidy: tidy, load: load, prepare: prepare, scan: scan, apply: apply, words: words, klass: klass };
