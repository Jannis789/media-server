import { PresistanceStore } from "../PresistanceStore";
import type { Failure, Success } from "../../shared/basic.response.types";
import { TranslationResponsePaths, type GetTranslationsResponse } from "../../shared/translation.responses";
import Alpine from "alpinejs";
import { status } from "#utils/setup";

export class TranslationReceiver {

    static attempts = 0;
    static maxAttempts = 3

    static get translationRequest() {
        const updatedAt = PresistanceStore.get("translationsUpdatedAt");
        const payload = updatedAt !== null ? { since: updatedAt } : undefined;

        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            ...(payload && { body: JSON.stringify(payload) })
        };
    }

    static updateTranslations() {
        const language = PresistanceStore.get("language");

        api(TranslationResponsePaths.GetTranslations + language, this.translationRequest)
            .then(this.handleResponse.bind(this))
            .catch(this.handleIssue.bind(this));
    }

    static handleResponse(response: Success<GetTranslationsResponse>) {
        PresistanceStore.set("translations", { ...PresistanceStore.get("translations"), ...response.data });
        PresistanceStore.set("translationsUpdatedAt", new Date());

        const translations = PresistanceStore.get("translations");

        setupI18nDirective(translations);

        status.initialized.translations = true;
    }

    static handleIssue(error: Failure<GetTranslationsResponse>) {
        this.attempts++;
        if (this.attempts < this.maxAttempts) {
            console.warn(`Translation fetch failed, retrying... (${this.attempts}/${this.maxAttempts})`, error);
            this.updateTranslations();
            return;
        }
        console.error("Critical Error, couldn't recive translation:", error);
    }


}

function setupI18nDirective(translations: Record<string, string>) {
    const proxy = new Proxy(translations, {
        get(target, prop: string) {
            if (prop in target) {
                return target[prop];
            }
            console.warn(`Translation for key "${prop}" not found.`);
            return prop;
        }
    });
    
    Alpine.magic("i18n", () => proxy);

    status.initialized.i18nDirective = true;
}