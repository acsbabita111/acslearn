/* ============================================================
   generator/build_khep_kalpana2.js — v1.0 (21-Jul-2026)
   अपना-उद्यम कल्पना कोण भाग-2: उद्यम n=476–950 → q8950–q9424।
   भाई = q(874+n); id = q(8474+n)। कुल 8949→9424।
   चलाना: node generator/build_khep_kalpana2.js
   ============================================================ */
'use strict';
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..'), OUTDIR = path.join(ROOT, 'assets', 'apt_sets');

var C = require('./data/khep_kalpana_texts_c.js');   /* n476–n715 = 240 */
var D = require('./data/khep_kalpana_texts_d.js');   /* n716–n950 = 235 */
if (C.length !== 240 || D.length !== 235) throw new Error('❌ भाग-गिनती: ' + C.length + '+' + D.length);
var TEXTS = C.concat(D);
if (TEXTS.length !== 475) throw new Error('❌ कुल 475 नहीं');
console.log('पाठ-भंडार: 240 + 235 = 475 ✅ (उद्यम 476–950)');

var LATIN_OK = /\(([A-Za-z][A-Za-z0-9 .\-\/]*)\)/g;
function lint(tag, t) {
  var e = [];
  if (/[\[\]]/.test(t)) e.push('चौकोर');
  var m = t.replace(LATIN_OK, ' ').match(/[A-Za-z]{2,}/); if (m) e.push('Roman:' + m[0]);
  t.split(/[।?!]/).forEach(function (s) { var w = s.trim().split(/\s+/).filter(Boolean); if (w.length > 20) e.push('लंबा(' + w.length + ')'); });
  if (t.trim().length < 12) e.push('छोटा');
  if (e.length) throw new Error('❌ lint ' + tag + ': ' + e.join(' · ') + ' | "' + t + '"');
}
TEXTS.forEach(function (t, i) { lint('n' + (476 + i), t); });
console.log('वर्ग-6 lint: 475/475 पास ✅');

global.window = { APT_POOL: [] };
var files = fs.readdirSync(OUTDIR).filter(function (f) { return /\.js$/.test(f); }).sort();
var perFile = {}, sibFile = {}, byId = {};
files.forEach(function (f) {
  global.window.APT_POOL = [];
  eval(fs.readFileSync(path.join(OUTDIR, f), 'utf8'));
  perFile[f] = global.window.APT_POOL;
  perFile[f].forEach(function (q) { byId[q.id] = q; sibFile[q.id] = f; });
});

var made = 0, touched = {};
for (var k = 0; k < 475; k++) {
  var n = 476 + k;
  var sib = byId['q' + (874 + n)];
  if (!sib) throw new Error('❌ भाई नहीं: q' + (874 + n));
  if (!sib.udy || sib.udy[0] !== n) throw new Error('❌ udy बेमेल n' + n);
  var nq = {};
  Object.keys(sib).forEach(function (key) { nq[key] = JSON.parse(JSON.stringify(sib[key])); });
  nq.id = 'q' + (8474 + n);
  nq.text = TEXTS[k];
  if (byId[nq.id]) throw new Error('❌ id पहले से: ' + nq.id);
  var f = sibFile[sib.id];
  perFile[f].push(nq); byId[nq.id] = nq; touched[f] = 1; made++;
}
console.log('नए प्रश्न: ' + made + ' (q8950–q9424) | बदली फ़ाइलें: ' + Object.keys(touched).sort().join(' '));

function emitQ(q) { var c = {}; Object.keys(q).forEach(function (key) { if (key !== 'set') c[key] = q[key]; }); return '  ' + JSON.stringify(c); }
files.forEach(function (f) {
  var src = fs.readFileSync(path.join(OUTDIR, f), 'utf8');
  var head = src.slice(0, src.indexOf('window.APT_POOL'));
  fs.writeFileSync(path.join(OUTDIR, f),
    head + 'window.APT_POOL = window.APT_POOL || [];\n' +
    'window.APT_POOL.push.apply(window.APT_POOL, [\n' +
    perFile[f].map(emitQ).join(',\n') + '\n]);\n');
});
var total = Object.keys(byId).length + 48;
console.log('पुनर्छपाई पूरी | shard ' + Object.keys(byId).length + ' + आधार 48 = ' + total + ' (चाहिए 9424)');
if (total !== 9424) throw new Error('❌ कुल-गिनती बेमेल');
console.log('अब dev_apt_check चलाओ।');
