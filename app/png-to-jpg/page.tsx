import React from 'react';
import type { Metadata } from 'next';
import { ParametricToolPage } from '@/components/tools/ParametricToolPage';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter — Free Online Image Conversion | Image Tools',
  description:
    'Convert heavy PNG images to lightweight JPG / JPEG format directly in your browser. Drastically reduce file size, customize background fill color, and adjust quality.',
  alternates: {
    canonical: '/png-to-jpg',
  },
  openGraph: {
    title: 'PNG to JPG Converter — Free Online Image Conversion',
    description:
      'Convert PNG images to JPG format in your browser with adjustable compression and background color filling. 100% private with zero server uploads.',
    url: '/png-to-jpg',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'PNG to JPG Converter',
  url: 'https://imagetools.online/png-to-jpg',
  description:
    'Free client-side tool to convert PNG images to lightweight JPG/JPEG files with custom background color filling and zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to convert PNG to JPG online for free',
  description:
    'Step-by-step instructions to convert PNG graphics into lightweight JPEG photos with background color fill.',
  steps: [
    {
      name: 'Upload PNG Graphic',
      text: 'Drag and drop or select your PNG image from your computer or smartphone.',
    },
    {
      name: 'Choose Background & Quality',
      text: 'Select your preferred background color (default: white) for transparent areas and adjust quality.',
    },
    {
      name: 'Convert & Download',
      text: 'Click Convert Image to render the optimized JPG and download immediately.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'What happens to transparent backgrounds when converting PNG to JPG?',
    answer:
      'Because the JPG format does not support alpha transparency, transparent pixels are automatically replaced with a clean background color. You can choose solid white, black, or any custom color using the background color picker.',
  },
  {
    question: 'How much smaller will my file be after converting PNG to JPG?',
    answer:
      'For screenshots, artwork, or photos saved as PNG, converting to JPG typically yields a 60% to 90% reduction in file size, making it much easier to share via email or upload to web forms.',
  },
  {
    question: 'Can I adjust the JPG output quality?',
    answer:
      'Yes. Our tool provides a real-time quality slider (default: 85%) so you can balance file size savings against visual sharpness.',
  },
  {
    question: 'Are my PNG files stored or uploaded to a server?',
    answer:
      'Never. The conversion is performed 100% locally inside your web browser using HTML5 Canvas. Your images are never transmitted across the network.',
  },
]);

export default function PngToJpgPage() {
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
        toolType="convert"
        converterProps={{
          initialTargetFormat: 'image/jpeg',
          acceptedFormats: ['image/png'],
          lockedSourceFormatNote: 'Upload any PNG graphic or screenshot to convert to JPG.',
        }}
        badgeText="PNG → JPG Converter"
        title="Convert PNG to JPG Online"
        subtitle="Transform bulky PNG graphics and screenshots into lightweight, universally compatible JPG images. Save up to 90% file size with customizable quality and clean background filling."
        breadcrumbs={[
          { label: 'Tools', href: '/' },
          { label: 'Convert Image', href: '/convert-image' },
          { label: 'PNG to JPG', isCurrent: true },
        ]}
        howItWorks={{
          title: 'How to Convert PNG to JPG in 3 Simple Steps',
          subtitle: 'Instant client-side transformation with automatic transparency handling.',
          steps: [
            {
              step: 1,
              title: 'Upload PNG Image',
              desc: 'Select or drag any PNG file or screenshot from your device.',
            },
            {
              step: 2,
              title: 'Set Quality & Background',
              desc: 'Target format is pre-locked to JPG. Pick a background color for transparent pixels.',
            },
            {
              step: 3,
              title: 'Download Optimized JPG',
              desc: 'Save your lightweight JPG file immediately with instant savings breakdown.',
            },
          ],
        }}
        keyFeatures={{
          title: 'Why Convert PNG to JPG with Image Tools?',
          subtitle: 'Advanced client-side raster conversion with smart alpha matte handling.',
          items: [
            {
              icon: 'shield',
              title: '100% Private In-Browser',
              desc: 'Zero server uploads. Your personal screenshots and company graphics remain confidential.',
            },
            {
              icon: 'zap',
              title: 'Massive File Size Savings',
              desc: 'Reduces photographic and complex PNG file sizes by up to 90% without visible quality loss.',
            },
            {
              icon: 'layers',
              title: 'Custom Transparency Matte',
              desc: 'Easily fill transparent alpha channels with solid white, black, or custom hex color values.',
            },
            {
              icon: 'sliders',
              title: 'Fine-Grained Quality Control',
              desc: 'Fine-tune output quantization with our interactive slider from 1% to 100%.',
            },
            {
              icon: 'sparkles',
              title: 'Universal Device Compatibility',
              desc: 'JPG files open reliably on every phone, PC, printer, and legacy operating system.',
            },
            {
              icon: 'download',
              title: 'Instant Unlimited Downloads',
              desc: 'Convert as many files as you need without signup forms or hidden charges.',
            },
          ],
        }}
        comparisonMatrix={{
          title: 'PNG vs. JPG Conversion Overview',
          subtitle: 'Key benefits of converting bulky PNGs into lightweight JPG files.',
          headers: ['Parameter', 'PNG (Source)', 'JPG (Output Result)', 'Advantage'],
          rows: [
            {
              aspect: 'Typical File Size',
              source: '3 MB – 10 MB (Heavy)',
              target: '200 KB – 800 KB (Compact)',
              notes: 'Up to 90% reduction in storage space and bandwidth',
            },
            {
              aspect: 'Transparency',
              source: 'Transparent alpha background',
              target: 'Solid color background fill',
              notes: 'Clean matte matching your destination website or paper background',
            },
            {
              aspect: 'Compression',
              source: 'Lossless deflate algorithm',
              target: 'Adjustable lossy quantization',
              notes: 'Optimized for photos, real-world scenes, and wallpaper graphics',
            },
            {
              aspect: 'Compatibility',
              source: 'Supported on modern apps',
              target: '100% universal compatibility',
              notes: 'Works seamlessly on older printers, smart TVs, and government forms',
            },
          ],
        }}
        faq={{
          title: 'Frequently Asked Questions about PNG to JPG Conversion',
          subtitle: 'Common questions on background handling, quality settings, and file sizes.',
          items: [
            {
              q: 'Why does my transparent PNG get a black or white background when converted?',
              a: 'The JPEG standard has no concept of transparency (alpha channels). Our converter allows you to choose your desired background color (white, black, or custom hex) so your graphic looks natural and clean.',
            },
            {
              q: 'How much file size do I save converting PNG screenshots to JPG?',
              a: 'Screenshots taken on modern 4K or Retina screens often exceed 5MB to 10MB in PNG format. Converting them to JPG at 85% quality reduces the size to under 500KB with zero noticeable difference in quality.',
            },
            {
              q: 'Can I convert to WebP instead of JPG for web use?',
              a: 'Yes! WebP provides even better compression and preserves transparency. You can switch the target format to WebP right in the tool.',
            },
            {
              q: 'Does converting reduce the resolution or dimensions of my image?',
              a: 'No. The pixel width and height remain 100% identical. Only the internal encoding changes from PNG to JPG.',
            },
          ],
        }}
        relatedRoutes={[
          {
            title: 'Convert JPG to PNG',
            href: '/jpg-to-png',
            description: 'Convert JPGs to lossless PNG graphics for digital design.',
            badge: 'JPG → PNG',
          },
          {
            title: 'Convert WebP to JPG',
            href: '/webp-to-jpg',
            description: 'Convert WebP images into universally compatible JPEG files.',
            badge: 'WebP → JPG',
          },
          {
            title: 'Compress Image to 200KB',
            href: '/compress-image-to-200kb',
            description: 'Ensure your converted JPG is strictly under 200KB for portal uploads.',
            badge: '200KB',
          },
          {
            title: 'Resize Image',
            href: '/resize-image',
            description: 'Scale down image dimensions in pixels or percentage.',
            badge: 'Resize',
          },
        ]}
      />
    </>
  );
}
