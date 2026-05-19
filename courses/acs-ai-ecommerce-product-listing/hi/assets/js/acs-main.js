
(function(){
  function $(sel){return document.querySelector(sel)}
  function $all(sel){return Array.prototype.slice.call(document.querySelectorAll(sel))}
  function toast(msg){var t=$('.acs-listen-toast'); if(t){t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2400)} else {alert(msg)}}
  function lessonKey(id){return 'acs_ecom_lesson_completed_'+id}
  function progressBar(){var b=$('#progressBar'); if(!b) return; var h=document.documentElement; var max=h.scrollHeight-h.clientHeight; var pct=max>0?(h.scrollTop/max)*100:0; b.style.width=pct+'%'}
  window.addEventListener('scroll', progressBar); document.addEventListener('DOMContentLoaded', progressBar);
  var currentId = document.body.getAttribute('data-acs-lesson-id') || '';
  function markComplete(){ if(!currentId){toast('लेसन आईडी नहीं मिली।');return} localStorage.setItem(lessonKey(currentId),'true'); updateProgress(); toast('लेसन पूरा मार्क हो गया।') }
  function updateProgress(){
    var data=window.ACS_ECOMMERCE_DATA; if(!data) return;
    var total=data.lessons.length; var done=data.lessons.filter(function(l){return localStorage.getItem(lessonKey(l.id))==='true'}).length;
    $all('[data-acs-done-count]').forEach(function(el){el.textContent=done});
    $all('[data-acs-total-count]').forEach(function(el){el.textContent=total});
    $all('[data-acs-progress-fill]').forEach(function(el){el.style.width=(total?Math.round(done/total*100):0)+'%'});
    $all('[data-acs-mark-complete]').forEach(function(btn){ if(currentId && localStorage.getItem(lessonKey(currentId))==='true'){btn.classList.add('done');btn.textContent='✓ पूरा'} });
  }
  window.ACSMarkComplete=markComplete;
  function setupListen(){
    var btns=$all('[data-acs-listen]'); if(!('speechSynthesis' in window)){btns.forEach(function(b){b.style.display='none'});return;}
    var active=false;
    btns.forEach(function(btn){btn.addEventListener('click',function(){
      if(active){speechSynthesis.cancel(); active=false; btn.classList.remove('listen-active'); toast('सुनना बंद।'); return;}
      var target=document.querySelector(btn.getAttribute('data-acs-listen')||'main') || document.body;
      var text=(target.innerText||'').replace(/\s+/g,' ').slice(0,12000);
      var u=new SpeechSynthesisUtterance(text); u.lang='hi-IN'; u.rate=.92; u.onend=function(){active=false; btn.classList.remove('listen-active')};
      speechSynthesis.cancel(); speechSynthesis.speak(u); active=true; btn.classList.add('listen-active'); toast('लेसन पढ़कर सुनाया जा रहा है।');
    })})
  }
  function setupGoto(){
    var modal=$('#acsGotoModal'), list=$('#acsGotoList'), search=$('#acsGotoSearch'); var data=window.ACS_ECOMMERCE_DATA;
    if(!modal||!list||!data) return;
    function render(q){ q=(q||'').toLowerCase(); list.innerHTML=''; data.lessons.filter(function(l){return !q || (l.title+' '+l.id+' '+l.phase).toLowerCase().includes(q)}).forEach(function(l){var a=document.createElement('a'); a.className='acs-goto-item '+(localStorage.getItem(lessonKey(l.id))==='true'?'completed':'open'); a.href=l.path; a.innerHTML='<span class="acs-goto-id">'+l.id+'</span>'+l.title; list.appendChild(a)}); }
    render('');
    $all('[data-acs-open-goto]').forEach(function(b){b.addEventListener('click',function(){modal.classList.add('open');render(''); setTimeout(function(){if(search) search.focus()},50)})});
    $all('[data-acs-close-goto]').forEach(function(b){b.addEventListener('click',function(){modal.classList.remove('open')})});
    if(search) search.addEventListener('input',function(){render(search.value)});
    modal.addEventListener('click',function(e){if(e.target===modal) modal.classList.remove('open')});
  }
  function setupCopy(){ $all('[data-copy-text]').forEach(function(btn){btn.addEventListener('click',function(){var text=btn.getAttribute('data-copy-text')||location.href; if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast('कॉपी हो गया।')})} else {prompt('Copy:', text)}})}) }
  function setupShare(){ $all('[data-share]').forEach(function(btn){btn.addEventListener('click',function(){var title=document.title; var text=btn.getAttribute('data-share-text')||title; if(navigator.share){navigator.share({title:title,text:text,url:location.href}).catch(function(){})} else {window.open('https://wa.me/?text='+encodeURIComponent(text+' '+location.href),'_blank')}})}) }
  function setupCourseMapFilter(){ var input=$('[data-course-filter]'), list=$('[data-course-list]'); if(!input||!list) return; input.addEventListener('input',function(){var q=input.value.toLowerCase(); $all('[data-course-item]').forEach(function(item){item.style.display=item.textContent.toLowerCase().includes(q)?'block':'none'})}) }
  document.addEventListener('DOMContentLoaded',function(){setupListen();setupGoto();setupCopy();setupShare();setupCourseMapFilter();updateProgress(); $all('[data-acs-mark-complete]').forEach(function(b){b.addEventListener('click',markComplete)});});
})();
