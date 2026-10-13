/* sw.js — ACS service-worker (network-first HTML · cache-first असेट · offline.html)
   ⚠️ CSS/JS बदलें तो CACHE_VERSION ज़रूर बढ़ाएँ। पूरा version-इतिहास CHANGELOG-sw.md में (13-Sep ऑडिट H7: 133 KB → छोटा, हर version-जाँच पर हल्का download)। */
const CACHE_VERSION = 'v691'; /* (13-Oct) 5-भाषा हाथ-मिलान (niu tkl haw ton rap): 10 kkb/kkb2-data (cache-first) — हर वाक्य स्रोत (ABVD/Kieviet/NZALT) से मिलाकर सुधरा; robot-तालिका में niu/tkl/rap Latin-नियम; सभी 🔴 केवल-आंतरिक (मूल-वक्ता जाँच बाक़ी) */ /* (12-Oct) 13-भाषा खेप (ban bjn bug hil ilo mad mak min niu pam rap tkl war): 26 kkb/kkb2-data (cache-first) — L1 500 + L2 1650 वाक्य, तीन-स्तंभ (असली-लिपि / देवनागरी / हिंदी); rap niu tkl नए सिरे से (Latin, स्रोत-द्वार पास) — v681-v689 छलाँग-नियम से छोड़े */ /* (11-Oct) NEXT50 सब-50-भाषा upload: 33 नई/सुधरी kkb-data (cache-first) + Thaana/RTL kkb.js/kkb2.js/css — v668-v679 छलाँग-नियम से छोड़े (RO-v2.0 आदि के आरक्षित zip) */ /* (09-Oct) kkb हल्की-32 मरम्मत (पड़ाव-द काम-द-1): 16 भाषाओं के massShare-वाक्य ठेठ बोली-रूप में मौलिक पुनर्लेखन (kkb2_*_data.js cache-first) + 32 शब्दकोशों से पहचान-नक़लें साफ़ — v665/v666 RO-v2.0 zip के लिए आरक्षित (छलाँग-नियम) */

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
