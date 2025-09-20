import { Component } from "#decorators/Component";
import LoginFromStyle from './x-login-form.xcss';
import LoginFormTemplate from './x-login-form.tmpl';
import { UserResponsePaths, type LoginUserResponse } from "../../../core/shared/user.responses";
import type { Failure, Success } from "src/core/shared/basic.response.types";
import { log } from "#utils/logger";

enum LoginFields {
    EMAIL = "email",
    PASSWORD = "password",
}

@Component('x-login-form')
export class XLoginForm {
    static styles = [LoginFromStyle];

    static template = LoginFormTemplate;

    host!: HTMLElement;

    email: string = '';

    password: string = '';

    remember: boolean = false;

    revealPassword: boolean = false;

    loading: boolean = false;

    errors: Record<string, string[]> = {
        [LoginFields.EMAIL]: [],
        [LoginFields.PASSWORD]: []
    };

    get loginRequest() {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.email,
                password: this.password,
                remember: this.remember,
            }),
        };
    }

    login() {
        this.loading = true;
        this.errors = {};
        api(UserResponsePaths.LoginUser, this.loginRequest)
            .then(this.handleResponse.bind(this))
            .catch(this.handleIssue.bind(this))
            .finally(() => this.loading = false );
    }

    handleResponse(response: Success<LoginUserResponse>) {
        const { session, expiresAt } = response.data;

        const cookie = CookieManager.cookies['x-Session-UUID'];
        if (!cookie) {
            new Cookie("x-Session-UUID", session, expiresAt);
            return;
        }

        cookie.value = session;
        cookie.expires = expiresAt;
        log.component(`Login successful. Session cookie "${cookie.name}" updated with new session key: ${session}`);
    }

    handleIssue(e: Failure<LoginUserResponse>) {
        console.error("Login failed with Error");

        for (const field of Object.values(LoginFields)) {
            const inputEle = this.host.shadowRoot!.querySelector(`input[data-field-name="${field}"]`);
            inputEle?.addEventListener('input', () => this.errors[field] = [], { once: true });
        }

        e.error.fields.forEach(fieldError => {
            const { field, messages } = fieldError;
            this.errors[field] = messages;
        });
    }

    getErrorMessage(field: string): string {
        let res = '';
        for (const msg of this.errors[field] || []) {
            res += '• ' + msg + '\n';
        }
        return res;
    }
}
