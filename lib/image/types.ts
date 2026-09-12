export type SupportedImageMime = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface LoadedImageMeta {
  file: File;
  name: string;
  sizeBytes: number;
  type: SupportedImageMime;
  mimeType?: SupportedImageMime;
  previewUrl: string;
  dimensions: ImageDimensions;
  width?: number;
  height?: number;
  aspectRatio: number;
}

export interface CompressOptions {
  mode: 'quality' | 'target-size';
  quality: number; // 10 - 100
  targetSizeBytes?: number; // In bytes (e.g. 100 * 1024 for 100KB)
  format?: SupportedImageMime;
}

export type CompressionStage = 'idle' | 'decoding' | 'compressing' | 'evaluating' | 'finalizing' | 'complete' | 'error';

export interface CompressionResult extends TransformationResult {
  qualityUsed: number;
  targetSizeBytes?: number;
  targetAchieved?: boolean;
  iterationsCount?: number;
  note?: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality?: number;
  format?: SupportedImageMime;
}

export type ResizeStage = 'idle' | 'preparing' | 'resizing' | 'encoding' | 'complete' | 'error';

export interface ResizeResult extends TransformationResult {
  originalDimensions: ImageDimensions;
  outputDimensions: ImageDimensions;
  aspectRatioLocked: boolean;
  qualityUsed?: number;
  note?: string;
}

export interface ConvertOptions {
  targetFormat: SupportedImageMime;
  quality?: number; // 10 - 100 for JPEG & WebP
  backgroundColor?: string; // e.g. '#ffffff' when converting transparent PNG/WebP to JPEG
}

export type ConvertStage = 'idle' | 'preparing' | 'converting' | 'encoding' | 'complete' | 'error';

export interface ConvertResult extends TransformationResult {
  originalFormat: SupportedImageMime;
  outputFormat: SupportedImageMime;
  qualityUsed?: number;
  backgroundColorUsed?: string;
  isSameFormat?: boolean;
  isSizeReduced: boolean;
  isSizeIncreased: boolean;
  sizeChangePercentage: number;
  note?: string;
}

export type CropAspectRatio = 'free' | '1:1' | '4:3' | '16:9' | '9:16' | 'custom';

export type RotationDegree = 0 | 90 | 180 | 270;

export type CropStage = 'idle' | 'preparing' | 'cropping' | 'encoding' | 'complete' | 'error';

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropOptions {
  crop: CropRect;
  aspectRatio?: CropAspectRatio;
  format?: SupportedImageMime;
  quality?: number; // 10 - 100 for JPEG & WebP
  rotation?: RotationDegree | number; // 0, 90, 180, 270
  backgroundColor?: string;
}

export interface CropResult extends TransformationResult {
  originalDimensions: ImageDimensions;
  cropRect: CropRect;
  aspectRatioUsed: string;
  qualityUsed?: number;
  rotationUsed?: number;
  note?: string;
}

export interface TransformationResult {
  blob: Blob;
  downloadUrl: string;
  outputName: string;
  originalSizeBytes: number;
  outputSizeBytes: number;
  savedBytes: number;
  savedPercentage: number;
  dimensions: ImageDimensions;
  format: SupportedImageMime;
}
