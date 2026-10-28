'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Phone } from '../icons';
import BookingLink from '@/components/BookingLink';

type Item = { href: string; label: string };

export default function MobileMenu({ items, phone, phoneHref, hours }: { items: Item[]; phone: string; phoneHref: string; hours: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? 'hidden' : '';
    root.dataset.menu = open ? 'open' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`burger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <m.ul
                className="mobile-menu__list"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
              >
                {items.map((item, i) => (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { y: 40, opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } },
                    }}
                  >
                    <Link href={item.href} prefetch={false} className="mobile-menu__link" onClick={() => setOpen(false)}>
                      <span className="mono">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </nav>
            <m.div className="mobile-menu__foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <BookingLink className="btn btn--red" onOpen={() => setOpen(false)}>
                Schedule Appointment <ArrowRight />
              </BookingLink>
              <a href={phoneHref} className="btn btn--ghost">
                <Phone /> {phone}
              </a>
              <p className="mono">{hours}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
