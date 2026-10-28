import Image from 'next/image';
import { business, directionsUrl, fullAddress, locations } from '@/lib/site';
import { ArrowUpRight, Clock, MapPin, Phone } from '@/components/icons';

const tel = `tel:${business.phoneE164}`;
const towns = [business.city, ...locations.map((l) => l.name)];

/** Address / phone / hours card with the static OpenStreetMap image and a pin. Animated by the `reach` ScrollFx key. */
export default function VisitCard() {
  return (
    <div className="visit" data-visit>
      <div className="visit__info">
        <p className="visit__name">{business.name}</p>
        <address className="visit__list">
          <span className="visit__row">
            <MapPin /> {fullAddress}
          </span>
          <a href={tel} className="visit__row">
            <Phone /> {business.phoneDisplay}
          </a>
          <span className="visit__row visit__row--top">
            <Clock />
            <span>
              Monday – Thursday: 7:30 AM – 5:30 PM
              <br />
              Friday – Sunday: Closed
            </span>
          </span>
        </address>
        <p className="mono visit__label">Serving</p>
        <p className="visit__towns">{towns.join(' · ')}</p>
        <a href={directionsUrl} className="link-arrow visit__dir" target="_blank" rel="noopener">
          Get directions <ArrowUpRight />
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </div>

      <a
        href={directionsUrl}
        className="visit__map"
        target="_blank"
        rel="noopener"
      >
        <Image
          src="/images/map-cedar-rapids.webp"
          alt={`Street map of northeast Cedar Rapids and Hiawatha showing the location of ${business.name}`}
          fill
          sizes="(max-width: 900px) 92vw, 60vw"
          className="visit__map-img"
        />
        <span className="pin">
          <span className="pin__label mono">
            {business.name} · {business.street}
          </span>
          <span className="pin__dot" aria-hidden="true" />
        </span>
        <span className="sr-only"> — open directions in Google Maps (new tab)</span>
      </a>
      <p className="visit__credit">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>{' '}
        contributors
      </p>
    </div>
  );
}
