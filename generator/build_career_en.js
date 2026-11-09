/* build_career_en.js v1.1 (09-Nov-2026)
   Builds /en/career.html from career.html (hi, v1.8) + career_en_strings.js v1.1.
   Hindi file is NOT touched here (see patch_career_hi.js). Pure function of the
   v1.8 source: every run on the packaged state PASSES with identical bytes.
   Fail-closed: node-count pin, digit-set check per pair, zero Devanagari left,
   forbidden/required string gates, hreflang raw==unique==3, idempotence.
   Run: node generator/build_career_en.js   (from repo root / work dir) */
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('./career_en_strings.js');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'career.html');
const OUT_DIR = path.join(ROOT, 'en');
const OUT_EN = path.join(OUT_DIR, 'career.html');

let fails = 0;
function ok(m){ console.log('  \u2713 ' + m); }
function bad(m){ console.log('  \u2717 FAIL: ' + m); fails++; }
function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function count(h, n){ return h.split(n).length - 1; }
function digits(s){ const m = s.match(/\d[\d,\.]*/g) || []; return m.map(x=>x.replace(/[,\.]+$/,'')); }

const hi = fs.readFileSync(SRC, 'utf8');
console.log('\u0938\u094d\u0930\u094b\u0924: career.html (hi) bytes=' + Buffer.byteLength(hi));

/* 1) extract hi nodes exactly as inventory did (unique, first-seen) */
const nodeRe = />([^<>]*[\u0900-\u097F][^<>]*)</g;
const seen = new Set(); const hiNodes = [];
let m;
while ((m = nodeRe.exec(hi)) !== null) {
  if (m[1].trim() && !seen.has(m[1])) { seen.add(m[1]); hiNodes.push(m[1]); }
}
const attrRe = /(aria-label|alt|content|title|placeholder)="([^"]*[\u0900-\u097F][^"]*)"/g;
const aSeen = new Set(); const hiAttrs = [];
while ((m = attrRe.exec(hi)) !== null) {
  if (!aSeen.has(m[2])) { aSeen.add(m[2]); hiAttrs.push(m[2]); }
}
if (hiNodes.length === S.COUNT) ok('node-count pin ' + S.COUNT + '/' + S.COUNT);
else bad('node-count ' + hiNodes.length + ' \u2260 pin ' + S.COUNT + ' (hi career badla? strings re-align karo)');
if (hiAttrs.length === S.ATTR_COUNT) ok('attr-count pin ' + S.ATTR_COUNT + '/' + S.ATTR_COUNT);
else bad('attr-count ' + hiAttrs.length + ' \u2260 ' + S.ATTR_COUNT);
if (fails) { console.log('\u26d4 ruk gaya.'); process.exit(1); }

/* 2) digit-set guard per pair (hi digits \u2286 en digits, exempt list) */
for (let i = 0; i < S.COUNT; i++) {
  if (S.NUM_EXEMPT[i]) continue;
  const hd = digits(hiNodes[i]); if (!hd.length) continue;
  const ed = digits(S.EN[i]);
  for (const d of hd) {
    const k = ed.indexOf(d);
    if (k === -1) { bad('digit "' + d + '" missing @idx ' + i + ' | hi: ' + hiNodes[i].slice(0,50) + ' | en: ' + S.EN[i].slice(0,50)); break; }
    ed.splice(k, 1);
  }
}
if (!fails) ok('digit-set guard: saare pairs pass');
if (fails) { console.log('\u26d4 ruk gaya.'); process.exit(1); }

let en = hi;

/* 3) hero cross-link anchor first (Latin text, exact once) */
const oldA = 'href="/en/aptitude-test.html" style="color:#F9A825;font-weight:800">Free 24-question preview in English \u2192';
const newA = 'href="/career.html" style="color:#F9A825;font-weight:800">Read this page in Hindi \u2192';
if (count(en, oldA) === 1) { en = en.split(oldA).join(newA); ok('hero cross-link \u2192 Hindi'); }
else bad('hero cross-link anchor ' + count(en, oldA) + ' \u2260 1');

/* 4) node replacements, longest first, boundary-safe >x< */
const order = Array.from({length: S.COUNT}, (_, i) => i)
  .sort((a, b) => hiNodes[b].length - hiNodes[a].length);
let repl = 0;
for (const i of order) {
  const from = '>' + hiNodes[i] + '<';
  const to = '>' + S.EN[i] + '<';
  const c = count(en, from);
  if (c < 1) { bad('node @' + i + ' not found: ' + hiNodes[i].slice(0, 60)); continue; }
  en = en.split(from).join(to); repl += c;
}
ok('nodes replaced: ' + repl + ' occurrences (' + S.COUNT + ' unique)');

/* 5) attribute replacements */
const aOrder = Array.from({length: S.ATTR_COUNT}, (_, i) => i)
  .sort((a, b) => hiAttrs[b].length - hiAttrs[a].length);
for (const i of aOrder) {
  const from = '="' + hiAttrs[i] + '"';
  const to = '="' + S.ATTR_EN[i] + '"';
  const c = count(en, from);
  if (c < 1) { bad('attr @' + i + ' not found: ' + hiAttrs[i].slice(0, 50)); continue; }
  en = en.split(from).join(to);
}
ok('attrs replaced');

/* 6) link rewrites */
function rew(from, to, min) {
  const c = count(en, from);
  if (c < min) { bad('link ' + from + ' count ' + c + ' < ' + min); return; }
  en = en.split(from).join(to); ok('link ' + from + ' \u00d7' + c + ' \u2192 ' + to);
}
rew('href="/aptitude-test.html#apt-start"', 'href="/en/aptitude-test.html"', 1);
const fullKeep = count(en, 'href="/aptitude-test.html#apt-full"');
rew('href="/aptitude-test.html"', 'href="/en/aptitude-test.html"', 1);
if (count(en, 'href="/aptitude-test.html#apt-full"') === fullKeep && fullKeep >= 1) ok('#apt-full (Hindi full test) untouched \u00d7' + fullKeep);
else bad('#apt-full badla/gaayab');
rew('href="/"', 'href="/en/"', 1);

/* 7) head ops */
function one(from, to, label) {
  const c = count(en, from);
  if (c !== 1) { bad(label + ' count ' + c + ' \u2260 1'); return; }
  en = en.split(from).join(to); ok(label);
}
one('<html lang="hi">', '<html lang="en">', 'lang=en');
one('rel="canonical" href="https://acslearn.com/career.html"',
    'rel="canonical" href="https://acslearn.com/en/career.html"', 'canonical \u2192 /en/');
one('property="og:url" content="https://acslearn.com/career.html"',
    'property="og:url" content="https://acslearn.com/en/career.html"', 'og:url \u2192 /en/');
one('content="hi_IN"', 'content="en_US"', 'og:locale en_US');
const noto = '&family=Noto+Sans+Devanagari:wght@400;600;700;800;900';
if (count(en, noto) >= 1) { en = en.split(noto).join(''); ok('fonts: Inter-only (Noto Devanagari hata)'); }
else bad('Noto-family string nahi mila');
/* hreflang: v1.8 source already carries the 3 absolute alternates (hi/en/x-default) */
if (count(en, 'hreflang="hi"') === 1 && count(en, 'hreflang="en"') === 1 && count(en, 'hreflang="x-default"') === 1) ok('hreflang \u00d73 inherited from source');
else bad('hreflang inheritance broken');
one('<!-- generator: build_landing4.js v1.7.2 + hreflang v1.7.3 + report-sample v1.8 \u2014 \u0939\u093e\u0925 \u0938\u0947 \u0928 \u092c\u0926\u0932\u0947\u0902 -->',
    '<!-- generator: build_career_en.js v1.1 (from career.html hi v1.8) \u2014 do not edit by hand -->', 'ver-stamp EN');
one('src="/assets/career-report-sample-hi.webp"', 'src="/assets/career-report-sample-en.webp"', 'certificate image \u2192 EN asset');
one('<!-- \u092a\u0930\u0924 1: CONFIG + LINKS -->', '<!-- layer 1: CONFIG + LINKS -->', 'comment: layer-1 EN');

/* 8) robot gates on EN output */
const dev = en.match(/[\u0900-\u097F]/g);
if (!dev) ok('Devanagari left: 0');
else {
  bad('Devanagari left: ' + dev.length);
  const ctx = en.match(/.{0,40}[\u0900-\u097F].{0,40}/g) || [];
  ctx.slice(0, 10).forEach(c => console.log('    \u2026' + c.replace(/\n/g, ' ') + '\u2026'));
}
['Adaptive Testing', 'adaptive testing', '950 industries', '950 sectors',
 '100% guarantee', 'certified by RIASEC', 'RIASEC-certified',
 'not proof of ability', 'not a qualification certificate', 'qualification certificate'].forEach(w => {
  if (en.indexOf(w) === -1) ok('forbidden absent: ' + w);
  else bad('forbidden present: ' + w);
});
['Career Interest Test', 'ACS GOLDEN PASS', 'RIASEC', '18,943',
 '951 enterprise categories', 'dynamic question selection', 'Golden Pass Included',
 'based on / inspired by', 'Original language: Hindi', 'Also in Hindi',
 'enterprise opportunities', 'Applied Computer School'].forEach(w => {
  if (en.indexOf(w) !== -1) ok('required present: ' + w);
  else bad('required missing: ' + w);
});
const hrRaw = count(en, 'hreflang="');
const hrSet = new Set((en.match(/hreflang="[^"]+"/g) || []));
if (hrRaw === 3 && hrSet.size === 3) ok('hreflang raw=3 unique=3');
else bad('hreflang raw=' + hrRaw + ' unique=' + hrSet.size);

/* 9) hi source gate: must be v1.8 (patch_career_hi.js) and is never written here */
if (count(hi, 'report-sample v1.8') === 1) ok('hi source is v1.8');
else bad('hi source is not v1.8: run patch_career_hi.js first');

if (fails) { console.log('\n\u26d4 ' + fails + ' FAIL \u2014 kuchh nahi likha.'); process.exit(1); }

/* 10) write EN only; pure function of hi v1.8 source => re-run byte-identical */
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const prev = fs.existsSync(OUT_EN) ? fs.readFileSync(OUT_EN, 'utf8') : null;
fs.writeFileSync(OUT_EN, en);
console.log('\n\ud83c\udfc1 PASS \u2014 likha: en/career.html (' + Buffer.byteLength(en) + ' bytes)' + (prev === en ? ' [re-run: zero byte changes]' : ''));
