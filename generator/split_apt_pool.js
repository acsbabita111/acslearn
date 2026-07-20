/* ============================================================
   generator/split_apt_pool.js — v1.0 (अभिरुचि नींव-दौर, 20-Jul-2026)
   काम: 701KB की एक aptitude_data.js को तोड़कर —
   (1) आधार-फ़ाइल: scoring + कथाएँ + layer-1 के 48 प्रश्न (मुफ़्त-झलक अछूती)
   (2) /assets/apt_sets/broad.js  : बिना udy-ठप्पे वाले समूह-स्तर प्रश्न (खंड-1 भंडार)
   (3) /assets/apt_sets/mgNN.js   : udy-ठप्पे वाले गहराई-प्रश्न, मुख्य-MG के घर में
   नियम (Founder, 20-Jul): खेप-पहचान ख़त्म — सब एक मिला-जुला भंडार; बँटवारा
   सिर्फ़ ज्ञान-समूह से। हर प्रश्न की सामग्री हूबहू (deep-equal जाँच नीचे)।
   प्रश्न-वस्तु से "set" खाना हटाया जाता है (खेप-पहचान ख़त्म) — बाक़ी सब खाने ज्यों-के-त्यों।
   ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var SRC = path.join(ROOT, 'assets', 'aptitude_data.js');
var OUTDIR = path.join(ROOT, 'assets', 'apt_sets');

/* ---------- स्रोत पढ़ो ---------- */
global.window = {};
eval(fs.readFileSync(SRC, 'utf8'));
var D = global.window.APT_DATA;
if (!D || !D.questions) { throw new Error('स्रोत APT_DATA नहीं मिला'); }
var ALL = D.questions;
console.log('स्रोत प्रश्न:', ALL.length);

/* ---------- वर्गीकरण ---------- */
function hasUdy(q) {
  if (q.udy && q.udy.length) return true;
  if (q.opts) { for (var i = 0; i < q.opts.length; i++) { if (q.opts[i].udy && q.opts[i].udy.length) return true; } }
  return false;
}
function mgOf(q) { /* मुख्य-MG: प्रश्न-स्तर mg[0], न हो तो पहले विकल्प का */
  if (q.mg && q.mg.length) return q.mg[0];
  if (q.opts) { for (var i = 0; i < q.opts.length; i++) { if (q.opts[i].mg && q.opts[i].mg.length) return q.opts[i].mg[0]; } }
  return 0;
}
var base = [], broad = [], mgBins = {};
ALL.forEach(function (q) {
  if (q.layer === 1) { base.push(q); return; }        /* मुफ़्त-झलक भंडार — आधार में */
  if (!hasUdy(q)) { broad.push(q); return; }           /* समूह-स्तर — खंड-1 */
  var m = mgOf(q); if (!m) m = 0;
  (mgBins[m] = mgBins[m] || []).push(q);               /* गहराई — खंड-2/3 */
});

/* खेप-पहचान ख़त्म: मिला-जुला क्रम (id से स्थिर छाँट — दो बार चलाओ, byte-बराबर निकले) */
function stableMix(arr) {
  return arr.slice().sort(function (a, b) { /* id के अंकों को उलट कर छाँट = खेप-क्रम टूटे, पर deterministic */
    var ra = String(a.id).split('').reverse().join(''), rb = String(b.id).split('').reverse().join('');
    return ra < rb ? -1 : ra > rb ? 1 : 0;
  });
}
broad = stableMix(broad);
Object.keys(mgBins).forEach(function (k) { mgBins[k] = stableMix(mgBins[k]); });

/* ---------- छपाई (प्रश्न हूबहू; सिर्फ़ "set" खाना हटे) ---------- */
function emitQ(q) {
  var c = {}; Object.keys(q).forEach(function (k) { if (k !== 'set') c[k] = q[k]; });
  return '  ' + JSON.stringify(c);
}
function fileHeader(title, note) {
  return '/* ============================================================\n' +
    '   ' + title + ' — नींव-दौर v1.0 (मूल भाषा: हिंदी)\n' +
    '   ' + note + '\n' +
    '   नियम: यह फ़ाइल generator/split_apt_pool.js से बनी — हाथ से न बदलें (परत-4)।\n' +
    '   खेप-पहचान ख़त्म (Founder, 20-Jul-2026) — यह मिला-जुला भंडार है।\n' +
    '   ============================================================ */\n';
}
function emitPoolFile(fp, title, note, arr) {
  var body = fileHeader(title, note) +
    'window.APT_POOL = window.APT_POOL || [];\n' +
    'window.APT_POOL.push.apply(window.APT_POOL, [\n' +
    arr.map(emitQ).join(',\n') + '\n]);\n';
  fs.writeFileSync(fp, body);
  return body.length;
}

if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

/* broad */
var manifest = { broad: '/assets/apt_sets/broad.js', mg: {} };
var bytes = {};
bytes['broad.js'] = emitPoolFile(path.join(OUTDIR, 'broad.js'),
  '/assets/apt_sets/broad.js', 'समूह-स्तर प्रश्न (बिना udy-ठप्पा) — session खंड-1 का भंडार। गिनती: ' + broad.length, broad);

/* mg टुकड़े */
Object.keys(mgBins).map(Number).sort(function (a, b) { return a - b; }).forEach(function (m) {
  var name = 'mg' + (m < 10 ? '0' + m : m) + '.js';
  bytes[name] = emitPoolFile(path.join(OUTDIR, name),
    '/assets/apt_sets/' + name, 'MG-' + m + ' के udy-गहराई प्रश्न — session खंड-2/3 का भंडार। गिनती: ' + mgBins[m].length, mgBins[m]);
  manifest.mg[m] = '/assets/apt_sets/' + name;
});

/* ---------- आधार-फ़ाइल v12.0 (मुफ़्त-झलक अछूती) ---------- */
var baseBody = '/* ============================================================\n' +
  '   /assets/aptitude_data.js — v12.0 (नींव-दौर, 20-Jul-2026 · मूल भाषा: हिंदी)\n' +
  '   ACS Aptitude आधार-फ़ाइल (परत-3) — इसमें सिर्फ़:\n' +
  '   (1) scoring-नियम  (2) कथाएँ  (3) मुफ़्त-झलक भंडार (layer-1 के ' + base.length + ' प्रश्न —\n' +
  '       पहले 24 झलक-इंजन दिखाता है; Founder-आदेश: इन्हें कभी न बदलें)\n' +
  '   (4) pool-नक़्शा: बाक़ी पूरा भंडार /assets/apt_sets/ की फ़ाइलों में —\n' +
  '       broad.js (समूह-स्तर) + mgNN.js (udy-गहराई)। खेप-पहचान ख़त्म —\n' +
  '       सब एक मिला-जुला भंडार; फ़ाइलें सिर्फ़ आलसी-load के टुकड़े हैं।\n' +
  '   - गिनती-विधि (v3.9 यथावत): पट्टी 5 चेहरे → −5/−2/0/+2/+5 (0 = जानता नहीं —\n' +
  '     अलग गिनती, औसत में नहीं); चित्र-चुनाव पहले +3/कम −1; जोड़ी +2; कहानी pts।\n' +
  '   - band: 1=खोज(10-13) 2=दिशा(14-17) 3=राह(18+)।\n' +
  '   - यह फ़ाइल generator/split_apt_pool.js से बनी — हाथ से न बदलें (परत-4)।\n' +
  '   ============================================================ */\n' +
  'window.APT_DATA = {\n' +
  '  version: "12.0",\n  lang: "hi",\n' +
  '  scoring: ' + JSON.stringify(D.scoring) + ',\n' +
  '  pool: ' + JSON.stringify(manifest) + ',\n' +
  '  questions: [\n' + base.map(emitQ).join(',\n') + '\n  ],\n' +
  '  stories: ' + JSON.stringify(D.stories, null, 2).replace(/\n/g, '\n  ') + '\n' +
  '};\n';
fs.writeFileSync(SRC, baseBody);

/* ---------- लेखा ---------- */
var mgTotal = 0; Object.keys(mgBins).forEach(function (k) { mgTotal += mgBins[k].length; });
console.log('आधार (layer-1):', base.length, '| broad:', broad.length, '| mg-गहराई:', mgTotal,
  '| योग:', base.length + broad.length + mgTotal, '(चाहिए ' + ALL.length + ')');
if (base.length + broad.length + mgTotal !== ALL.length) throw new Error('byte-लेखा फेल — गिनती नहीं मिली!');
console.log('mg-टुकड़े:', Object.keys(mgBins).map(function (k) { return 'MG' + k + '=' + mgBins[k].length; }).join(' '));
Object.keys(bytes).forEach(function (f) { console.log('  ', f, Math.round(bytes[f] / 1024) + 'KB'); });
console.log('आधार-फ़ाइल:', Math.round(baseBody.length / 1024) + 'KB');
console.log('✅ विभाजन पूरा — अब deep-equal जाँच generator/dev_apt_check.js से।');
