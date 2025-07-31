import type { PineconeRouter } from "pinecone-router";
import GlobalStorage from "./GlobalStorage.ts";

function establishPineconeRouter(router: PineconeRouter) {
	router.settings({
		targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
	});

	console.info(document.location.href);

	const loginFallback = GlobalStorage.get("isLoggedIn") ? '/layouts/home.html' : '/layouts/login.html';

	router.add('/', {
		templates: ['/layouts/landing-page.html'],
	});

	router.add('/index.html', {
		templates: ['/layouts/login.html'],
	});

	router.add('/login', {
		templates: [loginFallback],
	});

	const usedTemplates = router.routes.get(document.location.pathname)?.templates;
	console.info(`On Route: "${document.location.pathname}" with templates: "${usedTemplates?.join(', ')}"`);

}

export default establishPineconeRouter;
