/* ============================================================================
   ACS EXAM app : MainActivity.java  v1.0 (batch E-1, 19-Nov-2026)
   Founder's choices (19-Nov-2026): 1-a Android 10 or newer · 2-b the face is matched by machine (batch E-3) · 3 the name "ACS EXAM".
   What this batch does: the app opens the ACS login and the learner's own dashboard from acslearn.com, the same pages and
   the same server rules as the website (badge or Rs 100, 2 exams a day, 3 parts x 40 questions).
   - Only acslearn.com opens inside the app. Any other website (YouTube, WhatsApp...) opens outside, in its own app.
   - A payment window (Razorpay) opens in a small window over the app and closes itself; UPI apps open from it.
   - No internet: a simple page with "try again".
   - window.ACSApp.info() tells the page that it runs inside the app (and which version).
   Batch E-2 adds the lock (pin, no screenshot, calls stopped, leaving the app ends the exam); batch E-3 adds the camera.
   No outside library is used: only Android's own parts.
   ============================================================================ */
package com.acslearn.exam;

import android.app.Activity;
import android.app.Dialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

public class MainActivity extends Activity {

    static final String HOME = "https://acslearn.com/dashboard/";
    static final int REQ_FILE = 11;
    static final String[] OWN_HOSTS = { "acslearn.com" };
    static final String[] OUTSIDE_SCHEMES = { "upi", "tel", "mailto", "sms", "whatsapp", "tez", "phonepe", "paytmmp", "bhim", "credpay" };
    /* links of the page itself: the WebView handles them as usual */
    static final String[] INNER_SCHEMES = { "about", "blob", "data", "javascript" };
    /* sites that have their own app: a new-window link to them opens that app, never a window inside ACS EXAM */
    static final String[] APP_HOSTS = { "wa.me", "whatsapp.com", "youtube.com", "youtu.be", "play.google.com", "maps.google.com",
        "facebook.com", "instagram.com", "t.me", "telegram.me", "x.com", "twitter.com", "linkedin.com" };

    WebView web;
    ProgressBar bar;
    ValueCallback<Uri[]> fileCb;
    Dialog popup;
    final Handler ui = new Handler(Looper.getMainLooper());
    String lastUrl = HOME;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        FrameLayout root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        bar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        bar.setMax(100);
        FrameLayout.LayoutParams bl = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(4));
        bl.gravity = Gravity.TOP;
        root.addView(bar, bl);
        setContentView(root);

        setup(web);
        web.setWebViewClient(new MainClient());
        web.setWebChromeClient(new MainChrome());
        web.addJavascriptInterface(new Bridge(), "ACSApp");
        /* a file to download (a PDF on the server): the phone's browser downloads it */
        web.setDownloadListener((url, ua, cd, mime, len) -> {
            if (url != null && url.startsWith("https://")) openOutside(Uri.parse(url));
        });

        if (state != null && web.restoreState(state) != null) return;
        web.loadUrl(HOME);
    }

    int dp(int v) { return Math.round(v * getResources().getDisplayMetrics().density); }

    /* the settings shared by the main window and a payment window */
    void setup(WebView w) {
        WebSettings s = w.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setJavaScriptCanOpenWindowsAutomatically(true);
        s.setSupportMultipleWindows(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setUserAgentString(s.getUserAgentString() + " ACSExamApp/" + BuildConfig.VERSION_NAME);
        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        cm.setAcceptThirdPartyCookies(w, true);
    }

    static boolean hostIn(Uri u, String[] list) {
        String h = u.getHost();
        if (h == null) return false;
        h = h.toLowerCase();
        for (String o : list) if (h.equals(o) || h.endsWith("." + o)) return true;
        return false;
    }

    static boolean own(Uri u) { return hostIn(u, OWN_HOSTS); }

    /* other apps: a website in the browser, UPI in the payment app, a phone number in the dialer */
    boolean openOutside(Uri u) {
        try {
            Intent i = new Intent(Intent.ACTION_VIEW, u);
            i.addCategory(Intent.CATEGORY_BROWSABLE);
            startActivity(i);
            return true;
        } catch (ActivityNotFoundException e) {
            return false;
        }
    }

    /* "intent://" links (some payment pages use them): open the app they name, or their fallback web address */
    boolean openIntentLink(Uri u) {
        try {
            Intent i = Intent.parseUri(u.toString(), Intent.URI_INTENT_SCHEME);
            i.addCategory(Intent.CATEGORY_BROWSABLE);
            i.setComponent(null);
            i.setSelector(null);
            try {
                startActivity(i);
                return true;
            } catch (ActivityNotFoundException e) {
                String fb = i.getStringExtra("browser_fallback_url");
                if (fb != null && fb.startsWith("https://")) return openOutside(Uri.parse(fb));
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    /* what to do with a link: true = the app has handled it (the WebView must not load it) */
    boolean route(WebView v, Uri u, boolean mainFrame) {
        String sc = u.getScheme() == null ? "" : u.getScheme().toLowerCase();
        if (sc.equals("https") || sc.equals("http")) {
            if (!mainFrame) return false;
            if (v != web) return false;                 /* a payment window may go to the bank's page */
            if (own(u) && sc.equals("https")) return false;
            openOutside(u);
            return true;
        }
        if (sc.equals("intent")) { openIntentLink(u); return true; }
        for (String o : OUTSIDE_SCHEMES) if (sc.equals(o)) { openOutside(u); return true; }
        for (String o : INNER_SCHEMES) if (sc.equals(o)) return false;
        return true;                                    /* any other kind of link (file, content...) is not opened */
    }

    /* the first address of a new window (a link with target=_blank, or a payment window):
       ACS's own page = open it in the main window · WhatsApp, YouTube... = open their app · a bank page = keep the window.
       true = the window is not needed any more */
    boolean popupFirst(Uri u) {
        String sc = u.getScheme() == null ? "" : u.getScheme().toLowerCase();
        if (!sc.equals("https") && !sc.equals("http")) return false;
        if (own(u) && sc.equals("https")) { if (web != null) web.loadUrl(u.toString()); return true; }
        if (hostIn(u, APP_HOSTS)) { openOutside(u); return true; }
        return false;
    }

    final class MainClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
            return route(v, r.getUrl(), r.isForMainFrame());
        }

        @Override
        public void onPageStarted(WebView v, String url, Bitmap icon) {
            bar.setVisibility(View.VISIBLE);
            if (url != null && url.startsWith("https://")) lastUrl = url;
        }

        @Override
        public void onPageFinished(WebView v, String url) {
            bar.setVisibility(View.GONE);
        }

        @Override
        public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
            if (!r.isForMainFrame()) return;
            v.loadDataWithBaseURL(null, OFFLINE, "text/html", "utf-8", null);   /* "try again" returns to the last ACS page */
        }
    }

    final class MainChrome extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView v, int p) {
            bar.setProgress(p);
            bar.setVisibility(p >= 100 ? View.GONE : View.VISIBLE);
        }

        /* the payment window (Razorpay opens one for the bank and for UPI) */
        @Override
        public boolean onCreateWindow(WebView v, boolean isDialog, boolean isUserGesture, Message resultMsg) {
            closePopup();
            WebView pw = new WebView(MainActivity.this);
            setup(pw);
            pw.setWebViewClient(new WebViewClient() {
                boolean first = true;

                @Override
                public boolean shouldOverrideUrlLoading(WebView w, WebResourceRequest r) {
                    if (first && r.isForMainFrame()) {
                        first = false;
                        if (popupFirst(r.getUrl())) { closePopupSoon(); return true; }
                    }
                    return route(w, r.getUrl(), r.isForMainFrame());
                }

                @Override
                public void onPageStarted(WebView w, String url, Bitmap icon) {
                    if (first && url != null && !url.startsWith("about:")) {
                        first = false;
                        if (popupFirst(Uri.parse(url))) { w.stopLoading(); closePopupSoon(); }
                    }
                }
            });
            pw.setWebChromeClient(new WebChromeClient() {
                @Override
                public void onCloseWindow(WebView w) { closePopupSoon(); }
            });
            Dialog d = new Dialog(MainActivity.this, android.R.style.Theme_Material_Light_NoActionBar);
            d.setContentView(pw);
            d.setOnKeyListener((x, key, ev) -> {
                if (key == KeyEvent.KEYCODE_BACK && ev.getAction() == KeyEvent.ACTION_UP) {
                    if (pw.canGoBack()) pw.goBack(); else closePopupSoon();
                    return true;
                }
                return key == KeyEvent.KEYCODE_BACK;
            });
            /* the window is destroyed a moment later, never inside one of its own calls */
            d.setOnDismissListener(x -> ui.post(() -> { try { pw.destroy(); } catch (Exception ignore) { } }));
            d.show();
            popup = d;
            WebView.WebViewTransport t = (WebView.WebViewTransport) resultMsg.obj;
            t.setWebView(pw);
            resultMsg.sendToTarget();
            return true;
        }

        @Override
        public void onCloseWindow(WebView w) { closePopupSoon(); }

        /* choosing a file (a photo or a document) from the phone */
        @Override
        public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
            if (fileCb != null) fileCb.onReceiveValue(null);
            fileCb = cb;
            try {
                startActivityForResult(p.createIntent(), REQ_FILE);
                return true;
            } catch (ActivityNotFoundException e) {
                fileCb = null;
                return false;
            }
        }

        /* the camera comes only in batch E-3; until then no page gets it */
        @Override
        public void onPermissionRequest(PermissionRequest r) { r.deny(); }
    }

    void closePopupSoon() {
        final Dialog d = popup;
        ui.post(() -> { if (popup == d) closePopup(); });
    }

    void closePopup() {
        if (popup != null) {
            try { popup.dismiss(); } catch (Exception ignore) { }
            popup = null;
        }
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == REQ_FILE && fileCb != null) {
            fileCb.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(res, data));
            fileCb = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        if (web != null) web.saveState(out);
    }

    @Override
    protected void onDestroy() {
        closePopup();
        if (web != null) {
            web.removeJavascriptInterface("ACSApp");
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    /* what the page can ask the app (only harmless things in this batch) */
    final class Bridge {
        @JavascriptInterface
        public String info() {
            return "{\"app\":\"ACS EXAM\",\"version\":\"" + BuildConfig.VERSION_NAME + "\",\"code\":" + BuildConfig.VERSION_CODE
                + ",\"sdk\":" + Build.VERSION.SDK_INT + "}";
        }

        @JavascriptInterface
        public void retry() {
            runOnUiThread(() -> { if (web != null) web.loadUrl(lastUrl == null ? HOME : lastUrl); });
        }
    }

    static final String OFFLINE =
        "<!doctype html><html lang='hi'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
        + "<style>body{margin:0;font-family:sans-serif;background:#F5F7FA;color:#0B1F3A;display:flex;min-height:100vh;align-items:center;justify-content:center}"
        + ".b{max-width:420px;margin:20px;background:#fff;border-radius:16px;padding:24px;text-align:center;box-shadow:0 6px 18px rgba(11,31,58,.15)}"
        + "h1{font-size:22px;margin:0 0 10px}p{font-size:18px;line-height:1.6;margin:8px 0}"
        + "button{margin-top:14px;background:#1565C0;color:#fff;border:0;border-radius:12px;font-size:19px;font-weight:700;padding:14px 22px}</style></head>"
        + "<body><div class='b'><h1>📶 इंटरनेट नहीं मिला</h1><p>इंटरनेट चालू करें।</p><p>फिर नीचे का बटन दबाएँ।</p>"
        + "<button onclick='ACSApp.retry()'>🔄 फिर से कोशिश करें</button></div></body></html>";
}
