/* ============================================================
   lang_native_names.js v1.1 (12-Nov-2026) : हर भाषा का अपना नाम (उसकी अपनी लिपि में) और रोमन नाम : एकमात्र घर।
   काम: ऊपर के 🌐 "भाषा" बटन की सूची। पढ़ता है: generator/build_mirror_homes.js, जो इसी से
   assets/acs-universal.js की ACS_LANG_NAMES पंक्ति बनाता है (हाथ से वह पंक्ति न बदलें)।
   नियम: भाषा-रजिस्टर (mirror_home_strings.js) की हर भाषा का नाम यहाँ होना ज़रूरी है; न हो तो generator रुक जाता है।
   v1.1 (Founder, 12-Nov): हर बटन में नीचे छोटे हरे अक्षरों में रोमन नाम भी, ताकि जो उस लिपि को न पढ़ सके वह भी भाषा पहचान ले।
   रोमन नाम नीचे ROMAN में हैं; generator इनसे acs-universal.js की ACS_LANG_ROMAN पंक्ति बनाता है।
   ============================================================ */
"use strict";
module.exports = {
  hi: "हिन्दी", en: "English", zh: "中文", es: "Español", ar: "العربية", fr: "Français", bn: "বাংলা", pt: "Português",
  ru: "Русский", id: "Bahasa Indonesia", ur: "اردو", de: "Deutsch", ja: "日本語", mr: "मराठी", te: "తెలుగు",
  ko: "한국어", he: "עברית", ta: "தமிழ்", kn: "ಕನ್ನಡ", gu: "ગુજરાતી", ml: "മലയാളം", pa: "ਪੰਜਾਬੀ", or: "ଓଡ଼ିଆ",
  as: "অসমীয়া", ne: "नेपाली", ms: "Bahasa Melayu", tl: "Filipino", vi: "Tiếng Việt", th: "ไทย", sw: "Kiswahili",
  tr: "Türkçe", fa: "فارسی", uz: "Oʻzbekcha", kk: "Қазақша", az: "Azərbaycanca", so: "Soomaali", am: "አማርኛ",
  ha: "Hausa", yo: "Yorùbá", zu: "isiZulu", si: "සිංහල", my: "မြန်မာ", km: "ខ្មែរ", ps: "پښتو", sd: "سنڌي"
};
const ROMAN = {
  hi: "Hindi", en: "English", zh: "Chinese", es: "Spanish", ar: "Arabic", fr: "French", bn: "Bengali", pt: "Portuguese",
  ru: "Russian", id: "Indonesian", ur: "Urdu", de: "German", ja: "Japanese", mr: "Marathi", te: "Telugu",
  ko: "Korean", he: "Hebrew", ta: "Tamil", kn: "Kannada", gu: "Gujarati", ml: "Malayalam", pa: "Punjabi", or: "Odia",
  as: "Assamese", ne: "Nepali", ms: "Malay", tl: "Filipino", vi: "Vietnamese", th: "Thai", sw: "Swahili",
  tr: "Turkish", fa: "Persian", uz: "Uzbek", kk: "Kazakh", az: "Azerbaijani", so: "Somali", am: "Amharic",
  ha: "Hausa", yo: "Yoruba", zu: "Zulu", si: "Sinhala", my: "Burmese", km: "Khmer", ps: "Pashto", sd: "Sindhi"
};
Object.defineProperty(module.exports, "ROMAN", { value: ROMAN, enumerable: false });
