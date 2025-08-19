import path from "path";
import fs from "fs";

export function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Nur GET-Anfragen und keine statischen Dateien
        if (
          req.method === 'GET'
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
