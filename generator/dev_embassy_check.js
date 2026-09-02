/* ============================================================
   generator/dev_embassy_check.js — v1.1 (02-Sep-2026: पिन-मुक्त गिनती; +10 भाषा)
   दूतावास-कड़ी नियम (Addendum v6.1-घ) का check-robot।
   जाँचें: (1) KKB_CORRIDORS = ठीक वही slug जो courses/hi/bhasha/ में हैं
   (2) हर गलियारा-देश EMBASSIES में मौजूद (3) हर विदेशी/सुरक्षा कड़ी https
   (4) render-यंत्र: 3 दृश्य (गलियारा-सहित · विदेशी-कड़ी-रहित देश · ख़ाली-गलियारा)
   चलाना: node generator/dev_embassy_check.js   (repo-रूट से)
   ============================================================ */
'use strict';
var fs = require('fs'), path = require('path');
var ROOTDIR = path.join(__dirname, '..');
var fails = 0;
function ok(name, cond, extra) {
  if (cond) { console.log('  ✅ ' + name); }
  else { fails++; console.log('  ❌ ' + name + (extra ? ' — ' + extra : '')); }
}

var src = fs.readFileSync(path.join(ROOTDIR, 'assets/govt_jobs_embassy.js'), 'utf8');

/* फ़ाइल को एक scope में चलाकर असली objects निकालो (browser-समान) */
var sandbox = { document: { getElementById: function(){ return null; } }, location: { pathname: '/' } };
new Function('document', 'location', src + '\n;__out(EMBASSIES, EMB_COUNTRY_HI, FOREIGN_EMB_IN_INDIA, KKB_CORRIDORS, KKB_SAFETY);'
  .replace('__out', 'arguments[2]'))(sandbox.document, sandbox.location, function (E, HI, F, C, S) {
    sandbox.E = E; sandbox.HI = HI; sandbox.F = F; sandbox.C = C; sandbox.S = S;
  });
var E = sandbox.E, HI = sandbox.HI, F = sandbox.F, C = sandbox.C, S = sandbox.S;

console.log('— जाँच-1: slug कवरेज (folder-व्युत्पन्न) —');
var folders = fs.readdirSync(path.join(ROOTDIR, 'courses/hi/bhasha')).filter(function (d) {
  return fs.statSync(path.join(ROOTDIR, 'courses/hi/bhasha', d)).isDirectory();
}).sort();
var keys = Object.keys(C).sort();
ok('folder-गिनती > 0', folders.length > 0, String(folders.length)); /* v1.1 (02-Sep): हाथ-पिन 119 हटा — गिनती folder-सूची से व्युत्पन्न (v4.5 header-नियम); असली जाँच नीचे set-मिलान है */
ok('गलियारा-keys = folder-गिनती', keys.length === folders.length, keys.length + ' — ' + folders.length);
var miss = folders.filter(function (f2) { return !(f2 in C); });
var extra = keys.filter(function (k) { return folders.indexOf(k) < 0; });
ok('कोई slug छूटा नहीं', miss.length === 0, miss.join(','));
ok('कोई फालतू key नहीं', extra.length === 0, extra.join(','));

console.log('— जाँच-2: देश-keys वैध —');
var bad = [];
Object.keys(C).forEach(function (s2) {
  C[s2].forEach(function (c) {
    if (!E[c]) bad.push(s2 + '→' + c);
    if (!HI[c]) bad.push('HI-नाम नहीं: ' + c);
  });
});
ok('हर गलियारा-देश EMBASSIES+हिंदी-नाम में', bad.length === 0, bad.slice(0, 5).join(' | '));

console.log('— जाँच-3: कड़ियाँ https —');
var badUrl = [];
Object.keys(F).forEach(function (c) { if (!/^https:\/\//.test(F[c].u || F[c].url || '')) badUrl.push('F:' + c); });
S.forEach(function (x) { if (!/^https:\/\//.test(x.u)) badUrl.push('S:' + x.t); });
ok('सब विदेशी/सुरक्षा कड़ियाँ https', badUrl.length === 0, badUrl.join(','));

console.log('— जाँच-4: दिखने वाले पाठ में [ ] नहीं —');
var vis = src.substring(src.indexOf('KKB_CORRIDORS'));
var sq = (vis.match(/[\u0900-\u097F][^'"]*\[/g) || []).filter(function (m) { return !/\[(i|j)\b/.test(m); });
ok('देवनागरी-पाठ में चौकोर-कोष्ठक शून्य', sq.length === 0, sq.slice(0, 3).join(' | '));

console.log('— जाँच-5: render-यंत्र (3 दृश्य) —');
function scenario(slug) {
  var store = {}, made = [];
  var doc = {
    getElementById: function (id) {
      if (id === 'kkb-app') return store.app || (store.app = { parentNode: { insertBefore: function (n) { made.push(n); }, appendChild: function (n) { made.push(n); } }, nextSibling: {} });
      return null; /* kkb-embassy दोहराव-guard */
    },
    createElement: function () { return { setAttribute: function () {}, set innerHTML(v) { this._h = v; }, get innerHTML() { return this._h; } }; }
  };
  new Function('document', 'location', src)(doc, { pathname: '/courses/hi/bhasha/' + slug + '/' });
  return made.length ? made[0]._h : '';
}
var hA = scenario('arabic');
ok('arabic: 3 देश-कार्ड', (hA.match(/भारतीय दूतावास/g) || []).length === 3);
ok('arabic: UAE विदेशी-कड़ी', hA.indexOf('mofa.gov.ae') > -1);
var hJ = scenario('japanese');
ok('japanese: JFT-गलियारा कार्ड + विदेशी-कड़ी', hJ.indexOf('indembassy-tokyo') > -1 && hJ.indexOf('emb-japan') > -1);
var hL = scenario('levantine-arabic');
ok('जॉर्डन: विदेशी-कड़ी-रहित पर ईमानदार पंक्ति', hL.indexOf('अगले दौर में जुड़ेगी') > -1);
var hB = scenario('bhojpuri');
ok('bhojpuri: ख़ाली-गलियारा ईमानदार पंक्ति + सुरक्षा-कड़ियाँ', hB.indexOf('अगले दौर') > -1 && hB.indexOf('emigrate.gov.in') > -1);
ok('हर दृश्य में verify-नोट', [hA, hJ, hB].every(function (x) { return x.indexOf('ख़ुद verify') > -1; }));
ok('हर दृश्य में तीनों सुरक्षा-कड़ियाँ', [hA, hJ, hB].every(function (x) { return x.indexOf('madad.gov.in') > -1 && x.indexOf('mea.gov.in') > -1; }));

console.log(fails === 0 ? '\n🏁 सब जाँचें पास' : '\n❌ ' + fails + ' जाँच फेल');
process.exit(fails === 0 ? 0 : 1);
