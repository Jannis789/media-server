import { Plugin, ViteDevServer } from 'vite';
import path from 'path';
import fs from 'fs';

export function TmplImport(): Plugin {
  return {
    name: 'serve-tmpl-as-html',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.tmpl')) {
        const tmpl = fs.readFileSync(id, 'utf-8');
        return {
          code: `export default (() => {
            const range = document.createRange();
            return range.createContextualFragment(${JSON.stringify(tmpl)});
          })();`,
          map: null
        };
      }
      return null;
    },
    transformIndexHtml(html: string) {
      return html;
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/') { // Root auf index.tmpl umleiten
          const filePath = path.resolve(server.config.root, 'index.tmpl');
          if (fs.existsSync(filePath)) {
            const html = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
          }
        }
        next();
      });
    },
  };
}