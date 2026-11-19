/* net-khoj.js v1.0 · 19-Nov-2026 : नेटवर्क पेज की खोज (परत-5, साझा component)
   Founder की सलाह (19-Nov-2026): registration में लिखा बोर्ड और बैनर वाला नाम, ACS की मंज़ूरी के बाद, खोज में सबको दिखे।
   - server: searchPublicListings (class_server.js v2.4) : बिना login; सिर्फ़ स्वीकृत केंद्र, वर्कशॉप, शिक्षक और उस्ताद।
     उसमें फ़ोन, email, पता, फ़ोटो या खाते की पहचान कभी नहीं आती: सिर्फ़ नाम, जगह, ACS नंबर, कोर्स और बैज।
   - भूगोल का एकमात्र घर /assets/geo/ : देश (countries.js), राज्य (states/{देश}.js), भारत के ज़िले (districts/in-{राज्य}.js);
     वही कुंजियाँ जो registration में दर्ज होती हैं, इसलिए खोज ठीक उन्हीं से मिलती है।
   - ऊपर की गिनती-पट्टी में असली गिनती (server से)।
   project का नाम acs-config.js से (fallback साथ)। ES5 (Android 8)। हाथ से बना कोई पेज नहीं: पेज का हिस्सा
   generator/build_net_khoj.js बनाता है। */
(function (G) {
  "use strict";
  if (typeof document === "undefined") return;
  var C = G.ACS_CONFIG || {};
  var PID = (C.firebase && C.firebase.projectId) || "acslearn-platform";
  var FN = "https://us-central1-" + PID + ".cloudfunctions.net/searchPublicListings";
  var ROLE = { center: "🏫 केंद्र", workshop: "🔧 वर्कशॉप", teacher: "👨‍🏫 शिक्षक की online कक्षा", ustad: "🛠️ उस्ताद की online कक्षा" };
  var HOW_INST = "जुड़ने के लिए: ACS पर रजिस्ट्रेशन करें। फिर अपने पैनल में यह ACS नंबर डालकर कोर्स चुनें।";
  var HOW_TEACH = "यह कक्षा ACS पर online चलती है। जुड़ने के लिए: ACS पर रजिस्ट्रेशन करें। फिर अपने पैनल में \"शिक्षकों के online कोर्स\" खोलें।";
  var ST = { cat: "", page: 0, items: [], total: 0, busy: false };
  function $(id) { return document.getElementById(id); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }).replace(/\[/g, "(").replace(/\]/g, ")"); }

  /* ── भूगोल: फ़ाइल माँग-पर ── */
  var loaded = {};
  function loadJs(src, done) {
    if (loaded[src] === 1) { done(); return; }
    if (loaded[src]) { loaded[src].push(done); return; }
    loaded[src] = [done];
    var s = document.createElement("script"); s.src = src; s.async = true;
    function fin() { var L = loaded[src]; loaded[src] = 1; for (var i = 0; i < L.length; i++) L[i](); }
    s.onload = fin; s.onerror = fin; (document.head || document.documentElement).appendChild(s);
  }
  function countries() { return G.ACS_GEO_COUNTRIES || [{ v: "in", hi: "भारत", g: 1 }]; }
  function countryName(v) { var L = countries(); for (var i = 0; i < L.length; i++) if (L[i].v === v) return L[i].hi || L[i].en || v; return v; }
  function statesOf(c) { return (G.ACS_GEO_STATES && G.ACS_GEO_STATES[c]) || null; }
  function stateName(c, v) { var L = statesOf(c); if (L) for (var i = 0; i < L.length; i++) if (L[i].v === v) return L[i].name || v; return String(v || "").replace(/-/g, " "); }
  function fillSel(sel, first, list, val) {
    var h = '<option value="">' + esc(first) + "</option>";
    for (var i = 0; i < list.length; i++) h += '<option value="' + esc(list[i][0]) + '">' + esc(list[i][1]) + "</option>";
    sel.innerHTML = h; sel.value = val || "";
  }
  function fillCountries() {
    var L = countries(), groups = { 1: "🇮🇳 भारत", 2: "सार्क देश", 3: "ग्लोबल साउथ", 4: "बाक़ी दुनिया" }, h = '<option value="">सब देश</option>', g = 0;
    for (var i = 0; i < L.length; i++) {
      if (L[i].g !== g) { if (g) h += "</optgroup>"; g = L[i].g; h += '<optgroup label="' + esc(groups[g] || "") + '">'; }
      h += '<option value="' + esc(L[i].v) + '">' + esc(L[i].hi || L[i].en) + "</option>";
    }
    if (g) h += "</optgroup>";
    $("fCountry").innerHTML = h; $("fCountry").value = "in";
  }
  function fillStates(done) {
    var c = $("fCountry").value, sS = $("fState"), sD = $("fDistrict");
    fillSel(sD, "सब ज़िले", []); sD.disabled = true;
    if (!c) { fillSel(sS, "सब राज्य", []); sS.disabled = true; if (done) done(); return; }
    sS.disabled = true; fillSel(sS, "राज्य आ रहे हैं…", []);
    loadJs("/assets/geo/states/" + c + ".js", function () {
      var L = statesOf(c) || [], out = [];
      for (var i = 0; i < L.length; i++) out.push([L[i].v, L[i].name]);
      fillSel(sS, "सब राज्य", out); sS.disabled = !out.length;
      if (done) done();
    });
  }
  function fillDistricts(done) {
    var c = $("fCountry").value, s = $("fState").value, sD = $("fDistrict");
    if (c !== "in" || !s) { fillSel(sD, "सब ज़िले", []); sD.disabled = true; if (done) done(); return; }
    sD.disabled = true; fillSel(sD, "ज़िले आ रहे हैं…", []);
    loadJs("/assets/geo/districts/in-" + s + ".js", function () {
      var L = (G.ACS_GEO_DISTRICTS && G.ACS_GEO_DISTRICTS["in-" + s]) || [], out = [];
      for (var i = 0; i < L.length; i++) out.push([L[i], L[i]]);
      fillSel(sD, "सब ज़िले", out); sD.disabled = !out.length;
      if (done) done();
    });
  }

  /* ── server ── */
  function ask(data, ok, bad) {
    if (!G.fetch) { bad(); return; }
    G.fetch(FN, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: data }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || j.error || !j.result) throw new Error("bad"); ok(j.result); })
      ["catch"](function () { bad(); });
  }
  function counts(c) {
    var M = { nDesh: "countries", nZonal: "zonal", nRegional: "regional", nCentre: "center", nTeacher: "teacher", nCounselor: "counselor", nEmployer: "employer", nAgent: "agent", nLabharthi: "learner" };
    for (var id in M) { var e = $(id); if (e) e.textContent = (c && typeof c[M[id]] === "number") ? String(c[M[id]]) : "—"; }
  }

  /* ── सूची ── */
  function card(x) {
    var place = [];
    if (x.district) place.push(esc(x.district));
    if (x.state) place.push(esc(stateName(x.country, x.state)));
    if (x.country && x.country !== "in") place.push(esc(countryName(x.country)));
    var teach = x.role === "teacher" || x.role === "ustad";
    var h = '<div class="nk-card' + (x.badge ? " bdg" : "") + '"><div class="nk-tags"><span class="nk-tag">' + esc(ROLE[x.role] || "") + "</span>" +
      (x.badge ? '<span class="nk-tag gn">✔ सत्यापित बैज</span>' : "") + "</div>" +
      '<div class="nk-name">' + esc(x.name) + "</div>";
    if (place.length) h += '<div class="nk-row">📍 ' + place.join(", ") + "</div>";
    h += '<div class="nk-row">🪪 ACS नंबर: <b>' + esc(x.regNo) + "</b></div>";
    if (x.courses && x.courses.length) h += '<div class="nk-row">📚 ' + x.courses.map(esc).join(" · ") + "</div>";
    h += '<div class="nk-how">👉 ' + esc(teach ? HOW_TEACH : HOW_INST) + "</div>";
    return h + "</div>";
  }
  function draw() {
    var box = $("netResult"); if (!box) return;
    var h = '<div class="nk-tot">मिले: ' + ST.total + "</div>";
    if (!ST.total) h += '<p class="nk-note">इस खोज में अभी कोई नाम नहीं मिला। देश, राज्य या श्रेणी बदलकर देखें।</p>';
    for (var i = 0; i < ST.items.length; i++) h += card(ST.items[i]);
    if (ST.items.length < ST.total) h += '<button type="button" class="btn btn-primary nk-more" id="nkMore">⬇ और देखें</button>';
    box.innerHTML = h;
  }
  function fail() {
    var box = $("netResult"); if (!box) return;
    box.innerHTML = '<p class="nk-note">सूची अभी नहीं खुली। इंटरनेट देखकर थोड़ी देर बाद फिर कोशिश करें।</p>' +
      '<button type="button" class="btn btn-primary nk-more" id="nkRetry">🔄 फिर कोशिश करें</button>';
  }
  function query() {
    return { role: ST.cat, country: $("fCountry").value, state: $("fState").value, district: $("fDistrict").value,
      q: String($("fQ").value || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, ""), page: ST.page };
  }
  function search(more) {
    if (ST.busy) return; ST.busy = true;
    if (!more) { ST.page = 0; ST.items = []; var box = $("netResult"); if (box) box.innerHTML = '<p class="nk-note">खोज रहे हैं…</p>'; }
    ask(query(), function (r) {
      ST.busy = false; counts(r.counts); ST.total = r.total || 0; ST.items = ST.items.concat(r.items || []); draw();
    }, function () { ST.busy = false; if (more) ST.page--; fail(); });
  }

  function start() {
    if (!$("netResult") || !$("fCountry")) return;
    fillCountries();
    $("fCountry").onchange = function () { fillStates(function () { search(false); }); };
    $("fState").onchange = function () { fillDistricts(function () { search(false); }); };
    $("fDistrict").onchange = function () { search(false); };
    $("fGo").onclick = function () { search(false); };
    $("fQ").onkeydown = function (e) { if ((e.key || e.keyCode) === "Enter" || e.keyCode === 13) { if (e.preventDefault) e.preventDefault(); search(false); } };
    var cats = document.querySelectorAll(".net-cat");
    for (var i = 0; i < cats.length; i++) cats[i].onclick = function () {
      for (var k = 0; k < cats.length; k++) { cats[k].className = "net-cat"; cats[k].setAttribute("aria-pressed", "false"); }
      this.className = "net-cat on"; this.setAttribute("aria-pressed", "true"); ST.cat = this.getAttribute("data-cat") || ""; search(false);
    };
    $("netResult").onclick = function (e) {
      var t = e.target || {};
      if (t.id === "nkMore") { ST.page++; search(true); }
      if (t.id === "nkRetry") search(false);
    };
    fillStates(function () { search(false); });
  }
  G.ACS_NET_KHOJ = { version: "1.0", start: start, _search: search };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})(typeof window !== "undefined" ? window : this);
