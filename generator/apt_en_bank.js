/* ============================================================
   generator/apt_en_bank.js — v1.4 (11-Nov-2026; v1.1 बही-खाता/दोहराव/अंक-इकाई/sidecar · v1.2 जीवन-चक्र · v1.3 restamp · v1.4 = ChatGPT apt-fix ऑडिट: sidecar ग़ायब = FAIL, वर्जित खाने (mg/udy/band…) = FAIL, reviewed_by)
   काम: पूरे अभिरुचि-भंडार (18,943) का English रूप — "पुल" (bridge) — बनाने का औज़ार।
   ढाँचा (Founder + ChatGPT-मुहर, 11-Nov): एक ही मूल भंडार (हिंदी, assets/apt_sets/*.js)।
     English फ़ाइल generator/data/aptitude/en/bank/<shard>.js में सिर्फ़ पाठ रहता है:
       q###: { h: "<हिंदी की अंगुली-छाप>", text: "...", opts: ["...", ...] }
     mg / udy / band / pts / img / scoring यहाँ कभी नहीं (एक चीज़ = एक जगह) — इसलिए
     अनुवाद अंक-गिनती को छू ही नहीं सकता।
   h = sha256( JSON.stringify([हिंदी text, ...हिंदी opts.label]) ) के पहले 12 अक्षर —
     हमेशा मशीन लगाती है (stamp), हाथ से कभी नहीं। हिंदी बदली → h मेल नहीं → "पुराना" (stale)।
   आदेश:
     node generator/apt_en_bank.js stamp <shard>   जिन प्रविष्टियों में h नहीं, उनमें लगाता है
     node generator/apt_en_bank.js check [shard…]  जाँच (बिना नाम = सब shard); अधूरा = चेतावनी,
                                                    दोष = FAIL; --complete = अधूरा भी FAIL
   जाँचें (हर प्रविष्टि): id हिंदी में है · h ताज़ा · text ख़ाली नहीं · opts की गिनती हिंदी जितनी ·
     देवनागरी 0 · लंबी रेखा (—) 0 · हिंदी के अंक English में भी · लंबाई-अनुपात समझदार।
   ============================================================ */
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const SETS = path.join(ROOT, 'assets', 'apt_sets');
const BANK = path.join(ROOT, 'generator', 'data', 'aptitude', 'en', 'bank');

function loadHindi(shard) {
  const g = { window: { APT_POOL: [] } };
  const code = fs.readFileSync(path.join(SETS, shard + '.js'), 'utf8');
  new Function('window', code)(g.window);
  const map = {};
  [].concat(...g.window.APT_POOL).forEach(q => { map[q.id] = q; });
  return map;
}
function hashOf(q) {
  const parts = [q.text || ''].concat((q.opts || []).map(o => o.label || ''));
  return crypto.createHash('sha256').update(JSON.stringify(parts)).digest('hex').slice(0, 12);
}
function bankFile(shard) { return path.join(BANK, shard + '.js'); }
function loadBank(shard) {
  const f = bankFile(shard);
  if (!fs.existsSync(f)) return null;
  delete require.cache[require.resolve(f)];
  return require(f);
}
const DEV = /[\u0900-\u097F]/;
// अंक-इकाई नक़्शा: हिंदी/Latin इकाई → English में स्वीकार्य रूप (अंक के ठीक बाद)
const UNITS = [['किलो(?:ग्राम)?', 'kg|kilo(?:gram)?s?'], ['ग्राम', 'g|grams?'], ['लीटर', 'l|litres?|liters?'],
  ['मीटर', 'm|metres?|meters?'], ['किलोमीटर|किमी', 'km|kilometres?|kilometers?'], ['फ़ुट|फुट', 'ft|feet|foot'],
  ['इंच', 'in|inch(?:es)?'], ['घंटे|घंटा', 'hours?|hrs?'], ['मिनट', 'min(?:ute)?s?'], ['दिन', 'days?'],
  ['साल|वर्ष', 'years?|yrs?'], ['महीने|महीना', 'months?'], ['रुपये|रुपए|रुपया', 'rupees?|₹'], ['%|प्रतिशत', '%|percent|per cent'],
  ['mm', 'mm'], ['cm', 'cm'], ['kg', 'kg'], ['km', 'km'], ['V\\b', 'V\\b|volts?'], ['W\\b', 'W\\b|watts?'], ['HP\\b', 'HP\\b|horsepower']];
const digits = s => (s.match(/\d+/g) || []).sort().join(',');

function checkShard(shard, complete) {
  const H = loadHindi(shard), B = loadBank(shard);
  const errs = [], ids = Object.keys(H);
  if (!B) return { shard, total: ids.length, done: 0, stale: 0, errs: complete ? ['English फ़ाइल नहीं'] : [] };
  if (B.shard !== shard || B.lang !== 'en') errs.push('फ़ाइल-शीर्ष ग़लत (lang/shard)');
  let done = 0, stale = 0;
  // v1.4: अनुवाद-परत में सिर्फ़ ये खाने; अंक-गिनती का कोई निशान (mg/udy/band/pts/img/type/…) = FAIL
  const ALLOWED = new Set(['h', 'text', 'opts', 'eor']), TOP = new Set(['lang', 'shard', 'q']);
  Object.keys(B).filter(k => !TOP.has(k)).forEach(k => errs.push('फ़ाइल-शीर्ष में वर्जित खाना "' + k + '"'));
  for (const [id, e] of Object.entries(B.q || {})) {
    Object.keys(e || {}).filter(k => !ALLOWED.has(k)).forEach(k => errs.push(id + ': वर्जित खाना "' + k + '" (अनुवाद-परत में सिर्फ़ h/text/opts/eor)'));
    if (e && e.opts !== undefined && !(Array.isArray(e.opts) && e.opts.every(x => typeof x === 'string'))) errs.push(id + ': opts सिर्फ़ string-सूची हो');
    if (e && typeof e.text !== 'string') errs.push(id + ': text string हो');
  }
  if (!fs.existsSync(path.join(BANK, '_audit', shard + '.json'))) errs.push('audit-sidecar ग़ायब (_audit/' + shard + '.json) — जीवन-चक्र के बिना shard मान्य नहीं');
  { const src = fs.readFileSync(bankFile(shard), 'utf8'); const seen = {};
    (src.match(/\n\s*(q\d+)\s*:\s*\{/g) || []).forEach(m => { const id = m.match(/q\d+/)[0]; seen[id] = (seen[id] || 0) + 1; });
    Object.entries(seen).filter(([k, v]) => v > 1).forEach(([k, v]) => errs.push(k + ': English फ़ाइल में ' + v + ' बार (बाद वाली चुपचाप पहली को मिटा देती)'));
    (src.match(/\n\s*q\d+\s*:\s*\{[^\n]*/g) || []).forEach(line => { const id = line.match(/q\d+/)[0];
      ['h', 'text', 'opts'].forEach(k => { const c = (line.match(new RegExp('[{,]\\s*' + k + '\\s*:', 'g')) || []).length; if (c > 1) errs.push(id + ': खाना "' + k + '" ' + c + ' बार (एक प्रविष्टि में एक ही)'); }); }); }
  for (const [id, e] of Object.entries(B.q || {})) {
    const h = H[id];
    if (!h) { errs.push(id + ': हिंदी में यह id नहीं'); continue; }
    done++;
    if (!e.h) errs.push(id + ': h नहीं (stamp चलाओ)');
    else if (e.h !== hashOf(h)) { stale++; errs.push(id + ': पुराना (हिंदी बदली) — दोबारा अनुवाद/जाँच'); }
    if (!e.text || !e.text.trim()) errs.push(id + ': text ख़ाली');
    const ho = (h.opts || []).length, eo = (e.opts || []).length;
    if (ho !== eo) errs.push(id + ': opts ' + eo + ' ≠ हिंदी ' + ho);
    const all = [e.text || ''].concat(e.opts || []);
    if (all.some(s => DEV.test(s))) errs.push(id + ': देवनागरी बची');
    if (all.some(s => s.indexOf('\u2014') !== -1)) errs.push(id + ': लंबी रेखा (—) वर्जित');
    if (all.some(s => !s || !String(s).trim())) errs.push(id + ': ख़ाली विकल्प');
    const hd = digits([h.text || ''].concat((h.opts || []).map(o => o.label)).join(' ')), ed = digits(all.join(' '));
    if (hd !== ed) errs.push(id + ': अंक बेमेल (हिंदी ' + hd + ' / English ' + ed + ')');
    const hj = [h.text || ''].concat((h.opts || []).map(o => o.label)).join(' '), ej = all.join(' ');
    for (const [hu, en] of UNITS) {   // v1.2 सुधार: backslash एकल; इकाई-विकल्प (?:…) में बंद
      const re = new RegExp('(\\d+(?:[.,]\\d+)?)\\s*(?:' + hu + ')', 'g'); let m;
      while ((m = re.exec(hj))) { const ok = new RegExp('(^|\\D)' + m[1].replace('.', '\\.') + '\\s*(?:' + en + ')', 'i').test(ej);
        if (!ok) errs.push(id + ': अंक-इकाई "' + m[0] + '" English में नहीं मिली'); } }
    const r = (e.text || '').length / Math.max(1, (h.text || '').length);
    if (r < 0.35 || r > 3.2) errs.push(id + ': लंबाई-अनुपात अजीब (' + r.toFixed(2) + ')');
  }
  { const af = path.join(BANK, '_audit', shard + '.json');
    if (fs.existsSync(af)) { const A = JSON.parse(fs.readFileSync(af, 'utf8'));
      for (const [id, e] of Object.entries(B.q || {})) { const a = A[id];
        if (!a) { errs.push(id + ': audit-sidecar में नहीं (stamp चलाओ)'); continue; }
        if (!['draft', 'audited', 'frozen'].includes(a.audit_status)) errs.push(id + ': अनजान स्थिति "' + a.audit_status + '"');
        const eh = crypto.createHash('sha256').update(JSON.stringify([e.text].concat(e.opts || []))).digest('hex').slice(0, 12);
        if (a.en_hash !== eh) errs.push(id + ': English बदला पर sidecar पुराना' + (a.audit_status === 'frozen' ? ' — FROZEN प्रविष्टि बदली!' : ' (stamp चलाओ)')); } } }
  if (complete && done < ids.length) errs.push('अधूरा: ' + done + '/' + ids.length);
  return { shard, total: ids.length, done, stale, errs };
}

function stamp(shard) {
  const f = bankFile(shard), H = loadHindi(shard);
  let s = fs.readFileSync(f, 'utf8'), n = 0;
  // हर "qNNN: {" जिसके ठीक बाद h: नहीं — वहाँ h लगाओ
  s = s.replace(/(\n\s*)(q\d+)\s*:\s*\{(?!\s*h\s*:)\s*/g, (m, sp, id) => {   // lookahead '{' के ठीक बाद (backtracking-सुरक्षित)
    if (!H[id]) throw new Error('stamp: हिंदी में id नहीं: ' + id);
    n++; return sp + id + ': { h: "' + hashOf(H[id]) + '", ';
  });
  fs.writeFileSync(f, s);
  const B = loadBank(shard), AD = path.join(BANK, '_audit'); fs.mkdirSync(AD, { recursive: true });
  const af = path.join(AD, shard + '.json'), A = fs.existsSync(af) ? JSON.parse(fs.readFileSync(af, 'utf8')) : {};
  const today = new Date().toISOString().slice(0, 10); let na = 0;
  for (const [id, e] of Object.entries(B.q)) {
    const eh = crypto.createHash('sha256').update(JSON.stringify([e.text].concat(e.opts || []))).digest('hex').slice(0, 12);
    if (!A[id]) { A[id] = { en_hash: eh, translated_at: today, audit_status: 'draft' }; na++; }
    else if (A[id].en_hash !== eh) {
      if (A[id].audit_status === 'frozen') throw new Error('stamp: ' + id + ' frozen है — English बदला नहीं जा सकता (पहले जानबूझकर status ' + shard + ' draft ' + id + ')');
      A[id].en_hash = eh; A[id].audit_status = 'draft'; A[id].changed_at = today; na++; }   // English बदला = जाँच दोबारा (audited → draft)
  }
  fs.writeFileSync(af, JSON.stringify(A, null, 1) + '\n');
  console.log('audit-sidecar ' + shard + ': ' + na + ' प्रविष्टियाँ दर्ज/ताज़ा (स्थिति draft)');
  console.log('stamp ' + shard + ': ' + n + ' प्रविष्टियों में h लगी');
}

function setStatus(shard, to, ids) {
  let by = null; const bi = ids.indexOf('--by'); if (bi > -1) { by = ids[bi + 1] || null; ids = ids.slice(0, bi); }
  const af = path.join(BANK, '_audit', shard + '.json'), A = JSON.parse(fs.readFileSync(af, 'utf8'));
  const ORDER = { draft: 0, audited: 1, frozen: 2 };
  if (!(to in ORDER)) throw new Error('status: draft | audited | frozen');
  const list = ids[0] === 'all' ? Object.keys(A) : ids; let n = 0;
  for (const id of list) { const a = A[id]; if (!a) throw new Error('status: sidecar में नहीं: ' + id);
    if (to === 'frozen' && a.audit_status !== 'audited' && a.audit_status !== 'frozen') throw new Error('status: ' + id + ' पहले audited हो, तभी frozen (अभी ' + a.audit_status + ')');
    if (a.audit_status !== to) { a.audit_status = to; a.status_at = new Date().toISOString().slice(0, 10); n++; }
    if (by && to !== 'draft') a[to === 'frozen' ? 'frozen_by' : 'reviewed_by'] = by; }
  fs.writeFileSync(af, JSON.stringify(A, null, 1) + '\n'); console.log('status ' + shard + ': ' + n + ' प्रविष्टियाँ → ' + to);
}
function restamp(shard, ids) {   // हिंदी बदली → English दोबारा लिखा → तभी छाप नई (जानबूझकर, id-दर-id)
  const f = bankFile(shard), H = loadHindi(shard), af = path.join(BANK, '_audit', shard + '.json');
  const A = fs.existsSync(af) ? JSON.parse(fs.readFileSync(af, 'utf8')) : {};
  let s = fs.readFileSync(f, 'utf8'), n = 0;
  for (const id of ids) {
    if (!H[id]) throw new Error('restamp: हिंदी में id नहीं: ' + id);
    if (A[id] && A[id].audit_status === 'frozen') throw new Error('restamp: ' + id + ' frozen है');
    const re = new RegExp('(\\n\\s*' + id + '\\s*:\\s*\\{\\s*h:\\s*")([0-9a-f]{12})(")');
    if (!re.test(s)) throw new Error('restamp: ' + id + ' की छाप नहीं मिली');
    s = s.replace(re, (m, a, old, c) => { n++; return a + hashOf(H[id]) + c; });
    if (A[id]) { A[id].audit_status = 'draft'; A[id].restamped_at = new Date().toISOString().slice(0, 10); }
  }
  fs.writeFileSync(f, s); fs.writeFileSync(af, JSON.stringify(A, null, 1) + '\n');
  console.log('restamp ' + shard + ': ' + n + ' छापें नई (स्थिति draft) — फिर stamp चलाओ (en_hash ताज़ा)');
}
const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'stamp') { stamp(rest[0]); }
else if (cmd === 'status') { setStatus(rest[0], rest[1], rest.slice(2)); }
else if (cmd === 'restamp') { restamp(rest[0], rest.slice(1)); }
else if (cmd === 'check') {
  const complete = rest.includes('--complete');
  let names = rest.filter(a => !a.startsWith('--'));
  if (!names.length) names = fs.readdirSync(SETS).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort();
  let bad = 0, tot = 0, dn = 0;
  for (const sh of names) {
    const r = checkShard(sh, complete); tot += r.total; dn += r.done;
    if (r.done || r.errs.length) console.log((r.errs.length ? '❌ ' : '✅ ') + sh + ': ' + r.done + '/' + r.total + (r.stale ? ' · पुराने ' + r.stale : ''));
    r.errs.slice(0, 8).forEach(e => console.log('     ' + e));
    bad += r.errs.length;
  }
  if (rest.filter(a => !a.startsWith('--')).length === 0) {   // पूरा बही-खाता: shards + झलक-पूल
    const all = {}; fs.readdirSync(SETS).filter(f => f.endsWith('.js')).forEach(f => Object.keys(loadHindi(f.slice(0, -3))).forEach(id => { all[id] = (all[id] || 0) + 1; }));
    const pv = [...new Set((fs.readFileSync(path.join(ROOT, 'assets', 'aptitude_data.js'), 'utf8').match(/["']?id["']?\s*:\s*["'](q\d+)["']/g) || []).map(m => m.match(/q\d+/)[0]))];
    pv.forEach(id => { all[id] = (all[id] || 0) + 1; });
    const dupl = Object.entries(all).filter(([k, v]) => v > 1).map(([k]) => k), mx = Math.max(...Object.keys(all).map(k => +k.slice(1)));
    const miss = []; for (let i = 1; i <= mx; i++) { const a = 'q' + String(i).padStart(3, '0'); if (!all[a]) miss.push(a); }
    console.log('बही-खाता: shards ' + (Object.keys(all).length - pv.length) + ' + झलक-पूल ' + pv.length + ' = अनोखे ' + Object.keys(all).length + ' · सबसे बड़ा q' + mx + ' · दोहराव ' + dupl.length + ' · ग़ायब ' + miss.length);
    if (dupl.length || miss.length) { bad++; console.log('     ⛔ बही-खाता टूटा: ' + dupl.concat(miss).slice(0, 8).join(' ')); }
  }
  console.log('कुल English: ' + dn + '/' + tot + ' (' + (100 * dn / Math.max(1, tot)).toFixed(1) + '%)');
  console.log(bad ? '⛔ apt_en_bank check FAIL (' + bad + ')' : '🏁 apt_en_bank check — पास');
  process.exit(bad ? 1 : 0);
} else { console.log('चलाना: stamp <shard> | check [shard…] [--complete] | status <shard> <draft|audited|frozen> <ids…|all> [--by <समीक्षक>] | restamp <shard> <ids…>'); process.exit(2); }
