import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import { ArrowRight } from '@/components/icons';

const TITLE = 'Auto Repair Financing in Cedar Rapids, IA | Revive Auto Care';
const DESCRIPTION =
  'Auto repair financing at Revive Auto Care in Cedar Rapids: pay over time with Klarna, Affirm or Snap. Ask about financing and apply right in the shop.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/financing' },
  openGraph: { url: '/financing', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Financing', path: '/financing' },
];

/** Financing partners, as listed in the design. */
const options = [
  { name: 'Klarna', text: 'Split your purchase into easy, interest-free payments.' },
  { name: 'Affirm', text: 'Pay over time with flexible monthly installments and no hidden fees.' },
  { name: 'Snap', text: 'Fast, no-credit-needed financing for qualifying purchases.' },
];

export default function FinancingPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero page-hero--short" data-fx="page-hero" aria-labelledby="financing-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/tools-wrench-drawer.webp"
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

        <div className="container page-hero__inner">
          <Breadcrumbs items={crumbs} />
          <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
            Financing
          </p>
          <h1 id="financing-title" className="hero__title page-hero__title page-hero__title--long">
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Auto Repair</span></span>{' '}
            <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>Financing Made</span></span>{' '}
            <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>Simple</span></span>
          </h1>
          <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />
          <p className="page-hero__lead anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
            Don’t let unexpected repairs throw off your budget — we can help.
          </p>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── OPTIONS ───────────── */}
      <section className="fin" data-fx="finance" aria-labelledby="options-title">
        <div className="container">
          <div className="section-head fin__head">
            <div>
              <Eyebrow n="01">Flexible payment options</Eyebrow>
              <h2 id="options-title" className="h2 h2--md" data-split>
                <Split>Flexible financing options available</Split>
              </h2>
            </div>
            <p className="fin__intro" data-reveal>
              We know that car repairs and upgrades can be unexpected — that’s why we offer multiple financing solutions
              to make it easier to get back on the road. Choose the option that works best for you.
            </p>
          </div>

          <ul className="fin-opts" data-fin-opts>
            {options.map((o, i) => (
              <li key={o.name} className="fin-opt">
                <p className="mono fin-opt__num">Option {String(i + 1).padStart(2, '0')}</p>
                <h3 className="fin-opt__name">{o.name}</h3>
                <span className="fin-opt__rule" aria-hidden="true" />
                <p className="fin-opt__text">{o.text}</p>
              </li>
            ))}
          </ul>

          <div className="fin-strip">
            <p className="fin-strip__script" data-fin-script>
              Drive now, pay later — we make it simple!
            </p>
            <p className="fin-strip__text" data-reveal>
              <strong>Stress-free vehicle care.</strong> Ask us about financing options and apply right in our shop.
            </p>
          </div>

          <p data-reveal>
            <Link href="/contact-us" className="link-arrow">
              Questions? Contact the shop <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Questions about paying for a repair?" long>
        Ask about financing options and apply right in the shop, or call {business.name} at {business.phoneDisplay},
        Monday through Thursday, 7:30 AM to 5:30 PM.
      </CtaBand>
    </main>
  );
}
