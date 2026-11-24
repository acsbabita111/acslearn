/* bhasha-khoj.js v1.0 · 24-Nov-2026 : भाषा-कोर्स की खोज (courses/hi भाषा-टैब), बच्चे के हिसाब से।
   Founder (24-Nov-2026): "भाषा खोजते समय आदमी खो जाता है ... चाइल्ड मनोविज्ञान के हिसाब से भी कोडिंग"।
   क्या करती है:
   - हिंदी, English, Hinglish (japani, angrezi, arbi), अपनी लिपि, भाषा-कोड (de, ms), कोर्स-id, देश/शहर (Japan, दुबई) से खोज;
   - टाइपिंग की छूट: नुक़्ता (अंग्रेजी = अंग्रेज़ी), ई/इ, ऊ/उ, ँ/ं, z/j, w/v, ee/i, oo/u, h छूटना (bojpuri), 1-2 अक्षर की ग़लती;
   - क्रम: भाषा का अपना नाम > कोड > अपनी लिपि > देश > शुरू के अक्षर > बीच के अक्षर > मिलती-जुलती वर्तनी; बराबरी पर पुराना (बड़ा) कोर्स पहले;
   - देश का नाम और भाषा का नाम उसी से शुरू हो (nepal → नेपाली, japan → जापानी): वह भाषा सबसे ऊपर;
   - सिर्फ़ वर्तनी-मेल मिले तो सबसे पास वाले ही (japanis → सिर्फ़ जापानी, भीड़ नहीं);
   - नतीजे खोज-डिब्बे के ठीक नीचे; न मिले तो सुझाव और "यह भाषा चाहिए" का रास्ता; "हिंदी" लिखे तो नरम समझाइश।
   data: courses_data.js (PRIVATE_JOB_COURSES, KKB_GROUPS) + bhasha_khoj_data.js (कोड, देश; generator/build_bhasha_khoj.js से)।
   जाँच-यंत्र: generator/dev_bhasha_khoj_check.js (Node में यही फ़ाइल चलती है)। ES5, कोई बाहरी library नहीं। */
(function (root) {
  "use strict";

  /* ---------- बराबर करना (normalize) ---------- */
  var DEVA_SAME = [[/\u093C/g, ""], [/\u0901/g, "\u0902"], [/\u0940/g, "\u093F"], [/\u0942/g, "\u0941"], [/\u0908/g, "\u0907"], [/\u090A/g, "\u0909"],
    [/\u0949/g, "\u094B"], [/\u0945/g, "\u0947"], [/\u0911/g, "\u0913"], [/[\u200B-\u200D\uFEFF]/g, ""]];
  function norm(s) {
    s = String(s == null ? "" : s).toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");   /* सिर्फ़ Latin के चिह्न (ō = o); देवनागरी मात्राएँ अछूती */
    for (var i = 0; i < DEVA_SAME.length; i++) s = s.replace(DEVA_SAME[i][0], DEVA_SAME[i][1]);
    return s;
  }
  function tokens(s) { return norm(s).split(/[\s\-\/(),.·:;'"’]+/).filter(function (t) { return t.length > 0; }); }
  function flat(s) { return norm(s).replace(/[\s\-\/(),.·:;'"’]+/g, ""); }
  /* Latin की आवाज़-छूट (सिर्फ़ मिलती-जुलती वर्तनी के लिए) */
  function squash(s) {
    s = flat(s);
    if (/[^a-z0-9]/.test(s)) return s;
    return s.replace(/ee/g, "i").replace(/oo/g, "u").replace(/ph/g, "f").replace(/ck/g, "k").replace(/q/g, "k").replace(/x/g, "ks")
      .replace(/z/g, "j").replace(/w/g, "v").replace(/([kgcjtdpbs])h/g, "$1").replace(/(.)\1+/g, "$1");
  }
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i]; var best = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  /* ---------- देवनागरी → Hinglish (बच्चा जैसे टाइप करता है: जापानी = japani, अरबी = arbi/arabi) ---------- */
  var CONS = { "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n", "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "n", "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n", "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m", "य": "y", "र": "r", "ल": "l", "ळ": "l", "व": "v", "श": "sh", "ष": "sh", "स": "s", "ह": "h" };
  var NUKTA = { "क": "k", "ख": "kh", "ग": "g", "ज": "z", "ड": "r", "ढ": "rh", "फ": "f", "य": "y" };
  var VOW = { "अ": "a", "आ": "a", "इ": "i", "ई": "i", "उ": "u", "ऊ": "u", "ऋ": "ri", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au", "ऑ": "o", "ॲ": "e" };
  var MAT = { "ा": "a", "ि": "i", "ी": "i", "ु": "u", "ू": "u", "ृ": "ri", "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ॉ": "o", "ॅ": "e" };
  /* एक शब्द → दो रूप: [बीच का अ बोलकर, बीच का अ छोड़कर] (अरबी: arabi, arbi) */
  function romanWord(w) {
    w = String(w).normalize ? String(w).normalize("NFD") : String(w);
    var syl = [], i, ch, nx;
    for (i = 0; i < w.length; i++) {
      ch = w.charAt(i);
      if (CONS[ch]) {
        var c = CONS[ch];
        if (w.charAt(i + 1) === "़") { c = NUKTA[ch] || c; i++; }
        nx = w.charAt(i + 1);
        if (nx === "्") { syl.push({ c: c, v: "", hal: 1 }); i++; }
        else if (MAT[nx]) { syl.push({ c: c, v: MAT[nx] }); i++; }
        else syl.push({ c: c, v: "a", inh: 1 });
      } else if (VOW[ch]) syl.push({ c: "", v: VOW[ch] });
      else if (ch === "ं" || ch === "ँ") { if (syl.length) syl[syl.length - 1].n = 1; }
      else if (ch === "ः") { if (syl.length) syl[syl.length - 1].h = 1; }
    }
    function out(drop) {
      var s = "", k;
      for (k = 0; k < syl.length; k++) {
        var S = syl[k], v = S.v;
        if (S.inh && k === syl.length - 1 && syl.length > 1) v = "";
        if (drop && S.inh && k > 0 && k < syl.length - 1 && !syl[k - 1].hal && syl[k + 1] && !syl[k + 1].inh) v = "";
        var nas = "";
        if (S.n) { var nc = syl[k + 1] ? syl[k + 1].c.charAt(0) : ""; nas = /[pbm]/.test(nc) ? "m" : "n"; }
        s += S.c + v + nas + (S.h ? "h" : "");
      }
      return s;
    }
    var a = out(false), b = out(true);
    return a === b ? [a] : [a, b];
  }
  function roman(s) {
    var words = String(s || "").split(/[\s\-\/(),]+/).filter(Boolean), outs = [""], i, j;
    for (i = 0; i < words.length; i++) {
      if (!/[ऀ-ॿ]/.test(words[i])) continue;
      var r = romanWord(words[i]), nx = [];
      for (j = 0; j < outs.length; j++) for (var k = 0; k < r.length; k++) nx.push(outs[j] ? outs[j] + " " + r[k] : r[k]);
      outs = nx.slice(0, 8);
    }
    return outs.filter(Boolean);
  }

  /* ---------- सूचकांक (index) ---------- */
  var HI_TAIL = /\s*(बोलने|बोलना)\s+का\s+प्रमाणपत्र.*$/;
  function coreHi(c) { var t = (c.t3 && c.t3[0]) || c.name_hi || ""; return t.replace(HI_TAIL, "").replace(/\s*प्रमाणपत्र.*$/, "").trim(); }
  function coreEn(c) {
    var last = c.t3 ? c.t3[c.t3.length - 1] : "";
    var m = /Certificate in Spoken\s+(.+)$/i.exec(last) || /Spoken\s+([^(—]+)/i.exec(c.name_en || "") || /Certificate in\s+([^(—]+)/i.exec(c.name_en || "");
    return m ? m[1].trim() : "";
  }
  function slugOf(url) { var p = String(url || "").split("/").filter(Boolean); return p[p.length - 1] || ""; }
  function build(list, extra) {
    extra = extra || {};
    return list.map(function (c, order) {
      var hi = coreHi(c), en = coreEn(c), slug = slugOf(c.url), X = extra[c.id] || {};
      var head = [], core = [], nat = [], place = [], rom = [];
      function add(arr, s) { var f = flat(s); if (f && arr.indexOf(f) < 0) arr.push(f); }
      add(head, hi); add(head, en); add(head, slug.replace(/-/g, " "));
      tokens(hi).concat(tokens(en), tokens(slug)).forEach(function (t) { add(core, t); });
      roman(hi).forEach(function (r) { add(head, r); add(rom, r); tokens(r).forEach(function (t) { add(rom, t); }); });
      (X.a || []).forEach(function (s) { add(head, s); tokens(s).forEach(function (t) { if (t.length > 2) add(core, t); }); roman(s).forEach(function (r) { add(rom, r); }); });
      (c.t3 || []).slice(1, -1).forEach(function (s) { add(nat, s); tokens(s).forEach(function (t) { if (t.length > 2) add(nat, t); }); });
      (X.p || []).forEach(function (s) { add(place, s); tokens(s).forEach(function (t) { if (t.length > 2) add(place, t); }); roman(s).forEach(function (r) { add(place, r); }); });
      var num = parseInt(String(c.id).replace(/\D/g, ""), 10);
      return { id: c.id, order: order, rank: isNaN(num) ? 9999 : num, code: X.c ? flat(X.c) : "", idf: flat(c.id), head: head, core: core, nat: nat, place: place, rom: rom,
        sq: head.concat(core, rom, place).map(squash).filter(function (s) { return s.length > 2; }) };
    });
  }

  /* ---------- खोज ---------- */
  function scoreOne(E, q, qs, short) {
    var best = 0, i;
    function up(v) { if (v > best) best = v; }
    for (i = 0; i < E.head.length; i++) if (E.head[i] === q) up(i === 0 || i === 1 ? 100 : 97);
    if (E.code && E.code === q) up(98);
    if (E.idf === q) up(98);
    for (i = 0; i < E.core.length; i++) if (E.core[i] === q) up(i === 0 ? 95 : 90);
    for (i = 0; i < E.rom.length; i++) if (E.rom[i] === q) up(92);
    for (i = 0; i < E.nat.length; i++) if (E.nat[i] === q) up(85);
    var heads = E.head.concat(E.core, E.rom), pl = 0;
    for (i = 0; i < E.place.length; i++) if (E.place[i] === q) { up(75); pl = 1; }
    /* देश का नाम + भाषा का नाम उसी से शुरू (nepal → नेपाली, japan → जापानी, korea → कोरियाई): देश की अपनी भाषा सबसे ऊपर */
    if (pl) for (i = 0; i < heads.length; i++) if (heads[i].indexOf(q) === 0) { up(93); break; }
    if (best) return best;
    for (i = 0; i < heads.length; i++) if (heads[i].indexOf(q) === 0) up(70 - Math.min(8, heads[i].length - q.length) / 2);
    if (short) return best;                                   /* 1-2 अक्षर: सिर्फ़ पूरा मेल और शुरुआत */
    for (i = 0; i < E.nat.length; i++) if (E.nat[i].indexOf(q) === 0) up(62);
    for (i = 0; i < E.place.length; i++) if (E.place[i].indexOf(q) === 0) up(60);
    if (best) return best;
    for (i = 0; i < heads.length; i++) if (heads[i].indexOf(q) > 0) up(50);
    for (i = 0; i < E.nat.length; i++) if (E.nat[i].indexOf(q) > 0) up(45);
    if (best) return best;
    if (qs.length >= 3) {
      var max = qs.length >= 6 ? 2 : 1;
      for (i = 0; i < E.sq.length; i++) {
        if (E.sq[i] === qs) { up(44); continue; }
        var d = lev(qs, E.sq[i], max); if (d <= max) up(40 - d * 6);
      }
    }
    return best;
  }
  function search(index, query, limit) {
    var q = flat(query); if (!q) return [];
    var qs = squash(query), short = q.length <= 2, res = [], i, s;
    for (i = 0; i < index.length; i++) { s = scoreOne(index[i], q, qs, short); if (s > 0) res.push({ id: index[i].id, score: s, rank: index[i].rank, order: index[i].order }); }
    res.sort(function (a, b) { return (b.score - a.score) || (a.rank - b.rank) || (a.order - b.order); });
    if (res.length && res[0].score >= 60) res = res.filter(function (x) { return x.score >= 45; });   /* अच्छा मेल मिला तो सिर्फ़ "मिलती-जुलती वर्तनी" वाले हटाओ (भीड़ नहीं) */
    else if (res.length && res[0].score < 45) { var top = res[0].score; res = res.filter(function (x) { return x.score > top - 6; }); }   /* सिर्फ़ वर्तनी-मेल: सबसे पास वाले ही (japanis → जापानी; दो अक्षर दूर वाले नहीं) */
    return limit ? res.slice(0, limit) : res;
  }
  /* कुछ न मिले तो: ढीली मिलती-जुलती वर्तनी (3 तक) */
  function suggest(index, query, n) {
    var qs = squash(query); if (qs.length < 3) return [];
    var res = [], i, j, maxD = qs.length <= 4 ? 1 : qs.length <= 7 ? 2 : 3;
    for (i = 0; i < index.length; i++) {
      var bestD = 99;
      for (j = 0; j < index[i].sq.length; j++) { var d = lev(qs, index[i].sq[j], maxD); if (d < bestD) bestD = d; }
      if (bestD <= maxD) res.push({ id: index[i].id, d: bestD, rank: index[i].rank });
    }
    res.sort(function (a, b) { return (a.d - b.d) || (a.rank - b.rank); });
    return res.slice(0, n || 3);
  }

  /* ---------- पन्ने पर जोड़ना ---------- */
  function mount(o) {
    var inp = document.getElementById(o.input), out = document.getElementById(o.out);
    if (!inp || !out) return null;
    var index = build(o.list, o.extra), shown = 24, timer = null;
    function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    function setHidden(on) { (o.hide || []).forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = on ? "none" : ""; }); }
    function render() {
      var q = inp.value || "", clr = document.getElementById(o.clear);
      if (clr) clr.style.display = q ? "" : "none";
      if (!flat(q)) { out.innerHTML = ""; out.style.display = "none"; setHidden(false); return; }
      setHidden(true); out.style.display = "";
      var r = search(index, q), h = "";
      if (/^(hindi|हिंदि|हिन्दि)$/.test(flat(q))) {   /* बच्चा "हिंदी" लिखे: नरम समझाइश, ग़लत भाषा नहीं */
        r = [];
        h += '<div class="bk-none"><div class="bk-none-t">🙂 हिंदी तो आप जानते हो!</div><div class="bk-tip">यहाँ हिंदी से <b>दूसरी भाषा</b> सीखते हैं। जैसे: <b>अंग्रेज़ी</b>, <b>अरबी</b>, <b>जापानी</b>। उसका नाम लिखो।</div></div>';
        out.innerHTML = h; return;
      }
      if (r.length) {
        h += '<div class="bk-head">🔎 <b>' + r.length + '</b> ' + (r.length === 1 ? "भाषा मिली" : "भाषाएँ मिलीं") + ' · सबसे सही सबसे ऊपर</div><div class="bh-chips bk-list">';
        h += r.slice(0, shown).map(function (x) { return o.chip(x.id); }).join("") + '</div>';
        if (r.length > shown) h += '<div class="bk-more"><button type="button" class="bk-btn" id="bkMore">और ' + Math.min(24, r.length - shown) + ' भाषाएँ दिखाओ ⬇</button></div>';
      } else {
        var sg = suggest(index, q, 3);
        h += '<div class="bk-none"><div class="bk-none-t">😕 "' + esc(q) + '" नाम की भाषा नहीं मिली।</div>' +
          '<div class="bk-tip">ऐसे लिखकर देखो: <b>जापानी</b>, <b>japani</b>, <b>Japan</b> या देश का नाम।</div>';
        if (sg.length) h += '<div class="bk-tip">क्या आप इनमें से कोई खोज रहे हो? 👇</div><div class="bh-chips bk-list">' + sg.map(function (x) { return o.chip(x.id); }).join("") + '</div>';
        if (o.wa) h += '<a class="bk-btn bk-wa" href="https://wa.me/' + esc(o.wa) + '?text=' + encodeURIComponent("नमस्ते ACS, मुझे यह भाषा सीखनी है: " + q) + '" target="_blank" rel="noopener">💬 यह भाषा हमें बताओ (व्हाट्सऐप)</a>';
        h += '</div>';
      }
      out.innerHTML = h;
      var mb = document.getElementById("bkMore"); if (mb) mb.onclick = function () { shown += 24; render(); };
    }
    inp.addEventListener("input", function () { shown = 24; clearTimeout(timer); timer = setTimeout(render, 120); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); inp.blur(); render(); try { out.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (x) { } } });
    var clr = document.getElementById(o.clear);
    if (clr) clr.onclick = function () { inp.value = ""; render(); inp.focus(); };
    render();
    return { index: index, render: render };
  }

  var API = { norm: norm, flat: flat, squash: squash, lev: lev, roman: roman, build: build, search: search, suggest: suggest, mount: mount, coreHi: coreHi, coreEn: coreEn, VER: "1.0" };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  root.BhashaKhoj = API;
})(typeof window !== "undefined" ? window : this);
