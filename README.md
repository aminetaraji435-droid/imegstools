# Image Tools — Fast, Private, Free Online Image Utilities

**Image Tools** is an ultra-fast, privacy-first web application providing free in-browser tools to compress, resize, convert, and crop images.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, designed for zero-latency execution and portable static deployment (including Cloudflare Pages).

---

## 🌟 Key Highlights

- **100% In-Browser Privacy**: Images are never uploaded to any remote server or third-party cloud. Processing takes place directly in the browser using modern HTML5 Canvas, `createImageBitmap`, and Web APIs.
- **Lightning Fast**: Zero network upload wait times. Instant client-side transformations.
- **Mobile-First & Touch-Ready**: Optimized for all viewports from mobile smartphones to ultra-wide displays.
- **SEO & Core Web Vitals Focused**: Semantic HTML, structured JSON-LD schemas, instant Time to Interactive (TTI), and minimal JavaScript footprint.
- **Zero Registration & No Tracking**: Free forever, no signups, no watermarks, no subscriptions.

---

## 🧰 Included Tools

1. **Image Compressor** (`/compress-image`)
   - Adjustable quality slider (1-100%).
   - Target file size approximation.
   - Immediate before/after file size comparisons with percentage saved.
2. **Image Resizer** (`/resize-image`)
   - Dimension controls (Width / Height) with aspect ratio lock.
   - Quick dimension presets (1080x1080, 1920x1080, 1280x720, etc.).
3. **Image Converter** (`/convert-image`)
   - High-fidelity conversion between JPG, PNG, and WebP formats.
4. **Image Cropper** (`/crop-image`)
   - Interactive visual cropping with standard aspect ratios (Free, 1:1, 4:3, 16:9, 9:16).

---

## 🏗️ Architecture

```
User Browser
    │
    ▼
Next.js Static Shell (Cloudflare Pages / Node runtime)
    │
    ▼
Client-Side Image Pipeline (Canvas / OffscreenCanvas / Web APIs)
    │
    ▼
Direct In-Memory Blob Download
```

There is **no backend image pipeline**, no external database, and no server-side storage required.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd image-tools

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
├── AGENTS.md            # AI agent instructions & operational bounds
├── PROJECT_STATE.md     # Current project status & single source of truth
├── ROADMAP.md           # Product roadmap & long-term milestones
├── PHASES.md            # Detailed milestone tasks & acceptance criteria
├── PLAN.md              # Actionable prioritized implementation checklist
├── API_CONTRACT.md      # API contract (documenting client-only architecture)
├── docs/                # Architecture, design system, SEO, and privacy specs
├── app/                 # Next.js App Router entry points & pages
├── components/          # Reusable UI, layout, and tool components
├── config/              # Central site configuration and tool registry
└── lib/                 # Core browser image manipulation algorithms
```

---

## 🔒 Privacy Guarantee

Because processing is done entirely client-side:
- Your files never leave your computer or phone.
- No personal data or metadata is harvested.
- Completely safe for sensitive documents, personal photographs, and proprietary graphics.

---

## 📄 License
MIT License. Free for personal and commercial usage.
