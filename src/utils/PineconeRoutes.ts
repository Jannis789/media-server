import type { PineconeRouter } from "pinecone-router";

function establishPineconeRouter(router: PineconeRouter) {
	router.settings({
		targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
	});

	router.add('/', {
		templates: ['/layouts/login.html'],
	});

	router.add('/index.html', {
		templates: ['/layouts/login.html'],
	});

	router.add('/login', {
		templates: ['/layouts/login.html'],
	});
}

export default establishPineconeRouter;
