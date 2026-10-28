import Link from '@/components/SmartLink';

/**
 * Renders copy with inline links written as [label](/path).
 * Keeps page content editable as plain strings in lib/service-pages.ts.
 */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith('/') ? (
        <Link key={m.index} href={href}>
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href}>
          {label}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Plain-text version (links removed) for meta tags and JSON-LD. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
