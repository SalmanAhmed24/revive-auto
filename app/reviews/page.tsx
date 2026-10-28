import type { Metadata } from 'next';
import Image from 'next/image';
import { business, googleReviewsUrl, sisterBusiness } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import CountUp from '@/components/motion/CountUp';
import Magnetic from '@/components/motion/Magnetic';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import StarMeter from '@/components/reviews/StarMeter';
import TrustindexWidget from '@/components/reviews/TrustindexWidget';
import { ArrowUpRight } from '@/components/icons';

const TITLE = 'Reviews | Revive Auto Care, Cedar Rapids IA';
const DESCRIPTION =
  'Revive Auto Care holds a 4.5-star rating across 353 Google reviews and 4.9 stars from 32 verified CARFAX reviews. See what Cedar Rapids drivers say.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/reviews' },
  openGraph: { url: '/reviews', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Reviews', path: '/reviews' },
];
const { google, carfax } = business.ratings;

export default function ReviewsPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero" data-fx="page-hero" aria-labelledby="reviews-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/hero-technician-engine-bay.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 900px) 100vw, 62vw"
            className="page-hero__img page-hero__img--top"
          />
          <span className="page-hero__shade" />
        </div>
        <span className="page-hero__ghost" data-ghost="4.5" aria-hidden="true" />

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />
          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            Public profiles · checkable
          </p>
          <h1 id="reviews-title" className="hero__title page-hero__title page-hero__title--wide">
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Reviews — Revive</span></span>{' '}
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>Auto Care, Cedar</span></span>{' '}
            <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>Rapids IA</span></span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />

          <div className="score anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
            <span className="score__num" aria-hidden="true">
              {google.value}
            </span>
            <div>
              <StarMeter value={Number(google.value)} className="score__stars" />
              <p className="score__text">
                Revive Auto Care holds a {google.value}-star rating across {google.count} Google reviews.
              </p>
            </div>
          </div>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── WHAT PEOPLE ARE SAYING ───────────── */}
      <section className="saying" data-fx="reviews" aria-labelledby="saying-title">
        <div className="container">
          <div className="saying__grid">
            <div>
              <Eyebrow n="01">Google · CARFAX</Eyebrow>
              <h2 id="saying-title" className="h2 h2--md" data-split>
                <Split>What people are saying</Split>
              </h2>
              <p className="saying__text" data-reveal>
                Drivers rate Revive Auto Care {google.value} out of 5 across {google.count} Google reviews, and{' '}
                {carfax.value} out of 5 across {carfax.count} verified CARFAX reviews. Every figure comes from a public
                profile you can check.
              </p>
            </div>

            <div className="tickets tickets--flat" data-tickets>
              <article className="ticket ticket--a" aria-label="Google rating">
                <header className="ticket__head">
                  <span className="mono">Google</span>
                  <StarMeter value={Number(google.value)} className="ticket__meter" />
                </header>
                <p className="ticket__score">
                  <CountUp to={Number(google.value)} decimals={1} />
                  <span className="ticket__of">/ 5</span>
                </p>
                <p className="ticket__foot mono">{google.count} Google reviews</p>
              </article>
              <article className="ticket ticket--b" aria-label="CARFAX rating">
                <header className="ticket__head">
                  <span className="mono">CARFAX</span>
                  <StarMeter value={Number(carfax.value)} className="ticket__meter" />
                </header>
                <p className="ticket__score">
                  <CountUp to={Number(carfax.value)} decimals={1} />
                  <span className="ticket__of">/ 5</span>
                </p>
                <p className="ticket__foot mono">{carfax.count} verified CARFAX reviews</p>
              </article>
            </div>
          </div>

          <TrustindexWidget />

          <p className="saying__more" data-reveal>
            <a href={googleReviewsUrl} className="link-arrow" target="_blank" rel="noopener">
              See every review on Google <ArrowUpRight />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      {/* ───────────── OFF-ROAD NOTE ───────────── */}
      <section className="note" data-fx="note" aria-labelledby="note-title">
        <div className="container">
          <div className="note__box" data-note>
            <svg className="note__border" aria-hidden="true" preserveAspectRatio="none">
              <rect x="1" y="1" width="100%" height="100%" rx="2" pathLength={1} />
            </svg>
            <div className="note__head">
              <p className="mono note__kicker">Separate business · same building</p>
              <h2 id="note-title" className="note__title">
                A note on off-road and suspension work
              </h2>
            </div>
            <p className="note__text">
              Some of our reviews describe lift kits and suspension upgrades. That work belongs to{' '}
              {sisterBusiness.url ? (
                <a href={sisterBusiness.url} target="_blank" rel="noopener">
                  {sisterBusiness.name}
                </a>
              ) : (
                <strong>{sisterBusiness.name}</strong>
              )}
              , a separate business inside the same building. If that’s the kind of work that needs to be done, look for
              it on its own page.
            </p>
            {sisterBusiness.url && (
              <Magnetic>
                <a href={sisterBusiness.url} className="btn btn--paper btn--sm" target="_blank" rel="noopener">
                  Visit <ArrowUpRight />
                  <span className="sr-only"> {sisterBusiness.name} (opens in a new tab)</span>
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to see for yourself?">
        Schedule your appointment online, or call Revive Auto Care at {business.phoneDisplay} and let the team take a
        look at your vehicle.
      </CtaBand>
    </main>
  );
}
