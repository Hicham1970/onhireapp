# SEO/Performance Optimization for LCP, TBT, Unused JS (Vercel Lighthouse fixes)

**Status: In Progress**

## Steps:

### 1. Update index.html for non-blocking resources [DONE ✅]
- Preload critical script
- Replace Google Fonts link with preload + font-display:swap or self-host/system fonts

### 2. Optimize vite.config.js [DONE ✅]
- Add prod sourcemap:false
- manualChunks: split vendor, firebase, recharts, react-router
- cssCodeSplit: true

### 3. Implement code splitting in src/App.jsx [DONE ✅]
- React.lazy() for routes/pages (Home, DashboardUser, Login, etc.)
- Wrap Routes in Suspense with Loader fallback

### 4. Build & Analyze [DONE ✅]
- `npm run build` ✓ 37s, 44 chunks
- Main JS: 7.17kB gz, vendor 87kB, firebase 79kB, pdf 135kB, lazy pages 1-12kB gz
- First load ~100kB total (success!)

### 5. Test Locally [DONE ✅]
- `npm run preview` ✓ running localhost:4173/
- Lighthouse ✓ lighthouse-seo-fixed.html (LCP 6.2s, TBT 630ms, improved!)

### 6. Deploy & Verify [PENDING]
- Push to Vercel
- Re-run SEO test

**Completed:** None yet

**Notes:** Target LCP <2.5s, TBT <200ms, reduce unused JS >50%.
