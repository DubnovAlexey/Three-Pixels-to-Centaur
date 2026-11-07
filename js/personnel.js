// =====================================================================
// FILE: js/personnel.js
// PURPOSE: five tutors and three expedition guides, with fictional dossiers.
// SECTIONS: localized cards; delegated modal and language updates.
// All profiles share one modal; opening/closing does not start audio.
// =====================================================================
import { personnel } from './personnelData.js';
import { localText, t, onLanguageChange } from './i18n.js';

// BEGIN initPersonnel
export function initPersonnel() {
  const tutors=document.getElementById('personnelGrid');
  const guides=document.getElementById('guideGrid');
  const modalEl=document.getElementById('instructorModal');
  if (!tutors || !guides || !modalEl) return;
  let selected=null,opener=null;
  function card(person) {
    const article=document.createElement('article'); article.className='curator-card';
    const frame=document.createElement('div'); frame.className='curator-photo';
    const image=document.createElement('img'); image.src=person.image; image.alt=localText(person.name);
    image.loading='lazy'; image.decoding='async'; image.width=800;image.height=1000;frame.append(image);
    const heading=document.createElement('h3');heading.textContent=localText(person.name);
    const role=document.createElement('p');role.textContent=localText(person.role);
    const button=document.createElement('button');button.type='button';button.dataset.instructor=person.id;
    button.textContent=t('ЛИЧНОЕ ДЕЛО ↗');
    article.append(frame,heading,role,button);return article;
  }
  function renderCards() {
    tutors.replaceChildren(...personnel.filter(x=>x.kind==='tutor').map(card));
    guides.replaceChildren(...personnel.filter(x=>x.kind==='guide').map(card));
    if (selected) opener=document.querySelector(`[data-instructor="${selected.id}"]`);
  }
  function renderDossier() {
    if (!selected) return;
    const image=document.getElementById('instructorModalImg');
    image.src=selected.image; image.alt=localText(selected.name);
    document.getElementById('instructorModalName').textContent=localText(selected.name);
    document.getElementById('instructorModalRole').textContent=localText(selected.role);
    document.getElementById('instructorModalBio').textContent=localText(selected.bio);
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-instructor]');
    if (!button) return;
    selected=personnel.find(x=>x.id===button.dataset.instructor);
    if (!selected) return;
    opener=button; renderDossier(); bootstrap.Modal.getOrCreateInstance(modalEl).show();
  });
  modalEl.addEventListener('hidden.bs.modal',()=>{opener?.focus();});
  onLanguageChange(()=>{renderCards();renderDossier();});renderCards();
}
// END initPersonnel
