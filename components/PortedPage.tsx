import type { Metadata } from 'next';
import Image from 'next/image';
import { business } from '@/lib/site';
import { portedPages, isReady, type PortedKey, type PortedSection } from '@/lib/ported-pages';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Magnetic from '@/components/motion/Magnetic';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import RichText from '@/components/ui/RichText';
import { ArrowRight, ArrowUpRight } from '@/components/icons';

/** Metadata for a ported page; noindex until its content has been added (lib/ported-pages.ts). */
export function portedMetadata(key: PortedKey): Metadata {
  const p = portedPages[key];
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: { canonical: p.path },
    openGraph: { url: p.path, title: p.metaTitle, description: p.metaDescription },
    ...(isReady(key) ? {} : { robots: { index: false, follow: true } }),
  };
}

/** Financing / Careers: short hero → ported content sections → closing band (shared design). */
export default function PortedPage({ page: key }: { page: PortedKey }) {
  const p = portedPages[key];
  const sections = p.sections as PortedSection[];
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: p.title, path: p.path },
  ];

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero page-hero--short" data-fx="page-hero" aria-labelledby={`${key}-title`}>
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src={p.heroImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 900px) 100vw, 62vw"
            className="page-hero__img"
            style={'heroFocus' in p ? { objectPosition: p.heroFocus } : undefined}
          />
          <span className="page-hero__shade" />
        </div>

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />
          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            {business.name}
          </p>
          <h1 id={`${key}-title`} className="hero__title page-hero__title">
            <span className="line">
              <span style={{ '--i': 2 } as React.CSSProperties}>{p.title}</span>
            </span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 3 } as React.CSSProperties} aria-hidden="true" />
        </div>

        <InfoBar />
      </section>

      {/* ───────────── PORTED CONTENT ───────────── */}
      {sections.map((s, i) => {
        const external = /^https?:/.test(s.cta?.href ?? '');
        return (
          <section key={s.heading} className="euro fin-sec" data-fx="euro" aria-labelledby={`${key}-${i}`}>
            <div className="container euro__grid">
              <div>
                <Eyebrow n={String(i + 1).padStart(2, '0')}>{s.kicker ?? p.title}</Eyebrow>
                <h2 id={`${key}-${i}`} className="h2 h2--md" data-split>
                  <Split>{s.heading}</Split>
                </h2>
              </div>
              <div>
                {s.body.split(/\n\s*\n/).map((para) => (
                  <p key={para.slice(0, 24)} className="why__text why__text--sm" data-reveal>
                    <RichText text={para} />
                  </p>
                ))}
                {s.cta && (
                  <p data-reveal>
                    <Magnetic>
                      <a
                        href={s.cta.href}
                        className="btn btn--red"
                        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                      >
                        {s.cta.label} {external ? <ArrowUpRight /> : <ArrowRight />}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </Magnetic>
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand title={p.ctaTitle} long>
        Call {business.name} at {business.phoneDisplay} during shop hours, Monday through Thursday, 7:30 AM to 5:30 PM.
      </CtaBand>
    </main>
  );
}
