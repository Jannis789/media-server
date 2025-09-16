
export function getLocalIsoCode(): string {
    const lang = navigator.language || (navigator as any).userLanguage || 'en';
    const isoCode = lang.slice(0, 2).toLowerCase();
    return /^[a-z]{2}$/.test(isoCode) ? isoCode : 'en';
}