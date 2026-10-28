'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { autoOpenFromQuery } from '@/lib/booking-client';

/**
 * Framer Motion's lazy feature bundle + Lenis smooth scrolling (desktop, fine pointer only).
 * Lenis and GSAP are code-split and load on first user intent, so they never
 * compete with first paint or hydration.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  // ?book in the URL opens the booking modal on arrival (e.g. a Google Business Profile "Book" link).
  useEffect(() => autoOpenFromQuery(), []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return; // native scroll on touch + reduced motion

    let destroyed = false;
    let cleanup = () => {};

    const start = async () => {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('@/lib/gsap')]);
      if (destroyed) return;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: true });
      lenis.on('scroll', () => ScrollTrigger.update());

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        const target = a && document.querySelector(a.getAttribute('href')!);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }
      };
      document.addEventListener('click', onClick);
      // Freeze the page behind the Tekmetric booking modal (lib/booking-client.ts).
      const pause = () => lenis.stop();
      const resume = () => lenis.start();
      window.addEventListener('booking:open', pause);
      window.addEventListener('booking:close', resume);
      if (document.documentElement.classList.contains('booking-open')) lenis.stop();
      cleanup = () => {
        document.removeEventListener('click', onClick);
        window.removeEventListener('booking:open', pause);
        window.removeEventListener('booking:close', resume);
        lenis.destroy();
      };
    };

    // Load smooth scrolling on first mouse intent, never during initial page load.
    const events = ['wheel', 'pointermove', 'keydown'] as const;
    const kick = () => {
      events.forEach((e) => window.removeEventListener(e, kick));
      start();
    };
    events.forEach((e) => window.addEventListener(e, kick, { passive: true, once: true }));

    return () => {
      destroyed = true;
      events.forEach((e) => window.removeEventListener(e, kick));
      cleanup();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
