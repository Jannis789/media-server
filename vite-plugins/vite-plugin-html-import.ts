import { Plugin } from 'vite';
import fs from 'fs/promises';

export default function htmlToFragment(): Plugin {
  return {
    name: 'vite:html-to-fragment',

    enforce: 'pre',

    async load(id) {
      if (!id.endsWith('.html')) return null;

      const htmlContent = await fs.readFile(id, 'utf-8');

      // Rückgabe eines JS-Moduls, das den String in DocumentFragment parst
      return {
        code: `
          const htmlString = ${JSON.stringify(htmlContent)};
          const template = document.createElement('template');
          template.innerHTML = htmlString;
          export default template.content;
        `,
        map: null,
      };
    },
  };
}
