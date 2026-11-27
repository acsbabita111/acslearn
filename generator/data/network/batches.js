/* ============================================================
   network/batches.js v1.3 (परत-3, 27-Nov-2026, खेप N-6: BIHAR-IT-001, बिहार की IT-सूची (ChatGPT की Publication-Ready CSV, 1,019 नाम);
   नए खाने: categoryMap (स्रोत में लिखा काम → ACS श्रेणी; जो नाम इस नक़्शे में नहीं, वह रिकॉर्ड रोककर रखा जाता है) और pinGhar
   (PIN का ज़िला ACS के पिन-घर, यानी India Post और सरकारी LGD, से मिलाकर रिपोर्ट में गिनती; बेमेल PIN नहीं छपता));
   v1.2 = 25-Nov-2026, खेप N-3.1: ChatGPT ऑडिट CSC-01/02: addressDropParts, addressUrlAsSource, notAddress के
   4 और रूप; v1.1 = 25-Nov-2026, खेप N-3: BIHAR-CSC-001, बिहार के CSC केंद्र, soft launch; v1.0 = 22-Nov-2026,
   खेप N-1) : नेटवर्क के import-batch का रजिस्टर + Excel-साँचे के कॉलम
   हर import = एक batch-ID (जैसे BIHAR-TW-001, BIHAR-IT-001)। वापसी (rollback) और जाँच (audit) इसी से।
   cols = स्रोत-शीट के कॉलम का नाम → नेटवर्क-खाना। जो कॉलम cols में नहीं, वह कभी सार्वजनिक नहीं होता।
   सिर्फ़ भीतरी (internal) खाने: स्रोत की मज़बूती (Confidence), RM-क़तार, प्राथमिकता, पहचान-जाँच, email, टिप्पणी।
   ये सार्वजनिक फ़ाइल में कभी नहीं जाते; चाहें तो import_network.js --internal-out से अलग (repo से बाहर) फ़ाइल।
   नया batch = नई पंक्ति। Two-Wheeler की पुरानी शीट के अपने कॉलम-नाम हैं; आगे के सब सेक्टर (IT …) एक ही
   साँचे (TEMPLATE_COLS, फ़ाइल ACS-Network-Import-Template.xlsx) से आएँगे।
   ============================================================ */
"use strict";

/* Excel-साँचा (Two-Wheeler और IT दोनों के लायक़)। Source2_/Source3_ = दूसरा/तीसरा स्रोत (एक फ़र्म, कई स्रोत)। */
const TEMPLATE_COLS = {
  id: "Record_ID", sectorCode: "Sector_ID", state: "State", district: "District", block: "Block", locality: "Locality",
  name: "Firm_Name", primary: "Primary_Category", secondary: "Secondary_Categories", skills: "Practical_Skill_Tags",
  btype: "Business_Type", brand: "Brand_OEM", address: "Address", pin: "PIN", phone: "Phone", website: "Website",
  lat: "Latitude", lng: "Longitude",
  s1name: "Source_Name", s1type: "Source_Type", s1url: "Source_URL", s1date: "Source_Checked_Date", s1fields: "Source_Field_Support",
  s2name: "Source2_Name", s2type: "Source2_Type", s2url: "Source2_URL", s2date: "Source2_Checked_Date", s2fields: "Source2_Field_Support",
  s3name: "Source3_Name", s3type: "Source3_Type", s3url: "Source3_URL", s3date: "Source3_Checked_Date", s3fields: "Source3_Field_Support",
  acsStatus: "ACS_Status", verStatus: "Verification_Status", evidence: "Evidence_Ref", verDate: "Verification_Date",
  parent: "Parent_Firm_ID", branch: "Branch_Name", sectorData: "Sector_Data_JSON"
};
const TEMPLATE_INTERNAL = ["Email", "Confidence", "Notes"];
/* साँचे के हर कॉलम का अर्थ (ACS-Network-Import-Template.xlsx की "कॉलम" शीट यहीं से बनती है) */
const TEMPLATE_HELP = {
  Record_ID: "ज़रूरी, कभी नहीं बदलता। TW: BR-KHG-0001 · IT: BR-IT-00001", Sector_ID: "ज़रूरी: TW या IT (आगे के सेक्टर taxonomy.js से)",
  State: "ज़रूरी: Bihar", District: "ज़रूरी: ज़िले का English नाम (जैसे Khagaria)", Block: "ज़रूरी: प्रखंड", Locality: "इलाक़ा",
  Firm_Name: "ज़रूरी", Primary_Category: "ज़रूरी: IT-01 … IT-14 (या उसका English नाम)", Secondary_Categories: "कई हों तो ; से अलग (IT-02; IT-03)",
  Practical_Skill_Tags: "taxonomy के टैग, ; से अलग (Laptop Repair; Printer Repair)", Business_Type: "तय सूची में से (Independent Shop, Service Centre …)",
  Brand_OEM: "कई हों तो / से अलग", Address: "पूरा पता", PIN: "6 अंक", Phone: "10 अंक का मोबाइल या 0 वाला landline; कई हों तो , से",
  Email: "भीतरी: वेबसाइट पर नहीं छपता", Website: "http(s) पता", Latitude: "पक्का हो तभी, वरना ख़ाली", Longitude: "पक्का हो तभी, वरना ख़ाली",
  Source_Name: "जैसे Justdial", Source_Type: "OFFICIAL_OEM, GOOGLE_MAPS, BUSINESS_DIRECTORY, BRAND_DIRECTORY, CSC_DIRECTORY, FIRM_WEBSITE, GOVERNMENT, OTHER_PUBLIC (ख़ाली = domain से)",
  Source_URL: "http(s) पता, अक्षरशः", Source_Checked_Date: "YYYY-MM-DD", Source_Field_Support: "यह स्रोत किन खानों का सबूत है: name; address; phone …",
  Source2_Name: "दूसरा स्रोत (वैकल्पिक)", Source2_Type: "", Source2_URL: "", Source2_Checked_Date: "", Source2_Field_Support: "",
  Source3_Name: "तीसरा स्रोत (वैकल्पिक)", Source3_Type: "", Source3_URL: "", Source3_Checked_Date: "", Source3_Field_Support: "",
  Confidence: "भीतरी: A / B / C (A ≠ Verified)", ACS_Status: "To Be Verified (RM-सबूत न हो तो हमेशा यही)",
  Verification_Status: "To Be Verified / Verified / Verified with correction / Correction pending / Identity review / Not found / Closed / Rejected / Hidden",
  Evidence_Ref: "Verified के लिए ज़रूरी: RM-सबूत का हवाला", Verification_Date: "Verified के लिए ज़रूरी: YYYY-MM-DD",
  Parent_Firm_ID: "शाखा हो तो मुख्य फ़र्म का Record_ID", Branch_Name: "शाखा का नाम", Sector_Data_JSON: "सेक्टर के अपने खाने, JSON में (वैकल्पिक)",
  Notes: "भीतरी टिप्पणी"
};

const BATCHES = {
  "BIHAR-TW-001": {
    sector: "tw", state: "bihar", importedOn: "2026-11-22",
    source: "ACS-Two-Wheeler-Bihar-v5.1-38-DISTRICT-RM-PACKETS-COMPANION.xlsx", sheet: "All District Packets",
    expect: { records: 857, districts: 38 },
    cols: {
      id: "Record_ID", district: "District", block: "Block", locality: "Locality", name: "Workshop_Firm",
      brand: "Brand_OEM", type: "Workshop_Type", address: "Address", pin: "PIN", phone: "Phone", s1url: "Source_URL",
      acsStatus: "ACS_Status", verStatus: "Final_RM_State", evidence: "Evidence_Ref", verDate: "Verification_Date"
    },
    internalCols: ["Packet_ID", "Execution_Order", "Email", "Confidence", "RM_Work_Class", "Priority", "Execution_Route",
                   "Identity_Review", "RM_Owner", "Attempt_Status", "Operation", "Geography", "Service_Scope"]
  },
  /* v1.1 (25-Nov-2026): बिहार के CSC केंद्र (soft launch)। स्रोत = portal_records_soft_launch.csv (ChatGPT-शोध, Founder ने 25-Nov को
     भेजी; 7,449 पंक्तियाँ; repo में नहीं रखी जाती, Two-Wheeler की Excel जैसी)। स्रोत-फ़ाइल कभी बदली नहीं जाती: हर सुधार
     आगे RM की overlay-फ़ाइल से (अलग खेप)। नाम और पता स्रोत की वर्तनी में।
     सार्वजनिक: नाम, ज़िला, प्रखंड (मिला हो तो), स्रोत का प्रखंड, पता, PIN, स्रोत-कड़ी, "Official CSC" (सिर्फ़ YES पर)।
     कभी सार्वजनिक नहीं: phone, email (इस फ़ाइल में ख़ाली भी हैं), source_layer, source_authority, record_origin और RM/प्रशिक्षण के खाने।
     consts.primary = एक ही श्रेणी। publishCol = portal_publish YES न हो तो सार्वजनिक सूची में नहीं।
     unmappedBlock = canonical_block ख़ाली पर स्रोत का प्रखंड (rawBlock) हो, तो ज़िले के पन्ने के "प्रखंड-मिलान बाक़ी" हिस्से में।
     notAddress = पते के खाने में पता नहीं, शोध की टिप्पणी (जैसे "Source row/rank 3 on block CSC directory."): छपती नहीं (गिनती रिपोर्ट में)।
     expect.rows = स्रोत की पंक्तियाँ (ChatGPT का पक्का आँकड़ा 7,449: बेमेल हो तो import रुकता है)। */
  "BIHAR-CSC-001": {
    sector: "csc", state: "bihar", importedOn: "2026-11-25", source: "portal_records_soft_launch.csv",
    expect: { rows: 7449, records: 7437, districts: 38 },   /* 7,449 में 12 रोककर रखे (पते/नाम में 10+ अंक, या प्रखंड ही नहीं) */
    consts: { primary: "CSC-01" },
    cols: {
      id: "record_id", state: "state", district: "district", block: "canonical_block", name: "vle_name",
      address: "address", pin: "pin", s1url: "source_url", acsStatus: "acs_status"
    },
    sectorDataCols: { rawBlock: { col: "raw_block" }, officialCsc: { col: "official_csc_label_allowed", map: { YES: true, NO: false } } },
    publishCol: { col: "portal_publish", yes: "YES" },
    unmappedBlock: "rawBlock",
    notAddress: ["^Source row/rank \\d+ on block CSC directory\\.?$", "^Address on file$", "nearby centres$", "^PNB row:",
                 /* v1.2: शोध की और टिप्पणियाँ (11 रिकॉर्ड) और अकेला URL */
                 "^Source (row |address )?(explicitly )?says\\b", "^Listed at SNo \\d+", "^Goodreturns .{1,60} CSC list:", "^https?://\\S+$"],
    /* v1.2 (CSC-01): पते के कॉमा-टुकड़े जो सिर्फ़ "null" हों, या "नाम-" जिसके आगे कुछ नहीं/null (जैसे "District-null", "State-") */
    addressDropParts: ["^\\s*(null|undefined|none|nil|n/?a)\\s*$", "^\\s*[A-Za-z][A-Za-z /]{0,30}-\\s*(null|undefined|none|nil|n/?a)?\\s*$"],
    /* v1.2 (CSC-02): स्रोत-खाने में URL नहीं (जैसे "71"), पते के खाने में सिर्फ़ URL = कॉलम खिसका; वही URL स्रोत */
    addressUrlAsSource: true,
    internalCols: ["phone", "email", "source_layer", "source_authority", "rm_verification", "training_availability", "workshop_commitment",
                   "block_mapping_status", "record_origin", "source_spelling_preserved"]
  },
  /* v1.3 (27-Nov-2026): बिहार की IT-सूची। स्रोत = ACS-Bihar-IT-Publication-Ready-v1.0.csv (ChatGPT का तैयार किया, Founder ने 27-Nov को भेजा;
     1,019 पंक्तियाँ = मास्टर-फ़ाइल के 1,075 में से "READY_UNVERIFIED"; 56 "HOLD" इस फ़ाइल में हैं ही नहीं, वे सार्वजनिक नहीं होते)।
     स्रोत-फ़ाइल repo में नहीं रखी जाती और कभी बदली नहीं जाती: हर सुधार आगे RM की overlay-फ़ाइल से।
     सार्वजनिक: नाम, काम की श्रेणी, ज़िला, प्रखंड, पता, PIN, दुकान का फ़ोन (स्रोत में लिखा), स्रोत की कड़ियाँ (1 से 3)।
     कभी सार्वजनिक नहीं: email (इस फ़ाइल में सब ख़ाली), evidence_grade (स्रोत की मज़बूती A/B/बिना-श्रेणी: A ≠ सत्यापित), pin_check,
     geo_mapping_status, rm_verification, training_availability, source_batch, और LGD के कूट (स्रोत ने ख़ुद "provisional" कहा है)।
     categoryMap: स्रोत के service_category का पहला हिस्सा (" | " से पहले) → [मुख्य श्रेणी, दूसरी श्रेणियाँ…]। " | " के बाद का ब्योरा
     (जैसे "Handset repair") छपता नहीं। नक़्शे में हर नाम अक्षरशः; नया नाम आए तो वह रिकॉर्ड रोककर रखा जाता है, जब तक यहाँ पंक्ति न जुड़े।
     expect.rows = स्रोत की पंक्तियाँ (ChatGPT का पक्का आँकड़ा 1,019: बेमेल हो तो import रुकता है)। */
  "BIHAR-IT-001": {
    sector: "it", state: "bihar", importedOn: "2026-11-27", source: "ACS-Bihar-IT-Publication-Ready-v1.0.csv",
    expect: { rows: 1019, records: 1019, districts: 38 },
    cols: {
      id: "firm_id", district: "district", block: "block", name: "firm_name", primary: "service_category",
      address: "address", pin: "pin", phone: "business_phone",
      s1url: "source_url", s1date: "source_date", s2url: "secondary_source_url", s3url: "additional_source_url", acsStatus: "acs_status"
    },
    pinGhar: true,
    categoryMap: { split: " | ", map: {
      "Mobile Repair": ["IT-13"], "Mobile repair": ["IT-13"], "Mobile repair / service": ["IT-13"], "Mobile / IT Device Service": ["IT-13"],
      "Mobile Service": ["IT-13"], "Mobile Repair / Service Lead": ["IT-13"], "Phone Repair": ["IT-13"], "Authorised Mobile Repair": ["IT-13"],
      "Computer / laptop repair": ["IT-01"], "Computer Repair": ["IT-01"], "Computer/laptop": ["IT-01"], "Computer peripherals repair": ["IT-01"],
      "Computer / Laptop Repair": ["IT-01"], "Laptop Repair": ["IT-01"], "Computer & Laptop Repair": ["IT-01"], "Laptop repair": ["IT-01"],
      "Computer repair": ["IT-01"], "Computer / CPU Repair": ["IT-01"], "Laptop Service": ["IT-01"], "Laptop / Computer Repair": ["IT-01"],
      "Computer Service": ["IT-01"], "Computer Support": ["IT-01"],
      "TV / LED repair": ["IT-14"], "TV / LED Electronics Repair": ["IT-14"], "Electronics Repair": ["IT-14"], "Electronics repair": ["IT-14"],
      "Electronic Goods Repair": ["IT-14"], "Electronics / Electrical Repair": ["IT-14"],
      "Printer repair": ["IT-02"], "Printer Repair": ["IT-02"],
      "CCTV / Security Installation": ["IT-04"], "CCTV Repair": ["IT-04"], "CCTV / Security Systems": ["IT-04"],
      "Mobile / Laptop Repair": ["IT-13", "IT-01"], "Mobile & Laptop Repair": ["IT-13", "IT-01"], "Mobile and Laptop Repair": ["IT-13", "IT-01"],
      "Mobile Repair / Laptop Service": ["IT-13", "IT-01"], "Mobile / laptop repair": ["IT-13", "IT-01"], "Mobile & Computer Repair": ["IT-13", "IT-01"],
      "Mobile / computer repair": ["IT-13", "IT-01"],
      "Computer & Mobile Repair": ["IT-01", "IT-13"], "Computer and Mobile Service": ["IT-01", "IT-13"],
      "Mobile / Electronics Repair": ["IT-13", "IT-14"], "Mobile & Electronics Repair": ["IT-13", "IT-14"], "Mobile / TV Repair": ["IT-13", "IT-14"],
      "Mobile & Printer Repair": ["IT-13", "IT-02"], "Computer / Printer Repair": ["IT-01", "IT-02"], "Computer / AMC": ["IT-01", "IT-09"],
      "Computer repair / CCTV": ["IT-01", "IT-04"], "Laptop / printer / CCTV": ["IT-01", "IT-02", "IT-04"],
      "Computer / Networking / Camera Repair": ["IT-01", "IT-03", "IT-04"],
      "Computer / Digital Assistance": ["IT-05"], "Computer / Online Service": ["IT-05"], "Computer Support / CSC": ["IT-05"]
    } },
    internalCols: ["email", "evidence_grade", "pin_check", "geo_mapping_status", "rm_verification", "training_availability", "source_batch",
                   "district_lgd", "block_lgd", "source_locality", "gram_panchayat", "urban_local_body", "village", "urban_ward",
                   "gp_lgd", "ulb_lgd", "village_lgd", "ward_lgd", "post_office"]
  }
};
module.exports = BATCHES;
Object.defineProperty(module.exports, "TEMPLATE_COLS", { value: TEMPLATE_COLS, enumerable: false });
Object.defineProperty(module.exports, "TEMPLATE_INTERNAL", { value: TEMPLATE_INTERNAL, enumerable: false });
Object.defineProperty(module.exports, "TEMPLATE_HELP", { value: TEMPLATE_HELP, enumerable: false });
