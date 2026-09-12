'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Download,
  Sliders,
  Layers,
  FileImage,
  RefreshCw,
  Minimize2,
  Scaling,
  Crop,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs, BreadcrumbItem } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { CompressorTool, CompressorToolProps } from '@/components/tools/CompressorTool';
import { ConverterTool, ConverterToolProps } from '@/components/tools/ConverterTool';
import { useApp } from '@/lib/context/AppContext';

export interface ParametricStep {
  step: number;
  title: string;
  desc: string;
}

export interface ParametricFeature {
  icon?: 'shield' | 'zap' | 'sparkles' | 'sliders' | 'lock' | 'download' | 'layers';
  title: string;
  desc: string;
}

export interface ParametricFAQ {
  q: string;
  a: string;
}

export interface ParametricComparisonRow {
  aspect: string;
  source: string;
  target: string;
  notes: string;
}

export interface ParametricToolPageProps {
  toolType: 'compress' | 'convert';
  compressorProps?: CompressorToolProps;
  converterProps?: ConverterToolProps;
  badgeText?: string;
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  howItWorks: {
    title: string;
    subtitle: string;
    steps: ParametricStep[];
  };
  keyFeatures: {
    title: string;
    subtitle: string;
    items: ParametricFeature[];
  };
  comparisonMatrix?: {
    title: string;
    subtitle: string;
    headers: [string, string, string, string];
    rows: ParametricComparisonRow[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: ParametricFAQ[];
  };
  relatedRoutes?: {
    title: string;
    href: string;
    description: string;
    badge?: string;
  }[];
}

export function ParametricToolPage({
  toolType,
  compressorProps,
  converterProps,
  badgeText = '100% Client-Side Free Tool',
  title,
  subtitle,
  breadcrumbs,
  howItWorks,
  keyFeatures,
  comparisonMatrix,
  faq,
  relatedRoutes = [],
}: ParametricToolPageProps) {
  const { dir } = useApp();
  const isRTL = dir === 'rtl';

  const renderFeatureIcon = (icon?: string) => {
    switch (icon) {
      case 'shield':
      case 'lock':
        return <ShieldCheck className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      case 'sliders':
        return <Sliders className="w-5 h-5" />;
      case 'download':
        return <Download className="w-5 h-5" />;
      case 'layers':
        return <Layers className="w-5 h-5" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-6 sm:py-10 space-y-12 sm:space-y-16">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <header className="space-y-4 text-start">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" size="md" className="gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </Badge>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Zero Server Uploads
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Instant Processing
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </header>

        {/* Embedded Interactive Tool */}
        <main className="pt-2">
          {toolType === 'compress' ? (
            <CompressorTool {...compressorProps} hideEmbeddedSections={true} />
          ) : (
            <ConverterTool {...converterProps} hideEmbeddedSections={true} />
          )}
        </main>
      </Container>

      {/* Structured Educational & SEO Content Blocks */}
      <Container size="lg" className="space-y-12 sm:space-y-16">
        {/* 1. Step-by-Step "How It Works" Section */}
        <section className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {howItWorks.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              {howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {howItWorks.steps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-base shrink-0 shadow-2xs">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Key Features & Benefits */}
        <section className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {keyFeatures.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              {keyFeatures.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.items.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  {renderFeatureIcon(feat.icon)}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Comparison Matrix Table (Optional) */}
        {comparisonMatrix && (
          <section className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {comparisonMatrix.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {comparisonMatrix.subtitle}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                    {comparisonMatrix.headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className={`p-3.5 font-bold text-slate-800 dark:text-slate-200 ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {comparisonMatrix.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        {row.aspect}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">
                        {row.source}
                      </td>
                      <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                        {row.target}
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. Frequently Asked Questions */}
        <section className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {faq.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {faq.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {faq.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2"
              >
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Related Routes & Cross-Navigation */}
        {relatedRoutes.length > 0 && (
          <section className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Related Image Conversion & Optimization Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore dedicated tools for other popular formats, targets, and photo dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {relatedRoutes.map((route, idx) => (
                <Link
                  key={idx}
                  href={route.href}
                  className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <FileImage className="w-4 h-4" />
                      </div>
                      {route.badge && (
                        <Badge variant="subtle" size="sm">
                          {route.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {route.title}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Open Tool</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
