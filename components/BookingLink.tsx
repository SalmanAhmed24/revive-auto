'use client';

import { BOOKING_URL } from '@/lib/booking';
import { loadBooking, openBooking } from '@/lib/booking-client';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Runs just before the modal opens (e.g. close the mobile menu). */
  onOpen?: () => void;
};

const preload = () => {
  loadBooking().catch(() => {});
};

/**
 * Every "Schedule Appointment" control. Opens Tekmetric's booking modal
 * (onShowBooking(shopId)) and keeps whatever classes/styling it's given.
 * It's a real link to Tekmetric's booking page, so it still works with JavaScript off,
 * and a middle/Cmd-click opens booking in a new tab.
 */
export default function BookingLink({ onOpen, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      aria-haspopup="dialog"
      onPointerEnter={preload}
      onFocus={preload}
      onTouchStart={preload}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onOpen?.();
        openBooking(e.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
