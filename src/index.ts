import PineconeRouter from "pinecone-router";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import mask from "@alpinejs/mask";
import establishPineconeRouter from "./utils/PineconeRoutes.ts";

import.meta.glob("./components/**/*.ts", { eager: true });

import GlobalStorage from "./utils/GlobalStorage.ts";
import defineAlpineInterpolate from "./utils/AlpineInterpolate";

import "./global.scss";

Alpine.plugin(persist);
Alpine.plugin(mask);
Alpine.plugin(PineconeRouter);

document.addEventListener("alpine:init", () => {
  GlobalStorage.insert();
  defineAlpineInterpolate();
  establishPineconeRouter(Alpine.$router);
});

Alpine.start();