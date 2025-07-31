import template from './footer.html'
import style from './footer.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate.ts';

@AlpineTemplate({
    tag: 'x-footer',
    template: template,
    style: style,
})
export class XFooter {}