import { Component } from "#decorators/Component";
import footerStyles from './x-footer.xcss';
import footerTemplate from './x-footer.tmpl';

@Component('x-footer')
class XFooter {
    static styles = [footerStyles];
    
    static template = footerTemplate;
}

export { XFooter };