import PineconeRouter from "pinecone-router";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import mask from "@alpinejs/mask";
import establishPineconeRouter from "./utils/PineconeRoutes";

import.meta.glob("./components/**/*.ts", { eager: true });

// need to import to ensure they are defined
import "./utils/GlobalStorage";
import "./global.scss";
import GlobalStorage from "./utils/GlobalStorage";

Alpine.plugin(persist);
Alpine.plugin(mask);
Alpine.plugin(PineconeRouter);

document.addEventListener("alpine:init", () => {
  establishPineconeRouter(Alpine.$router);
  GlobalStorage.insert();
});

Alpine.start();