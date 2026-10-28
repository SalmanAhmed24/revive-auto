import Image from 'next/image';
import Link from '@/components/SmartLink';
import { business, services, locations, sisterBusiness } from '@/lib/site';
import { ArrowUpRight } from './icons';
import BookingLink from '@/components/BookingLink';

/** Server-rendered NAP block — real text, never an image. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-word" aria-hidden="true" />
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src="/images/logo-light.png" alt="Revive Auto Care" width={150} height={79} />
            <p className="site-footer__about">{business.summary}</p>

            <div>
              <p className="mono site-footer__label">Visit · Call</p>
              <address className="site-footer__nap">
                <strong>{business.name}</strong>
                <span>
                  {business.street}, {business.city}, {business.region} {business.postalCode}
                </span>
                <a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a>
              </address>
              <table className="hours">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  <tr>
                    <th scope="row">Monday – Thursday</th>
                    <td>7:30 AM – 5:30 PM</td>
                  </tr>
                  <tr>
                    <th scope="row">Friday – Sunday</th>
                    <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <nav className="site-footer__col" aria-label="Services">
            <p className="mono site-footer__label">Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Locations">
            <p className="mono site-footer__label">Locations</p>
            <ul>
              <li>
                <Link href="/locations">Cedar Rapids metro</Link>
              </li>
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Shop">
            <p className="mono site-footer__label">Shop</p>
            <ul>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><BookingLink>Schedule Appointment</BookingLink></li>
            </ul>
            <p className="mono site-footer__label site-footer__label--gap">More</p>
            <ul>
              <li><Link href="/financing">Financing</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </nav>
        </div>

        <p className="site-footer__sister">
          <span>
            Looking for lift kits or off-road suspension? That’s <strong>{sisterBusiness.name}</strong>, same building.
          </span>
          {sisterBusiness.url && (
            <a href={sisterBusiness.url} className="mono site-footer__visit" target="_blank" rel="noopener">
              Visit site <ArrowUpRight />
            </a>
          )}
        </p>

        <div className="site-footer__legal">
          <p>
            © {year} {business.name} · Cedar Rapids, Iowa
          </p>
          <p>Family-owned · Serving Cedar Rapids for over 30 years</p>
        </div>
      </div>
    </footer>
  );
}
