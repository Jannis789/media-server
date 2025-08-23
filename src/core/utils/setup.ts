import Alpine from "alpinejs";
import PineconeRouterPlugin from "pinecone-router";
import { setupDefaultRoutes } from "#routes/DefaultRoutes";
import { setupApiCommunicator } from "#utils/ApiCommunicatior";

import globalStyle from "/styles/global.xcss";
import.meta.glob('#components/**/*.ts', {eager: true});

export function setup() {

    // PHASE 1
    Alpine.plugin(PineconeRouterPlugin)

    globalThis.app = Alpine.$router;
    
    // PHASE 2
    setupDefaultRoutes();
    setupApiCommunicator();
    setupLightDomStyles();
    Alpine.start();

}

function setupLightDomStyles() {
    document.adoptedStyleSheets = [
        globalStyle
    ];
}