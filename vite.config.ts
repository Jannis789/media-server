import { defineConfig } from 'vite';
import { XcssImport } from './plugins/XcssImport';
import { TmplImport } from './plugins/TmplImport';
import path from 'path';
import config from './src/config';

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
    port: config.frontendPort,
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
