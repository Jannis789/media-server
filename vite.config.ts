// vite.config.ts
import { defineConfig } from 'vite';
import { xcssPlugin } from './plugin/XcssPlugin';
import { TmplImport } from './plugin/TmplPlugin';
import { spaFallbackPlugin } from './plugin/SpaPlugin';
import path from 'path';

export default defineConfig({
  root: './src',
  plugins: [xcssPlugin(), TmplImport(), spaFallbackPlugin()],
  publicDir: path.resolve(__dirname, 'public'),
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
      '#decorators': path.resolve(__dirname, 'src/core/decorators'),
      '#utils': path.resolve(__dirname, 'src/core/utils'),
      '#routes': path.resolve(__dirname, 'src/core/routes'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#public': path.resolve(__dirname, 'public'),
    }
  }
});
