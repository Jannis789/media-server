import PineconeRouter from "pinecone-router";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import { establishPineconeRouter } from "./extra/utils/PineconeRoutes";
import { globalStyle } from "./styles";
// import "./components/header/x-header";
// import "./components/body/x-body";

import.meta.glob("./components/*/*.ts", { eager: true });

Alpine.plugin(persist);
Alpine.plugin(PineconeRouter);

document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = Array.from(globalStyle.cssRules).map(rule => rule.cssText).join("\n");
    document.head.appendChild(style);
});

document.addEventListener("alpine:init", () => {
    establishPineconeRouter(Alpine.$router);
});

Alpine.start();