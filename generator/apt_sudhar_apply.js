/* ============================================================
   generator/apt_sudhar_apply.js — v1.0 (20-Jul-2026)
   काम: generator/data/apt_sudhar_N.js की नई प्रश्न-पाठ सूची को
   /assets/apt_sets/ की pool-फ़ाइलों पर लागू करना (सिर्फ़ text-खाना)।
   पहरे: (1) हर id मिले और पाठ सचमुच बदले; (2) type/band/mg/udy/img अछूते;
   (3) वर्ग-6 lint — चौकोर-कोष्ठक निषेध · नंगा Roman शब्द निषेध
       (देवनागरी के बाद गोल-कोष्ठक में छूट) · वाक्य ≤ 20 शब्द;
   (4) पुनर्छपाई deterministic — बिना-बदले फ़ाइलें byte-बराबर रहें।
   चलाने का ढंग: node generator/apt_sudhar_apply.js apt_sudhar_1
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var OUTDIR = path.join(ROOT, 'assets', 'apt_sets');

var khep = process.argv[2];
if (!khep) { console.log('उपयोग: node generator/apt_sudhar_apply.js apt_sudhar_1'); process.exit(1); }
var MAP = require('./data/' + khep + '.js');
var ids = Object.keys(MAP);
console.log('सुधार-खेप:', khep, '| प्रश्न:', ids.length);

/* ---------- वर्ग-6 lint ---------- */
var LATIN_OK = /\(([A-Za-z][A-Za-z0-9 .\-\/]*)\)/g;   /* गोल-कोष्ठक के भीतर Roman = छूट */
function lint(id, t) {
  var errs = [];
  if (/[\[\]]/.test(t)) errs.push('चौकोर-कोष्ठक');
  var bare = t.replace(LATIN_OK, ' ');
  var m = bare.match(/[A-Za-z]{2,}/);
  if (m) errs.push('नंगा Roman शब्द: ' + m[0]);
  t.split(/[।?!]/).forEach(function (sent) {
    var w = sent.trim().split(/\s+/).filter(Boolean);
    if (w.length > 20) errs.push('लंबा वाक्य (' + w.length + ' शब्द)');
  });
  if (t.trim().length < 12) errs.push('बहुत छोटा पाठ');
  if (errs.length) throw new Error('❌ lint fail ' + id + ': ' + errs.join(' · ') + '\n   "' + t + '"');
}
ids.forEach(function (id) { lint(id, MAP[id]); });
console.log('वर्ग-6 lint: ' + ids.length + '/' + ids.length + ' पास ✅');

/* ---------- pool पढ़ो ---------- */
global.window = { APT_POOL: [] };
var files = fs.readdirSync(OUTDIR).filter(function (f) { return /\.js$/.test(f); }).sort();
var perFile = {};
files.forEach(function (f) {
  global.window.APT_POOL = [];
  eval(fs.readFileSync(path.join(OUTDIR, f), 'utf8'));
  perFile[f] = global.window.APT_POOL;
});

/* ---------- लागू करो (सिर्फ़ text) ---------- */
var applied = {}, changedFiles = {};
files.forEach(function (f) {
  perFile[f].forEach(function (q) {
    if (MAP[q.id] !== undefined) {
      if (q.text === MAP[q.id]) throw new Error('❌ ' + q.id + ' का पाठ पहले जैसा ही है — सुधार नहीं');
      q.text = MAP[q.id];
      applied[q.id] = 1; changedFiles[f] = 1;
    }
  });
});
var miss = ids.filter(function (id) { return !applied[id]; });
if (miss.length) throw new Error('❌ ये id pool में नहीं मिले: ' + miss.join(', '));
console.log('लागू: ' + ids.length + '/' + ids.length + ' | बदली फ़ाइलें: ' + Object.keys(changedFiles).sort().join(' '));

/* ---------- पुनर्छपाई (splitter जैसा ही emitter — byte-नियम) ---------- */
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
console.log('पुनर्छपाई पूरी — अब generator/dev_apt_check.js चलाकर मुहर लो।');
