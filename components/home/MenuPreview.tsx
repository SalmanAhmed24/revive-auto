'use client';

import Image from 'next/image';
import { AnimatePresence, m, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** Photo that trails the cursor over the service board (mouse only). Images load on first hover. */
export default function MenuPreview({ images }: { images: string[] }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const board = anchor.current?.closest<HTMLElement>('[data-menu]');
    if (!board || !window.matchMedia('(pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = board.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      const row = (e.target as HTMLElement).closest<HTMLElement>('[data-menu-row]');
      if (row) {
        setArmed(true);
        setActive(Number(row.dataset.menuRow));
      } else setActive(null);
    };
    const leave = () => setActive(null);
    board.addEventListener('pointermove', move);
    board.addEventListener('pointerleave', leave);
    return () => {
      board.removeEventListener('pointermove', move);
      board.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  return (
    <span ref={anchor} aria-hidden="true">
      {armed && (
        <m.span className="menu__preview" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {active !== null && (
              <m.span
                key="frame"
                className="menu__preview-frame"
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {images.map((src, i) => (
                  <Image key={src} src={src} alt="" fill sizes="280px" className={`menu__preview-img${active === i ? ' is-on' : ''}`} />
                ))}
              </m.span>
            )}
          </AnimatePresence>
        </m.span>
      )}
    </span>
  );
}
