// vite.config.ts
import { defineConfig } from 'vite';
import { xcssPlugin } from './plugin/XcssPlugin';
import { TmplImport } from './plugin/TmplPlugin';
import { spaFallbackPlugin } from './plugin/SpaPlugin';

export default defineConfig({
  root: './src',
  plugins: [xcssPlugin(), TmplImport(), spaFallbackPlugin()],
  build: {
    outDir: '../dist',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '#decorators': '/src/core/decorators',
      '#utils': '/src/core/utils',
      '#routes': '/src/core/routes',
      '#components': '/src/components',
    }
  }
});
