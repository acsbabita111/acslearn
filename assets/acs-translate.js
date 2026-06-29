/**
 * ACS Universal Translate Asset
 * Version 1.0 | June 2026
 * एक file → 17 भाषाएं auto-translate (लक्ष्य 80+)
 *
 * Use: ACS_T.get('courses', 'hi') → 'कोर्स'
 *      ACS_T.apply('hi') → सब UI labels update
 */

const ACS_T = {

  // ══ UI LABELS — सभी भाषाएं ══
  labels: {

    // ── MENU ──
    home:         {hi:'🏠 होम',         en:'🏠 Home',         kn:'🏠 ಮನೆ',           mr:'🏠 मुख्यपृष्ठ',    bn:'🏠 হোম',          te:'🏠 హోమ్',          ta:'🏠 முகப்பு',       gu:'🏠 હોમ',           pa:'🏠 ਹੋਮ',           sw:'🏠 Nyumbani',      fr:'🏠 Accueil',       es:'🏠 Inicio',        pt:'🏠 Início',        ar:'🏠 الرئيسية',      id:'🏠 Beranda',       vi:'🏠 Trang chủ',     ha:'🏠 Gida'},
    mission:      {hi:'🎯 मिशन',        en:'🎯 Mission',       kn:'🎯 ಮಿಷನ್',         mr:'🎯 ध्येय',         bn:'🎯 মিশন',          te:'🎯 మిషన్',          ta:'🎯 இலக்கு',        gu:'🎯 મિશન',          pa:'🎯 ਮਿਸ਼ਨ',         sw:'🎯 Dhamira',       fr:'🎯 Mission',       es:'🎯 Misión',        pt:'🎯 Missão',        ar:'🎯 المهمة',        id:'🎯 Misi',           vi:'🎯 Sứ mệnh',       ha:'🎯 Manufa'},
    salah:   {hi:'🧭 सलाह',        en:'🧭 Counseling',    kn:'🧭 ಸಲಹೆ',          mr:'🧭 सल्ला',         bn:'🧭 পরামর্শ',        te:'🧭 సలహా',           ta:'🧭 ஆலோசனை',        gu:'🧭 સલાહ',          pa:'🧭 ਸਲਾਹ',         sw:'🧭 Ushauri',       fr:'🧭 Conseil',       es:'🧭 Consejo',       pt:'🧭 Conselho',      ar:'🧭 استشارة',       id:'🧭 Konsultasi',    vi:'🧭 Tư vấn',        ha:'🧭 Shawara'},
    udyam:   {hi:'🌍 उद्यम',       en:'🌍 Industries',    kn:'🌍 ಉದ್ಯಮ',         mr:'🌍 उद्योग',        bn:'🌍 উদ্যোগ',         te:'🌍 వ్యాపారం',       ta:'🌍 தொழில்',        gu:'🌍 ઉદ્યોગ',        pa:'🌍 ਉਦਯੋਗ',        sw:'🌍 Biashara',      fr:'🌍 Secteurs',      es:'🌍 Sectores',      pt:'🌍 Setores',       ar:'🌍 القطاعات',      id:'🌍 Sektor',         vi:'🌍 Ngành nghề',    ha:'🌍 Kasuwanci'},
    courses:      {hi:'📚 कोर्स',       en:'📚 Courses',       kn:'📚 ಕೋರ್ಸ್',        mr:'📚 अभ्यासक्रम',    bn:'📚 কোর্স',          te:'📚 కోర్సులు',       ta:'📚 படிப்புகள்',     gu:'📚 કોર્સ',         pa:'📚 ਕੋਰਸ',         sw:'📚 Kozi',          fr:'📚 Cours',         es:'📚 Cursos',        pt:'📚 Cursos',        ar:'📚 الدورات',       id:'📚 Kursus',         vi:'📚 Khóa học',      ha:'📚 Darussan'},
    register: {hi:'📝 रजिस्ट्रेशन',en:'📝 Registration',  kn:'📝 ನೋಂದಣಿ',        mr:'📝 नोंदणी',        bn:'📝 নিবন্ধন',        te:'📝 నమోదు',          ta:'📝 பதிவு',          gu:'📝 નોંધણી',        pa:'📝 ਰਜਿਸਟ੍ਰੇਸ਼ਨ',  sw:'📝 Usajili',       fr:'📝 Inscription',   es:'📝 Registro',      pt:'📝 Registro',      ar:'📝 التسجيل',       id:'📝 Pendaftaran',   vi:'📝 Đăng ký',       ha:'📝 Rajista'},
    verify:  {hi:'🏆 प्रमाण पत्र', en:'🏆 Certificate',  kn:'🏆 ಪ್ರಮಾಣಪತ್ರ',    mr:'🏆 प्रमाणपत्र',    bn:'🏆 সার্টিফিকেট',    te:'🏆 సర్టిఫికెట్',    ta:'🏆 சான்றிதழ்',     gu:'🏆 પ્રમાણપત્ર',    pa:'🏆 ਸਰਟੀਫਿਕੇਟ',   sw:'🏆 Cheti',         fr:'🏆 Certificat',    es:'🏆 Certificado',   pt:'🏆 Certificado',   ar:'🏆 الشهادة',       id:'🏆 Sertifikat',    vi:'🏆 Chứng chỉ',     ha:'🏆 Takarda'},
    network:      {hi:'🤝 नेटवर्क',     en:'🤝 Network',       kn:'🤝 ನೆಟ್‌ವರ್ಕ್',    mr:'🤝 नेटवर्क',       bn:'🤝 নেটওয়ার্ক',     te:'🤝 నెట్‌వర్క్',     ta:'🤝 நெட்வொர்க்',   gu:'🤝 નેટવર્ક',       pa:'🤝 ਨੈੱਟਵਰਕ',      sw:'🤝 Mtandao',       fr:'🤝 Réseau',        es:'🤝 Red',           pt:'🤝 Rede',          ar:'🤝 الشبكة',        id:'🤝 Jaringan',      vi:'🤝 Mạng lưới',     ha:'🤝 Hanyar sadarwa'},
    vani:         {hi:'📱 वाणी',    en:'📱 Vani',      kn:'📱 ವಾಣಿ',       mr:'📱 वाणी',      bn:'📱 বাণী',        te:'📱 వాణి',       ta:'📱 வாணி',      gu:'📱 વાણી',      pa:'📱 ਵਾਣੀ',     sw:'📱 Vani',      fr:'📱 Vani',      es:'📱 Vani',      pt:'📱 Vani',      ar:'📱 Vani',      id:'📱 Vani',      vi:'📱 Vani',      ha:'📱 Vani'},
    contact:      {hi:'📞 संपर्क',      en:'📞 Contact',       kn:'📞 ಸಂಪರ್ಕ',        mr:'📞 संपर्क',         bn:'📞 যোগাযোগ',        te:'📞 సంప్రదింపు',     ta:'📞 தொடர்பு',       gu:'📞 સંપર્ક',        pa:'📞 ਸੰਪਰਕ',        sw:'📞 Wasiliana',     fr:'📞 Contact',       es:'📞 Contacto',      pt:'📞 Contato',       ar:'📞 اتصل بنا',      id:'📞 Kontak',         vi:'📞 Liên hệ',       ha:'📞 Tuntubar'},
    login:        {hi:'🔑 Login',       en:'🔑 Login',         kn:'🔑 Login',          mr:'🔑 Login',         bn:'🔑 Login',          te:'🔑 Login',          ta:'🔑 Login',         gu:'🔑 Login',         pa:'🔑 Login',        sw:'🔑 Ingia',         fr:'🔑 Connexion',     es:'🔑 Iniciar sesión', pt:'🔑 Entrar',       ar:'🔑 تسجيل الدخول',  id:'🔑 Masuk',         vi:'🔑 Đăng nhập',     ha:'🔑 Shiga'},

    // ── COURSES PAGE ──
    free_online:  {hi:'✅ ऑनलाइन निःशुल्क', en:'✅ Free Online', kn:'✅ ಉಚಿತ ಆನ್‌ಲೈನ್', mr:'✅ विनामूल्य ऑनलाइन', bn:'✅ বিনামূল্যে অনলাইন', te:'✅ ఉచిత ఆన్‌లైన్', ta:'✅ இலவச ஆன்லைன்', gu:'✅ મફત ઑનલાઇન', pa:'✅ ਮੁਫ਼ਤ ਔਨਲਾਈਨ', sw:'✅ Bure Mtandaoni', fr:'✅ Gratuit en ligne', es:'✅ Gratuito en línea', pt:'✅ Gratuito online', ar:'✅ مجاني أونلاين', id:'✅ Gratis Online', vi:'✅ Miễn phí Online', ha:'✅ Kyauta Online'},
    paid_centre:  {hi:'🏫 केंद्र पर शुल्क', en:'🏫 Paid at Centre', kn:'🏫 ಕೇಂದ್ರದಲ್ಲಿ ಶುಲ್ಕ', mr:'🏫 केंद्रावर शुल्क', bn:'🏫 কেন্দ্রে পেইড', te:'🏫 సెంటర్‌లో చెల్లింపు', ta:'🏫 மையத்தில் கட்டணம்', gu:'🏫 કેન્દ્ર પર ચૂકવણી', pa:'🏫 ਸੈਂਟਰ ਤੇ ਭੁਗਤਾਨ', sw:'🏫 Hulipiwa Kituoni', fr:'🏫 Payant au Centre', es:'🏫 De pago en Centro', pt:'🏫 Pago no Centro', ar:'🏫 مدفوع في المركز', id:'🏫 Berbayar di Pusat', vi:'🏫 Trả phí tại Trung tâm', ha:'🏫 Biyan Kuɗi a Cibiya'},
    enroll:       {hi:'📝 दाखिला लें', en:'📝 Enroll Now', kn:'📝 ನೋಂದಾಯಿಸಿ', mr:'📝 नोंदणी करा', bn:'📝 নথিভুক্ত করুন', te:'📝 నమోదు చేయండి', ta:'📝 பதிவு செய்யுங்கள்', gu:'📝 નોંધણી કરો', pa:'📝 ਦਾਖਲਾ ਲਓ', sw:'📝 Jiandikishe', fr:'📝 S\'inscrire', es:'📝 Inscribirse', pt:'📝 Inscrever-se', ar:'📝 سجل الآن', id:'📝 Daftar Sekarang', vi:'📝 Đăng ký ngay', ha:'📝 Yi Rajista'},
    search:       {hi:'🔍 खोजें', en:'🔍 Search', kn:'🔍 ಹುಡುಕಿ', mr:'🔍 शोधा', bn:'🔍 অনুসন্ধান', te:'🔍 వెతకండి', ta:'🔍 தேடு', gu:'🔍 શોધો', pa:'🔍 ਖੋਜੋ', sw:'🔍 Tafuta', fr:'🔍 Rechercher', es:'🔍 Buscar', pt:'🔍 Pesquisar', ar:'🔍 بحث', id:'🔍 Cari', vi:'🔍 Tìm kiếm', ha:'🔍 Nema'},
    duration:     {hi:'अवधि', en:'Duration', kn:'ಅವಧಿ', mr:'कालावधी', bn:'সময়কাল', te:'వ్యవధి', ta:'காலம்', gu:'સમયગાળો', pa:'ਅਵਧੀ', sw:'Muda', fr:'Durée', es:'Duración', pt:'Duração', ar:'المدة', id:'Durasi', vi:'Thời gian', ha:'Tsawon lokaci'},
    lessons:      {hi:'पाठ (Lessons)', en:'Lessons', kn:'ಪಾಠಗಳು', mr:'धडे', bn:'পাঠ', te:'పాఠాలు', ta:'பாடங்கள்', gu:'પ્રકરણ', pa:'ਪਾਠ', sw:'Masomo', fr:'Leçons', es:'Lecciones', pt:'Aulas', ar:'دروس', id:'Pelajaran', vi:'Bài học', ha:'Darussan'},
    salary:       {hi:'वेतन (Salary)', en:'Salary', kn:'ವೇತನ', mr:'पगार', bn:'বেতন', te:'జీతం', ta:'சம்பளம்', gu:'પગાર', pa:'ਤਨਖ਼ਾਹ', sw:'Mshahara', fr:'Salaire', es:'Salario', pt:'Salário', ar:'الراتب', id:'Gaji', vi:'Lương', ha:'Albashi'},
    qualification:{hi:'योग्यता (Qualification)', en:'Qualification', kn:'ಅರ್ಹತೆ', mr:'पात्रता', bn:'যোগ্যতা', te:'అర్హత', ta:'தகுதி', gu:'લાયકાત', pa:'ਯੋਗਤਾ', sw:'Sifa', fr:'Qualification', es:'Calificación', pt:'Qualificação', ar:'المؤهل', id:'Kualifikasi', vi:'Bằng cấp', ha:'Cancika'},

    // ── COURSE TABS ──
    self_emp:     {hi:'🏪 स्वरोजगार कोर्स', en:'🏪 Self-Employment Courses', kn:'🏪 ಸ್ವಯಂ ಉದ್ಯೋಗ', mr:'🏪 स्वयंरोजगार', bn:'🏪 স্ব-কর্মসংস্থান', te:'🏪 స్వయం ఉపాధి', ta:'🏪 சுய தொழில்', gu:'🏪 સ્વ-રોજગાર', pa:'🏪 ਸਵੈ-ਰੁਜ਼ਗਾਰ', sw:'🏪 Kujitegemea', fr:'🏪 Auto-emploi', es:'🏪 Autoempleo', pt:'🏪 Autoemprego', ar:'🏪 العمل الحر', id:'🏪 Wirausaha', vi:'🏪 Tự kinh doanh', ha:'🏪 Kasuwanci'},
    private_job:  {hi:'🏢 प्राइवेट नौकरी कोर्स', en:'🏢 Private Job Courses', kn:'🏢 ಖಾಸಗಿ ಉದ್ಯೋಗ', mr:'🏢 खासगी नोकरी', bn:'🏢 বেসরকারি চাকরি', te:'🏢 ప్రైవేట్ ఉద్యోగం', ta:'🏢 தனியார் வேலை', gu:'🏢 ખાનગી નોકરી', pa:'🏢 ਪ੍ਰਾਈਵੇਟ ਨੌਕਰੀ', sw:'🏢 Kazi ya Kibinafsi', fr:'🏢 Emploi privé', es:'🏢 Empleo privado', pt:'🏢 Emprego privado', ar:'🏢 الوظيفة الخاصة', id:'🏢 Pekerjaan Swasta', vi:'🏢 Việc làm tư nhân', ha:'🏢 Aiki na Masu Zaman Kansu'},
    local_job:    {hi:'🛒 स्थानीय नौकरी कोर्स', en:'🛒 Local Job Courses', kn:'🛒 ಸ್ಥಳೀಯ ಉದ್ಯೋಗ', mr:'🛒 स्थानिक नोकरी', bn:'🛒 স্থানীয় চাকরি', te:'🛒 స్థానిక ఉద్యోగం', ta:'🛒 உள்ளூர் வேலை', gu:'🛒 સ્થાનિક નોકરી', pa:'🛒 ਸਥਾਨਕ ਨੌਕਰੀ', sw:'🛒 Kazi ya Karibu', fr:'🛒 Emploi local', es:'🛒 Empleo local', pt:'🛒 Emprego local', ar:'🛒 الوظيفة المحلية', id:'🛒 Pekerjaan Lokal', vi:'🛒 Việc làm địa phương', ha:'🛒 Aiki na Gida'},
    govt_job:     {hi:'🏛️ सरकारी नौकरी कोर्स', en:'🏛️ Govt Job Courses', kn:'🏛️ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ', mr:'🏛️ सरकारी नोकरी', bn:'🏛️ সরকারি চাকরি', te:'🏛️ ప్రభుత్వ ఉద్యోగం', ta:'🏛️ அரசு வேலை', gu:'🏛️ સરકારી નોકરી', pa:'🏛️ ਸਰਕਾਰੀ ਨੌਕਰੀ', sw:'🏛️ Kazi ya Serikali', fr:'🏛️ Emploi public', es:'🏛️ Empleo gubernamental', pt:'🏛️ Emprego público', ar:'🏛️ الوظيفة الحكومية', id:'🏛️ Pekerjaan Pemerintah', vi:'🏛️ Việc làm nhà nước', ha:'🏛️ Aiki na Gwamnati'},

    // ── COMMON UI ──
    language:     {hi:'🌐 भाषा', en:'🌐 Language', kn:'🌐 ಭಾಷೆ', mr:'🌐 भाषा', bn:'🌐 ভাষা', te:'🌐 భాష', ta:'🌐 மொழி', gu:'🌐 ભાષા', pa:'🌐 ਭਾਸ਼ਾ', sw:'🌐 Lugha', fr:'🌐 Langue', es:'🌐 Idioma', pt:'🌐 Idioma', ar:'🌐 اللغة', id:'🌐 Bahasa', vi:'🌐 Ngôn ngữ', ha:'🌐 Harshe'},
    select_state: {hi:'— राज्य चुनें —', en:'— Select State —', kn:'— ರಾಜ್ಯ ಆಯ್ಕೆ —', mr:'— राज्य निवडा —', bn:'— রাজ্য নির্বাচন করুন —', te:'— రాష్ట్రం ఎంచుకోండి —', ta:'— மாநிலம் தேர்ந்தெடுக்கவும் —', gu:'— રાજ્ય પસંદ કરો —', pa:'— ਸੂਬਾ ਚੁਣੋ —', sw:'— Chagua Jimbo —', fr:'— Sélectionner État —', es:'— Seleccionar Estado —', pt:'— Selecionar Estado —', ar:'— اختر الولاية —', id:'— Pilih Negara Bagian —', vi:'— Chọn tỉnh —', ha:'— Zaɓi Jiha —'},
    select_dist:  {hi:'— जिला चुनें —', en:'— Select District —', kn:'— ಜಿಲ್ಲೆ ಆಯ್ಕೆ —', mr:'— जिल्हा निवडा —', bn:'— জেলা নির্বাচন করুন —', te:'— జిల్లా ఎంచుకోండి —', ta:'— மாவட்டம் தேர்ந்தெடுக்கவும் —', gu:'— જિલ્લો પસંદ કરો —', pa:'— ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ —', sw:'— Chagua Wilaya —', fr:'— Sélectionner District —', es:'— Seleccionar Distrito —', pt:'— Selecionar Distrito —', ar:'— اختر المنطقة —', id:'— Pilih Distrik —', vi:'— Chọn huyện —', ha:'— Zaɓi Gunduma —'},
    free:         {hi:'निःशुल्क', en:'Free', kn:'ಉಚಿತ', mr:'विनामूल्य', bn:'বিনামূল্যে', te:'ఉచితం', ta:'இலவசம்', gu:'મફત', pa:'ਮੁਫ਼ਤ', sw:'Bure', fr:'Gratuit', es:'Gratis', pt:'Gratuito', ar:'مجاني', id:'Gratis', vi:'Miễn phí', ha:'Kyauta'},
    paid:         {hi:'शुल्क (Paid)', en:'Paid', kn:'ಶುಲ್ಕ', mr:'शुल्क', bn:'পেইড', te:'చెల్లింపు', ta:'கட்டணம்', gu:'ચૂકવणी', pa:'ਭੁਗਤਾਨ', sw:'Kulipwa', fr:'Payant', es:'De pago', pt:'Pago', ar:'مدفوع', id:'Berbayar', vi:'Trả phí', ha:'Biyan Kuɗi'},
    view_more:    {hi:'और देखें →', en:'View More →', kn:'ಇನ್ನಷ್ಟು →', mr:'अधिक पाहा →', bn:'আরো দেখুন →', te:'మరిన్ని చూడండి →', ta:'மேலும் →', gu:'વધુ →', pa:'ਹੋਰ ਦੇਖੋ →', sw:'Angalia Zaidi →', fr:'Voir Plus →', es:'Ver Más →', pt:'Ver Mais →', ar:'رؤية المزيد →', id:'Lihat Lebih →', vi:'Xem thêm →', ha:'Duba Karin →'},
    register_now: {hi:'अभी रजिस्ट्रेशन करें →', en:'Register Now →', kn:'ಈಗ ನೋಂದಾಯಿಸಿ →', mr:'आत्ता नोंदणी करा →', bn:'এখনই নিবন্ধন করুন →', te:'ఇప్పుడు నమోదు చేయండి →', ta:'இப்போது பதிவு செய்யுங்கள் →', gu:'હવે નોંધણી કરો →', pa:'ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ →', sw:'Jiandikishe Sasa →', fr:'S\'inscrire Maintenant →', es:'Registrarse Ahora →', pt:'Registrar Agora →', ar:'سجل الآن →', id:'Daftar Sekarang →', vi:'Đăng ký ngay →', ha:'Yi Rajista Yanzu →'},
  },

  // ══ EDUCATION LEVEL NAMES ══
  edu: {
    none:     {hi:'बिना पढ़ाई', en:'No Education', kn:'ಶಿಕ್ಷಣ ಇಲ್ಲ', mr:'शिक्षण नाही', bn:'শিক্ষা নেই', te:'విద్య లేదు', ta:'கல்வி இல்லை', sw:'Bila Elimu', fr:'Sans éducation', es:'Sin educación', gu:'શિક્ષણ નથી', pa:'ਕੋਈ ਸਿੱਖਿਆ ਨਹੀਂ', pt:'Sem educação', ar:'بدون تعليم', id:'Tanpa Pendidikan', vi:'Không học vấn', ha:'Babu Ilimi'},
    class6:   {hi:'6वीं पास', en:'Class 6 Pass', kn:'6ನೇ ತರಗತಿ', mr:'6वी उत्तीर्ण', bn:'ষষ্ঠ শ্রেণী', te:'6వ తరగతి', ta:'6ஆம் வகுப்பு', sw:'Darasa la 6', fr:'6ème Classe', es:'Grado 6', gu:'ધોરણ 6 પાસ', pa:'6ਵੀਂ ਪਾਸ', pt:'6ª série', ar:'الصف 6', id:'Kelas 6', vi:'Lớp 6', ha:'Aji 6'},
    class8:   {hi:'8वीं पास', en:'Class 8 Pass', kn:'8ನೇ ತರಗತಿ', mr:'8वी उत्तीर्ण', bn:'অষ্টম শ্রেণী', te:'8వ తరగతి', ta:'8ஆம் வகுப்பு', sw:'Darasa la 8', fr:'8ème Classe', es:'Grado 8', gu:'ધોરણ 8 પાસ', pa:'8ਵੀਂ ਪਾਸ', pt:'8ª série', ar:'الصف 8', id:'Kelas 8', vi:'Lớp 8', ha:'Aji 8'},
    class10:  {hi:'10वीं पास', en:'10th Pass', kn:'10ನೇ ತರಗತಿ', mr:'10वी उत्तीर्ण', bn:'দশম শ্রেণী', te:'10వ తరగతి', ta:'10ஆம் வகுப்பு', sw:'Darasa la 10', fr:'10ème Classe', es:'10° Grado', gu:'ધોરણ 10 પાસ', pa:'10ਵੀਂ ਪਾਸ', pt:'10ª série', ar:'الصف 10', id:'Kelas 10', vi:'Lớp 10', ha:'Aji 10'},
    class12:  {hi:'12वीं पास', en:'12th Pass', kn:'12ನೇ ತರಗತಿ', mr:'12वी उत्तीर्ण', bn:'দ্বাদশ শ্রেণী', te:'12వ తరగతి', ta:'12ஆம் வகுப்பு', sw:'Darasa la 12', fr:'Terminale', es:'12° Grado', gu:'ધોરણ 12 પાસ', pa:'12ਵੀਂ ਪਾਸ', pt:'12ª série', ar:'الصف 12', id:'Kelas 12', vi:'Lớp 12', ha:'Aji 12'},
    iti:      {hi:'ITI', en:'ITI Certificate', kn:'ITI', mr:'ITI', bn:'ITI', te:'ITI', ta:'ITI', sw:'ITI', fr:'ITI', es:'ITI', gu:'ITI', pa:'ITI', pt:'ITI', ar:'ITI', id:'ITI', vi:'ITI', ha:'ITI'},
    diploma:  {hi:'डिप्लोमा', en:'Diploma', kn:'ಡಿಪ್ಲೊಮಾ', mr:'डिप्लोमा', bn:'ডিপ্লোমা', te:'డిప్లొమా', ta:'டிப்ளோமா', sw:'Diploma', fr:'Diplôme', es:'Diploma', gu:'ડિપ્લોમા', pa:'ਡਿਪਲੋਮਾ', pt:'Diploma', ar:'دبلوم', id:'Diploma', vi:'Bằng cao đẳng', ha:'Difloma'},
    bachelor: {hi:'स्नातक', en:"Bachelor's Degree", kn:'ಪದವಿ', mr:'पदवी', bn:'স্নাতক', te:'డిగ్రీ', ta:'இளநிலை', sw:'Shahada ya Kwanza', fr:'Licence', es:'Licenciatura', gu:'સ્નાતક', pa:'ਗ੍ਰੈਜੂਏਟ', pt:'Bacharelado', ar:'بكالوريوس', id:'Sarjana', vi:'Cử nhân', ha:'Digiri'},
    pg:       {hi:'स्नातकोत्तर', en:'Post Graduate', kn:'ಸ್ನಾತಕೋತ್ತರ', mr:'पदव्युत्तर', bn:'স্নাতকোত্তর', te:'పీజీ', ta:'முதுநிலை', sw:'Uzamili', fr:'Master', es:'Posgrado', gu:'અનુસ્નાતક', pa:'ਪੋਸਟ ਗ੍ਰੈਜੂਏਟ', pt:'Pós-graduação', ar:'دراسات عليا', id:'Pascasarjana', vi:'Sau đại học', ha:'Digiri na biyu'},
    phd:      {hi:'पीएचडी', en:'PhD', kn:'ಪಿಎಚ್‌ಡಿ', mr:'पीएचडी', bn:'পিএইচডি', te:'పీహెచ్‌డీ', ta:'முனைவர்', sw:'Uzamivu', fr:'Doctorat', es:'Doctorado', gu:'પીએચડી', pa:'ਪੀਐਚਡੀ', pt:'Doutorado', ar:'دكتوراه', id:'Doktor', vi:'Tiến sĩ', ha:'PhD'},
    exp10:    {hi:'10 साल अनुभव', en:'10 Years Experience', kn:'10 ವರ್ಷ ಅನುಭವ', mr:'10 वर्षे अनुभव', bn:'10 বছরের অভিজ্ঞতা', te:'10 సంవత్సరాల అనుభవం', ta:'10 ஆண்டு அனுபவம்', sw:'Uzoefu wa Miaka 10', fr:'10 ans Expérience', es:'10 Años Experiencia', gu:'10 વર્ષનો અનુભવ', pa:'10 ਸਾਲ ਤਜਰਬਾ', pt:'10 anos de experiência', ar:'خبرة 10 سنوات', id:'Pengalaman 10 Tahun', vi:'10 năm kinh nghiệm', ha:'Shekaru 10 gwaninta'},
    exp20:    {hi:'20 साल अनुभव', en:'20 Years Experience', kn:'20 ವರ್ಷ ಅನುಭವ', mr:'20 वर्षे अनुभव', bn:'20 বছরের অভিজ্ঞতা', te:'20 సంవత్సరాల అనుభవం', ta:'20 ஆண்டு அனுபவம்', sw:'Uzoefu wa Miaka 20', fr:'20 ans Expérience', es:'20 Años Experiencia', gu:'20 વર્ષનો અનુભવ', pa:'20 ਸਾਲ ਤਜਰਬਾ', pt:'20 anos de experiência', ar:'خبرة 20 سنة', id:'Pengalaman 20 Tahun', vi:'20 năm kinh nghiệm', ha:'Shekaru 20 gwaninta'},
    disabled: {hi:'दिव्यांग', en:'Differently Abled', kn:'ಅಂಗವಿಕಲ', mr:'अपंग', bn:'প্রতিবন্ধী', te:'వికలాంగుడు', ta:'மாற்றுத்திறனாளி', sw:'Walemavu', fr:'Handicapé', es:'Discapacitado', gu:'દિવ્યાંગ', pa:'ਅੰਗਹੀਣ', pt:'Pessoa com deficiência', ar:'ذوي الإعاقة', id:'Difabel', vi:'Người khuyết tật', ha:'Nakasa'},
    senior:   {hi:'वरिष्ठ नागरिक', en:'Senior Citizen', kn:'ಹಿರಿಯ ನಾಗರಿಕ', mr:'ज्येष्ठ नागरिक', bn:'প্রবীণ নাগরিক', te:'వృద్ధ పౌరుడు', ta:'மூத்த குடிமகன்', sw:'Mzee', fr:'Sénior', es:'Adulto Mayor', gu:'વરિષ્ઠ નાગરિક', pa:'ਬਜ਼ੁਰਗ ਨਾਗਰਿਕ', pt:'Idoso', ar:'مواطن مسن', id:'Lansia', vi:'Người cao tuổi', ha:'Tsoho'},
    women:    {hi:'महिला', en:'Women', kn:'ಮಹಿಳೆ', mr:'महिला', bn:'মহিলা', te:'మహిళ', ta:'பெண்', sw:'Wanawake', fr:'Femme', es:'Mujer', gu:'મહિલા', pa:'ਔਰਤ', pt:'Mulheres', ar:'نساء', id:'Wanita', vi:'Phụ nữ', ha:'Mata'},
  },

  // ══ HELPER FUNCTIONS ══

  /**
   * किसी label का translation पाओ
   * @param {string} key - label key
   * @param {string} lang - language code
   * @returns {string}
   */
  get: function(key, lang) {
    const label = this.labels[key];
    if (!label) return key;
    return label[lang] || label['en'] || key;
  },

  /**
   * Education level का name पाओ
   * @param {string} eduId
   * @param {string} lang
   */
  getEdu: function(eduId, lang) {
    const edu = this.edu[eduId];
    if (!edu) return eduId;
    return edu[lang] || edu['en'] || eduId;
  },

  /**
   * Current page की language detect करो
   */
  detectLang: function() {
    const path = window.location.pathname;
    const match = path.match(/^\/(hi|en|kn|mr|bn|te|ta|gu|pa|sw|fr|es|pt|ar|id|vi|ha)\//);
    if (match) return match[1];
    const saved = localStorage.getItem('acs_lang');
    if (saved) return saved;
    const browser = (navigator.language || 'en').slice(0,2).toLowerCase();
    return browser;
  },

  /**
   * Page के सब [data-t] elements translate करो
   * Usage: <span data-t="courses">कोर्स</span>
   *        ACS_T.apply('kn') → ಕೋರ್ಸ್
   */
  apply: function(lang) {
    lang = lang || this.detectLang();
    // Menu items
    document.querySelectorAll('[data-t]').forEach(el => {
      const key = el.getAttribute('data-t');
      const translated = this.get(key, lang);
      if (translated) el.textContent = translated;
    });
    // Education selects
    document.querySelectorAll('[data-edu]').forEach(el => {
      const eduId = el.getAttribute('data-edu');
      const translated = this.getEdu(eduId, lang);
      if (translated) el.textContent = translated;
    });
    // Placeholders
    document.querySelectorAll('[data-tp]').forEach(el => {
      const key = el.getAttribute('data-tp');
      const translated = this.get(key, lang);
      if (translated) el.placeholder = translated;
    });
    // Save lang
    localStorage.setItem('acs_lang', lang);
  },

  /**
   * Language switcher HTML generate करो
   */
  langSwitcher: function(currentLang) {
    const langs = [
      {code:'hi', name:'हिंदी'},
      {code:'en', name:'English'},
      {code:'kn', name:'ಕನ್ನಡ'},
      {code:'mr', name:'मराठी'},
      {code:'bn', name:'বাংলা'},
      {code:'te', name:'తెలుగు'},
      {code:'ta', name:'தமிழ்'},
      {code:'gu', name:'ગુજરાતી'},
      {code:'pa', name:'ਪੰਜਾਬੀ'},
      {code:'sw', name:'Kiswahili'},
      {code:'fr', name:'Français'},
      {code:'es', name:'Español'},
      {code:'pt', name:'Português'},
      {code:'ar', name:'العربية'},
      {code:'id', name:'Indonesia'},
      {code:'vi', name:'Tiếng Việt'},
      {code:'ha', name:'Hausa'},
    ];
    return langs.map(l =>
      `<a href="javascript:void(0)"
         onclick="ACS_T.switchLang('${l.code}')"
         style="padding:4px 10px;font-size:12px;border-radius:16px;
         ${l.code===currentLang?'background:var(--gold);color:var(--navy);font-weight:700':'color:rgba(255,255,255,.7)'}"
       >${l.name}</a>`
    ).join('');
  },

  /**
   * Language switch करो — Constitution नियम:
   * असली (हाथ से बना) page हो तो वही दिखे; न हो तभी Google Translate (अंतिम विकल्प)।
   */
  switchLang: function(lang) {
    localStorage.setItem('acs_lang', lang);
    var path = window.location.pathname;
    var rx = /^\/(hi|en|kn|mr|bn|te|ta|gu|pa|sw|fr|es|pt|ar|id|vi|ha)\//;
    // page किसी भाषा-folder में नहीं → सीधे current page का Google-Translate
    if (!rx.test(path)) { ACS_T.googleFallback(lang); return; }
    var target = path.replace(rx, '/' + lang + '/');
    // असली page मौजूद? (HEAD जाँच) — हो तो वही; न हो तो Google Translate
    fetch(target, { method: 'HEAD' })
      .then(function (r) { if (r.ok) window.location.href = target; else ACS_T.googleFallback(lang); })
      .catch(function () { ACS_T.googleFallback(lang); });
  },

  /**
   * Google Translate — अंतिम विकल्प (असली page न हो तभी)।
   * googtrans cookie + widget → current page उसी भाषा में अनुवाद।
   */
  googleFallback: function(lang) {
    if (lang === 'hi' || lang === 'en') { /* base — आमतौर पर असली page होता है */ }
    document.cookie = 'googtrans=/auto/' + lang + ';path=/';
    if (!document.getElementById('google_translate_element')) {
      var d = document.createElement('div');
      d.id = 'google_translate_element';
      d.style.display = 'none';
      document.body.appendChild(d);
    }
    if (!window.__acsGtLoaded) {
      window.__acsGtLoaded = true;
      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({ pageLanguage: 'auto', autoDisplay: false }, 'google_translate_element');
      };
      var s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(s);
      setTimeout(function () { window.location.reload(); }, 400);
    } else {
      window.location.reload();
    }
  },
};

// Auto-apply on page load
document.addEventListener('DOMContentLoaded', function() {
  // Apply translations
  const lang = ACS_T.detectLang();
  ACS_T.apply(lang);
});
