import template from './header.html'
import style from './header.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate';

@AlpineTemplate({
    tag: 'x-header',
    template: template,
    style: style,
})
export class XHeader {
    public static test: string = 'Test';
}