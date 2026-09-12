'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minimize2, Maximize2, RefreshCw, Crop, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { DropZone } from '@/components/ui/DropZone';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useComingSoon } from '@/components/ui/ComingSoonModal';

export function HomeQuickDropzone() {
  const router = useRouter();
  const { t } = useApp();
  const { openComingSoon } = useComingSoon();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const tools = [
    {
      id: 'compress',
      name: t.dropzone.tools.compress,
      desc: t.dropzone.tools.compressDesc,
      icon: Minimize2,
      phase: 2,
      active: true,
      href: '/compress-image',
      features: ['Target file size mode', 'Custom quality slider', 'Instant savings breakdown'],
    },
    {
      id: 'resize',
      name: t.dropzone.tools.resize,
      desc: t.dropzone.tools.resizeDesc,
      icon: Maximize2,
      phase: 3,
      active: true,
      href: '/resize-image',
      features: ['Aspect ratio lock', 'Social media presets', 'Pixel-exact resizing'],
    },
    {
      id: 'convert',
      name: t.dropzone.tools.convert,
      desc: t.dropzone.tools.convertDesc,
      icon: RefreshCw,
      phase: 4,
      active: false,
      href: '/convert-image',
      features: ['Alpha transparency support', 'Lossless & lossy options', 'Batch-ready engine'],
    },
    {
      id: 'crop',
      name: t.dropzone.tools.crop,
      desc: t.dropzone.tools.cropDesc,
      icon: Crop,
      phase: 5,
      active: false,
      href: '/crop-image',
      features: ['Preset aspect ratios', 'Mobile-friendly touch handles', 'Crisp pixel export'],
    },
  ];

  return (
    <div id="home-upload-container" className="w-full max-w-2xl mx-auto space-y-4">
      <DropZone
        selectedFile={selectedFile}
        onFileSelect={(file) => setSelectedFile(file)}
        onFileRemove={() => setSelectedFile(null)}
      />

      {selectedFile && (
        <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{t.dropzone.selectToolPrompt}</span>
              </p>
              <Badge variant="subtle" size="sm">
                {t.common?.ready || 'Ready'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    id={`select-tool-${tool.id}`}
                    type="button"
                    onClick={() => {
                      if (tool.active && tool.href) {
                        router.push(tool.href);
                      } else {
                        openComingSoon(tool.name, tool.phase, tool.features);
                      }
                    }}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-900 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-all text-center group cursor-pointer shadow-2xs"
                  >
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {tool.desc}
                    </span>
                    <span
                      className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        tool.active
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 group-hover:text-blue-700 dark:group-hover:text-blue-300'
                      }`}
                    >
                      {tool.active ? 'Active' : `Phase ${tool.phase}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
