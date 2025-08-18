import Alpine from "alpinejs";

type ValidTypes = string | number | boolean | object | null | undefined | Date;

const initialValues = {
  isLoggedIn: false,
  translationLanguage: typeof navigator !== "undefined" ? navigator.language : "en",
  translations: {} as Record<string, string>,
  translationsUpdatedAt: null as Date | null,
};

type InitialValues = typeof initialValues;

type PersistenceStoreType = { [K in keyof InitialValues]: ValidTypes };

export class PersistenceStore {
  populateStore() {
    if (!Alpine.store("persistenceStore")) {
      const interceptorObject: PersistenceStoreType = {} as PersistenceStoreType;

      for (const key in initialValues) {
        const typedKey = key as keyof InitialValues;
        interceptorObject[typedKey] = Alpine.$persist(initialValues[typedKey]);
      }

      Alpine.store("persistenceStore", interceptorObject);
    }
  }

  private getStore(): PersistenceStoreType {
    const store = Alpine.store("persistenceStore");
    if (!store) throw new Error("PersistenceStore is not initialized");
    return store as PersistenceStoreType;
  }

  get<K extends keyof InitialValues>(key: K): InitialValues[K] {
    return this.getStore()[key] as InitialValues[K];
  }

  set<K extends keyof InitialValues>(key: K, value: InitialValues[K]): void {
    this.getStore()[key] = value;
  }
}

const persistenceStore = new PersistenceStore();
export { persistenceStore };
