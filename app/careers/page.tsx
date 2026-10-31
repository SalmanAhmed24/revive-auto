import type { Metadata } from 'next';
import Image from 'next/image';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import ApplyForm from '@/components/careers/ApplyForm';

const TITLE = 'Auto Repair Jobs in Cedar Rapids, IA | Revive Auto Care';
const DESCRIPTION =
  'Now hiring in Cedar Rapids: Revive Auto Care is open to meeting auto technicians and service advisors. Apply online in a minute.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/careers' },
  openGraph: { url: '/careers', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Careers', path: '/careers' },
];

export default function CareersPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero page-hero--short" data-fx="page-hero" aria-labelledby="careers-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/technician-engine-wiring.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 900px) 100vw, 62vw"
            className="page-hero__img"
            style={{ objectPosition: '50% 30%' }}
          />
          <span className="page-hero__shade" />
        </div>

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />
          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            Now hiring · Cedar Rapids
          </p>
          <h1 id="careers-title" className="hero__title page-hero__title page-hero__title--long">
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Careers at Revive</span></span>{' '}
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>Auto Care</span></span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 4 } as React.CSSProperties} aria-hidden="true" />
          <p className="page-hero__lead anim-rise" style={{ '--i': 5 } as React.CSSProperties}>
            We’re looking for great people who care about customers and cars.
          </p>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── JOIN + APPLY ───────────── */}
      <section className="join" data-fx="careers" aria-labelledby="join-title">
        <div className="container join__grid">
          <div className="join__copy">
            <Eyebrow n="01">Technicians · service advisors</Eyebrow>
            <h2 id="join-title" className="h2 h2--md" data-split>
              <Split>Join a team that cares</Split>
            </h2>
            <p className="join__text" data-reveal>
              Looking for a workplace where your skills are respected and your work matters? At Revive Auto Care, we’re
              always open to meeting passionate auto technicians and service advisors. We value teamwork, transparency,
              and treating every vehicle like it belongs to a family member.
            </p>
            <div className="join__note" data-reveal>
              <h3 className="join__note-title">Decades of local service</h3>
              <p>Locally owned. Community driven. Always here when you need us.</p>
            </div>
          </div>

          <ApplyForm />
        </div>
      </section>
    </main>
  );
}
