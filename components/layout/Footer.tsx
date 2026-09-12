'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { Container } from '@/components/layout/Container';
import { useComingSoon } from '@/components/ui/ComingSoonModal';

export function Footer() {
  const { t, language } = useApp();

  const primaryTools = [
    { id: 'compress', name: t.nav.compress, href: '/compress-image' },
    { id: 'resize', name: t.nav.resize, href: '/resize-image' },
    { id: 'convert', name: t.nav.convert, href: '/convert-image' },
    { id: 'crop', name: t.nav.crop, href: '/crop-image' },
  ];

  const popularRoutes = [
    { name: 'Compress to 100KB', href: '/compress-image-to-100kb' },
    { name: 'Compress to 200KB', href: '/compress-image-to-200kb' },
    { name: 'Convert JPG to PNG', href: '/jpg-to-png' },
    { name: 'Convert PNG to JPG', href: '/png-to-jpg' },
    { name: 'Convert WebP to JPG', href: '/webp-to-jpg' },
  ];

  return (
    <footer
      id="site-footer"
      className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto transition-colors"
    >
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-start">
          {/* Col 1: Brand & Privacy Pledge */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'ar' ? 'أدوات الصور' : 'Image Tools'}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.footer.privacyBadge}</span>
            </div>
          </div>

          {/* Col 2: Core Image Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {t.footer.toolsTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {primaryTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    id={`footer-link-${tool.id}`}
                    href={tool.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer text-start"
                  >
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Fast Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {language === 'ar' ? 'أدوات شائعة' : 'Targeted Tools'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {popularRoutes.map((route, idx) => (
                <li key={idx}>
                  <Link
                    href={route.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start"
                  >
                    <span>{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {t.footer.whyTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.footer.noReg}</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.footer.speed}</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
                <span>{t.footer.zeroLogs}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()}{' '}
            {language === 'ar' ? 'أدوات الصور' : 'Image Tools'}. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 dark:text-slate-500">{t.footer.privacyFirst}</span>
            <span className="text-slate-400 dark:text-slate-500">{t.footer.cloudflare}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
