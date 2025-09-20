import { PresistanceStore } from "../PresistanceStore";
import type { Failure, Success } from "../../shared/basic.response.types";
import { TranslationResponsePaths, type GetTranslationsResponse } from "../../shared/translation.responses";
import Alpine from "alpinejs";
import { status } from "#utils/setup";
import { getLocalIsoCode } from "./LanguageUtil";

export class TranslationReceiver {

    static attempts = 0;
    static maxAttempts = 3
    static i18nProxy = {};

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
        const language = PresistanceStore.get("language")  || getLocalIsoCode();

        Alpine.magic("i18n", () => this.i18nProxy);

        api(TranslationResponsePaths.GetTranslations + language, this.translationRequest)
            .then(this.handleResponse.bind(this))
            .catch(this.handleIssue.bind(this));
    }
    static handleResponse(response: Success<GetTranslationsResponse>) {
        const existing = PresistanceStore.get("translations") || {};
        const { refreshAll, translations } = response.data;
        const merged = refreshAll ? translations : { ...existing, ...translations };
        const cleaned = Object.fromEntries(
            Object.entries(merged).filter(([, v]) => v != null)
        );
        PresistanceStore.set("translations", cleaned);
        PresistanceStore.set("translationsUpdatedAt", new Date());
        this.setupI18nDirective(cleaned as Record<string, string>);
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

    static setupI18nDirective(translations: Record<string, string>) {
        this.i18nProxy = new Proxy(translations, {
            get(target, prop: string) {
                if (prop in target) {
                    return target[prop];
                }
                console.warn(`Translation for key "${prop}" not found.`);
                return prop;
            }
        });

        status.initialized.i18nDirective = true;
    }
}



