import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, services, workflow } from '@/lib/site';
import { breadcrumbSchema, servicesListSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import ServiceJump from '@/components/services/ServiceJump';
import { ArrowRight } from '@/components/icons';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import VehicleChecklist from '@/components/ui/VehicleChecklist';

const TITLE = 'Auto Repair Services in Cedar Rapids, IA';
const DESCRIPTION =
  'Brakes, oil changes, check engine light, A/C, diagnostics, engine, steering, transmission, electrical and battery service in Cedar Rapids, IA. Estimate first.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: { url: '/services', title: `${TITLE} | Revive Auto Care`, description: DESCRIPTION },
};

const tel = `tel:${business.phoneE164}`;
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];
/** Cards whose approved copy carries an inline "See our … page." link. */
const inlineLink: Record<string, string> = {
  'brake-service': 'brake service page',
  'oil-change': 'oil change page',
};

export default function ServicesPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema(crumbs)}
      />
      <JsonLd data={servicesListSchema()} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero" data-fx="page-hero" aria-labelledby="services-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/hero-services-lift.webp"
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
        <span className="page-hero__ghost" data-ghost="10" aria-hidden="true" />

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />

          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            10 services · one shop
          </p>

          <h1 id="services-title" className="hero__title page-hero__title">
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Auto repair</span></span>{' '}
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>services in Cedar</span></span>{' '}
            <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>Rapids, IA</span></span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />

          <div className="page-hero__vehicles anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
            <p className="mono page-hero__label">Vehicles we work on</p>
            <VehicleChecklist dark />
          </div>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── HOW WE WORK ───────────── */}
      <section className="how" data-fx="how" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow n="01">Cause first</Eyebrow>
              <h2 id="how-title" className="h2" data-split>
                <Split>How we work</Split>
              </h2>
            </div>
            <p className="section-head__text" data-reveal>
              Every job at Revive Auto Care starts by finding the cause of the problem, and the repair recommendation
              comes after that. The shop’s technicians work on domestic and Asian-import vehicles, including select
              hybrid and commercial fleet vehicles. We don’t service European makes and models. Pick a service below to
              see what it covers, or call <a href={tel}>{business.phoneDisplay}</a> if you’re not sure where your
              problem fits.
            </p>
          </div>

          <ol className="how__steps" data-how>
            <span className="how__progress" aria-hidden="true" />
            {workflow.map((step, i) => (
              <li className="how__step" key={step.n}>
                <span className="how__num">{step.n}</span>
                {i < workflow.length - 1 ? (
                  <span className="how__arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                ) : (
                  <span className="how__stamp" aria-hidden="true">
                    Estimate first
                  </span>
                )}
                <h3 className="how__title">{step.title}</h3>
                <p className="how__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── THE SERVICES ───────────── */}
      <section className="svc" data-fx="svc" aria-labelledby="svc-title">
        <div className="container">
          <div className="section-head section-head--tight">
            <div>
              <Eyebrow n="02">Ten pages, equal weight</Eyebrow>
              <h2 id="svc-title" className="h2" data-split>
                <Split>The services</Split>
              </h2>
            </div>
            <p className="mono svc__note" data-reveal>
              No flat prices · <span>written estimate after inspection</span>
            </p>
          </div>
        </div>

        <ServiceJump items={services.map((s) => ({ id: s.slug, label: s.name }))} />

        <div className="container">
          <ul className="svc__grid">
            {services.map((s, i) => {
              const n = String(i + 1).padStart(2, '0');
              const href = `/services/${s.slug}`;
              return (
                <li key={s.slug} id={s.slug} className="svc-card" data-svc-card>
                  <div className="svc-card__media">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1100px) 40vw, 260px"
                      className="svc-card__img"
                    />
                    <span className="svc-card__no mono">No.{n}</span>
                  </div>
                  <div className="svc-card__body">
                    <h3 className="svc-card__title">
                      <Link href={href}>{s.name}</Link>
                    </h3>
                    <p className="svc-card__desc">
                      {s.long}
                      {inlineLink[s.slug] && (
                        <>
                          {' '}
                          See our <Link href={href}>{inlineLink[s.slug]}</Link>.
                        </>
                      )}
                    </p>
                    <span className="svc-card__perf" aria-hidden="true" />
                    <ul className="svc-card__list" aria-label={`${s.name} covers`}>
                      {s.includes.map((item) => (
                        <li key={item}>
                          <span className="checkbox" aria-hidden="true">
                            <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" /></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="svc-card__foot">
                      <Link href={href} className="link-arrow">
                        View service<span className="sr-only">: {s.name}</span> <ArrowRight />
                      </Link>
                      <span className="mono svc-card__est">Estimate first</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand title="Not sure which service fits?">
        Call Revive Auto Care at {business.phoneDisplay} and describe what’s going on, or schedule online and the team
        will sort out the rest when you arrive.
      </CtaBand>
    </main>
  );
}
