import type { PineconeRouter } from "pinecone-router";

function setupDefaultRoutes() {

    console.info("Setting up Pinecone Router...");

    const app: PineconeRouter = globalThis.app;
    
    app.settings({
        targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
    });

    app.add('/', {
        templates: ['/layouts/index.tmpl'],
    });

    app.add('notfound', {
        templates: ['/layouts/index.tmpl'],
    });

    app.add('login', {
        templates: ['/layouts/login.tmpl'],
    });

    app.add('register', {
        templates: ['/layouts/register.tmpl'],
    });
}

export { setupDefaultRoutes };