/* generator/data/pin/district_map.js v1.1 (26-Nov-2026)
   India Post की पिन-सूची के राज्य और ज़िले के नाम → ACS की सूची के नाम।
   Founder (26-Nov-2026): "पूरे सिस्टम मे जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही अपने आप सभी सूचना ले लिया जाए।"

   यंत्र generator/build_pin_data.js इसे पढ़ता है। नियम (fail-closed):
   1. डाक-सूची का हर (राज्य, ज़िला) इन तीन में से ठीक एक रास्ते से सुलझे, वरना यंत्र रुक जाता है:
      (क) नाम ACS की सूची के नाम से हूबहू मिलता है (अक्षर छोड़कर सब हटाकर; हिंदी नाम का English रूप generator/data/panel_i18n/en.json के "geo" से);
      (ख) ALIAS में लिखा है (डाक का नाम → ACS की सूची का मौजूदा नाम; हिंदी सूची वाले राज्य में English रूप);
      (ग) NEW में लिखा है (ज़िला ACS की सूची में था ही नहीं; अब जुड़ता है)।
   2. ACS की सूची का कोई पुराना नाम कभी नहीं बदलता और नहीं हटता (पुराने रजिस्ट्रेशन और RM के ज़िले उसी नाम से दर्ज हैं)।
   3. LISTS: जिन 7 राज्यों की ज़िला-सूची अब तक लदती ही नहीं थी (फ़ाइल का नाम राज्य की कुंजी से नहीं मिलता था, या फ़ाइल थी ही नहीं),
      उनकी साफ़ सूची यहीं है। इन सूचियों का कोई नाम पहले कहीं दर्ज नहीं हो सकता था, इसलिए इन्हें साफ़ लिखा गया है।

   हर ALIAS हाथ से जाँचा गया है (26-Nov-2026)। कुछ ख़ास:
   - तेलंगाना: 2021 में «Warangal (Urban)» का नाम हनुमकोंडा और «Warangal (Rural)» का नाम वारंगल हुआ; इसलिए डाक का HANUMAKONDA → Warangal (Urban), WARANGAL → Warangal (Rural)।
   - पश्चिम बंगाल: बर्धमान 2017 में दो हुआ; PURBA BARDHAMAN → पुराना «Burdwan (Bardhaman)»; PASCHIM BARDHAMAN नया।
   - हरियाणा: GURUGRAM → Gurgaon, NUH → Mewat (वही ज़िले, नया नाम)।
   - मध्य प्रदेश: EAST NIMAR → Khandwa (वही ज़िला)।
   - तमिलनाडु: Tirupathur नया ज़िला है (2019); यह Tiruppur नहीं है। */
module.exports = {
  STATE: {
    "ANDAMAN AND NICOBAR ISLANDS": "andaman-and-nicobar-islands", "ANDHRA PRADESH": "andhra-pradesh", "ARUNACHAL PRADESH": "arunachal-pradesh",
    "ASSAM": "assam", "BIHAR": "bihar", "CHANDIGARH": "chandigarh", "CHHATTISGARH": "chhattisgarh", "DELHI": "delhi", "GOA": "goa", "GUJARAT": "gujarat",
    "HARYANA": "haryana", "HIMACHAL PRADESH": "himachal-pradesh", "JAMMU AND KASHMIR": "jammu-and-kashmir", "JHARKHAND": "jharkhand", "KARNATAKA": "karnataka",
    "KERALA": "kerala", "LADAKH": "ladakh", "LAKSHADWEEP": "lakshadweep", "MADHYA PRADESH": "madhya-pradesh", "MAHARASHTRA": "maharashtra", "MANIPUR": "manipur",
    "MEGHALAYA": "meghalaya", "MIZORAM": "mizoram", "NAGALAND": "nagaland", "ODISHA": "odisha", "PUDUCHERRY": "puducherry", "PUNJAB": "punjab",
    "RAJASTHAN": "rajasthan", "SIKKIM": "sikkim", "TAMIL NADU": "tamil-nadu", "TELANGANA": "telangana",
    "THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU": "dadra-and-nagar-haveli-and-daman-and-diu", "TRIPURA": "tripura", "UTTAR PRADESH": "uttar-pradesh",
    "UTTARAKHAND": "uttarakhand", "WEST BENGAL": "west-bengal"
  },
  LISTS: {
    "andaman-and-nicobar-islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
    "chandigarh": ["Chandigarh"],
    "dadra-and-nagar-haveli-and-daman-and-diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
    "delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "ladakh": ["Kargil", "Leh"],
    "lakshadweep": ["Lakshadweep"],
    "puducherry": ["Karaikal", "Mahe", "Pondicherry", "Yanam"]
  },
  /* जिन फ़ाइलों का नाम राज्य की कुंजी से नहीं मिलता था (कहीं से बुलाई नहीं जाती थीं): यंत्र इन्हें हटाता है */
  ORPHANS: ["in-chandigarh-ut.js", "in-dadra-and-nagar-haveli-ut.js", "in-daman-and-diu-ut.js", "in-delhi-nct.js", "in-lakshadweep-ut.js", "in-puducherry-ut.js"],
  ALIAS: {
    "andaman-and-nicobar-islands": { "NICOBARS": "Nicobar", "NORTH AND MIDDLE ANDAMAN": "North and Middle Andaman", "SOUTH ANDAMANS": "South Andaman" },
    "andhra-pradesh": { "SPSR NELLORE": "Nellore", "VISAKHAPATANAM": "Visakhapatnam", "Y.S.R.": "YSR Kadapa" },
    "assam": { "KAMRUP METRO": "Kamrup Metropolitan", "MARIGAON": "Morigaon", "SOUTH SALMARA MANCACHAR": "South Salmara-Mankachar" },
    "bihar": { "PASHCHIM CHAMPARAN": "West Champaran", "PURBI CHAMPARAN": "East Champaran", "KAIMUR (BHABUA)": "Kaimur" },
    "chhattisgarh": { "KOREA": "Korea (Koriya)", "DANTEWADA": "Dantewada (South Bastar)", "KABIRDHAM": "Kabirdham (Kawardha)", "KANKER": "Kanker (North Bastar)" },
    "dadra-and-nagar-haveli-and-daman-and-diu": { "DADRA AND NAGAR HAVELI": "Dadra and Nagar Haveli" },
    "delhi": { "CENTRAL": "Central Delhi", "EAST": "East Delhi", "NORTH": "North Delhi", "NORTH EAST": "North East Delhi", "NORTH WEST": "North West Delhi",
      "SOUTH": "South Delhi", "SOUTH EAST": "South East Delhi", "SOUTH WEST": "South West Delhi", "WEST": "West Delhi" },
    "gujarat": { "AHMADABAD": "Ahmedabad", "ARVALLI": "Aravalli", "BANAS KANTHA": "Banaskantha (Palanpur)", "DEVBHUMI DWARKA": "Devbhoomi Dwarka", "MAHESANA": "Mehsana",
      "PANCH MAHALS": "Panchmahal (Godhra)", "DANG": "Dangs (Ahwa)", "DOHAD": "Dahod", "KHEDA": "Kheda (Nadiad)", "NARMADA": "Narmada (Rajpipla)",
      "SABAR KANTHA": "Sabarkantha (Himmatnagar)", "TAPI": "Tapi (Vyara)" },
    "haryana": { "CHARKI DADRI": "Charkhi Dadri", "GURUGRAM": "Gurgaon", "NUH": "Mewat" },
    "himachal-pradesh": { "LAHUL AND SPITI": "Lahaul &amp; Spiti", "SIRMAUR": "Sirmaur (Sirmour)" },
    "jammu-and-kashmir": { "BANDIPORA": "Bandipore" },
    "jharkhand": { "EAST SINGHBUM": "East Singhbhum", "HAZARIBAGH": "Hazaribag", "SAHEBGANJ": "Sahibganj", "SARAIKELA KHARSAWAN": "Seraikela-Kharsawan" },
    "karnataka": { "CHAMARAJANAGARA": "Chamarajanagar", "CHIKKABALLAPURA": "Chikkaballapur", "DAVANGERE": "Davanagere", "VIJAYNAGAR": "Vijayanagara" },
    "ladakh": { "LEH LADAKH": "Leh" },
    "lakshadweep": { "LAKSHADWEEP DISTRICT": "Lakshadweep" },
    "madhya-pradesh": { "EAST NIMAR": "Khandwa" },
    "maharashtra": { "AHMEDNAGAR": "Ahilyanagar (Ahmednagar)", "AURANGABAD": "Chhatrapati Sambhajinagar (Aurangabad)", "OSMANABAD": "Dharashiv (Osmanabad)", "MUMBAI": "Mumbai City" },
    "odisha": { "ANUGUL": "Angul", "JAJAPUR": "Jajpur", "BALESHWAR": "Balasore", "KENDUJHAR": "Kendujhar (Keonjhar)" },
    "punjab": { "FIROZEPUR": "Ferozepur", "SHAHID BHAGAT SINGH NAGAR": "Nawanshahr (Shahid Bhagat Singh Nagar)", "S.A.S NAGAR": "Sahibzada Ajit Singh Nagar (Mohali)", "SRI MUKTSAR SAHIB": "Muktsar" },
    "rajasthan": { "GANGANAGAR": "Sri Ganganagar" },
    "sikkim": { "EAST DISTRICT": "East Sikkim", "NORTH DISTRICT": "North Sikkim", "SOUTH DISTRICT": "South Sikkim", "WEST DISTRICT": "West Sikkim" },
    "tamil-nadu": { "KANNIYAKUMARI": "Kanyakumari", "THE NILGIRIS": "Nilgiris", "THIRUVALLUR": "Tiruvallur", "THIRUVARUR": "Tiruvarur", "VILLUPURAM": "Viluppuram", "TUTICORIN": "Thoothukudi (Tuticorin)" },
    "telangana": { "JANGOAN": "Jangaon", "JAYASHANKAR BHUPALAPALLY": "Jayashankar Bhoopalpally", "JAGITIAL": "Jagtial", "KUMURAM BHEEM ASIFABAD": "Komaram Bheem Asifabad",
      "WARANGAL": "Warangal (Rural)", "HANUMAKONDA": "Warangal (Urban)", "MEDCHAL MALKAJGIRI": "Medchal" },
    "uttar-pradesh": { "SANT KABEER NAGAR": "Sant Kabir Nagar", "KHERI": "Lakhimpur Kheri" },
    "uttarakhand": { "UDAM SINGH NAGAR": "Udham Singh Nagar" },
    "west-bengal": { "MALDAH": "Malda", "PURBA BARDHAMAN": "Burdwan (Bardhaman)", "24 PARAGANAS NORTH": "North 24 Parganas", "24 PARAGANAS SOUTH": "South 24 Parganas",
      "DINAJPUR DAKSHIN": "Dakshin Dinajpur (South Dinajpur)", "DINAJPUR UTTAR": "Uttar Dinajpur (North Dinajpur)",
      "MEDINIPUR EAST": "Purba Medinipur (East Medinipur)", "MEDINIPUR WEST": "Paschim Medinipur (West Medinipur)" }
  },
  NEW: {
    "andhra-pradesh": { "ALLURI SITHARAMA RAJU": "Alluri Sitharama Raju", "ANAKAPALLI": "Anakapalli", "ANNAMAYYA": "Annamayya", "BAPATLA": "Bapatla", "ELURU": "Eluru",
      "KAKINADA": "Kakinada", "KONASEEMA": "Konaseema", "NTR": "NTR", "NANDYAL": "Nandyal", "PALNADU": "Palnadu", "PARVATHIPURAM MANYAM": "Parvathipuram Manyam",
      "SRI SATHYA SAI": "Sri Sathya Sai", "TIRUPATI": "Tirupati" },
    "arunachal-pradesh": { "KAMLE": "Kamle", "LEPARADA": "Leparada", "PAKKE KESSANG": "Pakke Kessang", "SHI YOMI": "Shi Yomi" },
    "assam": { "BAJALI": "Bajali" },
    "chhattisgarh": { "GAURELLA PENDRA MARWAHI": "Gaurella Pendra Marwahi" },
    "madhya-pradesh": { "NIWARI": "Niwari" },
    "mizoram": { "HNAHTHIAL": "Hnahthial", "KHAWZAWL": "Khawzawl", "SAITUAL": "Saitual" },
    "nagaland": { "NOKLAK": "Noklak" },
    "punjab": { "MALERKOTLA": "Malerkotla" },
    "sikkim": { "PAKYONG": "Pakyong", "SORENG": "Soreng" },
    "tamil-nadu": { "CHENGALPATTU": "Chengalpattu", "KALLAKURICHI": "Kallakurichi", "MAYILADUTHURAI": "Mayiladuthurai", "RANIPET": "Ranipet", "TENKASI": "Tenkasi", "TIRUPATHUR": "Tirupathur" },
    "telangana": { "MULUGU": "Mulugu", "NARAYANPET": "Narayanpet" },
    "west-bengal": { "JHARGRAM": "Jhargram", "PASCHIM BARDHAMAN": "Paschim Bardhaman" }
  },

  /* ── सरकारी गाँव-सूची (LGD, 26-Nov-2026) के ज़िला-नाम ──
     नाम मिलाते समय सिर्फ़ अक्षर और अंक देखे जाते हैं (बड़े-छोटे अक्षर, बिंदु, कोष्ठक, रेखा नहीं); इसलिए ऊपर की
     डाक वाली पंक्तियाँ LGD के उसी नाम पर भी लागू होती हैं। यहाँ सिर्फ़ वे नाम हैं जो LGD में अलग लिखे हैं।
     हर नाम-बदलाव LGD की तहसीलों से जाँचा गया (26-Nov-2026), जैसे:
     - कर्नाटक «Bengaluru South» की तहसीलें चन्नपटना, कनकपुरा, मागडी, रामनगर हैं: यह पुराना रामनगर ज़िला है।
     - असम «Sribhumi» की तहसीलें करीमगंज, पथारकांदी, बदरपुर हैं: यह पुराना करीमगंज ज़िला है।
     - मध्य प्रदेश «Narmadapuram» में होशंगाबाद तहसील है: यह पुराना होशंगाबाद ज़िला है।
     - सिक्किम: Gangtok = East Sikkim, Mangan = North Sikkim, Namchi = South Sikkim, Gyalshing = West Sikkim। */
  ALIAS_LGD: {
    "andhra-pradesh": { "Ananthapuramu": "Anantapur", "Dr. B.R. Ambedkar Konaseema": "Konaseema", "Sri Potti Sriramulu Nellore": "Nellore" },
    "assam": { "Sribhumi": "Karimganj" },
    "chhattisgarh": { "Balodabazar-Bhatapara": "Baloda Bazar", "Balrampur-Ramanujganj": "Balrampur", "Dakshin Bastar Dantewada": "Dantewada (South Bastar)",
      "Gaurela-Pendra-Marwahi": "Gaurella Pendra Marwahi", "Kabeerdham": "Kabirdham (Kawardha)", "Uttar Bastar Kanker": "Kanker (North Bastar)" },
    "gujarat": { "Dangs": "Dangs (Ahwa)" },
    "himachal-pradesh": { "Lahaul And Spiti": "Lahaul &amp; Spiti" },
    "karnataka": { "Bagalkote": "Bagalkot", "Bengaluru South": "Ramanagara" },
    "madhya-pradesh": { "Khandwa (East Nimar)": "Khandwa", "Khargone (West Nimar)": "Khargone", "Narmadapuram": "Hoshangabad", "Narsimhapur": "Narsinghpur" },
    "maharashtra": { "Ahilyanagar": "Ahilyanagar (Ahmednagar)", "Chhatrapati Sambhajinagar": "Chhatrapati Sambhajinagar (Aurangabad)", "Dharashiv": "Dharashiv (Osmanabad)" },
    "mizoram": { "Siaha": "Saiha" },
    "odisha": { "Anugola": "Angul", "Baragada": "Bargarh", "Debagada": "Deogarh", "Kandhamala": "Kandhamal", "Kataka": "Cuttack", "Kendrapada": "Kendrapara",
      "Nayagada": "Nayagarh", "Subarnapur": "Sonepur", "Sundaragada": "Sundargarh" },
    "puducherry": { "Puducherry": "Pondicherry" },
    "sikkim": { "Gangtok": "East Sikkim", "Gyalshing": "West Sikkim", "Mangan": "North Sikkim", "Namchi": "South Sikkim" },
    "tamil-nadu": { "Kancheepuram": "Kanchipuram", "Thoothukkudi": "Thoothukudi (Tuticorin)" },
    "uttar-pradesh": { "Mahrajganj": "Maharajganj", "Shrawasti": "Shravasti" },
    "west-bengal": { "Dakshin Dinajpur": "Dakshin Dinajpur (South Dinajpur)", "Paschim Medinipur": "Paschim Medinipur (West Medinipur)",
      "Purba Medinipur": "Purba Medinipur (East Medinipur)", "Uttar Dinajpur": "Uttar Dinajpur (North Dinajpur)" }
  },
  /* LGD के वे ज़िले जो न ACS की सूची में थे, न डाक की सूची में (ज़्यादातर 2023 के बाद बने) */
  NEW_LGD: {
    "andhra-pradesh": { "Markapuram": "Markapuram", "Polavaram": "Polavaram" },
    "arunachal-pradesh": { "Bichom": "Bichom", "Keyi Panyor": "Keyi Panyor" },
    "assam": { "Tamulpur": "Tamulpur" },
    "chhattisgarh": { "Khairagarh-Chhuikhadan-Gandai": "Khairagarh-Chhuikhadan-Gandai", "Manendragarh-Chirmiri-Bharatpur(M C B)": "Manendragarh-Chirmiri-Bharatpur",
      "Mohla-Manpur-Ambagarh Chouki": "Mohla-Manpur-Ambagarh Chouki", "Sakti": "Sakti", "Sarangarh-Bilaigarh": "Sarangarh-Bilaigarh" },
    "delhi": { "Central North": "Central North Delhi", "Old Delhi": "Old Delhi", "Outer North": "Outer North Delhi" },
    "goa": { "Kushavati": "Kushavati" },
    "gujarat": { "Vav-Tharad": "Vav-Tharad" },
    "haryana": { "Hansi": "Hansi" },
    "ladakh": { "Changthang": "Changthang", "Drass": "Drass", "Nubra": "Nubra", "Sankoo": "Sankoo", "Sham": "Sham", "Zanskar": "Zanskar" },
    "madhya-pradesh": { "Maihar": "Maihar", "Mauganj": "Mauganj", "Pandhurna": "Pandhurna" },
    "meghalaya": { "Eastern West Khasi Hills": "Eastern West Khasi Hills" },
    "nagaland": { "Chumoukedima": "Chumoukedima", "Meluri": "Meluri", "Niuland": "Niuland", "Shamator": "Shamator", "Tseminyu": "Tseminyu" },
    "rajasthan": { "Balotra": "Balotra", "Beawar": "Beawar", "Deeg": "Deeg", "Didwana-Kuchaman": "Didwana-Kuchaman", "Khairthal-Tijara": "Khairthal-Tijara",
      "Kotputli-Behror": "Kotputli-Behror", "Phalodi": "Phalodi", "Salumbar": "Salumbar" }
  },
  /* LGD में पुदुच्चेरी ज़िले के भीतर «Mahe» और «Yanam» तहसील की तरह दर्ज हैं; ACS की सूची (और डाक) में ये अलग ज़िले हैं।
     रूप: राज्य → LGD का ज़िला-नाम → LGD की तहसील → ACS की सूची का ज़िला */
  LGD_SUB: { "puducherry": { "Puducherry": { "Mahe": "Mahe", "Yanam": "Yanam" } } }
};
