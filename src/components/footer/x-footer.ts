import { Component } from "@decorator";
import { xFooterStyle } from "@styles";
import { xFooterTemplate } from "@templates";

@Component('x-footer')
export class XFooter {

  static styles = [xFooterStyle];

  static template = xFooterTemplate;

}