// =====================================================================
// FILE: js/videoGallery.js
// PURPOSE: purpose-based field recordings with one manually started player.
// SECTIONS: 1 categories/cards; 2 selected player; 3 language/close lifecycle.
// No clip is downloaded by the gallery. Only opening its modal sets video.src.
// =====================================================================
import { videoEntries } from './videoCatalog.js';
import { t,localText,onLanguageChange } from './i18n.js';
export const videoCategories=['worlds','ships','characters','workshops'];
const names={worlds:'Миры и маршруты',ships:'Корабли и рейсы',characters:'Бортовые происшествия',workshops:'Визуальная лаборатория'};
const posters={worlds:'assets/images/galactic-cliff.png',ships:'assets/images/frontier-freighter.jpeg',characters:'assets/images/first-lesson.jpeg',workshops:'assets/images/celestial-atlas.png'};

// BEGIN initVideoGallery
export function initVideoGallery() {
  const root=document.getElementById('videoGrid'),result=document.getElementById('videoResult');
  const more=document.getElementById('videoMore'),modalEl=document.getElementById('videoModal');
  const media=document.getElementById('fieldVideo'),failure=document.getElementById('videoError');
  if (!root || !modalEl || !media) return;
  let category='all',count=8,selected=null,opener=null;
  const modal=bootstrap.Modal.getOrCreateInstance(modalEl);
  function metadata(entry) {
    const duration=Math.round(entry.durationSeconds || 0);
    return `${String(Math.floor(duration/60)).padStart(2,'0')}:${String(duration%60).padStart(2,'0')}`;
  }
  function renderModal() {
    if (!selected) return;
    document.getElementById('videoModalTitle').textContent=localText(selected.titles ?? selected.title);
    document.getElementById('videoModalDescription').textContent=localText(selected.descriptions ?? 'Запись из полевого архива. Координаты диспетчер обещал уточнить после обеда.');
    document.getElementById('videoModalMeta').textContent=`${t(names[selected.category] || names.worlds)} · ${metadata(selected)}`;
    media.setAttribute('aria-label',localText(selected.titles ?? selected.title));
  }
  function open(entry,button) {
    selected=entry;opener=button;failure.hidden=true;
    // The poster shows the clip's opening frame while the video itself is still loading.
    media.pause();media.poster=entry.poster ?? '';media.src=entry.file;media.load();renderModal();modal.show();
  }
  function render() {
    const filtered=videoEntries.filter(x=>category==='all'||x.category===category);
    const cards=filtered.slice(0,count).map(entry=>{
      const button=document.createElement('button');button.type='button';button.className='video-card';button.dataset.video=entry.id;
      button.setAttribute('aria-label',t('Открыть видео: {title}',{title:localText(entry.titles ?? entry.title)}));
      const image=document.createElement('img');image.src=entry.poster ?? posters[entry.category] ?? posters.worlds;
      image.alt='';image.loading='lazy';image.decoding='async';image.width=640;image.height=360;
      const meta=document.createElement('span');meta.className='eyebrow';meta.textContent=`${t(names[entry.category] || names.worlds)} · ${metadata(entry)}`;
      const title=document.createElement('h3');title.textContent=localText(entry.titles ?? entry.title);
      const play=document.createElement('span');play.className='video-play';play.setAttribute('aria-hidden','true');play.textContent='▶';
      button.append(image,meta,title,play);button.addEventListener('click',()=>open(entry,button));return button;
    });
    root.replaceChildren(...cards);result.textContent=t('Показано {shown} из {total}',{shown:cards.length,total:filtered.length});
    more.hidden=cards.length===filtered.length;
    if (selected) opener=root.querySelector(`[data-video="${selected.id}"]`);
  }
  document.querySelectorAll('[data-video-filter]').forEach(button=>button.addEventListener('click',()=>{
    category=button.dataset.videoFilter;count=8;
    document.querySelectorAll('[data-video-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
    render();
  }));
  more.addEventListener('click',()=>{const previous=root.children.length;count+=8;render();root.children[previous]?.focus();});
  media.addEventListener('error',()=>{failure.hidden=false;});
  modalEl.addEventListener('hidden.bs.modal',()=>{media.pause();media.removeAttribute('src');media.removeAttribute('poster');media.load();opener?.focus();});
  window.addEventListener('pagehide',()=>media.pause());
  onLanguageChange(()=>{render();renderModal();});render();
}
// END initVideoGallery
