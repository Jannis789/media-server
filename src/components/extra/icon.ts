import { Component } from "#decorators/Component";
import iconStyle from "./icon.xcss";

@Component('x-icon')
export class XIcon {
    static styles = [iconStyle];

    setup(host: HTMLElement) {
        if (host.hasAttribute('name') && host.getAttribute('name')) {
            const uri = this.fetchIcon(host);
            this.createIconElementData(uri, host);
        }

        this.observeAttributes(host, (attr, val) => {
            console.info(`Attribut ${attr} changed to: ${val}`);
            // wenn sich z.B. name, size oder color ändert -> neu rendern
            if (attr === "name" && host.hasAttribute('name')) {
                const newUri = this.fetchIcon(host);
                this.createIconElementData(newUri, host);
            }
            if ((attr === "size" && host.hasAttribute('size')) || (attr === "color" && host.hasAttribute('color'))) {
                this.createIconElementData(this.fetchIcon(host), host);
            }
        }, ["name", "size", "color"]);
    }

    fetchIcon(host: HTMLElement): string {
        const iconName = host.getAttribute('name');
        const modules = import.meta.glob('#public/icons/**/*.svg');

        for (const path in modules) {
            const fileName = path.split('/').pop()?.replace('.svg', '');
            if (fileName !== iconName) continue;
            return path.replace('../public/', '/');
        }

        throw new Error(`x-icon: Icon with name "${iconName}" not found.`);
    }

    createIconElementData(uri: string, el: HTMLElement) {
        const size = el.getAttribute('size');
        const color = el.getAttribute('color');

        if (size) {
            el.style.width = size;
            el.style.height = size;
        }
        if (color) {
            el.style.background = color;
        }

        el.style.maskImage = `url('${uri}')`;
        el.style.maskRepeat = 'no-repeat';
        el.style.maskSize = 'contain';
        el.style.display = 'inline-block';
    }

    observeAttributes(
        el: HTMLElement,
        callback: (attr: string, value: string | null) => void,
        filter: string[] | null = null
    ) {
        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === "attributes" && m.attributeName) {
                    callback(m.attributeName, el.getAttribute(m.attributeName));
                }
            }
        });
        observer.observe(el, { attributes: true, attributeFilter: filter || undefined });
        return observer;
    }
}
