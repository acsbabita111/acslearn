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
