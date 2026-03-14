# Admin Dashboard Fixes - OnHireApp Buttons & Surveys Management

## Plan Progress
✅ Step 1: Create TODO.md

✅ Step 2: Update src/api/api.js - Add updateSurvey function

✅ Step 3: Update src/pages/AdminDashboard.jsx - Add Surveys tab with list/edit/delete, Rapports tab, bottom buttons

✅ Step 4: Test functionality (login as admin, check new tabs, delete survey if exists, bottom buttons work)

✅ Step 5: Update TODO.md on completion

## Details
- Add 'Surveys' tab using getAllSurveys()
- Add 'Rapports' tab using getAllReports()
- Surveys list: Show user, name, IMO, date, HFO/MGO, edit/delete buttons
- Bottom buttons in overview: 'OnHireApp' → /onhire, 'Rapport Inspection' → /onhire?tab=pictures
- Admin can delete any user's surveys/reports
