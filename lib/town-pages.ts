/**
 * Content for each /locations/<slug> town page. Copy is verbatim from the approved page designs.
 * Inline links use [label](/path). Add an entry here (keyed by the slug in lib/site.ts `locations`)
 * and a LIVE_ROUTES line in lib/routes.ts to publish a town page.
 *
 * Drive distance/time (`drive`): confirmed in the updated designs (2026-10-31), copied verbatim.
 * Without `drive`, nothing is estimated: the FAQ falls back to the address + a directions link.
 */

export type TownDetail = {
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroIntro: string;
  /** Confirmed drive copy from the designs. Omit to show no distance (FAQ then gives the address + directions link). */
  drive?: {
    /** Hero, under the intro */
    hero: string;
    /** "Where we work", second paragraph */
    where: string;
    /** FAQ "How far…": standalone first sentence */
    answer: string;
    /** FAQ: route + address + estimate caveat */
    route: string;
  };
  why: string[];
  services: string;
  where: string;
  cta: string;
};

export const townDetails: Record<string, TownDetail> = {
  marion: {
    metaTitle: 'Auto Repair Near Marion, IA',
    metaDescription:
      'Auto repair near Marion, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned, 4.6★ on Google. Domestic and Asian-import vehicles.',
    heroTag: 'Serving Marion from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Marion drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    drive: {
      hero: 'Central Marion is about 4 miles from the shop — roughly an 8-minute drive west on Business 151 and Collins Road (IA 100).',
      where: 'From central Marion it’s about 4 miles, roughly an 8-minute drive, mostly along Collins Road (IA 100).',
      answer: 'Revive Auto Care is about 4 miles from central Marion, roughly an 8-minute drive.',
      route: 'The route runs west on Business 151 and Collins Road (IA 100), and the shop is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402. Drive times are typical estimates; traffic can add a few minutes.',
    },
    why: [
      'Marion drivers have a trusted repair option in nearby Cedar Rapids. Revive Auto Care has served the greater Cedar Rapids area for over 30 years as a family-owned shop, and it holds a 4.6-star rating across 359 Google reviews, plus a 4.9-star CARFAX rating from 32 verified reviews. Those numbers are on public profiles you can check yourself.',
      'The shop works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes, so you’ll know up front whether Revive is the right fit for your vehicle, and you won’t waste a trip finding out.',
      'From Marion, Collins Road (IA 100) runs straight west to the shop in northeast Cedar Rapids, so it’s an easy drop-off on the way into town.',
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
      'Auto repair near Hiawatha, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.6★ across 359 Google reviews.',
    heroTag: 'Serving Hiawatha from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Hiawatha drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    drive: {
      hero: 'Central Hiawatha is about half a mile from the shop — roughly a 2-minute drive just south into northeast Cedar Rapids.',
      where: 'From central Hiawatha, the drive is about half a mile — about 2 minutes just south into northeast Cedar Rapids.',
      answer: 'Revive Auto Care is about half a mile from central Hiawatha, roughly a 2-minute drive.',
      route: 'The route runs just south into northeast Cedar Rapids, and the shop is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402. Drive times are typical estimates; traffic can add a few minutes.',
    },
    why: [
      'Hiawatha drivers don’t have to guess about a shop’s track record. Revive Auto Care has been family-owned and serving the Cedar Rapids area for over 30 years, with a 4.6-star rating across 359 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews — all on public profiles.',
      'Revive works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes, and it says so before you make the trip.',
      'Hiawatha is the shop’s closest neighbor. Revive sits just south of Hiawatha in northeast Cedar Rapids, about a two-minute drive from the center of town.',
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
      'Auto repair near Robins, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.6★ across 359 Google reviews.',
    heroTag: 'Serving Robins from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Robins drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    drive: {
      hero: 'Central Robins is about 3.5 miles from the shop — roughly a 9-minute drive south on Robins Road and Center Point Road.',
      where: 'From central Robins, the drive is about 3.5 miles — about 9 minutes south on Robins Road and Center Point Road.',
      answer: 'Revive Auto Care is about 3.5 miles from central Robins, roughly a 9-minute drive.',
      route: 'The route runs south on Robins Road and Center Point Road, and the shop is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402. Drive times are typical estimates; traffic can add a few minutes.',
    },
    why: [
      'For Robins drivers, Revive Auto Care is a family-owned Cedar Rapids shop with over 30 years behind it. Its reputation is public: 4.6 stars across 359 Google reviews and 4.9 stars from 32 verified CARFAX reviews.',
      'The shop services domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. European makes aren’t serviced, so you know before you book.',
      'From Robins, it’s a short run south on Robins Road and Center Point Road to the shop in northeast Cedar Rapids.',
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
      'Auto repair near Ely, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.6★ across 359 Google reviews.',
    heroTag: 'Serving Ely from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Ely drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    drive: {
      hero: 'Central Ely is about 15 miles from the shop — roughly a 24-minute drive north on US 30/151 and I-380.',
      where: 'From central Ely, the drive is about 15 miles — about 24 minutes north on US 30/151 and I-380.',
      answer: 'Revive Auto Care is about 15 miles from central Ely, roughly a 24-minute drive.',
      route: 'The route runs north on US 30/151 and I-380, and the shop is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402. Drive times are typical estimates; traffic can add a few minutes.',
    },
    why: [
      'Ely drivers can check Revive Auto Care’s record before they ever call: over 30 years serving the Cedar Rapids area as a family-owned shop, 4.6 stars across 359 Google reviews, and 4.9 stars from 32 verified CARFAX reviews.',
      'Revive works on domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles, and doesn’t service European makes — a straight answer up front.',
      'From Ely, US 30/151 and I-380 lead north to the shop, which sits near the I-380 and Collins Road interchange in northeast Cedar Rapids.',
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
      'Auto repair near Swisher, IA at Revive Auto Care, 2109 N Towne Ln NE, Cedar Rapids. Family-owned for 30+ years, 4.6★ across 359 Google reviews.',
    heroTag: 'Serving Swisher from Cedar Rapids',
    heroIntro:
      'Revive Auto Care serves Swisher drivers from its shop at 2109 N Towne Ln NE in Cedar Rapids. Schedule an appointment online to get started.',
    drive: {
      hero: 'Central Swisher is about 15 miles from the shop — roughly a 22-minute drive north on I-380.',
      where: 'From central Swisher, the drive is about 15 miles — about 22 minutes north on I-380.',
      answer: 'Revive Auto Care is about 15 miles from central Swisher, roughly a 22-minute drive.',
      route: 'The route runs north on I-380, and the shop is at 2109 N Towne Ln NE, Cedar Rapids, IA 52402. Drive times are typical estimates; traffic can add a few minutes.',
    },
    why: [
      'Swisher drivers looking toward Cedar Rapids will find Revive Auto Care: family-owned, over 30 years serving the area, and rated 4.6 stars across 359 Google reviews and 4.9 stars from 32 verified CARFAX reviews.',
      'The shop services domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. It doesn’t service European makes.',
      'From Swisher, I-380 runs north almost the whole way to the shop, which sits near the Collins Road interchange in northeast Cedar Rapids.',
    ],
    services:
      'Swisher drivers can book [brake service](/services/brake-service), an [oil change](/services/oil-change), or [check engine light diagnostics](/services/check-engine-light), plus A/C, engine, steering and suspension, transmission, electrical, and battery work.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids. Call (319) 261-0999, Monday through Thursday, 7:30 AM to 5:30 PM.',
    cta: 'Book your appointment online, or call Revive Auto Care at (319) 261-0999 and the team will find a time that works for you.',
  },
};
