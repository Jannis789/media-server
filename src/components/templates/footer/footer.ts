import { Component } from "#decorators/Component";
import footerStyles from './footer.xcss';
import footerTemplate from './footer.tmpl';

@Component('x-footer')
class XFooter {
    static styles = [footerStyles];
    
    static template = footerTemplate;
}

export { XFooter };