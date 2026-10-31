import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Revive Auto Care — family-owned auto repair in Cedar Rapids, IA since 1989';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const dir = join(process.cwd(), 'app/fonts');
  const [display, script, mono, photo] = await Promise.all([
    readFile(join(dir, 'barlow-condensed-latin-800-normal.woff')),
    readFile(join(dir, 'yellowtail-latin-400-normal.woff')),
    readFile(join(dir, 'courier-prime-latin-700-normal.woff')),
    readFile(join(process.cwd(), 'public/og-photo.jpg')),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#141210', color: '#f3ece1', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={460} height={630} style={{ position: 'absolute', right: 0, top: 0, objectFit: 'cover', opacity: 0.85 }} alt="" />
        <div style={{ position: 'absolute', right: 0, top: 0, width: 460, height: 630, background: 'linear-gradient(90deg, #141210 0%, rgba(20,18,16,0) 45%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '64px 72px', width: 820, height: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Mono', fontSize: 22, letterSpacing: 3 }}>
            <span style={{ background: '#c11f2f', color: '#fff', padding: '4px 10px' }}>SINCE 1989</span>
            <span style={{ color: '#bdb3a6' }}>CEDAR RAPIDS, IOWA · FAMILY-OWNED</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Display', fontSize: 104, lineHeight: 0.9, textTransform: 'uppercase' }}>
            <span>Auto repair in</span>
            <span>Cedar Rapids, IA</span>
            <span style={{ fontFamily: 'Script', textTransform: 'none', color: '#ff5a67', fontSize: 92, marginTop: 8 }}>honest work,</span>
          </div>
          <div style={{ display: 'flex', gap: 28, fontFamily: 'Mono', fontSize: 22, color: '#bdb3a6' }}>
            <span style={{ color: '#fff' }}>4.6 / 5 · 359 Google reviews</span>
            <span>(319) 261-0999</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 10, background: '#c11f2f' }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Display', data: display, weight: 800, style: 'normal' },
        { name: 'Script', data: script, weight: 400, style: 'normal' },
        { name: 'Mono', data: mono, weight: 700, style: 'normal' },
      ],
    },
  );
}
