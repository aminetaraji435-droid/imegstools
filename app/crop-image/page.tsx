import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CropperTool } from '@/components/tools/CropperTool';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Free Online Image Cropper — Crop JPG, PNG, WebP with Aspect Ratios | Image Tools',
  description:
    'Crop images online with freeform or preset aspect ratios (1:1, 4:3, 16:9, 9:16). 100% private, free client-side image cropping with zero server uploads.',
  alternates: {
    canonical: '/crop-image',
  },
  openGraph: {
    title: 'Free Online Image Cropper — Crop Images with Preset Aspect Ratios',
    description:
      'Crop and frame photos directly in your browser with pixel precision. Fast, free, touch-friendly, and 100% private in-browser image cropper.',
    url: '/crop-image',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Free Online Image Cropper',
  url: 'https://imagetools.online/crop-image',
  description:
    'Free online image cropper with custom and fixed aspect ratios (1:1, 4:3, 16:9, 9:16) directly in your browser with zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to crop an image online for free',
  description:
    'Step-by-step guide to cropping and framing photos with custom or locked aspect ratios in your browser without uploading to any server.',
  steps: [
    {
      name: 'Upload Image',
      text: 'Drag and drop or browse to choose a JPG, PNG, or WebP photo from your computer, phone, or tablet.',
    },
    {
      name: 'Adjust Crop Area and Aspect Ratio',
      text: 'Select an aspect ratio preset (such as 1:1 for Instagram, 16:9 for YouTube, 9:16 for Stories) or drag the handles freely to frame your desired area.',
    },
    {
      name: 'Crop and Download',
      text: 'Click "Crop & Export Image" to extract the selected bounds and instantly download your clean, framed image file.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'How do I crop an image for free online?',
    answer:
      'Drop your image into the workspace, adjust the crop box or select an aspect ratio preset (such as 1:1 or 16:9), and click "Crop & Export Image" to download your result immediately.',
  },
  {
    question: 'Can I crop an image into a perfect 1:1 square for Instagram or avatars?',
    answer:
      'Yes! Simply select the 1:1 preset and the crop selector will automatically lock to a square aspect ratio, letting you position and frame your subject effortlessly.',
  },
  {
    question: 'Does cropping reduce image quality?',
    answer:
      'No. The pixels within your selected crop area maintain 100% of their original visual sharpness and fidelity.',
  },
  {
    question: 'What image formats can I crop?',
    answer:
      'You can crop JPG, PNG, and WebP images, and choose whether to export in the original format or convert to a new format simultaneously.',
  },
  {
    question: 'Does the cropper work on iPhone, iPad, and Android?',
    answer:
      'Yes, the crop interface is fully touch-optimized with smooth gesture handling and responsive handles for mobile devices.',
  },
  {
    question: 'Are my images uploaded to a cloud server?',
    answer:
      'Never. All decoding, coordinate calculation, and canvas rendering happen locally in your web browser.',
  },
  {
    question: 'Is this cropping tool free to use?',
    answer:
      'Yes, 100% free with no account required, no watermark added, and no daily limits.',
  },
]);

export default function CropImagePage() {
  const breadcrumbItems = [
    { label: 'Tools', href: '/' },
    { label: 'Crop Image', isCurrent: true },
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
            <CropperTool />
          </main>
        </Container>
      </div>
    </>
  );
}
