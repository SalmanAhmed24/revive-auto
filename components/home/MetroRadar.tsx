// Schematic bearings from the shop — direction only, not to scale (matches the approved design).
const pins = [
  { name: 'Robins', x: 33, y: 16 },
  { name: 'Hiawatha', x: 44, y: 26 },
  { name: 'Marion', x: 77, y: 30 },
  { name: 'Ely', x: 62, y: 80 },
  { name: 'Swisher', x: 32, y: 86 },
];

export default function MetroRadar() {
  return (
    <figure className="radar" data-radar>
      <div className="radar__stage" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="radar__svg">
          <circle cx="200" cy="200" r="190" className="r-dash" />
          <circle cx="200" cy="200" r="140" className="r-line" />
          <circle cx="200" cy="200" r="90" className="r-dash" />
          <circle cx="200" cy="200" r="44" className="r-red" />
          {Array.from({ length: 72 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1={i % 6 === 0 ? 2 : 6}
              x2="200"
              y2="12"
              transform={`rotate(${i * 5} 200 200)`}
              className="r-tick"
            />
          ))}
          <text x="200" y="28" className="r-cardinal">N</text>
          <text x="378" y="204" className="r-cardinal">E</text>
          <text x="200" y="386" className="r-cardinal">S</text>
          <text x="22" y="204" className="r-cardinal">W</text>
          {pins.map((p) => (
            <line key={p.name} x1="200" y1="200" x2={p.x * 4} y2={p.y * 4} className="r-ray" />
          ))}
        </svg>
        <div className="radar__sweep" />
        <div className="radar__hub">
          <span>Revive</span>
        </div>
        <span className="radar__city mono">Cedar Rapids</span>
        {pins.map((p) => (
          <span key={p.name} className="radar__pin mono" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <i />
            {p.name}
          </span>
        ))}
      </div>
      <figcaption className="radar__cap mono">Schematic — direction only, not to scale</figcaption>
    </figure>
  );
}
