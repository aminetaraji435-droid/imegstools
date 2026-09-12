# AI AGENT INSTRUCTIONS — IMAGE TOOLS

Welcome to **Image Tools** (`/`). This file is the primary contract and guide for all AI coding agents and human engineers contributing to this repository.

---

## 1. Project Purpose & Philosophy

**Image Tools** is a fast, modern, privacy-first, SEO-focused web platform delivering free client-side image manipulation utilities.
- **Core Tools**: Image Compressor, Image Resizer, Image Converter, Image Cropper.
- **Key Tenet**: **100% Client-Side In-Browser Processing**. User images are NEVER uploaded to any backend or cloud server for standard processing.
- **Hosting Target**: Cloudflare Pages / Static Hosting portable environment.

---

## 2. Strict Architectural Rules (What You MUST & MUST NOT Do)

### STRICT PROHIBITIONS:
1. **NO Backend or Cloud Database Introductions**:
   - DO NOT install or integrate Supabase, Appwrite, Firebase Auth/Firestore, PostgreSQL, Prisma, or Drizzle unless an explicit user prompt requests user-authenticated cloud sync.
   - DO NOT set up Cloudflare Workers or serverless functions to process images.
2. **NO Unsolicited AI SDKs or External Paid APIs**:
   - Do NOT wire `@google/genai` or external paid APIs into the client image flow. Image processing must rely on standard browser APIs (`HTMLCanvasElement`, `createImageBitmap`, `OffscreenCanvas`, `FileReader`, `Blob`) or vetted lightweight client libraries.
3. **NO Server Image Uploads**:
   - DO NOT create `/api/upload` or `/api/process` endpoints that accept user image buffers. All image modifications occur in the user's browser memory.
4. **NO Arbitrary Package Installations**:
   - Strictly follow the **Dependency Policy** (Section 7). Do NOT install large libraries when native Web APIs can achieve the goal.
5. **NO Unsolicited Restructuring or Code Rewriting**:
   - Always inspect existing code before changing it.
   - Never wipe or rewrite functioning modules or styles arbitrarily.
6. **NO SEO Spam or Clone Pages**:
   - Avoid creating thin programmatic duplicates. Every route must offer clear, functional utility with distinct content and schemas.

### MANDATORY PRACTICES:
1. **Inspect Before Acting**: Call file viewing tools to verify existing implementations before editing.
2. **Client-Side Processing**: Execute all conversions, compressions, and crops locally via Canvas / Web APIs.
3. **Keep Docs Synchronized**: Whenever you finish a phase or modify routes/dependencies, update `PROJECT_STATE.md` and `PLAN.md`.
4. **Accessible & Responsive**: Guarantee full touch target accessibility (min 44px) and mobile responsiveness across all tools.
5. **Zero Memory Leaks**: Always revoke object URLs (`URL.revokeObjectURL(url)`) when images are replaced or components unmount.

---

## 3. Technology Stack & Directory Structure

```
/
├── AGENTS.md                  # Agent guidelines (this file)
├── README.md                  # Project overview & developer guide
├── PROJECT_STATE.md           # Source of truth for current status
├── ROADMAP.md                 # Long-term product roadmap
├── PHASES.md                  # Granular phase definitions & criteria
├── PLAN.md                    # Actionable task tracking (P0, P1, P2)
├── API_CONTRACT.md            # Statement of client-only architecture & future API spec
├── docs/                      # Architectural & design specifications
│   ├── architecture.md
│   ├── design-system.md
│   ├── seo.md
│   ├── performance.md
│   ├── privacy.md
│   └── decisions.md
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout with shared navigation & footer
│   ├── globals.css            # Tailwind CSS v4 entry
│   ├── page.tsx               # Homepage / Tool Hub
│   ├── compress-image/        # Dedicated compressor tool
│   ├── resize-image/          # Dedicated resizer tool
│   ├── convert-image/         # Dedicated format converter tool
│   └── crop-image/            # Dedicated cropper tool
├── components/
│   ├── layout/                # Header, Footer, Breadcrumbs, Navigation
│   ├── ui/                    # Reusable atomic UI elements (Button, Slider, Card, etc.)
│   └── tools/                 # Tool-specific UI modules (UploadZone, Controls, ResultPreview)
├── config/
│   ├── site.ts                # Site metadata & navigation links
│   └── tools.ts               # Registry of available tools, features, and route mappings
└── lib/
    ├── image/                 # Core client-side processing engines
    │   ├── compress.ts
    │   ├── resize.ts
    │   ├── convert.ts
    │   ├── crop.ts
    │   └── types.ts
    ├── seo/                   # SEO helper utilities & Schema markup generators
    └── utils.ts               # Class name merging and common utilities
```

---

## 4. Coding & Component Conventions

1. **Strict TypeScript**: No `any`. Explicit typing for image options, dimensions, and callback payloads.
2. **Naming Conventions**:
   - Components: `PascalCase.tsx` (e.g., `ImageUploadZone.tsx`)
   - Utilities: `kebab-case.ts` or `camelCase.ts` (e.g., `compress.ts`)
   - Route Folders: `kebab-case` (e.g., `compress-image`)
3. **Client vs Server Components**:
   - Layouts, static explanatory text, and SEO copy should remain **Server Components**.
   - Interactive canvas processors, dropzones, and interactive sliders must have `'use client'` at the top.
4. **Tailwind CSS Rules**:
   - Use Tailwind utility classes directly.
   - Adhere strictly to the defined semantic color tokens (`background`, `surface`, `primary`, `text`, `border`, `muted`).
   - Do NOT use ad-hoc arbitrary values when standard design system tokens exist.

---

## 5. Image Processing Strategy

All processing follows this deterministic pipeline:
```
File input (Drag & drop or file picker)
  ↓
Validation (MIME type check, file size limit)
  ↓
Object URL generation / FileReader
  ↓
Image Decode (HTMLImageElement or createImageBitmap)
  ↓
Canvas Drawing & Manipulation (Resize, Crop, Format, Quality)
  ↓
Blob Export (canvas.toBlob / OffscreenCanvas)
  ↓
Result Analysis (Original vs new bytes, % saved)
  ↓
Download Trigger (Client anchor download attribute)
```

Memory Cleanup:
- Every `URL.createObjectURL()` must have a paired `URL.revokeObjectURL()` in cleanup hooks or state transitions.

---

## 6. SEO & Metadata Rules

- Each tool and landing page must feature:
  - Canonical URL.
  - Descriptive, unique `<title>` and `<meta name="description">`.
  - JSON-LD Structured Data (`WebApplication` or `HowTo`).
  - Clear H1, H2 hierarchy without skipping levels.
  - High-value explanatory FAQ section.

---

## 7. Dependency Policy

Before proposing or installing any npm dependency:
1. Explain why native Web APIs (`CanvasRenderingContext2D`, `OffscreenCanvas`, `createImageBitmap`) cannot fulfill the requirement.
2. Confirm bundle size impact (prefer packages under 30KB).
3. Verify compatibility with standard web browsers and static deployment.

---

## 8. Verification Workflow Before Finishing Any Turn

1. Run `lint_applet` to ensure zero syntax or lint errors.
2. Run `compile_applet` to confirm the production build completes cleanly.
3. Update `PROJECT_STATE.md` with features completed, pending tasks, and architecture status.
4. Summarize changes concisely to the user without unnecessary marketing fluff or file path noise.
