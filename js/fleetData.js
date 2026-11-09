// =====================================================================
// ФАЙЛ: js/fleetData.js
// НАЗНАЧЕНИЕ: каталог шести вымышленных экскурсионных кораблей Академии.
// РАЗДЕЛЫ: 1. Версия и пояснение; 2. Маршруты; 3. Модели кораблей.
// КОНТРАКТ: name/role/description/comfort/conditions содержат ru/en/he/es/fr;
// image — путь из assets/media-manifest.json; routeIds ссылаются на fleetRoutes.
// capacity — число пассажиров, priceCredits — условная цена места за рейс.
// Модуль содержит только данные: без DOM, оплаты, бронирования и побочных эффектов.
// =====================================================================

// НАЧАЛО РАЗДЕЛА 1. ВЕРСИЯ И ОБЩЕЕ ПОЯСНЕНИЕ
export const fleetSchemaVersion = 1;

export const fleetNotice = {
  ru: 'Вымышленный экскурсионный флот: условия, защита и цены придуманы для этой истории. Кредиты — условные; выбор корабля не является бронированием или оплатой.',
  en: 'A fictional excursion fleet: facilities, protection and prices belong to this story. Credits are imaginary; choosing a ship does not make a booking or payment.',
  he: 'צי טיולים בדיוני: התנאים, אמצעי המיגון והמחירים נוצרו לצורך הסיפור. הקרדיטים דמיוניים; בחירת ספינה אינה הזמנה או תשלום.',
  es: 'Una flota de excursiones ficticia: las condiciones, la protección y los precios pertenecen a esta historia. Los créditos son imaginarios; elegir una nave no supone ninguna reserva ni pago.',
  fr: 'Une flotte d’excursion fictive : les conditions, la protection et les prix appartiennent à cette histoire. Les crédits sont imaginaires ; choisir un vaisseau ne constitue ni une réservation ni un paiement.'
};
// КОНЕЦ РАЗДЕЛА 1

// НАЧАЛО РАЗДЕЛА 2. СТАБИЛЬНЫЕ ИДЕНТИФИКАТОРЫ МАРШРУТОВ
export const fleetRoutes = [
  {
    id: 'orbit',
    name: { ru: 'Спокойный орбитальный тур', en: 'Quiet orbital tour', he: 'סיור מסלולי רגוע', es: 'Tour orbital tranquilo', fr: 'Tour orbital paisible' },
    description: {
      ru: 'Медленный круг над планетой, длинные наблюдения у иллюминатора и время спокойно построить кадр.',
      en: 'A slow circuit above a planet, long window-side observations and time to compose a photograph.',
      he: 'הקפה איטית מעל כוכב לכת, תצפיות ארוכות ליד החלון וזמן לבנות את התמונה בנחת.',
      es: 'Una vuelta lenta sobre un planeta, largas observaciones junto a la ventanilla y tiempo para componer una foto.',
      fr: 'Un tour lent au-dessus d’une planète, de longues observations près du hublot et le temps de composer une photo.'
    }
  },
  {
    id: 'frontier',
    name: { ru: 'Поселения фронтира', en: 'Frontier settlements', he: 'יישובי הספר', es: 'Asentamientos de la frontera', fr: 'Colonies des confins' },
    description: {
      ru: 'Удалённые причалы, мастерские и повседневная жизнь на окраине освоенного мира.',
      en: 'Remote docks, workshops and everyday life at the edge of the settled worlds.',
      he: 'רציפים מרוחקים, בתי מלאכה וחיי יום־יום בקצה העולמות המיושבים.',
      es: 'Muelles remotos, talleres y vida cotidiana en el límite de los mundos colonizados.',
      fr: 'Quais éloignés, ateliers et vie quotidienne aux limites des mondes colonisés.'
    }
  },
  {
    id: 'nebula',
    name: { ru: 'Свет туманностей', en: 'Nebula light', he: 'אור הערפיליות', es: 'Luz de nebulosas', fr: 'Lumière des nébuleuses' },
    description: {
      ru: 'Наблюдательный рейс снаружи вымышленных пылевых облаков: цвет, силуэты и никакой спешки.',
      en: 'An observation flight outside fictional dust clouds: colour, silhouettes and no hurry.',
      he: 'טיסת תצפית מחוץ לענני אבק בדיוניים: צבע, צלליות ובלי למהר.',
      es: 'Un vuelo de observación por fuera de nubes de polvo ficticias: color, siluetas y ninguna prisa.',
      fr: 'Un vol d’observation à l’extérieur de nuages de poussière fictifs : couleur, silhouettes et aucune hâte.'
    }
  },
  {
    id: 'craters',
    name: { ru: 'Кратеры и полевые исследования', en: 'Craters and field research', he: 'מכתשים ומחקר שטח', es: 'Cráteres e investigación de campo', fr: 'Cratères et recherche de terrain' },
    description: {
      ru: 'Рельеф, боковой свет и высадка с учебным оборудованием на подготовленной площадке.',
      en: 'Terrain, low-angle light and a landing with teaching equipment at a prepared site.',
      he: 'תבליט, אור צד ונחיתה עם ציוד לימודי באתר שהוכן מראש.',
      es: 'Relieve, luz rasante y un aterrizaje con equipo didáctico en una zona preparada.',
      fr: 'Relief, lumière rasante et atterrissage avec du matériel pédagogique sur un site préparé.'
    }
  }
];
// КОНЕЦ РАЗДЕЛА 2

// НАЧАЛО РАЗДЕЛА 3. КОРАБЛИ: ОТ БЮДЖЕТНОГО РЕЙСА ДО ЗАЩИЩЁННОЙ ЭКСПЕДИЦИИ
export const fleet = [
  {
    id: 'rusty-aperture',
    image: 'assets/images/frontier-freighter.webp',
    name: { ru: 'Ржавая Диафрагма', en: 'Rusty Aperture', he: 'הצמצם החלוד', es: 'Diafragma Oxidado', fr: 'Diaphragme Rouillé' },
    role: { ru: 'Бюджетный грузопассажирский ветеран', en: 'Budget cargo-and-passenger veteran', he: 'ספינת משא ונוסעים ותיקה וחסכונית', es: 'Veterano económico de carga y pasajeros', fr: 'Vétéran économique mixte fret-passagers' },
    description: {
      ru: 'Бывший грузовик возит художников к дальним причалам. Открытая ферма корпуса и наружные агрегаты честно показывают его возраст. Новые здесь только истории пассажиров.',
      en: 'A former freighter takes artists to distant docks. Its exposed framework and external machinery wear their age openly. The passenger stories are the newest things aboard.',
      he: 'ספינת משא לשעבר מסיעה אמנים לרציפים רחוקים. השלד החשוף והמכלולים החיצוניים אינם מסתירים את הגיל. רק סיפורי הנוסעים חדשים כאן.',
      es: 'Un antiguo carguero lleva artistas a muelles lejanos. Su estructura a la vista y la maquinaria exterior no disimulan su edad. Las historias de los pasajeros son lo más nuevo a bordo.',
      fr: 'Un ancien cargo emmène des artistes vers des quais lointains. Sa structure apparente et sa machinerie extérieure ne cachent pas son âge. Les histoires des passagers sont ce qu’il y a de plus neuf à bord.'
    },
    comfort: {
      ru: 'Общий отсек на 12 мест, складные койки и один большой стол. В меню горячая похлёбка, чай и печенье, которое уже видело несколько орбит.',
      en: 'A shared 12-person compartment, folding bunks and one large table. Hot stew, tea and biscuits that have already seen several orbits are on the menu.',
      he: 'תא משותף ל־12 נוסעים, דרגשים מתקפלים ושולחן גדול אחד. בתפריט נזיד חם, תה ועוגיות שכבר ראו כמה מסלולים.',
      es: 'Un compartimento compartido para 12 personas, literas plegables y una gran mesa. En el menú: guiso caliente, té y galletas que ya han visto varias órbitas.',
      fr: 'Un compartiment commun pour 12 personnes, des couchettes rabattables et une grande table. Au menu : ragoût chaud, thé et biscuits qui ont déjà vu plusieurs orbites.'
    },
    conditions: {
      ru: 'Базовые экраны от мелкой пыли; в плотные облака рейс не заходит. Разгон и посадка ощутимы, посуда пристёгнута. Скрип входит в стоимость, багаж — тоже.',
      en: 'Basic screens against fine dust; the route stays out of dense clouds. Acceleration and landing are noticeable, and the crockery is strapped down. Creaks and luggage are included.',
      he: 'מיגון בסיסי מפני אבק דק; המסלול נמנע מעננים צפופים. מרגישים את ההאצה ואת הנחיתה, והכלים קשורים. החריקות והמטען כלולים במחיר.',
      es: 'Pantallas básicas contra el polvo fino; la ruta evita las nubes densas. La aceleración y el aterrizaje se notan, y la vajilla va atada. Los crujidos y el equipaje están incluidos.',
      fr: 'Écrans de base contre la poussière fine ; l’itinéraire évite les nuages denses. L’accélération et l’atterrissage se font sentir, et la vaisselle est arrimée. Grincements et bagages compris.'
    },
    capacity: 12,
    priceCredits: 180,
    routeIds: ['frontier', 'orbit']
  },
  {
    id: 'golden-pixel',
    image: 'assets/images/silver-orbital-ship.webp',
    name: { ru: 'Золотой Пиксель', en: 'Golden Pixel', he: 'הפיקסל הזהוב', es: 'Píxel Dorado', fr: 'Pixel Doré' },
    role: { ru: 'Камерный панорамный корабль', en: 'Small panoramic touring ship', he: 'ספינת תצפית פנורמית לקבוצה קטנה', es: 'Pequeña nave panorámica de turismo', fr: 'Petit vaisseau panoramique de croisière' },
    description: {
      ru: 'Серебристый корабль с широким крылом создан для неспешных обзорных рейсов. Он разворачивается к красивому свету раньше, чем кто-нибудь успеет попросить ещё один круг.',
      en: 'This silver, broad-winged ship is made for unhurried sightseeing. It turns towards the best light before anyone has time to ask for another circuit.',
      he: 'הספינה הכסופה בעלת הכנף הרחבה נועדה לטיולי תצפית נינוחים. היא פונה אל האור היפה עוד לפני שמישהו מספיק לבקש סיבוב נוסף.',
      es: 'Esta nave plateada de alas anchas está hecha para el turismo sin prisas. Se gira hacia la mejor luz antes de que nadie tenga tiempo de pedir otra vuelta.',
      fr: 'Ce vaisseau argenté aux larges ailes est fait pour la visite sans hâte. Il se tourne vers la meilleure lumière avant que quiconque ait le temps de demander un autre tour.'
    },
    comfort: {
      ru: 'Четыре двухместные каюты, кресла у панорамных окон и тихая гостиная. Лёгкий обед, свежая выпечка и кофе подаются, когда фотоаппарат наконец отпускает хозяина.',
      en: 'Four twin cabins, seats beside panoramic windows and a quiet lounge. A light lunch, fresh pastries and coffee arrive when the camera finally releases its owner.',
      he: 'ארבעה תאים זוגיים, מושבים ליד חלונות פנורמיים וטרקלין שקט. ארוחה קלה, מאפים טריים וקפה מוגשים כשהמצלמה סוף סוף משחררת את בעליה.',
      es: 'Cuatro camarotes dobles, asientos junto a ventanales panorámicos y un salón tranquilo. Un almuerzo ligero, bollería recién hecha y café llegan cuando la cámara por fin suelta a su dueño.',
      fr: 'Quatre cabines doubles, des sièges près de baies panoramiques et un salon calme. Un déjeuner léger, des viennoiseries fraîches et du café arrivent quand l’appareil photo libère enfin son propriétaire.'
    },
    conditions: {
      ru: 'Пылевые экраны и плавная настройка тяги подходят для спокойных маршрутов. Посадка мягкая, толчки редки. Для сложных полевых высадок лучше выбрать другой корабль.',
      en: 'Dust screens and gently adjusted thrust suit quiet routes. Landings are soft and jolts rare. Another ship is a better choice for demanding field landings.',
      he: 'מיגון מאבק וכוונון עדין של הדחף מתאימים למסלולים רגועים. הנחיתה רכה והטלטלות נדירות. לנחיתות שטח מורכבות עדיף לבחור ספינה אחרת.',
      es: 'Las pantallas contra el polvo y un empuje ajustado con suavidad se adaptan a rutas tranquilas. Los aterrizajes son suaves y las sacudidas, raras. Para aterrizajes de campo exigentes, mejor otra nave.',
      fr: 'Les écrans anti-poussière et une poussée réglée en douceur conviennent aux itinéraires calmes. Les atterrissages sont doux et les secousses rares. Pour des atterrissages de terrain exigeants, mieux vaut un autre vaisseau.'
    },
    capacity: 8,
    priceCredits: 640,
    routeIds: ['orbit', 'nebula']
  },
  {
    id: 'double-exposure',
    image: 'assets/images/twin-engine-vessel.webp',
    name: { ru: 'Двойная Выдержка', en: 'Double Exposure', he: 'חשיפה כפולה', es: 'Doble Exposición', fr: 'Double Exposition' },
    role: { ru: 'Манёвренный полевой шаттл', en: 'Agile field shuttle', he: 'מעבורת שטח זריזה', es: 'Lanzadera de campo maniobrable', fr: 'Navette de terrain agile' },
    description: {
      ru: 'Два крупных двигателя и компактный корпус помогают добраться до небольших посадочных площадок. Это транспорт для тех, кто берёт штатив вместо второго чемодана.',
      en: 'Two large engines and a compact hull help it reach small landing sites. It is the ship for people who pack a tripod instead of a second suitcase.',
      he: 'שני מנועים גדולים וגוף קומפקטי מסייעים להגיע למשטחי נחיתה קטנים. זו הספינה למי שלוקח חצובה במקום מזוודה שנייה.',
      es: 'Dos grandes motores y un casco compacto la ayudan a llegar a pistas pequeñas. Es la nave de quienes meten un trípode en lugar de una segunda maleta.',
      fr: 'Deux gros moteurs et une coque compacte l’aident à atteindre de petites aires d’atterrissage. C’est le vaisseau de ceux qui emportent un trépied plutôt qu’une deuxième valise.'
    },
    comfort: {
      ru: 'Шесть кресел с глубокими ремнями, общий отсек отдыха и закрытые ящики для техники. Питание походное: сэндвичи, суп в термосе и очень убедительный кофе.',
      en: 'Six well-harnessed seats, a shared rest compartment and closed equipment lockers. Field meals mean sandwiches, soup in flasks and thoroughly persuasive coffee.',
      he: 'שישה מושבים עם רתמות, תא מנוחה משותף ותאים סגורים לציוד. ארוחות השטח כוללות כריכים, מרק בתרמוס וקפה משכנע במיוחד.',
      es: 'Seis asientos con buenos arneses, un compartimento común de descanso y taquillas cerradas para el equipo. Las comidas de campo son bocadillos, sopa en termo y un café muy persuasivo.',
      fr: 'Six sièges bien harnachés, un compartiment de repos commun et des casiers fermés pour le matériel. Repas de terrain : sandwichs, soupe en thermos et café fort persuasif.'
    },
    conditions: {
      ru: 'Усиленное днище рассчитано на пыльные подготовленные площадки. Вибрация заметнее, чем у обзорного корабля; посадка аккуратная, но не бесшумная. Спальные каюты отсутствуют.',
      en: 'A reinforced underside suits dusty, prepared landing sites. Vibration is more noticeable than on a touring ship; landings are careful but not silent. There are no sleeping cabins.',
      he: 'תחתית מחוזקת מתאימה למשטחי נחיתה מוכנים ומאובקים. הרעידות מורגשות יותר מאשר בספינת תצפית; הנחיתה זהירה, אך לא שקטה. אין תאי שינה.',
      es: 'Los bajos reforzados se adaptan a pistas preparadas y polvorientas. La vibración se nota más que en una nave de turismo; los aterrizajes son cuidadosos, pero no silenciosos. No hay camarotes para dormir.',
      fr: 'Le dessous renforcé convient aux aires préparées et poussiéreuses. Les vibrations se sentent davantage que sur un vaisseau de croisière ; les atterrissages sont soignés, mais pas silencieux. Il n’y a pas de cabines pour dormir.'
    },
    capacity: 6,
    priceCredits: 380,
    routeIds: ['frontier', 'craters']
  },
  {
    id: 'perfect-frame',
    image: 'assets/images/long-haul-cruiser.webp',
    name: { ru: 'Безупречный Кадр', en: 'Perfect Frame', he: 'הפריים המושלם', es: 'Encuadre Perfecto', fr: 'Cadre Parfait' },
    role: { ru: 'Дальний экспедиционный крейсер', en: 'Long-range expedition cruiser', he: 'סיירת מסעות ארוכי טווח', es: 'Crucero de expedición de largo alcance', fr: 'Croiseur d’expédition long-courrier' },
    description: {
      ru: 'Длинный многопалубный корпус вмещает учебную группу и её оборудование. Запас пространства здесь важнее рекордов скорости: хорошую экспедицию не стоит проводить в очереди к иллюминатору.',
      en: 'A long, multi-deck hull accommodates a class and its equipment. Space matters more than speed records: a good expedition should not be spent queuing for a window.',
      he: 'גוף ארוך ורב־סיפוני מכיל קבוצת לימוד ואת ציודה. המרחב חשוב כאן משיאי מהירות: לא כדאי לבלות מסע טוב בתור לחלון.',
      es: 'Un casco largo de varias cubiertas acoge a una clase entera con su equipo. El espacio importa más que los récords de velocidad: una buena expedición no debería pasarse haciendo cola para una ventana.',
      fr: 'Une longue coque à plusieurs ponts accueille une classe et son matériel. L’espace compte plus que les records de vitesse : une bonne expédition ne doit pas se passer à faire la queue devant un hublot.'
    },
    comfort: {
      ru: 'Двухместные каюты на 24 пассажира, столовая, учебная лаборатория и отсек для сушки снаряжения. Трёхразовое питание; чай доступен и после неудачного кадра.',
      en: 'Twin cabins for 24 passengers, a dining room, teaching lab and gear-drying compartment. Three meals a day; tea remains available after an unsuccessful photograph.',
      he: 'תאים זוגיים ל־24 נוסעים, חדר אוכל, מעבדת לימוד ותא לייבוש ציוד. שלוש ארוחות ביום; תה זמין גם אחרי צילום שלא הצליח.',
      es: 'Camarotes dobles para 24 pasajeros, comedor, laboratorio docente y un compartimento para secar el equipo. Tres comidas al día; el té sigue disponible después de una foto fallida.',
      fr: 'Cabines doubles pour 24 passagers, salle à manger, laboratoire pédagogique et compartiment de séchage du matériel. Trois repas par jour ; le thé reste disponible après une photo ratée.'
    },
    conditions: {
      ru: 'Многослойная обшивка и дублированные бортовые системы предназначены для долгих рейсов. Посадочный модуль гасит большую часть тряски. Большой корабль садится только на подходящий причал.',
      en: 'Layered hull plating and duplicate onboard systems suit long journeys. The landing module absorbs most jolts. This large ship only uses suitably sized ports.',
      he: 'מעטפת רב־שכבתית ומערכות כפולות מתאימות למסעות ארוכים. מודול הנחיתה סופג את רוב הטלטלות. הספינה הגדולה משתמשת רק בנמלים בגודל מתאים.',
      es: 'El blindaje del casco por capas y los sistemas de a bordo duplicados se adaptan a los viajes largos. El módulo de aterrizaje absorbe la mayoría de las sacudidas. Esta gran nave solo usa puertos de tamaño adecuado.',
      fr: 'Un blindage de coque en couches et des systèmes de bord doublés conviennent aux longs voyages. Le module d’atterrissage absorbe la plupart des secousses. Ce grand vaisseau n’utilise que des ports à sa taille.'
    },
    capacity: 24,
    priceCredits: 1200,
    routeIds: ['frontier', 'nebula', 'craters']
  },
  {
    id: 'ring-of-observation',
    image: 'assets/images/ring-drive-ship.webp',
    name: { ru: 'Круг Наблюдения', en: 'Observation Ring', he: 'טבעת התצפית', es: 'Anillo de Observación', fr: 'Anneau d’Observation' },
    role: { ru: 'Обсерватория с кольцевым приводом', en: 'Ring-drive observatory ship', he: 'ספינת מצפה עם הנעת טבעת', es: 'Nave observatorio con motor de anillo', fr: 'Vaisseau-observatoire à propulsion annulaire' },
    description: {
      ru: 'Кольцо вокруг центрального корпуса — главный герой силуэта и вымышленный стабилизатор наблюдательной платформы. Корабль подолгу держит выбранный ракурс, пока группа спорит о цвете туманности.',
      en: 'The ring around the central hull defines its silhouette and acts as a fictional stabiliser for the observation platform. It holds a viewpoint while the class debates a nebula’s colour.',
      he: 'הטבעת סביב הגוף המרכזי מגדירה את הצללית ומשמשת כמייצב בדיוני של משטח התצפית. הספינה שומרת על זווית בזמן שהקבוצה מתווכחת על צבע הערפילית.',
      es: 'El anillo que rodea el casco central define su silueta y funciona como un estabilizador ficticio de la plataforma de observación. Mantiene el punto de vista mientras la clase discute el color de una nebulosa.',
      fr: 'L’anneau qui entoure la coque centrale définit sa silhouette et sert de stabilisateur fictif à la plateforme d’observation. Il garde le point de vue pendant que la classe débat de la couleur d’une nébuleuse.'
    },
    comfort: {
      ru: 'Шесть двухместных кают, затемняемая обзорная галерея и столы для обработки снимков. Тёплый ужин и напитки подают вдали от оптики: объективы тоже хотят остаться чистыми.',
      en: 'Six twin cabins, a dimmable observation gallery and image-editing desks. A warm dinner and drinks are served away from the optics: lenses would like to stay clean too.',
      he: 'שישה תאים זוגיים, גלריית תצפית עם תאורה מתכווננת ושולחנות לעריכת תמונות. ארוחה חמה ומשקאות מוגשים הרחק מהאופטיקה: גם עדשות רוצות להישאר נקיות.',
      es: 'Seis camarotes dobles, una galería de observación con luz regulable y mesas de edición de imagen. La cena caliente y las bebidas se sirven lejos de la óptica: las lentes también quieren seguir limpias.',
      fr: 'Six cabines doubles, une galerie d’observation à lumière réglable et des postes de retouche d’images. Le dîner chaud et les boissons sont servis loin des optiques : les lentilles aussi aimeraient rester propres.'
    },
    conditions: {
      ru: 'Экраны от мелкой пыли и стабилизация снижают дрожание во время съёмки. Разгон неторопливый, стыковка мягкая. Кольцо требует просторного причала; высадка в кратер не предусмотрена.',
      en: 'Fine-dust screens and stabilisation reduce shake during photography. Acceleration is leisurely and docking gentle. The ring needs a roomy berth; crater landings are not offered.',
      he: 'מיגון מאבק דק וייצוב מפחיתים רעד בזמן הצילום. ההאצה נינוחה והעגינה עדינה. הטבעת זקוקה לרציף מרווח; נחיתות במכתשים אינן מוצעות.',
      es: 'Las pantallas contra el polvo fino y la estabilización reducen las vibraciones al fotografiar. La aceleración es pausada y el atraque, suave. El anillo necesita un muelle amplio; no se ofrecen aterrizajes en cráteres.',
      fr: 'Les écrans contre la poussière fine et la stabilisation réduisent les tremblements pendant la prise de vue. L’accélération est tranquille et l’amarrage en douceur. L’anneau exige un quai spacieux ; pas d’atterrissage dans les cratères.'
    },
    capacity: 12,
    priceCredits: 920,
    routeIds: ['orbit', 'nebula']
  },
  {
    id: 'quiet-horizon',
    image: 'assets/images/event-horizon-vessel.webp',
    name: { ru: 'Тихий Горизонт', en: 'Quiet Horizon', he: 'האופק השקט', es: 'Horizonte Tranquilo', fr: 'Horizon Tranquille' },
    role: { ru: 'Защищённый исследовательский корабль', en: 'Protected research ship', he: 'ספינת מחקר ממוגנת', es: 'Nave de investigación protegida', fr: 'Vaisseau de recherche protégé' },
    description: {
      ru: 'Тёмный корпус с ярким кольцевым узлом предназначен для небольшой исследовательской группы. Красивые виды наблюдают с безопасной дистанции: название не является приглашением внутрь чёрной дыры.',
      en: 'A dark hull with a bright ring assembly serves a small research group. Dramatic views are observed from a safe distance: the name is not an invitation into a black hole.',
      he: 'גוף כהה עם מכלול טבעתי בוהק משרת קבוצת מחקר קטנה. צופים בנופים הדרמטיים ממרחק בטוח: השם אינו הזמנה להיכנס לחור שחור.',
      es: 'Un casco oscuro con un conjunto de anillos brillantes sirve a un pequeño grupo de investigación. Las vistas espectaculares se observan desde una distancia segura: el nombre no es una invitación a entrar en un agujero negro.',
      fr: 'Une coque sombre avec un ensemble d’anneaux lumineux sert un petit groupe de recherche. Les vues spectaculaires s’observent à distance de sécurité : le nom n’est pas une invitation à entrer dans un trou noir.'
    },
    comfort: {
      ru: 'Восемь одноместных кают, тихая рабочая палуба, отдельные шкафы для приборов и небольшая столовая. Меню выбирают заранее; за эту цену даже печенье не прошло прошлую экспедицию.',
      en: 'Eight single cabins, a quiet work deck, individual instrument lockers and a small dining room. Meals are chosen in advance; at this price, even the biscuits missed the previous expedition.',
      he: 'שמונה תאים ליחיד, סיפון עבודה שקט, ארונות נפרדים למכשירים וחדר אוכל קטן. בוחרים ארוחות מראש; במחיר הזה אפילו העוגיות לא השתתפו במשלחת הקודמת.',
      es: 'Ocho camarotes individuales, una cubierta de trabajo silenciosa, taquillas individuales para instrumentos y un pequeño comedor. Las comidas se eligen con antelación; a este precio, hasta las galletas se perdieron la expedición anterior.',
      fr: 'Huit cabines individuelles, un pont de travail silencieux, des casiers à instruments individuels et une petite salle à manger. Les repas se choisissent à l’avance ; à ce prix, même les biscuits n’ont pas connu l’expédition précédente.'
    },
    conditions: {
      ru: 'Усиленная обшивка, экраны от пыли и резервные системы дают самый защищённый вариант в этом флоте. Стабилизация смягчает тряску и посадку. Посещение опасных зон исключено, даже по очень дорогому билету.',
      en: 'Reinforced plating, dust screens and backup systems make this the fleet’s most protected option. Stabilisation softens jolts and landings. Hazardous areas remain off limits, however expensive the ticket.',
      he: 'מעטפת מחוזקת, מיגון מאבק ומערכות גיבוי הופכים אותה לאפשרות הממוגנת ביותר בצי. הייצוב מרכך טלטלות ונחיתות. אזורים מסוכנים נשארים מחוץ למסלול, גם עם כרטיס יקר במיוחד.',
      es: 'El blindaje reforzado, las pantallas contra el polvo y los sistemas de reserva la convierten en la opción más protegida de la flota. La estabilización suaviza sacudidas y aterrizajes. Las zonas peligrosas siguen vedadas, por caro que sea el billete.',
      fr: 'Blindage renforcé, écrans anti-poussière et systèmes de secours en font l’option la plus protégée de la flotte. La stabilisation adoucit secousses et atterrissages. Les zones dangereuses restent interdites, quel que soit le prix du billet.'
    },
    capacity: 8,
    priceCredits: 1650,
    routeIds: ['nebula', 'craters']
  }
];
// КОНЕЦ РАЗДЕЛА 3
