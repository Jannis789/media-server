import Alpine from "alpinejs";
import PineconeRouterPlugin from "pinecone-router";
import presist from "@alpinejs/persist";
import globalStyle from "/styles/global.xcss";

import { setupDefaultRoutes } from "#routes/DefaultRoutes";
import { setupApiCommunicator } from "#utils/ApiCommunicatior";
import { PresistanceStore } from "#utils/PresistanceStore";
import { CookieManager } from "#utils/CookieManager";
import { TranslationReceiver } from "#utils/language/TranslationReciver";
import { log } from "#utils/logger";
import { ObservableState } from "#utils/ObservableState";

const SetupStatus = {
    alpine: false,
    cookies: false,
    apiCommunicator: false,
    routes: false,
    lightDomStyles: false,
    PresistanceStore: false,
    translations: false,
    i18nDirective: false,
    components: false,
};

const setupStatusObject = new ObservableState(SetupStatus);

const keys = Object.keys(SetupStatus);

export const status = {
    initialized: setupStatusObject.proxy,
};

const modules = import.meta.glob("#components/**/*.ts");

const loadedTags = new Set<string>();

export function setup() {
    const steps: Record<string, () => void> = {
        alpine: () => { // syncronous, deps = None
            Alpine.plugin(PineconeRouterPlugin);
            Alpine.plugin(presist);
            status.initialized.alpine = true;
            log.setup("Initialized: Alpine can be used now");
        },
        cookies: () => { // syncronous, deps = None
            CookieManager.initStore();
            status.initialized.cookies = true;
            log.setup("Initialized: Cookies can be used now");
        },
        apiCommunicator: () => { // syncronous, deps = cookies
            setupApiCommunicator();
            status.initialized.apiCommunicator = true;
            log.setup("Initialized: API Communicator can be used now");
        },
        routes: () => { // syncronous, deps = alpine
            globalThis.app = Alpine.$router;
            setupDefaultRoutes();
            status.initialized.routes = true;
            log.setup("Initialized: Routing can be used now");
        },
        lightDomStyles: () => { // syncronous, deps = None
            document.adoptedStyleSheets = [globalStyle];
            status.initialized.lightDomStyles = true;
            log.setup("Initialized: Light DOM Styles can be used now");
        },
        PresistanceStore: () => { // syncronous, deps = None
            PresistanceStore.initStore();
            status.initialized.PresistanceStore = true;
            log.setup("Initialized: PresistanceStore can be used now");
        },
        translations: () => { // syncronous, deps = PresistanceStore, apiCommunicator
            TranslationReceiver.updateTranslations();
            status.initialized.i18nDirective = true;
            log.setup("Initialized: Translations can be used now");
        },
        i18nDirective: () => { // assyncronous, deps = translations
            Alpine.start();
            log.setup("initialized i18nDirective can be done here");
        },
        components: () => { // syncronous, deps = dependencies are component dependent
            document.addEventListener("pinecone:end", () => {
                lazyLoadComponents(document.body);
            });
            setupStatusObject.proxy.components = true;
            log.setup("Initialized: Components can be used now");
        },

    };

    keys.forEach((key, idx) => {
        setupStatusObject.on(key, (val: boolean) => {
            if (val) {
                const nextKey = keys[idx + 1];
                if (nextKey) steps[nextKey]?.();
            }
        });
    });

    steps[keys[0]]?.();
}

export function lazyLoadComponents(source: Element) {
    const elements = source.querySelectorAll(":not(:defined)");
    for (const el of elements) {
        const tag = el.tagName.toLowerCase();
        if (loadedTags.has(tag)) continue;
        const path = Object.keys(modules).find(p => p.endsWith(`/${tag}.ts`));
        if (path) {
            log.component(`Found component "${tag}", importing from ${path}`);
            modules[path]();
            loadedTags.add(tag);
        }
    }
}