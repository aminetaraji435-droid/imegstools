'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  Palette,
  Minimize2,
  Scaling,
  Crop,
  FileImage,
  ArrowRightLeft,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DropZone } from '@/components/ui/DropZone';
import { Slider } from '@/components/ui/Slider';
import { ResultCard } from '@/components/tools/ResultCard';
import { useComingSoon } from '@/components/ui/ComingSoonModal';
import {
  ConvertOptions,
  ConvertResult,
  ConvertStage,
  LoadedImageMeta,
  SupportedImageMime,
} from '@/lib/image/types';
import { convertImage, revokeConvertResult } from '@/lib/image/convert';
import { formatBytes } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

export interface ConverterToolProps {
  initialTargetFormat?: SupportedImageMime;
  initialQuality?: number;
  acceptedFormats?: ('image/jpeg' | 'image/png' | 'image/webp')[];
  lockedSourceFormatNote?: string;
  hideEmbeddedSections?: boolean;
}

export function ConverterTool({
  initialTargetFormat = 'image/webp',
  initialQuality = 85,
  acceptedFormats,
  lockedSourceFormatNote,
  hideEmbeddedSections = false,
}: ConverterToolProps = {}) {
  const { t, dir } = useApp();
  const isRTL = dir === 'rtl';
  const { openComingSoon } = useComingSoon();

  // Upload & File State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<LoadedImageMeta | null>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Conversion Configuration State
  const [targetFormat, setTargetFormat] = useState<SupportedImageMime>(initialTargetFormat);
  const [quality, setQuality] = useState<number>(initialQuality);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');

  // Conversion Execution State
  const [isConverting, setIsConverting] = useState(false);
  const [convertStage, setConvertStage] = useState<ConvertStage>('idle');
  const [stageDetail, setStageDetail] = useState<string>('');
  const [result, setResult] = useState<ConvertResult | null>(null);

  // References for memory cleanup
  const activePreviewUrlRef = useRef<string | null>(null);
  const activeResultRef = useRef<ConvertResult | null>(null);

  // Keep ref synchronized with current result for unmount cleanup
  useEffect(() => {
    activeResultRef.current = result;
  }, [result]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (activePreviewUrlRef.current) {
        URL.revokeObjectURL(activePreviewUrlRef.current);
      }
      if (activeResultRef.current) {
        revokeConvertResult(activeResultRef.current);
      }
    };
  }, []);

  /**
   * Handles file upload and reads image metadata (dimensions, format, size).
   */
  const handleFileSelect = useCallback(
    async (file: File) => {
      setErrorMessage(null);
      setIsLoadingMeta(true);

      // Cleanup previous preview and result
      if (activePreviewUrlRef.current) {
        URL.revokeObjectURL(activePreviewUrlRef.current);
        activePreviewUrlRef.current = null;
      }
      if (activeResultRef.current) {
        revokeConvertResult(activeResultRef.current);
        activeResultRef.current = null;
        setResult(null);
      }

      try {
        const previewUrl = URL.createObjectURL(file);
        activePreviewUrlRef.current = previewUrl;

        // Decode dimensions using createImageBitmap or fallback to Image()
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

        const sourceMime = (file.type || 'image/jpeg') as SupportedImageMime;

        setSelectedFile(file);
        setImageMeta({
          file,
          name: file.name,
          sizeBytes: file.size,
          type: sourceMime,
          previewUrl,
          dimensions: { width, height },
          aspectRatio: width / height,
        });

        // Set smart default target format: if original is JPEG, default to WebP; if original is PNG, default to WebP; if WebP, default to PNG
        if (sourceMime === 'image/jpeg') {
          setTargetFormat('image/webp');
        } else if (sourceMime === 'image/png') {
          setTargetFormat('image/webp');
        } else if (sourceMime === 'image/webp') {
          setTargetFormat('image/png');
        } else {
          setTargetFormat('image/webp');
        }

        setQuality(85);
        setBackgroundColor('#ffffff');
      } catch (err) {
        console.error('File load error:', err);
        setErrorMessage(
          err instanceof Error
            ? err.message
            : isRTL
            ? 'تعذر قراءة الصورة. يرجى التأكد من اختيار ملف صالح.'
            : 'Failed to process selected image. Please choose a valid image file.'
        );
        setSelectedFile(null);
        setImageMeta(null);
      } finally {
        setIsLoadingMeta(false);
      }
    },
    [isRTL]
  );

  /**
   * Executes the client-side format conversion engine.
   */
  const handleConvert = async () => {
    if (!selectedFile || !imageMeta) return;

    setIsConverting(true);
    setErrorMessage(null);
    setConvertStage('preparing');

    // Revoke previous result before new conversion
    if (result) {
      revokeConvertResult(result);
      setResult(null);
    }

    try {
      const options: ConvertOptions = {
        targetFormat,
        quality: targetFormat === 'image/png' ? 100 : quality,
        backgroundColor: targetFormat === 'image/jpeg' ? backgroundColor : undefined,
      };

      const conversionResult = await convertImage(
        selectedFile,
        options,
        (stage, detail) => {
          setConvertStage(stage);
          if (detail) setStageDetail(detail);
        }
      );

      setResult(conversionResult);
    } catch (err) {
      console.error('Conversion execution error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isRTL
          ? 'حدث خطأ أثناء تحويل الصورة. يرجى المحاولة مرة أخرى.'
          : 'An error occurred during conversion. Please try again.'
      );
    } finally {
      setIsConverting(false);
      setConvertStage('idle');
    }
  };

  /**
   * Resets tool state for converting a new image.
   */
  const handleReset = () => {
    if (activePreviewUrlRef.current) {
      URL.revokeObjectURL(activePreviewUrlRef.current);
      activePreviewUrlRef.current = null;
    }
    if (result) {
      revokeConvertResult(result);
    }
    setSelectedFile(null);
    setImageMeta(null);
    setResult(null);
    setErrorMessage(null);
    setConvertStage('idle');
  };

  const isTargetJpeg = targetFormat === 'image/jpeg';
  const isTargetPng = targetFormat === 'image/png';
  const isTargetWebp = targetFormat === 'image/webp';
  const isSameFormat = imageMeta ? imageMeta.type === targetFormat : false;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* 1. Tool Main Interactive Container */}
      <section className="space-y-6">
        {!selectedFile ? (
          /* Step 1: Upload Zone */
          <Card className="border-2 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <DropZone
                onFileSelect={handleFileSelect}
                isLoading={isLoadingMeta}
                title={t.converter.dropzonePrompt}
                subtitle={
                  acceptedFormats
                    ? `${acceptedFormats.map((f) => (f === 'image/jpeg' ? 'JPG/JPEG' : f.split('/')[1].toUpperCase())).join(', ')} (up to 50MB)`
                    : 'JPG, PNG, WebP (up to 50MB)'
                }
                acceptedFormats={acceptedFormats}
              />
              {lockedSourceFormatNote && (
                <p className="mt-3 text-xs text-center text-slate-500 dark:text-slate-400">
                  {lockedSourceFormatNote}
                </p>
              )}
              {errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : !result ? (
          /* Step 2: Configuration & Convert Settings Workspace */
          <Card className="border-2 shadow-sm">
            <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.converter.formatSettingsTitle}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm mt-0.5">
                    {t.converter.formatSettingsSubtitle}
                  </CardDescription>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleReset} className="self-start sm:self-auto text-xs">
                {isRTL ? 'تغيير الصورة' : 'Change Image'}
              </Button>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-8">
              {/* File Overview Summary Bar */}
              {imageMeta && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageMeta.previewUrl}
                        alt={imageMeta.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                        {imageMeta.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                        <Badge variant="subtle" size="sm">
                          {imageMeta.type.replace('image/', '').toUpperCase()}
                        </Badge>
                        <span>•</span>
                        <span>
                          {imageMeta.dimensions.width} × {imageMeta.dimensions.height} px
                        </span>
                        <span>•</span>
                        <span className="font-mono">{formatBytes(imageMeta.sizeBytes)}</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="outline" size="sm" className="self-start sm:self-auto text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {t.converter.dimensionsPreserved}
                  </Badge>
                </div>
              )}

              {/* Format Selection Cards Grid */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-900 dark:text-white block">
                  {t.converter.selectTargetFormat}
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Option 1: WebP */}
                  <button
                    type="button"
                    onClick={() => setTargetFormat('image/webp')}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between gap-3 ${
                      isRTL ? 'text-right' : 'text-left'
                    } ${
                      targetFormat === 'image/webp'
                        ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            targetFormat === 'image/webp'
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-400'
                          }`}
                        >
                          {targetFormat === 'image/webp' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          WebP
                        </span>
                      </div>
                      <Badge variant="success" size="sm">
                        {isRTL ? 'موصى به للويب' : 'Web Recommended'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t.converter.formatWebpDesc}
                    </p>
                  </button>

                  {/* Option 2: PNG */}
                  <button
                    type="button"
                    onClick={() => setTargetFormat('image/png')}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between gap-3 ${
                      isRTL ? 'text-right' : 'text-left'
                    } ${
                      targetFormat === 'image/png'
                        ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            targetFormat === 'image/png'
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-400'
                          }`}
                        >
                          {targetFormat === 'image/png' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          PNG
                        </span>
                      </div>
                      <Badge variant="subtle" size="sm">
                        {isRTL ? 'غير فاقد للجودة' : 'Lossless'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t.converter.formatPngDesc}
                    </p>
                  </button>

                  {/* Option 3: JPEG / JPG */}
                  <button
                    type="button"
                    onClick={() => setTargetFormat('image/jpeg')}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between gap-3 ${
                      isRTL ? 'text-right' : 'text-left'
                    } ${
                      targetFormat === 'image/jpeg'
                        ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            targetFormat === 'image/jpeg'
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-400'
                          }`}
                        >
                          {targetFormat === 'image/jpeg' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          JPG / JPEG
                        </span>
                      </div>
                      <Badge variant="subtle" size="sm">
                        {isRTL ? 'توافق شامل' : 'Universal'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t.converter.formatJpegDesc}
                    </p>
                  </button>
                </div>
              </div>

              {/* Same format notice if user picked identical source & target format */}
              {isSameFormat && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>{t.converter.sameFormatNotice}</span>
                </div>
              )}

              {/* Quality Settings (Adapted for JPG and WebP) */}
              {(isTargetJpeg || isTargetWebp) && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
                  <Slider
                    label={t.converter.qualityLabel}
                    value={quality}
                    onChange={setQuality}
                    min={10}
                    max={100}
                    step={1}
                    unit="%"
                    disabled={isConverting}
                    helperText={isTargetWebp ? t.converter.qualityWebpHelper : t.converter.qualityHelper}
                  />
                </div>
              )}

              {/* Lossless Notice for PNG (Honest UX, no fake quality sliders) */}
              {isTargetPng && (
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 text-xs sm:text-sm flex items-start gap-3">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <span className="font-semibold block mb-0.5">PNG Lossless Encoding</span>
                    <p className="text-xs opacity-90 leading-relaxed">{t.converter.pngLosslessNote}</p>
                  </div>
                </div>
              )}

              {/* JPEG Transparency Background Color Picker */}
              {isTargetJpeg && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block">
                        {t.converter.transparencyWarningTitle}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {t.converter.transparencyWarningDesc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      {t.converter.bgColorLabel}
                    </span>
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Preset White */}
                      <button
                        type="button"
                        onClick={() => setBackgroundColor('#ffffff')}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                          backgroundColor === '#ffffff'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-white" />
                        <span>{t.converter.bgColorWhite}</span>
                      </button>

                      {/* Preset Black */}
                      <button
                        type="button"
                        onClick={() => setBackgroundColor('#000000')}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                          backgroundColor === '#000000'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-600 bg-black" />
                        <span>{t.converter.bgColorBlack}</span>
                      </button>

                      {/* Custom Color Input */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="custom-color-picker"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Palette className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.converter.bgColorCustom}</span>
                          <input
                            id="custom-color-picker"
                            type="color"
                            value={customBgColor}
                            onChange={(e) => {
                              setCustomBgColor(e.target.value);
                              setBackgroundColor(e.target.value);
                            }}
                            className="w-5 h-5 opacity-0 absolute pointer-events-none"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 ml-1"
                            style={{ backgroundColor: backgroundColor }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Convert Primary Action CTA */}
              <div className="pt-2">
                <Button
                  size="lg"
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="w-full sm:w-auto min-w-[220px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{stageDetail || t.converter.convertingBtn}</span>
                    </>
                  ) : (
                    <>
                      <ArrowRightLeft className="w-4 h-4" />
                      <span>{t.converter.convertBtn}</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Step 3: Result Card Display */
          <ResultCard
            result={result}
            originalPreviewUrl={imageMeta?.previewUrl}
            originalName={selectedFile.name}
            onReset={handleReset}
            toolType="convert"
          />
        )}
      </section>

      {!hideEmbeddedSections && (
        <>
          {/* 2. Educational Section: How it Works */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.converter.howItWorksTitle}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.converter.howItWorksSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.step1Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.step1Desc}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.step2Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.step2Desc}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.step3Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.step3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* 3. Format Comparison Matrix Table */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.converter.matrixTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.converter.matrixSubtitle}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                    <th className={`p-3 font-bold text-slate-800 dark:text-slate-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'الصيغة' : 'Format'}
                    </th>
                    <th className={`p-3 font-bold text-slate-800 dark:text-slate-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'الشفافية (Alpha)' : 'Transparency'}
                    </th>
                    <th className={`p-3 font-bold text-slate-800 dark:text-slate-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'نوع الضغط' : 'Compression'}
                    </th>
                    <th className={`p-3 font-bold text-slate-800 dark:text-slate-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'أفضل استخدام' : 'Best For'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">WebP</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      {isRTL ? 'مدعومة كاملة' : 'Full Support'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'Lossy & Lossless متقدم' : 'Advanced Lossy & Lossless'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'مواقع الإنترنت، التطبيقات الحديثة، تسريع الصفحات' : 'Modern websites, apps, ultra-fast loading'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-blue-600 dark:text-blue-400">PNG</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      {isRTL ? 'مدعومة كاملة' : 'Full Support'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'Lossless (غير فاقد)' : '100% Lossless'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'الشعارات، الأيقونات، الرسومات التوضيحية' : 'Logos, graphics, icons, transparent art'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">JPG / JPEG</td>
                    <td className="p-3 text-slate-400 font-medium">
                      {isRTL ? 'غير مدعومة (تعبئة بلون)' : 'No (Filled with BG color)'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'Lossy مع ضبط الجودة' : 'Lossy with quality slider'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {isRTL ? 'الصور الفوتوغرافية، الطباعة، التوافق القديم' : 'Photography, print, legacy compatibility'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Why Choose Our Converter */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.converter.whyChooseTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.converter.whyChooseSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Benefit 1 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.benefit1Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.benefit1Desc}
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.benefit2Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.benefit2Desc}
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {t.converter.benefit3Title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.converter.benefit3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* 5. FAQ Section */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.converter.faqTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.converter.faqSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {t.converter.faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.q}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Related Image Tools */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.converter.relatedToolsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.converter.relatedToolsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Compress Image - Active */}
              <Link
                href="/compress-image"
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between gap-4"
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

              {/* Resize Image - Active */}
              <Link
                href="/resize-image"
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Scaling className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.nav.resize}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.resizer.subtitle}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{t.popularTools.openTool}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </Link>

              {/* Crop Image - Active Link */}
              <Link
                href="/crop-image"
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Crop className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t.nav.crop}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.cropper.subtitle}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{t.popularTools.openTool}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
