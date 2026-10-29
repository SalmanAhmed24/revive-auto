import { isReady } from './ported-pages';

/**
 * Routes that are built and live. Add each page here when it ships:
 * it goes into sitemap.xml and links to it start prefetching.
 */
export const LIVE_ROUTES: { path: string; lastModified: string; priority: number; /** false = live but noindex, kept out of sitemap */ index?: boolean }[] = [
  { path: '/', lastModified: '2026-10-26', priority: 1 },
  { path: '/services', lastModified: '2026-10-26', priority: 0.9 },
  { path: '/about-us', lastModified: '2026-10-26', priority: 0.7 },
  { path: '/reviews', lastModified: '2026-10-26', priority: 0.7 },
  { path: '/contact-us', lastModified: '2026-10-26', priority: 0.7 },
  { path: '/services/brake-service', lastModified: '2026-10-26', priority: 0.8 },
  { path: '/services/oil-change', lastModified: '2026-10-26', priority: 0.8 },
  { path: '/services/check-engine-light', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/electrical-service', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/ac-repair', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/vehicle-diagnostics', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/engine-repair', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/steering-suspension', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/transmission-service', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/services/battery-service', lastModified: '2026-10-27', priority: 0.8 },
  { path: '/locations', lastModified: '2026-10-28', priority: 0.8 },
  { path: '/locations/marion', lastModified: '2026-10-28', priority: 0.7 },
  { path: '/locations/hiawatha', lastModified: '2026-10-28', priority: 0.7 },
  { path: '/locations/robins', lastModified: '2026-10-28', priority: 0.7 },
  { path: '/locations/ely', lastModified: '2026-10-28', priority: 0.7 },
  { path: '/locations/swisher', lastModified: '2026-10-28', priority: 0.7 },
  { path: '/financing', lastModified: '2026-10-29', priority: 0.5, index: isReady('financing') },
  { path: '/careers', lastModified: '2026-10-29', priority: 0.5, index: isReady('careers') },
];

const live = new Set(LIVE_ROUTES.map((r) => r.path));
export const isLive = (href: string) => live.has(href);
