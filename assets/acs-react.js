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
      te:{q:"ఈ పేజీ ఎలా అనిపించింది?",like:"నచ్చింది",dis:"నచ్చలేదు",cmt:"కామెంట్",sh:"షేర్",wa:"ఈ పేజీపై నా మాట/ప్రశ్న: ",nl:"ధన్యవాదాలు! మీ అభిప్రాయం నమోదైంది.",nd:"నమోదైంది. ఏమి మెరుగుపరచాలి? 💬 కామెంట్ ద్వారా చెప్పండి — మేము చదువుతాం."}
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
