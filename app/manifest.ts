import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Revive Auto Care',
    short_name: 'Revive',
    description: 'Family-owned auto repair in Cedar Rapids, IA since 1989.',
    start_url: '/',
    display: 'browser',
    background_color: '#efe8dc',
    theme_color: '#141210',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
