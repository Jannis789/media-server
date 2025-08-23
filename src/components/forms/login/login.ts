import { Component } from "#decorators/Component";
import LoginFromStyle from './login.xcss';
import LoginFormTemplate from './login.tmpl';


@Component('x-login-form')
export class XLoginForm {
    static styles = [LoginFromStyle];

    static template = LoginFormTemplate;
}
