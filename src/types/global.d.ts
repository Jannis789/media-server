import Alpine from "alpinejs";
import type { PineconeRouter } from "pinecone-router";
import { type CookieManager as CookieManagerType, type Cookie as CookieType } from "../core/utils/CookieManager"; // <-- ohne 'type'

export {};

declare global {
  interface Window {
    Alpine: Alpine;
  }
  function api(input: string, init?: any): any; // @todo use the correct type
  var app: PineconeRouter;
  var CookieManager: CookieManagerType;
  var Cookie: typeof CookieType;
}