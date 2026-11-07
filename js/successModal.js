// FILE: js/successModal.js
// PURPOSE: localized, accessible acknowledgement for local demonstration forms.
import { t,onLanguageChange } from './i18n.js';
let current=null,subscribed=false;
function render(){if(current)document.getElementById('successModalText').textContent=t(current.source,Object.fromEntries(Object.entries(current.values).map(([key,value])=>[key,typeof value==='function'?value():value])));}
// BEGIN showSuccess
export function showSuccess(source,values={}){
 current={source,values};render();if(!subscribed){onLanguageChange(render);subscribed=true;}
 bootstrap.Modal.getOrCreateInstance(document.getElementById('successModal')).show();
}
// END showSuccess
