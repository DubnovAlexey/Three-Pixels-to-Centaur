// =====================================================================
// FILE: js/fleet.js
// PURPOSE: choose a fictional excursion vessel by route, comfort and cost.
// SECTIONS: 1 cards/routes; 2 vessel dossier; 3 local selection/language.
// Selection stays on this page. No booking, payment or network write occurs.
// =====================================================================
import { fleet,fleetRoutes,fleetNotice } from './fleetData.js';
import { t,localText,onLanguageChange } from './i18n.js';
import { crew,crewPort } from './crewData.js';
import { CARD_SIZES,setCardImage } from './imageCard.js';

// BEGIN crew helpers — the captain comes first, the spaceport baggage team waves everyone off last.
const crewOf=ship=>[...crew.filter(member=>member.ship===ship.id).sort((a,b)=>Number(b.captain)-Number(a.captain)),...crew.filter(member=>member.ship==='port')];
// END crew helpers

// BEGIN initFleet
export function initFleet() {
  const root=document.getElementById('fleetGrid'),routes=document.getElementById('fleetRoutes');
  const modalEl=document.getElementById('fleetModal'),notice=document.getElementById('fleetNotice');
  const status=document.getElementById('fleetSelection');
  if (!root||!routes||!modalEl) return;
  let route='all',current=null,selected=null,opener=null,member=null;
  const modal=bootstrap.Modal.getOrCreateInstance(modalEl);
  const crewGrid=document.getElementById('fleetModalCrew'),crewDossier=document.getElementById('fleetModalCrewDossier');
  // BEGIN renderCrew — portraits of this ship's crew; choosing one shows the role and biography below.
  function renderCrew() {
    if(!current||!crewGrid||!crewDossier)return;
    crewGrid.replaceChildren(...crewOf(current).map(person=>{
      const button=document.createElement('button');button.type='button';button.className='crew-card';button.dataset.crew=person.id;
      button.setAttribute('aria-pressed',String(member?.id===person.id));
      const image=document.createElement('img');image.src=person.image;image.alt='';image.loading='lazy';image.decoding='async';image.width=160;image.height=200;
      const name=document.createElement('span');name.className='crew-name';name.textContent=localText(person.name);
      const role=document.createElement('span');role.className='crew-role';
      role.textContent=person.ship==='port'?`${localText(crewPort)} · ${localText(person.role)}`:localText(person.role);
      button.append(image,name,role);
      if(person.captain){const badge=document.createElement('span');badge.className='crew-badge';badge.textContent=t('Капитан');button.append(badge);}
      button.addEventListener('click',()=>{
        member=person;renderCrew();
        // The cards are rebuilt, so keep keyboard focus on the chosen one and bring its file into view.
        crewGrid.querySelector(`[data-crew="${person.id}"]`)?.focus({preventScroll:true});
        crewDossier.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      });
      return button;
    }));
    if(!member){const hint=document.createElement('p');hint.className='crew-hint';hint.textContent=t('Выберите члена экипажа, чтобы открыть его досье. Все персонажи вымышлены.');crewDossier.replaceChildren(hint);return;}
    const figure=document.createElement('img');figure.src=member.image;figure.alt=localText(member.name);figure.width=240;figure.height=300;
    const text=document.createElement('div');
    const role=document.createElement('p');role.className='eyebrow';role.textContent=localText(member.role);
    const name=document.createElement('h4');name.textContent=localText(member.name);
    const bio=document.createElement('p');bio.textContent=localText(member.bio);
    const full=document.createElement('a');full.href=member.full;full.target='_blank';full.rel='noopener';full.className='crew-full';
    full.textContent=`${t('Открыть портрет целиком')} ↗`;
    text.append(role,name,bio,full);crewDossier.replaceChildren(figure,text);
  }
  // END renderCrew
  function renderDossier() {
    if(!current)return;
    const image=document.getElementById('fleetModalImage');image.src=current.image;image.alt=localText(current.name);
    for(const [id,value] of [['fleetModalTitle',current.name],['fleetModalRole',current.role],['fleetModalDescription',current.description],['fleetModalComfort',current.comfort],['fleetModalConditions',current.conditions]]) document.getElementById(id).textContent=localText(value);
    document.getElementById('fleetModalCapacity').textContent=String(current.capacity);
    document.getElementById('fleetModalPrice').textContent=`${current.priceCredits} ${t('кредитов')}`;
  }
  function open(ship,button){current=ship;opener=button;member=null;renderDossier();renderCrew();modal.show();}
  function card(ship) {
    const article=document.createElement('article');article.className='fleet-card';article.classList.toggle('is-selected',selected?.id===ship.id);
    const image=document.createElement('img');image.alt=localText(ship.name);image.loading='lazy';image.decoding='async';image.width=640;image.height=400;
    setCardImage(image,ship.image,CARD_SIZES.fleet); // в досье корабля — оригинал
    const body=document.createElement('div');body.className='card-body-space';
    const role=document.createElement('p');role.className='eyebrow';role.textContent=localText(ship.role);
    const title=document.createElement('h3');title.textContent=localText(ship.name);
    const description=document.createElement('p');description.textContent=localText(ship.description);
    const price=document.createElement('p');price.className='fleet-price';price.textContent=`${ship.priceCredits} ${t('кредитов')} · ${t('Мест: {count}',{count:ship.capacity})} · ${t('Экипаж: {count}',{count:crewOf(ship).length})}`;
    const button=document.createElement('button');button.type='button';button.className='button-space';button.dataset.ship=ship.id;button.textContent=t('Условия полёта ↗');button.addEventListener('click',()=>open(ship,button));
    body.append(role,title,description,price,button);article.append(image,body);return article;
  }
  function render() {
    notice.textContent=localText(fleetNotice);
    const options=[{id:'all',name:'Все маршруты'},...fleetRoutes];
    routes.replaceChildren(...options.map(option=>{
      const button=document.createElement('button');button.type='button';button.className='filter-btn';button.textContent=localText(option.name);
      button.classList.toggle('active',route===option.id);button.setAttribute('aria-pressed',String(route===option.id));
      button.addEventListener('click',()=>{route=option.id;render();routes.querySelector(`[data-route="${route}"]`)?.focus();});button.dataset.route=option.id;return button;
    }));
    root.replaceChildren(...fleet.filter(ship=>route==='all'||ship.routeIds.includes(route)).map(card));
    status.textContent=selected?t('Выбран корабль: {name}. Это пример маршрута, бронирование не выполнено.',{name:localText(selected.name)}):t('Сравните условия и выберите свой корабль.');
    if(current)opener=root.querySelector(`[data-ship="${current.id}"]`);
  }
  document.getElementById('fleetChoose').addEventListener('click',()=>{selected=current;render();modal.hide();});
  modalEl.addEventListener('hidden.bs.modal',()=>opener?.focus());
  onLanguageChange(()=>{render();renderDossier();renderCrew();});render();
}
// END initFleet
