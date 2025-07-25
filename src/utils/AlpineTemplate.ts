import { define } from "hybrids";
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


function AlpineTemplate({ tag, template, style }: AlpineTemplateParams) {
  return function (target: Record<string, any>) {
    const render = (host: HTMLElement) => {
      // Shadow DOM anlegen, falls nicht vorhanden
      if (!host.shadowRoot) {
        const shadow: ShadowRoot = host.attachShadow({ mode: 'open' });
        // Template einfügen
        shadow.appendChild(template.cloneNode(true));
        // Stylesheets einfügen
        if (style) {
          const sheets = Array.isArray(style) ? style : [style];
          if ('adoptedStyleSheets' in shadow) {
            // @ts-ignore
            shadow.adoptedStyleSheets = sheets;
          } else {
            for (const sheet of sheets) {
              const el = document.createElement('style');
              el.textContent = [...sheet.cssRules].map(rule => rule.cssText).join('');
              (shadow as ShadowRoot).appendChild(el);
            }
          }
        }
      }
      // Hybrids expects a function to update content, but we use Shadow DOM, so return a no-op
      return () => {};
    };

    define({
      tag,
      ...target,
      render,
    });
  };
}

export { AlpineTemplate };
export type { AlpineTemplateParams };
