/* ============================================================
   network/geo.js v1.0 (परत-3, 22-Nov-2026, खेप N-1) : नेटवर्क के राज्य और ज़िले
   हिंदी नाम का एकमात्र घर = assets/geo/districts/in-<राज्य>.js (यह फ़ाइल सिर्फ़ English नाम, slug और
   रिकॉर्ड-कूट जोड़ती है; generator/dev_network_check.js जाँचता है कि हर हिंदी नाम वहाँ हूबहू है)।
   slug = पते में (पता-नियम: lowercase, hyphen)। code = रिकॉर्ड-ID का बीच वाला हिस्सा (BR-KHG-0003 में KHG)।
   प्रखंड (block) के नाम स्रोत-data से आते हैं, यहाँ नहीं (एक चीज़ = एक जगह)।
   नया राज्य = नई पंक्ति। पहले से बने पते कभी नहीं बदलते।
   ============================================================ */
"use strict";
const STATES = {
  bihar: { slug: "bihar", hi: "बिहार", en: "Bihar", geoKey: "in-bihar", idPrefix: "BR",
    districts: [
      ["araria", "Araria", "अररिया", "ARA"], ["arwal", "Arwal", "अरवल", "ARW"], ["aurangabad", "Aurangabad", "औरंगाबाद", "AUR"],
      ["banka", "Banka", "बांका", "BAN"], ["begusarai", "Begusarai", "बेगूसराय", "BEG"], ["bhagalpur", "Bhagalpur", "भागलपुर", "BGP"],
      ["bhojpur", "Bhojpur", "भोजपुर", "BHO"], ["buxar", "Buxar", "बक्सर", "BUX"], ["darbhanga", "Darbhanga", "दरभंगा", "DAR"],
      ["east-champaran", "East Champaran", "पूर्वी चंपारण", "ECH"], ["gaya", "Gaya", "गया", "GAY"], ["gopalganj", "Gopalganj", "गोपालगंज", "GPJ"],
      ["jamui", "Jamui", "जमुई", "JMU"], ["jehanabad", "Jehanabad", "जहानाबाद", "JEH"], ["kaimur", "Kaimur", "कैमूर", "KMR"],
      ["katihar", "Katihar", "कटिहार", "KTR"], ["khagaria", "Khagaria", "खगड़िया", "KHG"], ["kishanganj", "Kishanganj", "किशनगंज", "KSN"],
      ["lakhisarai", "Lakhisarai", "लखीसराय", "LKR"], ["madhepura", "Madhepura", "मधेपुरा", "MDP"], ["madhubani", "Madhubani", "मधुबनी", "MDB"],
      ["munger", "Munger", "मुंगेर", "MNG"], ["muzaffarpur", "Muzaffarpur", "मुजफ्फरपुर", "MZP"], ["nalanda", "Nalanda", "नालंदा", "NAL"],
      ["nawada", "Nawada", "नवादा", "NWD"], ["patna", "Patna", "पटना", "PAT"], ["purnia", "Purnia", "पूर्णिया", "PRN"],
      ["rohtas", "Rohtas", "रोहतास", "RTS"], ["saharsa", "Saharsa", "सहरसा", "SAH"], ["samastipur", "Samastipur", "समस्तीपुर", "SMP"],
      ["saran", "Saran", "सारण", "SRN"], ["sheikhpura", "Sheikhpura", "शेखपुरा", "SKP"], ["sheohar", "Sheohar", "शिवहर", "SHR"],
      ["sitamarhi", "Sitamarhi", "सीतामढ़ी", "SIT"], ["siwan", "Siwan", "सीवान", "SIW"], ["supaul", "Supaul", "सुपौल", "SUP"],
      ["vaishali", "Vaishali", "वैशाली", "VAI"], ["west-champaran", "West Champaran", "पश्चिम चंपारण", "WCH"]
    ].map(([slug, en, hi, code]) => ({ slug, en, hi, code })) }
};
module.exports = { STATES };
