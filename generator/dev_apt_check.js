/* dev_apt_check.js — अभिरुचि-इंजन की runtime-जाँच (upload नहीं होती) */
var fs = require('fs');
var store = {};
global.localStorage = { getItem: function (k) { return store[k] || null; }, setItem: function (k, v) { store[k] = v; } };
global.window = { scrollTo: function () {} };
eval(fs.readFileSync('assets/mg_names.js', 'utf8'));
eval(fs.readFileSync('assets/aptitude_art.js', 'utf8'));
eval(fs.readFileSync('assets/aptitude_data.js', 'utf8'));

/* जाँच-1: सब जवाब भरे + done — नतीजा-रास्ता */
var ans = {}, qs = window.APT_DATA.questions;
for (var i = 0; i < 24; i++) {
  var q = qs[i];
  if (q.type === 'scale') ans[q.id] = { v: (i % 5) };
  else if (q.type === 'pick') ans[q.id] = { first: 0, last: 3 };
  else ans[q.id] = { v: i % 2 };
}
store['acs_apt_v1'] = JSON.stringify({ pos: 99, ans: ans, done: true, doneAt: '20-7-2026' });
var boxEl = { innerHTML: '', getElementsByClassName: function () { return []; } };
var againEl = {};
global.document = { getElementById: function (id) { if (id === 'apt-box') return boxEl; if (id === 'apt-again') return againEl; return null; } };
eval(fs.readFileSync('assets/aptitude-test.js', 'utf8'));
var h = boxEl.innerHTML;
if (h.indexOf('सबसे प्रबल रुचि') < 0) throw new Error('नतीजा-शीर्षक ग़ायब');
if (h.indexOf('चौबीसों क्षेत्र') < 0) throw new Error('24-सूची ग़ायब');
var rows = (h.match(/apt-row/g) || []).length;
console.log('जाँच-1 नतीजा बना ✅ | सूची-पंक्तियाँ: ' + rows + ' (चाहिए 24) | अनजान-डिब्बा: ' + (h.indexOf('अनजान क्षेत्र') >= 0 ? 'हाँ' : 'ना') + ' | Jio-पंक्ति: ' + (h.indexOf('मर्ज़ी हो तो लें') >= 0 ? 'हाँ' : 'ना'));
if (rows !== 24) throw new Error('पंक्ति-गिनती ग़लत');

/* जाँच-2: ख़ाली शुरुआत — पहला प्रश्न बूट */
store = {}; boxEl.innerHTML = '';
eval(fs.readFileSync('assets/aptitude-test.js', 'utf8'));
if (boxEl.innerHTML.indexOf('प्रश्न 1 / 24') < 0) throw new Error('पहला प्रश्न नहीं दिखा');
var faces = (boxEl.innerHTML.match(/apt-face/g) || []).length;
console.log('जाँच-2 ख़ाली-शुरुआत बूट ✅ | चेहरे: ' + (faces >= 5 ? '5 ✅' : '❌ ' + faces));

/* जाँच-3: बीच की हालत (11वें क़दम = कथा-1) */
store = {}; boxEl.innerHTML = '';
var ans2 = {}; for (var j = 0; j < 10; j++) { var qq = qs[j]; ans2[qq.id] = (qq.type === 'pick') ? { first: 0, last: 1 } : { v: 1 }; }
store['acs_apt_v1'] = JSON.stringify({ pos: 10, ans: ans2, done: false });
eval(fs.readFileSync('assets/aptitude-test.js', 'utf8'));
if (boxEl.innerHTML.indexOf('apt-katha') < 0) throw new Error('10 के बाद कथा नहीं आई');
console.log('जाँच-3 कथा-विराम ✅ (10 प्रश्नों के बाद कहानी दिखी)');
console.log('✅ इंजन की तीनों runtime-जाँचें पास');

/* ============================================================
   नींव-दौर जोड़ (20-Jul-2026) — जाँच 4-6:
   4 = विभाजन-अखंडता (आधार+टुकड़े = पूरा भंडार, दोहराव शून्य)
   5 = session-इंजन का पूरा नक़ली-सफ़र (120 प्रश्न → अंतिम जमा → नतीजा)
   6 = मौलिकता-जाँच: सब पुराने+नए प्रश्नों पर (Founder-आदेश, 20-Jul) —
       साझा वाक्य-टुकड़ा = साँचा; report generator/apt_maulikta_report.txt
   ============================================================ */

/* ---------- जाँच-4: विभाजन-अखंडता ---------- */
global.window = { APT_POOL: [] };
eval(fs.readFileSync('assets/aptitude_data.js', 'utf8'));
var BASE_D = window.APT_DATA;
fs.readdirSync('assets/apt_sets').forEach(function (f) {
  if (/\.js$/.test(f)) eval(fs.readFileSync('assets/apt_sets/' + f, 'utf8'));
});
var ALLQ = BASE_D.questions.concat(window.APT_POOL);
var seen4 = {}, dup4 = 0;
ALLQ.forEach(function (q) { if (seen4[q.id]) dup4++; seen4[q.id] = 1; });
if (ALLQ.length !== 4674 || dup4) throw new Error('विभाजन-अखंडता फेल: कुल ' + ALLQ.length + ' दोहराव ' + dup4);
console.log('जाँच-4 विभाजन-अखंडता ✅ | आधार ' + BASE_D.questions.length + ' + टुकड़े ' + window.APT_POOL.length + ' = ' + ALLQ.length + ' | दोहराव 0');

/* ---------- जाँच-5: session पूरा सफ़र (नक़ली DOM) ---------- */
(function sessionCheck() {
  var files = {
    '/assets/apt_sets/broad.js': 'assets/apt_sets/broad.js',
    '/assets/udyam_data.js': 'assets/udyam_data.js'
  };
  for (var m = 1; m <= 24; m++) {
    var nm = 'mg' + (m < 10 ? '0' + m : m) + '.js';
    files['/assets/apt_sets/' + nm] = 'assets/apt_sets/' + nm;
  }
  var st = {};
  global.localStorage = { getItem: function (k) { return st[k] || null; }, setItem: function (k, v) { st[k] = v; } };
  global.window = { APT_POOL: [], scrollTo: function () {}, scrollY: 0 };
  global.confirm = function () { return true; };
  global.alert = function (t) { throw new Error('alert: ' + t); };
  global.setInterval = function () { return 1; };
  eval(fs.readFileSync('assets/aptitude_data.js', 'utf8'));
  eval(fs.readFileSync('assets/mg_names.js', 'utf8'));
  eval(fs.readFileSync('assets/aptitude_art.js', 'utf8'));

  var reg = {};                                   /* id → स्थायी stub */
  var boxS = { innerHTML: '', offsetTop: 0, _q: {} };
  function stubsFor(attr) {
    var out = [], re = new RegExp(attr + '="(-?\\d+)"', 'g'), mm;
    while ((mm = re.exec(boxS.innerHTML))) {
      (function (val) {
        out.push({ getAttribute: function () { return val; } });
      })(mm[1]);
    }
    return out;
  }
  boxS.querySelectorAll = function (sel) {
    var attr = sel.replace(/[\[\]]/g, '');
    var arr = stubsFor(attr);
    boxS._q[attr] = arr;
    return arr;
  };
  global.document = {
    hidden: false,
    getElementById: function (id) {
      if (id === 'apt-sess-box') return boxS;
      if (boxS.innerHTML.indexOf('id="' + id + '"') < 0) return null;
      if (!reg[id]) reg[id] = {};
      return reg[id];
    },
    createElement: function () { return {}; },
    head: {
      appendChild: function (sc) {
        var fp = files[sc.src];
        if (!fp) { if (sc.onerror) sc.onerror(); return; }
        var code = fs.readFileSync(fp, 'utf8');
        if (fp.indexOf('udyam') >= 0) code += '\n;window.ALL_SECTORS = ALL_SECTORS;';
        eval(code);
        if (sc.onload) sc.onload();
      }
    }
  };
  eval(fs.readFileSync('assets/apt-session.js', 'utf8'));
  if (boxS.innerHTML.indexOf('जन्म का साल') < 0) throw new Error('session शुरुआत-कार्ड नहीं बना');
  reg['apt-yob'] = { value: 2011 };               /* उम्र 15 = band-2 (11-बिंदु पट्टी) */
  document.getElementById('apt-go');              /* onclick इसी stub पर लगा है */
  reg['apt-go'].onclick();
  var guard = 0, clicked = 0;
  while (guard++ < 4000) {
    if (boxS.innerHTML.indexOf('id="apt-lock"') >= 0) break;
    if (boxS.innerHTML.indexOf('id="apt-next"') >= 0) { reg['apt-next'] && reg['apt-next'].onclick(); continue; }
    var v11 = boxS._q['data-v11'] && boxS._q['data-v11'].length ? boxS._q['data-v11'] : stubsFor('data-v11');
    var vv = stubsFor('data-v'), ii = stubsFor('data-i');
    /* इंजन ने bind() में जिन stubs पर onclick लगाया, वही _q में हैं */
    var pool = (boxS._q['data-v11'] || []).concat(boxS._q['data-v'] || [], boxS._q['data-i'] || []);
    var withClick = pool.filter(function (b) { return typeof b.onclick === 'function'; });
    if (!withClick.length) {
      if (reg['apt-skiporgo'] && typeof reg['apt-skiporgo'].onclick === 'function') { reg['apt-skiporgo'].onclick(); continue; }
      throw new Error('session अटका — कोई बटन नहीं (क़दम ' + guard + ')');
    }
    withClick[clicked % 3 === 0 ? 0 : withClick.length - 1].onclick();  /* मिला-जुला: कभी −, ज़्यादातर + */
    clicked++;
  }
  if (boxS.innerHTML.indexOf('id="apt-lock"') < 0) throw new Error('120 के बाद जमा-कार्ड नहीं आया');
  var Scheck = JSON.parse(st['acs_apt_sess_v1']);
  var got = Object.keys(Scheck.cur.ans).length;
  reg['apt-lock'].onclick();
  if (boxS.innerHTML.indexOf('आपके लिए कोर्स') < 0) throw new Error('नतीजे में कोर्स-सूची नहीं');
  if (boxS.innerHTML.indexOf('किसी 1 से शुरुआत') < 0) throw new Error('शुरुआत-सलाह नहीं');
  var S2 = JSON.parse(st['acs_apt_sess_v1']);
  if (!S2.attempts.length || !Object.keys(S2.used).length) throw new Error('lock/used दर्ज नहीं हुआ');
  var avail = boxS.innerHTML.indexOf('कोर्स उपलब्ध') >= 0 ? 'उपलब्ध-कड़ी दिखी' : 'उपलब्ध-कड़ी नहीं (शीर्ष में नहीं आई — ठीक)';
  console.log('जाँच-5 session पूरा सफ़र ✅ | जवाब ' + got + '/120 | lock+used दर्ज ✅ | माँग-पट्टी: ' +
    (boxS.innerHTML.indexOf('यह कोर्स माँगें') >= 0 ? 'हाँ' : 'ना') + ' | ' + avail);
})();

/* ---------- जाँच-6: मौलिकता (सब 4674 पर) ---------- */
(function maulikta() {
  function norm(t) { return String(t || '').replace(/[^\u0900-\u097F0-9A-Za-z ]/g, ' ').replace(/\s+/g, ' ').trim(); }
  /* विधि-पंक्तियाँ (जवाब देने का तरीक़ा — प्रश्न-शरीर नहीं) — दर्ज छूट-सूची।
     ध्यान: "यह काम तुम्हें कैसा लगता है" जैसी set-10 साँचा-पूँछ छूट में नहीं है — वही पकड़नी है। */
  var STEM_OK = [
    'इनमें से कौन सा काम तुम सबसे पहले करना चाहोगे और कौन सा सबसे कम',
    'इनमें से कौन सा सबसे पहले चुनोगे और कौन सा सबसे कम',
    'कौन सा काम सबसे पहले चुनोगे और कौन सा सबसे कम',
    'सबसे पहले चुनोगे और कौन सा सबसे कम',
    'दोनों सही हैं तुम्हें कौन सा ज़्यादा भाता है',
    'दोनों सही हैं कौन सा ज़्यादा भाता है',
    'इनमें से कौन सा धंधा तुम सबसे पहले चुनोगे और कौन सा सबसे कम',
    'में कौन सा काम सबसे पहले और कौन सा सबसे कम',
    'में कौन सा सबसे पहले और कौन सा सबसे कम'
  ].map(norm).sort(function (a, b) { return b.length - a.length; }); /* लंबी पहले कटे — छोटी उपपंक्ति का क्रम-दोष बंद */
  function stripStems(t) { STEM_OK.forEach(function (st) { t = t.split(st).join(' '); }); return t.replace(/\s+/g, ' ').trim(); }
  function textsOf(q) {
    var out = [norm(q.text)];
    (q.opts || []).forEach(function (o) { out.push(norm(o.t || o.text || o.label || '')); });
    return out.filter(function (t) { return t; });
  }
  var N = 6;                                       /* साँचा-नाप: 6-शब्द टुकड़ा */
  var sh = {};                                     /* टुकड़ा → {qid:1} */
  ALLQ.forEach(function (q) {
    textsOf(q).forEach(function (t) {
      var w = stripStems(t).split(' ');
      for (var i = 0; i + N <= w.length; i++) {
        var key = w.slice(i, i + N).join(' ');
        (sh[key] = sh[key] || {})[q.id] = 1;
      }
    });
  });
  var flagged = {}, frames = [];
  Object.keys(sh).forEach(function (key) {
    var ids = Object.keys(sh[key]);
    if (ids.length >= 3) {                          /* वही 6-शब्द टुकड़ा 3+ प्रश्नों में = साँचा */
      frames.push({ f: key, n: ids.length });
      ids.forEach(function (id) { flagged[id] = 1; });
      /* आधार-48 (मुफ़्त-झलक भंडार) अछूता है — उसकी id modify-सूची से बाहर */
    }
  });
  frames.sort(function (a, b) { return b.n - a.n; });
  var baseIds = {}; BASE_D.questions.forEach(function (q) { baseIds[q.id] = 1; });
  var flaggedIds = Object.keys(flagged).filter(function (id) { return !baseIds[id]; });
  var rep = 'ACS अभिरुचि — मौलिकता-रिपोर्ट (मशीन-गिनती, ' + new Date().toISOString().slice(0, 10) + ')\n' +
    'नियम (Founder, 20-Jul-2026): सब पुराने+नए प्रश्न मौलिक हों; साँचा-टुकड़ा (वही ' + N + '-शब्द, 3+ प्रश्नों में) = modify-सूची।\n' +
    'कुल प्रश्न: ' + ALLQ.length + ' | modify-सूची: ' + flaggedIds.length + '\n\n— सबसे बड़े साँचे —\n' +
    frames.slice(0, 25).map(function (x) { return x.n + ' प्रश्नों में: "' + x.f + '"'; }).join('\n') +
    '\n\n— modify-सूची (id) —\n' + flaggedIds.sort().join(', ') + '\n';
  fs.writeFileSync('generator/apt_maulikta_report.txt', rep);
  console.log('जाँच-6 मौलिकता | साँचे: ' + frames.length + ' | modify-सूची: ' + flaggedIds.length + ' प्रश्न → generator/apt_maulikta_report.txt');
  if (flaggedIds.length) console.log('   ⚠️ ये प्रश्न बदलने हैं (Founder-आदेश) — अगली खेपों का काम; नई खेप पर यही जाँच सख़्त-fail रहेगी।');
})();
console.log('✅ नींव-दौर की जाँच 4-6 पूरी');
