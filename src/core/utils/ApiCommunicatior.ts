import type { Failure, GenericResponse, Success } from "../shared/basic.response.types";
import { getLocalIsoCode } from "./language/LanguageUtil";
import { status } from "./setup";

// Ergänzt beliebige Header in RequestInit
export function communicatorAppendHead(headers: Record<string, string>, init?: RequestInit): RequestInit {
    let result: RequestInit = { ...(init || {}) };
    if (result.headers instanceof Headers) {
        for (const key in headers) {
            result.headers.append(key, headers[key]);
        }
    } else {
        result.headers = { ...(result.headers as Record<string, string> || {}), ...headers };
    }
    return result;
}


// Helper: rekursiv Date-Strings erkennen und in Date umwandeln
function reviveDates(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(reviveDates);
    } else if (obj && typeof obj === "object") {
        const res: any = {};
        for (const key in obj) {
            if (typeof obj[key] === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj[key])) {
                res[key] = new Date(obj[key]);
            } else {
                res[key] = reviveDates(obj[key]);
            }
        }
        return res;
    } else {
        return obj;
    }
}

export function setupApiCommunicator() {

    globalThis.api = <TResponse extends GenericResponse<any>>(
        input: string,
        init?: RequestInit
    ): Promise<Success<TResponse>> => {
        return new Promise(async (resolve, reject) => {
            let res: Response;

            const cookie = CookieManager?.cookies?.['session_key'];
            const reqInit = communicatorAppendHead(
                {
                    ...(cookie && { "x-Session-UUID": cookie.value }),
                    'Accept-Language': getLocalIsoCode()
                },
                init
            );

            try {
                res = await fetch("http://localhost:3000" + input, reqInit);
            } catch (err) {
                console.error("Netzwerkfehler abgefangen:", err);
                return;
            }

            const contentType = res.headers.get("content-type");
            let data: any = null;

            if (contentType?.includes("application/json") && res.status !== 204) {
                try {
                    data = await res.json();
                    data = reviveDates(data);
                } catch {
                    data = null;
                }
            } else {
                try {
                    data = await res.text();
                } catch {
                    data = null;
                }
            }

            if (!res.ok) {
                // Backend-Fehler → reject → catch im Aufrufer
                reject(data as Failure<TResponse>);
                return;
            }

            // Erfolgreiche Response → then
            resolve(data as Success<TResponse>);
        });
    };
    status.initialized.apiCommunicator = true;
}