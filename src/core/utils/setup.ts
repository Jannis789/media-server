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
    translations: false,
    PresistanceStore: false,
    i18nDirective: false,
    components: false,
};

const setupStatusObject = new ObservableState(SetupStatus);

const keys = Object.keys(SetupStatus);

export const status = {
    initialized: setupStatusObject.proxy,
};

export function setup() {
    const steps: Record<string, () => void> = {
        alpine: () => {
            Alpine.plugin(PineconeRouterPlugin);
            Alpine.plugin(presist);
            status.initialized.alpine = true;
            log.setup("Initialized: Alpine can be used now");
        },
        cookies: () => {
            CookieManager.initStore();
            log.setup("Initialized: Cookies can be used now");
        },
        apiCommunicator: () => {
            setupApiCommunicator();
            log.setup("Initialized: API Communicator can be used now");
        },
        routes: () => {
            globalThis.app = Alpine.$router;
            setupDefaultRoutes();
            setupStatusObject.proxy.routes = true;
            log.setup("Initialized: Routing can be used now");
        },
        lightDomStyles: () => {
            document.adoptedStyleSheets = [globalStyle];
            setupStatusObject.proxy.lightDomStyles = true;
            log.setup("Initialized: Light DOM Styles can be used now");
        },
        translations: () => {
            TranslationReceiver.updateTranslations();
            log.setup("Initialized: Translations can be used now");
        },
        PresistanceStore: () => {
            PresistanceStore.initStore();
            log.setup("Initialized: PresistanceStore can be used now");
        },
        i18nDirective: () => {
            log.setup("initialized i18nDirective can be done here");
        },
        components: () => {
            Alpine.start();
            import.meta.glob("#components/**/*.ts", { eager: true });
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