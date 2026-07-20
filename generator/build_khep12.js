/* ============================================================
   generator/build_khep12.js — v1.0 (20-Jul-2026)
   काम: खेप-12 के 475 दिनचर्या-पाठ (khep12_texts + _b) से नए प्रश्न
   q1825–q2299 बनाना — उद्यम n का नया प्रश्न = भाई q(874+n) का पूरा
   ढाँचा-क्लोन (band/img/mg/udy/बाक़ी खाने विरासत — v4.1-क2), सिर्फ़
   id व text नए; भाई जिस shard-फ़ाइल में, नया उसी के अंत में append।
   पहरे: 285+190=475 · हर भाई मिले · वही वर्ग-6 lint · deterministic
   पुनर्छपाई (बिना-बदली फ़ाइलें byte-बराबर) · कुल 1824→2299।
   चलाना: node generator/build_khep12.js
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var OUTDIR = path.join(ROOT, 'assets', 'apt_sets');

var A = require('./data/khep12_texts.js');
var B = require('./data/khep12_texts_b.js');
if (A.length !== 285 || B.length !== 190) throw new Error('❌ भाग-गिनती ग़लत: ' + A.length + '+' + B.length);
var TEXTS = A.concat(B);
if (TEXTS.length !== 475) throw new Error('❌ कुल 475 नहीं: ' + TEXTS.length);
console.log('पाठ-भंडार: 285 + 190 = 475 ✅');

/* ---------- वही वर्ग-6 lint (apply-script जैसा) ---------- */
var LATIN_OK = /\(([A-Za-z][A-Za-z0-9 .\-\/]*)\)/g;
function lint(tag, t) {
  var errs = [];
  if (/[\[\]]/.test(t)) errs.push('चौकोर-कोष्ठक');
  var bare = t.replace(LATIN_OK, ' ');
  var m = bare.match(/[A-Za-z]{2,}/);
  if (m) errs.push('नंगा Roman: ' + m[0]);
  t.split(/[।?!]/).forEach(function (s) {
    var w = s.trim().split(/\s+/).filter(Boolean);
    if (w.length > 20) errs.push('लंबा वाक्य (' + w.length + ')');
  });
  if (t.trim().length < 12) errs.push('बहुत छोटा');
  if (errs.length) throw new Error('❌ lint ' + tag + ': ' + errs.join(' · ') + ' | "' + t + '"');
}
TEXTS.forEach(function (t, i) { lint('n' + (i + 1), t); });
console.log('वर्ग-6 lint: 475/475 पास ✅');

/* ---------- shards पढ़ो + भाई-सूचकांक ---------- */
global.window = { APT_POOL: [] };
var files = fs.readdirSync(OUTDIR).filter(function (f) { return /\.js$/.test(f); }).sort();
var perFile = {}, sibFile = {}, byId = {};
files.forEach(function (f) {
  global.window.APT_POOL = [];
  eval(fs.readFileSync(path.join(OUTDIR, f), 'utf8'));
  perFile[f] = global.window.APT_POOL;
  perFile[f].forEach(function (q) { byId[q.id] = q; sibFile[q.id] = f; });
});

/* ---------- नए प्रश्न: भाई-क्लोन + नया id/text ---------- */
var made = 0, touched = {};
for (var n = 1; n <= 475; n++) {
  var sib = byId['q' + (874 + n)];
  if (!sib) throw new Error('❌ भाई नहीं मिला: q' + (874 + n));
  if (!sib.udy || sib.udy[0] !== n) throw new Error('❌ भाई-udy बेमेल n' + n);
  var nq = {};
  Object.keys(sib).forEach(function (k) {
    nq[k] = JSON.parse(JSON.stringify(sib[k])); /* गहरा-क्लोन */
  });
  nq.id = 'q' + (1824 + n);
  nq.text = TEXTS[n - 1];
  if (byId[nq.id]) throw new Error('❌ id पहले से: ' + nq.id);
  var f = sibFile[sib.id];
  perFile[f].push(nq);
  byId[nq.id] = nq; touched[f] = 1; made++;
}
console.log('नए प्रश्न: ' + made + ' (q1825–q2299) | बदली फ़ाइलें: ' + Object.keys(touched).sort().join(' '));

/* ---------- deterministic पुनर्छपाई (apply-script वाला ही emitter) ---------- */
function emitQ(q) {
  var c = {}; Object.keys(q).forEach(function (k) { if (k !== 'set') c[k] = q[k]; });
  return '  ' + JSON.stringify(c);
}
files.forEach(function (f) {
  var src = fs.readFileSync(path.join(OUTDIR, f), 'utf8');
  var head = src.slice(0, src.indexOf('window.APT_POOL'));
  var body = head +
    'window.APT_POOL = window.APT_POOL || [];\n' +
    'window.APT_POOL.push.apply(window.APT_POOL, [\n' +
    perFile[f].map(emitQ).join(',\n') + '\n]);\n';
  fs.writeFileSync(path.join(OUTDIR, f), body);
});
var total = Object.keys(byId).length + 48; /* shards + आधार-48 */
console.log('पुनर्छपाई पूरी | shard-प्रश्न: ' + Object.keys(byId).length + ' + आधार 48 = ' + total + ' (चाहिए 2299)');
if (total !== 2299) throw new Error('❌ कुल-गिनती बेमेल');
console.log('अब dev_apt_check चलाकर छहों मुहरें लो।');
