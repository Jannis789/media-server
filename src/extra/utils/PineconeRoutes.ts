import type { PineconeRouter } from "pinecone-router";

function establishPineconeRouter(router: PineconeRouter) {
	router.settings({
		targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
	});

	router.add('/', {
		templates: ['/layouts/login.tmpl'],
	});
}

export { establishPineconeRouter };