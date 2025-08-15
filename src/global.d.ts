import type { Alpine } from "alpinejs";

export {};

declare global {
    var styleRepository: { [key: string]: CSSStyleSheet };
    var templateRepository: { [key: string]: DocumentFragment };
    interface Window {
        Alpine: Alpine;
    }
}
