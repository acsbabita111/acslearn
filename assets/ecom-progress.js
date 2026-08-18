/* ============================================================
   ACS ecom-progress.js v1.0 · 18-Aug-2026 — ई-कॉमर्स मास्टरी प्रगति-रंग + अभ्यास-प्रश्न (ecm-progress v1.2 का ecom-रूप)
   ------------------------------------------------------------
   Founder-नियम (13-Aug-2026):
   • पढ़ा + योग्यता-जाँच पूरी  → सूची में पाठ-title हरा
   • अभी बाक़ी               → काला (सामान्य)
   • आगे बढ़ गए पर यह अधूरा   → लाल
   ------------------------------------------------------------
   device-local नियम (v3.2): सब कुछ localStorage में — शून्य-server,
   DPDP-सुरक्षित, offline। ES5। CSS JS से inject (गूँगा-fallback निषेध)।
   चाबियाँ: acs_learn_progress (course-lesson.js की, सिर्फ़ पढ़ी जाती)
           acs_course_chk  {path:{i:1}}  — टिक-अवस्था
           acs_course_done {path:ts}     — सब टिक = पाठ पूरा
   ============================================================ */
(function () {
  "use strict";
  if (location.pathname.indexOf("/courses/hi/digital/ecom/") < 0) return;
  function J(k){ try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function S(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var css = ".ecm-chk{display:block;margin:8px 0;font-size:18px;line-height:1.7;cursor:pointer}" +
    ".ecm-chk input{width:22px;height:22px;margin-right:8px;vertical-align:middle;accent-color:#2E7D32}" +
    ".ecm-chkbox{background:#F5F7FA;border:1px solid #1565C0;border-radius:12px;padding:12px 14px}" +
    ".ecm-done-note{margin-top:10px;font-size:18px;font-weight:700;color:#2E7D32}" +
    ".ecm-tblwrap{overflow-x:auto}.ecm-tbl{border-collapse:collapse;min-width:60%;font-size:17px;margin:0 auto}" +
    ".ci-drop{border:1px solid #1565C0;border-radius:14px;margin:14px 0;background:#FFFFFF;overflow:hidden}" +
    ".ci-drop>summary{cursor:pointer;list-style:none;padding:16px 18px;font-size:21px;font-weight:700;" +
    "color:#F5F7FA;background:#0B1F3A;display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    ".ci-drop>summary::-webkit-details-marker{display:none}" +
    ".ci-drop>summary .ci-arrow{color:#F9A825;font-size:18px;transition:transform .2s}" +
    ".ci-drop[open]>summary .ci-arrow{transform:rotate(180deg)}" +
    ".ci-drop .ci-list{padding:10px 16px}" +
    ".ecm-quiz{border:2px solid #1565C0;border-radius:14px;padding:16px;margin:22px 0;background:#FFFFFF}" +
    ".ecm-quiz h2{color:#0B1F3A;font-size:22px;margin:0 0 6px}" +
    ".ecm-qq{font-size:19px;font-weight:700;color:#0B1F3A;margin:16px 0 8px}" +
    ".ecm-qo{display:block;width:100%;text-align:left;font-size:18px;padding:10px 12px;margin:6px 0;" +
    "border:1px solid #1565C0;border-radius:10px;background:#F5F7FA;color:#0B1F3A;cursor:pointer}" +
    ".ecm-qo[disabled]{cursor:default;opacity:.92}" +
    ".ecm-qo.ok{background:#2E7D32;color:#FFFFFF;border-color:#2E7D32}" +
    ".ecm-qo.no{background:#FFF8E1;border-color:#F9A825;text-decoration:line-through}" +
    ".ecm-qscore{font-size:19px;font-weight:700;color:#2E7D32;margin-top:12px}" +
    ".ecm-tbl th,.ecm-tbl td{border:1px solid #1565C0;padding:8px 10px;text-align:left}" +
    ".ecm-tbl th{background:#0B1F3A;color:#F5F7FA}" +
    "a.ecm-lsn{color:inherit}" +
    "a.ecm-lsn.ecm-g{color:#2E7D32;font-weight:700}" +
    "a.ecm-lsn.ecm-r{color:#C62828;font-weight:700}" +
    ".ecm-legend .lg{white-space:nowrap}.ecm-legend .lg-done{color:#2E7D32;font-weight:700}" +
    ".ecm-legend .lg-miss{color:#C62828;font-weight:700}";
  var st = document.createElement("style"); st.textContent = css;
  document.head.appendChild(st);

  var path = location.pathname;

  /* खंड-सीमाएँ (पाठ → quiz-shard) — ecom_course_data से मेल */
  var ECOM_PARTS = [[1, 12], [13, 30], [31, 47], [48, 60], [61, 73], [74, 85], [86, 103], [104, 117], [118, 144], [145, 162], [163, 177], [178, 191], [192, 207], [208, 219], [220, 229], [230, 242], [243, 254], [255, 266], [267, 279], [280, 292], [293, 305], [306, 321], [322, 325], [326, 326]]; /* ecom_course_data.js की खंड-सीमाओं से मेल — 24 खंड */
  function khandOf(n){
    for (var i = 0; i < ECOM_PARTS.length; i++) {
      if (n >= ECOM_PARTS[i][0] && n <= ECOM_PARTS[i][1]) return i + 1;
    }
    return 0;
  }
  /* 🧪 अभ्यास-प्रश्न: shard मिले तभी दिखें — मरा डिब्बा कभी नहीं (ईमानदार-पैनल) */
  function renderQuiz(art, num){
    var k = khandOf(num);
    if (!k) return;
    var kk = (k < 10 ? "0" : "") + k;
    var sc = document.createElement("script");
    sc.src = "/assets/ecom_quiz/ecom_quiz_k" + kk + ".js";
    sc.onerror = function(){};
    sc.onload = function(){
      var bank = window["ECOM_QUIZ_K" + kk];
      var list = bank && bank[String(num)];
      if (!list || !list.length) return;
      var nav = document.querySelector(".lsn-nav");
      var box = document.createElement("section");
      box.className = "ecm-quiz";
      var html = "<h2>🧪 अभ्यास-प्रश्न (" + list.length + ")</h2>" +
        '<p style="font-size:17px;margin:0">हर प्रश्न में एक सही उत्तर चुनिए — जाँच तुरंत दिखेगी। यह अभ्यास है, परीक्षा नहीं।</p>';
      var i, j;
      for (i = 0; i < list.length; i++) {
        html += '<p class="ecm-qq">' + (i + 1) + ". " + list[i].q + "</p>";
        for (j = 0; j < list[i].o.length; j++) {
          html += '<button type="button" class="ecm-qo" data-q="' + i + '" data-o="' + j + '">' +
            "(" + "कखगघ".charAt(j) + ") " + list[i].o[j] + "</button>";
        }
      }
      html += '<p class="ecm-qscore" id="ecmQScore"></p>';
      box.innerHTML = html;
      if (nav && nav.parentNode) nav.parentNode.insertBefore(box, nav);
      else art.appendChild(box);
      var doneQ = {}, right = 0;
      box.addEventListener("click", function (ev) {
        var b = ev.target;
        if (!b || !b.getAttribute || b.getAttribute("data-q") === null) return;
        var qi = parseInt(b.getAttribute("data-q"), 10);
        var oi = parseInt(b.getAttribute("data-o"), 10);
        if (doneQ[qi]) return;
        doneQ[qi] = true;
        var correct = list[qi].a;
        if (oi === correct) right++;
        var btns = box.querySelectorAll('.ecm-qo[data-q="' + qi + '"]');
        for (var x = 0; x < btns.length; x++) {
          btns[x].setAttribute("disabled", "");
          var xo = parseInt(btns[x].getAttribute("data-o"), 10);
          if (xo === correct) btns[x].className = "ecm-qo ok";
          else if (xo === oi) btns[x].className = "ecm-qo no";
        }
        var total = 0; for (var y in doneQ) if (doneQ.hasOwnProperty(y)) total++;
        if (total === list.length) {
          var sc2 = document.getElementById("ecmQScore");
          if (sc2) sc2.textContent = "आपका अभ्यास-फल: " + right + " / " + list.length +
            (right === list.length ? " — शाबाश! 🎉" : " — ग़लत वाले हिस्से दोबारा पढ़कर समझ लीजिए।");
        }
      });
    };
    document.head.appendChild(sc);
  }
  var lsnArt = document.querySelector("[data-lsn-num]");
  if (lsnArt) renderQuiz(lsnArt, parseInt(lsnArt.getAttribute("data-lsn-num"), 10));

  /* ---------- (क) पाठ-पेज: checkbox सहेजना ---------- */
  var qs = document.querySelectorAll("input.ecm-q");
  if (qs.length) {
    var chk = J("acs_course_chk"), done = J("acs_course_done");
    var mine = chk[path] || {};
    function refresh() {
      var all = true, i;
      for (i = 0; i < qs.length; i++) if (!qs[i].checked) { all = false; break; }
      if (all && !done[path]) {
        done[path] = Date.now(); S("acs_course_done", done);
        var box = document.querySelector(".ecm-chkbox");
        if (box && !document.getElementById("ecmDoneNote")) {
          var p = document.createElement("p");
          p.id = "ecmDoneNote"; p.className = "ecm-done-note";
          p.textContent = "✅ शाबाश — यह पाठ पूरा हुआ। सूची में अब यह हरा दिखेगा।";
          box.appendChild(p);
        }
      }
      if (!all && done[path]) { delete done[path]; S("acs_course_done", done); }
    }
    for (var i = 0; i < qs.length; i++) {
      (function (inp, idx) {
        if (mine[idx]) inp.checked = true;
        inp.addEventListener("change", function () {
          if (inp.checked) mine[idx] = 1; else delete mine[idx];
          chk[path] = mine; S("acs_course_chk", chk);
          refresh();
        });
      })(qs[i], i);
    }
    refresh();
  }

  /* ---------- (ख) कोर्स-index: हरा / काला / लाल ---------- */
  if (document.querySelector("[data-ecm-index]")) {
    var read = (J("acs_learn_progress").read) || {};
    var doneMap = J("acs_course_done");
    var links = document.querySelectorAll("a.ecm-lsn[data-num]");
    var maxTouched = 0, n, href, full;
    var info = [];
    for (i = 0; i < links.length; i++) {
      n = parseInt(links[i].getAttribute("data-num"), 10);
      href = links[i].getAttribute("href");
      full = path.replace(/[^/]*$/, "") + href;
      var isDone = !!doneMap[full] && !!read[full];
      var isTouched = !!read[full] || !!doneMap[full];
      info.push({ a: links[i], n: n, done: isDone });
      if (isTouched && n > maxTouched) maxTouched = n;
    }
    for (i = 0; i < info.length; i++) {
      if (info[i].done) info[i].a.className += " ecm-g";
      else if (info[i].n < maxTouched) info[i].a.className += " ecm-r";
      /* बाक़ी काले ही रहें */
    }
    /* चालू-खंड का dropdown अपने-आप खुले (नया पढ़ने वाला = खंड-1) */
    var drops = document.querySelectorAll("details.ci-drop[data-from]");
    var target = maxTouched > 0 ? maxTouched : 1;
    for (i = 0; i < drops.length; i++) {
      var a1 = parseInt(drops[i].getAttribute("data-from"), 10);
      var b1 = parseInt(drops[i].getAttribute("data-to"), 10);
      if (target >= a1 && target <= b1) { drops[i].setAttribute("open", ""); break; }
    }
  }
})();
