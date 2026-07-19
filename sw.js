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

const CACHE_VERSION = 'v64';                 // <- (v64: 20-Jul-2026 -- aptitude v1.3: seedha apne dashboard-ghar wapas, re-login khatm)                 // <- (v63: 20-Jul-2026 -- dashboard.js v4.6 tick-bachav + aptitude v1.2 wapsi-kadi/chitr-chaukhat)                 // <- (v62: 20-Jul-2026 -- aptitude fix: scroll-kood band + halka parda, css/js badle)                 // <- (v61: 20-Jul-2026 -- kaam-12: aptitude-test page + 5 naye assets, cache-bust)                 // <- (v60: 19-Jul-2026 -- DP-ring fit-content: photo ke niche latki gradient patti band)                 // <- (v59: 19-Jul-2026 -- DP: doc_photo fallback + gradient-ring + top-right ACS green badge)                 // <- (v58: 19-Jul-2026 -- photo-badge tick + yantra v1.3 nav-check)                 // <- (v57: 19-Jul-2026 -- nav-whitelist fix: pnl-badgeq TEAM_PANEL_IDS me juda)                 // <- (v56: 19-Jul-2026 -- kadam-3: badge-satyapan qatar + grant/reject, dashboard.js+4 team pages)                 // <- (v55: 19-Jul-2026 -- badge pin-khana: trainee-roles ke liye PIN input, dashboard.js+9 pages)                 // ← (v54: 19-Jul-2026 — dashboard.js v4.5 null-सुरक्षित setters, Laxmi-केस राउंड-2 बंद)                 // ← (v53: 19-Jul-2026 — काम-11+: साझा बैज-इंजन (9 भूमिकाएँ) + 📒 खाता-बही पैनल, dashboard.js बदला)                 // ← (v49: 19-Jul-2026 — काम-11 कदम-2: dashboard.js में बैज-checkout जुड़ा, cache-bust अनिवार्य)                 // ← (v48: 18-Jul-2026 — काम-9+ learner-progress: course-lesson.js/css बदले, cache-bust अनिवार्य)                 // ← (v47: 18-Jul-2026 — केंद्र/वर्कशॉप चरण-2 cache-bust: roles.js v2.3 के साथ अनिवार्य। v45/v46 के नाम जल-चुके — इसलिए सीधे v47)
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
