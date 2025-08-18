import { GetTranslationsResponse, TranslationResponsePaths } from "@/shared/translation.responses";
import { Failure, Success } from "@/shared/basic.response.types";
import { persistenceStore } from "./PresistanceStore";
import Alpine from "alpinejs";

class TranslationReceiver {

    tries = 0;

    get translationObject(): Record<string, string> {
        return persistenceStore.get("translations") as Record<string, string>;
    }

    get requestUri() {
        return TranslationResponsePaths.GetTranslations + persistenceStore.get("translationLanguage");
    }

    get translationRequest() {
        const updatedAt = persistenceStore.get("translationsUpdatedAt");
        const payload = updatedAt !== null ? { since: updatedAt } : undefined;

        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            ...(payload && { body: JSON.stringify(payload) })
        };
    }

    updateTranslations() {
        this.tries++;
        api(this.requestUri, this.translationRequest)
            .then(response => this.handleResponse(response))
            .catch(error => this.handleIssue(error));
    }

    handleResponse(response: Success<GetTranslationsResponse>) {
        persistenceStore.set("translations", {...this.translationObject, ...response.data});
        persistenceStore.set("translationsUpdatedAt", new Date());
    }

    handleIssue(e: Failure<GetTranslationsResponse>) {
        const wrongLanguageCode = e.error.fields.some((fieldList) => fieldList.field === "language_code");
        if (this.tries <= 1 && wrongLanguageCode) {
            console.warn("Browser's language is not supported, falling back to English.");
            persistenceStore.set("translationLanguage", "en");
            this.updateTranslations();
            return;
        } 
        throw new Error(`CRITICAL ERROR, CAN'T RESOLVE TRANSLATIONS.`);
    }

    activateTranslationDirective() {
        Alpine.magic('i18n', () => {
            return this.translationObject;
        });
    
    }
}

const translationReceiver = new TranslationReceiver();
export { translationReceiver as TranslationReceiver };