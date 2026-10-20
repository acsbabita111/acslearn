/* sw.js — ACS service-worker (network-first HTML · cache-first असेट · offline.html)
   ⚠️ CSS/JS बदलें तो CACHE_VERSION ज़रूर बढ़ाएँ। पूरा version-इतिहास CHANGELOG-sw.md में (13-Sep ऑडिट H7: 133 KB → छोटा, हर version-जाँच पर हल्का download)। */
/* v724: 20-Oct लाल10-स खेप-1 — kkb Cyrillic-5 (ba sah bua tyv kjh) असली-content regen */
const CACHE_VERSION = 'v729'; /* (21-Oct सफ़ाई-दौर) 15 Cyrillic भाषाएँ (cv ba sah bua udm mhr myv ava os tyv kjh xal che lez kbd): लाइव में रोमन-हिंदी रिसाव बंद (रूसी-उधार fallback, मूल-वक्ता शब्द आने तक); Latin 'English'/'eve' → Cyrillic; शब्द-दोहराव व अधूरे रूसी रूप ठीक; ओसेतियाई æ→ӕ; bua/tyv Latin-a→а; kkb_/kkb2_ ×15 + lipi ×15 + workbook-index ×15; बैंक ×15 (office-deploy); leak_gate v2। (20-Oct काम-लाल10-द खेप-2) Cyrillic-5 दूसरी टोली पूर्ण-पुनर्लेखन — che चेचन · ava अवार · lez लेज़गी · kbd काबर्दीनो · xal कल्मिक: असली Cyrillic तीन-स्तंभ (palochka ӏ समेत), kkb_/kkb2_ दसों data बदले; courses_data में PJ264/266/267 सिबलिंग-रूप (seal ру, t3); lipi-शब्दकोश ×5 नए; wb_pdf_puppeteer v1.1 (WB_FONTS देवनागरी-shaping); परीक्षा-बैंक ×5 पूर्ण-ROT (office-deploy)। पिछला (लाल10-स खेप-3) new नेवारी हिंदी-clone दोष सुधार — असली Nepal Bhasa देवनागरी तीन-स्तंभ regen (जि/छि/ज्वजलपा/सुभाय्; kkb_/kkb2_new बदले) + afb ख़ाड़ी-अरबी बासी-दर्जा निरस्त (content 05-Oct से असली, robot-पास); दोनों के परीक्षा-बैंक पहली बार (PJ206/PJ209, पूर्ण-ROT) + workbook कोश (new _2/_3)। पिछला (खेप-1) Cyrillic-5 clone-दोष सुधार: ba बश्कीर · sah याकूत · bua बुर्यात · tyv तुवान · kjh खाकास — असली Cyrillic तीन-स्तंभ (तातार/किर्गिज़/ख़ाल्ख़ा-clone निरस्त); kkb_/kkb2_ पाँचों data बदले। पिछला (लाल10-ब खेप-5) dhv द्रेहु + nah नाहुआतल: असली Latin तीन-स्तंभ पूर्ण-पुनर्लेखन (06-Oct देव-placeholder निरस्त); द्वार PJ341/PJ311 आधुनिक (seal/t3/TTS fr-FR·es-MX); kkb_dhv/kkb2_dhv + kkb_nah/kkb2_nah data बदले */
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
