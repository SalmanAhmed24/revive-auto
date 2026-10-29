# Revive Auto Care — website (Next.js 15, App Router)

Built: **Home** (`/`), **Services** (`/services`), **About Us** (`/about-us`), **Reviews** (`/reviews`), **Contact Us** (`/contact-us`), **Brake Service** (`/services/brake-service`), **Oil Change** (`/services/oil-change`), **Check Engine Light** (`/services/check-engine-light`), **Electrical Service** (`/services/electrical-service`), **A/C Repair** (`/services/ac-repair`), **Vehicle Diagnostics** (`/services/vehicle-diagnostics`), **Engine Repair** (`/services/engine-repair`), **Steering & Suspension** (`/services/steering-suspension`), **Transmission Service** (`/services/transmission-service`), **Battery Service** (`/services/battery-service`) — all 10 service pages done — and **Locations** (`/locations`), **Marion** (`/locations/marion`), **Hiawatha** (`/locations/hiawatha`), **Robins** (`/locations/robins`), **Ely** (`/locations/ely`), **Swisher** (`/locations/swisher`) — all 5 town pages done — **Financing** (`/financing`) and **Careers** (`/careers`). Schedule Appointment is the Tekmetric booking modal rather than a page (see Online booking).

## Run it

> If you copy new files into the project while `npm run dev` is running and see an error like `Cannot find module`, stop the server, delete the `.next` folder, and start it again.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

Set the production domain before deploying (used for canonicals, sitemap, OG and JSON-LD):

```
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

On **staging/preview only**, also set `NEXT_PUBLIC_NOINDEX=1` (robots.txt then blocks everything). Never set it on production.

## Where to edit content (no developer needed)

| What | File |
|---|---|
| Business facts: name, phone, address, hours, ratings, vehicles | `lib/site.ts` → `business` |
| Services (name, home one-liner `short`, services-page `long` description, 3 `includes` items, photo, alt text) | `lib/site.ts` → `services` |
| "How we work" steps (Services page) | `lib/site.ts` → `workflow` |
| Services page title / description / copy | `app/services/page.tsx` |
| **Service detail pages** (`/services/<slug>`): title, description, hero, work order, what's included, warning signs, why, pricing, where, FAQs, related, CTA | `lib/service-pages.ts` (one entry per service; inline links as `[label](/path)`) |
| Towns served | `lib/site.ts` → `locations` |
| **Financing and Careers** content (ported from the current reviveautocareia.com pages): headings, paragraphs, optional Apply button | `lib/ported-pages.ts` → `financing.sections` / `careers.sections` |
| Shop history timeline (home, About hero ticket + chapters) | `lib/site.ts` → `timeline` |
| About page copy, title, description | `app/about-us/page.tsx` |
| About FAQ (first two entries of `homeFaqs`; schema generated from the same text) | `lib/site.ts` → `homeFaqs` |
| FAQ entries (not on the home page; ready for an FAQ/About page — use `homeFaqSchema()` wherever they are shown) | `lib/site.ts` → `homeFaqs` |
| Home title / meta description | `app/page.tsx` → `metadata` |
| Site-wide default title/description | `app/layout.tsx` |
| Home body copy | `app/page.tsx` |

## Adding a service page

All 10 service pages share one template (`app/services/[slug]/page.tsx`). To publish one:
1. Add its entry to `lib/service-pages.ts` (copy the `brake-service` entry's shape).
2. Add `/services/<slug>` to `LIVE_ROUTES` in `lib/routes.ts`.
Slugs without an entry return a real 404. Each page gets `Service`, `BreadcrumbList` and `FAQPage` JSON-LD automatically. Every content section is optional — `sisterNote` (Iowa Off-Road dashed note; its link appears once `NEXT_PUBLIC_SISTER_SITE_URL` is set), `guide` (tone-coded cards, e.g. steady / flashing / don't), `included`, `signs`, `why`, `pricing`, `faqs` — and section numbers follow whichever sections a page has. FAQ answers may span paragraphs (blank line between them) and contain `[label](/path)` links; the schema gets the plain text. Headlines longer than ~32 characters scale down automatically to keep their designed line breaks.

## Adding a town page

All 5 town pages share one template (`app/locations/[slug]/page.tsx`). Add the town's entry to `lib/town-pages.ts` (copy the `marion` shape) and its path to `LIVE_ROUTES`. Drive distance/time is left out until the shop confirms it (the designs say "don't estimate"): set `driveTime` and it appears in the hero and the "How far is…" FAQ. Until then the FAQ gives the address and a Google Maps directions link from that town.

## Adding a new page

Shared building blocks: `components/ui/` (Breadcrumbs, InfoBar, VehicleChecklist, Eyebrow, CtaBand) and `components/motion/` (ScrollFx, Split, Tilt, Magnetic, CountUp). Inner pages reuse the `.page-hero` layout.


1. Create `app/<route>/page.tsx` as a **Server Component** with its own `metadata` export (unique title, description, `alternates.canonical`).
2. Add the route to `LIVE_ROUTES` in `lib/routes.ts`. That one edit puts it in `sitemap.xml` and turns on link prefetching to it
   (links to routes not in the list don't prefetch, so unbuilt pages never cause console 404s).
3. Add `BreadcrumbList` JSON-LD for nested pages, and `Service` JSON-LD on service pages linked to `@id` `…/#business` (see `lib/schema.ts`).

## SEO / AEO architecture

- All copy, headings, FAQ answers and JSON-LD are in the **raw server HTML** (verified with view-source). Pages are static (SSG).
- JSON-LD: `AutoRepair` + `WebSite` (sitewide); `/services` adds `BreadcrumbList` and an `ItemList` of 10 `Service` entities linked to the business; `/about-us` adds `BreadcrumbList`, `AboutPage` and `FAQPage`. Built in `lib/schema.ts`. Add `FAQPage` only on pages that visibly show the Q&A.
- One `<h1>`, logical h2 → h3 hierarchy.
- `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx` (generated 1200×630), `icon.png`, `apple-icon.png`, real 404 status.
- Fonts self-hosted via `next/font/local`, subset to the glyphs used. All images via `next/image` (AVIF/WebP).

## Motion architecture (why it stays fast)

- **Hero entrance** is pure CSS (no JS wait, so first paint isn't delayed).
- **Framer Motion** (lazy `domAnimation` bundle): header hide/show, full-screen mobile menu, repair-order 3D tilt, magnetic buttons, service-board cursor photo preview, count-ups.
- **GSAP + ScrollTrigger** (`components/home/ScrollFx.tsx`): split-word headline reveals, clip-path photo reveal, timeline progress scrub, seal rotations, ticket drops, radar build, CTA grow, marquee velocity skew. GSAP is code-split and loads on the visitor's first scroll/touch/pointer/key (all its effects are scroll-driven), so it costs nothing during page load; each section is wired only as it approaches the viewport. Shared across pages via `data-fx` section keys in `components/motion/ScrollFx.tsx`.
- **Lenis** smooth scroll on desktop mouse only (native scroll on touch), loaded on first mouse intent.
- **Services page**: sticky "jump to" bar with scroll-spy and a Framer Motion pill (`components/services/ServiceJump.tsx`); cards reveal with a GSAP clip-path wipe, image zoom-settle and checklist draw.
- Everything respects `prefers-reduced-motion`. With JS off, all content is visible.

## Contact form

`app/contact-us/actions.ts` (server action) delivers messages. Set ONE of these in the host's environment (server-only, never exposed to the browser):

- `CONTACT_WEBHOOK_URL` — receives a JSON POST `{ name, contact, message, page, sentAt }` (works with Zapier, Make, Formspree, a Slack workflow, etc.)
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (optional `CONTACT_FROM_EMAIL`) — emails each message via Resend

Until one is set, the form validates and then asks the visitor to call (319) 261-0999. It works with JavaScript off, has a hidden honeypot field against spam bots, and the phone number stays visible as a fallback.

## Financing and Careers pages

`/financing` and `/careers` share one template (`components/PortedPage.tsx`) built to the designs: short hero, info bar, and the closing band ("Questions about paying for a repair?" / "Want to work at the shop?"). Both designs say the current page on reviveautocareia.com carries over unchanged, so that content goes into `lib/ported-pages.ts` (`sections`: kicker, heading, body, optional `cta` button such as a lender's Apply link, an application form or a `mailto:` address). Each section renders as a numbered block like the rest of the site.

While a page's `sections` is empty it is live but `noindex` and left out of `sitemap.xml` (Lighthouse SEO shows 69 for this reason only). Adding the first section makes it indexable and adds it to the sitemap automatically. If Careers ends up listing specific open jobs, consider adding `JobPosting` JSON-LD per position.

## Online booking (Tekmetric)

Every "Schedule Appointment" button (header, mobile menu, heroes, CTA bands, Contact page, footer) is `components/BookingLink.tsx`. A click calls Tekmetric's `onShowBooking(shopId)` and opens their booking modal; the buttons keep their existing styling.

- Tekmetric's `modal.js` / `modal.css` load on demand (first hover, focus, touch or click of a booking button), never during page load, so they don't affect Lighthouse. Loader: `lib/booking-client.ts`.
- Shop ID: `lib/booking.ts` (from Tekmetric's embed code); override with `NEXT_PUBLIC_TEKMETRIC_SHOP_ID` if it ever changes.
- While Tekmetric's booking app loads, the button shows a thin loading bar. While the modal is open, the page behind it doesn't scroll; Escape closes it and focus returns to the button.
- Each button is a real link to `https://booking.tekmetric.com/?shop=<id>` (used with JavaScript off or on Cmd/Ctrl-click). If Tekmetric's script can't load (their firewall blocks some countries/networks, ad blockers, outages), visitors stay on the page and get a small "Online booking isn't loading right now — Call (319) 261-0999" notice.
- Link any external "Book" button (e.g. Google Business Profile) to `https://<domain>/?book=1`: the page opens with the booking modal already showing.
- `window` events `booking:open` / `booking:close` fire on open and close, ready for a GA4 conversion event.
- The AutoRepair JSON-LD includes a `ReserveAction` pointing at the booking page.

## Open items before launch (need client confirmation)

- [ ] Contact form delivery → `CONTACT_WEBHOOK_URL` or `RESEND_API_KEY` + `CONTACT_TO_EMAIL`
- [ ] Hiawatha, Robins, Ely and Swisher: a genuinely town-specific reason to choose Revive (design asks the shop to supply it; add as a third `why` paragraph in `lib/town-pages.ts`)
- [ ] Confirmed driving distance/time from each town (Marion, Hiawatha, Robins, Ely, Swisher) → `driveTime` in `lib/town-pages.ts`
- [ ] Confirm (319) 261-0999 accepts text messages (the Contact page has a "Text" button)
- [ ] Oil Change FAQ: confirm a typical turnaround time for "How long does an oil change take?" (not published until confirmed), and whether Revive recommends an oil interval different from the general 5,000–7,500-mile guidance

- [ ] After deploy: book a test appointment through the modal on desktop and phone (Tekmetric's servers can't be reached from the build sandbox; tested against a stand-in of their script)
- [ ] Financing and Careers: paste the current reviveautocareia.com page content into `lib/ported-pages.ts`
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL`
- [ ] Google Business Profile lat/long → add `geo` in `lib/schema.ts`
- [ ] Google Business Profile, Facebook, Instagram URLs → `business.sameAs` in `lib/site.ts`
- [ ] Iowa Off-Road & Suspension URL → `NEXT_PUBLIC_SISTER_SITE_URL` (turns on the footer "Visit site" link and the Reviews page "Visit" button)
- [ ] Search Console verification token → `metadata.verification` in `app/layout.tsx`; GA4 + conversion events (calls, bookings)
- [ ] Trustindex loader URL → `NEXT_PUBLIC_TRUSTINDEX_SCRIPT` (live review snippets appear on /reviews; loads only when scrolled near, renders nothing until set)
- [ ] Exact Google reviews link → `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` (until then "See every review on Google" opens a Google Maps search for the shop)
- [ ] Logo: only a 284×150 raster was in the files; an SVG logo would be sharper on retina and for the favicon
- [ ] Validate all JSON-LD in Google's Rich Results Test on the live URL
