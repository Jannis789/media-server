import template from './header.html'
import style from './header.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate.ts';

@AlpineTemplate({
    tag: 'x-header',
    template: template,
    style: style,
})
export class XHeader {
    public test: string = 'Test';
}