type Callback<T> = (val: T) => void;
type ManyCallback<T> = (...vals: T[keyof T][]) => void;


export class ObservableState<T extends Record<string, any>> {
  private states: T;
  private subs = new Map<keyof T, Callback<any>[]>();
  private subsMany: { keys: (keyof T)[]; cb: ManyCallback<T> }[] = [];
  public proxy: T & this;

  constructor(initial: T) {
    this.states = { ...initial };

    this.proxy = new Proxy(this.states, {
      set: (target, prop: string | symbol, value: any) => {
        if (typeof prop === "string" && (prop in target)) {
          (target as any)[prop] = value;

          // 1️⃣ normale on
          if (this.subs.has(prop as keyof T)) {
            this.subs.get(prop as keyof T)!.forEach(cb => cb(value));
          }

          // 2️⃣ onMany
          for (const sub of this.subsMany) {
            if (sub.keys.includes(prop as keyof T)) {
              const args = sub.keys.map(k => target[k]);
              sub.cb(...args);
            }
          }
        } else {
          (target as any)[prop] = value;
        }

        return true;
      },
      get: (target, prop: string | symbol) => {
        // Proxy Zugriff auf Methoden
        if (prop in this) {
          // @ts-ignore
          return this[prop];
        }
        return target[prop as keyof T];
      }
    }) as T & this;
  }

  /** Zugriff auf den Proxy */
  get instance() {
    return this.proxy;
  }

  /** Beobachte einen Key */
  on<K extends keyof T>(key: K | string, cb: Callback<T[K]>) {
    const k = key as keyof T;
    if (!this.subs.has(k)) this.subs.set(k, []);
    this.subs.get(k)!.push(cb);
  }

  /** Beobachte Key nur wenn Bedingung erfüllt */
  onIf<K extends keyof T>(key: K | string, pred: (val: T[K]) => boolean, cb: Callback<T[K]>) {
    const k = key as keyof T;
    if (!this.subs.has(k)) this.subs.set(k, []);
    this.subs.get(k)!.push(val => {
      if (pred(val)) cb(val);
    });
  }

  /** Beobachte mehrere Keys gleichzeitig */
  onMany(keys: (keyof T)[] | string[], cb: ManyCallback<T>) {
    const kArr = keys.map(k => k as keyof T);
    this.subsMany.push({ keys: kArr, cb });
  }

  /** Neue Keys hinzufügen */
  add<K extends string, V>(obj: Record<K, V>) {
    for (const key in obj) {
      // @ts-ignore
      this.states[key] = obj[key];
    }
  }
}
