/* ============================================================
   generator/build_khep_jeevan.js — v1.0 (21-Jul-2026)
   जीवनशैली कोण भाग-1: उद्यम n=1–475 के पाठ से नए प्रश्न
   q7525–q7999। भाई = q(874+n) (band/img/mg/udy विरासत);
   id = q(7524+n)। कुल 7524→7999।
   चलाना: node generator/build_khep_jeevan.js
   ============================================================ */
'use strict';
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..'), OUTDIR = path.join(ROOT, 'assets', 'apt_sets');

var A = require('./data/khep_jeevan_texts.js');
var B = require('./data/khep_jeevan_texts_b.js');
if (A.length !== 240 || B.length !== 235) throw new Error('❌ भाग-गिनती: ' + A.length + '+' + B.length);
var TEXTS = A.concat(B);
if (TEXTS.length !== 475) throw new Error('❌ कुल 475 नहीं');
console.log('पाठ-भंडार: 240 + 235 = 475 ✅');

var LATIN_OK = /\(([A-Za-z][A-Za-z0-9 .\-\/]*)\)/g;
function lint(tag, t) {
  var e = [];
  if (/[\[\]]/.test(t)) e.push('चौकोर');
  var m = t.replace(LATIN_OK, ' ').match(/[A-Za-z]{2,}/); if (m) e.push('Roman:' + m[0]);
  t.split(/[।?!]/).forEach(function (s) { var w = s.trim().split(/\s+/).filter(Boolean); if (w.length > 20) e.push('लंबा(' + w.length + ')'); });
  if (t.trim().length < 12) e.push('छोटा');
  if (e.length) throw new Error('❌ lint ' + tag + ': ' + e.join(' · ') + ' | "' + t + '"');
}
TEXTS.forEach(function (t, i) { lint('n' + (i + 1), t); });
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
for (var n = 1; n <= 475; n++) {
  var sib = byId['q' + (874 + n)];
  if (!sib) throw new Error('❌ भाई नहीं: q' + (874 + n));
  if (!sib.udy || sib.udy[0] !== n) throw new Error('❌ udy बेमेल n' + n);
  var nq = {};
  Object.keys(sib).forEach(function (k) { nq[k] = JSON.parse(JSON.stringify(sib[k])); });
  nq.id = 'q' + (7524 + n);
  nq.text = TEXTS[n - 1];
  if (byId[nq.id]) throw new Error('❌ id पहले से: ' + nq.id);
  var f = sibFile[sib.id];
  perFile[f].push(nq); byId[nq.id] = nq; touched[f] = 1; made++;
}
console.log('नए प्रश्न: ' + made + ' (q7525–q7999) | बदली फ़ाइलें: ' + Object.keys(touched).sort().join(' '));

function emitQ(q) { var c = {}; Object.keys(q).forEach(function (k) { if (k !== 'set') c[k] = q[k]; }); return '  ' + JSON.stringify(c); }
files.forEach(function (f) {
  var src = fs.readFileSync(path.join(OUTDIR, f), 'utf8');
  var head = src.slice(0, src.indexOf('window.APT_POOL'));
  fs.writeFileSync(path.join(OUTDIR, f),
    head + 'window.APT_POOL = window.APT_POOL || [];\n' +
    'window.APT_POOL.push.apply(window.APT_POOL, [\n' +
    perFile[f].map(emitQ).join(',\n') + '\n]);\n');
});
var total = Object.keys(byId).length + 48;
console.log('पुनर्छपाई पूरी | shard ' + Object.keys(byId).length + ' + आधार 48 = ' + total + ' (चाहिए 7999)');
if (total !== 7999) throw new Error('❌ कुल-गिनती बेमेल');
console.log('अब dev_apt_check चलाओ।');
