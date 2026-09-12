'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HomeQuickDropzone } from '@/components/tools/HomeQuickDropzone';
import { ComponentShowcase } from '@/components/tools/ComponentShowcase';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useComingSoon } from '@/components/ui/ComingSoonModal';
import { useApp } from '@/lib/context/AppContext';
import {
  Minimize2,
  Maximize2,
  RefreshCw,
  Crop,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { t, language, dir } = useApp();
  const { openComingSoon } = useComingSoon();

  const coreTools = [
    {
      id: 'compress',
      name: t.nav.compress,
      description: t.nav.compressDesc,
      icon: Minimize2,
      phase: 2,
      active: true,
      href: '/compress-image',
      badge: language === 'ar' ? 'نشط الآن' : 'Active Now',
      features: ['Target file size mode', 'Custom quality slider', 'Instant savings breakdown'],
    },
    {
      id: 'resize',
      name: t.nav.resize,
      description: t.nav.resizeDesc,
      icon: Maximize2,
      phase: 3,
      active: true,
      href: '/resize-image',
      badge: language === 'ar' ? 'نشط الآن' : 'Active Now',
      features: ['Aspect ratio lock', 'Social media presets', 'Pixel-exact resizing'],
    },
    {
      id: 'convert',
      name: t.nav.convert,
      description: t.nav.convertDesc,
      icon: RefreshCw,
      phase: 4,
      active: true,
      href: '/convert-image',
      badge: language === 'ar' ? 'نشط الآن' : 'Active Now',
      features: ['Alpha transparency support', 'Lossless & lossy options', 'Batch-ready engine'],
    },
    {
      id: 'crop',
      name: t.nav.crop,
      description: t.nav.cropDesc,
      icon: Crop,
      phase: 5,
      active: true,
      href: '/crop-image',
      badge: language === 'ar' ? 'نشط الآن' : 'Active Now',
      features: ['Preset aspect ratios', 'Mobile-friendly touch handles', 'Crisp pixel export'],
    },
  ];

  const popularTasks = t.popularTasks.tasks.map((task, idx) => {
    const phases = [2, 4, 3, 5];
    const toolNames = [t.nav.compress, t.nav.convert, t.nav.resize, t.nav.crop];
    const hrefs = [
      '/compress-image-to-200kb',
      '/webp-to-jpg',
      '/resize-image',
      '/crop-image',
    ];
    return {
      ...task,
      phase: phases[idx],
      toolName: toolNames[idx],
      active: true,
      href: hrefs[idx],
    };
  });

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section id="hero-section" className="pt-10 sm:pt-14 text-center">
        <Container size="xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto mb-4 leading-tight">
            {t.hero.titleStart}
            <span className="text-blue-600 dark:text-blue-400">{t.hero.titleHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.hero.subtitle}
            <span className="block text-slate-500 dark:text-slate-400 font-normal text-xs sm:text-sm mt-2">
              {t.hero.features}
            </span>
          </p>

          {/* 2. Main Image Upload Dropzone */}
          <div className="mb-4">
            <HomeQuickDropzone />
          </div>
        </Container>
      </section>

      {/* 3. Core Tools Section */}
      <section id="popular-tools-section" className="py-14 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="subtle" size="sm" className="mb-2">
              {language === 'ar' ? 'أدوات المنصة الرئيسية' : 'Core Tool Suite'}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {t.popularTools.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {t.popularTools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  id={`tool-card-${tool.id}`}
                  hoverable
                  onClick={() => {
                    if (tool.active && tool.href) {
                      router.push(tool.href);
                    } else {
                      openComingSoon(tool.name, tool.phase, tool.features);
                    }
                  }}
                  className="flex flex-col justify-between group text-start cursor-pointer"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant={tool.active ? 'default' : 'secondary'}
                        size="sm"
                        className={tool.active ? 'bg-emerald-600 text-white dark:bg-emerald-600' : ''}
                      >
                        {tool.badge}
                      </Badge>
                    </div>

                    <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2 pb-4">
                    <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      {tool.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {tool.active ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="font-semibold">
                          {language === 'ar' ? 'جاهز للاستخدام' : 'Ready to use'}
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-500 dark:text-slate-400 font-normal">
                          {t.common?.comingSoon || 'Soon'} (P{tool.phase})
                        </span>
                      </span>
                    )}
                    <div className="flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      <span>{t.popularTools.openTool}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Phase 1 Design System & Component Showcase */}
      <section id="component-showcase-section" className="pt-4">
        <Container size="xl">
          <ComponentShowcase />
        </Container>
      </section>

      {/* 5. Why Use Image Tools / Trust Section */}
      <section id="trust-section" className="py-8">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {t.trust.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {t.trust.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            <Card className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.trust.p1Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.trust.p1Desc}
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-2xs">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.trust.p2Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.trust.p2Desc}
              </p>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-2xs">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.trust.p3Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.trust.p3Desc}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 6. How It Works Section */}
      <section id="how-it-works-section" className="py-14 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {t.howItWorks.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-2xs">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t.howItWorks.step1Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-2xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t.howItWorks.step2Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-2xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t.howItWorks.step3Title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 7. Popular Image Tasks Section */}
      <section id="popular-tasks-section" className="py-8">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                {t.popularTasks.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {t.popularTasks.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTasks.map((task, idx) => (
              <Card
                key={idx}
                id={`popular-task-${idx}`}
                hoverable
                onClick={() => {
                  if (task.active && task.href) {
                    router.push(task.href);
                  } else {
                    openComingSoon(task.toolName, task.phase);
                  }
                }}
                className="p-5 flex flex-col justify-between group text-start cursor-pointer"
              >
                <div>
                  <Badge variant="subtle" size="sm" className="mb-2.5">
                    {task.tag}
                  </Badge>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {task.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
                  <span>{t.popularTasks.startTask}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq-section" className="py-14 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container size="lg">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {t.faq.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((faq, idx) => (
              <Card
                key={idx}
                id={`faq-item-${idx}`}
                className="p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-start"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 ps-7 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
