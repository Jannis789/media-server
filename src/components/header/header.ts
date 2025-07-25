import template from './header.html'
import style from './header.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate';

console.log('Header component loaded');

@AlpineTemplate({
    tag: 'x-header',
    template: template,
    style: style,
})
class XHeader {

}