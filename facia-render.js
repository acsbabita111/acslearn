
(function(){
const data = window.ACS_FACIA_DATA || {lessons:[], facias:[], courseId:"acs-2036-job-ready-digital-career-path"};
const params = new URLSearchParams(location.search);
const lessonParam = params.get('lesson');
const app = document.getElementById('app');
const COURSE_ID = data.courseId || "acs-2036-job-ready-digital-career-path";

function esc(s){
  return String(s ?? '').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}
function keyDone(id){ return "acs_lesson_completed_" + id; }
function keyOpen(id){ return "acs_lesson_opened_" + id; }
function isDone(id){ return localStorage.getItem(keyDone(id)) === "true"; }
function isOpen(id){ return localStorage.getItem(keyOpen(id)) === "true"; }
function markOpen(id){ localStorage.setItem(keyOpen(id), "true"); }
function completedCount(list){ return (list || data.lessons).filter(l => isDone(l.id)).length; }
function openedCount(list){ return (list || data.lessons).filter(l => isOpen(l.id) || isDone(l.id)).length; }
function pct(done,total){ return total ? Math.round(done * 100 / total) : 0; }

function lessonUrl(l){
  return l.path || ("course.html?c=" + encodeURIComponent(COURSE_ID) + "&lang=hi&lesson=" + encodeURIComponent(l.id));
}

function groupLessons(){
  const groups = [];
  const map = new Map();
  data.lessons.forEach(l => {
    const gid = l.faciaId || l.levelLayer || "course";
    if(!map.has(gid)){
      map.set(gid, { id: gid, title: l.faciaTitle || l.levelLayer || "Course Lessons", lessons: [] });
      groups.push(map.get(gid));
    }
    map.get(gid).lessons.push(l);
  });
  return groups;
}

function progressCard(){
  const total = data.lessons.length;
  const done = completedCount();
  const opened = openedCount();
  const percent = pct(done,total);
  const openedPercent = pct(opened,total);
  return `
  <aside class="course-progress-card" aria-label="Progress Digital Meter">
    <div class="meter-label">प्रोग्रेस डिजिटल मीटर</div>
    <div class="meter-ring" style="--p:${percent}">
      <div class="meter-inner">
        <strong>${percent}%</strong>
        <span>${done}/${total}</span>
      </div>
    </div>
    <div class="meter-bars">
      <div>
        <span>पढ़े/खोले गए लेसन</span>
        <b>${opened}/${total}</b>
        <i><em style="width:${openedPercent}%"></em></i>
      </div>
      <div>
        <span>Mark Complete</span>
        <b>${done}/${total}</b>
        <i><em style="width:${percent}%"></em></i>
      </div>
    </div>
    <p>यह मीटर आपके इसी browser/device में Mark Complete और lesson open history से चलता है।</p>
  </aside>`;
}

function hero(){
  return `
  <section class="hero-card course-hero-grid">
    <div class="course-hero-copy">
      <div class="eyebrow">2036 फ्यूचर रेडी रोजगार डिजिटल करियर पाथ</div>
      <h1>एसीएस-एआई डिजिटल मास्टर™</h1>
      <p>मोबाइल, एआई, इंटरनेट, सोशल मीडिया, ऑनलाइन काम, डिजिटल सुरक्षा और 2036 फ्यूचर रेडी रोजगार की तैयारी के लिए यह मुख्य डिजिटल कोर्स बनाया गया है।</p>
      <div class="fee-grid compact-fees">
        <div class="fee-card free"><strong>ऑनलाइन</strong><span>फ्री</span></div>
        <div class="fee-card support"><strong>WhatsApp सपोर्ट</strong><span>पेड</span></div>
        <div class="fee-card paid"><strong>ऑफलाइन बैच</strong><span>पेड</span></div>
      </div>
      <div class="hero-actions">
        <a class="start-btn green" href="${esc(lessonUrl(data.lessons[0]))}" data-lesson-open="${esc(data.lessons[0]?.id || 'L001')}">🎓 पहला लेसन शुरू करें</a>
        <a class="start-btn dark" href="course-rules.html">📋 कोर्स नियम</a>
        <a class="start-btn gold" href="https://wa.me/919431210092?text=${encodeURIComponent('मैं ACS-AI Digital Master के ऑफलाइन बैच के बारे में जानना चाहता/चाहती हूँ।')}">🏫 ऑफलाइन बैच</a>
      </div>
    </div>
    ${progressCard()}
  </section>`;
}

function sidebar(){
  const groups = groupLessons();
  return `
  <aside class="side-nav course-sidebar">
    <div class="sidebar-head">
      <strong>कोर्स सूची (${data.lessons.length})</strong>
      <small>Collapsible lesson menu</small>
    </div>
    <div class="sidebar-tools">
      <button type="button" id="openAllGroups">सभी खोलें</button>
      <button type="button" id="closeAllGroups">सभी बंद करें</button>
    </div>
    <div class="lesson-groups">
      ${groups.map((g,idx)=>{
        const done = completedCount(g.lessons);
        const total = g.lessons.length;
        return `<details class="lesson-group" ${idx===0 ? "open" : ""}>
          <summary>
            <span>${esc(g.title)}</span>
            <small>${done}/${total}</small>
          </summary>
          <div class="lesson-links">
            ${g.lessons.map(l=>`<a href="${esc(lessonUrl(l))}" data-lesson-open="${esc(l.id)}" class="lesson-link ${isDone(l.id)?'done':(isOpen(l.id)?'opened':'')}"><b>${esc(l.id)}</b><span>${esc(l.titleHi || l.titleEn || l.objective)}</span></a>`).join('')}
          </div>
        </details>`;
      }).join('')}
    </div>
  </aside>`;
}

function contentIntro(){
  return `
  <section class="content">
    <div class="block">
      <div class="block-title">कोर्स शुरू करें</div>
      <p>बाएँ/ऊपर की collapsible सूची से कोई भी lesson चुनें। हर lesson अपने full rich page पर खुलेगा — जहाँ digital graphics, hyperlinks, concept references, Wikipedia/AI links और project work मौजूद रहेंगे।</p>
    </div>

    <div class="fee-grid">
      <div class="fee-card free"><strong>ऑनलाइन कोर्स</strong><span>फ्री</span></div>
      <div class="fee-card support"><strong>ऑनलाइन WhatsApp सपोर्ट</strong><span>पेड</span></div>
      <div class="fee-card paid"><strong>ऑफलाइन दरसगाह/वर्कशॉप</strong><span>पेड</span></div>
    </div>

    <section class="block">
      <div class="block-title">ACS Payment Rule</div>
      <p>ऑनलाइन self-study content फ्री रहेगा। WhatsApp सपोर्ट, ऑफलाइन practical training, इंटर्नशिप, सर्टिफिकेशन और जॉब प्लेसमेंट पेड सेवाएँ हो सकती हैं।</p>
    </section>
  </section>`;
}

function bind(){
  document.querySelectorAll('[data-lesson-open]').forEach(a=>{
    a.addEventListener('click', ()=>{
      const id = a.getAttribute('data-lesson-open');
      if(id) markOpen(id);
    });
  });
  const groups = Array.from(document.querySelectorAll('details.lesson-group'));
  const openBtn = document.getElementById('openAllGroups');
  const closeBtn = document.getElementById('closeAllGroups');
  if(openBtn) openBtn.addEventListener('click',()=>groups.forEach(g=>g.open=true));
  if(closeBtn) closeBtn.addEventListener('click',()=>groups.forEach(g=>g.open=false));
}

function overview(){
  app.className = "overview";
  app.innerHTML = `${hero()}<div class="layout">${sidebar()}${contentIntro()}</div>`;
  bind();
}

function redirectLesson(id){
  const l = data.lessons.find(x=>x.id === id);
  if(l){
    markOpen(l.id);
    location.replace(lessonUrl(l));
  } else {
    overview();
  }
}

if(lessonParam){ redirectLesson(lessonParam); }
else { overview(); }
})();
