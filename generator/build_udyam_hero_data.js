#!/usr/bin/env node
/* ============================================================
   build_udyam_hero_data.js v1.0 (परत-4) — hero-नक़्शा generator
   स्रोत: assets/udyam_data.js (नाम+mg) → assets/udyam_hero_data.js
   हर n के लिए: मुख्य-चिह्न + 2 साथी-चिह्न (नाम-शब्दों से) + mg।
   img-खाना ख़ाली — भविष्य की असली-फ़ोटो मुहिम यहीं भरेगी
   (भरते ही पेज पर SVG की जगह फ़ोटो अपने-आप दिखेगा)।
   चलाना: node generator/build_udyam_hero_data.js
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const data = fs.readFileSync(path.join(ROOT, "assets/udyam_data.js"), "utf8");
const rows = [...data.matchAll(/\{"n": (\d+), "name": "((?:[^"\\]|\\.)*)"[^}]*?"mg": (\d+|null)/g)]
  .map(m => ({ n: +m[1], name: m[2].replace(/\\"/g, '"'), mg: m[3] === "null" ? 0 : +m[3] }));
if (rows.length !== 950) { console.error("❌ 950 नहीं मिले:", rows.length); process.exit(1); }

/* शब्द → चिह्न (क्रम मायने रखता — पहले विशिष्ट, बाद में सामान्य) */
const RULES = [
  ["कृत्रिम बुद्धिमत्ता|मशीन लर्निंग|एआई", "🧠"],
  ["फाउंड्री|फ़ाउंड्री.*चिप|अर्धचालक", "💾"],
  ["वित्तीय केंद्र|Financial Hub", "💰"],
  ["भांग|Hemp|स्टेविया", "🌿"], ["तार|Cable|Wire", "🔌"], ["फास्टनर|स्प्रिंग|बटन|Fastener", "🔩"],
  ["पुर्जे|पुर्ज़े|Parts", "🔧"], ["औद्योगिक पार्क|आर्थिक क्षेत्र|SEZ|Kaizen|कैज़न", "🏭"],
  ["काठी|हार्नेस|Saddle", "🐎"], ["शल्य|Surgical", "🩺"], ["गृह स्वास्थ्य|Home Health", "🏥"],
  ["IoT|डिजिटल ट्विन|Twin", "📶"], ["मार्केटिंग|Marketing", "📣"], ["एड-टेक|Ed-tech|शिक्षा-टेक", "📚"],
  ["खोज इंजन|\\bSearch\\b", "🔍"], ["मूवर्स|Movers", "🚚"], ["जेट|Jet", "✈️"], ["सीमा शुल्क|Customs", "🛂"],
  ["पेंशन|Pension|फंड|Fund", "💰"], ["बार/पब|Pub", "🍺"], ["विशेष शिक्षा|प्रमाणन|Certification|मूल्यांकन|Assessment", "🎓"],
  ["उत्सव|Festival|आदान-प्रदान|Exchange", "🎉"], ["पुनरुद्धार|Restoration", "🏛️"],
  ["मेपल|Maple", "🍁"], ["खाल|Fur", "🦫"], ["पिस्को|रम|Rum", "🍹"], ["स्वायत्त|Autonomous", "🚗"],
  ["पृथ्वी अवलोकन|Observation|भू-स्थानिक|Geospatial", "🛰️"], ["दीर्घायु|Longevity", "🧓"],
  ["कीट|Insect", "🦗"], ["साझा अर्थ|Sharing|Product-as", "🔄"], ["सचिव|Secretarial", "🧾"],
  ["अस्थायी रोजगार|Temporary", "🧑‍💼"], ["ठेला|रेहड़ी|खोमचा|Vending", "🛒"], ["क्राउडफंडिंग|Crowdfund", "🪙"],
  ["चावल|धान|Rice", "🍚"], ["गेहूँ|Wheat|आटा", "🌾"], ["मक्का|Maize|Corn", "🌽"], ["दलहन|दाल|Pulses", "🫘"],
  ["आम|Mango", "🥭"], ["केला|Banana", "🍌"], ["सेब|Apple", "🍎"], ["अंगूर|Grape|वाइन|Wine|शराब|शैंपेन", "🍇"],
  ["अनानास|संतरा|नींबू|Citrus", "🍊"], ["नारियल|Coconut|पाम|Palm", "🥥"], ["एवोकाडो|Avocado", "🥑"],
  ["ब्लूबेरी|स्ट्रॉबेरी|Berry", "🫐"], ["काजू|Cashew|बादाम|मूँगफली", "🥜"], ["कोको|चॉकलेट|Cocoa|Chocolate", "🍫"],
  ["कॉफ़ी|कॉफी|Coffee", "☕"], ["चाय|Tea", "🍵"], ["गन्ना|चीनी|Sugar", "🍬"], ["शहद|मधुमक्खी|Bee", "🍯"],
  ["मसाला|मिर्च|हल्दी|अदरक|इलायची|काली-मिर्च|केसर|Spice|Saffron", "🌶️"], ["वनीला|Vanilla|स्टीविया", "🌿"],
  ["फूल|Flori|Flower", "🌸"], ["सब्ज़ी|टमाटर|आलू|Vegetable|Tomato|Potato", "🥕"], ["क्विनोआ|Quinoa", "🌾"],
  ["मशरूम", "🍄"], ["जूट|Jute", "🧺"], ["रेशम|Silk|Seri", "🐛"], ["ऊन|Wool|अल्पाका|मेरिनो|भेड़", "🐑"],
  ["बकरी|Goat", "🐐"], ["सूअर|Pig", "🐖"], ["मुर्ग़ी|पोल्ट्री|अंडा|Poultry|आहार|Feed", "🐔"],
  ["गाय|भैंस|डेयरी|दूध|Dairy|Beef|मांस|Meat", "🐄"], ["कंगारू|Kangaroo", "🦘"],
  ["मछली|मत्स्य|झींगा|सैल्मन|टूना|लॉब्स्टर|सीफ़ूड|Fish|Shrimp|Seafood|Salmon|Aqua", "🐟"],
  ["समुद्री-शैवाल|Seaweed", "🪸"], ["खाद्य|भोजन|फ़ूड|Food|रसोई", "🍲"], ["बेकरी|Bakery|केक", "🥐"],
  ["अचार|Pickle|जैम", "🫙"], ["तेल-मिल|Oil Mill|खाद्य-तेल|Edible", "🫒"], ["डिब्बाबंद|Frozen|फ़्रोज़न", "🥫"],
  ["रेस्तराँ|ढाबा|Restaurant|कैटरिंग|Catering|फ़ास्ट-फ़ूड|स्ट्रीट-फ़ूड|फ़ूड-ट्रक|Cloud Kitchen", "🍽️"],
  ["कपास|Cotton|सूत|धागा|Yarn", "🧵"], ["हथकरघा|बुनाई|Handloom|Weav|खादी", "🪡"],
  ["वस्त्र|कपड़ा|गारमेंट|परिधान|Textile|Garment|डेनिम|होज़री|Knit|फ़ैशन|Fashion|Apparel|ड्रेस|Wear", "👕"],
  ["जूता|चप्पल|Footwear|Shoe", "👞"], ["चमड़ा|Leather|Tanning|बैग|Handbag", "👜"],
  ["हीरा|Diamond", "💎"], ["रत्न|जवाहरात|नीलम|ओपल|Gem|Sapphire|Opal", "💠"],
  ["सोना|Gold|गहना|आभूषण|ज्वेलरी|Jewel|चाँदी|Silver", "💍"], ["घड़ी|Watch", "⌚"],
  ["ऑटोमोटिव|Automotive", "🚗"], ["कार|Car ", "🚗"], ["ट्रक|बस|Truck|Bus", "🚚"], ["पिकअप", "🛻"],
  ["दो-पहिया|मोटरसाइकिल|स्कूटर|Two-wheeler|Motorcycle", "🏍️"], ["ई-रिक्शा|Rickshaw", "🛺"],
  ["ट्रैक्टर|Tractor|कृषि-यंत्र|Farm Equipment", "🚜"], ["\\bEV\\b|इलेक्ट्रिक-वाहन|Electric Vehicle", "🔋"],
  ["टायर|रबड़|Rubber|Tyre|लेटेक्स", "🛞"], ["वेल्डिंग|Welding", "🔧"],
  ["इस्पात|स्टील|Steel|लोहा|Iron|धातु|Metal|फ़ाउंड्री|Casting|शीट", "⚙️"], ["एल्युमीनियम|तांबा|Copper|पीतल|ज़िंक", "🔩"],
  ["मशीन|यंत्र|Machinery|Equipment|पंप|मोटर|Pump", "🛠️"], ["रोबोट|Robot|Cobot|ह्यूमनॉइड", "🤖"],
  ["ड्रोन|Drone", "🛸"], ["3D|थ्री-डी|Additive", "🖨️"],
  ["सेमीकंडक्टर|चिप|Chip|Semiconductor|फ़ाउंड्री|Wafer|EDA|फोटोनिक्स|Photonics|Quantum", "💾"],
  ["इलेक्ट्रॉनिक|Electronics|PCB|LED|डिस्प्ले|Display|TV", "📺"], ["मोबाइल|स्मार्टफ़ोन|फ़ोन|Phone", "📱"],
  ["कंप्यूटर|लैपटॉप|Laptop|Computer", "💻"],
  ["सॉफ़्टवेयर|Software|SaaS|\\bApp\\b|आईटी|कोडिंग|Coding|डेवलपमेंट", "👨‍💻"],
  ["\\bAI\\b|कृत्रिम|एआई|मशीन-लर्निंग|\\bML\\b", "🧠"], ["डेटा|Data|Analytics|क्लाउड|Cloud|BI", "📊"],
  ["साइबर|Cyber|Security-सॉफ़्ट|InfoSec", "🔐"], ["ब्लॉकचेन|क्रिप्टो|Crypto|Blockchain|Web3", "🪙"],
  ["गेमिंग|Gaming|Game|ई-स्पोर्ट्स|Esports", "🎮"], ["\\bAR\\b|\\bVR\\b|मेटावर्स|Metaverse", "🥽"],
  ["सौर|सोलर|Solar", "☀️"], ["पवन|Wind", "🌬️"], ["जल-विद्युत|Hydro|बाँध|Dam", "💧"],
  ["बैटरी|Battery|भंडारण|Storage-ऊर्जा", "🔋"], ["हाइड्रोजन|Hydrogen|अमोनिया|Ammonia", "⚗️"],
  ["परमाणु|Nuclear|Fusion", "☢️"], ["बिजली|ऊर्जा|पावर|Power|Energy|Transmission|Grid", "⚡"],
  ["तेल|पेट्रोल|Petroleum|Crude|रिफ़ाइनरी|Refinery|Oil", "🛢️"], ["गैस|LNG|CNG|Fracking", "🔥"],
  ["कोयला|Coal", "🪨"], ["खनन|खदान|Mining|अयस्क|Ore|लिथियम|कोबाल्ट|निकेल|बॉक्साइट|यूरेनियम|पोटाश|फ़ॉस्फ़ेट|दुर्लभ", "⛏️"],
  ["ग्रेनाइट|संगमरमर|Marble|पत्थर|Stone|रेत|Sand", "🪨"], ["नमक|Salt", "🧂"],
  ["निर्माण|Construction|ठेका|EPC", "🏗️"], ["घर|आवास|Housing|अपार्टमेंट|Apartment|Prefab", "🏠"],
  ["सड़क|Road|राजमार्ग|Highway", "🛣️"], ["पुल|Bridge|Flyover|सुरंग|Tunnel", "🌉"],
  ["सीमेंट|Cement|ईंट|Brick|टाइल", "🧱"], ["रियल-एस्टेट|संपत्ति|Estate|Property|REIT|Township|Land", "🏢"],
  ["इंटीरियर|Interior|Landscap", "🛋️"], ["स्मार्ट-सिटी|Smart City|Urban", "🌆"],
  ["होटल|रिसॉर्ट|Hotel|Resort|आतिथ्य", "🏨"], ["पर्यटन|टूर|Tourism|Travel|यात्रा|सफ़ारी|Safari|क्रूज़|Cruise", "🧳"],
  ["तीर्थ|हज|Pilgrimage|Hajj|धार्मिक-पर्यटन", "🕌"],
  ["अस्पताल|Hospital|क्लिनिक|Clinic|एम्बुलेंस|Ambulance", "🏥"],
  ["दवा|फ़ार्मा|Pharma|औषधि|Medicine|Generic|API|टीका|Vaccine", "💊"],
  ["चिकित्सा-उपकरण|Medical Device|सर्जिकल|Diagnostic", "🩺"], ["दंत|Dental", "🦷"], ["नेत्र|Eye|चश्मा|Eyewear", "👓"],
  ["आयुर्वेद|हर्बल|Herbal|होम्योपैथ|Yoga|वेलनेस|Wellness|\\bSpa\\b", "🧘"],
  ["बायोटेक|Biotech|जीन|Gene|स्टेम|Stem|DNA|Microbiome|Synthetic Bio|Cell", "🧬"],
  ["मानसिक|Mental", "🫶"], ["बुज़ुर्ग|Elder|वरिष्ठ", "🧓"],
  ["स्कूल|School|विद्यालय", "🏫"], ["कॉलेज|College|विश्वविद्यालय|University|MBA|पॉलिटेक्निक|ITI", "🎓"],
  ["कोचिंग|Coaching|ट्यूशन|Tutoring|Test Prep|प्रशिक्षण|Training|कौशल|Skill|Bootcamp|EdTech|MOOC|ऑनलाइन-शिक्षा", "📚"],
  ["भाषा|Language", "🗣️"], ["बैंक|Bank", "🏦"],
  ["बीमा|Insurance|Reinsurance", "🛡️"], ["निवेश|Investment|Mutual|शेयर|Stock|Equity|Venture|Wealth", "📈"],
  ["फ़िनटेक|Fintech|भुगतान|Payment|UPI|Neobank|BNPL|Remittance|Microfinance|मोबाइल-मनी", "💳"],
  ["वित्त|Finance|Financial", "💰"], ["\\bTax\\b|लेखा|Account|ऑडिट|Audit|\\bCA\\b|Bookkeep|Payroll", "🧾"],
  ["व्यापार|Trade|आयात|निर्यात|Import|Export|Commodity", "🌐"],
  ["सुपरमार्केट|Supermarket|किराना|स्टोर|Store|रिटेल|Retail|दुकान|मार्ट|Mart", "🛒"],
  ["ई-कॉमर्स|Ecommerce|ऑनलाइन-शॉपिंग|Fulfillment", "🛍️"], ["थोक|Wholesale|Distribution|डीलर", "📦"],
  ["लॉजिस्टिक|Logistics|ढुलाई|Freight|कूरियर|Courier|डिलीवरी|Delivery|Supply Chain|गोदाम|Warehous|Cold", "🚚"],
  ["रेल|Rail|मेट्रो|Metro|Tram|Hyperloop", "🚆"],
  ["विमान|हवाई|Airline|Aviation|Airport|Aircraft|Helicopter|Aerospace|MRO", "✈️"],
  ["जहाज़|Ship|बंदरगाह|Port|Marine|Maritime|Dredg|Ferry|Tanker|Container|Bulk", "🚢"],
  ["अंतरिक्ष|Space|सैटेलाइट|Satellite|ISRO|Lunar|Mars|Asteroid|Launch", "🚀"],
  ["टैक्सी|Taxi|Ride|कैब", "🚕"], ["पेट्रोल-पंप|Fuel Retail", "⛽"],
  ["फ़िल्म|Film|सिनेमा|Movie|हॉलीवुड|नॉलीवुड|OTT|टीवी-प्रोडक्शन|Documentary|VFX|एनिमेशन|Animation", "🎬"],
  ["संगीत|Music|Afrobeat|K-culture|गीत", "🎵"], ["नृत्य|Dance|सर्कस|Circus|कॉमेडी|Comedy|Perform", "🎭"],
  ["रेडियो|Radio|पॉडकास्ट|Podcast|ऑडियोबुक", "🎙️"], ["समाचार|News|पत्रिका|Magazine|Newsletter|Media", "📰"],
  ["प्रकाशन|Publish|किताब|Book|कॉमिक|Comic", "📖"], ["फ़ोटोग्राफ़ी|Photo|Stock", "📷"],
  ["यूट्यूब|YouTube|स्ट्रीमिंग|Streaming|Creator|Influencer|Content", "📹"], ["सोशल-मीडिया|Social Media", "💬"],
  ["क्रिकेट|Cricket|IPL", "🏏"], ["फ़ुटबॉल|Football|EPL", "⚽"], ["बास्केटबॉल|NBA", "🏀"], ["टेनिस|Tennis", "🎾"],
  ["ओलंपिक|Olympic|खेल|Sport|Athle|Stadium|Fantasy", "🏆"], ["रेसिंग|Racing|\\bF1\\b|NASCAR", "🏎️"],
  ["क़ानून|Law|विधिक|Legal|वकील|Arbitration|IP-|Patent|Compliance|E-discovery", "⚖️"],
  ["सुरक्षा|Security|गार्ड|Surveillance|Forensic|रक्षा|Defence|Defense|रडार|पनडुब्बी|Submarine", "🛡️"],
  ["अग्नि|Fire", "🧯"], ["आपदा|Disaster|Emergency|Recovery", "🚨"],
  ["रसायन|Chemical|क्षार|Acid|Dye|Pigment|Adhesive|Polymer|Resin|Specialty", "🧪"],
  ["पेंट|Paint|रंग-लेप|Coating", "🎨"], ["उर्वरक|Fertilizer|कीटनाशक|Pesticide|Agro-chem|Biofert|Biopest", "🌱"],
  ["साबुन|Soap|डिटर्जेंट|Detergent|शैम्पू|Shampoo|टूथपेस्ट|Oral|सौंदर्य|Cosmetic|Perfume|Skin", "🧴"],
  ["प्लास्टिक|Plastic|PVC|पाइप", "🧫"], ["पैकेजिंग|Packaging|डिब्बा|Box|Corrugated|Can|Flexible", "📦"],
  ["काग़ज़|Paper|Pulp", "📄"], ["काँच|कांच|Glass", "🪟"],
  ["लकड़ी|Wood|फ़र्नीचर|Furniture|प्लाईवुड|Plywood|Teak|Timber|सागौन", "🪵"], ["बाँस|Bamboo|Cork", "🎋"],
  ["हस्तशिल्प|Craft|शिल्प|कारीगर|Artisan|मधुबनी|वारली|Madhubani", "🖌️"],
  ["मूर्ति|Sculpture|Idol|पत्थर-कला", "🗿"], ["मिट्टी|Pottery|Ceramic|कुम्हार", "🏺"],
  ["कला|Art Gallery|चित्रकला|Mural|Glass Art", "🎨"], ["संग्रहालय|Museum|पुरातत्व|Archaeo|Antique|विरासत|Heritage", "🏛️"],
  ["जल|पानी|Water|Desalination|Sewage|Purif", "💧"],
  ["कचरा|Waste|रीसाइक|Recycl|Scrap|कबाड़|Upcycl|E-waste|Compost", "♻️"],
  ["जलवायु|Climate|कार्बन|Carbon|हरित|Green|Net-zero|ESG|Sustain|पर्यावरण|Environment|Biodiversity", "🌍"],
  ["मौसम|Weather", "🌦️"], ["महासागर|Ocean|Tidal|Deep-sea|समुद्री-ऊर्जा", "🌊"],
  ["मंदिर|Temple|चर्च|Church|धार्मिक|Religious|पूजा|अगरबत्ती|आध्यात्म|Spiritual|Faith", "🛕"],
  ["ज्योतिष|Astrology|टैरो|Tarot|वास्तु|Vastu|अंक", "🔮"],
  ["विवाह|Wedding|शादी|Matrimon|डेटिंग|Dating", "💐"],
  ["सैलून|Salon|नाई|Barber|केश", "💇"], ["धोबी|Laundry|Dry Clean", "🧺"],
  ["मोची|Cobbler", "🥿"], ["लोहार|Blacksmith", "🔨"],
  ["अंतिम-संस्कार|Funeral|Death", "🕊️"], ["पालतू|Pet", "🐕"],
  ["बच्चा|Baby|Kids|खिलौना|Toy", "🧸"], ["महिला-स्वच्छता|Feminine|Sanitary|Hygiene", "🧻"],
  ["सफ़ाई-सेवा|Housekeep|Cleaning|Fumigation|Pest", "🧹"],
  ["इवेंट|Event|आयोजन", "🎪"], ["मनोरंजन-पार्क|Theme Park|Amusement", "🎡"],
  ["NGO|संस्था|Charitable|Philanthrop|Humanitarian|Social Enterprise|Community|Cooperative", "🤝"],
  ["सरकार|Government|प्रशासन|Admin-सरकारी|Procurement|Census|Statistical|Revenue|Municipal|E-govern|Regulatory", "🏛️"],
  ["दूतावास|Embassy|वीज़ा|Visa|Migration", "🛂"],
  ["शोध|Research|अनुसंधान|R&D|प्रयोगशाला|Lab|Think Tank|Policy", "🔬"],
  ["Nano|नैनो|Material|Superconductor|Advanced", "⚛️"],
  ["भर्ती|Recruit|Staffing|HR|Executive Search|Outplacement|Gig|Freelanc|रोज़गार-सेवा", "🧑‍💼"],
  ["परामर्श|Consult|Advisory|Management|Strategy", "💼"],
  ["Market Research|सर्वे|Survey|Opinion|Consumer Research", "📋"],
  ["डिज़ाइन|Design|UX|UI|Graphic|Industrial Design|Product Design", "✏️"],
  ["टेलीकॉम|Telecom|5G|4G|Tower|Fiber|ISP|Undersea|GPS|Navigation|Broadband", "📡"],
  ["खेती|कृषि|Agri|Farm|Cultivation|Plantation|Organic|Vertical|Aquaponic|Hydroponic|Contract Farm|Savanna|Precision", "🌾"]
];

function pick(name){
  for (const [pat, e] of RULES) {
    try { if (new RegExp(pat, "i").test(name)) return e; } catch(_){}
  }
  return "🏭";
}

/* MG रंग-थीम (24): [आकाश-ऊपर, आकाश-नीचे, धरती] */
const PAL = {
  1:["#1B5E20","#2E7D32","#8D6E63"], 2:["#3E2723","#5D4037","#8D6E63"], 3:["#0B1F3A","#37474F","#546E7A"],
  4:["#4E342E","#6D4C41","#F9A825"], 5:["#4A148C","#7B1FA2","#F48FB1"], 6:["#004D40","#00796B","#B2DFDB"],
  7:["#0B1F3A","#1565C0","#00BCD4"], 8:["#01579B","#0277BD","#4FC3F7"], 9:["#B71C1C","#D84315","#FFB300"],
  10:["#263238","#455A64","#90A4AE"], 11:["#1A237E","#303F9F","#7986CB"], 12:["#BF360C","#E64A19","#FFCC80"],
  13:["#311B92","#512DA8","#B39DDB"], 14:["#0B1F3A","#1565C0","#F9A825"], 15:["#4A148C","#0B1F3A","#00E5FF"],
  16:["#263238","#37474F","#CFD8DC"], 17:["#1B5E20","#0B1F3A","#F5F7FA"], 18:["#006064","#00838F","#80DEEA"],
  19:["#212121","#424242","#F9A825"], 20:["#004D40","#2E7D32","#A5D6A7"], 21:["#E65100","#F57C00","#FFE0B2"],
  22:["#1B5E20","#43A047","#FFF176"], 23:["#0D47A1","#1976D2","#FFD54F"], 24:["#0B1F3A","#1565C0","#2E7D32"],
  0:["#0B1F3A","#1565C0","#2E7D32"]
};

const out = {};
const cnt = {};
for (const r of rows) {
  const e = pick(r.name);
  cnt[e] = (cnt[e]||0)+1;
  out[r.n] = { e: e, mg: r.mg, img: "" };
}
let js = "/* udyam_hero_data.js — generator-निर्मित (build_udyam_hero_data.js v1.0)\n" +
  "   हर उद्यम का hero-चिह्न + mg-थीम। img-खाना ख़ाली = SVG-दृश्य;\n" +
  "   असली-फ़ोटो मुहिम img में /assets/udyam-photos/... भरेगी → फ़ोटो अपने-आप दिखेगा।\n" +
  "   हाथ से न बदलें — सिर्फ़ generator से। */\n";
js += "window.ACS_UDYAM_HERO = " + JSON.stringify(out) + ";\n";
js += "window.ACS_UDYAM_HERO_PAL = " + JSON.stringify(PAL) + ";\n";
fs.writeFileSync(path.join(ROOT, "assets/udyam_hero_data.js"), js);

const def = cnt["🏭"] || 0;
const distinct = Object.keys(cnt).length;
console.log("✅ udyam_hero_data.js — 950 entries · अलग-अलग चिह्न:", distinct, "· fallback 🏭:", def);
const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
console.log("   सबसे-आम:", top.map(x=>x[0]+"×"+x[1]).join("  "));
