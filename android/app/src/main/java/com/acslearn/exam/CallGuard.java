/* ============================================================================
   ACS EXAM app : CallGuard.java  v1.0 (batch E-2, 19-Nov-2026)
   Founder's choice 1-a (19-Nov-2026): during the exam no call comes in.
   Android 10 and newer lets an app that the learner chooses as "caller ID and spam app" refuse calls.
   While an exam runs in the app, every incoming call that Android shows to this service is refused at once;
   the caller hears that the phone is busy, and the call stays in the call log as a missed (blocked) call.
   Outside the exam this service does nothing: every call goes through as usual.
   Limit (Android's own rule): Android shows this service only calls from numbers that are NOT in the contacts.
   A call from a saved contact can still ring, but the pinned exam screen does not let it be picked up on most phones;
   if a call is picked up, the exam ends (MainActivity). Emergency calls are never touched by Android's rules.
   ============================================================================ */
package com.acslearn.exam;

import android.telecom.Call;
import android.telecom.CallScreeningService;

public class CallGuard extends CallScreeningService {
    @Override
    public void onScreenCall(Call.Details d) {
        boolean exam = getSharedPreferences(MainActivity.PREF, MODE_PRIVATE).getBoolean("active", false);
        CallResponse.Builder b = new CallResponse.Builder();
        if (exam && d.getCallDirection() == Call.Details.DIRECTION_INCOMING) {
            b.setDisallowCall(true).setRejectCall(true).setSkipCallLog(false).setSkipNotification(false);
            MainActivity.callBlocked();
        }
        respondToCall(d, b.build());
    }
}
