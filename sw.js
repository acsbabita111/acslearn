/* ==========================================================================
   ACS Service Worker — v4
   लक्ष्य: नया code आते ही अगली बार खोलने पर लगभग तुरंत नया दिखे; offline भी चले।

   तरीक़ा:
   - HTML pages → network-first (हमेशा ताज़ा; नेट न हो तो cache/offline)
   - CSS/JS/font/logo → cache-first + background-refresh (तेज़)
   - login/dashboard/register जैसे निजी page कभी cache नहीं (सुरक्षा)
   - नया version → script.js का "Update करें" toast; user दबाए तो SKIP_WAITING

   ⚠️ CSS/JS बदलें तो नीचे CACHE_VERSION ज़रूर बढ़ाएँ (v4 → v5 …)।
   ========================================================================== */

const CACHE_VERSION = 'v453' /* दूतावास-कड़ी खंड: भाषा-पेजों पर (30-Aug) */ /* कोर्स-पेज: सर्टिफिकेट/डिप्लोमा + भाषा-समूह (30-Aug) */ /* join: गाइड-पट्टी center+बोल्ड + नियम-पंक्ति (30-Aug) */ /* होम-पेज CTA-सुधार: जुड़ें-कड़ी + सच-बटन (30-Aug-2026) */; // 30-Aug: kkb काम की भाषा गहन ऑडिट-फिक्स — courses_data.js PJ071-डुप्लिकेट हटाया, 18 भाषाओं के script-मेटाडेटा सुधारे, 19 kkb फ़ाइलों का टूटा window.KKB_DATA प्रीफ़िक्स फिर से जोड़ा
// पुराना: const CACHE_VERSION = 'v444'; // 29-Aug: kkb काम की भाषा — यूरोप-शृंखला पूर्ण: चेक(PJ133), बेलारूसी(PJ134), स्वीडिश(PJ135), बुल्गारियाई(PJ136) जुड़े — 12/12 यूरोपीय भाषाएं पूरी
// पुराना: const CACHE_VERSION = 'v443'; // 29-Aug: kkb काम की भाषा — डच(PJ130), ग्रीक(PJ131), हंगेरियन(PJ132) जुड़े
// पुराना: const CACHE_VERSION = 'v442'; // 29-Aug: kkb काम की भाषा — रोमानियाई (PJ129) जुड़ा
// पुराना: const CACHE_VERSION = 'v441'; // 29-Aug: kkb काम की भाषा — पोलिश (PJ127), यूक्रेनी (PJ128) जुड़े
// पुराना: const CACHE_VERSION = 'v440'; // 29-Aug: kkb काम की भाषा — जर्मन (PJ125), इतालवी (PJ126) जुड़े
// पुराना: const CACHE_VERSION = 'v439'; // 29-Aug: kkb काम की भाषा — बमबारा (PJ123), वोलोफ़ (PJ124) जुड़े
// पुराना: const CACHE_VERSION = 'v438'; // 29-Aug: kkb काम की भाषा — 8 भाषाएं जुड़ीं (मिस्री PJ115, सूडानी PJ116, अल्जीरियाई PJ117, मोरक्कन PJ118, सैदी PJ119 अरबी + नाइजीरियन पिजिन PJ120 + शोना PJ121 + मॉरीशियन क्रीओल PJ122)
// पुराना: const CACHE_VERSION = 'v437'; // 29-Aug: kkb काम की भाषा — कैंटोनीज़ (PJ114) जुड़ा
// पुराना: const CACHE_VERSION = 'v436'; // 29-Aug: kkb काम की भाषा — 7 भाषाएं जुड़ीं (पश्चिमी पंजाबी PJ107, सराइकी PJ108, सिल्हटी PJ109, तातार PJ110, लेवांटाइन अरबी PJ111, मेसोपोटामिया अरबी PJ112, हिजाज़ी अरबी PJ113)
// पुराना: const CACHE_VERSION = 'v435'; // 28-Aug: kkb काम की भाषा — भारत जनजातीय-5 (अंगिका PJ102, बज्जिका PJ103, भीली PJ104, तुलु PJ105, गोंडी PJ106) जुड़े
// पुराना: const CACHE_VERSION = 'v434'; // 28-Aug: kkb काम की भाषा — मायन (PJ101) जुड़ा — 12-भाषा बैच पूरा
// पुराना: const CACHE_VERSION = 'v433'; // 28-Aug: kkb काम की भाषा — आयमारा (PJ100) जुड़ा
// पुराना: const CACHE_VERSION = 'v432'; // 28-Aug: kkb काम की भाषा — क्वेशुआ (PJ099) जुड़ा
// पुराना: const CACHE_VERSION = 'v431'; // 28-Aug: kkb काम की भाषा — गुआरानी (PJ098) जुड़ा
// पुराना: const CACHE_VERSION = 'v430'; // 28-Aug: kkb काम की भाषा — हाईटियन क्रियोल (PJ097) जुड़ा
// पुराना: const CACHE_VERSION = 'v429'; // 28-Aug: kkb काम की भाषा — उइघुर (PJ096) जुड़ा
// पुराना: const CACHE_VERSION = 'v428'; // 28-Aug: kkb काम की भाषा — किर्गिज़ (PJ095) जुड़ा
// पुराना: const CACHE_VERSION = 'v427'; // 28-Aug: kkb काम की भाषा — ताजिक (PJ094) जुड़ा
// पुराना: const CACHE_VERSION = 'v426'; // 28-Aug: kkb काम की भाषा — अज़रबैजानी (PJ093) जुड़ा
// पुराना: const CACHE_VERSION = 'v425'; // 28-Aug: कज़ाख (PJ092, kkb_kk_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v424'; // 28-Aug: उज़्बेक (PJ091, kkb_uz_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v423'; // 28-Aug: कुर्दिश (PJ090, kkb_ku_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v422'; // 28-Aug: चिचेवा (PJ089, kkb_ny_data.js) जुड़ा — 14-भाषा अफ़्रीका-शृंखला पूरी
// पुराना: const CACHE_VERSION = 'v421'; // 28-Aug: लुगांडा (PJ088, kkb_lg_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v420'; // 28-Aug: अफ़्रीकांस (PJ087, kkb_af_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v419'; // 28-Aug: फ़्रेंच (PJ086, kkb_fr_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v418'; // 28-Aug: अकान/त्वी (PJ085, kkb_tw_data.js) जुड़ा
// पुराना: const CACHE_VERSION = 'v417'; // 28-Aug: "काम की भाषा" + किन्यारवांडा (PJ084, kkb_rw_data.js) — सही-संरचना से शुरू से बनी
// पुराना: const CACHE_VERSION = 'v416'; // 28-Aug: संरचना-सुधार — सभी 19 kkb_*_data.js में it[0]=मूल-लिपि (Founder-audit)
// पुराना: const CACHE_VERSION = 'v415'; // 28-Aug: "काम की भाषा" + मालागासी (PJ083, kkb_mg_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v414'; // 28-Aug: "काम की भाषा" + सोमाली (PJ082, kkb_so_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v413'; // 28-Aug: "काम की भाषा" + ओरोमो (PJ081, kkb_om_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v412'; // 28-Aug: "काम की भाषा" + अम्हारिक (PJ080, kkb_am_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v411'; // 28-Aug: "काम की भाषा" + षोसा (PJ079, kkb_xh_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v410'; // 28-Aug: "काम की भाषा" + ज़ुलु (PJ078, kkb_zu_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v409'; // 28-Aug: "काम की भाषा" + इग्बो (PJ077, kkb_ig_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v408'; // 28-Aug: "काम की भाषा" + योरूबा (PJ076, kkb_yo_data.js) — courses_data.js बदला (cache-first) — अफ़्रीका-शृंखला शुरू
// पुराना: const CACHE_VERSION = 'v407'; // 27-Aug: "काम की भाषा" + तिब्बती (PJ075, kkb_bo_data.js) — courses_data.js बदला (cache-first) — 11-भाषा दक्षिण-पूर्व/पूर्व एशिया शृंखला पूर्ण
// पुराना: const CACHE_VERSION = 'v406'; // 27-Aug: "काम की भाषा" + मंगोलियाई (PJ074, kkb_mn_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v405'; // 27-Aug: "काम की भाषा" + सिबुआनो (PJ073, kkb_ceb_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v404'; // 27-Aug: "काम की भाषा" + सुंडानी (PJ072, kkb_su_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v403'; // 27-Aug: "काम की भाषा" + तागालोग (PJ071, kkb_tl_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v402'; // 27-Aug: "काम की भाषा" + मलय (PJ070, kkb_ms_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v401'; // 27-Aug: "काम की भाषा" + लाओ (PJ069, kkb_lo_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v400'; // 27-Aug: "काम की भाषा" + खमेर (PJ068, kkb_km_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v399'; // 27-Aug: "काम की भाषा" + बर्मी (PJ067, kkb_my_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v398'; // 27-Aug: "काम की भाषा" + थाई (PJ066, kkb_th_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v397'; // 27-Aug: "काम की भाषा" + वियतनामी (PJ065, kkb_vi_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v396'; // 27-Aug: "काम की भाषा" + दारी (PJ064, kkb_prs_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v395'; // 27-Aug: "काम की भाषा" + बलूची (PJ063, kkb_bal_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v394'; // 27-Aug: "काम की भाषा" + पश्तो (PJ062, kkb_ps_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v393'; // 27-Aug: "काम की भाषा" + सिंहली (PJ061, kkb_si_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v392'; // 27-Aug: "काम की भाषा" + मगही (PJ060, kkb_mag_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v391'; // 27-Aug: "काम की भाषा" + अवधी (PJ059, kkb_awa_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v390'; // 27-Aug: "काम की भाषा" + बोडो (PJ058, kkb_brx_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v389'; // 27-Aug: "काम की भाषा" + उड़िया (PJ057, kkb_or_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v388'; // 27-Aug: "काम की भाषा" + मलयालम (PJ056, kkb_ml_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v387'; // 27-Aug: "काम की भाषा" + उर्दू (PJ055, kkb_ur_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v386'; // 27-Aug: "काम की भाषा" + कुमाऊंनी (PJ054, kkb_kfy_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v385'; // 27-Aug: "काम की भाषा" + गढ़वाली (PJ053, kkb_gbm_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v384'; // 27-Aug: "काम की भाषा" + रूसी (PJ052, kkb_ru_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v383'; // 27-Aug: "काम की भाषा" + मणिपुरी (PJ051, kkb_mni_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v382'; // 27-Aug: "काम की भाषा" + डोगरी (PJ050, kkb_doi_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v381'; // 27-Aug: "काम की भाषा" + सिंधी (PJ049, kkb_sd_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v380'; // 27-Aug: "काम की भाषा" + कोंकणी (PJ048, kkb_gom_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v379'; // 27-Aug: "काम की भाषा" + नेपाली (PJ047, kkb_ne_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v378'; // 26-Aug: "काम की भाषा" + कश्मीरी (PJ046, kkb_ks_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v377'; // 26-Aug: "काम की भाषा" + संथाली (PJ045, kkb_sat_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v376'; // 26-Aug: "काम की भाषा" + मारवाड़ी (PJ044, kkb_mwr_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v375'; // 26-Aug: "काम की भाषा" + हरियाणवी (PJ043, kkb_bgc_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v374'; // 26-Aug: "काम की भाषा" + मैथिली (PJ042, kkb_mai_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v373'; // 26-Aug: "काम की भाषा" + असमिया (PJ041, kkb_as_data.js, script assamese) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v372'; // 26-Aug: "काम की भाषा" + छत्तीसगढ़ी (PJ040, kkb_hne_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v371'; // 26-Aug: "काम की भाषा" + पंजाबी (PJ039, kkb_pa_data.js) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v370'; // 26-Aug: "काम की भाषा" + भोजपुरी (PJ038, kkb_bho_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v369'; // 26-Aug: मीनान-गहन-ऑडिट — kkb_nan_data.js में Tâi-lô रोमनीकरण जोड़ी गई (मैंडरिन-परिपाटी अनुसार) (cache-first)
// पुराना: const CACHE_VERSION = 'v368'; // 26-Aug: "काम की भाषा" + मीनान चीनी (PJ037, kkb_nan_data.js, script nan) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v367'; // 26-Aug: हाउसा-ऑडिट — kkb.js norm() अपॉस्ट्रॉफ़ी-फ़िक्स (सब भाषाओं पर, मुख्यतः हाउसा के लिए) (cache-first)
// पुराना: const CACHE_VERSION = 'v366'; // 26-Aug: "काम की भाषा" + हाउसा (PJ036, kkb_ha_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v365'; // 26-Aug: "काम की भाषा" + फ़ारसी (PJ035, kkb_fa_data.js, RTL) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v364'; // 26-Aug: "काम की भाषा" + जावानीज़ (PJ034, kkb_jv_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v363'; // 26-Aug: "काम की भाषा" + गुजराती (PJ033, kkb_gu_data.js) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v362'; // 26-Aug: "काम की भाषा" + स्वाहिली (PJ032, kkb_sw_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v361'; // 26-Aug: "काम की भाषा" + कोरियाई (PJ031, kkb_ko_data.js, script कोरियाई) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v360'; // 26-Aug: "काम की भाषा" + तुर्की (PJ030, kkb_tr_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v359'; // 26-Aug: "काम की भाषा" + तमिल (PJ029, kkb_ta_data.js) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v358'; // 26-Aug: तेलुगु ऑडिट — kkb.js norm() ZWNJ/ZWJ-strip + kkb_te_data सुधार (cache-first)
// पुराना: const CACHE_VERSION = 'v357'; // 26-Aug: "काम की भाषा" + तेलुगु (PJ028, kkb_te_data.js) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v356'; // 26-Aug: "काम की भाषा" + मराठी (PJ027, kkb_mr_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v355'; // 26-Aug: "काम की भाषा" + जापानी (PJ026, kkb_ja_data.js, script जापानी) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v354'; // 26-Aug: "काम की भाषा" + इंडोनेशियाई (PJ025, kkb_id_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v353'; // 26-Aug: "काम की भाषा" + पुर्तगाली (PJ024, kkb_pt_data.js) — courses_data.js बदला (cache-first)
// पुराना: const CACHE_VERSION = 'v352'; // 26-Aug: "काम की भाषा" + बांग्ला (PJ023, kkb_bn_data.js) — courses_data.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v351'; // 26-Aug: "काम की भाषा" पाँचों कोर्स /courses/hi/bhasha/ परिवार-folder में — courses_data.js/kkb.js बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v350'; // 26-Aug: "काम की भाषा" + अरबी/MENA (PJ022, kkb_ar_data.js, RTL) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v349'; // 26-Aug: "काम की भाषा" + Spanish (PJ021, kkb_es_data.js) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v348'; // 26-Aug: "काम की भाषा" + चीनी/Mandarin (PJ020, kkb_zh_data.js) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v347'; // 26-Aug: "काम की भाषा" कोर्स — English (PJ018) + कन्नड (PJ019, kkb_kn_data.js) — courses_data.js/kkb.js/kkb.css बदले (cache-first)
// पुराना: const CACHE_VERSION = 'v345'; // 25-Aug: वेल्डिंग 630 quiz-shards k04-k12 + wld-progress v1.1 (12 हिस्से) + exam_data/sitemap
// पुराना: const CACHE_VERSION = 'v344'; // 19-Aug: वेल्डिंग quiz/प्रगति (wld-progress.js नया, exam_data/dashboard बदले)
// पुराना: const CACHE_VERSION = 'v343'; // 18-Aug: ई-कॉमर्स मास्टरी 326-पाठ cutover (ecom-progress.js नया, exam_data/dashboard/courses_data बदले)
// पुराना: const CACHE_VERSION = 'v342'; // 17-Aug: DCA-2036 पता-सुधार (Founder-अ) — /courses/hi/digital/dca/ पर; dca-2036 folder व redirect-पर्चियाँ हटीं
// v341 // 16-Aug: DCA-2036 cutover — /courses/hi/dca-2036/ (498 पाठ), course-progress.js, dca_quiz shards, exam_data v1.5, courses_data/udyam_data कड़ी
// v340 // 13-Aug: SE023 मशरूम 120-प्रश्न server-परीक्षा — dashboard.js v6.1 (SERVER_EXAM_COURSES) +
// exam_data.js द्वार-प्रविष्टि + msh_quiz_k01-12.js पैडिंग-सुधार (172 विकल्प); सब cache-first ⇒ bump। // 13-Aug: msh-progress.js v1.1 (सुरक्षा-पत्रक बीच-पेज + dropdown-सूची) cache-first ⇒ bump। // 13-Aug: मशरूम-कोर्स SE023/n-951 — courses_data.js व udyam_data.js बदले (cache-first) + नया msh-progress.js। // 05-Aug: टू-व्हीलर 120-प्रश्न server-परीक्षा — dashboard.js v6.0 (SE022 server-मोड) + exam_data.js v1.4 (द्वार-प्रविष्टि); दोनों cache-first ⇒ bump अनिवार्य।
  // पुराना v335 (03-Aug-3): twv-hero.js v2.0 — शिक्षण-रेखा-चित्र (label-सहित आरेख); Founder-सुधार से v1 का सजावटी रूप निरस्त।
  // पुराना v330: टू-व्हीलर कोर्स (SE022) — courses_data.js व udyam_data.js बदले (cache-first)।
  // पुराना v329 (01-Aug): tab-0 का पूरा उप-वाक्य (3 लाइन) पूरी तरह
  // हटाया — अब सिर्फ़ "✅ अभी पढ़ना शुरू करें!" शीर्षक व नीचे 5 कोर्स के कार्ड, कोई टेक्स्ट-ब्योरा नहीं।
  // पुराना v328: झूठा-दावा हटाया था (परीक्षा/प्रमाणपत्र सिर्फ़ 2/5 में)। पुराना v327: hero-padding
  // घटाई। पुराना v326: courses/hi/index.html पूरा 6-tab redesign — ब्योरा उन दौर के delivery में दर्ज।
// पुराना v310: // DCA CERT EXAM (30-Jul, Founder urgent — 500 offline students awaiting certificates): exam_data.js v1.2 adds PJ016 bank of 120 MCQs (12 chapters x 10, grounded in real DCA lesson titles), presented as 3 sets of 40 (dashboard v5.9 set headings), pass 60%, minLessons=0 so offline-trained learners can sit without re-reading online lessons (Founder can raise gate by editing one number); server fetches bank live => NO function redeploy; existing Rs125 certificate engine serves the result.\n// पुराना v309: // RULE CODIFIED (30-Jul, Founder): timer+progress engine is now the PERMANENT LAW for every course — audit proved printer(900)/dca(360)/ai(150)/welding(100) lesson pages already carry course-lesson.js (shared asset => v1.3 clock went live on all of them with v308); ecom(120) wired earlier; build_course_pages.js now FAILS the build if any future lesson page lacks the css/js link; 2 course-details meta pages deliberately excluded (fake read-count inflation guard).\n// पुराना v308 (टिप्पणी-श्रृंखला यथावत): // FLOATING TIMER (30-Jul, Founder: blind page): course-lesson.js v1.2 adds fixed bottom-right pill on EVERY lesson page (all courses, shared asset — zero page regen): elapsed time always ticking + 25s countdown / scroll-to-bottom hint, flips green PAATH DARJ (+10) on mark; style JS-injected so works even without css link; rule unchanged (bottom OR 25s, whichever first).\n// पुराना v307: // STEP-1+2 (30-Jul, Founder ek-ke-baad-do saath): (1) all 120 ecom legacy lesson pages injected with course-lesson.css+js before </body> so reading finally writes acs_learn_progress -> dashboard/account sync (closes v3.2-c2 hole for ecom); (2) exam_data.js v1.1 adds SE009 bank (10 MCQ, minLessons=120 per Founder, pass 60) — server fetches this same file so NO function redeploy needed.\n// पुराना v306: // FIX-7 (30-Jul, ecom probe): progress counting switched to exact course-home matching (crsHome/cntRead) — old prefix regex broke on 3-level paths and index.html urls, so printer/dca/ai could NEVER be counted; dashboard.js v5.7.1.\n// पुराना v305: // FIX-6 (30-Jul, laptop-4/mobile-2 mystery): the JOIN(+) enrollment list was device-local (documented hole) — now unioned through syncLearnProgress too (client sends enr id+at, server merges keeping earliest at, response rewrites acs_my_courses) so every phone shows the SAME course list; backward-compatible both directions. dashboard.js v5.7; REDEPLOY functions:syncLearnProgress with new index.js.\n// पुराना v304: // HOLE FIX (30-Jul): 'rb is not defined' — rb was trapped inside k9 IIFE scope so crsMineFill (latent since v5.3!) and crsCenterFill silently died; readable-error rule exposed it live; both now use in-scope noSq. dashboard.js v5.6.2 only. // +v1.3: single unified floating clock; Founder IDLE RULE (10s no touch/mouse/scroll/key OR hidden tab = PAUSED); 25s-mark counts ACTIVE seconds only; 30min/page cap; course-total line on widget.
// पुराना v303: // FOUNDER FIX-5 (30-Jul): (a) MERI COURSE PRAGATI table now two-phase — instant render from this phone (registered courses appear immediately, matching profile tile), then account-merged final; 8s race guard on syncLearnProgress; readable error instead of stuck loading note. (b) course-card JOIN chip: enrolled shows chip directly, chip/button now block one-line below padhe button, never wraps; crsstep 15px->16px font-rule hole closed. dashboard.js v5.6.1 + dashboard.css only — no page regen.\n// पुराना v302: // FOUNDER FIX-4 (30-Jul): MERE COURSE PRAGATI table replaces mera-padhai list per uploaded photo — columns course|progress|EXAM(new, between progress & certificate per order-4)|certificate|action; heading renamed, desc line removed; progress is now SERVER TRUTH via new syncLearnProgress callable (local-union-server, rewritten to localStorage) so changing phones never changes the graph; profile course tiles use same sync; rules v11 learnProgress owner-read; old crsgraph/lvrow layout retired.\n// पुराना v301: // FOUNDER FIX-3 (30-Jul, student menu): 6 panel pairs merged into 1 each on /dashboard/student/ only (status+goldenBadge with NEW 3-state dynamic menu name khata: koi badge nahin / green / golden via updateAcctNav; courses+progress; exams+certs; pay+ledger=mera account; aptitude+counsel; rules+help=niyam-sahayta-shikayat moved BELOW vani per order-7); merged B blocks keep ids so engines live, MERGED_LAZY fires B lazy engines when A opens; generator applyStudentMerges balanced-div transform, dashboard.js v5.5.
// पुराना v300: // FOUNDER FIX (30-Jul): profile performance card trimmed to 3 tiles only (course-registered, course-done, badge) — lessons/streak/interest tiles removed as clutter; account-result engine untouched (test page still reads it); template + dashboard.js v5.4.1 regen of 31 homes.
// पुराना v299: // 2-HOLE ROUND (30-Jul, Founder): HOLE-1 aptitude result summary server-saved on final-submit (apt-pay v1.1 saveResult/latestResult -> saveAptitudeResult/latestAptitudeResult; apt-session v1.2 fires save + cloud fallback for pichla-hisab; dashboard perfSector prefers account) so changing phones keeps the result; HOLE-2 profile perf card = 6 center-aligned tiles adding course-registered/course-done, MERE COURSE gains progress graph (blue=ongoing green=done), all data center-aligned; ensureCoursesData single-door loader kills double-const crash; rules v10 aptitudeResults owner-read. Deploy functions(saveAptitudeResult,latestAptitudeResult)+rules from office.
// पुराना v298: // (supersedes un-uploaded v274) KAAM-8 REFERRAL CLIENT + VOLUNTEER BADGE (Founder: 1-a record-only via 7-workday cycle, volunteer gets badge too=uniformity, fund giftable, badge-purchases only for now): all 5 badge panels gain referral section (optional code input=referrer regNo, my-code shown only with active badge, quota x/3 or unlimited for volunteer, fund list due/paid with expiry, gift by ACS-number); dashboard.js v5.2 sends referralCode to createBadgeOrder and adds loadMyReferrals+gift engine; server: BADGE_ROLES+volunteer, min/3 formula at grant-moment inside both grant transactions (idempotent doc-id=orderId), giftReferral fn; firestore.rules v7 referrals read-block. Deploy functions+rules from office.
const CACHE_NAME    = 'acs-' + CACHE_VERSION;
const OFFLINE_URL   = '/offline.html';

/* फ़ॉन्ट URL — style.css/template जो माँगते हैं उससे हूबहू मेल (400–900) */
const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap';

/* न बदलने वाली साझा चीज़ें — offline में भी साइट चले */
const PRECACHE_URLS = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/style.css',
  '/acs-universal.css',
  '/acs-style.css',
  '/assets/acs-universal.js',
  '/script.js',
  '/logo.png',
  '/assets/acs-config.js',
  '/assets/links.js',
  '/assets/acs-translate.js',
  FONT_URL
];

/* निजी/सुरक्षित रास्ते — कभी cache नहीं */
function isPrivatePath(url) {
  return /\/dashboard\/|\/dashboard\.html|\/callcenter\/|\/founder|\/admin|\/manager\/|\/operator\/|\/profile\.html|\/register\.html|register\.html|\/login|\/teacher\/|\/counselor\/|\/employer\/|\/partner\//i.test(url);
}

function isHTMLRequest(request) {
  return request.mode === 'navigate' ||
         (request.headers.get('accept') || '').includes('text/html');
}

/* ── Install: साझा चीज़ें pre-cache (एक-एक करके — एक fail हो तो बाक़ी न रुकें) ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(PRECACHE_URLS.map(u =>
        cache.add(u).catch(err => console.log('ACS SW precache skip:', u, err))
      ))
    )
  );
  self.skipWaiting();
});

/* ── Activate: पुरानी cache मिटाओ, तुरंत कमान लो ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ── page से संदेश: "Update करें" दबाने पर तुरंत नया sw सक्रिय ── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ── Fetch ── */
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // निजी page → सीधे नेटवर्क (कभी cache नहीं)
  if (isPrivatePath(request.url)) return;

  // HTML → network-first (हमेशा ताज़ा)
  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(r =>
            r || caches.match(OFFLINE_URL).then(off =>
              off || new Response(
                '<meta charset="utf-8"><div style="font-family:sans-serif;text-align:center;padding:40px;font-size:18px">आप अभी offline हैं। कृपया इंटरनेट जाँचें।</div>',
                { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
              )
            )
          )
        )
    );
    return;
  }

  // बाक़ी static (CSS/JS/font/image) → cache-first + background refresh
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

/* ── Push Notifications (vani/dashboard) ── */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'ACS', {
      body: data.body || 'नई सूचना',
      icon: '/logo.png',
      badge: '/logo.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});
