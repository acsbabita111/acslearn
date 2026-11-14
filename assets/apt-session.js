/* ============================================================
   /assets/apt-session.js : v2.11 (14-Nov-2026; खेप 5-क: नई भाषाओं के लिए उद्यम-नामों की तालिका। जिस भाषा की वाक्यांश-तालिका में "@udyam" का पता है,
   उसके नतीजे पर 951 उद्यमों के नाम उसी भाषा की फ़ाइल /assets/apt_udyam_<भाषा>.js से आते हैं। हिंदी और English पन्नों पर कुछ नहीं बदला।) · v2.10 (14-Nov-2026; खेप 4 भाग 1: ₹125 के भुगतान से पहले "वापस नहीं होती" वाली पंक्ति) · v2.9 (14-Nov-2026; खेप 3-ख भाग 1: सहेजी हुई रिपोर्ट के नीचे जाँच-नंबर और मान्य तिथि) · पहले v2.8 (13-Nov-2026)
   v2.8 (13-Nov-2026, खेप 2 के ऑडिट K2-H03 और Founder का फ़ैसला): ₹100 के बटन के ऊपर लिखा है कि चांस वापस नहीं होता, सिवाय हमारी तकनीकी ग़लती के। बाक़ी सब v2.7 जैसा।
   Founder के 13-Nov-2026 के नियम लागू:
   - पूरा प्रश्न-भंडार अब repo पर नहीं है। हर खंड के 40 प्रश्न server (aptStart, aptNext) से आते हैं।
   - द्वार server तय करता है: सक्रिय बैज, या ₹100 का चांस। फ़ोन का पुराना निशान अब ताला नहीं है।
   - 3 खंड x 40 प्रश्न। हर खंड अधिकतम 40 मिनट, कम से कम 10 मिनट। खंडों के बीच 1 से 5 मिनट का विराम।
   - घड़ी server के समय से चलती है, और पन्ना बंद करने पर नहीं रुकती।
   - जवाब, अंकों की गिनती और नतीजा इसी फ़ोन में रहते हैं। बिना ₹125 के server पर नतीजा नहीं जाता।
   - नतीजे में सबसे मज़बूत 5 सेक्टर अपने स्कोर के साथ दिखते हैं।
   v2.1 (ChatGPT की जाँच के बाद): हर खंड की समय-सीमा server से आती है; "5 साल" वाली बात खेप 3 तक हटाई गई;
        विराम सिर्फ़ पहले और दूसरे खंड के बाद लिखा गया; और यह साफ़ लिखा गया कि अगले खंड के प्रश्न चुनने के लिए
        फ़ोन ऊपर के सेक्टरों और उद्यमों के नंबर server को बताता है (server उन्हें सेव नहीं करता)।
   v2.2 (ChatGPT की दूसरी जाँच के बाद): अगले खंड के प्रश्न अब विराम पूरा होने पर ही server से आते हैं
        (पहली माँग विराम शुरू करती है, दूसरी प्रश्न लाती है); जन्म का साल server को नहीं जाता, सिर्फ़ उम्र-वर्ग जाता है;
        और server को जाने वाली हर चीज़ शुरुआती कार्ड पर साफ़ लिखी है।
   v2.3 (ChatGPT की तीसरी जाँच के बाद): नतीजे में ऊपर के 5 सेक्टरों के नीचे सभी 24 सेक्टरों के स्कोर भी दिखते हैं
        (करियर-पेज यही कहता है)।
   v2.5 (ChatGPT की पाँचवीं जाँच के बाद): शुरुआती कार्ड की निजता-सूचना अब ठीक वही बताती है जो server सचमुच रखता है
        (खाते की पहचान, भाषा, रास्ता, समय, दिए गए प्रश्नों के नंबर, दिन की गिनती), कितनी देर रखता है, और क्या नहीं रखता।
   v2.6 (ChatGPT की छठी जाँच के बाद): निजता-सूचना में यह सच जोड़ा गया कि ऊपर के सेक्टर परीक्षा के दौरान server के रिकॉर्ड में रहते हैं
        (सेक्टर-समूहों के नाम और दिए गए प्रश्नों के नंबर के रूप में)। तीनों बातों के "सेव न होने" वाला ग़लत वाक्य हटाया गया।
   v2.7 (Founder-आदेश): प्रश्न के पाठ पर apt-qt चिह्न जोड़ा गया, ताकि CSS सिर्फ़ प्रश्न के अक्षर बड़े कर सके। और कुछ नहीं बदला।
   नीचे का पुराना शीर्ष-लेख इतिहास के लिए रखा है।
   ============================================================ */
/* ============================================================
   /assets/apt-session.js — v1.4 (12-Nov-2026: भाषा-परत — दूसरी भाषा का पन्ना इसी इंजन से पूरी परीक्षा चलाए;
   हिंदी का व्यवहार वही। वाक्यांश L(…) में; तालिका generator/build_apt_session_en.js बनाता है।)
   v1.3.1 (08-Nov-2026 सफ़ाई: gate-कार्ड कसा पाठ — HTML की 8-पंक्ति info
   हटी, बातें यहीं एक बार; gate-धारकों से झलक-sec भी छिपे।)
   v1.3 (08-Nov-2026: O*NET-शैली app-mode — प्रश्न पूरे पर्दे पर,
   window कभी नहीं कूदती; द्वार/नतीजा सामान्य पन्ने पर। Founder-फ़ैसला: टेस्ट-पेज = सिर्फ़ टेस्ट।)
   v1.2 (नतीजा खाते में भी — server-save · होल-1)
   v1.2 · 30-Jul-2026 (Founder-override v4.0-ख1): final-submit पर नतीजे का सार
   login-खाते में server-save (apt-pay.js → saveAptitudeResult); नए फ़ोन पर
   "पिछला हिसाब" खाते से (latestAptitudeResult)। जवाब यथावत device-local;
   मुफ़्त-झलक (बिना login) यथावत device-local।
   v1.1 · 22-Jul-2026: बैज-द्वार — पूरा टेस्ट सिर्फ़ बैज-निशान (acs_apt_gate_v1)
   वालों को; बिना निशान = द्वार-कार्ड (Jio-नियम v3.7-क अ/ब का अमल)।
   v1.0 (अभिरुचि पूरा-टेस्ट session-इंजन · नींव-दौर)
   20-Jul-2026 · मूल भाषा: हिंदी
   ------------------------------------------------------------
   नियम (Addendum v4.1 + Founder-फ़ैसले 20-Jul):
   - 120 प्रश्न · 90 मिनट · 3 खंड: 40 सेक्टर-पहचान (24-MG फैलाव) →
     40 गहन-जाँच (शीर्ष 3-4 MG, udy-स्तर) → 40 कोर्स-चुनाव।
   - घड़ी रास्ता-अ: सिर्फ़ खुले पन्ने पर चले — पन्ना बंद = घड़ी रुके,
     लौटने पर वहीं से (Founder-फ़ैसला, 20-Jul)।
   - नियंत्रक = शुद्ध गणित (v4.1-क7) — चयन व scoring में AI शून्य।
   - जवाब device-local (localStorage); नतीजे का सार login पर खाते (server)
     में भी — Founder-override 30-Jul (v4.0-ख1 का device-only वाक्य निरस्त)।
   - भंडार आलसी-load: आधार-फ़ाइल का pool-नक़्शा → broad.js (खंड-1) →
     शीर्ष MG के mgNN.js (खंड-2/3) → नतीजे पर udyam_data.js।
   - attempt-घुमाव: इस्तेमाल हुए प्रश्न दर्ज — अगला प्रयास ताज़ा प्रश्न;
     भंडार चुक जाए तो दोबारा-उपयोग (Jio-नियम: असीमित प्रयास)।
   - final-submit = प्रति-attempt lock (v3.7-क4)।
   - नतीजा: 4-5 कोर्स घटते क्रम — उपलब्ध (कड़ी वाले) ऊपर, बाक़ी पर
     ईमानदार "पाठ जल्द जुड़ेंगे" + WhatsApp माँग-कड़ी (v2.7 · url-नियम v2.4)।
   - प-1 (10-13) नरम पाठ; 0 = "जानता नहीं" — औसत में नहीं (v3.8)।
   - बेनाम analytics-hook जन्म से, पर मौन (v4.1-क8)।
   - गूँगा-fallback निषेध (v2.3): फ़ाइल न उतरे तो साफ़ संदेश + दोबारा-बटन।
   ============================================================ */
(function () {
  'use strict';
  var box = document.getElementById('apt-sess-box');
  if (!box) return;
  /* ---- v1.4 भाषा-परत (12-Nov-2026) ----
     हिंदी पन्ने पर (APT_LANG नहीं या "hi") कुछ नहीं बदलता: L() वही लौटाता है, QT/OT/ST/MGN/UN हिंदी लौटाते हैं, कोई अतिरिक्त फ़ाइल नहीं उतरती।
     दूसरी भाषा के पन्ने पर: वाक्यांश window.APT_SX[भाषा] से (/assets/apt_session_<भाषा>.js; generator-निर्मित),
     प्रश्न-पाठ window.APT_EN से (/assets/apt_sets_<भाषा>/<टुकड़ा>.js; हिंदी टुकड़े के साथ उतरता है), झलक-48, कथाएँ और समूह-नाम window.APT_TR से।
     band / mg / udy / अंक / चित्र हमेशा हिंदी टुकड़े से: गिनती का एक ही घर। */
  var LANG = (typeof window.APT_LANG === 'string' && window.APT_LANG) ? window.APT_LANG : 'hi';
  var SX = (LANG !== 'hi' && window.APT_SX && window.APT_SX[LANG]) || null;
  var TRX = (LANG !== 'hi' && window.APT_TR && window.APT_TR.lang === LANG) ? window.APT_TR : null;
  var DLOC = (SX && SX['@dateLocale']) || 'hi-IN';
  function L(s) { return (SX && Object.prototype.hasOwnProperty.call(SX, s)) ? SX[s] : s; }
  function enOf(id) {
    var m = window.APT_EN; if (m && m[id] !== undefined) return m[id];
    if (TRX && TRX.q && TRX.q[id]) { var t = TRX.q[id]; return t.opts ? [t.text, t.opts] : t.text; }
    return null;
  }
  function QT(q) { if (LANG === 'hi') return q.text; var e = enOf(q.id); return e ? (typeof e === 'string' ? e : e[0]) : q.text; }
  function OT(q, i, o) {
    var hi = o.t || o.text || o.label || ''; if (LANG === 'hi') return hi;
    var e = enOf(q.id); return (e && typeof e !== 'string' && e[1] && e[1][i] !== undefined) ? e[1][i] : hi;
  }
  function ST(st, key) { if (TRX && TRX.k && TRX.k[st.id] && TRX.k[st.id][key]) return TRX.k[st.id][key]; return st[key]; }
  function MGN(m, hiName) { return (TRX && TRX.mg && TRX.mg[m]) ? TRX.mg[m] : hiName; }
  function UN(name, n) {
    var nm = String(name).replace(/\[/g, '(').replace(/\]/g, ')'); if (LANG === 'hi') return nm;
    /* v2.11: इस भाषा की अपनी उद्यम-नाम तालिका उतरी हो (/assets/apt_udyam_<भाषा>.js) तो नाम वहीं से */
    var T = window.APT_UDN; if (T && T.lang === LANG && T.n && T.n[n]) return T.n[n];
    var mm = /\(([^()]*[A-Za-z][^()]*)\)/.exec(nm); if (!mm) return nm;
    /* कोष्ठक के भीतर English के बाद हिंदी टुकड़ा हो ("Ride Hailing — ओला/उबर मॉडल") तो English हिस्सा ही */
    var en = mm[1].replace(/[\u0900-\u097F][\s\S]*$/, '').replace(/[\s\u2014\u2013\-\/,:;(&]+$/, '');
    return en || nm;
  }
  /* v2.11: उद्यम-नामों की फ़ाइल का पता वाक्यांश-तालिका के "@udyam" से (यंत्र build_apt_lang.js लिखता है); न हो तो कोई अतिरिक्त फ़ाइल नहीं उतरती */
  var UDN_URL = (SX && SX['@udyam']) || '';
  /* चित्र (SVG) के भीतर लिखा हिंदी अक्षर/शब्द: दूसरी भाषा में तालिका का जोड़ ("@art:क" → "A"); तालिका में न हो तो ख़ाली (हिंदी कभी न रिसे)। */
  function AX(svg) {
    if (LANG === 'hi' || !svg) return svg;
    return String(svg).replace(/>([^<]*[\u0900-\u097F][^<]*)</g, function (all, t) { var k = t.replace(/^\s+|\s+$/g, ''); return '>' + ((SX && SX['@art:' + k]) || '') + '<'; });
  }
  /* ---- v1.3 app-mode (O*NET-शैली) ---- */
  function appOn() { try { document.body.classList.add('apt-app'); box.classList.add('apt-live'); } catch (e) {} }
  function appOff() {
    try {
      box.classList.remove('apt-live');
      if (!document.querySelector('.apt-live')) document.body.classList.remove('apt-app');
    } catch (e) {}
  }
  function toTop() {
    if (document.body && document.body.classList && document.body.classList.contains('apt-app')) { box.scrollTop = 0; return; }
    window.scrollTo(0, box.offsetTop - 8);
  }
  var D = window.APT_DATA, ART = window.APT_ART || {}, MG = window.MG_NAMES || {};
  if (!D) { box.innerHTML = L('<p>टेस्ट-सामग्री नहीं खुली — पन्ना दोबारा खोलिए।</p>'); return; }

  /* ---- द्वार (v2.0): server तय करता है कि परीक्षा खुलेगी या नहीं; apt-pay.js उससे पूछता है ---- */
  var ACCESS_MODE = null;
  var engineStarted = false, gateSeen = false, GATE = null;
  function escT(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function regate() { try { if (location.hash !== '#apt-full') location.hash = '#apt-full'; } catch (e) {} location.reload(); }
  function renderGateCard(kind, info) {
    appOff();
    var extra = '';
    if (kind === 'checking') {
      extra = L('<p id="apt-buy-msg">\uD83D\uDD0E आपका खाता और बैज जाँचा जा रहा है…</p>');
    } else if (kind === 'limit') {
      extra = L('<div class="apt-note">⛔ आज आप 2 परीक्षाएँ दे चुके हैं। अगली परीक्षा कल रात 12 बजे (भारतीय समय) के बाद दे सकेंगे।</div>');
    } else if (kind === 'open') {
      extra = L('<div class="apt-note">⏳ आपकी एक परीक्षा पहले से चल रही है, पर उसके जवाब इस फ़ोन में नहीं हैं। जिस फ़ोन से शुरू की थी, उसी से पूरी कीजिए। चाहें तो उसे यहीं से छोड़ दीजिए: छोड़ी हुई परीक्षा आज की 2 परीक्षाओं में गिनी जाएगी।</div>') +
        L('<div class="apt-nav"><button class="apt-btn ghost" id="apt-drop-open">❌ वह परीक्षा छोड़ें</button></div>') +
        '<p id="apt-buy-msg" style="color:var(--muted,#666);font-size:16px"></p>';
    } else if (kind === 'error') {
      extra = '<div class="apt-note">⚠️ ' + escT(info && info.message ? info.message : L('server से जवाब नहीं मिला।')) + '</div>' +
        L('<div class="apt-nav"><button class="apt-btn blue" id="apt-regate">🔄 दोबारा जाँचें</button></div>');
    } else {   /* 'buy': login नहीं है, या बैज और ₹100 का चांस दोनों नहीं हैं */
      extra = '<div id="apt-buy-wrap">' +
        L('<p style="font-weight:700;color:var(--navy,#0B1F3A)"><b>बैज नहीं है?</b> ₹100 में 1 परीक्षा दी जा सकती है। इसके लिए पहले रजिस्ट्रेशन और Login ज़रूरी है।</p>') +
        L('<p style="font-size:16px"><b>₹100 का चांस वापस नहीं होता।</b> सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है। <a href="/refund.html">वापसी-नीति</a></p>') +
        L('<div class="apt-nav"><a class="apt-btn ghost" href="/join.html">📝 पहले रजिस्ट्रेशन करें</a> ') +
        L('<button class="apt-btn gold" id="apt-buy-attempt-btn">\uD83C\uDF9F\uFE0F ₹100 में 1 परीक्षा दें</button></div>') +
        '<p id="apt-buy-msg" style="color:var(--muted,#666);font-size:16px"></p>' +
        '</div>';
    }
    box.innerHTML = '<div class="apt-card">' +
      L('<p class="apt-q">\uD83C\uDF96\uFE0F 120 प्रश्न · 3 खंड · हर खंड में 40 प्रश्न</p>') +
      L('<p>हर खंड के लिए अधिकतम 40 मिनट और कम से कम 10 मिनट हैं।</p>') +
      L('<p>पहले और दूसरे खंड के बाद 1 से 5 मिनट का विराम मिलता है।</p>') +
      L('<p>एक दिन में कुल 2 परीक्षाएँ दी जा सकती हैं।</p>') +
      L('<p><b>बैज (badge) है?</b> Login कीजिए: द्वार अपने-आप खुल जाएगा। बैज वालों के लिए यह परीक्षा मुफ़्त है।</p>') +
      '<div class="apt-nav"><a class="apt-btn green" href="/dashboard/">\uD83D\uDD11 Login / Dashboard</a></div>' +
      extra +
      '</div>';
    var rg = document.getElementById('apt-regate'); if (rg) rg.onclick = regate;
    var dp = document.getElementById('apt-drop-open');
    if (dp) dp.onclick = function () {
      var P = window.ACS_APT_PAY, m = document.getElementById('apt-buy-msg');
      if (!P || !P.finish || !info || !info.sid) { regate(); return; }
      if (!confirm(L('पक्का वह परीक्षा छोड़नी है? वह आज की 2 परीक्षाओं में गिनी जाएगी।'))) return;
      dp.disabled = true; if (m) m.textContent = L('परीक्षा बंद की जा रही है…');
      P.finish({ sid: info.sid, cancel: true }, function () { try { localStorage.removeItem('acs_apt_qs_v1'); } catch (e) {} regate(); });
    };
  }

  /* पूरा टेस्ट खुलते ही झलक और पन्ने की ऊपरी सूचनाएँ छिप जाती हैं; फ़ोन में रखा पिछला रुझान दिखता है */
  function hideStaticNotices() {
    try {
      window.ACS_APT_FULL_ON = true;   /* पूरा टेस्ट खुल चुका है: झलक दोबारा न दिखे */
      var n1 = document.getElementById('apt-dummy-notice'); if (n1) n1.style.display = 'none';
      var n2 = document.getElementById('apt-full-info'); if (n2) n2.style.display = 'none';
      var n3 = document.getElementById('apt-jhalak-sec'); if (n3) n3.style.display = 'none';
      /* (29-Jul, Founder बिंदु-1/2 — रास्ता-चालित पन्ना) बैज/₹100-धारक को झलक-दुनिया
         दिखे ही नहीं: डिब्बा + "झलक"-पंक्तियाँ ग़ायब; उनकी जगह सिर्फ़ दो चीज़ें —
         📊 पिछला हिसाब (⭐ सेक्टर + 5+ उद्यम) और नया/जारी टेस्ट। */
      var jb = document.getElementById('apt-box');
      if (jb) { if (jb.style) jb.style.display = 'none'; jb.innerHTML = ''; }
      if (document.querySelectorAll) {
        var ps = document.querySelectorAll('.apt-wrap > p, .apt-wrap > .apt-note');
        for (var pi = 0; pi < ps.length; pi++) {
          if (ps[pi].textContent && ps[pi].textContent.indexOf(L('झलक')) >= 0) ps[pi].style.display = 'none';
        }
        var h1 = document.querySelector('.apt-wrap h1');
        if (h1 && h1.textContent.indexOf(L('पूरा टेस्ट')) < 0) h1.textContent += L(' — पूरा टेस्ट');
      }
      var sb = document.getElementById('apt-sess-box');
      if (sb && sb.parentNode && document.createElement && !document.getElementById('apt-hisab')) {
        var P = null;
        try { P = (JSON.parse(localStorage.getItem('acs_apt_sess_v1')) || {}).prev || null; } catch (e2) {}
        if (P && ((P.sec && P.sec.length) || (P.udy && P.udy.length))) {
          var cl = function (t) { return String(t == null ? '' : t).replace(/[<>]/g, ''); };
          var hc = document.createElement('div'); hc.id = 'apt-hisab'; hc.className = 'apt-card';
          var hh = L('<p class="apt-q">📊 पिछला हिसाब (') + new Date(P.at).toLocaleDateString(DLOC) + ')</p>';
          if (P.sec && P.sec.length) {
            hh += L('<p class="apt-q" style="font-size:19px">⭐ आपके सबसे मज़बूत सेक्टर (स्कोर 100 में से):</p>') + '<div class="apt-opts" style="text-align:left">';
            P.sec.forEach(function (x, i) { hh += '<div class="apt-row">' + (i + 1) + '. ' + cl(x.nm) + ' <span class="apt-chip">' + cl(x.sc) + '</span></div>'; });
            hh += '</div>';
          }
          if (P.udy && P.udy.length) {
            hh += L('<p class="apt-q" style="font-size:19px">🏭 आपके लिए उद्यम:</p><div class="apt-opts" style="text-align:left">');
            P.udy.forEach(function (u, i) {
              var c = String(u.c || ''); if (c.charAt(0) !== '/') c = '';
              hh += '<div class="apt-row">' + (i + 1) + '. ' +
                (c ? '<a href="' + c + '" style="color:inherit;text-decoration:underline">' + cl(u.nm) + '</a>' : cl(u.nm)) + '</div>';
            });
            hh += '</div>';
          }
          hh += L('<p class="apt-hint">यह हिसाब सिर्फ़ इसी फ़ोन में रखा है। नई परीक्षा नीचे से शुरू होगी।</p>');
          hc.innerHTML = hh;
          sb.parentNode.insertBefore(hc, sb);
        }
      }
    } catch (e) {}
  }

  window.ACS_APT_SESSION = {
    unlock: function (mode, g) {
      gateSeen = true; GATE = g || null;
      if (engineStarted) return;
      ACCESS_MODE = mode || 'attempt';
      engineStarted = true;
      hideStaticNotices();
      initEngine();
    },
    showBuy: function () { gateSeen = true; if (!engineStarted) renderGateCard('buy'); },
    showLimit: function (q) { gateSeen = true; if (!engineStarted) renderGateCard('limit', q); },
    showOpen: function (o) { gateSeen = true; if (!engineStarted) renderGateCard('open', o); },
    showError: function (e) { gateSeen = true; if (!engineStarted) renderGateCard('error', e); },
    /* इस फ़ोन में कोई अधूरी परीक्षा रखी है तो उसकी पहचान लौटाता है */
    localSid: function () {
      try { var s0 = JSON.parse(localStorage.getItem('acs_apt_sess_v1')) || {}; return (s0.cur && !s0.cur.locked && s0.cur.sid) ? s0.cur.sid : null; } catch (e) { return null; }
    }
  };

  renderGateCard('checking');
  setTimeout(function () { if (!engineStarted && !gateSeen) renderGateCard('buy'); }, 9000);
  return; /* नीचे initEngine() परिभाषा है — असली शुरुआत ऊपर से होती है */

  /* ==================== इंजन (द्वार खुलने पर ही चलता है) ==================== */
  function initEngine() {

  var KEY = 'acs_apt_sess_v1';
  var TOTAL = 120, PER_KHAND = 40;
  var RULES = { minSetSec: 600, maxSetSec: 2400, pauseMinSec: 60, pauseMaxSec: 300 };   /* server के जवाब से ताज़ा होते हैं */
  var SKEW = 0;                                   /* server की घड़ी और फ़ोन की घड़ी का अंतर */
  function srvNow() { return Date.now() + SKEW; }
  function sync(r) {
    if (r && typeof r.now === 'number') SKEW = r.now - Date.now();
    if (r && r.rules) { for (var rk in RULES) { if (typeof r.rules[rk] === 'number') RULES[rk] = r.rules[rk]; } }
  }
  function PAYAPI() { return window.ACS_APT_PAY || {}; }
  /* server से आए प्रश्न इसी फ़ोन में रखे जाते हैं, ताकि पन्ना बंद होकर खुले तो परीक्षा वहीं से चले */
  var QKEY = 'acs_apt_qs_v1';
  function qsLoad(sid) { try { var o = JSON.parse(localStorage.getItem(QKEY) || 'null'); return (o && o.sid === sid && o.qs) ? o.qs : []; } catch (e) { return []; } }
  function qsPut(sid, list) {
    var seen = {}, out = [];
    qsLoad(sid).concat(list || []).forEach(function (q) { if (q && q.id && !seen[q.id]) { seen[q.id] = 1; out.push(q); } });
    try { localStorage.setItem(QKEY, JSON.stringify({ sid: sid, qs: out })); } catch (e) {}
    window.APT_POOL = out;
  }
  function qsClear() { try { localStorage.removeItem(QKEY); } catch (e) {} window.APT_POOL = []; }
  var YEAR_NOW = new Date().getFullYear();

  /* ---------- भंडारण ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(S) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var S = load();
  S.used = S.used || {}; S.attempts = S.attempts || [];

  var loaded = {};
  function loadScript(url, ok, fail) {
    if (loaded[url]) { ok(); return; }
    var sc = document.createElement('script');
    var done = false;
    /* (28-Jul होल-बंदी) कमज़ोर नेट पर फ़ाइल अटके (न onload न onerror) तो पहले
       अनंत सन्नाटा था — "40 पर हैंग"। अब 25 सेकंड में fail → retry-card। */
    var tmr = setTimeout(function () {
      if (done) return; done = true;
      sc.onload = sc.onerror = null;
      fail(url);
    }, 25000);
    sc.src = url;
    sc.onload = function () { if (done) return; done = true; clearTimeout(tmr); loaded[url] = 1; ok(); };
    sc.onerror = function () { if (done) return; done = true; clearTimeout(tmr); fail(url); };
    document.head.appendChild(sc);
  }
  function loadMany(urls, ok) {
    var left = urls.length;
    if (!left) { ok(); return; }
    var failed = false;
    urls.forEach(function (u) {
      loadScript(u, function () { left--; if (!left && !failed) ok(); }, function (bad) {
        failed = true;
        box.innerHTML = L('<div class="apt-card"><p>⚠️ प्रश्न-फ़ाइल नहीं उतरी (network)।</p>') +
          L('<p>net देखकर दोबारा दबाइए।</p><div class="apt-nav"><button class="apt-btn blue" id="apt-retry">🔄 दोबारा</button></div></div>');
        var b = document.getElementById('apt-retry');
        if (b) b.onclick = function () { loadMany(urls, ok); };
      });
    });
  }
  function poolAll() { return window.APT_POOL || []; }
  function byId(list) { var m = {}; list.forEach(function (q) { m[q.id] = q; }); return m; }

  /* ---------- band ---------- */
  function bandOf(age) { return age <= 13 ? 1 : (age <= 17 ? 2 : 3); }
  function mgTags(q) {
    var s = {};
    (q.mg || []).forEach(function (m) { s[m] = 1; });
    (q.opts || []).forEach(function (o) { (o.mg || []).forEach(function (m) { s[m] = 1; }); });
    return Object.keys(s).map(Number);
  }

  /* ---------- चयन (शुद्ध गणित) ---------- */
  /* ---- गिनती (v3.9 विधि; band-चेहरे 3 = −5/0/+5) ---- */
  function tally(qmap, ans) {
    var mg = {}, un = {}, udy = {};
    function add(map, keys, pts) { keys.forEach(function (k) { map[k] = map[k] || { s: 0, t: 0 }; map[k].s += pts; map[k].t++; }); }
    Object.keys(ans).forEach(function (id) {
      var q = qmap[id]; if (!q) return;
      var a = ans[id];
      if (q.type === 'scale') {
        var sc;
        if (typeof a.v11 === 'number') sc = a.v11;
        else sc = (D.scoring.scale.faces)[a.v];
        if (q.amb) return;                       /* हौसला-प्रश्न — mg-गिनती नहीं */
        if (sc === 0) { mgTags(q).forEach(function (m) { un[m] = (un[m] || 0) + 1; }); return; }
        add(mg, q.mg || [], sc); add(udy, q.udy || [], sc);
      } else if (q.type === 'pick') {
        var f = q.opts[a.first], l = q.opts[a.last];
        if (f) { add(mg, f.mg || [], D.scoring.pick.first); add(udy, f.udy || [], D.scoring.pick.first); }
        if (l) { add(mg, l.mg || [], D.scoring.pick.last); add(udy, l.udy || [], D.scoring.pick.last); }
      } else if (q.type === 'pair') {
        var o = q.opts[a.v];
        if (o) { add(mg, o.mg || [], D.scoring.pair.pick); add(udy, o.udy || [], D.scoring.pair.pick); }
      } else if (q.type === 'story') {
        var so = q.opts && q.opts[a.v];
        if (so) { var p = (typeof so.pts === 'number') ? so.pts : D.scoring.story.defaultPts; add(mg, so.mg || [], p); add(udy, so.udy || [], p); }
      }
    });
    return { mg: mg, un: un, udy: udy };
  }
  function rank(map) {
    return Object.keys(map).map(function (k) { return { k: Number(k), avg: map[k].s / map[k].t, s: map[k].s, t: map[k].t }; })
      .sort(function (a, b) { return b.avg - a.avg || b.s - a.s; });
  }

  /* ---------- घड़ी: रास्ता-अ — सिर्फ़ खुले पन्ने पर चले ---------- */
  var tick = null;
  function beginAt(C) { return (C.begin && C.begin[C.phase]) ? C.begin[C.phase] : srvNow(); }
  /* खंड की सीमा: शुरू + 40 मिनट, पर server की बताई सीमा (dl) से आगे कभी नहीं */
  function setDeadline(C) {
    var d = beginAt(C) + RULES.maxSetSec * 1000, sd = C.dl && C.dl[C.phase];
    return (typeof sd === 'number' && sd < d) ? sd : d;
  }
  function minReadyAt(C) { return beginAt(C) + RULES.minSetSec * 1000; }
  function mmss(ms) {
    var t = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(t / 60), sec = t % 60;
    return m + L(' मिनट ') + (sec < 10 ? '0' : '') + sec + L(' सेकंड');
  }
  function clockText(C) { return L('⏱ इस खंड का बचा समय: ') + mmss(setDeadline(C) - srvNow()); }
  function startClock() {
    if (tick) return;
    tick = setInterval(function () {
      var C = S.cur; if (!C || C.locked || C.pause) return;
      var now = srvNow();
      if (now >= C.exp) { finish(true); return; }
      if (now >= setDeadline(C)) { setTimeUp(); return; }
      var el = document.getElementById('apt-clock');
      if (el) el.textContent = clockText(C);
      var w = document.getElementById('apt-wait-left');
      if (w) { if (now >= minReadyAt(C)) renderStep(); else w.textContent = mmss(minReadyAt(C) - now); }
    }, 1000);
  }
  /* खंड के 40 मिनट पूरे: बचे प्रश्न ख़ाली माने जाते हैं ("पता नहीं"), और अगला पड़ाव आता है */
  function setTimeUp() {
    var C = S.cur; if (!C || C.locked) return;
    C.queue = []; C.timeUp = C.timeUp || {}; C.timeUp[C.phase] = 1; save(S);
    if (C.phase < 3) khandBoundary(); else finish(true);
  }

  function hook(payload) { try { if (window.ACS_APT_ANALYTICS) window.ACS_APT_ANALYTICS(payload); } catch (e) {} }

  /* ---------- UI टुकड़े ---------- */
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function art(id) {
    if (id && ART[id]) return '<div class="apt-img">' + AX(ART[id]) + '</div>';
    return '';
  }
  function mgName(m) { var e = MG[m]; return e ? ((e.e ? e.e + ' ' : '') + MGN(m, e.n)) : (L('समूह-') + m); }

  /* ---------- शुरुआत-कार्ड ---------- */
  function renderStart() {
    appOff();
    var C = S.cur;
    var html = '<div class="apt-card">' +
      L('<p class="apt-q">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</p>') +
      L('<p>हर खंड में 40 प्रश्न हैं। हर खंड के लिए अधिकतम 40 मिनट और कम से कम 10 मिनट हैं।</p>') +
      L('<p>पहले और दूसरे खंड के बाद 1 से 5 मिनट का विराम मिलता है। घड़ी शुरू होने के बाद रुकती नहीं है, पन्ना बंद करने पर भी नहीं।</p>') +
      L('<p>बीच में पन्ना बंद हो जाए तो इसी फ़ोन से लौटिए: परीक्षा वहीं से आगे चलेगी।</p>');
    if (C && !C.locked && C.sid) {
      html += L('<div class="apt-note">आपका एक प्रयास अधूरा है — प्रश्न ') + (Object.keys(C.ans || {}).length) + ' / ' + TOTAL + L(' हो चुके।</div>') +
        L('<div class="apt-nav"><button class="apt-btn green" id="apt-resume">▶ वहीं से जारी रखें</button> ') +
        L('<button class="apt-btn ghost" id="apt-fresh">🆕 नया प्रयास</button></div>');
    } else {
      html += L('<p>पहले अपना जन्म का साल चुनिए (सिर्फ़ आपके फ़ोन में रहेगा):</p>') +
        '<div class="apt-nav"><select id="apt-yob" class="apt-sel">' + yearOpts() + '</select> ' +
        L('<button class="apt-btn green" id="apt-go">🚀 शुरू करें</button></div>') +
        L('<div class="apt-note">🔒 आपके जवाब, अंक और जन्म का साल इसी फ़ोन में रहते हैं, और नतीजा भी इसी फ़ोन में बनता है। server आपके जवाब और अंक नहीं रखता। परीक्षा चलाने के लिए वह कुछ समय तक परीक्षा का रिकॉर्ड रखता है। उस रिकॉर्ड में यह भी रहता है कि आपके अगले खंड किन सेक्टरों से बने।<details style="margin-top:8px"><summary style="cursor:pointer;font-weight:700">server को क्या जाता है और वह क्या रखता है (पूरा ब्योरा)</summary><p>प्रश्न चुनने के लिए फ़ोन server को तीन बातें बताता है: आपका उम्र-वर्ग, आपकी रुचि के ऊपर के सेक्टरों और उद्यमों के नंबर, और इस फ़ोन पर पहले आ चुके प्रश्नों के नंबर।</p><p>उम्र-वर्ग, उद्यमों के नंबर और पहले आ चुके प्रश्नों की सूची को server अलग से सेव नहीं करता। पर ऊपर के सेक्टर परीक्षा के दौरान रिकॉर्ड में रहते हैं: खंड 2 और 3 के प्रश्न जिन सेक्टर-समूहों से चुने गए, उन सेक्टर-समूहों के नाम server रखता है, ताकि वही खंड दोबारा माँगने पर ठीक वही प्रश्न मिलें। खंड 2 और 3 के प्रश्न आपकी रुचि के सेक्टरों और उद्यमों से चुने जाते हैं। इसलिए सेक्टर-समूहों के नाम और दिए गए प्रश्नों के नंबर से आपकी रुचि की दिशा का अंदाज़ा लग सकता है।</p><p>परीक्षा के दौरान server यह रिकॉर्ड रखता है: आपके खाते की पहचान, परीक्षा की भाषा, परीक्षा का रास्ता (बैज या ₹100, और ₹100 का order-नंबर), प्रश्न चुनने का एक बेतरतीब नंबर, हर खंड के शुरू और पूरा होने का समय और समय-सीमाएँ, आपको दिए गए प्रश्नों के नंबर, और उनके सेक्टर-समूहों के नाम। आज आपने कितनी परीक्षाएँ शुरू और पूरी कीं, इसकी गिनती भी रहती है।</p><p>परीक्षा पूरी होने, छोड़ने या समय निकलने पर परीक्षा का रिकॉर्ड मिटा दिया जाता है। गिनती आपकी आख़िरी परीक्षा के 48 घंटे बाद मिटती है। भुगतान का रिकॉर्ड (जैसे ₹100 का चांस कब और किस परीक्षा में लगा) हिसाब के लिए रहता है।</p><p>नतीजा server पर तभी जाता है जब आप ₹125 देकर रिपोर्ट सेव करें।</p></details></div>');
    }
    html += '</div>';
    box.innerHTML = html;
    var g = document.getElementById('apt-go');
    if (g) g.onclick = function () {
      var y = Number(document.getElementById('apt-yob').value);
      var age = YEAR_NOW - y;
      if (age < 10) { alert(L('यह टेस्ट 10 साल की उम्र से है।')); return; }
      newAttempt(y);
    };
    var rs = document.getElementById('apt-resume');
    if (rs) rs.onclick = function () { bootQuestions(); };
    var fr = document.getElementById('apt-fresh');
    if (fr) fr.onclick = function () {
      if (!confirm(L('अधूरी परीक्षा छोड़ दी जाएगी, और वह आज की 2 परीक्षाओं में गिनी जाएगी। नई शुरू करें?'))) return;
      var sid = C.sid; S.cur = null; save(S); qsClear();
      box.innerHTML = L('<div class="apt-card"><p>परीक्षा बंद की जा रही है…</p></div>');
      var done = false, go = function () { if (done) return; done = true; regate(); };
      if (PAYAPI().finish) PAYAPI().finish({ sid: sid, cancel: true }, go); else go();
      setTimeout(go, 7000);
    };
  }
  function yearOpts() {
    var out = '', y;
    var def = S.birthYear || (YEAR_NOW - 15);
    for (y = YEAR_NOW - 10; y >= YEAR_NOW - 70; y--) {
      out += '<option value="' + y + '"' + (y === def ? ' selected' : '') + '>' + y + '</option>';
    }
    return out;
  }

  /* ---------- नया प्रयास ---------- */
  /* server की मनाही या network की चूक: साफ़ संदेश और अगला रास्ता */
  function serverFail(e, retry) {
    appOff();
    var code = e && e.code;
    if (code === 'limit') { renderGateCard('limit'); return; }
    if (code === 'pay' || code === 'login') { renderGateCard('buy'); if (PAYAPI().wireBuy) PAYAPI().wireBuy(); return; }
    if (code === 'open') { renderGateCard('open', e); return; }
    box.innerHTML = '<div class="apt-card"><p>⚠️ ' + esc((e && e.message) || L('server से जवाब नहीं मिला।')) + '</p>' +
      L('<p>net देखकर दोबारा दबाइए।</p><div class="apt-nav"><button class="apt-btn blue" id="apt-retry">🔄 दोबारा</button></div></div>');
    var b = document.getElementById('apt-retry'); if (b) b.onclick = retry;
  }

  /* ---- नई परीक्षा: server हक़ और दिन की गिनती जाँचकर पहला खंड देता है ---- */
  function newAttempt(yob) {
    S.birthYear = yob; save(S);
    appOn();
    box.innerHTML = L('<div class="apt-card"><p>प्रश्न आ रहे हैं…</p></div>');
    if (!PAYAPI().start) { serverFail({ message: L('⚠️ भुगतान-सुविधा अभी लोड नहीं हुई — पन्ना दोबारा खोलें।') }, function () { newAttempt(yob); }); return; }
    PAYAPI().start({ lang: LANG, band: bandOf(YEAR_NOW - yob), seen: Object.keys(S.used).slice(-4000) }, function (err, r) {
      if (err) { serverFail(err, function () { newAttempt(yob); }); return; }
      sync(r);
      S.cur = { n: S.attempts.length + 1, sid: r.sid, exp: r.exp, band: bandOf(YEAR_NOW - yob), phase: 1,
                ids: { k1: r.questions.map(function (q) { return q.id; }), k2: [], k3: [] }, begin: { 1: r.releaseAt }, dl: { 1: r.deadline },
                queue: null, doneOrder: null, pos: 0, ans: {}, topMg: [], topU: null, locked: false };
      qsClear(); qsPut(r.sid, r.questions);
      save(S); renderStep(); startClock();
    });
  }

  /* ---- अधूरी परीक्षा पर लौटना: प्रश्न इसी फ़ोन से उठते हैं ---- */
  function bootQuestions() {
    var C = S.cur; if (!C || !C.sid) { S.cur = null; save(S); renderStart(); return; }
    var qs = qsLoad(C.sid);
    if (!qs.length) { renderGateCard('open', { sid: C.sid }); return; }
    window.APT_POOL = qs;
    appOn();
    if (srvNow() >= C.exp) { finish(true); return; }
    startClock();
    if (C.pause) { pauseScreen(); return; }
    renderStep();
  }

  /* ---- खंड-सीमा: रुझान फ़ोन में गिना जाता है; server को सिर्फ़ ऊपर के सेक्टर/उद्यम बताए जाते हैं ---- */
  function khandBoundary() {
    var C = S.cur, qmap = byId(poolAll().concat(D.questions));
    var T = tally(qmap, C.ans);
    if (C.phase === 1) {
      var top = rank(T.mg).filter(function (x) { return x.avg > 0; }).slice(0, 4).map(function (x) { return x.k; });
      if (top.length < 3) top = rank(T.mg).slice(0, 3).map(function (x) { return x.k; });
      C.topMg = top; C.topU = null;
    } else {
      var topU = {}; rank(T.udy).slice(0, 30).forEach(function (x, i) { if (x.avg > 0) topU[x.k] = 30 - i; });
      C.topU = topU;
    }
    C.phase = C.phase + 1; C.queue = null; C.doneOrder = null;
    C.pause = { at: srvNow(), set: C.phase, marked: false }; save(S);
    pauseScreen();
  }

  /* ---- विराम (1 से 5 मिनट): कहानी दिखती है, और इसी बीच अगले खंड के प्रश्न server से आ जाते हैं ---- */
  var pauseTimer = null;
  /* विराम (v2.2): पहली माँग server पर पिछला खंड "पूरा" दर्ज करती है और विराम शुरू करती है।
     विराम के कम से कम 1 मिनट बाद वाली माँग ही अगले खंड के प्रश्न लाती है, और घड़ी उसी पल से 40 मिनट चलती है। */
  function pauseScreen() {
    var C = S.cur; if (!C || !C.pause) { renderStep(); return; }
    var setNo = C.pause.set, kk = 'k' + setNo, failed = false, busy = false, want = false;
    var st = (D.stories || []).filter(function (x) { return (x.mg || []).indexOf(C.topMg[0]) >= 0; })[0] || (D.stories || [])[setNo % ((D.stories || [1]).length)] || null;
    appOn();
    box.innerHTML = '<div class="apt-card apt-katha">' +
      L('<p class="apt-q">☕ विराम: खंड ') + (setNo - 1) + L(' पूरा हुआ</p>') +
      L('<p>कम से कम 1 मिनट रुकिए। 5 मिनट बाद अगला खंड अपने-आप शुरू हो जाएगा।</p>') +
      (st ? art(st.img) + '<p class="apt-q">📖 ' + esc(ST(st, 'title')) + '</p><p>' + esc(ST(st, 'text')) + '</p>' : '') +
      '<p class="apt-prog" id="apt-pause-left"></p>' +
      '<p id="apt-pause-msg" style="color:var(--muted,#666);font-size:16px"></p>' +
      '<div class="apt-nav"><button class="apt-btn blue" id="apt-next" disabled>' + L('⏳ रुकिए…') + '</button></div></div>';
    toTop();
    function setMsg(t) { var m = document.getElementById('apt-pause-msg'); if (m) m.textContent = t; }
    function stop() { if (pauseTimer) { clearInterval(pauseTimer); pauseTimer = null; } }
    function ask() {
      if (busy) return;
      busy = true; failed = false; setMsg(''); paint();
      if (!PAYAPI().next) { busy = false; failed = true; paint(); return; }
      PAYAPI().next({ sid: C.sid, set: setNo, band: C.band, topMg: C.topMg, topU: C.topU || {}, seen: Object.keys(S.used).slice(-4000) }, function (err, r) {
        busy = false;
        if (S.cur !== C || C.locked || !C.pause) return;
        if (err) {
          if (err.code === 'early') { C.pause.retryAt = srvNow() + Math.min(60, (err.waitSec || 5)) * 1000 + 500; paint(); return; }
          if (err.code === 'expired' || err.code === 'gone') { stop(); finish(true); return; }
          failed = true; paint(); return;
        }
        sync(r);
        if (r.pause) { C.pause.at = r.doneAt; C.pause.marked = true; delete C.pause.retryAt; save(S); paint(); return; }
        qsPut(C.sid, r.questions);
        C.ids[kk] = r.questions.map(function (q) { return q.id; });
        C.dl = C.dl || {}; C.dl[setNo] = r.deadline; C.begin[setNo] = r.releaseAt;
        stop(); delete C.pause; save(S); renderStep();
      });
    }
    function paint() {
      var btn = document.getElementById('apt-next'), lf = document.getElementById('apt-pause-left');
      if (!btn || S.cur !== C || !C.pause) { stop(); return; }
      if (srvNow() >= C.exp) { stop(); finish(true); return; }
      if (failed) { btn.disabled = false; btn.textContent = L('🔄 दोबारा'); btn.onclick = ask; if (lf) lf.textContent = ''; setMsg(L('⚠️ अगले खंड के प्रश्न नहीं आ पाए। net देखकर "दोबारा" दबाइए।')); return; }
      if (busy) { btn.disabled = true; btn.onclick = null; btn.textContent = C.pause.marked ? L('⏳ अगले खंड के प्रश्न आ रहे हैं…') : L('⏳ रुकिए…'); return; }
      var holding = C.pause.retryAt && srvNow() < C.pause.retryAt;
      if (!C.pause.marked) { btn.disabled = true; btn.onclick = null; btn.textContent = L('⏳ रुकिए…'); if (!holding) ask(); return; }
      var el = srvNow() - C.pause.at, minMs = RULES.pauseMinSec * 1000, maxMs = RULES.pauseMaxSec * 1000;
      if (holding) { btn.disabled = true; btn.onclick = null; btn.textContent = L('⏳ रुकिए…'); return; }
      if (el >= maxMs || (want && el >= minMs)) { ask(); return; }
      if (el >= minMs) {
        btn.disabled = false; btn.textContent = L('अगला खंड शुरू करें ➜'); btn.onclick = function () { want = true; ask(); };
        if (lf) lf.textContent = L('अगला खंड अपने-आप शुरू होगा: ') + mmss(maxMs - el);
      } else {
        btn.disabled = true; btn.onclick = null; btn.textContent = L('⏳ रुकिए…');
        if (lf) lf.textContent = L('विराम का कम से कम समय बाक़ी: ') + mmss(minMs - el);
      }
    }
    stop(); pauseTimer = setInterval(paint, 1000); paint();
  }

  /* ---- खंड के सब प्रश्न हो गए, पर कम से कम समय बाक़ी है: तब तक जवाब देखे और बदले जा सकते हैं ---- */
  function renderWait() {
    var C = S.cur;
    appOn();
    box.innerHTML = '<div class="apt-card">' +
      L('<p class="apt-q">✅ इस खंड के सब प्रश्न हो गए।</p>') +
      L('<p>इस खंड का कम से कम समय अभी बाक़ी है:</p>') +
      '<p class="apt-prog" id="apt-wait-left">' + mmss(minReadyAt(C) - srvNow()) + '</p>' +
      L('<p>तब तक "← पिछला" दबाकर अपने जवाब देख सकते हैं और बदल सकते हैं।</p>') +
      L('<div class="apt-nav"><button class="apt-btn ghost" id="apt-prev">← पिछला</button> ') +
      L('<button class="apt-btn ghost apt-mini" id="apt-cancel">❌ परीक्षा छोड़ें</button></div></div>');
    document.getElementById('apt-prev').onclick = function () {
      if (C.doneOrder && C.doneOrder.length) { var back = C.doneOrder.pop(); C.queue = C.queue || []; C.queue.unshift(back); }
      save(S); renderStep();
    };
    var cb = document.getElementById('apt-cancel'); if (cb) cb.onclick = cancelAttempt;
  }

  function seq() { var C = S.cur; return C.ids.k1.concat(C.ids.k2, C.ids.k3); }
  function currentPhaseIds() {
    var C = S.cur;
    if (C.phase === 1) return C.ids.k1;
    if (C.phase === 2) return C.ids.k2;
    return C.ids.k3;
  }
  function ensureQueue() {
    var C = S.cur;
    if (!C.queue) {
      var ids = currentPhaseIds();
      C.queue = ids.filter(function (id) { return !(C.ans[id] && answeredRaw(C.ans[id])); });
      C.doneOrder = ids.filter(function (id) { return C.ans[id] && answeredRaw(C.ans[id]); });
      save(S);
    }
    if (!C.doneOrder) C.doneOrder = [];
  }
  function answeredRaw(a) {
    if (typeof a.first === 'number' && typeof a.last === 'number') return true;
    return typeof a.v === 'number' || typeof a.v11 === 'number';
  }
  function advance() {
    var C = S.cur;
    var cur = C.queue.shift();
    if (typeof cur !== 'undefined') C.doneOrder.push(cur);
  }
  function renderStep() {
    appOn();
    var C = S.cur;
    ensureQueue();
    if (C.queue.length === 0) {
      if (srvNow() < minReadyAt(C)) { renderWait(); return; }
      if (C.phase === 1 || C.phase === 2) { khandBoundary(); return; }
      renderSubmit(); return;
    }
    var qmap = byId(poolAll().concat(D.questions));
    var qid = C.queue[0];
    var q = qmap[qid];
    if (!q) { C.queue.shift(); save(S); renderStep(); return; }
    var globalDone = (C.phase - 1) * PER_KHAND + C.doneOrder.length;
    var head = L('<div class="apt-top"><span class="apt-prog">खंड ') + C.phase + L(' · प्रश्न ') + (globalDone + 1) + ' / ' + TOTAL + '</span>' +
      '<span class="apt-prog" id="apt-clock">' + clockText(C) + '</span>' +
      L('<button class="apt-btn ghost apt-mini" id="apt-cancel" style="margin-left:8px">❌ परीक्षा छोड़ें</button></div>');
    var body = '<p class="apt-q apt-qt">' + esc(QT(q)) + '</p>';
    var a = C.ans[q.id] || {};
    if (q.type === 'scale') body += scaleUI(q, a);
    else if (q.type === 'pick') body += pickUI(q, a);
    else body += optUI(q, a);
    body += art(q.img);
    var nav = '<div class="apt-nav">' +
      (C.doneOrder.length > 0 ? L('<button class="apt-btn ghost" id="apt-prev">← पिछला</button> ') : '') +
      '<button class="apt-btn blue" id="apt-skiporgo">' + (answered(q, a) ? L('आगे ➜') : L('⏭ अभी छोड़ें (यह प्रश्न फिर आएगा)')) + '</button></div>';
    box.innerHTML = '<div class="apt-card">' + head + body + nav + '</div>';
    bind(q);
    var pv = document.getElementById('apt-prev');
    if (pv) pv.onclick = function () {
      if (!C.doneOrder.length) return;
      var back = C.doneOrder.pop();
      C.queue.unshift(back);
      save(S); renderStep();
    };
    document.getElementById('apt-skiporgo').onclick = function () {
      var aa = C.ans[q.id] || {};
      if (answered(q, aa)) { advance(); }
      else { var cur = C.queue.shift(); C.queue.push(cur); }
      save(S); renderStep();
    };
    var cb = document.getElementById('apt-cancel');
    if (cb) cb.onclick = cancelAttempt;
  }
  /* ---------- परीक्षा-रद्द (Founder-नियम, 22-Jul) ----------
     बीच में कभी भी छोड़ने का विकल्प — पक्का करके प्रयास हटे, dashboard लौटें। */
  function backUrl() {
    try { return sessionStorage.getItem('acs_apt_back') || '/dashboard/'; } catch (e) { return '/dashboard/'; }
  }
  function cancelAttempt() {
    if (!confirm(L('पक्का परीक्षा छोड़नी है? अब तक के जवाब मिट जाएँगे, और यह परीक्षा आज की 2 परीक्षाओं में गिनी जाएगी।'))) return;
    var C = S.cur, sid = C && C.sid;
    appOff();
    if (pauseTimer) { clearInterval(pauseTimer); pauseTimer = null; }
    S.cur = null; save(S); qsClear();
    box.innerHTML = L('<div class="apt-card"><p>परीक्षा बंद की जा रही है…</p></div>');
    var gone = false, go = function () { if (gone) return; gone = true; location.href = backUrl(); };
    if (sid && PAYAPI().finish) PAYAPI().finish({ sid: sid, cancel: true }, go); else go();
    setTimeout(go, 7000);
  }
  function answered(q, a) {
    if (q.type === 'pick') return typeof a.first === 'number' && typeof a.last === 'number';
    return typeof a.v === 'number' || typeof a.v11 === 'number';
  }
  function scaleUI(q, a) {
    /* (28-Jul, Founder-मुहर — विकल्प 2+4 मिश्रण) देहाती-सरल: तीन बटन + नीचे सीधी
       हिंदी — सब उम्र पर। गिनती 11-बिंदु नक़्शे के तीन बिंदु (−5/0/+5) — v3.8 भीतरी-
       गणित अटल; 😐=0 की "जानता नहीं" क़ीमत यथावत। पुरानी −5…+5 पट्टी निरस्त। */
    var F = [ { v: -5, e: '👎', t: L('पसंद नहीं') }, { v: 0, e: '😐', t: L('पता नहीं') }, { v: 5, e: '👍', t: L('पसंद है') } ];
    var h = '<div class="apt-faces">', i;
    for (i = 0; i < 3; i++) {
      h += '<button class="apt-face' + (a.v11 === F[i].v ? ' on' : '') + '" data-v11="' + F[i].v + '" style="min-width:96px">' +
        F[i].e + '<small style="display:block;font-size:16px;font-weight:700">' + F[i].t + '</small></button>';
    }
    return h + L('</div><p class="apt-hint">😐 पता नहीं — यह भी ठीक जवाब है; ऐसे काम आगे खोजने लायक़ गिने जाते हैं।</p>');
  }
  function pickUI(q, a) {
    var h = L('<p class="apt-hint">पहला दबाव = ⭐ सबसे पहले · दूसरा दबाव = 🚫 सबसे कम</p><div class="apt-opts">');
    q.opts.forEach(function (o, i) {
      var cls = a.first === i ? ' first' : (a.last === i ? ' last' : '');
      var tag = a.first === i ? L('<span class="apt-tag">⭐ सबसे पहले</span>') : (a.last === i ? L('<span class="apt-tag">🚫 सबसे कम</span>') : '');
      h += '<button class="apt-opt' + cls + '" data-i="' + i + '">' + (o.img && ART[o.img] ? AX(ART[o.img]) : '') + esc(OT(q, i, o)) + tag + '</button>';
    });
    return h + '</div>';
  }
  function optUI(q, a) {
    var h = '<div class="apt-opts' + (q.type === 'story' ? ' apt-story' : '') + '">';
    q.opts.forEach(function (o, i) {
      h += '<button class="apt-opt' + (a.v === i ? ' on' : '') + '" data-i="' + i + '">' + esc(OT(q, i, o)) + '</button>';
    });
    return h + '</div>';
  }
  function bind(q) {
    var C = S.cur, a = C.ans[q.id] = C.ans[q.id] || {};
    var inApp = (document.body && document.body.classList && document.body.classList.contains('apt-app'));
    var keep = inApp ? box.scrollTop : window.scrollY;
    function done() {
      save(S); var y = keep; renderStep();
      if (inApp) box.scrollTop = y; else window.scrollTo(0, y);
    }
    Array.prototype.forEach.call(box.querySelectorAll('[data-v]'), function (b) {
      b.onclick = function () { a.v = Number(b.getAttribute('data-v')); advance(); done(); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-v11]'), function (b) {
      b.onclick = function () { a.v11 = Number(b.getAttribute('data-v11')); advance(); done(); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-i]'), function (b) {
      b.onclick = function () {
        var i = Number(b.getAttribute('data-i'));
        if (q.type === 'pick') {
          if (typeof a.first !== 'number') a.first = i;
          else if (a.first === i) { delete a.first; delete a.last; }
          else { a.last = i; }
          if (typeof a.first === 'number' && typeof a.last === 'number') advance();
        } else { a.v = i; advance(); }
        done();
      };
    });
  }

  /* ---------- अंतिम जमा (प्रति-attempt lock) ---------- */
  function renderSubmit() {
    appOn();
    var C = S.cur, got = Object.keys(C.ans).length;
    box.innerHTML = L('<div class="apt-card"><p class="apt-q">🏁 सब खंड पूरे!</p>') +
      L('<p>जवाब मिले: ') + got + ' / ' + TOTAL + L('। जमा करने के बाद यह प्रयास बंद (lock) हो जाएगा।</p>') +
      L('<p>चाहें तो "← पिछला" से पीछे जाकर जवाब बदल लें।</p>') +
      L('<div class="apt-nav"><button class="apt-btn ghost" id="apt-prev">← पिछला</button> ') +
      L('<button class="apt-btn green" id="apt-lock">✅ अंतिम जमा</button> ') +
      L('<button class="apt-btn ghost apt-mini" id="apt-cancel">❌ परीक्षा छोड़ें</button></div></div>');
    document.getElementById('apt-prev').onclick = function () {
      ensureQueue();
      if (C.doneOrder && C.doneOrder.length) {
        var back = C.doneOrder.pop();
        C.queue = C.queue || [];
        C.queue.unshift(back);
      }
      save(S); renderStep();
    };
    document.getElementById('apt-lock').onclick = function () {
      if (confirm(L('पक्का जमा करें? इसके बाद यह प्रयास बदलेगा नहीं।'))) finish(false);
    };
    var cb2 = document.getElementById('apt-cancel');
    if (cb2) cb2.onclick = cancelAttempt;
  }
  function finish(byClock) {
    var C = S.cur; if (!C || C.locked) return;
    C.locked = true; delete C.pause;
    if (pauseTimer) { clearInterval(pauseTimer); pauseTimer = null; }
    Object.keys(C.ans).forEach(function (id) { S.used[id] = 1; });
    S.attempts.push({ n: C.n, band: C.band, doneAt: new Date().toISOString().slice(0, 10), byClock: !!byClock });
    save(S);
    tellFinish(C.sid, 0);       /* server को सिर्फ़ यह बताया जाता है कि परीक्षा पूरी हुई; कोई जवाब या नतीजा नहीं जाता */
    renderResult(byClock);
  }
  function tellFinish(sid, tries) {
    if (!sid || !PAYAPI().finish) return;
    PAYAPI().finish({ sid: sid }, function (err) {
      if (!err || tries >= 3) return;
      if (err.code === 'early') { setTimeout(function () { tellFinish(sid, tries + 1); }, Math.min(60, (err.waitSec || 10)) * 1000 + 500); return; }
      if (!err.code) setTimeout(function () { tellFinish(sid, tries + 1); }, 15000);
    });
  }
  /* सेक्टर का स्कोर 0 से 100: औसत अंक (−5 से +5) को 100 के पैमाने पर रखा जाता है */
  function secScore(x) { return Math.max(0, Math.min(100, Math.round((x.avg + 5) * 10))); }

  function buildReportText(mgR, picks, C) {
    var lines = [];
    lines.push(L('ACS अभिरुचि-टेस्ट रिपोर्ट — ') + new Date().toLocaleDateString(DLOC));
    lines.push(L('सबसे मज़बूत सेक्टर (स्कोर 100 में से):'));
    mgR.slice(0, 5).forEach(function (x, i) { lines.push((i + 1) + '. ' + mgName(x.k) + ': ' + secScore(x)); });
    if (picks && picks.length) {
      lines.push(L('सुझाए कोर्स:'));
      picks.forEach(function (p, i) { lines.push((i + 1) + '. ' + UN(p.u.name, p.u.n)); });
    }
    lines.push(L('(यह रुचि की दिशा है — योग्यता का प्रमाण नहीं।)'));
    return lines.join('\n');
  }
  function wireReportSave(mgR, picks, C) {
    var btn = document.getElementById('apt-report-save-btn');
    var msg = document.getElementById('apt-report-msg');
    if (!btn) return;
    var reportText = buildReportText(mgR, picks, C);
    btn.onclick = function () {
      if (!window.ACS_APT_PAY || !window.ACS_APT_PAY.saveReport) {
        if (msg) msg.textContent = L('⚠️ भुगतान-सुविधा अभी लोड नहीं हुई — पन्ना दोबारा खोलें।');
        return;
      }
      btn.disabled = true;
      if (msg) msg.textContent = L('भुगतान तैयार किया जा रहा है…');
      window.ACS_APT_PAY.saveReport(reportText, function (err) {
        btn.disabled = false;
        if (err) { if (msg) msg.textContent = L('नहीं हो पाया: ') + (err.message || err); return; }
        showSavedOptions(reportText);
      });
    };
  }
  function showSavedOptions(reportText) {
    var wrap = document.getElementById('apt-report-save-wrap');
    var msg = document.getElementById('apt-report-msg');
    if (msg) { msg.textContent = L('✅ रिपोर्ट सेव हो गई।'); msg.className = 'msg ok'; }
    if (wrap) {
      wrap.innerHTML =
        L('<button class="apt-btn blue" id="apt-report-print">🖨️ Print करें</button> ') +
        '<a class="apt-btn green" id="apt-report-wa" target="_blank" rel="noopener" href="https://wa.me/?text=' +
        encodeURIComponent(reportText) + L('">📲 WhatsApp करें</a>');
      var pb = document.getElementById('apt-report-print');
      if (pb) pb.onclick = function () { window.print(); };
      /* (v2.9, खेप 3-ख भाग 1) सहेजी हुई रिपोर्ट का जाँच-नंबर और मान्य तिथि: पन्ने पर (ताकि छपे) और WhatsApp के पाठ में */
      if (window.ACS_APT_PAY && window.ACS_APT_PAY.reportNumber) window.ACS_APT_PAY.reportNumber(function (err, d) {
        if (err || !d || !d.found || !d.reportNo) return;
        var dd = String(d.validUntil || '').split('-'), till = dd.length === 3 ? dd[2] + '.' + dd[1] + '.' + dd[0] : '';
        var line = L('रिपोर्ट नंबर: ') + d.reportNo + L(' · online जाँच: acslearn.com/verify · मान्य: ') + till;
        var el = document.createElement('p'); el.id = 'apt-report-no'; el.style.cssText = 'font-size:17px;font-weight:700;margin:10px 0 0';
        el.textContent = line; wrap.appendChild(el);
        var wa = document.getElementById('apt-report-wa'); if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(reportText + '\n' + line);
      });
    }
  }

  function renderResult(byClock) {
    var C = S.cur, qmap = byId(poolAll().concat(D.questions));
    var T = tally(qmap, C.ans);
    var mgR = rank(T.mg), udyR = rank(T.udy).filter(function (x) { return x.avg > 0; });
    hook({ band: C.band, top: mgR.slice(0, 4).map(function (x) { return x.k; }), m: new Date().getMonth() + 1 });
    appOn();
    box.innerHTML = L('<div class="apt-card"><p>नतीजा बन रहा है…</p></div>');
    loadMany(['/assets/udyam_data.js'].concat(UDN_URL ? [UDN_URL] : []), function () {
      var SEC = (window.ALL_SECTORS || (typeof ALL_SECTORS !== 'undefined' ? ALL_SECTORS : []));
      var byN = {}; SEC.forEach(function (u) { byN[u.n] = u; });
      var picks = udyR.slice(0, 12).map(function (x) { return { u: byN[x.k], score: x.avg }; }).filter(function (p) { return p.u; });
      picks.sort(function (a, b) { return (b.u.course ? 1 : 0) - (a.u.course ? 1 : 0) || b.score - a.score; });
      var top5 = mgR.slice(0, 5);
      /* पिछला रुझान सिर्फ़ इसी फ़ोन में रखा जाता है (server पर कुछ नहीं जाता) */
      S.prev = { at: Date.now(),
        sec: top5.map(function (x) { return { nm: mgName(x.k), sc: secScore(x) }; }),
        mg: mgR.slice(0, 4).map(function (x) { return mgName(x.k); }),
        udy: picks.slice(0, 8).map(function (p) {
          return { n: p.u.n, nm: UN(p.u.name, p.u.n), c: p.u.course || '', s: Math.round((p.score || 0) * 10) / 10 }; }) };
      save(S);
      picks = picks.slice(0, 5);
      var h = '';
      if (byClock) h += L('<div class="apt-note">⏱ समय पूरा हो गया। जितने जवाब मिले, उन्हीं से नतीजा बना।</div>');
      h += '<p class="apt-q">' + (C.band === 1 ? L('🌟 यह दुनिया तुम्हें बुला रही है!') : L('🏆 आपकी रुचि की दिशा')) + '</p>';
      if (!picks.length && !mgR.length) {
        h += L('<p>जवाब बहुत कम मिले — नतीजा नहीं बन पाया। नया प्रयास कीजिए।</p>');
      } else {
        if (top5.length) {
          h += L('<p class="apt-q" style="font-size:19px">⭐ आपके सबसे मज़बूत सेक्टर (स्कोर 100 में से):</p>') + '<div class="apt-opts">';
          top5.forEach(function (x, i) {
            h += '<div class="apt-row apt-course"><span class="nm">' + (i + 1) + '. ' + (i === 0 ? '<b>' + mgName(x.k) + '</b>' : mgName(x.k)) +
              '</span> <span class="apt-chip">' + secScore(x) + '</span></div>';
          });
          h += '</div>';
          /* v2.3: करियर-पेज का वादा है कि पूरे 24 सेक्टरों के अंक घटते क्रम में मिलते हैं; इसलिए ऊपर के 5 के नीचे पूरी सूची भी */
          h += L('<p class="apt-q" style="font-size:19px">📊 सभी 24 सेक्टर के स्कोर (घटते क्रम में):</p>') + '<div class="apt-opts" id="apt-all24" style="text-align:left">';
          var gotMg = {}, ROW24 = 'display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 2px;border-bottom:1px solid #E3E7EE';
          mgR.forEach(function (x) {
            if (!(x.k >= 1 && x.k <= 24)) return;
            gotMg[x.k] = 1;
            h += '<div class="apt-row" style="' + ROW24 + '"><span class="nm">' + mgName(x.k) + '</span> <span class="apt-chip">' + secScore(x) + '</span></div>';
          });
          for (var mm = 1; mm <= 24; mm++) {
            if (!gotMg[mm]) h += '<div class="apt-row" style="' + ROW24 + '"><span class="nm">' + mgName(mm) + '</span> <span class="apt-hint">' + L('इसका प्रश्न नहीं आया') + '</span></div>';
          }
          h += '</div>';
        }
        h += L('<p class="apt-q" style="font-size:19px">📚 आपके लिए कोर्स (घटते क्रम):</p>');
        if (!picks.length) h += L('<p>अभी कोई कोर्स-दिशा साफ़ नहीं उभरी — नए प्रयास में और जवाब दीजिए।</p>');
        h += '<div class="apt-opts">';
        picks.forEach(function (p, i) {
          var nm = UN(p.u.name, p.u.n);
          var nmHtml = p.u.course ? ('<a href="' + p.u.course + '" style="color:inherit;text-decoration:underline">' + esc(nm) + '</a>') : esc(nm);
          h += '<div class="apt-row apt-course"><span class="nm">' + (i + 1) + '. ' + nmHtml + '</span> ';
          if (p.u.course) h += '<a class="apt-btn apt-mini" href="' + p.u.course + L('">📚 पढ़ें — कोर्स उपलब्ध ✅</a>');
          else h += L('<span class="apt-hint">पाठ जल्द जुड़ेंगे</span> <a class="apt-btn2 apt-mini" href="https://wa.me/919431210092?text=') +
            encodeURIComponent(L('मुझे यह कोर्स चाहिए: ') + nm + L(' (उद्यम ') + p.u.n + ')') + L('">📲 यह कोर्स माँगें</a>');
          h += '</div>';
        });
        h += L('</div><p>इनमें से किसी 1 से शुरुआत कीजिए — बाक़ी बाद में।</p>');
        var unMg = Object.keys(T.un);
        if (unMg.length) h += L('<div class="apt-note">🔍 अनजान क्षेत्र: ') + unMg.slice(0, 6).map(function (m) { return mgName(Number(m)); }).join(' · ') + L(' — इन्हें जानना भी एक राह है।</div>');
      }
      h += L('<div class="apt-note">📝 यह रुचि की दिशा है — योग्यता का प्रमाण नहीं।</div>') +
        L('<div class="apt-note">📱 यह नतीजा सिर्फ़ इसी फ़ोन में है। server इसे बिना ₹125 के सेव नहीं करता, इसलिए फ़ोन बदलने पर यह वापस नहीं मिलेगा।</div>') +
        L('<div class="apt-note">📄 ₹125 जमा करें तो यह रिपोर्ट सेव हो जाएगी, और Print तथा WhatsApp के विकल्प खुल जाएँगे। हर नई परीक्षा की रिपोर्ट अलग ₹125 में सेव होती है।</div>') +
      L('<div class="apt-note">₹125 की यह फ़ीस वापस नहीं होती। तकनीकी ग़लती से पैसा दो बार या ग़लत कट जाए, तो वह अलग से ठीक किया जाता है।</div>') +
        '<div id="apt-report-save-wrap" class="apt-nav">' +
        L('<button class="apt-btn gold" id="apt-report-save-btn">📄 यह रिपोर्ट सेव करें (₹125)</button></div>') +
        '<p id="apt-report-msg" style="color:var(--muted,#666);font-size:16px"></p>' +
        L('<div class="apt-nav"><button class="apt-btn green" id="apt-again">🆕 नया प्रयास (ताज़ा प्रश्न)</button></div>');
      box.innerHTML = '<div class="apt-card">' + h + '</div>';
      document.getElementById('apt-again').onclick = function () { S.cur = null; save(S); regate(); };
      wireReportSave(mgR, picks, C);
      toTop();
    });
  }

  /* ---- शुरुआत ---- */
  sync(GATE);
  var C0 = S.cur;
  if (C0 && (C0.locked || !C0.sid)) { S.cur = null; save(S); }   /* बंद हो चुका, या पुराने इंजन का अधूरा प्रयास */
  renderStart();

  } /* ==== initEngine() समाप्त ==== */
})();
