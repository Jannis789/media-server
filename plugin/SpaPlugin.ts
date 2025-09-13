import path from "path";
import fs from "fs";

export function spaFallbackPlugin() {
  return {
    name: "spa-fallback",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url || "", "http://localhost");
        const pathname = urlObj.pathname;

        const lastSegment = pathname.substring(pathname.lastIndexOf('/'));
        const hasDot = lastSegment.includes('.');
        const isViteClient = pathname.startsWith("/@vite/");

        if (
          req.method === "GET" &&
          !hasDot &&
          !isViteClient
        ) {
          const filePath = path.resolve(__dirname, "../src/index.tmpl");
          fs.readFile(filePath, (err, data) => {
            if (err) {
              next();
              return;
            }
            res.setHeader("Content-Type", "text/html");
            res.end(data);
          });
        } else {
          next();
        }
      });
    },
  };
}
