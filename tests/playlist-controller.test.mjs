// FILE: tests/playlist-controller.test.mjs
// PURPOSE: real controller lifecycle/error tests without browser/audio dependencies.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlaylistController } from '../js/playlistPlayer.js';

const tracks = [{ file: 'one.mp3', title: 'One' }, { file: 'two.mp4', title: 'Two' }, { file: 'three.mpeg', title: 'Three' }];
// BEGIN FakeMedia: deterministic media promises and native event surface.
class FakeMedia {
  paused = true; error = null; volume = .35; src = null; calls = []; listeners = new Map();
  constructor(playRule = () => Promise.resolve()) { this.playRule = playRule; }
  getAttribute() { return this.src; }
  setAttribute(_, value) { this.src = value; this.error = null; }
  removeAttribute() { this.src = null; }
  load() {}
  addEventListener(event, listener) { if (!this.listeners.has(event)) this.listeners.set(event, new Set()); this.listeners.get(event).add(listener); }
  removeEventListener(event, listener) { this.listeners.get(event)?.delete(listener); }
  emit(event) { for (const listener of this.listeners.get(event) ?? []) listener(); }
  pause() { this.paused = true; this.emit('pause'); }
  play() { this.calls.push(this.src); return this.playRule(this.src).then(() => { this.paused = false; this.emit('playing'); }); }
}
// END FakeMedia
const drain = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };

test('initialization is silent and a paused next/previous only selects a recording', async () => {
  const media = new FakeMedia(), player = createPlaylistController(media, tracks);
  assert.equal(media.calls.length, 0); assert.equal(media.src, null);
  await player.next(); assert.equal(player.getState().index, 1); assert.equal(media.calls.length, 0);
  await player.previous(); assert.equal(player.getState().index, 0); assert.equal(media.paused, true);
  player.dispose();
});
test('explicit play, next and final ended event continue the one shared playlist', async () => {
  const media = new FakeMedia(), player = createPlaylistController(media, tracks);
  await player.play(); assert.equal(player.getState().playing, true); assert.equal(media.src, 'one.mp3');
  await player.previous(); assert.equal(media.src, 'three.mpeg');
  media.paused = true; media.emit('ended'); await drain(); assert.equal(media.src, 'one.mp3');
  player.pause(); assert.equal(player.getState().intent, false); assert.equal(media.paused, true); player.dispose();
});
test('an unavailable file is skipped and a later good file plays', async () => {
  const media = new FakeMedia(src => src === 'one.mp3' ? Promise.reject(new Error('unavailable')) : Promise.resolve());
  const player = createPlaylistController(media, tracks);
  assert.equal(await player.play(), true); assert.deepEqual(media.calls, ['one.mp3', 'two.mp4']);
  assert.equal(player.getState().index, 1); player.dispose();
});
test('all unavailable recordings stop after one bounded pass without an infinite loop', async () => {
  const media = new FakeMedia(() => Promise.reject(new Error('unavailable'))), player = createPlaylistController(media, tracks);
  assert.equal(await player.play(), false); assert.equal(media.calls.length, tracks.length);
  assert.equal(player.getState().intent, false); assert.equal(player.getState().pending, false);
  assert.match(player.getState().error, /Не удалось/); await drain(); assert.equal(media.calls.length, tracks.length); player.dispose();
});
test('autoplay denial pauses without skipping every valid recording', async () => {
  const reason = new Error('gesture required'); reason.name = 'NotAllowedError';
  const media = new FakeMedia(() => Promise.reject(reason)), player = createPlaylistController(media, tracks);
  assert.equal(await player.play(), false); assert.equal(media.calls.length, 1);
  assert.match(player.getState().error, /Play/); player.dispose();
});
test('pause cancels a pending play chain and does not enter an error-recovery loop', async () => {
  let finish;
  const media = new FakeMedia(() => new Promise(resolve => { finish = resolve; })), player = createPlaylistController(media, tracks);
  const pending = player.play(); player.pause(); finish(); await pending; await drain();
  // Native pause rejects a pending play; this deliberately hostile fake resolves it.
  assert.equal(player.getState().intent, false); assert.equal(player.getState().pending, false);
  assert.equal(media.calls.length, 1); assert.equal(media.paused, true); player.dispose();
});
test('a later media error recovers once and dispose detaches event listeners', async () => {
  const media = new FakeMedia(), player = createPlaylistController(media, tracks);
  await player.play(); media.error = new Error('late decode error'); media.emit('error'); await drain();
  assert.equal(media.src, 'two.mp4'); assert.equal(player.getState().playing, true);
  player.dispose(); const count = media.calls.length; media.emit('ended'); media.emit('error'); await drain();
  assert.equal(media.calls.length, count); assert.equal(media.src, null);
  assert.equal([...media.listeners.values()].reduce((sum, set) => sum + set.size, 0), 0);
});
test('manifest entries explicitly marked unreadable are not selected for playback', async () => {
  const media = new FakeMedia(), player = createPlaylistController(media, [{ file: 'bad.mpeg', metadata: { integrity: 'unreadable' } }, ...tracks]);
  assert.equal(player.getState().count, 3); await player.play(); assert.equal(media.src, 'one.mp3'); player.dispose();
});

test('late errors exhaust one recovery chain even when each play promise first resolves', async () => {
  const media = new FakeMedia(), player = createPlaylistController(media, tracks);
  await player.play();
  for (let index = 0; index < tracks.length; index++) {
    media.error = new Error('decoder failed after playback began');
    media.emit('error'); await drain();
  }
  assert.deepEqual(media.calls, ['one.mp3', 'two.mp4', 'three.mpeg']);
  assert.equal(player.getState().intent, false); assert.equal(media.paused, true);
  assert.equal(player.getState().pending, false); assert.match(player.getState().error, /Не удалось/);
  media.emit('error'); media.emit('ended'); await drain();
  assert.equal(media.calls.length, tracks.length);
  // A deliberate retry is allowed to test the recordings again.
  assert.equal(await player.play(), true); assert.equal(media.calls.length, tracks.length + 1);
  player.dispose();
});
test('a normal ended event clears earlier failures and permits a new playlist cycle', async () => {
  let firstFailure = true;
  const media = new FakeMedia(src => {
    if (src === 'one.mp3' && firstFailure) { firstFailure = false; return Promise.reject(new Error('temporary failure')); }
    return Promise.resolve();
  });
  const player = createPlaylistController(media, tracks);
  await player.play(); assert.equal(media.src, 'two.mp4');
  media.error = new Error('late decoder failure'); media.emit('error'); await drain();
  assert.equal(media.src, 'three.mpeg');
  media.paused = true; media.emit('ended'); await drain();
  assert.equal(media.src, 'one.mp3'); assert.equal(player.getState().playing, true);
  assert.deepEqual(media.calls, ['one.mp3', 'two.mp4', 'three.mpeg', 'one.mp3']);
  player.dispose();
});
