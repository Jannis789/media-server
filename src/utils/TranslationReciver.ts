import Alpine from "alpinejs";
import request from "./RequestHandler.ts";

// @todo resolve eslint errors

const requestData = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `mutation { getTranslationDataObject }`,
    }),
};

function reciveTranslations() {
    return request("http://localhost:3000/Translation/graphql", requestData)
        .then(response => response.json())
        .then(result => handleResult(result))
        .catch(error => handleError(error));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleResult(result: any) {
    const translations = JSON.parse(result?.data?.getTranslationDataObject ?? '{}');
    console.info(Object.keys(translations).length, "translations received");
    Alpine.magic("i18n", () => translations || {});
    return translations;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any) {
    console.error("Error fetching translations:", error);
    return {};
}

export default reciveTranslations;
