import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { TOOLS, SEO_LANDING_PAGES } from '@/config/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url || 'https://imagetools.online';
  const currentDate = new Date().toISOString();

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Core Tools
  TOOLS.forEach((tool) => {
    routes.push({
      url: `${baseUrl}${tool.href}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Targeted SEO Landing Pages
  SEO_LANDING_PAGES.forEach((page) => {
    routes.push({
      url: `${baseUrl}${page.href}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
