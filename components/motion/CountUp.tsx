'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

/**
 * Server HTML always carries the final number (crawlers and no-JS see the real figure).
 * On the client it rolls up from zero the first time it scrolls into view.
 */
export default function CountUp({
  to,
  decimals = 0,
  suffix = '',
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const final = to.toFixed(decimals) + suffix;

  // Below the fold: pre-zero it so the roll-up doesn't start from a flash of the final value.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) el.textContent = (0).toFixed(decimals) + suffix;
  }, [decimals, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix]);

  return (
    <span ref={ref} className="countup">
      {final}
    </span>
  );
}
