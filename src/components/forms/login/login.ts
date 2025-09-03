import { Component } from "#decorators/Component";
import LoginFromStyle from './login.xcss';
import LoginFormTemplate from './login.tmpl';
import { UserResponsePaths, type LoginUserResponse } from "../../../core/shared/user.responses";
import type { Failure, Success } from "src/core/shared/basic.response.types";
import { setTooltip } from "#components/extra/tooltip";

@Component('x-login-form')
export class XLoginForm {
    static styles = [LoginFromStyle];

    static template = LoginFormTemplate;

    email: string = '';

    password: string = '';

    remember: boolean = false;

    revealPassword: boolean = false;

    loading: boolean = false;

    host!: HTMLElement;

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
        api(UserResponsePaths.LoginUser, this.loginRequest)
            .then(this.handleResponse.bind(this))
            .catch(this.handleIssue.bind(this))
            .finally(() => this.loading = false );
    }

    handleResponse(response: Success<LoginUserResponse>) {
        const { session, expiresAt } = response.data;

        const cookie = CookieManager.cookies['session_key'];
        if (!cookie) {
            new Cookie("session_key", session, expiresAt);
            return;
        }

        cookie.value = session;
        cookie.expires = expiresAt;
        console.info(`Login successful. Session cookie "${cookie.name}" updated with new session key: ${session}`);
    }

    handleIssue(e: Failure<LoginUserResponse>) {
        console.error("Login failed:", e);
        
    }
}
