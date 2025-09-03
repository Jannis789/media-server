export function setTooltip(el: HTMLElement, content: string | HTMLElement) {
    if (!el) return;

    // Entferne vorhandenen Tooltip
    const parent = el.parentElement;
    const existing = parent?.querySelector('.tooltip');
    if (existing) {
        existing.remove();
        el.removeEventListener('mouseenter', (existing as any)._showTooltip);
        el.removeEventListener('mouseleave', (existing as any)._hideTooltip);
    }

    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip';

    if (typeof content === 'string') {  
        tooltipContainer.innerHTML = JSON.parse(JSON.stringify(content));
    } else {
        tooltipContainer.appendChild(content);
    }

    tooltipContainer.style.display = 'none';

    // Tooltip nach dem Element einfügen
    parent?.insertBefore(tooltipContainer, el.nextSibling);

    // Event-Handler
    function showTooltip() { tooltipContainer.style.display = 'block'; }
    function hideTooltip() { tooltipContainer.style.display = 'none'; }

    // Speichere die Handler für späteres Entfernen
    (tooltipContainer as any)._showTooltip = showTooltip;
    (tooltipContainer as any)._hideTooltip = hideTooltip;

    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
}

export function removeTooltip(el: HTMLElement) {
    const next = el.nextElementSibling;
    if (
        !el ||
        !next ||
        !(next instanceof HTMLElement) ||
        !next.classList.contains('tooltip')
    ) return;

    // Entferne die Eventlistener
    el.removeEventListener('mouseenter', (next as any)._showTooltip);
    el.removeEventListener('mouseleave', (next as any)._hideTooltip);

    next.remove();
}

export function removeTooltipIfExists(el: HTMLElement | null | undefined) {
    if (!el) return;
    removeTooltip(el);
}