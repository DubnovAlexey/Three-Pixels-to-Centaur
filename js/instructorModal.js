// =====================================================================
// FILE: js/instructorModal.js
// PURPOSE: fictional curator profiles from the same data used by the landing page.
// FUNCTIONS: initInstructorModal. All biography content is explicitly fictional.
// =====================================================================
import { curators } from './curatorData.js';

// BEGIN initInstructorModal
export function initInstructorModal() {
  const element = document.getElementById('instructorModal');
  if (!element) return;
  document.querySelectorAll('[data-instructor]').forEach(button => button.addEventListener('click', () => {
    const person = curators.find(item => item.id === button.dataset.instructor);
    if (!person) return;
    document.getElementById('instructorModalImg').src = person.image;
    document.getElementById('instructorModalImg').alt = person.name + ' — вымышленный куратор';
    document.getElementById('instructorModalName').textContent = person.name;
    document.getElementById('instructorModalRole').textContent = person.role;
    document.getElementById('instructorModalBio').textContent = person.bio;
    bootstrap.Modal.getOrCreateInstance(element).show();
  }));
}
// END initInstructorModal
