import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from '@/components/SmartLink';
import { business, services, sisterBusiness } from '@/lib/site';
import { serviceDetails } from '@/lib/service-pages';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import VehicleChecklist from '@/components/ui/VehicleChecklist';
import VisitCard from '@/components/ui/VisitCard';
import RichText, { plain } from '@/components/ui/RichText';
import ScrubStatement from '@/components/services/ScrubStatement';
import { ArrowRight, ArrowUpRight, Calendar, Phone } from '@/components/icons';
import BookingLink from '@/components/BookingLink';

type Props = { params: Promise<{ slug: string }> };

/** Only services with written content are generated; any other slug is a real 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = serviceDetails[slug];
  if (!d) return {};
  const path = `/services/${slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${d.metaTitle} | ${business.name}`, description: d.metaDescription },
  };
}

const tel = `tel:${business.phoneE164}`;

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const d = serviceDetails[slug];
  const index = services.findIndex((s) => s.slug === slug);
  if (!d || index < 0) notFound();
  const svc = services[index];
  const no = String(index + 1).padStart(2, '0');
  const path = `/services/${slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: svc.name, path },
  ];
  /** Section numbers follow the sections this page actually has, in template order. */
  const order = (
    [
      ['guide', d.guide],
      ['included', d.included],
      ['signs', d.signs],
      ['why', d.why],
      ['pricing', d.pricing],
      ['where', true],
      ['faq', d.faqs.length],
    ] as const
  )
    .filter(([, present]) => present)
    .map(([key]) => key);
  const num = (key: (typeof order)[number]) => String(order.indexOf(key) + 1).padStart(2, '0');
  const related = d.related.map((r) => services.find((s) => s.slug === r)!).filter(Boolean);

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema({ slug, name: svc.name, description: plain(d.includedIntro ?? d.heroIntro), image: svc.image, covers: d.included ?? d.ticketChecks })}
      />
      {d.faqs.length > 0 && <JsonLd data={faqSchema(d.faqs.map((f) => ({ q: f.q, a: plain(f.a).replace(/\n\n/g, ' ') })))} />}
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero" data-fx="page-hero" aria-labelledby="svc-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src={svc.image}
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
        <span className="page-hero__ghost" data-ghost={no} aria-hidden="true" />

        <div className="container page-hero__inner page-hero__grid">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
              No.{no} / {String(services.length).padStart(2, '0')} · {d.heroTag}
            </p>
            <h1
              id="svc-title"
              className={`hero__title page-hero__title page-hero__title--wide${d.h1Lines.join(' ').length > 32 ? ' page-hero__title--long' : ''}`}
            >
              {d.h1Lines.map((line, i) => (
                <span key={line}>
                  <span className="line">
                    <span style={{ '--i': i + 2 } as React.CSSProperties}>{line}</span>
                  </span>
                  {i < d.h1Lines.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />
            <p className="page-hero__lead anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
              {d.heroIntro}
            </p>
            <div className="hero__ctas anim-rise" style={{ '--i': 7 } as React.CSSProperties}>
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
          </div>

          <Tilt className="history-wrap">
            <div className="history workorder" aria-hidden="true">
              <div className="history__top">
                <span className="history__title">Work order</span>
                <span className="history__no">
                  <span className="mono">No.</span>
                  <span className="history__no-val">{no}</span>
                </span>
              </div>
              <dl className="history__rows mono">
                <div style={{ '--d': 0 } as React.CSSProperties}>
                  <dt>Service</dt>
                  <dd>{svc.name}</dd>
                </div>
                <div style={{ '--d': 1 } as React.CSSProperties}>
                  <dt>Shop</dt>
                  <dd>Cedar Rapids, IA</dd>
                </div>
                <div style={{ '--d': 2 } as React.CSSProperties}>
                  <dt>Pricing</dt>
                  <dd>Estimate first</dd>
                </div>
              </dl>
              <span className="ro__perf workorder__perf" />
              <ul className="ro__checks mono workorder__checks">
                {d.ticketChecks.map((c, i) => (
                  <li key={c}>
                    <svg viewBox="0 0 16 16" className="ro__box">
                      <rect x="1" y="1" width="14" height="14" />
                      <path d="M4 8.5l2.6 2.6L12.5 5" pathLength={1} className="ro__tick" style={{ ['--d' as string]: i + 2 } as React.CSSProperties} />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Tilt>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── GUIDE (optional) — e.g. steady vs. flashing ───────────── */}
      {d.guide && (
        <section className="guide" data-fx="guide" aria-labelledby="guide-title">
          <div className="container guide__grid">
            <div>
              <Eyebrow n={num('guide')}>{d.guide.eyebrow}</Eyebrow>
              <h2 id="guide-title" className="h2 h2--md" data-split>
                <Split>{d.guide.heading}</Split>
              </h2>
            </div>
            <div>
              <p className="guide__intro" data-reveal>
                <RichText text={d.guide.intro} />
              </p>
              <ul className="guide__cards" data-guide>
                {d.guide.cards.map((c) => (
                  <li key={c.label} className={`gcard gcard--${c.tone}`}>
                    <span className="gcard__lamp" aria-hidden="true">
                      <i />
                    </span>
                    <h3 className="gcard__label">{c.label}</h3>
                    <p className="gcard__text">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── WHAT'S INCLUDED ───────────── */}
      {d.included && (
      <section className="incl" data-fx="incl" aria-labelledby="incl-title">
        <div className="container incl__grid">
          <div>
            <Eyebrow n={num('included')}>Scope of work</Eyebrow>
            <h2 id="incl-title" className="h2 h2--md" data-split>
              <Split>What’s included</Split>
            </h2>
          </div>
          <div>
            <p className="incl__intro" data-reveal>
              <RichText text={d.includedIntro ?? ''} />
            </p>
            <ol className="incl__list" data-incl>
              {d.included!.map((item, i) => (
                <li key={item} className="incl__item">
                  <span className="incl__n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      )}

      {/* ───────────── WARNING SIGNS (optional) ───────────── */}
      {d.signs && (
      <section className="signs" data-fx="signs" aria-labelledby="signs-title">
        <div className="container signs__grid">
          <div>
            <p className="eyebrow eyebrow--dark eyebrow--plain" data-reveal>
              <span className="mono">{num('signs')}</span>
              <span className="eyebrow__rule" aria-hidden="true" />
              <span>Warning signs</span>
            </p>
            <h2 id="signs-title" className="h2 h2--md h2--light" data-split>
              <Split>{d.signs!.heading}</Split>
            </h2>
          </div>
          <div>
            <ScrubStatement text={d.signs!.statement} className="signs__statement" />
            <p className="signs__body" data-reveal>
              <RichText text={d.signs!.body} />
            </p>
          </div>
        </div>
      </section>
      )}

      {/* ───────────── WHY REVIVE ───────────── */}
      {d.why && (
      <section className="why why--svc" data-fx="why" aria-labelledby="why-title">
        <div className="container why__grid">
          <figure className="why__media" data-clip-reveal>
            <div className="why__img-wrap">
              <Image src={d.why!.image} alt={d.why!.imageAlt} fill sizes="(max-width: 900px) 92vw, 42vw" className="why__img" data-parallax-img />
            </div>
          </figure>
          <div className="why__copy">
            <Eyebrow n={num('why')}>{d.why!.eyebrow}</Eyebrow>
            <h2 id="why-title" className="h2 h2--md" data-split>
              <Split>Why Revive Auto Care</Split>
            </h2>
            {d.why!.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="why__text why__text--sm" data-reveal>
                <RichText text={p} />
              </p>
            ))}
            <VehicleChecklist className="why__vehicles" />
          </div>
        </div>
      </section>
      )}

      {/* ───────────── PRICING ───────────── */}
      {d.pricing && (
      <section className="pricing" data-fx="pricing" aria-labelledby="pricing-title">
        <div className="container pricing__row" data-pricing>
          <h2 id="pricing-title" className="pricing__label mono">
            <span className="pricing__no" data-n={num('pricing')} aria-hidden="true" />
            <span className="eyebrow__rule" aria-hidden="true" />
            Pricing
          </h2>
          <p className="pricing__text">{d.pricing}</p>
          <span className="pricing__stamp" aria-hidden="true">
            Estimate first
          </span>
        </div>
      </section>
      )}

      {/* ───────────── WHERE WE WORK ───────────── */}
      <section className="reach reach--svc" data-fx="reach" aria-labelledby="where-title">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow n={num('where')}>Cedar Rapids metro</Eyebrow>
              <h2 id="where-title" className="h2 h2--md" data-split>
                <Split>Where we work</Split>
              </h2>
            </div>
            <p className="section-head__text" data-reveal>
              <RichText text={d.where} />
            </p>
          </div>
          <VisitCard />
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      {d.faqs.length > 0 && (
      <section className="faq faq--about" data-fx="faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div>
            <Eyebrow n={num('faq')}>Straight answers</Eyebrow>
            <h2 id="faq-title" className="h2 h2--md" data-split>
              <Split>Frequently asked questions</Split>
            </h2>
          </div>
          <div className="faq__list" data-stagger>
            {d.faqs.map((f, i) => (
              <details className="faq__item" key={f.q} open={i === 0}>
                <summary>
                  <h3 className="faq__q">{f.q}</h3>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <div className="faq__a">
                  {f.a.split('\n\n').map((para) => (
                    <p key={para.slice(0, 24)}>
                      <RichText text={para} />
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ───────────── SISTER-BUSINESS NOTE (optional) ───────────── */}
      {d.sisterNote && (
        <section className="note note--svc" data-fx="note" aria-label="Separate business in the same building">
          <div className="container">
            <div className="note__box note__box--slim" data-note>
              <svg className="note__border" aria-hidden="true" preserveAspectRatio="none">
                <rect x="1" y="1" width="100%" height="100%" rx="2" pathLength={1} />
              </svg>
              <div className="note__head">
                <p className="mono note__kicker">Separate business · same building</p>
                <p className="note__text note__text--lead">{d.sisterNote}</p>
              </div>
              {sisterBusiness.url && (
                <a href={sisterBusiness.url} className="link-arrow" target="_blank" rel="noopener">
                  Lift kits at Iowa Off-Road <ArrowUpRight />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── MORE FROM THE SHOP ───────────── */}
      <section className="more" data-fx="more" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="mono more__title" data-reveal>
            More from the shop
          </h2>
          <ul className="more__grid" data-stagger>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="more__card">
                  <span className="more__name">{r.name}</span>
                  <span className="more__desc">{r.short}</span>
                  <span className="more__go" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={d.cta.title}>{d.cta.text}</CtaBand>
    </main>
  );
}
