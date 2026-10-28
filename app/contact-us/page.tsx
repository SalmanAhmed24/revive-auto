import type { Metadata } from 'next';
import Image from 'next/image';
import { business, directionsUrl, fullAddress, locations } from '@/lib/site';
import { breadcrumbSchema, contactPageSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ScrollFx from '@/components/motion/ScrollFx';
import Split from '@/components/motion/Split';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import InfoBar from '@/components/ui/InfoBar';
import OpenStatus from '@/components/home/OpenStatus';
import ContactForm from '@/components/contact/ContactForm';
import VisitCard from '@/components/ui/VisitCard';
import { ArrowRight, ArrowUpRight, Calendar, Clock, MapPin, MessageIcon, Phone } from '@/components/icons';
import BookingLink from '@/components/BookingLink';

const TITLE = 'Contact & Hours | Revive Auto Care, Cedar Rapids IA';
const DESCRIPTION =
  'Call Revive Auto Care at (319) 261-0999 or schedule online. Open Monday–Thursday, 7:30 AM–5:30 PM, at 2109 N Towne Ln NE, Cedar Rapids, IA 52402.';
const LEAD =
  'Call Revive Auto Care at (319) 261-0999 or schedule an appointment online. The shop is open Monday through Thursday, 7:30 AM to 5:30 PM, and closed Friday through Sunday.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/contact-us' },
  openGraph: { url: '/contact-us', title: TITLE, description: DESCRIPTION },
};

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact-us' },
];
const tel = `tel:${business.phoneE164}`;
const sms = `sms:${business.phoneE164}`;
const towns = [business.city, ...locations.map((l) => l.name)];

export default function ContactPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={contactPageSchema(LEAD)} />
      <ScrollFx />

      {/* ───────────── HERO ───────────── */}
      <section className="page-hero page-hero--contact" data-fx="page-hero" aria-labelledby="contact-title">
        <div className="page-hero__media" aria-hidden="true">
          <Image
            src="/images/shop-floor-blue-sedan-lift.webp"
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
        <span className="page-hero__ghost" data-ghost="7:30" aria-hidden="true" />

        <div className="container page-hero__inner page-hero__grid">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="tag page-hero__tag anim-rise" style={{ '--i': 1 } as React.CSSProperties}>
              {business.hoursShort}
            </p>
            <h1 id="contact-title" className="hero__title page-hero__title page-hero__title--wide">
              <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Contact &amp; Hours</span></span>{' '}
              <span className="line"><span style={{ '--i': 3 } as React.CSSProperties}>— Revive Auto</span></span>{' '}
              <span className="line"><span style={{ '--i': 4 } as React.CSSProperties}>Care</span></span>
            </h1>
            <span className="page-hero__rule anim-rise" style={{ '--i': 5 } as React.CSSProperties} aria-hidden="true" />

            <div className="quick anim-rise" style={{ '--i': 6 } as React.CSSProperties}>
              <Magnetic>
                <a href={tel} className="btn btn--red quick__btn">
                  <Phone /> Call
                </a>
              </Magnetic>
              <Magnetic>
                <a href={sms} className="btn btn--ghost quick__btn">
                  <MessageIcon /> Text
                </a>
              </Magnetic>
              <Magnetic>
                <BookingLink className="btn btn--red quick__btn">
                  <Calendar /> Schedule
                </BookingLink>
              </Magnetic>
            </div>
          </div>

          <Tilt className="history-wrap">
            <div className="history hours-card">
              <div className="history__top">
                <span className="history__title">
                  Shop hours
                </span>
              </div>
              <dl className="history__rows mono">
                <div style={{ '--d': 0 } as React.CSSProperties}>
                  <dt>Mon–Thu</dt>
                  <dd>7:30 AM – 5:30 PM</dd>
                </div>
                <div style={{ '--d': 1 } as React.CSSProperties}>
                  <dt>Fri–Sun</dt>
                  <dd>Closed</dd>
                </div>
                <div style={{ '--d': 2 } as React.CSSProperties}>
                  <dt>Phone</dt>
                  <dd>
                    <a href={tel}>{business.phoneDisplay}</a>
                  </dd>
                </div>
                <div style={{ '--d': 3 } as React.CSSProperties}>
                  <dt>Shop</dt>
                  <dd>{business.street}</dd>
                </div>
              </dl>
              <span className="ro__perf hours-card__perf" aria-hidden="true" />
              <p className="hours-card__status mono">
                <OpenStatus />
                <span>{business.hoursShort}</span>
              </p>
            </div>
          </Tilt>
        </div>

        <InfoBar />
      </section>

      {/* ───────────── HOW TO REACH US ───────────── */}
      <section className="reach" data-fx="reach" aria-labelledby="reach-title">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow n="01">Phone · address · hours</Eyebrow>
              <h2 id="reach-title" className="h2 h2--md" data-split>
                <Split>How to reach us</Split>
              </h2>
            </div>
            <p className="section-head__text" data-reveal>
              Call Revive Auto Care at <a href={tel}>{business.phoneDisplay}</a> or{' '}
              <BookingLink>schedule an appointment online</BookingLink>. The shop is open Monday through
              Thursday, 7:30 AM to 5:30 PM, and closed Friday through Sunday. You’ll find us at 2109 N Towne Ln NE in
              Cedar Rapids. If you’re not sure which service you need, call and describe what your vehicle is doing, and
              the team can point you in the right direction.
            </p>
          </div>

          <VisitCard />
        </div>
      </section>

      {/* ───────────── SEND A MESSAGE ───────────── */}
      <section className="message" data-fx="message" aria-labelledby="message-title">
        <div className="container message__grid">
          <div>
            <Eyebrow n="02">Send a message</Eyebrow>
            <h2 id="message-title" className="h2 h2--md" data-split>
              <Split>Ready to book?</Split>
            </h2>
            <p className="message__text" data-reveal>
              Schedule online, or call Revive Auto Care at <a href={tel}>{business.phoneDisplay}</a> during shop hours,
              Monday through Thursday, 7:30 AM to 5:30 PM, and the team will help.
            </p>
            <p data-reveal>
              <BookingLink className="link-arrow">
                Schedule appointment <ArrowRight />
              </BookingLink>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
