# Три пикселя до Центавра

[English](#english) · [Русский](#russian) · [עברית](#hebrew)

<a name="english"></a>

## English

**Three Pixels to Centauri** is a fictional intergalactic centre for photography and visual arts. A cinematic dark interface connects a supplied image archive, imaginary expeditions, humorous workshops and fictional curator characters. The repository folder retains its historical name, `photoclub-objectiv`.

### Try the prototype

Open the archive, choose photographic studies or illustrations, and view an image with keyboard arrows and Escape. Start the shared music player explicitly, change tracks and volume. Open a workshop or curator profile; submitting a form demonstrates local validation and sends nothing.

### Current implementation

- 58 supplied archive images, plus the supplied PNG favicon. Descriptive ASCII file names and original-to-new mappings are in `assets/media-manifest.json`; original image/audio/video bytes were not re-encoded.
- Progressive archive loading, semantic filters and a full-size Bootstrap modal. Captions distinguish photographic studies, illustrations and character art; they do not claim documentary or NASA provenance.
- One HTML audio player with 13 supplied MP3/MPEG/MP4 recordings. Playback starts on a user gesture, advances sequentially, loops, and stops after a bounded failure pass. Legacy generated hum WAV files remain stored but are not played.
- A supplied video is available as `assets/video/field-recording-01.mp4`, with native controls and no autoplay. Video and background music do not play simultaneously.
- Fictional workshops use fictional credits. Curator biographies and ship-log entries are invented; no real student testimonials, registration, payment, contact delivery or newsletter backend is claimed.
- Responsive layouts, keyboard controls, text-size buttons, safe focus styling and reduced-motion handling. The UI is Russian; these README sections do not translate the page.

### Run and maintain

Serve this folder through HTTP, for example `python -m http.server 5500`, and open `http://127.0.0.1:5500/`. Bootstrap and Google Fonts are external dependencies; system font fallbacks remain available.

```bash
npm test
npm run media:update
```

Drop additional recordings into `assets/audio/` and run `npm run media:update`. This dependency-free Node helper updates the readable playlist and hashes without renaming or converting files. Missing or unreadable inputs are reported and excluded; the two legacy hum WAV names remain excluded. The browser must reload after manifest changes. A file decoding failure is handled by the bounded player fallback.

### Engineering map and next steps

`index.html` and `css/observatory.css` define the current presentation. `js/main.js` initializes the page; `js/mediaCatalog.js` supplies archive data; `js/galleryLightbox.js` owns filters and image navigation; `js/playlistPlayer.js` separates its testable controller from DOM bindings. Curator cards and profiles share `js/curatorData.js`. Older unreferenced style/effect files are retained for review, not loaded as alternate interfaces.

Planned: review the visual prototype, refine accessible archive exploration, then implement a real course/session/booking backend as a separate stage. A database, accounts, saved bookings and actual emails are not implemented here. Music stays in the existing audio folder; track descriptions come from supplied file names/metadata rather than invented identifications.

---

<a name="russian"></a>

## Русский

**«Три пикселя до Центавра»** — вымышленный межгалактический учебный центр фотографии и изобразительного искусства. Тёмная кинематографичная витрина объединяет предоставленные изображения, экспедиции, мастерские с сухим космическим юмором и вымышленных кураторов. Историческое имя папки — `photoclub-objectiv`.

### Быстрый просмотр

Откройте архив, выберите фотографические этюды или иллюстрации и разверните работу целиком. В просмотре действуют стрелки клавиатуры и Escape. Включите общий плеер, переключите запись и громкость. Откройте мастерскую и личное дело куратора; форма демонстрирует локальную проверку, ничего не отправляя.

### Что работает

- 58 изображений в архиве и отдельный предоставленный favicon PNG. Описательные ASCII-имена и соответствия исходных файлов записаны в `assets/media-manifest.json`. Изображения, аудио и видео не перекодировались.
- Постепенное раскрытие архива, фильтры и полноразмерный Bootstrap Modal. Подписи разделяют фотографические этюды, иллюстрации и персонажный арт; неподтверждённое происхождение не выдаётся за документальную съёмку или NASA.
- Один общий HTML audio-плеер с 13 предоставленными MP3/MPEG/MP4. Запуск только нажатием, последовательное воспроизведение по кругу, предыдущая/следующая запись и громкость. При ошибках число попыток ограничено длиной списка. Старые синтезированные WAV сохранены, но не воспроизводятся.
- Видеозапись `assets/video/field-recording-01.mp4` с ручным запуском и нативными controls. Включение видео останавливает музыку; включение музыки останавливает видео.
- Мастерские оцениваются в условных кредитах. Кураторы и бортовой журнал вымышлены. Настоящих отзывов учащихся, записи на занятия, оплаты, отправки сообщений или подписки нет.
- Адаптивная раскладка, клавиатура, кнопки размера текста и reduced motion. UI пока русский; языковые разделы README относятся к документации.

### Запуск и пополнение аудио

Раздайте папку через HTTP, например `python -m http.server 5500`, и откройте `http://127.0.0.1:5500/`. Bootstrap и Google Fonts загружаются извне; у шрифтов есть системные замены.

```bash
npm test
npm run media:update
```

Добавляйте записи в `assets/audio/`, затем запускайте `npm run media:update`. Node-helper без сторонних зависимостей обновляет список читаемых файлов и SHA, не переименовывая и не конвертируя содержимое. Отсутствующие или нечитаемые файлы отмечаются и не попадают в плейлист; два старых hum WAV исключены. После изменения списка обновите страницу. Ошибка декодирования внутри браузера не запускает бесконечное переключение.

### Устройство и дальнейшая работа

Текущий интерфейс — `index.html` и `css/observatory.css`. Точка входа `js/main.js`; данные архива — `js/mediaCatalog.js`; фильтры/просмотр — `js/galleryLightbox.js`; отдельный проверяемый медиаконтроллер — `js/playlistPlayer.js`; общие данные карточек и профилей кураторов — `js/curatorData.js`. Старые неподключённые стили/эффекты сохранены для отдельной сверки и не формируют вторую версию интерфейса.

Планы: оценить прототип, доработать удобство просмотра коллекции, затем отдельным этапом спроектировать реальные курсы, расписание и бронирование. БД, аккаунты, сохранённые заявки и настоящие письма сейчас не реализованы. Названия аудиозаписей берутся из предоставленных имён/метаданных; неизвестные записи обозначены нейтрально.

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

**Three Pixels to Centauri — «Три пикселя до Центавра»** הוא מרכז בין־גלקטי דמיוני לצילום ולאמנות חזותית. אב־הטיפוס מציג ארכיון תמונות שסופק לפרויקט, מסעות, סדנאות הומוריסטיות ואוצרים בדיוניים. שם תיקיית המאגר ההיסטורי נשאר `photoclub-objectiv`.

### סיור קצר

בחרו בארכיון מחקר צילומי או איור, פתחו תמונה והשתמשו בחצים וב־Escape. הפעילו את נגן המוזיקה באופן ידני ושנו רצועה ועוצמה. פתחו סדנה או פרופיל אוצר; הטפסים מדגימים אימות מקומי ואינם שולחים דבר.

### מימוש נוכחי

- 58 תמונות בארכיון וסמל PNG שסופק. שמות הקבצים ותיעוד המקור מופיעים ב־`assets/media-manifest.json`; קובצי המדיה לא קודדו מחדש.
- טעינה הדרגתית, סינון ומודאל מלא של Bootstrap. מחקרים צילומיים, איורים ודיוקנאות דמויות מסומנים בנפרד, ללא טענה שמדובר בתיעוד מדעי או בתצלומי NASA.
- נגן HTML audio יחיד עם 13 קובצי MP3/MPEG/MP4: הפעלה לפי לחיצה, רצף מחזורי, הקודם/הבא ועוצמה. כישלונות מוגבלים למעבר אחד על הרשימה. קובצי ה־WAV הישנים נשמרו אך אינם מושמעים.
- וידאו עם פקדים וללא הפעלה אוטומטית. הווידאו והמוזיקה אינם מתנגנים יחד.
- הסדנאות משתמשות בקרדיטים דמיוניים. האוצרים ויומן המסע בדיוניים; אין תשלום, רישום אמיתי, משלוח הודעה או הרשמה לניוזלטר.
- עיצוב מותאם למסכים, מקלדת, שינוי גודל טקסט ו־reduced motion. ממשק האתר כרגע ברוסית; סעיף זה מתרגם את התיעוד בלבד.

### הרצה ותחזוקה

הגישו את התיקייה ב־HTTP, למשל `python -m http.server 5500`, ופתחו `http://127.0.0.1:5500/`. Bootstrap וגופני Google דורשים רשת; קיימים גופני מערכת חלופיים.

```bash
npm test
npm run media:update
```

הוסיפו קובצי שמע ל־`assets/audio/` והריצו את פקודת העדכון. כלי Node ללא תלות נוספת בונה מחדש את רשימת הקבצים הקריאים וה־SHA, בלי לשנות שמות או להמיר מדיה. קבצים חסרים או בלתי קריאים אינם נכללים; שני קובצי ה־WAV הישנים נשארים מחוץ לנגן. לאחר העדכון יש לרענן את הדף.

`index.html` ו־`css/observatory.css` מגדירים את העיצוב; `js/main.js` מאתחל את המודולים. נתוני הארכיון ב־`js/mediaCatalog.js`, התצוגה ב־`js/galleryLightbox.js`, ובקר הנגן הנבדק ב־`js/playlistPlayer.js`. בעתיד ניתן לפתח שירות אמיתי של קורסים, מועדים והזמנות; חשבונות, בסיס נתונים ודוא״ל אינם חלק מאב־הטיפוס הנוכחי.

</div>
