/* ============================================================
   menu_lang/_geo_inject.js v1.0 (परत-3 का सहायक, 21-Nov-2026, खेप M-1)
   भाषा-पन्ने (जैसे नेटवर्क) में राज्य, ज़िले और देश के हिंदी नाम उस भाषा में दिखाने की तालिका: window.ACS_GEO_T।
   तालिका का एकमात्र घर = पैनल-पैक generator/data/panel_i18n/<भाषा>.json का "geo" (पैनल भी यही इस्तेमाल करता है)।
   पन्ने में हिंदी कुंजियाँ \uXXXX रूप में जाती हैं, ताकि भाषा-पन्ने में देवनागरी का एक भी अक्षर न रहे।
   ============================================================ */
"use strict";
const path = require("path");
module.exports = function geoInject(lang, at) {
  const pack = require(path.join(__dirname, "..", "panel_i18n", lang + ".json"));
  const g = pack.geo || {};
  if (Object.keys(g).length < 100) throw new Error("पैनल-पैक (" + lang + ") में geo-तालिका बहुत छोटी");
  const js = JSON.stringify(g).replace(/[\u0080-￿]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
  return { at, html: "<script>window.ACS_GEO_T=" + js + ";</script>" };
};
