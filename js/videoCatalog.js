// FILE: js/videoCatalog.js
// PURPOSE: byte-checked field-video catalog; selecting a clip loads one native player.
// Each entry has a category for the filters and a small WebP poster made from the clip's opening frame,
// so a visitor sees what a clip shows before it is downloaded.
export const videoEntries = [
  {
    "id": "field-log-08cccc8f0e",
    "original": "003524415.mp4",
    "file": "assets/video/field-log-08cccc8f0e.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-08cccc8f0e.webp",
    "title": "Розовый вечер над пастбищем",
    "titles": {
      "ru": "Розовый вечер над пастбищем",
      "en": "Pink evening over the pasture",
      "he": "ערב ורוד מעל המרעה",
      "es": "Tarde rosa sobre el pasto",
      "fr": "Soir rose sur le pâturage"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 1515589,
    "sha256": "08cccc8f0ed968c1585e0cc39040fbbdd815152516ae60515e7baf3dee5d55d9",
    "durationSeconds": 16.533,
    "width": 1280,
    "height": 720
  },
  {
    "id": "field-log-418fb15521",
    "original": "1102.mp4",
    "file": "assets/video/field-log-418fb15521.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-418fb15521.webp",
    "title": "Планета в песочнице",
    "titles": {
      "ru": "Планета в песочнице",
      "en": "A planet in the sandbox",
      "he": "כוכב לכת בארגז החול",
      "es": "Un planeta en el arenero",
      "fr": "Une planète dans le bac à sable"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 25654132,
    "sha256": "418fb15521e5afc591b4ab02150495265cff41a4c2a7548e3eb956d7df08afee",
    "durationSeconds": 36.117,
    "width": 2160,
    "height": 3840
  },
  {
    "id": "field-log-5797ce0493",
    "original": "1442338025.mp4",
    "file": "assets/video/field-log-5797ce0493.mp4",
    "category": "ships",
    "poster": "assets/video/posters/field-log-5797ce0493.webp",
    "title": "Иллюминатор над Землёй",
    "titles": {
      "ru": "Иллюминатор над Землёй",
      "en": "Porthole over Earth",
      "he": "צוהר מעל כדור הארץ",
      "es": "Ojo de buey sobre la Tierra",
      "fr": "Hublot au-dessus de la Terre"
    },
    "descriptions": {
      "ru": "Запись с борта. Экипаж просит не стучать по иллюминатору.",
      "en": "Recorded on board. The crew asks you not to tap on the porthole.",
      "he": "הוקלט על הסיפון. הצוות מבקש לא לדפוק על הצוהר.",
      "es": "Grabado a bordo. La tripulación pide no dar golpecitos en el ojo de buey.",
      "fr": "Enregistré à bord. L’équipage demande de ne pas tapoter le hublot."
    },
    "bytes": 16526493,
    "sha256": "5797ce0493dce1cccf6c5b765e82f266c8b8771acb3f9a661d46911450a22c4c",
    "durationSeconds": 102.168,
    "width": 960,
    "height": 720
  },
  {
    "id": "field-log-cf78555a7e",
    "original": "1442529549.mp4",
    "file": "assets/video/field-log-cf78555a7e.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-cf78555a7e.webp",
    "title": "Росток, который не спешит",
    "titles": {
      "ru": "Росток, который не спешит",
      "en": "A sprout in no hurry",
      "he": "נבט שלא ממהר",
      "es": "Un brote sin prisa",
      "fr": "Une pousse qui prend son temps"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 494420,
    "sha256": "cf78555a7ee7a45f1f19f9d7ccc67ae9cb40022253d507f1649b9ab812ee2c05",
    "durationSeconds": 10.565,
    "width": 682,
    "height": 846
  },
  {
    "id": "field-log-99aff89e9d",
    "original": "353346284.mp4",
    "file": "assets/video/field-log-99aff89e9d.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-99aff89e9d.webp",
    "title": "Лунная равнина",
    "titles": {
      "ru": "Лунная равнина",
      "en": "Lunar plain",
      "he": "מישור ירחי",
      "es": "Llanura lunar",
      "fr": "Plaine lunaire"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 126352327,
    "sha256": "99aff89e9dde02660f20d8226358326d5ac266268074a43344233c9359e7c675",
    "durationSeconds": 249.131,
    "width": 1470,
    "height": 1080
  },
  {
    "id": "field-log-6ccfdf5242",
    "original": "482540.mp4",
    "file": "assets/video/field-log-6ccfdf5242.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-6ccfdf5242.webp",
    "title": "Кратер в ржавой пыли",
    "titles": {
      "ru": "Кратер в ржавой пыли",
      "en": "Crater in rusty dust",
      "he": "מכתש באבק חלוד",
      "es": "Cráter en polvo oxidado",
      "fr": "Cratère dans la poussière rouillée"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 437280,
    "sha256": "6ccfdf5242f0555d874b74e7536f65d0c06796c7a54d6a77bc8b3203f6693596",
    "durationSeconds": 14.528,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-08518506e7",
    "original": "511722937.mp4",
    "file": "assets/video/field-log-08518506e7.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-08518506e7.webp",
    "title": "Облако-тарелка над вулканом",
    "titles": {
      "ru": "Облако-тарелка над вулканом",
      "en": "Saucer cloud over the volcano",
      "he": "ענן צלחת מעל הר הגעש",
      "es": "Nube platillo sobre el volcán",
      "fr": "Nuage-soucoupe au-dessus du volcan"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 1500276,
    "sha256": "08518506e7fe2c1772929c7f100cfbd215126804f6156dea9aad9d31d9f9a414",
    "durationSeconds": 28.736,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-3f897491c5",
    "original": "536949.mp4",
    "file": "assets/video/field-log-3f897491c5.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-3f897491c5.webp",
    "title": "Корни под стеклом",
    "titles": {
      "ru": "Корни под стеклом",
      "en": "Roots under glass",
      "he": "שורשים מתחת לזכוכית",
      "es": "Raíces bajo el cristal",
      "fr": "Racines sous verre"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 9925277,
    "sha256": "3f897491c5ec9774206fb7c24df243bea3d894d3d2eea1cb5d9e618d49ac4f6c",
    "durationSeconds": 12.867,
    "width": 720,
    "height": 1280
  },
  {
    "id": "field-log-fbca0689c1",
    "original": "7a2qxpxgpedc1.mp4",
    "file": "assets/video/field-log-fbca0689c1.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-fbca0689c1.webp",
    "title": "Сатурн в окуляре",
    "titles": {
      "ru": "Сатурн в окуляре",
      "en": "Saturn in the eyepiece",
      "he": "שבתאי בעינית",
      "es": "Saturno en el ocular",
      "fr": "Saturne dans l’oculaire"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 47880740,
    "sha256": "fbca0689c107d2a88cfc94d7a7608478d104f5afabea632b3846f8e4e691d97e",
    "durationSeconds": 107.042,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-362c865473",
    "original": "910889938.mp4",
    "file": "assets/video/field-log-362c865473.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-362c865473.webp",
    "title": "Галактика с ребра",
    "titles": {
      "ru": "Галактика с ребра",
      "en": "Edge-on galaxy",
      "he": "גלקסיה מהצד",
      "es": "Galaxia de canto",
      "fr": "Galaxie vue par la tranche"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 545976,
    "sha256": "362c8654737614a7ace22fdb351f3d857e63fb28f9f231f77673ed8a5c558470",
    "durationSeconds": 22,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-35ef078c80",
    "original": "921351754.mp4",
    "file": "assets/video/field-log-35ef078c80.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-35ef078c80.webp",
    "title": "Путник на краю света",
    "titles": {
      "ru": "Путник на краю света",
      "en": "A wanderer at the edge of light",
      "he": "נווד בקצה האור",
      "es": "Un caminante al borde de la luz",
      "fr": "Un voyageur au bord de la lumière"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 1198973,
    "sha256": "35ef078c80d5e92f342584a08b34fc558afc61a9b05b87d7fae0f13e6f4da7e1",
    "durationSeconds": 17.131,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-2832d9287c",
    "original": "971340.mp4",
    "file": "assets/video/field-log-2832d9287c.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-2832d9287c.webp",
    "title": "Звёздный пояс",
    "titles": {
      "ru": "Звёздный пояс",
      "en": "Star belt",
      "he": "חגורת כוכבים",
      "es": "Cinturón de estrellas",
      "fr": "Ceinture d’étoiles"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 1740558,
    "sha256": "2832d9287c74aa668c65f935de8c05416222ace541066a834045decfd6df7c25",
    "durationSeconds": 30.08,
    "width": 1280,
    "height": 720
  },
  {
    "id": "field-log-f99656b3f2",
    "original": "de3shjksusyh1.mp4",
    "file": "assets/video/field-log-f99656b3f2.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-f99656b3f2.webp",
    "title": "Солнце в хорошем настроении",
    "titles": {
      "ru": "Солнце в хорошем настроении",
      "en": "The Sun in a good mood",
      "he": "השמש במצב רוח טוב",
      "es": "El Sol de buen humor",
      "fr": "Le Soleil de bonne humeur"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 730947,
    "sha256": "f99656b3f2da65becbb88aef6aa55340497158a6de6f95b0ce317837fd87ee60",
    "durationSeconds": 5.334,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-0e211f83ae",
    "original": "De906ulxT1j_0.mp4",
    "file": "assets/video/field-log-0e211f83ae.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-0e211f83ae.webp",
    "title": "Красная схема",
    "titles": {
      "ru": "Красная схема",
      "en": "Red circuitry",
      "he": "מעגל אדום",
      "es": "Circuito rojo",
      "fr": "Circuits rouges"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 4716577,
    "sha256": "0e211f83ae6bec7a6762d4e6ac009b313fc16106c2907ac6264fb64af301425d",
    "durationSeconds": 15.137,
    "width": 720,
    "height": 1280
  },
  {
    "id": "field-log-dc0551037d",
    "original": "De9zG_qiCDk_0.mp4",
    "file": "assets/video/field-log-dc0551037d.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-dc0551037d.webp",
    "title": "Гостья из туманности",
    "titles": {
      "ru": "Гостья из туманности",
      "en": "A visitor from the nebula",
      "he": "אורחת מהערפילית",
      "es": "Una visitante de la nebulosa",
      "fr": "Une visiteuse de la nébuleuse"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 2991174,
    "sha256": "dc0551037d1485b2aeffefccf1c321a7a84bab8016af4e07d38edfe6b7856770",
    "durationSeconds": 15.125,
    "width": 716,
    "height": 1052
  },
  {
    "id": "field-log-34b8e1d89c",
    "original": "DfAUYHpii0I_0.mp4",
    "file": "assets/video/field-log-34b8e1d89c.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-34b8e1d89c.webp",
    "title": "Грибная королева",
    "titles": {
      "ru": "Грибная королева",
      "en": "The mushroom queen",
      "he": "מלכת הפטריות",
      "es": "La reina de las setas",
      "fr": "La reine des champignons"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 4272775,
    "sha256": "34b8e1d89c8b7b1d918286c8c8e7fabc0b05cd7514edb284989a887e38e985f7",
    "durationSeconds": 15.125,
    "width": 716,
    "height": 1052
  },
  {
    "id": "field-recording-01",
    "original": "WhatsApp Video 2026-10-01 at 23.34.44.mp4",
    "file": "assets/video/field-recording-01.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-recording-01.webp",
    "title": "Посёлок у оранжевого дерева",
    "titles": {
      "ru": "Посёлок у оранжевого дерева",
      "en": "Village by the orange tree",
      "he": "כפר ליד העץ הכתום",
      "es": "Aldea junto al árbol naranja",
      "fr": "Village près de l’arbre orange"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 18055929,
    "sha256": "c7595a0e732e76c0f7148a71f0222d6bd45679d6ce61158d3e342b00316e5496",
    "durationSeconds": 163.042,
    "width": 1024,
    "height": 576
  },
  {
    "id": "field-log-48d4dbfac8",
    "original": "lclyz8xwq6qh1.mp4",
    "file": "assets/video/field-log-48d4dbfac8.mp4",
    "category": "ships",
    "poster": "assets/video/posters/field-log-48d4dbfac8.webp",
    "title": "Ночная орбита",
    "titles": {
      "ru": "Ночная орбита",
      "en": "Night orbit",
      "he": "מסלול לילי",
      "es": "Órbita nocturna",
      "fr": "Orbite nocturne"
    },
    "descriptions": {
      "ru": "Запись с борта. Экипаж просит не стучать по иллюминатору.",
      "en": "Recorded on board. The crew asks you not to tap on the porthole.",
      "he": "הוקלט על הסיפון. הצוות מבקש לא לדפוק על הצוהר.",
      "es": "Grabado a bordo. La tripulación pide no dar golpecitos en el ojo de buey.",
      "fr": "Enregistré à bord. L’équipage demande de ne pas tapoter le hublot."
    },
    "bytes": 1851500,
    "sha256": "48d4dbfac89923868df74dd5646f4ab3ca0c9db921d6a2e7cbf7797aa3631677",
    "durationSeconds": 6.542,
    "width": 960,
    "height": 540
  },
  {
    "id": "field-log-eedb062402",
    "original": "Recogniseg h.mp4",
    "file": "assets/video/field-log-eedb062402.mp4",
    "category": "ships",
    "poster": "assets/video/posters/field-log-eedb062402.webp",
    "title": "Купол станции",
    "titles": {
      "ru": "Купол станции",
      "en": "Station cupola",
      "he": "כיפת התחנה",
      "es": "Cúpula de la estación",
      "fr": "Coupole de la station"
    },
    "descriptions": {
      "ru": "Запись с борта. Экипаж просит не стучать по иллюминатору.",
      "en": "Recorded on board. The crew asks you not to tap on the porthole.",
      "he": "הוקלט על הסיפון. הצוות מבקש לא לדפוק על הצוהר.",
      "es": "Grabado a bordo. La tripulación pide no dar golpecitos en el ojo de buey.",
      "fr": "Enregistré à bord. L’équipage demande de ne pas tapoter le hublot."
    },
    "bytes": 12655484,
    "sha256": "eedb0624027daabedb0182872541b90e109a36946a42bb7feb08e303ab8a19c4",
    "durationSeconds": 55.758,
    "width": 1080,
    "height": 1350
  },
  {
    "id": "field-log-72c47069a5",
    "original": "Satellitar.mp4",
    "file": "assets/video/field-log-72c47069a5.mp4",
    "category": "ships",
    "poster": "assets/video/posters/field-log-72c47069a5.webp",
    "title": "Старт сквозь облака",
    "titles": {
      "ru": "Старт сквозь облака",
      "en": "Launch through the clouds",
      "he": "שיגור דרך העננים",
      "es": "Despegue entre las nubes",
      "fr": "Décollage à travers les nuages"
    },
    "descriptions": {
      "ru": "Запись с борта. Экипаж просит не стучать по иллюминатору.",
      "en": "Recorded on board. The crew asks you not to tap on the porthole.",
      "he": "הוקלט על הסיפון. הצוות מבקש לא לדפוק על הצוהר.",
      "es": "Grabado a bordo. La tripulación pide no dar golpecitos en el ojo de buey.",
      "fr": "Enregistré à bord. L’équipage demande de ne pas tapoter le hublot."
    },
    "bytes": 1311734,
    "sha256": "72c47069a562ad510b4b464a380d17a02cd8a90b11d9e0cd46e5f159ddb3c134",
    "durationSeconds": 12.886,
    "width": 1080,
    "height": 1920
  },
  {
    "id": "field-log-d5acde8b7a",
    "original": "Theo_1.mp4",
    "file": "assets/video/field-log-d5acde8b7a.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-d5acde8b7a.webp",
    "title": "Планета на горизонте",
    "titles": {
      "ru": "Планета на горизонте",
      "en": "Planet on the horizon",
      "he": "כוכב לכת באופק",
      "es": "Planeta en el horizonte",
      "fr": "Planète à l’horizon"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 51024463,
    "sha256": "d5acde8b7a8e240d55a5f318025113befc43aac265a29e72d9cf5cdd5218916a",
    "durationSeconds": 29.888,
    "width": 720,
    "height": 720
  },
  {
    "id": "field-log-cfe07f1c62",
    "original": "transfer-c2pg_5r6.mp4",
    "file": "assets/video/field-log-cfe07f1c62.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-cfe07f1c62.webp",
    "title": "Робот у микрофона",
    "titles": {
      "ru": "Робот у микрофона",
      "en": "Robot at the microphone",
      "he": "רובוט ליד המיקרופון",
      "es": "Robot ante el micrófono",
      "fr": "Robot au micro"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 16065574,
    "sha256": "cfe07f1c62d8746f6bb01e48777426787dd1e4b15b743cbf3afbd94670605ff7",
    "durationSeconds": 96.148,
    "width": 720,
    "height": 1280
  },
  {
    "id": "field-log-9db1c66ba1",
    "original": "transfer-pvcdr3kk.mp4",
    "file": "assets/video/field-log-9db1c66ba1.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-9db1c66ba1.webp",
    "title": "Инспектор в светящихся очках",
    "titles": {
      "ru": "Инспектор в светящихся очках",
      "en": "Inspector in glowing glasses",
      "he": "מפקח במשקפיים זוהרים",
      "es": "Inspector con gafas luminosas",
      "fr": "Inspecteur aux lunettes lumineuses"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 25071923,
    "sha256": "9db1c66ba12791e9f522c5e3252358bb880a4e16e317d63eba21bef4a16dbb41",
    "durationSeconds": 69.69,
    "width": 720,
    "height": 1280
  },
  {
    "id": "field-log-e6388d074f",
    "original": "vdhue6rtaash1.mp4",
    "file": "assets/video/field-log-e6388d074f.mp4",
    "category": "ships",
    "poster": "assets/video/posters/field-log-e6388d074f.webp",
    "title": "Борт над облаками",
    "titles": {
      "ru": "Борт над облаками",
      "en": "Aboard above the clouds",
      "he": "על הסיפון מעל העננים",
      "es": "A bordo sobre las nubes",
      "fr": "À bord au-dessus des nuages"
    },
    "descriptions": {
      "ru": "Запись с борта. Экипаж просит не стучать по иллюминатору.",
      "en": "Recorded on board. The crew asks you not to tap on the porthole.",
      "he": "הוקלט על הסיפון. הצוות מבקש לא לדפוק על הצוהר.",
      "es": "Grabado a bordo. La tripulación pide no dar golpecitos en el ojo de buey.",
      "fr": "Enregistré à bord. L’équipage demande de ne pas tapoter le hublot."
    },
    "bytes": 1999392,
    "sha256": "e6388d074fb57c109f40a241a9d86f064b35ce5e2a32f6bbff53987ebe2760b9",
    "durationSeconds": 26.042,
    "width": 512,
    "height": 288
  },
  {
    "id": "field-log-4924d8e2a6",
    "original": "video_2026-11-06_23-56-03.mp4",
    "file": "assets/video/field-log-4924d8e2a6.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-4924d8e2a6.webp",
    "title": "Цветок на кухне",
    "titles": {
      "ru": "Цветок на кухне",
      "en": "A flower in the kitchen",
      "he": "פרח במטבח",
      "es": "Una flor en la cocina",
      "fr": "Une fleur dans la cuisine"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 17632991,
    "sha256": "4924d8e2a68e276641494718317100ed1b6720d5288d9d33eb2ceef85292c8ee",
    "durationSeconds": 52.7,
    "width": 718,
    "height": 1280
  },
  {
    "id": "field-log-69226a00af",
    "original": "video_2026-11-06_23-56-40.mp4",
    "file": "assets/video/field-log-69226a00af.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-69226a00af.webp",
    "title": "Хозяйка лавки",
    "titles": {
      "ru": "Хозяйка лавки",
      "en": "The shopkeeper",
      "he": "בעלת החנות",
      "es": "La dueña de la tienda",
      "fr": "La marchande"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 9310291,
    "sha256": "69226a00af8c52f404012df243e8a348a1e0b3782f4be50da4925db75952ae93",
    "durationSeconds": 27.967,
    "width": 718,
    "height": 1280
  },
  {
    "id": "field-log-23cfe144cd",
    "original": "video_2026-11-06_23-59-44.mp4",
    "file": "assets/video/field-log-23cfe144cd.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-23cfe144cd.webp",
    "title": "Прогулка с золотой гостьей",
    "titles": {
      "ru": "Прогулка с золотой гостьей",
      "en": "A walk with a golden guest",
      "he": "טיול עם אורחת זהובה",
      "es": "Paseo con una invitada dorada",
      "fr": "Promenade avec une invitée dorée"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 7505381,
    "sha256": "23cfe144cd9213ffe432de9f0f3377abed247cf939235d9e8bc5e225b35e70a4",
    "durationSeconds": 22.833,
    "width": 718,
    "height": 1280
  },
  {
    "id": "field-log-afccc43f4c",
    "original": "video_2026-11-07_00-00-07.mp4",
    "file": "assets/video/field-log-afccc43f4c.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-afccc43f4c.webp",
    "title": "Каньоны парящих скал",
    "titles": {
      "ru": "Каньоны парящих скал",
      "en": "Canyons of floating rocks",
      "he": "קניונים של סלעים מרחפים",
      "es": "Cañones de rocas flotantes",
      "fr": "Canyons de rochers flottants"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 28405887,
    "sha256": "afccc43f4ca4b8560307b72b0b2f609a0c48613efea2250a6034d9a7ae4bf249",
    "durationSeconds": 69.133,
    "width": 736,
    "height": 1280
  },
  {
    "id": "field-log-e0fcd049de",
    "original": "video_2026-11-07_00-00-55.mp4",
    "file": "assets/video/field-log-e0fcd049de.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-e0fcd049de.webp",
    "title": "Взгляд с красными огнями",
    "titles": {
      "ru": "Взгляд с красными огнями",
      "en": "A red-eyed stare",
      "he": "מבט בעיניים אדומות",
      "es": "Una mirada de ojos rojos",
      "fr": "Un regard aux yeux rouges"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 10031637,
    "sha256": "e0fcd049def0dcef1139b4a15b270c77b15ac48d917d1b31535b2aa7ad673eee",
    "durationSeconds": 30.267,
    "width": 718,
    "height": 1280
  },
  {
    "id": "field-log-2fdea31864",
    "original": "video_2026-11-07_00-01-52.mp4",
    "file": "assets/video/field-log-2fdea31864.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-2fdea31864.webp",
    "title": "Зверь в грязи",
    "titles": {
      "ru": "Зверь в грязи",
      "en": "Beast in the mud",
      "he": "חיה בבוץ",
      "es": "Bestia en el barro",
      "fr": "Bête dans la boue"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 13145955,
    "sha256": "2fdea31864bbfc56a2c2e31e813bc6c1de3f4241202b3b0a7b21c72ac2cf20df",
    "durationSeconds": 32.809,
    "width": 736,
    "height": 1280
  },
  {
    "id": "field-log-b0caa55cdc",
    "original": "video_2026-11-07_00-02-42.mp4",
    "file": "assets/video/field-log-b0caa55cdc.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-b0caa55cdc.webp",
    "title": "Встреча в кафе",
    "titles": {
      "ru": "Встреча в кафе",
      "en": "Meeting at the café",
      "he": "פגישה בבית הקפה",
      "es": "Encuentro en el café",
      "fr": "Rendez-vous au café"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 10785567,
    "sha256": "b0caa55cdcdce0964750d1003f4d40674baee7a7e4a174763f0c0a85e57c4a61",
    "durationSeconds": 26.5,
    "width": 736,
    "height": 1280
  },
  {
    "id": "field-log-b279b7579a",
    "original": "video_2026-11-07_00-03-23.mp4",
    "file": "assets/video/field-log-b279b7579a.mp4",
    "category": "workshops",
    "poster": "assets/video/posters/field-log-b279b7579a.webp",
    "title": "Шмель в лесу",
    "titles": {
      "ru": "Шмель в лесу",
      "en": "Bumblebee in the forest",
      "he": "דבורת בומבוס ביער",
      "es": "Abejorro en el bosque",
      "fr": "Bourdon dans la forêt"
    },
    "descriptions": {
      "ru": "Этюд визуальной лаборатории: свет, форма и немного подозрительного искусства.",
      "en": "A visual-lab study: light, form and a little suspicious art.",
      "he": "תרגיל ממעבדת החזות: אור, צורה וקצת אמנות חשודה.",
      "es": "Un estudio del laboratorio visual: luz, forma y un poco de arte sospechoso.",
      "fr": "Une étude du laboratoire visuel : lumière, forme et un peu d’art suspect."
    },
    "bytes": 16070720,
    "sha256": "b279b7579affb038d24802b335d02c898a9d881885aa4ef3301326d4fedf4db6",
    "durationSeconds": 39.752,
    "width": 732,
    "height": 1280
  },
  {
    "id": "field-log-3040626e90",
    "original": "video_2026-11-07_00-16-42.mp4",
    "file": "assets/video/field-log-3040626e90.mp4",
    "category": "characters",
    "poster": "assets/video/posters/field-log-3040626e90.webp",
    "title": "Рогатый гость",
    "titles": {
      "ru": "Рогатый гость",
      "en": "The horned guest",
      "he": "האורח בעל הקרניים",
      "es": "El invitado con cuernos",
      "fr": "L’invité cornu"
    },
    "descriptions": {
      "ru": "Бортовое происшествие. Все участники вымышлены, но некоторые об этом ещё не знают.",
      "en": "An onboard incident. Every participant is fictional, though some of them do not know it yet.",
      "he": "תקרית על הסיפון. כל המשתתפים בדויים, חלקם עדיין לא יודעים זאת.",
      "es": "Un incidente a bordo. Todos los participantes son ficticios, aunque algunos todavía no lo saben.",
      "fr": "Un incident à bord. Tous les participants sont fictifs, même si certains ne le savent pas encore."
    },
    "bytes": 1999685,
    "sha256": "3040626e902c62e983cba330d1e972e76fcbf3b81418048e3e5b7ca2130187dc",
    "durationSeconds": 15.091,
    "width": 576,
    "height": 1024
  },
  {
    "id": "field-log-c022b2f93a",
    "original": "Watcr!( -.mp4",
    "file": "assets/video/field-log-c022b2f93a.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-c022b2f93a.webp",
    "title": "Айсберг",
    "titles": {
      "ru": "Айсберг",
      "en": "Iceberg",
      "he": "קרחון",
      "es": "Iceberg",
      "fr": "Iceberg"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 9977496,
    "sha256": "c022b2f93aaf4ad2906f195c5b4ace326bc61f7a949587a439a28d9f2ee02ff0",
    "durationSeconds": 26.069,
    "width": 1080,
    "height": 1920
  },
  {
    "id": "field-log-c5b7f9696c",
    "original": "wdVTKfO_cfgWN_wo.mp4",
    "file": "assets/video/field-log-c5b7f9696c.mp4",
    "category": "worlds",
    "poster": "assets/video/posters/field-log-c5b7f9696c.webp",
    "title": "Лунная пыль",
    "titles": {
      "ru": "Лунная пыль",
      "en": "Lunar dust",
      "he": "אבק ירחי",
      "es": "Polvo lunar",
      "fr": "Poussière lunaire"
    },
    "descriptions": {
      "ru": "Маршрут из полевого архива. Координаты диспетчер обещал уточнить после обеда.",
      "en": "A route from the field archive. Dispatch promised the coordinates after lunch.",
      "he": "מסלול מארכיון השטח. המוקד הבטיח את הקואורדינטות אחרי ארוחת הצהריים.",
      "es": "Una ruta del archivo de campo. Control prometió las coordenadas después de comer.",
      "fr": "Un itinéraire des archives de terrain. Le contrôle a promis les coordonnées après le déjeuner."
    },
    "bytes": 923588,
    "sha256": "c5b7f9696c8b2c0d5755ec199c38351cec92cc545e26a505aa4942847e118950",
    "durationSeconds": 15,
    "width": 720,
    "height": 1280
  }
];
