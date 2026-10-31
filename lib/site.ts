/**
 * Single source of truth for business facts.
 * Every value here must match the Google Business Profile character-for-character.
 * Edit copy here — components read from this file.
 */

// TODO(client): confirm the production domain. Set NEXT_PUBLIC_SITE_URL in the host env.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.reviveautocare.com').replace(/\/$/, '');

export const business = {
  name: 'Revive Auto Care',
  formerName: 'Big Jim’s Automotive',
  phoneDisplay: '(319) 261-0999',
  phoneE164: '+13192610999',
  street: '2109 N Towne Ln NE',
  city: 'Cedar Rapids',
  region: 'IA',
  regionName: 'Iowa',
  postalCode: '52402',
  country: 'US',
  foundingYear: 1989,
  hoursShort: 'Mon–Thu · 7:30 AM – 5:30 PM',
  hoursSentence: 'Monday through Thursday, 7:30 AM to 5:30 PM',
  ratings: {
    google: { value: '4.6', count: 359 },
    carfax: { value: '4.9', count: 32 },
  },
  vehicles: {
    serviced: ['Domestic', 'Asian-import', 'Select hybrid', 'Commercial fleet'],
    notServiced: 'European makes',
  },
  summary:
    'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We do not service European makes.',
  // TODO(client): add Google Business Profile, Facebook, Instagram URLs once confirmed.
  sameAs: [] as string[],
} as const;

export const fullAddress = `${business.street}, ${business.city}, ${business.region} ${business.postalCode}`;

export type Service = {
  slug: string;
  name: string;
  /** One-liner used on the home page service board. */
  short: string;
  /** Card description on /services (copy from the approved services page). */
  long: string;
  /** Three "what's covered" items shown on the /services card. */
  includes: [string, string, string];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: 'brake-service',
    name: 'Brake Service',
    short: 'Inspection and repair of the full braking system.',
    long: 'A full inspection of the braking system, plus repairs to pads, rotors, calipers, and more.',
    includes: ['Brake pads', 'Rotors', 'Calipers'],
    image: '/images/service-brake.webp',
    alt: 'Close-up of a drilled brake rotor and caliper during a brake service in Cedar Rapids',
  },
  {
    slug: 'oil-change',
    name: 'Oil Change',
    short: 'Oil and filter service with a condition inspection.',
    long: 'Oil and filter service with a vehicle condition inspection.',
    includes: ['Oil to vehicle spec', 'New filter', 'Fluid levels'],
    image: '/images/service-oil-change.webp',
    alt: 'Fresh motor oil pouring into an engine during an oil change',
  },
  {
    slug: 'check-engine-light',
    name: 'Check Engine Light',
    short: 'Warning-light diagnosis and next steps.',
    long: 'Diagnosis of warning lights, with clear guidance on what to do next.',
    includes: ['Check engine lights', 'Other warning indicators', 'Diagnosis & repair'],
    image: '/images/service-check-engine-light.webp',
    alt: 'Dashboard instrument cluster glowing with a warning light',
  },
  {
    slug: 'ac-repair',
    name: 'A/C Repair',
    short: 'Find and fix the cause of weak cooling.',
    long: 'Leak detection, performance testing, and repair of cooling system parts.',
    includes: ['Leak detection', 'Performance testing', 'Compressor concerns'],
    image: '/images/service-ac-repair.webp',
    alt: 'Driver’s-eye view of a lit dashboard on the road at dusk',
  },
  {
    slug: 'vehicle-diagnostics',
    name: 'Vehicle Diagnostics',
    short: 'Testing before repairs.',
    long: 'Professional testing to find the cause before any repair.',
    includes: ['Check-engine lights', 'Electrical concerns', 'Driveability complaints'],
    image: '/images/service-vehicle-diagnostics.webp',
    alt: 'Technician reviewing diagnostic results at a workbench in a bright repair shop',
  },
  {
    slug: 'engine-repair',
    name: 'Engine Repair',
    short: 'Component work to major mechanical repair.',
    long: 'From external components to major mechanical work.',
    includes: ['Timing systems', 'Cooling components', 'Seals & gaskets'],
    image: '/images/service-engine-repair.webp',
    alt: 'Engine serpentine belt and pulleys during engine repair',
  },
  {
    slug: 'steering-suspension',
    name: 'Steering & Suspension',
    short: 'Handling and ride problems.',
    long: 'Handling, tire wear, vibration, and noise diagnosed and repaired.',
    includes: ['Ball joints', 'Control arms', 'Tie rods'],
    image: '/images/service-steering-suspension.webp',
    alt: 'Technician working on a vehicle’s suspension from underneath',
  },
  {
    slug: 'transmission-service',
    name: 'Transmission Service',
    short: 'Fluid service, leaks, and shifting concerns.',
    long: 'Fluid maintenance, leak repairs, and shifting concerns.',
    includes: ['Fluid drain-and-refill', 'Filter replacement', 'Leak repairs'],
    image: '/images/service-transmission.webp',
    alt: 'Engine bay with fluid reservoirs and components ready for transmission service',
  },
  {
    slug: 'electrical-service',
    name: 'Electrical Service',
    short: 'Wiring, sensors, and charging systems.',
    long: 'Starting, charging, wiring, sensors, and control modules.',
    includes: ['Starting & charging', 'Wiring', 'Sensors'],
    image: '/images/service-electrical.webp',
    alt: 'Vehicle electrical terminals and wiring being tested',
  },
  {
    slug: 'battery-service',
    name: 'Battery Service',
    short: 'Testing, replacement, and system checks.',
    long: 'Testing, replacement, and charging-system checks.',
    includes: ['Battery testing', 'Replacement', 'Charging voltage'],
    image: '/images/service-battery.webp',
    alt: 'Red jumper clamp attached to a 12V car battery during battery testing',
  },
];

export const locations = [
  { slug: 'marion', name: 'Marion' },
  { slug: 'hiawatha', name: 'Hiawatha' },
  { slug: 'robins', name: 'Robins' },
  { slug: 'ely', name: 'Ely' },
  { slug: 'swisher', name: 'Swisher' },
] as const;

export const timeline = [
  { year: '1989', title: 'Big Jim’s Automotive', text: 'The shop opens in Cedar Rapids.', more: '1989 is the original founding date.' },
  { year: '2020', title: 'Andy takes over', text: 'Andy purchases the business.' },
  { year: 'Jan 2023', title: 'Full buyout', text: 'Andy completes the full buyout of the shop.' },
  { year: '2025', title: 'Revive Auto Care', text: 'The business takes on the Revive Auto Care name.' },
] as { year: string; title: string; text: string; more?: string }[];

export const workflow = [
  { n: '01', title: 'Find the cause', text: 'Every job starts by finding the cause of the problem.' },
  { n: '02', title: 'Recommend the repair', text: 'The repair recommendation comes after the cause is found.' },
  { n: '03', title: 'Estimate first', text: 'You get an estimate before work begins — no flat published prices.' },
];

/** Visible FAQ text and FAQPage schema both read from here, so they always match exactly. */
export const homeFaqs = [
  {
    q: 'Does Revive Auto Care work on hybrids and imports?',
    a: 'Yes. Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It does not service European makes.',
  },
  { q: 'Does Revive Auto Care work on European cars?', a: 'No. We do not service European makes.' },
  {
    q: 'What are Revive Auto Care’s hours?',
    a: 'Revive Auto Care is open Monday through Thursday, 7:30 AM to 5:30 PM, and closed Friday through Sunday.',
  },
  {
    q: 'Where is Revive Auto Care located?',
    a: 'Revive Auto Care is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402, and serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher.',
  },
  {
    q: 'Do I get an estimate before work begins?',
    a: 'Yes. Every job starts by finding the cause of the problem, and you get an estimate before work begins — there are no flat published prices.',
  },
];

/**
 * Where "See every review on Google" points.
 * TODO(client): set NEXT_PUBLIC_GOOGLE_REVIEWS_URL to the exact Google Business Profile reviews link.
 * Until then it opens Google Maps on the shop's name + address, which lands on the same profile.
 */
export const googleReviewsUrl =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`;

/** Separate business in the same building. TODO(client): set NEXT_PUBLIC_SISTER_SITE_URL. */
export const sisterBusiness = {
  name: 'Iowa Off-Road & Suspension',
  url: process.env.NEXT_PUBLIC_SISTER_SITE_URL ?? null,
};

/** Opens Google Maps directions to the shop. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}`;

/** Google Maps driving directions from a town to the shop. */
export const directionsFrom = (town: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${town}, IA`)}&destination=${encodeURIComponent(`${business.name}, ${fullAddress}`)}&travelmode=driving`;
