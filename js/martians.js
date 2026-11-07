// js/martians.js
// Пасхалка с чёрным юмором в стиле фантастики 1950-х: марсиане под стеклянными шлемами выглядывают из углов.
// Сценарий «сначала страшно — потом смешно»:
//   1. Без музыки марсиане не взрываются: появляются один за другим, остаются по краям экрана и мешают —
//      выглядывают и прячутся. Когда их больше трёх, сайт аккуратно подсказывает включить музыку.
//   2. Музыка включилась — вся толпа танцует, а потом у марсиан по очереди лопаются головы: трескается шлем,
//      летят осколки, кровь, куски мозга, слизь и глаз. Иногда всё это шлёпается «изнутри» на стекло экрана.
//      Пока музыка играет, новые марсиане тоже появляются, танцуют и лопаются.
//      Перед взрывом марсианин один-два раза палит из бластера лучом через весь экран.
//   3. Части марсианина — глаз, зубы, палец, ухо, куски шлема и скафандра — по очереди врезаются «изнутри» в стекло
//      экрана с кровавой кляксой и медленно сползают, размазывая кровь. Тело без головы вылезает целиком,
//      ощупывает шею, машет, падает и только потом уползает.
//   Музыку выключили — те, кто ещё не начал взрываться, снова просто мешают.
// Только персонажи: никаких надписей и реплик. Рисунок свой (SVG ниже), звук генерирует браузер (Web Audio).
// Работает на любой странице с музыкой: ищет <audio> с атрибутом data-martian-music, #site-audio или #playlistAudio.
// Не появляется при «уменьшить анимацию» в системе, при открытом окне Bootstrap и на скрытой вкладке.

(function () {
    // BEGIN SECTION 1 — настройки и цвета
    const QUIET_DELAY = [9000, 16000];   // без музыки — новый марсианин каждые 9–16 с
    const MUSIC_DELAY = [8000, 18000];   // пока играет — новый каждые 8–18 с
    const MAX_CROWD = 6;                 // больше шести не собирается, чтобы страница оставалась читаемой
    const HINT_AFTER = 3;                // подсказка — когда марсиан больше трёх
    const DANCE = [3000, 5500];          // сколько первый танцует под музыку, прежде чем лопнуть
    const NEXT_POP = [1200, 2600];       // пауза между взрывами остальных
    const BLOOD = ["#7a0000", "#9e0b0b", "#b31212", "#c81d1d", "#5c0000"];
    const BRAIN = ["#e7a3b1", "#d98597", "#f0bac5", "#c46b80"];
    const GOO = ["#8fd14f", "#6fbf3a", "#b7e36a"];
    // Аккуратная подсказка сайта (не реплика персонажа), когда в тишине собралось больше трёх марсиан.
    // Язык берётся из <html lang> в момент показа, поэтому работает и после переключения языка.
    const HINT = {
        en: "To fight off the alien invasion, turn on the music.",
        ru: "Для борьбы с инопланетным вторжением включите музыку.",
        he: "כדי להדוף את הפלישה החייזרית, הפעילו את המוזיקה."
    };
    // END SECTION 1

    // BEGIN SECTION 2 — рисунок марсианина
    // Тело в металлическом костюме и отдельная группа головы (череп, мозг в венах, стеклянный шлем):
    // именно она раздувается и лопается. Глаза и вены — отдельные классы для анимации.
    const MARTIAN_SVG = `
<svg viewBox="0 0 100 132" aria-hidden="true">
  <defs>
    <radialGradient id="mrt-skin" cx="50%" cy="35%" r="72%">
      <stop offset="0" stop-color="#eef0d8"/><stop offset=".5" stop-color="#c3c99c"/><stop offset="1" stop-color="#5f6a3e"/>
    </radialGradient>
    <radialGradient id="mrt-brain" cx="38%" cy="28%" r="80%">
      <stop offset="0" stop-color="#fde6d6"/><stop offset=".45" stop-color="#eab1ad"/><stop offset="1" stop-color="#93445a"/>
    </radialGradient>
    <linearGradient id="mrt-suit" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a9b3c2"/><stop offset=".45" stop-color="#525d70"/><stop offset="1" stop-color="#1e242e"/>
    </linearGradient>
    <radialGradient id="mrt-eye" cx="42%" cy="38%" r="62%">
      <stop offset="0" stop-color="#fffdf0"/><stop offset=".65" stop-color="#f3e6c6"/><stop offset="1" stop-color="#c9786c"/>
    </radialGradient>
  </defs>
  <g class="martian-body">
    <path d="M45 118 L43 129 M55 118 L57 129" stroke="#7d9a4a" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M39 130 h7 M54 130 h7" stroke="#1e242e" stroke-width="3" stroke-linecap="round"/>
    <path d="M39 97 Q50 93 61 97 L59 118 Q50 121 41 118 Z" fill="url(#mrt-suit)" stroke="#12161d" stroke-width="1"/>
    <path d="M42 103 L58 103 M43 110 L57 110" stroke="#cfd8e4" stroke-width=".6" opacity=".45"/>
    <circle cx="50" cy="114" r="1.8" fill="#ff3b3b" class="martian-light"/>
    <ellipse cx="37" cy="98.5" rx="5" ry="3" fill="#8793a5" stroke="#12161d" stroke-width=".8"/>
    <ellipse cx="63" cy="98.5" rx="5" ry="3" fill="#8793a5" stroke="#12161d" stroke-width=".8"/>
    <path class="martian-arm" d="M34 99 Q24 104 20 94 L17 86 M17 86 L13 82 M17 86 L15 80 M17 86 L19 80" stroke="#86a552" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path class="martian-arm martian-arm--right" d="M66 99 Q76 104 80 94 L83 86 M83 86 L87 82 M83 86 L85 80 M83 86 L81 80" stroke="#86a552" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g class="martian-gun">
      <path d="M81 82 L94 77 L95 81 L83 85 Z" fill="#c9ced6" stroke="#1e242e" stroke-width=".9"/>
      <circle cx="94.6" cy="79" r="2" fill="#ff3b3b"/><path d="M83 85 L82 90" stroke="#1e242e" stroke-width="2" stroke-linecap="round"/>
      <path class="martian-zap" d="M96 79 L108 73 L104 79 L118 71" stroke="#ff2d55" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
    <ellipse cx="50" cy="95.5" rx="16" ry="3.4" fill="#bcc7d6" stroke="#232a36" stroke-width="1"/>
    <g class="martian-neck-stump"><ellipse cx="50" cy="93.5" rx="5.5" ry="2.4" fill="#6b0000"/><ellipse cx="50" cy="93" rx="3" ry="1.3" fill="#e7a3b1"/></g>
    <g class="martian-head">
      <path d="M46 96 L46.5 89 L53.5 89 L54 96 Z" fill="#7d8660"/>
      <path d="M23 52 Q21 61 25 67 Q21 74 29 80 Q35 90 44 93 L56 93 Q65 90 71 80 Q79 74 75 67 Q79 61 77 52 Z" fill="url(#mrt-skin)" stroke="#3c4424" stroke-width="1.1"/>
      <path d="M25 67 Q29 71 30 78 M75 67 Q71 71 70 78" stroke="#4a5530" stroke-width="1.2" fill="none" opacity=".7"/>
      <ellipse cx="26.5" cy="60" rx="3.2" ry="5.5" fill="#3c4424" opacity=".45"/>
      <ellipse cx="73.5" cy="60" rx="3.2" ry="5.5" fill="#3c4424" opacity=".45"/>
      <path d="M27 54 Q38 50 47 56 M53 56 Q62 50 73 54" stroke="#3c4424" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M27 64 Q27 54 38 54 Q49 54 48.5 64 Q48 75 38 75 Q27 75 27 64 Z" fill="#0b0b06"/>
      <path d="M51.5 64 Q51 54 62 54 Q73 54 73 64 Q73 75 62 75 Q52 75 51.5 64 Z" fill="#0b0b06"/>
      <g class="martian-eye">
        <circle cx="38" cy="64.5" r="9.4" fill="url(#mrt-eye)"/>
        <path d="M29.5 61 L33.5 63 L32 65.5 M30 69.5 L34 67.5 M46.5 59 L42.5 62 L44 63.5 M46.8 68.5 L42.6 66.4 M38 55.6 L38.6 59" stroke="#c0151a" stroke-width=".7" fill="none"/>
        <circle cx="38.6" cy="64.6" r="2.9" fill="#b0080d"/><circle cx="38.6" cy="64.6" r="1" fill="#050505"/>
        <circle cx="36" cy="61.6" r="1.1" fill="#fff"/>
      </g>
      <g class="martian-eye martian-eye--right">
        <circle cx="62" cy="64.5" r="9.4" fill="url(#mrt-eye)"/>
        <path d="M70.5 61 L66.5 63 L68 65.5 M70 69.5 L66 67.5 M53.5 59 L57.5 62 L56 63.5 M53.2 68.5 L57.4 66.4 M62 55.6 L61.4 59" stroke="#c0151a" stroke-width=".7" fill="none"/>
        <circle cx="61.4" cy="64.6" r="2.9" fill="#b0080d"/><circle cx="61.4" cy="64.6" r="1" fill="#050505"/>
        <circle cx="59" cy="61.6" r="1.1" fill="#fff"/>
      </g>
      <path d="M50 73 Q47 74.5 47.5 78 L50 76.6 L52.5 78 Q53 74.5 50 73 Z" fill="#14140a"/>
      <path d="M31 82 Q50 76.5 69 82 Q66 91 50 92 Q34 91 31 82 Z" fill="#2a0505"/>
      <path d="M33 81.4 Q50 78.6 67 81.4" stroke="#7a1d1d" stroke-width="1.4" fill="none"/>
      <path d="M35.0 80.6 L35.0 84.6 M38.3 80.6 L38.3 84.6 M41.6 80.6 L41.6 84.6 M44.9 80.6 L44.9 84.6 M48.2 80.6 L48.2 84.6 M51.5 80.6 L51.5 84.6 M54.8 80.6 L54.8 84.6 M58.1 80.6 L58.1 84.6 M61.4 80.6 L61.4 84.6 M64.7 80.6 L64.7 84.6" stroke="#f3ead0" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M36.6 85.6 L36.6 88.8 M39.9 85.6 L39.9 88.8 M43.2 85.6 L43.2 88.8 M46.5 85.6 L46.5 88.8 M49.8 85.6 L49.8 88.8 M53.1 85.6 L53.1 88.8 M56.4 85.6 L56.4 88.8 M59.7 85.6 L59.7 88.8 M63.0 85.6 L63.0 88.8" stroke="#e4d9b8" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M31 82 Q50 77 69 82" stroke="#3c4424" stroke-width="1" fill="none"/>
      <path d="M13 44 Q9 30 15 22 Q14 12 26 9 Q32 1 42 4 Q50 0 58 4 Q68 1 74 9 Q86 12 85 22 Q91 30 87 44 Q85 54 74 57 Q62 60 50 59 Q38 60 26 57 Q15 54 13 44 Z" fill="url(#mrt-brain)" stroke="#7d2f45" stroke-width="1.2"/>
      <path d="M50 4 Q48 20 51 32 Q48 46 50 59" stroke="#7d2f45" stroke-width="1.8" fill="none"/>
      <path d="M18 24 Q23 18 27 24 Q30 30 35 24 Q38 18 44 21 M56 21 Q62 18 65 24 Q70 30 73 24 Q77 18 82 24 M15 36 Q21 30 25 37 Q29 44 35 37 Q40 30 46 36 M54 36 Q60 30 65 37 Q71 44 75 37 Q79 30 85 36 M19 48 Q25 42 30 49 Q35 55 41 49 M59 49 Q65 55 70 49 Q75 42 81 48 M28 11 Q34 15 38 10 M62 10 Q66 15 72 11 M24 30 Q28 33 31 30 M69 30 Q72 33 76 30 M36 44 Q40 47 44 44 M56 44 Q60 47 64 44 M40 15 Q44 20 46 14 M54 14 Q56 20 60 15"
            stroke="#8e3a55" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M19 23 Q23 19 26 23 M57 20 Q62 18 64 22 M16 35 Q20 31 23 35 M55 35 Q59 31 63 35 M29 10 Q33 13 36 10" stroke="#fff3ec" stroke-width=".7" fill="none" opacity=".8"/>
      <path d="M22 28 Q27 33 30 28 M70 28 Q74 34 78 28 M33 52 Q38 49 42 53 M58 53 Q62 49 67 52" stroke="#5b4fb4" stroke-width=".7" fill="none" opacity=".55"/>
      <path class="martian-veins" d="M20 30 Q26 26 28 31 Q31 36 36 30 M64 28 Q70 24 74 30 M30 46 Q36 50 40 44 M60 44 Q66 50 72 44 M46 12 Q44 22 47 27 M80 40 Q76 46 72 42"
            stroke="#d1001f" stroke-width=".9" fill="none" stroke-linecap="round"/>
      <path class="martian-helmet" d="M6 52 Q0 2 50 0 Q100 2 94 52 Q96 96 50 98 Q4 96 6 52 Z" fill="rgba(190,235,255,.09)" stroke="rgba(210,245,255,.6)" stroke-width="1.4"/>
      <path class="martian-helmet" d="M18 16 Q28 5 45 4" stroke="rgba(255,255,255,.75)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path class="martian-helmet" d="M87 60 Q85 78 74 88" stroke="rgba(255,255,255,.35)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path class="martian-crack" d="M72 10 L64 21 L69 26 L60 36 M64 21 L56 19 M69 26 L77 30" stroke="rgba(255,255,255,.9)" stroke-width=".9" fill="none"/>
    </g>
  </g>
</svg>`;

    // Откуда выглядывает: снизу, слева, справа, сверху (вниз головой)
    const SPOTS = [
        {name: "bottom", hidden: "translateY(115%)", shown: "translateY(12%)", peek: "translateY(55%)", out: "translateY(-6%) scale(1.15)"},
        {name: "left", hidden: "rotate(90deg) translateY(115%)", shown: "rotate(90deg) translateY(22%)", peek: "rotate(90deg) translateY(60%)", out: "rotate(90deg) translateY(-2%) scale(1.15)"},
        {name: "right", hidden: "rotate(-90deg) translateY(115%)", shown: "rotate(-90deg) translateY(22%)", peek: "rotate(-90deg) translateY(60%)", out: "rotate(-90deg) translateY(-2%) scale(1.15)"},
        {name: "top", hidden: "rotate(180deg) translateY(115%)", shown: "rotate(180deg) translateY(22%)", peek: "rotate(180deg) translateY(60%)", out: "rotate(180deg) translateY(-2%) scale(1.15)"}
    ];
    // END SECTION 2

    // BEGIN SECTION 3 — общие помощники
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stage = null;
    let timer = null;
    const crowd = [];                     // марсиане на экране: {el, spot, state: quiet | doomed | popping}
    let queueRunning = false;

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function music() {
        return document.querySelector("audio[data-martian-music]") ||
            document.getElementById("site-audio") ||
            document.getElementById("playlistAudio");
    }

    function canShow() {
        return !document.hidden && !document.body.classList.contains("modal-open");
    }

    function musicPlaying() {
        const m = music();
        return !!m && !m.paused;
    }

    function placeMartian(el, spot) {
        const w = window.innerWidth, h = window.innerHeight;
        el.style.left = el.style.right = el.style.top = el.style.bottom = "";
        if (spot.name === "bottom") {
            el.style.bottom = "0";
            el.style.left = rand(0.05, 0.8) * w + "px";
        } else if (spot.name === "top") {
            el.style.top = "0";
            el.style.left = rand(0.1, 0.8) * w + "px";
        } else {
            el.style.top = rand(0.25, 0.7) * h + "px";
            el.style[spot.name] = "-10px";
        }
        el.style.transformOrigin = spot.name === "bottom" ? "50% 100%" : "50% 50%";
    }

    let hint = null;

    function updateHint() {
        const quiet = crowd.filter(m => m.state === "quiet").length;
        const needed = !musicPlaying() && quiet > HINT_AFTER;
        if (!needed) {
            if (hint) hint.classList.remove("visible");
            return;
        }
        if (!hint) {
            hint = document.createElement("div");
            hint.className = "martian-hint";
            hint.setAttribute("role", "status");
            document.body.appendChild(hint);
        }
        const lang = (document.documentElement.lang || "en").slice(0, 2);
        hint.textContent = HINT[lang] || HINT.en;
        hint.dir = lang === "he" ? "rtl" : "ltr";
        hint.classList.add("visible");
    }

    // Место у края экрана подальше от уже сидящих марсиан
    function freeSpot(el) {
        let spot = pick(SPOTS);
        for (let attempt = 0; attempt < 10; attempt++) {
            spot = pick(SPOTS);
            placeMartian(el, spot);
            const x = parseFloat(el.style.left) || 0, y = parseFloat(el.style.top) || 0;
            const close = crowd.some(m => m.spot.name === spot.name &&
                Math.hypot((parseFloat(m.el.style.left) || 0) - x, (parseFloat(m.el.style.top) || 0) - y) < 150);
            if (!close) break;
        }
        return spot;
    }
    // END SECTION 3

    // BEGIN SECTION 4 — взрыв: вспышка и части марсианина, которые врезаются в стекло экрана
    // Мелких осколков больше нет: вместо них узнаваемые части (глаз, зубы, палец, ухо, куски шлема и скафандра)
    // летят «на зрителя», шлёпаются о стекло с кровавой кляксой и сползают вниз, оставляя кровавый след.
    let uid = 0;
    const ORGANS = {
        eye: (id) => `<defs><radialGradient id="${id}" cx=".42" cy=".38" r=".62"><stop offset="0" stop-color="#fffdf0"/>` +
            `<stop offset=".7" stop-color="#efd9bd"/><stop offset="1" stop-color="#c0685a"/></radialGradient></defs>` +
            `<path d="M52 58 Q70 74 90 97" stroke="#8e1414" stroke-width="8" fill="none" stroke-linecap="round"/>` +
            `<circle cx="46" cy="44" r="31" fill="url(#${id})" stroke="#7a1010" stroke-width="1.5"/>` +
            `<path d="M18 38 Q26 40 30 46 M20 54 Q28 52 32 56 M72 30 Q64 34 62 40 M74 52 Q66 50 62 54 M44 14 Q46 22 44 28" stroke="#c4161c" stroke-width="1.3" fill="none"/>` +
            `<circle cx="48" cy="46" r="12" fill="#a8070d"/><circle cx="48" cy="46" r="5" fill="#050505"/>` +
            `<circle cx="42" cy="38" r="4" fill="#fff" opacity=".85"/>`,
        teeth: () => `<path d="M6 42 Q50 20 94 42 L90 62 Q50 46 10 62 Z" fill="#8c1f2a" stroke="#4d0a12" stroke-width="1.5"/>` +
            [0, 1, 2, 3, 4, 5].map(i => `<path d="M${15 + i * 12} 47 l10 -1 l-1 24 q-4 7 -8 0 z" fill="#f3ead0" stroke="#a89a72" stroke-width="1"/>`).join('') +
            `<path d="M30 60 q2 14 0 22 q-3 4 -5 0 q-1 -10 2 -20 z" fill="#9e0b0b"/>`,
        finger: () => `<path d="M24 88 Q20 52 36 30 Q46 16 60 18 Q68 22 64 32 Q52 52 50 88 Z" fill="#8faf58" stroke="#34401f" stroke-width="2"/>` +
            `<path d="M27 62 Q38 60 49 63 M33 40 Q44 38 54 43" stroke="#34401f" stroke-width="1.8" fill="none"/>` +
            `<path d="M58 18 Q74 2 84 10 Q72 14 64 28 Z" fill="#2a2a20"/>` +
            `<ellipse cx="37" cy="88" rx="15" ry="6" fill="#7a0000"/><ellipse cx="37" cy="87" rx="6" ry="2.6" fill="#e6dcc0"/>`,
        ear: () => `<path d="M32 90 Q12 62 24 34 Q38 6 74 4 Q60 26 64 46 Q68 70 50 92 Z" fill="#b4bd8c" stroke="#3c4424" stroke-width="2"/>` +
            `<path d="M36 78 Q26 58 34 38 Q44 22 62 14 Q50 34 54 50 Q56 64 46 80" fill="#8e9a64"/>` +
            `<path d="M30 90 Q40 84 52 92 L48 98 Q40 94 32 97 Z" fill="#8a0000"/>`,
        helmet: () => `<path d="M8 72 Q18 18 72 6 L90 26 L62 40 L78 58 L42 66 L30 94 Z" fill="rgba(200,240,255,.38)" stroke="rgba(235,250,255,.95)" stroke-width="2"/>` +
            `<path d="M18 60 Q26 30 60 16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>` +
            `<path d="M44 34 L52 48 L46 58 M60 30 L66 40" stroke="rgba(255,255,255,.9)" stroke-width="1.2" fill="none"/>` +
            `<path d="M32 88 q4 -8 10 -6" stroke="#9e0b0b" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        suit: (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b3bdcb"/>` +
            `<stop offset=".5" stop-color="#55606f"/><stop offset="1" stop-color="#232a35"/></linearGradient></defs>` +
            `<path d="M10 20 L80 10 L92 68 L62 62 L54 90 L32 74 L14 86 Z" fill="url(#${id})" stroke="#10141b" stroke-width="2"/>` +
            `<circle cx="22" cy="28" r="2.6" fill="#d8dee8"/><circle cx="70" cy="20" r="2.6" fill="#d8dee8"/><circle cx="80" cy="58" r="2.6" fill="#d8dee8"/>` +
            `<circle cx="46" cy="44" r="7" fill="#ff3b3b" stroke="#5c0000" stroke-width="2"/>` +
            `<path d="M54 90 L48 80 L40 84 L32 74" stroke="#7a0000" stroke-width="3" fill="none"/>`,
        brain: () => `<path d="M10 54 Q6 24 32 18 Q50 6 70 18 Q94 24 90 54 Q86 80 54 82 Q20 84 10 54 Z" fill="#e8a6b0" stroke="#8e3a55" stroke-width="2"/>` +
            `<path d="M20 40 Q30 30 38 42 Q46 52 54 40 Q62 28 74 40 M18 60 Q28 52 36 62 Q46 70 56 60 Q66 50 80 58 M50 20 Q48 40 52 76" stroke="#8e3a55" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
            `<path d="M30 78 q4 8 2 14" stroke="#9e0b0b" stroke-width="4" fill="none" stroke-linecap="round"/>`
    };
    const ORGAN_SIZE = {eye: [80, 110], teeth: [96, 128], finger: [80, 110], ear: [84, 114], helmet: [110, 150], suit: [100, 136], brain: [96, 130]};

    // Вспышка в момент взрыва
    function explode(x, y) {
        const burst = document.createElement("div");
        burst.className = "martian-burst";
        burst.style.left = x + "px";
        burst.style.top = y + "px";
        stage.appendChild(burst);
        setTimeout(() => burst.remove(), 700);
    }

    // Одна часть: летит от места взрыва «на зрителя», врезается в стекло, сползает и оставляет кровавый след
    function organHit(kind, x0, y0, delay, parts) {
        const [minSize, maxSize] = ORGAN_SIZE[kind];
        const size = rand(minSize, maxSize);
        const tx = rand(0.1, 0.88) * window.innerWidth, ty = rand(0.08, 0.5) * window.innerHeight;
        const organ = document.createElement("div");
        organ.className = "martian-organ";
        organ.style.width = organ.style.height = size + "px";
        organ.style.left = tx - size / 2 + "px";
        organ.style.top = ty - size / 2 + "px";
        organ.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${ORGANS[kind](`martian-organ-${uid++}`)}</svg>`; // разметка из этого файла
        organ.style.opacity = "0";
        stage.appendChild(organ);
        parts.push(organ);
        const spin = rand(-40, 40);
        setTimeout(() => {
            organ.style.opacity = "1";
            // Полёт: из глубины, от места взрыва, быстро растёт — будто летит прямо в экран
            organ.animate([
                {transform: `translate(${x0 - tx}px, ${y0 - ty}px) scale(.12) rotate(${spin - 120}deg)`},
                {transform: `translate(0, 0) scale(1.08) rotate(${spin}deg)`, offset: .85},
                {transform: `translate(0, 0) scale(1) rotate(${spin}deg)`}
            ], {duration: 430, easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards"});
        }, delay);
        // Шлепок о стекло: клякса под частью и звук
        setTimeout(() => {
            const splat = document.createElement("div");
            splat.className = "martian-glass";
            const splatSize = size * rand(1.6, 2.1);
            splat.style.width = splatSize + "px";
            splat.style.height = splatSize * 260 / 220 + "px";
            splat.style.left = tx - splatSize / 2 + "px";
            splat.style.top = ty - splatSize * 0.42 + "px";
            splat.innerHTML = splatSVG(pick(BLOOD), kind === "brain"); // разметка строится в этом файле из чисел
            stage.insertBefore(splat, organ);
            parts.push(splat);
            playSplat(0.55, kind === "helmet");
        }, delay + 380);
        // Сползание: часть медленно съезжает вниз, за ней тянется полоса размазанной крови
        const slide = rand(90, 230), slideTime = rand(2800, 4400), slideStart = delay + rand(800, 1400);
        setTimeout(() => {
            const smear = document.createElement("div");
            smear.className = "martian-smear";
            const width = size * rand(0.32, 0.5);
            smear.style.width = width + "px";
            smear.style.height = slide + "px";
            smear.style.left = tx - width / 2 + "px";
            smear.style.top = ty + "px";
            smear.style.setProperty("--smear", pick(BLOOD));
            stage.insertBefore(smear, organ);
            parts.push(smear);
            smear.animate([{transform: "scaleY(0)"}, {transform: "scaleY(1)"}],
                {duration: slideTime, easing: "cubic-bezier(.45,0,.75,.6)", fill: "forwards"});
            organ.animate([
                {transform: `translate(0, 0) scale(1) rotate(${spin}deg)`},
                {transform: `translate(${rand(-12, 12)}px, ${slide}px) scale(1) rotate(${spin + rand(-25, 25)}deg)`}
            ], {duration: slideTime, easing: "cubic-bezier(.45,0,.75,.6)", fill: "forwards"});
        }, slideStart);
        return slideStart + slideTime;
    }

    // У каждого взорвавшегося марсианина свой набор частей, прилетающих в разное время
    function organsFrom(x, y) {
        const kinds = Object.keys(ORGANS).sort(() => Math.random() - 0.5).slice(0, Math.round(rand(3, 5)));
        let delay = 120, done = 0;
        const parts = []; // кляксы и следы добавляются сюда по мере появления — в конце убираем всё разом
        for (const kind of kinds) {
            done = Math.max(done, organHit(kind, x, y, delay, parts));
            delay += rand(260, 700);
        }
        return {parts, done};
    }

    // Клякса как SVG: неровное пятно с выплесками-лучами, капли вокруг, подтёки вниз и влажный блик.
    // Форма каждый раз новая (случайные радиусы), поэтому две кляксы никогда не совпадают.
    function splatSVG(color, brainy) {
        const R = 46, points = [], count = 18;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            points.push([Math.cos(angle) * R * rand(0.72, 1.08), Math.sin(angle) * R * rand(0.72, 1.08)]);
            if (Math.random() < 0.38) { // выплеск: узкий длинный луч
                const reach = R * rand(1.35, 2.05), side = 0.05;
                points.push([Math.cos(angle + side) * R * 0.95, Math.sin(angle + side) * R * 0.95]);
                points.push([Math.cos(angle + side * 2) * reach, Math.sin(angle + side * 2) * reach]);
                points.push([Math.cos(angle + side * 3) * R * 0.95, Math.sin(angle + side * 3) * R * 0.95]);
            }
        }
        let d = "";
        for (let i = 0; i < points.length; i++) {
            const [x, y] = points[i], [nx, ny] = points[(i + 1) % points.length];
            const mx = (x + nx) / 2, my = (y + ny) / 2;
            d += i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : `Q${x.toFixed(1)} ${y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
        }
        d += `Q${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} ${((points[0][0] + points[1][0]) / 2).toFixed(1)} ${((points[0][1] + points[1][1]) / 2).toFixed(1)}Z`;
        let drops = "";
        for (let i = 0; i < 14; i++) {
            const angle = rand(0, Math.PI * 2), dist = R * rand(1.15, 2.1);
            drops += `<circle cx="${(Math.cos(angle) * dist).toFixed(1)}" cy="${(Math.sin(angle) * dist).toFixed(1)}" r="${rand(1.2, 5).toFixed(1)}"/>`;
        }
        let drips = "";
        for (let i = 0; i < Math.round(rand(2, 4)); i++) {
            const x = rand(-R * 0.6, R * 0.6), width = rand(4, 9), length = rand(40, 130);
            drips += `<g class="martian-drip" style="--drip-time:${rand(1.8, 3.2).toFixed(2)}s;--drip-delay:${rand(0.2, 0.6).toFixed(2)}s">` +
                `<rect x="${(x - width / 2).toFixed(1)}" y="0" width="${width.toFixed(1)}" height="${length.toFixed(1)}" rx="${(width / 2).toFixed(1)}"/>` +
                `<circle cx="${x.toFixed(1)}" cy="${length.toFixed(1)}" r="${(width * 0.75).toFixed(1)}"/></g>`;
        }
        let chunks = "";
        if (brainy) {
            for (let i = 0; i < 3; i++) {
                const x = rand(-22, 22), y = rand(-22, 18), w = rand(9, 16);
                chunks += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * 0.75).toFixed(1)}" fill="${pick(BRAIN)}" stroke="#7d2f45" stroke-width="1"/>` +
                    `<path d="M${(x - w * 0.6).toFixed(1)} ${y.toFixed(1)} q${(w * 0.3).toFixed(1)} -4 ${(w * 0.6).toFixed(1)} 0 t${(w * 0.6).toFixed(1)} 0" stroke="#8e3a55" stroke-width="1.2" fill="none"/>`;
            }
        }
        return `<svg viewBox="-110 -110 220 260" aria-hidden="true"><g fill="${color}">` +
            `<g class="martian-drips">${drips}</g><path d="${d}"/>${drops}</g>` +
            `<path d="${d}" fill="none" stroke="rgba(40,0,0,.45)" stroke-width="3"/>${chunks}` +
            `<ellipse cx="-14" cy="-16" rx="12" ry="6" fill="rgba(255,255,255,.32)" transform="rotate(-30 -14 -16)"/></svg>`;
    }

    // Пятна крови (и иногда мозгов) «на стекле» экрана: шлепок изнутри и подтёки вниз
    function screenSplat() {
        const blobs = [];
        const count = Math.round(rand(3, 6));
        for (let i = 0; i < count; i++) {
            const blob = document.createElement("div");
            blob.className = "martian-glass";
            const size = rand(110, 240);
            blob.style.width = size + "px";
            blob.style.height = size * 260 / 220 + "px";
            blob.style.left = rand(0.06, 0.86) * window.innerWidth - size / 2 + "px";
            blob.style.top = rand(0.05, 0.6) * window.innerHeight - size / 2 + "px";
            blob.style.animationDelay = i * 70 + "ms";
            blob.innerHTML = splatSVG(pick(BLOOD), Math.random() < 0.3); // разметка строится в этом файле из чисел
            stage.appendChild(blob);
            blobs.push(blob);
        }
        setTimeout(() => playSplat(1, false), 60);
        return blobs;
    }
    // END SECTION 4

    // BEGIN SECTION 5 — звук: треск стекла и мокрый «шлёп»
    // Короткий шум с падающим фильтром, глухой удар и (по желанию) высокий звон осколков.
    // Громкость — от громкости музыки сайта.
    let audioCtx = null;

    function playSplat(strength, glass) {
        try {
            const m = music();
            const volume = (m ? m.volume : 0.5) * 0.75 * strength;
            if (volume <= 0) return;
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === "suspended") audioCtx.resume();
            const now = audioCtx.currentTime;
            const noiseBurst = (seconds, from, to, type, gainValue) => {
                const buffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * seconds), audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                const filter = audioCtx.createBiquadFilter();
                filter.type = type;
                filter.frequency.setValueAtTime(from, now);
                filter.frequency.exponentialRampToValueAtTime(to, now + seconds * 0.85);
                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(gainValue, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + seconds);
                source.connect(filter).connect(gain).connect(audioCtx.destination);
                source.start(now);
            };
            noiseBurst(0.45, 2600, 140, "lowpass", volume);                 // мокрый шлепок
            if (glass) noiseBurst(0.25, 6000, 3500, "highpass", volume * 0.5); // звон осколков
            const thump = audioCtx.createOscillator();
            thump.frequency.setValueAtTime(130, now);
            thump.frequency.exponentialRampToValueAtTime(38, now + 0.22);
            const thumpGain = audioCtx.createGain();
            thumpGain.gain.setValueAtTime(volume, now);
            thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            thump.connect(thumpGain).connect(audioCtx.destination);
            thump.start(now);
            thump.stop(now + 0.27);
        } catch (e) {
            // нет Web Audio — просто без звука
        }
    }
    // «Пиу»: короткий свист бластера, падающий сверху вниз
    function playPew() {
        try {
            const m = music();
            const volume = (m ? m.volume : 0.5) * 0.35;
            if (volume <= 0) return;
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === "suspended") audioCtx.resume();
            const now = audioCtx.currentTime;
            ["square", "sawtooth"].forEach((type, i) => {
                const oscillator = audioCtx.createOscillator();
                oscillator.type = type;
                oscillator.frequency.setValueAtTime(1700 + i * 40, now);
                oscillator.frequency.exponentialRampToValueAtTime(240, now + 0.2);
                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(volume * (i ? 0.5 : 1), now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                oscillator.connect(gain).connect(audioCtx.destination);
                oscillator.start(now);
                oscillator.stop(now + 0.24);
            });
        } catch (e) {
            // нет Web Audio — без звука
        }
    }

    // Выстрел: луч из дула бластера через весь экран, вспышка у дула и звук
    function fireBlaster(martian) {
        const muzzle = martian.el.querySelector(".martian-gun circle");
        if (!muzzle) return;
        const m = muzzle.getBoundingClientRect();
        const x = m.left + m.width / 2, y = m.top + m.height / 2;
        const aimX = window.innerWidth * rand(0.25, 0.75), aimY = window.innerHeight * rand(0.2, 0.7);
        const angle = Math.atan2(aimY - y, aimX - x);
        const beam = document.createElement("div");
        beam.className = "martian-beam";
        beam.style.left = x + "px";
        beam.style.top = y + "px";
        beam.style.width = Math.hypot(window.innerWidth, window.innerHeight) * 1.2 + "px";
        stage.appendChild(beam);
        beam.animate([
            {transform: `rotate(${angle}rad) scaleX(0)`, opacity: 1},
            {transform: `rotate(${angle}rad) scaleX(1)`, opacity: 1, offset: 0.3},
            {transform: `rotate(${angle}rad) scaleX(1)`, opacity: 0}
        ], {duration: 420, easing: "ease-out", fill: "forwards"});
        const flash = document.createElement("div");
        flash.className = "martian-flash";
        flash.style.left = x + "px";
        flash.style.top = y + "px";
        stage.appendChild(flash);
        playPew();
        setTimeout(() => { beam.remove(); flash.remove(); }, 450);
    }
    // END SECTION 5

    // BEGIN SECTION 6 — толпа, танец и взрывы
    // Новый марсианин выглядывает; в тишине остаётся мешать, под музыку встаёт в очередь на взрыв.
    async function spawn() {
        if (!canShow() || crowd.length >= MAX_CROWD) return;
        const el = document.createElement("div");
        el.className = "martian";
        el.innerHTML = MARTIAN_SVG; // постоянная разметка из этого файла, без данных пользователя
        const spot = freeSpot(el);
        el.style.transform = spot.hidden;
        stage.appendChild(el);
        const martian = {el, spot, state: "quiet", fidget: null};
        crowd.push(martian);
        await wait(50);
        el.style.transform = spot.shown;
        if (musicPlaying()) doom(martian);
        else quiet(martian);
    }

    // Тишина: сидит у края, оглядывается, то прячется наполовину, то снова высовывается
    function quiet(martian) {
        martian.state = "quiet";
        martian.el.classList.add("quiet");
        clearInterval(martian.fidget);
        let peeking = false;
        martian.fidget = setInterval(() => {
            if (martian.state !== "quiet") return;
            peeking = !peeking;
            martian.el.style.transform = peeking ? martian.spot.peek : martian.spot.shown;
        }, rand(3000, 7000));
        updateHint();
    }

    function doom(martian) {
        martian.state = "doomed";
        clearInterval(martian.fidget);
        martian.el.classList.remove("quiet");    // теперь он танцует — и ему конец
        martian.el.style.transform = martian.spot.shown;
        updateHint();
        runQueue();
    }

    // Ждём, но прерываемся, если музыку выключили
    async function waitOrSilence(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end && musicPlaying()) await wait(200);
    }

    // Обречённые лопаются по одному: первый — после танца, следующие — с короткими паузами
    async function runQueue() {
        if (queueRunning) return;
        queueRunning = true;
        let first = true;
        while (musicPlaying()) {
            const next = crowd.find(m => m.state === "doomed");
            if (!next) break;
            await waitOrSilence(first ? rand(DANCE[0], DANCE[1]) : rand(NEXT_POP[0], NEXT_POP[1]));
            while (!canShow() && musicPlaying()) await wait(500);
            if (!musicPlaying() || next.state !== "doomed") break;
            first = false;
            await pop(next);                      // ждём только до самого взрыва, развязка идёт параллельно
        }
        queueRunning = false;
    }

    async function pop(martian) {
        martian.state = "popping";
        const el = martian.el;
        el.classList.add("frenzy");               // глаза навыкате, вены пульсируют, шлем трескается
        await wait(250);
        fireBlaster(martian);                     // пиу!
        await wait(420);
        if (Math.random() < 0.6) fireBlaster(martian); // иногда второй выстрел
        await wait(430);
        el.classList.add("swelling");             // голова раздувается
        await wait(1500);
        const head = el.querySelector(".martian-head").getBoundingClientRect();
        el.classList.add("popped");               // ба-бах
        const x = head.left + head.width / 2, y = head.top + head.height * 0.45;
        explode(x, y);
        playSplat(0.8, true);
        aftermath(martian, organsFrom(x, y));
    }

    // Развязка: тело без головы вылезает целиком, ощупывает шею, машет, падает и уползает; части на стекле тают
    async function aftermath(martian, organs) {
        const el = martian.el;
        el.style.transform = martian.spot.out;    // тело хорошо видно, а не прячется за краем
        await wait(700);
        el.classList.add("searching");
        await wait(1800);
        el.classList.remove("searching");
        el.classList.add("waving");
        await wait(1500);
        el.classList.remove("waving");
        el.classList.add("fallen");               // падает навзничь
        await wait(1100);
        el.style.transform = martian.spot.hidden; // и уползает
        await wait(900);
        el.remove();
        crowd.splice(crowd.indexOf(martian), 1);
        // Части досползают, потом всё тает
        const rest = organs.done - 6000;
        if (rest > 0) await wait(rest);
        await wait(1200);
        organs.parts.forEach(part => part.classList.add("fading"));
        await wait(1500);
        organs.parts.forEach(part => part.remove());
    }

    function schedule(range) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await spawn();
            schedule(musicPlaying() ? MUSIC_DELAY : QUIET_DELAY);
        }, rand(range[0], range[1]));
    }

    function init() {
        if (reducedMotion) return;
        const m = music();
        if (!m) return;
        stage = document.createElement("div");
        stage.className = "martian-stage";
        stage.setAttribute("aria-hidden", "true");
        document.body.appendChild(stage);
        // Музыка заиграла — вся толпа танцует и по очереди лопается
        m.addEventListener("play", () => {
            crowd.filter(martian => martian.state === "quiet").forEach(doom);
            updateHint();
            schedule(MUSIC_DELAY);
        });
        // Музыку выключили — кто ещё не начал лопаться, снова просто мешает
        m.addEventListener("pause", () => {
            crowd.filter(martian => martian.state === "doomed").forEach(quiet);
            updateHint();
            schedule(QUIET_DELAY);
        });
        schedule([4000, 8000]);
    }
    // END SECTION 6

    // для проверки из консоли: martians.show() — ещё один марсианин, martians.splat() — клякса на экране
    window.martians = {show: () => spawn(), splat: () => stage && screenSplat(), count: () => crowd.length};

    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);
})();
