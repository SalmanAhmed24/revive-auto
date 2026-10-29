/**
 * Content for /financing and /careers.
 *
 * PENDING (client): both designs say the existing page on reviveautocareia.com
 * "carries over unchanged — port its current content here at launch". Paste each page's
 * current content into its `sections` below (same words, same terms, same links).
 *
 * While a page's `sections` is empty it is live (hero + closing band, as designed) but marked
 * noindex and kept out of sitemap.xml, so a near-empty page isn't indexed. Adding the first
 * section makes it indexable automatically.
 *
 * Copy supports inline links as [label](/path), [label](https://…) or [label](mailto:…);
 * a blank line starts a new paragraph.
 */
export type PortedSection = {
  /** Small label above the heading, e.g. "How it works" or "Open positions". */
  kicker?: string;
  heading: string;
  body: string;
  /** Optional button: a lender's "Apply now" link, an application form, or a mailto: address. */
  cta?: { label: string; href: string };
};

export type PortedPage = {
  path: string;
  /** Breadcrumb + H1 */
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  /** CSS object-position for the hero photo */
  heroFocus?: string;
  ctaTitle: string;
  sections: PortedSection[];
};

const callLine = 'Call Revive Auto Care at (319) 261-0999, Monday through Thursday, 7:30 AM to 5:30 PM.';

export const portedPages = {
  financing: {
    path: '/financing',
    title: 'Financing',
    metaTitle: 'Financing | Revive Auto Care, Cedar Rapids IA',
    metaDescription: `Questions about paying for a repair at Revive Auto Care in Cedar Rapids? ${callLine}`,
    heroImage: '/images/tools-wrench-drawer.webp',
    ctaTitle: 'Questions about paying for a repair?',
    sections: [
      // Paste the current reviveautocareia.com financing content here, e.g.
      // { kicker: 'Apply online', heading: '…', body: 'Paragraph…\n\nParagraph…', cta: { label: 'Apply now', href: 'https://…' } },
    ],
  },
  careers: {
    path: '/careers',
    title: 'Careers',
    metaTitle: 'Careers | Revive Auto Care, Cedar Rapids IA',
    metaDescription: `Want to work at Revive Auto Care, a family-owned auto repair shop in Cedar Rapids, IA? ${callLine}`,
    heroImage: '/images/technician-engine-wiring.webp',
    heroFocus: '50% 30%',
    ctaTitle: 'Want to work at the shop?',
    sections: [
      // Paste the current reviveautocareia.com careers content here, e.g.
      // { kicker: 'Open positions', heading: '…', body: '…', cta: { label: 'Apply', href: 'mailto:…' } },
    ],
  },
} satisfies Record<string, PortedPage>;

export type PortedKey = keyof typeof portedPages;
export const isReady = (key: PortedKey) => (portedPages[key].sections as PortedSection[]).length > 0;
