/* ============================================================
   /assets/aptitude_art.js — v3.0 (+ खेप-3 के 3 नए चित्र = कुल 96)
   ACS Aptitude चित्र-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - चित्र-गिनती: 96 (खेप-1 के 46 + खेप-2 के 47 + खेप-3 के 3:
     pani_khoj · chitthi_daftar · aag_bujhana — बाक़ी 47 प्रश्न पुराने चित्रों से)
   - खेप-2 पुनरुपयोग (प्रश्न-data इन्हीं id को दोबारा बुलाए):
     नक़्शे-पर-देश→world_map · भंडारा-परोसना→food_serve · साबुन-बेचना→shop_sell
     पुरानी-मशीन→run_machine · हिसाब-जाँच→hisab_copy · वीडियो-से-समझाना→video_edit
     दूसरों-को-सिखाना→teach_kids · कथा-3-साबुन→soap_make · q39-रोबोट→robot_toy
   - नियम (v3.9-ग): SVG रेखा-चित्र ही · हर चित्र के नीचे शब्द page-स्तर
     पर अनिवार्य (label यहाँ नहीं — प्रश्न-data से आए) · बच्चों के असली
     चेहरे कभी नहीं (सिर्फ़ सरल रेखा-आकृति) · लड़का-लड़की बारी-बारी।
   - रंग: सिर्फ़ ACS-परिवार — Navy #0B1F3A (रेखा) · Gold #F9A825 ·
     Green #2E7D32 · Blue #1565C0 · Off-White #F5F7FA
   - हर SVG: viewBox 0 0 200 160 · stroke 3px · गोल सिरे · पारदर्शी पृष्ठभूमि
   - पुनरुपयोग-नक़्शा (प्रश्न-data इन id को दोबारा बुलाए, नई नक़ल कभी नहीं):
       app_use→mobile_app · girl_teach→teach_kids · teach_other→teach_kids
       group_lead→team_win · stitch_girl→embroidery · brick_boy→brick_wall
       shop_stall→shop_sell · travel_new→travel_road · seed_girl→seed_sow
       nature_watch→forest_birds · decorate→decoration
   ============================================================ */
window.APT_ART = {

toy_open:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="45" y="92" width="76" height="30" rx="9"/>' +
'<circle cx="63" cy="128" r="9"/><circle cx="103" cy="128" r="9"/>' +
'<path d="M50 92 L76 66 L112 66" />' +
'<circle cx="82" cy="86" r="8" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M82 78 v-5 M82 94 v5 M74 86 h-5 M90 86 h5"/>' +
'<path d="M158 48 L124 78" stroke="#1565C0" stroke-width="6"/>' +
'<path d="M124 78 L118 84" />' +
'<path d="M150 32 q8 8 8 16" stroke="#F9A825"/>' +
'</svg>',

sick_care:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="26" y="104" width="126" height="12" rx="4"/>' +
'<path d="M32 116 v14 M146 116 v14"/>' +
'<circle cx="52" cy="92" r="10"/>' +
'<path d="M64 100 q40 -10 84 -2" />' +
'<rect x="43" y="80" width="18" height="6" rx="3" fill="#2E7D32" stroke="none"/>' +
'<circle cx="128" cy="44" r="10"/>' +
'<path d="M136 50 q8 8 6 20" stroke="#0B1F3A"/>' +
'<path d="M128 54 v34"/>' +
'<path d="M128 64 L62 82" stroke="#1565C0"/>' +
'<path d="M48 90 h3 M55 90 h3" stroke-width="2.5"/>' +
'</svg>',

mobile_app:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="72" y="24" width="56" height="102" rx="10"/>' +
'<path d="M92 32 h16" stroke-width="2.5"/>' +
'<rect x="82" y="44" width="12" height="12" rx="3" fill="#F9A825" stroke="none"/>' +
'<rect x="100" y="44" width="12" height="12" rx="3" fill="#1565C0" stroke="none"/>' +
'<rect x="82" y="62" width="12" height="12" rx="3" fill="#2E7D32" stroke="none"/>' +
'<rect x="100" y="62" width="12" height="12" rx="3" fill="#0B1F3A" stroke="none"/>' +
'<path d="M82 92 h30" stroke-width="2.5"/><path d="M82 100 h22" stroke-width="2.5"/>' +
'<path d="M118 132 q-12 6 -26 2" />' +
'<path d="M104 120 v14" stroke="#1565C0"/>' +
'<path d="M138 40 l6 -6 M142 52 l8 -2" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

cook_pot:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="52" y="122" width="96" height="12" rx="4"/>' +
'<path d="M60 122 v-30 q0 -8 8 -8 h64 q8 0 8 8 v30" />' +
'<path d="M52 96 h8 M140 96 h8"/>' +
'<path d="M60 100 h80" stroke-width="2.5"/>' +
'<path d="M84 74 q-5 -10 2 -18" stroke="#F9A825"/>' +
'<path d="M100 74 q-5 -12 3 -22" stroke="#F9A825"/>' +
'<path d="M116 74 q-5 -10 2 -18" stroke="#F9A825"/>' +
'<path d="M148 60 L128 88" stroke="#2E7D32"/>' +
'<circle cx="151" cy="56" r="6" stroke="#2E7D32"/>' +
'</svg>',

embroidery:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="86" cy="90" r="42"/>' +
'<circle cx="86" cy="90" r="35" stroke-width="2.5"/>' +
'<rect x="122" y="82" width="12" height="14" rx="3"/>' +
'<circle cx="86" cy="90" r="6" fill="#F9A825" stroke="none"/>' +
'<circle cx="86" cy="74" r="6" stroke="#2E7D32"/><circle cx="102" cy="90" r="6" stroke="#2E7D32"/>' +
'<circle cx="86" cy="106" r="6" stroke="#2E7D32"/><circle cx="70" cy="90" r="6" stroke="#2E7D32"/>' +
'<path d="M158 34 L112 66" stroke-width="2.5"/>' +
'<path d="M158 34 q10 24 -6 40 q-16 16 -40 20" stroke="#1565C0" stroke-width="2" stroke-dasharray="5 5"/>' +
'</svg>',

wood_toy:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="24" y="116" width="86" height="12" rx="3"/>' +
'<path d="M40 100 h52 l0 0" stroke-width="2.5"/>' +
'<path d="M40 100 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8 l6 -8" stroke-width="2.5"/>' +
'<rect x="92" y="88" width="22" height="12" rx="4" fill="#F9A825" stroke="#0B1F3A"/>' +
'<rect x="132" y="86" width="42" height="22" rx="8"/>' +
'<path d="M174 86 q10 -2 8 -14 q-8 0 -12 8" />' +
'<circle cx="142" cy="116" r="7"/><circle cx="166" cy="116" r="7"/>' +
'<path d="M136 80 v-6" stroke="#2E7D32"/>' +
'</svg>',

clay_art:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="72" cy="128" rx="34" ry="9"/>' +
'<path d="M54 122 q-6 -20 8 -30 q-10 -14 10 -22 q20 -8 30 6 q14 2 10 18 q10 12 -6 26" />' +
'<path d="M58 96 q16 8 40 0" stroke-width="2.5" stroke-dasharray="4 4"/>' +
'<path d="M150 68 L128 100" stroke="#1565C0"/>' +
'<path d="M150 68 q6 -10 2 -16 q-8 4 -8 12" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<ellipse cx="150" cy="132" rx="22" ry="6"/>' +
'<path d="M134 128 q0 -18 16 -18 q16 0 16 18" stroke="#2E7D32"/>' +
'</svg>',

brick_wall:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="30" y="112" width="34" height="16"/><rect x="68" y="112" width="34" height="16"/><rect x="106" y="112" width="34" height="16"/>' +
'<rect x="48" y="92" width="34" height="16"/><rect x="86" y="92" width="34" height="16"/>' +
'<rect x="66" y="72" width="34" height="16" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M74 60 v-6 M84 58 v-8 M94 60 v-6" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M150 60 l22 14 l-26 8 z" fill="#1565C0" stroke="#0B1F3A"/>' +
'<path d="M172 74 l12 10" />' +
'</svg>',

bulb_fix:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="84" cy="64" r="26"/>' +
'<path d="M74 88 h20 v14 h-20 z"/>' +
'<path d="M78 102 h12" stroke-width="2.5"/>' +
'<path d="M76 64 l6 8 l6 -10 l6 8" stroke="#F9A825"/>' +
'<path d="M84 30 v-8 M58 44 l-7 -5 M110 44 l7 -5" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M160 60 L120 96" stroke="#1565C0" stroke-width="6"/>' +
'<path d="M120 96 L112 103"/>' +
'<path d="M104 118 q20 10 44 4" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

sewing_machine:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="34" y="112" width="132" height="14" rx="4"/>' +
'<rect x="126" y="52" width="18" height="60" rx="6"/>' +
'<rect x="56" y="52" width="76" height="16" rx="6"/>' +
'<path d="M70 68 v22"/>' +
'<path d="M66 90 h10" stroke-width="2.5"/>' +
'<circle cx="156" cy="66" r="10" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M40 108 q24 -12 52 0 q20 8 36 0" stroke="#1565C0"/>' +
'<circle cx="92" cy="58" r="3" fill="#0B1F3A" stroke="none"/>' +
'</svg>',

vehicle_sound:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="58" cy="114" r="17"/><circle cx="142" cy="114" r="17"/>' +
'<path d="M58 114 L88 84 L124 84 L142 114"/>' +
'<path d="M88 84 L76 68 L64 68"/>' +
'<path d="M124 84 L132 70"/>' +
'<rect x="96" y="92" width="22" height="14" rx="4" fill="#1565C0" stroke="#0B1F3A"/>' +
'<path d="M132 96 q10 -4 12 -12" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M140 102 q14 -6 17 -18" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M148 108 q18 -8 22 -24" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

shop_sell:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="28" y="96" width="120" height="12" rx="3"/>' +
'<path d="M34 108 v22 M142 108 v22"/>' +
'<path d="M28 52 h120" stroke-width="2.5"/>' +
'<rect x="44" y="58" width="16" height="22" rx="3" stroke="#2E7D32"/>' +
'<rect x="68" y="58" width="16" height="22" rx="3" stroke="#1565C0"/>' +
'<circle cx="112" cy="70" r="9"/>' +
'<path d="M112 79 v16 M112 84 L134 78"/>' +
'<path d="M138 70 h18 l-3 20 h-12 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<circle cx="162" cy="120" r="6" stroke="#F9A825"/><circle cx="176" cy="126" r="6" stroke="#F9A825"/>' +
'</svg>',

piggy_bank:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="96" cy="102" rx="48" ry="32"/>' +
'<circle cx="146" cy="98" r="12"/>' +
'<path d="M150 96 h4 M150 102 h4" stroke-width="2"/>' +
'<path d="M64 78 l-8 -12 l14 4" />' +
'<path d="M70 132 v10 M120 132 v10"/>' +
'<circle cx="80" cy="94" r="2.5" fill="#0B1F3A" stroke="none"/>' +
'<rect x="86" y="66" width="22" height="5" rx="2.5" fill="#0B1F3A" stroke="none"/>' +
'<circle cx="97" cy="40" r="11" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M97 54 v6" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

decoration:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M22 40 q78 26 156 0" stroke-width="2.5"/>' +
'<path d="M44 46 l7 16 l7 -14" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M76 52 l7 16 l7 -14" fill="#2E7D32" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M108 52 l7 16 l7 -14" fill="#1565C0" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M140 46 l7 16 l7 -14" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M168 44 v56" stroke-width="2.5"/>' +
'<circle cx="168" cy="106" r="6" stroke="#F9A825"/><circle cx="168" cy="118" r="6" stroke="#2E7D32"/><circle cx="168" cy="130" r="6" stroke="#F9A825"/>' +
'<path d="M52 130 q10 -14 26 -10" />' +
'<circle cx="46" cy="132" r="8"/>' +
'</svg>',

travel_road:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M60 136 q30 -50 10 -96"/>' +
'<path d="M120 136 q34 -52 14 -100"/>' +
'<path d="M96 128 l4 -12 M100 104 l4 -12 M102 80 l3 -12 M102 56 l2 -10" stroke-width="2.5" stroke-dasharray="1 1"/>' +
'<rect x="118" y="42" width="52" height="30" rx="6" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M128 50 h10 M144 50 h10" stroke-width="2.5"/>' +
'<circle cx="132" cy="76" r="7"/><circle cx="158" cy="76" r="7"/>' +
'<rect x="30" y="96" width="14" height="22" rx="3" stroke="#2E7D32"/>' +
'<path d="M33 104 h8" stroke="#2E7D32" stroke-width="2"/>' +
'</svg>',

seed_sow:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M24 128 h152" stroke-width="2.5"/>' +
'<circle cx="62" cy="52" r="10"/>' +
'<path d="M70 58 q10 6 8 18" stroke="#0B1F3A"/>' +
'<path d="M62 62 q16 14 8 38 M70 100 l-10 26 M66 100 l14 24"/>' +
'<path d="M70 76 L96 92" stroke="#1565C0"/>' +
'<circle cx="102" cy="100" r="2.5" fill="#0B1F3A" stroke="none"/>' +
'<circle cx="110" cy="110" r="2.5" fill="#0B1F3A" stroke="none"/>' +
'<circle cx="104" cy="120" r="2.5" fill="#0B1F3A" stroke="none"/>' +
'<path d="M132 128 v-14 M132 114 q-8 -2 -10 -10 M132 114 q8 -2 10 -10" stroke="#2E7D32"/>' +
'<path d="M158 128 v-18 M158 110 q-9 -2 -11 -12 M158 110 q9 -2 11 -12" stroke="#2E7D32"/>' +
'</svg>',

fish_pond:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="100" cy="104" rx="72" ry="34"/>' +
'<path d="M52 100 q10 6 20 0 q10 -6 20 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M116 118 q10 6 20 0 q10 -6 20 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M84 112 q12 -10 26 0 q-12 10 -26 0 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M84 112 l-10 -6 v12 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M118 92 q10 -8 22 0 q-10 8 -22 0 z" stroke-width="2"/>' +
'<path d="M118 92 l-8 -5 v10 z" stroke-width="2"/>' +
'<path d="M34 78 q-2 -18 4 -28 M44 76 q-2 -14 2 -22" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

cow_milk:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="46" y="62" width="86" height="40" rx="18"/>' +
'<circle cx="146" cy="70" r="15"/>' +
'<path d="M138 58 l-4 -8 M154 58 l4 -8"/>' +
'<circle cx="142" cy="68" r="2" fill="#0B1F3A" stroke="none"/>' +
'<path d="M56 102 v26 M76 102 v26 M104 102 v26 M124 102 v26"/>' +
'<path d="M64 72 q8 8 16 0 q6 10 -4 14 q-10 2 -12 -14 z" stroke-width="2"/>' +
'<path d="M92 118 v6" stroke-width="2.5"/>' +
'<path d="M84 132 h20 l-3 16 h-14 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'</svg>',

forest_birds:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M56 132 v-34"/>' +
'<circle cx="56" cy="76" r="24" stroke="#2E7D32"/>' +
'<circle cx="40" cy="90" r="14" stroke="#2E7D32"/>' +
'<circle cx="74" cy="90" r="14" stroke="#2E7D32"/>' +
'<path d="M138 132 v-28"/>' +
'<circle cx="138" cy="86" r="20" stroke="#2E7D32"/>' +
'<path d="M100 44 q6 -8 12 0 q6 -8 12 0" stroke-width="2.5"/>' +
'<path d="M84 60 q5 -7 10 0 q5 -7 10 0" stroke-width="2.5"/>' +
'<circle cx="170" cy="34" r="12" stroke="#F9A825"/>' +
'<path d="M24 132 h152" stroke-width="2.5"/>' +
'</svg>',

ride_machine:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="100" cy="74" r="46"/>' +
'<path d="M100 28 v92 M54 74 h92 M68 42 l64 64 M132 42 l-64 64" stroke-width="2"/>' +
'<circle cx="100" cy="74" r="11" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M100 59 v-4 M100 89 v4 M85 74 h-4 M115 74 h4" stroke-width="2.5"/>' +
'<rect x="92" y="20" width="16" height="10" rx="3" stroke="#1565C0"/>' +
'<rect x="140" y="66" width="16" height="10" rx="3" stroke="#1565C0"/>' +
'<rect x="44" y="66" width="16" height="10" rx="3" stroke="#1565C0"/>' +
'<path d="M100 120 L76 148 M100 120 L124 148"/>' +
'</svg>',

stage_song:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="30" y="116" width="140" height="14" rx="4"/>' +
'<path d="M38 30 q14 40 0 84" stroke="#1565C0"/>' +
'<path d="M162 30 q-14 40 0 84" stroke="#1565C0"/>' +
'<path d="M30 30 h140" stroke-width="2.5"/>' +
'<path d="M100 116 v-40"/>' +
'<path d="M88 116 h24" stroke-width="2.5"/>' +
'<circle cx="100" cy="66" r="10" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M132 62 v-16 q8 -2 8 6 t-8 10" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M56 70 v-14 q7 -2 7 5 t-7 9" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

count_money:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="44" y="84" width="76" height="34" rx="5"/>' +
'<rect x="52" y="74" width="76" height="34" rx="5" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<rect x="60" y="64" width="76" height="34" rx="5" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<circle cx="98" cy="81" r="9" stroke="#2E7D32"/>' +
'<circle cx="152" cy="116" r="11" stroke="#F9A825"/>' +
'<circle cx="170" cy="128" r="9" stroke="#F9A825"/>' +
'<path d="M52 132 q22 12 48 6" />' +
'<path d="M76 122 v12" stroke="#1565C0"/>' +
'</svg>',

run_machine:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="40" y="66" width="64" height="52" rx="8"/>' +
'<path d="M52 80 h24 M52 92 h32" stroke-width="2.5"/>' +
'<circle cx="146" cy="94" r="26"/>' +
'<circle cx="146" cy="94" r="6" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M146 68 v-10 h14" stroke="#1565C0"/>' +
'<path d="M104 82 L120 88 M104 106 L120 100" stroke-width="2.5" stroke-dasharray="5 4"/>' +
'<path d="M178 66 q8 10 4 22" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M52 118 v14 M92 118 v14 M134 118 v16 M158 118 v16"/>' +
'</svg>',

leaky_roof:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M40 70 L100 26 L160 70"/>' +
'<path d="M52 70 v58 M148 70 v58"/>' +
'<path d="M40 128 h120" stroke-width="2.5"/>' +
'<path d="M100 40 q6 10 0 16" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M100 66 v10 M100 84 v10 M100 102 v8" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M88 118 h24 l-3 12 h-18 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M24 40 q8 8 0 16 M176 40 q-8 8 0 16" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

tube_bubble:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M32 92 h136 l-12 40 h-112 z"/>' +
'<path d="M40 100 q14 8 30 0 q16 -8 32 0 q16 8 32 0 q10 -5 18 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<circle cx="100" cy="96" r="30"/>' +
'<circle cx="100" cy="96" r="18" stroke-width="2.5"/>' +
'<circle cx="118" cy="74" r="4" stroke="#F9A825"/>' +
'<circle cx="124" cy="60" r="5" stroke="#F9A825"/>' +
'<circle cx="132" cy="44" r="6" stroke="#F9A825"/>' +
'<path d="M56 56 L84 72" stroke="#2E7D32"/>' +
'</svg>',

teach_kids:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="26" y="34" width="76" height="52" rx="4"/>' +
'<path d="M36 48 h40 M36 60 h52 M36 72 h32" stroke="#1565C0" stroke-width="2.5"/>' +
'<circle cx="136" cy="52" r="11"/>' +
'<path d="M145 58 q9 9 7 22" stroke="#0B1F3A"/>' +
'<path d="M136 63 v40 M136 76 L106 62 M136 80 L156 94"/>' +
'<path d="M106 62 L98 56" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="60" cy="116" r="8"/><path d="M60 124 v14"/>' +
'<circle cx="92" cy="116" r="8"/><path d="M92 124 v14"/>' +
'</svg>',

jugaad_new:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M42 66 v40 q0 8 8 8 h16 q8 0 8 -8 v-40"/>' +
'<path d="M48 66 h20 M52 58 h12 M52 58 v-8 h12 v8" stroke-width="2.5"/>' +
'<path d="M92 90 h28" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M120 90 l-7 -6 M120 90 l-7 6" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M134 114 h36 l-5 -28 h-26 z"/>' +
'<path d="M152 86 v-18 M152 68 q-9 -2 -11 -12 M152 68 q9 -2 11 -12" stroke="#2E7D32"/>' +
'<path d="M140 100 h24" stroke="#2E7D32" stroke-width="2"/>' +
'</svg>',

team_win:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="96" cy="46" r="11"/>' +
'<path d="M105 52 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M96 57 v42 M96 70 L70 84 M96 66 L122 44 M96 99 L82 130 M96 99 L110 130"/>' +
'<path d="M122 44 v-18 l20 6 l-20 6" fill="#F9A825" stroke="#0B1F3A"/>' +
'<circle cx="52" cy="72" r="8"/><path d="M52 80 v26 M52 88 l-12 10 M52 88 l12 8"/>' +
'<circle cx="152" cy="72" r="8"/><path d="M152 80 v26 M152 88 l-12 8 M152 88 l12 10"/>' +
'</svg>',

boy_bandage:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="60" cy="52" r="11"/>' +
'<path d="M60 63 v44 M60 76 L96 84 M60 107 l-12 26 M60 107 l12 26"/>' +
'<circle cx="146" cy="56" r="11"/>' +
'<path d="M146 67 v42 M146 80 L110 86 M146 109 l-12 26 M146 109 l12 26"/>' +
'<rect x="96" y="78" width="16" height="12" rx="3" fill="#2E7D32" stroke="#0B1F3A"/>' +
'<path d="M98 84 h12" stroke="#F5F7FA" stroke-width="2"/>' +
'<path d="M84 40 l4 -4 M92 44 l5 -2" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

stage_play:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="28" y="118" width="144" height="12" rx="4"/>' +
'<path d="M34 28 q12 42 0 90" stroke="#1565C0"/>' +
'<path d="M166 28 q-12 42 0 90" stroke="#1565C0"/>' +
'<path d="M28 28 h144" stroke-width="2.5"/>' +
'<circle cx="80" cy="62" r="10"/>' +
'<path d="M80 72 v34 M80 82 L58 66 M80 84 L100 92 M80 106 l-10 12 M80 106 l10 12"/>' +
'<circle cx="132" cy="60" r="10"/>' +
'<path d="M141 66 q8 8 6 18" stroke="#0B1F3A"/>' +
'<path d="M132 70 v36 M132 80 L154 62 M132 84 L114 92 M132 106 l-10 12 M132 106 l10 12"/>' +
'<path d="M96 40 q4 -8 10 0" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

news_read:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="40" y="100" width="120" height="14" rx="4"/>' +
'<path d="M52 114 v18 M148 114 v18"/>' +
'<circle cx="100" cy="48" r="11"/>' +
'<path d="M109 54 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M100 59 v41"/>' +
'<path d="M100 72 L74 84 M100 72 L126 84"/>' +
'<rect x="62" y="78" width="24" height="18" rx="2" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<path d="M66 84 h16 M66 90 h12" stroke-width="2"/>' +
'<path d="M132 84 v16" stroke="#F9A825"/>' +
'<circle cx="132" cy="80" r="5" fill="#F9A825" stroke="#0B1F3A"/>' +
'</svg>',

board_wire:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="44" y="40" width="72" height="80" rx="8"/>' +
'<circle cx="66" cy="62" r="8"/><circle cx="94" cy="62" r="8"/>' +
'<path d="M63 60 v4 M69 60 v4 M91 60 v4 M97 60 v4" stroke-width="2"/>' +
'<rect x="58" y="86" width="16" height="20" rx="3" fill="#F9A825" stroke="#0B1F3A"/>' +
'<circle cx="98" cy="96" r="7" stroke="#2E7D32"/>' +
'<path d="M116 96 q26 0 30 26 q2 14 -14 16" stroke="#1565C0"/>' +
'<path d="M160 52 L128 74" stroke="#1565C0" stroke-width="5"/>' +
'<path d="M128 74 L122 79"/>' +
'</svg>',

bolt_fit:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="36" y="84" width="128" height="44" rx="8"/>' +
'<path d="M70 96 l10 6 v12 l-10 6 l-10 -6 v-12 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M130 96 l10 6 v12 l-10 6 l-10 -6 v-12 z"/>' +
'<path d="M70 90 L98 44" stroke="#1565C0" stroke-width="5"/>' +
'<circle cx="102" cy="38" r="9" stroke="#1565C0"/>' +
'<path d="M96 32 l-4 -4 M110 34 l5 -3" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M46 70 q8 -10 20 -8" stroke="#2E7D32" stroke-width="2.5" stroke-dasharray="4 4"/>' +
'</svg>',

hisab_copy:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M40 44 h56 q4 0 4 4 v72 q0 4 -4 4 h-56 q-4 0 -4 -4 v-72 q0 -4 4 -4 z"/>' +
'<path d="M100 48 q4 -4 8 -4 h48 q4 0 4 4 v72 q0 4 -4 4 h-48 q-8 0 -8 -4"/>' +
'<path d="M100 44 v80" stroke-width="2.5"/>' +
'<path d="M48 60 h36 M48 74 h36 M48 88 h28" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M112 60 h20 M112 74 h28 M112 96 h36" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M112 88 h36" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M160 36 L142 58" stroke="#F9A825" stroke-width="4"/>' +
'<path d="M142 58 l-2 6 l6 -3" fill="#F9A825" stroke="#F9A825" stroke-width="2"/>' +
'</svg>',

news_boy:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="84" cy="44" r="11"/>' +
'<path d="M84 55 v48 M84 103 l-14 30 M84 103 l14 30"/>' +
'<path d="M84 68 L56 82 M84 68 L112 82"/>' +
'<path d="M48 74 h64 v28 h-64 z" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<path d="M80 74 v28" stroke-width="2"/>' +
'<path d="M54 82 h20 M54 90 h16 M86 82 h20 M86 90 h14" stroke-width="2"/>' +
'<path d="M124 52 q10 -2 14 -10" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M126 62 q14 -2 20 -12" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

bus_drive:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="48" y="36" width="104" height="86" rx="12" fill="#F9A825" stroke="#0B1F3A"/>' +
'<rect x="58" y="48" width="38" height="26" rx="4" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<rect x="104" y="48" width="38" height="26" rx="4" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<circle cx="77" cy="60" r="7"/>' +
'<circle cx="77" cy="76" r="9" stroke-width="2.5"/>' +
'<path d="M77 70 v12 M71 76 h12" stroke-width="2"/>' +
'<path d="M56 92 h88" stroke-width="2.5"/>' +
'<circle cx="74" cy="128" r="11"/><circle cx="126" cy="128" r="11"/>' +
'<circle cx="58" cy="104" r="4" stroke="#1565C0"/><circle cx="142" cy="104" r="4" stroke="#1565C0"/>' +
'</svg>',

mandi_taul:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M100 34 v70 M60 44 h80" />' +
'<path d="M84 118 h32 l-6 -14 h-20 z"/>' +
'<path d="M60 44 v14 M48 70 q12 10 24 0 M48 70 l12 -12 l12 12" stroke-width="2.5"/>' +
'<path d="M140 44 v20 M128 76 q12 10 24 0 M128 76 l12 -12 l12 12" stroke-width="2.5"/>' +
'<circle cx="55" cy="66" r="4" fill="#2E7D32" stroke="none"/><circle cx="64" cy="66" r="4" fill="#2E7D32" stroke="none"/>' +
'<circle cx="140" cy="72" r="5" fill="#F9A825" stroke="none"/>' +
'<path d="M100 34 l-6 -6 h12 z" fill="#0B1F3A" stroke="none"/>' +
'<path d="M40 132 h120" stroke-width="2.5"/>' +
'</svg>',

hen_farm:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M60 96 q-16 -4 -14 -20 q2 -14 18 -14 q6 -12 20 -8 q2 -10 12 -8 l-4 10 q10 6 8 18 q10 16 -6 24 q-14 8 -34 -2 z"/>' +
'<path d="M92 46 l8 -4" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="88" cy="56" r="2" fill="#0B1F3A" stroke="none"/>' +
'<path d="M64 98 v14 M78 98 v14" stroke-width="2.5"/>' +
'<circle cx="128" cy="108" r="8" stroke="#F9A825"/>' +
'<path d="M136 106 l6 -2 M128 116 v6" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="156" cy="112" r="7" stroke="#F9A825"/>' +
'<path d="M163 110 l5 -2 M156 119 v5" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M44 132 q24 8 52 4" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M36 128 h140" stroke-width="2.5"/>' +
'</svg>',

compost:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M52 122 q-6 -24 16 -32 q4 -16 24 -14 q18 -8 28 8 q18 2 14 22 q8 12 -6 16 z"/>' +
'<path d="M40 128 h120" stroke-width="2.5"/>' +
'<path d="M120 46 q16 4 18 20" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M138 66 l2 -8 M138 66 l-8 -2" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M80 44 q-16 6 -16 22" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M64 66 l-2 -8 M64 66 l8 0" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M100 96 v-16 M100 80 q-8 -2 -10 -10 M100 80 q8 -2 10 -10" stroke="#2E7D32"/>' +
'<path d="M70 108 q6 -6 12 0 M108 104 q6 -6 12 0" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

food_serve:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="96" cy="96" rx="52" ry="16"/>' +
'<ellipse cx="96" cy="92" rx="52" ry="16"/>' +
'<circle cx="76" cy="90" r="8" stroke="#2E7D32"/>' +
'<circle cx="102" cy="94" r="7" stroke="#F9A825"/>' +
'<ellipse cx="122" cy="88" rx="9" ry="5" stroke="#1565C0"/>' +
'<path d="M76 68 q-4 -8 2 -14 M96 66 q-4 -9 2 -16 M116 68 q-4 -8 2 -14" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M148 112 q-16 12 -40 8" />' +
'<path d="M124 112 v8" stroke="#1565C0"/>' +
'</svg>',

mela_gate:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M44 132 v-72 q56 -44 112 0 v72"/>' +
'<path d="M44 76 q56 -40 112 0" stroke-width="2.5"/>' +
'<path d="M58 70 l5 10 l5 -9" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M86 58 l5 10 l5 -9" fill="#2E7D32" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M114 56 l5 10 l5 -9" fill="#1565C0" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M138 66 l5 10 l5 -9" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<circle cx="100" cy="112" r="16" stroke="#F9A825"/>' +
'<path d="M100 96 v32 M84 112 h32 M89 101 l22 22 M111 101 l-22 22" stroke="#F9A825" stroke-width="2"/>' +
'<path d="M30 132 h140" stroke-width="2.5"/>' +
'</svg>',

tamatar_tokri:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M52 92 h96 l-10 38 h-76 z"/>' +
'<path d="M58 104 h84 M62 116 h76" stroke-width="2"/>' +
'<circle cx="76" cy="84" r="10" stroke="#F9A825"/>' +
'<circle cx="100" cy="80" r="11" stroke="#F9A825"/>' +
'<circle cx="124" cy="84" r="10" stroke="#F9A825"/>' +
'<path d="M100 69 l-3 -6 M97 66 h6" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M156 122 v-34 M156 88 q-10 -2 -12 -14 M156 88 q10 -2 12 -14 M156 100 q-8 0 -10 -8" stroke="#2E7D32"/>' +
'<circle cx="168" cy="98" r="5" stroke="#F9A825"/>' +
'</svg>',

puzzle_solo:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="70" cy="56" r="11"/>' +
'<path d="M70 67 q-4 22 4 34 l-6 30 M74 101 l12 28"/>' +
'<path d="M70 78 L104 88"/>' +
'<rect x="104" y="80" width="20" height="20" rx="3" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M124 86 q8 -2 8 4 t-8 4" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<rect x="136" y="80" width="20" height="20" rx="3" stroke="#1565C0"/>' +
'<path d="M136 86 q-8 -2 -8 4 t8 4" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M88 34 q4 -8 12 -6" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="104" cy="26" r="2.5" fill="#F9A825" stroke="none"/>' +
'<path d="M40 130 h120" stroke-width="2.5"/>' +
'</svg>',

make_alone:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="36" y="104" width="128" height="12" rx="3"/>' +
'<path d="M48 116 v18 M152 116 v18"/>' +
'<circle cx="80" cy="46" r="11"/>' +
'<path d="M80 57 v46"/>' +
'<path d="M80 70 L112 78"/>' +
'<path d="M112 78 L124 62" stroke="#1565C0" stroke-width="4"/>' +
'<rect x="118" y="52" width="16" height="10" rx="2" fill="#1565C0" stroke="#0B1F3A"/>' +
'<rect x="104" y="92" width="26" height="12" rx="3" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M142 84 l3 -6 M150 88 l5 -4" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

animal_love:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="60" cy="44" r="11"/>' +
'<path d="M60 55 v48 M60 103 l-12 28 M60 103 l12 28"/>' +
'<path d="M60 68 L104 78"/>' +
'<rect x="100" y="78" width="56" height="30" rx="14"/>' +
'<circle cx="160" cy="82" r="11"/>' +
'<path d="M154 72 l-3 -9 M166 72 l3 -9"/>' +
'<circle cx="158" cy="80" r="2" fill="#0B1F3A" stroke="none"/>' +
'<path d="M108 108 v20 M124 108 v20 M140 108 v20 M150 108 v20"/>' +
'<path d="M96 56 q4 -8 10 -4 q6 -6 10 2 q-2 10 -10 12 q-8 -2 -10 -10 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'</svg>',

note_100:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="48" y="56" width="104" height="52" rx="6" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<circle cx="100" cy="82" r="17" stroke="#2E7D32"/>' +
'<path d="M94 74 h12 M94 80 h12 M96 74 q8 0 8 7 q0 7 -8 7 l10 8" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M56 64 v8 M144 100 v-8" stroke-width="2"/>' +
'<circle cx="160" cy="120 " r="9" stroke="#F9A825"/>' +
'<circle cx="176" cy="128" r="7" stroke="#F9A825"/>' +
'<path d="M40 120 q18 14 44 10" />' +
'<path d="M62 112 v14" stroke="#1565C0"/>' +
'</svg>',

soap_make:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="44" y="96" width="52" height="24" rx="8"/>' +
'<rect x="60" y="80" width="52" height="24" rx="8" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<path d="M70 92 h32" stroke-width="2" stroke-dasharray="4 4"/>' +
'<path d="M132 110 q-4 -14 10 -18 q2 -12 16 -8" stroke="#2E7D32"/>' +
'<circle cx="130" cy="60" r="6" stroke="#F9A825"/>' +
'<circle cx="146" cy="46" r="8" stroke="#F9A825"/>' +
'<circle cx="120" cy="42" r="5" stroke="#F9A825"/>' +
'<path d="M36 130 h128" stroke-width="2.5"/>' +
'</svg>',

robot_toy:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="70" y="60" width="60" height="50" rx="10"/>' +
'<rect x="82" y="34" width="36" height="26" rx="8"/>' +
'<circle cx="93" cy="46" r="3" fill="#1565C0" stroke="none"/><circle cx="107" cy="46" r="3" fill="#1565C0" stroke="none"/>' +
'<path d="M96 53 q4 3 8 0" stroke-width="2"/>' +
'<path d="M100 34 v-8" /><circle cx="100" cy="22" r="4" stroke="#F9A825"/>' +
'<rect x="82" y="72" width="14" height="10" rx="2" fill="#F9A825" stroke="#0B1F3A"/>' +
'<circle cx="116" cy="78" r="6" stroke="#2E7D32"/>' +
'<circle cx="82" cy="118" r="8"/><circle cx="118" cy="118" r="8"/>' +
'<path d="M140 96 q10 -4 12 -12 M146 108 q12 -4 15 -14" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

world_map:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="100" cy="80" r="52"/>' +
'<ellipse cx="100" cy="80" rx="24" ry="52" stroke-width="2"/>' +
'<path d="M50 62 h100 M48 80 h104 M50 98 h100" stroke-width="2"/>' +
'<path d="M70 56 q14 -6 20 4 q-4 12 -18 10 q-8 -6 -2 -14 z" fill="#2E7D32" stroke="none"/>' +
'<path d="M110 90 q12 -4 16 6 q-6 10 -16 6 q-4 -6 0 -12 z" fill="#2E7D32" stroke="none"/>' +
'<circle cx="128" cy="60" r="4" fill="#F9A825" stroke="none"/>' +
'<path d="M148 36 l6 -6 M152 46 l8 -3" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

puja_thali:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="100" cy="104" rx="56" ry="18"/>' +
'<ellipse cx="100" cy="100" rx="56" ry="18"/>' +
'<path d="M92 92 q8 -8 16 0 q-2 8 -8 8 q-6 0 -8 -8 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<path d="M100 84 q-3 -6 0 -10 q3 4 0 10" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<circle cx="70" cy="98" r="5" stroke="#2E7D32"/><circle cx="130" cy="98" r="5" stroke="#2E7D32"/>' +
'<path d="M142 78 q6 -14 -2 -26 M150 82 q8 -12 2 -26" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M52 74 q-4 -10 4 -16" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

judge_friends:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="100" cy="42" r="11"/>' +
'<path d="M109 48 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M100 53 v46 M100 99 l-12 28 M100 99 l12 28"/>' +
'<path d="M100 66 L70 74 M100 66 L130 74"/>' +
'<path d="M62 74 h16 M120 74 h16" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="44" cy="66" r="9"/><path d="M44 75 v30"/>' +
'<circle cx="156" cy="66" r="9"/><path d="M156 75 v30"/>' +
'<path d="M40 46 q4 -8 10 -2 M150 46 q6 -6 10 0" stroke="#1565C0" stroke-width="2"/>' +
'</svg>',

write_story:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M36 50 h58 q6 0 6 6 v64 q0 6 -6 6 h-58 q-6 0 -6 -6 v-64 q0 -6 6 -6 z"/>' +
'<path d="M100 56 q6 -6 12 -6 h48 q6 0 6 6 v64 q0 6 -6 6 h-48 q-12 0 -12 -6"/>' +
'<path d="M100 50 v76" stroke-width="2.5"/>' +
'<path d="M44 66 h40 M44 78 h34 M44 90 h40 M44 102 h26" stroke="#1565C0" stroke-width="2.5"/>' +
'<circle cx="132" cy="76" r="10" stroke="#F9A825"/>' +
'<path d="M132 62 v-5 M132 90 v5 M118 76 h-5 M146 76 h5" stroke="#F9A825" stroke-width="2"/>' +
'<path d="M170 34 L148 62" stroke="#2E7D32" stroke-width="4"/>' +
'<path d="M148 62 l-2 7 l7 -3" fill="#2E7D32" stroke="#2E7D32" stroke-width="2"/>' +
'</svg>',

fever_check:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="70" cy="78" r="16"/>' +
'<path d="M64 74 h4 M74 74 h4" stroke-width="2.5"/>' +
'<path d="M64 86 q6 4 12 0" stroke-width="2"/>' +
'<path d="M70 94 v34"/>' +
'<rect x="100" y="70" width="64" height="14" rx="7"/>' +
'<path d="M108 70 v14 M100 77 h-8" stroke-width="2"/>' +
'<path d="M112 77 h44" stroke="#F9A825" stroke-width="4"/>' +
'<path d="M118 54 q3 -6 0 -10 M128 54 q3 -6 0 -10" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

herb_leaf:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M70 128 v-56 M70 84 q-14 -4 -18 -20 q16 -2 18 14 M70 72 q14 -4 18 -20 q-16 -2 -18 14 M70 104 q-12 -2 -16 -16 q14 0 16 10" stroke="#2E7D32"/>' +
'<path d="M120 108 q0 -14 16 -14 q16 0 16 14 z"/>' +
'<path d="M116 108 h44 l-6 20 h-32 z"/>' +
'<path d="M152 84 L138 100" stroke="#F9A825" stroke-width="4"/>' +
'<path d="M40 132 h124" stroke-width="2.5"/>' +
'</svg>',

med_shop:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="34" y="94" width="132" height="12" rx="3"/>' +
'<path d="M40 106 v24 M160 106 v24"/>' +
'<path d="M34 48 h132" stroke-width="2.5"/>' +
'<rect x="88" y="24" width="24" height="24" rx="4" stroke="#2E7D32"/>' +
'<path d="M100 30 v12 M94 36 h12" stroke="#2E7D32" stroke-width="3"/>' +
'<rect x="48" y="60" width="20" height="26" rx="3" stroke="#1565C0"/>' +
'<rect x="76" y="64" width="26" height="14" rx="3" stroke="#F9A825"/>' +
'<circle cx="82" cy="71" r="2" fill="#F9A825" stroke="none"/><circle cx="90" cy="71" r="2" fill="#F9A825" stroke="none"/><circle cx="98" cy="71" r="2" fill="#F9A825" stroke="none"/>' +
'<rect x="112" y="58" width="18" height="28" rx="5" stroke="#1565C0"/>' +
'</svg>',

exercise_coach:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="70" cy="42" r="11"/>' +
'<path d="M79 48 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M70 53 v46 M70 68 L48 46 M70 68 L92 46 M70 99 l-12 30 M70 99 l12 30"/>' +
'<circle cx="140" cy="56" r="9"/>' +
'<path d="M140 65 v38 M140 76 L124 60 M140 76 L156 60 M140 103 l-10 26 M140 103 l10 26"/>' +
'<path d="M96 34 q6 -2 8 4" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="108" cy="40" r="4" stroke="#F9A825"/>' +
'<path d="M30 132 h140" stroke-width="2.5"/>' +
'</svg>',

tractor_plough:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="62" cy="112" r="20"/><circle cx="62" cy="112" r="7" stroke-width="2"/>' +
'<circle cx="130" cy="120" r="12"/>' +
'<path d="M62 92 h56 v28"/>' +
'<rect x="78" y="60" width="34" height="32" rx="5" fill="#F9A825" stroke="#0B1F3A"/>' +
'<rect x="86" y="66" width="16" height="12" rx="3" fill="#F5F7FA" stroke="#0B1F3A"/>' +
'<path d="M112 66 h10 v26" />' +
'<path d="M142 120 L162 132 M150 114 L168 124" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M28 136 h150" stroke-width="2.5"/>' +
'<path d="M150 140 q8 -4 16 0 M130 142 q8 -4 16 0" stroke="#2E7D32" stroke-width="2"/>' +
'</svg>',

pipe_irrigation:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M28 70 h120 q10 0 10 10 v10" stroke-width="4"/>' +
'<path d="M60 74 q0 12 -4 18 M96 74 q0 12 -4 18 M132 74 q0 12 -4 18" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M64 74 q4 12 10 16 M100 74 q4 12 10 16 M136 74 q4 12 10 16" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M56 128 v-14 M56 114 q-8 -2 -10 -10 M56 114 q8 -2 10 -10" stroke="#2E7D32"/>' +
'<path d="M92 128 v-14 M92 114 q-8 -2 -10 -10 M92 114 q8 -2 10 -10" stroke="#2E7D32"/>' +
'<path d="M128 128 v-14 M128 114 q-8 -2 -10 -10 M128 114 q8 -2 10 -10" stroke="#2E7D32"/>' +
'<path d="M28 132 h148" stroke-width="2.5"/>' +
'</svg>',

flower_sell:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M48 100 h28 l-4 28 h-20 z"/>' +
'<path d="M62 100 v-16" stroke="#2E7D32"/>' +
'<circle cx="62" cy="76" r="8" stroke="#F9A825"/>' +
'<circle cx="62" cy="76" r="3" fill="#F9A825" stroke="none"/>' +
'<path d="M104 100 h28 l-4 28 h-20 z"/>' +
'<path d="M118 100 v-14" stroke="#2E7D32"/>' +
'<circle cx="118" cy="78" r="8" stroke="#1565C0"/>' +
'<circle cx="118" cy="78" r="3" fill="#1565C0" stroke="none"/>' +
'<circle cx="162" cy="118" r="9" stroke="#F9A825"/>' +
'<path d="M158 118 h8 M162 114 v8" stroke="#F9A825" stroke-width="2"/>' +
'<path d="M36 132 h132" stroke-width="2.5"/>' +
'</svg>',

bee_box:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="56" y="72" width="72" height="48" rx="4"/>' +
'<path d="M48 72 h88 l-8 -14 h-72 z"/>' +
'<path d="M84 108 h16" stroke-width="4"/>' +
'<path d="M62 128 v8 M122 128 v8"/>' +
'<circle cx="150" cy="52" r="6" stroke="#F9A825"/>' +
'<path d="M147 49 l6 6 M147 55 l6 -6" stroke="#F9A825" stroke-width="1.5"/>' +
'<path d="M144 44 q-3 -4 -7 -3 M156 44 q3 -4 7 -3" stroke="#0B1F3A" stroke-width="2"/>' +
'<circle cx="164" cy="76" r="5" stroke="#F9A825"/>' +
'<path d="M40 96 q-6 8 0 14" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M40 132 h124" stroke-width="2.5"/>' +
'</svg>',

lock_key:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="56" y="72" width="60" height="52" rx="10"/>' +
'<path d="M68 72 v-14 q0 -18 18 -18 q18 0 18 18 v14" stroke-width="3.5"/>' +
'<circle cx="86" cy="94" r="7" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M86 101 v10" stroke-width="2.5"/>' +
'<circle cx="148" cy="86" r="10" stroke="#1565C0"/>' +
'<path d="M148 96 v28 M148 112 h10 M148 122 h8" stroke="#1565C0"/>' +
'</svg>',

cycle_fix:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="56" cy="112" r="20"/><circle cx="144" cy="112" r="20"/>' +
'<path d="M56 112 L84 82 L118 82 L144 112 M84 82 L100 112 L56 112"/>' +
'<path d="M84 82 L78 68 h-10 M118 82 L124 70 h12"/>' +
'<circle cx="30" cy="60 " r="9"/>' +
'<path d="M30 69 q4 16 20 20" />' +
'<path d="M56 96 L44 84" stroke="#1565C0" stroke-width="4"/>' +
'<circle cx="41" cy="81" r="5" stroke="#1565C0"/>' +
'</svg>',

shoe_stitch:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M44 108 q0 -22 22 -22 q10 0 16 8 q8 10 24 12 q26 2 26 14 q0 8 -10 8 h-70 q-8 0 -8 -8 z"/>' +
'<path d="M52 128 h76" stroke-width="2.5"/>' +
'<path d="M60 96 l6 6 M72 92 l6 6 M84 92 l6 6" stroke="#F9A825" stroke-width="2"/>' +
'<path d="M148 56 L118 84" stroke-width="2.5"/>' +
'<path d="M148 56 q12 16 -2 34" stroke="#1565C0" stroke-width="2" stroke-dasharray="5 5"/>' +
'</svg>',

weld_spark:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M52 44 h32 v30 q0 10 -10 10 h-12 q-10 0 -10 -10 z"/>' +
'<rect x="58" y="58" width="20" height="8" rx="3" fill="#1565C0" stroke="#0B1F3A"/>' +
'<path d="M68 84 v22 M68 92 L100 104"/>' +
'<path d="M100 104 L116 112" stroke="#1565C0" stroke-width="4"/>' +
'<rect x="108" y="118" width="56" height="10" rx="3"/>' +
'<path d="M120 112 l-4 -8 M126 110 l0 -9 M132 112 l4 -8" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M40 132 h130" stroke-width="2.5"/>' +
'</svg>',

camera_click:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="48" y="60" width="104" height="64" rx="10"/>' +
'<path d="M80 60 l6 -12 h28 l6 12" />' +
'<circle cx="100" cy="92" r="20"/>' +
'<circle cx="100" cy="92" r="10" stroke="#1565C0"/>' +
'<rect x="132" y="68" width="10" height="8" rx="2" fill="#F9A825" stroke="none"/>' +
'<path d="M164 48 l8 -8 M168 62 l10 -4 M158 40 l4 -10" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

video_edit:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="44" y="44" width="112" height="68" rx="10"/>' +
'<path d="M92 66 l24 12 l-24 12 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M44 124 h112" stroke-width="2.5"/>' +
'<rect x="52" y="118" width="20" height="12" rx="2" stroke="#1565C0"/>' +
'<rect x="80" y="118" width="20" height="12" rx="2" stroke="#1565C0"/>' +
'<rect x="108" y="118" width="20" height="12" rx="2" stroke="#1565C0"/>' +
'<circle cx="146" cy="124" r="6" stroke="#2E7D32"/>' +
'<path d="M150 128 l8 8" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

type_computer:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="56" y="34" width="88" height="56" rx="6"/>' +
'<path d="M66 48 h48 M66 60 h60 M66 72 h36" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M44 118 L60 90 h80 l16 28 z"/>' +
'<path d="M64 100 h72 M60 108 h80" stroke-width="2"/>' +
'<path d="M92 124 q8 6 16 0" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

game_rules:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M56 76 q-2 -18 18 -18 h52 q20 0 18 18 l4 28 q1 12 -10 12 q-8 0 -14 -10 l-4 -6 h-40 l-4 6 q-6 10 -14 10 q-11 0 -10 -12 z"/>' +
'<path d="M78 76 v16 M70 84 h16" stroke-width="2.5"/>' +
'<circle cx="122" cy="78" r="4" stroke="#F9A825"/>' +
'<circle cx="134" cy="88" r="4" stroke="#2E7D32"/>' +
'<path d="M92 38 q8 -8 16 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M84 28 q16 -14 32 0" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

handpump_fix:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M84 128 v-64 h20 v64" />' +
'<path d="M84 64 q-2 -14 10 -14 q12 0 10 14" />' +
'<path d="M104 74 h24 q6 0 6 8 q0 6 -6 6 h-6" />' +
'<path d="M94 50 L94 34 L134 26" stroke-width="3.5"/>' +
'<path d="M122 88 q0 10 -4 16" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M108 118 q14 8 30 2" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M52 100 L70 112" stroke="#F9A825" stroke-width="4"/>' +
'<circle cx="48" cy="97" r="5" stroke="#F9A825"/>' +
'<path d="M60 132 h84" stroke-width="2.5"/>' +
'</svg>',

solar_panel:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M48 96 L84 48 h72 L120 96 z"/>' +
'<path d="M66 72 h72 M96 48 L84 96 M120 48 L108 96" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M84 96 v32 M120 96 v32 M70 128 h68" />' +
'<circle cx="164" cy="36" r="11" stroke="#F9A825"/>' +
'<path d="M164 20 v-5 M164 52 v5 M148 36 h-5 M180 36 h5" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M48 116 q-10 4 -8 14" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

tank_measure:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="56" y="44" width="72" height="56" rx="10"/>' +
'<ellipse cx="92" cy="44" rx="36" ry="8"/>' +
'<path d="M64 84 q14 -8 28 0 q14 8 28 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M64 100 v32 M120 100 v32"/>' +
'<path d="M152 44 v88" stroke="#F9A825"/>' +
'<path d="M152 56 h8 M152 72 h6 M152 88 h8 M152 104 h6 M152 120 h8" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M44 132 h124" stroke-width="2.5"/>' +
'</svg>',

light_string:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M24 48 q76 34 152 0" stroke-width="2.5"/>' +
'<circle cx="52" cy="66" r="7" stroke="#F9A825"/><path d="M52 59 v-4" stroke-width="2"/>' +
'<circle cx="84" cy="76" r="7" stroke="#2E7D32"/><path d="M84 69 v-4" stroke-width="2"/>' +
'<circle cx="116" cy="76" r="7" stroke="#1565C0"/><path d="M116 69 v-4" stroke-width="2"/>' +
'<circle cx="148" cy="66" r="7" stroke="#F9A825"/><path d="M148 59 v-4" stroke-width="2"/>' +
'<path d="M176 48 v56 h-12 M164 96 v16" stroke-width="2.5"/>' +
'<path d="M44 108 q10 -10 22 -6" />' +
'<circle cx="38" cy="112" r="8"/>' +
'</svg>',

pickle_jar:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M56 60 h44 v10 q8 8 8 22 v28 q0 8 -8 8 h-44 q-8 0 -8 -8 v-28 q0 -14 8 -22 z"/>' +
'<path d="M52 54 h52" stroke-width="4"/>' +
'<circle cx="70" cy="100" r="5" stroke="#F9A825"/><circle cx="86" cy="92" r="5" stroke="#2E7D32"/><circle cx="80" cy="112" r="5" stroke="#F9A825"/>' +
'<ellipse cx="146" cy="116" rx="26" ry="8"/>' +
'<circle cx="146" cy="112" r="14" stroke="#F9A825" stroke-width="2"/>' +
'<circle cx="160" cy="44" r="11" stroke="#F9A825"/>' +
'<path d="M160 28 v-4 M160 60 v4 M144 44 h-4 M176 44 h4" stroke="#F9A825" stroke-width="2.5"/>' +
'</svg>',

sweet_make:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M44 92 q0 26 30 26 h20 q30 0 30 -26 z"/>' +
'<path d="M36 92 h12 M116 92 h12" stroke-width="2.5"/>' +
'<circle cx="74" cy="82" r="8" stroke="#F9A825"/><circle cx="94" cy="82" r="8" stroke="#F9A825"/><circle cx="84" cy="70" r="8" stroke="#F9A825"/>' +
'<path d="M80 54 q-4 -8 2 -14 M94 54 q-4 -8 2 -14" stroke="#F9A825" stroke-width="2.5"/>' +
'<ellipse cx="152" cy="120 " rx="24" ry="7"/>' +
'<circle cx="144" cy="112" r="6" stroke="#2E7D32"/><circle cx="160" cy="112" r="6" stroke="#2E7D32"/>' +
'<path d="M36 132 h132" stroke-width="2.5"/>' +
'</svg>',

agarbatti:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M72 128 L84 56 M84 128 L92 56 M96 128 L100 56" stroke-width="2.5"/>' +
'<circle cx="84" cy="52" r="3" fill="#F9A825" stroke="none"/><circle cx="92" cy="52" r="3" fill="#F9A825" stroke="none"/><circle cx="100" cy="52" r="3" fill="#F9A825" stroke="none"/>' +
'<path d="M88 42 q-6 -10 2 -18 M98 42 q-6 -12 3 -22" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M60 128 h56" stroke-width="3.5"/>' +
'<rect x="132" y="84" width="36" height="44" rx="4"/>' +
'<path d="M138 96 h24 M138 106 h24 M138 116 h18" stroke="#2E7D32" stroke-width="2"/>' +
'<path d="M48 132 h124" stroke-width="2.5"/>' +
'</svg>',

pack_weigh:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="52" y="104" width="64" height="18" rx="4"/>' +
'<path d="M56 104 h56" stroke-width="2"/>' +
'<rect x="82" y="112" width="16" height="6" rx="2" fill="#F9A825" stroke="none"/>' +
'<rect x="62" y="72" width="30" height="32" rx="4" stroke="#2E7D32"/>' +
'<path d="M62 84 h30" stroke="#2E7D32" stroke-width="2"/>' +
'<rect x="132" y="76" width="36" height="46" rx="4"/>' +
'<path d="M132 92 h36 M150 76 v16" stroke-width="2"/>' +
'<path d="M144 66 q6 -8 12 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M40 128 h132" stroke-width="2.5"/>' +
'</svg>',

coin_stamp:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="40" y="40" width="120" height="84" rx="6"/>' +
'<circle cx="70" cy="72" r="13" stroke="#F9A825"/>' +
'<circle cx="70" cy="72" r="8" stroke="#F9A825" stroke-width="1.5"/>' +
'<circle cx="104" cy="72" r="13" stroke="#F9A825"/>' +
'<rect x="128" y="58" width="22" height="28" stroke="#1565C0" stroke-dasharray="3 3"/>' +
'<path d="M132 66 h14 M132 74 h14" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M52 102 h60" stroke-width="2" stroke-dasharray="5 4"/>' +
'<path d="M124 102 h24" stroke-width="2" stroke-dasharray="5 4"/>' +
'</svg>',

world_food:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<ellipse cx="92" cy="100" rx="48" ry="16"/>' +
'<ellipse cx="92" cy="96" rx="48" ry="16"/>' +
'<path d="M68 94 q10 -8 20 0 M92 98 q10 -8 20 0" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M120 68 L104 92 M132 72 L112 94" stroke-width="2.5"/>' +
'<path d="M80 72 q-3 -8 2 -14 M96 72 q-3 -8 2 -14" stroke="#1565C0" stroke-width="2.5"/>' +
'<circle cx="156" cy="52 " r="16" stroke="#2E7D32"/>' +
'<ellipse cx="156" cy="52" rx="7" ry="16" stroke="#2E7D32" stroke-width="1.5"/>' +
'<path d="M141 52 h30" stroke="#2E7D32" stroke-width="1.5"/>' +
'</svg>',

learn_lang:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M36 44 h64 q8 0 8 8 v32 q0 8 -8 8 h-40 l-12 14 v-14 h-12 q-8 0 -8 -8 v-32 q0 -8 8 -8 z"/>' +
'<text x="64" y="80" font-size="30" fill="#1565C0" stroke="none" text-anchor="middle" font-family="Noto Sans Devanagari, sans-serif">क</text>' +
'<path d="M100 92 h64 q8 0 8 8 v28 q0 8 -8 8 h-8 v12 l-12 -12 h-44 q-8 0 -8 -8 v-28 q0 -8 8 -8 z"/>' +
'<text x="134" y="122" font-size="26" fill="#F9A825" stroke="none" text-anchor="middle" font-family="Inter, sans-serif">A</text>' +
'<path d="M96 58 q10 -6 18 2" stroke="#2E7D32" stroke-width="2.5"/>' +
'</svg>',

elder_help:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="76" cy="44" r="10"/>' +
'<path d="M76 54 v46 M76 100 l-12 30 M76 100 l12 30 M76 66 L106 74"/>' +
'<circle cx="122" cy="52" r="10"/>' +
'<path d="M122 62 q-4 20 0 40 M122 102 l-8 28 M122 102 l10 28"/>' +
'<path d="M122 76 L142 84 M142 84 v46" stroke-width="2.5"/>' +
'<path d="M106 74 L116 70" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M40 132 h130" stroke-width="2.5"/>' +
'</svg>',

show_way:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="72" cy="46" r="11"/>' +
'<path d="M81 52 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M72 57 v44 M72 101 l-12 30 M72 101 l12 30"/>' +
'<path d="M72 70 L112 58"/>' +
'<path d="M112 58 L122 55" stroke="#F9A825" stroke-width="3"/>' +
'<path d="M148 128 v-76"/>' +
'<path d="M148 58 h30 l8 8 l-8 8 h-30 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<path d="M148 84 h-24 l-8 8 l8 8 h24 z" fill="#1565C0" stroke="#0B1F3A"/>' +
'<path d="M40 132 h140" stroke-width="2.5"/>' +
'</svg>',

queue_line:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="150" cy="48" r="11"/>' +
'<path d="M159 54 q9 8 7 20" stroke="#0B1F3A"/>' +
'<path d="M150 59 v44 M150 76 L122 64 M150 103 l-10 28 M150 103 l10 28"/>' +
'<circle cx="94" cy="64" r="9"/><path d="M94 73 v34 M94 107 l-8 22 M94 107 l8 22"/>' +
'<circle cx="62" cy="70" r="8"/><path d="M62 78 v30 M62 108 l-7 20 M62 108 l7 20"/>' +
'<circle cx="36" cy="74" r="7"/><path d="M36 81 v28 M36 109 l-6 18 M36 109 l6 18"/>' +
'<path d="M28 134 h150" stroke-width="2.5"/>' +
'</svg>',

paint_toy:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="48" y="86" width="46" height="24" rx="8"/>' +
'<path d="M94 86 q10 -2 8 -14 q-8 0 -12 8"/>' +
'<circle cx="60" cy="118" r="7"/><circle cx="84" cy="118" r="7"/>' +
'<path d="M60 92 h20" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M148 44 L106 84" stroke="#1565C0" stroke-width="3.5"/>' +
'<path d="M106 84 q-6 2 -8 8 q6 0 10 -4" fill="#1565C0" stroke="#1565C0" stroke-width="2"/>' +
'<ellipse cx="150" cy="112" rx="24" ry="14"/>' +
'<circle cx="142" cy="108" r="4" fill="#F9A825" stroke="none"/><circle cx="154" cy="106" r="4" fill="#2E7D32" stroke="none"/><circle cx="160" cy="116" r="4" fill="#1565C0" stroke="none"/>' +
'</svg>',

temple_seva:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M64 128 v-44 h48 v44"/>' +
'<path d="M56 84 h64 M60 84 L88 52 L116 84"/>' +
'<path d="M88 52 v-16 l14 5 l-14 5" stroke="#F9A825"/>' +
'<path d="M80 128 v-20 h16 v20" stroke-width="2.5"/>' +
'<circle cx="146" cy="72" r="9"/>' +
'<path d="M154 78 q7 7 5 16" stroke="#0B1F3A"/>' +
'<path d="M146 81 v34 M146 92 L166 104"/>' +
'<path d="M166 104 L172 122" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M166 122 q8 4 12 2" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M44 130 h132" stroke-width="2.5"/>' +
'</svg>',

ground_prep:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M32 128 h140" stroke-width="2.5"/>' +
'<path d="M48 128 L96 78 M152 128 L112 84" stroke="#F5F7FA" stroke-width="0"/>' +
'<path d="M44 124 h120" stroke="#F9A825" stroke-width="2.5" stroke-dasharray="8 6"/>' +
'<path d="M52 124 v-44 l14 5 l-14 5" stroke="#2E7D32"/>' +
'<path d="M156 124 v-44 l14 5 l-14 5" stroke="#2E7D32"/>' +
'<circle cx="104" cy="56" r="10"/>' +
'<path d="M104 66 v34 M104 78 L84 92 M104 78 L124 92 M104 100 l-10 24 M104 100 l10 24"/>' +
'<path d="M84 92 L76 110" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

idea_machine:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="70" cy="60" r="22" stroke="#F9A825"/>' +
'<path d="M62 82 h16 v10 h-16 z M66 92 h8" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M70 26 v-8 M46 40 l-6 -6 M94 40 l6 -6" stroke="#F9A825" stroke-width="2.5"/>' +
'<circle cx="140" cy="84" r="14"/>' +
'<path d="M140 66 v-6 M140 102 v6 M122 84 h-6 M158 84 h6 M128 72 l-5 -5 M152 72 l5 -5 M128 96 l-5 5 M152 96 l5 5" stroke-width="2.5"/>' +
'<circle cx="140" cy="84" r="5" stroke="#1565C0"/>' +
'<path d="M96 66 q16 2 26 10" stroke="#2E7D32" stroke-width="2.5" stroke-dasharray="4 4"/>' +
'</svg>',

godown_stack:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="44" y="96" width="34" height="32"/><rect x="82" y="96" width="34" height="32"/>' +
'<rect x="62" y="62" width="34" height="34"/>' +
'<path d="M62 74 h34 M79 62 v12" stroke-width="2"/>' +
'<rect x="132" y="64" width="34" height="46" rx="4" stroke="#1565C0"/>' +
'<path d="M138 76 h22 M138 86 h22 M138 96 h16" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M138 76 l3 3 l5 -6" stroke="#2E7D32" stroke-width="2"/>' +
'<path d="M36 132 h136" stroke-width="2.5"/>' +
'</svg>',

tree_plant:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M64 132 q-10 -6 -8 -16 h40 q2 10 -8 16"/>' +
'<path d="M76 116 v-26" stroke="#2E7D32"/>' +
'<path d="M76 96 q-12 -2 -16 -16 q14 0 16 10 M76 90 q12 -2 16 -16 q-14 0 -16 10" stroke="#2E7D32"/>' +
'<path d="M132 72 h28 l-6 22 h-16 z" stroke="#1565C0"/>' +
'<path d="M132 76 q-10 -2 -14 6" stroke="#1565C0"/>' +
'<path d="M124 90 q-3 6 -1 10 M116 88 q-3 6 -1 10" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M148 64 v-8 M160 72 l6 -6" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M40 132 h132" stroke-width="2.5"/>' +
'</svg>',

waste_sort:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M44 76 h44 l-6 52 h-32 z" stroke="#2E7D32"/>' +
'<path d="M40 70 h52" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M58 92 q4 -8 12 -4" stroke="#2E7D32" stroke-width="2"/>' +
'<path d="M112 76 h44 l-6 52 h-32 z" stroke="#1565C0"/>' +
'<path d="M108 70 h52" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M126 96 h16 M134 88 v16" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M96 44 q4 -10 12 -6" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M92 52 L74 70 M108 46 L126 66" stroke-width="2" stroke-dasharray="4 4"/>' +
'</svg>',

flood_road:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M28 112 q14 10 28 0 q14 -10 28 0 q14 10 28 0 q14 -10 28 0 q14 10 28 0" stroke="#1565C0"/>' +
'<path d="M32 124 q14 10 28 0 q14 -10 28 0 q14 10 28 0 q14 -10 28 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M48 92 L72 68 L96 92 M56 92 v14 M88 92 v14"/>' +
'<path d="M132 96 h36 v-10 l10 10" stroke-width="2.5"/>' +
'<circle cx="150" cy="66" r="9"/>' +
'<path d="M150 75 v20 M150 82 l-10 8 M150 82 l10 8"/>' +
'<path d="M116 44 q4 8 0 14 M132 40 q4 8 0 14" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

school_stall:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="52" y="96" width="96" height="12" rx="3"/>' +
'<path d="M58 108 v22 M142 108 v22"/>' +
'<path d="M48 44 h104 l-8 16 h-88 z" fill="#F9A825" stroke="#0B1F3A"/>' +
'<rect x="72" y="80" width="16" height="16" rx="3" stroke="#2E7D32"/>' +
'<circle cx="112" cy="88" r="8" stroke="#1565C0"/>' +
'<circle cx="40" cy="76" r="8"/><path d="M40 84 v22"/>' +
'<circle cx="162" cy="76" r="8"/><path d="M168 81 q6 6 5 14" stroke="#0B1F3A"/><path d="M162 84 v22"/>' +
'<path d="M32 130 h140" stroke-width="2.5"/>' +
'</svg>',

phone_dead:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="72" y="26" width="56" height="100" rx="10"/>' +
'<path d="M92 34 h16" stroke-width="2.5"/>' +
'<rect x="86" y="60" width="28" height="16" rx="3"/>' +
'<path d="M114 65 h5 v6 h-5" stroke-width="2"/>' +
'<path d="M90 64 v8" stroke="#F9A825" stroke-width="3"/>' +
'<path d="M96 92 q4 -8 8 0 q-4 2 -8 0 z" stroke-width="0"/>' +
'<path d="M100 88 v10 M100 104 v2" stroke="#F9A825" stroke-width="3"/>' +
'<path d="M144 48 q10 2 12 12 M148 68 q8 4 8 12" stroke="#1565C0" stroke-width="2" stroke-dasharray="3 4"/>' +
'</svg>',

toy_boat:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M52 96 h96 l-16 24 h-64 z"/>' +
'<path d="M100 96 v-40 M100 56 h30 l-30 22" stroke-width="2.5"/>' +
'<path d="M100 62 L128 60 L100 76 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="2"/>' +
'<rect x="140" y="100" width="12" height="10" rx="3" fill="#1565C0" stroke="#0B1F3A"/>' +
'<circle cx="160" cy="112" r="3" stroke="#1565C0"/><circle cx="168" cy="106" r="4" stroke="#1565C0"/>' +
'<path d="M32 128 q14 8 28 0 q14 -8 28 0 q14 8 28 0 q14 -8 28 0 q14 8 28 0" stroke="#1565C0"/>' +
'</svg>',

pani_khoj:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="84" cy="40" r="10"/>' +
'<path d="M84 50 v40 M84 90 l-12 28 M84 90 l12 28"/>' +
'<path d="M84 62 L108 70 M84 62 L60 70"/>' +
'<path d="M108 70 L128 84 M60 70 L128 84" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M128 84 v18" stroke="#F9A825" stroke-width="2.5" stroke-dasharray="4 4"/>' +
'<path d="M36 120 h132" stroke-width="2.5" stroke-dasharray="8 6"/>' +
'<path d="M108 134 q10 8 20 0 q10 -8 20 0" stroke="#1565C0" stroke-width="2.5"/>' +
'<path d="M116 144 q10 8 20 0" stroke="#1565C0" stroke-width="2.5"/>' +
'</svg>',

chitthi_daftar:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<rect x="30" y="64" width="56" height="38" rx="4"/>' +
'<path d="M30 66 L58 88 L86 66" stroke-width="2.5"/>' +
'<path d="M96 82 h24" stroke="#F9A825" stroke-width="2.5"/>' +
'<path d="M114 76 l8 6 l-8 6" stroke="#F9A825" stroke-width="2.5"/>' +
'<rect x="128" y="56" width="44" height="72" rx="3"/>' +
'<path d="M136 68 h10 M154 68 h10 M136 84 h10 M154 84 h10 M136 100 h10 M154 100 h10" stroke="#1565C0" stroke-width="2"/>' +
'<path d="M146 56 v-16 l12 4 l-12 4" stroke="#2E7D32"/>' +
'<path d="M144 128 v-14 h12 v14" stroke-width="2.5"/>' +
'<path d="M24 130 h152" stroke-width="2.5"/>' +
'</svg>',

aag_bujhana:
'<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#0B1F3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
'<circle cx="64" cy="46" r="10"/>' +
'<path d="M64 56 v40 M64 96 l-12 30 M64 96 l12 30 M64 68 L92 76"/>' +
'<rect x="88" y="70" width="12" height="22" rx="4" stroke="#2E7D32"/>' +
'<path d="M100 76 L118 82" stroke="#2E7D32" stroke-width="2.5"/>' +
'<path d="M120 84 q10 -2 16 4 M122 92 q10 0 14 6" stroke="#1565C0" stroke-width="2.5" stroke-dasharray="3 4"/>' +
'<path d="M148 110 q-8 -10 0 -20 q3 6 8 8 q-2 -10 6 -16 q2 12 8 16 q6 5 2 12 q-4 8 -12 8 q-8 0 -12 -8 z" stroke="#F9A825"/>' +
'<path d="M40 132 h130" stroke-width="2.5"/>' +
'</svg>'

};
