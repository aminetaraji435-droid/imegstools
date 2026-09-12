import React from 'react';
import type { Metadata } from 'next';
import { ParametricToolPage } from '@/components/tools/ParametricToolPage';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'Compress Image to 100KB Online Free — Fast & Lossless Quality | Image Tools',
  description:
    'Compress JPG, PNG, and WebP images to under 100KB directly in your browser. Useful for application forms, resumes, email attachments, and services with 100KB upload limits.',
  alternates: {
    canonical: '/compress-image-to-100kb',
  },
  openGraph: {
    title: 'Compress Image to 100KB Online Free | Image Tools',
    description:
      'Reduce image file size to under 100KB in your browser. 100% private with zero server uploads and instant download.',
    url: '/compress-image-to-100kb',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'Compress Image to 100KB Tool',
  url: 'https://imagetools.online/compress-image-to-100kb',
  description:
    'Free client-side tool to reduce image file size to 100KB for application forms, portals, and web publishing.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to compress an image to under 100KB online',
  description:
    'Step-by-step instructions to resize and compress photos when a 100 kilobyte target size is desired.',
  steps: [
    {
      name: 'Upload Your Image',
      text: 'Drag and drop or browse to select your photo (JPG, PNG, or WebP) from your smartphone or computer.',
    },
    {
      name: 'Automatic 100KB Target Lock',
      text: 'The compressor is automatically pre-configured to the 100KB target preset with smart binary-search iterative optimization.',
    },
    {
      name: 'Compress & Download',
      text: 'Click Compress Image to execute local browser quantization and download your lightweight under-100KB file instantly.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'How does the compressor reduce an image to exactly 100KB?',
    answer:
      'Our engine uses an iterative binary search algorithm over canvas JPEG/WebP quantization parameters. It tests varying quality thresholds in browser memory within milliseconds until finding the exact highest-quality compression that produces a file under 100 KB.',
  },
  {
    question: 'Will my 100KB image still look sharp?',
    answer:
      'Yes. High-frequency pixel preservation algorithms ensure that facial features, document text, and photographic subjects remain clear and legible while eliminating bloated metadata and imperceptible color nuances.',
  },
  {
    question: 'Is it safe to upload passports, resumes, or certificates?',
    answer:
      'Absolutely. Unlike traditional online tools, your files are NEVER uploaded to any remote server. Everything is decoded and compressed 100% locally in your web browser RAM.',
  },
  {
    question: 'Can I compress large phone photos (10MB+) down to 100KB?',
    answer:
      'Yes! For very large multi-megapixel photos, our engine automatically calculates optimal downscaling alongside compression to ensure the image meets the 100KB limit without visual degradation.',
  },
  {
    question: 'What image formats can I compress to 100KB?',
    answer:
      'You can upload JPG, JPEG, PNG, and WebP files. The output will be formatted into an optimized JPG or WebP that guarantees the requested file size boundary.',
  },
]);

export default function CompressImageTo100KBPage() {
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
          initialTargetPreset: '100',
          initialCustomTargetKb: '100',
        }}
        badgeText="100KB Target Optimizer"
        title="Compress Image to 100KB Online"
        subtitle="Quickly reduce JPG, PNG, and WebP file sizes to under 100KB without blurry artifacts. Ideal for exam registrations, passport submissions, resume uploads, and online portals."
        breadcrumbs={[
          { label: 'Tools', href: '/' },
          { label: 'Compress Image', href: '/compress-image' },
          { label: 'Compress to 100KB', isCurrent: true },
        ]}
        howItWorks={{
          title: 'How to Compress an Image to Under 100KB in 3 Simple Steps',
          subtitle: 'No signups, no watermarks, and no server uploads required.',
          steps: [
            {
              step: 1,
              title: 'Upload Your Photo',
              desc: 'Select or drag any JPG, PNG, or WebP image from your phone, tablet, or desktop.',
            },
            {
              step: 2,
              title: 'Target Pre-Configured',
              desc: 'The tool is already locked to the 100KB target preset. Adjust further if needed or click compress.',
            },
            {
              step: 3,
              title: 'Download Instantly',
              desc: 'Save your optimized <100KB file right away. Inspect the preview to verify crystal-clear clarity.',
            },
          ],
        }}
        keyFeatures={{
          title: 'Why Use Our 100KB Image Compressor?',
          subtitle: 'Engineered specifically to solve strict upload size limits with zero privacy risk.',
          items: [
            {
              icon: 'shield',
              title: '100% Private & In-Browser',
              desc: 'Your sensitive ID documents, resumes, and personal photos never leave your device.',
            },
            {
              icon: 'zap',
              title: 'Iterative Binary Search Precision',
              desc: 'Automatically targets the maximum possible image quality while strictly respecting the 100KB threshold.',
            },
            {
              icon: 'sliders',
              title: 'Custom Size Flexibility',
              desc: 'Easily switch to 50KB, 200KB, or 500KB if your target requirements change.',
            },
            {
              icon: 'sparkles',
              title: 'High Perceptual Sharpness',
              desc: 'Preserves crisp lines, legible text, and true color tone across documents and portraits.',
            },
            {
              icon: 'download',
              title: 'Instant Download & No Limits',
              desc: 'Zero waiting queues, zero rate limits, and zero email capture walls.',
            },
            {
              icon: 'layers',
              title: 'Universal Format Compatibility',
              desc: 'Compatible with standard JPG, PNG, and WebP photos from any camera or phone.',
            },
          ],
        }}
        comparisonMatrix={{
          title: '100KB Compression Specifications',
          subtitle: 'Common use cases and parameter tradeoffs when compressing to 100KB.',
          headers: ['Document / Image Type', 'Typical Original Size', '100KB Quality Level', 'Suitability'],
          rows: [
            {
              aspect: 'Passport / ID Headshots',
              source: '3 MB – 8 MB',
              target: '90% – 95% Visual Match',
              notes: 'Government & visa upload portals (Schengen, US Visa, UPSC, SSC)',
            },
            {
              aspect: 'Resume & Certificate Scans',
              source: '2 MB – 5 MB',
              target: 'Crisp text rendering',
              notes: 'Job board submissions and email attachments',
            },
            {
              aspect: 'Website Banner / Hero Graphic',
              source: '1.5 MB – 4 MB',
              target: '85% WebP Quantization',
              notes: 'Ultra-fast Core Web Vitals performance on mobile networks',
            },
            {
              aspect: 'High-Res Landscape Photo',
              source: '10 MB – 20 MB',
              target: 'Scaled + Compressed',
              notes: 'Thumbnail preview or forum signature upload',
            },
          ],
        }}
        faq={{
          title: 'Frequently Asked Questions about 100KB Compression',
          subtitle: 'Everything you need to know about reducing images to 100KB safely.',
          items: [
            {
              q: 'Why do portals require images under 100KB?',
              a: 'Online portals for government applications, visa requests, colleges, and employment exams receive millions of submissions. Limiting uploads to 100KB ensures fast database storage and prevents server crashes.',
            },
            {
              q: 'Will my signature or ID text remain readable?',
              a: 'Yes. Our smart quantization engine preserves high-contrast text edges, preventing the blurry blur typical of low-quality online tools.',
            },
            {
              q: 'What if my original photo is 15MB from a modern phone?',
              a: 'The engine seamlessly downscales the canvas resolution while applying optimized quantization to reach the 100KB target with high sharpness.',
            },
            {
              q: 'Can I do this on my mobile phone?',
              a: 'Yes. The compressor runs in any modern iOS or Android web browser without needing any app installations.',
            },
          ],
        }}
        relatedRoutes={[
          {
            title: 'Compress Image to 200KB',
            href: '/compress-image-to-200kb',
            description: 'Target slightly higher resolution for larger portal limits and detailed documents.',
            badge: '200KB',
          },
          {
            title: 'Free Image Compressor',
            href: '/compress-image',
            description: 'Compress images with custom quality slider and full manual control.',
            badge: 'Standard',
          },
          {
            title: 'Convert JPG to PNG',
            href: '/jpg-to-png',
            description: 'Convert compressed JPGs to lossless PNG graphics.',
            badge: 'Convert',
          },
          {
            title: 'Resize Image Dimensions',
            href: '/resize-image',
            description: 'Change pixel dimensions with social media presets and aspect ratio lock.',
            badge: 'Resize',
          },
        ]}
      />
    </>
  );
}
