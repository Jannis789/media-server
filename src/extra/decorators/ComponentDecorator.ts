export function Component(tagName: string) {
  return function <T extends { new(...args: any[]): any }>(constructor: T) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, class extends constructor {
        shadow: ShadowRoot;
        constructor(...args: any[]) {
          super(...args);
          this.shadow = this.attachShadow({ mode: 'open' });

          // insert styles
          const styles = (constructor as any).styles as CSSStyleSheet[] | undefined;
          if (styles) {
            this.shadow.adoptedStyleSheets = styles;
          }

          // insert template
          const template = (constructor as any).template as DocumentFragment | undefined;
          const container = document.createElement('section');
          if (template) {
            container.append(template.cloneNode(true));
            this.shadow.append(container);
          }
        }
      });
    }
  };
}