// =====================================================================
// FILE: tests/image-previews.test.mjs
// PURPOSE: card previews exist, are lighter than their originals, and cards offer both by srcset.
// =====================================================================
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { imagePreviews } from '../js/imagePreviews.js';
import { setCardImage } from '../js/imageCard.js';

const file = relative => new URL(`../${relative}`, import.meta.url);

test('every preview exists, is 720 px wide and lighter than its original', () => {
  const entries = Object.entries(imagePreviews);
  assert.ok(entries.length > 50, `only ${entries.length} previews`);
  for (const [original, entry] of entries) {
    assert.ok(existsSync(file(entry.preview)), `missing ${entry.preview}`);
    assert.equal(entry.previewWidth, 720);
    assert.ok(entry.width > 720, `${original} is not wider than its preview`);
    assert.ok(statSync(file(entry.preview)).size < statSync(file(original)).size, `${entry.preview} is not lighter`);
  }
});

test('a card offers the preview and the original; an image without a preview keeps plain src', () => {
  const previews = { 'a.webp': { width: 2000, height: 1000, preview: 'p/a.webp', previewWidth: 720 } };
  const card = {};
  setCardImage(card, 'a.webp', '300px', previews);
  assert.deepEqual(card, { sizes: '300px', srcset: 'p/a.webp 720w, a.webp 2000w', src: 'a.webp' });
  const plain = {};
  setCardImage(plain, 'b.webp', '300px', previews);
  assert.deepEqual(plain, { src: 'b.webp' });
});

test('static card images in index.html point at existing previews', () => {
  const html = readFileSync(file('index.html'), 'utf8');
  const previews = [...html.matchAll(/srcset="(assets\/images\/preview\/[^ "]+)/g)].map(match => match[1]);
  assert.ok(previews.length >= 4);
  for (const preview of previews) assert.ok(existsSync(file(preview)), `missing ${preview}`);
});
