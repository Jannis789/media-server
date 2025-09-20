import { Component } from "#decorators/Component";
import bodyStyle from './x-body.xcss'
import bodyTemplate from './x-body.tmpl';

@Component('x-body')    
export class Body {
    static styles = [bodyStyle];

    static template = bodyTemplate;
}