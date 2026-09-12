import {
  CompressOptions,
  CompressionResult,
  CompressionStage,
  LoadedImageMeta,
  SupportedImageMime,
} from './types';

/**
 * Validates that an image file is supported and within safe browser limits.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const supportedTypes: SupportedImageMime[] = ['image/jpeg', 'image/png', 'image/webp'];

  if (!supportedTypes.includes(file.type as SupportedImageMime)) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a JPG, PNG, or WebP image.',
    };
  }

  // Maximum safe size: 50MB to prevent browser RAM exhaustion
  const maxBytes = 50 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: 'File size exceeds 50MB. Please choose a smaller image.',
    };
  }

  return { valid: true };
}

/**
 * Loads image metadata and dimensions without rendering to full canvas.
 */
export async function extractImageMeta(file: File): Promise<LoadedImageMeta> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image file.');
  }

  const previewUrl = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      if (!width || !height) {
        URL.revokeObjectURL(previewUrl);
        reject(new Error('Failed to read image dimensions.'));
        return;
      }

      resolve({
        file,
        name: file.name,
        sizeBytes: file.size,
        type: file.type as SupportedImageMime,
        previewUrl,
        dimensions: { width, height },
        aspectRatio: width / height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error('Failed to decode image file. File may be corrupted.'));
    };

    img.src = previewUrl;
  });
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
            reject(new Error('Browser canvas failed to generate image data.'));
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
 * Sanitizes base filename and appends `-compressed` with appropriate extension.
 */
export function generateCompressedFilename(originalName: string, outputMime: SupportedImageMime): string {
  const cleanBase = originalName
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_\-\u0600-\u06FF]/g, '_')
    .slice(0, 80);

  const extMap: Record<SupportedImageMime, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  };

  const extension = extMap[outputMime] || '.jpg';
  return `${cleanBase}-compressed${extension}`;
}

/**
 * Revokes object URL generated for a compression result to prevent browser memory leaks.
 */
export function revokeCompressionResult(result: CompressionResult | null): void {
  if (result && result.downloadUrl) {
    try {
      URL.revokeObjectURL(result.downloadUrl);
    } catch {
      // Ignore if already revoked
    }
  }
}

/**
 * Core client-side compression engine.
 * Executes 100% inside the browser using HTMLCanvasElement / createImageBitmap.
 */
export async function compressImage(
  file: File,
  options: CompressOptions,
  onProgress?: (stage: CompressionStage, detail?: string) => void
): Promise<CompressionResult> {
  // Step 1: Validate
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image file.');
  }

  const originalMime = file.type as SupportedImageMime;
  const targetMime: SupportedImageMime = options.format || originalMime;

  onProgress?.('decoding', 'Decoding image in browser memory...');

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
      // Fallback to HTMLImageElement if createImageBitmap fails on specific color profiles
      const objectUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Failed to decode image.'));
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
      el.onerror = () => reject(new Error('Failed to decode image.'));
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

  // Safety check for extreme canvas dimensions
  const MAX_CANVAS_DIMENSION = 16384;
  if (width > MAX_CANVAS_DIMENSION || height > MAX_CANVAS_DIMENSION) {
    cleanupSource();
    throw new Error(
      `Image dimensions (${width}x${height}) exceed maximum browser canvas limits (${MAX_CANVAS_DIMENSION}px).`
    );
  }

  // Step 3: Draw onto off-DOM Canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', {
    alpha: targetMime !== 'image/jpeg',
  });

  if (!ctx) {
    cleanupSource();
    throw new Error('Failed to initialize 2D canvas context.');
  }

  // If exporting to JPEG and source has alpha, fill white background to avoid black background artifacts
  if (targetMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, width, height);

  // Free source bitmap/element immediately after painting onto canvas
  cleanupSource();

  let finalBlob: Blob;
  let finalQuality = options.quality / 100;
  let targetAchieved: boolean | undefined = undefined;
  let iterationsCount = 1;
  let note: string | undefined = undefined;

  // Step 4: Handle Compression Modes
  if (options.mode === 'quality') {
    onProgress?.('compressing', `Encoding ${targetMime.replace('image/', '').toUpperCase()} at ${options.quality}% quality...`);

    const q = Math.max(0.05, Math.min(1.0, options.quality / 100));
    finalQuality = q;

    if (targetMime === 'image/png') {
      // PNG is lossless in browser canvas
      finalBlob = await canvasToBlob(canvas, 'image/png');
      note = 'PNG format uses lossless compression. Quality slider does not alter lossless PNG encoding.';
    } else {
      finalBlob = await canvasToBlob(canvas, targetMime, q);
    }
  } else {
    // Target-Size Mode
    const targetBytes = options.targetSizeBytes || 100 * 1024;
    onProgress?.('compressing', 'Calculating optimal compression ratio...');

    if (targetMime === 'image/png') {
      // Browser canvas PNG export is strictly lossless
      finalBlob = await canvasToBlob(canvas, 'image/png');
      finalQuality = 1.0;
      targetAchieved = finalBlob.size <= targetBytes;
      if (!targetAchieved) {
        note = `Browser native PNG is lossless and produced ${Math.round(finalBlob.size / 1024)} KB. To reach ${Math.round(targetBytes / 1024)} KB, consider converting to WebP or JPG.`;
      }
    } else {
      // Binary search quality estimation for JPEG/WebP
      let low = 0.05;
      let high = 0.98;
      const MAX_ITERATIONS = 7;
      let bestCandidate: { blob: Blob; quality: number; diff: number } | null = null;
      let smallestCandidate: { blob: Blob; quality: number } | null = null;

      for (let i = 0; i < MAX_ITERATIONS; i++) {
        iterationsCount = i + 1;
        const currentQuality = (low + high) / 2;
        onProgress?.(
          'evaluating',
          `Testing iteration ${i + 1}/${MAX_ITERATIONS} (Quality: ${Math.round(currentQuality * 100)}%)...`
        );

        const currentBlob = await canvasToBlob(canvas, targetMime, currentQuality);

        if (!smallestCandidate || currentBlob.size < smallestCandidate.blob.size) {
          smallestCandidate = { blob: currentBlob, quality: currentQuality };
        }

        const sizeDiff = targetBytes - currentBlob.size;

        if (currentBlob.size <= targetBytes) {
          // Fits under target size. Save as candidate and test if we can get better visual quality
          if (!bestCandidate || sizeDiff < bestCandidate.diff) {
            bestCandidate = { blob: currentBlob, quality: currentQuality, diff: sizeDiff };
          }
          // If within 5% of target, good enough!
          if (sizeDiff <= targetBytes * 0.05) {
            break;
          }
          low = currentQuality + 0.02;
        } else {
          // Too large, decrease quality
          high = currentQuality - 0.02;
        }

        if (high <= low) {
          break;
        }
      }

      if (bestCandidate) {
        finalBlob = bestCandidate.blob;
        finalQuality = bestCandidate.quality;
        targetAchieved = true;
      } else if (smallestCandidate) {
        // Could not reach target even at lowest tested quality without reducing image dimensions
        finalBlob = smallestCandidate.blob;
        finalQuality = smallestCandidate.quality;
        targetAchieved = false;
        note = `Target size is approximate. The best achievable size without reducing image dimensions is ${Math.round(finalBlob.size / 1024)} KB.`;
      } else {
        // Fallback safety
        finalBlob = await canvasToBlob(canvas, targetMime, 0.5);
        finalQuality = 0.5;
        targetAchieved = false;
      }
    }
  }

  onProgress?.('finalizing', 'Preparing download and savings report...');

  // Step 5: Construct Final Result
  const originalSize = file.size;
  const compressedSize = finalBlob.size;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const savedPercentage =
    originalSize > 0 ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100)) : 0;

  const downloadUrl = URL.createObjectURL(finalBlob);
  const outputName = generateCompressedFilename(file.name, targetMime);

  onProgress?.('complete', 'Compression completed successfully!');

  return {
    blob: finalBlob,
    downloadUrl,
    outputName,
    originalSizeBytes: originalSize,
    outputSizeBytes: compressedSize,
    savedBytes,
    savedPercentage,
    dimensions: { width, height },
    format: targetMime,
    qualityUsed: finalQuality,
    targetSizeBytes: options.targetSizeBytes,
    targetAchieved,
    iterationsCount,
    note,
  };
}
