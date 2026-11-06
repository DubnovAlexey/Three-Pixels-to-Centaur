# Photo Club "Obektiv"

[English](#english) · [Русский](#russian) · [עברית](#hebrew)

<a name="english"></a>

## English

A landing page for a photography school: courses and workshops, a gallery of students' work, photo trips (including a "space safari"), the team, reviews, FAQ and contact forms. The largest of my HTML/CSS/JavaScript landing pages.

**Live demo:** https://dubnovalexey.github.io/photoclub-objectiv/

### Quick tour

Filter the gallery and open a photo, inspect a course or instructor, then try the theme/font-size controls. Contact and newsletter forms demonstrate validation only: they do not send or save a request.

Start with `js/main.js` and its feature modules; gallery/details use Bootstrap Modal, and sounds use the shared Web Audio helper in `js/utils.js`. Serve the ES modules over HTTP. Browser speech voices and CDN resources vary by environment.

The language links above switch the documentation; they do not translate the existing demo interface.

### Features

- Ten sections: about, gallery, best shots, destinations, space safari, courses, team, reviews, FAQ, contact.
- A gallery with category filters and a lightbox.
- Course and instructor details in modal windows; contact and newsletter forms with an explicit demonstration result, without sending data.
- Light and dark theme (Bootstrap colour modes) and a font size control.
- Read-aloud of texts with the browser's speech synthesis.
- Scroll reveal animations, smooth scrolling and space background effects.
- Ambient audio assets are generated locally with the Node scripts in `tools/generate-*.js`.

### Tech stack

HTML5 · CSS3 · Bootstrap 5 · JavaScript modules (DOM, Bootstrap Modal, Web Speech API, Web Audio, Intersection Observer) · Node.js scripts · GitHub Pages

### Run locally

Serve this folder over HTTP, for example with `npm start` or `python -m http.server 8000 --bind 127.0.0.1`, then open the printed local address. ES-module imports do not reliably load from `file://`.

The ambient controls follow the actual media playback state. A rejected or unavailable audio source leaves the player paused and does not produce an unhandled playback promise.

### Planned improvements

These are proposals, not currently implemented features.

- Visual: replace placeholder images with selected credited photographs and improve gallery loading/focus states.
- Engineering: keep local dependency builds reproducible and add browser checks for modal focus, speech cancellation and form states.
- Functionality: add a JSON course schedule with level filters; implement real booking only with an explicitly chosen backend.

---

<a name="russian"></a>

## Русский

**Фотоклуб «Объектив»**

Лендинг школы фотографии: курсы и мастер-классы, галерея работ учеников, фотопоездки (в том числе «космическое сафари»), команда, отзывы, вопросы и ответы, формы связи. Самый большой из моих лендингов на HTML, CSS и JavaScript.

**Демо:** https://dubnovalexey.github.io/photoclub-objectiv/

### Быстрый просмотр

Отфильтруйте галерею, откройте фото, посмотрите курс или преподавателя и попробуйте тему/размер шрифта. Формы связи и рассылки демонстрируют только валидацию: заявки не отправляются и не сохраняются.

Начните с `js/main.js` и подключаемых модулей; галерея и подробности используют Bootstrap Modal, звуки — общий Web Audio helper в `js/utils.js`. ES-модули запускаются по HTTP. Голоса синтеза речи и доступность CDN зависят от окружения.

Языковые ссылки выше переключают документацию, а не переводят существующий интерфейс демо.

### Возможности

- Десять разделов: о клубе, галерея, лучшие кадры, направления, космическое сафари, курсы, команда, отзывы, вопросы, контакты.
- Галерея с фильтром по категориям и лайтбоксом.
- Подробности о курсах и преподавателях в модальных окнах; форма связи и подписка на рассылку с явным результатом демонстрации, без отправки данных.
- Светлая и тёмная тема (цветовые режимы Bootstrap) и выбор размера шрифта.
- Чтение текста вслух через синтез речи браузера.
- Появление блоков при прокрутке, плавная прокрутка и космические эффекты фона.
- Файлы эмбиента генерируются локально скриптами Node в `tools/generate-*.js`.

### Стек

HTML5 · CSS3 · Bootstrap 5 · модули JavaScript (DOM, Bootstrap Modal, Web Speech API, Web Audio, Intersection Observer) · скрипты Node.js · GitHub Pages

### Как запустить

Запустите HTTP-сервер из папки: `npm start` либо `python -m http.server 8000 --bind 127.0.0.1`, затем откройте локальный адрес. Импорты ES-модулей не рассчитаны на запуск через `file://`.

Кнопки эмбиента отражают фактическое состояние аудио. При отказе запуска или недоступном файле плеер остаётся на паузе, кнопка доступна для повторной попытки.

### План развития

Это предложения, а не уже реализованные возможности.

- Визуал: заменить картинки-заглушки выбранными фотографиями с подписями, улучшить состояния загрузки и фокуса галереи.
- Инженерия: воспроизводимая локальная сборка зависимостей, браузерные проверки фокуса modal, отмены озвучивания и состояний форм.
- Функции: расписание курсов из JSON с фильтром уровня; реальную запись вводить только с явно выбранным backend.

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

**מועדון הצילום "אובייקטיב"**

דף נחיתה לבית ספר לצילום: קורסים וסדנאות, גלריית עבודות של תלמידים, טיולי צילום (כולל "ספארי בחלל"), הצוות, ביקורות, שאלות נפוצות וטפסי יצירת קשר.

**הדגמה:** https://dubnovalexey.github.io/photoclub-objectiv/

### סיור קצר

סננו את הגלריה ופתחו תמונה, בדקו קורס או מדריך ונסו ערכת צבעים וגודל גופן. טפסי הקשר והדיוור מדגימים אימות בלבד: הבקשות אינן נשלחות או נשמרות.

התחילו ב־`js/main.js` ובמודולי התכונות. הגלריה והפרטים משתמשים ב־Bootstrap Modal, והצלילים בעזר Web Audio המשותף ב־`js/utils.js`. מודולי ES דורשים HTTP; קולות דיבור ומשאבי CDN תלויים בסביבה.

קישורי השפה למעלה מחליפים את התיעוד, ולא מתרגמים את ממשק ההדגמה הקיים.

### יכולות

- גלריה עם סינון לפי קטגוריות ותצוגה מוגדלת.
- פרטי קורסים ומדריכים בחלונות קופצים, טופס יצירת קשר והרשמה לניוזלטר.
- ערכת צבעים בהירה וכהה ושינוי גודל הגופן.
- הקראת טקסט בעזרת סינתזת הדיבור של הדפדפן.
- קובצי האווירה נוצרים מקומית בסקריפטי Node ב־`tools/generate-*.js`.

### טכנולוגיות

HTML5 · CSS3 · Bootstrap 5 · JavaScript · GitHub Pages

### הרצה מקומית

הריצו שרת HTTP בתיקייה: `npm start` או `python -m http.server 8000 --bind 127.0.0.1`, ופתחו את הכתובת המקומית. מודולי ES אינם מיועדים לפתיחה דרך `file://`.

### שיפורים מתוכננים

אלה הצעות, לא יכולות שכבר מומשו.

- חזות: להחליף תמונות דמה בצילומים נבחרים עם קרדיטים ולשפר מצבי טעינה ומיקוד בגלריה.
- הנדסה: בניית תלויות מקומית הניתנת לשחזור ובדיקות דפדפן למיקוד חלונות, ביטול הקראה ומצבי טפסים.
- יכולות: לוח קורסים מ־JSON עם סינון לפי רמה; הרשמה אמיתית רק עם שרת שנבחר במפורש.

</div>
