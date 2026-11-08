// =====================================================================
// FILE: js/galleryLightbox.js
// PURPOSE: progressive supplied-image archive, semantic filters and full-size modal.
// SECTIONS: 1 selection; 2 accessible cards; 3 modal navigation/keyboard; 4 init.
// Original image files are used; captions distinguish studies and illustrations.
// =====================================================================
import { archiveImages } from './mediaCatalog.js';
import { archiveDescriptions } from './archiveDescriptions.js';
import { CARD_SIZES, setCardImage } from './imageCard.js';
import { t,localText,onLanguageChange } from './i18n.js';

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
    imageEl.src = current.file; imageEl.alt = localText(current.titles ?? current.title);
    titleEl.textContent = localText(current.titles ?? current.title);
    // Подпись к работе: своя из каталога или шуточная из archiveDescriptions.js
    const extra = archiveDescriptions[current.id];
    const description = current.descriptions ?? (extra && {ru: extra[0], en: extra[1], he: extra[2]});
    document.getElementById("photoModalDescription").textContent = description ? localText(description) : "";
    caption.textContent = `${t(current.label)} · ${currentIndex + 1} / ${filtered.length}`;
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
      button.setAttribute('aria-label', t('Открыть: {title}. {label}',{title:localText(image.titles ?? image.title),label:t(image.label)}));
      const frame = document.createElement('div'); frame.className = 'gallery-image';
      const picture = document.createElement('img');
      picture.alt = localText(image.titles ?? image.title); picture.width = image.width; picture.height = image.height;
      picture.loading = 'lazy'; picture.decoding = 'async';
      // В сетке — лёгкая копия, в просмотре целиком (renderCurrent) — оригинал
      setCardImage(picture, image.file, CARD_SIZES.archive);
      // Заметная подсказка, что работу можно открыть целиком
      const badge = document.createElement('span'); badge.className = 'gallery-open'; badge.setAttribute('aria-hidden', 'true');
      badge.textContent = t('Рассмотреть ⤢');
      frame.append(picture, badge);
      const heading = document.createElement('h3'); heading.className = 'gallery-item__title'; heading.textContent = localText(image.titles ?? image.title);
      const meta = document.createElement('p'); meta.className = 'gallery-item__exif'; meta.textContent = t(image.label);
      button.append(frame, heading, meta); button.addEventListener('click', () => open(index, button)); fragment.append(button);
    });
    root.replaceChildren(fragment);
    result.textContent = t('Показано {shown} из {total}',{shown:Math.min(visibleCount,filtered.length),total:filtered.length});
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
  onLanguageChange(() => { renderArchive(); opener = root.children[currentIndex] ?? opener; if (modalEl.classList.contains("show")) renderCurrent(); });
  renderArchive();
}
// END initGalleryLightbox
