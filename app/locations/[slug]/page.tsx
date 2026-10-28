import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from '@/components/SmartLink';
import { business, directionsFrom, fullAddress, locations } from '@/lib/site';
import { townDetails } from '@/lib/town-pages';
import { breadcrumbSchema, faqSchema, townPageSchema } from '@/lib/schema';
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
import { ArrowRight, Calendar, Phone } from '@/components/icons';
import BookingLink from '@/components/BookingLink';

type Props = { params: Promise<{ slug: string }> };

/** Only towns with written content are generated; any other slug is a real 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(townDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = townDetails[slug];
  if (!d) return {};
  const path = `/locations/${slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${d.metaTitle} | ${business.name}`, description: d.metaDescription },
  };
}

const tel = `tel:${business.phoneE164}`;

export default async function TownPage({ params }: Props) {
  const { slug } = await params;
  const d = townDetails[slug];
  const town = locations.find((l) => l.slug === slug);
  if (!d || !town) notFound();
  const name = town.name;
  const path = `/locations/${slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name, path },
  ];
  // Distance FAQ: states the drive time only once the shop has confirmed it; never estimated.
  const faqs = [
    {
      q: `How far is Revive Auto Care from ${name}?`,
      a: d.driveTime
        ? `${d.driveTime} Revive Auto Care is at ${fullAddress}.`
        : `Revive Auto Care is at ${fullAddress}. [Get driving directions from ${name}](${directionsFrom(name)}).`,
    },
  ];
  const others = locations.filter((l) => l.slug !== slug);

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={townPageSchema({ slug, town: name, description: d.heroIntro })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ q: f.q, a: plain(f.a) })))} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero" data-fx="page-hero" aria-labelledby="town-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/shop-bays-lifts.webp"
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

        <div className="container page-hero__inner page-hero__grid">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
              {d.heroTag}
            </p>
            <h1 id="town-title" className="hero__title page-hero__title page-hero__title--wide">
              <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Auto Repair Near</span></span>{' '}
              <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>{name}, IA</span></span>
            </h1>
            <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />
            <p className="page-hero__lead anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
              {d.heroIntro}
            </p>
            {d.driveTime && (
              <p className="town-drive mono anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
                From {name}: {d.driveTime}
              </p>
            )}
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
            <div className="history" aria-hidden="true">
              <div className="history__top">
                <span className="history__title">{business.name}</span>
              </div>
              <dl className="history__rows mono">
                {[
                  ['Serving', `${name}, IA`],
                  ['Shop', business.street],
                  ['City', `${business.city}, ${business.region} ${business.postalCode}`],
                  ['Phone', business.phoneDisplay],
                  ['Hours', 'Mon–Thu 7:30–5:30'],
                ].map(([k, v], i) => (
                  <div key={k} style={{ '--d': i } as React.CSSProperties}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Tilt>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── WHY ───────────── */}
      <section className="euro town-why" data-fx="euro" aria-labelledby="why-title">
        <div className="container euro__grid">
          <div>
            <Eyebrow n="01">Public, checkable</Eyebrow>
            <h2 id="why-title" className="h2 h2--md" data-split>
              <Split>{`Why ${name} drivers choose Revive`}</Split>
            </h2>
          </div>
          <div>
            {d.why.map((p) => (
              <p key={p.slice(0, 24)} className="why__text why__text--sm" data-reveal>
                <RichText text={p} />
              </p>
            ))}
            <VehicleChecklist className="euro__list" />
          </div>
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="town-svc" data-fx="faq" aria-labelledby="svc-title">
        <div className="container section-head section-head--plain">
          <div>
            <Eyebrow n="02">One shop, ten services</Eyebrow>
            <h2 id="svc-title" className="h2 h2--md" data-split>
              <Split>Services available</Split>
            </h2>
          </div>
          <p className="section-head__text" data-reveal>
            <RichText text={d.services} />
          </p>
        </div>
      </section>

      {/* ───────────── WHERE ───────────── */}
      <section className="reach reach--svc" data-fx="reach" aria-labelledby="where-title">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow n="03">Address · hours</Eyebrow>
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
      <section className="faq faq--about" data-fx="faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div>
            <Eyebrow n="04">Straight answers</Eyebrow>
            <h2 id="faq-title" className="h2 h2--md" data-split>
              <Split>Frequently asked questions</Split>
            </h2>
          </div>
          <div className="faq__list" data-stagger>
            {faqs.map((f) => (
              <details className="faq__item" key={f.q} open>
                <summary>
                  <h3 className="faq__q">{f.q}</h3>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <div className="faq__a">
                  <p>
                    <RichText text={f.a} />
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── OTHER TOWNS ───────────── */}
      <section className="more" data-fx="more" aria-labelledby="towns-title">
        <div className="container">
          <h2 id="towns-title" className="mono more__title" data-reveal>
            Other towns we serve
          </h2>
          <ul className="town-chips" data-stagger>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/locations/${o.slug}`} className="town-chip">
                  {o.name}
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Ready to schedule?">{d.cta}</CtaBand>
    </main>
  );
}
