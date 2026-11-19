/* ============================================================================
   ACS EXAM app : Words.java  v1.0 (batch E-4, 19-Nov-2026)
   The few words the app itself shows (not the web pages): in Hindi, English, Kannada and Bengali.
   The language comes from the page (window.ACSApp.setLang, called by /assets/panel_i18n.js whenever the panel
   language is set) and is kept on the phone; before any page has told it, the app uses Hindi.
   The web pages (login, dashboard, exam) are translated by the website itself, not here.
   ============================================================================ */
package com.acslearn.exam;

final class Words {
    private Words() { }

    /* keys: back (Back pressed during the exam), offT/off1/off2/offB (the no-internet page), cam (the face picture, for screen readers) */
    static final String[] KEYS = { "back", "offT", "off1", "off2", "offB", "cam" };
    static final String[] HI = { "परीक्षा के बीच पीछे नहीं जा सकते", "📶 इंटरनेट नहीं मिला", "इंटरनेट चालू करें।", "फिर नीचे का बटन दबाएँ।", "🔄 फिर से कोशिश करें", "चेहरे का कैमरा" };
    static final String[] EN = { "You cannot go back during the exam", "📶 No internet", "Turn on the internet.", "Then press the button below.", "🔄 Try again", "Face camera" };
    static final String[] KN = { "ಪರೀಕ್ಷೆಯ ಮಧ್ಯೆ ಹಿಂದೆ ಹೋಗಲು ಸಾಧ್ಯವಿಲ್ಲ", "📶 ಇಂಟರ್ನೆಟ್ ಸಿಗಲಿಲ್ಲ", "ಇಂಟರ್ನೆಟ್ ಆನ್ ಮಾಡಿ.", "ನಂತರ ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ.", "🔄 ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", "ಮುಖದ ಕ್ಯಾಮೆರಾ" };
    static final String[] BN = { "পরীক্ষার মাঝে পিছনে যাওয়া যায় না", "📶 ইন্টারনেট পাওয়া যায়নি", "ইন্টারনেট চালু করুন।", "তারপর নিচের বোতাম চাপুন।", "🔄 আবার চেষ্টা করুন", "মুখের ক্যামেরা" };

    /* a language the app knows: hi, en, kn, bn; anything else = hi */
    static String norm(String lang) {
        String l = lang == null ? "" : lang.trim().toLowerCase();
        return ("en".equals(l) || "kn".equals(l) || "bn".equals(l)) ? l : "hi";
    }

    static String t(String lang, String key) {
        String[] row = "en".equals(lang) ? EN : "kn".equals(lang) ? KN : "bn".equals(lang) ? BN : HI;
        for (int i = 0; i < KEYS.length; i++) if (KEYS[i].equals(key)) return row[i];
        return "";
    }

    /* the no-internet page, in the given language */
    static String offline(String lang) {
        String l = norm(lang);
        return "<!doctype html><html lang='" + l + "'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            + "<style>body{margin:0;font-family:sans-serif;background:#F5F7FA;color:#0B1F3A;display:flex;min-height:100vh;align-items:center;justify-content:center}"
            + ".b{max-width:420px;margin:20px;background:#fff;border-radius:16px;padding:24px;text-align:center;box-shadow:0 6px 18px rgba(11,31,58,.15)}"
            + "h1{font-size:22px;margin:0 0 10px}p{font-size:18px;line-height:1.6;margin:8px 0}"
            + "button{margin-top:14px;background:#1565C0;color:#fff;border:0;border-radius:12px;font-size:19px;font-weight:700;padding:14px 22px}</style></head>"
            + "<body><div class='b'><h1>" + t(l, "offT") + "</h1><p>" + t(l, "off1") + "</p><p>" + t(l, "off2") + "</p>"
            + "<button onclick='ACSApp.retry()'>" + t(l, "offB") + "</button></div></body></html>";
    }
}
