import type { Alpine } from "alpinejs";
import { GenericResponse, Success } from "./shared/basic.response.types";

export {};

declare global {
    var styleRepository: { [key: string]: CSSStyleSheet };
    var templateRepository: { [key: string]: DocumentFragment };
    interface Window {
        Alpine: Alpine;
    }
    function api<TResponse extends GenericResponse<any>>(input: string, init?: RequestInit): Promise<Success<TResponse>>;
}
