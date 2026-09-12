import {
  ResizeOptions,
  ResizeResult,
  ResizeStage,
  SupportedImageMime,
} from './types';
import { validateImageFile } from './compress';

// Limits to protect browser memory and canvas rendering stability
export const MIN_IMAGE_DIMENSION = 1;
export const MAX_CANVAS_DIMENSION = 16384;
export const MAX_TOTAL_PIXELS = 64 * 1000 * 1000; // 64 Megapixels

/**
 * Validates target resize dimensions against safe browser limits.
 */
export function validateResizeDimensions(
  width: number,
  height: number
): { valid: boolean; error?: string } {
  if (!width || isNaN(width) || width < MIN_IMAGE_DIMENSION) {
    return {
      valid: false,
      error: `Width must be at least ${MIN_IMAGE_DIMENSION}px.`,
    };
  }

  if (!height || isNaN(height) || height < MIN_IMAGE_DIMENSION) {
    return {
      valid: false,
      error: `Height must be at least ${MIN_IMAGE_DIMENSION}px.`,
    };
  }

  if (width > MAX_CANVAS_DIMENSION) {
    return {
      valid: false,
      error: `Width (${width}px) exceeds the safe browser canvas limit of ${MAX_CANVAS_DIMENSION}px.`,
    };
  }

  if (height > MAX_CANVAS_DIMENSION) {
    return {
      valid: false,
      error: `Height (${height}px) exceeds the safe browser canvas limit of ${MAX_CANVAS_DIMENSION}px.`,
    };
  }

  const totalPixels = width * height;
  if (totalPixels > MAX_TOTAL_PIXELS) {
    return {
      valid: false,
      error: `Total resolution (${Math.round(totalPixels / 1000000)} MP) exceeds the 64 MP browser memory threshold. Please choose smaller dimensions.`,
    };
  }

  return { valid: true };
}

/**
 * Helper to convert canvas to blob with async/await and error handling.
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
            reject(new Error('Browser canvas failed to export resized image data.'));
          }
        },
        type,
        quality
      );
    } catch (err) {
      reject(err instanceof Error ? err : new Error('Canvas export failed.'));
    }
  });
}

/**
 * Sanitizes base filename and appends `-resized-WxH` with appropriate extension.
 */
export function generateResizedFilename(
  originalName: string,
  outputMime: SupportedImageMime,
  width: number,
  height: number
): string {
  const cleanBase = originalName
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_\-\u0600-\u06FF]/g, '_')
    .slice(0, 70);

  const extMap: Record<SupportedImageMime, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  };

  const extension = extMap[outputMime] || '.jpg';
  return `${cleanBase}-resized-${Math.round(width)}x${Math.round(height)}${extension}`;
}

/**
 * Revokes object URL generated for a resize result to prevent browser memory leaks.
 */
export function revokeResizeResult(result: ResizeResult | null): void {
  if (result && result.downloadUrl) {
    try {
      URL.revokeObjectURL(result.downloadUrl);
    } catch {
      // Ignore if already revoked
    }
  }
}

/**
 * Core client-side image resizing engine.
 * Executes 100% inside the browser using HTMLCanvasElement / createImageBitmap.
 */
export async function resizeImage(
  file: File,
  options: ResizeOptions,
  onProgress?: (stage: ResizeStage, detail?: string) => void
): Promise<ResizeResult> {
  // Step 1: Validate file
  const fileValidation = validateImageFile(file);
  if (!fileValidation.valid) {
    throw new Error(fileValidation.error || 'Invalid image file.');
  }

  // Step 2: Validate requested dimensions
  const targetWidth = Math.round(options.width);
  const targetHeight = Math.round(options.height);
  const dimensionValidation = validateResizeDimensions(targetWidth, targetHeight);
  if (!dimensionValidation.valid) {
    throw new Error(dimensionValidation.error || 'Invalid resize dimensions.');
  }

  const originalMime = file.type as SupportedImageMime;
  const targetMime: SupportedImageMime = options.format || originalMime;

  onProgress?.('preparing', 'Preparing image in browser memory...');

  // Step 3: Decode image safely
  let source: ImageBitmap | HTMLImageElement;
  let originalWidth = 0;
  let originalHeight = 0;
  let cleanupSource: () => void = () => {};

  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      source = bitmap;
      originalWidth = bitmap.width;
      originalHeight = bitmap.height;
      cleanupSource = () => {
        bitmap.close();
      };
    } catch {
      // Fallback to HTMLImageElement if createImageBitmap fails
      const objectUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Failed to decode image. The file may be corrupted.'));
        el.src = objectUrl;
      });
      source = img;
      originalWidth = img.naturalWidth || img.width;
      originalHeight = img.naturalHeight || img.height;
      cleanupSource = () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  } else {
    const objectUrl = URL.createObjectURL(file);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Failed to decode image. The file may be corrupted.'));
      el.src = objectUrl;
    });
    source = img;
    originalWidth = img.naturalWidth || img.width;
    originalHeight = img.naturalHeight || img.height;
    cleanupSource = () => {
      URL.revokeObjectURL(objectUrl);
    };
  }

  if (!originalWidth || !originalHeight) {
    cleanupSource();
    throw new Error('Could not determine source image dimensions.');
  }

  onProgress?.(
    'resizing',
    `Resizing image from ${originalWidth}×${originalHeight} to ${targetWidth}×${targetHeight}...`
  );

  // Step 4: Draw onto high-quality Canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d', {
    alpha: targetMime !== 'image/jpeg',
  });

  if (!ctx) {
    cleanupSource();
    throw new Error('Failed to initialize 2D canvas context.');
  }

  // If exporting to JPEG and source has transparency, fill with white background
  if (targetMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // Use highest browser-supported image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

  // Free source bitmap/element immediately after painting onto canvas
  cleanupSource();

  onProgress?.('encoding', `Encoding output as ${targetMime.replace('image/', '').toUpperCase()}...`);

  // Step 5: Handle output encoding & quality
  let finalBlob: Blob;
  let finalQuality: number | undefined = undefined;
  let note: string | undefined = undefined;

  if (targetMime === 'image/png') {
    // PNG is lossless in browser canvas
    finalBlob = await canvasToBlob(canvas, 'image/png');
    finalQuality = 1.0;
    note = 'PNG format uses lossless compression. Quality settings do not alter lossless PNG encoding.';
  } else {
    const rawQuality = options.quality !== undefined ? options.quality : 85;
    const q = Math.max(0.05, Math.min(1.0, rawQuality / 100));
    finalQuality = q;
    finalBlob = await canvasToBlob(canvas, targetMime, q);
  }

  onProgress?.('complete', 'Image resized successfully!');

  // Step 6: Construct Final Result
  const originalSize = file.size;
  const outputSize = finalBlob.size;
  const savedBytes = Math.max(0, originalSize - outputSize);
  const savedPercentage =
    originalSize > 0
      ? Math.round(((originalSize - outputSize) / originalSize) * 100)
      : 0;

  const downloadUrl = URL.createObjectURL(finalBlob);
  const outputName = generateResizedFilename(file.name, targetMime, targetWidth, targetHeight);

  return {
    blob: finalBlob,
    downloadUrl,
    outputName,
    originalSizeBytes: originalSize,
    outputSizeBytes: outputSize,
    savedBytes,
    savedPercentage,
    dimensions: { width: targetWidth, height: targetHeight },
    outputDimensions: { width: targetWidth, height: targetHeight },
    originalDimensions: { width: originalWidth, height: originalHeight },
    format: targetMime,
    aspectRatioLocked: options.maintainAspectRatio,
    qualityUsed: finalQuality,
    note,
  };
}
