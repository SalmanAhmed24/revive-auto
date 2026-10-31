# Revive Auto Care — website (Next.js 15, App Router)

Built: **Home** (`/`), **Services** (`/services`), **About Us** (`/about-us`), **Reviews** (`/reviews`), **Contact Us** (`/contact-us`), **Brake Service** (`/services/brake-service`), **Oil Change** (`/services/oil-change`), **Check Engine Light** (`/services/check-engine-light`), **Electrical Service** (`/services/electrical-service`), **A/C Repair** (`/services/ac-repair`), **Vehicle Diagnostics** (`/services/vehicle-diagnostics`), **Engine Repair** (`/services/engine-repair`), **Steering & Suspension** (`/services/steering-suspension`), **Transmission Service** (`/services/transmission-service`), **Battery Service** (`/services/battery-service`) — all 10 service pages done — and **Locations** (`/locations`), **Marion** (`/locations/marion`), **Hiawatha** (`/locations/hiawatha`), **Robins** (`/locations/robins`), **Ely** (`/locations/ely`), **Swisher** (`/locations/swisher`) — all 5 town pages done — **Financing** (`/financing`) and **Careers** (`/careers`). Schedule Appointment is the Tekmetric booking modal rather than a page (see Online booking).

## Run it

> **Updating from a new zip:** replace the whole project folder (don't copy the new files over the old ones, or deleted files are left behind). Then run `npm install`, delete the `.next` folder, and start again. If pages show 404 or `Cannot find module` while `npm run dev` is running, stop the server, delete `.next`, and restart.
>
> **Deploying to Vercel from GitHub:** commit *all* changes, including deleted files (`git add -A`), then push. Vercel builds from the repo, so anything not pushed isn't live.

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
| Financing options (Klarna, Affirm, Snap) and page copy | `app/financing/page.tsx` |
| Careers page copy | `app/careers/page.tsx` |
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

All 5 town pages share one template (`app/locations/[slug]/page.tsx`). Add the town's entry to `lib/town-pages.ts` (copy the `marion` shape) and its path to `LIVE_ROUTES`. Each town's confirmed drive copy (`drive`: hero line, "Where we work" line, FAQ answer + route) and its town-specific reason (third `why` paragraph) come from the updated designs (2026-10-31). A town without `drive` shows no distance; its FAQ gives the address and a Google Maps directions link instead.

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

## Financing page

`/financing` (`app/financing/page.tsx`) follows the updated design: hero "Auto Repair Financing Made Simple" → 01 Flexible financing options available (Klarna, Affirm, Snap cards, edited in the `options` list at the top of the file) → "Drive now, pay later" strip → "Questions? Contact the shop" link → closing band. Indexed and in the sitemap.

## Careers page and job applications

`/careers` (`app/careers/page.tsx`) follows the updated design: hero "Careers at Revive Auto Care" → 01 Join a team that cares + Decades of local service → **Apply now** form (`components/careers/ApplyForm.tsx`): name, phone, email, position (Technician / Customer Service / Other), optional note.

Applications are emailed to **andy@reviveautocareia.com** by the server action `app/careers/actions.ts` (subject "Job application: <position> — <name>", reply-to set to the applicant). It works with JavaScript off, validates on the server, and has a hidden honeypot field against spam bots.

**To switch it on** (Vercel → Project → Settings → Environment Variables, then redeploy), use Resend (free tier is plenty):
1. Sign up at resend.com and create an API key → set `RESEND_API_KEY`.
2. Verify the domain `reviveautocareia.com` in Resend (it gives 3 DNS records to add where the domain is managed), then set `CONTACT_FROM_EMAIL` to e.g. `Revive Auto Care <website@reviveautocareia.com>`.
   Quick test without DNS: if the Resend account itself is created with andy@reviveautocareia.com, you can skip step 2; Resend's test sender can deliver to the account owner only.
- Optional: `CAREERS_TO_EMAIL` to send applications somewhere else; `CAREERS_WEBHOOK_URL` to post them to Zapier/Make/a Google Sheet instead of email.
- Until it's set up, the form asks applicants to call (319) 261-0999 instead.

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
- [ ] Confirm (319) 261-0999 accepts text messages (the Contact page has a "Text" button)
- [ ] Oil Change FAQ: confirm a typical turnaround time for "How long does an oil change take?" (not published until confirmed), and whether Revive recommends an oil interval different from the general 5,000–7,500-mile guidance

- [ ] After deploy: book a test appointment through the modal on desktop and phone (Tekmetric's servers can't be reached from the build sandbox; tested against a stand-in of their script)
- [ ] Careers applications: set `RESEND_API_KEY` (+ verify reviveautocareia.com and set `CONTACT_FROM_EMAIL`) so applications reach andy@reviveautocareia.com; send a test application after deploy
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL`
- [ ] Google Business Profile lat/long → add `geo` in `lib/schema.ts`
- [ ] Google Business Profile, Facebook, Instagram URLs → `business.sameAs` in `lib/site.ts`
- [ ] Iowa Off-Road & Suspension URL → `NEXT_PUBLIC_SISTER_SITE_URL` (turns on the footer "Visit site" link and the Reviews page "Visit" button)
- [ ] Search Console verification token → `metadata.verification` in `app/layout.tsx`; GA4 + conversion events (calls, bookings)
- [ ] Trustindex loader URL → `NEXT_PUBLIC_TRUSTINDEX_SCRIPT` (live review snippets appear on /reviews; loads only when scrolled near, renders nothing until set)
- [ ] Exact Google reviews link → `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` (until then "See every review on Google" opens a Google Maps search for the shop)
- [ ] Logo: only a 284×150 raster was in the files; an SVG logo would be sharper on retina and for the favicon
- [ ] Validate all JSON-LD in Google's Rich Results Test on the live URL
