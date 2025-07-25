// vite-plugin-scss-to-csssheet.ts
import { Plugin } from 'vite';
import { compileAsync } from 'sass';

export default function scssToCSSSheet(): Plugin {
  return {
    name: 'vite:scss-as-csssheet',
    enforce: 'pre',

    async load(id) {
      if (!id.endsWith('.scsssheet')) return null;

      const filePath = id.split('?')[0];
      const result = await compileAsync(filePath);

      const css = result.css.toString().replace(/\\/g, '\\\\').replace(/`/g, '\\`');

      return {
        code: `
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(\`${css}\`);
          export default sheet;
        `,
        map: null,
      };
    },
  };
}
