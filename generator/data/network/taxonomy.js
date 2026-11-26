/* ============================================================
   network/taxonomy.js v1.2 (परत-3, 25-Nov-2026, खेप N-3: Founder का आदेश "नेटवर्क में CSC सेंटर को उचित जगह पर लगा दो;
   अब टू व्हीलर और CSC, 2 तरह की सूची लाइव"। नई सूची csc (CSC केंद्र, बिहार, soft launch): अपनी ID-रूप (idRegex),
   एक तय श्रेणी (typeMode "fixed"), हर नाम का अलग पन्ना नहीं (recordPages: false; ज़िले के पन्ने पर उसकी जगह),
   स्थिति "सूचीबद्ध" (SECTOR_STATUS.listed), अपने अनुमत खाने (SECTOR_DATA.csc: officialCsc, rawBlock), और स्रोत-domain।
   IT-सर्वे वाली CSC-जैसी दुकानें (IT-05) IT में ही रहेंगी; यह सूची सार्वजनिक/सरकारी CSC-सूचियों से अलग आई है।
   v1.1 = ऑडिट N1-P0-01/02: SECTOR_DATA (Sector_Data_JSON की अनुमत
   सार्वजनिक कुंजियाँ) और VERIFY (सत्यापन का अधिकार: server का RM-रजिस्टर; अभी नहीं बना, इसलिए "सत्यापित" बंद)) :
   व्यावहारिक प्रशिक्षण नेटवर्क (Practical Training Network) का ढाँचा
   Founder के brief (22-Nov-2026): (1) नेटवर्क पोर्टल  (2) बिहार IT सेक्टर  (3) "नेटवर्क में 24 सेक्टर जुड़ेंगे"।
   क्रम: सेक्टर → श्रेणी → हुनर → राज्य → ज़िला → प्रखंड → फ़र्म → (उस्ताद, अलग) → सीखने वाले।
   यहाँ एक ही जगह: सेक्टर-रजिस्टर, श्रेणियाँ, हुनर-टैग, व्यवसाय के प्रकार, स्रोत के प्रकार, जाँच की स्थितियाँ।
   नया सेक्टर = SECTORS में एक पंक्ति + उसकी श्रेणियाँ/हुनर + batch; पन्ने और ढाँचा वही (24 तक)।
   नाम हिंदी (मूल) और English; आगे की भाषाएँ यहीं नई कुंजी से।

   पक्के नियम (Founder, 22-Nov-2026):
   1. सूची में नाम ≠ साझेदारी ≠ समर्थन ≠ प्रशिक्षण की पक्की व्यवस्था ≠ नौकरी की गारंटी।
   2. फ़र्म और उस्ताद अलग (firms / ustads / firmUstadLinks)। फ़र्म बिना उस्ताद, उस्ताद बिना फ़र्म जुड़ सकता है।
   3. "सत्यापित (Verified)" सिर्फ़ RM के सबूत से। स्रोत की मज़बूती (Confidence A/B/C) ≠ सत्यापन (A ≠ Verified);
      Confidence भीतरी है, सार्वजनिक फ़ाइल/पन्ने में कभी नहीं।
   4. प्रकाशन और सत्यापन अलग: Published = हाँ, Verification = जाँच बाक़ी, यह सामान्य हाल है।
   5. कोई नक़ली फ़र्म, फ़ोन, email, वेबसाइट, पता, निर्देशांक नहीं; ख़ाली खाना ख़ाली रहता है।
   6. कोई नई फ़ीस या ACS-कमीशन नहीं; उस्ताद और वर्कशॉप अपना हिस्सा आपस में तय करते हैं (मौजूदा नियम)।
   7. mg = ACS के 24 मास्टर-समूह (assets/mg_names.js) में से वह समूह, जिसमें इसी हुनर का ACS कोर्स/उद्यम दर्ज है।
   8. udyam = उसी सेक्टर के उद्यम-कार्ड का serial (assets/udyam_data.js)। Founder का सेक्टर-नियम (26-Nov-2026):
      हर नेटवर्क-सेक्टर 24 में से एक सेक्टर और एक उद्यम-कार्ड से जुड़ा हो (generator/data/sector_muhar.js; जाँच: dev_sector_niyam_check.js)।
      udyam: 0 = «उपरोक्त में कोई नहीं» (उस सेक्टर की सूची में कार्ड अभी नहीं; नाम मुहर की प्रतीक्षा-सूची में होना ज़रूरी)।
   आगे (ढाँचा तैयार, data बाद में): एक फ़र्म कई सेक्टर में (firmSectorLinks[]), शाखाएँ (parentFirmId, branchName)।
   ============================================================ */
"use strict";

/* ---------- सेक्टर-रजिस्टर ----------
   status: live = रिकॉर्ड प्रकाशित · survey = ढाँचा तैयार, सर्वे जारी (कोई रिकॉर्ड नहीं) · planned = आगे
   id = सेक्टर-कूट (batch-ID और रिकॉर्ड-ID में) · slug = पते में (बदलता नहीं)
   idPattern: {ST} = राज्य-उपसर्ग (BR), {DC} = ज़िला-कूट (KHG) · फ़र्म का नाम बदलने पर ID नहीं बदलती */
const SECTORS = {
  tw: { id: "TW", slug: "two-wheeler", mg: 3, udyam: 132, icon: "🏍️", status: "live",
        hi: "टू-व्हीलर (दोपहिया)", en: "Two Wheeler",
        hiPlace: "टू-व्हीलर वर्कशॉप व डीलर", enPlace: "Two Wheeler Workshops and Dealers",
        idPattern: "{ST}-{DC}-NNNN", typeMode: "map",
        course: { url: "/courses/hi/two-wheeler/", hi: "मोटरसाइकिल (टू-व्हीलर) सर्विसिंग व EV का मुफ़्त ऑनलाइन कोर्स", en: "Free online course: Motorcycle & Two-Wheeler Repair, Servicing and EV (in Hindi)" } },
  /* v1.2 (25-Nov-2026): CSC केंद्र। ID स्रोत-फ़ाइल की ही (BR-CSC-M00001, BR-CSC-A00001), कभी नहीं बदलती।
     recordPages: false = हर नाम का अलग पन्ना नहीं (7,000+ पन्ने GitHub Pages की 1 GB सीमा खा जाते); ज़िले के पन्ने पर हर नाम
     की अपनी जगह (#br-csc-m00001), वही उसका पक्का पता। नाम = VLE/केंद्र का नाम, स्रोत की वर्तनी में। */
  csc: { id: "CSC", slug: "csc", mg: 7, udyam: 0, icon: "🏛️", status: "listed",
         hi: "CSC (कॉमन सर्विस सेंटर)", en: "CSC (Common Service Centres)",
         hiPlace: "CSC केंद्र", enPlace: "CSC Centres",
         idRegex: "{ST}-CSC-[MA]\\d{5}", idHint: "{ST}-CSC-M00001 या {ST}-CSC-A00001", typeMode: "fixed", recordPages: false,
         course: { url: "/courses/hi/digital-mitra-basic/", hi: "डिजिटल मित्र (बुनियादी कौशल) का मुफ़्त ऑनलाइन कोर्स", en: "Free online course: Digital Mitra basic skills (in Hindi)" } },
  it: { id: "IT", slug: "it", mg: 7, udyam: 0, icon: "💻", status: "survey",
        hi: "सूचना प्रौद्योगिकी (IT)", en: "Information Technology",
        hiPlace: "IT सेवा की जगहें", enPlace: "Computer and IT Service Places",
        idPattern: "{ST}-IT-{DC}-NNNN", typeMode: "controlled", course: null }
};
const SECTOR_STATUS = {
  live:    { hi: "नेटवर्क उपलब्ध", en: "Network available" },
  survey:  { hi: "सर्वे जारी", en: "Survey in progress" },
  planned: { hi: "आगे जुड़ेगा", en: "Coming later" },
  listed:  { hi: "सूचीबद्ध · जाँच बाक़ी", en: "Listed · To Be Verified" }   /* v1.2: सार्वजनिक/सरकारी सूची से पूर्व-सूचीबद्ध (CSC) */
};

/* ---------- श्रेणियाँ ----------
   tw: types = स्रोत में लिखा "Workshop_Type" (हूबहू) → इसी श्रेणी में (typeMode "map")। नया प्रकार यहाँ जोड़े बिना रिकॉर्ड रोका (hold) जाता है।
   it: Primary_Category / Secondary_Categories इन्हीं कूटों (IT-01 …) या इन्हीं English नामों से। अनजान = hold। */
const CATEGORIES = {
  tw: [
    { id: "TW-01", hi: "अधिकृत डीलर व सर्विस", en: "Authorized dealer & service",
      types: ["Authorized Dealer/Service", "Authorized Sales & Service", "Authorized Service/Dealer", "Authorized Service / Dealer",
              "Authorized Dealer/Workshop", "Authorized Sub-Dealer / Service Point", "Authorized/Brand-linked Dealer-Service", "Authorized Branch / Service"] },
    { id: "TW-02", hi: "अधिकृत डीलर (शोरूम)", en: "Authorized dealer (showroom)",
      types: ["Authorized Dealer", "Authorized Showroom", "Associate Dealer"] },
    { id: "TW-03", hi: "अधिकृत सर्विस सेंटर", en: "Authorized service centre",
      types: ["Authorized Service Centre", "Authorized Service Center", "Authorized/Brand-linked Service Centre"] },
    { id: "TW-04", hi: "इलेक्ट्रिक (EV) स्टोर व डीलर", en: "Electric (EV) store & dealer",
      types: ["Authorized EV Store", "Authorized EV Dealer", "Authorized EV Showroom", "EV Dealer", "Authorized EV Sales & Service", "Dealer / EV",
              "Authorized Dealer / EV", "Electric Two-wheeler Dealer", "EV Service Centre", "Electric Scooter Dealer", "EV Dealer/Repair"] },
    { id: "TW-05", hi: "डीलर व दुकान", en: "Dealer & shop",
      types: ["Dealer/Service", "Motorcycle Dealer", "Dealer", "Motorcycle Dealer / Service", "Dealer/Service Point", "Dealer / Service",
              "Motorcycle Dealer / Workshop", "Dealer / Two-wheeler Repair & Service", "Motorcycle Dealer / Repair", "Second-hand Motorcycle Dealer",
              "Motorcycle Dealer/Workshop", "Dealer/Service/Parts", "Two-Wheeler Dealer", "Dealer / Service Point", "Motorcycle Shop",
              "Dealer / Motorcycle Service", "Motorcycle Dealer/Service", "Dealer / Repair", "Dealer / Full Service Workshop", "Two Wheeler Dealer",
              "Sub Dealer / Service-linked", "Dealer/Service Workshop", "Dealer / Repair Shop"] },
    { id: "TW-06", hi: "स्वतंत्र वर्कशॉप व मरम्मत", en: "Independent workshop & repair",
      types: ["Independent Workshop", "Motorcycle Repair Workshop", "Service Centre", "Independent Workshop / Service",
              "Independent Workshop / Used Bike Dealer", "Independent Workshop / Dealer", "Independent Workshop / Parts", "Independent Workshop / Spares",
              "Motorcycle Repair / Spares", "Auto Repair / Workshop", "Motorcycle Service / Parts", "Workshop/Service", "Workshop/Parts"] }
  ],
  /* IT: Founder का IT-brief (22-Nov-2026, धारा 4)। सिर्फ़ कोचिंग संस्थान, स्कूल/कॉलेज की लैब, सिर्फ़ सामान बेचने वाली दुकान
     अपने-आप नेटवर्क में नहीं (असली ग्राहक/सेवा-काम हो तभी; वरना आगे की "शिक्षा-संस्थान" परत में)।
     CCTV: सिर्फ़ जहाँ IT/नेटवर्क का काम बड़ा हो (बिजली वाले इंस्टॉलर दोहरे न गिनें)। */
  it: [
    { id: "IT-01", hi: "कंप्यूटर हार्डवेयर व मरम्मत", en: "Computer Hardware & Repair" },
    { id: "IT-02", hi: "प्रिंटर, स्कैनर व कॉपियर सेवा", en: "Printer / Scanner / Copier Services" },
    { id: "IT-03", hi: "नेटवर्किंग व कनेक्टिविटी", en: "Networking & Connectivity" },
    { id: "IT-04", hi: "CCTV व IP निगरानी (IT)", en: "CCTV / IP Surveillance IT" },
    { id: "IT-05", hi: "डिजिटल सेवा, साइबर व CSC", en: "Digital Service / Cyber / CSC" },
    { id: "IT-06", hi: "DTP, डिजिटल डिज़ाइन व दस्तावेज़", en: "DTP / Digital Design / Documentation" },
    { id: "IT-07", hi: "वेब, सॉफ़्टवेयर व ऐप बनाना", en: "Web / Software / App Development" },
    { id: "IT-08", hi: "डिजिटल मार्केटिंग व ई-कॉमर्स", en: "Digital Marketing & E-commerce" },
    { id: "IT-09", hi: "बिज़नेस IT, POS, बिलिंग व AMC", en: "Business IT / POS / Billing / AMC" },
    { id: "IT-10", hi: "डेटा, BPO व डिजिटाइज़ेशन", en: "Data / BPO / Digitisation" },
    { id: "IT-11", hi: "डेटा रिकवरी व स्टोरेज", en: "Data Recovery / Storage" },
    { id: "IT-12", hi: "उन्नत व विशेष IT सेवा", en: "Advanced / Specialized IT Services" }
  ],
  /* v1.2: CSC सूची की एक ही श्रेणी (batch का consts.primary)। */
  csc: [
    { id: "CSC-01", hi: "कॉमन सर्विस सेंटर (CSC)", en: "Common Service Centre (CSC)" }
  ]
};

/* ---------- व्यवसाय के प्रकार (IT: तय सूची; TW: स्रोत का लिखा, श्रेणी ऊपर के types से) ---------- */
const BUSINESS_TYPES = {
  it: [
    { id: "independent-shop", hi: "स्वतंत्र दुकान", en: "Independent Shop" },
    { id: "service-centre", hi: "सर्विस सेंटर", en: "Service Centre" },
    { id: "authorized-service-centre", hi: "अधिकृत सर्विस सेंटर", en: "Authorized Service Centre" },
    { id: "dealer-service", hi: "डीलर व सर्विस", en: "Dealer + Service" },
    { id: "digital-service-centre", hi: "डिजिटल सेवा केंद्र", en: "Digital Service Centre" },
    { id: "csc", hi: "CSC (कॉमन सर्विस सेंटर)", en: "CSC" },
    { id: "agency", hi: "एजेंसी", en: "Agency" },
    { id: "software-firm", hi: "सॉफ़्टवेयर फ़र्म", en: "Software Firm" },
    { id: "freelancer-studio", hi: "फ़्रीलांसर स्टूडियो", en: "Freelancer Studio" },
    { id: "bpo", hi: "BPO", en: "BPO" },
    { id: "system-integrator", hi: "सिस्टम इंटीग्रेटर", en: "System Integrator" },
    { id: "training-commercial", hi: "प्रशिक्षण के साथ असली ग्राहक-सेवा", en: "Training + Commercial Service" },
    { id: "other", hi: "अन्य", en: "Other" }
  ]
};

/* ---------- हुनर-टैग (practical skill / service tags): data से, पन्नों में लिखे नहीं; Admin आगे यहीं नए जोड़े ----------
   आज के TW-रिकॉर्ड में यह खाना ख़ाली है (स्रोत में नहीं था; गढ़ा नहीं गया)। */
const SKILL_TAGS = {
  tw: [
    ["general-repair", "General Bike Repair", "सामान्य बाइक मरम्मत"], ["engine", "Engine Repair", "इंजन मरम्मत"],
    ["electrical", "Electrical", "बिजली का काम (Electrical)"], ["fi-efi", "FI/EFI", "फ़्यूल इंजेक्शन (FI/EFI)"], ["brake", "Brake", "ब्रेक"],
    ["suspension", "Suspension", "सस्पेंशन"], ["tyre", "Tyre", "टायर"], ["washing", "Washing/Detailing", "धुलाई व चमकाई (Washing/Detailing)"],
    ["ev", "EV Two-Wheeler", "इलेक्ट्रिक दोपहिया (EV)"], ["diagnostics", "Diagnostics", "जाँच-मशीन (Diagnostics)"]
  ],
  it: [
    ["desktop-assembly", "Desktop Assembly", "डेस्कटॉप जोड़ना"], ["desktop-repair", "Desktop Repair", "डेस्कटॉप मरम्मत"],
    ["laptop-repair", "Laptop Repair", "लैपटॉप मरम्मत"], ["motherboard-repair", "Motherboard Repair", "मदरबोर्ड मरम्मत"],
    ["ram-upgrade", "RAM Upgrade", "RAM बदलना"], ["ssd-upgrade", "SSD Upgrade", "SSD बदलना"],
    ["windows-install", "Windows Installation", "Windows इंस्टॉल करना"], ["linux-install", "Linux Installation", "Linux इंस्टॉल करना"],
    ["software-install", "Software Installation", "सॉफ़्टवेयर इंस्टॉल करना"], ["virus-cleanup", "Virus/Malware Cleanup", "वायरस/मैलवेयर हटाना"],
    ["data-backup", "Data Backup", "डेटा बैकअप"], ["data-recovery", "Data Recovery", "डेटा रिकवरी"],
    ["printer-repair", "Printer Repair", "प्रिंटर मरम्मत"], ["scanner-repair", "Scanner Repair", "स्कैनर मरम्मत"],
    ["photocopier-service", "Photocopier Service", "फ़ोटोकॉपियर सेवा"], ["cartridge-refilling", "Cartridge Refilling", "कार्ट्रिज भरना"],
    ["lan-setup", "LAN Setup", "LAN लगाना"], ["wifi-setup", "Wi-Fi Setup", "Wi-Fi लगाना"],
    ["router-config", "Router Configuration", "राउटर सेटिंग"], ["network-troubleshooting", "Network Troubleshooting", "नेटवर्क की ख़राबी ढूँढना"],
    ["structured-cabling", "Structured Cabling", "नेटवर्क की तार-व्यवस्था (Structured Cabling)"], ["ip-cctv", "IP CCTV", "IP CCTV"],
    ["dvr-nvr", "DVR/NVR Setup", "DVR/NVR सेटिंग"], ["remote-cctv", "Remote CCTV Configuration", "दूर से CCTV देखने की सेटिंग"],
    ["hindi-typing", "Hindi Typing", "हिंदी टाइपिंग"], ["english-typing", "English Typing", "अंग्रेज़ी टाइपिंग"],
    ["dtp", "DTP", "DTP"], ["photoshop", "Photoshop", "फ़ोटोशॉप (Photoshop)"], ["coreldraw", "CorelDRAW", "कोरल ड्रॉ (CorelDRAW)"],
    ["pdf-processing", "PDF Processing", "PDF का काम"], ["document-scanning", "Document Scanning", "दस्तावेज़ स्कैन करना"],
    ["online-forms", "Online Form Services", "ऑनलाइन फ़ॉर्म भरना"], ["csc-services", "CSC Services", "CSC सेवाएँ"],
    ["website-dev", "Website Development", "वेबसाइट बनाना"], ["wordpress", "WordPress", "वर्डप्रेस (WordPress)"],
    ["web-hosting", "Web Hosting", "वेब होस्टिंग"], ["domain-management", "Domain Management", "डोमेन का काम"],
    ["business-email", "Business Email", "बिज़नेस ईमेल"], ["software-dev", "Software Development", "सॉफ़्टवेयर बनाना"],
    ["mobile-app-dev", "Mobile App Development", "मोबाइल ऐप बनाना"], ["digital-marketing", "Digital Marketing", "डिजिटल मार्केटिंग"],
    ["seo", "SEO", "SEO"], ["social-media", "Social Media Management", "सोशल मीडिया संभालना"],
    ["ecommerce-listing", "E-commerce Listing", "ई-कॉमर्स पर सामान चढ़ाना"], ["marketplace-management", "Marketplace Management", "मार्केटप्लेस संभालना"],
    ["pos-setup", "POS Setup", "POS सेटअप"], ["barcode-system", "Barcode System", "बारकोड सिस्टम"], ["billing-software", "Billing Software", "बिलिंग सॉफ़्टवेयर"],
    ["tally-support", "Tally Setup Support", "Tally सेटअप"], ["erp-support", "ERP Support", "ERP सहायता"], ["computer-amc", "Computer AMC", "कंप्यूटर AMC"],
    ["data-entry", "Data Entry", "डेटा एंट्री"], ["digitisation", "Digitisation", "डिजिटाइज़ेशन"], ["bpo", "BPO", "BPO"],
    ["server-admin", "Server Administration", "सर्वर संभालना"], ["cloud-services", "Cloud Services", "क्लाउड सेवाएँ"], ["gis", "GIS", "GIS"], ["cad", "CAD", "CAD"]
  ]
};
for (const k of Object.keys(SKILL_TAGS)) SKILL_TAGS[k] = SKILL_TAGS[k].map(([id, en, hi]) => ({ id, en, hi }));

/* ---------- स्रोत के प्रकार ----------
   domains = स्रोत-पते का domain (www. के बिना) → प्रकार। Excel-साँचे के Source_Type में इन्हीं कूटों में से एक, या ख़ाली (तब domain से)।
   जो domain सूची में नहीं, वह OTHER_PUBLIC (import-रिपोर्ट में नाम छपता है)। स्रोत ≠ सत्यापन। */
const SOURCE_TYPES = {
  OFFICIAL_OEM:       { hi: "कंपनी (OEM) की आधिकारिक साइट", en: "Official OEM website",
                        domains: ["dealers.tvsmotor.com", "dealers.royalenfield.com", "service.royalenfield.com", "olaelectric.com", "komaki.in"] },
  GOOGLE_MAPS:        { hi: "Google Maps / Google listing", en: "Google Maps / Google listing", domains: ["google.com", "maps.google.com", "g.page", "maps.app.goo.gl"] },
  AUTO_PORTAL:        { hi: "वाहन पोर्टल", en: "Automobile portal",
                        domains: ["zigwheels.com", "bikeji.in", "bikewale.com", "auto.hindustantimes.com", "drivespark.com", "bikedekho.com",
                                  "autocarindia.com", "okbike.in", "bikekharido.in", "bikes4sale.in", "autoyas.com"] },
  BUSINESS_DIRECTORY: { hi: "व्यापार निर्देशिका (Directory)", en: "Business directory",
                        domains: ["justdial.com", "bharatibiz.com", "magicpin.in", "yappe.in", "chotu.com", "cybo.com", "onefivenine.com",
                                  "goforsearch.com", "findglocal.com", "alwaysdial.com", "indiamart.com", "sulekha.com"] },
  BRAND_DIRECTORY:    { hi: "ब्रांड की सूची (सर्विस-पॉइंट)", en: "Brand directory", domains: [] },
  CSC_DIRECTORY:      { hi: "CSC की सूची", en: "CSC directory", domains: ["digiforum.space", "goodreturns.in", "gramvikas.nskmultiservices.in"] },
  FIRM_WEBSITE:       { hi: "फ़र्म की अपनी वेबसाइट", en: "Firm website",
                        domains: ["yuvahonda.com", "ashishmotors.in", "maadurgeyhonda.com", "maashaktihonda.in", "suzukimotorcyclelaheriasarai.com",
                                  "skhondajamui.com", "tamannabajajlkr.in", "sunrisemotor.my.canva.site", "maharanihonda.com"] },
  GOVERNMENT:         { hi: "सरकारी पोर्टल", en: "Government portal", domains: ["dlrs.bihar.gov.in", "tele-law.in"] },
  RM_FIELD:           { hi: "ACS RM की ज़मीनी जाँच", en: "ACS RM field verification", domains: [] },
  OTHER_PUBLIC:       { hi: "दूसरा सार्वजनिक स्रोत", en: "Other public source", domains: ["youtube.com", "dailyepaper.b-cdn.net", "kochas.in"] }
};

/* ---------- जाँच की स्थिति: भीतरी (9) → सार्वजनिक (2) ----------
   सार्वजनिक नाम पूरे पोर्टल में यही; "जाँच बाक़ी" कभी "नक़ली" का अर्थ नहीं देता। null = सार्वजनिक सूची में नहीं। */
const STATUS = {
  internal: {
    TO_BE_VERIFIED: "TBV", VERIFIED: "VERIFIED", VERIFIED_WITH_CORRECTION: "VERIFIED", CORRECTION_PENDING: "TBV",
    IDENTITY_REVIEW: "TBV", NOT_FOUND: null, CLOSED: null, REJECTED: null, HIDDEN: null
  },
  public: {
    VERIFIED: { icon: "✅", hi: "सत्यापित", en: "Verified",
                hiLong: "ACS के RM ने इस जगह की आज की पहचान और पता अपनी जाँच से पक्का किया है।",
                enLong: "An ACS RM has verified the current identity and location of this place." },
    TBV:      { icon: "◷", hi: "जाँच बाक़ी", en: "To Be Verified",
                hiLong: "यह जगह सार्वजनिक/व्यावसायिक स्रोत से सूची में जुड़ी है। ACS की ज़मीनी जाँच अभी बाक़ी है।",
                enLong: "This place was pre-listed from a public or business source. ACS field verification is still pending." }
  }
};

/* सीखने की व्यवस्था (फ़र्म के सूची में होने से अपने-आप नहीं; import पर हमेशा UNKNOWN) */
const TRAINING = {
  UNKNOWN:          { hi: "अभी पता नहीं", en: "Not known yet" },
  AVAILABLE:        { hi: "उपलब्ध", en: "Available" },
  NOT_AVAILABLE:    { hi: "उपलब्ध नहीं", en: "Not available" },
  CONTACT_REQUIRED: { hi: "फ़र्म से पूछकर पता करें", en: "Ask the firm" }
};

/* ख़ाली नतीजे का संदेश (IT-brief धारा 24): "यहाँ कोई फ़र्म नहीं" कभी नहीं */
const EMPTY = {
  hi: "इस क्षेत्र के लिए अभी कोई सूचीबद्ध फ़र्म उपलब्ध नहीं है। ACS नेटवर्क सर्वे लगातार अपडेट किया जा रहा है।",
  en: "No listed firm is available for this area yet. The ACS network survey is being updated continuously."
};

/* Sector_Data_JSON (हर सेक्टर का अतिरिक्त खाना) में सिर्फ़ यही कुंजियाँ सार्वजनिक हो सकती हैं (ऑडिट N1-P0-01: allowlist)।
   कोई और कुंजी (जैसे Email, Notes, RM_Owner, guardian_mobile), नेस्टेड object/array, या पाठ में email/फ़ोन = रिकॉर्ड "रोककर रखा"
   (प्रकाशित नहीं)। प्रकार: enum (values में से) · text (≤120 अक्षर, email/फ़ोन नहीं) · bool · int (min-max)।
   default = कुंजी न दी हो तो यही मान। नया खाना = Founder/सर्वे-टीम की मंज़ूरी से यहाँ एक पंक्ति। */
const SECTOR_DATA = {
  tw: { vehicleType: { type: "enum", values: ["TWO_WHEELER"], default: "TWO_WHEELER" } },
  it: {},   /* IT के लिए अभी कोई अतिरिक्त सार्वजनिक खाना मंज़ूर नहीं */
  /* v1.2 (CSC, ChatGPT का data-नियम 25-Nov-2026): officialCsc = "Official CSC" निशान, सिर्फ़ जहाँ स्रोत-फ़ाइल में
     official_csc_label_allowed = YES (सरकारी स्रोत); rawBlock = स्रोत में लिखा प्रखंड, वर्तनी जस-की-तस (दिखता तब, जब मिलाया
     प्रखंड इससे अलग हो या प्रखंड अभी तय न हो)। */
  csc: { officialCsc: { type: "bool", default: false }, rawBlock: { type: "text" } }
};

/* "सत्यापित (Verified)" का अधिकार (ऑडिट N1-P0-02): सिर्फ़ server पर बना, अनुमोदन-श्रृंखला से पास RM-सत्यापन रजिस्टर
   (RM का सबूत, उसी फ़र्म का, अंतिम मुहर के साथ)। वह रजिस्टर अभी नहीं बना: registry = null।
   तब तक importer किसी भी Excel/CSV के "Verified"/"Verified with correction" को नहीं मानता (= "जाँच बाक़ी" + सूचना),
   और build_network.js व जाँच-यंत्र किसी भी "सत्यापित" रिकॉर्ड पर रुक जाते हैं। रजिस्टर से मिलान का code उसी के साथ
   अलग खेप में बनेगा (उससे पहले registry भरने पर importer रुकता है)। "सत्यापित फ़र्म" ≠ "ACS-स्वीकृत प्रशिक्षण-जगह"। */
const VERIFY = { registry: null };

module.exports = { SECTORS, SECTOR_STATUS, CATEGORIES, BUSINESS_TYPES, SKILL_TAGS, SOURCE_TYPES, STATUS, TRAINING, EMPTY, SECTOR_DATA, VERIFY };
