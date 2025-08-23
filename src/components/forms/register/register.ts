import { Component } from "#decorators/Component";
import registerFormStyle from './register.xcss';
import registerFormTemplate from './register.tmpl';

@Component('x-register-form')
export class XRegisterForm {

    static styles = [registerFormStyle];

    static template = registerFormTemplate;
    
    revealPassword = false;

    revealConfirmPassword = false;
}