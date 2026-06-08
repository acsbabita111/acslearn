
(function(){
  const items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('show'); observer.unobserve(entry.target); } });
    }, {threshold:.12});
    items.forEach(el=>observer.observe(el));
  } else { items.forEach(el=>el.classList.add('show')); }

  function getLessonMap(){
    const el = document.getElementById('lesson-map');
    if(!el) return {};
    try { return JSON.parse(el.textContent || '{}'); } catch(e){ return {}; }
  }
  document.querySelectorAll('[data-goto-form]').forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input');
      const msg = form.querySelector('[data-goto-message]');
      const val = String(parseInt(input.value, 10));
      const map = getLessonMap();
      if(map[val]) { window.location.href = map[val]; return; }
      if(msg) msg.textContent = 'यह पाठ उपलब्ध नहीं है।';
    });
  });


  function getProgressData(){
    const el = document.getElementById('course-progress-data');
    if(!el) return null;
    try { return JSON.parse(el.textContent || '{}'); } catch(e){ return null; }
  }
  const progressData = getProgressData();
  function progressKey(){
    if(!progressData || !progressData.courseKey) return null;
    return 'acsProgress:v1:' + progressData.courseKey;
  }
  function readProgress(){
    const key = progressKey();
    if(!key) return {completed:[], lastPage:null};
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || '{}');
      return {completed:Array.isArray(parsed.completed)?parsed.completed:[], lastPage:parsed.lastPage || null};
    } catch(e){ return {completed:[], lastPage:null}; }
  }
  function writeProgress(state){
    const key = progressKey();
    if(!key) return;
    localStorage.setItem(key, JSON.stringify({completed:[...new Set(state.completed || [])].sort((a,b)=>a-b), lastPage:state.lastPage || null, updatedAt:new Date().toISOString()}));
  }
  function setLastPage(){
    if(!progressData || !progressData.currentPage) return;
    const state = readProgress();
    state.lastPage = Number(progressData.currentPage);
    writeProgress(state);
  }
  function renderProgress(){
    if(!progressData) return;
    const total = Number(progressData.totalLessons || 0) || (progressData.lessonPages || []).length || 1;
    const state = readProgress();
    const donePages = [...new Set((state.completed || []).map(Number))].filter(Boolean);
    const done = donePages.length;
    const left = Math.max(total - done, 0);
    const percent = Math.max(0, Math.min(100, Math.round((done / total) * 100)));
    document.querySelectorAll('[data-progress-root]').forEach(root => {
      root.style.setProperty('--progress-deg', (percent * 3.6) + 'deg');
      const percentEl = root.querySelector('[data-progress-percent]');
      const statusEl = root.querySelector('[data-progress-status]');
      const barEl = root.querySelector('[data-progress-bar]');
      const doneEl = root.querySelector('[data-progress-done]');
      const leftEl = root.querySelector('[data-progress-left]');
      const lastEl = root.querySelector('[data-progress-last]');
      const track = root.querySelector('.progress-track');
      if(percentEl) percentEl.textContent = percent + '%';
      if(statusEl) statusEl.textContent = done + ' / ' + total;
      if(barEl) barEl.style.width = percent + '%';
      if(track) track.setAttribute('aria-valuenow', String(percent));
      if(doneEl) doneEl.textContent = String(done);
      if(leftEl) leftEl.textContent = String(left);
      if(lastEl) lastEl.textContent = state.lastPage ? ('L' + String(state.lastPage).padStart(3,'0')) : '—';
      const markBtn = root.querySelector('[data-mark-complete]');
      if(markBtn && progressData.currentPage){
        const isDone = donePages.includes(Number(progressData.currentPage));
        markBtn.textContent = isDone ? '✓ पूरा हो चुका है' : '✓ यह पाठ पूरा हुआ';
        markBtn.classList.toggle('is-complete', isDone);
      }
      const continueLink = root.querySelector('[data-continue-link]');
      if(continueLink && state.lastPage && progressData.lessonMap && progressData.lessonMap[String(state.lastPage)]){
        continueLink.href = progressData.lessonMap[String(state.lastPage)];
      }
    });
    document.querySelectorAll('[data-lesson-card]').forEach(card => {
      const page = Number(card.getAttribute('data-page'));
      card.classList.toggle('is-complete', donePages.includes(page));
    });
  }
  setLastPage();
  renderProgress();
  document.querySelectorAll('[data-mark-complete]').forEach(btn => {
    btn.addEventListener('click', () => {
      if(!progressData || !progressData.currentPage) return;
      const state = readProgress();
      const p = Number(progressData.currentPage);
      if(!state.completed.map(Number).includes(p)) state.completed.push(p);
      state.lastPage = p;
      writeProgress(state);
      renderProgress();
    });
  });
  document.querySelectorAll('[data-reset-progress]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = progressKey();
      if(key && confirm('क्या इस course की progress reset करनी है?')){
        localStorage.removeItem(key);
        renderProgress();
      }
    });
  });

  let queue = [];
  let activeButton = null;
  const dock = document.getElementById('audio-dock');

  function cleanReadableText(el){
    if(!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('button,nav,script,style,.block-audio,.audio-tools,.audio-dock,.schematic-layer').forEach(node => node.remove());
    return (clone.innerText || clone.textContent || '').replace(/\s+/g,' ').trim();
  }
  function chunkText(text){
    const cleaned = (text || '').replace(/\s+/g,' ').trim();
    if(!cleaned) return [];
    return cleaned.match(/.{1,170}(?:[।.!?;:،۔]|$)/g) || [cleaned];
  }
  function resetButtons(){
    document.querySelectorAll('.is-speaking').forEach(btn => {
      btn.classList.remove('is-speaking');
      const label = btn.getAttribute('data-listen-label') || 'सुनो';
      btn.textContent = '🔊 ' + label;
    });
    activeButton = null;
    if(dock) dock.hidden = true;
  }
  function setActiveButton(btn){
    resetButtons();
    activeButton = btn || null;
    if(activeButton){
      activeButton.classList.add('is-speaking');
      activeButton.textContent = '⏹ बंद करें';
    }
    if(dock) dock.hidden = !activeButton;
  }
  function stopSpeaking(){
    queue = [];
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
    resetButtons();
  }
  function speakNext(lang){
    if(!queue.length){ resetButtons(); return; }
    const utter = new SpeechSynthesisUtterance(queue.shift());
    utter.lang = lang || document.body.getAttribute('data-lang') || 'hi-IN';
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onend = () => speakNext(lang);
    utter.onerror = () => resetButtons();
    window.speechSynthesis.speak(utter);
  }
  function startSpeaking(btn, target){
    if(!('speechSynthesis' in window)) { alert('इस browser में सुनो सुविधा उपलब्ध नहीं है।'); return; }
    if(btn && btn.classList.contains('is-speaking')) { stopSpeaking(); return; }
    window.speechSynthesis.cancel();
    const lang = document.body.getAttribute('data-lang') || 'hi-IN';
    queue = chunkText(cleanReadableText(target));
    if(!queue.length) return;
    setActiveButton(btn);
    speakNext(lang);
  }
  document.querySelectorAll('[data-speak-target]').forEach(btn => {
    btn.addEventListener('click', () => startSpeaking(btn, document.querySelector(btn.getAttribute('data-speak-target'))));
  });
  document.querySelectorAll('[data-speak-section]').forEach(btn => {
    btn.addEventListener('click', () => startSpeaking(btn, btn.closest('[data-speak-block]')));
  });
  document.querySelectorAll('[data-speak-stop]').forEach(btn => btn.addEventListener('click', stopSpeaking));
  window.addEventListener('beforeunload', stopSpeaking);
})();
