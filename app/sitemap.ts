import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { LIVE_ROUTES } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return LIVE_ROUTES.filter((r) => r.index !== false).map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: r.lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
