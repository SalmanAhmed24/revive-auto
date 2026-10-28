import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, homeFaqs, timeline } from '@/lib/site';
import { aboutPageSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Tilt from '@/components/motion/Tilt';
import CountUp from '@/components/motion/CountUp';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import VehicleChecklist from '@/components/ui/VehicleChecklist';
import { ArrowRight } from '@/components/icons';

const TITLE = 'About Revive Auto Care | Cedar Rapids Auto Repair Since 1989';
const DESCRIPTION =
  'Revive Auto Care began in Cedar Rapids in 1989 as Big Jim’s Automotive. Family-owned and renamed in 2025, it services domestic and Asian-import vehicles.';
const LEAD =
  'Revive Auto Care began in Cedar Rapids in 1989 as Big Jim’s Automotive. Andy bought the business in 2020, completed the full buyout in January 2023, and renamed it Revive Auto Care in 2025. The name is new, but the shop’s history goes back decades.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/about-us' },
  openGraph: { url: '/about-us', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
];
/** The two questions shown on the approved About page (visible text = schema text). */
const faqs = homeFaqs.slice(0, 2);

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={aboutPageSchema(LEAD)} />
      <JsonLd data={faqSchema(faqs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero page-hero--about" data-fx="page-hero" aria-labelledby="about-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/shop-hands-wrench-engine.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 900px) 100vw, 62vw"
            className="page-hero__img"
          />
          <span className="page-hero__shade" />
        </div>
        <span className="page-hero__ghost" data-ghost="1989" aria-hidden="true" />

        <div className="container page-hero__inner page-hero__grid">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
              Since 1989 · renamed 2025
            </p>
            <h1 id="about-title" className="hero__title page-hero__title page-hero__title--wide">
              <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>About Revive</span></span>{' '}
              <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>Auto Care —</span></span>{' '}
              <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>Cedar Rapids, IA</span></span>
            </h1>
            <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />
            <p className="page-hero__lead anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
              {LEAD}
            </p>
          </div>

          <Tilt className="history-wrap">
            <div className="history" aria-hidden="true">
              <div className="history__top">
                <span className="history__title">Shop history</span>
                <span className="history__no">
                  <span className="mono">No.</span>
                  <span className="history__no-val">{business.foundingYear}</span>
                </span>
              </div>
              <dl className="history__rows mono">
                {timeline.map((t, i) => (
                  <div key={t.year} style={{ '--d': i } as React.CSSProperties}>
                    <dt>{t.year}</dt>
                    <dd>{t.title}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Tilt>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── FOUNDING STORY ───────────── */}
      <section className="story" data-fx="story" aria-labelledby="story-title">
        <div className="container">
          <Eyebrow n="01" dark>
            Founding story
          </Eyebrow>
          <h2 id="story-title" className="h2 h2--light" data-split>
            <Split>One shop, four chapters</Split>
          </h2>

          <ol className="chapters" data-chapters>
            <span className="chapters__line" aria-hidden="true">
              <span className="chapters__fill" />
            </span>
            {timeline.map((t, i) => (
              <li key={t.year} className={`chapter${i === timeline.length - 1 ? ' chapter--now' : ''}`}>
                <span className="chapter__dot" aria-hidden="true" />
                <p className="chapter__year">{t.year}</p>
                <h3 className="chapter__title">{t.title}</h3>
                <p className="chapter__text">
                  {t.text}
                  {t.more && (
                    <>
                      <br />
                      {t.more}
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── ON THE RECORD ───────────── */}
      <section className="record" data-fx="reviews" aria-labelledby="record-title">
        <div className="container record__grid">
          <div>
            <Eyebrow n="02">On the record</Eyebrow>
            <h2 id="record-title" className="h2 h2--md" data-split>
              <Split>What’s confirmed about the shop</Split>
            </h2>
          </div>
          <div>
            <p className="record__text" data-reveal>
              {business.summary} The shop holds a 4.5-star rating across 353 Google reviews and a 4.9-star CARFAX rating
              from 32 verified reviews.
            </p>
            <div className="tickets tickets--flat" data-tickets>
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
        </div>
      </section>

      {/* ───────────── EUROPEAN-MAKES LINE ───────────── */}
      <section className="euro" data-fx="euro" aria-labelledby="euro-title">
        <div className="container euro__grid">
          <div>
            <Eyebrow n="03">Which vehicles</Eyebrow>
            <h2 id="euro-title" className="h2 h2--md" data-split>
              <Split>The European-makes line</Split>
            </h2>
          </div>
          <div>
            <p className="euro__text" data-reveal>
              Revive Auto Care provides professional maintenance, diagnostics, and repair services for domestic and
              Asian-import vehicles, including select hybrid and commercial fleet vehicles.{' '}
              <strong className="euro__script" data-euro-script>
                We do not service European makes.
              </strong>
            </p>
            <VehicleChecklist className="euro__list" />
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="faq faq--about" data-fx="faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div>
            <Eyebrow n="04">Straight answers</Eyebrow>
            <h2 id="faq-title" className="h2 h2--md" data-split>
              <Split>Frequently asked questions</Split>
            </h2>
          </div>
          <div>
            <div className="faq__list" data-stagger>
              {faqs.map((f) => (
                <details className="faq__item" key={f.q}>
                  <summary>
                    <h3 className="faq__q">{f.q}</h3>
                    <span className="faq__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq__a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <p className="faq__more" data-reveal>
              <Link href="/reviews" className="link-arrow">
                Read the reviews <ArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Want to hear from the drivers who’ve used the shop?">
        Read our <Link href="/reviews">reviews</Link>, or schedule your next service online. You can also call Revive
        Auto Care at {business.phoneDisplay}.
      </CtaBand>
    </main>
  );
}
