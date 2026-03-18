# FCP/LCP Optimization (PageSpeed 68% → Target 90%+)

**Status: Approved - In Progress**

## Current Issues:
- PageSpeed: 68%, FCP 4.5s, LCP 5.6s (deployed)
- Local Lighthouse: Better but Hero heavy (SVG + blur)

## Plan Steps:

### 1. Create TODO & Analyze [DONE ✅]
- Plan confirmed ✓

### 2. index.html: Preload CSS/Fonts [PENDING]
```
Add:
<link rel="preload" href="/assets/index-[hash].css" as="style" />
Preconnect fonts.googleapis
```

### 3. Hero.jsx: Optimize render cost [PENDING]
- Remove animate-pulse blurs/grid
- Simplify SVG waves path
- Smaller blur divs (w-48)

### 4. vite.config.js: CSS preload [PENDING]
```
css: { preload: true }
```

### 5. Build & Local Test [PENDING]
```
npm run build && npm run preview
Lighthouse localhost:4173 → lighthouse-fcp-fixed.html
```

### 6. Compress Images [PENDING]
- logo.jpg (198kB → <50kB tinypng.com)
- logoClair.jpg, logolighthouse.jpg

### 7. Deploy & Retest [PENDING]
```
git add . && git commit -m "Fix FCP/LCP: preload CSS/fonts, optimize Hero" && git push
```
PageSpeed retest → target FCP <2.5s

**Next:** Edit index.html + Hero.jsx → `npm run build`

