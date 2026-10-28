'use client';

import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/** Hides the header on scroll-down, reveals on scroll-up. Children are server-rendered. */
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Mark the active primary-nav link (nav itself is server-rendered).
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('.nav__link').forEach((a) => {
      if (new URL(a.href).pathname === pathname) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }, [pathname]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    const menuOpen = document.documentElement.dataset.menu === 'open';
    if (!menuOpen && y > 320 && y > prev + 2) setHidden(true);
    else if (y < prev - 2 || menuOpen) setHidden(false);
  });

  // Expose header state so sticky sub-navs can slide up into its space.
  useEffect(() => {
    document.documentElement.dataset.header = hidden ? 'hidden' : '';
  }, [hidden]);

  return (
    <m.header
      className={`site-header${scrolled ? ' is-scrolled' : ''}`}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.header>
  );
}
