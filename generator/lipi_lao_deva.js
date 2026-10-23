/* generator/lipi_lao_deva.js — v1.0 (22-Oct-2026) — लाओ लिपि → देवनागरी उच्चारण (अक्षर-दर-अक्षर, नियम-आधारित)
   F-10: lo के उच्चारण-खाने में घुसे Latin अक्षरों का स्थायी इलाज। हर अक्षर (syllable) अलग शब्द की तरह — space से।
   नियम: पूर्व-स्वर (ເ ແ ໂ ໄ ໃ) · प्रारंभिक व्यंजन (ຫ+मृदु = मृदु; ໜ ໝ ຫຼ) · ऊपर/नीचे स्वर · स्वराघात-चिह्न (अनदेखे) ·
   पश्च-स्वर (ະ າ ອ ວ ຍ ຽ ຳ) · अंतिम व्यंजन (हलंत के साथ)। ໆ = पिछला अक्षर दोहराओ। लाओ अंक → अंक।
   उपयोग:  node generator/lipi_lao_deva.js --fix   (assets/kkb*_lo_data.js में सिर्फ़ टूटे उच्चारण बदलता है)
           const L=require('./lipi_lao_deva.js'); L.translit("ສະບາຍດີ")  →  "स बाय् दी"           */
'use strict';
const C = { 'ກ':'क','ຂ':'ख','ຄ':'ख','ງ':'ङ','ຈ':'च','ສ':'स','ຊ':'स','ຍ':'ञ','ດ':'द','ຕ':'त','ຖ':'थ','ທ':'थ','ນ':'न','ບ':'ब','ປ':'प','ຜ':'फ','ຝ':'फ़','ພ':'फ','ຟ':'फ़','ມ':'म','ຢ':'य','ຣ':'र','ລ':'ल','ວ':'व','ຫ':'ह','ອ':'','ຮ':'ह','ໜ':'न','ໝ':'म' };
const FIN = { 'ກ':'क्','ງ':'ङ्','ດ':'त्','ນ':'न्','ບ':'प्','ມ':'म्','ຍ':'य्','ວ':'ओ' };   /* लाओ के 8 मानक अंतिम व्यंजन; ວ-अंत = स्वर 'ओ' (ລາວ → लाओ) */
const SOFT = 'ງຍນມລວຣ';
const PRE = 'ເແໂໄໃ';
const MARK = 'ັິີຶືຸູົໍຼ';
const TONE = '່້໊໋໌';
const IND = { '':'अ','ा':'आ','ि':'इ','ी':'ई','ु':'उ','ू':'ऊ','े':'ए','ै':'ऐ','ो':'ओ','ौ':'औ','ाइ':'आइ','ाओ':'आओ','िया':'इया','ुआ':'उआ','ाम्':'आम्','ॉ':'ऑ' };
const isC = ch => ch in C;
function syllables(s) {
  const out = []; let i = 0; const n = s.length;
  while (i < n) {
    const ch = s[i];
    if (!isC(ch) && !PRE.includes(ch)) {                       // लाओ के बाहर का अक्षर
      if (ch === 'ໆ') { if (out.length) out.push(out[out.length - 1]); i++; continue; }
      if (ch >= '໐' && ch <= '໙') { out.push(String(ch.charCodeAt(0) - 0x0ED0)); i++; continue; }
      if (MARK.includes(ch) || TONE.includes(ch) || 'ະາຳຽ'.includes(ch)) { i++; continue; } // अनाथ चिह्न छोड़ो
      out.push(ch); i++; continue;
    }
    let pre = '', init = '', marks = '', post = '', fin = '';
    if (PRE.includes(ch)) { pre = ch; i++; }
    if (i < n && isC(s[i])) {
      init = s[i]; i++;
      if (init === 'ຫ' && i < n && SOFT.includes(s[i])) { init = s[i]; i++; }      // ຫ + मृदु = मृदु (स्वराघात)
    }
    while (i < n && (MARK.includes(s[i]) || TONE.includes(s[i]))) { if (s[i] === 'ຼ') init = 'ລ'; else if (MARK.includes(s[i])) marks += s[i]; i++; }
    // व्यंजन-गुच्छ: C + ວ + (ا/ے...) = Cव
    let cw = '';
    if (i + 1 < n && s[i] === 'ວ' && !marks && 'າະເ'.includes(s[i + 1]) && s[i+1] !== 'ເ') { cw = 'व'; i++; }
    while (i < n && 'ະາຳຽ'.includes(s[i])) { post += s[i]; i++; while (i < n && TONE.includes(s[i])) i++; }
    // ອ/ວ/ຍ स्वर-अक्षर के रूप में
    if (i < n && s[i] === 'ອ' && !post && (marks === '' || /[ີື]/.test(marks))) { const nx = s[i + 1]; if (!(nx && (MARK.includes(nx) || TONE.includes(nx) || 'ະາ'.includes(nx)))) { post += 'ອ'; i++; } }
    if (i < n && s[i] === 'ວ' && /ົ/.test(marks) && !post) { post += 'ວ'; i++; }
    if (i < n && s[i] === 'ຍ' && pre === 'ເ' && /ີ/.test(marks)) { post += 'ຍ'; i++; }
    // अंतिम व्यंजन
    if (i < n && isC(s[i]) && s[i] in FIN) {
      const nx = s[i + 1];
      const startsNew = nx && (MARK.includes(nx) || TONE.includes(nx) || 'ະາຳຽອ'.includes(nx) || (nx === 'ວ' && s[i + 2] && 'າະ'.includes(s[i + 2])) || (s[i] === 'ຫ'));
      const vowelNeed = marks || post || pre;
      if (!startsNew && vowelNeed && !(s[i] === 'ອ')) { fin = s[i]; i++; }
    }
    out.push(render(pre, init, marks, post, fin, cw));
  }
  return out;
}
function vowel(pre, marks, post, fin) {
  const m = marks.replace(/[່້໊໋]/g, '');
  if (pre === 'ເ' && /ົ/.test(m) && post.includes('າ')) return 'ाओ';
  if (pre === 'ເ' && post.includes('ົາ')) return 'ाओ';
  if (pre === 'ເ' && /ີ/.test(m) && (post.includes('ຍ'))) return 'िया';
  if (pre === 'ເ' && /ື/.test(m) && post.includes('ອ')) return 'ुआ';
  if (post.includes('ຽ')) return 'िया';
  if (/ົ/.test(m) && post.includes('ວ')) return 'ुआ';
  if (post.includes('ຳ')) return 'ाम्';
  if (pre === 'ໄ' || pre === 'ໃ') return 'ाइ';
  if (pre === 'ເ' && /ັ/.test(m)) return 'े';
  if (pre === 'ແ' && /ັ/.test(m)) return 'ै';
  if (pre === 'ເ' && /ິ/.test(m)) return 'ॅ';
  if (pre === 'ເ') return 'े';
  if (pre === 'ແ') return 'ै';
  if (pre === 'ໂ') return 'ो';
  if (post.includes('ອ') || /ໍ/.test(m)) return 'ो';
  if (post.includes('າ')) return 'ा';
  if (/ິ/.test(m)) return 'ि'; if (/ີ/.test(m)) return 'ी';
  if (/ຶ/.test(m)) return 'ु'; if (/ື/.test(m)) return 'ू';
  if (/ຸ/.test(m)) return 'ु'; if (/ູ/.test(m)) return 'ू';
  if (/ົ/.test(m)) return 'ो';
  return '';                                                   // ັ / ະ / छुपा स्वर = अ
}
function render(pre, init, marks, post, fin, cw) {
  const v = vowel(pre, marks, post, fin);
  const f = fin ? FIN[fin] : '';
  let base = init ? C[init] : '';
  if (cw) base = base + '्' + cw;
  if (base === '') return (IND[v] !== undefined ? IND[v] : 'अ' + v) + f;      // ອ = स्वर-वाहक
  return base + v + f;
}
const ACR = { 'ai':'एआई','atm':'एटीएम','upi':'यूपीआई','acs':'एसीएस','otp':'ओटीपी','e-migrate':'ई-माइग्रेट','sim':'सिम','pin':'पिन','id':'आईडी','pdf':'पीडीएफ','ok':'ओके','gps':'जीपीएस','sms':'एसएमएस' };
function latinRun(w) { const k = w.toLowerCase(); return ACR[k] || w; }   /* लाओ-वाक्य में आया Latin शब्द पूरा रहे; जाने-पहचाने संक्षेप देवनागरी में */
function translit(s) {
  return String(s).split(/(\s+)/).map(part => {
    if (/\s/.test(part)) return ' ';
    return part.split(/([A-Za-z][A-Za-z0-9-]*)/).map(r => /^[A-Za-z]/.test(r) ? latinRun(r) : syllables(r).join(' ')).join(' ');
  }).join('').replace(/ +/g, ' ').trim()
    .replace(/ ([।?!,.])/g, '$1').replace(/\.$/, '।').replace(/\. /g, '। ');
}
const BROKEN = /[A-Za-z]|[\u093E-\u094C][\u093E-\u094C]|[\u093E-\u094C]\u094D/;   // Latin · दोहरी मात्रा · मात्रा+हलंत
function isLao(s) { return /[\u0E80-\u0EFF]/.test(s); }
function fixData(D) {
  let n = 0;
  (function walk(o) {
    if (Array.isArray(o)) {
      for (let i = 0; i + 1 < o.length; i++) {
        if (typeof o[i] === 'string' && typeof o[i + 1] === 'string' && isLao(o[i]) && !isLao(o[i + 1]) && /[\u0900-\u097F]/.test(o[i + 1]) && BROKEN.test(o[i + 1])) { o[i + 1] = translit(o[i]); n++; }
      }
      o.forEach(walk); return;
    }
    if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k]));
  })(D);
  return n;
}
module.exports = { translit, fixData, BROKEN };
if (require.main === module && process.argv.includes('--fix')) {
  const fs = require('fs');
  for (const [f, v] of [['assets/kkb_lo_data.js', 'KKB_DATA'], ['assets/kkb2_lo_data.js', 'KKB2_DATA']]) {
    const t = fs.readFileSync(f, 'utf8'); const w = {}; new Function('window', t)(w); const D = w[v];
    const same = ('window.' + v + ' = ' + JSON.stringify(D, null, 1) + ';\n') === t;
    const n = fixData(D);
    let out;
    if (same) out = 'window.' + v + ' = ' + JSON.stringify(D, null, 1) + ';\n';
    else { console.log('⛔ ' + f + ': हूबहू-पुनर्रचना संभव नहीं — रुका'); process.exit(1); }
    fs.writeFileSync(f, out); console.log('✅ ' + f + ': ' + n + ' उच्चारण बदले');
  }
}
