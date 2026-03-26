# Task: Fix MIME type "text/jsx" error in deployed version

## Steps to complete:

### 1. [x] Update firebase.json
- Add "hosting" configuration to serve from /dist with proper MIME headers for .js/.jsx files.

### 2. [x] Build the project
- Run `npm run build` to generate /dist folder with bundled assets.

### 3. [x] Deploy to Firebase
- Run `firebase deploy` to upload dist/ correctly.

### 4. [ ] Verify fix
- Check deployed site console for no MIME errors.
- Test page loads (e.g., Press page).

### 5. [ ] Complete task
- Update TODO.md as done, attempt_completion.

