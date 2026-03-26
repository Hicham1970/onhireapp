# 🧭 SEO Improvement TODO (OnhireApp)
Status: 5/12 ✅ **Core SEO Complete - Performance Next**

## 1. Core Setup (Complete ✓)
- [x] Create this TODO_SEO.md
- [ ] Install `react-helmet-async` if missing (`npm i react-helmet-async`)

## 2. Global Helmet (App.jsx) 
- [x] Wrap app in `<HelmetProvider>`
- [x] Add global fallback metas/title

## 3. Page-Level Helmet (Priority: Open Tabs)
- [x] Notfound.jsx: Add title=\"Page Not Found | MarineSurveyorDev\", meta desc
- [x] DashboardUser.jsx: title=\"Dashboard | Marine Surveys\", user-specific meta
- [x] Blog.jsx: title=\"Blog | Maritime Insights\", Article schema
- [ ] Home.jsx: Review/enhance existing

## 4. Sitemap & Static
- [x] public/sitemap.xml: Add all 20+ routes with priorities/lastmod
- [ ] index.html: Add preconnect (fonts.googleapis.com, firebase)

## 5. Components & Assets
- [ ] Navbar.jsx: alt=\"MarineSurveyorDev Logo\" on MSD_Logo.jpg
- [ ] Compress/optimize public/ images (ship.jpeg → WebP)

## 6. Structured Data
- [ ] App.jsx: Global Organization JSON-LD
- [ ] Blog: Article schema per post

## 7. Performance (Core Web Vitals)
- [ ] vite.config.js: Image optimization, code splitting
- [ ] Lazy load non-critical JS/images

## 8. Multi-lang & Advanced
- [ ] Add hreflang for _en pages
- [ ] BreadcrumbList schema

## 9. Testing & Deploy
- [ ] Lighthouse SEO score ≥90
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor GA impressions/clicks

## Commands to Run
```bash
npm i react-helmet-async
npm run build && npm run preview  # Test prod build
```
**Next:** Edit App.jsx → Sample pages → Sitemap
