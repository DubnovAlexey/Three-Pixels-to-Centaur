// =====================================================================
// FILE: js/main.js
// PURPOSE: initialize «Три пикселя до Центавра» once after DOM readiness.
// SECTIONS: imports; initialization. Speech synthesis and legacy hum players
// are deliberately absent; one shared user-started playlist owns background audio.
// =====================================================================
import { initFontSizeControls } from './fontSize.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initScrollReveal } from './scrollReveal.js';
import { initScrollEffects } from './scrollEffects.js';
import { initGalleryLightbox } from './galleryLightbox.js';
import { initPlaylistPlayer } from './playlistPlayer.js';
import { initCourseModal } from './courseModal.js';
import { initInstructorModal } from './instructorModal.js';
import { initContactForm } from './contactForm.js';
import { initNewsletterForm } from './newsletterForm.js';
import { initSpaceSafariFacts } from './spaceSafari.js';

// BEGIN initializePage
document.addEventListener('DOMContentLoaded', () => {
  initFontSizeControls(); initSmoothScroll(); initScrollEffects();
  document.documentElement.classList.add('js-reveal'); initScrollReveal();
  initGalleryLightbox(); let music;
  void initPlaylistPlayer().then(controller => { music = controller; });
  initCourseModal(); initInstructorModal(); initContactForm(); initNewsletterForm(); initSpaceSafariFacts();
  const video = document.getElementById('fieldVideo');
  // A user starts the video explicitly; pause music without automatically resuming it.
  video?.addEventListener('play', () => music?.pause());
  document.getElementById('playlistAudio')?.addEventListener('playing', () => video?.pause());
  window.addEventListener('pagehide', () => video?.pause());
});
// END initializePage
