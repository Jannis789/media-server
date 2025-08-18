import PineconeRouter from "pinecone-router";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { establishPineconeRouter } from "./extra/utils/PineconeRoutes";
import { globalStyle } from "./styles";
import { setApiCommunicator } from "./extra/utils/ApiCommunicatior";
import { TranslationReceiver } from "./extra/utils/TranslationReciver";
import { persistenceStore } from "./extra/utils/PresistanceStore";

import.meta.glob("./components/*/*.ts", { eager: true });


async function main() {
    setApiCommunicator();
    document.adoptedStyleSheets = [globalStyle];
    Alpine.plugin(PineconeRouter);
    Alpine.plugin(persist);
    persistenceStore.populateStore();
    TranslationReceiver.updateTranslations();
    TranslationReceiver.activateTranslationDirective();
    document.addEventListener("alpine:init", () => {
        establishPineconeRouter(window.PineconeRouter);
    });
    Alpine.start();
}

main().catch((error) => {
    console.error("A fatal error occurred during initialization:", error);
    alert("An error occurred while initializing the application. Please try again later.");
});
