import template from './login-form.html'
import style from './login-form.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate';

@AlpineTemplate({
    tag: 'x-login-form',
    template: template,
    style: style,
})
export class XLoginForm {
    public email: string = '';
    public password: string = '';
    public remember: boolean = false;

    public login() {
        console.log('E-Mail: ', this.email);
        console.log('Passwort: ', this.password);
        console.log('Angemeldet bleiben: ', this.remember);
    }
}