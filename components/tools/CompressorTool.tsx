'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Minimize2,
  Sliders,
  Target,
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  HardDrive,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Maximize2 as ResizeIcon,
  Crop,
  AlertTriangle,
} from 'lucide-react';
import { DropZone } from '@/components/ui/DropZone';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Progress } from '@/components/ui/Progress';
import { ResultCard } from '@/components/tools/ResultCard';
import { useApp } from '@/lib/context/AppContext';
import { formatBytes } from '@/lib/utils';
import {
  extractImageMeta,
  compressImage,
  revokeCompressionResult,
} from '@/lib/image/compress';
import {
  LoadedImageMeta,
  CompressionResult,
  CompressionStage,
  CompressOptions,
} from '@/lib/image/types';

export interface CompressorToolProps {
  initialMode?: 'quality' | 'target-size';
  initialTargetPreset?: '100' | '200' | '500' | 'custom';
  initialCustomTargetKb?: string;
  hideEmbeddedSections?: boolean;
}

export function CompressorTool({
  initialMode = 'quality',
  initialTargetPreset = '100',
  initialCustomTargetKb = '150',
  hideEmbeddedSections = false,
}: CompressorToolProps = {}) {
  const { t, dir } = useApp();
  const isRTL = dir === 'rtl';

  // Core state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageMeta, setImageMeta] = useState<LoadedImageMeta | null>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);

  // Settings state
  const [mode, setMode] = useState<'quality' | 'target-size'>(initialMode);
  const [quality, setQuality] = useState<number>(80);
  const [targetPreset, setTargetPreset] = useState<'100' | '200' | '500' | 'custom'>(initialTargetPreset);
  const [customTargetKb, setCustomTargetKb] = useState<string>(initialCustomTargetKb);

  // Processing state
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStage, setCompressionStage] = useState<CompressionStage>('idle');
  const [stageDetail, setStageDetail] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [result, setResult] = useState<CompressionResult | null>(null);
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
      revokeCompressionResult(result);
    };
  }, [imageMeta, result]);

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);
    setIsLoadingMeta(true);

    // Clean up previous result
    if (result) {
      revokeCompressionResult(result);
      setResult(null);
    }
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }

    try {
      const meta = await extractImageMeta(file);
      setSelectedFile(file);
      setImageMeta(meta);

      // Preset target size: preserve initialTargetPreset if in target-size mode, else smart default
      if (initialMode === 'target-size') {
        setTargetPreset(initialTargetPreset);
      } else {
        const originalKb = Math.round(file.size / 1024);
        if (originalKb > 500) {
          setTargetPreset('200');
        } else if (originalKb > 200) {
          setTargetPreset('100');
        } else {
          setTargetPreset('100');
        }
      }
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

  // Handle remove/reset
  const handleReset = () => {
    if (imageMeta?.previewUrl) {
      URL.revokeObjectURL(imageMeta.previewUrl);
    }
    revokeCompressionResult(result);
    setSelectedFile(null);
    setImageMeta(null);
    setResult(null);
    setErrorMessage(null);
    setCompressionStage('idle');
    setStageDetail('');
    setProgressPercent(0);
  };

  // Handle compression execution
  const handleCompress = async () => {
    if (!selectedFile || !imageMeta) return;

    setIsCompressing(true);
    setErrorMessage(null);
    setProgressPercent(15);
    setCompressionStage('decoding');
    setStageDetail(t.compressor.stageDecoding);

    // Calculate target bytes
    let targetSizeBytes: number | undefined = undefined;
    if (mode === 'target-size') {
      let kb = 100;
      if (targetPreset === '100') kb = 100;
      else if (targetPreset === '200') kb = 200;
      else if (targetPreset === '500') kb = 500;
      else {
        kb = Math.max(10, Math.min(50000, parseInt(customTargetKb) || 100));
      }
      targetSizeBytes = kb * 1024;
    }

    const options: CompressOptions = {
      mode,
      quality,
      targetSizeBytes,
    };

    try {
      const compressionResult = await compressImage(
        selectedFile,
        options,
        (stage, detail) => {
          setCompressionStage(stage);
          if (detail) setStageDetail(detail);

          // Update smooth progress estimates
          switch (stage) {
            case 'decoding':
              setProgressPercent(30);
              break;
            case 'compressing':
              setProgressPercent(60);
              break;
            case 'evaluating':
              setProgressPercent(80);
              break;
            case 'finalizing':
              setProgressPercent(95);
              break;
            case 'complete':
              setProgressPercent(100);
              break;
          }
        }
      );

      // Clean up previous result if any
      if (result) {
        revokeCompressionResult(result);
      }

      setResult(compressionResult);
      setCompressionStage('complete');

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Image compression failed. Please try with different settings.'
      );
      setCompressionStage('error');
    } finally {
      setIsCompressing(false);
    }
  };

  // Determine quality level helper label
  const getQualityGuidance = (q: number) => {
    if (q >= 90) return isRTL ? 'جودة فائقة شبه فاقدة الحجم (أكبر حجماً)' : 'Ultra High Quality (Larger file size)';
    if (q >= 75) return isRTL ? 'التوازن المثالي الموصى به للويب' : 'Optimal Web Balance (Recommended)';
    if (q >= 50) return isRTL ? 'ضغط عالٍ مع وفر ملحوظ في الحجم' : 'High Compression (Noticeable size reduction)';
    return isRTL ? 'ضغط أقصى (قد تظهر بعض التموجات)' : 'Maximum Compression (Visible compression artifacts)';
  };

  const isPng = selectedFile?.type === 'image/png';

  return (
    <div className="space-y-12">
      {/* Interactive Tool Workspace */}
      <section className="relative">
        <Card className="shadow-lg border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/80 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Minimize2 className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.compressor.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm mt-0.5">
                    {t.compressor.privacyNotice}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="subtle" size="sm">
                  {t.compressor.badge}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Step 1: File Upload / Dropzone */}
            {!selectedFile ? (
              <DropZone
                onFileSelect={handleFileSelect}
                acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                maxSizeBytes={50 * 1024 * 1024}
                title={t.compressor.dropzonePrompt}
                subtitle="JPG, PNG, WebP (up to 50MB)"
                isLoading={isLoadingMeta}
              />
            ) : (
              <div className="space-y-6">
                {/* Selected File Details Strip */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 shrink-0 flex items-center justify-center shadow-xs">
                      {imageMeta?.previewUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageMeta.previewUrl}
                          alt={selectedFile.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {selectedFile.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {formatBytes(selectedFile.size)}
                        </span>
                        <span>•</span>
                        {imageMeta && (
                          <span>
                            {imageMeta.dimensions.width} × {imageMeta.dimensions.height} px
                          </span>
                        )}
                        <span>•</span>
                        <span className="uppercase font-mono font-medium px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px]">
                          {selectedFile.type.replace('image/', '')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="self-start sm:self-auto text-xs"
                  >
                    {t.common?.remove || 'Change image'}
                  </Button>
                </div>

                {/* Compression Controls Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      <span>{t.compressor.settingsTitle}</span>
                    </h4>
                  </div>

                  {/* Mode Selector Tabs */}
                  <Tabs
                    value={mode}
                    onValueChange={(val) => setMode(val as 'quality' | 'target-size')}
                  >
                    <TabsList fullWidth className="grid-cols-2">
                      <TabsTrigger
                        value="quality"
                        icon={<Sliders className="w-3.5 h-3.5" />}
                      >
                        {t.compressor.modeQuality}
                      </TabsTrigger>
                      <TabsTrigger
                        value="target-size"
                        icon={<Target className="w-3.5 h-3.5" />}
                      >
                        {t.compressor.modeTarget}
                      </TabsTrigger>
                    </TabsList>

                    {/* Mode 1: Quality Slider Content */}
                    <TabsContent value="quality" className="space-y-4 pt-2">
                      <div className="space-y-3">
                        <Slider
                          label={t.compressor.qualityLabel}
                          value={quality}
                          onChange={setQuality}
                          min={10}
                          max={100}
                          step={1}
                          unit="%"
                          marks={[
                            { value: 25, label: '25%' },
                            { value: 50, label: '50%' },
                            { value: 80, label: '80% (Rec)' },
                            { value: 95, label: '95%' },
                          ]}
                          helperText={getQualityGuidance(quality)}
                        />
                      </div>

                      {/* PNG Technical Honesty Alert */}
                      {isPng && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs">
                          <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                          <p className="leading-relaxed">
                            {t.compressor.pngLosslessNote}
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Mode 2: Target File Size Content */}
                    <TabsContent value="target-size" className="space-y-4 pt-2">
                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {t.compressor.targetSizeLabel}
                        </label>

                        {/* Presets Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(['100', '200', '500', 'custom'] as const).map((preset) => {
                            const isSelected = targetPreset === preset;
                            const label =
                              preset === '100'
                                ? t.compressor.preset100kb
                                : preset === '200'
                                ? t.compressor.preset200kb
                                : preset === '500'
                                ? t.compressor.preset500kb
                                : t.compressor.customTarget;

                            return (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setTargetPreset(preset)}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-center ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom KB Input */}
                        {targetPreset === 'custom' && (
                          <div className="pt-2">
                            <Input
                              type="number"
                              min={10}
                              max={50000}
                              label={t.compressor.customTarget}
                              value={customTargetKb}
                              onChange={(e) => setCustomTargetKb(e.target.value)}
                              placeholder={t.compressor.customKbPlaceholder}
                              suffix="KB"
                              helperText="Target between 10 KB and 50,000 KB"
                            />
                          </div>
                        )}

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                          {t.compressor.targetSizeDisclaimer}
                        </p>
                      </div>

                      {/* PNG Notice in Target Size */}
                      {isPng && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          <p className="leading-relaxed">
                            {t.compressor.pngLosslessNote}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Progress Indicator */}
                  {isCompressing && (
                    <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                          {stageDetail || t.compressor.compressingBtn}
                        </span>
                        <span className="font-mono">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} size="sm" />
                    </div>
                  )}

                  {/* Compression Action Button */}
                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={handleCompress}
                      disabled={isCompressing}
                      className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5"
                    >
                      <Minimize2 className="w-5 h-5" />
                      <span>
                        {isCompressing
                          ? t.compressor.compressingBtn
                          : t.compressor.compressBtn}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">{t.common?.error || 'Error'}</p>
                      <p className="text-xs mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Result Section */}
                {result && (
                  <div ref={resultRef} className="pt-2 animate-in fade-in duration-300">
                    <ResultCard
                      result={result}
                      originalPreviewUrl={imageMeta?.previewUrl}
                      originalName={selectedFile.name}
                      onReset={handleReset}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {!hideEmbeddedSections && (
        <>
          {/* How It Works Section */}
          <section className="space-y-6 pt-4 text-start">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.compressor.howItWorksTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                {t.compressor.howItWorksSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-xs">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.step1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.step1Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-xs">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.step2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.step2Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base shadow-xs">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.step3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.step3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* Benefits / Trust Section */}
          <section className="space-y-6 pt-2 text-start">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.compressor.whyChooseTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                {t.compressor.whyChooseSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.benefit1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.benefit1Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.benefit2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.benefit2Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
                  <HardDrive className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.compressor.benefit3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.compressor.benefit3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions (Accordion) */}
          <section className="space-y-6 pt-2 text-start">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.compressor.faqTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                {t.compressor.faqSubtitle}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {t.compressor.faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Related Tools Links */}
          <section className="space-y-6 pt-4 text-start border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.compressor.relatedToolsTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t.compressor.relatedToolsSubtitle}
                </p>
              </div>
              <Link
                href="/"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>{t.common?.allTools || 'All Tools'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/resize-image"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all group block shadow-2xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <ResizeIcon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600">
                    {t.nav?.resize || 'Image Resizer'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.nav?.resizeDesc || 'Scale pixel dimensions & aspect ratios'}
                </p>
              </Link>

              <Link
                href="/convert-image"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all group block shadow-2xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600">
                    {t.nav?.convert || 'Image Converter'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.nav?.convertDesc || 'Convert between JPG, PNG, and WebP'}
                </p>
              </Link>

              <Link
                href="/crop-image"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 transition-all group block shadow-2xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <Crop className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600">
                    {t.nav?.crop || 'Image Cropper'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.nav?.cropDesc || 'Trim and frame photos with precise aspect ratios'}
                </p>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
