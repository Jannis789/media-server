import PineconeRouter from "pinecone-router";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { establishPineconeRouter } from "./extra/utils/PineconeRoutes";
import { globalStyle } from "./styles";
import { setApiCommunicator } from "./extra/utils/ApiCommunicatior";
import.meta.glob("./components/*/*.ts", { eager: true });

async function main() {
    setApiCommunicator();
    document.adoptedStyleSheets = [globalStyle];
    Alpine.plugin(persist);
    Alpine.plugin(PineconeRouter);
    establishPineconeRouter(Alpine.$router);
    Alpine.start();
}

main().catch((error) => {
    console.error("A fatal error occurred during initialization:", error);
    alert("An error occurred while initializing the application. Please try again later.");
});
