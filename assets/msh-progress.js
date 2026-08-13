/* ============================================================
   ACS msh-progress.js v1.0 · 13-Aug-2026 — मशरूम-कोर्स प्रगति-रंग
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
  if (location.pathname.indexOf("/courses/") < 0) return;
  function J(k){ try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } }
  function S(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var css = ".msh-chk{display:block;margin:8px 0;font-size:18px;line-height:1.7;cursor:pointer}" +
    ".msh-chk input{width:22px;height:22px;margin-right:8px;vertical-align:middle;accent-color:#2E7D32}" +
    ".msh-chkbox{background:#F5F7FA;border:1px solid #1565C0;border-radius:12px;padding:12px 14px}" +
    ".msh-done-note{margin-top:10px;font-size:18px;font-weight:700;color:#2E7D32}" +
    ".msh-tblwrap{overflow-x:auto}.msh-tbl{border-collapse:collapse;min-width:60%;font-size:17px}" +
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
  }
})();
