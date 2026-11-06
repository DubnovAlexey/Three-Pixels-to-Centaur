// =====================================================================
// FILE: js/galleryLightbox.js
// PURPOSE: progressive supplied-image archive, semantic filters and full-size modal.
// SECTIONS: 1 selection; 2 accessible cards; 3 modal navigation/keyboard; 4 init.
// Original image files are used; captions distinguish studies and illustrations.
// =====================================================================
import { archiveImages } from './mediaCatalog.js';

const PAGE_SIZE = 8;
// BEGIN selectArchive
export function selectArchive(images, category = 'all') {
  return images.filter(image => image.category !== 'favicon' && (category === 'all' || image.category === category));
}
// END selectArchive

// BEGIN initGalleryLightbox
export function initGalleryLightbox() {
  const root = document.getElementById('archiveGrid');
  const modalEl = document.getElementById('photoModal');
  const more = document.getElementById('archiveMore');
  const result = document.getElementById('archiveResult');
  if (!root || !modalEl) return;
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const imageEl = document.getElementById('photoModalImg');
  const titleEl = document.getElementById('photoModalTitle');
  const caption = document.getElementById('photoModalExif');
  const failure = document.getElementById('photoModalError');
  let category = 'all', visibleCount = PAGE_SIZE, currentIndex = 0, filtered = selectArchive(archiveImages);
  let opener = null;

  // BEGIN renderCurrent
  function renderCurrent() {
    if (!filtered.length) return;
    currentIndex = (currentIndex + filtered.length) % filtered.length;
    const current = filtered[currentIndex];
    failure.hidden = true; imageEl.hidden = false;
    imageEl.src = current.file; imageEl.alt = current.title;
    titleEl.textContent = current.title;
    caption.textContent = `${current.label} · ${currentIndex + 1} / ${filtered.length}`;
  }
  // END renderCurrent
  function open(index, button) { currentIndex = index; opener = button; renderCurrent(); modal.show(); }
  function step(offset) { currentIndex += offset; renderCurrent(); }
  imageEl.addEventListener('error', () => { imageEl.hidden = true; failure.hidden = false; });
  document.getElementById('photoNextBtn').addEventListener('click', () => step(1));
  document.getElementById('photoPrevBtn').addEventListener('click', () => step(-1));
  modalEl.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  });
  modalEl.addEventListener('hidden.bs.modal', () => { imageEl.removeAttribute('src'); if (opener?.isConnected) opener.focus(); });

  // BEGIN renderArchive
  function renderArchive() {
    filtered = selectArchive(archiveImages, category);
    const fragment = document.createDocumentFragment();
    filtered.slice(0, visibleCount).forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'gallery-item'; button.dataset.category = image.category;
      button.setAttribute('aria-label', `Открыть: ${image.title}. ${image.label}`);
      const frame = document.createElement('div'); frame.className = 'gallery-image';
      const picture = document.createElement('img');
      picture.src = image.file; picture.alt = image.title; picture.width = image.width; picture.height = image.height;
      picture.loading = 'lazy'; picture.decoding = 'async'; frame.append(picture);
      const heading = document.createElement('h3'); heading.className = 'gallery-item__title'; heading.textContent = image.title;
      const meta = document.createElement('p'); meta.className = 'gallery-item__exif'; meta.textContent = image.label;
      button.append(frame, heading, meta); button.addEventListener('click', () => open(index, button)); fragment.append(button);
    });
    root.replaceChildren(fragment);
    result.textContent = `Показано ${Math.min(visibleCount, filtered.length)} из ${filtered.length}`;
    more.hidden = visibleCount >= filtered.length;
  }
  // END renderArchive
  document.querySelectorAll('.filter-btn').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter; visibleCount = PAGE_SIZE;
    document.querySelectorAll('.filter-btn').forEach(item => {
      const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
    });
    renderArchive();
  }));
  more.addEventListener('click', () => {
    const before = Math.min(visibleCount, filtered.length); visibleCount += PAGE_SIZE; renderArchive();
    root.children[before]?.focus();
  });
  renderArchive();
}
// END initGalleryLightbox
