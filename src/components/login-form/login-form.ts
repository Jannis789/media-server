import template from "./login-form.html";
import style from "./login-form.scsssheet";
import { AlpineTemplate } from "../../utils/AlpineTemplate.ts";
import request from "../../utils/RequestHandler.ts";
import { CookieReader } from "../../utils/CookieReader.ts";
import GlobalStorage from "../../utils/GlobalStorage.ts";

// @todo resolve eslint errors
// @todo get Interfaces from Backend

@AlpineTemplate({
  tag: "x-login-form",
  template: template,
  style: style,
})
export class XLoginForm {
  public email: string = "";
  public password: string = "";
  public remember: boolean = false;
  public error: string = "";
  public loading: boolean = false;

  private get requestData() {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Login($email: String!, $password: String!, $rememberMe: Boolean!) { login(email: $email, password: $password, $rememberMe: rememberMe) }`,
        variables: {
          email: this.email,
          password: this.password,
          rememberMe: this.remember,
        },
      }),
    }
  }

  public login() {
    this.error = "";
    this.loading = true;
    request("http://localhost:3000/login", this.requestData)
      .then((response) => response.json())
      .then((result) => this.handleResult(result))
      .catch((e) => this.handleError(e))
      .finally(() => (this.loading = false));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleResult(result: any) { 
    console.log(result);
    const sessionToken: string | null = result.data.login;
    if (sessionToken) {
      // Store sessionToken in a cookie
      CookieReader.add("session_id", sessionToken);

      console.info("Login succeeded, sessionToken:", sessionToken);

      GlobalStorage.set("isLoggedIn", true);
    } else {
      this.error = "Login fehlgeschlagen.";
      console.info("Login failed:", result);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(e: any) {
    this.error = "Network error.";
    console.info("Login failed:", this.error, e);
  }
}
