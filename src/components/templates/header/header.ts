import { Component } from "#decorators/Component";
import headerStyles from './header.xcss';
import headerTemplate from './header.tmpl';

@Component('x-header')
class XHeader {

    static styles = [headerStyles];

    static template = headerTemplate;

}

export { XHeader };