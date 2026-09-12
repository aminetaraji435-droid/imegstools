'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Maximize2 as ResizeIcon,
  Minimize2,
  Crop,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Lock,
  Unlock,
  AlertTriangle,
  Sliders,
  FileCheck,
} from 'lucide-react';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { ResultCard } from '@/components/tools/ResultCard';
import { useApp } from '@/lib/context/AppContext';
import { formatBytes } from '@/lib/utils';
import { extractImageMeta } from '@/lib/image/compress';
import {
  resizeImage,
  revokeResizeResult,
  validateResizeDimensions,
  MIN_IMAGE_DIMENSION,
  MAX_CANVAS_DIMENSION,
} from '@/lib/image/resize';
import {
  LoadedImageMeta,
  ResizeResult,
  ResizeStage,
  ResizeOptions,
  SupportedImageMime,
} from '@/lib/image/types';

interface DimensionPreset {
  id: string;
  label: string;
  width: number;
  height: number;
  tag: string;
}

export function ResizerTool() {
  const { t, dir } = useApp();
  const isRTL = dir === 'rtl';

  // Core file state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<LoadedImageMeta | null>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);

  // Dimensions state
  const [widthInput, setWidthInput] = useState<string>('1920');
  const [heightInput, setHeightInput] = useState<string>('1080');
  const [aspectRatioLocked, setAspectRatioLocked] = useState<boolean>(true);
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number>(16 / 9);
  const [activePreset, setActivePreset] = useState<string>('custom');

  // Format & Quality state
  const [outputFormat, setOutputFormat] = useState<string>('original');
  const [quality, setQuality] = useState<number>(85);

  // Processing state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStage, setResizeStage] = useState<ResizeStage>('idle');
  const [stageDetail, setStageDetail] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Ref to scroll to result on completion
  const resultRef = useRef<HTMLDivElement>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (imageMeta?.previewUrl) {
        URL.revokeObjectURL(imageMeta.previewUrl);
      }
      revokeResizeResult(result);
    };
  }, [imageMeta, result]);

  // Dimension presets definition
  const presets: DimensionPreset[] = [
    {
      id: '1080x1080',
      label: t.resizer.presetSquare,
      width: 1080,
      height: 1080,
      tag: '1:1',
    },
    {
      id: '1920x1080',
      label: t.resizer.presetLandscapeFHD,
      width: 1920,
      height: 1080,
      tag: '16:9',
    },
    {
      id: '1280x720',
      label: t.resizer.presetLandscapeHD,
      width: 1280,
      height: 720,
      tag: '16:9',
    },
    {
      id: '1080x1350',
      label: t.resizer.presetPortrait,
      width: 1080,
      height: 1350,
      tag: '4:5',
    },
    {
      id: '1080x1920',
      label: t.resizer.presetStory,
      width: 1080,
      height: 1920,
      tag: '9:16',
    },
  ];

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    setIsLoadingMeta(true);

    // Clean up previous results
    if (result) {
      revokeResizeResult(result);
      setResult(null);
    }
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }

    try {
      const meta = await extractImageMeta(file);
      setSelectedFile(file);
      setImageMeta(meta);

      // Populate default dimensions from image
      const w = meta.dimensions.width;
      const h = meta.dimensions.height;
      setWidthInput(w.toString());
      setHeightInput(h.toString());
      const ratio = w / h;
      setCurrentAspectRatio(ratio);
      setActivePreset('custom');
      setAspectRatioLocked(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to inspect image.'
      );
      setSelectedFile(null);
      setImageMeta(null);
    } finally {
      setIsLoadingMeta(false);
    }
  };

  // Reset tool
  const handleReset = () => {
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }
    revokeResizeResult(result);
    setSelectedFile(null);
    setImageMeta(null);
    setResult(null);
    setErrorMessage(null);
    setResizeStage('idle');
    setStageDetail('');
    setProgressPercent(0);
    setActivePreset('custom');
  };

  // Handle Width change
  const handleWidthChange = (valStr: string) => {
    setWidthInput(valStr);
    setActivePreset('custom');
    setErrorMessage(null);

    const val = parseInt(valStr, 10);
    if (!isNaN(val) && val > 0 && aspectRatioLocked && currentAspectRatio > 0) {
      const calculatedHeight = Math.max(1, Math.round(val / currentAspectRatio));
      setHeightInput(calculatedHeight.toString());
    }
  };

  // Handle Height change
  const handleHeightChange = (valStr: string) => {
    setHeightInput(valStr);
    setActivePreset('custom');
    setErrorMessage(null);

    const val = parseInt(valStr, 10);
    if (!isNaN(val) && val > 0 && aspectRatioLocked && currentAspectRatio > 0) {
      const calculatedWidth = Math.max(1, Math.round(val * currentAspectRatio));
      setWidthInput(calculatedWidth.toString());
    }
  };

  // Toggle Aspect Ratio Lock
  const toggleAspectRatioLock = () => {
    const nextLocked = !aspectRatioLocked;
    setAspectRatioLocked(nextLocked);

    if (nextLocked) {
      const w = parseInt(widthInput, 10);
      const h = parseInt(heightInput, 10);
      if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
        setCurrentAspectRatio(w / h);
      } else if (imageMeta) {
        setCurrentAspectRatio(imageMeta.dimensions.width / imageMeta.dimensions.height);
      }
    }
  };

  // Handle Preset Selection
  const handlePresetSelect = (preset: DimensionPreset) => {
    setWidthInput(preset.width.toString());
    setHeightInput(preset.height.toString());
    setActivePreset(preset.id);
    setErrorMessage(null);
    // When preset is explicitly clicked, update aspect ratio to match preset
    setCurrentAspectRatio(preset.width / preset.height);
  };

  // Handle Resize execution
  const handleResize = async () => {
    if (!selectedFile || !imageMeta) return;

    const w = parseInt(widthInput, 10);
    const h = parseInt(heightInput, 10);

    const validation = validateResizeDimensions(w, h);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid resize dimensions.');
      return;
    }

    setIsResizing(true);
    setErrorMessage(null);
    setProgressPercent(15);
    setResizeStage('preparing');
    setStageDetail(t.resizer.stagePreparing);

    // Determine target format
    let targetFormat: SupportedImageMime | undefined = undefined;
    if (outputFormat !== 'original') {
      targetFormat = outputFormat as SupportedImageMime;
    }

    const options: ResizeOptions = {
      width: w,
      height: h,
      maintainAspectRatio: aspectRatioLocked,
      format: targetFormat,
      quality,
    };

    try {
      const resizeRes = await resizeImage(
        selectedFile,
        options,
        (stage, detail) => {
          setResizeStage(stage);
          if (detail) setStageDetail(detail);

          switch (stage) {
            case 'preparing':
              setProgressPercent(30);
              break;
            case 'resizing':
              setProgressPercent(65);
              break;
            case 'encoding':
              setProgressPercent(85);
              break;
            case 'complete':
              setProgressPercent(100);
              break;
          }
        }
      );

      // Clean up previous result if any
      if (result) {
        revokeResizeResult(result);
      }

      setResult(resizeRes);

      // Scroll smoothly to result card
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while resizing the image.'
      );
      setResizeStage('error');
    } finally {
      setIsResizing(false);
    }
  };

  // Calculate if current target format is PNG
  const isTargetPng =
    outputFormat === 'image/png' ||
    (outputFormat === 'original' && imageMeta?.type === 'image/png');

  // Check if active preset differs in ratio from original
  const hasRatioMismatchWithOriginal =
    activePreset !== 'custom' &&
    imageMeta &&
    Math.abs(currentAspectRatio - imageMeta.dimensions.width / imageMeta.dimensions.height) > 0.05;

  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{t.resizer.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.resizer.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.resizer.subtitle}
        </p>
      </section>

      {/* Main Tool Card */}
      <div className="max-w-4xl mx-auto">
        {!selectedFile ? (
          /* Step 1: Upload Zone */
          <Card className="border-2 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <DropZone
                onFileSelect={handleFileSelect}
                isLoading={isLoadingMeta}
                title={t.resizer.dropzonePrompt}
                subtitle="JPG, PNG, WebP (up to 50MB)"
              />
              {errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Step 2: Controls & Processing Configuration */
          <div className="space-y-8">
            <Card className="border shadow-xs overflow-hidden">
              <CardHeader className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ResizeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                        {t.resizer.originalInfo}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm font-mono truncate max-w-md">
                        {selectedFile.name}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="subtle" size="sm">
                      {imageMeta?.dimensions.width} × {imageMeta?.dimensions.height} px
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {formatBytes(selectedFile.size)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      disabled={isResizing}
                      className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      <RefreshCw className="w-3.5 h-3.5 me-1" />
                      <span>{t.common.reset}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* 1. Dimensions Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{t.resizer.dimensionsSettings}</span>
                    </h3>

                    <button
                      type="button"
                      onClick={toggleAspectRatioLock}
                      disabled={isResizing}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        aspectRatioLocked
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                      title={aspectRatioLocked ? t.resizer.aspectRatioUnlock : t.resizer.aspectRatioLock}
                    >
                      {aspectRatioLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{t.resizer.aspectRatioLock}</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>{t.resizer.aspectRatioUnlock}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Width & Height Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Width Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="resize-width"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 block"
                      >
                        {t.resizer.widthLabel} (px)
                      </label>
                      <div className="relative">
                        <Input
                          id="resize-width"
                          type="number"
                          min={MIN_IMAGE_DIMENSION}
                          max={MAX_CANVAS_DIMENSION}
                          value={widthInput}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          disabled={isResizing}
                          className="font-mono text-base pe-10"
                          placeholder="e.g. 1920"
                        />
                        <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                          px
                        </span>
                      </div>
                    </div>

                    {/* Height Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="resize-height"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 block"
                      >
                        {t.resizer.heightLabel} (px)
                      </label>
                      <div className="relative">
                        <Input
                          id="resize-height"
                          type="number"
                          min={MIN_IMAGE_DIMENSION}
                          max={MAX_CANVAS_DIMENSION}
                          value={heightInput}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          disabled={isResizing}
                          className="font-mono text-base pe-10"
                          placeholder="e.g. 1080"
                        />
                        <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                          px
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Aspect Ratio Hint */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {aspectRatioLocked
                      ? t.resizer.aspectRatioLockedHint
                      : t.resizer.aspectRatioUnlockedHint}
                  </p>
                </div>

                {/* 2. Popular Presets */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        {t.resizer.popularDimensionsTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.resizer.popularDimensionsSubtitle}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {presets.map((preset) => {
                      const isSelected = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handlePresetSelect(preset)}
                          disabled={isResizing}
                          className={`p-2.5 rounded-xl border text-start transition-all flex flex-col justify-between gap-1.5 ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold truncate">
                              {preset.width} × {preset.height}
                            </span>
                            <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {preset.tag}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {preset.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Preset Ratio Note */}
                  {hasRatioMismatchWithOriginal && (
                    <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{t.resizer.presetRatioMismatchNote}</span>
                    </div>
                  )}
                </div>

                {/* 3. Output Format & Quality Settings */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t.resizer.outputSettings}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Output Format Selection */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="output-format-select"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 block"
                      >
                        {t.resizer.outputFormat}
                      </label>
                      <select
                        id="output-format-select"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        disabled={isResizing}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="original">{t.resizer.formatOriginal}</option>
                        <option value="image/jpeg">{t.resizer.formatJpeg}</option>
                        <option value="image/png">{t.resizer.formatPng}</option>
                        <option value="image/webp">{t.resizer.formatWebp}</option>
                      </select>
                    </div>

                    {/* Quality Slider (for JPG and WebP) */}
                    <div className="space-y-1.5">
                      <Slider
                        label={t.resizer.qualityLabel}
                        value={quality}
                        onChange={setQuality}
                        min={10}
                        max={100}
                        step={1}
                        unit="%"
                        disabled={isResizing || isTargetPng}
                        helperText={
                          isTargetPng
                            ? t.resizer.pngLosslessNote
                            : t.resizer.qualityHelper
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message if any */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                    <div className="space-y-0.5">
                      <span className="font-semibold block">{t.common.error}</span>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Progress Indicator during resizing */}
                {isResizing && (
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-blue-900 dark:text-blue-200">
                      <span>{stageDetail || t.resizer.resizingBtn}</span>
                      <span className="font-mono">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} />
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="pt-2 flex justify-end">
                  <Button
                    size="lg"
                    onClick={handleResize}
                    disabled={isResizing}
                    className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2"
                  >
                    {isResizing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t.resizer.resizingBtn}</span>
                      </>
                    ) : (
                      <>
                        <ResizeIcon className="w-4 h-4" />
                        <span>{t.resizer.resizeBtn}</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Result Card Display */}
            {result && (
              <div ref={resultRef} className="scroll-mt-6">
                <ResultCard
                  toolType="resize"
                  result={result}
                  originalPreviewUrl={imageMeta?.previewUrl}
                  originalName={selectedFile.name}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Educational & SEO Content Sections */}
      <section className="max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800 space-y-16">
        {/* How It Works */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.resizer.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.resizer.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.step1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.step2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.step3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Tool */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.resizer.whyChooseTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.resizer.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.benefit1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.benefit1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.benefit2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.benefit2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.resizer.benefit3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.resizer.benefit3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.resizer.faqTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.resizer.faqSubtitle}
            </p>
          </div>

          <div className="space-y-3">
            {t.resizer.faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-start font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.resizer.relatedToolsTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.resizer.relatedToolsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Compress Image - Active */}
            <Link
              href="/compress-image"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-xs transition-all group flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Minimize2 className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t.nav.compress}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.subtitle}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{t.popularTools.openTool}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </Link>

            {/* Convert Image - Active */}
            <Link
              href="/convert-image"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-xs transition-all group flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t.nav.convert}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.converter?.subtitle || (isRTL
                    ? 'تحويل الصور بين صيغ JPG و PNG و WebP بسرعة وخصوصية.'
                    : 'Convert photos between JPG, PNG, and WebP formats.')}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{t.popularTools.openTool}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </Link>

            {/* Crop Image - Active Link */}
            <Link
              href="/crop-image"
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-xs transition-all group flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Crop className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t.nav.crop}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.cropper?.subtitle || (isRTL
                    ? 'قص وتحديد أجزاء الصور بحرية وبنسب أبعاد قياسية.'
                    : 'Crop and trim image frames with precision aspect ratios.')}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{t.popularTools.openTool}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
