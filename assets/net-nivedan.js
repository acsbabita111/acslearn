/* ============================================================
   /assets/net-nivedan.js v1.3 (27-Nov-2026) : "सुधार का निवेदन" और "नया फ़र्म जोड़ें"
   v1.3 (खेप N-6, IT-सूची): सूची-नंबर के और रूप भी चलते हैं (KHG-IT-130, PAT-IT-CAND-0057, BR-IT-KHG-0001: IT-सर्वे के अपने नंबर)।
     पहले सिर्फ़ तीन टुकड़ों वाला, दो अक्षर से शुरू होने वाला रूप चलता था। server की फ़ाइल में भी यही एक पंक्ति बदलती है (दफ़्तर वाली zip)।
   v1.2 (पिन-घर): पिन भरते ही ज़िला और राज्य अपनी ही साइट की सरकारी सूची से; पंचायत और प्रखंड के सुझाव; बेमेल पिन पर चेतावनी।
   v1.1: सफलता पर तीन अलग बातें (निवेदन मिला · RM की जाँच · स्वीकृति के बाद ही website पर बदलाव); server का "save" कारण।
   पन्ना: /network/nivedan/ और /en/network/nivedan/ (generator/build_network.js से; शब्द पन्ने के <script id="nvT"> में, ui.js के nv से)।
   Founder (25-Nov-2026): रजिस्टर्ड यूज़र ही एडिट कर सकते हैं। क्रम: रजिस्ट्रेशन नंबर (बगल में "नया रजिस्ट्रेशन करें") →
   उसी खाते का ईमेल + पासवर्ड → OTP → फ़ॉर्म (24 सेक्टर, उनके 951 उद्यम या नया नाम, फ़ोटो, उद्यम रजिस्ट्रेशन, ऑडिट रिपोर्ट,
   "यह सूचना सभी यूज़र को दिखेगी" की सहमति) → सबमिट → "आपका अनुरोध सफलतापूर्वक RM को भेज दिया गया है…"।
   server (office का functions/network_nivedan.js): nivedanOtpSend, nivedanOtpVerify, submitListingEdit। OTP server बनाता और
   जाँचता है; यह पन्ना OTP कभी नहीं बनाता। रजिस्ट्रेशन उसी खाते का है या नहीं, यह भी server देखता है। फ़ाइलें server तक जाती हैं,
   पन्ना database में ख़ुद कुछ नहीं लिखता। स्वीकृति RM की (dashboard का "📝 सूची-सुधार निवेदन" पैनल)।
   कड़ी: ?m=sudhar&id=<ID>&s=<राज्य>&k=<सूची>&d=<ज़िला>  या  ?m=naya[&s=&k=&d=]  (कार्ड के बटन से)।
   सुरक्षा: हर नाम/पता/पाठ esc() से; 10 मिनट कुछ न हो तो (इस पन्ने ने लॉगिन किया हो तो) लॉगआउट।
   Firebase तभी आता है जब रजिस्ट्रेशन नंबर लिखकर "आगे बढ़ें" दबाया जाए (पन्ना हल्का)।
   ============================================================ */
const app = document.getElementById("nvApp"), TEL = document.getElementById("nvT");
const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
const CFG = { apiKey: "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM", authDomain: "acslearn-platform.firebaseapp.com", projectId: "acslearn-platform",
  storageBucket: "acslearn-platform.firebasestorage.app", messagingSenderId: "435395814481", appId: "1:435395814481:web:655f99452a90f8efbc4470" };
const MAXB = 2 * 1024 * 1024, IDLE_MS = 10 * 60 * 1000, RESEND_S = 600;
const esc = (v) => String(v === null || v === undefined ? "" : v).replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] === undefined ? m : o[k]));
const paren = (v) => String(v === null || v === undefined ? "" : v).replace(/\[/g, "(").replace(/\]/g, ")");
const $ = (id) => document.getElementById(id);
const SLUG = /^[a-z0-9-]{1,40}$/, IDRE = /^[A-Z]{2,3}(?:-[A-Z0-9]{2,8}){2,3}$/, REG = /^[A-Za-z0-9_.-]{3,60}$/;
const UDYAM_RE = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;

if (app && TEL) main().catch(() => { app.innerHTML = '<p class="nw-note">⚠️</p>'; });

async function main() {
  const T = JSON.parse(TEL.textContent), L = T.lang === "hi" ? "hi" : "en";
  const P = new URLSearchParams(location.search);
  const ctx = { mode: P.get("m") === "naya" || (!P.get("m") && !P.get("id")) ? "naya" : "sudhar", id: String(P.get("id") || "").toUpperCase(),
    s: P.get("s") || "", k: P.get("k") || "", d: P.get("d") || "" };
  const S = { reg: "", weSigned: false, fb: null, user: null, rec: null, dist: null, sec: null, st: null, nv: null, idle: null, timer: null, busy: false };
  const say = (html) => { app.innerHTML = html; };
  const note = (t, cls) => '<div class="nw-res"><div class="' + (cls || "bad") + '">' + esc(t) + "</div></div>";
  const waLink = () => "https://wa.me/" + T.wa + "?text=" + encodeURIComponent("[NET-NIVEDAN] " + T.waText + (ctx.id ? " · " + ctx.id : "") + "\n");
  const waBtn = () => '<div class="nw-btns"><a class="nw-btn wa" href="' + esc(waLink()) + '" target="_blank" rel="noopener">' + esc(T.waBtn) + "</a></div>";
  const back = () => '<p><a class="nw-btn alt" href="' + esc(T.hubUrl) + '">' + esc(T.back) + "</a></p>";
  const head = () => {
    let h = '<h2 class="nw-h1" style="font-size:1.35rem">' + esc(ctx.mode === "naya" ? T.hNaya : T.hSudhar) + "</h2>";
    if (S.rec) h += '<div class="nv-card"><div class="nv-k">' + esc(T.forName) + '</div><b style="font-size:19px">' + esc(paren(S.rec.n)) + "</b>" +
      '<div class="nw-row">📍 ' + esc([S.rec.b, S.dist ? S.dist[L] : "", S.st ? S.st[L] : ""].filter(Boolean).join(" · ")) + "</div>" +
      (S.rec.a ? '<div class="nw-row">🏠 ' + esc(paren(S.rec.a)) + (S.rec.pn ? " · " + esc(S.rec.pn) : "") + "</div>" : "") +
      '<div class="nw-row muted">' + esc(T.fId) + ": " + esc(S.rec.i) + "</div></div>";
    else if (ctx.mode === "naya" && S.dist) h += '<div class="nv-card"><div class="nv-k">' + esc(T.forPlace) + "</div><b>" +
      esc((S.sec ? S.sec.icon + " " + S.sec[L] + " · " : "") + S.dist[L] + " · " + S.st[L]) + "</b></div>";
    return h;
  };

  /* ---------- 1) कड़ी से सूची और नाम (index.json + ज़िले की .json) ---------- */
  const getJson = async (u) => { const r = await fetch(u, { credentials: "omit" }); if (!r.ok) throw new Error("http " + r.status); return r.json(); };
  if (ctx.s || ctx.k || ctx.d || ctx.mode === "sudhar") {
    if (!SLUG.test(ctx.s) || !SLUG.test(ctx.k) || !SLUG.test(ctx.d) || (ctx.mode === "sudhar" && !IDRE.test(ctx.id))) { say(note(T.badLink) + back()); return; }
    let idx;
    try { idx = await getJson(app.getAttribute("data-index")); } catch (e) { say(note(T.err) + waBtn()); return; }
    S.sec = (idx.sectors || []).find((x) => x.key === ctx.k) || null;
    S.st = (idx.states || []).find((x) => x.slug === ctx.s) || null;
    const SS = S.st && S.st.sectors ? S.st.sectors[ctx.k] : null;
    S.dist = SS ? (SS.districts || []).find((x) => x.slug === ctx.d) || null : null;
    if (!S.sec || !S.dist) { say(note(T.badLink) + back()); return; }
    if (ctx.mode === "sudhar") {
      let sh;
      try { sh = await getJson(S.dist.shard); } catch (e) { say(note(T.err) + waBtn()); return; }
      S.rec = (sh.r || []).find((x) => x.i === ctx.id) || null;
      if (!S.rec) { say(note(T.notFound) + back()); return; }
    }
  }

  /* ---------- 10 मिनट कुछ न हो: लॉगआउट (इस पन्ने ने लॉगिन किया हो तो) ---------- */
  const poke = () => {
    clearTimeout(S.idle);
    S.idle = setTimeout(async () => {
      clearInterval(S.timer);
      if (S.weSigned && S.fb) { try { await S.fb.A.signOut(S.fb.auth); } catch (e) {} S.weSigned = false; }
      gate(T.idle);
    }, IDLE_MS);
  };
  ["click", "keydown", "input", "touchstart"].forEach((ev) => document.addEventListener(ev, poke, { passive: true }));

  /* ---------- Firebase (देर से) ---------- */
  async function fb() {
    if (S.fb) return S.fb;
    const [AP, A, F] = await Promise.all([import(FB + "firebase-app.js"), import(FB + "firebase-auth.js"), import(FB + "firebase-functions.js")]);
    const fa = AP.getApps().length ? AP.getApp() : AP.initializeApp(CFG);
    const auth = A.getAuth(fa), fns = F.getFunctions(fa, "us-central1");
    await new Promise((res) => { const un = A.onAuthStateChanged(auth, () => { un(); res(); }); });
    S.fb = { A, F, auth, call: (n) => F.httpsCallable(fns, n, { timeout: 120000 }) };
    return S.fb;
  }
  /* server की ग़लती → पन्ने का शब्द (details.reason, ui.js के nv.rs से) */
  function errText(e) {
    const c = String((e && e.code) || ""), d = (e && e.details) || {};
    if (/not-found$/.test(c) && !d.reason) return T.notReady;   /* function अभी server पर नहीं */
    if (/unauthenticated$/.test(c)) return T.rs.login;
    if (d.reason && T.rs[d.reason]) return fmt(T.rs[d.reason], d);
    if (/network|unavailable|deadline/.test(c)) return T.net;
    return T.err;
  }
  const maskMail = (m) => { const p = String(m || "").split("@"); return p.length === 2 ? p[0].slice(0, 2) + "***@" + p[1] : "***"; };

  /* ---------- 2) रजिस्ट्रेशन नंबर ---------- */
  function gate(msg) {
    clearInterval(S.timer);
    say(head() + '<div class="nv-step"><p class="nv-gate">' + esc(T.gate) + "</p>" +
      '<label class="nw-lbl" for="nvReg">' + esc(T.regLbl) + '</label><input class="nw-inp" id="nvReg" type="text" maxlength="60" autocomplete="off" value="' + esc(S.reg) + '"/>' +
      '<div class="nv-row2" style="margin-top:12px"><button class="nw-btn" id="nvNext" type="button">' + esc(T.next) + "</button>" +
      '<a class="nw-btn alt" href="' + esc(T.joinUrl) + '">' + esc(T.newReg) + "</a></div>" +
      '<div id="nvMsg">' + (msg ? note(msg) : "") + "</div></div>" + waBtn());
    $("nvNext").onclick = () => {
      const v = $("nvReg").value.trim().toUpperCase();
      if (!REG.test(v)) { $("nvMsg").innerHTML = note(T.regBad); return; }
      S.reg = v; login();
    };
  }

  /* ---------- 3) लॉगिन (उसी खाते से) ---------- */
  async function login(msg) {
    say(head() + '<div class="nv-step"><p class="nw-note">' + esc(T.loading) + "</p></div>");
    let F;
    try { F = await fb(); } catch (e) { gate(T.net); return; }
    const u = F.auth.currentUser;
    if (u) {
      say(head() + '<div class="nv-step"><p class="nv-gate">' + esc(fmt(T.already, { e: maskMail(u.email) })) + "</p>" +
        '<div class="nv-row2"><button class="nw-btn" id="nvUse" type="button">' + esc(T.useThis) + '</button><button class="nw-btn alt" id="nvOther" type="button">' + esc(T.other) + "</button></div>" +
        '<div id="nvMsg">' + (msg ? note(msg) : "") + "</div></div>");
      $("nvUse").onclick = () => otp(true);
      $("nvOther").onclick = async () => { try { await F.A.signOut(F.auth); } catch (e) {} S.weSigned = false; login(); };
      return;
    }
    say(head() + '<div class="nv-step"><h2>' + esc(T.loginH) + "</h2>" +
      '<label class="nw-lbl" for="nvEm">' + esc(T.email) + '</label><input class="nw-inp" id="nvEm" type="email" autocomplete="email" maxlength="120"/>' +
      '<label class="nw-lbl" for="nvPw">' + esc(T.pass) + '</label><input class="nw-inp" id="nvPw" type="password" autocomplete="current-password" maxlength="128"/>' +
      '<div class="nv-row2" style="margin-top:12px"><button class="nw-btn" id="nvLog" type="button">' + esc(T.loginBtn) + "</button>" +
      '<a class="nw-btn alt" href="' + esc(T.dashUrl) + '">' + esc(T.forgot) + "</a></div>" +
      '<div id="nvMsg">' + (msg ? note(msg) : "") + "</div></div>");
    $("nvLog").onclick = async () => {
      if (S.busy) return;
      const em = $("nvEm").value.trim().toLowerCase(), pw = $("nvPw").value;
      if (!/^\S+@\S+\.\S+$/.test(em) || !pw) { $("nvMsg").innerHTML = note(T.loginBad); return; }
      S.busy = true; $("nvMsg").innerHTML = note(T.wait, "wait");
      try {
        await F.A.signInWithEmailAndPassword(F.auth, em, pw);
        S.weSigned = true;
        try { await F.call("claimSession")({}); } catch (e) {}   /* एक ID एक जगह (v1.2): दूसरी जगह का पुराना login बंद */
        S.busy = false; otp(true);
      } catch (e) {
        S.busy = false;
        const c = String((e && e.code) || "");
        $("nvMsg").innerHTML = note(/too-many/.test(c) ? T.tooMany : /network/.test(c) ? T.net : T.loginBad);
      }
    };
  }

  /* ---------- 4) OTP (server भेजता और जाँचता है) ---------- */
  async function otp(send) {
    const F = S.fb; let sentTo = "", wait = RESEND_S, msg = "";
    if (send) {
      say(head() + '<div class="nv-step"><p class="nw-note">' + esc(T.wait) + "</p></div>");
      try { const r = await F.call("nivedanOtpSend")({ regNo: S.reg, lang: L }); sentTo = (r.data && r.data.to) || ""; }
      catch (e) {
        const d = (e && e.details) || {};
        if (d.reason === "wait") { wait = Math.max(1, d.s || RESEND_S); msg = errText(e); }
        else { const r = d.reason; if (r === "notYours" || r === "regMissing" || r === "regClosed") { gate(errText(e)); return; }
          if (errText(e) === T.notReady) { say(head() + note(T.notReady) + waBtn() + back()); return; }   /* server पर अभी नहीं: WhatsApp का रास्ता */
          login(errText(e)); return; }
      }
    }
    say(head() + '<div class="nv-step"><h2>' + esc(T.otpH) + "</h2>" + (sentTo ? '<p class="nw-note">' + esc(fmt(T.otpSent, { e: sentTo })) + "</p>" : "") +
      '<label class="nw-lbl" for="nvOtp">' + esc(T.otpLbl) + '</label><input class="nw-inp nv-otp" id="nvOtp" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code"/>' +
      '<div class="nv-row2" style="margin-top:12px"><button class="nw-btn" id="nvChk" type="button">' + esc(T.otpBtn) + '</button><button class="nw-btn alt" id="nvRe" type="button" disabled></button></div>' +
      '<div id="nvMsg">' + (msg ? note(msg) : "") + "</div></div>");
    const re = $("nvRe"); let left = wait;
    const tick = () => { if (left > 0) { re.disabled = true; re.textContent = fmt(T.resendIn, { t: String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0") }); left--; }
      else { clearInterval(S.timer); re.disabled = false; re.textContent = T.resend; } };
    clearInterval(S.timer); tick(); S.timer = setInterval(tick, 1000);
    re.onclick = () => { clearInterval(S.timer); otp(true); };
    $("nvChk").onclick = async () => {
      if (S.busy) return;
      const code = $("nvOtp").value.replace(/\D/g, "");
      if (code.length !== 6) { $("nvMsg").innerHTML = note(T.otpLbl); return; }
      S.busy = true; $("nvMsg").innerHTML = note(T.wait, "wait");
      try { await F.call("nivedanOtpVerify")({ regNo: S.reg, code }); S.busy = false; clearInterval(S.timer); form(); }
      catch (e) { S.busy = false; $("nvMsg").innerHTML = note(errText(e)); $("nvOtp").value = ""; }
    };
  }

  /* ---------- 5) फ़ॉर्म ---------- */
  async function form(msg) {
    say(head() + '<div class="nv-step"><p class="nw-note">' + esc(T.loading) + "</p></div>");
    if (!S.nv) { try { S.nv = await getJson(app.getAttribute("data-nvdata")); } catch (e) { say(head() + note(T.err) + waBtn()); return; } }
    const NV = S.nv, r = S.rec || {}, naya = ctx.mode === "naya", fixedPlace = !!S.dist;
    const opt = (v, t, sel) => '<option value="' + esc(v) + '"' + (sel ? " selected" : "") + ">" + esc(t) + "</option>";
    const inp = (id, lbl, val, attrs) => '<label class="nw-lbl" for="' + id + '">' + esc(lbl) + '</label><input class="nw-inp" id="' + id + '" type="text" value="' + esc(val || "") + '" ' + (attrs || "") + "/>";
    let h = head() + '<div class="nv-step"><p class="nv-gate">' + esc(naya ? T.formNaya : T.formSudhar) + "</p>";
    if (!fixedPlace) {
      h += '<label class="nw-lbl" for="nvSt">' + esc(T.fState) + '</label><select class="nw-inp" id="nvSt">' + opt("", "—", true) + NV.st.map((s) => opt(s[0], L === "hi" ? s[1] : s[2], false)).join("") + "</select>" +
        '<label class="nw-lbl" for="nvDi">' + esc(T.fDist) + '</label><select class="nw-inp" id="nvDi" disabled>' + opt("", "—", true) + "</select>";
    }
    h += inp("nvName", T.fName, naya ? "" : paren(r.n), 'maxlength="120"') +
      '<label class="nw-lbl" for="nvMg">' + esc(T.fMg) + '</label><select class="nw-inp" id="nvMg">' + opt("", "—", true) + NV.mg.map((m) => opt(String(m[0]), m[1] + " " + (L === "hi" ? m[2] : m[3]), false)).join("") + "</select>" +
      '<label class="nw-lbl" for="nvUd">' + esc(T.fUdy) + '</label><select class="nw-inp" id="nvUd" disabled>' + opt("", T.pickMg, true) + "</select>" +
      '<div id="nvUdNewW" class="nv-hide">' + inp("nvUdNew", T.fUdyNew, "", 'maxlength="80"') + "</div>" +
      inp("nvAddr", T.fAddr, naya ? "" : paren(r.a || ""), 'maxlength="250"') +
      inp("nvPin", T.fPin, naya ? "" : r.pn || "", 'maxlength="6" inputmode="numeric"') + '<div class="nv-fmsg" id="nvPinM"></div>' +
      inp("nvPc", T.fPc, naya ? "" : r.pc || "", 'maxlength="60"') +
      inp("nvBlock", T.fBlock, naya ? "" : r.b || "", 'maxlength="60"') +
      inp("nvUdyam", T.fUdyam, "", 'maxlength="19" autocapitalize="characters"') +
      '<label class="nw-lbl" for="nvRel">' + esc(T.fRel) + '</label><select class="nw-inp" id="nvRel">' + opt("", "—", true) + T.rel.map((x) => opt(x[0], x[1], false)).join("") + "</select>" +
      '<label class="nw-lbl" for="nvNote">' + esc(T.fNote) + '</label><textarea class="nw-inp" id="nvNote" rows="3" maxlength="600"></textarea>' +
      '<label class="nw-lbl" for="nvPhoto">' + esc(T.fPhoto) + '</label><input class="nv-file" id="nvPhoto" type="file" accept="image/jpeg,image/png,image/webp"/><div class="nv-fmsg" id="nvPhotoM"></div>' +
      '<label class="nw-lbl" for="nvCert">' + esc(T.fUdyamFile) + '</label><input class="nv-file" id="nvCert" type="file" accept="application/pdf,image/jpeg,image/png"/><div class="nv-fmsg" id="nvCertM"></div>' +
      '<label class="nw-lbl" for="nvAudit">' + esc(T.fAudit) + '</label><input class="nv-file" id="nvAudit" type="file" accept="application/pdf"/><div class="nv-fmsg" id="nvAuditM"></div>' +
      '<p class="nv-pub">' + esc(T.publicNote) + "</p><p class=\"nv-mute\">" + esc(T.privNote) + "</p>" +
      '<label class="nv-chk"><input type="checkbox" id="nvOk"/><span>' + esc(T.consent) + "</span></label>" +
      '<div class="nw-btns"><button class="nw-btn" id="nvSend" type="button">' + esc(T.submit) + "</button></div>" +
      '<div id="nvMsg">' + (msg ? note(msg) : "") + "</div></div>";
    say(h);
    if (!fixedPlace) {
      $("nvSt").onchange = function () {
        const s = NV.st.find((x) => x[0] === this.value), di = $("nvDi");
        di.innerHTML = opt("", "—", true) + (s ? s[3].map((d) => opt(d[0], L === "hi" ? d[1] : d[2], false)).join("") : "");
        di.disabled = !s;
      };
    }
    $("nvMg").onchange = function () {
      const mg = +this.value, ud = $("nvUd");
      ud.innerHTML = mg ? opt("", "—", true) + NV.u.filter((x) => x[1] === mg).map((x) => opt(String(x[0]), L === "hi" ? x[2] : x[3], false)).join("") + opt("0", T.udyNone, false) : opt("", T.pickMg, true);
      ud.disabled = !mg; $("nvUdNewW").className = "nv-hide";
    };
    $("nvUd").onchange = function () { $("nvUdNewW").className = this.value === "0" ? "" : "nv-hide"; };
    const fileChk = (id, types) => {
      $(id).onchange = function () {
        const f = this.files && this.files[0], m = $(id + "M");
        m.textContent = "";
        if (!f) return;
        if (types.indexOf(f.type) < 0) { m.textContent = T.fileType; this.value = ""; return; }
        if (id !== "nvPhoto" && f.size > MAXB) { m.textContent = T.fileBig; this.value = ""; return; }
        m.textContent = "✅ " + f.name.slice(0, 60);
      };
    };
    /* (पिन-घर v1.1, 26-Nov-2026; Founder: "जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही अपने आप सभी सूचना ले लिया जाए")
       पिन भरते ही अपनी ही साइट की सरकारी सूची (helper /assets/acs-pin.js; कोई बाहरी site नहीं) से:
       ज़िला और राज्य दिखते हैं · पंचायत और प्रखंड के सुझाव आते हैं · राज्य और ज़िला ख़ाली हों तो भर जाते हैं ·
       पिन इस पन्ने के ज़िले का न हो या सूची में न मिले, तो चेतावनी। यह रोक नहीं है: अंतिम जाँच RM करता है। */
    const pinEl = $("nvPin"); let pinNo = 0;
    const pinSay = (t, bad) => { const m = $("nvPinM"); if (m) { m.textContent = t || ""; m.style.color = bad ? "#B23A3A" : ""; } };
    const pnorm = (x) => String(x).toLowerCase().replace(/&amp;/g, "and").replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
    const pinHelper = () => new Promise((res) => {
      if (window.ACS_PIN) { res(true); return; }
      const sc = document.createElement("script"); sc.src = "/assets/acs-pin.js";
      sc.onload = () => res(!!window.ACS_PIN); sc.onerror = () => res(false); document.body.appendChild(sc);
    });
    const pinLook = () => {
      pinEl.value = pinEl.value.replace(/[^0-9]/g, "");
      const mine = ++pinNo, pin = pinEl.value; pinSay("");
      if (pin.length !== 6) return;
      pinHelper().then((ok) => (ok ? window.ACS_PIN.get(pin).then((info) => ({ info })) : null)).then((x) => {
        if (mine !== pinNo || !x) return;   /* helper न लदे: कुछ नहीं दिखता, फ़ॉर्म नहीं रुकता */
        const info = x.info;
        if (!info) { pinSay(T.pinNone, true); return; }
        const D = info.districts.filter((d) => d.src === info.districts[0].src);   /* एक ही स्रोत के ज़िले (गाँव की सूची हो तो वही) */
        if (!D.length) { pinSay(T.pinOk); return; }
        const show = D.slice(0, 3).map((d) => (L === "hi" ? d.district.replace(/&amp;/g, "&") : d.districtEn)).join(" · ") + " · " + (L === "hi" ? D[0].stateHi : D[0].stateEn);
        /* इस निवेदन का ज़िला: कड़ी से तय, या ऊपर चुना हुआ */
        let here = S.dist ? { hi: S.dist.hi, en: S.dist.en } : null;
        if (!here && $("nvDi") && $("nvDi").value) { const s = NV.st.find((q) => q[0] === $("nvSt").value), d = s && s[3].find((q) => q[0] === $("nvDi").value); if (d) here = { hi: d[1], en: d[2] }; }
        const hit = here && info.districts.some((d) => d.district === here.hi || pnorm(d.districtEn) === pnorm(here.en));
        if (here && !hit) pinSay(fmt(T.pinOther, { p: show, d: here[L] }), true); else pinSay(fmt(T.pinAt, { p: show }));
        /* राज्य और ज़िला अभी नहीं चुने और पिन का एक ही ज़िला है: भर जाते हैं (बदले जा सकते हैं) */
        if (!here && !fixedPlace && info.sure && !$("nvSt").value) {
          const s = NV.st.find((q) => q[0] === info.main.state), d = s && s[3].find((q) => q[1] === info.main.district || pnorm(q[2]) === pnorm(info.main.districtEn));
          if (d) { $("nvSt").value = s[0]; $("nvSt").onchange(); $("nvDi").value = d[0]; }
        }
        /* पंचायत / गाँव और प्रखंड के सुझाव (लिखना फिर भी खुला रहता है) */
        const uniq = (a) => Array.from(new Set(a.filter(Boolean))).sort();
        const bls = uniq(info.places.map((p) => p.block));
        const dl = (id, list) => { let el = $(id); if (!el) { el = document.createElement("datalist"); el.id = id; app.appendChild(el); } el.innerHTML = list.map((v) => '<option value="' + esc(v) + '"></option>').join(""); };
        dl("nvPcL", uniq(info.places.map((p) => p.gp).concat(info.places.map((p) => p.n))).slice(0, 600)); dl("nvBlockL", bls);
        $("nvPc").setAttribute("list", "nvPcL"); $("nvBlock").setAttribute("list", "nvBlockL");
        if (naya && bls.length === 1 && !$("nvBlock").value) $("nvBlock").value = bls[0];
      }).catch(() => {});
    };
    pinEl.addEventListener("input", pinLook);
    if (pinEl.value.length === 6) pinLook();
    fileChk("nvPhoto", ["image/jpeg", "image/png", "image/webp"]);
    fileChk("nvCert", ["application/pdf", "image/jpeg", "image/png"]);
    fileChk("nvAudit", ["application/pdf"]);
    $("nvSend").onclick = () => send();
  }

  /* फ़ोटो छोटी (1280px, JPEG): 2 MB के भीतर; बड़ी रहे तो रुकें */
  function photoB64(f) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(f), im = new Image();
      im.onload = () => {
        const k = Math.min(1, 1280 / Math.max(im.width, im.height)), c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k));
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        const d = c.toDataURL("image/jpeg", 0.85), b64 = d.slice(d.indexOf(",") + 1);
        if (b64.length * 0.75 > MAXB) rej(new Error("big")); else res({ b64, mime: "image/jpeg" });
      };
      im.onerror = () => { URL.revokeObjectURL(url); rej(new Error("type")); };
      im.src = url;
    });
  }
  const fileB64 = (f) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => { const d = String(fr.result); res({ b64: d.slice(d.indexOf(",") + 1), mime: f.type }); }; fr.onerror = () => rej(new Error("read")); fr.readAsDataURL(f); });

  async function send() {
    if (S.busy) return;
    const M = (t) => { $("nvMsg").innerHTML = note(t) + (t === T.notReady || t === T.err ? waBtn() : ""); };
    const v = (id) => ($(id) ? $(id).value.replace(/\s+/g, " ").trim() : "");
    const naya = ctx.mode === "naya", r = S.rec || {};
    const f = { name: v("nvName"), address: v("nvAddr"), pin: v("nvPin"), panchayat: v("nvPc"), block: v("nvBlock"),
      mg: +v("nvMg") || 0, udy: v("nvUd") === "" ? -1 : +v("nvUd"), udyNew: v("nvUdNew"), udyamNo: v("nvUdyam").toUpperCase(), relation: v("nvRel"), note: v("nvNote") };
    const files = { photo: $("nvPhoto").files[0], cert: $("nvCert").files[0], audit: $("nvAudit").files[0] };
    let st = ctx.s, di = ctx.d;
    if (!S.dist) { st = v("nvSt"); di = v("nvDi"); if (!st || !di) return M(T.needPlace); }
    if (f.pin && !/^\d{6}$/.test(f.pin)) return M(T.pinBad);
    if (f.udyamNo && !UDYAM_RE.test(f.udyamNo)) return M(T.udyamBad);
    const udyOk = f.mg && (f.udy > 0 || (f.udy === 0 && f.udyNew.length >= 3));
    if (naya) { if (!f.name || !f.address || !f.block) return M(T.needNaya); if (!udyOk) return M(T.needUdy); }
    else {
      if (f.mg && !udyOk) return M(T.needUdy);
      const changed = (f.name && f.name !== paren(r.n)) || (f.address && f.address !== paren(r.a || "")) || (f.pin && f.pin !== (r.pn || "")) ||
        (f.panchayat && f.panchayat !== (r.pc || "")) || (f.block && f.block !== (r.b || "")) || udyOk || f.udyamNo || f.note || files.photo || files.cert || files.audit;
      if (!changed) return M(T.needSome);
    }
    if (!$("nvOk").checked) return M(T.needConsent);
    S.busy = true; $("nvMsg").innerHTML = note(T.wait, "wait"); $("nvSend").disabled = true;
    const out = {};
    try {
      if (files.photo) out.photo = await photoB64(files.photo);
      if (files.cert) out.cert = await fileB64(files.cert);
      if (files.audit) out.audit = await fileB64(files.audit);
    } catch (e) { S.busy = false; $("nvSend").disabled = false; return M(e && e.message === "big" ? T.fileBig : T.fileType); }
    const data = { regNo: S.reg, mode: ctx.mode, lang: L, consent: true, f, files: out,
      where: naya ? { s: st, d: di, k: S.sec ? ctx.k : "" } : { id: ctx.id, s: ctx.s, k: ctx.k, d: ctx.d } };
    try {
      const res = await S.fb.call("submitListingEdit")(data);
      const no = (res.data && res.data.reqId) || "";
      clearTimeout(S.idle);
      if (S.weSigned) { try { await S.fb.A.signOut(S.fb.auth); } catch (e) {} S.weSigned = false; }
      /* v1.1: मिलना, RM की जाँच और website पर छपना अलग-अलग (ChatGPT ऑडिट, 25-Nov-2026) */
      const steps = (T.steps || []).map((x) => "<li>" + esc(x) + "</li>").join("");
      say(head() + '<div class="nv-step"><div class="nw-res"><div class="ok">' + esc(T.ok) + "</div></div>" +
        (steps ? '<ul class="nv-steps" style="padding-left:22px;margin:12px 0 0;line-height:1.8">' + steps + "</ul>" : "") +
        (no ? '<p class="nv-gate" style="margin-top:12px">' + esc(fmt(T.reqNo, { n: no })) + "</p>" : "") + "</div>" + back());
    } catch (e) {
      S.busy = false; $("nvSend").disabled = false;
      const d = (e && e.details) || {};
      if (d.reason === "otpNeeded" || d.reason === "noOtp") { otp(true); return; }
      M(errText(e));
    }
  }

  poke();
  gate();
}
