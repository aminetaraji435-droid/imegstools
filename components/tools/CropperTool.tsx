'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Crop as CropIcon,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  Maximize2,
  RotateCw,
  RefreshCw,
  Sliders,
  Smartphone,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Move,
  Minimize2,
  Scaling,
  ArrowRightLeft,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DropZone } from '@/components/ui/DropZone';
import { Slider } from '@/components/ui/Slider';
import { ResultCard } from '@/components/tools/ResultCard';
import {
  CropOptions,
  CropResult,
  CropStage,
  CropAspectRatio,
  CropRect,
  LoadedImageMeta,
  SupportedImageMime,
  RotationDegree,
} from '@/lib/image/types';
import {
  cropImage,
  revokeCropResult,
  calculateDefaultCrop,
  sanitizeCropRect,
} from '@/lib/image/crop';
import { formatBytes } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

type DragHandle = 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e' | null;

interface DragState {
  handle: DragHandle;
  startX: number;
  startY: number;
  initialCrop: CropRect;
}

const RATIO_VALUES: Record<CropAspectRatio, number | undefined> = {
  free: undefined,
  custom: undefined,
  '1:1': 1,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
  '9:16': 9 / 16,
};

export function CropperTool() {
  const { t, dir } = useApp();
  const isRTL = dir === 'rtl';

  // Upload & File State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<LoadedImageMeta | null>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Crop Configuration State
  const [aspectRatio, setAspectRatio] = useState<CropAspectRatio>('free');
  const [cropRect, setCropRect] = useState<CropRect>({ x: 0, y: 0, width: 100, height: 100 });
  const [rotation, setRotation] = useState<RotationDegree>(0);
  const [outputFormat, setOutputFormat] = useState<SupportedImageMime | 'original'>('original');
  const [quality, setQuality] = useState<number>(90);

  // Interactive Container & Canvas State
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageDisplayRef = useRef<HTMLImageElement | null>(null);
  const [displayedSize, setDisplayedSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isDraggingMove, setIsDraggingMove] = useState(false);
  const dragStateRef = useRef<DragState | null>(null);

  // Execution State
  const [isCropping, setIsCropping] = useState(false);
  const [cropStage, setCropStage] = useState<CropStage>('idle');
  const [stageDetail, setStageDetail] = useState<string>('');
  const [result, setResult] = useState<CropResult | null>(null);

  // Memory References for cleanup
  const activePreviewUrlRef = useRef<string | null>(null);
  const activeResultRef = useRef<CropResult | null>(null);

  useEffect(() => {
    activeResultRef.current = result;
  }, [result]);

  useEffect(() => {
    return () => {
      if (activePreviewUrlRef.current) {
        URL.revokeObjectURL(activePreviewUrlRef.current);
      }
      if (activeResultRef.current) {
        revokeCropResult(activeResultRef.current);
      }
    };
  }, []);

  /**
   * Determine effective dimensions considering rotation.
   */
  const getRotatedDimensions = useCallback((width: number, height: number, rot: RotationDegree) => {
    if (rot === 90 || rot === 270) {
      return { width: height, height: width };
    }
    return { width, height };
  }, []);

  /**
   * Update displayed container dimensions to scale crop coordinates accurately.
   */
  const updateDisplayedDimensions = useCallback(() => {
    if (imageDisplayRef.current) {
      const rect = imageDisplayRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDisplayedSize({ width: rect.width, height: rect.height });
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateDisplayedDimensions);
    return () => window.removeEventListener('resize', updateDisplayedDimensions);
  }, [updateDisplayedDimensions]);

  /**
   * Initialize crop area when image metadata or aspect ratio changes.
   */
  const initializeCrop = useCallback(
    (metaWidth: number, metaHeight: number, rot: RotationDegree, ratio: CropAspectRatio) => {
      const { width, height } = getRotatedDimensions(metaWidth, metaHeight, rot);
      const initial = calculateDefaultCrop(width, height, ratio);
      setCropRect(initial);
    },
    [getRotatedDimensions]
  );

  /**
   * Handle File Selection and metadata loading.
   */
  const handleFileSelect = useCallback(
    async (file: File) => {
      setErrorMessage(null);
      setIsLoadingMeta(true);

      if (activePreviewUrlRef.current) {
        URL.revokeObjectURL(activePreviewUrlRef.current);
        activePreviewUrlRef.current = null;
      }
      if (activeResultRef.current) {
        revokeCropResult(activeResultRef.current);
        activeResultRef.current = null;
        setResult(null);
      }

      try {
        const previewUrl = URL.createObjectURL(file);
        activePreviewUrlRef.current = previewUrl;

        let width = 0;
        let height = 0;

        if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
          try {
            const bitmap = await createImageBitmap(file);
            width = bitmap.width;
            height = bitmap.height;
            bitmap.close();
          } catch {
            const img = await new Promise<HTMLImageElement>((resolve, reject) => {
              const el = new Image();
              el.onload = () => resolve(el);
              el.onerror = () => reject(new Error('Failed to load image for dimension extraction.'));
              el.src = previewUrl;
            });
            width = img.naturalWidth || img.width;
            height = img.naturalHeight || img.height;
          }
        } else {
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = () => reject(new Error('Failed to load image for dimension extraction.'));
            el.src = previewUrl;
          });
          width = img.naturalWidth || img.width;
          height = img.naturalHeight || img.height;
        }

        if (!width || !height) {
          throw new Error('Could not calculate image dimensions.');
        }

        let mimeType: SupportedImageMime = 'image/jpeg';
        if (file.type === 'image/png') mimeType = 'image/png';
        else if (file.type === 'image/webp') mimeType = 'image/webp';
        else if (file.type === 'image/jpeg' || file.type === 'image/jpg') mimeType = 'image/jpeg';

        const meta: LoadedImageMeta = {
          file,
          name: file.name,
          previewUrl,
          dimensions: { width, height },
          width,
          height,
          aspectRatio: width / height,
          type: mimeType,
          mimeType,
          sizeBytes: file.size,
        };

        setImageMeta(meta);
        setSelectedFile(file);
        setRotation(0);
        initializeCrop(width, height, 0, aspectRatio);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to read image file.';
        setErrorMessage(message);
      } finally {
        setIsLoadingMeta(false);
      }
    },
    [aspectRatio, initializeCrop]
  );

  /**
   * Change aspect ratio and re-center crop box.
   */
  const handleRatioChange = useCallback(
    (newRatio: CropAspectRatio) => {
      setAspectRatio(newRatio);
      if (imageMeta) {
        initializeCrop(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation, newRatio);
      }
    },
    [imageMeta, rotation, initializeCrop]
  );

  /**
   * Rotate image 90 degrees clockwise.
   */
  const handleRotate = useCallback(() => {
    if (!imageMeta) return;
    const nextRotation = ((rotation + 90) % 360) as RotationDegree;
    setRotation(nextRotation);
    initializeCrop(imageMeta.dimensions.width, imageMeta.dimensions.height, nextRotation, aspectRatio);
  }, [imageMeta, rotation, aspectRatio, initializeCrop]);

  /**
   * Reset rotation to 0 degrees.
   */
  const handleResetRotation = useCallback(() => {
    if (!imageMeta) return;
    setRotation(0);
    initializeCrop(imageMeta.dimensions.width, imageMeta.dimensions.height, 0, aspectRatio);
  }, [imageMeta, aspectRatio, initializeCrop]);

  /**
   * Center crop box within current boundaries.
   */
  const handleCenterCrop = useCallback(() => {
    if (!imageMeta) return;
    const { width: curW, height: curH } = getRotatedDimensions(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation);
    const newX = Math.max(0, Math.round((curW - cropRect.width) / 2));
    const newY = Math.max(0, Math.round((curH - cropRect.height) / 2));
    setCropRect(prev => ({ ...prev, x: newX, y: newY }));
  }, [imageMeta, rotation, cropRect.width, cropRect.height, getRotatedDimensions]);

  /**
   * Maximize crop box to fit whole image.
   */
  const handleFitImage = useCallback(() => {
    if (!imageMeta) return;
    const { width: curW, height: curH } = getRotatedDimensions(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation);
    if (aspectRatio === 'free') {
      setCropRect({ x: 0, y: 0, width: curW, height: curH });
    } else {
      initializeCrop(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation, aspectRatio);
    }
  }, [imageMeta, rotation, aspectRatio, getRotatedDimensions, initializeCrop]);

  /**
   * Drag and Resize interaction math.
   */
  const handlePointerDown = (handle: DragHandle, clientX: number, clientY: number) => {
    if (!imageMeta || displayedSize.width === 0 || displayedSize.height === 0) return;
    if (handle === 'move') {
      setIsDraggingMove(true);
    }
    dragStateRef.current = {
      handle,
      startX: clientX,
      startY: clientY,
      initialCrop: { ...cropRect },
    };
  };

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragStateRef.current || !imageMeta || displayedSize.width === 0 || displayedSize.height === 0) return;

      const { handle, startX, startY, initialCrop } = dragStateRef.current;
      if (!handle) return;
      const { width: curW, height: curH } = getRotatedDimensions(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation);

      // Scale factor from displayed screen pixels to actual image pixels
      const scaleX = curW / displayedSize.width;
      const scaleY = curH / displayedSize.height;

      const deltaX = (clientX - startX) * scaleX;
      const deltaY = (clientY - startY) * scaleY;

      let nextCrop = { ...initialCrop };
      const targetRatio = RATIO_VALUES[aspectRatio];

      if (handle === 'move') {
        let nextX = initialCrop.x + deltaX;
        let nextY = initialCrop.y + deltaY;

        // Clamp to image edges
        nextX = Math.max(0, Math.min(curW - initialCrop.width, nextX));
        nextY = Math.max(0, Math.min(curH - initialCrop.height, nextY));

        nextCrop = {
          x: Math.round(nextX),
          y: Math.round(nextY),
          width: initialCrop.width,
          height: initialCrop.height,
        };
      } else {
        const minSize = 20;

        if (targetRatio !== undefined) {
          // Locked aspect ratio resizing
          if (handle === 'se' || handle === 'e' || handle === 's') {
            let newWidth = Math.max(minSize, Math.min(curW - initialCrop.x, initialCrop.width + deltaX));
            let newHeight = newWidth / targetRatio;

            if (initialCrop.y + newHeight > curH) {
              newHeight = curH - initialCrop.y;
              newWidth = newHeight * targetRatio;
            }

            nextCrop = {
              x: initialCrop.x,
              y: initialCrop.y,
              width: Math.round(newWidth),
              height: Math.round(newHeight),
            };
          } else if (handle === 'nw' || handle === 'w' || handle === 'n') {
            let newWidth = Math.max(minSize, Math.min(initialCrop.x + initialCrop.width, initialCrop.width - deltaX));
            let newHeight = newWidth / targetRatio;
            let newX = initialCrop.x + (initialCrop.width - newWidth);
            let newY = initialCrop.y + (initialCrop.height - newHeight);

            if (newX < 0) {
              newX = 0;
              newWidth = initialCrop.x + initialCrop.width;
              newHeight = newWidth / targetRatio;
              newY = initialCrop.y + (initialCrop.height - newHeight);
            }
            if (newY < 0) {
              newY = 0;
              newHeight = initialCrop.y + initialCrop.height;
              newWidth = newHeight * targetRatio;
              newX = initialCrop.x + (initialCrop.width - newWidth);
            }

            nextCrop = {
              x: Math.max(0, Math.round(newX)),
              y: Math.max(0, Math.round(newY)),
              width: Math.round(newWidth),
              height: Math.round(newHeight),
            };
          } else if (handle === 'ne') {
            let newWidth = Math.max(minSize, Math.min(curW - initialCrop.x, initialCrop.width + deltaX));
            let newHeight = newWidth / targetRatio;
            let newY = initialCrop.y + (initialCrop.height - newHeight);

            if (newY < 0) {
              newY = 0;
              newHeight = initialCrop.y + initialCrop.height;
              newWidth = newHeight * targetRatio;
            }

            nextCrop = {
              x: initialCrop.x,
              y: Math.max(0, Math.round(newY)),
              width: Math.round(newWidth),
              height: Math.round(newHeight),
            };
          } else if (handle === 'sw') {
            let newWidth = Math.max(minSize, Math.min(initialCrop.x + initialCrop.width, initialCrop.width - deltaX));
            let newHeight = newWidth / targetRatio;
            let newX = initialCrop.x + (initialCrop.width - newWidth);

            if (initialCrop.y + newHeight > curH) {
              newHeight = curH - initialCrop.y;
              newWidth = newHeight * targetRatio;
              newX = initialCrop.x + (initialCrop.width - newWidth);
            }

            nextCrop = {
              x: Math.max(0, Math.round(newX)),
              y: initialCrop.y,
              width: Math.round(newWidth),
              height: Math.round(newHeight),
            };
          }
        } else {
          // Free unconstrained resizing
          let newX = initialCrop.x;
          let newY = initialCrop.y;
          let newWidth = initialCrop.width;
          let newHeight = initialCrop.height;

          if (handle.includes('e')) {
            newWidth = Math.max(minSize, Math.min(curW - initialCrop.x, initialCrop.width + deltaX));
          }
          if (handle.includes('s')) {
            newHeight = Math.max(minSize, Math.min(curH - initialCrop.y, initialCrop.height + deltaY));
          }
          if (handle.includes('w')) {
            const proposedWidth = initialCrop.width - deltaX;
            if (proposedWidth >= minSize) {
              newX = Math.max(0, initialCrop.x + deltaX);
              newWidth = initialCrop.x + initialCrop.width - newX;
            }
          }
          if (handle.includes('n')) {
            const proposedHeight = initialCrop.height - deltaY;
            if (proposedHeight >= minSize) {
              newY = Math.max(0, initialCrop.y + deltaY);
              newHeight = initialCrop.y + initialCrop.height - newY;
            }
          }

          nextCrop = {
            x: Math.round(newX),
            y: Math.round(newY),
            width: Math.round(newWidth),
            height: Math.round(newHeight),
          };
        }
      }

      const sanitized = sanitizeCropRect(nextCrop, curW, curH);
      setCropRect(sanitized.rect);
    },
    [imageMeta, displayedSize, rotation, aspectRatio, getRotatedDimensions]
  );

  const handlePointerUp = useCallback(() => {
    dragStateRef.current = null;
    setIsDraggingMove(false);
  }, []);

  // Window-level mouse & touch listeners when dragging
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragStateRef.current) {
        e.preventDefault();
        handlePointerMove(e.clientX, e.clientY);
      }
    };
    const onMouseUp = () => {
      if (dragStateRef.current) {
        handlePointerUp();
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragStateRef.current && e.touches.length > 0) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      if (dragStateRef.current) {
        handlePointerUp();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  /**
   * Execute Image Cropping via pure client-side Canvas.
   */
  const handleCrop = async () => {
    if (!selectedFile || !imageMeta) return;

    setIsCropping(true);
    setErrorMessage(null);
    setCropStage('preparing');
    setStageDetail(t.cropper.stagePreparing);

    try {
      const options: CropOptions = {
        crop: cropRect,
        aspectRatio,
        rotation,
        format: outputFormat === 'original' ? undefined : outputFormat,
        quality: quality,
      };

      const cropResult = await cropImage(selectedFile, options, (stage, detail) => {
        setCropStage(stage);
        if (stage === 'preparing') setStageDetail(t.cropper.stagePreparing);
        else if (stage === 'cropping') setStageDetail(t.cropper.stageCropping);
        else if (stage === 'encoding') setStageDetail(t.cropper.stageEncoding);
        else if (stage === 'complete') setStageDetail(t.cropper.stageComplete);
        else if (detail) setStageDetail(detail);
      });
      setResult(cropResult);
      setCropStage('complete');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during image cropping.';
      setErrorMessage(message);
      setCropStage('error');
    } finally {
      setIsCropping(false);
    }
  };

  /**
   * Reset / Crop another image.
   */
  const handleReset = () => {
    if (activePreviewUrlRef.current) {
      URL.revokeObjectURL(activePreviewUrlRef.current);
      activePreviewUrlRef.current = null;
    }
    if (activeResultRef.current) {
      revokeCropResult(activeResultRef.current);
      activeResultRef.current = null;
    }
    setSelectedFile(null);
    setImageMeta(null);
    setResult(null);
    setErrorMessage(null);
    setCropStage('idle');
    setRotation(0);
    setAspectRatio('free');
  };

  // Calculate percentage coordinates for SVG crop overlay
  const rotatedDims = imageMeta
    ? getRotatedDimensions(imageMeta.dimensions.width, imageMeta.dimensions.height, rotation)
    : { width: 100, height: 100 };

  const cropPercent = {
    left: (cropRect.x / rotatedDims.width) * 100,
    top: (cropRect.y / rotatedDims.height) * 100,
    width: (cropRect.width / rotatedDims.width) * 100,
    height: (cropRect.height / rotatedDims.height) * 100,
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* Tool Header */}
      <div className="text-center space-y-3">
        <Badge variant="subtle" size="md" icon={<CropIcon className="w-4 h-4" />}>
          {t.cropper.badge}
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.cropper.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.cropper.subtitle}
        </p>
      </div>

      {/* Main Workspace */}
      <div className="space-y-8">
        {!selectedFile ? (
          /* DropZone State */
          <Card className="border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs">
            <CardContent className="p-6 sm:p-10">
              <DropZone
                onFileSelect={handleFileSelect}
                isLoading={isLoadingMeta}
                acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                maxSizeBytes={30 * 1024 * 1024}
              />
              <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.cropper.privacyNotice}</span>
              </div>
            </CardContent>
          </Card>
        ) : result ? (
          /* Result View */
          <div className="space-y-6">
            <ResultCard
              result={result}
              toolType="crop"
              originalName={selectedFile?.name || 'image'}
              originalPreviewUrl={imageMeta?.previewUrl}
              onReset={handleReset}
            />
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setResult(null)}
                startIcon={<CropIcon className="w-4 h-4" />}
              >
                {isRTL ? 'تعديل منطقة القص الحالية' : 'Adjust Crop Selection'}
              </Button>
            </div>
          </div>
        ) : (
          /* Interactive Crop Workspace */
          <div className="space-y-6">
            {/* Top Toolbar: Aspect Ratio Selector & Rotation Controls */}
            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4 sm:p-5 space-y-4">
                {/* Aspect Ratio Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t.cropper.aspectRatioTitle}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {cropRect.width} × {cropRect.height} px
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {/* Free */}
                    <button
                      type="button"
                      onClick={() => handleRatioChange('free')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        aspectRatio === 'free'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Maximize2 className="w-4 h-4 mb-1" />
                      <span>{t.cropper.aspectRatioFree}</span>
                    </button>

                    {/* 1:1 Square */}
                    <button
                      type="button"
                      onClick={() => handleRatioChange('1:1')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        aspectRatio === '1:1'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Square className="w-4 h-4 mb-1" />
                      <span>{t.cropper.aspectRatioSquare}</span>
                    </button>

                    {/* 4:3 Standard */}
                    <button
                      type="button"
                      onClick={() => handleRatioChange('4:3')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        aspectRatio === '4:3'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <RectangleHorizontal className="w-4 h-4 mb-1" />
                      <span>{t.cropper.aspectRatio43}</span>
                    </button>

                    {/* 16:9 Widescreen */}
                    <button
                      type="button"
                      onClick={() => handleRatioChange('16:9')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        aspectRatio === '16:9'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <RectangleHorizontal className="w-4 h-4 mb-1" />
                      <span>{t.cropper.aspectRatio169}</span>
                    </button>

                    {/* 9:16 Vertical Story */}
                    <button
                      type="button"
                      onClick={() => handleRatioChange('9:16')}
                      className={`col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        aspectRatio === '9:16'
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mb-1" />
                      <span>{t.cropper.aspectRatio916}</span>
                    </button>
                  </div>
                </div>

                {/* Secondary Actions: Rotation, Center, Fit */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRotate}
                      startIcon={<RotateCw className="w-3.5 h-3.5" />}
                    >
                      {t.cropper.rotate90}
                    </Button>
                    {rotation !== 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetRotation}
                        startIcon={<RefreshCw className="w-3 h-3" />}
                      >
                        {t.cropper.rotateReset} ({rotation}°)
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCenterCrop}
                      startIcon={<Move className="w-3.5 h-3.5" />}
                    >
                      {t.cropper.centerCropBtn}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFitImage}
                      startIcon={<Maximize2 className="w-3.5 h-3.5" />}
                    >
                      {t.cropper.fitImageBtn}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Crop Stage & Canvas */}
            <Card className="bg-slate-950 border border-slate-800 overflow-hidden relative shadow-lg">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[480px]">
                <div
                  ref={containerRef}
                  className="relative select-none max-w-full max-h-[70vh] flex items-center justify-center touch-none overflow-hidden rounded-lg shadow-inner"
                  style={{
                    cursor: isDraggingMove ? 'grabbing' : 'default',
                  }}
                >
                  {/* Base Image Display */}
                  {imageMeta?.previewUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      ref={imageDisplayRef}
                      src={imageMeta.previewUrl}
                      alt="Crop target"
                      onLoad={updateDisplayedDimensions}
                      className="max-w-full max-h-[65vh] object-contain rounded-md block transition-transform duration-200 pointer-events-none"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                      }}
                    />
                  )}

                  {/* Darkened Mask Overlays (Outside Crop Box) */}
                  {displayedSize.width > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Top Mask */}
                      <div
                        className="absolute bg-black/60 left-0 top-0 right-0"
                        style={{ height: `${cropPercent.top}%` }}
                      />
                      {/* Bottom Mask */}
                      <div
                        className="absolute bg-black/60 left-0 right-0 bottom-0"
                        style={{ height: `${100 - (cropPercent.top + cropPercent.height)}%` }}
                      />
                      {/* Left Mask */}
                      <div
                        className="absolute bg-black/60 left-0"
                        style={{
                          top: `${cropPercent.top}%`,
                          height: `${cropPercent.height}%`,
                          width: `${cropPercent.left}%`,
                        }}
                      />
                      {/* Right Mask */}
                      <div
                        className="absolute bg-black/60 right-0"
                        style={{
                          top: `${cropPercent.top}%`,
                          height: `${cropPercent.height}%`,
                          width: `${100 - (cropPercent.left + cropPercent.width)}%`,
                        }}
                      />
                    </div>
                  )}

                  {/* Interactive Crop Box Overlay */}
                  {displayedSize.width > 0 && (
                    <div
                      className="absolute border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_0_20px_rgba(0,0,0,0.3)] touch-none cursor-move transition-shadow"
                      style={{
                        left: `${cropPercent.left}%`,
                        top: `${cropPercent.top}%`,
                        width: `${cropPercent.width}%`,
                        height: `${cropPercent.height}%`,
                      }}
                      onMouseDown={e => {
                        e.stopPropagation();
                        handlePointerDown('move', e.clientX, e.clientY);
                      }}
                      onTouchStart={e => {
                        e.stopPropagation();
                        if (e.touches.length > 0) {
                          handlePointerDown('move', e.touches[0].clientX, e.touches[0].clientY);
                        }
                      }}
                    >
                      {/* Rule-of-Thirds Grid Lines */}
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                        <div className="border-r border-b border-white/70" />
                        <div className="border-r border-b border-white/70" />
                        <div className="border-b border-white/70" />
                        <div className="border-r border-b border-white/70" />
                        <div className="border-r border-b border-white/70" />
                        <div className="border-b border-white/70" />
                        <div className="border-r border-white/70" />
                        <div className="border-r border-white/70" />
                        <div />
                      </div>

                      {/* Dimensions Tooltip */}
                      <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded shadow pointer-events-none">
                        {cropRect.width} × {cropRect.height} px
                      </div>

                      {/* Corner Drag Handles */}
                      {/* Top-Left (NW) */}
                      <div
                        className="absolute -top-2 -left-2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-xs shadow-md cursor-nwse-resize touch-none z-10"
                        onMouseDown={e => {
                          e.stopPropagation();
                          handlePointerDown('nw', e.clientX, e.clientY);
                        }}
                        onTouchStart={e => {
                          e.stopPropagation();
                          if (e.touches.length > 0) handlePointerDown('nw', e.touches[0].clientX, e.touches[0].clientY);
                        }}
                      />
                      {/* Top-Right (NE) */}
                      <div
                        className="absolute -top-2 -right-2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-xs shadow-md cursor-nesw-resize touch-none z-10"
                        onMouseDown={e => {
                          e.stopPropagation();
                          handlePointerDown('ne', e.clientX, e.clientY);
                        }}
                        onTouchStart={e => {
                          e.stopPropagation();
                          if (e.touches.length > 0) handlePointerDown('ne', e.touches[0].clientX, e.touches[0].clientY);
                        }}
                      />
                      {/* Bottom-Left (SW) */}
                      <div
                        className="absolute -bottom-2 -left-2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-xs shadow-md cursor-nesw-resize touch-none z-10"
                        onMouseDown={e => {
                          e.stopPropagation();
                          handlePointerDown('sw', e.clientX, e.clientY);
                        }}
                        onTouchStart={e => {
                          e.stopPropagation();
                          if (e.touches.length > 0) handlePointerDown('sw', e.touches[0].clientX, e.touches[0].clientY);
                        }}
                      />
                      {/* Bottom-Right (SE) */}
                      <div
                        className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-xs shadow-md cursor-nwse-resize touch-none z-10"
                        onMouseDown={e => {
                          e.stopPropagation();
                          handlePointerDown('se', e.clientX, e.clientY);
                        }}
                        onTouchStart={e => {
                          e.stopPropagation();
                          if (e.touches.length > 0) handlePointerDown('se', e.touches[0].clientX, e.touches[0].clientY);
                        }}
                      />

                      {/* Edge Drag Handles for Free Mode */}
                      {aspectRatio === 'free' && (
                        <>
                          {/* Top (N) */}
                          <div
                            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-white border border-indigo-600 rounded-xs cursor-ns-resize touch-none z-10"
                            onMouseDown={e => {
                              e.stopPropagation();
                              handlePointerDown('n', e.clientX, e.clientY);
                            }}
                            onTouchStart={e => {
                              e.stopPropagation();
                              if (e.touches.length > 0) handlePointerDown('n', e.touches[0].clientX, e.touches[0].clientY);
                            }}
                          />
                          {/* Bottom (S) */}
                          <div
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-3 bg-white border border-indigo-600 rounded-xs cursor-ns-resize touch-none z-10"
                            onMouseDown={e => {
                              e.stopPropagation();
                              handlePointerDown('s', e.clientX, e.clientY);
                            }}
                            onTouchStart={e => {
                              e.stopPropagation();
                              if (e.touches.length > 0) handlePointerDown('s', e.touches[0].clientX, e.touches[0].clientY);
                            }}
                          />
                          {/* Left (W) */}
                          <div
                            className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-6 bg-white border border-indigo-600 rounded-xs cursor-ew-resize touch-none z-10"
                            onMouseDown={e => {
                              e.stopPropagation();
                              handlePointerDown('w', e.clientX, e.clientY);
                            }}
                            onTouchStart={e => {
                              e.stopPropagation();
                              if (e.touches.length > 0) handlePointerDown('w', e.touches[0].clientX, e.touches[0].clientY);
                            }}
                          />
                          {/* Right (E) */}
                          <div
                            className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-6 bg-white border border-indigo-600 rounded-xs cursor-ew-resize touch-none z-10"
                            onMouseDown={e => {
                              e.stopPropagation();
                              handlePointerDown('e', e.clientX, e.clientY);
                            }}
                            onTouchStart={e => {
                              e.stopPropagation();
                              if (e.touches.length > 0) handlePointerDown('e', e.touches[0].clientX, e.touches[0].clientY);
                            }}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-xs text-slate-400 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5" />
                  <span>{t.cropper.cropBoxInfo}</span>
                </div>
              </CardContent>
            </Card>

            {/* Export & Quality Settings Card */}
            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.cropper.outputSettingsTitle}</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t.cropper.outputSettingsSubtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Format Selection Grid */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
                    {t.cropper.outputFormat}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Original Format */}
                    <button
                      type="button"
                      onClick={() => setOutputFormat('original')}
                      className={`p-3 rounded-xl border text-left rtl:text-right transition-all ${
                        outputFormat === 'original'
                          ? 'border-indigo-600 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {t.cropper.formatOriginal}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {(imageMeta?.type || imageMeta?.mimeType || 'image/jpeg').replace('image/', '').toUpperCase()}
                      </span>
                    </button>

                    {/* JPG */}
                    <button
                      type="button"
                      onClick={() => setOutputFormat('image/jpeg')}
                      className={`p-3 rounded-xl border text-left rtl:text-right transition-all ${
                        outputFormat === 'image/jpeg'
                          ? 'border-indigo-600 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {t.cropper.formatJpeg}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        .jpg / .jpeg
                      </span>
                    </button>

                    {/* PNG */}
                    <button
                      type="button"
                      onClick={() => setOutputFormat('image/png')}
                      className={`p-3 rounded-xl border text-left rtl:text-right transition-all ${
                        outputFormat === 'image/png'
                          ? 'border-indigo-600 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {t.cropper.formatPng}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        .png
                      </span>
                    </button>

                    {/* WebP */}
                    <button
                      type="button"
                      onClick={() => setOutputFormat('image/webp')}
                      className={`p-3 rounded-xl border text-left rtl:text-right transition-all ${
                        outputFormat === 'image/webp'
                          ? 'border-indigo-600 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {t.cropper.formatWebp}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        .webp
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quality Slider (for lossy formats) */}
                {outputFormat !== 'image/png' && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t.cropper.qualityLabel}
                      </label>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {quality}%
                      </span>
                    </div>
                    <Slider
                      value={quality}
                      onChange={setQuality}
                      min={10}
                      max={100}
                      step={1}
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.cropper.qualityHelper}
                    </p>
                  </div>
                )}

                {/* PNG Lossless Note */}
                {outputFormat === 'image/png' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{t.cropper.pngLosslessNote}</span>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-rose-700 dark:text-rose-300">
                      <span className="font-bold block mb-0.5">{t.common.error}</span>
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                {/* Crop Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
                    onClick={handleCrop}
                    isLoading={isCropping}
                    disabled={isCropping}
                    startIcon={<CropIcon className="w-5 h-5" />}
                  >
                    {isCropping ? t.cropper.croppingBtn : t.cropper.cropBtn}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleReset}
                    disabled={isCropping}
                    className="w-full sm:w-auto text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    {isRTL ? 'إلغاء واختيار صورة أخرى' : 'Cancel & Choose Another'}
                  </Button>
                </div>

                {/* Progress Status Message */}
                {isCropping && (
                  <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-2.5 text-xs text-indigo-700 dark:text-indigo-300 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{stageDetail || t.cropper.croppingBtn}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* SEO & Educational Sections: How It Works & Benefits */}
      <div className="space-y-12 pt-6">
        {/* How It Works */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.cropper.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t.cropper.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.step1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.step2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.step3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.cropper.whyChooseTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t.cropper.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.benefit1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.benefit1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.benefit2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.benefit2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cropper.benefit3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.cropper.benefit3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.cropper.faqTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t.cropper.faqSubtitle}
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {t.cropper.faqItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">Q.</span>
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5 rtl:pl-0 rtl:pr-5">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Companion Tools Links */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.cropper.relatedToolsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.cropper.relatedToolsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/compress-image"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all group shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Minimize2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {t.nav.compress}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.nav.compressDesc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/resize-image"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all group shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Scaling className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {t.nav.resize}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.nav.resizeDesc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/convert-image"
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all group shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {t.nav.convert}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.nav.convertDesc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
