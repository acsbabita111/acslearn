/* ============================================================
   /assets/aptitude_data.js — v8.0 (खेप-1 से 8: प्रश्न 1-650 · मूल भाषा: हिंदी)
   ACS Aptitude प्रश्न-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - प्रश्न-गिनती: 650 (202 पट्टी + 181 चित्र-चुनाव + 166 जोड़ी + 101 कहानी) + 4 कथाएँ
   - udy-ठप्पा नियम (खेप-8 से, Founder-आदेश 20-Jul): हर नए प्रश्न पर udy:[...] =
     जुड़े उद्यमों की n-संख्या (udyam_data.js से)। लक्ष्य: 950/950 उद्यम मशीन-गिनती
     से ढके — कोई धंधा (जैसे बकरी-पालन #22) छूटे नहीं। इंजन के लिए सुप्त-खाना।
   - खेप-7 (set:6) = उद्यम-पहचान परत: एक प्रश्न = एक ख़ास धंधा (मुर्गी-farm,
     AC-मरम्मत, tent-house, दाल-मिल…) — 950-कोर्स सटीकता की ओर पहली परत।
     दीर्घ-लक्ष्य: 950 × 2 ≈ 1900 प्रश्न (Founder-नियम, 20-Jul)। अभी गिनती
     24-समूह पर; उद्यम-ठप्पा बड़े-टेस्ट इंजन-दौर में इन्हीं प्रश्नों पर जुड़ेगा।
   - खेप-6 (set:5) = बड़ों की पट्टी: काम-दुनिया के परिपक्व प्रश्न — band:(2,3),
     10-13 वालों को नहीं परोसे जाएँगे। शून्य नया चित्र — सब पुराने भंडार से।
   - खेप-5 (set:4) = संतुलन-खेप: पतले समूह (खेल · रोबोट · विधिक · धार्मिक ·
     जलवायु · वित्त · खनन) मोटे किए गए। 250-लक्ष्य पार।
   - स्केल-परत नियम (v4.0): layer:3 प्रश्नों पर mg नहीं — "amb" हौसला-अंक
     (1 छोटा-पक्का … 5 बड़ा सपना); दोनों जवाब सही, कोई शर्म-दबाव नहीं।
     पट्टी पर amb:true = चेहरा 1-5 सीधे हौसला-अंक। भावी इंजन इसी से
     "सुझाया स्केल" (L1-L15 दिशा) निकालेगा — certified score सिर्फ़ गणित।
   - सेट-नियम (v3.0): "set" खाना न हो = set 1 (खेप-1/2)। खेप-3 = set:2,
     layer:2 (गहराई-परत)। भविष्य में मशीन set-दर-set परोसेगी — 20-सेट नींव।
   - सभी 24 मास्टर-समूह छुए गए (खेप-2 में रसायन-13 · वैश्विक-14 ·
     रोबोटिक्स-19 · धार्मिक-21 भी शामिल)।
   - प्रश्न-पाठ Founder-मुहर (19-Jul-2026) से हूबहू — बदलना निषिद्ध।
   - mg = उद्यम-सूची (udyam_data.js) के 24 मास्टर-समूह के नंबर।
     समूह-नाम का एकमात्र घर = उद्यम-पेज की MG-सूची (यहाँ दोहराया नहीं)।
   - चित्र अलग फ़ाइल में: /assets/aptitude_art.js (id से बुलाए जाते हैं)।
   - band: 1=खोज(10-13) 2=दिशा(14-17) 3=राह(18+) · layer-1 = मुफ़्त-झलक।
   - गिनती-विधि (v3.9): पट्टी = 5 चेहरे 😖🙁😐🙂😍 → −5/−2/0/+2/+5
     (😐 = 0 = "जानता नहीं" — अलग गिनती, औसत में नहीं);
     चित्र-चुनाव = सबसे-पहले +3, सबसे-कम −1; जोड़ी = चुना +2;
     कहानी = हर विकल्प के अपने अंक (pts)।
   ============================================================ */
window.APT_DATA = {
  version: "1.0",
  lang: "hi",
  scoring: {
    scale: { faces: [-5, -2, 0, 2, 5] },
    pick:  { first: 3, last: -1 },
    pair:  { pick: 2 },
    story: { defaultPts: 2 }
  },
  questions: [

  { id:"q001", type:"scale", band:[1,2,3], layer:1, img:"toy_open",
    text:"खिलौना या घड़ी खोलकर देखना कि अंदर क्या है — कैसा लगता है?",
    mg:[3] },

  { id:"q002", type:"scale", band:[1,2,3], layer:1, img:"sick_care",
    text:"बीमार आदमी या जानवर की देखभाल करना — कैसा लगता है?",
    mg:[6] },

  { id:"q003", type:"scale", band:[1,2,3], layer:1, img:"mobile_app",
    text:"मोबाइल में नई app (ऐप) खोजकर उसे पूरा समझना — कैसा लगता है?",
    mg:[7] },

  { id:"q004", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot",   label:"खाना पकाना",           mg:[10,1] },
      { img:"embroidery", label:"कपड़े पर कढ़ाई",         mg:[5,12] },
      { img:"wood_toy",   label:"लकड़ी से खिलौना",       mg:[12] },
      { img:"clay_art",   label:"मिट्टी से मूर्ति",        mg:[12,17] }
    ] },

  { id:"q005", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"brick_wall",     label:"ईंट से दीवार जोड़ना",              mg:[4] },
      { img:"bulb_fix",       label:"बल्ब-पंखा ठीक करना",             mg:[2,3] },
      { img:"sewing_machine", label:"सिलाई-मशीन चलाना",              mg:[5,3] },
      { img:"vehicle_sound",  label:"गाड़ी की आवाज़ से ख़राबी पकड़ना",   mg:[3,8] }
    ] },

  { id:"q006", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"shop_sell",   label:"दुकान पर बेचना और हिसाब",       mg:[9] },
      { img:"piggy_bank",  label:"गुल्लक का पैसा जोड़ना",           mg:[9,23] },
      { img:"decoration",  label:"शादी-मेले की सजावट",            mg:[17,10] },
      { img:"travel_road", label:"नए रास्ते घूमना, याद रखना",       mg:[8,10] }
    ] },

  { id:"q007", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"seed_sow",     label:"बीज बोना, पौधा बढ़ाना",         mg:[1] },
      { img:"fish_pond",    label:"तालाब में मछली-पालन",          mg:[1] },
      { img:"cow_milk",     label:"गाय दुहना, पशु-सेवा",           mg:[1] },
      { img:"forest_birds", label:"जंगल के पेड़-पक्षी पहचानना",     mg:[20] }
    ] },

  { id:"q008", type:"pair", band:[1,2,3], layer:1,
    text:"मेले में पहले कहाँ जाओगे — झूले की मशीन देखने, या मंच पर गाना सुनने?",
    opts:[
      { img:"ride_machine", label:"झूले की मशीन देखने", mg:[3] },
      { img:"stage_song",   label:"मंच पर गाना सुनने",  mg:[10,12] }
    ] },

  { id:"q009", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा मज़ा किसमें — पैसे गिनने-जोड़ने में, या मशीन चलाने में?",
    opts:[
      { img:"count_money", label:"पैसे गिनना-जोड़ना", mg:[9,23] },
      { img:"run_machine", label:"मशीन चलाना",       mg:[3] }
    ] },

  { id:"q010", type:"story", band:[1,2,3], layer:1, img:"leaky_roof",
    text:"बारिश में स्कूल की छत टपकने लगी। तुम क्या करोगे?",
    opts:[
      { label:"चढ़कर देखूँगा कहाँ से टपकती है",        mg:[3],     pts:2 },
      { label:"सबका सामान हटाकर बचाऊँगा",           mg:[24],    pts:2 },
      { label:"मास्टरजी तक ख़बर दौड़ाऊँगा",           mg:[12,18], pts:2 },
      { label:"सोचूँगा — पक्की छत बनती कैसे है?",     mg:[4],     pts:2 }
    ] },

  { id:"q011", type:"scale", band:[1,2,3], layer:1, img:"teach_kids",
    text:"छोटे बच्चों को पढ़ाना या कुछ सिखाना — कैसा लगता है?",
    mg:[11] },

  { id:"q012", type:"scale", band:[1,2,3], layer:1, img:"jugaad_new",
    text:"पुराने सामान से काम की नई चीज़ बना देना — कैसा लगता है?",
    mg:[2,15] },

  { id:"q013", type:"scale", band:[1,2,3], layer:1, img:"team_win",
    text:"खेल में टीम बनाना और सबको साथ लेकर जिताना — कैसा लगता है?",
    mg:[10,22] },

  { id:"q014", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"teach_kids",  label:"बच्चों को पढ़ाती दीदी",          mg:[11] },
      { img:"boy_bandage", label:"पट्टी बाँधता लड़का",             mg:[6] },
      { img:"stage_play",  label:"मंच पर नाटक",                  mg:[10,12] },
      { img:"news_read",   label:"माइक पर ख़बर पढ़ती लड़की",       mg:[12,18] }
    ] },

  { id:"q015", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app", label:"मोबाइल पर app (ऐप) चलाना",   mg:[7] },
      { img:"board_wire", label:"बिजली-बोर्ड जोड़ना",           mg:[2,3] },
      { img:"bolt_fit",   label:"मशीन के पुर्ज़े कसना",          mg:[3] },
      { img:"hisab_copy", label:"कॉपी में हिसाब लिखना",         mg:[9,23] }
    ] },

  { id:"q016", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"seed_sow",   label:"बीज बोती लड़की",     mg:[1] },
      { img:"brick_wall", label:"ईंट जोड़ता लड़का",    mg:[4] },
      { img:"embroidery", label:"कढ़ाई करती लड़की",   mg:[5,12] },
      { img:"news_boy",   label:"ख़बर सुनाता लड़का",   mg:[12,18] }
    ] },

  { id:"q017", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"bus_drive",  label:"बस-ट्रैक्टर चलाना",     mg:[8] },
      { img:"mandi_taul", label:"मंडी में तौल-भाव",     mg:[9] },
      { img:"hen_farm",   label:"मुर्गी-फ़ार्म सँभालना",   mg:[1] },
      { img:"compost",    label:"कचरे से खाद बनाना",    mg:[20,2] }
    ] },

  { id:"q018", type:"pair", band:[1,2,3], layer:1,
    text:"शादी में कौन-सा काम — सजावट सँभालना, या खाने की देखरेख?",
    opts:[
      { img:"decoration", label:"सजावट सँभालना",   mg:[17,10] },
      { img:"food_serve", label:"खाने की देखरेख",  mg:[10] }
    ] },

  { id:"q019", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा अच्छा क्या — बस-ट्रेन से नई जगह घूमना, या मेले में दुकान लगाकर बेचना?",
    opts:[
      { img:"travel_road", label:"नई जगह घूमना",           mg:[8,10] },
      { img:"shop_sell",   label:"दुकान लगाकर बेचना",      mg:[9] }
    ] },

  { id:"q020", type:"story", band:[1,2,3], layer:1, img:"mela_gate",
    text:"गाँव के मेले में तुम्हें एक दिन का काम मिले — कौन-सा चुनोगे?",
    opts:[
      { label:"झूले की मशीन सँभालना",        mg:[3],     pts:2 },
      { label:"टिकट-पैसे का हिसाब",          mg:[9,23],  pts:2 },
      { label:"मंच का कार्यक्रम चलाना",       mg:[10,12], pts:2 },
      { label:"खोया-पाया व भीड़ सँभालना",     mg:[24],    pts:2 }
    ] },

  { id:"q021", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा मज़ा किसमें — उलझी पहेली अकेले सुलझाने में, या सबको जोड़कर काम कराने में?",
    opts:[
      { img:"puzzle_solo", label:"पहेली अकेले सुलझाना",     mg:[16,18] },
      { img:"team_win",    label:"सबको जोड़कर काम कराना",  mg:[22,16] }
    ] },

  { id:"q022", type:"pair", band:[1,2,3], layer:1,
    text:"कोई चीज़ बनानी आ जाए तो — अकेले बैठकर और बनाओगे, या दूसरों को भी सिखाओगे?",
    opts:[
      { img:"make_alone", label:"अकेले बैठकर और बनाना",  mg:[3,12] },
      { img:"teach_kids", label:"दूसरों को भी सिखाना",    mg:[11] }
    ] },

  { id:"q023", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा लगाव किससे — पालतू जानवरों से, या नदी-पेड़-मौसम से?",
    opts:[
      { img:"animal_love",  label:"पालतू जानवरों से",   mg:[1] },
      { img:"forest_birds", label:"नदी-पेड़-मौसम से",   mg:[20] }
    ] },

  { id:"q024", type:"story", band:[1,2,3], layer:1, img:"note_100",
    text:"तुम्हें ₹100 मिले। क्या करोगे?",
    opts:[
      { label:"गुल्लक में जोड़ूँगा",              mg:[9,23], pts:2 },
      { label:"सामान लाकर आगे बेचूँगा",         mg:[9],    pts:2 },
      { label:"औज़ार ख़रीदकर कुछ बनाऊँगा",      mg:[3,12], pts:2 },
      { label:"बीज या चूज़ा ख़रीदूँगा",           mg:[1],    pts:2 }
    ] },

  { id:"q025", type:"scale", band:[1,2,3], layer:1, img:"soap_make",
    text:"साबुन, रंग या इत्र जैसी चीज़ें घर पर बनाकर देखना — कैसा लगता है?",
    mg:[13] },

  { id:"q026", type:"scale", band:[1,2,3], layer:1, img:"robot_toy",
    text:"ऐसा खिलौना बनाना जो ख़ुद चले — कैसा लगता है?",
    mg:[19,15] },

  { id:"q027", type:"scale", band:[1,2,3], layer:1, img:"world_map",
    text:"दुनिया के देशों की चीज़ें और नक़्शे देखना-जानना — कैसा लगता है?",
    mg:[14] },

  { id:"q028", type:"scale", band:[1,2,3], layer:1, img:"puja_thali",
    text:"पूजा या त्योहार की तैयारी में आगे रहना — कैसा लगता है?",
    mg:[21,17] },

  { id:"q029", type:"scale", band:[1,2,3], layer:1, img:"judge_friends",
    text:"दो दोस्तों का झगड़ा सुनकर सही-ग़लत का फ़ैसला करना — कैसा लगता है?",
    mg:[16] },

  { id:"q030", type:"scale", band:[1,2,3], layer:1, img:"write_story",
    text:"कहानी या कविता लिखना — कैसा लगता है?",
    mg:[12,18] },

  { id:"q031", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"fever_check",    label:"बुख़ार नापना",           mg:[6] },
      { img:"herb_leaf",      label:"जड़ी-बूटी पहचानना",      mg:[6,1] },
      { img:"med_shop",       label:"दवा-दुकान सँभालना",      mg:[9,6] },
      { img:"exercise_coach", label:"कसरत सिखाना",           mg:[6,22] }
    ] },

  { id:"q032", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough",  label:"ट्रैक्टर से जुताई",          mg:[1,3] },
      { img:"pipe_irrigation", label:"पाइप से सिंचाई",           mg:[1,2] },
      { img:"flower_sell",     label:"फूल उगाकर बेचना",          mg:[1,9] },
      { img:"bee_box",         label:"मधुमक्खी-बक्सा सँभालना",    mg:[1] }
    ] },

  { id:"q033", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"lock_key",    label:"ताला-चाबी ठीक करना",     mg:[3,17] },
      { img:"cycle_fix",   label:"साइकिल ठीक करना",       mg:[3,8] },
      { img:"shoe_stitch", label:"चप्पल-जूता सिलना",       mg:[5,17] },
      { img:"weld_spark",  label:"वेल्डिंग का काम",         mg:[3] }
    ] },

  { id:"q034", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"camera_click",  label:"फ़ोटो खींचना",                 mg:[12,18] },
      { img:"video_edit",    label:"वीडियो बनाना-जोड़ना",           mg:[18,12] },
      { img:"type_computer", label:"कंप्यूटर पर टाइप करना",         mg:[7] },
      { img:"game_rules",    label:"खेल (game) के नियम समझना",     mg:[7,10] }
    ] },

  { id:"q035", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"handpump_fix", label:"हैंडपंप-नल ठीक करना",       mg:[2,3] },
      { img:"solar_panel",  label:"सोलर-पैनल लगाना",          mg:[2,15] },
      { img:"tank_measure", label:"टंकी-कुएँ की नाप-जोख",       mg:[4,2] },
      { img:"light_string", label:"झालर-लड़ी जोड़ना",           mg:[2,17] }
    ] },

  { id:"q036", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"pickle_jar", label:"अचार-पापड़ बनाना",    mg:[1] },
      { img:"sweet_make", label:"मिठाई बनाना",        mg:[1,10] },
      { img:"agarbatti",  label:"अगरबत्ती बनाना",      mg:[21,13] },
      { img:"pack_weigh", label:"पैकेट भरना-तौलना",    mg:[13,8] }
    ] },

  { id:"q037", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"coin_stamp", label:"विदेशी सिक्के-टिकट जमा करना",  mg:[14,12] },
      { img:"world_food", label:"दूसरे देश का खाना बनाना",       mg:[14,10] },
      { img:"learn_lang", label:"नई भाषा सीखना",               mg:[14,11] },
      { img:"world_map",  label:"नक़्शे पर देश ढूँढना",           mg:[14,18] }
    ] },

  { id:"q038", type:"pick", band:[1,2,3], layer:1,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"elder_help", label:"बूढ़ों को सहारा देना",       mg:[17,6] },
      { img:"show_way",   label:"रास्ता बताना",             mg:[10,17] },
      { img:"food_serve", label:"भंडारे में हाथ बँटाना",       mg:[17,10] },
      { img:"queue_line", label:"छोटों की क़तार लगवाना",     mg:[24,17] }
    ] },

  { id:"q039", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा मज़ा किसमें — रोबोट-खिलौना बनाने में, या उसे रंगने-सजाने में?",
    opts:[
      { img:"robot_toy", label:"रोबोट-खिलौना बनाना",   mg:[19,3] },
      { img:"paint_toy", label:"उसे रंगना-सजाना",      mg:[12] }
    ] },

  { id:"q040", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा मज़ा किसमें — साबुन बनाने में, या साबुन बेचने में?",
    opts:[
      { img:"soap_make", label:"साबुन बनाना",  mg:[13] },
      { img:"shop_sell", label:"साबुन बेचना",  mg:[9] }
    ] },

  { id:"q041", type:"pair", band:[1,2,3], layer:1,
    text:"कौन-सा काम पहले — मंदिर-मेले की सेवा, या खेल-मैदान की तैयारी?",
    opts:[
      { img:"temple_seva", label:"मंदिर-मेले की सेवा",    mg:[21,17] },
      { img:"ground_prep", label:"खेल-मैदान की तैयारी",   mg:[22,10] }
    ] },

  { id:"q042", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा अच्छा क्या — नई मशीन का जुगाड़ सोचना, या पुरानी मशीन चालू रखना?",
    opts:[
      { img:"idea_machine", label:"नई मशीन का जुगाड़ सोचना",   mg:[15,19] },
      { img:"run_machine",  label:"पुरानी मशीन चालू रखना",     mg:[3] }
    ] },

  { id:"q043", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा मज़ा किसमें — हिसाब की कॉपी जाँचने में, या माल गिनकर गोदाम में रखने में?",
    opts:[
      { img:"hisab_copy",   label:"हिसाब की कॉपी जाँचना",      mg:[16,9] },
      { img:"godown_stack", label:"माल गिनकर गोदाम में रखना",  mg:[8,9] }
    ] },

  { id:"q044", type:"pair", band:[1,2,3], layer:1,
    text:"समझाना कैसे अच्छा — फ़ोटो-वीडियो बनाकर, या आमने-सामने पढ़ाकर?",
    opts:[
      { img:"video_edit", label:"फ़ोटो-वीडियो बनाकर",   mg:[18,11] },
      { img:"teach_kids", label:"आमने-सामने पढ़ाकर",    mg:[11] }
    ] },

  { id:"q045", type:"pair", band:[1,2,3], layer:1,
    text:"ज़्यादा अच्छा क्या — पेड़ लगाना-गिनना, या कचरा छाँटकर अलग करना?",
    opts:[
      { img:"tree_plant", label:"पेड़ लगाना-गिनना",        mg:[1,20] },
      { img:"waste_sort", label:"कचरा छाँटकर अलग करना",  mg:[2,20] }
    ] },

  { id:"q046", type:"story", band:[1,2,3], layer:1, img:"flood_road",
    text:"गाँव में बड़ी बारिश से रास्ते पर पानी भर गया। तुम क्या करोगे?",
    opts:[
      { label:"ऊँचा रास्ता खोजूँगा",              mg:[8],     pts:2 },
      { label:"सामान ऊपर चढ़ाऊँगा",              mg:[24],    pts:2 },
      { label:"पानी निकालने का जुगाड़ सोचूँगा",     mg:[2,15],  pts:2 },
      { label:"छोटों-बूढ़ों को पहले निकालूँगा",      mg:[17,6],  pts:2 }
    ] },

  { id:"q047", type:"story", band:[1,2,3], layer:1, img:"school_stall",
    text:"स्कूल के मेले में तुम्हारी टोली को दुकान लगानी है। तुम क्या सँभालोगे?",
    opts:[
      { label:"चीज़ बनाना",              mg:[3,12],  pts:2 },
      { label:"दाम तय करके बेचना",       mg:[9],     pts:2 },
      { label:"सजावट और नाम-बोर्ड",      mg:[12,17], pts:2 },
      { label:"पैसे का हिसाब",            mg:[23,16], pts:2 }
    ] },

  { id:"q048", type:"story", band:[1,2,3], layer:1, img:"phone_dead",
    text:"मोबाइल चलते-चलते बंद हो गया। पहले क्या करोगे?",
    opts:[
      { label:"ख़ुद जाँचूँगा",                          mg:[7,3],   pts:2 },
      { label:"दुकान वाले भैया से पूछूँगा",              mg:[17],    pts:2 },
      { label:"किताब-वीडियो में तरीक़ा खोजूँगा",          mg:[11,18], pts:2 },
      { label:"याद करूँगा — पिछली बार कैसे ठीक हुआ था",  mg:[16,18], pts:2 }
    ] },

  /* ═══════ खेप-3 (set:2, layer:2 — गहराई-परत) ═══════ */

  { id:"q049", type:"scale", band:[1,2,3], layer:2, set:2, img:"seed_sow",
    text:"मौसम देखकर बताना कि बुआई कब सही रहेगी — कैसा लगता है?", mg:[1] },
  { id:"q050", type:"scale", band:[1,2,3], layer:2, set:2, img:"pani_khoj",
    text:"ज़मीन के नीचे का पानी या पत्थर खोजना — कैसा लगता है?", mg:[2] },
  { id:"q051", type:"scale", band:[1,2,3], layer:2, set:2, img:"run_machine",
    text:"एक ही चीज़ हर बार एक जैसी बढ़िया बनाना — कैसा लगता है?", mg:[3] },
  { id:"q052", type:"scale", band:[1,2,3], layer:2, set:2, img:"brick_wall",
    text:"नक़्शा देखकर समझना कि दीवार कहाँ उठेगी — कैसा लगता है?", mg:[4] },
  { id:"q053", type:"scale", band:[1,2,3], layer:2, set:2, img:"sewing_machine",
    text:"कपड़े का नाप लेकर सिलाई की योजना बनाना — कैसा लगता है?", mg:[5] },
  { id:"q054", type:"scale", band:[1,2,3], layer:2, set:2, img:"sick_care",
    text:"मरीज़ की बात धैर्य से सुनकर हिम्मत बँधाना — कैसा लगता है?", mg:[6] },
  { id:"q055", type:"scale", band:[1,2,3], layer:2, set:2, img:"phone_dead",
    text:"मोबाइल या कंप्यूटर की छोटी गड़बड़ी ख़ुद खोजना — कैसा लगता है?", mg:[7] },
  { id:"q056", type:"scale", band:[1,2,3], layer:2, set:2, img:"bus_drive",
    text:"सामान कम ख़र्च में सही रास्ते से पहुँचाने की योजना बनाना — कैसा लगता है?", mg:[8] },
  { id:"q057", type:"scale", band:[1,2,3], layer:2, set:2, img:"mandi_taul",
    text:"मोल-भाव करके दोनों को ख़ुश रखना — कैसा लगता है?", mg:[9] },
  { id:"q058", type:"scale", band:[1,2,3], layer:2, set:2, img:"food_serve",
    text:"मेहमान की ज़रूरत बिन कहे समझ लेना — कैसा लगता है?", mg:[10] },
  { id:"q059", type:"scale", band:[1,2,3], layer:2, set:2, img:"teach_kids",
    text:"कठिन बात छोटे बच्चे की भाषा में समझाना — कैसा लगता है?", mg:[11] },
  { id:"q060", type:"scale", band:[1,2,3], layer:2, set:2, img:"clay_art",
    text:"पुरानी कला देखकर नया नमूना सोचना — कैसा लगता है?", mg:[12] },
  { id:"q061", type:"scale", band:[1,2,3], layer:2, set:2, img:"tube_bubble",
    text:"दो चीज़ें मिलाने पर क्या बनेगा — अंदाज़ा लगाना कैसा लगता है?", mg:[13] },
  { id:"q062", type:"scale", band:[1,2,3], layer:2, set:2, img:"learn_lang",
    text:"दूसरे देश के लोगों से दोस्ती करना और उनसे सीखना — कैसा लगता है?", mg:[14] },
  { id:"q063", type:"scale", band:[1,2,3], layer:2, set:2, img:"news_read",
    text:"नई मशीनों और नई खोजों की ख़बरें पढ़ना-देखना — कैसा लगता है?", mg:[15] },
  { id:"q064", type:"scale", band:[1,2,3], layer:2, set:2, img:"judge_friends",
    text:"नियम पढ़कर बताना कि सही क्या है — कैसा लगता है?", mg:[16] },
  { id:"q065", type:"scale", band:[1,2,3], layer:2, set:2, img:"chitthi_daftar",
    text:"गाँव की समस्या लिखकर अधिकारी तक पहुँचाना — कैसा लगता है?", mg:[17] },
  { id:"q066", type:"scale", band:[1,2,3], layer:2, set:2, img:"hisab_copy",
    text:"गिनतियों से छिपी बात खोजना — जैसे कौन-सा महीना ज़्यादा बिका — कैसा लगता है?", mg:[18] },
  { id:"q067", type:"scale", band:[1,2,3], layer:2, set:2, img:"robot_toy",
    text:"मशीन को ऐसा हुक्म देना कि वह ख़ुद काम करे — कैसा लगता है?", mg:[19] },
  { id:"q068", type:"scale", band:[1,2,3], layer:2, set:2, img:"tree_plant",
    text:"पेड़ और पानी बचाने के नए तरीक़े सोचना — कैसा लगता है?", mg:[20] },

  { id:"q069", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough", label:"खेत जोतना",        mg:[1] },
      { img:"cow_milk",       label:"पशु पालना",        mg:[1] },
      { img:"fish_pond",      label:"मछली पालना",       mg:[1] },
      { img:"tamatar_tokri",  label:"बाग़-सब्ज़ी उगाना",  mg:[1] }
    ] },
  { id:"q070", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"boy_bandage",    label:"मरहम-पट्टी करना",      mg:[6] },
      { img:"med_shop",       label:"दवा पहचानना",          mg:[6] },
      { img:"exercise_coach", label:"कसरत कराना",          mg:[6] },
      { img:"herb_leaf",      label:"जड़ी-बूटी की सलाह",     mg:[6] }
    ] },
  { id:"q071", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app",    label:"नया app सीखना",          mg:[7] },
      { img:"phone_dead",    label:"टूटा मोबाइल खोलना",       mg:[7] },
      { img:"game_rules",    label:"खेल (game) के नियम समझना", mg:[7] },
      { img:"type_computer", label:"तेज़ type करना",           mg:[7] }
    ] },
  { id:"q072", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"wood_toy",   label:"लकड़ी का काम",     mg:[3] },
      { img:"weld_spark", label:"लोहे-वेल्डिंग का काम", mg:[3] },
      { img:"clay_art",   label:"मिट्टी का काम",     mg:[12] },
      { img:"embroidery", label:"कपड़े पर कढ़ाई",    mg:[5] }
    ] },
  { id:"q073", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"decoration",   label:"दुकान सजाना",        mg:[9] },
      { img:"shop_sell",    label:"ग्राहक से बात करना",   mg:[9] },
      { img:"hisab_copy",   label:"हिसाब रखना",         mg:[9] },
      { img:"godown_stack", label:"माल लाना-रखना",      mg:[9] }
    ] },
  { id:"q074", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"handpump_fix",    label:"नल-पाइप का काम",   mg:[2] },
      { img:"board_wire",      label:"बिजली-board का काम", mg:[2] },
      { img:"solar_panel",     label:"सोलर का काम",       mg:[2] },
      { img:"pipe_irrigation", label:"मोटर-पंप का काम",    mg:[2] }
    ] },
  { id:"q075", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"food_serve", label:"खाना परोसना",       mg:[10] },
      { img:"decoration", label:"सजावट करना",        mg:[10] },
      { img:"mela_gate",  label:"मेले का इंतज़ाम",     mg:[10] },
      { img:"stage_song", label:"गाना-बजाना",         mg:[10] }
    ] },
  { id:"q076", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"shop_sell",    label:"बीज-खाद की दुकान",   mg:[9,1] },
      { img:"compost",      label:"खाद बनाना",          mg:[1,13] },
      { img:"mandi_taul",   label:"मंडी में तौल-बिक्री",   mg:[9,1] },
      { img:"godown_stack", label:"फ़सल का गोदाम",      mg:[8,1] }
    ] },
  { id:"q077", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"queue_line",  label:"पहरा और निगरानी",   mg:[24] },
      { img:"aag_bujhana", label:"आग बुझाना",         mg:[24] },
      { img:"flood_road",  label:"बाढ़ में बचाव",       mg:[24] },
      { img:"lock_key",    label:"ताला-सुरक्षा जाँच",    mg:[24] }
    ] },
  { id:"q078", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"paint_toy",    label:"चित्र बनाना",   mg:[12] },
      { img:"stage_song",   label:"गीत गाना",     mg:[12] },
      { img:"stage_play",   label:"नाटक करना",    mg:[12] },
      { img:"camera_click", label:"फ़ोटो खींचना",   mg:[12] }
    ] },
  { id:"q079", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"bus_drive",    label:"गाड़ी चलाना",          mg:[8] },
      { img:"world_map",    label:"रास्ता-नक़्शा समझना",    mg:[8] },
      { img:"count_money",  label:"टिकट-पैसे का हिसाब",    mg:[8] },
      { img:"godown_stack", label:"सामान लादना-उतारना",   mg:[8] }
    ] },
  { id:"q080", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"piggy_bank", label:"गुल्लक-बचत करना",         mg:[23] },
      { img:"mobile_app", label:"mobile से भुगतान सीखना",   mg:[23] },
      { img:"hisab_copy", label:"हिसाब-किताब रखना",        mg:[23] },
      { img:"note_100",   label:"दाम की तुलना करना",       mg:[23] }
    ] },
  { id:"q081", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"teach_kids",     label:"किताब से पढ़ाना",       mg:[11] },
      { img:"exercise_coach", label:"खेल सिखाना",           mg:[11] },
      { img:"jugaad_new",     label:"हाथ से करके दिखाना",    mg:[11] },
      { img:"video_edit",     label:"video-पाठ बनाना",       mg:[11] }
    ] },
  { id:"q082", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cow_milk",  label:"गाय-भैंस पालना",   mg:[1] },
      { img:"hen_farm",  label:"मुर्गी पालना",      mg:[1] },
      { img:"bee_box",   label:"मधुमक्खी पालना",   mg:[1] },
      { img:"fish_pond", label:"मछली पालना",      mg:[1] }
    ] },
  { id:"q083", type:"pick", band:[1,2,3], layer:2, set:2,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"puja_thali",   label:"पूजा की तैयारी",     mg:[21] },
      { img:"food_serve",   label:"भंडारे की सेवा",      mg:[21] },
      { img:"light_string", label:"झालर-सजावट",        mg:[21] },
      { img:"stage_song",   label:"भजन-गान",           mg:[21] }
    ] },

  { id:"q084", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा मज़ा किसमें — बड़ी मशीन के काम में, या बारीक औज़ार के काम में?",
    opts:[
      { img:"tractor_plough", label:"बड़ी मशीन का काम",   mg:[3,8] },
      { img:"bolt_fit",       label:"बारीक औज़ार का काम", mg:[3,12] }
    ] },
  { id:"q085", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — अकेले चुपचाप काम, या टोली के साथ काम?",
    opts:[
      { img:"puzzle_solo", label:"अकेले चुपचाप काम",   mg:[18] },
      { img:"team_win",    label:"टोली के साथ काम",    mg:[10] }
    ] },
  { id:"q086", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — घर के पास काम, या दूर देश जाकर काम?",
    opts:[
      { img:"shop_sell",   label:"घर के पास काम",     mg:[9] },
      { img:"travel_road", label:"दूर देश जाकर काम",   mg:[14] }
    ] },
  { id:"q087", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — मिट्टी-पसीने वाला काम, या साफ़ दफ़्तर वाला काम?",
    opts:[
      { img:"brick_wall",    label:"मिट्टी-पसीने वाला काम",  mg:[1,4] },
      { img:"type_computer", label:"साफ़ दफ़्तर वाला काम",   mg:[7,16] }
    ] },
  { id:"q088", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — नई चीज़ आज़माने का जोखिम, या जाना-पहचाना पक्का काम?",
    opts:[
      { img:"idea_machine", label:"नई चीज़ आज़माने का जोखिम",  mg:[15] },
      { img:"run_machine",  label:"जाना-पहचाना पक्का काम",    mg:[3] }
    ] },
  { id:"q089", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"समझाना कैसे अच्छा — बोलकर, या करके दिखाकर?",
    opts:[
      { img:"teach_kids", label:"बोलकर समझाना",   mg:[11,18] },
      { img:"jugaad_new", label:"करके दिखाना",    mg:[3,12] }
    ] },
  { id:"q090", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — सुबह खेत-बाग़ का काम, या शाम मशीन-भट्ठी का काम?",
    opts:[
      { img:"seed_sow",   label:"सुबह खेत-बाग़ का काम",   mg:[1] },
      { img:"weld_spark", label:"शाम मशीन-भट्ठी का काम",  mg:[3] }
    ] },
  { id:"q091", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा मज़ा किसमें — गिनती-हिसाब के काम में, या रंग-सजावट के काम में?",
    opts:[
      { img:"hisab_copy", label:"गिनती-हिसाब का काम",  mg:[18,23] },
      { img:"paint_toy",  label:"रंग-सजावट का काम",    mg:[12] }
    ] },
  { id:"q092", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — सामने आकर मदद करना, या पीछे रहकर इंतज़ाम सँभालना?",
    opts:[
      { img:"elder_help",   label:"सामने आकर मदद",       mg:[17,10] },
      { img:"godown_stack", label:"पीछे रहकर इंतज़ाम",    mg:[8,24] }
    ] },
  { id:"q093", type:"pair", band:[1,2,3], layer:2, set:2,
    text:"ज़्यादा अच्छा क्या — पुरानी चीज़ें सहेजना, या नई चीज़ बनाना?",
    opts:[
      { img:"coin_stamp",   label:"पुरानी चीज़ें सहेजना",  mg:[12,14] },
      { img:"idea_machine", label:"नई चीज़ बनाना",       mg:[15] }
    ] },

  { id:"q094", type:"story", band:[1,2,3], layer:2, set:2, img:"mela_gate",
    text:"मेले में अचानक भीड़ बढ़ गई। तुम क्या करोगे?",
    opts:[
      { label:"आने-जाने का रास्ता बनवाऊँगा",   mg:[24],    pts:2 },
      { label:"प्यासों को पानी पिलाऊँगा",        mg:[10],    pts:2 },
      { label:"खोया बच्चा घरवालों से मिलाऊँगा",  mg:[10,24], pts:2 },
      { label:"भीड़ गिनकर अंदाज़ा लगाऊँगा",     mg:[18],    pts:2 }
    ] },
  { id:"q095", type:"story", band:[1,2,3], layer:2, set:2, img:"herb_leaf",
    text:"फ़सल में कीड़े लग गए। तुम पहले क्या करोगे?",
    opts:[
      { label:"दवा-दुकान से पूछूँगा",             mg:[1,13],  pts:2 },
      { label:"किताब-video में इलाज खोजूँगा",     mg:[11,18], pts:2 },
      { label:"बड़े किसान से सीखूँगा",            mg:[17,1],  pts:2 },
      { label:"पत्ते तोड़कर ख़ुद जाँचूँगा",          mg:[18,1],  pts:2 }
    ] },
  { id:"q096", type:"story", band:[1,2,3], layer:2, set:2, img:"board_wire",
    text:"दुकान पर अचानक बिजली चली गई। तुम क्या सँभालोगे?",
    opts:[
      { label:"torch-मोमबत्ती का इंतज़ाम",       mg:[24],   pts:2 },
      { label:"बिजली-board जाँचूँगा",            mg:[2],    pts:2 },
      { label:"ग्राहकों को सँभालूँगा",              mg:[10,9], pts:2 },
      { label:"बर्फ़ वाला सामान बचाऊँगा",         mg:[8,9],  pts:2 }
    ] },
  { id:"q097", type:"story", band:[1,2,3], layer:2, set:2, img:"stage_play",
    text:"स्कूल में नाटक होना है। तुम क्या सँभालोगे?",
    opts:[
      { label:"कहानी लिखूँगा",          mg:[12,18], pts:2 },
      { label:"मंच सजाऊँगा",           mg:[12,4],  pts:2 },
      { label:"भूमिका निभाऊँगा",        mg:[12,10], pts:2 },
      { label:"सबका अभ्यास कराऊँगा",   mg:[11,10], pts:2 }
    ] },
  { id:"q098", type:"story", band:[1,2,3], layer:2, set:2, img:"waste_sort",
    text:"गाँव में सफ़ाई-दिवस है। तुम क्या सँभालोगे?",
    opts:[
      { label:"टोली बाँटकर काम बँटवाऊँगा",        mg:[10,17], pts:2 },
      { label:"कचरा अलग-अलग छँटवाऊँगा",         mg:[20,2],  pts:2 },
      { label:"पेड़ लगवाऊँगा",                    mg:[1,20],  pts:2 },
      { label:"फ़ोटो-video से सबको दिखाऊँगा",     mg:[18,12], pts:2 }
    ] },

  /* ═══════ खेप-4 हिस्सा-अ (set:3, layer:2 — गहराई-प्रश्न 50) ═══════ */

  { id:"q099", type:"scale", band:[1,2,3], layer:2, set:3, img:"count_money",
    text:"अपनी पहली कमाई का हिसाब लिखना — कैसा लगता है?", mg:[23,18] },
  { id:"q100", type:"scale", band:[1,2,3], layer:2, set:3, img:"jugaad_new",
    text:"टूटी चीज़ फेंकने से पहले सुधारने की कोशिश करना — कैसा लगता है?", mg:[3] },
  { id:"q101", type:"scale", band:[1,2,3], layer:2, set:3, img:"travel_road",
    text:"नए शहर में रास्ता ख़ुद खोजना — कैसा लगता है?", mg:[8,14] },
  { id:"q102", type:"scale", band:[1,2,3], layer:2, set:3, img:"decoration",
    text:"त्योहार पर घर-सजावट की ज़िम्मेदारी लेना — कैसा लगता है?", mg:[10,12] },
  { id:"q103", type:"scale", band:[1,2,3], layer:2, set:3, img:"teach_kids",
    text:"छोटे भाई-बहन को होमवर्क कराना — कैसा लगता है?", mg:[11] },
  { id:"q104", type:"scale", band:[1,2,3], layer:2, set:3, img:"herb_leaf",
    text:"बीमार पौधे को देखकर उसका कारण सोचना — कैसा लगता है?", mg:[1,18] },
  { id:"q105", type:"scale", band:[1,2,3], layer:2, set:3, img:"embroidery",
    text:"पुराने कपड़े से कोई नई चीज़ बनाना — कैसा लगता है?", mg:[5,12] },
  { id:"q106", type:"scale", band:[1,2,3], layer:2, set:3, img:"hisab_copy",
    text:"दुकान का उधार-हिसाब याद रखना — कैसा लगता है?", mg:[9,23] },
  { id:"q107", type:"scale", band:[1,2,3], layer:2, set:3, img:"judge_friends",
    text:"मोहल्ले के झगड़े में बीच-बचाव कराना — कैसा लगता है?", mg:[16,10] },
  { id:"q108", type:"scale", band:[1,2,3], layer:2, set:3, img:"elder_help",
    text:"घर के बड़ों को दवा का समय याद दिलाना — कैसा लगता है?", mg:[6,10] },
  { id:"q109", type:"scale", band:[1,2,3], layer:2, set:3, img:"team_win",
    text:"खेल में टीम बनाना और चलाना — कैसा लगता है?", mg:[22,10] },
  { id:"q110", type:"scale", band:[1,2,3], layer:2, set:3, img:"temple_seva",
    text:"धार्मिक आयोजन में कोई ज़िम्मेदारी लेना — कैसा लगता है?", mg:[21,10] },
  { id:"q111", type:"scale", band:[1,2,3], layer:2, set:3, img:"camera_click",
    text:"photo-video सँभालकर सजाकर रखना — कैसा लगता है?", mg:[18,12] },
  { id:"q112", type:"scale", band:[1,2,3], layer:2, set:3, img:"note_100",
    text:"बिजली-पानी का बिल पढ़कर समझना — कैसा लगता है?", mg:[23,2] },
  { id:"q113", type:"scale", band:[1,2,3], layer:2, set:3, img:"flood_road",
    text:"मौसम बिगड़ने पर घर-सामान की हिफ़ाज़त करना — कैसा लगता है?", mg:[24] },

  { id:"q114", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"brick_wall",   label:"छत की मरम्मत",     mg:[4] },
      { img:"handpump_fix", label:"नल का काम",        mg:[4,2] },
      { img:"board_wire",   label:"बिजली का काम",      mg:[4,2] },
      { img:"paint_toy",    label:"रंगाई-पुताई",        mg:[4,12] }
    ] },
  { id:"q115", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot",     label:"चाय-नाश्ते की दुकान",  mg:[10] },
      { img:"sweet_make",   label:"मिठाई का काम",        mg:[10,1] },
      { img:"food_serve",   label:"होटल में परोसा",       mg:[10] },
      { img:"school_stall", label:"ठेला-चाट का काम",     mg:[10,9] }
    ] },
  { id:"q116", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"sewing_machine", label:"सिलाई",          mg:[5] },
      { img:"embroidery",     label:"कढ़ाई",           mg:[5,12] },
      { img:"soap_make",      label:"रंगाई-छपाई",      mg:[5,13] },
      { img:"shop_sell",      label:"कपड़ा बेचना",     mg:[5,9] }
    ] },
  { id:"q117", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app",    label:"recharge-भुगतान का काम",  mg:[7,23] },
      { img:"phone_dead",    label:"mobile मरम्मत",           mg:[7,3] },
      { img:"shop_sell",     label:"mobile-सामान बेचना",      mg:[9,7] },
      { img:"type_computer", label:"online form भरना",        mg:[7,17] }
    ] },
  { id:"q118", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"bus_drive",     label:"गाड़ी चलाना",       mg:[8] },
      { img:"cycle_fix",     label:"गाड़ी की मरम्मत",    mg:[8,3] },
      { img:"vehicle_sound", label:"गाड़ी की धुलाई-सेवा", mg:[8,10] },
      { img:"bolt_fit",      label:"पुर्ज़े बेचना",       mg:[8,9] }
    ] },
  { id:"q119", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"teach_kids",     label:"tuition पढ़ाना",       mg:[11] },
      { img:"shop_sell",      label:"copy-किताब दुकान",    mg:[9,11] },
      { img:"chitthi_daftar", label:"form भरने की सहायता",  mg:[17,11] },
      { img:"exercise_coach", label:"खेल सिखाना",          mg:[22,11] }
    ] },
  { id:"q120", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough", label:"यंत्र चलाना",          mg:[1,3] },
      { img:"note_100",       label:"यंत्र किराये पर देना",   mg:[1,9] },
      { img:"run_machine",    label:"यंत्र की मरम्मत",       mg:[1,3] },
      { img:"idea_machine",   label:"नया यंत्र सीखना",      mg:[1,15] }
    ] },
  { id:"q121", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"shop_sell",       label:"पानी-जार बेचना",   mg:[2,9] },
      { img:"pani_khoj",       label:"बोरिंग का काम",    mg:[2] },
      { img:"pipe_irrigation", label:"सिंचाई का ठेका",    mg:[2,1] },
      { img:"tank_measure",    label:"टंकी-सफ़ाई सेवा",   mg:[2,10] }
    ] },
  { id:"q122", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mela_gate",    label:"शादी-मंडप का काम",  mg:[10,4] },
      { img:"flower_sell",  label:"फूल का काम",        mg:[10,1] },
      { img:"light_string", label:"लाइट-झालर का काम",  mg:[10,2] },
      { img:"camera_click", label:"फ़ोटो-video का काम",  mg:[10,12] }
    ] },
  { id:"q123", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"boy_bandage", label:"पशु-इलाज में सहायता",  mg:[1,6] },
      { img:"shop_sell",   label:"चारा बेचना",           mg:[1,9] },
      { img:"cow_milk",    label:"दूध का काम",           mg:[1,9] },
      { img:"animal_love", label:"पशु-देखभाल",           mg:[1,10] }
    ] },
  { id:"q124", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"queue_line",   label:"चौकीदारी-निगरानी",   mg:[24] },
      { img:"camera_click", label:"CCTV का काम",        mg:[24,7] },
      { img:"aag_bujhana",  label:"आग-सुरक्षा",          mg:[24] },
      { img:"mela_gate",    label:"भीड़ का इंतज़ाम",      mg:[24,10] }
    ] },
  { id:"q125", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"embroidery", label:"मेहँदी का काम",     mg:[12,5] },
      { img:"decoration", label:"रंगोली-सजावट",     mg:[12] },
      { img:"stage_song", label:"गीत-बाजा",          mg:[12,10] },
      { img:"clay_art",   label:"मूर्ति बनाना",       mg:[12] }
    ] },
  { id:"q126", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"learn_lang",     label:"वहाँ की भाषा सीखना",     mg:[14,11] },
      { img:"chitthi_daftar", label:"passport-कागज़ बनवाना",  mg:[14,17] },
      { img:"weld_spark",     label:"हुनर-प्रमाण बनवाना",     mg:[14,3] },
      { img:"world_food",     label:"वहाँ का काम-ढंग सीखना",  mg:[14,10] }
    ] },
  { id:"q127", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"video_edit",    label:"video बनाकर कमाना",   mg:[18,12] },
      { img:"shop_sell",     label:"online सामान बेचना",   mg:[18,9] },
      { img:"type_computer", label:"typing का काम",       mg:[18,7] },
      { img:"teach_kids",    label:"online सिखाना",       mg:[18,11] }
    ] },
  { id:"q128", type:"pick", band:[1,2,3], layer:2, set:3,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"hisab_copy",     label:"दुकान का खाता लिखना",     mg:[23,9] },
      { img:"piggy_bank",     label:"बचत-समूह चलाना",         mg:[23,10] },
      { img:"chitthi_daftar", label:"बीमा-कागज़ में सहायता",     mg:[23,16] },
      { img:"mobile_app",     label:"mobile-bank में सहायता",   mg:[23,7] }
    ] },

  { id:"q129", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — पक्की छोटी कमाई, या बढ़ने वाली पर अनिश्चित कमाई?",
    opts:[
      { img:"run_machine",  label:"पक्की छोटी कमाई",           mg:[3,23] },
      { img:"idea_machine", label:"बढ़ने वाली अनिश्चित कमाई",   mg:[15,9] }
    ] },
  { id:"q130", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा मज़ा किसमें — हाथ के काम में, या दिमाग़ के काम में?",
    opts:[
      { img:"jugaad_new",  label:"हाथ का काम",    mg:[3,12] },
      { img:"puzzle_solo", label:"दिमाग़ का काम",  mg:[18,16] }
    ] },
  { id:"q131", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — सामान बनाना, या सेवा देना?",
    opts:[
      { img:"wood_toy",   label:"सामान बनाना",  mg:[3] },
      { img:"food_serve", label:"सेवा देना",     mg:[10] }
    ] },
  { id:"q132", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — गाँव में अपना काम, या शहर में नौकरी?",
    opts:[
      { img:"shop_sell",     label:"गाँव में अपना काम",  mg:[9,1] },
      { img:"type_computer", label:"शहर में नौकरी",     mg:[7,3] }
    ] },
  { id:"q133", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — सुबह-जल्दी वाला काम, या रात-देर वाला काम?",
    opts:[
      { img:"seed_sow",   label:"सुबह-जल्दी वाला काम",  mg:[1] },
      { img:"weld_spark", label:"रात-देर वाला काम",     mg:[3,10] }
    ] },
  { id:"q134", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — एक हुनर गहरा, या कई हुनर थोड़े-थोड़े?",
    opts:[
      { img:"weld_spark", label:"एक हुनर गहरा",         mg:[3] },
      { img:"jugaad_new", label:"कई हुनर थोड़े-थोड़े",    mg:[9,10] }
    ] },
  { id:"q135", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — मशीन के साथ काम, या लोगों के साथ काम?",
    opts:[
      { img:"run_machine", label:"मशीन के साथ काम",  mg:[3,19] },
      { img:"team_win",    label:"लोगों के साथ काम",  mg:[10,11] }
    ] },
  { id:"q136", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — लिखने-पढ़ने वाला काम, या बोलने-घूमने वाला काम?",
    opts:[
      { img:"write_story", label:"लिखने-पढ़ने वाला काम",   mg:[18,11] },
      { img:"show_way",    label:"बोलने-घूमने वाला काम",   mg:[10,9] }
    ] },
  { id:"q137", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — साफ़ नाप-जोख वाला काम, या अंदाज़े-कला वाला काम?",
    opts:[
      { img:"tank_measure", label:"साफ़ नाप-जोख वाला काम",  mg:[4,18] },
      { img:"paint_toy",    label:"अंदाज़े-कला वाला काम",    mg:[12] }
    ] },
  { id:"q138", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — सीखा हुआ रोज़ दोहराना, या रोज़ कुछ नया सीखना?",
    opts:[
      { img:"run_machine", label:"सीखा हुआ रोज़ दोहराना",  mg:[3] },
      { img:"learn_lang",  label:"रोज़ कुछ नया सीखना",    mg:[15,14] }
    ] },
  { id:"q139", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — घर से काम, या बाहर घूमकर काम?",
    opts:[
      { img:"sewing_machine", label:"घर से काम",         mg:[5,18] },
      { img:"travel_road",    label:"बाहर घूमकर काम",    mg:[8,9] }
    ] },
  { id:"q140", type:"pair", band:[1,2,3], layer:2, set:3,
    text:"ज़्यादा अच्छा क्या — चीज़ें सँभालना, या लोग सँभालना?",
    opts:[
      { img:"godown_stack", label:"चीज़ें सँभालना",  mg:[8,3] },
      { img:"elder_help",   label:"लोग सँभालना",    mg:[10,11] }
    ] },

  { id:"q141", type:"story", band:[1,2,3], layer:2, set:3, img:"leaky_roof",
    text:"पड़ोसी की छत टपक रही है और उसने मदद माँगी। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद जुगाड़ से रोकूँगा",              mg:[3,4],   pts:2 },
      { label:"अच्छा मिस्त्री बुलवाऊँगा",            mg:[10,4],  pts:2 },
      { label:"सामान की सूची-ख़र्च बनाऊँगा",        mg:[18,9],  pts:2 },
      { label:"बारिश-पानी जमा करने का उपाय सोचूँगा", mg:[20,2],  pts:2 }
    ] },
  { id:"q142", type:"story", band:[1,2,3], layer:2, set:3, img:"tamatar_tokri",
    text:"हाट में तुम्हारी सब्ज़ी नहीं बिक रही। तुम क्या करोगे?",
    opts:[
      { label:"दाम थोड़ा घटाऊँगा",            mg:[9],    pts:2 },
      { label:"सजाकर अच्छे से रखूँगा",         mg:[12,9], pts:2 },
      { label:"घूम-घूमकर बेचूँगा",             mg:[8,9],  pts:2 },
      { label:"बची सब्ज़ी का अचार बनाऊँगा",    mg:[1,13], pts:2 }
    ] },
  { id:"q143", type:"story", band:[1,2,3], layer:2, set:3, img:"shop_sell",
    text:"दोस्त की दुकान में एक दिन हाथ बँटाना है। तुम क्या सँभालोगे?",
    opts:[
      { label:"ग्राहकों से बात",           mg:[10,9],  pts:2 },
      { label:"माल जमाना-सजाना",         mg:[8,9],   pts:2 },
      { label:"हिसाब-किताब",             mg:[23,18], pts:2 },
      { label:"नई चीज़ रखने की सलाह",     mg:[15,9],  pts:2 }
    ] },
  { id:"q144", type:"story", band:[1,2,3], layer:2, set:3, img:"mela_gate",
    text:"गाँव में मेला लगवाना है। तुम क्या सँभालोगे?",
    opts:[
      { label:"दुकानदार जुटाऊँगा",         mg:[9,10],  pts:2 },
      { label:"जगह का नक़्शा बनाऊँगा",     mg:[4,18],  pts:2 },
      { label:"अनुमति के कागज़ करवाऊँगा",  mg:[17,16], pts:2 },
      { label:"प्रचार सँभालूँगा",            mg:[12,18], pts:2 }
    ] },
  { id:"q145", type:"story", band:[1,2,3], layer:2, set:3, img:"wood_toy",
    text:"स्कूल की बेंच टूट गई है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद मरम्मत की कोशिश",         mg:[3],     pts:2 },
      { label:"बढ़ई से करवाकर सीखूँगा",       mg:[11,3],  pts:2 },
      { label:"चंदे का हिसाब सँभालूँगा",        mg:[23,17], pts:2 },
      { label:"नई मज़बूत design सोचूँगा",      mg:[12,15], pts:2 }
    ] },
  { id:"q146", type:"story", band:[1,2,3], layer:2, set:3, img:"animal_love",
    text:"घर की बकरी बीमार लग रही है। तुम पहले क्या करोगे?",
    opts:[
      { label:"पशु-डॉक्टर के पास ले जाऊँगा",     mg:[6,1],   pts:2 },
      { label:"घरेलू इलाज पूछूँगा",              mg:[1,17],  pts:2 },
      { label:"लक्षण लिखकर रखूँगा",             mg:[18,6],  pts:2 },
      { label:"बाक़ी जानवरों से अलग रखूँगा",     mg:[24,1],  pts:2 }
    ] },
  { id:"q147", type:"story", band:[1,2,3], layer:2, set:3, img:"mobile_app",
    text:"नया app फ़ोन में चल नहीं रहा। तुम पहले क्या करोगे?",
    opts:[
      { label:"settings ख़ुद जाँचूँगा",        mg:[7],    pts:2 },
      { label:"video में तरीक़ा देखूँगा",      mg:[11,18], pts:2 },
      { label:"किसी जानकार दोस्त से पूछूँगा", mg:[10],   pts:2 },
      { label:"mobile-दुकान पर दिखाऊँगा",   mg:[9,7],  pts:2 }
    ] },
  { id:"q148", type:"story", band:[1,2,3], layer:2, set:3, img:"note_100",
    text:"इस महीने बिजली-बिल बहुत ज़्यादा आया। तुम क्या करोगे?",
    opts:[
      { label:"meter की जाँच करवाऊँगा",       mg:[2,18],  pts:2 },
      { label:"दफ़्तर में शिकायत दूँगा",         mg:[17,16], pts:2 },
      { label:"बिजली-बचत के उपाय करूँगा",     mg:[20,2],  pts:2 },
      { label:"पुराने बिलों से हिसाब मिलाऊँगा",  mg:[23,18], pts:2 }
    ] },

  /* ═══════ खेप-4 हिस्सा-ब (set:3, layer:3 — स्केल-परत 50) ═══════
     इनमें समूह-ठप्पा नहीं — "amb" = हौसला-अंक (1 छोटा-पक्का … 5 बड़ा सपना)।
     दोनों जवाब सही — नतीजे में सिर्फ़ "सुझाया स्केल" (L1-L15 दिशा) बनेगा।
     पट्टी-प्रश्न पर amb:true = चेहरा-1 से 5 सीधे हौसला-अंक। */

  { id:"q149", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"graph_up",
    text:"अपना काम पूरे जिले में फैलाना — सोचकर कैसा लगता है?" },
  { id:"q150", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"team_win",
    text:"दस लोगों की टोली को काम बताना — सोचकर कैसा लगता है?" },
  { id:"q151", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"note_100",
    text:"बैंक से क़र्ज़ लेकर काम बड़ा करना — सोचकर कैसा लगता है?" },
  { id:"q152", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"travel_road",
    text:"अनजान शहर में जाकर नया काम शुरू करना — सोचकर कैसा लगता है?" },
  { id:"q153", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"school_stall",
    text:"अपने नाम के board वाली दुकान — सोचकर कैसा लगता है?" },
  { id:"q154", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"badi_imarat",
    text:"मशीनें ख़रीदकर अपना कारख़ाना — सोचकर कैसा लगता है?" },
  { id:"q155", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"world_map",
    text:"अपना माल दूसरे देश तक भेजना — सोचकर कैसा लगता है?" },
  { id:"q156", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"teach_kids",
    text:"नए लोगों को काम पर रखना और सिखाना — सोचकर कैसा लगता है?" },
  { id:"q157", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"godown_stack",
    text:"बड़ा order लेने का साहस करना — सोचकर कैसा लगता है?" },
  { id:"q158", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"piggy_bank",
    text:"कमाई बचाकर उसे काम में दोबारा लगाना — सोचकर कैसा लगता है?" },
  { id:"q159", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"jugaad_new",
    text:"एक बार हारकर दोबारा शुरू करना — सोचकर कैसा लगता है?" },
  { id:"q160", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"hisab_copy",
    text:"अगले पाँच साल की योजना बनाना — सोचकर कैसा लगता है?" },
  { id:"q161", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"mela_gate",
    text:"गाँव में औरों के लिए रोज़गार बनाना — सोचकर कैसा लगता है?" },
  { id:"q162", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"chitthi_daftar",
    text:"अधिकारियों से बेझिझक अपनी बात कहना — सोचकर कैसा लगता है?" },
  { id:"q163", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"stage_play",
    text:"मंच पर सबके सामने बोलना — सोचकर कैसा लगता है?" },
  { id:"q164", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"tree_plant",
    text:"रोज़ थोड़ा-थोड़ा करके बड़ा लक्ष्य पूरा करना — सोचकर कैसा लगता है?" },
  { id:"q165", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"learn_lang",
    text:"काम के लिए नई भाषा सीखना — सोचकर कैसा लगता है?" },
  { id:"q166", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"news_boy",
    text:"अपने काम का प्रचार ख़ुद करना — सोचकर कैसा लगता है?" },
  { id:"q167", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"team_win",
    text:"मुश्किल घड़ी में टोली का हौसला बाँधना — सोचकर कैसा लगता है?" },
  { id:"q168", type:"scale", band:[2,3], layer:3, set:3, amb:true, img:"count_money",
    text:"खाते में हर पैसा साफ़-साफ़ रखना — सोचकर कैसा लगता है?" },

  { id:"q169", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"shop_sell",   label:"छोटी दुकान, पक्की कमाई",     amb:2 },
      { img:"badi_imarat", label:"बड़ी दुकान, ज़्यादा जोखिम",    amb:4 }
    ] },
  { id:"q170", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"puzzle_solo", label:"अकेले सब सँभालूँ",       amb:2 },
      { img:"team_win",    label:"टोली बनाकर काम बाँटूँ",   amb:4 }
    ] },
  { id:"q171", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"shop_sell", label:"गाँव में नाम हो",   amb:2 },
      { img:"world_map", label:"दूर तक नाम हो",    amb:4 }
    ] },
  { id:"q172", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"piggy_bank", label:"जितना है, उतने में ख़ुश",   amb:2 },
      { img:"graph_up",   label:"हर साल थोड़ा बढ़ाऊँ",      amb:4 }
    ] },
  { id:"q173", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"write_story", label:"पहले पूरा सीखूँ, फिर शुरू",  amb:2 },
      { img:"jugaad_new",  label:"शुरू करके सीखता चलूँ",     amb:4 }
    ] },
  { id:"q174", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"piggy_bank", label:"उधार से हमेशा दूर",           amb:2 },
      { img:"note_100",   label:"सोच-समझकर क़र्ज़ लेना सही",   amb:4 }
    ] },
  { id:"q175", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"school_stall", label:"एक जगह टिककर काम",       amb:2 },
      { img:"travel_road",  label:"जहाँ मौक़ा, वहाँ काम",      amb:4 }
    ] },
  { id:"q176", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"count_money", label:"पक्की पगार वाली नौकरी",         amb:2 },
      { img:"graph_up",    label:"अपना काम — ऊपर-नीचे कमाई",    amb:4 }
    ] },
  { id:"q177", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"pack_weigh",   label:"छोटा order, जल्दी पूरा",   amb:2 },
      { img:"godown_stack", label:"बड़ा order, लंबा काम",    amb:4 }
    ] },
  { id:"q178", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"shop_sell", label:"जाने-माने ग्राहक",     amb:2 },
      { img:"news_boy",  label:"नए ग्राहक खोजना",    amb:4 }
    ] },
  { id:"q179", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"jugaad_new", label:"ख़ुद करने में मज़ा",     amb:2 },
      { img:"team_win",   label:"करवाने में मज़ा",       amb:4 }
    ] },
  { id:"q180", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"run_machine",  label:"एक धंधा जमाकर",       amb:2 },
      { img:"school_stall", label:"दो-तीन धंधे साथ-साथ",   amb:4 }
    ] },
  { id:"q181", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"mandi_taul", label:"गाँव का बाज़ार",         amb:2 },
      { img:"world_map",  label:"online पूरी दुनिया",     amb:4 }
    ] },
  { id:"q182", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"wood_toy",  label:"पुराना पक्का ढंग",        amb:2 },
      { img:"robot_toy", label:"नई मशीन, नया ढंग",      amb:4 }
    ] },
  { id:"q183", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"seed_sow",    label:"थोड़े में शुरुआत",           amb:2 },
      { img:"badi_imarat", label:"पूरी तैयारी, बड़ा आग़ाज़",    amb:4 }
    ] },
  { id:"q184", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"make_alone",  label:"नाम पीछे, काम आगे",   amb:2 },
      { img:"stage_play",  label:"काम के साथ नाम भी",   amb:4 }
    ] },
  { id:"q185", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"hisab_copy", label:"महीने भर की योजना",     amb:2 },
      { img:"world_map",  label:"पाँच साल की योजना",     amb:4 }
    ] },
  { id:"q186", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"run_machine", label:"जो आता है, वही पक्का",   amb:2 },
      { img:"learn_lang",  label:"हर साल एक नया हुनर",   amb:4 }
    ] },
  { id:"q187", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"shop_sell",   label:"छोटा भरा-पूरा काम",      amb:2 },
      { img:"badi_imarat", label:"बड़ी कंपनी का सपना",     amb:4 }
    ] },
  { id:"q188", type:"pair", band:[2,3], layer:3, set:3,
    text:"दोनों सही हैं — तुम्हें कौन-सा ज़्यादा भाता है?",
    opts:[
      { img:"piggy_bank", label:"कमाई अपने घर के लिए",       amb:2 },
      { img:"team_win",   label:"औरों को भी रोज़गार मिले",    amb:4 }
    ] },

  { id:"q189", type:"story", band:[2,3], layer:3, set:3, img:"note_100",
    text:"पहली बार 500 रुपये कमाए। तुम क्या करोगे?",
    opts:[
      { label:"घर में दे दूँगा",                    amb:1 },
      { label:"बचाकर रखूँगा",                     amb:2 },
      { label:"औज़ार या सीखने पर लगाऊँगा",        amb:3 },
      { label:"माल लाकर छोटा धंधा शुरू करूँगा",    amb:5 }
    ] },
  { id:"q190", type:"story", band:[2,3], layer:3, set:3, img:"mela_gate",
    text:"मेले में तुम्हारी दुकान अच्छी चली। अब आगे?",
    opts:[
      { label:"बस, इतने में ख़ुश हूँ",        amb:1 },
      { label:"अगले मेले में फिर लगाऊँगा",   amb:2 },
      { label:"हर हाट में लगाऊँगा",          amb:3 },
      { label:"पक्की दुकान खोलूँगा",         amb:5 }
    ] },
  { id:"q191", type:"story", band:[2,3], layer:3, set:3, img:"teach_kids",
    text:"पड़ोस के 3 बच्चे तुमसे पढ़ने आने लगे। अब आगे?",
    opts:[
      { label:"मुफ़्त पढ़ाता रहूँगा",              amb:1 },
      { label:"समय बाँधकर tuition बनाऊँगा",     amb:2 },
      { label:"और बच्चे जोड़ूँगा",               amb:3 },
      { label:"कोचिंग-घर खोलूँगा",              amb:5 }
    ] },
  { id:"q192", type:"story", band:[2,3], layer:3, set:3, img:"sewing_machine",
    text:"सिलाई के order बढ़ने लगे हैं। अब आगे?",
    opts:[
      { label:"जितना हो सके, उतना ही लूँगा",       amb:1 },
      { label:"रात लगाकर पूरा करूँगा",            amb:2 },
      { label:"एक साथी जोड़ूँगा",                 amb:3 },
      { label:"मशीन और कारीगर बढ़ाऊँगा",         amb:5 }
    ] },
  { id:"q193", type:"story", band:[2,3], layer:3, set:3, img:"jugaad_new",
    text:"गाँव में हुनर सिखाने वाला कैंप आया है। तुम क्या करोगे?",
    opts:[
      { label:"अभी सोचूँगा",                     amb:1 },
      { label:"ख़ुद जाकर सीखूँगा",               amb:2 },
      { label:"दोस्तों को भी साथ लाऊँगा",        amb:3 },
      { label:"आगे सिखाने वाला बनूँगा",          amb:5 }
    ] },
  { id:"q194", type:"story", band:[2,3], layer:3, set:3, img:"seed_sow",
    text:"खेत का एक कोना ख़ाली है। तुम क्या करोगे?",
    opts:[
      { label:"जो सब लगाते हैं, वही लगाऊँगा",         amb:1 },
      { label:"एक नई सब्ज़ी आज़माऊँगा",              amb:2 },
      { label:"बाज़ार से पूछकर लगाऊँगा",              amb:3 },
      { label:"अगले साल पूरे खेत की नई योजना",       amb:5 }
    ] },
  { id:"q195", type:"story", band:[2,3], layer:3, set:3, img:"cycle_fix",
    text:"सस्ती टूटी साइकिलें बिक रही हैं। तुम क्या करोगे?",
    opts:[
      { label:"एक अपने लिए लूँगा",              amb:1 },
      { label:"सुधारकर चलाऊँगा",                amb:2 },
      { label:"सुधार-सुधारकर बेचूँगा",            amb:3 },
      { label:"मरम्मत की दुकान खोलूँगा",         amb:5 }
    ] },
  { id:"q196", type:"story", band:[2,3], layer:3, set:3, img:"video_edit",
    text:"तुम्हें video बनाना आ गया है। अब आगे?",
    opts:[
      { label:"अपने लिए बनाऊँगा",              amb:1 },
      { label:"घर के आयोजनों के बनाऊँगा",       amb:2 },
      { label:"शादी के order लूँगा",             amb:3 },
      { label:"studio-टोली बनाऊँगा",            amb:5 }
    ] },
  { id:"q197", type:"story", band:[2,3], layer:3, set:3, img:"mandi_taul",
    text:"दूर की हाट में दाम ज़्यादा मिलता है। तुम क्या करोगे?",
    opts:[
      { label:"अपना गाँव ही ठीक है",              amb:1 },
      { label:"कभी-कभी जाऊँगा",                  amb:2 },
      { label:"हफ़्ते की योजना बनाकर जाऊँगा",      amb:3 },
      { label:"औरों का माल भी ले जाऊँगा",         amb:5 }
    ] },
  { id:"q198", type:"story", band:[2,3], layer:3, set:3, img:"piggy_bank",
    text:"गाँव के बचत-समूह ने जुड़ने का न्योता दिया। तुम क्या करोगे?",
    opts:[
      { label:"अभी नहीं जुड़ूँगा",                    amb:1 },
      { label:"जुड़कर बचत करूँगा",                   amb:2 },
      { label:"हिसाब की ज़िम्मेदारी लूँगा",             amb:3 },
      { label:"समूह से क़र्ज़ लेकर काम बड़ा करूँगा",    amb:5 }
    ] },

  /* ═══════ खेप-5 (set:4, layer:2 — संतुलन-खेप 100) ═══════ */

  { id:"q199", type:"scale", band:[1,2,3], layer:2, set:4, img:"exercise_coach",
    text:"सुबह दौड़-कसरत का नियम निभाना — कैसा लगता है?", mg:[22] },
  { id:"q200", type:"scale", band:[1,2,3], layer:2, set:4, img:"team_win",
    text:"मैच में हार-जीत दोनों में खेल-भावना रखना — कैसा लगता है?", mg:[22] },
  { id:"q201", type:"scale", band:[1,2,3], layer:2, set:4, img:"patang",
    text:"पतंग उड़ाते हुए हवा की दिशा समझना — कैसा लगता है?", mg:[22,20] },
  { id:"q202", type:"scale", band:[1,2,3], layer:2, set:4, img:"robot_toy",
    text:"खिलौने में बटन-मोटर लगाकर उसे चलाना — कैसा लगता है?", mg:[19] },
  { id:"q203", type:"scale", band:[1,2,3], layer:2, set:4, img:"news_read",
    text:"TV-mobile में विज्ञान की नई बातें देखना — कैसा लगता है?", mg:[15] },
  { id:"q204", type:"scale", band:[1,2,3], layer:2, set:4, img:"queue_line",
    text:"नियम तोड़ने वाले को टोकना — कैसा लगता है?", mg:[16,24] },
  { id:"q205", type:"scale", band:[1,2,3], layer:2, set:4, img:"judge_friends",
    text:"सच्चाई के पक्ष में अकेले खड़ा होना — कैसा लगता है?", mg:[16] },
  { id:"q206", type:"scale", band:[1,2,3], layer:2, set:4, img:"puja_thali",
    text:"व्रत-त्योहार की विधि सीखना — कैसा लगता है?", mg:[21] },
  { id:"q207", type:"scale", band:[1,2,3], layer:2, set:4, img:"stage_song",
    text:"कथा-कीर्तन सुनना और सुनाना — कैसा लगता है?", mg:[21,12] },
  { id:"q208", type:"scale", band:[1,2,3], layer:2, set:4, img:"hisab_copy",
    text:"बारिश-ठंड-गर्मी का हिसाब लिखकर रखना — कैसा लगता है?", mg:[20,18] },
  { id:"q209", type:"scale", band:[1,2,3], layer:2, set:4, img:"compost",
    text:"सूखे पत्तों और कचरे से खाद बनाना — कैसा लगता है?", mg:[20,1] },
  { id:"q210", type:"scale", band:[1,2,3], layer:2, set:4, img:"world_food",
    text:"दूसरे राज्यों के त्योहार और रीति जानना — कैसा लगता है?", mg:[14] },
  { id:"q211", type:"scale", band:[1,2,3], layer:2, set:4, img:"coin_stamp",
    text:"सिक्कों-नोटों को देखकर उनके देश पहचानना — कैसा लगता है?", mg:[14,23] },
  { id:"q212", type:"scale", band:[1,2,3], layer:2, set:4, img:"piggy_bank",
    text:"गुल्लक तोड़े बिना बचत बढ़ाते जाना — कैसा लगता है?", mg:[23] },
  { id:"q213", type:"scale", band:[1,2,3], layer:2, set:4, img:"mobile_app",
    text:"चीज़ों के दाम-भाव mobile में देखते रहना — कैसा लगता है?", mg:[23,18] },
  { id:"q214", type:"scale", band:[1,2,3], layer:2, set:4, img:"pani_khoj",
    text:"पहाड़-नदी और ज़मीन के खनिज की बातें जानना — कैसा लगता है?", mg:[2] },
  { id:"q215", type:"scale", band:[1,2,3], layer:2, set:4, img:"clay_art",
    text:"रंग-बिरंगे पत्थर जमा करना — कैसा लगता है?", mg:[2,12] },
  { id:"q216", type:"scale", band:[1,2,3], layer:2, set:4, img:"embroidery",
    text:"धागे-ऊन से बुनाई करना — कैसा लगता है?", mg:[5] },
  { id:"q217", type:"scale", band:[1,2,3], layer:2, set:4, img:"soap_make",
    text:"साबुन-शैम्पू के label पढ़कर समझना कि भीतर क्या है — कैसा लगता है?", mg:[13,18] },
  { id:"q218", type:"scale", band:[1,2,3], layer:2, set:4, img:"write_story",
    text:"अपने घर का नक़्शा काग़ज़ पर बनाना — कैसा लगता है?", mg:[4,12] },
  { id:"q219", type:"scale", band:[1,2,3], layer:2, set:4, img:"boy_bandage",
    text:"किसी को चोट लगे तो घबराए बिना मदद करना — कैसा लगता है?", mg:[6,24] },
  { id:"q220", type:"scale", band:[1,2,3], layer:2, set:4, img:"waste_sort",
    text:"साफ़-सफ़ाई रखकर बीमारियाँ रोकना — कैसा लगता है?", mg:[6,20] },
  { id:"q221", type:"scale", band:[1,2,3], layer:2, set:4, img:"learn_lang",
    text:"नए शब्द सीखकर बोलचाल में लाना — कैसा लगता है?", mg:[11] },
  { id:"q222", type:"scale", band:[1,2,3], layer:2, set:4, img:"teach_kids",
    text:"पढ़ा हुआ दोस्तों को दोहराकर पक्का करना — कैसा लगता है?", mg:[11] },
  { id:"q223", type:"scale", band:[1,2,3], layer:2, set:4, img:"pack_weigh",
    text:"चीज़ें गिनकर-नापकर सँभालना — कैसा लगता है?", mg:[18] },
  { id:"q224", type:"scale", band:[1,2,3], layer:2, set:4, img:"bus_drive",
    text:"bus-train का समय याद रखना — कैसा लगता है?", mg:[8,18] },
  { id:"q225", type:"scale", band:[1,2,3], layer:2, set:4, img:"chitthi_daftar",
    text:"सरकारी योजना की जानकारी लाकर घर में बताना — कैसा लगता है?", mg:[17] },
  { id:"q226", type:"scale", band:[1,2,3], layer:2, set:4, img:"mela_gate",
    text:"भीड़ में शांति से क़तार लगवाना — कैसा लगता है?", mg:[24,10] },
  { id:"q227", type:"scale", band:[1,2,3], layer:2, set:4, img:"board_wire",
    text:"मशीन खोलने से पहले बिजली बंद करना याद रखना — कैसा लगता है?", mg:[24,3] },
  { id:"q228", type:"scale", band:[1,2,3], layer:2, set:4, img:"count_money",
    text:"कल के कामों की सूची रात में ही बनाना — कैसा लगता है?", mg:[18,23] },

  { id:"q229", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"balla_gend",     label:"मैदान में खेलना",   mg:[22] },
      { img:"exercise_coach", label:"खेल सिखाना",       mg:[22,11] },
      { img:"ground_prep",    label:"मैदान का इंतज़ाम",   mg:[22,10] },
      { img:"hisab_copy",     label:"score का हिसाब",   mg:[22,18] }
    ] },
  { id:"q230", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"paint_toy",  label:"पतंग बनाना",       mg:[3,12] },
      { img:"patang",     label:"पतंग उड़ाना",       mg:[22] },
      { img:"embroidery", label:"माँझा-धागे का काम",  mg:[3,5] },
      { img:"shop_sell",  label:"पतंग बेचना",        mg:[9] }
    ] },
  { id:"q231", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"robot_toy",    label:"पुर्ज़े जोड़ना",          mg:[19,3] },
      { img:"run_machine",  label:"चलाकर आज़माना",       mg:[19] },
      { img:"idea_machine", label:"नया design सोचना",     mg:[19,15] },
      { img:"video_edit",   label:"दूसरों को दिखाना",      mg:[19,18] }
    ] },
  { id:"q232", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"puja_thali", label:"पूजा की विधि",     mg:[21] },
      { img:"sweet_make", label:"प्रसाद बनाना",     mg:[21,10] },
      { img:"stage_song", label:"भजन गाना",        mg:[21,12] },
      { img:"mela_gate",  label:"व्यवस्था सँभालना",  mg:[21,10] }
    ] },
  { id:"q233", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"judge_friends",  label:"दोनों पक्ष सुनना",    mg:[16] },
      { img:"chitthi_daftar", label:"कागज़ पढ़ना",        mg:[16,18] },
      { img:"camera_click",   label:"सबूत जमा करना",     mg:[16,18] },
      { img:"team_win",       label:"समझौता कराना",      mg:[16,10] }
    ] },
  { id:"q234", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tank_measure", label:"बारिश का पानी नापना",  mg:[20,18] },
      { img:"tree_plant",   label:"पेड़ गिनना-लगाना",     mg:[20,1] },
      { img:"waste_sort",   label:"कचरा छाँटना",          mg:[20,2] },
      { img:"teach_kids",   label:"सबको समझाना",         mg:[20,11] }
    ] },
  { id:"q235", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"world_map",  label:"देशों के नक़्शे",     mg:[14] },
      { img:"world_food", label:"देशों के खाने",      mg:[14,10] },
      { img:"coin_stamp", label:"सिक्के-टिकट",       mg:[14,12] },
      { img:"learn_lang", label:"नई भाषाएँ",         mg:[14,11] }
    ] },
  { id:"q236", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"piggy_bank", label:"बचत करना",          mg:[23] },
      { img:"hisab_copy", label:"हिसाब लिखना",       mg:[23,18] },
      { img:"mobile_app", label:"mobile से भुगतान",   mg:[23,7] },
      { img:"note_100",   label:"दाम की तुलना",      mg:[23,9] }
    ] },
  { id:"q237", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"pani_khoj",    label:"ज़मीन में पानी खोजना",       mg:[2] },
      { img:"brick_wall",   label:"बालू-गिट्टी का काम",         mg:[2,4] },
      { img:"news_read",    label:"कोयला-पत्थर की जानकारी",   mg:[2,18] },
      { img:"tank_measure", label:"कुआँ-टंकी की सफ़ाई",        mg:[2,10] }
    ] },
  { id:"q238", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"embroidery",     label:"बुनाई",        mg:[5] },
      { img:"sewing_machine", label:"सिलाई",        mg:[5] },
      { img:"soap_make",      label:"रंगाई",         mg:[5,13] },
      { img:"pack_weigh",     label:"press और तह",  mg:[5,10] }
    ] },
  { id:"q239", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot",    label:"मसालों का मेल",      mg:[13,10] },
      { img:"pickle_jar",  label:"अचार-ख़मीर का काम",  mg:[13,1] },
      { img:"soap_make",   label:"साबुन-सफ़ाई की चीज़ें", mg:[13] },
      { img:"aag_bujhana", label:"गैस-आग की सावधानी",  mg:[13,24] }
    ] },
  { id:"q240", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tank_measure", label:"नींव की नाप-जोख",   mg:[4,18] },
      { img:"brick_wall",   label:"ईंट की जोड़ाई",      mg:[4] },
      { img:"paint_toy",    label:"रंग-रोग़न",          mg:[4,12] },
      { img:"wood_toy",     label:"लकड़ी-दरवाज़े का काम", mg:[4,3] }
    ] },
  { id:"q241", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"sick_care",   label:"मरीज़ की देखभाल",   mg:[6,10] },
      { img:"med_shop",    label:"दवा का हिसाब",      mg:[6,18] },
      { img:"boy_bandage", label:"मरहम-पट्टी",        mg:[6] },
      { img:"waste_sort",  label:"सफ़ाई-व्यवस्था",     mg:[6,10] }
    ] },
  { id:"q242", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"write_story",    label:"कहानी-किताब पढ़ना",  mg:[11,12] },
      { img:"hisab_copy",     label:"गिनती का अभ्यास",   mg:[11,18] },
      { img:"tube_bubble",    label:"विज्ञान की जाँच",     mg:[11,13] },
      { img:"exercise_coach", label:"खेल के साथ पढ़ाई",   mg:[11,22] }
    ] },
  { id:"q243", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"pack_weigh",  label:"गिनना-तौलना",            mg:[18] },
      { img:"hisab_copy",  label:"सूची बनाना",              mg:[18] },
      { img:"graph_up",    label:"graph-चित्र बनाना",        mg:[18,12] },
      { img:"puzzle_solo", label:"अंदाज़ा लगाकर जाँचना",     mg:[18,15] }
    ] },
  { id:"q244", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"count_money",  label:"टिकट-पैसे का काम",  mg:[8,23] },
      { img:"godown_stack", label:"सामान सँभालना",     mg:[8] },
      { img:"show_way",     label:"रास्ता बताना",       mg:[8,10] },
      { img:"bus_drive",    label:"समय-सूची सँभालना",  mg:[8,18] }
    ] },
  { id:"q245", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"chitthi_daftar", label:"form भरने में सहायता",   mg:[17,11] },
      { img:"news_read",      label:"योजना की जानकारी",     mg:[17,18] },
      { img:"mela_gate",      label:"शिविर की व्यवस्था",      mg:[17,10] },
      { img:"judge_friends",  label:"शिकायत की सुनवाई",     mg:[17,16] }
    ] },
  { id:"q246", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"queue_line",  label:"रात का पहरा",        mg:[24] },
      { img:"aag_bujhana", label:"आग की तैयारी",       mg:[24] },
      { img:"flood_road",  label:"बाढ़ की योजना",       mg:[24,20] },
      { img:"teach_kids",  label:"बच्चों को सिखाना",     mg:[24,11] }
    ] },
  { id:"q247", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"video_edit",    label:"video बनाना",     mg:[18,12] },
      { img:"type_computer", label:"typing करना",     mg:[18,7] },
      { img:"mobile_app",    label:"online खोजना",    mg:[18,7] },
      { img:"game_rules",    label:"नया app आज़माना",  mg:[18,15] }
    ] },
  { id:"q248", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"clay_art",   label:"मिट्टी के बर्तन",     mg:[12] },
      { img:"wood_toy",   label:"लकड़ी के खिलौने",   mg:[12,3] },
      { img:"decoration", label:"सजावट का सामान",   mg:[12] },
      { img:"weld_spark", label:"भट्ठी में पकाना",     mg:[12,3] }
    ] },
  { id:"q249", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cow_milk",   label:"दूध दुहना",     mg:[1] },
      { img:"pickle_jar", label:"दही जमाना",     mg:[1,13] },
      { img:"sweet_make", label:"मिठाई बनाना",   mg:[1,10] },
      { img:"shop_sell",  label:"दूध बेचना",      mg:[1,9] }
    ] },
  { id:"q250", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"fish_pond",   label:"मछली पालना",      mg:[1] },
      { img:"shoe_stitch", label:"जाल की बुनाई",     mg:[1,5] },
      { img:"waste_sort",  label:"तालाब की सफ़ाई",   mg:[1,20] },
      { img:"mandi_taul",  label:"मंडी में बिक्री",     mg:[1,9] }
    ] },
  { id:"q251", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"board_wire",  label:"तार जोड़ना",         mg:[2] },
      { img:"bulb_fix",    label:"बल्ब-पंखा लगाना",    mg:[2,3] },
      { img:"solar_panel", label:"सोलर का काम",       mg:[2,15] },
      { img:"note_100",    label:"बिजली-बचत की सलाह", mg:[2,20] }
    ] },
  { id:"q252", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"ride_machine", label:"झूला-मशीन चलाना",  mg:[10,3] },
      { img:"shop_sell",    label:"खिलौना-दुकान",     mg:[9,10] },
      { img:"game_rules",   label:"खेल-स्टॉल",         mg:[22,9] },
      { img:"cook_pot",     label:"खाने का स्टॉल",     mg:[10] }
    ] },
  { id:"q253", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"forest_birds", label:"पंछी पहचानना",   mg:[20,1] },
      { img:"herb_leaf",    label:"जड़ी-बूटी जानना",  mg:[20,6] },
      { img:"tree_plant",   label:"पौधशाला का काम",  mg:[20,1] },
      { img:"camera_click", label:"प्रकृति की फ़ोटो",   mg:[20,12] }
    ] },
  { id:"q254", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"elder_help", label:"बूढ़ों की मदद",       mg:[10] },
      { img:"sick_care",  label:"बीमार की मदद",       mg:[10,6] },
      { img:"teach_kids", label:"पढ़ाई में मदद",       mg:[10,11] },
      { img:"show_way",   label:"खोए को रास्ता",      mg:[10] }
    ] },
  { id:"q255", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"stage_song",  label:"गाना गाना",       mg:[12] },
      { img:"stage_play",  label:"भाषण देना",       mg:[12,17] },
      { img:"news_read",   label:"ख़बर पढ़ना",       mg:[12,18] },
      { img:"video_edit",  label:"आवाज़ record करना", mg:[12,18] }
    ] },
  { id:"q256", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"godown_stack", label:"राशन की सूची",      mg:[23,18] },
      { img:"piggy_bank",   label:"बचत की योजना",     mg:[23] },
      { img:"note_100",     label:"ख़र्च में कटौती",     mg:[23] },
      { img:"count_money",  label:"त्योहार का बजट",    mg:[23,10] }
    ] },
  { id:"q257", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"lock_key",     label:"ताले की मरम्मत",       mg:[3] },
      { img:"shoe_stitch",  label:"छाता-चप्पल की मरम्मत",  mg:[3,5] },
      { img:"toy_open",     label:"घड़ी-खिलौने की मरम्मत",  mg:[3,19] },
      { img:"handpump_fix", label:"नल की मरम्मत",         mg:[3,2] }
    ] },
  { id:"q258", type:"pick", band:[1,2,3], layer:2, set:4,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"solar_panel", label:"solar से चलने वाली गाड़ी",  mg:[15,8] },
      { img:"robot_toy",   label:"robot-सहायक",             mg:[15,19] },
      { img:"mobile_app",  label:"online जुड़ा गाँव",         mg:[15,7] },
      { img:"seed_sow",    label:"नए ढंग की खेती",          mg:[15,1] }
    ] },

  { id:"q259", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — मैदान के खेल में, या दिमाग़ की पहेली में?",
    opts:[ { img:"balla_gend", label:"मैदान का खेल", mg:[22] },
           { img:"puzzle_solo", label:"दिमाग़ की पहेली", mg:[18] } ] },
  { id:"q260", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — देखकर सीखना, या पढ़कर सीखना?",
    opts:[ { img:"jugaad_new", label:"देखकर सीखना", mg:[3,11] },
           { img:"write_story", label:"पढ़कर सीखना", mg:[11,18] } ] },
  { id:"q261", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — आज का पक्का काम, या कल का बड़ा सपना?",
    opts:[ { img:"run_machine", label:"आज का पक्का काम", mg:[3] },
           { img:"idea_machine", label:"कल का बड़ा सपना", mg:[15] } ] },
  { id:"q262", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — नियम से चलना, या नियम बनाना?",
    opts:[ { img:"queue_line", label:"नियम से चलना", mg:[24,16] },
           { img:"judge_friends", label:"नियम बनाना", mg:[16,17] } ] },
  { id:"q263", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा रुचि किसमें — अपने देश की चीज़ों में, या विदेश की चीज़ों में?",
    opts:[ { img:"shop_sell", label:"देश की चीज़ें", mg:[9] },
           { img:"world_food", label:"विदेश की चीज़ें", mg:[14] } ] },
  { id:"q264", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — पैसा गिनने में, या कमाने की तरकीब सोचने में?",
    opts:[ { img:"count_money", label:"पैसा गिनना", mg:[23] },
           { img:"idea_machine", label:"कमाने की तरकीब", mg:[9,15] } ] },
  { id:"q265", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — मिट्टी-हरियाली का काम, या मशीन-कारख़ाने का काम?",
    opts:[ { img:"seed_sow", label:"मिट्टी-हरियाली", mg:[1,20] },
           { img:"badi_imarat", label:"मशीन-कारख़ाना", mg:[3] } ] },
  { id:"q266", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — पूजा की शांति, या मेले की धूम?",
    opts:[ { img:"puja_thali", label:"पूजा की शांति", mg:[21] },
           { img:"mela_gate", label:"मेले की धूम", mg:[10,21] } ] },
  { id:"q267", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — अपनी भाषा में लिखना, या नई भाषाएँ सीखना?",
    opts:[ { img:"write_story", label:"अपनी भाषा में लिखना", mg:[12,11] },
           { img:"learn_lang", label:"नई भाषाएँ सीखना", mg:[14,11] } ] },
  { id:"q268", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — एक गाँव गहरा जानना, या सौ गाँव घूमना?",
    opts:[ { img:"school_stall", label:"एक गाँव गहरा जानना", mg:[10,17] },
           { img:"travel_road", label:"सौ गाँव घूमना", mg:[8,14] } ] },
  { id:"q269", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — रोगी की सेवा, या रोग की जाँच-खोज?",
    opts:[ { img:"sick_care", label:"रोगी की सेवा", mg:[6,10] },
           { img:"tube_bubble", label:"रोग की जाँच-खोज", mg:[6,18] } ] },
  { id:"q270", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — हाथ की कढ़ाई में, या मशीन की सिलाई में?",
    opts:[ { img:"embroidery", label:"हाथ की कढ़ाई", mg:[12,5] },
           { img:"sewing_machine", label:"मशीन की सिलाई", mg:[3,5] } ] },
  { id:"q271", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — बीते का हिसाब रखने में, या आने वाले का अंदाज़ा लगाने में?",
    opts:[ { img:"hisab_copy", label:"बीते का हिसाब", mg:[18,23] },
           { img:"graph_up", label:"आने वाले का अंदाज़ा", mg:[15,18] } ] },
  { id:"q272", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा रुचि किसमें — धरती के नीचे की खोज में, या आसमान-मौसम की खोज में?",
    opts:[ { img:"pani_khoj", label:"धरती के नीचे की खोज", mg:[2] },
           { img:"patang", label:"आसमान-मौसम की खोज", mg:[20,15] } ] },
  { id:"q273", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — चीज़ बेचना, या चीज़ के बारे में बताना?",
    opts:[ { img:"shop_sell", label:"चीज़ बेचना", mg:[9] },
           { img:"video_edit", label:"चीज़ के बारे में बताना", mg:[18,9] } ] },
  { id:"q274", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — ख़ुद खिलाड़ी बनना, या खेल सिखाना?",
    opts:[ { img:"balla_gend", label:"खिलाड़ी बनना", mg:[22] },
           { img:"exercise_coach", label:"खेल सिखाना", mg:[22,11] } ] },
  { id:"q275", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — रसोई के जादू में, या खेत के जादू में?",
    opts:[ { img:"cook_pot", label:"रसोई का जादू", mg:[10,13] },
           { img:"seed_sow", label:"खेत का जादू", mg:[1] } ] },
  { id:"q276", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा रुचि किसमें — क़ानून की किताब में, या हुनर के औज़ारों में?",
    opts:[ { img:"judge_friends", label:"क़ानून की किताब", mg:[16] },
           { img:"jugaad_new", label:"हुनर के औज़ार", mg:[3,12] } ] },
  { id:"q277", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा रुचि किसमें — computer के भीतर, या मशीन के भीतर?",
    opts:[ { img:"type_computer", label:"computer के भीतर", mg:[7,18] },
           { img:"run_machine", label:"मशीन के भीतर", mg:[3,19] } ] },
  { id:"q278", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — आज बचाओ, या आज लगाओ-कल पाओ?",
    opts:[ { img:"piggy_bank", label:"आज बचाओ", mg:[23] },
           { img:"graph_up", label:"आज लगाओ, कल पाओ", mg:[23,15] } ] },
  { id:"q279", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा मज़ा किसमें — सजाने-सँवारने में, या नापने-जोड़ने में?",
    opts:[ { img:"decoration", label:"सजाना-सँवारना", mg:[12] },
           { img:"tank_measure", label:"नापना-जोड़ना", mg:[18,4] } ] },
  { id:"q280", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"कहाँ ज़्यादा अच्छा लगता है — लोगों की भीड़ में, या शांत कोने में?",
    opts:[ { img:"mela_gate", label:"लोगों की भीड़", mg:[10] },
           { img:"puzzle_solo", label:"शांत कोना", mg:[18] } ] },
  { id:"q281", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — पानी का काम, या आग-भट्ठी का काम?",
    opts:[ { img:"handpump_fix", label:"पानी का काम", mg:[2] },
           { img:"weld_spark", label:"आग-भट्ठी का काम", mg:[3] } ] },
  { id:"q282", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — सेवा-पुण्य का रास्ता, या कमाई-तरक़्क़ी का रास्ता?",
    opts:[ { img:"temple_seva", label:"सेवा-पुण्य", mg:[21,10] },
           { img:"graph_up", label:"कमाई-तरक़्क़ी", mg:[9,23] } ] },
  { id:"q283", type:"pair", band:[1,2,3], layer:2, set:4,
    text:"ज़्यादा अच्छा क्या — धरती को बचाना, या धरती से कमाना?",
    opts:[ { img:"tree_plant", label:"धरती बचाना", mg:[20] },
           { img:"tractor_plough", label:"धरती से कमाना", mg:[1,2] } ] },

  { id:"q284", type:"story", band:[1,2,3], layer:2, set:4, img:"balla_gend",
    text:"मैच से ठीक पहले तुम्हारा साथी चोटिल हो गया। तुम क्या करोगे?",
    opts:[
      { label:"उसकी जगह ख़ुद खेलूँगा",        mg:[22],    pts:2 },
      { label:"पहले पट्टी-मदद करूँगा",         mg:[6,24],  pts:2 },
      { label:"नया खिलाड़ी खोजूँगा",           mg:[10,22], pts:2 },
      { label:"खेल की योजना बदलूँगा",         mg:[18,22], pts:2 }
    ] },
  { id:"q285", type:"story", band:[1,2,3], layer:2, set:4, img:"patang",
    text:"पतंग पेड़ में फँस गई। तुम क्या करोगे?",
    opts:[
      { label:"डंडे का जुगाड़ बनाऊँगा",          mg:[3],     pts:2 },
      { label:"चढ़ने का ख़तरा पहले सोचूँगा",     mg:[24],    pts:2 },
      { label:"नई पतंग बना लूँगा",             mg:[12,3],  pts:2 },
      { label:"हवा का रुख़ देखकर तरीक़ा सोचूँगा", mg:[20,18], pts:2 }
    ] },
  { id:"q286", type:"story", band:[1,2,3], layer:2, set:4, img:"handpump_fix",
    text:"गाँव का नल ख़राब हो गया। तुम क्या करोगे?",
    opts:[
      { label:"मरम्मत की कोशिश करूँगा",        mg:[3,2],   pts:2 },
      { label:"दफ़्तर को ख़बर करूँगा",           mg:[17],    pts:2 },
      { label:"पानी का बँटवारा सँभालूँगा",       mg:[10,24], pts:2 },
      { label:"वर्षा-जल जमा करने का उपाय",     mg:[20,2],  pts:2 }
    ] },
  { id:"q287", type:"story", band:[1,2,3], layer:2, set:4, img:"elder_help",
    text:"दादी को दवा का समय याद नहीं रहता। तुम क्या करोगे?",
    opts:[
      { label:"समय की सूची बनाकर टाँगूँगा",     mg:[18,6],  pts:2 },
      { label:"घंटी बजने का जुगाड़ लगाऊँगा",     mg:[15,3],  pts:2 },
      { label:"ख़ुद रोज़ याद दिलाऊँगा",          mg:[10,6],  pts:2 },
      { label:"डॉक्टर से आसान दवा पूछूँगा",      mg:[6],     pts:2 }
    ] },
  { id:"q288", type:"story", band:[1,2,3], layer:2, set:4, img:"tube_bubble",
    text:"स्कूल में विज्ञान-मेला है। तुम क्या सँभालोगे?",
    opts:[
      { label:"नमूना बनाऊँगा",              mg:[3,13],  pts:2 },
      { label:"chart-graph बनाऊँगा",        mg:[18,12], pts:2 },
      { label:"आने वालों को समझाऊँगा",      mg:[11],    pts:2 },
      { label:"मेले का इंतज़ाम सँभालूँगा",     mg:[10,24], pts:2 }
    ] },
  { id:"q289", type:"story", band:[1,2,3], layer:2, set:4, img:"lock_key",
    text:"मोहल्ले में चोरी की ख़बर आई। तुम क्या करोगे?",
    opts:[
      { label:"घर के ताले जँचवाऊँगा",       mg:[24],    pts:2 },
      { label:"पहरा-टोली बनवाऊँगा",         mg:[24,10], pts:2 },
      { label:"सबको सावधान करूँगा",        mg:[24,11], pts:2 },
      { label:"गली में रोशनी का उपाय",      mg:[2,24],  pts:2 }
    ] },
  { id:"q290", type:"story", band:[1,2,3], layer:2, set:4, img:"tractor_plough",
    text:"खेत में नई मशीन आई है। तुम क्या करोगे?",
    opts:[
      { label:"चलाना सीखूँगा",                mg:[1,3],   pts:2 },
      { label:"ख़र्च-बचत का हिसाब लगाऊँगा",    mg:[23,18], pts:2 },
      { label:"औरों को चलाकर दिखाऊँगा",      mg:[11,1],  pts:2 },
      { label:"किराये पर देने की योजना",       mg:[9,15],  pts:2 }
    ] },
  { id:"q291", type:"story", band:[1,2,3], layer:2, set:4, img:"food_serve",
    text:"मंदिर में भंडारा है। तुम क्या सँभालोगे?",
    opts:[
      { label:"प्रसाद बनवाऊँगा",       mg:[21,10], pts:2 },
      { label:"परोसने का काम",        mg:[10,21], pts:2 },
      { label:"क़तार लगवाऊँगा",        mg:[24,10], pts:2 },
      { label:"ख़र्च का हिसाब",         mg:[23,18], pts:2 }
    ] },
  { id:"q292", type:"story", band:[1,2,3], layer:2, set:4, img:"note_100",
    text:"बाज़ार में नक़ली नोट की चर्चा है। तुम क्या करोगे?",
    opts:[
      { label:"असली-नक़ली पहचानना सीखूँगा",    mg:[23,24], pts:2 },
      { label:"घर-दोस्तों को सिखाऊँगा",          mg:[11,23], pts:2 },
      { label:"mobile-भुगतान अपनाऊँगा",        mg:[23,7],  pts:2 },
      { label:"दुकानदारों को सावधान करूँगा",     mg:[9,24],  pts:2 }
    ] },
  { id:"q293", type:"story", band:[1,2,3], layer:2, set:4, img:"brick_wall",
    text:"गाँव के पास नई सड़क बन रही है। तुम क्या करोगे?",
    opts:[
      { label:"काम देखकर सीखूँगा",           mg:[4,11],  pts:2 },
      { label:"काम का मौक़ा पूछूँगा",           mg:[4,9],   pts:2 },
      { label:"नाप-जोख समझने की कोशिश",     mg:[4,18],  pts:2 },
      { label:"पास में दुकान का मौक़ा सोचूँगा",  mg:[9,15],  pts:2 }
    ] },
  { id:"q294", type:"story", band:[1,2,3], layer:2, set:4, img:"bee_box",
    text:"बगीचे में मधुमक्खी का छत्ता दिखा। तुम क्या करोगे?",
    opts:[
      { label:"मधुमक्खी-पालन के बारे में सीखूँगा",  mg:[1],     pts:2 },
      { label:"दूरी-सावधानी रखूँगा-रखवाऊँगा",     mg:[24],    pts:2 },
      { label:"शहद की जानकारी जुटाऊँगा",         mg:[18,1],  pts:2 },
      { label:"जानकार से सलाह लूँगा",             mg:[10,17], pts:2 }
    ] },
  { id:"q295", type:"story", band:[1,2,3], layer:2, set:4, img:"game_rules",
    text:"दोस्त online खेल में पैसे हार गया। तुम क्या करोगे?",
    opts:[
      { label:"प्यार से समझाऊँगा",                mg:[10,11], pts:2 },
      { label:"घरवालों को बताने को कहूँगा",        mg:[24,16], pts:2 },
      { label:"उस app की सच्चाई जाँचूँगा",         mg:[7,18],  pts:2 },
      { label:"बचत की सही राह दिखाऊँगा",         mg:[23,11], pts:2 }
    ] },
  { id:"q296", type:"story", band:[1,2,3], layer:2, set:4, img:"flood_road",
    text:"तूफ़ान की चेतावनी आई है। तुम क्या सँभालोगे?",
    opts:[
      { label:"घर की हिफ़ाज़त",             mg:[24],    pts:2 },
      { label:"पड़ोसियों को ख़बर",           mg:[10,24], pts:2 },
      { label:"ज़रूरी सामान की सूची",        mg:[18,24], pts:2 },
      { label:"जानवरों की हिफ़ाज़त",         mg:[1,24],  pts:2 }
    ] },
  { id:"q297", type:"story", band:[1,2,3], layer:2, set:4, img:"stage_song",
    text:"मेले में गाने का मौक़ा मिला है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद गाऊँगा",                    mg:[12],    pts:2 },
      { label:"साथ बजाने वाले जोड़ूँगा",         mg:[10,12], pts:2 },
      { label:"पीछे से इंतज़ाम सँभालूँगा",         mg:[10],    pts:2 },
      { label:"record करके सहेजूँगा",           mg:[18,12], pts:2 }
    ] },
  { id:"q298", type:"story", band:[1,2,3], layer:2, set:4, img:"type_computer",
    text:"घर में एक पुराना computer मिला। तुम क्या करोगे?",
    opts:[
      { label:"चलाकर देखूँगा",              mg:[7],    pts:2 },
      { label:"खोलकर भीतर समझूँगा",        mg:[3,7],  pts:2 },
      { label:"typing सीखूँगा",             mg:[7,11], pts:2 },
      { label:"इससे काम-कमाई सोचूँगा",     mg:[9,15], pts:2 }
    ] },

  /* ═══════ खेप-6 (set:5, band:[2,3] — बड़ों की पट्टी: काम-दुनिया 101) ═══════ */

  { id:"q299", type:"scale", band:[2,3], layer:2, set:5, img:"shop_sell",
    text:"ग्राहक की शिकायत ठंडे दिमाग़ से सुनना — कैसा लगता है?", mg:[9,10] },
  { id:"q300", type:"scale", band:[2,3], layer:2, set:5, img:"count_money",
    text:"मज़दूरी का सही हिसाब माँगना और देना — कैसा लगता है?", mg:[23,16] },
  { id:"q301", type:"scale", band:[2,3], layer:2, set:5, img:"bolt_fit",
    text:"काम के बाद औज़ार साफ़ करके जगह पर रखना — कैसा लगता है?", mg:[3,24] },
  { id:"q302", type:"scale", band:[2,3], layer:2, set:5, img:"note_100",
    text:"नए काम का चालू rate पता करना — कैसा लगता है?", mg:[9,23] },
  { id:"q303", type:"scale", band:[2,3], layer:2, set:5, img:"tube_bubble",
    text:"खेत की मिट्टी की जाँच कराना — कैसा लगता है?", mg:[1,13] },
  { id:"q304", type:"scale", band:[2,3], layer:2, set:5, img:"seed_sow",
    text:"बीज-खाद के नए brand आज़माकर देखना — कैसा लगता है?", mg:[1,15] },
  { id:"q305", type:"scale", band:[2,3], layer:2, set:5, img:"chitthi_daftar",
    text:"गाड़ी के कागज़-बीमा समय पर कराना — कैसा लगता है?", mg:[8,16] },
  { id:"q306", type:"scale", band:[2,3], layer:2, set:5, img:"godown_stack",
    text:"भारी सामान उठाने का सही ढंग सीखना — कैसा लगता है?", mg:[24,6] },
  { id:"q307", type:"scale", band:[2,3], layer:2, set:5, img:"decoration",
    text:"दुकान ऐसे सजाना कि बिक्री बढ़े — कैसा लगता है?", mg:[9,12] },
  { id:"q308", type:"scale", band:[2,3], layer:2, set:5, img:"hisab_copy",
    text:"रोज़ शाम गल्ला मिलाकर हिसाब बराबर करना — कैसा लगता है?", mg:[23,18] },
  { id:"q309", type:"scale", band:[2,3], layer:2, set:5, img:"bulb_fix",
    text:"mobile से चलने वाले switch-बल्ब लगाना — कैसा लगता है?", mg:[19,2] },
  { id:"q310", type:"scale", band:[2,3], layer:2, set:5, img:"video_edit",
    text:"drone से बनी videos देखना और समझना — कैसा लगता है?", mg:[19,18] },
  { id:"q311", type:"scale", band:[2,3], layer:2, set:5, img:"vehicle_sound",
    text:"मशीन की आवाज़ सुनकर गड़बड़ी पहचानना — कैसा लगता है?", mg:[3,18] },
  { id:"q312", type:"scale", band:[2,3], layer:2, set:5, img:"sick_care",
    text:"मरीज़ को अस्पताल ले जाने में साथ देना — कैसा लगता है?", mg:[6,10] },
  { id:"q313", type:"scale", band:[2,3], layer:2, set:5, img:"write_story",
    text:"बच्चों को कहानी सुनाकर कुछ सिखाना — कैसा लगता है?", mg:[11,12] },
  { id:"q314", type:"scale", band:[2,3], layer:2, set:5, img:"count_money",
    text:"शादी-ब्याह में लेन-देन का हिसाब सँभालना — कैसा लगता है?", mg:[23,10] },
  { id:"q315", type:"scale", band:[2,3], layer:2, set:5, img:"judge_friends",
    text:"पंचायत की बैठक ध्यान से सुनना — कैसा लगता है?", mg:[17,16] },
  { id:"q316", type:"scale", band:[2,3], layer:2, set:5, img:"team_win",
    text:"टोली के झगड़े सुलझाकर काम चालू रखना — कैसा लगता है?", mg:[10,16] },
  { id:"q317", type:"scale", band:[2,3], layer:2, set:5, img:"pack_weigh",
    text:"त्योहारी मौसम के लिए ज़्यादा माल की तैयारी करना — कैसा लगता है?", mg:[9,18] },
  { id:"q318", type:"scale", band:[2,3], layer:2, set:5, img:"travel_road",
    text:"विदेश गए लोगों से वहाँ के काम की बातें पूछना — कैसा लगता है?", mg:[14,18] },
  { id:"q319", type:"scale", band:[2,3], layer:2, set:5, img:"mobile_app",
    text:"मौसम-app देखकर खेत का काम तय करना — कैसा लगता है?", mg:[1,20] },
  { id:"q320", type:"scale", band:[2,3], layer:2, set:5, img:"piggy_bank",
    text:"नया हुनर सीखने के लिए फीस बचाना — कैसा लगता है?", mg:[23,11] },
  { id:"q321", type:"scale", band:[2,3], layer:2, set:5, img:"temple_seva",
    text:"मंदिर-कमेटी के काम में हाथ बँटाना — कैसा लगता है?", mg:[21,10] },
  { id:"q322", type:"scale", band:[2,3], layer:2, set:5, img:"ground_prep",
    text:"खेल-tournament का इंतज़ाम देखना — कैसा लगता है?", mg:[22,10] },
  { id:"q323", type:"scale", band:[2,3], layer:2, set:5, img:"chitthi_daftar",
    text:"काग़ज़ात की file बनाकर सँभालकर रखना — कैसा लगता है?", mg:[18,17] },
  { id:"q324", type:"scale", band:[2,3], layer:2, set:5, img:"mandi_taul",
    text:"पुरानी चीज़ का सही दाम आँकना — कैसा लगता है?", mg:[9,18] },
  { id:"q325", type:"scale", band:[2,3], layer:2, set:5, img:"soap_make",
    text:"रंग-केमिकल के काम में दस्ताने पहनना याद रखना — कैसा लगता है?", mg:[13,24] },
  { id:"q326", type:"scale", band:[2,3], layer:2, set:5, img:"embroidery",
    text:"सिलाई के नए design mobile में खोजना — कैसा लगता है?", mg:[5,18] },
  { id:"q327", type:"scale", band:[2,3], layer:2, set:5, img:"brick_wall",
    text:"भवन बनते देखकर उसकी तकनीक समझना — कैसा लगता है?", mg:[4,18] },
  { id:"q328", type:"scale", band:[2,3], layer:2, set:5, img:"pani_khoj",
    text:"अपने इलाक़े के पानी-स्तर की चिंता करना — कैसा लगता है?", mg:[2,20] },

  { id:"q329", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"jugaad_new", label:"काम जल्दी सीखना",   mg:[11,3] },
      { img:"team_win",   label:"सबसे बनकर रहना",   mg:[10] },
      { img:"queue_line", label:"समय की पाबंदी",     mg:[24] },
      { img:"bolt_fit",   label:"औज़ार सँभालना",     mg:[3,24] }
    ] },
  { id:"q330", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"school_stall",   label:"सही जगह चुनना",   mg:[9,4] },
      { img:"godown_stack",   label:"माल जुटाना",      mg:[9,8] },
      { img:"piggy_bank",     label:"पूँजी जोड़ना",      mg:[9,23] },
      { img:"chitthi_daftar", label:"लाइसेंस-कागज़",    mg:[9,16] }
    ] },
  { id:"q331", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"seed_sow",     label:"नई फ़सल आज़माना",         mg:[1,15] },
      { img:"mandi_taul",   label:"सीधी मंडी-बिक्री",          mg:[1,9] },
      { img:"godown_stack", label:"फ़सल का भंडारण",          mg:[1,8] },
      { img:"pickle_jar",   label:"अचार-आटा जैसा प्रसंस्करण",  mg:[1,13] }
    ] },
  { id:"q332", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"weld_spark", label:"वेल्डिंग",          mg:[3] },
      { img:"paint_toy",  label:"रंगाई-पॉलिश",      mg:[3,12] },
      { img:"bolt_fit",   label:"fitting का काम",   mg:[3] },
      { img:"shop_sell",  label:"order लेना",       mg:[3,9] }
    ] },
  { id:"q333", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"sick_care",   label:"मरीज़-देखभाल",     mg:[6,10] },
      { img:"med_shop",    label:"दवा-भंडार",        mg:[6,8] },
      { img:"write_story", label:"रिपोर्ट-file",      mg:[6,18] },
      { img:"waste_sort",  label:"सफ़ाई-निगरानी",    mg:[6,24] }
    ] },
  { id:"q334", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tank_measure",   label:"नाप लेना",       mg:[5,18] },
      { img:"embroidery",     label:"कटाई का काम",    mg:[5] },
      { img:"sewing_machine", label:"मशीन-सिलाई",    mg:[5,3] },
      { img:"pack_weigh",     label:"माल की जाँच",    mg:[5,18] }
    ] },
  { id:"q335", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"pack_weigh",   label:"तौल-भराई",     mg:[9,18] },
      { img:"hisab_copy",   label:"उधार-खाता",    mg:[9,23] },
      { img:"godown_stack", label:"माल मँगाना",   mg:[9,8] },
      { img:"show_way",     label:"घर-पहुँच सेवा", mg:[9,10] }
    ] },
  { id:"q336", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cycle_fix",   label:"पंचर-टायर",      mg:[8,3] },
      { img:"run_machine", label:"engine का काम",  mg:[8,3] },
      { img:"board_wire",  label:"wiring का काम",  mg:[8,2] },
      { img:"count_money", label:"billing-हिसाब",   mg:[8,23] }
    ] },
  { id:"q337", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"type_computer",  label:"typing का काम",   mg:[7] },
      { img:"camera_click",   label:"photo-print",     mg:[7,12] },
      { img:"chitthi_daftar", label:"online form",     mg:[7,17] },
      { img:"teach_kids",     label:"computer सिखाना", mg:[7,11] }
    ] },
  { id:"q338", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot",    label:"खाना बनाना",       mg:[10] },
      { img:"food_serve",  label:"परोसना-सफ़ाई",     mg:[10,24] },
      { img:"count_money", label:"गल्ला सँभालना",     mg:[10,23] },
      { img:"mandi_taul",  label:"सामान की ख़रीद",   mg:[10,9] }
    ] },
  { id:"q339", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tank_measure", label:"नाप-layout",     mg:[4,18] },
      { img:"brick_wall",   label:"मिस्त्री-काम",     mg:[4] },
      { img:"godown_stack", label:"सामान-ढुलाई",    mg:[4,8] },
      { img:"team_win",     label:"मज़दूर-टोली",     mg:[4,10] }
    ] },
  { id:"q340", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"animal_love", label:"पशु-सेहत",     mg:[1,6] },
      { img:"tube_bubble", label:"दूध की जाँच",   mg:[1,13] },
      { img:"shop_sell",   label:"ग्राहक-सेवा",    mg:[1,9] },
      { img:"hisab_copy",  label:"डेयरी-हिसाब",   mg:[1,23] }
    ] },
  { id:"q341", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app", label:"ग्राहक को समझाना",   mg:[7,11] },
      { img:"phone_dead", label:"mobile-मरम्मत",      mg:[7,3] },
      { img:"note_100",   label:"recharge-भुगतान",    mg:[7,23] },
      { img:"shop_sell",  label:"ख़रीद-बेच",           mg:[7,9] }
    ] },
  { id:"q342", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"write_story",    label:"रोज़ की पढ़ाई",        mg:[11] },
      { img:"puzzle_solo",    label:"पुराने प्रश्न हल करना",  mg:[11,18] },
      { img:"news_read",      label:"ख़बरों पर नज़र",       mg:[11,17] },
      { img:"chitthi_daftar", label:"form-तारीख़ें याद",     mg:[17,18] }
    ] },
  { id:"q343", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"board_wire",  label:"wiring",           mg:[2] },
      { img:"run_machine", label:"मोटर का काम",      mg:[2,3] },
      { img:"solar_panel", label:"सोलर लगाना",       mg:[2,15] },
      { img:"hisab_copy",  label:"बिल-अनुमान",       mg:[2,18] }
    ] },
  { id:"q344", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"pani_khoj",       label:"बोरिंग",           mg:[2] },
      { img:"pipe_irrigation", label:"पाइप-line",        mg:[2,4] },
      { img:"tank_measure",    label:"टंकी का ठेका",     mg:[2,9] },
      { img:"pack_weigh",      label:"मीटर-रीडिंग",      mg:[2,18] }
    ] },
  { id:"q345", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"exercise_coach", label:"कसरत कराना",      mg:[22,6] },
      { img:"cook_pot",       label:"डाइट बताना",       mg:[22,6] },
      { img:"count_money",    label:"membership-हिसाब", mg:[22,23] },
      { img:"run_machine",    label:"मशीन-रखरखाव",     mg:[22,3] }
    ] },
  { id:"q346", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"puja_thali",  label:"पूजा-सामग्री",   mg:[21,9] },
      { img:"count_money", label:"दान का हिसाब",  mg:[21,23] },
      { img:"queue_line",  label:"दर्शन की line",  mg:[21,24] },
      { img:"sweet_make",  label:"प्रसाद का काम",  mg:[21,10] }
    ] },
  { id:"q347", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"news_boy",   label:"घर-घर से जमा",    mg:[20,10] },
      { img:"waste_sort", label:"छँटाई का काम",     mg:[20,2] },
      { img:"compost",    label:"खाद बनाना",        mg:[20,1] },
      { img:"teach_kids", label:"जागरूकता फैलाना",  mg:[20,11] }
    ] },
  { id:"q348", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"chitthi_daftar", label:"दस्तावेज़ तैयार",   mg:[16,18] },
      { img:"camera_click",   label:"सबूत जुटाना",     mg:[16,18] },
      { img:"write_story",    label:"अर्ज़ी लिखना",     mg:[16,17] },
      { img:"judge_friends",  label:"समझौता-बैठक",    mg:[16,10] }
    ] },
  { id:"q349", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mela_gate",    label:"मंडप-बाँस का काम",   mg:[10,4] },
      { img:"flower_sell",  label:"फूल-परदे",           mg:[10,12] },
      { img:"light_string", label:"light-साउंड",         mg:[10,2] },
      { img:"stage_play",   label:"मंच-design",         mg:[10,12] }
    ] },
  { id:"q350", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"shoe_stitch",  label:"जाल का काम",       mg:[1,5] },
      { img:"godown_stack", label:"बर्फ़-भंडारण",       mg:[1,8] },
      { img:"mandi_taul",   label:"नीलामी-बिक्री",      mg:[1,9] },
      { img:"hisab_copy",   label:"पट्टे का हिसाब",     mg:[1,23] }
    ] },
  { id:"q351", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"patang",          label:"drone उड़ाना",       mg:[19,22] },
      { img:"pipe_irrigation", label:"खेत में छिड़काव",     mg:[19,1] },
      { img:"camera_click",    label:"photo-सर्वे",        mg:[19,18] },
      { img:"toy_open",        label:"drone-मरम्मत",      mg:[19,3] }
    ] },
  { id:"q352", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"bolt_fit",      label:"मशीन की setting",   mg:[3] },
      { img:"run_machine",   label:"line की निगरानी",    mg:[3,24] },
      { img:"vehicle_sound", label:"ख़राबी की जाँच",      mg:[3,18] },
      { img:"pack_weigh",    label:"उत्पादन-गिनती",      mg:[3,18] }
    ] },
  { id:"q353", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"chitthi_daftar", label:"खाता खुलवाना",      mg:[23,17] },
      { img:"count_money",    label:"जमा-निकासी",        mg:[23] },
      { img:"teach_kids",     label:"योजना समझाना",     mg:[23,11] },
      { img:"hisab_copy",     label:"कागज़ की जाँच",     mg:[23,16] }
    ] },
  { id:"q354", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"soap_make",   label:"रंग घोलना",        mg:[13,5] },
      { img:"paint_toy",   label:"ठप्पा-छपाई",        mg:[13,12] },
      { img:"pack_weigh",  label:"press का काम",     mg:[13,5] },
      { img:"aag_bujhana", label:"रसायन-सुरक्षा",     mg:[13,24] }
    ] },
  { id:"q355", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"write_story",  label:"जगह की कहानी सुनाना",  mg:[10,12] },
      { img:"world_map",    label:"रास्ते की योजना",       mg:[10,8] },
      { img:"food_serve",   label:"रुकने-खाने का इंतज़ाम",  mg:[10] },
      { img:"camera_click", label:"फ़ोटो खिंचवाना",        mg:[10,12] }
    ] },
  { id:"q356", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"balla_gend",  label:"बच्चों का हुनर परखना",  mg:[22,18] },
      { img:"hisab_copy",  label:"अभ्यास-तालिका",        mg:[22,18] },
      { img:"ground_prep", label:"मैच का आयोजन",        mg:[22,10] },
      { img:"boy_bandage", label:"चोट से बचाव",          mg:[22,6] }
    ] },
  { id:"q357", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"video_edit", label:"video-पाठ बनाना",     mg:[11,18] },
      { img:"teach_kids", label:"doubt हल करना",      mg:[11,10] },
      { img:"game_rules", label:"quiz बनाना",          mg:[11,18] },
      { img:"graph_up",   label:"progress-रिपोर्ट",     mg:[11,18] }
    ] },
  { id:"q358", type:"pick", band:[2,3], layer:2, set:5,
    text:"इनमें से कौन-सा काम तुम सबसे पहले करना चाहोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"boy_bandage",  label:"पहली-सहायता",             mg:[24,6] },
      { img:"godown_stack", label:"राहत-सामान की सूची",       mg:[24,18] },
      { img:"show_way",     label:"सुरक्षित-स्थान की योजना",    mg:[24,18] },
      { img:"news_read",    label:"अफ़वाह रोकना",             mg:[24,11] }
    ] },

  { id:"q359", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — बँधी पगार, या काम-के-हिसाब कमाई?",
    opts:[ { img:"count_money", label:"बँधी पगार", mg:[23] },
           { img:"graph_up", label:"काम-के-हिसाब कमाई", mg:[9,15] } ] },
  { id:"q360", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — भीतर बैठकर काम, या धूप-मैदान का काम?",
    opts:[ { img:"type_computer", label:"भीतर बैठकर काम", mg:[7,18] },
           { img:"brick_wall", label:"धूप-मैदान का काम", mg:[1,4] } ] },
  { id:"q361", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — एक मालिक की नौकरी, या कई ग्राहकों का काम?",
    opts:[ { img:"type_computer", label:"एक मालिक की नौकरी", mg:[3,7] },
           { img:"shop_sell", label:"कई ग्राहकों का काम", mg:[9,10] } ] },
  { id:"q362", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — औज़ार अपने हों, या हुनर ही औज़ार हो?",
    opts:[ { img:"bolt_fit", label:"औज़ार अपने हों", mg:[3,9] },
           { img:"weld_spark", label:"हुनर ही औज़ार", mg:[3,11] } ] },
  { id:"q363", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — बना-बनाया रास्ता, या अपना रास्ता?",
    opts:[ { img:"run_machine", label:"बना-बनाया रास्ता", mg:[3] },
           { img:"idea_machine", label:"अपना रास्ता", mg:[15] } ] },
  { id:"q364", type:"pair", band:[2,3], layer:2, set:5,
    text:"तुम किसमें ज़्यादा पक्के हो — गिनती में, या बातचीत में?",
    opts:[ { img:"hisab_copy", label:"गिनती में पक्का", mg:[18,23] },
           { img:"shop_sell", label:"बातचीत में पक्का", mg:[9,10] } ] },
  { id:"q365", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — मौसम के साथ चलने वाला काम, या मौसम से बेअसर काम?",
    opts:[ { img:"seed_sow", label:"मौसम के साथ का काम", mg:[1,20] },
           { img:"badi_imarat", label:"मौसम से बेअसर काम", mg:[3,7] } ] },
  { id:"q366", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा प्यारी क्या — गाँव की पहचान, या बाज़ार की पहचान?",
    opts:[ { img:"school_stall", label:"गाँव की पहचान", mg:[10,17] },
           { img:"world_map", label:"बाज़ार की पहचान", mg:[9,14] } ] },
  { id:"q367", type:"pair", band:[2,3], layer:2, set:5,
    text:"तुम्हारी नज़र ज़्यादा पैनी किसमें — सामान की परख में, या आदमी की परख में?",
    opts:[ { img:"pack_weigh", label:"सामान की परख", mg:[9,18] },
           { img:"team_win", label:"आदमी की परख", mg:[10,16] } ] },
  { id:"q368", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — हिसाब सबके सामने रखना, या योजना अपने मन में रखना?",
    opts:[ { img:"count_money", label:"हिसाब सबके सामने", mg:[23,17] },
           { img:"puzzle_solo", label:"योजना अपने मन में", mg:[15,18] } ] },
  { id:"q369", type:"pair", band:[2,3], layer:2, set:5,
    text:"तुम्हारी ताक़त क्या — सधे हाथ, या चलता दिमाग़?",
    opts:[ { img:"embroidery", label:"सधे हाथ", mg:[12,5] },
           { img:"idea_machine", label:"चलता दिमाग़", mg:[15,18] } ] },
  { id:"q370", type:"pair", band:[2,3], layer:2, set:5,
    text:"काम में ज़्यादा ज़रूरी क्या लगता है — सफ़ाई, या रफ़्तार?",
    opts:[ { img:"bolt_fit", label:"काम में सफ़ाई", mg:[3,24] },
           { img:"graph_up", label:"काम में रफ़्तार", mg:[3,8] } ] },
  { id:"q371", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — पुराने ग्राहक जोड़े रखना, या नए बाज़ार खोजना?",
    opts:[ { img:"shop_sell", label:"पुराने ग्राहक जोड़े रखना", mg:[9,10] },
           { img:"travel_road", label:"नए बाज़ार खोजना", mg:[9,14] } ] },
  { id:"q372", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा भाती क्या — मंदिर की घंटी, या मशीन की घरघराहट?",
    opts:[ { img:"puja_thali", label:"मंदिर की घंटी", mg:[21] },
           { img:"run_machine", label:"मशीन की घरघराहट", mg:[3] } ] },
  { id:"q373", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा भाता क्या — खेल का पसीना, या किताब की ख़ुशबू?",
    opts:[ { img:"balla_gend", label:"खेल का पसीना", mg:[22] },
           { img:"write_story", label:"किताब की ख़ुशबू", mg:[11] } ] },
  { id:"q374", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा भाती क्या — मिट्टी की ख़ुशबू, या पेट्रोल-मशीन की गंध?",
    opts:[ { img:"compost", label:"मिट्टी की ख़ुशबू", mg:[1,20] },
           { img:"vehicle_sound", label:"पेट्रोल-मशीन की गंध", mg:[3,8] } ] },
  { id:"q375", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा रुचि किसमें — drone-robot की दुनिया, या गाय-बैल की दुनिया?",
    opts:[ { img:"robot_toy", label:"drone-robot की दुनिया", mg:[19,15] },
           { img:"cow_milk", label:"गाय-बैल की दुनिया", mg:[1] } ] },
  { id:"q376", type:"pair", band:[2,3], layer:2, set:5,
    text:"तुम्हें कौन-सी भाषा ज़्यादा समझ आती है — नक़्शे-नाप की, या रंग-सुर की?",
    opts:[ { img:"tank_measure", label:"नक़्शे-नाप की भाषा", mg:[4,18] },
           { img:"stage_song", label:"रंग-सुर की भाषा", mg:[12] } ] },
  { id:"q377", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — क़ायदे की धीमी कमाई, या तेज़ मौक़ा पकड़ना?",
    opts:[ { img:"piggy_bank", label:"क़ायदे की धीमी कमाई", mg:[23,16] },
           { img:"graph_up", label:"तेज़ मौक़ा पकड़ना", mg:[9,15] } ] },
  { id:"q378", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — सबकी नज़र में रहना, या परदे के पीछे की मज़बूती बनना?",
    opts:[ { img:"stage_play", label:"सबकी नज़र में", mg:[12,10] },
           { img:"godown_stack", label:"परदे के पीछे मज़बूती", mg:[24,8] } ] },
  { id:"q379", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा ज़रूरी काम क्या लगता है — पानी बचाना, या बिजली बनाना?",
    opts:[ { img:"pipe_irrigation", label:"पानी बचाना", mg:[2,20] },
           { img:"solar_panel", label:"बिजली बनाना", mg:[2,15] } ] },
  { id:"q380", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा भरोसा किस पर — देसी जुगाड़ पर, या विदेशी तकनीक पर?",
    opts:[ { img:"jugaad_new", label:"देसी जुगाड़", mg:[3,12] },
           { img:"robot_toy", label:"विदेशी तकनीक", mg:[19,14] } ] },
  { id:"q381", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छी क्या — त्योहार की मोटी कमाई, या बारहमासी बँधी कमाई?",
    opts:[ { img:"mela_gate", label:"त्योहार की कमाई", mg:[9,21] },
           { img:"shop_sell", label:"बारहमासी कमाई", mg:[9,23] } ] },
  { id:"q382", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा गर्व किस पर — अपने हाथ के खाने पर, या अपने खेत की सब्ज़ी पर?",
    opts:[ { img:"cook_pot", label:"अपने हाथ का खाना", mg:[10,13] },
           { img:"tamatar_tokri", label:"अपने खेत की सब्ज़ी", mg:[1] } ] },
  { id:"q383", type:"pair", band:[2,3], layer:2, set:5,
    text:"ज़्यादा अच्छा क्या — बच्चों के बीच काम, या बड़ों के बीच काम?",
    opts:[ { img:"teach_kids", label:"बच्चों के बीच काम", mg:[11,10] },
           { img:"team_win", label:"बड़ों के बीच काम", mg:[10,9] } ] },

  { id:"q384", type:"story", band:[2,3], layer:2, set:5, img:"count_money",
    text:"मालिक ने कहा — काम ज़्यादा करो, पगार वही रहेगी। तुम क्या करोगे?",
    opts:[
      { label:"शांति से अपनी बात रखूँगा",         mg:[10,16], pts:2 },
      { label:"नया rate माँगूँगा",                mg:[23,9],  pts:2 },
      { label:"हुनर बढ़ाकर आगे बढ़ूँगा",           mg:[11,3],  pts:2 },
      { label:"अपना काम शुरू करने की सोचूँगा",    mg:[15,9],  pts:2 }
    ] },
  { id:"q385", type:"story", band:[2,3], layer:2, set:5, img:"note_100",
    text:"गाँव में bank का शिविर लगा है। तुम क्या करोगे?",
    opts:[
      { label:"अपना खाता खुलवाऊँगा",           mg:[23,17], pts:2 },
      { label:"घर-पड़ोस के लोगों को लाऊँगा",     mg:[10,11], pts:2 },
      { label:"सरकारी योजनाएँ समझूँगा",         mg:[17,18], pts:2 },
      { label:"काम के क़र्ज़ की जानकारी लूँगा",    mg:[23,15], pts:2 }
    ] },
  { id:"q386", type:"story", band:[2,3], layer:2, set:5, img:"mandi_taul",
    text:"मंडी में फ़सल के दाम गिर गए। तुम क्या करोगे?",
    opts:[
      { label:"रुककर सही दाम पर बेचूँगा",       mg:[18,9], pts:2 },
      { label:"भंडारण का इंतज़ाम करूँगा",        mg:[8,1],  pts:2 },
      { label:"सीधे ग्राहक खोजूँगा",             mg:[9,10], pts:2 },
      { label:"प्रसंस्करण करके बेचूँगा",          mg:[13,1], pts:2 }
    ] },
  { id:"q387", type:"story", band:[2,3], layer:2, set:5, img:"run_machine",
    text:"नई मशीन हाथ नहीं बैठ रही। तुम क्या करोगे?",
    opts:[
      { label:"रोज़ अभ्यास करूँगा",                mg:[3],     pts:2 },
      { label:"जानकार से सीखूँगा",                mg:[10,11], pts:2 },
      { label:"video-manual से समझूँगा",          mg:[18,11], pts:2 },
      { label:"तब तक पुराने ढंग से काम चालू रखूँगा", mg:[3,24],  pts:2 }
    ] },
  { id:"q388", type:"story", band:[2,3], layer:2, set:5, img:"team_win",
    text:"टोली का एक साथी रोज़ देर से आता है। तुम क्या करोगे?",
    opts:[
      { label:"अकेले में समझाऊँगा",           mg:[10,11], pts:2 },
      { label:"काम-बँटवारा बदलूँगा",          mg:[18,10], pts:2 },
      { label:"सबके लिए नियम बनवाऊँगा",      mg:[16,24], pts:2 },
      { label:"उसकी दिक़्क़त पूछूँगा",          mg:[10,6],  pts:2 }
    ] },
  { id:"q389", type:"story", band:[2,3], layer:2, set:5, img:"brick_wall",
    text:"दुकान के आगे की नाली टूट गई है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद मरम्मत कर दूँगा",              mg:[3,4],   pts:2 },
      { label:"पंचायत में अर्ज़ी दूँगा",              mg:[17,16], pts:2 },
      { label:"दुकानदारों से चंदा जोड़ूँगा",          mg:[10,23], pts:2 },
      { label:"ग्राहकों के लिए रास्ता बनाऊँगा",      mg:[10,24], pts:2 }
    ] },
  { id:"q390", type:"story", band:[2,3], layer:2, set:5, img:"phone_dead",
    text:"अनजान नंबर से इनाम-लालच वाला call आया। तुम क्या करोगे?",
    opts:[
      { label:"तुरंत काट दूँगा",                  mg:[24],    pts:2 },
      { label:"शिकायत दर्ज कराऊँगा",             mg:[16,17], pts:2 },
      { label:"घर में सबको सिखाऊँगा",            mg:[11,24], pts:2 },
      { label:"bank-app के ताले जाँचूँगा",         mg:[23,7],  pts:2 }
    ] },
  { id:"q391", type:"story", band:[2,3], layer:2, set:5, img:"seed_sow",
    text:"बारिश आने वाली है, फ़सल भीगने का डर है। तुम क्या करोगे?",
    opts:[
      { label:"तिरपाल का इंतज़ाम",           mg:[24,1], pts:2 },
      { label:"कटाई की टोली जुटाऊँगा",       mg:[10,1], pts:2 },
      { label:"भंडारण की जगह देखूँगा",       mg:[8,1],  pts:2 },
      { label:"बीमा के कागज़ जाँचूँगा",        mg:[16,23], pts:2 }
    ] },
  { id:"q392", type:"story", band:[2,3], layer:2, set:5, img:"ride_machine",
    text:"मेले का झूला बीच में ख़राब हो गया। तुम क्या करोगे?",
    opts:[
      { label:"सवारियों को सुरक्षित उतारूँगा",   mg:[24],    pts:2 },
      { label:"मिस्त्री से जाँच कराऊँगा",         mg:[3,24],  pts:2 },
      { label:"टिकट के पैसे लौटाऊँगा",          mg:[23,16], pts:2 },
      { label:"भीड़ को शांत सँभालूँगा",           mg:[10,24], pts:2 }
    ] },
  { id:"q393", type:"story", band:[2,3], layer:2, set:5, img:"travel_road",
    text:"विदेश से काम का न्योता आया है। तुम पहले क्या करोगे?",
    opts:[
      { label:"कागज़-नियम की जानकारी",         mg:[16,14], pts:2 },
      { label:"भाषा की तैयारी",                mg:[14,11], pts:2 },
      { label:"घर से सलाह करूँगा",             mg:[10],    pts:2 },
      { label:"rate-ख़र्च का हिसाब लगाऊँगा",     mg:[23,18], pts:2 }
    ] },
  { id:"q394", type:"story", band:[2,3], layer:2, set:5, img:"pani_khoj",
    text:"गाँव का पुराना कुआँ बंद पड़ा है। तुम क्या करोगे?",
    opts:[
      { label:"सफ़ाई की टोली बनाऊँगा",       mg:[10,2],  pts:2 },
      { label:"पानी की जाँच कराऊँगा",         mg:[13,2],  pts:2 },
      { label:"पंचायत से बात करूँगा",         mg:[17],    pts:2 },
      { label:"वर्षा-जल जोड़ने की योजना",      mg:[20,2],  pts:2 }
    ] },
  { id:"q395", type:"story", band:[2,3], layer:2, set:5, img:"school_stall",
    text:"हुनर-दिवस पर तुम्हें stall मिला है। तुम क्या करोगे?",
    opts:[
      { label:"अपना हुनर करके दिखाऊँगा",       mg:[3,12],  pts:2 },
      { label:"बच्चों से हाथ आज़माने दूँगा",       mg:[11,10], pts:2 },
      { label:"इस काम के मौक़े बताऊँगा",        mg:[9,11],  pts:2 },
      { label:"फ़ोटो-रिकॉर्ड बनाऊँगा",           mg:[18,12], pts:2 }
    ] },
  { id:"q396", type:"story", band:[2,3], layer:2, set:5, img:"bulb_fix",
    text:"गली का बल्ब महीनों से बंद है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद बदल दूँगा",                   mg:[2,3],   pts:2 },
      { label:"दफ़्तर में शिकायत करूँगा",          mg:[17],    pts:2 },
      { label:"सोलर-light का चंदा जोड़ूँगा",       mg:[2,15],  pts:2 },
      { label:"रात की सावधानी सबको बताऊँगा",     mg:[24,11], pts:2 }
    ] },
  { id:"q397", type:"story", band:[2,3], layer:2, set:5, img:"judge_friends",
    text:"दोस्त नक़ल करके पास होना चाहता है। तुम क्या करोगे?",
    opts:[
      { label:"साफ़ मना करूँगा — यह ग़लत है",   mg:[16],    pts:2 },
      { label:"साथ बैठकर पढ़ाई कराऊँगा",        mg:[11,10], pts:2 },
      { label:"उसके डर की जड़ पूछूँगा",          mg:[10,6],  pts:2 },
      { label:"मेहनत की राह समझाऊँगा",         mg:[11,16], pts:2 }
    ] },
  { id:"q398", type:"story", band:[2,3], layer:2, set:5, img:"write_story",
    text:"गाँव में नई library खुली है। तुम क्या करोगे?",
    opts:[
      { label:"रोज़ जाकर पढ़ूँगा",              mg:[11],    pts:2 },
      { label:"अच्छी किताबें सुझाऊँगा",         mg:[11,18], pts:2 },
      { label:"बच्चों को साथ ले जाऊँगा",        mg:[10,11], pts:2 },
      { label:"हुनर-कोना बनवाऊँगा",            mg:[15,11], pts:2 }
    ] },
  { id:"q399", type:"story", band:[2,3], layer:2, set:5, img:"mela_gate",
    text:"पास के क़स्बे में रोज़गार-मेला लगा है। तुम क्या करोगे?",
    opts:[
      { label:"अपने कागज़ तैयार करूँगा",         mg:[18,17], pts:2 },
      { label:"हुनर-प्रमाण साथ रखूँगा",          mg:[11,18], pts:2 },
      { label:"दोस्तों को भी ख़बर करूँगा",        mg:[10],    pts:2 },
      { label:"कंपनी-सूची पहले पढ़ूँगा",          mg:[18,9],  pts:2 }
    ] },

  /* ═══════ खेप-7 (set:6 — उद्यम-पहचान परत 101: एक प्रश्न = एक धंधा) ═══════ */

  { id:"q400", type:"scale", band:[1,2,3], layer:2, set:6, img:"hen_farm",
    text:"मुर्गी के चूज़ों की देखभाल करना — कैसा लगता है?", mg:[1] },
  { id:"q401", type:"scale", band:[1,2,3], layer:2, set:6, img:"seed_sow",
    text:"मशरूम जैसी नई खेती आज़माना — कैसा लगता है?", mg:[1,15] },
  { id:"q402", type:"scale", band:[1,2,3], layer:2, set:6, img:"flower_sell",
    text:"फूल उगाकर माला-गजरा बेचना — कैसा लगता है?", mg:[1,9] },
  { id:"q403", type:"scale", band:[1,2,3], layer:2, set:6, img:"animal_love",
    text:"बकरी-पालन से कमाई की योजना बनाना — कैसा लगता है?", mg:[1,23] },
  { id:"q404", type:"scale", band:[1,2,3], layer:2, set:6, img:"cook_pot",
    text:"गुड़ बनाने की भट्ठी का काम — कैसा लगता है?", mg:[1,13] },
  { id:"q405", type:"scale", band:[1,2,3], layer:2, set:6, img:"sewing_machine",
    text:"सिलाई-मशीन की मरम्मत का हुनर सीखना — कैसा लगता है?", mg:[3,5] },
  { id:"q406", type:"scale", band:[1,2,3], layer:2, set:6, img:"shoe_stitch",
    text:"जूता-चप्पल बनाना और सुधारना — कैसा लगता है?", mg:[5,3] },
  { id:"q407", type:"scale", band:[1,2,3], layer:2, set:6, img:"tamatar_tokri",
    text:"बाँस की टोकरी-डलिया बुनना — कैसा लगता है?", mg:[12,1] },
  { id:"q408", type:"scale", band:[1,2,3], layer:2, set:6, img:"soap_make",
    text:"अगरबत्ती-मोमबत्ती बनाना — कैसा लगता है?", mg:[13,12] },
  { id:"q409", type:"scale", band:[1,2,3], layer:2, set:6, img:"pickle_jar",
    text:"पापड़-बड़ी-अचार का घर से धंधा — कैसा लगता है?", mg:[1,13] },
  { id:"q410", type:"scale", band:[1,2,3], layer:2, set:6, img:"sweet_make",
    text:"मिठाई-नमकीन की भट्ठी का काम — कैसा लगता है?", mg:[10,9] },
  { id:"q411", type:"scale", band:[1,2,3], layer:2, set:6, img:"cycle_fix",
    text:"मोटरसाइकिल-मरम्मत सीखना — कैसा लगता है?", mg:[8,3] },
  { id:"q412", type:"scale", band:[1,2,3], layer:2, set:6, img:"bus_drive",
    text:"e-रिक्शा चलाना और सँभालना — कैसा लगता है?", mg:[8,15] },
  { id:"q413", type:"scale", band:[1,2,3], layer:2, set:6, img:"run_machine",
    text:"AC-fridge की मरम्मत का काम — कैसा लगता है?", mg:[3,2] },
  { id:"q414", type:"scale", band:[1,2,3], layer:2, set:6, img:"camera_click",
    text:"CCTV-camera लगाने का काम — कैसा लगता है?", mg:[24,7] },
  { id:"q415", type:"scale", band:[1,2,3], layer:2, set:6, img:"type_computer",
    text:"computer के हिस्से जोड़कर चालू करना — कैसा लगता है?", mg:[7,3] },
  { id:"q416", type:"scale", band:[1,2,3], layer:2, set:6, img:"mobile_app",
    text:"गाँव-गाँव internet-सेवा पहुँचाना — कैसा लगता है?", mg:[7,15] },
  { id:"q417", type:"scale", band:[1,2,3], layer:2, set:6, img:"camera_click",
    text:"फ़ोटो-studio का काम — कैसा लगता है?", mg:[12,9] },
  { id:"q418", type:"scale", band:[1,2,3], layer:2, set:6, img:"embroidery",
    text:"मेहँदी-श्रृंगार का हुनर — कैसा लगता है?", mg:[12,10] },
  { id:"q419", type:"scale", band:[1,2,3], layer:2, set:6, img:"make_alone",
    text:"नाई-सैलून का हुनर — कैसा लगता है?", mg:[10,12] },
  { id:"q420", type:"scale", band:[1,2,3], layer:2, set:6, img:"pack_weigh",
    text:"धोबी-press की दुकान चलाना — कैसा लगता है?", mg:[10,5] },
  { id:"q421", type:"scale", band:[1,2,3], layer:2, set:6, img:"mela_gate",
    text:"tent-house के सामान का धंधा — कैसा लगता है?", mg:[10,9] },
  { id:"q422", type:"scale", band:[1,2,3], layer:2, set:6, img:"run_machine",
    text:"आटा-चक्की चलाना — कैसा लगता है?", mg:[3,1] },
  { id:"q423", type:"scale", band:[1,2,3], layer:2, set:6, img:"brick_wall",
    text:"ईंट-भट्ठे के काम का प्रबंध — कैसा लगता है?", mg:[4,2] },
  { id:"q424", type:"scale", band:[1,2,3], layer:2, set:6, img:"brick_wall",
    text:"टाइल्स-मार्बल लगाने का काम — कैसा लगता है?", mg:[4] },
  { id:"q425", type:"scale", band:[1,2,3], layer:2, set:6, img:"decoration",
    text:"छत की सजावट का काम — कैसा लगता है?", mg:[4,12] },
  { id:"q426", type:"scale", band:[1,2,3], layer:2, set:6, img:"pani_khoj",
    text:"boring-मशीन का काम — कैसा लगता है?", mg:[2,3] },
  { id:"q427", type:"scale", band:[1,2,3], layer:2, set:6, img:"bulb_fix",
    text:"LED-बल्ब जोड़ने की छोटी इकाई चलाना — कैसा लगता है?", mg:[3,2] },
  { id:"q428", type:"scale", band:[1,2,3], layer:2, set:6, img:"badi_imarat",
    text:"मोबाइल-tower का रखरखाव — कैसा लगता है?", mg:[7,24] },
  { id:"q429", type:"scale", band:[1,2,3], layer:2, set:6, img:"stage_play",
    text:"मेले में जादू-कठपुतली दिखाना — कैसा लगता है?", mg:[12,10] },

  { id:"q430", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot",   label:"पनीर बनाना",        mg:[1,13] },
      { img:"sweet_make", label:"घी-खोया का काम",    mg:[1,10] },
      { img:"shop_sell",  label:"दही-lassi की दुकान", mg:[1,9] },
      { img:"cow_milk",   label:"दूध-जमा केंद्र",      mg:[1,18] }
    ] },
  { id:"q431", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tree_plant",     label:"पौध-नर्सरी",       mg:[1] },
      { img:"tractor_plough", label:"बड़ी सब्ज़ी-खेती",   mg:[1] },
      { img:"tamatar_tokri",  label:"सब्ज़ी का ठेला",    mg:[1,9] },
      { img:"godown_stack",   label:"सब्ज़ी-भंडारण",     mg:[1,8] }
    ] },
  { id:"q432", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tree_plant", label:"आम का बाग़",       mg:[1] },
      { img:"seed_sow",   label:"केले की खेती",     mg:[1] },
      { img:"shop_sell",  label:"juice की दुकान",   mg:[1,10] },
      { img:"pickle_jar", label:"मुरब्बा-जैम बनाना",  mg:[1,13] }
    ] },
  { id:"q433", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough", label:"धान-गेहूँ की खेती",  mg:[1] },
      { img:"run_machine",    label:"दाल-मिल",           mg:[1,3] },
      { img:"cook_pot",       label:"चूड़ा-भूनने का काम",  mg:[1,10] },
      { img:"seed_sow",       label:"बीज-उत्पादन",       mg:[1,15] }
    ] },
  { id:"q434", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"wood_toy",     label:"furniture बनाना",     mg:[3] },
      { img:"bolt_fit",     label:"दरवाज़ा-खिड़की",       mg:[3,4] },
      { img:"toy_open",     label:"लकड़ी के खिलौने",     mg:[3,12] },
      { img:"godown_stack", label:"लकड़ी की दुकान",      mg:[3,9] }
    ] },
  { id:"q435", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"weld_spark", label:"गेट-grill बनाना",     mg:[3] },
      { img:"jugaad_new", label:"खेती के औज़ार",       mg:[3,1] },
      { img:"cook_pot",   label:"लोहे के बर्तन",        mg:[3,9] },
      { img:"bolt_fit",   label:"nut-bolt की इकाई",   mg:[3] }
    ] },
  { id:"q436", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"sewing_machine", label:"readymade की सिलाई",   mg:[5,9] },
      { img:"school_stall",   label:"school-dress के order", mg:[5,9] },
      { img:"embroidery",     label:"परदा-चादर का काम",     mg:[5,12] },
      { img:"soap_make",      label:"रंगाई का काम",          mg:[5,13] }
    ] },
  { id:"q437", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"clay_art",   label:"दीया-मूर्ति बनाना",   mg:[12,21] },
      { img:"tree_plant", label:"गमला-नर्सरी",        mg:[12,1] },
      { img:"brick_wall", label:"ईंट बनाना",          mg:[4,12] },
      { img:"jugaad_new", label:"मिट्टी के बर्तन",      mg:[12,3] }
    ] },
  { id:"q438", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"bus_drive",     label:"auto-taxi चलाना",   mg:[8,10] },
      { img:"godown_stack",  label:"माल-tempo",         mg:[8,9] },
      { img:"count_money",   label:"टिकट-agency",       mg:[8,23] },
      { img:"vehicle_sound", label:"गाड़ी-धुलाई केंद्र",    mg:[8,10] }
    ] },
  { id:"q439", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"food_serve",   label:"tiffin-सेवा",      mg:[10,9] },
      { img:"school_stall", label:"खाने का ठेला",     mg:[10,9] },
      { img:"cook_pot",     label:"ढाबा",             mg:[10] },
      { img:"mela_gate",    label:"catering के order", mg:[10,9] }
    ] },
  { id:"q440", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"teach_kids", label:"coaching चलाना",     mg:[11,9] },
      { img:"shop_sell",  label:"किताब-copy दुकान",   mg:[11,9] },
      { img:"video_edit", label:"online-पाठ बनाना",    mg:[11,18] },
      { img:"food_serve", label:"mess-hostel सेवा",   mg:[11,10] }
    ] },
  { id:"q441", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"med_shop",       label:"दवा-दुकान",           mg:[6,9] },
      { img:"tube_bubble",    label:"जाँच-lab में सहायता",   mg:[6,18] },
      { img:"exercise_coach", label:"मालिश-कसरत सेवा",     mg:[6,10] },
      { img:"shop_sell",      label:"चश्मे की दुकान",        mg:[6,9] }
    ] },
  { id:"q442", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"chitthi_daftar", label:"form-भराई केंद्र",       mg:[7,17] },
      { img:"phone_dead",     label:"mobile-मरम्मत",         mg:[7,3] },
      { img:"camera_click",   label:"photo-print",           mg:[7,12] },
      { img:"mobile_app",     label:"online-बिक्री सहायता",   mg:[7,9] }
    ] },
  { id:"q443", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"make_alone",  label:"सैलून का काम",         mg:[10,12] },
      { img:"decoration",  label:"parlour का काम",       mg:[10,12] },
      { img:"embroidery",  label:"मेहँदी का काम",         mg:[12,10] },
      { img:"shop_sell",   label:"श्रृंगार-सामान दुकान",    mg:[9,10] }
    ] },
  { id:"q444", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"brick_wall",   label:"राजमिस्त्री का ठेका",   mg:[4] },
      { img:"handpump_fix", label:"नल-plumber",         mg:[4,2] },
      { img:"board_wire",   label:"बिजली-मिस्त्री",       mg:[4,2] },
      { img:"paint_toy",    label:"रंगाई का ठेका",       mg:[4,12] }
    ] },
  { id:"q445", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"run_machine",  label:"AC-मरम्मत",         mg:[3,2] },
      { img:"bolt_fit",     label:"fridge-मरम्मत",      mg:[3,2] },
      { img:"jugaad_new",   label:"cooler बनाना",      mg:[3,15] },
      { img:"badi_imarat",  label:"बर्फ़-factory",       mg:[3,9] }
    ] },
  { id:"q446", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"mela_gate",   label:"शादी-decoration",  mg:[10,12] },
      { img:"flower_sell", label:"फूल की दुकान",     mg:[10,1] },
      { img:"shop_sell",   label:"gift की दुकान",    mg:[9,10] },
      { img:"stage_song",  label:"DJ-साउंड सेवा",    mg:[10,12] }
    ] },
  { id:"q447", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"queue_line",   label:"guard-agency",       mg:[24,10] },
      { img:"camera_click", label:"CCTV लगाना",         mg:[24,7] },
      { img:"lock_key",     label:"ताला-चाबी का काम",    mg:[24,3] },
      { img:"aag_bujhana",  label:"आग-यंत्र भरना",       mg:[24,13] }
    ] },
  { id:"q448", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"cycle_fix", label:"puncture की दुकान",  mg:[8,3] },
      { img:"bolt_fit",  label:"spare-parts दुकान",  mg:[8,9] },
      { img:"bus_drive", label:"driving सिखाना",     mg:[8,11] },
      { img:"note_100",  label:"गाड़ी ख़रीद-बेच",      mg:[8,9] }
    ] },
  { id:"q449", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough",  label:"tractor किराये पर",   mg:[1,9] },
      { img:"run_machine",     label:"thresher का काम",     mg:[1,3] },
      { img:"pipe_irrigation", label:"pump-मरम्मत",         mg:[1,3] },
      { img:"patang",          label:"drone-छिड़काव",       mg:[1,19] }
    ] },
  { id:"q450", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"fish_pond",    label:"मछली-बीज का काम",   mg:[1,15] },
      { img:"tank_measure", label:"तालाब का पट्टा",      mg:[1,16] },
      { img:"shoe_stitch",  label:"जाल की बिक्री",       mg:[1,5] },
      { img:"pack_weigh",   label:"सूखी मछली का धंधा",  mg:[1,9] }
    ] },
  { id:"q451", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"hen_farm",     label:"अंडा-farm",       mg:[1,9] },
      { img:"animal_love",  label:"चूज़ा-केंद्र",      mg:[1] },
      { img:"godown_stack", label:"दाना-दुकान",      mg:[1,9] },
      { img:"badi_imarat",  label:"broiler-पालन",    mg:[1,3] }
    ] },
  { id:"q452", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"shop_sell",   label:"मिठाई की दुकान",   mg:[10,9] },
      { img:"cook_pot",    label:"cake-bakery",      mg:[10,15] },
      { img:"run_machine", label:"toffee की इकाई",   mg:[10,3] },
      { img:"sweet_make",  label:"गुड़-भट्ठी",         mg:[10,1] }
    ] },
  { id:"q453", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"light_string", label:"DJ-साउंड",       mg:[12,2] },
      { img:"stage_song",   label:"band-बाजा",      mg:[12,10] },
      { img:"stage_play",   label:"मंच-कलाकार",     mg:[12] },
      { img:"mela_gate",    label:"event-आयोजक",   mg:[10,12] }
    ] },
  { id:"q454", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"sewing_machine", label:"ladies-टेलर",      mg:[5,9] },
      { img:"tank_measure",   label:"gents-टेलर",       mg:[5,9] },
      { img:"embroidery",     label:"कढ़ाई-इकाई",       mg:[5,12] },
      { img:"school_stall",   label:"uniform के order",  mg:[5,18] }
    ] },
  { id:"q455", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"school_stall", label:"चाय की दुकान",      mg:[10,9] },
      { img:"cook_pot",     label:"नाश्ते की दुकान",    mg:[10] },
      { img:"badi_imarat",  label:"रुकने की जगह",      mg:[10,9] },
      { img:"food_serve",   label:"highway-ढाबा",      mg:[10,8] }
    ] },
  { id:"q456", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"paint_toy",      label:"flex-banner छापना",  mg:[12,9] },
      { img:"chitthi_daftar", label:"शादी-card बनाना",    mg:[12,9] },
      { img:"write_story",    label:"register-बनाना",     mg:[9,18] },
      { img:"soap_make",      label:"कपड़े पर छपाई",      mg:[12,5] }
    ] },
  { id:"q457", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"solar_panel", label:"solar लगाना",        mg:[2,15] },
      { img:"bolt_fit",    label:"battery-मरम्मत",      mg:[2,3] },
      { img:"board_wire",  label:"inverter का काम",    mg:[2,3] },
      { img:"bus_drive",   label:"e-गाड़ी charging",    mg:[2,15] }
    ] },
  { id:"q458", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"type_computer", label:"photocopy-केंद्र",     mg:[7,9] },
      { img:"pack_weigh",    label:"lamination का काम",   mg:[9,3] },
      { img:"shoe_stitch",   label:"book-binding",        mg:[9,3] },
      { img:"shop_sell",     label:"stationery-दुकान",     mg:[9,11] }
    ] },
  { id:"q459", type:"pick", band:[1,2,3], layer:2, set:6,
    text:"इनमें से कौन-सा धंधा तुम सबसे पहले चुनोगे? और कौन-सा सबसे कम?",
    opts:[
      { img:"brick_wall", label:"विदेश में निर्माण-काम",   mg:[14,4] },
      { img:"bus_drive",  label:"विदेश में driver-काम",   mg:[14,8] },
      { img:"food_serve", label:"विदेश में hotel-काम",    mg:[14,10] },
      { img:"learn_lang", label:"विदेश जाकर पढ़ाई",      mg:[14,11] }
    ] },

  { id:"q460", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा धंधा क्या — गाय-भैंस की डेयरी, या मुर्गी-farm?",
    opts:[ { img:"cow_milk", label:"गाय-भैंस की डेयरी", mg:[1] },
           { img:"hen_farm", label:"मुर्गी-farm", mg:[1] } ] },
  { id:"q461", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — फल-बाग़ (धीमा पर बड़ा), या सब्ज़ी (तेज़ पर छोटा)?",
    opts:[ { img:"tree_plant", label:"फल-बाग़ का धंधा", mg:[1] },
           { img:"tamatar_tokri", label:"सब्ज़ी का धंधा", mg:[1] } ] },
  { id:"q462", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — किराये की पक्की दुकान, या अपना घूमता ठेला?",
    opts:[ { img:"shop_sell", label:"किराये की दुकान", mg:[9] },
           { img:"school_stall", label:"अपना ठेला", mg:[9] } ] },
  { id:"q463", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — मशीन से बना माल, या हाथ से बना माल?",
    opts:[ { img:"run_machine", label:"मशीन से माल", mg:[3] },
           { img:"jugaad_new", label:"हाथ से माल", mg:[3,12] } ] },
  { id:"q464", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — घर से tiffin-सेवा, या बाज़ार में खाने का ठेला?",
    opts:[ { img:"food_serve", label:"घर से tiffin", mg:[10,9] },
           { img:"mandi_taul", label:"बाज़ार में ठेला", mg:[9,10] } ] },
  { id:"q465", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"बड़ा हुनर क्या — चीज़ मरम्मत करने का, या चीज़ बेचने का?",
    opts:[ { img:"cycle_fix", label:"मरम्मत का हुनर", mg:[3,10] },
           { img:"shop_sell", label:"बेचने का हुनर", mg:[9] } ] },
  { id:"q466", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — सीमेंट-ईंट का काम, या लकड़ी-रंग का काम?",
    opts:[ { img:"brick_wall", label:"सीमेंट-ईंट का काम", mg:[4] },
           { img:"wood_toy", label:"लकड़ी-रंग का काम", mg:[3,12] } ] },
  { id:"q467", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — शहर में मज़दूरी, या गाँव में अपनी खेती?",
    opts:[ { img:"travel_road", label:"शहर में मज़दूरी", mg:[3,8] },
           { img:"seed_sow", label:"गाँव में अपनी खेती", mg:[1] } ] },
  { id:"q468", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — मोबाइल सुधारना, या मोबाइल बेचना?",
    opts:[ { img:"phone_dead", label:"मोबाइल सुधारना", mg:[3,7] },
           { img:"mobile_app", label:"मोबाइल बेचना", mg:[9,7] } ] },
  { id:"q469", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — order की सिलाई, या readymade बेचना?",
    opts:[ { img:"sewing_machine", label:"order की सिलाई", mg:[5] },
           { img:"shop_sell", label:"readymade बेचना", mg:[5,9] } ] },
  { id:"q470", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा मज़ा किसमें — मीठा बनाने में, या नमकीन बनाने में?",
    opts:[ { img:"sweet_make", label:"मीठा बनाना", mg:[10] },
           { img:"cook_pot", label:"नमकीन बनाना", mg:[10] } ] },
  { id:"q471", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छी क्या — सुबह की मंडी, या शाम की दुकान?",
    opts:[ { img:"mandi_taul", label:"सुबह की मंडी", mg:[9,1] },
           { img:"school_stall", label:"शाम की दुकान", mg:[9] } ] },
  { id:"q472", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — मशीन किराये पर देना, या ख़ुद चलाना?",
    opts:[ { img:"tractor_plough", label:"मशीन किराये पर देना", mg:[9,1] },
           { img:"run_machine", label:"मशीन ख़ुद चलाना", mg:[3,1] } ] },
  { id:"q473", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — जानवर पालना, या पौधे उगाना?",
    opts:[ { img:"animal_love", label:"जानवर पालना", mg:[1] },
           { img:"tree_plant", label:"पौधे उगाना", mg:[1] } ] },
  { id:"q474", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — पक्का ठेका, या रोज़ की दिहाड़ी?",
    opts:[ { img:"hisab_copy", label:"पक्का ठेका", mg:[9,16] },
           { img:"godown_stack", label:"रोज़ की दिहाड़ी", mg:[23,3] } ] },
  { id:"q475", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — एक बड़ा order, या सौ छोटे ग्राहक?",
    opts:[ { img:"godown_stack", label:"एक बड़ा order", mg:[9,8] },
           { img:"mela_gate", label:"सौ छोटे ग्राहक", mg:[9,10] } ] },
  { id:"q476", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छी क्या — गाँव की दुकान, या online-दुकान?",
    opts:[ { img:"school_stall", label:"गाँव की दुकान", mg:[9] },
           { img:"mobile_app", label:"online-दुकान", mg:[9,7] } ] },
  { id:"q477", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — पानी का धंधा, या बिजली का धंधा?",
    opts:[ { img:"handpump_fix", label:"पानी का धंधा", mg:[2] },
           { img:"solar_panel", label:"बिजली का धंधा", mg:[2,15] } ] },
  { id:"q478", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — सजावट का काम, या रखरखाव का काम?",
    opts:[ { img:"decoration", label:"सजावट का काम", mg:[12,10] },
           { img:"bolt_fit", label:"रखरखाव का काम", mg:[3,24] } ] },
  { id:"q479", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — उपज सीधे बेचना, या उपज से चीज़ बनाकर बेचना?",
    opts:[ { img:"mandi_taul", label:"उपज सीधे बेचना", mg:[1,9] },
           { img:"pickle_jar", label:"चीज़ बनाकर बेचना", mg:[13,9] } ] },
  { id:"q480", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — नई चीज़ बेचना, या पुरानी चीज़ों की ख़रीद-बेच?",
    opts:[ { img:"pack_weigh", label:"नई चीज़ बेचना", mg:[9] },
           { img:"note_100", label:"पुरानी ख़रीद-बेच", mg:[9,18] } ] },
  { id:"q481", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — tent-कुर्सी का किराया-धंधा, या ताज़े फूल-माला का धंधा?",
    opts:[ { img:"mela_gate", label:"tent-कुर्सी किराया", mg:[9,10] },
           { img:"flower_sell", label:"ताज़े फूल-माला", mg:[1,9] } ] },
  { id:"q482", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — बच्चों की coaching, या बड़ों का हुनर-केंद्र?",
    opts:[ { img:"teach_kids", label:"बच्चों की coaching", mg:[11,9] },
           { img:"jugaad_new", label:"बड़ों का हुनर-केंद्र", mg:[11,3] } ] },
  { id:"q483", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा भाता क्या — दवा-दुकान का अनुशासन, या किराने की भाग-दौड़?",
    opts:[ { img:"med_shop", label:"दवा-दुकान का अनुशासन", mg:[6,9] },
           { img:"shop_sell", label:"किराने की भाग-दौड़", mg:[9,10] } ] },
  { id:"q484", type:"pair", band:[1,2,3], layer:2, set:6,
    text:"ज़्यादा अच्छा क्या — अपने नाम का माल बनाना, या दूसरों का माल बेचना?",
    opts:[ { img:"idea_machine", label:"अपने नाम का माल", mg:[9,15] },
           { img:"godown_stack", label:"दूसरों का माल बेचना", mg:[9] } ] },

  { id:"q485", type:"story", band:[1,2,3], layer:2, set:6, img:"travel_road",
    text:"गाँव में नई सड़क बनी, शहर पास हो गया। कौन-सा धंधा सोचोगे?",
    opts:[
      { label:"सवारी-गाड़ी चलाऊँगा",        mg:[8,10], pts:2 },
      { label:"माल-ढुलाई का काम",          mg:[8,9],  pts:2 },
      { label:"सड़क-किनारे दुकान",          mg:[9,15], pts:2 },
      { label:"गाड़ी-मरम्मत की दुकान",       mg:[3,8],  pts:2 }
    ] },
  { id:"q486", type:"story", band:[1,2,3], layer:2, set:6, img:"bulb_fix",
    text:"गाँव में बिजली अब पूरे समय रहती है। कौन-सा धंधा सोचोगे?",
    opts:[
      { label:"ठंडे सामान की दुकान",       mg:[9,3],  pts:2 },
      { label:"वेल्डिंग की इकाई",           mg:[3,15], pts:2 },
      { label:"आटा-चक्की",                mg:[3,1],  pts:2 },
      { label:"सिलाई-केंद्र",               mg:[5,3],  pts:2 }
    ] },
  { id:"q487", type:"story", band:[1,2,3], layer:2, set:6, img:"school_stall",
    text:"पास में नया college खुला है। कौन-सा धंधा सोचोगे?",
    opts:[
      { label:"mess-tiffin की सेवा",       mg:[10,9], pts:2 },
      { label:"photocopy-केंद्र",           mg:[7,9],  pts:2 },
      { label:"किराये के कमरे",             mg:[9,4],  pts:2 },
      { label:"चाय-नाश्ते की दुकान",         mg:[10,9], pts:2 }
    ] },
  { id:"q488", type:"story", band:[1,2,3], layer:2, set:6, img:"mela_gate",
    text:"मेले का ठेका तुम्हारी टोली को मिला। तुम क्या सँभालोगे?",
    opts:[
      { label:"खाने का स्टॉल",           mg:[10,9],  pts:2 },
      { label:"झूले का इंतज़ाम",          mg:[10,3],  pts:2 },
      { label:"खिलौने की बिक्री",         mg:[9,12],  pts:2 },
      { label:"parking का इंतज़ाम",       mg:[24,8],  pts:2 }
    ] },
  { id:"q489", type:"story", band:[1,2,3], layer:2, set:6, img:"note_100",
    text:"तुम्हारे पास 10 हज़ार रुपये की पूँजी है। किसमें लगाओगे?",
    opts:[
      { label:"मुर्गी के चूज़ों में",           mg:[1,23], pts:2 },
      { label:"सब्ज़ी के ठेले में",            mg:[1,9],  pts:2 },
      { label:"recharge-छोटे सामान में",     mg:[7,9],  pts:2 },
      { label:"सिलाई-मशीन में",            mg:[5,23], pts:2 }
    ] },
  { id:"q490", type:"story", band:[1,2,3], layer:2, set:6, img:"sewing_machine",
    text:"school-dress का बड़ा order मिला है। पहले क्या सँभालोगे?",
    opts:[
      { label:"कपड़े की ख़रीद",            mg:[9,5],   pts:2 },
      { label:"सिलाई की टोली",           mg:[10,5],  pts:2 },
      { label:"नाप का रिकॉर्ड",            mg:[18,5],  pts:2 },
      { label:"समय की योजना",            mg:[18,24], pts:2 }
    ] },
  { id:"q491", type:"story", band:[1,2,3], layer:2, set:6, img:"flood_road",
    text:"बाढ़ के बाद गाँव में बहुत काम है। तुम क्या सँभालोगे?",
    opts:[
      { label:"मरम्मत-मिस्त्री का काम",      mg:[4,3],   pts:2 },
      { label:"दवा-राहत में सहायता",       mg:[6,10],  pts:2 },
      { label:"नाव-सेवा",                 mg:[8,24],  pts:2 },
      { label:"पानी की जाँच",              mg:[13,20], pts:2 }
    ] },
  { id:"q492", type:"story", band:[1,2,3], layer:2, set:6, img:"puja_thali",
    text:"त्योहार का मौसम आ रहा है। कौन-सा धंधा तैयार करोगे?",
    opts:[
      { label:"दीया-मूर्ति बनाऊँगा",         mg:[12,21], pts:2 },
      { label:"मिठाई का काम",             mg:[10,9],  pts:2 },
      { label:"सजावट के order लूँगा",      mg:[12,10], pts:2 },
      { label:"कपड़े की बिक्री",             mg:[5,9],   pts:2 }
    ] },
  { id:"q493", type:"story", band:[1,2,3], layer:2, set:6, img:"solar_panel",
    text:"गाँव के 20 घर सोलर लगवाना चाहते हैं। तुम क्या करोगे?",
    opts:[
      { label:"लगाने का हुनर सीखूँगा",       mg:[2,11],  pts:2 },
      { label:"dealer से सम्पर्क करूँगा",     mg:[9,10],  pts:2 },
      { label:"सबका हिसाब सँभालूँगा",       mg:[23,18], pts:2 },
      { label:"रखरखाव का ठेका लूँगा",       mg:[3,9],   pts:2 }
    ] },
  { id:"q494", type:"story", band:[1,2,3], layer:2, set:6, img:"mandi_taul",
    text:"मंडी में बिचौलिया ज़्यादा काट रहा है। तुम क्या करोगे?",
    opts:[
      { label:"सीधे भाव पता करूँगा",         mg:[18,9],  pts:2 },
      { label:"किसान-टोली बनाऊँगा",         mg:[10,1],  pts:2 },
      { label:"कागज़-नियम समझूँगा",         mg:[16,17], pts:2 },
      { label:"online-भाव देखना सीखूँगा",    mg:[18,7],  pts:2 }
    ] },
  { id:"q495", type:"story", band:[1,2,3], layer:2, set:6, img:"sewing_machine",
    text:"शहर का दर्ज़ी गाँव में सिखाने आया है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद हुनर सीखूँगा",             mg:[11,5],  pts:2 },
      { label:"सिखाने की जगह दिलवाऊँगा",     mg:[10,17], pts:2 },
      { label:"बच्चों को जोड़ूँगा",             mg:[11,10], pts:2 },
      { label:"औज़ार-दुकान का मौक़ा सोचूँगा",   mg:[9,15],  pts:2 }
    ] },
  { id:"q496", type:"story", band:[1,2,3], layer:2, set:6, img:"tractor_plough",
    text:"पुराना ट्रैक्टर सस्ते में मिल रहा है। तुम पहले क्या करोगे?",
    opts:[
      { label:"जानकार से जाँच कराऊँगा",       mg:[18,3],  pts:2 },
      { label:"मरम्मत-ख़र्च जोड़ूँगा",           mg:[23,3],  pts:2 },
      { label:"किराये की कमाई आँकूँगा",       mg:[9,23],  pts:2 },
      { label:"कागज़ पूरे देखूँगा",             mg:[16,18], pts:2 }
    ] },
  { id:"q497", type:"story", band:[1,2,3], layer:2, set:6, img:"badi_imarat",
    text:"गाँव में शादी-घर नहीं है। तुम क्या करोगे?",
    opts:[
      { label:"सही जगह सोचूँगा",                    mg:[4,9],   pts:2 },
      { label:"लागत का हिसाब जोड़ूँगा",              mg:[23,18], pts:2 },
      { label:"पहले किराये का सामान शुरू करूँगा",     mg:[9,15],  pts:2 },
      { label:"बड़ों से सलाह करूँगा",                mg:[10,17], pts:2 }
    ] },
  { id:"q498", type:"story", band:[1,2,3], layer:2, set:6, img:"phone_dead",
    text:"मोबाइल-मरम्मत सीख ली, पर ग्राहक कम आते हैं। तुम क्या करोगे?",
    opts:[
      { label:"दाम का साफ़ board लगाऊँगा",      mg:[9,18], pts:2 },
      { label:"घर-घर प्रचार करूँगा",             mg:[9,10], pts:2 },
      { label:"recharge-सामान भी रखूँगा",       mg:[9,7],  pts:2 },
      { label:"बड़ी दुकान से जुड़ूँगा",            mg:[9,10], pts:2 }
    ] },
  { id:"q499", type:"story", band:[1,2,3], layer:2, set:6, img:"sick_care",
    text:"गाँव में जाँच-शिविर लगवाना है। तुम क्या सँभालोगे?",
    opts:[
      { label:"डॉक्टर से सम्पर्क",           mg:[6,10],  pts:2 },
      { label:"जगह का इंतज़ाम",            mg:[10,24], pts:2 },
      { label:"घर-घर सूचना",              mg:[10,11], pts:2 },
      { label:"रिकॉर्ड की सूची",             mg:[18,6],  pts:2 }
    ] },
  { id:"q500", type:"story", band:[1,2,3], layer:2, set:6, img:"world_map",
    text:"गाँव के 5 लड़के विदेश जाना चाहते हैं। तुम क्या करोगे?",
    opts:[
      { label:"सही agent की जाँच सिखाऊँगा",    mg:[16,24], pts:2 },
      { label:"कागज़-प्रक्रिया समझूँगा",         mg:[17,14], pts:2 },
      { label:"हुनर-प्रमाण बनवाऊँगा",          mg:[11,18], pts:2 },
      { label:"ख़र्च का हिसाब जोड़ूँगा",          mg:[23,18], pts:2 }
    ] },

  /* ═══════ खेप-8 (set:7 — udy-ठप्पा युग: हर प्रश्न पर उद्यम-संख्या 1-950) ═══════
     udy = उस प्रश्न से जुड़े उद्यमों की संख्या (udyam_data.js की n-संख्या)।
     लक्ष्य: 950/950 उद्यम मशीन-गिनती से ढकना — कोई धंधा छूटे नहीं। */

  { id:"q501", type:"scale", band:[1,2,3], layer:2, set:7, udy:[63], img:"pack_weigh",
    text:"पशु-दाना बनाने की इकाई चलाना — कैसा लगता है?", mg:[1,3] },
  { id:"q502", type:"scale", band:[1,2,3], layer:2, set:7, udy:[50,260], img:"compost",
    text:"केंचुआ-खाद बनाकर बेचना — कैसा लगता है?", mg:[1,20] },
  { id:"q503", type:"scale", band:[1,2,3], layer:2, set:7, udy:[64,67], img:"tree_plant",
    text:"नर्सरी से कलम-पौधे तैयार करके बेचना — कैसा लगता है?", mg:[1,9] },
  { id:"q504", type:"scale", band:[1,2,3], layer:2, set:7, udy:[23,312], img:"hen_farm",
    text:"अंडों की घर-पहुँच सेवा चलाना — कैसा लगता है?", mg:[1,10] },
  { id:"q505", type:"scale", band:[1,2,3], layer:2, set:7, udy:[21,53], img:"cow_milk",
    text:"दूध-जाँच मशीन चलाना — कैसा लगता है?", mg:[1,18] },
  { id:"q506", type:"scale", band:[1,2,3], layer:2, set:7, udy:[566,79], img:"brick_wall",
    text:"पत्थर-गिट्टी की मशीन का काम — कैसा लगता है?", mg:[2,3] },
  { id:"q507", type:"scale", band:[1,2,3], layer:2, set:7, udy:[103,104], img:"tank_measure",
    text:"RO-पानी की इकाई चलाना — कैसा लगता है?", mg:[2,9] },
  { id:"q508", type:"scale", band:[1,2,3], layer:2, set:7, udy:[97], img:"compost",
    text:"गोबर-गैस बनाकर घर-चूल्हा चलाना — कैसा लगता है?", mg:[2,20] },
  { id:"q509", type:"scale", band:[1,2,3], layer:2, set:7, udy:[366], img:"note_100",
    text:"petrol-pump पर काम सँभालना — कैसा लगता है?", mg:[9,2] },
  { id:"q510", type:"scale", band:[1,2,3], layer:2, set:7, udy:[62], img:"run_machine",
    text:"मसाला-पिसाई की इकाई चलाना — कैसा लगता है?", mg:[1,3] },
  { id:"q511", type:"scale", band:[1,2,3], layer:2, set:7, udy:[214,220], img:"shoe_stitch",
    text:"चप्पल बनाने की छोटी मशीन लगाना — कैसा लगता है?", mg:[5,3] },
  { id:"q512", type:"scale", band:[1,2,3], layer:2, set:7, udy:[161], img:"bolt_fit",
    text:"steel-बर्तनों की पॉलिश का काम — कैसा लगता है?", mg:[3] },
  { id:"q513", type:"scale", band:[1,2,3], layer:2, set:7, udy:[119,114], img:"weld_spark",
    text:"gate-window की नाप लेकर fitting करना — कैसा लगता है?", mg:[3,4] },
  { id:"q514", type:"scale", band:[1,2,3], layer:2, set:7, udy:[180,569], img:"pipe_irrigation",
    text:"बोरवेल के बाद पाइप-सेटिंग का काम — कैसा लगता है?", mg:[4,2] },
  { id:"q515", type:"scale", band:[1,2,3], layer:2, set:7, udy:[567,535], img:"paint_toy",
    text:"पुताई से पहले दीवार-भराई का काम — कैसा लगता है?", mg:[4,13] },
  { id:"q516", type:"scale", band:[1,2,3], layer:2, set:7, udy:[203,215], img:"sewing_machine",
    text:"school-bag सिलने की इकाई चलाना — कैसा लगता है?", mg:[5,9] },
  { id:"q517", type:"scale", band:[1,2,3], layer:2, set:7, udy:[201,199], img:"embroidery",
    text:"मच्छरदानी के order लेना — कैसा लगता है?", mg:[5] },
  { id:"q518", type:"scale", band:[1,2,3], layer:2, set:7, udy:[199,195], img:"embroidery",
    text:"दस्ताने-टोपी की बुनाई का काम — कैसा लगता है?", mg:[5] },
  { id:"q519", type:"scale", band:[1,2,3], layer:2, set:7, udy:[250], img:"boy_bandage",
    text:"मरीज़ को घर पर पट्टी-सेवा देना — कैसा लगता है?", mg:[6,10] },
  { id:"q520", type:"scale", band:[1,2,3], layer:2, set:7, udy:[247], img:"sick_care",
    text:"आँख-जाँच शिविर में सहायता करना — कैसा लगता है?", mg:[6,10] },
  { id:"q521", type:"scale", band:[1,2,3], layer:2, set:7, udy:[463,464], img:"type_computer",
    text:"computer-कक्षा में सहायक बनना — कैसा लगता है?", mg:[11,7] },
  { id:"q522", type:"scale", band:[1,2,3], layer:2, set:7, udy:[295,362], img:"mobile_app",
    text:"गाँव की दुकान को online जोड़ना — कैसा लगता है?", mg:[7,9] },
  { id:"q523", type:"scale", band:[1,2,3], layer:2, set:7, udy:[309], img:"bus_drive",
    text:"bus-अड्डे पर पूछताछ-सेवा सँभालना — कैसा लगता है?", mg:[8,10] },
  { id:"q524", type:"scale", band:[1,2,3], layer:2, set:7, udy:[358,312], img:"news_boy",
    text:"courier-parcel घर-घर पहुँचाना — कैसा लगता है?", mg:[8,9] },
  { id:"q525", type:"scale", band:[1,2,3], layer:2, set:7, udy:[370], img:"mandi_taul",
    text:"मंडी की बोली समझना — कैसा लगता है?", mg:[9,18] },
  { id:"q526", type:"scale", band:[1,2,3], layer:2, set:7, udy:[764], img:"show_way",
    text:"फेरी लगाकर बर्तन-कपड़ा बेचना — कैसा लगता है?", mg:[9,10] },
  { id:"q527", type:"scale", band:[1,2,3], layer:2, set:7, udy:[760], img:"decoration",
    text:"बच्चों की party का इंतज़ाम करना — कैसा लगता है?", mg:[10,12] },
  { id:"q528", type:"scale", band:[1,2,3], layer:2, set:7, udy:[862,859], img:"temple_seva",
    text:"बुज़ुर्गों की तीर्थ-यात्रा में साथ देना — कैसा लगता है?", mg:[21,10] },
  { id:"q529", type:"scale", band:[1,2,3], layer:2, set:7, udy:[470,439], img:"exercise_coach",
    text:"बच्चों की खेल-कक्षा चलाना — कैसा लगता है?", mg:[22,11] },
  { id:"q530", type:"scale", band:[1,2,3], layer:2, set:7, udy:[502], img:"write_story",
    text:"सुंदर लिखाई से card लिखने का काम — कैसा लगता है?", mg:[12] },
  { id:"q531", type:"scale", band:[1,2,3], layer:2, set:7, udy:[466,469], img:"video_edit",
    text:"रंगोली-मेहँदी की online-कक्षा चलाना — कैसा लगता है?", mg:[12,7] },
  { id:"q532", type:"scale", band:[1,2,3], layer:2, set:7, udy:[542,547,501], img:"soap_make",
    text:"साबुन-फिनाइल घर पर बनाकर बेचना — कैसा लगता है?", mg:[13,9] },
  { id:"q533", type:"scale", band:[1,2,3], layer:2, set:7, udy:[534,259], img:"herb_leaf",
    text:"खेत-दवा की सही जानकारी किसानों को देना — कैसा लगता है?", mg:[13,1] },
  { id:"q534", type:"scale", band:[1,2,3], layer:2, set:7, udy:[372,561], img:"pack_weigh",
    text:"विदेश भेजे जाने वाले सामान की packing — कैसा लगता है?", mg:[14,9] },
  { id:"q535", type:"scale", band:[1,2,3], layer:2, set:7, udy:[372], img:"world_map",
    text:"दूसरे राज्य-देश के व्यापारी से फ़ोन पर बात करना — कैसा लगता है?", mg:[14,9] },
  { id:"q536", type:"scale", band:[1,2,3], layer:2, set:7, udy:[283,825], img:"robot_toy",
    text:"3D-printer की जानकारी रखना — कैसा लगता है?", mg:[15,19] },
  { id:"q537", type:"scale", band:[1,2,3], layer:2, set:7, udy:[302], img:"news_read",
    text:"नई app-ख़बरें दोस्तों को समझाना — कैसा लगता है?", mg:[15,18] },
  { id:"q538", type:"scale", band:[1,2,3], layer:2, set:7, udy:[400,704], img:"chitthi_daftar",
    text:"ज़मीन के कागज़ पढ़ना-समझना — कैसा लगता है?", mg:[16,18] },
  { id:"q539", type:"scale", band:[1,2,3], layer:2, set:7, udy:[385,880], img:"hisab_copy",
    text:"बीमा-दावे में लोगों की मदद करना — कैसा लगता है?", mg:[16,23] },
  { id:"q540", type:"scale", band:[1,2,3], layer:2, set:7, udy:[736], img:"paint_toy",
    text:"सरकारी योजना की दीवार-लिखाई का काम — कैसा लगता है?", mg:[17,12] },
  { id:"q541", type:"scale", band:[1,2,3], layer:2, set:7, udy:[734,737], img:"write_story",
    text:"राशन-दुकान का रजिस्टर सँभालना — कैसा लगता है?", mg:[17,18] },
  { id:"q542", type:"scale", band:[1,2,3], layer:2, set:7, udy:[717], img:"hisab_copy",
    text:"दुकानों का stock-register रखने का काम — कैसा लगता है?", mg:[18,23] },
  { id:"q543", type:"scale", band:[1,2,3], layer:2, set:7, udy:[893], img:"camera_click",
    text:"CCTV-recording देखकर जाँच करना — कैसा लगता है?", mg:[18,24] },
  { id:"q544", type:"scale", band:[1,2,3], layer:2, set:7, udy:[143,344], img:"patang",
    text:"खिलौना-drone उड़ाना सीखना — कैसा लगता है?", mg:[19,22] },
  { id:"q545", type:"scale", band:[1,2,3], layer:2, set:7, udy:[798,878], img:"flood_road",
    text:"मौसम बिगड़ने से पहले फ़सल-सलाह देना — कैसा लगता है?", mg:[20,1] },

  { id:"q546", type:"pick", band:[1,2,3], layer:2, set:7, udy:[52,66,377,312],
    text:"तेल के धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"run_machine", label:"सरसों-पिराई", mg:[1,3] },
      { img:"shop_sell", label:"तेल की दुकान", mg:[9] },
      { img:"pack_weigh", label:"बोतल-packing", mg:[13,9] },
      { img:"news_boy", label:"घर-पहुँच सेवा", mg:[10,8] } ] },
  { id:"q547", type:"pick", band:[1,2,3], layer:2, set:7, udy:[19,349,56,370],
    text:"आलू के धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"tractor_plough", label:"आलू की खेती", mg:[1] },
      { img:"godown_stack", label:"cold-storage", mg:[8,1] },
      { img:"cook_pot", label:"chips की इकाई", mg:[1,13] },
      { img:"mandi_taul", label:"मंडी-बिक्री", mg:[9,1] } ] },
  { id:"q548", type:"pick", band:[1,2,3], layer:2, set:7, udy:[26,561,362],
    text:"शहद के धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"bee_box", label:"पेटी-पालन", mg:[1] },
      { img:"tube_bubble", label:"शहद निकालना-छानना", mg:[1,13] },
      { img:"pack_weigh", label:"बोतल-label", mg:[13,9] },
      { img:"mobile_app", label:"online बिक्री", mg:[9,7] } ] },
  { id:"q549", type:"pick", band:[1,2,3], layer:2, set:7, udy:[534,260,121,370],
    text:"किसान-दुकान में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"seed_sow", label:"बीज-खाद बेचना", mg:[1,9] },
      { img:"herb_leaf", label:"दवा की सलाह", mg:[13,1] },
      { img:"tractor_plough", label:"यंत्र किराये पर", mg:[1,9] },
      { img:"hisab_copy", label:"उधार-खाता", mg:[23,9] } ] },
  { id:"q550", type:"pick", band:[1,2,3], layer:2, set:7, udy:[493,773,565],
    text:"मिट्टी के धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"clay_art", label:"गमला-बर्तन", mg:[12] },
      { img:"puja_thali", label:"मूर्ति बनाना", mg:[12,21] },
      { img:"brick_wall", label:"खपरैल-ईंट", mg:[4,12] },
      { img:"decoration", label:"सजावट-सामान", mg:[12,9] } ] },
  { id:"q551", type:"pick", band:[1,2,3], layer:2, set:7, udy:[103,312,104],
    text:"पानी-सेवा में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"tank_measure", label:"jar-भराई इकाई", mg:[2,3] },
      { img:"news_boy", label:"घर-पहुँच", mg:[10,8] },
      { img:"handpump_fix", label:"मशीन-सफ़ाई सेवा", mg:[2,10] },
      { img:"hisab_copy", label:"ग्राहक-खाता", mg:[23,18] } ] },
  { id:"q552", type:"pick", band:[1,2,3], layer:2, set:7, udy:[117,281,759,736],
    text:"बिजली-दुकान में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"board_wire", label:"तार-switch बेचना", mg:[2,9] },
      { img:"bulb_fix", label:"बल्ब-पंखा लगाना", mg:[2,3] },
      { img:"jugaad_new", label:"घर-मरम्मत सेवा", mg:[3,10] },
      { img:"note_100", label:"बिल-सहायता", mg:[23,17] } ] },
  { id:"q553", type:"pick", band:[1,2,3], layer:2, set:7, udy:[88,312,895],
    text:"रसोई-गैस सेवा में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app", label:"booking-सहायता", mg:[7,10] },
      { img:"news_boy", label:"सिलेंडर घर-पहुँच", mg:[8,10] },
      { img:"jugaad_new", label:"चूल्हा-मरम्मत", mg:[3,10] },
      { img:"aag_bujhana", label:"सुरक्षा-जाँच", mg:[24,13] } ] },
  { id:"q554", type:"pick", band:[1,2,3], layer:2, set:7, udy:[766,119,118],
    text:"लोहार-काम में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"jugaad_new", label:"औज़ार पर धार", mg:[3] },
      { img:"weld_spark", label:"जाली-गेट", mg:[3,4] },
      { img:"aag_bujhana", label:"भट्ठी सँभालना", mg:[3,24] },
      { img:"cycle_fix", label:"मरम्मत-order", mg:[3,10] } ] },
  { id:"q555", type:"pick", band:[1,2,3], layer:2, set:7, udy:[736,743,381],
    text:"e-सेवा केंद्र में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"chitthi_daftar", label:"आधार-सुधार सहायता", mg:[17,7] },
      { img:"type_computer", label:"टिकट-booking", mg:[7,8] },
      { img:"write_story", label:"परीक्षा-form", mg:[17,11] },
      { img:"count_money", label:"bank-सहायता", mg:[23,17] } ] },
  { id:"q556", type:"pick", band:[1,2,3], layer:2, set:7, udy:[567,161,535,497],
    text:"रंग के धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"paint_toy", label:"घर-पुताई", mg:[4,12] },
      { img:"wood_toy", label:"furniture-पॉलिश", mg:[3,12] },
      { img:"weld_spark", label:"gate-रंगाई", mg:[3,4] },
      { img:"decoration", label:"दीवार-चित्र", mg:[12] } ] },
  { id:"q557", type:"pick", band:[1,2,3], layer:2, set:7, udy:[63,263,23,260],
    text:"मुर्गी-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"pack_weigh", label:"दाना-मिश्रण", mg:[1,3] },
      { img:"boy_bandage", label:"टीका-देखभाल", mg:[1,6] },
      { img:"hen_farm", label:"अंडा-बिक्री", mg:[1,9] },
      { img:"compost", label:"खाद-बिक्री", mg:[1,20] } ] },
  { id:"q558", type:"pick", band:[1,2,3], layer:2, set:7, udy:[22,63,263],
    text:"बकरी-पालन में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"animal_love", label:"नस्ल-पहचान", mg:[1,18] },
      { img:"seed_sow", label:"चारा-योजना", mg:[1] },
      { img:"sick_care", label:"बीमारी-देखभाल", mg:[1,6] },
      { img:"mandi_taul", label:"मेले में बिक्री", mg:[1,9] } ] },
  { id:"q559", type:"pick", band:[1,2,3], layer:2, set:7, udy:[163,564,563,571],
    text:"मिस्त्री-टोली में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"brick_wall", label:"ईंट-जोड़ाई", mg:[4] },
      { img:"weld_spark", label:"छड़-बँधाई", mg:[4,3] },
      { img:"tank_measure", label:"plaster-नाप", mg:[4,18] },
      { img:"decoration", label:"टाइल्स-सज्जा", mg:[4,12] } ] },
  { id:"q560", type:"pick", band:[1,2,3], layer:2, set:7, udy:[569,759,104,129],
    text:"नल-काम में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"pipe_irrigation", label:"नई fitting", mg:[4,2] },
      { img:"handpump_fix", label:"leakage-मरम्मत", mg:[2,3] },
      { img:"tank_measure", label:"टंकी-सफ़ाई", mg:[2,10] },
      { img:"run_machine", label:"मोटर-जोड़", mg:[3,2] } ] },
  { id:"q561", type:"pick", band:[1,2,3], layer:2, set:7, udy:[508,509,143],
    text:"photo-video धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"camera_click", label:"शादी-shoot", mg:[12,10] },
      { img:"video_edit", label:"editing", mg:[12,18] },
      { img:"pack_weigh", label:"album-print", mg:[12,9] },
      { img:"patang", label:"drone-shoot", mg:[19,12] } ] },
  { id:"q562", type:"pick", band:[1,2,3], layer:2, set:7, udy:[365,233,379],
    text:"दवा-सेवा में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"med_shop", label:"दवा-पहचान", mg:[6] },
      { img:"write_story", label:"पर्चा-पढ़ना", mg:[6,18] },
      { img:"godown_stack", label:"stock सँभालना", mg:[6,8] },
      { img:"elder_help", label:"ग्राहक-सलाह", mg:[6,10] } ] },
  { id:"q563", type:"pick", band:[1,2,3], layer:2, set:7, udy:[765,107,106],
    text:"कबाड़-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"news_boy", label:"घर-घर ख़रीद", mg:[9,10] },
      { img:"waste_sort", label:"छँटाई", mg:[20,2] },
      { img:"pack_weigh", label:"तौल-भाव", mg:[9,18] },
      { img:"godown_stack", label:"आगे-बिक्री", mg:[9,8] } ] },
  { id:"q564", type:"pick", band:[1,2,3], layer:2, set:7, udy:[61,62,561,362],
    text:"अचार-मसाला धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"tamatar_tokri", label:"कच्चा-माल ख़रीद", mg:[1,9] },
      { img:"cook_pot", label:"पिसाई-मिश्रण", mg:[13,1] },
      { img:"pickle_jar", label:"packing-label", mg:[13,9] },
      { img:"mobile_app", label:"online-बिक्री", mg:[9,7] } ] },
  { id:"q565", type:"pick", band:[1,2,3], layer:2, set:7, udy:[760,717,726],
    text:"tent-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"mela_gate", label:"कुर्सी-मेज़ लगवाना", mg:[10,4] },
      { img:"light_string", label:"light-माइक", mg:[10,2] },
      { img:"hisab_copy", label:"भंडारण-गिनती", mg:[18,8] },
      { img:"team_win", label:"मज़दूर-टोली", mg:[10] } ] },
  { id:"q566", type:"pick", band:[1,2,3], layer:2, set:7, udy:[310,316,309],
    text:"गाड़ी-सेवा धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"bus_drive", label:"school-van", mg:[8,11] },
      { img:"godown_stack", label:"माल-van", mg:[8,9] },
      { img:"decoration", label:"शादी-गाड़ी सजाना", mg:[8,12] },
      { img:"travel_road", label:"tour-गाड़ी", mg:[8,10] } ] },
  { id:"q567", type:"pick", band:[1,2,3], layer:2, set:7, udy:[45,237,362],
    text:"herbal-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"herb_leaf", label:"तुलसी-आँवला उगाना", mg:[1,20] },
      { img:"run_machine", label:"सुखाना-पीसना", mg:[1,3] },
      { img:"pack_weigh", label:"packing", mg:[13,9] },
      { img:"shop_sell", label:"दुकान-सम्पर्क", mg:[9,10] } ] },
  { id:"q568", type:"pick", band:[1,2,3], layer:2, set:7, udy:[59,419,364],
    text:"bakery-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"cook_pot", label:"bread-biscuit बनाना", mg:[10,13] },
      { img:"sweet_make", label:"cake के order", mg:[10,12] },
      { img:"aag_bujhana", label:"भट्ठी सँभालना", mg:[3,24] },
      { img:"shop_sell", label:"बिक्री-counter", mg:[9,10] } ] },
  { id:"q569", type:"pick", band:[1,2,3], layer:2, set:7, udy:[197,8],
    text:"जूट-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"sewing_machine", label:"बोरी-सिलाई", mg:[5,3] },
      { img:"embroidery", label:"थैला-design", mg:[5,12] },
      { img:"jugaad_new", label:"रस्सी का काम", mg:[5,3] },
      { img:"shop_sell", label:"बिक्री", mg:[9] } ] },
  { id:"q570", type:"pick", band:[1,2,3], layer:2, set:7, udy:[263,53,21],
    text:"पशु-सेवा में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"boy_bandage", label:"टीका-सहायता", mg:[1,6] },
      { img:"run_machine", label:"दूध-मशीन चलाना", mg:[1,3] },
      { img:"animal_love", label:"खुर-देखभाल", mg:[1,6] },
      { img:"seed_sow", label:"चारा-कटाई", mg:[1] } ] },
  { id:"q571", type:"pick", band:[1,2,3], layer:2, set:7, udy:[276,265,268,893],
    text:"computer-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"type_computer", label:"hardware जोड़ना", mg:[7,3] },
      { img:"mobile_app", label:"software डालना", mg:[7] },
      { img:"board_wire", label:"जाल (network) जोड़ना", mg:[7,2] },
      { img:"camera_click", label:"CCTV जोड़ना", mg:[24,7] } ] },
  { id:"q572", type:"pick", band:[1,2,3], layer:2, set:7, udy:[860,764],
    text:"पर्व-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"embroidery", label:"राखी बनाना", mg:[12,21] },
      { img:"clay_art", label:"दीया-मोमबत्ती", mg:[12,21] },
      { img:"paint_toy", label:"पिचकारी-रंग बेचना", mg:[9,12] },
      { img:"patang", label:"पतंग-माँझा", mg:[9,22] } ] },
  { id:"q573", type:"pick", band:[1,2,3], layer:2, set:7, udy:[892,893,891],
    text:"security-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"queue_line", label:"gate-guard", mg:[24] },
      { img:"mela_gate", label:"event-guard", mg:[24,10] },
      { img:"lock_key", label:"रात-गश्त", mg:[24] },
      { img:"bulb_fix", label:"alarm-जोड़", mg:[24,2] } ] },
  { id:"q574", type:"pick", band:[1,2,3], layer:2, set:7, udy:[512,479],
    text:"किताब-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"write_story", label:"किताब-किराया library", mg:[11,9] },
      { img:"teach_kids", label:"बैठक-पढ़ाई कक्ष", mg:[11,10] },
      { img:"type_computer", label:"photocopy", mg:[7,9] },
      { img:"school_stall", label:"चाय-corner", mg:[10,9] } ] },
  { id:"q575", type:"pick", band:[1,2,3], layer:2, set:7, udy:[649,915,932,639],
    text:"दुनिया के खाने के धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"world_food", label:"हलाल-खाना बनाना", mg:[14,10] },
      { img:"cook_pot", label:"जापानी खाना सीखना", mg:[14,10] },
      { img:"food_serve", label:"थाई-खाना दुकान", mg:[14,10] },
      { img:"travel_road", label:"सैलानी-खाना घुमाना", mg:[14,8] } ] },
  { id:"q576", type:"pick", band:[1,2,3], layer:2, set:7, udy:[918,544,543],
    text:"सुंदरता के बड़े धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"decoration", label:"K-beauty सामान बेचना", mg:[14,9] },
      { img:"soap_make", label:"देसी cream-तेल बनाना", mg:[13,9] },
      { img:"herb_leaf", label:"herbal-लेप का काम", mg:[13,6] },
      { img:"video_edit", label:"सुंदरता के video", mg:[12,18] } ] },
  { id:"q577", type:"pick", band:[1,2,3], layer:2, set:7, udy:[923,626,595,606],
    text:"चाय-कॉफ़ी के विश्व-धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"seed_sow", label:"चाय-कॉफ़ी उगाना", mg:[14,1] },
      { img:"run_machine", label:"भूनना-पीसना", mg:[14,3] },
      { img:"pack_weigh", label:"निर्यात-packing", mg:[14,9] },
      { img:"school_stall", label:"café खोलना", mg:[10,9] } ] },
  { id:"q578", type:"pick", band:[1,2,3], layer:2, set:7, udy:[646,223,232,373],
    text:"सोना-रत्न के धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"coin_stamp", label:"सोना-चाँदी परखना", mg:[14,18] },
      { img:"jugaad_new", label:"गहना गढ़ना", mg:[12,3] },
      { img:"puzzle_solo", label:"रत्न-कटाई सीखना", mg:[12,18] },
      { img:"shop_sell", label:"gahna-दुकान", mg:[9] } ] },
  { id:"q579", type:"pick", band:[1,2,3], layer:2, set:7, udy:[941,675,907,942],
    text:"नई खेती के विश्व-मॉडल में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"fish_pond", label:"मछली+सब्ज़ी एक साथ", mg:[24,1] },
      { img:"badi_imarat", label:"बिना-मिट्टी टावर-खेती", mg:[15,1] },
      { img:"seed_sow", label:"धान+मछली चीनी-ढंग", mg:[24,1] },
      { img:"mobile_app", label:"नाप-जोख वाली खेती", mg:[24,18] } ] },
  { id:"q580", type:"pick", band:[1,2,3], layer:2, set:7, udy:[805,807,824,825],
    text:"chip-robot के धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"puzzle_solo", label:"chip-design समझना", mg:[19,18] },
      { img:"tube_bubble", label:"chip-जाँच का काम", mg:[19,13] },
      { img:"toy_open", label:"robot-मरम्मत", mg:[19,3] },
      { img:"robot_toy", label:"3D-छपाई का काम", mg:[19,15] } ] },
  { id:"q581", type:"pick", band:[1,2,3], layer:2, set:7, udy:[553,554,559,561],
    text:"packing-धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"pack_weigh", label:"कागज़-डिब्बे", mg:[13,9] },
      { img:"run_machine", label:"plastic-packing मशीन", mg:[13,3] },
      { img:"tree_plant", label:"पत्तल जैसी eco-packing", mg:[13,20] },
      { img:"godown_stack", label:"खाने की packing", mg:[13,8] } ] },
  { id:"q582", type:"pick", band:[1,2,3], layer:2, set:7, udy:[914,945,827],
    text:"जापानी काम-ढंग में कौन-सी बात सबसे पहले? और कौन-सी सबसे कम?",
    opts:[
      { img:"bolt_fit", label:"हर चीज़ अपनी जगह", mg:[24,3] },
      { img:"graph_up", label:"रोज़ थोड़ा सुधार", mg:[24,15] },
      { img:"run_machine", label:"बिना-रुके line", mg:[24,3] },
      { img:"team_win", label:"टोली मिलकर हल", mg:[24,10] } ] },
  { id:"q583", type:"pick", band:[1,2,3], layer:2, set:7, udy:[909,295,787,784],
    text:"online-बिक्री के विश्व-ढंग में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"video_edit", label:"live दिखाकर बेचना", mg:[24,18] },
      { img:"mobile_app", label:"app-दुकान चलाना", mg:[7,9] },
      { img:"camera_click", label:"माल की फ़ोटो-कला", mg:[12,9] },
      { img:"news_boy", label:"order घर-घर", mg:[8,9] } ] },
  { id:"q584", type:"pick", band:[1,2,3], layer:2, set:7, udy:[535,540,536],
    text:"रसायन के काम में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"soap_make", label:"रंग घोलना-मिलाना", mg:[13] },
      { img:"tube_bubble", label:"नमूना-जाँच", mg:[13,18] },
      { img:"pack_weigh", label:"तौल-मिश्रण", mg:[13,3] },
      { img:"aag_bujhana", label:"सुरक्षा-नियम", mg:[13,24] } ] },
  { id:"q585", type:"pick", band:[1,2,3], layer:2, set:7, udy:[624,203,922],
    text:"कपड़ा-कारख़ाने के विश्व-धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"sewing_machine", label:"line-सिलाई", mg:[14,5] },
      { img:"pack_weigh", label:"माल-जाँच", mg:[5,18] },
      { img:"tank_measure", label:"नाप-कटाई", mg:[5,18] },
      { img:"godown_stack", label:"निर्यात-लदाई", mg:[14,8] } ] },
  { id:"q586", type:"pick", band:[1,2,3], layer:2, set:7, udy:[856,857,861],
    text:"ज्योतिष-योग के धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"news_read", label:"पंचांग-पढ़ना", mg:[21,18] },
      { img:"write_story", label:"जन्मपत्री-लिखाई", mg:[21,12] },
      { img:"exercise_coach", label:"योग-कक्षा", mg:[21,6] },
      { img:"world_map", label:"वास्तु-सलाह", mg:[21,4] } ] },
  { id:"q587", type:"pick", band:[1,2,3], layer:2, set:7, udy:[870,868,873,874],
    text:"खेल के बड़े धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"balla_gend", label:"tournament करवाना", mg:[22,10] },
      { img:"hisab_copy", label:"score-आँकड़े", mg:[22,18] },
      { img:"game_rules", label:"e-sports का काम", mg:[22,7] },
      { img:"ground_prep", label:"मैदान-प्रबंध", mg:[22,4] } ] },
  { id:"q588", type:"pick", band:[1,2,3], layer:2, set:7, udy:[886,888,889,881],
    text:"नए ज़माने के पैसे-धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"mobile_app", label:"mobile-bank सिखाना", mg:[23,7] },
      { img:"piggy_bank", label:"छोटी-बचत योजना", mg:[23] },
      { img:"team_win", label:"मिल-जुलकर पूँजी", mg:[23,10] },
      { img:"graph_up", label:"निवेश समझना", mg:[23,18] } ] },
  { id:"q589", type:"pick", band:[1,2,3], layer:2, set:7, udy:[106,107,695,696],
    text:"कचरा-से-कमाई धंधे में कौन-सा सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"waste_sort", label:"गीला-सूखा छाँटना", mg:[20,2] },
      { img:"toy_open", label:"पुराना electronics खोलना", mg:[20,19] },
      { img:"embroidery", label:"पुराने कपड़े से नया", mg:[20,5] },
      { img:"compost", label:"खाद बनाना", mg:[20,1] } ] },
  { id:"q590", type:"pick", band:[1,2,3], layer:2, set:7, udy:[27,28,196],
    text:"रेशम-ऊन धंधे में कौन-सा काम सबसे पहले? और कौन-सा सबसे कम?",
    opts:[
      { img:"forest_birds", label:"रेशम-कीट पालन", mg:[1] },
      { img:"animal_love", label:"भेड़-ऊन का काम", mg:[1,5] },
      { img:"embroidery", label:"धागा-कताई", mg:[5] },
      { img:"shop_sell", label:"बिक्री", mg:[9] } ] },

  { id:"q591", type:"pair", band:[1,2,3], layer:2, set:7, udy:[52,51],
    text:"ज़्यादा अच्छा क्या — सरसों-पिराई की घानी, या आटा-चक्की?",
    opts:[ { img:"run_machine", label:"सरसों-पिराई", mg:[1,3] },
           { img:"pack_weigh", label:"आटा-चक्की", mg:[1,3] } ] },
  { id:"q592", type:"pair", band:[1,2,3], layer:2, set:7, udy:[349,370],
    text:"ज़्यादा अच्छा क्या — cold-storage का धंधा, या सीधी मंडी-बिक्री?",
    opts:[ { img:"godown_stack", label:"cold-storage", mg:[8,1] },
           { img:"mandi_taul", label:"सीधी मंडी", mg:[9,1] } ] },
  { id:"q593", type:"pair", band:[1,2,3], layer:2, set:7, udy:[366,311],
    text:"ज़्यादा अच्छा क्या — pump पर नौकरी, या अपना e-रिक्शा?",
    opts:[ { img:"note_100", label:"pump पर नौकरी", mg:[9,2] },
           { img:"bus_drive", label:"अपना e-रिक्शा", mg:[8,15] } ] },
  { id:"q594", type:"pair", band:[1,2,3], layer:2, set:7, udy:[103,97],
    text:"ज़्यादा अच्छा क्या — RO-जार का धंधा, या गोबर-गैस का काम?",
    opts:[ { img:"tank_measure", label:"RO-जार", mg:[2,9] },
           { img:"compost", label:"गोबर-गैस", mg:[2,20] } ] },
  { id:"q595", type:"pair", band:[1,2,3], layer:2, set:7, udy:[56,764],
    text:"ज़्यादा अच्छा क्या — chips की इकाई, या ताज़े फल का ठेला?",
    opts:[ { img:"cook_pot", label:"chips-इकाई", mg:[13,1] },
           { img:"tamatar_tokri", label:"फल-ठेला", mg:[9,1] } ] },
  { id:"q596", type:"pair", band:[1,2,3], layer:2, set:7, udy:[215,208],
    text:"ज़्यादा अच्छा क्या — bag बनाने की इकाई, या dress सिलने का काम?",
    opts:[ { img:"pack_weigh", label:"bag-इकाई", mg:[5,9] },
           { img:"sewing_machine", label:"dress-सिलाई", mg:[5] } ] },
  { id:"q597", type:"pair", band:[1,2,3], layer:2, set:7, udy:[766,494],
    text:"ज़्यादा अच्छा क्या — लोहार का काम, या बढ़ई का काम?",
    opts:[ { img:"weld_spark", label:"लोहार-काम", mg:[3] },
           { img:"wood_toy", label:"बढ़ई-काम", mg:[3,12] } ] },
  { id:"q598", type:"pair", band:[1,2,3], layer:2, set:7, udy:[567,571],
    text:"ज़्यादा अच्छा क्या — putty-पुताई का ठेका, या टाइल्स का काम?",
    opts:[ { img:"paint_toy", label:"putty-पुताई", mg:[4,13] },
           { img:"decoration", label:"टाइल्स-काम", mg:[4,12] } ] },
  { id:"q599", type:"pair", band:[1,2,3], layer:2, set:7, udy:[736,759],
    text:"ज़्यादा अच्छा क्या — e-सेवा केंद्र, या mobile-मरम्मत दुकान?",
    opts:[ { img:"chitthi_daftar", label:"e-सेवा केंद्र", mg:[17,7] },
           { img:"phone_dead", label:"mobile-मरम्मत", mg:[3,7] } ] },
  { id:"q600", type:"pair", band:[1,2,3], layer:2, set:7, udy:[358,310],
    text:"ज़्यादा अच्छा क्या — courier-सेवा, या auto-सवारी?",
    opts:[ { img:"news_boy", label:"courier-सेवा", mg:[8,9] },
           { img:"bus_drive", label:"auto-सवारी", mg:[8,10] } ] },
  { id:"q601", type:"pair", band:[1,2,3], layer:2, set:7, udy:[764,364],
    text:"ज़्यादा अच्छा क्या — फेरी का धंधा, या एक जगह की दुकान?",
    opts:[ { img:"show_way", label:"फेरी का धंधा", mg:[9,8] },
           { img:"shop_sell", label:"एक जगह दुकान", mg:[9] } ] },
  { id:"q602", type:"pair", band:[1,2,3], layer:2, set:7, udy:[760,416],
    text:"ज़्यादा अच्छा क्या — tent-किराये का धंधा, या catering का खाना?",
    opts:[ { img:"mela_gate", label:"tent-किराया", mg:[10,9] },
           { img:"food_serve", label:"catering-खाना", mg:[10] } ] },
  { id:"q603", type:"pair", band:[1,2,3], layer:2, set:7, udy:[365,240],
    text:"ज़्यादा अच्छा क्या — दवा-दुकान, या जाँच-lab का काम?",
    opts:[ { img:"med_shop", label:"दवा-दुकान", mg:[6,9] },
           { img:"tube_bubble", label:"जाँच-lab", mg:[6,18] } ] },
  { id:"q604", type:"pair", band:[1,2,3], layer:2, set:7, udy:[755,495],
    text:"ज़्यादा अच्छा क्या — parlour का हुनर, या कढ़ाई-केंद्र?",
    opts:[ { img:"decoration", label:"parlour-हुनर", mg:[10,12] },
           { img:"embroidery", label:"कढ़ाई-केंद्र", mg:[5,12] } ] },
  { id:"q605", type:"pair", band:[1,2,3], layer:2, set:7, udy:[59,415],
    text:"ज़्यादा अच्छा क्या — bakery-भट्ठी, या मिठाई-भट्ठी?",
    opts:[ { img:"cook_pot", label:"bakery-भट्ठी", mg:[10,15] },
           { img:"sweet_make", label:"मिठाई-भट्ठी", mg:[10] } ] },
  { id:"q606", type:"pair", band:[1,2,3], layer:2, set:7, udy:[23,22],
    text:"ज़्यादा अच्छा क्या — मुर्गी-farm, या बकरी-farm?",
    opts:[ { img:"hen_farm", label:"मुर्गी-farm", mg:[1] },
           { img:"animal_love", label:"बकरी-farm", mg:[1] } ] },
  { id:"q607", type:"pair", band:[1,2,3], layer:2, set:7, udy:[765,106],
    text:"ज़्यादा अच्छा क्या — कबाड़-छँटाई की कमाई, या कचरे से खाद?",
    opts:[ { img:"waste_sort", label:"कबाड़-छँटाई", mg:[9,20] },
           { img:"compost", label:"कचरे से खाद", mg:[20,1] } ] },
  { id:"q608", type:"pair", band:[1,2,3], layer:2, set:7, udy:[26,50],
    text:"ज़्यादा अच्छा क्या — शहद-पेटी का धंधा, या मशरूम-कक्ष?",
    opts:[ { img:"bee_box", label:"शहद-पेटी", mg:[1] },
           { img:"seed_sow", label:"मशरूम-कक्ष", mg:[1,15] } ] },
  { id:"q609", type:"pair", band:[1,2,3], layer:2, set:7, udy:[817,121],
    text:"ज़्यादा अच्छा क्या — drone-छिड़काव सेवा, या tractor-किराया?",
    opts:[ { img:"patang", label:"drone-छिड़काव", mg:[19,1] },
           { img:"tractor_plough", label:"tractor-किराया", mg:[1,9] } ] },
  { id:"q610", type:"pair", band:[1,2,3], layer:2, set:7, udy:[180,93],
    text:"ज़्यादा अच्छा क्या — bore-पाइप का काम, या solar लगाने का काम?",
    opts:[ { img:"pani_khoj", label:"bore-पाइप", mg:[2,4] },
           { img:"solar_panel", label:"solar-काम", mg:[2,15] } ] },
  { id:"q611", type:"pair", band:[1,2,3], layer:2, set:7, udy:[385,381],
    text:"ज़्यादा अच्छा क्या — बीमा-सहायता का काम, या bank-मित्र का काम?",
    opts:[ { img:"hisab_copy", label:"बीमा-सहायता", mg:[23,16] },
           { img:"count_money", label:"bank-मित्र", mg:[23,17] } ] },
  { id:"q612", type:"pair", band:[1,2,3], layer:2, set:7, udy:[400,704],
    text:"बड़ा हुनर क्या — ज़मीन-कागज़ का जानकार, या नाप-जोख का जानकार?",
    opts:[ { img:"chitthi_daftar", label:"कागज़-जानकार", mg:[16,18] },
           { img:"tank_measure", label:"नाप-जानकार", mg:[18,4] } ] },
  { id:"q613", type:"pair", band:[1,2,3], layer:2, set:7, udy:[309,404],
    text:"ज़्यादा अच्छा क्या — school-van चलाना, या tour-गाड़ी चलाना?",
    opts:[ { img:"bus_drive", label:"school-van", mg:[8,11] },
           { img:"travel_road", label:"tour-गाड़ी", mg:[8,10] } ] },
  { id:"q614", type:"pair", band:[1,2,3], layer:2, set:7, udy:[918,525],
    text:"ज़्यादा अच्छा क्या — K-pop नाच की कक्षा, या देसी-नृत्य की कक्षा?",
    opts:[ { img:"stage_song", label:"K-pop कक्षा", mg:[14,12] },
           { img:"stage_play", label:"देसी-नृत्य कक्षा", mg:[12,21] } ] },
  { id:"q615", type:"pair", band:[1,2,3], layer:2, set:7, udy:[646,223],
    text:"ज़्यादा अच्छा क्या — दुबई जैसा सोना-बाज़ार काम, या देसी गहना-गढ़ाई?",
    opts:[ { img:"coin_stamp", label:"सोना-बाज़ार काम", mg:[14,9] },
           { img:"jugaad_new", label:"देसी गहना-गढ़ाई", mg:[12,3] } ] },
  { id:"q616", type:"pair", band:[1,2,3], layer:2, set:7, udy:[945,766],
    text:"ज़्यादा भाता क्या — जापानी सधा-ढंग, या देसी जुगाड़-ढंग?",
    opts:[ { img:"bolt_fit", label:"जापानी सधा-ढंग", mg:[24,3] },
           { img:"jugaad_new", label:"देसी जुगाड़", mg:[3,12] } ] },
  { id:"q617", type:"pair", band:[1,2,3], layer:2, set:7, udy:[237,62],
    text:"ज़्यादा अच्छा क्या — herbal-दवा की पिसाई, या मसाले की पिसाई?",
    opts:[ { img:"herb_leaf", label:"herbal-पिसाई", mg:[13,6] },
           { img:"cook_pot", label:"मसाला-पिसाई", mg:[1,13] } ] },
  { id:"q618", type:"pair", band:[1,2,3], layer:2, set:7, udy:[497,502],
    text:"ज़्यादा अच्छा क्या — दीवार-चित्र का काम, या flex-design का काम?",
    opts:[ { img:"decoration", label:"दीवार-चित्र", mg:[12] },
           { img:"paint_toy", label:"flex-design", mg:[12,9] } ] },
  { id:"q619", type:"pair", band:[1,2,3], layer:2, set:7, udy:[860,64],
    text:"ज़्यादा अच्छा क्या — प्रसाद-सामग्री की दुकान, या फूल-माला की दुकान?",
    opts:[ { img:"puja_thali", label:"प्रसाद-दुकान", mg:[21,9] },
           { img:"flower_sell", label:"फूल-माला दुकान", mg:[1,9] } ] },
  { id:"q620", type:"pair", band:[1,2,3], layer:2, set:7, udy:[893,894],
    text:"ज़्यादा अच्छा क्या — CCTV जोड़ने का काम, या alarm-ताले का काम?",
    opts:[ { img:"camera_click", label:"CCTV-काम", mg:[24,7] },
           { img:"lock_key", label:"alarm-ताला", mg:[24,3] } ] },
  { id:"q621", type:"pair", band:[1,2,3], layer:2, set:7, udy:[316,759],
    text:"ज़्यादा अच्छा क्या — साइकिल किराये देना, या साइकिल-मरम्मत?",
    opts:[ { img:"note_100", label:"साइकिल-किराया", mg:[9] },
           { img:"cycle_fix", label:"साइकिल-मरम्मत", mg:[3,10] } ] },
  { id:"q622", type:"pair", band:[1,2,3], layer:2, set:7, udy:[197,559],
    text:"ज़्यादा अच्छा क्या — जूट-बोरी की सिलाई, या कपड़े के थैले की छपाई?",
    opts:[ { img:"sewing_machine", label:"बोरी-सिलाई", mg:[5,3] },
           { img:"paint_toy", label:"थैला-छपाई", mg:[5,12] } ] },
  { id:"q623", type:"pair", band:[1,2,3], layer:2, set:7, udy:[770,755],
    text:"ज़्यादा अच्छा क्या — hair-cut का रोज़-हुनर, या दुल्हन-श्रृंगार का मौसमी काम?",
    opts:[ { img:"make_alone", label:"hair-cut हुनर", mg:[10,12] },
           { img:"decoration", label:"दुल्हन-श्रृंगार", mg:[12,10] } ] },
  { id:"q624", type:"pair", band:[1,2,3], layer:2, set:7, udy:[59,419],
    text:"ज़्यादा अच्छी क्या — रोज़ की bread-बिक्री, या order का बड़ा cake?",
    opts:[ { img:"shop_sell", label:"रोज़ की bread", mg:[9,10] },
           { img:"sweet_make", label:"order का cake", mg:[10,12] } ] },
  { id:"q625", type:"pair", band:[1,2,3], layer:2, set:7, udy:[331,349],
    text:"ज़्यादा अच्छा क्या — मछली-जाल की मरम्मत, या बर्फ़-पेटी का धंधा?",
    opts:[ { img:"shoe_stitch", label:"जाल-मरम्मत", mg:[1,5] },
           { img:"godown_stack", label:"बर्फ़-पेटी धंधा", mg:[8,9] } ] },

  { id:"q626", type:"story", band:[1,2,3], layer:2, set:7, udy:[103,312], img:"tank_measure",
    text:"मुहल्ले में पानी-jar की माँग बढ़ गई है। तुम पहले क्या करोगे?",
    opts:[
      { label:"मशीन की जानकारी लूँगा",       mg:[3,18],  pts:2 },
      { label:"लागत-हिसाब जोड़ूँगा",          mg:[23,18], pts:2 },
      { label:"घर-घर माँग पूछूँगा",            mg:[9,10],  pts:2 },
      { label:"चालू jar-वालों से सीखूँगा",      mg:[11,10], pts:2 }
    ] },
  { id:"q627", type:"story", band:[1,2,3], layer:2, set:7, udy:[203,208], img:"sewing_machine",
    text:"सरकार ने गाँव की औरतों को सिलाई-मशीनें बाँटीं। तुम क्या करोगे?",
    opts:[
      { label:"order खोजकर लाऊँगा",           mg:[9,10],  pts:2 },
      { label:"सिखाने की कक्षा",               mg:[11,5],  pts:2 },
      { label:"मिलकर एक इकाई बनाऊँगा",       mg:[10,15], pts:2 },
      { label:"घर से काम शुरू",               mg:[5],     pts:2 }
    ] },
  { id:"q628", type:"story", band:[1,2,3], layer:2, set:7, udy:[860,764], img:"mela_gate",
    text:"मंदिर-मेले में 10 दिन की जगह मिली है। कौन-सा धंधा लगाओगे?",
    opts:[
      { label:"प्रसाद-सामग्री",              mg:[21,9],  pts:2 },
      { label:"खिलौने की दुकान",            mg:[9,12],  pts:2 },
      { label:"फ़ोटो-स्टॉल",                 mg:[12,9],  pts:2 },
      { label:"पानी-शरबत",                 mg:[10,9],  pts:2 }
    ] },
  { id:"q629", type:"story", band:[1,2,3], layer:2, set:7, udy:[106,107], img:"waste_sort",
    text:"गली में रोज़ कचरा जमा रहता है। तुम क्या करोगे?",
    opts:[
      { label:"जमा-सेवा शुरू करूँगा",        mg:[10,20], pts:2 },
      { label:"खाद-योजना बनाऊँगा",          mg:[20,1],  pts:2 },
      { label:"पंचायत से बात",              mg:[17],    pts:2 },
      { label:"जागरूकता फैलाऊँगा",           mg:[11,20], pts:2 }
    ] },
  { id:"q630", type:"story", band:[1,2,3], layer:2, set:7, udy:[23,263], img:"hen_farm",
    text:"मुर्गियों में बीमारी फैल रही है। तुम पहले क्या करोगे?",
    opts:[
      { label:"पशु-डॉक्टर बुलाऊँगा",          mg:[6,1],   pts:2 },
      { label:"बीमार अलग बाड़े में",           mg:[24,1],  pts:2 },
      { label:"टीके की जानकारी",             mg:[18,6],  pts:2 },
      { label:"record-किताब बनाऊँगा",        mg:[18,1],  pts:2 }
    ] },
  { id:"q631", type:"story", band:[1,2,3], layer:2, set:7, udy:[360,312], img:"badi_imarat",
    text:"क़स्बे में बड़ा मॉल खुला है। तुम क्या करोगे?",
    opts:[
      { label:"वहाँ काम खोजूँगा",              mg:[10,9],  pts:2 },
      { label:"अपनी दुकान में नई चीज़",        mg:[9,15],  pts:2 },
      { label:"घर-पहुँच सेवा शुरू",            mg:[8,10],  pts:2 },
      { label:"मॉल को माल-आपूर्ति",           mg:[9,8],   pts:2 }
    ] },
  { id:"q632", type:"story", band:[1,2,3], layer:2, set:7, udy:[759,117], img:"bulb_fix",
    text:"गाँव में बिजली-मिस्त्री की माँग बढ़ी है। तुम क्या करोगे?",
    opts:[
      { label:"हुनर-कक्षा में नाम लिखाऊँगा",   mg:[11,2],  pts:2 },
      { label:"औज़ार जोड़ना शुरू",             mg:[3,23],  pts:2 },
      { label:"पुराने मिस्त्री के साथ लगूँगा",    mg:[10,11], pts:2 },
      { label:"दुकानों से सम्पर्क",             mg:[9,10],  pts:2 }
    ] },
  { id:"q633", type:"story", band:[1,2,3], layer:2, set:7, udy:[25,331], img:"fish_pond",
    text:"गाँव का तालाब पट्टे पर मिल रहा है। तुम पहले क्या करोगे?",
    opts:[
      { label:"मछली-कमाई का हिसाब",          mg:[23,18], pts:2 },
      { label:"बीज-दाने की जानकारी",          mg:[18,1],  pts:2 },
      { label:"साथी-टोली जोड़ूँगा",             mg:[10],    pts:2 },
      { label:"पट्टे के कागज़ जाँचूँगा",          mg:[16,17], pts:2 }
    ] },
  { id:"q634", type:"story", band:[1,2,3], layer:2, set:7, udy:[479,475], img:"teach_kids",
    text:"मुहल्ले के 30 बच्चों को tuition चाहिए। तुम क्या करोगे?",
    opts:[
      { label:"विषय-बँटवारा साथी से",          mg:[10,11], pts:2 },
      { label:"बैठने की जगह",                mg:[4,11],  pts:2 },
      { label:"समय-तालिका",                 mg:[18,11], pts:2 },
      { label:"फीस-हिसाब साफ़",              mg:[23,11], pts:2 }
    ] },
  { id:"q635", type:"story", band:[1,2,3], layer:2, set:7, udy:[565], img:"brick_wall",
    text:"ईंट-भट्ठे पर मज़दूर कम पड़ रहे हैं। मालिक तुमसे राय माँगे तो?",
    opts:[
      { label:"मशीन की जानकारी दूँगा",        mg:[3,15],  pts:2 },
      { label:"दूसरे-गाँव सम्पर्क",             mg:[10,8],  pts:2 },
      { label:"मज़दूरी-सुधार की सलाह",         mg:[23,16], pts:2 },
      { label:"काम-बँटवारा सुधारूँगा",          mg:[18,24], pts:2 }
    ] },
  { id:"q636", type:"story", band:[1,2,3], layer:2, set:7, udy:[412,407], img:"tree_plant",
    text:"सैलानी तुम्हारे इलाक़े का बाग़ देखने आते हैं। तुम क्या करोगे?",
    opts:[
      { label:"गाइड बनूँगा",                  mg:[10,14], pts:2 },
      { label:"खाना-सेवा लगाऊँगा",            mg:[10,9],  pts:2 },
      { label:"हस्तशिल्प-बिक्री",              mg:[12,9],  pts:2 },
      { label:"parking-इंतज़ाम",              mg:[24,8],  pts:2 }
    ] },
  { id:"q637", type:"story", band:[1,2,3], layer:2, set:7, udy:[181,898], img:"flood_road",
    text:"आँधी में बिजली का तार गिर गया है। तुम क्या करोगे?",
    opts:[
      { label:"सबको दूर रहना सिखाऊँगा",       mg:[24,11], pts:2 },
      { label:"दफ़्तर को तुरंत ख़बर",           mg:[17],    pts:2 },
      { label:"रास्ता रोकने का इंतज़ाम",        mg:[24,10], pts:2 },
      { label:"मरम्मत-टोली की मदद",          mg:[10,2],  pts:2 }
    ] },
  { id:"q638", type:"story", band:[1,2,3], layer:2, set:7, udy:[494,506], img:"wood_toy",
    text:"बाज़ार सस्ते विदेशी खिलौनों से भर गया है। तुम्हारे लकड़ी-खिलौने कैसे बिकें?",
    opts:[
      { label:"अपनी ख़ूबी साफ़ बताऊँगा",       mg:[9,12],  pts:2 },
      { label:"दाम का नया हिसाब",            mg:[23,18], pts:2 },
      { label:"नई design बनाऊँगा",           mg:[12,15], pts:2 },
      { label:"online बेचना सीखूँगा",          mg:[9,7],   pts:2 }
    ] },
  { id:"q639", type:"story", band:[1,2,3], layer:2, set:7, udy:[2,350], img:"tractor_plough",
    text:"गेहूँ-कटाई का मौसम सिर पर है। तुम कौन-सा काम सँभालोगे?",
    opts:[
      { label:"मज़दूर-टोली जुटाना",            mg:[10,1],  pts:2 },
      { label:"मशीन-किराये का इंतज़ाम",        mg:[3,9],   pts:2 },
      { label:"तौल-हिसाब",                   mg:[18,23], pts:2 },
      { label:"भूसा-बिक्री की योजना",          mg:[9,1],   pts:2 }
    ] },
  { id:"q640", type:"story", band:[1,2,3], layer:2, set:7, udy:[865,752], img:"temple_seva",
    text:"मंदिर की मरम्मत का काम निकला है। तुम क्या सँभालोगे?",
    opts:[
      { label:"मिस्त्री-टोली",                mg:[4,10],  pts:2 },
      { label:"चंदे का हिसाब",               mg:[23,21], pts:2 },
      { label:"पूजा-व्यवस्था चालू रखना",       mg:[21,10], pts:2 },
      { label:"फ़ोटो-record रखना",            mg:[18,12], pts:2 }
    ] },
  { id:"q641", type:"story", band:[1,2,3], layer:2, set:7, udy:[364,514], img:"school_stall",
    text:"bus-अड्डे पर दुकान की जगह मिल रही है। कौन-सी दुकान खोलोगे?",
    opts:[
      { label:"चाय-नाश्ता",                  mg:[10,9],  pts:2 },
      { label:"अख़बार-recharge",             mg:[9,7],   pts:2 },
      { label:"फल की दुकान",                mg:[1,9],   pts:2 },
      { label:"सामान-रखने की सेवा",           mg:[8,24],  pts:2 }
    ] },
  { id:"q642", type:"story", band:[1,2,3], layer:2, set:7, udy:[93,129], img:"solar_panel",
    text:"सोलर-पंप की सरकारी योजना आई है। तुम क्या करोगे?",
    opts:[
      { label:"किसानों के form भरवाऊँगा",     mg:[17,10], pts:2 },
      { label:"लगाने का हुनर सीखूँगा",         mg:[2,11],  pts:2 },
      { label:"रखरखाव-ठेका लूँगा",            mg:[3,9],   pts:2 },
      { label:"गाँव-गाँव जानकारी दूँगा",        mg:[11,10], pts:2 }
    ] },
  { id:"q643", type:"story", band:[1,2,3], layer:2, set:7, udy:[493,773], img:"clay_art",
    text:"दीवाली पर दीयों की बड़ी माँग है। तुम क्या करोगे?",
    opts:[
      { label:"कुम्हार के साथ काम",           mg:[12,10], pts:2 },
      { label:"रंग-सजावट का काम",            mg:[12],    pts:2 },
      { label:"packing-बिक्री सँभालूँगा",       mg:[9,13],  pts:2 },
      { label:"online-order खोजूँगा",          mg:[9,7],   pts:2 }
    ] },
  { id:"q644", type:"story", band:[1,2,3], layer:2, set:7, udy:[251,312], img:"sick_care",
    text:"अस्पताल दूर है, मरीज़ ले जाना मुश्किल होता है। तुम क्या करोगे?",
    opts:[
      { label:"गाड़ी-सेवा की योजना",           mg:[8,6],   pts:2 },
      { label:"आपात-फ़ोन सूची बनाऊँगा",       mg:[18,24], pts:2 },
      { label:"पहली-सहायता सीखूँगा",          mg:[6,11],  pts:2 },
      { label:"दवा घर-पहुँच सेवा",            mg:[6,10],  pts:2 }
    ] },
  { id:"q645", type:"story", band:[1,2,3], layer:2, set:7, udy:[439,874], img:"ground_prep",
    text:"गाँव का खेल-मैदान बंजर पड़ा है। तुम क्या करोगे?",
    opts:[
      { label:"सफ़ाई-टोली बनाऊँगा",           mg:[10,20], pts:2 },
      { label:"सुबह कसरत-कक्षा",             mg:[22,6],  pts:2 },
      { label:"tournament करवाऊँगा",         mg:[22,10], pts:2 },
      { label:"स्टॉल-मौक़े सोचूँगा",            mg:[9,22],  pts:2 }
    ] },
  { id:"q646", type:"story", band:[1,2,3], layer:2, set:7, udy:[464,462], img:"chitthi_daftar",
    text:"सरकारी हुनर-कक्षा का form निकला है। तुम क्या करोगे?",
    opts:[
      { label:"ख़ुद form भरूँगा",              mg:[11,17], pts:2 },
      { label:"दोस्तों को बताऊँगा",            mg:[10],    pts:2 },
      { label:"form-सहायता सेवा शुरू",         mg:[17,9],  pts:2 },
      { label:"कौन-सा हुनर, पहले समझूँगा",     mg:[18,11], pts:2 }
    ] },
  { id:"q647", type:"story", band:[1,2,3], layer:2, set:7, udy:[61,362], img:"pickle_jar",
    text:"गाँव की औरतें अचार-पापड़ बेचना चाहती हैं। तुम क्या सँभालोगे?",
    opts:[
      { label:"समूह का हिसाब",               mg:[23,10], pts:2 },
      { label:"packing-label का काम",         mg:[13,12], pts:2 },
      { label:"दुकानों से सम्पर्क",             mg:[9,10],  pts:2 },
      { label:"online बेचने की कोशिश",        mg:[9,7],   pts:2 }
    ] },
  { id:"q648", type:"story", band:[1,2,3], layer:2, set:7, udy:[63,878], img:"cow_milk",
    text:"सूखा पड़ा है, पशु-चारा महँगा हो गया है। तुम क्या करोगे?",
    opts:[
      { label:"चारा-कटाई मशीन की जानकारी",    mg:[3,1],   pts:2 },
      { label:"दूसरी फ़सल की सलाह लूँगा",      mg:[1,18],  pts:2 },
      { label:"चारा-भंडारण की योजना",         mg:[8,1],   pts:2 },
      { label:"बीमा-योजना समझूँगा",           mg:[23,16], pts:2 }
    ] },
  { id:"q649", type:"story", band:[1,2,3], layer:2, set:7, udy:[182,428], img:"badi_imarat",
    text:"गाँव में मोबाइल-tower लगने की चर्चा है। तुम पहले क्या समझोगे?",
    opts:[
      { label:"कागज़-नियम",                  mg:[16,17], pts:2 },
      { label:"किराये का हिसाब",              mg:[23,18], pts:2 },
      { label:"सुरक्षा की जानकारी",            mg:[24,18], pts:2 },
      { label:"काम के मौक़े",                 mg:[9,10],  pts:2 }
    ] },
  { id:"q650", type:"story", band:[1,2,3], layer:2, set:7, udy:[464,481], img:"school_stall",
    text:"जिले में हुनर-प्रतियोगिता हो रही है। तुम क्या करोगे?",
    opts:[
      { label:"अपना हुनर दिखाऊँगा",           mg:[3,12],  pts:2 },
      { label:"टोली की तैयारी कराऊँगा",        mg:[10,11], pts:2 },
      { label:"सामान-इंतज़ाम सँभालूँगा",        mg:[8,24],  pts:2 },
      { label:"record-फ़ोटो रखूँगा",            mg:[18,12], pts:2 }
    ] }

  ],
  stories: [
    { id:"k_panchar", img:"tube_bubble", mg:[3], title:"राजू और पंचर",
      text:"राजू ने पहली बार चाचा को पंचर जोड़ते देखा। पहिए से हवा निकली, पानी में बुलबुले उठे — और छेद पकड़ा गया! राजू हँसा: 'यानी हर ख़राबी अपना पता ख़ुद बताती है, बस देखना आना चाहिए।' उस दिन से राजू हर बिगड़ी चीज़ को ग़ौर से देखता है।" },
    { id:"k_bagiya", img:"tamatar_tokri", mg:[1,9], title:"मीना की बगिया",
      text:"मीना ने आँगन के कोने में चार टमाटर के पौधे लगाए। रोज़ पानी, रोज़ गिनती। दो महीने में इतने टमाटर हुए कि घर में खाकर भी बच गए। माँ ने बचे टमाटर हाट में बेचे — मीना की पहली कमाई! मीना बोली: 'जो चीज़ रोज़ थोड़ा-थोड़ा बढ़े, वही एक दिन टोकरी भर देती है।'" },
    { id:"k_sabun", img:"soap_make", mg:[13], title:"गीता का साबुन",
      text:"गीता ने नानी के साथ नीम का साबुन बनाया। तेल, नीम और थोड़ा इंतज़ार — तीसरे दिन साबुन तैयार! चाची ने ख़ुशबू सूँघकर दो साबुन माँग लिए। गीता बोली: 'जो चीज़ रोज़ काम आती है, उसे बनाना भी हुनर है।'" },
    { id:"k_naav", img:"toy_boat", mg:[19,15], title:"आमिर की नाव",
      text:"आमिर की खिलौना-कार ख़राब पड़ी थी। उसने उसकी छोटी मोटर निकाली और एक डिब्बे की नाव में लगा दी — नाव पानी में ख़ुद चलने लगी! सब बच्चे देखते रह गए। आमिर बोला: 'जो पुर्ज़ों की बोली समझ ले, वह नई चीज़ भी बोल सकता है।'" }
  ]
};
