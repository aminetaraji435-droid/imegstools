# ARCHITECTURAL DECISIONS (ADR) — IMAGE TOOLS

This document logs significant architectural and design choices for Image Tools, detailing the context, decision, consequences, and alternatives considered.

---

## ADR 001: 100% Client-Side In-Browser Image Processing

- **Status**: Accepted (September 2026)
- **Context**: Most image editing and compression websites upload user files to a cloud server (Node.js, Python, or Go), process them using libvips or Sharp, store them temporarily in S3, and return a download link. This creates significant operational server costs, bandwidth overhead, latency, and serious privacy/security concerns.
- **Decision**: Execute all core transformations (compress, resize, convert, crop) purely in the client browser using native HTML5 Canvas, `createImageBitmap`, `OffscreenCanvas`, and File APIs.
- **Consequences**:
  - *Positive*: Zero hosting bandwidth and compute costs for image transformations; sub-second zero-upload speed; unbreakable privacy guarantee for end users; unlimited free usage without server billing scaling linearly.
  - *Negative*: Processing speed depends on user's device CPU/GPU; very large images (>50MB) may encounter memory limits on low-end smartphones (handled via proactive size checks).
- **Alternatives Considered**:
  - *Server-side Sharp in Cloudflare Workers*: Incurs CPU execution time limits, upload bandwidth delays, and privacy compromises.

---

## ADR 002: Native Web APIs vs Heavy Image Packages

- **Status**: Accepted (September 2026)
- **Context**: Many open-source libraries exist for cropping and compressing (e.g. `cropperjs`, `browser-image-compression`, `pica`, `jimp`). Bundling them increases initial JavaScript bundle size by 100KB - 400KB.
- **Decision**: Implement core mathematical transformations directly with native Web APIs (`CanvasRenderingContext2D`, `drawImage`, `toBlob`, `createImageBitmap`). Only adopt lightweight vetted micro-libraries if native APIs provably fail to satisfy a critical UX need.
- **Consequences**:
  - *Positive*: Extremely small bundle footprint, instant page loads, zero dependency vulnerabilities, full code ownership.
  - *Negative*: Requires writing custom coordinate boundary logic for cropping handles and binary search for target file size.

---

## ADR 003: No Database or Backend User Authentication

- **Status**: Accepted (September 2026)
- **Context**: Many SaaS platforms prematurely introduce user signups, Supabase, Firebase, or SQL databases to track user history or store images.
- **Decision**: Maintain zero backend, zero database, and zero user authentication for the initial application. The user opens the tool, fixes their image, downloads it, and leaves without roadblocks.
- **Consequences**:
  - *Positive*: Frictionless conversion; maximum trust; zero database hosting/maintenance overhead.
  - *Negative*: Cannot save user presets across devices (can be addressed in future phases via local `localStorage` without a server).

---

## ADR 004: Next.js 15 App Router with Tailwind CSS v4

- **Status**: Accepted (September 2026)
- **Context**: Need a robust, modern framework that supports static generation, dynamic SEO metadata, modern React 19, and rapid utility styling.
- **Decision**: Utilize Next.js 15 App Router with Tailwind CSS v4 and strict TypeScript.
- **Consequences**:
  - *Positive*: Excellent SEO metadata handling, automatic static optimization, instant routing, top-tier developer experience.
  - *Negative*: Must be mindful of `'use client'` boundaries for browser-only canvas APIs.
