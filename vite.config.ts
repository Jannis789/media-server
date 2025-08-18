import { defineConfig } from 'vite';
import { XcssImport } from './plugins/XcssImport';
import { TmplImport } from './plugins/TmplImport';

import fs from 'fs';
import path from 'path';
import config from './src/config';
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Nur GET-Anfragen und keine statischen Dateien
        if (
          req.method === 'GET' &&
          !req.url.startsWith('/api') &&
          !req.url.includes('.') &&
          req.url !== '/index.tmpl'
        ) {
          const filePath = path.resolve(__dirname, 'src/index.tmpl');
          fs.readFile(filePath, (err, data) => {
            if (err) {
              next();
              return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
          });
        } else {
          next();
        }
      });
    },
  };
}
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
    spaFallbackPlugin()
  ]
});
