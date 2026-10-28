import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, locations } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import VisitCard from '@/components/ui/VisitCard';
import MetroRadar from '@/components/home/MetroRadar';
import { ArrowRight } from '@/components/icons';

const TITLE = 'Auto Repair Near Cedar Rapids, Marion & Hiawatha | Revive';
const DESCRIPTION =
  'Revive Auto Care in Cedar Rapids, IA serves drivers from Marion, Hiawatha, Robins, Ely and Swisher. Find your town and directions to the shop.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/locations' },
  openGraph: { url: '/locations', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Locations', path: '/locations' },
];

export default function LocationsPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero" data-fx="page-hero" aria-labelledby="loc-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/shop-bay-night.webp"
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
        <span className="page-hero__ghost" data-ghost="06" aria-hidden="true" />

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />
          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            One shop · six communities
          </p>
          <h1 id="loc-title" className="hero__title page-hero__title page-hero__title--nowrap">
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Serving the Cedar</span></span>{' '}
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>Rapids Metro</span></span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />
          <p className="page-hero__lead anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
            Revive Auto Care is in Cedar Rapids and serves drivers from Marion, Hiawatha, Robins, Ely, and Swisher. Each
            town has its own page with the details for getting to the shop.
          </p>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── PICK YOUR TOWN ───────────── */}
      <section className="towns" data-fx="metro" aria-labelledby="towns-title">
        <div className="container towns__grid">
          <div>
            <Eyebrow n="01">Pick your town</Eyebrow>
            <h2 id="towns-title" className="h2 h2--md" data-split>
              <Split>Auto repair near you</Split>
            </h2>
            <ul className="towns__list" data-stagger>
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="towns__link">
                    <span>
                      {l.name}, {business.region}
                    </span>
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <MetroRadar />
        </div>
      </section>

      {/* ───────────── VISIT ───────────── */}
      <section className="reach reach--svc reach--tight" data-fx="reach" aria-label="Shop address, phone and hours">
        <div className="container">
          <VisitCard />
        </div>
      </section>

      <CtaBand title="Ready to schedule?">
        Book your appointment online, or call Revive Auto Care at {business.phoneDisplay} and the team will find a time
        that works for you.
      </CtaBand>
    </main>
  );
}
