/* ============================================================
   /assets/aptitude_art.js — v1.0 (पूर्ण: खेप-अ + खेप-ब)
   ACS Aptitude चित्र-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - चित्र-गिनती: 46 (खेप-अ 25 + खेप-ब 21) — खेप-1 के 24 प्रश्नों का पूरा भंडार
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
'</svg>'

};
