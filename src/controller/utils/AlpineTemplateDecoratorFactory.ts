import { define, html, type Component } from 'hybrids';
//@ts-ignore
const htmlModules = import.meta.glob('../../view/components/**/*.html', { query: '?raw', import: 'default', eager: true });

function AlpineTemplateDecoratorFactory(tag: string, componentPath: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const content = htmlModules[`../../view/components${componentPath}`];
        if (!content) {
          throw new Error(
            `Component HTML not found for path: ${componentPath}`
          );
        }
        define({
          tag,
          template: content,
          // @ts-ignore
          render: ({ template }) => html([template]),
        } as Component<unknown>);
      }
      
    };
  };
}

export default AlpineTemplateDecoratorFactory;