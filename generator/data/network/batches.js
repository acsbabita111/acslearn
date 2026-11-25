/* ============================================================
   network/batches.js v1.2 (परत-3, 25-Nov-2026, खेप N-3.1: ChatGPT ऑडिट CSC-01/02: addressDropParts, addressUrlAsSource, notAddress के
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
  Record_ID: "ज़रूरी, कभी नहीं बदलता। TW: BR-KHG-0001 · IT: BR-IT-KHG-0001", Sector_ID: "ज़रूरी: TW या IT (आगे के सेक्टर taxonomy.js से)",
  State: "ज़रूरी: Bihar", District: "ज़रूरी: ज़िले का English नाम (जैसे Khagaria)", Block: "ज़रूरी: प्रखंड", Locality: "इलाक़ा",
  Firm_Name: "ज़रूरी", Primary_Category: "ज़रूरी: IT-01 … IT-12 (या उसका English नाम)", Secondary_Categories: "कई हों तो ; से अलग (IT-02; IT-03)",
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
  }
  /* BIHAR-IT-001: असली IT-सर्वे का data आने पर (साँचे से):  { sector: "it", state: "bihar", importedOn: "YYYY-MM-DD",
     source: "<फ़ाइल>", sheet: "Firms", template: true }  — कोई नक़ली/नमूना फ़र्म कभी नहीं। */
};
module.exports = BATCHES;
Object.defineProperty(module.exports, "TEMPLATE_COLS", { value: TEMPLATE_COLS, enumerable: false });
Object.defineProperty(module.exports, "TEMPLATE_INTERNAL", { value: TEMPLATE_INTERNAL, enumerable: false });
Object.defineProperty(module.exports, "TEMPLATE_HELP", { value: TEMPLATE_HELP, enumerable: false });
