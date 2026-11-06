// FILE: js/contactForm.js
// PURPOSE: local validation demonstration; does not transmit a message.
import { showSuccess } from './successModal.js';
// BEGIN initContactForm
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); form.reportValidity(); return; }
    showSuccess('Сигнал сформирован и остался на борту вашего браузера. Это локальная демонстрация: данные не отправлены. Ответ из приёмной комиссии не ожидается — там всё ещё спорят о композиции.');
    form.reset(); form.classList.remove('was-validated');
  });
}
// END initContactForm
