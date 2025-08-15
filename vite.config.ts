import { defineConfig } from 'vite';
import { HtmlImport } from './plugins/HtmlImport';
import { XcssImport } from './plugins/XcssImport';
import path from 'path';
import { TmplImport } from './plugins/TmplImport';

export default defineConfig({
  root: './src',
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles/index.ts'),
      '@templates': path.resolve(__dirname, 'src/components/index.ts'),
      '@decorator': path.resolve(__dirname, 'src/extra/decorators/index.ts'),
    },
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true,
  },
  build: {
    outDir: '../dist',
    sourcemap: true,
  },
  esbuild: {
    target: 'esnext',
  },
  plugins: [
    XcssImport(),
    TmplImport(),
  ]
});
