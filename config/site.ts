export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  ogImage: string;
  navItems: {
    label: string;
    href: string;
    description?: string;
  }[];
  links: {
    github?: string;
    privacy: string;
    terms: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Image Tools',
  shortName: 'ImageTools',
  description:
    'Free, fast, and private online image utilities. Compress, resize, convert, and crop images directly in your browser with zero server uploads.',
  url: process.env.APP_URL || 'https://imagetools.app',
  ogImage: '/og-image.png',
  navItems: [
    { label: 'Compress', href: '/compress-image', description: 'Reduce JPG, PNG, and WebP file size' },
    { label: 'Resize', href: '/resize-image', description: 'Scale pixel dimensions & aspect ratios' },
    { label: 'Convert', href: '/convert-image', description: 'Switch between JPG, PNG, and WebP' },
    { label: 'Crop', href: '/crop-image', description: 'Trim images with preset aspect ratios' },
  ],
  links: {
    privacy: '#privacy',
    terms: '#terms',
  },
};
