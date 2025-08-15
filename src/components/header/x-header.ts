import { Component, AlpineData } from '@decorator';
import { xHeaderStyle } from '@styles';
import { xHeaderTemplate } from '@templates';

@Component("x-header")
export class XHeader extends HTMLElement {

  static styles = [xHeaderStyle];

  static template = xHeaderTemplate;

  @AlpineData()
  data() {
    return {
      title: 'X Header Component'
    };
  }
}