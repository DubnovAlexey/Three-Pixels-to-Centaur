// FILE: js/newsletterForm.js
// PURPOSE: local subscription validation and translatable inline acknowledgement.
import { t,onLanguageChange } from './i18n.js';
// BEGIN initNewsletterForm
export function initNewsletterForm(){
 const form=document.getElementById('newsletterForm'),zone=document.getElementById('newsletterAlertZone');if(!form||!zone)return;
 const source='Форма работает, но это демо без сервера — подписка нигде не сохраняется.';
 const render=()=>{const text=zone.querySelector('.notice-text');if(text)text.textContent=t(source);const close=zone.querySelector('button');if(close)close.setAttribute('aria-label',t('Закрыть'));};
 onLanguageChange(render);
 form.addEventListener('submit',event=>{event.preventDefault();const email=document.getElementById('newsletterEmail');if(!email.checkValidity()){email.classList.add('is-invalid');email.reportValidity();return;}email.classList.remove('is-invalid');
  const alert=document.createElement('div');alert.className='alert alert-success alert-dismissible fade show';alert.setAttribute('role','status');
  const text=document.createElement('span');text.className='notice-text';const close=document.createElement('button');close.type='button';close.className='btn-close';close.setAttribute('data-bs-dismiss','alert');alert.append(text,close);zone.replaceChildren(alert);render();form.reset();
 });
}
// END initNewsletterForm
