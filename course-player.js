
const qs = new URLSearchParams(location.search);
const courseId = qs.get('c') || 'acs-2036-job-ready-digital-career-path';
const lang = qs.get('lang') || 'hi';
const lessonId = qs.get('lesson');
const app = document.getElementById('app');
async function getJSON(path){ const r=await fetch(path); if(!r.ok) throw new Error(path); return r.json(); }
function esc(s){return String(s||'').replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function flatLessons(outline){return (outline.chunks||[]).flatMap(ch => (ch.lessons||[]).map(l=>({...l, chunk_id: ch.chunk_id})));}
async function render(){
 try{
  const base=`data/courses/${courseId}`;
  const manifest=await getJSON(`${base}/manifest.json`);
  const course=await getJSON(`${base}/${lang}/course.json`);
  const outline=await getJSON(`${base}/${lang}/outline.json`);
  if(manifest.status==='coming_soon' || course.status==='coming_soon'){
    app.innerHTML=`<section class="hero"><span class="label">${esc(course.subtitle||'जल्द उपलब्ध')}</span><div class="coming">COMING SOON</div><h1>${esc(course.title)}</h1><p>${esc(course.description||course.message||'यह कोर्स जल्द उपलब्ध होगा।')}</p><div class="badges"><span class="badge">जल्द उपलब्ध</span><span class="badge">ऑनलाइन फ्री</span><span class="badge paid">ऑफलाइन पेड</span></div><div class="btnrow"><a class="btn green" href="digital-courses.html">📚 डिजिटल कोर्स</a><a class="btn black" href="register.html">🎓 अभी जुड़िए</a></div></section>`; return;
  }
  const lessons=flatLessons(outline);
  const current=lessonId ? lessons.find(l=>l.lesson_id===lessonId) : null;
  const hero=`<section class="hero"><span class="label">${esc(course.subtitle)}</span><h1>${esc(course.title)}</h1><p>${esc(course.description)}</p><div class="badges">${(course.badges||[]).map((b,i)=>`<span class="badge ${i>0?'paid':''}">${esc(b)}</span>`).join('')}</div><div class="btnrow"><a class="btn green" href="course.html?c=${courseId}&lang=${lang}&lesson=${lessons[0]?.lesson_id||''}">🎓 पहला लेसन शुरू करें</a><a class="btn black" href="register.html">💬 सपोर्ट लें</a><a class="btn gold" href="offline-batch.html?c=${courseId}">🏫 ऑफलाइन बैच</a></div></section>`;
  const toc=`<aside class="panel toc"><h3>कोर्स सूची (${lessons.length})</h3>${(outline.chunks||[]).map(ch=>`<div class="chunk"><b>${esc(ch.title)}</b>${(ch.lessons||[]).map(l=>`<a class="${l.lesson_id===lessonId?'active':''}" href="course.html?c=${courseId}&lang=${lang}&lesson=${l.lesson_id}">${esc(l.lesson_id)} — ${esc(l.title)}</a>`).join('')}</div>`).join('')}</aside>`;
  let lessonHtml='<section class="lesson"><h2>कोर्स शुरू करें</h2><p>बाएँ/ऊपर की सूची से कोई भी lesson चुनें।</p></section>';
  if(current){
    const chunk=await getJSON(`${base}/${lang}/layers/${current.chunk_id}.json`);
    const full=(chunk.lessons||[]).find(l=>l.lesson_id===lessonId);
    const blocks=full?.content?.blocks||[];
    lessonHtml=`<section class="lesson"><span class="label">${esc(current.lesson_id)}</span><h2>${esc(current.title)}</h2><p>${esc(full?.content?.meta_description||full?.content?.h1||'')}</p>${blocks.map(b=>`<div class="block"><h3>${esc(b.heading||'मुख्य भाग')}</h3>${(b.paragraphs&&b.paragraphs.length?b.paragraphs:[b.text]).filter(Boolean).slice(0,5).map(p=>`<p>${esc(p)}</p>`).join('')}${(b.bullets||[]).slice(0,8).map(li=>`<p>• ${esc(li)}</p>`).join('')}</div>`).join('')}</section>`;
  }
  app.innerHTML=hero+`<div class="layout">${toc}${lessonHtml}</div>`;
 }catch(e){app.innerHTML=`<section class="hero"><h1>कोर्स लोड नहीं हो पाया</h1><p>${esc(e.message)}</p><a class="btn green" href="digital-courses.html">डिजिटल कोर्स पर लौटें</a></section>`;}
}
render();
