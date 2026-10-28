import Link from '@/components/SmartLink';

/** Visible breadcrumb trail; pair it with breadcrumbSchema() using the same items. */
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs mono anim-rise" style={{ '--i': 0 } as React.CSSProperties}>
      <ol>
        {items.map((it, i) =>
          i < items.length - 1 ? (
            <li key={it.path}>
              <Link href={it.path}>{it.name}</Link>
            </li>
          ) : (
            <li key={it.path} aria-current="page">
              {it.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
