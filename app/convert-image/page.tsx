import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ConverterTool } from '@/components/tools/ConverterTool';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Free Online Image Converter — Convert JPG, PNG, WebP Online | Image Tools',
  description:
    'Convert images between JPG, PNG, and WebP instantly in your browser. 100% private, free, and secure client-side format conversion with zero server uploads.',
  alternates: {
    canonical: '/convert-image',
  },
  openGraph: {
    title: 'Free Online Image Converter — Convert JPG, PNG, WebP Online',
    description:
      'Convert images directly in your browser with exact pixel fidelity. Fast, free, and private conversion between JPG, PNG, and WebP with zero uploads.',
    url: '/convert-image',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Free Online Image Converter',
  url: 'https://imagetools.online/convert-image',
  description:
    'Free online image format converter to convert between JPG, PNG, and WebP directly in your browser with zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to convert image format online for free',
  description:
    'Step-by-step guide to converting image formats between JPG, PNG, and WebP directly in your browser without uploading to any server.',
  steps: [
    {
      name: 'Upload Image',
      text: 'Drag and drop or browse to choose a JPG, PNG, or WebP photo from your computer or mobile device.',
    },
    {
      name: 'Select Target Format',
      text: 'Choose your desired output format (JPG, PNG, or WebP) and adjust quality or background color options if applicable.',
    },
    {
      name: 'Convert and Download',
      text: 'Click "Convert Image Now" and instantly download your converted image file with zero server latency.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'How do I convert an image for free?',
    answer:
      'Drop your image into the upload box, select your target format (JPG, PNG, or WebP), click "Convert Image Now", and download your converted file instantly.',
  },
  {
    question: 'Can I convert transparent PNG to JPG?',
    answer:
      'Yes! Since JPEG does not support transparency, our converter lets you choose a background fill color (white by default) to render transparent areas cleanly without black artifacts.',
  },
  {
    question: 'Why should I convert JPG to WebP?',
    answer:
      'WebP provides 25% to 35% smaller file sizes than standard JPEG at equivalent visual quality, making your websites load substantially faster.',
  },
  {
    question: 'Can I convert WebP back to JPG or PNG?',
    answer:
      'Yes, our converter effortlessly turns WebP images into universal JPGs for older software or into PNGs for graphic design workflows.',
  },
  {
    question: 'Are my images uploaded to any server or cloud?',
    answer:
      'Never. All conversions happen entirely on your device using native HTML5 Canvas APIs. No data is stored or transmitted.',
  },
  {
    question: 'Does converting change the image dimensions?',
    answer:
      'No, the converter strictly maintains the exact original width and height in pixels.',
  },
  {
    question: 'Is this converter completely free to use?',
    answer:
      'Yes, 100% free with no account creation, no subscriptions, no watermarks, and no usage limits.',
  },
]);

export default function ConvertImagePage() {
  const breadcrumbItems = [
    { label: 'Tools', href: '/' },
    { label: 'Convert Image', isCurrent: true },
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
            <ConverterTool />
          </main>
        </Container>
      </div>
    </>
  );
}
