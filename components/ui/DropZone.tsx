'use client';

import React, { useState, useRef, useEffect, useCallback, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export interface DropZoneProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  acceptedFormats?: string[];
  maxSizeBytes?: number; // default 50MB
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  showPills?: boolean;
}

const DEFAULT_ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_MAX_SIZE = 50 * 1024 * 1024; // 50MB

export function DropZone({
  onFileSelect,
  onFileRemove,
  selectedFile = null,
  acceptedFormats = DEFAULT_ACCEPTED,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  disabled = false,
  isLoading = false,
  className,
  title,
  subtitle,
  showPills = true,
}: DropZoneProps) {
  const { t } = useApp();
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create preview URL with useMemo
  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  // Clean up object URL when previewUrl changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateAndSelect = useCallback(
    (file: File) => {
      setErrorMessage(null);

      // Validate MIME type
      const isAccepted = acceptedFormats.some((format) => {
        if (format.endsWith('/*')) {
          const baseType = format.split('/')[0];
          return file.type.startsWith(`${baseType}/`);
        }
        return file.type === format;
      });

      if (!isAccepted) {
        setErrorMessage(t.common?.invalidMime || t.dropzone.alertImageOnly);
        return;
      }

      // Validate size
      if (file.size > maxSizeBytes) {
        setErrorMessage(t.common?.fileTooLarge || 'File size exceeds maximum limit');
        return;
      }

      onFileSelect(file);
    },
    [acceptedFormats, maxSizeBytes, onFileSelect, t]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isLoading) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled || isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSelect(file);
      // Reset input value so re-selecting the exact same file fires onChange again
      e.target.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || isLoading) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    if (onFileRemove) {
      onFileRemove();
    }
  };

  // If a file is selected, show file preview card
  if (selectedFile) {
    return (
      <div
        id="dropzone-file-selected"
        className={cn(
          'relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition-all text-start',
          className
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {selectedFile.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                <span>•</span>
                <span className="uppercase font-medium">{selectedFile.type.split('/')[1] || 'IMAGE'}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={t.common?.remove || 'Remove file'}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 dark:text-slate-400 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-2 text-start', className)}>
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={acceptedFormats.join(',')}
        disabled={disabled || isLoading}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
      />

      <div
        role="button"
        tabIndex={disabled || isLoading ? -1 : 0}
        aria-label={title || t.dropzone.title}
        aria-disabled={disabled || isLoading}
        onClick={() => !disabled && !isLoading && fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
          isDragOver
            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 scale-[1.008]'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50/80 dark:hover:bg-slate-850/60',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          {title || t.dropzone.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
          {subtitle || t.dropzone.subtitle}
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors mb-4">
          <UploadCloud className="w-4 h-4" />
          <span>{t.common?.browse || 'Browse files'}</span>
        </div>

        {showPills && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
              <Zap className="w-3 h-3 text-amber-500" />
              {t.dropzone.pill1}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              {t.dropzone.pill2}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
              {t.dropzone.pill3}
            </span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
