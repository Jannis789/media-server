import "./global.scss";
import PineconeRouter from 'pinecone-router'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import mask from '@alpinejs/mask'
import startRoutes from "./controller/routes";
import { XHeader } from "./view/components/header/header.component";

new XHeader();

Alpine.plugin(PineconeRouter)
Alpine.plugin(persist);
Alpine.plugin(mask);

document.addEventListener('alpine:init', () => {
    startRoutes(window.PineconeRouter);
});

Alpine.start()