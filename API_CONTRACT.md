# API CONTRACT — IMAGE TOOLS

## 1. Architectural Statement

> **CURRENT ARCHITECTURE DOES NOT REQUIRE AN API.**
>
> All image manipulation tasks (compression, resizing, conversion, cropping) are performed **strictly client-side within the user's browser** via modern HTML5 Canvas, `createImageBitmap`, and Web APIs. No images or media buffers are transmitted over the network to any server.

---

## 2. Future Backend API Specification (Contingency Only)

If at a future phase a feature explicitly mandates server-side processing (such as server-side RAW file decoding, automated webhooks, CLI developer APIs, or AI generative transformations), the following contract MUST govern that implementation.

**Do NOT implement these endpoints until formally requested and approved.**

### 2.1 API Base & Versioning
- **Base URL**: `https://api.imagetools.app/v1`
- **Versioning Strategy**: URI path versioning (`/v1/`, `/v2/`). Breaking changes strictly require a new version prefix.

### 2.2 Authentication & Authorization
- **Mechanism**: Bearer API Key in Authorization header (`Authorization: Bearer it_live_...`).
- **Scopes**:
  - `images:read`: Inspect image metadata without mutation.
  - `images:write`: Perform transformation jobs.
  - `images:batch`: Access bulk processing pipelines.

### 2.3 Rate Limits & Quotas
- **Free Tier (Anonymous / Client-side fallback)**: 30 requests / minute, burst to 45.
- **Developer Tier**: 300 requests / minute.
- **Rate Limit Headers**:
  - `X-RateLimit-Limit`: Maximum allowed requests per window.
  - `X-RateLimit-Remaining`: Remaining requests.
  - `X-RateLimit-Reset`: Unix epoch timestamp when quota resets.

### 2.4 File Size & Format Limits
- **Maximum Payload Size**: 25 MB per single image request.
- **Allowed MIME Types**: `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/tiff`.
- **Payload Transport**: `multipart/form-data` or raw binary stream with `Content-Type`.

---

## 3. Future Endpoint Schemas

### 3.1 Compress Image
- **Endpoint**: `POST /v1/compress`
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Request Parameters (Form Data)**:
  - `file` (binary, required): Image file.
  - `quality` (integer, optional, 1-100, default: 80): Desired compression quality.
  - `target_size_kb` (integer, optional): Target maximum file size in kilobytes.
  - `output_format` (string, optional: `jpeg` | `png` | `webp`): Override output format.
- **Response Schema** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "original_filename": "photo.png",
      "original_size_bytes": 2457600,
      "compressed_size_bytes": 482100,
      "saved_bytes": 1975500,
      "saved_percentage": 80.38,
      "format": "image/webp",
      "download_url": "https://storage.imagetools.app/temp/uuid-comp.webp",
      "expires_at": "2026-09-11T08:00:00Z"
    }
  }
  ```

### 3.2 Resize Image
- **Endpoint**: `POST /v1/resize`
- **Request Parameters (Form Data)**:
  - `file` (binary, required): Image file.
  - `width` (integer, optional): Desired width in pixels.
  - `height` (integer, optional): Desired height in pixels.
  - `fit` (string, optional: `cover` | `contain` | `fill` | `inside` | `outside`, default: `inside`).
  - `maintain_aspect_ratio` (boolean, optional, default: true).
- **Response Schema** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "original_dimensions": { "width": 3840, "height": 2160 },
      "output_dimensions": { "width": 1920, "height": 1080 },
      "size_bytes": 620400,
      "download_url": "https://storage.imagetools.app/temp/uuid-resize.jpg",
      "expires_at": "2026-09-11T08:00:00Z"
    }
  }
  ```

### 3.3 Convert Image Format
- **Endpoint**: `POST /v1/convert`
- **Request Parameters (Form Data)**:
  - `file` (binary, required): Image file.
  - `target_format` (string, required: `jpeg` | `png` | `webp` | `avif`).
  - `quality` (integer, optional, 1-100, default: 85).
  - `background_color` (string, optional, hex color e.g. `#ffffff` when flattening transparent alpha).
- **Response Schema** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "source_format": "image/png",
      "target_format": "image/webp",
      "output_size_bytes": 312000,
      "download_url": "https://storage.imagetools.app/temp/uuid-converted.webp",
      "expires_at": "2026-09-11T08:00:00Z"
    }
  }
  ```

---

## 4. Standard Error Response Schema

All errors must return standard JSON conforming to this structure:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "The uploaded file is not a supported image format. Supported formats are JPG, PNG, and WebP.",
    "details": {
      "received_type": "application/pdf",
      "supported_types": ["image/jpeg", "image/png", "image/webp"]
    }
  }
}
```

### Standard Error Codes:
- `UNSUPPORTED_MEDIA_TYPE` (415): File format not recognized or supported.
- `PAYLOAD_TOO_LARGE` (413): File exceeds the 25MB ceiling.
- `CORRUPTED_IMAGE` (422): Image byte stream cannot be decoded.
- `RATE_LIMIT_EXCEEDED` (429): Client exceeded hourly/minute quota.
- `INTERNAL_PROCESSING_ERROR` (500): Server-side image manipulation failure.

---

## 5. Security & Ephemeral Storage Guidelines

In any future server-side deployment:
1. **Zero Permanent Storage**: User images must reside in volatile memory or ephemeral scratch spaces with a strictly enforced TTL (maximum 15 minutes).
2. **Immediate Deletion**: Storage files must be deleted immediately after confirmed download or TTL expiry.
3. **EXIF Scrubbing**: Default to stripping all GPS, device metadata, and personal identification tags unless explicitly flagged by the user.
4. **MIME Sniffing Prevention**: Validate files by binary magic numbers (e.g. `FF D8 FF` for JPEG, `89 50 4E 47` for PNG), never trusting file extensions alone.
