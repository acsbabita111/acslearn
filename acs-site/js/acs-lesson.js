/* =========================================================
   Applied Computer School — Reusable Lesson JavaScript
   Version: ACS Lesson Kit v1.0
   No external dependency.
   ========================================================= */

(function(){
  "use strict";

  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function updateProgress(){
    const bar = qs("#progressBar, .top-progress");
    if(!bar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  function copyText(text, btn){
    if(!text) return;
    const original = btn ? btn.textContent : "";
    const done = () => {
      if(btn){
        btn.textContent = "Copied!";
        setTimeout(() => btn.textContent = original || "Copy", 1200);
      }
    };

    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    }else{
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done){
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand("copy"); }catch(e){}
    document.body.removeChild(ta);
    if(typeof done === "function") done();
  }

  function setupCopyButtons(){
    qsa(".js-copy, .copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-copy-target");
        let text = "";
        if(targetId && qs(`#${CSS.escape(targetId)}`)){
          text = qs(`#${CSS.escape(targetId)}`).innerText;
        }else{
          const prompt = btn.closest(".prompt");
          if(prompt){
            text = prompt.innerText.replace(btn.innerText, "").trim();
          }
        }
        copyText(text.trim(), btn);
      });
    });
  }

  function setupQuiz(){
    qsa("[data-quiz]").forEach(quiz => {
      const submit = qs("[data-quiz-submit]", quiz) || qs(".quiz-submit", quiz);
      const result = qs("[data-quiz-result]", quiz) || qs(".quiz-result", quiz);

      if(!submit || !result) return;

      submit.addEventListener("click", () => {
        const questions = qsa(".quiz-card, .q", quiz).filter(q => q.hasAttribute("data-answer"));
        let score = 0;
        let attempted = 0;

        questions.forEach((q, index) => {
          const answer = String(q.getAttribute("data-answer")).trim();
          const checked = qs('input[type="radio"]:checked', q);

          q.classList.remove("is-correct","is-wrong");

          if(checked){
            attempted++;
            if(String(checked.value).trim() === answer){
              score++;
              q.classList.add("is-correct");
            }else{
              q.classList.add("is-wrong");
            }
          }
        });

        result.textContent = `आपका score: ${score} / ${questions.length} | Attempted: ${attempted}`;
      });
    });
  }

  function setupActiveToc(){
    const links = qsa(".toc a[href^='#']");
    if(!links.length) return;

    const sections = links
      .map(link => {
        const id = link.getAttribute("href");
        return { link, section: qs(id) };
      })
      .filter(item => item.section);

    function update(){
      let active = null;
      const y = window.scrollY + 130;
      sections.forEach(item => {
        if(item.section.offsetTop <= y) active = item;
      });
      links.forEach(link => link.classList.remove("is-active"));
      if(active) active.link.classList.add("is-active");
    }

    window.addEventListener("scroll", update, {passive:true});
    update();
  }

  function setCurrentYear(){
    qsa("[data-current-year]").forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  function init(){
    updateProgress();
    setupCopyButtons();
    setupQuiz();
    setupActiveToc();
    setCurrentYear();
    window.addEventListener("scroll", updateProgress, {passive:true});
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
