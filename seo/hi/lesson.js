/* ============================================
   ACS LEARN — Master Lesson JavaScript
   Version: 1.0 | acslearn.com
   Used by: All 250 lessons
   ============================================ */

// ── SCROLL PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;
  const total = document.body.scrollHeight - window.innerHeight;
  const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
  const min   = parseFloat(fill.dataset.min || 0.4);
  fill.style.width = Math.max(min, pct) + '%';
});

// ── COPY PROMPT ──
function copyPrompt() {
  const el  = document.getElementById('promptText');
  const btn = document.querySelector('.copy-btn');
  if (!el || !btn) return;
  navigator.clipboard.writeText(el.innerText).then(() => {
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });
}

// ── QUIZ ──
function checkAnswer(el, isCorrect, qId, msg) {
  const container = el.closest('.quiz-wrap');
  if (!container) return;
  const opts     = container.querySelectorAll('.quiz-opt');
  const feedback = document.getElementById(qId + '-fb');

  // Lock all options
  opts.forEach(o => o.classList.add('locked'));

  if (isCorrect) {
    el.classList.add('correct');
    el.querySelector('.opt-letter').style.cssText = 'background:#34D399;color:white';
    if (feedback) {
      feedback.className = 'quiz-feedback correct-fb show';
      feedback.innerHTML = '✅ बिल्कुल सही! ' + (msg || '');
    }
  } else {
    el.classList.add('wrong');
    // Highlight correct option
    opts.forEach(o => {
      if (o.dataset.correct === 'true') {
        o.classList.add('correct');
        o.querySelector('.opt-letter').style.cssText = 'background:#34D399;color:white';
      }
    });
    if (feedback) {
      feedback.className = 'quiz-feedback wrong-fb show';
      feedback.innerHTML = '❌ गलत। ' + (msg || 'सही जवाब देखें ऊपर।');
    }
  }
}

// ── TASK CHECKBOX ──
function toggleTask(el) {
  el.classList.toggle('done');
  el.textContent = el.classList.contains('done') ? '✓' : '';
  // Save progress to localStorage
  saveProgress();
}

// ── SAVE PROGRESS ──
function saveProgress() {
  const lessonId = document.body.dataset.lesson;
  if (!lessonId) return;
  const checks = document.querySelectorAll('.task-check');
  const done   = Array.from(checks).map(c => c.classList.contains('done'));
  localStorage.setItem('acs_' + lessonId, JSON.stringify(done));
}

// ── RESTORE PROGRESS ──
function restoreProgress() {
  const lessonId = document.body.dataset.lesson;
  if (!lessonId) return;
  const saved = localStorage.getItem('acs_' + lessonId);
  if (!saved) return;
  const done = JSON.parse(saved);
  const checks = document.querySelectorAll('.task-check');
  checks.forEach((c, i) => {
    if (done[i]) {
      c.classList.add('done');
      c.textContent = '✓';
    }
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', restoreProgress);
