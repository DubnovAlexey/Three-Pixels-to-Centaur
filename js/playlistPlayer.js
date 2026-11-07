// =====================================================================
// FILE: js/playlistPlayer.js
// PURPOSE: one gesture-started playlist for supplied MP3/MPEG/MP4 audio.
// SECTIONS: 1 pure media controller; 2 DOM adapter and static manifest load.
// Failures are bounded by playlist length; stale play promises cannot restart audio.
// =====================================================================

import { t,onLanguageChange } from './i18n.js';

// BEGIN createPlaylistController
export function createPlaylistController(media, inputTracks, onChange = () => {}) {
  const tracks = inputTracks.filter(track => track && typeof track.file === 'string' && track.metadata?.integrity !== 'unreadable');
  let index = 0, intent = false, pending = false, error = '', revision = 0, disposed = false;
  let rejectAttempt = null;
  const failed = new Set();
  const state = () => ({ index, track: tracks[index] ?? null, count: tracks.length, playing: !media.paused && !media.error,
    pending, error, volume: media.volume, intent });
  const publish = () => { if (!disposed) onChange(state()); };
  const cancelAttempt = () => { revision++; const reject = rejectAttempt; rejectAttempt = null; reject?.(new Error('superseded')); };

  // BEGIN attemptPlayback: at most one pass over failed tracks per recovery chain.
  async function attemptPlayback(start, resetFailures = true) {
    cancelAttempt();
    const ticket = revision;
    if (resetFailures) failed.clear();
    if (!tracks.length || disposed) { intent = false; error = 'В бортовом архиве пока нет записей.'; publish(); return false; }
    intent = true; pending = true; error = '';
    index = ((start % tracks.length) + tracks.length) % tracks.length;
    while (failed.size < tracks.length && intent && ticket === revision && !disposed) {
      if (failed.has(index)) { index = (index + 1) % tracks.length; continue; }
      const track = tracks[index];
      if (media.getAttribute('src') !== track.file) { media.pause(); media.setAttribute('src', track.file); media.load(); }
      publish();
      try {
        const failure = new Promise((_, reject) => { rejectAttempt = reject; });
        // play is called before the first await, preserving the initiating user gesture.
        await Promise.race([Promise.resolve(media.play()), failure]);
        if (ticket !== revision || disposed || !intent) return false;
        // A fulfilled play promise can still be followed by a late decoder error.
        // Preserve this recovery chain's failed set until an explicit action or
        // a normally completed track starts the next chain.
        rejectAttempt = null; pending = false; error = ''; publish(); return true;
      } catch (reason) {
        if (ticket !== revision || disposed || !intent) return false;
        rejectAttempt = null;
        if (reason?.name === 'NotAllowedError') {
          intent = false; pending = false; error = 'Браузер просит ещё раз нажать Play.'; media.pause(); publish(); return false;
        }
        failed.add(index); index = (index + 1) % tracks.length;
        error = 'Запись недоступна. Пробуем следующую.';
      }
    }
    if (ticket === revision && !disposed) {
      intent = false; pending = false; media.pause();
      error = 'Не удалось открыть записи. Попробуйте позже или выберите другой трек.'; publish();
    }
    return false;
  }
  // END attemptPlayback

  function pause() { intent = false; pending = false; cancelAttempt(); media.pause(); publish(); }
  function select(offset) {
    if (!tracks.length || disposed) return Promise.resolve(false);
    const next = (index + offset + tracks.length) % tracks.length;
    if (intent || !media.paused) return attemptPlayback(next);
    cancelAttempt(); index = next; error = ''; media.pause();
    media.setAttribute('src', tracks[index].file); publish(); return Promise.resolve(true);
  }
  function onError() {
    if (disposed) return;
    if (rejectAttempt) { rejectAttempt(new Error('media unavailable')); return; }
    if (intent) { failed.add(index); void attemptPlayback((index + 1) % tracks.length, false); }
    else { pending = false; error = 'Эта запись недоступна. Можно выбрать следующую.'; publish(); }
  }
  const handlers = { playing: () => { if (!intent) media.pause(); publish(); }, pause: publish, ended: () => { if (intent) void attemptPlayback((index + 1) % tracks.length); }, error: onError };
  for (const [event, listener] of Object.entries(handlers)) media.addEventListener(event, listener);
  publish();
  return {
    play: () => attemptPlayback(index), pause,
    toggle: () => intent || !media.paused ? (pause(), Promise.resolve(false)) : attemptPlayback(index),
    next: () => select(1), previous: () => select(-1), getState: state,
    setVolume(value) { media.volume = Math.max(0, Math.min(1, Number(value) || 0)); publish(); },
    dispose() { if (disposed) return; pause(); disposed = true; for (const [event, listener] of Object.entries(handlers)) media.removeEventListener(event, listener); media.removeAttribute('src'); media.load(); }
  };
}
// END createPlaylistController

// BEGIN initPlaylistPlayer
export async function initPlaylistPlayer() {
  const media = document.getElementById('playlistAudio');
  const play = document.getElementById('playlistToggle');
  const previous = document.getElementById('playlistPrevious');
  const next = document.getElementById('playlistNext');
  const volume = document.getElementById('playlistVolume');
  const title = document.getElementById('playlistTitle');
  const status = document.getElementById('playlistStatus');
  const counter = document.getElementById('playlistCounter');
  if (!media || !play) return;
  let controller;
  try {
    const response = await fetch('assets/playlist.json');
    if (!response.ok) throw new Error('playlist unavailable');
    const tracks = await response.json();
    if (!Array.isArray(tracks)) throw new Error('invalid playlist');
    media.volume = Number(volume.value) / 100;
    const render = state => {
      title.textContent = state.track?.title || t('Бортовая волна');
      counter.textContent = state.count ? `${String(state.index + 1).padStart(2, '0')} / ${String(state.count).padStart(2, '0')}` : '00 / 00';
      play.textContent = state.pending ? '…' : state.playing ? 'Ⅱ' : '▶';
      play.setAttribute('aria-label', t(state.playing || state.pending ? 'Остановить бортовую волну' : 'Включить бортовую волну'));
      play.setAttribute('aria-pressed', String(state.playing));
      status.textContent = t(state.error || (state.pending ? 'Подключаемся к бортовому архиву…' : state.playing ? 'В эфире. Остальная галактика может подождать.' : 'Музыка включается только по вашему желанию.'));
    };
    controller = createPlaylistController(media, tracks, render);
    onLanguageChange(() => render(controller.getState()));
    play.disabled = previous.disabled = next.disabled = !controller.getState().count;
    play.addEventListener('click', () => { void controller.toggle(); });
    previous.addEventListener('click', () => { void controller.previous(); });
    next.addEventListener('click', () => { void controller.next(); });
    volume.addEventListener('input', () => controller.setVolume(Number(volume.value) / 100));
    window.addEventListener('pagehide', () => controller.pause());
  } catch {
    title.textContent = t('Бортовая волна временно молчит');
    status.textContent = t('Список записей пока недоступен. Остальные разделы работают.');
  }
  return controller;
}
// END initPlaylistPlayer
