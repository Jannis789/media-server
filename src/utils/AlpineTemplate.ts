import { define } from "hybrids";
import Alpine from "alpinejs";
/*
 * AlpineTemplate.ts
 * This file defines a decorator for Hybrids.js
 * Parameters:
 * - tag: The custom element tag name. (string)
 * - template: The HTML template for the component. (DocumentFragment)
 * - style: The CSS styles for the component. (CSSStyleSheet or CSSStyleSheet[])
 */
type AlpineTemplateParams = {
  tag: string;
  template: DocumentFragment;
  style: CSSStyleSheet | CSSStyleSheet[];
};

const componentMap = new Map<string, unknown>();

function AlpineTemplate({ tag, template, style }: AlpineTemplateParams) {
  console.info(`AlpineTemplate decorator called for tag: ${tag}`);
  return function (target: new (...args: unknown[]) => unknown) {
    const render = (host: HTMLElement) => {
      const shadow: ShadowRoot = host.attachShadow({ mode: "open" });

      shadow.appendChild(template.cloneNode(true));

      if (style) {
        const sheets = Array.isArray(style) ? style : [style];
        if ("adoptedStyleSheets" in shadow === false) {
          throw new Error(
            "Adopted stylesheets are not supported in this browser."
          );
        }
        shadow.adoptedStyleSheets = sheets;
      }

      console.info(`Rendering Alpine component: ${tag}`);

      Alpine.initTree(host.shadowRoot! as unknown as HTMLElement);

      return () => {};
    };

    componentMap.set(tag, target);

    Alpine.magic("component", () => (tag: string) => {
      const ctor = componentMap.get(tag) as { new (): unknown } | undefined;
      if (!ctor) throw new Error(`Component for tag '${tag}' not found`);
      return new ctor();
    });

    define({
      tag,
      ...target,
      render,
    });
  };
}

export { AlpineTemplate };
export type { AlpineTemplateParams };
