
// POST -> /Translation/:language_code
interface GetTranslationsResponse {
    status: number;
    message: string;
    data?: {
        key: string;
        value: string;
    }[];
}

enum TranslationPath {
    GetTranslations = "/Translation/",
}

export { GetTranslationsResponse, TranslationPath };