/**
 * ACS — 24 मास्टर समूह (Master Groups) — एकमात्र स्रोत (single source)
 * ---------------------------------------------------------------
 * उद्यम (udyam) और कोर्स (courses) — दोनों यही 24 श्रेणियाँ इस्तेमाल करें।
 * पहले ये दो जगह अलग-अलग हार्डकोड थीं (udyam = पूरे 24, courses = सिर्फ़ 12)।
 * अब सिर्फ़ यहीं — एक जगह बदलो, हर जगह बदले।
 *
 * हर कोर्स/उद्यम में पहले से `mg` (1-24) field है। नया कोर्स जोड़ते ही
 * वह अपने-आप अपनी श्रेणी में दिख जाता है — सूची जितनी चाहे लंबी हो सकती है।
 * (नई श्रेणी कभी ज़रूरत पड़े तो नीचे एक पंक्ति जोड़ें — id 25, 26 …)
 *
 * नाम = उद्यम पेज (udyam/index.html) से ज्यों-के-त्यों (official)।
 * slug = भविष्य के SEO पथ के लिए (अंग्रेज़ी = पुल/bridge)।
 * गिनती यहाँ नहीं रखी — हर सूची की अपनी गिनती mgCount() से अपने-आप निकलती है
 * (उद्यम की गिनती अलग, कोर्स की अलग — इसलिए नाम में गिनती नहीं जोड़ी)।
 */

const MASTER_GROUPS = [
  { id: 1,  emoji: '🌾', name: 'कृषि',        slug: 'agriculture'   },
  { id: 2,  emoji: '⛏️', name: 'खनन',         slug: 'mining'        },
  { id: 3,  emoji: '🏭', name: 'विनिर्माण',    slug: 'manufacturing' },
  { id: 4,  emoji: '🏗️', name: 'निर्माण',      slug: 'construction'  },
  { id: 5,  emoji: '🧵', name: 'वस्त्र',        slug: 'textile'       },
  { id: 6,  emoji: '💊', name: 'स्वास्थ्य',     slug: 'health'        },
  { id: 7,  emoji: '💻', name: 'प्रौद्योगिकी',  slug: 'technology'    },
  { id: 8,  emoji: '🚗', name: 'परिवहन',       slug: 'transport'     },
  { id: 9,  emoji: '🛍️', name: 'व्यापार',       slug: 'trade'         },
  { id: 10, emoji: '🎭', name: 'सेवाएं',        slug: 'services'      },
  { id: 11, emoji: '📚', name: 'शिक्षा',        slug: 'education'     },
  { id: 12, emoji: '🌿', name: 'हस्तशिल्प',     slug: 'handicraft'    },
  { id: 13, emoji: '⚗️', name: 'रसायन',        slug: 'chemicals'     },
  { id: 14, emoji: '🌍', name: 'वैश्विक',       slug: 'global'        },
  { id: 15, emoji: '🔮', name: 'भविष्य',        slug: 'future'        },
  { id: 16, emoji: '⚖️', name: 'विधिक',        slug: 'legal'         },
  { id: 17, emoji: '🏛️', name: 'सरकार',        slug: 'government'    },
  { id: 18, emoji: '📊', name: 'डेटा',          slug: 'data'          },
  { id: 19, emoji: '🤖', name: 'रोबोटिक्स',     slug: 'robotics'      },
  { id: 20, emoji: '🌎', name: 'जलवायु',        slug: 'climate'       },
  { id: 21, emoji: '🙏', name: 'धार्मिक',       slug: 'religious'     },
  { id: 22, emoji: '🏆', name: 'खेल',           slug: 'sports'        },
  { id: 23, emoji: '💰', name: 'डिजिटल वित्त',  slug: 'fintech'       },
  { id: 24, emoji: '🛡️', name: 'सुरक्षा',       slug: 'security'      },
];

/* ── छोटे सहायक (helpers) ── */

/** किसी एक समूह की पूरी जानकारी id से */
function mgById(id) {
  return MASTER_GROUPS.find(function (g) { return g.id === id; }) || null;
}

/** समूह का दिखाने-योग्य नाम (emoji + नाम), जैसे "🌾 कृषि" */
function mgLabel(id) {
  var g = mgById(id);
  return g ? (g.emoji + ' ' + g.name) : ('समूह ' + id);
}

/** किसी सूची (कोर्स या उद्यम) में इस समूह के कितने item हैं — गिनती अपने-आप */
function mgCount(list, id) {
  if (!Array.isArray(list)) return 0;
  return list.filter(function (item) { return item.mg === id; }).length;
}

/**
 * किसी <select> ड्रॉप-डाउन में 24 श्रेणियाँ भर दे — single source से।
 * selectEl  : <select> element
 * list      : (वैकल्पिक) कोर्स-सूची; दी गई तो हर श्रेणी के आगे गिनती भी दिखे
 * withCount : गिनती दिखानी है या नहीं (default: list दी हो तो true)
 *
 * उदाहरण:
 *   fillMgDropdown(document.getElementById('courseCat'),
 *                  SELF_EMP_COURSES.concat(PRIVATE_JOB_COURSES));
 */
function fillMgDropdown(selectEl, list, withCount) {
  if (!selectEl) return;
  if (withCount === undefined) withCount = Array.isArray(list);

  // पहला विकल्प: सब
  var total = Array.isArray(list) ? list.length : 0;
  selectEl.innerHTML = '<option value="all">— सभी श्रेणी' +
    (withCount ? ' (' + total + ')' : '') + ' —</option>';

  MASTER_GROUPS.forEach(function (g) {
    var n = withCount ? mgCount(list, g.id) : 0;
    // गिनती दी हो और 0 हो तो भी श्रेणी दिखे (भविष्य में भरने का स्कोप)
    var opt = document.createElement('option');
    opt.value = g.id;
    opt.textContent = g.emoji + ' ' + g.name + (withCount ? ' (' + n + ')' : '');
    selectEl.appendChild(opt);
  });
}

/* ब्राउज़र + (भविष्य में) Node — दोनों जगह काम के लिए */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_GROUPS: MASTER_GROUPS, mgById: mgById, mgLabel: mgLabel, mgCount: mgCount, fillMgDropdown: fillMgDropdown };
}
