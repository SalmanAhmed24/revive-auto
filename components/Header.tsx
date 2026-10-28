import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, services, locations } from '@/lib/site';
import { ArrowRight, Chevron, Phone } from './icons';
import HeaderShell from './header/HeaderShell';
import MobileMenu from './header/MobileMenu';
import BookingLink from '@/components/BookingLink';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', children: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })) },
  {
    href: '/locations',
    label: 'Locations',
    children: locations.map((l) => ({ href: `/locations/${l.slug}`, label: l.name })),
  },
  { href: '/about-us', label: 'About Us' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact-us', label: 'Contact Us' },
];

/** Server-rendered header: every nav link (incl. dropdowns) is in the raw HTML. */
export default function Header() {
  return (
    <HeaderShell>
      <div className="container site-header__bar">
        <Link href="/" className="brand" aria-label="Revive Auto Care — home">
          <Image src="/images/logo-dark.png" alt="Revive Auto Care" width={114} height={60} priority />
        </Link>

        <nav className="nav" aria-label="Primary">
          <ul className="nav__list">
            {nav.map((item) => (
              <li key={item.href} className={`nav__item${item.children ? ' has-drop' : ''}`}>
                <Link href={item.href} className="nav__link">
                  {item.label}
                  {item.children && <Chevron />}
                </Link>
                {item.children && (
                  <ul className="drop">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="drop__link">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href={`tel:${business.phoneE164}`} className="header-phone">
            <Phone /> <span>{business.phoneDisplay}</span>
          </a>
          <BookingLink className="btn btn--red btn--sm header-cta">
            Schedule Appointment <ArrowRight />
          </BookingLink>
          <MobileMenu
            items={nav.map(({ href, label }) => ({ href, label }))}
            phone={business.phoneDisplay}
            phoneHref={`tel:${business.phoneE164}`}
            hours={business.hoursShort}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
