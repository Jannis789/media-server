class CookieReader {
    private get cookieString(): string {
        return typeof document !== 'undefined' ? document.cookie : '';
    }

    private parseCookies(): Record<string, string> {
        return Object.fromEntries(
            this.cookieString.split(';').map(cookie => {
                const [key, value] = cookie.split('=').map(part => part.trim());
                return [key, value ? decodeURIComponent(value) : ''];
            })
        );
    }

    get(name: string): string | undefined {
        return this.parseCookies()[name];
    }

    add(name: string, value: string): void {
        if (typeof document !== 'undefined') {
            if (!name || value == null) {
                console.error("Cannot add cookie with empty name or value.");
                return;
            }
            document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/`;
            console.info(`Cookie set: ${name}=${value}`);
        }
    }

    delete(name: string): void {
        if (typeof document !== 'undefined') {
            document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=/`;
        }
    }

    has(name: string): boolean {
        return this.get(name) !== undefined;
    }
}

const cookieReader = new CookieReader();

export { cookieReader as CookieReader };
