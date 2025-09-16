import { Plugin } from "vite";
import less from "less";

export function xcssPlugin(): Plugin {
  return {
    name: "vite-plugin-xcss",
    enforce: "pre",

    async transform(code, id) {
      if (!id.endsWith(".xcss")) return null;

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

    handleHotUpdate({ file, server }) {
      if (file.endsWith(".xcss")) {
        const mod =
          server.moduleGraph.getModuleById(file) ||
          server.moduleGraph.getModuleById(file.slice(file.indexOf("/src/")));
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload', path: '*' });
          return [mod];
        }
        // Fallback: Alle .xcss-Module invalidieren
        for (const id of server.moduleGraph.idToModuleMap.keys()) {
          if (id.endsWith(".xcss")) {
            const m = server.moduleGraph.getModuleById(id);
            if (m) server.moduleGraph.invalidateModule(m);
          }
        }
        server.ws.send({ type: 'full-reload', path: '*' });
        return [];
      }
      server.ws.send({ type: 'full-reload', path: '*' });
    },
  };
}
