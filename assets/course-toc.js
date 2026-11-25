/* ============================================================
   ACS course-toc.js v1.0 · 25-Nov-2026
   laptop पर कोर्स के पाठ-पन्ने में बाईं ओर पूरी पाठ-सूची (Claude-पैनल जैसी)।
   Founder (25-Nov): "बाईं ओर सब खंड (chapter) दिखें; खंड छुएँ तो उसके सब पाठ;
   पाठ दाईं ओर।"
   ------------------------------------------------------------
   - data: assets/toc/<कोर्स>.json (generator/build_course_toc.js से बनी)।
   - सिर्फ़ 1024px या चौड़ी स्क्रीन पर; फ़ोन पर कुछ नहीं उतरता (data भी नहीं)।
   - अभी का पाठ रंग से दिखे, उसका खंड खुला रहे। पढ़े पाठ पर ✓ (इसी फ़ोन/computer
     की प्रगति से, course-lesson.js वाली; कहीं भेजी नहीं जाती)।
   - "पट्टी छिपाएँ" से छिपे; यह पसंद इसी browser में याद रहे।
   - data न आए, टूटा हो, या यह पाठ उसमें न हो: पन्ना पहले जैसा।
   - पट्टी के ऊपर का हिस्सा (कोर्स-नाम, गिनती, छिपाएँ) हमेशा दिखे; नीचे-बाएँ के
     तैरते बटन (⬆, ↩ मेरा पैनल) पट्टी के दाएँ खिसकें, ताकि पाठ-नाम न ढकें।
   - पाठ का HTML नहीं बदलता। ES5 (पुराने browser के लिए)।
   ============================================================ */
(function () {
  "use strict";
  var MAP = { "/courses/hi/digital-mitra-basic/": "/assets/toc/SE026.json" };
  var MIN = "(min-width: 1024px)";
  var K_HIDE = "acsTocHide", K_PROG = "acs_learn_progress";
  var path = location.pathname, home = path.slice(0, path.lastIndexOf("/") + 1), src = MAP[home];
  if (!src || !/\.html$/.test(path) || /\/index\.html$/.test(path)) return;
  if (!window.matchMedia || document.getElementById("ctoc")) return;
  var main = document.getElementById("acs-content") || document.querySelector("main");
  if (!main || !main.parentNode) return;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } return null; }

  var mq = window.matchMedia(MIN), state = 0;     /* 0 नहीं, 1 उतर रहा, 2 बना, 3 छोड़ा */
  function want() {
    if (state !== 0 || !mq.matches) return;
    state = 1;
    var x;
    try { x = new XMLHttpRequest(); } catch (e) { state = 3; return; }
    x.open("GET", src, true);
    x.timeout = 8000;
    x.onload = function () {
      var o = null;
      if (x.status === 200) { try { o = JSON.parse(x.responseText); } catch (e) { o = null; } }
      var d = check(o);
      if (!d) { state = 3; return; }
      try { build(d); state = 2; } catch (e) { state = 3; }
    };
    x.onerror = x.ontimeout = function () { state = 3; };
    try { x.send(); } catch (e) { state = 3; }
  }
  if (mq.addEventListener) mq.addEventListener("change", want); else if (mq.addListener) mq.addListener(want);
  want();

  /* data की सख़्त जाँच: कुछ भी गड़बड़ = पट्टी नहीं */
  function check(o) {
    if (!o || typeof o !== "object" || !Array.isArray(o.chapters) || !o.chapters.length || o.chapters.length > 60) return null;
    var found = false, total = 0, out = [];
    for (var i = 0; i < o.chapters.length; i++) {
      var c = o.chapters[i];
      if (!c || typeof c.name !== "string" || !Array.isArray(c.lessons) || !c.lessons.length) return null;
      var ls = [];
      for (var j = 0; j < c.lessons.length; j++) {
        var l = c.lessons[j];
        if (!l || typeof l.n !== "string" || typeof l.t !== "string" || typeof l.u !== "string") return null;
        if (l.u.indexOf(home) !== 0 || !/^[\/a-z0-9.-]+\.html$/.test(l.u)) return null;
        if (l.u === path) found = true;
        ls.push({ n: l.n.slice(0, 8), t: l.t.slice(0, 140), u: l.u });
      }
      total += ls.length;
      out.push({ name: c.name.slice(0, 80), lessons: ls });
    }
    if (!found || total > 2000) return null;
    return { title: typeof o.title === "string" ? o.title.slice(0, 120) : "", intro: typeof o.intro === "string" && o.intro.indexOf(home) === 0 ? o.intro : home,
             chapters: out, total: total };
  }

  function readSet() {
    var r = {};
    try { var p = JSON.parse(store(K_PROG) || "{}"); if (p && p.read && typeof p.read === "object") r = p.read; } catch (e) { r = {}; }
    return r;
  }

  function build(d) {
    var read = readSet(), nRead = 0, cur = null, root = document.documentElement;
    var lay = el("div", "ctoc-lay");
    main.parentNode.insertBefore(lay, main);
    var aside = el("aside", "ctoc");
    aside.id = "ctoc";
    aside.setAttribute("aria-label", "इस कोर्स के सब पाठ");
    lay.appendChild(aside);
    lay.appendChild(main);

    var top = el("div", "ctoc-top");
    var crs = el("a", "ctoc-course", d.title || "कोर्स-परिचय");
    crs.href = d.intro;
    top.appendChild(crs);
    var row = el("div", "ctoc-row"), sum = el("div", "ctoc-sum");
    row.appendChild(sum);
    var hide = el("button", "ctoc-hide", "◀ छिपाएँ");
    hide.type = "button";
    hide.title = "पाठ-सूची की पट्टी छिपाएँ";
    hide.setAttribute("aria-label", "पाठ-सूची की पट्टी छिपाएँ");
    hide.setAttribute("aria-controls", "ctoc");
    row.appendChild(hide);
    top.appendChild(row);
    aside.appendChild(top);

    var nav = el("nav", "ctoc-nav");
    nav.setAttribute("aria-label", "खंड और पाठ");
    for (var i = 0; i < d.chapters.length; i++) (function (c, i) {
      var box = el("div", "ctoc-ch"), lid = "ctoc-l" + (i + 1), done = 0, here = false;
      var list = el("ol", "ctoc-list");
      list.id = lid;
      for (var j = 0; j < c.lessons.length; j++) {
        var l = c.lessons[j], li = el("li"), a = el("a", "ctoc-ls");
        a.href = l.u;
        a.appendChild(el("span", "ctoc-n", l.n));
        a.appendChild(el("span", "ctoc-t", l.t));
        if (read[l.u]) { a.appendChild(el("span", "ctoc-ok", "✓")); a.setAttribute("title", "पढ़ चुके"); done++; }
        if (l.u === path) { a.className += " ctoc-cur"; a.setAttribute("aria-current", "page"); cur = a; here = true; }
        li.appendChild(a);
        list.appendChild(li);
      }
      nRead += done;
      var btn = el("button", "ctoc-chbtn");
      btn.type = "button";
      btn.setAttribute("aria-controls", lid);
      var txt = el("span", "ctoc-chtxt");
      txt.appendChild(el("span", "ctoc-chname", c.name));
      txt.appendChild(el("span", "ctoc-chcount", c.lessons.length + " पाठ" + (done ? " · ✓ " + done + " पढ़े" : "")));
      btn.appendChild(txt);
      var chev = el("span", "ctoc-chev");
      chev.setAttribute("aria-hidden", "true");
      btn.appendChild(chev);
      function set(open) { btn.setAttribute("aria-expanded", open ? "true" : "false"); list.hidden = !open; chev.textContent = open ? "▾" : "▸"; }
      set(here);
      btn.onclick = function () { set(list.hidden); };
      box.className = "ctoc-ch" + (here ? " ctoc-here" : "");
      box.appendChild(btn);
      box.appendChild(list);
      nav.appendChild(box);
    })(d.chapters[i], i);
    aside.appendChild(nav);
    sum.textContent = d.chapters.length + " खंड · " + d.total + " पाठ · पढ़े: " + nRead;

    var show = el("button", "ctoc-show", "📚 पाठ-सूची ▶");
    show.type = "button";
    show.setAttribute("aria-controls", "ctoc");
    lay.appendChild(show);
    function off(v) {
      if (v) root.className += " ctoc-off"; else root.className = root.className.replace(/\s*\bctoc-off\b/g, "");
      store(K_HIDE, v ? "1" : "0");
    }
    hide.onclick = function () { off(true); show.focus(); };
    show.onclick = function () { off(false); hide.focus(); };
    if (store(K_HIDE) === "1") root.className += " ctoc-off";
    root.className += " ctoc-on";   /* नीचे-बाएँ के तैरते बटन पट्टी पर न चढ़ें (css) */

    /* पट्टी ऊपर की नीली पट्टी (header) के ठीक नीचे से */
    function fit() {
      var h = document.querySelector("header.acs-nav"), t = h ? h.offsetHeight : 0;
      lay.style.setProperty("--ctoc-top", (t > 0 && t < 240 ? t : 0) + "px");
    }
    fit();
    window.addEventListener("resize", fit);
    /* अभी का पाठ पट्टी के भीतर दिखे (पूरा पन्ना नहीं खिसके): हो सके तो उसके खंड का
       नाम ऊपर-हिस्से के ठीक नीचे; पाठ तब भी न दिखे तो पाठ को बीच में लाओ */
    if (cur) {
      var at = aside.getBoundingClientRect().top + top.offsetHeight, chb = cur.parentNode.parentNode.previousSibling;
      var want = (chb ? chb.getBoundingClientRect().top : cur.getBoundingClientRect().top) - at;
      if (cur.getBoundingClientRect().bottom - want > aside.getBoundingClientRect().bottom - 8)
        want = cur.getBoundingClientRect().top - at - (aside.clientHeight - top.offsetHeight) / 3;
      aside.scrollTop += want;
    }
  }
})();
