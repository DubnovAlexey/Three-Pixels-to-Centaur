// =====================================================================
// МОДУЛЬ: ambientPlayer.js
// Управление фоновым звуком через <audio> (HTMLMediaElement): play()/pause()/
// volume — классический Audio API, в отличие от синтеза в audioEffects.js.
// Функция принимает набор id элементов и настраивает ОДИН плеер — на сайте
// используется дважды (студийная атмосфера + космический эмбиент) с разными
// id, без копирования кода.
// =====================================================================

import { getAudioContext } from './utils.js';

export function initAmbientPlayer({ audioId, toggleId, iconId, volumeId }) {
  const ambient = document.getElementById(audioId);
  const toggleBtn = document.getElementById(toggleId);
  const icon = document.getElementById(iconId);
  const volumeSlider = document.getElementById(volumeId);
  const player = toggleBtn.closest('.audio-player');

  ambient.volume = volumeSlider.value / 100;
  // НАЧАЛО ФУНКЦИИ syncPlaybackState
  // Значок отражает фактическое состояние media, включая отказ play() или ошибку файла.
  const syncPlaybackState = () => {
    const playing = !ambient.paused && !ambient.error;
    icon.className = playing ? 'bi bi-pause-fill' : 'bi bi-play-fill';
    player.classList.toggle('is-paused', !playing);
    toggleBtn.setAttribute('aria-pressed', String(playing));
  };
  // КОНЕЦ ФУНКЦИИ syncPlaybackState
  syncPlaybackState();
  for (const event of ['playing', 'pause', 'ended', 'error']) ambient.addEventListener(event, syncPlaybackState);
  toggleBtn.addEventListener('click', async () => {
    getAudioContext();
    if (!ambient.paused) { ambient.pause(); return; }
    toggleBtn.disabled = true;
    try { await ambient.play(); }
    catch { ambient.pause(); } // Например, файл недоступен: интерфейс остаётся в состоянии паузы.
    finally { toggleBtn.disabled = false; syncPlaybackState(); }
  });
  volumeSlider.addEventListener('input', () => { ambient.volume = volumeSlider.value / 100; });
}
