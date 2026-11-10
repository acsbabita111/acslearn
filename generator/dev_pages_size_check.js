/* ============================================================
   dev_pages_size_check.js v1.2 (10-Nov-2026; v1.2 = ChatGPT P2: protocol-relative, बिना-slash, बीच का ../) · जाँच-यंत्र (सिर्फ़ पढ़ता है) — Node (bat में अनिवार्य, Python पर निर्भर नहीं)
   सवाल 1: GitHub Pages पर प्रकाशित होने वाली साइट कितनी बड़ी है? (सीमा 1 GB; deploy 10 मिनट)
           _config.yml की exclude-सूची घटाकर गिनता है।  FAIL: >1000 MiB।  चेतावनी: >900 MiB।
   सवाल 2: साइट का कोई पेज/स्क्रिप्ट/CSS बाहर-रखे folder से कुछ माँगता तो नहीं?
           टिप्पणियाँ (HTML-टिप्पणी, JS/CSS block-टिप्पणी, // पंक्ति-टिप्पणी) हटाकर, हर उस जगह को पकड़ता है जहाँ बाहर-रखा folder
           किसी पते की शुरुआत में हो: src/href/srcset/poster/data/action, CSS url(), import, new Worker,
           importScripts, fetch, सूची/स्ट्रिंग में पता, सापेक्ष (generator/…, ./, ../) और पूरा पता
           (https://acslearn.com/generator/…)। कोई भी मिला = FAIL (fail-closed)।
   चलाना: node generator/dev_pages_size_check.js        (--self-test : पकड़ने की क्षमता की परीक्षा)
   ============================================================ */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const TEXT_EXT = new Set(['.html', '.htm', '.js', '.mjs', '.css', '.json', '.webmanifest', '.svg', '.xml', '.txt']);

function readExcludes(root) {
  const p = path.join(root, '_config.yml');
  if (!fs.existsSync(p)) return [];
  const out = []; let inx = false;
  for (const ln of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    if (/^exclude:\s*$/.test(ln)) { inx = true; continue; }
    if (inx) {
      const m = ln.match(/^\s+-\s+["']?([^"'\s#]+)["']?\s*(#.*)?$/);
      if (m) { out.push(m[1].replace(/^\/+|\/+$/g, '')); continue; }
      if (ln.trim() && !ln.trim().startsWith('#')) inx = false;
    }
  }
  return out;
}
function stripComments(text, ext) {
  let s = text;
  if (ext === '.html' || ext === '.htm' || ext === '.svg' || ext === '.xml') s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');                       // block-टिप्पणी (JS + CSS)
  s = s.replace(/(^|[^:\\'"`\w])\/\/[^\n]*/g, '$1');              // // …  (https:// नहीं छूता)
  return s;
}
function makeRefRe(exc) {
  if (!exc.length) return null;
  const names = exc.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  // पते की शुरुआत: उद्धरण, (, =, कॉमा, ख़ाली-स्थान या पंक्ति-आरंभ के बाद; वैकल्पिक पूरा-डोमेन, ./ या ../, फिर folder/
  // (क) folder के बाद "/" : उद्धरण/(/=/कॉमा/ख़ाली-स्थान के बाद; वैकल्पिक https:// या // (protocol-relative) डोमेन; ./ ../
  // (ख) बिना-slash ("/generator"): सिर्फ़ पते की जगह — उद्धरण/(/= के ठीक बाद, आगे "/" ज़रूरी; गद्य का आम शब्द नहीं
  // (ग) पते के बीच "/../generator" (जैसे /assets/../generator/x.js)
  const DOM = '(?:(?:https?:)?//(?:www\\.)?acslearn\\.com)?';
  const END = '(?=[?#"\'`)\\s>]|$)';
  return new RegExp(
    '(?:(?:^|["\'`(=,\\s])' + DOM + '(?:\\.{1,2}/)*/?(?:' + names + ')/)' +
    '|(?:["\'`(=]\\s*' + DOM + '/(?:' + names + ')' + END + ')' +
    '|(?:/\\.\\./(?:' + names + ')(?=[/?#"\'`)\\s>]|$))', 'm');
}
function walk(root, exc, cb) {
  const stack = ['.'];
  while (stack.length) {
    const rel = stack.pop();
    for (const ent of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
      const r = rel === '.' ? ent.name : rel + '/' + ent.name;
      const top = r.split('/')[0];
      if (top.startsWith('.') || top.startsWith('_') || exc.includes(top)) continue;   // Jekyll भी इन्हें प्रकाशित नहीं करता
      if (ent.isDirectory()) stack.push(r); else cb(r);
    }
  }
}
function scan(root) {
  const exc = readExcludes(root), re = makeRefRe(exc);
  let bytes = 0, n = 0; const refs = [];
  walk(root, exc, (r) => {
    const p = path.join(root, r); const st = fs.statSync(p); bytes += st.size; n++;
    const ext = path.extname(r).toLowerCase();
    if (re && TEXT_EXT.has(ext) && st.size < 30 * 1048576) {
      const m = stripComments(fs.readFileSync(p, 'utf8'), ext).match(re);
      if (m) refs.push(r + '  ←  ' + m[0].trim().slice(0, 70));
    }
  });
  return { exc, mib: bytes / 1048576, n, refs };
}
function selfTest() {
  const os = require('os'); const d = fs.mkdtempSync(path.join(os.tmpdir(), 'pgsz-'));
  fs.writeFileSync(path.join(d, '_config.yml'), 'exclude:\n  - generator\n  - matrix\n');
  const MUST = {   // इन सबको पकड़ना ज़रूरी
    'css url()': ['a.css', 'body{background:url("/matrix/x.png")}'],
    'css url() बिना उद्धरण': ['b.css', '.x{background:url(/generator/y.png)}'],
    'JS सूची-string': ['c.js', 'const assets = ["/matrix/x.png"];'],
    'new Worker': ['d.js', 'new Worker("/generator/worker.js")'],
    'import': ['e.js', 'import x from "/generator/a.js";'],
    'importScripts': ['f.js', "importScripts('/matrix/s.js')"],
    'srcset': ['g.html', '<img srcset="/matrix/x.webp 1x">'],
    'poster': ['h.html', '<video poster="/matrix/a.jpg"></video>'],
    'सापेक्ष src': ['i.html', '<script src="generator/a.js"></script>'],
    '../ सापेक्ष': ['j.html', '<link href="../matrix/a.css" rel="stylesheet">'],
    'पूरा पता': ['k.html', '<a href="https://acslearn.com/generator/x.html">x</a>'],
    'fetch': ['l.js', 'fetch(`/matrix/data.json`)'],
    'object data': ['m.html', '<object data="/generator/x.svg"></object>'],
    'form action': ['n.html', '<form action="/matrix/go"></form>'],
    'string जोड़': ['o.js', 'var u = "/generator/" + code + ".js";'],
    'protocol-relative': ['u.html', '<script src="//acslearn.com/generator/x.js"></script>'],
    'बिना-slash folder': ['v.html', '<a href="/generator">g</a>'],
    'बीच का ../': ['w.html', '<script src="/assets/../generator/x.js"></script>'],
  };
  const MUST_NOT = {   // ये झूठे FAIL नहीं होने चाहिए
    'HTML टिप्पणी': ['p.html', '<!-- generated by generator/build_x.js -->'],
    'JS block टिप्पणी': ['q.js', '/* matrix/acm.js v1.0 */ var a=1;'],
    'JS line टिप्पणी': ['r.js', 'var a=1; // from generator/data/x.js'],
    'मिलता-जुलता नाम': ['s.html', '<a href="/generators/x.html">x</a> <img src="/assets/matrix-tile.png">'],
    'https:// के बाद': ['t.js', 'var u="https://example.com/a";'],
    'बिना-slash पर मिलता नाम': ['x.html', '<a href="/generatorx">g</a> <a href="/matrix-old">m</a>'],
    'गद्य में आम शब्द': ['y.html', '<p>Use a keyword generator and a matrix of ideas.</p>'],
  };
  let bad = 0;
  for (const [label, [f, body]] of Object.entries(MUST)) {
    fs.writeFileSync(path.join(d, f), body); const r = scan(d); fs.unlinkSync(path.join(d, f));
    const ok = r.refs.length === 1; bad += !ok; console.log((ok ? '✅ पकड़ा   ' : '❌ छूटा    ') + label);
  }
  for (const [label, [f, body]] of Object.entries(MUST_NOT)) {
    fs.writeFileSync(path.join(d, f), body); const r = scan(d); fs.unlinkSync(path.join(d, f));
    const ok = r.refs.length === 0; bad += !ok; console.log((ok ? '✅ अछूता   ' : '❌ झूठा FAIL ') + label + (ok ? '' : '  ' + r.refs[0]));
  }
  fs.rmSync(d, { recursive: true, force: true });
  console.log(bad ? '⛔ self-test FAIL (' + bad + ')' : '🏁 self-test पास (' + (Object.keys(MUST).length + Object.keys(MUST_NOT).length) + '/' + (Object.keys(MUST).length + Object.keys(MUST_NOT).length) + ')');
  process.exit(bad ? 1 : 0);
}
if (process.argv.includes('--self-test')) selfTest();
else {
  const r = scan(ROOT);
  console.log('बाहर रखे (exclude): ' + (r.exc.length ? r.exc.join(', ') : 'कुछ नहीं'));
  console.log('प्रकाशित होगा: ' + r.mib.toFixed(0) + ' MiB · ' + r.n + ' फ़ाइलें (GitHub Pages सीमा: 1024 MiB)');
  console.log('बाहर-रखे folder की असली माँग: ' + r.refs.length);
  r.refs.slice(0, 10).forEach(x => console.log('   ' + x));
  const bad = r.mib > 1000 || r.refs.length > 0;
  if (!bad && r.mib > 900) console.log('⚠️ चेतावनी: 900 MiB से ऊपर — अगली बड़ी खेप से पहले सफ़ाई ज़रूरी');
  console.log(bad ? '⛔ dev_pages_size_check FAIL' : '🏁 dev_pages_size_check — पास');
  process.exit(bad ? 1 : 0);
}
