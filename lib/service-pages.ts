/**
 * Content for each /services/<slug> detail page.
 * Copy comes verbatim from the approved page designs. Inline links use [label](/path).
 * Add a new entry here (keyed by the service slug in lib/site.ts) to publish another service page,
 * then add its path to LIVE_ROUTES in lib/routes.ts.
 */

export type ServiceDetail = {
  /** <title> (brand suffix is added by the layout template). */
  metaTitle: string;
  metaDescription: string;
  /** H1, split into display lines. */
  h1Lines: string[];
  heroTag: string;
  heroIntro: string;
  /** Work-order ticket on the hero. */
  ticketChecks: string[];
  /** Optional "what to do" guide with tone-coded cards (e.g. steady / flashing / don't). */
  guide?: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: { label: string; text: string; tone: 'steady' | 'flash' | 'dont' }[];
  };
  includedIntro?: string;
  included?: string[];
  /** Optional dark "Warning signs" band. */
  signs?: { heading: string; statement: string; body: string };
  why?: { eyebrow: string; paragraphs: string[]; image: string; imageAlt: string };
  pricing?: string;
  where: string;
  /** Answers may span paragraphs (separate with a blank line) and contain [label](/path) links. */
  faqs: { q: string; a: string }[];
  /** Optional note pointing to the separate business in the same building. */
  sisterNote?: string;
  /** Slugs from lib/site.ts services. */
  related: string[];
  cta: { title: string; text: string };
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'brake-service': {
    metaTitle: 'Brake Service in Cedar Rapids, IA',
    metaDescription:
      'Full brake system inspection and repair in Cedar Rapids, IA — pads, rotors, calipers, hydraulics, brake fluid and ABS concerns. Written estimate first.',
    h1Lines: ['Brake Service —', 'Cedar Rapids, IA'],
    heroTag: 'Priority service',
    heroIntro:
      'Revive Auto Care inspects your full brake system and repairs what it finds in Cedar Rapids, IA. From pads and rotors, to calipers and brake fluid, schedule an appointment online, or call the shop to get your brakes checked.',
    ticketChecks: ['Brake pads', 'Rotors', 'Calipers', 'Hydraulic components', 'Hoses'],
    includedIntro:
      'Complete brake system inspection, testing, maintenance, and repair — brake pads, rotors, calipers, hydraulic components, hoses, brake fluid service, parking brake systems, and diagnosis of ABS-related concerns. Brake service is not automatically a pad-only replacement; recommendations depend on the condition of the entire braking system.',
    included: [
      'Brake pads',
      'Rotors',
      'Calipers',
      'Hydraulic components',
      'Hoses',
      'Brake fluid service',
      'Parking brake systems',
      'ABS-related concerns',
    ],
    signs: {
      heading: 'Signs you need brake work',
      statement:
        'Squealing or grinding brakes, a soft pedal, or a warning light all mean it’s time to have your brakes checked.',
      body:
        'Squealing or grinding when you brake often points to wear somewhere in the system, and a soft or vibrating pedal is another reason not to wait. Act on a brake warning light right away. Our [check engine light page](/services/check-engine-light) explains what to do next. Revive inspects the whole braking system before it recommends a repair.',
    },
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'Revive Auto Care has served Cedar Rapids for over 30 years as a family-owned shop. Drivers rate it 4.5 stars across 353 Google reviews, and CARFAX shows a 4.9-star rating from 32 verified reviews. On brake jobs, the shop starts with an inspection of the entire braking system, and the recommendation depends on the condition of everything in it. A brake job isn’t automatically a pad-only replacement, and Revive won’t treat it like one.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician inspecting a vehicle in the Cedar Rapids shop',
    },
    pricing:
      'Brake repair pricing depends on your vehicle and the condition of the full braking system — Revive provides a written estimate after inspection rather than a flat published price.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, and the shop also serves drivers in Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to get your brakes inspected.',
    faqs: [
      {
        q: 'How much does a brake job cost?',
        a: 'Brake pricing depends on the vehicle and the condition of the full braking system — Revive provides a written estimate after inspection rather than publishing a flat price.',
      },
      {
        q: 'How do I know if I need new brakes?',
        a: 'Squealing, grinding, or a soft brake pedal are common warning signs. A dashboard brake warning light is worth acting on right away rather than waiting.',
      },
    ],
    related: ['oil-change', 'check-engine-light', 'ac-repair', 'vehicle-diagnostics'],
    cta: {
      title: 'Noticing a brake symptom?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999 and describe what you’re hearing or feeling. The team will get your brakes inspected.',
    },
  },
  'oil-change': {
    metaTitle: 'Oil Change in Cedar Rapids, IA',
    metaDescription:
      'Full-service oil and filter changes in Cedar Rapids, IA, with a vehicle condition inspection — fluids, tires and visible leaks. Clear estimate before service.',
    h1Lines: ['Oil Change —', 'Cedar Rapids, IA'],
    heroTag: 'Priority service',
    heroIntro:
      'Revive Auto Care in Cedar Rapids does full-service oil and filter changes, with a general vehicle condition inspection included. Schedule online or call the shop to get yours on the calendar.',
    ticketChecks: ['Oil to vehicle spec', 'New filter', 'Fluid levels', 'Tire condition & rotation', 'Visible leaks'],
    includedIntro:
      'Oil and filter services performed using oil that meets the applicable vehicle specifications, paired with a general vehicle condition inspection (DVI) — accessible fluid levels, tire condition and rotation, visible leaks, and other relevant maintenance items — aimed at catching developing problems before they become major repairs.',
    included: [
      'Oil to vehicle spec',
      'New filter',
      'Fluid levels',
      'Tire condition & rotation',
      'Visible leaks',
      'Condition inspection (DVI)',
    ],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'A routine oil change is a good time to catch a bigger problem early, and Revive Auto Care will find issues before they become headaches. Each oil and filter service comes with a vehicle condition inspection, so fluid levels, tire condition, and visible leaks get a look while your vehicle is already in the shop.',
        'The shop has served Cedar Rapids for over 30 years as a family-owned business, with a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. Unfortunately, we don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician checking under the hood during an oil change and vehicle inspection',
    },
    pricing:
      'Oil change pricing depends on the vehicle and oil type — Revive provides a clear estimate before service rather than a flat published price.',
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, and it serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher as well. Book online or call (319) 261-0999 to set up your oil change.',
    faqs: [
      {
        q: 'How often should I change my oil?',
        a: 'The answer depends on your vehicle and oil type, so follow the interval in your owner’s manual. Many vehicles land somewhere between 5,000 and 7,500 miles, but newer engines and full synthetic oil often allow longer intervals. Driving conditions matter too. If your check engine light comes on between changes, see our [check engine light page](/services/check-engine-light).',
      },
      // PENDING (client): "How long does an oil change take?" — no turnaround time is confirmed yet,
      // so it is not published. Add it here once the shop confirms a typical time.
    ],
    related: ['check-engine-light', 'ac-repair', 'vehicle-diagnostics', 'engine-repair'],
    cta: {
      title: 'Ready for your next oil change?',
      text: 'Schedule online, or call Revive Auto Care at (319) 261-0999 to book. The team will check over the rest of your vehicle while it’s in the shop.',
    },
  },
  'check-engine-light': {
    metaTitle: 'Check Engine Light Diagnostics, Cedar Rapids',
    metaDescription:
      'Check engine light on in Cedar Rapids? Revive Auto Care diagnoses and repairs check engine lights and other warning indicators. Steady vs. flashing, explained.',
    h1Lines: ['Check Engine', 'Light Diagnostics', '— Cedar Rapids, IA'],
    heroTag: 'Priority service',
    heroIntro:
      'Check Engine Light Experts — professional diagnosis and repair for check engine lights and other warning indicators.',
    ticketChecks: ['Check engine lights', 'Other warning indicators', 'Diagnosis & repair'],
    guide: {
      eyebrow: 'Steady vs. flashing',
      heading: 'What to do when the light comes on',
      intro:
        'If your check engine light is steady, it’s advisable to schedule an appointment soon. If it’s flashing, reduce driving load and seek service immediately — this can indicate a severe misfire that damages the catalytic converter. Avoid disconnecting the battery to reset the light, as this erases diagnostic data.',
      cards: [
        { label: 'Steady light', text: 'Schedule an appointment soon.', tone: 'steady' },
        { label: 'Flashing light', text: 'Reduce driving load and seek service immediately.', tone: 'flash' },
        { label: 'Don’t', text: 'Disconnect the battery to reset it — that erases diagnostic data.', tone: 'dont' },
      ],
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids and serves Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to have a warning light diagnosed.',
    faqs: [
      {
        q: 'Can I still drive if my check engine light comes on?',
        a: 'Yes, if the light is steady, but a flashing light needs service right away.\n\nA steady light is usually not an emergency, so schedule a diagnostic soon and drive gently until then. A flashing light can signal a severe misfire that damages the catalytic converter, so reduce your driving load and get to a shop immediately. Don’t disconnect the battery to reset the light, because that erases diagnostic data.',
      },
      {
        q: 'Why is my check engine light on but everything is fine?',
        a: 'A loose gas cap or a minor sensor fault can turn the light on with no symptoms.\n\nThe light comes on when the vehicle’s computer stores a fault code, and some faults don’t change how the vehicle drives. A scan is the only way to know what triggered it, so schedule a diagnostic instead of guessing.',
      },
      {
        q: 'What to do if I have a solid check engine light?',
        a: 'Schedule a diagnostic appointment soon. A steady light isn’t an emergency, but shouldn’t be ignored.\n\nDrive gently until your appointment, and don’t disconnect the battery to clear the light, since that erases the data the technician needs. If the light starts flashing, treat it as urgent and get service right away.',
      },
    ],
    related: ['ac-repair', 'vehicle-diagnostics', 'engine-repair', 'steering-suspension'],
    cta: {
      title: 'Check engine light on?',
      text: 'Schedule your diagnostic online, or call Revive Auto Care at (319) 261-0999. The team will find the cause behind the warning before recommending any repair.',
    },
  },
  'electrical-service': {
    metaTitle: 'Electrical Service in Cedar Rapids, IA',
    metaDescription:
      'Car electrical diagnosis and repair in Cedar Rapids, IA — starting and charging, wiring, sensors, control modules and lighting, traced with real testing.',
    h1Lines: ['Electrical', 'Service — Cedar', 'Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care diagnoses and repairs electrical problems in Cedar Rapids, from starting and charging systems to wiring, sensors, and control modules. Schedule online, or call the shop.',
    ticketChecks: ['Starting & charging', 'Wiring', 'Sensors', 'Control modules', 'Lighting'],
    includedIntro:
      'Revive diagnoses and repairs electrical problems involving starting and charging systems, wiring, sensors, control modules, lighting, communication networks, and other electrical components — using wiring diagrams, scan tools, and electrical testing equipment to identify faults rather than relying on unnecessary parts replacement.',
    included: ['Starting & charging', 'Wiring', 'Sensors', 'Control modules', 'Lighting', 'Communication networks'],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'Electrical faults can be hard to pin down, so Revive Auto Care uses wiring diagrams, scan tools, and electrical testing equipment to find the fault instead of replacing parts and hoping. The shop has served Cedar Rapids for over 30 years as a family-owned business, with a 4.5-star rating across 353 Google reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician tracing an electrical fault under the hood',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids and serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to have an electrical problem traced.',
    faqs: [
      {
        q: 'What’s included in electrical service?',
        a: 'Revive diagnoses and repairs electrical problems involving starting and charging systems, wiring, sensors, control modules, lighting, communication networks, and other electrical components — using wiring diagrams, scan tools, and electrical testing equipment to identify faults rather than relying on unnecessary parts replacement.',
      },
    ],
    related: ['battery-service', 'brake-service', 'oil-change', 'check-engine-light'],
    cta: {
      title: 'Lights flickering or a vehicle that won’t start?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999 so the team can start tracing the problem.',
    },
  },
  'ac-repair': {
    metaTitle: 'A/C Repair in Cedar Rapids, IA',
    metaDescription:
      'Car A/C repair in Cedar Rapids, IA — leak detection, performance testing, compressors, condensers and evaporators. Revive finds the cause, not just a recharge.',
    h1Lines: ['A/C Repair —', 'Cedar Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care repairs automotive A/C systems in Cedar Rapids, from leak detection to compressor concerns. Schedule an appointment online or call the shop to have your A/C looked at.',
    ticketChecks: ['Leak detection', 'Performance testing', 'Compressor concerns', 'Condensers', 'Evaporators'],
    includedIntro:
      'Air-conditioning system diagnostics and repair — refrigerant leak detection, performance testing, compressor concerns, condensers, evaporators, electrical controls, and related components. Revive diagnoses the cause of poor cooling performance rather than simply adding refrigerant.',
    included: ['Leak detection', 'Performance testing', 'Compressor concerns', 'Condensers', 'Evaporators', 'Electrical controls'],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'When your air conditioning stops cooling, Revive Auto Care looks for the cause of the poor performance and fixes it. The diagnosis can include refrigerant leaks, compressor concerns, condensers, evaporators, and electrical controls. The shop has served Cedar Rapids for over 30 years as a family-owned business, and holds a 4.5-star rating across 353 Google reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. Sorry, we don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician diagnosing an A/C system under the hood',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, and drivers also come in from Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to have your A/C checked.',
    faqs: [
      {
        q: 'What’s included in A/C repair?',
        a: 'Air-conditioning system diagnostics and repair — refrigerant leak detection, performance testing, compressor concerns, condensers, evaporators, electrical controls, and related components. Revive diagnoses the cause of poor cooling performance rather than simply adding refrigerant.',
      },
    ],
    related: ['vehicle-diagnostics', 'engine-repair', 'steering-suspension', 'transmission-service'],
    cta: {
      title: 'A/C not cooling like it should?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999. The team will diagnose the cause and talk you through the repair.',
    },
  },
  'vehicle-diagnostics': {
    metaTitle: 'Vehicle Diagnostics in Cedar Rapids, IA',
    metaDescription:
      'Professional vehicle diagnostics in Cedar Rapids, IA — warning lights, electrical, driveability and intermittent problems. Find the cause before any repair.',
    h1Lines: ['Vehicle', 'Diagnostics —', 'Cedar Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care in Cedar Rapids tests to find the cause of check engine lights, electrical problems, and driveability issues before recommending a repair. Schedule a diagnostic online, or call the shop.',
    ticketChecks: ['Check-engine lights', 'Electrical concerns', 'Driveability complaints', 'Intermittent problems', 'Module communication'],
    includedIntro:
      'Diagnostics are a major part of the business. Revive offers multiple levels of testing based on the complexity of the concern — check-engine lights, electrical concerns, driveability complaints, intermittent problems, module communication issues, and other vehicle malfunctions — using professional diagnostic equipment and procedures to identify the cause before recommending repairs. Diagnostic testing is a separately billed professional service, not a free code-reading service.',
    included: [
      'Check-engine lights',
      'Electrical concerns',
      'Driveability complaints',
      'Intermittent problems',
      'Module communication',
      'Other malfunctions',
    ],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'Diagnostics are a major part of the business at Revive Auto Care. The shop works with professional equipment and procedures to find the cause before recommending a repair. Diagnostic testing is a separately billed professional service, and it’s what keeps the repair that follows aimed at the real problem.',
        'Revive has served Cedar Rapids for over 30 years as a family-owned shop, with a 4.5-star rating across 353 Google reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician running diagnostics under the hood',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids and serves Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or book online to have a warning light or driveability problem diagnosed.',
    faqs: [
      {
        q: 'What’s included in vehicle diagnostics?',
        a: 'Diagnostics are a major part of the business. Revive offers multiple levels of testing based on the complexity of the concern — check-engine lights, electrical concerns, driveability complaints, intermittent problems, module communication issues, and other vehicle malfunctions — using professional diagnostic equipment and procedures to identify the cause before recommending repairs. Diagnostic testing is a separately billed professional service, not a free code-reading service.',
      },
    ],
    related: ['engine-repair', 'steering-suspension', 'transmission-service', 'electrical-service'],
    cta: {
      title: 'Chasing a warning light or a problem that comes and goes?',
      text: 'Schedule a diagnostic online, or call Revive Auto Care at (319) 261-0999 to let us know what your vehicle is doing.',
    },
  },
  'engine-repair': {
    metaTitle: 'Engine Repair in Cedar Rapids, IA',
    metaDescription:
      'Engine repair in Cedar Rapids, IA — timing systems, cooling, seals and gaskets, cylinder heads, internal repairs and engine replacement. Evaluated first.',
    h1Lines: ['Engine Repair —', 'Cedar Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care handles engine repair in Cedar Rapids, from external component repairs to major mechanical work and engine replacement. Schedule an appointment online, or call to talk through what your engine needs.',
    ticketChecks: ['Timing systems', 'Cooling components', 'Seals & gaskets', 'Cylinder head repairs', 'Internal mechanical repairs'],
    includedIntro:
      'Engine repair ranges from external component repairs to major engine mechanical work — timing systems, cooling components, seals and gaskets, cylinder head repairs, internal mechanical repairs, and engine replacement. Revive evaluates the engine’s condition and recommends repair or replacement based on the vehicle’s needs and the customer’s goals.',
    included: [
      'Timing systems',
      'Cooling components',
      'Seals & gaskets',
      'Cylinder head repairs',
      'Internal mechanical repairs',
      'Engine replacement',
    ],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'Engine repair covers a wide range. Revive Auto Care starts by evaluating the engine’s condition, then recommends repair or replacement based on your vehicle’s needs and your goals. The shop has served Cedar Rapids for over 30 years as a family-owned business, with a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician evaluating an engine in the Cedar Rapids shop',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, with drivers also coming from Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to talk about your engine.',
    faqs: [
      {
        q: 'What’s included in engine repair?',
        a: 'Engine repair ranges from external component repairs to major engine mechanical work — timing systems, cooling components, seals and gaskets, cylinder head repairs, internal mechanical repairs, and engine replacement. Revive evaluates the engine’s condition and recommends repair or replacement based on the vehicle’s needs and the customer’s goals.',
      },
    ],
    related: ['steering-suspension', 'transmission-service', 'electrical-service', 'battery-service'],
    cta: {
      title: 'Engine trouble?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999. The team will evaluate the engine and explain your options before any work begins.',
    },
  },
  'steering-suspension': {
    metaTitle: 'Steering & Suspension Repair, Cedar Rapids',
    metaDescription:
      'Steering and suspension repair in Cedar Rapids, IA — ball joints, control arms, tie rods, shocks, struts and wheel bearings. Pulling or clunking diagnosed.',
    h1Lines: ['Steering &', 'Suspension —', 'Cedar Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care inspects, diagnoses, and repairs steering and suspension components in Cedar Rapids. Schedule an appointment online, or call the shop if your vehicle handles poorly, vibrates, or makes noise.',
    ticketChecks: ['Ball joints', 'Control arms', 'Tie rods', 'Steering linkages', 'Shocks & struts'],
    includedIntro:
      'Revive inspects, diagnoses, repairs, and replaces steering and suspension components — ball joints, control arms, tie rods, steering linkages, shocks, struts, wheel bearings, and related parts — and diagnoses handling problems, abnormal tire wear, vibration concerns, and suspension noises.',
    included: ['Ball joints', 'Control arms', 'Tie rods', 'Steering linkages', 'Shocks & struts', 'Wheel bearings'],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'Handling problems, abnormal tire wear, vibration, and suspension noises each have a cause, and Revive Auto Care diagnoses it before replacing parts. The shop has served Cedar Rapids for over 30 years as a family-owned business, with a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician inspecting steering and suspension components',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids and serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or schedule online to have your steering and suspension checked.',
    faqs: [
      {
        q: 'What’s included in steering & suspension?',
        a: 'Revive inspects, diagnoses, repairs, and replaces steering and suspension components — ball joints, control arms, tie rods, steering linkages, shocks, struts, wheel bearings, and related parts — and diagnoses handling problems, abnormal tire wear, vibration concerns, and suspension noises.',
      },
    ],
    sisterNote: 'Looking for lift kits or off-road suspension? That’s Iowa Off-Road & Suspension, same building.',
    related: ['transmission-service', 'electrical-service', 'battery-service', 'brake-service'],
    cta: {
      title: 'Vehicle pulling, shaking, or clunking?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999 and describe what you’re noticing so the team can start with the right inspection.',
    },
  },
  'transmission-service': {
    metaTitle: 'Transmission Service in Cedar Rapids, IA',
    metaDescription:
      'Transmission fluid service, leak repairs and diagnosis in Cedar Rapids, IA — drain-and-refill, filters, shifting concerns, shudder and fault codes.',
    h1Lines: ['Transmission', 'Service — Cedar', 'Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care offers transmission fluid service and diagnosis in Cedar Rapids, including leak repairs. Schedule online, or call the shop to talk through shifting concerns.',
    ticketChecks: ['Fluid drain-and-refill', 'Filter replacement', 'Leak repairs', 'Shifting concerns', 'Shudder'],
    includedIntro:
      'Transmission fluid maintenance, leak repairs, and diagnosis of transmission-related concerns. Scope depends on the vehicle and may include fluid drain-and-refill, filter replacement where applicable, and manufacturer-recommended maintenance procedures, along with evaluating shifting concerns, shuddering, and transmission-related fault codes. A transmission fluid service is maintenance — it is not guaranteed to correct an existing mechanical or performance problem.',
    included: ['Fluid drain-and-refill', 'Filter replacement', 'Leak repairs', 'Shifting concerns', 'Shudder', 'Fault codes'],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'A transmission fluid service is maintenance, and Revive Auto Care says so plainly: It isn’t guaranteed to correct an existing mechanical or performance problem. If your vehicle shifts poorly or shudders, the shop evaluates that first and tells you what it finds.',
        'Revive has served Cedar Rapids for over 30 years as a family-owned shop, with a 4.5-star rating across 353 Google reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician evaluating a transmission concern',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids, and it also serves Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or book online to discuss your transmission.',
    faqs: [
      {
        q: 'What’s included in transmission service?',
        a: 'Transmission fluid maintenance, leak repairs, and diagnosis of transmission-related concerns. Scope depends on the vehicle and may include fluid drain-and-refill, filter replacement where applicable, and manufacturer-recommended maintenance procedures, along with evaluating shifting concerns, shuddering, and transmission-related fault codes. A transmission fluid service is maintenance — it is not guaranteed to correct an existing mechanical or performance problem.',
      },
    ],
    related: ['electrical-service', 'battery-service', 'brake-service', 'oil-change'],
    cta: {
      title: 'Is the shifting rough, or are you due for a fluid service?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999. The team will look at your transmission and explain what it needs.',
    },
  },
  'battery-service': {
    metaTitle: 'Battery Service in Cedar Rapids, IA',
    metaDescription:
      'Car battery testing and replacement in Cedar Rapids, IA — charging voltage, cable connections, parasitic drains, plus registration and relearn when needed.',
    h1Lines: ['Battery Service —', 'Cedar Rapids, IA'],
    heroTag: 'Service',
    heroIntro:
      'Revive Auto Care tests and replaces batteries and checks charging systems in Cedar Rapids. Schedule an appointment online, or call the shop before a weak battery leaves you stuck.',
    ticketChecks: ['Battery testing', 'Replacement', 'Charging voltage', 'Cable connections', 'Parasitic drains'],
    includedIntro:
      'Battery testing, replacement, charging-system evaluation, and battery-related electrical diagnostics — checking battery condition, cable connections, charging voltage, parasitic battery drains, and applicable battery monitoring systems. Battery replacement procedures and any required system registration or relearning are performed as needed for the vehicle.',
    included: ['Battery testing', 'Replacement', 'Charging voltage', 'Cable connections', 'Parasitic drains', 'Registration & relearn'],
    why: {
      eyebrow: 'Family-owned · 30+ years',
      paragraphs: [
        'A weak battery can be a charging problem or an issue with the battery itself. Revive Auto Care checks both: battery condition, cable connections, charging voltage, and parasitic drains. The shop has served Cedar Rapids for over 30 years as a family-owned business, with a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating from 32 verified reviews.',
        'Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and Asian-import vehicles, including select hybrid and commercial fleet vehicles. We don’t service European makes and models.',
      ],
      image: '/images/hero-technician-engine-bay.webp',
      imageAlt: 'Revive Auto Care technician testing a battery and charging system',
    },
    where:
      'Revive Auto Care is at 2109 N Towne Ln NE in Cedar Rapids and also serves Marion, Hiawatha, Robins, Ely, and Swisher. Call (319) 261-0999 or book online to have your battery tested.',
    faqs: [
      {
        q: 'What’s included in battery service?',
        a: 'Battery testing, replacement, charging-system evaluation, and battery-related electrical diagnostics — checking battery condition, cable connections, charging voltage, parasitic battery drains, and applicable battery monitoring systems. Battery replacement procedures and any required system registration or relearning are performed as needed for the vehicle.',
      },
    ],
    related: ['brake-service', 'oil-change', 'check-engine-light', 'ac-repair'],
    cta: {
      title: 'Slow starts or a dead battery?',
      text: 'Schedule your appointment online, or call Revive Auto Care at (319) 261-0999. The team will test the battery and the charging system together.',
    },
  },
};
