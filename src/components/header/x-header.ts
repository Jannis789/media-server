import { Component } from '@decorator';
import { xHeaderStyle } from '@styles';
import { xHeaderTemplate } from '@templates';

@Component("x-header")
export class XHeader {

  static styles = [xHeaderStyle];

  static template = xHeaderTemplate;
  
}