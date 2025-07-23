export function AlpineTemplateDecoratorFactory(tag: string, contentPath: string) {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) {
    // Hybrid decorator: can be used on class or method
    if (propertyKey && descriptor) {
      // Method decorator logic
      Reflect.defineMetadata('alpine:template', { tag, contentPath }, target, propertyKey);
    } else {
      // Class decorator logic
      Reflect.defineMetadata('alpine:template', { tag, contentPath }, target);
    }
  };
}