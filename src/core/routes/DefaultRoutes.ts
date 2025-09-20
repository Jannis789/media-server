
import { log } from "#utils/logger";
import type { Context, PineconeRouter } from "pinecone-router";

export let activeContext: Context & {defaultTemplate: string} | null = null;

function genericHandler(ctx: any) {
    ctx = ctx.route || ctx.routeName || null;
    activeContext = Object.assign(ctx, { defaultTemplate: ctx.templates[0] });
    log.route("Current Template is:", activeContext!.defaultTemplate);
    return true;
}

type RouteConfig = { templates: string[], handlers?: Array<(ctx: any) => any> };
const routes: Record<string, RouteConfig> = {
    '/': { 
        templates: ['/layouts/index.tmpl'] 
    },
    'notfound': { 
        templates: ['/layouts/index.tmpl'] 
    },
    'login': { 
        templates: ['/layouts/login.tmpl'] 
    },
    'register': { 
        templates: ['/layouts/register.tmpl'] 
    },
};

function setupDefaultRoutes() {
    const app: PineconeRouter = globalThis.app;

    app.settings({
        targetID: 'app',
        fetchOptions: {
            headers: { 'X-Pinecone': 'true' },
        },
    });

    Object.keys(routes).forEach((route) => {
        const config = routes[route];
        let handlers = config.handlers ? [...config.handlers, genericHandler] : [genericHandler];
        app.add(route, {
            ...config,
            handlers,
        });
    });
}

export { setupDefaultRoutes };