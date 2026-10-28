import Link from 'next/link';
import type { ComponentProps } from 'react';
import { isLive } from '@/lib/routes';

/** next/link that skips prefetch for routes not built yet (avoids 404 console errors). */
export default function SmartLink(props: ComponentProps<typeof Link>) {
  const href = typeof props.href === 'string' ? props.href : props.href.pathname ?? '';
  return <Link prefetch={isLive(href) ? undefined : false} {...props} />;
}
