/* ============================================================
   ACS acs-react.js v1.1 (09-Nov-2026) — साझा reaction-पट्टी, 15-भाषा labels (html lang से; अनजान=en)
   👍👎💬🔗 किसी भी पेज पर: <div id="acsReactSlot"></div> + यह script।
   पसंद/नापसंद = device-local राय (DPDP; बेनाम गिनती server-दौर में) ·
   💬 = WhatsApp-सुझाव · 🔗 = navigator.share, fallback WhatsApp।
   CSS भीतर से inject — किसी css-फ़ाइल पर निर्भर नहीं। ES5।
   (पाठ-पेजों की पट्टी course-lesson.js v1.5 में अलग — वही रूप।)
   ============================================================ */
(function(){
  try{
    var slot=document.getElementById("acsReactSlot");
    if(!slot||document.getElementById("acsReactBar")) return;
    var st=document.createElement("style");
    st.textContent=".acs-react{text-align:center;margin:26px auto 10px;padding:16px 10px;background:#F5F7FA;border:2px solid #0B1F3A;border-radius:16px;max-width:760px}"+
    ".acs-react-q{font-size:19px;font-weight:800;color:#0B1F3A;margin:0 0 12px}"+
    ".acs-react-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}"+
    ".acs-rbtn{display:inline-flex;align-items:center;gap:7px;font-size:18px;font-weight:800;font-family:inherit;color:#0B1F3A;background:#fff;border:2px solid #0B1F3A;border-radius:999px;padding:10px 18px;cursor:pointer;text-decoration:none;line-height:1.2}"+
    ".acs-rbtn:active{transform:scale(.96)}"+
    ".acs-ron{background:#2E7D32;border-color:#2E7D32;color:#fff}"+
    ".acs-roff{background:#0B1F3A;color:#F9A825}"+
    ".acs-react-note{font-size:16px;color:#2E7D32;font-weight:700;margin:10px 0 0}";
    document.head.appendChild(st);
    var KEY="acsReact:"+location.pathname;
    var cur=""; try{ cur=localStorage.getItem(KEY)||""; }catch(e){}
    var ttl=(document.title||"ACS").split("|")[0].replace(/\s+$/,"");
    var url=location.origin+location.pathname;
    var WAPP="https://wa.me/919431210092?text=";
    var LX={
      hi:{q:"यह पेज कैसा लगा?",like:"पसंद",dis:"नापसंद",cmt:"कमेंट",sh:"शेयर",wa:"इस पेज पर मेरी बात/सवाल: ",nl:"धन्यवाद! आपकी राय दर्ज हुई।",nd:"राय दर्ज। क्या सुधारें? 💬 कमेंट से बताइए — हम पढ़ते हैं।"},
      en:{q:"How was this page?",like:"Like",dis:"Dislike",cmt:"Comment",sh:"Share",wa:"My question/feedback on this page: ",nl:"Thanks! Your response is saved.",nd:"Noted. What should we improve? Tell us via 💬 Comment — we read it."},
      zh:{q:"这个页面怎么样？",like:"喜欢",dis:"不喜欢",cmt:"留言",sh:"分享",wa:"我对此页面的问题/反馈：",nl:"谢谢！您的意见已记录。",nd:"已记录。该改进什么？请用 💬 留言告诉我们——我们会认真阅读。"},
      es:{q:"¿Qué te pareció esta página?",like:"Me gusta",dis:"No me gusta",cmt:"Comentar",sh:"Compartir",wa:"Mi pregunta/opinión sobre esta página: ",nl:"¡Gracias! Tu opinión quedó guardada.",nd:"Anotado. ¿Qué mejoramos? Cuéntanos con 💬 Comentar — lo leemos."},
      ar:{q:"ما رأيك في هذه الصفحة؟",like:"أعجبني",dis:"لم يعجبني",cmt:"تعليق",sh:"مشاركة",wa:"سؤالي/ملاحظتي حول هذه الصفحة: ",nl:"شكرًا! تم تسجيل رأيك.",nd:"تم التسجيل. ما الذي نحسّنه؟ أخبرنا عبر 💬 تعليق — نحن نقرأ."},
      fr:{q:"Que pensez-vous de cette page ?",like:"J’aime",dis:"Je n’aime pas",cmt:"Commenter",sh:"Partager",wa:"Ma question/mon avis sur cette page : ",nl:"Merci ! Votre avis est enregistré.",nd:"C’est noté. Que faut-il améliorer ? Dites-le via 💬 Commenter — nous lisons tout."},
      bn:{q:"এই পেজটি কেমন লাগল?",like:"পছন্দ",dis:"অপছন্দ",cmt:"মন্তব্য",sh:"শেয়ার",wa:"এই পেজ নিয়ে আমার কথা/প্রশ্ন: ",nl:"ধন্যবাদ! আপনার মতামত নথিভুক্ত হয়েছে।",nd:"নথিভুক্ত হয়েছে। কী উন্নত করব? 💬 মন্তব্যে জানান — আমরা পড়ি।"},
      pt:{q:"O que achou desta página?",like:"Gostei",dis:"Não gostei",cmt:"Comentar",sh:"Compartilhar",wa:"Minha pergunta/opinião sobre esta página: ",nl:"Obrigado! Sua opinião foi registrada.",nd:"Anotado. O que melhorar? Conte pelo 💬 Comentar — nós lemos."},
      ru:{q:"Как вам эта страница?",like:"Нравится",dis:"Не нравится",cmt:"Комментарий",sh:"Поделиться",wa:"Мой вопрос/отзыв об этой странице: ",nl:"Спасибо! Ваш отзыв записан.",nd:"Записано. Что улучшить? Напишите через 💬 Комментарий — мы читаем."},
      id:{q:"Bagaimana halaman ini?",like:"Suka",dis:"Tidak suka",cmt:"Komentar",sh:"Bagikan",wa:"Pertanyaan/masukan saya tentang halaman ini: ",nl:"Terima kasih! Masukanmu tersimpan.",nd:"Tercatat. Apa yang perlu diperbaiki? Beri tahu lewat 💬 Komentar — kami membacanya."},
      ur:{q:"یہ صفحہ کیسا لگا؟",like:"پسند",dis:"ناپسند",cmt:"تبصرہ",sh:"شیئر",wa:"اس صفحے پر میری بات/سوال: ",nl:"شکریہ! آپ کی رائے درج ہو گئی۔",nd:"رائے درج۔ کیا بہتر کریں؟ 💬 تبصرہ سے بتائیں — ہم پڑھتے ہیں۔"},
      de:{q:"Wie findest du diese Seite?",like:"Gefällt mir",dis:"Gefällt mir nicht",cmt:"Kommentar",sh:"Teilen",wa:"Meine Frage/mein Feedback zu dieser Seite: ",nl:"Danke! Deine Rückmeldung ist gespeichert.",nd:"Notiert. Was sollen wir verbessern? Sag es uns per 💬 Kommentar — wir lesen alles."},
      ja:{q:"このページはいかがでしたか？",like:"いいね",dis:"よくない",cmt:"コメント",sh:"シェア",wa:"このページについての質問・感想：",nl:"ありがとうございます！ご意見を記録しました。",nd:"記録しました。どこを改善すべきですか？💬 コメントで教えてください。必ず読みます。"},
      mr:{q:"हे पान कसे वाटले?",like:"आवडले",dis:"नाही आवडले",cmt:"कमेंट",sh:"शेअर",wa:"या पानाबद्दल माझे म्हणणे/प्रश्न: ",nl:"धन्यवाद! तुमचे मत नोंदवले गेले.",nd:"नोंद झाली. काय सुधारावे? 💬 कमेंटने सांगा — आम्ही वाचतो."},
      te:{q:"ఈ పేజీ ఎలా అనిపించింది?",like:"నచ్చింది",dis:"నచ్చలేదు",cmt:"కామెంట్",sh:"షేర్",wa:"ఈ పేజీపై నా మాట/ప్రశ్న: ",nl:"ధన్యవాదాలు! మీ అభిప్రాయం నమోదైంది.",nd:"నమోదైంది. ఏమి మెరుగుపరచాలి? 💬 కామెంట్ ద్వారా చెప్పండి — మేము చదువుతాం."},
      ko:{q:"이 페이지는 어땠나요?",like:"좋아요",dis:"싫어요",cmt:"댓글",sh:"공유",wa:"이 페이지에 대한 내 질문/의견: ",nl:"감사합니다! 의견이 저장되었습니다.",nd:"기록했습니다. 무엇을 고칠까요? 💬 댓글로 알려 주세요: 꼭 읽습니다."},
      he:{q:"איך היה העמוד הזה?",like:"אהבתי",dis:"לא אהבתי",cmt:"תגובה",sh:"שיתוף",wa:"השאלה או המשוב שלי על העמוד הזה: ",nl:"תודה! התגובה שלכם נשמרה.",nd:"נרשם. מה לשפר? כתבו לנו ב-💬 תגובה: אנחנו קוראים."},
      ta:{q:"இந்தப் பக்கம் எப்படி இருந்தது?",like:"பிடித்தது",dis:"பிடிக்கவில்லை",cmt:"கருத்து",sh:"பகிர்",wa:"இந்தப் பக்கம் பற்றிய என் கேள்வி/கருத்து: ",nl:"நன்றி! உங்கள் கருத்து பதிவானது.",nd:"பதிவானது. எதை மேம்படுத்தலாம்? 💬 கருத்து மூலம் சொல்லுங்கள்: நாங்கள் படிக்கிறோம்."},
      kn:{q:"ಈ ಪುಟ ಹೇಗಿತ್ತು?",like:"ಇಷ್ಟವಾಯಿತು",dis:"ಇಷ್ಟವಾಗಲಿಲ್ಲ",cmt:"ಅಭಿಪ್ರಾಯ",sh:"ಹಂಚಿ",wa:"ಈ ಪುಟದ ಬಗ್ಗೆ ನನ್ನ ಪ್ರಶ್ನೆ/ಅಭಿಪ್ರಾಯ: ",nl:"ಧನ್ಯವಾದ! ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ದಾಖಲಾಯಿತು.",nd:"ದಾಖಲಾಯಿತು. ಏನು ಸುಧಾರಿಸಬೇಕು? 💬 ಅಭಿಪ್ರಾಯದ ಮೂಲಕ ತಿಳಿಸಿ: ನಾವು ಓದುತ್ತೇವೆ."},
      gu:{q:"આ પાનું કેવું લાગ્યું?",like:"ગમ્યું",dis:"ન ગમ્યું",cmt:"ટિપ્પણી",sh:"શેર",wa:"આ પાના વિશે મારો પ્રશ્ન/અભિપ્રાય: ",nl:"આભાર! તમારો અભિપ્રાય નોંધાયો.",nd:"નોંધાયું. શું સુધારીએ? 💬 ટિપ્પણીથી કહો: અમે વાંચીએ છીએ."},
      ml:{q:"ഈ പേജ് എങ്ങനെയുണ്ടായിരുന്നു?",like:"ഇഷ്ടപ്പെട്ടു",dis:"ഇഷ്ടപ്പെട്ടില്ല",cmt:"അഭിപ്രായം",sh:"പങ്കുവയ്ക്കൂ",wa:"ഈ പേജിനെക്കുറിച്ച് എന്റെ ചോദ്യം/അഭിപ്രായം: ",nl:"നന്ദി! നിങ്ങളുടെ അഭിപ്രായം രേഖപ്പെടുത്തി.",nd:"രേഖപ്പെടുത്തി. എന്ത് മെച്ചപ്പെടുത്തണം? 💬 അഭിപ്രായത്തിലൂടെ പറയൂ: ഞങ്ങൾ വായിക്കും."},
      pa:{q:"ਇਹ ਪੰਨਾ ਕਿਹੋ ਜਿਹਾ ਲੱਗਿਆ?",like:"ਪਸੰਦ ਆਇਆ",dis:"ਪਸੰਦ ਨਹੀਂ ਆਇਆ",cmt:"ਟਿੱਪਣੀ",sh:"ਸਾਂਝਾ ਕਰੋ",wa:"ਇਸ ਪੰਨੇ ਬਾਰੇ ਮੇਰਾ ਸਵਾਲ/ਰਾਇ: ",nl:"ਧੰਨਵਾਦ! ਤੁਹਾਡੀ ਰਾਇ ਦਰਜ ਹੋ ਗਈ।",nd:"ਦਰਜ ਹੋ ਗਿਆ। ਕੀ ਸੁਧਾਰੀਏ? 💬 ਟਿੱਪਣੀ ਰਾਹੀਂ ਦੱਸੋ: ਅਸੀਂ ਪੜ੍ਹਦੇ ਹਾਂ।"},
      or:{q:"ଏହି ପୃଷ୍ଠା କେମିତି ଲାଗିଲା?",like:"ଭଲ ଲାଗିଲା",dis:"ଭଲ ଲାଗିଲା ନାହିଁ",cmt:"ମନ୍ତବ୍ୟ",sh:"ସେୟାର",wa:"ଏହି ପୃଷ୍ଠା ବିଷୟରେ ମୋ ପ୍ରଶ୍ନ/ମତ: ",nl:"ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ମତ ସଞ୍ଚିତ ହେଲା।",nd:"ସଞ୍ଚିତ ହେଲା। କ'ଣ ସୁଧାରିବା? 💬 ମନ୍ତବ୍ୟ ମାଧ୍ୟମରେ କୁହନ୍ତୁ: ଆମେ ପଢ଼ୁ।"},
      as:{q:"এই পৃষ্ঠাটো কেনে লাগিল?",like:"ভাল লাগিল",dis:"ভাল নালাগিল",cmt:"মন্তব্য",sh:"শ্বেয়াৰ",wa:"এই পৃষ্ঠাৰ বিষয়ে মোৰ প্ৰশ্ন/মতামত: ",nl:"ধন্যবাদ! আপোনাৰ মতামত সংৰক্ষিত হ'ল।",nd:"সংৰক্ষিত হ'ল। কি উন্নত কৰিম? 💬 মন্তব্যৰ জৰিয়তে কওক: আমি পঢ়োঁ।"},
      ne:{q:"यो पाना कस्तो लाग्यो?",like:"मन पर्‍यो",dis:"मन परेन",cmt:"टिप्पणी",sh:"सेयर",wa:"यो पानाबारे मेरो प्रश्न/राय: ",nl:"धन्यवाद! तपाईंको राय सुरक्षित भयो।",nd:"सुरक्षित भयो। के सुधार्ने? 💬 टिप्पणीमार्फत भन्नुहोस्: हामी पढ्छौँ।"},
      ms:{q:"Bagaimana halaman ini?",like:"Suka",dis:"Tidak suka",cmt:"Komen",sh:"Kongsi",wa:"Soalan/pendapat saya tentang halaman ini: ",nl:"Terima kasih! Pendapat anda telah disimpan.",nd:"Dicatat. Apa yang patut kami baiki? Beritahu melalui 💬 Komen: kami membacanya."},
      tl:{q:"Kumusta ang pahinang ito?",like:"Gusto ko",dis:"Ayaw ko",cmt:"Komento",sh:"Ibahagi",wa:"Ang tanong/opinyon ko tungkol sa pahinang ito: ",nl:"Salamat! Naitala ang iyong opinyon.",nd:"Naitala. Ano ang dapat naming pagbutihin? Sabihin sa 💬 Komento: binabasa namin ito."},
      vi:{q:"Bạn thấy trang này thế nào?",like:"Thích",dis:"Không thích",cmt:"Bình luận",sh:"Chia sẻ",wa:"Câu hỏi/ý kiến của tôi về trang này: ",nl:"Cảm ơn! Ý kiến của bạn đã được lưu.",nd:"Đã ghi nhận. Chúng tôi nên cải thiện gì? Hãy nói qua 💬 Bình luận: chúng tôi đều đọc."},
      th:{q:"หน้านี้เป็นอย่างไรบ้าง",like:"ชอบ",dis:"ไม่ชอบ",cmt:"ความคิดเห็น",sh:"แชร์",wa:"คำถาม/ความเห็นของฉันเกี่ยวกับหน้านี้: ",nl:"ขอบคุณ! บันทึกความเห็นของคุณแล้ว",nd:"รับทราบแล้ว ควรปรับปรุงอะไร บอกเราผ่าน 💬 ความคิดเห็น: เราอ่านทุกข้อ"},
      sw:{q:"Ukurasa huu umekuaje?",like:"Nimependa",dis:"Sijapenda",cmt:"Maoni",sh:"Shiriki",wa:"Swali/maoni yangu kuhusu ukurasa huu: ",nl:"Asante! Maoni yako yamehifadhiwa.",nd:"Tumepokea. Tuboreshe nini? Tuambie kupitia 💬 Maoni: tunasoma."}
    };
    var LG=(document.documentElement.getAttribute("lang")||"hi").split("-")[0].toLowerCase();
    var TX=LX[LG]||LX.en;
    var box=document.createElement("div");
    box.id="acsReactBar"; box.className="acs-react";
    box.innerHTML='<p class="acs-react-q">'+TX.q+'</p>'+
      '<div class="acs-react-row">'+
      '<button type="button" id="arLike" class="acs-rbtn" aria-pressed="false">👍 <span>'+TX.like+'</span></button>'+
      '<button type="button" id="arDis" class="acs-rbtn" aria-pressed="false">👎 <span>'+TX.dis+'</span></button>'+
      '<a id="arCmt" class="acs-rbtn" target="_blank" rel="noopener" href="'+WAPP+
        encodeURIComponent(TX.wa+ttl+" — "+url)+'">💬 <span>'+TX.cmt+'</span></a>'+
      '<button type="button" id="arShare" class="acs-rbtn">🔗 <span>'+TX.sh+'</span></button>'+
      '</div><p id="arNote" class="acs-react-note" style="display:none"></p>';
    slot.appendChild(box);
    var L=document.getElementById("arLike"),D=document.getElementById("arDis"),
        S=document.getElementById("arShare"),N=document.getElementById("arNote");
    function paint(){
      L.className="acs-rbtn"+(cur==="like"?" acs-ron":"");
      D.className="acs-rbtn"+(cur==="dis"?" acs-roff":"");
      L.setAttribute("aria-pressed",cur==="like"?"true":"false");
      D.setAttribute("aria-pressed",cur==="dis"?"true":"false");
    }
    function note(m){ N.textContent=m; N.style.display="block"; }
    function vote(v){
      cur=(cur===v)?"":v;
      try{ localStorage.setItem(KEY,cur); }catch(e){}
      paint();
      if(cur==="like") note(TX.nl);
      else if(cur==="dis") note(TX.nd);
      else N.style.display="none";
    }
    L.onclick=function(){vote("like");};
    D.onclick=function(){vote("dis");};
    S.onclick=function(){
      var done=false;
      try{ if(navigator.share){ navigator.share({title:ttl,url:url}); done=true; } }catch(e){}
      if(!done){ try{ window.open(WAPP+encodeURIComponent(ttl+" — "+url),"_blank"); }catch(e){} }
    };
    paint();
  }catch(e){}
})();
