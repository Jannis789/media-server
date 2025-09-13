import { setup } from "./core/utils/setup";

(async () => {
    setup();
})();

if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
        window.location.reload();
    });
    
}