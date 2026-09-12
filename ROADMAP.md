# ROADMAP — IMAGE TOOLS

This roadmap outlines the phased evolution of **Image Tools** from initial architecture setup to long-term scalability.

---

## Overview of Phases

| Phase | Title | Focus | Target Status |
|---|---|---|---|
| **Phase 0** | Architecture & Setup | Initial foundation, documentation, standards, project state | **Completed** |
| **Phase 1** | Core UI & Design System | Atomic components, layout shell, upload dropzone, token styles | **Completed** |
| **Phase 2** | Image Compressor | In-browser compression engine & `/compress-image` page | **Completed** |
| **Phase 3** | Image Resizer | Dimension scaling, aspect-ratio locking & `/resize-image` page | **Completed** |
| **Phase 4** | Image Converter | Format switching (JPG, PNG, WebP) & `/convert-image` page | **Completed** |
| **Phase 5** | Image Cropper | Interactive aspect ratio cropping & `/crop-image` page | **Completed** |
| **Phase 6** | SEO Landing Pages | Curated high-intent programmatic landing pages (10 total routes) | **Completed** |
| **Phase 7** | Audits & Privacy Verification | Client-side memory safety, sitemaps, robots.txt, privacy guarantee | **Completed** |
| **Phase 8** | Production Launch & Search Console | Production deployment readiness, GSC technical readiness, SEO intelligence | **Completed** |
| **Phase 9** | Advanced Client Utilities | Bulk processing, EXIF metadata remover, SVG/AVIF support | Future |
| **Phase 10** | Global Scaling & PWA | Full offline Service Worker PWA, edge distribution optimization | Future |

---

## Phase Details

### Phase 0: Architecture and Setup (Current)
- **Goal**: Establish rock-solid engineering rules, documentation, directories, and architectural boundaries.
- **Features**:
  - Full documentation suite (`AGENTS.md`, `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `PHASES.md`, `PLAN.md`, `API_CONTRACT.md`, `/docs/*`).
  - Strict client-side processing constraint definition.
  - Project directory scaffolding.
  - Initial foundation homepage and layout synchronization.
- **Deliverables**: Complete documentation files, clean repository structure, metadata setup.
- **Dependencies**: None.
- **Completion Criteria**: Build passes with `npm run build`, all docs in place, zero architectural ambiguities.

### Phase 1: Core UI & Shared Shell
- **Goal**: Implement the responsive design system and reusable UI components.
- **Features**:
  - Shared layout header with logo, navigation links, and mobile drawer.
  - Shared layout footer with site links, copyright, privacy statement.
  - Reusable atomic UI components: `Button`, `Slider`, `Card`, `Badge`, `Toggle`, `Alert`.
  - Accessible `ImageUploadZone` with drag-and-drop, file picker, file size validation, and preview generation.
  - Object URL lifecycle management hook (`useImagePreview`).
- **Deliverables**: `/components/layout/*`, `/components/ui/*`, `/components/tools/ImageUploadZone.tsx`.
- **Dependencies**: Phase 0.
- **Completion Criteria**: Component library renders cleanly across mobile, tablet, and desktop with zero layout shifts.

### Phase 2: Image Compressor
- **Goal**: Deliver a high-performance in-browser image compression engine and dedicated UI.
- **Features**:
  - Native Canvas/Blob compression utility in `lib/image/compress.ts`.
  - Quality slider (1% – 100%) with real-time recalculation preview.
  - Optional target file size constraint (e.g. 200KB, 500KB) with binary search approximation.
  - Comparison preview card showing original size, new size, and percentage reduction.
  - One-click instant file download with preserved or optimized filename.
  - Dedicated route: `/compress-image`.
- **Deliverables**: `lib/image/compress.ts`, `app/compress-image/page.tsx`, `components/tools/CompressorTool.tsx`.
- **Dependencies**: Phase 1.
- **Completion Criteria**: Ability to compress 5MB+ JPEG/PNG/WebP files in under 500ms client-side, showing accurate byte savings.

### Phase 3: Image Resizer
- **Goal**: Enable precise dimension scaling with aspect-ratio management.
- **Features**:
  - Dimension scaling engine in `lib/image/resize.ts` preserving clarity.
  - Width and Height numeric inputs with lock aspect ratio toggle.
  - Predefined preset dimension buttons (1080x1080, 1920x1080, 1280x720, etc.).
  - Percentage-based scaling shortcuts (25%, 50%, 75%).
  - Dedicated route: `/resize-image`.
- **Deliverables**: `lib/image/resize.ts`, `app/resize-image/page.tsx`, `components/tools/ResizerTool.tsx`.
- **Dependencies**: Phase 1.
- **Completion Criteria**: Image scaling renders pixel-accurate output blobs matching selected dimensions.

### Phase 4: Image Converter
- **Goal**: Enable seamless file format conversions between popular image types.
- **Features**:
  - Format transformation engine in `lib/image/convert.ts`.
  - Supported formats: PNG, JPG/JPEG, WebP.
  - Transparency handling (white background fill option when converting transparent PNG to JPG).
  - Format quality settings.
  - Dedicated route: `/convert-image`.
- **Deliverables**: `lib/image/convert.ts`, `app/convert-image/page.tsx`, `components/tools/ConverterTool.tsx`.
- **Dependencies**: Phase 1.
- **Completion Criteria**: Verified conversion of PNG to JPG, JPG to WebP, WebP to PNG without visual corruption.

### Phase 5: Image Cropper
- **Goal**: Offer an intuitive, mobile-friendly visual image cropping experience.
- **Features**:
  - Canvas-based visual bounding box with drag handles.
  - Preset aspect ratios: Free crop, 1:1 (Square), 4:3 (Standard), 16:9 (Widescreen), 9:16 (Story/Reels).
  - Touch event support for responsive pinch/drag on smartphones.
  - Crop coordinate calculation and slice export.
  - Dedicated route: `/crop-image`.
- **Deliverables**: `lib/image/crop.ts`, `app/crop-image/page.tsx`, `components/tools/CropperTool.tsx`.
- **Dependencies**: Phase 1.
- **Completion Criteria**: Smooth touch/mouse dragging of crop handles, accurate pixel slicing on download.

### Phase 6: Targeted SEO Landing Pages
- **Goal**: Capture search intent for specific workflows without generating thin duplicate content.
- **Features**:
  - Parametric routes: `/compress-image-to-100kb`, `/compress-image-to-200kb`, `/jpg-to-png`, `/png-to-jpg`, `/resize-image-for-instagram`.
  - Reusable layout template with tool pre-configurations (e.g. preset target size or format automatically selected).
  - Unique metadata, educational copy, FAQ, and structured `HowTo` schema per page.
- **Deliverables**: SEO route templates and config mappings in `config/tools.ts`.
- **Dependencies**: Phases 2 – 5.
- **Completion Criteria**: Passes Google Rich Results test with valid JSON-LD schemas, unique canonical tags.

### Phase 7: Analytics & Privacy Audits
- **Goal**: Implement non-invasive web analytics and search engine verification.
- **Features**:
  - Privacy-compliant analytics (Cloudflare Web Analytics or Plausible — no cookies, no personal data).
  - Google Search Console and Bing Webmaster verification tokens.
  - XML sitemap generator (`app/sitemap.ts`) and `robots.txt` configuration (`app/robots.ts`).
- **Deliverables**: `app/sitemap.ts`, `app/robots.ts`, privacy audit report.
- **Dependencies**: Phase 6.
- **Completion Criteria**: Zero cookies set in user browser; robots and sitemaps validated.

### Phase 8: Production Launch & Search Console
- **Goal**: Prepare static web platform for production deployment, Google Search Console integration, and post-launch SEO measurement.
- **Features**:
  - Cloudflare Pages static export configuration.
  - Automated XML sitemap (`app/sitemap.ts`) and robots.txt (`app/robots.ts`).
  - Canonical URL synchronization and JSON-LD structured schemas across all 10 routes.
  - Technical readiness for Google Search Console verification and sitemap submission.
- **Deliverables**: Verified static bundle, sitemap, robots.txt, synchronized documentation.
- **Dependencies**: Phase 7.
- **Completion Criteria**: Clean static build, zero memory leaks, full SEO route coverage.

### Phase 9: Advanced Client Utilities
- **Goal**: Expand into advanced client-side graphic tasks.
- **Features**:
  - In-browser bulk zip packaging (compress/convert 20+ images simultaneously via JSZip).
  - EXIF metadata stripper (clean GPS coordinates and camera data for privacy).
  - Color palette extractor / dominant color finder.
  - Blur / Watermark addition.
- **Deliverables**: Specialized utility modules in `lib/image/`.
- **Dependencies**: Phase 5.
- **Completion Criteria**: Advanced utilities execute purely client-side without crashing browser memory.

### Phase 10: Global Scaling & PWA
- **Goal**: Transform Image Tools into an offline-capable Progressive Web Application.
- **Features**:
  - Web App Manifest (`manifest.json`) and service worker caching app assets.
  - Full offline capability (tools work on airplanes or remote sites with zero network connectivity).
  - Desktop and mobile install prompt ("Install Image Tools").
- **Deliverables**: Service worker setup, manifest, offline fallback.
- **Dependencies**: Phase 9.
- **Completion Criteria**: Lighthouse PWA score of 100%, offline tool operation verified.
