# IMPLEMENTATION PLAN — IMAGE TOOLS

This document defines actionable, prioritized tasks for the development lifecycle.

**Priority Key**:
- **P0**: Critical / Blocker (Core architecture, primary tools, security, accessibility)
- **P1**: High (Enhanced user experience, primary conversions, core SEO)
- **P2**: Medium (Long-tail landing pages, presets, keyboard shortcuts)
- **P3**: Later / Enhancement (Batch zip processing, offline PWA, monetization)

---

## Tasks Breakdown

### Phase 0: Project Architecture & Foundation (Current)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P0-01** | Inspect repository and configure metadata | P0 | None | `metadata.json`, `app/layout.tsx` | Site name is "Image Tools", description is accurate, layout title matches | Review `metadata.json` and `app/layout.tsx` |
| **P0-02** | Author comprehensive governance documentation | P0 | None | `AGENTS.md`, `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `PHASES.md`, `PLAN.md`, `API_CONTRACT.md` | All 7 documents authored with zero missing sections | Inspect files and verify internal consistency |
| **P0-03** | Author architecture & design system deep dives | P0 | None | `docs/architecture.md`, `docs/design-system.md`, `docs/seo.md`, `docs/performance.md`, `docs/privacy.md`, `docs/decisions.md` | Comprehensive coverage of canvas pipeline, typography, tokens, and SEO rules | File verification |
| **P0-04** | Establish directory layout and type definitions | P0 | None | `config/site.ts`, `config/tools.ts`, `lib/image/types.ts`, `lib/seo/types.ts` | Types exported without errors, tool registry defined | TypeScript compilation check (`npm run build`) |
| **P0-05** | Scaffold foundation homepage shell | P0 | P0-01, P0-04 | `app/page.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx` | Homepage renders with clean hero, tool links, trust cards, and FAQ | Dev server preview and browser validation |

---

### Phase 1: Core UI & Shared Components (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P1-01** | Create atomic UI primitives | P0 | P0-04 | `components/ui/Button.tsx`, `components/ui/Slider.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`, `components/ui/Tabs.tsx`, `components/ui/Input.tsx`, `components/ui/Select.tsx`, `components/ui/Progress.tsx`, `components/ui/Tooltip.tsx`, `components/ui/Separator.tsx` | Standardized button variants, smooth range slider, semantic color tokens, accessible tabs, progress and tooltip | Mobile touch testing, automated linting and build validation |
| **P1-02** | Create universal Image Upload Zone | P0 | P1-01 | `components/ui/DropZone.tsx`, `components/tools/HomeQuickDropzone.tsx` | Supports drag-and-drop, manual file picker, image MIME verification, displays file preview and auto memory cleanup | Drag test with JPG/PNG/WebP, invalid file reject test |
| **P1-03** | Build breadcrumbs and container layout primitives | P1 | P1-01 | `components/layout/Breadcrumbs.tsx`, `components/layout/Container.tsx` | Responsive max-width wrappers, semantic breadcrumb trail with home icon and RTL awareness | Inspect layout responsiveness across breakpoints |
| **P1-04** | Build Coming Soon modal and integrate design system into shell & home | P0 | P1-01 | `components/ui/ComingSoonModal.tsx`, `components/tools/ComponentShowcase.tsx`, `app/page.tsx` | Homepage refactored with design system primitives, interactive component sandbox, and polite upcoming phase modals | Visual test, theme toggle, and language switch verification |

---

### Phase 2: Image Compressor (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P2-01** | Build canvas compression engine | P0 | P0-04 | `lib/image/compress.ts` | `compressImage(file, { quality, maxSizeBytes })` returns compressed Blob with clean byte data | Unit test with 5MB test image across quality values (0.2, 0.5, 0.8) |
| **P2-02** | Build compressor UI & quality controller | P0 | P1-02, P1-04, P2-01 | `components/tools/CompressorTool.tsx` | Slider controls quality 1-100%, updates compressed size and preview, instant download button | Interactive slider check, download and verify file integrity |
| **P2-03** | Assemble `/compress-image` page | P0 | P2-02 | `app/compress-image/page.tsx` | Full tool page with H1, tool interface, "How to compress", benefits, and FAQ | Validate PageSpeed, verify meta tags |
| **P2-04** | Implement target file size approximation (100KB, 200KB) | P1 | P2-01 | `lib/image/compress.ts` | Binary search iteratively adjusts quality to converge within 5% of target size | Test targeting 200KB on a 3MB photo |

---

### Phase 3: Image Resizer (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P3-01** | Build canvas resize engine | P0 | P0-04 | `lib/image/resize.ts` | `resizeImage(file, { width, height, maintainAspectRatio })` outputs resized Blob with crisp scaling | Check resulting width/height metadata in output image |
| **P3-02** | Build resizer control UI with aspect lock | P0 | P1-02, P3-01 | `components/tools/ResizerTool.tsx` | Width and height inputs, lock toggle, preset buttons (1080x1080, 1920x1080, etc.) | Change width -> observe height auto-update; click preset -> verify values |
| **P3-03** | Assemble `/resize-image` page | P0 | P3-02 | `app/resize-image/page.tsx` | Dedicated page with resizer tool, instructions, dimension guide, and FAQ | Responsive viewport testing, verify H1 & canonical |

---

### Phase 4: Image Converter (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P4-01** | Build format conversion engine | P0 | P0-04 | `lib/image/convert.ts` | Converts between image/jpeg, image/png, image/webp with transparency handling | Verify output MIME type and transparent alpha channel preservation |
| **P4-02** | Build converter UI with format selection | P0 | P1-02, P4-01 | `components/tools/ConverterTool.tsx` | Format chips (JPG, PNG, WebP), quality selector, instant convert and download | Convert transparent PNG to JPG (verify white background) |
| **P4-03** | Assemble `/convert-image` page | P0 | P4-02 | `app/convert-image/page.tsx` | Complete converter page with SEO copy, supported format tables, and FAQ | Mobile and desktop functional testing |

---

### Phase 5: Image Cropper (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P5-01** | Build canvas crop slicing engine | P0 | P0-04 | `lib/image/crop.ts` | `cropImage(file, { cropRect, rotation, outputFormat, quality })` produces exact pixel-accurate slice Blob | Unit coordinate transformation test & memory cleanup verification |
| **P5-02** | Build interactive touch/mouse crop overlay | P0 | P5-01 | `components/tools/CropperTool.tsx` | Draggable bounding box, aspect ratio selectors (Free, 1:1, 4:3, 16:9, 9:16), 90° rotation, rule-of-thirds grid, touch-ready | Touch drag testing on mobile device emulation |
| **P5-03** | Assemble `/crop-image` page | P0 | P5-02 | `app/crop-image/page.tsx` | Complete cropper page with SEO copy, aspect ratio guide, rule-of-thirds explanation, JSON-LD schemas, and FAQ | Build and usability verification |

---

### Phase 6: Targeted SEO Landing Pages (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P6-01** | Build parametric tool template | P1 | P2-03, P3-03, P4-03 | `components/tools/ParametricToolPage.tsx` | Reusable wrapper rendering pre-configured tool and unique editorial copy | Rendering test with custom props |
| **P6-02** | Create target-size compressor routes | P1 | P6-01 | `app/compress-image-to-100kb/page.tsx`, `app/compress-image-to-200kb/page.tsx` | Pre-sets target size to 100KB/200KB; unique schema and educational content | Verify unique title, meta description, and preset slider |
| **P6-03** | Create format-pair converter routes | P1 | P6-01 | `app/jpg-to-png/page.tsx`, `app/png-to-jpg/page.tsx`, `app/webp-to-jpg/page.tsx` | Pre-sets target conversion format; unique copy explaining advantages | Verify conversion flow works immediately on drop |

---

### Phase 7: Sitemaps, Robots & Privacy Verification (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P7-01** | Create dynamic XML sitemap | P1 | P6-03 | `app/sitemap.ts` | Returns all canonical tool URLs with `<lastmod>` and `<changefreq>` | Verified `/sitemap.xml` build generation |
| **P7-02** | Configure robots.txt | P1 | None | `app/robots.ts` | Disallows nothing, specifies sitemap URL | Verified `/robots.txt` dynamic endpoint |
| **P7-03** | Conduct client-side privacy audit | P0 | All | `docs/privacy.md` | Confirm 0 network requests send image bytes; verify clean object URL memory release | Verified memory lifecycle and object URL revocation across all engines |

---

### Phase 8: Production Launch, Search Console & SEO Intelligence (COMPLETE)

| ID | Task Description | Priority | Dependencies | Expected Files | Acceptance Criteria | Testing Method |
|---|---|---|---|---|---|---|
| **P8-01** | Production static export & Cloudflare Pages readiness | P0 | P7-03 | `next.config.ts`, `app/*` | Clean static bundle generation with zero server dependencies | `npm run build` static compilation check |
| **P8-02** | Production route & metadata verification | P1 | P8-01 | All 10 routes | Unique titles, descriptions, canonicals, and JSON-LD schemas | Build inspection & route render test |
| **P8-03** | Search Console & Post-Launch SEO Strategy | P1 | P8-02 | `PROJECT_STATE.md`, `docs/seo.md` | Define technical readiness and external GSC setup steps | Documentation audit & synchronization |
