export default function Eyebrow({ n, children, dark = false }: { n: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`eyebrow${dark ? ' eyebrow--dark' : ''}`} data-reveal>
      <span className="eyebrow__tag">No.{n}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
