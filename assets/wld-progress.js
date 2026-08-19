/* ============================================================
   ACS wld-progress.js v1.0 · 19-Aug-2026 — वेल्डिंग व्यवसाय प्रगति-रंग + अभ्यास-प्रश्न (ecom-progress v1.0 का welding-रूप; checkbox नहीं — "पढ़ा" = पूरा)
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
  if (location.pathname.indexOf("/courses/hi/welding/") < 0) return;
  function J(k){ try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function S(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var css = ".wld-chk{display:block;margin:8px 0;font-size:18px;line-height:1.7;cursor:pointer}" +
    ".wld-chk input{width:22px;height:22px;margin-right:8px;vertical-align:middle;accent-color:#2E7D32}" +
    ".wld-chkbox{background:#F5F7FA;border:1px solid #1565C0;border-radius:12px;padding:12px 14px}" +
    ".wld-done-note{margin-top:10px;font-size:18px;font-weight:700;color:#2E7D32}" +
    ".wld-tblwrap{overflow-x:auto}.wld-tbl{border-collapse:collapse;min-width:60%;font-size:17px;margin:0 auto}" +
    ".ci-drop{border:1px solid #1565C0;border-radius:14px;margin:14px 0;background:#FFFFFF;overflow:hidden}" +
    ".ci-drop>summary{cursor:pointer;list-style:none;padding:16px 18px;font-size:21px;font-weight:700;" +
    "color:#F5F7FA;background:#0B1F3A;display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    ".ci-drop>summary::-webkit-details-marker{display:none}" +
    ".ci-drop>summary .ci-arrow{color:#F9A825;font-size:18px;transition:transform .2s}" +
    ".ci-drop[open]>summary .ci-arrow{transform:rotate(180deg)}" +
    ".ci-drop .ci-list{padding:10px 16px}" +
    ".wld-quiz{border:2px solid #1565C0;border-radius:14px;padding:16px;margin:22px 0;background:#FFFFFF}" +
    ".wld-quiz h2{color:#0B1F3A;font-size:22px;margin:0 0 6px}" +
    ".wld-qq{font-size:19px;font-weight:700;color:#0B1F3A;margin:16px 0 8px}" +
    ".wld-qo{display:block;width:100%;text-align:left;font-size:18px;padding:10px 12px;margin:6px 0;" +
    "border:1px solid #1565C0;border-radius:10px;background:#F5F7FA;color:#0B1F3A;cursor:pointer}" +
    ".wld-qo[disabled]{cursor:default;opacity:.92}" +
    ".wld-qo.ok{background:#2E7D32;color:#FFFFFF;border-color:#2E7D32}" +
    ".wld-qo.no{background:#FFF8E1;border-color:#F9A825;text-decoration:line-through}" +
    ".wld-qscore{font-size:19px;font-weight:700;color:#2E7D32;margin-top:12px}" +
    ".wld-tbl th,.wld-tbl td{border:1px solid #1565C0;padding:8px 10px;text-align:left}" +
    ".wld-tbl th{background:#0B1F3A;color:#F5F7FA}" +
    "a.crs-lsn{color:inherit}" +
    "a.crs-lsn.wld-g{color:#2E7D32;font-weight:700}" +
    "a.crs-lsn.wld-r{color:#C62828;font-weight:700}" +
    ".wld-legend .lg{white-space:nowrap}.wld-legend .lg-done{color:#2E7D32;font-weight:700}" +
    ".wld-legend .lg-miss{color:#C62828;font-weight:700}";
  var st = document.createElement("style"); st.textContent = css;
  document.head.appendChild(st);

  var path = location.pathname;

  /* हिस्सा-सीमाएँ (पाठ → quiz-shard) — welding_lessons_data से मेल */
  var WLD_PARTS = [[1,20],[21,50],[51,80],[81,140],[141,180],[181,220],[221,260],[261,300]]; /* welding_lessons_data.js की हिस्सा-सीमाएँ — 300-पाठ योजना; अभी 1-100 */
  function khandOf(n){
    for (var i = 0; i < WLD_PARTS.length; i++) {
      if (n >= WLD_PARTS[i][0] && n <= WLD_PARTS[i][1]) return i + 1;
    }
    return 0;
  }
  /* 🧪 अभ्यास-प्रश्न: shard मिले तभी दिखें — मरा डिब्बा कभी नहीं (ईमानदार-पैनल) */
  function renderQuiz(art, num){
    var k = khandOf(num);
    if (!k) return;
    var kk = (k < 10 ? "0" : "") + k;
    var sc = document.createElement("script");
    sc.src = "/assets/wld_quiz/wld_quiz_k" + kk + ".js";
    sc.onerror = function(){};
    sc.onload = function(){
      var bank = window["WLD_QUIZ_K" + kk];
      var list = bank && bank[String(num)];
      if (!list || !list.length) return;
      var nav = document.querySelector(".lsn-nav");
      var box = document.createElement("section");
      box.className = "wld-quiz";
      var html = "<h2>🧪 अभ्यास-प्रश्न (" + list.length + ")</h2>" +
        '<p style="font-size:17px;margin:0">हर प्रश्न में एक सही उत्तर चुनिए — जाँच तुरंत दिखेगी। यह अभ्यास है, परीक्षा नहीं।</p>';
      var i, j;
      for (i = 0; i < list.length; i++) {
        html += '<p class="wld-qq">' + (i + 1) + ". " + list[i].q + "</p>";
        for (j = 0; j < list[i].o.length; j++) {
          html += '<button type="button" class="wld-qo" data-q="' + i + '" data-o="' + j + '">' +
            "(" + "कखगघ".charAt(j) + ") " + list[i].o[j] + "</button>";
        }
      }
      html += '<p class="wld-qscore" id="wldQScore"></p>';
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
        var btns = box.querySelectorAll('.wld-qo[data-q="' + qi + '"]');
        for (var x = 0; x < btns.length; x++) {
          btns[x].setAttribute("disabled", "");
          var xo = parseInt(btns[x].getAttribute("data-o"), 10);
          if (xo === correct) btns[x].className = "wld-qo ok";
          else if (xo === oi) btns[x].className = "wld-qo no";
        }
        var total = 0; for (var y in doneQ) if (doneQ.hasOwnProperty(y)) total++;
        if (total === list.length) {
          var sc2 = document.getElementById("wldQScore");
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
  var qs = document.querySelectorAll("input.wld-q");
  if (qs.length) {
    var chk = J("acs_course_chk"), done = J("acs_course_done");
    var mine = chk[path] || {};
    function refresh() {
      var all = true, i;
      for (i = 0; i < qs.length; i++) if (!qs[i].checked) { all = false; break; }
      if (all && !done[path]) {
        done[path] = Date.now(); S("acs_course_done", done);
        var box = document.querySelector(".wld-chkbox");
        if (box && !document.getElementById("wldDoneNote")) {
          var p = document.createElement("p");
          p.id = "wldDoneNote"; p.className = "wld-done-note";
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
  if (document.querySelector('[data-course-index="welding"]')) {
    var read = (J("acs_learn_progress").read) || {};
    var doneMap = J("acs_course_done");
    var links = document.querySelectorAll("a.crs-lsn[data-num]");
    var maxTouched = 0, n, href, full;
    var info = [];
    for (i = 0; i < links.length; i++) {
      n = parseInt(links[i].getAttribute("data-num"), 10);
      href = links[i].getAttribute("href");
      full = path.replace(/[^/]*$/, "") + href;
      var isDone = !!read[full] && (!!doneMap[full] || true);   /* welding: checkbox नहीं — पढ़ा = पूरा */
      var isTouched = !!read[full] || !!doneMap[full];
      info.push({ a: links[i], n: n, done: isDone });
      if (isTouched && n > maxTouched) maxTouched = n;
    }
    for (i = 0; i < info.length; i++) {
      if (info[i].done) info[i].a.className += " wld-g";
      else if (info[i].n < maxTouched) info[i].a.className += " wld-r";
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
