/* ==========================================================================
   ACS Service Worker — v3 (auto-update)
   लक्ष्य: रेपो पर नया code आते ही, ग्राहक के अगली बार site खोलते ही
          लगभग तुरंत नया दिखे — पुरानी cache फँसाए नहीं।

   तरीक़ा:
   - HTML pages → network-first (हमेशा अपने-आप ताज़ा; नेट न हो तो cache/offline)
   - फ़ॉन्ट/logo/CSS/JS जैसी static चीज़ें → cache-first (तेज़)
   - नया version आते ही skipWaiting + clients.claim → तुरंत कमान
   - login/profile/dashboard जैसे निजी page कभी cache नहीं (सुरक्षा)

   ⚠️ बहुत ज़रूरी — अपडेट कैसे भेजें:
      • सिर्फ़ HTML page अपने-आप ताज़ा होते हैं।
      • पर जब आप CSS / JS / image (जैसे style.css, acs-translate.js) बदलें,
        तो नीचे CACHE_VERSION ज़रूर बढ़ाएँ (v3 → v4 → v5 …)।
        तभी पुरानी cache साफ़ होगी और नया code ग्राहक तक पहुँचेगा।
      • भूल गए तो ग्राहक को पुरानी CSS/JS दिखती रह सकती है।
   ========================================================================== */

const CACHE_VERSION = 'v3';                 // ← CSS/JS बदलें तो यह ज़रूर बढ़ाएँ
const CACHE_NAME    = 'acs-' + CACHE_VERSION;
const OFFLINE_URL   = '/offline.html';

/* सिर्फ़ न बदलने वाली, सुरक्षित static चीज़ें पहले से cache —
   कोई login/dashboard/personal page यहाँ नहीं। */
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap'
];

/* कभी cache न करने वाले रास्ते (निजी/सुरक्षित) —
   dashboard, profile, register, login व हर role का निजी क्षेत्र */
function isPrivatePath(url) {
  return /\/dashboard\/|\/dashboard\.html|\/callcenter\/|\/founder|\/admin|\/manager\/|\/operator\/|\/profile\.html|\/register\.html|\/login|\/teacher\/|\/counselor\/|\/employer\/|\/partner\//i.test(url);
}

/* HTML page का request है या नहीं */
function isHTMLRequest(request) {
  return request.mode === 'navigate' ||
         (request.headers.get('accept') || '').includes('text/html');
}

/* ── Install: static चीज़ें pre-cache, और तुरंत आगे बढ़ो ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .catch(err => console.log('ACS SW precache skip:', err))
  );
  self.skipWaiting();   // नया version इंतज़ार न करे
});

/* ── Activate: पुरानी सब cache मिटाओ, तुरंत कमान लो ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())   // सब खुले tab तुरंत नए sw के अधीन
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // निजी/सुरक्षित page: कभी cache नहीं — सीधे नेटवर्क
  if (isPrivatePath(request.url)) {
    return; // browser सामान्य रूप से नेटवर्क से लाए
  }

  // HTML page → network-first (हमेशा ताज़ा)
  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // सिर्फ़ सही response cache करो (टूटा/opaque नहीं)
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

  // बाक़ी static (CSS/JS/font/image) → cache-first (तेज़),
  // पर background में ताज़ा भी कर लो (stale-while-revalidate)
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        // सिर्फ़ सही response cache करो (टूटा/opaque नहीं)
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

/* ── Push Notifications (vani/dashboard के लिए) ── */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'ACS', {
      body: data.body || 'नई सूचना',
      icon: 'https://acsbabita111.github.io/acslearn/logo.png',
      badge: 'https://acsbabita111.github.io/acslearn/logo.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});
