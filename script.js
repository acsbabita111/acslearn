/* ════════════════════════════════════════════════════════════════════════
   ACS script.js  —  साझा page-JS (परत-2)  ·  v2 (साफ़, नए instruction अनुसार)
   ------------------------------------------------------------------------
   निर्भरता (इससे पहले load हों):
     acs-config.js   → window.ACS_CONFIG   (रंग/फ़ॉन्ट/org/भाषा)
     links.js        → window.ACS_LINKS    (10 अटल menu + paths)
     acs-translate.js→ window.ACS_T        (17 भाषाओं के labels)

   यह फ़ाइल क्या करती है:
     • slide-menu — सिर्फ़ links.js के 10 items से (कोई hardcode नहीं, कोई 11वाँ नहीं)
     • menu-labels — acs-translate से (भाषा अनुसार)
     • भाषा-panel · WhatsApp बटन · gallery slideshow
     • होल-fix: ESC से बंद · focus लौटे · click-बाहर बंद
     • 10-मिनट निष्क्रिय → auto-logout (hook)
     • नया version → "Update करें" toast (अपने-आप reload नहीं — काम न टूटे)

   पुराना 50+ item menu व हर hardcode यहाँ से पूरी तरह हटा दिया गया।
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── छोटे सहायक ── */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var SRC = (window.ACS_CONFIG && window.ACS_CONFIG.langs && window.ACS_CONFIG.langs.source) || "hi";

  /* links.js key → acs-translate key (दोनों के नाम अलग थे — यहाँ मिलाए) */
  var T_KEY = {
    home:"home", mission:"mission", salah:"counseling", udyam:"industries",
    courses:"courses", register:"registration", verify:"certificate",
    network:"network", vani:"vani", contact:"contact"
  };

  /* कौन-सी भाषा? — page की असली भाषा:
     (1) URL का folder (/hi/, /en/ …) → वही  · (2) पहले चुनी (याद) · (3) मूल (हिंदी)।
     browser-अंदाज़ा जान-बूझकर नहीं — वरना हिंदी page पर menu अंग्रेज़ी बन सकता है।   */
  function currentLang() {
    var m = (location.pathname || "").match(/^\/([a-z]{2})\//);
    if (m) return m[1];
    try { var saved = localStorage.getItem("acs_lang"); if (saved) return saved; } catch (e) {}
    return SRC;
  }

  /* किसी menu-item का सही label (मूल भाषा = links का साफ़ label; बाक़ी = acs-translate) */
  function menuLabel(item, lang) {
    if (lang !== SRC && window.ACS_T) return window.ACS_T.get(T_KEY[item.key] || item.key, lang);
    return item.icon + " " + item.text;
  }

  /* toast दिखाओ (style.css का .acs-toast) */
  function toast(msg, type) {
    var t = $("#acsToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "acsToast"; t.className = "acs-toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "acs-toast " + (type === "err" ? "err" : "ok");
    requestAnimationFrame(function () { t.classList.add("show"); });
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }
  window.acsToast = toast;

  /* ════════════ 1) SLIDE-MENU — सिर्फ़ links.js के 10 items ════════════ */
  function buildMenu() {
    if (!window.ACS_LINKS) { console.error("ACS: links.js नहीं मिला — menu नहीं बना।"); return; }

    var lang  = currentLang();
    var items = window.ACS_LINKS.build(lang);          // [{key,icon,href,text}]
    var login = window.ACS_LINKS.login || { icon:"🔑", label:{} };

    var panel = $("#menuPanel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "menu-panel"; panel.id = "menuPanel"; panel.hidden = true;
      var nav = $(".navbar");
      if (nav) nav.insertAdjacentElement("afterend", panel); else document.body.prepend(panel);
    }

    var links = items.map(function (it) {
      return '<li><a href="' + it.href + '">' + menuLabel(it, lang) + "</a></li>";
    }).join("");

    var loginText = (login.label && (login.label[lang] || login.label.hi)) || "Login / Dashboard";

    panel.innerHTML =
      '<div class="menu-panel-header">' +
        "<h3>ACS Menu</h3>" +
        '<button id="closeMenuPanel" type="button" aria-label="मेन्यू बंद करें">✕</button>' +
      "</div>" +
      '<ul class="menu-panel-links">' + links +
        '<li><a href="/dashboard/" class="acs-login">' + login.icon + " " + loginText + "</a></li>" +
      "</ul>";
  }

  /* ════════════ 2) भाषा-panel ════════════ */
  function buildLangPanel() {
    var lang = currentLang();
    var NAMES = {
      hi:"हिंदी", en:"English", kn:"ಕನ್ನಡ", mr:"मराठी", bn:"বাংলা", te:"తెలుగు",
      ta:"தமிழ்", gu:"ગુજરાતી", pa:"ਪੰਜਾਬੀ", ur:"اردو", ml:"മലയാളം", or:"ଓଡ଼ିଆ",
      as:"অসমীয়া", ne:"नेपाली", sw:"Kiswahili", fr:"Français", es:"Español",
      pt:"Português", ar:"العربية", id:"Indonesia", vi:"Tiếng Việt", ha:"Hausa"
    };
    var list = (window.ACS_CONFIG && window.ACS_CONFIG.langs.google) || ["hi","en"];

    var panel = $("#languagePanel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "language-panel"; panel.id = "languagePanel"; panel.hidden = true;
      var anchor = $(".trust-strip") || $(".navbar");
      if (anchor) anchor.insertAdjacentElement("afterend", panel); else document.body.prepend(panel);
    }

    var opts = list.map(function (code) {
      var on = code === lang ? " active" : "";
      var nm = (NAMES[code] || code) + (code === lang ? " ✓" : "");
      return '<button class="lang-opt' + on + '" data-lang="' + code + '" type="button">' + nm + "</button>";
    }).join("");

    panel.innerHTML =
      '<div class="lang-panel-header">' +
        "<h3>भाषा चुनें / Select Language</h3>" +
        '<button id="closeLangPanel" type="button" aria-label="भाषा पैनल बंद करें">✕</button>' +
      "</div>" +
      '<div class="lang-grid">' + opts + "</div>";
  }

  /* ════════════ 3) WhatsApp बटन ════════════ */
  function buildWhatsApp() {
    if ($(".whatsapp-float")) return;
    var url = (window.ACS_CONFIG && window.ACS_CONFIG.org.whatsapp) || "https://wa.me/919431210092";
    var a = document.createElement("a");
    a.className = "whatsapp-float"; a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "WhatsApp पर संपर्क करें");
    a.innerHTML =
      '<svg class="wa-svg" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" ' +
      'd="M16.02 3C8.85 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.75 6.5L3 29l6.66-1.74a12.86 12.86 0 0 0 ' +
      '6.36 1.67h.01c7.16 0 12.98-5.82 12.98-12.99C29.01 8.82 23.19 3 16.02 3Zm0 23.74h-.01a10.7 10.7 0 0 ' +
      '1-5.46-1.49l-.39-.23-3.95 1.03 1.05-3.85-.25-.4a10.72 10.72 0 0 1-1.64-5.81c0-5.89 4.79-10.68 ' +
      '10.68-10.68 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.13 7.55c-.02 5.9-4.81 10.69-10.71 ' +
      '10.69Zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.82 1.05-1 1.26-.18.21-.37.24-.69' +
      '.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55' +
      '.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21' +
      ' 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.62s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 ' +
      '1.8.65.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.21-.61-.37Z"/></svg>';
    document.body.appendChild(a);
  }

  /* ════════════ 4) gallery slideshow (अगर page पर हो) ════════════ */
  function startGallery() {
    var img = $("#galleryMainImage");
    if (!img) return;
    var pics = [
      "gallery/applied_computer_school_45.png","gallery/applied_computer_school_46.png",
      "gallery/applied_computer_school_47.png","gallery/applied_computer_school_48.png",
      "gallery/applied_computer_school_49.png","gallery/applied_computer_school_50.png"
    ];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % pics.length;
      img.style.opacity = "0";
      setTimeout(function () { img.src = pics[i]; img.style.opacity = "1"; }, 250);
    }, 3000);
  }

  /* ════════════ 5) bindings — toggle · ESC · बाहर-click · focus ════════════ */
  function bindControls() {
    var menuBtn  = $("#menuToggle")     || $(".menu-btn");
    var langBtn  = $("#languageToggle") || $(".lang-btn");
    var menu     = $("#menuPanel");
    var langP    = $("#languagePanel");

    function open(panel, btn) {
      if (!panel) return;
      panel.hidden = false;
      if (btn) btn.setAttribute("aria-expanded", "true");
      var first = panel.querySelector("a, button");
      if (first) first.focus();
    }
    function close(panel, btn) {
      if (!panel || panel.hidden) return;
      panel.hidden = true;
      if (btn) { btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    }

    if (menuBtn) menuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); menu.hidden ? open(menu, menuBtn) : close(menu, menuBtn);
    });
    if (langBtn) langBtn.addEventListener("click", function (e) {
      e.stopPropagation(); langP.hidden ? open(langP, langBtn) : close(langP, langBtn);
    });

    var cM = $("#closeMenuPanel"); if (cM) cM.addEventListener("click", function () { close(menu, menuBtn); });
    var cL = $("#closeLangPanel"); if (cL) cL.addEventListener("click", function () { close(langP, langBtn); });

    /* भाषा चुनना → उस folder पर जाएँ (acs-translate.switchLang) */
    document.querySelectorAll(".lang-opt").forEach(function (b) {
      b.addEventListener("click", function () {
        var code = b.getAttribute("data-lang");
        if (window.ACS_T && typeof window.ACS_T.switchLang === "function") window.ACS_T.switchLang(code);
        else window.location.href = "/" + code + "/";
      });
    });

    /* ESC → खुला panel बंद */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(menu, menuBtn); close(langP, langBtn); }
    });

    /* बाहर click → बंद */
    document.addEventListener("click", function (e) {
      if (menu && !menu.hidden && !menu.contains(e.target) && e.target !== menuBtn) close(menu, menuBtn);
      if (langP && !langP.hidden && !langP.contains(e.target) && e.target !== langBtn) close(langP, langBtn);
    });
  }

  /* ════════════ 6) 10-मिनट निष्क्रिय → auto-logout (hook) ════════════
     असली sign-out template/dashboard का Firebase code करेगा (window.acsLogout).
     यहाँ सिर्फ़ घड़ी — काम न हो तो 10 मिनट बाद hook चलाएँ।                    */
  function idleLogout() {
    var LIMIT = 10 * 60 * 1000, timer;
    function reset() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (typeof window.acsLogout === "function") {
          window.acsLogout("idle");
          toast("10 मिनट निष्क्रिय — सुरक्षा हेतु logout।", "err");
        }
      }, LIMIT);
    }
    ["click","keydown","mousemove","scroll","touchstart"].forEach(function (ev) {
      document.addEventListener(ev, reset, { passive: true });
    });
    reset();
  }

  /* ════════════ 7) Service Worker — नया version → "Update करें" toast ════════════
     अपने-आप reload नहीं (ग्राहक का काम बीच में न टूटे)।                        */
  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(function (reg) {
        reg.addEventListener("updatefound", function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", function () {
            // पहली बार install नहीं — असली update तभी जब पहले से controller हो
            if (nw.state === "installed" && navigator.serviceWorker.controller) {
              showUpdateToast(reg);
            }
          });
        });
      }).catch(function (e) { console.log("ACS SW register skip:", e); });
    });
  }

  function showUpdateToast(reg) {
    var box = document.createElement("div");
    box.className = "acs-toast ok show";
    box.style.cssText += ";display:flex;gap:12px;align-items:center";
    box.innerHTML = '<span>नया version आया है।</span>' +
      '<button type="button" style="background:var(--gold);color:var(--navy);border:none;' +
      'border-radius:8px;padding:8px 14px;font-weight:800;font-size:16px;cursor:pointer">Update करें</button>';
    document.body.appendChild(box);
    box.querySelector("button").addEventListener("click", function () {
      if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    });
  }

  /* ════════════ शुरुआत ════════════ */
  document.addEventListener("DOMContentLoaded", function () {
    buildMenu();
    buildLangPanel();
    buildWhatsApp();
    startGallery();
    bindControls();
    idleLogout();
    registerSW();
  });

})();
