// =====================================================================
// FILE: js/courseModal.js
// PURPOSE: local-only workshop interest form with fictional credits.
// FUNCTIONS: initCourseModal. No registration, payment or message is transmitted.
// =====================================================================
import { showSuccess } from './successModal.js';

// BEGIN initCourseModal
export function initCourseModal() {
  const modalEl = document.getElementById('courseModal');
  const form = document.getElementById('courseForm');
  if (!modalEl || !form) return;
  modalEl.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    if (!button?.dataset.course) return;
    document.getElementById('courseModalName').textContent = button.dataset.course;
    document.getElementById('courseModalPrice').textContent = button.dataset.price;
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById('courseModalName').textContent;
    modalEl.addEventListener('hidden.bs.modal', () => {
      showSuccess(`Сигнал о программе «${name}» проверен. Это локальная демонстрация: заявка не отправлена, кредиты не списаны. Приёмная комиссия продолжает искать кнопку «ответить».`);
    }, { once: true });
    bootstrap.Modal.getInstance(modalEl)?.hide(); form.reset();
  });
}
// END initCourseModal
