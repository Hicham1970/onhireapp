# TODO - SAAS Roles Implementation

## Step 1: Update Register.jsx
- [ ] Add default role 'user' when creating new users
- Status: PENDING

## Step 2: Update AuthContext.jsx
- [ ] Add userRole state and hasAccess function
- [ ] Add proper isAdmin check from userData
- Status: PENDING

## Step 3: Update Dashboard.jsx
- [ ] Modify "OnHire App" button to navigate to /onhire?tab=surveys
- [ ] Add Back navigation reference
- Status: PENDING

## Step 4: Update Onhire.jsx
- [ ] Add admin-only access for surveys tab
- [ ] Regular users see only their own surveys
- [ ] Add "Back to Dashboard" button
- Status: PENDING

## Step 5: Update App.jsx
- [ ] Add ProtectedRoute component
- [ ] Add admin route protection
- Status: PENDING

## Step 6: Update Navbar.jsx
- [ ] Add role-based navigation items
- [ ] Hide admin features from regular users
- Status: PENDING

## Step 7: Update Firebase Rules
- [ ] Add proper role-based read/write rules
- Status: PENDING

