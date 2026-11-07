// =====================================================================
// FILE: js/signalType.js
// PURPOSE: one quiet, readable dispatch line assembled by grapheme clusters.
// SECTIONS: visible-only typing; language/reduced-motion/page lifecycle.
// Layout reserves two lines; there is no symbol clipping or flashing scramble.
// =====================================================================
import { t,onLanguageChange } from './i18n.js';

// BEGIN initSignalType
export function initSignalType() {
  const root=document.getElementById('dispatchSignal'),line=document.getElementById('signalText');
  if (!root||!line) return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const source='Канал открыт. Координаты воображения приняты.';
  let visible=false,frame=0,start=0,clusters=[];
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter(undefined,{granularity:'grapheme'}):null;
  function stop() {cancelAnimationFrame(frame);frame=0;}
  function showFull() {stop();line.textContent=t(source);}
  function tick(now) {
    if (!visible||document.hidden||preference.matches) {showFull();return;}
    start ||= now;
    const count=Math.min(clusters.length,Math.floor((now-start)/38));
    line.textContent=clusters.slice(0,count).join('');
    if(count<clusters.length)frame=requestAnimationFrame(tick);else frame=0;
  }
  function restart() {
    stop();start=0;const text=t(source);root.setAttribute('aria-label',text);
    clusters=segmenter?[...segmenter.segment(text)].map(x=>x.segment):Array.from(text);
    if(!visible||preference.matches||document.hidden){line.textContent=text;return;}
    line.textContent='';frame=requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)restart();else stop();},{threshold:.2});
  observer.observe(root);onLanguageChange(restart);preference.addEventListener('change',restart);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)showFull();});
  window.addEventListener('pagehide',()=>{stop();observer.disconnect();});restart();
}
// END initSignalType
