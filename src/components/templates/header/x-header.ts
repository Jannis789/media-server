import { Component } from "#decorators/Component";
import headerStyles from './x-header.xcss';
import headerTemplate from './x-header.tmpl';

@Component('x-header')
class XHeader {

    static styles = [headerStyles];

    static template = headerTemplate;

}

export { XHeader };