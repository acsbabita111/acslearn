/* seo_desc_overrides.js v1.0 (12-Nov-2026) : हाथ से लिखे description : एकमात्र घर।
   कब काम आता है: जिस पाठ के पहले अनुच्छेदों में कोई पूरा वाक्य 160 अक्षर में नहीं समाता, वहाँ यंत्र
   (lib_seo_hunar.js का fromBody) पूरा वाक्य नहीं बना पाता। ऐसे पाठ का description यहाँ लिखा जाता है।
   नियम: हर description 70 से 160 अक्षर का, पूरे वाक्य पर ख़त्म, और पाठ की अपनी सामग्री से ही
   (नीचे के पाँचों description पाठ की अपनी सामग्री और उसके "आज की सीख" वाले सार से हैं; कुछ भी गढ़ा नहीं)।
   जाँच-यंत्र dev_seo_check.js (जाँच-13) बताता है कि किस नए पेज को यहाँ जोड़ना है।
   कुंजी = पेज का पता (repo के भीतर) · मान = description। */
"use strict";
module.exports = {
  "courses/hi/digital/ecom/ecm-288-ai-commerce-safety-2-ai-chitr-disclosure-nakaali-riv.html":
    "AI-Commerce में AI-चित्र disclosure, नक़ली reviews, prompt-injection और गोपनीय दस्तावेज़ों की सुरक्षा: चारों जोखिमों को पहचानना और सँभालना सीखें।",
  "courses/hi/four-wheeler-driver/fwd-17-11-eevi-ev-electric-vehicle-men-eeko-draiving-renj-ra.html":
    "इलेक्ट्रिक गाड़ियों में रीजेनरेटिव-ब्रेकिंग, अनुमानित ड्राइविंग और नरम एक्सेलरेशन, \"रेंज\" को काफ़ी बेहतर बनाते हैं।",
  "courses/hi/four-wheeler-driver/fwd-15-15-aip-yatri-raid-heling-ride-hailing-reting-rating-r.html":
    "राइड-हेलिंग में रेटिंग, रद्दीकरण और शिकायत-प्रबंधन आधुनिक यात्री-सेवा का महत्वपूर्ण हिस्सा हैं; ईमानदार सेवा और स्पष्ट रिपोर्टिंग पर ध्यान दें।",
  "courses/hi/four-wheeler-driver/fwd-14-05-rat-men-gadai-khaarabi-dikhate-rahane-ke-upay.html":
    "रात में गाड़ी-ख़राबी में उजली जगह चुनना, सभी बत्तियाँ चालू रखना, परावर्तक सामग्री पहनना और चेतावनी त्रिकोण का दोहरा महत्व समझना, मुख्य सिद्धांत हैं।",
  "courses/hi/four-wheeler-driver/fwd-16-05-ladan-ka-saral-hisab-dhuri-bhar-axle-load-ragada-f.html":
    "धुरी-भार का समान बँटवारा, पर्याप्त रगड़ और बाँधने की क्षमता के आधे से ज़्यादा भार न डालना, सुरक्षित लदान के सरल, व्यावहारिक सिद्धांत हैं।"
};
