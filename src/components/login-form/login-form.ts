import template from './login-form.html'
import style from './login-form.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate';

@AlpineTemplate({
    tag: 'x-login-form',
    template: template,
    style: style,
})
export class XHeader {

}