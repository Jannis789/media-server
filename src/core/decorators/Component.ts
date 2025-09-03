import Alpine from 'alpinejs';

// Instanz-Map außerhalb der Component-Funktion
const instanceMap = new WeakMap<HTMLElement, any>();

export function Component(tagName: string) {
  return function (Base: new (host?: HTMLElement) => any & { styles?: CSSStyleSheet[], template?: DocumentFragment }) {
    if (!customElements.get(tagName)) {
      const alpineName = tagName.replace(/-/g, '_');

      class NativeComponent extends HTMLElement {
        shadow: ShadowRoot;
        static styles = (Base as any).styles;
        static template = (Base as any).template;

        constructor() {
          super();
          this.shadow = this.attachShadow({ mode: 'open' });

          const container = document.createElement('section');
          container.setAttribute('x-data', alpineName);

          const styles = NativeComponent.styles;
          if (styles) {
            this.shadow.adoptedStyleSheets = styles;
          }

          const template = NativeComponent.template;
          if (template) {
            container.append(template.cloneNode(true));
          }
          this.shadow.append(container);

          // host direkt beim Instanziieren übergeben
          // Instanz in WeakMap speichern
          const baseInstance = new Base(this);
          instanceMap.set(this, baseInstance);

          Alpine.data(alpineName, () => {
            // immer dieselbe Instanz für das Host-Element zurückgeben
            const base = instanceMap.get(this);
            if (typeof base.setup === 'function') {
              base.setup(this);
            }

            Object.defineProperty(base, 'host', {
              get: () => this,
              configurable: true,
            });

            return base;
          });

          Alpine.initTree(this.shadow as unknown as HTMLElement);
        }
      }

      customElements.define(tagName, NativeComponent);
    }
  };
}