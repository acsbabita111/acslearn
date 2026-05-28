
document.addEventListener('DOMContentLoaded',()=>{
  const l=document.getElementById('languageToggle'),p=document.getElementById('languagePanel'),cl=document.getElementById('closeLangPanel');
  if(l&&p)l.onclick=e=>{e.stopPropagation();let o=l.getAttribute('aria-expanded')==='true';l.setAttribute('aria-expanded',String(!o));p.hidden=o};
  if(cl&&p)cl.onclick=()=>{p.hidden=true;l&&l.setAttribute('aria-expanded','false')};
  document.querySelectorAll('.lang-opt').forEach(b=>b.onclick=()=>{let u=b.getAttribute('data-url');if(u)location.href=u});
  const m=document.getElementById('menuToggle'),mp=document.getElementById('menuPanel'),cm=document.getElementById('closeMenuPanel');
  if(m&&mp)m.onclick=e=>{e.stopPropagation();let o=m.getAttribute('aria-expanded')==='true';m.setAttribute('aria-expanded',String(!o));mp.hidden=o};
  if(cm&&mp)cm.onclick=()=>{mp.hidden=true;m&&m.setAttribute('aria-expanded','false')};
  document.addEventListener('click',e=>{if(p&&!p.hidden&&!p.contains(e.target)&&e.target!==l){p.hidden=true;l&&l.setAttribute('aria-expanded','false')}if(mp&&!mp.hidden&&!mp.contains(e.target)&&e.target!==m){mp.hidden=true;m&&m.setAttribute('aria-expanded','false')}});
  injectACSWhatsAppButton();
});
function injectACSWhatsAppButton(){
  if(document.querySelector('.whatsapp-float'))return;
  const wa=document.createElement('a');
  wa.className='whatsapp-float';wa.href='https://wa.me/919431210092';wa.target='_blank';wa.rel='noopener';wa.setAttribute('aria-label','WhatsApp पर संपर्क करें');
  wa.innerHTML=`<svg class="wa-svg" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.02 3C8.85 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.75 6.5L3 29l6.66-1.74a12.86 12.86 0 0 0 6.36 1.67h.01c7.16 0 12.98-5.82 12.98-12.99C29.01 8.82 23.19 3 16.02 3Zm0 23.74h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.95 1.03 1.05-3.85-.25-.4a10.72 10.72 0 0 1-1.64-5.81c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.13 7.55c-.02 5.9-4.81 10.69-10.71 10.69Zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.82 1.05-1 1.26-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.62s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.21-.61-.37Z"/></svg>`;
  document.body.appendChild(wa);
}
