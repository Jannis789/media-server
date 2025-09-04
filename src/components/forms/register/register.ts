import { Component } from "#decorators/Component";
import registerFormStyle from './register.xcss';
import registerFormTemplate from './register.tmpl';
import { UserResponsePaths, type CreateUserResponse } from "../../../core/shared/user.responses";
import type { Failure, Success } from "src/core/shared/basic.response.types";

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

    errors: Record<string, string[]> = {};

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

        if (this.password !== this.passwordConfirmation) {
            this.errors['password-confirmation'] = ["Passwords do not match."];
        }

        e.error.fields.forEach(fieldError => {
            const { field, messages } = fieldError;
            this.errors[field] = messages;
        });
    }

    hasErrors(field: string): boolean {
        return Array.isArray(this.errors[field]) && this.errors[field].length > 0;
    }
}