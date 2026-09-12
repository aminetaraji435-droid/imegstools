import {
  CropAspectRatio,
  CropOptions,
  CropRect,
  CropResult,
  CropStage,
  SupportedImageMime,
  ImageDimensions,
} from './types';
import { validateImageFile } from './compress';
import { MIME_TO_EXT } from './convert';

/**
 * Calculates a default centered crop rectangle according to a given aspect ratio.
 */
export function calculateDefaultCrop(
  imageWidth: number,
  imageHeight: number,
  aspectRatio: CropAspectRatio = 'free'
): CropRect {
  if (!imageWidth || !imageHeight) {
    return { x: 0, y: 0, width: 100, height: 100 };
  }

  if (aspectRatio === 'free' || aspectRatio === 'custom') {
    const width = Math.max(1, Math.round(imageWidth * 0.85));
    const height = Math.max(1, Math.round(imageHeight * 0.85));
    const x = Math.max(0, Math.round((imageWidth - width) / 2));
    const y = Math.max(0, Math.round((imageHeight - height) / 2));
    return { x, y, width, height };
  }

  let targetRatio = 1;
  if (aspectRatio === '1:1') targetRatio = 1;
  else if (aspectRatio === '4:3') targetRatio = 4 / 3;
  else if (aspectRatio === '16:9') targetRatio = 16 / 9;
  else if (aspectRatio === '9:16') targetRatio = 9 / 16;

  let width: number;
  let height: number;

  if (imageWidth / imageHeight > targetRatio) {
    // Image is wider than target ratio
    height = Math.max(1, Math.round(imageHeight * 0.85));
    width = Math.max(1, Math.round(height * targetRatio));
  } else {
    // Image is taller than target ratio
    width = Math.max(1, Math.round(imageWidth * 0.85));
    height = Math.max(1, Math.round(width / targetRatio));
  }

  // Bound check
  if (width > imageWidth) {
    width = imageWidth;
    height = Math.max(1, Math.round(width / targetRatio));
  }
  if (height > imageHeight) {
    height = imageHeight;
    width = Math.max(1, Math.round(height * targetRatio));
  }

  const x = Math.max(0, Math.round((imageWidth - width) / 2));
  const y = Math.max(0, Math.round((imageHeight - height) / 2));

  return { x, y, width, height };
}

/**
 * Validates and safely clamps a crop rectangle to ensure it is strictly within
 * the natural image bounds without floating-point rounding errors or zero-size crashes.
 */
export function sanitizeCropRect(
  crop: CropRect,
  imageWidth: number,
  imageHeight: number
): { valid: boolean; rect: CropRect; error?: string } {
  if (!crop || typeof crop.width !== 'number' || typeof crop.height !== 'number') {
    return {
      valid: false,
      rect: { x: 0, y: 0, width: imageWidth, height: imageHeight },
      error: 'Invalid crop dimensions provided.',
    };
  }

  // Ensure non-negative and positive minimum dimensions
  const roundedX = Math.max(0, Math.min(imageWidth - 1, Math.round(crop.x)));
  const roundedY = Math.max(0, Math.min(imageHeight - 1, Math.round(crop.y)));

  const maxWidth = Math.max(1, imageWidth - roundedX);
  const maxHeight = Math.max(1, imageHeight - roundedY);

  const roundedWidth = Math.max(1, Math.min(maxWidth, Math.round(crop.width)));
  const roundedHeight = Math.max(1, Math.min(maxHeight, Math.round(crop.height)));

  if (roundedWidth <= 0 || roundedHeight <= 0) {
    return {
      valid: false,
      rect: { x: roundedX, y: roundedY, width: 1, height: 1 },
      error: 'Crop selection must be at least 1 pixel in width and height.',
    };
  }

  return {
    valid: true,
    rect: {
      x: roundedX,
      y: roundedY,
      width: roundedWidth,
      height: roundedHeight,
    },
  };
}

/**
 * Generates a clean, platform-safe output filename for a cropped image.
 * E.g., 'photo.jpg' -> 'photo-cropped.jpg' or 'profile.png' -> 'profile-cropped.webp'
 */
export function generateCroppedFilename(
  originalName: string,
  targetMime: SupportedImageMime
): string {
  // Strip existing extension
  const baseName = originalName.replace(/\.[^/.]+$/, '');

  // Sanitize characters allowing alphanumeric, Arabic Unicode range, dashes, underscores
  const cleanBase = baseName
    .replace(/[^a-zA-Z0-9_\-\u0600-\u06FF]/g, '_')
    .slice(0, 70);

  const extension = MIME_TO_EXT[targetMime] || '.jpg';
  return `${cleanBase || 'image'}-cropped${extension}`;
}

/**
 * Revokes object URL created for a CropResult to prevent browser memory leaks.
 */
export function revokeCropResult(result: CropResult | null): void {
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
            reject(new Error('Browser canvas failed to export cropped image data.'));
          }
        },
        type,
        quality
      );
    } catch (err) {
      reject(err instanceof Error ? err : new Error('Canvas export failed during crop.'));
    }
  });
}

/**
 * Calculates a descriptive aspect ratio string from dimensions.
 */
export function getAspectRatioLabel(width: number, height: number): string {
  if (!width || !height) return 'Free';
  const ratio = width / height;

  if (Math.abs(ratio - 1) < 0.02) return '1:1 (Square)';
  if (Math.abs(ratio - 4 / 3) < 0.02) return '4:3 (Standard)';
  if (Math.abs(ratio - 3 / 4) < 0.02) return '3:4 (Portrait)';
  if (Math.abs(ratio - 16 / 9) < 0.02) return '16:9 (Widescreen)';
  if (Math.abs(ratio - 9 / 16) < 0.02) return '9:16 (Story / Reel)';

  return `${ratio.toFixed(2)}:1`;
}

/**
 * Core client-side crop engine.
 * Executes 100% inside the user's browser memory using HTML5 Canvas & Web APIs.
 */
export async function cropImage(
  file: File,
  options: CropOptions,
  onProgress?: (stage: CropStage, detail?: string) => void
): Promise<CropResult> {
  // Step 1: Validate input file
  const fileValidation = validateImageFile(file);
  if (!fileValidation.valid) {
    throw new Error(fileValidation.error || 'Invalid image file.');
  }

  const originalMime = (file.type || 'image/jpeg') as SupportedImageMime;
  const targetMime: SupportedImageMime = options.format || originalMime;
  const rotation = (options.rotation || 0) % 360;

  onProgress?.('preparing', 'Reading image in browser memory...');

  // Step 2: Decode image safely
  let source: ImageBitmap | HTMLImageElement;
  let sourceWidth = 0;
  let sourceHeight = 0;
  let cleanupSource: () => void = () => {};

  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      source = bitmap;
      sourceWidth = bitmap.width;
      sourceHeight = bitmap.height;
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
      sourceWidth = img.naturalWidth || img.width;
      sourceHeight = img.naturalHeight || img.height;
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
    sourceWidth = img.naturalWidth || img.width;
    sourceHeight = img.naturalHeight || img.height;
    cleanupSource = () => {
      URL.revokeObjectURL(objectUrl);
    };
  }

  if (!sourceWidth || !sourceHeight) {
    cleanupSource();
    throw new Error('Could not determine image dimensions.');
  }

  // Safety check for extreme resolutions (>64 megapixels)
  const totalPixels = sourceWidth * sourceHeight;
  if (totalPixels > 64 * 1000 * 1000) {
    cleanupSource();
    throw new Error(`Image resolution (${Math.round(totalPixels / 1000000)} MP) exceeds safe in-browser limits. Please downscale first.`);
  }

  // Handle optional rotation if applied to the source before cropping
  let processedSource: CanvasImageSource = source;
  let currentWidth = sourceWidth;
  let currentHeight = sourceHeight;
  let rotationCanvas: HTMLCanvasElement | null = null;

  if (rotation !== 0) {
    rotationCanvas = document.createElement('canvas');
    if (rotation === 90 || rotation === 270) {
      rotationCanvas.width = sourceHeight;
      rotationCanvas.height = sourceWidth;
      currentWidth = sourceHeight;
      currentHeight = sourceWidth;
    } else {
      rotationCanvas.width = sourceWidth;
      rotationCanvas.height = sourceHeight;
    }

    const rCtx = rotationCanvas.getContext('2d');
    if (!rCtx) {
      cleanupSource();
      throw new Error('Failed to initialize canvas for image rotation.');
    }

    rCtx.translate(rotationCanvas.width / 2, rotationCanvas.height / 2);
    rCtx.rotate((rotation * Math.PI) / 180);
    rCtx.drawImage(source, -sourceWidth / 2, -sourceHeight / 2);
    processedSource = rotationCanvas;
  }

  // Step 3: Validate and clamp crop coordinates against current orientation
  const { valid, rect: safeCrop, error } = sanitizeCropRect(
    options.crop,
    currentWidth,
    currentHeight
  );

  if (!valid) {
    cleanupSource();
    throw new Error(error || 'Invalid crop coordinates.');
  }

  onProgress?.('cropping', `Cropping ${safeCrop.width} × ${safeCrop.height} px region...`);

  // Step 4: Create destination Canvas with exact crop dimensions
  const canvas = document.createElement('canvas');
  canvas.width = safeCrop.width;
  canvas.height = safeCrop.height;

  const requiresOpaqueBackground = targetMime === 'image/jpeg';
  const ctx = canvas.getContext('2d', {
    alpha: !requiresOpaqueBackground,
  });

  if (!ctx) {
    cleanupSource();
    throw new Error('Failed to initialize 2D canvas context for crop export.');
  }

  // If exporting to JPEG and background color is provided / needed for alpha
  const bgColor = options.backgroundColor || '#ffffff';
  let note: string | undefined = undefined;

  if (requiresOpaqueBackground) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, safeCrop.width, safeCrop.height);

    if (originalMime === 'image/png' || originalMime === 'image/webp') {
      note = 'JPEG does not support transparency. Transparent areas are rendered with a white background.';
    }
  }

  // Draw slice with high smoothing quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    processedSource,
    safeCrop.x,
    safeCrop.y,
    safeCrop.width,
    safeCrop.height,
    0,
    0,
    safeCrop.width,
    safeCrop.height
  );

  // Clean up source references immediately
  cleanupSource();
  if (rotationCanvas) {
    rotationCanvas.width = 1;
    rotationCanvas.height = 1;
  }

  onProgress?.('encoding', `Encoding output as ${targetMime.replace('image/', '').toUpperCase()}...`);

  // Step 5: Encode output
  let finalBlob: Blob;
  let finalQuality: number | undefined = undefined;

  if (targetMime === 'image/png') {
    finalBlob = await canvasToBlob(canvas, 'image/png');
    finalQuality = 1.0;
    if (!note) {
      note = 'Lossless PNG crop preserves 100% pixel sharpness and alpha transparency.';
    }
  } else {
    const rawQuality = options.quality !== undefined ? options.quality : 90;
    const q = Math.max(0.05, Math.min(1.0, rawQuality / 100));
    finalQuality = q;
    finalBlob = await canvasToBlob(canvas, targetMime, q);
  }

  onProgress?.('complete', 'Image cropped successfully!');

  // Step 6: Construct result metadata
  const originalSize = file.size;
  const outputSize = finalBlob.size;
  const sizeDiff = originalSize - outputSize;
  const savedBytes = Math.max(0, sizeDiff);
  const savedPercentage = originalSize > 0 && outputSize < originalSize
    ? Math.round((savedBytes / originalSize) * 100)
    : 0;

  const downloadUrl = URL.createObjectURL(finalBlob);
  const outputName = generateCroppedFilename(file.name, targetMime);
  const dimensions: ImageDimensions = {
    width: safeCrop.width,
    height: safeCrop.height,
  };
  const originalDimensions: ImageDimensions = {
    width: sourceWidth,
    height: sourceHeight,
  };

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
    originalDimensions,
    cropRect: safeCrop,
    aspectRatioUsed: getAspectRatioLabel(safeCrop.width, safeCrop.height),
    qualityUsed: finalQuality,
    rotationUsed: rotation,
    note,
  };
}
