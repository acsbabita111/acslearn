/* build_career_lang.js v1.2 (09-Nov-2026)
   v1.2: META.swaps surgical-op; version-less page stamp (builder upgrades
   no longer touch page bytes unless output ops change).
   Generic builder: /<code>/career.html from career.html (hi v1.8) +
   generator/career_<code>_strings.js. Supersedes build_career_en.js for
   all languages including en (same en output except hreflang set + stamp).
   Pure function of the hi source: re-run => byte-identical. Fail-closed:
   node/attr pin, per-pair digit guard, zero Devanagari, target-script
   minimum, forbidden/required gates, hreflang inherit check.
   Run: node generator/build_career_lang.js <code>   e.g. en, zh */
'use strict';
const fs = require('fs');
const path = require('path');

const code = (process.argv[2] || '').trim();
if (!code) { console.log('usage: node build_career_lang.js <code>'); process.exit(1); }
const S = require('./career_' + code + '_strings.js');
const T = S.T || S.EN;                 // translated node texts
const AT = S.ATTR_T || S.ATTR_EN;      // translated attr texts
const NUM_EXEMPT = S.NUM_EXEMPT || {};

/* per-language META with en defaults (keeps existing en output semantics) */
const DEF = {
  locale: 'en_US', dir: 'ltr',
  fontRepl: '',                        /* replaces the Noto-Devanagari family chunk */
  svgFont: 'Inter',                    /* replaces 'Noto Sans Devanagari' in SVG font-family */
  homeHref: '/en/',
  previewHref: '/en/aptitude-test.html',
  crossAnchor: 'href="/career.html" style="color:#F9A825;font-weight:800">Read this page in Hindi \u2192',
  certImg: '/assets/career-report-sample-en.webp',
  scriptRe: null, scriptMin: 0,
  required: [], forbidden: [],
  stampNote: ''
};
const META = Object.assign({}, DEF, S.META || {});

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'career.html');
const OUT_DIR = path.join(ROOT, code);
const OUT = path.join(OUT_DIR, 'career.html');

let fails = 0;
function ok(m){ console.log('  \u2713 ' + m); }
function bad(m){ console.log('  \u2717 FAIL: ' + m); fails++; }
function count(h, n){ return h.split(n).length - 1; }
function digits(s){ const m = s.match(/\d[\d,\.]*/g) || []; return m.map(x=>x.replace(/[,\.]+$/,'')); }

const hi = fs.readFileSync(SRC, 'utf8');
console.log('source: career.html (hi) bytes=' + Buffer.byteLength(hi) + ' | lang=' + code);
if (count(hi, 'report-sample v1.8') !== 1) { bad('hi source is not v1.8: run patch_career_hi.js first'); }

/* 1) extract hi nodes/attrs (unique, first-seen) */
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
if (hiNodes.length === T.length) ok('node-count pin ' + T.length + '/' + T.length);
else bad('node-count ' + hiNodes.length + ' \u2260 strings ' + T.length);
if (hiAttrs.length === AT.length) ok('attr-count pin ' + AT.length + '/' + AT.length);
else bad('attr-count ' + hiAttrs.length + ' \u2260 ' + AT.length);
if (fails) { console.log('\u26d4 stop.'); process.exit(1); }

/* 2) digit-set guard */
for (let i = 0; i < T.length; i++) {
  if (NUM_EXEMPT[i]) continue;
  const hd = digits(hiNodes[i]); if (!hd.length) continue;
  const ed = digits(T[i]);
  for (const d of hd) {
    const k = ed.indexOf(d);
    if (k === -1) { bad('digit "' + d + '" missing @idx ' + i + ' | hi: ' + hiNodes[i].slice(0,50)); break; }
    ed.splice(k, 1);
  }
}
if (!fails) ok('digit-set guard: all pairs pass');
if (fails) { console.log('\u26d4 stop.'); process.exit(1); }

let out = hi;

/* 3) hero cross-link anchor (Latin, exact once in hi source) */
const oldA = 'href="/en/aptitude-test.html" style="color:#F9A825;font-weight:800">Free 24-question preview in English \u2192';
if (count(out, oldA) === 1) { out = out.split(oldA).join(META.crossAnchor); ok('hero cross-link set'); }
else bad('hero cross-link anchor \u00d7' + count(out, oldA));

/* 4) node replacements, longest first */
const order = Array.from({length: T.length}, (_, i) => i)
  .sort((a, b) => hiNodes[b].length - hiNodes[a].length);
let repl = 0;
for (const i of order) {
  const from = '>' + hiNodes[i] + '<';
  const c = count(out, from);
  if (c < 1) { bad('node @' + i + ' not found: ' + hiNodes[i].slice(0, 60)); continue; }
  out = out.split(from).join('>' + T[i] + '<'); repl += c;
}
ok('nodes replaced: ' + repl + ' occurrences (' + T.length + ' unique)');

/* 5) attrs */
const aOrder = Array.from({length: AT.length}, (_, i) => i)
  .sort((a, b) => hiAttrs[b].length - hiAttrs[a].length);
for (const i of aOrder) {
  const from = '="' + hiAttrs[i] + '"';
  if (count(out, from) < 1) { bad('attr @' + i + ' not found'); continue; }
  out = out.split(from).join('="' + AT[i] + '"');
}
ok('attrs replaced');

/* 6) links */
function rew(from, to, min, label) {
  const c = count(out, from);
  if (c < min) { bad(label + ' \u00d7' + c + ' < ' + min); return; }
  out = out.split(from).join(to); ok(label + ' \u00d7' + c);
}
rew('href="/aptitude-test.html#apt-start"', 'href="' + META.previewHref + '"', 1, 'preview CTA');
const fullKeep = count(out, 'href="/aptitude-test.html#apt-full"');
rew('href="/aptitude-test.html"', 'href="' + META.previewHref + '"', 1, 'test-page link');
if (count(out, 'href="/aptitude-test.html#apt-full"') === fullKeep && fullKeep >= 1) ok('#apt-full (Hindi full test) untouched \u00d7' + fullKeep);
else bad('#apt-full changed');
rew('href="/"', 'href="' + META.homeHref + '"', 1, 'home link');

/* 7) head */
function one(from, to, label) {
  const c = count(out, from);
  if (c !== 1) { bad(label + ' \u00d7' + c + ' \u2260 1'); return; }
  out = out.split(from).join(to); ok(label);
}
one('<html lang="hi">', '<html lang="' + code + '"' + (META.dir === 'rtl' ? ' dir="rtl"' : '') + '>', 'lang=' + code);
one('rel="canonical" href="https://acslearn.com/career.html"',
    'rel="canonical" href="https://acslearn.com/' + code + '/career.html"', 'canonical');
one('property="og:url" content="https://acslearn.com/career.html"',
    'property="og:url" content="https://acslearn.com/' + code + '/career.html"', 'og:url');
one('content="hi_IN"', 'content="' + META.locale + '"', 'og:locale ' + META.locale);
const noto = '&family=Noto+Sans+Devanagari:wght@400;600;700;800;900';
if (count(out, noto) >= 1) { out = out.split(noto).join(META.fontRepl); ok('fonts for ' + code); }
else bad('Noto-family chunk missing');
out = out.split('Noto Sans Devanagari').join(META.svgFont);
ok('SVG font-family \u2192 ' + META.svgFont);
one('<!-- generator: build_landing4.js v1.7.2 + hreflang v1.7.3 + report-sample v1.8 \u2014 \u0939\u093e\u0925 \u0938\u0947 \u0928 \u092c\u0926\u0932\u0947\u0902 -->',
    '<!-- generator: build_career_lang.js (lang=' + code + ', from career.html hi v1.8' + META.stampNote + ') \u2014 do not edit by hand -->', 'ver-stamp');
one('<!-- \u092a\u0930\u0924 1: CONFIG + LINKS -->', '<!-- layer 1: CONFIG + LINKS -->', 'comment: layer-1');
one('src="/assets/career-report-sample-hi.webp"', 'src="' + META.certImg + '"', 'certificate image');

/* 7b) per-language surgical swaps (post-translation state, fail-closed) */
for (const sw of (META.swaps || [])) {
  const c = count(out, sw.from);
  const need = sw.min || 1;
  if (c < need) { bad('swap "' + (sw.label || sw.from.slice(0, 30)) + '" \u00d7' + c + ' < ' + need); continue; }
  out = out.split(sw.from).join(sw.to); ok('swap: ' + (sw.label || sw.from.slice(0, 30)) + ' \u00d7' + c);
}

/* 8) gates */
/* mojibake gate: broken escapes in strings show up as U+FFFD or lone surrogates */
if (out.indexOf('\uFFFD') === -1) ok('no replacement char \uFFFD');
else bad('replacement char \uFFFD found (broken escape in strings?)');
if (!/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/.test(out)) ok('no lone surrogates');
else bad('lone surrogate found (broken emoji escape in strings?)');
const dev = out.match(/[\u0900-\u097F]/g);
if (!dev) ok('Devanagari left: 0');
else {
  bad('Devanagari left: ' + dev.length);
  (out.match(/.{0,40}[\u0900-\u097F].{0,40}/g) || []).slice(0, 8).forEach(c => console.log('    \u2026' + c.replace(/\n/g, ' ') + '\u2026'));
}
if (META.scriptRe) {
  const n = (out.match(META.scriptRe) || []).length;
  if (n >= META.scriptMin) ok('target-script chars: ' + n + ' \u2265 ' + META.scriptMin);
  else bad('target-script chars ' + n + ' < ' + META.scriptMin);
}
['Adaptive Testing', 'adaptive testing', '950 industries', '950 sectors',
 '100% guarantee', 'certified by RIASEC', 'RIASEC-certified',
 'not proof of ability', 'not a qualification certificate', 'qualification certificate']
 .concat(META.forbidden).forEach(w => {
  if (out.indexOf(w) === -1) ok('forbidden absent: ' + w);
  else bad('forbidden present: ' + w);
});
['ACS GOLDEN PASS', 'RIASEC', '18,943', 'Golden Pass Included', 'Applied Computer School']
 .concat(META.required).forEach(w => {
  if (out.indexOf(w) !== -1) ok('required present: ' + w.slice(0, 40));
  else bad('required missing: ' + w.slice(0, 40));
});
const srcHr = count(hi, 'hreflang="');
const hrRaw = count(out, 'hreflang="');
const hrSet = new Set((out.match(/hreflang="[^"]+"/g) || []));
if (hrRaw === srcHr && hrSet.size === srcHr && count(out, 'hreflang="' + code + '"') === 1)
  ok('hreflang inherited \u00d7' + hrRaw + ' incl. self');
else bad('hreflang raw=' + hrRaw + ' unique=' + hrSet.size + ' src=' + srcHr);

if (fails) { console.log('\n\u26d4 ' + fails + ' FAIL \u2014 nothing written.'); process.exit(1); }

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
fs.writeFileSync(OUT, out);
console.log('\n\ud83c\udfc1 PASS \u2014 ' + code + '/career.html (' + Buffer.byteLength(out) + ' bytes)' + (prev === out ? ' [re-run: zero byte changes]' : ''));
