/* ============================================================
   /assets/aptitude_data.js — v3.0 (खेप-1+2+3: प्रश्न 1-98 · मूल भाषा: हिंदी)
   ACS Aptitude प्रश्न-भंडार (परत-3 data — एक चीज़ = एक जगह)
   ------------------------------------------------------------
   - प्रश्न-गिनती: 98 (32 पट्टी + 31 चित्र-चुनाव + 24 जोड़ी + 11 कहानी) + 4 कथाएँ
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
