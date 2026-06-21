// ACS Vani Service Worker v1.0
const CACHE_NAME = 'acs-vani-v1';
const OFFLINE_URL = '/offline.html';

const CACHE_URLS = [
  '/',
  '/dashboard/index.html',
  '/dashboard/student/index.html',
  '/dashboard/callcenter/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap'
];

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS).catch(err => console.log('Cache error:', err));
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match(OFFLINE_URL)))
  );
});

// Push Notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'ACS Vani', {
      body: data.body || 'नई notification',
      icon: 'https://acsbabita111.github.io/acslearn/logo.png',
      badge: 'https://acsbabita111.github.io/acslearn/logo.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/dashboard/index.html' }
    })
  );
});

// Notification Click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
