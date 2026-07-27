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

const CACHE_VERSION = 'v259'; // 45MB-FILE SPLIT (permanent fix for GitHub upload-size failure): generator/data/udyam_intro_data.js (45MB, exceeded practical upload limits) permanently retired and split into generator/data/udyam_intro_shared.js (LEAD()+MG_INTRO, 317KB) + 24 separate generator/data/udyam_intro_mgNN.js files, one per MG sector (largest: MG-14 at 4.55MB, all comfortably under GitHub limits). Each mg-file ends with a 🔮 Future-Slot comment block documenting how to add new udyam entries to that sector — the system stays permanently open for new additions, no capacity ceiling. generator/build_udyam_intro_pages.js updated (v1.1) to require all 25 pieces and merge in-memory at build-time; behavior otherwise unchanged. While fixing this, also caught and fixed 4 legacy entries (n77,145,146,152) whose mg field had been null (silently skipping MG-shared bazar/leaders content and masking a real word-count-over-limit bug); corrected mg values (77→2, 145/146/152→3) and trimmed each entry's redundant closing paragraphs to fit under the 4800-word ceiling now that shared content is properly included. Full corpus reverified: 948/948 pages build with 0 fail.
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
