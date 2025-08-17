import { Component } from '@decorator';
import { xBodyStyle } from '@styles';
import { xBodyTemplate } from '@templates';

@Component("x-body")
export class XBody {

  static styles = [xBodyStyle];

  static template = xBodyTemplate;

}