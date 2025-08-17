function getClientLanguage(): string {
    const language = navigator.language;
    // @todo, check if language is supported

    return "";
}


const PresistanceValues = {
    isLoggedIn: false,
    translationLanguage: "en",
    translations: {},
}

class PresistanceStore {


}
