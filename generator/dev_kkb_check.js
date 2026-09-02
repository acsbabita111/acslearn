/* ============================================================
   dev_kkb_check.js v8.1 (01-Sep-2026; KKB2FAM + he; KKB2 मास्टर-परिवार en+7 की पेज-जाँच kkb2-ढाँचे पर; v7.8 = + मालागासी mg) — "ACS काम की भाषा" कोर्स का check-robot (हर भाषा: KKB_SETS)
   चलाना: repo-रूट से → node generator/dev_kkb_check.js
   जाँचें: (1) data 5 सप्ताह × 5 दिन × 20 = 500, हर वाक्य के 4 खाने भरे, दिशा S/L
   (2) हर सप्ताह का test-खाना (target/goal/lines, हर line = English+देवनागरी)
   (3) दिखने वाले पाठ में square bracket नहीं (data + js + css)
   (4) kkb.css में कुछ भी 16px से छोटा नहीं
   (5) पेज generator-निशान से बना, तीनों असेट बुलाता है, universal ढाँचा (acs-universal.js) है
   (6) courses_data.js में PJ018 + url = बना हुआ पेज; courses/hi/index.html की READY_IDS में PJ018
   (7) sw.js में kkb-टिप्पणी वाली CACHE_VERSION (cache-first असर-नियम)
   fail = कोई भी upload नहीं।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };
const KKB_SETS = [
  { code: "en", data: "assets/kkb_data.js", page: "courses/hi/bhasha/english/index.html", old: "courses/hi/kaam-ki-bhasha/index.html", id: "PJ018", url: "/courses/hi/bhasha/english/" },
  { code: "kn", data: "assets/kkb_kn_data.js", page: "courses/hi/bhasha/kannada/index.html", old: "courses/hi/kaam-ki-bhasha-kannada/index.html", id: "PJ019", url: "/courses/hi/bhasha/kannada/", hiAdapted: true /* कन्नड (v0.2, live): हवाई-अड्डा-दिन घरेलू रूप में ढला — बस-अड्डा/आधार/टिकट; जान-बूझकर, दर्पण-नियम से छूट */ },
  { code: "zh", data: "assets/kkb_zh_data.js", page: "courses/hi/bhasha/mandarin/index.html", old: "courses/hi/kaam-ki-bhasha-mandarin/index.html", id: "PJ020", url: "/courses/hi/bhasha/mandarin/" },
  { code: "es", data: "assets/kkb_es_data.js", page: "courses/hi/bhasha/spanish/index.html", old: "courses/hi/kaam-ki-bhasha-spanish/index.html", id: "PJ021", url: "/courses/hi/bhasha/spanish/" },
  { code: "ar", data: "assets/kkb_ar_data.js", page: "courses/hi/bhasha/arabic/index.html", old: "courses/hi/kaam-ki-bhasha-arabic/index.html", id: "PJ022", url: "/courses/hi/bhasha/arabic/" },
  { code: "bn", data: "assets/kkb_bn_data.js", page: "courses/hi/bhasha/bengali/index.html", id: "PJ023", url: "/courses/hi/bhasha/bengali/" },
  { code: "pt", data: "assets/kkb_pt_data.js", page: "courses/hi/bhasha/portuguese/index.html", id: "PJ024", url: "/courses/hi/bhasha/portuguese/" },
  { code: "id", data: "assets/kkb_id_data.js", page: "courses/hi/bhasha/indonesian/index.html", id: "PJ025", url: "/courses/hi/bhasha/indonesian/" },
  { code: "ja", data: "assets/kkb_ja_data.js", page: "courses/hi/bhasha/japanese/index.html", id: "PJ026", url: "/courses/hi/bhasha/japanese/" },
  { code: "mr", data: "assets/kkb_mr_data.js", page: "courses/hi/bhasha/marathi/index.html", id: "PJ027", url: "/courses/hi/bhasha/marathi/" },
  { code: "te", data: "assets/kkb_te_data.js", page: "courses/hi/bhasha/telugu/index.html", id: "PJ028", url: "/courses/hi/bhasha/telugu/" },
  { code: "ta", data: "assets/kkb_ta_data.js", page: "courses/hi/bhasha/tamil/index.html", id: "PJ029", url: "/courses/hi/bhasha/tamil/" },
  { code: "tr", data: "assets/kkb_tr_data.js", page: "courses/hi/bhasha/turkish/index.html", id: "PJ030", url: "/courses/hi/bhasha/turkish/" },
  { code: "ko", data: "assets/kkb_ko_data.js", page: "courses/hi/bhasha/korean/index.html", id: "PJ031", url: "/courses/hi/bhasha/korean/" },
  { code: "sw", data: "assets/kkb_sw_data.js", page: "courses/hi/bhasha/swahili/index.html", id: "PJ032", url: "/courses/hi/bhasha/swahili/" },
  { code: "gu", data: "assets/kkb_gu_data.js", page: "courses/hi/bhasha/gujarati/index.html", id: "PJ033", url: "/courses/hi/bhasha/gujarati/" },
  { code: "jv", data: "assets/kkb_jv_data.js", page: "courses/hi/bhasha/javanese/index.html", id: "PJ034", url: "/courses/hi/bhasha/javanese/" },
  { code: "fa", data: "assets/kkb_fa_data.js", page: "courses/hi/bhasha/persian/index.html", id: "PJ035", url: "/courses/hi/bhasha/persian/" },
  { code: "ha", data: "assets/kkb_ha_data.js", page: "courses/hi/bhasha/hausa/index.html", id: "PJ036", url: "/courses/hi/bhasha/hausa/" },
  { code: "nan", data: "assets/kkb_nan_data.js", page: "courses/hi/bhasha/minnan/index.html", id: "PJ037", url: "/courses/hi/bhasha/minnan/" },
  { code: "bho", data: "assets/kkb_bho_data.js", page: "courses/hi/bhasha/bhojpuri/index.html", id: "PJ038", url: "/courses/hi/bhasha/bhojpuri/" },
  { code: "pa", data: "assets/kkb_pa_data.js", page: "courses/hi/bhasha/punjabi/index.html", id: "PJ039", url: "/courses/hi/bhasha/punjabi/" },
  { code: "hne", data: "assets/kkb_hne_data.js", page: "courses/hi/bhasha/chhattisgarhi/index.html", id: "PJ040", url: "/courses/hi/bhasha/chhattisgarhi/" },
  { code: "as", data: "assets/kkb_as_data.js", page: "courses/hi/bhasha/assamese/index.html", id: "PJ041", url: "/courses/hi/bhasha/assamese/" },
  { code: "mai", data: "assets/kkb_mai_data.js", page: "courses/hi/bhasha/maithili/index.html", id: "PJ042", url: "/courses/hi/bhasha/maithili/" },
  { code: "bgc", data: "assets/kkb_bgc_data.js", page: "courses/hi/bhasha/haryanvi/index.html", id: "PJ043", url: "/courses/hi/bhasha/haryanvi/" },
  { code: "mwr", data: "assets/kkb_mwr_data.js", page: "courses/hi/bhasha/marwari/index.html", id: "PJ044", url: "/courses/hi/bhasha/marwari/" },
  { code: "sat", data: "assets/kkb_sat_data.js", page: "courses/hi/bhasha/santali/index.html", id: "PJ045", url: "/courses/hi/bhasha/santali/" },
  { code: "ks", data: "assets/kkb_ks_data.js", page: "courses/hi/bhasha/kashmiri/index.html", id: "PJ046", url: "/courses/hi/bhasha/kashmiri/" },
  { code: "ne", data: "assets/kkb_ne_data.js", page: "courses/hi/bhasha/nepali/index.html", id: "PJ047", url: "/courses/hi/bhasha/nepali/" },
  { code: "gom", data: "assets/kkb_gom_data.js", page: "courses/hi/bhasha/konkani/index.html", id: "PJ048", url: "/courses/hi/bhasha/konkani/" },
  { code: "sd", data: "assets/kkb_sd_data.js", page: "courses/hi/bhasha/sindhi/index.html", id: "PJ049", url: "/courses/hi/bhasha/sindhi/" },
  { code: "doi", data: "assets/kkb_doi_data.js", page: "courses/hi/bhasha/dogri/index.html", id: "PJ050", url: "/courses/hi/bhasha/dogri/" },
  { code: "mni", data: "assets/kkb_mni_data.js", page: "courses/hi/bhasha/manipuri/index.html", id: "PJ051", url: "/courses/hi/bhasha/manipuri/" },
  { code: "ru", data: "assets/kkb_ru_data.js", page: "courses/hi/bhasha/russian/index.html", id: "PJ052", url: "/courses/hi/bhasha/russian/" },
  { code: "he", data: "assets/kkb_he_data.js", page: "courses/hi/bhasha/hebrew/index.html", id: "PJ137", url: "/courses/hi/bhasha/hebrew/" },
  { code: "hr", data: "assets/kkb_hr_data.js", page: "courses/hi/bhasha/croatian/index.html", id: "PJ138", url: "/courses/hi/bhasha/croatian/" },
  { code: "sr", data: "assets/kkb_sr_data.js", page: "courses/hi/bhasha/serbian/index.html", id: "PJ139", url: "/courses/hi/bhasha/serbian/" },
  { code: "mt", data: "assets/kkb_mt_data.js", page: "courses/hi/bhasha/maltese/index.html", id: "PJ140", url: "/courses/hi/bhasha/maltese/" },
  { code: "lt", data: "assets/kkb_lt_data.js", page: "courses/hi/bhasha/lithuanian/index.html", id: "PJ141", url: "/courses/hi/bhasha/lithuanian/" },
  { code: "fi", data: "assets/kkb_fi_data.js", page: "courses/hi/bhasha/finnish/index.html", id: "PJ142", url: "/courses/hi/bhasha/finnish/" },
  { code: "sk", data: "assets/kkb_sk_data.js", page: "courses/hi/bhasha/slovak/index.html", id: "PJ143", url: "/courses/hi/bhasha/slovak/" },
  { code: "ka", data: "assets/kkb_ka_data.js", page: "courses/hi/bhasha/georgian/index.html", id: "PJ144", url: "/courses/hi/bhasha/georgian/" },
  { code: "hy", data: "assets/kkb_hy_data.js", page: "courses/hi/bhasha/armenian/index.html", id: "PJ145", url: "/courses/hi/bhasha/armenian/" },
  { code: "ti", data: "assets/kkb_ti_data.js", page: "courses/hi/bhasha/tigrinya/index.html", id: "PJ146", url: "/courses/hi/bhasha/tigrinya/" },
  { code: "gbm", data: "assets/kkb_gbm_data.js", page: "courses/hi/bhasha/garhwali/index.html", id: "PJ053", url: "/courses/hi/bhasha/garhwali/" },
  { code: "kfy", data: "assets/kkb_kfy_data.js", page: "courses/hi/bhasha/kumaoni/index.html", id: "PJ054", url: "/courses/hi/bhasha/kumaoni/" },
  { code: "ur", data: "assets/kkb_ur_data.js", page: "courses/hi/bhasha/urdu/index.html", id: "PJ055", url: "/courses/hi/bhasha/urdu/" },
  { code: "ml", data: "assets/kkb_ml_data.js", page: "courses/hi/bhasha/malayalam/index.html", id: "PJ056", url: "/courses/hi/bhasha/malayalam/" },
  { code: "or", data: "assets/kkb_or_data.js", page: "courses/hi/bhasha/odia/index.html", id: "PJ057", url: "/courses/hi/bhasha/odia/" },
  { code: "brx", data: "assets/kkb_brx_data.js", page: "courses/hi/bhasha/bodo/index.html", id: "PJ058", url: "/courses/hi/bhasha/bodo/" },
  { code: "awa", data: "assets/kkb_awa_data.js", page: "courses/hi/bhasha/awadhi/index.html", id: "PJ059", url: "/courses/hi/bhasha/awadhi/" },
  { code: "mag", data: "assets/kkb_mag_data.js", page: "courses/hi/bhasha/magahi/index.html", id: "PJ060", url: "/courses/hi/bhasha/magahi/" },
  { code: "si", data: "assets/kkb_si_data.js", page: "courses/hi/bhasha/sinhala/index.html", id: "PJ061", url: "/courses/hi/bhasha/sinhala/" },
  { code: "ps", data: "assets/kkb_ps_data.js", page: "courses/hi/bhasha/pashto/index.html", id: "PJ062", url: "/courses/hi/bhasha/pashto/" },
  { code: "bal", data: "assets/kkb_bal_data.js", page: "courses/hi/bhasha/balochi/index.html", id: "PJ063", url: "/courses/hi/bhasha/balochi/" },
  { code: "prs", data: "assets/kkb_prs_data.js", page: "courses/hi/bhasha/dari/index.html", id: "PJ064", url: "/courses/hi/bhasha/dari/" },
  { code: "vi", data: "assets/kkb_vi_data.js", page: "courses/hi/bhasha/vietnamese/index.html", id: "PJ065", url: "/courses/hi/bhasha/vietnamese/" },
  { code: "th", data: "assets/kkb_th_data.js", page: "courses/hi/bhasha/thai/index.html", id: "PJ066", url: "/courses/hi/bhasha/thai/" },
  { code: "my", data: "assets/kkb_my_data.js", page: "courses/hi/bhasha/burmese/index.html", id: "PJ067", url: "/courses/hi/bhasha/burmese/" },
  { code: "km", data: "assets/kkb_km_data.js", page: "courses/hi/bhasha/khmer/index.html", id: "PJ068", url: "/courses/hi/bhasha/khmer/" },
  { code: "lo", data: "assets/kkb_lo_data.js", page: "courses/hi/bhasha/lao/index.html", id: "PJ069", url: "/courses/hi/bhasha/lao/" },
  { code: "ms", data: "assets/kkb_ms_data.js", page: "courses/hi/bhasha/malay/index.html", id: "PJ070", url: "/courses/hi/bhasha/malay/" },
  { code: "tl", data: "assets/kkb_tl_data.js", page: "courses/hi/bhasha/tagalog/index.html", id: "PJ071", url: "/courses/hi/bhasha/tagalog/" },
  { code: "su", data: "assets/kkb_su_data.js", page: "courses/hi/bhasha/sundanese/index.html", id: "PJ072", url: "/courses/hi/bhasha/sundanese/" },
  { code: "ceb", data: "assets/kkb_ceb_data.js", page: "courses/hi/bhasha/cebuano/index.html", id: "PJ073", url: "/courses/hi/bhasha/cebuano/" },
  { code: "mn", data: "assets/kkb_mn_data.js", page: "courses/hi/bhasha/mongolian/index.html", id: "PJ074", url: "/courses/hi/bhasha/mongolian/" },
  { code: "bo", data: "assets/kkb_bo_data.js", page: "courses/hi/bhasha/tibetan/index.html", id: "PJ075", url: "/courses/hi/bhasha/tibetan/" },
  { code: "yo", data: "assets/kkb_yo_data.js", page: "courses/hi/bhasha/yoruba/index.html", id: "PJ076", url: "/courses/hi/bhasha/yoruba/" },
  { code: "ig", data: "assets/kkb_ig_data.js", page: "courses/hi/bhasha/igbo/index.html", id: "PJ077", url: "/courses/hi/bhasha/igbo/" },
  { code: "zu", data: "assets/kkb_zu_data.js", page: "courses/hi/bhasha/zulu/index.html", id: "PJ078", url: "/courses/hi/bhasha/zulu/" },
  { code: "xh", data: "assets/kkb_xh_data.js", page: "courses/hi/bhasha/xhosa/index.html", id: "PJ079", url: "/courses/hi/bhasha/xhosa/" },
  { code: "am", data: "assets/kkb_am_data.js", page: "courses/hi/bhasha/amharic/index.html", id: "PJ080", url: "/courses/hi/bhasha/amharic/" },
  { code: "om", data: "assets/kkb_om_data.js", page: "courses/hi/bhasha/oromo/index.html", id: "PJ081", url: "/courses/hi/bhasha/oromo/" },
  { code: "so", data: "assets/kkb_so_data.js", page: "courses/hi/bhasha/somali/index.html", id: "PJ082", url: "/courses/hi/bhasha/somali/" },
  { code: "mg", data: "assets/kkb_mg_data.js", page: "courses/hi/bhasha/malagasy/index.html", id: "PJ083", url: "/courses/hi/bhasha/malagasy/" },
  { code: "rw", data: "assets/kkb_rw_data.js", page: "courses/hi/bhasha/kinyarwanda/index.html", id: "PJ084", url: "/courses/hi/bhasha/kinyarwanda/" },
  { code: "tw", data: "assets/kkb_tw_data.js", page: "courses/hi/bhasha/twi/index.html", id: "PJ085", url: "/courses/hi/bhasha/twi/" },
  { code: "fr", data: "assets/kkb_fr_data.js", page: "courses/hi/bhasha/french/index.html", id: "PJ086", url: "/courses/hi/bhasha/french/" },
  { code: "af", data: "assets/kkb_af_data.js", page: "courses/hi/bhasha/afrikaans/index.html", id: "PJ087", url: "/courses/hi/bhasha/afrikaans/" },
  { code: "lg", data: "assets/kkb_lg_data.js", page: "courses/hi/bhasha/luganda/index.html", id: "PJ088", url: "/courses/hi/bhasha/luganda/" },
  { code: "ny", data: "assets/kkb_ny_data.js", page: "courses/hi/bhasha/chichewa/index.html", id: "PJ089", url: "/courses/hi/bhasha/chichewa/" },
  { code: "ku", data: "assets/kkb_ku_data.js", page: "courses/hi/bhasha/kurdish/index.html", id: "PJ090", url: "/courses/hi/bhasha/kurdish/" },
  { code: "uz", data: "assets/kkb_uz_data.js", page: "courses/hi/bhasha/uzbek/index.html", id: "PJ091", url: "/courses/hi/bhasha/uzbek/" },
  { code: "kk", data: "assets/kkb_kk_data.js", page: "courses/hi/bhasha/kazakh/index.html", id: "PJ092", url: "/courses/hi/bhasha/kazakh/" },
  { code: "az", data: "assets/kkb_az_data.js", page: "courses/hi/bhasha/azerbaijani/index.html", id: "PJ093", url: "/courses/hi/bhasha/azerbaijani/" },
  { code: "tg", data: "assets/kkb_tg_data.js", page: "courses/hi/bhasha/tajik/index.html", id: "PJ094", url: "/courses/hi/bhasha/tajik/" },
  { code: "ky", data: "assets/kkb_ky_data.js", page: "courses/hi/bhasha/kyrgyz/index.html", id: "PJ095", url: "/courses/hi/bhasha/kyrgyz/" },
  { code: "ug", data: "assets/kkb_ug_data.js", page: "courses/hi/bhasha/uyghur/index.html", id: "PJ096", url: "/courses/hi/bhasha/uyghur/" },
  { code: "ht", data: "assets/kkb_ht_data.js", page: "courses/hi/bhasha/haitian-creole/index.html", id: "PJ097", url: "/courses/hi/bhasha/haitian-creole/" },
  { code: "gn", data: "assets/kkb_gn_data.js", page: "courses/hi/bhasha/guarani/index.html", id: "PJ098", url: "/courses/hi/bhasha/guarani/" },
  { code: "qu", data: "assets/kkb_qu_data.js", page: "courses/hi/bhasha/quechua/index.html", id: "PJ099", url: "/courses/hi/bhasha/quechua/" },
  { code: "ay", data: "assets/kkb_ay_data.js", page: "courses/hi/bhasha/aymara/index.html", id: "PJ100", url: "/courses/hi/bhasha/aymara/" },
  { code: "myn", data: "assets/kkb_myn_data.js", page: "courses/hi/bhasha/mayan/index.html", id: "PJ101", url: "/courses/hi/bhasha/mayan/" },
  { code: "anp", data: "assets/kkb_anp_data.js", page: "courses/hi/bhasha/angika/index.html", id: "PJ102", url: "/courses/hi/bhasha/angika/" },
  { code: "bjj", data: "assets/kkb_bjj_data.js", page: "courses/hi/bhasha/bajjika/index.html", id: "PJ103", url: "/courses/hi/bhasha/bajjika/" },
  { code: "bhb", data: "assets/kkb_bhb_data.js", page: "courses/hi/bhasha/bhili/index.html", id: "PJ104", url: "/courses/hi/bhasha/bhili/" },
  { code: "tcy", data: "assets/kkb_tcy_data.js", page: "courses/hi/bhasha/tulu/index.html", id: "PJ105", url: "/courses/hi/bhasha/tulu/" },
  { code: "gon", data: "assets/kkb_gon_data.js", page: "courses/hi/bhasha/gondi/index.html", id: "PJ106", url: "/courses/hi/bhasha/gondi/" },
  { code: "pnb", data: "assets/kkb_pnb_data.js", page: "courses/hi/bhasha/western-punjabi/index.html", id: "PJ107", url: "/courses/hi/bhasha/western-punjabi/" },
  { code: "skr", data: "assets/kkb_skr_data.js", page: "courses/hi/bhasha/saraiki/index.html", id: "PJ108", url: "/courses/hi/bhasha/saraiki/" },
  { code: "syl", data: "assets/kkb_syl_data.js", page: "courses/hi/bhasha/sylheti/index.html", id: "PJ109", url: "/courses/hi/bhasha/sylheti/" },
  { code: "tt", data: "assets/kkb_tt_data.js", page: "courses/hi/bhasha/tatar/index.html", id: "PJ110", url: "/courses/hi/bhasha/tatar/" },
  { code: "apc", data: "assets/kkb_apc_data.js", page: "courses/hi/bhasha/levantine-arabic/index.html", id: "PJ111", url: "/courses/hi/bhasha/levantine-arabic/" },
  { code: "acm", data: "assets/kkb_acm_data.js", page: "courses/hi/bhasha/mesopotamian-arabic/index.html", id: "PJ112", url: "/courses/hi/bhasha/mesopotamian-arabic/" },
  { code: "acw", data: "assets/kkb_acw_data.js", page: "courses/hi/bhasha/hejazi-arabic/index.html", id: "PJ113", url: "/courses/hi/bhasha/hejazi-arabic/" },
  { code: "yue", data: "assets/kkb_yue_data.js", page: "courses/hi/bhasha/cantonese/index.html", id: "PJ114", url: "/courses/hi/bhasha/cantonese/" },
  { code: "arz", data: "assets/kkb_arz_data.js", page: "courses/hi/bhasha/egyptian-arabic/index.html", id: "PJ115", url: "/courses/hi/bhasha/egyptian-arabic/" },
  { code: "apd", data: "assets/kkb_apd_data.js", page: "courses/hi/bhasha/sudanese-arabic/index.html", id: "PJ116", url: "/courses/hi/bhasha/sudanese-arabic/" },
  { code: "arq", data: "assets/kkb_arq_data.js", page: "courses/hi/bhasha/algerian-arabic/index.html", id: "PJ117", url: "/courses/hi/bhasha/algerian-arabic/" },
  { code: "ary", data: "assets/kkb_ary_data.js", page: "courses/hi/bhasha/moroccan-arabic/index.html", id: "PJ118", url: "/courses/hi/bhasha/moroccan-arabic/" },
  { code: "aec", data: "assets/kkb_aec_data.js", page: "courses/hi/bhasha/saidi-arabic/index.html", id: "PJ119", url: "/courses/hi/bhasha/saidi-arabic/" },
  { code: "pcm", data: "assets/kkb_pcm_data.js", page: "courses/hi/bhasha/nigerian-pidgin/index.html", id: "PJ120", url: "/courses/hi/bhasha/nigerian-pidgin/" },
  { code: "sn", data: "assets/kkb_sn_data.js", page: "courses/hi/bhasha/shona/index.html", id: "PJ121", url: "/courses/hi/bhasha/shona/" },
  { code: "mfe", data: "assets/kkb_mfe_data.js", page: "courses/hi/bhasha/mauritian-creole/index.html", id: "PJ122", url: "/courses/hi/bhasha/mauritian-creole/" },
  { code: "bm", data: "assets/kkb_bm_data.js", page: "courses/hi/bhasha/bambara/index.html", id: "PJ123", url: "/courses/hi/bhasha/bambara/" },
  { code: "wo", data: "assets/kkb_wo_data.js", page: "courses/hi/bhasha/wolof/index.html", id: "PJ124", url: "/courses/hi/bhasha/wolof/" },
  { code: "de", data: "assets/kkb_de_data.js", page: "courses/hi/bhasha/german/index.html", id: "PJ125", url: "/courses/hi/bhasha/german/" },
  { code: "it", data: "assets/kkb_it_data.js", page: "courses/hi/bhasha/italian/index.html", id: "PJ126", url: "/courses/hi/bhasha/italian/" },
  { code: "pl", data: "assets/kkb_pl_data.js", page: "courses/hi/bhasha/polish/index.html", id: "PJ127", url: "/courses/hi/bhasha/polish/" },
  { code: "uk", data: "assets/kkb_uk_data.js", page: "courses/hi/bhasha/ukrainian/index.html", id: "PJ128", url: "/courses/hi/bhasha/ukrainian/" },
  { code: "ro", data: "assets/kkb_ro_data.js", page: "courses/hi/bhasha/romanian/index.html", id: "PJ129", url: "/courses/hi/bhasha/romanian/" },
  { code: "nl", data: "assets/kkb_nl_data.js", page: "courses/hi/bhasha/dutch/index.html", id: "PJ130", url: "/courses/hi/bhasha/dutch/" },
  { code: "el", data: "assets/kkb_el_data.js", page: "courses/hi/bhasha/greek/index.html", id: "PJ131", url: "/courses/hi/bhasha/greek/" },
  { code: "hu", data: "assets/kkb_hu_data.js", page: "courses/hi/bhasha/hungarian/index.html", id: "PJ132", url: "/courses/hi/bhasha/hungarian/" },
  { code: "cs", data: "assets/kkb_cs_data.js", page: "courses/hi/bhasha/czech/index.html", id: "PJ133", url: "/courses/hi/bhasha/czech/" },
  { code: "be", data: "assets/kkb_be_data.js", page: "courses/hi/bhasha/belarusian/index.html", id: "PJ134", url: "/courses/hi/bhasha/belarusian/" },
  { code: "sv", data: "assets/kkb_sv_data.js", page: "courses/hi/bhasha/swedish/index.html", id: "PJ135", url: "/courses/hi/bhasha/swedish/" },
  { code: "bg", data: "assets/kkb_bg_data.js", page: "courses/hi/bhasha/bulgarian/index.html", id: "PJ136", url: "/courses/hi/bhasha/bulgarian/" }
];
const js = R("assets/kkb.js"), css = R("assets/kkb.css");
(css.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => {
  const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) fails.push("kkb.css: font " + n + "px");
});
const cd = R("assets/courses_data.js"), readyIds = R("courses/hi/index.html");
const swSrc = R("sw.js"), cv = (swSrc.match(/const CACHE_VERSION = '(v\d+)';([^\n]*)/) || []);
ok(cv[1] && /kkb|काम की भाषा/.test(cv[2] || ""), "sw.js CACHE_VERSION इस दौर के लिए bump नहीं (cache-first असर-नियम)");
const intentHi = {}; /* साझा-भाषा नियम: id-क्रम पर हिंदी-अर्थ/दिशा भाषाओं में मेल (कुछ छूट: भाषा-नाम वाले वाक्य) */
let EN_BASE = null;
try { const s0 = R("assets/kkb_data.js"); EN_BASE = JSON.parse(s0.slice(s0.indexOf("window.KKB_DATA = ") + 18).trim().replace(/;$/, "")); } catch (e) { EN_BASE = null; }
KKB_SETS.forEach(SET => {
const tag = "(" + SET.code + ") ";

/* (1)(2) data */
const box = { window: {} };
new Function("window", R(SET.data))(box.window);
const D = box.window.KKB_DATA;
ok(D && Array.isArray(D.weeks) && D.weeks.length === 5, tag + "data: 5 सप्ताह नहीं");
ok(D && D.lang && D.lang.code === SET.code && D.lang.label && D.lang.tts && D.lang.sr && D.lang.script, tag + "lang-खाना अधूरा");
ok(D && Array.isArray(D.help) && D.help.length >= 2, tag + "help-जोड़ी नहीं");
let total = 0;
(D.weeks || []).forEach((w, wi) => {
  ok(w.n === wi + 1 && w.title && w.hi, "सप्ताह " + (wi + 1) + ": n/title/hi अधूरा");
  ok(Array.isArray(w.days) && w.days.length === 5, "सप्ताह " + (wi + 1) + ": 5 दिन नहीं");
  (w.days || []).forEach((d, di) => {
    ok(d.title, "सप्ताह " + (wi + 1) + " दिन " + (di + 1) + ": शीर्षक ख़ाली");
    ok(Array.isArray(d.items) && d.items.length === 20, "सप्ताह " + (wi + 1) + " दिन " + (di + 1) + ": 20 वाक्य नहीं (" + (d.items || []).length + ")");
    (d.items || []).forEach((it, i) => {
      total++;
      ok(Array.isArray(it) && it.length === 4 && it.every(x => typeof x === "string" && x.trim()), "वाक्य " + total + ": 4 खाने भरे नहीं");
      ok(it[3] === "S" || it[3] === "L", "वाक्य " + total + ": दिशा S/L नहीं");
      ok(!/[\[\]]/.test(it.join(" ")), "वाक्य " + total + ": square bracket");
      /* भाषा-नाम नियम (26-Aug, चौथी बार पकड़े होल से): English-आधार से हिंदी-अर्थ हूबहू उठता है, पर
         "मैं थोड़ी अंग्रेज़ी बोलता हूँ" जैसे वाक्यों में भाषा-नाम लक्ष्य-भाषा का होना चाहिए —
         गैर-English सेट में हिंदी-अर्थ में "अंग्रेज़ी" = अर्थ-होल (चीनी/Spanish/अरबी तीनों में मिला था)। */
      if (SET.code !== "en") ok(!/अंग्रेज़ी|अंग्रेजी|English/.test(it[2]), tag + "वाक्य " + total + ": हिंदी-अर्थ में 'अंग्रेज़ी' — लक्ष्य-भाषा का नाम चाहिए");
      /* लिपि-नियम: देवनागरी-खाने में Roman अक्षर नहीं (___ रिक्त-स्थान छोड़कर) */
      ok(!/[A-Za-z]/.test(String(it[1]).replace(/___/g, "")), tag + "वाक्य " + total + ": देवनागरी-खाने में Roman अक्षर");
    });
  });
  const T = w.test;
  ok(T && T.target && T.goal && Array.isArray(T.lines) && T.lines.length >= 4, "सप्ताह " + (wi + 1) + ": test-खाना अधूरा");
  (T && T.lines || []).forEach((l, i) => ok(Array.isArray(l) && l.length === 2 && l[0] && l[1], "सप्ताह " + (wi + 1) + " test-line " + (i + 1) + ": English+देवनागरी जोड़ी नहीं"));
});
ok(total === 500, "कुल वाक्य 500 नहीं: " + total);

/* runtime-जाँच (नक़ली DOM): इंजन को हर रास्ते (home · 5 सप्ताह · 25 दिन · 5 अभ्यास · 5 टेस्ट) पर चलाकर
   दिखने वाला HTML इकट्ठा — उसमें square bracket नहीं, ख़ाली पाठ नहीं (v2.3 runtime-यंत्र नियम) */
const els = {}, seen = [];
const mk = id => ({ id, _h: "", style: {}, className: "", textContent: "", checked: false, onclick: null,
  set innerHTML(v) { this._h = v; seen.push(v); }, get innerHTML() { return this._h; },
  getBoundingClientRect() { return { top: 0 }; }, setAttribute() {} });
const fakeDoc = { getElementById: id => (els[id] = els[id] || mk(id)) };
const fakeWin = { KKB_DATA: D, addEventListener() {}, pageYOffset: 0, scrollTo() {}, location: { hash: "#home" } };
const sandbox = { window: fakeWin, document: fakeDoc, localStorage: { getItem: () => null, setItem() {} }, confirm: () => false, alert() {}, encodeURIComponent, JSON, Math, console, location: fakeWin.location };
try {
  new Function("window", "document", "localStorage", "confirm", "alert", "location", js)(fakeWin, fakeDoc, sandbox.localStorage, sandbox.confirm, sandbox.alert, fakeWin.location);
  const routes = ["#home"];
  for (let w = 1; w <= 5; w++) { routes.push("#w" + w, "#w" + w + "p", "#w" + w + "t"); for (let d = 1; d <= 5; d++) routes.push("#w" + w + "d" + d); }
  const handlers = [];
  fakeWin.addEventListener = (t, f) => { if (t === "hashchange") handlers.push(f); };
  routes.forEach(r => { fakeWin.location.hash = r; fakeWin.kkbRender(); });
  ok(seen.length >= routes.length, "runtime: सब रास्तों पर HTML नहीं बना");
  /* render() closure तक पहुँच: kkbCard/kkbPractice से भी HTML बनता है */
  fakeWin.location.hash = "#w1d1"; fakeWin.kkbCard(1, 1, 0); fakeWin.kkbCard(1, 1, 0, true);
  fakeWin.kkbPractice(1, "A"); fakeWin.kkbPr("show"); fakeWin.kkbPr("ok");
  fakeWin.kkbPractice(2, "B"); fakeWin.kkbPr("show"); fakeWin.kkbPr("no");
} catch (e) { fails.push("kkb.js runtime त्रुटि: " + e.message); }
const shown = seen.join("\n").replace(/<[^>]+>/g, " ");
ok(!/[\[\]]/.test(shown), "kkb.js के बनाए दिखने वाले पाठ में square bracket");
(css.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => {
  const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) fails.push("kkb.css: font " + n + "px");
});

/* (5) page */
const PAGE = SET.page;
ok(fs.existsSync(path.join(ROOT, PAGE)), "पेज नहीं बना: " + PAGE);
if (fs.existsSync(path.join(ROOT, PAGE))) {
  const pg = R(PAGE);
  ok(pg.includes("generator से बना (build_specials.js"), "पेज पर generator-निशान नहीं");
  ok(pg.includes("/assets/acs-universal.js"), "पेज universal ढाँचे पर नहीं");
  /* v8.0 (31-Aug): KKB2 मास्टर-परिवार (en+7) के पेज kkb2-ढाँचे पर — वहाँ kkb2-असेट व #kkb2-app जाँचें (गहरी जाँच dev_kkb2_check में) */
  const KKB2FAM = { en: 1, ar: 1, fr: 1, es: 1, ja: 1, ko: 1, de: 1, ru: 1, he: 1, pt: 1, kn: 1, ta: 1, te: 1, bn: 1, or: 1, as: 1, pa: 1, gu: 1, ml: 1 }; /* 02-Sep: + 10 नई (मास्टर-दर्पण परिवार 19) */
  if (KKB2FAM[SET.code]) {
    ["/assets/kkb2.css", "/assets/kkb2.js"].forEach(a => ok(pg.includes(a), tag + "पेज " + a + " नहीं बुलाता"));
    ok(pg.includes('id="kkb2-app"'), tag + "पेज में kkb2-app डिब्बा नहीं");
  } else {
    ["/assets/kkb.css", "/" + SET.data, "/assets/kkb.js"].forEach(a => ok(pg.includes(a), tag + "पेज " + a + " नहीं बुलाता"));
    ok(pg.includes('id="kkb-app"'), tag + "पेज में kkb-app डिब्बा नहीं");
  }
  ok(pg.includes("मूल भाषा: हिंदी"), "मूल-भाषा निशान नहीं");
  const vis = pg.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), "पेज के दिखने वाले पाठ में square bracket");
}

/* (5a) हिंदी-दर्पण नियम (26-Aug, तमिल-ऑडिट की सीख): हर गैर-English सेट का हिंदी-अर्थ, दिन-शीर्षक व सप्ताह-नाम
   English-आधार (kkb_data.js) से हूबहू हों — सिर्फ़ "अंग्रेज़ी" → भाषा-नाम की छूट। (एक regex ने 47 हिंदी-खाने
   चुपचाप बिगाड़ दिए थे — "चाहिए" → "साहिए" — और robot पास दे गया; अब यह पकड़ेगा।) */
if (SET.code !== "en" && EN_BASE && !SET.hiAdapted) {
  let mism = 0, tmism = 0;
  D.weeks.forEach((W, wi) => {
    const WE = EN_BASE.weeks[wi]; if (!WE) return;
    if (W.hi !== WE.hi) tmism++;
    (W.days || []).forEach((day, di) => {
      const dE = WE.days[di]; if (!dE) return;
      if (day.title !== dE.title) tmism++;
      (day.items || []).forEach((it, ii) => {
        const a = dE.items[ii]; if (!a) return;
        if (a[2].replace(/अंग्रेज़ी/g, D.lang.label) !== it[2] || a[3] !== it[3]) mism++;
      });
    });
  });
  ok(mism === 0, tag + "हिंदी-अर्थ/दिशा English-आधार से बेमेल: " + mism + " वाक्य");
  ok(tmism === 0, tag + "दिन-शीर्षक/सप्ताह-नाम English-आधार से बेमेल: " + tmism);
}

/* (5b) redirect-पर्ची: पुराना पता → नया (noindex + canonical + refresh), universal ढाँचा नहीं */
if (SET.old) {
  ok(fs.existsSync(path.join(ROOT, SET.old)), tag + "redirect-पर्ची नहीं: " + SET.old);
  if (fs.existsSync(path.join(ROOT, SET.old))) {
    const rd = R(SET.old);
    ok(rd.includes('content="0; url=' + SET.url + '"') && rd.includes('canonical" href="https://acslearn.com' + SET.url + '"') && rd.includes("noindex"), tag + "redirect-पर्ची ग़लत पते/robots पर");
    ok(!rd.includes("/assets/acs-universal.js"), tag + "redirect-पर्ची universal ढाँचे पर है — sitemap में घुस जाएगी");
  }
}

/* (6) courses_data + READY_IDS */
const m = cd.match(new RegExp('\\{"id": "' + SET.id + '"[^}]*\\}'));
ok(!!m, tag + "courses_data.js में " + SET.id + " नहीं");
if (m) {
  const u = (m[0].match(/"url": "([^"]+)"/) || [])[1];
  ok(u === SET.url, tag + SET.id + " url ग़लत: " + u);
  ok(!/[\[\]]/.test(m[0].replace(/"edu": \[[^\]]*\]/, "")), tag + SET.id + " नाम में square bracket");
}
ok(cd.includes("'" + SET.id + "'"), tag + "courses_data.js KKB_GROUPS में " + SET.id + " नहीं"); /* 02-Sep: भाषा-कोर्स अब READY_IDS में नहीं — v467 refactor से एकमात्र घर = courses_data KKB_GROUPS (renderBhasha); पुरानी readyIds-जाँच निरस्त */
/* intent-मेल: दिशा (S/L) हर भाषा में एक-सी */
const dirs = []; D.weeks.forEach(w => w.days.forEach(d => d.items.forEach(it => dirs.push(it[3]))));
if (!intentHi.dirs) intentHi.dirs = dirs; else ok(intentHi.dirs.join("") === dirs.join(""), tag + "दिशा-क्रम (S/L) पहली भाषा से नहीं मिलता — id-intent टूटा");
}); /* KKB_SETS */

/* (7) courses_data.js — कोई भी "id" दोहरा नहीं (PJ071-डुप्लिकेट जैसा bug पकड़ने हेतु, 29-Aug ऑडिट) */
{
  const allIds = (cd.match(/"id":\s*"[^"]+"/g) || []).map(s => s.match(/"([^"]+)"$/)[1]);
  const seen = {}, dupIds = [];
  allIds.forEach(id => { seen[id] = (seen[id]||0)+1; });
  Object.keys(seen).forEach(id => { if (seen[id] > 1) dupIds.push(id + " x" + seen[id]); });
  ok(dupIds.length === 0, "courses_data.js में दोहरे id: " + dupIds.join(", "));
}

if (fails.length) { console.error("❌ dev_kkb_check FAIL:\n - " + fails.join("\n - ")); process.exit(1); }
console.log("🏁 dev_kkb_check: सब पास — 500 वाक्य · 5×5×20 · पेज generator से · असेट/कड़ी/sw ठीक (" + (cv[1] || "?") + ")");
