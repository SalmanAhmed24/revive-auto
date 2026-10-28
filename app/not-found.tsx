import type { Metadata } from 'next';
import Link from 'next/link';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/** Next.js serves this with a real 404 status. */
export default function NotFound() {
  return (
    <main id="main" className="notfound">
      <div className="container">
        <p className="mono notfound__code">Error 404 · Repair order not found</p>
        <h1 className="h2">This page is still in the shop.</h1>
        <p className="notfound__text">
          The page you’re after isn’t here yet. Head back home, or call us at{' '}
          <a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a>.
        </p>
        <Link href="/" className="btn btn--red">Back to home</Link>
      </div>
    </main>
  );
}
