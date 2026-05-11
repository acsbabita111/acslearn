document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('form[data-static-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const box = form.querySelector('.form-result');
      if(box){ box.textContent = 'Form ready है। इसे Google Form, backend या WhatsApp workflow से connect करें।'; box.className='form-result success'; }
      form.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
});
