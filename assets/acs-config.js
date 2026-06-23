/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         ACS MASTER CONFIGURATION FILE                   ║
 * ║         Applied Computer School™                        ║
 * ║         Version 1.0 | June 2026                        ║
 * ║                                                          ║
 * ║  यह file बदली = सब 3.2 करोड़ pages बदले               ║
 * ║  इसे बिना सोचे मत बदलो।                               ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * GitHub: acsbabita111/acslearn/assets/acs-config.js
 * Use:    <script src="/assets/acs-config.js"></script>
 */

// ══════════════════════════════════════════════════════════
// 1. COLORS — ACS Brand Colors (कभी मत बदलो)
// ══════════════════════════════════════════════════════════

const ACS_COLORS = {
  navy:      '#0B1F3A',   // Primary Dark — Header, Footer
  blue:      '#1565C0',   // Primary — Buttons, Links
  blue_lt:   '#1E88E5',   // Light Blue — Hover, Gradients
  gold:      '#F9A825',   // Accent — Highlights, CTA
  green:     '#2E7D32',   // Success — Certificates, Positive
  green_lt:  '#43A047',   // Light Green — Hover
  orange:    '#E65100',   // Warning — Important notices
  red:       '#C62828',   // Error — Validation errors
  offwhite:  '#F5F7FA',   // Background — All pages
  white:     '#FFFFFF',   // Cards, Modals
  gray:      '#607D8B',   // Secondary text
  border:    '#E8EDF5',   // Borders, Dividers
  text:      '#1A2B3C',   // Primary text
};

// CSS Variables String (हर page के <head> में inject होगा)
const ACS_CSS_VARS = `
:root {
  --navy:     ${ACS_COLORS.navy};
  --blue:     ${ACS_COLORS.blue};
  --blue-lt:  ${ACS_COLORS.blue_lt};
  --gold:     ${ACS_COLORS.gold};
  --green:    ${ACS_COLORS.green};
  --green-lt: ${ACS_COLORS.green_lt};
  --orange:   ${ACS_COLORS.orange};
  --red:      ${ACS_COLORS.red};
  --offwhite: ${ACS_COLORS.offwhite};
  --white:    ${ACS_COLORS.white};
  --gray:     ${ACS_COLORS.gray};
  --border:   ${ACS_COLORS.border};
  --text:     ${ACS_COLORS.text};
}`;

// ══════════════════════════════════════════════════════════
// 2. TYPOGRAPHY — Fonts
// ══════════════════════════════════════════════════════════

const ACS_FONTS = {
  google_url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap',
  primary:    "'Inter', 'Noto Sans Devanagari', sans-serif",
  size_base:  '15px',
  line_height:'1.6',
};

// ══════════════════════════════════════════════════════════
// 3. ORGANIZATION INFO
// ══════════════════════════════════════════════════════════

const ACS_ORG = {
  name:       'Applied Computer School™',
  short:      'ACS',
  tagline:    'Free Digital Education for the Global South',
  tagline_hi: 'शून्य से शिखर तक',
  vision:     'From Village to World 🌍',
  trust:      'FFGPMTrust',
  trust_url:  'https://ffgpmt.org',
  iso:        'ISO 9001:2015',
  founded:    '2011',
  vision_year:'2036',
  logo:       'https://acsbabita111.github.io/acslearn/logo.png',
  phone:      '+91-9431210092',
  whatsapp:   'https://wa.me/919431210092',
  email:      'acs.chautham@gmail.com',
  address:    'ACS Building, Vidyarthi Nagar, Chautham, Khagaria, Bihar — 851201',
  github:     'https://github.com/acsbabita111/acslearn',
  youtube:    'https://youtube.com/@AppliedComputerSchool',
};

// ══════════════════════════════════════════════════════════
// 4. COMMON LINKS (सभी भाषाओं में same)
// ══════════════════════════════════════════════════════════

const ACS_COMMON = {
  login:      '/dashboard/',
  vani:       '/vani/',
  verify:     '/verify/',
  sitemap:    '/sitemap.xml',
  ffgpmt:     'https://ffgpmt.org',
  whatsapp:   'https://wa.me/919431210092',
  youtube:    'https://youtube.com/@AppliedComputerSchool',
  firebase_config: {
    apiKey:            'AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM',
    authDomain:        'acslearn-platform.firebaseapp.com',
    projectId:         'acslearn-platform',
    storageBucket:     'acslearn-platform.firebasestorage.app',
    messagingSenderId: '435395814481',
    appId:             '1:435395814481:web:655f99452a90f8efbc4470',
  },
};

// ══════════════════════════════════════════════════════════
// 5. LANGUAGE LINKS + MENU LABELS
// ══════════════════════════════════════════════════════════

const ACS_LINKS = {

  hi: { code:'hi', name:'हिंदी', dir:'ltr',
    home:'/', mission:'/hi/mission.html',
    salah:'/hi/salah.html', udyam:'/udyam/',
    courses:'/courses/hi/', registration:'/join.html',
    certificate:'/hi/certificate.html', network:'/hi/network.html',
    contact:'/contact/hi/',
    menu:{ home:'🏠 होम', mission:'🎯 मिशन', salah:'🧭 सलाह',
      udyam:'🌍 उद्यम', courses:'📚 कोर्स', registration:'📝 रजिस्ट्रेशन',
      certificate:'🏆 प्रमाण पत्र', network:'🤝 नेटवर्क',
      vani:'📱 वाणी App', contact:'📞 संपर्क', login:'🔑 Login' }},

  en: { code:'en', name:'English', dir:'ltr',
    home:'/en/', mission:'/en/mission.html',
    salah:'/en/counseling.html', udyam:'/en/industries/',
    courses:'/courses/en/', registration:'/en/join.html',
    certificate:'/en/certificate.html', network:'/en/network.html',
    contact:'/en/contact.html',
    menu:{ home:'🏠 Home', mission:'🎯 Mission', salah:'🧭 Counseling',
      udyam:'🌍 Industries', courses:'📚 Courses', registration:'📝 Registration',
      certificate:'🏆 Certificate', network:'🤝 Network',
      vani:'📱 Vani App', contact:'📞 Contact', login:'🔑 Login' }},

  kn: { code:'kn', name:'ಕನ್ನಡ', dir:'ltr',
    home:'/kn/', mission:'/kn/mission.html',
    salah:'/kn/salaha.html', udyam:'/kn/udyama/',
    courses:'/courses/kn/', registration:'/kn/join.html',
    certificate:'/kn/certificate.html', network:'/kn/network.html',
    contact:'/kn/contact.html',
    menu:{ home:'🏠 ಮನೆ', mission:'🎯 ಮಿಷನ್', salah:'🧭 ಸಲಹೆ',
      udyam:'🌍 ಉದ್ಯಮ', courses:'📚 ಕೋರ್ಸ್', registration:'📝 ನೋಂದಣಿ',
      certificate:'🏆 ಪ್ರಮಾಣಪತ್ರ', network:'🤝 ನೆಟ್‌ವರ್ಕ್',
      vani:'📱 ವಾಣಿ App', contact:'📞 ಸಂಪರ್ಕ', login:'🔑 Login' }},

  mr: { code:'mr', name:'मराठी', dir:'ltr',
    home:'/mr/', mission:'/mr/mission.html',
    salah:'/mr/salah.html', udyam:'/mr/udyam/',
    courses:'/courses/mr/', registration:'/mr/join.html',
    certificate:'/mr/certificate.html', network:'/mr/network.html',
    contact:'/mr/contact.html',
    menu:{ home:'🏠 मुख्यपृष्ठ', mission:'🎯 ध्येय', salah:'🧭 सल्ला',
      udyam:'🌍 उद्योग', courses:'📚 अभ्यासक्रम', registration:'📝 नोंदणी',
      certificate:'🏆 प्रमाणपत्र', network:'🤝 नेटवर्क',
      vani:'📱 वाणी App', contact:'📞 संपर्क', login:'🔑 Login' }},

  bn: { code:'bn', name:'বাংলা', dir:'ltr',
    home:'/bn/', mission:'/bn/mission.html',
    salah:'/bn/paramarsha.html', udyam:'/bn/udyam/',
    courses:'/courses/bn/', registration:'/bn/join.html',
    certificate:'/bn/certificate.html', network:'/bn/network.html',
    contact:'/bn/contact.html',
    menu:{ home:'🏠 হোম', mission:'🎯 মিশন', salah:'🧭 পরামর্শ',
      udyam:'🌍 উদ্যোগ', courses:'📚 কোর্স', registration:'📝 নিবন্ধন',
      certificate:'🏆 সার্টিফিকেট', network:'🤝 নেটওয়ার্ক',
      vani:'📱 বাণী App', contact:'📞 যোগাযোগ', login:'🔑 Login' }},

  te: { code:'te', name:'తెలుగు', dir:'ltr',
    home:'/te/', mission:'/te/mission.html',
    salah:'/te/salaha.html', udyam:'/te/udyam/',
    courses:'/courses/te/', registration:'/te/join.html',
    certificate:'/te/certificate.html', network:'/te/network.html',
    contact:'/te/contact.html',
    menu:{ home:'🏠 హోమ్', mission:'🎯 మిషన్', salah:'🧭 సలహా',
      udyam:'🌍 వ్యాపారం', courses:'📚 కోర్సులు', registration:'📝 నమోదు',
      certificate:'🏆 సర్టిఫికెట్', network:'🤝 నెట్‌వర్క్',
      vani:'📱 వాణి App', contact:'📞 సంప్రదింపు', login:'🔑 Login' }},

  ta: { code:'ta', name:'தமிழ்', dir:'ltr',
    home:'/ta/', mission:'/ta/mission.html',
    salah:'/ta/aalosanai.html', udyam:'/ta/udyam/',
    courses:'/courses/ta/', registration:'/ta/join.html',
    certificate:'/ta/certificate.html', network:'/ta/network.html',
    contact:'/ta/contact.html',
    menu:{ home:'🏠 முகப்பு', mission:'🎯 இலக்கு', salah:'🧭 ஆலோசனை',
      udyam:'🌍 தொழில்', courses:'📚 படிப்புகள்', registration:'📝 பதிவு',
      certificate:'🏆 சான்றிதழ்', network:'🤝 நெட்வொர்க்',
      vani:'📱 வாணி App', contact:'📞 தொடர்பு', login:'🔑 Login' }},

  gu: { code:'gu', name:'ગુજરાતી', dir:'ltr',
    home:'/gu/', mission:'/gu/mission.html',
    salah:'/gu/salah.html', udyam:'/gu/udyam/',
    courses:'/courses/gu/', registration:'/gu/join.html',
    certificate:'/gu/certificate.html', network:'/gu/network.html',
    contact:'/gu/contact.html',
    menu:{ home:'🏠 હોમ', mission:'🎯 મિશન', salah:'🧭 સલાહ',
      udyam:'🌍 ઉદ્યોગ', courses:'📚 કોર્સ', registration:'📝 નોંધણી',
      certificate:'🏆 પ્રમાણપત્ર', network:'🤝 નેટવર્ક',
      vani:'📱 વાણી App', contact:'📞 સંપર્ક', login:'🔑 Login' }},

  pa: { code:'pa', name:'ਪੰਜਾਬੀ', dir:'ltr',
    home:'/pa/', mission:'/pa/mission.html',
    salah:'/pa/salah.html', udyam:'/pa/udyam/',
    courses:'/courses/pa/', registration:'/pa/join.html',
    certificate:'/pa/certificate.html', network:'/pa/network.html',
    contact:'/pa/contact.html',
    menu:{ home:'🏠 ਹੋਮ', mission:'🎯 ਮਿਸ਼ਨ', salah:'🧭 ਸਲਾਹ',
      udyam:'🌍 ਉਦਯੋਗ', courses:'📚 ਕੋਰਸ', registration:'📝 ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
      certificate:'🏆 ਸਰਟੀਫਿਕੇਟ', network:'🤝 ਨੈੱਟਵਰਕ',
      vani:'📱 ਵਾਣੀ App', contact:'📞 ਸੰਪਰਕ', login:'🔑 Login' }},

  or: { code:'or', name:'ଓଡ଼ିଆ', dir:'ltr',
    home:'/or/', mission:'/or/mission.html',
    salah:'/or/paramarsha.html', udyam:'/or/udyam/',
    courses:'/courses/or/', registration:'/or/join.html',
    certificate:'/or/certificate.html', network:'/or/network.html',
    contact:'/or/contact.html',
    menu:{ home:'🏠 ହୋମ', mission:'🎯 ମିଶନ', salah:'🧭 ପରାମର୍ଶ',
      udyam:'🌍 ଉଦ୍ୟମ', courses:'📚 କୋର୍ସ', registration:'📝 ପଞ୍ଜୀକରଣ',
      certificate:'🏆 ପ୍ରମାଣପତ୍ର', network:'🤝 ନେଟୱାର୍କ',
      vani:'📱 ବାଣୀ App', contact:'📞 ଯୋଗାଯୋଗ', login:'🔑 Login' }},

  ml: { code:'ml', name:'മലയാളം', dir:'ltr',
    home:'/ml/', mission:'/ml/mission.html',
    salah:'/ml/upadeshom.html', udyam:'/ml/udyam/',
    courses:'/courses/ml/', registration:'/ml/join.html',
    certificate:'/ml/certificate.html', network:'/ml/network.html',
    contact:'/ml/contact.html',
    menu:{ home:'🏠 ഹോം', mission:'🎯 ദൗത്യം', salah:'🧭 ഉപദേശം',
      udyam:'🌍 സംരംഭം', courses:'📚 കോഴ്സുകൾ', registration:'📝 രജിസ്ട്രേഷൻ',
      certificate:'🏆 സർട്ടിഫിക്കറ്റ്', network:'🤝 നെറ്റ്‌വർക്ക്',
      vani:'📱 വാണി App', contact:'📞 ബന്ധപ്പെടുക', login:'🔑 Login' }},

  as: { code:'as', name:'অসমীয়া', dir:'ltr',
    home:'/as/', mission:'/as/mission.html',
    salah:'/as/paramarsha.html', udyam:'/as/udyam/',
    courses:'/courses/as/', registration:'/as/join.html',
    certificate:'/as/certificate.html', network:'/as/network.html',
    contact:'/as/contact.html',
    menu:{ home:'🏠 হোম', mission:'🎯 মিছন', salah:'🧭 পৰামৰ্শ',
      udyam:'🌍 উদ্যম', courses:'📚 পাঠ্যক্ৰম', registration:'📝 পঞ্জীয়ন',
      certificate:'🏆 প্ৰমাণপত্ৰ', network:'🤝 নেটৱৰ্ক',
      vani:'📱 বাণী App', contact:'📞 যোগাযোগ', login:'🔑 Login' }},

  ur: { code:'ur', name:'اردو', dir:'rtl',
    home:'/ur/', mission:'/ur/mission.html',
    salah:'/ur/mashwara.html', udyam:'/ur/udyam/',
    courses:'/courses/ur/', registration:'/ur/join.html',
    certificate:'/ur/certificate.html', network:'/ur/network.html',
    contact:'/ur/contact.html',
    menu:{ home:'🏠 ہوم', mission:'🎯 مشن', salah:'🧭 مشورہ',
      udyam:'🌍 کاروبار', courses:'📚 کورسز', registration:'📝 رجسٹریشن',
      certificate:'🏆 سرٹیفکیٹ', network:'🤝 نیٹ ورک',
      vani:'📱 وانی App', contact:'📞 رابطہ', login:'🔑 Login' }},

  ne: { code:'ne', name:'नेपाली', dir:'ltr',
    home:'/ne/', mission:'/ne/mission.html',
    salah:'/ne/salah.html', udyam:'/ne/udyam/',
    courses:'/courses/ne/', registration:'/ne/join.html',
    certificate:'/ne/certificate.html', network:'/ne/network.html',
    contact:'/ne/contact.html',
    menu:{ home:'🏠 गृहपृष्ठ', mission:'🎯 मिसन', salah:'🧭 सल्लाह',
      udyam:'🌍 उद्यम', courses:'📚 पाठ्यक्रम', registration:'📝 दर्ता',
      certificate:'🏆 प्रमाणपत्र', network:'🤝 नेटवर्क',
      vani:'📱 वाणी App', contact:'📞 सम्पर्क', login:'🔑 Login' }},

  sw: { code:'sw', name:'Kiswahili', dir:'ltr',
    home:'/sw/', mission:'/sw/mission.html',
    salah:'/sw/ushauri.html', udyam:'/sw/biashara/',
    courses:'/courses/sw/', registration:'/sw/join.html',
    certificate:'/sw/certificate.html', network:'/sw/network.html',
    contact:'/sw/contact.html',
    menu:{ home:'🏠 Nyumbani', mission:'🎯 Dhamira', salah:'🧭 Ushauri',
      udyam:'🌍 Biashara', courses:'📚 Kozi', registration:'📝 Usajili',
      certificate:'🏆 Cheti', network:'🤝 Mtandao',
      vani:'📱 Vani App', contact:'📞 Wasiliana', login:'🔑 Login' }},

  fr: { code:'fr', name:'Français', dir:'ltr',
    home:'/fr/', mission:'/fr/mission.html',
    salah:'/fr/conseil.html', udyam:'/fr/secteurs/',
    courses:'/courses/fr/', registration:'/fr/join.html',
    certificate:'/fr/certificat.html', network:'/fr/reseau.html',
    contact:'/fr/contact.html',
    menu:{ home:'🏠 Accueil', mission:'🎯 Mission', salah:'🧭 Conseil',
      udyam:'🌍 Secteurs', courses:'📚 Cours', registration:'📝 Inscription',
      certificate:'🏆 Certificat', network:'🤝 Réseau',
      vani:'📱 Vani App', contact:'📞 Contact', login:'🔑 Login' }},

  es: { code:'es', name:'Español', dir:'ltr',
    home:'/es/', mission:'/es/mision.html',
    salah:'/es/consejo.html', udyam:'/es/sectores/',
    courses:'/courses/es/', registration:'/es/join.html',
    certificate:'/es/certificado.html', network:'/es/red.html',
    contact:'/es/contacto.html',
    menu:{ home:'🏠 Inicio', mission:'🎯 Misión', salah:'🧭 Consejo',
      udyam:'🌍 Sectores', courses:'📚 Cursos', registration:'📝 Registro',
      certificate:'🏆 Certificado', network:'🤝 Red',
      vani:'📱 Vani App', contact:'📞 Contacto', login:'🔑 Login' }},

  pt: { code:'pt', name:'Português', dir:'ltr',
    home:'/pt/', mission:'/pt/missao.html',
    salah:'/pt/conselho.html', udyam:'/pt/setores/',
    courses:'/courses/pt/', registration:'/pt/join.html',
    certificate:'/pt/certificado.html', network:'/pt/rede.html',
    contact:'/pt/contato.html',
    menu:{ home:'🏠 Início', mission:'🎯 Missão', salah:'🧭 Conselho',
      udyam:'🌍 Setores', courses:'📚 Cursos', registration:'📝 Registro',
      certificate:'🏆 Certificado', network:'🤝 Rede',
      vani:'📱 Vani App', contact:'📞 Contato', login:'🔑 Login' }},

  ar: { code:'ar', name:'العربية', dir:'rtl',
    home:'/ar/', mission:'/ar/mission.html',
    salah:'/ar/istishara.html', udyam:'/ar/qitaat/',
    courses:'/courses/ar/', registration:'/ar/join.html',
    certificate:'/ar/certificate.html', network:'/ar/network.html',
    contact:'/ar/contact.html',
    menu:{ home:'🏠 الرئيسية', mission:'🎯 المهمة', salah:'🧭 استشارة',
      udyam:'🌍 القطاعات', courses:'📚 الدورات', registration:'📝 التسجيل',
      certificate:'🏆 الشهادة', network:'🤝 الشبكة',
      vani:'📱 Vani App', contact:'📞 اتصل بنا', login:'🔑 Login' }},

  id: { code:'id', name:'Bahasa Indonesia', dir:'ltr',
    home:'/id/', mission:'/id/misi.html',
    salah:'/id/konsultasi.html', udyam:'/id/sektor/',
    courses:'/courses/id/', registration:'/id/join.html',
    certificate:'/id/sertifikat.html', network:'/id/jaringan.html',
    contact:'/id/kontak.html',
    menu:{ home:'🏠 Beranda', mission:'🎯 Misi', salah:'🧭 Konsultasi',
      udyam:'🌍 Sektor', courses:'📚 Kursus', registration:'📝 Pendaftaran',
      certificate:'🏆 Sertifikat', network:'🤝 Jaringan',
      vani:'📱 Vani App', contact:'📞 Kontak', login:'🔑 Login' }},

  vi: { code:'vi', name:'Tiếng Việt', dir:'ltr',
    home:'/vi/', mission:'/vi/su-menh.html',
    salah:'/vi/tu-van.html', udyam:'/vi/nganh-nghe/',
    courses:'/courses/vi/', registration:'/vi/join.html',
    certificate:'/vi/chung-chi.html', network:'/vi/mang-luoi.html',
    contact:'/vi/lien-he.html',
    menu:{ home:'🏠 Trang chủ', mission:'🎯 Sứ mệnh', salah:'🧭 Tư vấn',
      udyam:'🌍 Ngành nghề', courses:'📚 Khóa học', registration:'📝 Đăng ký',
      certificate:'🏆 Chứng chỉ', network:'🤝 Mạng lưới',
      vani:'📱 Vani App', contact:'📞 Liên hệ', login:'🔑 Login' }},

  ha: { code:'ha', name:'Hausa', dir:'ltr',
    home:'/ha/', mission:'/ha/manufa.html',
    salah:'/ha/shawara.html', udyam:'/ha/kasuwanci/',
    courses:'/courses/ha/', registration:'/ha/join.html',
    certificate:'/ha/takardar.html', network:'/ha/hanyar.html',
    contact:'/ha/tuntubar.html',
    menu:{ home:'🏠 Gida', mission:'🎯 Manufa', salah:'🧭 Shawara',
      udyam:'🌍 Kasuwanci', courses:'📚 Darussan', registration:'📝 Rajista',
      certificate:'🏆 Takarda', network:'🤝 Hanyar sadarwa',
      vani:'📱 Vani App', contact:'📞 Tuntubar', login:'🔑 Login' }},
};

// ══════════════════════════════════════════════════════════
// 6. MASTER HTML TEMPLATE
// ══════════════════════════════════════════════════════════

const ACS_TEMPLATE = {

  /**
   * <head> section — हर page में यही होगा
   * @param {string} title - Page title
   * @param {string} desc  - Meta description
   * @param {string} lang  - Language code
   */
  head: (title, desc, lang='hi') => `
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="${desc}"/>
<meta name="theme-color" content="${ACS_COLORS.navy}"/>
<meta name="author" content="Applied Computer School™"/>
<link rel="manifest" href="/manifest.json"/>
<title>${title} — Applied Computer School™</title>
<link href="${ACS_FONTS.google_url}" rel="stylesheet"/>
<style>
${ACS_CSS_VARS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{font-family:${ACS_FONTS.primary};background:var(--offwhite);color:var(--text);font-size:${ACS_FONTS.size_base};line-height:${ACS_FONTS.line_height}}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}

/* ══ NAVBAR ══ */
.navbar{background:var(--navy);position:sticky;top:0;z-index:200;box-shadow:0 2px 10px rgba(0,0,0,.3)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:0 14px;height:52px;max-width:1100px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:8px}
.nav-brand img{height:30px;border-radius:6px}
.nav-brand-text{color:#fff;font-size:13px;font-weight:700;line-height:1.2}
.nav-brand-text small{display:block;color:var(--gold);font-size:10px;font-weight:400}
.nav-controls{display:flex;gap:6px;align-items:center}
.btn-translate{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;padding:7px 12px;border-radius:6px;font-size:13px;cursor:pointer;font-family:inherit;min-height:40px}
.btn-menu{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px 6px;min-height:40px;min-width:40px}
.translate-panel{display:none;background:#0d2a4a;padding:10px 16px;border-top:1px solid rgba(255,255,255,.1)}
.translate-panel.open{display:block}
#google_translate_element select{width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,.3);background:#1a3a5c;color:white;font-size:14px;font-family:inherit}

/* ══ SLIDE MENU ══ */
.menu-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300}
.menu-overlay.open{display:block}
.menu-panel{position:fixed;top:0;right:-290px;width:290px;height:100%;background:#fff;z-index:400;transition:right .3s ease;overflow-y:auto}
.menu-panel.open{right:0}
.menu-head{background:var(--navy);color:#fff;padding:16px;display:flex;justify-content:space-between;align-items:center}
.menu-head h3{font-size:15px}
.menu-close{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;min-width:40px;min-height:40px;display:flex;align-items:center;justify-content:center}
.menu-links{list-style:none;padding:6px 0}
.menu-links li a{display:flex;align-items:center;padding:13px 20px;color:var(--text);font-size:14px;font-weight:500;border-bottom:1px solid #F0F0F0;min-height:48px}
.menu-links li a:hover{background:#F5F7FA;color:var(--blue)}
.menu-login-btn{margin:14px;display:flex;align-items:center;justify-content:center;background:var(--gold);color:var(--navy);text-align:center;padding:14px;border-radius:10px;font-weight:700;font-size:15px;min-height:52px}

/* ══ FOOTER ══ */
.footer-main{background:var(--navy);color:rgba(255,255,255,.7);padding:36px 20px 20px;margin-top:20px}
.footer-grid{display:grid;grid-template-columns:1fr;gap:28px;max-width:1000px;margin:0 auto}
@media(min-width:640px){.footer-grid{grid-template-columns:1fr 1fr 1fr}}
.footer-brand h2{color:#fff;font-size:15px;margin-bottom:6px}
.footer-tagline{color:var(--gold);font-size:12px;font-style:italic;margin:8px 0}
.footer-col h3{color:var(--gold);font-size:12px;font-weight:700;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px}
.sitemap-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px}
.sitemap-grid a{color:rgba(255,255,255,.6);font-size:12px;padding:4px 0;display:block}
.sitemap-grid a:hover{color:var(--gold)}
.footer-col p{font-size:12px;color:rgba(255,255,255,.6);margin-bottom:6px;line-height:1.6}
.footer-col a{color:var(--gold)}
.footer-bottom{text-align:center;padding:16px 20px;border-top:1px solid rgba(255,255,255,.1);margin-top:24px;font-size:12px;color:rgba(255,255,255,.4)}

/* ══ COMMON COMPONENTS ══ */
.btn-primary{display:inline-block;padding:13px 24px;background:linear-gradient(135deg,var(--blue),var(--blue-lt));color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(21,101,192,0.3);transition:all .2s}
.btn-primary:hover{transform:translateY(-2px)}
.btn-gold{background:linear-gradient(135deg,#F57F00,var(--gold));color:var(--navy)}
.btn-green{background:linear-gradient(135deg,var(--green),var(--green-lt))}
.card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:20px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--navy);color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;z-index:999;opacity:0;transition:.3s;white-space:nowrap}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
.toast.ok{border-left:4px solid var(--green-lt)}
.toast.err{border-left:4px solid var(--red)}
.scroll-top{position:fixed;bottom:20px;right:20px;width:44px;height:44px;border-radius:50%;background:var(--navy);color:#fff;border:none;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.2);display:none}
.scroll-top.show{display:flex;align-items:center;justify-content:center}
</style>`,

  /**
   * NAVBAR HTML
   */
  navbar: (lang='hi') => {
    const L = ACS_LINKS[lang] || ACS_LINKS.hi;
    return `
<nav class="navbar">
  <div class="nav-inner">
    <a href="${L.home}" class="nav-brand">
      <img src="${ACS_ORG.logo}" alt="${ACS_ORG.short}"/>
      <div class="nav-brand-text">${ACS_ORG.name}
        <small>${ACS_ORG.tagline}</small>
      </div>
    </a>
    <div class="nav-controls">
      <button class="btn-translate" onclick="toggleTranslate()">🌐 भाषा</button>
      <button class="btn-menu" onclick="openMenu()">☰</button>
    </div>
  </div>
  <div class="translate-panel" id="translatePanel">
    <div id="google_translate_element"></div>
  </div>
</nav>`;
  },

  /**
   * SLIDE MENU HTML
   */
  menu: (lang='hi') => {
    const L = ACS_LINKS[lang] || ACS_LINKS.hi;
    const C = ACS_COMMON;
    return `
<div class="menu-overlay" id="menuOverlay" onclick="closeMenu()"></div>
<div class="menu-panel" id="menuPanel">
  <div class="menu-head">
    <h3>${ACS_ORG.short} Menu</h3>
    <button class="menu-close" onclick="closeMenu()">✕</button>
  </div>
  <ul class="menu-links">
    <li><a href="${L.home}">${L.menu.home}</a></li>
    <li><a href="${L.mission}">${L.menu.mission}</a></li>
    <li><a href="${L.salah}">${L.menu.salah}</a></li>
    <li><a href="${L.udyam}">${L.menu.udyam}</a></li>
    <li><a href="${L.courses}">${L.menu.courses}</a></li>
    <li><a href="${L.registration}">${L.menu.registration}</a></li>
    <li><a href="${L.certificate}">${L.menu.certificate}</a></li>
    <li><a href="${L.network}">${L.menu.network}</a></li>
    <li><a href="${C.vani}">${L.menu.vani}</a></li>
    <li><a href="${L.contact}">${L.menu.contact}</a></li>
  </ul>
  <a href="${C.login}" class="menu-login-btn">${L.menu.login}</a>
</div>`;
  },

  /**
   * FOOTER HTML
   */
  footer: (lang='hi') => {
    const L = ACS_LINKS[lang] || ACS_LINKS.hi;
    const O = ACS_ORG;
    return `
<footer class="footer-main">
  <div class="footer-grid">
    <div class="footer-brand">
      <h2>${O.name}</h2>
      <p class="footer-tagline">"${O.vision}"</p>
      <p>${O.trust} का उपक्रम</p>
      <p style="margin-top:8px;color:var(--gold);font-weight:700">Learn. Build. Contribute. Grow.</p>
      <p style="margin-top:6px">${O.iso} प्रमाणित</p>
    </div>
    <div class="footer-col">
      <h3>Site Map</h3>
      <div class="sitemap-grid">
        <a href="${L.home}">${L.menu.home}</a>
        <a href="${L.mission}">${L.menu.mission}</a>
        <a href="${L.salah}">${L.menu.salah}</a>
        <a href="${L.udyam}">${L.menu.udyam}</a>
        <a href="${L.courses}">${L.menu.courses}</a>
        <a href="${L.registration}">${L.menu.registration}</a>
        <a href="${L.certificate}">${L.menu.certificate}</a>
        <a href="${L.network}">${L.menu.network}</a>
        <a href="${ACS_COMMON.vani}">${L.menu.vani}</a>
        <a href="${L.contact}">${L.menu.contact}</a>
      </div>
    </div>
    <div class="footer-col">
      <h3>संपर्क</h3>
      <p>📍 ${O.address}</p>
      <p>📞 <a href="tel:${O.phone}">${O.phone}</a></p>
      <p>✉️ <a href="mailto:${O.email}">${O.email}</a></p>
      <p>💬 <a href="${O.whatsapp}">WhatsApp</a></p>
      <p>🌐 <a href="${O.trust_url}">${O.trust_url}</a></p>
      <p style="margin-top:8px;font-size:11px;color:rgba(255,255,255,.4)">
        ⚠️ भुगतान केवल official Razorpay link से।
      </p>
    </div>
  </div>
  <div class="footer-bottom">
    © 2026 ${O.name} |
    <a href="${O.trust_url}" style="color:var(--gold)">${O.trust}</a> |
    <a href="/" style="color:var(--gold)">acslearn.com</a>
  </div>
</footer>`;
  },

  /**
   * COMMON SCRIPTS — हर page में
   */
  scripts: () => `
<script>
function openMenu(){document.getElementById('menuPanel').classList.add('open');document.getElementById('menuOverlay').classList.add('open');}
function closeMenu(){document.getElementById('menuPanel').classList.remove('open');document.getElementById('menuOverlay').classList.remove('open');}
function toggleTranslate(){document.getElementById('translatePanel').classList.toggle('open');}
window.addEventListener('scroll',()=>document.getElementById('scrollTop')?.classList.toggle('show',window.scrollY>300));
function showToast(msg,type='ok'){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.className='toast '+(type==='ok'?'ok':'err');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}
window.googleTranslateElementInit=function(){new google.translate.TranslateElement({pageLanguage:'hi',includedLanguages:'en,hi,kn,mr,te,ta,bn,gu,pa,ur,sw,fr,es,pt,ar,id,vi,ha'},'google_translate_element');};
</script>
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo(0,0)">↑</button>
<div class="toast" id="toast"></div>`,

  /**
   * COMPLETE PAGE WRAPPER
   * Python Generator इसे use करेगा
   */
  page: (title, desc, content, lang='hi') => `<!DOCTYPE html>
<html lang="${lang}" dir="${ACS_LINKS[lang]?.dir||'ltr'}">
<head>
${ACS_TEMPLATE.head(title, desc, lang)}
</head>
<body>
${ACS_TEMPLATE.navbar(lang)}
${ACS_TEMPLATE.menu(lang)}
${content}
${ACS_TEMPLATE.footer(lang)}
${ACS_TEMPLATE.scripts()}
</body>
</html>`,

};

// ══════════════════════════════════════════════════════════
// 7. EXPORT
// ══════════════════════════════════════════════════════════

if (typeof module !== 'undefined') {
  module.exports = { ACS_COLORS, ACS_FONTS, ACS_ORG, ACS_COMMON, ACS_LINKS, ACS_TEMPLATE };
}
