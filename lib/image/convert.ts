import {
  ConvertOptions,
  ConvertResult,
  ConvertStage,
  SupportedImageMime,
  ImageDimensions,
} from './types';
import { validateImageFile } from './compress';

// Standard file extension mapping
export const MIME_TO_EXT: Record<SupportedImageMime, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export const EXT_TO_MIME: Record<string, SupportedImageMime> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

/**
 * Generates clean, sanitized output filename for converted image.
 * E.g., 'photo.png' -> 'photo.webp' or 'family-vacation.jpg' -> 'family-vacation.png'
 */
export function generateConvertedFilename(
  originalName: string,
  targetMime: SupportedImageMime
): string {
  // Strip existing file extension
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  
  // Sanitize characters for safe cross-platform saving (allowing Latin, Arabic, digits, dashes, underscores)
  const cleanBase = baseName
    .replace(/[^a-zA-Z0-9_\-\u0600-\u06FF]/g, '_')
    .slice(0, 80);

  const extension = MIME_TO_EXT[targetMime] || '.jpg';
  return `${cleanBase || 'converted_image'}${extension}`;
}

/**
 * Revokes object URL created for a ConvertResult to prevent browser memory leaks.
 */
export function revokeConvertResult(result: ConvertResult | null): void {
  if (result && result.downloadUrl) {
    try {
      URL.revokeObjectURL(result.downloadUrl);
    } catch {
      // Ignore if already revoked
    }
  }
}

/**
 * Helper to export canvas to Blob with promise wrapping.
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: SupportedImageMime,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0) {
            resolve(blob);
          } else {
            reject(new Error('Browser canvas failed to export converted image data.'));
          }
        },
        type,
        quality
      );
    } catch (err) {
      reject(err instanceof Error ? err : new Error('Canvas conversion export failed.'));
    }
  });
}

/**
 * Core client-side format conversion engine.
 * Executes 100% inside the browser using HTMLCanvasElement / createImageBitmap.
 */
export async function convertImage(
  file: File,
  options: ConvertOptions,
  onProgress?: (stage: ConvertStage, detail?: string) => void
): Promise<ConvertResult> {
  // Step 1: Validate input file
  const fileValidation = validateImageFile(file);
  if (!fileValidation.valid) {
    throw new Error(fileValidation.error || 'Invalid image file.');
  }

  const originalMime = (file.type || 'image/jpeg') as SupportedImageMime;
  const targetMime: SupportedImageMime = options.targetFormat;
  const isSameFormat = originalMime === targetMime;

  onProgress?.('preparing', 'Reading image in browser memory...');

  // Step 2: Decode image safely
  let source: ImageBitmap | HTMLImageElement;
  let width = 0;
  let height = 0;
  let cleanupSource: () => void = () => {};

  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      source = bitmap;
      width = bitmap.width;
      height = bitmap.height;
      cleanupSource = () => {
        bitmap.close();
      };
    } catch {
      // Fallback to HTMLImageElement
      const objectUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Failed to decode image. The file may be corrupted or unsupported.'));
        el.src = objectUrl;
      });
      source = img;
      width = img.naturalWidth || img.width;
      height = img.naturalHeight || img.height;
      cleanupSource = () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  } else {
    const objectUrl = URL.createObjectURL(file);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Failed to decode image. The file may be corrupted or unsupported.'));
      el.src = objectUrl;
    });
    source = img;
    width = img.naturalWidth || img.width;
    height = img.naturalHeight || img.height;
    cleanupSource = () => {
      URL.revokeObjectURL(objectUrl);
    };
  }

  if (!width || !height) {
    cleanupSource();
    throw new Error('Could not determine image dimensions.');
  }

  // Safety check for ultra large dimensions
  const totalPixels = width * height;
  if (totalPixels > 64 * 1000 * 1000) {
    cleanupSource();
    throw new Error(`Image resolution (${Math.round(totalPixels / 1000000)} MP) exceeds safe in-browser processing limits. Please resize first.`);
  }

  onProgress?.('converting', `Converting image to ${targetMime.replace('image/', '').toUpperCase()}...`);

  // Step 3: Draw onto Canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const requiresOpaqueBackground = targetMime === 'image/jpeg';
  const ctx = canvas.getContext('2d', {
    alpha: !requiresOpaqueBackground,
  });

  if (!ctx) {
    cleanupSource();
    throw new Error('Failed to initialize 2D canvas context.');
  }

  // Background color handling for JPEG
  const bgColor = options.backgroundColor || '#ffffff';
  let note: string | undefined = undefined;

  if (requiresOpaqueBackground) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    if (originalMime === 'image/png' || originalMime === 'image/webp') {
      note = `JPEG format does not support transparency. Transparent areas were rendered with a background color (${bgColor}).`;
    }
  }

  // Preserve maximum quality drawing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, width, height);

  // Free source bitmap immediately
  cleanupSource();

  onProgress?.('encoding', `Encoding output as ${targetMime.replace('image/', '').toUpperCase()}...`);

  // Step 4: Encode to target format with appropriate quality
  let finalBlob: Blob;
  let finalQuality: number | undefined = undefined;

  if (targetMime === 'image/png') {
    // PNG is lossless
    finalBlob = await canvasToBlob(canvas, 'image/png');
    finalQuality = 1.0;
    if (!note) {
      note = 'PNG format uses lossless compression to preserve 100% pixel fidelity and transparency.';
    }
  } else {
    // JPEG or WebP
    const rawQuality = options.quality !== undefined ? options.quality : 85;
    const q = Math.max(0.05, Math.min(1.0, rawQuality / 100));
    finalQuality = q;
    finalBlob = await canvasToBlob(canvas, targetMime, q);
  }

  onProgress?.('complete', 'Image converted successfully!');

  // Step 5: Analyze file size difference
  const originalSize = file.size;
  const outputSize = finalBlob.size;
  const sizeDiff = originalSize - outputSize;
  const isSizeReduced = outputSize < originalSize;
  const isSizeIncreased = outputSize > originalSize;
  const savedBytes = Math.max(0, sizeDiff);
  const sizeChangePercentage = originalSize > 0
    ? Math.round(Math.abs(sizeDiff / originalSize) * 100)
    : 0;
  const savedPercentage = isSizeReduced ? sizeChangePercentage : 0;

  const downloadUrl = URL.createObjectURL(finalBlob);
  const outputName = generateConvertedFilename(file.name, targetMime);

  const dimensions: ImageDimensions = { width, height };

  return {
    blob: finalBlob,
    downloadUrl,
    outputName,
    originalSizeBytes: originalSize,
    outputSizeBytes: outputSize,
    savedBytes,
    savedPercentage,
    dimensions,
    format: targetMime,
    originalFormat: originalMime,
    outputFormat: targetMime,
    qualityUsed: finalQuality,
    backgroundColorUsed: requiresOpaqueBackground ? bgColor : undefined,
    isSameFormat,
    isSizeReduced,
    isSizeIncreased,
    sizeChangePercentage,
    note,
  };
}
