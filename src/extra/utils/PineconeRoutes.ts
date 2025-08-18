import type { PineconeRouter } from "pinecone-router";

function establishPineconeRouter(router: PineconeRouter) {
	router.settings({
		targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
	});

	router.add('/', {
		templates: ['/layouts/index.tmpl'],
	});

	router.add('/login', {
		templates: ['/layouts/login.tmpl'],
	});

	router.add('/register', {
		templates: ['/layouts/register.tmpl'],
	});

	router.add('notfound', {
		templates: ['/layouts/error.tmpl'],
	});
}

export { establishPineconeRouter };