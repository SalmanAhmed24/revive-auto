import type { Metadata, Viewport } from 'next';
import './globals.css';
import { display, body, script, mono } from './fonts';
import { SITE_URL, business } from '@/lib/site';
import { businessSchema, websiteSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/motion/MotionProvider';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Auto Repair in Cedar Rapids, IA | Revive Auto Care',
    template: '%s | Revive Auto Care',
  },
  description:
    'Family-owned auto repair in Cedar Rapids, IA since 1989. Brakes, oil changes, diagnostics and more for domestic and Asian-import vehicles — estimate before work.',
  applicationName: business.name,
  openGraph: { type: 'website', locale: 'en_US', siteName: business.name },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
  formatDetection: { telephone: true, address: true },
  // TODO(client): paste Search Console token → verification: { google: '...' }
};

export const viewport: Viewport = {
  themeColor: '#141210',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${display.variable} ${body.variable} ${script.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS so reveal-from-hidden states only apply when animation can run. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm');",
          }}
        />
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
