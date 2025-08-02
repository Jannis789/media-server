import request from "./RequestHandler.ts";
import GlobalStorage from "./GlobalStorage.ts";

function getRequestData() {
    const i18nModifiedAt = GlobalStorage.get("i18nModifiedAt");
    const time = i18nModifiedAt !== null ? i18nModifiedAt.initialValue : null;
    const iso_code = GlobalStorage.get("currentLanguage");
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `mutation GetNewLanguageTranslations($languageCode: String!, $dateFrom: DateTimeISO) {\n  getNewLanguageTranslations(languageCode: $languageCode, dateFrom: $dateFrom)\n}`,
            variables: {
                languageCode: iso_code,
                dateFrom: time,
            },
        }),
    };
}

function reciveTranslations() {
    return request("http://localhost:3000/Translation/graphql", getRequestData())
        .then(response => response.json())
        .then(result => handleResult(result))
        .catch(error => handleError(error));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleResult(result: any) {
    console.info("Translations received:", Object.keys(result.data.getNewLanguageTranslations).length);
    const newTranslations: Record<string, string> = result?.data?.getNewLanguageTranslations;
    const savedTranslations: Record<string, string> = getSavedTranslations();
    const mergedTranslations: Record<string, string> = { ...savedTranslations, ...newTranslations };

    GlobalStorage.set("i18nTranslations", mergedTranslations);
    GlobalStorage.set("i18nModifiedAt", new Date());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any) {
    console.error("Error fetching translations:", error);
    return {};
}

function getSavedTranslations() {
    const translations = GlobalStorage.get("i18nTranslations").initialValue;
    return translations || {};
}


export default reciveTranslations;
