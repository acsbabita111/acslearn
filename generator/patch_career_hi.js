/* patch_career_hi.js v1.1 (09-Nov-2026)
   Patches career.html (Hindi) to v1.8:
   1) reciprocal hreflang (hi/en/x-default) after canonical
   2) report-sample: inline mock-SVG (760x560) -> final certificate image
      /assets/career-report-sample-hi.webp
   3) removes the two Founder-removed disclaimer sentences
      ("...yogyata ka pramanpatra nahin." / "...yogyata-pramanpatra nahin.")
   4) version comment -> v1.8
   Exact-state idempotent: valid inputs are v1.7.2, v1.7.3 or v1.8;
   each op either applies (old found once) or verifies (new already exact)
   or FAILS. Second run on v1.8 = PASS with zero byte changes. */
'use strict';
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'career.html');

let fails = 0, changed = 0;
function ok(m){ console.log('  \u2713 ' + m); }
function skip(m){ console.log('  \u2713 (already) ' + m); }
function bad(m){ console.log('  \u2717 FAIL: ' + m); fails++; }
function count(h, n){ return h.split(n).length - 1; }

let s = fs.readFileSync(FILE, 'utf8');
const before = s;
console.log('career.html bytes=' + Buffer.byteLength(s));

/* state-op: oldStr once -> replace; else newStr present per check -> skip */
function op(label, oldStr, newStr, alreadyFn) {
  const c = count(s, oldStr);
  if (c === 1) { s = s.split(oldStr).join(newStr); changed++; ok(label); return; }
  if (c === 0 && alreadyFn()) { skip(label); return; }
  bad(label + ' (old\u00d7' + c + ', already=' + alreadyFn() + ')');
}

/* 1) hreflang — single home: LANGS registry (x-default = hi root) */
const LANGS = ['hi','en','zh','es','ar','fr','bn'];  // career.html live language versions, in order
function hrefOf(c){ return c==='hi' ? 'https://acslearn.com/career.html' : 'https://acslearn.com/'+c+'/career.html'; }
const CANON = '<link rel="canonical" href="https://acslearn.com/career.html">';
const HREF = LANGS.map(c => '\n<link rel="alternate" hreflang="'+c+'" href="'+hrefOf(c)+'">').join('') +
             '\n<link rel="alternate" hreflang="x-default" href="https://acslearn.com/career.html">';
const WANT = LANGS.length + 1;
if (count(s, CANON + HREF) === 1 && count(s, 'hreflang="') === WANT) {
  skip('hreflang \u00d7' + WANT + ' (registry: ' + LANGS.join(',') + ')');
} else if (count(s, CANON) === 1) {
  /* strip any existing alternate-block lines, then insert fresh registry block */
  s = s.replace(/\n<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '');
  if (count(s, 'hreflang="') !== 0) bad('stray hreflang remains after strip');
  s = s.split(CANON).join(CANON + HREF); changed++;
  ok('hreflang regenerated \u00d7' + WANT + ' (registry: ' + LANGS.join(',') + ')');
} else bad('canonical not found');

/* 2) mock-SVG -> certificate image */
const IMG = '<img src="/assets/career-report-sample-hi.webp" alt="\u0928\u092e\u0942\u0928\u093e \u0905\u092d\u093f\u0930\u0941\u091a\u093f-\u0930\u093f\u092a\u094b\u0930\u094d\u091f: \u0928\u093e\u092e, \u091f\u0947\u0938\u094d\u091f-\u092c\u094d\u092f\u094b\u0930\u093e, 4 \u0938\u0941\u091d\u093e\u090f \u0915\u094d\u0937\u0947\u0924\u094d\u0930, unique \u0928\u0902\u092c\u0930 \u0914\u0930 QR" width="1120" height="783" loading="lazy" decoding="async" style="width:100%;max-width:700px;height:auto;display:block;margin:10px auto;border-radius:10px;box-shadow:0 8px 22px rgba(11,31,58,.28)">';
const svgM = s.match(/<svg viewBox="0 0 760 560"[\s\S]*?<\/svg>/);
if (svgM) {
  if (count(s, svgM[0]) !== 1) bad('mock-SVG not unique');
  else { s = s.split(svgM[0]).join(IMG); changed++; ok('mock-SVG (' + svgM[0].length + 'B) \u2192 certificate <img>'); }
} else if (count(s, IMG) === 1) skip('certificate <img>');
else bad('neither mock-SVG nor <img> found');

/* 3) Founder-removed sentences */
op('para sentence removed',
   '\u092f\u0939 \u0905\u092d\u093f\u0930\u0941\u091a\u093f-\u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u0948, \u092f\u094b\u0917\u094d\u092f\u0924\u093e \u0915\u093e \u092a\u094d\u0930\u092e\u093e\u0923\u092a\u0924\u094d\u0930 \u0928\u0939\u0940\u0902\u0964 ', '',
   () => count(s, '\u0905\u092a\u0928\u0940 \u0905\u0932\u0917 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u092c\u0928\u093e\u0924\u093e \u0939\u0948\u0964 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0932\u0947\u0928\u093e') === 1);
op('\u20b9125-card sentence removed',
   '\u092f\u0939 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u0948, \u092f\u094b\u0917\u094d\u092f\u0924\u093e-\u092a\u094d\u0930\u092e\u093e\u0923\u092a\u0924\u094d\u0930 \u0928\u0939\u0940\u0902\u0964 ', '',
   () => count(s, '\u091c\u093e\u0901\u091a \u0939\u094b \u091c\u093e\u0924\u0940 \u0939\u0948\u0964 \u0928 \u0932\u0947\u0902 \u0924\u094b \u092d\u0940') === 1);

/* 4) version comment -> v1.8 */
const V18 = '<!-- generator: build_landing4.js v1.7.2 + hreflang v1.7.3 + report-sample v1.8 \u2014 \u0939\u093e\u0925 \u0938\u0947 \u0928 \u092c\u0926\u0932\u0947\u0902 -->';
const V173 = '<!-- generator: build_landing4.js v1.7.2 + hreflang v1.7.3 \u2014 \u0939\u093e\u0925 \u0938\u0947 \u0928 \u092c\u0926\u0932\u0947\u0902 -->';
const V172 = '<!-- generator: build_landing4.js v1.7.2 \u2014 \u0939\u093e\u0925 \u0938\u0947 \u0928 \u092c\u0926\u0932\u0947\u0902 -->';
if (count(s, V18) === 1) skip('ver v1.8');
else if (count(s, V173) === 1) { s = s.split(V173).join(V18); changed++; ok('ver v1.7.3 \u2192 v1.8'); }
else if (count(s, V172) === 1) { s = s.split(V172).join(V18); changed++; ok('ver v1.7.2 \u2192 v1.8'); }
else bad('version comment not recognized');

/* gates */
if (count(s, 'viewBox="0 0 760 560"') === 0) ok('gate: mock-SVG absent');
else bad('gate: mock-SVG still present');
if (count(s, '/assets/career-report-sample-hi.webp') === 1) ok('gate: image ref \u00d71');
else bad('gate: image ref count wrong');
['\u092f\u094b\u0917\u094d\u092f\u0924\u093e \u092f\u093e \u092a\u093e\u0938 \u0939\u094b\u0928\u0947 \u0915\u093e \u092a\u094d\u0930\u092e\u093e\u0923 \u0928\u0939\u0940\u0902',
 '\u092f\u094b\u0917\u094d\u092f\u0924\u093e \u0915\u093e \u092a\u094d\u0930\u092e\u093e\u0923\u092a\u0924\u094d\u0930 \u0928\u0939\u0940\u0902',
 '\u092f\u094b\u0917\u094d\u092f\u0924\u093e-\u092a\u094d\u0930\u092e\u093e\u0923\u092a\u0924\u094d\u0930 \u0928\u0939\u0940\u0902'].forEach(w => {
  if (count(s, w) === 0) ok('gate: removed-line absent');
  else bad('gate: removed-line still present: ' + w);
});
if (count(s, 'hreflang="') === WANT) ok('gate: hreflang ' + WANT); else bad('gate: hreflang \u2260 ' + WANT);
if (count(s, '\u092f\u0939 \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0926\u093f\u0936\u093e') === 0) ok('gate: old SVG advice line gone (now inside image)');
else bad('gate: stray SVG text remains');

if (fails) { console.log('\n\u26d4 ' + fails + ' FAIL \u2014 kuchh nahi likha.'); process.exit(1); }
if (s === before) console.log('\n\ud83c\udfc1 PASS \u2014 already v1.8, zero byte changes.');
else { fs.writeFileSync(FILE, s); console.log('\n\ud83c\udfc1 PASS \u2014 career.html v1.8 likha (' + Buffer.byteLength(s) + ' bytes, ops=' + changed + ')'); }
