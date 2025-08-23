import type Alpine from "alpinejs";
import type { PineconeRouter } from "pinecone-router";

export {};

declare global {
  interface Window {
    Alpine: Alpine;
  }
  function api(input: string, init?: any): any; // @todo use the correct type
  var app: PineconeRouter;
}