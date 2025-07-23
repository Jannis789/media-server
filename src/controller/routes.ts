import type { PineconeRouter } from "pinecone-router";

function startRoutes(resolver: PineconeRouter) {
    resolver.settings({
        targetID: 'app',
        fetchOptions: {
            headers: { 'X-Pinecone': 'true' },
        },
    });

    resolver.add('/index.html', {
        templates: ['/view/pages/login/login.html'],
    });

    resolver.add('', {
        templates: ['/view/pages/login/login.html'],
    });

    resolver.add('/components/header.html', {
        templates: ['/view/components/header/header.html'],
    });

    resolver.add('notfound', {});

}

export default startRoutes;