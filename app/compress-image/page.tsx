import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CompressorTool } from '@/components/tools/CompressorTool';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Free Image Compressor — Reduce JPG, PNG, WebP File Size Online | Image Tools',
  description:
    'Compress images online without losing quality. Fast, free in-browser compression for JPG, PNG, and WebP. 100% private with zero server uploads and instant download.',
  alternates: {
    canonical: '/compress-image',
  },
  openGraph: {
    title: 'Free Image Compressor — Reduce JPG, PNG, WebP File Size Online',
    description:
      'Compress images directly in your browser with zero server uploads. 100% private, instant download, supports JPG, PNG, and WebP.',
    url: '/compress-image',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Free Image Compressor',
  url: 'https://imagetools.online/compress-image',
  description:
    'Free online image compression tool to reduce JPG, PNG, and WebP file sizes directly in your browser with zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to compress an image online for free',
  description:
    'Step-by-step guide to reducing image file size in your browser without uploading to any server.',
  steps: [
    {
      name: 'Select Image',
      text: 'Drag and drop or browse to select a JPG, PNG, or WebP photo from your computer or phone.',
    },
    {
      name: 'Adjust Settings',
      text: 'Choose your desired compression quality with the slider, or select a target size like 100KB, 200KB, or 500KB.',
    },
    {
      name: 'Download Compressed File',
      text: 'Click Compress Image and download your lightweight image file immediately with zero server latency.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'How does image compression work?',
    answer:
      'The compressor loads your image directly into your browser memory via HTML5 Canvas and re-encodes pixel matrices with mathematical quantization algorithms, removing redundant metadata and invisible color data while preserving high perceptual clarity.',
  },
  {
    question: 'Does the image get uploaded to a server?',
    answer:
      'Never. Processing is 100% client-side inside your browser. Your images never leave your computer or smartphone.',
  },
  {
    question: 'Can I compress JPEG images?',
    answer:
      'Yes! JPEG images compress exceptionally well, often achieving 60% to 85% reductions in file size while retaining excellent visual sharpness.',
  },
  {
    question: 'Can I compress PNG images?',
    answer:
      'Yes, PNG files are fully supported. Note that standard browser Canvas PNG export is lossless. For dramatic reductions in PNG file size, consider converting to WebP or JPEG.',
  },
  {
    question: 'Can I compress an image to 100KB, 200KB, or 500KB?',
    answer:
      'Yes. Switch to Target File Size mode and select a preset (100KB, 200KB, 500KB) or type a custom number. The engine performs iterative binary search approximations to match your requested size.',
  },
  {
    question: 'Will image quality decrease?',
    answer:
      'At our recommended 80% default setting, quality loss is virtually invisible to the human eye, while delivering massive file size savings.',
  },
  {
    question: 'What happens to my original image?',
    answer:
      'Your original file on your computer or phone remains completely untouched. The compressed image is saved as a new file with the "-compressed" suffix.',
  },
]);

export default function CompressImagePage() {
  const breadcrumbItems = [
    { label: 'Tools', href: '/' },
    { label: 'Compress Image', isCurrent: true },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="py-6 sm:py-10">
        <Container size="lg" className="space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Page Header */}
          <header className="space-y-3 text-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Compress Image Online
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Drastically reduce JPG, PNG, and WebP file sizes while retaining optimal visual
              clarity. 100% private in-browser compression with zero server uploads and instant
              download.
            </p>
          </header>

          {/* Interactive Workspace */}
          <main>
            <CompressorTool />
          </main>
        </Container>
      </div>
    </>
  );
}
