/* sw.js — ACS service-worker (network-first HTML · cache-first असेट · offline.html)
   ⚠️ CSS/JS बदलें तो CACHE_VERSION ज़रूर बढ़ाएँ। पूरा version-इतिहास CHANGELOG-sw.md में (13-Sep ऑडिट H7: 133 KB → छोटा, हर version-जाँच पर हल्का download)। */
/* v724: 20-Oct लाल10-स खेप-1 — kkb Cyrillic-5 (ba sah bua tyv kjh) असली-content regen */
const CACHE_VERSION = 'v741'; // 22-Oct kkb F-9: अनुस्वार/हलंत से शुरू 12,900 शब्द ठीक (पंचमाक्षर ङ्ग/न्द/म्ब · ङ+मात्रा · अनुस्वार-जोड़ · हलंत-हटाव) — 58 भाषा, cache-first data
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
