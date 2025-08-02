import Alpine from "alpinejs";

type ExtractInner<T> = T extends ReturnType<typeof Alpine.$persist<infer U>> ? U : never;

function getCountryCode(): string {
  const lang = navigator.language;
  if (lang.length === 2) return lang;
  if (lang.includes("-")) return lang.split("-")[0];
  return "en";
}

function createGlobalOptions() {
    return {
        isLoggedIn: Alpine.$persist<boolean>(false),
        currentLanguage: Alpine.$persist<string>(getCountryCode()),
        i18nTranslations: Alpine.$persist<Record<string, string>>({}),
        i18nModifiedAt: Alpine.$persist<Date | null>(null),
    };
}

class GlobalStorage {
    private static globalOptions: ReturnType<typeof createGlobalOptions>;

    static insert() {
        this.globalOptions = createGlobalOptions();
        Alpine.store("global", this.globalOptions);
    }

    private static get options() {
        if (!Alpine.store("global")) {
            throw new Error("Global options are not initialized. Ensure that 'insert' is called before accessing 'options'.");
        }
        return Alpine.store("global") as typeof this.globalOptions;
    }

    static get<K extends keyof typeof GlobalStorage.globalOptions>(key: K): typeof GlobalStorage.globalOptions[K] {
        return this.options[key];
    }

    static set<K extends keyof typeof GlobalStorage.globalOptions>(key: K, value: ExtractInner<typeof GlobalStorage.globalOptions[K]>) {
        this.options[key] = Alpine.$persist(value) as unknown as typeof GlobalStorage.globalOptions[K];
    }
}

export default GlobalStorage;
