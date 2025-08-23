import { Component } from "#decorators/Component";
import bodyStyle from './body.xcss'
import bodyTemplate from './body.tmpl';

@Component('x-body')    
export class Body {
    static styles = [bodyStyle];

    static template = bodyTemplate;
}