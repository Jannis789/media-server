import Alpine from 'alpinejs';

export function Component(tagName: string) {
  return function <T extends { new(...args: any[]): {} }>(Base: T) {
    if (!customElements.get(tagName)) {

      // Alpine-Name aus tagName generieren (Bindestriche durch Unterstriche ersetzen)
      const alpineName = tagName.replace(/-/g, '_');

      class CustomElement extends HTMLElement {
        shadow: ShadowRoot;
        static styles = (Base as any).styles;
        static template = (Base as any).template;

        constructor(..._args: any[]) {
          super();
          this.shadow = this.attachShadow({ mode: 'open' });

          // Container pro Instanz
          const container = document.createElement('section');
          container.setAttribute('x-data', alpineName);

          // Styles einfügen
          const styles = (CustomElement as any).styles as CSSStyleSheet[] | undefined;
          if (styles) {
            this.shadow.adoptedStyleSheets = styles;
          }

          // Template einfügen
          const template = (CustomElement as any).template as DocumentFragment | undefined;
          if (template) {
            container.append(template.cloneNode(true));
          }
          this.shadow.append(container);

          // Alpine-Data nur einmal pro alpineName registrieren
          if (!(Alpine as any)._registeredComponents?.has(alpineName)) {
            (Alpine as any)._registeredComponents ??= new Set();
            (Alpine as any)._registeredComponents.add(alpineName);
            Alpine.data(alpineName, () => new Base());
          }

          // Alpine im ShadowRoot initialisieren
          Alpine.initTree(this.shadow as unknown as HTMLElement);
        }
      }

      customElements.define(tagName, CustomElement);
    }
  };
}
