# PERFORMANCE ARCHITECTURE — IMAGE TOOLS

## 1. Core Web Vitals Targets

Image Tools is engineered to achieve perfect 100/100 Lighthouse performance metrics across Mobile and Desktop.

| Metric | Target | Technical Strategy |
|---|---|---|
| **Largest Contentful Paint (LCP)** | `< 1.2s` | Zero heavy remote assets above the fold; static HTML rendering; inlined SVG icons. |
| **Interaction to Next Paint (INP)** | `< 50ms` | Asynchronous canvas processing; non-blocking UI threads; off-DOM operations. |
| **Cumulative Layout Shift (CLS)** | `0.00` | Fixed aspect ratio containers for previews; reserved space for controls before render. |
| **First Contentful Paint (FCP)** | `< 0.8s` | Lightweight Tailwind CSS v4 stylesheets; pre-rendered static shells. |
| **Total Blocking Time (TBT)** | `< 50ms` | Lazy code-splitting; zero unnecessary heavy client-side libraries. |

---

## 2. Bundle Size Optimization & Code Splitting

1. **Native Web APIs over Heavy Packages**:
   - Instead of bundling 500KB+ libraries (e.g. `cropperjs`, `pica`, `jimp`), we use native browser APIs (`HTMLCanvasElement`, `createImageBitmap`, `OffscreenCanvas`, `FileReader`, `Blob`).
   - Keeps client bundle size strictly under 90KB gzip for the entire application.
2. **Dynamic Lazy-Loading**:
   - Heavy tool components (e.g., interactive cropper or binary search compressor) are dynamically imported (`next/dynamic`) when the tool route is mounted.
   - The homepage loads only the minimal dropzone and static promotional markup.
3. **Tree-Shaking**:
   - Lucide icons imported individually by name; no barrel file re-exports.

---

## 3. Client-Side Memory & CPU Optimization

Large image processing (e.g., 24MP phone photos at 6000x4000) can consume over 96MB of uncompressed pixel data in RAM. We apply strict memory conservation safeguards:

### Memory Management Rules:
1. **Always Revoke Object URLs**:
   ```typescript
   // Immediate cleanup when a new file replaces an old one
   if (previousBlobUrlRef.current) {
     URL.revokeObjectURL(previousBlobUrlRef.current);
   }
   ```
2. **Dimension Guardrail**:
   - Extremely large images (> 8000px width/height) are scaled down in memory before manipulation to avoid browser canvas crashing (`STATUS_BREAKPOINT` or iOS Safari 4096px canvas ceiling).
3. **Offscreen Canvas & Web Workers (Phase 2+)**:
   - CPU-intensive iterative byte-matching algorithms (binary search for exact 100KB target size) can run inside a lightweight Web Worker to keep the 60fps main UI thread completely fluid.

---

## 4. Network Performance

- **Zero Remote Image Transfers**: Zero network bandwidth spent uploading or downloading megabytes of raw image data.
- **Static Asset Caching**: `Cache-Control: public, max-age=31536000, immutable` for all JavaScript chunks and CSS.
- **Font Optimization**: Use system font stacks (`font-sans`) to eliminate external web font downloads (0ms font loading time).
