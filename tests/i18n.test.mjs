// =====================================================================
// FILE: tests/i18n.test.mjs
// PURPOSE: the site speaks five languages (RU source + EN, HE, ES, FR) everywhere: dictionary, data cards,
// archive captions and titles. Placeholders survive translation, and French keeps its no-break space
// (U+00A0) before : ; ? ! and inside « » — so a new string cannot slip in half-translated.
// =====================================================================
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../js/translations.js';
import { archiveDescriptions } from '../js/archiveDescriptions.js';
import { archiveImages } from '../js/mediaCatalog.js';
import { personnel } from '../js/personnelData.js';
import { videoEntries } from '../js/videoCatalog.js';
import * as crewData from '../js/crewData.js';
import * as fleetData from '../js/fleetData.js';
import { supportedLanguages, t } from '../js/i18n.js';

const TRANSLATED = ['en', 'he', 'es', 'fr'];
const placeholders = text => (text.match(/\{\w+\}/g) ?? []).sort().join();

// Every object with a Russian `ru` field is a localized value: {ru, en, he, es, fr}.
function* localized(node, path) {
  if (Array.isArray(node)) { for (const [i, item] of node.entries()) yield* localized(item, `${path}[${i}]`); return; }
  if (!node || typeof node !== 'object') return;
  if (typeof node.ru === 'string') { yield [path, node]; return; }
  for (const [key, value] of Object.entries(node)) yield* localized(value, `${path}.${key}`);
}
const dataValues = [...localized({ archiveImages, personnel, videoEntries, crewData: { ...crewData }, fleetData: { ...fleetData } }, 'data')];

test('the language switch offers exactly the five languages', () => {
  assert.deepEqual([...supportedLanguages].sort(), ['en', 'es', 'fr', 'he', 'ru']);
});

test('every dictionary entry exists in EN, HE, ES and FR with the same placeholders', () => {
  for (const [ru, entry] of Object.entries(translations)) {
    for (const lang of TRANSLATED) {
      assert.ok(entry[lang]?.trim(), `${lang} missing for «${ru}»`);
      assert.equal(placeholders(entry[lang]), placeholders(ru), `${lang} placeholders differ for «${ru}»`);
    }
  }
});

test('every data card value and archive caption exists in all five languages', () => {
  assert.ok(dataValues.length > 300, `only ${dataValues.length} localized values found`);
  for (const [path, value] of dataValues) {
    for (const lang of ['ru', ...TRANSLATED]) assert.ok(value[lang]?.trim(), `${path}.${lang} is missing`);
  }
  for (const [id, captions] of Object.entries(archiveDescriptions)) {
    assert.equal(captions.length, 5, `${id} needs [RU, EN, HE, ES, FR]`);
    captions.forEach((caption, i) => assert.ok(caption.trim(), `${id}[${i}] is empty`));
  }
});

test('archive titles and labels without their own translations are in the dictionary', () => {
  for (const image of archiveImages) {
    if (!image.titles) assert.ok(translations[image.title]?.fr, `title «${image.title}» (${image.id}) is not translated`);
    assert.ok(translations[image.label]?.fr, `label «${image.label}» is not translated`);
  }
});

test('French keeps a no-break space before : ; ? ! and inside « »', () => {
  const french = [
    ...Object.values(translations).map(entry => entry.fr),
    ...dataValues.map(([, value]) => value.fr),
    ...Object.values(archiveDescriptions).map(captions => captions[4]),
  ];
  for (const text of french) {
    assert.doesNotMatch(text, /[^ ?!][:;?!]/, `missing no-break space: ${text}`);
    assert.doesNotMatch(text, /«(?! )|(?<! )»/, `guillemets need inner no-break spaces: ${text}`);
  }
});

test('t() returns the chosen language and falls back to the Russian source', () => {
  assert.equal(t('Экипаж: {count}', { count: 5 }, 'es'), 'Tripulación: 5');
  assert.equal(t('Экипаж: {count}', { count: 5 }, 'fr'), 'Équipage : 5');
  assert.equal(t('Экипаж: {count}', { count: 5 }, 'xx'), 'Экипаж: 5');
});
