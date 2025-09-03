import { Component } from "#decorators/Component";
import registerFormStyle from './register.xcss';
import registerFormTemplate from './register.tmpl';
import { UserResponsePaths, type CreateUserResponse } from "../../../core/shared/user.responses";
import type { Failure, Success } from "src/core/shared/basic.response.types";
import { removeTooltipIfExists, setTooltip } from "#components/extra/tooltip";

@Component('x-register-form')
export class XRegisterForm {

    static styles = [registerFormStyle];

    static template = registerFormTemplate;
    
    revealPassword = false;

    revealConfirmPassword = false;

    username: string = '';

    email: string = '';

    password: string = '';

    passwordConfirmation: string = '';

    remember: boolean = false;

    host!: HTMLElement;

    previousErrorIconElements: HTMLElement[] = [];

    private get registerRequest() {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.username,
                email: this.email,
                password: this.password,
                remember: this.remember,
            }),
        };
    }

    register() {
        for (const prevEle of this.previousErrorIconElements) {
            this.showErrorIcon(prevEle, false);
            removeTooltipIfExists(prevEle);
        }
        
        this.previousErrorIconElements.length = 0;

        const root = this.host.shadowRoot;
        const ele = root?.querySelector('[data-field="password-confirmation"]') as HTMLElement | null | undefined;
        if (!ele) return;
        if (this.password !== this.passwordConfirmation) {
            this.showErrorIcon(ele, true);
            setTooltip(ele, "Passwords do not match");
        } else {
            this.showErrorIcon(ele, false);
            removeTooltipIfExists(ele);
        }

        api(UserResponsePaths.CreateUser, this.registerRequest)
            .then(this.handleResponse)
            .catch(this.handleIssue.bind(this));
    }

    handleResponse(response: Success<CreateUserResponse>) {
        console.info("Registration successful");
        const { session, expiresAt } = response.data;
        const cookie = CookieManager.cookies['session_key'];
        if (!cookie) {
            new Cookie("session_key", session, expiresAt);
            return;
        }

        cookie.value = session;
        cookie.expires = expiresAt;
    }

    handleIssue(e: Failure<CreateUserResponse>) {
        const root = this.host.shadowRoot;
        e.error.fields.forEach(fieldError => {
            const {field, messages} = fieldError;
            const ele = root?.querySelector(`[data-field="${field}"]`) as HTMLElement | null | undefined;
            if (!ele) return;

            this.previousErrorIconElements.push(ele);
            this.showErrorIcon(ele, true);

            const tooltipContent = messages.join('\n');
            setTooltip(ele, tooltipContent);
        });
    }

    showErrorIcon(ele: HTMLElement, show: boolean) {
        const ERROR_ICON = 'dialog-warning-symbolic';
        const ERROR_BG = 'red';

        if (show) {
            ele.dataset.previousToggleState = ele.getAttribute('name') || '';
            ele.setAttribute('name', ERROR_ICON);
            ele.style.background = ERROR_BG;
        } else {
            const prevState = ele.dataset.previousToggleState;
            if (prevState !== undefined) {
                ele.setAttribute('name', prevState);
                delete ele.dataset.previousToggleState;
            }
            ele.style.background = "";
        }
    }
}