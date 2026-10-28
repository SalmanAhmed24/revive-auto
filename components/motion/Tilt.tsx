'use client';

import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

/** 3D pointer tilt (mouse only) around server-rendered children. */
export default function Tilt({ children, className = '', max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 18 });
  return (
    <div
      className={`tilt ${className}`}
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
      <m.div className="tilt__inner" style={{ rotateX: rx, rotateY: ry }}>
        {children}
      </m.div>
    </div>
  );
}
