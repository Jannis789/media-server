import path from "path";
import fs from "fs";

export function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const lastSegment = url.substring(url.lastIndexOf('/'));
        if (
          req.method === 'GET' &&
          !lastSegment.includes('.')
        ) {
          const filePath = path.resolve(__dirname, '../src/index.tmpl');
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