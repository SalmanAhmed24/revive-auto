import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Staging must be noindex: set NEXT_PUBLIC_NOINDEX=1 on preview deploys only. Never on production.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === '1') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
