
function acsToast(msg){const t=document.createElement('div');t.textContent=msg;t.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0f172a;color:#fff;padding:12px 16px;border-radius:999px;z-index:9999;box-shadow:0 12px 30px rgba(0,0,0,.25);font-weight:700';document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
document.addEventListener('submit',function(e){if(e.target.matches('[data-static-form]')){e.preventDefault();acsToast('Form अभी static है। इसे Google Form, Firebase या backend से connect करना होगा।')}})
