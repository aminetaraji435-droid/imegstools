# DEVELOPMENT PHASES — IMAGE TOOLS

This document defines the actionable technical breakdown for each development phase. Every phase is self-contained and specifies clear testing, SEO, performance, and completion criteria.

---

## Phase 0: Project Setup & Technical Architecture (CURRENT)
- **Objective**: Establish the master architectural documentation, repository layout, build configuration, and design tokens without writing premature application code.
- **Tasks**:
  1. Inspect the repository setup and verify build tools (Next.js 15 App Router, Tailwind CSS v4, TypeScript).
  2. Author core documentation: `AGENTS.md`, `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `PHASES.md`, `PLAN.md`, `API_CONTRACT.md`.
  3. Create architectural deep-dives in `/docs/` (`architecture.md`, `design-system.md`, `seo.md`, `performance.md`, `privacy.md`, `decisions.md`).
  4. Scaffolding folders: `components/ui/`, `components/tools/`, `components/layout/`, `lib/image/`, `lib/seo/`, `config/`.
  5. Establish types and data models: `lib/image/types.ts`, `config/tools.ts`, `config/site.ts`.
  6. Update metadata and layout (`metadata.json`, `app/layout.tsx`, `app/page.tsx`).
- **Files Affected**:
  - `metadata.json`, `app/layout.tsx`, `app/page.tsx`
  - `AGENTS.md`, `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `PHASES.md`, `PLAN.md`, `API_CONTRACT.md`
  - `docs/*.md`
  - `config/site.ts`, `config/tools.ts`, `lib/image/types.ts`
- **Dependencies**: None.
- **Testing**: `npm run build` succeeds; TypeScript strict type checking passes with zero errors; documentation is exhaustive and cross-referenced.
- **SEO Requirements**: Valid `<title>`, description, OpenGraph tags in `app/layout.tsx`.
- **Performance Requirements**: Zero unnecessary dependencies installed; minimal bundle size.
- **Definition of Done**: Project compiles cleanly, documentation is complete and accepted, repository structure is established.

---

## Phase 1: Design System & Core Shell Components
- **Objective**: Build the foundational UI component library, global navigation header, footer, and universal image dropzone.
- **Tasks**:
  1. Create atomic UI components in `components/ui/` (`Button`, `Slider`, `Card`, `Badge`, `Progress`, `Alert`).
  2. Implement `Header` component with desktop navigation and mobile drawer menu in `components/layout/Header.tsx`.
  3. Implement `Footer` component with quick links, trust message, and legal disclaimer in `components/layout/Footer.tsx`.
  4. Build accessible `ImageUploadZone` in `components/tools/ImageUploadZone.tsx` supporting drag-and-drop, file picker, file size validation, and image format checking.
  5. Create `useImageFile` hook to manage `File`, `ArrayBuffer`, `HTMLImageElement`, and object URL memory revocation safely.
- **Files Affected**:
  - `components/ui/*`
  - `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/Breadcrumbs.tsx`
  - `components/tools/ImageUploadZone.tsx`
  - `hooks/use-image-file.ts`
- **Dependencies**: Phase 0.
- **Testing**: Test drag-and-drop on desktop; test tap-to-upload on mobile viewports; verify `URL.revokeObjectURL` fires on file reset.
- **SEO Requirements**: Semantic `<header>`, `<main>`, `<footer>`, `<nav>` elements; accessible labels on interactive elements.
- **Performance Requirements**: Zero layout shifts during drag over; clean lightweight DOM tree.
- **Definition of Done**: Header, footer, and drag/drop components are functional, visually polished, and fully responsive across mobile, tablet, and desktop.

---

## Phase 2: Image Compressor Tool
- **Objective**: Implement client-side image compression with quality adjustment, target size approximation, and instant download.
- **Tasks**:
  1. Build `compressImage` utility in `lib/image/compress.ts` using Canvas and `toBlob()`.
  2. Implement binary search approximation for target file size (e.g., target 200KB).
  3. Construct `CompressorTool` client component with quality slider (1-100), preview split, original vs compressed byte display, and savings calculator.
  4. Create dedicated route `app/compress-image/page.tsx` with H1, tool interface, "How It Works", benefits, and FAQ.
- **Files Affected**:
  - `lib/image/compress.ts`
  - `components/tools/CompressorTool.tsx`
  - `app/compress-image/page.tsx`
- **Dependencies**: Phase 1.
- **Testing**: Test compression with large 10MB JPG, PNG, and WebP files; verify memory release; verify saved % calculation; test download on iOS Safari, Android Chrome, and desktop browsers.
- **SEO Requirements**: Unique title "Free Image Compressor — Compress JPG, PNG, WebP Online", unique meta description, FAQ schema.
- **Performance Requirements**: Compression execution under 800ms for typical 4K photos; web worker offloading if large images threaten UI responsiveness.
- **Definition of Done**: Users can drop an image, adjust quality or specify target size, immediately inspect savings, and download the compressed image.

---

## Phase 3: Image Resizer Tool
- **Objective**: Implement client-side image resizing with pixel dimension controls, aspect-ratio locking, and social media presets.
- **Tasks**:
  1. Build `resizeImage` utility in `lib/image/resize.ts` supporting bicubic canvas scaling.
  2. Implement aspect-ratio preservation logic (updating height automatically when width changes, and vice-versa).
  3. Add standard dimension preset buttons: 1080x1080 (Square), 1920x1080 (Full HD), 1280x720 (HD), 1080x1350 (Portrait), 1080x1920 (Story/Reels).
  4. Construct `ResizerTool` client component with live dimension indicators and preview.
  5. Create dedicated route `app/resize-image/page.tsx` with full SEO layout.
- **Files Affected**:
  - `lib/image/resize.ts`
  - `components/tools/ResizerTool.tsx`
  - `app/resize-image/page.tsx`
- **Dependencies**: Phase 1.
- **Testing**: Verify that locking aspect ratio prevents distortion; verify dimension preset buttons accurately populate inputs; verify downscaling and upscaling quality.
- **SEO Requirements**: Target keywords "resize image online", "image dimensions changer", distinct FAQ and structured data.
- **Performance Requirements**: Instant resize recalculation; smooth input typing without lag.
- **Definition of Done**: Users can resize any image to exact custom dimensions or presets and download the result.

---

## Phase 4: Image Converter Tool
- **Objective**: Implement client-side image format transformation between JPG, PNG, and WebP.
- **Tasks**:
  1. Build `convertImage` utility in `lib/image/convert.ts`.
  2. Handle PNG transparency: provide option to preserve alpha channel or fill with background color (default white) when converting to JPEG.
  3. Construct `ConverterTool` client component with format picker cards (JPG, PNG, WebP) and quality options.
  4. Create dedicated route `app/convert-image/page.tsx`.
- **Files Affected**:
  - `lib/image/convert.ts`
  - `components/tools/ConverterTool.tsx`
  - `app/convert-image/page.tsx`
- **Dependencies**: Phase 1.
- **Testing**: Convert transparent PNG to JPG (verify background color fill); convert JPG to WebP (verify byte reduction); verify MIME type on downloaded file.
- **SEO Requirements**: Dedicated metadata for "Convert JPG to PNG, WebP to JPG Online".
- **Performance Requirements**: Sub-second conversion for standard images; zero remote network transfers.
- **Definition of Done**: Bidirectional conversion between JPG, PNG, and WebP operates reliably in the browser.

---

## Phase 5: Image Cropper Tool
- **Objective**: Implement touch-friendly client-side image cropping with aspect-ratio bounding boxes.
- **Tasks**:
  1. Build `cropImage` utility in `lib/image/crop.ts` using Canvas `drawImage` clipping coordinates.
  2. Construct interactive cropping box with draggable handles and boundary constraints.
  3. Provide aspect ratio options: Free, 1:1, 4:3, 16:9, 9:16.
  4. Support touch events for pinch/drag manipulation on mobile screens.
  5. Create dedicated route `app/crop-image/page.tsx`.
- **Files Affected**:
  - `lib/image/crop.ts`
  - `components/tools/CropperTool.tsx`
  - `app/crop-image/page.tsx`
- **Dependencies**: Phase 1.
- **Testing**: Test touch drag on smartphone simulation; test edge boundaries (handles cannot drag outside image canvas); verify cropped blob resolution matches bounding box.
- **SEO Requirements**: Target "crop image online", "free photo cropper".
- **Performance Requirements**: 60fps smooth handle dragging with CSS transforms and lightweight canvas redraws.
- **Definition of Done**: Interactive cropper functions seamlessly on both mouse and touch devices, producing clean cropped output.

---

## Phase 6: Targeted SEO Landing Pages
- **Objective**: Build specialized landing pages for high-volume search queries without duplicating core code.
- **Tasks**:
  1. Create parametric dynamic tool template in `components/tools/ParametricToolPage.tsx`.
  2. Configure routes:
     - `/compress-image-to-100kb`
     - `/compress-image-to-200kb`
     - `/compress-image-to-500kb`
     - `/jpg-to-png`
     - `/png-to-jpg`
     - `/webp-to-jpg`
     - `/resize-image-for-instagram`
  3. Generate unique editorial descriptions, feature explanations, and structured JSON-LD data for each query.
- **Files Affected**:
  - `app/(seo)/*/page.tsx`
  - `components/tools/ParametricToolPage.tsx`
  - `lib/seo/schema.ts`
- **Dependencies**: Phases 2 – 5.
- **Testing**: Inspect canonical tags on all pages; validate all schemas using schema validator.
- **SEO Requirements**: Strict anti-spam standards: distinct copy, unique title/description, relevant pre-filled tool defaults.
- **Performance Requirements**: Static generation (SSG) for instantaneous page loads.
- **Definition of Done**: All programmatic SEO routes render pre-configured functional tools with rich editorial copy and valid schema.

---

## Phase 7: Analytics, Verification & Sitemaps
- **Objective**: Configure privacy-preserving tracking, search engine sitemaps, and robots.txt.
- **Tasks**:
  1. Create dynamic `app/sitemap.ts` indexing all active tools and SEO landing routes.
  2. Create `app/robots.ts` defining crawler rules.
  3. Implement privacy-safe analytics hook (no IP harvesting, no cookies).
- **Files Affected**:
  - `app/sitemap.ts`, `app/robots.ts`
- **Dependencies**: Phase 6.
- **Testing**: Verify `/sitemap.xml` returns valid XML schema; check robots.txt syntax.
- **Definition of Done**: Search crawlers can index all valid routes; privacy compliance verified.
