import { AlpineData, Component } from "@decorator";
import { xLoginFormStyle } from "@styles";
import { xLoginFormTemplate } from "@templates";

@Component("x-login-form")
export class XLoginForm extends HTMLElement {
  static styles = [xLoginFormStyle];

  static template = xLoginFormTemplate;

  @AlpineData()
  data() {
    return {
        email: "",
        password: "",
        remember: false,
        error: "",
        loading: false,
        
        login() {
          
        }
    };
  }
}