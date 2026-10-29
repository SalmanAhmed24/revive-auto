import PortedPage, { portedMetadata } from '@/components/PortedPage';

// Content: lib/ported-pages.ts → careers
export const metadata = portedMetadata('careers');

export default function CareersPage() {
  return <PortedPage page="careers" />;
}
