import template from './body.html'
import style from './body.scsssheet'
import { AlpineTemplate } from '../../utils/AlpineTemplate';

@AlpineTemplate({
    tag: 'x-body',
    template: template,
    style: style,
})
class XBody {

}