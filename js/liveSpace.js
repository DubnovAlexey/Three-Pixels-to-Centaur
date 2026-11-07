// =====================================================================
// FILE: js/liveSpace.js
// PURPOSE: small "living" details for «Три пикселя до Центавра»: a starfield behind the page,
// letter scrambles on short mono captions, a light 3D tilt of cards and a ticking hero telemetry line.
// SECTIONS: 1 shared helpers; 2 starfield canvas; 3 letter scramble; 4 card tilt; 5 telemetry; 6 init.
// Everything is decorative (aria-hidden or text that ends exactly as it started), stops while the tab
// is hidden and stays still when the visitor asks the system to reduce motion.
// =====================================================================
import { t, getLanguage, onLanguageChange } from './i18n.js';

// BEGIN SECTION 1 — shared helpers
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const random = (min, max) => min + Math.random() * (max - min);
// END SECTION 1

// BEGIN SECTION 2 — starfield canvas
// One canvas behind all sections: twinkling stars with a slight scroll parallax, a rare shooting star
// and, once in a while, the brand's three pixels drifting across the sky.
function initStarfield() {
  const canvas = document.createElement('canvas');
  canvas.className = 'live-starfield';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const context = canvas.getContext('2d');
  if (!context) return;
  let width = 0, height = 0, ratio = 1, stars = [], meteor = null, pixels = null, frame = 0, last = 0;
  let nextMeteor = performance.now() + random(3000, 7000), nextPixels = performance.now() + random(9000, 15000);

  function resize() {
    ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth; height = innerHeight;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(260, Math.round(width * height / 5200));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height * 1.6,
      r: random(.3, 1.35), depth: random(.05, .35), phase: random(0, Math.PI * 2), speed: random(.6, 2.2),
      tint: Math.random() < .14 ? '204,157,120' : Math.random() < .3 ? '167,223,237' : '238,240,233',
    }));
    if (motion.matches) draw(performance.now());
  }

  function draw(now) {
    context.clearRect(0, 0, width, height);
    for (const star of stars) {
      const y = ((star.y - scrollY * star.depth) % (height * 1.6) + height * 1.6) % (height * 1.6);
      if (y > height) continue;
      const alpha = motion.matches ? .55 : .35 + .45 * (0.5 + 0.5 * Math.sin(now / 1000 * star.speed + star.phase));
      context.fillStyle = `rgba(${star.tint},${alpha.toFixed(3)})`;
      context.beginPath(); context.arc(star.x, y, star.r, 0, Math.PI * 2); context.fill();
    }
    if (meteor) {
      const age = (now - meteor.start) / meteor.life;
      if (age >= 1) meteor = null;
      else {
        const x = meteor.x + meteor.dx * age, y = meteor.y + meteor.dy * age;
        const gradient = context.createLinearGradient(x, y, x - meteor.dx * .18, y - meteor.dy * .18);
        gradient.addColorStop(0, `rgba(238,240,233,${(1 - age).toFixed(3)})`);
        gradient.addColorStop(1, 'rgba(167,223,237,0)');
        context.strokeStyle = gradient; context.lineWidth = 1.4;
        context.beginPath(); context.moveTo(x, y); context.lineTo(x - meteor.dx * .18, y - meteor.dy * .18); context.stroke();
      }
    }
    if (pixels) {
      const age = (now - pixels.start) / pixels.life;
      if (age >= 1) pixels = null;
      else {
        const x = pixels.from + (pixels.to - pixels.from) * age;
        const y = pixels.y + Math.sin(age * Math.PI * 3) * 14;
        ['#a7dfed', '#cc9d78', '#eef0e9'].forEach((color, index) => {
          context.fillStyle = color;
          context.globalAlpha = .75 * Math.sin(age * Math.PI);
          context.fillRect(x + index * 7, y + Math.sin(now / 180 + index) * 2, 4, 4);
        });
        context.globalAlpha = 1;
      }
    }
  }

  function tick(now) {
    frame = 0;
    if (document.hidden || motion.matches) return;
    if (now - last > 1000 / 40) { // about 40 fps is plenty for a slow sky and saves battery
      last = now;
      if (!meteor && now > nextMeteor) {
        const fromLeft = Math.random() < .5;
        meteor = { start: now, life: random(700, 1200), x: fromLeft ? random(0, width * .5) : random(width * .5, width),
          y: random(0, height * .45), dx: (fromLeft ? 1 : -1) * random(260, 420), dy: random(120, 220) };
        nextMeteor = now + random(6000, 13000);
      }
      if (!pixels && now > nextPixels) {
        const rtl = document.documentElement.dir === 'rtl';
        pixels = { start: now, life: random(9000, 14000), from: rtl ? width + 30 : -30, to: rtl ? -30 : width + 30, y: random(height * .15, height * .8) };
        nextPixels = now + random(22000, 36000);
      }
      draw(now);
    }
    frame = requestAnimationFrame(tick);
  }
  const start = () => { if (!frame && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick); };
  addEventListener('resize', resize, { passive: true });
  addEventListener('scroll', () => { if (motion.matches) draw(performance.now()); }, { passive: true });
  document.addEventListener('visibilitychange', start);
  motion.addEventListener('change', () => { resize(); start(); });
  resize(); start();
}
// END SECTION 2

// BEGIN SECTION 3 — letter scramble
// Works on text nodes, so markup such as <br> or <em> stays untouched. A running scramble stops at
// once if something else (for example a language switch) rewrites the same node.
const glyphs = {
  ru: 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ0123456789#%*+=<>',
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*+=<>',
  he: 'אבגדהוזחטיכלמנסעפצקרשת0123456789',
};
const running = new Map();

function scramble(element, duration = 900) {
  if (motion.matches || running.has(element)) return;
  const nodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  for (let node; (node = walker.nextNode());) if (node.data.trim()) nodes.push({ node, target: node.data, written: node.data });
  if (!nodes.length) return;
  const set = glyphs[getLanguage()] || glyphs.en;
  const total = nodes.reduce((sum, item) => sum + item.target.length, 0);
  const begin = performance.now();
  const job = { frame: 0 };
  running.set(element, job);
  // Random glyphs have other widths than the real letters: hold the box so neighbours do not jump.
  const previousMinWidth = element.style.minWidth;
  element.style.minWidth = `${element.getBoundingClientRect().width}px`;
  const finish = (restore) => {
    cancelAnimationFrame(job.frame); running.delete(element);
    element.style.minWidth = previousMinWidth;
    // Only nodes nobody else rewrote get their text back; a translated node keeps the translation.
    if (restore) for (const item of nodes) if (item.node.data === item.written) item.node.data = item.target;
  };
  job.cancel = () => finish(true);
  function step(now) {
    const progress = Math.min(1, (now - begin) / duration);
    let offset = 0;
    for (const item of nodes) {
      if (item.node.data !== item.written) { finish(true); return; } // rewritten from outside: give way
      let text = '';
      for (let index = 0; index < item.target.length; index += 1) {
        const char = item.target[index];
        const settled = (offset + index) / total < progress * 1.15 - .15;
        text += settled || /\s|[.,:;!?·/—–\-«»"'()↗↓]/.test(char) ? char : set[Math.floor(Math.random() * set.length)];
      }
      offset += item.target.length;
      item.node.data = text; item.written = text;
    }
    if (progress < 1) job.frame = requestAnimationFrame(step); else finish(true);
  }
  job.frame = requestAnimationFrame(step);
}

function initScramble() {
  const captions = [...document.querySelectorAll('.eyebrow, .hero-bottom span, .hero-art figcaption span, .footer-bottom span')]
    .filter(element => !element.closest('.modal') && element.id !== 'liveTelemetry');
  const seen = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.toggleAttribute('data-live-visible', entry.isIntersecting);
      if (entry.isIntersecting && !entry.target.dataset.liveShown) { entry.target.dataset.liveShown = '1'; scramble(entry.target, 1100); }
    }
  }, { threshold: .6 });
  captions.forEach(element => seen.observe(element));
  // Navigation and buttons re-scramble on hover or keyboard focus.
  document.addEventListener('pointerover', event => {
    const target = event.target.closest('.navbar-space a, .footer-links a, .button-space, .filter-btn');
    if (target && !target.contains(event.relatedTarget)) scramble(target, 520);
  });
  document.addEventListener('focusin', event => {
    const target = event.target.closest('.navbar-space a, .button-space');
    if (target) scramble(target, 520);
  });
  // Every few seconds one visible caption "re-tunes" by itself, so the page never looks frozen.
  setInterval(() => {
    if (document.hidden) return;
    const visible = captions.filter(element => element.hasAttribute('data-live-visible'));
    if (visible.length) scramble(visible[Math.floor(Math.random() * visible.length)], 900);
  }, 4200);
  onLanguageChange(() => { for (const job of [...running.values()]) job.cancel(); });
}
// END SECTION 3

// BEGIN SECTION 4 — card tilt
// A light perspective tilt and a glare spot follow the mouse; touch screens and reduced motion skip it.
function initTilt() {
  const selector = '.curator-card, .video-card, .fleet-card, .workshop-card, .expedition-card, .archive-card, .gallery-item';
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || motion.matches) return;
    const card = event.target.closest(selector);
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
    card.classList.add('live-tilt');
    card.style.setProperty('--live-rx', `${((.5 - y) * 7).toFixed(2)}deg`);
    card.style.setProperty('--live-ry', `${((x - .5) * 9).toFixed(2)}deg`);
    card.style.setProperty('--live-mx', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--live-my', `${(y * 100).toFixed(1)}%`);
  }, { passive: true });
  document.addEventListener('pointerout', event => {
    const card = event.target.closest(selector);
    if (card && !card.contains(event.relatedTarget)) {
      card.classList.remove('live-tilt');
      ['--live-rx', '--live-ry', '--live-mx', '--live-my'].forEach(name => card.style.removeProperty(name));
    }
  });
}
// END SECTION 4

// BEGIN SECTION 5 — telemetry
// A tongue-in-cheek line in the hero: the distance to Centauri shrinks a little every second and the
// signal delay wanders. The numbers are invented and the line is hidden from screen readers.
function initTelemetry() {
  const line = document.getElementById('liveTelemetry');
  if (!line) return;
  let distance = 4.246512, ping = 42;
  const render = () => {
    const locale = { ru: 'ru-RU', en: 'en-GB', he: 'he-IL' }[getLanguage()] || 'en-GB';
    line.textContent = t('До Центавра {distance} св. лет · сигнал {ping} мс', {
      distance: distance.toLocaleString(locale, { minimumFractionDigits: 6, maximumFractionDigits: 6 }), ping,
    });
  };
  setInterval(() => {
    if (document.hidden || motion.matches) return;
    distance = Math.max(0.000001, distance - random(.000001, .000004));
    ping = Math.max(9, Math.min(99, Math.round(ping + random(-6, 6))));
    render();
  }, 1000);
  onLanguageChange(render); render();
}
// END SECTION 5

// BEGIN SECTION 6 — init
export function initLiveSpace() {
  initStarfield();
  initScramble();
  initTilt();
  initTelemetry();
}
// END SECTION 6
