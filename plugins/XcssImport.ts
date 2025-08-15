import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import * as sass from 'sass';

export function XcssImport(): Plugin {
  return {
    name: 'xcss-import',
    async transform(_, id) {
      if (!id.endsWith('.xcss')) return null;

      const content = fs.readFileSync(id, 'utf-8');

      const result = sass.compileString(content, {
        importers: [
          {
            canonicalize(url) {
              if (url.endsWith('.xcss')) {
                const absPath = path.resolve(path.dirname(id), url);
                return new URL('file://' + absPath);
              }
              return null;
            },
            load(canonicalUrl) {
              const filePath = canonicalUrl.pathname;
              if (fs.existsSync(filePath)) {
                return {
                  contents: fs.readFileSync(filePath, 'utf-8'),
                  syntax: "scss" 
                };
              }
              return null;
            }
          }
        ]
      });

      return {
        code: `export default (() => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(\`${result.css}\`);
          return sheet;
        })();`,
        map: null
      };
    }
  };
}