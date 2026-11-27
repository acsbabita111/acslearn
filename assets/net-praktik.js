/* ============================================================
   /assets/net-praktik.js v1.4 (27-Nov-2026, खेप N-6: बिहार की IT-सूची। बिना-पन्ने वाली सूची का कार्ड अब कई श्रेणियों वाली सूची के लायक़:
   श्रेणी का निशान (दूसरी श्रेणियाँ भी) और दुकान का फ़ोन (data में हो तभी)। CSC का कार्ड अक्षरशः वैसा ही (एक श्रेणी, फ़ोन नहीं)।
   /assets/net-praktik.js v1.3 (25-Nov-2026, खेप N-4, Founder: "नेटवर्क के सर्च में पंचायत भी"): (1) नया खाना "पंचायत / गाँव"
   (data का pc: सिर्फ़ स्रोत के पते में साफ़ लिखी पंचायत; जिनमें नहीं, वे "पंचायत पता नहीं" में), प्रखंड चुनें तो सिर्फ़ उसी प्रखंड की
   पंचायतें; जिस ज़िले में एक भी पंचायत दर्ज नहीं (जैसे टू-व्हीलर), वहाँ यह खाना नहीं दिखता। (2) खोज-खाना अब नाम, पंचायत, पता,
   इलाक़ा और स्रोत का प्रखंड, सब में ढूँढता है। (3) हर कार्ड के नीचे दो बटन: "सुधार का निवेदन" और "नया फ़र्म जोड़ें" (index.json का nv)।
   v1.2 (25-Nov-2026, खेप N-3.1: CSC कार्ड में स्रोत-कड़ी न हो, तो साफ़ "स्रोत की कड़ी नहीं" (ChatGPT ऑडिट CSC-02);
   स्रोत-पंक्ति हमेशा दिखती है।
   v1.1 (25-Nov-2026, खेप N-3: CSC सूची। जिस सूची के नामों का अलग पन्ना नहीं (index में rp: 0), उसका
   कार्ड: सूचीबद्ध + जाँच का निशान, "Official CSC" (सिर्फ़ o: 1 पर), प्रखंड या "प्रखंड-मिलान बाक़ी" (+ स्रोत का प्रखंड), पता/PIN,
   स्रोत की कड़ी, और "पूरी जानकारी" = ज़िले के पन्ने पर उस नाम की जगह; सूची की अपनी सूचना और disclosure ऊपर; प्रखंड-छँटाई में
   "प्रखंड-मिलान बाक़ी" (__u)। स्रोत के [ ] छपाई में ( )। Two-Wheeler का कार्ड वैसा ही।
   v1.0 (22-Nov-2026, खेप N-1) : नेटवर्क-पन्ने का "व्यावहारिक सीखने की जगहें" हिस्सा
   पन्ना: /hi/network.html और /en/network.html (हिस्सा generator/build_net_khoj.js से, #npApp)।
   data: /assets/network/index.json (क्षेत्र, श्रेणी, ज़िले, गिनती, शब्द) और ज़िला चुनने पर उसी ज़िले की
   /assets/network/<राज्य>/<सेक्टर>/<ज़िला>.json (दोनों generator/build_network.js से)। server की ज़रूरत नहीं।
   भाषा = पन्ने की <html lang> (hi → हिंदी; बाक़ी सब → English)। हर जगह के साथ उसकी जाँच की स्थिति का निशान।
   सूची में नाम ≠ साझेदारी: यह बात पन्ने पर ऊपर-नीचे लिखी है (generator)।
   पुराने फ़ोन (Android 8) के लिए ES5; हर नाम/पता दिखाने से पहले esc() से सुरक्षित।
   जाँच-यंत्र (generator/dev_network_check.js) window.ACS_NP के शुद्ध हिस्से चलाकर देखता है।
   ============================================================ */
(function () {
  "use strict";
  var NP = {};
  NP.esc = function (v) { return String(v === null || v === undefined ? "" : v).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); };
  NP.fmt = function (s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] === undefined ? m : o[k]; }); };
  NP.phoneTxt = function (p) { return p.length === 10 ? p.slice(0, 5) + " " + p.slice(5) : p.slice(0, 4) + " " + p.slice(4); };
  NP.tel = function (p) { return "tel:+91" + (p.charAt(0) === "0" ? p.slice(1) : p); };
  NP.firmUrl = function (L, id) { return (L === "hi" ? "" : "/" + L) + "/network/firm/" + String(id).toLowerCase() + ".html"; };
  function has(a, v) { if (!a) return false; for (var i = 0; i < a.length; i++) if (a[i] === v) return true; return false; }
  function same(a, b) { return String(a || "").toLowerCase().replace(/[^a-z0-9]/g, "") === String(b || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  /* छँटाई: f = {b: प्रखंड, pc: पंचायत, c: श्रेणी, s: "V"/"T", br: ब्रांड, k: हुनर, q: खोज का शब्द} */
  NP.UNM = "__u";   /* प्रखंड-मिलान बाक़ी (data में b = "") */
  NP.PCN = "__n";   /* v1.3: पंचायत पता नहीं (data में pc नहीं) */
  NP.hay = function (r) { return [r.n, r.pc, r.a, r.l, r.rb].join(" ").toLowerCase(); };
  NP.paren = function (v) { return String(v === null || v === undefined ? "" : v).replace(/\[/g, "(").replace(/\]/g, ")"); };
  NP.filter = function (rs, f) {
    var q = String(f.q || "").toLowerCase().replace(/^\s+|\s+$/g, ""), out = [];
    for (var i = 0; i < rs.length; i++) {
      var r = rs[i];
      if (f.b === NP.UNM) { if (r.b) continue; }
      else if (f.b && r.b !== f.b) continue;
      if (f.pc === NP.PCN) { if (r.pc) continue; }
      else if (f.pc && r.pc !== f.pc) continue;
      if (f.c && r.c !== f.c && !has(r.c2, f.c)) continue;
      if (f.s && r.s !== f.s) continue;
      if (f.br && !has(r.br, f.br)) continue;
      if (f.k && !has(r.k, f.k)) continue;
      if (q && NP.hay(r).indexOf(q) < 0) continue;
      out.push(r);
    }
    return out;
  };
  /* v1.3: कार्ड के नीचे दो बटन; stSlug = राज्य का slug, dd = ज़िला (index.json)। (नाम st नहीं: कार्ड में st = जाँच की स्थिति) */
  NP.nvBtns = function (L, idx, sec, r, stSlug, dd) {
    if (!idx.nv || !idx.nv[L] || !dd || !stSlug) return "";
    var U = idx.ui[L], base = idx.nv[L] + "?m=", tail = "&s=" + encodeURIComponent(stSlug) + "&k=" + encodeURIComponent(sec.key) + "&d=" + encodeURIComponent(dd.slug);
    return '<div class="nw-nv"><a href="' + NP.esc(base + "sudhar&id=" + encodeURIComponent(r.i) + tail) + '">' + NP.esc(U.nvBtn) + "</a>" +
      '<a class="ny" href="' + NP.esc(base + "naya" + tail) + '">' + NP.esc(U.nyBtn) + "</a></div>";
  };
  NP.card = function (L, idx, sec, r, dd, stSlug) {
    if (sec.rp === 0) return NP.listedCard(L, idx, sec, r, dd, stSlug);
    var U = idx.ui[L], st = idx.status[r.s] || idx.status.T, cat = r.c, place = [], i;
    for (i = 0; i < sec.cats.length; i++) if (sec.cats[i].id === r.c) cat = sec.cats[i][L];
    if (r.l && !same(r.l, r.b)) place.push(r.l);
    place.push(r.b);
    var h = '<div class="nw-card' + (r.s === "V" ? " ver" : "") + '"><a class="nw-name" href="' + NP.firmUrl(L, r.i) + '">' + NP.esc(r.n) + "</a>" +
      '<div><span class="nw-tag ' + (r.s === "V" ? "ver" : "tbv") + '">' + st.icon + " " + NP.esc(st[L]) + '</span><span class="nw-tag cat">' + NP.esc(cat) + "</span></div>" +
      '<div class="nw-row">📍 ' + NP.esc(place.join(", ")) + "</div>";
    if (r.p) h += '<div class="nw-row">📞 <a href="' + NP.tel(r.p) + '">' + NP.phoneTxt(r.p) + "</a>" + (r.sp ? " (" + NP.esc(U.shared) + ")" : "") + "</div>";
    return h + '<div class="nw-row"><a href="' + NP.firmUrl(L, r.i) + '">' + NP.esc(U.see) + " →</a></div>" + NP.nvBtns(L, idx, sec, r, stSlug, dd) + "</div>";
  };
  /* v1.1: बिना-पन्ने वाली सूची (CSC) का कार्ड; dd = ज़िला (index.json से: पन्ने का पता) */
  NP.listedCard = function (L, idx, sec, r, dd, stSlug) {
    var U = idx.ui[L], st = idx.status[r.s] || idx.status.T, T = (sec.txt || {})[L] || {}, esc = NP.esc, paren = NP.paren;
    var url = dd && dd.page ? dd.page[L] + "#" + String(r.i).toLowerCase() : "";
    var place = [r.b ? r.b : U.unmapped]; if (r.rb) place.push(NP.fmt(U.rawBlock, { b: paren(r.rb) }));
    var addr = []; if (r.a) addr.push(paren(r.a)); if (r.pn) addr.push(U.pin + " " + r.pn);
    var ty = (idx.srcTypes || {})[r.st], src = (ty ? ty[L] : "") + (r.sn ? ": " + r.sn : "");
    var cats = "", ci, cj, cl, cids;
    if (sec.cats && sec.cats.length > 1) {   /* v1.4: कई श्रेणियों वाली सूची (IT) */
      cids = [r.c].concat(r.c2 || []);
      for (ci = 0; ci < cids.length; ci++) { cl = cids[ci]; for (cj = 0; cj < sec.cats.length; cj++) if (sec.cats[cj].id === cids[ci]) cl = sec.cats[cj][L]; cats += '<span class="nw-tag cat">' + esc(cl) + "</span>"; }
    }
    var h = '<div class="nw-card">' + (url ? '<a class="nw-name" href="' + url + '">' + esc(paren(r.n)) + "</a>" : '<span class="nw-name">' + esc(paren(r.n)) + "</span>") +
      '<div><span class="nw-tag cat">' + esc(U.listed) + '</span><span class="nw-tag ' + (r.s === "V" ? "ver" : "tbv") + '">' + st.icon + " " + esc(st[L]) + "</span>" +
      (r.o === 1 ? '<span class="nw-tag cat">' + esc(U.official) + "</span>" : "") + cats + "</div>" +
      '<div class="nw-row">📍 ' + esc(place.join(" · ")) + "</div>";
    if (addr.length) h += '<div class="nw-row">🏠 ' + esc(addr.join(" · ")) + "</div>";
    if (r.p && /^\d{10,11}$/.test(String(r.p))) h += '<div class="nw-row">📞 <a href="' + NP.tel(String(r.p)) + '">' + NP.phoneTxt(String(r.p)) + "</a>" + (r.sp ? " (" + esc(U.shared) + ")" : "") + "</div>";
    var hasUrl = r.su && /^https?:\/\//i.test(r.su);
    h += '<div class="nw-row">🔗 ' + esc((T.src || "") + (src ? ": " + src : "")) + " · " + (hasUrl ? '<a href="' + esc(r.su) + '" target="_blank" rel="nofollow noopener noreferrer">' + esc(T.srcLink || "") + "</a>" : esc(T.srcNone || "")) + "</div>";
    return h + (url ? '<div class="nw-row"><a href="' + url + '">' + esc(U.srcSee) + " →</a></div>" : "") + NP.nvBtns(L, idx, sec, r, stSlug, dd) + "</div>";
  };
  NP.uniqSorted = function (rs, key) {
    var seen = {}, out = [], i, j, v;
    for (i = 0; i < rs.length; i++) { v = rs[i][key]; v = v === undefined ? [] : (Object.prototype.toString.call(v) === "[object Array]" ? v : [v]);
      for (j = 0; j < v.length; j++) if (!seen[v[j]]) { seen[v[j]] = 1; out.push(v[j]); } }
    return out.sort(function (a, b) { return String(a).localeCompare(String(b)); });
  };
  if (typeof window !== "undefined") window.ACS_NP = NP;

  var app = typeof document !== "undefined" && document.getElementById ? document.getElementById("npApp") : null;
  if (!app) return;
  var L = String(document.documentElement.lang || "hi").slice(0, 2) === "hi" ? "hi" : "en";
  var IDX = null, U = null, S = { sec: null, st: null, d: null, rs: null, shown: 20, f: {} };
  var esc = NP.esc;

  function get(url, cb) {
    var x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.onreadystatechange = function () {
      if (x.readyState !== 4) return;
      if (x.status === 200) { var j = null; try { j = JSON.parse(x.responseText); } catch (e) { j = null; } cb(j ? null : new Error("json"), j); }
      else cb(new Error("http " + x.status));
    };
    x.send();
  }
  function secObj(k) { for (var i = 0; i < IDX.sectors.length; i++) if (IDX.sectors[i].key === k) return IDX.sectors[i]; return null; }
  function statesFor(k) { var out = []; for (var i = 0; i < IDX.states.length; i++) if (IDX.states[i].sectors[k]) out.push(IDX.states[i]); return out; }
  function sel(id, label, opts, val, dis) {
    var h = '<div><label class="np-lbl" for="' + id + '">' + esc(label) + '</label><select id="' + id + '"' + (dis ? " disabled" : "") + ">";
    for (var i = 0; i < opts.length; i++) h += '<option value="' + esc(opts[i][0]) + '"' + (opts[i][0] === val ? " selected" : "") + ">" + esc(opts[i][1]) + "</option>";
    return h + "</select></div>";
  }
  function $(id) { return document.getElementById(id); }

  function drawChips() {
    var h = '<div class="np-chips" role="group" aria-label="' + esc(U.sector) + '">';
    for (var i = 0; i < IDX.sectors.length; i++) {
      var s = IDX.sectors[i], on = s.key === S.sec;
      h += '<button type="button" class="np-chip' + (on ? " on" : "") + '" data-sec="' + esc(s.key) + '" aria-pressed="' + (on ? "true" : "false") + '">' +
        s.icon + " " + esc(s[L]) + "<small>" + esc(IDX.sectorStatus[s.status][L]) + "</small></button>";
    }
    return h + "</div>";
  }
  function draw() {
    var sec = secObj(S.sec), sts = statesFor(S.sec), h = drawChips();
    if (!sts.length) {
      h += '<p class="nw-notice">' + sec.icon + " " + esc(sec[L === "hi" ? "hiPlace" : "enPlace"]) + ": " + esc(IDX.sectorStatus[sec.status][L]) + "</p>" +
        '<p class="nk-note">' + esc(IDX.empty[L]) + "</p>";
      app.innerHTML = h; bindChips(); return;
    }
    if (!S.st) S.st = sts[0].slug;
    var stObj = null, i; for (i = 0; i < sts.length; i++) if (sts[i].slug === S.st) stObj = sts[i];
    if (!stObj) { stObj = sts[0]; S.st = stObj.slug; }
    if (sec.txt && sec.txt[L]) h += '<p class="nw-notice">' + esc(sec.txt[L].notice) + '</p><p class="nw-disc">' + esc(sec.txt[L].disc) + "</p>";
    var SS = stObj.sectors[S.sec], dOpts = [["", U.allD]], ds = SS.districts.slice().sort(function (a, b) { return a[L].localeCompare(b[L], L === "hi" ? "hi" : "en"); });
    for (i = 0; i < ds.length; i++) dOpts.push([ds[i].slug, ds[i][L] + " (" + ds[i].n + ")"]);
    var stOpts = []; for (i = 0; i < sts.length; i++) stOpts.push([sts[i].slug, sts[i][L]]);
    h += '<div class="np-grid">' + sel("npState", U.state, stOpts, S.st, sts.length < 2) + sel("npDist", U.district, dOpts, S.d || "", false);
    var rs = S.rs || [], dis = !S.rs;
    var bOpts = [["", U.all]], b = NP.uniqSorted(rs, "b"), unm = false; for (i = 0; i < b.length; i++) { if (b[i] === "") unm = true; else bOpts.push([b[i], b[i]]); }
    if (unm) bOpts.push([NP.UNM, U.unmapped]);
    var cOpts = [["", U.all]]; for (i = 0; i < sec.cats.length; i++) if (!S.rs || NP.filter(rs, { c: sec.cats[i].id }).length) cOpts.push([sec.cats[i].id, sec.cats[i][L]]);
    var showCat = sec.cats.length > 1;   /* v1.1: एक ही श्रेणी हो (CSC) तो श्रेणी-छँटाई नहीं */
    var sOpts = [["", U.all], ["V", IDX.status.V.icon + " " + IDX.status.V[L]], ["T", IDX.status.T.icon + " " + IDX.status.T[L]]];
    h += sel("npBlock", U.block, bOpts, S.f.b || "", dis);
    /* v1.3: पंचायत / गाँव: सिर्फ़ तब, जब इस ज़िले के data में कम से कम एक पंचायत दर्ज हो; प्रखंड चुना हो तो उसी प्रखंड की */
    var pcBase = S.f.b ? NP.filter(rs, { b: S.f.b }) : rs, pcs = NP.uniqSorted(pcBase, "pc"), pcAny = NP.uniqSorted(rs, "pc").length > 0;
    if (pcAny) {
      var pOpts = [["", U.all]], noPc = false; for (i = 0; i < pcs.length; i++) pOpts.push([pcs[i], pcs[i]]);
      for (i = 0; i < pcBase.length; i++) if (!pcBase[i].pc) { noPc = true; break; }
      if (noPc) pOpts.push([NP.PCN, U.pcNone]);
      h += sel("npPc", U.panchayat, pOpts, S.f.pc || "", dis);
    }
    h += (showCat ? sel("npCat", U.category, cOpts, S.f.c || "", dis) : "") + sel("npStat", U.status, sOpts, S.f.s || "", dis);
    var br = NP.uniqSorted(rs, "br"); if (br.length) { var brOpts = [["", U.all]]; for (i = 0; i < br.length; i++) brOpts.push([br[i], br[i]]); h += sel("npBrand", U.brand, brOpts, S.f.br || "", dis); }
    var kk = NP.uniqSorted(rs, "k"); if (kk.length) { var kOpts = [["", U.all]];
      for (i = 0; i < kk.length; i++) { var lab = kk[i]; for (var j = 0; j < sec.skills.length; j++) if (sec.skills[j].id === kk[i]) lab = sec.skills[j][L]; kOpts.push([kk[i], lab]); }
      h += sel("npSkill", U.skill, kOpts, S.f.k || "", dis); }
    h += '<div><label class="np-lbl" for="npQ">' + esc(U.name) + '</label><input id="npQ" type="search" maxlength="60" value="' + esc(S.f.q || "") + '"' + (dis ? " disabled" : "") + "/></div></div>";
    h += '<div id="npList" aria-live="polite"></div>';
    app.innerHTML = h; bindChips(); bindFilters(); drawList();
  }
  function drawList() {
    var box = $("npList"); if (!box) return;
    if (!S.d) { box.innerHTML = '<p class="nk-note">' + esc(U.pickD) + "</p>"; return; }
    if (!S.rs) { box.innerHTML = '<p class="nk-note">' + esc(U.loading) + "</p>"; return; }
    var sec = secObj(S.sec), rs = NP.filter(S.rs, S.f), h = '<p class="np-tot">' + esc(NP.fmt(U.total, { n: rs.length })) + "</p>", i;
    if (!rs.length) h += '<p class="nk-note">' + esc(U.none) + "</p>";
    var dd = curDistrict();
    for (i = 0; i < rs.length && i < S.shown; i++) h += NP.card(L, IDX, sec, rs[i], dd, S.st);
    if (rs.length > S.shown) h += '<button type="button" class="nw-btn alt np-more" id="npMore">' + esc(U.more) + "</button>";
    if (dd) h += '<p class="np-links"><a href="' + dd.page[L] + '">📋 ' + esc(dd[L]) + ": " + esc(U.list) + "</a></p>";
    box.innerHTML = h;
    var m = $("npMore"); if (m) m.onclick = function () { S.shown += 20; drawList(); };
  }
  function curDistrict() {
    var sts = statesFor(S.sec), i, j;
    for (i = 0; i < sts.length; i++) if (sts[i].slug === S.st) { var ds = sts[i].sectors[S.sec].districts; for (j = 0; j < ds.length; j++) if (ds[j].slug === S.d) return ds[j]; }
    return null;
  }
  function bindChips() {
    var bs = app.querySelectorAll(".np-chip");
    for (var i = 0; i < bs.length; i++) bs[i].onclick = function () { var k = this.getAttribute("data-sec"); if (k === S.sec) return; S.sec = k; S.st = null; S.d = null; S.rs = null; S.f = {}; S.shown = 20; draw(); };
  }
  function bindFilters() {
    var st = $("npState"); if (st) st.onchange = function () { S.st = this.value; S.d = null; S.rs = null; S.f = {}; S.shown = 20; draw(); };
    var d = $("npDist"); if (d) d.onchange = function () {
      S.d = this.value || null; S.rs = null; S.f = {}; S.shown = 20; draw();
      var dd = curDistrict(); if (!dd) return;
      var want = S.d;
      get(dd.shard, function (err, j) {
        if (S.d !== want) return;
        if (err || !j || !j.r) { var b = $("npList"); if (b) b.innerHTML = '<p class="nk-note">' + esc(U.err) + "</p>"; return; }
        S.rs = j.r; draw();
        var dz = $("npDist"); if (dz && dz.focus) dz.focus();
      });
    };
    var keys = [["npPc", "pc"], ["npCat", "c"], ["npStat", "s"], ["npBrand", "br"], ["npSkill", "k"]];
    for (var i = 0; i < keys.length; i++) (function (id, k) { var e = $(id); if (e) e.onchange = function () { S.f[k] = this.value || ""; S.shown = 20; drawList(); }; })(keys[i][0], keys[i][1]);
    /* v1.3: प्रखंड बदले तो पंचायत की सूची भी उसी प्रखंड की बने (पूरा हिस्सा दोबारा; खोज का शब्द बना रहता है) */
    var bk = $("npBlock"); if (bk) bk.onchange = function () { S.f.b = this.value || ""; S.f.pc = ""; S.shown = 20; draw(); var z = $("npBlock"); if (z && z.focus) z.focus(); };
    var q = $("npQ"); if (q) q.oninput = function () { S.f.q = this.value; S.shown = 20; drawList(); };
  }

  get(app.getAttribute("data-index"), function (err, j) {
    if (err || !j || !j.sectors || !j.ui) { app.innerHTML = '<p class="nk-note">' + esc((j && j.ui ? j.ui[L].err : (L === "hi" ? "सूची अभी नहीं खुल सकी।" : "The list could not open now."))) + "</p>"; return; }
    IDX = j; U = j.ui[L];
    for (var i = 0; i < IDX.sectors.length; i++) if (statesFor(IDX.sectors[i].key).length) { S.sec = IDX.sectors[i].key; break; }
    if (!S.sec) S.sec = IDX.sectors[0].key;
    draw();
  });
})();
