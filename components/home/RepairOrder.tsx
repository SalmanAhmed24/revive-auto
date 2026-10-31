'use client';

import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { business } from '@/lib/site';

const vehicles = [...business.vehicles.serviced];
const work = ['Find the cause first', 'Estimate before work'];

/** The shop's "repair order" ticket — decorative summary; every fact is also in page copy. */
export default function RepairOrder() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);

  return (
    <div
      className="ro-wrap"
      aria-hidden="true"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <m.div className="ro" style={{ rotateX: rx, rotateY: ry }}>
        <m.span className="ro__glare" style={{ left: glareX }} />
        <div className="ro__top">
          <div>
            <span className="ro__brand">Revive</span>
            <span className="ro__sub mono">Auto Care · Repair Order</span>
          </div>
          <div className="ro__no">
            <span className="mono">No.</span>
            <span className="ro__no-val">{business.foundingYear}</span>
          </div>
        </div>
        <dl className="ro__rows mono">
          <div><dt>Shop</dt><dd>{business.street}, {business.city}</dd></div>
          <div><dt>Phone</dt><dd>{business.phoneDisplay}</dd></div>
          <div><dt>Hours</dt><dd>Mon–Thu 7:30–5:30</dd></div>
        </dl>
        <div className="ro__perf" />
        <p className="ro__label mono">Vehicle</p>
        <ul className="ro__checks mono">
          {vehicles.map((v, i) => (
            <li key={v}>
              <svg viewBox="0 0 16 16" className="ro__box">
                <rect x="1" y="1" width="14" height="14" />
                <path d="M4 8.5l2.6 2.6L12.5 5" pathLength={1} className="ro__tick" style={{ ["--d" as string]: i } as React.CSSProperties} />
              </svg>
              {v}
            </li>
          ))}
          <li className="ro__no-euro">
            <svg viewBox="0 0 16 16" className="ro__box ro__box--x">
              <rect x="1" y="1" width="14" height="14" />
              <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" pathLength={1} className="ro__tick" style={{ ["--d" as string]: 4 } as React.CSSProperties} />
            </svg>
            <s>European makes — not serviced</s>
          </li>
        </ul>
        <p className="ro__label mono">Work</p>
        <ul className="ro__checks mono">
          {work.map((w, i) => (
            <li key={w}>
              <svg viewBox="0 0 16 16" className="ro__box">
                <rect x="1" y="1" width="14" height="14" />
                <path d="M4 8.5l2.6 2.6L12.5 5" pathLength={1} className="ro__tick" style={{ ["--d" as string]: 5 + i } as React.CSSProperties} />
              </svg>
              {w}
            </li>
          ))}
        </ul>
        <div className="ro__stamp">
          <strong>4.6 ★</strong>
          <span>359 Google reviews</span>
        </div>
      </m.div>
    </div>
  );
}
