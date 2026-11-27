/* ═══════════════════════════════════════════════════════════════════
   assets/acs-pin.js v1.1 (26-Nov-2026) · "पिन-घर" का साझा helper (ES5; कोई निर्भरता नहीं)
   Founder (26-Nov-2026): "पूरे सिस्टम मे जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही
   अपने आप सभी सूचना ले लिया जाए।" और "पता को कनफर्म करना का सब उपाय करो।"

   दो सरकारी सूचियाँ (यंत्र generator/build_pin_data.js; यहाँ कोई पिन, गाँव, ज़िला या राज्य लिखा नहीं है):
     /assets/geo/pin/NNN.json    India Post: पिन → डाकघर, ज़िला, राज्य
     /assets/geo/pinv/NNN.json   LGD (पंचायती राज मंत्रालय): पिन → गाँव, पंचायत, प्रखंड, तहसील, ज़िला; पिन → नगर निकाय
                                 (बड़ा टुकड़ा {"x":4} कहकर अगले अंक की फ़ाइल पर भेजता है)
   कोई बाहरी site नहीं पूछी जाती; पिन किसी को भेजा नहीं जाता।

   उपयोग:
     ACS_PIN.ok("851201")            → true/false (ठीक 6 अंक, पहला अंक 1 से 9)
     ACS_PIN.get("851201").then(function(info){ … })
       info = null                    पिन किसी सूची में नहीं है
       info = {
         pin,
         districts: [{ state:"bihar", stateHi:"बिहार", stateEn:"Bihar", district:"खगड़िया", districtEn:"Khagaria", src:"lgd"|"post" }, …]
                    इस पिन के ज़िले। LGD के ज़िले पहले (गाँव की सूची आज की है); फिर डाक के वे ज़िले जो LGD में नहीं।
                    district = ACS की ज़िला-सूची का नाम (फ़ॉर्म की सूची में यही है)।
         sure       true: ज़िला एक ही है (LGD का एक ही ज़िला; LGD में गाँव न हों तो डाक का एक ही ज़िला)
         main       sure हो तो वही ज़िला, वरना null
         known      कम से कम एक ज़िला दर्ज है
         offices:   [{ n:"Borney", d:1 }, …]   डाकघर, नाम के क्रम में; d = districts में क्रमांक (-1 = ज़िला दर्ज नहीं)
         places:    [{ n:"Arnawan", gp:"Buchcha", block:"Chautham", sub:"Chautham", d:0 }, …]   गाँव, नाम के क्रम में
                    gp = ग्राम पंचायत, block = प्रखंड, sub = तहसील/अंचल ("" = दर्ज नहीं)
         towns:     [{ n:"Khagaria", t:"Municipal Council" }, …]   नगर निकाय
         placesFailed  true: गाँव की सूची network की वजह से नहीं आई (डाक की जानकारी फिर भी है)
       }
     network न चले (डाक की सूची भी न आए), तो promise reject होता है (ताकि "नहीं मिला" और "जाँच नहीं पाई" अलग दिखें)।
     ACS_PIN.parse("घर 12, Vill: X, PO: Y, Khagaria, Bihar, PIN: 851201") → { pin:"851201", outside:false }
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var BASE = '/assets/geo/pin/', BASEV = '/assets/geo/pinv/', CACHE = {};
  function ok(pin) { return /^[1-9][0-9]{5}$/.test(String(pin == null ? '' : pin)); }
  function file(url) {
    if (CACHE[url]) return CACHE[url];
    var p = fetch(url).then(function (r) {
      if (r.status === 404) return null;            /* इस शुरुआत का कोई पिन नहीं */
      if (!r.ok) throw new Error('pin-http-' + r.status);
      return r.json();
    });
    CACHE[url] = p;
    p.then(null, function () { if (CACHE[url] === p) delete CACHE[url]; });   /* नाकामी याद नहीं रखी जाती: अगली बार फिर कोशिश */
    return p;
  }
  /* गाँव का टुकड़ा: 3 अंक से शुरू; {"x":4} मिले तो 4 अंक की फ़ाइल, और ऐसे ही आगे */
  function placeFile(pin, len) {
    return file(BASEV + pin.slice(0, len) + '.json').then(function (j) {
      if (j && j.x && j.x > len && j.x <= 6) return placeFile(pin, j.x);
      return j ? { j: j, len: len } : null;
    });
  }
  function byName(a, b) { var x = a.n.toLowerCase(), y = b.n.toLowerCase(); return x < y ? -1 : x > y ? 1 : 0; }
  function dist(sh, row) { var st = sh.s[row[0]] || ['', '']; return { state: row[0], stateHi: st[0], stateEn: st[1], district: row[1], districtEn: row[2] }; }
  function build(pin, post, pl, failed) {
    var rawP = post && post.p && post.p[pin.slice(3)], rawV = pl && pl.j.p && pl.j.p[pin.slice(pl.len)];
    if ((!rawP || !rawP.length) && !rawV) return null;
    var districts = [], key = {}, i, j, k;
    function dIdx(d, src) { var id = d.state + '|' + d.district; if (key[id] === undefined) { d.src = src; key[id] = districts.length; districts.push(d); } return key[id]; }
    var places = [], towns = [], count = [];
    if (rawV) {
      var J = pl.j, G = rawV.g || [];
      /* ज़्यादा गाँवों वाला ज़िला पहले */
      var order = [];
      for (i = 0; i < G.length; i++) { var n = 0; for (k = 1; k < G[i][3].length; k += 2) n += G[i][3][k].split('|').length; order.push({ i: i, d: G[i][0], n: n }); }
      var tot = {}; for (i = 0; i < order.length; i++) tot[order[i].d] = (tot[order[i].d] || 0) + order[i].n;
      order.sort(function (a, b) { return (tot[b.d] - tot[a.d]) || (a.d - b.d) || (a.i - b.i); });
      for (i = 0; i < order.length; i++) {
        var g = G[order[i].i], di = dIdx(dist(J, J.d[g[0]]), 'lgd'), sub = g[1] >= 0 ? J.n[g[1]] : '', blk = g[2] >= 0 ? J.n[g[2]] : '';
        for (k = 0; k < g[3].length; k += 2) { var vs = g[3][k + 1].split('|'); for (j = 0; j < vs.length; j++) places.push({ n: vs[j], gp: g[3][k], block: blk, sub: sub, d: di }); }
      }
      var U = rawV.u || []; for (i = 0; i < U.length; i++) { var c = U[i].lastIndexOf('|'); towns.push({ n: U[i].slice(0, c), t: U[i].slice(c + 1) }); }
      places.sort(function (a, b) { return byName(a, b) || (a.gp < b.gp ? -1 : a.gp > b.gp ? 1 : 0) || (a.block < b.block ? -1 : a.block > b.block ? 1 : 0); });
    }
    var lgdN = districts.length, offices = [];
    if (rawP) for (i = 0; i < rawP.length; i++) {
      var od = rawP[i][0] >= 0 ? dIdx(dist(post, post.d[rawP[i][0]]), 'post') : -1, names = rawP[i][1] ? String(rawP[i][1]).split('|') : [];
      for (j = 0; j < names.length; j++) offices.push({ n: names[j], d: od });
    }
    offices.sort(byName);
    var sure = lgdN ? lgdN === 1 : districts.length === 1;
    return { pin: pin, districts: districts, sure: sure, main: sure ? districts[0] : null, known: districts.length > 0, offices: offices, places: places, towns: towns, placesFailed: !!failed };
  }
  function get(pin) {
    pin = String(pin == null ? '' : pin).replace(/[^0-9]/g, '');
    if (!ok(pin)) return Promise.resolve(null);
    var failed = false;
    var pv = placeFile(pin, 3).then(null, function () { failed = true; return null; });   /* गाँव की सूची न आए, तो डाक की जानकारी से काम चलता है */
    return Promise.all([file(BASE + pin.slice(0, 3) + '.json'), pv]).then(function (r) { return build(pin, r[0], r[1], failed); });
  }
  /* सहेजे हुए पते से पिन निकालना (रूप: "…, PIN: 851201"; भारत के बाहर का पता "Outside India: …" से शुरू होता है) */
  function parse(addr) {
    addr = String(addr == null ? '' : addr);
    var out = /^\s*Outside India:/i.test(addr), m = out ? null : (addr.match(/PIN:\s*(\d{6})/) || addr.match(/(\d{6})(?!.*\d)/));
    return { pin: m && ok(m[1]) ? m[1] : '', outside: out };
  }
  window.ACS_PIN = { ver: '1.1', ok: ok, get: get, parse: parse };
})();
