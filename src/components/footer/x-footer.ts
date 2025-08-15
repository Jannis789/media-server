import { AlpineData, Component } from "@decorator";
import { xFooterStyle } from "@styles";
import { xFooterTemplate } from "@templates";

@Component('x-footer')
export class XFooter extends HTMLElement {

  static styles = [xFooterStyle];

  static template = xFooterTemplate;

  @AlpineData()
  data() { }
}