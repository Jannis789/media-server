import config from "@/config";
import { Failure, GenericResponse, Success } from "@/shared/basic.response.types";

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

export function setApiCommunicator() {

    globalThis.api = <TResponse extends GenericResponse<any>>(
        input: string,
        init?: RequestInit
    ): Promise<Success<TResponse>> => {
        return new Promise(async (resolve, reject) => {
            let res: Response;

            try {
                res = await fetch(config.apiUrl + input, init);
            } catch (err) {
                // Netzwerkfehler intern behandeln, kein reject
                console.error("Netzwerkfehler abgefangen:", err);
                return; // Promise bleibt ungelöst → then/catch beim Aufrufer wird nicht getriggert
            }

            const contentType = res.headers.get("content-type");
            let data: any = null;

            if (contentType?.includes("application/json") && res.status !== 204) {
                try {
                    data = await res.json();
                    data = reviveDates(data);
                } catch {
                    data = null; // JSON kaputt, aber kein reject
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

}