const ACS_ROLE_DASHBOARD={student:"student-dashboard.html",teacher:"teacher-dashboard.html",center_admin:"center-dashboard.html",language_contributor:"language-dashboard.html",super_admin:"admin-dashboard.html"};
function acsRedirectByRole(role){location.href=ACS_ROLE_DASHBOARD[role]||"access-denied.html"}
