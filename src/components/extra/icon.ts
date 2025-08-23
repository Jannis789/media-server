import { Component } from "#decorators/Component";
import iconStyle from "./icon.xcss";

@Component('x-icon')
export class XIcon {
    static styles = [iconStyle];

    setup(host?: HTMLElement) {
        const el = host;
        if (!el?.hasAttribute('name')) {
            console.warn('x-icon: The "name" attribute is required for this component.');
            return;
        }

        const iconName = el.getAttribute('name');
        const modules = import.meta.glob('#public/icons/**/*.svg');

        for (const path in modules) {
            // Extract file name without extension
            const fileName = path.split('/').pop()?.replace('.svg', '');
            if (fileName !== iconName)
                continue;
            const uri = path.replace('../public/', '/');
            this.createIconElementData(uri, el);
            return;
        }

        console.error(`x-icon: Icon with name "${iconName}" not found.`);
    }

    createIconElementData(uri: string, el?: HTMLElement) {
        const hostEl = el;
        if (!hostEl) return;

        const size = hostEl.getAttribute('size') || null;
        const color = hostEl.getAttribute('color') || null;

        if (size) {
            hostEl.style.width = size;
            hostEl.style.height = size;
        }
        if (color)
            hostEl.style.background = color;
        
        hostEl.style.maskImage = `url('${uri}')`;
        hostEl.style.maskRepeat = 'no-repeat';
        hostEl.style.maskSize = 'contain';
        hostEl.style.display = 'inline-block';
    }
}