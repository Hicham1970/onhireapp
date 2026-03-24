# Fix Admin Dashboard Edit Survey/Report Links

## Plan Summary
Update DashboardAdmin.jsx to use admin `getAllSurveys()` and `getAllReports()` instead of user-specific calls, ensuring `userId` is present in data for edit links.

## Steps
- [ ] Step 1: Create TODO.md (done)
- [✓] Step 2: Edit imports in DashboardAdmin.jsx (getAllSurveys, getAllReports)\n- [✓] Step 3: Update useEffect data loading to use getAll* functions\n- [✓] Step 4: Update refetchData function\n- [✓] Step 5: Verify allItems mapping uses userId correctly
- [✓] Step 6: Test edit links for surveys/reports as admin\n- [ ] Step 7: Mark complete and attempt_completion

Current: Step 1 complete ✓
