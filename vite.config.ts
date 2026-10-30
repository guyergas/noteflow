import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Two builds:
//  - default: installable PWA for GitHub Pages (relative base, offline via Workbox precache)
//  - --mode singlefile: one self-contained HTML (samples inlined) for a quick preview link
export default defineConfig(({ mode }) => {
  const single = mode === 'singlefile';
  return {
    base: './',
    plugins: [
      react(),
      single
        ? viteSingleFile()
        : VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,
            includeAssets: ['icon.svg', 'apple-touch-icon.png'],
            manifest: {
              name: 'NoteFlow — קריאת תווים',
              short_name: 'NoteFlow',
              description: 'לומדים לקרוא תווים בפסנתר',
              lang: 'he',
              dir: 'rtl',
              start_url: './',
              scope: './',
              display: 'standalone',
              orientation: 'any',
              background_color: '#f5f4ef',
              theme_color: '#f5f4ef',
              icons: [
                { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg,png,mp3,woff,woff2}'],
              maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
              navigateFallback: 'index.html',
            },
          }),
    ],
    build: single
      ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000, cssCodeSplit: false }
      : { outDir: 'dist', assetsInlineLimit: 0 },
    test: { environment: 'node' },
  };
});
