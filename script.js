/* ==========================================================================
   ACS SCRIPT.JS — COMMON COMPONENT FIX
   Purpose:
   1. Full menu restore
   2. Full language panel restore
   3. WhatsApp SVG button inject
   4. Works from root and nested folders using style.css path
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  injectACSMenuPanel();
  injectACSLanguagePanel();
  injectACSWhatsAppButton();
  bindACSControls();
});

function getACSBasePrefix() {
  const cssLink = document.querySelector('link[href$="style.css"]');

  if (!cssLink) {
    return "";
  }

  const href = cssLink.getAttribute("href") || "";

  if (href.endsWith("style.css")) {
    return href.replace(/style\.css$/, "");
  }

  return "";
}

function acsPath(target) {
  const base = getACSBasePrefix();
  return base + target;
}

/* =========================
   FULL MENU COMPONENT
   ========================= */

function injectACSMenuPanel() {
  let menu = document.getElementById("menuPanel");

  if (!menu) {
    menu = document.createElement("div");
    menu.className = "menu-panel";
    menu.id = "menuPanel";
    menu.hidden = true;

    const nav = document.querySelector(".navbar");
    if (nav) {
      nav.insertAdjacentElement("afterend", menu);
    } else {
      document.body.prepend(menu);
    }
  }

  const items = [
    ["होम", "index.html"],

    ["कोर्स कैटलॉग", "courses/hi/index.html"],
    ["डिजिटल कोर्स", "courses/hi/digital.html"],
    ["व्यावसायिक कोर्स", "courses/hi/vocational.html"],
    ["कृषि सहयोगी कोर्स", "courses/hi/agriculture.html"],
    ["कला-संस्कृति कोर्स", "courses/hi/art-culture.html"],
    ["एसीएस-एआई डिजिटल मास्टर™", "courses/hi/digital/acs-ai-digital-master.html"],
    ["AI ई-कॉमर्स प्रोडक्ट लिस्टिंग", "courses/hi/digital/acs-ai-ecommerce-product-listing.html"],

    ["अकादमी", "academy/hi/class-6-8.html"],
    ["वर्ग 6–8", "academy/hi/class-6-8.html"],
    ["वर्ग 9–10", "academy/hi/class-9-10.html"],
    ["वर्ग 11–12", "academy/hi/class-11-12.html"],
    ["वर्ग 12 से ऊपर", "academy/hi/class-12-plus.html"],

    ["विद्यार्थी केंद्र", "students/hi/index.html"],
    ["विद्यार्थी रजिस्ट्रेशन", "students/hi/register.html"],
    ["विद्यार्थी प्रोफाइल", "students/hi/profile.html"],
    ["विद्यार्थी डैशबोर्ड", "students/hi/dashboard.html"],
    ["बायोडाटा", "students/hi/resume-builder.html"],
    ["कौशल पर्ची", "students/hi/skill-slip.html"],
    ["आवेदन-पत्र", "students/hi/job-application.html"],
    ["दस्तावेज checklist", "students/hi/document-checklist.html"],

    ["स्वरोजगार", "career/hi/self-employment.html"],
    ["सरकारी रोजगार", "career/hi/government-employment.html"],
    ["प्राइवेट रोजगार", "career/hi/private-employment.html"],
    ["स्थानीय रोजगार", "career/hi/local-employment.html"],

    ["प्रशिक्षक / Mentor", "mentors/hi/index.html"],
    ["प्रशिक्षक रजिस्ट्रेशन", "mentors/hi/register.html"],
    ["प्रशिक्षक प्रोफाइल", "mentors/hi/profile.html"],
    ["Mentor Storefront", "mentors/hi/storefront.html"],

    ["ट्रेनिंग पार्टनर", "partners/hi/index.html"],
    ["पार्टनर रजिस्ट्रेशन", "partners/hi/register.html"],

    ["दुकान-वर्कशॉप", "workshops/hi/index.html"],
    ["वर्कशॉप रजिस्ट्रेशन", "workshops/hi/register.html"],

    ["सलाह लें", "counselors/hi/index.html"],
    ["सलाहकार रजिस्ट्रेशन", "counselors/hi/register.html"],
    ["सलाह बुक करें", "counselors/hi/book.html"],

    ["नियोक्ता", "employers/hi/index.html"],
    ["नियोक्ता रजिस्ट्रेशन", "employers/hi/register.html"],

    ["भुगतान नीति", "payment/hi/index.html"],
    ["ऑफलाइन शुल्क", "payment/hi/offline-course-fee.html"],
    ["प्रमाण-पत्र शुल्क", "payment/hi/certificate-service.html"],
    ["सेंटर बैच शुल्क", "payment/hi/center-batch.html"],

    ["टीचर डैशबोर्ड", "teacher/dashboard/index.html"],
    ["पार्टनर डैशबोर्ड", "partner/dashboard/index.html"],
    ["वर्कशॉप डैशबोर्ड", "workshop/dashboard/index.html"],
    ["नियोक्ता डैशबोर्ड", "employer/dashboard/index.html"],
    ["काउंसलर डैशबोर्ड", "counselor/dashboard/index.html"],
    ["ऑपरेटर डैशबोर्ड", "operator/dashboard/index.html"],
    ["मैनेजर डैशबोर्ड", "manager/dashboard/index.html"],

    ["गैलरी", "gallery/hi/index.html"],
    ["संपर्क", "contact/hi/index.html"],
    ["सहायता", "help/hi/index.html"],
    ["Sitemap", "sitemap.xml"]
  ];

  menu.innerHTML = `
    <div class="menu-panel-header">
      <h3>एसीएस मेन्यू</h3>
      <button id="closeMenuPanel" type="button" aria-label="मेन्यू बंद करें">✕</button>
    </div>

    <ul class="menu-panel-links">
      ${items.map(function (item) {
        return `<li><a href="${acsPath(item[1])}">${item[0]}</a></li>`;
      }).join("")}
    </ul>
  `;
}

/* =========================
   LANGUAGE PANEL COMPONENT
   ========================= */

function injectACSLanguagePanel() {
  let panel = document.getElementById("languagePanel");

  if (!panel) {
    panel = document.createElement("div");
    panel.className = "language-panel";
    panel.id = "languagePanel";
    panel.hidden = true;

    const trustStrip = document.querySelector(".trust-strip");
    if (trustStrip) {
      trustStrip.insertAdjacentElement("afterend", panel);
    } else {
      const nav = document.querySelector(".navbar");
      if (nav) {
        nav.insertAdjacentElement("afterend", panel);
      } else {
        document.body.prepend(panel);
      }
    }
  }

  const languages = [
    ["Hindi (हिंदी) ✓", "index.html"],
    ["English", "en/index.html"],
    ["Bengali", "bn/index.html"],
    ["Urdu", "ur/index.html"],
    ["Arabic", "ar/index.html"],
    ["Tamil", "ta/index.html"],
    ["Telugu", "te/index.html"],
    ["Marathi", "mr/index.html"],
    ["Gujarati", "gu/index.html"],
    ["Kannada", "kn/index.html"],
    ["Malayalam", "ml/index.html"],
    ["Punjabi", "pa/index.html"],
    ["Odia", "or/index.html"],
    ["Assamese", "as/index.html"],
    ["Maithili", "mai/index.html"],
    ["Bhojpuri", "bho/index.html"],
    ["Magahi", "mag/index.html"],
    ["Nepali", "ne/index.html"],
    ["Sanskrit", "sa/index.html"],
    ["Sinhala", "si/index.html"]
  ];

  panel.innerHTML = `
    <div class="lang-panel-header">
      <h3>भाषा चुनें / Select Language</h3>
      <button id="closeLangPanel" type="button" aria-label="भाषा पैनल बंद करें">✕</button>
    </div>

    <div class="lang-divider">मुख्य भाषा</div>

    <div class="lang-grid">
      ${languages.map(function (item, index) {
        return `<button class="lang-opt ${index === 0 ? "active" : ""}" data-url="${acsPath(item[1])}" type="button">${item[0]}</button>`;
      }).join("")}
    </div>
  `;
}

/* =========================
   WHATSAPP COMPONENT
   ========================= */

function injectACSWhatsAppButton() {
  if (document.querySelector(".whatsapp-float")) {
    return;
  }

  const wa = document.createElement("a");
  wa.className = "whatsapp-float";
  wa.href = "https://wa.me/919431210092";
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "WhatsApp पर संपर्क करें");

  wa.innerHTML = `
    <svg class="wa-svg" viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16.02 3C8.85 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.75 6.5L3 29l6.66-1.74a12.86 12.86 0 0 0 6.36 1.67h.01c7.16 0 12.98-5.82 12.98-12.99C29.01 8.82 23.19 3 16.02 3Zm0 23.74h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.95 1.03 1.05-3.85-.25-.4a10.72 10.72 0 0 1-1.64-5.81c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.13 7.55c-.02 5.9-4.81 10.69-10.71 10.69Zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.82 1.05-1 1.26-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.62s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.21-.61-.37Z"/>
    </svg>
  `;

  document.body.appendChild(wa);
}

/* =========================
   EVENT BINDINGS
   ========================= */

function bindACSControls() {
  const languageToggle = document.getElementById("languageToggle");
  const languagePanel = document.getElementById("languagePanel");
  const closeLangPanel = document.getElementById("closeLangPanel");

  const menuToggle = document.getElementById("menuToggle");
  const menuPanel = document.getElementById("menuPanel");
  const closeMenuPanel = document.getElementById("closeMenuPanel");

  if (languageToggle && languagePanel) {
    languageToggle.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = languageToggle.getAttribute("aria-expanded") === "true";

      languageToggle.setAttribute("aria-expanded", String(!isOpen));
      languagePanel.hidden = isOpen;
    });
  }

  if (closeLangPanel && languagePanel && languageToggle) {
    closeLangPanel.addEventListener("click", function () {
      languagePanel.hidden = true;
      languageToggle.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll(".lang-opt").forEach(function (button) {
    button.addEventListener("click", function () {
      const url = button.getAttribute("data-url");
      if (url) {
        window.location.href = url;
      }
    });
  });

  if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuPanel.hidden = isOpen;
    });
  }

  if (closeMenuPanel && menuPanel && menuToggle) {
    closeMenuPanel.addEventListener("click", function () {
      menuPanel.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("click", function (event) {
    if (
      languagePanel &&
      !languagePanel.hidden &&
      !languagePanel.contains(event.target) &&
      event.target !== languageToggle
    ) {
      languagePanel.hidden = true;
      if (languageToggle) {
        languageToggle.setAttribute("aria-expanded", "false");
      }
    }

    if (
      menuPanel &&
      !menuPanel.hidden &&
      !menuPanel.contains(event.target) &&
      event.target !== menuToggle
    ) {
      menuPanel.hidden = true;
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
}
