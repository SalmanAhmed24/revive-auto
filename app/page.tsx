import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, services, locations, timeline } from '@/lib/site';
import RepairOrder from '@/components/home/RepairOrder';
import Magnetic from '@/components/motion/Magnetic';
import ServiceMenu from '@/components/home/ServiceMenu';
import Seal from '@/components/home/Seal';
import CountUp from '@/components/motion/CountUp';
import MetroRadar from '@/components/home/MetroRadar';
import OpenStatus from '@/components/home/OpenStatus';
import ScrollFx from '@/components/motion/ScrollFx';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Split from '@/components/motion/Split';
import { ArrowRight, Phone, Calendar } from '@/components/icons';
import BookingLink from '@/components/BookingLink';

export const metadata: Metadata = {
  title: { absolute: 'Auto Repair in Cedar Rapids, IA | Revive Auto Care' },
  description:
    'Family-owned auto repair in Cedar Rapids, IA since 1989. Brakes, oil changes, diagnostics and more for domestic and Asian-import vehicles — estimate before work.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Auto Repair in Cedar Rapids, IA | Revive Auto Care',
    description:
      'Family-owned Cedar Rapids auto repair since 1989. 4.5★ across 353 Google reviews. Estimate before work, Mon–Thu 7:30 AM – 5:30 PM.',
  },
};

const tel = `tel:${business.phoneE164}`;
const marquee = services.map((s) => s.name);

export default function HomePage() {
  return (
    <main id="main">
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__year" />
          <span className="hero__glow" />
        </div>

        <div className="container hero__grid">
          <div className="hero__copy" data-hero-copy>
            <p className="hero__eyebrow anim-rise" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="tag">Since 1989</span>
              <span className="mono">Cedar Rapids, Iowa · Family-owned</span>
            </p>

            <h1 id="hero-title" className="hero__title">
              <span className="line"><span style={{ '--i': 1 } as React.CSSProperties}>Auto repair in</span></span>{' '}
              <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Cedar Rapids, IA —</span></span>{' '}
              <span className="line line--script"><span style={{ '--i': 3 } as React.CSSProperties}>honest work,</span></span>{' '}
              <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>over 30 years in.</span></span>
            </h1>

            <p className="hero__lead anim-rise" style={{ '--i': 5 } as React.CSSProperties}>
              From diagnostics to repairs, our family-run shop keeps you moving. Locally owned, Cedar Rapids auto
              repair pros.
            </p>

            <div className="hero__ctas anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
              <Magnetic>
                <BookingLink className="btn btn--red">
                  <Calendar /> Schedule Appointment <ArrowRight />
                </BookingLink>
              </Magnetic>
              <Magnetic>
                <a href={tel} className="btn btn--ghost">
                  <Phone /> Call Now <span className="btn__muted">{business.phoneDisplay}</span>
                </a>
              </Magnetic>
            </div>

            <p className="hero__hours mono anim-rise" style={{ '--i': 7 } as React.CSSProperties}>
              <OpenStatus />
              <span>{business.hoursShort}</span>
            </p>
          </div>

          <div className="hero__visual">
            <div className="hero__photo" data-hero-photo>
              <Image
                src="/images/hero-technician-engine-bay.webp"
                alt="Revive Auto Care technician working in an engine bay at the Cedar Rapids shop"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 900px) 72vw, 34vw"
                quality={70}
                className="hero__img"
              />
              <span className="hero__photo-shade" aria-hidden="true" />
            </div>
            <RepairOrder />
          </div>
        </div>

        <div className="hero__scroll mono" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero__scroll-bar" />
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div className="marquee" aria-hidden="true" data-marquee>
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div className="marquee__group" key={k}>
              {marquee.map((m) => (
                <span key={m + k} className="marquee__item">
                  {m}
                  <span className="marquee__star">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────────── PROOF ───────────── */}
      <section className="proof" data-fx="proof" aria-labelledby="proof-title">
        <div className="container">
          <h2 id="proof-title" className="sr-only">
            Revive Auto Care at a glance
          </h2>
          <ul className="seals" data-seals>
            <li>
              <Seal ring="Serving Cedar Rapids ★ Serving Cedar Rapids ★" tone="ink">
                <strong className="seal__num"><CountUp to={30} suffix="+" /></strong>
                <span className="seal__label">Years in</span>
              </Seal>
            </li>
            <li>
              <Seal ring="353 Google reviews ★ 353 Google reviews ★" tone="red">
                <strong className="seal__num"><CountUp to={4.5} decimals={1} suffix="★" /></strong>
                <span className="seal__label">Google rating</span>
              </Seal>
            </li>
            <li>
              <Seal ring="32 verified reviews ★ 32 verified reviews ★" tone="ink">
                <strong className="seal__num"><CountUp to={4.9} decimals={1} suffix="★" /></strong>
                <span className="seal__label">CARFAX rating</span>
              </Seal>
            </li>
            <li>
              <Seal ring="Locally owned & run ★ Locally owned & run ★" tone="red">
                <strong className="seal__num seal__num--script">Family</strong>
                <span className="seal__label">Owned</span>
              </Seal>
            </li>
          </ul>
          <p className="proof__text" data-reveal>
            Revive Auto Care has served Cedar Rapids for over 30 years and is family-owned. Drivers rate it 4.5 stars
            across 353 Google reviews, and CARFAX shows 4.9 stars from 32 verified reviews. Every number here comes
            from a public profile you can check.
          </p>
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="services" data-fx="services" aria-labelledby="services-title" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow n="01">Ten services, equal weight</Eyebrow>
              <h2 id="services-title" className="h2" data-split>
                <Split>Services</Split>
              </h2>
            </div>
            <p className="section-head__text" data-reveal>
              From a <Link href="/services/brake-service">brake service</Link> or an{' '}
              <Link href="/services/oil-change">oil change</Link> to{' '}
              <Link href="/services/check-engine-light">check engine light diagnostics</Link>, there’s a service for
              what your vehicle needs. Pick any of the ten below.
            </p>
          </div>

          <ServiceMenu services={services} />

          <p className="services__all" data-reveal>
            <Link href="/services" className="link-arrow">
              All services <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────── WHY ───────────── */}
      <section className="why" data-fx="why" aria-labelledby="why-title">
        <div className="container why__grid">
          <figure className="why__media" data-clip-reveal>
            <div className="why__img-wrap">
              <Image
                src="/images/shop-hands-wrench-engine.webp"
                alt="Mechanic’s hands turning a wrench on an engine at Revive Auto Care"
                fill
                sizes="(max-width: 900px) 92vw, 42vw"
                className="why__img"
                data-parallax-img
              />
            </div>
            <figcaption className="why__stamp">
              <span>Est. 1989</span>
              <small>as Big Jim’s</small>
            </figcaption>
          </figure>

          <div className="why__copy">
            <Eyebrow n="02">The shop</Eyebrow>
            <h2 id="why-title" className="h2" data-split>
                <Split>Why Revive Auto Care</Split>
              </h2>
            <p className="why__text" data-reveal>
              Revive Auto Care has served Cedar Rapids for over 30 years, family-owned throughout. Revive Auto Care
              provides professional maintenance, diagnostics, and repair services for domestic and Asian-import
              vehicles, including select hybrid and commercial fleet vehicles.
            </p>
            <p className="why__script" data-reveal>
              We do not service European makes.
            </p>

            <ul className="checklist" aria-label="Vehicles we service" data-checklist>
              {business.vehicles.serviced.map((v) => (
                <li key={v} className="checklist__item">
                  <span className="checkbox" aria-hidden="true">
                    <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" /></svg>
                  </span>
                  {v}
                </li>
              ))}
              <li className="checklist__item checklist__item--no">
                <span className="checkbox checkbox--x" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                </span>
                <s>{business.vehicles.notServiced}</s>
                <span className="sr-only"> — not serviced</span>
              </li>
            </ul>

            <ol className="timeline" data-timeline aria-label="Shop history">
              <span className="timeline__progress" aria-hidden="true" data-timeline-bar />
              {timeline.map((t) => (
                <li className="timeline__item" key={t.year}>
                  <span className="timeline__year">{t.year}</span>
                  <h3 className="timeline__title">{t.title}</h3>
                  <p className="timeline__text">{t.text}</p>
                </li>
              ))}
            </ol>

            <Link href="/about-us" className="link-arrow" data-reveal>
              The full story <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── REVIEWS ───────────── */}
      <section className="reviews" data-fx="reviews" aria-labelledby="reviews-title">
        <div className="container reviews__grid">
          <div>
            <Eyebrow n="03">Public, checkable</Eyebrow>
            <h2 id="reviews-title" className="h2" data-split>
                <Split>What drivers say</Split>
              </h2>
            <p className="reviews__text" data-reveal>
              Revive Auto Care holds a 4.5-star rating across 353 Google reviews, and drivers also rate it 4.9 stars on
              CARFAX. <Link href="/reviews">Read more reviews</Link> to see what Cedar Rapids drivers say about their
              experience. Every figure comes from a public profile you can check.
            </p>
            <div data-reveal>
              <Magnetic>
                <Link href="/reviews" className="btn btn--paper">
                  Read more reviews <ArrowRight />
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="tickets" data-tickets>
            <article className="ticket ticket--a" aria-label="Google rating">
              <header className="ticket__head">
                <span className="mono">Google</span>
                <span className="ticket__stars" aria-hidden="true">★★★★★</span>
              </header>
              <p className="ticket__score">
                <CountUp to={4.5} decimals={1} />
                <span className="ticket__of">/ 5</span>
              </p>
              <p className="ticket__foot mono">353 Google reviews</p>
            </article>
            <article className="ticket ticket--b" aria-label="CARFAX rating">
              <header className="ticket__head">
                <span className="mono">CARFAX</span>
                <span className="ticket__stars" aria-hidden="true">★★★★★</span>
              </header>
              <p className="ticket__score">
                <CountUp to={4.9} decimals={1} />
                <span className="ticket__of">/ 5</span>
              </p>
              <p className="ticket__foot mono">32 verified CARFAX reviews</p>
            </article>
          </div>
        </div>
      </section>

      {/* ───────────── METRO ───────────── */}
      <section className="metro" data-fx="metro" aria-labelledby="metro-title">
        <div className="container metro__grid">
          <div>
            <Eyebrow n="04" dark>
              Cedar Rapids &amp; nearby
            </Eyebrow>
            <h2 id="metro-title" className="h2 h2--light" data-split>
                <Split>Serving the metro</Split>
              </h2>
            <p className="metro__text" data-reveal>
              Revive Auto Care is in Cedar Rapids and serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher.
              Each town has its own page with the details for getting to the shop.
            </p>
            <ul className="metro__list" data-stagger>
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="metro__link">
                    <span>Auto repair near {l.name}</span>
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <MetroRadar />
        </div>
      </section>

      <CtaBand title="Ready to get your vehicle looked at?">
        Schedule online, or call Revive Auto Care at {business.phoneDisplay}, {business.hoursSentence}.
      </CtaBand>
    </main>
  );
}
