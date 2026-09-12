# PRIVACY & SECURITY POLICY — IMAGE TOOLS

## 1. Core Privacy Philosophy

Image Tools is built on a fundamental privacy foundation: **Your images are yours alone. They never leave your device.**

Unlike traditional cloud-based image converters and compressors that upload your files to remote web servers, Image Tools executes all transformations in-memory directly inside your browser.

---

## 2. Technical Privacy Guarantees

| Concern | Cloud-Based Image Sites | Image Tools |
|---|---|---|
| **Image Uploads** | Uploaded to remote servers / AWS S3 | **Zero uploads**. Processed 100% locally on your device. |
| **Server Logs** | Server keeps access logs and filenames | **Zero server logs** containing file data or names. |
| **Data Retention** | Often stored on disk for hours or days | **Zero disk storage**. Only stored in browser RAM. |
| **Data Scraping / AI Training** | Images may be harvested for AI training | **Mathematically impossible**; server never sees the bytes. |
| **Data Breaches** | Risk of remote storage leak | **Zero risk**; no remote database exists. |

---

## 3. Ephemeral Memory Lifecycle

When an image is loaded into Image Tools:
1. The browser's File API reads the file into local device RAM.
2. The image canvas renders the pixels locally.
3. Once transformed, a temporary local object pointer (`blob:`) is created for instant download.
4. When you leave the page, refresh, or upload a new photo, the previous image data is immediately purged from browser memory via `URL.revokeObjectURL()`.

---

## 4. Analytics & Telemetry Boundary

- We do **NOT** track filenames, file dimensions, file contents, or image metadata.
- If web analytics are active, they only record aggregate page visits (e.g. "100 visits to /compress-image") without cookies, without user fingerprinting, and without any file context.
- We do not run invasive tracking pixels from third-party social networks.
- Full compliance with GDPR, CCPA, and global privacy standards.

---

## 5. Security & Input Sanitization

Even though processing is in-browser:
- **MIME Verification**: Files are validated against allowable image types (`image/jpeg`, `image/png`, `image/webp`).
- **XSS Prevention**: Filenames are rendered safely via React JSX escaping. Filenames are never executed or rendered as raw HTML.
- **Memory Caps**: Files exceeding 50MB trigger a friendly in-browser alert to prevent browser tab crashing due to device RAM exhaustion.
