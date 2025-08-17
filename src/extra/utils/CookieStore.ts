export class CookieStore {
    static get cookieRaw(): string {
        return document.cookie;
    }

    static get cookies(): Record<string, Cookie> {
        const record: Record<string, Cookie> = {};
        const cookieStrings = this.cookieRaw.split(";");

        Cookie.cookies = [];

        for (const cookie of cookieStrings) {
            const [rawName, rawValue] = cookie.split("=");
            if (!rawName) continue;

            const name = rawName.trim();
            const value = decodeURIComponent((rawValue ?? "").trim());

            const cookieRef = new Cookie(name, value);
            Cookie.cookies.push(cookieRef);
            record[name] = cookieRef;
        }

        return record;
    }
}

export class Cookie {
    static cookies: Cookie[] = [];

    private _name: string;
    private _value: string;
    private _expires?: Date;

    constructor(name: string, value: string, expires?: Date) {
        this._name = name;
        this._value = value;
        this._expires = expires;

        this.commit();
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (Cookie.cookies.some(c => c !== this && c.name === newName)) {
            throw new Error(`Cookie with name "${newName}" already exists.`);
        }
        this._name = newName.trim();
        this.commit();
    }

    get value(): string {
        return this._value;
    }

    set value(newValue: string) {
        this._value = newValue.trim();
        this.commit();
    }

    get expires(): Date | undefined {
        return this._expires;
    }

    set expires(date: Date | undefined) {
        this._expires = date;
        this.commit();
    }

    private commit() {
        let cookieStr = `${this._name}=${encodeURIComponent(this._value)}`;
        if (this._expires) {
            cookieStr += `; expires=${this._expires.toUTCString()}`;
        }

        cookieStr += "; path=/";

        document.cookie = cookieStr;
    }
}
