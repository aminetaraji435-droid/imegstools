import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ResizerTool } from '@/components/tools/ResizerTool';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Free Image Resizer — Change JPG, PNG, WebP Dimensions Online | Image Tools',
  description:
    'Resize photos and images online by width and height in pixels with aspect ratio lock. Fast, free in-browser resizing for JPG, PNG, and WebP with zero server uploads.',
  alternates: {
    canonical: '/resize-image',
  },
  openGraph: {
    title: 'Free Image Resizer — Change Image Dimensions Online',
    description:
      'Resize images directly in your browser with pixel precision and aspect ratio lock. 100% private, instant download, supports JPG, PNG, and WebP.',
    url: '/resize-image',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Free Image Resizer',
  url: 'https://imagetools.online/resize-image',
  description:
    'Free online image resizing tool to modify pixel width and height of JPG, PNG, and WebP images directly in your browser with zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to resize an image online for free',
  description:
    'Step-by-step guide to resizing image pixel dimensions in your browser without uploading to any server.',
  steps: [
    {
      name: 'Select Image',
      text: 'Drag and drop or browse to choose a JPG, PNG, or WebP photo from your computer or phone.',
    },
    {
      name: 'Set Dimensions',
      text: 'Type your target width or height in pixels, or select a popular preset like 1080x1080, 1920x1080, or 1280x720 with aspect-ratio lock.',
    },
    {
      name: 'Download Resized File',
      text: 'Click Resize Image and download your scaled image file instantly with zero server latency.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'How do I resize an image?',
    answer:
      'Select your photo, type your desired pixel width or height (or click a preset), and click "Resize Image Now". Your resized photo is generated instantly in your browser.',
  },
  {
    question: 'Does resizing crop my image?',
    answer:
      'No. Resizing recalculates the overall pixel dimensions of the full image without clipping or cropping any content. Cropping is handled by the dedicated Cropper tool.',
  },
  {
    question: 'Does resizing reduce image quality?',
    answer:
      'Our engine applies high-quality browser smoothing algorithms (imageSmoothingQuality="high"). Downscaling keeps images crisp and sharp, while significant upscaling will enlarge existing pixels.',
  },
  {
    question: 'Can I maintain the original aspect ratio?',
    answer:
      'Yes, the aspect ratio lock is enabled by default. Typing a new width automatically computes the matching height proportionally.',
  },
  {
    question: 'Can I resize an image to 1080 × 1080?',
    answer:
      'Yes! Simply click the "1080 × 1080 (Square)" button in the popular presets to set both dimensions with one click.',
  },
  {
    question: 'Can I enter custom dimensions?',
    answer:
      'Yes, you can manually type any pixel values into the Width and Height input boxes to fit your exact specifications.',
  },
  {
    question: 'Are my images uploaded to any server?',
    answer:
      'Never. Processing is 100% client-side inside your browser via Canvas and Web APIs. No server receives your images.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'JPG, PNG, and WebP formats are fully supported for both input and output.',
  },
  {
    question: 'Can I resize very large photos?',
    answer:
      'Yes. Files up to 50MB and resolutions up to 16,384 pixels are safely handled within browser memory boundaries.',
  },
]);

export default function ResizeImagePage() {
  const breadcrumbItems = [
    { label: 'Tools', href: '/' },
    { label: 'Resize Image', isCurrent: true },
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

          {/* Interactive Workspace */}
          <main>
            <ResizerTool />
          </main>
        </Container>
      </div>
    </>
  );
}
