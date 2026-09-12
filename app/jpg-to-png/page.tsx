import React from 'react';
import type { Metadata } from 'next';
import { ParametricToolPage } from '@/components/tools/ParametricToolPage';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter — Free Online Image Conversion | Image Tools',
  description:
    'Convert JPG and JPEG images to lossless PNG format in your browser. Preserve pixel-perfect sharpness, prepare assets for graphic design, and eliminate compression artifacts.',
  alternates: {
    canonical: '/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Converter — Free Online Image Conversion',
    description:
      'Convert JPG images to PNG format directly in your browser. 100% private with zero server uploads and instant download.',
    url: '/jpg-to-png',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'JPG to PNG Converter',
  url: 'https://imagetools.online/jpg-to-png',
  description:
    'Free client-side tool to convert JPG and JPEG images into lossless PNG files with zero server uploads.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to convert JPG to PNG online for free',
  description:
    'Step-by-step instructions to convert JPEG photos to lossless PNG format without quality degradation.',
  steps: [
    {
      name: 'Upload JPG Image',
      text: 'Drag and drop or select your JPG or JPEG image from your device.',
    },
    {
      name: 'PNG Target Locked',
      text: 'PNG target format is pre-selected for lossless re-encoding.',
    },
    {
      name: 'Convert & Download',
      text: 'Click Convert Image to render the lossless PNG file and download immediately.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'Why should I convert a JPG to PNG?',
    answer:
      'PNG is a lossless format that does not introduce additional compression artifacts during subsequent edits. Converting JPG to PNG is ideal when preparing images for graphic design software, overlaying typography, or avoiding repeated generation loss.',
  },
  {
    question: 'Does converting JPG to PNG make the background transparent?',
    answer:
      'No. Standard JPG files do not contain an alpha transparency channel. The converted PNG will preserve the solid background of the JPG. However, the PNG format will now support transparency if you edit it in graphic software.',
  },
  {
    question: 'Why is the PNG file size sometimes larger than the original JPG?',
    answer:
      'JPG uses lossy compression which discards color information, whereas PNG uses lossless deflate compression. When saving an image in lossless PNG format, the file size reflects uncompressed bitmap data fidelity.',
  },
  {
    question: 'Are my images uploaded to any server?',
    answer:
      'Never. The entire conversion process executes inside your browser via HTML5 Canvas. Your files remain 100% private on your machine.',
  },
]);

export default function JpgToPngPage() {
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
          initialTargetFormat: 'image/png',
          acceptedFormats: ['image/jpeg'],
          lockedSourceFormatNote: 'Upload any standard JPG or JPEG photo to convert to PNG.',
        }}
        badgeText="JPG → PNG Converter"
        title="Convert JPG to PNG Online"
        subtitle="Transform JPEG photos into lossless, high-definition PNG images. Eliminate generational degradation, prepare graphics for digital design, and preserve crisp raster quality."
        breadcrumbs={[
          { label: 'Tools', href: '/' },
          { label: 'Convert Image', href: '/convert-image' },
          { label: 'JPG to PNG', isCurrent: true },
        ]}
        howItWorks={{
          title: 'How to Convert JPG to PNG in 3 Easy Steps',
          subtitle: 'Instant client-side raster conversion with zero setup.',
          steps: [
            {
              step: 1,
              title: 'Upload JPG / JPEG',
              desc: 'Select or drop your JPG photo from your computer or phone.',
            },
            {
              step: 2,
              title: 'Lossless PNG Encoding',
              desc: 'Target format is pre-locked to PNG for maximum fidelity rendering.',
            },
            {
              step: 3,
              title: 'Download New PNG',
              desc: 'Save your clean PNG file instantly without server latency.',
            },
          ],
        }}
        keyFeatures={{
          title: 'Why Use Our JPG to PNG Converter?',
          subtitle: 'Pure browser-based rasterization built for designers, developers, and creators.',
          items: [
            {
              icon: 'shield',
              title: '100% In-Browser Privacy',
              desc: 'Your photos are processed directly in your RAM with zero external server exposure.',
            },
            {
              icon: 'zap',
              title: 'Instant Hardware Acceleration',
              desc: 'Converts multi-megapixel photos in milliseconds using native browser Canvas APIs.',
            },
            {
              icon: 'sparkles',
              title: 'Lossless Bit-Depth',
              desc: 'Prevents further JPEG compression loss during ongoing graphic editing workflows.',
            },
            {
              icon: 'layers',
              title: 'Design-Ready Export',
              desc: 'Creates clean PNG files compatible with Figma, Photoshop, Illustrator, and Canva.',
            },
            {
              icon: 'download',
              title: 'Unlimited Free Conversions',
              desc: 'No daily limits, no file queues, and no watermark stamps on your images.',
            },
            {
              icon: 'sliders',
              title: 'Multi-Format Flexibility',
              desc: 'Switch to WebP or JPEG conversion anytime with a single click in the tool.',
            },
          ],
        }}
        comparisonMatrix={{
          title: 'JPG vs. PNG Format Comparison',
          subtitle: 'Understand the key differences and strengths of each image standard.',
          headers: ['Feature / Attribute', 'JPG / JPEG (Source)', 'PNG (Target Output)', 'Best Use Case'],
          rows: [
            {
              aspect: 'Compression Method',
              source: 'Lossy (DCT algorithm)',
              target: 'Lossless (Deflate/LZ77)',
              notes: 'PNG prevents loss of fine line detail and sharp vector edges',
            },
            {
              aspect: 'Transparency Support',
              source: 'No (Solid white/black fill)',
              target: 'Full 8-bit Alpha Channel',
              notes: 'PNG supports transparent cutouts, logos, and overlays',
            },
            {
              aspect: 'Ideal For',
              source: 'Continuous-tone photos',
              target: 'Logos, screenshots, UI art',
              notes: 'PNG delivers crisp typography and clean high-contrast edges',
            },
            {
              aspect: 'Editing Re-saving',
              source: 'Degrades with each save',
              target: 'Zero re-saving degradation',
              notes: 'PNG retains exact pixel values across multiple revisions',
            },
          ],
        }}
        faq={{
          title: 'Frequently Asked Questions about JPG to PNG Conversion',
          subtitle: 'Answers to common questions regarding transparency, quality, and file formats.',
          items: [
            {
              q: 'Will converting a JPG to PNG improve its quality?',
              a: 'Converting to PNG cannot recreate detail that was already lost during original JPG compression, but it prevents any further degradation and ensures that subsequent edits retain 100% pixel fidelity.',
            },
            {
              q: 'Why did my converted PNG file become larger in size?',
              a: 'JPG uses lossy algorithms that discard subtle color data to achieve smaller files. PNG is a lossless format that stores every pixel accurately, naturally resulting in a larger file size.',
            },
            {
              q: 'Can I convert JPEG files from my iPhone (HEIC/JPG)?',
              a: 'Yes! Any JPG or JPEG photo from your iPhone, Android, or digital camera converts seamlessly.',
            },
            {
              q: 'Is there any watermark added to the PNG?',
              a: 'Never. All our image tools produce 100% clean, unaltered output files with zero watermarks.',
            },
          ],
        }}
        relatedRoutes={[
          {
            title: 'Convert PNG to JPG',
            href: '/png-to-jpg',
            description: 'Convert heavy PNGs into compact, lightweight JPG photos.',
            badge: 'PNG → JPG',
          },
          {
            title: 'Convert WebP to JPG',
            href: '/webp-to-jpg',
            description: 'Make downloaded WebP images compatible with all legacy viewers.',
            badge: 'WebP → JPG',
          },
          {
            title: 'Image Compressor',
            href: '/compress-image',
            description: 'Reduce image file size while keeping visual quality high.',
            badge: 'Compress',
          },
          {
            title: 'Crop Image',
            href: '/crop-image',
            description: 'Crop and trim your PNG photos with precision frame tools.',
            badge: 'Crop',
          },
        ]}
      />
    </>
  );
}
