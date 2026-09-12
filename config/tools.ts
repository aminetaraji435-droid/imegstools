export interface ToolDefinition {
  id: string;
  name: string;
  shortName: string;
  href: string;
  description: string;
  iconName: 'Minimize2' | 'Maximize2' | 'RefreshCw' | 'Crop' | 'FileImage' | 'Sparkles';
  badge?: string;
  popular?: boolean;
  supportedFormats: string[];
  features: string[];
  phase: number;
  status: 'active' | 'coming-soon';
}

export const TOOLS: ToolDefinition[] = [
  {
    id: 'compress',
    name: 'Image Compressor',
    shortName: 'Compress',
    href: '/compress-image',
    description: 'Drastically reduce JPG, PNG, and WebP file sizes while retaining optimal visual clarity.',
    iconName: 'Minimize2',
    badge: 'Popular',
    popular: true,
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Custom quality slider', 'Target file size option', 'Instant savings breakdown'],
    phase: 2,
    status: 'active',
  },
  {
    id: 'resize',
    name: 'Image Resizer',
    shortName: 'Resize',
    href: '/resize-image',
    description: 'Change image dimensions in pixels or percentage with aspect ratio lock and social media presets.',
    iconName: 'Maximize2',
    badge: 'Essential',
    popular: true,
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Aspect ratio lock', 'Social media presets', 'Pixel-exact resizing'],
    phase: 3,
    status: 'active',
  },
  {
    id: 'convert',
    name: 'Image Converter',
    shortName: 'Convert',
    href: '/convert-image',
    description: 'Quickly convert between JPG, PNG, and modern WebP formats in seconds without quality loss.',
    iconName: 'RefreshCw',
    badge: 'High Speed',
    popular: true,
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Alpha transparency support', 'Lossless & lossy options', 'Batch-ready engine'],
    phase: 4,
    status: 'active',
  },
  {
    id: 'crop',
    name: 'Image Cropper',
    shortName: 'Crop',
    href: '/crop-image',
    description: 'Trim photos with free-form handles or standard aspect ratios (1:1, 4:3, 16:9, 9:16).',
    iconName: 'Crop',
    badge: 'Precise',
    popular: true,
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Preset aspect ratios', 'Mobile-friendly touch handles', 'Crisp pixel export'],
    phase: 5,
    status: 'active',
  },
];

export interface SEOLandingPageDefinition {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  toolType: 'compress' | 'convert' | 'resize' | 'crop';
  badge: string;
}

export const SEO_LANDING_PAGES: SEOLandingPageDefinition[] = [
  {
    slug: 'compress-image-to-100kb',
    href: '/compress-image-to-100kb',
    title: 'Compress Image to 100KB',
    shortTitle: 'Compress to 100KB',
    description: 'Compress photos to under 100KB for government and job portal uploads.',
    toolType: 'compress',
    badge: '100KB',
  },
  {
    slug: 'compress-image-to-200kb',
    href: '/compress-image-to-200kb',
    title: 'Compress Image to 200KB',
    shortTitle: 'Compress to 200KB',
    description: 'Optimize image sizes to under 200KB for email newsletters and website speed.',
    toolType: 'compress',
    badge: '200KB',
  },
  {
    slug: 'jpg-to-png',
    href: '/jpg-to-png',
    title: 'Convert JPG to PNG',
    shortTitle: 'JPG to PNG',
    description: 'Convert JPEG photos into lossless PNG images with pixel-perfect fidelity.',
    toolType: 'convert',
    badge: 'JPG → PNG',
  },
  {
    slug: 'png-to-jpg',
    href: '/png-to-jpg',
    title: 'Convert PNG to JPG',
    shortTitle: 'PNG to JPG',
    description: 'Convert large PNG graphics into lightweight JPGs with custom background filling.',
    toolType: 'convert',
    badge: 'PNG → JPG',
  },
  {
    slug: 'webp-to-jpg',
    href: '/webp-to-jpg',
    title: 'Convert WebP to JPG',
    shortTitle: 'WebP to JPG',
    description: 'Convert downloaded WebP files into universally compatible JPEG images.',
    toolType: 'convert',
    badge: 'WebP → JPG',
  },
];

export interface PopularTask {
  title: string;
  href: string;
  description: string;
  tag: string;
}

export const POPULAR_TASKS: PopularTask[] = [
  {
    title: 'Compress to under 100 KB',
    href: '/compress-image-to-100kb',
    description: 'Strict constraint for government, exam, and visa application portals.',
    tag: '100KB',
  },
  {
    title: 'Compress to under 200 KB',
    href: '/compress-image-to-200kb',
    description: 'Standard size constraint for portal uploads and email attachments.',
    tag: '200KB',
  },
  {
    title: 'Convert WebP to JPG',
    href: '/webp-to-jpg',
    description: 'Make modern downloaded WebP files compatible with any legacy software.',
    tag: 'WebP → JPG',
  },
  {
    title: 'Convert JPG to PNG',
    href: '/jpg-to-png',
    description: 'Convert compressed JPGs to lossless PNG graphics for graphic design.',
    tag: 'JPG → PNG',
  },
  {
    title: 'Convert PNG to JPG',
    href: '/png-to-jpg',
    description: 'Convert heavy screenshots into lightweight, shareable JPG images.',
    tag: 'PNG → JPG',
  },
  {
    title: 'Resize for Instagram (1080x1080)',
    href: '/resize-image',
    description: 'Fit your photos perfectly to standard square feed dimensions.',
    tag: 'Resize',
  },
  {
    title: 'Crop 16:9 for YouTube Thumbnail',
    href: '/crop-image',
    description: 'Frame video thumbnails to the standard 16:9 widescreen ratio.',
    tag: 'Crop',
  },
];
