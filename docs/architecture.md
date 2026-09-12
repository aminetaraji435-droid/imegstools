# SYSTEM ARCHITECTURE — IMAGE TOOLS

## 1. High-Level System Overview

**Image Tools** is designed as a zero-latency, privacy-first web utility suite. The entire image processing pipeline runs on the client device inside the web browser.

### Architectural Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│                                                             │
│  ┌──────────────────┐            ┌────────────────────────┐ │
│  │   UI Component   │            │ Image Processing Core  │ │
│  │  (Next.js Shell) │            │  (Canvas / Web APIs)   │ │
│  └────────┬─────────┘            └───────────▲────────────┘ │
│           │                                  │              │
│      File │ Drop / Select                    │ Canvas       │
│           ▼                                  │ Pipeline     │
│  ┌──────────────────┐                        │              │
│  │ File Validation  ├────────────────────────┘              │
│  │  & Decoded Image │                                       │
│  └──────────────────┘                                       │
│           │                                                 │
│           │ Processed Blob                                  │
│           ▼                                                 │
│  ┌──────────────────┐                                       │
│  │  Local In-Memory │ ──► Direct User Download               │
│  │    Blob URL      │     (Zero server transit)             │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │ Initial Static Bundle Delivery
                               │ (HTML / JS / CSS / Fonts)
┌──────────────────────────────┴──────────────────────────────┐
│                  Edge Static Distribution                   │
│        (Cloudflare Pages / Node.js Standalone SSR)          │
│                                                             │
│    • Pre-rendered Static Pages                              │
│    • Minimal JavaScript Bundles                             │
│    • Zero Server-Side Image Processing                      │
│    • Zero Remote Database Connections                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. In-Browser Image Manipulation Pipeline

### Core Processing Flow

1. **File Selection**:
   - The user selects or drags a file into `ImageUploadZone`.
   - Client checks file type (`image/jpeg`, `image/png`, `image/webp`) and file size (guard against browser memory exhaustion, max 50MB).
2. **Decoding**:
   - `createImageBitmap(file)` or `new Image()` with `URL.createObjectURL(file)`.
   - Extraction of native image metadata (`naturalWidth`, `naturalHeight`, byte size).
3. **Canvas Transformation**:
   - An off-DOM `HTMLCanvasElement` or `OffscreenCanvas` is initialized with target dimensions.
   - Drawing operations (`ctx.drawImage`) are executed with optimal interpolation.
   - For cropping: destination canvas slices sub-rectangle `(sx, sy, sWidth, sHeight)`.
   - For resizing: proportional scaling with bicubic interpolation.
   - For format conversion / compression: `canvas.toBlob(callback, mimeType, quality)`.
4. **Result Packaging**:
   - Output Blob is measured (`blob.size`).
   - `savedPercentage = ((originalSize - newSize) / originalSize) * 100`.
   - A download anchor is populated with `URL.createObjectURL(blob)` and semantic filename (e.g., `original-compressed.webp`).
5. **Memory Cleanup**:
   - Explicit invocation of `URL.revokeObjectURL()` during component unmount or next operation.
   - Zero retained memory leaks.

---

## 3. Technology Choices & Justification

| Technology | Role | Justification |
|---|---|---|
| **Next.js 15 (App Router)** | Static Shell & Routing | Industry-standard React framework, automatic static optimization, dynamic metadata generation, zero runtime overhead for static routes. |
| **Tailwind CSS v4** | UI Styling | Rapid utility-first styling, zero runtime CSS-in-JS overhead, responsive mobile design, consistent design tokens. |
| **Lucide Icons** | Visual Iconography | Lightweight, tree-shakeable SVG icons; consistent line weight and aesthetic. |
| **Native Canvas API** | Image Engine | Built into 100% of modern browsers. Avoids multi-megabyte WebAssembly or third-party bloated libraries. |

---

## 4. Portability & Cloudflare Pages Compatibility

The architecture strictly avoids vendor lock-in:
- **No Node.js Native Dependencies**: All code runs cleanly in V8 browser environments and edge static runners.
- **Static Export Ready**: Can be deployed to Cloudflare Pages (`next-on-pages` or static export), Vercel, Netlify, AWS S3/CloudFront, or Docker containers.
- **Zero Server-Side State**: Completely stateless edge delivery.
