import "./global.scss";
import PineconeRouter from 'pinecone-router'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import mask from '@alpinejs/mask'
import startRoutes from "./controller/routes";
import { define, html } from 'hybrids';

// Zugriff:
const htmlModules = import.meta.glob('./view/components/**/*.html', { query: '?raw', import: 'default' });


async function createAlpineHybridComponent(tag: string, contentPath: string) {
    if (!htmlModules[contentPath]) {
        console.error(`HTML module for ${contentPath} not found.`);
        return;
    }
    const content = await htmlModules[contentPath]();
    define({
        tag,
        content: content,
        render: ({ content }) => html([content]),
    });
}

await createAlpineHybridComponent("x-header", "./view/components/header/header.html");

Alpine.plugin(PineconeRouter)
Alpine.plugin(persist);
Alpine.plugin(mask);

document.addEventListener('alpine:init', () => {
    startRoutes(window.PineconeRouter);
});

Alpine.start()