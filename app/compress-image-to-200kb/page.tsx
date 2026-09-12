import React from 'react';
import type { Metadata } from 'next';
import { ParametricToolPage } from '@/components/tools/ParametricToolPage';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Compress Image to 200KB Online Free — Fast & Clear | Image Tools',
  description:
    'Compress JPG, PNG, and WebP images to under 200KB directly in your browser. The golden standard for email attachments, web publishing, and admission portals.',
  alternates: {
    canonical: '/compress-image-to-200kb',
  },
  openGraph: {
    title: 'Compress Image to 200KB Online Free | Image Tools',
    description:
      'Reduce image file sizes to under 200KB with crystal-clear visual quality. 100% private in-browser tool with zero server uploads.',
    url: '/compress-image-to-200kb',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Compress Image to 200KB Tool',
  url: 'https://imagetools.online/compress-image-to-200kb',
  description:
    'Free client-side tool to reduce image file size to under 200KB for web performance, email attachments, and online submission forms.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to compress an image to under 200KB online',
  description:
    'Step-by-step instructions to resize and compress photos to meet 200 kilobyte requirements.',
  steps: [
    {
      name: 'Upload Photo',
      text: 'Drag and drop or select your JPG, PNG, or WebP photo from your computer or smartphone.',
    },
    {
      name: '200KB Target Selection',
      text: 'The tool defaults to the 200KB target preset with smart binary-search quality optimization.',
    },
    {
      name: 'Compress & Save',
      text: 'Click Compress Image to execute instant local browser processing and download your optimized photo.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'Why is 200KB the most popular image size constraint?',
    answer:
      '200KB strikes the sweet spot between high visual resolution and minimal bandwidth consumption. Most web CMS platforms (WordPress, Shopify) and email clients recommend under 200KB per image for optimal loading speeds.',
  },
  {
    question: 'Does 200KB compression degrade photo details?',
    answer:
      'No. At 200KB, modern image codecs preserve almost 100% of photographic fidelity, including fine textures and gradient shading, while stripping out unnecessary EXIF metadata and color redundancy.',
  },
  {
    question: 'Are my private photos uploaded to a cloud server?',
    answer:
      'Never. Processing takes place strictly within your browser via HTML5 Canvas. Your images are never transmitted or stored on any server.',
  },
  {
    question: 'Can I compress multiple formats to 200KB?',
    answer:
      'Yes, JPG, PNG, and WebP images are all supported. Output files are encoded efficiently to ensure compliance with the 200KB limit.',
  },
]);

export default function CompressImageTo200KBPage() {
  return (
    <>
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

      <ParametricToolPage
        toolType="compress"
        compressorProps={{
          initialMode: 'target-size',
          initialTargetPreset: '200',
          initialCustomTargetKb: '200',
        }}
        badgeText="200KB Target Optimizer"
        title="Compress Image to 200KB Online"
        subtitle="Reduce image file sizes to under 200KB while preserving pristine visual clarity. The ideal compression standard for website speed, email newsletters, and admission forms."
        breadcrumbs={[
          { label: 'Tools', href: '/' },
          { label: 'Compress Image', href: '/compress-image' },
          { label: 'Compress to 200KB', isCurrent: true },
        ]}
        howItWorks={{
          title: 'How to Compress an Image to 200KB in 3 Simple Steps',
          subtitle: 'Instant client-side optimization with zero registration or watermarks.',
          steps: [
            {
              step: 1,
              title: 'Upload Your Image',
              desc: 'Select or drag any JPG, PNG, or WebP photo from your computer or mobile device.',
            },
            {
              step: 2,
              title: 'Target Pre-Locked',
              desc: 'The tool is configured to the 200KB preset. You can tweak quality or proceed directly.',
            },
            {
              step: 3,
              title: 'Download Result',
              desc: 'Save your compressed photo instantly with detailed savings metrics and side-by-side preview.',
            },
          ],
        }}
        keyFeatures={{
          title: 'Why Choose Our 200KB Compressor?',
          subtitle: 'Engineered for maximum detail retention at high compression ratios.',
          items: [
            {
              icon: 'shield',
              title: 'Guaranteed Client Privacy',
              desc: 'Zero server uploads. Your personal and commercial media remains strictly on your device.',
            },
            {
              icon: 'zap',
              title: 'Sub-Second Browser Execution',
              desc: 'Leverages hardware-accelerated Canvas decoding for instantaneous compression results.',
            },
            {
              icon: 'sparkles',
              title: 'High-Fidelity Output',
              desc: 'Maintains vibrant colors and sharp contrasts without pixelated compression artifacts.',
            },
            {
              icon: 'sliders',
              title: 'Full Parameter Control',
              desc: 'Switch between target size mode and percentage quality slider anytime.',
            },
            {
              icon: 'layers',
              title: 'Web & Mobile Optimized',
              desc: 'Perfect for optimizing website assets to achieve 100/100 Google PageSpeed scores.',
            },
            {
              icon: 'download',
              title: 'No Limits or Subscriptions',
              desc: 'Free forever without hourly quotas, hidden fees, or promotional watermarks.',
            },
          ],
        }}
        comparisonMatrix={{
          title: '200KB Image Performance & Use Cases',
          subtitle: 'Where 200KB compression makes the biggest impact.',
          headers: ['Usage Context', 'Original File Size', '200KB Output Quality', 'Key Advantage'],
          rows: [
            {
              aspect: 'E-commerce Product Images',
              source: '3 MB – 6 MB',
              target: '95%+ Visual Sharpness',
              notes: 'Faster product page load times and higher checkout conversions',
            },
            {
              aspect: 'Blog & Editorial Photos',
              source: '2 MB – 5 MB',
              target: 'Crisp retina detail',
              notes: 'Drastically improves Core Web Vitals (LCP metric)',
            },
            {
              aspect: 'Email Campaign Headers',
              source: '1 MB – 3 MB',
              target: 'Clean color rendering',
              notes: 'Prevents Gmail clipping and mailbox delivery delays',
            },
            {
              aspect: 'Social Media & Portals',
              source: '4 MB – 8 MB',
              target: 'High dynamic range',
              notes: 'Bypasses upload restrictions on community forums and forms',
            },
          ],
        }}
        faq={{
          title: 'Frequently Asked Questions about 200KB Compression',
          subtitle: 'Common questions on file sizing, quality retention, and supported devices.',
          items: [
            {
              q: 'Why should I compress my images to 200KB for websites?',
              a: 'Google ranking algorithms prioritize fast-loading pages. Large uncompressed images (2MB+) cause slow LCP (Largest Contentful Paint) times. Keeping images under 200KB provides snappy page loads while maintaining high visual quality on Retina screens.',
            },
            {
              q: 'Can I compress PNG graphics to 200KB?',
              a: 'Yes. If a PNG image is too large due to complex photographic detail, the tool can optimize it as a lightweight JPEG or WebP to meet the 200KB threshold while keeping clarity intact.',
            },
            {
              q: 'What if I need a smaller file like 100KB or 50KB?',
              a: 'You can select the 100KB preset or type any custom target kilobyte size in the settings panel.',
            },
            {
              q: 'Does compressing to 200KB remove EXIF data?',
              a: 'Yes, browser Canvas re-encoding strips bloated camera metadata and GPS coordinates, keeping your file size minimal and your location private.',
            },
          ],
        }}
        relatedRoutes={[
          {
            title: 'Compress Image to 100KB',
            href: '/compress-image-to-100kb',
            description: 'Ultra-lightweight compression for strict exam forms and government portals.',
            badge: '100KB',
          },
          {
            title: 'Free Image Compressor',
            href: '/compress-image',
            description: 'Full-featured compression tool with manual quality slider.',
            badge: 'Standard',
          },
          {
            title: 'Convert WebP to JPG',
            href: '/webp-to-jpg',
            description: 'Convert WebP files to universally compatible JPEG format.',
            badge: 'Convert',
          },
          {
            title: 'Crop Image',
            href: '/crop-image',
            description: 'Crop photos to custom or standard aspect ratios.',
            badge: 'Crop',
          },
        ]}
      />
    </>
  );
}
