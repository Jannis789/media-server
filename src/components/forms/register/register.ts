import { Component } from "#decorators/Component";
import registerFormStyle from './register.xcss';
import registerFormTemplate from './register.tmpl';
import { UserResponsePaths, type CreateUserResponse } from "../../../core/shared/user.responses";
import type { Failure, Success } from "src/core/shared/basic.response.types";
import { log } from "#utils/logger";

enum RegistrationFields {
    USERNAME = "username",
    EMAIL = "email",
    PASSWORD = "password",
    PASSWORD_CONFIRMATION = "password-confirmation"
}

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

    errors: Record<string, string[]> = {
        [RegistrationFields.USERNAME]: [],
        [RegistrationFields.EMAIL]: [],
        [RegistrationFields.PASSWORD]: [],
        [RegistrationFields.PASSWORD_CONFIRMATION]: []
    };

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
        api(UserResponsePaths.CreateUser, this.registerRequest)
            .then(this.handleResponse)
            .catch(this.handleIssue.bind(this));
    }

    handleResponse(response: Success<CreateUserResponse>) {
        log.component("Registration successful");
        const { session, expiresAt } = response.data;
        const cookie = CookieManager.cookies['x-Session-UUID'];
        if (!cookie) {
            new Cookie("x-Session-UUID", session, expiresAt);
            return;
        }

        cookie.value = session;
        cookie.expires = expiresAt;
    }

    handleIssue(e: Failure<CreateUserResponse>) {
        console.warn("Registration failed with Error");

        for (const field of Object.values(RegistrationFields)) {
            const inputEle = this.host.shadowRoot!.querySelector(`input[data-field-name="${field}"]`);
            inputEle?.addEventListener('input', () => this.errors[field] = [], { once: true });
        }

        if (this.password !== this.passwordConfirmation) {
            this.errors['password-confirmation'] = ["Passwords do not match."];
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