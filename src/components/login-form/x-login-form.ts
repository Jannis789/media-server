import { Cookie, CookieStore } from "@/extra/utils/CookieStore";
import { Failure, Success } from "@/shared/basic.response.types";
import { LoginUserResponse, UserResponsePaths } from "@/shared/user.responses";
import { Component } from "@decorator";
import { globalStyle, xLoginFormStyle } from "@styles";
import { xLoginFormTemplate } from "@templates";

@Component("x-login-form")
export class XLoginForm {

  static styles = [xLoginFormStyle, globalStyle];

  static template = xLoginFormTemplate;

  public email = "";
  public password = "";
  public remember = false;
  public loading = false;
  public error: string[] = [];

  private get loginRequest() {
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
      .then(this.handleResponse)
      .catch(this.handleIssue)
      .finally(() => this.loading = false);
  }

  handleResponse(response: Success<LoginUserResponse>) {
    const { session, expiresAt } = response.data;

    const cookie = CookieStore.cookies['session_key'];
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

    // @todo: Handle error's
  }
}