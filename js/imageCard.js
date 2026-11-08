// =====================================================================
// FILE: js/imageCard.js
// PURPOSE: a card image chooses a light 720-px preview or the original file by card width and
// screen pixel density (srcset + sizes). Full-size views keep using the original file directly.
// SECTIONS: 1 card widths; 2 setCardImage.
// Previews are made by tools/make-image-previews.mjs (npm run images:previews).
// =====================================================================
import { imagePreviews } from './imagePreviews.js';

// BEGIN card widths: how wide a card is on the screen (css/observatory.css, css/expedition-features.css)
export const CARD_SIZES = {
  archive: '(max-width: 767px) 46vw, (max-width: 991px) 31vw, 300px',
  curator: '(max-width: 991px) 46vw, 300px',
  fleet: '(max-width: 767px) 92vw, (max-width: 991px) 46vw, 410px',
};
// END card widths

// BEGIN setCardImage
/** Sets srcset (preview + original) and sizes when a preview exists, then the original as plain src. */
export function setCardImage(img, file, sizes, previews = imagePreviews) {
  const entry = previews[file];
  if (entry) {
    img.sizes = sizes;
    img.srcset = `${entry.preview} ${entry.previewWidth}w, ${file} ${entry.width}w`;
  }
  img.src = file;
}
// END setCardImage
