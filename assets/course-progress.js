/* ============================================================
   ACS course-progress.js v1.0 · 16-Aug-2026 — कोर्स प्रगति-रंग + अभ्यास-प्रश्न (config-चालित)
   ------------------------------------------------------------
   msh-progress.js v1.2 (मशरूम) का सामान्य रूप — व्यवहार byte-समान, सिर्फ़ config बाहर:
   पेज पर  <script>window.ACS_CP={code,parts:[[from,to],…],quizSrc,quizVar}</script>
   मशरूम-कोर्स अभी अपनी msh-progress.js पर ही (अछूता); अगले regen में इसी पर migrate — दर्ज होल।
   Founder-नियम (13-Aug-2026): पढ़ा+जाँच पूरी = हरा · बाक़ी = काला · छूटा = लाल
   device-local नियम (v3.2): सब localStorage — शून्य-server, DPDP-सुरक्षित, offline। ES5।
   चाबियाँ: acs_learn_progress (पढ़ी जाती) · acs_course_chk · acs_course_done
   ============================================================ */
(function () {
  "use strict";
  if (location.pathname.indexOf("/courses/") < 0) return;
  function J(k){ try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function S(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var css = ".msh-chk{display:block;margin:8px 0;font-size:18px;line-height:1.7;cursor:pointer}" +
    ".msh-chk input{width:22px;height:22px;margin-right:8px;vertical-align:middle;accent-color:#2E7D32}" +
    ".msh-chkbox{background:#F5F7FA;border:1px solid #1565C0;border-radius:12px;padding:12px 14px}" +
    ".msh-done-note{margin-top:10px;font-size:18px;font-weight:700;color:#2E7D32}" +
    ".msh-tblwrap{overflow-x:auto}.msh-tbl{border-collapse:collapse;min-width:60%;font-size:17px;margin:0 auto}" +
    ".ci-drop{border:1px solid #1565C0;border-radius:14px;margin:14px 0;background:#FFFFFF;overflow:hidden}" +
    ".ci-drop>summary{cursor:pointer;list-style:none;padding:16px 18px;font-size:21px;font-weight:700;" +
    "color:#F5F7FA;background:#0B1F3A;display:flex;justify-content:space-between;align-items:center;gap:10px}" +
    ".ci-drop>summary::-webkit-details-marker{display:none}" +
    ".ci-drop>summary .ci-arrow{color:#F9A825;font-size:18px;transition:transform .2s}" +
    ".ci-drop[open]>summary .ci-arrow{transform:rotate(180deg)}" +
    ".ci-drop .ci-list{padding:10px 16px}" +
    ".msh-quiz{border:2px solid #1565C0;border-radius:14px;padding:16px;margin:22px 0;background:#FFFFFF}" +
    ".msh-quiz h2{color:#0B1F3A;font-size:22px;margin:0 0 6px}" +
    ".msh-qq{font-size:19px;font-weight:700;color:#0B1F3A;margin:16px 0 8px}" +
    ".msh-qo{display:block;width:100%;text-align:left;font-size:18px;padding:10px 12px;margin:6px 0;" +
    "border:1px solid #1565C0;border-radius:10px;background:#F5F7FA;color:#0B1F3A;cursor:pointer}" +
    ".msh-qo[disabled]{cursor:default;opacity:.92}" +
    ".msh-qo.ok{background:#2E7D32;color:#FFFFFF;border-color:#2E7D32}" +
    ".msh-qo.no{background:#FFF8E1;border-color:#F9A825;text-decoration:line-through}" +
    ".msh-qscore{font-size:19px;font-weight:700;color:#2E7D32;margin-top:12px}" +
    ".msh-tbl th,.msh-tbl td{border:1px solid #1565C0;padding:8px 10px;text-align:left}" +
    ".msh-tbl th{background:#0B1F3A;color:#F5F7FA}" +
    "a.msh-lsn{color:inherit}" +
    "a.msh-lsn.msh-g{color:#2E7D32;font-weight:700}" +
    "a.msh-lsn.msh-r{color:#C62828;font-weight:700}" +
    ".msh-legend .lg{white-space:nowrap}.msh-legend .lg-done{color:#2E7D32;font-weight:700}" +
    ".msh-legend .lg-miss{color:#C62828;font-weight:700}";
  var st = document.createElement("style"); st.textContent = css;
  document.head.appendChild(st);

  var path = location.pathname;

  var CP = window.ACS_CP;
  if (!CP || !CP.parts){ if (window.console) console.warn("course-progress: window.ACS_CP config नहीं"); return; }
  /* खंड-सीमाएँ (पाठ → quiz-shard) — पेज के config से (कोर्स-data फ़ाइल से मेल) */
  var MSH_PARTS = CP.parts;
  function khandOf(n){
    for (var i = 0; i < MSH_PARTS.length; i++) {
      if (n >= MSH_PARTS[i][0] && n <= MSH_PARTS[i][1]) return i + 1;
    }
    return 0;
  }
  /* 🧪 अभ्यास-प्रश्न: shard मिले तभी दिखें — मरा डिब्बा कभी नहीं (ईमानदार-पैनल) */
  function renderQuiz(art, num){
    var k = khandOf(num);
    if (!k) return;
    var kk = (k < 10 ? "0" : "") + k;
    var sc = document.createElement("script");
    sc.src = CP.quizSrc + kk + ".js";
    sc.onerror = function(){};
    sc.onload = function(){
      var bank = window[CP.quizVar + kk];
      var list = bank && bank[String(num)];
      if (!list || !list.length) return;
      var nav = document.querySelector(".lsn-nav");
      var box = document.createElement("section");
      box.className = "msh-quiz";
      var html = "<h2>🧪 अभ्यास-प्रश्न (" + list.length + ")</h2>" +
        '<p style="font-size:17px;margin:0">हर प्रश्न में एक सही उत्तर चुनिए — जाँच तुरंत दिखेगी। यह अभ्यास है, परीक्षा नहीं।</p>';
      var i, j;
      for (i = 0; i < list.length; i++) {
        html += '<p class="msh-qq">' + (i + 1) + ". " + list[i].q + "</p>";
        for (j = 0; j < list[i].o.length; j++) {
          html += '<button type="button" class="msh-qo" data-q="' + i + '" data-o="' + j + '">' +
            "(" + "कखगघ".charAt(j) + ") " + list[i].o[j] + "</button>";
        }
      }
      html += '<p class="msh-qscore" id="mshQScore"></p>';
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
        var btns = box.querySelectorAll('.msh-qo[data-q="' + qi + '"]');
        for (var x = 0; x < btns.length; x++) {
          btns[x].setAttribute("disabled", "");
          var xo = parseInt(btns[x].getAttribute("data-o"), 10);
          if (xo === correct) btns[x].className = "msh-qo ok";
          else if (xo === oi) btns[x].className = "msh-qo no";
        }
        var total = 0; for (var y in doneQ) if (doneQ.hasOwnProperty(y)) total++;
        if (total === list.length) {
          var sc2 = document.getElementById("mshQScore");
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
  var qs = document.querySelectorAll("input.msh-q");
  if (qs.length) {
    var chk = J("acs_course_chk"), done = J("acs_course_done");
    var mine = chk[path] || {};
    function refresh() {
      var all = true, i;
      for (i = 0; i < qs.length; i++) if (!qs[i].checked) { all = false; break; }
      if (all && !done[path]) {
        done[path] = Date.now(); S("acs_course_done", done);
        var box = document.querySelector(".msh-chkbox");
        if (box && !document.getElementById("mshDoneNote")) {
          var p = document.createElement("p");
          p.id = "mshDoneNote"; p.className = "msh-done-note";
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
  if (document.querySelector("[data-msh-index]")) {
    var read = (J("acs_learn_progress").read) || {};
    var doneMap = J("acs_course_done");
    var links = document.querySelectorAll("a.msh-lsn[data-num]");
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
      if (info[i].done) info[i].a.className += " msh-g";
      else if (info[i].n < maxTouched) info[i].a.className += " msh-r";
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
