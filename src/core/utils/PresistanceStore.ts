import { getLocalIsoCode } from "./language/LanguageUtil";
import { status } from "./setup";

const DEFAULTS = {
    language: getLocalIsoCode(),
    translations: {},
    translationsUpdatedAt: null as Date | null
};

// Typen aus Alpine Persist Plugin
interface SimpleStorage {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
}

interface InterceptorObject<T> {
    initialValue: T;
    _x_interceptor: true;
    initialize: (data: Record<string, unknown>, path: string, key: string) => T;
}

interface persistInterceptor<T> extends InterceptorObject<T> {
    as(name: string): persistInterceptor<T>;
    using(storage: SimpleStorage): persistInterceptor<T>;
}

interface $persist {
    <T>(value: T): persistInterceptor<T>;
}

declare global {
    interface Window {
        Alpine: {
            $persist: $persist;
            store: (name: string, value?: any) => { value?: any } | undefined;
        };
    }
}

/**
 * PresistanceStore
 * Initialisiert persistente Alpine.store Werte und bietet Hilfsfunktionen.
 */
export class PresistanceStore {
    /**
     * Setzt einen Wert persistent (Alpine.store oder localStorage)
     */
    static set<T = any>(name: string, value: T) {
        const persistKey = name;
        if (window.Alpine && window.Alpine.$persist && window.Alpine.store) {
            window.Alpine.store(name, {
                value: window.Alpine.$persist(value).as(persistKey)
            });
        } else {
            localStorage.setItem(persistKey, JSON.stringify(value));
        }
    }
    /**
     * Initialisiert alle DEFAULTS als persistente Alpine.store Werte
     */
    static initStore() {
        Object.entries(DEFAULTS).forEach(([name, value]) => {
            // Prüfe, ob Wert schon existiert
            let exists = false;
            if (window.Alpine && window.Alpine.store) {
                const store = window.Alpine.store(name);
                if (store !== undefined && typeof store.value !== "undefined") {
                    exists = true;
                }
            } else {
                const raw = localStorage.getItem(name);
                if (raw !== null) {
                    exists = true;
                }
            }
            // Initialisiere nur, wenn nicht vorhanden
            if (!exists) {
                PresistanceStore.set(name, value);
            }
        });
        status.initialized.PresistanceStore = true;
    }

    /**
     * Holt einen Wert aus Alpine.store oder localStorage
     */
    static get<T = any>(name: string, fallback?: T): T {
        if (window.Alpine && window.Alpine.store) {
            const store = window.Alpine.store(name);
            if (store && typeof store.value !== "undefined") {
                return store.value;
            }
        }
        // Fallback
        const raw = localStorage.getItem(name);
        if (raw !== null) return JSON.parse(raw);
        return fallback as T;
    }
}
