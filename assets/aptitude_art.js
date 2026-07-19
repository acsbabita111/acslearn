/* ============================================================
   /assets/aptitude_art.js — v0.1 (खेप-अ)
   ACS Aptitude चित्र-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - चित्र-गिनती (इस खेप में): 25  (कुल योजना: 46 — खेप-ब में 21 बाक़ी)
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
'</svg>'

};
