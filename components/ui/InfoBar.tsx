import { business } from '@/lib/site';
import { Phone } from '@/components/icons';

/** Ratings · hours · phone strip at the foot of inner-page heroes. */
export default function InfoBar() {
  return (
    <div className="infobar mono anim-rise" style={{ '--i': 7 } as React.CSSProperties}>
      <div className="container infobar__inner">
        <ul className="infobar__facts">
          <li>
            <span className="infobar__star" aria-hidden="true">★</span> {business.ratings.google.value} ·{' '}
            {business.ratings.google.count} Google reviews
          </li>
          <li>
            <span className="infobar__star" aria-hidden="true">★</span> {business.ratings.carfax.value} ·{' '}
            {business.ratings.carfax.count} CARFAX reviews
          </li>
          <li>{business.hoursShort}</li>
        </ul>
        <a href={`tel:${business.phoneE164}`} className="infobar__phone">
          <Phone /> {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
