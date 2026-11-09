// =====================================================================
// FILE: js/i18n.js
// PURPOSE: RU/EN/HE/ES/FR copy, language preference and accessible RTL presentation (Hebrew only).
// SECTIONS: 1 pure lookup; 2 static bindings; 3 language lifecycle.
// Static text nodes are retained, so switching never recreates forms or media.
// Dynamic views subscribe separately and preserve their current selection.
// =====================================================================
import { translations } from './translations.js';
export const supportedLanguages = ['ru', 'en', 'he', 'es', 'fr'];
let language = 'ru';
const bindings = [];
const dynamicIds = new Set(['archiveGrid','archiveResult','photoModalTitle','photoModalExif','photoModalDescription',
  'instructorModalName','instructorModalRole','instructorModalBio','courseModalName','courseModalPrice','courseOutline',
  'playlistTitle','playlistCounter','playlistStatus','randomFactText','successModalText','newsletterAlertZone',
  'videoGrid','videoResult','videoModalTitle','videoModalDescription','videoModalMeta','personnelGrid','guideGrid','fleetGrid','signalText']);

// BEGIN SECTION 1 — pure lookup
export function normalizeLanguage(value) { return supportedLanguages.includes(value) ? value : 'ru'; }
export function getLanguage() { return language; }
export function t(source, values = {}, locale = language) {
  const key = String(source ?? '');
  const clean = key.trim();
  let result = normalizeLanguage(locale) === 'ru' ? clean : (translations[clean]?.[locale] ?? clean);
  result = result.replace(/\{(\w+)\}/g, (token, name) => Object.hasOwn(values,name) ? String(values[name]) : token);
  return result;
}
export function localText(value) {
  return value && typeof value === 'object' ? (value[language] ?? value.ru ?? value.en ?? '') : t(value);
}
// END SECTION 1

// BEGIN SECTION 2 — bind the original static DOM once
function isDynamic(node) {
  for (let parent=node.parentElement; parent; parent=parent.parentElement) {
    if (dynamicIds.has(parent.id) || parent.matches('script,style,[data-dynamic-copy]')) return true;
  }
  return false;
}
function bindStaticCopy() {
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while ((node=walker.nextNode())) {
    if (!isDynamic(node) && translations[node.data.trim()]) bindings.push({node,source:node.data});
  }
  for (const element of document.querySelectorAll('[aria-label],[alt],[placeholder],meta[name="description"]')) {
    if (dynamicIds.has(element.id) || isDynamic(element)) continue;
    for (const attr of ['aria-label','alt','placeholder','content']) {
      const source=element.getAttribute(attr);
      if (source && translations[source.trim()]) bindings.push({element,attr,source});
    }
  }
  bindings.push({element:document.querySelector('title'),source:document.title,title:true});
}
// END SECTION 2

// BEGIN SECTION 3 — language lifecycle
export function onLanguageChange(callback) {
  document.addEventListener('centauri:language',callback);
  return () => document.removeEventListener('centauri:language',callback);
}
export function setLanguage(value) {
  language=normalizeLanguage(value);
  document.documentElement.lang=language;
  document.documentElement.dir=language==='he'?'rtl':'ltr';
  for (const binding of bindings) {
    const {source}=binding;
    const translated=t(source);
    const spaced=source.replace(source.trim(),translated);
    if (binding.node) binding.node.data=spaced;
    else if (binding.title) document.title=translated;
    else binding.element.setAttribute(binding.attr,spaced);
  }
  const select=document.getElementById('languageSelect');
  if (select) select.value=language;
  try { localStorage.setItem('centauri.language',language); } catch { /* preference is optional */ }
  document.dispatchEvent(new CustomEvent('centauri:language',{detail:{language}}));
}
export function initI18n() {
  bindStaticCopy();
  let saved='ru';
  try { saved=localStorage.getItem('centauri.language') || saved; } catch { /* storage may be denied */ }
  const query=new URLSearchParams(location.search).get('lang');
  setLanguage(query || saved);
  document.getElementById('languageSelect')?.addEventListener('change',event=>setLanguage(event.target.value));
}
// END SECTION 3
