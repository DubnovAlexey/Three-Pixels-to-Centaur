// =====================================================================
// FILE: tools/update-media-manifest.mjs
// PURPOSE: rescan assets/audio without dependencies, conversion or file renames.
// SECTIONS: inputs; readable-audio detection; atomic manifest outputs.
// Existing descriptive titles/order are retained; missing/corrupt files are not played.
// =====================================================================
import { readFile, readdir, stat, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const audioFolder = path.join(root, 'assets/audio');
const manifestPath = path.join(root, 'assets/media-manifest.json');
const playlistPath = path.join(root, 'assets/playlist.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const old = new Map((manifest.audio ?? []).map(item => [item.file, item]));
const files = (await readdir(audioFolder)).filter(name => /\.(mp3|mpeg|mp4|m4a|ogg|wav)$/i.test(name) &&
  !['ambient.wav', 'space-ambient.wav'].includes(name));
const previousOrder = new Map((manifest.audio ?? []).map((item, index) => [item.file, index]));
files.sort((a, b) => (previousOrder.get('assets/audio/' + a) ?? 10000) - (previousOrder.get('assets/audio/' + b) ?? 10000) || a.localeCompare(b));
const tracks = [], unavailable = [];
for (const name of files) {
  const file = 'assets/audio/' + name;
  try {
    const bytes = await readFile(path.join(audioFolder, name));
    const info = await stat(path.join(audioFolder, name));
    const previous = old.get(file) ?? {};
    const metadata = { ...(previous.metadata ?? {}) };
    delete metadata.integrity; delete metadata.error;
    const mp4 = /\.(mp4|m4a)$/i.test(name), ogg = /\.ogg$/i.test(name), wav = /\.wav$/i.test(name);
    tracks.push({ ...previous, id: previous.id ?? path.parse(name).name, original: previous.original ?? name,
      file, title: previous.title ?? path.parse(name).name.replace(/[-_]+/g, ' '),
      mime: mp4 ? 'audio/mp4' : ogg ? 'audio/ogg' : wav ? 'audio/wav' : 'audio/mpeg',
      bytes: info.size, sha256: createHash('sha256').update(bytes).digest('hex'), metadata });
  } catch { unavailable.push(file); }
}
manifest.audio = tracks;
// BEGIN writeJson: complete temp file before replacing either generated manifest.
async function writeJson(file, value) {
  const temporary = file + '.tmp';
  await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', 'utf8');
  await rename(temporary, file);
}
// END writeJson
await writeJson(manifestPath, manifest);
await writeJson(playlistPath, tracks);
console.log(`Playlist updated: ${tracks.length} readable files, ${unavailable.length} unavailable; original media bytes unchanged.`);
if (unavailable.length) console.log('Unavailable:', unavailable.join(', '));
