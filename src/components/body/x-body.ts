import { Component, AlpineData } from '@decorator';
import { xBodyStyle } from '@styles';
import { xBodyTemplate } from '@templates';

@Component("x-body")
export class XBody extends HTMLElement {

  static styles = [xBodyStyle];

  static template = xBodyTemplate;

  @AlpineData()
  data() {
    return {
      title: 'X Body Component'
    };
  }
}