import React from 'react';
import type { Metadata } from 'next';
import { ParametricToolPage } from '@/components/tools/ParametricToolPage';
import {
  generateWebAppSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/types';

export const metadata: Metadata = {
  title: 'WebP to JPG Converter — Free Online Image Conversion | Image Tools',
  description:
    'Convert downloaded WebP images to universal JPG format in your browser. Fix "unsupported file format" errors and make WebP files viewable everywhere.',
  alternates: {
    canonical: '/webp-to-jpg',
  },
  openGraph: {
    title: 'WebP to JPG Converter — Free Online Image Conversion',
    description:
      'Convert modern WebP images into standard JPG files directly in your browser. 100% private with zero server uploads and instant download.',
    url: '/webp-to-jpg',
    type: 'website',
  },
};

const webAppSchema = generateWebAppSchema({
  name: 'WebP to JPG Converter',
  url: 'https://imagetools.online/webp-to-jpg',
  description:
    'Free client-side tool to convert WebP images into standard JPG/JPEG files with zero server uploads and maximum compatibility.',
  applicationCategory: 'MultimediaApplication',
});

const howToSchema = generateHowToSchema({
  name: 'How to convert WebP to JPG online for free',
  description:
    'Step-by-step instructions to convert modern WebP images into standard JPEG format for legacy editors and photo viewers.',
  steps: [
    {
      name: 'Upload WebP Image',
      text: 'Drag and drop or select your downloaded .webp file from your computer or smartphone.',
    },
    {
      name: 'JPG Target Pre-Selected',
      text: 'JPG format is pre-configured with optimal 85% quality encoding and white background fallback for transparent areas.',
    },
    {
      name: 'Convert & Download',
      text: 'Click Convert Image to render the JPG file and download immediately with universal compatibility.',
    },
  ],
});

const faqSchema = generateFAQSchema([
  {
    question: 'Why do I need to convert WebP to JPG?',
    answer:
      'Many older desktop software applications, photo viewers, legacy CMS platforms, and print shops cannot open or import .webp files. Converting WebP to standard JPG ensures 100% universal compatibility across all devices and programs.',
  },
  {
    question: 'How do WebP images end up on my computer?',
    answer:
      'Modern web browsers and search engines (like Google Chrome and Google Images) save photos in WebP format because it reduces web bandwidth. When you right-click "Save Image As", you often receive a .webp file instead of a .jpg.',
  },
  {
    question: 'Does converting WebP to JPG reduce image quality?',
    answer:
      'Our converter decodes WebP pixels directly in browser memory and re-encodes them to high-bitrate JPEG (85%+ quality), keeping visual differences completely imperceptible.',
  },
  {
    question: 'Is my WebP file uploaded to a remote server?',
    answer:
      'No. The conversion executes entirely within your browser using client-side HTML5 Canvas. Your images are never transmitted or stored on any server.',
  },
]);

export default function WebpToJpgPage() {
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
          acceptedFormats: ['image/webp'],
          lockedSourceFormatNote: 'Upload any modern WebP image to convert to universal JPG.',
        }}
        badgeText="WebP → JPG Converter"
        title="Convert WebP to JPG Online"
        subtitle="Transform downloaded .webp images into universally compatible JPEG files in seconds. Fix 'unsupported format' errors on older operating systems, photo editors, and printing services."
        breadcrumbs={[
          { label: 'Tools', href: '/' },
          { label: 'Convert Image', href: '/convert-image' },
          { label: 'WebP to JPG', isCurrent: true },
        ]}
        howItWorks={{
          title: 'How to Convert WebP to JPG in 3 Simple Steps',
          subtitle: 'Instant client-side decoding with zero installations or software required.',
          steps: [
            {
              step: 1,
              title: 'Upload WebP Image',
              desc: 'Select or drag your .webp file downloaded from Chrome or any website.',
            },
            {
              step: 2,
              title: 'JPG Target Pre-Locked',
              desc: 'Target format is pre-configured to high-fidelity JPG. Tweak quality if desired.',
            },
            {
              step: 3,
              title: 'Download & Use Anywhere',
              desc: 'Save your standard .jpg file immediately. Open in Photoshop, Word, or print shops.',
            },
          ],
        }}
        keyFeatures={{
          title: 'Why Use Our WebP to JPG Converter?',
          subtitle: 'Engineered specifically to solve WebP compatibility frustrations on every platform.',
          items: [
            {
              icon: 'shield',
              title: '100% In-Browser Privacy',
              desc: 'Your images are never sent over the internet or stored on cloud servers.',
            },
            {
              icon: 'zap',
              title: 'Instant Sub-Second Conversion',
              desc: 'Converts images directly in your browser RAM using hardware-accelerated Canvas decoding.',
            },
            {
              icon: 'sparkles',
              title: 'Universal Compatibility',
              desc: 'Produces clean JPG files that open on Windows, macOS, iOS, Android, and Photoshop.',
            },
            {
              icon: 'sliders',
              title: 'Quality & Background Controls',
              desc: 'Adjust JPG compression quality and choose custom fill colors for transparent WebP graphics.',
            },
            {
              icon: 'layers',
              title: 'Batch & Desktop Ready',
              desc: 'Compatible with all major desktop and mobile browsers with zero software installs.',
            },
            {
              icon: 'download',
              title: 'Free & Unrestricted',
              desc: 'No hourly conversion caps, watermarks, or account registration requirements.',
            },
          ],
        }}
        comparisonMatrix={{
          title: 'WebP vs. JPG Compatibility Matrix',
          subtitle: 'Why converting to JPG solves widespread compatibility hurdles.',
          headers: ['Application / Platform', 'WebP (Source)', 'JPG (Converted Result)', 'Notes'],
          rows: [
            {
              aspect: 'Modern Web Browsers (Chrome/Safari)',
              source: 'Supported (Fast)',
              target: '100% Supported',
              notes: 'Both formats render quickly on modern browsers',
            },
            {
              aspect: 'Older Photoshop / Word Versions',
              source: 'Often requires plugin / fails',
              target: 'Opens natively without errors',
              notes: 'JPG works in all versions of MS Office and Adobe Suite',
            },
            {
              aspect: 'Commercial Photo Print Kiosks',
              source: 'Not recognized',
              target: 'Fully supported by all print software',
              notes: 'Walgreens, CVS, and local print labs require JPG files',
            },
            {
              aspect: 'Operating System File Explorers',
              source: 'Generic icon / no thumbnail',
              target: 'Instant thumbnail previews',
              notes: 'JPG generates fast native previews in Windows Explorer & Mac Finder',
            },
          ],
        }}
        faq={{
          title: 'Frequently Asked Questions about WebP to JPG Conversion',
          subtitle: 'Everything you need to know about WebP compatibility and conversion.',
          items: [
            {
              q: 'Why did Google create WebP in the first place?',
              a: 'Google developed WebP to make websites load faster by providing smaller image sizes than JPG and PNG. However, many offline applications, printers, and older editors have not updated to support WebP.',
            },
            {
              q: 'What if my WebP image has a transparent background?',
              a: 'Because JPG does not support transparency, our converter blends transparent pixels seamlessly onto a solid white background (or any custom background color you choose).',
            },
            {
              q: 'Can I convert WebP to PNG instead if I need transparency?',
              a: 'Yes! Simply select "PNG" in the format dropdown inside the tool to preserve full alpha channel transparency.',
            },
            {
              q: 'Is there a limit on how many WebP files I can convert?',
              a: 'No. Since processing occurs 100% on your device, there are no server costs and therefore no conversion limits.',
            },
          ],
        }}
        relatedRoutes={[
          {
            title: 'Convert JPG to PNG',
            href: '/jpg-to-png',
            description: 'Convert JPG files to lossless PNG graphics.',
            badge: 'JPG → PNG',
          },
          {
            title: 'Convert PNG to JPG',
            href: '/png-to-jpg',
            description: 'Convert heavy PNG graphics into lightweight JPG images.',
            badge: 'PNG → JPG',
          },
          {
            title: 'Compress Image to 100KB',
            href: '/compress-image-to-100kb',
            description: 'Compress your newly converted JPG to under 100KB for application forms.',
            badge: '100KB',
          },
          {
            title: 'Crop Image',
            href: '/crop-image',
            description: 'Crop and reframe your photos to standard aspect ratios.',
            badge: 'Crop',
          },
        ]}
      />
    </>
  );
}
