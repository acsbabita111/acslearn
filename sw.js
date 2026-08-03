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

const CACHE_VERSION = 'v330'; // 03-Aug: टू-व्हीलर कोर्स (SE022) — courses_data.js व udyam_data.js बदले (cache-first)।
  // पुराना v329 (01-Aug): tab-0 का पूरा उप-वाक्य (3 लाइन) पूरी तरह
  // हटाया — अब सिर्फ़ "✅ अभी पढ़ना शुरू करें!" शीर्षक व नीचे 5 कोर्स के कार्ड, कोई टेक्स्ट-ब्योरा नहीं।
  // पुराना v328: झूठा-दावा हटाया था (परीक्षा/प्रमाणपत्र सिर्फ़ 2/5 में)। पुराना v327: hero-padding
  // घटाई। पुराना v326: courses/hi/index.html पूरा 6-tab redesign — ब्योरा उन दौर के delivery में दर्ज।
// पुराना v310: // DCA CERT EXAM (30-Jul, Founder urgent — 500 offline students awaiting certificates): exam_data.js v1.2 adds PJ016 bank of 120 MCQs (12 chapters x 10, grounded in real DCA lesson titles), presented as 3 sets of 40 (dashboard v5.9 set headings), pass 60%, minLessons=0 so offline-trained learners can sit without re-reading online lessons (Founder can raise gate by editing one number); server fetches bank live => NO function redeploy; existing Rs125 certificate engine serves the result.\n// पुराना v309: // RULE CODIFIED (30-Jul, Founder): timer+progress engine is now the PERMANENT LAW for every course — audit proved printer(900)/dca(360)/ai(150)/welding(100) lesson pages already carry course-lesson.js (shared asset => v1.3 clock went live on all of them with v308); ecom(120) wired earlier; build_course_pages.js now FAILS the build if any future lesson page lacks the css/js link; 2 course-details meta pages deliberately excluded (fake read-count inflation guard).\n// पुराना v308 (टिप्पणी-श्रृंखला यथावत): // FLOATING TIMER (30-Jul, Founder: blind page): course-lesson.js v1.2 adds fixed bottom-right pill on EVERY lesson page (all courses, shared asset — zero page regen): elapsed time always ticking + 25s countdown / scroll-to-bottom hint, flips green PAATH DARJ (+10) on mark; style JS-injected so works even without css link; rule unchanged (bottom OR 25s, whichever first).\n// पुराना v307: // STEP-1+2 (30-Jul, Founder ek-ke-baad-do saath): (1) all 120 ecom legacy lesson pages injected with course-lesson.css+js before </body> so reading finally writes acs_learn_progress -> dashboard/account sync (closes v3.2-c2 hole for ecom); (2) exam_data.js v1.1 adds SE009 bank (10 MCQ, minLessons=120 per Founder, pass 60) — server fetches this same file so NO function redeploy needed.\n// पुराना v306: // FIX-7 (30-Jul, ecom probe): progress counting switched to exact course-home matching (crsHome/cntRead) — old prefix regex broke on 3-level paths and index.html urls, so printer/dca/ai could NEVER be counted; dashboard.js v5.7.1.\n// पुराना v305: // FIX-6 (30-Jul, laptop-4/mobile-2 mystery): the JOIN(+) enrollment list was device-local (documented hole) — now unioned through syncLearnProgress too (client sends enr id+at, server merges keeping earliest at, response rewrites acs_my_courses) so every phone shows the SAME course list; backward-compatible both directions. dashboard.js v5.7; REDEPLOY functions:syncLearnProgress with new index.js.\n// पुराना v304: // HOLE FIX (30-Jul): 'rb is not defined' — rb was trapped inside k9 IIFE scope so crsMineFill (latent since v5.3!) and crsCenterFill silently died; readable-error rule exposed it live; both now use in-scope noSq. dashboard.js v5.6.2 only. // +v1.3: single unified floating clock; Founder IDLE RULE (10s no touch/mouse/scroll/key OR hidden tab = PAUSED); 25s-mark counts ACTIVE seconds only; 30min/page cap; course-total line on widget.
// पुराना v303: // FOUNDER FIX-5 (30-Jul): (a) MERI COURSE PRAGATI table now two-phase — instant render from this phone (registered courses appear immediately, matching profile tile), then account-merged final; 8s race guard on syncLearnProgress; readable error instead of stuck loading note. (b) course-card JOIN chip: enrolled shows chip directly, chip/button now block one-line below padhe button, never wraps; crsstep 15px->16px font-rule hole closed. dashboard.js v5.6.1 + dashboard.css only — no page regen.\n// पुराना v302: // FOUNDER FIX-4 (30-Jul): MERE COURSE PRAGATI table replaces mera-padhai list per uploaded photo — columns course|progress|EXAM(new, between progress & certificate per order-4)|certificate|action; heading renamed, desc line removed; progress is now SERVER TRUTH via new syncLearnProgress callable (local-union-server, rewritten to localStorage) so changing phones never changes the graph; profile course tiles use same sync; rules v11 learnProgress owner-read; old crsgraph/lvrow layout retired.\n// पुराना v301: // FOUNDER FIX-3 (30-Jul, student menu): 6 panel pairs merged into 1 each on /dashboard/student/ only (status+goldenBadge with NEW 3-state dynamic menu name khata: koi badge nahin / green / golden via updateAcctNav; courses+progress; exams+certs; pay+ledger=mera account; aptitude+counsel; rules+help=niyam-sahayta-shikayat moved BELOW vani per order-7); merged B blocks keep ids so engines live, MERGED_LAZY fires B lazy engines when A opens; generator applyStudentMerges balanced-div transform, dashboard.js v5.5.
// पुराना v300: // FOUNDER FIX (30-Jul): profile performance card trimmed to 3 tiles only (course-registered, course-done, badge) — lessons/streak/interest tiles removed as clutter; account-result engine untouched (test page still reads it); template + dashboard.js v5.4.1 regen of 31 homes.
// पुराना v299: // 2-HOLE ROUND (30-Jul, Founder): HOLE-1 aptitude result summary server-saved on final-submit (apt-pay v1.1 saveResult/latestResult -> saveAptitudeResult/latestAptitudeResult; apt-session v1.2 fires save + cloud fallback for pichla-hisab; dashboard perfSector prefers account) so changing phones keeps the result; HOLE-2 profile perf card = 6 center-aligned tiles adding course-registered/course-done, MERE COURSE gains progress graph (blue=ongoing green=done), all data center-aligned; ensureCoursesData single-door loader kills double-const crash; rules v10 aptitudeResults owner-read. Deploy functions(saveAptitudeResult,latestAptitudeResult)+rules from office.
// पुराना v298: // (supersedes un-uploaded v274) KAAM-8 REFERRAL CLIENT + VOLUNTEER BADGE (Founder: 1-a record-only via 7-workday cycle, volunteer gets badge too=uniformity, fund giftable, badge-purchases only for now): all 5 badge panels gain referral section (optional code input=referrer regNo, my-code shown only with active badge, quota x/3 or unlimited for volunteer, fund list due/paid with expiry, gift by ACS-number); dashboard.js v5.2 sends referralCode to createBadgeOrder and adds loadMyReferrals+gift engine; server: BADGE_ROLES+volunteer, min/3 formula at grant-moment inside both grant transactions (idempotent doc-id=orderId), giftReferral fn; firestore.rules v7 referrals read-block. Deploy functions+rules from office.
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
