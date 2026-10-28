/**
 * Content for each /locations/<slug> town page. Copy is verbatim from the approved page designs.
 * Inline links use [label](/path). Add an entry here (keyed by the slug in lib/site.ts `locations`)
 * and a LIVE_ROUTES line in lib/routes.ts to publish a town page.
 *
 * Drive distance/time: the designs mark these "pending confirmation — don't estimate".
 * Leave `driveTime` empty until the shop confirms it; nothing is shown or guessed until then.
 */

export type TownDetail = {
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroIntro: string;
  /** Confirmed drive distance/time from the town, e.g. "About 10 minutes (5 miles)". Empty = not shown. */
  driveTime?: string;
  why: string[];
  services: string;
  where: string;
  cta: string;
};

export const townDetails: Record<string, TownDetail> = {
  marion: {
    metaTitle: 'Auto Repair Near Marion, IA',
    metaDescription:
      'Auto repair near Marion, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned, 4.5★ on Google. Domestic and Asian-import vehicles.',
    heroTag: 'Serving Marion from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Marion drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    why: [
      'Marion drivers have a trusted repair option in nearby Cedar Rapids. Revive Auto Care has served the greater Cedar Rapids area for over 30 years as a family-owned shop, and it holds a 4.5-star rating across 353 Google reviews, plus a 4.9-star CARFAX rating from 32 verified reviews. Those numbers are on public profiles you can check yourself.',
      'The shop works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes, so you’ll know up front whether Revive is the right fit for your vehicle, and you won’t waste a trip finding out.',
    ],
    services:
      'Marion drivers can bring in the same services every Revive customer gets. Start with [brake service](/services/brake-service) if your pedal feels off, an [oil change](/services/oil-change) if you’re due, or [check engine light diagnostics](/services/check-engine-light) if a warning light has come on. The shop also handles A/C, engine, steering and suspension, transmission, electrical, and battery work, so one shop can cover most of what your vehicle needs.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, and Marion drivers can reach the shop by phone at (319) 261-0999. The shop is open Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your Marion-area appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works.',
  },
  hiawatha: {
    metaTitle: 'Auto Repair Near Hiawatha, IA',
    metaDescription:
      'Auto repair near Hiawatha, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.5★ across 353 Google reviews.',
    heroTag: 'Serving Hiawatha from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Hiawatha drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    why: [
      'Hiawatha drivers don’t have to guess about a shop’s track record. Revive Auto Care has been family-owned and serving the Cedar Rapids area for over 30 years, with a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews — all on public profiles.',
      'Revive works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes, and it says so before you make the trip.',
      // PENDING (client): the design asks for a genuinely Hiawatha-specific reason to choose Revive,
      // to be supplied by the shop. Add it here as a third paragraph once provided.
    ],
    services:
      'Whatever brought you in, the shop covers it: [brake service](/services/brake-service), [oil changes](/services/oil-change), and [check engine light diagnostics](/services/check-engine-light), along with A/C, engine, steering and suspension, transmission, electrical, and battery work.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids. Hiawatha drivers can call (319) 261-0999, Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works for you.',
  },
  robins: {
    metaTitle: 'Auto Repair Near Robins, IA',
    metaDescription:
      'Auto repair near Robins, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.5★ across 353 Google reviews.',
    heroTag: 'Serving Robins from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Robins drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    why: [
      'For Robins drivers, Revive Auto Care is a family-owned Cedar Rapids shop with over 30 years behind it. Its reputation is public: 4.5 stars across 353 Google reviews and 4.9 stars from 32 verified CARFAX reviews.',
      'The shop services domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. European makes aren’t serviced, so you know before you book.',
      // PENDING (client): the design asks for a genuinely Robins-specific reason to choose Revive,
      // to be supplied by the shop. Add it here as a third paragraph once provided.
    ],
    services:
      'Robins drivers can book any Revive service — from [brake service](/services/brake-service) and [oil changes](/services/oil-change) to [check engine light diagnostics](/services/check-engine-light) — plus A/C, engine, steering and suspension, transmission, electrical, and battery work.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids. Call (319) 261-0999 during shop hours, Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works for you.',
  },
  ely: {
    metaTitle: 'Auto Repair Near Ely, IA',
    metaDescription:
      'Auto repair near Ely, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.5★ across 353 Google reviews.',
    heroTag: 'Serving Ely from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Ely drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    why: [
      'Ely drivers can check Revive Auto Care’s record before they ever call: over 30 years serving the Cedar Rapids area as a family-owned shop, 4.5 stars across 353 Google reviews, and 4.9 stars from 32 verified CARFAX reviews.',
      'Revive works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles, and doesn’t service European makes — a straight answer up front.',
      // PENDING (client): the design asks for a genuinely Ely-specific reason to choose Revive,
      // to be supplied by the shop. Add it here as a third paragraph once provided.
    ],
    services:
      'From [brake service](/services/brake-service) and [oil changes](/services/oil-change) to [check engine light diagnostics](/services/check-engine-light), Ely drivers get the full Revive service list, including A/C, engine, steering and suspension, transmission, electrical, and battery work.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids. Ely drivers can call (319) 261-0999, Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works for you.',
  },
  swisher: {
    metaTitle: 'Auto Repair Near Swisher, IA',
    metaDescription:
      'Auto repair near Swisher, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.5★ across 353 Google reviews.',
    heroTag: 'Serving Swisher from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Swisher drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    why: [
      'Swisher drivers looking toward Cedar Rapids will find Revive Auto Care: family-owned, over 30 years serving the area, and rated 4.5 stars across 353 Google reviews and 4.9 stars from 32 verified CARFAX reviews.',
      'The shop services domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes.',
      // PENDING (client): the design asks for a genuinely Swisher-specific reason to choose Revive,
      // to be supplied by the shop. Add it here as a third paragraph once provided.
    ],
    services:
      'Swisher drivers can book [brake service](/services/brake-service), an [oil change](/services/oil-change), or [check engine light diagnostics](/services/check-engine-light), plus A/C, engine, steering and suspension, transmission, electrical, and battery work.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids. Call (319) 261-0999, Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works for you.',
  },
};
