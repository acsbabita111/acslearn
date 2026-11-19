/* ============================================================================
   ACS EXAM app : FaceCam.java  v1.1 (batch E-4, 19-Nov-2026: the picture's screen-reader name follows the panel language; v1.0 batch E-3)
   Founder's face rules (19-Nov-2026), only for the course final exam (never the career test):
     - a small face picture is always on the screen during the exam;
     - one photo at the start, then a photo only when the face leaves the camera or comes back;
     - a face leaving only raises a flag; a person at ACS decides;
     - the camera permission is required; under 18 the guardian's consent is required (asked by the page and the server).
   What this file does:
     - opens the FRONT camera (Camera2, no outside library), about one picture every 0.7 seconds, low frame rate;
     - finds faces in that picture on the phone itself (android.media.FaceDetector, part of Android);
     - shows the small round picture (mirrored, like a mirror) in a corner; green ring = one face, red = no face,
       gold = more than one face. The learner can drag it to another place;
     - makes the photos (JPEG, at most 640 pixels, sent to the page, which sends them to ACS's server).
   The phone never compares faces. Matching is done only on ACS's own server (functions/face_match.js).
   Nothing is saved on the phone: the pictures live only in memory.
   ============================================================================ */
package com.acslearn.exam;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Matrix;
import android.graphics.Outline;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.graphics.drawable.GradientDrawable;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CaptureRequest;
import android.hardware.camera2.params.StreamConfigurationMap;
import android.media.FaceDetector;
import android.media.Image;
import android.media.ImageReader;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Base64;
import android.util.Range;
import android.util.Size;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.widget.FrameLayout;
import android.widget.ImageView;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.Collections;

public class FaceCam {

    public interface Listener {
        void onCam(String state);                        /* "ok" or "fail:<why>" */
        void onFaces(int n);                             /* 0, 1 or 2 (= more than one), only when it changes */
        void onPhoto(String kind, String b64, int faces); /* b64 empty = no photo could be made */
    }

    static final long STEP_MS = 700, GONE_MS = 3000, BACK_MS = 1500, MANY_MS = 1400, MANY_GAP_MS = 60000;
    static final int AUTO_MAX = 20;           /* photos made by the app itself in one exam (the server keeps at most 25 with the start photo) */
    static final int DET_W = 240;             /* width used for finding faces on the phone */
    static final int PHOTO_MAX = 640, PHOTO_Q = 80;
    static final int C_WAIT = 0xFF9E9E9E, C_ONE = 0xFF2E7D32, C_NONE = 0xFFC62828, C_MANY = 0xFFF9A825;

    final Activity act;
    final FrameLayout root;
    final Listener l;
    final Handler ui = new Handler(Looper.getMainLooper());
    HandlerThread th;
    Handler bg;

    /* camera (background thread) */
    CameraDevice dev;
    CameraCaptureSession ses;
    ImageReader rd;
    int sensorDeg = 270;
    boolean opening = false;
    volatile boolean wanted = false, paused = false, auto = false;

    /* pictures and faces (background thread only) */
    long lastStep = 0;
    Bitmap last = null;
    int lastN = 0, shown = -1;
    FaceDetector fd = null;
    int fdH = 0;

    /* the app's own photos during the exam (background thread only) */
    int state = 0;      /* 0 = not known yet, 1 = face there, 2 = face gone */
    long noFaceSince = 0, faceSince = 0, manySince = 0, lastMany = 0;
    int autoCount = 0;

    /* the small round picture (main thread) */
    FrameLayout ring;
    ImageView thumb;
    GradientDrawable ringBg;
    float downX, downY, startTX, startTY;

    /* (E-4) the picture's name for screen readers, in the panel language (Words.java) */
    String label = "चेहरे का कैमरा";
    void setLabel(String s) {
        if (s == null || s.isEmpty()) return;
        label = s;
        if (ring != null) ring.setContentDescription(s);
    }

    public FaceCam(Activity act, FrameLayout root, Listener l) {
        this.act = act;
        this.root = root;
        this.l = l;
    }

    boolean hasPermission() {
        return act.checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
    }

    boolean isOn() { return wanted; }

    int dp(int v) { return Math.round(v * act.getResources().getDisplayMetrics().density); }

    /* ---------- open / close (called on the main thread) ---------- */

    public void open() {
        wanted = true;
        paused = false;
        if (!hasPermission()) { l.onCam("fail:perm"); return; }
        showRing();
        startThread();
        bg.post(this::openCam);
    }

    public void close() {
        wanted = false;
        auto = false;
        hideRing();
        if (bg != null) bg.post(() -> { closeCam(); shown = -1; lastN = 0; if (last != null) { last.recycle(); last = null; } });
    }

    /* the app went to the background (Android does not allow the camera there) */
    public void pause() {
        if (!wanted) return;
        paused = true;
        if (bg != null) bg.post(this::closeCam);
    }

    public void resume() {
        if (!wanted || !paused) return;
        paused = false;
        if (!hasPermission()) { l.onCam("fail:perm"); return; }
        startThread();
        bg.post(() -> { state = 0; noFaceSince = 0; faceSince = 0; manySince = 0; openCam(); });
    }

    public void shutdown() {
        wanted = false;
        auto = false;
        hideRing();
        if (bg != null) {
            bg.post(() -> {
                closeCam();
                if (last != null) { last.recycle(); last = null; }
            });
            th.quitSafely();
            th = null;
            bg = null;
        }
    }

    /* the exam started (true) or ended (false): the app makes its own photos only during the exam */
    public void setAuto(boolean on) {
        auto = on;
        if (bg != null) bg.post(() -> { state = 0; noFaceSince = 0; faceSince = 0; manySince = 0; lastMany = 0; if (on) autoCount = 0; });
    }

    /* a photo asked by the page (the start photo) */
    public void photo(String kind) {
        if (bg == null) { ui.post(() -> l.onPhoto(kind, "", -1)); return; }
        bg.post(new Runnable() {
            int waited = 0;
            @Override public void run() {
                if (last == null && waited < 8 && wanted) { waited++; bg.postDelayed(this, 500); return; }
                makePhoto(kind, lastN);
            }
        });
    }

    void startThread() {
        if (th != null) return;
        th = new HandlerThread("acs-face");
        th.start();
        bg = new Handler(th.getLooper());
    }

    /* ---------- the camera (background thread) ---------- */

    void openCam() {
        if (!wanted || paused || dev != null || opening) {
            if (dev != null) { final int sh = shown; ui.post(() -> { l.onCam("ok"); if (sh >= 0) l.onFaces(sh); }); }   /* already open: tell the page again */
            return;
        }
        CameraManager cm = (CameraManager) act.getSystemService(Context.CAMERA_SERVICE);
        try {
            String id = null;
            CameraCharacteristics cc = null;
            for (String c : cm.getCameraIdList()) {
                CameraCharacteristics x = cm.getCameraCharacteristics(c);
                Integer f = x.get(CameraCharacteristics.LENS_FACING);
                if (f != null && f == CameraCharacteristics.LENS_FACING_FRONT) { id = c; cc = x; break; }
            }
            if (id == null) { fail("nofront"); return; }
            Integer so = cc.get(CameraCharacteristics.SENSOR_ORIENTATION);
            sensorDeg = so == null ? 270 : so;
            StreamConfigurationMap map = cc.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
            Size sz = pickSize(map == null ? null : map.getOutputSizes(ImageFormat.YUV_420_888));
            final Range<Integer> fps = pickFps(cc.get(CameraCharacteristics.CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES));
            rd = ImageReader.newInstance(sz.getWidth(), sz.getHeight(), ImageFormat.YUV_420_888, 2);
            rd.setOnImageAvailableListener(this::onImage, bg);
            opening = true;
            cm.openCamera(id, new CameraDevice.StateCallback() {
                @Override
                public void onOpened(CameraDevice d) {
                    opening = false;
                    if (!wanted || paused) { d.close(); return; }
                    dev = d;
                    try {
                        d.createCaptureSession(Collections.singletonList(rd.getSurface()), new CameraCaptureSession.StateCallback() {
                            @Override
                            public void onConfigured(CameraCaptureSession s) {
                                if (dev == null) { s.close(); return; }
                                ses = s;
                                try {
                                    CaptureRequest.Builder b = dev.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
                                    b.addTarget(rd.getSurface());
                                    b.set(CaptureRequest.CONTROL_MODE, CaptureRequest.CONTROL_MODE_AUTO);
                                    if (fps != null) b.set(CaptureRequest.CONTROL_AE_TARGET_FPS_RANGE, fps);
                                    s.setRepeatingRequest(b.build(), null, bg);
                                    ui.post(() -> l.onCam("ok"));
                                } catch (Exception e) {
                                    fail("start");
                                }
                            }

                            @Override
                            public void onConfigureFailed(CameraCaptureSession s) { fail("config"); }
                        }, bg);
                    } catch (Exception e) {
                        fail("session");
                    }
                }

                @Override
                public void onDisconnected(CameraDevice d) {
                    opening = false;
                    closeCam();
                    if (wanted && !paused) bg.postDelayed(FaceCam.this::openCam, 1500);   /* another app took the camera for a moment */
                }

                @Override
                public void onError(CameraDevice d, int error) {
                    opening = false;
                    closeCam();
                    fail("error" + error);
                    if (wanted && !paused) bg.postDelayed(FaceCam.this::openCam, 3000);
                }
            }, bg);
        } catch (SecurityException e) {
            opening = false;
            fail("perm");
        } catch (CameraAccessException | RuntimeException e) {
            opening = false;
            fail("open");
        }
    }

    void closeCam() {
        try { if (ses != null) ses.close(); } catch (Exception ignore) { }
        ses = null;
        try { if (dev != null) dev.close(); } catch (Exception ignore) { }
        dev = null;
        try { if (rd != null) rd.close(); } catch (Exception ignore) { }
        rd = null;
    }

    void fail(String why) {
        closeCam();
        ui.post(() -> { l.onCam("fail:" + why); paintRing(-1); });
    }

    static Size pickSize(Size[] all) {
        if (all == null || all.length == 0) return new Size(640, 480);
        Size best = all[0];
        long want = 640L * 480L, bestD = Long.MAX_VALUE;
        for (Size s : all) {
            if (s.getWidth() > 1280 || s.getHeight() > 1280) continue;
            long d = Math.abs((long) s.getWidth() * s.getHeight() - want);
            boolean fourThree = s.getWidth() * 3 == s.getHeight() * 4;
            if (fourThree) d = d / 2;   /* 4:3 is the camera's own shape: a little preferred */
            if (d < bestD) { bestD = d; best = s; }
        }
        return best;
    }

    /* the lowest frame rate that is still at least 10 a second: less battery, better pictures in dim light */
    static Range<Integer> pickFps(Range<Integer>[] all) {
        if (all == null || all.length == 0) return null;
        Range<Integer> best = null;
        for (Range<Integer> r : all) {
            if (r.getUpper() < 10) continue;
            if (best == null || r.getUpper() < best.getUpper() || (r.getUpper().equals(best.getUpper()) && r.getLower() < best.getLower())) best = r;
        }
        return best;
    }

    /* how much the camera picture must be turned to stand upright (front camera) */
    int turnDeg() {
        int disp = 0;
        try {
            int r = act.getWindowManager().getDefaultDisplay().getRotation();
            disp = r == Surface.ROTATION_90 ? 90 : r == Surface.ROTATION_180 ? 180 : r == Surface.ROTATION_270 ? 270 : 0;
        } catch (Exception ignore) { }
        return (sensorDeg + disp) % 360;
    }

    void onImage(ImageReader r) {
        Image img = null;
        try {
            img = r.acquireLatestImage();
            if (img == null) return;
            long now = System.currentTimeMillis();
            if (now - lastStep < STEP_MS) return;
            lastStep = now;
            int w = img.getWidth(), h = img.getHeight();
            byte[] nv = nv21(img);
            img.close();
            img = null;
            step(nv, w, h, now);
        } catch (Throwable e) {
            /* one bad picture: the next one will come */
        } finally {
            if (img != null) { try { img.close(); } catch (Exception ignore) { } }
        }
    }

    static byte[] nv21(Image img) {
        int w = img.getWidth(), h = img.getHeight();
        byte[] out = new byte[w * h + 2 * (w / 2) * (h / 2)];
        Image.Plane[] p = img.getPlanes();
        ByteBuffer yb = p[0].getBuffer();
        int yr = p[0].getRowStride(), yp = p[0].getPixelStride(), o = 0;
        if (yp == 1) {
            for (int row = 0; row < h; row++) { yb.position(row * yr); yb.get(out, o, w); o += w; }
        } else {
            for (int row = 0; row < h; row++) for (int c = 0; c < w; c++) out[o++] = yb.get(row * yr + c * yp);
        }
        ByteBuffer ub = p[1].getBuffer(), vb = p[2].getBuffer();
        int ur = p[1].getRowStride(), up = p[1].getPixelStride(), vr = p[2].getRowStride(), vp = p[2].getPixelStride();
        int cw = w / 2, ch = h / 2;
        for (int row = 0; row < ch; row++) {
            for (int c = 0; c < cw; c++) {
                out[o++] = vb.get(row * vr + c * vp);
                out[o++] = ub.get(row * ur + c * up);
            }
        }
        return out;
    }

    void step(byte[] nv, int w, int h, long now) {
        YuvImage yi = new YuvImage(nv, ImageFormat.NV21, w, h, null);
        ByteArrayOutputStream bo = new ByteArrayOutputStream(w * h / 4);
        if (!yi.compressToJpeg(new Rect(0, 0, w, h), 85, bo)) return;
        byte[] jb = bo.toByteArray();
        Bitmap raw = BitmapFactory.decodeByteArray(jb, 0, jb.length);
        if (raw == null) return;
        int deg = turnDeg();
        Bitmap up = raw;
        if (deg != 0) {
            Matrix m = new Matrix();
            m.postRotate(deg);
            up = Bitmap.createBitmap(raw, 0, 0, raw.getWidth(), raw.getHeight(), m, true);
            if (up != raw) raw.recycle();
        }
        int n = faces(up);
        Bitmap old = last;
        last = up;
        lastN = n;
        if (old != null && old != up) old.recycle();
        final Bitmap small = mirrorSmall(up);
        final int cat = Math.min(n, 2);
        ui.post(() -> { if (thumb != null && small != null) thumb.setImageBitmap(small); paintRing(cat); });
        if (cat != shown) { shown = cat; ui.post(() -> l.onFaces(cat)); }
        if (auto) autoStep(n, now);
    }

    /* faces on the phone: only to know "one face / no face / more than one". Not for matching. */
    int faces(Bitmap up) {
        try {
            int dh = Math.round(up.getHeight() * (DET_W / (float) up.getWidth()));
            if (dh < 2) return 0;
            Bitmap small = Bitmap.createScaledBitmap(up, DET_W, dh, true);
            Bitmap b565 = small.copy(Bitmap.Config.RGB_565, false);
            if (small != up) small.recycle();
            if (fd == null || fdH != dh) { fd = new FaceDetector(DET_W, dh, 3); fdH = dh; }
            FaceDetector.Face[] fs = new FaceDetector.Face[3];
            int c = fd.findFaces(b565, fs), n = 0;
            for (int i = 0; i < c; i++) if (fs[i] != null && fs[i].confidence() >= 0.4f && fs[i].eyesDistance() >= 10f) n++;
            b565.recycle();
            return n;
        } catch (Throwable e) {
            return 0;
        }
    }

    static Bitmap mirrorSmall(Bitmap up) {
        try {
            Matrix m = new Matrix();
            float s = 160f / Math.max(up.getWidth(), up.getHeight());
            m.postScale(-s, s);
            return Bitmap.createBitmap(up, 0, 0, up.getWidth(), up.getHeight(), m, true);
        } catch (Throwable e) {
            return null;
        }
    }

    void autoStep(int n, long now) {
        boolean seen = n >= 1;
        if (seen) { noFaceSince = 0; if (faceSince == 0) faceSince = now; }
        else { faceSince = 0; if (noFaceSince == 0) noFaceSince = now; }
        if (state == 0) {
            if (seen) state = 1;
            else if (now - noFaceSince >= GONE_MS) { state = 2; snap("leave", n); }
        } else if (state == 1) {
            if (!seen && now - noFaceSince >= GONE_MS) { state = 2; snap("leave", n); }
        } else if (seen && now - faceSince >= BACK_MS) {
            state = 1;
            snap("back", n);
        }
        if (n >= 2) {
            if (manySince == 0) manySince = now;
            if (now - manySince >= MANY_MS && now - lastMany >= MANY_GAP_MS) { lastMany = now; snap("many", n); }
        } else {
            manySince = 0;
        }
    }

    void snap(String kind, int n) {
        if (autoCount >= AUTO_MAX) return;
        autoCount++;
        makePhoto(kind, n);
    }

    void makePhoto(String kind, int n) {
        String b64 = "";
        try {
            Bitmap src = last;
            if (src != null) {
                Bitmap b = src;
                float s = PHOTO_MAX / (float) Math.max(src.getWidth(), src.getHeight());
                if (s < 1f) b = Bitmap.createScaledBitmap(src, Math.round(src.getWidth() * s), Math.round(src.getHeight() * s), true);
                ByteArrayOutputStream bo = new ByteArrayOutputStream(64 * 1024);
                b.compress(Bitmap.CompressFormat.JPEG, PHOTO_Q, bo);
                if (b != src) b.recycle();
                b64 = Base64.encodeToString(bo.toByteArray(), Base64.NO_WRAP);
            }
        } catch (Throwable e) {
            b64 = "";
        }
        final String out = b64;
        final int faces = src0(n);
        ui.post(() -> l.onPhoto(kind, out, faces));
    }

    static int src0(int n) { return n < 0 ? -1 : n; }

    /* ---------- the small round picture (main thread) ---------- */

    void showRing() {
        if (ring != null) { ring.setVisibility(View.VISIBLE); ring.bringToFront(); return; }
        ring = new FrameLayout(act);
        ringBg = new GradientDrawable();
        ringBg.setShape(GradientDrawable.OVAL);
        ringBg.setColor(0xFF0B1F3A);
        ringBg.setStroke(dp(4), C_WAIT);
        ring.setBackground(ringBg);
        ring.setElevation(dp(8));
        ring.setContentDescription(label);
        thumb = new ImageView(act);
        thumb.setScaleType(ImageView.ScaleType.CENTER_CROP);
        thumb.setOutlineProvider(new ViewOutlineProvider() {
            @Override public void getOutline(View v, Outline o) { o.setOval(0, 0, v.getWidth(), v.getHeight()); }
        });
        thumb.setClipToOutline(true);
        FrameLayout.LayoutParams tl = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        tl.setMargins(dp(5), dp(5), dp(5), dp(5));
        ring.addView(thumb, tl);
        FrameLayout.LayoutParams rl = new FrameLayout.LayoutParams(dp(76), dp(76));
        rl.gravity = Gravity.TOP | Gravity.END;
        rl.topMargin = dp(64);
        rl.rightMargin = dp(8);
        ring.setOnTouchListener((v, e) -> {
            switch (e.getActionMasked()) {
                case MotionEvent.ACTION_DOWN:
                    downX = e.getRawX(); downY = e.getRawY(); startTX = v.getTranslationX(); startTY = v.getTranslationY();
                    return true;
                case MotionEvent.ACTION_MOVE:
                    float nx = startTX + e.getRawX() - downX, ny = startTY + e.getRawY() - downY;
                    View p = (View) v.getParent();
                    if (p != null) {
                        float minX = -(p.getWidth() - v.getWidth() - dp(16)), maxY = p.getHeight() - v.getHeight() - dp(80);
                        nx = Math.max(minX, Math.min(0, nx));
                        ny = Math.max(-dp(56), Math.min(maxY, ny));
                    }
                    v.setTranslationX(nx);
                    v.setTranslationY(ny);
                    return true;
                default:
                    return true;
            }
        });
        root.addView(ring, rl);
        ring.bringToFront();
    }

    void hideRing() {
        ui.post(() -> {
            if (ring == null) return;
            ring.setVisibility(View.GONE);
            if (thumb != null) thumb.setImageDrawable(null);
            paintRing(-1);
        });
    }

    void paintRing(int cat) {
        if (ringBg == null) return;
        int c = cat < 0 ? C_WAIT : cat == 0 ? C_NONE : cat == 1 ? C_ONE : C_MANY;
        ringBg.setStroke(dp(4), c);
    }
}
