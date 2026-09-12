'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Progress } from '@/components/ui/Progress';
import { Tooltip } from '@/components/ui/Tooltip';
import { Separator } from '@/components/ui/Separator';
import { useApp } from '@/lib/context/AppContext';
import {
  Sliders,
  Type,
  Layers,
  Sparkles,
  Download,
  Info,
  Check,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

export function ComponentShowcase() {
  const { language } = useApp();
  const [sliderValue, setSliderValue] = useState(80);
  const [progressValue, setProgressValue] = useState(65);
  const [activeTab, setActiveTab] = useState('controls');
  const [selectedFormat, setSelectedFormat] = useState('webp');
  const [widthInput, setWidthInput] = useState('1920');
  const [heightInput, setHeightInput] = useState('1080');
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateProgress = () => {
    setIsSimulating(true);
    setProgressValue(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        setProgressValue(100);
        setIsSimulating(false);
        clearInterval(interval);
      } else {
        setProgressValue(current);
      }
    }, 200);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/70 dark:bg-slate-850/50 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="subtle" size="sm">
                {language === 'ar' ? 'المرحلة 1 مكتملة' : 'Phase 1 Active'}
              </Badge>
              <Badge variant="secondary" size="sm">
                Design System Foundation
              </Badge>
            </div>
            <CardTitle className="text-xl">
              {language === 'ar' ? 'معاينة عناصر واجهة المستخدم' : 'Interactive Component Sandbox'}
            </CardTitle>
            <CardDescription>
              {language === 'ar'
                ? 'العناصر البرمجية الموحدة المجهزة للأدوات القادمة (أزرار، منزلقات، تبويبات، حقول إدخال، ومؤشرات)'
                : 'Production-ready reusable controls ready for upcoming tools in Phases 2–5.'}
            </CardDescription>
          </div>

          <Tooltip
            content={
              language === 'ar'
                ? 'مبني وفق أعلى معايير إمكانية الوصول والتصميم الدقيق'
                : 'Fully accessible, RTL-ready, and theme-adaptive'
            }
            position="top"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>WCAG AA Compliant</span>
            </div>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList fullWidth className="mb-6">
            <TabsTrigger value="controls" icon={<SlidersHorizontal className="w-4 h-4" />}>
              {language === 'ar' ? 'التحكم والمقاييس' : 'Sliders & Progress'}
            </TabsTrigger>
            <TabsTrigger value="inputs" icon={<Type className="w-4 h-4" />}>
              {language === 'ar' ? 'المدخلات والأزرار' : 'Inputs & Buttons'}
            </TabsTrigger>
            <TabsTrigger value="badges" icon={<Layers className="w-4 h-4" />}>
              {language === 'ar' ? 'الشارات والتبويبات' : 'Badges & States'}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Sliders & Progress */}
          <TabsContent value="controls" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800">
                <Slider
                  label={language === 'ar' ? 'مستوى جودة الضغط' : 'Compression Quality'}
                  value={sliderValue}
                  onChange={setSliderValue}
                  min={10}
                  max={100}
                  step={5}
                  unit="%"
                  helperText={
                    language === 'ar'
                      ? 'مستوى الجودة الافتراضي الموصى به لمعظم ملفات الصور هو 80%'
                      : 'Recommended quality setting for web images is 80%.'
                  }
                  marks={[
                    { value: 20, label: '20%' },
                    { value: 50, label: '50%' },
                    { value: 80, label: '80%' },
                    { value: 100, label: '100%' },
                  ]}
                />
              </div>

              <div className="space-y-5 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <Progress
                    value={progressValue}
                    label={language === 'ar' ? 'معالجة الصورة في المتصفح' : 'In-Browser Processing'}
                    showValueLabel
                    variant={progressValue === 100 ? 'success' : 'default'}
                  />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {isSimulating
                        ? language === 'ar'
                          ? 'جاري المعالجة محلياً...'
                          : 'Processing locally...'
                        : language === 'ar'
                        ? 'انقر لتجربة مؤشر التقدم'
                        : 'Simulate background canvas work'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={isSimulating}
                      onClick={simulateProgress}
                      startIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    >
                      {language === 'ar' ? 'بدء محاكاة' : 'Simulate'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Inputs & Buttons */}
          <TabsContent value="inputs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label={language === 'ar' ? 'العرض (بكسل)' : 'Width (px)'}
                    value={widthInput}
                    onChange={(e) => setWidthInput(e.target.value)}
                    type="number"
                    suffix="PX"
                  />
                  <Input
                    label={language === 'ar' ? 'الارتفاع (بكسل)' : 'Height (px)'}
                    value={heightInput}
                    onChange={(e) => setHeightInput(e.target.value)}
                    type="number"
                    suffix="PX"
                  />
                </div>

                <Select
                  label={language === 'ar' ? 'الصيغة المستهدفة' : 'Target Format'}
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  options={[
                    { value: 'webp', label: 'WebP (Modern, highly efficient)' },
                    { value: 'jpeg', label: 'JPEG (Standard photo compatibility)' },
                    { value: 'png', label: 'PNG (Lossless with alpha channel)' },
                  ]}
                  helperText={
                    language === 'ar'
                      ? 'صيغة WebP توفر حجماً أصغر حتى 35% مقارنة بـ JPEG'
                      : 'WebP format yields up to 35% smaller file sizes than standard JPEG.'
                  }
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'أنماط الأزرار المتاحة' : 'Button Variations'}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <Button variant="primary" size="md">
                    {language === 'ar' ? 'زر رئيسي' : 'Primary Action'}
                  </Button>
                  <Button variant="secondary" size="md">
                    {language === 'ar' ? 'زر ثانوي' : 'Secondary'}
                  </Button>
                  <Button variant="outline" size="md">
                    {language === 'ar' ? 'مخطط' : 'Outline'}
                  </Button>
                  <Button variant="success" size="md" startIcon={<Download className="w-4 h-4" />}>
                    {language === 'ar' ? 'تنزيل النتيجة' : 'Download Result'}
                  </Button>
                  <Button variant="ghost" size="md">
                    {language === 'ar' ? 'شفاف' : 'Ghost'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Badges & Tooltips */}
          <TabsContent value="badges" className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'شارات الحالة (Status Badges)' : 'Status Badges'}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="subtle" icon={<Sparkles className="w-3 h-3" />}>
                  Subtle Blue
                </Badge>
                <Badge variant="success" icon={<Check className="w-3 h-3" />}>
                  Completed
                </Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Error State</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <Separator label={language === 'ar' ? 'أمثلة التلميحات السريعة' : 'Accessible Tooltips'} />

              <div className="flex items-center gap-4 flex-wrap">
                <Tooltip content="Tooltip displayed on hover or focus">
                  <Button variant="outline" size="sm">
                    Hover for Top Tooltip
                  </Button>
                </Tooltip>

                <Tooltip content="Informational note on privacy" position="bottom">
                  <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 cursor-help font-medium">
                    <Info className="w-3.5 h-3.5" />
                    <span>Bottom Tooltip</span>
                  </span>
                </Tooltip>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="bg-slate-50/50 dark:bg-slate-850/30 justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{language === 'ar' ? 'معمارية نقية بدون أي مكتبات ثقيلة' : 'Lightweight native Web APIs & Tailwind CSS v4'}</span>
        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">Phase 1 Standard</span>
      </CardFooter>
    </Card>
  );
}
