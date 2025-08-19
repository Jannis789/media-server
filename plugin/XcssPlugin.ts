import { Plugin } from 'vite';
import less from 'less';

export function xcssPlugin(): Plugin {
  return {
    name: 'vite-plugin-xcss',
    enforce: 'pre',

    async transform(code, id) {
      if (!id.endsWith('.xcss')) return null;

      const output = await less.render(code, {
        javascriptEnabled: true,
        filename: id,
      });

      const jsCode = `
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(${JSON.stringify(output.css)});
        export default sheet;
      `;

      return {
        code: jsCode,
        map: null,
      };
    },
  };
}
