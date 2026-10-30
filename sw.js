/* sw.js — ACS service-worker (network-first HTML · cache-first असेट · offline.html)
   ⚠️ CSS/JS बदलें तो CACHE_VERSION ज़रूर बढ़ाएँ। पूरा version-इतिहास CHANGELOG-sw.md में (13-Sep ऑडिट H7: 133 KB → छोटा, हर version-जाँच पर हल्का download)। */
/* v724: 20-Oct लाल10-स खेप-1 — kkb Cyrillic-5 (ba sah bua tyv kjh) असली-content regen */
const CACHE_VERSION = 'v804'; // 29-Oct kkb (काम की भाषा) परीक्षा-संवाद असली लिपि में: 25 भाषाएँ, 581+60 पंक्तियाँ (कोर्स-मिलान 228 + लिखी 353 + मलागासी-बोलियाँ) — kkb_*_data cache-first
// पिछला 'v803'; 29-Oct kkb (काम की भाषा) सर्व-भाषा उच्चारण-सुधार: 134 भाषाएँ — दोहरी मात्रा 14,584 + स्वर-पर-हलंत 13,051 (आवाज़ बचाकर) — kkb data cache-first
// पिछला 'v802'; 29-Oct kkb (काम की भाषा) स्तर-क उच्चारण-सुधार: 9 भाषाओं में दोहरी मात्रा 973 + स्वर-पर-हलंत 53 (आवाज़ बचाकर) — kkb data cache-first
// पिछला 'v801'; 29-Oct kkb (काम की भाषा) उच्चारण-सुधार: शब्द-शुरुआत के "अ + मात्रा" (अा, अो…) 5,104 जगह सही स्वर (आ, ओ…) — 55 kkb data फ़ाइलें cache-first
// पिछला 'v800'; 29-Oct kkb (काम की भाषा) मलय स्तर-1: देवनागरी उच्चारण नियम-यंत्र से दोबारा + परीक्षा-संवाद रूमी लिपि में (kkb_ms_data cache-first)
// पिछला 'v799'; 29-Oct kkb (काम की भाषा) स्तर-ख सुधार: मलयालम + उड़िया स्तर-1 पुनर्लेखन (kkb_ml_data, kkb_or_data — cache-first) + दोनों व्याकरण
// पिछला 'v798'; 29-Oct kkb (काम की भाषा) स्तर-ख: 7 भारतीय भाषाओं की पोथी (te bn as pa gu or ml) + 5 व्याकरण (te pa gu bn as) — v797 के स्तर-क लिपि-परिचय समेत
// पिछला 'v797'; 29-Oct kkb (काम की भाषा) स्तर-क लिपि-परिचय: अरबी, ख़ाड़ी-अरबी, हिब्रू, जापानी काना, कोरियाई हंगुल, चीनी — lipi.css (अक्षर-रूप तालिका, दिशा) cache-first असेट
// पिछला 'v796'; 29-Oct kkb (काम की भाषा) आवाज़-ईमानदारी भाग-2: साझा acs-awaz.js — चित्र-पुस्तक, व्याकरण, लिपि-परिचय, बोलो-वर्कबुक, शब्दकोश (lipi.js, bolo-wb.js) — cache-first असेट
// पिछला 'v795'; 29-Oct kkb (काम की भाषा) आवाज़-ईमानदारी: kkb2.js + kkb2.css — फ़ोन में भाषा की आवाज़ न हो तो देवनागरी उच्चारण हिंदी आवाज़ में + सूचना (Founder-पकड़: अरबी में 🔊 पर चुप्पी) — cache-first असेट
// पिछला 'v794'; 29-Oct kkb (काम की भाषा) स्तर-क: 11 भाषाओं की पोथी + व्याकरण, रोमन अक्षर-तालिका, रूसी लिपि-परिचय — chitra/vyakaran/bolo-wb css (दाएँ-से-बाएँ दिशा) cache-first असेट
// पिछला 'v793'; // 29-Oct स्तर-क: 11 भाषाओं की पोथी + व्याकरण, रोमन अक्षर-तालिका, रूसी लिपि-परिचय — chitra.css/vyakaran.css/bolo-wb.css (दाएँ-से-बाएँ दिशा) cache-first असेट // 29-Oct kkb 7-कदम राह: बोलो-वर्कबुक + शब्दकोश (416×2 नए पन्ने, bolo-wb.js/css) + पिछले सुनो-बोलो सुधार — नियम-11 bump
// पिछला 'v773'; // 27-Oct reaction-पट्टी 👍👎💬🔗 (course-lesson.js v1.5 + css) + SE025 50-दिन/t2 — उसी देय में समाहित
// पिछला 'v772'; // 27-Oct SE025: duration 50 दिन + t2 — उसी देय में समाहित
// पिछला 'v771'; // 27-Oct SE025 नाम → "पहला कोड: पायथन (First Code: Python)": courses_data.js + exam_data.js v1.9 — cache-first असेट
// पिछला 'v770'; // 26-Oct पहला कोड (SE025) परीक्षा-द्वार: dashboard.js v6.6.3 + exam_data.js (SE025 द्वार-प्रविष्टि)
// पिछला 'v769'; // 26-Oct pl-0 "पहला कोड" (218 पाठ): course-lesson.css v1.2 (pre.pl-code/pl-err/pl-sample डिब्बे) + courses_data.js में SE025 — cache-first असेट
// पिछला 'v768'; // 25-Oct ज्युला पूरा पुनर्लेखन (kkb_dyu_data.js + kkb2_dyu_data.js): 2,877 पाठ — cache-first data
// पिछला v767; // 25-Oct उत्तरी न्देबेले पूरा पुनर्लेखन (kkb_nd_data.js + kkb2_nd_data.js): 2,876 पाठ — cache-first data
// पिछला v766; // 25-Oct अल्जीरियाई अरबी पूरा पुनर्लेखन (kkb_arq_data.js + kkb2_arq_data.js): 2,876 पाठ असली अल्जीरियाई दारिजा में — cache-first data
// पिछला v765; // 25-Oct मोरक्कन अरबी पूरा पुनर्लेखन (kkb_ary_data.js + kkb2_ary_data.js): 2,876 पाठ असली मोरक्कन दारिजा में — cache-first data
// पिछला v764; // 25-Oct सईदी (ऊपरी मिस्र) अरबी पूरा पुनर्लेखन (kkb_aec_data.js + kkb2_aec_data.js): 2,843 पाठ असली सईदी बोली में — cache-first data
// पिछला v763; // 25-Oct सूडानी अरबी पूरा पुनर्लेखन (kkb_apd_data.js + kkb2_apd_data.js): 2,877 पाठ असली ख़ार्तूम बोली में — cache-first data
// पिछला v762; // 25-Oct हिजाज़ी अरबी पूरा पुनर्लेखन (kkb_acw_data.js + kkb2_acw_data.js): 2,877 पाठ असली जेद्दा-मक्का बोली में — cache-first data
// पिछला v761; // 25-Oct इराक़ी अरबी पूरा पुनर्लेखन (kkb_acm_data.js + kkb2_acm_data.js): 2,877 पाठ असली बग़दादी बोली में — cache-first data
// पिछला v760; // 25-Oct पुनर्लेखन खेप-2 (kkb_acm_data.js): इराक़ी अरबी स्तर-1 पूरा (500/500 + सप्ताह 1-5 परीक्षा) — cache-first data
// पिछला v759; // 25-Oct नक़ल-पुनर्लेखन खेप-1: इराक़ी अरबी (kkb_acm_data.js) स्तर-1 के 200 वाक्य असली बग़दादी बोली में — cache-first data
// पिछला v758; // 25-Oct "अंग्रेज़ी"-दोष खेप-5 (अंतिम): 22 भाषाओं के kkb/kkb2-data में अपना भाषा-नाम — क़र्ज़ शून्य — cache-first data
// पिछला v757; // 25-Oct "अंग्रेज़ी"-दोष खेप-4 (12 बड़ी भाषाएँ + आर्मेनियाई) — kkb/kkb2-data — cache-first data
// पिछला v756; // 25-Oct "अंग्रेज़ी"-दोष खेप-3: 20 यूरोपीय/लैटिन-लिपि भाषाओं के kkb/kkb2-data में अपना भाषा-नाम — cache-first data
// पिछला v755; // 25-Oct "अंग्रेज़ी"-दोष खेप-2: 9 अरबी-रूप + कन्नड़/तेलुगु/गुजराती/मलयालम/कश्मीरी के kkb2-data में अपना भाषा-नाम — cache-first data
// पिछला v754; // 25-Oct "अंग्रेज़ी"-दोष खेप-1: 16 भारतीय भाषाओं के kkb2-data में अपना भाषा-नाम (लक्ष्य+उच्चारण+हिंदी) — cache-first data
// पिछला v753; // 25-Oct (1) भाषा-नाम ताज़ा स्प्रेडशीट v5.8 से: courses_data (196) + exam_data (198) + kkb2.js (दिखने वाला नाम रजिस्टर से) · (2) 90-दिन कोर्स में हर वाक्य पर 🎙️ बोलो: kkb2.js + acs-bolo.js v1.1 — cache-first data/js
// पिछला v752; // 25-Oct व्याकरण-पन्ना v1.3 (SEO): vyakaran.css में h1/परिचय-पंक्ति — cache-first css
// पिछला v751; // 25-Oct व्याकरण-पन्ना v1.2: vyakaran.css सघन-छपाई — हर पाठ एक पन्ने में (फ़ोन-PDF 24 → 13 पन्ने) — cache-first css
// पिछला v750; // 25-Oct व्याकरण-पन्ना v1.1: vyakaran.css आवरण + छपाई-सुधार (पाठ-1 पहले पन्ने पर, तैरते बटन/WhatsApp/तिरंगा न छपें) + नए assets/acs-bolo.js (🎙️ बोलो-अभ्यास) व assets/acs-raay.js (👍👎💬) — cache-first css
// पिछला v749; // 24-Oct kkb सुधार-7 वापसी: मिज़ो की 1,637 पुरानी असली पंक्तियाँ लौटीं (Setswana-दूषित 512 पर नई यथावत) — cache-first data
// पिछला v734; // 21-Oct लाल10-ह: pjt oji lkt rmt kfa dv ain ryu crk iku — 4 नई लिपि-परतें (THAX/JPNX/CANX/KNDX) + D2J/D2C/D2V identity — 🔴 34→24
// पिछला v733; // 21-Oct लाल10-ग: C05 कोंध-गुच्छा uki kxv kfj peg mha kff (Oriya/Telugu block-shift ORYX/TELX) — 🔴 40→34
// पिछला v732; // 21-Oct लाल10-फ: kru kmj kfp biy kfb nit pci gdb brh zum पूर्ण-पुनर्लेखन — 🔴 60→40
// पिछला v731; // 21-Oct लाल10-ई खेप-2+3: ab niv dar haz lrc पूर्ण-पुनर्लेखन — 10/10 नक़ली-मुक्त
/* v719 (20-Oct खेप-2 पूर्ण) grt+tiv: engine-कोश-लूप सुधार (pres/imp टेम्पलेट कोश-generation में जुड़े — grt-kachra 182→148) → kkb/kkb2 data दोबारा-regen + बैंक दोबारा-build; kkb_grt/kkb2_grt data बदले */

const CACHE_NAME    = 'acs-' + CACHE_VERSION;
const OFFLINE_URL   = '/offline.html';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap';

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

function isPrivatePath(url) {
  return /\/dashboard\/|\/dashboard\.html|\/callcenter\/|\/founder|\/admin|\/manager\/|\/operator\/|\/profile\.html|\/register\.html|register\.html|\/login|\/teacher\/|\/counselor\/|\/employer\/|\/partner\//i.test(url);
}

function isHTMLRequest(request) {
  return request.mode === 'navigate' ||
         (request.headers.get('accept') || '').includes('text/html');
}

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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  if (isPrivatePath(request.url)) return;

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
