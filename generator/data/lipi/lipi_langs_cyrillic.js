/* lipi_langs_cyrillic.js v1.0 · 29-Oct-2026 — सिरिलिक लिपि वाली भाषाएँ (नई भाषा = एक पंक्ति, उसके use-अक्षर cyrillic_base में हों) */
const RU = "А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я".split(" ");
module.exports = [
  { code: "ru", slug: "russian", hi: "रूसी", en: "Russian", script: "cyrillic", pj: "PJ052", tts: "ru-RU", use: RU, extra: [], src: "रूसी की मानक सिरिलिक वर्णमाला (33 अक्षर) और इसी कोर्स के 2,150 वाक्य" }
];
