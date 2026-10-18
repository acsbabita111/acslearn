/* sw.js — ACS service-worker (network-first HTML · cache-first असेट · offline.html)
   ⚠️ CSS/JS बदलें तो CACHE_VERSION ज़रूर बढ़ाएँ। पूरा version-इतिहास CHANGELOG-sw.md में (13-Sep ऑडिट H7: 133 KB → छोटा, हर version-जाँच पर हल्का download)। */
const CACHE_VERSION = 'v707'; /* (19-Oct खेमा-र c13) शेष-17 भाषा live-तैयारी — 13 बहन-pivot Latin पूर्ण-पुनर्लेखन (ach alz←luo | cgg←rw | dov ndc←sn | aa←so | din←nus | sus←bm | srm←srn | gv←gle | hrx←de | rom hmn←en): 26 kkb/kkb2-data (cache-first) + 4 असली-लिपि अछूती (mkd Cyrillic · br szl Latin · yi Hebrew) checker-मुहर + 5 भाषा-नाम LNAME-एकरूपता (अलुर/किगा/डिंका/सारामाक्कान/हुन्सरिक, data+config) + 14 नए परीक्षा-द्वार PJ409-422 (br szl yi ach alz cgg dov ndc aa sus gv hrx hmn rom): courses_data/exam_data/dashboard.js (तीनों cache-first) + 3 पुराने द्वार (PJ295/344/370) तीन-लिपि t3-उन्नयन + bank-CFG 14 नई + 3 rot-उन्नयन (mkd/din/srm पूर्ण ROT) + dov SALT=1; बैंक office-only */ /* const CACHE_VERSION = 'v706'; /* (19-Oct cnh/pck lexicon-सफ़ाई) langs_r_india L119/L120 का Setswana-block निरस्त — ~300 असली word-rules (4 परत) + loan/cognate-मात्र shared: kkb/kkb2 cnh+pck data regen (cache-first); बचे-token cnh 4639→2800, pck 4423→2674 (शेष = lus-corpus Tswana-दूषण backlog); बैंक office-only (cnh_bank/pck_bank regen, PJ407/PJ271) */ /* (18-Oct चार-bundle मर्ज) खेमा-s 7 (ba bua hoc kjh sah tyv unr) + Tswana-काण्ड (ts kac lus nus kkb2-सफ़ाई) + आसान-10 (bem bis ch crs fon jam mri pis srn tet) + khep10 अंतिम-5 (yap chk pon na kos) + द्वार PJ408-gaa + 14-भाषा शब्दकोश EM-पूर्ति (cache-first) + 10+10 workbook-पेज */ /* (18-Oct लॉन्चिंग-पेज) aptitude-test.html हीरो + दुनिया के टॉप-10 टेस्ट (कड़ियाँ वेब-जाँच, अक्टूबर 2026) + assets/aptitude-test.css v1.4 (cache-first) */ /* (14-Oct काम-खेमा-र) 25 🔴-भाषा बहन-pivot पूर्ण-पुनर्लेखन (इतालवी-6 la co fur vec lmo lij | mg-3 bhr skg bzc | बंटू swb ktu ve | फ़िलीपीन-SEA bcl krj tsg bbc dtp | प्रशांत wls fud hmo ch | भारत kha cnh pck | fy): 50 kkb/kkb2-data + 25 शब्दकोश (cache-first) + 9 नए द्वार PJ399-407 (la co fur vec lmo lij fy ktu cnh): courses_data/exam_data/dashboard.js + robot BANK_DIR + 7-भाषा en-titles + pron-काण्ड इलाज (951+ कोष्ठक-pron G2P-regen: र1-छह/swb/bbc/dtp) + la इतालवी-सफ़ाई ~160 + hmo/kha अवशेष + sitemap 25 workbook; बैंक office-only; cnh/pck/kha 🔴-interim */ /* (14-Oct काम-खेमा-य) 25 सबसे-आसान भाषाएँ Latin बहन-pivot पूर्ण-पुनर्लेखन (bis pis | crs acf rcf dcf fgc | kea cri tet | iba bew | rar ty tvl | crh nd tdx | jam srn djk kri gyn trn bjs): 50 kkb/kkb2-data + 25 शब्दकोश (cache-first) + 3 नए परीक्षा-द्वार PJ396-398 (bew crh jam): courses_data/exam_data/dashboard.js (तीनों cache-first) + 25 📘-कड़ी + sitemap; बैंक office-only */ /* (14-Oct काम-खेमा-द) 25 देवनागरी बोली (राजस्थानी/हिंदी-पट्टी 15 + पहाड़ी 10) पूर्ण-पुनर्लेखन: 50 kkb/kkb2-data + 25 शब्दकोश (cache-first) + AI-सहयोग-पट्टी regen (282-flag बोली कोर्स-पेज) + 11 📘-कड़ी + sitemap workbook-URL; बैंक office-only */ /* (13-Oct खेमा-ब) tuk/li/ltg पूर्ण-पुनर्लेखन (tr/nl/lav-सिबलिंग, तीन-स्तंभ) + 6 पुराने euro-कार्ड तीन-लिपि उन्नयन + 4 नए परीक्षा-द्वार PJ391-394 (oc scn li ltg): kkb/kkb2-data, courses_data, exam_data, dashboard.js (सब cache-first) */ /* (13-Oct) 25-भाषा मरम्मत-समेकन live: खेप-1/2/3 (यूरोप-11 + प्रशांत-5 + bs) व खेप-4/5 (अफ़्रीकी-8 पूर्ण-पुनर्लेखन) की 50 kkb/kkb2-data (cache-first) + 5 नए परीक्षा-द्वार PJ380-384 (eo bs st nso sg): courses_data/exam_data/dashboard.js (तीनों cache-first) */ /* (13-Oct) 5-भाषा हाथ-मिलान (niu tkl haw ton rap): 10 kkb/kkb2-data (cache-first) — हर वाक्य स्रोत (ABVD/Kieviet/NZALT) से मिलाकर सुधरा; robot-तालिका में niu/tkl/rap Latin-नियम; सभी 🔴 केवल-आंतरिक (मूल-वक्ता जाँच बाक़ी) */ /* (12-Oct) 13-भाषा खेप (ban bjn bug hil ilo mad mak min niu pam rap tkl war): 26 kkb/kkb2-data (cache-first) — L1 500 + L2 1650 वाक्य, तीन-स्तंभ (असली-लिपि / देवनागरी / हिंदी); rap niu tkl नए सिरे से (Latin, स्रोत-द्वार पास) — v681-v689 छलाँग-नियम से छोड़े */ /* (11-Oct) NEXT50 सब-50-भाषा upload: 33 नई/सुधरी kkb-data (cache-first) + Thaana/RTL kkb.js/kkb2.js/css — v668-v679 छलाँग-नियम से छोड़े (RO-v2.0 आदि के आरक्षित zip) */ /* (09-Oct) kkb हल्की-32 मरम्मत (पड़ाव-द काम-द-1): 16 भाषाओं के massShare-वाक्य ठेठ बोली-रूप में मौलिक पुनर्लेखन (kkb2_*_data.js cache-first) + 32 शब्दकोशों से पहचान-नक़लें साफ़ — v665/v666 RO-v2.0 zip के लिए आरक्षित (छलाँग-नियम) */

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
