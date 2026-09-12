# SEO ARCHITECTURE & STRATEGY — IMAGE TOOLS

## 1. Strategy Overview

Image Tools captures high-intent organic search queries by providing fast, functional utilities coupled with clear, educational content.

### Core Principles
1. **Zero Thin Content / Zero Spam**: Every page hosts a fully working tool. No "lorem ipsum" placeholder pages or automated low-quality doorway sites.
2. **Intent-Aligned Configuration**: When a user arrives at `/compress-image-to-100kb`, the compressor tool is pre-configured with a 100KB target size slider, immediately delivering on the promise of the query.
3. **Structured Data Validation**: Every route provides valid JSON-LD schemas (`WebApplication`, `HowTo`, and `FAQPage`).
4. **Canonical Precision**: Self-referencing canonical URLs on all primary and long-tail routes to prevent duplicate content penalties.

---

## 2. Route Hierarchy & Keyword Mapping

### Tier 1: Core Tool Hubs (Primary Search Volume)

| Route | Primary Keyword | Page Title | Meta Description | Target Intent |
|---|---|---|---|---|
| `/` | free image tools | Image Tools — Fast, Free & Private Online Image Utilities | Free online image tools to compress, resize, convert, and crop images. 100% private in-browser processing with zero uploads. | High-level tool directory & multi-tool entry point |
| `/compress-image` | compress image online | Free Image Compressor — Reduce JPG, PNG, WebP File Size | Compress images online without losing quality. Fast, free in-browser compression for JPG, PNG, and WebP. 100% private. | General image size reduction |
| `/resize-image` | resize image online | Free Image Resizer — Resize Dimensions & Aspect Ratio Online | Resize image dimensions in pixels or percentage. Preserve aspect ratio or choose presets for social media. Fast and free. | Dimension modification & scaling |
| `/convert-image` | convert image format | Free Image Converter — Convert JPG, PNG, WebP Online | Convert image files between JPG, PNG, and WebP directly in your browser. Fast, free, high quality, zero server uploads. | File format transformation |
| `/crop-image` | crop image online | Free Image Cropper — Crop Photos & Aspect Ratios Online | Crop images online with custom dimensions or standard aspect ratios (1:1, 16:9, 4:3). Easy, fast, and mobile-friendly. | Visual rectangular trimming |

### Tier 2: High-Intent Long-Tail Pages (Targeted Workflows)

| Route | Preset / Tool State | Specific Value Provided |
|---|---|---|
| `/compress-image-to-100kb` | Quality algorithm targets `< 100 KB` | Pre-sets slider/target size to 100KB for government forms, job portals, and upload limits. |
| `/compress-image-to-200kb` | Quality algorithm targets `< 200 KB` | Pre-sets target size to 200KB for standardized web portal submissions. |
| `/compress-image-to-500kb` | Quality algorithm targets `< 500 KB` | Standard email attachment and CMS optimization. |
| `/jpg-to-png` | Convert tool with output `PNG` | Explains alpha transparency and lossless conversion. |
| `/png-to-jpg` | Convert tool with output `JPG` | Explains file size reduction from raster graphics to JPEG. |
| `/webp-to-jpg` | Convert tool with output `JPG` | Converts modern WebP to universal JPEG for legacy software compatibility. |
| `/resize-image-for-instagram`| Resizer with `1080x1080`, `1080x1350`, `1080x1920` presets | Verified social media dimensions with instant 1-click selection. |
| `/resize-image-for-youtube` | Resizer with `1280x720` (Thumbnail), `2560x1440` (Banner) | Thumbnail and channel banner size presets. |

---

## 3. On-Page Semantic Layout Requirements

Every tool page must strictly follow this content structure:

1. **Header & Breadcrumb**:
   - `Home > Tools > Compress Image` (improves site hierarchy for crawlers).
2. **H1 Headline**:
   - Clear, concise, keyword-accurate (e.g., `Compress Image Online`).
3. **Subheading**:
   - 1-2 sentences highlighting benefits: Free, fast, private, no file uploads.
4. **Interactive Tool Card**:
   - Above the fold, easy drag-and-drop, clear action controls.
5. **How It Works (H2 & Step List)**:
   - 3-step procedural guide (Select Image -> Adjust Settings -> Download).
6. **Feature Benefits (H2 & Grid)**:
   - Specific advantages (Local processing, zero file size limits, quality preservation).
7. **Frequently Asked Questions (H2 & Accordion / List)**:
   - 4-6 genuine user questions and authoritative answers.
8. **Related Tools**:
   - Cross-linking to related image utilities to distribute internal page rank.

---

## 4. Structured Data (JSON-LD) Specification

### WebApplication Schema (Example)
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free Image Compressor",
  "url": "https://imagetools.app/compress-image",
  "description": "Compress JPG, PNG, and WebP images online directly in your browser.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### HowTo Schema (Example)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Compress an Image Online for Free",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Upload Image",
      "text": "Drag and drop your image or click to select from your device."
    },
    {
      "@type": "HowToStep",
      "name": "Adjust Quality",
      "text": "Move the quality slider or set a target file size in kilobytes."
    },
    {
      "@type": "HowToStep",
      "name": "Download",
      "text": "Click the Download button to save the compressed image directly to your device."
    }
  ]
}
```
