import Alpine from "alpinejs";

export function AlpineData() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Alpine.data(propertyKey, () => descriptor.value());
    const originalConnected = target.connectedCallback;
    // Overwrite the connectedCallback function to precede the initialization of Alpine.
    target.connectedCallback = function (...args: any[]) {
      if (typeof originalConnected === 'function') originalConnected.apply(this, args);

      const firstChild = this.shadowRoot?.firstElementChild;
      if (firstChild) {
        firstChild.setAttribute('x-data', propertyKey);
      }
      
      Alpine.destroyTree(this.shadowRoot);
      Alpine.initTree(this.shadowRoot);
    };
  };
}