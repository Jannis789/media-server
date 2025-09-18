import { getLocalIsoCode } from "./language/LanguageUtil";
import Alpine from "alpinejs";

const DEFAULTS = {
    language: getLocalIsoCode(),
    translations: {},
    translationsUpdatedAt: null as Date | null
};

export class PresistanceStore {
    
    static set<T>(name: string, value: T) {
        const store = Alpine.store(name) as { value: T } | undefined;
        if (store && typeof store.value !== "undefined") {
            store.value = value;
        } else {
            Alpine.store(name, {
                value: Alpine.$persist(value).as(name)
            });
        }
    }

    static initStore() {
        Object.entries(DEFAULTS).forEach(([name, value]) => {
            const store = Alpine.store(name);
            if (!store) {
                PresistanceStore.set(name, value);
            }
        });
    }

    static get<T>(name: string, fallback?: T): T {
        const store = Alpine.store(name) as { value: T } | undefined;
        if (store && typeof store.value !== "undefined") {
            return store.value;
        }
        return fallback as T;
    }
}