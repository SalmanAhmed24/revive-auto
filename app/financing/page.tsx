import PortedPage, { portedMetadata } from '@/components/PortedPage';

// Content: lib/ported-pages.ts → financing
export const metadata = portedMetadata('financing');

export default function FinancingPage() {
  return <PortedPage page="financing" />;
}
