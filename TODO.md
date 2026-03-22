# Draft Survey Admin Integration TODO

## [✅] Completed
- [x] Fix DashboardAdmin.jsx imports/states (BadgeCheck, setLoadingDrafts)
- [x] Fix AdminDashboard.jsx allDraftSurveys reference
- [x] getAllSurveys/getAllReports in api/api.js

## [✅] Completed
- [x] Fix Onhire.jsx getAllSurveys import/error
```
read_file src/pages/Onhire.jsx
edit_file - add import { getAllSurveys } from '../api/api'
edit_file - handle isAdmin() case
```

## [✅] Completed
- [x] DashboardAdmin.jsx Draft Survey quick action card → /draft-survey
```
edit_file - Add gradient card → /draft-survey 
Position: Quick Actions grid (mt-8)
```

## [ ] Step 3: Add Firebase test data
```
execute_command: Firebase console add draftSurveys/{testUser}/{testId}
```

## [ ] Step 4: Test & Verify
```
navigate /admin/dashboard 
Verify: table populates, View→/draft-survey/report works
```
