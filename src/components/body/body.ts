import template from './body.html';
import style from './body.scsssheet';
import { AlpineTemplate } from '../../utils/AlpineTemplate.ts';

@AlpineTemplate({
    tag: 'x-body',
    template: template,
    style: style,
})
export class XBody {

}