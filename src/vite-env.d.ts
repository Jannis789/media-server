/// <reference types="vite/client" />

declare module '*.xcss' {
  const sheet: CSSStyleSheet;
  export default sheet;
}

declare module '*.tmpl' {
  const fragment: DocumentFragment;
  export default fragment;
}

