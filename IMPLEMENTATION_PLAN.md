# Implementation Plan: SAAS Admin & User Roles

## Information Gathered

### Current State:
1. **Authentication**: Firebase Auth with Google and Email/Password
2. **Data Storage**: Already per-user (surveys, reports, vessels, photoReports)
3. **Roles**: Basic role check exists in AuthContext.jsx (`isAdmin()`)
4. **Routing**: App.jsx handles routes, Dashboard redirects after login

### Key Files to Modify:
- `src/context/AuthContext.jsx` - Role management
- `src/pages/Register.jsx` - Add role on registration
- `src/pages/Dashboard.jsx` - Navigation updates
- `src/pages/Onhire.jsx` - Admin-only access for surveys
- `src/App.jsx` - Route protection
- `database.rules.json` - Firebase security rules
- `src/components/Navbar.jsx` - Role-based menu

---

## Plan

### Step 1: Update Register.jsx
- Add default role 'user' when creating new users
- Allow setting admin role via URL parameter for initial setup

### Step 2: Update AuthContext.jsx
- Add `userRole` state
- Add `hasAccess` function for role-based access
- Add `isAdmin` check from userData

### Step 3: Update Dashboard.jsx
- Modify "OnHire App" button to navigate to `/onhire?tab=surveys`
- Keep navigation to other tabs based on user role

### Step 4: Update Onhire.jsx
- Add admin-only access for surveys tab (viewing all surveys)
- Regular users only see their own surveys
- Add "Back to Dashboard" button

### Step 5: Update App.jsx
- Add ProtectedRoute component
- Add admin route protection

### Step 6: Update Navbar.jsx
- Add role-based navigation items
- Hide admin features from regular users

### Step 7: Update Firebase Rules
- Add proper role-based read/write rules

---

## Dependent Files to be Edited:
1. `src/pages/Register.jsx`
2. `src/context/AuthContext.jsx`
3. `src/pages/Dashboard.jsx`
4. `src/pages/Onhire.jsx`
5. `src/App.jsx`
6. `src/components/Navbar.jsx`
7. `database.rules.json`

## Followup Steps:
1. Test user registration
2. Test admin access
3. Verify data isolation between users
4. Deploy and verify Firebase rules

