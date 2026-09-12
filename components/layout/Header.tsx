'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X, Sparkles, Clock } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';
import { useComingSoon } from '@/components/ui/ComingSoonModal';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useApp();
  const { openComingSoon } = useComingSoon();

  const navItems = [
    {
      id: 'compress',
      label: t.nav.compress,
      phase: 2,
      href: '/compress-image',
      active: true,
      description: t.nav.compressDesc,
      features: ['Custom quality slider', 'Target file size option', 'Instant savings breakdown'],
    },
    {
      id: 'resize',
      label: t.nav.resize,
      phase: 3,
      href: '/resize-image',
      active: true,
      description: t.nav.resizeDesc,
      features: ['Aspect ratio lock', 'Social media presets', 'Pixel-exact resizing'],
    },
    {
      id: 'convert',
      label: t.nav.convert,
      phase: 4,
      href: '/convert-image',
      active: true,
      description: t.nav.convertDesc,
      features: ['Alpha transparency support', 'Lossless & lossy options', 'Batch-ready engine'],
    },
    {
      id: 'crop',
      label: t.nav.crop,
      phase: 5,
      href: '/crop-image',
      active: false,
      description: t.nav.cropDesc,
      features: ['Preset aspect ratios', 'Mobile-friendly touch handles', 'Crisp pixel export'],
    },
  ];

  const handleToolClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    if (item.active && item.href) {
      setMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    openComingSoon(item.label, item.phase, item.features);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors"
    >
      <Container size="xl" className="h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          id="header-brand-logo"
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95 shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs group-hover:bg-blue-700 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight leading-none">
              {language === 'ar' ? 'أدوات ' : 'Image'}
              <span className="text-blue-600 dark:text-blue-400">
                {language === 'ar' ? 'الصور' : 'Tools'}
              </span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase mt-0.5">
              {t.brand.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item, idx) => {
            if (item.active && item.href) {
              return (
                <Link
                  key={idx}
                  id={`nav-link-${item.id}`}
                  href={item.href}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="inline-flex items-center text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
                    Active
                  </span>
                </Link>
              );
            }

            return (
              <button
                key={idx}
                id={`nav-link-${item.id}`}
                type="button"
                onClick={(e) => handleToolClick(e, item)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="inline-flex items-center text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 group-hover:border-blue-300 dark:group-hover:border-blue-700">
                  P{item.phase}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Privacy Pill, Language Selector & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Privacy Pill (desktop only) */}
          <div
            id="header-privacy-badge"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium"
            title={t.brand.processingNote}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.brand.zeroUploads}</span>
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Theme Toggle (Night / Day) */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item, idx) => {
              if (item.active && item.href) {
                return (
                  <Link
                    key={idx}
                    id={`mobile-nav-${item.id}`}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between text-start"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="inline-flex items-center text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
                        Active
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-normal truncate max-w-[150px]">
                      {item.description}
                    </span>
                  </Link>
                );
              }

              return (
                <button
                  key={idx}
                  id={`mobile-nav-${item.id}`}
                  type="button"
                  onClick={(e) => handleToolClick(e, item)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between text-start cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    <Badge variant="subtle" size="sm">
                      {t.common?.phase || 'Phase'} {item.phase}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-normal truncate max-w-[150px]">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.brand.zeroUploads}</span>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector variant="inline" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
