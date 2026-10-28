'use client';

import { useEffect, useRef } from 'react';

const SRC = process.env.NEXT_PUBLIC_TRUSTINDEX_SCRIPT;

/**
 * Live Google review snippets from the existing Trustindex integration.
 * Review text is never hand-typed: it comes only from Trustindex.
 * The loader is injected into this container (Trustindex renders where its script sits),
 * and only when the block nears the viewport, so it never affects page-load performance.
 * Without NEXT_PUBLIC_TRUSTINDEX_SCRIPT it renders nothing; the ratings and the
 * "See every review on Google" link remain as the fallback path.
 */
export default function TrustindexWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!SRC || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const s = document.createElement('script');
        s.src = SRC;
        s.defer = true;
        s.async = true;
        el.appendChild(s);
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!SRC) return null;
  return <div ref={ref} className="trustindex" aria-label="Recent Google reviews" />;
}
