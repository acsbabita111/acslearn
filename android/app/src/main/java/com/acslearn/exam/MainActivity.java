/* ============================================================================
   ACS EXAM app : MainActivity.java  v1.1 (batch E-2, 19-Nov-2026; v1.0 batch E-1)
   Founder's choices (19-Nov-2026): 1-a Android 10 or newer, calls stopped · 2-b face matched by machine (batch E-3) · 3 "ACS EXAM".
   Founder's exam rules: no call comes in or goes out during the exam; no other app can touch the exam;
   leaving the app ends the exam and the Rs 100 chance is not given back.

   What the app does (E-1): opens the learner's dashboard on acslearn.com (same pages, same server rules as the website).
   Only acslearn.com opens inside the app; other sites open in their own apps; payment windows work; a "try again" page without internet.

   What E-2 adds:
   1. The exam lock (window.ACSApp.lockPrepare / examOn / examOff), used by /assets/exam-session.js v1.3:
      - before the exam: the learner allows "caller ID and spam app" (calls refused, CallGuard.java) and pins the app
        (Android's own screen pinning: no home, no recent apps, no notifications, no other app can open);
      - during the exam: no screenshot or screen recording (FLAG_SECURE), screen stays on, other apps' floating windows hidden
        (Android 12 and newer), back button and links do nothing;
      - the exam ends at once (the page tells the server, with the reason) if the app is unpinned, the screen is split,
        the app is left, a call is picked up, or the phone restarts during the exam;
      - only recorded, the exam goes on: the screen turned off and on, a call that rang or was refused,
        another app's floating window over the exam, a screen reader that can read the screen.
   2. Speech for every page inside the app: Android's WebView has no speechSynthesis and no SpeechRecognition.
      assets/acs_speech.js gives the page both, backed by the phone's own voice engine and speech recogniser.
      So the "listen" and "speak" questions of the language exams work in the app.
   Only one outside library: androidx.webkit (Google's own WebView helper), to load acs_speech.js before the page's scripts.
   ============================================================================ */
package com.acslearn.exam;

import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.Dialog;
import android.app.KeyguardManager;
import android.app.role.RoleManager;
import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.os.PowerManager;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.accessibility.AccessibilityManager;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

public class MainActivity extends Activity {

    static final String HOME = "https://acslearn.com/dashboard/";
    static final String PREF = "acs_exam";
    static final int REQ_FILE = 11, REQ_ROLE = 12, REQ_MIC = 13;
    static final int LOCK_FEATURE = 1, SPEECH_FEATURE = 1;
    static final String[] OWN_HOSTS = { "acslearn.com" };
    static final Set<String> SPEECH_ORIGINS = new HashSet<>(Arrays.asList("https://acslearn.com", "https://www.acslearn.com"));
    static final String[] OUTSIDE_SCHEMES = { "upi", "tel", "mailto", "sms", "whatsapp", "tez", "phonepe", "paytmmp", "bhim", "credpay" };
    static final String[] INNER_SCHEMES = { "about", "blob", "data", "javascript" };
    static final String[] APP_HOSTS = { "wa.me", "whatsapp.com", "youtube.com", "youtu.be", "play.google.com", "maps.google.com",
        "facebook.com", "instagram.com", "t.me", "telegram.me", "x.com", "twitter.com", "linkedin.com" };
    static final long LEAVE_WAIT_RING_MS = 60000;

    static WeakReference<MainActivity> live = new WeakReference<>(null);

    FrameLayout root;
    WebView web;
    ProgressBar bar;
    ValueCallback<Uri[]> fileCb;
    Dialog popup;
    final Handler ui = new Handler(Looper.getMainLooper());
    volatile String lastUrl = HOME, curUrl = HOME;
    String speechJs = "";
    boolean docStart = false;

    /* the exam lock */
    SharedPreferences prefs;
    boolean examOn = false, stopped = false, ringSeen = false, screenOff = false, overlaySeen = false;
    long stoppedAt = 0, screenOffAt = 0;
    String exSid = "";
    boolean preparing = false, pinAfterResume = false;
    long pinAskedAt = 0, navGraceUntil = 0;
    final Runnable monitor = new Runnable() { @Override public void run() { watch(); } };
    final BroadcastReceiver screenRx = new BroadcastReceiver() {
        @Override public void onReceive(Context c, Intent i) { if (Intent.ACTION_SCREEN_OFF.equals(i.getAction())) screenOffAt = System.currentTimeMillis(); }
    };

    /* speech */
    TextToSpeech tts;
    boolean ttsReady = false, ttsFailed = false;
    final ArrayList<Object[]> ttsWait = new ArrayList<>();
    volatile String voicesJson = "[]";
    SpeechRecognizer sr;
    String srId = null;
    Object[] srWait = null;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        live = new WeakReference<>(this);
        prefs = getSharedPreferences(PREF, MODE_PRIVATE);
        /* the phone restarted or the app was closed during an exam: that exam has ended (Founder's rule) */
        if (prefs.getBoolean("active", false)) prefs.edit().putBoolean("active", false).putString("pending", "restart").apply();
        speechJs = readAsset("acs_speech.js");
        root = new FrameLayout(this);
        bar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        bar.setMax(100);
        setContentView(root);
        makeWeb();
        try { registerReceiver(screenRx, new IntentFilter(Intent.ACTION_SCREEN_OFF)); } catch (Exception ignore) { }
        ui.postDelayed(this::ensureTts, 1500);   /* voices ready before the first "listen" button */
        if (state != null && web.restoreState(state) != null) return;
        web.loadUrl(HOME);
    }

    void makeWeb() {
        web = new WebView(this);
        root.addView(web, 0, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        if (bar.getParent() == null) {
            FrameLayout.LayoutParams bl = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(4));
            bl.gravity = Gravity.TOP;
            root.addView(bar, bl);
        }
        setup(web);
        web.setWebViewClient(new MainClient());
        web.setWebChromeClient(new MainChrome());
        web.addJavascriptInterface(new Bridge(), "ACSApp");
        web.setDownloadListener((url, ua, cd, mime, len) -> {
            if (!examOn && url != null && url.startsWith("https://")) openOutside(Uri.parse(url));
        });
        web.setOnTouchListener((v, ev) -> {
            if (examOn && !overlaySeen && (ev.getFlags() & (MotionEvent.FLAG_WINDOW_IS_OBSCURED | MotionEvent.FLAG_WINDOW_IS_PARTIALLY_OBSCURED)) != 0) {
                overlaySeen = true;
                flag("overlay", "");
            }
            return false;
        });
        docStart = false;
        if (!speechJs.isEmpty()) {
            try {
                if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
                    WebViewCompat.addDocumentStartJavaScript(web, speechJs, SPEECH_ORIGINS);
                    docStart = true;
                }
            } catch (Exception ignore) { docStart = false; }
        }
    }

    int dp(int v) { return Math.round(v * getResources().getDisplayMetrics().density); }

    String readAsset(String name) {
        try (InputStream in = getAssets().open(name); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] b = new byte[8192];
            int n;
            while ((n = in.read(b)) > 0) out.write(b, 0, n);
            return out.toString("UTF-8");
        } catch (Exception e) {
            return "";
        }
    }

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
        h = h.toLowerCase(Locale.ROOT);
        for (String o : list) if (h.equals(o) || h.endsWith("." + o)) return true;
        return false;
    }

    static boolean own(Uri u) { return hostIn(u, OWN_HOSTS); }

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
        String sc = u.getScheme() == null ? "" : u.getScheme().toLowerCase(Locale.ROOT);
        for (String o : INNER_SCHEMES) if (sc.equals(o)) return false;
        if (examOn) {
            /* during the exam nothing opens: no other app, no other site. Leaving the ACS page itself ends the exam. */
            if ((sc.equals("https") || sc.equals("http")) && mainFrame && v == web && own(u) && sc.equals("https")) {
                if (System.currentTimeMillis() > navGraceUntil) abort("nav");   /* after the page's engine restarted, the page may reload itself */
                return false;
            }
            return !(sc.equals("https") || sc.equals("http")) || mainFrame;
        }
        if (sc.equals("https") || sc.equals("http")) {
            if (!mainFrame) return false;
            if (v != web) return false;
            if (own(u) && sc.equals("https")) return false;
            openOutside(u);
            return true;
        }
        if (sc.equals("intent")) { openIntentLink(u); return true; }
        for (String o : OUTSIDE_SCHEMES) if (sc.equals(o)) { openOutside(u); return true; }
        return true;
    }

    boolean popupFirst(Uri u) {
        String sc = u.getScheme() == null ? "" : u.getScheme().toLowerCase(Locale.ROOT);
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
            if (url != null && url.startsWith("https://")) { lastUrl = url; curUrl = url; }
            if (!docStart) injectSpeech(v, url);
        }

        @Override
        public void onPageFinished(WebView v, String url) {
            bar.setVisibility(View.GONE);
            if (!docStart) injectSpeech(v, url);
        }

        @Override
        public void doUpdateVisitedHistory(WebView v, String url, boolean reload) {
            if (url != null && url.startsWith("https://")) curUrl = url;
        }

        @Override
        public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
            if (!r.isForMainFrame()) return;
            v.loadDataWithBaseURL(null, OFFLINE, "text/html", "utf-8", null);
        }

        /* the page's engine stopped (a phone with little memory). A new page opens; an exam in progress is kept and resumes */
        @Override
        public boolean onRenderProcessGone(WebView v, RenderProcessGoneDetail detail) {
            if (v != web) return true;
            try { root.removeView(v); v.destroy(); } catch (Exception ignore) { }
            navGraceUntil = System.currentTimeMillis() + 20000;
            makeWeb();
            web.loadUrl(lastUrl == null ? HOME : lastUrl);
            return true;
        }
    }

    void injectSpeech(WebView v, String url) {
        if (speechJs.isEmpty() || url == null) return;
        Uri u = Uri.parse(url);
        if ("https".equals(u.getScheme()) && own(u)) v.evaluateJavascript(speechJs, null);
    }

    final class MainChrome extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView v, int p) {
            bar.setProgress(p);
            bar.setVisibility(p >= 100 ? View.GONE : View.VISIBLE);
        }

        @Override
        public boolean onCreateWindow(WebView v, boolean isDialog, boolean isUserGesture, Message resultMsg) {
            if (examOn) return false;   /* no new window during the exam */
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

        @Override
        public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
            if (examOn) { cb.onReceiveValue(null); return true; }   /* the file picker would leave the app */
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

    /* ======================= the exam lock ======================= */

    int lockState() {
        ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        return am == null ? ActivityManager.LOCK_TASK_MODE_NONE : am.getLockTaskModeState();
    }

    boolean callRoleAvailable() {
        RoleManager rm = getSystemService(RoleManager.class);
        return rm != null && rm.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING);
    }

    boolean callRoleHeld() {
        RoleManager rm = getSystemService(RoleManager.class);
        return rm != null && rm.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING) && rm.isRoleHeld(RoleManager.ROLE_CALL_SCREENING);
    }

    /* step 1: calls (the "caller ID and spam app" choice), step 2: pin the app. The page gets the answer in __acsLockCb */
    void prepare() {
        if (preparing) return;
        if (isInMultiWindowMode()) { lockAnswer(false, "split"); return; }
        preparing = true;
        if (callRoleAvailable() && !callRoleHeld()) {
            try {
                RoleManager rm = getSystemService(RoleManager.class);
                startActivityForResult(rm.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING), REQ_ROLE);
                return;
            } catch (Exception e) {
                preparing = false;
                lockAnswer(false, "call");
                return;
            }
        }
        pin();
    }

    void pin() {
        if (lockState() != ActivityManager.LOCK_TASK_MODE_NONE) { preparing = false; lockAnswer(true, ""); return; }
        try { startLockTask(); } catch (Exception e) { preparing = false; lockAnswer(false, "pin"); return; }
        pinAskedAt = System.currentTimeMillis();
        ui.postDelayed(new Runnable() {
            @Override public void run() {
                if (!preparing) return;
                if (lockState() != ActivityManager.LOCK_TASK_MODE_NONE) { preparing = false; lockAnswer(true, ""); return; }
                long waited = System.currentTimeMillis() - pinAskedAt;
                /* the "pin this app?" question was closed without pinning, or nobody answered in 45 seconds */
                if ((waited > 4000 && hasWindowFocus()) || waited > 45000) { preparing = false; lockAnswer(false, "pin"); return; }
                ui.postDelayed(this, 300);
            }
        }, 300);
    }

    void lockAnswer(boolean ok, String step) {
        try {
            JSONObject o = new JSONObject();
            o.put("ok", ok);
            o.put("step", step);
            o.put("call", callRoleHeld());
            o.put("callAvail", callRoleAvailable());
            o.put("pinned", lockState() != ActivityManager.LOCK_TASK_MODE_NONE);
            js("__acsLockCb", o.toString());
        } catch (Exception ignore) { }
    }

    /* the exam starts: returns "ok" or why not */
    String startExam(String sid, String cid, String akey) {
        if (!sid.matches("[0-9a-f]{24}")) return "bad";
        if (lockState() == ActivityManager.LOCK_TASK_MODE_NONE) return "nopin";
        if (isInMultiWindowMode()) return "split";
        examOn = true; exSid = sid; stopped = false; ringSeen = false; screenOff = false; overlaySeen = false;
        prefs.edit().putBoolean("active", true).putString("sid", sid).putString("cid", cid).putString("akey", akey)
            .putString("pending", "").putLong("at", System.currentTimeMillis()).apply();
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if (Build.VERSION.SDK_INT >= 31) { try { getWindow().setHideOverlayWindows(true); } catch (Exception ignore) { } }
        closePopup();
        ui.removeCallbacks(monitor);
        ui.postDelayed(monitor, 1000);
        String readers = screenReaders();
        if (!readers.isEmpty()) flag("a11y", readers);
        return "ok";
    }

    /* the exam is over (finished, left by the learner, or ended by a rule): the lock goes */
    void endExam(boolean clearAll) {
        examOn = false;
        ui.removeCallbacks(monitor);
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if (Build.VERSION.SDK_INT >= 31) { try { getWindow().setHideOverlayWindows(false); } catch (Exception ignore) { } }
        if (lockState() != ActivityManager.LOCK_TASK_MODE_NONE) { try { stopLockTask(); } catch (Exception ignore) { } }
        if (clearAll) prefs.edit().clear().apply();
        else prefs.edit().putBoolean("active", false).apply();
    }

    /* a rule was broken: the exam ends. The page tells the server; if the page cannot, it is told on the next start */
    void abort(String reason) {
        if (!examOn) return;
        prefs.edit().putBoolean("active", false).putString("pending", reason).apply();
        endExam(false);
        event("abort", reason);
    }

    void flag(String kind, String detail) {
        if (!examOn) return;
        event("flag", detail == null || detail.isEmpty() ? kind : kind + ":" + detail);
    }

    void event(String kind, String detail) {
        final String k = kind, d = detail;
        ui.post(() -> js("__acsAppEvent", k, d));
    }

    static void callBlocked() {
        final MainActivity a = live.get();
        if (a != null) a.ui.post(() -> a.flag("callblocked", ""));
    }

    String screenReaders() {
        try {
            AccessibilityManager am = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
            if (am == null || !am.isEnabled()) return "";
            StringBuilder b = new StringBuilder();
            List<AccessibilityServiceInfo> list = am.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.FEEDBACK_ALL_MASK);
            for (AccessibilityServiceInfo i : list) {
                if ((i.getCapabilities() & AccessibilityServiceInfo.CAPABILITY_CAN_RETRIEVE_WINDOW_CONTENT) == 0) continue;
                String p = i.getResolveInfo() != null && i.getResolveInfo().serviceInfo != null ? i.getResolveInfo().serviceInfo.packageName : "";
                if (p.isEmpty()) continue;
                if (b.length() > 0) b.append(",");
                b.append(p);
            }
            return b.length() > 180 ? b.substring(0, 180) : b.toString();
        } catch (Exception e) {
            return "";
        }
    }

    boolean screenIsOff() {
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        return (pm != null && !pm.isInteractive()) || System.currentTimeMillis() - screenOffAt < 2500;
    }

    boolean keyguardUp() {
        KeyguardManager km = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
        return km != null && km.isKeyguardLocked();
    }

    int audioMode() {
        AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        return am == null ? AudioManager.MODE_NORMAL : am.getMode();
    }

    /* every second during the exam */
    void watch() {
        if (!examOn) return;
        if (lockState() == ActivityManager.LOCK_TASK_MODE_NONE) { abort("unpin"); return; }
        if (isInMultiWindowMode()) { abort("split"); return; }
        if (stopped) {
            int m = audioMode();
            if (m == AudioManager.MODE_IN_CALL || m == AudioManager.MODE_IN_COMMUNICATION) { abort("call"); return; }
            if (m == AudioManager.MODE_RINGTONE) ringSeen = true;
            boolean away = !screenIsOff() && !keyguardUp();
            long gone = System.currentTimeMillis() - stoppedAt;
            if (away && !screenOff && (!ringSeen || gone > LEAVE_WAIT_RING_MS)) { abort(ringSeen ? "call" : "left"); return; }
        }
        ui.postDelayed(monitor, 1000);
    }

    @Override
    protected void onStop() {
        super.onStop();
        if (!examOn) return;
        stopped = true;
        stoppedAt = System.currentTimeMillis();
        if (screenIsOff()) { screenOff = true; flag("screenoff", ""); return; }
        int m = audioMode();
        if (m == AudioManager.MODE_IN_CALL || m == AudioManager.MODE_IN_COMMUNICATION) { abort("call"); return; }
        if (m == AudioManager.MODE_RINGTONE) { ringSeen = true; flag("callrang", ""); return; }
        if (keyguardUp()) return;
        abort("left");
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (examOn && stopped) {
            stopped = false;
            if (screenOff) { screenOff = false; flag("screenon", ""); }
            ringSeen = false;
        }
    }

    @Override
    public void onMultiWindowModeChanged(boolean in) {
        super.onMultiWindowModeChanged(in);
        if (in && examOn) abort("split");
    }

    @Override
    public void onBackPressed() {
        if (examOn) { Toast.makeText(this, "परीक्षा के बीच पीछे नहीं जा सकते", Toast.LENGTH_SHORT).show(); return; }
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    /* ======================= speech ======================= */

    void ensureTts() {
        if (tts != null) return;
        tts = new TextToSpeech(getApplicationContext(), status -> ui.post(() -> {
            if (status != TextToSpeech.SUCCESS) { ttsFailed = true; flushTts(); return; }
            ttsReady = true;
            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { ui.post(() -> js("__acsTts", id, "start")); }
                @Override public void onDone(String id) { ui.post(() -> js("__acsTts", id, "end")); }
                @Override public void onError(String id) { ui.post(() -> js("__acsTts", id, "error", "synthesis-failed")); }
                @Override public void onError(String id, int code) { ui.post(() -> js("__acsTts", id, "error", "synthesis-failed")); }
                @Override public void onStop(String id, boolean interrupted) { ui.post(() -> js("__acsTts", id, "end")); }
            });
            voicesJson = buildVoices();
            js("__acsVoices", voicesJson);
            flushTts();
        }));
    }

    String buildVoices() {
        try {
            JSONArray a = new JSONArray();
            Set<Voice> vs = tts.getVoices();
            if (vs != null) for (Voice v : vs) {
                if (v == null || v.getLocale() == null) continue;
                JSONObject o = new JSONObject();
                o.put("name", v.getName());
                o.put("lang", v.getLocale().toLanguageTag());
                o.put("local", !v.isNetworkConnectionRequired());
                a.put(o);
            }
            return a.toString();
        } catch (Exception e) {
            return "[]";
        }
    }

    void flushTts() {
        ArrayList<Object[]> list = new ArrayList<>(ttsWait);
        ttsWait.clear();
        for (Object[] x : list) {
            if (ttsReady) speakNow((String) x[0], (String) x[1], (String) x[2], (Double) x[3], (Double) x[4], (String) x[5]);
            else js("__acsTts", (String) x[0], "error", "synthesis-unavailable");
        }
    }

    void speakNow(String id, String text, String lang, double rate, double pitch, String voiceName) {
        Voice chosen = null;
        if (!voiceName.isEmpty()) {
            try { for (Voice v : tts.getVoices()) if (voiceName.equals(v.getName())) { chosen = v; break; } } catch (Exception ignore) { }
        }
        if (chosen != null) tts.setVoice(chosen);
        else if (!lang.isEmpty()) {
            int r = tts.setLanguage(Locale.forLanguageTag(lang.replace('_', '-')));
            if (r < 0) { js("__acsTts", id, "error", "language-unavailable"); return; }
        }
        tts.setSpeechRate((float) Math.max(0.1, Math.min(4.0, rate)));
        tts.setPitch((float) Math.max(0.1, Math.min(2.0, pitch)));
        Bundle b = new Bundle();
        b.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, id);
        if (tts.speak(text, TextToSpeech.QUEUE_ADD, b, id) != TextToSpeech.SUCCESS) js("__acsTts", id, "error", "synthesis-failed");
    }

    void startListening(String id, String lang, boolean interim, int maxAlt) {
        if (checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            if (srWait != null) srEnd((String) srWait[0], "aborted");
            srWait = new Object[] { id, lang, interim, maxAlt };
            requestPermissions(new String[] { android.Manifest.permission.RECORD_AUDIO }, REQ_MIC);
            return;
        }
        if (!SpeechRecognizer.isRecognitionAvailable(this)) { srEnd(id, "service-not-allowed"); return; }
        stopRecognizer();
        srId = id;
        sr = SpeechRecognizer.createSpeechRecognizer(this);
        sr.setRecognitionListener(new RecognitionListener() {
            @Override public void onReadyForSpeech(Bundle p) { srSend(id, "start", "{}"); }
            @Override public void onBeginningOfSpeech() { srSend(id, "speech", "{}"); }
            @Override public void onRmsChanged(float v) { }
            @Override public void onBufferReceived(byte[] b) { }
            @Override public void onEndOfSpeech() { }
            @Override public void onError(int e) { if (id.equals(srId)) { stopRecognizer(); srEnd(id, srError(e)); } }
            @Override public void onResults(Bundle b) { if (id.equals(srId)) { srResult(id, b, true); stopRecognizer(); srSend(id, "end", "{}"); } }
            @Override public void onPartialResults(Bundle b) { if (interim && id.equals(srId)) srResult(id, b, false); }
            @Override public void onEvent(int t, Bundle p) { }
        });
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        if (!lang.isEmpty()) i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang.replace('_', '-'));
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, interim);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, Math.max(1, Math.min(5, maxAlt)));
        try { sr.startListening(i); } catch (Exception e) { stopRecognizer(); srEnd(id, "aborted"); }
    }

    void stopRecognizer() {
        if (sr != null) {
            try { sr.cancel(); } catch (Exception ignore) { }
            try { sr.destroy(); } catch (Exception ignore) { }
            sr = null;
        }
        srId = null;
    }

    static String srError(int e) {
        switch (e) {
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT: case SpeechRecognizer.ERROR_NETWORK: case SpeechRecognizer.ERROR_SERVER: return "network";
            case SpeechRecognizer.ERROR_AUDIO: return "audio-capture";
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT: case SpeechRecognizer.ERROR_NO_MATCH: return "no-speech";
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS: return "not-allowed";
            default: return "aborted";
        }
    }

    void srResult(String id, Bundle b, boolean fin) {
        try {
            ArrayList<String> alts = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            float[] conf = b.getFloatArray(SpeechRecognizer.CONFIDENCE_SCORES);
            if (alts == null || alts.isEmpty()) { if (fin) srSend(id, "error", "{\"error\":\"no-speech\"}"); return; }
            JSONObject o = new JSONObject();
            JSONArray a = new JSONArray(), c = new JSONArray();
            for (int k = 0; k < alts.size(); k++) {
                a.put(alts.get(k));
                c.put(conf != null && k < conf.length ? conf[k] : 0.0);
            }
            o.put("alts", a);
            o.put("conf", c);
            o.put("fin", fin);
            srSend(id, "result", o.toString());
        } catch (Exception ignore) { }
    }

    void srEnd(String id, String error) {
        srSend(id, "error", "{\"error\":\"" + error + "\"}");
        srSend(id, "end", "{}");
    }

    void srSend(String id, String kind, String json) { js("__acsSr", id, kind, json); }

    @Override
    public void onRequestPermissionsResult(int req, String[] perms, int[] res) {
        super.onRequestPermissionsResult(req, perms, res);
        if (req != REQ_MIC || srWait == null) return;
        Object[] w = srWait;
        srWait = null;
        if (res.length > 0 && res[0] == PackageManager.PERMISSION_GRANTED) startListening((String) w[0], (String) w[1], (Boolean) w[2], (Integer) w[3]);
        else srEnd((String) w[0], "not-allowed");
    }

    /* call a function of the page: window.<fn>(...strings) */
    void js(String fn, String... args) {
        if (web == null) return;
        StringBuilder b = new StringBuilder("window.").append(fn).append("&&window.").append(fn).append("(");
        for (int i = 0; i < args.length; i++) {
            if (i > 0) b.append(",");
            b.append(JSONObject.quote(args[i] == null ? "" : args[i]));
        }
        b.append(")");
        web.evaluateJavascript(b.toString(), null);
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == REQ_FILE && fileCb != null) {
            fileCb.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(res, data));
            fileCb = null;
        } else if (req == REQ_ROLE) {
            if (callRoleHeld()) pinAfterResume = true;   /* pinning works only when the app is in front (after onResume) */
            else { preparing = false; lockAnswer(false, "call"); }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (pinAfterResume) { pinAfterResume = false; ui.postDelayed(this::pin, 300); }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        if (web != null) web.saveState(out);
    }

    @Override
    protected void onDestroy() {
        closePopup();
        ui.removeCallbacksAndMessages(null);
        try { unregisterReceiver(screenRx); } catch (Exception ignore) { }
        stopRecognizer();
        if (tts != null) { try { tts.shutdown(); } catch (Exception ignore) { } tts = null; }
        if (web != null) {
            web.removeJavascriptInterface("ACSApp");
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    /* ======================= what the page can ask the app ======================= */
    final class Bridge {
        boolean ownPage() {
            try { return own(Uri.parse(curUrl)) && curUrl.startsWith("https://"); } catch (Exception e) { return false; }
        }

        @JavascriptInterface
        public String info() {
            return "{\"app\":\"ACS EXAM\",\"version\":\"" + BuildConfig.VERSION_NAME + "\",\"code\":" + BuildConfig.VERSION_CODE
                + ",\"sdk\":" + Build.VERSION.SDK_INT + ",\"lock\":" + LOCK_FEATURE + ",\"speech\":" + SPEECH_FEATURE + "}";
        }

        @JavascriptInterface
        public void retry() {
            runOnUiThread(() -> { if (web != null) web.loadUrl(lastUrl == null ? HOME : lastUrl); });
        }

        /* the exam's state on this phone: {sid, cid, akey, active, pending} or null */
        @JavascriptInterface
        public String examState() {
            if (!ownPage()) return "null";
            String sid = prefs.getString("sid", "");
            if (sid == null || sid.isEmpty()) return "null";
            try {
                JSONObject o = new JSONObject();
                o.put("sid", sid);
                o.put("cid", prefs.getString("cid", ""));
                o.put("akey", prefs.getString("akey", ""));
                o.put("active", prefs.getBoolean("active", false) && examOn);
                o.put("pending", prefs.getString("pending", ""));
                return o.toString();
            } catch (Exception e) {
                return "null";
            }
        }

        @JavascriptInterface
        public void lockPrepare() {
            if (!ownPage()) return;
            runOnUiThread(MainActivity.this::prepare);
        }

        @JavascriptInterface
        public String examOn(String sid, String cid, String akey) {
            if (!ownPage()) return "bad";
            final String[] out = { null };
            final Object lockObj = new Object();
            synchronized (lockObj) {
                runOnUiThread(() -> {
                    String r = startExam(String.valueOf(sid), String.valueOf(cid), String.valueOf(akey == null ? "" : akey));
                    synchronized (lockObj) { out[0] = r; lockObj.notifyAll(); }
                });
                long until = System.currentTimeMillis() + 3000;
                while (out[0] == null) {
                    long left = until - System.currentTimeMillis();
                    if (left <= 0) break;
                    try { lockObj.wait(left); } catch (InterruptedException e) { break; }
                }
            }
            return out[0] == null ? "busy" : out[0];
        }

        /* waits until the lock is really off, so the page can show its close button at once */
        @JavascriptInterface
        public void examOff() {
            if (!ownPage()) return;
            final boolean[] done = { false };
            final Object lockObj = new Object();
            synchronized (lockObj) {
                runOnUiThread(() -> { endExam(true); synchronized (lockObj) { done[0] = true; lockObj.notifyAll(); } });
                long until = System.currentTimeMillis() + 2000;
                while (!done[0]) {
                    long left = until - System.currentTimeMillis();
                    if (left <= 0) break;
                    try { lockObj.wait(left); } catch (InterruptedException e) { break; }
                }
            }
        }

        /* the page told the server why the exam ended: the note can go */
        @JavascriptInterface
        public void abortDone(String sid) {
            if (!ownPage()) return;
            runOnUiThread(() -> { if (!examOn && String.valueOf(sid).equals(prefs.getString("sid", ""))) prefs.edit().clear().apply(); });
        }

        @JavascriptInterface
        public void ttsSpeak(String id, String text, String lang, double rate, double pitch, String voice) {
            final String i = String.valueOf(id), t = String.valueOf(text), l = lang == null ? "" : lang, v = voice == null ? "" : voice;
            runOnUiThread(() -> {
                ensureTts();
                if (ttsFailed) { js("__acsTts", i, "error", "synthesis-unavailable"); return; }
                if (!ttsReady) { ttsWait.add(new Object[] { i, t, l, rate, pitch, v }); return; }
                speakNow(i, t, l, rate, pitch, v);
            });
        }

        @JavascriptInterface
        public void ttsStop() {
            runOnUiThread(() -> {
                ArrayList<Object[]> list = new ArrayList<>(ttsWait);
                ttsWait.clear();
                for (Object[] x : list) js("__acsTts", (String) x[0], "end");
                if (tts != null) { try { tts.stop(); } catch (Exception ignore) { } }
            });
        }

        @JavascriptInterface
        public String ttsVoices() { return voicesJson; }

        @JavascriptInterface
        public void srStart(String id, String lang, boolean interim, int maxAlt) {
            final String i = String.valueOf(id), l = lang == null ? "" : lang;
            runOnUiThread(() -> startListening(i, l, interim, maxAlt));
        }

        @JavascriptInterface
        public void srStop(String id) {
            runOnUiThread(() -> { if (sr != null && String.valueOf(id).equals(srId)) { try { sr.stopListening(); } catch (Exception ignore) { } } });
        }

        @JavascriptInterface
        public void srAbort(String id) {
            runOnUiThread(() -> { if (String.valueOf(id).equals(srId)) { stopRecognizer(); srSend(String.valueOf(id), "end", "{}"); } });
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
