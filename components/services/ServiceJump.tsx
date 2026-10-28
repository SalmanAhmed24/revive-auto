'use client';

import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Item = { id: string; label: string };

/**
 * Sticky "jump to" bar for the ten service cards.
 * Links are plain in-page anchors (work without JS); the client adds scroll-spy
 * and a Framer Motion pill that glides to the active service.
 */
export default function ServiceJump({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  // Scroll-spy: the card crossing the upper third of the viewport is "active".
  useEffect(() => {
    const cards = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [items]);

  // Move the pill under the active chip and keep that chip in view on narrow screens.
  useEffect(() => {
    const list = listRef.current;
    const a = active && list?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!list || !a) return;
    const li = a.parentElement as HTMLElement; // offsetParent of <li> is the list
    setPill({ x: li.offsetLeft, w: li.offsetWidth });
    const target = li.offsetLeft - list.clientWidth / 2 + li.offsetWidth / 2;
    list.scrollTo({ left: target, behavior: 'smooth' });
  }, [active]);

  return (
    <nav className="jump" aria-label="Jump to a service">
      <div className="container">
        <ul className="jump__list" ref={listRef}>
          {active && (
            <m.li
              className="jump__pill"
              aria-hidden="true"
              initial={false}
              animate={{ x: pill.x, width: pill.w }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            />
          )}
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`jump__chip${active === it.id ? ' is-active' : ''}`}
                aria-current={active === it.id ? 'location' : undefined}
              >
                <span className="jump__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
