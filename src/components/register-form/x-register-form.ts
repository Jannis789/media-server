import { globalStyle, xRegisterFromStyle } from "@/styles";
import { Component } from "@decorator";
import { xRegisterFormTemplate } from "..";

@Component("x-register-form")
export class XRegisterForm {
    
    static styles = [xRegisterFromStyle, globalStyle];

    static template = xRegisterFormTemplate;

    register() {}
}