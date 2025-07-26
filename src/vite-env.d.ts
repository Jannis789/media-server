/// <reference types="vite/client" />

declare module '*.scsssheet' {
  const sheet: CSSStyleSheet;
  export default sheet;
}

declare module '*.html' {
  const html: DocumentFragment;
  export default html;
}

interface Window {
  component: (tag: string) => { new (...args: any[]): any };
}