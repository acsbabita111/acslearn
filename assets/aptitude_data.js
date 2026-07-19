/* ============================================================
   /assets/aptitude_data.js — v5.0 (खेप-1 से 5: प्रश्न 1-298 · मूल भाषा: हिंदी)
   ACS Aptitude प्रश्न-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - प्रश्न-गिनती: 298 (97 पट्टी + 76 चित्र-चुनाव + 81 जोड़ी + 44 कहानी) + 4 कथाएँ
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
