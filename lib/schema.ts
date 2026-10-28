import { SITE_URL, business, services, locations, homeFaqs } from '@/lib/site';
import { BOOKING_URL } from '@/lib/booking';

export const BUSINESS_ID = `${SITE_URL}/#business`;

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': BUSINESS_ID,
    name: business.name,
    alternateName: business.formerName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-dark.png`,
    image: `${SITE_URL}/images/hero-technician-engine-bay.webp`,
    description: business.summary,
    telephone: business.phoneE164,
    foundingDate: String(business.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    // TODO(client): add `geo` (GeoCoordinates) from the Google Business Profile pin — not guessed here.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:30',
        closes: '17:30',
      },
    ],
    areaServed: [business.city, ...locations.map((l) => l.name)].map((name) => ({
      '@type': 'City',
      name: `${name}, ${business.regionName}`,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto repair services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.short,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      name: 'Schedule an appointment',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: BOOKING_URL,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
      result: { '@type': 'Reservation', name: 'Auto repair appointment' },
    },
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  };
}

export function homeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** BreadcrumbList matching the URL hierarchy. Pass [{ name, path }], starting with Home. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === '/' ? '' : it.path}`,
    })),
  };
}

/** /services: an ItemList of Service entities, each linked to the business. */
export function servicesListSchema() {
  const areaServed = [business.city, ...locations.map((l) => l.name)].map((name) => ({
    '@type': 'City',
    name: `${name}, ${business.regionName}`,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Auto repair services at Revive Auto Care',
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${s.slug}#service`,
        name: s.name,
        serviceType: s.name,
        description: s.long,
        url: `${SITE_URL}/services/${s.slug}`,
        image: `${SITE_URL}${s.image}`,
        provider: { '@id': BUSINESS_ID },
        areaServed,
      },
    })),
  };
}

/** FAQPage for any visible Q&A block — pass exactly the questions/answers shown on the page. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** /about-us: AboutPage describing the business entity. */
export function aboutPageSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about-us#webpage`,
    url: `${SITE_URL}/about-us`,
    name: 'About Revive Auto Care',
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    mainEntity: { '@id': BUSINESS_ID },
  };
}

/** /contact-us: ContactPage pointing at the business entity. */
export function contactPageSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact-us#webpage`,
    url: `${SITE_URL}/contact-us`,
    name: 'Contact Revive Auto Care',
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    mainEntity: { '@id': BUSINESS_ID },
  };
}

/** /services/<slug>: a single Service linked to the business, with what it covers. */
export function serviceSchema(opts: { slug: string; name: string; description: string; image: string; covers: string[] }) {
  const areaServed = [business.city, ...locations.map((l) => l.name)].map((name) => ({
    '@type': 'City',
    name: `${name}, ${business.regionName}`,
  }));
  const url = `${SITE_URL}/services/${opts.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url,
    image: `${SITE_URL}${opts.image}`,
    provider: { '@id': BUSINESS_ID },
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${opts.name} — what’s included`,
      itemListElement: opts.covers.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c } })),
    },
  };
}

/** /locations/<town>: a WebPage about serving a nearby town from the shop. */
export function townPageSchema(opts: { slug: string; town: string; description: string }) {
  const url = `${SITE_URL}/locations/${opts.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: `Auto repair near ${opts.town}, IA`,
    description: opts.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    mentions: { '@type': 'City', name: `${opts.town}, ${business.regionName}` },
  };
}
