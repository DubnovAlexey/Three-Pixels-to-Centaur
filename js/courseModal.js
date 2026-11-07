// FILE: js/courseModal.js
// PURPOSE: localized workshop outline and local-only interest validation.
// SECTIONS: shared outlines; modal rendering; guarded submit lifecycle.
import { showSuccess } from './successModal.js';
import { t,onLanguageChange } from './i18n.js';
const outlines=[
 ['Читать свет: направление, жёсткость и контраст.','Выдержка, диафрагма и ISO на одном практическом задании.','Результат: серия из трёх кадров с осознанной экспозицией.'],
 ['Планировать движение и ловить момент без паники.','Работать с импульсным и постоянным светом.','Результат: короткая история события, где никто не выпал из кадра.'],
 ['Силуэт, пропорции и выразительный характер.','Собирать палитру и коллаж без визуального шума.','Результат: законченный портрет и пояснение своего замысла.']
];
// BEGIN initCourseModal
export function initCourseModal(){
 const modalEl=document.getElementById('courseModal'),form=document.getElementById('courseForm');
 if(!modalEl||!form)return;
 let selected=null,closing=false;
 const buttons=[...document.querySelectorAll('[data-course]')];
 function render(){if(!selected)return;
  document.getElementById('courseModalName').textContent=t(selected.dataset.course);
  document.getElementById('courseModalPrice').textContent=selected.dataset.price.split(' ')[0]+' '+t('кредитов');
  document.getElementById('courseOutline').replaceChildren(...outlines[buttons.indexOf(selected)].map(source=>{const li=document.createElement('li');li.textContent=t(source);return li;}));
 }
 modalEl.addEventListener('show.bs.modal',event=>{if(event.relatedTarget?.dataset.course){selected=event.relatedTarget;render();}});
 onLanguageChange(render);
 form.addEventListener('submit',event=>{event.preventDefault();if(closing||!form.reportValidity())return;closing=true;
  const source=selected?.dataset.course || 'Мастерская';
  modalEl.addEventListener('hidden.bs.modal',()=>{closing=false;showSuccess('Интерес к программе «{name}» проверен локально. Заявка не отправлена, кредиты не списаны. Комиссия продолжает искать кнопку «ответить».',{name:()=>t(source)});},{once:true});
  bootstrap.Modal.getInstance(modalEl)?.hide();form.reset();
 });
}
// END initCourseModal
