'use client';

import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileCheck,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatBytes } from '@/lib/utils';
import { CompressionResult, ResizeResult, ConvertResult, CropResult } from '@/lib/image/types';
import { useApp } from '@/lib/context/AppContext';

export type ToolResult = CompressionResult | ResizeResult | ConvertResult | CropResult;

export interface ResultCardProps {
  result: ToolResult;
  originalPreviewUrl?: string;
  originalName: string;
  onReset: () => void;
  className?: string;
  toolType?: 'compress' | 'resize' | 'convert' | 'crop';
}

export function ResultCard({
  result,
  originalPreviewUrl,
  originalName,
  onReset,
  className = '',
  toolType = 'compress',
}: ResultCardProps) {
  const { t, dir } = useApp();
  const isRTL = dir === 'rtl';
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');

  const isCrop = toolType === 'crop' || 'cropRect' in result;
  const isConvert = !isCrop && (toolType === 'convert' || 'outputFormat' in result);
  const isResize = !isCrop && !isConvert && (toolType === 'resize' || 'outputDimensions' in result);
  
  const cropData = isCrop ? (result as CropResult) : null;
  const convertData = isConvert ? (result as ConvertResult) : null;
  const resizeData = isResize ? (result as ResizeResult) : null;
  const compressionData = !isCrop && !isConvert && !isResize ? (result as CompressionResult) : null;

  const formatName = result.format.replace('image/', '').toUpperCase();
  const originalFormatName = convertData
    ? convertData.originalFormat.replace('image/', '').toUpperCase()
    : formatName;

  // Determine titles & labels based on active tool
  let cardTitle = t.compressor.resultTitle;
  let resetLabel = t.compressor.compressAnother;
  let downloadLabel = t.compressor.downloadBtn;
  let processedLabel = t.compressor.compressedLabel;

  if (isCrop) {
    cardTitle = t.cropper?.resultTitle || (isRTL ? 'تم قص الصورة بنجاح!' : 'Image Cropped Successfully!');
    resetLabel = t.cropper?.cropAnother || (isRTL ? 'قص صورة أخرى' : 'Crop Another Image');
    downloadLabel = t.cropper?.downloadBtn || (isRTL ? 'تحميل الصورة المقصوصة' : 'Download Cropped Image');
    processedLabel = t.cropper?.croppedLabel || (isRTL ? 'الصورة المقصوصة' : 'Cropped Image');
  } else if (isConvert) {
    cardTitle = t.converter.resultTitle;
    resetLabel = t.converter.convertAnother;
    downloadLabel = t.converter.downloadBtn;
    processedLabel = t.converter.convertedLabel;
  } else if (isResize) {
    cardTitle = t.resizer.resultTitle;
    resetLabel = t.resizer.resizeAnother;
    downloadLabel = t.resizer.downloadBtn;
    processedLabel = isRTL ? 'الصورة المعدلة' : 'Resized Image';
  }

  const hasSavedBytes = result.outputSizeBytes < result.originalSizeBytes;
  const sizeDiffBytes = Math.abs(result.originalSizeBytes - result.outputSizeBytes);

  return (
    <Card className={`overflow-hidden border-2 border-emerald-500/20 dark:border-emerald-500/30 ${className}`}>
      {/* Header Banner */}
      <CardHeader className="bg-gradient-to-r from-emerald-50/70 to-blue-50/70 dark:from-emerald-950/20 dark:to-blue-950/20 border-b border-emerald-100 dark:border-emerald-900/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {cardTitle}
                </CardTitle>
                
                {isCrop && cropData ? (
                  <Badge variant="success" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                    {cropData.aspectRatioUsed} • {result.dimensions.width} × {result.dimensions.height} px
                  </Badge>
                ) : isConvert && convertData ? (
                  convertData.isSizeReduced ? (
                    <Badge variant="success" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                      {t.converter.sizeReduced} {convertData.sizeChangePercentage}%
                    </Badge>
                  ) : convertData.isSizeIncreased ? (
                    <Badge variant="subtle" size="sm">
                      {t.converter.sizeIncreased} {convertData.sizeChangePercentage}%
                    </Badge>
                  ) : (
                    <Badge variant="subtle" size="sm">
                      {t.converter.sizeUnchanged}
                    </Badge>
                  )
                ) : isResize ? (
                  hasSavedBytes ? (
                    <Badge variant="success" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                      {result.savedPercentage}% {t.compressor.saved}
                    </Badge>
                  ) : (
                    <Badge variant="subtle" size="sm">
                      {result.dimensions.width} × {result.dimensions.height} px
                    </Badge>
                  )
                ) : (
                  <Badge variant="success" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                    {result.savedPercentage}% {t.compressor.saved}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs sm:text-sm mt-0.5 font-mono">
                {result.outputName}
              </CardDescription>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {originalPreviewUrl && (
              <div className="inline-flex rounded-lg p-1 bg-slate-200/60 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'single'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {processedLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compare')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                    viewMode === 'compare'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{isRTL ? 'مقارنة جنباً إلى جنب' : 'Side-by-Side'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Original Details */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
              {isCrop
                ? (t.cropper?.originalDimensions || (isRTL ? 'الأبعاد الأصلية' : 'Original Dimensions'))
                : isConvert
                ? t.converter.originalFormat
                : isResize
                ? t.resizer.originalDimensions
                : t.compressor.originalSize}
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 block truncate">
              {isCrop && cropData
                ? `${cropData.originalDimensions.width} × ${cropData.originalDimensions.height} px`
                : isConvert
                ? `${originalFormatName} • ${formatBytes(result.originalSizeBytes)}`
                : isResize && resizeData
                ? `${resizeData.originalDimensions.width} × ${resizeData.originalDimensions.height} px`
                : formatBytes(result.originalSizeBytes)}
            </span>
            {(isResize || isCrop) && (
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                {formatBytes(result.originalSizeBytes)}
              </span>
            )}
          </div>

          {/* Card 2: Output Dimensions / Converted Size */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
              {isCrop
                ? (t.cropper?.croppedDimensions || (isRTL ? 'أبعاد القص' : 'Cropped Area'))
                : isConvert
                ? t.converter.targetFormat
                : isResize
                ? t.resizer.resizedDimensions
                : t.compressor.compressedSize}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block truncate">
              {isConvert
                ? `${formatName} • ${formatBytes(result.outputSizeBytes)}`
                : `${result.dimensions.width} × ${result.dimensions.height} px`}
            </span>
            {isCrop && cropData && (
              <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5">
                {isRTL ? 'النسبة' : 'Ratio'}: {cropData.aspectRatioUsed}
              </span>
            )}
            {isResize && (
              <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5">
                {isRTL ? 'النسبة' : 'Ratio'}: {(result.dimensions.width / result.dimensions.height).toFixed(2)}:1
              </span>
            )}
          </div>

          {/* Card 3: Size Difference / Space Saved */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/80">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 block mb-1">
              {isCrop
                ? (isRTL ? 'حجم الملف الناتج' : 'Cropped Size')
                : isConvert
                ? t.converter.formatChange
                : isResize
                ? t.resizer.resizedSize
                : t.compressor.saved}
            </span>
            <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 block truncate">
              {isCrop
                ? formatBytes(result.outputSizeBytes)
                : isConvert && convertData
                ? convertData.isSizeReduced
                  ? `-${formatBytes(sizeDiffBytes)} (-${convertData.sizeChangePercentage}%)`
                  : convertData.isSizeIncreased
                  ? `+${formatBytes(sizeDiffBytes)} (+${convertData.sizeChangePercentage}%)`
                  : t.converter.sizeUnchanged
                : isResize
                ? formatBytes(result.outputSizeBytes)
                : `${formatBytes(result.savedBytes)} (${result.savedPercentage}%)`}
            </span>
            {(isResize || isCrop) && (
              <span className="text-xs text-blue-600/80 dark:text-blue-400/80 block mt-0.5">
                {hasSavedBytes
                  ? `-${formatBytes(sizeDiffBytes)} (-${result.savedPercentage}%)`
                  : result.outputSizeBytes > result.originalSizeBytes
                  ? `+${formatBytes(sizeDiffBytes)}`
                  : (isRTL ? 'مطابق' : 'Identical size')}
              </span>
            )}
          </div>

          {/* Card 4: Format & Dimensions Info */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
              {isConvert
                ? t.converter.originalDimensions
                : isResize || isCrop
                ? t.resizer.fileType
                : t.compressor.dimensions}
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 block truncate">
              {isConvert
                ? `${result.dimensions.width} × ${result.dimensions.height} px`
                : formatName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
              {isConvert
                ? t.converter.dimensionsPreserved
                : isCrop && cropData?.qualityUsed !== undefined
                ? `${Math.round(cropData.qualityUsed * 100)}% quality`
                : isResize && resizeData?.qualityUsed !== undefined
                ? `${Math.round(resizeData.qualityUsed * 100)}% quality`
                : !isResize && !isCrop
                ? `${result.dimensions.width} × ${result.dimensions.height} px`
                : '100% Quality'}
            </span>
          </div>
        </div>

        {/* Compression Target Size Indicator (for compression tool) */}
        {compressionData && compressionData.targetAchieved !== undefined && (
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
              compressionData.targetAchieved
                ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}
          >
            {compressionData.targetAchieved ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="font-semibold block">
                {compressionData.targetAchieved
                  ? t.compressor.targetAchievedNote
                  : t.compressor.targetNotAchievedNote}
              </span>
              {compressionData.note && (
                <p className="text-xs opacity-90 leading-relaxed">{compressionData.note}</p>
              )}
            </div>
          </div>
        )}

        {/* General Note (e.g. PNG lossless or technical info) */}
        {result.note && (!compressionData || compressionData.targetAchieved === undefined) && (
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>{result.note}</span>
          </div>
        )}

        {/* Image Preview Container */}
        {viewMode === 'single' ? (
          <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950 p-3 sm:p-4 flex flex-col items-center justify-center min-h-[260px] max-h-[480px] overflow-hidden">
            {/* Checkerboard backdrop for transparent PNGs */}
            <div
              className="w-full h-full flex items-center justify-center overflow-auto"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.downloadUrl}
                alt={result.outputName}
                className="max-h-[380px] max-w-full object-contain rounded-lg shadow-xs transition-transform duration-200"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {result.outputName} • {result.dimensions.width} × {result.dimensions.height} px • {formatBytes(result.outputSizeBytes)}
              </span>
            </div>
          </div>
        ) : (
          /* Side-by-Side Comparison */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Preview */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.compressor.originalLabel} ({originalFormatName})
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {isResize && resizeData
                    ? `${resizeData.originalDimensions.width}×${resizeData.originalDimensions.height} • ${formatBytes(result.originalSizeBytes)}`
                    : formatBytes(result.originalSizeBytes)}
                </span>
              </div>
              <div className="h-[240px] flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalPreviewUrl}
                  alt={originalName}
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            </div>

            {/* Processed Preview */}
            <div className="rounded-xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-slate-950 p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {processedLabel} ({formatName})
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {result.dimensions.width}×{result.dimensions.height} • {formatBytes(result.outputSizeBytes)}
                </span>
              </div>
              <div className="h-[240px] flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.downloadUrl}
                  alt={result.outputName}
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center justify-center gap-2 order-2 sm:order-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{resetLabel}</span>
          </Button>

          <a
            href={result.downloadUrl}
            download={result.outputName}
            className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>{downloadLabel}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
