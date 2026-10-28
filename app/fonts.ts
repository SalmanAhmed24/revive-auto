import localFont from 'next/font/local';

export const display = localFont({
  src: [
    { path: './fonts/barlow-condensed-latin-800-normal.woff2', weight: '700 800', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Narrow', 'Impact', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const body = localFont({
  src: [
    { path: './fonts/barlow-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-latin-600-normal.woff2', weight: '500 600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

export const script = localFont({
  src: [{ path: './fonts/yellowtail-latin-400-normal.woff2', weight: '400', style: 'normal' }],
  variable: '--font-script',
  display: 'swap',
  fallback: ['cursive'],
  preload: true,
});

export const mono = localFont({
  src: [
    { path: './fonts/courier-prime-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/courier-prime-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['Courier New', 'monospace'],
  preload: false,
});
