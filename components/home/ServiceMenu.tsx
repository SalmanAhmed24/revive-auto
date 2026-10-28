import Link from '@/components/SmartLink';
import type { Service } from '@/lib/site';
import { ArrowRight } from '@/components/icons';
import MenuPreview from './MenuPreview';

/** Service "menu board" — server-rendered rows; the cursor photo preview is a small client island. */
export default function ServiceMenu({ services }: { services: Service[] }) {
  return (
    <div className="menu" data-menu>
      <div className="menu__head">
        <p className="menu__title" aria-hidden="true">
          Service Menu
        </p>
        <p className="menu__note mono">
          No flat prices · <span>written estimate first</span>
        </p>
      </div>

      <ol className="menu__list">
        {services.map((s, i) => (
          <li key={s.slug} className="menu__row" data-menu-row={i}>
            <Link href={`/services/${s.slug}`} className="menu__link">
              <span className="menu__num mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="menu__main">
                <div className="menu__line">
                  <h3 className="menu__name">{s.name}</h3>
                  <span className="menu__dots" aria-hidden="true" />
                  <span className="menu__tag mono">Estimate first</span>
                  <span className="menu__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </div>
                <p className="menu__desc">{s.short}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <MenuPreview images={services.map((s) => s.image)} />
    </div>
  );
}
