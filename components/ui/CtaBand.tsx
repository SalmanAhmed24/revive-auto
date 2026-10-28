import Magnetic from '@/components/motion/Magnetic';
import Split from '@/components/motion/Split';
import { ArrowRight, Calendar, Phone } from '@/components/icons';
import { business, fullAddress } from '@/lib/site';
import BookingLink from '@/components/BookingLink';

/** Red "next step" band used at the foot of pages. */
export default function CtaBand({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cta" data-fx="cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__card" data-cta>
          <div className="cta__left">
            <p className="mono cta__kicker">
              <span className="eyebrow__rule" aria-hidden="true" /> Next step
            </p>
            <h2 id="cta-title" className="cta__title" data-split>
              <Split>{title}</Split>
            </h2>
          </div>
          <div className="cta__right">
            <p>{children}</p>
            <div className="cta__btns">
              <Magnetic>
                <BookingLink className="btn btn--ink">
                  <Calendar /> Schedule Appointment <ArrowRight />
                </BookingLink>
              </Magnetic>
              <Magnetic>
                <a href={`tel:${business.phoneE164}`} className="btn btn--red-dark">
                  <Phone /> {business.phoneDisplay}
                </a>
              </Magnetic>
            </div>
            <address className="cta__addr mono">{fullAddress}</address>
          </div>
        </div>
      </div>
    </section>
  );
}
